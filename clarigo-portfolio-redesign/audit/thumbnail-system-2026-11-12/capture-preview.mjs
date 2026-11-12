import {chromium} from '@playwright/test';
const dir='audit/thumbnail-system-2026-11-12',browser=await chromium.launch({channel:'chrome',headless:true});try{
 for(const[label,width,height]of[['desktop',1440,1100],['mobile',390,844]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});await page.goto('http://127.0.0.1:3100/#portfolio');await page.evaluate(()=>document.fonts.ready);
  await page.locator('.projectArt img').evaluateAll(images=>Promise.all(images.map(async i=>{i.loading='eager';await i.decode();})));
  await page.locator('#portfolio').scrollIntoViewIfNeeded();await page.screenshot({path:dir+'/'+label+'-web-cards.png'});
  await page.getByRole('button',{name:/Mobile apps/}).click();await page.locator('.projectArt img').evaluateAll(images=>Promise.all(images.map(i=>i.decode())));await page.locator('.projectCard').first().scrollIntoViewIfNeeded();await page.screenshot({path:dir+'/'+label+'-mobile-cards.png'});await page.close();
 }
 const detail=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});await detail.goto('http://127.0.0.1:3100/portfolio/umeed');await detail.locator('.relatedSection').scrollIntoViewIfNeeded();await detail.locator('.relatedImage img').evaluateAll(images=>Promise.all(images.map(i=>i.decode())));await detail.locator('.relatedSection').screenshot({path:dir+'/related-thumbnails.png'});await detail.close();
}finally{await browser.close();}console.log('Captured desktop/mobile Web and Mobile card views, plus related-project thumbnails.');

