import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const audit = JSON.parse(await readFile(new URL('audit/source-audit.json', root), 'utf8'));
const home = audit.pages.find(({ url }) => url === 'https://clarigoinfotech.com/');
await mkdir(new URL('public/fonts/', root), { recursive: true });
const faces = [];
const records = [];
for (const url of home.links.filter((link) => link.includes('.css'))) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Unable to read brand stylesheet');
  const css = await response.text();
  for (const [face] of css.matchAll(/@font-face\{font-family:Geist;[^}]+\}/g)) {
    const reference = face.match(/src:url\(([^)]+)\)/)?.[1];
    if (!reference) continue;
    const source = new URL(reference, url).href;
    const font = await fetch(source);
    if (!font.ok) throw new Error('Unable to download brand font');
    const buffer = Buffer.from(await font.arrayBuffer());
    const hash = createHash('sha256').update(buffer).digest('hex');
    const local = '/fonts/geist-' + hash.slice(0, 10) + '.woff2';
    await writeFile(new URL('public' + local, root), buffer);
    faces.push(face.replace(reference, local));
    records.push({ source, local, bytes: buffer.length, sha256: hash });
  }
}
if (!faces.length) throw new Error('No verified Geist font declarations found');
await writeFile(new URL('app/brand-fonts.css', root), faces.join('\n') + '\n');
await writeFile(new URL('audit/brand-fonts.json', root), JSON.stringify({ checkedAt: new Date().toISOString(), records }, null, 2));
console.log(JSON.stringify({ fontSubsets: records.length, bytes: records.reduce((sum, record) => sum + record.bytes, 0) }));
