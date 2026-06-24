# Content Model V1

## Purpose

This document explains what the main pieces of The Hearth database mean in plain language.

It is not a final schema lock. It is the shared vocabulary for Ayla, Martin, and future collaborators.

The goal is to make the database feel like a clean library, not a pile of tables.

## The Big Split

The system has two kinds of data.

### Shared Content

This is the material everyone can use:

- app nodes
- roadmap items
- lessons
- lesson steps
- books
- source notes
- resources
- drills
- creative prompts
- media assets

Shared content answers:

`What exists in the simulator?`

### Student Memory

This belongs to a person or learner profile:

- learning profile/preferences
- progress
- practice sessions
- lesson attempts
- reflections
- notes
- creative projects
- current position

Student memory answers:

`What happened for this learner?`

This split is important because The Hearth should eventually support multiple learners and future non-guitar simulators.

## Core Content Objects

### App Node

An app node is one of the major places in the simulator.

Current core 8:

- Foundation
- Doing
- Knowing
- Practice
- Study
- Create
- Hearth
- Mastery

Plain meaning:

`Where am I in the world?`

Example:

Foundation is the threshold. Doing is the fretboard drill space. Create is the cauldron.

### Optional Pathway

An optional pathway is useful content that does not need to be one of the core 8 nodes.

Example:

Play / World Traditions can be preserved as a pathway without replacing Hearth.

Plain meaning:

`A side road or themed route through the world.`

### Skill Node

A skill node is a musical ability or knowledge area.

Examples:

- Rhythm
- Chords
- Fretboard
- Technique
- Theory
- Ear Training
- Scales & Lead
- Songs
- Improvisation / Creation

Plain meaning:

`What kind of ability is growing?`

### Level

A level is the learner's position in the long journey.

Decision:

Use plain Level 1 through Level 8.

Plain meaning:

`How far along the path is this?`

The interface can still feel magical, but the stored level names should stay clear.

### Roadmap Item

A roadmap item is a learnable unit on the journey.

It may connect to:

- an app node
- a skill node
- a level
- source notes
- practice drills
- lessons
- resources

Plain meaning:

`One thing the learner should eventually learn or practise.`

Example:

`Open string names`, `First E major chord`, `12-note cycle`, `alternate picking`, `minor pentatonic shape`.

### Lesson

A lesson is a guided teaching sequence.

It belongs to a node and may support one or more roadmap items.

Plain meaning:

`A guided experience with the character/teacher.`

Example:

Lesson 1: Foundation.

### TeachingEngine Step

A step is one moment inside a lesson.

Known step types:

- speak
- ask
- cards
- action
- video
- end

Plain meaning:

`One beat in the guided lesson.`

Important:

The database should store the lesson step data. The frontend should render it.

### Action Renderer Key

An action renderer key tells the frontend which custom interaction to show.

Examples:

- `foundation.body_scan`
- `foundation.first_sounds`
- `foundation.open_fret_open`
- `foundation.e_major_chord`
- `create.cauldron_prompt_engine`
- `doing.fretboard_grid`

Plain meaning:

`The name of the interactive widget the frontend should use.`

The database should not store giant render functions.

## Source And Resource Objects

### Book Source

A book source is the intellectual identity of a book.

Example:

`Principles of Correct Practice for Guitar` by Jamie Andreas.

Plain meaning:

`What book is this?`

### Book File

A book file is one actual copy of a book.

Examples:

- local PDF
- hosted PDF
- Google Drive preview
- duplicate archive copy
- OCR text file

Plain meaning:

`Where is the file copy?`

This is separate from book source because one book may have multiple files.

### Book Section

A book section is a chapter, part, page range, or table-of-contents entry.

Plain meaning:

`Where inside the book is this?`

### Source Note

A source note is an extracted idea from a book, video, or other source.

It should include:

- source
- page or section if available
- summary
- concept tags
- node/level relevance
- citation text

Plain meaning:

`A traceable piece of knowledge we can build lessons from.`

Important:

Source notes should come before lesson drafts.

### Resource

A resource is an external item that supports learning.

Examples:

