import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from '../../../components/PortfolioLink';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import SiteHeader from '../../../components/SiteHeader';
import ProjectVisual from '../../../components/ProjectVisual';
import ProjectGallery from '../../../components/ProjectGallery';
import MotionDepth from '../../../components/MotionDepth';
import RevealWords from '../../../components/RevealWords';
import CaseNavigation from '../../../components/CaseNavigation';
import { EngineeringSection, FeatureShowcase, ProblemSection, ProjectClosing, WorkflowSection } from '../../../components/CaseStorySections';
import { mobileProjects, projects, webProjects } from '../../../lib/projects';
import { projectContent } from '../../../lib/project-content';
import { projectStories, storyVisuals } from '../../../lib/project-story';

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
  const screens = project.gallery.filter((asset) => asset.gallery);
  const gallery = screens.length ? screens : project.gallery.length ? project.gallery : [project.artwork];
  const story = projectStories[slug];
  const visualPositions = storyVisuals[slug];
  if (!story || !visualPositions || visualPositions.some((position) => !gallery[position])) throw new Error('Incomplete case-study presentation: ' + slug);
  const companionPair = [
    ['livsocial', 'app-livsocial'], ['little-butterflies', 'app-little-butterflies'],
    ['tukioconnect', 'app-tukioconnect'], ['beliri', 'app-beliri'],
    ['printlific', 'app-printlific'], ['been-there', 'app-been-there'], ['kegelklock', 'app-kegalklock'],
  ].find((pair) => pair.includes(slug));
  const companion = companionPair && projects.find((item) => item.slug === companionPair.find((value) => value !== slug));
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
              <h1 aria-label={project.name}><RevealWords text={project.name} /><span aria-hidden="true">.</span></h1>
              <p>{project.summary}</p>
              <div className="caseMeta">
                <div><span>PROJECT TYPE</span><strong>{project.category}</strong></div>
                <div><span>FOCUS</span><strong>{project.discipline}</strong></div>
              </div>
            </div>
            <MotionDepth className="heroDepth" tilt={0}><div className="caseVisual">
              <div className="caseVisualGlow" aria-hidden="true" />
              <ProjectVisual project={project} large priority />
              <span className="visualCaption">PROJECT ARTWORK</span>
            </div></MotionDepth>
          </div>
        </section>
        <CaseNavigation key={project.slug + '-navigation'} showDeviceViews={project.kind === 'web'} />
        <section className="caseSection shell" id="overview" data-reveal>
          <div className="sectionLabel"><span>01</span> PROJECT OVERVIEW</div>
          <div className="caseTwoCol"><h2>{content.headline}</h2><div className="caseBody"><p>{content.overview}</p>{project.note && <aside className="sourceNote"><p>{project.note}</p></aside>}</div></div>
        </section>
        <FeatureShowcase project={project} features={content.features} intro={story.featureIntro} asset={gallery.length > 1 ? gallery[visualPositions[0]] : undefined} />
        <WorkflowSection name={project.name} story={story} />
        <ProblemSection name={project.name} story={story} asset={gallery.length > 1 && visualPositions[0] !== visualPositions[1] ? gallery[visualPositions[1]] : undefined} />
        <section className="caseSection shell" id="design" data-reveal>
          <div className="sectionLabel"><span>05</span> DESIGN DIRECTION</div>
          <div className="caseTwoCol"><div><h2>Its own identity.<br />In every detail<span>.</span></h2><span className="disciplineTag">{project.discipline}</span></div><div className="caseBody"><p>{content.design}</p><div className="designEvidence"><Check size={16} aria-hidden="true" /><span>Design observations from the supplied project artwork.</span></div></div></div>
        </section>
        <EngineeringSection story={story} />
        <section className="screenSection" id="screens" data-reveal>
          <div className="shell">
            <div className="sectionLabel"><span>07</span> UI SCREENSHOTS &amp; ARTWORK</div>
            <div className="screenHeader"><h2>Inside {project.name}<span>.</span></h2><p>Explore the original {screens.length ? 'interface screens' : 'design compositions'}. Select any image for a closer look.</p></div>
            <ProjectGallery key={project.slug} images={gallery} name={project.name} kind={project.kind} />
          </div>
        </section>
        {project.kind === 'web' && <section className="caseSection shell" id="responsive" data-reveal>
          <div className="sectionLabel"><span>08</span> RESPONSIVE DESIGN PRESENTATION</div>
          <div className="caseTwoCol"><h2>A view across<br />the original devices<span>.</span></h2><div className="caseBody"><p>{project.name}&apos;s original portfolio artwork presents the product in its supplied device composition. This presentation retains those source layouts and their original proportions.</p><p className="subtleCopy">Original project mockups, rather than newly generated screenshots of a live product.</p>{gallery.length === 1 && <a className="deviceArtworkLink" href="#screens">View the original device artwork <ArrowUpRight size={16} /></a>}</div></div>
          {gallery.length > 1 && <figure className="devicePresentation"><div className="deviceImageFrame" style={{ '--image-ratio': project.artwork.width / project.artwork.height } as React.CSSProperties}><Image src={project.image} unoptimized alt={project.name + ' original device presentation'} width={project.artwork.width} height={project.artwork.height} sizes="(max-width: 700px) 100vw, 80vw" /></div><figcaption>{project.name} / Original device composition</figcaption></figure>}
        </section>}
        <section className="projectSource shell" aria-label="Project sources">
          <div><div className="eyebrow">SOURCE MATERIAL</div><p>{project.rebranded ? 'Project names and wordmarks have been updated for this portfolio. Interface layouts come from the supplied project artwork. ' : ''}Descriptions, journeys, and design considerations interpret the artwork and available overview. They do not imply unpublished client briefs, verified implementation details, app-store availability, or measured business results.</p></div>
          <a href={project.rebranded ? 'https://clarigoinfotech.com/portfolio' : project.legacy ?? 'https://clarigo-voluble-youtiao-e0781d.netlify.app/app-portfolio'} target="_blank" rel="noreferrer">{project.rebranded ? 'Clarigo portfolio' : project.legacy ? 'Original project page' : 'Original portfolio listing'} <ArrowUpRight size={16} /></a>
        </section>
        <section className="nextProjectBand">
          <Link className="shell nextProjectLink" href={'/portfolio/' + next.slug}><span><small>NEXT {project.kind === 'web' ? 'WEB' : 'MOBILE'} PROJECT</small><strong>{next.name}</strong></span><ArrowRight size={36} /></Link>
        </section>
        <section className="relatedSection shell" data-reveal>
          <div className="relatedHeading"><div><div className="eyebrow">KEEP EXPLORING</div><h2>More perspectives<span>.</span></h2></div><Link href="/#portfolio">View all work <ArrowUpRight size={16} /></Link></div>
          <div className="relatedGrid">{related.map((item) => <Link href={'/portfolio/' + item.slug} className="relatedCard" key={item.slug}><div className="relatedImage"><ProjectVisual project={item} /></div><span>{item.discipline}</span><strong>{item.name}</strong><ArrowRight size={17} /></Link>)}</div>
        </section>
        <ProjectClosing project={project} story={story} companion={companion} />
      </main>
      <footer className="siteFooter shell"><Link href="/" className="footerBrand"><img src="/images/brand/clarigo.png" alt="Clarigo Infotech" width="136" height="42" /></Link><span>AI-first engineering · 10+ years of delivery</span><span>© {new Date().getFullYear()} Clarigo Infotech</span></footer>
    </>
  );
}
