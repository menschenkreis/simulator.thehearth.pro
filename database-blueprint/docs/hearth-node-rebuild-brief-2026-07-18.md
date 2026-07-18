# Hearth Node Rebuild Brief - 2026-07-18

## North Star

The Hearth is the inner instrument.

It shows what learning guitar is doing inside the learner and helps the learner
develop those systems deliberately.

Plain version:

> The guitar is the outer instrument. Your brain, senses, hands, body, and
> feelings are the inner instrument.

## What Hearth Is For

Hearth should teach and connect:

- the brain and nervous system;
- the hands, touch, joints, tendons, nerves, pressure, and movement;
- the ears as organs and hearing as a brain process;
- the eyes as organs and visual/spatial pattern recognition;
- breathing, posture, tension, energy, and nervous-system regulation;
- feeling, motivation, confidence, shame, identity, and expression;
- how all of those systems work together while playing guitar.

Hearth should also reflect real learner evidence:

- what the learner has recently repeated;
- what is becoming more familiar;
- where tension or confusion keeps appearing;
- which senses and skills a current activity is developing;
- what would be a sensible next experiment.

## What Hearth Is Not

Hearth is not:

- another drill library;
- another Study or Knowing library;
- a vague journal with mystical filler;
- a menu of unrelated wellness advice;
- a fake neuroscience dashboard;
- a place that claims a brain region has grown because a button was clicked;
- a duplicate of Journey progress.

The surrounding nodes have different jobs:

- Journey says what to do next.
- Doing gives the hands a physical task.
- Practice helps the learner repeat and observe it.
- Knowing and Study explain musical ideas and sources.
- Hearth explains what is happening in the learner and how to support it.

## First-Click Experience

The first click should feel like entering one coherent place, not opening a
dashboard.

It should contain:

1. one layered Inner Instrument composition;
2. the guide character placed beside it, never over the important anatomy;
3. one short line: "Choose a part of your inner instrument.";
4. quiet labels that appear on hover or focus;
5. one obvious return to the main map.

Remove from the first click once the layered scene is ready:

- the three explanatory summary cards;
- the duplicated row of system pills;
- a separate "Start with Brain" command;
- long explanations before the learner has chosen a system.

The image itself becomes the navigation.

## Inner Instrument Composition

### Visual Metaphor

Build one vertical, balanced emblem around a classical/acoustic guitar:

- the guitar is the central spine and integration point;
- the brain floats above or around the headstock;
- the eyes and ears sit near the upper neck as paired sensory elements;
- the two hands frame the neck and soundhole areas;
- breath/body and nervous-system pathways surround the guitar body;
- feeling/motivation is represented as a warm living center near the soundhole;
- subtle pathways connect the systems so the collection reads as one image.

It should feel like one inner instrument, not seven icons arranged in a menu.

### Clickable Systems

Use stable system IDs:

| ID | Display label | Meaning |
| --- | --- | --- |
| `brain` | Brain & Nervous System | Attention, memory, prediction, motor maps, pattern recognition, and learning loops. |
| `hands` | Hands & Touch | Safe movement, touch, pressure, independence, coordination, and release. |
| `ears` | Ears & Hearing | Vibration, pitch, rhythm, tone, auditory comparison, and audiation. |
| `eyes` | Eyes & Visual Maps | Tracking, distance, notation, tab, shapes, and spatial memory. |
| `breath` | Breath & Body | Posture, tension, energy, recovery, and regulation. |
| `feeling` | Feeling & Motivation | Confidence, shame, joy, identity, expression, and willingness to try. |
| `integration` | The Inner Instrument | How all systems cooperate in a real musical action. |

The current prototype ID `heart` may remain as a migration alias for
`feeling`. The content must state plainly that feelings arise from interacting
brain, body, memory, and social systems; they do not literally live only in the
heart organ.

## Layered Asset Architecture

Do not bake the whole scene into one rectangular image.

Build it from coordinated transparent assets:

- `hearth-base-guitar.webp`
- `hearth-brain.webp`
- `hearth-eyes.webp`
- `hearth-ears.webp`
- `hearth-hands.webp`
- `hearth-breath-nervous-system.webp`
- `hearth-feeling-center.webp`
- `hearth-connection-paths.webp` (decorative and non-clickable)

Each subject should have a tight transparent crop. Position the layers from a
data manifest rather than hardcoding coordinates throughout the renderer.

Suggested manifest fields:

