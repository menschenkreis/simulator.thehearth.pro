# Node Remaining Work Index V1

Date: 2026-07-18

## Post-Audit Status

This document is the preserved pre-audit control index. The whole-simulator
audit has now been completed against code checkpoint `93bcc64`.

Use these current documents for new work:

- `whole-simulator-integration-audit-2026-07-18.md`
- `node-continuation-briefs/README.md`

The remaining-work briefs below are still useful historical evidence, but the
fresh continuation briefs supersede their readiness claims and next-step order.

## Purpose

This is the control document for unfinished node work before the final
whole-simulator integration audit.

It prevents three common mistakes:

1. treating an intentionally unfinished feature as a regression;
2. trusting a handover's "already completed" list without checking the live
   route;
3. polishing nodes independently while their learner evidence and handoffs
   remain disconnected.

The detailed node briefs remain the source for implementation specifics. This
index shows how those briefs fit together, what still needs confirmation, and
which dependencies should be handled first.

## Status Language

- **Claimed complete** means a handover says the work exists. The final audit
  must still verify it in the current branch and browser.
- **Stable checkpoint** means the primary route works, the active owner is
  known, learner separation is tested, and focused checks pass.
- **Intentional gap** means planned work that must not be reported as an
  accidental regression.
- **Future stage** means useful work that should not block the immediate
  learning-product completion pass.

## Whole-System Readiness Snapshot

| System | Current reading | Most important next proof | Audit readiness |
| --- | --- | --- | --- |
| Foundation | Ten-fret first click and Fret 0 guided scene are live; ten seed routes exist | Make progress learner-specific, enforce one Foundation/Journey readiness rule, source-review all ten topics, and strengthen later endpoints | Visual route is strong; memory, evidence, and content gaps remain |
| Do | First click, left/right/both rooms, thirteen curated Level 1 drills, teaching scenes, and shared drill events are live | Unify learner-specific rings and events, replace one-click mastery, validate the drill set, and complete direct Practice/Journey handoffs | Strong Level 1 vertical slice; evidence and handoff gaps remain |
| Know | Level shelves and the flipbook reader are live with 15 categories and 52 topics | Give the active reader one owner, add learner-specific evidence, source-review Level 1, and complete Know/Study returns | Visual route is strong; active-reader memory and source gaps remain |
| Journey | Guitar map, Level 1 roadmap, ten-stage lesson path, capability model, and Jen companion exist | Make capability evidence authoritative, treat entry check as preflight, return Jen to Level 1 consolidation, and prove one connected cross-node slice | Intentional progression, content, and integration gaps remain |
| Practice | Six-stage planned practice, free practice, resume, recording, reflection, events, and recommendations are claimed complete | Test the full learner-specific route, converge storage ownership, enrich Do handoff context, and prove Journey consumes the result | Close to stable checkpoint, verification pending |
| Study | Six-door Key Chamber, learner state, proof statuses, events, and downstream readers are claimed complete | Browser-test every door and lock, prove learner isolation, settle one active owner, and verify downstream evidence | Close to stable checkpoint, verification pending |
| Hearth | Inner Instrument meaning and seven systems are settled; approved artwork and prototype exist | Install the approved first click, establish one active owner, build the Brain pilot chamber, and connect shared evidence | Deliberate rebuild in progress |
| Play | One complete Mississippi Delta route is claimed; other locations are intentionally unfinished | Verify the live owner, resume/profile behaviour, event consumption, responsive flow, and honest incomplete states | One vertical slice near checkpoint |
| Create | Cauldron, image-led routes, learner state, actions, and handoffs are claimed | Make saved seeds genuinely reopenable and structured; connect Practice/Play inputs and Journey evidence | Functional foundation; persistence and integration gaps remain |
| Mastery | One Level 1 pentatonic encounter and its learner-aware loop are claimed | Complete Practice/Create return paths, Journey recommendation use, review, profile tests, and legacy-seal cleanup | One vertical slice near checkpoint |
| Shared audio | Audition work, plan, selected local sound candidates, synthetic fallback, and campfire ambience exist | Obtain the approved filename list, build one shared manager/manifest, enforce overlap and loop rules, then integrate only approved compressed assets | Planned infrastructure; do not guess selections |
| App/PWA readiness | A production audit brief exists | Run only after the primary learning routes and ownership boundaries are stable | Future stage |

## Detailed Briefs

### Foundation

Read:

- `foundation-node-remaining-work-brief-2026-07-18.md`

Protect:

- Foundation as the threshold before Level 1;
- the ten-fret guitar-neck metaphor;
- the approved scene-first Fret 0 orientation.

Resolve:

