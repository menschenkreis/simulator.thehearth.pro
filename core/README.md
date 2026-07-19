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
| `learner-migration-preview.js` | Read-only inventory and per-profile preview for legacy learner/progress storage. |
| `progress-event.js` | Pure canonical progress-event normalization, validation, duplicate comparison, Journey-stage mapping, and read-time legacy projection. |
| `journey-progress.js` | Pure learner-scoped capability evidence summary for Journey levels. |
| `play-domain.js` | Pure Play destination, cultural context, route, activity, result, and recommendation contracts. |
| `contracts/progress-event-envelope-v1.schema.json` | Approved append-only shared evidence envelope. |
| `contracts/handoff-envelope-v1.schema.json` | Approved learner-safe cross-node task and return envelope. |
| `contracts/evidence-stage-compatibility-v1.json` | Explicit shared-event to Journey evidence-stage mapping. |

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

`learner-migration-preview.js` currently exposes:

- `inventory()`
- `preview(storage, options)`

The preview only reads a Storage-compatible object. It has no apply, write, or
delete API and never includes raw stored values in its report.

`progress-event.js` currently exposes:

- canonical-candidate detection for the transitional store bridge
- strict normalization and validation for the approved event envelope
- `level-1` to `L1` and canonical-to-Journey evidence-stage mapping
- stable normalized-payload comparison for duplicate protection
- labelled, read-time-only projection of raw legacy records

The matching `adapters/progress-event-store.js` keeps raw reads available,
offers normalized read wrappers, and never rewrites history during startup or
reading. Canonical appends require an explicit learner ID. Only the deliberately
named legacy compatibility path retains the old active-Journey learner fallback.

`play-domain.js` currently exposes:

- normalized destination and hotspot coordinate helpers
- sourced cultural-context and claim-status validation
- learner-specific route marker selection
- Play activity and result normalization
- shared progress-event conversion
- Practice recommendation creation

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
11. Play destination, culture, route, activity, and result contracts

Likely next contracts:

1. action renderer implementations
2. node routing beyond Foundation

That order keeps the rebuild understandable and easier for Martin to connect to a general simulator backend.
