# Martin Database Handoff

## Context

The current simulator was built quickly and is feature-rich but fragile. The frontend has strong visual identity and valuable content, but the data layer is not yet solid.

The immediate goal is not to force a perfect backend. The goal is to preserve and structure the learning content so it can survive the rebuild.

Current prototype scale:

- `simulator.html`: 324 KB / 5913 lines
- JavaScript: 720 KB across 37 files
- SVG assets: 52 KB across 8 files
- Images: 7.5 MB across 44 files
- Audio: 1.4 MB campfire ambience
- Raw PDFs: 894 MB across 33 PDFs
- Processed source books: 53
- Database currently used: `content_books` table only, 53 rows
- User-facing database tables: 0
- User progress/state: localStorage

See:

- `database-blueprint/docs/backend-rebuild-priorities-v1.md`
- `database-blueprint/docs/prototype-inventory-snapshot-v1.md`
- `database-blueprint/docs/asset-inventory-prototype-2026-06-23.md`
- `database-blueprint/source/prototype_inventory_summary_v1.csv`
- `database-blueprint/source/prototype_local_storage_keys_v1.csv`

Important framing:

The current visuals, SVGs, node interiors, and interaction patterns are conceptual drafts. They should inform the rebuild, not constrain it. Preserve the strong metaphors and product discoveries, but feel free to improve how things look, what they do, and how they are wired.

In other words:

- keep the map-as-world idea, but rebuild the map cleanly
- keep the cauldron idea, but improve the Create engine
- keep the brain-map idea, but make Hearth genuinely useful
- keep the fretboard/grid metaphor, but move hardcoded drill placement into data
- keep the bookshelf/library metaphor, but make the source system real
- keep scene-first as an experience principle, but not as global override code

Important product context:

The Hearth Mastery guitar simulator is the first implementation, but the long-term intention is a reusable learning-simulator engine. Ayla wants to use the same core engine for other instruments and potentially other fields entirely, such as medicine exam study.

The rebuild should therefore avoid hardcoding guitar concepts into the core engine.

## What Should Become Database-Backed

Priority order:

1. Learning taxonomy: nodes, skill nodes, levels, statuses
2. Roadmap items / learning units
3. Resource library
4. Songbook
5. Practice log
6. TeachingEngine lessons and steps
7. Create node obstructions and combos
8. Student progress and lesson attempts

Recommended first build slice:

Start with a read-only content API for nodes, levels, roadmap items, resources, book/source metadata, and source notes.

Then add admin/import tools.

Then add users, profiles, and progress sync.

Do not start by migrating every prototype file.

See:

- `database-blueprint/docs/backend-rebuild-priorities-v1.md`
- `database-blueprint/docs/do-not-migrate-yet-v1.md`
- `database-blueprint/source/backend_rebuild_priorities_v1.csv`

## Content Model Note

The rebuild should use a simple split:

- shared content = what exists in the simulator
- student memory = what happened for a learner

Shared content includes nodes, roadmap items, lessons, lesson steps, books, source notes, resources, drills, prompts, and media assets.

Student memory includes profiles, learning preferences, progress, lesson attempts, practice sessions, notes, and creative projects.

See:

- `database-blueprint/docs/content-model-v1.md`
- `database-blueprint/docs/learning-profile-onboarding-v1.md`
- `database-blueprint/source/content_model_glossary_v1.csv`
- `database-blueprint/seeds/content_model_glossary_v1.json`

## Game Loop / Progression Note

The Hearth should feel like a learning game/world with visible goals and accomplishments, not a database of lessons.

The core loop should be:

1. enter map
2. choose/current quest
3. do one meaningful action
4. receive feedback
5. earn visible progress
6. reflect briefly
7. return to a changed map

See:

- `database-blueprint/docs/game-loop-progression-model-v1.md`
- `database-blueprint/docs/journey-structured-path-model-v1.md`
- `database-blueprint/docs/prototype-visual-reference-notes-v1.md`
- `database-blueprint/source/journey_levels_v1.csv`
- `database-blueprint/source/journey_lesson_block_shape_v1.csv`
- `database-blueprint/source/accomplishment_types_v1.csv`
- `database-blueprint/source/progress_states_v1.csv`
- `database-blueprint/source/quest_types_v1.csv`
- `database-blueprint/source/game_loop_events_v1.csv`

Journey clarification:

