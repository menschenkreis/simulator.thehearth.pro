# The Hearth Mastery: Migration Readiness Handoff

Date: 2026-07-21

Prepared for: Martin and the developer rebuilding The Hearth on a reusable simulator platform

Prototype branch: `audit/orchestrator`

Verified checkpoint: `377fa9988c92740677e0b199373ad6a9608796a6`

## Executive Decision

The Hearth is a valuable, clickable product prototype, not a production application.
Its strongest work is the learning design, visual metaphors, node identities, learner
flows, and emerging evidence contracts. Its weakest work is the application shell,
identity and persistence layer, deployment story, and accumulated ownership overlap.

Do not merge the Hearth and ZamKee repositories. Build a reusable learning-platform
shell using the architectural direction already present in ZamKee, then implement The
Hearth as a second product on that shell.

Do not port `simulator.html` into a framework component. Treat the prototype as a
behaviour and design reference. Rebuild one verified vertical slice at a time and use
the old prototype beside it as the acceptance reference.

Feature expansion should now pause except for content documentation, source review,
and small prototype fixes that are necessary to demonstrate intended behaviour.

## What Is Working Now

The prototype provides a complete first-click circuit. All nine map nodes can open and
close in the current browser build:

- Foundation
- The Hearth
- Mastery
- Do
- Practise
- Play
- Know
- Study
- Create

The shared map and the Journey entrance are coherent enough to demonstrate the product.
Several nodes also have one functional deeper slice. The prototype therefore contains
enough evidence to rebuild from; more architecture should not be added to the static
shell.

The latest checkpoint also repairs two concrete presentation defects:

- Study now uses the approved `images/study/study-key-chamber-concept-v1.png` scene,
  with semantic door controls layered over it.
- Returning from Study rebuilds the map's invisible click targets, so the map remains
  usable.

## Current Architecture In Plain Language

```text
simulator.html (4,810 lines)
  -> global panels and shared DOM containers
  -> many script files loaded in a specific order
  -> older inline renderers plus newer adapters
  -> node data, lesson data, UI state, and navigation mixed across layers
  -> localStorage/sessionStorage for most learner memory
  -> direct browser calls to https://thehearth.pro/api/
  -> externally hosted PHP/MySQL API whose deployment and ownership are separate
```

Newer code has started extracting useful boundaries into `core/`, `adapters/`, data
files, JSON schemas, and documentation. Those boundaries are useful source material,
but the runtime still depends on globals, script order, shared containers, inline
handlers, and compatibility aliases.

The prototype currently contains 194 image files using approximately 142 MB. Asset
loading, responsive variants, compression, cache policy, and media rights require a
separate production pass.

## Destination Direction

ZamKee currently supplies a practical reference direction:

- Next.js and React
- TypeScript
- explicit routes and components
- server API routes
- a central authentication/session boundary
- Prisma
- Postgres hosted through Supabase
- Supabase Auth integration
- executable health, content, access, flow, and release checks

The Hearth should adopt this type of shell, not ZamKee's medical content model or
multiple-choice-centred product experience.

A sensible repository shape is:

```text
apps/
  hearth-web/          Hearth product and guitar experience
  zamkee-web/          medical product
packages/
  simulator-core/      identity, journeys, lessons, events, handoffs, resources
  simulator-ui/        shared accessible shell components only
  hearth-domain/       guitar nodes, drills, fretboard, tuner, musical data
  zamkee-domain/       medical syllabus, questions, exam behaviour
```

This package split is a target, not a requirement for the first migration commit. A
clean Hearth app inside the existing workspace is preferable to prematurely designing
a perfect platform.

## Product Rules That Must Survive

1. **Map is where the learner can go.** It supports free exploration.
2. **Journey is the path the learner is walking.** It recommends what comes next.
3. **Nodes are the places where work happens.** Journey routes into them and reads
   evidence back; it does not imitate every node internally.
4. **Foundation is the threshold, not Level 1.** It teaches how to enter the learning
   world. Journey Level 1 begins afterward.
5. **Evidence is not completion theatre.** Opening content is contact, not mastery.
6. **Learners remain separate.** Ayla and Jen must never share progress accidentally.
7. **Teacher/co-learning mode matters.** Ayla prepares, teaches, records what happened,
   and uses that evidence to find the next safe gradient for Jen.
8. **Drills must return to music.** Technical work should lead to sound, groove,
   jamming, a song, or creation.
9. **The interface is scene-led.** The guitar, bookshelf, chamber, cauldron, atlas,
   phoenix, and body are meaningful places, not decorative dashboard art.
