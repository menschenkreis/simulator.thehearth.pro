# Journey Level One Entry Screen Build Plan - 2026-07-07

Plain English: this is the screen that appears after the learner clicks L1 on the guitar Journey map, before Lesson 1 begins.

## Why This Screen Exists

The L1 click should not throw the learner straight into a lesson.

It should answer:

- What is Level 1?
- What will I learn here?
- Why should I not rush ahead?
- What is the first lesson?
- Where do I begin?

This is especially important for Ayla and Jen because Level 1 is not Foundation. Foundation is the threshold. Level 1 is the first real Journey level.

## Feeling

The screen should feel like a clear curriculum roadmap that belongs to the same visual world as the Journey guitar.

Better:

- the existing Journey guitar visual style
- grouped QJam learning categories
- one calm object with lesson buttons
- the guide beside the roadmap, giving practical direction
- enough beauty to feel like the simulator, but not so much symbolism that the curriculum gets unclear

Avoid:

- square dashboard cards
- a spreadsheet feeling
- too many simultaneous choices
- long explanatory text
- "Hearth magic" language on this screen
- anything that makes the learner feel behind before beginning

## Guide Voice

The guide should be practical and calming.

Working line:

> Follow the lessons in order. Do not rush ahead: steady rhythm, clean chords, clear scale map, then music.

Alternate lines:

- Level 1 is not a race. Keep the pulse steady and let the map become familiar.
- Do not get ahead of yourself. One clean step becomes the next one.
- Follow the path calmly. Rhythm, chords, pentatonics, and play will start to connect.

## Suggested Visual Layout

Use code-native HTML/CSS first. Do not generate a final image yet.

Credit-efficient reason: the structure will change while Ayla reacts to it. A generated image would cost more and be harder to edit.

Current prototype:

1. Top: small student selector remains available, but not loud.
2. Main stage: one clear curriculum roadmap using the Journey guitar as a subtle visual watermark.
3. Left or side: guide character with one speech bubble.
4. Roadmap sections: the Level 1 lessons grouped by QJam-style categories as progress rows.
5. Bottom: "Let's begin" / "Continue Level 1" button.

The stops should be readable but compact. Each stop can show:

- lesson number
- short title
- one small symbol/category

Each row should show:

- what has already been done
- the current lesson/checkpoint
- what is still ahead
- one finish dot at the end of the row

The first version uses simple letter symbols for the row icons. Later, generate proper icons only after the categories are stable, and keep them in the same visual family as the map node images.

No large paragraph cards on the first version.

## Level 1 Curriculum Stops

These are already represented in `assets/js/journey-data.js`.

1. Time Feel, Part 1
2. The 8 Open Chords
3. Common-Finger Chord Changes
4. Pentatonic Shape 1
5. Pentatonic Phrasing
6. First Blues Solo Entry
7. Chords Meet Pentatonics
8. QJam Level 1 Integration

## Skill Families

The Level 1 map should make the curriculum understandable by grouping the stops into simple QJam skill families:

- Rhythm: time feel and pulse
- Chords & Harmony: open chords and chord changes
- Scales: pentatonic shape 1
- Technique & Improvisation: phrasing and first blues solo
- Integration: chords and pentatonics together

This helps Ayla understand the path without making the UI academic.

## How This Connects To Nodes

The entry screen should not explain node philosophy heavily. It should simply show what Level 1 teaches.

For Level 1:

- Rhythm work can later draw from Practice and Play.
- Chord work can later draw from Doing and Knowing.
- Scale work can later draw from Study and Practice.
- Improvisation can later draw from Play and Create.
- Integration can later draw from Mastery and Reflect/Hearth.

The deeper linking happens inside each lesson, not on the first roadmap screen.

## One-Hour Lesson Shape

Ayla's richer one-hour lesson idea can sit under the existing 6-block structure.

Working compression:

- Review includes last lesson memory and Warm Up Brain.
- Warm-Up includes Tune In, tuning, body check, and hand warmup.
- Concept includes Stretch Your Brain and direct source/video options.
- Drill includes Try It Out and focused repetition.
- Music Application includes Practice, Play/Groove, and Create/Experiment.
- Reflect includes Watch a Master, stretch down, and next step.

This keeps the backend simple while preserving the human lesson experience.

## Jen-Specific Use

For Jen right now, Level 1 should support consolidation.

Do not push new challenges too hard.

Useful current emphasis:

- A minor pentatonic as musical vocabulary
- A roots as safety notes
- three small pentatonic boxes
- metronome at 60, 76, and only if calm 100 BPM
- right-hand patterns as motivation
- call and response to turn drills into music
- clean tone: no buzz, no rushing, even sound

The app should help Ayla prepare and teach this without pretending Jen needs a generic syllabus.

## Build Steps

1. Add a Level 1 entry renderer in Journey.
2. Route `Journey.openLevel(1)` to the entry screen, not directly to Lesson 1.
3. Show the 8 lesson stops grouped under QJam-style curriculum categories.
4. Add guide speech with short practical wording.
5. Add one clear "Let's begin" action that opens Lesson 1.
6. Keep the existing lesson data in `journey-data.js`; do not mix screen layout with lesson content.
7. Later, add click behavior on each lesson stop for preview/resume.

## Code Touchpoints

Main files:

- `assets/js/journey.js`
- `assets/js/journey-data.js`

Current behavior:

- `render()` shows the main Journey guitar map.
- `renderJourneyNeckStage()` draws the L1-L8 markers on the guitar.
- Each unlocked level marker calls `Journey.openLevel(levelNumber)`.
- `Journey.openLevel(num)` currently saves the selected level and calls `renderLevel(num)`.
- `renderLevel(num)` currently shows the level header, guide, progress bar, and lesson list.
- `renderLevelLesson(levelNum, lessonNum, blockIdx)` opens the actual lesson flow.

Recommended implementation shape:

- Add `renderLevelEntry(num)` for the new curriculum/path screen.
- Make `Journey.openLevel(1)` call `renderLevelEntry(1)`.
- Keep `Journey.openLevel(2+)` on `renderLevel(num)` until those levels have their own entry screens.
- Add `Journey.beginLevel(levelNum)` or `Journey.openNextLesson(levelNum)` for the "Let's begin" button.
- Keep all Level 1 lesson titles, blocks, and summaries in `journey-data.js`.
- Keep all entry-screen layout/styling in `journey.js`.

Plain English:

The data should say what the lessons are.

The screen should decide how to show the path.

Do not bury curriculum data inside visual HTML.

## First Version Acceptance Test

The screen is successful if Ayla can say:

- I know what Level 1 is for.
- I can see the whole level at a glance.
- I know where to begin.
- It feels like the simulator, not a dashboard.
- It does not overload me before Lesson 1 starts.
- It uses QJam language clearly enough that Ayla can explain it to Jen.

## Do Not Do Yet

- Do not generate a final map image or icon set yet.
- Do not write all eight lessons again from scratch.
- Do not add complex unlock logic yet.
- Do not add more top-level buttons.
- Do not make this feel like an admin curriculum planner.
- Do not show all 10 broader Hearth/QJam strands on the Level 1 entry screen.

## Next Best Build Move

Keep refining the editable Level 1 entry screen using existing assets and CSS.

After Ayla reacts to the shape, decide whether the path should become:

- a cleaner code-native roadmap,
- a generated background image with buttons over it,
- or the current hybrid guitar-watermark direction.
