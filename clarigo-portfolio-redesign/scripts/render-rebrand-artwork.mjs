import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import crypto from 'node:crypto';
const plan=JSON.parse(await fs.readFile(process.env.EDIT_PLAN||'audit/rebrand/edit-plan.json','utf8'));
await fs.mkdir('audit/rebrand/edited',{recursive:true});
await fs.mkdir('audit/rebrand/marked',{recursive:true});
const only=process.argv.slice(2),reports=[];
const median=values=>{values.sort((a,b)=>a-b);return values[Math.floor(values.length/2)];};
function pixel(data,width,x,y){const p=(y*width+x)*4;return[data[p],data[p+1],data[p+2],data[p+3]];}
function sample(data,width,height,x,y){const values=[[],[],[]];for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){const v=pixel(data,width,Math.min(width-1,Math.max(0,Math.round(x+dx))),Math.min(height-1,Math.max(0,Math.round(y+dy))));for(let k=0;k<3;k++)values[k].push(v[k]);}return values.map(median);}
function foreground(data,width,edit,bg){const colors=[];for(let y=edit.y;y<edit.y+edit.h;y++)for(let x=edit.x;x<edit.x+edit.w;x++){const v=pixel(data,width,x,y);const d=Math.hypot(...bg.map((a,k)=>v[k]-a));colors.push({v,d});}colors.sort((a,b)=>b.d-a.d);const selected=colors.slice(0,Math.max(3,Math.floor(colors.length*.07)));return[0,1,2].map(k=>median(selected.map(c=>c.v[k])));}
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function inside(x,y,points){let hit=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const a=points[i],b=points[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit;}
for(const entry of plan){if(only.length&&!only.includes(entry.id))continue;
 const decoded=await sharp(entry.original).ensureAlpha().raw().toBuffer({resolveWithObject:true}),base=Buffer.from(decoded.data),mask=new Uint8Array(entry.width*entry.height),layers=[];
 for(const edit of entry.edits){
  const e={...edit};e.x=Math.max(0,Math.round(e.x));e.y=Math.max(0,Math.round(e.y));e.w=Math.min(entry.width-e.x,Math.round(e.w));e.h=Math.min(entry.height-e.y,Math.round(e.h));
  const tl=sample(base,entry.width,entry.height,e.x-3,e.y-3),tr=sample(base,entry.width,entry.height,e.x+e.w+3,e.y-3),bl=sample(base,entry.width,entry.height,e.x-3,e.y+e.h+3),br=sample(base,entry.width,entry.height,e.x+e.w+3,e.y+e.h+3);
  const avg=[0,1,2].map(k=>(tl[k]+tr[k]+bl[k]+br[k])/4),fg=e.color||foreground(base,entry.width,e,avg);
  for(let y=0;y<e.h;y++)for(let x=0;x<e.w;x++){const t=e.w>1?x/(e.w-1):0,s=e.h>1?y/(e.h-1):0,i=((e.y+y)*entry.width+e.x+x)*4;
   if(e.polygon&&!inside(e.x+x,e.y+y,e.polygon))continue;
   for(let k=0;k<3;k++)decoded.data[i+k]=e.background?e.background[k]:Math.round((1-s)*((1-t)*tl[k]+t*tr[k])+s*((1-t)*bl[k]+t*br[k]));decoded.data[i+3]=base[i+3];mask[(e.y+y)*entry.width+e.x+x]=1;
  }
  if(!e.replacement)continue;
  const weight=e.weight||'Regular',fontfile=path.resolve('audit/rebrand/fonts/Poppins-'+weight+'.ttf'),fontName='Poppins '+weight.replace('SemiBold','Semi-Bold');
  const originalText=await sharp({text:{text:escape(e.text||e.replacement),font:fontName+' 64',fontfile,rgba:true,dpi:72}}).png().toBuffer({resolveWithObject:true});
  const size=e.fontSize||Math.max(5,64*(e.h-2)/originalText.info.height);
  const color='#'+fg.map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');
  let text=await sharp({text:{text:'<span foreground="'+color+'">'+escape(e.replacement)+'</span>',font:fontName+' '+size.toFixed(2),fontfile,rgba:true,dpi:72}}).png().toBuffer({resolveWithObject:true});
  text=await sharp(text.data).resize(e.w-2,e.h-2,{fit:'inside',withoutEnlargement:true}).png().toBuffer({resolveWithObject:true});
  if(e.angle)text=await sharp(text.data).rotate(e.angle,{background:'#00000000'}).png().toBuffer({resolveWithObject:true});
  const left=e.x+(e.align==='left'?1:Math.floor((e.w-text.info.width)/2)),top=e.y+Math.floor((e.h-text.info.height)/2);
  layers.push({input:text.data,left:Math.max(0,left),top:Math.max(0,top)});
 }
 const data=await sharp(decoded.data,{raw:decoded.info}).composite(layers).raw().toBuffer();
 // Restore untouched RGBA bytes after libvips alpha compositing round trips.
 for(let i=0;i<mask.length;i++)if(!mask[i])for(let k=0;k<4;k++)data[i*4+k]=base[i*4+k];
 let outsideChanges=0;for(let i=0;i<mask.length;i++)if(!mask[i])for(let k=0;k<4;k++)if(base[i*4+k]!==data[i*4+k]){outsideChanges++;break;}
 if(outsideChanges)throw Error('Pixels outside permitted branding regions changed: '+entry.id+' ('+outsideChanges+')');
 const destination='audit/rebrand/edited/'+entry.id+'.webp';await sharp(data,{raw:decoded.info}).webp({lossless:true,effort:6}).toFile(destination);
 const svg='<svg width="'+entry.width+'" height="'+entry.height+'">'+entry.edits.map(e=>'<rect x="'+e.x+'" y="'+e.y+'" width="'+e.w+'" height="'+e.h+'" fill="none" stroke="#ff275b" stroke-width="2"/>').join('')+'</svg>';
 const marked=await sharp(destination).composite([{input:Buffer.from(svg)}]).png().toBuffer();
 await sharp(marked).resize({width:800,withoutEnlargement:true}).png().toFile('audit/rebrand/marked/'+entry.id+'.png');
 const buffer=await fs.readFile(destination);reports.push({id:entry.id,edits:entry.edits.length,outsideChanges,bytes:buffer.length,sha256:crypto.createHash('sha256').update(buffer).digest('hex'),file:destination});console.log(entry.id+' '+entry.edits.length+' edits, '+buffer.length+' bytes');
}
await fs.writeFile('audit/rebrand/render-report'+(only.length?'-sample':'')+'.json',JSON.stringify(reports,null,2));
