#!/usr/bin/env node
// Builds a previewable paper-cutout film folder from a storyboard JSON file.
//
//   node build.mjs --storyboard storyboard.json --out film
//
// Local media referenced in the storyboard (relative to the storyboard file)
// is copied into <out>/assets and rewritten. Only the Lucide icons used by
// "steps" scenes are bundled. The storyboard is validated; errors stop the
// build and warnings are printed.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const ENGINE = path.resolve(HERE, '..', 'references', 'engine');
const MEDIA = /\.(png|jpe?g|webp|gif|svg|avif)$/i;
const TYPES = ['paper', 'world', 'steps', 'cards', 'end'];
const TRANSITIONS = ['cut', 'fade', 'push', 'wipe'];
const THEMES = ['meadow', 'spring', 'autumn', 'seaside', 'snow', 'dusk', 'desert'];
const ENTERS = ['pop', 'grow', 'drop', 'slide', 'fade', 'rise', 'walk', 'none'];

const args = parseArgs(process.argv.slice(2));
if (!args.storyboard || !args.out) {
  console.error('Usage: node build.mjs --storyboard <storyboard.json> --out <film-dir>');
  process.exit(2);
}
const sbPath = path.resolve(args.storyboard);
const sbDir = path.dirname(sbPath);
const out = path.resolve(args.out);
const sb = JSON.parse(fs.readFileSync(sbPath, 'utf8'));
const problems = [];
const warnings = [];

// prop names known to the engine
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ENGINE, 'props.js'), 'utf8'), sandbox);
const PROP_NAMES = new Set([...Object.keys(sandbox.window.PAPER_PROPS), ...Object.keys(sandbox.window.PAPER_ALIASES)]);

if (!Array.isArray(sb.scenes) || sb.scenes.length === 0) problems.push('storyboard.scenes must be a non-empty array');
sb.meta = { fps: 30, theme: 'meadow', ...(sb.meta || {}) };
if (typeof sb.meta.theme === 'string' && !THEMES.includes(sb.meta.theme)) problems.push(`meta.theme "${sb.meta.theme}" is not one of ${THEMES.join(', ')}`);

