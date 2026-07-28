# Mastery Node Rebuild Brief

Date: 2026-07-18

Status: design source of truth before visual generation or implementation

## Why This Brief Exists

Mastery currently contains two useful but incomplete ideas:

1. A phoenix transformation chamber with four seals.
2. A gallery of remarkable artists and advanced musical ideas.

The phoenix is a strong visual metaphor, and learning from artists belongs here. The current experience is still too arbitrary, text-heavy, and disconnected from the learner's actual work. Its four seals mix unrelated categories, its examples are hardcoded, and it records no meaningful progress.

This rebuild must make Mastery a working part of the simulator's learning loop without turning it into another lesson dashboard, Study library, Create room, or final level.

## Core Purpose

Mastery is the place where the learner sees what a musical skill can become.

It helps the learner:

- witness a master in action
- notice the choices that make the work distinctive
- try one small version of that choice
- transform it rather than merely copy it
- carry the discovery back into Practice, Create, Journey, or Hearth

Mastery is not a finish line. It is a recurring perspective available throughout the learner's development.

Journey answers: **What should I learn next?**

Mastery answers: **What can this become, and what kind of musician might I become through it?**

## Important Boundaries

Mastery must not duplicate the other nodes.

- **Journey** owns the planned learning path and selects relevant Mastery encounters.
- **Do** owns physical drills and technique instructions.
- **Practice** owns focused repetition, timing, takes, and practice reflection.
- **Knowing** owns explanations and reference knowledge.
- **Study** owns longer source study, analysis, and full-length learning resources.
- **Play** owns groove, traditions, songs, jamming, and musical participation.
- **Create** owns making new material and developing creative seeds.
- **Hearth** owns the learner's body, attention, identity, confidence, and inner development.
- **Mastery** owns short, purposeful encounters with exemplary artistry and the learner's response to it.

Watching a master is not enough. Every Mastery encounter should lead to a noticed choice, a small musical experiment, or a saved direction.

## The Mastery Learning Loop

Use one stable four-part loop for every artist, performance, or advanced idea:

1. **Witness**
   Watch or listen to a carefully chosen excerpt.

2. **Notice**
   Focus attention on one audible or visible choice: time, touch, tone, space, phrasing, dynamics, form, presence, or rule-breaking.

3. **Try**
   Attempt one small, level-appropriate version on the guitar. This is an experiment, not an imitation test.

4. **Carry**
   Save what mattered and send the next action to the correct node: practise it, create with it, study it, or reflect on it.

This loop replaces the current unrelated seal structure. The phoenix remains the visual metaphor for transformation, not the database taxonomy.

## First-Click Experience

Create an image-led Mastery entrance that follows the visual logic of Foundation, Journey, Do, and Practice.

The visual metaphor is a living phoenix chamber: a place of attention, transformation, and long-range possibility. It should feel radiant and alive, but not ornate, crowded, or mystical for its own sake.

The first screen should answer three questions immediately:

- What is this place?
- Why is this relevant to me now?
- What can I do here?

Show only the most important paths:

1. **Continue today's encounter**
   Open the exemplar recommended by the current Journey lesson or recent work.

2. **Watch a master**
   Browse short, purposeful exemplars matched to the learner's level and interests.

3. **Follow an artistic thread**
   Explore a thread such as time, touch, tone, phrasing, groove, voice, composition, performance, innovation, or teaching.

4. **Review what changed**
   Revisit saved observations, experiments, recordings, influences, and long-range directions.

These should be restrained hotspots in the scene, not a dashboard of cards.

The active learner profile determines recommendations, interests, saved artists, encounters, reflections, and progress.

## Contextual Use Inside Lessons

A Journey lesson may end with a short **Master in Action** encounter.

For example, after working with A minor pentatonic:

- watch a musician use a small pentatonic vocabulary musically
- listen for root-note resolution, phrasing, silence, bends, or rhythmic placement
- try one observed choice over a backing groove
- save a note or recording
- return the next action to Practice, Play, or Create

The example may demonstrate conventional mastery or deliberately move beyond the convention. This reminds the learner that shared musical language can become personal language.

Long videos and detailed historical or theoretical analysis should open in Study. Mastery should use the precise excerpt needed for the encounter.

## Exemplar Content Model

Mastery content must be reusable data, not artist names and paragraphs embedded in a renderer.

Each exemplar should support:

- stable ID and title
- artist or tradition
- instrument and performance context
- source and media URL
- source reliability and rights note
- precise excerpt or timestamp
- Journey level range
- skill and category tags
- genre, region, and learner-interest tags
- prerequisite concepts, if any
- one plain-language reason it matters
- one listening or watching focus
- one level-appropriate experiment
- optional easier and deeper versions
- suggested destination node after the encounter
- related lesson, drill, song, book, or creative prompt

An exemplar can belong to several artistic threads. Threads are filters, not separate content silos.

## Learner Record

Mastery should remember:

- exemplar encountered
- watched or listened state
- what the learner noticed
- experiment attempted
- recording or note, when supplied
- what influenced or surprised the learner
- what they want to borrow, transform, or reject
- destination node and next action
- return count
- teacher note
- long-range musical interests

Recommended encounter states:

- suggested
- opened
- witnessed
- noticed
- tried
- carried forward
- returned to
- integrated

