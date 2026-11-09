import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const STRICT = process.argv.includes("--strict");

const TODO_RE = /TODO/i;
const PENDING_RE = /Result:\s*pending/i;

function walk(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      results = results.concat(walk(full));
    } else if (/\.(ts|tsx|md)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

const files = walk(SRC).sort();
const hits = [];

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    const n = i + 1;
    if (TODO_RE.test(line) || PENDING_RE.test(line)) {
      hits.push({ file: rel, line: n, content: line.trim() });
    }
  });
}

if (hits.length) {
  console.log(`TODO guard: ${hits.length} TODO marker(s) found:`);
  for (const h of hits) {
    console.log(`  ${h.file}:${h.line}  ${h.content}`);
  }
} else {
  console.log("TODO guard: no TODO markers found.");
}

if (STRICT && hits.length) {
  console.error("TODO guard: strict mode failed — resolve all TODOs before production build.");
  process.exit(1);
}
process.exit(0);
