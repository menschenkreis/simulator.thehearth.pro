# Backend Rebuild Priorities V1

## Plain-English Goal

The first backend rebuild should make The Hearth's content and progress survive outside the browser.

It should not try to rebuild every prototype feature at once.

The current prototype already proved the world, metaphors, and learning systems have life. The next step is to give them a stable skeleton.

## What Matters Most

### 1. Stable World Structure

Build the 8-node world as data:

- Foundation
- Doing
- Knowing
- Practice
- Study
- Create
- Hearth
- Mastery

Also allow optional pathways like Play / World Traditions without forcing them into the core 8.

Why first:

Everything else attaches to nodes.

### 2. Content Library

Create a clean home for:

- roadmap items
- lessons
- TeachingEngine steps
- drills
- source notes
- books
- media/resources
- create prompts

Why second:

The content is the real asset. The code is replaceable.

### 3. Source Library

Separate:

- book identity
- file copies
- source notes
- citations
- page references

Why third:

Ayla is building from books and references. The system must remain source-traceable.

### 4. Student/Profile Data

Move only the important localStorage data first:

- Journey students
- practice logs
- lesson attempts
- drill progress
- reading progress
- reflections

Why fourth:

This is the point where the app stops being trapped in one browser.

### 5. Node Scene Configuration

Store the data that tells the frontend how to render the world:

- map nodes
- map anchors
- SVG coordinates
- node routes
- renderer keys
- action keys

Why fifth:

This supports the beautiful world without hardcoding everything into one HTML file.

### 6. Progression And Accomplishments

Support the game-like layer without overbuilding it.

The first version only needs clean records for:

- progress state
- completed lesson/drill/session
- current quest or suggested next action
- reflection
- accomplishment type

Why:

The app should feel like a world with goals and earned movement, not a content archive.

## Recommended First Build Slice

Build a thin backend/API for:

1. app nodes
2. levels
3. roadmap items
4. resources
5. book sources/files
6. source notes

Then connect the frontend to read those.

Do not start with auth-heavy progress sync unless Martin wants to tackle user accounts first.

Better order:

1. Read-only content API
2. Admin/import pathway for content
3. User accounts and profiles
4. Progress sync
5. Practice/session sync
6. Creative projects

## What To Ignore For Now

Do not migrate these first:

- old orphan HTML pages
- backup HTML files
- exact inline CSS from `simulator.html`
- exact `scene-first.js` behavior
- duplicate node icon variants
- map flame UI state
- travelled path localStorage
- weak auto-generated quizzes
- old hardcoded drill placement as final truth
- old Play node as a forced core node

These can be reviewed later.

## What Should Stay Frontend-Owned

The database should not store giant HTML render functions.

Frontend should own:

- SVG rendering
- fretboard grid component
- bookshelf component
- cauldron animation
- brain map interaction
- TeachingEngine action renderers
- responsive layout
- accessibility behavior

Database should store:

- what exists
- what it means
- where it belongs
- what source supports it
- what renderer key/action key it uses
- what progress should be tracked

## Minimum Database Shape

Content:

- `app_nodes`
- `app_node_map_anchors`
- `app_node_connections`
- `skill_nodes`
- `learning_disciplines`
- `mastery_levels`
- `roadmap_items`
- `resources`
- `media_assets`
- `book_sources`
- `book_files`
- `book_sections`
- `source_notes`
- `teaching_lessons`
- `teaching_steps`
- `practice_drills`
- `create_obstructions`
- `create_combos`

User/student:

- `users`
- `student_profiles`
- `progress_records`
- `lesson_attempts`
- `practice_sessions`
- `student_notes`
- `creative_projects`
- `student_accomplishments`

Future reusable engine:

- `learning_domains`
- `domain_renderers`
- `domain_settings`

This future layer matters because guitar is the first simulator, not the only simulator.

## Biggest Migration Warning

Do not remove localStorage all at once.

Recommended migration:

1. Keep localStorage as fallback.
2. Add read-only API content.
3. Add login/profile later.
4. Sync progress after the content model is stable.
5. Add conflict rules once sync exists.

## Suggested Martin Sequence

### Phase 1: Stabilise Content Read Model

Goal:

Frontend can ask the backend for nodes, levels, roadmap items, resources, books, and source notes.

Avoid:

User accounts and progress sync unless necessary.

### Phase 2: Build Admin/Import Path

Goal:

Ayla can keep developing the knowledge base without editing code files.

Support imports from CSV/JSON first.

### Phase 3: Add Profiles And Progress

Goal:

Student profiles, lesson attempts, practice logs, and progress records become database-backed.

Keep local fallback.

Include:

- private teacher notes
- assigned home tasks
- student gaps and interests
- teacher-prep notes for what Ayla needs to study next
- lesson reflections that can feed the guide character

### Phase 4: Connect Node Interiors

Goal:

Doing, Knowing, Create, Hearth, Foundation, and Practice read their core content from data.

### Phase 5: Polish And Expand

Goal:

Videos, PDFs, songs, creative projects, dashboards, and advanced Mastery content mature after the skeleton is sound.

## Current Blueprint Files Martin Should Start With

- `database-blueprint/docs/martin-database-handoff.md`
- `database-blueprint/docs/backend-rebuild-priorities-v1.md`
- `database-blueprint/schema/the_hearth_mastery_schema_v1.sql`
- `database-blueprint/docs/prototype-artifact-policy.md`
- `database-blueprint/docs/prototype-inventory-snapshot-v1.md`
- `database-blueprint/docs/foundation-comprehensive-blueprint-v1.md`
- `database-blueprint/docs/map-node-registry-v1.md`
- `database-blueprint/docs/node-interior-architecture-v1.md`
- `database-blueprint/docs/book-library-decisions.md`

## One-Sentence Summary

Build the stable content and progress spine first; let the beautiful node scenes attach to it without copying the prototype's fragile wiring.