- Map = free exploration across the learning world.
- Journey = structured guided path through that world.
- Journey should use the nodes as destinations rather than duplicating them as a separate silo.
- Keep the multi-student/profile concept, but model it cleanly as student profiles and student memory.
- Treat the prototype API sync claims as unverified until Martin checks the backend.

Teaching / co-learning note:

Ayla is using the simulator both for her own guitar learning and to guide Jen, a real guitar student. The app should support a co-learning teacher workflow where Ayla studies one step ahead, teaches the lesson, logs what happened, and uses the system to prepare the next gradient.

See:

- `database-blueprint/docs/co-learning-teacher-mode-v1.md`
- `database-blueprint/docs/jen-next-lesson-prep-v1.md`
- `database-blueprint/source/jen_latest_lesson_log_v1.csv`
- `database-blueprint/source/jen_next_lesson_plan_v1.csv`

## Foundation Rebuild Note

Foundation should be treated as the simulator threshold, not merely a guitar-basics unit.

The recommended shape is:

- one Foundation app node
- seven visual pyramid blocks
- smaller database-backed lesson units underneath those blocks
- TeachingEngine-compatible steps
- source-note links per unit
- action renderer keys for custom interactions

See:

- `database-blueprint/docs/foundation-comprehensive-blueprint-v1.md`
- `database-blueprint/source/foundation_comprehensive_map_v1.csv`
- `database-blueprint/seeds/foundation_comprehensive_map_v1.json`

Important architecture point:

The frontend should not store giant render functions inside roadmap content. Database records should name an action renderer key such as `foundation.body_scan` or `foundation.e_major_chord`; the frontend should own the rendering component.

Recommended Foundation action renderer keys:

- `foundation.node_map`
- `foundation.stuck_recovery`
- `foundation.body_scan`
- `foundation.first_sounds`
- `foundation.open_fret_open`
- `foundation.e_major_chord`

First Foundation step-plan batch:

- `database-blueprint/docs/foundation-lesson-step-plan-batch-001.md`
- `database-blueprint/source/foundation_lesson_step_plan_batch_001.csv`
- `database-blueprint/seeds/foundation_lesson_step_plan_batch_001.json`

This expands FND-001 through FND-005 into TeachingEngine-style step plans.

## SVG Map / Node Registry Note

The map should be preserved as the symbolic world of the simulator.

It should become data-backed rather than hardcoded:

- app node identity
- icon key
- route path
- unlock rule
- progress state
- SVG anchor/element ID
- connection lines

See:

- `database-blueprint/docs/map-node-registry-v1.md`
- `database-blueprint/docs/svg-map-technical-notes-v1.md`
- `database-blueprint/docs/map-reference-prototype-2026-06-23.md`
- `database-blueprint/source/map-raw.svg`
- `database-blueprint/source/map_node_registry_v1.csv`
- `database-blueprint/source/map_connections_v1.csv`
- `database-blueprint/source/map_svg_nodes_v1.csv`
- `database-blueprint/source/map_svg_connections_v1.csv`

Important distinction:

The screenshot appears to show more visual anchors than the agreed core 8 product nodes. The rebuild should separate `app_nodes` from `map anchors` so decorative, central, or optional pathway points do not distort the content model.

Likely recommendation:

Keep Hearth as a core node. Preserve the old Play/world-map idea as an optional World Traditions pathway under Knowing, Create, or Mastery unless Ayla explicitly re-promotes it.

Prototype-specific notes:

- the SVG uses `viewBox="0 0 700 1000"`
- node groups use inline `showNodePreview`, `hideNodePreview`, and `showNodeInfo` handlers
- `practise` is the prototype SVG data-node, but `practice` is the action key and recommended canonical database slug
- most gold branch connections have no stable ID; they should receive stable IDs in the rebuild

## Node Interior Architecture Note

The node interiors are not all the same type of page.

These interiors are still concept drafts. The exported files document what exists and what was learned, not what must be reproduced pixel-for-pixel.

Key prototype facts:

- Doing is not SVG. It is a CSS grid fretboard: 6 strings by 8 levels.
- Knowing is not SVG. It is an 8-level bookshelf carousel and flipbook reader.
- Hearth has an SVG brain map and supporting `hearth-brain.js`, but it never reached the live site because `scene-first.js` overrode `showHearth()`.
- Create has a strong cauldron SVG scene plus a data-driven prompt engine.
- Most nodes currently render into `#p-foundation`, which should not be preserved as an architectural pattern.

Create-specific note:

