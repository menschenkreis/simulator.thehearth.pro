# Hearth Simulator Adapters

Adapters are bridge code.

The clean core stays pure. It should not know about browser storage, page buttons, DOM rendering, audio, or backend APIs.

Adapters are allowed to connect the clean core to those outside systems.

## Current Adapters

| File | Role |
|---|---|
| `action-renderer-registry-bootstrap.js` | Creates the shared browser action-renderer registry instance. |
| `browser-progress-store.js` | Saves and loads clean learner progress records from browser localStorage. |
| `foundation-action-renderers.js` | Registers existing Foundation action render functions behind stable renderer keys. |
| `foundation-lesson-launcher.js` | Resolves Foundation topics into TeachingEngine lesson objects. |
| `foundation-route-manifest-runtime.js` | Browser-friendly copy of the clean Foundation route manifest. |
| `foundation-seed-loader.js` | Loads clean Foundation seed JSON and translates it for the current TeachingEngine. |
| `teaching-engine-core-adapter.js` | DOM-free lesson controller that connects seeds, session rules, view models, and progress. |

## Rule

If code talks to the browser, the backend, or the screen, it belongs here or in a frontend layer, not in `core/`.
