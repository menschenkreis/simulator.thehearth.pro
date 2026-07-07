# Cleanup Roadmap

This file is the working checklist for cleaning the prototype without losing the original purpose.

Plain English: every change should make the simulator easier to understand, easier to hand off, or harder to accidentally break.

## Original Goals

1. Review the codebase structure and identify the main files and responsibilities.
2. Refactor toward clear modules so the prototype is easier to maintain.
3. Add guardrails so small changes do not cause hidden regressions.

## Current Working Shape

| Area | What It Should Own |
|---|---|
| `core/` | Clean reusable logic: lesson rules, progress records, route contracts, validation. No screen code. |
| `adapters/` | Bridge code: browser storage, buttons, DOM panels, legacy prototype wiring. |
| `assets/js/` | Larger node data, legacy node renderers, and content files still being cleaned. |
| `simulator.html` | Legacy shell. Keep trimming it; avoid adding new long logic here. |
| `tools/` | Repeatable checks that catch broken files, missing exports, and routing problems. |

## Clean Backend Rules

- Keep reusable logic out of the page.
- Keep browser-specific code out of `core/`.
- Prefer small named files over more inline code in `simulator.html`.
- Keep node meanings in one obvious place before making visual changes.
- Remove dead or duplicate UI instead of hiding it with CSS.
- Make small commits so each cleanup step can be understood or undone.
- Run the smoke checks after behavior or structure changes.

## Current Node Meaning Source

Use `NODE_SPEC.md` and `assets/js/map-node-data.js` as the current node meaning source.

Older docs may still describe past versions of the app. Treat `CODEX_HANDOVER.md` as historical context, not the current product truth.

## Checks To Keep Running

```bash
python3 tools/prototype_smoke_check.py
python3 tools/core_smoke_check.py
python3 tools/core_js_smoke_check.py
```

For documentation-only changes, `git diff --check` is enough.

## Current Phase

We are strengthening the main map and header utilities before moving deeper into node internals.

Done recently:

- Cleaned map node art and sizing.
- Simplified node card copy.
- Made node cards more compact.
- Removed unused node path metadata.
- Removed duplicate floating utility buttons.
- Verified the Tools panel and added smoke-check guardrails for its main entries.
- Rewrote `NODE_SPEC.md` as the current plain-language node meaning source.
- Extracted map node meaning data from `simulator.html` into `assets/js/map-node-data.js`.
- Extracted compact map node-card behavior into `assets/js/map-node-info.js`.
- Softened the map controls, top utilities, and utility panels toward a more Apple-comfort UI.
- Cleaned the Save YouTube Link and References panels so their styling is reusable instead of inline.
- Cleaned the Groove panel rendering while keeping the sound-bed behavior unchanged.
- Extracted Hearth body chamber copy and zone meanings into `assets/js/hearth-body-data.js`.
- Softened the Hearth body chamber visuals and simplified its visible zone cards.
- Reframed Hearth body zones as inner-instrument learning chambers instead of navigation shortcuts.
- Started Journey cleanup by extracting the level, concept, and task banks into `assets/js/journey-data.js`.
- Added `database-blueprint/docs/journey-strategy-v1.md` to keep Journey focused on "what should I do next?"
- Polished Journey Level 1 into an authored 8-lesson QJam Level 1 path instead of relying on rotating lesson banks.
- Made Journey use authored lesson data when present, while keeping the fallback lesson generator for later levels.
- Captured Jen's current learning state and updated the next-lesson prep around consolidation, right-hand patterns, note landmarks, and drills returning to music.
- Added a Journey Lesson Companion surface so Jen's next lesson prep appears directly in the Journey UI.
- Reworked the Journey opening screen into a cleaner vertical guitar-neck scene with exactly one fret per level, guide-character speech, and companion prep tucked into a drawer.
- Replaced Journey's block-like level markers with circular glowing inlays and wired in the new talking-guide asset.
- Pushed Journey closer to the saved neck-scene reference: central instrument stage, headstock/body hints, glowing star markers, and guide placed inside the scene.
- Built the first generated guide-character variation set, logged it in `GUIDE_ASSET_CATALOG.md`, and added `assets/js/guide-character-data.js` so screens can choose guide moods from one catalogue.
- Expanded the guide-character catalogue to 11 entries with seated poses and close-up head/bust expressions.
- Generated three clean Journey background options for an image-backed scene with exactly 8 app-controlled clickable markers overlaid later.
- Selected Journey background Option B and wired it into the Journey opening with 8 overlay level hot-spots.

Next good steps:

1. Refresh Journey in the browser, select Jen, and tune the guitar-neck scene against the real lesson flow.
2. Use Level 1 in the browser and tune the lesson wording against real teaching needs.
3. Continue moving reusable rules toward `core/` and browser wiring toward `adapters/` only when new work naturally touches those areas.