The cauldron SVG is decorative, embedded as an image in `.cauldron-vessel`. The actual interaction is HTML/CSS/JS: ingredient buttons, selected states, stir button, prompt overlay, bubbling animation, notes, and project saving.

There are two useful ingredient vocabularies to reconcile:

- 5 creative elements from the newer obstruction/combo prompts: lyrics, melody, riff, rhythm, story
- 8 obstruction modifiers from the older cauldron prototype: emotion, time, constraint, collaboration, cover, genre, acoustic, lyrical

Recommendation: support both layers rather than choosing one too early.

See:

- `database-blueprint/docs/prototype-artifact-policy.md`
- `database-blueprint/docs/node-interior-architecture-v1.md`
- `database-blueprint/docs/svg-asset-inventory-v1.md`
- `database-blueprint/docs/character-and-learning-asset-registry-v1.md`
- `database-blueprint/docs/node-reference-prototype-2026-06-23.md`
- `database-blueprint/assets/svg/brain-map.svg`
- `database-blueprint/assets/svg/cauldron.svg`
- `database-blueprint/assets/svg/icon-fretboard.svg`
- `database-blueprint/assets/svg/icon-book.svg`
- `database-blueprint/source/node_interiors_registry_v1.csv`
- `database-blueprint/source/doing_fretboard_string_map_v1.csv`
- `database-blueprint/source/doing_levels_v1.csv`
- `database-blueprint/source/knowing_levels_v1.csv`
- `database-blueprint/source/hearth_brain_skill_regions_v1.csv`
- `database-blueprint/docs/create-cauldron-system-v1.md`
- `database-blueprint/source/create_cauldron_wiring_v1.csv`
- `database-blueprint/source/create_ingredient_taxonomy_v1.csv`
- `database-blueprint/source/character_asset_registry_v1.csv`
- `database-blueprint/source/learning_how_to_learn_assets_v1.csv`

SVG inventory note:

- `brain-map.svg` and `cauldron.svg` are the important big scene SVGs.
- `brain-map.svg` was built but blocked by `scene-first.js`.
- `cauldron.svg` is live and decorative.
- the six `icon-*.svg` files are simple 24 by 24 gold-stroke toolkit/UI icons with no internal interactivity.
- only `icon-fretboard.svg` and `icon-book.svg` have currently been copied into this blueprint folder; the other small icons should be copied later if Martin needs the full asset set.

Character and Foundation visual note:

- The floating guitar guide should be treated as a reusable character system, not a loose image.
- There are full-body, face-only, and symbol/emphasis variants.
- TeachingEngine steps and node guide messages should reference a character mood or asset key, rather than hardcoded raw PNG paths.
- The "learning how to learn" images map directly to Foundation's three barriers: absence of mass, misunderstood word, and skipped gradient.
- These should be stored in `media_assets` and referenced by lesson steps/cards/actions.

Recommendation:

Build node interiors as routed scenes/components. Keep the metaphors, but do not keep the shared-panel overwrite pattern.

## Suggested Technical Direction

Use MariaDB or MySQL-compatible SQL.

Recommended backend basics:

- authenticated API
- input validation
- rate limiting
- CORS configured for `simulator.thehearth.pro`
- CSRF protection if using cookie/session auth
- audit timestamps on all meaningful tables
- uniqueness constraints for slugs and stable identifiers
- soft delete where content may be retired rather than destroyed

## Content Tables vs User Tables

Separate content from student activity.

Also separate generic learning-platform concepts from guitar-specific domain concepts.

Content tables:

- nodes
- skill_nodes
- mastery_levels
- roadmap_items
- resources
- book_sources
- book_files
- book_sections
- source_notes
- songs
- teaching_lessons
- teaching_steps
- create_obstructions
- create_combos

User/student tables:

- users
- student_profiles
- practice_sessions
- lesson_attempts
- progress_records
- student_notes

Learning profile note:

Leave room on `student_profiles` for editable learner preferences. This can start as JSON and later become normalized tables. The goal is not personality typing; it is adaptive support for things like gradient recovery, misunderstood words, diagrams, recording prompts, and clear next actions.

Future platform/domain tables may be useful:

- projects or learning_domains
- domain-specific settings
- domain-specific renderers/components
- reusable lesson step types
- domain-specific extensions such as chord diagrams or medical case prompts

This matters because content is shared by everyone, while progress belongs to a person.

It also matters because the same engine should later support a different domain without a total rewrite.

## Book Library Model

The book library should not be modelled as one flat `content_books` row per file.

