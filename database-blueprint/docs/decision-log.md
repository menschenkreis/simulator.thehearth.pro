# Decision Log

This file tracks product and architecture decisions as Ayla and Codex build the database blueprint.

## Working Agreement

Ayla is an artist and musician, not a software developer.

Codex should continue making recommendations, explaining tradeoffs in plain language, and flagging decisions that might matter later.

## Accepted Recommendations

### 0. Treat prototype artifacts as conceptual drafts

Decision:

The current node visuals, SVGs, UI patterns, and wiring should be treated as concept work, not final product requirements.

Reason:

The prototype was built quickly to discover the world, not to lock the final architecture. Assets such as the map, cauldron, brain map, bookshelf, fretboard grid, and node interiors can all be improved in appearance, function, interaction, and implementation.

Preserve:

- the useful metaphor
- the learner-facing purpose
- the content/data insight
- the emotional direction
- the lessons learned from what broke

Do not blindly preserve:

- exact layout
- exact code wiring
- exact visual treatment
- exact node behavior
- hardcoded data structures

Recommendation:

Use the prototype as a concept archive and evidence log. Rebuild with better structure and design judgment.

Inventory confirmation:

The full prototype inventory confirms the pattern: many valuable assets and content files exist, but the user-facing product is still effectively a localStorage app with a large HTML monolith and scattered JavaScript systems.

See:

- `database-blueprint/docs/prototype-inventory-snapshot-v1.md`

### 1. Use QJam as the technical curriculum spine

Decision:

Use QJamTracks / Rob van Hal's 8-level roadmap as a structural source.

Reason:

It already provides 8 levels, technical disciplines, and YouTube resources.

### 2. Keep levels as Level 1-8

Decision:

Do not force poetic level names.

Reason:

Plain level names are clearer. The app nodes, visual design, and guide voice can carry the mythic/Hearth identity.

### 3. Keep 8 app nodes

Decision:

Keep:

- Foundation
- Doing
- Knowing
- Practice
- Study
- Create
- Hearth
- Mastery

Reason:

They define the world/map of the app.

### 4. Separate technique and improvisation

Decision:

Split QJam's combined "Technique & Improvisation" into two Hearth disciplines.

Reason:

Technique is physical control. Improvisation is musical decision-making under pressure.

### 5. Build Reading Music into Study

Decision:

Reading Music should be part of the Study node, alongside notation, terminology, theory maps, listening, neuroscience, and learning reflection.

Reason:

Study is currently underdeveloped and can become the place where musical understanding is organized.

### 6. Use source notes before lesson drafts

Decision:

Process books into source notes first.

Reason:

This preserves traceability and prevents the app from becoming unsourced lesson content.

### 7. Visible citations should be simple

Decision:

Use simple learner-facing citations such as:

`Source: Jamie Andreas, Principles of Correct Practice for Guitar`

Reason:

It keeps trust visible without making the app feel academic.

### 8. The engine should be reusable beyond guitar

Decision:

Treat The Hearth Mastery as the first domain, not the only possible use of the simulator engine.

Reason:

The same core engine may later support other instruments or entirely different subjects such as medicine exam study.

### 9. Practice should use daily cards with body reflection

Decision:

The Practice node should eventually offer daily practice cards.

Recommended model:

- daily suggested focus
- learner override option
- guided beginner practice
- more self-directed advanced practice
- body/nervous-system reflection after every session

Reason:

This combines the useful structure of *Guitar Aerobics* with The Hearth's deeper focus on embodied learning, attention, and musical meaning.

### 10. Preserve the learning-science anchors

Decision:

The simulator should actively design around:

- absence of mass
- too steep a gradient
- misunderstood words

Reason:

These are not decorative teaching ideas. They explain why learners withdraw, lose caring, or quit.

### 11. Use Understand -> Experience -> Apply -> Own as a default block flow

Decision:

Use this as the standard interior structure for learning blocks unless a node has a strong reason to differ.

Reason:

It gives the learner a staircase: know the idea, feel it, use it, then claim it.

### 12. Keep scene-first as a design principle, not as global override code

Decision:

Every node should open as a place/environment first, but the implementation must not repeat the prototype `scene-first.js` problem.

Reason:

The principle is artistically strong. The prototype implementation was architecturally dangerous.

### 13. Allow one resource to support many roadmap items

