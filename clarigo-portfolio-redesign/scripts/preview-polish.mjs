import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const directory = new URL('../audit/design-polish/', import.meta.url);
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
for (const [name, path, width, height] of [
  ['home-desktop-after', '/', 1440, 1000],
  ['home-compact-desktop-after', '/', 1024, 768],
  ['home-tablet-after', '/', 768, 1024],
  ['home-mobile-after', '/', 390, 844],
  ['case-desktop-after', '/portfolio/livsocial', 1440, 1000],
  ['case-tablet-after', '/portfolio/app-case-management-ase', 768, 1024],
  ['case-mobile-after', '/portfolio/app-digital-habit-tracker', 390, 844],
  ['home-narrow-after', '/', 320, 800],
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto((process.env.PREVIEW_URL || 'http://localhost:3000') + path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  await page.locator('img').evaluateAll((elements) => elements.forEach((element) => { element.loading = 'eager'; }));
  await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth));
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += height * .8) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y);
    await page.waitForTimeout(65);
  }
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(150);
  await page.screenshot({ path: fileURLToPath(new URL(name + '.png', directory)), fullPage: path !== '/' });
  results.push({ name, path, viewport: { width, height }, errors, ...await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth + 1,
    pageHeight: document.documentElement.scrollHeight,
    h1: { size: getComputedStyle(document.querySelector('h1')).fontSize, tracking: getComputedStyle(document.querySelector('h1')).letterSpacing },
    nav: [...document.querySelectorAll('.siteNav a')].filter((el) => el.getBoundingClientRect().height).map((el) => ({ text: el.textContent, width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height })),
  })) });
  if (path === '/') {
    await page.locator('#portfolio').scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: fileURLToPath(new URL(name + '-cards.png', directory)) });
    await page.locator('.projectLink').first().hover();
    await page.waitForTimeout(300);
    await page.screenshot({ path: fileURLToPath(new URL(name + '-hover.png', directory)) });
  } else {
    await page.locator('.galleryOpen').first().click();
    await page.waitForTimeout(250);
    await page.screenshot({ path: fileURLToPath(new URL(name + '-viewer.png', directory)) });
    await page.keyboard.press('Escape');
  }
  console.log('Captured ' + name);
  await page.close();
}
await browser.close();
await writeFile(new URL('polish-preview-checks.json', directory), JSON.stringify(results, null, 2));
