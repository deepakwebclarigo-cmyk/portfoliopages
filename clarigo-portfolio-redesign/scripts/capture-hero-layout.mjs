import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const output = [];
for (const [width, height] of [[1440, 1000], [1195, 900], [768, 1024], [390, 844]]) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto((process.env.HERO_BASE_URL || 'http://127.0.0.1:3000') + '/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const geometry = await page.evaluate(() => {
    const result = {};
    for (const selector of ['.heroSection', '.heroInner', '.heroCopy', '.heroCopy .eyebrow', '.heroCopy h1', '.heroCopy>p', '.heroActions', '.heroActions>a:first-child', '.heroActions>a:last-child', '.inventory', '.inventory>div:nth-child(1)', '.inventory>div:nth-child(2)', '.inventory>div:nth-child(3)', '.heroScroll']) {
      const element = document.querySelector(selector), box = element.getBoundingClientRect(), style = getComputedStyle(element);
      const content=element.cloneNode(true);content.querySelectorAll('.heroAmbient').forEach(artwork=>artwork.remove());
      result[selector] = { x: box.x, y: box.y, width: box.width, height: box.height, fontSize: style.fontSize, fontWeight: style.fontWeight, letterSpacing: style.letterSpacing, lineHeight: style.lineHeight, color: style.color, text: content.textContent.replace(/\s+/g, ' ').trim() };
    }
    return result;
  });
  output.push({ width, height, geometry });
  await context.close();
}
await browser.close();
await fs.writeFile(process.env.HERO_LAYOUT_OUTPUT || 'audit/motion/hero-layout-before.json', JSON.stringify(output, null, 2));
const differences = [];
if (process.env.HERO_LAYOUT_OUTPUT) {
  const before = JSON.parse(await fs.readFile('audit/motion/hero-layout-before.json', 'utf8'));
  for (const current of output) {
    const baseline = before.find(item => item.width === current.width);
    for (const [selector, values] of Object.entries(current.geometry)) for (const [key, value] of Object.entries(values)) {
      const previous = baseline.geometry[selector][key];
      if (typeof value === 'number' ? Math.abs(previous - value) > .125 : previous !== value) differences.push({ width: current.width, selector, key, before: previous, after: value });
    }
  }
  await fs.writeFile('audit/motion/hero-layout-verification.json', JSON.stringify({ viewports: output.length, selectorsPerViewport: Object.keys(output[0].geometry).length, differences }, null, 2));
}
console.log(JSON.stringify({ viewports: output.length, output: process.env.HERO_LAYOUT_OUTPUT || 'audit/motion/hero-layout-before.json', differences }));
if (differences.length) process.exitCode = 1;
