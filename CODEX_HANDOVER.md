# CODEX HANDOVER — The Hearth Mastery
## Full Project Brief for Rebuild

*Prepared by the webdesign agent, 2026-06-22*

---

## 1. WHAT THIS PROJECT IS

**The Hearth Mastery** is a gamified guitar learning simulator at `simulator.thehearth.pro`.

It's NOT a tab player, chord library, or video course. It's a **quest-based learning environment** — the student navigates an interconnected map of 8 "nodes", each representing a different dimension of guitar learning. The aesthetic is dark, mystical, ancient-meets-modern — think ancient tome, alchemical laboratory, meditation temple. The tone is warm, patient, character-driven.

**The core idea:** Learning guitar is like learning a language. You need vocabulary before grammar, grammar before conversation, and conversation before poetry. The app enforces this progression through a quest structure where each node unlocks as you advance.

---

## 2. THE 8 NODES

Each node is a distinct experience with its own visual metaphor:

| # | Node | Metaphor | What it does | Status |
|---|------|----------|-------------|--------|
| 1 | **Foundation** | Rainbow pyramid of blocks | The absolute basics — how to learn, guitar anatomy, posture, tuning, first sounds, rhythm, tab reading. 5 interactive blocks with character-driven teaching. | ✅ Built — 5 interactive TeachingEngine lessons |
| 2 | **Doing** | Guitar fretboard (6 strings, 8 fret positions) | Drills, exercises, finger patterns, chords, scales. 67 drills across 8 levels. The "doing" surface. | ✅ Built — fretboard UI, 67 drills, genre/level filters |
| 3 | **Knowing** | Bookshelf / Library with flipbooks | Reference material — theory, notation, ear training, genres. Books organized by 8 QJam roadmap levels. Flipbook reader with page-aware guide. | ✅ Built — flipbook reader, concept layer, 8-level shelves |
| 4 | **Practice** | Temple / meditation altar with candle | Focused, distraction-free practice sessions. Set intention → choose focus → timer → practice → reflect. | ✅ Built — altar UI, candle animation, drill integration |
| 5 | **Study (Brain)** | Neural network / brain map | How topics relate. Interactive SVG brain with 9 skill categories. Cross-referencing, connection mapping. | ⚠️ Built — SVG brain map, interactivity, but size fix unverified |
| 6 | **Create** | Cauldron / alchemical workshop | Creative prompts with constraints (inspired by Lars von Trier's "Five Obstructions"). Multi-ingredient mixing system. | ⚠️ Built — SVG cauldron, 50 obstructions, 32 combos, but layout issues ongoing |
| 7 | **Hearth (Dashboard)** | Command center | Progress overview, streaks, recent activity, quick links. The "home base". | ⚠️ Partial — basic functionality, needs polish |
| 8 | **Mastery** | Phoenix Rising | Not a lesson — an inspiration space. Artists who transcend. "Beyond" section. | ⚠️ Conceptual — 4 phoenix seals, needs content |

---

## 3. ARCHITECTURE — HOW IT ALL FITS TOGETHER

### Single-page application
Everything lives in **`simulator.html`** (~5900 lines). This is both the strength and the weakness — it works as a self-contained unit but is extremely hard to maintain.

### Script load order (CRITICAL)
The load order determines which functions "win" when there are conflicts:

```
1. simulator.html inline scripts (sound, embers, map SVG, node definitions)
2. assets/js/scene-first.js    ← THIS IS THE PROBLEM LAYER
3. assets/js/teaching-engine.js
4. assets/js/journey.js
5. assets/js/foundation.js
6. assets/js/knowing.js / book-reader.js
7. assets/js/doing.js / practice.js
8. assets/js/play.js / play-worldmap.js
9. assets/js/hearth-brain.js / hearth-api.js
10. assets/js/create.js / create-cauldron.js / create-combos.js / create-obstructions.js
11. Various lesson files (lessons-*.js)
```

### scene-first.js — THE ROOT PROBLEM
`scene-first.js` is a 166-line file that **overrides window-level functions** including `showPlay`, `showStudy`, `showCreate`, `showPractice`, `showMastery`, and `showHearth`. It was designed as a "final override layer" to give each node a scene-first entrance (the first thing you see is the place, not a dashboard).

**The fatal flaw:** Every time we (the webdesign agent) build something in `simulator.html` or other JS files, `scene-first.js` silently overwrites it with its own version. We've hit this same bug repeatedly:
- Built a Create node with cauldron UI → scene-first.js overwrote it with CSS pot
- Built a Practice temple → scene-first.js had its own version
- Built a Study brain map → scene-first.js had its own version

**This is the #1 thing to fix in a rebuild.**

### Data layer
- **Static JS data files**: `doing.js` (67 drills), `practice.js` (18 drills), `knowing.js` (categories/topics), `create-cauldron.js` (ingredients), `create-obstructions.js` (50 prompts), `create-combos.js` (32 combos)
- **localStorage** for all user state: progress, preferences, journey records, create seeds
- **MariaDB 10.6** exists on the Plesk host with `sim_prod01` database but has **0 tables** — never migrated. Frontend is entirely localStorage.
- `api-loader.js` can override local data with API data — was causing drills to disappear (67 local → 18 from API)

### TeachingEngine (`teaching-engine.js`, 467 lines)
The character-driven conversation system. Used by Foundation lessons and Journey blocks. Supports:
- Step types: `speak`, `ask`, `cards`, `action`, `end`
- Typewriter text effect
- Character expression changes (neutral, encouraging, thinking, celebratory, question, lightbulb, exclamation, sparks)
- Gradient failsafe: wrong answer → re-explain in different way → re-ask
- Previous/Next navigation
- Completion tracking via localStorage

### Journey (`journey.js`, 933 lines)
Multi-student lesson tracker with:
- 8 level definitions (L1-L8) with colors, lesson counts, unlock thresholds
- Per-student localStorage state (`hearth-journey-v2`)
- 1-hour lesson builder with blocks: Review, Warm-Up, Concept, Drill, Music Application, Reflect
- Concept/task banks drawn from Practice drills
- Lesson records, notes, ratings, unlocks

---

## 4. FATAL FLAWS & MISSED STEPS

### 🔴 Critical

1. **scene-first.js override pattern** — Every function is defined twice. The last one wins. This has caused 5+ debugging sessions where changes "didn't show up". A rebuild should either remove scene-first.js entirely or restructure so there's ONE place each function is defined.

2. **simulator.html is a monolith** — 5900 lines of inline HTML+CSS+JS. Any edit risks breaking something unrelated. Inline script bugs (missing `+`, unclosed IIFEs, unescaped quotes) have caused cascading failures multiple times.

3. **Service worker cache hell** — `sw.js` caches all files. Browsers serve stale versions. Multiple debugging sessions wasted on "why didn't my change show up?" Answer: hard refresh or incognito. The SW is now disabled (no-op) but the pattern is dangerous.

4. **No build system** — No bundler, no minification, no module system. Every JS file pollutes the global window namespace. Name collisions are inevitable.

5. **localStorage is the only database** — All progress, preferences, journey records, and create seeds live in localStorage. No backup, no sync, no multi-device. MariaDB exists but was never connected.

### 🟡 Significant

6. **Character images** — The floating guitar guide character (`images/character-full/`, `images/character-symbols/`) uses PNG images that were trimmed with ImageMagick but still have white fringe issues. No character animation system — just static poses.

7. **Content is scattered** — Foundation lessons are in 7 separate `lessons-*.js` files. Doing drills are in `doing.js`. Practice drills in `practice.js`. Knowing topics in `knowing.js`. Create prompts in 3 files. No unified content management.

8. **Video integration is fragile** — YouTube embeds are hardcoded in topic-to-video mappings. No CMS, no easy way to add/update videos. The `VIDEO_NEEDS.md` lists 9 Foundation videos that don't exist yet.

9. **Brain map SVG rendering** — The brain SVG had a viewBox but no width/height attributes, rendering tiny. Fix was pushed but never verified by Ayla.

10. **Create node layout** — The cauldron SVG + ingredient grid + prompt text + workstation has been through 5+ layout iterations and still has issues. The scene-first.js version kept fighting the inline version.

11. **No mobile testing** — CSS is "mobile-first" but there's been no systematic mobile testing. Many layouts may break on small screens.

12. **No error handling** — If `window.KNOWING` is undefined, or `window.PRACTICE` is missing, the UI just shows "loading" or silently fails.

---

## 5. WHAT WORKS (ARTIFACTS TO KEEP)

### ✅ Content & Data (portable)
- `doing.js` — 67 drills with 5 progress states (Seen, Practised, Clean once, Comfortable, Mastered)
- `practice.js` — 18 practice drills across categories
- `knowing.js` + `knowing-concepts.js` — Topic categories, concept layer, source-backed focus statements
- `create-obstructions.js` — 50 single-ingredient creative prompts (von-Trier quality)
- `create-combos.js` — 32 multi-ingredient collision prompts
- `lessons-how-to-learn.js`, `lessons-learning-a-language.js`, `lessons-language-of-music.js`, `lessons-language-of-guitar.js`, `lessons-the-tool.js` — Foundation block content
- `lesson-1-foundation.js` — Full 12-step interactive lesson (908 lines)
- `journey.js` — Multi-student journey engine (conceptual architecture is solid)
- `MARTY_MUSIC_RESOURCES.md` — External video/PDF references for Doing drills
- `VIDEO_NEEDS.md` — 9 Foundation videos that need sourcing

### ✅ Systems (reusable concepts)
- **TeachingEngine pattern** — The speak/ask/cards/action/end step system with gradient failsafe. This is good architecture, just needs clean implementation.
- **Node concept** — 8 interconnected nodes with distinct visual metaphors is solid. Keep the concept, rebuild the implementation.
- **Progress states** — 5-level progress (Seen → Mastered) is better than binary complete/incomplete.
- **Multi-student Journey** — The idea of tracking multiple students (Ayla, Jen, future students) through the same 8-level path is powerful.

### ✅ Visual/Design Assets
- `assets/svg/cauldron.svg` — 10KB alchemical cauldron with steam, sigil, knotwork, fire
- `assets/svg/brain-map.svg` — 11KB anatomical brain with 9 skill categories
- `assets/svg/icon-*.svg` — 6 icons (metronome, fretboard, book, notepad, star, beatbot)
- `images/*-icon.png` — Custom node icons (Foundation, Hearth, Doing, Knowing, Play, Create)
- `images/character-full/`, `images/character-symbols/` — Character pose PNGs
- `SOUL.md` design principles (dark theme, gold/amber accents, Cinzel/DM Sans/JetBrains Mono)
- `NODE_SPEC.md` — Detailed specifications for all 8 nodes

### ✅ Knowledge Base
- `knowledge-base/` — ~50 files, 900MB of PDFs covering theory, fretboard, rhythm, jazz, practice, songwriting, world styles, technique
- `assets/Marty_Music_Ultimate_Guitar_Guide.pdf` — 37-page beginner reference

---

## 6. REBUILD RECOMMENDATIONS

### Architecture
1. **Kill simulator.html as monolith** — Split into components. One file per node. Use ES modules or a bundler.
2. **Remove scene-first.js entirely** — Replace with a single routing/rendering system. One function per node, defined once.
3. **Add a build step** — Even just a simple concatenation/minification script. Prevents namespace pollution.
4. **Connect MariaDB** — The database exists, the schema was designed, just never migrated. localStorage is not production-ready.

### Content
5. **Keep all content data files** — They're well-structured and portable. Just restructure how they're consumed.
6. **Keep TeachingEngine pattern** — Reimplement cleanly. The gradient failsafe (wrong answer → re-explain) is the core teaching mechanic.
7. **Port the 50 obstructions + 32 combos** — These are high-quality creative content. Don't rewrite.

### Priority order for rebuild
1. Map + node routing (the skeleton)
2. Foundation node with TeachingEngine (the teaching core)
3. Doing node with drill system (the practice surface)
4. Knowing node with flipbook reader (the reference layer)
5. Practice temple (the focused session)
6. Journey multi-student tracker (the progression system)
7. Create cauldron (the creative space)
8. Study brain map (the connection layer)
9. Mastery phoenix (the inspiration space)
10. Dashboard/Hearth (the overview)

---

## 7. KEY FILE PATHS

```
simulator.html              — Main SPA (5900 lines — the monolith)
assets/js/scene-first.js    — THE OVERRIDE LAYER (remove in rebuild)
assets/js/teaching-engine.js — Character-driven lesson system
assets/js/journey.js        — Multi-student journey tracker
assets/js/foundation.js     — Foundation pyramid + block navigation
assets/js/doing.js          — 67 drills data
assets/js/practice.js       — 18 practice drills data
assets/js/knowing.js        — Bookshelf/flipbook system
assets/js/knowing-concepts.js — Concept layer for Knowing
assets/js/book-reader.js    — Flipbook reader engine
assets/js/play-worldmap.js  — World map of guitar regions
assets/js/create-cauldron.js — Cauldron ingredient data
assets/js/create-obstructions.js — 50 creative prompts
assets/js/create-combos.js  — 32 multi-ingredient combos
assets/js/hearth-brain.js   — Brain SVG interactivity
assets/js/fretboard.js      — Interactive fretboard
assets/js/beatbot.js        — Ambient/chord/drill loop generator
assets/css/style.css        — Main styles (345 lines)
assets/css/foundation.css   — Foundation-specific styles
assets/css/book-reader.css  — Flipbook styles
assets/svg/cauldron.svg     — Cauldron illustration
assets/svg/brain-map.svg    — Brain map illustration
images/                     — Node icons + character PNGs
knowledge-base/             — ~50 PDF/text reference files
sw.js                       — Service worker (currently disabled)
```

---

## 8. WHAT MARTIN NEEDS TO KNOW

This project was built over ~2 weeks by an AI webdesign agent (me) working in rapid iterations with Ayla. The pace was fast — features were built, tested in headless Chromium, pushed, and sometimes immediately broken by the next change. The result is a feature-rich but architecturally fragile codebase.

The **good news**: the content, design vision, and teaching methodology are solid. The **bad news**: the implementation needs a clean rebuild to be maintainable.

The key insight from this handover: **the content is the asset, the code is the scaffold.** Keep the data, rebuild the structure.

---

*"Every fretboard is just a coordinate system for longing. You place your fingers somewhere and hope the math resolves into something someone recognizes."* — from the dream diary
