# Clarigo Portfolio

The existing Next.js / TypeScript portfolio, continued in place with Three.js, GSAP ScrollTrigger, Framer Motion, and Lucide. The hero uses a generic, continuously animated 3D UI/UX ecosystem. All 48 projects, verified artwork, native navigation, and the existing brand layout are retained.

## Run locally

On Windows PowerShell, use `npm.cmd` if the PowerShell execution policy blocks `npm.ps1`.

```sh
npm.cmd install
npm.cmd run dev
```

Open http://localhost:3000 for development. For a production preview, run `npm.cmd run build` followed by `npm.cmd run start`, then open http://localhost:3100. Development uses `.next`; production uses `.next-production`, so the two servers can run together safely.

## Portfolio and sources

- 20 web projects and 28 mobile projects, each with a dedicated prerendered detail route.
- Listings at `/` and `/portfolio`, with type filters, name/subject search, and direct project links.
- Unique overviews, four evidence-based features, three-step product journeys, design challenges and solution points, technical perspectives, design commentary, expandable galleries, and project-specific closing copy for all 48 projects.
- 359 selected artwork assets stored locally as WebP, plus 48 matching card variants and 48 responsive 960px hero variants. The official Clarigo logo, browser icons, and verified Geist font files are also local.
- The existing visual direction is preserved. Masked heading reveals, staggered entrances, ScrollTrigger image reveals, restrained device parallax, Framer Motion gallery transitions, and short native document transitions extend the official site's motion language.
- The listing hero combines soft rose/lavender lighting with real beveled browser, phone, typography, palette, and component geometry. Its seamless floating and assembly loop, spring parallax, raycast hover separation, and scroll camera use one shared WebGL renderer. The artwork is generic and contains no real project or application. It pauses offscreen and in inactive windows. Compact phones retain the original hero layout without decorative WebGL; reduced motion uses a static presentation.
- Card artwork stays centered with `object-fit: contain`, uniform scaling, bounded real 3D hover, and no circular arrow overlay. Stationary card wrappers avoid unused Framer springs. Detail pages load their decorative renderer on pointer interaction, and release rendering on compact layouts or forced colors. Every card retains its direct detail-page link.
- Landscape composition galleries use shorter frames while retaining complete artwork. Gallery position announcements, keyboard focus return, mobile-menu dismissal, focusable skip targets, and a keyboard-friendly empty-search reset improve shared interactions.
- Contrast-safe red buttons, clearer small labels, visible control boundaries, and consistent focus states improve readability without changing the section structure. Local Latin-font preloading and responsive hero sources reduce avoidable loading work. Collection structured data describes all 48 real portfolio entries.
- Keyboard-accessible image viewer, scroll/focus restoration, mobile menu, reduced-motion behavior, and an offscreen animation pause.
- Canonical metadata, Open Graph, Twitter cards, structured data, sitemap, useful 404, and permanent redirects for 20 renamed routes and the two original misspelled slugs.

The current working checkout is `D:\\Clarigo_Portfolio_NextJS_Fixed\\clarigo-portfolio-redesign`. No Git metadata was present in the supplied workspace. The original saved source snapshot is retained at `audit/copilot-source-2026-11-02.zip`.

## Content rules

Descriptions summarize the original artwork, visible UI, and reliable published overviews. Do not add unverified clients, implementation stacks, process histories, metrics, outcomes, or delivery claims. The user approved using only supported sections when documentation is absent.

The archive has conflicting names and copied assets. The Supplement Management entry uses artwork branded **Examined Life**; its page and card disclose that association. Glocal Expert now uses recovered Glocal Expert-branded legal-workspace artwork, replacing the unrelated education cover and the affected education narrative with the user's approval. Mercury Mailroom and Network Capital use recovered original mockups. Examined Life's additional gallery views are exact detail regions from its original high-resolution composition, not newly generated application screens. Source URLs and transformations are recorded in `audit/four-project-images/asset-provenance.json`. StreamDexa's cover follows its actual marketplace interfaces; EStrata's narrative follows the case-oriented screens.

Screenshot artwork may itself include legacy sample interface text. Project wordmarks were updated using the user-approved precise text replacement method; new covers compose the owning project's existing mockups. No new product screens or results have been invented. All originals and source mappings are preserved outside `public` in `audit/rebrand`.

## Files to continue from

