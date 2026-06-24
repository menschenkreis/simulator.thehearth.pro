# Source Note: QJamTracks Road Map For Learning Guitar

## Source

QJamTracks / Rob van Hal, *Road Map For Learning Guitar*, revision 2024-11-07.

Local file:

`/Users/alessandralove/Documents/TREE OF LIFE/AYLA/Guitar Lessons/Resources/E-booklet Roadmap for learning Guitar_revison_2024_11_07 (1).pdf`

Extracted text:

`database-blueprint/source/qjam_roadmap_extracted_text.txt`

## Source Type

Roadmap / curriculum structure.

## Pages

- PDF pages: 1-3
- Printed pages: not clearly distinct from PDF pages in this file

## Core Value

This is one of the strongest structural references for the simulator because it gives:

- 8 learning levels
- 9 disciplines
- concept progression across levels
- linked lesson resources

It should influence the final roadmap architecture, especially Doing, Knowing, Practice, and Study.

## The Source 9 Disciplines

The QJam roadmap organizes guitar learning across these disciplines:

1. Rhythm
2. Chords & Harmony
3. Scales
4. Technique & Improvisation
5. Picking Technique
6. Arpeggios
7. Fingerstyle
8. Theory
9. Reading Music

## Hearth Adaptation

The Hearth should not copy the disciplines exactly.

Recommended adaptation:

- keep QJam as the structural source
- split `Technique & Improvisation` into two Hearth disciplines
- connect `Reading Music` strongly to the Study node

This gives The Hearth 10 technical disciplines derived from QJam:

1. Rhythm
2. Chords & Harmony
3. Scales
4. Technique
5. Improvisation
6. Picking Technique
7. Arpeggios
8. Fingerstyle
9. Theory
10. Reading Music

Technique and improvisation both belong heavily in Doing, but they are different learning processes:

- technique = physical capacity, articulation, control
- improvisation = real-time musical decision-making

Reading music should become one of the ways the Study node develops, rather than being treated as a tiny side skill.

## Implication For The Hearth Mastery

The Hearth currently has 8 app nodes:

- Foundation
- Doing
- Knowing
- Practice
- Study
- Create
- Hearth
- Mastery

These should remain as the **app-world rooms/nodes**.

QJam's disciplines should become the **technical learning domains** underneath those rooms, adapted into Hearth's structure.

This means the database needs to separate:

- app node: where the learner is in the simulator
- discipline / skill domain: what kind of guitar knowledge is being trained
- level: how advanced the material is

## Recommended Use

Use QJam as the structural source for the 8-level technical progression.

Do not copy it blindly.

The Hearth needs:

- a more beginner-sensitive Foundation layer
- clearer teaching philosophy
- visible source citations
- creative and emotional learning components
- practice reflection and student memory

QJam gives the technical progression and many of the YouTube lesson links. The Hearth gives the learning environment, study philosophy, voice, and broader neurological/reflection layer.

## Hearth Application

Potential database model:

- 8 app nodes
- 8 learner levels
- 9 guitar disciplines
- roadmap items created at intersections of level + discipline

Example:

- Level 1 + Rhythm = quarter/eighth note strum and single-note pulse
- Level 1 + Chords & Harmony = basic open chords and common-finger chord changes
- Level 1 + Theory = string names, parts of guitar, tuning, basic note values
- Level 2 + Chords & Harmony = advanced open chords, power chords, 12-bar blues
- Level 3 + Chords & Harmony = barre chords, slash chords, triads

## Citation Style

Simple learner-facing citation:

`Source: QJamTracks / Rob van Hal, Road Map For Learning Guitar`

Admin/source-note citation:

`QJamTracks / Rob van Hal, Road Map For Learning Guitar, PDF pp. 1-3.`

## Processing Confidence

Extraction quality: medium-high.

The PDF is text-extractable, but page 2 is a dense visual table, so some ordering should be manually reviewed before becoming final database rows.
