# The Hearth Mastery: Study Continuation Brief

Date: 2026-07-18
Branch: `cleanup/handoff-architecture`
Verified commit: `93bcc64`
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Working Vertical Slice
Browser verification: desktop complete for one cross-node subject

## 1. Plain-Language Purpose

Study helps a learner actively investigate one idea through different doors:
words, shape, sound, comparison, evidence, and application. Know supplies a
subject and references; Study makes the learner work with it. It does not own
the whole library or the practice timer.

## 2. Verified Current Experience

- The Key Chamber opens six evidence doors with recommended/locked states.
- A Know topic can become the current Study subject.
- Door work can save confidence and evidence for the active learner.
- Time Signatures correctly appeared as the subject title.
- Its Word Door incorrectly taught A-minor roots and tonal centre, proving the
  task body is not derived from the selected subject.

## 3. Active Ownership Map

- Screen: `adapters/study-key-chamber-viewer.js`
- Model/state: Study Key Chamber model/controller files
- Storage: learner-scoped `hearth-study-chamber-v1`
- Events: `study_door_visited`, `study_door_evidence_recorded`
- Input: Know/Study subject adapters
- Tests: Study model/event assertions in core JS smoke check
- Legacy overlap: generic A-minor templates remain active inside broader
  subject routes.

## 4. What The Audit Changed

No Study code changed. The audit verified learner-scoped evidence and exposed a
critical subject/activity mismatch through the live Time Signatures handoff.

## 5. Protected Decisions

- Keep the Key Chamber and six-door inquiry metaphor.
- A door must ask a real subject-specific action, not show generic prose.
- The learner may mark uncertainty; uncertainty should guide repetition.
- Know explains; Study asks the learner to investigate and prove.
- Jen-specific A-minor work must not become generic content for every subject.

## 6. Cross-Node Contracts

Study receives learner, stable subject ID/title, source references, capability
IDs, lesson/level, recommended door, and return route. It owns door attempts,
confidence, response, and evidence. It returns a structured result to Know,
Journey, or Practice. Missing subject templates must fail safely with a clearly
labelled general inquiry, never unrelated A-minor instructions.

## 7. Learner Memory And Progress

Current Study state and events are learner-scoped and should be preserved.
Strengthen stable activity/template IDs and resume per subject/door. Do not
treat visiting a door as evidence. Preserve raw learner responses separately
from derived capability status.

## 8. Content And Source State

The A-minor/pentatonic subject has the deepest prototype content. Other subjects
are largely labels over that template. Build a small approved template library
for rhythm, harmony, scales, technique, reading, and listening before broad
topic expansion. Cite source-backed claims and preserve Know source links.

## 9. Checks And Evidence

- Know Time Signatures -> Study current subject: verified.
- Word Door subject mismatch: verified.
- Learner-scoped storage/events: code and automated checks verified.
- Smoke and ownership checks: pass at `93bcc64`.

All six doors, profile switching, refresh/resume, mobile, keyboard, and missing
template fallback still need end-to-end tests.

## 10. Known Gaps And Risks

- Wrong instructional content can appear under a correct subject title.
- The template library is too narrow.
- Return context is generic.
- Evidence meaning varies by door.
- Source provenance is not carried through consistently.

## 11. Prioritized Next Build

1. **Now:** derive door activities from subject families and add a safe unknown
   fallback. Acceptance: Time Signatures never receives root-note/pentatonic
   work; A minor still does. Time: 4-6 hours. Credit: medium. Images: no.
2. **Next:** formalize Know/Journey return envelopes and evidence meanings per
   door. Time: 3-5 hours. Credit: medium. Images: no.
3. **Later:** build and source-review subject templates in small batches.
   Time: multi-day. Credit: medium. Research: yes.

## 12. Do-Not-Disturb List

Do not remove the six-door metaphor, duplicate Know's library, overwrite the
working learner-scoped store, use Jen's A-minor template for unrelated topics,
or infer understanding from a door visit.

## 13. Recommended Opening Instruction

Read this brief and the audit, reproduce the Time Signatures mismatch, then fix
subject-derived door activities and the safe fallback before expanding content.
Keep learner evidence and cross-node contracts intact, update this brief,
explain decisions plainly, and warn before research-heavy work.
