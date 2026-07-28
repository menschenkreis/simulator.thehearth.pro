# Core Simulator Engine V1

This document compares The Hearth guitar simulator and Zamkee FCP1 so we can identify the reusable simulator engine underneath both.

The goal is not to merge the apps yet. The goal is to create shared language, shared contracts, and a small safe path toward reusable code.

## Method

For every phase of this work:

1. Analyse the request.
2. Choose the most credit-efficient route that still gives quality results.
3. Roadmap the next small steps.
4. Execute one bite at a time.
5. Check that the result still serves the original goal.

## Plain-Language Summary

The Hearth is a world-based guitar learning simulator.

It asks:

> Where should I go, what should I practise, what did I notice, and what is my next small musical step?

Zamkee is a structured medical exam-practice simulator.

It asks:

> What should I test, what did I miss, what weak area did that reveal, and what should I repair next?

Those are different products, but they share the same deeper engine:

> A learner moves through a mapped world, does structured activities, receives feedback, stores evidence, and gets guided toward the next useful action.

## Repo Comparison

| Area | The Hearth | Zamkee FCP1 | Shared Engine Lesson |
|---|---|---|---|
| Product type | Guitar learning world | Medical exam-prep simulator | Both are guided learning simulators. |
| Main metaphor | Map, nodes, guitar Journey, temples, cauldron, phoenix | Medical atlas, systems, programme, simulator | Core should support app-specific metaphors without hardcoding them. |
| App structure | Legacy browser prototype with `simulator.html`, `assets/js/`, `core/`, `adapters/` | Next.js app with `apps/web`, content folders, Prisma, Supabase support | Hearth needs cleaner app boundaries; Zamkee already has stronger structural boundaries. |
| Core loop | Map -> lesson/practice/create -> reflection -> next step | Attempt -> score -> weak area -> repair queue -> targeted review | Core must support both reflection-led and score-led progress. |
| Content model | Nodes, Journey levels, lessons, drills, books, creative prompts | Systems, domains, topics, notes, MCQs, objectives | Use a generic content graph with domain-specific labels. |
| Lesson/session model | TeachingEngine steps, Journey blocks, practice sessions | MCQ attempts, practice modes, full mocks, repair sets | Use a shared Activity/Session/Result contract. |
| Progress | localStorage plus emerging clean progress core | localStorage plus database attempt/progress support | Shared progress contracts should bridge local first, backend later. |
| Feedback | guide voice, reflections, ratings, wrong-answer re-explanation | instant explanations, after-submit exam review, weak-node analytics | Feedback mode should be configurable per activity. |
| Guide character | Guitar guide, lesson companion, contextual speech | Regi guide/coach, medical helper | Build a generic mentor prompt model with app-specific character identity. |
| Backend readiness | Early core and adapters; no real production DB connection yet | Prisma/Postgres/Supabase direction already present | Zamkee is a strong reference for backend-ready persistence. |
| Main risk | Monolith/global override/stale localStorage patterns | Medical-specific assumptions inside generic-looking code | Shared core must stay domain-neutral. |

## Shared Vocabulary

These terms should become the bridge between projects:

- **Simulator**: the whole learning product.
- **Learner**: the person using it.
- **World**: the main navigation space.
- **Node**: a meaningful place, system, chamber, or topic area.
- **Journey**: the structured path through the simulator.
- **Level**: a larger stage of progression.
- **Activity**: anything the learner does.
- **Session**: one run of an activity.
- **Step**: one moment inside a session.
- **Prompt**: a question, reflection, task, or choice.
- **Result**: what happened in the session.
- **Progress**: what the learner has started, practised, completed, missed, or mastered.
- **Repair Queue**: what needs attention next.
- **Resource**: book, PDF, video, source, reference, or explanation.
- **Guide**: contextual helper voice.

## Activity Types

The shared engine should not assume every activity is a test.

It should support:

- lesson
- drill
- timed practice
- quiz
- exam attempt
- repair/review set
- reflection
- creative task
- resource study
- performance/application task

