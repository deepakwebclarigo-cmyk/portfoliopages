import './globals.css';
import './brand-fonts.css';
import './case-stories.css';
import './motion.css';
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
      <body>
        <a className="skipLink" href="#main-content">Skip to content</a>
        <ScrollMotion />
        <PortfolioWebGL />
        {children}
      </body>
    </html>
  );
}
