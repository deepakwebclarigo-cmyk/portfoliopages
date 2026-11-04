import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import sharp from 'sharp';
const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const inventory=await read('lib/project-inventory.json'),assets=await read('lib/project-assets.json'),changes=await read('audit/rebrand/asset-changes.json'),plan=await read('audit/rebrand/edit-plan.json'),covers=await read('audit/rebrand/cover-compositions.json');
const report={projects:inventory.length,web:inventory.filter(i=>i.kind==='web').length,mobile:inventory.filter(i=>i.kind==='mobile').length,renamedPages:inventory.filter(i=>i.rebranded).length,decodedAssets:0,decodedThumbnails:0,conservedArtwork:0,coverCompositions:covers.length,outsideRegionPixelChanges:0,errors:[]};
const seen=new Set(),layers=[];
for(const project of inventory){
 for(const asset of [assets[project.slug].poster,...assets[project.slug].images]){
  if(seen.has(asset.src))continue;seen.add(asset.src);
  try{const buffer=await fs.readFile('public'+asset.src),decoded=await sharp(buffer).raw().toBuffer({resolveWithObject:true});if(decoded.info.width!==asset.width||decoded.info.height!==asset.height)throw Error('Dimensions differ');if(crypto.createHash('sha256').update(buffer).digest('hex')!==asset.sha256)throw Error('SHA-256 differs');report.decodedAssets++;}catch(e){report.errors.push(asset.src+': '+e.message);}
 }
 try{await sharp('public'+assets[project.slug].poster.src.replace('.webp','-card.webp')).raw().toBuffer();report.decodedThumbnails++;}catch(e){report.errors.push(project.slug+' thumbnail: '+e.message);}
 if(project.rebranded){const n=layers.length/2,x=n%4*350,y=Math.floor(n/4)*330;const title=Buffer.from(`<svg width="350" height="35"><text x="8" y="24" font-size="19">${project.name}</text></svg>`);layers.push({input:title,left:x,top:y});layers.push({input:await sharp('public'+assets[project.slug].poster.src).resize(340,285,{fit:'contain',background:'#eee'}).png().toBuffer(),left:x,top:y+35});}
}
for(const change of changes){
 if(covers.some(c=>c.id===change.id))continue;
 const p=plan.find(p=>p.id===change.id),before=await sharp(p.original).ensureAlpha().raw().toBuffer(),after=await sharp('public'+change.src).ensureAlpha().raw().toBuffer();
 const mask=new Uint8Array(p.width*p.height);for(const e of p.edits)for(let y=Math.max(0,Math.round(e.y));y<Math.min(p.height,Math.round(e.y)+Math.round(e.h));y++)for(let x=Math.max(0,Math.round(e.x));x<Math.min(p.width,Math.round(e.x)+Math.round(e.w));x++)mask[y*p.width+x]=1;
 // RGB under fully transparent pixels is discarded by WebP and is not visible artwork.
 for(let i=0;i<mask.length;i++)if(!mask[i]){const k=i*4;if(before[k+3]!==after[k+3]||before[k+3]>0&&(before[k]!==after[k]||before[k+1]!==after[k+1]||before[k+2]!==after[k+2]))report.outsideRegionPixelChanges++;}
 report.conservedArtwork++;
}
await sharp({create:{width:1400,height:Math.ceil(layers.length/8)*330,channels:3,background:'#fff'}}).composite(layers).png().toFile('audit/rebrand/covers-final.png');
if(report.outsideRegionPixelChanges)report.errors.push('Pixels outside reviewed regions changed.');
await fs.writeFile('audit/rebrand/asset-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));if(report.errors.length)process.exitCode=1;
