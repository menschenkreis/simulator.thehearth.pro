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

Next good steps:

1. Pause cleanup and return to building/refining the prototype experience.
2. Continue moving reusable rules toward `core/` and browser wiring toward `adapters/` only when new work naturally touches those areas.
