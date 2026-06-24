# THE HEARTH MASTERY — COMPLETE ASSET INVENTORY
Generated: 23 June 2026

---

## PROJECT ROOT
Repo: `/home/emanuel/.openclaw/workspace/simulator.thehearth.pro/`
Total size (excl .git): **27 MB** (excluding 894MB knowledge-base PDFs)

---

## HTML PAGES

| File | Size | Purpose | Status |
|------|------|---------|--------|
| `simulator.html` | 324 KB | Main app (monolith, 5913 lines) | ✅ Live |
| `index.html` | 8 KB | Landing/splash page | ✅ Live |
| `admin.html` | 32 KB | Admin panel | ✅ Live |
| `boot-sequence.html` | 12 KB | Boot/loading sequence | ✅ Live |
| `fcp-prototype.html` | 68 KB | FCP prototype (unused) | ⚠️ Orphan |
| `learning-profile-questionnaire.html` | 44 KB | Learning profile quiz | ✅ Live |
| `learning-profile-questionnaire.html.bak` | 44 KB | Backup of above | ⚠️ Backup |
| `simulator-prototype.html` | 32 KB | Early prototype | ⚠️ Orphan |

---

## JAVASCRIPT (assets/js/) — 720 KB total

### Core Systems
| File | Size | Purpose |
|------|------|---------|
| `scene-first.js` | 32 KB | **⚠️ ROOT PROBLEM** — overrides 6 node show functions |
| `teaching-engine.js` | 20 KB | Interactive lesson framework (solid) |
| `foundation.js` | 28 KB | Foundation node (pyramid + blocks) |
| `doing.js` | 28 KB | Doing node (67+ drills, fretboard grid) |
| `knowing.js` | 84 KB | Knowing node (encyclopedia, 100+ topics) |
| `knowing-concepts.js` | 24 KB | Extended knowing concepts |
| `practice.js` | 12 KB | Practice node (session structure) |
| `practice-room.js` | 16 KB | Practice room UI |
| `play.js` | 8 KB | Play node (stub) |
| `play-world.js` | 12 KB | Play world traditions |
| `play-worldmap.js` | 20 KB | World map SVG interaction |
| `study-key.js` | 12 KB | Study node (key signatures) |
| `create.js` | 8 KB | Create node (stub) |
| `create-cauldron.js` | 8 KB | Cauldron UI component |
| `create-obstructions.js` | 16 KB | Five Obstructions system |
| `create-combos.js` | 16 KB | Ingredient combinations |
| `create-workshop.js` | 12 KB | Workshop/project builder |
| `journey.js` | 68 KB | Multi-student journey system |
| `hearth-brain.js` | 16 KB | Brain map (NOT DEPLOYED) |
| `hearth-api.js` | 12 KB | API integration |
| `api-loader.js` | 8 KB | Content API loader |

### Lesson Content
| File | Size | Purpose |
|------|------|---------|
| `lesson-1-foundation.js` | 48 KB | Foundation lesson data (massive) |
| `lessons-how-to-learn.js` | 16 KB | Block 1 content |
| `lessons-learning-a-language.js` | 12 KB | Block 2 content |
| `lessons-language-of-music.js` | 12 KB | Block 3 content |
| `lessons-language-of-guitar.js` | 12 KB | Block 4 content |
| `lessons-the-guitar.js` | 8 KB | Block 5 content |
| `lessons-the-tool.js` | 12 KB | Block 5 (The Tool) |
| `lessons-speaking.js` | 8 KB | Block 7 content |
| `lessons-conversations.js` | 12 KB | Block 7 content |

### Tools & Utilities
| File | Size | Purpose |
|------|------|---------|
| `fretboard.js` | 12 KB | Interactive fretboard component |
| `beatbot.js` | 12 KB | Beat Bot (ambient loops) |
| `book-reader.js` | 20 KB | Flipbook reader for Knowing |
| `page-flip.browser.min.js` | 44 KB | Page flip animation library |
| `video-roadmap.js` | 12 KB | Video roadmap component |
| `references.js` | 8 KB | References panel |
| `pdf-viewer.js` | 8 KB | PDF viewer component |

---

## CSS (assets/css/) — 32 KB total

| File | Size | Purpose |
|------|------|---------|
| `style.css` | 8 KB | Main styles + variables |
| `foundation.css` | 8 KB | Foundation node styles |
| `book-reader.css` | 12 KB | Flipbook reader styles |

Plus **inline CSS** in simulator.html (~400 lines, lines 15-500)

---

## SVG ASSETS (assets/svg/) — 52 KB total

