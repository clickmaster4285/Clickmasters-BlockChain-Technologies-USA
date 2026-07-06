/**
 * Conversion Script: Cost Pages MD → Data File
 *
 * Self-contained — no shared dependencies. Reads md/cost/ and writes data/costs.js.
 * Usage: node scripts/convert-costs.js
 */

const fs = require('fs');
const path = require('path');

const MD_DIR = path.join(__dirname, '..', 'md', 'cost');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'costs.js');

// ─── Helpers ────────────────────────────────────────────────────────

function mdToSlug(fileName) {
  return fileName
    .replace(/\.md$/i, '')
    .replace(/^\d+[_\-]\s*/, '')
    .replace(/^\d+_to_\d+[_\-]\s*/, '')
    .trim();
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  if (match) return match[1].trim();
  const h1Match = content.match(/^##\s*H1:\s*(.+)$/mi);
  return h1Match ? h1Match[1].trim() : 'Untitled';
}

function extractField(content, fieldName) {
  // Multi-line: captures continuation lines but stops at `**Field:` or `- **Field:` boundaries
  const pattern = new RegExp(
    `\\*\\*${escapeRegex(fieldName)}:\\*\\*\\s*([^\\n]+(?:\\n(?!\\s*(?:-\\s+)?\\*\\*|\\s*---|\\s*$)[^\\n]+)*)`,
    'm'
  );
  const match = content.match(pattern);
  if (match) return match[1].trim().replace(/`/g, '').trim();

  const simple = new RegExp(`-\\s*\\*\\*${escapeRegex(fieldName)}:\\*\\*\\s*([^\\n]+)`, 'm');
  const simpleMatch = content.match(simple);
  return simpleMatch ? simpleMatch[1].trim() : undefined;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
    let match;
    while ((match = bulletRegex.exec(body)) !== null) {
      bullets.push(match[1].trim());
    }

    const cleanContent = body
      .replace(/[*-]\s+[^\n]+(\n|$)/g, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    sections.push({
      heading,
      content: cleanContent || body.substring(0, 300).trim(),
      bullets: bullets.length > 0 ? bullets : undefined,
    });
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
  } else {
    faqText = content;
  }

  const qaRegex = /\*\*(.+?\?)\*\*\s*([\s\S]*?)(?=\n\*\*|$)/g;
  let m;
  while ((m = qaRegex.exec(faqText)) !== null) {
    const question = m[1].trim();
    const answer = m[2].trim().replace(/\n{2,}/g, '\n').trim();
    if (question && answer && answer.length > 10) {
      faq.push({ question, answer });
    }
  }

  return faq;
}

function extractCtas(content) {
  const ctas = [];
  const ctaRegex = /\[BUTTON\s*[—–-]\s*(PRIMARY|SECONDARY)\]\s*([^\n→]*)(?:→)?/g;
  let m;
  while ((m = ctaRegex.exec(content)) !== null) {
    const btnText = m[2].trim();
    const linkMatch = btnText.match(/\[([^\]]*)\]\(([^)]+)\)/);
    ctas.push({
      text: linkMatch ? btnText.replace(/\[([^\]]*)\]\([^)]+\)/g, '$1').trim() : btnText,
      href: linkMatch ? linkMatch[2].trim() : '#',
      primary: m[1] === 'PRIMARY',
    });
  }
  return ctas;
}

function extractTags(content, meta) {
  const tags = [];
  if (meta.primaryKeyword) tags.push(meta.primaryKeyword);
  if (meta.secondaryKeywords) meta.secondaryKeywords.slice(0, 5).forEach(t => tags.push(t));

  const keywords = ['Cost', 'Pricing', 'Budget', 'Blockchain', 'Development', 'Smart Contract',
    'DeFi', 'NFT', 'Wallet', 'Exchange', 'Enterprise', 'GameFi', 'Web3'];
  for (const kw of keywords) {
    if (meta.title.toLowerCase().includes(kw.toLowerCase())) {
      tags.push(kw);
    }
  }

  return [...new Set(tags)].slice(0, 10);
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

  const meta = {
    url, title, primaryKeyword,
    secondaryKeywords, schema,
    wordCount: content.split(/\s+/).length,
  };

  const sections = extractSections(content);
  const faq = extractFaq(content);
  const ctas = extractCtas(content);
  const tags = extractTags(content, meta);

  return { slug, meta, sections, faq, ctas, tags, category: 'cost' };
}

// ─── Main ───────────────────────────────────────────────────────────

function convertCosts() {
  console.log('Converting md/cost/ → data/costs.js\n');

  if (!fs.existsSync(MD_DIR)) {
    console.error('  ❌ md/cost/ directory not found');
    process.exit(1);
  }

  const files = fs.readdirSync(MD_DIR).filter(f => f.endsWith('.md'));
  console.log(`  Found ${files.length} cost pages\n`);

  const items = [];

  for (const file of files) {
    const parsed = parseMdFile(path.join(MD_DIR, file));
    if (parsed) items.push(parsed);
  }

  // Deduplicate by slug (first occurrence wins)
  const seenSlugs = new Set();
  const deduped = [];
  for (const item of items) {
    if (!seenSlugs.has(item.slug)) {
      seenSlugs.add(item.slug);
      deduped.push(item);
    }
  }
  items.length = 0;
  items.push(...deduped);

  // Sort by slug
  items.sort((a, b) => a.slug.localeCompare(b.slug));

  console.log(`  Processed ${items.length} cost pages`);

  // Build the output
  const output = `/**
 * Cost Pages Data
 * Generated from ${files.length} .md files in md/cost/
 * Run \`node scripts/convert-costs.js\` to regenerate
 */

const costs = ${JSON.stringify(items, null, 2)};

// ─── Utility Functions ──────────────────────────────────────────────

function getCostBySlug(slug) {
  return costs.find(item => item.slug === slug);
}

function getCostCards(options) {
  let cards = costs.map(item => ({
    slug: item.slug,
    title: item.meta.title,
    description: item.sections[0]?.content?.substring(0, 200) || item.meta.title,
    category: 'cost',
    tags: item.tags,
    url: item.meta.url,
  }));

  if (options?.tag) {
    cards = cards.filter(c => c.tags?.includes(options.tag));
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    cards = cards.filter(c =>
      c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }
  if (options?.offset) cards = cards.slice(options.offset);
  if (options?.limit) cards = cards.slice(0, options.limit);

  return cards;
}

function getCostsByTag(tag) {
  return costs.filter(item => item.tags?.includes(tag));
}

function searchCosts(query) {
  const q = query.toLowerCase();
  return costs.filter(item =>
    item.meta.title.toLowerCase().includes(q) ||
    item.slug.toLowerCase().includes(q)
  );
}

module.exports = { costs, getCostBySlug, getCostCards, getCostsByTag, searchCosts };
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`\n  ✅ Written to data/costs.js`);
  console.log(`  📊 ${items.length} cost pages`);
}

convertCosts();
