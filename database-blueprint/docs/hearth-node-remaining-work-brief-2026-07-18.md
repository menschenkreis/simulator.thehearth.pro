# The Hearth Node: Remaining Work Brief

Date: 2026-07-18

Purpose: hand this brief to another auditing node or developer so they can
continue the Hearth work without changing its meaning or drifting back toward
the old dashboard design.

## The Product Meaning

The Hearth is **The Inner Instrument**.

The guitar is the outer instrument. The learner's brain, nervous system, eyes,
ears, hands, breath, body, feelings, attention, and memory are the inner
instrument.

Hearth should explain what guitar learning is doing inside the learner and help
the learner support those systems deliberately.

Hearth is not:

- a second drill library;
- a general music-theory library;
- a practice timer;
- a Journey progress dashboard;
- a vague wellness or reflection room;
- a fake neuroscience measurement system.

The other nodes retain these jobs:

- Journey: what should I do next?
- Doing: what physical guitar task should I perform?
- Practise: how do I repeat, observe, time, and record it?
- Play: how do I use it musically?
- Knowing/Study: what does the concept or source explain?
- Create: what can I make with it?
- Mastery: how can the skill become expression and personal voice?

## Current State

### Existing live implementation

The active Hearth implementation is still the older scene-first body view:

- `adapters/hearth-body-viewer.js`
- `assets/js/hearth-body-data.js`
- Hearth styling and panel layout in `simulator.html`

The live first click currently contains a large rectangular body image, summary
cards, SVG hotspot circles, separate seals, a system-pill rail, and a
`Start with Brain` button. This is functional but reads as a dashboard and does
not yet make the visible anatomy itself feel like the navigation.

The live chamber currently renders several text cards for each system. The
content is useful, but the interaction should become a short visual guided
sequence instead of a card grid.

### Approved-direction visual candidate

The current master candidate is:

- `images/hearth/hearth-inner-instrument-master-v2.png`
- source: `images/hearth/hearth-inner-instrument-master-v2-chroma.png`

V2 is an anatomical sketch/cutaway reference. It shows a coherent learner
holding a guitar, with brain, skull, nerves, spine, lungs, joints, muscles, and
hands visible. It uses the Hearth engraved/painterly style and has a transparent
background after local chroma-key removal.

V1 is retained only for comparison:

- `images/hearth/hearth-inner-instrument-master-v1.png`

Do not install V1 or produce component layers from it.

### Low-credit interaction prototype

The composition and interaction prototype is:

- `tools/hearth-layered-composition-preview.html`

It is not the live renderer. It tests the seven clickable systems, guide copy,
selected-state behavior, reduced motion, desktop framing, and mobile framing.
Its CSS organ shapes are temporary placeholders and must not be mistaken for
final artwork.

### Existing product documents

Read these before making recommendations:

- `NODE_SPEC.md`
- `NODE_FIRST_CLICK_RULES.md`
- `database-blueprint/docs/hearth-node-rebuild-brief-2026-07-18.md`
- `database-blueprint/docs/hearth-node-professional-alignment-audit-prompt-2026-07-18.md`
- `database-blueprint/docs/hearth-node-professional-alignment-audit-2026-07-18.md`
- `database-blueprint/docs/journey-strategy-v1.md`
- `database-blueprint/docs/journey-level-one-lesson-vision-2026-07-07.md`
- `database-blueprint/docs/game-loop-progression-model-v1.md`
- `database-blueprint/docs/progress-screen-system-vision-2026-07-08.md`
- `database-blueprint/docs/co-learning-teacher-mode-v1.md`

## Settled Visual Decisions

The final first-click composition should show:

