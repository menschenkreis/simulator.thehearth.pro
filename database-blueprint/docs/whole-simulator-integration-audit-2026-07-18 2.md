# The Hearth Mastery Whole-Simulator Integration Audit

Date: 2026-07-18
Branch: `cleanup/handoff-architecture`
Verified code checkpoint: `93bcc64`
Audit prompt: `whole-simulator-integration-audit-and-improvement-prompt-v2.md`

## Executive Verdict

The simulator is no longer a collection of empty mockups. Every learning place
has a recognizable purpose and most have at least one meaningful click path.
The strongest places now feel like parts of a real product: Do can teach and
rate a drill, Practice can run a guided session, Play can open a culturally
framed musical route, Create can save a musical seed, and Mastery can lead a
learner through an encounter.

It is not yet one reliable learning system. The visual entrances are ahead of
the underlying learner model. Ayla and Jen can see different Journey states,
but several nodes still share old global progress. Journey can call Level 1
complete without the evidence that its own capability model asks for. Some
cross-node links carry only a title instead of the learner, activity, lesson,
capability, and return route. Mobile and tablet layouts are not usable enough.

The correct next move is integration, not another broad visual redesign.
Preserve the approved node metaphors, unify learner identity and evidence,
repair the most important handoffs, then run the protected Level 1 content-gap
pass. Content can deepen safely once the simulator knows who did what, where it
belongs, and what should happen next.

## The Product Standard

The Hearth Mastery is a guided guitar-learning world with three connected
layers:

1. **Map:** where a learner may go independently.
2. **Journey:** the ordered path the learner is currently walking.
3. **Learning places:** Foundation, Do, Know, Practice, Study, Hearth, Play,
   Create, and Mastery each own a distinct kind of learning.

The standard for every meaningful click path is:

`Orient -> Act -> Receive feedback -> Save evidence -> Know the next step`

A beautiful entrance is not a finished node. A finished learning place must
also produce a useful action, remember it for the active learner, communicate
with Journey or a neighbouring node through a stable contract, recover when a
learner struggles, and work on the supported screen sizes.

Journey is the itinerary, not a duplicate of the nodes. The Hearth capability
model owns progression. QJam and official music examinations may be useful
external rulers and source material, but neither should own the product spine.

## Readiness Summary

Readiness states used here:

- **Coherent Entrance:** the first click communicates the place and its choice.
- **Working Vertical Slice:** at least one path reaches a meaningful action.
- **Wired Learning Place:** actions, learner memory, Journey evidence, and
  return paths are reliable.
- **Audit Ready:** content, sources, accessibility, responsive behaviour, and
  regressions all meet the product standard.

| Area | Current state | Short verdict |
|---|---|---|
| Foundation | Working Vertical Slice | Strong threshold and Fret 0; progress is not learner-scoped or shared with Journey. |
| Do | Working Vertical Slice | Best drill interaction; visible rings and evidence can disagree. |
| Know | Working Vertical Slice | Strong library metaphor and topic depth; active reader bypasses canonical progress. |
| Practice | Working Vertical Slice | Strong six-stage session; unfinished plans and legacy logs can leak between profiles. |
| Study | Working Vertical Slice | Good evidence doors; non-A-minor subjects can receive the wrong activity text. |
| Hearth | Coherent Entrance | Strong body-system doorway; final screens are still static text and save no evidence. |
| Play | Working Vertical Slice | Mississippi route is substantial; other regions and source coverage are sparse. |
| Create | Working Vertical Slice | Musical seeds can be made and saved; level calibration and summary progress need work. |
| Mastery | Working Vertical Slice | One usable encounter exists; the exemplar and breadth need strengthening. |
| Journey | Working Vertical Slice | Visual roadmap and lesson shell exist; completion, evidence, and Jen's level are not truthful yet. |

No node is Audit Ready. That is not a failure. It is a precise description of
where the prototype has reached.

## Nine-Gate Scorecard

`Pass` means the observed route meets the gate. `Partial` means at least one
usable path exists but the node is inconsistent. `Fail` means the gate is
missing or materially misleading.

