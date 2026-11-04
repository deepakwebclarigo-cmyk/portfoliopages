import { chromium } from '@playwright/test';
const browser = await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto('http://127.0.0.1:3100/',{waitUntil:'networkidle'});
 await page.waitForTimeout(2500);
 console.log(JSON.stringify(await page.evaluate(()=>({root:document.documentElement.dataset,counts:[...document.querySelectorAll('.heroCount')].map(el=>({text:el.textContent,state:el.dataset.countState})),words:[...document.querySelectorAll('.motionWord')].map(el=>({text:el.textContent,transform:getComputedStyle(el).transform,animation:getComputedStyle(el).animationName,revealed:el.hasAttribute('data-word-revealed')})),ambient:document.querySelector('.heroAmbient')?.dataset})),null,2));
 await page.screenshot({path:'audit/motion/hero-current.png'});
} finally { await browser.close(); }
