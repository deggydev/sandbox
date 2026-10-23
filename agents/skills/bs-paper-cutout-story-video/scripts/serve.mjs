#!/usr/bin/env node
// Serves a built film folder for preview: node serve.mjs <film-dir> [--port 4173]
import { serveDir } from './lib/server.mjs';

const dir = process.argv[2];
if (!dir) {
  console.error('Usage: node serve.mjs <film-dir> [--port 4173]');
  process.exit(2);
}
const i = process.argv.indexOf('--port');
const port = i > 0 ? Number(process.argv[i + 1]) : 4173;
const { url } = await serveDir(dir, port);
console.log(`Preview: ${url}index.html  (space = play, arrows = step, [ ] = scene)`);
