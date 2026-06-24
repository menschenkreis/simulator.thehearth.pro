# Current Book Library State

## Where The Books Live

The book library currently exists in two places.

## 1. Local Source Files

Local path:

`knowledge-base/pdfs/`

Current known state:

- 43 PDFs
- approximately 894MB
- not committed to git
- likely gitignored because the files are too large
- `Neuro/New/` contains some duplicates

These local PDFs are the source files, not the app's live source of truth.

## 2. App / API Metadata

The actual viewer uses the MySQL table:

`content_books`

Known columns:

- `key_name`
- `title`
- `author`
- `description`
- `category`
- `difficulty`
- `pdf_url`

Frontend flow:

1. `HearthAPI.getBooks()` is called.
2. It requests `thehearth.pro/api/?a=content-books`.
3. The API returns book metadata as JSON.
4. `pdf-viewer.js` renders the selected book in an iframe using `pdf_url`.

Important:

The database table is currently the source of truth for what the app can show.

The local PDFs are originals that need hosting, then their hosted URLs need to be stored in `content_books.pdf_url`.

## Text Quality

Current rough split from the 33 non-duplicate PDFs on disk:

- 10 text-based PDFs: about 30%
- 23 scanned/image-based PDFs: about 70%

Text-based examples:

- Mixing Secrets
- Guitar Exercises for Dummies
- Music Language and the Brain
- The Music Instinct
- Berklee Complete Method
- Guitar Aerobics
- The Recording Engineer's Handbook

Scanned examples:

- Super Chops
- Jazz Guitar
- Fretboard Roadmaps
- Speed Mechanics
- Classical Guitar
- Blues You Can Use
- Principles of Correct Practice

## Implication For The Knowledge Pipeline

Text-based PDFs can enter the AI/source-note pipeline directly.

Scanned PDFs need OCR before they can be searched, summarized, embedded, or mapped into lessons.

Do not OCR everything blindly. Start with priority books and priority chapters.

## Updated Local Intake Scan

As of 2026-06-23, a local scan of:

`/Users/alessandralove/Downloads/Guitar Resources`

found:

- 68 PDF/EPUB files
- 14 files clearly matched to processed blueprint batches by exact path
- 54 files still needing intake triage
- 2 duplicate-filename appearances

The scan file is:

`database-blueprint/source/local_book_inventory_scan.csv`

This count is not the final canonical library count. It is a local-file inventory pass, and some items are duplicates or non-guitar study documents.

An expanded scan including:

- `/Users/alessandralove/Downloads/Guitar Resources`
- `/Users/alessandralove/Downloads/LEARNING`

found 79 PDF/EPUB files.

Expanded inventory file:

`database-blueprint/source/master_book_inventory_v1.csv`

Seed JSON:

`database-blueprint/seeds/master_book_inventory_v1.json`

This is now the best working inventory for the local source library.

Cleaned inventory file:

`database-blueprint/source/master_book_inventory_v2_clean.csv`

Cleaned seed JSON:

`database-blueprint/seeds/master_book_inventory_v2_clean.json`

Duplicate review:

`database-blueprint/source/duplicate_review_v1.csv`

The cleaned inventory groups 79 files into 69 book identities and marks the canonical working copy for duplicate groups.

Cleaned status summary:

- Active Source: 8
- Supporting Reference: 21
- OCR Later: 30
- Private Library: 7
- Duplicate / Archive: 10
- To Review: 3

## Priority Books For Teaching Philosophy And Beginner Foundation

Top source candidates:

1. Jamie Andreas - Principles of Correct Practice for Guitar
2. Mark Phillips & Jon Chappell - Guitar Exercises for Dummies
3. Larry Leavitt - Berklee Practice Method Complete
4. Nelson - Guitar Aerobics
5. Noad - Classical Guitar

Additional important sources already on disk:

- Larry Leavitt - Modern Method for Guitar Complete
- Daniel Levitin - This Is Your Brain on Music
- Maran - Illustrated Guitar

Missing but valuable:

- Mick Goodrick - The Advancing Guitarist
- Desi Serna - Fretboard Theory
- Justin Sandercoe / JustinGuitar progression materials
- Anders Ericsson - Peak

Recently added:

- Aaron Shearer - Learning the Classic Guitar Parts 1-3
- Bill Edwards - Fretboard Logic Box Set
- Charles Kim - Teach Yourself VISUALLY Guitar
- Marc Schonbrun - The Everything Music Theory Book
- Patrick Stefurak - Guitar Building Blocks
- Scott Tennant - Pumping Nylon: Easy to Early Intermediate Repertoire
- Scott Tennant - Pumping Nylon
- Marc Schonbrun - The Everything Rock & Blues Guitar Book
- Ralph Denyer - The Guitar Handbook

## Biggest Gap

The library is strong on "how to play" guitar.

It is thinner on:

- how people learn
- deliberate practice
- teaching design
- skill decomposition
- beginner psychology
- motivation and retention

That gap matters because The Hearth Mastery is not only a content library. It is a teaching environment.

## Current Source Spine

The strongest first source spine is:

1. Jamie Andreas - *Principles of Correct Practice for Guitar*
2. Aaron Shearer - *Learning the Classic Guitar Part 1*
3. Bill Edwards - *Fretboard Logic Box Set*
4. Marc Schonbrun - *The Everything Music Theory Book*
5. K. Anders Ericsson - *Development of Professional Expertise*
6. K. Anders Ericsson et al. - *The Cambridge Handbook of Expertise and Expert Performance*
7. Aniruddh D. Patel - *Music, Language, and the Brain*
8. Daniel J. Levitin - *This Is Your Brain on Music*

Supporting early sources:

- Patrick Stefurak - *Guitar Building Blocks*
- Mark Phillips & Jon Chappell - *Guitar Exercises for Dummies*
