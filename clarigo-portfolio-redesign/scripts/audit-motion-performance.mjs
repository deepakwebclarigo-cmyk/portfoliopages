import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
await fs.mkdir('audit/motion/preview',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true}),results=[];
try { for(const[label,route,width,height]of [['listing','/',1440,1000],['web','/portfolio/livsocial',1440,1000],['mobile-app','/portfolio/app-habitstride',1440,1000],['phone-listing','/',390,844],['phone-web','/portfolio/streamdexa',390,844],['phone-app','/portfolio/app-infiscribe',390,844]]){
 const context=await browser.newContext({viewport:{width,height},isMobile:width<500,hasTouch:width<500}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:3100'+route,{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>document.documentElement.dataset.motion==='full');
 await page.waitForFunction(()=>[...document.querySelectorAll('.motionWord')].every(word=>{const style=getComputedStyle(word);return style.opacity==='1'&&new DOMMatrixReadOnly(style.transform).isIdentity;})&&[...document.querySelectorAll('.heroCount')].every(counter=>counter.dataset.countState==='complete'));
 await page.screenshot({path:'audit/motion/preview/'+label+'-hero.png'});
 const result=await page.evaluate(()=>new Promise(resolve=>{
  const samples=[],tasks=[];let previous=performance.now(),start=previous;
  const observer=new PerformanceObserver(list=>tasks.push(...list.getEntries().map(entry=>({start:entry.startTime,duration:entry.duration}))));
  try{observer.observe({type:'longtask',buffered:false});}catch{}
  const max=Math.min(1900,document.documentElement.scrollHeight-innerHeight);
  function frame(now){samples.push(now-previous);previous=now;scrollTo({top:max*Math.min(1,(now-start)/2800),behavior:'instant'});
   if(now-start<3200)requestAnimationFrame(frame);else{observer.disconnect();resolve({frames:samples.length,samples,tasks,scrollY,motion:document.documentElement.dataset.motion,parallaxFrames:document.querySelectorAll('[data-motion-parallax]').length,depthEnabled:[...document.querySelectorAll('[data-depth-enabled="true"]')].length});}}
  requestAnimationFrame(frame);
 }));
 const frames=result.samples.slice(1).sort((a,b)=>a-b),percentile=p=>frames[Math.min(frames.length-1,Math.floor(frames.length*p))];
 results.push({label,route,viewport:{width,height},medianFrameMs:percentile(.5),p95FrameMs:percentile(.95),medianFps:1000/percentile(.5),framesOver32Ms:frames.filter(ms=>ms>32).length,frameSamples:result.frames,longTasks:result.tasks,parallaxFrames:result.parallaxFrames,depthEnabled:result.depthEnabled,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),errors});
 await page.screenshot({path:'audit/motion/preview/'+label+'-scroll.png'});
 if(label.includes('listing')){
  const card=page.locator('.projectCard:has(.projectLink[href="/portfolio/tukioconnect"])');
  await card.scrollIntoViewIfNeeded();await page.waitForFunction(()=>{const element=document.querySelector('.projectLink[href="/portfolio/tukioconnect"]')?.closest('.projectEntrance');return element&&getComputedStyle(element).opacity==='1';});
  if(width>1000){await card.hover();await page.waitForTimeout(600);}
  results.at(-1).circularCardOverlays=await page.locator('.projectOpen').count();
  await card.screenshot({path:'audit/motion/preview/'+label+'-card-without-overlay.png'});
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.documentElement.dataset.motion==='reduced');
 results.at(-1).reducedMotion={pending:await page.locator('[data-motion-reveal="pending"]').count(),depth:await page.locator('[data-depth-enabled="true"]').count(),runningAnimations:await page.evaluate(()=>document.getAnimations().filter(animation=>animation.playState==='running').length)};
 console.log(JSON.stringify(results.at(-1)));await context.close();
} } finally { await browser.close(); }
await fs.writeFile('audit/motion/performance.json',JSON.stringify({environment:'Local headless installed Chrome; sequential 3.2-second real requestAnimationFrame scroll samples. Results describe this machine, not a guarantee for other hardware.',results},null,2));
if(results.some(result=>result.overflow||result.errors.length||result.reducedMotion.pending||result.reducedMotion.depth))process.exitCode=1;