- `lib/project-inventory.json`: current 48-project names and routes.
- `lib/project-content.ts`: project-specific editorial content.
- `lib/project-story.ts` and `lib/project-stories-{web,mobile}.ts`: typed project journeys, challenges, solutions, technical perspectives, closing copy, and audited image selections.
- `lib/project-assets.json`: selected local images, current SHA-256 checksums, dimensions, and explicit gallery roles.
- `audit/rebrand/source-manifest-before.json`: original inventory, source URLs, and visual exclusions, preserved privately.
- `lib/projects.ts`: typed integration of inventory, content, and selected assets.
- `app/portfolio/[slug]/page.tsx`: shared detail-page structure.
- `components/ProjectGallery.tsx`: accessible expandable image viewer.
- `components/HeroAmbient.tsx`: decorative hero motion, pointer depth, and offscreen/visibility pause.
- `components/PortfolioWebGL.tsx`, `lib/motion-webgl.ts`, and `lib/hero-showcase-scene.ts`: on-demand renderer lifecycle, shared scissor views, and procedural UI/UX geometry.
- `app/quality.css`: shared typography, contrast, focus, controls, and composition-frame refinements.
- `components/ScrollMotion.tsx`, `components/RevealWords.tsx`, and `app/motion.css`: shared entrances, counters, accessible scroll reveals, image depth, and reduced-motion fallbacks.
- `components/CaseStorySections.tsx` and `app/case-stories.css`: reference-inspired case-study sections in the existing brand system.
- `components/PortfolioLink.tsx`: prerendered-document navigation with short native page fades, avoiding stale metadata observed during client transitions in this framework stack.
- `audit/rebrand/REVIEW.md`: current naming, artwork method, and verification notes.
- `audit/rebrand/asset-verification.json` and `browser-tests.json`: current image and browser evidence.
- `audit/motion/REVIEW.md`: motion design, current validation, and preservation evidence.
- `audit/premium-review/`: current accessibility, load-performance, responsive-cover, and browser verification reports. Earlier stage reports remain historical evidence.
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

The browser suite uses installed Chrome in an isolated test profile. Run it against the production server at http://127.0.0.1:3100. Its responsive checks cover every card and route at 1440px desktop, 768px tablet, and 390px emulated mobile widths, plus 320px and reduced-motion checks. Coverage includes content, galleries, image ownership and fit, metadata, renamed searches, redirects, absence of previous names in published HTML and URLs, actual animated intermediate states, native WebGL, counters, pointer bounds, offscreen pausing, focus, deep links, no-JavaScript access, failed-thumbnail recovery, renderer disposal, and empty-search reset. Set `MOTION_TEST_REPORT=audit/premium-review/browser-tests.json` and `MOTION_TEST_ARTIFACTS=audit/premium-review/test-results` before running to retain current results separately; the default remains the historical motion directory. Physical-device Safari/Android acceptance and live-site deployment are separate from these local checks. The postbuild check verifies HTML, RSC output, and route-cache metadata for every project route. `node scripts/verify-project-rebrand.mjs` verifies image hashes, decoding, thumbnails, and visible pixel preservation outside name regions. Run raster/OCR audits separately from browser testing on memory-constrained machines.

`scripts/audit-premium-quality.mjs` uses the pinned private axe-core auditor and checks metadata, anchors, and overflow. Set `AUDIT_ALL_ROUTES=1` to inspect every detail route and representative mobile layouts. `scripts/audit-load-performance.mjs` records local cold-load LCP, CLS, blocking work, and observed interactions, including a throttled mobile profile; these are lab samples rather than field Core Web Vitals or accessibility certification. `scripts/optimize-portfolio-covers.mjs` reproduces the responsive cover variants from the existing selected artwork.

`scripts/capture-hero-layout.mjs` compares the hero with its saved pre-change geometry at 1440, 1195, 768, and 390px. Set `HERO_BASE_URL=http://127.0.0.1:3100` and `HERO_LAYOUT_OUTPUT=audit/motion/hero-layout-after.json` to compare rather than replace the baseline. `scripts/verify-motion-preservation.ps1` compares project data and configuration with the source checkpoint and checks all 316 selected artwork hashes. `node scripts/audit-motion-performance.mjs` records sequential local Chrome frame timings and previews after browser tests finish. These timings describe the test machine rather than guaranteeing a frame rate on every device.

## Reproduce source research

`node scripts/audit-sources.mjs` crawls public Clarigo and legacy portfolio resources into `audit/source-audit.json`. The original importer and journal are retained for provenance; the importer now guards against overwriting the renamed portfolio. Consult `audit/rebrand/source-manifest-before.json` for the original remote paths. Matching filenames alone are insufficient evidence of project identity. Current selected assets use explicit roles rather than public copies of historical source URLs.

## November 2026 identity refresh

Tukora Connect, Whizlume, Alumvia, and KegelTempo replace the four previous identities across six existing web/mobile entries. New logos were created with the built-in image generator; product interfaces remain the owning project source artwork. Standalone 1000 x 1000 transparent PNGs are in exports/four-refreshed-project-logos/. Design briefs, original sources, region edits, and preservation checks are in audit/brand-refresh-2026-11-11/. All 47 active projects remain.

