import { readFile, access } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const inventory = JSON.parse(await readFile(new URL('lib/project-inventory.json', root), 'utf8'));
const manifest = JSON.parse(await readFile(new URL('.next-production/prerender-manifest.json', root), 'utf8'));
for (const { slug } of inventory) {
  const route = '/portfolio/' + slug;
  const entry = manifest.routes[route];
  if (entry?.dataRoute !== route + '.rsc' || entry?.srcRoute !== '/portfolio/[slug]') throw new Error('Incomplete Next.js route-cache metadata: ' + route);
  await access(new URL('.next-production/server/app' + route + '.html', root));
  await access(new URL('.next-production/server/app' + route + '.rsc', root));
}
console.log('Verified HTML, RSC output, and route-cache metadata for all ' + inventory.length + ' project pages.');