This is important because Hearth should not become an exam app, and Zamkee should not lose its exam discipline.

## Domain-Specific Layers

The shared core should not know guitar details or medical details.

### Guitar Layer

Keep these in Hearth-specific code/data:

- fretboard, strings, frets
- chords, scales, rhythm, groove, technique
- Practice temple, Create cauldron, Mastery phoenix, map-node art
- Jen/Ayla lesson companion content
- QJam-inspired journey content

### Medical Layer

Keep these in Zamkee-specific code/data:

- FCP1 systems, objectives, body systems, functional domains
- MCQ bank and official blueprint
- exam timing and mock rules
- medical explanations and source traceability
- Regi’s medical identity and atlas visual language

## Candidate Core Contracts

### 1. Simulator

```text
id
title
domain
worlds
defaultJourneyId
activeLearnerId
settings
```

### 2. Node

```text
id
simulatorId
label
kind
description
parentId
levelIds
activityIds
resourceIds
visual
```

### 3. Activity

```text
id
simulatorId
nodeId
type
title
summary
estimatedMinutes
levelId
categoryTags
steps
feedbackMode
resultMode
sourceRefs
```

### 4. Session

```text
id
activityId
learnerId
startedAt
completedAt
status
answers
reflections
score
flags
result
```

### 5. Progress

```text
learnerId
simulatorId
nodeProgress
activityProgress
categoryProgress
weakAreas
reviewDue
lastUpdated
```

### 6. Guide Prompt

```text
id
simulatorId
characterId
context
learnerState
message
tone
nextAction
```

## First Shared Slice

The smallest useful proof of concept is:

> A shared Progress + Session Result model that can describe both a Hearth lesson and a Zamkee MCQ attempt.

Why this is the right first slice:

- It is useful to both projects immediately.
- It does not require redesigning either UI.
- It supports the future backend.
- Hearth already has `core/learner-progress.js`.
- Zamkee already has attempt results, coverage statuses, weak nodes, and Prisma models.

## Progress State Alignment

| Meaning | Hearth Current Shape | Zamkee Current Shape | Shared Core Term |
|---|---|---|---|
| Not started | `not_started` | `not-started` | `not_started` |
| In progress | `in_progress` | `in-progress` | `in_progress` |
| Completed once | `completed`, `covered` style ideas | `covered` | `completed` |
| Needs review | lesson wrong answers, practice notes, Journey gaps | `review-due`, weak nodes | `review_due` |
| Mastered | Doing/Practice mastery states | `mastered` | `mastered` |
| Weak area | informal notes/ratings | weak systems/topics/nodes from attempts | `weak_area` |

## Proposed Near-Term Roadmap

### Step 1: Finish Inventory

Create a table of:

- main files
- what each owns
- whether it is core, adapter, UI, content, or storage
- whether it is reusable or domain-specific

### Step 2: Draft Shared Contracts

Write simple schema examples for:

- Activity
- Session
- Result
- Progress
- Guide Prompt
- Resource

### Step 3: Compare Storage

Compare:

- Hearth localStorage keys and clean progress core
- Zamkee localStorage keys, attempt storage, coverage model, Prisma schema

Output: a backend-ready but frontend-friendly storage plan.

### Step 4: Choose One Implementation Experiment

Possible first experiment:

- add a generic `core/session-result` shape in Hearth
- map one Hearth lesson completion into it
- map one Zamkee MCQ attempt into the same shape in documentation first

No app merge needed.

### Step 5: Only Then Refactor

After the contracts are clear, refactor one small piece in each app.

Do not start by moving folders around.

## What To Avoid

- Do not merge the repos now.
- Do not rewrite both apps into one framework now.
- Do not force Hearth to become an exam simulator.
- Do not force Zamkee to become a mystical map simulator.
- Do not build a huge backend abstraction before the actual activity/progress contracts are clear.
- Do not generate new visual assets for this phase.

## Immediate Next Action

Create the inventory table and storage comparison.

That will tell us exactly where the first reusable engine module should live and what Martin/backend would need to support later.