| Area | Contract | Entrance | Learning action | Content | Memory | Wiring | Visual | Architecture | Regression |
|---|---|---|---|---|---|---|---|---|---|
| Foundation | Pass | Pass | Partial | Partial | Fail | Fail | Partial | Partial | Partial |
| Do | Pass | Pass | Pass | Partial | Partial | Partial | Partial | Pass | Partial |
| Know | Pass | Pass | Partial | Partial | Fail | Partial | Partial | Partial | Partial |
| Practice | Pass | Pass | Pass | Partial | Partial | Partial | Partial | Partial | Partial |
| Study | Pass | Pass | Partial | Partial | Pass | Partial | Partial | Partial | Partial |
| Hearth | Pass | Pass | Fail | Partial | Fail | Fail | Partial | Partial | Partial |
| Play | Pass | Pass | Pass | Fail | Pass | Partial | Partial | Pass | Partial |
| Create | Pass | Pass | Pass | Partial | Pass | Partial | Partial | Pass | Partial |
| Mastery | Pass | Pass | Pass | Partial | Pass | Partial | Partial | Pass | Partial |
| Journey | Pass | Pass | Partial | Partial | Fail | Fail | Partial | Partial | Partial |

## Active Ownership Map

| Area | Active screen owner | Important collaborators |
|---|---|---|
| Shell and Map | `simulator.html` | map SVG, flame route, header tools |
| Foundation | `adapters/foundation-panel-controller.js` | route manifest, seed loader, map/topic viewers |
| Do | `adapters/doing-panel-controller.js` | drill catalog, room viewer, teaching viewer, progress bridge |
| Know | `adapters/knowing-panel-controller.js` | shelf, book/topic viewers, legacy `book-reader.js` |
| Practice | `adapters/practice-entry-controller.js` | planned session, candle, practice state |
| Study | `adapters/study-key-chamber-viewer.js` | key chamber model and evidence controller |
| Hearth | `adapters/hearth-body-viewer.js` | `assets/js/hearth-body-data.js` |
| Play | `adapters/play-atlas-controller.js` | atlas viewer/model, world route renderer |
| Create | `adapters/create-entry-controller.js` | Create state, Cauldron, handoff controller |
| Mastery | `adapters/mastery-phoenix-viewer.js` | encounter model/controller |
| Journey | `assets/js/journey.js` | `journey-data.js`, TeachingEngine, progress event store |
| Shared events | `adapters/progress-event-store.js` | node-specific progress bridges |

`simulator.html` remains a 4,625-line legacy shell that eagerly loads 142
scripts. It is still the active composition root, but new domain behaviour
should not be added directly to it. The current owners are documented in
`NODE_RENDERER_OWNERSHIP.md` and guarded by
`tools/renderer_ownership_check.py`.

## Verified Click Paths

| Area | Observed path | Meaningful endpoint | Main break |
|---|---|---|---|
| Foundation | Map -> Foundation -> ten-fret path -> Fret 0 | Guided orientation with interaction | Completion is global and does not become shared evidence. |
| Do | Map -> Do -> Left Hand -> A minor pentatonic | Interactive fretboard plus graded feedback | One click can claim mastery; old visible progress is global. |
| Know | Map -> Know -> Rhythm -> Time Signatures | Flipbook topic with text and video | Shelf remained `0/15`; reading is treated too much like understanding. |
| Practice | Map -> Practice -> Planned Session | Arrive, Focus, Set, Practise, Listen, Reflect | Active plan and legacy log are not fully profile-isolated. |
| Study | Map -> Study -> current subject -> evidence door | Door task, confidence, evidence | Time Signatures received A-minor root-note instructions. |
| Hearth | Map -> Hearth -> Brain | Explanatory anatomy/learning text | No action, reflection, evidence, or next step. |
| Play | Map -> Play -> Mississippi | Sources, cultural context, musical route | Other routes and internal source notes are incomplete. |
| Create | Map -> Create -> Cauldron -> Riff -> Stir -> Save | Editable saved song seed | Some random prompts are above Level 1; header summary reads old state. |
| Mastery | Map -> Mastery -> encounter -> Witness | Witness, Notice, Try, Carry route | Exemplar is a tutorial rather than an unmistakable mastery performance. |
| Journey | Journey -> L1 -> roadmap -> entry check | Ten-stage lesson shell and end review | Preflight is labelled Lesson 1/8 and Jen appears L2 despite consolidation decision. |

## Cross-Node And Event Matrix

Canonical prototype events are stored by
`adapters/progress-event-store.js` under `hearth-progress-events`.

