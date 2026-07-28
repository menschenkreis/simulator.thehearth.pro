# Journey Audit And Completion Brief

Date: 2026-07-18

Inspected branch: `cleanup/handoff-architecture`

Inspected commit: `2b9f9bb`

## Purpose Of Journey

Journey answers:

> What should I do next, and why is that the right next step for me?

Journey is the itinerary. The nodes are the places. It should recommend and
connect node-owned activities, remember evidence, and make progress
understandable without pretending learning is linear.

## Verified Current Experience

The live route was browser-checked on 2026-07-18.

The learner can currently:

1. open a guitar-neck Journey map with eight level markers;
2. switch between My Journey and Jen;
3. open a reusable Level 1 curriculum roadmap;
4. inspect ten skill categories across eight levels;
5. see some Do evidence on the category map;
6. begin Level 1;
7. enter a visible ten-stage lesson path:
   - Review
   - Tune in
   - Warm up
   - Learn
   - Try it
   - Practice
   - Play
   - Create
   - Mastery
   - Review notes

The sampled lesson was "Level 1 Entry Check". No console warnings appeared in
the sampled route.

## Active Ownership

Primary Journey ownership:

- `assets/js/journey.js`
- `assets/js/journey-data.js`
- `adapters/journey-legacy-handlers.js`

Important shared contracts:

- `database-blueprint/docs/hearth-level-one-capability-map-v1.md`
- `database-blueprint/docs/level-one-content-gap-pass-roadmap-v1.md`
- shared progress-event store and node progress bridges

Journey state currently lives primarily under:

- `hearth-journey-v2`
- `hearth-journey-active-student`

Optional remote syncing exists but is disabled unless explicitly enabled.

## Strong Foundations Already Present

The Journey data now contains a Hearth-owned capability model rather than
treating QJam as the product authority.

It includes:

- seven capability families;
- seventeen Level 1 capabilities;
- evidence stages from first contact through external assessment;
- activity-to-capability mappings;
- evidence and artifact rules;
- eight authored Level 1 lessons;
- a current Jen lesson-companion path.

This is the right conceptual foundation. The main remaining problem is that the
active progression engine does not yet use all of it as authority.

## Important Findings

### 1. Lesson Count Still Controls Progression

The visible roadmap and unlock logic still largely use `lessonsDone / 8`.
Completing lessons can unlock the next level without enforcing the capability,
evidence, artifact, reflection, or consolidation rules already defined in the
new model.

The capability model currently informs the design more than it governs the
product.

### 2. The Entry Check Is Counted As Lesson 1

The data identifies the Level 1 entry check as preflight and says it should not
count toward level completion. The live UI labels it "Lesson 1 of 8" and the
count-based engine can treat it as ordinary completion. These truths must be
reconciled.

### 3. Jen Is Ahead Of The Settled Product Decision

The live browser showed Level 2 unlocked for Jen. Default Journey data also
initialises Jen with Level 1 complete, and a quick-note helper can force Level
2.

The current decision is different: Jen is consolidating Level 1 and does not
want more challenge yet. Fix this with a careful state reconciliation or
migration. Do not erase genuine lesson notes.

### 4. Node Names Do Not Yet Guarantee Node-Owned Activity

The visible lesson path labels stages as Hearth, Practice, Study/Knowing, Do,
Play, Create, and Mastery. Many stages still run inside Journey's own teaching
flow rather than launching the canonical node activity and receiving evidence
back.

This creates duplicate lessons and weak cross-node memory.

### 5. Category Progress Is Partly Inferred From Lesson Text

The roadmap can show Do evidence, which is a good start. Much of its category
progress still comes from lesson numbers or text matching rather than the
capability evidence ledger.

### 6. Levels 2 Through 8 Are Not Fully Authored

Later levels use generic concept and task fallbacks. They are useful structural
placeholders, not a finished curriculum. Keep them locked and honest while
Level 1 is proven.

## Highest-Priority Remaining Work

### 1. Make Capability Evidence The Progress Authority

Define one calculation that explains:

- what has been encountered;
- what has been attempted;
- what has been demonstrated;
- what has been applied musically;
- what has been consolidated across time;
- what still needs evidence;
- why the next recommendation was chosen.

