import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const BUDGET_KB = 450;
const PORT = 3000;
const ROOT = process.cwd();
const OUT = path.join(ROOT, ".next");

if (!fs.existsSync(path.join(OUT, "build-manifest.json"))) {
  console.error("bundle-size check: .next/build-manifest.json not found — run `next build` first.");
  process.exit(1);
}

let server;
const base = `http://localhost:${PORT}`;

function waitForReady(retries) {
  return new Promise((resolve, reject) => {
    const tryOnce = (n) => {
      fetch(`${base}/`, { signal: AbortSignal.timeout(1000) })
        .then(() => resolve())
        .catch((err) => {
          if (n <= 0) reject(new Error("preview server did not become ready: " + err.message));
          else setTimeout(() => tryOnce(n - 1), 250);
        });
    };
    tryOnce(retries);
  });
}

let html;
server = spawn("npx", ["next", "start", "--port", String(PORT)], {
  cwd: ROOT,
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, NODE_ENV: "production" },
});

let stderr = "";
server.stderr.on("data", (d) => { stderr += d.toString(); });

try {
  await waitForReady(40);
} catch (err) {
  console.error(err.message);
  console.error(stderr.slice(-2000));
  server.kill();
  process.exit(1);
}

try {
  const res = await fetch(`${base}/`);
  html = await res.text();
} catch (err) {
  console.error("bundle-size check: could not fetch /: " + err.message);
  console.error(stderr.slice(-2000));
  server.kill();
  process.exit(1);
}

const urls = new Set();
const re = /<script[^>]+src="([^"]+)"/g;
let m;
while ((m = re.exec(html)) !== null) urls.add(m[1]);
const linkRe = /<link[^>]+rel="modulepreload"[^>]+href="([^"]+)"/g;
while ((m = linkRe.exec(html)) !== null) {
  if (m[1].endsWith(".js")) urls.add(m[1]);
}

const jsUrls = [...urls].filter((u) => u.endsWith(".js"));
let totalGz = 0;
const rows = [];

for (const u of jsUrls) {
  const url = u.startsWith("http") ? u : `${base}${u}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error("bundle-size check: failed to fetch " + url + ": " + res.status);
    server.kill();
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const gz = zlib.gzipSync(buf).length;
  totalGz += gz;
  rows.push([u, gz]);
}

server.kill();

const budgetBytes = BUDGET_KB * 1024;
const over = totalGz > budgetBytes;

console.log("Bundle-size guard (first-view JS, gzipped, budget " + BUDGET_KB + " KB):");
for (const [u, gz] of rows) {
  console.log("  " + (gz / 1024).toFixed(2) + " KB  " + u);
}
console.log("  total: " + (totalGz / 1024).toFixed(2) + " KB " + (over ? "OVER BUDGET" : "within budget"));

if (over) {
  console.error("bundle-size check failed: " + (totalGz / 1024).toFixed(2) + " KB > " + BUDGET_KB + " KB budget.");
  process.exit(1);
}
process.exit(0);
