import fs from 'node:fs/promises';import crypto from 'node:crypto';import sharp from 'sharp';
const dir='audit/thumbnail-system-2026-11-12',read=async f=>JSON.parse(await fs.readFile(f,'utf8')),inv=await read('lib/project-inventory.json'),thumbs=await read('lib/project-thumbnails.json'),records=await read(dir+'/rendered-thumbnails.json'),before=await read(dir+'/assets-before.json'),assets=await read('lib/project-assets.json'),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const errors=[];let decoded=0,exported=0,totalCardBytes=0;
const existingArtworkUnchanged=Object.entries(before).every(([slug,set])=>JSON.stringify(set)===JSON.stringify(assets[slug]));
if(!existingArtworkUnchanged)errors.push('Existing detail artwork manifest changed.');
const previousInventory=await read(dir+'/inventory-before.json'),existingInventoryUnchanged=previousInventory.every((item,index)=>JSON.stringify(item)===JSON.stringify(inv[index]));
if(!existingInventoryUnchanged)errors.push('Existing inventory entries changed.');
if(Object.keys(thumbs).length!==inv.length)errors.push('Thumbnail count differs from inventory.');
for(const p of inv){
 const t=thumbs[p.slug],r=records[p.slug];if(!t||!r){errors.push('Missing '+p.slug);continue;}
 for(const a of[t,t.card,t.medium]){
  try{const b=await fs.readFile('public'+a.src),m=await sharp(b).metadata();await sharp(b).stats();if(hash(b)!==a.sha256||m.width!==a.width||m.height!==a.height||b.length!==a.bytes)throw Error('Image metadata or checksum differs.');if(!a.src.startsWith('/images/thumbnails/'+p.slug+'-'))throw Error('Incorrect project path.');if(Math.abs(m.width/m.height-1600/1325)>.005)throw Error('Thumbnail aspect ratio differs.');decoded++;}catch(e){errors.push(p.slug+': '+e.message);}
 }
 try{const png=await fs.readFile('exports/Clarigo-consistent-thumbnails/'+p.slug+'.png'),m=await sharp(png).metadata();if(hash(png)!==r.exportSha256||m.width!==1600||m.height!==1325)throw Error('Export differs from reviewed image.');exported++;}catch(e){errors.push(p.slug+' export: '+e.message);}
 const own=[assets[p.slug].poster,...assets[p.slug].images];for(const source of r.sourceRefs){const a=own.find(a=>a.src===source.src);if(!a||a.sha256!==source.sha256||hash(await fs.readFile('public'+source.src))!==source.sha256)errors.push('Source ownership differs: '+p.slug);}
 if(!r.fit.titleFits||!r.fit.images)errors.push('Layout fit failed '+p.slug);totalCardBytes+=t.card.bytes;
}
const report={projects:inv.length,web:inv.filter(p=>p.kind==='web').length,mobile:inv.filter(p=>p.kind==='mobile').length,decodedWebpVariants:decoded,verifiedPngExports:exported,existingDetailArtworkUnchanged:existingArtworkUnchanged,existingInventoryUnchanged,canvas:[1600,1325],widths:[720,960,1600],averageCardKB:Math.round(totalCardBytes/inv.length/1024*10)/10,errors};
await fs.writeFile(dir+'/asset-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));if(errors.length)process.exitCode=1;

