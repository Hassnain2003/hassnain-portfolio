import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const LIGHTHOUSE_DIR = path.join(ROOT, "docs/build-log/phase-0");
const TELEMETRY_PATH = path.join(ROOT, "src/data/telemetry.json");

function readLighthouseScore(kind) {
  const p = path.join(LIGHTHOUSE_DIR, `lighthouse.${kind}.json`);
  if (!fs.existsSync(p)) return null;
  try {
    const d = JSON.parse(fs.readFileSync(p, "utf8"));
    return Math.round(d.categories.performance.score * 100);
  } catch {
    return null;
  }
}

const perf = readLighthouseScore("mobile") ?? readLighthouseScore("desktop") ?? null;

const telemetry = {
  generatedAt: new Date().toISOString(),
  lighthouse: perf ? `Lighthouse ${perf}` : null,
  bundleSize: null,
  source: "docs/build-log/phase-0/lighthouse.mobile.json",
};

fs.mkdirSync(path.dirname(TELEMETRY_PATH), { recursive: true });
fs.writeFileSync(TELEMETRY_PATH, JSON.stringify(telemetry, null, 2) + "\n");

console.log(`telemetry: lighthouse=${telemetry.lighthouse}`);
