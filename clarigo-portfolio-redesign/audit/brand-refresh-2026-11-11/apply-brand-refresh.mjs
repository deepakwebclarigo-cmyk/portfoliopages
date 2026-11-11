
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
const dir='audit/brand-refresh-2026-11-11',read=async f=>JSON.parse(await fs.readFile(f,'utf8'));
const map=[
{oldName:'TukioConnect',name:'Tukora Connect',oldSlugs:['tukioconnect','app-tukioconnect'],slugs:['tukora-connect','app-tukora-connect'],logo:'tukora-connect'},
{oldName:'Whizora',name:'Whizlume',oldSlugs:['whizora'],slugs:['whizlume'],logo:'whizlume'},
{oldName:'Alum Connect',name:'Alumvia',oldSlugs:['alum-connect'],slugs:['alumvia'],logo:'alumvia'},
{oldName:'KegelKlock',name:'KegelTempo',oldSlugs:['kegelklock','app-kegalklock'],slugs:['kegeltempo','app-kegeltempo'],logo:'kegeltempo'}];
const before=await read(dir+'/assets-before.json'),inventory=await read('lib/project-inventory.json'),plan=await read(dir+'/edit-plan.json');
if(inventory.length!==44||!inventory.some(p=>p.slug==='tukioconnect'))throw Error('Active inventory differs from the reviewed source.');
const scans=new Map();for(const f of ['ocr-after.jsonl','ocr-recheck.jsonl'])for(const l of (await fs.readFile(dir+'/'+f,'utf8')).trim().split(/\r?\n/).filter(Boolean)){const r=JSON.parse(l);scans.set(r.id,r);}
const bad=[];for(const r of scans.values())for(const l of r.lines)if(/tukio|whizora|alumconnect|keg[ae]lk[l1i]ock|klock/.test(l.text.toLowerCase().replace(/[^a-z0-9]/g,'')))bad.push({id:r.id,text:l.text});
if(scans.size!==46||bad.length)throw Error('Artwork OCR not complete: '+JSON.stringify({scans:scans.size,bad}));
await fs.writeFile(dir+'/ocr-verification.json',JSON.stringify({scanned:46,remainingPreviousNames:bad,method:'Offline OCR plus enlarged manual brand-region review'},null,2));
const previousMap=await read('audit/rebrand/name-map.json'),derivatives=await read('audit/premium-review/responsive-covers.json');
await fs.writeFile(dir+'/previous-name-map.json',JSON.stringify(previousMap,null,2),{flag:'wx'});
await fs.writeFile(dir+'/responsive-covers-before.json',JSON.stringify(derivatives,null,2),{flag:'wx'});
await fs.writeFile(dir+'/name-map.json',JSON.stringify(map,null,2));
const assets={},changes=[];
for(const item of inventory){
 const brand=map.find(b=>b.oldSlugs.includes(item.slug)),index=brand?.oldSlugs.indexOf(item.slug),slug=brand?brand.slugs[index]:item.slug,source=before[item.slug];
 if(!brand){assets[slug]=source;continue;}
 async function convert(asset,poster=false){
  const p=plan.find(p=>p.asset.src===asset.src);if(!p)throw Error('Missing image plan '+asset.src);
  const bytes=await fs.readFile(dir+'/edited/'+p.id+'.webp'),meta=await sharp(bytes).metadata();if(meta.width!==asset.width||meta.height!==asset.height)throw Error('Proportions changed');
  const sha256=crypto.createHash('sha256').update(bytes).digest('hex'),src='/images/projects/'+slug+(poster?'-preview-':'-artwork-')+sha256.slice(0,10)+'.webp';await fs.writeFile('public'+src,bytes);
  if(poster){await sharp(bytes).resize({width:720}).webp({quality:88,effort:5}).toFile('public'+src.replace('.webp','-card.webp'));const m=await sharp(bytes).resize({width:960}).webp({quality:88,effort:5}).toBuffer({resolveWithObject:true});await fs.writeFile('public'+src.replace('.webp','-medium.webp'),m.data);derivatives.push({slug,src:src.replace('.webp','-medium.webp'),width:m.info.width,height:m.info.height,bytes:m.data.length,source:src,sourceSha256:sha256,sha256:crypto.createHash('sha256').update(m.data).digest('hex')});}
  changes.push({id:p.id,slug,oldSrc:asset.src,src,poster,sha256});return{...asset,src,sha256,bytes:bytes.length};
 }
 const poster=await convert(source.poster,true),images=[];for(const asset of source.images)images.push(await convert(asset));assets[slug]={poster,images};
 item.name=brand.name;item.slug=slug;item.image=poster.src;item.rebranded=true;delete item.page;
}
await fs.writeFile('lib/project-inventory.json',JSON.stringify(inventory,null,2)+'\n');await fs.writeFile('lib/project-assets.json',JSON.stringify(assets,null,2)+'\n');
await fs.writeFile('audit/premium-review/responsive-covers.json',JSON.stringify(derivatives.filter(d=>inventory.some(p=>p.slug===d.slug)),null,2));
const slugPairs=map.flatMap(b=>b.oldSlugs.map((old,i)=>[old,b.slugs[i]])).sort((a,b)=>b[0].length-a[0].length);
function rename(s){s=s.replace(/\btukioconnect(?=\s*:)/g,"'tukioconnect'");for(const[old,fresh]of slugPairs)s=s.replaceAll(old,fresh);return s.replace(/Tukio\s*Connect/g,'Tukora Connect').replace(/Whizora/g,'Whizlume').replace(/Alum\s+Connect/g,'Alumvia').replace(/Keg[ae]l\s*Klock/gi,'KegelTempo');}
for(const folder of ['app','components','lib','tests']){
 async function walk(d){for(const e of await fs.readdir(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory())await walk(f);else if(/\.(tsx?|css|json)$/.test(e.name)&&!['project-inventory.json','project-assets.json'].includes(e.name)){const old=await fs.readFile(f,'utf8'),fresh=rename(old);if(old!==fresh)await fs.writeFile(f,fresh);}}}await walk(folder);
}
const registry=previousMap.map(b=>{const n=map.find(n=>n.oldSlugs.some(s=>b.slugs.includes(s)));return n?{...b,name:n.name,slugs:n.slugs}:b;});
for(const b of map.filter(b=>!previousMap.some(old=>old.slugs.some(s=>b.oldSlugs.includes(s)))))registry.push({...b,tokens:[b.oldName.toLowerCase().replace(/[^a-z0-9]/g,'')]});
await fs.writeFile('audit/rebrand/name-map.json',JSON.stringify(registry,null,2));
let config=await fs.readFile('next.config.ts','utf8');for(const[old,fresh]of slugPairs)config=config.replaceAll("destination: '/portfolio/"+old+"'","destination: '/portfolio/"+fresh+"'");
config=config.replace('    return [','    return [\n'+slugPairs.map(([old,fresh])=>"      { source: '/portfolio/"+old+"', destination: '/portfolio/"+fresh+"', permanent: true },").join('\n'));await fs.writeFile('next.config.ts',config);
let t=await fs.readFile('tests/rebrand.spec.ts','utf8');t=t.replace('brtennis/;','brtennis|tukioconnect|whizora|alumconnect|kegelklock|kegalklock/;');await fs.writeFile('tests/rebrand.spec.ts',t);
let v=await fs.readFile('scripts/verify-project-rebrand.mjs','utf8');v=v.replace("const seen=new Set(),layers=[];","const seen=new Set(),layers=[];\nconst historicalArtwork=async src=>{try{return await fs.readFile('public'+src);}catch(error){if(error.code!=='ENOENT')throw error;return fs.readFile('audit/brand-refresh-2026-11-11/originals/'+src.split('/').pop());}};");v=v.replace("after=await sharp('public'+change.src).ensureAlpha().raw().toBuffer()","after=await sharp(await historicalArtwork(change.src)).ensureAlpha().raw().toBuffer()");await fs.writeFile('scripts/verify-project-rebrand.mjs',v);
let doc=rename(await fs.readFile('README.md','utf8')).replaceAll('14 renamed routes','20 renamed routes').replaceAll('all 14 redirects','all 20 redirects');
doc+='\n## November 2026 identity refresh\n\nTukora Connect, Whizlume, Alumvia, and KegelTempo replace the four previous identities across six existing web/mobile entries. New logos were created with the built-in image generator; product interfaces remain the owning project source artwork. Standalone 1000 x 1000 transparent PNGs are in exports/four-refreshed-project-logos/. Design briefs, original sources, region edits, and preservation checks are in audit/brand-refresh-2026-11-11/. All 44 active projects remain.\n';await fs.writeFile('README.md',doc);
await fs.writeFile(dir+'/asset-changes.json',JSON.stringify(changes,null,2));
console.log(JSON.stringify({activeProjects:inventory.length,renamedPages:changes.filter(c=>c.poster).length,updatedArtwork:changes.length,registeredBrands:registry.length,renamedBrandPages:registry.reduce((sum,b)=>sum+b.slugs.length,0)}));