## Infinote branding update

The document-scanning mobile project is now Infinote at /portfolio/app-infinote. Its previous InfiScribe URL redirects permanently to this page. The user-supplied logo is retained exactly in public/images/brand/projects/infinote-logo.png; faithful wordmark and icon variants appear in its project artwork and scoped page metadata. Clarigo's global branding and the other 43 projects are unchanged. Source checkpoints, region conservation, and verification are in audit/infinote-refresh-2026-11-11/.

## Consistent project thumbnails

All 48 project cards use the shared thumbnail layout in `lib/project-thumbnails.json`, with 720px, 960px, and 1600px WebP variants. The 21 previously rebranded projects use logo-matched background palettes; the remaining 27 retain the original cream/blush presentation. The `thumbnail` field is passed through the listing card data and used for small `ProjectVisual` presentations; `image` retains the existing detail-page artwork. High-resolution PNGs are in `exports/Clarigo-consistent-thumbnails/`.

The authoring template is `scripts/render-portfolio-thumbnails.mjs`; audited project-owned source selections and generation records are in `audit/thumbnail-system-2026-11-12/`. After changing sources or the template, regenerate and review the images before updating the runtime manifest. Integrity, preservation, route, browser, and export evidence is recorded alongside the source plan.


Tukora Connect's Web and Mobile thumbnails use a brand-showcase recipe in `audit/tukora-thumbnail-refresh-2026-11-12/`. The shared renderer delegates these two layouts using their source-plan entries. Regenerate them with `node scripts/render-portfolio-thumbnails.mjs --only=tukora-connect,app-tukora-connect --write-manifest`; the current separate PNG downloads are in `exports/Tukora-Connect-Thumbnails/`.



### Strivaro fitness portfolio

Strivaro is available at `/portfolio/app-strivaro` as a dedicated Mobile project. All nine supplied designs are included in the gallery; splash and sign-in branding use the new identity. The shared two-device thumbnail style is retained. Transparent 1000 x 1000 logo and symbol PNGs are in `exports/Strivaro-Brand/`. Source snapshots, OCR, and exact branding-region pixel checks are in `audit/strivaro-project-2026-11-12/`.


### AxoraBid vehicle-auction portfolio

AxoraBid Mobile is available at `/portfolio/app-axorabid` as the companion app case study. Ten supplied interface screens and the renamed brand tile are included, with a complete case study, responsive hero artwork, and the shared two-device thumbnail. Transparent 1000 x 1000 primary, inverse, and symbol PNGs are in `exports/AxoraBid-Brand/`. Source snapshots, branding-region preservation, onboarding-watermark cleanup, and OCR evidence are in `audit/axorabid-project-2026-11-12/`.


### AxoraBid Web companion portfolio

AxoraBid Web is available at `/portfolio/axorabid`, paired bidirectionally with `/portfolio/app-axorabid`. The active collection contains 47 projects: 20 Web and 27 Mobile. All thirteen supplied web designs are retained in the gallery with AxoraBid branding. The homepage crop supplies the shared thumbnail; the hero uses the authentic seller dashboard and the existing mobile app entry screen. Full source snapshots, OCR, exact branding-region preservation checks, and presentation provenance are in `audit/axorabid-web-2026-11-12/`.


## Calivora Mobile

Calivora is available at `/portfolio/app-calivora`. The active collection now contains 48 projects: 20 Web and 28 Mobile. All thirteen supplied app screens and the brand identity artwork are included, with a complete case study, a three-device hero, and a thumbnail using the shared two-device mobile system. Branding is updated in the splash, sign-in, registration, account, and identity artwork. The source files are preserved in `audit/calivora-project-2026-11-12/originals/`, with OCR and branding-region checks alongside them. Primary, inverse, and symbol logos are genuine transparent 1000 x 1000 PNGs in `exports/Calivora-Brand/`; the design brief records the built-in imagegen prompt. Registration and account labels do not invent a new public domain. Content describes the supplied interfaces without asserting a clinical outcome, service integration, or undocumented mobile framework.


## Project palette refresh

The color-only refresh covers 18 previously rebranded identities across 21 existing Web and Mobile pages. `lib/project-themes.json` supplies their coordinated presentation surfaces. All 179 owning screen and cover assets were refreshed in place without resampling, and 84 current logo/icon/export files retain their exact alpha silhouettes and sizes. Affected thumbnails are regenerated from the recolored owning artwork using the existing crop coordinates and shared layout. The other 27 projects, project names/routes, content, components, typography, motion, and interactions are retained. The original color assets remain available, with the checkpoint and image mappings in `audit/color-theme-refresh-2026-11-12/`. The preceding raster audit records source preservation, fixed geometry, protected photographic pixels, logo silhouettes, and the implementation checkpoint for that phase. `exports/Project-Theme-Refresh-2026-11-12/` contains the palette guide and 18 transparent 1000 x 1000 logo PNGs.

