# Hearth Node Professional Alignment Audit

Date: 2026-07-18

Scope: Hearth meaning, first click, deeper chambers, visual asset strategy,
learning relationships, progress evidence, accessibility, and handoff
architecture.

This audit was performed against the current repository sources and the low-
credit layered composition preview. No live simulator code or image-generation
assets were changed during the audit.

## Executive Verdict

The Hearth concept is aligned with the overall simulator and worth keeping.

The strongest idea is:

> The guitar is the outer instrument. The learner is the inner instrument.

That gives the Hearth a job none of the other nodes can do. Journey tells the
learner what to do next. Doing supplies physical tasks. Practise records
repetition. Study and Knowing explain ideas and sources. Hearth explains what
the learner's brain, senses, hands, body, and feelings are doing while those
activities happen.

The biggest risk is visual and structural drift. The current live Hearth still
opens as a dashboard-like room with summary cards, a separate system rail, a
large body image, hotspot circles, and a "Start with Brain" command. That makes
the Hearth feel like a menu about the body rather than a place the learner
enters.

The correct direction is a single anatomically believable person holding a
correct six-string guitar. The learner selects the actual brain/head, eyes,
ears, hands, breath/body, feeling system, or whole person-and-guitar
integration. The picture is the navigation.

## Alignment With The Overall Plan

| Product area | Correct ownership | Hearth relationship | Verdict |
| --- | --- | --- | --- |
| Foundation | How to enter and learn in the world | Hearth can explain how the learner notices body and attention, but should not repeat orientation | Keep separate |
| Journey | What to do next | Journey activities carry development tags and later show Hearth evidence | Strong connection, not duplication |
| Doing | Physical guitar drills | Hearth explains the body systems a drill uses; it does not own the drill | Clear boundary |
| Practise | Timed repetition, observation, reflection | Hearth reads practice duration, ratings, tension, and notes | Strong connection, currently under-wired |
| Play | Groove, application, musical contact | Hearth can explain listening, prediction, coordination, and expression during play | Strong connection |
| Knowing | Reference library | Hearth may link to a source, but does not become a general science library | Keep links selective |
| Study | Deep guided understanding | Hearth gives a short explanation and sends deeper anatomy or learning science to Study | Clear boundary |
| Create | Experiments, riffs, lyrics, prompts | Hearth can reflect motivation, risk, attention, and expression | Useful secondary connection |
| Mastery | Artistry, integration, personal voice | Hearth explains whole-system integration; Mastery shows what it can become | Complementary |

Recommended boundary sentence:

> Hearth helps you understand and care for the systems that make musical
> learning possible. It does not replace the place where you practise the
> skill, study the concept, or make the music.

## What Is Working

### Meaning and content

The current data already has useful plain-language material for brain, hands,
ears, eyes, breath/body, and feeling. It explains what each system is, how it
develops, how it connects to guitar, what to try, and how to care for it. That
is a strong content foundation in `assets/js/hearth-body-data.js`.

The data is also appropriately cautious in several places. It does not need to
claim that one button grows one brain region, and the care language around
pain, numbness, burning, and strain is directionally responsible.

### Architecture direction

The active ownership is clear:

- `adapters/hearth-body-viewer.js` renders the active Hearth scene;
- `assets/js/hearth-body-data.js` owns the current Hearth copy and zone data;
- the active files are included explicitly in `simulator.html`;
- the old `assets/js/hearth-brain.js` should remain historical, not be revived.

This is a good foundation for a future backend because the content is already
partly separated from rendering.

### Composition prototype

The low-credit preview successfully tests the core interaction idea:

- one central guitar;
- seven stable systems;
- hover/focus changes guide copy;
- click changes the selected system and detail copy;
- unrelated layers dim while the selected layer remains visible;
- the preview works at desktop and mobile sizes;
- browser testing found no warnings or errors.

The temporary CSS organ shapes are not suitable final art, but they have done
their job: they exposed composition and interaction issues before image credits
were spent.

## What Is Weak Or Confusing

### 1. The live first click is still a dashboard

`adapters/hearth-body-viewer.js:52-83` renders all of the following together:

- title and subtitle;
- three explanatory summary cards;
- a large rectangular body image;
- SVG hotspot circles and separate seals;
- a system-pill rail;
- a "Start with Brain" button.

Each element is reasonable in isolation, but together they compete. The learner
has to read the interface before understanding the place.

Recommendation: once the new scene is ready, keep only the image, guide,
minimal contextual labels, and map/back control. Deeper explanations belong
after a system is selected.

### 2. The image and the navigation are separate systems

