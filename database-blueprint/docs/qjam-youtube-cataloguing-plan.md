# QJam YouTube Cataloguing Plan

## Purpose

The QJam roadmap already includes many YouTube links aligned to levels and disciplines.

These should be catalogued as resources, not left buried in the PDF.

## Source

QJamTracks / Rob van Hal, *Road Map For Learning Guitar*, revision 2024-11-07.

Extracted text:

`database-blueprint/source/qjam_roadmap_extracted_text.txt`

## Target Resource Fields

Each linked lesson should become a resource record with:

- source: QJam roadmap
- source PDF page
- level: Level 1-8
- discipline
- title
- creator/platform
- URL
- tutorial number if present
- QJam tutorial flag if known
- related roadmap topic
- status: To Review / Approved / Replace Later
- notes

## Cataloguing Strategy

Do not blindly approve every video.

First pass:

- extract all links
- attach level and discipline
- preserve title exactly enough to identify it
- mark status as `To Review`

Second pass:

- watch/check important links
- decide whether they belong in student-facing lessons
- add why-useful notes
- map to roadmap items

## Current Clean Catalogue

Generated clean files:

- `database-blueprint/source/qjam_youtube_links_clean.csv`
- `database-blueprint/seeds/qjam_youtube_links_clean.json`

Current count:

- 86 video rows
- 12 reused video URLs
- 28 rows marked as duplicate URL appearances

Discipline spread after Hearth normalization:

- Arpeggios: 13
- Chords & Harmony: 18
- Improvisation: 16
- Rhythm: 7
- Scales: 20
- Theory: 12

The QJam source combines technique and improvisation. The clean catalogue assigns likely Hearth placement, but all of those rows should remain `To Review` until Ayla confirms whether they belong under Technique, Improvisation, or both.

Repeated video URLs should not automatically be removed. In some cases, the same video can support different levels or topics. The database should allow one canonical media resource to be attached to more than one roadmap item.

## Importance

This is one of the fastest ways to make the knowledge base practical.

The QJam PDF gives us not only a progression but also a first resource map.

That means Level 1-8 can be built with real external support from the beginning.
