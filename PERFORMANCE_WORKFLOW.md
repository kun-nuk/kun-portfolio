# KUN Portfolio Performance Workflow

This project now uses a staged preview and publishing workflow to reduce edit time,
generation cost, and browser load during visual iteration.

## Default Edit Loop

- Use local Vite preview for day-to-day changes.
- Do not run a production build for every visual tweak.
- Do not deploy to Sites unless the user explicitly asks for `发布`, `部署`, or `Sites`.
- Preferred preview URL while the dev server is running:
  `http://localhost:5173/`

## Persistent Local Version

For a version that still opens after the dev server is closed, export/update:

`/Users/duorong/Documents/P website/dist/kun-portfolio-local.html`

Open it directly:

`file:///Users/duorong/Documents/P%20website/dist/kun-portfolio-local.html`

This file-based preview does not depend on `localhost`, so it should continue to
work the next day as long as the local assets in `dist` remain in place.

## Sites Publishing

Sites deployment is a separate checkpoint step.

Only publish after the user explicitly requests external access or deployment.
Small local visual edits should stop after local validation unless publishing is
requested.

## Runtime Performance Rules

- Homepage project cards should use compressed thumbnail images.
- Case detail pages can use higher-resolution images, but they should be loaded
  only after the user opens the relevant project route.
- Large images should use `loading="lazy"` and `decoding="async"` unless they are
  the first visible hero asset.
- Lightboxes should load full-size originals only after the image is opened.
- Pointer-driven effects should be throttled with `requestAnimationFrame`.
- Motion-heavy effects should be reduced for mobile and `prefers-reduced-motion`.
- Avoid keeping hidden high-resolution images mounted off-screen.

## Checkpoints

During visual iteration:

1. Start or reuse the Vite dev server.
2. Preview at `http://localhost:5173/`.
3. Make scoped code/CSS/image changes.
4. Avoid production build and Sites deploy.

Before a durable local handoff:

1. Run a production build.
2. Regenerate `dist/kun-portfolio-local.html`.
3. Confirm the file URL opens without the dev server.

Before external sharing:

1. Run a production build.
2. Check the local static HTML.
3. Deploy to Sites only after explicit approval.

