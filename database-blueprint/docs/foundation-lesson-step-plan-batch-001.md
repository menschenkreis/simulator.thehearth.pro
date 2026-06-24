# Foundation Lesson Step Plan Batch 001

## Purpose

This expands the first five Foundation units into TeachingEngine-ready step plans.

These are not final dialogue scripts yet.

They define:

- lesson unit purpose
- step sequence
- TeachingEngine step type
- source anchors
- interaction/action keys
- own/pass condition
- learner-facing citation note

## Batch Scope

1. FND-001: Welcome To The Hearth
2. FND-002: The 8 Nodes And How To Use Them
3. FND-003: How Lessons Work
4. FND-004: The Three Learning Barriers
5. FND-005: What To Do When You Get Stuck

## Design Notes

These first five units are orientation before guitar technique.

They should make the learner feel:

- I am entering a world.
- I am not expected to already know how to learn this.
- Confusion has causes.
- There is a path.
- The app will help me recover when I get stuck.

## Unit Plans

### FND-001: Welcome To The Hearth

Purpose:

Introduce the simulator as a symbolic learning world, not a lesson playlist.

Step sequence:

1. `speak`: Welcome the learner into The Hearth.
2. `cards`: Show the difference between a course list, a practice tool, and a learning world.
3. `action`: Map preview using `foundation.node_map_preview`.
4. `ask`: Ask why the simulator uses a map.
5. `end`: Learner owns the idea: this is a world that remembers the journey.

Own condition:

Learner can say why the simulator is a map and not a playlist.

Source note:

Original Hearth orientation.

### FND-002: The 8 Nodes And How To Use Them

Purpose:

Explain the role of each core node.

Step sequence:

1. `speak`: The guide explains that different kinds of learning need different rooms.
2. `cards`: Four node cards: Foundation, Doing, Knowing, Practice.
3. `cards`: Four node cards: Study, Create, Hearth, Mastery.
4. `action`: Node chooser using `foundation.node_need_matcher`.
5. `ask`: Ask which node helps when the learner needs a source/reference.
6. `end`: Learner owns the basic purpose of the 8 nodes.

Own condition:

Learner can choose the right node for a learning need.

Source note:

Original Hearth orientation.

### FND-003: How Lessons Work

Purpose:

Teach the default learning staircase: Understand -> Experience -> Apply -> Own.

Step sequence:

1. `speak`: Explain that the app teaches in small steps on purpose.
2. `cards`: Define Understand, Experience, Apply, Own.
3. `action`: Mini staircase interaction using `foundation.lesson_staircase`.
4. `ask`: Ask which step means physically trying or noticing the idea.
5. `end`: Learner owns the lesson rhythm.

Own condition:

Learner can identify the four lesson moves.

Source note:

Original Hearth design realization.

### FND-004: The Three Learning Barriers

Purpose:

Teach the learner that confusion has diagnosable causes.

Step sequence:

1. `speak`: Introduce the idea that getting stuck does not mean the learner is broken.
2. `cards`: Barrier 1: absence of mass.
3. `cards`: Barrier 2: too steep a gradient.
4. `cards`: Barrier 3: misunderstood word.
5. `action`: Scenario sorting using `foundation.learning_barrier_sort`.
6. `ask`: Ask what to check first when a word is unclear.
7. `end`: Learner owns the three-barrier diagnostic.

Own condition:

Learner can identify mass, gradient, or misunderstood word as different causes of struggle.

Source note:

Source note: Hubbard study-tech concept, adapted as Hearth learning-design language.

### FND-005: What To Do When You Get Stuck

Purpose:

Give the learner recovery moves before frustration becomes withdrawal.

Step sequence:

1. `speak`: Normalize stuckness as information.
2. `cards`: Recovery move: find the unclear word.
3. `cards`: Recovery move: make it physical or visible.
4. `cards`: Recovery move: take a smaller step.
5. `action`: Stuck recovery chooser using `foundation.stuck_recovery`.
6. `ask`: Ask which recovery move fits a too-fast lesson.
7. `end`: Learner owns a recovery path.

Own condition:

Learner can choose a recovery move: word check, physical example, or smaller step.

Source note:

Source notes: Jamie Andreas for attention/body-aware practice; Ericsson for feedback and deliberate practice. Page-specific notes still needed.

## Batch 001 Recommended Action Renderer Keys

- `foundation.node_map_preview`
- `foundation.node_need_matcher`
- `foundation.lesson_staircase`
- `foundation.learning_barrier_sort`
- `foundation.stuck_recovery`

## Batch 001 Ask Moments

These should use the TeachingEngine ask structure:

- 2 to 4 choices
- exactly one correct answer
- correct response is an object with `text`, `char`, `charLabel`
- wrong answers use `reexplain`

## Batch 001 Source Work Still Needed

The first three units are mainly original Hearth orientation.

FND-004 and FND-005 need better source-note backing:

- Jamie Andreas: attention, tension, correct practice, body awareness
- Ericsson: deliberate practice, feedback, expert learning environments
- optional: source note for Hubbard three-barrier concept if Ayla wants it explicitly cited

## Output Files

Structured CSV/JSON versions:

- `database-blueprint/source/foundation_lesson_step_plan_batch_001.csv`
- `database-blueprint/seeds/foundation_lesson_step_plan_batch_001.json`
