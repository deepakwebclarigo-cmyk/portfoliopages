import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
sharp.cache(false);
sharp.concurrency(1);
const assets=JSON.parse(await fs.readFile('lib/project-assets.json','utf8'));
const changes=JSON.parse(await fs.readFile('audit/rebrand/asset-changes.json','utf8'));
const verified=(await fs.readFile('audit/rebrand/ocr-final.jsonl','utf8')).trim().split(/\r?\n/).map(JSON.parse);
const manifest=[],seed=[],seen=new Set();await fs.mkdir('audit/rebrand/ocr-portfolio',{recursive:true});
for(const[slug,set]of Object.entries(assets))for(const asset of [set.poster,...set.images]){
 if(seen.has(asset.src))continue;seen.add(asset.src);
 const id='all'+String(seen.size).padStart(3,'0'),scale=Math.min(3,3600/Math.max(asset.width,asset.height)),change=changes.find(c=>c.src===asset.src);
 const png=path.resolve(change?'audit/rebrand/ocr-edited/'+change.id+'.png':'audit/rebrand/ocr-portfolio/'+id+'.png');
 if(change){const existing=verified.find(v=>v.id===change.id);if(!existing)throw Error('Missing final OCR '+id);seed.push({...existing,id,slug});}
 else {let ready=false;try{const m=await sharp(png).metadata(),h=await fs.open(png),s=await h.stat(),end=Buffer.alloc(8);await h.read(end,0,8,Math.max(0,s.size-8));await h.close();ready=m.width===Math.round(asset.width*scale)&&end.toString('hex')==='49454e44ae426082';}catch{}if(!ready)await sharp('public'+asset.src).resize({width:Math.round(asset.width*scale)}).png().toFile(png);}
 manifest.push({id,slug,png,scale,src:asset.src});
}
await fs.writeFile('audit/rebrand/portfolio-ocr-manifest.json',JSON.stringify(manifest,null,2));
await fs.writeFile('audit/rebrand/ocr-portfolio.jsonl',seed.map(r=>JSON.stringify(r)).join('\n')+'\n');
console.log(JSON.stringify({assets:manifest.length,previouslyVerified:seed.length,remaining:manifest.length-seed.length}));
