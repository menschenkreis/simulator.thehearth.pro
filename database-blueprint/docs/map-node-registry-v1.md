# Map Node Registry V1

## Purpose

The SVG map is the world skeleton of The Hearth Mastery.

It should not be treated as decorative navigation. It is the first expression of the simulator's learning cosmology: the learner moves through places, not menu items.

This document turns that visual idea into database guidance.

## Core Recommendation

Keep the symbolic SVG map.

Rebuild it so the visible map reads from clean data:

- node slug
- node name
- icon
- route
- unlock rule
- progress state
- node description
- map position or visual anchor
- connection lines
- available actions

Do not preserve the old global `scene-first.js` override pattern. Scene-first is a design principle, not a frontend control hack.

## Current Prototype SVG Facts

Known coordinate system:

`viewBox="0 0 700 1000"`

Known node coordinates:

- Foundation: `(350, 73)`
- Doing: `(146, 283)`
- Knowing: `(554, 283)`
- Practice / Practise: `(248, 388)`
- Study: `(452, 388)`
- The Hearth: `(350, 494)`
- Play: `(88, 682)`
- Create: `(612, 682)`
- Mastery: `(350, 813)`

Known interaction:

- node hover calls `showNodePreview`
- node click calls `showNodeInfo`
- tooltip overlay ID is `#ni`
- tooltip includes emoji, tag, title, description, and Enter Node button

See also:

`database-blueprint/docs/svg-map-technical-notes-v1.md`

## Important Distinction

Separate these two concepts:

### App Node

A real learning area that owns content and progress.

Examples:

- Foundation
- Doing
- Knowing
- Practice
- Study
- Create
- Hearth
- Mastery

### Map Anchor

A visible point on the SVG map.

A map anchor may represent:

- one app node
- a decorative/progress marker
- a central hub
- a future pathway
- a relationship point

This distinction matters because the screenshot appears to show more visual circles than the current agreed 8-node product structure. We should not let the visual count force a bad data model.

The full coordinate list confirms that the prototype map has nine visible named nodes if Play is counted alongside Hearth. The registry therefore stores Play as a prototype map node but not as a recommended core node.

## Recommended Core 8 App Nodes

### Foundation

Scene:

The threshold / pyramid.

Purpose:

Orient the learner into the simulator, the learning method, music as language, and first contact with the guitar.

Owns:

- Foundation lesson blocks
- onboarding lessons
- first guitar actions
- beginner recovery logic

Progress:

- lesson unit completion
- block completion
- first-action attempts

### Doing

Scene:

The fretboard / physical skill map.

Purpose:

Build physical control through drills, technique, rhythm, chord changes, fretboard movement, and repeatable practice tasks.

Owns:

- drills
- exercises
- pass conditions
- technique coaching

Progress:

- drill state
- tempo
- clean attempts
- comfort/mastery state

### Knowing

Scene:

The library / bookshelf.

Purpose:

Provide source-backed reference knowledge: books, concepts, vocabulary, glossary, topic summaries, diagrams, and citations.

Owns:

- books
- source notes
- reference entries
- glossary links

Progress:

- read/unread
- saved references
- source-note links

### Practice

Scene:

The temple / candle / metronome.

Purpose:

Guide focused sessions with warm-up, drill, application, reflection, and body awareness.

Owns:

- practice sessions
- practice cards
- timer settings
- metronome settings
- reflections

Progress:

- minutes
- streak
- session feeling
- repeated drill history

### Study

Scene:

The mind map / study chamber.

Purpose:

Organise concepts, reading music, theory relationships, terms, quizzes, and misunderstood-word recovery.

Owns:

- study pathways
- quizzes
- concept maps
- reading-music progression
- term checks

Progress:

- quiz state
- concept confidence
- review-needed state

### Create

Scene:

The cauldron.

Purpose:

Turn learning into creative output through obstructions, ingredients, emotional risk, composition prompts, and saved seeds.

Owns:

