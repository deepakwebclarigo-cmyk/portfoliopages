'use client';

import { useEffect, useRef } from 'react';

export default function PortfolioWebGL() {
  const element = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = element.current!;
    let alive = true, loading = false, dispose: (() => void) | undefined;
    let initialFrame = 0, pointer: PointerEvent | undefined;
    const media = matchMedia('(min-width: 701px)');
    const contrast = matchMedia('(forced-colors: active)');
    const hasHero = Boolean(document.querySelector('[data-hero-webgl-view]'));
    const entranceReady = () => !hasHero || matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.hasAttribute('data-motion-skip-hero') || (document.documentElement.dataset.heroTimeline === 'complete' && [...document.querySelectorAll<HTMLElement>('.heroCount')].every(counter => counter.dataset.countState === 'complete'));
    const boot = async () => {
      if (!alive || !media.matches || contrast.matches || !entranceReady() || loading || dispose || (!hasHero && (!pointer || !matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches))) return;
      loading = true;
      try {
        const { createPortfolioRenderer } = await import('../lib/motion-webgl');
        if (alive && media.matches && !contrast.matches) dispose = createPortfolioRenderer(canvas, pointer);
      } catch { if (alive) canvas.dataset.engine = 'fallback'; }
      finally { loading = false; }
    };
    const entrance = new MutationObserver(() => { if (entranceReady()) { entrance.disconnect(); void boot(); } });
    if (hasHero && !entranceReady()) entrance.observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['data-hero-timeline', 'data-count-state', 'data-motion', 'data-motion-skip-hero'] });
    const track = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer = event;
      if (event.target instanceof Element && event.target.closest('.caseVisual')) void boot();
    };
    const resize = () => {
      if (!media.matches || contrast.matches) { dispose?.(); dispose = undefined; pointer = undefined; canvas.dataset.engine = 'static'; }
      else if (hasHero) void boot();
    };
    canvas.dataset.engine = 'static';
    // Finish the kinetic text/counters before cold GPU shader preparation.
    // Detail pages allocate their renderer only on real pointer interaction.
    if (hasHero) initialFrame = requestAnimationFrame(() => { initialFrame = requestAnimationFrame(() => { void boot(); }); });
    document.addEventListener('pointerover', track, { passive: true });
    document.addEventListener('pointermove', track, { passive: true });
    media.addEventListener('change', resize);
    contrast.addEventListener('change', resize);
    return () => { alive = false; entrance.disconnect(); cancelAnimationFrame(initialFrame); media.removeEventListener('change', resize); contrast.removeEventListener('change', resize); document.removeEventListener('pointerover', track); document.removeEventListener('pointermove', track); dispose?.(); };
  }, []);
  return <canvas ref={element} className="portfolioWebgl" aria-hidden="true" />;
}