Do not label an artist, tradition, or advanced idea as "mastered." The progress belongs to the learner's depth of encounter and application.

## Connections To The Rest Of The Simulator

### Journey to Mastery

Journey recommends a relevant exemplar based on the current lesson, recent difficulty, learner interests, and level.

### Mastery to Practice

Send one observable detail to practise, such as phrasing a two-note idea at 60 BPM or holding a bend accurately.

### Mastery to Create

Send a transformed constraint or seed, such as using pentatonic notes but changing the rhythm, tone, or form.

### Mastery to Play

Open the relevant groove, tradition, song context, backing track, or musical conversation.

### Mastery to Study and Knowing

Open supporting explanation or a longer source only when the learner wants to understand more.

### Mastery to Hearth

Save identity and confidence reflections such as "I am drawn to space and restraint" or "I want a more percussive sound."

### Mastery to Progress

Count meaningful encounters, experiments, returns, influences, recordings, performance reflections, and integrated ideas. Do not reduce Mastery to videos watched.

## Jen Test Case

Use Jen's A minor pentatonic consolidation as the first real test.

Current context:

- A minor pentatonic is usable but needs repetition
- root notes are safety points
- the scale is being divided into three smaller boxes
- CAGED helped the shape make sense
- Jen enjoys jamming most
- she wants a song using rhythm and lead guitar
- she is committing to 20 minutes of practice a day

A useful Mastery encounter should:

1. show a short performance where a small pentatonic vocabulary becomes musical
2. ask Jen to notice one element, such as root-note landing, rhythmic placement, repetition, space, or call and response
3. invite one tiny experiment over a groove
4. send the result to Practice, Play, Create, or the next lesson review

If this path cannot be completed clearly in a few minutes, the Mastery design is still too complicated.

## Guide Character Behaviour

The guide should explain why the selected exemplar matters now, not deliver generic speeches about greatness.

Useful guide language:

- "You already know these notes. Listen to what timing does to them."
- "Watch where the phrase rests. The silence is part of the line."
- "Borrow one choice, not the whole performance."
- "Now change it until it belongs in your hands."

The guide should acknowledge learner history and the destination of the experiment.

## Visual Direction

Preserve the phoenix as the central Mastery symbol and connect it visually to the living phoenix destination already established on the Journey guitar map.

The scene should:

- use one strong, unified image rather than a CSS diagram or collection of cards
- match the warm illustrated realism of the other rebuilt node entrances
- keep the phoenix clearly visible and anatomically coherent
- use controlled firelight and subtle full-spectrum colour, not a purple-dominated fantasy palette
- leave deliberate negative space for the guide and interaction hotspots
- use motion sparingly: breathing light, drifting particles, or a slow ember pulse
- avoid ornate frames, excessive seals, large glowing zones, and explanatory text blocks
- remain legible and correctly framed on laptop and mobile screens

The first visual concept should be approved before generating further images.

## Architecture Rules

- Keep the node renderer in one clearly owned Mastery adapter.
- Move exemplar content out of the renderer into structured data.
- Use the active learner profile and shared progress/event stores.
- Use cross-node navigation contracts rather than direct global-function assumptions where possible.
- Preserve local storage as the prototype fallback while keeping the records ready for future API sync.
- Do not hardcode Jen's information into the generic UI.
- Do not restore a second competing Mastery renderer.
- Keep long resources in the resource/source system and store precise mappings to exemplars.

## What To Preserve

- the phoenix metaphor
- Mastery as a place beyond mere technical completion
- the Masters at Play idea
- voice, touch, timing, transformation, teaching, and boundary-crossing as valid content
- reflection and a small practical experiment
- links to artists and sourced media

## What To Change

- replace the arbitrary four seals with the Witness, Notice, Try, Carry loop
- replace hardcoded artist content with reusable exemplar records
- make recommendations level-aware, learner-aware, and lesson-aware
- shorten and simplify first-click language
- replace the card/dashboard entrance with an image-led scene
- add meaningful encounter progress and cross-node handoffs
- distinguish short Mastery excerpts from long Study resources

## What To Remove Or Retire

- duplicate legacy and active Mastery renderers competing for ownership
- generic speeches that do not respond to learner context
- three unsaved textareas presented as proof of transformation
- the assumption that Mastery only belongs after Level 8
- completion language that implies a learner has finished mastery
- hardcoded "more artists coming soon" gallery logic

## Staged Build Process

1. Audit and approve this brief.
2. Define the exemplar and learner-encounter data contracts.
3. Select one Jen-relevant pentatonic exemplar as the vertical-slice content.
4. Sketch the first-click scene and hotspot placement without generating an image.
5. Generate one carefully specified visual concept for approval.
6. Build only the approved first-click screen.
7. Build one complete Witness, Notice, Try, Carry encounter.
8. Connect its handoffs to Practice, Play, Create, Study, and Hearth.
9. Verify persistence separately for Ayla and Jen.
10. Test laptop and mobile framing, keyboard access, reduced motion, and regression checks.

## Success Test

The Mastery node succeeds when a learner can enter from a real lesson, encounter one relevant piece of artistry, identify one meaningful choice, try it on the guitar, and leave with a saved next action in the correct node.

It fails if it is only beautiful, only inspirational, only a video gallery, or another place to read cards.
