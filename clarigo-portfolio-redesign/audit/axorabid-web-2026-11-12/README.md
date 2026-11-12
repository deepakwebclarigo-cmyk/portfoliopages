# AxoraBid Web — implementation and verification

Added `/portfolio/axorabid` as the Web companion to `/portfolio/app-axorabid`, reusing the established AxoraBid name and logo. All 13 supplied desktop designs are included in the gallery. The existing 46 projects retain their artwork, thumbnails, inventory order, and content.

Branding replacements cover header logos, authentication text, the long homepage, its embedded mobile mockup, and footer references. Pixels outside the recorded branding regions remain unchanged. The original email label was changed to Contact AxoraBid, avoiding an invented contact address; the unrelated Rentcars footer heading was corrected to AxoraBid. Original design figures are retained as supplied artwork, without treating them as verified business results.

The thumbnail uses the homepage hero viewport; the full homepage remains in the gallery. The hero combines the authentic desktop dashboard and the existing supplied mobile entry view. Source hashes and the mobile crop are recorded in `hero-sources.json`.

Validation completed:

- Production build and TypeScript checks passed.
- All 47 portfolio routes passed build-artifact validation.
- All 344 selected images, 94 responsive hero variants, 141 thumbnail WebPs, and 47 PNG masters passed integrity checks.
- 18 existing Playwright tests passed across desktop, tablet, and mobile.
- Two actual hover-image pixel checks passed at normal and retina densities, with no browser or GPU errors.
- Eight companion navigation transitions passed between the Web and Mobile pages.
- All 13 Web gallery images loaded, with no tablet or mobile document overflow.
- OCR checked 17 image tiles without detecting the old AutoBridge name or unrelated Rentcars label.
- All 13 original uploads and the previous 46 projects' artwork and thumbnails remain unchanged.

Detailed evidence: `asset-verification.json`, `visual-verification.json`, `browser-tests.json`, `screen-preservation.json`, and `ocr-final.jsonl`.
