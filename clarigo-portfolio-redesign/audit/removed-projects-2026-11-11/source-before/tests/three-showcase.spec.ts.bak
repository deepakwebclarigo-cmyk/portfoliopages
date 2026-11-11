import { test, expect } from '@playwright/test';

test('generic ecosystem renders real WebGL geometry continuously and stops for reduced motion', async ({ page }, info) => {
  const failures: string[]=[];page.on('pageerror',error=>failures.push(error.message));
  await page.goto('/');const canvas=page.locator('canvas.portfolioWebgl');
  await expect(page.locator('[data-hero-webgl-view] img,[data-hero-webgl-view] image')).toHaveCount(0);
  if(info.project.name==='mobile'){
    await expect(canvas).toHaveAttribute('data-engine','static');await expect(page.locator('.heroAmbient')).not.toBeVisible();
  }else{
    await expect(canvas).toHaveAttribute('data-engine','three');await expect(canvas).toHaveAttribute('data-assets','ready');
    await expect(canvas).toHaveAttribute('data-scene','uiux-ecosystem');
    await expect(page.locator('[data-hero-webgl-view]')).toHaveAttribute('data-renderer','three');
    const native=await canvas.evaluate(node=>{const gl=(node as HTMLCanvasElement).getContext('webgl2')!;return{version:gl.getParameter(gl.VERSION),program:Boolean(gl.getParameter(gl.CURRENT_PROGRAM))};});
    expect(native.version).toContain('WebGL 2');expect(native.program).toBe(true);
    await expect.poll(()=>canvas.evaluate(node=>Number((node as HTMLElement).dataset.triangles))).toBeGreaterThan(1000);
    const first=await canvas.getAttribute('data-frame');await expect.poll(()=>canvas.getAttribute('data-frame')).not.toBe(first);
    await page.evaluate(()=>scrollTo({top:1100,behavior:'instant'}));await expect(canvas).toHaveAttribute('data-state','paused');
    const paused=await canvas.getAttribute('data-frame');await page.waitForTimeout(180);expect(await canvas.getAttribute('data-frame')).toBe(paused);
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await expect(canvas).toHaveAttribute('data-state','running');
    await page.emulateMedia({reducedMotion:'reduce'});await expect(canvas).toHaveAttribute('data-state','reduced');
    const still=await canvas.getAttribute('data-frame');await page.waitForTimeout(180);expect(await canvas.getAttribute('data-frame')).toBe(still);
  }
  expect(failures).toEqual([]);
});

test('unavailable WebGL preserves the generic fallback and functional portfolio links', async ({ page }) => {
  await page.addInitScript(()=>{
    const original=HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,type:string,...args:unknown[]){return type.includes('webgl')?null:original.call(this,type as '2d',args[0] as CanvasRenderingContext2DSettings);} as typeof original;
  });
  await page.goto('/');await expect(page.locator('.heroShowcaseFallback')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText("Built for what's next.");await expect(page.locator('.projectLink')).toHaveCount(47);
  await page.locator('.projectLink[href="/portfolio/app-habitstride"]').click();
  await expect(page).toHaveURL('/portfolio/app-habitstride');await expect(page.locator('h1')).toHaveText('HabitStride.');
});
