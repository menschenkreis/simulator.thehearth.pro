# Foundation Migration Status - 2026-07-03

## Plain-English Summary

Foundation is now partly copied into clean backend-friendly seed files.

This does not mean the simulator is reading from the backend yet. It means the lesson content has been copied out of JavaScript into tidy data files so Martin can see the lesson shape clearly.

## Extracted Lesson Seeds

| Source file | Seed file | Status |
|---|---|---|
| `assets/js/lessons-threshold.js` | `database-blueprint/seeds/foundation_threshold_lesson_v2.json` | Extracted |
| `assets/js/lessons-how-to-learn.js` | `database-blueprint/seeds/foundation_how_to_learn_lesson_v2.json` | Extracted |
| `assets/js/lessons-learning-a-language.js` | `database-blueprint/seeds/foundation_learning_a_language_lesson_v2.json` | Extracted |
| `assets/js/lessons-language-of-music.js` | `database-blueprint/seeds/foundation_language_of_music_lesson_v2.json` | Extracted |
| `assets/js/lessons-language-of-guitar.js` | `database-blueprint/seeds/foundation_language_of_guitar_lesson_v2.json` | Extracted |
| `assets/js/lessons-rhythm-pulse.js` | `database-blueprint/seeds/foundation_rhythm_pulse_lesson_v2.json` | Extracted |
| `assets/js/lessons-first-shapes.js` | `database-blueprint/seeds/foundation_first_shapes_lesson_v2.json` | Extracted |
| `assets/js/lessons-the-guitar.js` | `database-blueprint/seeds/foundation_the_guitar_lesson_v2.json` | Extracted |
| `assets/js/lessons-speaking.js` | `database-blueprint/seeds/foundation_speaking_lesson_v2.json` | Extracted |
| `assets/js/lessons-conversations.js` | `database-blueprint/seeds/foundation_conversations_lesson_v2.json` | Extracted |
| `assets/js/lessons-the-tool.js` | `database-blueprint/seeds/foundation_the_tool_lesson_v2.json` | Extracted, loaded but not currently mapped |
| `assets/js/lessons-first-conversation.js` | `database-blueprint/seeds/foundation_first_conversation_lesson_v2.json` | Extracted, loaded but not currently mapped |

## Smaller Lesson Files Not Yet Routed

| Source file | Current note |
|---|---|
| `assets/js/lessons-the-tool.js` | Seed extracted, but the current `showFoundationTopic()` mapping does not appear to use it directly. |
| `assets/js/lessons-first-conversation.js` | Seed extracted, but the current `showFoundationTopic()` mapping does not appear to use it directly. |

## Do Not Flatten Blindly

| Source file | Why it needs care |
|---|---|
| `assets/js/lesson-1-foundation.js` | Contains custom action renderers. This should become lesson data plus frontend renderer keys, not plain JSON only. |

Detailed inventory:

- `database-blueprint/docs/lesson-1-foundation-custom-renderer-inventory-2026-07-04.md`

## Current Safety Check

The smoke check currently validates:

- 19 key app files
- 2 Create content banks
- 6 general seed files
- 12 Foundation lesson seed files
- 10 active Foundation topic routes
- 2 loaded-but-currently-unmapped Foundation lesson files

Current expected result:

```text
Prototype smoke check passed.
Checked 19 key files, 2 content banks, 6 seed files, 12 lesson seeds, and 10 Foundation routes.
```

## Browser Check Note

A local browser preview was opened through `http://127.0.0.1:8765/simulator.html`.

The page loaded and requested the Foundation lesson scripts successfully. The in-app browser's read-only JavaScript inspection did not expose page globals reliably enough to use as the final guard.

For now, the route guard lives in `tools/prototype_smoke_check.py`, where it checks the current `showFoundationTopic()` mapping directly.

The guard checks exact topic-to-lesson pairings, so accidental route swaps should fail the smoke check.

## Recommended Next Bite

Decide whether the two loaded-but-not-currently-mapped files should be removed, routed, or kept as archive content:

- `assets/js/lessons-the-tool.js`
- `assets/js/lessons-first-conversation.js`

The safest next architecture step is adding a visual or interaction check that can click through Foundation topics reliably before changing how these lessons are wired.
