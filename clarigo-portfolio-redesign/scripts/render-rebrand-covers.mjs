import fs from 'node:fs/promises';
import sharp from 'sharp';
import path from 'node:path';
const plan=JSON.parse(await fs.readFile('audit/rebrand/edit-plan.json','utf8'));
const covers=[
 ['001','002','#070346','StreamDexa','Explore digital data and marketplace collections.'],
 ['010','011','#327eb6','TukioConnect','A connected workspace for teams and care.'],
 ['027','028','#9cccfa','ParaNest','Find postnatal care and nanny support.'],
 ['036','037','#17112e','Whizora','Courses, learner accounts and teaching resources.'],
 ['044','045','#0866a1','EStrata','A workspace for cases, tasks and findings.'],
 ['101','102','#070f28','RallyBridge','Tennis and pickleball, one clear starting point.'],
 ['019','020','#2e7db6','TukioConnect','Care teams, conversations and video calls.'],
 ['053','054','#172e61','SimplyScouted','Discover players. Find a college team.'],
 ['061','062','#3c5344','InfiScribe','Scan, organize and revisit your documents.'],
 ['070','071','#31a800','SilaFlow','Loads, bids and transport in one flow.'],
 ['078','079','#7761ff','HabitStride','Daily routines. A clearer view of progress.'],
 ['086','087','#63ad2a','PantryOne','Discover food and explore your pantry.'],
 ['094','096','#350878','StreetSlate','Contacts, learning and work on the move.'],
];
async function type(text,size,weight,color){return sharp({text:{text:`<span foreground="${color}">${text}</span>`,font:'Poppins '+weight+' '+size,fontfile:path.resolve('audit/rebrand/fonts/Poppins-'+weight+'.ttf'),rgba:true,dpi:72}}).png().toBuffer();}
for(const[id,main,color,name,tagline]of covers){
 const p=plan.find(x=>x.id===id),w=p.width,h=p.height,header=Math.round(h*.26);
 const svg=Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="#eee"/><path d="M0 0H${w}V${header}H0Z" fill="${color}"/><circle cx="${w*.96}" cy="0" r="${w*.25}" fill="white" opacity=".04"/></svg>`);
 const title=await sharp(await type(name,Math.round(w*.064),'SemiBold','#fff')).resize({width:w-200,withoutEnlargement:true}).png().toBuffer({resolveWithObject:true});
 const tag=await sharp(await type(tagline,Math.round(w*.019),'Regular','#fff')).png().toBuffer({resolveWithObject:true});
 const layers=[{input:title.data,left:Math.round((w-title.info.width)/2),top:Math.round(header*.25)},{input:tag.data,left:Math.round((w-tag.info.width)/2),top:Math.round(header*.67)}];
 if(id==='094'){
  for(const [index,screen]of ['099','096','100'].entries()){
   const image=await sharp('audit/rebrand/edited/'+screen+'.webp').resize({height:h-header-90}).png().toBuffer({resolveWithObject:true});
   layers.push({input:image.data,left:Math.round(w*(.25+.25*index)-image.info.width/2),top:header+50});
  }
 }else{
  const image=await sharp('audit/rebrand/edited/'+main+'.webp').resize(w-110,h-header-40,{fit:'inside'}).png().toBuffer({resolveWithObject:true});
  layers.push({input:image.data,left:Math.round((w-image.info.width)/2),top:header+20});
 }
 await sharp(svg).composite(layers).webp({lossless:true,effort:6}).toFile('audit/rebrand/edited/'+id+'.webp');
 console.log(id+' '+name+' cover');
}
await fs.writeFile('audit/rebrand/cover-compositions.json',JSON.stringify(covers.map(([id,main,color,name])=>({id,main,color,name,method:'Renamed original project mockups, composed with a new project heading; no generated product screens.'})),null,2));
