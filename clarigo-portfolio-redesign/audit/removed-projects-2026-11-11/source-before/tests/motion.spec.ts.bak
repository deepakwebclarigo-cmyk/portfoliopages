import { test, expect } from '@playwright/test';

test('hero words, scroll reveals, image masks and progress animate then settle', async ({ page }, info) => {
  await page.addInitScript(() => {
    (window as typeof window & { wordEntrances: number }).wordEntrances = 0;
    document.addEventListener('animationstart', event => { if ((event as AnimationEvent).animationName === 'clarigoWordIn') (window as typeof window & { wordEntrances: number }).wordEntrances++; });
  });
  await page.goto('/portfolio/livsocial');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  await expect.poll(() => page.locator('.motionWord').evaluateAll(words => words.every(word => getComputedStyle(word).transform === 'none' && getComputedStyle(word).opacity === '1'))).toBe(true);
  expect(await page.evaluate(() => (window as typeof window & { wordEntrances: number }).wordEntrances)).toBeGreaterThan(0);
  const first = page.locator('.projectGallery>figure').first();
  expect(await first.evaluate(el => Number(getComputedStyle(el).opacity))).toBe(0);
  expect(await first.evaluate(el => getComputedStyle(el).clipPath)).not.toBe('none');
  const samples = await first.evaluate(el => new Promise<number[]>(resolve => {
    el.scrollIntoView({ block: 'center', behavior: 'instant' });
    const start = performance.now(), values: number[] = [];
    function frame() { values.push(Number(getComputedStyle(el).opacity)); if (performance.now() - start < 1050) requestAnimationFrame(frame); else resolve(values); } requestAnimationFrame(frame);
  }));
  expect(samples.some(value => value > 0 && value < 1)).toBe(true);
  await expect.poll(() => first.evaluate(el => ({ opacity: getComputedStyle(el).opacity, clip: getComputedStyle(el).clipPath, promotion: getComputedStyle(el).willChange })) ).toEqual({ opacity: '1', clip: 'none', promotion: 'auto' });
  expect(await page.locator('.portfolioProgress').evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).a)).toBeGreaterThan(0);
  if (info.project.name === 'desktop') expect(await page.locator('[data-motion-parallax]').count()).toBeGreaterThan(0);
  else await expect(page.locator('[data-motion-parallax]')).toHaveCount(0);
});

test('card hover stays bounded without distorting artwork and filtering keeps keyboard targets visible', async ({ page }, info) => {
  await page.goto('/#portfolio');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  const card = page.locator('.projectEntrance').first();
  await card.scrollIntoViewIfNeeded();
  await expect.poll(() => card.evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  await expect(card).toHaveAttribute('data-depth-enabled', info.project.name === 'desktop' ? 'true' : 'false');
  if (info.project.name === 'desktop') {
    const canvas=page.locator('.portfolioWebgl');await expect(canvas).toHaveAttribute('data-engine','three');
    const box = (await card.boundingBox())!;
    await page.mouse.move(box.x + box.width * .8, box.y + box.height * .3);
    await expect(canvas).toHaveAttribute('data-card-active','true');
    await expect.poll(()=>canvas.evaluate(node=>Number((node as HTMLElement).dataset.cardTilt))).toBeGreaterThan(.01);
    const scale=await canvas.evaluate(node=>Number((node as HTMLElement).dataset.cardScale));expect(scale).toBeGreaterThanOrEqual(.955);expect(scale).toBeLessThanOrEqual(.99);
    expect(await card.locator('.depthSurface').evaluate(element => { const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform); return matrix.m11 === 1 && matrix.m22 === 1 && matrix.m12 === 0 && matrix.m21 === 0; })).toBe(true);
    await page.mouse.move(1, 1);
    await expect(canvas).not.toHaveAttribute('data-card-active','true');
    await expect.poll(()=>card.locator('.visual img').evaluate(el=>getComputedStyle(el).opacity)).toBe('1');
  }
  await page.getByRole('searchbox').fill('TukioConnect');
  await expect(page.locator('.projectCard')).toHaveCount(2);
  await page.getByRole('searchbox').clear();
  await expect(page.locator('.projectCard')).toHaveCount(47);
  const link = page.locator('.projectLink').last();
  await link.focus();
  await expect(link).toBeFocused();
  await expect.poll(() => link.locator('..').locator('..').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await expect(page.locator('.projectEntrance').first()).toHaveAttribute('data-depth-enabled', 'false');
  expect(await page.locator('.depthSurface').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).transform === 'none'))).toBe(true);
});

test('live reduced motion, deep links and dialog navigation preserve readable content', async ({ page }) => {
  await page.goto('/portfolio/app-habitstride');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await expect.poll(() => page.locator('.motionWord, .featureColumn>article, .workflowSteps>li, .projectGallery>figure').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1' && getComputedStyle(node).transform === 'none'))).toBe(true);
  await page.getByRole('link', { name: 'Screenshots', exact: true }).click();
  const first = page.locator('.galleryOpen').first(); await first.click();
  await page.getByRole('button', { name: 'Next image', exact: true }).click();
  await expect(page.locator('.galleryDialogBar small')).toContainText('2 /');
  await expect.poll(() => page.locator('.galleryDialogImageFrame').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  expect(await page.locator('.galleryDialogImageFrame').evaluate(el => getComputedStyle(el).transform)).toBe('none');
  await page.keyboard.press('Escape'); await expect(first).toBeFocused();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  expect(await page.locator('.motionWord').evaluateAll(words => words.every(word => getComputedStyle(word).animationName === 'none'))).toBe(true);
  await page.goto('/portfolio/streamdexa#screens');
  await expect(page.locator('html')).toHaveAttribute('data-motion-skip-hero', '');
  await expect.poll(() => page.locator('.projectGallery>figure').first().evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test('the portfolio and detail content stay usable with JavaScript disabled', async ({ browser, page }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: page.viewportSize()! });
  try {
    const staticPage = await context.newPage(); await staticPage.goto('/');
    await expect(staticPage.locator('.projectLink')).toHaveCount(47);
    await staticPage.locator('.projectLink[href="/portfolio/app-infiscribe"]').click();
    await expect(staticPage).toHaveURL('/portfolio/app-infiscribe');
    await expect(staticPage.locator('h1')).toHaveText('InfiScribe.');
    await expect(staticPage.locator('#overview')).toBeVisible();
    expect(await staticPage.locator('#screens').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  } finally { await context.close(); }
});

test('back navigation restores a readable portfolio and complete metadata', async ({ page }) => {
  await page.goto('/#portfolio');
  const link = page.locator('.projectLink[href="/portfolio/app-habitstride"]');
  await link.click();
  await expect(page).toHaveURL('/portfolio/app-habitstride');
  await page.goBack();
  await expect(page.locator('.projectCard')).toHaveCount(47);
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  await link.scrollIntoViewIfNeeded();
  await expect.poll(() => link.locator('..').locator('..').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
});
