/**
 * Conversion Script: FAQ Hubs MD → Data File
 * Usage: node scripts/convert-faqs.js
 */
const fs = require('fs'), path = require('path');
const MD_DIR = path.join(__dirname, '..', 'md', 'faq_hubs');
const OUTPUT = path.join(__dirname, '..', 'data', 'faqs.js');

function slugify(f) { return f.replace(/\.md$/i,'').replace(/^\d+[_\-]\s*/,'').replace(/^\d+_to_\d+[_\-]\s*/,'').trim(); }
function title(c) { const m=c.match(/^#\s+(.+)$/m); return m?m[1].trim():'Untitled'; }
function field(c, n) {
  const p=new RegExp(`\\*\\*${n.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}:\\*\\*\\s*([^\\n]+(?:\\n(?!\\s*\\*\\*|\\s*---|\\s*$)[^\\n]+)*)`,'m');
  const m=c.match(p); if(m)return m[1].trim().replace(/`/g,'').trim();
  const s=new RegExp(`-\\s*\\*\\*${n.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}:\\*\\*\\s*([^\\n]+)`,'m');
  const sm=c.match(s); return sm?sm[1].trim():undefined;
}
function sections(c) {
  const r=[];const p=c.split(/^##\s+(.+)$/m);
  for(let i=1;i<p.length;i+=2){
    const h=p[i]?.trim()||'',b=p[i+1]?.trim()||'';
    if(!h||h.startsWith('---'))continue;
    if(h.toLowerCase().includes('faq')||h.toLowerCase().includes('frequently'))continue;
    if(h.toLowerCase().includes('cta')||h.toLowerCase().includes('ready to'))continue;
    const bl=[];let m;const br=/(?:^|\n)[*-]\s+(.+)/g;while((m=br.exec(b))!==null)bl.push(m[1].trim());
    const cc=b.replace(/[*-]\s+[^\n]+(\n|$)/g,'').replace(/\*\*([^*]+)\*\*/g,'$1').replace(/\n{3,}/g,'\n\n').trim();
    r.push({heading:h,content:cc||b.substring(0,300).trim(),bullets:bl.length>0?bl:undefined});
  }
  return r;
}
function faq(c) {
  const r=[];const s=c.split(/^##\s+.+(?:faq|frequently asked|questions answered)/im);
  let t='';if(s.length>1){for(let i=1;i<s.length;i++){const x=s[i];const e=x.search(/^##\s/m);t+=(e>0?x.substring(0,e):x)+'\n';}}else t=c;
  const q=/\*\*(.+?\?)\*\*\s*([\s\S]*?)(?=\n\*\*|$)/g;let m;while((m=q.exec(t))!==null){const qn=m[1].trim(),a=m[2].trim().replace(/\n{2,}/g,'\n').trim();if(qn&&a&&a.length>10)r.push({question:qn,answer:a});}
  return r;
}
function ctas(c){const r=[];const q=/\[BUTTON\s*[—–-]\s*(PRIMARY|SECONDARY)\]\s*([^\n→]*)(?:→)?/g;let m;while((m=q.exec(c))!==null)r.push({text:m[2].trim(),href:'#',primary:m[1]==='PRIMARY'});return r;}
function tags(c,m){const t=[];if(m.primaryKeyword)t.push(m.primaryKeyword);if(m.secondaryKeywords)m.secondaryKeywords.slice(0,5).forEach(x=>t.push(x));
['FAQ','Blockchain','DeFi','NFT','Web3','Development','Enterprise'].forEach(k=>{if(m.title.toLowerCase().includes(k.toLowerCase()))t.push(k);});
return[...new Set(t)].slice(0,10);}

function parse(fp){const c=fs.readFileSync(fp,'utf-8');if(!c)return null;
const sl=slugify(path.basename(fp)),ti=title(c),u=field(c,'URL')||'',pk=field(c,'Primary KW')||field(c,'Primary Keyword');
const sr=field(c,'Secondary KWs')||field(c,'Secondary Keywords');const sk=sr?sr.split(',').map(s=>s.trim()):[];
const sc=field(c,'Schema');const meta={url:u,title:ti,primaryKeyword:pk,secondaryKeywords:sk,schema:sc,wordCount:c.split(/\s+/).length};
return{slug:sl,meta,sections:sections(c),faq:faq(c),ctas:ctas(c),tags:tags(c,meta),category:'faq'};}

function convert(){console.log('Converting md/faq_hubs/ → data/faqs.js\n');
if(!fs.existsSync(MD_DIR)){console.error('  ❌ md/faq_hubs/ not found');process.exit(1);}
const files=fs.readdirSync(MD_DIR).filter(f=>f.endsWith('.md'));console.log(`  Found ${files.length} FAQ hubs\n`);
const items=[];for(const f of files){const p=parse(path.join(MD_DIR,f));if(p)items.push(p);}
items.sort((a,b)=>a.slug.localeCompare(b.slug));console.log(`  Processed ${items.length} FAQ hubs`);

const o=`/**
 * FAQ Hubs Data
 * Generated from ${files.length} .md files in md/faq_hubs/
 * Run \`node scripts/convert-faqs.js\` to regenerate
 */
const faqHubs = ${JSON.stringify(items, null, 2)};
function getFaqHubBySlug(slug){return faqHubs.find(i=>i.slug===slug);}
function getFaqHubCards(o2){let c=faqHubs.map(i=>({slug:i.slug,title:i.meta.title,description:i.sections[0]?.content?.substring(0,200)||i.meta.title,category:'faq',tags:i.tags,url:i.meta.url}));
if(o2?.tag)c=c.filter(x=>x.tags?.includes(o2.tag));if(o2?.search){const q=o2.search.toLowerCase();c=c.filter(x=>x.title.toLowerCase().includes(q)||x.description.toLowerCase().includes(q));}
if(o2?.offset)c=c.slice(o2.offset);if(o2?.limit)c=c.slice(0,o2.limit);return c;}
function getFaqHubsByTag(t){return faqHubs.filter(i=>i.tags?.includes(t));}
function searchFaqHubs(q2){const q=q2.toLowerCase();return faqHubs.filter(i=>i.meta.title.toLowerCase().includes(q)||i.slug.toLowerCase().includes(q));}
module.exports={faqHubs,getFaqHubBySlug,getFaqHubCards,getFaqHubsByTag,searchFaqHubs};`;
fs.writeFileSync(OUTPUT,o,'utf-8');console.log(`\n  ✅ Written to data/faqs.js\n  📊 ${items.length} FAQ hubs`);}
convert();