10. **The guide is contextual.** It responds to the current learner, task, result, and
    next action rather than repeating generic encouragement.

The current long-form lesson rhythm to preserve and rationalise is:

`Review -> Tune in -> Warm up -> Learn -> Try -> Practice -> Play -> Create -> Mastery -> Review notes`

Not every session needs every block. Short sessions may compress the same learning
logic rather than inventing a separate system.

## Node Readiness

| Area | What is worth preserving | What must be rebuilt or completed |
| --- | --- | --- |
| Map | Symbolic world, nine node identities, flame/path idea, scene-led entrances | Data-backed node registry, route ownership, responsive map, accessible controls |
| Journey | Guitar-level map, capability roadmap, lesson shell, active learner concept | Evidence-based level truth, Entry Check separation, real node round trips, mobile layout |
| Foundation | Gateway and ten-fret metaphor, Fret 0 teaching slice | Learner-scoped evidence, nine uneven themes, resume, mobile and accessibility |
| Do | Hand-focused drill rooms, reviewed drill set, multi-day evidence logic, handoff contract | Framework components, database attempts, exact media/TAB assets, broader drill validation |
| Practise | Four entrances, six-step planned session, candle timer, reflection and recording concept | Learner-scoped unfinished sessions, durable recordings, exact Do handoffs, history UI |
| Know | Shelf/library identity, stable topic IDs, topic reader, practical proof checks | One authoritative reader, reliable learner-scoped progress, stronger sources and topic depth |
| Study | Key Chamber, six door types, learner-scoped state, subject-family templates | Rich subject-specific door interactions, durable evidence, full handoff tests |
| Play | Musical application identity and Mississippi vertical slice | Source review, media fallbacks, cultural review, additional routes, Practice/Create returns |
| Create | Cauldron, learner-scoped seeds, source context, archive and handoff concept | Level-safe prompt policy, richer artifacts, recording links, Journey evidence feedback |
| Mastery | Phoenix entrance and Witness/Notice/Try/Carry loop | True exemplars, source rights, more encounters, reflection and return evidence |
| Hearth | Inner-instrument purpose: brain, hands, eyes, ears, body, breath, feeling | One complete Brain pilot, sourced claims, guided action/evidence, less dashboard-like first click |
| Shared progress | Canonical event schema, handoff proposal, read-only migration preview | Central active-learner service, server persistence, reviewed migration, end-to-end enforcement |

Study deserves a specific warning: the approved generated chamber image is now in the
live first click and all six doors rotate correctly. The deeper content is not finished.
Do not mistake successful image wiring for a complete Study learning engine.

## Shared Contracts Worth Carrying Forward

The most valuable architecture work is documented in:

- `core/contracts/progress-event-envelope-v1.schema.json`
- `core/contracts/handoff-envelope-v1.schema.json`
- `core/contracts/evidence-stage-compatibility-v1.json`
- `database-blueprint/docs/shared-event-and-handoff-contracts-proposal-v1.md`
- `database-blueprint/docs/shared-learner-storage-inventory-and-migration-preview-v1.md`

The evidence progression is:

`contact -> attempt -> demonstration -> application -> consolidation`

An event is an immutable receipt for learner activity. A handoff is a precise task
invitation and is not evidence that the task was completed. Preserve this distinction.

The V1 contracts should guide the new schema, but Martin should review and simplify
them before treating them as permanent public APIs.

## Persistence And Identity Risks

The read-only inventory found 36 storage key or key-pattern families. They mix:

- already learner-scoped state;
- records that sometimes carry a learner ID;
- single active-learner records;
- ambiguous global legacy state;
- two competing profile/identity models.

Do not automatically import local browser data. The existing migration preview is
correctly read-only. A future migration must export original values, identify ownership,
use idempotent manifests, preserve source values, and support rollback.

The most urgent backend invariant is one verified active user and one explicit learner
profile ID. Every saved attempt, session, reflection, artifact, and event must carry the
learner ID. Teacher access should be an explicit relationship, not a profile switch that
trusts the browser.

## External API And Security

The browser still calls `https://thehearth.pro/api/` directly from:

- `assets/js/hearth-api.js`
- `assets/js/journey.js`
- `adapters/link-deposit-controller.js`

The API and MySQL database are hosted outside this repository. Deployment, schema
versioning, authentication, backups, monitoring, and ownership are not reproducible
from the current Git checkout. Treat API synchronisation claims as unverified until the
server is inspected.

