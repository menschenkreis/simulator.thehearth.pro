# PDF Drop Log

## Batch 001 - Teaching Philosophy And Beginner Foundation

Date processed: 2026-06-23

Files received:

1. Jamie Andreas - *Principles of Correct Practice for Guitar*
2. Mark Phillips & Jon Chappell - *Guitar Exercises For Dummies*
3. Troy Nelson - *Guitar Aerobics*
4. William Leavitt - *Berklee Basic Guitar Phase 1*
5. William Leavitt - *Berklee Basic Guitar Phase 2*
6. William Leavitt - *A Modern Method for Guitar Volumes 1-3 Complete*

Triage file:

`database-blueprint/source/pdf_drop_batch_001_triage.csv`

## Processing Result

### Ready For Text Extraction

- *Guitar Exercises For Dummies*
- *Guitar Aerobics*

These have good selectable text and can move straight into table-of-contents extraction, source notes, and roadmap mapping.

### Needs OCR

- *Principles of Correct Practice for Guitar*
- *Berklee Basic Guitar Phase 1*
- *Berklee Basic Guitar Phase 2*

These appear scanned/image-based. They should be OCRed before deep source-note work.

### Mixed / Partial Text

- *A Modern Method for Guitar Volumes 1-3 Complete*

This has some extractable text but may need visual inspection or OCR for full structure.

## Recommended Processing Order

1. Use *Guitar Exercises For Dummies* as the first easy extraction test.
2. Use *Guitar Aerobics* to model daily/weekly practice structures.
3. OCR selected pages from *Principles of Correct Practice* because it is philosophically central.
4. Process *A Modern Method for Guitar* as a Study/Reading source.
5. OCR Berklee Phase 1 and Phase 2 after the first source-note templates are stable.

## Why This Order

This avoids getting blocked by scanned PDFs.

We can build the source-note workflow using clean text books first, while still treating Jamie Andreas as the philosophical priority.

## Batch 002 - Shearer And Music Cognition

Date processed: 2026-06-23

Files received:

1. Aaron Shearer - *Learning the Classic Guitar Part 1*
2. Aaron Shearer - *Learning the Classic Guitar Part 2*
3. Aaron Shearer - *Learning the Classic Guitar Part 3*
4. Daniel J. Levitin - *This Is Your Brain on Music*

Triage file:

`database-blueprint/source/pdf_drop_batch_002_triage.csv`

Source-note files:

- `database-blueprint/source/source_notes_batch_002_levitin_brain_on_music.csv`
- `database-blueprint/source/source_notes_batch_002_shearer_visual_toc.csv`

### Processing Result

Ready for text extraction:

- *This Is Your Brain on Music*

Needs OCR:

- *Learning the Classic Guitar Part 1*
- *Learning the Classic Guitar Part 2*
- *Learning the Classic Guitar Part 3*

### Recommended Processing Order

1. Use Levitin for Hearth/Study source notes around music cognition, emotion, expertise, anticipation, and taste.
2. OCR Shearer Part 1 for Foundation technique: posture, tone, rest stroke, free stroke, right hand, left hand.
3. OCR Shearer Part 2 for Study: rhythm notation, pitch notation, reading music, memorization.
4. Keep Shearer Part 3 for later Mastery work: interpretation, phrasing, performance anxiety, expressive performance.

### Why This Matters

Shearer gives the simulator a disciplined physical and reading progression.

Levitin gives the Hearth node a research-backed way to talk about what music is doing to the mind, body, memory, attention, taste, and identity.

## Batch 003 - Fretboard Theory Beginner Reference And Style Sources

Date processed: 2026-06-23

Files received:

1. Bill Edwards - *Fretboard Logic Box Set*
2. Charles Kim - *Teach Yourself VISUALLY Guitar*
3. Marc Schonbrun - *The Everything Music Theory Book*
4. Patrick Stefurak - *Guitar Building Blocks*
5. Scott Tennant - *Pumping Nylon: Easy to Early Intermediate Repertoire*
6. Scott Tennant - *Pumping Nylon*
7. Marc Schonbrun - *The Everything Rock & Blues Guitar Book*
8. Ralph Denyer - *The Guitar Handbook*

Triage file:

`database-blueprint/source/pdf_drop_batch_003_triage.csv`

### Processing Result

Ready for text extraction:

- *Teach Yourself VISUALLY Guitar*
- *The Everything Music Theory Book*
- *Guitar Building Blocks*

Needs OCR:

- *Fretboard Logic Box Set*
- *The Guitar Handbook*
- *Pumping Nylon: Easy to Early Intermediate Repertoire*
- *Pumping Nylon*
- *The Everything Rock & Blues Guitar Book*

### Important Corrections

The available *Teach Yourself VISUALLY Guitar* file is by Charles Kim.

Both *Pumping Nylon* files are now visible. The 1995 book should be treated as the technique source. The 1998 easy-to-early-intermediate book should be treated as a repertoire supplement.

### Recommended Next Move

Pause lesson development and run a master library inventory.

The local `Downloads/Guitar Resources` folder currently contains many more PDF/EPUB files than the processed `Done` folder. Before building more content, create a master catalogue of every book, then decide which sources are:

- active curriculum sources
- private reference library books
- OCR priorities
- duplicates or lower-priority archive items