- YouTube video
- course
- website
- book
- PDF
- app
- tool

Plain meaning:

`Something outside the lesson that helps at this moment.`

Resources should be curated, not dumped.

### Media Asset

A media asset is an image, SVG, audio file, PDF, or other file used by the app.

Examples:

- cauldron SVG
- brain map SVG
- character faces
- character full-body guide images
- character symbol/emphasis images
- Foundation learning-barrier images
- node icons
- campfire audio

Plain meaning:

`A file the app uses.`

Important rebuild note:

Character images should be selected through asset keys or mood keys, not hardcoded lesson-by-lesson paths.

Example:

- `guide.face.thinking`
- `guide.full.encouraging`
- `foundation.learning_barrier.misunderstood_word`

## Practice Objects

### Practice Drill

A practice drill is something the learner physically repeats.

Plain meaning:

`A thing to practise with the body.`

Example:

Alternate picking at 60 BPM for 30 seconds.

### Practice Session

A practice session is an actual event where a learner practised.

It should know:

- who practised
- what they practised
- how long
- how it felt
- what improved
- what needs review

Plain meaning:

`A memory of practice that really happened.`

### Pass Condition

A pass condition is how the learner knows a unit is complete enough for now.

Plain meaning:

`What counts as ready to move on?`

Good:

`Can play E major once with all six strings attempted and identify which strings buzzed or muted.`

Weak:

`Understands E major.`

## Create Objects

### Creative Element

A creative element is what the learner is making with.

Current elements:

- lyrics
- melody
- riff
- rhythm
- story

Plain meaning:

`The material of the creative act.`

### Obstruction Modifier

An obstruction modifier is how the cauldron bends the task.

Current modifiers:

- emotion
- time
- constraint
- collaboration
- cover
- genre
- acoustic
- lyrical

Plain meaning:

`The pressure applied to the creative act.`

### Creative Prompt

A creative prompt is the dare/challenge the learner receives.

It should include:

- level
- ingredients/elements
- modifier ingredients if used
- constraint
- prompt
- payoff

Plain meaning:

`The creative challenge.`

### Creative Project

A creative project is something the learner saves from Create.

Plain meaning:

`A seed, lyric, riff, or song idea the learner wants to keep.`

## Student Memory Objects

### User

A user is the account owner.

Plain meaning:

`Who logs in?`

### Student Profile

A student profile is the learner identity inside the app.

One user may eventually have multiple profiles.

Plain meaning:

`Whose journey is this?`

Example:

Ayla, Jen, future student.

Student profiles should eventually include learning preferences.

Examples:

- how the learner takes information in
- what helps them process
- what motivates them
- what tends to make them stuck
- what recovery strategy the guide should offer first

The first backend version can store this as JSON. It can be normalized later if the product needs richer profile analytics.

See:

- `database-blueprint/docs/learning-profile-onboarding-v1.md`

### Progress Record

A progress record stores a learner's state against a content item.

Plain meaning:

`Where am I with this thing?`

Examples:

- seen
- practised
- clean once
- comfortable
- mastered
- read
- needs review

### Lesson Attempt

A lesson attempt records a learner going through a lesson.

Plain meaning:

`What happened when I tried this lesson?`

### Student Note

A student note is learner-written memory.

Plain meaning:

`What did I notice or want to remember?`

## Important Relationships

- App nodes contain roadmap items.
- Roadmap items can have lessons, drills, resources, and source notes.
- Lessons contain TeachingEngine steps.
- Action steps point to renderer keys.
- Book sources have book files and sections.
- Source notes connect books/resources to lessons and roadmap items.
- Practice sessions belong to student profiles.
- Progress records connect student profiles to content.
- Creative projects belong to student profiles.

## What This Protects

This model prevents:

- source notes being trapped in lesson text
- PDFs being confused with books
- UI render functions being stored as content
- student progress being mixed into shared content
- guitar-specific concepts being hardcoded into the reusable engine
- prototype artifacts becoming accidental final architecture

## One-Sentence Summary

The database should know what the learning world contains, where each idea came from, and what happened for each learner; the frontend should decide how that world appears on screen.
