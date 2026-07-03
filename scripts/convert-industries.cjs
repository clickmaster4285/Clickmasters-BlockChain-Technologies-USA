/**
 * Conversion Script: Industry Pages MD → Data File
 *
 * Self-contained — no shared dependencies. Reads md/industry/ and writes data/industries.js.
 * Usage: node scripts/convert-industries.js
 */

const fs = require('fs');
const path = require('path');

const MD_DIR = path.join(__dirname, '..', 'md', 'industry');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'industries.js');

function mdToSlug(fileName) {
  return fileName.replace(/\.md$/i, '').replace(/^\d+[_\-]\s*/, '').replace(/^\d+_to_\d+[_\-]\s*/, '').trim();
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : 'Untitled';
}

function extractField(content, fieldName) {
  const pattern = new RegExp(`\\*\\*${fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\*\\*\\s*([^\\n]+(?:\\n(?!\\s*\\*\\*|\\s*---|\\s*$)[^\\n]+)*)`, 'm');
  const match = content.match(pattern);
  if (match) return match[1].trim().replace(/`/g, '').trim();
  const simple = new RegExp(`-\\s*\\*\\*${fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\*\\*\\s*([^\\n]+)`, 'm');
  const simpleMatch = content.match(simple);
  return simpleMatch ? simpleMatch[1].trim() : undefined;
}

function extractSections(content) {
  const sections = [];
  const parts = content.split(/^##\s+(.+)$/m);
  for (let i = 1; i < parts.length; i += 2) {
    const heading = parts[i]?.trim() || '';
    const body = parts[i + 1]?.trim() || '';
    if (!heading || heading.startsWith('---')) continue;
    if (heading.toLowerCase().includes('faq') || heading.toLowerCase().includes('frequently asked')) continue;
    if (heading.toLowerCase().includes('cta') || heading.toLowerCase().includes('ready to')) continue;
    const bullets = [];
    const bulletRegex = /[*-]\s+(.+)/g;
    let m;
    while ((m = bulletRegex.exec(body)) !== null) bullets.push(m[1].trim());
    const cleanContent = body.replace(/[*-]\s+[^\n]+(\n|$)/g, '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\n{3,}/g, '\n\n').trim();
    sections.push({ heading, content: cleanContent || body.substring(0, 300).trim(), bullets: bullets.length > 0 ? bullets : undefined });
  }
  return sections;
}

function extractFaq(content) {
  const faq = [];
  const faqSplit = content.split(/^##\s+.+(?:faq|frequently asked|questions answered)/im);
  let faqText = '';
  if (faqSplit.length > 1) {
    for (let i = 1; i < faqSplit.length; i++) {
      const section = faqSplit[i];
      const endIdx = section.search(/^##\s/m);
      faqText += (endIdx > 0 ? section.substring(0, endIdx) : section) + '\n';
    }
  } else faqText = content;
  const qaRegex = /\*\*(.+?\?)\*\*\s*([\s\S]*?)(?=\n\*\*|$)/g;
  let m;
  while ((m = qaRegex.exec(faqText)) !== null) {
    const question = m[1].trim();
    const answer = m[2].trim().replace(/\n{2,}/g, '\n').trim();
    if (question && answer && answer.length > 10) faq.push({ question, answer });
  }
  return faq;
}

function extractCtas(content) {
  const ctas = [];
  const ctaRegex = /\[BUTTON\s*[—–-]\s*(PRIMARY|SECONDARY)\]\s*([^\n→]*)(?:→)?/g;
  let m;
  while ((m = ctaRegex.exec(content)) !== null) ctas.push({ text: m[2].trim(), href: '#', primary: m[1] === 'PRIMARY' });
  return ctas;
}

function extractTags(content, meta) {
  const tags = meta.primaryKeyword ? [meta.primaryKeyword] : [];
  if (meta.secondaryKeywords) meta.secondaryKeywords.slice(0, 5).forEach(t => tags.push(t));
  const keywords = ['Finance', 'Real Estate', 'Healthcare', 'Supply Chain', 'Gaming', 'Retail', 'Education', 'Government', 'Energy', 'Logistics'];
  for (const kw of keywords) if (meta.title.toLowerCase().includes(kw.toLowerCase())) tags.push(kw);
  return [...new Set(tags)].slice(0, 10);
}

function extractUseCases(content) {
  const useCases = [];
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if ((trimmed.startsWith('- **') || trimmed.startsWith('* **')) && trimmed.includes('**')) {
      useCases.push(trimmed.replace(/^[-*]\s*\*\*/, '').replace(/\*\*.*$/, '').trim());
    }
  }
  return useCases.slice(0, 10);
}

function parseMdFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  if (!content) return null;
  const fileName = path.basename(filePath);
  const slug = mdToSlug(fileName);
  const title = extractTitle(content);
  const url = extractField(content, 'URL') || '';
  const primaryKeyword = extractField(content, 'Primary KW') || extractField(content, 'Primary Keyword');
  const secondaryRaw = extractField(content, 'Secondary KWs') || extractField(content, 'Secondary Keywords');
  const secondaryKeywords = secondaryRaw ? secondaryRaw.split(',').map(s => s.trim()) : [];
  const schema = extractField(content, 'Schema');
  const meta = { url, title, primaryKeyword, secondaryKeywords, schema, wordCount: content.split(/\s+/).length };
  const sections = extractSections(content);
  const faq = extractFaq(content);
  const ctas = extractCtas(content);
  const tags = extractTags(content, meta);
  const useCases = extractUseCases(content);
  return { slug, meta, sections, faq, ctas, tags, category: 'industry', useCases };
}

function convertIndustries() {
  console.log('Converting md/industry/ → data/industries.js\n');
  if (!fs.existsSync(MD_DIR)) { console.error('  ❌ md/industry/ not found'); process.exit(1); }
  const files = fs.readdirSync(MD_DIR).filter(f => f.endsWith('.md'));
  console.log(`  Found ${files.length} industry pages\n`);
  const items = [];
  for (const file of files) { const parsed = parseMdFile(path.join(MD_DIR, file)); if (parsed) items.push(parsed); }
  items.sort((a, b) => a.slug.localeCompare(b.slug));
  console.log(`  Processed ${items.length} industry pages`);

  const output = `/**
 * Industry Pages Data
 * Generated from ${files.length} .md files in md/industry/
 * Run \`node scripts/convert-industries.js\` to regenerate
 */

const industries = ${JSON.stringify(items, null, 2)};

function getIndustryBySlug(slug) {
  return industries.find(item => item.slug === slug);
}

function getIndustryCards(options) {
  let cards = industries.map(item => ({
    slug: item.slug,
    title: item.meta.title,
    description: item.sections[0]?.content?.substring(0, 200) || item.meta.title,
    category: 'industry',
    tags: item.tags,
    url: item.meta.url,
  }));
  if (options?.tag) cards = cards.filter(c => c.tags?.includes(options.tag));
  if (options?.search) { const q = options.search.toLowerCase(); cards = cards.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)); }
  if (options?.offset) cards = cards.slice(options.offset);
  if (options?.limit) cards = cards.slice(0, options.limit);
  return cards;
}

function getIndustriesByTag(tag) { return industries.filter(item => item.tags?.includes(tag)); }

function searchIndustries(query) {
  const q = query.toLowerCase();
  return industries.filter(item => item.meta.title.toLowerCase().includes(q) || item.slug.toLowerCase().includes(q));
}

module.exports = { industries, getIndustryBySlug, getIndustryCards, getIndustriesByTag, searchIndustries };
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`\n  ✅ Written to data/industries.js`);
  console.log(`  📊 ${items.length} industry pages`);
}

convertIndustries();
