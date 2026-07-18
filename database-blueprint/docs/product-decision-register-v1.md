# Product Decision Register V1

Date: 2026-07-18

## Purpose

This register states the current product truth in plain language. It does not
erase earlier briefs. It identifies which directions still govern the product
and which were experiments or have been replaced by later decisions.

Use this register before planning a feature, auditing a node, or handing work
to another developer.

## Decision Statuses

- **Confirmed**: use this as the current product rule.
- **Superseded**: preserve the history, but do not build from it.
- **Prototype**: useful temporary implementation, not a final requirement.
- **Open**: requires an explicit decision or evidence.

## Confirmed Product Decisions

### 1. The simulator is one connected learning world

Status: Confirmed

The interface should feel like places in one world rather than a collection of
unrelated dashboards. Navigation, guide behaviour, progress, learner identity,
and interaction language should remain coherent across the product.

### 2. Map, Journey, and nodes have different jobs

Status: Confirmed

- Map answers: `Where can I go?`
- Journey answers: `What should I do next?`
- Nodes answer: `What kind of learning or musical action happens here?`

Journey is the itinerary. Nodes are the places. Journey should launch or
recommend node-owned activities rather than duplicating them.

### 3. The current map has nine meaningful learning places

Status: Confirmed by current product direction

- Foundation
- Do
- Know
- Practice
- Study
- Hearth
- Play
- Create
- Mastery

Play is now treated as a real place with a distinct contract: groove,
traditions, songs, jamming, musical roles, and participation. It is not merely
an optional label under another node.

Journey remains a top-level path and progress mode rather than one of these map
places.

### 4. Foundation is the threshold, not Level 1

Status: Confirmed

Foundation teaches how to enter the simulator, how learning works here, music
as language, first physical contact, and recovery from confusion.

Level 1 begins the first real technical and musical Journey after Foundation.
The Journey is now owned by Hearth learning outcomes. QJam remains an important
technical roadmap and source collection, not the curriculum spine.

### 5. Every node needs a distinct purpose and boundary

Status: Confirmed

- Foundation owns orientation and first contact.
- Do owns physical drills and technique guidance.
- Know owns source-backed reference knowledge.
- Practice owns planned repetition, timing, takes, and session reflection.
- Study owns concept clarification, terms, relationships, tests, and review.
- Hearth owns the learner's inner instrument: body, senses, brain, attention,
  feeling, and learning development.
- Play owns musical participation, groove, traditions, songs, jamming, and
  role exchange.
- Create owns transforming learned material into personal musical material.
- Mastery owns purposeful encounters with developed artistry and the learner's
  response to it.

### 6. Node entrances are scene-first

Status: Confirmed

The first click should present one clear visual metaphor or environment. The
principle must be implemented through node-owned components, not global
override code.

### 7. Click depth should increase usefulness

Status: Confirmed

A normal path should move from:

1. place or metaphor;
2. clear choice;
3. meaningful activity or learning outcome.

Final destinations should use interaction, playable examples, diagrams,
audio, video, drills, reflection, creation, or other fit-for-purpose media.
Small static text boxes are not acceptable as the default final outcome.

### 8. Learner identity belongs to the whole simulator

Status: Confirmed

The active profile should be selected at app level. Ayla, Jen, and future
learners must have separate progress, reflections, projects, notes, practice
history, and recommendations. Teacher access may view a learner's evidence but
must not mix profiles.

### 9. Progress means evidence, not clicking

Status: Confirmed

Useful evidence includes attempts, repetitions, comfort, clean performances,
practice time, recordings, musical use, study proof, reflections, teacher
notes, resources used, and creative work.

Progress should support a helpful next recommendation rather than merely fill
a decorative bar.

### 10. Activities are reusable across nodes

Status: Confirmed

A drill, resource, concept, groove, or creative seed should have one stable
identity. Journey and Practice may launch the same Do drill. Completion and
feedback should update the same learner record wherever the activity opened.

Cross-node handoffs should use small structured objects or progress events,
not direct screen-to-screen dependencies.

### 11. Content must be source-aware and teachable

Status: Confirmed

Source notes should precede large lesson drafts. Learner-facing citations stay
simple. Every promoted learning item needs a purpose, setup, small steps,
observable success condition, easier path, musical application, and appropriate
source or synthesis label.

### 12. The guide is contextual

Status: Confirmed

The guide should respond to the current place, activity, learner, progress,
answer, and next action. It should teach or orient briefly, not provide static
filler or cover important artwork.