| Producer | Current evidence | Useful consumers | Current condition |
|---|---|---|---|
| Foundation | None | Journey, Know, Practice | Missing. |
| Do | `drill_feedback_recorded` | Journey, Practice | Useful event; visible local rings are still global. |
| Know | `concept_read` fallback | Study, Journey | Active reader path and shelf count are inconsistent. |
| Practice | `practice_session_completed` | Journey, Hearth, whole progress | Useful event; legacy session data remains. |
| Study | door visited/evidence recorded | Journey, Practice | Learner-scoped, but subject activity templates are not dependable. |
| Hearth | None | Journey, Practice, teacher review | Missing. |
| Play | `play_activity_completed` | Journey, Create, Practice | Useful on the developed route. |
| Create | handoff/seed events | Journey, whole progress | Learner identity is now explicit for handoff events. |
| Mastery | encounter events | Journey, Practice, Create | Useful for the one developed encounter. |
| Journey | lesson note/completed | all nodes, whole progress | Completion currently outruns capability evidence. |

The event envelope still needs stable `activity_id`, `capability_ids`,
`attempt_id`, `recording_id`, `occurred_at`, `recorded_at`, and a migration
version. It also needs validation and duplicate protection. Nodes must exchange
data through this contract or a handoff adapter, never by reading another
node's private HTML.

## Golden Learner Journeys

### Ayla Takes A Full Level 1 Lesson

Desired path:

`Journey plan -> Tune in -> Review -> Learn -> Do -> Practice -> Play -> Create -> Mastery -> Reflect -> saved evidence -> next recommendation`

Current result: the lesson shell displays the full rhythm, but most stages run
inside Journey rather than opening the node-owned tool. Completion can advance
from a button press without the required capability evidence.

### Jen Consolidates A Minor Pentatonic

Desired path:

`Teacher note -> right-hand pattern + pentatonic safety boxes -> jam -> song
application -> 20-minute practice commitment -> end review -> next song`

Current result: useful Do, Practice, Play, Create, and lesson pieces exist, but
Jen is seeded as Level 2 and the evidence is divided between learner-scoped and
global stores. Her explicit request for consolidation is therefore not the
authoritative next action.

### A Learner Has Only Twenty Minutes

Desired path:

`Profile -> Practice -> recommendation from unfinished capability -> short
session -> feedback -> resume point`

Current result: Practice can run a strong session, but the recommendation and
unfinished plan are not reliably isolated per learner.

### Ayla Prepares And Reviews A Student Lesson

Desired path:

`Select Jen -> see current evidence and last notes -> prepare safe next gradient
-> teach -> guided end review -> save teacher/student notes -> generate next
practice sheet`

Current result: structured notes exist in Journey, but profile switching can
leave the current context and whole-progress numbers mix unrelated counters.

## Journey And Level 1 Truth

The canonical Level 1 capability model contains seven families and seventeen
capabilities. That is the right direction. Current Journey UI still treats the
old lesson total as authority.

Material contradictions:

1. The entry check is marked `countsTowardLevel: false` in data but displayed as
   Lesson 1 of 8 and contributes to `lessonsDone`.
2. There are seven counted authored lessons after the entry check, not eight
   genuine Level 1 lessons.
3. Jen is initialized or forced to Level 2 with 8/8 complete despite the settled
   decision that she needs Level 1 consolidation.
4. Roadmap rows can say Done because lessons were opened/completed even when
   the minimum evidence stage was not reached.
5. Visible copy still calls the path QJam Level 1. QJam is a source and external
   comparison, not the owner of Hearth progression.

Journey must calculate readiness from learner-scoped capability evidence.
Lesson count may remain a useful activity statistic, but it cannot mean mastery
or unlock the next level by itself.

### Protected Level 1 Content-Gap Pass

Do not lose the previously agreed batch:

1. a real song pathway;
2. a systematic listening activity;
3. TAB or diagram contact;
4. stronger right-hand work;
5. multi-day practice-history evidence;
6. a saved creation;
7. a genuine Mastery encounter.

The earlier estimate was 45-75 minutes, medium credit, without image
generation. The audit shows that implementing the content alone may fit that
range, but wiring and testing all seven outcomes honestly is more likely 2-4
hours. Keep it as one named batch after learner identity and Journey evidence
are stable.

## Learner Profiles, Persistence, And Progress

