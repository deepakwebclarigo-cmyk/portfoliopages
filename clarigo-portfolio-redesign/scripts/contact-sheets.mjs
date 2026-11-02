import { readdir, readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
const root = new URL('../', import.meta.url);
const inventory = JSON.parse(await readFile(new URL('lib/project-inventory.json', root), 'utf8'));
const rows = inventory.map(({ name, image, page }) => [null, name, image, page]);
const files = await readdir(new URL('public/images/projects/', root));
for (let start = 0; start < rows.length; start += 9) {
  const composites = [];
  for (let offset = 0; offset < Math.min(9, rows.length - start); offset++) {
    const index = start + offset;
    const name = rows[index][1];
    const slug = `${index < 19 ? '' : 'app-'}${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/g, '')}`;
    const file = files.find((f) => f.startsWith(`${slug}-preview-`));
    if (!file) continue;
    const left = (offset % 3) * 650;
    const top = Math.floor(offset / 3) * 475;
    composites.push({ input: await sharp(new URL(`public/images/projects/${file}`, root).pathname.replace(/^\/(\w:)/, '$1')).resize(650, 435, { fit: 'contain', background: '#fff' }).toBuffer(), left, top });
    composites.push({ input: Buffer.from(`<svg width="650" height="40"><rect width="650" height="40" fill="white"/><text x="20" y="26" font-family="Arial" font-size="22">${index + 1}. ${name.replace(/&/g, '&amp;')} / ${index < 19 ? 'WEB' : 'APP'}</text></svg>`), left, top: top + 435 });
  }
  await sharp({ create: { width: 1950, height: 1425, channels: 3, background: '#f7f7f9' } }).composite(composites).png().toFile(new URL(`audit/projects-${start + 1}.png`, root).pathname.replace(/^\/(\w:)/, '$1'));
}
