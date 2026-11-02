import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const directory = new URL('audit/design-polish/', root);
await mkdir(directory, { recursive: true });
const hashes = {};
for (const path of ['lib/project-inventory.json', 'lib/project-content.ts', 'lib/project-assets.json', 'lib/asset-exclusions.json']) hashes[path] = createHash('sha256').update(await readFile(new URL(path, root))).digest('hex');
await writeFile(new URL('project-baseline-hashes.json', directory), JSON.stringify(hashes, null, 2));
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const reports = [];
for (const [name, url, width, height] of [
  ['reference-desktop', 'https://clarigoinfotech.com/', 1440, 1000],
  ['reference-tablet', 'https://clarigoinfotech.com/', 768, 1024],
  ['reference-mobile', 'https://clarigoinfotech.com/', 390, 844],
  ['reference-service', 'https://clarigoinfotech.com/services/app-development', 1440, 1000],
  ['platform-desktop-before', 'http://localhost:3000/', 1440, 1000],
  ['platform-mobile-before', 'http://localhost:3000/portfolio/app-digital-habit-tracker', 390, 844],
]) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'no-preference' });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  await page.waitForTimeout(700);
  const data = await page.evaluate(() => {
    function style(element) {
      const s = getComputedStyle(element);
      const r = element.getBoundingClientRect();
      return { tag: element.tagName, text: element.textContent.trim().slice(0, 110), font: s.fontFamily, size: s.fontSize, weight: s.fontWeight, lineHeight: s.lineHeight, tracking: s.letterSpacing, color: s.color, background: s.backgroundColor, radius: s.borderRadius, padding: s.padding, margin: s.margin, gap: s.gap, border: s.border, shadow: s.boxShadow, transform: s.transform, transition: s.transition, width: r.width, height: r.height, parentPadding: getComputedStyle(element.parentElement).padding };
    }
    return {
      headings: [...document.querySelectorAll('main h1, main h2, main h3')].slice(0, 20).map(style),
      paragraphs: [...document.querySelectorAll('main p')].slice(0, 8).map(style),
      buttons: [...document.querySelectorAll('header a, main a, main button')].filter(el => el.getBoundingClientRect().height > 30).slice(0, 12).map(style),
      sections: [...document.querySelectorAll('main section')].slice(0, 14).map(style),
      animations: document.getAnimations().slice(0, 12).map(a => ({ timing: a.effect?.getTiming(), state: a.playState })),
    };
  });
  await page.screenshot({ path: fileURLToPath(new URL(name + '.png', directory)) });
  const cards = page.locator('main h3');
  if (await cards.count()) {
    const card = cards.first().locator('..');
    await card.scrollIntoViewIfNeeded();
    const before = await card.evaluate(el => ({ transform: getComputedStyle(el).transform, border: getComputedStyle(el).borderColor, shadow: getComputedStyle(el).boxShadow }));
    await card.hover();
    await page.waitForTimeout(400);
    const after = await card.evaluate(el => ({ transform: getComputedStyle(el).transform, border: getComputedStyle(el).borderColor, shadow: getComputedStyle(el).boxShadow }));
    data.cardHover = { before, after };
    await page.screenshot({ path: fileURLToPath(new URL(name + '-cards.png', directory)) });
  }
  reports.push({ name, url, viewport: { width, height }, ...data });
  await page.close();
  console.log('Inspected ' + name);
}
await browser.close();
await writeFile(new URL('reference-analysis.json', directory), JSON.stringify({ inspectedAt: new Date().toISOString(), reports }, null, 2));
