# Progress Screen System Vision - 2026-07-08

Plain English: the Journey roadmap is becoming the first real progress screen. The same logic should later expand into a whole-simulator progress screen.

## Core Idea

The simulator needs two connected progress views:

1. Journey progress
2. Whole simulator progress

Journey progress answers:

`Where am I in the level path?`

Whole simulator progress answers:

`What kind of learner am I becoming across the whole world?`

## Journey Progress Screen

The current Journey map should become the progress screen for Journey.

It should show:

- current Journey level
- current category inside that level
- progress through lessons
- category progress rings
- locked, current, and complete level dots
- what each level asks from each category
- what should be done next

Colour rule:

- level colour = level identity
- L1 red, L2 orange, L3 yellow, L4 green, L5 cyan, L6 blue, L7 violet, L8 magenta
- category rows should not each become a competing rainbow

## Whole Simulator Progress Screen

The whole simulator should eventually have a larger progress screen using the same visual language, but with broader metrics.

It should show:

- Journey lessons completed
- drills completed
- practice minutes
- practice sessions
- books opened
- books completed or meaningfully studied
- topics studied
- videos watched
- reflections written
- recordings made
- creations/songs/riffs saved
- mastery examples watched
- current student path
- current teacher-prep path
- weak areas that need repetition
- strongest areas
- current streaks or recent consistency

This should not feel like a corporate analytics dashboard.

It should feel like:

`a living learning map`

## Progress Types

Use different kinds of progress, not only lesson completion.

Recommended progress types:

- completion: finished lesson, finished block, finished practice session
- repetition: drill reps, minutes, repeated review
- evidence: recording, reflection, teacher note, saved riff
- understanding: concept rating, quiz, explanation in plain words
- musical use: played in a groove, used in a song, improvised with it
- consolidation: repeated safely over time

## Why This Matters

The simulator should not reward only "clicking through."

It should reward actual learning behaviours:

- showing up
- practising
- reviewing
- noticing gaps
- making music
- reflecting
- returning to hard things gently

## Backend Implication

Martin will eventually need progress as structured data, not random text.

The backend should be able to store:

- learner/student id
- node id
- journey level id
- category id
- lesson id
- drill id
- book/source id
- event type
- date/time
- duration
- rating/confidence
- note/reflection
- evidence link, such as recording or saved creation

## UI Direction

The Journey progress map is the prototype pattern.

Later whole-simulator progress can use:

- the main map nodes as large progress regions
- Journey as the central spine
- rings or halos around nodes for activity/progress
- category rows or radial charts for skill balance
- plain counts for concrete evidence

Do not overbuild this yet.

Next best move:

1. Make the Journey progress screen feel excellent.
2. Decide which progress events the prototype can already track locally.
3. Design the whole-simulator progress screen from those real events.
4. Hand Martin a clean progress-event schema.
