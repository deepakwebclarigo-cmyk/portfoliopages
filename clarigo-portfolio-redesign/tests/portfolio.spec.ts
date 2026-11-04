import { test, expect } from '@playwright/test';
import inventory from '../lib/project-inventory.json';
import assets from '../lib/project-assets.json';
import { projectContent } from '../lib/project-content';
import { projectStories } from '../lib/project-story';

test('inventory and all listing cards remain complete', async ({ page }) => {
  expect(inventory).toHaveLength(47);
  expect(inventory.filter(({ kind }) => kind === 'web')).toHaveLength(19);
  expect(inventory.filter(({ kind }) => kind === 'mobile')).toHaveLength(28);
  expect(new Set(inventory.map(({ slug }) => slug)).size).toBe(47);
  for (const field of ['summary', 'overview', 'design'] as const) expect(new Set(inventory.map(({ slug }) => projectContent[slug][field])).size).toBe(47);
  for (const field of ['featureIntro', 'workflowIntro', 'cta'] as const) expect(new Set(inventory.map(({ slug }) => projectStories[slug][field])).size).toBe(47);
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  await expect(page.locator('.projectCard')).toHaveCount(47);
  await expect(page.locator('.projectOpen')).toHaveCount(0);
  await page.locator('.projectArt img').evaluateAll(images => images.forEach(image => { (image as HTMLImageElement).loading = 'eager'; }));
  await expect.poll(() => page.locator('.projectArt img').evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  const artwork = await page.locator('.projectArt img').evaluateAll(images => images.map(element => {
    const image = element as HTMLImageElement, style = getComputedStyle(image), box = image.getBoundingClientRect(), frame = image.closest('.visual')!.getBoundingClientRect();
    const scale = Math.min(box.width / image.naturalWidth, box.height / image.naturalHeight);
    const paintedWidth = image.naturalWidth * scale, paintedHeight = image.naturalHeight * scale;
    const matrix = new DOMMatrixReadOnly(style.transform);
    return { fit: style.objectFit, position: style.objectPosition, uniform: Math.abs(matrix.m11-matrix.m22)<.001&&matrix.m11>=.95&&matrix.m11<=1, inside: paintedWidth <= frame.width + 1 && paintedHeight <= frame.height + 1, centered: Math.abs(box.x + box.width / 2 - frame.x - frame.width / 2) < 1 && Math.abs(box.y + box.height / 2 - frame.y - frame.height / 2) < 1 };
  }));
  expect(artwork).toHaveLength(47);
  for (const image of artwork) expect(image).toEqual({ fit: 'contain', position: '50% 50%', uniform: true, inside: true, centered: true });
  const links = await page.locator('.projectLink').evaluateAll((elements) => elements.map((el) => el.getAttribute('href')));
  expect(links).toEqual(inventory.map(({ slug }) => '/portfolio/' + slug));
  await expect(page.locator('.heroScene')).toHaveCount(0);
  await expect(page.locator('canvas.portfolioWebgl')).toHaveCount(1);
  await page.getByRole('button', { name: /Web & web apps/ }).click();
  await expect(page.locator('.projectCard')).toHaveCount(19);
  await page.getByRole('button', { name: /Mobile apps/ }).click();
  await expect(page.locator('.projectCard')).toHaveCount(28);
  await page.getByRole('searchbox', { name: 'Search projects' }).fill('heartsync');
  await expect(page.locator('.projectCard')).toHaveCount(1);
  await page.locator('.projectLink').click();
  await expect(page).toHaveURL('/portfolio/app-heartsync');
  await expect(page.locator('h1')).toHaveText('Heartsync.');
});

test('search, empty state, mobile menu, and listing alias', async ({ page }, testInfo) => {
  await page.goto('/portfolio');
  await expect(page.locator('.projectCard')).toHaveCount(47);
  await page.getByRole('searchbox').fill('no-such-project-123');
  await expect(page.getByRole('status').filter({ hasText: 'No projects' })).toBeVisible();
  await page.getByRole('searchbox').fill('Supplement Management');
  await expect(page.locator('.projectCard')).toHaveCount(1);
  await expect(page.locator('.projectCard h3')).toHaveText('Examined Life');
  await page.getByRole('searchbox').clear();
  if (testInfo.project.name !== 'desktop') {
    await page.getByLabel('Open navigation').click();
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByText('Work', { exact: true }).click();
    await expect(page.locator('.mobileNav')).not.toHaveAttribute('open', '');
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

for (const item of inventory) {
  test(item.slug + ' — route, content, images, gallery, and layout', async ({ page }, testInfo) => {
    const failures: string[] = [];
    page.on('pageerror', (error) => failures.push(error.message));
    page.on('response', (response) => { if (response.url().startsWith('http://127.0.0.1:3100') && response.status() >= 400) failures.push(response.status() + ': ' + response.url()); });
    await page.goto('/#portfolio');
    const destination = '/portfolio/' + item.slug;
    const routeResponse = page.waitForResponse((response) => new URL(response.url()).pathname === destination);
    await page.locator('.projectLink[href="' + destination + '"]').click();
    expect((await routeResponse).status()).toBe(200);
    const content = projectContent[item.slug];
    const name = content.displayName ?? item.name;
    await expect(page.locator('h1')).toHaveText(name + '.');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
    expect(await page.locator('h1 .motionWord').count()).toBeGreaterThan(0);
    await expect(page.locator('.projectGallery>figure').first()).toHaveAttribute('data-motion-reveal', 'pending');
    // Client navigation can briefly retain the preceding route's streamed metadata.
    // Assert the complete settled set, so persistent duplicates still fail.
    await expect.poll(() => page.locator('meta[name="description"]').evaluateAll((elements) => elements.map((element) => element.getAttribute('content')))).toEqual([content.summary]);
    await expect.poll(() => page.locator('link[rel="canonical"]').evaluateAll((elements) => elements.map((element) => element.getAttribute('href')))).toEqual(['https://clarigoinfotech.com/portfolio/' + item.slug]);
    for (const id of ['overview', 'features', 'workflow', 'solution', 'design', 'engineering', 'screens', 'next-step']) await expect(page.locator('#' + id)).toHaveCount(1);
    await expect(page.locator('.caseFeatureGrid article')).toHaveCount(4);
    await expect(page.locator('.workflowSteps>li')).toHaveCount(3);
    await expect(page.locator('.solutionList>li')).toHaveCount(3);
    await expect(page.locator('.engineeringTopics>li')).toHaveCount(3);
    await expect(page.locator('#engineering h2')).toHaveText(projectStories[item.slug].engineering.title);
    await expect(page.locator('.projectClosing p')).toHaveText(projectStories[item.slug].cta);
    await expect(page.locator('#overview .caseBody>p')).toHaveText(content.overview);
    expect(await page.locator('main').innerText()).not.toMatch(/lorem ipsum|placeholder|project from the Clarigo archive/i);
    const poster = (assets as Record<string, { poster: { src: string } }>)[item.slug].poster.src;
    expect(decodeURIComponent((await page.locator('.caseVisual img').getAttribute('src')) ?? '')).toContain(poster);
    const set = (assets as Record<string, { poster: { src: string }; images: { src: string }[] }>)[item.slug];
    const allowed = [set.poster.src, ...set.images.map((asset) => asset.src)];
    const shown = await page.locator('.caseHero img, #features img, #solution img, #screens img, #responsive img').evaluateAll((elements) => elements.map((element) => element.getAttribute('src')));
    for (const src of shown) expect(allowed).toContain(new URL(src ?? '', 'http://127.0.0.1:3100').pathname);
    await page.locator('img').evaluateAll((elements) => elements.forEach((element) => { (element as HTMLImageElement).loading = 'eager'; }));
    await expect.poll(async () => page.locator('img').evaluateAll((elements) => elements.filter((element) => !(element as HTMLImageElement).complete || !(element as HTMLImageElement).naturalWidth).map((element) => element.getAttribute('src')))).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    const first = page.locator('.galleryOpen').first();
    await first.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    if (await page.getByRole('button', { name: 'Next image', exact: true }).count()) {
      await page.getByRole('button', { name: 'Next image', exact: true }).click();
      await expect(page.locator('.galleryDialogBar small')).toContainText('2 /');
    }
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(first).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
    const group = inventory.filter(({ kind }) => kind === item.kind);
    const next = group[(group.findIndex(({ slug }) => slug === item.slug) + 1) % group.length];
    await expect(page.locator('.nextProjectLink')).toHaveAttribute('href', '/portfolio/' + next.slug);
    expect(failures).toEqual([]);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
    await expect.poll(() => page.locator('.motionWord, .featureColumn>article, .workflowSteps>li, .projectGallery>figure').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1' && getComputedStyle(node).transform === 'none'))).toBe(true);
    if (['livsocial', 'app-habitstride', 'app-heartsync', 'app-supplement-management'].includes(item.slug)) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: 'audit/' + testInfo.project.name + '-' + item.slug + '.png' });
    }
  });
}

test('404, preserved old slugs, sitemap, and robots', async ({ page, request }) => {
  expect((await page.goto('/portfolio/no-such-project'))?.status()).toBe(404);
  await expect(page.getByRole('link', { name: 'Explore all projects' })).toBeVisible();
  await page.goto('/portfolio/app-case-managment-ase');
  await expect(page).toHaveURL('/portfolio/app-case-management-ase');
  await page.goto('/portfolio/app-suppliment-management');
  await expect(page).toHaveURL('/portfolio/app-supplement-management');
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  expect((await sitemap.text()).match(/<loc>/g)).toHaveLength(48);
  expect((await request.get('/robots.txt')).status()).toBe(200);
});

test('gallery state resets when navigating to the next project', async ({ page }) => {
  const failures: string[] = [];
  page.on('pageerror', (error) => failures.push(error.message));
  await page.goto('/portfolio/printlific');
  await page.locator('.galleryOpen').first().click();
  await page.getByRole('button', { name: 'Next image', exact: true }).click();
  await page.keyboard.press('Escape');
  await page.locator('.nextProjectLink').click();
  await expect(page.locator('h1')).toHaveText('Nerdrabbit.');
  await page.locator('.galleryOpen').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(failures).toEqual([]);
});

test('reduced motion and 320px layout', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  await expect(page.locator('.projectCard').first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.screenshot({ path: 'audit/narrow-reduced-motion.png' });
});
