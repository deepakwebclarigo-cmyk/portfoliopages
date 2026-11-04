import { test, expect } from '@playwright/test';

test('section navigation follows scrolling and returns to overview', async ({ page }) => {
  await page.goto('/portfolio/livsocial');
  const navigation = page.getByRole('navigation', { name: 'Case study sections' });
  await expect(navigation.locator('[aria-current="location"]')).toHaveText('Overview');
  await navigation.getByRole('link', { name: 'Screenshots', exact: true }).click();
  await expect(page).toHaveURL(/#screens$/);
  await expect.poll(() => page.locator('#screens').evaluate((element) => Math.round(element.getBoundingClientRect().top))).toBeLessThan(180);
  await expect(navigation.locator('[aria-current="location"]')).toHaveText('Screenshots');
  await navigation.getByRole('link', { name: 'Device views', exact: true }).click();
  await expect.poll(() => page.locator('#responsive').evaluate((element) => Math.round(element.getBoundingClientRect().top))).toBeLessThan(180);
  await expect(navigation.locator('[aria-current="location"]')).toHaveText('Device views');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(navigation.locator('[aria-current="location"]')).toHaveText('Overview');
});

test('screenshot viewer fits the viewport and supports keyboard controls', async ({ page }) => {
  for (const slug of ['livsocial', 'app-habitstride']) {
    await page.goto('/portfolio/' + slug);
    const first = page.locator('.galleryOpen').first();
    await first.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect.poll(() => dialog.evaluate((element) => getComputedStyle(element).opacity)).toBe('1');
    await expect.poll(() => page.locator('.galleryDialogImage img').evaluate((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0)).toBe(true);
    expect(await dialog.evaluate((element) => {
      const box = element.getBoundingClientRect();
      return box.top >= 0 && box.left >= 0 && box.bottom <= innerHeight && box.right <= innerWidth && element.scrollHeight <= element.clientHeight + 1;
    })).toBe(true);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.galleryDialogBar small')).toContainText('2 /');
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('.galleryDialogBar small')).toContainText('1 /');
    await page.keyboard.press('Escape');
    await expect(first).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
  }
});

test('changing reduced motion keeps revealed content readable', async ({ page }) => {
  await page.goto('/portfolio/app-habitstride');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const id of ['overview', 'features', 'design', 'screens']) {
    await expect.poll(() => page.locator('#' + id).evaluate((element) => getComputedStyle(element).opacity)).toBe('1');
  }
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('#features').scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('#features').evaluate((element) => getComputedStyle(element).opacity)).toBe('1');
});
