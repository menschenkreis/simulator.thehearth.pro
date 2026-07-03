# Cleanup Branch Handoff Summary - 2026-07-03

## Plain-English Summary

This branch starts turning the simulator prototype from "working but tangled" into "mapped, safer, and easier to hand over."

The app behavior was not intentionally changed.

The work so far is mostly:

- documentation
- inventory
- backend-friendly seed extraction
- lightweight regression checks

## Branch

Current branch:

`cleanup/handoff-architecture`

Commits on this branch:

| Commit | Purpose |
|---|---|
| `b3d636c` | Added codebase cleanup plan and first smoke check. |
| `16c9d27` | Added active code inventory. |
| `1dddeb8` | Extracted Create content seed files. |
| `0a7f196` | Added Foundation lesson inventory. |
| `0436257` | Added TeachingEngine lesson seed schema and first Threshold lesson seed. |
| `df65f66` | Extracted second Foundation lesson seed: Language of Music. |

## What Changed

### Added cleanup and inventory docs

- `database-blueprint/docs/codebase-cleanup-plan-2026-07-03.md`
- `database-blueprint/docs/active-code-inventory-2026-07-03.md`
- `database-blueprint/docs/foundation-lesson-inventory-2026-07-03.md`
- `database-blueprint/docs/teaching-engine-lesson-seed-schema-v1.md`

### Added Create node seed files

These were extracted from the current live prototype JavaScript content.

- `database-blueprint/seeds/create_obstructions_v2.json`
  - 50 records
- `database-blueprint/seeds/create_combos_v2.json`
  - 32 records
- `database-blueprint/seeds/create_cauldron_ingredients_v2.json`
  - 8 records

### Added Foundation lesson seed files

These were extracted as proof-of-format lesson seeds.

- `database-blueprint/seeds/foundation_threshold_lesson_v2.json`
  - 7 steps
  - source: `assets/js/lessons-threshold.js`
- `database-blueprint/seeds/foundation_language_of_music_lesson_v2.json`
  - 10 steps
  - source: `assets/js/lessons-language-of-music.js`

### Added/expanded smoke check

- `tools/prototype_smoke_check.py`

The smoke check now verifies:

- key app files exist
- key browser globals/exports are still present
- Create content banks still look intact
- extracted Create seed files are valid JSON and have expected counts
- extracted Foundation lesson seeds are valid JSON and have expected lesson IDs/step counts
- Foundation lesson files still expose expected lesson globals

Current passing result:

```text
Prototype smoke check passed.
Checked 19 key files, 2 content banks, 3 seed files, and 2 lesson seeds.
```

## What Did Not Change

The following were not intentionally changed:

- `simulator.html`
- current app runtime behavior
- current JavaScript exports
- current localStorage behavior
- current API behavior
- `scene-first.js`
- Journey behavior
- Foundation lesson runtime behavior

The seed files are copies/extractions for handoff and backend migration planning. The app is not yet reading from them.

## Important Findings

### `simulator.html` is the largest risk

It is the main app shell and is over 6000 lines.

Cleanup advice:

Do not refactor it first.

### `scene-first.js` is the main override risk

It loads late and defines active renderers for several node screens. That means it can quietly override behavior defined earlier.

Cleanup advice:

Document it before changing it. Eventually replace the override pattern with one clear router/renderer.

### `journey.js` is important but tangled

It mixes:

- lesson generation
- content banks
- student state
- localStorage
- API sync attempts
- UI rendering

Cleanup advice:

Do not split it until more checks exist.

### Foundation lessons are promising migration candidates

Most smaller `lessons-*.js` files are mostly TeachingEngine data.

The exception is:

- `assets/js/lesson-1-foundation.js`

That file contains custom action renderers and should not be flattened into JSON without renderer keys.

## Recommended Next Options

### Option A - Continue Foundation extraction

Extract more small `lessons-*.js` files into `v2` lesson seeds using the new schema.

Good candidates:

- `assets/js/lessons-learning-a-language.js`
- `assets/js/lessons-language-of-guitar.js`
- `assets/js/lessons-the-guitar.js`

Avoid for now:

- `assets/js/lesson-1-foundation.js`

### Option B - Create a localStorage/API inventory

Make a handoff doc listing:

- localStorage keys
- what each stores
- whether it is content, student memory, UI state, or cache
- API endpoints used by the prototype

This would help Martin design the backend migration safely.

### Option C - Inspect `scene-first.js` in detail

Create a document showing:

- which functions it overrides
- which node screens it currently owns
- what source files it conflicts with
- what a cleaner router could replace it with

This would prepare for the most important frontend architecture cleanup.

## Suggested Next Step

Choose Option B next.

Reason:

Before changing fragile frontend routing, it would help Martin to know exactly what the browser is currently saving locally and what the API is already trying to read/write.
