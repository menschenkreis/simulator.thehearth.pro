# Prototype Inventory Snapshot V1

## Source

This snapshot summarizes the full prototype inventory exported on 23 June 2026.

Full preserved source:

`database-blueprint/docs/asset-inventory-prototype-2026-06-23.md`

## Big Picture

The prototype is feature-rich, but its architecture is not yet a stable product foundation.

The strongest assets are:

- learning metaphors
- lesson/content data
- source library
- map/world design
- TeachingEngine
- Journey concept
- Create prompts
- node scene ideas

The weakest parts are:

- monolithic HTML
- duplicated render systems
- global function overrides
- localStorage-only user state
- incomplete database use
- hardcoded data placement
- stale-cache/debugging risk

## Key Numbers

| Area | Count / Size | Notes |
|---|---:|---|
| Main app HTML | 324 KB / 5913 lines | `simulator.html` monolith |
| JavaScript | 720 KB / 37 files | includes node systems, lessons, tools |
| CSS | 32 KB + inline CSS | inline CSS also lives in `simulator.html` |
| SVG assets | 52 KB / 8 files | 2 big scene SVGs, 6 small icons |
| Images | 7.5 MB / 44 files | node icons, character art, symbols |
| Audio | 1.4 MB | campfire ambience |
| Raw PDFs | 894 MB / 33 PDFs | local, mostly not git-safe |
| Processed source books | 53 | structured `.md` source extracts |
| Guitar Tricks course PDFs | 72 PDFs / 3.7 MB | separate catalog |
| Database tables in use | `content_books` only | 53 rows |
| User-facing database tables | 0 | all progress is localStorage |

## Architecture Reality

MariaDB exists, and the app can reach API data, but the simulator is not yet meaningfully database-backed.

Current user-facing state lives in localStorage:

- Foundation progress
- Doing drill state
- Knowing read state
- Knowing quizzes
- Practice sessions
- Journey/student data
- Create notes/projects
- map flame/path state

This confirms the rebuild should separate:

- stable shared content
- media/source library
- node configuration
- lesson steps
- user/student progress
- practice logs
- creative projects

## Important Risk

`scene-first.js` is still identified as the root frontend override problem.

Inventory says it overrides six node show functions.

Rebuild recommendation:

Do not replace this with another global controller. Use routes/components and explicit state.

## Asset Interpretation

The inventory should be treated as a prototype artifact snapshot, not a final design lock.

Some files are live, some are orphaned, some are backups, and some are concept drafts.

Use it to decide:

- what exists
- what is valuable
- what is risky
- what needs migration
- what can be retired

Do not use it to force the rebuild to preserve every file.

## Files Created From This Snapshot

- `database-blueprint/source/prototype_inventory_summary_v1.csv`
- `database-blueprint/seeds/prototype_inventory_summary_v1.json`
- `database-blueprint/source/prototype_local_storage_keys_v1.csv`
- `database-blueprint/seeds/prototype_local_storage_keys_v1.json`
