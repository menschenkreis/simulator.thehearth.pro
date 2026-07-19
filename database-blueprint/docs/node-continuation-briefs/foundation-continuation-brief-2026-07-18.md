# The Hearth Mastery: Foundation Continuation Brief

Date: 2026-07-18
Branch: `cleanup/handoff-architecture`
Verified commit: `93bcc64`
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Working Vertical Slice
Browser verification: desktop complete; responsive partial and failing

## 1. Plain-Language Purpose

Foundation is the threshold. It teaches a learner how to enter the guitar world
and how learning works here. It is not Journey Level 1, a drill library, or a
full theory course. Journey decides what comes next; Do trains movement; Know
and Study deepen ideas.

## 2. Verified Current Experience

- First click opens the approved six-string neck-and-gateway scene.
- Ten fret choices lead to ten orientation themes.
- Fret 0 opens a staged TeachingEngine orientation with explanation and a
  learner question.
- The developed path can return to the fret scene.
- Visible completion exists, but it is global rather than profile-specific.
- Phone and iPad compositions clip content and are not ready.

## 3. Active Ownership Map

- Controller: `adapters/foundation-panel-controller.js`
- Routes: `core/foundation-route-manifest.json` and runtime adapter
- Content: Foundation seed files and `foundation-seed-loader.js`
- Views: map, topic, lesson shell, rainbow blocks, UI utilities
- Progress: `foundation-progress-bridge.js` plus legacy
  `hearth-foundation-progress`
- Compatibility: `adapters/node-legacy-handlers.js`
- Tests: core, core JS, and prototype smoke checks
- Legacy risk: Foundation still renders through the shared `#p-foundation`
  panel owned by the shell.

## 4. What The Audit Changed

No Foundation behaviour or content was changed. The audit verified the active
owner, live Fret 0 route, global progress leak, missing shared event, and
responsive failure.

## 5. Protected Decisions

- Foundation unlocks the neck and uses the gateway metaphor.
- The image must remain anatomically correct with six strings and the approved
  Hearth symbol.
- Foundation is orientation, not Level 1.
- Preserve the visual first click and the existing ten-fret structure.
- Do not turn the entrance into a dashboard.
- Claims about learning, body, ear, or brain require source review.

## 6. Cross-Node Contracts

Foundation should receive active learner and optional Journey return context.
It should emit stable topic contact and orientation evidence with learner,
topic, activity, capability, and return route. Journey may use that evidence to
recommend readiness, but must not infer competence from opening a fret.

Current condition: no canonical shared Foundation event is emitted.

## 7. Learner Memory And Progress

The current visible key is global and must be migrated, not discarded. Define
stable topic IDs and distinguish `opened`, `experienced`, `answered`, and
`orientation_completed`. Resume the learner at the most recent incomplete
block. Keep teacher notes outside public learner copy.

## 8. Content And Source State

Fret 0 is learner-ready as a prototype. The other themes have useful synthesis
but uneven depth and source support. Musical alphabet material and reviewed
Level 1 resources are candidates. Video placement must be topic-specific and
rights-recorded.

## 9. Checks And Evidence

- Desktop path: Map -> Foundation -> Fret 0 -> teaching scene: verified.
- Profile switch: visible Foundation count did not change: leak verified.
- Phone and iPad: clipped: verified.
- Smoke checks and renderer ownership check: pass at `93bcc64`.

Keyboard, refresh/resume, and missing-media recovery need dedicated tests.

## 10. Known Gaps And Risks

- Regression risk: competing legacy progress paths.
- Intentional unfinished work: nine themes lack Fret 0 depth.
- Content debt: source and level calibration.
- Wiring debt: no shared evidence or Journey readiness.
- Accessibility: inactive panels and map controls.

## 11. Prioritized Next Build

1. **Now:** add learner-scoped Foundation evidence with a legacy migration.
   Acceptance: Ayla and Jen show separate fret progress after refresh.
   Time: 3-5 hours. Credit: medium. Images/research: no.
2. **Next:** finish one more theme to the Fret 0 standard and return its
   evidence to Journey. Acceptance: action, feedback, saved evidence, next step.
   Time: 3-5 hours. Credit: medium. Research: likely; images: no.
3. **Later:** source-review all ten themes and add responsive/accessibility
   coverage. Time: 8-14 hours staged. Credit: medium. Research: yes.

## 12. Do-Not-Disturb List

Do not replace the approved gateway asset, merge Foundation into Level 1,
rewrite the ten-fret meanings, modify Journey counters directly, or remove
legacy data before a tested migration.

## 13. Recommended Opening Instruction

Read this brief and the whole-simulator audit first. Inspect the live Foundation
path before editing. Implement the `Now` batch only, preserve the approved
gateway and simulator-wide contracts, update this brief at the next stable
checkpoint, explain decisions plainly, and warn before high-credit work.
