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

Build one anatomically believable seated learner holding a classical/acoustic
guitar in a plausible playing position:

- the person and guitar form one complete, calm composition;
- the brain remains inside the head rather than floating like a separate icon;
- the eyes and ears stay in their anatomically correct positions;
- the complete left arm reaches the neck and the left hand frets naturally;
- the complete right arm crosses the guitar body and the right hand plays near
  the soundhole;
- breath/body, spine, and nervous-system pathways are visible as restrained
  internal overlays within the person;
- feeling/motivation is represented by a warm non-literal glow through the
  chest and whole nervous system, not a false claim that feeling lives in one
  organ;
- the guitar is the outer instrument and the learner is the inner instrument;
- subtle pathways connect attention, senses, movement, body, and sound so the
  whole scene reads as one image.

It should feel like one learner making music, not seven icons arranged around a
guitar. The anatomy creates the navigation: the learner clicks the actual head,
eyes, ears, hands, torso, or whole person/guitar integration.

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

- `hearth-base-person-guitar.webp`
- `hearth-brain-nervous-system.webp`
- `hearth-eyes.webp`
- `hearth-ears.webp`
- `hearth-left-hand.webp`
- `hearth-right-hand.webp`
- `hearth-breath-body.webp`
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

- show one complete, anatomically believable human learner;
- show complete shoulders, upper arms, forearms, wrists, hands, and all five
  digits on each visible hand;
- use a plausible seated guitar posture with coherent joints and limb paths;
- in the default right-handed version, the left hand frets the neck and the
  right hand plays the strings near the soundhole;
- guitar has exactly six strings and six tuning machines;
- guitar proportions and string paths are plausible;
- every visible hand has five anatomically plausible digits;
- left/right hands must not be duplicated or mirrored incorrectly;
- eyes and ears appear as paired organs in their correct positions on the head;
- brain, heart, lungs, spine, and major nervous pathways remain recognizable;
- no invented anatomical structures;
- no detached limb, missing upper arm, impossible wrist, reversed elbow, or
  hand passing through the guitar;
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

## Master Reference Status

The first approved-direction master reference is currently saved as:

- `images/hearth/hearth-inner-instrument-master-v1-chroma.png` - original
  chroma-key source;
- `images/hearth/hearth-inner-instrument-master-v1.png` - locally removed
  background with alpha transparency.

The revised anatomical-sketch candidate is now saved as:

- `images/hearth/hearth-inner-instrument-master-v2-chroma.png` - chroma-key
  source;
- `images/hearth/hearth-inner-instrument-master-v2.png` - locally removed
  background with alpha transparency.

These are composition and anatomy references, not yet the live Hearth asset.
V1 is retained for comparison only. V2 is the current visual candidate: an
anatomical sketch/cutaway where the inner structures themselves form the
visible learner.

Before live installation, make one targeted revision toward the anatomical
sketch direction below. Do not produce additional component layers from v1.

## Master Reference Revision: Anatomical Sketch

The learner should read like an elegant anatomical study, not a normal person
wearing clothes and not a photorealistic exposed body. Show the person through
recognizable inner structures: ivory and gold linework for bones, joints,
tendons, muscles, nerves, brain, eyes, ears, lungs, spine, and hands. The
guitar remains a complete visible instrument held in a plausible playing pose.

Use a dignified educational cutaway/engraving treatment with no skin surface,
no clothing surface, no sexualised anatomy, no gore, and no medical horror.
Keep the figure understandable as one person holding the instrument. The
visible anatomy should make the click targets obvious: brain in the head, eyes
and ears at the head, fretting hand on the neck, playing hand at the soundhole,
breath/body through the torso, feeling as a restrained living glow, and the
whole figure/guitar as integration.

### Revision prompt

