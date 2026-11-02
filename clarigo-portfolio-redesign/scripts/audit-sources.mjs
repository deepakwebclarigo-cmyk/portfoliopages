import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const directory = new URL('../audit/sources/', import.meta.url);
await mkdir(directory, { recursive: true });
const host = 'https://clarigo-voluble-youtiao-e0781d.netlify.app';
const live = 'https://clarigoinfotech.com';
const inventory = JSON.parse(await readFile(new URL('../lib/project-inventory.json', import.meta.url), 'utf8'));
const rows = inventory.map(({ name, image, page }) => [null, name, image, page]);
const clean = (text) => text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const records = new Map();
async function fetchRecord(url) {
  if (records.has(url)) return records.get(url);
  const record = { url };
  records.set(url, record);
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
    record.status = response.status;
    record.finalUrl = response.url;
    record.type = response.headers.get('content-type');
    const buffer = Buffer.from(await response.arrayBuffer());
    record.bytes = buffer.length;
    record.sha256 = createHash('sha256').update(buffer).digest('hex');
    if (/html|text|xml/.test(record.type ?? '')) {
      const html = buffer.toString('utf8');
      record.title = clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '');
      record.headings = [...html.matchAll(/<h[1-3]\b[^>]*>([\s\S]*?)<\/h[1-3]>/gi)].map((m) => clean(m[1]));
      record.paragraphs = [...html.matchAll(/<(?:p|li)\b[^>]*>([\s\S]*?)<\/(?:p|li)>/gi)].map((m) => clean(m[1])).filter(Boolean);
      record.images = [...html.matchAll(/<img\b[^>]*>/gi)].map(([tag]) => ({ src: tag.match(/\bsrc=["']([^"']+)/i)?.[1], alt: tag.match(/\balt=["']([^"']*)/i)?.[1] })).filter((i) => i.src);
      record.links = [...new Set([...html.matchAll(/\bhref=["']([^"'#]+)/gi)].map((m) => { try { return new URL(m[1], response.url).href; } catch { return m[1]; } }))];
      record.file = `${record.sha256.slice(0, 16)}.html`;
      await writeFile(new URL(record.file, directory), html);
    }
  } catch (error) { record.error = error.message; }
  return record;
}
async function batch(urls) {
  const pending = [...new Set(urls)];
  await Promise.all(Array.from({ length: 5 }, async () => {
    while (pending.length) await fetchRecord(pending.shift());
  }));
}
await batch([`${live}/`, `${live}/robots.txt`, `${live}/sitemap.xml`, `${host}/`, `${host}/portfolio.html`, ...rows.filter((row) => row[3]).map(([, , , page]) => `${host}/landing%20page/${page}`)]);
const sitemap = records.get(`${live}/sitemap.xml`);
if (sitemap?.file) {
  const xml = await readFile(new URL(sitemap.file, directory), 'utf8');
  await batch([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).filter((url) => url.startsWith(`${live}/`)));
}
const firstParty = (url, origin) => { try { const u = new URL(url); return u.origin === origin && !/\.(css|js|png|jpg|jpeg|webp|svg|pdf|ico|woff2?|mp4)(\?|$)/i.test(u.pathname); } catch { return false; } };
await batch([...records.values()].flatMap((r) => r.links ?? []).filter((url) => firstParty(url, live) || firstParty(url, host)));
await batch([...records.values()].flatMap((r) => r.links ?? []).filter((url) => firstParty(url, host)));
const assets = rows.map(([, name, image], index) => ({ name, url: `${host}/assets/images/projects/${index < 19 ? 'website-projects' : 'applications-projects'}/${image}` }));
await batch([...assets.map((a) => a.url), `${live}/logo.png`]);
const result = { checkedAt: new Date().toISOString(), pages: [...records.values()], assets };
await writeFile(new URL('../source-audit.json', directory), JSON.stringify(result, null, 2));
console.log(JSON.stringify({ pages: result.pages.length, statuses: result.pages.reduce((total, r) => ({ ...total, [r.status ?? 'error']: (total[r.status ?? 'error'] ?? 0) + 1 }), {}), livePages: result.pages.filter((r) => r.url.startsWith(live)).length }, null, 2));