- single-ingredient obstructions
- multi-ingredient combos
- saved seeds
- creative notes

Progress:

- saved projects
- prompt history
- selected ingredients

### Hearth

Scene:

The inner hearth / nervous-system dashboard.

Purpose:

Hold the reflective, neurological, and cross-domain learning layer: why study changes the learner, how practice affects the body and mind, and how the journey is progressing.

Owns:

- learner reflections
- learning-science lessons
- journey overview
- progress memory
- personal profile

Progress:

- reflections
- learning profile
- journey state
- cross-node summary

### Mastery

Scene:

The phoenix / beyond-technique chamber.

Purpose:

Show artistry beyond drills: great players, style, expression, voice, performance, taste, and long-range inspiration.

Owns:

- mastery exemplars
- artist references
- advanced concepts
- inspiration library

Progress:

- viewed inspirations
- saved artists
- long-range goals

## Play / World Map Recommendation

The prototype has a Play/world-traditions concept.

Recommendation:

Do not make Play a core app node by default.

Instead, preserve it as a future pathway called something like:

- World Traditions
- Listening Worlds
- Musical Cultures
- Songs and Traditions

Likely homes:

- Knowing, if it is mainly reference
- Create, if it becomes creative influence
- Mastery, if it becomes style/artistry inspiration

Reason:

Hearth is more central to the identity of this platform as a reusable learning simulator. Play is a valuable content area, but it does not need to displace Hearth.

## Visual Map Guidance

The map should open first as a place.

However, the frontend should use ordinary routing and state:

- `/map`
- `/nodes/foundation`
- `/nodes/doing`
- `/nodes/knowing`
- `/nodes/practice`
- `/nodes/study`
- `/nodes/create`
- `/nodes/hearth`
- `/nodes/mastery`

Recommended frontend behavior:

- map renders from node registry
- node click opens the node route
- locked nodes display locked state but still explain what they are
- hover or focus shows node purpose
- progress rings come from student progress data
- connection lines come from map connection data

## Suggested Database Shape

The existing `app_nodes` table can store the canonical node identity.

Recommended additional table:

`app_node_map_anchors`

Suggested fields:

- `id`
- `app_node_id`
- `anchor_slug`
- `prototype_data_node`
- `svg_element_id`
- `icon_key`
- `icon_file`
- `position_x`
- `position_y`
- `ring_radius`
- `touch_radius`
- `image_x`
- `image_y`
- `image_width`
- `image_height`
- `clip_path_id`
- `ring`
- `visual_role`
- `default_locked`
- `unlock_rule_key`
- `action_key`
- `tooltip_tag`
- `route_path`
- `sort_order`

Recommended additional table:

`app_node_connections`

Suggested fields:

- `id`
- `from_node_id`
- `to_node_id`
- `connection_type`
- `svg_element_id`
- `svg_element_type`
- `css_class`
- `data_path`
- `x1`
- `y1`
- `x2`
- `y2`
- `path_d`
- `stroke_width`
- `sort_order`

This avoids hardcoding the SVG structure into lesson content.

## Prototype SVG Data Captured

The raw SVG export has now been preserved and translated into technical seed files.

Preserved source:

- `database-blueprint/source/map-raw.svg`
- `database-blueprint/docs/map-reference-prototype-2026-06-23.md`

Technical seeds:

- `database-blueprint/source/map_svg_nodes_v1.csv`
- `database-blueprint/seeds/map_svg_nodes_v1.json`
- `database-blueprint/source/map_svg_connections_v1.csv`
- `database-blueprint/seeds/map_svg_connections_v1.json`

Important finding:

The prototype node groups mostly use `data-node` attributes rather than stable SVG group IDs. Most gold branch connections have no unique IDs. For the rebuild, add stable IDs while preserving the same coordinates and visual structure.

## Principle To Preserve

The learner should feel:

`I am entering a symbolic world that remembers my journey.`

Not:

`I am opening a folder of lessons.`