The prototype also stores an admin token in localStorage. This is not an acceptable
production authentication design.

Credentials have previously been shared in project conversations. Rotate all webhost,
system, email, database, and related credentials before any wider testing. Do not copy
those values into this repository, migration notes, client code, or issue trackers.

## What Not To Carry Forward

- The monolithic HTML shell
- Rendering multiple unrelated nodes into `#p-foundation`
- Inline `onclick` ownership and global function overrides
- Script-order dependency as module composition
- Duplicate legacy and replacement renderers running together
- Global localStorage progress
- Name-based learner matching
- Browser-held admin credentials
- Direct production API calls from product components
- Hardcoded content placement that should be data
- Loading every large visual asset on initial entry
- Treating self-rating, navigation, or opening content as demonstrated ability

## Migration Order

### 0. Freeze And Preserve

- Tag this checkpoint and archive a browser-viewable build.
- Export the current content/data registries and approved asset list.
- Record screenshots of the map, Journey, and every first and second click.
- Rotate credentials and document the old API without changing it.

### 1. Build The Product Shell

- Create the Hearth app in the reusable Next.js/TypeScript direction.
- Add central auth/session and active-learner services.
- Add map/node registry, routing, error handling, and loading states.
- Establish tests and a preview deployment before node migration.

### 2. Establish Learning Contracts

- Review the V1 event and handoff contracts.
- Implement append-only server events and derived summaries.
- Implement explicit learner, teacher, lesson, activity, attempt, and session IDs.
- Keep content records separate from learner memory.

### 3. Prove One Vertical Slice

Recommended proof:

`Journey Level 1 -> Do A-minor task -> feedback/evidence -> Practise recommendation -> Journey review`

It proves identity, routing, content, attempts, evidence, handoffs, reflection, and return
navigation without rebuilding every node.

### 4. Rebuild Nodes In Risk Order

1. Journey and Do
2. Practise
3. Know and Study
4. Create and Play
5. Foundation
6. Mastery and Hearth

The order may change after Martin reviews dependencies, but do not rebuild all nodes in
parallel before the vertical slice proves the shared shell.

### 5. Migrate Content And Legacy Memory

- Import reviewed content through scripts with stable IDs.
- Run the existing storage preview against real test profiles.
- Manually resolve ambiguous Ayla/Jen ownership.
- Migrate only reviewed records with manifests and rollback.

### 6. Responsive Beta

- Test desktop, iPad, and phone.
- Add microphone/media permissions, durable recording storage, offline behaviour,
  privacy controls, source rights, analytics, and error monitoring.
- Run closed lessons with Ayla and Jen before wider release.

## First Rebuild Acceptance Test

The first shared-platform slice is complete only when:

1. Ayla and Jen can sign in or be selected through an authorised account relationship.
2. Their progress remains separate across devices and refreshes.
3. Journey sends an exact task to Do using stable IDs.
4. Merely opening Do records no competence.
5. An actual attempt records learner, task, evidence stage, source, time, and return route.
6. Duplicate submission is idempotent.
7. Practise receives the exact recommended follow-up.
8. Journey reads the resulting evidence and changes the next action honestly.
9. A developer can deploy the slice from documented repository commands.
10. The old PHP/MySQL API can be unavailable without breaking the new slice.

## Verification At This Checkpoint

Passed:

- prototype smoke check;
- core JavaScript smoke check through the repository's JXA runner;
- core smoke check;
- renderer ownership check;
- local reference check across 285 references;
- `git diff --check`;
- live Study desktop and narrow mobile inspection;
- Study door rotation and locked-door behaviour;
- Study return to Map with nine restored click targets;
- all nine map node first-click dialogs.

Not claimed:

- production API health;
- database correctness or backups;
- authentication/security readiness;
- persistent learner migration;
- complete content/source accuracy;
- full automated browser suite;
- Node CLI syntax pass in this shell, because `node` was unavailable. The repository's
  JavaScript smoke runner did pass.

## Immediate Instruction For Martin

Review this checkpoint as a product specification and migration source, not as the
foundation of the new runtime. Begin with the shell, identity boundary, event/handoff
contract review, and one Journey-to-Do vertical slice. Preserve the metaphors and
learning decisions above, but replace the storage, routing, rendering ownership, API,
and deployment architecture.

Before implementation, agree with Ayla on three things only:

1. the first beta's learner/teacher account model;
2. the exact Level 1 vertical-slice task;
3. which existing visuals are reference assets versus final assets.

Everything else can be migrated incrementally after that slice is trustworthy.