```text
id
asset
x_percent
y_percent
width_percent
z_index
content_zone_id
hover_origin
mobile_x_percent
mobile_y_percent
mobile_width_percent
```

The visible assets may sit inside semantic buttons. Decorative connection
paths use `pointer-events: none`. If tight image bounds are not reliable enough,
use separate accessible hit zones above the art rather than relying on
transparent pixels.

Hover/focus behavior:

- selected system becomes brighter and slightly more dimensional;
- its connection pathways wake up;
- unrelated layers dim gently but remain visible;
- the guide gives one plain sentence about that system;
- no large colored blob or arbitrary rectangular highlight appears.

Click behavior:

- the selected layer expands or moves forward;
- the deeper chamber opens for that one system;
- Back returns to the complete Inner Instrument without losing context.

## Visual Style Contract

The assets should match the strongest Foundation, Journey, and map-node work:

- elegant hand-painted and engraved feeling;
- dark Hearth world with warm gold and ember light;
- restrained rainbow glimmers in reflections or neural pathways;
- anatomical clarity without clinical gore;
- premium game-like object art, not stock photography;
- readable silhouettes at laptop and mobile sizes;
- no baked room background;
- no text, labels, buttons, borders, or UI inside the artwork;
- no guide character inside the artwork;
- transparent final background;
- no black square or visible image seam.

Accuracy rules:

- guitar has exactly six strings and six tuning machines;
- guitar proportions and string paths are plausible;
- every visible hand has five anatomically plausible digits;
- left/right hands must not be duplicated or mirrored incorrectly;
- eyes and ears appear as paired organs where the design calls for pairs;
- brain, heart, lungs, spine, and major nervous pathways remain recognizable;
- no invented anatomical structures;
- no labels generated inside the image.

## Asset Production Method

Use a credit-efficient approval sequence:

1. Make one low-detail composition mockup using existing assets or rough
   placeholders. Approve placement and scale before generating final art.
2. Generate one master visual reference for style and composition.
3. Generate a coordinated asset sheet on a perfectly flat chroma-key
   background, with each subject isolated and not touching another subject.
4. Remove the chroma key and crop the elements into individual transparent
   assets.
5. Recompose them in HTML/CSS using the approved coordinates.
6. Regenerate only the inaccurate element rather than the whole scene.
7. Inspect anatomy, six-string geometry, transparency, desktop framing, mobile
   framing, hover, keyboard focus, and click behavior before replacing the
   current Hearth scene.

This approach is safer and cheaper than repeatedly generating a full composite
whenever one hand, organ, or tuner is wrong.

## Comprehensive Master Image Prompt

Create the master visual reference before generating production layers:

```text
Create a unified vertical "Inner Instrument" composition for The Hearth
Mastery, a sophisticated guitar-learning simulator.

The composition should feel like one symbolic living instrument assembled
around an anatomically correct classical/acoustic guitar. The guitar is the
central spine. An elegant anatomical brain glows above and around the
headstock. A paired set of eyes and a paired set of ears sit near the upper
neck as visual and auditory systems. Two anatomically correct human hands,
each with five clear plausible digits, relate naturally to the neck and
soundhole. Subtle lungs, diaphragm, spine, and nervous-system pathways surround
the guitar body. A warm living center near the soundhole represents feeling,
motivation, and expression. Fine luminous pathways connect every system so the
whole composition reads as one image, not a grid of icons.

Style: elegant hand-painted engraving, warm gold and ember light, dark polished
wood, subtle ivory linework, restrained rainbow glimmers in neural and sensory
pathways, premium fantasy-learning game asset, calm and intelligent rather
than ornate, clinical, gothic, or hyper-real. Anatomically recognizable but
not graphic or medical-gory. Match the visual family of a dark Hearth map with
gold engraved node objects.

Composition: centered vertical emblem, balanced negative space, each major
system visually distinct enough to become a separate clickable layer later,
but close and connected enough to look like one living inner instrument. Keep
the guitar fully readable. Exactly six strings and exactly six tuning
machines. No cropped hands, brain, headstock, or guitar body.

Do not include: text, letters, labels, interface controls, buttons, character
guide, room, books, candles, dashboard, cards, frames, border, black rectangle,
extra fingers, missing fingers, extra strings, missing tuners, duplicated
organs, random symbols, excessive filigree, or a photographic human body.

Background: perfectly flat solid #00ff00 chroma-key background with no shadow,
gradient, texture, glow, reflection, or green spill. Do not use #00ff00 in any
subject. The final production assets will be separated and made transparent.

Canvas: portrait 4:5, high resolution, all subjects completely inside the
canvas with generous outer padding.
```

