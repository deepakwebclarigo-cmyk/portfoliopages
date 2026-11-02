# Clarigo Portfolio

The existing Next.js / TypeScript portfolio, continued in place with Three.js / React Three Fiber, GSAP ScrollTrigger, Framer Motion, and Lucide.

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
- Unique overviews, four evidence-based feature descriptions, design commentary, expandable galleries, and original web device compositions.
- 324 selected source assets stored locally as optimized WebP, plus 47 smaller card variants. The official Clarigo logo and verified Geist font files are also local.
- The existing visual direction, orbital Three.js scene, GSAP reveals, and Framer Motion card interactions are retained.
- Keyboard-accessible image viewer, scroll/focus restoration, mobile menu, reduced-motion behavior, and an offscreen animation pause.
- Canonical metadata, Open Graph, Twitter cards, structured data, sitemap, useful 404, and redirects for the two original misspelled project slugs.

The current working checkout is `D:\\Clarigo_Portfolio_NextJS_Fixed\\clarigo-portfolio-redesign`. No Git metadata was present in the supplied workspace. The original saved source snapshot is retained at `audit/copilot-source-2026-11-02.zip`.

## Content rules

Descriptions summarize the original artwork, visible UI, and reliable published overviews. Do not add unverified clients, implementation stacks, process histories, metrics, outcomes, or delivery claims. The user approved using only supported sections when documentation is absent.

The archive has conflicting names and copied assets. The Supplement Management entry uses artwork branded **Examined Life**; its page and card disclose that association. Glocal Expert's education artwork conflicts with its legal-services description. StreamDataX's preview caption and marketplace screens describe different subjects. These differences are recorded rather than silently combined.

Original screenshot artwork may itself include legacy sample interface text; it is preserved as source material. No new client screenshots or results have been invented.

## Files to continue from

- `lib/project-inventory.json`: stable 47-project inventory and original source mapping.
- `lib/project-content.ts`: project-specific editorial content.
- `lib/project-assets.json`: local images, source URLs, original checksums, and dimensions.
- `lib/asset-exclusions.json`: visual-review exclusions with reasons.
- `lib/projects.ts`: typed integration of inventory, content, and selected assets.
- `app/portfolio/[slug]/page.tsx`: shared detail-page structure.
- `components/ProjectGallery.tsx`: accessible expandable image viewer.
- `audit/CONTINUATION.md`: audit findings and verification status.
- `audit/PROJECTS.md`: every project route, gallery count, and original source.
- `audit/final-verification.json`: combined evidence for all 104 passing desktop/mobile checks.

## Verification

```sh
npm.cmd run typecheck
npm.cmd run build
npm.cmd run start
npm.cmd run test:e2e
npm.cmd run audit:assets
```

The browser suite uses the installed Chrome browser in an isolated test profile; no browser download is needed. Run it against the production server at http://127.0.0.1:3100. It covers every card and route at 1440px desktop and 390px emulated mobile widths, plus 320px and reduced-motion checks. Physical-device Safari/Android acceptance and live-site deployment are separate from these local checks. The postbuild check verifies HTML, RSC output, and generated cache metadata for every project route.

## Reproduce source research

`node scripts/audit-sources.mjs` crawls public Clarigo and legacy portfolio resources into `audit/source-audit.json`. `node scripts/import-assets.mjs` imports identity-matched candidates and keeps a resumable journal. After an import, run `node scripts/prepare-card-images.mjs` and `node scripts/verify-assets.mjs`. Preserve the visual exclusions; matching filenames alone are insufficient evidence of project identity.
