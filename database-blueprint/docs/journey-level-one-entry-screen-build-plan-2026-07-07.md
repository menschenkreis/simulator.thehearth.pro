# Journey Level One Entry Screen Build Plan - 2026-07-07

Plain English: this is the screen that appears after the learner clicks L1 on the guitar Journey map, before Lesson 1 begins.

## Why This Screen Exists

The L1 click should not throw the learner straight into a lesson.

It should answer:

- What is Level 1?
- What will I learn here?
- Why should I not rush ahead?
- What is the first lesson?
- How do the other nodes help me along the way?

This is especially important for Ayla and Jen because Level 1 is not Foundation. Foundation is the threshold. Level 1 is the first real Journey level.

## Feeling

The screen should feel like a path, not a dashboard.

Better:

- a hand-drawn curriculum map
- a quiet game path
- a quest route through musical territories
- a guitar-learning road with stops
- the guide beside the path, giving calm direction

Avoid:

- square dashboard cards
- a spreadsheet feeling
- too many simultaneous choices
- long explanatory text
- anything that makes the learner feel behind before beginning

## Guide Voice

The guide should be practical and calming.

Working line:

> Stay with the first path. Small steps, clean sound, steady rhythm, and a little fun each time.

Alternate lines:

- Level 1 is not a race. Keep the pulse steady and let the map become familiar.
- Do not get ahead of yourself. One clean step becomes the next one.
- Follow the path calmly. Rhythm, chords, pentatonics, and play will start to connect.

## Suggested Visual Layout

Use code-native HTML/CSS first. Do not generate a final image yet.

Credit-efficient reason: the structure will change while Ayla reacts to it. A generated image would cost more and be harder to edit.

First prototype:

1. Top: small student selector remains available, but not loud.
2. Main stage: one illustrated path shape made in HTML/CSS/SVG.
3. Left or side: guide character with one speech bubble.
4. Path stops: the 8 Level 1 lessons as clear milestones.
5. Bottom or natural path endpoint: "Let's begin" button.

The stops should be readable but compact. Each stop can show:

- lesson number
- short title
- one small symbol/category

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

The Level 1 map should make the curriculum understandable by grouping the stops into simple skill families:

- Rhythm: time feel and pulse
- Chords: open chords and chord changes
- Scales: pentatonic shape 1
- Playing: phrasing and first blues solo
- Integration: chords and pentatonics together

This helps Ayla understand the path without making the UI academic.

## How This Connects To Nodes

Journey is the itinerary. The nodes are the places.

For Level 1:

- Tune In draws from Practice and Hearth.
- Warm Up draws from Practice and Doing.
- Concept draws from Knowing and Study.
- Drill draws from Doing and Practice.
- Play/Groove draws from Play.
- Create and Experiment draws from Create.
- Watch a Master draws from Mastery.
- Reflect draws from Hearth.

The entry screen should hint at this, but not explain it heavily. The deeper linking happens inside each lesson.

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
3. Show the 8 lesson stops as a visual path.
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

## Do Not Do Yet

- Do not generate a final map image yet.
- Do not write all eight lessons again from scratch.
- Do not add complex unlock logic yet.
- Do not add more top-level buttons.
- Do not make this feel like an admin curriculum planner.

## Next Best Build Move

Build the Level 1 entry screen as an editable prototype using existing assets and CSS.

After Ayla reacts to the shape, decide whether the path should become:

- a hand-drawn map image,
- a code-native SVG route,
- a guitar-neck-derived route,
- or a hybrid with a light illustration underneath.
