# The Hearth Mastery: Study Continuation Brief

Date: 2026-07-19
Worktree: `worktrees/study`
Branch: `build/study-node-continuation`
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Subject-correctness batch complete; browser QA still pending
Browser verification: previously completed for one cross-node subject. This
finish pass could not run live browser or console checks because no browser was
available to the task.

## 1. Plain-Language Purpose

Study helps a learner actively investigate one idea through different doors:
words, shape, sound, comparison, evidence, and application. Know supplies a
subject and references; Study makes the learner work with it. It does not own
the whole library or the practice timer.

## 2. Verified Current Experience

- The Key Chamber opens six evidence doors with recommended/locked states.
- A Know topic can become the current Study subject.
- Door work can save confidence and evidence for the active learner.
- Study now derives every door activity from the selected subject family.
- A-minor pentatonic keeps its dedicated root-note and shape work.
- Time Signatures now uses the rhythm template: beat, measure, grouping, pulse,
  and counting rather than A-minor language.
- Subjects without an approved family receive a visibly labelled General
  Inquiry rather than invented guitar content.

## 3. Active Ownership Map

- Screen: `adapters/study-key-chamber-viewer.js`
- Model/state: Study Key Chamber model/controller files
- Storage: learner-scoped `hearth-study-chamber-v1`
- Events: `study_door_visited`, `study_door_evidence_recorded`
- Input: Know/Study subject adapters
- Tests: Study model/event assertions in core JS smoke check
- Curriculum templates currently live beside the Study model. Keep this stable
  for now; move the growing template library into a dedicated data file later,
  once shared-file conflict risk is lower.

## 4. What The Audit Changed

The initial audit exposed a critical subject/activity mismatch: the Time
Signatures title was correct while its Word Door taught A-minor roots. The
subject-correctness batch replaced that generic content with family templates
for rhythm, harmony, scales, technique, reading, and listening, plus a safe
General Inquiry fallback. It did not change shared learner, storage, or event
infrastructure.

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

The A-minor/pentatonic subject remains the deepest prototype content. The model
now has reusable family templates for rhythm, harmony, scales, technique,
reading, and listening, but these are still starter activities rather than
source-reviewed curriculum. Cite source-backed claims and preserve Know source
links before expanding any family in depth.

## 9. Checks And Evidence

- Automated contrasting checks cover A-minor pentatonic, Time Signatures, and
  the General Inquiry fallback.
- A completed Time Signatures Word Door now produces exactly `Apply Time
  Signatures in Practice`; the Practice text is checked for A-minor leakage.
- The real Journey Study-signal helper is evaluated against the completed Time
  Signatures snapshot and returns the same subject-specific handoff.
- Learner-scoped storage and events remain unchanged; existing automated checks
  continue to cover them.

The following still need a live browser pass: all six door activities, learner
switching, refresh/resume, locked states, mobile, keyboard, and the visible
browser console for A-minor pentatonic, Time Signatures, and General Inquiry.

## 10. Known Gaps And Risks

- Family templates are only safe defaults until subject-specific content is
  source reviewed.
- The growing template library belongs in a separate data file eventually, but
  do not extract it yet: that would create avoidable shared-file conflicts.
- Return context is generic.
- Evidence meaning varies by door.
- Source provenance is not carried through consistently.

## 11. Prioritized Next Build

1. **Next:** complete the deferred live-browser verification for A-minor
   pentatonic, Time Signatures, and General Inquiry. Check the displayed door
   instruction, learner switch, refresh, and browser console. Time: 1-2 hours.
   Credit: low-medium. Images: no.
2. **Then:** formalize Know/Journey return envelopes and evidence meanings per
   door. Time: 3-5 hours. Credit: medium. Images: no.
3. **Later:** move approved curriculum templates into a dedicated Study data
   file, then build and source-review subject templates in small batches.
   Time: multi-day. Credit: medium. Research: yes.

## 12. Do-Not-Disturb List

Do not remove the six-door metaphor, duplicate Know's library, overwrite the
working learner-scoped store, use Jen's A-minor template for unrelated topics,
or infer understanding from a door visit.

## 13. Recommended Opening Instruction

Read this brief and the audit. First run the deferred live-browser checks for
the three subject paths. Then formalize return envelopes and door-specific
evidence meanings. Keep learner evidence and cross-node contracts intact, do
not extract the template library until shared-file conflicts are low, explain
decisions plainly, and warn before research-heavy work.
