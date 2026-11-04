# Portfolio naming update — 2026-11-03

The existing D: project was continued in place. All 47 projects remain: 19 web and 28 mobile. Clarigo's typography, colors, page sections, interactions, Three.js scene, GSAP reveals, Framer Motion cards, navigation, and accessible gallery behavior are retained.

| Previous name | Current name | Current detail route |
| --- | --- | --- |
| StreamDataX | StreamDexa | `/portfolio/streamdexa` |
| TukeeConnect | TukioConnect | `/portfolio/tukioconnect` and `/portfolio/app-tukioconnect` |
| Parachute | ParaNest | `/portfolio/paranest` |
| Whizara | Whizora | `/portfolio/whizora` |
| Es-Platform | EStrata | `/portfolio/estrata` |
| Lead Management | LeadForma | `/portfolio/leadforma` |
| Simply Recruited | SimplyScouted | `/portfolio/app-simplyscouted` |
| Infinote | InfiScribe | `/portfolio/app-infiscribe` |
| Silasync | SilaFlow | `/portfolio/app-silaflow` |
| Digital Habit Tracker | HabitStride | `/portfolio/app-habitstride` |
| One Pantry | PantryOne | `/portfolio/app-pantryone` |
| Street Sheets | StreetSlate | `/portfolio/app-streetslate` |
| BR-tennis | RallyBridge | `/portfolio/rallybridge` |

## Application and links

Names and slugs are updated in inventory, case narratives, cards, companion links, next/related navigation, search, metadata, canonical URLs, structured data, sitemap, image paths, alt text, and captions. Fourteen previous detail URLs return permanent 308 redirects. The two pre-existing typo redirects remain.

The public asset manifest contains selected assets with explicit gallery roles and current hashes. Original remote URLs and archive labels are preserved in `source-manifest-before.json`, outside `public`; they are not serialized into client gallery data. The historical importer is guarded against overwriting this reviewed manifest.

## Artwork

The user explicitly approved precise text replacement and OCR, rather than regenerating screenshots. Poppins fonts from the official Google Fonts repository match the source artwork's visual style; their license and provenance are retained under `fonts`.

- 106 renamed project assets, including 13 newly composed covers built from each owning project's existing, renamed device artwork.
- 93 retained artwork files preserve all visible pixels outside the reviewed name regions. Lossless WebP removes hidden RGB values beneath fully transparent pixels; these do not affect the visible image. `asset-verification.json` records zero visible pixel changes outside the edited regions.
- Small logos, contact labels, splash wordmarks, and the longer Bear Republic wordmark in RallyBridge artwork were reviewed separately. HabitStride's former initials were replaced with HS.
- PantryOne's unrelated freelancer-directory composition is excluded. An unused angled TukioConnect composition is preserved privately; the matching renamed interface screens remain available in its gallery. No visible section or project was removed.
- All previous public files for the renamed projects were relocated to `retired-public-assets`, after absolute paths were checked. Original artwork copies, a source ZIP, edit plans, intermediate OCR, and source mappings are retained privately.
- StreamDexa's cover now follows its digital marketplace screens. EStrata's descriptions follow visible case records, tasks, notes, and findings. No implementation stack, client identity, app-store availability, or result was invented.

## Verification evidence

- Production build passed; postbuild verified HTML, RSC, and route-cache entries for all 47 project routes.
- `asset-verification.json`: 316 selected artwork files and 47 matching thumbnails decode; dimensions and current asset hashes match; all 47 posters have distinct hashes.
- `browser-tests.json`: full 171-check desktop/tablet/mobile run. One desktop navigation was interrupted by `ERR_INSUFFICIENT_RESOURCES` while a separate raster audit ran; 170 passed. The identical test passed in isolation in `browser-tests-recheck.json`. Image/OCR work is now run separately from browser work.
- Browser checks cover every card-to-detail link, content sections, gallery controls and focus, image ownership/loading, overflow, reduced motion, live section navigation, new-name searches, all 14 redirects, SEO metadata, structured data, sitemap, and absence of previous names in published HTML and URLs.
- `visual-verification.json` and `screenshots`: current desktop/mobile hero and gallery captures for each renamed page.
- `ocr-verification.json`: the portfolio-wide offline OCR result, supplemented by enlarged wordmark and cover review.

The local production preview is http://localhost:3100. These checks use installed Chrome and emulated viewports; deployment and physical-device acceptance are separate. No deployment was performed.
