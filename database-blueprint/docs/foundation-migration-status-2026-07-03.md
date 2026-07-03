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
| `assets/js/lessons-the-guitar.js` | `database-blueprint/seeds/foundation_the_guitar_lesson_v2.json` | Extracted |
| `assets/js/lessons-speaking.js` | `database-blueprint/seeds/foundation_speaking_lesson_v2.json` | Extracted |
| `assets/js/lessons-conversations.js` | `database-blueprint/seeds/foundation_conversations_lesson_v2.json` | Extracted |

## Smaller Lesson Files Not Yet Extracted

| Source file | Current note |
|---|---|
| `assets/js/lessons-the-tool.js` | Loaded by the app, but not currently mapped in `showFoundationTopic()`. Safe to inspect before deciding whether to extract. |
| `assets/js/lessons-first-shapes.js` | Loaded by the app and likely extractable. |
| `assets/js/lessons-first-conversation.js` | Loaded by the app, but not currently mapped in `showFoundationTopic()`. Safe to inspect before deciding whether to extract. |

## Do Not Flatten Blindly

| Source file | Why it needs care |
|---|---|
| `assets/js/lesson-1-foundation.js` | Contains custom action renderers. This should become lesson data plus frontend renderer keys, not plain JSON only. |

## Current Safety Check

The smoke check currently validates:

- 19 key app files
- 2 Create content banks
- 6 general seed files
- 9 Foundation lesson seed files

Current expected result:

```text
Prototype smoke check passed.
Checked 19 key files, 2 content banks, 6 seed files, and 9 lesson seeds.
```

## Recommended Next Bite

Inspect and extract `assets/js/lessons-first-shapes.js` next if it has no custom renderer code.

Then inspect the two loaded-but-not-currently-mapped files:

- `assets/js/lessons-the-tool.js`
- `assets/js/lessons-first-conversation.js`

Those may still be useful content seeds, but the handoff note should clearly say they are not part of the current Foundation topic route.
