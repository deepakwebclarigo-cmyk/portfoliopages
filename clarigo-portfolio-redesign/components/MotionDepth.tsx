'use client';

import { lazy, Suspense, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
const InteractiveDepth = lazy(() => import('./InteractiveDepth'));

const query = '(min-width: 1001px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
let media: MediaQueryList | undefined;
function mediaQuery() { return media ??= window.matchMedia(query); }
const subscribe = (callback: () => void) => { const m = mediaQuery(); m.addEventListener('change', callback); return () => m.removeEventListener('change', callback); };
const snapshot = () => mediaQuery().matches;
const serverSnapshot = () => false;

export default function MotionDepth({ children, className = '', tilt = 1.5, lift = 0 }: { children: ReactNode; className?: string; tilt?: number; lift?: number }) {
  const enabled = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  // Card artwork uses the shared Three.js renderer. A stationary wrapper needs
  // no Framer springs or per-card window listeners, but keeps the same DOM.
  const surface = <div className={'motionDepth ' + className} data-depth-enabled={enabled ? 'true' : 'false'}><div className="depthSurface">{children}</div></div>;
  if (!enabled || (tilt === 0 && lift === 0)) return surface;
  return <Suspense fallback={surface}><InteractiveDepth enabled={enabled} className={className} tilt={tilt} lift={lift}>{children}</InteractiveDepth></Suspense>;
}








