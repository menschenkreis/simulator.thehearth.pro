# The Hearth Mastery: Pre-Migration Readiness Audit

Date: 2026-07-28

Audience: Ayla, Martin, and the developer rebuilding The Hearth on a reusable
learning-platform shell

Repository: `simulator.thehearth.pro`

Audited branch: `main`

Audited checkpoint: `74cfff5` (`origin/main` and `main` were aligned before the
local audit fix)

Companion document:
`database-blueprint/docs/hearth-migration-readiness-handoff-2026-07-21.md`

## Executive Summary

The Hearth is ready to hand over as a detailed, clickable product prototype. It is
not ready to become the production codebase.

The prototype now demonstrates the product clearly enough to rebuild:

- the nine-node map;
- the Journey level map and Level 1 capability roadmap;
- scene-led node entrances;
- representative second-click rooms;
- learner-aware evidence concepts;
- cross-node handoff intentions;
- the Ayla/Jen teacher and learner use case.

The current runtime should not be extended into the final architecture. It still
depends on a 4,816-line `simulator.html`, 162 script tags, global functions,
script-order coupling, browser storage, and direct browser calls to an externally
hosted API. There is no reproducible application build or deployment mechanism in
this repository.

The correct next move remains:

1. preserve this prototype as the behavioural and visual reference;
2. establish the reusable shell, identity boundary, database, deployment, and
   event/handoff contracts;
3. rebuild one end-to-end learning slice;
4. migrate nodes incrementally after that slice is trustworthy.

## New Critical Repository Finding

During this audit, 720 untracked numbered files appeared in the worktree. They are
copies with names such as `file 2.js`, `file 3.js`, and duplicated images and
documents. They were not created or deleted by this audit.

This is a handoff blocker because a developer can accidentally import, edit, or
commit the wrong copy. It also makes repository searches and asset inventories
unreliable.

The completed content audit found:

- 717 files byte-identical to their tracked originals;
- one older Journey data copy;
- two identical copies of a retired renderer;
- no missing originals and no unique current implementation.

All 720 are safe cleanup candidates, subject to explicit deletion approval and a
backup. The full evidence and cleanup procedure are in
`database-blueprint/docs/repository-numbered-copy-cleanup-audit-2026-07-28.md`.

It is an inference, not a confirmed cause, that a cloud-sync or bulk-copy process
created these numbered copies.

## Git And Branch State

At audit start:

- `main` and `origin/main` both pointed to `74cfff5`;
- the requested cleanup, Do, and orchestrator work was present in `main`;
- there were no commits ahead of or behind `origin/main`.

Merged into `main`:

- `cleanup/handoff-architecture`
- `audit/orchestrator`
- `build/do-node-continuation`
- the node continuation work for Create, Foundation, Hearth, Journey, Know,
  Mastery, Play, and Practice
- `integration/merge-handoff-do-audit-20260728`

Not ancestry-merged:

- `build/shared-learner-progress`
- `build/study-node-continuation`

Interpretation:

- Shared Progress is patch-equivalent to work already present in `main`; do not
  merge it again merely to make the branch graph look tidy.
- The Study branch is not patch-equivalent, but its subject-family templates and
  safe fallback are already present in `main`, together with stronger
  subject-scoped persistence. Review it as history, not as an automatic merge.

No branches were merged or deleted during this audit. Nothing was pushed or
deployed.

## Current Architecture

The runtime is a static-browser application:

```text
simulator.html
  -> shared panels and navigation
  -> 162 ordered script tags
  -> legacy global renderers
  -> newer core modules and adapters
  -> data files and media assets
  -> localStorage/sessionStorage learner memory
  -> optional direct calls to https://thehearth.pro/api/
```

Useful boundaries have emerged:

- `core/` contains domain logic and candidate contracts;
- `adapters/` contains newer renderers, controllers, stores, and bridges;
- `assets/js/` contains product data and legacy application logic;
- `database-blueprint/` contains schemas, decisions, migration previews, and
  continuation briefs;
- `images/` contains the approved product scenes and node assets.

These boundaries are valuable migration source material. They do not remove the
runtime's dependence on globals, inline handlers, shared DOM containers, and load
order. The duplicate renderer ownership check passes because the current overrides
are controlled, but the underlying arrangement remains fragile.

## External API, Persistence, And Security

The browser still talks directly to `https://thehearth.pro/api/`:

- `assets/js/hearth-api.js:4`
- `assets/js/journey.js:182`
- `adapters/link-deposit-controller.js:15`

`assets/js/hearth-api.js:63-70` also builds authenticated write requests using an
admin token read from localStorage. That must not be carried into production.

The PHP/MySQL API, database migrations, hosting configuration, backups, monitoring,
and deployment procedure are not reproducible from this repository. API health and
database correctness therefore remain unverified.

The deployed URL was reachable during this audit, but it did not present the local
prototype audited here. It opened an older `Enter the Hearth` name/invite-code entry
screen. This confirms that `main`, the local clickable prototype, and production are
not connected by a clear, reproducible release trail.

