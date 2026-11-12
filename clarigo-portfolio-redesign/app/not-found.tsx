import Link from '../components/PortfolioLink';
import SiteHeader from '../components/SiteHeader';
import { webProjects, mobileProjects } from '../lib/projects';

export default function NotFound() {
  return <><SiteHeader /><main id="main-content" tabIndex={-1} className="shell notFound"><div className="eyebrow">404 / PROJECT NOT FOUND</div><h1>Let&apos;s find your<br />next perspective.</h1><p>This page is unavailable. Explore the full collection of {webProjects.length} web and {mobileProjects.length} mobile projects.</p><Link href="/#portfolio" className="buttonPrimary">Explore all projects</Link></main></>;
}
