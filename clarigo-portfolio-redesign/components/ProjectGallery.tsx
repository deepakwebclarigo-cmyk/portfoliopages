'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import type { ProjectAsset } from '../lib/projects';

export default function ProjectGallery({ images, name, kind }: { images: ProjectAsset[]; name: string; kind: 'web' | 'mobile' }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const focusedButton = useRef<HTMLButtonElement | null>(null);
  const previousOverflow = useRef<string | null>(null);
  function unlockScroll() {
    if (previousOverflow.current !== null) { document.body.style.overflow = previousOverflow.current; previousOverflow.current = null; }
  }
  useEffect(() => () => {
    if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current;
  }, []);
  function open(index: number, button: HTMLButtonElement) {
    focusedButton.current = button;
    setActive(index);
    dialog.current?.showModal();
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  function close() { unlockScroll(); dialog.current?.close(); }
  function move(offset: number) { setActive((index) => (index + offset + images.length) % images.length); }
  return (
    <>
      <div className={`projectGallery ${kind === 'mobile' ? 'mobileGallery' : 'webGallery'}`}>
        {images.map((asset, index) => (
          <figure key={asset.src}>
            <button className="galleryOpen" type="button" onClick={(event) => open(index, event.currentTarget)} aria-label={`Expand ${name} interface view ${index + 1}`}>
              <Image src={asset.src} unoptimized alt={`${name} — ${asset.source.includes('/screenshots/') ? 'interface screen' : 'design composition'} ${index + 1}`} width={asset.width} height={asset.height} sizes="(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 30vw" />
              <span className="galleryExpand" aria-hidden="true"><Expand size={17} /></span>
            </button>
            <figcaption><span>{asset.source.includes('/screenshots/') ? 'INTERFACE SCREEN' : 'DESIGN COMPOSITION'}</span><span>{String(index + 1).padStart(2, '0')}</span></figcaption>
          </figure>
        ))}
      </div>
      <dialog ref={dialog} className="galleryDialog" aria-label={`${name} interface viewer`} onCancel={unlockScroll} onClick={(event) => { if (event.target === event.currentTarget) close(); }} onKeyDown={(event) => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1); }} onClose={() => { unlockScroll(); focusedButton.current?.focus(); }}>
        <div className="galleryDialogBar">
          <span>{name} <small>{active + 1} / {images.length}</small></span>
          <div>
            {images.length > 1 && <><button type="button" onClick={() => move(-1)} aria-label="Previous image"><ArrowLeft size={19} /></button><button type="button" onClick={() => move(1)} aria-label="Next image"><ArrowRight size={19} /></button></>}
            <button type="button" onClick={close} aria-label="Close image viewer" autoFocus><X size={22} /></button>
          </div>
        </div>
        <div className="galleryDialogImage"><Image key={images[active].src} src={images[active].src} unoptimized alt={`${name} interface view ${active + 1}, expanded`} width={images[active].width} height={images[active].height} sizes="95vw" /></div>
      </dialog>
    </>
  );
}
