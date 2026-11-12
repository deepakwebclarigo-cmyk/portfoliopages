import fs from 'node:fs/promises';import {chromium} from '@playwright/test';import sharp from 'sharp';
const dir='audit/umeed-refresh-2026-11-12',base='http://127.0.0.1:3100',assets=JSON.parse(await fs.readFile('lib/project-assets.json','utf8')).umeed,before=JSON.parse(await fs.readFile(dir+'/project-assets.json.before','utf8')).umeed;
const response=await fetch(base+'/portfolio/umeed'),html=await response.text();if(response.status!==200||!html.includes(assets.poster.src))throw Error('Updated hero missing.');
for(const a of[before.poster,...before.images])if(html.includes(a.src))throw Error('Old artwork still published.');
const oldText=/Deep navy surfaces|dark public website|dark, restrained public website/;if(oldText.test(html))throw Error('Older design description still visible.');
let checked=0;for(const a of[assets.poster,...assets.images,{src:assets.poster.src.replace('.webp','-card.webp')},{src:assets.poster.src.replace('.webp','-medium.webp')}]){
 const r=await fetch(base+a.src),buffer=Buffer.from(await r.arrayBuffer());if(r.status!==200)throw Error('Image request failed: '+a.src);await sharp(buffer).stats();checked++;
}
const browser=await chromium.launch({channel:'chrome',headless:true});try{
 for(const[label,width,height]of[['desktop',1440,1000],['mobile',390,844]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  await page.goto(base+'/portfolio/umeed');await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].filter(i=>i.complete).map(i=>i.decode().catch(()=>{})));});
  await page.screenshot({path:dir+'/'+label+'-hero.png'});
  await page.locator('#screens').scrollIntoViewIfNeeded();await page.locator('#screens img').evaluateAll(images=>Promise.all(images.map(i=>i.decode())));
  await page.screenshot({path:dir+'/'+label+'-gallery.png'});
  await page.close();
 }
 const listing=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});await listing.goto(base+'/');await listing.getByRole('searchbox').fill('Umeed');const card=listing.locator('.projectCard').filter({has:listing.locator('.projectLink[href="/portfolio/umeed"]')});await card.scrollIntoViewIfNeeded();await card.locator('img').evaluate(i=>i.decode());await card.screenshot({path:dir+'/portfolio-card.png'});await listing.close();
}finally{await browser.close();}
await fs.writeFile(dir+'/visual-http-verification.json',JSON.stringify({route:'/portfolio/umeed',status:response.status,imageRequestsPassed:checked,oldArtworkReferences:0,outdatedDesignCopy:0,screenshots:['desktop-hero.png','mobile-hero.png','desktop-gallery.png','mobile-gallery.png','portfolio-card.png']},null,2));console.log('Updated Umeed hero and 6 image responses verified; captured desktop, mobile, gallery and card previews.');

