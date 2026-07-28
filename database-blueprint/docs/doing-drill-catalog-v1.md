# Doing Drill Catalogue v1

## Purpose

The old Doing bank contains 77 broad exercise ideas gathered during prototyping.
It is useful source material, but it is not a finished learner catalogue.

The active prototype now exposes a smaller reviewed collection through
`adapters/doing-drill-catalog.js`. The old entries remain available as an
archive and are not deleted.

## Learner-Ready Standard

A drill is shown to a learner only when it has:

- one plain-language goal;
- a clear setup;
- three small steps;
- specific things to listen or feel for;
- a measurable success condition;
- an easier version;
- a harder next step;
- a short safety or tension note;
- an explicit hand room and level;
- a reviewed source or a clearly labelled Hearth synthesis.

External video links are hidden until they have been checked for accuracy,
availability, and direct relevance to that exact drill.

## Current Reviewed Set

### Left Hand

- `chrom-1` - 1-2-3-4 Clean Contact
- `classical-1` - Fretting Hand Position
- `stretch-1` - Comfortable 1-2-4 Reach
- `pent-1` - A Minor Pentatonic Box 1

### Right Hand

- `alt-1` - Alternate Picking on One String
- `strum-1` - Continuous Down-Up Strum
- `shuffle-1` - Blues Shuffle Pulse
- `pima-1` - P-I-M-A Open-String Pattern
- `pima-2` - Rest Stroke and Free Stroke

### Both Hands

- `clean-note-1` - One Clean Synchronized Note
- `chord-clean-am` - A Minor Clean Chord Check
- `chord-change-am-c` - A Minor to C Change
- `pent-roots-time` - A Root Notes in Time
- `strum-1` - Continuous Down-Up Strum

Some drills appear in more than one room because the same movement can train a
single hand first and then become a coordination task.

## Progress Contract

Progress stays attached to the stable drill ID, not its title or artwork.

The current prototype states are:

1. `seen`
2. `practiced`
3. `clean`
4. `comfortable`
5. `mastered`

The backend should eventually store an event history as well as the latest
state: learner, drill ID, date, duration, BPM, self-rating, teacher note, and
recording reference.

## Visual Asset Contract

Every drill can point to a visual asset, but artwork is optional until it passes
an accuracy check. Guitar images must have correct anatomy and instrument
geometry. A generated image is rejected if finger count, finger placement,
string count, fret geometry, or hand laterality is wrong.

Until a drill-specific illustration is approved, the interface uses the shared
accurate guitar artwork plus deterministic instructional markers. This avoids
shipping convincing-looking but incorrect guitar instruction.

## Complete Do Experience Plan

Tablature is one teaching tool inside the Do system. It does not replace the
image-led rooms, drill catalogue, feedback, progress, videos, or lesson links.

The intended flow remains:

1. The first click opens the complete guitar and lets the learner choose Left
   Hand, Right Hand, Both Hands, or Full Drill Library.
2. A hand room opens as a focused crop of that same guitar world.
3. Large drill circles below the room show the drill title and progress ring.
4. Selecting a drill changes the large room into its teaching scene.
5. The learner sees the exact movement, tries it, and records how it went.
6. That feedback updates the drill ring and remains available when the same
   drill appears inside a Journey lesson or Practice session.

The teaching scene should choose the visual language that explains the drill
most accurately:

| Drill need | Primary visual |
| --- | --- |
| Notes, strings, frets, or movement order | Interactive tablature |
| Strumming, subdivision, or accents | Rhythm grid and direction arrows |
| Chord fingering and clean-string checks | Chord diagram |
| Posture, pressure, relaxation, or hand shape | Accurate image or short video |
| Two-hand synchronization | Tablature plus rhythm or picking layer |
| Musical application | Backing track, play-along, or demonstrated phrase |

Every teaching scene keeps the same supporting information: goal, setup,
three steps, what to listen or feel for, success condition, easier option,
safety note, video slot, and progress feedback. The renderer may change, but
the learning contract does not.

## Build Order

1. Keep the current first-click guitar and three focused hand rooms.
2. Keep the 13 reviewed drills as the active Level 1 catalogue.
3. Finish one complete pilot using `chrom-1` (1-2-3-4 Clean Contact), with
   interactive tablature, finger numbers, forward/reverse movement, and saved
   feedback.
4. Confirm that its feedback updates the progress ring in both the hand room
   and Full Drill Library.
5. Add the right visual renderer to the remaining reviewed drills rather than
   forcing every drill into tablature.
6. Add checked demonstration videos or learner recordings without changing
   the stable drill IDs.
7. Let Journey and Practice launch these same drill scenes, so content and
   learner progress are not duplicated.

The first planned visual batch remains focused on real Level 1 and Jen needs:
1-2-3-4 clean contact, fretting-hand position, a right-hand pattern, and A
minor pentatonic root work.

## Known Archive Problems

The archived bank still needs a deliberate content pass. Examples already
found include a left-hand drill incorrectly named with the right-hand term
PIMA, an incorrect Dorian starting-note description, inconsistent difficulty
and level assignments, generic source labels, and unverified video links.

Archive entries must not be promoted merely because they already have text.
