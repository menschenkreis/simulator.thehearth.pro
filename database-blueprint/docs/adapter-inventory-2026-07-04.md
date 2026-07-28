# Adapter Inventory - 2026-07-04

## Plain-English Purpose

Adapters are bridge code between the clean core and the current browser prototype.

The core should stay pure. The adapters are allowed to know about browser globals, localStorage, existing lesson files, and current page layout.

## Current Adapter Layer

| File | Role |
|---|---|
| `adapters/action-renderer-registry-bootstrap.js` | Creates the shared browser action-renderer registry instance. |
| `adapters/browser-progress-store.js` | Saves and loads clean learner progress records from browser localStorage. |
| `adapters/foundation-action-renderers.js` | Registers existing Foundation action render functions behind stable renderer keys. |
| `adapters/foundation-audio.js` | Shared tone helper for legacy Foundation action renderers. |
| `adapters/foundation-lesson-launcher.js` | Resolves Foundation topics into TeachingEngine lesson objects. |
| `adapters/foundation-lesson-shell.js` | Renders the Foundation TeachingEngine host shell. |
| `adapters/foundation-progress-bridge.js` | Writes old Foundation topic progress and clean learner progress together. |
| `adapters/foundation-route-manifest-runtime.js` | Browser-friendly copy of the clean Foundation route manifest. |
| `adapters/foundation-seed-loader.js` | Loads clean Foundation seed JSON and translates it for the current TeachingEngine. |
| `adapters/foundation-topic-viewer.js` | Renders the legacy Foundation topic tab fallback view. |
| `adapters/foundation-ui-utils.js` | Shared color and HTML escaping helpers for Foundation views. |
| `adapters/teaching-engine-core-adapter.js` | DOM-free lesson controller connecting seeds, session state, view models, and progress. |

## Current Pattern

The prototype still loads old browser globals, but the decision-making is moving into adapters.

Current desired flow:

1. `simulator.html` receives a user click.
2. A focused adapter resolves the lesson, route, shell, progress, or renderer.
3. The clean core handles pure lesson/session/progress rules.
4. The old visual layer remains only where replacement has not happened yet.

## Next Cleanup Targets

1. Move Foundation action renderer implementations out of `assets/js/lesson-1-foundation.js`.
2. Move the main Foundation map rendering out of `simulator.html`.
3. Replace TeachingEngine rendering one step type at a time.
4. Remove old lesson globals once seed/API loading is the default path.
