import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 45000,
  expect: { timeout: 15000 },
  fullyParallel: true,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: 'audit/design-polish/browser-tests.json' }]],
  outputDir: 'audit/design-polish/test-results',
  use: { baseURL: 'http://127.0.0.1:3100', channel: 'chrome', headless: true, screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 }, hasTouch: true } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 } },
  ],
});
