# The Hearth Mastery — Node Specifications

Each node is a distinct experience with its own visual metaphor, layout, interaction pattern, and content purpose.

---

## 01 — Foundation (Building Blocks)

**Shape:** Pyramid of stacking blocks
**Visual:** Rainbow-colored blocks, bottom-up, progressive unlock
**Interaction:** Tap-to-reveal. Each step asks a question, then reveals the answer. Character + speech bubble for each step.
**Voice:** DM Sans, kid-friendly, short sentences
**Purpose:** The absolute basics — how to learn, what is this thing, how to hold it, how to tune it. Before you play a single note.
**Content:**
- How to Learn (imagination, focus, slow practice)
- Parts of the Guitar (anatomy)
- How to Hold It (posture, positioning)
- Tuning (making it sound right)
- Your First Sound (open strings, first notes)
- Rhythm Basics (beat, tempo, counting)
- Reading Tab (the simplest notation)

**Status:** In progress — interactive tap-to-reveal built, needs character illustrations

---

## 02 — Doing (Guitar Neck)

**Shape:** A guitar neck / fretboard
**Visual:** Horizontal fretboard layout. Frets are the levels. Strings are the paths. Dots on the fretboard mark where you are.
**Interaction:** Navigate up the neck as you progress. Each fret position is a drill or exercise. Tap a position to start playing.
**Purpose:** The actual playing surface. This is where your fingers meet the strings. Drills, exercises, finger patterns, chord shapes — all the doing.
**Content:**
- Finger gym (finger independence, stretches)
- Chord shapes (open chords, barre chords)
- Scale patterns (pentatonic, major, minor)
- Strumming patterns (rhythm in the right hand)
- Fingerpicking patterns
- Technique drills (hammer-ons, pull-offs, slides, bends)
- Speed & accuracy exercises
**Asset needed:** Guitar neck visual / fretboard illustration

---

## 03 — Knowing (Bookshelf / Library)

**Shape:** A bookshelf
**Visual:** Books on shelves, each book is a topic. Organized by category. Pick up a book, it opens to its content.
**Interaction:** Browse shelves, pick up a book, flip through pages. Like actually browsing a library.
**Purpose:** Reference material. Music theory, notation, genres, history, ear training. Always accessible — an encyclopedia you can dip into anytime.
**Content:**
- Music theory fundamentals (notes, scales, keys, intervals)
- Chord theory (how chords are built, progressions)
- Rhythm & time signatures
- Ear training (intervals, chord recognition)
- Genre studies (blues, jazz, folk, rock, classical, world)
- Notation systems (tab, standard notation, chord charts)
- Music & discourse (the language of music)
**Asset needed:** Bookshelf / library illustration

---

## 04 — Practice (Temple)

**Shape:** A temple / meditation space
**Visual:** Minimal, dark, warm. A single candle with a flame. Quiet. No distractions.
**Interaction:** You choose what to focus on today. Set an intention. Timer starts. Practice. Reflect after. Like a ritual.
**Purpose:** Focused, distraction-free practice sessions. A protocol for practicing — not random noodling. Intent → Focus → Practice → Reflect.
**Flow:**
1. Light the candle (set your intention — what are you working on?)
2. Choose from your current topics/drills
3. Timer starts (you pick duration)
4. Practice
5. Blow out the candle (reflect — what improved? what's next?)
**Content:**
- Practice protocol (the structure of a good session)
- Warm-up routines
- Focus drills pulled from Doing & Study
- Session history (what you practiced, when, for how long)
**Asset needed:** Simple candle with flame (could be animated CSS)

---

## 05 — Study (Brain)

**Shape:** A brain / neural network
**Visual:** Nodes connected by lines. Topics as nodes, connections as relationships. You can see how everything links together.
**Interaction:** Click a node to zoom into it. See what connects to what. Trace a thread from one topic to another. The connections are the content.
**Purpose:** Understanding how topics relate. Not just learning isolated facts — seeing the web of knowledge. Cross-referencing. "How does rhythm connect to strumming?" "Why does knowing intervals help with chords?"
**Content:**
- Interactive concept map
- Topic connections (which Foundation topics feed into which Doing drills)
- Deep dives into specific areas
- Brain science (how learning works, muscle memory, neuroplasticity)
- Gap analysis (what haven't you studied yet?)
**Asset needed:** Brain / neural network illustration

---

## 06 — Create (Studio)

**Shape:** A studio / workshop
**Visual:** Journal, scratchpad, tape on the floor. Materials spread out. Work in progress feel.
**Interaction:** Prompts with constraints. Like Lars von Trier's "The Five Obstructions" — creative invitations with rules that unlock creativity. Write, record, experiment.
**Purpose:** The creative space. Where the student becomes the creator. Songwriting basics, arrangement, recording yourself, improvisation prompts.
**Content:**
- Songwriting prompts (with obstructions/constraints)
  - "Write a song using only 3 chords"
  - "Create a melody using only the top 2 strings"
  - "Write lyrics about your morning, then set it to music"
- Recording yourself (basic setup, listening back)
- Arrangement (taking a song and making it your own)
- Improvisation games
- Journal / scratchpad for ideas
- "Five Obstructions" style creative challenges
**Asset needed:** Studio / workshop illustration

---

## 07 — Hearth (Body + Learning System)

**Shape:** A body / inner learning map
**Visual:** The body behind the instrument. Zones for brain, hands, ears, breath/body, and heart/feeling.
**Interaction:** Choose a body or mind zone to see what role it plays in guitar learning.
**Purpose:** Explain what is happening behind the instrument. This is where the student understands the body, mind, feelings, and habits involved in practice.
**Content:**
- Brain and memory
- Hands and safe movement
- Ears and listening
- Breath, body, and tension
- Heart, feeling, motivation, confidence, and expression
- Habits that shape practice
**Asset needed:** Body-behind-the-instrument visual and zone polish

---

## 08 — Mastery (???)

**Shape:** TBD
**Visual:** TBD
**Purpose:** The endgame. What does mastery look like? How do you know you've arrived? Maybe it's not a destination — maybe it's a reflection of everything else. A mirror. A summit. A circle back to Foundation but with new eyes.
**Status:** Needs more thought

---

## Cross-cutting concerns

- **Progressive unlock:** Each node unlocks topics as you complete prerequisites
- **TTS (Read aloud):** Available in Foundation, potentially in others
- **Character guide:** The same character appears across nodes, guiding with speech bubbles
- **Mobile-first:** All layouts work on phone
- **DM Sans** as the main font throughout
- **Dark theme with node-specific accents** (Foundation = rainbow, Practice = warm amber, Knowing = deep blue, etc.)
- **Tap-to-reveal** for Foundation, different interaction patterns per node
