# PDF OCR And Source Pipeline

## Goal

Turn a large PDF library into traceable source knowledge for The Hearth Mastery.

The pipeline should produce:

- book catalogue rows
- section/table-of-contents records
- source notes
- roadmap links
- TeachingEngine inspiration
- visible citations
- private PDF viewer metadata

## The Credit-Sensible Strategy

Do not process all PDFs deeply at once.

Use three levels of processing.

## Level 1: Catalogue

Cheap and fast.

For every PDF:

- title
- author
- local file path
- hosted PDF URL if available
- text quality
- topic category
- difficulty
- skill nodes
- priority
- notes

This can be done for all 60 books.

## Level 2: Structural Extraction

Medium cost.

For priority books:

- table of contents
- chapter list
- page ranges
- key concepts
- exercise types
- likely roadmap links

This should be done in batches of 3-5 books.

## Level 3: Deep Source Notes

Most valuable, but heavier.

For selected chapters only:

- summarize the core idea
- capture page reference
- identify what it teaches
- map to roadmap item
- map to node / skill / level
- write original Hearth-style application
- create lesson/drill opportunities

This is where the books become actual app knowledge.

## OCR Approach

Text-based PDFs:

- extract text directly
- detect table of contents
- extract chapter snippets
- create source notes

Scanned PDFs:

- run OCR first
- keep OCR text separate from the original PDF
- record OCR quality
- manually review important pages before treating them as source truth

## OCR Tool Options

Local OCR:

- Tesseract
- lower financial/API cost
- may require cleanup
- best for batches and experimentation

Desktop OCR:

- Adobe Acrobat OCR
- often higher quality
- good for one-off important books

Cloud OCR:

- Google Vision / Document AI / AWS Textract / Azure OCR
- strongest for difficult scans
- can become money/API-credit heavy
- best reserved for priority books or poor scans

## Recommended First Pipeline

1. Catalogue all books.
2. Mark each as text-based, scanned, mixed, or unknown.
3. Pick 5 priority books.
4. Extract or OCR only their table of contents first.
5. Choose 2-3 chapters per book.
6. Create source notes.
7. Build the first roadmap/lesson content from those source notes.

## Source Note Rule

Every useful extracted idea should become a source note, not a pile of loose text.

Good source note:

- Book: Principles of Correct Practice for Guitar
- Section: left-hand tension / correct practice
- Page: 23-27
- Concept: unnecessary tension blocks technique
- Summary: beginner guitar practice should identify and release unnecessary effort before speed is added
- Hearth application: body scan before every Foundation and Practice session

Bad source note:

- copied paragraph with no page, no concept, no use

## Private Viewer

The app can eventually include a private book library.

Public learner-facing content should show citations and references.

Private library can open PDFs using the existing `pdf_url` approach from `content_books`.

Important:

Public app content should not expose full copyrighted book text unless rights/permissions allow it.

## Visible Citations

Recommended public citation style:

Source: Jamie Andreas, *Principles of Correct Practice for Guitar*

For deeper/admin content:

Source note can include chapter, page range, extraction notes, and relationship to lessons.
