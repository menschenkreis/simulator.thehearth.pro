# Journey Structured Path Model V1

## Purpose

The Map and the Journey should not do the same job.

The Map gives free exploration across the world.

The Journey gives a guided path through that world.

This document extracts what was useful from the prototype Journey system and improves the design for the rebuild.

## Core Distinction

### Foundation

Foundation answers:

`How do I enter this world and learn here?`

It is the threshold before the Journey spine.

It should teach the learner:

- how the simulator works
- how the guide helps
- how the 8 nodes relate
- how music works as language
- how to notice confusion
- how to make first physical contact with the guitar

Foundation can contain guitar contact, first sounds, and first chord moments, but its deeper job is orientation.

The learner should complete enough Foundation to understand the world before Level 1 begins.

### Map

The Map answers:

`Where can I go?`

It is spatial, exploratory, scene-first, and symbolic.

### Journey

The Journey answers:

`What should I do next?`

It is structured, level-based, student-aware, and progress-driven.

The learner should be able to ignore the Journey and explore, but the Journey should always be available as the clear path when they want guidance.

## Foundation Is Not Level 1

Foundation is the threshold.

Level 1 is the first real Journey level after the threshold.

This matters because QJam Level 1 already assumes the learner is ready to begin a structured guitar programme. It is not the same as "what is this simulator and how do I learn here?"

Recommended relationship:

1. Foundation: enter the world, learn the method, make first contact.
2. Journey Level 1: begin the guided training path.

In plain language:

`Foundation teaches you how to enter. Level 1 teaches you how to begin walking.`


## What To Keep From The Prototype

Keep:

- multi-student tracking
- 8-level programme
- central level spine on the map
- guide character speaking contextually
- lesson blocks such as Review, Warm-Up, Concept, Drill, Music Application, Reflect
- notes and ratings after each lesson
- per-student progress
- level unlocks
- map changes as the learner progresses

These are strong product ideas.

## What To Improve

### 1. Do Not Make Journey A Separate Silo

The Journey should not duplicate Foundation, Doing, Knowing, Practice, Study, Create, Hearth, and Mastery.

Instead, a Journey lesson should send the learner into those nodes in a planned order.

Example:

- Review may use Hearth or Study.
- Warm-Up may use Practice.
- Concept may use Foundation, Knowing, or Study.
- Drill may use Doing.
- Music Application may use Practice, Create, or Mastery.
- Reflect may use Hearth.

The Journey is the itinerary. The nodes are the places.

### 2. Do Not Rely On Random Lesson Generation

The prototype used `buildLesson()` style dynamic assembly from banks.

That can be useful later, but the rebuild should start with authored lesson templates.

Reason:

Beginner progression is delicate. If the lesson generator chooses the wrong concept/drill/song combination, the gradient breaks.

Recommended model:

- authored level plans
- authored lesson shells
- reusable task banks
- optional adaptive substitutions later

### 3. One-Hour Lessons Should Not Be The Only Shape

The 6-block one-hour structure is good for a full lesson.

But the app should also support:

- 5-minute daily card
- 10-minute recovery quest
- 20-minute practice session
- 45-60 minute full journey lesson

Recommended:

Keep the 6-block rhythm, but allow blocks to be skipped or compressed depending on session type.

### 4. Unlocks Should Use Accomplishments, Not Only Lesson Count

Prototype rule:

`Complete all lessons in level -> unlock next level`

Improved rule:

Unlocks should consider:

- lesson completion
- pass conditions
- practice repetition
- reflection
- key skill accomplishments
- recovery quests if the learner struggled

This makes progress feel earned through ability, not just attendance.

### 5. API Sync Needs Verification

The prototype handoff mentions API endpoints such as `journey-students`, `journey-progress`, and `journey-records`.

Treat this as a prototype claim until Martin verifies the backend.

The blueprint should still model Journey data cleanly, but not assume those endpoints are real or complete.

## Recommended Journey Lesson Shape

Default full lesson shape:

1. Review
2. Warm-Up
3. Concept
4. Drill
5. Music Application
6. Reflect

This is useful because it respects the whole learning cycle:

- remember
- prepare the body
- understand
- repeat
- use musically
- integrate

## Relationship To TeachingEngine

Journey lessons can use TeachingEngine, but TeachingEngine should not own all Journey logic.

TeachingEngine owns:

- speak steps
- ask steps
- cards
- custom actions
- feedback
- re-explanation
- guided lesson flow

Journey owns:

- which student is active
- which level is active
- which lesson is next
- which node each block points to
- progress across time
- lesson notes and ratings
- unlock rules
- map-spine state

## Multi-Student Model

Keep the multi-student idea.

Recommended language:

Use `student profiles`.

One account may have many student profiles.

Examples:

- Ayla
- Jen
- future student
- child learner
- medicine exam learner in a different simulator

This matters because the long-term engine may support different subjects, not only guitar.

## Guide Character Memory

The guide character should be able to reference student memory.

Examples:

- "Last time C major felt foggy, so today we will make it physical."
- "You marked rhythm as a 2/5, so we will start with pulse before chords."
- "You completed three clean open-string sessions. That sound is becoming yours."

Recommendation:

Store guide memory as structured student notes and progress signals.

Do not let it become arbitrary chatbot memory.

## Numerology And Level Feeling

Ayla likes the idea of numerology shaping the feel of each level.

Recommendation:

Use numerology as atmosphere and level identity, not as hidden mechanics.

Good use:

- level theme
- guide language
- colour
- quest mood
- reflection prompt

Avoid:

- confusing unlock logic
- obscure labels
- making the database depend on mystical naming

Stable database language should remain:

- Level 1
- Level 2
- Level 3
- Level 4
- Level 5
- Level 6
- Level 7
- Level 8

The soul layer can still describe what each number feels like.

## Recommended 8-Level Journey Spine

| Level | Lesson Count | Level Feeling | Core Movement |
| --- | ---: | --- | --- |
| Level 1 | 8 | first guided steps / first voice | begin the training path after Foundation |
| Level 2 | 10 | duality / two hands | coordination, chord gaps, first pentatonic |
| Level 3 | 12 | first expression | songs, riffs, phrasing |
| Level 4 | 14 | structure | keys, chord families, fretboard maps |
| Level 5 | 16 | transformation | positions, bends, slides, legato |
| Level 6 | 18 | integration | triads, arpeggios, voice leading |
| Level 7 | 20 | intuition | theory becomes instinct |
| Level 8 | 24 | personal sound | collaboration, performance, voice |

## Recommended Database Shape

Journey content:

- journey levels
- journey lessons
- journey lesson blocks
- required accomplishments
- suggested resources
- suggested nodes

Student memory:

- active student profile
- current level
- current lesson
- block attempts
- concept ratings
- task ratings
- reflections
- teacher notes
- guide memory signals
- unlock state

## Product Recommendation

The Journey should become the main guided path.

The Map should remain the free world.

The Hearth should summarize what the Journey is revealing about the learner.

In plain language:

`Map is where you can go. Journey is the path you are walking. Hearth is what the path is doing to you.`
