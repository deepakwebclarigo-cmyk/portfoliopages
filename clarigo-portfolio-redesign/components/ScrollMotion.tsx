'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { usePathname } from 'next/navigation';

const reading = '[data-reveal] .sectionLabel, [data-reveal] h2, [data-reveal] .storyLead, [data-reveal] .storySectionHeading > p, [data-reveal] .caseBody > *, [data-reveal] .screenHeader > p, .portfolioHeading .eyebrow, .portfolioHeading > p, .portfolioEnd .eyebrow, .projectClosing p, .closingActions, .portfolioControls, .resultMeta';
const details = '.featureColumn > article, .workflowSteps > li, .solutionList > li, .toolkitTags > span, .featureArtwork, .solutionArtwork, .devicePresentation, .relatedCard';
const properties = 'transform,opacity,clipPath,willChange';

export default function ScrollMotion() {
  const pathname = usePathname();
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    CustomEase.create('clarigo', '.22,1,.36,1');
    const root = document.documentElement, media = gsap.matchMedia();
    const completed = new WeakSet<HTMLElement>();
    let heroPlayed = false, alive = true, anchorFrame = 0, userNavigated = false;
    let completeHash: (() => void) | undefined;
    const initialHash = location.hash;
    const settleCounters = () => document.querySelectorAll<HTMLElement>('.heroCount').forEach(counter => {
      counter.textContent = counter.dataset.countTo ?? counter.textContent;
      counter.style.removeProperty('width'); counter.dataset.countState = 'complete';
    });
    const interruptAnchor = (event: Event) => { if (event.isTrusted) userNavigated = true; };
    const inputEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const;
    inputEvents.forEach(type => window.addEventListener(type, interruptAnchor, { passive: true }));
    const skipHero = Boolean(location.hash || scrollY > 80);
    if (skipHero) root.setAttribute('data-motion-skip-hero', '');
    const wordsDone = (event: AnimationEvent) => {
      if (event.animationName === 'clarigoWordIn' && event.target instanceof HTMLElement) event.target.setAttribute('data-word-revealed', '');
    };
    document.addEventListener('animationend', wordsDone);

    media.add({ wide: '(min-width: 1001px)', small: '(max-width: 1000px)', reduce: '(prefers-reduced-motion: reduce)' }, (context) => {
      const wide = Boolean(context.conditions?.wide), reduced = Boolean(context.conditions?.reduce);
      root.dataset.motion = reduced ? 'reduced' : 'full';
      const select = (selector: string) => gsap.utils.toArray<HTMLElement>(selector);
      if (reduced) {
        heroPlayed = true;
        settleCounters();
        select('.motionWord').forEach(word => word.setAttribute('data-word-revealed', ''));
        select(reading + ',' + details + ',.projectGallery > figure,.projectEntrance').forEach(element => completed.add(element));
        return;
      }
      const seen = new WeakSet<HTMLElement>(), registered = new Set<HTMLElement>();
      const triggers = new Set<ScrollTrigger>();
      let frame = 0;
      const finish = (elements: HTMLElement[]) => {
        if (!elements.length) return;
        elements.forEach(element => { completed.add(element); element.dataset.motionReveal = 'revealed'; });
        gsap.killTweensOf(elements);
        gsap.set(elements, { clearProps: properties });
      };
      // Deferred callbacks share the matchMedia context so preference changes clean up everything.
      const enter = context.add('enter', (elements: HTMLElement[]) => {
        const targets = elements.filter(element => element.isConnected && !completed.has(element));
        if (!targets.length) return;
        targets.forEach(element => element.dataset.motionReveal = 'entering');
        gsap.set(targets, { willChange: 'transform,opacity' });
        gsap.to(targets, { y: 0, opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', force3D: 'auto', duration: wide ? .75 : .58, stagger: wide ? .07 : .045, ease: 'clarigo', overwrite: true,
          onComplete: () => { targets.forEach(element => { completed.add(element); element.dataset.motionReveal = 'revealed'; }); gsap.set(targets, { clearProps: properties }); },
        });
      });
      function register(elements: HTMLElement[], image = false) {
        const targets = elements.filter(element => !seen.has(element) && !completed.has(element));
        const pending = targets.filter(element => {
          seen.add(element); registered.add(element);
          // Above-the-fold content, restored positions, and focused controls stay readable.
          if (element.getBoundingClientRect().top < innerHeight * .94 || element.contains(document.activeElement)) { completed.add(element); return false; }
          element.dataset.motionReveal = 'pending'; return true;
        });
        if (!pending.length) return;
        gsap.set(pending, { opacity: 0, y: wide ? 22 : 14, force3D: false, ...(image ? { scale: .99, clipPath: 'inset(0% 0% 7% 0%)' } : {}) });
        ScrollTrigger.batch(pending, { start: 'top 94%', once: true, interval: .045, batchMax: wide ? 3 : 2, onEnter: elements => enter(elements) }).forEach(trigger => triggers.add(trigger));
      }
      const readingNodes = select(reading);
      register(readingNodes.filter(element => !readingNodes.some(parent => parent !== element && parent.contains(element))));
      register(select(details));
      register(select('.projectGallery > figure'), true);
      const scanCards = context.add('scanCards', () => {
        triggers.forEach(trigger => { if (trigger.trigger && !trigger.trigger.isConnected) { trigger.kill(); triggers.delete(trigger); } });
        register(select('.projectEntrance'));
        ScrollTrigger.refresh();
      });
      scanCards();
      const scheduleCards = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { if (alive) scanCards(); }); };
      const gridObserver = new MutationObserver(scheduleCards);
      const portfolio = document.querySelector('.portfolioSection');
      if (portfolio) gridObserver.observe(portfolio, { childList: true, subtree: true });

      if (!heroPlayed && !skipHero) {
        heroPlayed = true;
        const words = select('.heroCopy .motionWord');
        if (words.length) {
          root.dataset.heroTimeline = 'active';
          const timeline = gsap.timeline({ defaults: { ease: 'clarigo' }, onComplete: () => {
            words.forEach(word => word.setAttribute('data-word-revealed', ''));
            root.dataset.heroTimeline = 'complete';
          } });
          timeline.fromTo('.heroCopy > .eyebrow', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: .6, clearProps: properties }, 0)
            .fromTo(words, { yPercent: 112, rotationX: wide ? 28 : 0, rotationZ: wide ? 2 : 0, opacity: 0 }, { yPercent: 0, rotationX: 0, rotationZ: 0, opacity: 1, duration: wide ? .95 : .78, stagger: wide ? .11 : .08, clearProps: properties }, .1)
            .fromTo('.heroCopy > p', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .65, clearProps: properties }, .43)
            .fromTo('.heroActions > a', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .65, stagger: .1, clearProps: properties }, .61)
            .fromTo('.inventory > div', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .55, stagger: .09, clearProps: properties }, .74)
            .fromTo('.heroScroll', { opacity: 0 }, { opacity: 1, duration: .6, clearProps: properties }, .9)
            .fromTo('.heroScroll > span', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: .65, clearProps: 'transform,transformOrigin' }, .9);
        }
        const copy = select('.caseIntro > .eyebrow, .caseIntro > p, .caseMeta');
        if (copy.length) gsap.fromTo(copy, { y: 14, opacity: .35 }, { y: 0, opacity: 1, duration: .75, stagger: .075, delay: .12, ease: 'clarigo', clearProps: properties });
        select('.heroCount').forEach((counter, index) => {
          const target = Number(counter.dataset.countTo), count = { value: 0 };
          gsap.set(counter, { width: counter.getBoundingClientRect().width });
          counter.dataset.countState = 'running'; counter.textContent = '0';
          gsap.to(count, { value: target, snap: { value: 1 }, duration: 1.1, delay: .86 + index * .09, ease: 'power2.out',
            onUpdate: () => { counter.textContent = String(count.value); },
            onComplete: () => { counter.textContent = String(target); counter.dataset.countState = 'complete'; gsap.set(counter, { clearProps: 'width' }); },
          });
        });
        const artwork = select('.caseVisual');
        if (artwork.length) gsap.fromTo(artwork, { y: wide ? 26 : 14, scale: .975, opacity: .45, rotationX: wide ? 3 : 0 }, { y: 0, scale: 1, opacity: 1, rotationX: 0, duration: .95, delay: .08, ease: 'clarigo', clearProps: properties });
      } else settleCounters();
      // A few device frames receive depth; mobile retains stable, direct scrolling.
      if (wide) select('.featureImageFrame, .solutionImageFrame, .deviceImageFrame').forEach(element => {
        element.setAttribute('data-motion-parallax', '');
        gsap.fromTo(element, { y: 9 }, { y: -9, ease: 'none', scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: .65 } });
      });
      if (progress.current) gsap.to(progress.current, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .16 } });

      const focused = context.add('focused', (event: FocusEvent) => {
        const target = event.target;
        if (target instanceof HTMLElement) finish([...registered].filter(element => element.contains(target)));
      }) as (event: FocusEvent) => void;
      const hashChanged = context.add('hashChanged', () => {
        let target: HTMLElement | null = null;
        try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { /* Keep native invalid-fragment behavior. */ }
        if (target) finish([...registered].filter(element => target === element || target.contains(element)));
      }) as () => void;
      completeHash = hashChanged;
      const restored = context.add('restored', (event: PageTransitionEvent) => {
        if (event.persisted) { finish([...registered]); ScrollTrigger.refresh(); }
      }) as (event: PageTransitionEvent) => void;
      document.addEventListener('focusin', focused);
      window.addEventListener('hashchange', hashChanged);
      window.addEventListener('pageshow', restored);
      document.fonts.ready.then(() => { if (alive && !context.isReverted) ScrollTrigger.refresh(); });
      return () => {
        settleCounters();
        select('.heroCopy .motionWord').forEach(word => word.setAttribute('data-word-revealed', ''));
        cancelAnimationFrame(frame); gridObserver.disconnect();
        if (completeHash === hashChanged) completeHash = undefined;
        document.removeEventListener('focusin', focused); window.removeEventListener('hashchange', hashChanged); window.removeEventListener('pageshow', restored);
        registered.forEach(element => element.removeAttribute('data-motion-reveal'));
        select('[data-motion-parallax]').forEach(element => element.removeAttribute('data-motion-parallax'));
      };
    });
    // Initial trigger refresh/hydration can precede the browser's fragment jump.
    // Recover only a fresh URL still at the top; never overwrite history or a user's scroll.
    document.fonts.ready.then(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      if (!alive || !initialHash || navigation?.type === 'back_forward') return;
      anchorFrame = requestAnimationFrame(() => { anchorFrame = requestAnimationFrame(() => {
        // Browsers may report a few pixels of automatic scroll anchoring during hydration.
        if (!alive || userNavigated || location.hash !== initialHash || scrollY > 80) return;
        let target: HTMLElement | null = null;
        try { target = document.getElementById(decodeURIComponent(initialHash.slice(1))); } catch {}
        if (target && target.getBoundingClientRect().top > innerHeight) { target.scrollIntoView({ block: 'start', behavior: 'instant' }); completeHash?.(); }
      }); });
    });
    return () => { alive = false; cancelAnimationFrame(anchorFrame); inputEvents.forEach(type => window.removeEventListener(type, interruptAnchor)); media.revert(); document.removeEventListener('animationend', wordsDone); delete root.dataset.motion; delete root.dataset.heroTimeline; root.removeAttribute('data-motion-skip-hero'); };
  }, [pathname]);
  return <div ref={progress} className="portfolioProgress" aria-hidden="true" />;
}
