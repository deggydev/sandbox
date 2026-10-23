#!/usr/bin/env node
// Renders a built film folder to MP4, frame by frame, through headless
// Chromium and FFmpeg. Frames are captured from film.seek(t), so the result
// is deterministic and independent of machine speed.
//
//   node render.mjs <film-dir> --out film.mp4 [--resolution 1080p|2k|4k]
//        [--workers 4] [--fps 30] [--audio music.mp3] [--audio-fade 2.5]
//        [--from 0] [--to 12.5] [--crf 16] [--png]
//
// Frames are captured as quality-95 JPEG, which is 5-10x faster than PNG and
// visually identical after H.264 encoding; --png captures lossless frames.
//
// The stage is always laid out at 1920x1080 CSS pixels. --resolution renders
// that same composition at a higher device scale (2k = 2560x1440,
// 4k = 3840x2160), so type, icons, UI and vector shapes stay sharp; raster
// media is drawn from its own pixels and is only as sharp as its source.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn, spawnSync } from 'node:child_process';
import { serveDir } from './lib/server.mjs';
import { launchChromium } from './lib/browser.mjs';

const argv = process.argv.slice(2);
const dir = argv[0] && !argv[0].startsWith('--') ? argv[0] : null;
const args = parseArgs(argv.slice(dir ? 1 : 0));
if (!dir || !args.out) {
  console.error('Usage: node render.mjs <film-dir> --out <file.mp4> [--resolution 1080p|2k|4k] [--workers 4] [--audio track.mp3] [--audio-fade s] [--from s] [--to s] [--crf 16] [--png]');
  process.exit(2);
}
const RESOLUTIONS = {
  '1080p': { scale: 1, width: 1920, height: 1080 },
  '2k': { scale: 4 / 3, width: 2560, height: 1440 },
  '4k': { scale: 2, width: 3840, height: 2160 },
};
const RESOLUTION_ALIASES = { fhd: '1080p', '1440p': '2k', qhd: '2k', '2160p': '4k', uhd: '4k' };
const resolutionKey = String(args.resolution || '1080p').toLowerCase();
const RES = RESOLUTIONS[RESOLUTION_ALIASES[resolutionKey] || resolutionKey];
if (!RES) {
  console.error(`Unknown --resolution ${args.resolution}. Use 1080p (default), 2k or 4k.`);
  process.exit(2);
}
const OUT = path.resolve(args.out);
const WORKERS = Math.max(1, Number(args.workers || Math.min(4, Math.max(1, Math.floor(os.cpus().length / 3)))));
const CRF = String(args.crf || 16);
const USE_JPEG = !args.png;
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'film-render-'));

const ff = spawnSync('ffmpeg', ['-version']);
if (ff.status !== 0) {
  console.error('FFmpeg is required on PATH.');
  process.exit(1);
}

