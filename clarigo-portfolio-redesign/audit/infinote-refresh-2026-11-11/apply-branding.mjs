import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
const dir='audit/infinote-refresh-2026-11-11', read=async f=>JSON.parse(await fs.readFile(f,'utf8')), write=async(f,v)=>fs.writeFile(f,JSON.stringify(v,null,2)+'\n'), hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const inv=await read('lib/project-inventory.json'),sets=await read('lib/project-assets.json'),before=await read(dir+'/assets-before.json'),plan=await read(dir+'/edit-plan.json');
if(inv.length!==44||!sets['app-infiscribe']||sets['app-infinote'])throw Error('Unexpected starting project state.');
for(const f of ['audit/rebrand/name-map.json','audit/premium-review/responsive-covers.json'])await fs.copyFile(f,dir+'/'+path.basename(f)+'.before');
await fs.mkdir(dir+'/ocr-input',{recursive:true});
const replacement=[],ocr=[];
for(const p of plan){
 const b=await fs.readFile(dir+'/edited/'+p.id+'.webp'),m=await sharp(b).metadata(),sha=hash(b),src='/images/projects/app-infinote-'+(p.id==='061'?'preview':'artwork')+'-'+sha.slice(0,10)+'.webp';
 if(m.width!==p.previous.width||m.height!==p.previous.height)throw Error('Artwork dimensions changed.');
 await fs.writeFile('public'+src,b);replacement.push({...p.previous,src,sha256:sha,bytes:b.length});
 const scale=Math.min(3,3600/Math.max(m.width,m.height)),png=path.resolve(dir+'/ocr-input/'+p.id+'.png');
 await sharp(b).resize({width:Math.round(m.width*scale)}).png().toFile(png);ocr.push({id:p.id,slug:'app-infinote',png,scale});
}
await write(dir+'/ocr-manifest.json',ocr);
const set={poster:replacement[0],images:replacement.slice(1)};
const updated=Object.fromEntries(Object.entries(sets).map(([key,value])=>key==='app-infiscribe'?['app-infinote',set]:[key,value]));
await write('lib/project-assets.json',updated);
const entry=inv.find(p=>p.slug==='app-infiscribe');entry.name='Infinote';entry.slug='app-infinote';entry.image=set.poster.src;await write('lib/project-inventory.json',inv);
const derivatives=await read('audit/premium-review/responsive-covers.json'),poster=set.poster;
for(const [suffix,width]of[['-card',720],['-medium',960]]){
 const b=await sharp('public'+poster.src).resize({width}).webp({quality:88}).toBuffer(),src=poster.src.replace('.webp',suffix+'.webp');await fs.writeFile('public'+src,b);
 if(suffix==='-medium'){const m=await sharp(b).metadata(),index=derivatives.findIndex(r=>r.slug==='app-infiscribe');if(index<0)throw Error('Derivative record missing.');derivatives[index]={slug:'app-infinote',src,width:m.width,height:m.height,bytes:b.length,source:poster.src,sourceSha256:poster.sha256,sha256:hash(b)};}
}
await write('audit/premium-review/responsive-covers.json',derivatives);
async function walk(dir){let result=[];for(const f of await fs.readdir(dir,{withFileTypes:true})){const p=dir+'/'+f.name;if(f.isDirectory())result.push(...await walk(p));else if(/\.(tsx?|json)$/.test(f.name))result.push(p);}return result;}
const touched=[];
for(const f of [...await walk('app'),...await walk('components'),...await walk('lib'),...await walk('tests'),'scripts/audit-motion-performance.mjs']){
 if(['lib/project-assets.json','lib/project-inventory.json'].includes(f))continue;
 const a=await fs.readFile(f,'utf8');let b=a.replaceAll('app-infiscribe','app-infinote').replaceAll('InfiScribe','Infinote');if(f==='tests/rebrand.spec.ts')b=b.replace('|infinote|','|infiscribe|');if(a!==b){await fs.writeFile(f,b);touched.push(f);}
}
const config=await fs.readFile('next.config.ts','utf8'),old="{ source: '/portfolio/app-infinote', destination: '/portfolio/app-infiscribe', permanent: true }",alias="{ source: '/portfolio/app-infiscribe', destination: '/portfolio/app-infinote', permanent: true }";
if(!config.includes(old))throw Error('Expected redirect missing.');await fs.writeFile('next.config.ts',config.replace(old,alias));
const metadata='app/portfolio/[slug]/page.tsx',source=await fs.readFile(metadata,'utf8'),anchor="    alternates: { canonical: '/portfolio/' + project.slug },";
if(!source.includes(anchor))throw Error('Metadata anchor missing.');
const icons=[
"    ...(project.slug === 'app-infinote' ? {",
"      icons: {",
"        icon: [",
"          { url: '/images/brand/projects/infinote-app-icon-32.png', sizes: '32x32', type: 'image/png' },",
"          { url: '/images/brand/projects/infinote-app-icon-192.png', sizes: '192x192', type: 'image/png' },",
"        ],",
"        apple: [{ url: '/images/brand/projects/infinote-app-icon-180.png', sizes: '180x180', type: 'image/png' }],",
"      },",
"    } : {}),"
].join('\n');
await fs.writeFile(metadata,source.replace(anchor,anchor+'\n'+icons));
const map=await read('audit/rebrand/name-map.json'),brand=map.find(b=>b.name==='InfiScribe');if(!brand)throw Error('Brand registry missing.');Object.assign(brand,{oldName:'InfiScribe',name:'Infinote',oldSlugs:['app-infiscribe'],slugs:['app-infinote'],tokens:['infiscribe']});await write('audit/rebrand/name-map.json',map);
const verifier='scripts/verify-project-rebrand.mjs',v=await fs.readFile(verifier,'utf8'),vOld="const historicalArtwork=async src=>{try{return await fs.readFile('public'+src);}catch(error){if(error.code!=='ENOENT')throw error;return fs.readFile('audit/brand-refresh-2026-11-11/originals/'+src.split('/').pop());}};",vNew="const historicalArtwork=async src=>{for(const file of ['public'+src,...['audit/brand-refresh-2026-11-11/originals/','audit/infinote-refresh-2026-11-11/originals/'].map(dir=>dir+src.split('/').pop())]){try{return await fs.readFile(file);}catch(error){if(error.code!=='ENOENT')throw error;}}throw Error('Historical artwork not found: '+src);};";
if(!v.includes(vOld))throw Error('Historical verifier changed.');await fs.writeFile(verifier,v.replace(vOld,vNew));
await fs.appendFile('README.md',"\n## Infinote branding update\n\nThe document-scanning mobile project is now Infinote at /portfolio/app-infinote. Its previous InfiScribe URL redirects permanently to this page. The user-supplied logo is retained exactly in public/images/brand/projects/infinote-logo.png; faithful wordmark and icon variants appear in its project artwork and scoped page metadata. Clarigo's global branding and the other 43 projects are unchanged. Source checkpoints, region conservation, and verification are in audit/infinote-refresh-2026-11-11/.\n");
for(const [key,value]of Object.entries(before))if(key!=='app-infiscribe'&&JSON.stringify(value)!==JSON.stringify(updated[key]))throw Error('Unrelated asset record changed: '+key);
await write(dir+'/applied.json',{projects:inv.length,unrelatedAssetRecordsUnchanged:43,renamedFrom:'app-infiscribe',renamedTo:'app-infinote',artwork:replacement.length,touched,poster:set.poster.src});
console.log(JSON.stringify({projects:inv.length,unrelatedAssetRecordsUnchanged:43,artwork:replacement.length,touched}));

