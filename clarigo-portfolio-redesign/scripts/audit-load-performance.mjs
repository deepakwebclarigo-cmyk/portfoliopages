import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const phase = process.env.AUDIT_PHASE || 'after';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  for (const width of [1440, 390]) for (const route of ['/', '/portfolio/livsocial', '/portfolio/app-habitstride']) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, isMobile: width < 500, hasTouch: width < 500 });
    await context.addInitScript(() => {
      window.loadMetrics = { lcp: 0, shifts: [], longTasks: [], interactions: [] };
      for (const type of ['largest-contentful-paint', 'layout-shift', 'longtask', 'event']) {
        if (!PerformanceObserver.supportedEntryTypes.includes(type)) continue;
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (type === 'largest-contentful-paint') window.loadMetrics.lcp = entry.startTime;
            if (type === 'layout-shift' && !entry.hadRecentInput) window.loadMetrics.shifts.push({ time: entry.startTime, value: entry.value });
            if (type === 'longtask') window.loadMetrics.longTasks.push(entry.duration);
            if (type === 'event' && entry.interactionId) window.loadMetrics.interactions.push(entry.duration);
          }
        }).observe({ type, buffered: true, ...(type === 'event' ? { durationThreshold: 16 } : {}) });
      }
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    if (width < 500) {
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 100000 });
    }
    await page.goto('http://127.0.0.1:3100' + route);
    await page.waitForTimeout(3500);
    const loading = await page.evaluate(() => {
      const metrics = window.loadMetrics, resources = performance.getEntriesByType('resource');
      let cls = 0, value = 0, start = 0, last = 0;
      for (const shift of metrics.shifts) {
        if (shift.time - last > 1000 || shift.time - start > 5000) { start = shift.time; value = 0; }
        value += shift.value; last = shift.time; cls = Math.max(cls, value);
      }
      return { lcpMs: Math.round(metrics.lcp), cls: Number(cls.toFixed(4)), longTaskCount: metrics.longTasks.length, blockingMs: Math.round(metrics.longTasks.reduce((sum, duration) => sum + Math.max(0, duration - 50), 0)), transferredBytes: resources.reduce((sum, entry) => sum + entry.transferSize, 0), webglEngine: document.querySelector('.portfolioWebgl')?.dataset.engine };
    });
    if (route === '/') {
      await page.getByRole('searchbox').fill('TukioConnect');
      await page.getByRole('searchbox').clear();
    } else {
      await page.locator('.galleryOpen').first().click();
      await page.keyboard.press('ArrowRight'); await page.keyboard.press('Escape');
    }
    await page.waitForTimeout(200);
    const maxObservedInteractionMs = await page.evaluate(() => Math.max(0, ...window.loadMetrics.interactions));
    const result = { width, route, profile: width < 500 ? '4x CPU, 150ms RTT, 1.6Mbps, cold cache' : 'desktop unthrottled, cold cache', ...loading, maxObservedInteractionMs };
    results.push(result); console.log(JSON.stringify(result));
    await context.close();
  }
} finally {
  await browser.close();
  await writeFile('audit/premium-review/load-performance-' + phase + '.json', JSON.stringify({ note: 'Local Chrome lab samples, not field Core Web Vitals or a cross-device guarantee.', results }, null, 2));
}
