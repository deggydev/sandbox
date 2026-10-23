// Small FAL queue client. Every request is recorded in a ledger so polling
// and downloads are idempotent, and a paid job is never submitted twice for
// the same input without an explicit resubmit.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const QUEUE = 'https://queue.fal.run';

export function falKey() {
  const key = process.env.FAL_KEY;
  if (!key) throw new Error('FAL_KEY is not set. Export FAL_KEY=... (https://fal.ai/dashboard/keys) or skip generated media.');
  return key;
}

async function call(url, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: { Authorization: `Key ${falKey()}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = { raw: text };
  }
  if (!res.ok) {
    const err = new Error(`FAL ${res.status}: ${text.slice(0, 400)}`);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

export function inputHash(model, input) {
  return crypto.createHash('sha256').update(JSON.stringify({ model, input })).digest('hex').slice(0, 16);
}

export class Ledger {
  constructor(file) {
    this.file = file;
    this.data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { jobs: {} };
  }
  get(id) {
    return this.data.jobs[id];
  }
  set(id, value) {
    this.data.jobs[id] = { ...(this.data.jobs[id] || {}), ...value, updatedAt: new Date().toISOString() };
    fs.mkdirSync(path.dirname(this.file), { recursive: true });
    fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2));
  }
}

export async function submit(model, input) {
  const body = await call(`${QUEUE}/${model}`, { method: 'POST', body: JSON.stringify(input) });
  return { requestId: body.request_id, statusUrl: body.status_url, responseUrl: body.response_url };
}

export async function status(job) {
  return call(job.statusUrl || `${QUEUE}/${job.model}/requests/${job.requestId}/status`);
}

export async function result(job) {
  return call(job.responseUrl || `${QUEUE}/${job.model}/requests/${job.requestId}`);
}

/** Polls until COMPLETED or a terminal failure; never resubmits. */
export async function waitFor(job, { intervalMs = 4000, timeoutMs = 20 * 60 * 1000, onTick } = {}) {
  const started = Date.now();
  for (;;) {
    const st = await status(job);
    if (onTick) onTick(st);
    if (st.status === 'COMPLETED') return result(job);
    if (st.status === 'FAILED' || st.status === 'ERROR' || st.error) {
      const err = new Error(`FAL job ${job.requestId} failed: ${JSON.stringify(st).slice(0, 300)}`);
      err.terminal = true;
      throw err;
    }
    if (Date.now() - started > timeoutMs) throw new Error(`Timed out waiting for ${job.requestId}; rerun the same command later to keep polling.`);
    await new Promise((r) => setTimeout(r, intervalMs));
  }
}

export async function download(url, file) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buf);
  return buf.length;
}
