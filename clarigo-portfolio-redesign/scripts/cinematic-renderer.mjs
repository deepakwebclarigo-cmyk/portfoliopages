import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { createHeroShowcase, updateShowcaseCamera } from '/scene.js';

const { width, height } = window.exportConfig;
await document.fonts.load('500 140px Geist');
await document.fonts.ready;
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas'), antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(1); renderer.setSize(width, height, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping; renderer.toneMappingExposure = .9;
renderer.transmissionResolutionScale = .75; renderer.info.autoReset = false;
const scene = new THREE.Scene();
const background = document.createElement('canvas'); background.width = 1024; background.height = 576;
const ctx = background.getContext('2d');
ctx.fillStyle = '#f5f1fc'; ctx.fillRect(0, 0, 1024, 576);
for (const [x,y,r,color] of [[300,170,470,'rgba(222,211,251,.55)'],[740,380,420,'rgba(247,197,215,.45)'],[520,100,390,'rgba(255,255,255,.75)']]) {
  const gradient = ctx.createRadialGradient(x,y,0,x,y,r); gradient.addColorStop(0,color); gradient.addColorStop(1,'rgba(255,255,255,0)'); ctx.fillStyle=gradient;ctx.fillRect(0,0,1024,576);
}
const backgroundTexture = new THREE.CanvasTexture(background); backgroundTexture.colorSpace = THREE.SRGBColorSpace; scene.background = backgroundTexture;
const pmrem = new THREE.PMREMGenerator(renderer), room = new RoomEnvironment();
const environment = pmrem.fromScene(room,.04); scene.environment = environment.texture; scene.environmentIntensity = .55; room.dispose(); pmrem.dispose();
scene.add(new THREE.HemisphereLight(0xffffff,0xe7ddeb,.9));
const key = new THREE.DirectionalLight(0xffffff,2); key.position.set(-4,7,5); scene.add(key);
const fill = new THREE.DirectionalLight(0xffd7e3,.6); fill.position.set(4,2,-4); scene.add(fill);
const camera = new THREE.PerspectiveCamera(30,width/height,.1,40);
const showcase = createHeroShowcase({ detail: 12 }); scene.add(showcase.group);
const composer = new EffectComposer(renderer); composer.setSize(width,height);
const samples = Math.min(width>1920?2:4,renderer.capabilities.maxSamples);
composer.renderTarget1.samples = samples; composer.renderTarget2.samples = samples;
composer.addPass(new RenderPass(scene,camera));
let seed = 20261106; const random = Math.random;
Math.random = () => { seed = (1664525*seed+1013904223)>>>0; return seed/4294967296; };
const ao = new SSAOPass(scene,camera,width,height,16); Math.random = random;
ao.kernelRadius = .22; ao.minDistance = .0003; ao.maxDistance = .018;
ao.copyMaterial.fragmentShader = ao.copyMaterial.fragmentShader.replace('gl_FragColor = opacity * texel;', 'gl_FragColor = vec4(mix(vec3(1.0), texel.rgb, 0.18), 1.0);');
composer.addPass(ao);
const bokeh = new BokehPass(scene,camera,{focus:8.4,aperture:.001,maxblur:.0015}); composer.addPass(bokeh);
composer.addPass(new OutputPass());
window.renderFrame = seconds => {
  const progress = Math.min(1,Math.max(0,seconds/showcase.entranceDuration));
  showcase.pose(seconds,progress); updateShowcaseCamera(camera,seconds,progress);
  bokeh.uniforms.focus.value = camera.position.distanceTo(new THREE.Vector3(0,.02,0));
  renderer.info.reset(); composer.render(1/60);
  return { seconds, visiblePanels: showcase.items.filter(item=>item.object.children[0].visible).length, drawCalls:renderer.info.render.calls, triangles:renderer.info.render.triangles };
};
// Warm all materials/post-process programs, then rewind before frame zero.
window.renderFrame(6); window.renderFrame(0);
window.exportProof = { version:renderer.getContext().getParameter(renderer.getContext().VERSION), width,height,panels:showcase.items.length,entranceSeconds:showcase.entranceDuration,ambientOcclusion:'SSAO 16 samples',depthOfField:'depth-aware bokeh',source:'lib/hero-showcase-scene.ts' };
window.motionReady = true;