## Visible project identity themes

The 18 updated-logo identities (21 pages) now apply their palette throughout the case study using `lib/project-theme.ts` and `app/project-identities.css`. Every CSS rule is scoped to `main.casePage[data-project-theme]`; the shared Clarigo header/footer and all 27 other projects keep their existing appearance. Existing screenshot colors and the 84 already refined logo variants are preserved. `scripts/project-thumbnail-theme.mjs` applies the same palettes to only the selected thumbnail backgrounds without changing the device layout or source-image crop.

The checkpoint, responsive geometry comparisons, hover checks, contrast evidence, and final verification are in `audit/project-identities-2026-11-13/`. Run `node audit/project-identities-2026-11-13/verify-preservation.mjs` for scope, unchanged artwork, logo hashes, thumbnail fit, and unrelated-source checks. `exports/Project-Identity-Themes-2026-11-13/` contains the palette guide, transparent logo copies, and page comparison.

## Simple thumbnail interaction

Listing and related thumbnails always use their native images. Three.js image handoffs, tilt, zoom and opacity switching are disabled for these cards. A 250ms fade, 2px card lift and soft shadow/color transitions provide the only thumbnail motion. Reduced-motion preferences disable these effects. Three.js rendering is reserved for the main hero; project artwork remains native and stationary. Project artwork, palettes, layout and image fitting are preserved.

The hover tests verify every project at 1x and 2x density, including related cards, and check that native images never change source, opacity or transform during hover. The earlier tablet case-fragment reveal-readiness fix is retained. Current verification is in audit/thumbnail-simple-2026-11-13/.

## Mockup fitting and responsive presentation

Project hero images use intrinsic dimensions with consistent insets. Thumbnail frames match the 1600 x 1325 source canvas, and gallery frames adapt to each image ratio. Artwork captions and expand controls sit outside the mockups. Tablet case heroes stack before the image becomes too small. The image viewer uses a bounded grid so its toolbar and complete image fit together at every viewport. Mockup parallax and pointer-driven image rendering are disabled; the main Three.js hero is retained and reinitializes correctly across route navigation. Project content, original artwork and palettes are preserved. Verification and cache-relocation evidence are in `audit/mockup-fit-2026-11-13/`.

## Repository cleanup and Git recovery

The 2026-11-17 cleanup removed obsolete build snapshots, reproducible test traces and OCR inputs, the redundant FFmpeg download ZIP, and a packaged export with byte-identical retained files. Unique archive contents, source artwork, working video tools, all public assets, and unpacked exports are retained. The audit under `audit/repository-cleanup-2026-11-17/` records the deleted files and verifies protected file hashes.

Generated verification output, local binaries, and packaged ZIP exports are excluded from Git. Historical source assets, renderer plans, authoring scripts, production images, and unpacked deliverables remain available. The video renderer still uses the retained local FFmpeg/FFprobe executables; these tools must be installed separately on a fresh checkout. Recreate disposable test evidence with the existing verification scripts.

A broken temporary-folder cache junction was replaced by a normal local `.next-production/cache` directory. Production and development builds continue using separate output directories. The pre-cleanup Git history and local changes are recoverable from verified bundles in `C:/Users/lenovo/Downloads/Clarigo-Git-Backup-2026-11-17/` on this workstation. Only unpublished commits are repaired; the published ancestor is preserved, so the repaired branch supports a normal fast-forward push.

Raster authoring checkpoints in `audit/` are retained locally and in the verified recovery bundles, and are excluded from Git uploads. Production artwork in `public/`, unpacked deliverables in `exports/`, authoring scripts, source plans, and verification JSON remain tracked. A fresh checkout can run the production app and current image checks without these local raster checkpoints; historical pixel-comparison workflows may require restoring their checkpoint images from the recovery bundle.

## Image library organization

Published branding, screenshots, thumbnails, and shareable exports retain their established folders and URLs. Unreferenced review artwork is grouped under `asset-library/reviews/projects/` and `asset-library/reviews/by-phase/`. See `asset-library/README.md` for the folder guide and `audit/image-library-2026-11-18/` for the complete catalog, duplicate decisions, relocation map, and original-content verification. The redundant nested logo extraction was consolidated into `exports/updated-project-logos-1000px`, with authoring references updated to that identical collection.
