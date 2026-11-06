import { chromium, expect } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const directory = 'audit/premium-review';
const inventory = JSON.parse(await readFile('lib/project-inventory.json', 'utf8'));
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const report = { hoveredCards: [], compactPages: [], retinaImages: [], errors: [] };
await mkdir(directory + '/screenshots', { recursive: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  await page.goto('http://127.0.0.1:3100/#portfolio');
  await page.evaluate(() => Promise.all([...document.images].map(async image => { image.loading = 'eager'; await image.decode(); })));
  for (const project of inventory) {
    const card = page.locator('.projectLink[href="/portfolio/' + project.slug + '"]');
    await card.locator('.visual').hover();
    await expect(card.locator('.visual')).toHaveAttribute('data-webgl-artwork', 'active');
    report.hoveredCards.push(project.slug);
  }
  await page.mouse.move(0, 0);
  await expect(page.locator('[data-webgl-artwork="active"]')).toHaveCount(0);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await expect(page.locator('.portfolioWebgl')).toHaveAttribute('data-state', 'running');
  await page.screenshot({ path: directory + '/screenshots/final-desktop.png' });
  await page.emulateMedia({ forcedColors: 'active' });
  await expect(page.locator('.portfolioWebgl')).toHaveAttribute('data-engine', 'static');
  report.forcedColorsReleasesRenderer = true;
  await context.close();

  const compact = await browser.newContext({ viewport: { width: 320, height: 800 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const mobile = await compact.newPage();
  mobile.on('pageerror', error => report.errors.push(error.message));
  for (const project of inventory) {
    const response = await mobile.goto('http://127.0.0.1:3100/portfolio/' + project.slug);
    await mobile.locator('.galleryOpen').first().click();
    const dialog = mobile.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await mobile.locator('.galleryDialogImage img').evaluate(image => image.decode());
    const geometry = await dialog.evaluate(element => {
      const box = element.getBoundingClientRect();
      return { pageFits: document.documentElement.scrollWidth <= innerWidth + 1, viewerFits: box.left >= 0 && box.right <= innerWidth + 1 && box.top >= 0 && box.bottom <= innerHeight + 1 && element.scrollWidth <= element.clientWidth + 1 && element.scrollHeight <= element.clientHeight + 1 };
    });
    if (response.status() !== 200 || !geometry.pageFits || !geometry.viewerFits) throw new Error(JSON.stringify({ slug: project.slug, ...geometry }));
    await mobile.keyboard.press('Escape');
    await expect(mobile.locator('.galleryOpen').first()).toBeFocused();
    report.compactPages.push(project.slug);
  }
  await mobile.goto('http://127.0.0.1:3100/');
  await mobile.evaluate(() => document.fonts.ready);
  await mobile.screenshot({ path: directory + '/screenshots/final-mobile.png' });
  await compact.close();

  const retina = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const highDensity = await retina.newPage();
  for (const slug of ['livsocial', 'glocal-expert', 'app-habitstride', 'app-supplement-management']) {
    await highDensity.goto('http://127.0.0.1:3100/portfolio/' + slug);
    const image = highDensity.locator('.caseVisual img');
    await image.evaluate(image => image.decode());
    const selected = await image.evaluate(image => image.currentSrc);
    if (!selected.endsWith('-medium.webp')) throw new Error('Incorrect Retina source: ' + selected);
    report.retinaImages.push({ slug, selected });
    if (slug === 'glocal-expert') await highDensity.locator('.caseHero').screenshot({ path: directory + '/screenshots/final-glocal-retina.png' });
  }
  await highDensity.goto('http://127.0.0.1:3100/portfolio/mercury-mailroom');
  await highDensity.locator('#screens').screenshot({ path: directory + '/screenshots/final-mercury-gallery.png' });
  await retina.close();
} finally {
  await browser.close();
  await writeFile(directory + '/responsive-interactions.json', JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ hoveredCards: report.hoveredCards.length, compactPages: report.compactPages.length, retinaImages: report.retinaImages.length, forcedColorsReleasesRenderer: report.forcedColorsReleasesRenderer, errors: report.errors }));
if (report.errors.length) process.exitCode = 1;