| File | Size | ViewBox | Purpose | Status |
|------|------|---------|---------|--------|
| `brain-map.svg` | 12 KB | 1600×950 | Hearth brain (9 skill regions) | ❌ Not deployed |
| `cauldron.svg` | 12 KB | 1024×1024 | Create node cauldron | ✅ Live |
| `icon-fretboard.svg` | 4 KB | 24×24 | Doing toolkit icon | ✅ Live |
| `icon-book.svg` | 4 KB | 24×24 | Knowing toolkit icon | ✅ Live |
| `icon-beatbot.svg` | 4 KB | 24×24 | Beat Bot toolkit icon | ✅ Live |
| `icon-metronome.svg` | 4 KB | 24×24 | Metronome toolkit icon | ✅ Live |
| `icon-notepad.svg` | 4 KB | 24×24 | Notes toolkit icon | ✅ Live |
| `icon-star.svg` | 4 KB | 24×24 | Star/general icon | ✅ Live |

---

## IMAGES (images/) — 7.5 MB, 44 files

### Node Icons (used in map SVG via clipPath)
| File | Size | Node |
|------|------|------|
| `foundation-icon.png` | 4 KB | Foundation |
| `doing-icon.png` | 12 KB | Doing |
| `doing-icon.jpg` | 44 KB | Doing (alt) |
| `knowing-icon.png` | 8 KB | Knowing |
| `knowing-icon.jpg` | 40 KB | Knowing (alt) |
| `knowing-icon-new.png` | 24 KB | Knowing (v2) |
| `knowing-icon-old.png` | 140 KB | Knowing (old) |
| `knowing-icon-transparent.png` | 8 KB | Knowing (transparent) |
| `knowing-icon-v2.png` | 28 KB | Knowing (v2 alt) |
| `knowing-icon-brain.png` | 100 KB | Knowing (brain variant) |
| `practise-icon.png` | 16 KB | Practise |
| `study-icon.png` | 24 KB | Study |
| `play-icon.png` | 16 KB | Play |
| `create-icon.png` | 12 KB | Create |
| `hearth-icon.png` | 16 KB | Hearth |
| `hearth-icon-new.png` | 68 KB | Hearth (new) |
| `mastery-icon.png` | 12 KB | Mastery |

### Character Art
| File | Size | Purpose |
|------|------|---------|
| `character-neutral.png` | 108 KB | Guide character (standalone) |
| `character-face/Neutral.png` | 92 KB | Teaching engine face |
| `character-face/Encouraging.png` | 88 KB | Teaching engine face |
| `character-face/Thinking.png` | 80 KB | Teaching engine face |
| `character-face/Celebratory.png` | 88 KB | Teaching engine face |
| `character-full/Neutral.png` | 932 KB | Full body (high-res) |
| `character-full/Encouraging.png` | 940 KB | Full body |
| `character-full/Thinking.png` | 956 KB | Full body |
| `character-full/Celebratory.png` | 960 KB | Full body |
| `character-symbols/Think Exclamation Mark.png` | 40 KB | Symbol variant |
| `character-symbols/Thinking Question Mark.png` | 40 KB | Symbol variant |
| `character-symbols/Encouraging Face Lightbulb.png` | 48 KB | Symbol variant |
| `character-symbols/Celebrator with sparks.png` | 48 KB | Symbol variant |

### Block Graphics (Foundation)
| File | Size | Purpose |
|------|------|---------|
| `block-mass.png` | 156 KB | Barrier: absence of mass |
| `block-gradient.png` | 96 KB | Barrier: too steep gradient |
| `block-word.png` | 132 KB | Barrier: misunderstood word |

### Backgrounds & UI
| File | Size | Purpose |
|------|------|---------|
| `mandala-map-bg.png` | 148 KB | Map background texture |
| `mandala-transparent.png` | 172 KB | Mandala overlay |
| `new-hearth-symbol.png` | 1.4 MB | Hearth symbol (large) |
| `new-symbols.png` | 424 KB | Symbol collection |
| `ayla-tattoo-sigil.jpg` | 52 KB | Personal sigil |

### PWA Icons
| File | Size | Purpose |
|------|------|---------|
| `icon-192.png` | 4 KB | PWA icon 192px |
| `icon-512.png` | 8 KB | PWA icon 512px |
| `icon.svg` | 4 KB | PWA icon SVG |
| `logo_icon.png` | 8 KB | Logo icon |
| `logo_icon_white.png` | 12 KB | Logo icon (white) |
| `logo_letters.png` | 20 KB | Logo text |

---

## AUDIO

| File | Size | Purpose |
|------|------|---------|
| `assets/campfire-ambience.mp3` | 1.4 MB | Ambient campfire loop |

---

## KNOWLEDGE BASE — 897 MB total

