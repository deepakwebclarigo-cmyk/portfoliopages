'use client';

import { useEffect, useRef } from 'react';

export default function PortfolioWebGL() {
  const element = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = element.current!;
    let alive = true, loading = false, dispose: (() => void) | undefined;
    const media = matchMedia('(min-width: 701px)');
    const boot = async () => {
      if (!alive || !media.matches || loading || dispose || (!document.querySelector('[data-hero-webgl-view]') && !matchMedia('(hover: hover) and (pointer: fine)').matches)) return;
      loading = true;
      try {
        const { createPortfolioRenderer } = await import('../lib/motion-webgl');
        if (alive && media.matches) dispose = createPortfolioRenderer(canvas);
      } catch { if (alive) canvas.dataset.engine = 'fallback'; }
      finally { loading = false; }
    };
    canvas.dataset.engine = 'static';
    boot(); media.addEventListener('change', boot);
    return () => { alive = false; media.removeEventListener('change', boot); dispose?.(); };
  }, []);
  return <canvas ref={element} className="portfolioWebgl" aria-hidden="true" />;
}
