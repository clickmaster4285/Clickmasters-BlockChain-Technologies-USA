/**
 * Checks <title> tags of every prerendered page in the last build
 * (.next/server/app/**\/*.html) and reports:
 *   - duplicate titles (two URLs sharing one title)  → exit code 1
 *   - missing or empty titles                        → exit code 1
 *   - titles longer than 60 characters               → exit code 1
 *   - titles cut with an ellipsis                    → warning
 *
 * Usage: npm run build && npm run check:titles
 * Fix a collision or an over-long title by adding the path to
 * config/title-overrides.ts.
 */
const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "..", ".next", "server", "app");
/** Must match TITLE_MAX in config/metadata.ts. */
const MAX_LENGTH = 60;

if (!fs.existsSync(APP_DIR)) {
  console.error("No build output found. Run `npm run build` first.");
  process.exit(2);
}

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith(".html") ? [full] : [];
  });
}

const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const byTitle = new Map();
const tooLong = [];
const ellipsis = [];
const missing = [];

for (const file of htmlFiles(APP_DIR)) {
  const route =
    "/" +
    path
      .relative(APP_DIR, file)
      .replace(/\\/g, "/")
      .replace(/\.html$/, "");
  if (/^\/(_not-found|_global-error|404|500)$/.test(route)) continue;
  const html = fs.readFileSync(file, "utf8");
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;
  const url = route === "/index" ? "/" : route;
  const match = html.match(/<title>([^<]*)<\/title>/);
  const title = match ? decode(match[1]).trim() : "";
  if (!title) {
    missing.push(url);
    continue;
  }
  if (!byTitle.has(title)) byTitle.set(title, []);
  byTitle.get(title).push(url);
  if (title.length > MAX_LENGTH)
    tooLong.push(`${title.length}  ${title}  (${url})`);
  if (title.includes("…")) ellipsis.push(`${title}  (${url})`);
}

const duplicates = [...byTitle].filter(([, urls]) => urls.length > 1);
const pages =
  [...byTitle.values()].reduce((sum, urls) => sum + urls.length, 0) +
  missing.length;

console.log(`Checked ${pages} prerendered, indexable pages.`);
for (const [title, urls] of duplicates)
  console.log(
    `DUPLICATE  "${title}"\n           ${urls.join("\n           ")}`,
  );
for (const url of missing) console.log(`MISSING    ${url}`);
for (const line of tooLong) console.log(`LONG       ${line}`);
for (const line of ellipsis) console.log(`ELLIPSIS   ${line}`);
console.log(
  `${duplicates.length} duplicate title(s), ${missing.length} missing, ` +
    `${tooLong.length} over ${MAX_LENGTH} chars, ${ellipsis.length} with an ellipsis.`,
);

process.exit(duplicates.length + missing.length + tooLong.length > 0 ? 1 : 0);
