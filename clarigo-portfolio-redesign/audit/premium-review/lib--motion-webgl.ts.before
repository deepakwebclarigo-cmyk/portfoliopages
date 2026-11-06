import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createHeroShowcase } from './hero-showcase-scene';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Spring = { value: number; velocity: number };
const spring = (): Spring => ({ value: 0, velocity: 0 });
function step(s: Spring, target: number, dt: number, stiffness = 105, damping = 19) {
  s.velocity += ((target - s.value) * stiffness - s.velocity * damping) * dt;
  s.value += s.velocity * dt;
  return s.value;
}
const clamp = THREE.MathUtils.clamp;

function roundedTile(size: number, depth: number) {
  const half = size / 2, r = .2, shape = new THREE.Shape();
  shape.moveTo(-half + r, -half); shape.lineTo(half - r, -half);
  shape.quadraticCurveTo(half, -half, half, -half + r); shape.lineTo(half, half - r);
  shape.quadraticCurveTo(half, half, half - r, half); shape.lineTo(-half + r, half);
  shape.quadraticCurveTo(-half, half, -half, half - r); shape.lineTo(-half, -half + r);
  shape.quadraticCurveTo(-half, -half, -half + r, -half);
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: .025, bevelThickness: .025, bevelSegments: 3, steps: 1, curveSegments: 8 });
  geometry.translate(0, 0, -depth / 2); geometry.rotateX(-Math.PI / 2);
  geometry.computeBoundingSphere(); return geometry;
}

