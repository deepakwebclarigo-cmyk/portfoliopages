'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroShowcaseFallback from './HeroShowcaseFallback';


export default function HeroAmbient() {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = element.current!;
    const media = gsap.matchMedia();
    media.add({ all: 'all', reduce: '(prefers-reduced-motion: reduce)', compact: '(max-width: 700px)' }, context => {
      root.dataset.pointerDepth = 'false';
      if (context.conditions?.reduce || context.conditions?.compact) { root.dataset.ambientState = 'static'; return; }
      let visible = true, focused = true;
      const loops = [
        gsap.to(root.querySelector('.heroBlobRose'), { x: 12, y: -10, scale: 1.04, duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true }),
        gsap.to(root.querySelector('.heroBlobLavender'), { x: -12, y: 10, duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true }),
      ];
      const sync = () => { const running=visible&&focused&&!document.hidden; loops.forEach(tween=>running?tween.play():tween.pause()); root.dataset.ambientState=running?'running':'paused'; };
      const observer = new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();});
      observer.observe(root.closest('.heroSection')!);
      const blur=()=>{focused=false;sync();}, focus=()=>{focused=true;sync();};
      document.addEventListener('visibilitychange',sync);window.addEventListener('blur',blur);window.addEventListener('focus',focus);window.addEventListener('pagehide',blur);window.addEventListener('pageshow',focus);sync();
      return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);window.removeEventListener('blur',blur);window.removeEventListener('focus',focus);window.removeEventListener('pagehide',blur);window.removeEventListener('pageshow',focus);};
    });
    return()=>{media.revert();delete root.dataset.ambientState;delete root.dataset.pointerDepth;};
  },[]);
  return <div ref={element} className="heroAmbient" aria-hidden="true"><div className="heroAmbientStage">
    <i className="heroBlob heroBlobLavender"/><i className="heroBlob heroBlobRose"/><i className="heroBlob heroBlobLight"/>
    <div className="heroWebglViewport" data-hero-webgl-view><HeroShowcaseFallback/></div>
  </div></div>;
}
