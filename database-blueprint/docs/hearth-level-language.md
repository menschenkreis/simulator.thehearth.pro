# Hearth Level Language

## Decision

Use simple numeric levels:

- Level 1
- Level 2
- Level 3
- Level 4
- Level 5
- Level 6
- Level 7
- Level 8

The poetic identity should live in:

- app nodes
- lesson titles
- guide dialogue
- source cards
- creative prompts
- visual design

The level names themselves should stay clear and unpretentious.

## Why

The QJamTracks roadmap already uses 8 levels. That structure is useful and immediately understandable.

Trying to rename every level into metaphor can make the system feel random.

For a learner, especially a beginner, `Level 1` is clear.

## Important Separation

Do not confuse these three things:

1. **App Node** - where the learner is in the simulator.
2. **Discipline** - what kind of guitar skill is being trained.
3. **Level** - how advanced that skill is.

Example:

- App node: Doing
- Discipline: Rhythm
- Level: 1
- Topic: quarter and eighth note strum / single-note pulse

## App Nodes Remain Poetic

The 8 app nodes remain:

- Foundation
- Doing
- Knowing
- Practice
- Study
- Create
- Hearth
- Mastery

These can carry the world-building.

## Database Principle

The database should store:

- stable key: `level_1`
- numeric order: `1`
- display name: `Level 1`
- short description
- optional metaphor text

Do not use poetic display names as stable identifiers.
