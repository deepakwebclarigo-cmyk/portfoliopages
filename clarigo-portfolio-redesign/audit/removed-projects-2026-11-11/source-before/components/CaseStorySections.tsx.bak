import Image from 'next/image';
import Link from './PortfolioLink';
import type { CSSProperties } from 'react';
import { ArrowRight, ArrowUpRight, Check, Layers3, Search, Users, LayoutGrid } from 'lucide-react';
import type { Project, ProjectAsset } from '../lib/projects';
import type { ProjectStory } from '../lib/project-story';

const featureIcons = [Layers3, Search, Users, LayoutGrid];

export function FeatureShowcase({ project, features, intro, asset }: { project: Project; features: [string, string][]; intro: string; asset?: ProjectAsset }) {
  const portrait = asset && asset.height > asset.width;
  function column(items: [string, string][], offset: number) {
    return <div className="featureColumn">{items.map(([title, text], index) => {
      const Icon = featureIcons[index + offset];
      return <article key={title}><span className="featureIcon"><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></article>;
    })}</div>;
  }
  return <section className="caseBand" id="features" data-reveal><div className="shell">
    <div className="storySectionHeading"><div className="sectionLabel"><span>02</span> KEY FEATURES</div><h2>Designed around<br />the experience<span>.</span></h2><p>{intro}</p></div>
    <div className={'caseFeatureGrid featureShowcase ' + (!asset ? 'featureCardsOnly' : portrait ? 'featurePortrait' : 'featureWide')}>
      {column(features.slice(0, 2), 0)}
      {asset && <figure className="featureArtwork"><div className="featureImageFrame" style={{ '--image-ratio': asset.width / asset.height } as CSSProperties}><Image src={asset.src} unoptimized alt={project.name + ' original interface detail'} width={asset.width} height={asset.height} sizes="(max-width: 700px) 85vw, 35vw" /></div><figcaption>{project.name} / Original interface</figcaption></figure>}
      {column(features.slice(2), 2)}
    </div>
  </div></section>;
}

export function WorkflowSection({ name, story }: { name: string; story: ProjectStory }) {
  return <section className="workflowSection" id="workflow" data-reveal><div className="shell">
    <div className="storySectionHeading"><div className="sectionLabel"><span>03</span> PRODUCT JOURNEY</div><h2>How {name} works<span>.</span></h2><p>{story.workflowIntro}</p></div>
    <ol className="workflowSteps">{story.steps.map(([title, text], index) => <li key={title}><div className="workflowStepTop"><span>{String(index + 1).padStart(2, '0')}</span>{index < story.steps.length - 1 && <ArrowRight size={25} strokeWidth={1.4} aria-hidden="true" />}</div><h3>{title}</h3><p>{text}</p></li>)}</ol>
  </div></section>;
}

export function ProblemSection({ name, story, asset }: { name: string; story: ProjectStory; asset?: ProjectAsset }) {
  return <section className="caseSection shell problemSection" id="solution" data-reveal>
    <div className="sectionLabel"><span>04</span> DESIGN CHALLENGE &amp; SOLUTION</div>
    <div className={'problemGrid ' + (!asset ? 'problemWithoutImage' : '')}><div><h2>{story.problem.title}</h2><p className="storyLead">{story.problem.text}</p><ul className="solutionList">{story.solutions.map(([title, text]) => <li key={title}><span className="solutionCheck"><Check size={17} aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul></div>
      {asset && <figure className="solutionArtwork"><div className="solutionImageFrame" style={{ '--image-ratio': asset.width / asset.height } as CSSProperties}><Image src={asset.src} unoptimized alt={name + ' original supporting interface view'} width={asset.width} height={asset.height} sizes="(max-width: 700px) 85vw, 40vw" /></div><figcaption>{name} / Design detail</figcaption></figure>}
    </div>
  </section>;
}

export function EngineeringSection({ story }: { story: ProjectStory }) {
  return <section className="engineeringSection" id="engineering" data-reveal><div className="shell engineeringGrid">
    <div><div className="sectionLabel"><span>06</span> TECHNICAL PERSPECTIVE</div><h2>{story.engineering.title}</h2><p>{story.engineering.text}</p><ul className="engineeringTopics">{story.engineering.topics.map((topic) => <li key={topic}><Check size={14} aria-hidden="true" />{topic}</li>)}</ul></div>
    <aside className="engineeringToolkit" aria-label="Clarigo company technology capabilities"><div className="toolkitOrbit" aria-hidden="true" /><div className="eyebrow">CLARIGO ENGINEERING TOOLKIT</div><div className="toolkitTags">{['React', 'Next.js', 'Node.js', 'Flutter', 'Python', 'Docker'].map((name) => <span key={name}>{name}</span>)}</div><p>Published company capabilities. The original project material does not identify a project-specific technology stack.</p><a href="https://clarigoinfotech.com/services/app-development">Explore Clarigo&apos;s app development <ArrowUpRight size={15} /></a></aside>
  </div></section>;
}

export function ProjectClosing({ project, story, companion }: { project: Project; story: ProjectStory; companion?: Project }) {
  return <section className="caseCta" id="next-step"><div className="shell projectClosing" data-reveal><div><div className="eyebrow">YOUR NEXT PRODUCT</div><h2>Inspired by<br /><span>{project.name}?</span></h2><p>{story.cta}</p></div><div className="closingActions"><a className="buttonPrimary" href="https://clarigoinfotech.com/contact">Discuss your project <ArrowUpRight size={17} /></a>{companion && <Link className="buttonSecondary" href={'/portfolio/' + companion.slug}>Explore the {companion.kind === 'web' ? 'web' : 'mobile'} project <ArrowRight size={17} /></Link>}<Link className="closingAllWork" href="/#portfolio">Browse all 47 projects <ArrowRight size={16} /></Link></div></div></section>;
}
