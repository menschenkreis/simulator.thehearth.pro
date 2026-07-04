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
| `adapters/foundation-action-renderers.js` | Registers existing Foundation action render functions behind stable renderer keys. |
| `adapters/foundation-lesson-launcher.js` | Resolves Foundation topics into TeachingEngine lesson objects. |
| `adapters/foundation-route-manifest-runtime.js` | Browser-friendly copy of the clean Foundation route manifest. |
| `adapters/foundation-seed-loader.js` | Loads clean Foundation seed JSON and translates it for the current TeachingEngine. |
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
