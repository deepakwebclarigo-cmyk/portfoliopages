'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';

const links = (
  <>
    <a href="https://clarigoinfotech.com/">Home</a>
    <a href="https://clarigoinfotech.com/services">Services</a>
    <Link href="/#portfolio">Work</Link>
    <a href="https://clarigoinfotech.com/contact">Contact</a>
  </>
);

export default function SiteHeader() {
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  return (
    <header className="siteHeader">
      <div className="shell siteNav">
        <Link href="/" className="brand" aria-label="Clarigo portfolio home">
          <img src="/images/brand/clarigo.png" alt="Clarigo Infotech" width="136" height="42" />
        </Link>
        <nav className="desktopNav" aria-label="Main navigation">{links}</nav>
        <a className="navCta" href="https://clarigoinfotech.com/contact" aria-label="Book a free AI consultation">
          Book Free AI Consultation <ArrowUpRight size={15} />
        </a>
        <details className="mobileNav" ref={mobileMenu} onKeyDown={(event) => { if (event.key === 'Escape') mobileMenu.current?.removeAttribute('open'); }}>
          <summary aria-label="Open navigation"><Menu size={22} /></summary>
          <nav aria-label="Mobile navigation" onClick={() => mobileMenu.current?.removeAttribute('open')}>{links}</nav>
        </details>
      </div>
    </header>
  );
}
