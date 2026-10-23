#!/usr/bin/env node
// Generates a cut-paper "sticker" prop for a subject the built-in library
// does not cover (a specific product, an animal, a landmark), through FAL:
// GPT Image 2 draws the subject as layered construction paper on white, then
// BiRefNet removes the background so the prop drops into the film as a
// transparent PNG with a white paper border added by the engine.
//
//   node sticker.mjs --subject "a red fox sitting" --out assets/fox.png
//        [--palette "#5FAE55,#F3B63E,#E25B4B,#27406E,#FBF7EE"] [--quality medium]
//        [--no-cutout] [--resubmit]
//
// FAL_KEY is required. Each image is a paid job: confirm with the user before
// running. Requests are recorded in <out>.fal.json, so rerunning the same
// command polls the existing job instead of paying twice.
import fs from 'node:fs';
import path from 'node:path';
import { Ledger, inputHash, submit, waitFor, download } from './lib/fal.mjs';

const args = parseArgs(process.argv.slice(2));
if (!args.subject || !args.out) {
  console.error('Usage: node sticker.mjs --subject "<what to draw>" --out <file.png> [--palette "#hex,..."] [--quality low|medium|high] [--no-cutout]');
  process.exit(2);
}
const OUT = path.resolve(args.out);
fs.mkdirSync(path.dirname(OUT), { recursive: true });
const palette = String(args.palette || '#5FAE55, #3D7D43, #F3B63E, #E25B4B, #2E8C7C, #27406E, #FBF7EE, #A8744A');
const prompt = [
  `A single ${args.subject}, made as a children's paper-cut collage craft: flat pieces of matte construction paper layered on top of each other, each piece with a clean scissor-cut edge and a very soft shadow underneath.`,
  'Simple, rounded, friendly shapes like a picture-book illustration; no outlines, no gradients except a faint paper fibre texture; tiny cut-paper details only where they help recognition.',
  `Colour palette: ${palette}.`,
  'Centred, whole subject visible, generous margin, on a plain pure white background. No text, no letters, no logos, no frame, no scene, no ground shadow.',
].join(' ');

const ledger = new Ledger(`${OUT}.fal.json`);
const genModel = 'fal-ai/gpt-image-2';
const genInput = { prompt, image_size: { width: 1024, height: 1024 }, quality: String(args.quality || 'medium'), num_images: 1, output_format: 'png' };
const raw = OUT.replace(/\.png$/i, '') + '.raw.png';

let gen = ledger.get('generate');
const genHash = inputHash(genModel, genInput);
if (!gen || gen.hash !== genHash || args.resubmit) {
  const sub = await submit(genModel, genInput);
  gen = { model: genModel, hash: genHash, ...sub };
  ledger.set('generate', gen);
  console.log(`Submitted ${genModel}  request ${sub.requestId}`);
} else if (gen.done && fs.existsSync(raw)) {
  console.log(`Reusing ${raw}`);
} else console.log(`Polling existing request ${gen.requestId}`);
if (!(gen.done && fs.existsSync(raw))) {
  const res = await waitFor(gen, { onTick: (st) => process.stdout.write(`\r  generate ${st.status}   `) });
  process.stdout.write('\n');
  const url = res.images?.[0]?.url;
  if (!url) throw new Error(`no image in result: ${JSON.stringify(res).slice(0, 300)}`);
  await download(url, raw);
  ledger.set('generate', { done: true, imageUrl: url });
}

if (args['no-cutout']) {
  fs.copyFileSync(raw, OUT);
  console.log(`Wrote ${OUT} (white background kept)`);
  process.exit(0);
}
const cutModel = String(args['cutout-model'] || 'fal-ai/birefnet');
const imageUrl = ledger.get('generate').imageUrl;
const cutInput = { image_url: imageUrl, output_format: 'png' };
let cut = ledger.get('cutout');
const cutHash = inputHash(cutModel, cutInput);
if (!cut || cut.hash !== cutHash || args.resubmit) {
  const sub = await submit(cutModel, cutInput);
  cut = { model: cutModel, hash: cutHash, ...sub };
  ledger.set('cutout', cut);
}
const res = await waitFor(cut, { onTick: (st) => process.stdout.write(`\r  cutout ${st.status}   `) });
process.stdout.write('\n');
const url = res.image?.url || res.images?.[0]?.url;
if (!url) throw new Error(`no cutout in result: ${JSON.stringify(res).slice(0, 300)}`);
await download(url, OUT);
ledger.set('cutout', { done: true, file: OUT });
console.log(`Wrote ${OUT} (transparent). Use it as a prop: { "src": "${path.relative(process.cwd(), OUT)}", "x": 1400, "h": 260 }`);

function parseArgs(list) {
  const o = {};
  for (let i = 0; i < list.length; i += 1) {
    if (!list[i].startsWith('--')) continue;
    const k = list[i].slice(2);
    const v = list[i + 1];
    if (v === undefined || v.startsWith('--')) o[k] = true;
    else {
      o[k] = v;
      i += 1;
    }
  }
  return o;
}
