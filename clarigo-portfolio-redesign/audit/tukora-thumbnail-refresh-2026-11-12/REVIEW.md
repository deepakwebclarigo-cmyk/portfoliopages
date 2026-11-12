# Tukora Connect thumbnail redesign — 2026-11-12

Updated the Web and Mobile Tukora Connect card thumbnails. The shared 1600 x 1325 frame, cream/blush background, Geist typography, title position, type pill, and Clarigo footer remain consistent with the rest of the portfolio.

The inner composition now gives the unchanged Tukora Connect logo a prominent position alongside genuine project screens. The Web thumbnail uses team/workspace and messaging tablet views; Mobile uses chat and video-call phone views. A soft blue/green stage follows the existing Tukora identity. Device images remain fully visible and proportionate; no product screens, client outcomes, or new logos were invented.

Sources:
- public/images/brand/projects/tukora-connect-horizontal.png, unchanged
- Web: existing project gallery images 7 and 4
- Mobile: existing project gallery images 3 and 5

Integration:
- Updated only tukora-connect and app-tukora-connect in lib/project-thumbnails.json.
- Other 42 thumbnail mappings, the project inventory, and the detail-artwork manifest are unchanged.
- Updated current individual PNG exports and the authoring records.
- The shared renderer delegates these two brand-showcase layouts to the scoped recipe. Regeneration was verified before the final spacing refinement; the finalized build includes the complete updated records.
- The previous 44-PNG ZIP remains an earlier delivered snapshot.

Validation:
- Production build passed and verified all 44 prerendered detail routes.
- TypeScript passed.
- All 132 responsive thumbnail WebPs and 44 current PNG exports passed integrity checks.
- 21 browser checks passed at desktop, tablet, and mobile sizes, including both Tukora detail routes, all listing cards, image fit/loading, filtering, galleries, naming, metadata, and bounded Three.js hover.
- Four additional image-content hover checks passed: both new thumbnails at 1x and 2x density, with no GPU upload errors.
- Both mobile card previews were checked without horizontal overflow.
- Logo checksum matched the unchanged source file.

Downloads:
- exports/Tukora-Connect-Thumbnails/Tukora-Connect-Web.png
- exports/Tukora-Connect-Thumbnails/Tukora-Connect-Mobile.png

Preview: http://localhost:3100/#portfolio . No public deployment performed.

