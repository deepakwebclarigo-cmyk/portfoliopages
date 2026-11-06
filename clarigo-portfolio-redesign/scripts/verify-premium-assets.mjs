import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const assets = JSON.parse(await readFile('lib/project-assets.json', 'utf8'));
const derivatives = JSON.parse(await readFile('audit/premium-review/responsive-covers.json', 'utf8'));
const checked = new Set(), errors = [];
let variants = 0;
for (const [slug, set] of Object.entries(assets)) {
  for (const asset of [set.poster, ...set.images]) {
    if (checked.has(asset.src)) continue;
    checked.add(asset.src);
    try {
      const buffer = await readFile('public' + asset.src), metadata = await sharp(buffer).metadata();
      if (createHash('sha256').update(buffer).digest('hex') !== asset.sha256 || metadata.width !== asset.width || metadata.height !== asset.height) throw new Error('Source hash or dimensions differ');
    } catch (error) { errors.push({ slug, src: asset.src, error: error.message }); }
  }
  for (const [suffix, width] of [['-card.webp', 640], ['-medium.webp', 960]]) {
    const src = set.poster.src.replace('.webp', suffix);
    try {
      const bytes = await readFile('public' + src), image = sharp(bytes), metadata = await image.metadata();
      await image.stats();
      const widthValid = width === 640 ? [640, 720].includes(metadata.width) : metadata.width === 960;
      if (!widthValid || Math.abs(metadata.width / metadata.height - set.poster.width / set.poster.height) > .005) throw new Error('Responsive proportions differ');
      if (width === 960) {
        const record = derivatives.find(item => item.slug === slug);
        if (record.sourceSha256 !== set.poster.sha256 || record.sha256 !== createHash('sha256').update(bytes).digest('hex')) throw new Error('Derivative provenance differs');
      }
      variants++;
    } catch (error) { errors.push({ slug, src, error: error.message }); }
  }
}
const report = { projects: Object.keys(assets).length, selectedImages: checked.size, decodedResponsiveVariants: variants, errors };
await writeFile('audit/premium-review/asset-verification.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
if (errors.length) process.exitCode = 1;
