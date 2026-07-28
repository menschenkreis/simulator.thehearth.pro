# Codebase Cleanup Plan - 2026-07-03

## Plain-English Purpose

This repo is the real simulator project. It has a lot of valuable learning design, but the code is tangled because the prototype grew quickly.

The cleanup goal is not to rebuild everything at once. The cleanup goal is to make the project easier to understand, easier to hand to Martin, and safer to change.

## Current Big Pieces

| Area | What it means |
|---|---|
| `simulator.html` | The main app. It is very large and contains too much HTML, CSS, and JavaScript in one place. |
| `assets/js/` | The main feature code: nodes, lessons, Journey, TeachingEngine, Create, Practice, Knowing, etc. |
| `assets/css/` | Styling for the app, Foundation, and the book reader. |
| `images/` | Node icons, character art, symbols, and visual assets. |
| `assets/svg/` | Important SVG scenes and icons, including cauldron and brain map assets. |
| `knowledge-base/` | Reference material and source notes. Valuable content, not app wiring. |
| `database-blueprint/` | Handoff plans, data seeds, schema drafts, and backend planning. |
| `tools/` | Small scripts/checks/helpers. |

## Main Active Files

| File | Responsibility | Cleanup risk |
|---|---|---|
| `simulator.html` | Main one-page app shell and inline app logic. | Highest risk because it is huge. Do not rewrite casually. |
| `assets/js/scene-first.js` | Overrides several node display functions. | Highest architecture risk because it can quietly replace other work. |
| `assets/js/teaching-engine.js` | Character-driven lesson system. | Valuable pattern. Refactor carefully. |
| `assets/js/journey.js` | Multi-student Journey system, lessons, progress, localStorage, and some API sync. | High risk because it mixes many jobs. |
| `assets/js/foundation.js` | Foundation node screen and lesson access. | Medium risk. Important teaching entry point. |
| `assets/js/lesson-1-foundation.js` | Large Foundation lesson with custom interactive steps. | Medium risk. Split data from action renderers later. |
| `assets/js/doing.js` | Doing node drill data and UI. | Important content source. |
| `assets/js/practice.js` | Practice room drill/session logic. | Important progress/practice source. |
| `assets/js/knowing.js` | Knowing node library/bookshelf behavior. | Important content and UI source. |
| `assets/js/create-obstructions.js` | Create prompt content bank. | Low risk; good first data extraction candidate. |
| `assets/js/create-combos.js` | Create combo prompt content bank. | Low risk; good first data extraction candidate. |
| `assets/js/create-cauldron.js` | Create node ingredient/cauldron data. | Low to medium risk. |

## The Main Architecture Problem

The current app has too many global functions and overrides. In simple terms:

One file says, "show the Create node this way," and another file later says, "actually, show it my way."

The file most associated with this is:

`assets/js/scene-first.js`

That does not mean it is bad or useless. It means it became a layer that can hide other changes. The rebuild should eventually replace this with one clear routing/rendering system.

## What We Should Preserve

- The 8-node learning world.
- The TeachingEngine idea.
- The Journey/multi-student idea.
- Create obstructions and combos.
- Doing and Practice drills.
- Knowing/source library concepts.
- Foundation lesson structure.
- Character-guided teaching tone.
- Database blueprint and handoff documents.

## What We Should Not Preserve Blindly

- The giant `simulator.html` shape.
- Duplicate global functions.
- The override pattern in `scene-first.js`.
- localStorage as the only long-term storage.
- Hardcoded content trapped inside UI code.
- Inline handlers and giant HTML strings as the final architecture.

## Modular Refactor Plan

### Phase 1 - Safety and inventory

- Work on a cleanup branch.
- Add a small smoke check.
- Map active files and responsibilities.
- Do not change user-facing behavior yet.

### Phase 2 - Extract low-risk content

Start with mostly-data files:

- `assets/js/create-obstructions.js`
- `assets/js/create-combos.js`
- `assets/js/create-cauldron.js`

Goal:

Prepare clean JSON/database-friendly content while keeping the existing app working.

### Phase 3 - Separate state, API, and UI

Especially in `journey.js`, split these responsibilities later:

- content definitions
- student state
- localStorage fallback
- backend/API sync
- screen rendering
- lesson workflow

### Phase 4 - Tame routing and overrides

Replace the "last file wins" pattern with one clear place that decides:

- which node is open
- which renderer is used
- where state is read from
- what happens if a dependency is missing

### Phase 5 - Turn lessons into data plus renderers

TeachingEngine should keep rendering lessons.

Lesson files should eventually become mostly structured data.

Custom interactions should become named renderer keys, for example:

- `foundation.body_scan`
- `foundation.first_sounds`
- `foundation.note_movement`
- `foundation.e_major_chord`

The backend can store the key. The frontend renders the interaction.

## Regression Protection

Regression means "something that used to work accidentally stops working."

Immediate protection:

- Run `tools/prototype_smoke_check.py` before and after cleanup changes.

Later protection:

- Add browser checks for main node screens.
- Add data checks for lessons and prompts.
- Add visual screenshots for key screens.
- Add backend seed validation before Martin imports data.

## Next Practical Step

Run the smoke check, then begin with the Create content banks because they are the least tangled and easiest to make migration-ready.
