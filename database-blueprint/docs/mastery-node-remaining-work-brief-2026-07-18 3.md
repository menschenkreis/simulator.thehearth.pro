# Mastery Node: Remaining Work Brief

## Purpose

Complete and audit the Mastery node in The Hearth guitar simulator.

Mastery is the place where the learner sees what a skill can become musically. It should inspire experimentation without becoming another lesson dashboard, drill library, or progress spreadsheet.

The central learning loop is:

**Witness → Notice → Try → Carry**

## Already Completed

- Transparent Phoenix/guitar tableau integrated.
- Four entrance hotspots:
  - Continue today
  - Watch a master
  - Follow a thread
  - Review what changed
- First data-driven exemplar added:
  - Level 1 pentatonic voice
  - Existing QJamTracks pentatonic source
- Active learner is respected.
- Encounter progress is saved per learner.
- Progress events are recorded.
- The learner can choose what they noticed.
- The learner can choose how to try it.
- The result can be sent to Practice or Create.
- Regression checks currently pass.

Relevant files:

- `adapters/mastery-phoenix-viewer.js`
- `assets/js/mastery-data.js`
- `images/mastery/mastery-phoenix-tableau-v1.png`
- `adapters/progress-event-store.js`
- `adapters/practice-candle-viewer.js`
- `adapters/create-handoff-controller.js`

## Remaining Work

### 1. Verify the Existing Encounter

Test the full flow in the browser:

1. Open Mastery.
2. Click Watch a master.
3. Open the source.
4. Move through Witness, Notice, Try, and Carry.
5. Confirm progress survives refresh.
6. Switch learner and confirm records remain separate.
7. Send the result to Practice.
8. Return to Mastery and review the encounter.
9. Repeat using Send to Create.

Check for layout, wording, broken buttons, duplicate screens, and incorrect learner data.

### 2. Complete the Practice Connection

The current encounter opens Practice with a focus, but the later Practice result is not yet explicitly linked back to the Mastery encounter.

Add a shared reference such as:

- `mastery_encounter_id`
- `mastery_exemplar_id`
- `notice`
- `try_idea`

Practice completion should be able to report:

- whether the idea was attempted
- what felt easier
- what remained difficult
- what should return next time

### 3. Complete the Create Connection

The Create handoff currently creates a riff seed.

Later, it should be possible to record whether the learner:

- developed the seed
- abandoned it
- saved a recording
- turned it into a song idea
- wants to revisit it

Do not make Create part of the Mastery UI. Keep the connection through handoff data.

### 4. Replace the Legacy Seal System

The old `MASTERY_SEALS` and `openSeal()` code is still present as legacy compatibility code.

Audit whether anything still depends on it. If not, remove it and replace it with data-driven exemplar records.

Do not keep two competing Mastery systems active.

### 5. Expand the Exemplar Data

Add more exemplars only after the first encounter is stable.

Each exemplar should define:

- title
- level
- category
- source artist or source title
- source URL
- why it matters
- what to notice
- possible experiments
- Practice handoff
- Create handoff
- suitable learner level

The first exemplar should remain focused on:

- A minor pentatonic
- Root notes as safety points
- Three pentatonic boxes
- CAGED connection
- Rhythm and lead playing
- Jamming
- Making a song

### 6. Improve Review

The current Review screen only shows selected choices.

Add a gentle reflection step for:

- What did you notice?
- What did you try?
- What sounded musical?
- What felt difficult?
- What should return to Practice?
- What would you like to explore next?

Keep the reflection short and useful. Do not turn it into a large form.

### 7. Connect Mastery to Journey

Mastery should eventually receive recommendations from:

- the current Journey level
- recent lesson content
- Practice feedback
- learner interests
- teacher notes

For now, the first exemplar may remain the default Level 1 source, but the renderer should not permanently assume that all learners are studying pentatonic material.

### 8. Visual and Interaction Audit

Preserve the approved transparent tableau and warm illustrated style.

Check:

- hotspot alignment with the ember pools
- readable labels at normal laptop size
- responsive behaviour
- clear active state
- no unnecessary cards
- no dashboard-like grid
- no clutter over the Phoenix or guitar
- consistent typography with Foundation, Journey, and Do
- no new image generation unless the existing visual direction genuinely fails

## Non-Goals

Do not:

- rebuild the entire simulator
- redesign the map
- alter Foundation or Journey fundamentals
- turn Mastery into a drill library
- add competitive streaks or guilt-based progress
- generate multiple new images before auditing the existing one
- hardcode Jen-specific content into the general renderer

Jen’s material should be supplied through learner data, lesson data, or handoff data.

## Acceptance Criteria

The Mastery node is ready for the next phase when:

- Watch a master works end to end.
- Continue resumes the active learner’s encounter.
- Review shows saved progress.
- Practice receives the correct focus and encounter reference.
- Create receives a usable seed.
- Switching learners does not mix records.
- Progress events are clear and reusable for a future backend.
- No legacy seal UI is still competing with the new encounter.
- The first encounter feels like part of the Hearth world rather than a separate dashboard.
- Automated smoke checks and a browser walkthrough both pass.

## Recommended Order

1. Browser-test the current encounter.
2. Fix any immediate layout or wording problems.
3. Add the Practice encounter reference.
4. Add short reflection.
5. Remove legacy seal code.
6. Add a second exemplar.
7. Connect Journey recommendations.
8. Document the final Mastery data contract for Martin’s backend.

This is intentionally an audit-first brief. It should not require new image generation or significant credit use.

