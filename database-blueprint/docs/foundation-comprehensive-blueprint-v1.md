# Foundation Comprehensive Blueprint V1

## Purpose

Foundation is not just the beginner-guitar node.

Foundation is the threshold of the simulator. It teaches the learner how to learn here, how the world is organised, why music can be approached as a language, and how the first physical contact with the guitar should feel.

The prototype Foundation pyramid is worth preserving as a visual metaphor, but the rebuild should make the underlying content more complete, more source-traceable, and more useful across the rest of the app.

## Recommendation

Keep the 7-block pyramid as the scene.

Behind each block, store smaller lesson units in the database. A block can contain more than one lesson. This lets the first experience stay beautiful and simple while the knowledge base becomes richer and easier to expand.

Use this default interior pattern:

`Understand -> Experience -> Apply -> Own`

Every Foundation unit should include:

- a clear idea
- a physical or visual counterpart
- one tiny action
- one pass/own condition
- visible source notes
- a recovery path for confusion

Foundation should use the mapped "learning how to learn" images for the three barriers:

- lack of mass
- misunderstood word
- skipped gradient

These images should not be treated as random illustrations. They are teaching objects that help make abstract learning problems visible.

## Relationship To Journey

Foundation is not Level 1.

Foundation is the pre-Journey threshold.

Its job is to help the learner enter the simulator, understand the learning method, meet the guide, understand the nodes, and make first contact with the guitar.

Journey Level 1 should begin after this threshold. It can assume the learner has already met the world and is ready for structured training.

This preserves the QJam-inspired level path without forcing all onboarding into Level 1.

## What To Preserve From The Prototype

- the rainbow pyramid
- the character guide
- the TeachingEngine step types
- the gradient failsafe
- the learning-how-to-learn visuals
- the music-as-language framing
- the first-sounds and E major action moments
- the block completion sense of progress

## What To Improve

### 1. Foundation Must Orient The Whole Simulator

The learner should leave Foundation knowing what each node is for.

Recommended core 8 nodes:

- Foundation: how to learn here and first contact
- Doing: physical drills and control
- Knowing: reference library and source-backed concepts
- Practice: focused sessions and repetition
- Study: terms, theory, reading, relationships, quizzes
- Create: creative constraints and composition
- Hearth: learning science, reflection, body, mind, meaning
- Mastery: artistry, examples, long-range inspiration

Prototype note:

The prototype currently has a Play node. The world-map idea is valuable, but I do not recommend making it one of the core 8 unless Ayla re-chooses it. It can become a World/Traditions pathway inside Knowing, Create, or Mastery.

### 2. Foundation Must Explain The Learning Method

The learner should meet the rules of the world early:

- misunderstood words matter
- theory needs mass
- gradients must be small enough
- "Need More Work" is not failure
- practice means attention, not brute force
- the body is part of the learning system

### 3. Foundation Must Make Music Feel Like Language

Use the language ladder consistently:

- vocabulary: notes, chords, gestures, sounds
- grammar: rhythm, intervals, scales, harmony
- conversation: songs, call and response, improvisation
- poetry: personal voice, composition, mastery

The app should not ask for poetry before the learner can say hello.

### 4. Foundation Must Bridge Books And Experience

Source notes should appear subtly in Foundation lessons.

Examples:

- Jamie Andreas for attention, tension, correct practice
- Aaron Shearer for posture, tone production, rest/free stroke
- Marc Schonbrun for music-theory vocabulary
- Patel and Levitin for music, brain, language, emotion
- Ericsson for deliberate practice and feedback
- QJam and JustinGuitar for journey shape and beginner gradient

Do not overquote. Use short source notes and citations that support the lesson.

## Recommended 7 Pyramid Blocks

### Block 1: Enter The Hearth

Role:

Orient the learner to the simulator as a world, not a course list.

Core ideas:

- the 8 nodes
- why the map exists
- how progress is stored
- how the guide helps
- how source notes work

Own condition:

The learner can say what each node is for and choose where to go when they need help.

### Block 2: How Learning Works

Role:

Teach the learning rules before the learner blames themselves for being confused.

Core ideas:

- absence of mass
- too steep a gradient
- misunderstood word
- attention before speed
- body tension as information

Own condition:

The learner can identify whether a struggle is caused by a missing object, a too-large step, or an unclear word.

### Block 3: Music As Language

Role:

Make the whole curriculum feel coherent.

Core ideas:

- vocabulary, grammar, conversation, poetry
- listening before speaking
- repetition as fluency
- rhythm as speech
- melody as contour

