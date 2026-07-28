# Active Code Inventory - 2026-07-03

## Plain-English Purpose

This document maps the active code in the simulator repo so cleanup can happen step by step.

The goal is to know what each file is responsible for before moving, deleting, or splitting anything.

## Overall Shape

The app is currently a single-page prototype.

The main page is:

- `simulator.html`

The active feature code mostly lives in:

- `assets/js/`

The active styling mostly lives in:

- `assets/css/`

The handoff and backend planning lives in:

- `database-blueprint/`

## Main App Shell

| File | Lines | Type | What it does | Risk |
|---|---:|---|---|---|
| `simulator.html` | 6327 | Mixed | Main app shell, map, panels, inline UI, inline state, many global functions, script loading. | Very high |
| `index.html` | 150 | Shell/entry | Smaller entry page or redirect/landing shell. | Low |

Plain-English note:

`simulator.html` is like a whole house built in one room. It works, but any renovation risks bumping into something else. We should document and protect it before breaking it apart.

## Script Load Order

The order matters because later scripts can replace earlier functions.

Important load sequence from `simulator.html`:

1. Foundation and TeachingEngine files.
2. lesson files.
3. Doing, Knowing, Practice.
4. API files.
5. Journey.
6. Play and Create content.
7. Late extras near the bottom: Practice Room, Hearth Brain, BeatBot, Lesson 1 Foundation, Play World, Study Key, Create Workshop.
8. `scene-first.js` loads very late.

Plain-English risk:

Because `scene-first.js` loads late, it can get the final say over screens that earlier files already defined.

## Highest-Risk Files

| File | Type | Why it is risky | Cleanup advice |
|---|---|---|---|
| `simulator.html` | Mixed monolith | Huge file with HTML, CSS-ish inline styles, JavaScript, map, panels, localStorage, and global functions. | Do not refactor first. Use as source map while extracting safer pieces. |
| `assets/js/scene-first.js` | Late override/render layer | Defines active renderers for Hearth, Play, Study, Create, Practice, Mastery, and more. Can override earlier files. | Document before changing. Eventually replace with one clear router. |
| `assets/js/journey.js` | Mixed feature/state/content | Owns Journey levels, lesson generation, student data, localStorage, API sync, and UI rendering. | Split later after checks exist. |
| `assets/js/hearth-api.js` | API client | Calls live API and uses admin token from localStorage for writes. | Keep isolated. Do not mix into UI files. |
| `assets/js/api-loader.js` | API override loader | Can replace local hardcoded content with API content if API returns enough data. | Treat carefully because it can make local data appear/disappear. |

## Core Teaching and Learning Files

| File | Lines | Category | Responsibility | Cleanup classification |
|---|---:|---|---|---|
| `assets/js/teaching-engine.js` | 467 | Behavior engine | Renders character-driven lessons: speak, ask, cards, video, action, end. Handles wrong-answer re-explanation. | Frontend behavior |
| `assets/js/journey.js` | 933 | Mixed | Multi-student guided path, generated lessons, progress, localStorage, API sync attempts, Journey UI. | Mixed: content + state + UI |
| `assets/js/lesson-1-foundation.js` | 908 | Mixed lesson | A large Foundation lesson with custom interactive actions. | Mixed: lesson content + action renderers |
| `assets/js/foundation.js` | 532 | Feature screen/content | Foundation node topics and display support. | Mixed: content + UI |

## Foundation Lesson Files

These are mostly lesson content loaded into the TeachingEngine.

| File | Lines | Responsibility | Cleanup classification |
|---|---:|---|---|
| `assets/js/lessons-threshold.js` | 115 | Foundation threshold lesson. | Mostly content |
| `assets/js/lessons-how-to-learn.js` | 250 | How-to-learn lesson. | Mostly content |
| `assets/js/lessons-learning-a-language.js` | 190 | Learning-as-language lesson. | Mostly content |
| `assets/js/lessons-language-of-music.js` | 167 | Music alphabet/language lesson. | Mostly content |
| `assets/js/lessons-language-of-guitar.js` | 169 | Guitar language/fretboard lesson. | Mostly content |
| `assets/js/lessons-the-tool.js` | 169 | Instrument/tool lesson. | Mostly content |
| `assets/js/lessons-the-guitar.js` | 95 | Guitar body lesson. | Mostly content |
| `assets/js/lessons-speaking.js` | 127 | Hands/sound lesson. | Mostly content |
| `assets/js/lessons-rhythm-pulse.js` | 105 | Rhythm/pulse lesson. | Mostly content |
| `assets/js/lessons-first-shapes.js` | 75 | First shapes lesson. | Mostly content |
| `assets/js/lessons-first-conversation.js` | 75 | First conversation lesson. | Mostly content |
| `assets/js/lessons-conversations.js` | 138 | Conversation lesson content. | Mostly content |

Cleanup advice:

These are good candidates for a future "lesson content format," but not before the TeachingEngine data shape is documented.

## Node Feature Files

