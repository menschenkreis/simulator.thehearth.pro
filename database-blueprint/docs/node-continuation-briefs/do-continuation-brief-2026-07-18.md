# The Hearth Mastery: Do Continuation Brief

Date: 2026-07-18
Updated: 2026-07-19
Branch: `build/do-node-continuation`
Previous verified commit: `4832e4f`
Current checkpoint: repeated-evidence and shared-contract reconciliation
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Working Vertical Slice, closest to a wired drill place
Browser verification: desktop complete; responsive partial and failing

## 1. Plain-Language Purpose

Do trains physical guitar actions. It owns clear drill instructions,
demonstration space, easier/harder gradients, feedback, and repeatable evidence.
Practice owns the timed session; Journey orders drills; Play turns them into
music; Know and Study explain ideas.

## 2. Verified Current Experience

- First click uses the approved arms-and-guitar image with Left Hand, Right
  Hand, and Both Hands choices.
- Left Hand opens its own room and horizontal drill nodes.
- A Minor Pentatonic opens an interactive fretboard teaching view.
- Feedback choices range from Too hard to Mastered and emit an event.
- Opening a drill records learner-specific Seen evidence.
- Progress rings are rebuilt from the active learner's evidence after refresh.
- Legacy global progress is preserved and copied once to one learner without
  being deleted or duplicated into another profile.
- One Mastered self-rating now projects only one clean attempt. Mastery needs
  three independent clean attempts, evidence on two days, and at least one
  confident attempt.
- Repeating the same visible rating after a fresh attempt records new evidence;
  immediate repeats do not strengthen the projected ring.
- Too hard preserves the drill's reviewed easier step for Practice.
- Desktop is useful. Phone and iPad crop controls and the main image.

## 3. Active Ownership Map

- Controller: `adapters/doing-panel-controller.js`
- Entry/rooms: `doing-entry-viewer.js`, `doing-room-viewer.js`
- Drill data: `doing-drill-catalog.js`, `doing-config.js`
- Teaching: `doing-teaching-viewer.js`, detail and board viewers
- Progress projection and migration: `doing-progress-bridge.js`
- Shared event: `drill_feedback_recorded`
- Open event: `drill_opened`
- Evidence projection: independent attempts, distinct days, and migrated
  baselines in `doing-progress-bridge.js`
- Preserved legacy state: `hearth-doing-progress`
- Migration ledger: `hearth-doing-progress-migration-v1`
- Compatibility: `node-legacy-handlers.js`
- Tests: detailed Doing assertions in `tools/core_js_smoke_check.py`

## 4. What The Audit And Continuation Changed

The audit verified the active owner, tested a final interactive drill, and
proved that visible rings were global while events were learner-scoped. The
continuation checkpoint fixed that split:

- the active learner is resolved when Do opens;
- drill openings and feedback explicitly preserve that learner ID;
- rings, summaries, filters, and next-drill choices project from only that
  learner's events;
- old global values migrate once into events for the active learner;
- a migration ledger prevents copying the same old values to Jen as well;
- the original legacy value remains available for recovery.

No Do image, drill meaning, approved catalogue entry, or user-facing layout was
replaced.

The repeated-evidence checkpoint then added:

- credit-bearing capability IDs on reviewed Level 1 drills, with related
  Practice/Play/Preparation outcomes kept separately as non-credit context;
- projected evidence that no longer trusts the strongest self-rating alone;
- a small evidence explanation beside the drill feedback;
- exact easier-step recommendations for Practice;
- Practice session and return context when Do opens inside a planned session;
- canonical event fields reconciled with the Shared Progress proposal and
  mirrored inside `data` while the legacy event store remains active.

## 5. Protected Decisions

- Clicking Left Hand shows only Left Hand; likewise for Right and Both.
- Use the zoomed guitar-room family, not a generic table or ornate room.
- Drill nodes sit below the image, with readable titles and progress rings.
- A selected drill uses the large image area for teaching or future video.
- Keep the reviewed catalog separate from drafts.
- A drill must return to music, not become isolated punishment.

## 6. Cross-Node Contracts

Do receives learner, drill ID, room, level, capability IDs, lesson ID,
recommended difficulty, session ID, and return route. It owns graded physical
evidence. Practice and Journey consume the saved evidence; the event itself is
not a multi-destination command.

The event producer now follows the Shared Progress names: `node_id` identifies
Do, `destination_node_id` is nullable, and `activity_id`, `capability_ids`,
`attempt_id`, `session_id`, `evidence_stage`, `evidence_source`, `occurred_at`,
`recorded_at`, `return_route`, and `fallback_instruction` are top-level fields.
They are temporarily mirrored inside `data` because the current shared event
store strips unknown top-level fields. Return routes use
`{node_id, view_id, params}`. Pass conditions and easier steps use structured
handoff objects inside the compatibility payload; a future navigation handoff
must create one singular envelope per destination.