- learner-specific progress and shared events;
- one real Foundation-to-Journey readiness rule;
- factual and source review for all ten topics;
- useful guitar contact at later lesson endpoints;
- profile, mobile, refresh, and accessibility checks.

### Do

Read:

- `do-node-remaining-work-brief-2026-07-18.md`

Protect:

- the guitar first click and left/right/both-hand rooms;
- the thirteen-drill Level 1 catalogue;
- the image-led teaching scene and interactive drill assets.

Resolve:

- the split between global visual rings and learner-specific events;
- the one-click Mastered label;
- exact Practice and Journey launch/return context;
- technical review of every Level 1 drill;
- ownership, profile, responsive, and accessibility checks.

### Know

Read:

- `know-node-remaining-work-brief-2026-07-18.md`

Protect:

- the source-backed shelf and book metaphor;
- plain explanations;
- honest incomplete later levels.

Resolve:

- one active reader owner;
- learner-specific opened, unclear, clarified, applied, and review evidence;
- the active flipbook's missing progress contract;
- precise topic-level sources and rights;
- Know/Study and return-to-lesson handoffs.

### Journey

Read:

- `journey-remaining-work-brief-2026-07-18.md`
- `hearth-level-one-capability-map-v1.md`
- `level-one-content-gap-pass-roadmap-v1.md`

Protect:

- Journey as the itinerary and nodes as the places;
- the guitar-neck level map and reusable curriculum roadmap;
- Hearth-owned capabilities rather than QJam-owned progression;
- the protected Level 1 content-gap pass.

Resolve:

- count-based progression versus capability evidence;
- the entry check being displayed and counted as Lesson 1;
- Jen's incorrect Level 2 unlock despite the Level 1 consolidation decision;
- stable node-owned launches and evidence returns;
- the connected Ayla/Jen Level 1 vertical slice.

### Practice

Read:

- `practice-node-remaining-work-brief-2026-07-18.md`

Protect:

- the six-stage planned-practice flow;
- free-practice choices;
- learner-specific resume, reflection, recording, and recommendation behaviour;
- the principle that Practice repeats work rather than owning the drill itself.

Resolve:

- direct Do handoff context, including stable drill ID, BPM, repetitions, clean
  takes, duration, learner, and return destination;
- browser recording persistence and the future backend contract;
- Journey consumption of Practice evidence;
- Previous Practice usefulness;
- competing storage authorities.

### Study

Read:

- `study-node-remaining-work-brief-2026-07-18.md`

Protect:

- the six Key Chamber doors: Word, Sound, Shape, Pattern, Test, and Review;
- source-backed clarification rather than passive reading;
- learner-specific understood, review, and unclear states;
- the boundary between Study, Know, and physical/musical proof.

Resolve:

- all door, lock, refresh, and profile-isolation tests;
- one active owner, currently expected to be
  `study-key-chamber-viewer.js` if the live branch confirms it;
- evidence-stage rules and downstream event use;
- the backend state contract before adding a large amount of richer content.

### Hearth

Read:

- `hearth-node-remaining-work-brief-2026-07-18.md`

Protect:

- Hearth as the Inner Instrument, not a generic wellbeing dashboard;
- the seven systems: brain, eyes, ears, hands, breath, feeling, and
  integration;
- the approved V2 first-click artwork unless a specific defect is found.

Resolve:

- approved layered installation into the active Hearth viewer;
- one active renderer;
- the Brain chamber as the first complete content and interaction pilot;
- careful, non-fabricated links between learning evidence and body/attention
  reflection;
- later chambers only after the pilot proves the pattern.

### Play

Read:

- `play-node-remaining-work-brief-2026-07-18.md`

Protect:

- musical conversation, listening, pulse, home, roles, swapping, and
  reflection;
- cultural specificity and source distinctions;
- honest unfinished states for locations that do not yet have complete routes.

Resolve:

- live owner and duplicate-renderer verification;
- the complete Mississippi Delta route for Ayla and Jen, including resume and
  duplicate-event checks;
- Practice and Journey consumption of Play evidence;
- responsive, keyboard, reduced-motion, loading, and drawer-density issues;
- redundant active-learner labels if both shell and node display them.

### Create And Shared Audio

Read:

- `audio-create-integration-remaining-work-brief-2026-07-18.md`

Protect:

- the Cauldron and musical-seed metaphor;
- learner-specific creative state and source context;
- the approved sound-selection process;
- synthetic fallback sounds until approved audio files are named and imported.

Resolve:

- structured, versioned, reopenable saved seeds with recordings and source
  context;
