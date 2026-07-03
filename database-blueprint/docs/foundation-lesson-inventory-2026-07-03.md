# Foundation Lesson Inventory - 2026-07-03

## Plain-English Purpose

Foundation is the learner's entry point into the simulator.

This document maps the Foundation lesson files so they can eventually become clean backend-ready content without breaking the current prototype.

## Current Foundation Shape

Foundation currently has three related layers:

1. `assets/js/foundation.js` - the Foundation node/path content.
2. `assets/js/lessons-*.js` - smaller TeachingEngine lessons used by the Foundation path.
3. `assets/js/lesson-1-foundation.js` - a larger standalone interactive Foundation lesson with custom action steps.

Plain-English note:

Most Foundation lessons are already close to clean lesson data. The large `lesson-1-foundation.js` file is different because it contains custom interactive code, not just lesson text.

## Foundation Path File

| File | Lines | Role | Cleanup classification |
|---|---:|---|---|
| `assets/js/foundation.js` | 532 | Defines the Foundation node, ten fret/path topics, source notes, step summaries, and exposes `window.FOUNDATION`. | Mixed: path content + node data |

Foundation path topic IDs:

| Topic ID | Fret | Title | Purpose |
|---|---:|---|---|
| `f-threshold` | 0 | The Threshold | Meet the world, guide, map, and progress system. |
| `f-how-to-learn` | 1 | How to Learn | Learning barriers, gradient, mass, misunderstood words. |
| `f-music-language` | 2 | Music as Language | Vocabulary, grammar, conversation, poetry. |
| `f-musical-alphabet` | 3 | The Musical Alphabet | Twelve notes, half steps, whole steps. |
| `f-rhythm-pulse` | 4 | Rhythm & Pulse | Beat, pulse, body, counting, movement. |
| `f-guitar-map` | 5 | The Guitar Map | Strings, frets, tab, octave, fretboard map. |
| `f-instrument-body` | 6 | The Instrument Body | Parts, posture, tuning, care. |
| `f-hands-sound` | 7 | Hands & Sound | Right hand, left hand, clean tone. |
| `f-first-shapes` | 8 | First Shapes | Open/fret movement and E major. |
| `f-first-conversation` | 9 | First Conversation | Call and response, tiny musical sentence. |

## Foundation Lesson File Map

These files are loaded into the TeachingEngine from `simulator.html`.

| File | Export | Title | Steps | Step types | Custom action code? | Cleanup classification |
|---|---|---|---:|---|---|---|
| `assets/js/lessons-threshold.js` | `LESSON_THRESHOLD` | The Threshold | 7 | speak, ask, end | No | Mostly content |
| `assets/js/lessons-how-to-learn.js` | `LESSON_HOW_TO_LEARN` | How to Learn | 16 | speak, ask, cards, video, end | No | Mostly content |
| `assets/js/lessons-learning-a-language.js` | `LESSON_LEARNING_A_LANGUAGE` | Learning a Language | 10 | speak, ask, cards, end | No | Mostly content |
| `assets/js/lessons-language-of-music.js` | `LESSON_LANGUAGE_OF_MUSIC` | The Language of Music | 10 | speak, ask, end | No | Mostly content |
| `assets/js/lessons-language-of-guitar.js` | `LESSON_LANGUAGE_OF_GUITAR` | The Language of Guitar | 10 | speak, ask, end | No | Mostly content |
| `assets/js/lessons-the-tool.js` | `LESSON_THE_TOOL` | The Tool | 10 | speak, ask, end | No | Mostly content |
| `assets/js/lessons-the-guitar.js` | `LESSON_THE_GUITAR` | The Guitar | 8 | speak, ask, end | No | Mostly content |
| `assets/js/lessons-speaking.js` | `LESSON_SPEAKING` | Speaking with the Guitar | 10 | speak, ask, end | No | Mostly content |
| `assets/js/lessons-rhythm-pulse.js` | `LESSON_RHYTHM_PULSE` | Rhythm & Pulse | 15 | speak, ask | No | Mostly content |
| `assets/js/lessons-first-shapes.js` | `LESSON_FIRST_SHAPES` | First Shapes | 9 | speak, ask | No | Mostly content |
| `assets/js/lessons-first-conversation.js` | `LESSON_FIRST_CONVERSATION` | First Conversation | 9 | speak, ask | No | Mostly content |
| `assets/js/lessons-conversations.js` | `LESSON_CONVERSATIONS` | Guitar Conversations | 10 | speak, ask, end | No | Mostly content |
| `assets/js/lesson-1-foundation.js` | `LESSON_1_FOUNDATION` | Foundation | 21 | speak, ask, cards, action, end | Yes: 4 action renderers | Mixed content + frontend behavior |

