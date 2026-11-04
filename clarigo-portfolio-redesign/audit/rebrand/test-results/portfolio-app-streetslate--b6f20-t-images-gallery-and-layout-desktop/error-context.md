# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> app-streetslate — route, content, images, gallery, and layout
- Location: tests\portfolio.spec.ts:54:7

# Error details

```
Error: page.goto: net::ERR_INSUFFICIENT_RESOURCES at http://127.0.0.1:3100/#portfolio
Call log:
  - navigating to "http://127.0.0.1:3100/#portfolio", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import inventory from '../lib/project-inventory.json';
  3   | import assets from '../lib/project-assets.json';
  4   | import { projectContent } from '../lib/project-content';
  5   | import { projectStories } from '../lib/project-story';
  6   | 
  7   | test('inventory and all listing cards remain complete', async ({ page }) => {
  8   |   expect(inventory).toHaveLength(47);
  9   |   expect(inventory.filter(({ kind }) => kind === 'web')).toHaveLength(19);
  10  |   expect(inventory.filter(({ kind }) => kind === 'mobile')).toHaveLength(28);
  11  |   expect(new Set(inventory.map(({ slug }) => slug)).size).toBe(47);
  12  |   for (const field of ['summary', 'overview', 'design'] as const) expect(new Set(inventory.map(({ slug }) => projectContent[slug][field])).size).toBe(47);
  13  |   for (const field of ['featureIntro', 'workflowIntro', 'cta'] as const) expect(new Set(inventory.map(({ slug }) => projectStories[slug][field])).size).toBe(47);
  14  |   await page.goto('/');
  15  |   await page.evaluate(() => document.fonts.ready.then(() => undefined));
  16  |   await expect(page.locator('.projectCard')).toHaveCount(47);
  17  |   const links = await page.locator('.projectLink').evaluateAll((elements) => elements.map((el) => el.getAttribute('href')));
  18  |   expect(links).toEqual(inventory.map(({ slug }) => '/portfolio/' + slug));
  19  |   await expect(page.locator('.heroScene canvas')).toBeAttached();
  20  |   expect(await page.locator('.heroScene canvas').evaluate((element) => {
  21  |     const context = (element as HTMLCanvasElement).getContext('webgl2');
  22  |     return Boolean(context && !context.isContextLost());
  23  |   })).toBe(true);
  24  |   await page.getByRole('button', { name: /Web & web apps/ }).click();
  25  |   await expect(page.locator('.projectCard')).toHaveCount(19);
  26  |   await page.getByRole('button', { name: /Mobile apps/ }).click();
  27  |   await expect(page.locator('.projectCard')).toHaveCount(28);
  28  |   await page.getByRole('searchbox', { name: 'Search projects' }).fill('heartsync');
  29  |   await expect(page.locator('.projectCard')).toHaveCount(1);
  30  |   await page.locator('.projectLink').click();
  31  |   await expect(page).toHaveURL('/portfolio/app-heartsync');
  32  |   await expect(page.locator('h1')).toHaveText('Heartsync.');
  33  | });
  34  | 
  35  | test('search, empty state, mobile menu, and listing alias', async ({ page }, testInfo) => {
  36  |   await page.goto('/portfolio');
  37  |   await expect(page.locator('.projectCard')).toHaveCount(47);
  38  |   await page.getByRole('searchbox').fill('no-such-project-123');
  39  |   await expect(page.getByRole('status').filter({ hasText: 'No projects' })).toBeVisible();
  40  |   await page.getByRole('searchbox').fill('Supplement Management');
  41  |   await expect(page.locator('.projectCard')).toHaveCount(1);
  42  |   await expect(page.locator('.projectCard h3')).toHaveText('Examined Life');
  43  |   await page.getByRole('searchbox').clear();
  44  |   if (testInfo.project.name !== 'desktop') {
  45  |     await page.getByLabel('Open navigation').click();
  46  |     await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  47  |     await page.getByRole('navigation', { name: 'Mobile navigation' }).getByText('Work', { exact: true }).click();
  48  |     await expect(page.locator('.mobileNav')).not.toHaveAttribute('open', '');
  49  |   }
  50  |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  51  | });
  52  | 
  53  | for (const item of inventory) {
  54  |   test(item.slug + ' — route, content, images, gallery, and layout', async ({ page }, testInfo) => {
  55  |     const failures: string[] = [];
  56  |     page.on('pageerror', (error) => failures.push(error.message));
  57  |     page.on('response', (response) => { if (response.url().startsWith('http://127.0.0.1:3100') && response.status() >= 400) failures.push(response.status() + ': ' + response.url()); });
> 58  |     await page.goto('/#portfolio');
      |                ^ Error: page.goto: net::ERR_INSUFFICIENT_RESOURCES at http://127.0.0.1:3100/#portfolio
  59  |     const destination = '/portfolio/' + item.slug;
  60  |     const routeResponse = page.waitForResponse((response) => new URL(response.url()).pathname === destination);
  61  |     await page.locator('.projectLink[href="' + destination + '"]').click();
  62  |     expect((await routeResponse).status()).toBe(200);
  63  |     const content = projectContent[item.slug];
  64  |     const name = content.displayName ?? item.name;
  65  |     await expect(page.locator('h1')).toHaveText(name + '.');
  66  |     // Client navigation can briefly retain the preceding route's streamed metadata.
  67  |     // Assert the complete settled set, so persistent duplicates still fail.
  68  |     await expect.poll(() => page.locator('meta[name="description"]').evaluateAll((elements) => elements.map((element) => element.getAttribute('content')))).toEqual([content.summary]);
  69  |     await expect.poll(() => page.locator('link[rel="canonical"]').evaluateAll((elements) => elements.map((element) => element.getAttribute('href')))).toEqual(['https://clarigoinfotech.com/portfolio/' + item.slug]);
  70  |     for (const id of ['overview', 'features', 'workflow', 'solution', 'design', 'engineering', 'screens', 'next-step']) await expect(page.locator('#' + id)).toHaveCount(1);
  71  |     await expect(page.locator('.caseFeatureGrid article')).toHaveCount(4);
  72  |     await expect(page.locator('.workflowSteps>li')).toHaveCount(3);
  73  |     await expect(page.locator('.solutionList>li')).toHaveCount(3);
  74  |     await expect(page.locator('.engineeringTopics>li')).toHaveCount(3);
  75  |     await expect(page.locator('#engineering h2')).toHaveText(projectStories[item.slug].engineering.title);
  76  |     await expect(page.locator('.projectClosing p')).toHaveText(projectStories[item.slug].cta);
  77  |     await expect(page.locator('#overview .caseBody>p')).toHaveText(content.overview);
  78  |     expect(await page.locator('main').innerText()).not.toMatch(/lorem ipsum|placeholder|project from the Clarigo archive/i);
  79  |     const poster = (assets as Record<string, { poster: { src: string } }>)[item.slug].poster.src;
  80  |     expect(decodeURIComponent((await page.locator('.caseVisual img').getAttribute('src')) ?? '')).toContain(poster);
  81  |     const set = (assets as Record<string, { poster: { src: string }; images: { src: string }[] }>)[item.slug];
  82  |     const allowed = [set.poster.src, ...set.images.map((asset) => asset.src)];
  83  |     const shown = await page.locator('.caseHero img, #features img, #solution img, #screens img, #responsive img').evaluateAll((elements) => elements.map((element) => element.getAttribute('src')));
  84  |     for (const src of shown) expect(allowed).toContain(new URL(src ?? '', 'http://127.0.0.1:3100').pathname);
  85  |     await page.locator('img').evaluateAll((elements) => elements.forEach((element) => { (element as HTMLImageElement).loading = 'eager'; }));
  86  |     await expect.poll(async () => page.locator('img').evaluateAll((elements) => elements.filter((element) => !(element as HTMLImageElement).complete || !(element as HTMLImageElement).naturalWidth).map((element) => element.getAttribute('src')))).toEqual([]);
  87  |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  88  |     const first = page.locator('.galleryOpen').first();
  89  |     await first.click();
  90  |     await expect(page.getByRole('dialog')).toBeVisible();
  91  |     if (await page.getByRole('button', { name: 'Next image', exact: true }).count()) {
  92  |       await page.getByRole('button', { name: 'Next image', exact: true }).click();
  93  |       await expect(page.locator('.galleryDialogBar small')).toContainText('2 /');
  94  |     }
  95  |     await page.keyboard.press('Escape');
  96  |     await expect(page.getByRole('dialog')).not.toBeVisible();
  97  |     await expect(first).toBeFocused();
  98  |     expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
  99  |     const group = inventory.filter(({ kind }) => kind === item.kind);
  100 |     const next = group[(group.findIndex(({ slug }) => slug === item.slug) + 1) % group.length];
  101 |     await expect(page.locator('.nextProjectLink')).toHaveAttribute('href', '/portfolio/' + next.slug);
  102 |     expect(failures).toEqual([]);
  103 |     if (['livsocial', 'app-habitstride', 'app-heartsync', 'app-supplement-management'].includes(item.slug)) {
  104 |       await page.evaluate(() => window.scrollTo(0, 0));
  105 |       await page.screenshot({ path: 'audit/' + testInfo.project.name + '-' + item.slug + '.png' });
  106 |     }
  107 |   });
  108 | }
  109 | 
  110 | test('404, preserved old slugs, sitemap, and robots', async ({ page, request }) => {
  111 |   expect((await page.goto('/portfolio/no-such-project'))?.status()).toBe(404);
  112 |   await expect(page.getByRole('link', { name: 'Explore all projects' })).toBeVisible();
  113 |   await page.goto('/portfolio/app-case-managment-ase');
  114 |   await expect(page).toHaveURL('/portfolio/app-case-management-ase');
  115 |   await page.goto('/portfolio/app-suppliment-management');
  116 |   await expect(page).toHaveURL('/portfolio/app-supplement-management');
  117 |   const sitemap = await request.get('/sitemap.xml');
  118 |   expect(sitemap.status()).toBe(200);
  119 |   expect((await sitemap.text()).match(/<loc>/g)).toHaveLength(48);
  120 |   expect((await request.get('/robots.txt')).status()).toBe(200);
  121 | });
  122 | 
  123 | test('gallery state resets when navigating to the next project', async ({ page }) => {
  124 |   const failures: string[] = [];
  125 |   page.on('pageerror', (error) => failures.push(error.message));
  126 |   await page.goto('/portfolio/printlific');
  127 |   await page.locator('.galleryOpen').first().click();
  128 |   await page.getByRole('button', { name: 'Next image', exact: true }).click();
  129 |   await page.keyboard.press('Escape');
  130 |   await page.locator('.nextProjectLink').click();
  131 |   await expect(page.locator('h1')).toHaveText('Nerdrabbit.');
  132 |   await page.locator('.galleryOpen').first().click();
  133 |   await expect(page.getByRole('dialog')).toBeVisible();
  134 |   expect(failures).toEqual([]);
  135 | });
  136 | 
  137 | test('reduced motion and 320px layout', async ({ page }) => {
  138 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  139 |   await page.setViewportSize({ width: 320, height: 800 });
  140 |   await page.goto('/');
  141 |   await expect(page.locator('.projectCard').first()).toBeVisible();
  142 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  143 |   await page.screenshot({ path: 'audit/narrow-reduced-motion.png' });
  144 | });
  145 | 
```