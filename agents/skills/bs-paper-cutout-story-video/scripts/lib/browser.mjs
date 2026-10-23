// Resolves Playwright from the film project (or any parent), then launches
// Chromium. System Chrome is tried first because many product sites reject
// the bundled headless build; the bundled Chromium is the fallback.
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';

function candidateBases() {
  const bases = new Set();
  let dir = process.cwd();
  for (let i = 0; i < 6; i += 1) {
    bases.add(path.join(dir, 'noop.js'));
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  if (process.env.FILM_NODE_MODULES) {
    bases.add(path.join(process.env.FILM_NODE_MODULES, '..', 'noop.js'));
  }
  bases.add(new URL(import.meta.url).pathname);
  return [...bases];
}

export function loadPlaywright() {
  const errors = [];
  for (const name of ['playwright', 'playwright-core']) {
    for (const base of candidateBases()) {
      try {
        const req = createRequire(base);
        const mod = req(name);
        if (mod?.chromium) return mod;
      } catch (error) {
        errors.push(`${name} via ${base}: ${error.code ?? error.message}`);
      }
    }
  }
  throw new Error(
    'Playwright is not installed. In the film project folder run:\n' +
      '  npm install playwright-core\n' +
      'and either install Google Chrome or run: npx playwright install chromium'
  );
}

export async function launchChromium({ headless = true, args = [] } = {}) {
  const { chromium } = loadPlaywright();
  const attempts = [];
  if (process.env.FILM_CHROME_PATH && fs.existsSync(process.env.FILM_CHROME_PATH)) {
    attempts.push({ executablePath: process.env.FILM_CHROME_PATH });
  }
  if (process.env.FILM_BROWSER !== 'bundled') attempts.push({ channel: 'chrome' });
  attempts.push({});
  let lastError;
  for (const attempt of attempts) {
    try {
      return await chromium.launch({
        headless,
        args: ['--hide-scrollbars', '--force-color-profile=srgb', ...args],
        ...attempt,
      });
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}
