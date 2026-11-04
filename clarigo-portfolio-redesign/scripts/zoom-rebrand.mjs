import fs from 'node:fs/promises';
import sharp from 'sharp';
const p=JSON.parse(await fs.readFile('audit/rebrand/edit-plan-auto.json','utf8'));
const boxes={
'002':[170,85,260,90],'022':[475,125,130,90],'027':[910,600,130,50],
'036':[300,460,130,90],'042':[70,230,530,80],'044':[300,450,200,100],
'046':[120,240,220,80],'048':[120,240,260,100],'051':[120,240,260,100],
'052':[615,460,240,90],'064':[280,130,160,80],'067':[30,80,150,60],
'073':[280,130,160,145],'101':[320,480,140,90],'103':[120,240,260,100],
'104':[100,95,160,70],'105':[120,240,260,100],'107':[120,240,260,100]};
const layers=[];let i=0;for(const[id,[left,top,width,height]]of Object.entries(boxes)){
 const a=p.find(x=>x.id===id),x=i%3*600,y=Math.floor(i/3)*235;
 layers.push({input:Buffer.from(`<svg width="600" height="35"><text x="8" y="27" font-size="23">${id} (${left},${top},${width},${height})</text></svg>`),left:x,top:y});
 layers.push({input:await sharp(a.original).extract({left,top,width,height}).resize(580,190,{fit:'contain',background:'#ddd'}).png().toBuffer(),left:x,top:y+35});i++;
}
await sharp({create:{width:1800,height:Math.ceil(i/3)*235,channels:3,background:'#fff'}}).composite(layers).png().toFile('audit/rebrand/zoom-before.png');
