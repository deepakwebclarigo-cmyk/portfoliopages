import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';

export default function NotFound() {
  return <><SiteHeader /><main id="main-content" className="shell notFound"><div className="eyebrow">404 / PROJECT NOT FOUND</div><h1>Let&apos;s find your<br />next perspective.</h1><p>This page is unavailable. Explore the full collection of 19 web and 28 mobile projects.</p><Link href="/#portfolio" className="buttonPrimary">Explore all projects</Link></main></>;
}
