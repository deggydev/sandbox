#!/usr/bin/env node
// Captures review frames from a built film: a few frames per scene (or the
// given times) plus labelled contact sheets for visual QA.
//
//   node qa.mjs <film-dir> --out qa [--per-scene 3] [--times 1.2,4.8] [--scenes 3,4]
import fs from 'node:fs';
import path from 'node:path';
import { serveDir } from './lib/server.mjs';
import { launchChromium } from './lib/browser.mjs';

const argv = process.argv.slice(2);
const dir = argv[0];
const args = parseArgs(argv.slice(1));
if (!dir || dir.startsWith('--')) {
  console.error('Usage: node qa.mjs <film-dir> --out <qa-dir> [--per-scene 3] [--times a,b] [--scenes i,j]');
  process.exit(2);
}
const OUT = path.resolve(args.out || path.join(dir, 'qa'));
fs.mkdirSync(OUT, { recursive: true });
const { server, url } = await serveDir(dir);
const browser = await launchChromium({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.on('pageerror', (e) => console.error('page error:', e.message));
  page.on('console', (m) => {
    if (m.type() === 'warning' || m.type() === 'error') console.log(`console.${m.type()}: ${m.text()}`);
  });
  await page.goto(`${url}index.html?render=1`, { waitUntil: 'load' });
  await page.evaluate(() => window.__film.ready);
  const film = await page.evaluate(() => ({ duration: window.__film.duration, scenes: window.__film.scenes }));
  let shots = [];
  if (args.times) {
    shots = String(args.times).split(',').map(Number).map((t) => ({ t, label: `t=${t.toFixed(2)}s` }));
  } else {
    const per = Number(args['per-scene'] || 3);
    const only = args.scenes ? String(args.scenes).split(',').map(Number) : null;
    for (const s of film.scenes) {
      if (only && !only.includes(s.index)) continue;
      for (let k = 0; k < per; k += 1) {
        const frac = per === 1 ? 0.6 : 0.15 + (0.8 * k) / (per - 1);
        const t = s.start + s.dur * Math.min(0.97, frac);
        shots.push({ t, label: `#${s.index} ${s.type}${s.id ? ` ${s.id}` : ''} t=${t.toFixed(2)}` });
      }
    }
  }
  const files = [];
  for (const [n, shot] of shots.entries()) {
    await page.evaluate((tt) => window.__film.seek(tt), shot.t);
    const file = path.join(OUT, `frame-${String(n).padStart(3, '0')}.png`);
    await page.screenshot({ path: file });
    files.push({ file, label: shot.label });
  }
  // contact sheets, 12 frames each, drawn in the browser
  const sheetPage = await context.newPage();
  for (let s = 0; s * 12 < files.length; s += 1) {
    const chunk = files.slice(s * 12, s * 12 + 12);
    const imgs = chunk.map((f) => ({ label: f.label, data: `data:image/png;base64,${fs.readFileSync(f.file).toString('base64')}` }));
    await sheetPage.setViewportSize({ width: 1920, height: 1300 });
    await sheetPage.setContent(`<html><body style="margin:0;background:#1a1a1a;font:600 18px -apple-system,Arial;color:#eee">
      <div style="display:grid;grid-template-columns:repeat(4,472px);gap:8px;padding:8px">${imgs
        .map((i) => `<div><img src="${i.data}" style="width:472px;height:265px;display:block;border-radius:4px"><div style="padding:4px 2px 6px">${i.label}</div></div>`)
        .join('')}</div></body></html>`);
    await sheetPage.waitForTimeout(200);
    const sheet = path.join(OUT, `sheet-${String(s).padStart(2, '0')}.png`);
    await sheetPage.screenshot({ path: sheet, fullPage: true });
    console.log(sheet);
  }
  console.log(`${files.length} frames in ${OUT}`);
} finally {
  // never let a stuck browser or keep-alive socket hold the process open
  await Promise.race([browser.close().catch(() => {}), new Promise((r) => setTimeout(r, 10000))]);
  server.closeAllConnections?.();
  server.close();
}
process.exit(0);

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
