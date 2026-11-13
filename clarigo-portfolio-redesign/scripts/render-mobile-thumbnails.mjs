import fs from 'node:fs/promises';
import { thumbnailThemeCss } from './project-thumbnail-theme.mjs';
import crypto from 'node:crypto';
import sharp from 'sharp';
import {chromium} from '@playwright/test';
const dir='audit/mobile-mockup-consistency-2026-11-12';
const read=async file=>JSON.parse(await fs.readFile(file,'utf8'));
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const escape=text=>text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const plan=await read(dir+'/screen-plan.json'),shared=await read('audit/thumbnail-system-2026-11-12/source-plan.json'),assets=await read('lib/project-assets.json');
const only=new Set((process.argv.find(arg=>arg.startsWith('--only='))?.slice(7)??'').split(',').filter(Boolean));
await fs.mkdir(dir+'/screens',{recursive:true});await fs.mkdir(dir+'/renders',{recursive:true});await fs.mkdir('exports/Clarigo-consistent-thumbnails',{recursive:true});
// Rectify only existing screen pixels. No UI, text, or logos are regenerated.
async function rectify(bytes,quad,[width,height]){
 const {data,info}=await sharp(bytes).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const from=[[0,0],[width-1,0],[width-1,height-1],[0,height-1]],m=[];
 for(let i=0;i<4;i++){const [x,y]=from[i],[u,v]=quad[i];m.push([x,y,1,0,0,0,-u*x,-u*y,u],[0,0,0,x,y,1,-v*x,-v*y,v]);}
 for(let c=0;c<8;c++){let row=c;for(let r=c+1;r<8;r++)if(Math.abs(m[r][c])>Math.abs(m[row][c]))row=r;[m[c],m[row]]=[m[row],m[c]];const pivot=m[c][c];if(Math.abs(pivot)<1e-10)throw Error('Invalid screen quadrilateral.');for(let j=c;j<9;j++)m[c][j]/=pivot;for(let r=0;r<8;r++)if(r!==c){const factor=m[r][c];for(let j=c;j<9;j++)m[r][j]-=factor*m[c][j];}}
 const h=m.map(row=>row[8]),out=Buffer.alloc(width*height*4);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){const z=h[6]*x+h[7]*y+1,u=(h[0]*x+h[1]*y+h[2])/z,v=(h[3]*x+h[4]*y+h[5])/z,x0=Math.floor(u),y0=Math.floor(v),dx=u-x0,dy=v-y0;for(let c=0;c<4;c++){let value=0;for(let j=0;j<2;j++)for(let i=0;i<2;i++){const px=Math.max(0,Math.min(info.width-1,x0+i)),py=Math.max(0,Math.min(info.height-1,y0+j));value+=data[(py*info.width+px)*4+c]*(i?dx:1-dx)*(j?dy:1-dy);}out[(y*width+x)*4+c]=Math.round(value);}}
 return sharp(out,{raw:{width,height,channels:4}}).png().toBuffer();
}
const normalized=[];
for(const p of plan){if(only.size&&!only.has(p.slug))continue;const views=[];
 for(let j=0;j<p.views.length;j++){const v=p.views[j],owned=assets[p.slug].images.find(a=>a.src===v.src);if(!owned||owned.sha256!==v.sha256)throw Error('Wrong source ownership '+p.slug);let bytes=await fs.readFile('public'+v.src);if(hash(bytes)!==v.sha256)throw Error('Changed source '+v.src);if(v.quad)bytes=await rectify(bytes,v.quad,v.rectifiedSize);let screen=sharp(bytes);if(v.crop)screen=screen.extract(v.crop);if(v.afterCrop)screen=screen.extract(v.afterCrop);let png=await screen.png().toBuffer();const {data,info}=await sharp(png).removeAlpha().raw().toBuffer({resolveWithObject:true});const sample=y=>{const bins=new Map();for(let dy=0;dy<3;dy++)for(let x=3;x<info.width-3;x++){const at=((Math.min(y+dy,info.height-1))*info.width+x)*3,rgb=[...data.subarray(at,at+3)],key=rgb.map(c=>Math.round(c/16)).join(',');const bin=bins.get(key)??{n:0,sum:[0,0,0]};bin.n++;rgb.forEach((c,i)=>bin.sum[i]+=c);bins.set(key,bin);}const mode=[...bins.values()].sort((a,b)=>b.n-a.n)[0];return mode.sum.map(c=>Math.round(c/mode.n));},bg=v.backgroundPoint?[...data.subarray((v.backgroundPoint[1]*info.width+v.backgroundPoint[0])*3,(v.backgroundPoint[1]*info.width+v.backgroundPoint[0])*3+3)]:sample(Math.min(5,info.height-1)),bottom=sample(info.height-6),rgb=a=>'rgb('+a.join(',')+')';
 const svg=Buffer.from('<svg width="'+info.width+'" height="'+info.height+'"><rect width="100%" height="100%" fill="'+rgb(bg)+'"/><rect y="'+Math.floor(info.height/2)+'" width="100%" height="'+info.height+'" fill="'+rgb(bottom)+'"/></svg>'),mask=Buffer.from('<svg width="'+info.width+'" height="'+info.height+'"><rect width="100%" height="100%" rx="40" fill="white"/></svg>');
 const clipped=await sharp(png).ensureAlpha().composite([{input:mask,blend:'dest-in'}]).png().toBuffer();png=await sharp(svg).composite([{input:clipped}]).png().toBuffer();
 const file=dir+'/screens/'+p.slug+'-'+j+'.png';await fs.writeFile(file,png);views.push({file,background:rgb(bg),bottom:rgb(bottom),width:info.width,height:info.height});}
 normalized.push({slug:p.slug,views});
}
const sheetLayers=[];
for(let i=0;i<normalized.length;i++)for(let j=0;j<2;j++){const v=normalized[i].views[j];sheetLayers.push({input:await sharp(v.file).resize(182,370,{fit:'contain',background:v.background}).png().toBuffer(),left:i%5*400+j*190+10,top:Math.floor(i/5)*410+28});}
await sharp({create:{width:2000,height:Math.ceil(normalized.length/5)*410,channels:3,background:'#f1f1f4'}}).composite(sheetLayers).png().toFile(dir+'/normalized-screens.png');
if(process.argv.includes('--prepare-only')){console.log('Prepared '+normalized.length*2+' verified source screens.');process.exit(0);}
const font='data:font/woff2;base64,'+(await fs.readFile('public/fonts/geist-9b6f5ff45b.woff2')).toString('base64');
const style=(await fs.readFile(dir+'/thumbnail.css','utf8')).trimStart();
let records={};try{records=await read(dir+'/staged-thumbnails.json');}catch(e){if(e.code!=='ENOENT')throw e;}
const browser=await chromium.launch({channel:'chrome',headless:true});
try{const page=await browser.newPage({viewport:{width:1600,height:1325},deviceScaleFactor:1});for(const p of normalized){const spec=shared.find(a=>a.slug===p.slug),source=plan.find(a=>a.slug===p.slug),phones=[];
 for(const view of p.views){const bytes=await fs.readFile(view.file);phones.push('<div class="device"><div class="display" style="--screen-bg:'+view.background+';--screen-bottom:'+view.bottom+'"><div class="hardware"><i></i></div><div class="screen"><img src="data:image/png;base64,'+bytes.toString('base64')+'" alt="'+escape(spec.name)+' existing app interface"></div><div class="chin"></div></div></div>');}
 const html='<!doctype html><html><head><meta charset="utf-8"><style>@font-face{font-family:Geist;src:url('+font+')}' +style+thumbnailThemeCss(p.slug)+'</style></head><body><div class="heading"><h1>'+escape(spec.name)+'<span class="dot">.</span></h1><span class="kind">MOBILE EXPERIENCE</span></div><p class="discipline">'+escape(spec.discipline)+'</p><div class="stage"><div class="devices">'+phones.join('')+'</div></div><div class="foot"><span class="mark">Clarigo Infotech</span><span class="footerLabel">SELECTED WORK / MOBILE</span></div></body></html>';
 await page.setContent(html);await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));});
 const fit=await page.evaluate(()=>{const stage=document.querySelector('.stage').getBoundingClientRect(),title=document.querySelector('h1'),pill=document.querySelector('.kind').getBoundingClientRect(),devices=[...document.querySelectorAll('.device')].map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom};});return {titleFits:title.scrollWidth<=title.clientWidth&&title.getBoundingClientRect().right<pill.left-15,images:[...document.images].every(img=>{const r=img.getBoundingClientRect();return img.naturalWidth>0&&r.left>=stage.left&&r.right<=stage.right&&r.top>=stage.top&&r.bottom<=stage.bottom;}),devices};});
 if(!fit.images||!fit.titleFits||fit.devices.length!==2||fit.devices[0].y!==fit.devices[1].y||fit.devices[0].height!==fit.devices[1].height)throw Error('Inconsistent mockup geometry '+p.slug);
 const png=await page.screenshot(),pngHash=hash(png),src='/images/thumbnails/'+p.slug+'-'+pngHash.slice(0,10)+'.webp',variants={};
 await fs.writeFile(dir+'/renders/'+p.slug+'.png',png);await fs.writeFile('exports/Clarigo-consistent-thumbnails/'+p.slug+'.png',png);
 if(p.slug==='app-tukora-connect')await fs.writeFile('exports/Tukora-Connect-Thumbnails/Tukora-Connect-Mobile.png',png);
 for(const[label,width]of[['original',1600],['card',720],['medium',960]]){const a=await sharp(png).resize({width}).webp({quality:90,effort:5}).toBuffer({resolveWithObject:true}),url=label==='original'?src:src.replace('.webp','-'+label+'.webp');await fs.writeFile('public'+url,a.data);variants[label]={src:url,width:a.info.width,height:a.info.height,sha256:hash(a.data),bytes:a.data.length};}
 records[p.slug]={src,width:1600,height:1325,sha256:variants.original.sha256,bytes:variants.original.bytes,card:variants.card,medium:variants.medium,exportSha256:pngHash,sourceRefs:source.views.map(v=>({src:v.src,sha256:v.sha256,...v.crop?{crop:v.crop}:{},...v.quad?{quad:v.quad,rectifiedSize:v.rectifiedSize,...v.afterCrop?{afterCrop:v.afterCrop}:{}}:{} })),fit,design:'Consistent two-device mobile showcase; slim graphite hardware, equal dimensions and baseline; original app UI and logos'};
 await fs.writeFile(dir+'/staged-thumbnails.json',JSON.stringify(records,null,2)+'\n');console.log(p.slug+' rendered');
 }await page.close();}finally{await browser.close();}
const layers=[];for(let i=0;i<plan.length;i++){const a=records[plan[i].slug];if(a)layers.push({input:await sharp('public'+a.src).resize(390,323).png().toBuffer(),left:i%4*400+5,top:Math.floor(i/4)*350+5});}await sharp({create:{width:1600,height:Math.ceil(plan.length/4)*350,channels:3,background:'#fff'}}).composite(layers).png().toFile(dir+'/all-mobile-after.png');
