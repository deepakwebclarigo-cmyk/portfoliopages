# Consistent Mobile Mockups — 2026-11-12

Updated all 25 Mobile portfolio thumbnails using one shared two-device layout. The 19 Web thumbnails, original project artwork, galleries, logos, project inventory, content, and existing hover engine are preserved.

## Presentation

- Identical 350 × 750 handset frames, camera treatment, baseline, gap, corner radii, and shadows.
- Existing 1600 × 1325 cream/blush frame, Geist typography, and Clarigo accents.
- Two genuine, project-owned UI views per project; screen pixels retain their aspect ratios.
- Existing device bezels and export artifacts removed from thumbnail derivatives. Angled LivSocial and Examined Life screens rectified from their original artwork; source files remain intact.
- Responsive WebP variants: 720, 960, and 1600 pixels wide. PNG masters remain in `exports/Clarigo-consistent-thumbnails`.

## Reproduction

- `screen-plan.json`: exact source hashes, extraction rectangles, and perspective coordinates.
- `thumbnail.css`: shared presentation.
- `scripts/render-mobile-thumbnails.mjs`: prepares and renders genuine source views.
- `scripts/render-portfolio-thumbnails.mjs`: delegates scoped Mobile rendering and updates the runtime manifest with `--write-manifest`.

Example: `node scripts/render-portfolio-thumbnails.mjs --only=app-racepace --write-manifest`

The Tukora-specific renderer now accepts scoped selections, so regenerating the Web thumbnail cannot revert the standardized Mobile thumbnail.

## Final verification

- Production build and TypeScript checks passed.
- Build output verified for all 44 project routes.
- All 132 thumbnail WebPs and 44 PNG masters passed integrity and sizing checks.
- All 308 original project images and 88 original responsive variants passed validation.
- 15 Playwright regression tests passed across desktop, tablet, and mobile.
- All 25 Mobile routes returned HTTP 200.
- 50 actual hover-image pixel comparisons passed: 25 at normal density and 25 at retina density.
- All 25 Mobile thumbnails passed tablet and mobile source, containment, centering, and overflow checks.
- No GPU texture errors, browser page errors, or stale thumbnail URLs in the final visual run.
- All 19 Web thumbnail manifest entries match the initial checkpoint.

See `visual-verification.json`, `browser-tests.json`, and the shared thumbnail audit's `asset-verification.json` for detailed evidence. `all-mobile-after.png` is the complete reviewed thumbnail contact sheet.
