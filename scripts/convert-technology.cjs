const fs=require('fs'),path=require('path');const MD=path.join(__dirname,'..','md','technology');const OUT=path.join(__dirname,'..','data','technology.js');
function S(f){return f.replace(/\.md$/i,'').replace(/^\d+[_\-]\s*/,'').replace(/^\d+_to_\d+[_\-]\s*/,'').trim();}
function T(c){const m=c.match(/^#\s+(.+)$/m);return m?m[1].trim():'Untitled';}
function F(c,n){const p=new RegExp(`\\*\\*${n.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}:\\*\\*\\s*([^\\n]+)`,'m');const m=c.match(p);return m?m[1].trim().replace(/`/g,'').trim():undefined;}
function SS(c){const r=[];const p=c.split(/^##\s+(.+)$/m);for(let i=1;i<p.length;i+=2){const h=p[i]?.trim()||'',b=p[i+1]?.trim()||'';if(!h||h.startsWith('---'))continue;const bl=[];let m;const br=/(?:^|\n)[*-]\s+(.+)/g;while((m=br.exec(b))!==null)bl.push(m[1].trim());const cc=b.replace(/[*-]\s+[^\n]+(\n|$)/g,'').replace(/\*\*([^*]+)\*\*/g,'$1').replace(/\n{3,}/g,'\n\n').trim();r.push({heading:h,content:cc||b.substring(0,300).trim(),bullets:bl.length>0?bl:undefined});}return r;}
function FA(c){const r=[];const s=c.split(/^##\s+.+(?:faq|frequently asked|questions answered)/im);let t='';if(s.length>1){for(let i=1;i<s.length;i++){const x=s[i];const e=x.search(/^##\s/m);t+=(e>0?x.substring(0,e):x)+'\n';}}else t=c;const q=/\*\*(.+?\?)\*\*\s*([\s\S]*?)(?=\n\*\*|$)/g;let m;while((m=q.exec(t))!==null){const qn=m[1].trim(),a=m[2].trim().replace(/\n{2,}/g,'\n').trim();if(qn&&a&&a.length>10)r.push({question:qn,answer:a});}return r;}
function CT(c){const r=[];const q=/\[BUTTON\s*[—–-]\s*(PRIMARY|SECONDARY)\]\s*([^\n→]*)(?:→)?/g;let m;while((m=q.exec(c))!==null)r.push({text:m[2].trim(),href:'#',primary:m[1]==='PRIMARY'});return r;}
function TG(c,m){const t=[];['Technology','Blockchain','Ethereum','Layer2','EVM'].forEach(k=>{if(m.title.toLowerCase().includes(k.toLowerCase()))t.push(k);});return[...new Set(t)].slice(0,10);}
function P(fp){const c=fs.readFileSync(fp,'utf-8');if(!c)return null;const sl=S(path.basename(fp)),ti=T(c),u=F(c,'URL')||'',pk=F(c,'Primary KW')||F(c,'Primary Keyword');const sr=F(c,'Secondary KWs')||F(c,'Secondary Keywords');const sk=sr?sr.split(',').map(s=>s.trim()):[];const sc=F(c,'Schema');const meta={url:u,title:ti,primaryKeyword:pk,secondaryKeywords:sk,schema:sc,wordCount:c.split(/\s+/).length};return{slug:sl,meta,sections:SS(c),faq:FA(c),ctas:CT(c),tags:TG(c,meta),category:'technology'};}
console.log('Converting md/technology/ → data/technology.js\n');if(!fs.existsSync(MD)){console.error('  ❌ not found');process.exit(1);}
const files=fs.readdirSync(MD).filter(f=>f.endsWith('.md'));const items=[];for(const f of files){const p=P(path.join(MD,f));if(p)items.push(p);}items.sort((a,b)=>a.slug.localeCompare(b.slug));
const o=`const technology=${JSON.stringify(items,null,2)};
function getTechnologyBySlug(slug){return technology.find(i=>i.slug===slug);}
function getTechnologyCards(o2){let c=technology.map(i=>({slug:i.slug,title:i.meta.title,description:i.sections[0]?.content?.substring(0,200)||i.meta.title,category:'technology',tags:i.tags,url:i.meta.url}));
if(o2?.tag)c=c.filter(x=>x.tags?.includes(o2.tag));if(o2?.search){const q=o2.search.toLowerCase();c=c.filter(x=>x.title.toLowerCase().includes(q)||x.description.toLowerCase().includes(q));}
if(o2?.offset)c=c.slice(o2.offset);if(o2?.limit)c=c.slice(0,o2.limit);return c;}
function getTechnologyByTag(t){return technology.filter(i=>i.tags?.includes(t));}
function searchTechnology(q2){const q=q2.toLowerCase();return technology.filter(i=>i.meta.title.toLowerCase().includes(q)||i.slug.toLowerCase().includes(q));}
module.exports={technology,getTechnologyBySlug,getTechnologyCards,getTechnologyByTag,searchTechnology};`;
fs.writeFileSync(OUT,o,'utf-8');console.log(`  ✅ Written to data/technology.js (${items.length} files)`);
