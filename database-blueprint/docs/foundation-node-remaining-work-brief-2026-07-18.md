# Foundation Node Audit And Completion Brief

Date: 2026-07-18

Inspected branch: `cleanup/handoff-architecture`

Inspected commit: `2b9f9bb`

## Purpose Of Foundation

Foundation is the threshold before Journey Level 1.

It should answer:

> How do I enter this guitar-learning world and use it safely?

Foundation is not a beginner level hidden inside Journey. It is orientation,
first contact, and enough shared language to begin Level 1 without confusion.

## Verified Current Experience

The live route was browser-checked on 2026-07-18.

The learner can currently:

1. open Foundation from the main map;
2. see the approved guitar-neck threshold scene;
3. see ten frets, numbered 0 through 9;
4. start Fret 0;
5. enter a guided visual lesson that explains the map, guide, neck, and Journey
   boundary.

The first lesson is no longer only a small text card. It has a clear visual
sequence and a Next action. No console warnings appeared during this sampled
route.

## Active Ownership

Primary route ownership:

- `adapters/foundation-panel-controller.js`
- `adapters/foundation-map-viewer.js`
- `adapters/foundation-topic-controller.js`
- `adapters/foundation-lesson-launcher.js`
- `adapters/foundation-progress-bridge.js`

Important data and routing:

- `assets/js/foundation.js`
- `core/foundation-route-manifest.json`
- `core/content/foundation/`
- `adapters/foundation-topic-viewer.js`

The legacy global entry name is retained through the node compatibility layer.
Do not add another Foundation renderer.

## Current Content Shape

The active Foundation path contains ten topics:

1. The Threshold
2. How To Learn
3. Music As Language
4. The Musical Alphabet
5. Rhythm And Pulse
6. The Guitar Map
7. The Instrument Body
8. Hands And Sound
9. First Shapes
10. First Conversation

Each route has a seed lesson. The older fallback viewer still presents the
four-part Understand, Experience, Apply, Own structure if a seed cannot load.

## Important Findings

### 1. Visible Progress Is Not Reliably Learner-Specific

Foundation still reads and writes the old `hearth-foundation-progress` key.
That key is shared across profiles.

Some completion is also copied into the cleaner progress store, but the active
learner ID is not consistently supplied and no shared progress event is
emitted. This means the screen can say "Jen" while part of Foundation memory
still belongs to everybody.

### 2. The Foundation Gate Is Mostly Visual

The product decision is clear: Foundation comes before Journey Level 1. The
current interface explains this, but the completion rule is not yet one
authoritative contract used by Journey.

### 3. Content Needs A Factual And Source Pass

Some historical Foundation text contains broad learning-science claims,
outdated simulator descriptions, and source ideas inherited from early
prototypes. Examples include claims about myelin, the old node count, and the
"three barriers" teaching language.

Do not remove useful teaching ideas automatically. Check each claim, state it
plainly, identify its source, and separate metaphor from established fact.

### 4. Fallback Endpoints Are Still Text-Heavy

The approved Fret 0 route is visually stronger. Later topics can still fall
back to compact text-card lessons. Their final actions need to become useful
guitar contact, not merely reading and clicking complete.

## Highest-Priority Remaining Work

### 1. Make Foundation Progress Learner-Specific

Create one canonical Foundation progress contract containing:

- learner ID
- topic ID
- step or activity ID
- evidence stage
- completion time
- reflection or difficulty where relevant
- source route

Keep a compatibility read for existing progress, but stop new profile mixing.
Emit a shared event that Journey can consume.

### 2. Make The Foundation-To-Journey Boundary Real

Define exactly what opens Journey Level 1. The rule should be based on required
threshold evidence, not merely visiting ten screens.

The interface should explain what remains without punishing or trapping the
learner.

### 3. Review All Ten Lessons For Accuracy And Usefulness

For every topic, verify:

- the learning purpose;
- plain-language explanation;
- factual accuracy;
- source and rights status;
- one visual or interactive contact;
- one small guitar action;
- one honest completion signal.

The saved musical-alphabet video can be mapped here only after its exact useful
claims are checked and paraphrased.

### 4. Strengthen The Remaining Lesson Endpoints

Use the Fret 0 scene as the quality reference. Later lessons should end in an
appropriate action such as hearing, locating, touching, tuning, naming, or
playing. Avoid turning every topic into a dashboard.

### 5. Reconcile Old Routes Only After Proof

The route manifest currently includes active routes plus loaded but unmapped
historical material. Confirm usage before deleting or moving anything. Keep the
compatibility layer until all ten active routes pass.

### 6. Finish Browser And Accessibility Checks

Test all ten routes for My Journey and Jen on desktop and mobile. Check:

- refresh and resume;
- lock and unlock rules;
- keyboard movement;
- readable focus states;
- reduced motion;
- clipping and image loading;
- learner isolation;
- return to Foundation and Journey.

## Protected Decisions

- Foundation is the threshold before Level 1.
- Keep the ten-fret guitar-neck metaphor.
- Keep the scene-first visual identity.
- Fret 0 is orientation, not a difficult guitar lesson.
- Do not redesign the approved first click without a specific verified defect.
- Do not claim completion from reading alone.

## Cross-Node Contracts

- Journey must read Foundation readiness from learner-specific evidence.
- Know may supply a definition, but Foundation owns first contact.
- Study may deepen a confusing concept, but must return to the current
  Foundation step.
- Do and Practice should receive stable activity IDs when Foundation asks for
  physical repetition.
- Hearth can support body and attention check-ins without replacing the
  musical purpose of the lesson.

## Acceptance Checkpoint

Foundation reaches a stable checkpoint when:

- all ten active routes open and return correctly;
- progress does not mix between My Journey and Jen;
- Journey uses the same readiness rule as Foundation;
- every topic has a source-reviewed explanation and a useful action;
- old fallback routes cannot silently replace the approved experience;
- focused automated and browser checks pass.

## Verification Already Run

- `tools/prototype_smoke_check.py`: passed
- `tools/core_smoke_check.py`: passed
- `tools/core_js_smoke_check.py`: passed
- live Foundation first click, map, and Fret 0: passed

The shared renderer-ownership check currently fails elsewhere in the app and
does not yet cover Foundation ownership. Extend it rather than assuming
Foundation is protected.

## Suggested Work Size

- Progress and gate contract: 2 to 4 hours, medium credit
- Ten-topic content and source review: 4 to 8 hours, medium credit
- Endpoint assets and interactions: separate small batches; image generation
  only after each lesson brief is approved
- Browser and profile checks: 1 to 2 hours, low-to-medium credit

