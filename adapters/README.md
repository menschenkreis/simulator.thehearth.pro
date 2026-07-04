# Hearth Simulator Adapters

Adapters are bridge code.

The clean core stays pure. It should not know about browser storage, page buttons, DOM rendering, audio, or backend APIs.

Adapters are allowed to connect the clean core to those outside systems.

## Current Adapters

| File | Role |
|---|---|
| `action-renderer-registry-bootstrap.js` | Creates the shared browser action-renderer registry instance. |
| `browser-progress-store.js` | Saves and loads clean learner progress records from browser localStorage. |
| `doing-config.js` | Holds Doing drill levels, filters, map zones, state labels, and plain coaching copy. |
| `foundation-action-renderers.js` | Registers existing Foundation action render functions behind stable renderer keys. |
| `foundation-audio.js` | Shared tone helper for legacy Foundation action renderers. |
| `foundation-lesson-launcher.js` | Resolves Foundation topics into TeachingEngine lesson objects. |
| `foundation-lesson-shell.js` | Renders the Foundation TeachingEngine host shell. |
| `foundation-map-viewer.js` | Renders the Foundation neck-path map screen. |
| `foundation-panel-controller.js` | Opens the Foundation panel and starts the next Foundation topic. |
| `foundation-progress-bridge.js` | Writes old Foundation topic progress and clean learner progress together. |
| `foundation-route-manifest-runtime.js` | Browser-friendly copy of the clean Foundation route manifest. |
| `foundation-seed-loader.js` | Loads clean Foundation seed JSON and translates it for the current TeachingEngine. |
| `foundation-topic-controller.js` | Opens Foundation topics, launches lessons, renders fallback topic pages, and completes progress. |
| `foundation-topic-viewer.js` | Renders the legacy Foundation topic tab fallback view. |
| `foundation-ui-utils.js` | Shared color and HTML escaping helpers for Foundation views. |
| `rainbow-blocks-viewer.js` | Keeps the old reusable rainbow block renderer outside the large page. |
| `teaching-engine-core-adapter.js` | DOM-free lesson controller that connects seeds, session rules, view models, and progress. |

## Rule

If code talks to the browser, the backend, or the screen, it belongs here or in a frontend layer, not in `core/`.
