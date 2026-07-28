# Content And Source Quality Standard V1

Date: 2026-07-18

## Purpose

This standard decides when a book, video, explanation, drill, lesson, cultural
claim, scientific idea, or musical example is ready to appear to a learner.

The goal is not to make The Hearth sound academic. The goal is to make its
warm teaching voice traceable, accurate, level-appropriate, and useful.

## Core Principle

The source provides evidence and perspective.

The Hearth provides the teaching voice and learning experience.

Do not copy a source into the app. Extract what is useful, preserve where it
came from, compare it where necessary, and create original learner-facing
material suited to the simulator.

## Content Layers

Keep these layers separate.

### 1. Source

The original book, article, video, syllabus, recording, interview, teacher
observation, or other evidence.

### 2. Source Note

A traceable summary of one useful idea, structure, exercise, claim, or example.
It records where the idea came from and how it may help The Hearth.

### 3. Shared Learning Content

Original Hearth material that learners may use: lesson steps, drill guidance,
reference explanations, diagrams, study questions, listening activities,
creative prompts, or assessment criteria.

### 4. Learner Memory

What happened for Ayla, Jen, or another learner: ratings, requests, confusion,
teacher notes, recordings, reflections, and progress evidence.

Learner memory may influence recommendations. It must not silently become
universal curriculum content.

## Content Status Vocabulary

Use one of these statuses.

### Candidate

A source or idea looks promising but has not been checked.

It may appear in internal planning. It must not be presented as approved
learner guidance.

### Catalogued

Basic identity and access details are recorded.

For example: title, author or creator, type, location, topic, likely level,
access conditions, and reason it may matter.

### Extracted

The relevant section, timestamp, chapter, exercise, or concept has been
identified and summarized in a source note.

### Reviewed

A human or appropriate expert has checked that the summary is faithful, the
mapping is sensible, and the source is suitable for the intended learner.

### Learner Ready

Original Hearth content has passed the promotion gates in this document and is
safe to show in its intended context.

### Needs Revision

The content is useful but currently inaccurate, unclear, inaccessible,
overwhelming, poorly sourced, or badly matched to the learning moment.

### Retired

The content is no longer used. Keep its ID and reason for retirement when
learner records or old links may refer to it.

## Source Record Minimum

Every important source should record:

```text
source_id
title
creator or author
publisher or platform
publication date or version when relevant
source type
local file or external URL
access type
copyright or licence note
topic tags
likely node and level
status
review date
reviewer
why this source matters
```

Access types should include:

- Public
- Free account required
- Paid or subscription required
- Private local copy
- Permission required
- Unavailable
- Unknown

Never store account passwords or private course credentials in the repository,
database, source notes, or learner content.

## Source Note Minimum

Each useful extracted idea should include:

```text
source_note_id
source_id
chapter, page, section, or timestamp
concept
short original summary
important qualification or limitation
Hearth application
related node
related skill
related level
related roadmap item or lesson
confidence
extraction quality
review status
```

Use chapter anchor notes for orientation and smaller concept notes only when an
idea can support a real lesson, drill, activity, assessment, or design decision.

## Confidence And Extraction Quality

Confidence:

- `high`: source location is exact and interpretation is straightforward;
- `medium`: source is clear but application or mapping needs review;
- `low`: source, OCR, interpretation, or context is uncertain.

Extraction quality:

- `text-good`
- `text-partial`
- `ocr-needed`
- `ocr-rough`
- `visual-review-needed`
- `audio-review-needed`
- `link-unavailable`

Low-confidence material must not become an unqualified learner-facing claim.

## Claim Risk Levels

Different claims require different levels of review.

### Musical Convention

Examples:

- note names;
- interval names;
- common chord formulas;
- notation and tablature conventions.

Requirement: confirm against at least one credible method, reference, or
official specification when the detail affects instruction.

### Guitar Technique

Examples:

- finger assignment;
- fretting position;
- picking direction;
- chord fingering;
- tuning and instrument geometry.

Requirement: verify that the instruction is mechanically correct, playable,
appropriate for the learner, and consistent with its diagram or video. State
when more than one legitimate technique exists.

### Health, Anatomy, And Safety

Examples:

- tendons and nerves;
- pain and injury;
- posture;
- hearing protection;
- breathing and nervous-system regulation.

Requirement: use authoritative health or anatomy sources and conservative
language. Do not diagnose, promise treatment, or present one posture as
universally correct. Pain, numbness, weakness, or persistent symptoms require
an appropriate professional rather than app certainty.

### Brain, Learning, And Psychology

Examples:

- neuroplasticity;
- memory;
- attention;
- pattern recognition;
- motivation and confidence.

Requirement: distinguish established evidence, educational interpretation,
metaphor, and speculation. Never claim that clicking or completing one activity
proves that a brain region developed.

### Culture, History, And Living Traditions

Examples:

- origins of a style;
- community ownership;
- cultural exchange;
- historical development;
- claims about a people or place.

Requirement: use traceable, preferably first-person or scholarly sources;
identify uncertainty and contested claims; avoid reducing a living tradition
to a decorative genre label. The learner should meet people, place, history,
and audible musical choices together.

Claim review states may include:

- documented
- supported interpretation
- oral tradition
- contested
- needs review

### Current Exams, Syllabuses, Products, And External Services

Requirement: check the current official source and record the version or access
date. Do not assume a syllabus, link, price, account rule, or repertoire list is
permanent.

### Learner And Teacher Observations

Examples:

