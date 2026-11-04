import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const directory='audit/hero-redesign';
const baseline=JSON.parse(await fs.readFile('audit/motion/hero-layout-before.json','utf8')),layoutDifferences=[];
const browser=await chromium.launch({channel:'chrome',headless:true}),results=[];
try {
 for(const width of [1440,1195,768,390]) {
  const context=await browser.newContext({viewport:{width,height:900},isMobile:width<500,hasTouch:width<=768});
  const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:3100/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  await page.waitForFunction(()=>document.documentElement.dataset.heroTimeline==='complete');
  await page.waitForFunction(()=>[...document.querySelectorAll('.heroCount')].every(counter=>counter.dataset.countState==='complete'));
  if(width>700)await page.waitForFunction(()=>[...document.querySelectorAll('.heroLayerEntrance')].every(layer=>getComputedStyle(layer).opacity==='1'&&new DOMMatrixReadOnly(getComputedStyle(layer).transform).isIdentity));
  const hero=await page.locator('.heroSection').boundingBox();
  const before=baseline.find(item=>item.width===width);
  const geometry=await page.evaluate(selectors=>Object.fromEntries(selectors.map(selector=>{const element=document.querySelector(selector),box=element.getBoundingClientRect(),style=getComputedStyle(element);return[selector,{x:box.x,y:box.y,width:box.width,height:box.height,fontSize:style.fontSize,fontWeight:style.fontWeight,letterSpacing:style.letterSpacing,lineHeight:style.lineHeight,color:style.color,text:element.textContent.replace(/\s+/g,' ').trim()}];})),Object.keys(before.geometry));
  for(const[selector,values]of Object.entries(geometry))for(const[key,value]of Object.entries(values)){const original=before.geometry[selector][key];if(typeof value==='number'?Math.abs(value-original)>.125:value!==original)layoutDifferences.push({width,selector,key,before:original,after:value});}
  await page.screenshot({path:directory+'/hero-'+width+'.png',clip:{x:0,y:0,width,height:Math.ceil(hero.y+hero.height)}});
  let performance=null;
  if(width===1440){
   const sampling=page.evaluate(()=>new Promise(resolve=>{const intervals=[];let previous=0,start=0;function frame(now){if(!start)start=now;if(previous)intervals.push(now-previous);previous=now;if(now-start<2400)requestAnimationFrame(frame);else resolve(intervals);}requestAnimationFrame(frame);}));
   for(let step=0;step<12;step++){await page.mouse.move(width*(.62+Math.sin(step*.5)*.24),180+Math.cos(step*.5)*80);await page.waitForTimeout(100);}
   const frames=(await sampling).sort((a,b)=>a-b);performance={samples:frames.length,medianFrameMs:frames[Math.floor(frames.length*.5)],p95FrameMs:frames[Math.floor(frames.length*.95)],framesOver32Ms:frames.filter(ms=>ms>32).length};
  }
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.documentElement.dataset.motion==='reduced'&&document.querySelector('.heroAmbient')?.dataset.ambientState==='static');
  await page.waitForFunction(()=>[...document.querySelectorAll('.heroSculpture,.heroLayerEntrance')].every(node=>getComputedStyle(node).opacity==='1'&&getComputedStyle(node).transform==='none'));
  const reduced=await page.locator('.heroSculpture,.heroLayerEntrance').evaluateAll(nodes=>nodes.every(node=>getComputedStyle(node).opacity==='1'&&getComputedStyle(node).transform==='none'));
  results.push({width,errors,performance,reducedStatic:reduced,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)});
  await context.close();
 }
}finally{await browser.close();}
await fs.writeFile(directory+'/visual-verification.json',JSON.stringify({environment:'Local installed headless Chrome; frame timing includes active hero motion and mouse movement.',results},null,2));
await fs.writeFile(directory+'/layout-verification.json',JSON.stringify({viewports:results.length,selectorsPerViewport:14,differences:layoutDifferences},null,2));
console.log(JSON.stringify({results,layoutDifferences}));
if(layoutDifferences.length||results.some(result=>result.errors.length||result.overflow||!result.reducedStatic))process.exitCode=1;
