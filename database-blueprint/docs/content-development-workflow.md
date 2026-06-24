# Content Development Workflow

This is the process I recommend while Martin works on the technical rebuild.

## Phase 1: Stabilise the Vocabulary

Before writing hundreds of lessons, agree on the words the system uses.

Decisions to lock:

- The 8 app nodes
- The skill nodes
- The level names
- Status values
- Resource types
- Song statuses
- Practice rating scale

Why this matters:

If the vocabulary keeps changing, the database becomes muddy. Stable names let everything connect.

## Phase 2: Expand the Roadmap

The current roadmap has 14 broad stages. That is a good outline, but it is not yet lesson-sized.

For each roadmap stage, define:

- learning objective
- key concepts
- practice tasks
- pass condition
- song/application
- best resources
- which app node it belongs to

Target shape:

- one broad stage can become 3-8 learning units
- each learning unit should be small enough for one focused lesson or practice session

## Phase 3: Attach Resources Intelligently

For every learning unit, ask:

- What is the best external explanation?
- What is the best song example?
- What is the best practice video?
- What is the backup resource if the first one fails?
- Is this beginner-safe, or too steep?

Do not add links just because they are good.

Add links because they serve a precise moment in the learner's path.

## Phase 4: Write Pass Conditions

This is the most important part for making the app feel real.

Every unit needs a pass condition that is observable.

Good:

- Can change between G, C, D, and Em for one minute without stopping.
- Can play the A minor pentatonic shape up and down at 60 BPM with clean notes.
- Can explain what a root note is and find one inside an open chord.

Weak:

- Understands chords.
- Knows rhythm.
- Gets theory.

## Phase 5: Keep the Soul Layer

The app should not become a sterile LMS.

For each learning unit, add one of these:

- metaphor
- emotional hook
- character voice note
- creative application
- listening exercise
- song connection

This is where The Hearth stays The Hearth.

## Phase 6: Prepare for Import

Once the content is stable, we can turn it into:

- SQL seed files
- JSON imports
- admin-panel rows
- spreadsheet exports

The same content should be able to live in a workbook, a database, and the app.

## Working Rhythm With Codex

A good next workflow would be:

1. Pick one roadmap stage.
2. Expand it into lesson-sized units.
3. Add resources.
4. Add pass conditions.
5. Add song applications.
6. Convert it to seed data.
7. Repeat.

Suggested first stage:

**Initiation - The First Ember**

It is foundational, small enough to model well, and will teach us what shape the rest of the database needs.

## Backend Coordination Note

Before drafting too many lessons, keep Martin's first backend slice small:

- app nodes
- levels
- roadmap items
- resources
- book/source metadata
- source notes

See:

- `database-blueprint/docs/backend-rebuild-priorities-v1.md`
- `database-blueprint/docs/content-model-v1.md`

## Current Content Drafting Status

Foundation is now the first content area being expanded into lesson-step plans.

Current batch:

- `database-blueprint/docs/foundation-lesson-step-plan-batch-001.md`
- `database-blueprint/source/foundation_lesson_step_plan_batch_001.csv`
- `database-blueprint/seeds/foundation_lesson_step_plan_batch_001.json`

This batch covers:

- FND-001 Welcome To The Hearth
- FND-002 The 8 Nodes And How To Use Them
- FND-003 How Lessons Work
- FND-004 The Three Learning Barriers
- FND-005 What To Do When You Get Stuck

## Progression Design Note

As content is drafted, every unit should connect to the game loop:

- what is the learner trying to do?
- what counts as a win?
- what changes on the map or in Hearth?
- what recovery path appears if they struggle?
- what accomplishment or progress state might be written?

See:

- `database-blueprint/docs/game-loop-progression-model-v1.md`
- `database-blueprint/source/accomplishment_types_v1.csv`
- `database-blueprint/source/progress_states_v1.csv`
- `database-blueprint/source/quest_types_v1.csv`
