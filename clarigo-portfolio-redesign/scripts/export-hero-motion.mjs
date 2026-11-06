import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, access, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { once } from 'node:events';
import { createHash } from 'node:crypto';
import ts from 'typescript';
import { chromium } from '@playwright/test';

const root = path.resolve(fileURLToPath(new URL('../',import.meta.url)));
const audit = path.join(root,'audit/cinematic-motion');
const preview = process.argv.includes('--preview');
const width = preview ? 1280 : 3840, height = preview ? 720 : 2160, fps = 60, duration = 12;
const output = path.resolve(root,process.env.MOTION_VIDEO_OUTPUT || 'public/videos/clarigo-uiux-4k60.mp4');
if(!output.startsWith(root+path.sep))throw Error('Video output must remain inside this project.');
await mkdir(audit,{recursive:true});
if(!preview){try{await access(output);throw Error('Output already exists; select a new MOTION_VIDEO_OUTPUT path to preserve it.');}catch(error){if(error.code!=='ENOENT')throw error;}await mkdir(path.dirname(output),{recursive:true});}
const source = await readFile(path.join(root,'lib/hero-showcase-scene.ts'),'utf8');
const sceneJS = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const config = {width,height,fps,duration};
const html = `<!doctype html><html><head><link rel="icon" href="data:,"><style>@font-face{font-family:Geist;src:url('/fonts/geist.woff2') format('woff2');font-weight:100 900}html,body{margin:0;overflow:hidden;background:#f5f1fc}canvas{display:block;width:100vw;height:100vh}</style><script type="importmap">{"imports":{"three":"/vendor/three/three.module.js","three/addons/":"/vendor/addons/","gsap":"/vendor/gsap/index.js"}}</script></head><body><canvas></canvas><script>window.exportConfig=${JSON.stringify(config)}</script><script type="module" src="/renderer.js"></script></body></html>`;
const server = createServer(async(req,res)=>{
  try{
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(pathname==='/'){res.writeHead(200,{'Content-Type':'text/html'});res.end(html);return;}
    if(pathname==='/scene.js'){res.writeHead(200,{'Content-Type':'text/javascript'});res.end(sceneJS);return;}
    const exact = {'/renderer.js':'scripts/cinematic-renderer.mjs','/fonts/geist.woff2':'public/fonts/geist-9b6f5ff45b.woff2'};
    const prefixes = [['/vendor/three/','node_modules/three/build/'],['/vendor/addons/','node_modules/three/examples/jsm/'],['/vendor/gsap/','node_modules/gsap/']];
    let relative = exact[pathname];
    for(const [prefix,directory] of prefixes)if(pathname.startsWith(prefix))relative=directory+pathname.slice(prefix.length);
    if(!relative)throw Error('Unknown export resource');
    const file=path.resolve(root,relative);if(!file.startsWith(root+path.sep))throw Error('Invalid resource');
    res.writeHead(200,{'Content-Type':file.endsWith('.woff2')?'font/woff2':'text/javascript'});res.end(await readFile(file));
  }catch{res.writeHead(404);res.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser = await chromium.launch({channel:'chrome',headless:true});
let encoder, stderr='', proof;
const frames=[];
try{
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  await page.goto('http://127.0.0.1:'+server.address().port+'/');
  await page.waitForFunction(()=>window.motionReady,null,{timeout:120000});
  proof=await page.evaluate(()=>window.exportProof);
  if(errors.length)throw Error(errors.join('\n'));
  console.log(JSON.stringify({stage:'scene-ready',preview,...proof}));
  if(preview){
    for(const seconds of [0,.35,1.1,2,3.2,4.4,8,11.983333]){
      const state=await page.evaluate(time=>window.renderFrame(time),seconds);frames.push(state);
      await page.screenshot({path:path.join(audit,'preview-'+seconds.toFixed(2)+'.png')});
      console.log(JSON.stringify(state));
    }
  }else{
    const temporary=path.join(audit,'render-'+Date.now()+'.mp4');
    encoder=spawn(path.join(audit,'tools/ffmpeg.exe'),['-n','-hide_banner','-loglevel','warning','-f','image2pipe','-framerate',String(fps),'-i','pipe:0','-an','-vf','scale=in_range=full:out_range=tv:out_color_matrix=bt709','-c:v','libx264','-preset','medium','-crf','16','-threads','4','-pix_fmt','yuv420p','-profile:v','high','-level:v','5.2','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-movflags','+faststart',temporary],{windowsHide:true,stdio:['pipe','ignore','pipe']});
    encoder.stderr.on('data',data=>{stderr=(stderr+data.toString()).slice(-16000);});
    let pipeError;encoder.stdin.on('error',error=>{pipeError=error;});
    for(let frame=0;frame<duration*fps;frame++){
      if(pipeError||encoder.exitCode!==null)throw Error(stderr||pipeError?.message||'Encoder stopped');
      const state=await page.evaluate(time=>window.renderFrame(time),frame/fps);
      const png=await page.screenshot({type:'png'});
      if(!encoder.stdin.write(png))await once(encoder.stdin,'drain');
      if(frame%60===0){frames.push(state);console.log(JSON.stringify({stage:'render',frame,total:duration*fps,...state}));}
    }
    encoder.stdin.end();const code=encoder.exitCode??(await once(encoder,'close'))[0];if(code!==0)throw Error(stderr||'Encoding failed');
    const execute=promisify(execFile);
    const {stdout}=await execute(path.join(audit,'tools/ffprobe.exe'),['-v','error','-show_entries','stream=codec_name,width,height,r_frame_rate,avg_frame_rate,nb_frames,pix_fmt,color_space,color_transfer,color_primaries','-show_entries','format=duration,size','-of','json',temporary]);
    const metadata=JSON.parse(stdout),video=metadata.streams[0];
    if(video.width!==3840||video.height!==2160||video.avg_frame_rate!=='60/1'||Number(video.nb_frames)!==720||Math.abs(Number(metadata.format.duration)-12)>.02)throw Error('Video format verification failed: '+stdout);
    await execute(path.join(audit,'tools/ffmpeg.exe'),['-v','error','-i',temporary,'-f','null','-'],{maxBuffer:1024*1024});
    await rename(temporary,output);
    await execute(path.join(audit,'tools/ffmpeg.exe'),['-n','-hide_banner','-loglevel','error','-ss','6','-i',output,'-frames:v','1',output.replace('.mp4','-poster.png')]);
    proof={...proof,...metadata,output,sha256:createHash('sha256').update(await readFile(output)).digest('hex')};
    console.log(JSON.stringify({stage:'verified-video',...metadata,output}));
  }
  if(errors.length)throw Error(errors.join('\n'));
}finally{
  if(encoder&&encoder.exitCode===null)encoder.kill();
  await browser.close();await new Promise(resolve=>server.close(resolve));
  await writeFile(path.join(audit,preview?'preview-verification.json':'video-verification.json'),JSON.stringify({config,proof,frames,sceneSha256:createHash('sha256').update(source).digest('hex'),encoderLog:stderr},null,2));
}
