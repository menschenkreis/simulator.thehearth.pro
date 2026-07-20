# Level 1 Content Gap Pass Roadmap V1

Date: 2026-07-18
Status: In progress; first playable song-lab slice verified 2026-07-20

## Implementation Checkpoint: 2026-07-20

The first four gaps now meet in one playable prototype activity:

- `core/level-one-song-thread.js` defines the original, rights-safe eight-bar
  mini-piece `A Minor Homecoming` with stable IDs, chord road, tempo range,
  rhythm role, lead role, easier version, and evidence targets.
- Journey sends Jen's Right Hand step to the existing continuous-strum drill
  and sends the Conversation step to the exact song lab.
- Do owns the song lab and presents listening-role comparisons, an eight-bar
  chord road, a quarter-note strum grid, and a short playable A minor
  pentatonic TAB answer.
- Opening the activity records only `Seen`; it does not award song, listening,
  role, or creative mastery from a click.
- The song lab returns to the correct Journey context and has no browser
  console errors in the verified desktop route.

This checkpoint substantially covers the first implementation slice for:

1. song pathway;
2. stronger right-hand work;
3. listening before explanation;
4. TAB and diagram contact.

It does **not** complete the full pass. The next connected batch must carry the
same song thread through learner-scoped Practice history, a saved Create
variation, and a genuine sourced Mastery performance encounter. Those three
gaps remain open below.

### Connected-node checkpoint: 2026-07-20

The remaining three gaps now have a first coherent implementation:

- Practice reads the shared song record and offers three 20-minute returns:
  separate the roles, join the eight bars, then swap and keep one choice.
- Unfinished guided Practice sessions use learner-scoped storage. The former
  global value remains readable for its original learner and is not deleted.
- Practice opens the exact Song Lab and returns to the same guided session.
- One session records an attempt. Only three distinct calendar days can
  support the `repeat a real weakness over time` evidence threshold.
- Create receives a ready-to-shape `A Minor Homecoming variation` seed with
  source, learner, Level 1, and capability context. Saving it records the
  learner's creative attempt without claiming mastery.
- Mastery now uses a genuine external performance encounter: B.B. King,
  `The Thrill Is Gone (Live at Montreux 1993)`. The learner notices one choice,
  tries a small version inside `A Minor Homecoming`, and can carry it to
  Practice or Create.
- The Mastery encounter has an internal no-media fallback and a short saved
  review reflection.

Automated behavior, loaded-script syntax, and local-reference checks cover the
new contracts. The pass remains **in progress** until the Practice, Create, and
Mastery click paths receive a live browser check and a learner produces real
evidence on separate days. Tests must not fabricate that learner history.

## Purpose

The whole-simulator audit does not replace this work. It should verify the
connections this work needs and protect it from being implemented as seven
isolated features.

This pass fills the most important missing evidence in the Hearth-owned Level
1 capability route:

1. song pathway;
2. listening activity;
3. TAB and diagram contact;
4. stronger right-hand work;
5. practice-history evidence;
6. saved creation;
7. relevant Mastery encounter.

The seven parts should form one musical learning thread.

## Anchor Use Case

Use the real Ayla/Jen need as the first vertical slice:

`Learn a song or small arrangement that uses A minor pentatonic with a rhythm
guitar role and a lead guitar role.`

The song is the container. The other activities help the learner enter,
practise, understand, vary, and remember it.

## Work Order

### 1. Define the song pathway

- Select one rights-aware beginner-appropriate song, licensed resource, or
  deliberately authored mini-piece.
- It must support a simple rhythm role and an A minor pentatonic lead role.
- Give the piece a stable activity/source ID.
- Record required chords, groove, tempo range, pentatonic region, easier
  version, and completion evidence.
- Do not copy copyrighted notation, recordings, or lyrics without permission.

Capability targets:

- `L1-HARM-02`
- `L1-MAP-02`
- `L1-PLAY-01`
- `L1-SONG-01`
- `L1-ROLE-01`

### 2. Add stronger right-hand work

- Choose one strum or picking pattern that belongs to the selected piece.
- Reuse or extend one stable Do drill rather than inventing a Journey-only
  duplicate.
- Provide a muted-string easier version and a chord/application version.
- Let Practice repeat the same drill and preserve tempo/feedback evidence.

