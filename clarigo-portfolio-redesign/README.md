# Clarigo Portfolio

The existing Next.js / TypeScript portfolio, continued in place with GSAP ScrollTrigger, Framer Motion, and Lucide. The earlier Three.js scene remains in the source checkpoint; the user removed its visible wireframe sphere from the hero.

## Run locally

On Windows PowerShell, use `npm.cmd` if the PowerShell execution policy blocks `npm.ps1`.

```sh
npm.cmd install
npm.cmd run dev
```

Open http://localhost:3000 for development. For a production preview, run `npm.cmd run build` followed by `npm.cmd run start`, then open http://localhost:3100. Development uses `.next`; production uses `.next-production`, so the two servers can run together safely.

## Portfolio and sources

- 19 web projects and 28 mobile projects, each with a dedicated prerendered detail route.
- Listings at `/` and `/portfolio`, with type filters, name/subject search, and direct project links.
- Unique overviews, four evidence-based features, three-step product journeys, design challenges and solution points, technical perspectives, design commentary, expandable galleries, and project-specific closing copy for all 47 projects.
- 331 selected artwork assets stored locally as WebP, plus 47 matching card variants. The official Clarigo logo, browser icons, and verified Geist font files are also local.
- The existing visual direction is preserved. Masked heading reveals, staggered entrances, ScrollTrigger image reveals, restrained device parallax, Framer Motion card lifts, and short native document transitions extend the official site's motion language.
- The listing hero adds soft rose/lavender gradient motion, seven small particles, bounded mouse depth, and counters. Artwork pauses offscreen and in inactive windows; mobile keeps the original background with no extra moving artwork. Reduced-motion preferences remove all movement and show final numbers immediately.
- Card artwork stays centered with `object-fit: contain`, no image zoom or tilt, and no circular arrow overlay. Every card retains its direct detail-page link.
- Keyboard-accessible image viewer, scroll/focus restoration, mobile menu, reduced-motion behavior, and an offscreen animation pause.
- Canonical metadata, Open Graph, Twitter cards, structured data, sitemap, useful 404, and permanent redirects for 14 renamed routes and the two original misspelled slugs.

The current working checkout is `D:\\Clarigo_Portfolio_NextJS_Fixed\\clarigo-portfolio-redesign`. No Git metadata was present in the supplied workspace. The original saved source snapshot is retained at `audit/copilot-source-2026-11-02.zip`.

## Content rules

Descriptions summarize the original artwork, visible UI, and reliable published overviews. Do not add unverified clients, implementation stacks, process histories, metrics, outcomes, or delivery claims. The user approved using only supported sections when documentation is absent.

The archive has conflicting names and copied assets. The Supplement Management entry uses artwork branded **Examined Life**; its page and card disclose that association. Glocal Expert now uses recovered Glocal Expert-branded legal-workspace artwork, replacing the unrelated education cover and the affected education narrative with the user's approval. Mercury Mailroom and Network Capital use recovered original mockups. Examined Life's additional gallery views are exact detail regions from its original high-resolution composition, not newly generated application screens. Source URLs and transformations are recorded in `audit/four-project-images/asset-provenance.json`. StreamDexa's cover follows its actual marketplace interfaces; EStrata's narrative follows the case-oriented screens.

Screenshot artwork may itself include legacy sample interface text. Project wordmarks were updated using the user-approved precise text replacement method; new covers compose the owning project's existing mockups. No new product screens or results have been invented. All originals and source mappings are preserved outside `public` in `audit/rebrand`.

## Files to continue from

- `lib/project-inventory.json`: current 47-project names and routes.
- `lib/project-content.ts`: project-specific editorial content.
- `lib/project-story.ts` and `lib/project-stories-{web,mobile}.ts`: typed project journeys, challenges, solutions, technical perspectives, closing copy, and audited image selections.
- `lib/project-assets.json`: selected local images, current SHA-256 checksums, dimensions, and explicit gallery roles.
- `audit/rebrand/source-manifest-before.json`: original inventory, source URLs, and visual exclusions, preserved privately.
- `lib/projects.ts`: typed integration of inventory, content, and selected assets.
- `app/portfolio/[slug]/page.tsx`: shared detail-page structure.
- `components/ProjectGallery.tsx`: accessible expandable image viewer.
- `components/HeroAmbient.tsx`: decorative hero motion, pointer depth, and offscreen/visibility pause.
- `components/ScrollMotion.tsx`, `components/RevealWords.tsx`, and `app/motion.css`: shared entrances, counters, accessible scroll reveals, image depth, and reduced-motion fallbacks.
- `components/CaseStorySections.tsx` and `app/case-stories.css`: reference-inspired case-study sections in the existing brand system.
- `components/PortfolioLink.tsx`: prerendered-document navigation with short native page fades, avoiding stale metadata observed during client transitions in this framework stack.
- `audit/rebrand/REVIEW.md`: current naming, artwork method, and verification notes.
- `audit/rebrand/asset-verification.json` and `browser-tests.json`: current image and browser evidence.
- `audit/motion/REVIEW.md`: motion design, current validation, and preservation evidence.
- `audit/reference-case-studies/REVIEW.md` and `verification.json`: preserved evidence from the earlier reference-polish stage.
- `audit/CONTINUATION.md`: audit findings and verification status.
- `audit/PROJECTS.md`: every project route, gallery count, and original source.
- `audit/final-verification.json`: retained verification from the earlier portfolio-completion stage.

## Verification

```sh
npm.cmd run typecheck
npm.cmd run build
npm.cmd run start
npm.cmd run test:e2e
npm.cmd run audit:assets
```

The browser suite uses installed Chrome in an isolated test profile. Run it against the production server at http://127.0.0.1:3100. Its 192 checks cover every card and route at 1440px desktop, 768px tablet, and 390px emulated mobile widths, plus 320px and reduced-motion checks. It checks content, galleries, image ownership and fit, metadata, renamed searches, redirects, absence of previous names in published HTML and URLs, actual animated intermediate states, counters, pointer bounds, offscreen pausing, focus, deep links, and no-JavaScript access. Results are written to `audit/motion/browser-tests.json`; the earlier rebrand evidence remains in `audit/rebrand`. Physical-device Safari/Android acceptance and live-site deployment are separate from these local checks. The postbuild check verifies HTML, RSC output, and route-cache metadata for every project route. `node scripts/verify-project-rebrand.mjs` verifies image hashes, decoding, thumbnails, and visible pixel preservation outside name regions. Run raster/OCR audits separately from browser testing on memory-constrained machines.

`scripts/capture-hero-layout.mjs` compares the hero with its saved pre-change geometry at 1440, 1195, 768, and 390px. Set `HERO_BASE_URL=http://127.0.0.1:3100` and `HERO_LAYOUT_OUTPUT=audit/motion/hero-layout-after.json` to compare rather than replace the baseline. `scripts/verify-motion-preservation.ps1` compares project data and configuration with the source checkpoint and checks all 316 selected artwork hashes. `node scripts/audit-motion-performance.mjs` records sequential local Chrome frame timings and previews after browser tests finish. These timings describe the test machine rather than guaranteeing a frame rate on every device.

## Reproduce source research

`node scripts/audit-sources.mjs` crawls public Clarigo and legacy portfolio resources into `audit/source-audit.json`. The original importer and journal are retained for provenance; the importer now guards against overwriting the renamed portfolio. Consult `audit/rebrand/source-manifest-before.json` for the original remote paths. Matching filenames alone are insufficient evidence of project identity. Current selected assets use explicit roles rather than public copies of historical source URLs.
