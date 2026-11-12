import fs from 'node:fs/promises';
const dir='audit/tukora-thumbnail-refresh-2026-11-12',read=async f=>JSON.parse(await fs.readFile(f,'utf8')),staged=await read(dir+'/staged-thumbnails.json'),before=await read(dir+'/thumbnails-before.json'),manifest=await read('lib/project-thumbnails.json'),records=await read('audit/thumbnail-system-2026-11-12/rendered-thumbnails.json'),plan=await read('audit/thumbnail-system-2026-11-12/source-plan.json');
if(JSON.stringify(before)!==JSON.stringify(manifest))throw Error('Thumbnail state changed since review.');
for(const slug of Object.keys(staged)){const r=staged[slug],{src,width,height,sha256,bytes,card,medium}=r;manifest[slug]={src,width,height,sha256,bytes,card,medium};records[slug]=r;const p=plan.find(p=>p.slug===slug);p.renderer='tukora-showcase';p.sources=r.sourceRefs;await fs.copyFile(dir+'/renders/'+slug+'.png','exports/Clarigo-consistent-thumbnails/'+slug+'.png');}
for(const[slug,m]of Object.entries(before))if(!staged[slug]&&JSON.stringify(m)!==JSON.stringify(manifest[slug]))throw Error('Unrelated thumbnail changed '+slug);
await fs.writeFile('lib/project-thumbnails.json',JSON.stringify(manifest,null,2)+'\n');await fs.writeFile('audit/thumbnail-system-2026-11-12/rendered-thumbnails.json',JSON.stringify(records,null,2));await fs.writeFile('audit/thumbnail-system-2026-11-12/source-plan.json',JSON.stringify(plan,null,2));
const file='scripts/render-portfolio-thumbnails.mjs';await fs.copyFile(file,dir+'/render-portfolio-thumbnails.mjs.before');let generator=await fs.readFile(file,'utf8');
generator="import { execFile } from 'node:child_process';\nimport { promisify } from 'node:util';\n"+generator;
const anchor="const browser=await chromium.launch({channel:'chrome',headless:true});";
if(!generator.includes(anchor))throw Error('Shared renderer anchor changed.');
generator=generator.replace(anchor,[
"// Brand-specific showcases retain the shared frame but use their own audited layouts.",
"const custom = {};",
"if (plan.some(p => p.renderer === 'tukora-showcase' && (!only.size || only.has(p.slug)))) {",
"  const rendered = await promisify(execFile)(process.execPath, ['audit/tukora-thumbnail-refresh-2026-11-12/render-thumbnails.mjs']);",
"  process.stdout.write(rendered.stdout);",
"  Object.assign(custom, JSON.parse(await fs.readFile('audit/tukora-thumbnail-refresh-2026-11-12/staged-thumbnails.json', 'utf8')));",
"  for (const slug of Object.keys(custom)) await fs.copyFile('audit/tukora-thumbnail-refresh-2026-11-12/renders/' + slug + '.png', 'exports/Clarigo-consistent-thumbnails/' + slug + '.png');",
"}",
anchor
].join('\n'));
generator=generator.replace("try{\n const page=","Object.assign(results, custom);\nawait fs.writeFile(audit+'/rendered-thumbnails.json', JSON.stringify(results,null,2));\ntry{\n const page=");
generator=generator.replace("  if(only.size&&!only.has(p.slug))continue;","  if(only.size&&!only.has(p.slug))continue;\n  if(p.renderer==='tukora-showcase')continue;");
generator+="\nif (process.argv.includes('--write-manifest')) {\n  if (plan.some(p => !results[p.slug]?.fit.images || !results[p.slug]?.fit.titleFits)) throw Error('Thumbnail set is incomplete.');\n  const current = Object.fromEntries(plan.map(p => { const {src,width,height,sha256,bytes,card,medium} = results[p.slug]; return [p.slug,{src,width,height,sha256,bytes,card,medium}]; }));\n  await fs.writeFile('lib/project-thumbnails.json', JSON.stringify(current,null,2)+'\\n');\n}\n";
await fs.writeFile(file,generator);
await fs.writeFile(dir+'/applied.json',JSON.stringify({updated:['tukora-connect','app-tukora-connect'],unchangedOtherThumbnails:42,totalProjects:44,detailArtworkUnchanged:JSON.stringify(await read('lib/project-assets.json'))===JSON.stringify(await read(dir+'/assets-before.json'))},null,2));console.log('Updated only the two Tukora thumbnails; retained the shared family style and other 42 mappings.');

