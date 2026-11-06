import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const assets = JSON.parse(await readFile('lib/project-assets.json', 'utf8'));
const results = [];
for (const [slug, { poster }] of Object.entries(assets)) {
  const bytes = await readFile('public' + poster.src);
  const result = await sharp(bytes).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 88, effort: 5 }).toBuffer({ resolveWithObject: true });
  const src = poster.src.replace('.webp', '-medium.webp');
  await writeFile('public' + src, result.data);
  results.push({ slug, src, width: result.info.width, height: result.info.height, bytes: result.data.length, source: poster.src, sourceSha256: poster.sha256, sha256: createHash('sha256').update(result.data).digest('hex') });
}
await writeFile('audit/premium-review/responsive-covers.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify({ responsiveCovers: results.length, bytes: results.reduce((sum, image) => sum + image.bytes, 0) }));
