# Know Node Audit And Completion Brief

Date: 2026-07-18

Inspected branch: `cleanup/handoff-architecture`

Inspected commit: `2b9f9bb`

## Purpose Of Know

Know is the source-backed reference library.

It should answer a focused question such as:

> What does this word, sound, shape, or musical relationship mean?

Know is not the main lesson path and should not become a passive completion
machine. Study owns deeper clarification and testing. Do, Practice, Play, and
Create own physical and musical proof.

## Verified Current Experience

The live route was browser-checked on 2026-07-18.

The learner can currently:

1. open Know from the map;
2. enter a scene-first shelf interface;
3. see Level 1 category availability and visited counts;
4. open a category such as Rhythm;
5. enter the page-turning book reader;
6. see source-library attribution on the shelf.

The shelf currently exposes fifteen categories and reports which categories
have no Level 1 topics. The sampled Rhythm book opened successfully. No console
warnings appeared in the sampled route.

## Active Ownership

Primary entrance and shelf ownership:

- `adapters/knowing-panel-controller.js`
- `adapters/knowing-shelf-viewer.js`
- `assets/js/knowing.js`

The active book route currently delegates to the global `openBook` function in:

- `assets/js/book-reader.js`

Alternative or fallback readers also exist:

- `adapters/knowing-book-viewer.js`
- `adapters/knowing-topic-viewer.js`
- `adapters/knowing-progress-controller.js`

This split ownership is important. The attractive active flipbook bypasses
some progress behaviour that exists only in the fallback topic viewer.

## Current Content Shape

The current data contains:

- 15 categories
- 52 topics
- non-empty topic bodies and source labels

Current level distribution is uneven:

- Level 1: 15 topics
- Level 2: 15 topics
- Level 3: 13 topics
- Level 4: 2 topics
- Level 5: 4 topics
- Level 6: 1 topic
- Level 7: 1 topic
- Level 8: 1 topic

This is acceptable for a Level 1 prototype if later levels are honestly marked
as incomplete. It is not yet an eight-level reference curriculum.

## Important Findings

### 1. The Active Book Route Does Not Clearly Record Evidence

The shelf reads `hearth-knowing-progress`, but the active page-turning reader
does not visibly call the old topic-progress function or emit `concept_read`.
The fallback topic viewer has a "Mark as understood" action, but the active
reader appears to bypass it.

The result is a dangerous split: an attractive route with weak memory, and an
older route with a simplistic completion button.

### 2. Existing Progress Is Not Learner-Specific

`hearth-knowing-progress` is a shared browser key. My Journey and Jen can
therefore inherit the same visited state.

### 3. Reading Is Not Understanding

The fallback phrase "Mark as understood" overstates what one page visit proves.
Know should distinguish opened, read, needs review, clarified, and applied.

### 4. Sources Need Better Precision

The current source shelf is a useful start. Topic-level claims still need exact
source mapping, edition or page where practical, rights status, and a distinction
between direct source material, paraphrase, teacher interpretation, and product
metaphor.

### 5. The Know/Study Boundary Needs A Real Handoff

Know can explain. Study should help the learner clarify, compare, test, and
review. The current book endpoint does not consistently send the learner into a
useful next action or return them to the lesson that asked the question.

## Highest-Priority Remaining Work

### 1. Establish One Active Book Owner

Keep the approved shelf and flipbook feel, but choose one active reader path.
Move progress and handoff behaviour into that path. Do not maintain two
different truths about whether a topic was learned.

### 2. Add Learner-Specific Reference Evidence

Suggested states:

- Opened
- Read or viewed
- Still unclear
- Clarified
- Applied on guitar
- Review later

Store learner ID, topic ID, source route, time, question or misunderstood word,
and return destination. Emit shared events without claiming mastery.

### 3. Define Know And Study Together

Each topic should offer only relevant actions:

- Read the concise reference
- Hear or inspect an example
- Clarify in Study
- Try the related drill or musical action
- Return to the current Journey lesson

Avoid generic buttons on every page.

### 4. Perform A Topic-Level Source Audit

For every Level 1 topic:

- identify the precise claim;
- confirm the source supports it;
- paraphrase rather than copy;
- mark rights and provenance;
- remove or qualify unsupported learning-science claims;
- map video only when it directly teaches that topic.

### 5. Strengthen Final Contact Without Building A Card Wall

Useful assets include playable audio examples, fretboard diagrams, short TAB,
rhythm grids, chord-shape comparisons, and source-aware video excerpts or links.
Each asset should answer the topic's question.

### 6. Test All Level 1 Categories And Profile Isolation

Verify shelf navigation, page turns, back paths, refresh, keyboard use, reduced
motion, mobile layout, progress updates, and My Journey/Jen separation.

Extend renderer-ownership checks to cover the Know shelf and selected book
reader.

## Protected Decisions

- Keep Know as a library, not a dashboard.
- Keep the scene-first shelf and book metaphor.
- Keep explanations plain and simple.
- Keep source attribution visible.
- Do not award understanding merely for opening a page.
- Keep long study experiences in Study unless the reference itself requires
  them.
- Do not fill later levels with generic text just to make the shelf look full.

## Cross-Node Contracts

- Journey and Foundation can open a stable Know topic ID and receive a return.
- Study receives the same concept ID plus the learner's actual question.
- Do, Practice, Play, or Create can provide application evidence.
- Journey may display reference contact but must not convert it directly into
  capability mastery.

## Acceptance Checkpoint

Know reaches a stable checkpoint when:

- one reader owns the live book experience;
- opening and clarifying are stored separately per learner;
- Level 1 topic claims are source-reviewed;
- every useful next action returns to its originating route;
- the Know/Study boundary is clear in code and UI;
- all Level 1 books pass browser and accessibility checks;
- later-level incompleteness is honest.

## Verification Already Run

- `tools/prototype_smoke_check.py`: passed
- `tools/core_smoke_check.py`: passed
- `tools/core_js_smoke_check.py`: passed
- live Know entrance, Level 1 shelf, and Rhythm flipbook: passed
- static data check: 15 categories and 52 non-empty topics

The shared renderer-ownership check currently fails elsewhere and does not yet
protect the selected Know book owner.

## Suggested Work Size

- Reader ownership and learner evidence: 3 to 5 hours, medium credit
- Level 1 source audit: 4 to 8 hours, medium credit
- Know/Study and return handoffs: 2 to 4 hours, medium credit
- Focused browser and profile tests: 1 to 2 hours, low-to-medium credit
- New audio or visual teaching assets: separate approved batches