const { server, url } = await serveDir(dir);
const browser = await launchChromium({ headless: true, args: ['--disable-web-security', '--autoplay-policy=no-user-gesture-required'] });
const started = Date.now();
try {
  const probe = await openPage();
  const info = await probe.evaluate(() => ({ duration: window.__film.duration, fps: window.__film.fps, scenes: window.__film.scenes.length }));
  await probe.close();
  const fps = Number(args.fps || info.fps || 30);
  const from = Math.max(0, Number(args.from || 0));
  const to = Math.min(info.duration, Number(args.to || info.duration));
  const f0 = Math.round(from * fps);
  const f1 = Math.round(to * fps);
  const total = f1 - f0;
  console.log(`Rendering ${total} frames (${(total / fps).toFixed(2)}s @ ${fps}fps) at ${RES.width}x${RES.height} with ${WORKERS} workers, ${info.scenes} scenes`);
  const per = Math.ceil(total / WORKERS);
  let done = 0;
  const tty = process.stdout.isTTY;
  const ticker = setInterval(() => {
    const el = (Date.now() - started) / 1000;
    const line = `  ${done}/${total} frames  ${(done / Math.max(el, 1)).toFixed(1)} fps  ${el.toFixed(0)}s`;
    if (tty) process.stdout.write(`\r${line}   `);
    else console.log(line);
  }, tty ? 2000 : 15000);
  const segments = [];
  await Promise.all(
    Array.from({ length: WORKERS }, async (_, w) => {
      const a = f0 + w * per;
      const b = Math.min(f1, a + per);
      if (a >= b) return;
      const seg = path.join(tmp, `seg-${String(w).padStart(2, '0')}.mp4`);
      segments[w] = seg;
      const page = await openPage();
      const enc = spawn('ffmpeg', [
        '-loglevel', 'error', '-y',
        '-f', 'image2pipe', '-framerate', String(fps), '-c:v', USE_JPEG ? 'mjpeg' : 'png', '-i', '-',
        '-c:v', 'libx264', '-preset', 'medium', '-crf', CRF, '-pix_fmt', 'yuv420p',
        '-profile:v', 'high', '-r', String(fps), '-movflags', '+faststart', seg,
      ], { stdio: ['pipe', 'inherit', 'inherit'] });
      const encDone = new Promise((res, rej) => enc.on('close', (code) => (code === 0 ? res() : rej(new Error(`ffmpeg exited ${code}`)))));
      for (let f = a; f < b; f += 1) {
        await page.evaluate((tt) => window.__film.seek(tt), f / fps);
        const buf = await page.screenshot(USE_JPEG ? { type: 'jpeg', quality: 95 } : { type: 'png' });
        if (!enc.stdin.write(buf)) await new Promise((r) => enc.stdin.once('drain', r));
        done += 1;
      }
      enc.stdin.end();
      await encDone;
      await page.close();
    })
  );
  clearInterval(ticker);
  process.stdout.write('\n');
  const list = path.join(tmp, 'list.txt');
  fs.writeFileSync(list, segments.filter(Boolean).map((s) => `file '${s}'`).join('\n'));
  const silent = path.join(tmp, 'video.mp4');
  run(['-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', silent]);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  if (args.audio) {
    const dur = total / fps;
    const fadeOut = Number(args['audio-fade'] || 1.2);
    run([
      '-loglevel', 'error', '-y', '-i', silent, '-i', path.resolve(args.audio),
      '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k',
      '-af', `apad,atrim=0:${dur.toFixed(3)},afade=t=out:st=${Math.max(0, dur - fadeOut).toFixed(3)}:d=${fadeOut}`,
      '-t', dur.toFixed(3), '-movflags', '+faststart', OUT,
    ]);
  } else fs.copyFileSync(silent, OUT);
  const probeOut = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration:stream=codec_name,width,height,r_frame_rate', '-of', 'json', OUT]);
  console.log(`Wrote ${OUT} in ${((Date.now() - started) / 1000).toFixed(0)}s`);
  console.log(probeOut.stdout.toString().replace(/\s+/g, ' '));
} finally {
  // never let a stuck browser or keep-alive socket hold the process open
  await Promise.race([browser.close().catch(() => {}), new Promise((r) => setTimeout(r, 10000))]);
  server.closeAllConnections?.();
  server.close();
  fs.rmSync(tmp, { recursive: true, force: true });
}
process.exit(0);

async function openPage() {
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: RES.scale });
  const page = await context.newPage();
  page.on('pageerror', (e) => console.error('page error:', e.message));
  await page.goto(`${url}index.html?render=1`, { waitUntil: 'load', timeout: 120000 });
  await page.evaluate(() => window.__film.ready);
  const close = page.close.bind(page);
  page.close = async () => {
    await close();
    await context.close();
  };
  return page;
}
function run(ffargs) {
  const r = spawnSync('ffmpeg', ffargs, { stdio: 'inherit' });
  if (r.status !== 0) throw new Error(`ffmpeg failed: ${ffargs.join(' ')}`);
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
