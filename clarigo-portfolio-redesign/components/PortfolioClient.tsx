'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import type { Project } from '../lib/projects';
import ProjectVisual from './ProjectVisual';

const PortfolioScene = dynamic(() => import('./PortfolioScene'), {
  ssr: false,
  loading: () => <div className="sceneFallback" aria-hidden="true" />,
});

const filters = ['All projects', 'Web & web apps', 'Mobile apps'] as const;

export type PortfolioCard = Pick<Project, 'slug' | 'name' | 'archiveName' | 'category' | 'kind' | 'image' | 'accent' | 'summary' | 'discipline'>;

export default function PortfolioClient({ projects }: { projects: PortfolioCard[] }) {
  const reducedMotion = useReducedMotion();
  const webProjects = projects.filter((project) => project.kind === 'web');
  const mobileProjects = projects.filter((project) => project.kind === 'mobile');
  const [category, setCategory] = useState<(typeof filters)[number]>('All projects');
  const [search, setSearch] = useState('');
  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === 'All projects' || project.category === category;
      return matchesCategory && (!query || `${project.name} ${project.archiveName} ${project.category} ${project.discipline} ${project.summary}`.toLowerCase().includes(query));
    });
  }, [category, search, projects]);

  return (
    <>
      <section className="heroSection">
        <div className="heroGlow" aria-hidden="true" />
        <div className="heroInner shell">
          <div className="heroCopy">
            <div className="eyebrow"><span className="statusDot" /> AI-FIRST ENGINEERING · 10+ YEARS OF DELIVERY</div>
            <h1>Built for what&apos;s <span>next.</span></h1>
            <p>Explore selected web and mobile projects from Clarigo&apos;s public portfolio.</p>
            <div className="heroActions">
              <a className="buttonPrimary" href="#portfolio">Explore selected work <ArrowDown size={17} /></a>
              <a className="buttonSecondary" href="https://clarigoinfotech.com/contact">Let&apos;s build together <ArrowUpRight size={17} /></a>
            </div>
            <div className="inventory" aria-label="Portfolio inventory">
              <div><strong>{webProjects.length}</strong><span>Web projects</span></div>
              <div><strong>{mobileProjects.length}</strong><span>Mobile projects</span></div>
              <div><strong>20+</strong><span>Countries served</span></div>
            </div>
          </div>
          <div className="heroScene" aria-hidden="true"><PortfolioScene /></div>
          <div className="heroScroll"><span /> SCROLL TO EXPLORE</div>
        </div>
      </section>

      <section className="portfolioSection shell" id="portfolio">
        <div className="portfolioHeading" data-reveal>
          <div>
            <div className="eyebrow">SELECTED WORK / THE PORTFOLIO</div>
            <h2>Ideas into <span>experiences.</span></h2>
          </div>
          <p>From social communities to everyday tools. Explore {projects.length} web and mobile projects, their interfaces, and the details that give each one its own identity.</p>
        </div>

        <div className="portfolioControls">
          <div className="filterGroup" role="group" aria-label="Filter projects by type">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={`filterPill ${category === filter ? 'isActive' : ''}`}
                aria-pressed={category === filter}
                onClick={() => setCategory(filter)}
              >
                {filter}
                {filter === 'Web & web apps' && <span>{webProjects.length}</span>}
                {filter === 'Mobile apps' && <span>{mobileProjects.length}</span>}
              </button>
            ))}
          </div>
          <label className="searchField">
            <Search size={17} aria-hidden="true" />
            <input
              type="search"
              aria-label="Search projects"
              placeholder="Search projects"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        <div className="resultMeta" aria-live="polite">
          <span>{String(visible.length).padStart(2, '0')} PROJECTS</span>
          <span>SELECT A PROJECT TO EXPLORE <ArrowRight size={14} /></span>
        </div>

        {visible.length ? (
          <div className="projectGrid">
            {visible.map((project, index) => (
              <motion.article
                key={project.slug}
                className="projectCard"
                initial={false}
                transition={{ duration: .22, ease: [.22, 1, .36, 1] }}
                whileHover={reducedMotion ? undefined : { y: -3 }}
              >
                <Link href={`/portfolio/${project.slug}`} className="projectLink" prefetch={false}>
                  <div className="projectArt">
                    <ProjectVisual project={project} />
                    <span className="projectOpen" aria-hidden="true"><ArrowUpRight size={20} /></span>
                    <span className="projectIndex">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="projectInfo">
                    <div>
                      <span className="projectType">{project.kind === 'web' ? 'WEB' : 'MOBILE'} / {project.discipline}</span>
                      <h3>{project.name}</h3>
                      {project.archiveName !== project.name && <small className="archiveAlias">Archive: {project.archiveName}</small>}
                    </div>
                    <span className="projectArrow" aria-hidden="true"><ArrowRight size={20} /></span>
                  </div>
                  <p className="projectSummary">{project.summary}</p>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="emptyState" role="status">No projects match that search. Try another name or project type.</div>
        )}
      </section>

      <section className="portfolioEnd">
        <div className="shell endInner" data-reveal>
          <div>
            <div className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</div>
            <h2>Let&apos;s build something <span>that matters.</span></h2>
          </div>
          <a className="buttonPrimary" href="https://clarigoinfotech.com/contact">Book a free consultation <ArrowUpRight size={17} /></a>
        </div>
      </section>
    </>
  );
}
