import inventory from './project-inventory.json';
import assets from './project-assets.json';
import thumbnails from './project-thumbnails.json';
import { projectContent } from './project-content';

export type ProjectAsset = { src: string; width: number; height: number; role: string; gallery: boolean; sha256: string; label?: string; description?: string };

export type Project = {
  slug: string;
  name: string;
  archiveName: string;
  kind: 'web' | 'mobile';
  category: 'Web & web apps' | 'Mobile apps';
  image: string;
  thumbnail: string;
  legacy?: string;
  rebranded?: boolean;
  summary: string;
  headline: string;
  discipline: string;
  accent: string;
  gallery: ProjectAsset[];
  artwork: ProjectAsset;
  note?: string;
};

const host = 'https://clarigo-voluble-youtiao-e0781d.netlify.app';
const colors: Record<string, string> = {
  livsocial: '#fff1ce', streamdexa: '#e5e4ff', 'little-butterflies': '#ffe9d3', 'tukora-connect': '#deecfa', beliri: '#e9e8e6', printlific: '#e1e7ff',
  nerdrabbit: '#eddcff', paranest: '#deefff', 'glocal-expert': '#fff2bf', 'mercury-mailroom': '#dce9f7', umeed: '#fff3d6', 'alumvia': '#ddf4f5',
  kegeltempo: '#fff3b9', 'rallybridge': '#e2e8f3', 'network-capital': '#ffe6c9', whizlume: '#eee5fb', 'estrata': '#deefff', 'been-there': '#dbf0e8', 'leadforma': '#ffead7',
  'app-livsocial': '#fff1ce', 'app-simplyscouted': '#e1e7f7', 'app-infinote': '#e0e9df', 'app-silaflow': '#e4f7d3', 'app-habitstride': '#e9e3ff',
  'app-tukora-connect': '#deecfa', 'app-pace-of-play': '#dceee4', 'app-qcop-app': '#e1e9f7', 'app-little-butterflies': '#ffead0', 'app-case-management-ase': '#ddedf8',
  'app-printlific': '#eae1ff', 'app-racepace': '#e7e5ff', 'app-been-there': '#dcefe7', 'app-pantryone': '#ebf7d9', 'app-escapethehoa': '#e4f4d8',
  'app-dateflow': '#ffe3e6', 'app-meravyaah': '#ffe2e7', 'app-beliri': '#e9e8e6', 'app-fynmate': '#e5e6ff', 'app-streetslate': '#eee2fb', 'app-ummed': '#ffe1e5',
  'app-bubble': '#ddf4f5', 'app-kegeltempo': '#fff3bd', 'app-heartsync': '#eae0f5', 'app-supplement-management': '#e1f1db',
};

export const projects: Project[] = inventory.map((item) => {
  const content = projectContent[item.slug];
  const local = (assets as Record<string, { poster: ProjectAsset; images: ProjectAsset[] }>)[item.slug];
  const thumbnail = (thumbnails as Record<string, { src: string }>)[item.slug];
  if (!content || !local?.poster?.src || !thumbnail?.src) throw new Error('Project source is incomplete: ' + item.slug);
  const kind = item.kind as Project['kind'];
  return {
    slug: item.slug, name: content.displayName ?? item.name, archiveName: item.name, kind,
    category: kind === 'web' ? 'Web & web apps' : 'Mobile apps',
    image: local.poster.src, thumbnail: thumbnail.src, artwork: local.poster,
    gallery: local.images,
    rebranded: 'rebranded' in item && Boolean(item.rebranded),
    legacy: item.page ? host + '/landing%20page/' + encodeURIComponent(item.page) : undefined,
    summary: content.summary, headline: content.headline, discipline: content.discipline,
    accent: colors[item.slug] ?? '#ececf2', note: content.note,
  };
});
export const webProjects = projects.filter((project) => project.kind === 'web');
export const mobileProjects = projects.filter((project) => project.kind === 'mobile');