Current local inventory found 79 PDF/EPUB files but only 69 book identities.

Recommended split:

- `book_sources`: the intellectual/book identity, such as title, author, topic, citation, source status
- `book_files`: the local or hosted file copies attached to that book identity

This allows:

- one canonical working copy
- duplicate/archive file copies
- future hosted URLs under `thehearth.pro/pdfs/`
- local private-library files
- clean citation/source-note links

The schema proposal now includes `book_files` for this reason.

## API Shape Recommendation

The frontend should be able to request content by area:

- `GET /api/mastery/taxonomy`
- `GET /api/mastery/roadmap`
- `GET /api/mastery/resources`
- `GET /api/mastery/songs`
- `GET /api/mastery/create/obstructions`
- `GET /api/mastery/create/combos`
- `GET /api/mastery/lessons/:slug`

And student data separately:

- `GET /api/mastery/me/progress`
- `POST /api/mastery/me/practice-sessions`
- `POST /api/mastery/me/lesson-attempts`
- `POST /api/mastery/me/notes`

## Important Migration Note

The current app uses localStorage heavily. Do not remove it all at once.

Better path:

1. Keep localStorage as offline fallback.
2. Add API-backed loading for stable content.
3. Add authenticated sync for student progress.
4. Add clear conflict rules later.

## Current Seed Files

Generated seed JSON exists in:

- `database-blueprint/seeds/content_books_current_seed.json`
- `database-blueprint/seeds/qjam_youtube_links_clean.json`
- `database-blueprint/seeds/qjam_youtube_links_seed.json`

Original handoff files remain in:

- `database-blueprint/source/`

Important current source files:

- `database-blueprint/source/qjam_youtube_links_clean.csv`
- `database-blueprint/source/qjam_disciplines_seed.csv`
- `database-blueprint/source/hearth_8_levels_seed.csv`
- `database-blueprint/source/pdf_drop_batch_001_triage.csv`
- `database-blueprint/source/pdf_drop_batch_002_triage.csv`
- `database-blueprint/source/pdf_drop_batch_003_triage.csv`
- `database-blueprint/source/local_book_inventory_scan.csv`
- `database-blueprint/source/master_book_inventory_v1.csv`
- `database-blueprint/seeds/master_book_inventory_v1.json`
- `database-blueprint/source/master_book_inventory_v2_clean.csv`
- `database-blueprint/seeds/master_book_inventory_v2_clean.json`
- `database-blueprint/source/duplicate_review_v1.csv`
- `database-blueprint/source/source_priority_map_v1.csv`
- `database-blueprint/seeds/source_priority_map_v1.json`
- `database-blueprint/source/book_sources_from_inventory_seed.csv`
- `database-blueprint/seeds/book_sources_from_inventory_seed.json`
- `database-blueprint/source/book_files_from_inventory_seed.csv`
- `database-blueprint/seeds/book_files_from_inventory_seed.json`
- `database-blueprint/source/ocr_queue.csv`
- `database-blueprint/source/source_notes_priority_001_everything_music_theory.csv`
- `database-blueprint/source/source_notes_priority_002_ericsson_professional_expertise.csv`
- `database-blueprint/source/source_notes_priority_003_patel_music_language_brain.csv`
- `database-blueprint/docs/video-resource-access-plan.md`
- `database-blueprint/source/justinguitar_screenshot_journey_seed.csv`
- `database-blueprint/docs/justinguitar-journey-gap-analysis.md`
- `database-blueprint/source/source_notes_batch_002_levitin_brain_on_music.csv`
- `database-blueprint/source/source_notes_batch_002_shearer_visual_toc.csv`
- `database-blueprint/source/foundation_comprehensive_map_v1.csv`
- `database-blueprint/seeds/foundation_comprehensive_map_v1.json`
- `database-blueprint/source/map_node_registry_v1.csv`
- `database-blueprint/source/map_connections_v1.csv`
- `database-blueprint/docs/svg-map-technical-notes-v1.md`
- `database-blueprint/docs/map-reference-prototype-2026-06-23.md`
- `database-blueprint/source/map-raw.svg`
- `database-blueprint/source/map_svg_nodes_v1.csv`
- `database-blueprint/seeds/map_svg_nodes_v1.json`
- `database-blueprint/source/map_svg_connections_v1.csv`
- `database-blueprint/seeds/map_svg_connections_v1.json`
- `database-blueprint/docs/node-interior-architecture-v1.md`
- `database-blueprint/docs/prototype-artifact-policy.md`
- `database-blueprint/docs/svg-asset-inventory-v1.md`
- `database-blueprint/docs/node-reference-prototype-2026-06-23.md`
- `database-blueprint/assets/svg/brain-map.svg`
- `database-blueprint/assets/svg/cauldron.svg`
- `database-blueprint/assets/svg/icon-fretboard.svg`
- `database-blueprint/assets/svg/icon-book.svg`
- `database-blueprint/source/node_interiors_registry_v1.csv`
- `database-blueprint/seeds/node_interiors_registry_v1.json`
- `database-blueprint/source/doing_fretboard_string_map_v1.csv`
- `database-blueprint/seeds/doing_fretboard_string_map_v1.json`
- `database-blueprint/source/doing_levels_v1.csv`
- `database-blueprint/seeds/doing_levels_v1.json`
- `database-blueprint/source/knowing_levels_v1.csv`
- `database-blueprint/seeds/knowing_levels_v1.json`
- `database-blueprint/source/hearth_brain_skill_regions_v1.csv`
- `database-blueprint/seeds/hearth_brain_skill_regions_v1.json`
- `database-blueprint/docs/create-cauldron-system-v1.md`
- `database-blueprint/source/create_cauldron_wiring_v1.csv`
- `database-blueprint/seeds/create_cauldron_wiring_v1.json`
- `database-blueprint/source/create_ingredient_taxonomy_v1.csv`
- `database-blueprint/seeds/create_ingredient_taxonomy_v1.json`
- `database-blueprint/source/svg_asset_inventory_v1.csv`
- `database-blueprint/seeds/svg_asset_inventory_v1.json`
- `database-blueprint/docs/prototype-inventory-snapshot-v1.md`
- `database-blueprint/docs/backend-rebuild-priorities-v1.md`
- `database-blueprint/docs/do-not-migrate-yet-v1.md`
- `database-blueprint/docs/asset-inventory-prototype-2026-06-23.md`
- `database-blueprint/source/prototype_inventory_summary_v1.csv`
- `database-blueprint/seeds/prototype_inventory_summary_v1.json`
- `database-blueprint/source/prototype_local_storage_keys_v1.csv`
- `database-blueprint/seeds/prototype_local_storage_keys_v1.json`
- `database-blueprint/source/backend_rebuild_priorities_v1.csv`
- `database-blueprint/seeds/backend_rebuild_priorities_v1.json`
- `database-blueprint/docs/content-model-v1.md`
- `database-blueprint/source/content_model_glossary_v1.csv`
- `database-blueprint/seeds/content_model_glossary_v1.json`
- `database-blueprint/docs/game-loop-progression-model-v1.md`
- `database-blueprint/docs/prototype-visual-reference-notes-v1.md`
- `database-blueprint/source/accomplishment_types_v1.csv`
- `database-blueprint/seeds/accomplishment_types_v1.json`
- `database-blueprint/source/progress_states_v1.csv`
- `database-blueprint/seeds/progress_states_v1.json`
- `database-blueprint/source/quest_types_v1.csv`
- `database-blueprint/seeds/quest_types_v1.json`
- `database-blueprint/source/game_loop_events_v1.csv`
- `database-blueprint/seeds/game_loop_events_v1.json`
- `database-blueprint/docs/foundation-lesson-step-plan-batch-001.md`
- `database-blueprint/source/foundation_lesson_step_plan_batch_001.csv`
- `database-blueprint/seeds/foundation_lesson_step_plan_batch_001.json`

## Open Product Decisions

These should be decided before final schema lock:

- Are Foundation, Doing, Knowing, etc. app nodes, skill nodes, or both?
- Should the 14-stage roadmap replace the 8-node map, or sit underneath it?
- Should TeachingEngine lessons be authored in the database, JSON files, or a hybrid?
- Should Create prompts be editable through an admin tool?
- Does one user have many student profiles, or is one user always one student?
- Should the rebuild include a generic `learning_domains/projects` layer now, or should Martin keep that as a near-future migration?
- Which lesson step types are truly generic, and which are guitar-specific renderers?
- Should the prototype Play/world-map content become a pathway under Knowing/Create/Mastery, or should Ayla intentionally re-promote it to a core node?

## Recommended First Build Slice

Build a thin content API around:

1. taxonomy
2. roadmap items
3. resources

Then connect the frontend to read those without touching progress/auth yet.

That gives Ayla a stable content library while leaving the more sensitive user-account layer for a second pass.
