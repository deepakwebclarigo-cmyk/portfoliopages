'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

export default function ScrollMotion() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 24 },
          {
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          },
        );
      });
    });

    return () => context.revert();
  }, [pathname]);

  return null;
}
