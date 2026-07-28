# Practice Node Audit And Completion Brief

## Project

**The Hearth Mastery guitar simulator**

Repository:

`/Users/alessandralove/Documents/The Hearth Simulator/simulator.thehearth.pro`

## Purpose Of The Practice Node

Practice is the focused repetition room.

- **Journey** recommends what should be practised.
- **Do** provides the individual drills.
- **Practice** turns drills, lesson assignments, and personal goals into timed sessions.
- Practice results should feed back into Journey and future lessons.

Practice must remain different from a lesson dashboard or drill library.

## Current State

The first-click Practice chamber has been approved and implemented.

It currently offers:

1. **Continue Today**
   Resumes an unfinished guided session or a burning candle.

2. **Planned Practice**
   Opens the six-stage guided flow:
   - Arrive
   - Focus
   - Set
   - Practise
   - Listen
   - Reflect

3. **Free Practice**
   Lets the learner select 5, 10, 20, or 30 minutes and choose an intention.

4. **Previous Practice**
   Shows recent reflections, difficulties, improvements, and what should return next.

Other completed work:

- Sessions survive page refreshes.
- Sessions are connected to the active learner.
- The candle timer can resume after refresh.
- Practice can open Do and return to the guided session.
- Recording uses the browser microphone when permission is granted.
- Reflection saves what improved, what remained difficult, and what should return.
- Practice completion events are recorded.
- Tomorrow’s recommendation can use the learner’s previous reflection.
- Automatic background sound on startup is disabled.
- Existing automated regression checks pass.

## Important Files

- `adapters/practice-entry-model.js`
- `adapters/practice-entry-viewer.js`
- `adapters/practice-entry-controller.js`
- `adapters/practice-candle-viewer.js`
- `adapters/practice-planned-session-controller.js`
- `adapters/practice-planned-session-viewer.js`
- `assets/css/practice-entry.css`
- `tools/core_js_smoke_check.py`
- `tools/prototype_smoke_check.py`

## Audit First

Before changing code, manually test every Practice route for both **My Journey** and **Jen**:

- Open each of the four entrance choices.
- Refresh during every guided step.
- Refresh while the candle is burning.
- Allow a short candle to finish.
- Open Do and return to Practice.
- Record, replay, and clear a take.
- Save a reflection.
- Confirm it appears under Previous Practice.
- Confirm unfinished sessions appear under Continue Today.
- Switch learners and confirm their sessions and history do not mix.
- Test desktop and mobile layouts.
- Check for clipping, overlap, unreadable text, and broken back buttons.

Document any failures before implementing fixes.

## Highest-Priority Remaining Work

### 1. Polish The Candle Session

The candle room works, but needs a final visual and usability pass.

It should:

- Match Foundation, Journey, and Do.
- Feel like a calm place rather than a form.
- Keep the candle as the visual focus.
- Present duration, intention, timer, and reflection quietly.
- Work cleanly on laptop and phone screens.
- Use consistent Practice/Practise wording.

Do not generate another background image unless the current visual genuinely cannot be improved through layout and styling.

### 2. Improve The Do Handoff

Practice currently opens Do, but the connection should become more specific.

A planned focus should eventually open the relevant drill directly and remember:

- drill ID
- repetitions
- BPM
- clean takes
- difficulty
- completion status
- learner notes

Returning from Do must restore the exact Practice session and step.

### 3. Strengthen Recording

The current recording can be captured and replayed during the session, but the actual audio may not survive a refresh.

Audit and define:

- whether audio recordings should be saved permanently
- how recordings belong to a learner and practice session
- how previous takes are reviewed
- what eventually requires backend storage

Do not store large audio files carelessly in `localStorage`.

### 4. Complete Progress Integration

Verify that Practice events are actually consumed by Journey rather than merely stored.

Practice results should influence:

- Journey category progress
- tomorrow’s recommendation
- lesson preparation
- repeated drills
- teacher notes
- learner difficulty signals

Free Practice should count as genuine practice without falsely completing Journey lessons.

### 5. Improve Previous Practice

Previous Practice should become a useful memory, showing:

- date and duration
- focus
- drills attempted
- BPM and repetitions
- recordings
- what improved
- what remained difficult
- what should return
- teacher feedback where available

Keep this compact and learner-friendly.

## Architecture Risks To Audit

There are currently several storage locations:

- `hearth-practice-candle-v1`
- `hearth-planned-practice-v1`
- the progress-event ledger
- `hearth-practice-log`
- `HearthPracticeState`

Determine which is authoritative and identify duplicated information. Do not perform a large migration yet. Propose a clean shared Practice Session schema that Martin’s future backend can support.

Suggested entities:

- Practice Plan
- Practice Session
- Practice Item
- Drill Attempt
- Recording
- Reflection
- Teacher Feedback
- Recommendation

## Jen Test Case

Use Jen as the real-world test:

- 20 minutes per day
- A minor pentatonic consolidation
- root notes as safety points
- three pentatonic boxes
- CAGED connection
- right-hand patterns
- E and A note landmarks
- jamming
- learning a song using rhythm and lead guitar

The system should help Ayla quickly see what Jen needs to practise and what happened last time.

## Design Rules

- Preserve the approved Practice entrance.
- Avoid dashboards and nested cards.
- Keep the interface calm, visual, and Apple-like.
- Use the existing simulator aesthetic.
- Maintain learner separation.
- Keep data reusable rather than hardcoding Jen into the interface.
- Do not fundamentally redesign the node without approval.
- Work in small, reviewable stages.
- Prefer code and CSS improvements before generating expensive images.

## Expected Audit Output

Produce:

1. A list of confirmed working features.
2. Bugs ordered by severity.
3. Missing connections to Journey, Do, recordings, and progress.
4. Storage and backend risks.
5. A prioritized completion roadmap.
6. One recommended next implementation step.

Do not begin a broad rewrite until the audit findings have been reviewed.

