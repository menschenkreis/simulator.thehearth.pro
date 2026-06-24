# The Hearth Mastery Database Blueprint

This folder is the calm, structured version of the guitar simulator's knowledge base.

The goal is not to rebuild the app here. The goal is to prepare the **content architecture** so that when Martin rewires the code, the app has a clean body of knowledge to plug into.

## What This Contains

- `source/` - the original handoff files from the zip.
- `seeds/` - database/app-friendly JSON converted from the CSV seeds.
- `docs/knowledge-base-map.md` - plain-English map of what the database should hold.
- `docs/content-development-workflow.md` - how we should keep developing the knowledge base together.
- `docs/martin-database-handoff.md` - technical handoff notes for Martin.
- `docs/learning-profile-onboarding-v1.md` - how learner preferences should shape guidance and recovery.
- `docs/jen-lesson-2026-06-25-live-run-sheet.md` - short live teaching sheet for the next Jen lesson.
- `docs/martin-reply-draft-2026-06-24.md` - reply draft for Martin's backend note.
- `schema/the_hearth_mastery_schema_v1.sql` - first draft SQL schema proposal.

## The Core Idea

The database should not be treated as a filing cabinet of random lessons.

It should become the **memory of the simulator**:

- what the student is learning,
- why it matters,
- what resources support it,
- what practice proves it,
- what creative work unlocks it,
- what progress has actually happened.

## Current Source Truth

The attached workbook contains these useful areas:

- Dashboard
- Roadmap
- Resource Library
- Practice Log
- Songbook
- Skill Rubric
- Dropdowns

The CSV handoff contains:

- 14 broad roadmap stages
- 8 starter resources
- dropdown vocabulary for status, priority, levels, skill nodes, resource types, and song status

## Recommended Next Move

Develop the database in this order:

1. Clean the learning taxonomy: nodes, levels, stages, skill names.
2. Expand the roadmap into real lesson-sized units.
3. Attach resources to each unit.
4. Define practice tasks and pass conditions.
5. Add song applications.
6. Add creative/create-node prompts.
7. Add student progress only after the content model is stable.

This keeps the soul of the app intact while making the structure stronger.