Most prototype learner state remains device-local. The shared event store is a good
contract experiment, but its persistence key is still browser storage
(`adapters/progress-event-store.js:17`). The read-only migration inventory remains
the correct approach; do not auto-import ambiguous local data.

Before any wider testing:

- rotate all previously shared webhost, system, email, database, and related
  credentials;
- remove browser-held administrative credentials;
- establish server-side authentication and authorization;
- define one account and active-learner boundary;
- make every session, attempt, reflection, recording, artifact, and event carry an
  explicit learner ID.

## Live Click-Through Result

All nine first-click node dialogs opened successfully in the local browser:

| Node | First click | Representative deeper flow | Readiness judgment |
| --- | --- | --- | --- |
| Foundation | Pass | Gateway -> Fret 0 -> guided threshold | Strong prototype slice |
| Hearth | Pass | Inner Instrument -> Brain -> Understand | Strong concept; one pilot chamber |
| Mastery | Pass | Phoenix -> Watch a master -> Witness | Valid first encounter |
| Do | Pass | Guitar -> Left Hand -> drill choices | Strongest evidence-oriented node |
| Practise | Pass | Planned session -> Arrive | Valid six-step practice shell |
| Play | Pass | Atlas -> Mississippi route | Valid single cultural/music slice |
| Know | Pass | Shelf -> Rhythm book -> Time Signatures | Useful library and proof model |
| Study | Pass | Key Chamber -> Word activity | Image and routing work; depth incomplete |
| Create | Pass | Cauldron -> current seed | Working seed shell; prompt safety incomplete |

Journey also passed:

- guitar level map opened;
- Level 1 opened;
- Level 1 showed the capability roadmap;
- existing Do evidence appeared in the relevant category.

This means the prototype is demonstrable. It does not mean every node is complete.

## Study Diagnosis

The approved generated Study image is live at
`images/study/study-key-chamber-concept-v1.png` and is rendered by
`adapters/study-key-chamber-viewer.js:113`.

The Study model correctly distinguishes rhythm, harmony, scales, technique,
reading, and listening subjects, with a safe general fallback
(`adapters/study-key-chamber-model.js:191-211`). Automated tests contrast A minor
pentatonic, Time Signatures, and an unknown subject to prevent content leakage.

What is still incomplete is the learning endpoint. Opening a door currently
produces:

- a written activity;
- a written proof condition;
- an optional note;
- learner self-rating.

That is enough to demonstrate the six-door learning model. It is not yet a rich
Study engine. Production Study needs subject-specific media or diagrams where
appropriate, system-checkable answers where possible, durable evidence, and exact
handoffs back to Practice and Journey.

Do not generate another Study entrance image. The image is not the missing part.

## Findings By Severity

### Critical

1. **Repository contamination:** 720 untracked numbered copies appeared during the
   audit. Clean and verify before handoff.
2. **No production identity boundary:** learner selection and much progress remain
   browser-controlled.
3. **External API ownership gap:** the API/database/deployment system is outside the
   repository and cannot be reproduced or audited here.
4. **Client-held admin token:** privileged writes can use a token stored in
   localStorage.

### High

1. **Monolithic runtime:** `simulator.html` is 4,816 lines and loads 162 scripts.
2. **No reproducible build/deploy pipeline:** no package manifest, typed build,
   framework build, CI workflow, or documented production deployment was found.
3. **Competing storage histories:** the migration preview found 36 storage key or
   key-pattern families and ambiguous learner ownership.
4. **Global and script-order coupling:** current adapters coexist with legacy
   renderers and inline event handlers.
5. **Progress truth is uneven:** some nodes use canonical evidence concepts while
   older paths still infer progress from opening, self-rating, or counts.

### Medium

1. Study interactions remain mostly text and self-report.
2. Create can still select Level 1 prompts that assume techniques such as harmonics.
3. Journey Levels 2-8 are primarily design placeholders.
4. Node content depth is uneven; one strong vertical slice often sits beside several
   incomplete routes.
5. Media rights, source records, accessibility, and responsive behaviour require
   systematic production review.
6. Large images need responsive variants, compression, lazy loading, and cache rules.

### Low

1. Some naming remains inconsistent (`Practise`/`Practice`, legacy node IDs, old
   compatibility aliases).
2. Old and new documentation copies need consolidation after the numbered-file
   incident is resolved.
3. Development-only previews and source assets should be excluded from production
   bundles.

## Small Fix Made During This Audit

The global Map control could return to the map panel without rebuilding the
transparent node hit layer. The map looked correct but its nodes stopped responding
after some deeper routes.

The fix in `simulator.html:3803-3805` now rebuilds the hit layer whenever the global
Map control activates the map. A regression marker was added to
`tools/prototype_smoke_check.py`.

Browser verification confirmed:

`Study -> activity -> global Map -> Foundation`

