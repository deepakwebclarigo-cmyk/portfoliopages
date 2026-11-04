# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: motion.spec.ts >> live reduced motion, deep links and dialog navigation preserve readable content
- Location: tests\motion.spec.ts:57:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "1"
Received: "0"

Call Log:
- Timeout 15000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - link "Skip to content" [ref=f1e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=f1e3]:
    - generic [ref=f1e4]:
      - link "Clarigo portfolio home" [ref=f1e5] [cursor=pointer]:
        - /url: /
        - img "Clarigo Infotech" [ref=f1e6]
      - link "Book a free AI consultation" [ref=f1e7] [cursor=pointer]:
        - /url: https://clarigoinfotech.com/contact
        - generic [ref=f1e8]: Book Free AI Consultation
      - group [ref=f1e12]:
        - generic "Open navigation" [ref=f1e13] [cursor=pointer]
  - main [ref=f1e15]:
    - generic [ref=f1e16]:
      - link "All projects" [ref=f1e17] [cursor=pointer]:
        - /url: /#portfolio
      - generic [ref=f1e20]:
        - generic [ref=f1e21]:
          - generic [ref=f1e22]: WEB EXPERIENCE / 02
          - heading "StreamDexa" [level=1] [ref=f1e24]: .
          - paragraph [ref=f1e27]: A digital-asset website presentation with collection discovery, asset details, creator-oriented pages, and registration views.
          - generic [ref=f1e28]:
            - generic [ref=f1e29]:
              - generic [ref=f1e30]: PROJECT TYPE
              - strong [ref=f1e31]: Web & web apps
            - generic [ref=f1e32]:
              - generic [ref=f1e33]: FOCUS
              - strong [ref=f1e34]: Digital assets & discovery
        - generic [ref=f1e37]:
          - img "StreamDexa — original project artwork" [ref=f1e41]
          - generic [ref=f1e42]: PROJECT ARTWORK
    - navigation "Case study sections" [ref=f1e43]:
      - link "Overview" [ref=f1e44] [cursor=pointer]:
        - /url: "#overview"
      - link "Key features" [ref=f1e45] [cursor=pointer]:
        - /url: "#features"
      - link "How it works" [ref=f1e46] [cursor=pointer]:
        - /url: "#workflow"
      - link "Solution" [ref=f1e47] [cursor=pointer]:
        - /url: "#solution"
      - link "Design" [ref=f1e48] [cursor=pointer]:
        - /url: "#design"
      - link "Technical" [ref=f1e49] [cursor=pointer]:
        - /url: "#engineering"
      - link "Screenshots" [ref=f1e50] [cursor=pointer]:
        - /url: "#screens"
      - link "Device views" [ref=f1e51] [cursor=pointer]:
        - /url: "#responsive"
    - generic [ref=f1e52]:
      - generic [ref=f1e53]:
        - generic [ref=f1e54]: "01"
        - text: PROJECT OVERVIEW
      - generic [ref=f1e55]:
        - heading "A visual gateway to digital collections." [level=2] [ref=f1e56]
        - paragraph [ref=f1e58]: StreamDexa’s website screens present a digital-asset marketplace through collection grids, individual asset information, and profile-style pages. A dark promotional identity introduces the product, while lighter browsing layouts give each collection room to stand out. Creator-oriented headers and structured asset records connect discovery with a closer look at the listed material.
    - generic [ref=f1e60]:
      - generic [ref=f1e61]:
        - generic [ref=f1e62]:
          - generic [ref=f1e63]: "02"
          - text: KEY FEATURES
        - heading "Designed around the experience." [level=2] [ref=f1e64]: Designed aroundthe experience.
        - paragraph [ref=f1e65]: Collection discovery, creator identity, and asset information form the core of this digital-collection presentation.
      - generic [ref=f1e66]:
        - generic [ref=f1e67]:
          - article [ref=f1e68]:
            - generic [ref=f1e74]:
              - heading "Collection discovery" [level=3] [ref=f1e75]
              - paragraph [ref=f1e76]: Image grids introduce the digital collections visible in the source designs.
          - article [ref=f1e77]:
            - generic [ref=f1e82]:
              - heading "Asset details" [level=3] [ref=f1e83]
              - paragraph [ref=f1e84]: A dedicated layout combines artwork with structured asset information.
        - figure "StreamDexa / Original interface" [ref=f1e85]:
          - img "StreamDexa original interface detail" [ref=f1e87]
        - generic [ref=f1e89]:
          - article [ref=f1e90]:
            - generic [ref=f1e97]:
              - heading "Profile pages" [level=3] [ref=f1e98]
              - paragraph [ref=f1e99]: Profile-style headers and collection areas organize a creator-oriented view.
          - article [ref=f1e100]:
            - generic [ref=f1e107]:
              - heading "Registration interface" [level=3] [ref=f1e108]
              - paragraph [ref=f1e109]: A separate form introduces account and onboarding information.
    - generic [ref=f1e111]:
      - generic [ref=f1e112]:
        - generic [ref=f1e113]:
          - generic [ref=f1e114]: "03"
          - text: PRODUCT JOURNEY
        - heading "How StreamDexa works." [level=2] [ref=f1e115]
        - paragraph [ref=f1e116]: The available interfaces show a progression from a collection catalog to the details of an individual asset.
      - list [ref=f1e117]:
        - listitem [ref=f1e118]:
          - generic [ref=f1e119]: "01"
          - heading "Browse the collection" [level=3] [ref=f1e123]
          - paragraph [ref=f1e124]: Explore artwork-led grids that place multiple digital items within a consistent catalog layout.
        - listitem [ref=f1e125]:
          - generic [ref=f1e126]: "02"
          - heading "Inspect an asset" [level=3] [ref=f1e130]
          - paragraph [ref=f1e131]: Move to a detailed presentation pairing the selected artwork with its displayed information and related items.
        - listitem [ref=f1e132]:
          - generic [ref=f1e133]: "03"
          - heading "Explore the creator" [level=3] [ref=f1e135]
          - paragraph [ref=f1e136]: Profile-style pages group collection content beneath a recognizable creator header and supporting navigation.
    - generic [ref=f1e137]:
      - generic [ref=f1e138]:
        - generic [ref=f1e139]: "04"
        - text: DESIGN CHALLENGE & SOLUTION
      - generic [ref=f1e140]:
        - generic [ref=f1e141]:
          - heading "Give visual discovery a structured foundation." [level=2] [ref=f1e142]
          - paragraph [ref=f1e143]: Artwork needs space to stand out, but collection browsing also depends on clear labels and context. The screen set balances image-led discovery with quieter information panels.
          - list [ref=f1e144]:
            - listitem [ref=f1e145]:
              - generic [ref=f1e149]:
                - heading "Artwork first" [level=3] [ref=f1e150]
                - paragraph [ref=f1e151]: Consistent image grids let collections remain the strongest visual element during browsing.
            - listitem [ref=f1e152]:
              - generic [ref=f1e156]:
                - heading "Details alongside the image" [level=3] [ref=f1e157]
                - paragraph [ref=f1e158]: The asset layout keeps structured information near the artwork it describes.
            - listitem [ref=f1e159]:
              - generic [ref=f1e163]:
                - heading "A consistent catalog frame" [level=3] [ref=f1e164]
                - paragraph [ref=f1e165]: Shared headers and repeated content modules connect collection, profile, and registration pages.
        - figure "StreamDexa / Design detail" [ref=f1e166]:
          - img "StreamDexa original supporting interface view" [ref=f1e168]
    - generic [ref=f1e170]:
      - generic [ref=f1e171]:
        - generic [ref=f1e172]: "05"
        - text: DESIGN DIRECTION
      - generic [ref=f1e173]:
        - generic [ref=f1e174]:
          - heading "Its own identity. In every detail." [level=2] [ref=f1e175]: Its own identity.In every detail.
          - generic [ref=f1e176]: Digital assets & discovery
        - generic [ref=f1e177]:
          - paragraph [ref=f1e178]: Deep navy, electric blue, and dimensional graphics establish the public-facing visual language. White catalog and detail panels give artwork and structured asset information a quieter setting, with a consistent header linking the different page types.
          - generic [ref=f1e179]: Design observations from the supplied project artwork.
    - generic [ref=f1e184]:
      - generic [ref=f1e185]:
        - generic [ref=f1e186]:
          - generic [ref=f1e187]: "06"
          - text: TECHNICAL PERSPECTIVE
        - heading "Catalog, item, and creator views." [level=2] [ref=f1e188]
        - paragraph [ref=f1e189]: The visible architecture separates browsing, individual asset details, and creator-oriented content. These are interface observations; the artwork does not establish a blockchain network, wallet implementation, or ownership-verification system.
        - list [ref=f1e190]:
          - listitem [ref=f1e191]: Collection grids
          - listitem [ref=f1e194]: Asset information
          - listitem [ref=f1e197]: Creator pages
      - complementary "Clarigo company technology capabilities" [ref=f1e200]:
        - generic [ref=f1e202]: CLARIGO ENGINEERING TOOLKIT
        - generic [ref=f1e203]:
          - generic [ref=f1e204]: React
          - generic [ref=f1e205]: Next.js
          - generic [ref=f1e206]: Node.js
          - generic [ref=f1e207]: Flutter
          - generic [ref=f1e208]: Python
          - generic [ref=f1e209]: Docker
        - paragraph [ref=f1e210]: Published company capabilities. The original project material does not identify a project-specific technology stack.
        - link "Explore Clarigo's app development" [ref=f1e211] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/services/app-development
    - generic [ref=f1e216]:
      - generic [ref=f1e217]:
        - generic [ref=f1e218]: "07"
        - text: UI SCREENSHOTS & ARTWORK
      - generic [ref=f1e219]:
        - heading "Inside StreamDexa." [level=2] [ref=f1e220]
        - paragraph [ref=f1e221]: Explore the original interface screens. Select any image for a closer look.
      - generic [ref=f1e222]:
        - figure "INTERFACE SCREEN 01" [ref=f1e223]:
          - button "Expand StreamDexa interface view 1" [ref=f1e224] [cursor=pointer]:
            - img "StreamDexa — interface screen 1" [ref=f1e225]
          - generic [ref=f1e232]:
            - generic [ref=f1e233]: INTERFACE SCREEN
            - generic [ref=f1e234]: "01"
        - figure "INTERFACE SCREEN 02" [ref=f1e235]:
          - button "Expand StreamDexa interface view 2" [ref=f1e236] [cursor=pointer]:
            - img "StreamDexa — interface screen 2" [ref=f1e237]
          - generic [ref=f1e244]:
            - generic [ref=f1e245]: INTERFACE SCREEN
            - generic [ref=f1e246]: "02"
        - figure "INTERFACE SCREEN 03" [ref=f1e247]:
          - button "Expand StreamDexa interface view 3" [ref=f1e248] [cursor=pointer]:
            - img "StreamDexa — interface screen 3" [ref=f1e249]
          - generic [ref=f1e256]:
            - generic [ref=f1e257]: INTERFACE SCREEN
            - generic [ref=f1e258]: "03"
        - figure "INTERFACE SCREEN 04" [ref=f1e259]:
          - button "Expand StreamDexa interface view 4" [ref=f1e260] [cursor=pointer]:
            - img "StreamDexa — interface screen 4" [ref=f1e261]
          - generic [ref=f1e268]:
            - generic [ref=f1e269]: INTERFACE SCREEN
            - generic [ref=f1e270]: "04"
        - figure "INTERFACE SCREEN 05" [ref=f1e271]:
          - button "Expand StreamDexa interface view 5" [ref=f1e272] [cursor=pointer]:
            - img "StreamDexa — interface screen 5" [ref=f1e273]
          - generic [ref=f1e280]:
            - generic [ref=f1e281]: INTERFACE SCREEN
            - generic [ref=f1e282]: "05"
    - generic [ref=f1e283]:
      - generic [ref=f1e284]:
        - generic [ref=f1e285]: "08"
        - text: RESPONSIVE DESIGN PRESENTATION
      - generic [ref=f1e286]:
        - heading "A view across the original devices." [level=2] [ref=f1e287]: A view acrossthe original devices.
        - generic [ref=f1e288]:
          - paragraph [ref=f1e289]: StreamDexa's original portfolio artwork presents the product in its supplied device composition. This presentation retains those source layouts and their original proportions.
          - paragraph [ref=f1e290]: Original project mockups, rather than newly generated screenshots of a live product.
      - figure "StreamDexa / Original device composition" [ref=f1e291]:
        - img "StreamDexa original device presentation" [ref=f1e293]
    - region "Project sources" [ref=f1e295]:
      - generic [ref=f1e296]:
        - generic [ref=f1e297]: SOURCE MATERIAL
        - paragraph [ref=f1e298]: Project names and wordmarks have been updated for this portfolio. Interface layouts come from the supplied project artwork. Descriptions, journeys, and design considerations interpret the artwork and available overview. They do not imply unpublished client briefs, verified implementation details, app-store availability, or measured business results.
      - link "Clarigo portfolio" [ref=f1e299] [cursor=pointer]:
        - /url: https://clarigoinfotech.com/portfolio
    - link "NEXT WEB PROJECT Little Butterflies" [ref=f1e304] [cursor=pointer]:
      - /url: /portfolio/little-butterflies
      - generic [ref=f1e305]:
        - generic [ref=f1e306]: NEXT WEB PROJECT
        - strong [ref=f1e307]: Little Butterflies
    - generic [ref=f1e310]:
      - generic [ref=f1e311]:
        - generic [ref=f1e312]:
          - generic [ref=f1e313]: KEEP EXPLORING
          - heading "More perspectives." [level=2] [ref=f1e314]
        - link "View all work" [ref=f1e315] [cursor=pointer]:
          - /url: /#portfolio
      - generic [ref=f1e319]:
        - link "Little Butterflies — original project artwork Childcare & family Little Butterflies" [ref=f1e320] [cursor=pointer]:
          - /url: /portfolio/little-butterflies
          - img "Little Butterflies — original project artwork" [ref=f1e324]
          - generic [ref=f1e325]: Childcare & family
          - strong [ref=f1e326]: Little Butterflies
        - link "TukioConnect — original project artwork Organization & collaboration TukioConnect" [ref=f1e329] [cursor=pointer]:
          - /url: /portfolio/tukioconnect
          - img "TukioConnect — original project artwork" [ref=f1e333]
          - generic [ref=f1e334]: Organization & collaboration
          - strong [ref=f1e335]: TukioConnect
        - link "Beliri — original project artwork Fashion & commerce Beliri" [ref=f1e338] [cursor=pointer]:
          - /url: /portfolio/beliri
          - img "Beliri — original project artwork" [ref=f1e342]
          - generic [ref=f1e343]: Fashion & commerce
          - strong [ref=f1e344]: Beliri
    - generic [ref=f1e348]:
      - generic [ref=f1e349]:
        - generic [ref=f1e350]: YOUR NEXT PRODUCT
        - heading "Inspired by StreamDexa?" [level=2] [ref=f1e351]:
          - text: Inspired by
          - generic [ref=f1e352]: StreamDexa?
        - paragraph [ref=f1e353]: Building a visual catalog? Start with an experience that makes discovery and detailed information work together.
      - generic [ref=f1e354]:
        - link "Discuss your project" [ref=f1e355] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/contact
        - link "Browse all 47 projects" [ref=f1e359] [cursor=pointer]:
          - /url: /#portfolio
  - contentinfo [ref=f1e362]:
    - link [ref=f1e363] [cursor=pointer]:
      - /url: /
      - img "Clarigo Infotech" [ref=f1e364]
    - generic [ref=f1e365]: AI-first engineering · 10+ years of delivery
    - generic [ref=f1e366]: © 2026 Clarigo Infotech
  - alert [ref=f1e367]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test('hero words, scroll reveals, image masks and progress animate then settle', async ({ page }, info) => {
  4   |   await page.addInitScript(() => {
  5   |     (window as typeof window & { wordEntrances: number }).wordEntrances = 0;
  6   |     document.addEventListener('animationstart', event => { if ((event as AnimationEvent).animationName === 'clarigoWordIn') (window as typeof window & { wordEntrances: number }).wordEntrances++; });
  7   |   });
  8   |   await page.goto('/portfolio/livsocial');
  9   |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  10  |   await expect.poll(() => page.locator('.motionWord').evaluateAll(words => words.every(word => getComputedStyle(word).transform === 'none' && getComputedStyle(word).opacity === '1'))).toBe(true);
  11  |   expect(await page.evaluate(() => (window as typeof window & { wordEntrances: number }).wordEntrances)).toBeGreaterThan(0);
  12  |   const first = page.locator('.projectGallery>figure').first();
  13  |   expect(await first.evaluate(el => Number(getComputedStyle(el).opacity))).toBe(0);
  14  |   expect(await first.evaluate(el => getComputedStyle(el).clipPath)).not.toBe('none');
  15  |   const samples = await first.evaluate(el => new Promise<number[]>(resolve => {
  16  |     el.scrollIntoView({ block: 'center', behavior: 'instant' });
  17  |     const start = performance.now(), values: number[] = [];
  18  |     function frame() { values.push(Number(getComputedStyle(el).opacity)); if (performance.now() - start < 1050) requestAnimationFrame(frame); else resolve(values); } requestAnimationFrame(frame);
  19  |   }));
  20  |   expect(samples.some(value => value > 0 && value < 1)).toBe(true);
  21  |   await expect.poll(() => first.evaluate(el => ({ opacity: getComputedStyle(el).opacity, clip: getComputedStyle(el).clipPath, promotion: getComputedStyle(el).willChange })) ).toEqual({ opacity: '1', clip: 'none', promotion: 'auto' });
  22  |   expect(await page.locator('.portfolioProgress').evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).a)).toBeGreaterThan(0);
  23  |   if (info.project.name === 'desktop') expect(await page.locator('[data-motion-parallax]').count()).toBeGreaterThan(0);
  24  |   else await expect(page.locator('[data-motion-parallax]')).toHaveCount(0);
  25  | });
  26  | 
  27  | test('pointer depth is bounded, resets, and filtering never hides keyboard targets', async ({ page }, info) => {
  28  |   await page.goto('/#portfolio');
  29  |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  30  |   const card = page.locator('.projectEntrance').first();
  31  |   await card.scrollIntoViewIfNeeded();
  32  |   await expect.poll(() => card.evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  33  |   await expect(card).toHaveAttribute('data-depth-enabled', info.project.name === 'desktop' ? 'true' : 'false');
  34  |   if (info.project.name === 'desktop') {
  35  |     const box = (await card.boundingBox())!;
  36  |     await page.mouse.move(box.x + box.width * .8, box.y + box.height * .3);
  37  |     await expect.poll(() => card.locator('.depthSurface').evaluate(el => getComputedStyle(el).transform)).not.toBe('none');
  38  |     const translation = await card.locator('.depthSurface').evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42);
  39  |     expect(Math.abs(translation)).toBeLessThan(6);
  40  |     await page.mouse.move(1, 1);
  41  |     await expect.poll(() => card.locator('.depthSurface').evaluate(el => getComputedStyle(el).transform)).toBe('none');
  42  |   }
  43  |   await page.getByRole('searchbox').fill('TukioConnect');
  44  |   await expect(page.locator('.projectCard')).toHaveCount(2);
  45  |   await page.getByRole('searchbox').clear();
  46  |   await expect(page.locator('.projectCard')).toHaveCount(47);
  47  |   const link = page.locator('.projectLink').last();
  48  |   await link.focus();
  49  |   await expect(link).toBeFocused();
  50  |   await expect.poll(() => link.locator('..').locator('..').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  51  |   await page.emulateMedia({ reducedMotion: 'reduce' });
  52  |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  53  |   await expect(page.locator('.projectEntrance').first()).toHaveAttribute('data-depth-enabled', 'false');
  54  |   expect(await page.locator('.depthSurface').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).transform === 'none'))).toBe(true);
  55  | });
  56  | 
  57  | test('live reduced motion, deep links and dialog navigation preserve readable content', async ({ page }) => {
  58  |   await page.goto('/portfolio/app-habitstride');
  59  |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  60  |   await page.emulateMedia({ reducedMotion: 'reduce' });
  61  |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  62  |   await expect.poll(() => page.locator('.motionWord, .featureColumn>article, .workflowSteps>li, .projectGallery>figure').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1' && getComputedStyle(node).transform === 'none'))).toBe(true);
  63  |   await page.getByRole('link', { name: 'Screenshots', exact: true }).click();
  64  |   const first = page.locator('.galleryOpen').first(); await first.click();
  65  |   await page.getByRole('button', { name: 'Next image', exact: true }).click();
  66  |   await expect(page.locator('.galleryDialogBar small')).toContainText('2 /');
  67  |   await expect.poll(() => page.locator('.galleryDialogImageFrame').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  68  |   expect(await page.locator('.galleryDialogImageFrame').evaluate(el => getComputedStyle(el).transform)).toBe('none');
  69  |   await page.keyboard.press('Escape'); await expect(first).toBeFocused();
  70  |   await page.emulateMedia({ reducedMotion: 'no-preference' });
  71  |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  72  |   expect(await page.locator('.motionWord').evaluateAll(words => words.every(word => getComputedStyle(word).animationName === 'none'))).toBe(true);
  73  |   await page.goto('/portfolio/streamdexa#screens');
  74  |   await expect(page.locator('html')).toHaveAttribute('data-motion-skip-hero', '');
> 75  |   await expect.poll(() => page.locator('.projectGallery>figure').first().evaluate(el => getComputedStyle(el).opacity)).toBe('1');
      |                                                                                                                        ^ Error: expect(received).toBe(expected) // Object.is equality
  76  |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  77  | });
  78  | 
  79  | test('the portfolio and detail content stay usable with JavaScript disabled', async ({ browser, page }) => {
  80  |   const context = await browser.newContext({ javaScriptEnabled: false, viewport: page.viewportSize()! });
  81  |   try {
  82  |     const staticPage = await context.newPage(); await staticPage.goto('/');
  83  |     await expect(staticPage.locator('.projectLink')).toHaveCount(47);
  84  |     await staticPage.locator('.projectLink[href="/portfolio/app-infiscribe"]').click();
  85  |     await expect(staticPage).toHaveURL('/portfolio/app-infiscribe');
  86  |     await expect(staticPage.locator('h1')).toHaveText('InfiScribe.');
  87  |     await expect(staticPage.locator('#overview')).toBeVisible();
  88  |     expect(await staticPage.locator('#screens').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  89  |   } finally { await context.close(); }
  90  | });
  91  | 
  92  | test('back navigation restores a readable portfolio and complete metadata', async ({ page }) => {
  93  |   await page.goto('/#portfolio');
  94  |   const link = page.locator('.projectLink[href="/portfolio/app-habitstride"]');
  95  |   await link.click();
  96  |   await expect(page).toHaveURL('/portfolio/app-habitstride');
  97  |   await page.goBack();
  98  |   await expect(page.locator('.projectCard')).toHaveCount(47);
  99  |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  100 |   await link.scrollIntoViewIfNeeded();
  101 |   await expect.poll(() => link.locator('..').locator('..').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  102 |   await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  103 |   await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  104 | });
  105 | 
```