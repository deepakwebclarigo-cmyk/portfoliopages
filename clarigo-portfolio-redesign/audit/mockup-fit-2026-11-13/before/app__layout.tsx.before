import './globals.css';
import './brand-fonts.css';
import './case-stories.css';
import './motion.css';
import './quality.css';
import './project-identities.css';
import type { Metadata } from 'next';
import ScrollMotion from '../components/ScrollMotion';
import PortfolioWebGL from '../components/PortfolioWebGL';

export const metadata: Metadata = {
  metadataBase: new URL('https://clarigoinfotech.com'),
  title: {
    default: 'Selected Work | Clarigo Infotech',
    template: '%s | Clarigo Infotech',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><link rel="preload" href="/fonts/geist-9b6f5ff45b.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head>
      <body>
        <a className="skipLink" href="#main-content">Skip to content</a>
        <ScrollMotion />
        <PortfolioWebGL />
        {children}
      </body>
    </html>
  );
}