fs.rmSync(path.join(out, 'assets'), { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
fs.mkdirSync(path.join(out, 'fonts'), { recursive: true });

const copied = new Map();
function copyAsset(ref) {
  if (/^(https?:|data:)/.test(ref)) return ref;
  const abs = path.isAbsolute(ref) ? ref : path.resolve(sbDir, ref);
  if (!fs.existsSync(abs)) {
    problems.push(`missing asset: ${ref}`);
    return ref;
  }
  if (copied.has(abs)) return copied.get(abs);
  const buf = fs.readFileSync(abs);
  const digest = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
  const name = `${path.basename(abs, path.extname(abs)).replace(/[^a-z0-9._-]+/gi, '-').slice(0, 48)}-${digest}${path.extname(abs).toLowerCase()}`;
  fs.writeFileSync(path.join(out, 'assets', name), buf);
  const rel = `assets/${name}`;
  copied.set(abs, rel);
  return rel;
}
const icons = new Set();
function walk(node, key) {
  if (Array.isArray(node)) return node.map((v) => walk(v, key));
  if (node && typeof node === 'object') {
    const next = {};
    for (const [k, v] of Object.entries(node)) next[k] = walk(v, k);
    return next;
  }
  if (typeof node !== 'string') return node;
  if (key === 'icon') icons.add(node);
  if (['src', 'logo'].includes(key) && MEDIA.test(node)) return copyAsset(node);
  return node;
}
const built = walk(sb);

// ---- validate ----
const ids = new Set();
let total = 0;
built.scenes.forEach((s, i) => {
  const where = `scene ${i}${s.id ? ` (${s.id})` : ''}`;
  if (!TYPES.includes(s.type)) problems.push(`${where}: unknown type "${s.type}" (${TYPES.join(' | ')})`);
  if (s.id) {
    if (ids.has(s.id)) problems.push(`${where}: duplicate id`);
    ids.add(s.id);
  }
  if (s.transition && !TRANSITIONS.includes(s.transition)) problems.push(`${where}: transition must be ${TRANSITIONS.join(' | ')}`);
  if (s.theme && typeof s.theme === 'string' && !THEMES.includes(s.theme)) problems.push(`${where}: theme "${s.theme}" unknown`);
  if (s.dur === undefined) warnings.push(`${where}: no dur, engine default used`);
  total += Number(s.dur ?? 3.5);
  for (const [j, p] of (s.props || []).entries()) {
    if (!p.src && !p.svg && !PROP_NAMES.has(p.type)) problems.push(`${where} prop ${j}: unknown prop type "${p.type}" (see references/props.md)`);
    if (p.enter && !ENTERS.includes(p.enter)) problems.push(`${where} prop ${j}: enter must be ${ENTERS.join(' | ')}`);
    if (p.svg && !/viewBox=/.test(p.svg)) problems.push(`${where} prop ${j}: custom svg needs a viewBox`);
    if (p.x === undefined) warnings.push(`${where} prop ${j}: no x, centred`);
  }
  if (s.type === 'steps' && !(s.steps || []).length) problems.push(`${where}: steps scene needs steps[]`);
  if (s.type === 'steps' && (s.steps || []).length > 5) warnings.push(`${where}: more than 5 steps will crowd the frame`);
  if (s.type === 'cards' && !(s.cards || []).length) problems.push(`${where}: cards scene needs cards[]`);
  if (s.type === 'cards' && (s.cards || []).length > 4) problems.push(`${where}: at most 4 cards`);
  if (s.type === 'end' && !s.name) warnings.push(`${where}: end card has no name`);
  for (const c of s.cards || []) if (c.prop && !PROP_NAMES.has(c.prop)) problems.push(`${where}: card prop "${c.prop}" unknown`);
  for (const st of s.steps || []) if (st.prop && !PROP_NAMES.has(st.prop)) problems.push(`${where}: step prop "${st.prop}" unknown`);
  const words = [...(s.text?.lines || []), s.text?.body || '', s.card?.title || '', s.card?.body || ''].join(' ').split(/\s+/).filter(Boolean).length;
  if (words > 22) warnings.push(`${where}: ${words} words on screen; keep each scene to one short idea`);
  if (s.text?.lines?.some((l) => l.replace(/\*\*/g, '').length > 30)) warnings.push(`${where}: a headline line is longer than 30 characters; break it`);
});

// ---- engine files ----
for (const f of ['papercut.js', 'papercut.css', 'props.js']) fs.copyFileSync(path.join(ENGINE, f), path.join(out, f));
for (const f of ['Nunito-latin.woff2', 'Caveat-latin.woff2', 'OFL.txt']) fs.copyFileSync(path.join(ENGINE, 'fonts', f), path.join(out, 'fonts', f));
const lucide = JSON.parse(fs.readFileSync(path.join(ENGINE, 'lucide-nodes.json'), 'utf8'));
const subset = {};
for (const name of icons) {
  if (lucide[name]) subset[name] = lucide[name];
  else problems.push(`unknown Lucide icon "${name}" (see references/engine/lucide-nodes.json)`);
}
fs.writeFileSync(path.join(out, 'icons.js'), `window.FILM_ICONS=${JSON.stringify(subset)};\n`);
fs.writeFileSync(path.join(out, 'storyboard.js'), `window.STORYBOARD=${JSON.stringify(built, null, 1)};\n`);
fs.writeFileSync(
  path.join(out, 'index.html'),
  `<!doctype html>
<html lang="${escapeHtml(built.meta.lang || 'en')}">
<head>
<meta charset="utf-8">
<title>${escapeHtml(built.meta.title || 'Paper cutout film')}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preload" href="fonts/Nunito-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/Caveat-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="papercut.css">
</head>
<body>
<div id="viewport"><div id="stage"></div></div>
<div id="player"></div>
<script src="icons.js"></script>
<script src="storyboard.js"></script>
<script src="props.js"></script>
<script src="papercut.js"></script>
</body>
</html>
`
);

console.log(`Built ${out}`);
console.log(`Scenes: ${built.scenes.length}  Duration: ${total.toFixed(2)}s  Assets copied: ${copied.size}  Icons: ${Object.keys(subset).length}`);
let st = 0;
for (const s of built.scenes) {
  const d = Number(s.dur ?? 3.5);
  console.log(`  ${st.toFixed(2).padStart(7)}s  ${d.toFixed(2).padStart(5)}s  ${s.type}${s.id ? ` · ${s.id}` : ''}${s.transition ? ` [${s.transition}]` : ''}`);
  st += d;
}
for (const w of warnings) console.log(`WARN ${w}`);
if (problems.length) {
  for (const p of problems) console.error(`ERROR ${p}`);
  process.exit(1);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
}
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
