import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const directory='audit/motion/reference';await fs.mkdir(directory,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('https://clarigoinfotech.com/',{waitUntil:'domcontentloaded'});
const assets=await page.evaluate(()=>({scripts:[...document.scripts].map(s=>s.src).filter(Boolean),styles:[...document.querySelectorAll('link[rel="stylesheet"]')].map(s=>s.href)}));
await fs.writeFile(directory+'/page.html',await page.content());
for(const [index,url]of [...assets.styles,...assets.scripts].entries()){
 try{const response=await context.request.get(url);if(response.ok())await fs.writeFile(directory+'/'+index+(assets.styles.includes(url)?'.css':'.js'),await response.text());}catch{}
}
await page.evaluate(()=>document.fonts.ready);
const sample=async label=>({label,...await page.evaluate(()=>{
 const heading=document.querySelector('h1'),style=heading&&getComputedStyle(heading);
 return{scrollY,heading:heading?{html:heading.outerHTML,font:style.fontFamily,size:style.fontSize,weight:style.fontWeight,tracking:style.letterSpacing,lineHeight:style.lineHeight}:null,
 animations:document.getAnimations().slice(0,40).map(a=>({target:a.effect?.target?.className,timing:a.effect?.getTiming(),frames:a.effect?.getKeyframes().map(({offset,transform,opacity,clipPath})=>({offset,transform,opacity,clipPath}))})),
 motionNodes:[...document.querySelectorAll('[style*="transform"],[data-aos],.word,.char,.split-word,[data-reveal]')].slice(0,100).map(el=>({tag:el.tagName,class:el.className,text:el.textContent?.slice(0,80),style:el.getAttribute('style')})),
 globals:{gsap:typeof window.gsap,ScrollTrigger:typeof window.ScrollTrigger,lenis:typeof window.lenis},
 };})});
const samples=[await sample('settled hero')];await page.screenshot({path:directory+'/desktop-hero.png'});
const links=await page.locator('a').evaluateAll(els=>els.slice(0,30).map(el=>({text:el.innerText,class:el.className,transition:getComputedStyle(el).transition,transform:getComputedStyle(el).transform})));
for(const top of [850,1700,3000,4600]){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top);await page.waitForTimeout(300);samples.push(await sample('scroll '+top));if(top===1700)await page.screenshot({path:directory+'/desktop-sections.png'});}
await page.setViewportSize({width:390,height:844});await page.goto('https://clarigoinfotech.com/',{waitUntil:'networkidle'});await page.screenshot({path:directory+'/mobile-hero.png'});samples.push(await sample('mobile hero'));
await fs.writeFile(directory+'/observations.json',JSON.stringify({url:page.url(),assets,links,samples,errors},null,2));
console.log(JSON.stringify({scripts:assets.scripts.length,styles:assets.styles.length,samples:samples.length,errors}));await browser.close();