### 13. Visual accuracy is part of educational quality

Status: Confirmed

Guitar and hand artwork must be mechanically and anatomically plausible. A
standard guitar has six strings and six tuning machines. Visible hands need
five plausible digits, correct left/right roles, coherent arms, and believable
contact with the instrument.

Production assets should normally have transparent backgrounds, no baked UI or
guide character, and no visible rectangular seam.

### 14. The prototype should be modular and backend-ready

Status: Confirmed

Content, learner state, rendering, and interaction should be separable. Stable
IDs and structured events matter more than preserving the exact prototype
implementation. Existing behaviour should be extracted in safe stages rather
than replaced through one disruptive rewrite.

### 15. Official exams may become external benchmarks

Status: Confirmed as a research direction, not yet a product feature

ABRSM, Trinity, RSL/Rockschool, and other credible frameworks may help identify
missing competencies and readiness evidence. They should act as measuring
rulers, not replace The Hearth's learning philosophy or automatically determine
the Journey.

No exam-equivalence claim should appear until a sourced crosswalk and evidence
rule have been reviewed.

### 16. Hearth capabilities own the Journey spine

Status: Confirmed 2026-07-18

Journey levels are defined by observable musical, technical, listening,
creative, and learning capabilities. No external teacher, course, roadmap, or
exam board owns the curriculum.

QJam remains a strong technical roadmap source. JustinGuitar, Trinity, RSL,
ABRSM, the knowledge library, teacher judgement, and learner evidence provide
additional checks. These sources map beneath Hearth-owned outcomes.

Current Level 1 direction is recorded in
`hearth-level-one-capability-map-v1.md`.

## Superseded Directions

### 1. Play is optional or should live under another node

Status: Superseded

Reason: later Play work established a distinct purpose and complete musical
participation route. Current product language and the visible map treat Play as
a place.

Historical source: `decision-log.md` and `map-node-registry-v1.md`.

### 2. Foundation is the first Journey level

Status: Superseded

Reason: Foundation is the threshold. Level 1 begins after it.

### 3. Every node can use the same dashboard or card layout

Status: Superseded

Reason: each node needs a metaphor and interaction model suited to its job.

### 4. Final click outcomes may remain explanatory text

Status: Superseded

Reason: final destinations need meaningful interaction or media appropriate to
the learning task.

### 5. Learner selection belongs only inside Journey

Status: Superseded

Reason: learner identity affects the entire simulator and belongs at app level.

### 6. The floating guide can use generic repeated speech

Status: Superseded

Reason: guide language must reflect context and learner evidence.

### 7. QJam is the curriculum spine

Status: Superseded 2026-07-18

Reason: QJam provides a useful technical progression but does not fully cover
songs, systematic listening, embodied learning, creativity, learner memory,
consolidation, cultural context, or evidence-based progress. It remains a
source beneath the Hearth capability spine.

Historical sources: `decision-log.md`, `qjam-roadmap-source-note.md`, and
`journey-strategy-v1.md`.

## Temporary Prototype Decisions

These are allowed while the prototype develops, but they are not final product
requirements:

- one large `simulator.html` containing substantial shared CSS and markup;
- local browser storage as the primary persistence layer;
- global functions used to bridge legacy and newer adapters;
- selected vertical slices being complete while neighbouring routes remain
  placeholders;
- generated visual assets awaiting final anatomical or transparency review;
- compatibility reads from older storage keys;
- file-based local launching rather than a production application shell.

Temporary solutions must be documented and covered by regression tests when
they protect working behaviour.

## Open Decisions

Do not silently decide these during implementation:

1. Which South African or additional framework, if any, should follow the
   Trinity, RSL, and ABRSM first benchmark wave?
2. What evidence is sufficient before the simulator suggests an external grade
   comparison?
3. Which working Level 1 evidence thresholds need adjustment after Ayla, Jen,
   and a qualified teacher test the capability map?
4. What is the final whole-simulator progress-screen metaphor?
5. Which recordings remain local, and which require backend media storage?
6. What teacher permissions and learner privacy rules apply beyond the local
   prototype?
7. Which external repertoire can be linked, embedded, licensed, or only cited?
8. What is the final production framework and migration schedule?

## Update Rule

When a decision changes:

1. do not delete the historical reasoning;
2. mark the old direction as superseded;
3. add the new current decision and date;
4. state what code, content, tests, and briefs are affected;
5. update this register before asking the final audit to judge the product.
