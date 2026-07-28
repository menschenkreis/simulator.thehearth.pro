# Post-Audit Node Continuation Brief Standard V1

Date: 2026-07-18

## Purpose

After the whole-simulator integration audit, every node must receive a fresh,
shareable continuation brief. These briefs let a specialist Codex task continue
building one node without losing the simulator-wide decisions, contracts, and
evidence established by the audit.

The brief is not a historical summary and not a wish list. It is a verified
handoff from the current branch at a named checkpoint.

## Required Briefs

Create one continuation brief for each learning place:

1. Foundation
2. Do
3. Know
4. Practice
5. Study
6. Hearth
7. Play
8. Create
9. Mastery

Create a separate Journey continuation brief because Journey is the itinerary,
not a map node. Create shared-system briefs only when a system has substantial
remaining ownership of its own, for example audio, learner profiles, shared
progress, or application readiness.

## Required Header

Every brief must begin with:

- product name;
- node or system name;
- document date;
- branch;
- verified commit hash;
- audit document and version used;
- readiness state;
- whether browser verification is complete, partial, or pending.

## Required Sections

### 1. Plain-Language Purpose

State what this node alone is responsible for and what neighbouring nodes own
instead. Use the current Product Decision Register and verified behaviour.

### 2. Verified Current Experience

Describe only what was observed in the current branch:

- first click;
- second click or chamber choice;
- useful final action;
- back and return behaviour;
- learner-visible progress;
- recovery or easier path;
- desktop and mobile result.

Separate verified behaviour from a claimed implementation that could not be
tested.

### 3. Active Ownership Map

List the current files and responsibilities for:

- content/data;
- state/model;
- viewer/renderer;
- controller/navigation;
- storage and learner identity;
- progress events;
- tests;
- compatibility or legacy code still present.

Name any competing owner and say whether it is active, compatibility-only,
experimental, or safe to remove later.

### 4. What The Audit Changed

List concrete code, content, state, or interaction changes made during the
audit. Link to files and checks. Do not hide unfinished audit work behind vague
language such as "improved architecture."

### 5. Protected Decisions

State the approved meanings, metaphors, interaction choices, visual assets,
content boundaries, and learner-safety rules that the next task must preserve.

### 6. Cross-Node Contracts

For each handoff, record:

- what this node receives;
- stable learner, activity, capability, lesson, level, and return context;
- what this node owns;
- event or evidence emitted;
- which system consumes it;
- what happens when the destination is unavailable.

Never instruct one node to read or modify another node's private DOM state.

### 7. Learner Memory And Progress

Record:

- canonical storage or adapter;
- learner scoping;
- stable IDs;
- evidence stages used;
- progress calculation;
- resume behaviour;
- migrations or competing legacy keys;
- privacy-sensitive material such as recordings or teacher notes.

### 8. Content And Source State

Separate:

- learner-ready content;
- verified source-backed candidate content;
- synthesis requiring review;
- placeholders;
- missing content;
- media or rights concerns.

### 9. Checks And Evidence

List exact automated checks and browser paths run, with results. Include
desktop, mobile, keyboard, learner switching, refresh/resume, missing-media,
and error checks when relevant. Never say "tests pass" without naming them.

### 10. Known Gaps And Risks

Distinguish:

- regression;
- intentional unfinished work;
- technical debt;
- content debt;
- visual polish;
- blocked dependency;
- future enhancement.

### 11. Prioritized Next Build

Use three horizons:

1. **Now:** the smallest coherent next batch needed for reliability or the
   learner journey.
2. **Next:** deeper content or interaction after the first batch is proven.
3. **Later:** optional expansion, backend migration, or production work.

For every item include:

- learner value;
- files or ownership area likely involved;
- dependency;
- acceptance test;
- realistic time range;
- low, medium, or high credit label;
- whether image generation or external research is needed.

### 12. Do-Not-Disturb List

Name unrelated working systems, user-owned changes, approved assets, and
historical documents the next task must not overwrite or silently reinterpret.

### 13. Recommended Opening Instruction

Finish with a short instruction the product owner can paste into a specialist
node task. It must tell that task to:

- read the continuation brief first;
- inspect the live branch before editing;
- follow the prioritized next build;
- keep simulator-wide contracts intact;
- update this brief when the node reaches its next stable checkpoint;
- explain decisions in plain language;
- warn before high-credit work.

## Freshness Rule

A continuation brief is current only for its named branch and commit. If the
node or a dependency changes materially, the next task must reconcile the brief
with the live branch and update its checkpoint before relying on it.

## Storage Location

Store the generated pack under:

`database-blueprint/docs/node-continuation-briefs/`

Use predictable names:

`<node>-continuation-brief-YYYY-MM-DD.md`

## Quality Gate

A brief is ready to share only when:

- completed claims were checked against the live implementation;
- file ownership and legacy overlap are named;
- cross-node inputs and outputs are explicit;
- learner separation and evidence meaning are stated;
- the next work is ordered and testable;
- time and credit estimates are included;
- the task can continue without needing the product owner to reconstruct old
  conversations.
