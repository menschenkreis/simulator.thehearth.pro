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
| `adapters/browser-progress-store.js` | Replaceable localStorage adapter for clean learner progress records. |
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

It does not replace `TeachingEngine`.

It does not change `simulator.html`.

It does not change current runtime behavior.

## Next Core Steps

Recommended order:

1. Add a renderer-key manifest for custom action steps.
2. Add a tiny renderer registry interface.
3. Build a clean Foundation route adapter that reads `foundation-route-manifest.json`.
4. Only then connect the prototype UI to the clean core.

## Safety Checks

Run both:

```bash
python3 tools/core_smoke_check.py
python3 tools/prototype_smoke_check.py
```

The core check validates the rebuild work.

The prototype check validates that the old simulator handoff still has its expected files, seeds, and routes.
