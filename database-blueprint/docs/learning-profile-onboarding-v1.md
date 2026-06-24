# Learning Profile Onboarding V1

## Purpose

The learning profile should help the simulator adapt to a real learner.

It should not feel like a diagnosis, a personality box, or a test someone can fail.

Plain meaning:

`How should the simulator help this person keep learning?`

## Recommendation

Add a light optional onboarding inside Foundation and Hearth:

- Foundation introduces the idea of learning how you learn.
- The learner answers a short profile enquiry.
- Hearth stores and displays the profile as editable learner preferences.
- Journey, Practice, Study, Doing, and TeachingEngine use the profile to choose better support.

This should be available to every learner, not only Ayla.

## Complexity

### Version 1: Simple

Good first build.

- 8 to 12 questions
- profile tags saved to the student profile
- a Hearth summary card
- guide character changes small bits of language
- stuck states offer better recovery options

### Version 2: Adaptive

Build after the main system is stable.

- recommended next tasks use profile tags
- reflection prompts adapt
- Practice suggests session shape
- Study chooses diagram-first, body-first, or source-first explanations

### Version 3: Deep Personalization

Not needed yet.

- automatic lesson path changes
- prediction of likely struggle points
- cross-student teaching comparison
- advanced analytics

## What To Store

Store this under `student_profiles`, either as a JSON field first or as related rows later.

Recommended fields:

- input preferences
- processing preferences
- output/practice preferences
- motivation hooks
- warning triggers
- recovery strategies
- teaching/mentor mode
- free-text learner notes

Avoid storing it only as one flat result like `visual learner`.

The useful data is not the label. The useful data is what the app should do differently.

## Profile Categories

### Input

How information lands.

Examples:

- hands-first
- spatial thinker
- structure-dependent
- context-driven

Design response:

- start with a physical action where possible
- show maps, diagrams, and layouts
- show the roadmap and current step
- explain why the exercise matters

### Processing

How the learner makes sense of things.

Examples:

- top-down processor
- bottom-up needs
- self-researcher
- experimental
- incubator
- pattern-noticer
- network thinker
- taxonomic mind
- structured freedom

Design response:

- show the big picture before details
- break the task into one small next step
- offer sources and deeper reading
- provide safe experiments
- allow revisit-later moments
- show where the pattern appears elsewhere
- link ideas across nodes
- organise concepts by family
- offer choice inside a clear frame

### Output

How the learner shows they know something.

Examples:

- exercise-runner
- perfectionist
- automaticity as benchmark
- transfer as benchmark

Design response:

- give clear practice cards
- use states like `clean once`, `comfortable`, and `mastered`
- do not turn perfection into punishment
- ask the learner to apply the idea in a new place

### Motivation

What keeps the learner moving.

Examples:

- purpose-activated
- progress-visible
- recording as fuel
- connection-finder
- growth-noticer
- joy-dependent

Design response:

- every task shows a reason
- progress is visible and specific
- recording is easy and prompted
- cross-node links are shown
- small improvements are named
- playful challenges are built in

### Warnings

Where the learner is likely to get stuck.

Examples:

- gradient need
- misunderstood-word sensitive
- ambiguity trigger
- boredom trigger
- passive processor
- under-records

Design response:

- offer a simpler version
- ask "Was there a word that went foggy?"
- always show the next action
- offer a harder variation before boredom sets in
- organise the next step for the learner
- make recording frictionless

### Teaching Mode

Some learners learn by teaching.

Examples:

- teacher-learner
- mentor-responsive
- necessity-learner

Design response:

- add "teach it back" reflection prompts
- support private teacher notes
- connect Ayla's learning path with Jen's lesson prep
- show what the teacher needs to study before the next lesson

## How It Should Appear In The App

### First Start

Do not block the learner with a long questionnaire.

Suggested invitation:

`Before we begin, I can learn how to guide you. This takes a few minutes and you can change it later.`

Options:

- Build my profile
- Skip for now

### Foundation

The profile belongs naturally inside Foundation because Foundation teaches:

- how to learn
- what to do when confused
- music as language
- how the simulator works

Recommended Foundation placement:

After the learner meets the three barriers to learning, add a short action step:

`Find Your Learning Shape`

### Hearth

Hearth should become the home of the profile.

It should show:

- how I take things in
- what helps me process
- what motivates me
- what to watch for
- what the app should do when I struggle

The learner should be able to edit this any time.

### TeachingEngine

The TeachingEngine can use profile tags without changing its core structure.

Examples:

- wrong answer + `misunderstood_word_sensitive` = offer term check
- stuck + `gradient_need` = offer smaller step
- new theory + `hands_first` = add a physical action
- new map + `spatial_thinker` = show diagram first
- repeated clean attempt + `perfectionist` = remind "clean once counts"

### Journey

Journey should use the profile when preparing lessons.

Examples:

- show the exact next step for ambiguity-sensitive learners
- add source links for self-researchers
- add "teach this to someone" prompts for teacher-learners
- add recording prompts for learners who need playback as fuel

### Practice

Practice should use the profile to shape sessions.

Examples:

- hands-first learners get warm-up-first sessions
- perfectionists get clear stop conditions
- boredom-sensitive learners get variation prompts
- progress-visible learners get before/after comparisons

## Important Boundary

Do not overbuild this before the core database is stable.

Build first:

- content
- source notes
- lessons
- student profiles
- progress

Then make the profile influence more of the experience.

## What To Tell Martin

The backend should leave room for learner preferences on `student_profiles`.

This can begin as JSON and later become normalized tables if needed.

Do not migrate the exact old questionnaire blindly. Preserve the insight and redesign it as a short, editable learning preference system.

