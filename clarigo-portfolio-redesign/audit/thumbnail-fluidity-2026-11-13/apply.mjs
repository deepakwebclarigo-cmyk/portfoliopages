import fs from 'node:fs/promises';import crypto from 'node:crypto';
const dir='audit/thumbnail-fluidity-2026-11-13';await fs.mkdir(dir+'/before',{recursive:true});
for(const file of ['lib/motion-webgl.ts','app/motion.css','components/PortfolioWebGL.tsx','components/ScrollMotion.tsx','lib/project-thumbnails.json','lib/project-assets.json','lib/project-themes.json']){const b=await fs.readFile(file);await fs.writeFile(dir+'/before/'+file.replaceAll('/','__')+'.before',b,{flag:'wx'});}
let s=await fs.readFile('lib/motion-webgl.ts','utf8');
const replace=(from,to)=>{if(!s.includes(from))throw Error('Missing edit anchor '+from.slice(0,90));s=s.replace(from,to);};
replace('const clamp = THREE.MathUtils.clamp;',`const clamp = THREE.MathUtils.clamp;
// Exact critically damped integration keeps pointer follow consistent across frame rates.
// The hero retains its existing motion; this solver is used only for thumbnail poses.
function stepCard(s: Spring, target: number, dt: number, frequency = 14) {
  const offset = s.value - target, impulse = s.velocity + frequency * offset;
  const decay = Math.exp(-frequency * dt);
  s.value = target + (offset + impulse * dt) * decay;
  s.velocity = (s.velocity - frequency * impulse * dt) * decay;
  return s.value;
}`);
replace('const heroX = spring(), heroY = spring(), expansion = spring(), cardX = spring(), cardY = spring(), cardHover = spring();','const heroX = spring(), heroY = spring(), expansion = spring();');
replace('let card: { link: HTMLElement; visual: HTMLElement; rect: DOMRect; badge: DOMRect | null; hovered: boolean; x: number; y: number; imageRatio: number } | null = null;',`type Thumbnail = { link: HTMLElement; visual: HTMLElement; rect: DOMRect; badge: DOMRect | null; hovered: boolean; x: number; y: number; imageRatio: number; texture: THREE.Texture; tiltX: Spring; tiltY: Spring; hover: Spring; blend: number };
  let card: Thumbnail | null = null;
  const outgoingCards: Thumbnail[] = [];
  let cardShadersReady = false;`);
const start=s.indexOf('  function restoreCard() {'),end=s.indexOf('  function measure() {',start);if(start<0||end<0)throw Error('Missing lifecycle anchors');
s=s.slice(0,start)+`  function restoreVisual(view: Thumbnail) {
    delete view.visual.dataset.webglArtwork;
    view.visual.style.removeProperty('--webgl-dom-opacity');
  }
  function retireCard() {
    if (!card) return;
    card.hovered = false;
    outgoingCards.push(card); card = null;
    // A few simultaneous exits keep rapid card changes fluid without unbounded GPU work.
    if (outgoingCards.length > 3) restoreVisual(outgoingCards.shift()!);
  }
  function restoreCard() {
    if (card) restoreVisual(card);
    outgoingCards.forEach(restoreVisual); outgoingCards.length = 0;
    card = null; pendingLink = null;
    delete canvas.dataset.cardActive;
    canvas.dataset.cardViews = '0';
  }
  function trimTextures() {
    const used = new Set([card?.texture, ...outgoingCards.map(view => view.texture)]);
    for (const [source, texture] of textures) {
      if (textures.size <= 6) break;
      if (!used.has(texture)) { textures.delete(source); texture.dispose(); }
    }
  }
`+s.slice(end);
replace("if (card) { card.rect = card.visual.getBoundingClientRect(); card.badge = card.link.querySelector('.projectIndex')?.getBoundingClientRect() ?? null; }", "for (const view of [...outgoingCards, ...(card ? [card] : [])]) { view.rect = view.visual.getBoundingClientRect(); view.badge = view.link.querySelector('.projectIndex')?.getBoundingClientRect() ?? null; }");
replace("    if (card && (!card.link.isConnected || !fine.matches || reduce.matches || card.rect.bottom < 0 || card.rect.top > height)) restoreCard();",`    if ((!fine.matches || reduce.matches) && (card || outgoingCards.length)) restoreCard();
    const cardViews: Thumbnail[] = [];
    for (const view of [...outgoingCards, ...(card ? [card] : [])]) {
      const connected = view.link.isConnected && view.rect.bottom > 0 && view.rect.top < height;
      const h = stepCard(view.hover, view.hovered ? 1 : 0, dt);
      stepCard(view.tiltX, view.hovered ? -view.y * .065 : 0, dt, 16);
      stepCard(view.tiltY, view.hovered ? view.x * .08 : 0, dt, 16);
      view.blend = THREE.MathUtils.damp(view.blend, clamp(h * 5, 0, 1), 20, dt);
      if (view.hovered && view.blend > .999) view.blend = 1;
      const settled = !view.hovered && h < .001 && Math.abs(view.hover.velocity) < .01 && view.blend < .001 && Math.abs(view.tiltX.value) + Math.abs(view.tiltY.value) < .0001;
      if (!connected || settled) {
        restoreVisual(view);
        if (card === view) card = null;
        const index = outgoingCards.indexOf(view); if (index >= 0) outgoingCards.splice(index, 1);
      } else cardViews.push(view);
    }
    if (!cardViews.length) { delete canvas.dataset.cardActive; canvas.dataset.cardViews = '0'; }`);