`capability_ids` are credit-bearing candidates. Do emits only capabilities
whose Journey definition authorizes `doing` in `nodeIds`. Preparation,
multi-session Practice, and musical-exchange outcomes that help route the next
step are carried only as `data.related_capability_ids`; Journey must not count
that field as evidence. Shared Progress will normalize canonical stages on
read (`attempt` -> `attempted`, `demonstration` -> `demonstrated`,
`application` -> `applied_musically`, and `consolidation` -> `consolidated`)
without rewriting raw events.

## 7. Learner Memory And Progress

Canonical evidence and visible rings are now learner-scoped in shared events.
Legacy values are retained and assigned once through an explicit migration
ledger. Self-ratings still represent confidence/quality evidence, not objective
mastery. Two independent clean attempts support Comfortable. Mastered requires
three clean attempts, at least two distinct days, and one Comfortable/Mastered
self-report. Existing migrated values remain visible as an explicit legacy
baseline instead of being silently downgraded.

## 8. Content And Source State

Thirteen reviewed Level 1 drills form the current clean catalog. Draft drills
must not silently enter learner routes. Right-hand depth, notation/TAB contact,
video demonstrations, source provenance, and song connections remain thin.

## 9. Checks And Evidence

- Desktop: Do -> Left Hand -> A Minor Pentatonic -> feedback: verified.
- Desktop: My Journey -> 1-2-3-4 -> Clean once -> refresh: state persisted.
- Profile switch: Jen saw the same drill as Not started rather than inheriting
  My Journey's Clean once ring.
- Phone 390 x 844: room width stayed within the viewport and the active panel
  provided vertical scrolling; broader responsive refinement remains.
- Shared event mapping and learner category summary: automated pass.
- Learner-separated projection and one-time migration: automated pass.
- Shared event field placement, vocabulary, timestamps, session/attempt IDs,
  return route, and compatibility mirrors: automated pass.
- One-click mastery, immediate duplicate, same-state fresh attempt, multi-day
  mastery, and exact easier-step recommendation: automated pass.
- Reviewed catalog count and interactive renderers: automated pass.
- Browser console warnings/errors during the checkpoint walkthrough: none.
- Core JavaScript and prototype smoke checks: pass in the current checkpoint.

Keyboard flow, refresh/resume, video fallback, and repeated-evidence thresholds
are not yet browser-automated. Refresh persistence for the tested ring is
covered.

## 10. Known Gaps And Risks

- Right-hand and Both Hands content are less developed.
- The legacy shared event store does not yet retain the new top-level fields;
  Do mirrors them inside `data` until Shared Progress upgrades the store.
- The live Journey reader does not yet contain the settled canonical-stage
  normalizer; that belongs to the Shared Progress/Journey integration lane.
- Do has no explicit start/retry control for attempt lifecycle or shared-store
  idempotency yet; it combines per-feedback attempt IDs with a 30-second
  independence guard.
- The evidence event feeds Practice and Journey, but destination-specific
  navigation handoffs are still future singular envelopes.
- The one-time migration assigns old shared state to whichever real learner is
  active first; the ledger makes that assignment inspectable and reversible.
- Mobile composition still needs broader refinement beyond the tested room.

## 11. Prioritized Next Build

1. **Completed:** learner-specific rings and non-destructive legacy migration.
   Acceptance passed: My Journey and Jen showed different rings after refresh.
2. **Completed:** repeated-evidence thresholds and Shared Progress contract
   reconciliation. Acceptance passed: Too hard produces an exact easier next
   step; one click cannot produce mastery; Practice and Journey receive
   capability-aware evidence with return context.
3. **Next:** after the shared event store lands, validate one real
   Journey -> Do -> Journey and Practice -> Do -> Practice round trip in the
   browser, including refresh and idempotent retry behaviour.
4. **Then:** expand reviewed right-hand/Both Hands drills and add demonstrator
   assets or videos. Time: 6-12 hours staged. Credit: medium-high. Research: yes;
   image/video work only after approval.

## 12. Do-Not-Disturb List

Do not restore arbitrary nodes over the strings, reintroduce dashboard cards,
mix drafts into the approved catalog, replace the approved first-click images,
or delete old learner data without migration.

## 13. Recommended Opening Instruction

Read this brief and the audit, inspect the live Do path, then implement only the
repeated-evidence and Practice/Journey handoff batch. Preserve the approved
rooms, learner-specific projection, migration ledger, and reviewed catalogue.
Update this brief at the next checkpoint, explain decisions plainly, and warn
before high-credit visual work.
