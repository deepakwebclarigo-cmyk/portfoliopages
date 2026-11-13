import { test, expect, type Locator, type Page } from '@playwright/test';
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import inventory from '../lib/project-inventory.json';

async function pixels(buffer: Buffer) {
  const metadata = await sharp(buffer).metadata();
  const width = metadata.width!, height = metadata.height!;
  const core = sharp(buffer).extract({
    left: Math.round(width * .16), top: Math.round(height * .18),
    width: Math.round(width * .68), height: Math.round(height * .64),
  }).removeAlpha();
  const stats = await core.clone().stats();
  return {
    contrast: Math.sqrt(stats.channels.slice(0, 3).reduce((sum, c) => sum + c.stdev ** 2, 0) / 3),
    rgb: await core.resize(64, 64, { fit: 'fill' }).raw().toBuffer(),
  };
}

async function visibleHover(page: Page, link: Locator) {
  const canvas = page.locator('.portfolioWebgl'), visual = link.locator('.visual');
  await page.mouse.move(1, 1);
  await expect(canvas).not.toHaveAttribute('data-card-active', 'true');
  await link.scrollIntoViewIfNeeded();
  await link.locator('img').evaluate(image => (image as HTMLImageElement).decode());
  await expect.poll(() => link.evaluate(el => {
    const reveal = el.closest('[data-motion-reveal]');
    return !reveal || getComputedStyle(reveal).opacity === '1';
  })).toBe(true);
  await expect.poll(() => visual.locator('img').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  const before = await pixels(await visual.screenshot());
  const box = (await visual.boundingBox())!;
  await page.mouse.move(box.x + box.width * .78, box.y + box.height * .38);
  await expect(visual).toHaveAttribute('data-webgl-artwork', 'active');
  await expect.poll(() => canvas.evaluate(el => Number((el as HTMLElement).dataset.cardScale))).toBeGreaterThan(.98);
  const after = await pixels(await visual.screenshot());
  const difference = before.rgb.reduce((sum, value, index) => sum + Math.abs(value - after.rgb[index]), 0) / before.rgb.length;
  expect(after.contrast, 'hover must retain the actual image, rather than a flat backing color').toBeGreaterThan(before.contrast * .45);
  expect(difference, 'hover should preserve the thumbnail content and orientation').toBeLessThan(24);
  return { baselineContrast: before.contrast, hoveredContrast: after.contrast, meanPixelDifference: difference };
}

for (const density of [1, 2]) {
  test('all ' + inventory.length + ' thumbnails retain their rendered image on hover at ' + density + 'x density', async ({ browser }) => {
    test.setTimeout(240000);
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: density, reducedMotion: 'no-preference' });
    const page = await context.newPage(), gpuErrors: string[] = [], results = [];
    page.on('console', message => { if (/GL_INVALID|glTexSubImage|texture dimensions/.test(message.text())) gpuErrors.push(message.text()); });
    try {
      await page.goto('http://127.0.0.1:3100/#portfolio');
      for (const item of inventory) {
        const link = page.locator('.projectLink[href="/portfolio/' + item.slug + '"]');
        results.push({ slug: item.slug, ...await visibleHover(page, link) });
        if (item.slug === 'streamdexa') await page.screenshot({ path: 'audit/hover-texture-fix-2026-11-12/fixed-hover-' + density + 'x.png' });
      }
      await page.goto('http://127.0.0.1:3100/portfolio/umeed');
      for (const link of await page.locator('.relatedCard').all()) {
        results.push({ slug: 'related:' + await link.getAttribute('href'), ...await visibleHover(page, link) });
      }
      expect(gpuErrors).toEqual([]);
      await writeFile('audit/hover-texture-fix-2026-11-12/pixel-checks-' + density + 'x.json', JSON.stringify({ density, checked: results.length, gpuErrors, results }, null, 2));
    } finally { await context.close(); }
  });
}

test('delayed texture loads retain the native image and cannot activate a card after pointer leave', async ({ page }) => {
  await page.goto('/#portfolio');
  await page.mouse.move(1, 1);
  const stream = page.locator('.projectLink[href="/portfolio/streamdexa"]'), first = page.locator('.projectLink[href="/portfolio/livsocial"]');
  await stream.scrollIntoViewIfNeeded();
  const source = await stream.locator('img').evaluate(async image => { await (image as HTMLImageElement).decode(); return (image as HTMLImageElement).currentSrc; });
  let release!: () => void, blocked = false;
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route(source, async route => { blocked = true; await gate; await route.continue(); });
  try {
    await stream.hover(); await expect.poll(() => blocked).toBe(true);
    await expect.poll(() => stream.locator('img').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
    await expect(stream.locator('.visual')).not.toHaveAttribute('data-webgl-artwork', 'active');
    await first.hover(); await expect(first.locator('.visual')).toHaveAttribute('data-webgl-artwork', 'active');
    const finished = page.waitForResponse(source); release(); await finished;
    await expect(stream.locator('.visual')).not.toHaveAttribute('data-webgl-artwork', 'active');
    await expect.poll(() => stream.locator('img').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
    await visibleHover(page, stream);
  } finally { release(); }
});

test('a failed optional WebGL image request leaves the actual thumbnail visible', async ({ page }) => {
  await page.goto('/#portfolio');
  await page.mouse.move(1, 1);
  const link = page.locator('.projectLink[href="/portfolio/streamdexa"]');
  await link.scrollIntoViewIfNeeded();
  const source = await link.locator('img').evaluate(async image => { await (image as HTMLImageElement).decode(); return (image as HTMLImageElement).currentSrc; });
  let requests = 0;
  await page.route(source, route => { requests++; return route.abort('failed'); });
  const baseline = await pixels(await link.locator('.visual').screenshot());
  await link.hover(); await expect.poll(() => requests).toBe(1);
  await expect.poll(() => link.locator('img').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  await expect(link.locator('.visual')).not.toHaveAttribute('data-webgl-artwork', 'active');
  const hovered = await pixels(await link.locator('.visual').screenshot());
  expect(hovered.contrast).toBeGreaterThan(baseline.contrast * .8);
});

