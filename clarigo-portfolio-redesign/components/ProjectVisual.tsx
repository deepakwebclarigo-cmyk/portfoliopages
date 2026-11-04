'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Project } from '../lib/projects';

export default function ProjectVisual({
  project,
  large = false,
  priority = false,
}: {
  project: Pick<Project, 'name' | 'image' | 'accent'>;
  large?: boolean;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`visual ${large ? 'visualLarge' : ''}`} style={{ background: project.accent }}>
      <div className="visualGlow" />
      {!failed ? (
        <Image
          src={large ? project.image : project.image.replace('.webp', '-card.webp')}
          unoptimized
          style={{ objectFit: 'contain', objectPosition: 'center' }}
          alt={`${project.name} — original project artwork`}
          fill
          sizes={large ? '(max-width: 700px) 100vw, 50vw' : '(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw'}
          priority={priority}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="fallback">
          <span className="fallbackGlyph">✳</span>
          <span>{project.name}</span>
          <small>Artwork could not be loaded</small>
        </div>
      )}
    </div>
  );
}
