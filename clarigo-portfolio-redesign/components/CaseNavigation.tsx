'use client';

import { useEffect, useRef, useState } from 'react';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Key features' },
  { id: 'design', label: 'Design' },
  { id: 'screens', label: 'Screenshots' },
  { id: 'responsive', label: 'Device views' },
];

export default function CaseNavigation({ showDeviceViews }: { showDeviceViews: boolean }) {
  const [active, setActive] = useState('overview');
  const navigation = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const boundary = (navigation.current?.getBoundingClientRect().bottom ?? 140) + 32;
      let current = 'overview';
      for (const { id } of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= boundary) current = id;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [showDeviceViews]);
  useEffect(() => {
    const nav = navigation.current;
    const link = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!nav || !link) return;
    const left = link.offsetLeft;
    if (left < nav.scrollLeft || left + link.offsetWidth > nav.scrollLeft + nav.clientWidth) {
      nav.scrollLeft = left - (nav.clientWidth - link.offsetWidth) / 2;
    }
  }, [active]);
  return (
    <nav ref={navigation} className="caseNav shell" aria-label="Case study sections">
      {sections.filter(({ id }) => showDeviceViews || id !== 'responsive').map(({ id, label }) => (
        <a href={'#' + id} key={id} aria-current={active === id ? 'location' : undefined} onClick={() => setActive(id)}>{label}</a>
      ))}
    </nav>
  );
}
