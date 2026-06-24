# Durable Design Realizations

These are product truths discovered while building the prototype. They should survive the backend rebuild.

## 1. Learning Science: The Three Anchors

The simulator must actively address three barriers to learning.

### Absence Of Mass

Every theory concept needs a physical or visible counterpart.

Implication:

- abstract theory should have draw/do/listen/play steps
- diagrams, fretboard views, cards, audio, and physical actions matter
- "Understand" alone is not enough

### Too Steep A Gradient

Learning must happen in bite-sized steps.

Implication:

- do not flood beginners with five pentatonic shapes at once
- if the learner struggles, offer a smaller step
- daily portions should feel achievable
- the app should support auto-step-back or "simpler version" behavior

### Misunderstood Word

One unclear term can break everything after it.

Implication:

- dictionary/term support is not optional
- "Need More Work" should trigger: "Was there a word you did not get?"
- lessons should identify key terms before using them heavily
- noncomprehension can lead to withdrawal, loss of caring, and quitting

## 2. Music As Language

The simulator should teach guitar like a language.

Progression:

- vocabulary = notes, chords, physical gestures, sounds
- grammar = intervals, scales, rhythm, harmony, theory
- conversation = playing songs, improvising, call and response
- poetry = personal expression, composition, mastery

Design implication:

Do not ask the learner to write sonnets before they can say hello.

## 3. Time Intervals To Mastery

The learner should see the path.

Not:

- abstract "10,000 hours"
- endless checklist
- vague mastery wall

Instead:

- visible intervals
- clear levels
- daily/weekly practice cycles
- reachable milestones
- a roadmap that feels hopeful

Design phrase:

"A roadmap to somewhere where we end up at something great and hopeful."

## 4. Step Flow: Understand -> Experience -> Apply -> Own

Foundation moved from:

`Read -> Feel -> Do -> Check`

to:

`Understand -> Experience -> Apply -> Own`

This should become the general block interior pattern.

### Understand

Name the idea clearly.

### Experience

Let the learner feel, hear, see, or notice it.

### Apply

Do something with it.

### Own

Reflect, summarize, and lock the block into the learner's map.

The Own step can end with:

`This block is set. You're ready for [next block].`

## 5. Create Node: The Five Obstructions

The Create node should use creative constraints that provoke real work.

The prompt energy should be:

- emotionally exposing
- concrete
- actionable
- musically usable
- not vague or nonsensical

The multi-ingredient system is important:

- select 2-5 ingredients
- more ingredients = more collision
- prompts should force elements to collide, not merely stack

Ingredients:

- lyrics
- melody
- riff
- rhythm
- story

## 6. Scene-First Principle

Every node should open with the place, not the dashboard.

The learner should first encounter:

- the forge
- the library
- the temple
- the cauldron
- the map

Not:

- a menu
- a grid
- a management screen

Important architecture warning:

The prototype `scene-first.js` tried to enforce this, but became dangerous because it overwrote node functions. The principle is good. The implementation was not.

## 7. Ayla's Learning Profile As Design Spec

Ayla's learning profile should shape the first version because the project is personal tool first, scalable second.

This should become a general learner-profile system, not an Ayla-only hardcode.

The important design rule:

The profile should not diagnose the learner. It should tell the simulator how to help.

Input traits:

- hands-first
- spatial thinker
- analytical
- structure-dependent
- context-driven

Processing traits:

- needs multiple explanations
- top-down and bottom-up
- self-researcher
- experimental
- incubator
- intuitive knower
- pattern-noticer
- network thinker
- taxonomic mind
- relational thinker
- layered learner
- wants structured freedom

Output traits:

- exercise-runner
- perfectionist
- automaticity is the benchmark
- transfer is the metric

Motivation traits:

- progress-visible
- recording as fuel
- purpose-activated
- connection-finder
- growth-noticer
- joy-dependent
- mentor-responsive
- necessity-learner
- teacher-learner
- play-state learner

Design warnings:

- gradient need: offer simpler version on struggle
- purpose gap: every exercise needs context
- boredom trigger: too slow = disengagement
- ambiguity trigger: no clear next step = paralysis
- misunderstood-word sensitivity: ask whether a word went foggy before assuming concept failure
- passive processing: the app should organize the next action clearly
- under-recording: prompt short recordings at natural moments

Benchmark:

Automaticity is the sign that something is becoming learned.

Integration recommendation:

Make this an optional Foundation/Hearth onboarding called something like `Find Your Learning Shape`.

Store the result as editable student-profile preferences.

Use it to adapt:

- guide character language
- stuck-state recovery
- reflection prompts
- next-step clarity
- recording prompts
- diagram/source/body-first presentation
- teaching mode for Ayla and Jen

Do not migrate the exact old questionnaire blindly. Preserve the insight and redesign it as a short, editable preference system.

See:

- `database-blueprint/docs/learning-profile-onboarding-v1.md`
- `database-blueprint/source/learning_profile_traits_v1.csv`
- `database-blueprint/source/learning_profile_adaptations_v1.csv`

## 8. Architecture Realizations

Prototype issues:

- `scene-first.js` is the number one frontend conflict
- `simulator.html` monolith makes edits risky
- service worker cache causes stale-file debugging traps
- personal tool first, scalable second

Recommendation for rebuild:

Preserve the design principles, but rebuild the implementation with modular routing, explicit state, and no silent global overrides.

## 9. Future Asset Pipelines

The knowledge base should eventually include:

- books
- videos
- images
- diagrams
- audio examples
- exercises
- source notes

Each asset should be catalogued with:

- source
- rights/status
- node
- level
- discipline
- concept
- usage purpose
- citation/reference