replace('const anyView = (heroVisible && heroAssetsReady) || Boolean(card);','const anyView = (heroVisible && heroAssetsReady) || cardViews.length > 0;');
const a=s.indexOf('      if (card) {\n        const h = step(cardHover'),b=s.indexOf('      lastPainted = anyView;',a);if(a<0||b<0)throw Error('Missing card render anchors');
s=s.slice(0,a)+`      for (const view of cardViews) {
        cardGroup.rotation.set(view.tiltX.value, view.tiltY.value, 0);
        const aspect = view.rect.width / view.rect.height, maxWidth = aspect * 2, scale = .955 + view.hover.value * .03;
        const w = Math.min(maxWidth, 2 * view.imageRatio), hImage = w / view.imageRatio;
        imageMesh.scale.set(w * scale, hImage * scale, 1); backing.scale.set(w * scale + .012, hImage * scale + .012, 1);
        if (imageMaterial.map !== view.texture) { imageMaterial.map = view.texture; imageMaterial.needsUpdate = true; }
        imageMaterial.opacity = view.blend; backingMaterial.opacity = .65 * view.blend;
        cardCamera.left = -aspect; cardCamera.right = aspect; cardCamera.updateProjectionMatrix();
        viewport(view.rect);
        // Keep the existing HTML project-number badge unobscured by the canvas.
        const badge = view.badge;
        if (badge) {
          const r = view.rect, left = badge.left - 2, right = badge.right + 2, top = badge.top - 2, bottom = badge.bottom + 2;
          const clips = [[r.left, r.top, r.width, Math.max(0, top - r.top)], [r.left, bottom, r.width, Math.max(0, r.bottom - bottom)], [r.left, top, Math.max(0, left - r.left), bottom - top], [right, top, Math.max(0, r.right - right), bottom - top]];
          for (const [cx, cy, cw, ch] of clips) if (cw > 0 && ch > 0) { renderer.setScissor(cx, height - cy - ch, cw, ch); renderer.render(cardScene, cardCamera); }
        } else renderer.render(cardScene, cardCamera);
        view.visual.style.setProperty('--webgl-dom-opacity', String(1 - view.blend));
        if (view.visual.dataset.webglArtwork !== 'active') view.visual.dataset.webglArtwork = 'active';
        if (canvas.dataset.cardActive !== 'true') canvas.dataset.cardActive = 'true';
        if (view === card && frames % 6 === 0) {
          canvas.dataset.cardScale = scale.toFixed(4);
          canvas.dataset.cardTilt = Math.max(Math.abs(view.tiltX.value), Math.abs(view.tiltY.value)).toFixed(4);
          canvas.dataset.cardBlend = view.blend.toFixed(4);
        }
      }
      if (cardViews.length) canvas.dataset.cardViews = String(cardViews.length);
`+s.slice(b);
replace('if (!reduced && (activeHero || card || pendingLink)) wake(); else previous = 0;', 'if (!reduced && (activeHero || cardViews.length || pendingLink)) wake(); else previous = 0;');
replace('    restoreCard();\n    const source = image.currentSrc || image.src;', '    retireCard();\n    const source = image.currentSrc || image.src;');
replace('textureLoader.load(source, loaded => {','textureLoader.load(source, async loaded => {');
replace('          renderer.initTexture(loaded);',`          renderer.initTexture(loaded);
          // Compile the textured shader before handing off from the already visible DOM image.
          if (!cardShadersReady) {
            imageMaterial.map = loaded; imageMaterial.needsUpdate = true;
            await renderer.compileAsync(cardScene, cardCamera);
            cardShadersReady = true;
          }
          if (!alive) { loaded.dispose(); return; }`);
const c=s.indexOf('        if (textures.size > 3) {'),e=s.indexOf('        // Keep the DOM thumbnail visible',c);if(c<0||e<0)throw Error('Missing cache anchors');s=s.slice(0,c)+'        trimTextures();\n'+s.slice(e);
replace("    imageMaterial.map = texture; imageMaterial.needsUpdate = true;\n    card = { link, visual, rect: visual.getBoundingClientRect(), badge: link.querySelector('.projectIndex')?.getBoundingClientRect() ?? null, hovered: true, x: 0, y: 0, imageRatio: image.naturalWidth / image.naturalHeight };",`    const returning = outgoingCards.findIndex(view => view.link === link);
    card = returning >= 0 ? outgoingCards.splice(returning, 1)[0] : { link, visual, rect: visual.getBoundingClientRect(), badge: link.querySelector('.projectIndex')?.getBoundingClientRect() ?? null, hovered: true, x: 0, y: 0, imageRatio: image.naturalWidth / image.naturalHeight, texture, tiltX: spring(), tiltY: spring(), hover: spring(), blend: 0 };
    card.hovered = true;
    textures.delete(source); textures.set(source, texture);`);
let css=await fs.readFile('app/motion.css','utf8');const old=".visual[data-webgl-artwork='active'] img { opacity: 0; }";if(!css.includes(old))throw Error('Missing artwork rule');css=css.replace(old,".visual[data-webgl-artwork='active'] img { opacity: var(--webgl-dom-opacity, 0); will-change: opacity; }");
// Match the visual hover easing to the artwork's soft acceleration and settling.
css+=`\n@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .projectLink { transition-duration: .4s; transition-timing-function: cubic-bezier(.22, 1, .36, 1); }
  .projectArrow { transition-duration: .35s; transition-timing-function: cubic-bezier(.22, 1, .36, 1); }
}\n`;
await fs.writeFile('lib/motion-webgl.ts',s);await fs.writeFile('app/motion.css',css);
console.log('Applied fluid thumbnail transitions; hero, artwork, palettes and layouts preserved.');
