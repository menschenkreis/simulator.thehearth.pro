# Prototype Cleanup Handoff - 2026-07-05

## Plain-English Status

The simulator prototype is now in a much safer handoff shape.

The old single-page prototype still runs from `simulator.html`, but many behaviors that were buried inside that file now live in named adapter files. This means a backend/core developer can replace or reuse pieces without reading one huge script block first.

## Current Shape

| Area | Current Owner |
|---|---|
| Clean lesson/session/progress rules | `core/` |
| Browser bridges and UI controllers | `adapters/` |
| Legacy prototype shell | `simulator.html` |
| Larger legacy content/data files | `assets/js/` and inline legacy data |
| Repeatable safety checks | `tools/` |

## Major Extracted Adapters

| File | What It Owns |
|---|---|
| `adapters/foundation-*` | Foundation launch, map, fallback topic pages, progress bridge, lesson shell, and old action renderers. |
| `adapters/doing-*` | Doing drill config, board filtering, drill views, map views, explorer views, and panel coordination. |
| `adapters/knowing-*` | Knowing shelves, books, topics, study dashboard, study sessions, quiz behavior, and progress. |
| `adapters/practice-*` | Practice state, guidance, dashboard, drill views, session result logic, timer/metronome behavior, and UI helpers. |
| `adapters/play-world-viewer.js` | Play world map and region detail rendering. |
| `adapters/mastery-viewer.js` | Mastery and Masters at Play rendering. |
| `adapters/create-cauldron-*` | Create Cauldron rendering, model/mix logic, and selection UI. |
| `adapters/header-tools-controller.js` | Header search, progress, settings, sound, and particles. |
| `adapters/text-to-speech-controller.js` | Lesson read-aloud behavior. |
| `adapters/references-panel-controller.js` | References popup rendering. |
| `adapters/link-deposit-controller.js` | YouTube link deposit popup and API save flow. |
| `adapters/notebook-controller.js` | Notebook notes, context, and progress summaries. |
| `adapters/dictionary-controller.js` | Dictionary chapter rendering and search filtering. |
| `adapters/recorder-controller.js` | Recorder button/status state. |

## Regression Checks

Run these after any change:

```bash
python3 tools/core_smoke_check.py
python3 tools/core_js_smoke_check.py
python3 tools/prototype_smoke_check.py
```

Current status: all three pass.

These checks do not prove every visual click path works, but they catch missing files, broken script order, missing adapter exports, core route/seed issues, and many behavior regressions in the extracted JavaScript modules.

## What Is Cleaner Now

- The main page is smaller and mostly delegates to named modules.
- Many browser behaviors now have small testable functions.
- The clean core has stayed separate from browser-specific code.
- The handoff surface is more explicit: `core/` is reusable logic, `adapters/` is browser bridge code, and `simulator.html` is the legacy shell.
- Each safe cleanup step was committed as its own checkpoint.

## Known Remaining Work

| Priority | Work |
|---|---|
| High | Do a real browser click-through in a normal local browser: Map, Foundation, Doing, Knowing, Practice, Play, Create, Mastery, Notebook, Dictionary, Search, Settings, References. |
| High | Decide which inline content blocks should move into JSON or content files next. Dictionary terms are still inline content in `simulator.html`. |
| Medium | Continue extracting map/travel flame behavior if the map becomes a development focus. |
| Medium | Continue extracting credits, insights, and small timer utilities if they remain part of the prototype. |
| Medium | Add a browser-level smoke test once the environment can serve the static app locally. |
| Low | Normalize old storage keys where duplicate progress stores still exist. |

## Suggested Next Development Step

Use the cleaned clone as the working prototype branch.

Before adding new mechanics or aesthetics, open the app in a normal browser and do a manual pass through the main flows. If that pass looks good, the next best improvement is to move remaining content data out of `simulator.html`, starting with Dictionary terms.

## Handoff Note For Backend/Core Work

The reusable simulator core should grow from `core/`, not from `simulator.html`.

The existing adapters show the boundary:

- If code validates lesson data, tracks lesson state, evaluates answers, or builds pure progress records, it belongs in `core/`.
- If code touches DOM, localStorage, audio, speech synthesis, fetch, buttons, or visible panels, it belongs in `adapters/` or a future frontend layer.

This keeps the future backend/core portable across different simulators.
