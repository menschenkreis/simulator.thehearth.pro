# Book Library Decisions

## Decision 1: Source Locations

The book library currently has two Google Drive folders:

- Knowledge base books: https://drive.google.com/drive/folders/1WhTFAQpwUIQawIBYh9VoCyH--3xS52NB?usp=sharing
- Guitar books: https://drive.google.com/drive/folders/19KapG4mKGaRTyU9JvqsG8dCDdWdQK5vf?usp=sharing

Local source files also exist outside git in:

`knowledge-base/pdfs/`

The prototype app currently reads live book metadata from the MySQL `content_books` table.

## Decision 2: Treat `content_books` As Prototype Infrastructure

The current backend is a prototype. It should inform the rebuild, not constrain it.

Recommendation:

Keep `content_books` working until Martin rebuilds the backend, but do not treat it as the final model.

The current table is useful because it proves the viewer flow:

- API returns book metadata.
- frontend opens `pdf_url`.
- PDF viewer renders the selected book.

The final backend should use a stronger source-library model:

- `book_sources`
- `book_sections`
- `source_notes`

Best future path:

- `book_sources` = canonical book catalogue.
- `book_sections` = table of contents / chapters / page ranges.
- `source_notes` = usable extracted knowledge.
- public API response = a clean viewer-friendly projection of approved books.

## Decision 3: PDF Hosting

Long-term goal:

`https://thehearth.pro/pdfs/`

Google Drive preview URLs are acceptable during the prototype phase, but they should not be the final storage strategy.

Reasons to move to `thehearth.pro/pdfs/`:

- stable URLs
- fewer iframe/permission surprises
- clearer ownership of the app library
- easier future access control
- cleaner database values

## Decision 4: Book Categories

Book categories should be normalized to the 8 app nodes:

- Foundation
- Doing
- Knowing
- Practice
- Study
- Create
- Hearth
- Mastery

The old categories such as `foundation`, `doing`, `create`, `guitar`, `jazz`, and `classical` are prototype-era labels.

They should be mapped into the upgraded node model.

Specialized styles such as jazz, classical, blues, rock, or recording should become tags, style paths, or secondary classifications rather than primary categories.

## Decision 5: Levels

The system should use plain Level 1 through Level 8 as the stable stored level language.

Reason:

Ayla did not resonate with the earlier poetic level names. Plain levels are clearer across guitar, theory, practice, creativity, and future non-guitar simulators.

The interface can still use Hearth voice, color, symbol, or metaphor around those levels, but the database should not depend on poetic names.

## Decision 6: Citations

Visible citations should be simple and subtle.

Recommended learner-facing format:

`Source: Jamie Andreas, Principles of Correct Practice for Guitar`

Optional shorter form inside cards:

`Source: Jamie Andreas`

Admin/source-note records can include page ranges, sections, extraction notes, and deeper reference detail.

## Decision 7: Page References

Exact page references matter.

Source notes should store:

- printed page number where available
- PDF page number
- chapter/section
- extraction/OCR confidence

This is important because scanned PDFs often have PDF pages that do not match printed page numbers.

If only one page number is available at first, store it clearly as either `pdf_page` or `printed_page`.

## Decision 8: Library Access

The PDF library should eventually be available to anyone using the simulator, not only admins.

Important distinction:

- The app may open a PDF using the hosted `pdf_url`.
- Lessons should not reproduce large copyrighted passages.
- The public lesson content should be original Hearth-voice teaching with visible source attribution.

## Decision 9: First Output From Book Processing

When processing books, the first output should be **source notes**.

Do not immediately convert every chapter into lesson content.

Order:

1. catalogue the book
2. identify text quality
3. extract table of contents
4. create source notes
5. map source notes to roadmap/lesson opportunities
6. write Hearth-voice lesson drafts later

This protects traceability. It lets the app say not just "here is a lesson," but "this lesson came from these sources."