Decision:

Do not duplicate reused QJam videos as separate canonical resources.

Reason:

The QJam roadmap sometimes points the same video at multiple levels or disciplines. That is useful information, not necessarily a mistake. The database should store the video once, then attach it to every relevant roadmap item with context notes.

### 14. Treat the prototype as evidence, not the target architecture

Decision:

Use the current simulator flow handoff as a field report.

Reason:

The prototype reveals valuable concepts and painful failure points, but it should not define the rebuilt architecture. Preserve ideas that strengthen the new system. Leave behind brittle implementation details such as global function overrides, duplicate node renderers, and accidental node/category drift.

### 15. Make Foundation the simulator threshold

Decision:

Foundation should be more than beginner guitar basics.

It should teach:

- how the simulator works
- how the 8 nodes relate
- how learning works here
- music as language
- the first physical contact with the guitar
- how to recover from confusion
- how to use books, videos, source notes, and practice

Reason:

This makes Foundation the doorway into the whole learning environment, not a narrow first lesson.

### 16. Keep the Foundation pyramid but database the smaller lesson units

Decision:

Preserve the 7-block pyramid as the visual scene, but store the content as smaller lesson units underneath it.

Reason:

The pyramid is emotionally and visually strong. Smaller database units are easier to source, reorder, expand, test, and reuse in future domains.

### 17. Do not preserve Play as a core node by default

Decision:

The prototype Play/world-map idea is valuable, but it should not automatically replace Hearth as one of the 8 core nodes.

Recommendation:

Treat Play as a World/Traditions pathway that can live under Knowing, Create, or Mastery unless Ayla deliberately chooses it as a core node later.

Reason:

Hearth is central to the platform's neurological, reflective, and cross-domain identity. Play is useful content, but less central to the reusable learning engine.

### 18. Treat the SVG map as data-backed world structure

Decision:

Preserve the SVG map as the symbolic world of the simulator, but rebuild it from node registry data.

Reason:

The map is not just navigation. It is the learner's first sense that this is a living learning world. But the backend and frontend should not hardcode fragile SVG behavior or global click handlers.

Implementation recommendation:

- `app_nodes` stores canonical node identity
- a map-anchor layer stores SVG element IDs, icon keys, route paths, lock states, and positions
- a connection layer stores relationships between nodes
- frontend routes open node scenes cleanly

See:

- `database-blueprint/docs/map-node-registry-v1.md`
- `database-blueprint/source/map_node_registry_v1.csv`
- `database-blueprint/source/map_connections_v1.csv`

### 19. Treat node interiors as different scene types

Decision:

Do not force every node interior into one generic page structure.

Prototype evidence:

- Doing is a CSS fretboard grid, not an SVG.
- Knowing is a bookshelf carousel and reader, not an SVG.
- Hearth is a brain SVG/dashboard, but was blocked by the scene-first override.
- Create is a cauldron SVG plus a prompt engine.

Recommendation:

Build routed node scenes/components with shared data contracts, not one shared DOM panel.

Reason:

The metaphors are strong because each node has its own physical logic. Preserving that does not require preserving the prototype's fragile `#p-foundation` rendering pattern.

See:

- `database-blueprint/docs/node-interior-architecture-v1.md`
- `database-blueprint/source/node_interiors_registry_v1.csv`

### 20. Split Create ingredients into elements and modifiers

Decision:

Do not collapse the Create node into only one ingredient vocabulary.

Reason:

The prototype cauldron used 8 ingredients: emotion, time, constraint, collaboration, cover, genre, acoustic, lyrical.

The newer obstruction/combo prompt system uses 5 creative elements: lyrics, melody, riff, rhythm, story.

Recommendation:

Use both layers:

- creative elements = what the learner is making with
- obstruction modifiers = how the cauldron bends the task

See:

- `database-blueprint/docs/create-cauldron-system-v1.md`
- `database-blueprint/source/create_ingredient_taxonomy_v1.csv`

### 21. Make progression feel like a game-world journey

Decision:

The Hearth should prioritize levels, goals, accomplishments, quests, visible progress, and meaningful wins.

Reason:

The real gem is not a database of lessons. It is a learning world where small honest actions become visible evidence of transformation.

Recommendation:

Use subtle, soulful game mechanics:

- quests
- daily cards
- accomplishment types
- progress states
- level milestones
- map glow
- Hearth reflections
- recovery quests

Avoid:

- casino-style points
- shame streaks
- noisy badges
- fake urgency

See:

- `database-blueprint/docs/game-loop-progression-model-v1.md`

### 22. Separate Map freedom from Journey guidance

Decision:

The Map and Journey should be related but distinct.

- Map = free exploration across the simulator world
- Journey = structured guided path through the world

Reason:

The prototype already discovered something valuable: learners need both freedom and guidance. The Map lets the learner wander. The Journey answers "what should I do next?"

Recommendation:

The Journey should not duplicate the app nodes. It should send the learner into Foundation, Doing, Knowing, Practice, Study, Create, Hearth, and Mastery in a deliberate order.

Keep:

- 8-level spine
- multi-student profiles
- guide character memory
- lesson ratings and notes
- map progress glow

Improve:

- use authored lesson templates before dynamic lesson generation
- allow 5-minute, 20-minute, and full lesson shapes
- unlock with meaningful accomplishments, not only lesson counts
- verify old API sync claims before relying on them
- use numerology as mood/identity, not hidden mechanics

See:

- `database-blueprint/docs/journey-structured-path-model-v1.md`
- `database-blueprint/source/journey_levels_v1.csv`
- `database-blueprint/source/journey_lesson_block_shape_v1.csv`

### 23. Support co-learning teacher mode

Decision:

The simulator should support Ayla's real teaching relationship with Jen.

Reason:

Ayla is learning guitar herself while teaching Jen. She is not teaching from far ahead; she is preparing carefully, staying one step ahead, noticing gaps, and passing the learning on. This is a valid use case and should shape Journey, Hearth, and student profiles.

Recommendation:

Support a workflow where Ayla can:

- prepare before a lesson
- log what happened
- record private teacher notes
- track student gaps and interests
- assign home tasks
- mark what Ayla needs to study before teaching next
- generate a next safe lesson gradient

Current Jen lesson insights:

- body scan worked as an opening ritual
- music-as-language framing is useful
- intervals need physical examples
- rest stroke/free stroke should be reviewed with sound comparison
- call and response worked musically
- A minor pentatonic created a real jam
- E and A string note locations are the next fretboard task
- Jen should bring or create a small pentatonic riff
- Ayla needs a clearer pentatonic explanation before the next lesson

Feature implications:

- chord identifier from selected frets/strings
- tab beside notation in Study/Knowing/Doing
- teacher-prep notes attached to student profiles

See:

- `database-blueprint/docs/co-learning-teacher-mode-v1.md`
- `database-blueprint/docs/jen-next-lesson-prep-v1.md`
- `database-blueprint/source/jen_latest_lesson_log_v1.csv`
- `database-blueprint/source/jen_next_lesson_plan_v1.csv`

### 24. Treat learning profile as adaptive preferences

Decision:

The learning profile should become an optional learner-preference system inside Foundation and Hearth.

Reason:

Ayla's profile revealed a core product truth: the simulator should not only store what a learner studies, but how the learner best stays engaged, recovers from confusion, and turns practice into progress.

Recommendation:

Do not migrate the exact old questionnaire as a heavy test. Preserve the insight and rebuild it as a short, editable onboarding:

- how I take things in
- how I process
- how I show I know
- what motivates me
- what to watch for
- what helps when I get stuck

Feature implications:

- store learning preferences on student profiles
- adapt TeachingEngine stuck states
- show diagrams and maps for spatial learners
- show clear next actions for ambiguity-sensitive learners
- ask about misunderstood words before assuming failure
- add recording prompts for learners motivated by playback
- add teach-back prompts for teacher-learners

See:

- `database-blueprint/docs/learning-profile-onboarding-v1.md`
- `database-blueprint/source/learning_profile_traits_v1.csv`
- `database-blueprint/source/learning_profile_adaptations_v1.csv`

## Current Recommendation From Codex

Build the database blueprint in four layers:

1. World layer: app nodes and simulator structure
2. Curriculum layer: levels, disciplines, roadmap items
3. Source layer: books, videos, source notes, citations
4. Student layer: practice logs, progress, reflections

For Martin:

Keep the core learning engine domain-agnostic. Put guitar-specific concepts in the guitar domain layer.

See also:

`database-blueprint/docs/durable-design-realizations.md`
