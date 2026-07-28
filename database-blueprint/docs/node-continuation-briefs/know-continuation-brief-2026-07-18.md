# The Hearth Mastery: Know Continuation Brief

Date: 2026-07-18
Branch: `cleanup/handoff-architecture`
Verified commit: `93bcc64`
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Working Vertical Slice
Browser verification: desktop complete; responsive and keyboard partial

## 2026-07-20 Implementation Checkpoint

Know now has one authoritative live reading experience: the approved flipbook
remains the visual reader, but it records progress through the shared canonical
event store instead of the old global shelf counter.

Completed in this checkpoint:

- `opened`, `read`, `answered`, and `applied` are separate evidence stages;
- all new evidence is attached to the active learner and stable topic ID;
- old global progress is preserved as historical data and is not assigned to a
  learner automatically;
- opening or reading a topic does not award capability credit;
- a correct check response can award the approved Know capability;
- Time Signatures has a small check-for-understanding;
- Know sends the exact topic ID, title, category, and source route to Study;
- Study preserves separate door evidence when the learner changes subjects;
- the flipbook controls have accessible names and the background is inert while
  the book is open;
- focused model, route, learner-separation, syntax, reference, and browser checks
  pass.

The next Know work is content and return-route depth, not another reader
rewrite. Missing-media fallback, source review across the full topic inventory,
responsive testing, and a real Study/Journey `applied` return remain open.

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

The audit first verified the live library path, topic-specific video, stale
shelf progress, competing reader ownership, and accessibility problems. The
2026-07-20 checkpoint then repaired the reader/progress boundary without
replacing the approved shelf or book metaphor.

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

Know-to-Study now transfers the exact subject and source context. A full
Study-to-Know/Journey return carrying `applied` evidence remains unfinished.

## 7. Learner Memory And Progress

New progress is projected from per-learner canonical evidence. The old global
shelf key remains untouched because its learner ownership is ambiguous. Stable
topic IDs remain canonical. Shelf contact reflects visited topics; understanding
and capability evidence remain visibly separate.

## 8. Content And Source State

There are 52 visible topics across 15 categories. Depth and provenance are
uneven. Some cultural and song examples require source review. The current
resource library supplies candidates, but only approved topic mappings should
be visible. Video rights and availability need fallback handling.

## 9. Checks And Evidence

- Desktop: Know -> Rhythm -> Time Signatures: verified.
- Know -> Study exact subject signal: model verified.
- Shelf contact updates only from learner-scoped evidence: model and browser
  verified.
- Inactive background and labelled book controls: browser verified.
- Smoke, ownership, syntax, and local-reference checks: pass at the 2026-07-20
  checkpoint.

Mobile, keyboard page turning, refresh/resume, missing video, and all 52 topic
routes need focused coverage.

## 10. Known Gaps And Risks

- Missing media currently has weak fallback guidance.
- The `applied` stage needs a real return from Study, Journey, or guitar use.
- Source coverage and rights are incomplete.
- Responsive and full keyboard coverage are incomplete.

## 11. Prioritized Next Build

1. **Now:** add missing-media fallback and prove one Study/Journey return that
   records `applied` without awarding fake mastery. Time: 2-4 hours. Credit:
   low to medium. Images: no.
2. **Next:** responsive and keyboard testing for the shelf, flipbook, check, and
   return route. Time: 2-4 hours. Credit: medium. Research: no.
3. **Later:** source-review and deepen the 52-topic inventory in batches. Time:
   multi-day. Credit: medium. Research: yes.

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