- Practice and Play inputs into Create and Journey evidence out;
- contextual guide behaviour and learner separation;
- one shared audio manager and manifest with mute, category volume, missing
  asset fallback, overlap control, and one ambience loop at a time;
- rights and provenance for every imported sound.

Do not inspect browser local storage to guess Ayla's selected filenames. Obtain
the explicit list or screenshot first. Do not download random drum or backing
audio.

### Mastery

Read:

- `mastery-node-remaining-work-brief-2026-07-18.md`

Protect:

- the **Witness -> Notice -> Try -> Carry** loop;
- Mastery as an encounter with developed artistry rather than another lesson
  dashboard;
- the first Level 1 pentatonic encounter while its integration is verified.

Resolve:

- full browser and profile-isolation testing;
- rich Practice back-reference fields such as encounter ID, exemplar ID,
  notice, and try idea;
- Create outcome backtracking;
- review and Journey recommendation use;
- responsive visual checks;
- legacy `MASTERY_SEALS` and `openSeal()` only after proving they are unused.

### Protected Level 1 Content Gap

The protected Level 1 content gap pass includes:

- a complete small song or mini-piece pathway;
- a systematic listening activity;
- first TAB/diagram contact;
- stronger right-hand development;
- practice-history evidence across days;
- one saved creative choice;
- a relevant Mastery encounter.

The first connected vertical slice should remain grounded in Ayla and Jen's
real need: A minor pentatonic used musically with rhythm and lead roles, roots,
three boxes, CAGED context, right-hand work, repetition, jamming, and a song.

### App Readiness

Read:

- `app-readiness-audit-brief-2026-07-18.md`

This is a separate production track:

**prototype -> responsive web app -> PWA -> optional app-store wrappers**

It covers architecture, backend, security, privacy, mobile/iPad behaviour,
performance, packaging, and release phases. It must inform current architecture
decisions, but it should not interrupt completion of the core learning routes.

## Current Handover Set

Current remaining-work handovers exist for Foundation, Do, Know, Journey,
Practice, Study, Hearth, Play, Create/audio, and Mastery. They are pre-audit
evidence, not permanent truth. Fresh verified continuation briefs now live in
`node-continuation-briefs/`.

The 2026-07-18 shared checks currently report:

- prototype smoke check: passed;
- core smoke check: passed;
- core JavaScript smoke check: passed;
- renderer-ownership check: passed after correcting the stale Play expectation
  and equality-check parser at `93bcc64`.

The audit still found active legacy overlap beyond this global ownership check;
see the master audit and node briefs before removing compatibility code.

## Cross-Node Dependency Order

The safest order is:

1. **Confirm active ownership and live routes.** Resolve duplicate viewers,
   stale overrides, and missing handovers before judging polish.
2. **Protect learner identity and shared event context.** Every handoff must
   preserve learner, stable activity/capability ID, level, source, evidence,
   and return destination.
3. **Verify near-complete vertical slices.** Finish the browser and isolation
   checks for Practice and Study, then Play and Mastery.
4. **Complete deliberate rebuild pilots.** Install Hearth's approved first
   click and prove the Brain chamber before multiplying chambers.
5. **Stabilize persistence and shared infrastructure.** Settle Practice storage,
   saved Create seeds, and the shared audio manager without a broad backend
   rewrite.
6. **Run the protected Level 1 content gap pass.** Connect song, listening,
   TAB/diagram, right hand, practice history, creation, and Mastery through one
   real Ayla/Jen path.
7. **Run the whole-simulator integration audit.** Judge completeness only when
   each node is stable enough to inspect fairly.
8. **Run the app-readiness audit.** Convert the unified learning prototype into
   a production plan after the product experience and ownership contracts are
   dependable.

## Rules For The Final Audit

1. Verify every "already completed" claim in the current branch.
2. Label listed remaining work as an intentional gap unless the live code has
   regressed from a previously verified state.
3. Do not let a node handover override later product decisions or verified live
   code.
4. Do not redesign one node in isolation when the real problem is a missing
   handoff or evidence contract.
5. Do not expand content before the route, state, ownership, and success
   evidence are stable enough to carry it.
6. Do not let future PWA/app-store work consume the current learning-product
   completion pass.
7. Preserve the protected Level 1 content gap workstream throughout audit and
   implementation planning.

## Immediate Next Checkpoint

The documentation is ready when:

- every supplied handover is stored in the repository;
- Foundation, Do, Know, and Journey have current handovers linked;
- the master audit prompt requires this index;
- the preparation pack distinguishes node completion from future app
  readiness;
- no live node code or unrelated concurrent work was changed by this banking
  pass;
- the final audit is instructed to issue fresh post-audit continuation briefs.
