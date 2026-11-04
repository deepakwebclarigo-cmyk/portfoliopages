import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const inventory = JSON.parse(await readFile(new URL('lib/project-inventory.json', root), 'utf8'));
const assets = JSON.parse(await readFile(new URL('lib/project-assets.json', root), 'utf8'));
const report = { projects: inventory.length, assets: 0, sourceBytes: 0, localBytes: 0, errors: [] };
const seen = new Set();
for (const item of inventory) {
  const set = assets[item.slug];
  for (const asset of [set.poster, ...set.images]) {
    try {
      const buffer = await readFile(new URL('public' + asset.src, root));
      const metadata = await sharp(buffer).metadata();
      if (metadata.width !== asset.width || metadata.height !== asset.height) throw new Error('Dimension mismatch');
      if (!seen.has(asset.src)) { report.assets++; report.sourceBytes += asset.originalBytes; report.localBytes += buffer.length; seen.add(asset.src); }
    } catch (error) { report.errors.push({ slug: item.slug, src: asset.src, error: error.message }); }
  }
}
await writeFile(new URL('audit/asset-verification.json', root), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
for (let start = 0; start < inventory.length; start += 8) {
  const composites = [];
  for (let row = 0; row < Math.min(8, inventory.length - start); row++) {
    const item = inventory[start + row];
    const set = assets[item.slug];
    const screens = set.images.filter((asset) => asset.gallery);
    const gallery = screens.length ? screens : set.images.length ? set.images : [set.poster];
    composites.push({ input: Buffer.from(`<svg width="1500" height="30"><rect width="1500" height="30" fill="#fff"/><text x="10" y="22" font-family="Arial" font-size="19">${item.slug}</text></svg>`), left: 0, top: row * 230 });
    for (let index = 0; index < gallery.length; index++) {
      const asset = gallery[index];
      composites.push({ input: await sharp(fileURLToPath(new URL('public' + asset.src, root))).resize(250, 195, { fit: 'contain', background: '#eee' }).toBuffer(), left: index * 250, top: row * 230 + 30 });
    }
  }
  await sharp({ create: { width: 2000, height: 1840, channels: 3, background: '#f7f7f9' } }).composite(composites).png().toFile(fileURLToPath(new URL('audit/gallery-' + (start + 1) + '.png', root)));
}