## How Foundation Is Wired Today

In `simulator.html`, `showFoundationTopic()` maps Foundation topic IDs to lesson globals:

| Topic ID | Current lesson global |
|---|---|
| `f-threshold` | `window.LESSON_THRESHOLD` |
| `f-how-to-learn` | `window.LESSON_HOW_TO_LEARN` |
| `f-music-language` | `window.LESSON_LEARNING_A_LANGUAGE` |
| `f-musical-alphabet` | `window.LESSON_LANGUAGE_OF_MUSIC` |
| `f-rhythm-pulse` | `window.LESSON_RHYTHM_PULSE` |
| `f-guitar-map` | `window.LESSON_LANGUAGE_OF_GUITAR` |
| `f-instrument-body` | `window.LESSON_THE_GUITAR` |
| `f-hands-sound` | `window.LESSON_SPEAKING` |
| `f-first-shapes` | `window.LESSON_FIRST_SHAPES` |
| `f-first-conversation` | `window.LESSON_CONVERSATIONS` |

Important observation:

`assets/js/lessons-the-tool.js` and `assets/js/lessons-first-conversation.js` are loaded, but the current `showFoundationTopic()` mapping does not appear to use them directly.

## Backend Migration Meaning

Most smaller `lessons-*.js` files can eventually become lesson-step records.

Extracted lesson seeds so far:

- `database-blueprint/seeds/foundation_threshold_lesson_v2.json`
- `database-blueprint/seeds/foundation_how_to_learn_lesson_v2.json`
- `database-blueprint/seeds/foundation_language_of_music_lesson_v2.json`
- `database-blueprint/seeds/foundation_learning_a_language_lesson_v2.json`
- `database-blueprint/seeds/foundation_language_of_guitar_lesson_v2.json`
- `database-blueprint/seeds/foundation_rhythm_pulse_lesson_v2.json`
- `database-blueprint/seeds/foundation_the_guitar_lesson_v2.json`
- `database-blueprint/seeds/foundation_speaking_lesson_v2.json`
- `database-blueprint/seeds/foundation_conversations_lesson_v2.json`

Likely backend fields:

- lesson ID
- title
- subtitle
- Foundation topic ID
- step order
- step type
- character image key
- character label
- text/body HTML or rich text
- choices for ask steps
- correct answer
- re-explanation text
- video metadata for video steps

## Frontend-Owned Pieces

The backend should not store large JavaScript render functions.

The following should stay frontend-owned:

- TeachingEngine renderer implementation.
- Typewriter effect.
- Card display behavior.
- Answer selection behavior.
- Audio helpers.
- Custom action renderers.

For `lesson-1-foundation.js`, the custom actions should become named renderer keys later.

Suggested renderer keys:

- `foundation.body_scan`
- `foundation.first_sounds`
- `foundation.note_movement`
- `foundation.e_major_chord`

The backend can store the renderer key. The frontend should own the actual rendering code.

## Cleanup Risk Levels

### Low risk

The smaller `lessons-*.js` files are mostly data. They are good candidates for future JSON seed extraction after the lesson-step schema is chosen.

### Medium risk

`assets/js/foundation.js` is mostly content, but it also defines the shape of the Foundation node/path. Extract only after the topic/path model is clear.

### Higher risk

`assets/js/lesson-1-foundation.js` contains custom interactive action code. Do not flatten it blindly into JSON. Split it into:

- lesson data
- renderer keys
- frontend action renderer functions

## Recommended Next Step

Before extracting Foundation lesson JSON, define a small lesson-step schema that can represent:

- `speak`
- `ask`
- `cards`
- `video`
- `end`
- `action` by renderer key

Then extract one small lesson first, such as `lessons-threshold.js`, as a test seed.

Do not start with `lesson-1-foundation.js`.
