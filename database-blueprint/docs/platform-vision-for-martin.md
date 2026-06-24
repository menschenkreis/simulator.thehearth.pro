# Platform Vision For Martin

## Core Direction

The Hearth Mastery guitar simulator is the first major implementation, but it should not be treated as the only possible product.

The deeper goal is a reusable simulator engine that can support:

- guitar learning
- other instruments
- medicine exam study
- other structured learning domains
- creative/philosophical study paths

The guitar app is the proof-of-concept and the first serious content world.

## Product Layers

The rebuild should separate these layers:

1. **Core Learning Engine**
2. **Domain Content**
3. **Student Progress**
4. **Presentation / Theme**

This matters because if guitar concepts are baked directly into the engine, the system will be hard to reuse for medicine, piano, vocals, language learning, or any other topic.

## Core Learning Engine

The reusable engine should understand:

- learning maps
- nodes
- levels
- disciplines / categories
- lessons
- lesson steps
- resources
- source notes
- practice/review sessions
- student progress
- reflections
- assessments

It should not assume:

- guitar strings
- frets
- chords
- scales
- tablature
- music-specific vocabulary

Those belong to the guitar domain layer.

## Guitar Domain Layer

The guitar simulator can define:

- Foundation
- Doing
- Knowing
- Practice
- Study
- Create
- Hearth
- Mastery
- QJam levels
- guitar disciplines
- drills
- books
- YouTube resources
- practice routines
- songbook

These are content/domain records, not hardcoded engine rules.

## Future Medicine Study Simulator Example

A medicine exam simulator could reuse the same engine with different content:

- nodes: Anatomy, Physiology, Pathology, Pharmacology, Clinical Reasoning, Exam Practice
- levels: Level 1-8 or exam-year stages
- disciplines: systems, conditions, mechanisms, diagnostics, treatments
- resources: textbooks, papers, question banks, guidelines
- lesson steps: speak, ask, cards, action, case simulation, review
- progress: weak topics, spaced repetition, confidence, exam readiness

This proves why the engine must stay domain-agnostic.

## Database Implication

Use generic names where possible:

- `learning_domains` or `projects`
- `app_nodes`
- `learning_disciplines`
- `levels`
- `resources`
- `source_notes`
- `lessons`
- `lesson_steps`
- `student_profiles`
- `progress_records`

Then allow guitar-specific extensions:

- guitar drills
- chord diagrams
- fretboard maps
- tab notation
- songbook

## TeachingEngine Implication

TeachingEngine should stay mostly generic.

Good reusable step types:

- speak
- ask
- cards
- action
- end

Potential future generic step types:

- case
- scenario
- compare
- sort
- sequence
- diagram
- reflection
- timed drill

Guitar-specific rendering can be added as plugins/components rather than built into the core engine.

## Design Principle

The simulator should feel artistically specific on the surface, but structurally reusable underneath.

For guitar:

The Hearth can be mystical, musical, and embodied.

For medicine:

The same engine could feel clinical, focused, and exam-oriented.

The engine should support both.

## Recommendation

Martin should rebuild the system as a small platform with The Hearth Mastery as its first domain.

Do not overbuild a giant platform immediately.

But do make the data model clean enough that a second simulator does not require starting again.
