# Clarigo portfolio motion and hero continuation

The existing platform was continued in place. All 47 projects, project narratives, renamed brands, asset selections, routes, metadata, and existing functions are preserved. The user subsequently requested removal of the circular card overlay and hero wireframe sphere, fully visible card artwork, and a restrained cinematic hero using the existing layout.

## Motion design

The live [Clarigo site](https://clarigoinfotech.com/) was inspected in Chrome on desktop and mobile. Its downloaded public styles/scripts, computed typography, timing observations, and screenshots are retained in `reference/`. The reference uses masked word lifts around 0.8 seconds with roughly 0.07-second stagger, a `.22,1,.36,1` easing curve, subtle section entrances, and restrained background depth. Those qualities inform the existing platform without importing its layout or scroll-smoothing system.

- Existing headings keep their real text, Geist typography, colors, wrapping, and geometry. Masked word reveals use the reference timing and a small initial rotation, then settle completely.
- Subtitle, individual CTA buttons, and statistics enter in order. The three numbers count to the existing 19, 28, and 20+ values. Their measured final widths are reserved during counting so adjacent content does not move. All numbers are final in server-rendered HTML and under reduced motion.
- The right-hand hero space contains three soft rose/lavender/light gradient layers and seven small particles. GSAP animates transforms and opacity; blur and gradients remain static textures. Mouse depth is bounded to 14px horizontally, 10px vertically, and 2–2.5 degrees of rotation. A separate wrapper gives the artwork 36px of scroll depth. Text and buttons never follow the pointer.
- Ambient motion pauses when the hero leaves the viewport, the document is hidden, or the window loses focus. Touch devices receive no mouse-follow interaction; phones omit the extra artwork and retain the original background.
- ScrollTrigger reveals reading content, project cards, features, product journeys, and screenshot figures once. A few desktop device frames receive 18px total scroll depth. Completed reveals release temporary transforms and layer-promotion hints. Native scrolling, anchor links, browser history, and keyboard access remain intact.
- Framer Motion supplies the existing bounded card lift and screenshot-viewer transitions. Card artwork has no tilt or zoom: it remains centered, uncropped, unstretched, and fully contained. The circular arrow overlay and the wireframe sphere are absent. Card links and other existing navigation remain intact.
- Reduced-motion preferences work at initial load and when changed live: entrances, counters, parallax, ambient loops, pointer depth, progress animation, and document transitions become static. Focused controls and fresh deep links remain immediately usable. No-JavaScript content remains accessible.

## Preservation and verification

`hero-layout-before.json` and `hero-layout-after.json` compare 14 hero elements at 1440, 1195 (the supplied reference width), 768, and 390px. **No differences** were found in element position, dimensions, typography, color, spacing, or text. See `hero-layout-verification.json`.

`preservation.json` confirms the eight `lib/` files, dependency manifests, and Next configuration match `source-before.zip`, and all **316 selected artwork hashes** match the unchanged asset manifest. There remain **19 web and 28 mobile projects**. The separate `hero-before.zip` preserves the exact implementation before the latest hero additions. Original source and artwork checkpoints from earlier stages remain intact.

The optimized production build passed, including prerendered HTML, RSC, and route-cache checks for every project. **All 192 browser checks passed with no retries, failures, or skipped checks** across desktop, tablet, and emulated mobile. Detailed results are recorded in `browser-tests.json`; visual captures are in `preview/`. The suite checks every project, actual intermediate animation states, card image fit, screenshot dialogs, reduced motion, redirects, metadata, and native navigation. Hero-specific checks also verify counters, pointer bounds, offscreen pause/resume, and live preference changes.

`performance.json` records six sequential 3.2-second local Chrome scroll samples. Median frames were 16.7ms (about 59.9 FPS); 95th-percentile frames were 16.8–16.9ms. There were no long tasks, page errors, or horizontal overflow in those samples. Its immediate reduced-motion animation counts include compositor transitions sampled at the preference change; the dedicated browser checks separately verify the settled static state. Final desktop hero, phone hero, card artwork, and representative detail-page captures were visually reviewed.

Frame measurements describe sequential local headless Chrome runs on this machine; they cannot guarantee a frame rate on other hardware. No live deployment or physical-device Safari/Android acceptance is implied. Production preview: http://localhost:3100.

## Continue safely

Hero artwork lives in `components/HeroAmbient.tsx`; shared timing, counters, and scroll behavior live in `components/ScrollMotion.tsx` and `app/motion.css`. Keep `PortfolioLink` as native document navigation to preserve the complete metadata behavior verified in this framework stack. Keep stable gallery/device aspect ratios and the existing initial-fragment recovery. Do not reintroduce card zoom/cropping, the removed circular overlay, or the wireframe sphere.
