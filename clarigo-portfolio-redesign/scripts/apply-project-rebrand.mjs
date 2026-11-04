import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
const root=process.cwd(),audit=path.join(root,'audit/rebrand');
const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const mapping=await read(path.join(audit,'name-map.json'));
const inventory=await read('lib/project-inventory.json'),assets=await read('lib/project-assets.json'),exclusions=await read('lib/asset-exclusions.json');
const rows=await read(path.join(audit,'assets-before.json')),plan=await read(path.join(audit,'edit-plan.json'));
await fs.writeFile(path.join(audit,'source-manifest-before.json'),JSON.stringify({inventory,assets,exclusions},null,2),{flag:'wx'});
const selected={},changes=[];
for(const item of inventory){
 const map=mapping.find(m=>m.oldSlugs.includes(item.slug)),index=map?.oldSlugs.indexOf(item.slug),slug=map?map.slugs[index]:item.slug;
 const source=assets[item.slug];
 async function convert(asset,poster=false){
  const gallery=item.kind==='mobile'?asset.source.includes('/screenshots/'): /\/web\/.*-web-\d\.png$/i.test(asset.source);
  let buffer=await fs.readFile('public'+asset.src),src=asset.src;
  if(map){
   const row=rows.find(r=>r.slug===item.slug&&r.asset.src===asset.src);
   if(!row)throw Error('Missing preserved original '+asset.src);
   buffer=await fs.readFile(path.join(audit,'edited',row.id+'.webp'));
   const hash=crypto.createHash('sha256').update(buffer).digest('hex');
   src='/images/projects/'+slug+(poster?'-preview':'-artwork')+'-'+hash.slice(0,10)+'.webp';
   await fs.writeFile('public'+src,buffer);
   if(poster)await sharp(buffer).resize({width:720,withoutEnlargement:true}).webp({quality:85,effort:6}).toFile('public'+src.replace('.webp','-card.webp'));
   changes.push({slug,id:row.id,previous:asset.src,src,edits:plan.find(p=>p.id===row.id).edits.length,cover:poster&&item.kind==='mobile'});
  }
  return {src,width:asset.width,height:asset.height,role:gallery?'screen':'composition',gallery:!poster&&gallery,sha256:crypto.createHash('sha256').update(buffer).digest('hex'),bytes:buffer.length,originalBytes:asset.originalBytes};
 }
 const images=[];for(const asset of source.images){
  if(Object.hasOwn(exclusions[item.slug]??{},decodeURIComponent(asset.source.split('/').pop()??'')))continue;
  const row=rows.find(r=>r.slug===item.slug&&r.asset.src===asset.src);
  if(row&&plan.find(p=>p.id===row.id).excluded)continue;
  images.push(await convert(asset));
 }
 selected[slug]={poster:await convert(source.poster,true),images};
 if(map){item.name=map.name;item.slug=slug;item.image=selected[slug].poster.src;delete item.page;item.rebranded=true;}
}
await fs.writeFile('lib/project-inventory.json',JSON.stringify(inventory,null,2)+'\n');
await fs.writeFile('lib/project-assets.json',JSON.stringify(selected,null,2)+'\n');
await fs.writeFile('lib/asset-exclusions.json','{}\n');
await fs.writeFile(path.join(audit,'asset-changes.json'),JSON.stringify(changes,null,2));
function rename(text){
 for(const m of mapping)for(let i=0;i<m.oldSlugs.length;i++)text=text.replaceAll(m.oldSlugs[i],m.slugs[i]);
 const patterns=[[/StreamDataX/gi,'StreamDexa'],[/Tukee\s*Connect/gi,'TukioConnect'],[/Parachute/gi,'ParaNest'],[/Whizara/gi,'Whizora'],[/ES[- ]?Platform/gi,'EStrata'],[/Lead Management/gi,'LeadForma'],[/Simply\s*Recruited/gi,'SimplyScouted'],[/Infinote/gi,'InfiScribe'],[/Silasync/gi,'SilaFlow'],[/Digital Habit Tracker/gi,'HabitStride'],[/One Pantry/gi,'PantryOne'],[/Street Sheets/gi,'StreetSlate'],[/BR[- ]Tennis/gi,'RallyBridge']];
 for(const[regex,name]of patterns)text=text.replace(regex,name);
 return text;
}
for(const folder of ['app','components','lib','tests']){
 async function walk(dir){for(const entry of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())await walk(file);else if(/\.(tsx?|css|json)$/.test(file)&&!['project-assets.json','project-inventory.json'].includes(entry.name)){const before=await fs.readFile(file,'utf8'),after=rename(before);if(after!==before)await fs.writeFile(file,after);}}}await walk(folder);
}
await fs.writeFile('README.md',rename(await fs.readFile('README.md','utf8')));
const retired=path.join(audit,'retired-public-assets');await fs.mkdir(retired,{recursive:true});
for(const file of await fs.readdir('public/images/projects')){
 if(!mapping.some(m=>m.oldSlugs.some(s=>file.startsWith(s+'-'))))continue;
 const from=path.resolve('public/images/projects',file),to=path.resolve(retired,file);
 if(!from.startsWith(path.join(root,'public/images/projects')+path.sep)||!to.startsWith(retired+path.sep))throw Error('Unsafe asset retirement path');
 await fs.rename(from,to);
}
console.log(JSON.stringify({projects:inventory.length,renamedPages:inventory.filter(i=>i.rebranded).length,updatedAssets:changes.length,retiredOriginals:retired}));