### Processed Sources (in knowledge-base/*.md)
| File | Size | Contents |
|------|------|----------|
| `sources.md` | 8 KB | Batch 1 (13 books) |
| `sources-batch2.md` | 12 KB | Batch 2 (10 books) |
| `sources-batch3.md` | 12 KB | Batch 3 (8 books) |
| `sources-batch4.md` | 8 KB | Batch 4 (6 books) |
| `sources-batch5.md` | 12 KB | Batch 5 (7 books) |
| `sources-batch6.md` | 8 KB | Batch 6 (5 books) |
| `sources-batch7.md` | 16 KB | Batch 7 (4 books) |
| `source-agawu-music-as-discourse.md` | 4 KB | Agawu extract |
| `source-blanchard-making-music-enriching-lives.md` | 4 KB | Blanchard extract |
| **Total: 53 processed source books** | | |

### Other Knowledge Base Files
| File | Size | Purpose |
|------|------|---------|
| `teaching-methodology.md` | 8 KB | Teaching approach notes |
| `content-allocation.md` | 12 KB | Content distribution plan |
| `grimoire-structure.md` | 4 KB | Grimoire/knowledge structure |
| `levitin-extract.md` | 92 KB | Daniel Levitin neuroscience |
| `teach-yourself-visually-full-toc.md` | 12 KB | Full TOC extract |

### Guitar Tricks Course
| Path | Files | Size |
|------|-------|------|
| `knowledge-base/guitar-tricks/` | 72 PDFs + catalog | 3.7 MB |
| `knowledge-base/guitar-tricks/catalog.json` | 32 KB | Structured catalog |
| `knowledge-base/guitar-tricks/catalog.md` | 8 KB | Human-readable catalog |
| `knowledge-base/guitar-tricks/youtube-links.md` | 4 KB | YouTube references |

### Raw PDFs
| Path | Count | Size |
|------|-------|------|
| `knowledge-base/pdfs/` | 33 PDFs | 894 MB |
| Text-based | 10 | ~30% |
| Scanned/image-based | 23 | ~70% |

### External PDF (in assets/)
| File | Size |
|------|------|
| `assets/Marty_Music_Ultimate_Guitar_Guide.pdf` | 1.7 MB |

---

## TOOLS & SCRIPTS

| File | Size | Purpose |
|------|------|---------|
| `tools/seed-v2.js` | 20 KB | DB seeder (v2) |
| `tools/seed-content.js` | 16 KB | Content seeder |
| `tools/seed-books-full.js` | 12 KB | Book data seeder |
| `tools/smoke-nodes.js` | 4 KB | Node smoke tests |

---

## CONFIG & DOCS

| File | Size | Purpose |
|------|------|---------|
| `manifest.json` | 4 KB | PWA manifest |
| `sw.js` | 4 KB | Service worker |
| `.htaccess` | 4 KB | Apache config |
| `CODEX_HANDOVER.md` | 16 KB | Migration handoff doc |
| `DREAMS.md` | 24 KB | Feature dreams/wishlist |
| `NODE_SPEC.md` | 8 KB | Node specification |
| `VIDEO_NEEDS.md` | 4 KB | Video content needs |
| `MARTY_MUSIC_RESOURCES.md` | 4 KB | Marty Music references |
| `lesson-prep-jen-3.md` | 8 KB | Lesson prep notes |

---

## LOCAL STORAGE KEYS

| Key | Type | Purpose |
|-----|------|---------|
| `hearth-foundation-progress` | Object | Foundation block completion |
| `hearth-doing-progress` | Object | Drill completion states |
| `hearth-knowing-progress` | Object | Topic read states |
| `hearth-knowing-state` | Object | Book reader position |
| `hearth-knowing-quiz` | Object | Quiz states |
| `hearth-practice-state` | Object | Active practice session |
| `hearth-practice-log` | Array | Session history |
| `hearth-practice-notes` | Array | Session notes |
| `hearth-journey-v2` | Object | Multi-student data |
| `hearth-journey-active-student` | String | Current student ID |
| `cauldron-notes` | String | Create node notes |
| `hearth-create-projects` | Array | Create projects |
| `travelledPaths` | Array | Map path travelled state |
| `flameNode` | String | Current flame position |
| `hearth-sessions` | Array | Session timestamps |

---

## DATABASE

- **Host:** `palladius.sui-inter.net`
- **DB:** `hearthdev`
- **User:** `hearthdev`
- **Table:** `content_books` (53 rows)
- **Status:** Connected but 0 user-facing tables — all data is localStorage

---

## DEPENDENCIES (no package.json — vanilla JS)

| Library | Where | Purpose |
|---------|-------|---------|
| Page flip | `page-flip.browser.min.js` | Book reader animation |
| Google Fonts | CDN link | Cinzel, DM Sans, JetBrains Mono |
| OpenHue | External CLI | Hue light control (optional) |
