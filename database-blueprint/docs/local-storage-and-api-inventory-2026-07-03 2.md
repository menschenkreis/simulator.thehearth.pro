# Local Storage and API Inventory - 2026-07-03

## Plain-English Purpose

This document lists what the prototype currently saves in the browser and what it tries to send to the server.

This is important because browser storage is not a real backend. It is useful for the prototype, but Martin needs to know what should eventually become database-backed.

## Key Principle

Do not remove localStorage all at once.

Use it as a fallback while the backend is introduced carefully.

## Browser Storage Summary

| Storage key | Seen in | What it appears to store | Category | Backend priority |
|---|---|---|---|---|
| `hearth-journey-v2` | `assets/js/journey.js`, `assets/js/hearth-api.js`, `assets/js/scene-first.js` | Journey students, levels, lesson records, notes, ratings, active student. | Student memory | High |
| `hearth-journey-active-student` | `assets/js/journey.js` | Active Journey student ID. | Student/UI state | Medium |
| `hearth-foundation-progress` | `simulator.html` | Completed Foundation topic IDs. | Student progress | High |
| `hearth-doing-progress` | `simulator.html` | Doing drill progress states. | Student progress | High |
| `hearth-knowing-progress` | `simulator.html` | Completed Knowing topics. | Student progress | High |
| `hearth-knowing-state` | `simulator.html` | Knowing UI/book/topic state. | Mixed progress/UI state | Medium |
| `hearth-knowing-quiz` | `simulator.html` | Knowing quiz scores. | Student progress | Medium |
| `hearth-practice-state` | `simulator.html`, `assets/js/practice-room.js` | Practice preferences/current drill/completed state. | Student practice state | High |
| `hearth-practice-log` | `simulator.html`, `assets/js/practice-room.js`, `assets/js/scene-first.js` | Practice session records. | Student memory | High |
| `hearth-practice-notes` | `assets/js/practice-room.js` | Practice notes/reflections. | Student memory | High |
| `hearth-create-current` | `assets/js/create-workshop.js`, `assets/js/scene-first.js` | Current Create seed/project prompt state. | Creative project draft | Medium |
| `hearth-create-projects` | `assets/js/create-workshop.js` | Saved Create projects/seeds. | Creative project memory | Medium |
| `cauldron-notes` | `simulator.html` | Older Create cauldron notes textarea. | Creative notes | Low/medium |
| `hearth-insights` | `simulator.html` | Logged insight/aha moments. | Student reflection | Medium |
| `hearth-notebook-*` | `simulator.html` | Notebook text per context. | Student notes | Medium |
| `flameNode` | `simulator.html` | Last/current map flame node. | UI state | Low |
| `travelledPaths` | `simulator.html` | Map paths already travelled. | UI/progress visualization | Low |
| `hearth-theme-v2` | `simulator.html` | Theme mode. | UI preference | Low |
| `hearthTheme` | `simulator.html` | Older theme key. | UI preference/legacy | Low |
| `hearthSoundMuted` | `simulator.html` | Sound on/off. | UI preference | Low |
| `hearthParticles` | `simulator.html` | Particle effects on/off. | UI preference | Low |
| `streak` | `simulator.html` | Dashboard streak count. | Student progress summary | Medium |
| `fProgress` | `simulator.html` | Older Foundation progress key. | Legacy progress | Review before migrating |
| `dProgress` | `simulator.html` | Older Doing progress key. | Legacy progress | Review before migrating |
| `kProgress` | `simulator.html` | Older Knowing progress key. | Legacy progress | Review before migrating |
| `hearth-admin-token` | `admin.html`, `simulator.html`, `assets/js/hearth-api.js` | Admin API bearer token. | Auth/session | Security review |

## Dynamic Storage Keys

### `hearth-notebook-*`

Notebook context is dynamic:

`hearth-notebook-` + context

Example:

- `hearth-notebook-general`
- future context-specific notes

Migration note:

These should likely become student notes with a `context` field.

### `hearth-{nodeId}-progress`

Some progress display code reads:

`hearth-` + nodeId + `-progress`

Examples:

- `hearth-foundation-progress`
- `hearth-doing-progress`
- `hearth-knowing-progress`

Migration note:

This pattern should become normalized progress records rather than separate keys per node.

## API Summary

The prototype talks to:

`https://thehearth.pro/api/`

## API Endpoints Seen

| Endpoint action | Seen in | Purpose |
|---|---|---|
| `login` | `admin.html` | Admin login. |
| `health` | `assets/js/hearth-api.js` | API health check. |
| `content-topics` | `assets/js/hearth-api.js`, `assets/js/api-loader.js`, `admin.html`, `simulator.html` | Read/write content topics. |
| `content-drills` | `assets/js/hearth-api.js`, `assets/js/api-loader.js`, `admin.html` | Read/write drills. |
| `content-books` | `assets/js/hearth-api.js`, `assets/js/api-loader.js`, `admin.html` | Read/write books. |
| `content-refs` | `assets/js/hearth-api.js`, `assets/js/api-loader.js`, `assets/js/pdf-viewer.js`, `admin.html` | Read/write references/source links. |
| `content-lessons` | `assets/js/hearth-api.js`, `admin.html` | Read/write lessons. |
| `content-videos` | `simulator.html` | Save/link YouTube videos from the link deposit tool. |
| `content-glossary` | `simulator.html` | Reads glossary terms while linking YouTube content. |
| `journey-students` | `assets/js/hearth-api.js`, `assets/js/journey.js`, `admin.html` | Read/write Journey students. |
| `journey-progress` | `assets/js/hearth-api.js`, `assets/js/journey.js` | Read/write Journey level progress. |
| `journey-records` | `assets/js/hearth-api.js`, `assets/js/journey.js` | Read/write Journey lesson records. |

## API Files and Roles

### `assets/js/hearth-api.js`

This is the main API client.

It defines:

- `window.HearthAPI.getTopics`
- `window.HearthAPI.getDrills`
- `window.HearthAPI.getBooks`
- `window.HearthAPI.getRefs`
- `window.HearthAPI.getLessons`
- `window.HearthAPI.getStudents`
- `window.HearthAPI.getStudentProgress`
- `window.HearthAPI.getStudentRecords`
- save methods for content, Journey, progress, and records
- seed helpers for topics, drills, and books

Important note:

Write methods read `hearth-admin-token` from localStorage and send it as a bearer token.

### `assets/js/api-loader.js`

This tries to load API data and replace local data globals if API data is available.

It may replace:

- `window.KNOWING`
- `window.DOING`
- `window.PRACTICE`

Important note:

This can be confusing if API content is stale, incomplete, or different from local prototype data.

### `assets/js/journey.js`

This file has its own direct fetch calls to:

- `journey-students`
- `journey-progress`
- `journey-records`

Important note:

Journey sync exists in more than one place. Martin should verify which path is intended before relying on it.

### `admin.html`

This is an admin interface for:

- topics
- drills
- books
- references
- lessons
- students

It logs in via `login`, stores `hearth-admin-token`, and sends it as a bearer token.

## Security Notes

### `hearth-admin-token`

The admin token is stored in localStorage.

This is common in prototypes but needs review before production.

Risks:

- any script running on the page can read it
- if the site has an injection bug, the token can be exposed
- tokens should expire and be rotated

Recommendation:

Martin should review authentication/session handling before expanding admin write access.

## Migration Priority

### Move first

Student memory:

- `hearth-journey-v2`
- `hearth-foundation-progress`
- `hearth-doing-progress`
- `hearth-knowing-progress`
- `hearth-practice-log`
- `hearth-practice-notes`
- `hearth-insights`

Why:

This is learner history. It should survive browser/device changes.

### Move later

Creative project memory:

- `hearth-create-current`
- `hearth-create-projects`
- `cauldron-notes`

Why:

Important, but likely after core learning progress and lesson records.

### Keep browser-local or migrate last

UI preferences:

- theme
- particles
- sound muted
- flame node
- travelled paths

Why:

These are experience preferences, not core educational records.

## Recommended Backend Shape

This inventory supports the existing backend priority:

1. Read-only content API.
2. Admin/import pathway.
3. Student profiles.
4. Progress records.
5. Lesson attempts and practice sessions.
6. Notes, insights, reflections.
7. Creative projects.
8. UI preferences if needed.

## Do Not Do Yet

Do not remove localStorage yet.

Do not trust Journey API sync until tested.

Do not let API loader replace local content unless the API data is known to be complete.

Do not expand admin writes without reviewing token/session security.