- one complete anatomical-sketch/cutaway learner;
- no visible skin or clothing surface;
- no sexualised anatomy, nudity, gore, or medical horror;
- a dignified educational anatomical-plate treatment;
- a natural standard right-handed playing posture;
- left hand fretting the guitar neck;
- right hand playing near the soundhole;
- complete shoulders, upper arms, elbows, forearms, wrists, and hands;
- five anatomically plausible digits per visible hand;
- exactly six guitar strings;
- exactly six tuning machines;
- a readable guitar body, neck, headstock, bridge, and soundhole;
- brain inside the skull;
- eyes and ears in anatomically plausible positions;
- spine, nerves, joints, muscles, lungs/diaphragm, and breath/body pathways;
- feeling/motivation as a restrained whole-system glow, not an oversized heart
  icon;
- warm gold, ivory, ember, and restrained rainbow accents;
- transparent background with no seam, black square, green spill, text, or UI.

The default pose is three-quarter front so the head systems remain discoverable
while the guitar posture stays believable.

## Settled Interaction Decisions

The image itself is the navigation.

The seven canonical systems are:

| ID | Label | Meaning |
| --- | --- | --- |
| `brain` | Brain & Nervous System | Attention, memory, prediction, motor maps, pattern recognition, and learning loops. |
| `eyes` | Eyes & Visual Maps | Tracking, distance, notation, tab, shapes, and spatial memory. |
| `ears` | Ears & Hearing | Vibration, pitch, rhythm, tone, comparison, and audiation. |
| `hands` | Hands & Touch | Safe movement, touch, pressure, independence, coordination, and release. |
| `breath` | Breath & Body | Posture, tension, energy, recovery, and regulation. |
| `feeling` | Feeling & Motivation | Confidence, shame, joy, identity, expression, and willingness to try. |
| `integration` | The Inner Instrument | All systems cooperating in a real musical action. |

The old `heart` ID may remain as a migration alias, but `feeling` is the
canonical ID.

First click:

- shows the complete anatomical composition;
- places the guide beside it, never over important anatomy;
- uses one short instruction;
- reveals quiet labels on hover or keyboard focus;
- lets the user click the actual anatomical area;
- avoids summary cards, duplicate system menus, and `Start with Brain`.

Second click:

- opens only the selected system;
- keeps the learner oriented with a Back control;
- uses a large visual and a guided sequence;
- does not open a wall of equal-weight text cards.

The minimum chamber sequence is:

1. Understand: what the system is, in plain language.
2. Experience: a 10-30 second sensory or body check.
3. Apply: one guitar-linked experiment or related node action.
4. Own: one reflection, rating, recording, or observation.

## Remaining Work

### 1. Review and approve the V2 composition

Cost: low credit. Estimate: 10-20 minutes.

Check the V2 image for:

- correct six-string geometry;
- six tuning machines;
- coherent left and right arms;
- five digits per hand;
- usable head, hand, torso, and guitar click regions;
- no confusing visual overlap;
- enough negative space for labels and focus states;
- an aesthetic match with Foundation, Journey, and the map nodes.

Do not generate more images unless a specific defect prevents the interaction
from working. Record any defect as one targeted revision request.

### 2. Choose the layer strategy

Recommended strategy:

- use V2 as the coherent visual base;
- create semantic HTML hit zones over visible anatomy;
- add only small transparent highlight overlays where they materially improve
  selection feedback;
- keep decorative connection paths non-clickable;
- store all positions in one manifest.

Do not generate seven independently matching human/organ images as the first
implementation. Separate generations may drift in anatomy, scale, lighting,
and position.

Suggested manifest fields:

```text
system_id
canonical_label
asset_id
desktop_hit_zone
mobile_hit_zone
z_index
guide_copy
chamber_id
development_tags
related_node_ids
```

### 3. Build the first-click Hearth scene in the live renderer

Cost: medium engineering effort. Estimate: 45-90 minutes.

Update the active `adapters/hearth-body-viewer.js` and its data without
reviving `assets/js/hearth-brain.js`.

The first live slice should:

