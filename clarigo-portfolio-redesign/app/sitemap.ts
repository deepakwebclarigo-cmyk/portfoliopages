import type { MetadataRoute } from 'next';
import { projects } from '../lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://clarigoinfotech.com/portfolio', priority: 1 }, ...projects.map(({ slug }) => ({ url: 'https://clarigoinfotech.com/portfolio/' + slug, priority: 0.7 }))];
}