## Coordinated Layer Prompt Template

After the master reference is approved, use it as the visual reference for
each layer:

```text
Using the approved Inner Instrument master as the exact style and proportion
reference, render only [LAYER NAME]. Preserve its viewing angle, lighting,
engraved painterly treatment, scale relationship, and warm gold/ember palette.
Keep the full subject inside the canvas with no crop. Do not add any other
organs, guitar parts, text, labels, UI, frame, floor, or scenery. Use a perfectly
flat solid #00ff00 background with no green in the subject and no cast shadow.
Anatomical and instrument accuracy is mandatory: [LAYER-SPECIFIC ACCURACY
RULES].
```

## System Chamber Structure

The second click should not end in six small text cards.

Each system chamber should use one large visual and a short guided sequence:

1. What it is - plain anatomy and function.
2. Notice it - a ten- to thirty-second sensory check.
3. Try it - one tiny interactive experiment.
4. Guitar connection - hear, see, or feel it on the instrument.
5. Grow it - a practical way to develop the system.
6. Care - a boundary, tension warning, or recovery principle.
7. Your evidence - recent practice observations connected to this system.

The underlying learning flow remains Understand -> Experience -> Apply -> Own,
but the visible wording should stay plain and human.

Examples:

- Brain: recognize the A minor pentatonic as small repeatable patterns and root
  safety points rather than one giant shape.
- Hands: compare too much pressure with the least pressure needed for a clean
  note.
- Ears: hear two notes and choose which sounds more settled.
- Eyes: trace a tab or chord shape, then find it without looking back.
- Breath/body: exhale before a chord change and notice whether the hands soften.
- Feeling: record one imperfect take and identify one musical thing that worked.
- Integration: play a tiny phrase while noticing eyes, ears, hands, breath, and
  feeling as one coordinated event.

## Progress and Journey Connections

Journey activities should carry development tags such as:

- `pattern_recognition`
- `motor_mapping`
- `timing`
- `listening`
- `memory`
- `prediction`
- `coordination`
- `visual_mapping`
- `pressure_control`
- `creative_choice`
- `feedback_tolerance`
- `emotional_regulation`

Hearth can then say what an activity is developing without pretending to
measure brain growth directly.

Useful evidence includes:

- drills attempted and learner rating;
- practice duration and body reflection;
- BPM and clean repetitions;
- listening tasks;
- recordings and comparisons;
- lesson reflections;
- teacher notes;
- repeated tension or confusion signals;
- concepts that are becoming familiar.

Hearth should favor statements such as:

- "You repeated this pattern three times this week."
- "Your clean-note rating is improving."
- "You often mention tension during chord changes."
- "Call and response is helping you connect listening to movement."

Avoid unsupported statements such as:

- "Your motor cortex grew by 20%."
- "This exercise activates exactly one brain region."
- "Mastery is 63% complete."

## Content and Source Rules

- Use plain language before scientific terms.
- Define scientific terms when they are useful.
- Separate established evidence, teaching interpretation, and metaphor.
- Do not use neuroscience as decoration.
- Cite the local Patel, Levitin, hand-care, learning, and practice sources when
  deeper pages are built.
- Keep medical warnings conservative. Pain, burning, numbness, or sharp strain
  are reasons to stop, rest, and seek qualified guidance if they persist.
- Explain variability: bodies and learning histories differ.

## Implementation Sequence

1. Keep the current active owner: `adapters/hearth-body-viewer.js`.
2. Stabilize the seven system meanings in data before changing artwork.
3. Build a cheap placeholder layered composition and confirm layout.
4. Generate and approve the master visual reference.
5. Produce transparent element assets and a layer manifest.
6. Replace only the first-click scene first; preserve the existing chambers as
   a temporary fallback.
7. Rebuild one chamber, Brain, as the complete second-click pilot.
8. Connect Brain to real Journey and Practice evidence.
9. Apply the chamber template to Hands, Ears, Eyes, Breath/Body, Feeling, and
   Integration.
10. Run desktop/mobile visual checks and content accuracy review.

Do not delete the old brain-map files during this work. They remain useful
historical and data references, but they should not become a second active
Hearth renderer.

