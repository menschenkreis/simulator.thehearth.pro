# Core Rebuild Start - 2026-07-04

## Plain-English Purpose

This starts the clean simulator core beside the old prototype.

The goal is not to patch the messy prototype forever. The goal is to build a reusable core that can support the guitar simulator first, then other simulators later.

## What Was Added

| File | Role |
|---|---|
| `core/README.md` | Explains what belongs in the clean core and what stays outside it. |
| `core/lesson-core.js` | Pure lesson seed validation and summary helpers. |
| `core/foundation-adapter.js` | Pure helpers for looking up which lesson belongs to a Foundation topic. |
| `core/foundation-route-manifest.json` | Clean Foundation topic-to-lesson seed route list. |
| `core/action-renderer-manifest.json` | Stable renderer-key contract for custom action lesson steps. |
| `core/renderer-registry.js` | Small interface for registering and calling action renderers by key. |
| `core/lesson-view-model.js` | Converts lesson seeds into frontend-friendly lesson view objects. |
| `core/lesson-session.js` | Pure lesson navigation and answer evaluation state. |
| `core/learner-progress.js` | Pure learner progress record helpers for lessons. |
| `adapters/action-renderer-registry-bootstrap.js` | Creates the shared browser action-renderer registry instance. |
| `adapters/browser-progress-store.js` | Replaceable localStorage adapter for clean learner progress records. |
| `adapters/doing-config.js` | Holds Doing drill levels, filters, map zones, state labels, and plain coaching copy. |
| `adapters/doing-drill-board-model.js` | Filters Doing drills and calculates board counts, summaries, and next drill. |
| `adapters/doing-drill-board-viewer.js` | Renders the Doing level/string drill board. |
| `adapters/doing-entry-viewer.js` | Renders the Doing entry panel and recommended next drill. |
| `adapters/doing-map-viewer.js` | Renders the Doing guitar-body training map. |
| `adapters/doing-ui-utils.js` | Shared text and display helpers for the legacy Doing view. |
| `adapters/foundation-action-renderers.js` | Registers existing Foundation action render functions behind stable renderer keys. |
| `adapters/foundation-audio.js` | Shared tone helper for legacy Foundation action renderers. |
| `adapters/foundation-lesson-launcher.js` | Resolves Foundation topics into TeachingEngine lesson objects. |
| `adapters/foundation-lesson-shell.js` | Renders the Foundation TeachingEngine host shell. |
| `adapters/foundation-map-viewer.js` | Renders the Foundation neck-path map screen. |
| `adapters/foundation-panel-controller.js` | Opens the Foundation panel and starts the next Foundation topic. |
| `adapters/foundation-progress-bridge.js` | Writes old Foundation topic progress and clean learner progress together. |
| `adapters/foundation-route-manifest-runtime.js` | Browser-friendly copy of the clean Foundation route manifest. |
| `adapters/foundation-seed-loader.js` | Loads clean Foundation seed JSON and translates it for the current TeachingEngine. |
| `adapters/foundation-topic-controller.js` | Opens Foundation topics, launches lessons, renders fallback topic pages, and completes progress. |
| `adapters/foundation-topic-viewer.js` | Renders the legacy Foundation topic tab fallback view. |
| `adapters/foundation-ui-utils.js` | Shared color and HTML escaping helpers for Foundation views. |
| `adapters/rainbow-blocks-viewer.js` | Keeps the old reusable rainbow block renderer outside the large page. |
| `adapters/teaching-engine-core-adapter.js` | DOM-free lesson controller connecting seeds, session state, view models, and progress. |
| `tools/core_smoke_check.py` | Validates the new core files, route manifest, and linked lesson seed files. |
| `tools/core_js_smoke_check.py` | Loads the clean JavaScript core and checks basic lesson behavior. |
| `tools/core_seed_loader.py` | Shared loader for core manifests and lesson seeds. |
| `tools/print_foundation_core_summary.py` | Prints the clean Foundation topic-to-lesson route summary. |
| `tools/print_lesson_view_models.py` | Prints lesson view-model summaries from clean seeds. |

## Why This Is Safer Than Refactoring The Prototype First

The current prototype mixes:

- content
- rendering
- navigation
- localStorage
- audio
- app state
- one-off overrides

The clean core begins with only stable contracts:

- lesson seed shape
- route manifest shape
- validation helpers

That means the old simulator can keep running while the new core gets stronger.

## What The Core Does Not Do Yet

It does not render screens.

It does not fully replace `TeachingEngine`.

It does not control the visible lesson UI yet.

It now runs beside the current lesson UI in shadow mode.

## Current Prototype Bridge

`simulator.html` loads the clean lesson/session/progress modules before `assets/js/teaching-engine.js`.

`assets/js/teaching-engine.js` still renders the visible lesson experience, but it creates a clean `HearthTeachingEngineCoreAdapter` controller in shadow mode. That controller follows step movement, answers, completion, and progress storage while the old UI remains in place.

The same engine can now ask an optional action renderer registry for `renderer_key` / `renderer_config` action steps. Existing inline action render functions still work as the fallback path.

Existing `LESSON_1_FOUNDATION` custom action render functions are now registered behind the stable Foundation renderer keys as legacy wrappers.

Foundation topic launching now asks `HearthFoundationAdapter` and `HearthFoundationRouteManifest` which clean lesson ID belongs to a topic. The old runtime lesson globals remain the lesson source until the browser can load seed files/API data directly.

Foundation lesson launching now tries to load clean seed JSON through `HearthFoundationSeedLoader`. If that load fails, the old `window.LESSON_*` globals remain the fallback path.

The launch decision itself now lives in `HearthFoundationLessonLauncher`, not inside the large `simulator.html` page.

The Foundation lesson host shell, panel opening flow, neck-path map screen, reusable rainbow block renderer, tone helper, progress completion bridge, and simple UI helpers now live in focused adapters instead of being owned directly by the large page or old lesson file.

The legacy Foundation topic tab view and topic launch/completion flow are also now adapter-owned, leaving `simulator.html` with only small wrapper functions for that fallback path.

The Doing cleanup has begun with stable drill config, board filtering logic, UI helpers, and the guitar-body map renderer moved into adapters, so the large Doing screen can be split apart without changing its behavior first.

## Next Core Steps

Recommended order:

1. Move Foundation action renderer implementations out of the old lesson file.
2. Make seed/API loading the default path in deployed environments.
3. Replace TeachingEngine rendering one step type at a time.
4. Keep old UI behavior available until each replacement is checked.

## Safety Checks

Run both:

```bash
python3 tools/core_smoke_check.py
python3 tools/core_js_smoke_check.py
python3 tools/prototype_smoke_check.py
```

The core check validates the rebuild work.

The JavaScript check validates clean-core behavior.

The prototype check validates that the old simulator handoff still has its expected files, seeds, and routes.
