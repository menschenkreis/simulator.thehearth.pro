# The Hearth Mastery: Do Continuation Brief

Date: 2026-07-18
Updated: 2026-07-19
Branch: `build/do-node-continuation`
Verified commit: `4832e4f`
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
- One click can still currently record Mastered.
- Desktop is useful. Phone and iPad crop controls and the main image.

## 3. Active Ownership Map

- Controller: `adapters/doing-panel-controller.js`
- Entry/rooms: `doing-entry-viewer.js`, `doing-room-viewer.js`
- Drill data: `doing-drill-catalog.js`, `doing-config.js`
- Teaching: `doing-teaching-viewer.js`, detail and board viewers
- Progress projection and migration: `doing-progress-bridge.js`
- Shared event: `drill_feedback_recorded`
- Open event: `drill_opened`
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

## 5. Protected Decisions

- Clicking Left Hand shows only Left Hand; likewise for Right and Both.
- Use the zoomed guitar-room family, not a generic table or ornate room.
- Drill nodes sit below the image, with readable titles and progress rings.
- A selected drill uses the large image area for teaching or future video.
- Keep the reviewed catalog separate from drafts.
- A drill must return to music, not become isolated punishment.

## 6. Cross-Node Contracts

Do should receive learner, drill ID, room, level, capability IDs, lesson ID,
recommended difficulty, and return route. It owns graded physical evidence. It
should send the result to Practice and Journey. If a destination is absent, it
must save the event and return locally without losing work.

Current events are useful and learner-specific, but the handoff envelope and
return route are partial.

## 7. Learner Memory And Progress

Canonical evidence and visible rings are now learner-scoped in shared events.
Legacy values are retained and assigned once through an explicit migration
ledger. Self-ratings still represent confidence/quality evidence, not objective
mastery. Repeated clean evidence is still required before `reliable` or
`mastered` becomes trustworthy.

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
- Reviewed catalog count and interactive renderers: automated pass.
- Browser console warnings/errors during the checkpoint walkthrough: none.
- Core JavaScript smoke check: pass at `4832e4f`.

Keyboard flow, refresh/resume, video fallback, and repeated-evidence thresholds
are not yet fully covered. Refresh persistence for the tested ring is covered.

## 10. Known Gaps And Risks

- A single self-rating can overclaim mastery.
- Right-hand and Both Hands content are less developed.
- Handoffs lose lesson/capability/return context.
- The one-time migration assigns old shared state to whichever real learner is
  active first; the ledger makes that assignment inspectable and reversible.
- Mobile composition still needs broader refinement beyond the tested room.

## 11. Prioritized Next Build

1. **Completed:** learner-specific rings and non-destructive legacy migration.
   Acceptance passed: My Journey and Jen showed different rings after refresh.
2. **Now:** formalize repeated-evidence thresholds and Practice/Journey
   handoffs. Acceptance: Too hard produces an easier next step; mastery needs
   repeated evidence. Time: 3-5 hours. Credit: medium. Images: no.
3. **Next:** expand reviewed right-hand/Both Hands drills and add demonstrator
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
