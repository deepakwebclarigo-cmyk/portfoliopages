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

Expected: true
Received: false
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
          - generic [ref=e24]: MOBILE EXPERIENCE / 05
          - heading "HabitStride" [level=1] [ref=e26]: .
          - paragraph [ref=e29]: A habit-tracking interface with routine lists, calendar context, and a visual progress overview.
          - generic [ref=e30]:
            - generic [ref=e31]:
              - generic [ref=e32]: PROJECT TYPE
              - strong [ref=e33]: Mobile apps
            - generic [ref=e34]:
              - generic [ref=e35]: FOCUS
              - strong [ref=e36]: Habits & routines
        - generic [ref=e39]:
          - img "HabitStride — original project artwork" [ref=e43]
          - generic [ref=e44]: PROJECT ARTWORK
    - navigation "Case study sections" [ref=e45]:
      - link "Overview" [ref=e46] [cursor=pointer]:
        - /url: "#overview"
      - link "Key features" [ref=e47] [cursor=pointer]:
        - /url: "#features"
      - link "How it works" [ref=e48] [cursor=pointer]:
        - /url: "#workflow"
      - link "Solution" [ref=e49] [cursor=pointer]:
        - /url: "#solution"
      - link "Design" [ref=e50] [cursor=pointer]:
        - /url: "#design"
      - link "Technical" [ref=e51] [cursor=pointer]:
        - /url: "#engineering"
      - link "Screenshots" [ref=e52] [cursor=pointer]:
        - /url: "#screens"
    - generic [ref=e53]:
      - generic [ref=e54]:
        - generic [ref=e55]: "01"
        - text: PROJECT OVERVIEW
      - generic [ref=e56]:
        - heading "Make daily progress visible." [level=2] [ref=e57]
        - paragraph [ref=e59]: HabitStride’s mobile presentation connects daily routines with a calendar and progress-focused dashboard. The supplied screens include an introductory view, account entry, and a personalized home screen. Routine items and summary graphics make the habit-oriented purpose visible in the interface itself.
    - generic [ref=e61]:
      - generic [ref=e62]:
        - generic [ref=e63]:
          - generic [ref=e64]: "02"
          - text: KEY FEATURES
        - heading "Designed around the experience." [level=2] [ref=e65]: Designed aroundthe experience.
        - paragraph [ref=e66]: A routine-focused interface combining habit creation, repetition choices, daily context, and a recognizable purple visual system.
      - generic [ref=e67]:
        - generic [ref=e68]:
          - article [ref=e69]:
            - generic [ref=e75]:
              - heading "Routine list" [level=3] [ref=e76]
              - paragraph [ref=e77]: Daily activities appear as individual items in the home interface.
          - article [ref=e78]:
            - generic [ref=e83]:
              - heading "Calendar context" [level=3] [ref=e84]
              - paragraph [ref=e85]: A compact date view connects routines to the current period.
        - figure "HabitStride / Original interface" [ref=e86]:
          - img "HabitStride original interface detail" [ref=e88]
        - generic [ref=e90]:
          - article [ref=e91]:
            - generic [ref=e98]:
              - heading "Progress graphic" [level=3] [ref=e99]
              - paragraph [ref=e100]: A circular visualization summarizes the displayed activity.
          - article [ref=e101]:
            - generic [ref=e108]:
              - heading "Onboarding screens" [level=3] [ref=e109]
              - paragraph [ref=e110]: Introductory and sign-in layouts establish the account journey.
    - generic [ref=e112]:
      - generic [ref=e113]:
        - generic [ref=e114]:
          - generic [ref=e115]: "03"
          - text: PRODUCT JOURNEY
        - heading "How HabitStride works." [level=2] [ref=e116]
        - paragraph [ref=e117]: The supplied artwork connects the introduction and account experience with the definition and presentation of daily habits.
      - list [ref=e118]:
        - listitem [ref=e119]:
          - generic [ref=e120]: "01"
          - heading "Start with the account" [level=3] [ref=e124]
          - paragraph [ref=e125]: Introductory and sign-in layouts provide a consistent entry into the habit-oriented experience.
        - listitem [ref=e126]:
          - generic [ref=e127]: "02"
          - heading "Define a routine" [level=3] [ref=e131]
          - paragraph [ref=e132]: The create-habit screen groups a name, description, repetition choices, and reminder-oriented controls.
        - listitem [ref=e133]:
          - generic [ref=e134]: "03"
          - heading "Review daily activity" [level=3] [ref=e136]
          - paragraph [ref=e137]: The original composition places routines alongside calendar context and a visual progress summary.
    - generic [ref=e138]:
      - generic [ref=e139]:
        - generic [ref=e140]: "04"
        - text: DESIGN CHALLENGE & SOLUTION
      - generic [ref=e141]:
        - generic [ref=e142]:
          - heading "Make a repeated activity easy to understand." [level=2] [ref=e143]
          - paragraph [ref=e144]: A habit involves both an action and a recurring time context. The interface brings the routine description, schedule choices, and daily overview into a consistent visual language.
          - list [ref=e145]:
            - listitem [ref=e146]:
              - generic [ref=e150]:
                - heading "A contained creation form" [level=3] [ref=e151]
                - paragraph [ref=e152]: Related habit details appear in one focused screen rather than separate competing views.
            - listitem [ref=e153]:
              - generic [ref=e157]:
                - heading "Visible repetition choices" [level=3] [ref=e158]
                - paragraph [ref=e159]: Day-based controls explain the recurring nature of the activity in the interface.
            - listitem [ref=e160]:
              - generic [ref=e164]:
                - heading "A distinct progress surface" [level=3] [ref=e165]
                - paragraph [ref=e166]: Circular graphics provide a visual counterpoint to the more detailed routine information.
        - figure "HabitStride / Design detail" [ref=e167]:
          - img "HabitStride original supporting interface view" [ref=e169]
    - generic [ref=e171]:
      - generic [ref=e172]:
        - generic [ref=e173]: "05"
        - text: DESIGN DIRECTION
      - generic [ref=e174]:
        - generic [ref=e175]:
          - heading "Its own identity. In every detail." [level=2] [ref=e176]: Its own identity.In every detail.
          - generic [ref=e177]: Habits & routines
        - generic [ref=e178]:
          - paragraph [ref=e179]: Purple gradients and soft white cards give the product a distinct identity. Circular progress graphics provide contrast to the linear routine list, while compact date controls keep time and daily activity close together.
          - generic [ref=e180]: Design observations from the supplied project artwork.
    - generic [ref=e185]:
      - generic [ref=e186]:
        - generic [ref=e187]:
          - generic [ref=e188]: "06"
          - text: TECHNICAL PERSPECTIVE
        - heading "Routine definitions and daily views." [level=2] [ref=e189]
        - paragraph [ref=e190]: The visible interface distinguishes habit configuration from the overview of displayed activity. It does not establish reminder delivery, background scheduling, synchronization, or measured adherence, all of which would require implementation evidence beyond the artwork.
        - list [ref=e191]:
          - listitem [ref=e192]: Habit configuration
          - listitem [ref=e195]: Repetition controls
          - listitem [ref=e198]: Daily overview
      - complementary "Clarigo company technology capabilities" [ref=e201]:
        - generic [ref=e203]: CLARIGO ENGINEERING TOOLKIT
        - generic [ref=e204]:
          - generic [ref=e205]: React
          - generic [ref=e206]: Next.js
          - generic [ref=e207]: Node.js
          - generic [ref=e208]: Flutter
          - generic [ref=e209]: Python
          - generic [ref=e210]: Docker
        - paragraph [ref=e211]: Published company capabilities. The original project material does not identify a project-specific technology stack.
        - link "Explore Clarigo's app development" [ref=e212] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/services/app-development
    - generic [ref=e217]:
      - generic [ref=e218]:
        - generic [ref=e219]: "07"
        - text: UI SCREENSHOTS & ARTWORK
      - generic [ref=e220]:
        - heading "Inside HabitStride." [level=2] [ref=e221]
        - paragraph [ref=e222]: Explore the original interface screens. Select any image for a closer look.
      - generic [ref=e223]:
        - figure "INTERFACE SCREEN 01" [ref=e224]:
          - button "Expand HabitStride interface view 1" [ref=e225] [cursor=pointer]:
            - img "HabitStride — interface screen 1" [ref=e226]
          - generic [ref=e233]:
            - generic [ref=e234]: INTERFACE SCREEN
            - generic [ref=e235]: "01"
        - figure "INTERFACE SCREEN 02" [ref=e236]:
          - button "Expand HabitStride interface view 2" [ref=e237] [cursor=pointer]:
            - img "HabitStride — interface screen 2" [ref=e238]
          - generic [ref=e245]:
            - generic [ref=e246]: INTERFACE SCREEN
            - generic [ref=e247]: "02"
        - figure "INTERFACE SCREEN 03" [ref=e248]:
          - button "Expand HabitStride interface view 3" [ref=e249] [cursor=pointer]:
            - img "HabitStride — interface screen 3" [ref=e250]
          - generic [ref=e257]:
            - generic [ref=e258]: INTERFACE SCREEN
            - generic [ref=e259]: "03"
        - figure "INTERFACE SCREEN 04" [ref=e260]:
          - button "Expand HabitStride interface view 4" [ref=e261] [cursor=pointer]:
            - img "HabitStride — interface screen 4" [ref=e262]
          - generic [ref=e269]:
            - generic [ref=e270]: INTERFACE SCREEN
            - generic [ref=e271]: "04"
    - region "Project sources" [ref=e272]:
      - generic [ref=e273]:
        - generic [ref=e274]: SOURCE MATERIAL
        - paragraph [ref=e275]: Project names and wordmarks have been updated for this portfolio. Interface layouts come from the supplied project artwork. Descriptions, journeys, and design considerations interpret the artwork and available overview. They do not imply unpublished client briefs, verified implementation details, app-store availability, or measured business results.
      - link "Clarigo portfolio" [ref=e276] [cursor=pointer]:
        - /url: https://clarigoinfotech.com/portfolio
    - link "NEXT MOBILE PROJECT TukioConnect" [ref=e281] [cursor=pointer]:
      - /url: /portfolio/app-tukioconnect
      - generic [ref=e282]:
        - generic [ref=e283]: NEXT MOBILE PROJECT
        - strong [ref=e284]: TukioConnect
    - generic [ref=e287]:
      - generic [ref=e288]:
        - generic [ref=e289]:
          - generic [ref=e290]: KEEP EXPLORING
          - heading "More perspectives." [level=2] [ref=e291]
        - link "View all work" [ref=e292] [cursor=pointer]:
          - /url: /#portfolio
      - generic [ref=e296]:
        - link "TukioConnect — original project artwork Team communication TukioConnect" [ref=e297] [cursor=pointer]:
          - /url: /portfolio/app-tukioconnect
          - img "TukioConnect — original project artwork" [ref=e301]
          - generic [ref=e302]: Team communication
          - strong [ref=e303]: TukioConnect
        - link "Pace of Play — original project artwork Golf & course activity Pace of Play" [ref=e306] [cursor=pointer]:
          - /url: /portfolio/app-pace-of-play
          - img "Pace of Play — original project artwork" [ref=e310]
          - generic [ref=e311]: Golf & course activity
          - strong [ref=e312]: Pace of Play
        - link "Qcop App — original project artwork Work records & documents Qcop App" [ref=e315] [cursor=pointer]:
          - /url: /portfolio/app-qcop-app
          - img "Qcop App — original project artwork" [ref=e319]
          - generic [ref=e320]: Work records & documents
          - strong [ref=e321]: Qcop App
    - generic [ref=e325]:
      - generic [ref=e326]:
        - generic [ref=e327]: YOUR NEXT PRODUCT
        - heading "Inspired by HabitStride?" [level=2] [ref=e328]:
          - text: Inspired by
          - generic [ref=e329]: HabitStride?
        - paragraph [ref=e330]: Creating an everyday routine product? Let's make repeated actions and their time context feel clear.
      - generic [ref=e331]:
        - link "Discuss your project" [ref=e332] [cursor=pointer]:
          - /url: https://clarigoinfotech.com/contact
        - link "Browse all 47 projects" [ref=e336] [cursor=pointer]:
          - /url: /#portfolio
  - contentinfo [ref=e339]:
    - link [ref=e340] [cursor=pointer]:
      - /url: /
      - img "Clarigo Infotech" [ref=e341]
    - generic [ref=e342]: AI-first engineering · 10+ years of delivery
    - generic [ref=e343]: © 2026 Clarigo Infotech
  - alert [ref=e344]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('hero words, scroll reveals, image masks and progress animate then settle', async ({ page }, info) => {
  4  |   await page.addInitScript(() => {
  5  |     (window as typeof window & { wordEntrances: number }).wordEntrances = 0;
  6  |     document.addEventListener('animationstart', event => { if ((event as AnimationEvent).animationName === 'clarigoWordIn') (window as typeof window & { wordEntrances: number }).wordEntrances++; });
  7  |   });
  8  |   await page.goto('/portfolio/livsocial');
  9  |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  10 |   await expect.poll(() => page.locator('.motionWord').evaluateAll(words => words.every(word => getComputedStyle(word).transform === 'none' && getComputedStyle(word).opacity === '1'))).toBe(true);
  11 |   expect(await page.evaluate(() => (window as typeof window & { wordEntrances: number }).wordEntrances)).toBeGreaterThan(0);
  12 |   const first = page.locator('.projectGallery>figure').first();
  13 |   expect(await first.evaluate(el => Number(getComputedStyle(el).opacity))).toBe(0);
  14 |   expect(await first.evaluate(el => getComputedStyle(el).clipPath)).not.toBe('none');
  15 |   const samples = await first.evaluate(el => new Promise<number[]>(resolve => {
  16 |     el.scrollIntoView({ block: 'center', behavior: 'instant' });
  17 |     const start = performance.now(), values: number[] = [];
  18 |     function frame() { values.push(Number(getComputedStyle(el).opacity)); if (performance.now() - start < 1050) requestAnimationFrame(frame); else resolve(values); } requestAnimationFrame(frame);
  19 |   }));
  20 |   expect(samples.some(value => value > 0 && value < 1)).toBe(true);
  21 |   await expect.poll(() => first.evaluate(el => ({ opacity: getComputedStyle(el).opacity, clip: getComputedStyle(el).clipPath, promotion: getComputedStyle(el).willChange })) ).toEqual({ opacity: '1', clip: 'none', promotion: 'auto' });
  22 |   expect(await page.locator('.portfolioProgress').evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).a)).toBeGreaterThan(0);
  23 |   if (info.project.name === 'desktop') expect(await page.locator('[data-motion-parallax]').count()).toBeGreaterThan(0);
  24 |   else await expect(page.locator('[data-motion-parallax]')).toHaveCount(0);
  25 | });
  26 | 
  27 | test('pointer depth is bounded, resets, and filtering never hides keyboard targets', async ({ page }, info) => {
  28 |   await page.goto('/#portfolio');
  29 |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  30 |   const card = page.locator('.projectEntrance').first();
  31 |   await card.scrollIntoViewIfNeeded();
  32 |   await expect.poll(() => card.evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  33 |   await expect(card).toHaveAttribute('data-depth-enabled', info.project.name === 'desktop' ? 'true' : 'false');
  34 |   if (info.project.name === 'desktop') {
  35 |     const box = (await card.boundingBox())!;
  36 |     await page.mouse.move(box.x + box.width * .8, box.y + box.height * .3);
  37 |     await expect.poll(() => card.locator('.depthSurface').evaluate(el => getComputedStyle(el).transform)).not.toBe('none');
  38 |     const translation = await card.locator('.depthSurface').evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42);
  39 |     expect(Math.abs(translation)).toBeLessThan(6);
  40 |     await page.mouse.move(1, 1);
  41 |     await expect.poll(() => card.locator('.depthSurface').evaluate(el => getComputedStyle(el).transform)).toBe('none');
  42 |   }
  43 |   await page.getByRole('searchbox').fill('TukioConnect');
  44 |   await expect(page.locator('.projectCard')).toHaveCount(2);
  45 |   await page.getByRole('searchbox').clear();
  46 |   await expect(page.locator('.projectCard')).toHaveCount(47);
  47 |   const link = page.locator('.projectLink').last();
  48 |   await link.focus();
  49 |   await expect(link).toBeFocused();
  50 |   await expect.poll(() => link.locator('..').locator('..').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  51 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  52 |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  53 |   await expect(page.locator('.projectEntrance').first()).toHaveAttribute('data-depth-enabled', 'false');
  54 |   expect(await page.locator('.depthSurface').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).transform === 'none'))).toBe(true);
  55 | });
  56 | 
  57 | test('live reduced motion, deep links and dialog navigation preserve readable content', async ({ page }) => {
  58 |   await page.goto('/portfolio/app-habitstride');
  59 |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  60 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  61 |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
> 62 |   expect(await page.locator('.motionWord, .featureColumn>article, .workflowSteps>li, .projectGallery>figure').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1' && getComputedStyle(node).transform === 'none'))).toBe(true);
     |                                                                                                                                                                                                                                                 ^ Error: expect(received).toBe(expected) // Object.is equality
  63 |   await page.getByRole('link', { name: 'Screenshots', exact: true }).click();
  64 |   const first = page.locator('.galleryOpen').first(); await first.click();
  65 |   await page.getByRole('button', { name: 'Next image', exact: true }).click();
  66 |   await expect(page.locator('.galleryDialogBar small')).toContainText('2 /');
  67 |   await expect.poll(() => page.locator('.galleryDialogImageFrame').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  68 |   expect(await page.locator('.galleryDialogImageFrame').evaluate(el => getComputedStyle(el).transform)).toBe('none');
  69 |   await page.keyboard.press('Escape'); await expect(first).toBeFocused();
  70 |   await page.emulateMedia({ reducedMotion: 'no-preference' });
  71 |   await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  72 |   expect(await page.locator('.motionWord').evaluateAll(words => words.every(word => getComputedStyle(word).animationName === 'none'))).toBe(true);
  73 |   await page.goto('/portfolio/streamdexa#screens');
  74 |   await expect(page.locator('html')).toHaveAttribute('data-motion-skip-hero', '');
  75 |   await expect.poll(() => page.locator('.projectGallery>figure').first().evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  76 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  77 | });
  78 | 
  79 | test('the portfolio and detail content stay usable with JavaScript disabled', async ({ browser, page }) => {
  80 |   const context = await browser.newContext({ javaScriptEnabled: false, viewport: page.viewportSize()! });
  81 |   try {
  82 |     const staticPage = await context.newPage(); await staticPage.goto('/');
  83 |     await expect(staticPage.locator('.projectLink')).toHaveCount(47);
  84 |     await staticPage.locator('.projectLink[href="/portfolio/app-infiscribe"]').click();
  85 |     await expect(staticPage).toHaveURL('/portfolio/app-infiscribe');
  86 |     await expect(staticPage.locator('h1')).toHaveText('InfiScribe.');
  87 |     await expect(staticPage.locator('#overview')).toBeVisible();
  88 |     expect(await staticPage.locator('#screens').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  89 |   } finally { await context.close(); }
  90 | });
  91 | 
```