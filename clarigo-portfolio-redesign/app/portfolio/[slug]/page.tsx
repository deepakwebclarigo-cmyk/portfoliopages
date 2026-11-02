import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import SiteHeader from '../../../components/SiteHeader';
import ProjectVisual from '../../../components/ProjectVisual';
import ProjectGallery from '../../../components/ProjectGallery';
import CaseNavigation from '../../../components/CaseNavigation';
import { mobileProjects, projects, webProjects } from '../../../lib/projects';
import { projectContent } from '../../../lib/project-content';

type DetailProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.name + ' — ' + (project.kind === 'web' ? 'Web' : 'Mobile') + ' Project',
    description: project.summary,
    alternates: { canonical: '/portfolio/' + project.slug },
    openGraph: { title: project.name + ' | Clarigo Infotech', description: project.summary, url: '/portfolio/' + project.slug, images: [{ url: project.image, alt: project.name + ' original project artwork' }], type: 'article' },
    twitter: { card: 'summary_large_image', title: project.name + ' | Clarigo Infotech', description: project.summary, images: [project.image] },
  };
}

export default async function Detail({ params }: DetailProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const content = projectContent[slug];
  const projectList = project.kind === 'web' ? webProjects : mobileProjects;
  const index = projectList.indexOf(project);
  const next = projectList[(index + 1) % projectList.length];
  const related = [1, 2, 3].map((offset) => projectList[(index + offset) % projectList.length]);
  const screens = project.gallery.filter((asset) => project.kind === 'mobile' ? asset.source.includes('/screenshots/') : /\/web\/.*-web-\d\.png$/i.test(asset.source));
  const gallery = screens.length ? screens : project.gallery.length ? project.gallery : [project.artwork];
  const schema = {
    '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.name, description: project.summary,
    url: 'https://clarigoinfotech.com/portfolio/' + project.slug, image: 'https://clarigoinfotech.com' + project.image,
    isPartOf: { '@type': 'CollectionPage', name: 'Clarigo Infotech Portfolio', url: 'https://clarigoinfotech.com/portfolio' },
    about: project.discipline,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <SiteHeader />
      <main id="main-content" className={'casePage ' + project.kind + 'Case'} style={{ '--project-color': project.accent } as React.CSSProperties}>
        <section className="caseHero shell">
          <Link className="backLink" href="/#portfolio"><ArrowLeft size={16} /> All projects</Link>
          <div className="caseHeroGrid">
            <div className="caseIntro">
              <div className="eyebrow"><span className="statusDot" /> {project.kind === 'web' ? 'WEB EXPERIENCE' : 'MOBILE EXPERIENCE'} / {String(index + 1).padStart(2, '0')}</div>
              <h1>{project.name}<span>.</span></h1>
              <p>{project.summary}</p>
              <div className="caseMeta">
                <div><span>PROJECT TYPE</span><strong>{project.category}</strong></div>
                <div><span>FOCUS</span><strong>{project.discipline}</strong></div>
              </div>
            </div>
            <div className="caseVisual">
              <div className="caseVisualGlow" aria-hidden="true" />
              <ProjectVisual project={project} large priority />
              <span className="visualCaption">ORIGINAL PROJECT ARTWORK</span>
            </div>
          </div>
        </section>
        <CaseNavigation key={project.slug + '-navigation'} showDeviceViews={project.kind === 'web'} />
        <section className="caseSection shell" id="overview" data-reveal>
          <div className="sectionLabel"><span>01</span> PROJECT OVERVIEW</div>
          <div className="caseTwoCol"><h2>{content.headline}</h2><div className="caseBody"><p>{content.overview}</p>{project.note && <aside className="sourceNote"><p>{project.note}</p></aside>}</div></div>
        </section>
        <section className="caseBand" id="features" data-reveal>
          <div className="shell">
            <div className="sectionLabel"><span>02</span> KEY FEATURES</div>
            <div className="caseFeatureHeading"><h2>A closer look at<br />the experience<span>.</span></h2><p>The flows and interface elements visible in {project.name}&apos;s original project material.</p></div>
            <div className="caseFeatureGrid">{content.features.map(([title, description], featureIndex) => <article key={title}><span className="approachNumber">{String(featureIndex + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
          </div>
        </section>
        <section className="caseSection shell" id="design" data-reveal>
          <div className="sectionLabel"><span>03</span> DESIGN DIRECTION</div>
          <div className="caseTwoCol"><div><h2>Its own identity.<br />In every detail<span>.</span></h2><span className="disciplineTag">{project.discipline}</span></div><div className="caseBody"><p>{content.design}</p><div className="designEvidence"><Check size={16} aria-hidden="true" /><span>Design observations from the supplied project artwork.</span></div></div></div>
        </section>
        <section className="screenSection" id="screens" data-reveal>
          <div className="shell">
            <div className="sectionLabel"><span>04</span> UI SCREENSHOTS &amp; ARTWORK</div>
            <div className="screenHeader"><h2>Inside {project.name}<span>.</span></h2><p>Explore the original {screens.length ? 'interface screens' : 'design compositions'}. Select any image for a closer look.</p></div>
            <ProjectGallery key={project.slug} images={gallery} name={project.name} kind={project.kind} />
          </div>
        </section>
        {project.kind === 'web' && <section className="caseSection shell" id="responsive" data-reveal>
          <div className="sectionLabel"><span>05</span> RESPONSIVE DESIGN PRESENTATION</div>
          <div className="caseTwoCol"><h2>A view across<br />the original devices<span>.</span></h2><div className="caseBody"><p>{project.name}&apos;s original portfolio composition presents the website on laptop and tablet devices. The artwork below preserves those supplied layouts together, with their original proportions.</p><p className="subtleCopy">These are source mockups of the project, rather than a new rendering of its live website.</p></div></div>
          <figure className="devicePresentation"><Image src={project.image} unoptimized alt={project.name + ' original laptop and tablet website presentation'} width={project.artwork.width} height={project.artwork.height} sizes="(max-width: 700px) 100vw, 80vw" /><figcaption>{project.name} / Original device composition</figcaption></figure>
        </section>}
        <section className="projectSource shell" aria-label="Project sources">
          <div><div className="eyebrow">SOURCE MATERIAL</div><p>Project descriptions are based on the published artwork and available overview. Interface observations do not imply verified implementation details or measured business results.</p></div>
          <a href={project.legacy ?? 'https://clarigo-voluble-youtiao-e0781d.netlify.app/app-portfolio'} target="_blank" rel="noreferrer">{project.legacy ? 'Original project page' : 'Original portfolio listing'} <ArrowUpRight size={16} /></a>
        </section>
        <section className="nextProjectBand">
          <Link className="shell nextProjectLink" href={'/portfolio/' + next.slug}><span><small>NEXT {project.kind === 'web' ? 'WEB' : 'MOBILE'} PROJECT</small><strong>{next.name}</strong></span><ArrowRight size={36} /></Link>
        </section>
        <section className="relatedSection shell" data-reveal>
          <div className="relatedHeading"><div><div className="eyebrow">KEEP EXPLORING</div><h2>More perspectives<span>.</span></h2></div><Link href="/#portfolio">View all work <ArrowUpRight size={16} /></Link></div>
          <div className="relatedGrid">{related.map((item) => <Link href={'/portfolio/' + item.slug} className="relatedCard" key={item.slug}><div className="relatedImage"><ProjectVisual project={item} /></div><span>{item.discipline}</span><strong>{item.name}</strong><ArrowRight size={17} /></Link>)}</div>
        </section>
        <section className="caseCta"><div className="shell caseCtaInner" data-reveal><div><div className="eyebrow">HAVE A PROJECT IN MIND?</div><h2>Let&apos;s make your<br /><span>next idea real.</span></h2></div><a className="buttonPrimary" href="https://clarigoinfotech.com/contact">Book a free consultation <ArrowUpRight size={17} /></a></div></section>
      </main>
      <footer className="siteFooter shell"><Link href="/" className="footerBrand"><img src="/images/brand/clarigo.png" alt="Clarigo Infotech" width="136" height="42" /></Link><span>AI-first engineering · 10+ years of delivery</span><span>© {new Date().getFullYear()} Clarigo Infotech</span></footer>
    </>
  );
}
