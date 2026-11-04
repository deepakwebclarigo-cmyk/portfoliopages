import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import crypto from 'node:crypto';
const root=process.cwd(),directory=path.join(root,'audit/rebrand');
for(const sub of ['ocr-input','original-assets','fonts'])await fs.mkdir(path.join(directory,sub),{recursive:true});
const names=JSON.parse(await fs.readFile('audit/rebrand/name-map.json','utf8'));
const assets=JSON.parse(await fs.readFile('lib/project-assets.json','utf8'));
const exclusions=JSON.parse(await fs.readFile('lib/asset-exclusions.json','utf8'));
const rows=[];
for(const name of names)for(let p=0;p<name.oldSlugs.length;p++){
 const slug=name.oldSlugs[p],set=assets[slug],seen=new Set();
 for(const asset of [set.poster,...set.images.filter(a=>!Object.hasOwn(exclusions[slug]||{},decodeURIComponent(a.source.split('/').pop())))]){
  if(seen.has(asset.src))continue;seen.add(asset.src);
  const id=String(rows.length+1).padStart(3,'0'),original=path.join(directory,'original-assets',path.basename(asset.src));
  try{await fs.copyFile(path.join(root,'public',asset.src),original,fs.constants.COPYFILE_EXCL);}catch(e){if(e.code!=='EEXIST')throw e;}
  const scale=Math.min(3,3600/Math.max(asset.width,asset.height)),png=path.join(directory,'ocr-input',id+'.png');
  await sharp(original).resize({width:Math.round(asset.width*scale)}).png().toFile(png);
  rows.push({id,slug,newSlug:name.slugs[p],oldName:name.oldName,name:name.name,tokens:name.tokens,asset,original,png,scale:Math.round(asset.width*scale)/asset.width});
 }
}
await fs.writeFile(path.join(directory,'assets-before.json'),JSON.stringify(rows,null,2));
const records=[];
for(const weight of ['Regular','Light','SemiBold','Bold']){
 const source='https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-'+weight+'.ttf',destination=path.join(directory,'fonts','Poppins-'+weight+'.ttf');
 let data;try{data=await fs.readFile(destination);}catch{const r=await fetch(source);if(!r.ok)throw Error('Font request '+r.status);data=Buffer.from(await r.arrayBuffer());await fs.writeFile(destination,data);}
 records.push({source,file:destination,sha256:crypto.createHash('sha256').update(data).digest('hex')});
}
const license=await fetch('https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/OFL.txt');if(license.ok)await fs.writeFile(path.join(directory,'fonts/OFL.txt'),await license.text());
await fs.writeFile(path.join(directory,'fonts/provenance.json'),JSON.stringify(records,null,2));
console.log(JSON.stringify({projects:names.reduce((n,r)=>n+r.oldSlugs.length,0),uniqueNames:names.length,selectedAssets:rows.length}));
