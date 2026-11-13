# Fluid thumbnail motion verification

The shared Three.js thumbnail interaction now uses critically damped motion, overlapping image handoff, bounded simultaneous exits, and shader preparation before native artwork is hidden. Card borders, shadows, arrow colors, and press feedback use coordinated easing.

Production build and TypeScript passed. Postbuild validated all 48 project routes. 12 desktop and 10 tablet/mobile browser checks passed in sequential runs. The final hash-readiness build also passed 20 motion regressions, with four non-desktop mouse-only checks intentionally skipped. This includes rapid retargeting, continuous 3D pose, intermediate handoff frames, idle cleanup, delayed/failed texture requests, focus and navigation, image fitting, filtering, and reduced motion.

All 48 main thumbnails plus related cards were checked at both standard and high pixel density. No GPU errors were reported. Source checks confirm project artwork, themes, thumbnail files and hero startup are unchanged. A small case-study hash-readiness fix reveals deep-linked gallery sections after fonts and triggers initialize; all animation timing is preserved. Thumbnail image checks were completed before this case-only change; the final motion suite covers that change separately.

Motion sampling: the original native-image handoff jumped by 1.00 in one frame and had no intermediate opacity frames. The final sampled run had 25 intermediate frames and a largest native-opacity step of 0.283. These measurements verify interpolation; they do not certify 60 FPS on every device.

The initial parallel GPU run encountered resource/timing failures, so final acceptance runs one worker. The idle check explicitly moves the hero offscreen before asserting the shared renderer is paused. Native-image opacity is not used as a proxy for 3D pose, because the native image is intentionally present beneath the GPU plane during handoff.

Local preview: http://127.0.0.1:3100/#portfolio. No live deployment was performed.
