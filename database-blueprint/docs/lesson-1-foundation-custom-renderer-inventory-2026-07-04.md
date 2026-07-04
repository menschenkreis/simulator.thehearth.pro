# Lesson 1 Foundation Custom Renderer Inventory - 2026-07-04

## Plain-English Purpose

`assets/js/lesson-1-foundation.js` should not be copied into plain JSON all at once.

Most of it is lesson text, questions, and cards. But four steps contain custom JavaScript render functions. Those functions build interactive mini-tools inside the lesson.

For backend migration, this file should become:

- lesson seed data
- stable renderer keys
- frontend-owned renderer functions

## File Summary

| File | Lines | Export | Role |
|---|---:|---|---|
| `assets/js/lesson-1-foundation.js` | 908 | `window.LESSON_1_FOUNDATION` | Large standalone Foundation lesson with custom interactions. |

## Runtime Helpers

| Helper | Role | Future owner |
|---|---|---|
| `_l1_playTone(freq, type, duration, volume)` | Creates short Web Audio tones for interactive lesson actions. | Frontend utility, not backend data. |

## Step Inventory

| Order | Type | Concept / role | Migration note |
|---:|---|---|---|
| 1 | `speak` | Welcome | Plain lesson data. |
| 2 | `speak` | Tension explanation | Plain lesson data. |
| 3 | `ask` | `body-tension` | Plain lesson data. |
| 4 | `action` | Body scan | Needs renderer key: `foundation.body_scan`. |
| 5 | `ask` | `music-as-language` | Plain lesson data. |
| 6 | `speak` | Twelve notes explanation | Plain lesson data. |
| 7 | `ask` | `twelve-notes` | Plain lesson data. |
| 8 | `cards` | Fretboard map cards | Plain lesson data. |
| 9 | `cards` | Guitar parts and posture cards | Plain lesson data. |
| 10 | `speak` | Rest stroke vs free stroke | Plain lesson data. |
| 11 | `ask` | `stroke-types` | Plain lesson data. |
| 12 | `action` | First sounds | Needs renderer key: `foundation.first_sounds`. |
| 13 | `speak` | Fretting position | Plain lesson data. |
| 14 | `ask` | `fretting-position` | Plain lesson data. |
| 15 | `action` | Moving between notes | Needs renderer key: `foundation.note_movement`. |
| 16 | `speak` | E major chord intro | Plain lesson data. |
| 17 | `ask` | `e-major-shape` | Plain lesson data. |
| 18 | `action` | E major chord | Needs renderer key: `foundation.e_major_chord`. |
| 19 | `ask` | `foundation-recap` | Plain lesson data. |
| 20 | `speak` | Closing | Plain lesson data. |
| 21 | `end` | Foundation complete | Plain lesson data. |

## Custom Renderer Details

### `foundation.body_scan`

Current source:

- Step 4
- `type: 'action'`

What it does:

- Renders four body-scan cards: Shoulders, Jaw, Hands, Breath.
- Each card has a Try It button.
- Each button plays a soft tone.
- Each card marks itself done.
- Continue stays disabled until all four cards are tried.

Backend-friendly data shape:

- body areas
- labels
- descriptions
- icon keys
- tone frequencies
- completion rule: all items tried

Frontend-owned behavior:

- Web Audio playback
- card animation
- button state
- continue gating

### `foundation.first_sounds`

Current source:

- Step 12
- `type: 'action'`

What it does:

- Renders Rest Stroke and Free Stroke demo buttons.
- Plays different tones for each stroke.
- Animates a simple sound meter.
- Shows physical practice guidance.
- Continue is always available.

Backend-friendly data shape:

- stroke options
- labels
- descriptions
- tone settings
- practice instructions

Frontend-owned behavior:

- Web Audio playback
- sound-meter animation
- button interaction

### `foundation.note_movement`

Current source:

- Step 15
- `type: 'action'`

What it does:

- Renders a small G-string fretboard from open to fret 4.
- Plays individual frets on click.
- Plays two guided sequences:
  - open, fret 2, open
  - open, fret 1, fret 2, fret 3, fret 4, fret 3, fret 2, fret 1, open
- Highlights active frets while tones play.

Backend-friendly data shape:

- string name
- fret/note/frequency rows
- sequences
- physical practice instructions

Frontend-owned behavior:

- Web Audio playback
- sequence timing
- fret highlighting
- click-to-play behavior

### `foundation.e_major_chord`

Current source:

- Step 18
- `type: 'action'`

What it does:

- Renders an E major chord diagram.
- Lets the learner tap individual strings to hear notes.
- Includes a Strum All button that plays strings from low E to high e.
- Highlights chord dots while tones play.

Backend-friendly data shape:

- chord name
- string rows
- fret positions
- finger numbers
- string frequencies
- strum order
- practice instructions

Frontend-owned behavior:

- Web Audio playback
- chord-dot animation
- strum timing
- click-to-play behavior

## Suggested Future Seed Shape

For action steps, store this kind of shape:

```json
{
  "order": 4,
  "type": "action",
  "renderer_key": "foundation.body_scan",
  "text": "Let us do a body scan together.",
  "renderer_config": {
    "completion_rule": "all_items_tried",
    "items": []
  }
}
```

The backend should not store JavaScript render functions.

## Core Manifest

The clean core now records these renderer keys in:

- `core/action-renderer-manifest.json`

That manifest is the backend/frontend contract. It says which renderer keys exist and what kind of configuration each renderer expects.

## Migration Recommendation

Do not extract this file as a normal lesson seed yet.

Recommended next order:

1. Create a renderer-key schema for `action` lesson steps.
2. Extract this lesson into a partial seed with four `renderer_key` placeholders.
3. Move the four render functions into a frontend renderer registry.
4. Only then route this lesson through backend-style lesson data.

## Safety Note

This file is still watched by `tools/prototype_smoke_check.py` through basic markers:

- `LESSON_1_FOUNDATION`
- `steps:`
- `window.LESSON_1_FOUNDATION`

Before changing runtime behavior, add a stronger check around the TeachingEngine action-step rendering path.
