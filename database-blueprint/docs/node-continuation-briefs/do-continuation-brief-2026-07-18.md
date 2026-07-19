# The Hearth Mastery: Do Continuation Brief

Date: 2026-07-18
Branch: `cleanup/handoff-architecture`
Verified commit: `93bcc64`
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
- Opening a drill records Seen; one click can currently record Mastered.
- Desktop is useful. Phone and iPad crop controls and the main image.

## 3. Active Ownership Map

- Controller: `adapters/doing-panel-controller.js`
- Entry/rooms: `doing-entry-viewer.js`, `doing-room-viewer.js`
- Drill data: `doing-drill-catalog.js`, `doing-config.js`
- Teaching: `doing-teaching-viewer.js`, detail and board viewers
- Progress bridge: `doing-progress-bridge.js`
- Shared event: `drill_feedback_recorded`
- Visible legacy state: `hearth-doing-progress`
- Compatibility: `node-legacy-handlers.js`
- Tests: detailed Doing assertions in `tools/core_js_smoke_check.py`

## 4. What The Audit Changed

No Do content was altered. The audit verified the active owner, tested a final
interactive drill, confirmed shared events, and proved that visible rings can
remain global while events are learner-scoped.

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

Current event is useful but the handoff envelope and return route are partial.

## 7. Learner Memory And Progress

Canonical evidence is learner-scoped in shared events. Visible progress still
uses a global key. Migrate legacy values into the active learner once, then
derive rings from events. Treat self-ratings as confidence/quality evidence,
not objective mastery. Require repeated clean evidence before `reliable` or
`mastered` status.

## 8. Content And Source State

Thirteen reviewed Level 1 drills form the current clean catalog. Draft drills
must not silently enter learner routes. Right-hand depth, notation/TAB contact,
video demonstrations, source provenance, and song connections remain thin.

## 9. Checks And Evidence

- Desktop: Do -> Left Hand -> A Minor Pentatonic -> feedback: verified.
- Shared event mapping and learner category summary: automated pass.
- Reviewed catalog count and interactive renderers: automated pass.
- Phone/iPad clipping: verified.
- All four smoke/ownership checks: pass at `93bcc64`.

Keyboard flow, refresh/resume, video fallback, and repeated-evidence thresholds
are not yet covered.

## 10. Known Gaps And Risks

- Progress rings and shared evidence have competing authority.
- A single self-rating can overclaim mastery.
- Right-hand and Both Hands content are less developed.
- Handoffs lose lesson/capability/return context.
- Mobile layout is unusable.

## 11. Prioritized Next Build

1. **Now:** derive learner-specific rings from shared events and preserve legacy
   progress through migration. Acceptance: Ayla and Jen see different rings
   after refresh. Time: 3-5 hours. Credit: medium. Images/research: no.
2. **Next:** formalize repeated-evidence thresholds and Practice/Journey
   handoffs. Acceptance: Too hard produces an easier next step; mastery needs
   repeated evidence. Time: 3-5 hours. Credit: medium. Images: no.
3. **Later:** expand reviewed right-hand/Both Hands drills and add demonstrator
   assets or videos. Time: 6-12 hours staged. Credit: medium-high. Research: yes;
   image/video work only after approval.

## 12. Do-Not-Disturb List

Do not restore arbitrary nodes over the strings, reintroduce dashboard cards,
mix drafts into the approved catalog, replace the approved first-click images,
or delete old learner data without migration.

## 13. Recommended Opening Instruction

Read this brief and the audit, inspect the live Do path, then implement only the
learner-scoped progress-ring batch. Preserve the approved rooms and reviewed
catalog, keep handoffs contract-based, update this brief at the next checkpoint,
explain decisions plainly, and warn before high-credit visual work.