Own condition:

The learner can place a musical task on the language ladder.

### Block 4: The Language Of Music

Role:

Introduce the smallest useful pieces of music.

Core ideas:

- 12 notes
- half steps and whole steps
- rhythm and pulse
- intervals
- root notes
- musical alphabet

Own condition:

The learner can explain why the guitar has repeating patterns and why some note gaps are smaller.

### Block 5: The Language Of Guitar

Role:

Turn the guitar into a readable map.

Core ideas:

- strings
- frets
- fret numbers
- string names
- octave at fret 12
- tab
- open strings

Own condition:

The learner can read a simple tab instruction and find open, fret 1, fret 2, and fret 12.

### Block 6: Speaking With The Instrument

Role:

Connect sound to the body.

Core ideas:

- posture
- breath
- shoulder and hand softness
- left hand changes pitch
- right hand creates sound
- rest stroke and free stroke
- clean note before fast note

Own condition:

The learner can make one clear sound, notice tension, and adjust without self-attack.

### Block 7: First Conversation

Role:

Let the learner make something that feels like music.

Core ideas:

- E major
- strumming all six strings
- simple rhythm
- open-to-fret movement
- first chord as a sentence
- next path into Doing, Practice, Study, and Create

Own condition:

The learner can play one clear E major attempt, describe what was hard, and choose the next helpful node.

## Recommended Foundation Lesson Units

The pyramid can stay as 7 blocks, but the database should store these lesson units underneath it.

1. Welcome To The Hearth
2. The 8 Nodes And How To Use Them
3. How Lessons Work: Understand, Experience, Apply, Own
4. The Three Learning Barriers
5. What To Do When You Get Stuck
6. Music As A Language
7. Vocabulary, Grammar, Conversation, Poetry
8. The 12 Notes
9. Pulse, Rhythm, And Counting
10. Strings, Frets, And Tab
11. Guitar Body And Posture
12. Body Scan Warm-Up
13. First Sounds: Rest Stroke And Free Stroke
14. Moving Between Notes: Open, Fret 2, Open
15. First Chord: E Major
16. How Practice Sessions Work
17. How Study And Source Notes Work
18. How Create Prompts Work
19. How Progress And Reflection Work
20. Own The Threshold: Choose The Next Path

## Foundation Interactions To Build

### Body Scan

Learner checks:

- shoulders
- jaw
- breath
- fretting hand
- picking hand

Advance only when all checks are complete.

### First Sounds

Show two buttons:

- Try Rest Stroke
- Try Free Stroke

The buttons should trigger different visual or audio feedback. If audio is not available yet, use a visual pulse and plain label explaining the difference.

### Moving Between Notes

Show tab for:

`open -> fret 2 -> open`

Add a Play button that triggers a moving visual indicator across the three notes.

### E Major

Show a chord diagram with numbered finger positions and a Strum All 6 button.

The learner should be guided to listen for buzzing, muted strings, and hand tension.

## Database Implications

Foundation should be represented as:

- one app node
- seven visual blocks
- twenty lesson units
- TeachingEngine-compatible lesson steps
- source notes linked to each unit
- optional action renderer keys for custom UI

Recommended action renderer keys:

- `foundation.body_scan`
- `foundation.first_sounds`
- `foundation.open_fret_open`
- `foundation.e_major_chord`
- `foundation.node_map`
- `foundation.stuck_recovery`

These keys let Martin keep the database clean while the frontend decides how to render the interaction.

## Source-Traceability Rule

Every Foundation lesson unit should have at least one source anchor or an explicit note that it is an original Hearth orientation unit.

Visible learner citation format:

`Source note: Jamie Andreas, Principles of Correct Practice for Guitar`

Internal source-note records should keep page numbers wherever available.

## What Not To Carry Forward Blindly

- do not keep duplicate node implementations
- do not let a scene-first file override node renderers
- do not keep Play as a core node just because the prototype has it
- do not force poetic level names if plain Level 1-8 is clearer
- do not let Knowing and Study duplicate each other without purpose
- do not make Foundation a pile of facts before the learner understands the world

## Open Questions For Ayla

These can wait until after the current content pass.

1. Should Play become a pathway under Mastery, Knowing, or Create?
2. Should Foundation be required before any other node unlocks?
3. Should each Foundation block have one long lesson or several short lessons?
4. Should Hearth reflections appear inside Foundation from the start, or only after the first guitar action?
5. Should the first visible pass condition be physical sound, conceptual understanding, or both?
