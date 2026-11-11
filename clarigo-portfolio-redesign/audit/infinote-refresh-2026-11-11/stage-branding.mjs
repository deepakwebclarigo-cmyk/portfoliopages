
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import crypto from 'node:crypto';
const dir='audit/infinote-refresh-2026-11-11',hash=b=>crypto.createHash('sha256').update(b).digest('hex');
await fs.mkdir(dir+'/originals',{recursive:true});await fs.mkdir(dir+'/edited',{recursive:true});await fs.mkdir('public/images/brand/projects',{recursive:true});await fs.mkdir('exports/Infinote-branding',{recursive:true});
const supplied=await fs.readFile('C:/Users/lenovo/Downloads/Logo.png');
const decoded=await sharp(supplied).ensureAlpha().raw().toBuffer({resolveWithObject:true});if(decoded.info.width!==1000||decoded.info.height!==1000)throw Error('Supplied logo dimensions differ from reviewed asset.');
const bg=Array.from(decoded.data.slice(0,3)),white=Buffer.alloc(decoded.data.length),green=Buffer.alloc(decoded.data.length);let l=1000,t=1000,r=-1,b=-1;
const denominator=bg.reduce((sum,v)=>sum+(255-v)**2,0);
for(let k=0;k<1000000;k++){
 const at=k*4;let numerator=0;for(let c=0;c<3;c++)numerator+=(decoded.data[at+c]-bg[c])*(255-bg[c]);const alpha=Math.max(0,Math.min(255,Math.round(numerator/denominator*255)));
 for(let c=0;c<3;c++){white[at+c]=255;green[at+c]=bg[c];}white[at+3]=green[at+3]=alpha;
 if(alpha>5){const x=k%1000,y=Math.floor(k/1000);l=Math.min(l,x);r=Math.max(r,x);t=Math.min(t,y);b=Math.max(b,y);}
}
const bounds={left:l,top:t,width:r-l+1,height:b-t+1};
const light=await sharp(white,{raw:decoded.info}).extract(bounds).png().toBuffer(),dark=await sharp(green,{raw:decoded.info}).extract(bounds).png().toBuffer();
await fs.writeFile(dir+'/supplied-logo.png',supplied,{flag:'wx'});await fs.writeFile('public/images/brand/projects/infinote-logo.png',supplied);await fs.writeFile('public/images/brand/projects/infinote-app-icon.png',supplied);
await fs.writeFile('public/images/brand/projects/infinote-wordmark-white.png',light);await fs.writeFile('public/images/brand/projects/infinote-wordmark-green.png',dark);
await fs.writeFile('exports/Infinote-branding/Infinote-logo-1000px.png',supplied);await fs.writeFile('exports/Infinote-branding/Infinote-wordmark-transparent.png',light);
for(const size of [512,192,180,32]){const bytes=await sharp(supplied).resize(size,size).png().toBuffer();await fs.writeFile('public/images/brand/projects/infinote-app-icon-'+size+'.png',bytes);await fs.writeFile('exports/Infinote-branding/Infinote-app-icon-'+size+'.png',bytes);}
await fs.writeFile(dir+'/logo-provenance.json',JSON.stringify({source:'C:/Users/lenovo/Downloads/Logo.png',suppliedSha256:hash(supplied),publishedSha256:hash(await fs.readFile('public/images/brand/projects/infinote-logo.png')),width:1000,height:1000,background:bg,wordmarkBounds:bounds,method:'Original uploaded PNG retained exactly. Header wordmark alpha extracted from its solid background without redrawing; icon sizes uniformly resized from the supplied square.'},null,2));
const inventory=JSON.parse(await fs.readFile('lib/project-inventory.json','utf8')),assets=JSON.parse(await fs.readFile('lib/project-assets.json','utf8')),set=assets['app-infiscribe'];if(!set||inventory.length!==44)throw Error('Portfolio differs from reviewed 44-project state.');
await fs.writeFile(dir+'/assets-before.json',JSON.stringify(assets,null,2),{flag:'wx'});await fs.writeFile(dir+'/inventory-before.json',JSON.stringify(inventory,null,2),{flag:'wx'});
const prior=JSON.parse(await fs.readFile('audit/rebrand/edit-plan.json','utf8')),changes=JSON.parse(await fs.readFile('audit/rebrand/asset-changes.json','utf8')),report=[],layers=[];
const median=a=>a.sort((x,y)=>x-y)[Math.floor(a.length/2)];
function sample(data,w,h,x,y){const colors=[[],[],[]];for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){const k=(Math.max(0,Math.min(h-1,Math.round(y+dy)))*w+Math.max(0,Math.min(w-1,Math.round(x+dx))))*4;for(let c=0;c<3;c++)colors[c].push(data[k+c]);}return colors.map(median);}
const all=[set.poster,...set.images],plan=[];
for(let i=0;i<all.length;i++){
 const asset=all[i],change=changes.find(p=>p.src===asset.src),old=prior.find(p=>p.id===change?.id);if(!old)throw Error('Missing preserved source '+asset.src);
 const input=await fs.readFile('public'+asset.src);await fs.writeFile(dir+'/originals/'+path.basename(asset.src),input);
 const original=await sharp(input).ensureAlpha().raw().toBuffer({resolveWithObject:true}),data=Buffer.from(original.data),mask=new Uint8Array(asset.width*asset.height),overlays=[];
 const edits=old.id==='061'?[{x:555,y:59,w:490,h:128,mode:'logo',tone:'white'},{x:674,y:755,w:252,h:68,mode:'logo',tone:'white'}]:old.edits.map((e,index)=>({...e,mode:old.id==='066'&&index>0?'restore':'logo',tone:['062','065'].includes(old.id)?'white':'green'}));
 for(const e of edits){
  if(e.mode==='restore'){
   const source=await sharp(old.original).extract({left:e.x,top:e.y,width:e.w,height:e.h}).png().toBuffer();overlays.push({input:source,left:e.x,top:e.y});
  }else{
   const tl=sample(original.data,asset.width,asset.height,e.x-3,e.y-3),tr=sample(original.data,asset.width,asset.height,e.x+e.w+3,e.y-3),bl=sample(original.data,asset.width,asset.height,e.x-3,e.y+e.h+3),br=sample(original.data,asset.width,asset.height,e.x+e.w+3,e.y+e.h+3);
   for(let y=0;y<e.h;y++)for(let x=0;x<e.w;x++){const a=e.w>1?x/(e.w-1):0,b=e.h>1?y/(e.h-1):0,k=((e.y+y)*asset.width+e.x+x)*4;for(let c=0;c<3;c++)data[k+c]=Math.round((1-b)*((1-a)*tl[c]+a*tr[c])+b*((1-a)*bl[c]+a*br[c]));}
   const mark=await sharp(e.tone==='white'?light:dark).resize(e.w-2,e.h-2,{fit:'inside'}).png().toBuffer({resolveWithObject:true});overlays.push({input:mark.data,left:e.x+Math.floor((e.w-mark.info.width)/2),top:e.y+Math.floor((e.h-mark.info.height)/2)});
  }
  for(let y=e.y;y<e.y+e.h;y++)for(let x=e.x;x<e.x+e.w;x++)mask[y*asset.width+x]=1;
 }
 let result=input;if(edits.length){const out=await sharp(data,{raw:original.info}).composite(overlays).raw().toBuffer();for(let k=0;k<mask.length;k++)if(!mask[k])for(let c=0;c<4;c++)out[k*4+c]=original.data[k*4+c];result=await sharp(out,{raw:original.info}).webp({lossless:true,effort:5}).toBuffer();}
 await fs.writeFile(dir+'/edited/'+old.id+'.webp',result);
 const after=await sharp(result).ensureAlpha().raw().toBuffer();let outsideChanges=0;for(let k=0;k<mask.length;k++)if(!mask[k]&&(original.data[k*4+3]>0||after[k*4+3]>0))for(let c=0;c<4;c++)if(after[k*4+c]!==original.data[k*4+c]){outsideChanges++;break;}if(outsideChanges)throw Error('Unrelated screenshot pixels changed');
 plan.push({id:old.id,previous:asset,original:old.original,edits});report.push({id:old.id,edits:edits.length,outsideChanges,sha256:hash(result),bytes:result.length});
 const x=i%3*350,y=Math.floor(i/3)*330;layers.push({input:Buffer.from('<svg width="350" height="28"><text x="6" y="21" font-size="18">'+old.id+' / Infinote</text></svg>'),left:x,top:y},{input:await sharp(result).resize(340,295,{fit:'contain',background:'#f1f1f3'}).png().toBuffer(),left:x+5,top:y+30});
 console.log(old.id+' Infinote '+edits.length+' branding areas; '+outsideChanges+' unrelated pixel changes');
}
await fs.writeFile(dir+'/edit-plan.json',JSON.stringify(plan,null,2));await fs.writeFile(dir+'/artwork-verification.json',JSON.stringify(report,null,2));
await sharp({create:{width:1050,height:990,channels:3,background:'#fff'}}).composite(layers).png().toFile(dir+'/artwork-review.png');
console.log('Nine project images staged with the supplied infinity wordmark.');