The current image is one rectangular asset at
`adapters/hearth-body-viewer.js:70-72`, while the clickable meaning is encoded
in separately positioned SVG circles and DOM seals. The circles do not truly
belong to the visible anatomy, so the user can reasonably feel that the nodes
are arbitrary.

Recommendation: use the anatomical figure as the visual source of truth. Put
semantic button hit zones over the actual brain, hands, ears, eyes, torso, and
whole figure. The visible glow and label should follow those hit zones.

### 3. The current hotspots are not fully accessible

SVG circles with mouse event attributes are not dependable keyboard controls.
The separate `.hb-seal` elements are also decorative rather than semantic
controls. The system rail provides a fallback, but it brings back the menu
problem.

Recommendation: render real buttons for every clickable system, with visible
art inside or positioned beneath them. Each button needs an accessible name,
keyboard focus state, and a mobile-sized hit area. Decorative pathways must not
capture clicks.

### 4. The chamber is still a card grid

`adapters/hearth-body-viewer.js:97-124` turns a selected zone into several
parallel text cards: What It Is, Important Parts, How It Develops, Guitar
Connection, Develop It, and Care. The content is good, but the structure feels
like a reference dashboard and does not use the simulator's teaching language.

Recommendation: turn one chamber into a short guided sequence:

1. Understand: one plain explanation.
2. Experience: one small body, listening, visual, or attention check.
3. Apply: one guitar-linked experiment.
4. Own: one reflection or evidence capture.

Care and deeper source material can appear as a quiet continuation, not equal-
weight cards on the opening view.

### 5. The system naming needs one migration decision

The product meaning is now `Feeling & Motivation`, but the active data uses the
ID `heart`. That is not an emergency, but it will make future progress and
backend mapping ambiguous.

Recommendation: use `feeling` as the canonical ID and support `heart` only as a
documented migration alias. Do not describe feeling as living only in the
physical heart.

### 6. Hearth evidence is not yet connected to the learning loop

The repository already has a generic progress event store at
`adapters/progress-event-store.js:15-75`, with learner, node, Journey level,
lesson, drill, duration, rating, note, and data fields. The Hearth renderer does
not yet record meaningful events when a learner notices tension, completes a
body check, rates a drill, or reflects on a system.

Recommendation: define a small Hearth evidence vocabulary and append events
from Journey, Doing, Practise, and Hearth. The first version can remain local;
it should be shaped so Martin can later persist it in the backend.

### 7. The preview's composition is useful but not a final art direction

The preview uses a real guitar and brain asset plus CSS placeholders. It proves
the interaction, but it also shows why the final scene must not be seven
floating organ illustrations around a guitar. The final artwork needs one
coherent person, complete arms, plausible playing posture, correct organs, and
layer boundaries that do not create visual seams.

## Recommended Visual Direction

Generate one master reference of:

- one complete seated learner;
- a natural right-handed playing posture;
- left hand fretting the neck;
- right hand playing near the soundhole;
- full shoulders, upper arms, elbows, forearms, wrists, and hands;
- exactly five digits per visible hand;
- exactly six strings and six tuning machines;
- brain, eyes, ears, lungs/diaphragm, spine, and subtle nervous pathways in
  plausible locations;
- a warm, non-literal feeling glow through the chest and whole body;
- the existing dark Hearth engraved/painterly visual language.

The artwork should not include guide character, text, UI, cards, room, border,
labels, or a baked background.

### Important production recommendation

Do not force every clickable idea to become an independently generated bitmap.
That creates alignment risk: separately generated hands, arms, eyes, and guitar
parts may not line up perfectly.

Use this safer structure:

- one coherent master person-and-guitar image as the visual base;
- semantic HTML hit zones aligned to the visible anatomy;
- small transparent overlays only where a visual highlight is genuinely needed,
  such as brain glow, nervous pathways, or a hand accent;
- a data manifest for hit-zone coordinates, labels, layer order, and mobile
  positions.

This still gives the learner independently clickable brain, hands, ears, eyes,
body, feeling, and integration areas. It protects anatomy and is cheaper than
trying to generate seven perfectly matching images.

## Ideal Click Path

### First click: The Inner Instrument

The user enters a calm scene showing the person holding the guitar. The guide
says one useful sentence:

> Your guitar is the outer instrument. Your brain, senses, hands, body, and
> feelings are learning too. Choose one to explore.

No summary cards, system rail, or "Start with Brain" command is needed.

### System selection

The user hovers or focuses the actual anatomy. That system brightens, a quiet
label appears, and the guide changes one sentence. Clicking opens only that
system's chamber.

