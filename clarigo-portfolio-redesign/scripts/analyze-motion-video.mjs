import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import sharp from 'sharp';
const source='C:/Users/lenovo/Downloads/WhatsApp Video 2026-11-03 at 6.59.00 PM.mp4';
const output='audit/video-motion';
await fs.mkdir(output+'/frames',{recursive:true});
const bytes=await fs.readFile(source),browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();
 await page.route('http://motion-reference.local/**',route=>route.fulfill(route.request().url().endsWith('.mp4')?{contentType:'video/mp4',body:bytes}:{contentType:'text/html',body:'<!doctype html><html><body style="margin:0;background:#111"><video preload="auto" src="/reference.mp4" style="max-width:100%;max-height:100vh"></video></body></html>'}));
 await page.goto('http://motion-reference.local/');
 const metadata=await page.locator('video').evaluate(video=>new Promise((resolve,reject)=>{const done=()=>resolve({duration:video.duration,width:video.videoWidth,height:video.videoHeight});if(video.readyState>=2)done();else{video.addEventListener('loadeddata',done,{once:true});video.addEventListener('error',()=>reject(new Error(video.error?.message||'Cannot decode reference video')),{once:true});}}));
 console.log(JSON.stringify(metadata));
 const times=Array.from({length:Math.ceil(metadata.duration)},(_,index)=>index);
 const frames=[];
 for(const time of times){
  const data=await page.locator('video').evaluate(async(video,time)=>{video.pause();if(Math.abs(video.currentTime-time)>.001)await new Promise(resolve=>{video.addEventListener('seeked',resolve,{once:true});video.currentTime=time;});const canvas=document.createElement('canvas');canvas.width=video.videoWidth;canvas.height=video.videoHeight;canvas.getContext('2d').drawImage(video,0,0);return canvas.toDataURL('image/png').split(',')[1];},time);
  const path=output+'/frames/'+time.toFixed(2)+'.png';await fs.writeFile(path,Buffer.from(data,'base64'));frames.push({time,path});
 }
 const tileWidth=420,tileHeight=Math.round(tileWidth*metadata.height/metadata.width)+30,columns=3,layers=[];
 for(const [index,frame]of frames.entries()){
  const left=index%columns*tileWidth,top=Math.floor(index/columns)*tileHeight;
  layers.push({input:await sharp(frame.path).resize(tileWidth,tileHeight-30,{fit:'contain',background:'#111'}).png().toBuffer(),left,top:top+30});
  layers.push({input:Buffer.from(`<svg width="${tileWidth}" height="30"><text x="12" y="22" fill="white" font-family="Arial" font-size="16">${frame.time.toFixed(2)}s</text></svg>`),left,top});
 }
 await sharp({create:{width:tileWidth*columns,height:Math.ceil(frames.length/columns)*tileHeight,channels:3,background:'#111'}}).composite(layers).png().toFile(output+'/contact-sheet.png');
 await fs.writeFile(output+'/reference.json',JSON.stringify({source,bytes:bytes.length,...metadata,frames},null,2));
 console.log(JSON.stringify({frames:frames.length,contactSheet:output+'/contact-sheet.png'}));
}finally{await browser.close();}
