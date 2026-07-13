# The Hearth Mastery - Node Specifications

This is the current plain-language source of truth for what each map node means.

The goal is not to describe every detail of the current prototype. The goal is to keep the node meanings stable enough that the map, frontend, clean core, and future backend can all agree.

---

## 01 - Foundation

**What it is:** The starting point for learning guitar.

**Purpose:** Teach the absolute basics before the student is expected to play much.

**Current experience:** A Foundation map opens the beginner topics and launches character-led lessons through the TeachingEngine.

**Content:**
- How learning works
- How to meet and hold the guitar
- Tuning and first clean sounds
- Rhythm basics
- First shapes and first musical conversations

**Current status:** Built and actively wired through `core/`, `adapters/`, lesson seed files, and Foundation lesson scripts.

---

## 02 - Do

**What it is:** A library of guitar technique drills.

**Purpose:** Give the hands clear physical work.

**Current experience:** A Doing panel opens drill views, a guitar-body/fretboard style training map, filters, progress states, and drill detail cards.

**Content:**
- Rhythm drills
- Picking and fretting drills
- Chord and scale work
- Coordination, strength, control, speed, and accuracy

**Current status:** Built and split into smaller Doing adapters.

---

## 03 - Practise

**What it is:** A place to run a focused practice session.

**Purpose:** Turn material into a time-bound practice ritual.

**Current experience:** A candle timer. The student chooses a duration and focus, lights the candle, practises, then leaves an ember/reflection.

**Content:**
- Practice duration
- Practice focus
- Session timer
- Reflection notes
- Practice log

**Current status:** Built as the active Practice candle room.

---

## 04 - Play

**What it is:** A place to explore music through playing.

**Purpose:** Connect guitar learning to musical styles, traditions, rhythm, touch, sound, and songs.

**Current experience:** A world map of guitar. The student chooses a region and opens details about that musical tradition.

**Content:**
- Regions and traditions
- Style descriptions
- Rhythm, touch, scale colour, and story
- Song and listening pathways

**Current status:** Built as the active Play atlas world map, with Play world data/viewer support.

---

## 05 - Know

**What it is:** A music theory reference library.

**Purpose:** Explain the language underneath guitar and music.

**Current experience:** A Knowing shelf/library opens books, topics, flipbook-style reading, progress tracking, and encyclopedia-style topic pages.

**Content:**
- Notes, intervals, scales, and keys
- Chords and harmony
- Rhythm and time
- Fretboard logic
- Music language and concepts

**Current status:** Built and split into Knowing shelf, book, topic, study, and progress adapters.

---

## 06 - Study

**What it is:** A place for deeper guided learning.

**Purpose:** Slow down, test understanding, and make ideas clear.

**Current experience:** A rotating key chamber with doors for word, sound, shape, pattern, test, and review.

**Content:**
- Clearing misunderstood words
- Listening and ear training
- Shapes, tab, notation, and fretboard links
- Concept relationships
- Recall questions and review

**Current status:** Built as the active Study Key Chamber. Older brain-map study ideas are historical, not the current active meaning.

---

## 07 - Create

**What it is:** A place to make your own music.

**Purpose:** Turn learning into musical output.

**Current experience:** A cauldron. The student chooses ingredients and heat, stirs the cauldron, receives a song seed, then shapes or mutates it.

**Content:**
- Ingredients
- Heat levels
- Creative constraints
- Song seeds
- Notes, lyric ideas, riff ideas, and rhythm ideas
- Mutations

**Current status:** Built as the active Create Cauldron scene, with data in Create ingredient, obstruction, and combo files.

---

## 08 - The Hearth

**What it is:** The body and mind behind guitar learning.

**Purpose:** Explain what is happening behind the instrument.

**Current experience:** A body / inner learning map with zones for the brain, hands, ears, breath/body, and heart/feeling.

**Content:**
- Brain and memory
- Hands and safe movement
- Ears and listening
- Breath, body, and tension
- Feeling, motivation, confidence, and expression
- Habits that shape practice

**Current status:** Built as the active scene-first Hearth body chamber. Older dashboard/HQ descriptions are historical.

---

## 09 - Mastery

**What it is:** The place for bringing everything together.

**Purpose:** Help the student think about confidence, expression, artistry, and personal sound.

**Current experience:** A Phoenix Rising screen with seals for hearing beyond notes, finding your voice, transforming skill into art, and transmitting the fire.

**Content:**
- Going beyond basic proof
- Voice, touch, timing, and identity
- Turning exercises into art
- Learning from artists and teachers
- Returning to the map with deeper understanding

**Current status:** Built as the active Mastery Phoenix scene. It still needs deeper content.

---

## Cross-Cutting Rules

- The map should use plain explanations.
- The same node meaning should be used in the map, docs, data, and future backend.
- `core/` should hold reusable rules and contracts.
- `adapters/` should hold browser wiring, storage, and screen behavior.
- `simulator.html` is still the legacy shell and should keep shrinking over time.
- When a node meaning changes, update this file before extracting or rebuilding that node.
