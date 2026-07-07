# Journey Strategy V1

## Plain Purpose

Journey answers:

`What should I do next?`

The Map lets the learner explore freely.

Journey gives the learner a guided path through the Map.

The Journey should not become a second copy of Foundation, Doing, Knowing, Practice, Study, Create, Hearth, and Mastery. It should send the learner into those places in a useful order.

## Do We Have Enough Resources?

Yes, we have enough resources to build the Journey spine properly.

We have:

- the current working Journey prototype
- multi-student progress tracking
- the 8-level structure
- QJam and JustinGuitar roadmap references
- Foundation lesson material
- beginner lesson seeds
- student notes and current teaching needs
- Hearth learning-system ideas for hands, ears, eyes, brain, attention, and reflection
- smoke checks to protect the prototype from silent breakage

We do not yet have:

- finished lesson-by-lesson content for every level
- final unlock rules based on skill accomplishments
- tested backend sync rules for Martin
- complete daily-card and recovery-quest flows
- polished UI for every Journey state

That means the correct move is not to write all 8 levels at once.

The correct move is to make Level 1 real, useful, and clean first.

## Product Role

Journey is the guided teacher path.

It should help a learner:

1. know what to do next
2. understand why that step matters
3. practise one thing at the right size
4. apply it to music
5. reflect honestly
6. return later with useful memory

## Level Strategy

Use stable plain names in code and UI:

- Level 1
- Level 2
- Level 3
- Level 4
- Level 5
- Level 6
- Level 7
- Level 8

Poetic or symbolic meanings can still inform the feeling, but the working learning structure should stay clear.

## Foundation And Level 1

Foundation is the threshold.

Foundation teaches:

- how to enter the simulator
- how the nodes relate
- how to notice confusion
- how to use the guide
- how to make first contact with the guitar

Level 1 begins after that threshold.

Level 1 teaches:

- clean sound
- picking pulse
- fretting one clear note
- basic finger independence
- first chord changes
- naming gaps honestly
- first pentatonic map
- first song seed

## Level 1 Pilot

Level 1 should be polished before we try to polish all 8 levels.

The current Level 1 plan has 8 authored lessons:

1. First Clean Sound
2. Pick The Pulse
3. Fret One Clear Note
4. The 1-2-3-4 Walk
5. First Chord Pair
6. Add D And Name The Gap
7. First Pentatonic Map
8. First Song Seed

Each lesson uses the same learning rhythm:

1. Review
2. Warm-Up
3. Concept
4. Drill
5. Music Application
6. Reflect

This rhythm matters because it teaches the whole learner, not just the fingers.

## Current Student Use

Journey must be useful for real teaching now, not only for a future backend.

For the current student use case, Journey should capture:

- what was practised
- which gap appeared
- what the student wants to make
- which concept needs clearer words
- which hand or body issue showed up
- what should happen in the next lesson

Example:

If a student wants to write a song but does not know a chord, Journey should not treat that as failure. It should turn the chord into the next smaller useful step.

## Backend Handoff Shape

Martin will eventually need Journey as clean data, not just screen behavior.

Journey data should separate:

- levels
- lessons
- blocks
- student profiles
- progress records
- ratings
- notes
- unlock/accomplishment rules

The frontend can keep working locally while the backend is being designed, but API sync should remain treated as prototype behavior until verified.

## Next Build Steps

1. Finish Level 1 as authored lesson content.
2. Improve the Level 1 screen so the learner can understand each lesson at a glance.
3. Add simple accomplishment language before making unlocks more complex.
4. Keep Journey data separate from Journey screen behavior.
5. Later, create the backend handoff contract for student progress and lesson records.
