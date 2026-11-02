import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const inventory = JSON.parse(await readFile(new URL('lib/project-inventory.json', root), 'utf8'));
const assets = JSON.parse(await readFile(new URL('lib/project-assets.json', root), 'utf8'));
const exclusions = JSON.parse(await readFile(new URL('lib/asset-exclusions.json', root), 'utf8'));
const lines = ['# Portfolio route and image inventory', '', '19 web projects and 28 mobile projects. Gallery counts describe the selected source screens or compositions; no additional client screenshots were created.', '', '| Type | Archive label | Local detail route | Gallery images | Original source |', '| --- | --- | --- | ---: | --- |'];
for (const item of inventory) {
  const set = assets[item.slug];
  const images = set.images.filter((asset) => !Object.hasOwn(exclusions[item.slug] ?? {}, decodeURIComponent(asset.source.split('/').pop())));
  const screens = images.filter((asset) => item.kind === 'mobile' ? asset.source.includes('/screenshots/') : /\/web\/.*-web-\d\.png$/i.test(asset.source));
  const count = screens.length || images.length || 1;
  const original = item.page ? 'https://clarigo-voluble-youtiao-e0781d.netlify.app/landing%20page/' + encodeURIComponent(item.page) : 'https://clarigo-voluble-youtiao-e0781d.netlify.app/app-portfolio';
  lines.push('| ' + item.kind + ' | ' + item.name + ' | [`/portfolio/' + item.slug + '`](http://localhost:3100/portfolio/' + item.slug + ') | ' + count + ' | [Source](' + original + ') |');
}
lines.push('', 'Source-identity exceptions and visual exclusions are documented in [CONTINUATION.md](CONTINUATION.md). The machine-readable local source/checksum mapping is `lib/project-assets.json`.', '');
await writeFile(new URL('audit/PROJECTS.md', root), lines.join('\n'));
console.log('Wrote all ' + inventory.length + ' project routes.');