// A single renderer draws the hero and the currently hovered image through scissor views.
// Original DOM images, names, links, and labels remain the source of truth.
export function createPortfolioRenderer(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0); renderer.autoClear = false;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping; renderer.toneMappingExposure = .9;
  renderer.transmissionResolutionScale = .5;
  let dpr = Math.min(devicePixelRatio, 1.25);
  renderer.setPixelRatio(dpr); renderer.shadowMap.enabled = false;
  const hero = document.querySelector<HTMLElement>('[data-hero-webgl-view]');
  let environment: THREE.WebGLRenderTarget | undefined;
  if (hero) { const pmrem = new THREE.PMREMGenerator(renderer), room = new RoomEnvironment(); environment = pmrem.fromScene(room, .04); room.dispose(); pmrem.dispose(); }
  const scene = new THREE.Scene(); scene.environment = environment?.texture ?? null; scene.environmentIntensity = .55;
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 40);
  camera.position.set(.15, .25, 8.4); camera.lookAt(0, .02, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xe7ddeb, .9));
  const key = new THREE.DirectionalLight(0xffffff, 2); key.position.set(-4, 7, 5);
  key.castShadow = true; key.shadow.mapSize.set(512, 512); key.shadow.camera.left = -4; key.shadow.camera.right = 4;
  key.shadow.camera.top = 4; key.shadow.camera.bottom = -4; key.shadow.normalBias = .025; key.shadow.bias = -.0003;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffd7e3, .6); fill.position.set(4, 2, -4); scene.add(fill);
  const showcase = hero ? createHeroShowcase() : null;
  const group = showcase?.group ?? new THREE.Group(); scene.add(group);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.ShadowMaterial({ opacity: .11 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -1.65; floor.visible = false; scene.add(floor);
  const cardScene = new THREE.Scene(), cardCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 15);
  cardCamera.position.z = 5;
  const imageMaterial = new THREE.MeshBasicMaterial({ transparent: true, toneMapped: false });
  const imageMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), imageMaterial); imageMesh.position.z = .025;
  const backingMaterial = new THREE.MeshBasicMaterial({ color: '#eeeaf3', transparent: true, opacity: .65, toneMapped: false });
  const backing = new THREE.Mesh(new THREE.BoxGeometry(1, 1, .035), backingMaterial);
  const cardGroup = new THREE.Group(); cardGroup.add(backing, imageMesh); cardScene.add(cardGroup);
  const textures = new Map<string, THREE.Texture>();
  const reduce = matchMedia('(prefers-reduced-motion: reduce)'), fine = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1001px)');
  let heroRect: DOMRect | null = null, heroVisible = false, hovered = false, hoveredIndex = -1, px = 0, py = 0;
  let heroAssetsReady = !hero;
  let alive = true, contextAvailable = true, shown = true, focused = true, dirty = true, lastPainted = false;
  let width = 0, height = 0, frame = 0, previous = 0, time = 0, frames = 0, slowFrames = 0;
  const heroX = spring(), heroY = spring(), expansion = spring(), cardX = spring(), cardY = spring(), cardHover = spring();
  const ray = new THREE.Raycaster(), pointer = new THREE.Vector2();
  let card: { link: HTMLElement; visual: HTMLElement; rect: DOMRect; badge: DOMRect | null; hovered: boolean; x: number; y: number; imageRatio: number } | null = null;
  let pendingLink: HTMLElement | null = null, pointerX = 0, pointerY = 0;
  canvas.dataset.engine = 'three'; canvas.dataset.geometry = 'ExtrudeGeometry'; canvas.dataset.scene = 'uiux-ecosystem';
  canvas.dataset.heroObjects = String(showcase?.items.length ?? 0); canvas.dataset.assets = hero ? 'loading' : 'ready';
  canvas.dataset.pixelRatio = String(dpr);
  gsap.registerPlugin(ScrollTrigger);
  const scroll = { progress: 0 }, intro = { progress: reduce.matches ? 1 : 0 };
  const introTween = gsap.to(intro, { progress: 1, duration: 1.45, ease: 'power3.out', paused: !hero || reduce.matches });
  const cameraTween = hero ? gsap.to(scroll, { progress: 1, ease: 'none', scrollTrigger: { trigger: hero.closest('.heroSection'), start: 'top top', end: 'bottom top', scrub: .7 } }) : undefined;
  if (reduce.matches) cameraTween?.scrollTrigger?.disable(false);

  function restoreCard() {
    if (card) delete card.visual.dataset.webglArtwork;
    card = null; pendingLink = null; cardHover.value = cardHover.velocity = cardX.value = cardX.velocity = cardY.value = cardY.velocity = 0;
    delete canvas.dataset.cardActive;
  }
  function measure() {
    dirty = false;
    if (width !== innerWidth || height !== innerHeight) { width = innerWidth; height = innerHeight; renderer.setSize(width, height, false); }
    heroRect = hero?.getBoundingClientRect() ?? null;
    heroVisible = Boolean(heroRect && heroRect.width > 0 && heroRect.bottom > 0 && heroRect.top < height);
    if (!heroVisible) { hovered = false; hoveredIndex = -1; px = py = 0; }
    if (heroRect && heroRect.width > 0) {
      camera.aspect = heroRect.width / heroRect.height;
      camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(34) / 2) * Math.max(1, 1.1 / camera.aspect)));
      camera.updateProjectionMatrix();
    }
    if (card) { card.rect = card.visual.getBoundingClientRect(); card.badge = card.link.querySelector('.projectIndex')?.getBoundingClientRect() ?? null; }
  }
  function wake() { if (alive && contextAvailable && shown && focused && !document.hidden && !frame) frame = requestAnimationFrame(paint); }
  function updateBounds() { dirty = true; wake(); }
  function viewport(rect: DOMRect) {
    renderer.setViewport(rect.left, height - rect.bottom, rect.width, rect.height);
    renderer.setScissor(Math.max(0, rect.left), Math.max(0, height - rect.bottom), Math.max(0, Math.min(width, rect.right) - Math.max(0, rect.left)), Math.max(0, Math.min(height, rect.bottom) - Math.max(0, rect.top)));
  }
  function paint(now: number) {
    frame = 0; if (!alive || !contextAvailable || !shown || !focused || document.hidden) return;
    const dt = previous ? Math.min((now - previous) / 1000, .032) : 1 / 60; previous = now;
    if (dirty) measure();
    if (pendingLink) {
      if (!pendingLink.isConnected || reduce.matches || !fine.matches) pendingLink = null;
      else { const target = pendingLink; pendingLink = null; over({ pointerType: 'mouse', target }); }
    }
    if (card && (!card.link.isConnected || !fine.matches || reduce.matches || card.rect.bottom < 0 || card.rect.top > height)) restoreCard();
    const reduced = reduce.matches;
    const activeHero = heroVisible && heroAssetsReady && !reduced;
    if (activeHero) time += dt;
    const hover = reduced ? 0 : step(expansion, hovered ? 1 : 0, dt, 95, 18);
    const x = reduced ? 0 : step(heroX, px, dt), y = reduced ? 0 : step(heroY, py, dt);
    camera.position.z = 8.4 + (reduced ? 0 : scroll.progress * .24);
    group.rotation.set(Math.sin(time * .31) * .016 + y * .065, Math.sin(time * .24) * .04 + x * .11 + hover * .035, Math.sin(time * .27) * .012);
    group.position.y = Math.sin(time * .65) * .045 + (reduced ? 0 : scroll.progress * .12);
    showcase?.items.forEach((item, index) => {
      const { object, position, rotation } = item, selected = index === hoveredIndex ? hover : 0;
      const reveal = clamp((intro.progress - index * .06) / .76, 0, 1);
      object.position.set(position.x + Math.sin(time * .34 + index) * .018 + Math.sign(position.x) * hover * .075, position.y + Math.sin(time * .65 + index * 1.1) * .032 + Math.sign(position.y) * hover * .055 - (1 - reveal) * .18, position.z + selected * .12 - (1 - reveal) * .28);
      object.rotation.set(rotation.x + Math.sin(time * .45 + index) * .012, rotation.y + Math.sin(time * .34 + index) * .022 + selected * .055, rotation.z + Math.sin(time * .37 + index) * .012);
      object.scale.setScalar(.96 + reveal * .04 + selected * .022);
    });
    showcase?.animate(time, hover);
    const anyView = (heroVisible && heroAssetsReady) || Boolean(card);
    if (anyView || lastPainted) {
      renderer.setScissorTest(false); renderer.clear(); renderer.setScissorTest(true);
      if (heroVisible && heroAssetsReady && heroRect) { viewport(heroRect); renderer.render(scene, camera); if (hero && hero.dataset.renderer !== 'three') hero.dataset.renderer = 'three'; }
      if (card) {
        const h = step(cardHover, card.hovered ? 1 : 0, dt, 135, 21);
        cardGroup.rotation.set(step(cardX, card.hovered ? -card.y * .065 : 0, dt, 135, 21), step(cardY, card.hovered ? card.x * .08 : 0, dt, 135, 21), 0);
        const aspect = card.rect.width / card.rect.height, maxWidth = aspect * 2, scale = .955 + h * .03;
        const w = Math.min(maxWidth, 2 * card.imageRatio), hImage = w / card.imageRatio;
        imageMesh.scale.set(w * scale, hImage * scale, 1); backing.scale.set(w * scale + .012, hImage * scale + .012, 1);
        cardCamera.left = -aspect; cardCamera.right = aspect; cardCamera.updateProjectionMatrix();
        viewport(card.rect);
        // Keep the existing HTML project-number badge unobscured by the canvas.
        const badge = card.badge;
        if (badge) {
          const r = card.rect, left = badge.left - 2, right = badge.right + 2, top = badge.top - 2, bottom = badge.bottom + 2;
          const clips = [[r.left, r.top, r.width, Math.max(0, top - r.top)], [r.left, bottom, r.width, Math.max(0, r.bottom - bottom)], [r.left, top, Math.max(0, left - r.left), bottom - top], [right, top, Math.max(0, r.right - right), bottom - top]];
          for (const [cx, cy, cw, ch] of clips) if (cw > 0 && ch > 0) { renderer.setScissor(cx, height - cy - ch, cw, ch); renderer.render(cardScene, cardCamera); }
        } else renderer.render(cardScene, cardCamera);
        card.visual.dataset.webglArtwork = 'active';
        if (canvas.dataset.cardActive !== 'true') canvas.dataset.cardActive = 'true';
        if (frames % 6 === 0) { canvas.dataset.cardScale = scale.toFixed(4); canvas.dataset.cardTilt = Math.max(Math.abs(cardGroup.rotation.x), Math.abs(cardGroup.rotation.y)).toFixed(4); }
        if (!card.hovered && Math.abs(h) < .001 && Math.abs(cardHover.velocity) < .003) restoreCard();
      }
      lastPainted = anyView;
    }
    if (anyView) frames++;
    if ((anyView && frames % 6 === 0) || reduced) {
      canvas.dataset.frame = String(frames); canvas.dataset.heroHover = String(hovered);
      canvas.dataset.heroExpansion = hover.toFixed(4); canvas.dataset.heroRotation = group.rotation.y.toFixed(4);
      canvas.dataset.drawCalls = String(renderer.info.render.calls); canvas.dataset.triangles = String(renderer.info.render.triangles);
    }
    const state = reduced ? 'reduced' : anyView ? 'running' : 'paused';
    if (canvas.dataset.state !== state) canvas.dataset.state = state;
    if (hero) { const state = activeHero ? 'running' : 'static'; if (hero.dataset.threeState !== state) hero.dataset.threeState = state; }
    if (activeHero && dt > .027) slowFrames++; else slowFrames = Math.max(0, slowFrames - 1);
    if (slowFrames > 35 && dpr > .85) { dpr = Math.max(.85, dpr - .2); renderer.setPixelRatio(dpr); renderer.setSize(width, height, false); canvas.dataset.pixelRatio = dpr.toFixed(2); slowFrames = 0; }
    if (!reduced && (activeHero || card || pendingLink)) wake(); else previous = 0;
  }

  function linkAt(target: EventTarget | null) { return target instanceof Element ? target.closest<HTMLElement>('.projectLink,.relatedCard,.caseVisual') : null; }
  function over(event: Pick<PointerEvent, 'pointerType' | 'target'> & Partial<Pick<PointerEvent, 'clientX' | 'clientY'>>) {
    if (!fine.matches || reduce.matches || event.pointerType !== 'mouse') return;
    if (event.clientX !== undefined) pointerX = event.clientX;
    if (event.clientY !== undefined) pointerY = event.clientY;
    const link = linkAt(event.target); if (!link) return;
    if (card?.link === link) { card.hovered = true; wake(); return; }
    const reveal = link.closest<HTMLElement>('[data-motion-reveal]');
    if (reveal && reveal.dataset.motionReveal !== 'revealed') { pendingLink = link; wake(); return; }
    if (link.classList.contains('caseVisual') && Number(getComputedStyle(link).opacity) < .99) { pendingLink = link; wake(); return; }
    const visual = link.querySelector<HTMLElement>('.visual'), image = visual?.querySelector('img');
    if (!visual || !image?.complete || !image.naturalWidth) return;
    restoreCard();
    const source = image.currentSrc || image.src;
    let texture = textures.get(source);
    if (!texture) {
      texture = new THREE.Texture(image); texture.colorSpace = THREE.SRGBColorSpace; texture.needsUpdate = true; texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy()); textures.set(source, texture);
      if (textures.size > 3) { const oldest = textures.keys().next().value!; textures.get(oldest)?.dispose(); textures.delete(oldest); }
    }
    imageMaterial.map = texture; imageMaterial.needsUpdate = true;
    card = { link, visual, rect: visual.getBoundingClientRect(), badge: link.querySelector('.projectIndex')?.getBoundingClientRect() ?? null, hovered: true, x: 0, y: 0, imageRatio: image.naturalWidth / image.naturalHeight };
    card.x = clamp((pointerX - card.rect.left) / card.rect.width * 2 - 1, -1, 1); card.y = clamp((pointerY - card.rect.top) / card.rect.height * 2 - 1, -1, 1);
    dirty = true; wake();
  }
  function move(event: PointerEvent) {
    if (event.pointerType !== 'mouse' || !fine.matches || reduce.matches) return;
    pointerX = event.clientX; pointerY = event.clientY;
    if (!card?.hovered && linkAt(event.target)) over(event);
    if (heroRect && heroVisible) {
      px = clamp((event.clientX - heroRect.left) / heroRect.width * 2 - 1, -1, 1); py = clamp((event.clientY - heroRect.top) / heroRect.height * 2 - 1, -1, 1);
      const inside = event.clientX > heroRect.left && event.clientX < heroRect.right && event.clientY > heroRect.top && event.clientY < heroRect.bottom;
      if (!inside) px = py = 0;
      pointer.set(px, -py); ray.setFromCamera(pointer, camera); const hit = inside ? ray.intersectObjects(showcase?.picks ?? [])[0] : undefined;
      hovered = Boolean(hit); hoveredIndex = hit ? hit.object.userData.showcaseIndex : -1;
    }
    if (card?.hovered) { card.x = clamp((event.clientX - card.rect.left) / card.rect.width * 2 - 1, -1, 1); card.y = clamp((event.clientY - card.rect.top) / card.rect.height * 2 - 1, -1, 1); }
    wake();
  }
  function out(event: PointerEvent) {
    if (pendingLink && linkAt(event.relatedTarget) !== pendingLink) pendingLink = null;
    if (card && linkAt(event.relatedTarget) !== card.link) { card.hovered = false; wake(); }
    if (!event.relatedTarget) { hovered = false; px = py = 0; wake(); }
  }
  function preference() {
    hovered = false; px = py = 0; heroX.value = heroX.velocity = heroY.value = heroY.velocity = expansion.value = expansion.velocity = 0;
    if (reduce.matches) { introTween.progress(1).pause(); cameraTween?.scrollTrigger?.disable(false); }
    else cameraTween?.scrollTrigger?.enable(false, false);
    if (reduce.matches || !fine.matches) restoreCard(); updateBounds();
  }
  function suspend() {
    focused = false; hovered = false; px = py = 0; restoreCard(); if (frame) cancelAnimationFrame(frame); frame = 0; previous = 0; canvas.dataset.state = 'paused';
    if (contextAvailable) { renderer.setScissorTest(false); renderer.clear(); if (heroVisible && heroAssetsReady && heroRect) { renderer.setScissorTest(true); viewport(heroRect); renderer.render(scene, camera); } }
  }
  function resume() { focused = true; shown = true; updateBounds(); }
  function visibility() { if (document.hidden) suspend(); else resume(); }
  function hide() { shown = false; suspend(); }
  function lost(event: Event) { event.preventDefault(); contextAvailable = false; suspend(); canvas.dataset.engine = 'context-lost'; if (hero) delete hero.dataset.renderer; }
  function restored() { contextAvailable = true; canvas.dataset.engine = 'three'; resume(); }
  function handleFocus(event: FocusEvent) {
    if (pendingLink && event.target instanceof Node && !pendingLink.contains(event.target)) pendingLink = null;
    if (card && event.target instanceof Node && !card.link.contains(event.target)) { restoreCard(); wake(); }
  }
  const gridObserver = new MutationObserver(() => { if (card) updateBounds(); });
  const grid = document.querySelector('.portfolioSection'); if (grid) gridObserver.observe(grid, { childList: true, subtree: true });
  document.addEventListener('pointerover', over); document.addEventListener('pointermove', move, { passive: true }); document.addEventListener('pointerout', out);
  document.addEventListener('visibilitychange', visibility); window.addEventListener('resize', updateBounds, { passive: true }); window.addEventListener('scroll', updateBounds, { passive: true });
  document.addEventListener('focusin', handleFocus);
  window.addEventListener('blur', suspend); window.addEventListener('focus', resume); window.addEventListener('pagehide', hide); window.addEventListener('pageshow', resume);
  reduce.addEventListener('change', preference); fine.addEventListener('change', preference);
  canvas.addEventListener('webglcontextlost', lost); canvas.addEventListener('webglcontextrestored', restored);
  measure(); wake();
  showcase?.ready.then(() => { if (alive) { heroAssetsReady = true; canvas.dataset.assets = 'ready'; wake(); } }).catch(() => { if (alive) canvas.dataset.assets = 'fallback'; });
  return () => {
    alive = false; if (frame) cancelAnimationFrame(frame); restoreCard(); if (hero) { delete hero.dataset.renderer; delete hero.dataset.threeState; }
    document.removeEventListener('pointerover', over); document.removeEventListener('pointermove', move); document.removeEventListener('pointerout', out); document.removeEventListener('visibilitychange', visibility);
    document.removeEventListener('focusin', handleFocus); gridObserver.disconnect();
    window.removeEventListener('resize', updateBounds); window.removeEventListener('scroll', updateBounds); window.removeEventListener('blur', suspend); window.removeEventListener('focus', resume); window.removeEventListener('pagehide', hide); window.removeEventListener('pageshow', resume);
    reduce.removeEventListener('change', preference); fine.removeEventListener('change', preference); canvas.removeEventListener('webglcontextlost', lost); canvas.removeEventListener('webglcontextrestored', restored);
    introTween.kill(); cameraTween?.scrollTrigger?.kill(); cameraTween?.kill();
    showcase?.dispose(); floor.geometry.dispose(); (floor.material as THREE.Material).dispose();
    imageMesh.geometry.dispose(); backing.geometry.dispose(); imageMaterial.dispose(); backingMaterial.dispose(); textures.forEach(texture => texture.dispose()); environment?.dispose(); renderer.dispose();
  };
}
