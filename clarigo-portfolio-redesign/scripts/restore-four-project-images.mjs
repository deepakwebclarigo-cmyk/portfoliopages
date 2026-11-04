import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const audit = new URL('audit/four-project-images/', root);
const manifestPath = new URL('lib/project-assets.json', root);
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const research = [
  ...JSON.parse(await readFile(new URL('research.json', audit), 'utf8')),
  ...JSON.parse(await readFile(new URL('legacy-path-check.json', audit), 'utf8')),
];
const selections = {
  'glocal-expert': [
    { file: 'glocal-expert-9bd3ef44.png', name: 'legal-workspace-laptop' },
    { file: 'glocal-expert-f5840b3a.png', name: 'legal-workspace-overview', cover: true },
    { file: 'glocal-expert-9363e6ac.png', name: 'requests-and-profile-composition' },
  ],
  'mercury-mailroom': [
    { file: 'mercury-mailroom-d9c346ee.png', name: 'account-entry-laptop' },
    { file: 'mercury-mailroom-9cbd5409.png', name: 'mail-piece-records', flip: true },
    { file: 'mercury-mailroom-9838feac.png', name: 'processing-settings', flip: true },
    { file: 'mercury-mailroom-5fa47a8a.png', name: 'mailroom-dashboard' },
    { file: 'mercury-mailroom-5480b251.png', name: 'mail-piece-dialog', flip: true },
    { file: 'mercury-mailroom-0989a163.png', name: 'tablet-account-entry' },
  ],
  'network-capital': [
    { file: 'network-capital-25dcb7ea.png', name: 'website-overview' },
    { file: 'network-capital-ff7bccdf.png', name: 'home-loan-device-views' },
    { file: 'network-capital-62a942c3.png', name: 'refinance-device-views' },
    { file: 'network-capital-0df2b7a9.png', name: 'careers-device-views' },
  ],
  'app-supplement-management': [
    // Pixel regions from the original Examined Life composition, measured on
    // its existing 1600px preview. These remain mockup details, not new screens.
    { file: 'app-supplement-management-ce2c092f.png', name: 'registration-composition-detail', region: { left: 238, top: 250, width: 625, height: 425 } },
    { file: 'app-supplement-management-ce2c092f.png', name: 'login-composition-detail', region: { left: 511, top: 819, width: 682, height: 505 } },
    { file: 'app-supplement-management-ce2c092f.png', name: 'welcome-composition-detail', region: { left: 625, top: 535, width: 585, height: 434 } },
  ],
};

const changes = [];
for (const [slug, selectionsForProject] of Object.entries(selections)) {
  const images = [];
  for (const selection of selectionsForProject) {
    const source = research.find(item => item.file === selection.file && item.status === 200);
    if (!source || !source.type.startsWith('image/')) throw new Error('Unverified image: ' + selection.file);
    const original = await readFile(new URL('research/' + selection.file, audit));
    const metadata = await sharp(original).metadata();
    let pipeline = sharp(original).rotate();
    let extracted;
    if (selection.region) {
      const factor = metadata.width / 1600;
      extracted = Object.fromEntries(Object.entries(selection.region).map(([key, value]) => [key, Math.round(value * factor)]));
      pipeline = pipeline.extract(extracted);
    }
    // Three archive tablet composites have mirrored text. Reflect only those
    // verified images; the dashboard and account-entry originals read normally.
    if (selection.flip) pipeline = pipeline.flop();
    const optimized = await pipeline.resize({ width: 1600, height: 1800, fit: 'inside', withoutEnlargement: true }).webp({ quality: 90, effort: 5 }).toBuffer({ resolveWithObject: true });
    const sha256 = createHash('sha256').update(optimized.data).digest('hex');
    const src = '/images/projects/' + slug + '-' + selection.name + '-' + sha256.slice(0, 10) + '.webp';
    await writeFile(new URL('public' + src, root), optimized.data);
    const asset = { src, width: optimized.info.width, height: optimized.info.height, role: 'composition', gallery: true, sha256, bytes: optimized.data.length, originalBytes: original.length };
    images.push(asset);
    if (selection.cover) {
      manifest[slug].poster = { ...asset, gallery: false };
      const thumbnail = await sharp(optimized.data).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 88, effort: 5 }).toBuffer();
      await writeFile(new URL('public' + src.replace('.webp', '-card.webp'), root), thumbnail);
    }
    changes.push({ slug, src, source: source.source, originalSha256: createHash('sha256').update(original).digest('hex'), originalDimensions: [metadata.width, metadata.height], extracted, horizontalReflection: Boolean(selection.flip), ...asset });
  }
  manifest[slug].images = images;
}
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
await writeFile(new URL('asset-provenance.json', audit), JSON.stringify(changes, null, 2) + '\n');
console.log(JSON.stringify({ projects: Object.keys(selections), addedGalleryImages: changes.length, optimizedBytes: changes.reduce((sum, asset) => sum + asset.bytes, 0) }));
