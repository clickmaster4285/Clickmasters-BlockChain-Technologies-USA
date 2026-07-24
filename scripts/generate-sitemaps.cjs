const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://clickmastersblockchaintechnologies.com/';
const DATA_DIR = path.join(__dirname, '..', 'data');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

function extractData(filePath, arrayName) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');

  let marker = `export const ${arrayName}`;
  let start = content.indexOf(marker);
  if (start === -1) {
    marker = `const ${arrayName}`;
    start = content.indexOf(marker);
  }
  if (start === -1) return [];

  const arrayStart = content.indexOf('[', start);
  if (arrayStart === -1) return [];

  let depth = 0;
  let i = arrayStart;
  for (; i < content.length; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') { depth--; if (depth === 0) break; }
  }

  const arrayStr = content.slice(arrayStart, i + 1);
  try { return JSON.parse(arrayStr); }
  catch {
    try { return new Function(`"use strict"; return (${arrayStr})`)(); }
    catch (e) {
      return [];
    }
  }
}

function extractSlugs(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugs = [];
  const regex = /slug["']?\s*:\s*["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

function extractMetaUrls(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const urls = [];
  const regex = /["']url["']?\s*:\s*["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function generateSitemapXml(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const url of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    if (url.lastmod) xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    if (url.changefreq) xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    if (url.priority) xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  }
  xml += '</urlset>';
  return xml;
}

function generateSitemapIndexXml(sitemapUrls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const sitemapUrl of sitemapUrls) {
    xml += '  <sitemap>\n';
    xml += `    <loc>${sitemapUrl}</loc>\n`;
    xml += '  </sitemap>\n';
  }
  xml += '</sitemapindex>';
  return xml;
}

function buildUrl(pathname) {
  return `${BASE_URL}${pathname.replace(/^\//, '')}`;
}

function entryToUrl(entry) {
  if (entry.meta && entry.meta.url) {
    return entry.meta.url.replace(/\/$/, '');
  }
  if (entry.slug) {
    return '/' + entry.slug.replace(/^\//, '');
  }
  return null;
}

const CATEGORIES = [
  {
    key: 'services',
    file: 'services.ts',
    varName: null,
    isTs: true,
    mainPath: '/service',
    route: (slug) => `/service/${slug}`,
  },
  {
    key: 'blockchain-services',
    file: 'blockchain-services.ts',
    varName: null,
    isTs: true,
    mainPath: '/service',
    route: (slug) => `/service/${slug}`,
  },
  {
    key: 'costs',
    file: 'costs.ts',
    varName: 'costs',
    isTs: false,
    mainPath: null,
    route: null,
    useMetaUrl: true,
  },
  {
    key: 'md-services',
    file: 'md-services.js',
    varName: 'mdServices',
    isTs: false,
    mainPath: null,
    route: null,
    useMetaUrl: true,
  },
  {
    key: 'industries',
    file: 'industries.js',
    varName: 'industries',
    isTs: false,
    mainPath: '/industries',
    route: (slug) => `/industries/${slug}`,
  },
  {
    key: 'locations',
    file: 'locations.js',
    varName: 'locations',
    isTs: false,
    mainPath: '/locations',
    route: (slug) => `/locations/${slug}`,
  },
  {
    key: 'case-studies',
    file: 'case-studies.js',
    varName: 'comparisons',
    isTs: false,
    mainPath: '/case-studies',
    route: (slug) => `/case-studies/${slug}`,
  },
  {
    key: 'comparisons',
    file: 'comparisons.js',
    varName: 'comparisons',
    isTs: false,
    mainPath: '/comparison',
    route: (slug) => `/comparison/${slug}`,
  },
  {
    key: 'faqs',
    file: 'faqs.js',
    varName: 'faqHubs',
    isTs: false,
    mainPath: '/faqs',
    route: (slug) => `/faqs/${slug}`,
  },
  {
    key: 'glossary',
    file: 'glossary.js',
    varName: 'glossary',
    isTs: false,
    mainPath: '/glossary',
    route: (slug) => `/glossary/${slug}`,
  },
  {
    key: 'howtos',
    file: 'howtos.js',
    varName: 'howTos',
    isTs: false,
    mainPath: '/howto',
    route: (slug) => `/howto/${slug}`,
  },
  {
    key: 'listicles',
    file: 'listicles.js',
    varName: 'listicles',
    isTs: false,
    mainPath: '/listicles',
    route: (slug) => `/listicles/${slug}`,
  },
  {
    key: 'news',
    file: 'news.js',
    varName: 'news',
    isTs: false,
    mainPath: '/news',
    route: (slug) => `/news/${slug}`,
  },
  {
    key: 'hire',
    file: 'hire.js',
    varName: 'resources',
    isTs: false,
    mainPath: '/hire',
    route: (slug) => `/hire/${slug}`,
  },
  {
    key: 'partners',
    file: 'partners.js',
    varName: 'partnersData',
    isTs: false,
    mainPath: '/partners',
    route: (slug) => `/partners/${slug}`,
  },
  {
    key: 'process',
    file: 'process.js',
    varName: 'processData',
    isTs: false,
    mainPath: '/process',
    route: (slug) => `/process/${slug}`,
  },
  {
    key: 'resources',
    file: 'resources.js',
    varName: 'resources',
    isTs: false,
    mainPath: '/resources',
    route: (slug) => `/resources/${slug}`,
  },
  {
    key: 'templates',
    file: 'templates.js',
    varName: 'templates',
    isTs: false,
    mainPath: '/templates',
    route: (slug) => `/templates/${slug}`,
  },
  {
    key: 'tools',
    file: 'tools.js',
    varName: 'tools',
    isTs: false,
    mainPath: '/tools',
    route: (slug) => `/tools/${slug}`,
  },
  {
    key: 'calculators',
    file: 'calculators.js',
    varName: 'calculators',
    isTs: false,
    mainPath: null,
    route: null,
    useMetaUrl: true,
  },
  {
    key: 'technology',
    file: 'technology.js',
    varName: 'technology',
    isTs: false,
    mainPath: null,
    route: null,
    useMetaUrl: true,
  },
  {
    key: 'schemas',
    file: 'schemas.js',
    varName: 'schemas',
    isTs: false,
    mainPath: null,
    route: null,
    useMetaUrl: true,
  },
];

const STATIC_PAGES = [
  { loc: `about`, changefreq: 'monthly', priority: 0.6 },
  { loc: `contact`, changefreq: 'monthly', priority: 0.6 },
  { loc: `pricing`, changefreq: 'weekly', priority: 0.7 },
  { loc: `projects`, changefreq: 'weekly', priority: 0.7 },
  { loc: `solutions`, changefreq: 'weekly', priority: 0.7 },
  { loc: `testimonials`, changefreq: 'weekly', priority: 0.7 },
  { loc: `faq`, changefreq: 'weekly', priority: 0.7 },
];

function run() {
  console.log('🤖 Generating sitemaps from data/ files...');

  if (fs.existsSync(PUBLIC_DIR)) {
    const files = fs.readdirSync(PUBLIC_DIR);
    for (const file of files) {
      if (file.startsWith('sitemap-') && file.endsWith('.xml')) {
        try { fs.unlinkSync(path.join(PUBLIC_DIR, file)); } catch { }
      }
    }
  }

  const activeSitemaps = [];

  // --- Static pages ---
  const mainUrls = STATIC_PAGES.map(p => ({
    loc: `${BASE_URL}${p.loc}`,
    changefreq: p.changefreq,
    priority: p.priority,
    lastmod: new Date().toISOString()
  }));
  mainUrls.unshift({
    loc: `${BASE_URL}`,
    changefreq: 'daily',
    priority: 1.0,
    lastmod: new Date().toISOString()
  });
  const mainFilename = 'sitemap-main.xml';
  fs.writeFileSync(path.join(PUBLIC_DIR, mainFilename), generateSitemapXml(mainUrls));
  activeSitemaps.push(`${BASE_URL}${mainFilename}`);
  console.log(`✅ ${mainFilename} — ${mainUrls.length} static urls.`);

  // --- Dynamic categories from data/ ---
  for (const cat of CATEGORIES) {
    const filePath = path.join(DATA_DIR, cat.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠ Skipping: data/${cat.file} not found`);
      continue;
    }

    let entries;

    if (cat.isTs) {
      const slugs = extractSlugs(filePath);
      entries = slugs.map(s => ({ slug: s }));
    } else if (cat.useMetaUrl) {
      entries = extractData(filePath, cat.varName);
    } else {
      entries = extractData(filePath, cat.varName);
    }

    if (!entries || entries.length === 0) {
      // Fallback: regex-based extraction for complex files
      if (cat.useMetaUrl) {
        const metaUrls = extractMetaUrls(filePath);
        entries = metaUrls.map(url => ({ meta: { url } }));
      } else {
        const slugs = extractSlugs(filePath);
        entries = slugs.map(s => ({ slug: s }));
      }
    }

    const urls = [];

    if (cat.mainPath) {
      urls.push({
        loc: `${BASE_URL}${cat.mainPath.replace(/^\//, '')}`,
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString()
      });
    }

    for (const entry of entries) {
      let fullUrl = null;

      if (cat.useMetaUrl) {
        const url = entryToUrl(entry);
        if (url) fullUrl = `${BASE_URL}${url.replace(/^\//, '')}`;
      } else if (cat.route && entry.slug) {
        fullUrl = `${BASE_URL}${cat.route(entry.slug).replace(/^\//, '')}`;
      }

      if (fullUrl) {
        urls.push({
          loc: fullUrl,
          changefreq: 'weekly',
          priority: 0.6,
          lastmod: new Date().toISOString()
        });
      }
    }

    if (urls.length > 0) {
      const filename = `sitemap-${cat.key}.xml`;
      fs.writeFileSync(path.join(PUBLIC_DIR, filename), generateSitemapXml(urls));
      activeSitemaps.push(`${BASE_URL}${filename}`);
      console.log(`✅ ${filename} — ${urls.length} urls (from ${cat.file})`);
    }
  }

  // --- Sitemap Index ---
  const indexXml = generateSitemapIndexXml(activeSitemaps);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), indexXml);
  console.log(`\n✅ sitemap.xml — ${activeSitemaps.length} sitemaps indexed.`);
}

run();