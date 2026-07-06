/**
 * Conversion Script: Service Pages MD → Data File
 * Self-contained. Outputs to data/md-services.js (separate from hand-crafted data/services.ts).
 * Usage: node scripts/convert-services.cjs
 */
const fs = require('fs'), path = require('path');
const MD = path.join(__dirname, '..', 'md', 'services');
const OUT = path.join(__dirname, '..', 'data', 'md-services.js');

function S(f) { return f.replace(/\.md$/i,'').replace(/^\d+[_\-]\s*/,'').replace(/^\d+_to_\d+[_\-]\s*/,'').trim(); }
function T(c) { const m=c.match(/^#\s+(.+)$/m); if(m)return m[1].trim(); const h=c.match(/^##\s*H1:\s*(.+)$/mi); return h?h[1].trim():'Untitled'; }
function F(c,n) {
  const p=new RegExp(`\\*\\*${n.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}:\\*\\*\\s*([^\\n]+(?:\\n(?!\\s*(?:-\\s+)?\\*\\*|\\s*---|\\s*$)[^\\n]+)*)`,'m');
  const m=c.match(p); return m?m[1].trim().replace(/`/g,'').trim():undefined;
}
function SS(c) {
  const r=[];const p=c.split(/^##\s+(.+)$/m);
  for(let i=1;i<p.length;i+=2){const h=p[i]?.trim()||'',b=p[i+1]?.trim()||'';if(!h||h.startsWith('---'))continue;if(h.toLowerCase().includes('faq')||h.toLowerCase().includes('frequently asked'))continue;if(h.toLowerCase().includes('cta')||h.toLowerCase().includes('ready to'))continue;const bl=[];let m;const br=/(?:^|\n)[*-]\s+(.+)/g;while((m=br.exec(b))!==null)bl.push(m[1].trim());const cc=b.replace(/[*-]\s+[^\n]+(\n|$)/g,'').replace(/\*\*([^*]+)\*\*/g,'$1').replace(/\n{3,}/g,'\n\n').trim();r.push({heading:h,content:cc||b.substring(0,300).trim(),bullets:bl.length>0?bl:undefined});}return r;
}
function FA(c) { const r=[];const s=c.split(/^##\s+.+(?:faq|frequently asked|questions answered)/im);let t='';if(s.length>1){for(let i=1;i<s.length;i++){const x=s[i];const e=x.search(/^##\s/m);t+=(e>0?x.substring(0,e):x)+'\n';}}else t=c;const q=/\*\*(.+?\?)\*\*\s*([\s\S]*?)(?=\n\*\*|$)/g;let m;while((m=q.exec(t))!==null){const qn=m[1].trim(),a=m[2].trim().replace(/\n{2,}/g,'\n').trim();if(qn&&a&&a.length>10)r.push({question:qn,answer:a});}return r;}
function CT(c) { const r=[];const q=/\[BUTTON\s*[—–-]\s*(PRIMARY|SECONDARY)\]\s*([^\n→]*)(?:→)?/g;let m;while((m=q.exec(c))!==null){const t=m[2].trim();const l=t.match(/\[([^\]]*)\]\(([^)]+)\)/);r.push({text:l?t.replace(/\[([^\]]*)\]\([^)]+\)/g,'$1').trim():t,href:l?l[2].trim():'#',primary:m[1]==='PRIMARY'});}return r; }
function TI(c) { const r=[];const rx=/[✦✓]\s*(.+)/g;let m;while((m=rx.exec(c))!==null)r.push(m[1].trim());return r; }
function TG(c,m){const t=[];if(m.primaryKeyword)t.push(m.primaryKeyword);['Service','Blockchain','DeFi','NFT','Smart Contract','Wallet','Exchange','Development','Enterprise','GameFi','Web3','Tokenization'].forEach(k=>{if(m.title.toLowerCase().includes(k.toLowerCase()))t.push(k);});return[...new Set(t)].slice(0,10);}

function P(fp){const c=fs.readFileSync(fp,'utf-8');if(!c)return null;
const sl=S(path.basename(fp)),ti=T(c),u=F(c,'URL')||'',pk=F(c,'Primary KW')||F(c,'Primary Keyword');
const sr=F(c,'Secondary KWs')||F(c,'Secondary Keywords');const sk=sr?sr.split(',').map(s=>s.trim()):[];
const sc=F(c,'Schema');const meta={url:u,title:ti,primaryKeyword:pk,secondaryKeywords:sk,schema:sc,wordCount:c.split(/\s+/).length};
const trust=TI(c);return{slug:sl,meta,sections:SS(c),faq:FA(c),ctas:CT(c),tags:TG(c,meta),category:'service',trustIndicators:trust};}

console.log('Converting md/services/ → data/md-services.js\n');
if(!fs.existsSync(MD)){console.error('  ❌ not found');process.exit(1);}
const files=fs.readdirSync(MD).filter(f=>f.endsWith('.md'));
console.log(`  Found ${files.length} service files\n`);
const items=[];for(const f of files){const p=P(path.join(MD,f));if(p)items.push(p);}
const seen=new Set();const dd=[];for(const i of items){if(!seen.has(i.slug)){seen.add(i.slug);dd.push(i);}}items.length=0;items.push(...dd);
items.sort((a,b)=>a.slug.localeCompare(b.slug));
console.log(`  Processed ${items.length} service pages`);

const o=`/**
 * Service Pages Data (from md/services/)
 * Generated from ${files.length} .md files
 * Run \`node scripts/convert-services.cjs\` to regenerate
 * NOTE: This is separate from the hand-crafted data/services.ts
 */

const mdServices = ${JSON.stringify(items, null, 2)};

function getMdServiceBySlug(slug){return mdServices.find(i=>i.slug===slug);}
function getMdServiceCards(o2){let c=mdServices.map(i=>({slug:i.slug,title:i.meta.title,description:i.sections[0]?.content?.substring(0,200)||i.meta.title,category:'service',tags:i.tags,url:i.meta.url}));
if(o2?.tag)c=c.filter(x=>x.tags?.includes(o2.tag));if(o2?.search){const q=o2.search.toLowerCase();c=c.filter(x=>x.title.toLowerCase().includes(q)||x.description.toLowerCase().includes(q));}
if(o2?.offset)c=c.slice(o2.offset);if(o2?.limit)c=c.slice(0,o2.limit);return c;}
function getMdServicesByTag(t){return mdServices.filter(i=>i.tags?.includes(t));}
function searchMdServices(q2){const q=q2.toLowerCase();return mdServices.filter(i=>i.meta.title.toLowerCase().includes(q)||i.slug.toLowerCase().includes(q));}
module.exports={mdServices,getMdServiceBySlug,getMdServiceCards,getMdServicesByTag,searchMdServices};`;
fs.writeFileSync(OUT,o,'utf-8');console.log(`  ✅ Written to data/md-services.js`);
console.log(`  📊 ${items.length} service pages`);
