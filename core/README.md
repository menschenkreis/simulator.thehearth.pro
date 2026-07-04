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
| `foundation-adapter.js` | Pure Foundation route lookup helpers. |
| `foundation-route-manifest.json` | Clean Foundation topic-to-lesson seed route list. |
| `action-renderer-manifest.json` | Stable keys for custom interactive lesson renderers. |
| `renderer-registry.js` | Small interface for registering and calling action renderers by key. |
| `lesson-view-model.js` | Converts lesson seeds into frontend-friendly lesson view objects. |
| `lesson-session.js` | Pure lesson navigation and answer evaluation state. |
| `learner-progress.js` | Pure learner progress record helpers for lessons. |

## Checks

- `python3 tools/core_smoke_check.py`
- `python3 tools/core_js_smoke_check.py`

## Current Core Shape

`lesson-core.js` currently exposes:

- `STEP_TYPES`
- `ACTION_RENDERER_KEYS`
- `validateLessonSeed(seed)`
- `lessonSummary(seed)`
- `buildRouteSummary(routeManifest, lessonSeedsById)`

`lesson-view-model.js` currently exposes:

- `buildLessonViewModel(seed, options)`
- `buildTopicLessonViewModel(routeResult, options)`
- `summarizeStep(step, index)`

`lesson-session.js` currently exposes:

- `createLessonSession(seed, options)`
- `getCurrentStep(seed, session)`
- `advanceLesson(seed, session)`
- `goBack(seed, session)`
- `completeLesson(seed, session)`
- `evaluateChoice(seed, session, choiceIndex)`
- `normalizeResponse(response)`

`learner-progress.js` currently exposes:

- `createProgressRecord(options)`
- `normalizeProgressRecord(record, options)`
- `getLessonProgress(record, lessonId)`
- `markLessonStarted(record, lessonId, options)`
- `updateLessonStep(record, lessonId, stepIndex, options)`
- `markLessonCompleted(record, lessonId, options)`
- `recordLessonAnswer(record, lessonId, concept, correct, options)`
- `summarizeProgress(record)`

The core modules work in both:

- browser globals, such as `window.HearthLessonCore`
- CommonJS/Node, such as `require("./lesson-core.js")`

## First Rebuild Rule

Do not move the whole app into this folder at once.

Move one stable contract at a time. Completed first-pass contracts:

1. lesson seed contracts
2. Foundation route manifest
3. action renderer keys
4. renderer registry
5. Foundation route lookup
6. lesson view model shape
7. lesson session state
8. learner progress record
9. browser progress storage adapter
10. TeachingEngine-to-core controller adapter

Likely next contracts:

1. action renderer implementations
2. node routing beyond Foundation

That order keeps the rebuild understandable and easier for Martin to connect to a general simulator backend.
