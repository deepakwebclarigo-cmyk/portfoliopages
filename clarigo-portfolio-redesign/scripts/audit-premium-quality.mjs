import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const directory = 'audit/premium-review';
const phase = process.env.AUDIT_PHASE || 'after';
const all = process.env.AUDIT_ALL_ROUTES === '1';
const inventory = JSON.parse(await readFile('lib/project-inventory.json', 'utf8'));
const routes = all ? ['/', ...inventory.map(project => '/portfolio/' + project.slug)] : ['/', '/portfolio/mercury-mailroom', '/portfolio/app-habitstride'];
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce', isMobile: width < 500, hasTouch: width < 500 });
    for (const route of routes) {
      // Shared responsive components are covered on mobile; every route is
      // inspected on desktop without duplicating 47 identical mobile scans.
      if (all && width < 500 && !['/', '/portfolio/livsocial', '/portfolio/app-habitstride', '/portfolio/glocal-expert'].includes(route)) continue;
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const response = await page.goto('http://127.0.0.1:3100' + route);
      await page.evaluate(() => document.fonts.ready);
      await page.addScriptTag({ path: directory + '/axe-4.10.3.min.js' });
      const result = await page.evaluate(async () => {
        const report = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } });
        const anchorErrors = [...document.querySelectorAll('a[href^="#"]')].filter(anchor => !document.getElementById(decodeURIComponent(anchor.hash.slice(1)))).map(anchor => anchor.getAttribute('href'));
        return { overflow: document.documentElement.scrollWidth > innerWidth + 1, headings: document.querySelectorAll('h1').length, canonical: document.querySelectorAll('link[rel="canonical"]').length, anchorErrors, violations: report.violations.map(violation => ({ id: violation.id, impact: violation.impact, description: violation.description, nodes: violation.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })), incomplete: report.incomplete.map(rule => ({ id: rule.id, nodes: rule.nodes.length })) };
      });
      results.push({ width, route, status: response.status(), errors, ...result });
      console.log(JSON.stringify({ width, route, violations: result.violations.map(rule => [rule.id, rule.nodes.length]), overflow: result.overflow }));
      await page.close();
    }
    await context.close();
  }
} finally {
  await browser.close();
  await writeFile(directory + '/accessibility-' + phase + '.json', JSON.stringify({ axeVersion: '4.10.3', results }, null, 2));
}
if (results.some(result => result.status !== 200 || result.errors.length || result.overflow || result.headings !== 1 || result.canonical !== 1 || result.anchorErrors.length || result.violations.length)) process.exitCode = 1;
