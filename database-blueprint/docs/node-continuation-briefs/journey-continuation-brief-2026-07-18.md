# The Hearth Mastery: Journey Continuation Brief

Date: 2026-07-18
Branch: `cleanup/handoff-architecture`
Verified commit: `93bcc64`
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Working Vertical Slice; progression truth not yet reliable
Browser verification: desktop complete through entry lesson; responsive failing

## 1. Plain-Language Purpose

Journey answers, "What should I do next?" It is the itinerary through the
learning places, not a duplicate curriculum hidden inside one screen. It orders
work, explains the current level, reads evidence, remembers lesson reviews, and
offers the next safe step. The nodes own their actions and content.

## 2. Verified Current Experience

- The guitar map shows Levels 1-7 and the phoenix destination.
- L1 opens a reusable capability roadmap with category rows.
- The entry check opens a ten-stage lesson shell: Review, Tune in, Warm up,
  Learn, Try, Practice, Play, Create, Mastery, and Review notes.
- The entry check is displayed as Lesson 1 of 8 although data marks it preflight.
- Jen appears Level 2 with L1 8/8 complete despite the settled consolidation
  decision.
- Level 2-8 content is mostly placeholder.
- Phone and iPad layouts are clipped or too small.

## 3. Active Ownership Map

- Main owner: `assets/js/journey.js`
- Canonical capabilities/evidence/activity map: `assets/js/journey-data.js`
- Lesson presentation: TeachingEngine plus Journey lesson builders
- State: `hearth-journey-v3` learner records and active student
- Events: teacher lesson note and lesson completed
- Evidence inputs: shared progress event store and node bridges
- Compatibility: `adapters/journey-legacy-handlers.js`
- Tests: capability and Level 1 mapping assertions in core JS smoke check
- Legacy risk: lesson-count completion and Jen quick-note seed still override
  capability truth.

## 4. What The Audit Changed

Authored live lessons now retain `categoryTags` and `countsTowardLevel` when
built, so reviews and future evidence mapping do not lose their metadata. No
existing learner counts, unlocks, or notes were rewritten.

## 5. Protected Decisions

- Map is where you can go; Journey is the path you are walking.
- Foundation is threshold, not Level 1.
- Hearth capability model owns progression; QJam is a source/benchmark only.
- Jen remains in Level 1 consolidation until evidence supports movement.
- Lesson rhythm: Review, Tune in/Warm up, Learn, Try/Do, Practice, Play, Create,
  Mastery, Reflect/review. It may compress for shorter sessions.
- Guide language is contextual and uses structured learner memory.
- Wrong answers trigger a smaller gradient and re-explanation.
- A lesson ends with guided feedback, reminders, and the next practice sheet.

## 6. Cross-Node Contracts

Journey sends learner, lesson/activity, level, capability IDs, node destination,
task parameters, and return route. Each node owns its action and returns an
evidence event. Journey interprets events through capability rules and updates
recommendations. If a node is unavailable, Journey may show an explicit
temporary fallback but must not silently claim node evidence.

Required handoff envelope:

- learner and teacher role;
- source/destination node;
- activity, lesson, level, and capability IDs;
- parameters and pass condition;
- return route;
- attempt ID and timestamps;
- fallback instruction.

## 7. Learner Memory And Progress

Journey has learner records, notes, ratings, and lesson history. Completion is
still mainly `lessonsDone`, while the capability map defines stronger evidence
requirements. Migrate by recalculating capability evidence from shared events
and preserving old counts as historical activity, not mastery. Do not silently
erase Jen's notes. Separate learner rating, teacher observation, repeated
practice, musical application, and saved artifact.

## 8. Content And Source State

Level 1 has an entry preflight plus seven counted authored lessons, not eight
genuine lessons. Level 2-8 are outlines/placeholders. Existing Level 1 content
needs song, listening, TAB/diagram, stronger right hand, multi-day practice,
saved creation, and a genuine Mastery encounter. Four candidate QJam Level 1
videos should be reviewed before adding more media. Official examinations are
future external crosschecks, not curriculum owners.

## 9. Checks And Evidence

- Journey guitar map, L1 roadmap, entry check, and ten-stage shell: verified.
- My Journey/Jen switch and contradictory counts: verified.
- Capability families, 17 L1 capabilities, eight current activity mappings,
  and preflight flag: automated pass.
- Authored metadata preservation: syntax and smoke checks pass at `93bcc64`.
- Phone and iPad responsive failure: verified.

Evidence-based unlock, migrations, node return, refresh/resume, keyboard map,
and complete end-review tests are pending.

## 10. Known Gaps And Risks

- Journey can announce false completion/unlocks.
- Jen's seeded L2 state contradicts current teaching needs.
- Preflight and lesson numbering are inconsistent.
- Lesson shell often imitates node work rather than launching node-owned tools.
- Whole progress mixes incomparable counters.
- Level 2-8 imply more curriculum than exists.
- Mobile/tablet layouts are unusable.

## 11. Prioritized Next Build

1. **Now:** define the evidence-based Level 1 calculation and a non-destructive
   migration preview. Acceptance: preflight never counts; Jen remains L1; no
   unlock occurs without configured evidence; old notes remain. Time: 5-8
   hours. Credit: medium. Images/research: no.
2. **Next:** implement one real node round trip from Lesson 1 with the shared
   handoff envelope and guided end review. Time: 4-7 hours. Credit: medium.
   Images: no.
3. **Next:** run the protected content-gap pass: song, listening, TAB/diagram,
   right hand, multi-day practice, saved creation, Mastery encounter. Time:
   2-4 hours for prototype content plus review. Credit: medium. Research:
   targeted. Images: not required.
4. **Later:** author and validate the rest of Level 1, then crosswalk official
   benchmarks before expanding Level 2. Time: multi-day. Credit: medium-high.

## 12. Do-Not-Disturb List

Do not promote Jen automatically, rename QJam as the product spine, merge
Foundation into Level 1, fake node evidence inside Journey, delete old notes,
unlock by lesson count alone, or design Levels 2-8 in depth before Level 1 is
truthful.

## 13. Recommended Opening Instruction

Read this brief, the whole-simulator audit, the capability map, and the Level 1
content-gap roadmap. Inspect My Journey and Jen before editing. Implement the
evidence calculation and migration preview first, preserve notes and node
ownership, update this brief at the checkpoint, explain decisions plainly, and
warn before high-credit work.
