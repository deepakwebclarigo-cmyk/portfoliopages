import fs from 'node:fs/promises';
const dir='audit/mockup-fit-2026-11-13';await fs.mkdir(dir+'/before',{recursive:true});await fs.mkdir(dir+'/review',{recursive:true});
for(const f of ['components/ProjectVisual.tsx','components/ProjectGallery.tsx','components/PortfolioWebGL.tsx','components/ScrollMotion.tsx','lib/motion-webgl.ts','app/layout.tsx','app/motion.css','lib/project-assets.json','lib/project-thumbnails.json','lib/project-themes.json']){const original=await fs.readFile(f),target=dir+'/before/'+f.replaceAll('/','__')+'.before';let previous;try{previous=await fs.readFile(target);}catch(e){if(e.code!=='ENOENT')throw e;}if(previous?.length){if(!previous.equals(original))throw Error('Checkpoint differs: '+f);}else await fs.writeFile(target,original);}
let src=await fs.readFile('components/ProjectVisual.tsx','utf8');
src=src.replace("project: Pick<Project, 'name' | 'image' | 'thumbnail' | 'thumbnailBackground' | 'accent'>;", "project: Pick<Project, 'name' | 'image' | 'thumbnail' | 'thumbnailBackground' | 'accent'> & { artwork?: Pick<Project['artwork'], 'width' | 'height'> };");
src=src.replace('            fill\n', "            {...(large && project.artwork ? { width: project.artwork.width, height: project.artwork.height } : { fill: true })}\n");await fs.writeFile('components/ProjectVisual.tsx',src);
src=await fs.readFile('components/ProjectGallery.tsx','utf8');src=src.replace("import { useEffect, useRef, useState } from 'react';", "import { useEffect, useRef, useState, type CSSProperties } from 'react';");src=src.replace("type=\"button\" onClick={(event) => open(index, event.currentTarget)}", "style={{ '--image-ratio': asset.width / asset.height } as CSSProperties} type=\"button\" onClick={(event) => open(index, event.currentTarget)}");
src=src.replace('              <span className="galleryExpand" aria-hidden="true"><Expand size={17} /></span>\n','');src=src.replace("<span>{String(index + 1).padStart(2, '0')}</span></figcaption>", "<span className=\"galleryFigureAction\"><Expand size={15} aria-hidden=\"true\" />{String(index + 1).padStart(2, '0')}</span></figcaption>");await fs.writeFile('components/ProjectGallery.tsx',src);
// Only the main hero uses WebGL. Project mockups remain native images on every route.
await fs.writeFile('components/PortfolioWebGL.tsx',`'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PortfolioWebGL() {
  const element = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const canvas = element.current!;
    canvas.dataset.engine = 'static';
    if (!document.querySelector('[data-hero-webgl-view]')) return;
    let alive = true, loading = false, dispose: (() => void) | undefined, initialFrame = 0;
    const media = matchMedia('(min-width: 701px)'), contrast = matchMedia('(forced-colors: active)');
    const ready = () => matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.hasAttribute('data-motion-skip-hero') || (document.documentElement.dataset.heroTimeline === 'complete' && [...document.querySelectorAll<HTMLElement>('.heroCount')].every(counter => counter.dataset.countState === 'complete'));
    const boot = async () => {
      if (!alive || !media.matches || contrast.matches || !ready() || loading || dispose) return;
      loading = true;
      try {
        const { createPortfolioRenderer } = await import('../lib/motion-webgl');
        if (alive && media.matches && !contrast.matches) dispose = createPortfolioRenderer(canvas);
      } catch { if (alive) canvas.dataset.engine = 'fallback'; }
      finally { loading = false; }
    };
    const entrance = new MutationObserver(() => { if (ready()) { entrance.disconnect(); void boot(); } });
    if (!ready()) entrance.observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['data-hero-timeline', 'data-count-state', 'data-motion', 'data-motion-skip-hero'] });
    const resize = () => {
      if (!media.matches || contrast.matches) { dispose?.(); dispose = undefined; canvas.dataset.engine = 'static'; }
      else void boot();
    };
    initialFrame = requestAnimationFrame(() => { initialFrame = requestAnimationFrame(() => { void boot(); }); });
    media.addEventListener('change', resize); contrast.addEventListener('change', resize);
    return () => { alive = false; entrance.disconnect(); cancelAnimationFrame(initialFrame); media.removeEventListener('change', resize); contrast.removeEventListener('change', resize); dispose?.(); };
  }, [pathname]);
  return <canvas ref={element} className="portfolioWebgl" aria-hidden="true" />;
}
`);
src=await fs.readFile('lib/motion-webgl.ts','utf8');src=src.replace("canvas: HTMLCanvasElement, initialPointer?: Pick<PointerEvent, 'target' | 'pointerType' | 'clientX' | 'clientY'>", "canvas: HTMLCanvasElement");src=src.replace("    if (!card?.hovered && linkAt(event.target)) over(event);\n",'');src=src.replace("  document.addEventListener('pointerover', over); document.addEventListener('pointermove', move, { passive: true });", "  // Pointer motion belongs to the hero; project artwork never enters this renderer.\n  document.addEventListener('pointermove', move, { passive: true });");src=src.replace("    document.removeEventListener('pointerover', over); document.removeEventListener('pointermove', move);", "    document.removeEventListener('pointermove', move);");src=src.replace(/^  if \(initialPointer[^\n]*\n/m,'');await fs.writeFile('lib/motion-webgl.ts',src);
src=await fs.readFile('components/ScrollMotion.tsx','utf8');const begin=src.indexOf('      // A few device frames receive depth;'),end=src.indexOf('      if (progress.current)',begin);if(begin<0||end<0)throw Error('Missing device parallax anchor');src=src.slice(0,begin)+'      // Mockup frames stay stationary so native artwork remains neatly contained.\n'+src.slice(end);src=src.replace("{ y: wide ? 26 : 14, scale: .975, opacity: .45, rotationX: wide ? 3 : 0 }, { y: 0, scale: 1, opacity: 1, rotationX: 0, duration: .95", "{ y: 12, opacity: .7 }, { y: 0, opacity: 1, duration: .5");await fs.writeFile('components/ScrollMotion.tsx',src);
let layout=await fs.readFile('app/layout.tsx','utf8');layout=layout.replace("import './project-identities.css';", "import './project-identities.css';\nimport './mockup-fit.css';");await fs.writeFile('app/layout.tsx',layout);
await fs.writeFile('app/mockup-fit.css',`/* Native proportions, consistent insets, and controls outside the artwork. */
.projectArt .thumbnailVisual, .relatedImage .thumbnailVisual { aspect-ratio: 1600 / 1325; }
.caseVisual { background: var(--project-color, #f1f0f7); }
.visualLarge { aspect-ratio: auto; padding: clamp(12px, 1.4vw, 20px); }
.visualLarge .visualPicture { position: relative; inset: auto; height: auto; }
.visualLarge img { position: static !important; width: 100% !important; height: auto !important; max-width: 100%; transform: none !important; opacity: 1 !important; transition: none !important; }
.visualCaption { position: relative; inset: auto; display: inline-flex; margin: 0 16px 12px; max-width: calc(100% - 32px); }
.featureImageFrame, .solutionImageFrame, .deviceImageFrame { max-width: 100%; min-width: 0; }
.featureArtwork img, .solutionArtwork img, .devicePresentation img { object-fit: contain; transform: none !important; }
.projectGallery:not(.singleImageGallery) { align-items: start; }
.projectGallery .galleryOpen, .projectGallery .galleryOpen.galleryComposition { aspect-ratio: clamp(.62, var(--image-ratio, 1), 1.65); padding: clamp(12px, 1.8vw, 24px); overflow: hidden; }
.projectGallery .galleryOpen img { min-width: 0; min-height: 0; max-width: 100%; max-height: 100%; object-fit: contain; transform: none !important; transition: none !important; }
.galleryFigureAction { display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0; }
.projectGallery figcaption { align-items: center; gap: 12px; }
.projectGallery figcaption>span:first-child { min-width: 0; overflow-wrap: anywhere; }
.galleryDialogImageFrame { width: 100%; }
.galleryDialogImage img { max-width: 100%; object-fit: contain; }
.projectLink, .relatedCard, .featureColumn article>div, .caseBody { min-width: 0; }
.projectInfo h3, .projectSummary, .featureColumn h3, .featureColumn p { overflow-wrap: anywhere; }
.caseNav a { min-height: 44px; }
@media (max-width: 900px) {
  .caseHeroGrid { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .heroDepth { width: min(100%, 720px); margin-inline: auto; }
  .caseIntro>p { max-width: 660px; }
}
@media (max-width: 700px) {
  .visualLarge { padding: 12px; }
  .visualCaption { margin: 0 12px 12px; }
  .projectGallery .galleryOpen { padding: 14px; }
}
`);
console.log('Applied shared mockup fitting and responsive UI refinements without changing artwork or brand palettes.');
