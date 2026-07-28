# Study Key Chamber Redesign v1

## Purpose

Study helps a learner make one musical idea clear. It is not a second Journey,
a book shelf, or a lesson dashboard.

Journey can recommend the subject. Study lets the learner approach that same
subject through six different forms of understanding.

## Decision

Keep the Key Chamber and its six doors. The door metaphor is strong because it
makes studying feel like opening different routes into one idea.

Replace the current generic carousel with an image-led physical chamber. One
door is central and usable; its neighbouring doors remain visibly part of the
same room. The active learner, current subject, recommendation, door states,
and progress must all come from data.

## What Exists Now

There are three overlapping Study implementations:

1. The legacy inline Study dashboard and session in `simulator.html`.
2. The older lock dashboard in `assets/js/study-key.js`.
3. The active six-door carousel in
   `adapters/study-key-chamber-viewer.js`.

The active carousel has the right metaphor, but its door states are static and
its activity panel is a placeholder. It currently bypasses the useful topic,
question, quiz, and session modules.

## Preserve

- The name Key Chamber.
- The six doors: Word, Sound, Shape, Pattern, Test, and Review.
- Existing Knowing topic content, including CAGED and pentatonic material.
- Existing topic, session, question, quiz, and progress-event modules.
- The guide character as brief, contextual support.
- A clear current subject and a recommended next action.
- Learner notes, confidence, misconceptions, and review history.

## Change

- Replace generic SVG doors with one approved chamber scene and restrained
  interactive overlays.
- Replace static lock states with learner- and subject-specific states.
- Replace the placeholder "Try This" panel with real Study activities.
- Scope all Study progress to the active learner.
- Give one module ownership of `showStudy`; stop the three implementations from
  overriding one another.
- Move the old topic dashboard behind a quiet `Change subject` action.
- Change wrong-answer behaviour from a dead end to gentle re-explanation and
  another attempt.

## Six Door Meanings

### Word

Names, definitions, short explanations, and misunderstood terms. The learner
should be able to say the idea plainly.

### Sound

Listening examples, ear recognition, spoken rhythm, and musical comparison.
The learner should be able to hear the idea before relying on a diagram.

### Shape

Fretboard positions, chord shapes, note maps, hand relationships, and visual
landmarks. The learner should be able to see where the idea lives.

### Pattern

Relationships, recurring structures, transposition, sequences, and connections
between known ideas. The learner should understand what repeats and why.

### Test

Retrieval and proof: identify, explain, locate, hear, or play the idea without
being shown the answer first.

### Review

Return to previous trouble spots, compare confidence, and schedule the next
useful repetition. Review is evidence-led, not a generic recap.

## Door States

- `available`: relevant and ready to open.
- `recommended`: the safest or most useful next route.
- `visited`: attempted, with evidence saved.
- `understood`: passed its subject-specific proof.
- `locked`: not useful yet; the interface explains what makes it available.

Word, Sound, Shape, and Pattern are normally available. Test becomes available
after at least one learning door has been visited. Review becomes available
after saved evidence exists or a review is due. A door is never locked merely
to create artificial game friction.

## First-Click Layout

- A physical, warm, circular study chamber rather than a dashboard.
- One large central door; neighbouring doors recede along a curved wall.
- A subject plaque above the chamber: `Current study: ...`.
- A small six-position floor or threshold marker shows the whole structure.
- Door progress appears as light around its keyhole or threshold, not as a
  conventional progress bar.
- The guide stands to one side and gives one contextual sentence.
- `Change subject` is secondary and quiet.
- The door itself contains the primary action; no floating stack of cards.
- On mobile, show the central door and a visible sliver of each neighbour.

Journey owns the level rainbow. Study should use warm wood, stone, shadow, and
gold light, with only restrained door-specific accents. This keeps the two
systems visually related without confusing level colour with study method.

## Canonical Ownership

- `StudyKeyChamberModel`: active learner, current subject, door state,
  recommendation, and progress summary.
- `StudyKeyChamberViewer`: first-click image-led chamber only.
- Existing Knowing study models: topic content and question material.
- `StudySessionController`: opens a door activity, saves evidence, and returns
  the learner to the chamber.
- Existing progress-event store: cross-simulator activity events.

The legacy Study dashboard remains temporarily available as a compatibility
route while the new chamber is connected. It must not remain a second owner of
the first-click experience.

## Learner-Scoped State

Use one versioned Study record with a learner collection. Each learner stores:

- current subject
- subject source, such as Journey, teacher note, free study, or review
- per-door state and progress
- attempts and evidence
- confidence before and after
- misconceptions and notes
- recommended next door
- next review date

Old global storage keys should be read through a compatibility layer and
migrated once. New Study activity must not continue writing unscoped progress.

## First Vertical Slice: Jen

Subject:

`A as home inside the A minor pentatonic scale`

Recommended first door: Shape.

The activity shows A root notes as safety points, connects them gently to the A
minor pentatonic shape, and introduces one small CAGED landmark. It must not
teach the entire CAGED system. The proof is that Jen can locate a home note,
play away from it, and return to it musically.

This respects her current need for consolidation, her enjoyment of jamming,
and the teaching rule that a technical explanation must return to music.

## Build Order

1. Approve one chamber visual concept.
2. Build the first-click chamber with data-driven overlays.
3. Connect active learner and current subject.
4. Connect the Jen Shape activity using existing Study content modules.
5. Save evidence and return to the chamber.
6. Test learner switching, lock explanations, progress, and legacy migration.

