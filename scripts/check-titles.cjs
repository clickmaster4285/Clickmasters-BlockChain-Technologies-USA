/**
 * Checks <title> tags of every prerendered page in the last build
 * (.next/server/app/**\/*.html) and reports:
 *   - duplicate titles (two URLs sharing one title)  → exit code 1
 *   - titles longer than 65 characters               → warning
 *   - titles cut with an ellipsis                    → warning
 *
 * Usage: npm run build && npm run check:titles
 * Fix a collision by adding the path to config/title-overrides.ts.
 */
const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, '..', '.next', 'server', 'app');
const MAX_LENGTH = 65;

if (!fs.existsSync(APP_DIR)) {
  console.error('No build output found. Run `npm run build` first.');
  process.exit(2);
}

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

const decode = (text) =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const byTitle = new Map();
const tooLong = [];
const ellipsis = [];

for (const file of htmlFiles(APP_DIR)) {
  const route = '/' + path.relative(APP_DIR, file).replace(/\\/g, '/').replace(/\.html$/, '');
  if (/^\/(_not-found|_global-error|404|500)$/.test(route)) continue;
  const html = fs.readFileSync(file, 'utf8');
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;
  const match = html.match(/<title>([^<]*)<\/title>/);
  if (!match) continue;
  const title = decode(match[1]);
  const url = route === '/index' ? '/' : route;
  if (!byTitle.has(title)) byTitle.set(title, []);
  byTitle.get(title).push(url);
  if (title.length > MAX_LENGTH) tooLong.push(`${title.length}  ${title}  (${url})`);
  if (title.includes('…')) ellipsis.push(`${title}  (${url})`);
}

const duplicates = [...byTitle].filter(([, urls]) => urls.length > 1);
const pages = [...byTitle.values()].reduce((sum, urls) => sum + urls.length, 0);

console.log(`Checked ${pages} prerendered, indexable pages.`);
for (const [title, urls] of duplicates) console.log(`DUPLICATE  "${title}"\n           ${urls.join('\n           ')}`);
for (const line of tooLong) console.log(`LONG       ${line}`);
for (const line of ellipsis) console.log(`ELLIPSIS   ${line}`);
console.log(`${duplicates.length} duplicate title(s), ${tooLong.length} over ${MAX_LENGTH} chars, ${ellipsis.length} with an ellipsis.`);

process.exit(duplicates.length > 0 ? 1 : 0);