```text
Create a unified vertical anatomical-sketch master reference for The Hearth
Mastery, a sophisticated guitar-learning simulator.

Show one complete human learner seated and holding a correct classical/acoustic
guitar in a natural standard right-handed posture. This is an elegant
educational anatomical cutaway illustration: do not show skin or clothing as
the visible body surface. Instead, represent the learner with clear, dignified
ivory and warm-gold engraved linework showing the skull and brain, eyes, ears,
spine, nerves, shoulders, upper arms, elbows, forearms, wrists, hands, joints,
tendons, major muscles, lungs/diaphragm, and a restrained warm feeling glow.
The inner structures should form one coherent person, not a collection of
floating organ icons.

The complete left arm reaches the neck and the left hand frets naturally. The
complete right arm crosses the guitar body and the right hand plays naturally
near the soundhole. Each visible hand has five anatomically plausible digits.
The guitar has exactly six continuous strings and exactly six tuning machines,
with a readable headstock, neck, soundhole, bridge, and body. No hand passes
through the instrument. No duplicated or detached anatomy.

Style: anatomical plate meets Hearth Mastery engraved game art; precise ivory
linework, warm gold structure, dark wood guitar, ember light, restrained
rainbow glimmers along selected sensory and nervous pathways. Calm, intelligent,
beautiful, and alive. It must feel like a visual map of the learner's inner
instrument, not a hospital illustration, medical horror image, nude figure, or
photorealistic body.

Composition: centered portrait 4:5. Keep the full head, brain, eyes, ears,
torso, shoulders, complete arms, both hands, full guitar body, neck, and
headstock inside the canvas with generous padding. Make the brain, eyes, ears,
left hand, right hand, torso/breath, feeling center, and whole integration
visually distinct enough for later semantic click zones and transparent
highlight layers. Use a gentle three-quarter-front angle so both eyes and both
ears remain discoverable while the guitar posture stays believable.

Background: perfectly flat solid #00ff00 chroma-key background with no shadow,
gradient, texture, reflection, floor, vignette, or lighting variation. Do not
use #00ff00 in the subject.

Do not include text, labels, UI, guide character, cards, room, books, candles,
border, watermark, skin surface, clothing surface, nudity, sexualised anatomy,
gore, extra fingers, missing fingers, extra strings, missing tuners, impossible
joints, cropped anatomy, floating organs, random symbols, or a black rectangle.
```

## Comprehensive Master Image Prompt

Create the master visual reference before generating production layers:

```text
Create a unified vertical "Inner Instrument" composition for The Hearth
Mastery, a sophisticated guitar-learning simulator.

Show one complete anatomically believable adult learner seated calmly and
holding an anatomically and mechanically correct six-string classical/acoustic
guitar. Use a plausible right-handed playing posture: the learner's complete
left arm reaches the neck and the left hand frets naturally; the complete right
arm crosses the guitar body and the right hand rests or plays naturally near
the soundhole. Both arms must include coherent shoulders, upper arms, elbows,
forearms, wrists, hands, and five clear plausible digits per visible hand. The
limbs must not be mirrored, detached, cropped, duplicated, or pass through the
instrument.

Reveal the learner's inner systems as elegant restrained overlays within the
same person: a recognizable brain inside the head, normal paired eyes and ears
in their correct positions, subtle spinal and peripheral nervous pathways,
lungs and diaphragm inside the torso, and a warm non-literal chest-to-body glow
for feeling, motivation, safety, and expression. Fine luminous pathways connect
attention, hearing, sight, touch, breath, movement, and sound. The guitar is the
outer instrument; the whole learner is the inner instrument.

Style: elegant hand-painted engraving, warm gold and ember light, dark polished
wood, subtle ivory linework, restrained rainbow glimmers in neural and sensory
pathways, premium fantasy-learning game asset, calm and intelligent rather
than ornate, clinical, gothic, or hyper-real. Anatomically recognizable but
not graphic or medical-gory. Match the visual family of a dark Hearth map with
gold engraved node objects.

Composition: centered seated figure, balanced negative space, readable at
laptop and mobile sizes. Keep the full head, torso, both arms, both hands, full
guitar body, neck, and headstock inside the canvas. Each system must remain
visually distinct enough to become a separate clickable transparent layer
later while still looking like one person. The guitar must have exactly six
continuous strings and exactly six tuning machines, with plausible proportions
and string paths.

Do not include: text, letters, labels, interface controls, buttons, character
guide, room, books, candles, dashboard, cards, frames, border, black rectangle,
extra fingers, missing fingers, extra strings, missing tuners, detached organs,
floating organ icons, duplicated anatomy, missing upper arms, impossible
joints, random symbols, excessive filigree, clinical gore, or hyper-real stock
photography.

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
