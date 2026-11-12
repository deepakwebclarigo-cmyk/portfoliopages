import { test, expect } from '@playwright/test';
import inventory from '../lib/project-inventory.json';
import thumbnails from '../lib/project-thumbnails.json';

test('an empty filtered search can be reset without losing keyboard focus', async ({ page }) => {
  await page.goto('/#portfolio');
  await page.getByRole('button', { name: /Mobile apps/ }).click();
  const search = page.getByRole('searchbox');
  await search.fill('no-matching-project');
  await page.getByRole('button', { name: 'Reset search and filters' }).click();
  await expect(search).toHaveValue('');
  await expect(search).toBeFocused();
  await expect(page.getByRole('button', { name: 'All projects', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#project-results .projectCard')).toHaveCount(inventory.length);
});

test('navigation dismisses safely and restores keyboard focus', async ({ page }, info) => {
  await page.goto('/');
  if (info.project.name === 'desktop') {
    const work = page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Work' });
    await work.focus(); await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#portfolio$/);
    return;
  }
  const menu = page.getByLabel('Open navigation');
  await menu.click();
  const work = page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Work' });
  await work.focus(); await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(page.locator('.mobileNav')).not.toHaveAttribute('open', '');
  await menu.click();
  await page.locator('h1').click({ position: { x: 8, y: 8 } });
  await expect(page.locator('.mobileNav')).not.toHaveAttribute('open', '');
});

test('detail artwork activates Three.js on demand and releases its rendering on compact layouts', async ({ page }, info) => {
  await page.goto('/portfolio/livsocial');
  const canvas = page.locator('.portfolioWebgl');
  await expect(canvas).toHaveAttribute('data-engine', 'static');
  if (info.project.name !== 'desktop') return;
  await page.locator('.caseVisual').hover();
  await expect(canvas).toHaveAttribute('data-engine', 'three');
  await expect(canvas).toHaveAttribute('data-card-active', 'true');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(canvas).toHaveAttribute('data-engine', 'static');
  await expect.poll(() => page.locator('.caseVisual img').evaluate(image => getComputedStyle(image).opacity)).toBe('1');
});

test('a failed responsive thumbnail recovers with the same project full-size thumbnail', async ({ page }) => {
  const poster = thumbnails.livsocial.src;
  await page.route('**' + poster.replace('.webp', '-card.webp'), route => route.abort());
  await page.goto('/#portfolio');
  const card = page.locator('.projectLink[href="/portfolio/livsocial"]');
  await card.scrollIntoViewIfNeeded();
  await expect.poll(async () => new URL((await card.locator('img').getAttribute('src')) ?? '', page.url()).pathname).toBe(poster);
  await expect.poll(() => card.locator('img').evaluate(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0)).toBe(true);
  await expect(card.locator('.fallback')).toHaveCount(0);
});
