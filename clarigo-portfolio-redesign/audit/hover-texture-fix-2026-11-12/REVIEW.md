# Thumbnail hover texture fix — 2026-11-12

Fixed the solid-color hover overlay in the shared Three.js card renderer. Listing cards, related-project cards, and detail artwork retain their existing hover behavior and layouts.

Reproduction:

- The StreamDexa thumbnail was complete and visible before hover, but disappeared when the WebGL layer took over.
- The responsive DOM image reported density-adjusted natural dimensions of 475 x 393 for its selected 720px source.
- Chrome reported GL_INVALID_VALUE: glTexSubImage2DRobustANGLE: Offset overflows texture dimensions.
- The prior tests checked that hover activated; they did not compare the resulting image pixels. The before screenshots and diagnostics reproduce the user's reported gray backing color.

Change:

- Load the selected currentSrc through TextureLoader as an independent image. Its texture allocation now uses the decoded image's actual pixel dimensions.
- Initialize the texture before handing off from the native image to WebGL. While loading or after a request failure, the normal thumbnail remains visible.
- Deduplicate pending requests, retain the bounded three-texture cache, and avoid disposing the texture currently assigned to the material.
- Late load completions cannot activate disconnected cards or cards the pointer has left. Existing reduced-motion, viewport, and cleanup guards remain effective.
- No thumbnail artwork, logos, typography, layouts, or CSS hover styling was changed.

Verification:

- Production build passed, including HTML/RSC/cache output for all 44 detail routes.
- TypeScript passed after adding the regression checks.
- Four new browser tests passed. Two compare actual before/hover image pixels for all 44 thumbnails plus three related cards at device densities 1x and 2x: 94 comparisons, zero GPU upload errors.
- The other two checks cover delayed loading with pointer leave and an aborted optional WebGL image request; both retain the native image.
- Twenty-four existing checks passed at desktop, tablet, and mobile sizes, covering card hover bounds, image loading and fitting, filtering, navigation, image fallback, unavailable WebGL, and reduced motion.
- Updated the existing responsive-thumbnail fallback test to target the current thumbnail manifest.

Evidence:

- before-diagnostics.json, before-hover.png, broken-hover.png
- fixed-hover-1x.png, fixed-hover-2x.png
- pixel-checks-1x.json, pixel-checks-2x.json
- pixel-browser-tests.json, regression-browser-tests.json

Preview: http://localhost:3100/#portfolio . No public deployment performed.

