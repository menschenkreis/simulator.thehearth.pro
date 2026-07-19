# The Hearth Mastery: Shared Learner And Progress Continuation Brief

Date: 2026-07-18
Branch: `cleanup/handoff-architecture`
Verified commit: `93bcc64`
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Partial infrastructure; blocks honest cross-node progress
Browser verification: profile comparison complete; migration pending

## 1. Plain-Language Purpose

This system gives the entire simulator one answer to three questions: Who is
active? What did that learner actually do? What is the evidence strong enough
to mean? It does not own node screens or curriculum.

## 2. Verified Current Experience

- The header can switch between My Journey and Jen.
- Journey, Study, Play, Create, Mastery, and shared events have useful learner
  scoping.
- Foundation, Do visible rings, Know shelf, and parts of Practice remain global.
- Switching profiles changed Journey counts but not several node totals.
- Opening the profile menu can replace current node context with Journey.
- Multiple header panels can remain open together.
- Whole progress mixes 279 lessons, topics, clicks, sessions, and artifacts.

## 3. Active Ownership Map

- Active learner source: Journey state, inferred by several adapters
- Shared events: `adapters/progress-event-store.js`
- Node bridges: Foundation, Do, Practice, Study, Play, Create, Mastery adapters
- Header/profile/progress: header tools and Journey UI
- Legacy keys: documented in local-storage/API inventory and node briefs
- Tests: node-specific model tests; no full profile migration test suite

## 4. What The Audit Changed

Create handoffs now write learner identity explicitly. The audit did not migrate
or rewrite any existing learner state. Mixed ownership and profile leakage were
recorded for a controlled build.

## 5. Protected Decisions

- One profile applies across the whole simulator.
- Ayla may view Jen as teacher; Jen's learner experience remains her own.
- Structured notes and evidence replace arbitrary chatbot memory.
- Exposure, completion, confidence, competence, time, and artifacts are distinct.
- Migrations preserve old data and support rollback/export.
- Future recordings and teacher notes require privacy rules.

## 6. Cross-Node Contracts

Every node receives active learner through one service and emits a validated
event. Required fields include event ID/type, learner, node, activity, lesson,
level, capability IDs, attempt, rating/evidence stage, data, occurred/recorded
timestamps, schema version, and optional recording/project/source/return IDs.

## 7. Learner Memory And Progress

Prototype events use `hearth-progress-events` with a 1,000-event cap and no
validation or duplicate protection. Several legacy stores compete with it.
Build a read-only migration report first, then migrate node by node. Capability
status must be derived; raw events remain immutable evidence.

## 8. Content And Source State

Not applicable as curriculum, but event records should carry source IDs where
an action depends on a book, video, song, or cultural claim. Avoid storing
copyrighted media or sensitive notes inside event payloads.

## 9. Checks And Evidence

- My Journey/Jen whole-progress comparison: verified.
- Create learner handoff regression: automated pass.
- Shared node event model assertions: pass.
- General smoke/ownership checks: pass at `93bcc64`.

Migration, duplicate event, profile switch in every node, refresh/resume,
privacy, export, and two-device sync tests are pending.

## 10. Known Gaps And Risks

- Profile leakage can misrepresent student work.
- A migration mistake could overwrite valuable prototype history.
- Event inference can attach work to the wrong learner.
- Whole percentages are not pedagogically meaningful.
- LocalStorage caps and no sync create future data loss.

## 11. Prioritized Next Build

1. **Now:** inventory every active key and build a read-only per-profile
   migration preview. Acceptance: report shows destination and conflicts without
   modifying storage. Time: 3-5 hours. Credit: medium. Images/research: no.
2. **Now:** create one active-learner service and validated event envelope.
   Acceptance: all new node events require explicit learner and stable IDs.
   Time: 4-7 hours. Credit: medium.
3. **Next:** migrate Foundation, Do, Know, and Practice one at a time with
   rollback tests; redesign progress around capability evidence plus separate
   activity/time totals. Time: 10-18 hours staged. Credit: medium.
4. **Later:** backend sync, conflict handling, roles, privacy, and export.
   Time: multi-day. Credit: high.

## 12. Do-Not-Disturb List

Do not bulk-delete localStorage, merge Ayla and Jen, infer mastery from counts,
let nodes read each other's DOM, store raw recordings in events, or perform an
irreversible migration without preview and backup.

## 13. Recommended Opening Instruction

Read this brief and the audit, inspect all active stores, and produce the
read-only migration preview before changing learner data. Keep migrations
reversible, require explicit learner identity, update this brief at the next
checkpoint, explain decisions plainly, and warn before high-credit work.

## 14. Lane A Checkpoint — 2026-07-19

Branch: `build/shared-learner-progress`

Completed in the first orchestrator batch:

- reviewed the active learner/progress key catalogue against live code;
- added a read-only, per-profile migration preview with source fingerprints,
  destinations, conflicts, and rollback instructions;
- made multi-profile global ownership a blocking conflict rather than silently
  assigning it to whichever learner is active;
- proposed formal event and handoff JSON Schemas without wiring them into node
  producers;
- added non-destructive tests with write/delete traps and byte-for-byte input
  comparison;
- left every existing learner key and runtime migration path unchanged.

The detailed findings are in
`shared-learner-storage-inventory-and-migration-preview-v1.md`; the proposed
integration boundary is in `shared-event-and-handoff-contracts-proposal-v1.md`.

Next gate: orchestrator review, then one active-learner service and validated,
duplicate-safe event normalization. Foundation, Know, Practice, and other
global legacy stores must not be migrated until that gate passes.
