# Journey Level One Visual Direction - 2026-07-07

Plain English: the first Level 1 click should show a clear curriculum roadmap. It should use the Journey guitar image as the visual style anchor, but it should not become a messy fantasy map or dashboard.

## Decision

Do not use the old winding path/card prototype as the final direction.

It was useful as a structural test, but the screen now needs to be simpler and clearer.

The better direction is:

`a clear QJam Level 1 roadmap in the Journey guitar visual style`

Not:

`a dashboard`

Not:

`floating cards scattered over a squiggly route`

Not:

`Hearth magic language on the first curriculum screen`

Update after visual concept review:

Use the third concept direction: a calm, Apple-like dark/glass curriculum progress map with rows and dots. The screen should still be built with editable HTML/CSS, not as one flat image, so progress, labels, and student-specific states can change.

Level 1 should use one Level 1 color family. Do not rainbow-code the five rows. The categories can have tiny tonal variation if needed for readability, but the whole screen should feel like one coherent Level 1 chapter.

Future category icons should be generated in the same clean engraved/handmade spirit as the map nodes. Do not introduce a new icon style for Journey.

Best build method: hybrid UI. Use HTML/CSS for the real interactive layout, buttons, labels, progress, and responsive behavior. Use SVG only for decorative rails or precise linework if CSS becomes too clumsy. Do not make the whole roadmap a flat generated image, because it would be hard to update when lessons, students, or progress change.

Reusable map rule:

- The same category map opens for every Journey level.
- Categories run down the left.
- Levels run across each category row as L1-L8 dots.
- Colour belongs to the level, not the category.
- The selected level colour becomes the dominant page colour.
- Hovering/focusing a level dot explains what that category means inside that level.
- Category icons should stay stylistically related to the map nodes if they are later generated.

"You are here" rule:

- The map should be centered as the main object.
- The guide character can sit to the right as a companion, not block the map.
- The active level colour frames the whole map.
- The selected level dot in each row gets a progress ring.
- The current category row gets the strongest glow.
- The small progress card remains a simple numerical anchor.

## What The Screen Should Feel Like

Level 1 should feel like opening a beautiful but practical guitar curriculum overview.

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

Use the Journey guitar image as the shared visual style. The roadmap can sit over a dark/gold/wood-toned panel with the guitar as a subtle background image or watermark.

Possible form:

- a clean grouped curriculum board
- a subtle guitar/fretboard background
- lesson buttons grouped by learning category
- one clear begin/continue button

The point is not symbolism.

The point is:

`Here is what Level 1 teaches. Start here. Follow the lessons in order.`

## Proposed Composition

Desktop:

```text
          Whose Journey?

  Guide character       Level 1 Roadmap Object
  + speech bubble       --------------------------------
                        QJam Level 1 Roadmap
                        Rhythm                  L1
                        Chords & Harmony        L2-L3
                        Scales                  L4
                        Technique & Improv      L5-L6
                        Integration             L7-L8

                        Let's begin
```

Mobile:

```text
Whose Journey?

Guide + short bubble

Level 1 Roadmap

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

- The eight lessons should be grouped on one coherent object.
- The guitar visual style should unify this screen with the main Journey map.
- Level 1 uses the Level 1 warm red/orange chapter color.
- Row dots show what is done, what is current, and what is still ahead.
- Lesson labels should not fight the art.
- The guide should sit beside the map, not on top of it.
- The student selector should stay above the map.
- "Let's begin" should be visually obvious but not huge.
- Avoid many floating cards.
- Avoid nested panels.
- Avoid heavy animation.
- Avoid showing the full 10-strand long-term system on this first Level 1 screen.

## Skill Grouping

The map should group Level 1 into five simple QJam-style sections:

1. Rhythm
2. Chords & Harmony
3. Scales
4. Technique & Improvisation
5. Integration

Lesson mapping:

- L1 Time Feel = Rhythm
- L2 The 8 Open Chords = Chords & Harmony
- L3 Common-Finger Chord Changes = Chords & Harmony
- L4 Pentatonic Shape 1 = Scales
- L5 Pentatonic Phrasing = Technique & Improvisation
- L6 First Blues Solo Entry = Technique & Improvisation
- L7 Chords Meet Pentatonics = Integration
- L8 QJam Level 1 Integration = Integration

## Guide Copy

Use one short line.

Preferred:

`Follow the lessons in order. Do not rush ahead: steady rhythm, clean chords, clear scale map, then music.`

Possible alternate:

`Level 1 is not a race. Keep the pulse steady and let the map become familiar.`

## Build Recommendation

Use the current hybrid:

- existing Journey guitar image as visual style reference
- editable HTML lesson buttons
- QJam section labels
- code-native rows and progress dots
- no generated image until the structure is approved

Credit-efficient reason:

The structure is still changing, so generated backgrounds and icons would waste credits and be harder to edit. Use generation later only when the composition is stable and the exact icon list is known.

## Current Technical Note

The Level 1 entry screen exists in `assets/js/journey.js` as `renderLevelEntry(1)`.

Normal Level 1 clicks now open this roadmap by default.

Main implementation helpers:

- `levelOneRoadmapSections()`
- `renderLevelEntry(1)`
- `Journey.openLevel(1)`
