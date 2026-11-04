# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> app-livsocial — route, content, images, gallery, and layout
- Location: tests\portfolio.spec.ts:55:7

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
+   "Explore selected web and mobile projects from Clarigo Infotech.",
    "LivSocial’s mobile interface brings a social feed, profile discovery, and community content into a compact touch layout.",
  ]

Call Log:
- Timeout 15000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - alert [ref=e3]: LivSocial — Mobile Project | Clarigo Infotech
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "Clarigo portfolio home" [ref=e6] [cursor=pointer]:
        - /url: /
        - img "Clarigo Infotech" [ref=e7]
      - navigation "Main navigation" [ref=e8]:
        - link "Home" [ref=e9] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/
        - link "Services" [ref=e10] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/services
        - link "Work" [ref=e11] [cursor=pointer]:
          - /url: /#portfolio
        - link "Contact" [ref=e12] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/contact
      - link "Book a free AI consultation" [ref=e13] [cursor=pointer]:
        - /url: https://clarigoinfotech.com/contact
        - generic [ref=e14]: Book Free AI Consultation
  - main [ref=e18]:
    - generic [ref=e19]:
      - link "All projects" [ref=e20] [cursor=pointer]:
        - /url: /#portfolio
      - generic [ref=e23]:
        - generic [ref=e24]:
          - generic [ref=e25]: MOBILE EXPERIENCE / 01
          - heading "LivSocial." [level=1] [ref=e27]
          - paragraph [ref=e28]: LivSocial’s mobile interface brings a social feed, profile discovery, and community content into a compact touch layout.
          - generic [ref=e29]:
            - generic [ref=e30]:
              - generic [ref=e31]: PROJECT TYPE
              - strong [ref=e32]: Mobile apps
            - generic [ref=e33]:
              - generic [ref=e34]: FOCUS
              - strong [ref=e35]: Social & community
        - generic [ref=e36]:
          - img "LivSocial — original project artwork" [ref=e40]
          - generic [ref=e41]: ORIGINAL PROJECT ARTWORK
    - navigation "Case study sections" [ref=e42]:
      - link "Overview" [ref=e43] [cursor=pointer]:
        - /url: "#overview"
      - link "Key features" [ref=e44] [cursor=pointer]:
        - /url: "#features"
      - link "How it works" [ref=e45] [cursor=pointer]:
        - /url: "#workflow"
      - link "Solution" [ref=e46] [cursor=pointer]:
        - /url: "#solution"
      - link "Design" [ref=e47] [cursor=pointer]:
        - /url: "#design"
      - link "Technical" [ref=e48] [cursor=pointer]:
        - /url: "#engineering"
      - link "Screenshots" [ref=e49] [cursor=pointer]:
        - /url: "#screens"
    - generic [ref=e50]:
      - generic [ref=e51]:
        - generic [ref=e52]: "01"
        - text: PROJECT OVERVIEW
      - generic [ref=e53]:
        - heading "Conversations, made mobile." [level=2] [ref=e54]
        - paragraph [ref=e56]: The mobile LivSocial artwork shows sign-in, people, and content-feed screens within the same product family as its web presentation. Image posts and conversation controls occupy the main screen, while profile imagery and navigation help organize the community around the feed.
    - generic [ref=e58]:
      - generic [ref=e59]:
        - generic [ref=e60]:
          - generic [ref=e61]: "02"
          - text: KEY FEATURES
        - heading "Designed around the experience." [level=2] [ref=e62]: Designed aroundthe experience.
        - paragraph [ref=e63]: A compact social feed that keeps photography, personal identity, and conversation controls together on a touch screen.
      - generic [ref=e64]:
        - generic [ref=e65]:
          - article [ref=e66]:
            - generic [ref=e72]:
              - heading "Post cards" [level=3] [ref=e73]
              - paragraph [ref=e74]: Images and written updates share a vertically arranged feed.
          - article [ref=e75]:
            - generic [ref=e80]:
              - heading "Profile discovery" [level=3] [ref=e81]
              - paragraph [ref=e82]: People and profile imagery form part of the community interface.
        - generic [ref=e83]:
          - article [ref=e84]:
            - generic [ref=e91]:
              - heading "Account entry" [level=3] [ref=e92]
              - paragraph [ref=e93]: A dedicated welcome and sign-in view introduces the product.
          - article [ref=e94]:
            - generic [ref=e101]:
              - heading "Mobile navigation" [level=3] [ref=e102]
              - paragraph [ref=e103]: Compact navigation keeps the main areas within reach.
    - generic [ref=e105]:
      - generic [ref=e106]:
        - generic [ref=e107]:
          - generic [ref=e108]: "03"
          - text: PRODUCT JOURNEY
        - heading "How LivSocial works." [level=2] [ref=e109]
        - paragraph [ref=e110]: The mobile artwork presents the feed as the center of a wider people and community experience.
      - list [ref=e111]:
        - listitem [ref=e112]:
          - generic [ref=e113]: "01"
          - heading "Enter the social space" [level=3] [ref=e117]
          - paragraph [ref=e118]: The branded introduction and account views establish the mobile product's gold-and-white identity.
        - listitem [ref=e119]:
          - generic [ref=e120]: "02"
          - heading "Browse the posts" [level=3] [ref=e124]
          - paragraph [ref=e125]: Photo-led cards and written updates share a vertical reading pattern within the main feed.
        - listitem [ref=e126]:
          - generic [ref=e127]: "03"
          - heading "Explore the people" [level=3] [ref=e129]
          - paragraph [ref=e130]: Profile imagery and compact navigation connect a post with the wider community around it.
    - generic [ref=e131]:
      - generic [ref=e132]:
        - generic [ref=e133]: "04"
        - text: DESIGN CHALLENGE & SOLUTION
      - generic [ref=e135]:
        - heading "Keep a social feed readable in the hand." [level=2] [ref=e136]
        - paragraph [ref=e137]: A smaller screen leaves less room for the supporting context found on desktop. LivSocial's mobile composition brings identity, media, and nearby post controls into a single vertical hierarchy.
        - list [ref=e138]:
          - listitem [ref=e139]:
            - generic [ref=e143]:
              - heading "A repeatable post pattern" [level=3] [ref=e144]
              - paragraph [ref=e145]: White cards separate individual updates while allowing photography to remain prominent.
          - listitem [ref=e146]:
            - generic [ref=e150]:
              - heading "Identity beside content" [level=3] [ref=e151]
              - paragraph [ref=e152]: Avatars and short personal information keep the author connected to the post.
          - listitem [ref=e153]:
            - generic [ref=e157]:
              - heading "Compact destinations" [level=3] [ref=e158]
              - paragraph [ref=e159]: A small navigation system provides continuity beyond the central feed.
    - generic [ref=e160]:
      - generic [ref=e161]:
        - generic [ref=e162]: "05"
        - text: DESIGN DIRECTION
      - generic [ref=e163]:
        - generic [ref=e164]:
          - heading "Its own identity. In every detail." [level=2] [ref=e165]: Its own identity.In every detail.
          - generic [ref=e166]: Social & community
        - generic [ref=e167]:
          - paragraph [ref=e168]: Warm gold accents carry the identity into a smaller screen. Rounded profile images, white post cards, and a compact bottom navigation provide a consistent frame for media-heavy content. The gallery includes the mobile-specific artwork retained from the source.
          - generic [ref=e169]: Design observations from the supplied project artwork.
    - generic [ref=e174]:
      - generic [ref=e175]:
        - generic [ref=e176]:
          - generic [ref=e177]: "06"
          - text: TECHNICAL PERSPECTIVE
        - heading "Content cards adapted for touch." [level=2] [ref=e178]
        - paragraph [ref=e179]: The original mobile layouts place post media, text, author identity, and controls within repeated card structures. This explains the visible interface composition without attributing an undocumented social backend or moderation implementation.
        - list [ref=e180]:
          - listitem [ref=e181]: Post composition
          - listitem [ref=e184]: Profile identity
          - listitem [ref=e187]: Touch navigation
      - complementary "Clarigo company technology capabilities" [ref=e190]:
        - generic [ref=e192]: CLARIGO ENGINEERING TOOLKIT
        - generic [ref=e193]:
          - generic [ref=e194]: React
          - generic [ref=e195]: Next.js
          - generic [ref=e196]: Node.js
          - generic [ref=e197]: Flutter
          - generic [ref=e198]: Python
          - generic [ref=e199]: Docker
        - paragraph [ref=e200]: Published company capabilities. The original project material does not identify a project-specific technology stack.
        - link "Explore Clarigo's app development" [ref=e201] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/services/app-development
    - generic [ref=e206]:
      - generic [ref=e207]:
        - generic [ref=e208]: "07"
        - text: UI SCREENSHOTS & ARTWORK
      - generic [ref=e209]:
        - heading "Inside LivSocial." [level=2] [ref=e210]
        - paragraph [ref=e211]: Explore the original interface screens. Select any image for a closer look.
      - figure "INTERFACE SCREEN 01" [ref=e213]:
        - button "Expand LivSocial interface view 1" [ref=e214] [cursor=pointer]:
          - img "LivSocial — interface screen 1" [ref=e215]
        - generic [ref=e222]:
          - generic [ref=e223]: INTERFACE SCREEN
          - generic [ref=e224]: "01"
    - region "Project sources" [ref=e225]:
      - generic [ref=e226]:
        - generic [ref=e227]: SOURCE MATERIAL
        - paragraph [ref=e228]: Project descriptions, journeys, and design considerations interpret the original artwork and available overview. They do not imply unpublished client briefs, verified implementation details, app-store availability, or measured business results.
      - link "Original project page" [ref=e229] [cursor=pointer]:
        - /url: https://clarigo-voluble-youtiao-e0781d.netlify.app/landing%20page/livsocial.html
    - link "NEXT MOBILE PROJECT Simply Recruited" [ref=e234] [cursor=pointer]:
      - /url: /portfolio/app-simply-recruited
      - generic [ref=e235]:
        - generic [ref=e236]: NEXT MOBILE PROJECT
        - strong [ref=e237]: Simply Recruited
    - generic [ref=e240]:
      - generic [ref=e241]:
        - generic [ref=e242]:
          - generic [ref=e243]: KEEP EXPLORING
          - heading "More perspectives." [level=2] [ref=e244]
        - link "View all work" [ref=e245] [cursor=pointer]:
          - /url: /#portfolio
      - generic [ref=e249]:
        - link "Simply Recruited — original project artwork Sports recruitment Simply Recruited" [ref=e250] [cursor=pointer]:
          - /url: /portfolio/app-simply-recruited
          - img "Simply Recruited — original project artwork" [ref=e254]
          - generic [ref=e255]: Sports recruitment
          - strong [ref=e256]: Simply Recruited
        - link "Infinote — original project artwork Document capture & files Infinote" [ref=e259] [cursor=pointer]:
          - /url: /portfolio/app-infinote
          - img "Infinote — original project artwork" [ref=e263]
          - generic [ref=e264]: Document capture & files
          - strong [ref=e265]: Infinote
        - link "Silasync — original project artwork Logistics & shipment records Silasync" [ref=e268] [cursor=pointer]:
          - /url: /portfolio/app-silasync
          - img "Silasync — original project artwork" [ref=e272]
          - generic [ref=e273]: Logistics & shipment records
          - strong [ref=e274]: Silasync
    - generic [ref=e278]:
      - generic [ref=e279]:
        - generic [ref=e280]: YOUR NEXT PRODUCT
        - heading "Inspired by LivSocial?" [level=2] [ref=e281]:
          - text: Inspired by
          - generic [ref=e282]: LivSocial?
        - paragraph [ref=e283]: Taking a community product mobile? Let's preserve its social context within a clear touch experience.
      - generic [ref=e284]:
        - link "Discuss your project" [ref=e285] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/contact
        - link "Explore the web project" [ref=e289] [cursor=pointer]:
          - /url: /portfolio/livsocial
        - link "Browse all 47 projects" [ref=e292] [cursor=pointer]:
          - /url: /#portfolio
  - contentinfo [ref=e295]:
    - link [ref=e296] [cursor=pointer]:
      - /url: /
      - img "Clarigo Infotech" [ref=e297]
    - generic [ref=e298]: AI-first engineering · 10+ years of delivery
    - generic [ref=e299]: © 2026 Clarigo Infotech
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import inventory from '../lib/project-inventory.json';
  3   | import assets from '../lib/project-assets.json';
  4   | import { projectContent } from '../lib/project-content';
  5   | import { projectStories } from '../lib/project-story';
  6   | import exclusions from '../lib/asset-exclusions.json';
  7   | 
  8   | test('inventory and all listing cards remain complete', async ({ page }) => {
  9   |   expect(inventory).toHaveLength(47);
  10  |   expect(inventory.filter(({ kind }) => kind === 'web')).toHaveLength(19);
  11  |   expect(inventory.filter(({ kind }) => kind === 'mobile')).toHaveLength(28);
  12  |   expect(new Set(inventory.map(({ slug }) => slug)).size).toBe(47);
  13  |   for (const field of ['summary', 'overview', 'design'] as const) expect(new Set(inventory.map(({ slug }) => projectContent[slug][field])).size).toBe(47);
  14  |   for (const field of ['featureIntro', 'workflowIntro', 'cta'] as const) expect(new Set(inventory.map(({ slug }) => projectStories[slug][field])).size).toBe(47);
  15  |   await page.goto('/');
  16  |   await page.evaluate(() => document.fonts.ready.then(() => undefined));
  17  |   await expect(page.locator('.projectCard')).toHaveCount(47);
  18  |   const links = await page.locator('.projectLink').evaluateAll((elements) => elements.map((el) => el.getAttribute('href')));
  19  |   expect(links).toEqual(inventory.map(({ slug }) => '/portfolio/' + slug));
  20  |   await expect(page.locator('.heroScene canvas')).toBeAttached();
  21  |   expect(await page.locator('.heroScene canvas').evaluate((element) => {
  22  |     const context = (element as HTMLCanvasElement).getContext('webgl2');
  23  |     return Boolean(context && !context.isContextLost());
  24  |   })).toBe(true);
  25  |   await page.getByRole('button', { name: /Web & web apps/ }).click();
  26  |   await expect(page.locator('.projectCard')).toHaveCount(19);
  27  |   await page.getByRole('button', { name: /Mobile apps/ }).click();
  28  |   await expect(page.locator('.projectCard')).toHaveCount(28);
  29  |   await page.getByRole('searchbox', { name: 'Search projects' }).fill('heartsync');
  30  |   await expect(page.locator('.projectCard')).toHaveCount(1);
  31  |   await page.locator('.projectLink').click();
  32  |   await expect(page).toHaveURL('/portfolio/app-heartsync');
  33  |   await expect(page.locator('h1')).toHaveText('Heartsync.');
  34  | });
  35  | 
  36  | test('search, empty state, mobile menu, and listing alias', async ({ page }, testInfo) => {
  37  |   await page.goto('/portfolio');
  38  |   await expect(page.locator('.projectCard')).toHaveCount(47);
  39  |   await page.getByRole('searchbox').fill('no-such-project-123');
  40  |   await expect(page.getByRole('status').filter({ hasText: 'No projects' })).toBeVisible();
  41  |   await page.getByRole('searchbox').fill('Supplement Management');
  42  |   await expect(page.locator('.projectCard')).toHaveCount(1);
  43  |   await expect(page.locator('.projectCard h3')).toHaveText('Examined Life');
  44  |   await page.getByRole('searchbox').clear();
  45  |   if (testInfo.project.name !== 'desktop') {
  46  |     await page.getByLabel('Open navigation').click();
  47  |     await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  48  |     await page.getByRole('navigation', { name: 'Mobile navigation' }).getByText('Work', { exact: true }).click();
  49  |     await expect(page.locator('.mobileNav')).not.toHaveAttribute('open', '');
  50  |   }
  51  |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  52  | });
  53  | 
  54  | for (const item of inventory) {
  55  |   test(item.slug + ' — route, content, images, gallery, and layout', async ({ page }, testInfo) => {
  56  |     const failures: string[] = [];
  57  |     page.on('pageerror', (error) => failures.push(error.message));
  58  |     page.on('response', (response) => { if (response.url().startsWith('http://127.0.0.1:3100') && response.status() >= 400) failures.push(response.status() + ': ' + response.url()); });
  59  |     await page.goto('/#portfolio');
  60  |     const destination = '/portfolio/' + item.slug;
  61  |     const routeResponse = page.waitForResponse((response) => new URL(response.url()).pathname === destination);
  62  |     await page.locator('.projectLink[href="' + destination + '"]').click();
  63  |     expect((await routeResponse).status()).toBe(200);
  64  |     const content = projectContent[item.slug];
  65  |     const name = content.displayName ?? item.name;
  66  |     await expect(page.locator('h1')).toHaveText(name + '.');
  67  |     // Client navigation can briefly retain the preceding route's streamed metadata.
  68  |     // Assert the complete settled set, so persistent duplicates still fail.
> 69  |     await expect.poll(() => page.locator('meta[name="description"]').evaluateAll((elements) => elements.map((element) => element.getAttribute('content')))).toEqual([content.summary]);
      |                                                                                                                                                             ^ Error: expect(received).toEqual(expected) // deep equality
  70  |     await expect.poll(() => page.locator('link[rel="canonical"]').evaluateAll((elements) => elements.map((element) => element.getAttribute('href')))).toEqual(['https://clarigoinfotech.com/portfolio/' + item.slug]);
  71  |     for (const id of ['overview', 'features', 'workflow', 'solution', 'design', 'engineering', 'screens', 'next-step']) await expect(page.locator('#' + id)).toHaveCount(1);
  72  |     await expect(page.locator('.caseFeatureGrid article')).toHaveCount(4);
  73  |     await expect(page.locator('.workflowSteps>li')).toHaveCount(3);
  74  |     await expect(page.locator('.solutionList>li')).toHaveCount(3);
  75  |     await expect(page.locator('.engineeringTopics>li')).toHaveCount(3);
  76  |     await expect(page.locator('#engineering h2')).toHaveText(projectStories[item.slug].engineering.title);
  77  |     await expect(page.locator('.projectClosing p')).toHaveText(projectStories[item.slug].cta);
  78  |     await expect(page.locator('#overview .caseBody>p')).toHaveText(content.overview);
  79  |     expect(await page.locator('main').innerText()).not.toMatch(/lorem ipsum|placeholder|project from the Clarigo archive/i);
  80  |     const poster = (assets as Record<string, { poster: { src: string } }>)[item.slug].poster.src;
  81  |     expect(decodeURIComponent((await page.locator('.caseVisual img').getAttribute('src')) ?? '')).toContain(poster);
  82  |     const set = (assets as Record<string, { poster: { src: string }; images: { src: string; source: string }[] }>)[item.slug];
  83  |     const excluded = (exclusions as Record<string, Record<string, string>>)[item.slug] ?? {};
  84  |     const allowed = [set.poster.src, ...set.images.filter((asset) => !Object.hasOwn(excluded, decodeURIComponent(asset.source.split('/').pop() ?? ''))).map((asset) => asset.src)];
  85  |     const shown = await page.locator('.caseHero img, #features img, #solution img, #screens img, #responsive img').evaluateAll((elements) => elements.map((element) => element.getAttribute('src')));
  86  |     for (const src of shown) expect(allowed).toContain(new URL(src ?? '', 'http://127.0.0.1:3100').pathname);
  87  |     await page.locator('img').evaluateAll((elements) => elements.forEach((element) => { (element as HTMLImageElement).loading = 'eager'; }));
  88  |     await expect.poll(async () => page.locator('img').evaluateAll((elements) => elements.filter((element) => !(element as HTMLImageElement).complete || !(element as HTMLImageElement).naturalWidth).map((element) => element.getAttribute('src')))).toEqual([]);
  89  |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  90  |     const first = page.locator('.galleryOpen').first();
  91  |     await first.click();
  92  |     await expect(page.getByRole('dialog')).toBeVisible();
  93  |     if (await page.getByRole('button', { name: 'Next image', exact: true }).count()) {
  94  |       await page.getByRole('button', { name: 'Next image', exact: true }).click();
  95  |       await expect(page.locator('.galleryDialogBar small')).toContainText('2 /');
  96  |     }
  97  |     await page.keyboard.press('Escape');
  98  |     await expect(page.getByRole('dialog')).not.toBeVisible();
  99  |     await expect(first).toBeFocused();
  100 |     expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
  101 |     const group = inventory.filter(({ kind }) => kind === item.kind);
  102 |     const next = group[(group.findIndex(({ slug }) => slug === item.slug) + 1) % group.length];
  103 |     await expect(page.locator('.nextProjectLink')).toHaveAttribute('href', '/portfolio/' + next.slug);
  104 |     expect(failures).toEqual([]);
  105 |     if (['livsocial', 'app-digital-habit-tracker', 'app-heartsync', 'app-supplement-management'].includes(item.slug)) {
  106 |       await page.evaluate(() => window.scrollTo(0, 0));
  107 |       await page.screenshot({ path: 'audit/' + testInfo.project.name + '-' + item.slug + '.png' });
  108 |     }
  109 |   });
  110 | }
  111 | 
  112 | test('404, preserved old slugs, sitemap, and robots', async ({ page, request }) => {
  113 |   expect((await page.goto('/portfolio/no-such-project'))?.status()).toBe(404);
  114 |   await expect(page.getByRole('link', { name: 'Explore all projects' })).toBeVisible();
  115 |   await page.goto('/portfolio/app-case-managment-ase');
  116 |   await expect(page).toHaveURL('/portfolio/app-case-management-ase');
  117 |   await page.goto('/portfolio/app-suppliment-management');
  118 |   await expect(page).toHaveURL('/portfolio/app-supplement-management');
  119 |   const sitemap = await request.get('/sitemap.xml');
  120 |   expect(sitemap.status()).toBe(200);
  121 |   expect((await sitemap.text()).match(/<loc>/g)).toHaveLength(48);
  122 |   expect((await request.get('/robots.txt')).status()).toBe(200);
  123 | });
  124 | 
  125 | test('gallery state resets when navigating to the next project', async ({ page }) => {
  126 |   const failures: string[] = [];
  127 |   page.on('pageerror', (error) => failures.push(error.message));
  128 |   await page.goto('/portfolio/printlific');
  129 |   await page.locator('.galleryOpen').first().click();
  130 |   await page.getByRole('button', { name: 'Next image', exact: true }).click();
  131 |   await page.keyboard.press('Escape');
  132 |   await page.locator('.nextProjectLink').click();
  133 |   await expect(page.locator('h1')).toHaveText('Nerdrabbit.');
  134 |   await page.locator('.galleryOpen').first().click();
  135 |   await expect(page.getByRole('dialog')).toBeVisible();
  136 |   expect(failures).toEqual([]);
  137 | });
  138 | 
  139 | test('reduced motion and 320px layout', async ({ page }) => {
  140 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  141 |   await page.setViewportSize({ width: 320, height: 800 });
  142 |   await page.goto('/');
  143 |   await expect(page.locator('.projectCard').first()).toBeVisible();
  144 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  145 |   await page.screenshot({ path: 'audit/narrow-reduced-motion.png' });
  146 | });
  147 | 
```