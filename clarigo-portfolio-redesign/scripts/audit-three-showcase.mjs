import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const directory=process.env.SHOWCASE_AUDIT_DIR||'audit/portfolio-showcase',base=process.env.SHOWCASE_BASE_URL||'http://127.0.0.1:3100';
await fs.mkdir(directory,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true}),results=[];
try{
 for(const width of [1440,1195,768,390]){
  const context=await browser.newContext({viewport:{width,height:900},hasTouch:width<=768,isMobile:width<500}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error'&&/THREE|WebGL|shader/i.test(message.text()))errors.push(message.text());});
  await page.goto(base+'/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  await page.waitForFunction(()=>document.documentElement.dataset.heroTimeline==='complete'&&[...document.querySelectorAll('.heroCount')].every(el=>el.dataset.countState==='complete'));
  if(width>700)await page.waitForFunction(()=>document.querySelector('.portfolioWebgl')?.dataset.assets==='ready'&&document.querySelector('[data-hero-webgl-view]')?.dataset.renderer==='three',null,{timeout:30000});
  const hero=await page.locator('.heroSection').boundingBox();await page.screenshot({path:directory+'/hero-'+width+'.png',clip:{x:0,y:0,width,height:Math.ceil(hero.y+hero.height)}});
  const result={width,errors,engine:await page.locator('.portfolioWebgl').evaluate(el=>({...el.dataset})),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)};
  if(width===1440){
   result.context=await page.locator('.portfolioWebgl').evaluate(canvas=>{const gl=canvas.getContext('webgl2');return gl?{version:gl.getParameter(gl.VERSION),renderer:gl.getParameter(gl.RENDERER),antialias:gl.getContextAttributes().antialias}:null;});
   const box=await page.locator('[data-hero-webgl-view]').boundingBox();await page.mouse.move(box.x+box.width*.48,box.y+box.height*.48);await page.waitForTimeout(800);
   result.hover=await page.locator('.portfolioWebgl').evaluate(el=>({...el.dataset}));await page.screenshot({path:directory+'/hover-hero.png',clip:{x:0,y:0,width,height:Math.ceil(hero.y+hero.height)}});
   const frames=await page.evaluate(()=>new Promise(resolve=>{const values=[];let previous=0,start=0;function frame(now){if(!start)start=now;if(previous)values.push(now-previous);previous=now;if(now-start<2400)requestAnimationFrame(frame);else resolve(values);}requestAnimationFrame(frame);}));
   frames.sort((a,b)=>a-b);result.performance={samples:frames.length,medianFrameMs:frames[Math.floor(frames.length*.5)],p95FrameMs:frames[Math.floor(frames.length*.95)],framesOver32Ms:frames.filter(ms=>ms>32).length};
   const card=page.locator('.projectLink').first();await card.scrollIntoViewIfNeeded();await page.waitForFunction(()=>getComputedStyle(document.querySelector('.projectEntrance')).opacity==='1');await card.hover();await page.waitForTimeout(650);
   result.card=await page.locator('.portfolioWebgl').evaluate(el=>({...el.dataset}));await card.screenshot({path:directory+'/card-hover.png'});
  }
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.documentElement.dataset.motion==='reduced');
  if(width>700)await page.waitForFunction(()=>document.querySelector('.portfolioWebgl').dataset.state==='reduced');
  result.reduced=await page.locator('.portfolioWebgl').evaluate(el=>({...el.dataset}));results.push(result);await context.close();
 }
}finally{await browser.close();}
await fs.writeFile(directory+'/visual-verification.json',JSON.stringify({base,results},null,2));console.log(JSON.stringify(results));
if(results.some(result=>result.errors.length||result.overflow))process.exitCode=1;