Lesson completion can remain evidence, but it cannot be the whole rule.

### 2. Correct The Entry Check And Jen State

- Treat the entry check as preflight.
- Stop it from consuming one of the eight true lesson completions unless the
  curriculum is deliberately redefined.
- Reconcile Jen to Level 1 consolidation.
- Preserve existing notes, preferences, and real attempts.
- Remove helpers that silently force a learner to Level 2.

### 3. Wire One Complete Cross-Node Vertical Slice

Use stable activity and capability IDs for:

1. Journey recommendation
2. tune/body check
3. exact Do drill
4. Practice repetition
5. Play song or jam
6. Create variation
7. Hearth reflection
8. Mastery encounter
9. next Journey recommendation

Every launch must carry learner, level, source, return destination, and expected
evidence. Every return must record what actually happened.

### 4. Preserve And Complete The Level 1 Content Gap Pass

Do not lose this protected work:

- one complete small song or mini-piece pathway;
- one systematic listening activity;
- first TAB or diagram contact;
- stronger right-hand development;
- practice-history evidence across days;
- one saved creative choice;
- one relevant Mastery encounter.

This is the next content build after the progression and handoff contracts are
safe enough to carry it.

### 5. Turn Jen's Real Evidence Into Teacher Support

Journey should generate a practical preparation and review loop from:

- what was reviewed;
- what was introduced;
- what remained confusing;
- what sounded musical;
- what Jen enjoyed or requested;
- what needs repetition;
- what Ayla should prepare;
- the next safe gradient.

Jen's current anchor is A minor pentatonic consolidation, right-hand patterns,
root notes, CAGED context, jamming, and a song using rhythm and lead guitar.

### 6. Review The Roadmap's Information Density

The ten-category roadmap is meaningful but long. Improve scanning and mobile
behaviour without replacing it with another dashboard or decorative card wall.
Progress explanations should come from real evidence, not more labels.

### 7. Keep External Curricula As Crosswalks

QJam and official music-exam syllabi can help check omissions, sequence,
terminology, and assessment ideas. They must be recorded as sources or
crosswalks, not silently become Hearth's level authority. Verify current exam
syllabi and usage rights before integrating them.

## Protected Decisions

- Foundation is before Level 1.
- Journey is a top-level path, not a tenth map node.
- The guitar-neck level map remains the first visual metaphor.
- Level colour stays consistent throughout each level.
- The roadmap can be reused for every level and learner.
- The nodes own their activities; Journey owns sequencing and recommendation.
- Progress is evidence, not decoration or click count.
- Level 1 consolidation is more important than rushing into Level 2.
- The Level 1 content-gap pass remains protected.

## Acceptance Checkpoint

Journey Level 1 reaches a stable checkpoint when:

- the entry check is correctly treated as preflight;
- Jen is not pushed into Level 2 by default or helper code;
- capability evidence, not lesson count alone, explains progress;
- one complete cross-node Ayla/Jen route launches and returns correctly;
- My Journey and Jen evidence never mixes;
- the learner can see what is next and why;
- the seven protected Level 1 content gaps are implemented;
- later levels remain honest placeholders until authored;
- desktop and mobile browser checks pass.

## Verification Already Run

- `tools/prototype_smoke_check.py`: passed
- `tools/core_smoke_check.py`: passed
- `tools/core_js_smoke_check.py`: passed
- live Journey map, Level 1 roadmap, and lesson path: passed
- live learner switch: passed
- live Jen state: Level 2 was unlocked, confirming the mismatch

The shared renderer-ownership check currently fails elsewhere and does not yet
assert Journey ownership. Add Journey to that check.

## Suggested Work Size

- Progress authority and entry-check correction: 4 to 8 hours, medium credit
- Jen state reconciliation and migration: 1 to 3 hours, medium credit
- One complete cross-node vertical slice: 6 to 12 hours, medium-to-high credit
- Protected Level 1 content-gap pass: 45 to 75 minutes for the first structured
  pass, followed by separate tested implementation batches
- Roadmap responsive polish: 2 to 4 hours, medium credit
- Exam-framework research and crosswalk: separate sourced task, medium credit

