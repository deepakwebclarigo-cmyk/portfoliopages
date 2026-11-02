import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const inventory = JSON.parse(await readFile(new URL('lib/project-inventory.json', root), 'utf8'));
const assets = JSON.parse(await readFile(new URL('lib/project-assets.json', root), 'utf8'));
let bytes = 0;
for (const { slug } of inventory) {
  const { src } = assets[slug].poster;
  const result = await sharp(fileURLToPath(new URL('public' + src, root))).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 85 }).toFile(fileURLToPath(new URL('public' + src.replace('.webp', '-card.webp'), root)));
  bytes += result.size;
}
console.log(JSON.stringify({ cardImages: inventory.length, totalBytes: bytes }));
