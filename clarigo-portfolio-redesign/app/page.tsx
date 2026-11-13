import Link from '../components/PortfolioLink';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import PortfolioClient from '../components/PortfolioClient';
import { projects } from '../lib/projects';

// Listing metadata belongs to this leaf route; the shared layout only owns brand defaults.
export const metadata: Metadata = {
  description: 'Explore selected web and mobile projects from Clarigo Infotech.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Selected Work | Clarigo Infotech',
    description: 'Explore selected web and mobile projects from Clarigo Infotech.',
    type: 'website',
    url: '/portfolio',
  },
  twitter: { card: 'summary', title: 'Selected Work | Clarigo Infotech', description: 'Explore selected web and mobile projects from Clarigo Infotech.' },
};

export default function Home() {
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Clarigo Infotech Portfolio', url: 'https://clarigoinfotech.com/portfolio', mainEntity: { '@type': 'ItemList', numberOfItems: projects.length, itemListElement: projects.map((project, index) => ({ '@type': 'ListItem', position: index + 1, name: project.name, url: 'https://clarigoinfotech.com/portfolio/' + project.slug, image: 'https://clarigoinfotech.com' + project.image })) } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <PortfolioClient projects={projects.map(({ slug, name, archiveName, category, kind, image, thumbnail, thumbnailBackground, accent, summary, discipline }) => ({ slug, name, archiveName, category, kind, image, thumbnail, thumbnailBackground, accent, summary, discipline }))} />
      </main>
      <footer className="siteFooter shell">
        <Link href="/" className="footerBrand" aria-label="Clarigo portfolio home">
          <img src="/images/brand/clarigo.png" alt="Clarigo Infotech" width="136" height="42" />
        </Link>
        <a href="https://clarigoinfotech.com/contact">Start a conversation <ArrowUpRight size={15} /></a>
        <span>© {new Date().getFullYear()} Clarigo Infotech</span>
      </footer>
    </>
  );
}
