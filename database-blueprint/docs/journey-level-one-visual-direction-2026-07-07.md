# Journey Level One Visual Direction - 2026-07-07

Plain English: the first Level 1 click needs a clear visual metaphor before we rebuild it. The rough path prototype was useful structurally, but visually too busy and tangled.

## Decision

Do not use the current winding path/card prototype as the final direction.

Use it only as a hidden structural test.

The better direction is:

`a clean curriculum road drawn as one calm object`

Not:

`a dashboard`

Not:

`floating cards scattered over a squiggly route`

## What The Screen Should Feel Like

Level 1 should feel like opening a learning map in a quiet adventure game.

It should be:

- clear at first glance
- calm
- musical
- not childish
- not corporate
- not cluttered
- connected to the guitar world
- easy for Ayla to explain to Jen

## Best Visual Metaphor

Use a single hand-drawn style map object.

Possible form:

- a parchment-like music path
- a simple road across a guitar-shaped landscape
- a vertical curriculum trail with eight waypoints
- a fretboard-road hybrid, but less literal than the main Journey guitar

The point is not realism.

The point is:

`Here is the whole level. Start here. Follow the path. Do not rush.`

## Proposed Composition

Desktop:

```text
          Whose Journey?

  Guide character       Level 1 Map Object
  + speech bubble       --------------------------------
                        First Guided Steps
                        [Rhythm] ---- [Chords] ---- [Scales]
                            \              \             \
                           L1             L2-L3          L4-L5
                              \              \             \
                               [Play] ---- [Integration]
                                  L6           L7-L8

                        Let's begin
```

Mobile:

```text
Whose Journey?

Guide + short bubble

Level 1: First Guided Steps

1. Time Feel
2. The 8 Open Chords
3. Common-Finger Changes
4. Pentatonic Shape 1
5. Pentatonic Phrasing
6. First Blues Solo Entry
7. Chords Meet Pentatonics
8. Integration

Let's begin
```

## Visual Rules

- The eight lessons should be on one coherent object.
- The line should be simple and intentional, not a random snake.
- Lesson labels should not fight the art.
- The guide should sit beside the map, not on top of it.
- The student selector should stay above the map.
- "Let's begin" should be visually obvious but not huge.
- Avoid many floating cards.
- Avoid nested panels.
- Avoid heavy animation.

## Skill Grouping

The map should group Level 1 into five simple territories:

1. Rhythm
2. Chords
3. Scales
4. Play
5. Integration

Lesson mapping:

- L1 Time Feel = Rhythm
- L2 The 8 Open Chords = Chords
- L3 Common-Finger Chord Changes = Chords
- L4 Pentatonic Shape 1 = Scales
- L5 Pentatonic Phrasing = Play
- L6 First Blues Solo Entry = Play
- L7 Chords Meet Pentatonics = Integration
- L8 QJam Level 1 Integration = Integration

## Guide Copy

Use one short line.

Preferred:

`Stay with the first path. Small steps, clean sound, steady rhythm, and a little fun each time.`

Possible alternate:

`Level 1 is not a race. Keep the pulse steady and let the map become familiar.`

## Build Recommendation

Next iteration should be one of these:

### Option A: Code-Native Clean Map

Build a simple SVG map in code.

Pros:

- cheap
- editable
- fast to adjust
- easy to make responsive

Cons:

- may still feel too digital unless styled carefully

### Option B: Draw/Generate A Background Map, Then Overlay Buttons

Create one clean map image and place invisible or subtle lesson buttons over it.

Pros:

- more unified visual experience
- closer to the node interiors
- easier to make beautiful

Cons:

- more expensive to iterate
- labels must still be handled carefully

### Option C: Hybrid

Use a lightly illustrated background object, but keep lesson buttons as HTML.

Recommended next choice:

`Option C`

This gives the visual unity Ayla wants while keeping the lesson labels and buttons editable.

## Current Technical Note

The rough Level 1 entry prototype exists in `assets/js/journey.js` as `renderLevelEntry(1)`.

It is hidden by default.

To view it locally:

```js
localStorage.setItem('hearthJourneyL1EntryPreview', 'on')
```

To hide it again:

```js
localStorage.removeItem('hearthJourneyL1EntryPreview')
```

Normal Level 1 clicks should use the cleaner existing screen until the redesigned map is ready.
