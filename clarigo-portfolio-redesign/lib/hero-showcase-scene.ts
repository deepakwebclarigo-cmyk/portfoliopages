import * as THREE from 'three';
import gsap from 'gsap';

function roundedShape(width: number, height: number, radius: number) {
  const x=-width/2,y=-height/2,r=Math.min(radius,width/2,height/2),s=new THREE.Shape();
  s.moveTo(x+r,y);s.lineTo(x+width-r,y);s.quadraticCurveTo(x+width,y,x+width,y+r);s.lineTo(x+width,y+height-r);
  s.quadraticCurveTo(x+width,y+height,x+width-r,y+height);s.lineTo(x+r,y+height);s.quadraticCurveTo(x,y+height,x,y+height-r);
  s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
}

// Original generic UI geometry: no project imagery, logos, websites, or application content.
export function createHeroShowcase({ detail = 6 }: { detail?: number } = {}) {
  const group=new THREE.Group(),picks:THREE.Mesh[]=[],geometries:THREE.BufferGeometry[]=[],materials:THREE.Material[]=[],textures:THREE.Texture[]=[];
  const white=new THREE.MeshPhysicalMaterial({color:'#ffffff',roughness:.3,metalness:.04,clearcoat:.7,clearcoatRoughness:.2});
  const red=new THREE.MeshPhysicalMaterial({color:'#EA1B3D',roughness:.27,metalness:.05,clearcoat:.8,clearcoatRoughness:.18});
  const blush=new THREE.MeshStandardMaterial({color:'#F2B0C0',roughness:.38,metalness:.015});
  const pale=new THREE.MeshStandardMaterial({color:'#FFF5F7',roughness:.42});
  const muted=new THREE.MeshStandardMaterial({color:'#9A939F',roughness:.46});
  const light=new THREE.MeshBasicMaterial({color:'#fffafb',toneMapped:false});
  const glass=new THREE.MeshPhysicalMaterial({color:'#fff7fa',roughness:.25,metalness:0,transmission:.16,transparent:true,opacity:.82,thickness:.07,ior:1.45,clearcoat:.8});
  materials.push(white,red,blush,pale,muted,light,glass);
  const items:{object:THREE.Group;position:THREE.Vector3;rotation:THREE.Euler}[]=[];
  const modules:{object:THREE.Group;position:THREE.Vector3;index:number;entry:{value:number}}[]=[];
  const models:THREE.Group[]=[],dots: { object:THREE.Mesh; index:number; order:number }[]=[];
  const lines: { object:THREE.Mesh; width:number; x:number; index:number; progress:{value:number} }[]=[];
  const masks: { object:THREE.Mesh; height:number; y:number; index:number; progress:{value:number} }[]=[];
  const shaded=new Set<number>();
  function mesh(parent:THREE.Group,geometry:THREE.BufferGeometry,material:THREE.Material,index:number,x=0,y=0,z=0) {
    geometries.push(geometry);const object=new THREE.Mesh(geometry,material);object.position.set(x,y,z);parent.add(object);
    object.userData.showcaseIndex=index;return object;
  }
  function rect(parent:THREE.Group,w:number,h:number,d:number,r:number,material:THREE.Material,index:number,x=0,y=0,z=0) {
    return mesh(parent,new THREE.ExtrudeGeometry(roundedShape(w,h,r),{depth:d,bevelEnabled:true,bevelSize:.009,bevelThickness:.009,bevelSegments:detail>6?3:2,steps:1,curveSegments:detail}),material,index,x,y,z-d/2);
  }
  function disk(parent:THREE.Group,r:number,material:THREE.Material,index:number,x:number,y:number,z:number) {
    const geometry=new THREE.CylinderGeometry(r,r,.025,detail>6?40:20);geometry.rotateX(Math.PI/2);
    return mesh(parent,geometry,material,index,x,y,z);
  }
  function line(parent:THREE.Group,w:number,index:number,x:number,y:number,z:number,material:THREE.Material=muted) {
    const object=rect(parent,w,.035,.018,.017,material,index,x,y,z);
    lines.push({object,width:w,x,index,progress:{value:0}});return object;
  }
  function triangle(parent:THREE.Group,w:number,h:number,material:THREE.Material,index:number,x:number,y:number,z:number) {
    const s=new THREE.Shape();s.moveTo(-w/2,-h/2);s.lineTo(0,h/2);s.lineTo(w/2,-h/2);s.closePath();
    return mesh(parent,new THREE.ExtrudeGeometry(s,{depth:.025,bevelEnabled:true,bevelSize:.009,bevelThickness:.009,bevelSegments:2,steps:1}),material,index,x,y,z);
  }
  function item(position:[number,number,number],rotation:[number,number,number]) {
    const object=new THREE.Group();object.position.set(...position);object.rotation.set(...rotation);group.add(object);
    const model=new THREE.Group();object.add(model);models.push(model);
    items.push({object,position:object.position.clone(),rotation:object.rotation.clone()});return model;
  }
  function body(parent:THREE.Group,w:number,h:number,index:number,material:THREE.Material=white) {
    if(!shaded.has(index)){
      shaded.add(index);
      const canvas=document.createElement('canvas');canvas.width=canvas.height=256;
      const ctx=canvas.getContext('2d')!;ctx.shadowColor='rgba(91,44,81,.22)';ctx.shadowBlur=20;ctx.shadowOffsetY=9;
      ctx.fillStyle='rgba(91,44,81,.12)';ctx.beginPath();ctx.roundRect(35,35,186,186,18);ctx.fill();
      const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;textures.push(texture);
      const shading=new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,toneMapped:false,opacity:.55});materials.push(shading);
      mesh(parent,new THREE.PlaneGeometry(w+.28,h+.28),shading,index,0,-.035,-.075);
    }
    const object=rect(parent,w,h,.09,.11,material,index);picks.push(object);return object;
  }
  function module(parent:THREE.Group,index:number,x:number,y:number,z:number) {
    const object=new THREE.Group();object.position.set(x,y,z);parent.add(object);modules.push({object,position:object.position.clone(),index,entry:{value:0}});return object;
  }
  function imageTile(parent:THREE.Group,w:number,h:number,index:number,x:number,y:number,z:number) {
    rect(parent,w,h,.035,.07,blush,index,x,y,z);
    triangle(parent,w*.52,h*.58,white,index,x-w*.12,y-h*.07,z+.035);
    triangle(parent,w*.35,h*.39,pale,index,x+w*.22,y-h*.16,z+.045);
    disk(parent,w*.065,red,index,x+w*.27,y+h*.23,z+.037);
    const cover=rect(parent,w-.015,h-.015,.006,.06,pale,index,x,y,z+.095);
    masks.push({object:cover,height:h-.015,y,index,progress:{value:0}});
  }
  // Main browser with raised, modular wireframe components.
  const browser=item([-.3,.12,.02],[.07,-.38,-.025]);
  body(browser,3.12,2.43,0);
  const header=new THREE.Group();browser.add(header);
  rect(header,3.1,.28,.035,.105,red,0,0,1.065,.065);
  for(let i=0;i<3;i++)dots.push({object:disk(header,.022,light,0,-1.32+i*.085,1.066,.095),index:0,order:i});
  line(header,.67,0,.04,1.068,.09,blush);
  const preview=module(browser,0,-.65,.35,.08);
  imageTile(preview,1.25,.96,0,0,0,0);
  const copy=module(browser,1,.72,.35,.09);
  line(copy,.9,0,0,.29,.02);line(copy,.76,0,-.07,.12,.02);line(copy,.88,0,-.01,-.05,.02);
  rect(copy,.67,.14,.035,.06,red,0,-.11,-.3,.025);
  for(let i=0;i<3;i++){
    const card=module(browser,2+i,-1.0+i*.99,-.64,.09);
    rect(card,.84,.72,.035,.065,pale,0);
    rect(card,.68,.31,.025,.045,i===1?blush:white,0,0,.11,.026);
    line(card,.58,0,-.04,-.16,.04);line(card,.4,0,-.13,-.27,.04);
  }
  // Mobile frame uses the same abstract design language, with a real bevelled shell.
  const phone=item([1.32,-.22,.62],[.02,.14,.065]);
  body(phone,.98,2.18,1,red).position.z-=.02;
  body(phone,.94,2.15,1).position.z+=.012;
  rect(phone,.81,1.89,.025,.1,pale,1,0,-.02,.067);
  rect(phone,.28,.052,.026,.026,muted,1,0,.98,.083);
  imageTile(phone,.66,.55,1,0,.49,.105);
  line(phone,.61,1,0,.12,.11);line(phone,.4,1,-.105,.005,.11);
  for(let i=0;i<2;i++){
    rect(phone,.65,.26,.025,.045,white,1,0,-.25-i*.31,.105);
    rect(phone,.15,.15,.025,.035,blush,1,-.2,-.25-i*.31,.13);
    line(phone,.25,1,.065,-.22-i*.31,.135);line(phone,.18,1,.03,-.3-i*.31,.135);
  }
  rect(phone,.6,.13,.035,.055,red,1,0,-.81,.11);
  // A small, tilted design-system palette rather than unrelated floating props.
  const palette=item([-.92,-1.2,.62],[-.23,.06,-.055]);
  body(palette,1.56,.69,2);
  [red,blush,pale,white,muted].forEach((material,index)=>dots.push({object:disk(palette,.09,material,2,-.54+index*.27,.105,.075),index:2,order:index}));
  rect(palette,1.13,.055,.025,.025,blush,2,0,-.14,.065);
  const thumb=disk(palette,.055,white,2,-.13,-.14,.095);
  // Typography is a canvas text texture on a 3D plane, using the site's own font.
  const type=item([1.15,1.62,-.12],[.02,-.12,.07]);body(type,.8,.83,3);
  const glyphScale=detail>6?2:1,glyphCanvas=document.createElement('canvas');glyphCanvas.width=256*glyphScale;glyphCanvas.height=220*glyphScale;
  const glyphContext=glyphCanvas.getContext('2d')!;glyphContext.fillStyle='#EA1B3D';glyphContext.font=`500 ${140*glyphScale}px Geist, Arial, sans-serif`;glyphContext.textBaseline='middle';glyphContext.fillText('Aa',20*glyphScale,104*glyphScale);
  const glyphTexture=new THREE.CanvasTexture(glyphCanvas);glyphTexture.colorSpace=THREE.SRGBColorSpace;textures.push(glyphTexture);
  const glyphMaterial=new THREE.MeshBasicMaterial({map:glyphTexture,transparent:true,toneMapped:false,depthWrite:false});materials.push(glyphMaterial);
  mesh(type,new THREE.PlaneGeometry(.65,.56),glyphMaterial,3,0,.065,.07);
  line(type,.48,3,0,-.27,.07,blush);
  // A compact component panel adds a second plane of visual hierarchy.
  const components=item([-1.12,1.53,-.52],[.06,.1,.04]);body(components,1.5,.65,4,glass);
  rect(components,.38,.22,.03,.055,blush,4,-.42,.06,.07);
  line(components,.67,4,.22,.12,.075);line(components,.5,4,.135,-.015,.075);
  rect(components,.3,.095,.025,.045,red,4,.03,-.2,.075);
  // Soft contact shading is a transparent plane inside the Three.js scene.
  const shadowCanvas=document.createElement('canvas');shadowCanvas.width=256;shadowCanvas.height=64;
  const context=shadowCanvas.getContext('2d')!,gradient=context.createRadialGradient(128,32,2,128,32,125);
  gradient.addColorStop(0,'rgba(158,37,71,.15)');gradient.addColorStop(.55,'rgba(158,37,71,.06)');gradient.addColorStop(1,'rgba(158,37,71,0)');
  context.fillStyle=gradient;context.fillRect(0,0,256,64);
  const shadowTexture=new THREE.CanvasTexture(shadowCanvas);shadowTexture.colorSpace=THREE.SRGBColorSpace;textures.push(shadowTexture);
  const shadowMaterial=new THREE.MeshBasicMaterial({map:shadowTexture,transparent:true,depthWrite:false,toneMapped:false});materials.push(shadowMaterial);
  mesh(group,new THREE.PlaneGeometry(4.15,.4),shadowMaterial,-1,0,-1.67,-.9);
  const entrance=gsap.timeline({paused:true});
  const arrivals=[.12,1.95,2.65,2.45,2.15],settle={value:0};
  entrance.set(models,{visible:false},0);
  entrance.set(header,{visible:false},0).set(header,{visible:true},.68);
  models.forEach((model,index)=>{
    const at=arrivals[index],phone=index===1;
    entrance.set(model,{visible:true},at)
      .fromTo(model.position,{x:phone?1.05:index===0?-.28:-.14,y:index===2?-.35:index===0?-.28:.24,z:index===0?-1.1:-.35},{x:0,y:0,z:0,duration:phone?1.35:1.6,ease:phone?'back.out(1.15)':'power3.out'},at)
      .fromTo(model.rotation,{x:index===0?.24:.1,y:index===0?-.56:phone?.32:-.12,z:phone?-.18:index===0?-.08:.09},{x:0,y:0,z:0,duration:1.6,ease:'power3.out'},at)
      .fromTo(model.scale,{x:.9,y:.9,z:.9},{x:1,y:1,z:1,duration:1.2,ease:'back.out(1.05)'},at);
  });
  entrance.fromTo(header.position,{x:-.43},{x:0,duration:1.25,ease:'elastic.out(1,.5)'},.68);
  modules.forEach(({entry,index})=>entrance.to(entry,{value:1,duration:.85,ease:index>1?'back.out(1.15)':'power3.out'},index<2?.35+index*.15:.8+index*.12));
  const orders=new Map<number,number>();
  lines.forEach(line=>{
    const order=orders.get(line.index)||0;orders.set(line.index,order+1);
    entrance.to(line.progress,{value:1,duration:.58,ease:'power3.out'},line.index===0?1.12+order*.075:arrivals[line.index]+.45+order*.065);
  });
  masks.forEach(mask=>entrance.to(mask.progress,{value:1,duration:.85,ease:'power2.inOut'},mask.index===0?.95:2.32));
  dots.forEach(dot=>entrance.fromTo(dot.object.scale,{x:.001,y:.001,z:.001},{x:1,y:1,z:1,duration:.55,ease:'back.out(2)'},dot.index===0?.9+dot.order*.085:3.02+dot.order*.07));
  entrance.to(settle,{value:1,duration:.7,ease:'back.out(1.4)'},3.7);
  entrance.time(0,true);
  const selections=items.map(()=>({value:0,velocity:0}));
  function animate(time:number,hover:number,progress=1){
      entrance.time(progress*entrance.duration(),true);
      const breathe=(1-Math.cos(time*Math.PI*2/14))*.5;
      modules.forEach(({object,position,index,entry})=>{
        object.visible=entry.value>.001;object.scale.setScalar(Math.max(.001,entry.value));
        object.position.set(position.x+Math.sign(position.x)*(breathe*.04+hover*.02),position.y+Math.sin(time*.45+index)*.012-(1-entry.value)*.12,position.z+breathe*.2+hover*.06-(1-entry.value)*.14);
        object.rotation.y=Math.sin(time*.33+index)*.012;
      });
      lines.forEach(({object,width,x,progress})=>{object.visible=progress.value>.0001;object.scale.x=Math.max(.0001,progress.value);object.position.x=x-width*(1-progress.value)*.5;});
      masks.forEach(({object,height,y,progress})=>{object.visible=progress.value<.9999;object.scale.y=Math.max(.0001,1-progress.value);object.position.y=y+height*progress.value*.5;});
      thumb.position.x=Math.sin(time*.4)*.3;
  }
  return {
    group,picks,items,entranceDuration:entrance.duration(),ready:Promise.resolve(),animate,
    pose(time:number,progress=1,hover=0,hoveredIndex=-1,x=0,y=0,scroll=0,dt=1/60){
      animate(time,hover,progress);
      group.rotation.set(Math.sin(time*.31)*.016+y*.065,Math.sin(time*.24)*.04+x*.11+hover*.035,Math.sin(time*.27)*.012);
      group.position.y=Math.sin(time*.65)*.045+scroll*.12;
      items.forEach(({object,position,rotation},index)=>{
        const selection=selections[index],target=index===hoveredIndex?hover:0;
        selection.velocity+=((target-selection.value)*105-selection.velocity*19)*dt;selection.value+=selection.velocity*dt;
        const selected=selection.value;
        object.position.set(position.x+Math.sin(time*.34+index)*.018+Math.sign(position.x)*hover*.075,position.y+Math.sin(time*.65+index*1.1)*.032+Math.sign(position.y)*hover*.055,position.z+selected*.12);
        object.rotation.set(rotation.x+Math.sin(time*.45+index)*.012,rotation.y+Math.sin(time*.34+index)*.022+selected*.055,rotation.z+Math.sin(time*.37+index)*.012);
        object.scale.setScalar(1+selected*.022+(1-settle.value)*.003);
      });
    },
    dispose(){entrance.kill();geometries.forEach(geometry=>geometry.dispose());materials.forEach(material=>material.dispose());textures.forEach(texture=>texture.dispose());},
  };
}

export function updateShowcaseCamera(camera:THREE.PerspectiveCamera,time:number,progress=1,scroll=0){
  camera.position.set(.15+Math.sin(time*.2)*.035,.25+Math.sin(time*.17)*.025,8.4+(1-progress)*.45+scroll*.24);
  camera.lookAt(0,.02,0);
}