The profile selector looks global, but the data model is only partly global.
Journey, Study, Play, Create, Mastery, and shared events have useful learner
scoping. Foundation, Do's visible rings, Know's shelf, parts of Practice, and
several whole-progress counters still use global legacy keys.

Observed proof: switching from My Journey to Jen changed Journey from 0 to 8
activities while Foundation, Do, Know, Practice, and Create totals stayed the
same. The whole progress result `8/279` mixed lesson counts, clicks, books,
drills, and sessions into one percentage. That number looks precise but has no
coherent learning meaning.

Required correction:

- one active learner service for the entire shell;
- profile-scoped stores or adapters for every node;
- an explicit migration from legacy global keys;
- capability evidence separate from activity totals;
- safe handling for teacher notes and future recordings;
- profile switching that preserves the current screen;
- one open header panel at a time.

## Content, Sources, And Rights

The current library is substantial but uneven: 79 books and 97 structured notes
exist, while coverage is heavily concentrated in Study, Practice, Hearth, and
Foundation. Play has no mapped internal source note, Create has one, and
Mastery has four. Eighty-six QJam videos are catalogued but still marked To
Review; only four are currently tagged for Level 1.

Priority is not collecting more material. First verify and use the existing
Level 1 notes and four candidate videos. Then fill the gaps for songs,
listening, cultural context, right-hand technique, and Mastery exemplars.

Rules:

- distinguish source fact, teaching synthesis, and creative prompt;
- never infer that embedding a public video grants reuse rights;
- link cultural claims to reviewed sources;
- label health, anatomy, and neuroscience material carefully;
- use official examination syllabi later as external benchmarks and progress
  checks, not as the Hearth curriculum or copied proprietary content;
- record title, body, edition/year, URL, access date, rights status, level, and
  capability IDs for every approved resource.

## Visual, Accessibility, Responsive, And Performance Audit

### What Works

- The main map and image-led first clicks now have a recognizable family.
- Foundation, Journey, Do, Practice, Play, Create, and Mastery each use a clear
  central metaphor rather than a generic dashboard.
- Several final endpoints now contain actual interaction rather than a small
  text card.

### Material Problems

- At 390 x 844, Map, Journey, and Do are clipped; header controls disappear.
- At 834 x 1112, iPad portrait also clips important controls.
- At 1112 x 834, content becomes too small with large unused regions.
- SVG map nodes and the travel modal are not represented as usable keyboard or
  screen-reader controls.
- Hidden node panels remain in the accessibility tree on several routes.
- Page-flip arrows lack accessible names.
- Header overlays can remain open together.
- Text and interactive targets become too small in dense Journey rows.

### Performance Risks

- 142 scripts are loaded before they are needed.
- the tracked repository is about 368 MB and includes many 1-3 MB image/source
  variants;
- the ember canvas schedules animation frames continuously;
- the service worker does not provide useful caching;
- active and historical implementations coexist, increasing parse and
  maintenance cost.

Performance work should begin with measurement, lazy loading, and asset
delivery formats. Do not delete high-quality source art; keep source files out
of the delivery bundle and serve optimized derivatives.

## Backend And Handover Risks

1. The browser prototype treats localStorage as both database and application
   logic. A backend cannot safely mirror inconsistent keys.
2. Learner identity is inferred in multiple places instead of injected through
   one service.
3. Event records lack validation, idempotency, stable attempts, and timestamps
   suitable for synchronization.
4. Progress currently mixes exposure, completion, competence, confidence, and
   time.
5. Content objects do not consistently carry source and rights metadata.
6. The giant HTML composition root and repeated global functions make ownership
   hard to transfer.
7. There is no conflict strategy for offline edits or two devices.
8. Recordings and teacher notes will require privacy, retention, and access
   rules before production storage.

Martin or another backend developer should receive contracts and schemas, not
the instruction to reproduce every current localStorage key.

## Prioritized Roadmap

### P0: Make Progress Truthful

1. **Unify active learner and migrate legacy state.**
   Value: Ayla and Jen stop sharing progress accidentally.
   Time: 6-10 hours. Credit: medium. Images: no.

2. **Rebuild Journey completion from capability evidence.**
   Value: Level 1 and unlocks mean something trustworthy.
   Time: 5-8 hours. Credit: medium. Images: no.

3. **Fix phone and iPad composition for the shell, Map, Journey, and Do.**
   Value: the app becomes usable on the devices learners actually use.
   Time: 6-12 hours. Credit: medium. Images: no.

