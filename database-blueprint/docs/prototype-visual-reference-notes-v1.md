# Prototype Visual Reference Notes V1

## Purpose

These notes capture what the screenshots reveal about the prototype's visual and emotional direction.

They are not final design instructions.

They are reference notes for preserving the strongest feeling while improving clarity, usability, and progression.

## Overall Read

The prototype already feels like a symbolic learning world.

Strong qualities:

- dark Hearth atmosphere
- gold/gem-like highlights
- scene-first node interiors
- each node has a distinct room/metaphor
- character guide appears as a companion
- map/level/progress language is already present

Main improvement needed:

Make the goals, current quest, accomplishments, unlocks, and next actions clearer inside each room.

## Screenshot Notes

### Knowing: Bookshelf Library

Observed:

- 8-level bookshelf structure
- vertical book spines
- Level I visible, later levels dim/locked
- progress text such as `0/15 read`
- strong library atmosphere

Preserve:

- bookshelf metaphor
- horizontal shelves
- level unlock feeling
- book spines as tactile objects

Improve:

- make current reading quest clearer
- make "why this book matters now" visible
- distinguish real books, topic books, source notes, and reference categories
- make locked shelves feel aspirational, not dead

Game-loop opportunity:

Reading a source note or book section should earn "source discovered", "topic read", or "concept reviewed" progress.

### Knowing: Open Book / Source Page

Observed:

- opened book view uses a page-like reading surface
- character guide sits beside the page
- key concepts are shown as tags
- visible source references appear under the concept box
- main lesson text has a clear teaching voice
- related video/resource appears beside the page
- back-to-shelf navigation is simple

Preserve:

- book/page feeling
- guide beside the reading surface
- visible source notes
- key concept tags
- related video/resource panel
- quiet contrast between dark room and light reading page

Improve:

- make source references clickable and traceable to book/page/source note
- distinguish "Hearth explanation" from "source reference"
- add page number/source location wherever possible
- let the learner mark a concept as read, reviewed, or needs practice
- connect related videos to the exact concept they support
- avoid overcrowding the page when several sources support one idea

Game-loop opportunity:

Opening a source-backed page can count as "concept encountered". Reading it can count as "topic read". Following the reference or video can count as "source explored".

### Hearth: Neural Map

Observed:

- brain map has strong visual impact
- colorful skill regions
- live stats area at top
- "Neural Map" language supports the neurological learning concept
- skill regions include ear training, technique, rhythm, theory, improvisation, chords, song learning, performance, mastery

Preserve:

- Hearth as brain/body/progress reflection chamber
- skill-region metaphor
- colored neural pathways
- progress stats

Improve:

- make region clicks explain what changed in the learner
- connect stats to actual accomplishments
- avoid visual overcrowding on smaller screens
- make Hearth feel like memory and guidance, not only a graphic

Game-loop opportunity:

Hearth should summarize "what changed this week", "what needs review", and "where to go next".

### Play / World Map

Observed:

- world map of guitar traditions
- glowing regions
- guide text: "Play is a map, not a menu"
- region selection prompt at bottom

Preserve:

- world/traditions exploration
- listening before lesson blocks
- place-based learning

Improve:

- clarify whether this is a core node or optional pathway
- connect each region to songs, artists, techniques, scales, and listening tasks
- make region visits count as listening/source accomplishments

Game-loop opportunity:

World regions can become optional "listening quests" or "tradition discoveries" under Knowing, Create, or Mastery.

### Create: Cauldron

Observed:

- cauldron scene is visually strong
- guide voice is good: do not judge the spark too early
- ingredient buttons are clear
- seed title and note area create a project/workbench feel

Preserve:

- cauldron image
- ingredient buttons
- prompt brewing
- song seed workspace
- guide tone

Improve:

- reconcile ingredient taxonomy
- make selected ingredients more visually satisfying
- show prompt history
- make "Save Seed" feel like earning a creative artifact
- connect completed prompts to Hearth/Mastery progress

Game-loop opportunity:

Completing a prompt should earn "prompt completed" and saving notes should earn "creative seed saved".

### Foundation: Pyramid

Observed:

- pyramid visual is strong and memorable
- progress shows `1/7` and percentage
- "Start Lesson 1" is clear
- character guide appears above the blocks
- block titles communicate a journey from How to Learn to Guitar Conversations

Preserve:

- pyramid as threshold
- seven visible blocks
- character guide
- progress bar/count

Improve:

- connect the 7 blocks to the expanded 20 lesson units
- make the first quest explicit: "Complete the threshold"
- show what completing Foundation unlocks
- keep all text legible on small screens

Game-loop opportunity:

Each block can light up as a milestone. Completing Foundation should feel like unlocking the first true path.

### Practice: Candle Room

Observed:

- candle is beautiful and calm
- room communicates one focused ritual
- guide line says choose one thing, light the candle, practise, then write what happened
- duration line shows `All · 20 minutes`

Preserve:

- candle metaphor
- calm room
- intention -> practice -> reflection concept

Improve:

- surface the actual daily card/focus sooner
- make the session flow visible: intention, body scan, warm-up, drill, music, reflection
- show what progress will be saved
- make reflection feel central, not afterthought

Game-loop opportunity:

Every completed practice session should feed Hearth and unlock body/reflection memory.

### Doing: Fretboard Grid

Observed:

- fretboard grid is strong and immediately guitar-specific
- filters and stats are visible
- 8 levels are clear across the top
- drill dots/cards sit like fretboard positions
- mastered/touched/drills counters already support game feeling

Preserve:

- fretboard as map
- 6 strings by 8 levels
- drill states
- level filters
- genre filters
- counters

Improve:

- make pass condition visible before opening a drill
- connect drills to Practice sessions
- clarify what touched/mastered means
- make next recommended drill obvious
- improve mobile scrolling and readability

Game-loop opportunity:

Drill states should move through seen, tried, clean once, comfortable, mastered.

## Design Principle

Each room should answer three questions quickly:

1. Where am I?
2. What can I do here?
3. What counts as progress?

## Recommendation

Preserve the room identities.

Improve the quest layer.

The next design pass should add a visible current quest/accomplishment language to every node without making the app feel like a generic gamified dashboard.

## Related Files

- `database-blueprint/docs/game-loop-progression-model-v1.md`
- `database-blueprint/docs/node-interior-architecture-v1.md`
- `database-blueprint/docs/prototype-artifact-policy.md`
