'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

export default function ScrollMotion() {
  const pathname = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let mounted = true;
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        // Above-the-fold content remains immediately readable; reveal only incoming sections.
        if (element.getBoundingClientRect().top < window.innerHeight * .92) return;
        gsap.fromTo(element, { y: 16, opacity: 0 }, {
          y: 0, opacity: 1, duration: .55, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        });
      });
      const refresh = () => { if (mounted) ScrollTrigger.refresh(); };
      document.fonts.ready.then(refresh);
    });

    return () => { mounted = false; media.revert(); };
  }, [pathname]);

  return null;
}