- use V2 as the visible base image;
- remove the old summary cards;
- remove the duplicate system rail;
- remove the `Start with Brain` shortcut;
- replace SVG mouse-only circles with semantic buttons or accessible overlays;
- preserve map/back navigation;
- preserve a visible guide beside the image;
- support hover, keyboard focus, click, and mobile hit areas;
- dim unrelated areas gently without obscuring them;
- avoid a giant rectangular focus outline or arbitrary colored blob.

Keep the old chamber available as a temporary fallback until the new first
click is proven.

### 4. Rebuild Brain as the pilot chamber

Cost: medium engineering effort. Estimate: 60-120 minutes.

Brain is the best pilot because it explains the pattern-recognition principle
behind the current Level 1 work and Jen's A minor pentatonic/CAGED journey.

Use one visual guided sequence:

- Understand: the brain builds maps between sound, movement, attention, memory,
  and prediction.
- Experience: identify one root note as a safe return point.
- Apply: use three A minor pentatonic boxes or one small box with a groove.
- Own: record whether the pattern felt clearer, rushed, or still foggy.

Development tags may include:

```text
pattern_recognition
motor_mapping
listening
prediction
memory
creative_choice
feedback_tolerance
```

Do not claim that this measures brain-region growth.

### 5. Connect Hearth to real evidence

Cost: medium engineering effort. Estimate: 45-90 minutes.

The repository already has `adapters/progress-event-store.js`. Use the shared
event shape rather than creating a Hearth-only storage island.

Minimum Hearth event types:

```text
hearth_system_viewed
hearth_body_check_completed
hearth_experiment_completed
hearth_reflection_saved
hearth_tension_noted
hearth_listening_observation
```

Each event should support learner ID, system ID, node ID, Journey level, lesson
or activity ID, development tags, rating, note, duration, and timestamp.

For Jen's use case, the event trail should be able to say:

- call and response was enjoyable;
- A minor pentatonic became musical;
- CAGED helped;
- repetition is still needed;
- the next practice commitment is 20 minutes a day;
- the next song should use A minor pentatonic with rhythm and lead guitar.

### 6. Apply the chamber pattern to the other systems

Cost: medium engineering effort per system. Estimate: 45-90 minutes each.

Build in this order:

1. Hands & Touch
2. Ears & Hearing
3. Eyes & Visual Maps
4. Breath & Body
5. Feeling & Motivation
6. The Inner Instrument integration view

Each chamber should have one small experience, one guitar connection, one
development action, and one evidence capture. Avoid turning each chamber into a
science textbook.

## Acceptance Tests

The node is ready for this phase when:

- the first click reads as one anatomical learner, not a dashboard;
- the whole image is visible on desktop and mobile;
- the user can identify and select brain, eyes, ears, hands, body, feeling, and
  integration;
- every system is keyboard accessible;
- no system depends on a mouse-only SVG event;
- a selected system changes the guide copy and opens only its chamber;
- Back returns to the full composition without losing context;
- V2 has exactly six strings and six tuning machines;
- no visible image seam, black rectangle, green spill, or cropped anatomy;
- reduced-motion mode disables decorative animation;
- Journey/Doing/Practise evidence can be shown in Hearth without duplicating
  their primary functions;
- the active renderer remains singular and the old brain renderer remains
  historical;
- missing artwork fails gracefully;
- smoke checks and browser visual checks pass.

## Handoff Rules For The Auditing Node

Before editing anything:

1. Read this brief and the linked Hearth audit.
2. Inspect the current files and cite line references.
3. Report contradictions or missing decisions.
4. Separate low-credit layout work from high-credit image work.
5. Do not generate another image if a code or hit-zone solution will solve the
   problem.
6. Do not modify unrelated nodes or undo existing user work.
7. Do not install V2 into the live simulator until the first-click review passes.

The expected first deliverable from the auditing node is a short decision report
with:

- what is already complete;
- what remains;
- the highest-risk defect;
- the exact next implementation slice;
- estimated time and credit cost;
- acceptance tests for that slice.
