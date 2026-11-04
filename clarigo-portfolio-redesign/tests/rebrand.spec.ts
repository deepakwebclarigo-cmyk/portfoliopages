import { test, expect } from '@playwright/test';
import mapping from '../audit/rebrand/name-map.json';
import inventory from '../lib/project-inventory.json';

test('renamed brands resolve through search and preserve every previous project URL', async ({ page, request }) => {
  for (const brand of mapping) {
    for (let i=0;i<brand.oldSlugs.length;i++) {
      const response=await request.get('/portfolio/'+brand.oldSlugs[i], { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      expect(response.headers().location).toBe('/portfolio/'+brand.slugs[i]);
      expect(inventory.find(project=>project.slug===brand.slugs[i])?.name).toBe(brand.name);
    }
  }
  await page.goto('/');
  for (const brand of mapping) {
    await page.getByRole('searchbox').fill(brand.name);
    await expect(page.locator('.projectCard')).toHaveCount(brand.slugs.length);
    for (const slug of brand.slugs) await expect(page.locator('.projectLink[href="/portfolio/'+slug+'"]').locator('h3')).toHaveText(brand.name);
  }
});

test('published HTML, metadata, structured data and image URLs contain only the current brands', async ({ request }) => {
  const forbidden=/streamdatax|tukeeconnect|parachute|whizara|esplatform|leadmanagement|simplyrecruited|infinote|silasync|digitalhabittracker|onepantry|streetsheets|brtennis/;
  for (const route of ['/', '/portfolio', ...inventory.map(project=>'/portfolio/'+project.slug)]) {
    const response=await request.get(route);
    expect(response.status()).toBe(200);
    expect((await response.text()).toLowerCase().replace(/[^a-z0-9]/g,''), route).not.toMatch(forbidden);
  }
  const sitemap=await request.get('/sitemap.xml');
  expect((await sitemap.text()).toLowerCase().replace(/[^a-z0-9]/g,'')).not.toMatch(forbidden);
});
