# Clarigo continuation audit — 2026-11-02

Latest continuation: [reference-based case studies, 2026-11-03](reference-case-studies/REVIEW.md). The historical results below describe the earlier portfolio-completion stage. Current source uses 318 selected assets and the extended desktop/tablet/mobile suite.

## Starting state

The supplied app already contained a working Next.js portfolio, 47 data records, a dynamic project route, responsive styling, a Three.js hero, GSAP reveals, and Framer Motion card interactions. The initial build and TypeScript check passed. The detail content was mostly a repeated missing-information template; project assets were hotlinked. No Git repository or Copilot conversation/checkpoint history was included, so historical diffs could not be reconstructed. A source-only backup was created before implementation changes.

When the C: folder became unavailable after an interruption, the matching project was discovered at `D:\Clarigo_Portfolio_NextJS_Fixed\clarigo-portfolio-redesign`, including this session's backup, source report, import script, and assets. The original download ZIP was not extracted.

## Research and editorial decisions

The public crawl recorded 306 resources, including 98 live-site resources. All 98 live resources returned HTTP 200. The remaining resources cover the legacy website, linked pages, project pages, and preview-image checks; some legacy template links return 404. See `source-audit.json` and retained raw HTML in `sources/` for URLs, response status, headings, image references, source hashes, and observations.

Inventory: 19 web projects and 28 unique mobile projects. The legacy mobile listing has 29 cards, including a duplicate Law Legend entry; the web listing has 19 unique cards. The current application code is the portfolio implementation, not the source code of those client products. Its Next.js/React stack cannot establish the technology stacks of the showcased projects.

The user confirmed there is no separate brief/documentation folder and approved professional, unique content based on visible evidence, using supported sections only. Consequently, every page includes its own overview, four specific feature observations, design commentary, and a gallery. Web pages also preserve the original laptop/tablet composition. Unsupported client briefs, development narratives, technology stacks, performance statistics, and business outcomes are omitted.

Known source conflicts:

- Supplement Management is linked to Gymbet in the archive and its supplied poster is branded Examined Life. The dedicated page uses the supplied identity, retains the original listing association, and links to the source listing.
- Glocal Expert's supplied artwork presents education; its old overview describes legal services. The page explicitly follows the artwork.
- StreamDataX's preview caption mentions gig-worker management, while the project-specific screens show digital-asset discovery. Copy follows the visible screens and identifies the discrepancy.
- Racepace's old prose describes Gymbet. That prose is excluded.
- Heartsync's old gallery contains GoBroker screens. Only Heartsync artwork is included.
- Named project files can still be wrong: BR-Tennis contains a KegelKlock screen, Been There contains a LivSocial screen, and two Lead Management screens contain conflicting brokerage branding/template legal copy. These and the repeated ES-Platform composition are excluded in `lib/asset-exclusions.json`.

## Implemented continuation

The existing design, layout classes, components, portfolio filters, and navigation were extended. All 47 pages now use unique editorial records and local project imagery, with expandable galleries, source attribution, project-specific colors, next/related-project navigation, SEO metadata, structured data, sitemap, redirects, and a branded 404. Original misspelled case-management and supplement-management URLs redirect to the corrected routes.

The asset check decodes every selected file and verifies its dimensions. Its latest report covers 324 distinct selected assets: 207,597,826 original source bytes reduced to 32,244,670 local bytes. The 47 listing-card variants total 1,933,026 bytes. No remote image host is required to render the portfolio.

Three.js rendering pauses offscreen and in hidden tabs, with reduced-motion and unavailable-WebGL handling. GSAP initializes on route changes. Framer Motion respects reduced motion. The gallery restores focus and body scrolling on dismissal and unmount, and resets when the project changes.

The exact Geist font declarations were verified against the live Clarigo stylesheet and five subsets were imported locally (75,948 bytes). Font provenance is retained in `brand-fonts.json`.

A separate existing development server was found running from this same checkout. It was overwriting `.next` while production builds and previews used that directory, producing malformed prerender metadata and missing chunks. Production now uses `.next-production` and port 3100, while development retains `.next` and port 3000. The existing development process was preserved. A postbuild validator rejects missing HTML/RSC files or incomplete metadata for any of the 47 projects.

## Verification status

- Initial baseline: production build and TypeScript passed.
- First browser run: 96/102 passed. Failures identified scroll-lock timing, large dynamic image-optimization requests, and browser/GPU resource contention. Scroll restoration was fixed; pre-optimized local images are now served directly; card images use smaller variants; the final suite runs sequentially.
- Current production build: passed, prerendering all 47 project pages.
- Selected local asset decode/dimension check: passed with zero errors.
- Final browser coverage: **104/104 unique checks passed**, covering all 47 cards and routes at desktop (1440 × 1000) and emulated-mobile (390 × 844) sizes. The isolated full run passed 103/104; one assertion caught the brief old/new metadata overlap during client navigation. The assertion now waits for exactly one correct description and canonical URL, so a persistent duplicate still fails; its targeted rerun passed. No application source changed between those runs. See `final-verification.json`, `browser-tests-full-run.json`, and `browser-tests.json` for the full and targeted evidence.
- Checked route identity, unique content, loaded images, gallery opening/next/closing, focus and scroll restoration, next-project links, canonical metadata, and horizontal overflow. Additional checks passed for filtering/search, mobile navigation, an active WebGL canvas, old slugs, 404, sitemap/robots, gallery state across navigation, and 320px reduced-motion layout.
- All original-source identity exceptions remain disclosed above. `asset-verification.json` describes the selected render set; the import journal retains earlier attempts and rejected candidates for provenance.

No live deployment, Git commit, or Git push has been performed. Local browser checks do not establish physical-device Safari/Android behavior or the operation of the archived client products.
