# Core Simulator Comparison Roadmap

This is the small-step roadmap for comparing The Hearth guitar simulator with Zamkee FCP1 without merging or rewriting either app too early.

Plain English: we are looking for the reusable simulator skeleton underneath both projects.

## Current Read

The Hearth is strongest as a world-based learning simulator:

- map, nodes, visual metaphors, guide character, Journey, practice, creation, reflection
- flexible lesson flow and student memory
- currently fragile because it still has legacy browser files, global functions, and localStorage-heavy state

Zamkee is strongest as a structured exam/practice simulator:

- Next.js app, curriculum content, MCQ bank, attempt engine, progress ledger, repair queue, database schema
- clearer backend direction with Prisma/Postgres support
- still has some medical-specific logic mixed into app code and localStorage/database overlap

Important conclusion: the shared engine must support both learning modes:

- Hearth loop: map -> lesson/practice/create -> reflection -> next small step
- Zamkee loop: attempt -> score -> weak area -> repair queue -> targeted review

## Pass 1: Inventory

Goal: know what exists before changing anything.

For Hearth, inspect:

- `simulator.html`
- `core/`
- `adapters/`
- `assets/js/journey-data.js`
- `assets/js/journey.js`
- `assets/js/teaching-engine.js`
- node data files in `assets/js/`
- progress/localStorage wiring

For Zamkee, inspect:

- `apps/web/app/page.tsx`
- `apps/web/app/HomeLanding.tsx`
- `apps/web/lib/curriculum.ts`
- `apps/web/lib/simulator.ts`
- `apps/web/lib/attempt-storage.ts`
- `apps/web/app/progress/`
- `apps/web/app/coverage/`
- `content/fcp1/`
- `prisma/schema.prisma`

Output: a plain-language map of both repos.

## Pass 2: Shared Concepts

Likely reusable engine concepts:

- Simulator: the whole product container
- Learner/Profile: who is using the simulator
- World/Map: the main navigation metaphor
- Node/Chamber/System: a place/topic inside the simulator
- Journey/Programme: the structured path through content
- Level/Block: a larger progression unit
- Lesson/Topic: a teachable unit
- Step: one moment inside a lesson or topic
- Activity: lesson, drill, practice, quiz, reflection, creative task, review set
- Question/Prompt: something the learner answers or responds to
- Attempt/Session: one run of an activity
- Result: score, reflection, completion, rating, or evidence
- Progress: what is started, practised, weak, complete, or mastered
- Repair/Next Queue: what should happen next
- Resource/Source: book, video, PDF, reference, note
- Guide/Mentor: contextual helper voice
- Review Status: draft, reviewed, published, retired

## Pass 3: Keep Domain-Specific

Guitar-specific:

- fretboard, strings, frets, chords, scales, rhythm, technique, music creation, song application
- visual metaphors like temple, cauldron, phoenix, guitar neck, map nodes
- Jen/Ayla lesson companion logic

Medical-specific:

- FCP1 curriculum, body systems, functional domains, official objectives
- MCQs, exam blueprint, mock exams, answer explanations, medical source traceability
- Regi as medical registrar guide and old atlas theme

## Pass 4: Candidate Shared Modules

Start with contracts, not a rewrite.

1. `core-progress`
   Shared shape for learner progress, completion states, weak areas, and review due.

2. `core-session`
   Shared shape for a lesson/practice/test attempt/session.

3. `core-content-graph`
   Shared shape for simulator -> worlds/nodes -> levels/topics -> activities.

4. `core-guide`
   Shared shape for context-aware guide messages.

5. `core-storage-adapter`
   Shared interface for localStorage now, database/API later.

6. `core-review-queue`
   Shared logic for "what should the learner do next?"

## Minimum Proof Of Concept

The smallest useful shared slice should be:

> A generic learner progress + session result model that can represent both a Hearth lesson and a Zamkee MCQ attempt.

Why this first:

- Hearth already has `core/learner-progress.js` and a browser storage adapter.
- Zamkee already has attempt results, weak nodes, coverage statuses, and database schema.
- Both need a cleaner bridge between local progress now and backend storage later.
- This is practical for Martin/backend handoff and does not force either UI to change yet.

## Near-Term Steps

1. Finish repo inventory in a comparison table.
2. Draft the shared data contracts for Progress, Session, Activity, Node, and Guide.
3. Compare Hearth progress states with Zamkee coverage statuses.
4. Propose a backend-ready schema that does not force a rewrite today.
5. Only then choose one tiny implementation experiment.

## Rule For This Work

No merging, no major refactor, and no visual redesign during the audit.

We are building shared language first. Code comes after the contracts are clear.
