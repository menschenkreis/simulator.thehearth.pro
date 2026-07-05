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
| `doing-controls-controller.js` | Binds general Doing view buttons, tabs, filters, and search. |
| `doing-drill-board-model.js` | Filters Doing drills and calculates board counts, summaries, and next drill. |
| `doing-drill-adjust-controller.js` | Binds Doing easier/harder drill adjustment buttons. |
| `doing-drill-preview-controller.js` | Binds Doing drill-dot click and hover preview behavior. |
| `doing-drill-detail-viewer.js` | Renders the Doing single-drill detail card. |
| `doing-drill-board-viewer.js` | Renders the Doing level/string drill board. |
| `doing-shell-viewer.js` | Renders the outer Doing shell and progress header. |
| `doing-entry-viewer.js` | Renders the Doing entry panel and recommended next drill. |
| `doing-explorer-controller.js` | Binds the Doing explorer note-locator behavior. |
| `doing-explorer-viewer.js` | Renders the Doing fretboard explorer tabs and panels. |
| `doing-map-controller.js` | Binds Doing map zone, debug, and back-to-map handlers. |
| `doing-map-viewer.js` | Renders the Doing guitar-body training map. |
| `doing-panel-controller.js` | Opens and coordinates the Doing panel using the smaller Doing adapters. |
| `doing-ui-utils.js` | Shared text and display helpers for the legacy Doing view. |
| `knowing-level-model.js` | Groups Knowing topics into the 8-level bookshelf roadmap. |
| `knowing-shelf-viewer.js` | Renders the Knowing bookshelf screen. |
| `knowing-shelf-controller.js` | Binds Knowing shelf carousel browser behavior. |
| `knowing-book-viewer.js` | Renders the opened Knowing book category screen. |
| `knowing-topic-viewer.js` | Renders the Knowing encyclopedia topic screen. |
| `knowing-progress-controller.js` | Updates legacy Knowing topic completion progress. |
| `knowing-panel-controller.js` | Opens and coordinates the Knowing shelf, book, and topic screens. |
| `knowing-study-model.js` | Calculates Study dashboard progress and next topic. |
| `knowing-study-dashboard-viewer.js` | Renders the Study Lab dashboard screen. |
| `knowing-study-question-model.js` | Builds Study Session questions from Knowing topic content. |
| `knowing-study-session-model.js` | Resolves Study Session topic context, color, and previous/next topics. |
| `knowing-study-session-viewer.js` | Renders the guided Study Session screen. |
| `knowing-study-quiz-controller.js` | Handles guided Study Session quiz answer interactions. |
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
| `practice-state.js` | Wraps legacy Practice localStorage state, log, preferences, and drill selection. |
| `practice-guide-model.js` | Chooses contextual Practice Temple guidance from preferences and session history. |
| `practice-dashboard-viewer.js` | Renders the Practice Temple dashboard screen. |
| `practice-drill-viewer.js` | Renders the Practice drill detail screen. |
| `practice-session-model.js` | Decides Practice drill completion outcomes and next drill. |
| `practice-session-viewer.js` | Renders the timed Practice candle session screen. |
| `rainbow-blocks-viewer.js` | Keeps the old reusable rainbow block renderer outside the large page. |
| `teaching-engine-core-adapter.js` | DOM-free lesson controller that connects seeds, session rules, view models, and progress. |

## Rule

If code talks to the browser, the backend, or the screen, it belongs here or in a frontend layer, not in `core/`.