- Jen enjoyed jamming;
- a chord felt shaky;
- a teacher noticed rushing.

Requirement: store as learner-scoped evidence with author and date. Do not
present a personal observation as a universal teaching fact.

## Learner-Ready Promotion Gates

Content becomes Learner Ready only when all applicable gates pass.

### Gate 1: Identity And Traceability

- [ ] Stable content and source IDs exist.
- [ ] Source creator, title, and location are known where applicable.
- [ ] Page, section, chapter, timestamp, or version is recorded when available.
- [ ] Original summary and source wording are distinguishable.
- [ ] Confidence and review status are visible internally.

### Gate 2: Accuracy

- [ ] Musical details have been checked.
- [ ] Guitar diagrams match the written instruction.
- [ ] Images show plausible anatomy and instrument geometry.
- [ ] Scientific, health, cultural, and historical claims have the required
      source and review level.
- [ ] Uncertainty and legitimate alternatives are stated plainly.

### Gate 3: Learning Fit

- [ ] The intended learner and level are clear.
- [ ] Prior knowledge is known.
- [ ] The learning gradient is small enough.
- [ ] Terms are defined or linked to a recovery path.
- [ ] The content has one clear purpose in this moment.
- [ ] It supports the active roadmap rather than adding information because it
      is interesting.

### Gate 4: Teaching Shape

Every instructional activity should include, where applicable:

- [ ] purpose or goal;
- [ ] setup;
- [ ] small ordered steps;
- [ ] what to hear, see, feel, or notice;
- [ ] observable success condition;
- [ ] easier version;
- [ ] harder or next version;
- [ ] safety or tension note;
- [ ] musical application;
- [ ] useful next action.

### Gate 5: Media Fit

- [ ] The medium suits the idea.
- [ ] Notes and frets use tablature or a fretboard map where appropriate.
- [ ] Chords use an accurate chord diagram.
- [ ] Rhythm uses count, subdivision, notation, grid, audio, or movement.
- [ ] Posture and movement use checked images or demonstrations.
- [ ] Sound-dependent claims include audio or a clearly planned audio slot.
- [ ] Long videos belong in Study unless the exact excerpt directly serves the
      present activity.
- [ ] Missing media has an honest fallback rather than a fake player.

### Gate 6: Copyright And Access

- [ ] Learner-facing wording is original.
- [ ] Long copyrighted passages are not copied.
- [ ] Full private PDFs are not exposed publicly without permission.
- [ ] Repertoire, notation, lyrics, audio, and video use an appropriate link,
      licence, permission, public-domain status, or original substitute.
- [ ] Account-gated content is labelled and opened on the external service.
- [ ] The app remains useful if an external resource is unavailable.

### Gate 7: System Connection

- [ ] Node ownership is clear.
- [ ] Related Journey item, lesson, skill, drill, resource, or activity IDs are
      attached.
- [ ] The content can create meaningful progress evidence.
- [ ] Reuse does not create duplicate canonical copies.
- [ ] Personal learner context remains separate from shared content.

## AI-Assisted Content Rule

AI may help:

- summarize extracted material;
- suggest a clearer explanation;
- draft original practice steps;
- produce candidate questions;
- identify possible cross-links;
- create visual concepts;
- structure inventories.

AI output remains Candidate content until reviewed. A confident tone is not
evidence of correctness.

For high-risk claims, use primary or authoritative sources and preserve enough
traceability for another person to check the conclusion.

Generated guitar and anatomy images must pass visual accuracy review even when
their prompt was technically correct.

## Video Standard

A video record is useful only when it answers:

- What exact concept or action does it demonstrate?
- Which learner and level is it appropriate for?
- Which section or timestamp matters?
- Is the link currently available?
- Is an account or payment required?
- Is it explanation, demonstration, inspiration, or long study?
- What should the learner do before, during, or after watching?

Do not embed a video merely because it belongs to the same broad category.

## Official Exam Material

Official syllabuses may inform competency maps, assessment evidence, and
external benchmark comparisons.

Rules:

- record examination board, instrument, pathway, grade, syllabus version, and
  validity or access date;
- link to the official source;
- separate required skill from protected repertoire;
- do not imply endorsement or exact grade equivalence;
- label inferences made by The Hearth;
- review current requirements before presenting them to learners.

Exam frameworks should reveal gaps in The Hearth, not flatten its philosophy
into exam preparation.

## Placeholder Policy

Use these internal labels:

- `placeholder-copy`
- `placeholder-visual`
- `placeholder-media`
- `unverified-link`
- `needs-expert-review`
- `vertical-slice-only`

A placeholder may support layout development. It must not:

- appear complete in an audit;
- create a mastery or readiness claim;
- unlock progression as if real learning occurred;
- conceal that required media or content is absent.

## Content Review Record

Use this small record when promoting an item:

```text
Content ID:
Title:
Type:
Node:
Skill:
Level:
Learner use:
Primary source(s):
Source location/version:
Claim risk:
Reviewer:
Review date:
Teaching-shape check:
Media check:
Copyright/access check:
Progress evidence created:
Status:
Known limitation:
```

## Audit Questions

For every content destination, ask:

1. Is this true enough to teach?
2. Can we show where it came from?
3. Is it right for this learner now?
4. Does the medium help the learner understand or act?
5. Is the activity small enough to succeed?
6. What evidence will show more than a click?
7. Where does the learning go next?
8. Are we respecting the source, learner, culture, and rights holder?

If the product cannot answer these questions, the content is not yet complete.

