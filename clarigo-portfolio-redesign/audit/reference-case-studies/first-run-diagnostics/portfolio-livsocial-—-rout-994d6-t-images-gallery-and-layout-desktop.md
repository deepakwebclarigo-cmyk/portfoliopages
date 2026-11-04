# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> livsocial — route, content, images, gallery, and layout
- Location: tests\portfolio.spec.ts:55:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: "http://127.0.0.1:3100/images/projects/livsocial-preview-3f919d0b24.webp"
Received array: ["/images/projects/livsocial-preview-3f919d0b24.webp", "/images/projects/livsocial-fdfbbb1686.webp", "/images/projects/livsocial-4c70c73e27.webp", "/images/projects/livsocial-6ea93b709a.webp", "/images/projects/livsocial-0a0431c56c.webp", "/images/projects/livsocial-da444b8255.webp", "/images/projects/livsocial-aa61803c2f.webp", "/images/projects/livsocial-0d06b8fba9.webp"]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - alert [ref=e3]: LivSocial — Web Project | Clarigo Infotech
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
          - generic [ref=e25]: WEB EXPERIENCE / 01
          - heading "LivSocial." [level=1] [ref=e27]
          - paragraph [ref=e28]: A social web experience bringing posts, communities, business discovery, and personal connections into one workspace.
          - generic [ref=e29]:
            - generic [ref=e30]:
              - generic [ref=e31]: PROJECT TYPE
              - strong [ref=e32]: Web & web apps
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
      - link "Device views" [ref=e50] [cursor=pointer]:
        - /url: "#responsive"
    - generic [ref=e51]:
      - generic [ref=e52]:
        - generic [ref=e53]: "01"
        - text: PROJECT OVERVIEW
      - generic [ref=e54]:
        - heading "A place for conversations to grow." [level=2] [ref=e55]
        - paragraph [ref=e57]: LivSocial’s desktop artwork presents a central content feed alongside a personal social circle and trending conversations. Navigation separates the home feed, communities, businesses, and profile areas. The result is a view of a social product organized around both people and the content they share.
    - generic [ref=e59]:
      - generic [ref=e60]:
        - generic [ref=e61]:
          - generic [ref=e62]: "02"
          - text: KEY FEATURES
        - heading "Designed around the experience." [level=2] [ref=e63]: Designed aroundthe experience.
        - paragraph [ref=e64]: A social workspace where the main feed, personal connections, and wider community discovery each have a clear place.
      - generic [ref=e65]:
        - generic [ref=e66]:
          - article [ref=e67]:
            - generic [ref=e73]:
              - heading "Content feed" [level=3] [ref=e74]
              - paragraph [ref=e75]: Image posts and written updates sit together in the main reading column.
          - article [ref=e76]:
            - generic [ref=e81]:
              - heading "Community navigation" [level=3] [ref=e82]
              - paragraph [ref=e83]: Dedicated entry points distinguish communities, businesses, and personal areas.
        - figure "LivSocial / Original interface" [ref=e84]:
          - img "LivSocial original interface detail" [ref=e85]
        - generic [ref=e87]:
          - article [ref=e88]:
            - generic [ref=e95]:
              - heading "Social circle" [level=3] [ref=e96]
              - paragraph [ref=e97]: A side panel brings people and their profiles into view.
          - article [ref=e98]:
            - generic [ref=e105]:
              - heading "Trending conversations" [level=3] [ref=e106]
              - paragraph [ref=e107]: Supporting content helps visitors discover subjects beyond their own feed.
    - generic [ref=e109]:
      - generic [ref=e110]:
        - generic [ref=e111]:
          - generic [ref=e112]: "03"
          - text: PRODUCT JOURNEY
        - heading "How LivSocial works." [level=2] [ref=e113]
        - paragraph [ref=e114]: The desktop layouts move from an everyday feed to the people and conversations around it.
      - list [ref=e115]:
        - listitem [ref=e116]:
          - generic [ref=e117]: "01"
          - heading "Start with the feed" [level=3] [ref=e121]
          - paragraph [ref=e122]: Read photo posts and written updates in the central column, with familiar post controls close to the content.
        - listitem [ref=e123]:
          - generic [ref=e124]: "02"
          - heading "Explore a community" [level=3] [ref=e128]
          - paragraph [ref=e129]: Use the main navigation to move into communities or businesses without losing the recognizable social frame.
        - listitem [ref=e130]:
          - generic [ref=e131]: "03"
          - heading "Follow the conversation" [level=3] [ref=e133]
          - paragraph [ref=e134]: Open profile and topic areas to explore the people and discussions surrounding an individual post.
    - generic [ref=e135]:
      - generic [ref=e136]:
        - generic [ref=e137]: "04"
        - text: DESIGN CHALLENGE & SOLUTION
      - generic [ref=e138]:
        - generic [ref=e139]:
          - heading "Make a busy community feel connected." [level=2] [ref=e140]
          - paragraph [ref=e141]: Social products need to show more than a stream of posts. LivSocial's layout gives people, topics, and community areas their own positions around a consistent reading space.
          - list [ref=e142]:
            - listitem [ref=e143]:
              - generic [ref=e147]:
                - heading "A clear reading column" [level=3] [ref=e148]
                - paragraph [ref=e149]: The central feed has priority, while secondary discovery remains in supporting side panels.
            - listitem [ref=e150]:
              - generic [ref=e154]:
                - heading "People in context" [level=3] [ref=e155]
                - paragraph [ref=e156]: Avatars and social-circle information keep personal connections visible beside the shared content.
            - listitem [ref=e157]:
              - generic [ref=e161]:
                - heading "Recognizable destinations" [level=3] [ref=e162]
                - paragraph [ref=e163]: Named navigation areas separate the home feed, communities, businesses, and personal spaces.
        - figure "LivSocial / Design detail" [ref=e164]:
          - img "LivSocial original supporting interface view"
    - generic [ref=e166]:
      - generic [ref=e167]:
        - generic [ref=e168]: "05"
        - text: DESIGN DIRECTION
      - generic [ref=e169]:
        - generic [ref=e170]:
          - heading "Its own identity. In every detail." [level=2] [ref=e171]: Its own identity.In every detail.
          - generic [ref=e172]: Social & community
        - generic [ref=e173]:
          - paragraph [ref=e174]: Mustard yellow establishes the product identity, while white content panels keep photo posts and conversations readable. A persistent desktop navigation bar and supporting side columns give the main feed a clear position within a much broader community experience.
          - generic [ref=e175]: Design observations from the supplied project artwork.
    - generic [ref=e180]:
      - generic [ref=e181]:
        - generic [ref=e182]:
          - generic [ref=e183]: "06"
          - text: TECHNICAL PERSPECTIVE
        - heading "A layered information architecture." [level=2] [ref=e184]
        - paragraph [ref=e185]: Posts, profiles, communities, and trending subjects appear as distinct content types. Repeated card treatments connect those surfaces visually, while persistent navigation makes their relationship understandable across the supplied desktop screens.
        - list [ref=e186]:
          - listitem [ref=e187]: Feed hierarchy
          - listitem [ref=e190]: Profile surfaces
          - listitem [ref=e193]: Community navigation
      - complementary "Clarigo company technology capabilities" [ref=e196]:
        - generic [ref=e198]: CLARIGO ENGINEERING TOOLKIT
        - generic [ref=e199]:
          - generic [ref=e200]: React
          - generic [ref=e201]: Next.js
          - generic [ref=e202]: Node.js
          - generic [ref=e203]: Flutter
          - generic [ref=e204]: Python
          - generic [ref=e205]: Docker
        - paragraph [ref=e206]: Published company capabilities. The original project material does not identify a project-specific technology stack.
        - link "Explore Clarigo's app development" [ref=e207] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/services/app-development
    - generic [ref=e212]:
      - generic [ref=e213]:
        - generic [ref=e214]: "07"
        - text: UI SCREENSHOTS & ARTWORK
      - generic [ref=e215]:
        - heading "Inside LivSocial." [level=2] [ref=e216]
        - paragraph [ref=e217]: Explore the original interface screens. Select any image for a closer look.
      - generic [ref=e218]:
        - figure "DESIGN COMPOSITION 01" [ref=e219]:
          - button "Expand LivSocial interface view 1" [ref=e220] [cursor=pointer]:
            - img "LivSocial — design composition 1" [ref=e221]
          - generic [ref=e228]:
            - generic [ref=e229]: DESIGN COMPOSITION
            - generic [ref=e230]: "01"
        - figure "DESIGN COMPOSITION 02" [ref=e231]:
          - button "Expand LivSocial interface view 2" [ref=e232] [cursor=pointer]:
            - img "LivSocial — design composition 2" [ref=e233]
          - generic [ref=e240]:
            - generic [ref=e241]: DESIGN COMPOSITION
            - generic [ref=e242]: "02"
        - figure "DESIGN COMPOSITION 03" [ref=e243]:
          - button "Expand LivSocial interface view 3" [ref=e244] [cursor=pointer]:
            - img "LivSocial — design composition 3" [ref=e245]
          - generic [ref=e252]:
            - generic [ref=e253]: DESIGN COMPOSITION
            - generic [ref=e254]: "03"
        - figure "DESIGN COMPOSITION 04" [ref=e255]:
          - button "Expand LivSocial interface view 4" [ref=e256] [cursor=pointer]:
            - img "LivSocial — design composition 4" [ref=e257]
          - generic [ref=e264]:
            - generic [ref=e265]: DESIGN COMPOSITION
            - generic [ref=e266]: "04"
        - figure "DESIGN COMPOSITION 05" [ref=e267]:
          - button "Expand LivSocial interface view 5" [ref=e268] [cursor=pointer]:
            - img "LivSocial — design composition 5" [ref=e269]
          - generic [ref=e276]:
            - generic [ref=e277]: DESIGN COMPOSITION
            - generic [ref=e278]: "05"
    - generic [ref=e279]:
      - generic [ref=e280]:
        - generic [ref=e281]: "08"
        - text: RESPONSIVE DESIGN PRESENTATION
      - generic [ref=e282]:
        - heading "A view across the original devices." [level=2] [ref=e283]: A view acrossthe original devices.
        - generic [ref=e284]:
          - paragraph [ref=e285]: LivSocial's original portfolio artwork presents the product in its supplied device composition. This presentation retains those source layouts and their original proportions.
          - paragraph [ref=e286]: Original project mockups, rather than newly generated screenshots of a live product.
      - figure "LivSocial / Original device composition" [ref=e287]:
        - img "LivSocial original device presentation" [ref=e288]
    - region "Project sources" [ref=e290]:
      - generic [ref=e291]:
        - generic [ref=e292]: SOURCE MATERIAL
        - paragraph [ref=e293]: Project descriptions, journeys, and design considerations interpret the original artwork and available overview. They do not imply unpublished client briefs, verified implementation details, app-store availability, or measured business results.
      - link "Original project page" [ref=e294] [cursor=pointer]:
        - /url: https://clarigo-voluble-youtiao-e0781d.netlify.app/landing%20page/livSocial-web.html
    - link "NEXT WEB PROJECT StreamDataX" [ref=e299] [cursor=pointer]:
      - /url: /portfolio/streamdatax
      - generic [ref=e300]:
        - generic [ref=e301]: NEXT WEB PROJECT
        - strong [ref=e302]: StreamDataX
    - generic [ref=e305]:
      - generic [ref=e306]:
        - generic [ref=e307]:
          - generic [ref=e308]: KEEP EXPLORING
          - heading "More perspectives." [level=2] [ref=e309]
        - link "View all work" [ref=e310] [cursor=pointer]:
          - /url: /#portfolio
      - generic [ref=e314]:
        - link "StreamDataX — original project artwork Digital assets & discovery StreamDataX" [ref=e315] [cursor=pointer]:
          - /url: /portfolio/streamdatax
          - img "StreamDataX — original project artwork" [ref=e319]
          - generic [ref=e320]: Digital assets & discovery
          - strong [ref=e321]: StreamDataX
        - link "Little Butterflies — original project artwork Childcare & family Little Butterflies" [ref=e324] [cursor=pointer]:
          - /url: /portfolio/little-butterflies
          - img "Little Butterflies — original project artwork" [ref=e328]
          - generic [ref=e329]: Childcare & family
          - strong [ref=e330]: Little Butterflies
        - link "TukeeConnect — original project artwork Organization & collaboration TukeeConnect" [ref=e333] [cursor=pointer]:
          - /url: /portfolio/tukeeconnect
          - img "TukeeConnect — original project artwork" [ref=e337]
          - generic [ref=e338]: Organization & collaboration
          - strong [ref=e339]: TukeeConnect
    - generic [ref=e343]:
      - generic [ref=e344]:
        - generic [ref=e345]: YOUR NEXT PRODUCT
        - heading "Inspired by LivSocial?" [level=2] [ref=e346]:
          - text: Inspired by
          - generic [ref=e347]: LivSocial?
        - paragraph [ref=e348]: Planning a community platform? Let's shape the people, content, and discovery experience around your audience.
      - generic [ref=e349]:
        - link "Discuss your project" [ref=e350] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/contact
        - link "Explore the mobile project" [ref=e354] [cursor=pointer]:
          - /url: /portfolio/app-livsocial
        - link "Browse all 47 projects" [ref=e357] [cursor=pointer]:
          - /url: /#portfolio
  - contentinfo [ref=e360]:
    - link [ref=e361] [cursor=pointer]:
      - /url: /
      - img "Clarigo Infotech" [ref=e362]
    - generic [ref=e363]: AI-first engineering · 10+ years of delivery
    - generic [ref=e364]: © 2026 Clarigo Infotech
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
  69  |     await expect.poll(() => page.locator('meta[name="description"]').evaluateAll((elements) => elements.map((element) => element.getAttribute('content')))).toEqual([content.summary]);
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
> 86  |     for (const src of shown) expect(allowed).toContain(src);
      |                                              ^ Error: expect(received).toContain(expected) // indexOf
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