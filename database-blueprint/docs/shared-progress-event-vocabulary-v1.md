# Shared Progress Event Vocabulary V1

Date: 2026-07-18

## Purpose

Progress events are the messages nodes use to say what happened for a learner.

They allow Journey, Practice, Hearth, progress screens, and future backend
services to understand activity without reaching into each node's private UI
state.

Plain example:

`Jen practised the A minor pentatonic drill for five minutes and marked it clean once.`

The event records that fact once. Different parts of the simulator may then use
it to update a ring, recommend repetition, prepare a lesson, or support a
reflection.

## Core Rules

1. Events describe something that happened. They do not command another node.
2. Every learner-owned event has a `learner_id`.
3. Shared content uses stable IDs such as lesson, drill, activity, source, or
   project IDs.
4. An event is append-only evidence. A later event may update the learner's
   current summary without deleting the history.
5. Events record meaningful learning behaviour, not every hover or decorative
   click.
6. A percentage is calculated from evidence. It is not itself the evidence.
7. Free text belongs in `note`; structured values belong in `data`.
8. Node code should append an event through the shared store rather than write
   directly into another node's state.

## Current Prototype Envelope

The current `HearthProgressEvents` adapter already stores:

```text
id
version
simulator_id
learner_id
event_type
node_id
journey_level_id
category_id
lesson_id
drill_id
source_id
duration_minutes
rating
note
data
created_at
```

This is a useful prototype envelope and should remain backward compatible.

## Recommended Canonical Envelope

The backend-ready form should add a small number of fields without turning the
event into a giant universal object:

```text
id                    unique event ID
version               event schema version
simulator_id          hearth-guitar
learner_id            owner of the evidence
event_type            stable past-tense event name
node_id               node that owned the action
journey_level_id      optional Journey context
category_id           optional skill/content category
lesson_id             optional lesson context
activity_id           optional general activity ID
drill_id              optional Do/Practice drill ID
source_id             optional book, video, artist, or source-note ID
project_id            optional Create project/seed ID
recording_id          optional recording reference
attempt_id            groups events from one attempt or session
duration_minutes      optional measured or confirmed duration
rating                 optional normalized learner/teacher rating
note                   optional learner or teacher text
data                   event-specific structured evidence
occurred_at            when the learning action happened
recorded_at            when the simulator saved it
```

`occurred_at` and `recorded_at` may be identical in the prototype. Keeping both
allows an offline lesson note to be entered later without pretending it
happened at entry time.

## Event Naming Rule

Use lower-case snake case and a completed-action phrase:

`subject_action_past_tense`

Good:

- `lesson_completed`
- `drill_feedback_recorded`
- `practice_session_completed`
- `create_seed_saved`

Avoid:

- `completeLesson`
- `user_did_thing`
- `progress`
- `button_clicked`
- titles containing the learner name

The learner belongs in `learner_id`, not the event type.

## Evidence Strength

Not all events prove the same amount of learning.

### Contact

The learner encountered something.

Examples:

- node visited
- source opened
- concept read
- drill seen

### Attempt

The learner tried or repeated an action.

Examples:

- drill practised
- study response submitted
- practice session completed
- creative seed started

### Demonstration

There is evidence of a usable result.

Examples:

- drill clean once
- rhythm held for four bars
- quiz or proof passed
- song section performed
- recording reviewed

### Application

The skill was used in music or another context.

Examples:

- pentatonic roots used in a phrase
- chord change used in a song
- rhythm used in a jam
- concept used in Create

### Consolidation

Evidence appears again across time or contexts.

Examples:

- drill comfortable after repeated sessions
- skill used in more than one song
- concept recalled after a delay
- learner and teacher evidence agree across lessons

Journey unlocks and external benchmark comparisons should normally rely on
Demonstration, Application, or Consolidation evidence, not Contact alone.

## Current Event Types Found In The Prototype

These names already exist and must not be renamed casually:

| Event type | Owner | Evidence meaning | Current status |
| --- | --- | --- | --- |
| `lesson_completed` | Journey | Guided lesson finished | Active |
| `teacher_lesson_note` | Journey | Teacher observation saved | Active |
| `practice_session_completed` | Practice | Timed or planned session finished | Active in several paths |
| `concept_read` | Know / Study legacy | Concept opened or read | Active, weak evidence |
| `study_door_visited` | Study | Chamber route entered | Active, Contact only |
| `study_door_evidence_recorded` | Study | Door-specific proof saved | Active |
| `play_activity_completed` | Play | Musical participation route completed | Active |
| `create_handoff_opened` | Create | Structured idea arrived from another node | Active |
| `create_seed_started` | Create | New creative work began | Active |
| `create_seed_mutated` | Create | Existing seed was deliberately changed | Active |
| `create_seed_saved` | Create | Creative seed was saved | Active |
| `creation_saved` | Create legacy | Older creation record saved | Compatibility event |

