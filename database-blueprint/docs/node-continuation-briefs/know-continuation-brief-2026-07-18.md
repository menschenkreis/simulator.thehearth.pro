# The Hearth Mastery: Know Continuation Brief

Date: 2026-07-18
Branch: `cleanup/handoff-architecture`
Verified commit: `93bcc64`
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Working Vertical Slice
Browser verification: desktop complete; responsive and keyboard partial

## 1. Plain-Language Purpose

Know is the browsable guitar library. It helps a learner understand names,
relationships, symbols, and context. Study owns active inquiry and testing;
Journey chooses when knowledge belongs in a lesson; Do and Practice own
physical repetition.

## 2. Verified Current Experience

- First click opens a visual shelf with fifteen categories.
- Rhythm opens a flipbook and Time Signatures opens a detailed topic.
- Topic content can include a specifically mapped video.
- The shelf remained `0/15` after topic contact on the live active route.
- Hidden shelf controls remained exposed to accessibility while the book was
  open, and page arrows lacked accessible labels.

## 3. Active Ownership Map

- Controller: `adapters/knowing-panel-controller.js`
- Shelf: shelf viewer/controller
- Book/topic: book and topic viewers plus active legacy `book-reader.js`
- Progress: `knowing-progress-controller.js` and legacy
  `hearth-knowing-progress`
- Study bridge: `knowing-study-model.js` and Study session components
- Fallback event: `concept_read`
- Compatibility: `node-legacy-handlers.js`
- Tests: Knowing models and views in `tools/core_js_smoke_check.py`

The loaded `book-reader.js` currently competes with the newer progress path and
is not merely historical.

## 4. What The Audit Changed

No Know implementation changed. The audit verified the live library path,
topic-specific video, stale shelf progress, competing reader ownership, and
accessibility problems.

## 5. Protected Decisions

- Keep the shelf/book metaphor and compact lesson cards.
- Explanations should say plainly what a topic is.
- Show key library concepts before the main body.
- Videos appear only when directly mapped to the topic.
- A book ending should invite proof on guitar, not celebrate a fake count.
- Reading is exposure, not understanding or mastery.

## 6. Cross-Node Contracts

Know receives learner, topic, optional lesson/capability, and return route. It
owns source-backed explanation and concept contact. It should emit topic
contact plus optional learner response. Study receives the exact subject and
must return evidence without Know reading Study's DOM.

Current Know-to-Study subject transfer partly works; progress and return context
do not.

## 7. Learner Memory And Progress

The global shelf key must migrate to per-learner evidence. Stable topic IDs
already exist and should remain canonical. Record `opened`, `read`, `answered`,
and `applied` separately. Shelf completion should reflect an agreed meaningful
state, not merely opening the book.

## 8. Content And Source State

There are 52 visible topics across 15 categories. Depth and provenance are
uneven. Some cultural and song examples require source review. The current
resource library supplies candidates, but only approved topic mappings should
be visible. Video rights and availability need fallback handling.

## 9. Checks And Evidence

- Desktop: Know -> Rhythm -> Time Signatures: verified.
- Know -> Study subject signal: partially verified.
- Shelf remained `0/15`: verified defect.
- Accessibility snapshot exposed inactive controls/unlabelled arrows.
- Smoke and ownership checks: pass at `93bcc64`.

Mobile, keyboard page turning, refresh/resume, missing video, and all 52 topic
routes need focused coverage.

## 10. Known Gaps And Risks

- Active legacy reader bypasses canonical progress.
- Global progress leaks across profiles.
- Exposure is easily mistaken for understanding.
- Source coverage and rights are incomplete.
- Inactive content is not hidden from assistive technology.

## 11. Prioritized Next Build

1. **Now:** make one reader path authoritative and emit learner-scoped topic
   evidence. Acceptance: reading Time Signatures updates only the active
   learner's shelf after refresh. Time: 4-6 hours. Credit: medium. Images: no.
2. **Next:** repair Know <-> Study subject and return contracts; add an optional
   check-for-understanding. Time: 4-6 hours. Credit: medium. Research: no.
3. **Later:** source-review and deepen the 52-topic inventory in batches, with
   accessible page controls and media fallbacks. Time: multi-day. Credit:
   medium. Research: yes.

## 12. Do-Not-Disturb List

Do not flatten the library into a dashboard, count opening as mastery, attach
broad category videos to unrelated topics, remove legacy progress before
migration, or rewrite Study from inside Know.

## 13. Recommended Opening Instruction

Read this brief and the audit, verify the live Time Signatures path, and make
the active reader plus learner-scoped evidence authoritative before adding
content. Preserve the library metaphor and cross-node contracts, update this
brief at the checkpoint, explain decisions plainly, and warn before high-credit
research or media work.