The Foundation dialog opened correctly after the return.

No other feature or visual redesign was performed.

## Verification

Passed after the local fix:

- prototype smoke check;
- core JavaScript smoke check;
- core smoke check;
- renderer ownership check;
- local reference check across 285 active references;
- JSON schema parsing;
- `git diff --check`;
- all nine first-click node dialogs;
- representative deeper flow in every node;
- Journey map and Level 1 capability roadmap;
- Study subject-correctness checks;
- Study return-to-map regression.

Not verified:

- external API health or authorization beyond the deployed entry page being
  reachable;
- MySQL schema, backups, or data correctness;
- production deployment;
- cross-device persistence;
- full phone/tablet coverage;
- microphone and durable media storage;
- complete source and rights review;
- all branch work after removing the 720 duplicate files.

The Node CLI was unavailable in the audit shell, so the repository's alternate
JavaScript smoke runner was used.

## Preserve, Rebuild, Retire

### Preserve

- the nine-node product language;
- Map, Journey, and node responsibilities;
- Foundation as threshold rather than Level 1;
- the scene-led visual metaphors;
- the guide as contextual teaching presence;
- Ayla/Jen teacher and learner workflows;
- capability, evidence-stage, and handoff concepts;
- reviewed content IDs and approved assets;
- the lesson rhythm and the rule that drills return to music.

### Rebuild

- application shell and routing;
- account, teacher, and learner identity;
- persistence and derived progress;
- backend API and database ownership;
- deployment, environments, monitoring, and backups;
- media/recording storage;
- accessible interaction components;
- node screens as typed, tested modules;
- content delivery and source metadata.

### Retire

- the monolithic HTML runtime;
- inline `onclick` ownership;
- direct production API calls from UI modules;
- localStorage as authoritative learner history;
- browser-held admin tokens;
- duplicate reader/renderer implementations;
- global function overrides and load-order composition;
- numbered duplicate files;
- progress inferred from opening a screen.

## Recommended Rebuild Slice

Build this first:

`Journey L1 -> exact Do task -> learner attempt -> evidence event -> Practice recommendation -> Journey review`

Use a real A minor pentatonic task that Ayla and Jen already understand. This one
slice proves:

- authenticated account and learner separation;
- stable content and activity IDs;
- routing and return context;
- attempts and evidence stages;
- idempotent events;
- Practice handoff;
- Journey-derived progress;
- deployment and database persistence.

Do not rebuild all nine nodes in parallel before this works.

## Reusable Platform Boundary

Reusable across Hearth and ZamKee:

- accounts, roles, learner profiles, and teacher relationships;
- journeys, levels, lessons, steps, sessions, and attempts;
- immutable evidence events and derived progress;
- handoffs and return routes;
- resource/source records;
- media attachments;
- feature flags, audit history, and deployment shell;
- accessible shared navigation and feedback components.

Hearth-specific:

- the world map and node metaphors;
- guitar fretboard, tuner, metronome, tabs, notation, and audio interaction;
- Foundation, Do, Practice, Play, Know, Study, Create, Mastery, and Hearth content;
- guitar capability taxonomy and musical evidence rules;
- the Hearth visual language and guide character.

ZamKee-specific:

- medical syllabus and topic hierarchy;
- question banks and exam simulation;
- medical source requirements;
- exam readiness and assessment rules.

The products should share a platform, not a single user experience.

## Roadmap

### Before Migration Starts

- stop the numbered-copy process and restore a clean worktree;
- tag/archive the verified prototype;
- rotate credentials;
- export approved assets, content IDs, learner notes, and contract documents;
- agree on account/teacher/learner rules;
- choose the exact A minor vertical-slice task.

### First Week

- create the Hearth product inside the reusable TypeScript/React/Postgres direction;
- establish preview deployment and CI;
- implement authentication and learner context;
- review and simplify the V1 event and handoff contracts;
- create the node registry and route shell.

### First Month

- complete the Journey -> Do -> Practice -> Journey slice;
- prove Ayla/Jen separation across devices;
- add server-persisted attempts and evidence;
- add automated browser tests;
- migrate only the content and assets required for that slice.

### Longer Term

- migrate Know and Study with a unified content/source system;
- add Create artifacts and recordings;
- harden Play cultural/source material;
- rebuild Foundation, Mastery, and Hearth pilots;
- expand Levels 2-8 only after Level 1 evidence rules are trustworthy;
- add responsive, accessibility, privacy, media-rights, analytics, monitoring, and
  backup acceptance gates.

## Instruction To Martin

Treat the current prototype as a product specification you can click, not code to
modernize file by file.

Begin by cleaning the repository copies, freezing the reference build, and agreeing
on identity plus the first vertical slice. Preserve the metaphors, learner experience,
content decisions, stable IDs, and evidence intent. Replace the runtime shell,
storage, backend, authentication, routing, deployment, and module ownership.

The prototype has reached the point where another visual pass adds less value than a
trustworthy platform slice.
