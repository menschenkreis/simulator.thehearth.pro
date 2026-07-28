# External Music Exam Benchmark Plan V1

Date: 2026-07-18
Status: Planning standard; no learner-facing grade claims

## Purpose

Official music exams can help The Hearth Mastery check whether its learning
path is broad, progressive, and measurable. They are external measuring
rulers, not the identity of the simulator and not a replacement for Hearth
learning outcomes, teacher judgement, musical play, creativity, or learner
interest.

The first use of these sources is to answer:

- Are important guitar capabilities missing from a Hearth level?
- What observable evidence would show that a capability is becoming reliable?
- Is the technical gradient roughly comparable with established programmes?
- Are reading, listening, repertoire, and musicianship receiving enough care?

Foundation remains the threshold into the learning world. Level 1 begins with
the Hearth capability path after Foundation; it must not be relabelled as an
official Grade 1 course.

## First Benchmark Set

Use three official frameworks because each reveals a different part of a
complete guitar education.

### 1. Trinity Acoustic Guitar: primary comparison

Best overall fit for The Hearth's musical and instrument language:

- acoustic guitar from Initial to Grade 8;
- fingerstyle and plectrum pathways;
- contemporary styles including folk, rock/pop, jazz, blues, and country;
- notation and TAB;
- chord progressions, scales, modes, and technical work;
- backing tracks and duet options that develop ensemble skills;
- supporting tests for aural, sight reading, improvisation, and musical
  knowledge.

### 2. RSL Awards / Rockschool: practical contemporary comparison

Best comparison for practical contemporary playing:

- performance pieces as the largest assessed component;
- technical exercises covering scales, chords, and acoustic riffs;
- sight reading or improvisation and interpretation;
- ear tests and general musicianship;
- a strong connection between technique and playable music.

### 3. ABRSM Guitar: completeness check

Useful as a disciplined check that the simulator is not neglecting:

- prepared repertoire;
- scales and arpeggios;
- sight reading;
- aural skills;
- clear performance evidence and published assessment standards.

ABRSM Practical Guitar is primarily classical and uses a standard nylon-string
instrument, so it should not silently define The Hearth's genre, repertoire, or
teaching style.

## Relationship To The Hearth Curriculum

Hearth learning outcomes own the Journey spine. QJam and official exam
frameworks are sources beneath it, used as technical, completeness, and
progression checks.

- Hearth capabilities answer: "What can this learner use musically, and what
  should happen next?"
- QJam helps answer: "Which technical topics and resources support that
  capability?"
- Exam frameworks help answer: "Is the path covering capabilities that an
  established programme would expect?"
- The Hearth adds what exams often underweight: body awareness, learning and
  brain knowledge, creativity, cultural context, reflection, recovery paths,
  learner memory, and musical conversation.

No external source owns the curriculum.

## Shared Capability Domains

Every external requirement should be translated into one or more of these
stable capability domains:

1. Performance and repertoire
2. Pulse, rhythm, and groove
3. Technique and physical control
4. Chords and harmony
5. Scales, arpeggios, and fretboard knowledge
6. Reading and TAB
7. Aural skills and listening
8. Improvisation and interpretation
9. General musicianship and theory
10. Ensemble and accompaniment roles
11. Creativity and personal expression
12. Reflection, body awareness, and learning knowledge

The first ten allow useful comparison with external frameworks. The last two
protect The Hearth's own educational purpose rather than forcing every outcome
into an exam-shaped box.

## Evidence Language

The simulator must describe evidence honestly. Use these stages consistently:

1. `not_encountered` - the learner has not met the capability yet.
2. `contact` - the learner has seen, heard, or discussed it.
3. `attempted` - the learner has tried it with support.
4. `demonstrated` - the learner has shown it under defined conditions.
5. `applied_musically` - the learner has used it in a song, jam, performance,
   or creative task.
6. `consolidated` - the learner has repeated it reliably over time and context.
7. `externally_assessed` - reserved for evidence from a real external
   assessment.

Completing a screen, watching a video, or spending time in Practice is not by
itself proof of mastery.

## Reporting Rule

Allowed learner-facing wording:

- "You have encountered 7 of 10 Level 1 benchmark capabilities."
- "Your rhythm evidence is demonstrated; it still needs musical application."
- "This performance touches skills also found in early Trinity and RSL work."

Do not say:

- "You are Grade 1."
- "You passed ABRSM/Trinity/RSL Grade 1."
- "This is equivalent to an official qualification."

Only an official result may support an official grade claim.

## Crosswalk Data Model

The first implementation should be a reviewable source table, not a new UI.
Use one row per externally sourced capability with these fields:

| Field | Meaning |
| --- | --- |
| `benchmark_id` | Stable internal identifier |
| `framework` | ABRSM, Trinity, or RSL |
| `pathway` | Acoustic, classical, electric, practical, or digital |
| `instrument` | Instrument named by the source |
| `grade_band` | Initial, Debut, Grade 1, or another published band |
| `component` | Piece, technical work, aural, reading, improvisation, etc. |
| `requirement_summary` | Short paraphrase, not copied syllabus text |
| `capability_domain` | One of the shared domains above |
| `evidence_needed` | Observable proof expected in The Hearth |
| `hearth_level` | Proposed Journey level, initially Level 1 only |
| `hearth_activity_ids` | Existing lessons, drills, songs, or tasks |
| `coverage_status` | covered, partial, missing, or not applicable |
| `source_url` | Direct official source |
| `source_version` | Published syllabus/version if stated |
| `validity_note` | Valid dates or "until further notice" |
| `accessed_on` | Date the official source was checked |
| `review_status` | candidate, source-checked, teacher-reviewed, approved |
| `review_note` | Ambiguity, copyright, or interpretation note |

The planned first file is:

`database-blueprint/data/level-one-exam-benchmark-crosswalk-v1.csv`

## Level 1 Evidence Sources Inside The Hearth

Benchmark coverage should be assembled from activity already happening across
the simulator:

- Do: technical drill attempts, feedback, and control ratings.
- Practice: time, repetitions, consistency, and learner/teacher quality notes.
- Play: jams, grooves, accompaniment, call and response, and musical use.
- Know and Study: theory, reading, listening, and source-supported concepts.
- Create: riffs, phrases, songs, experiments, and personal choices.
- Hearth: body awareness, reflection, confidence, and learning observations.
- Mastery: encounters with complete performances and models of expert work.
- Journey: the planned sequence that gathers evidence from all these places.

One activity may support several capabilities, but it must emit separate,
specific evidence rather than awarding broad progress automatically.

## What The External Check Is Likely To Reveal

Current areas requiring special scrutiny:

- structured aural and listening progression;
- reading and TAB progression;
- complete-song and complete-performance evidence;
- clear assessment conditions and repeatable pass evidence;
- accompaniment and ensemble roles;
- a balanced repertoire trail rather than isolated drills.

These are hypotheses until the early-grade source extraction and Level 1
crosswalk are complete.

## Implementation Phases

### Phase 1: register official sources

Record the current official syllabus or overview for each of the three boards,
including version, validity note, and access date.

### Phase 2: extract only the earliest capabilities

Extract Initial/Debut/Grade 1 requirements only. Paraphrase competencies and
assessment evidence. Do not copy protected scores, repertoire, or substantial
syllabus text.

### Phase 3: map the existing Hearth Level 1

Connect current lessons, drills, songs, listening tasks, teacher notes, and
progress events to the external capabilities they genuinely evidence.

### Phase 4: identify gaps and duplication

Mark each external capability as covered, partial, missing, or not applicable.
Decide whether the response belongs in Journey, a node, the content library,
or a progress-evidence rule.

### Phase 5: design optional readiness reporting

Only after the crosswalk is teacher-reviewed should the product show an
optional benchmark-coverage view. Keep it separate from the learner's core
Journey progress so external exams do not become the emotional centre of the
app.

### Phase 6: specialist validation

Ask a qualified guitar teacher or exam specialist to review interpretation,
technical gradient, and evidence thresholds before calling the mapping
approved.

## Copyright And Accuracy Rules

- Use official sources for requirements and validity information.
- Store summaries and structured facts, not copied scores or full syllabus
  passages.
- Link to official syllabus pages and licensed repertoire sources.
- Record version and access date because syllabi change.
- Do not imply endorsement, accreditation, or official equivalence.
- Mark uncertain interpretations as candidates until a teacher reviews them.
- Keep the official-source layer separate from Ayla's lesson notes and product
  decisions so provenance remains clear.

## Official Source Register

Accessed 2026-07-18:

1. ABRSM Guitar overview  
   <https://www.abrsm.org/en-gb/instruments/guitar>
2. ABRSM Guitar Practical Grade Syllabus  
   <https://www.abrsm.org/sites/default/files/2023-10/Guitar%20Practical%20Grade%20Syllabus_0.pdf>
3. ABRSM Practical Grades overview  
   <https://www.abrsm.org/en-us/practical-grades/about-practical-grades>
4. Trinity Acoustic Guitar overview  
   <https://www.trinitycollege.com/qualifications/music/grade-exams/acoustic-guitar>
5. Trinity Acoustic Guitar Syllabus  
   <https://www.trinitycollege.com/resource?id=8898>
6. Trinity supporting tests  
   <https://trinitycollege.com/qualifications/music/grade-exams/about/supporting-tests>
7. RSL Acoustic Guitar Syllabus  
   <https://www.rslawards.com/wp-content/uploads/2023/04/Acoustic-Guitar-Syllabus-2019-Edition.pdf>
8. RSL Electric Guitar grades overview  
   <https://www.rslawards.com/learn-electric-guitar/>

## Credit-Efficient Scope

This V1 deliberately does not process every Grade 1-8 requirement. The next
useful step is a structured extraction of only the earliest grade from three
official frameworks, followed by one Level 1 gap review.

A full multi-board, eight-grade extraction would be a high-credit task and
should only happen after this small crosswalk proves useful.
