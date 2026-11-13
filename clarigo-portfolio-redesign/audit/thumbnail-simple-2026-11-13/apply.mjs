import fs from 'node:fs/promises';
const dir='audit/thumbnail-simple-2026-11-13';await fs.mkdir(dir+'/before',{recursive:true});
for(const f of ['components/PortfolioWebGL.tsx','lib/motion-webgl.ts','app/motion.css','components/ScrollMotion.tsx','lib/project-assets.json','lib/project-thumbnails.json','lib/project-themes.json'])await fs.writeFile(dir+'/before/'+f.replaceAll('/','__')+'.before',await fs.readFile(f),{flag:'wx'});
let webgl=await fs.readFile('components/PortfolioWebGL.tsx','utf8');webgl=webgl.replace("event.target.closest('.projectLink,.relatedCard,.caseVisual')", "event.target.closest('.caseVisual')");await fs.writeFile('components/PortfolioWebGL.tsx',webgl);
let scene=await fs.readFile('lib/motion-webgl.ts','utf8');scene=scene.replace("target.closest<HTMLElement>('.projectLink,.relatedCard,.caseVisual')", "target.closest<HTMLElement>('.caseVisual')");scene=scene.replace("initialPointer.target.closest('.projectLink,.relatedCard,.caseVisual')", "initialPointer.target.closest('.caseVisual')");await fs.writeFile('lib/motion-webgl.ts',scene);
let scroll=await fs.readFile('components/ScrollMotion.tsx','utf8');const old="        register(select('.projectEntrance'));";if(!scroll.includes(old))throw Error('Missing listing animation anchor');scroll=scroll.replace(old,"        // Listing cards use a brief CSS fade and subtle hover lift only.\n        // Keep their native artwork out of scroll transforms and image masks.\n        select('.projectEntrance').forEach(element => { completed.add(element); element.dataset.motionReveal = 'revealed'; });");await fs.writeFile('components/ScrollMotion.tsx',scroll);
let css=await fs.readFile('app/motion.css','utf8');css=css.replace("  .projectArt .visual img, .relatedImage .visual img, .caseVisual .visual img { transform: scale(.955) !important; }", "  .caseVisual .visual img { transform: scale(.955) !important; }");css=css.replace("  .projectLink:active, .galleryOpen:active .galleryExpand { transform: scale(.995); }", "  .galleryOpen:active .galleryExpand { transform: scale(.995); }");
const begin=css.indexOf('\n@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {\n  .projectLink { transition-property:');if(begin>=0)css=css.slice(0,begin);
css+=`\n/* Thumbnail artwork stays native, fully visible, and stationary inside each card. */
.projectArt .visual img, .relatedImage .visual img {
  transform: none !important; opacity: 1 !important;
  transition: none !important; animation: none !important; will-change: auto !important;
}
@keyframes thumbnailFadeIn { from { opacity: .8; } to { opacity: 1; } }
@media (prefers-reduced-motion: no-preference) {
  .projectEntrance { animation: thumbnailFadeIn .25s ease-out both; }
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .projectLink, .relatedCard { transition: transform .24s ease-out, border-color .24s ease-out, box-shadow .24s ease-out; }
  .projectLink:hover, .relatedCard:hover { transform: translateY(-2px); }
  .projectLink:active { transform: translateY(0); }
  .projectArrow { transition: color .24s ease-out, background-color .24s ease-out, border-color .24s ease-out; }
  .relatedCard:hover>svg { transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .projectEntrance { animation: none !important; }
  .projectLink, .relatedCard { transition: none !important; transform: none !important; }
}\n`;
await fs.writeFile('app/motion.css',css);
console.log('Removed all thumbnail GPU interactions, image transforms, image handoffs and scroll transforms. Only a short fade and 2px card lift remain.');
