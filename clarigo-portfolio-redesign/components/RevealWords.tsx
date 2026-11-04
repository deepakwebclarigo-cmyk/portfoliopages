import type { CSSProperties } from 'react';

// Real text and normal spaces preserve headings, wrapping, SEO, and no-JS access.
export default function RevealWords({ text, start = 0 }: { text: string; start?: number }) {
  let index = start;
  return <>{text.split(/(\s+)/).map((word, position) => /^\s+$/.test(word) ? word : (
    <span className="motionWordMask" key={position}><span className="motionWord" style={{ '--word-index': index++ } as CSSProperties}>{word}</span></span>
  ))}</>;
}
