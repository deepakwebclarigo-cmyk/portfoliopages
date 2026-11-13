import { test, expect } from '@playwright/test';

test('simple thumbnail hover uses only a small card lift and keeps the image stationary', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'Hover lift is for fine pointers.');
  await page.goto('/#portfolio');
  const link = page.locator('.projectLink').first();
  await link.hover();
  await expect.poll(() => link.evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42)).toBe(-2);
  expect(await link.locator('img').evaluate(el => ({ opacity: getComputedStyle(el).opacity, transform: getComputedStyle(el).transform, transition: getComputedStyle(el).transitionDuration }))).toEqual({ opacity: '1', transform: 'none', transition: '0s' });
  await expect(page.locator('.visual[data-webgl-artwork="active"]')).toHaveCount(0);
  await page.locator('.projectLink').nth(1).hover();
  await link.hover();
  await expect(page.locator('.visual[data-webgl-artwork="active"]')).toHaveCount(0);
});

test('reduced motion keeps thumbnail cards and images static', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#portfolio');
  const link = page.locator('.projectLink').first();
  await link.hover();
  expect(await link.evaluate(el => ({ transform: getComputedStyle(el).transform, transition: getComputedStyle(el).transitionDuration }))).toEqual({ transform: 'none', transition: '0s' });
  expect(await link.locator('img').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
});
