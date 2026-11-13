'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Project } from '../lib/projects';

export default function ProjectVisual({
  project,
  large = false,
  priority = false,
}: {
  project: Pick<Project, 'name' | 'image' | 'thumbnail' | 'thumbnailBackground' | 'accent'>;
  large?: boolean;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [useOriginal, setUseOriginal] = useState(false);
  const source = large ? project.image : project.thumbnail;
  const card = source.replace('.webp', '-card.webp');
  const medium = source.replace('.webp', '-medium.webp');
  const sizes = large
    ? '(max-width: 700px) 100vw, 50vw'
    : '(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw';

  return (
    <div className={'visual ' + (large ? 'visualLarge' : 'thumbnailVisual')} style={{ background: large ? project.accent : project.thumbnailBackground ?? '#fff8e9' }}>
      <div className="visualGlow" />
      {!failed ? (
        <picture className="visualPicture">
          {!useOriginal && (large
            ? <source media="(max-width: 700px)" srcSet={card + ' 1x, ' + medium + ' 2x, ' + source + ' 3x'} />
            : <source srcSet={card + ' 720w, ' + medium + ' 960w, ' + source + ' 1600w'} sizes={sizes} />
          )}
          <Image
            src={large || useOriginal ? source : card}
            unoptimized
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            alt={project.name + ' — ' + (large ? 'original project artwork' : 'portfolio thumbnail')}
            fill
            sizes={sizes}
            priority={priority && !large}
            loading={priority ? 'eager' : undefined}
            fetchPriority={priority ? 'high' : undefined}
            onError={() => { if (!useOriginal) setUseOriginal(true); else setFailed(true); }}
          />
        </picture>
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
