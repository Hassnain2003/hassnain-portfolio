import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");

// Collect all source files that contain hrefs
const sourceFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!entry.name.startsWith(".") && entry.name !== "node_modules" && entry.name !== ".next") {
        walk(full);
      }
    } else if (entry.name.match(/\.(tsx?|html)$/)) {
      sourceFiles.push(full);
    }
  }
}
walk(path.join(ROOT, "src"));

// Extract hrefs from source files
const hrefRe = /href="([^"]+)"/g;
const problems = [];

for (const file of sourceFiles) {
  const content = fs.readFileSync(file, "utf8");
  let m;
  while ((m = hrefRe.exec(content)) !== null) {
    const href = m[1];

    // Skip mailto, tel, javascript, data
    if (
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:") ||
      href.startsWith("data:")
    ) continue;

    // External URLs - can't check without network, skip
    if (href.startsWith("http://") || href.startsWith("https://")) continue;

    // Internal anchor - always OK
    if (href.startsWith("#")) continue;

    // _next static assets - served by Next.js, always OK
    if (href.startsWith("/_next/")) continue;

    // Root-relative path - check in public/
    if (href.startsWith("/")) {
      const target = path.join(PUBLIC, href.replace(/^\//, ""));
      if (!fs.existsSync(target)) {
        problems.push(`${file}: broken root-relative link "${href}"`);
      }
      continue;
    }

    // Relative path - resolve from the source file's directory
    const target = path.resolve(path.dirname(file), href);
    if (!fs.existsSync(target) && !fs.existsSync(target + ".html") && !fs.existsSync(target + ".tsx") && !fs.existsSync(target + ".ts")) {
      problems.push(`${file}: broken relative link "${href}"`);
    }
  }
}

if (problems.length > 0) {
  console.error("Link checker found broken links:");
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

console.log(`Link checker: ${sourceFiles} source files scanned, 0 broken links`);