4. **Make active screens and navigation accessible.**
   Value: keyboard, screen reader, and focus behaviour become coherent.
   Time: 5-9 hours. Credit: medium. Images: no.

### P1: Make The Nodes Talk

1. Define one handoff envelope with learner, source node, activity, lesson,
   level, capability IDs, destination, return route, and fallback.
2. Make Study tasks derive from the selected subject.
3. Make the active Know reader emit structured evidence and update the shelf.
4. Give Foundation and Hearth real evidence-producing actions.
5. Redesign whole progress around capability evidence, with time and activity
   totals shown separately.
6. Run the protected Level 1 content-gap pass.

Estimated P1: 15-25 hours, medium credit, no required image generation. Any new
illustration set should be proposed and approved separately.

### P2: Deepen And Prepare For Production

1. complete the source/rights review and official-benchmark crosswalk;
2. broaden Play regions, songs, Create prompts, and Mastery encounters;
3. optimize assets and lazy-load node bundles;
4. move shared schemas, events, profiles, progress, notes, and resources behind
   a backend API;
5. add end-to-end browser tests for golden journeys and migrations.

Estimated P2: multiple staged weeks. Split into small releases rather than one
rewrite.

## Controlled Changes Made During This Audit

Checkpoints `93bcc64`, `9e72414`, and `bb7adaf` contain only low-risk
corrections and safeguards:

- the renderer ownership safeguard now identifies the actual Play controller
  and no longer mistakes equality checks for assignments;
- the ownership document matches the live Play owner;
- authored Journey lessons retain `categoryTags` and `countsTowardLevel` when
  converted into a live lesson;
- Create handoff events explicitly record the active learner;
- the Create handoff learner behaviour is regression-tested;
- Foundation topic scenes use the canonical guide-character catalogue instead
  of obsolete local paths;
- read-only tools now check all loaded JavaScript syntax and local asset
  references;
- the existing Hearth browser and Apple touch icon is linked explicitly.

No node meaning, approved image, learner history, or progression count was
silently rewritten.

## Verification Evidence

Automated checks through `bb7adaf`:

- `tools/prototype_smoke_check.py`: pass;
- `tools/core_smoke_check.py`: pass;
- `tools/core_js_smoke_check.py`: pass;
- `tools/renderer_ownership_check.py`: pass;
- `tools/smoke-nodes.js`: pass for all nine node actions;
- `tools/loaded_javascript_syntax_check.py`: pass for all 142 loaded local
  JavaScript files;
- `tools/local_reference_check.py`: pass for 268 references across
  `simulator.html`, five stylesheets, and 142 scripts;
- `git diff --check`: pass.

Browser walkthrough:

- desktop first-to-final paths were opened for all nine nodes and Journey;
- My Journey and Jen were switched and compared;
- Journey entry check and lesson shell were opened;
- phone 390 x 844, iPad portrait 834 x 1112, and iPad landscape 1112 x 834
  were inspected;
- browser warning/error console was empty during the audit;
- active profile was restored to My Journey after testing.

The final live Foundation walkthrough also confirmed a remaining phone issue:
at 390 x 844 the lesson's bottom action clips and the panel does not provide
the needed scroll. Profile switching confirmed that Foundation visible progress
is still global and that Jen currently exposes Level 2 despite the agreed Level
1 consolidation state. These are recorded failures, not hidden as passes.

## Open Product Decisions

1. What exact evidence combination graduates a learner from Level 1?
2. Should a teacher be able to mark observed competence, and how is that
   distinguished from learner self-rating?
3. Which devices are officially supported for the next prototype milestone?
4. Which official examination frameworks should be crosswalked first?
5. What counts as a genuine Mastery encounter: performance, interview,
   transcription, imitation, or a combination?
6. Which media can be embedded, linked, or stored under current rights?
7. What student notes and recordings may be stored, for how long, and who may
   view them?

## Plain-Language Meaning

The simulator has good rooms. The plumbing between the rooms is unfinished.
The next phase is to give every learner one reliable identity card, give every
activity a truthful receipt, and make Journey read those receipts before it
says a level is complete. Then the content work becomes much more powerful,
because every new song, drill, book, or reflection can land in the right place
and influence what the learner sees next.

Fresh node handoffs are stored in
`database-blueprint/docs/node-continuation-briefs/`. Each specialist task should
read this audit and its own continuation brief before editing.
