import './globals.css';
import './brand-fonts.css';
import type { Metadata } from 'next';
import ScrollMotion from '../components/ScrollMotion';

export const metadata: Metadata = {
  metadataBase: new URL('https://clarigoinfotech.com'),
  title: {
    default: 'Selected Work | Clarigo Infotech',
    template: '%s | Clarigo Infotech',
  },
  description: 'Explore selected web and mobile projects from Clarigo Infotech.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Selected Work | Clarigo Infotech',
    description: 'Explore selected web and mobile projects from Clarigo Infotech.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skipLink" href="#main-content">Skip to content</a>
        <ScrollMotion />
        {children}
      </body>
    </html>
  );
}
