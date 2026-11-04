# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: polish.spec.ts >> section navigation follows scrolling and returns to overview
- Location: tests\polish.spec.ts:3:5

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 180
Received:   271

Call Log:
- Timeout 15000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Clarigo portfolio home" [ref=e5] [cursor=pointer]:
        - /url: /
        - img "Clarigo Infotech" [ref=e6]
      - navigation "Main navigation" [ref=e7]:
        - link "Home" [ref=e8] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/
        - link "Services" [ref=e9] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/services
        - link "Work" [ref=e10] [cursor=pointer]:
          - /url: /#portfolio
        - link "Contact" [ref=e11] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/contact
      - link "Book a free AI consultation" [ref=e12] [cursor=pointer]:
        - /url: https://clarigoinfotech.com/contact
        - generic [ref=e13]: Book Free AI Consultation
  - main [ref=e17]:
    - generic [ref=e18]:
      - link "All projects" [ref=e19] [cursor=pointer]:
        - /url: /#portfolio
      - generic [ref=e22]:
        - generic [ref=e23]:
          - generic [ref=e24]: WEB EXPERIENCE / 01
          - heading "LivSocial." [level=1] [ref=e26]
          - paragraph [ref=e27]: A social web experience bringing posts, communities, business discovery, and personal connections into one workspace.
          - generic [ref=e28]:
            - generic [ref=e29]:
              - generic [ref=e30]: PROJECT TYPE
              - strong [ref=e31]: Web & web apps
            - generic [ref=e32]:
              - generic [ref=e33]: FOCUS
              - strong [ref=e34]: Social & community
        - generic [ref=e35]:
          - img "LivSocial — original project artwork" [ref=e39]
          - generic [ref=e40]: ORIGINAL PROJECT ARTWORK
    - navigation "Case study sections" [ref=e41]:
      - link "Overview" [ref=e42] [cursor=pointer]:
        - /url: "#overview"
      - link "Key features" [ref=e43] [cursor=pointer]:
        - /url: "#features"
      - link "How it works" [ref=e44] [cursor=pointer]:
        - /url: "#workflow"
      - link "Solution" [ref=e45] [cursor=pointer]:
        - /url: "#solution"
      - link "Design" [ref=e46] [cursor=pointer]:
        - /url: "#design"
      - link "Technical" [ref=e47] [cursor=pointer]:
        - /url: "#engineering"
      - link "Screenshots" [ref=e48] [cursor=pointer]:
        - /url: "#screens"
      - link "Device views" [ref=e49] [cursor=pointer]:
        - /url: "#responsive"
    - generic [ref=e50]:
      - generic [ref=e51]:
        - generic [ref=e52]: "01"
        - text: PROJECT OVERVIEW
      - generic [ref=e53]:
        - heading "A place for conversations to grow." [level=2] [ref=e54]
        - paragraph [ref=e56]: LivSocial’s desktop artwork presents a central content feed alongside a personal social circle and trending conversations. Navigation separates the home feed, communities, businesses, and profile areas. The result is a view of a social product organized around both people and the content they share.
    - generic [ref=e58]:
      - generic [ref=e59]:
        - generic [ref=e60]:
          - generic [ref=e61]: "02"
          - text: KEY FEATURES
        - heading "Designed around the experience." [level=2] [ref=e62]: Designed aroundthe experience.
        - paragraph [ref=e63]: A social workspace where the main feed, personal connections, and wider community discovery each have a clear place.
      - generic [ref=e64]:
        - generic [ref=e65]:
          - article [ref=e66]:
            - generic [ref=e72]:
              - heading "Content feed" [level=3] [ref=e73]
              - paragraph [ref=e74]: Image posts and written updates sit together in the main reading column.
          - article [ref=e75]:
            - generic [ref=e80]:
              - heading "Community navigation" [level=3] [ref=e81]
              - paragraph [ref=e82]: Dedicated entry points distinguish communities, businesses, and personal areas.
        - figure "LivSocial / Original interface" [ref=e83]:
          - img "LivSocial original interface detail" [ref=e84]
        - generic [ref=e86]:
          - article [ref=e87]:
            - generic [ref=e94]:
              - heading "Social circle" [level=3] [ref=e95]
              - paragraph [ref=e96]: A side panel brings people and their profiles into view.
          - article [ref=e97]:
            - generic [ref=e104]:
              - heading "Trending conversations" [level=3] [ref=e105]
              - paragraph [ref=e106]: Supporting content helps visitors discover subjects beyond their own feed.
    - generic [ref=e108]:
      - generic [ref=e109]:
        - generic [ref=e110]:
          - generic [ref=e111]: "03"
          - text: PRODUCT JOURNEY
        - heading "How LivSocial works." [level=2] [ref=e112]
        - paragraph [ref=e113]: The desktop layouts move from an everyday feed to the people and conversations around it.
      - list [ref=e114]:
        - listitem [ref=e115]:
          - generic [ref=e116]: "01"
          - heading "Start with the feed" [level=3] [ref=e120]
          - paragraph [ref=e121]: Read photo posts and written updates in the central column, with familiar post controls close to the content.
        - listitem [ref=e122]:
          - generic [ref=e123]: "02"
          - heading "Explore a community" [level=3] [ref=e127]
          - paragraph [ref=e128]: Use the main navigation to move into communities or businesses without losing the recognizable social frame.
        - listitem [ref=e129]:
          - generic [ref=e130]: "03"
          - heading "Follow the conversation" [level=3] [ref=e132]
          - paragraph [ref=e133]: Open profile and topic areas to explore the people and discussions surrounding an individual post.
    - generic [ref=e134]:
      - generic [ref=e135]:
        - generic [ref=e136]: "04"
        - text: DESIGN CHALLENGE & SOLUTION
      - generic [ref=e137]:
        - generic [ref=e138]:
          - heading "Make a busy community feel connected." [level=2] [ref=e139]
          - paragraph [ref=e140]: Social products need to show more than a stream of posts. LivSocial's layout gives people, topics, and community areas their own positions around a consistent reading space.
          - list [ref=e141]:
            - listitem [ref=e142]:
              - generic [ref=e146]:
                - heading "A clear reading column" [level=3] [ref=e147]
                - paragraph [ref=e148]: The central feed has priority, while secondary discovery remains in supporting side panels.
            - listitem [ref=e149]:
              - generic [ref=e153]:
                - heading "People in context" [level=3] [ref=e154]
                - paragraph [ref=e155]: Avatars and social-circle information keep personal connections visible beside the shared content.
            - listitem [ref=e156]:
              - generic [ref=e160]:
                - heading "Recognizable destinations" [level=3] [ref=e161]
                - paragraph [ref=e162]: Named navigation areas separate the home feed, communities, businesses, and personal spaces.
        - figure "LivSocial / Design detail" [ref=e163]:
          - img "LivSocial original supporting interface view" [ref=e164]
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
  - alert [ref=e365]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('section navigation follows scrolling and returns to overview', async ({ page }) => {
  4  |   await page.goto('/portfolio/livsocial');
  5  |   const navigation = page.getByRole('navigation', { name: 'Case study sections' });
  6  |   await expect(navigation.locator('[aria-current="location"]')).toHaveText('Overview');
  7  |   await navigation.getByRole('link', { name: 'Screenshots', exact: true }).click();
  8  |   await expect(page).toHaveURL(/#screens$/);
> 9  |   await expect.poll(() => page.locator('#screens').evaluate((element) => Math.round(element.getBoundingClientRect().top))).toBeLessThan(180);
     |                                                                                                                            ^ Error: expect(received).toBeLessThan(expected)
  10 |   await expect(navigation.locator('[aria-current="location"]')).toHaveText('Screenshots');
  11 |   await navigation.getByRole('link', { name: 'Device views', exact: true }).click();
  12 |   await expect.poll(() => page.locator('#responsive').evaluate((element) => Math.round(element.getBoundingClientRect().top))).toBeLessThan(180);
  13 |   await expect(navigation.locator('[aria-current="location"]')).toHaveText('Device views');
  14 |   await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  15 |   await expect(navigation.locator('[aria-current="location"]')).toHaveText('Overview');
  16 | });
  17 | 
  18 | test('screenshot viewer fits the viewport and supports keyboard controls', async ({ page }) => {
  19 |   for (const slug of ['livsocial', 'app-digital-habit-tracker']) {
  20 |     await page.goto('/portfolio/' + slug);
  21 |     const first = page.locator('.galleryOpen').first();
  22 |     await first.click();
  23 |     const dialog = page.getByRole('dialog');
  24 |     await expect(dialog).toBeVisible();
  25 |     await expect.poll(() => dialog.evaluate((element) => getComputedStyle(element).opacity)).toBe('1');
  26 |     await expect.poll(() => page.locator('.galleryDialogImage img').evaluate((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0)).toBe(true);
  27 |     expect(await dialog.evaluate((element) => {
  28 |       const box = element.getBoundingClientRect();
  29 |       return box.top >= 0 && box.left >= 0 && box.bottom <= innerHeight && box.right <= innerWidth && element.scrollHeight <= element.clientHeight + 1;
  30 |     })).toBe(true);
  31 |     await page.keyboard.press('ArrowRight');
  32 |     await expect(page.locator('.galleryDialogBar small')).toContainText('2 /');
  33 |     await page.keyboard.press('ArrowLeft');
  34 |     await expect(page.locator('.galleryDialogBar small')).toContainText('1 /');
  35 |     await page.keyboard.press('Escape');
  36 |     await expect(first).toBeFocused();
  37 |     expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
  38 |   }
  39 | });
  40 | 
  41 | test('changing reduced motion keeps revealed content readable', async ({ page }) => {
  42 |   await page.goto('/portfolio/app-digital-habit-tracker');
  43 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  44 |   for (const id of ['overview', 'features', 'design', 'screens']) {
  45 |     await expect.poll(() => page.locator('#' + id).evaluate((element) => getComputedStyle(element).opacity)).toBe('1');
  46 |   }
  47 |   await page.emulateMedia({ reducedMotion: 'no-preference' });
  48 |   await page.locator('#features').scrollIntoViewIfNeeded();
  49 |   await expect.poll(() => page.locator('#features').evaluate((element) => getComputedStyle(element).opacity)).toBe('1');
  50 | });
  51 | 
```