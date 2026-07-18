# Node Renderer Ownership

Plain English: when the map opens a node, one file should be responsible for the screen you actually see.

The old prototype sometimes defines the same screen in more than one place. In the browser, the file loaded last wins. That can make work feel confusing because a change in an older file may not appear on screen.

## Current Active Owners

| Node Screen | Active Owner | Notes |
|---|---|---|
| Hearth | `adapters/hearth-body-viewer.js` | Uses `assets/js/hearth-body-data.js` for the Inner Instrument copy and zones. |
| Play | `adapters/play-atlas-viewer.js` | Uses the world atlas scene and delegates region detail to `assets/js/play-world.js`. |
| Study | `adapters/study-key-chamber-viewer.js` | Uses the Key Chamber scene. |
| Create | `adapters/create-cauldron-scene-viewer.js` | Uses the active Cauldron scene and song-seed workstation. |
| Practice | `adapters/practice-entry-controller.js` | Uses the image-led Practice chamber. Planned sessions flow through `practice-planned-session-controller.js`, with the candle timer still owned by `practice-candle-viewer.js`. |
| Mastery | `adapters/mastery-phoenix-viewer.js` | Uses the Phoenix scene. |
| Journey | `assets/js/journey.js` | Old button names are kept in `adapters/journey-legacy-handlers.js`. |
| Foundation | `adapters/foundation-panel-controller.js` | Old button names are kept in `adapters/node-legacy-handlers.js`. |
| Doing | `adapters/doing-panel-controller.js` | Uses `doing-drill-catalog.js` for reviewed data, `doing-room-viewer.js` for hand rooms, and `doing-teaching-viewer.js` for the final drill scene. Old button names are kept in `adapters/node-legacy-handlers.js`. |
| Knowing | `adapters/knowing-panel-controller.js` | Old button names are kept in `adapters/node-legacy-handlers.js`. |

## Rule Going Forward

Do not add new node screen logic to `simulator.html`.

When improving a node, first check this file. Edit the active owner or move ownership deliberately in a small step.

Older renderer files may stay in the repo as historical reference, but they should not be loaded if they define the same active `showX` function.

## Check

Run:

```bash
python3 tools/renderer_ownership_check.py
```

This catches accidental script-order changes where an old renderer silently becomes active again.