### Example: Hands & Touch chamber

1. Understand: "Your hands learn small accurate movements through touch,
   pressure, timing, and release."
2. Experience: compare a fretted note with too much pressure and then the
   least pressure needed for a clean sound.
3. Apply: open a relevant Doing drill or a tiny chord-change task.
4. Own: record a rating and note whether the hand felt tense, soft, rushed, or
   more controlled.

The resulting evidence returns to Practise and can later be summarized in
Hearth. The chamber does not become a second drill library.

### Example: Brain & Nervous System chamber

For Jen's A minor pentatonic and CAGED work, the Hearth connection would be:

- pattern recognition: three boxes and their root-note safety points;
- motor mapping: locating the shape without rushing;
- listening: hearing the root as a safe return point;
- prediction: anticipating the next note or string crossing;
- creative choice: making a small phrase rather than reciting a shape.

Hearth should say what is being developed, not assign a fake brain-growth score.

## Minimum Data Contract

Keep the current stable system IDs, with `heart` as a migration alias only.
Add a data-driven layer manifest with fields such as:

```text
system_id
canonical_label
asset_id
hit_zone
mobile_hit_zone
z_index
guide_copy
chamber_id
development_tags
related_node_ids
```

Add a small evidence vocabulary:

```text
hearth_system_viewed
hearth_body_check_completed
hearth_experiment_completed
hearth_reflection_saved
hearth_tension_noted
hearth_listening_observation
```

Each event should be able to carry:

```text
learner_id
system_id
node_id
journey_level_id
lesson_id
activity_id
development_tags
rating
note
duration_minutes
created_at
```

The event store already has many of these generic fields. The next change
should extend `data` or the shared event contract deliberately, not create a
Hearth-only storage island.

## Regression And Accessibility Checklist

Before replacing the live scene, verify:

- one complete person is visible at laptop and mobile sizes;
- left hand frets, right hand plays, and both arms are anatomically coherent;
- exactly six strings and six tuning machines are visible;
- no visible seams, black rectangles, green spill, or cropped anatomy;
- each system has one canonical ID and one accessible button;
- keyboard focus is visible without a giant rectangle around the whole scene;
- the selected layer glows while other layers remain recognizable;
- labels do not overlap important anatomy;
- reduced-motion mode disables particle/path animation;
- clicking a system opens only that chamber;
- Back returns to the full composition and preserves context;
- missing art falls back without breaking the page;
- Journey, Doing, Practise, and Hearth events use the same learner identity;
- no Hearth event claims to measure brain growth or diagnose the learner.

## Prioritized Roadmap

### Slice 1: Confirm the visual and product contract

Cost: low credit. Estimate: 20-30 minutes.

Approve the person-and-guitar composition, the seven systems, the default
right-handed posture, and the rule that the image itself is the navigation.

### Slice 2: Build the production layer manifest and accessible hit zones

Cost: low credit. Estimate: 30-60 minutes.

Keep the preview outside the live simulator while defining stable coordinates,
labels, mobile positions, and system IDs. Use semantic buttons rather than SVG
mouse-only hotspots.

### Slice 3: Generate one master reference image

Cost: high credit. Estimate: 15-30 minutes for a first generation and review.

Use the approved anatomical prompt. Do not generate seven final layers yet.

### Slice 4: Install the first-click scene only

Cost: medium engineering effort. Estimate: 45-90 minutes.

Replace the old Hearth body image and duplicate controls while preserving the
existing chambers as a fallback. Test all systems, keyboard focus, mobile, and
back navigation.

### Slice 5: Rebuild Brain as the pilot chamber

Cost: medium engineering effort. Estimate: 60-120 minutes.

Use the Understand -> Experience -> Apply -> Own flow, with the A minor
pentatonic/CAGED example and a real evidence event. Only after this works should
the same pattern be applied to Hands, Ears, Eyes, Breath/Body, Feeling, and
Integration.

## Defer For Later

- generating separate art for every layer;
- detailed brain-region diagrams;
- diagnostic-looking neuroscience measurements;
- a large Hearth progress dashboard;
- full backend synchronization;
- user-selectable handedness and alternate body poses;
- complex audio or video inside the first chamber;
- replacing every existing chamber at once.

## Final Decision

Proceed with Hearth, but rebuild it around a complete person holding a guitar,
not a guitar surrounded by organ icons. Keep the first-click visual and quiet.
Use semantic hit zones and a shared evidence contract. Generate one master
reference only after the composition is approved, then install the first-click
scene and pilot one chamber before expanding.
