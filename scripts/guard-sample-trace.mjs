import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");

// 1. Find all trace files that define source === "sample"
const sampleTraceFiles = [];

function findSampleTraces(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findSampleTraces(full);
    } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
      const content = fs.readFileSync(full, "utf8");
      if (content.includes('source: "sample"')) {
        sampleTraceFiles.push(full);
      }
    }
  }
}
findSampleTraces(SRC);

// 2. Find all files that import from those sample trace files
const importingFiles = [];

function scanImports(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!entry.name.startsWith(".") && entry.name !== "node_modules") {
        scanImports(full);
      }
    } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
      const content = fs.readFileSync(full, "utf8");
      for (const sampleFile of sampleTraceFiles) {
        const relPath = path.relative(SRC, sampleFile).replace(/\.(ts|tsx)$/, "");
        const importPatterns = [
          `from "@/data/${relPath}"`,
          `from "../${path.basename(sampleFile)}"`,
          `from "./${path.basename(sampleFile)}"`,
          `from "${sampleFile}"`,
        ];
        if (importPatterns.some((p) => content.includes(p))) {
          importingFiles.push(full);
        }
      }
    }
  }
}
scanImports(SRC);

// 3. Check if any importing file is a client component (has "use client")
// or is a page/route that gets bundled for production
const productionBoundFiles = [];

for (const file of importingFiles) {
  const content = fs.readFileSync(file, "utf8");
  const isClientComponent = content.includes('"use client"');
  const isPageOrRoute =
    file.includes("/app/") ||
    file.includes("/pages/") ||
    file.includes("/components/");
  if (isClientComponent || isPageOrRoute) {
    productionBoundFiles.push(file);
  }
}

// 4. Report
if (sampleTraceFiles.length === 0) {
  console.log("trace guard: no sample traces found — PASS");
  process.exit(0);
}

console.log(`trace guard: found ${sampleTraceFiles.length} sample trace file(s):`);
for (const f of sampleTraceFiles) {
  console.log(`  ${path.relative(ROOT, f)}`);
}

if (productionBoundFiles.length > 0) {
  console.error(
    `trace guard FAILED: ${productionBoundFiles.length} production-bound file(s) import sample trace(s):`
  );
  for (const f of productionBoundFiles) {
    console.error(`  ${path.relative(ROOT, f)}`);
  }
  console.error(
    "Sample traces (source === 'sample') must not be included in production builds. Move them to a dev-only location or remove them."
  );
  process.exit(1);
}

console.log(
  "trace guard: sample traces found but not imported by any production-bound file — PASS"
);
process.exit(0);
