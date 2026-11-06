'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode, PointerEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function InteractiveDepth({ children, className, tilt, lift, enabled }: { children: ReactNode; className: string; tilt: number; lift: number; enabled: boolean }) {
  const bounds = useRef<DOMRect | null>(null);
  const rawX = useMotionValue(0), rawY = useMotionValue(0), rawLift = useMotionValue(0);
  const spring = { stiffness: 180, damping: 27, mass: .6 };
  const rotateX = useSpring(rawX, spring), rotateY = useSpring(rawY, spring), y = useSpring(rawLift, spring);
  function reset() { bounds.current = null; rawX.set(0); rawY.set(0); rawLift.set(0); }
  useEffect(() => {
    const settle = () => { bounds.current = null; rawX.set(0); rawY.set(0); rawLift.set(0); rotateX.jump(0); rotateY.jump(0); y.jump(0); };
    if (!enabled) settle();
    window.addEventListener('pagehide', settle); window.addEventListener('blur', settle);
    return () => { window.removeEventListener('pagehide', settle); window.removeEventListener('blur', settle); };
  }, [enabled, rawX, rawY, rawLift, rotateX, rotateY, y]);
  function enter(event: PointerEvent<HTMLDivElement>) {
    if (!enabled || event.pointerType !== 'mouse') return;
    bounds.current = event.currentTarget.getBoundingClientRect(); rawLift.set(lift);
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    const rect = bounds.current;
    if (!enabled || event.pointerType !== 'mouse' || !rect) return;
    // Cache bounds on entry; no layout reads or React renders on pointer movement.
    rawX.set(-Math.max(-.5, Math.min(.5, (event.clientY - rect.top) / rect.height - .5)) * tilt * 2);
    rawY.set(Math.max(-.5, Math.min(.5, (event.clientX - rect.left) / rect.width - .5)) * tilt * 2);
  }
  return <div className={'motionDepth ' + className} data-depth-enabled={enabled ? 'true' : 'false'} onPointerEnter={enter} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
    <motion.div className="depthSurface" style={{ rotateX, rotateY, y }}>{children}</motion.div>
  </div>;
}
