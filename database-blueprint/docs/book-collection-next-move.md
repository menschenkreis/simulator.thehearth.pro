# Book Collection Next Move

## Recommendation

Pause lesson development temporarily and finish a master book inventory.

The library is now large enough that adding more lesson content before cataloguing will make the knowledge base harder to trust later.

The next phase should be collection-first:

1. inventory every PDF/EPUB on disk
2. identify duplicates
3. mark text-readable vs OCR-needed
4. assign each book to one or more Hearth nodes
5. decide whether each book is an active curriculum source, private reference, OCR candidate, or archive item

## Current Local Scan

Generated file:

`database-blueprint/source/local_book_inventory_scan.csv`

Expanded master inventory:

`database-blueprint/source/master_book_inventory_v1.csv`

Seed JSON:

`database-blueprint/seeds/master_book_inventory_v1.json`

Cleaned master inventory:

`database-blueprint/source/master_book_inventory_v2_clean.csv`

Cleaned seed JSON:

`database-blueprint/seeds/master_book_inventory_v2_clean.json`

Duplicate review file:

`database-blueprint/source/duplicate_review_v1.csv`

Source priority map:

`database-blueprint/source/source_priority_map_v1.csv`

Current scan result for:

`/Users/alessandralove/Downloads/Guitar Resources`

- 68 PDF/EPUB files found
- 14 files clearly matched to logged blueprint batches by exact file path
- 54 files still need intake triage
- 2 files appear to share duplicate filenames

The logged count is conservative because some earlier files moved folders after being processed. The next catalogue pass should match books by title/author as well as file path.

## Expanded Folder Scan

The expanded inventory covers:

- `/Users/alessandralove/Downloads/Guitar Resources`
- `/Users/alessandralove/Downloads/LEARNING`

Current result:

- 79 PDF/EPUB files
- 37 scanned/OCR-needed files
- 36 text-based PDFs
- 3 text-readable EPUBs
- 3 mixed/partial text files

Recommended status spread:

- Active Source: 6
- Supporting Reference: 17
- Private Reference: 4
- OCR Later: 34
- Duplicate Review: 18

The duplicate count is intentionally conservative. Several books appear in both the guitar folder and learning folder; the next cleanup should collapse exact duplicates by book identity, not only file path.

## Duplicate Cleanup Result

The cleaned v2 inventory keeps 79 file rows but groups them into 69 book identities.

Current result:

- 69 book identities
- 10 duplicate groups
- 10 file copies marked `Duplicate / Archive`
- 8 `Active Source` records
- 21 `Supporting Reference` records
- 30 `OCR Later` records
- 7 `Private Library` records
- 3 `To Review` records

No files were deleted or moved.

Canonical copy rule:

- prefer already processed `Done` copies when source notes already point there
- prefer `LEARNING` copies for learning-science duplicates that have not already been processed
- prefer non-`(1)` duplicate filenames when otherwise equivalent

This gives Martin a clean distinction between:

- a book identity
- one or more local file copies
- the canonical working copy
- archive/duplicate copies that should not be exposed as separate books

## Current Active Sources

These are the strongest immediate sources after the inventory cleanup:

- Jamie Andreas - *Principles of Correct Practice for Guitar*
- Aaron Shearer - *Learning the Classic Guitar Part 1*
- Bill Edwards - *Fretboard Logic Box Set*
- Marc Schonbrun - *The Everything Music Theory Book*
- K. Anders Ericsson - *Development of Professional Expertise*
- K. Anders Ericsson et al. - *The Cambridge Handbook of Expertise and Expert Performance*
- Aniruddh D. Patel - *Music, Language, and the Brain*
- Daniel J. Levitin - *This Is Your Brain on Music*

This gives the simulator a strong source triangle:

- body-aware practice
- fretboard/music theory structure
- learning science and expertise development

## First Source Priority Map

The first source priority map is:

`database-blueprint/source/source_priority_map_v1.csv`

It expands the spine into ten near-term sources:

1. Jamie Andreas - *Principles of Correct Practice for Guitar*
2. Aaron Shearer - *Learning the Classic Guitar Part 1*
3. Bill Edwards - *Fretboard Logic Box Set*
4. Marc Schonbrun - *The Everything Music Theory Book*
5. K. Anders Ericsson - *Development of Professional Expertise*
6. K. Anders Ericsson et al. - *The Cambridge Handbook of Expertise and Expert Performance*
7. Aniruddh D. Patel - *Music, Language, and the Brain*
8. Daniel J. Levitin - *This Is Your Brain on Music*
9. Patrick Stefurak - *Guitar Building Blocks*
10. Mark Phillips & Jon Chappell - *Guitar Exercises for Dummies*

These should drive the first real knowledge-base build before lower-priority style books and reference books.

Source notes started:

- `database-blueprint/source/source_notes_priority_001_everything_music_theory.csv`
- `database-blueprint/source/source_notes_priority_002_ericsson_professional_expertise.csv`
- `database-blueprint/source/source_notes_priority_003_patel_music_language_brain.csv`

## Why This Is Stronger Than Building Immediately

The Hearth Mastery is becoming a sourced learning system, not just a pile of lessons.

Before creating more student-facing content, the source library should answer:

- What do we have?
- Which books are trustworthy enough to shape curriculum?
- Which books are only reference material?
- Which sources support Foundation, Doing, Study, Practice, Create, Hearth, Knowing, and Mastery?
- Which scanned books deserve OCR first?
- Which books should Martin later expose in the private library?

## Recommended Next Work Session

Build source notes from the priority map.

Recommended order:

1. text-readable sources first where possible
2. OCR only the highest-value scanned sections
3. map source notes to Foundation, Study, Practice, and Hearth
4. leave style/genre sources for later Doing/Create expansion

After the first source-note build, make:

1. Foundation source map
2. Study source map
3. Practice source map
4. Hearth learning-science source map
5. Martin backend requirements for book/library tables

## Current Intake Rule

Do not develop more lesson content until the local book inventory has at least:

- every file listed
- obvious duplicates marked
- every file assigned a rough node
- every file assigned one next action

This keeps the database clean enough to survive the rebuild.
