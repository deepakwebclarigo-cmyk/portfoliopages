import inventory from './project-inventory.json';
import assets from './project-assets.json';
import exclusions from './asset-exclusions.json';
import { projectContent } from './project-content';

export type ProjectAsset = { src: string; width: number; height: number; source: string; sha256: string };

export type Project = {
  slug: string;
  name: string;
  archiveName: string;
  kind: 'web' | 'mobile';
  category: 'Web & web apps' | 'Mobile apps';
  image: string;
  legacy?: string;
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
  livsocial: '#fff1ce', streamdatax: '#e5e4ff', 'little-butterflies': '#ffe9d3', tukeeconnect: '#deecfa', beliri: '#e9e8e6', printlific: '#e1e7ff',
  nerdrabbit: '#eddcff', parachute: '#deefff', 'glocal-expert': '#fff2bf', 'mercury-mailroom': '#dce9f7', umeed: '#ffe1ec', 'alum-connect': '#ddf4f5',
  kegelklock: '#fff3b9', 'br-tennis': '#e2e8f3', 'network-capital': '#ffe6c9', whizara: '#eee5fb', 'es-platform': '#deefff', 'been-there': '#dbf0e8', 'lead-management': '#ffead7',
  'app-livsocial': '#fff1ce', 'app-simply-recruited': '#e1e7f7', 'app-infinote': '#e0e9df', 'app-silasync': '#e4f7d3', 'app-digital-habit-tracker': '#e9e3ff',
  'app-tukeeconnect': '#deecfa', 'app-pace-of-play': '#dceee4', 'app-qcop-app': '#e1e9f7', 'app-little-butterflies': '#ffead0', 'app-case-management-ase': '#ddedf8',
  'app-printlific': '#eae1ff', 'app-law-legend': '#e0ecff', 'app-racepace': '#e7e5ff', 'app-been-there': '#dcefe7', 'app-one-pantry': '#ebf7d9', 'app-escapethehoa': '#e4f4d8',
  'app-dateflow': '#ffe3e6', 'app-meravyaah': '#ffe2e7', 'app-beliri': '#e9e8e6', 'app-fynmate': '#e5e6ff', 'app-street-sheets': '#eee2fb', 'app-ummed': '#ffe1e5',
  'app-bubble': '#ddf4f5', 'app-kegalklock': '#fff3bd', 'app-gymbet': '#daf8ef', 'app-gobroker': '#e7e6eb', 'app-heartsync': '#eae0f5', 'app-supplement-management': '#e1f1db',
};

export const projects: Project[] = inventory.map((item) => {
  const content = projectContent[item.slug];
  const local = (assets as Record<string, { poster: ProjectAsset; images: ProjectAsset[] }>)[item.slug];
  if (!content || !local?.poster?.src) throw new Error('Project source is incomplete: ' + item.slug);
  const kind = item.kind as Project['kind'];
  return {
    slug: item.slug, name: content.displayName ?? item.name, archiveName: item.name, kind,
    category: kind === 'web' ? 'Web & web apps' : 'Mobile apps',
    image: local.poster.src, artwork: local.poster,
    gallery: local.images.filter((asset) => !Object.hasOwn((exclusions as Record<string, Record<string, string>>)[item.slug] ?? {}, decodeURIComponent(asset.source.split('/').pop() ?? ''))),
    legacy: item.page ? host + '/landing%20page/' + encodeURIComponent(item.page) : undefined,
    summary: content.summary, headline: content.headline, discipline: content.discipline,
    accent: colors[item.slug] ?? '#ececf2', note: content.note,
  };
});
export const webProjects = projects.filter((project) => project.kind === 'web');
export const mobileProjects = projects.filter((project) => project.kind === 'mobile');
