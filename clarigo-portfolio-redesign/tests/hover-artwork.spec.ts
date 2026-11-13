import { test, expect } from '@playwright/test';
import inventory from '../lib/project-inventory.json';

for (const density of [1, 2]) {
  test('all native thumbnail images remain unchanged on hover at ' + density + 'x density', async ({ browser }) => {
    const context = await browser.newContext({ baseURL: 'http://127.0.0.1:3100', viewport: { width: 1440, height: 1000 }, deviceScaleFactor: density });
    try {
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('/#portfolio');
      await page.locator('.projectLink img').evaluateAll(images => images.forEach(image => { (image as HTMLImageElement).loading = 'eager'; }));
      await expect.poll(() => page.locator('.projectLink img').evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
      for (const item of inventory) {
        const link = page.locator('.projectLink[href="/portfolio/' + item.slug + '"]');
        const source = await link.locator('img').evaluate(image => (image as HTMLImageElement).currentSrc);
        await link.hover();
        expect(await link.locator('img').evaluate(image => ({ source: (image as HTMLImageElement).currentSrc, opacity: getComputedStyle(image).opacity, transform: getComputedStyle(image).transform, fit: getComputedStyle(image).objectFit })), item.slug).toEqual({ source, opacity: '1', transform: 'none', fit: 'contain' });
        await expect(link.locator('.visual')).not.toHaveAttribute('data-webgl-artwork', 'active');
      }
      await page.goto('/portfolio/umeed');
      for (const link of await page.locator('.relatedCard').all()) {
        await link.hover();
        await expect(link.locator('.visual')).not.toHaveAttribute('data-webgl-artwork', 'active');
        expect(await link.locator('img').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
      }
      expect(errors).toEqual([]);
    } finally { await context.close(); }
  });
}
