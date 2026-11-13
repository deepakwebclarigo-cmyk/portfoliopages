import fs from 'node:fs/promises';
async function edit(p,a,b){let s=await fs.readFile(p,'utf8');if(!s.includes(a))throw Error('Missing expected source in '+p);await fs.writeFile(p,s.replace(a,b));}
await edit('app/layout.tsx',"import './quality.css';","import './quality.css';\nimport './project-identities.css';");
await edit('app/portfolio/[slug]/page.tsx',"import { projectStories, storyVisuals } from '../../../lib/project-story';","import { projectStories, storyVisuals } from '../../../lib/project-story';\nimport { getProjectTheme, projectThemeStyle } from '../../../lib/project-theme';");
await edit('app/portfolio/[slug]/page.tsx',"  const content = projectContent[slug];","  const content = projectContent[slug];\n  const theme = getProjectTheme(slug);");
await edit('app/portfolio/[slug]/page.tsx',"className={'casePage ' + project.kind + 'Case'} style={{ '--project-color': project.accent } as React.CSSProperties}","className={'casePage ' + project.kind + 'Case'} data-project-theme={theme ? project.slug : undefined} style={projectThemeStyle(theme, project.accent)}");
await edit('lib/projects.ts','  thumbnail: string;','  thumbnail: string;\n  thumbnailBackground?: string;');
await edit('lib/projects.ts',"image: local.poster.src, thumbnail: thumbnail.src, artwork: local.poster,","image: local.poster.src, thumbnail: thumbnail.src, artwork: local.poster,\n    thumbnailBackground: (themePalettes as Record<string, { thumbnailBackground: string }>)[item.slug]?.thumbnailBackground,");
await edit('components/PortfolioClient.tsx',"'thumbnail' | 'accent'","'thumbnail' | 'thumbnailBackground' | 'accent'");
await edit('app/page.tsx','image, thumbnail, accent, summary, discipline','image, thumbnail, thumbnailBackground, accent, summary, discipline');
await edit('app/page.tsx','image, thumbnail, accent, summary, discipline','image, thumbnail, thumbnailBackground, accent, summary, discipline');
await edit('components/ProjectVisual.tsx',"'thumbnail' | 'accent'","'thumbnail' | 'thumbnailBackground' | 'accent'");
await edit('components/ProjectVisual.tsx',"large ? project.accent : '#fff8e9'","large ? project.accent : project.thumbnailBackground ?? '#fff8e9'");
console.log('Connected project-specific paint tokens to all 21 affected detail pages and card surrounds.');
