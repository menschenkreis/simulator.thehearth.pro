# Study Node Alignment Audit - 2026-07-18

## Plain-English Outcome

The Key Chamber is a strong direction. The physical room, six doors, quiet
guide, and small floor marker fit the simulator's node logic better than a
dashboard would.

The main problem is architectural rather than visual: the live Study entrance
was making up its own door states, subject, and activity text. Useful Study
content already exists elsewhere, but the chamber was not reading it. That
made the screen feel disconnected from Journey, learner profiles, and real
progress.

## Alignment Scorecard

| Area | Status | Finding |
| --- | --- | --- |
| Node purpose | Strong | Study is framed as making one idea clear, not as another lesson list. |
| Visual language | Strong | The chamber keeps the image-led, place-based logic of Foundation, Journey, and Do. |
| Six-door metaphor | Strong | Word, Sound, Shape, Pattern, Test, and Review cover distinct ways of understanding. |
| Journey connection | Partial | Journey contains the right subject and next-step data, but the old chamber did not consume it. |
| Learner profiles | At risk | Journey is multi-learner, while older Study storage is global. |
| Progress | At risk | The old chamber used static states and did not create a reliable door-level record. |
| Study activities | Partial | Topic, question, quiz, and assessment modules exist, but the chamber still showed a placeholder activity. |
| Backend handoff | Partial | The content objects are reusable, but overlapping `showStudy` owners make the contract unclear. |

## What Should Remain

- The Key Chamber name and physical-room metaphor.
- Six doors with different kinds of understanding.
- A current subject selected from Journey, learner notes, or Study history.
- A brief guide message tied to the current subject and selected door.
- Existing Knowing topic content, questions, quizzes, and assessment outcomes.
- Warm wood, shadow, and gold light rather than Journey's level rainbow.

## What Was Drifting

- The active chamber had a second, static copy of Study's door data.
- It described generic actions instead of showing which idea the learner was
  studying.
- Test and Review states were not derived from evidence.
- Study progress used several unscoped legacy keys:
  `hearth-knowing-progress`, `hearth-knowing-state`, `hearth-knowing-quiz`,
  `hearth-study-locks`, and `hearth-study-notes`.
- Three different implementations could own `showStudy` or
  `showStudySession`.

## First Improvement Implemented

Added `adapters/study-key-chamber-model.js` as the first canonical model for
the chamber. It now provides:

- active learner identity from the shared Journey state;
- a current subject from the learner's Journey companion or existing Study
  position;
- six door definitions and learner-aware states;
- a gentle progress value for each door;
- compatibility reads from the old Study keys;
- a versioned learner-scoped record at `hearth-study-chamber-v1`;
- a `study_door_visited` progress event when a usable door is entered.

The live chamber viewer now renders a snapshot from this model and shows the
current learner and current subject. Jen's data supplies the first real Study
subject: `A as home inside A minor pentatonic`, with Shape as the recommended
door. No Jen-specific text was added to the renderer.

## Second Step Implemented

The selected Shape door now opens the existing Knowing Study Session when the
current subject has a category and topic. The chamber provides the subject
context, then hands the content, terms, questions, and assessment UI to the
existing Study Session modules. The return action comes back to the Key Chamber.

This is intentionally one vertical slice rather than six new door screens.
The remaining gap is the final proof controller: the Shape activity still uses
the older Study Session assessment storage until we add a shared evidence
record that can also feed Practice and Journey.

## Recommended Next Step

Build one complete path for Jen only as data, not as a special screen:

`Journey recommendation -> Study Shape door -> A minor pentatonic topic/activity -> gentle proof -> saved evidence -> chamber progress -> Practice recommendation`

The first three links now work. The next small implementation should complete
the evidence handoff, then reuse the same controller for Word, Sound, Pattern,
Test, and Review. This keeps the visual metaphor stable while the learning
content becomes real.
