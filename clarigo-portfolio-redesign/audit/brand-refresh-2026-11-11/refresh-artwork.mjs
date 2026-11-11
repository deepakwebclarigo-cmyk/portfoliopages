
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
sharp.cache(false);sharp.concurrency(1);
const dir='audit/brand-refresh-2026-11-11';
const rows=JSON.parse(await fs.readFile(dir+'/source-ocr.json','utf8'));
const brands={
'tukioconnect':{name:'Tukora Connect',logo:'tukora-connect',slug:'tukora-connect'},'app-tukioconnect':{name:'Tukora Connect',logo:'tukora-connect',slug:'app-tukora-connect'},
whizora:{name:'Whizlume',logo:'whizlume',slug:'whizlume'},'alum-connect':{name:'Alumvia',logo:'alumvia',slug:'alumvia'},
kegelklock:{name:'KegelTempo',logo:'kegeltempo',slug:'kegeltempo'},'app-kegalklock':{name:'KegelTempo',logo:'kegeltempo',slug:'app-kegeltempo'}};
const covers={all026:['all027','#e9f4fc','A connected workspace for teams and care.'],all153:['all154','#e9f4fc','Care teams, conversations and video calls.'],all091:['all092','#f1ecfb','Courses, learner accounts and teaching resources.'],all068:['all069','#def5f4','Learning and student services, connected.'],all073:['all074','#fff4c8','A focused rhythm for exercise routines.']};
const rebuilt=new Set([...Object.keys(covers),'all288','all289','all290']);
const norm=s=>s.toLowerCase().replace(/[^a-z0-9]/g,'');
function bounds(words,pad=2){const x=Math.floor(Math.min(...words.map(w=>w.x))-pad),y=Math.floor(Math.min(...words.map(w=>w.y))-pad);return{x,y,w:Math.ceil(Math.max(...words.map(w=>w.x+w.w))+pad)-x,h:Math.ceil(Math.max(...words.map(w=>w.y+w.h))+pad)-y};}
const only=new Set(process.argv.slice(2));
const manual={
all028:[{x:650,y:296,w:205,h:104,mode:'logo'}],
all030:[{x:223,y:236,w:216,h:115,mode:'logo'}],
all033:[{x:166,y:230,w:128,h:68,mode:'logo'}],
all034:[{x:222,y:236,w:218,h:115,mode:'logo'}],
all154:[{x:650,y:470,w:290,h:190,mode:'logo',stacked:true}],
all156:[{x:75,y:205,w:225,h:230,mode:'logo',stacked:true,background:[245,248,250]}],
all069:[{x:189,y:98,w:219,h:43,mode:'logo'}],
all070:[{x:129,y:264,w:218,h:41,mode:'logo'},{x:123,y:1492,w:222,h:40,mode:'logo'}],
all071:[{x:211,y:255,w:205,h:40,mode:'logo'},{x:204,y:1611,w:207,h:40,mode:'logo'}],
all072:[{x:211,y:252,w:207,h:44,mode:'logo'}],
all074:[{x:297,y:76,w:198,h:57,mode:'logo'},{x:671,y:452,w:249,h:74,mode:'logo'}],
all076:[{x:406,y:568,w:222,h:34,mode:'text',replacement:'KegelTempo',weight:'SemiBold',color:[0,0,0]},{x:109,y:663,w:375,h:137,mode:'logo',background:[246,204,0]},{x:504,y:663,w:375,h:137,mode:'logo',background:[246,204,0]}],
all077:[{x:321,y:1492,w:180,h:24,mode:'text',replacement:'KegelTempo exercise'},{x:929,y:1492,w:182,h:24,mode:'text',replacement:'KegelTempo exercise'}],
all075:[{x:114,y:247,w:222,h:66,mode:'logo',dim:.22}],
all079:[{x:114,y:246,w:222,h:67,mode:'logo',dim:.22},{x:596,y:831,w:292,h:87,mode:'logo',dim:.22}],
all080:[{x:112,y:246,w:226,h:70,mode:'logo'},{x:593,y:843,w:294,h:87,mode:'logo'}],
all081:[{x:145,y:1119,w:577,h:216,mode:'logo',background:[246,204,0]},{x:753,y:1119,w:577,h:216,mode:'logo',background:[246,204,0]}],
all291:[{x:52,y:149,w:270,h:79,mode:'logo',background:[255,214,49]}],
all293:[{x:125,y:69,w:126,h:35,mode:'logo',background:[255,217,49]}],
all294:[{x:125,y:69,w:126,h:35,mode:'logo',background:[255,217,49]}]
};
function overlap(a,b){return Math.max(0,Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x))*Math.max(0,Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y));}
const plans=[];
for(const row of rows){
 const brand=brands[row.slug],edits=[...(manual[row.id]||[])];
 if(!rebuilt.has(row.id)){
  const candidates=[];
  for(let lineIndex=0;lineIndex<row.lines.length;lineIndex++){
   const line=row.lines[lineIndex];
   if(norm(line.text)==='tukio'&&norm(row.lines[lineIndex+1]?.text||'')==='connect'){candidates.push({...bounds([...line.words,...row.lines[lineIndex+1].words],4),mode:'logo'});continue;}
   for(let first=0;first<line.words.length;first++)for(let n=1;n<=3&&first+n<=line.words.length;n++){
    const words=line.words.slice(first,first+n),text=words.map(w=>w.text).join(' '),s=norm(text);
    let hit=false,replacement=brand.name;
    if(row.slug.includes('tukio'))hit=/^tuki(?:o)?connect!?$/.test(s)||s==='tukio';
    else if(row.slug==='whizora')hit=s==='whizora';
    else if(row.slug==='alum-connect')hit=/^alumconnect$/.test(s);
    else hit=/^keg[ae]lklock(?:com)?$/.test(s)||s==='klock';
    if(!hit)continue;
    if(s==='tukio'&&norm(row.lines[lineIndex+1]?.text||'')==='connect')continue;
    const logo=row.slug==='whizora'||row.slug==='alum-connect'&&norm(line.text)===s;
    candidates.push({...bounds(words,2),text,mode:logo?'logo':'text',replacement,weight:'Regular'});
   }
  }
  candidates.sort((a,b)=>b.w*b.h-a.w*a.h);for(const e of candidates)if(!edits.some(m=>overlap(e,m)>Math.min(e.w*e.h,m.w*m.h)*.12))edits.push(e);
  if(row.slug==='app-kegalklock'&&row.asset.width===375)edits.push({x:0,y:754,w:375,h:58,mode:'clear'});
 }
 for(const e of edits){e.x=Math.max(0,e.x);e.y=Math.max(0,e.y);e.w=Math.min(row.asset.width-e.x,e.w);e.h=Math.min(row.asset.height-e.y,e.h);}
 plans.push({...row,brand,edits});
}
await fs.mkdir(dir+'/edited',{recursive:true});await fs.mkdir(dir+'/originals',{recursive:true});
for(const p of plans)await fs.copyFile('public'+p.asset.src,dir+'/originals/'+path.basename(p.asset.src));
await fs.writeFile(dir+'/edit-plan.json',JSON.stringify(plans.map(({lines,...p})=>p),null,2));
const median=a=>a.sort((x,y)=>x-y)[Math.floor(a.length/2)];
function sample(data,width,height,x,y){const arr=[[],[],[]];for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){const k=(Math.min(height-1,Math.max(0,Math.round(y+dy)))*width+Math.min(width-1,Math.max(0,Math.round(x+dx))))*4;for(let c=0;c<3;c++)arr[c].push(data[k+c]);}return arr.map(median);}
const escaped=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const reports=[];
async function edit(p){
 const {data,info}=await sharp('public'+p.asset.src).ensureAlpha().raw().toBuffer({resolveWithObject:true}),original=Buffer.from(data),mask=new Uint8Array(info.width*info.height),layers=[];
 for(const e of p.edits){
  const tl=sample(original,info.width,info.height,e.x-3,e.y-3),tr=sample(original,info.width,info.height,e.x+e.w+3,e.y-3),bl=sample(original,info.width,info.height,e.x-3,e.y+e.h+3),br=sample(original,info.width,info.height,e.x+e.w+3,e.y+e.h+3),bg=[0,1,2].map(c=>(tl[c]+tr[c]+bl[c]+br[c])/4);
  const colors=[];for(let y=e.y;y<e.y+e.h;y++)for(let x=e.x;x<e.x+e.w;x++){const k=(y*info.width+x)*4,v=[original[k],original[k+1],original[k+2]];colors.push({v,d:Math.hypot(...v.map((n,c)=>n-bg[c]))});}
  colors.sort((a,b)=>b.d-a.d);const foreground=e.color||[0,1,2].map(c=>median(colors.slice(0,Math.max(3,Math.floor(colors.length*.07))).map(v=>v.v[c])));
  for(let y=0;y<e.h;y++)for(let x=0;x<e.w;x++){const a=e.w>1?x/(e.w-1):0,b=e.h>1?y/(e.h-1):0,k=((e.y+y)*info.width+e.x+x)*4;for(let c=0;c<3;c++)data[k+c]=e.background?e.background[c]:Math.round((1-b)*((1-a)*tl[c]+a*tr[c])+b*((1-a)*bl[c]+a*br[c]));if(e.mode==='clear')data[k+3]=0;mask[(e.y+y)*info.width+e.x+x]=1;}
  if(e.mode==='clear')continue;
  let art;
  if(e.mode==='logo'){
   const file=e.stacked?'public/images/brand/projects/'+p.brand.logo+'.png':dir+'/logos/'+p.brand.logo+'-horizontal.png';
   art=await sharp(file).resize(Math.max(1,e.w-4),Math.max(1,e.h-4),{fit:'inside'}).png().toBuffer({resolveWithObject:true});
   if(e.dim){const raw=await sharp(art.data).ensureAlpha().raw().toBuffer({resolveWithObject:true});for(let i=0;i<raw.data.length;i+=4)for(let c=0;c<3;c++)raw.data[i+c]=Math.round(raw.data[i+c]*e.dim);art.data=await sharp(raw.data,{raw:raw.info}).png().toBuffer();}
  }else{
   const weight=e.weight||'Regular',color='#'+foreground.map(v=>Math.round(v).toString(16).padStart(2,'0')).join(''),fontfile=path.resolve('audit/rebrand/fonts/Poppins-'+weight+'.ttf');
   const type=await sharp({text:{text:'<span foreground="'+color+'">'+escaped(e.replacement||p.brand.name)+'</span>',font:'Poppins '+weight+' 64',fontfile,rgba:true,dpi:72}}).png().toBuffer();
   art=await sharp(type).resize(Math.max(1,e.w-2),Math.max(1,e.h-2),{fit:'inside'}).png().toBuffer({resolveWithObject:true});
  }
  layers.push({input:art.data,left:e.x+(e.mode==='text'?1:Math.floor((e.w-art.info.width)/2)),top:e.y+Math.floor((e.h-art.info.height)/2)});
 }
 const composite=await sharp(data,{raw:info}).composite(layers).raw().toBuffer();let outsideChanges=0;
 for(let i=0;i<mask.length;i++)if(!mask[i])for(let c=0;c<4;c++){if(composite[i*4+c]!==original[i*4+c]){composite[i*4+c]=original[i*4+c];}}
 for(let i=0;i<mask.length;i++)if(!mask[i]&&original[i*4+3]>0)for(let c=0;c<4;c++)if(composite[i*4+c]!==original[i*4+c]){outsideChanges++;break;}
 await sharp(composite,{raw:info}).webp({lossless:true,effort:5}).toFile(dir+'/edited/'+p.id+'.webp');reports.push({id:p.id,slug:p.slug,edits:p.edits.length,outsideChanges});console.log(p.id+' '+p.slug+' '+p.edits.length+' branding regions');
}
for(const p of plans.filter(p=>!rebuilt.has(p.id)&&(!only.size||only.has(p.id))))await edit(p);
async function type(text,size,color){return sharp({text:{text:'<span foreground="'+color+'">'+escaped(text)+'</span>',font:'Poppins Regular '+size,fontfile:path.resolve('audit/rebrand/fonts/Poppins-Regular.ttf'),rgba:true,dpi:72}}).png().toBuffer({resolveWithObject:true});}
for(const p of plans.filter(p=>rebuilt.has(p.id)&&(!only.size||only.has(p.id)))){
 const w=p.asset.width,h=p.asset.height,cover=covers[p.id],app=p.id==='all288',phoneComposition=['all289','all290'].includes(p.id),header=phoneComposition?0:Math.round(h*.26),bg=p.brand.logo==='kegeltempo'?'#fff6db':cover?.[1]||'#f7f7f9',layers=[];
 if(!phoneComposition){
  const logo=await sharp(dir+'/logos/'+p.brand.logo+'-horizontal.png').resize(Math.round(w*.6),Math.round(header*.48),{fit:'inside'}).png().toBuffer({resolveWithObject:true});layers.push({input:logo.data,left:Math.round((w-logo.info.width)/2),top:Math.round(header*.14)});
  const caption=await type(app?'A steady rhythm for daily routines.':cover[2],Math.round(w*.019),'#344457');layers.push({input:caption.data,left:Math.round((w-caption.info.width)/2),top:Math.round(header*.76)});
 }
 const ids=cover?[cover[0]]:app?['all291','all294','all292']:p.id==='all289'?['all291','all294']:['all292','all293'];
 const areaH=h-header-70;let x=0;for(let i=0;i<ids.length;i++){
  const image=await sharp(dir+'/edited/'+ids[i]+'.webp').resize(Math.round((w-100)/ids.length),areaH,{fit:'inside'}).png().toBuffer({resolveWithObject:true});
  layers.push({input:image.data,left:Math.round(w*(i+.5)/ids.length-image.info.width/2),top:header+Math.round((h-header-image.info.height)/2)});
 }
 await sharp({create:{width:w,height:h,channels:4,background:bg}}).composite(layers).webp({lossless:true,effort:5}).toFile(dir+'/edited/'+p.id+'.webp');reports.push({id:p.id,slug:p.slug,recomposed:true,sourceIds:ids,method:'Current project original screens and new approved logo, no generated interfaces'});console.log(p.id+' '+p.slug+' branded composition');
}
let finalReports=reports;if(only.size){const previous=JSON.parse(await fs.readFile(dir+'/render-report.json','utf8'));finalReports=[...previous.filter(p=>!only.has(p.id)),...reports];}await fs.writeFile(dir+'/render-report.json',JSON.stringify(finalReports,null,2));
const layers=[];for(let i=0;i<plans.length;i++){const p=plans[i],x=i%6*240,y=Math.floor(i/6)*240;layers.push({input:Buffer.from('<svg width="240" height="25"><text x="4" y="19" font-size="16">'+p.id+' '+p.brand.logo+'</text></svg>'),left:x,top:y},{input:await sharp(dir+'/edited/'+p.id+'.webp').resize(230,207,{fit:'contain',background:'#f0f0f2'}).png().toBuffer(),left:x+5,top:y+28});}
await sharp({create:{width:1440,height:Math.ceil(plans.length/6)*240,channels:3,background:'#ffffff'}}).composite(layers).png().toFile(dir+'/artwork-review.png');
console.log('All '+reports.length+' branded artwork assets staged.');

