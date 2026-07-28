# Extracted Seed Index - 2026-07-03

## Plain-English Purpose

This is the table of contents for the new backend-friendly seed files extracted from the current prototype.

These files are not live backend data yet. They are clean copies of prototype content, prepared so Martin can inspect, import, reshape, or compare them during the backend rebuild.

## Foundation Lesson Seeds

| Seed file | Lesson ID | Steps | Route status |
|---|---|---:|---|
| `database-blueprint/seeds/foundation_threshold_lesson_v2.json` | `f-threshold` | 7 | Active Foundation route |
| `database-blueprint/seeds/foundation_how_to_learn_lesson_v2.json` | `f-how-to-learn` | 16 | Active Foundation route |
| `database-blueprint/seeds/foundation_learning_a_language_lesson_v2.json` | `f-learning-a-language` | 10 | Active Foundation route |
| `database-blueprint/seeds/foundation_language_of_music_lesson_v2.json` | `f-language-of-music` | 10 | Active Foundation route |
| `database-blueprint/seeds/foundation_rhythm_pulse_lesson_v2.json` | `f-rhythm-pulse` | 15 | Active Foundation route |
| `database-blueprint/seeds/foundation_language_of_guitar_lesson_v2.json` | `f-language-of-guitar` | 10 | Active Foundation route |
| `database-blueprint/seeds/foundation_the_guitar_lesson_v2.json` | `f-the-guitar` | 8 | Active Foundation route |
| `database-blueprint/seeds/foundation_speaking_lesson_v2.json` | `f-speaking` | 10 | Active Foundation route |
| `database-blueprint/seeds/foundation_first_shapes_lesson_v2.json` | `f-first-shapes` | 9 | Active Foundation route |
| `database-blueprint/seeds/foundation_conversations_lesson_v2.json` | `f-conversations` | 10 | Active Foundation route |
| `database-blueprint/seeds/foundation_the_tool_lesson_v2.json` | `f-the-tool` | 10 | Loaded, but not currently mapped |
| `database-blueprint/seeds/foundation_first_conversation_lesson_v2.json` | `f-first-conversation` | 9 | Loaded, but not currently mapped |

Important note:

The active route for Foundation topic `f-first-conversation` currently opens `LESSON_CONVERSATIONS`, not `LESSON_FIRST_CONVERSATION`.

## Create Node Seeds

| Seed file | Records | Source |
|---|---:|---|
| `database-blueprint/seeds/create_obstructions_v2.json` | 50 | `assets/js/create-obstructions.js` |
| `database-blueprint/seeds/create_combos_v2.json` | 32 | `assets/js/create-combos.js` |
| `database-blueprint/seeds/create_cauldron_ingredients_v2.json` | 8 | `assets/js/create-cauldron.js` |

## Scene-First Reference Seeds

| Seed file | Records | Source |
|---|---:|---|
| `database-blueprint/seeds/hearth_body_zones_v2.json` | 6 | `assets/js/scene-first.js` `HEARTH_BODY_ZONES` |
| `database-blueprint/seeds/study_key_doors_v2.json` | 6 | `assets/js/scene-first.js` `STUDY_DOORS` |
| `database-blueprint/seeds/mastery_phoenix_seals_v2.json` | 4 | `assets/js/scene-first.js` Mastery phoenix seal data |

## What Is Still Not Extracted

The large file below should not be flattened blindly:

- `assets/js/lesson-1-foundation.js`

Reason:

It contains custom action renderers. It should become:

- lesson data
- stable frontend renderer keys
- frontend-owned renderer functions

## Current Guardrail

Run:

```bash
python3 tools/prototype_smoke_check.py
```

Expected result:

```text
Prototype smoke check passed.
Checked 19 key files, 2 content banks, 6 seed files, 12 lesson seeds, and 10 Foundation routes.
```
