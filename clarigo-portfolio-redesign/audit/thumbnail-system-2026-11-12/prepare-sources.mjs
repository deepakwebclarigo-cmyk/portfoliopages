import fs from 'node:fs/promises';import sharp from 'sharp';import ts from 'typescript';
const dir='audit/thumbnail-system-2026-11-12',inventory=JSON.parse(await fs.readFile('lib/project-inventory.json','utf8')),sets=JSON.parse(await fs.readFile('lib/project-assets.json','utf8'));
const compiled=ts.transpileModule(await fs.readFile('lib/project-content.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText,{projectContent}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
const special={
 printlific:{poster:true,crop:{left:265,top:405,width:1110,height:735}},
 nerdrabbit:{poster:true,crop:{left:235,top:405,width:1030,height:690}},
 leadforma:{poster:true,crop:{left:265,top:405,width:1110,height:735}},
 'glocal-expert':{index:1},'mercury-mailroom':{index:3},umeed:{index:0},'network-capital':{index:0}
},plan=[];
for(const p of inventory){
 const a=sets[p.slug],c=projectContent[p.slug];let sources,layout='single';
 if(p.kind==='web'){
  const option=special[p.slug]??{index:0,crop:{left:66,top:70,width:1468,height:827}},asset=option.poster?a.poster:a.images[option.index];if(!asset)throw Error('Missing source '+p.slug);
  sources=[{src:asset.src,sha256:asset.sha256,...(option.crop?{crop:option.crop}:{})}];
 }else{
  const screens=a.images.filter(v=>v.width<=800&&v.height/v.width>1.8&&v.height/v.width<2.4);
  if(screens.length>=3){layout='phones';sources=screens.slice(0,3).map(v=>({src:v.src,sha256:v.sha256}));}
  else{const asset=p.slug==='app-livsocial'?a.images[0]:p.slug==='app-heartsync'?a.images[1]:a.images[0];sources=[{src:asset.src,sha256:asset.sha256}];}
 }
 for(const source of sources){const m=await sharp('public'+source.src).metadata();if(source.crop&&(source.crop.left+source.crop.width>m.width||source.crop.top+source.crop.height>m.height))throw Error('Invalid source crop: '+p.slug);}
 plan.push({slug:p.slug,name:c.displayName??p.name,kind:p.kind,discipline:c.discipline,layout,sources});
}
await fs.writeFile(dir+'/source-plan.json',JSON.stringify(plan,null,2));console.log('Prepared 44 project-owned source selections.');

