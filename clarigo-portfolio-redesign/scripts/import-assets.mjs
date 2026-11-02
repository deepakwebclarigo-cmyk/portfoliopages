import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const audit = JSON.parse(await readFile(new URL('audit/source-audit.json', root), 'utf8'));
const inventory = JSON.parse(await readFile(new URL('lib/project-inventory.json', root), 'utf8'));
const rows = inventory.map(({ name, image, page }) => [null, name, image, page]);
const host = 'https://clarigo-voluble-youtiao-e0781d.netlify.app';
const output = new URL('public/images/projects/', root);
await mkdir(output, { recursive: true });
// Select by project identity, not by the legacy page's unreliable gallery placement.
const stems = ['liv|livsocial', 'StreamDataX', 'Little-Butterflies', 'Tukee|TukeeConnect', 'beliri', 'printlific', '(?!)', 'parachute', '(?!)', '(?!)', 'umeed', 'alum-c', 'kegelklock', 'BR-tennis', '(?!)', 'whizara', 'ES', 'been-there', 'Lead-Management', 'liv|livsocial', 'sim-assets|simply', 'infinote', 'silasync', 'habit', 'Tukee', 'pop', 'qcop', 'lb', 'Case-Management-ASE', 'printlific', 'law-legends', 'race|racepace', 'been-there', 'One-pantry', 'Escape', 'dateflow', 'meravyaah', 'beliri-new', 'fynmate|fyn-assets', 'sheets|s-sheets', 'umeed', 'bubble', 'KEGEL-KLOCK|kegel-assets', 'gym', 'gobroker|go-broker|go-Dashboard|go-Details|go-Onboarding', 'heartsync', '(?!)'];
const journal = new URL('audit/import-cache.jsonl', root);
const records = new Map();
try { for (const line of (await readFile(journal, 'utf8')).trim().split('\n').filter(Boolean)) { const r = JSON.parse(line); records.set(r.source, r); } } catch {}
async function download(url, localName) {
  if (records.get(url)?.src) return records.get(url);
  const record = { source: url };
  try {
    let response;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try { response = await fetch(url, { signal: AbortSignal.timeout(20000) }); if (response.status < 500) break; } catch (error) { if (attempt === 2) throw error; }
    }
    record.status = response.status;
    if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`Invalid image response ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    const sha256 = createHash('sha256').update(bytes).digest('hex');
    const filename = `${localName}-${sha256.slice(0, 10)}.webp`;
    const optimized = await sharp(bytes).rotate().resize({ width: 1600, height: 2200, fit: 'inside', withoutEnlargement: true }).webp({ quality: 88, effort: 5 }).toBuffer({ resolveWithObject: true });
    await writeFile(new URL(filename, output), optimized.data);
    Object.assign(record, { src: `/images/projects/${filename}`, width: optimized.info.width, height: optimized.info.height, bytes: optimized.data.length, originalBytes: bytes.length, sha256 });
  } catch (error) { record.error = error.message; }
  records.set(url, record);
  await appendFile(journal, JSON.stringify(record) + '\n');
  return record;
}
const projects = {};
const pending = rows.map((row, index) => ({ row, index }));
await Promise.all(Array.from({ length: 4 }, async () => {
  while (pending.length) {
    const { row: [, name, image, page], index } = pending.shift();
    const kind = index < 19 ? 'web' : 'mobile';
    const base = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/g, '');
    const slug = kind === 'mobile' ? `app-${base}` : base;
    const legacy = `${host}/landing%20page/${page}`;
    const sourcePage = audit.pages.find((p) => p.url === legacy);
    const poster = await download(`${host}/assets/images/projects/${kind === 'web' ? 'website-projects' : 'applications-projects'}/${image}`, `${slug}-preview`);
    const images = [];
    const match = new RegExp(`/(?:${stems[index]})(?:[- _][^/]*)?\\.png$`, 'i');
    const candidates = [...new Set(sourcePage?.images?.map((i) => i.src).filter((src) => match.test(src)) ?? [])];
    // Web pages use their own desktop screenshots; mobile pages use their own mobile screenshots.
    const selected = candidates.filter((src) => kind === 'web' ? !src.includes('/screenshots/') : !src.includes('/web/'));
    for (const relative of selected) {
      const asset = await download(new URL(relative, legacy).href, slug);
      if (asset.src && !images.some((image) => image.sha256 === asset.sha256)) images.push(asset);
    }
    projects[slug] = { poster, images };
    await writeFile(new URL('lib/project-assets.json', root), JSON.stringify(projects, null, 2));
    console.log(`${slug}: ${poster.src ? 'preview OK' : poster.error}, ${images.length} matched assets`);
  }
}));
const logoResponse = await fetch('https://clarigoinfotech.com/logo.png');
if (!logoResponse.ok) throw new Error('Unable to import official logo');
await mkdir(new URL('public/images/brand/', root), { recursive: true });
await writeFile(new URL('public/images/brand/clarigo.png', root), Buffer.from(await logoResponse.arrayBuffer()));
await writeFile(new URL('lib/project-assets.json', root), JSON.stringify(projects, null, 2));
const all = [...records.values()];
await writeFile(new URL('audit/asset-import.json', root), JSON.stringify({ checkedAt: new Date().toISOString(), records: all }, null, 2));
console.log(JSON.stringify({ projects: Object.keys(projects).length, imported: all.filter((r) => r.src).length, failed: all.filter((r) => r.error).length, originalBytes: all.reduce((sum, r) => sum + (r.originalBytes ?? 0), 0), optimizedBytes: all.reduce((sum, r) => sum + (r.bytes ?? 0), 0) }));
