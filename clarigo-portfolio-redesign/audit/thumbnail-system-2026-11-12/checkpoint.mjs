import fs from 'node:fs/promises';import sharp from 'sharp';import ts from 'typescript';
const dir='audit/thumbnail-system-2026-11-12';await fs.mkdir(dir,{recursive:true});
const inv=JSON.parse(await fs.readFile('lib/project-inventory.json','utf8')),sets=JSON.parse(await fs.readFile('lib/project-assets.json','utf8'));
const compiled=ts.transpileModule(await fs.readFile('lib/project-content.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText,{projectContent}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
await fs.writeFile(dir+'/assets-before.json',JSON.stringify(sets,null,2),{flag:'wx'});await fs.copyFile('lib/project-inventory.json',dir+'/inventory-before.json');await fs.copyFile('components/ProjectVisual.tsx',dir+'/ProjectVisual.tsx.before');await fs.copyFile('lib/projects.ts',dir+'/projects.ts.before');
const font='data:font/woff2;base64,'+(await fs.readFile('public/fonts/geist-9b6f5ff45b.woff2')).toString('base64');
for(const kind of ['web','mobile']){
 const list=inv.filter(p=>p.kind===kind),layers=[];
 for(let i=0;i<list.length;i++){const p=list[i],x=i%4*400,y=Math.floor(i/4)*350,name=projectContent[p.slug].displayName??p.name;
 layers.push({input:Buffer.from('<svg width="400" height="40"><rect width="400" height="40" fill="white"/><text x="8" y="25" font-family="Arial" font-size="17">'+name.replaceAll('&','&amp;')+'</text></svg>'),left:x,top:y});
 layers.push({input:await sharp('public'+sets[p.slug].poster.src).resize(390,300,{fit:'contain',background:'#f5f4f8'}).png().toBuffer(),left:x+5,top:y+40});}
 await sharp({create:{width:1600,height:Math.ceil(list.length/4)*350,channels:3,background:'#fff'}}).composite(layers).png().toFile(dir+'/before-'+kind+'.png');
}
console.log(JSON.stringify({projects:inv.length,web:inv.filter(i=>i.kind==='web').length,mobile:inv.filter(i=>i.kind==='mobile').length}));

