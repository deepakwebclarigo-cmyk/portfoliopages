import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
const d='audit/calivora-project-2026-11-12',brand='public/images/brand/projects',exp='exports/Calivora-Brand';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
await fs.mkdir(d+'/branded-png',{recursive:true});await fs.mkdir(brand,{recursive:true});await fs.mkdir(exp,{recursive:true});
const source=await fs.readFile(d+'/logo-generated.png'),geo=JSON.parse(await fs.readFile(d+'/logo-geometry.json','utf8'));
const iconExtract=await sharp(source).extract({left:0,top:0,width:geo.width,height:geo.wordmarkTop-8}).png().toBuffer();
const wordExtract=await sharp(source).extract({left:0,top:geo.wordmarkTop-2,width:geo.width,height:geo.height-geo.wordmarkTop+2}).png().toBuffer();
const icon=await sharp(iconExtract).trim().png().toBuffer(),word=await sharp(wordExtract).trim().png().toBuffer();
async function whiten(buffer){const r=await sharp(buffer).ensureAlpha().raw().toBuffer({resolveWithObject:true});for(let i=0;i<r.data.length;i+=4){r.data[i]=255;r.data[i+1]=255;r.data[i+2]=255;}return sharp(r.data,{raw:r.info}).png().toBuffer();}
const whiteWord=await whiten(word),stackRaw=await sharp(source).ensureAlpha().raw().toBuffer({resolveWithObject:true});
for(let y=geo.wordmarkTop-2;y<geo.height;y++)for(let x=0;x<geo.width;x++){const i=(y*geo.width+x)*4;stackRaw.data[i]=255;stackRaw.data[i+1]=255;stackRaw.data[i+2]=255;}
const inverse=await sharp(stackRaw.data,{raw:stackRaw.info}).png().toBuffer();
for(const [file,pub,b] of [['Calivora-Logo-1000x1000-Transparent.png','calivora-logo-1000.png',source],['Calivora-Logo-White-1000x1000-Transparent.png','calivora-logo-white.png',inverse],['Calivora-Symbol-1000x1000-Transparent.png','calivora-symbol-1000.png',icon]]){
 const png=await sharp(b).resize(1000,1000,{fit:'contain',background:'#00000000'}).png().toBuffer();await fs.writeFile(exp+'/'+file,png);await fs.writeFile(brand+'/'+pub,png);
 const r=await sharp(png).ensureAlpha().raw().toBuffer({resolveWithObject:true});let transparent=0,opaque=0;for(let i=3;i<r.data.length;i+=4){if(!r.data[i])transparent++;if(r.data[i]===255)opaque++;}if(!transparent||!opaque||r.info.width!==1000||r.info.height!==1000)throw Error('Invalid transparent logo '+file);
}
for(const size of [32,180,192])await sharp(icon).resize(size,size,{fit:'contain',background:'#00000000'}).png().toFile(brand+'/calivora-icon-'+size+'.png');
async function fit(b,w,h){return sharp(b).resize(w,h,{fit:'inside'}).png().toBuffer({resolveWithObject:true});}
const hi=await fit(icon,146,146),hw=await fit(whiteWord,444,115);
const horizontal=await sharp({create:{width:640,height:180,channels:4,background:'#00000000'}}).composite([{input:hi.data,left:7,top:Math.round((180-hi.info.height)/2)},{input:hw.data,left:185,top:Math.round((180-hw.info.height)/2)}]).png().toBuffer();
await fs.writeFile(brand+'/calivora-logo-horizontal-white.png',horizontal);
await fs.writeFile(d+'/symbol.png',icon);await fs.writeFile(d+'/wordmark-white.png',whiteWord);
// Harmonic restoration changes only the old bright logo/type ink, retaining the curved background artwork.
function eraseInk(data,width,height,r,whiteOnly=false){
 const w=r.w+2,h=r.h+2,mask=new Uint8Array(w*h),grown=new Uint8Array(w*h),grid=new Float32Array(w*h*3),out=Buffer.from(data);
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const xx=Math.max(0,Math.min(width-1,r.x+x-1)),yy=Math.max(0,Math.min(height-1,r.y+y-1)),at=(yy*width+xx)*4,i=y*w+x;for(let c=0;c<3;c++)grid[i*3+c]=data[at+c];if(x&&y&&x<w-1&&y<h-1&&(Math.min(data[at],data[at+1],data[at+2])>110||(!whiteOnly&&data[at+1]>70&&data[at+1]>data[at]+22)))mask[i]=1;}
 for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++)if(mask[y*w+x])for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(x+dx>0&&x+dx<w-1&&y+dy>0&&y+dy<h-1)grown[(y+dy)*w+x+dx]=1;
 for(let i=0;i<grown.length;i++)if(grown[i])for(let c=0;c<3;c++)grid[i*3+c]=grid[c];
 for(let k=0;k<1000;k++){let delta=0;for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const at=y*w+x;if(!grown[at])continue;const i=at*3;for(let c=0;c<3;c++){const change=((grid[i-3+c]+grid[i+3+c]+grid[i-w*3+c]+grid[i+w*3+c])*.25-grid[i+c])*1.7;grid[i+c]+=change;delta=Math.max(delta,Math.abs(change));}}if(k>100&&delta<.005)break;}
 for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const i=y*w+x;if(grown[i])for(let c=0;c<3;c++)out[((r.y+y-1)*width+r.x+x-1)*4+c]=Math.round(Math.max(0,Math.min(255,grid[i*3+c])));}return out;
}
const entries=[['splash v2.png','splash','Calivora introduction'],['Updated Home.png','home','Daily health dashboard'],['Personal Info.png','personal-info','Personal health profile'],['Health Profile _ Medical History _ Edit Mode.png','medical-history','Medical history selections'],['Multiple My Care Plan.png','care-plans','Current and previous care plans'],['Daily Log list.png','daily-log','Dated daily reflections'],['Labs - option-2.png','labs','Lab categories and reference ranges'],['Upload Labs.png','upload-labs','Medical document upload'],['Chat _ Request Sent.png','provider-chat','Provider chat and call states'],['video-call.png','video-call','Video consultation interface'],['login.png','sign-in','Calivora sign-in'],['Create Account _ view only for web direction.png','registration','Web-assisted account registration'],['Profile option.png','account','Account and membership settings'],['Frame 2085662838.png','brand-identity','Calivora brand identity']];
const images=[],preservation=[],ocr=[];
for(const [file,id,label]of entries){
 const bytes=await fs.readFile(d+'/originals/'+file),r=await (id==='brand-identity'?sharp(bytes).flatten({background:'#201331'}):sharp(bytes)).ensureAlpha().raw().toBuffer({resolveWithObject:true}),original=Buffer.from(r.data),regions=[],layers=[];let data=Buffer.from(original);
 function erase(rect,whiteOnly=false,transparent=false){regions.push({...rect,type:'branding'});if(transparent&&id!=='brand-identity'){for(let y=rect.y;y<rect.y+rect.h;y++)for(let x=rect.x;x<rect.x+rect.w;x++)for(let c=0;c<4;c++)data[(y*r.info.width+x)*4+c]=0;}else data=eraseInk(data,r.info.width,r.info.height,rect,whiteOnly);}
 async function place(b,x,y,w,h){const s=await fit(b,w,h);layers.push({input:s.data,left:Math.round(x+(w-s.info.width)/2),top:Math.round(y+(h-s.info.height)/2)});}
 async function text(rect,value,size,fg,weight='Regular',left=false,whiteOnly=false){erase(rect,whiteOnly);const s=await sharp({text:{text:'<span foreground="'+fg+'">'+value+'</span>',font:'Poppins '+weight.replace('SemiBold','Semi-Bold')+' '+size,fontfile:path.resolve('audit/rebrand/fonts/Poppins-'+weight+'.ttf'),rgba:true,dpi:72}}).png().toBuffer({resolveWithObject:true});if(s.info.width>rect.w-2||s.info.height>rect.h-2)throw Error('Text overflow '+value);layers.push({input:s.data,left:left?rect.x+2:Math.round(rect.x+(rect.w-s.info.width)/2),top:Math.round(rect.y+(rect.h-s.info.height)/2)});regions.at(-1).replacement=value;}
 if(id==='splash'){erase({x:119,y:274,w:152,h:156});await place(icon,146,282,98,98);await place(whiteWord,122,397,146,28);}
 if(id==='sign-in'){erase({x:108,y:99,w:176,h:56});await place(horizontal,108,102,176,50);}
 if(id==='brand-identity'){erase({x:70,y:0,w:117,h:105},false,true);erase({x:48,y:112,w:160,h:35},false,true);await place(icon,79,0,98,98);await place(whiteWord,55,116,146,28);}
 if(id==='registration'){
  await text({x:22,y:78,w:132,h:19},'New to Calivora?',12,'#0bb98a','Regular',true);
  await text({x:81,y:281,w:194,h:21},'Open Calivora registration',12,'#0bb98a','Regular',true);
  await text({x:64,y:536,w:263,h:28},'Go to Calivora registration',15,'#ffffff','SemiBold',false,true);
 }
 if(id==='account')await text({x:34,y:337,w:207,h:23},'Open Calivora account',12,'#0bb98a','Regular',true);
 let final=layers.length?await sharp(data,{raw:r.info}).composite(layers).raw().toBuffer():data;
 for(let y=0;y<r.info.height;y++)for(let x=0;x<r.info.width;x++)if(!regions.some(a=>x>=a.x&&x<a.x+a.w&&y>=a.y&&y<a.y+a.h)){const i=(y*r.info.width+x)*4;for(let c=0;c<4;c++)final[i+c]=original[i+c];}
 const png=await sharp(final,{raw:r.info}).png().toBuffer(),encoded=await sharp(png).webp({lossless:true,effort:6}).toBuffer(),sha=hash(encoded),src='/images/projects/calivora-'+id+'-'+sha.slice(0,10)+'.webp';
 await fs.writeFile(d+'/branded-png/'+id+'.png',png);await fs.writeFile('public'+src,encoded);
 const check=await sharp(encoded).ensureAlpha().raw().toBuffer();let outsideChanges=0;for(let y=0;y<r.info.height;y++)for(let x=0;x<r.info.width;x++)if(!regions.some(a=>x>=a.x&&x<a.x+a.w&&y>=a.y&&y<a.y+a.h)){const i=(y*r.info.width+x)*4;if(original[i+3]&&[0,1,2,3].some(c=>original[i+c]!==check[i+c]))outsideChanges++;}if(outsideChanges)throw Error('Pixels changed outside branding '+id);
 images.push({src,width:r.info.width,height:r.info.height,role:id==='brand-identity'?'composition':'screen',gallery:true,sha256:sha,bytes:encoded.length,originalBytes:bytes.length,label,description:'Calivora - '+label.toLowerCase()});preservation.push({screen:id,originalFile:file,sourceSha256:hash(bytes),regions,outsideChanges,...id==='brand-identity'?{transparentSourceMatte:'#201331'}:{}});ocr.push({id,slug:'app-calivora',png:path.resolve(d+'/branded-png/'+id+'.png'),scale:1});
 console.log(id+' ready');
}
await fs.writeFile(d+'/staged-images.json',JSON.stringify(images,null,2));await fs.writeFile(d+'/screen-preservation.json',JSON.stringify(preservation,null,2));await fs.writeFile(d+'/ocr-published-input.json',JSON.stringify(ocr,null,2));
const brief=JSON.parse(await fs.readFile(d+'/logo-prompt.json','utf8'));
await fs.writeFile(exp+'/Design-Brief.md','# Calivora\n\nPersonal health and care companion. New identity created with built-in imagegen, transparent-background mode.\n\n## Final prompt\n\n'+brief.prompt+'\n\n## Files\n\nPrimary and inverse stacked logos and the emblem are provided as genuine transparent 1000 x 1000 PNGs. Public app icons and horizontal lockups derive from the same generated artwork. Uploaded screenshots remain unchanged outside documented branding regions. No new real domain is asserted by the renamed registration and account labels.\n');
console.log('Calivora assets and alpha PNG exports complete.');