Capability targets:

- `L1-TIME-01`
- `L1-TIME-02`
- `L1-HARM-02`

### 3. Add listening before explanation

- Let the learner hear or compare pulse, home/root, rhythm role, and lead role.
- Ask one plain question that changes the next action.
- Listening must lead to playing, not end as trivia.
- Record Contact or Attempt evidence honestly; listening alone is not mastery.

Capability targets:

- `L1-EAR-01`
- `L1-KNOW-01`
- `L1-STYLE-01`

### 4. Add TAB and diagram contact

- Use one chord diagram, one fretboard/root diagram, one short TAB fragment,
  and one simple rhythm grid where each serves the selected piece.
- Ask the learner to translate at least one representation into sound.
- Include a plain explanation and a smaller fallback.

Capability target:

- `L1-READ-01`

### 5. Carry practice evidence across days

- Create a 15- to 20-minute plan using the same song, right-hand pattern, and
  phrase.
- Record at least three sessions on separate days.
- Compare an early and later attempt through a note, rating, teacher
  observation, or recording reference.
- Do not use a guilt-based streak or award mastery from minutes alone.

Capability targets:

- `L1-PRACTICE-01`
- `L1-PREP-01`
- `L1-REFLECT-01`

### 6. Save one creative choice

- Ask the learner to vary one phrase, rhythm, answer, intro, or arrangement
  decision.
- Save a structured Create seed, note, TAB fragment, or recording reference.
- Preserve the source activity and learner ID so the idea can return later.

Capability target:

- `L1-CREATE-01`

### 7. Add a relevant Mastery encounter

- Choose a sourced artist/performance example that demonstrates a directly
  relevant pentatonic, groove, rhythm/lead, phrasing, or arrangement choice.
- Ask the learner to notice one choice, try a small version, and respond.
- Watching is Contact evidence. The experiment or musical use is stronger
  evidence.
- Provide a useful fallback when external media is unavailable.

Capability targets:

- `L1-STYLE-01`
- `L1-MAP-02`
- `L1-CREATE-01`

## Required Cross-Node Thread

The completed vertical slice should be traceable as:

`Journey -> Hearth/Practice tune-in -> Do right-hand drill -> Study/Know
representation -> Practice across days -> Play song and exchange roles ->
Create variation -> Mastery encounter -> Hearth/Journey reflection`

Journey coordinates the thread. It must not duplicate the node-owned tools.

## Evidence And Event Expectations

Use stable learner, level, lesson, activity, drill, source, project, and
recording IDs where relevant.

Expected event families include:

- `drill_feedback_recorded`
- `practice_session_completed`
- `practice_reflection_recorded`
- `study_door_evidence_recorded`
- `play_activity_completed`
- `musical_role_tried`
- `create_seed_saved`
- `mastery_choice_noticed`
- `mastery_experiment_completed`
- `lesson_reflection_recorded`

Use current canonical event names when they already exist. Add a new event only
when a real path requires it.

## Finish Line

This pass is complete when one learner can:

- understand the musical goal in plain language;
- hear the pulse/home and the two musical roles;
- read the minimum diagrams/TAB needed to begin;
- practise a relevant right-hand pattern;
- repeat the work over at least three days;
- perform one complete guided song or mini-piece;
- try both rhythm and lead roles;
- save one personal variation;
- notice and try one choice from a Mastery example;
- record what worked, what needs repetition, and the next safe step;
- reopen the simulator and find all evidence under the correct learner.

## UI And Architecture Guardrails

- Do not redesign Journey before the content and evidence thread is stable.
- Do not create duplicate drills, song records, or learner histories.
- Do not hide final activities in small static text boxes.
- Use existing node owners and shared progress events.
- Keep external media optional and provide fallbacks.
- Do not generate new images for the first implementation pass.
- Preserve scene-first node entrances and compact, familiar controls.

## Time And Credit

The original **45-75 minute, medium-credit estimate** applies to the initial
content/data gap pass: selecting the first thread, defining the records,
mapping capabilities, and preparing the first safe implementation batch.

Fully implementing, wiring, testing, and visually polishing all seven parts is
larger and should be split into verified batches. Do not promise that the
entire finished learner experience will be production-ready inside the initial
45-75 minute pass.
