# Do Node Audit And Completion Brief

Date: 2026-07-18

Inspected branch: `cleanup/handoff-architecture`

Inspected commit: `2b9f9bb`

## Purpose Of Do

Do is the physical training room.

- Journey can recommend a drill.
- Do owns the drill instructions and teaching asset.
- Practice owns repeated sessions over time.
- Play proves that the physical skill can become music.

Do should help the learner find one legitimate physical job quickly and know
what better feels or sounds like.

## Verified Current Experience

The live route was browser-checked on 2026-07-18.

The learner can currently:

1. open Do from the map;
2. choose Left Hand, Right Hand, Both Hands, Map/Tuning, or Drill Library;
3. enter a focused Level 1 room;
4. choose a full-title drill circle;
5. open the drill inside the main teaching scene;
6. use an interactive asset where one exists;
7. read setup, steps, listening targets, success, easier version, and safety;
8. give one of five self-feedback ratings.

The sampled A Minor Pentatonic Box 1 drill showed a correct six-string
interactive fretboard, note names, finger numbers, A-root view, BPM range,
success test, and easier version. No console warnings appeared in the sampled
route.

## Active Ownership

Primary route ownership:

- `adapters/doing-panel-controller.js`
- `adapters/doing-map-viewer.js`
- `adapters/doing-room-viewer.js`
- `adapters/doing-teaching-viewer.js`
- `adapters/doing-drill-board-viewer.js`
- `adapters/doing-progress-bridge.js`

Important data:

- `adapters/doing-config.js`
- `adapters/doing-drill-catalog.js`
- `assets/js/doing.js`

The node compatibility layer keeps the historical global entry name. Do not
create another competing first-click or room renderer.

## Approved Level 1 Drill Set

The current curated catalogue contains thirteen Level 1 drills.

Left hand:

- `chrom-1` - 1-2-3-4 clean contact
- `classical-1` - fretting-hand position
- `stretch-1` - comfortable 1-2-4 reach
- `pent-1` - A minor pentatonic box 1

Right hand:

- `alt-1` - alternate picking
- `strum-1` - steady strum grid
- `shuffle-1` - shuffle pulse
- `pima-1` - first PIMA pattern
- `pima-2` - second PIMA pattern

Both hands:

- `clean-note-1` - clean note contact
- `chord-clean-am` - clean A minor chord
- `chord-change-am-c` - A minor to C change
- `pent-roots-time` - pentatonic roots in time

The older drill bank remains an archive and should not silently repopulate the
live Level 1 rooms.

## Important Findings

### 1. The Visible Rings Can Mix Learners

The room still uses `hearth-doing-progress` for visible drill states. That key
is not scoped to the active learner.

The newer shared `drill_feedback_recorded` event does receive the active
learner. Therefore the event history can be learner-specific while the circles
on screen are still shared. These two truths must be reconciled.

### 2. "Mastered" Is Too Strong For One Self-Rating

One feedback choice currently says Mastered. A learner's self-report is useful,
but one click after one attempt is not mastery evidence. Keep the rating, but
rename or reinterpret it as confidence or comfort unless stronger evidence
exists.

### 3. Practice Handoff Needs More Context

Do can return to a planned Practice session, but the stable handoff contract is
not yet complete. It should preserve drill ID, learner, BPM, repetitions, clean
takes, intended duration, difficulty, source lesson, and return destination.

### 4. Legitimacy Must Be Reviewed Deliberately

The thirteen drills are coherent and much cleaner than the old library. They
still need a guitar-teaching review for posture, fingering, safety, progression,
and wording. Do not grow the catalogue until Level 1 is trusted.

## Highest-Priority Remaining Work

### 1. Unify Drill Progress Per Learner

Choose one canonical drill-attempt model. Migrate carefully from the old visual
key while preserving existing work.

The model should include:

- learner ID
- stable drill ID and version
- level
- source route
- BPM and repetitions
- clean-take count
- self-rating
- teacher rating where available
- difficulty and body notes
- timestamp
- return destination

The same evidence must drive the room ring, Practice history, and Journey.

### 2. Replace The Mastery Shortcut With Evidence Stages

Suggested visible stages:

- Not started
- Seen
- Practised
- Clean once
- Comfortable today

Longer-term consolidation should come from repeated evidence across days,
musical application, or teacher/external assessment.

### 3. Complete Direct Practice And Journey Handoffs

A recommendation should open the exact drill, not merely the Do entrance.
Returning must restore the exact lesson or Practice step.

### 4. Validate The Thirteen Drills

For each drill, check:

- musical and physical purpose;
- safe setup;
- smallest successful version;
- progression and BPM guidance;
- what to listen for;
- an observable pass condition;
- where it becomes music;
- source or teacher-review status.

### 5. Build Assets Only Where They Teach

Prioritise interactive TAB, fretboard, strum-grid, chord, and hand-position
assets. Add demonstration video later when it is mapped to a specific drill and
rights are clear. Do not generate decorative images that do not improve the
instruction.

### 6. Finish Ownership And Browser Checks

Test left, right, both, tuning, and full library for My Journey and Jen. Include
refresh, back paths, direct handoffs, keyboard use, mobile layout, reduced
motion, and duplicate-event prevention.

Extend the renderer-ownership check to cover Do.

## Jen Test Case

Use Jen's current consolidation needs:

- right-hand patterns;
- A minor pentatonic box 1 and root notes;
- clean sound rather than speed;
- 60, 76, and 100 BPM where appropriate;
- tiny left-hand independence work;
- a musical return through jamming and a rhythm/lead song.

The best result is not more drills. It is a short, trustworthy practice sheet
that connects these drills to her next musical use.

## Protected Decisions

- Keep the first-click guitar and the left/right/both-hand chambers.
- Keep one focused room visible at a time.
- Keep full drill titles inside large horizontal drill circles.
- Keep the image as the room and the teaching scene as the endpoint.
- Keep the curated Level 1 list small.
- Do not scatter drill nodes arbitrarily over the guitar image.
- Do not return to text-only endpoint cards.

## Acceptance Checkpoint

Do reaches a stable checkpoint when:

- every approved drill has been technically reviewed;
- visible rings and shared events use the same learner-specific evidence;
- no one-click state is called mastery;
- Journey and Practice open the exact drill and receive the result back;
- My Journey and Jen never share drill state;
- desktop and mobile routes pass without overlap or clipping;
- legacy banks cannot silently overwrite the approved catalogue.

## Verification Already Run

- `tools/prototype_smoke_check.py`: passed
- `tools/core_smoke_check.py`: passed
- `tools/core_js_smoke_check.py`: passed
- live first click, left-hand room, and A minor pentatonic drill: passed

The shared renderer-ownership check currently fails in other nodes and does not
yet assert Do ownership.

## Suggested Work Size

- Learner-specific progress and evidence: 3 to 5 hours, medium credit
- Direct Practice/Journey handoffs: 2 to 4 hours, medium credit
- Thirteen-drill teaching review: 3 to 6 hours, medium credit
- Focused browser and profile tests: 1 to 2 hours, low-to-medium credit
- New demonstration assets: separate approved batches, potentially high credit

