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
| `04be5e5` | Extracted scene-first reference seed files. |
| `dcfa0fd` | Extracted third Foundation lesson seed: Learning a Language. |
| `84522cd` | Extracted fourth Foundation lesson seed: Language of Guitar. |
| `e3967ca` | Extracted fifth Foundation lesson seed: The Guitar. |
| `84fc8fd` | Extracted sixth Foundation lesson seed: Speaking with the Guitar. |
| `f95fe17` | Extracted seventh Foundation lesson seed: Guitar Conversations. |
| `a80f72c` | Extracted eighth Foundation lesson seed: How to Learn. |
| `abf72d0` | Extracted ninth Foundation lesson seed: Rhythm & Pulse. |
| `6f62a43` | Extracted tenth Foundation lesson seed: First Shapes. |
| current commit | Extracted loaded-but-unmapped Foundation lesson seeds. |

## What Changed

### Added cleanup and inventory docs

- `database-blueprint/docs/codebase-cleanup-plan-2026-07-03.md`
- `database-blueprint/docs/active-code-inventory-2026-07-03.md`
- `database-blueprint/docs/extracted-seed-index-2026-07-03.md`
- `database-blueprint/docs/foundation-lesson-inventory-2026-07-03.md`
- `database-blueprint/docs/foundation-migration-status-2026-07-03.md`
- `database-blueprint/docs/teaching-engine-lesson-seed-schema-v1.md`
- `database-blueprint/docs/local-storage-and-api-inventory-2026-07-03.md`
- `database-blueprint/docs/scene-first-override-inventory-2026-07-03.md`

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
- `database-blueprint/seeds/foundation_learning_a_language_lesson_v2.json`
  - 10 steps
  - source: `assets/js/lessons-learning-a-language.js`
- `database-blueprint/seeds/foundation_language_of_guitar_lesson_v2.json`
  - 10 steps
  - source: `assets/js/lessons-language-of-guitar.js`
- `database-blueprint/seeds/foundation_the_guitar_lesson_v2.json`
  - 8 steps
  - source: `assets/js/lessons-the-guitar.js`
- `database-blueprint/seeds/foundation_speaking_lesson_v2.json`
  - 10 steps
  - source: `assets/js/lessons-speaking.js`
- `database-blueprint/seeds/foundation_conversations_lesson_v2.json`
  - 10 steps
  - source: `assets/js/lessons-conversations.js`
- `database-blueprint/seeds/foundation_how_to_learn_lesson_v2.json`
  - 16 steps
  - source: `assets/js/lessons-how-to-learn.js`
- `database-blueprint/seeds/foundation_rhythm_pulse_lesson_v2.json`
  - 15 steps
  - source: `assets/js/lessons-rhythm-pulse.js`
- `database-blueprint/seeds/foundation_first_shapes_lesson_v2.json`
  - 9 steps
  - source: `assets/js/lessons-first-shapes.js`
- `database-blueprint/seeds/foundation_the_tool_lesson_v2.json`
  - 10 steps
  - source: `assets/js/lessons-the-tool.js`
  - note: loaded by the app, but not currently mapped in `showFoundationTopic()`
- `database-blueprint/seeds/foundation_first_conversation_lesson_v2.json`
  - 9 steps
  - source: `assets/js/lessons-first-conversation.js`
  - note: loaded by the app, but not currently mapped in `showFoundationTopic()`

### Added scene-first reference seed files

These were extracted from low-risk data constants in `assets/js/scene-first.js`.

- `database-blueprint/seeds/hearth_body_zones_v2.json`
  - 6 records
  - source: `HEARTH_BODY_ZONES`
- `database-blueprint/seeds/study_key_doors_v2.json`
  - 6 records
  - source: `STUDY_DOORS`
- `database-blueprint/seeds/mastery_phoenix_seals_v2.json`
  - 4 records
  - source: Mastery phoenix seal data

### Added/expanded smoke check

- `tools/prototype_smoke_check.py`

The smoke check now verifies:

- key app files exist
- key browser globals/exports are still present
- Create content banks still look intact
- extracted Create seed files are valid JSON and have expected counts
- extracted scene-first reference seed files are valid JSON and have expected counts
- extracted Foundation lesson seeds are valid JSON and have expected lesson IDs/step counts
- Foundation topic routes still point to the expected active lesson globals
- loaded-but-unmapped Foundation lesson files remain clearly unmapped
- Foundation lesson files still expose expected lesson globals

Current passing result:

```text
Prototype smoke check passed.
Checked 19 key files, 2 content banks, 6 seed files, 12 lesson seeds, and 10 Foundation routes.
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

Status: completed in `database-blueprint/docs/local-storage-and-api-inventory-2026-07-03.md`.

Make a handoff doc listing:

- localStorage keys
- what each stores
- whether it is content, student memory, UI state, or cache
- API endpoints used by the prototype

This would help Martin design the backend migration safely.

### Option C - Inspect `scene-first.js` in detail

Status: completed in `database-blueprint/docs/scene-first-override-inventory-2026-07-03.md`.

Create a document showing:

- which functions it overrides
- which node screens it currently owns
- what source files it conflicts with
- what a cleaner router could replace it with

This would prepare for the most important frontend architecture cleanup.

## Suggested Next Step

Choose the next migration lane:

- continue extracting small Foundation lessons into lesson seeds, or
- start designing the explicit node renderer registry that will eventually replace the `scene-first.js` override pattern.

The safest practical next move is probably one more small Foundation lesson extraction, or a first browser-level check around the main node screens. The bigger renderer-registry cleanup should wait until those screen checks exist.
