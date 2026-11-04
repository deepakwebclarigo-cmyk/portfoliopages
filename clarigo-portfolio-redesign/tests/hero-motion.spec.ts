import { test, expect } from '@playwright/test';

test('hero counters, pointer depth and ambient animation stay bounded and pause offscreen', async ({ page }, info) => {
  await page.addInitScript(() => {
    const samples: number[][] = [];
    const motionSamples: { first: number; last: number; action: number }[] = [];
    (window as typeof window & { heroCounterSamples: number[][] }).heroCounterSamples = samples;
    (window as typeof window & { heroSequenceSamples: typeof motionSamples }).heroSequenceSamples = motionSamples;
    const start = performance.now();
    function frame() {
      const counts = [...document.querySelectorAll('.heroCount')].map(node => Number(node.textContent));
      if (counts.length) samples.push(counts);
      const words = document.querySelectorAll('.heroCopy .motionWord'), action = document.querySelector('.heroActions>a');
      if (document.documentElement.dataset.heroTimeline === 'active' && words.length && action) motionSamples.push({ first: Number(getComputedStyle(words[0]).opacity), last: Number(getComputedStyle(words[words.length - 1]).opacity), action: Number(getComputedStyle(action).opacity) });
      if (performance.now() - start < 6000) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  const ambient = page.locator('.heroAmbient');
  await expect(ambient).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('.heroScene')).toHaveCount(0);
  await expect(page.locator('canvas.portfolioWebgl')).toHaveCount(1);
  await expect.poll(() => page.locator('.heroCount').allTextContents()).toEqual(['19', '28', '20']);
  await expect(page.locator('.heroCount[data-count-state="complete"]')).toHaveCount(3);
  await expect(page.locator('html')).toHaveAttribute('data-hero-timeline', 'complete');
  const samples = await page.evaluate(() => (window as typeof window & { heroCounterSamples: number[][] }).heroCounterSamples);
  expect(samples.some(values => values.some((value, index) => value > 0 && value < [19, 28, 20][index]))).toBe(true);
  const sequence = await page.evaluate(() => (window as typeof window & { heroSequenceSamples: { first: number; last: number; action: number }[] }).heroSequenceSamples);
  expect(sequence.some(sample => sample.first > .1 && sample.last < .1)).toBe(true);
  expect(sequence.some(sample => sample.last > .1 && sample.action < .1)).toBe(true);
  await expect(page.locator('.heroShowcaseFallback svg')).toHaveCount(1);
  expect(await page.locator('.heroCount').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).fontSize === getComputedStyle(node.parentElement!).fontSize && getComputedStyle(node).color === getComputedStyle(node.parentElement!).color))).toBe(true);
  await expect.poll(() => page.locator('.heroCopy .motionWord').evaluateAll(words => words.every(word => getComputedStyle(word).transform === 'none'))).toBe(true);
  for (const action of await page.locator('.heroActions>a').all()) {
    await expect(action).toBeVisible();
    await expect.poll(() => action.evaluate(node => getComputedStyle(node).opacity)).toBe('1');
  }
  await expect(ambient).toHaveAttribute('data-pointer-depth', 'false');
  if (info.project.name === 'mobile') await expect(ambient).toHaveAttribute('data-ambient-state', 'static');
  else {
    await expect(ambient).toHaveAttribute('data-ambient-state', 'running');
    if (info.project.name === 'desktop') {
      const canvas=page.locator('.portfolioWebgl');await expect(canvas).toHaveAttribute('data-assets','ready');
      const bounds=(await page.locator('[data-hero-webgl-view]').boundingBox())!;
      await page.mouse.move(bounds.x+bounds.width*.48,bounds.y+bounds.height*.48);
      await expect(canvas).toHaveAttribute('data-hero-hover','true');
      await expect.poll(()=>canvas.evaluate(node=>Number((node as HTMLElement).dataset.heroExpansion))).toBeGreaterThan(.5);
      await page.mouse.move(1,1);
      await expect.poll(()=>canvas.evaluate(node=>Number((node as HTMLElement).dataset.heroExpansion))).toBeLessThan(.02);
    }
    await page.evaluate(() => scrollTo({ top: 1100, behavior: 'instant' }));
    await expect(ambient).toHaveAttribute('data-ambient-state', 'paused');
    const rose = page.locator('.heroBlobRose'), paused = await rose.getAttribute('style');
    await page.waitForTimeout(180); expect(await rose.getAttribute('style')).toBe(paused);
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await expect(ambient).toHaveAttribute('data-ambient-state', 'running');
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test('hero remains static and counters are final under initial and live reduced motion', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await expect(page.locator('.heroAmbient')).toHaveAttribute('data-ambient-state', 'static');
  expect(await page.locator('.heroCount').allTextContents()).toEqual(['19', '28', '20']);
  expect(await page.locator('.heroCopy .motionWord, .heroActions>a, .inventory>div').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1' && getComputedStyle(node).transform === 'none'))).toBe(true);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  await expect(page.locator('.heroAmbient')).toHaveAttribute('data-ambient-state', info.project.name === 'mobile' ? 'static' : 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.heroAmbient')).toHaveAttribute('data-ambient-state', 'static');
  await expect(page.locator('.heroAmbient')).toHaveAttribute('data-pointer-depth', 'false');
  expect(await page.locator('.heroCount').allTextContents()).toEqual(['19', '28', '20']);
  await page.locator('.heroActions>a').first().focus();
  await expect(page.locator('.heroActions>a').first()).toBeFocused();
  expect(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length)).toBe(0);
});