## Canonical Event Families

Only implement an event when a real user path needs it.

### App And Journey

- `learner_profile_selected`
- `node_visited`
- `journey_route_started`
- `lesson_started`
- `lesson_block_completed`
- `lesson_completed`
- `lesson_reflection_recorded`
- `teacher_lesson_note`
- `recommendation_accepted`
- `recommendation_deferred`

### Do

- `drill_opened`
- `drill_practised`
- `drill_feedback_recorded`
- `drill_tempo_recorded`
- `drill_recording_attached`
- `drill_applied_musically`

The feedback event should carry a stable state such as `seen`, `practiced`,
`clean`, `comfortable`, or `mastered` in `data.state`.

### Know

- `source_opened`
- `concept_read`
- `concept_saved`
- `term_lookup_completed`
- `source_note_discovered`

Opening or reading content is Contact evidence, not proof of understanding.

### Practice

- `practice_session_planned`
- `practice_session_started`
- `practice_session_completed`
- `practice_reflection_recorded`
- `practice_recording_attached`
- `practice_focus_repeated`

### Study

- `study_door_visited`
- `study_response_submitted`
- `study_door_evidence_recorded`
- `concept_confidence_recorded`
- `misunderstood_word_resolved`
- `study_review_completed`

### Hearth

- `body_check_recorded`
- `tension_observation_recorded`
- `attention_observation_recorded`
- `learning_reflection_recorded`
- `confidence_observation_recorded`
- `inner_system_experiment_completed`

These events record observations and experiences. They must not claim that a
brain region or body system changed because an interface was used.

### Play

- `play_activity_started`
- `play_step_completed`
- `play_activity_completed`
- `musical_role_tried`
- `groove_held`
- `call_response_completed`
- `musical_choice_saved`
- `play_recording_attached`

### Create

- `create_handoff_opened`
- `create_seed_started`
- `create_seed_mutated`
- `create_seed_saved`
- `create_recording_attached`
- `create_seed_returned_to`
- `create_project_shared`

### Mastery

- `mastery_encounter_started`
- `mastery_excerpt_witnessed`
- `mastery_choice_noticed`
- `mastery_experiment_completed`
- `mastery_direction_saved`

Watching an excerpt is Contact. Noticing, trying, and transforming a choice are
stronger evidence.

## Example Events

### Do feedback

```json
{
  "event_type": "drill_feedback_recorded",
  "node_id": "doing",
  "learner_id": "jen-1",
  "journey_level_id": "level-1",
  "drill_id": "chrom-1",
  "duration_minutes": 5,
  "data": {
    "state": "clean",
    "tempo_bpm": 60,
    "room": "left-hand"
  }
}
```

### Musical application

```json
{
  "event_type": "drill_applied_musically",
  "node_id": "play",
  "learner_id": "jen-1",
  "journey_level_id": "level-1",
  "drill_id": "pent-roots-time",
  "activity_id": "am-musical-conversation",
  "note": "The A roots felt like home while jamming.",
  "data": {
    "role": "lead",
    "groove_id": "am-60",
    "evidence_strength": "application"
  }
}
```

## Current Gaps To Resolve Later

1. Do drill states currently update their own storage and progress rings but do
   not yet consistently append a shared event.
2. `concept_read` is shared by old Know and Study paths and does not distinguish
   reading from understanding.
3. Create has both `creation_saved` and `create_seed_saved`. The older name
   needs a compatibility policy before retirement.
4. Practice completion is emitted from multiple owners. One canonical session
   result should prevent accidental duplicate events.
5. Some Play code supplies `occurred_at`, while the current event adapter stores
   `created_at`. The future envelope should reconcile these deliberately.
6. The prototype does not yet expose event deduplication or `attempt_id`.
7. The event store keeps only the newest 1,000 local events. Backend migration
   must not treat that local limit as complete historical truth.

These are audit findings and migration tasks. Do not repair them inside active
node work unless the relevant owner and tests are ready.

## Progress Calculation Rule

Views may derive summaries from events, for example:

- latest drill state;
- total confirmed practice minutes;
- number of separate practice days;
- concepts needing review;
- musical applications completed;
- recordings attached;
- current Journey evidence;
- next helpful recommendation.

The summary can be rebuilt. The event history is the evidence.

## Backend Handover Rule

Martin or another backend developer should be able to map this envelope to one
append-only progress table plus event-specific JSON data. Stable event names,
learner IDs, content IDs, timestamps, and attempt grouping are the important
contract. The frontend remains responsible for presenting that evidence in the
language of each node.

