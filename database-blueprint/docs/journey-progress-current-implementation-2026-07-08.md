# Journey And Progress Current Implementation - 2026-07-08

Plain English: this note says what is actually built in the prototype right now, what is inferred, and what still needs a proper backend later.

## What Is Built Now

The Journey screen has two main layers:

- the guitar level map, where the learner chooses Level 1 through Level 8
- the level roadmap screen, where each level shows progress across skill categories

The level roadmap is designed to be reused for every Journey level. It is not only a Level 1 page.

The roadmap categories are:

- Rhythm
- Chords & Harmony
- Scales
- Technique
- Improvisation
- Picking
- Fingerstyle
- Theory
- Reading
- Integration

Each category row shows Level 1 through Level 8 dots. The selected level uses that level's colour. Future locked levels still show a muted hint of their colour so the learner can feel what is coming without thinking it is unlocked.

## Where The Code Lives

Journey data and rendering:

- `assets/js/journey.js`
- `assets/js/journey-data.js`

Journey category icons:

- `images/journey-category-icons/`

Guide character catalogue:

- `assets/js/guide-character-data.js`

Whole-simulator progress panel:

- `adapters/header-tools-controller.js`

Global active learner chip:

- `simulator.html`

## Active Learner/Profile

The app now has a top-bar active learner chip.

Current behaviour:

- it displays the active Journey learner
- clicking it opens Journey
- Journey opens the learner selector

This is still local-browser prototype state, not real account logic.

The intended direction is:

- the active profile should eventually apply to the whole simulator
- Ayla's learning and Jen's learning should not be mixed together
- teacher notes for Jen should belong to Jen's profile, while still being available to Ayla as teacher

## Progress Data That Is Real Today

The Progress button currently reads from local browser storage and shows:

- Foundation progress
- Journey lesson progress for the active profile
- Doing drill progress
- Knowing/Study topic progress
- Practice drill progress
- Practice session count and minutes, when logged
- Create saved seeds/projects
- practice streak

The current UI presents this as a compact whole-simulator progress panel with:

- active learner context
- current Journey level
- overall tracked progress
- next best move
- progress bars for trackable learning areas
- evidence counts for practice, creation, and Journey lessons

This is useful, but it is still a prototype. It should not be treated as the final data model.

## Local Progress Events

The prototype now also writes a simple local event timeline:

`hearth-progress-events`

This is not a replacement for the existing local lists yet. It is a bridge toward backend-style progress events.

Current event writers:

- Journey lesson completion writes `lesson_completed`
- Practice drill completion writes `practice_session_completed`
- Practice candle completion writes `practice_session_completed`
- Create saved seed/project writes `creation_saved`
- Knowing topic completion writes `concept_read`
- Study Key topic unlock writes `concept_read`

The event store lives in:

- `adapters/progress-event-store.js`

This gives the prototype a cleaner migration path because Martin can see the kind of event data the frontend wants to produce.

## Progress That Is Inferred Or Tagged

Journey category progress can now use explicit lesson category tags.

If a lesson has `categoryTags`, those tags count directly toward the Journey roadmap category rows.

The code still has a text-based fallback. It scans lesson titles, summaries, blocks, concepts, tasks, and tags to decide which lessons touch each category when explicit tags are missing.

Future lesson data should keep using explicit category tags such as:

- rhythm
- chords-harmony
- scales
- technique
- improvisation
- picking
- fingerstyle
- theory
- reading
- integration

Then progress can be exact instead of guessed from text.

## Important Design Decisions

Journey is not a dashboard.

It should feel like:

`a clear learning map`

not:

`a corporate analytics screen`

The learner should be able to see:

- where they are
- what this level asks of them
- what category is active next
- what is finished
- what is coming later

The whole-simulator progress screen should later use the same logic, but across all nodes.

## Backend Handoff Notes

Martin should not copy the local storage shape directly.

The backend should eventually store progress as events:

- learner profile id
- teacher profile id, when relevant
- node id
- journey level id
- category id
- lesson id
- block id
- drill id
- source/book/video id
- event type
- duration
- rating/confidence
- reflection/note
- created timestamp

Useful event types:

- lesson_started
- lesson_completed
- block_completed
- category_touched
- drill_practiced
- practice_session_completed
- concept_read
- concept_rated
- book_opened
- recording_saved
- creation_saved
- reflection_written
- teacher_note_added

## Next Best Build Steps

Done in the current prototype:

- Level 1 Journey lessons have explicit category tags.
- The Progress button has a stronger whole-simulator snapshot panel.
- Practice and Create now write simple local progress events.
- Journey lesson completion now writes simple local progress events.
- Knowing and Study now write simple local progress events.

Next:

1. Decide how Ayla-as-teacher and Jen-as-learner should appear in the UI.
2. Add explicit category tags as future Journey levels are authored.
3. Repair or confirm Doing's drill-state save hook, then add a `drill_practiced` event writer.
4. Keep local prototype state simple until the backend shape is ready.
