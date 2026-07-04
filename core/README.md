# Hearth Simulator Core

## Purpose

This folder is the beginning of the clean simulator core.

The old prototype can keep running while this core becomes the stable place for reusable logic, data contracts, and route manifests.

Plain English:

The prototype is the messy workshop. This folder is the new engine bench.

## What Belongs Here

- lesson data validation
- lesson summaries
- route manifests
- reusable simulator contracts
- renderer keys and renderer configuration shapes
- code that can apply to other simulators later

## What Does Not Belong Here

- DOM rendering
- CSS styling
- click handlers tied to one page
- Web Audio playback
- localStorage writes
- API calls
- the current `scene-first.js` override pattern

Those pieces can use the core, but they should not live inside the core.

## Files

| File | Role |
|---|---|
| `lesson-core.js` | Pure lesson seed validation and lesson summary helpers. |
| `foundation-route-manifest.json` | Clean Foundation topic-to-lesson seed route list. |
| `action-renderer-manifest.json` | Stable keys for custom interactive lesson renderers. |

## Current Core Shape

`lesson-core.js` currently exposes:

- `STEP_TYPES`
- `ACTION_RENDERER_KEYS`
- `validateLessonSeed(seed)`
- `lessonSummary(seed)`
- `buildRouteSummary(routeManifest, lessonSeedsById)`

The module works in both:

- browser globals: `window.HearthLessonCore`
- CommonJS/Node: `require("./lesson-core.js")`

## First Rebuild Rule

Do not move the whole app into this folder at once.

Move one stable contract at a time:

1. lesson seed contracts
2. Foundation route manifest
3. action renderer keys
4. renderer registry
5. node routing

That order keeps the rebuild understandable and easier for Martin to connect to a general simulator backend.
