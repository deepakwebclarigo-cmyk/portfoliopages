'use client';

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
