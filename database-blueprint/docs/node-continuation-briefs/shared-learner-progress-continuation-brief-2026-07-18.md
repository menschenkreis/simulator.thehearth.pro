# The Hearth Mastery: Shared Learner And Progress Continuation Brief

Date: 2026-07-18
Updated: 2026-07-19
Branch: `build/shared-learner-progress`
Previous verified commit: `675c4c02f9b487dc49d8047a6a09973357bdc928`
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Event runtime ready; active-learner service and migrations remain separate
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

Events use `hearth-progress-events` with a predictable 1,000-event cap.
Canonical appends now validate the approved envelope, require explicit learner
identity, and block conflicting duplicate IDs. A labelled compatibility path
keeps existing incomplete producers and raw legacy events readable. Several
legacy progress stores still compete with it. Capability status must be
derived; raw events remain immutable evidence.

## 8. Content And Source State

Not applicable as curriculum, but event records should carry source IDs where
an action depends on a book, video, song, or cultural claim. Avoid storing
copyrighted media or sensitive notes inside event payloads.

## 9. Checks And Evidence

- My Journey/Jen whole-progress comparison: verified.
- Create learner handoff regression: automated pass.
- Shared node event model assertions: pass.
- General smoke/ownership checks: pass at `93bcc64`.
- Runtime event normalization/store regressions: JXA pass in this checkpoint.
- Core, prototype, local-reference, and renderer-ownership checks: pass in this
  checkpoint.
- The Node-based loaded-script syntax check remains skipped because Node is not
  installed; no dependency was installed, and the repository's JXA evaluator
  successfully loaded the new runtime modules.

Duplicate event, canonical validation, legacy readability, non-rewriting reads,
and the 1,000-event cap are automated. Profile switch in every node,
refresh/resume round trips, privacy, export, and two-device sync tests remain.

## 10. Known Gaps And Risks

- Profile leakage can misrepresent student work.
- A migration mistake could overwrite valuable prototype history.
- Legacy compatibility inference can still attach an incomplete producer's work
  to the wrong learner until the active-learner service replaces it.
- Whole percentages are not pedagogically meaningful.
- LocalStorage caps and no sync create future data loss.

## 11. Prioritized Next Build

1. **Completed:** inventory every active key and build a read-only per-profile
   migration preview. The report shows destinations and conflicts without
   modifying storage.
2. **Completed:** add the validated, duplicate-safe event envelope runtime.
   Canonical events require explicit learner and stable IDs; legacy producers
   remain isolated behind a named compatibility path.
3. **Now:** create one active-learner service without migrating node progress.
   Acceptance: all nodes resolve the same explicit learner across profile
   switch and refresh. Time: 3-5 hours. Credit: medium.
4. **Next:** migrate Foundation, Do, Know, and Practice one at a time with
   rollback tests; redesign progress around capability evidence plus separate
   activity/time totals. Time: 10-18 hours staged. Credit: medium.
5. **Later:** backend sync, cross-device conflict handling, roles, privacy, and export.
   Time: multi-day. Credit: high.

## 12. Do-Not-Disturb List

Do not bulk-delete localStorage, merge Ayla and Jen, infer mastery from counts,
let nodes read each other's DOM, store raw recordings in events, or perform an
irreversible migration without preview and backup.

## 13. Recommended Opening Instruction

Read this brief, the storage inventory, and the event contract, then build only
the active-learner service. Do not migrate learner records in that batch. Keep
the event compatibility path intact, require explicit identity from canonical
producers, and test profile switch plus refresh before changing node ownership.

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

The runtime event gate is complete. The next gate is the separate active-learner
service. Foundation, Know, Practice, and other global legacy stores must not be
migrated until that service and its profile-switch checks pass.

## 15. Runtime Event Store Checkpoint — 2026-07-19

This batch added `core/progress-event.js` and upgraded
`adapters/progress-event-store.js` without changing learner records or applying
the migration preview.

- Canonical fields survive append and raw/normalized read, including Do's
  destination, capability IDs, evidence stage/source, attempt/session IDs,
  timestamps, return route, fallback instruction, and structured compatibility
  payload.
- Canonical `learner_id` is mandatory and never inferred. The old Journey-active
  inference exists only inside `appendLegacy` for current incomplete producers.
- Equivalent normalized duplicate IDs are idempotent. Conflicting duplicate IDs
  are rejected before any write.
- `list`/`listRaw` preserve direct access to legacy records. `listNormalized`
  labels read-time projections and never writes them back.
- Journey level aliases normalize to the live `L1` identifier for canonical
  comparison; raw legacy values are unchanged. Shared evidence stages map into
  Journey states only when read.
- Invalid event-store JSON blocks append rather than being overwritten. The
  newest-1,000 retention rule remains unchanged for successful new events.

Remaining integration risks: the current shared branch does not yet contain
Do commit `63e62d3aae8bf5af21eef6b0f2d8e0a22b73f180`; the active-learner service is
still absent; legacy auto-routing is intentionally temporary; Journey does not
yet aggregate these canonical events; and the real cross-node browser round
trips must be verified after the branches integrate. No node progress migration
belongs in this checkpoint.
