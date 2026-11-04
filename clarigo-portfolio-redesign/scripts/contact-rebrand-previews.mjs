import fs from 'node:fs/promises';
import sharp from 'sharp';
sharp.cache(false);sharp.concurrency(1);
const projects=JSON.parse(await fs.readFile('lib/project-inventory.json','utf8')).filter(p=>p.rebranded);
for(const viewport of ['desktop','mobile'])for(const part of ['hero','gallery']){
 const width=viewport==='mobile'?300:420,height=viewport==='mobile'?580:320,layers=[];
 for(let i=0;i<projects.length;i++){
  const p=projects[i],x=i%4*width,y=Math.floor(i/4)*(height+35);
  const label=Buffer.from(`<svg width="${width}" height="30"><text x="6" y="23" font-size="17">${p.name} / ${p.kind}</text></svg>`);
  const screenshot=await sharp(`audit/rebrand/screenshots/${viewport}-${p.slug}-${part}.png`).resize(width-10,height,{fit:'contain',background:'#eee'}).png().toBuffer();
  layers.push({input:label,left:x,top:y},{input:screenshot,left:x+5,top:y+30});
 }
 await sharp({create:{width:4*width,height:Math.ceil(projects.length/4)*(height+35),channels:3,background:'#fff'}}).composite(layers).png().toFile(`audit/rebrand/preview-sheet-${viewport}-${part}.png`);
}
