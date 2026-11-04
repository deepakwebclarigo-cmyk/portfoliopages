import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const inventory=JSON.parse(await fs.readFile('lib/project-inventory.json','utf8')).filter(p=>p.rebranded);
await fs.mkdir('audit/rebrand/screenshots',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true}),report=[];
for(const[name,width,height]of [['desktop',1440,1000],['mobile',390,844]]){
 const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'}),page=await context.newPage();
 let errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const project of inventory){
  errors=[];const response=await page.goto('http://127.0.0.1:3100/portfolio/'+project.slug);
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('.caseVisual img').evaluate(img=>img.decode());
  await page.locator('.caseHero').screenshot({path:`audit/rebrand/screenshots/${name}-${project.slug}-hero.png`,animations:'disabled'});
  await page.locator('#screens').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.locator('#screens img').evaluateAll(images=>Promise.all(images.map(image=>{image.loading='eager';return image.decode();})));
  await page.screenshot({path:`audit/rebrand/screenshots/${name}-${project.slug}-gallery.png`,animations:'disabled'});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  report.push({viewport:name,slug:project.slug,name:project.name,status:response.status(),overflow,errors:[...errors]});
  console.log(name+' '+project.slug+' '+response.status()+' '+(overflow?'OVERFLOW':'OK'));
 }await context.close();
}await browser.close();await fs.writeFile('audit/rebrand/visual-verification.json',JSON.stringify(report,null,2));if(report.some(r=>r.status!==200||r.overflow||r.errors.length))process.exitCode=1;