| File | Lines | Node/area | Responsibility | Cleanup classification |
|---|---:|---|---|---|
| `assets/js/doing.js` | 173 | Doing | Drill data and Doing node globals. | Mostly content |
| `assets/js/fretboard.js` | 605 | Fretboard/toolkit | Interactive fretboard overlay/tool. | Behavior + UI |
| `assets/js/practice.js` | 227 | Practice | Practice drill/session data and node support. | Mixed: content + state |
| `assets/js/practice-room.js` | 106 | Practice | Practice room local state and rendering. | Mixed: state + UI |
| `assets/js/knowing.js` | 898 | Knowing | Bookshelf/library topics and UI. | Mixed: content + UI |
| `assets/js/knowing-concepts.js` | 280 | Knowing | Concept layer data. | Mostly content |
| `assets/js/book-reader.js` | 382 | Knowing | Flipbook/book reader behavior. | Behavior + UI |
| `assets/js/pdf-viewer.js` | 123 | Reading/PDF | PDF viewer behavior. | Behavior + UI |
| `assets/js/play.js` | 175 | Play | Play node content. | Mostly content |
| `assets/js/play-worldmap.js` | 542 | Play | World map region data/behavior. | Mixed: content + UI |
| `assets/js/play-world.js` | 220 | Play | World map/render support. | Mixed: content + UI |
| `assets/js/hearth-brain.js` | 191 | Hearth/Study | Brain map rendering/API contact. | Mixed: UI + API |
| `assets/js/study-key.js` | 62 | Study | Study key/chamber state and UI. | Mixed: state + UI |
| `assets/js/beatbot.js` | 258 | Toolkit | Audio/chord/drill loop generator. | Behavior |
| `assets/js/video-roadmap.js` | 202 | Video/content | Video roadmap references. | Mostly content |
| `assets/js/references.js` | 209 | References | Reference lookup data/helpers. | Mostly content |

## Create Node Files

| File | Lines | Responsibility | Cleanup classification | First-pass risk |
|---|---:|---|---|---|
| `assets/js/create.js` | 137 | Create node topic/category content. | Mostly content | Low |
| `assets/js/create-cauldron.js` | 125 | Cauldron ingredients and prompt seeds. | Mostly content | Low |
| `assets/js/create-obstructions.js` | 362 | 50 Create obstructions. | Content bank | Low |
| `assets/js/create-combos.js` | 246 | Create combo prompts. | Content bank | Low |
| `assets/js/create-workshop.js` | 40 | Create workshop renderer and local saved projects. | Mixed: UI + localStorage | Medium |

Cleanup advice:

This is the safest first area. The content banks can be turned into clean JSON/database seed files while the current app keeps using the existing JavaScript files.

## API and Data Loading Files

| File | Responsibility | Important note |
|---|---|---|
| `assets/js/hearth-api.js` | Defines `window.HearthAPI`, reads/writes to `https://thehearth.pro/api/`, includes content and Journey API helpers. | This is the main API client. It should stay separate from rendering. |
| `assets/js/api-loader.js` | Loads content from API and may replace local globals like `window.KNOWING`, `window.DOING`, and `window.PRACTICE`. | This can cause confusing behavior if API data is smaller or stale. |

Cleanup advice:

Do not remove local content fallback yet. The backend migration should be deliberate and verified.

## Vendor/Library File

| File | Lines | Responsibility | Cleanup advice |
|---|---:|---|---|
| `assets/js/page-flip.browser.min.js` | 7 | Minified third-party page flip library. | Treat as vendor code. Do not edit manually. |

## Styling Files

| File | Lines | Responsibility | Cleanup classification |
|---|---:|---|---|
| `assets/css/style.css` | 345 | Main app styles. | Shared styling |
| `assets/css/foundation.css` | 237 | Foundation-specific styles. | Feature styling |
| `assets/css/book-reader.css` | 507 | Flipbook/book reader styles. | Feature styling |

## Browser Storage Seen In Active Files

Known localStorage areas include:

- map/theme/travel state in `simulator.html`
- Foundation progress
- Doing progress
- Knowing progress/state
- Practice sessions and practice room state
- Journey students/progress/notes
- Create current seed and saved projects
- admin token for API writes

Plain-English note:

localStorage means "saved only in this browser." It is useful as a fallback, but it is not a real long-term backend.

## First Cleanup Candidates

### Best first target: Create content banks

Files:

- `assets/js/create-obstructions.js`
- `assets/js/create-combos.js`
- `assets/js/create-cauldron.js`
- possibly `assets/js/create.js`

Why:

- Mostly data.
- Low risk.
- Useful for backend migration.
- Easy to validate with the smoke check.

### Second target: Foundation lesson content inventory

Files:

- `assets/js/lessons-*.js`
- `assets/js/lesson-1-foundation.js`

Why:

- Important teaching content.
- Already close to a structured lesson-step format.
- Needs a clear split between ordinary lesson data and custom action renderers.

### Later target: Journey split

File:

- `assets/js/journey.js`

Why later:

Journey is important, but it mixes content, progress, state, API, and rendering. It should be split only after content extraction and more checks exist.

### Last target: simulator shell and scene-first routing

Files:

- `simulator.html`
- `assets/js/scene-first.js`

Why last:

These files control the whole app experience and are most likely to break visible behavior.

## Recommended Next Step

Convert the Create content banks into migration-ready JSON seed files while keeping the existing JavaScript exports unchanged.

Run this before and after:

`python3 tools/prototype_smoke_check.py`

This lets us clean a useful area without disturbing the rest of the prototype.
