import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const plan=JSON.parse(await fs.readFile('audit/rebrand/edit-plan.json','utf8')),manifest=[],regions=[];
await fs.mkdir('audit/rebrand/ocr-edited',{recursive:true});
for(const p of plan){
 if(p.excluded)continue;
 const file='audit/rebrand/edited/'+p.id+'.webp',scale=Math.min(3,3600/Math.max(p.width,p.height));
 const png=path.resolve('audit/rebrand/ocr-edited/'+p.id+'.png');
 await sharp(file).resize({width:Math.round(p.width*scale)}).png().toFile(png);
 manifest.push({id:p.id,slug:p.slug,png,scale});
 for(const e of p.edits){const left=Math.max(0,e.x-6),top=Math.max(0,e.y-6),width=Math.min(p.width-left,e.w+12),height=Math.min(p.height-top,e.h+12);
 regions.push({id:p.id,text:e.replacement,input:await sharp(file).extract({left,top,width,height}).resize(480,100,{fit:'contain',background:'#ddd'}).png().toBuffer()});}
}
await fs.writeFile('audit/rebrand/assets-edited.json',JSON.stringify(manifest,null,2));
for(let start=0;start<regions.length;start+=24){const batch=regions.slice(start,start+24),layers=[];for(let i=0;i<batch.length;i++){
 const r=batch[i],x=i%3*500,y=Math.floor(i/3)*140;
 layers.push({input:Buffer.from(`<svg width="500" height="30"><text x="8" y="23" font-size="18">${r.id} ${r.text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('\n',' / ')}</text></svg>`),left:x,top:y});layers.push({input:r.input,left:x+10,top:y+30});}
 await sharp({create:{width:1500,height:Math.ceil(batch.length/3)*140,channels:3,background:'#fff'}}).composite(layers).png().toFile('audit/rebrand/regions-'+(start/24+1)+'.png');
}
console.log(manifest.length+' OCR inputs; '+regions.length+' text-region previews');
