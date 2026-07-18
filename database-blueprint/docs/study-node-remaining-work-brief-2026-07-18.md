# Study Node Remaining Work Brief

## Project

The Hearth Mastery guitar simulator.

Audit the Study node only. Do not modify Zamkee or other simulators.

Workspace:

`/Users/alessandralove/Documents/The Hearth Simulator/simulator.thehearth.pro`

Live preview:

`http://127.0.0.1:8766/simulator.html`

## Current Direction

Study uses a physical “Key Chamber” with six doors:

1. Word
2. Sound
3. Shape
4. Pattern
5. Test
6. Review

Study should make one musical idea clear enough to use. It should not become another lesson dashboard or a duplicate drill library.

## Already Implemented

- Learner-aware Study model.
- Current Study subject comes from Journey data.
- Jen’s current subject is:
  `A as home inside A minor pentatonic`
- Shape is recommended for Jen.
- Shape opens the existing Knowing Study Session.
- All six doors open a reusable activity/proof interface.
- Assessment choices save:
  - understood
  - needs review
  - still unclear
- Evidence is saved per learner in:
  `hearth-study-chamber-v1`
- Progress events are written through `HearthProgressEvents`.
- Practice reads Study evidence and creates a recommendation.
- Journey reads Study evidence and updates its next-action message.
- Existing legacy Study storage remains for compatibility.

## Main Files

- `adapters/study-key-chamber-model.js`
- `adapters/study-key-chamber-viewer.js`
- `adapters/knowing-study-session-model.js`
- `adapters/knowing-study-session-viewer.js`
- `adapters/knowing-study-question-model.js`
- `adapters/knowing-study-quiz-controller.js`
- `adapters/practice-entry-model.js`
- `adapters/practice-entry-controller.js`
- `adapters/practice-entry-viewer.js`
- `assets/js/journey.js`
- `assets/js/journey-data.js`
- `simulator.html`

## Remaining Audit Work

### 1. Test the real browser flow

Verify manually:

- Open Study from the main map.
- Change the active learner.
- Confirm the learner and current subject change correctly.
- Open Shape.
- Complete the Study Session.
- Try `Got It`, `Need Review`, and `Missing Something`.
- Return to the chamber.
- Confirm the door state and progress changed.
- Open Practice.
- Confirm Practice displays the Study recommendation.
- Open Journey.
- Confirm Journey displays the correct next action.

### 2. Test all six doors

Confirm that:

- Word opens its activity.
- Sound opens its activity.
- Shape opens the real Study Session.
- Pattern opens its activity.
- Test remains locked until there is prior evidence.
- Review remains locked until there is prior evidence.
- Each door can save evidence.
- Each door displays meaningful progress afterward.

### 3. Check learner isolation

Test with at least two learners:

- Complete Study evidence as Jen.
- Switch to another learner.
- Confirm Jen’s Study progress does not appear.
- Add evidence for the second learner.
- Switch back to Jen and confirm her progress remains intact.

### 4. Review state rules

Check whether:

- `Nailed` correctly produces `understood`.
- `Review` produces a visible repeat signal.
- `Stuck` produces a visible repeat signal.
- A later review does not create contradictory progress.
- Locked doors cannot be completed by direct calls.
- Progress cannot exceed 100%.
- Notes are safely length-limited.
- Old legacy Study data does not overwrite newer learner-scoped data unexpectedly.

### 5. Check downstream connections

Confirm that Study evidence is actually useful to:

- Practice recommendations.
- Practice planned-session focus choices.
- Journey’s next-action message.
- Future lesson preparation.

Do not add a second progress system. Reuse the existing event store and learner profile.

### 6. Review duplicate ownership

The active Study entrance should remain owned by:

`adapters/study-key-chamber-viewer.js`

Check that older Study functions remain compatibility paths only and do not unexpectedly replace the active Study viewer.

### 7. Improve content depth only where needed

The reusable activity shell is acceptable for the prototype, but assess whether these doors need richer interactions:

- Sound: simple ear-training interaction.
- Pattern: visual relationship map.
- Test: short recall questions.
- Review: previous evidence and next-repeat selection.
- Word: plain-language term clarification.

Only build these deeper interactions after confirming the current flow works.

### 8. Backend handoff

Document the future backend contract for:

- learner ID
- Study subject
- door progress
- evidence
- notes
- assessment feeling
- timestamps
- progress events

Keep localStorage as the temporary adapter. Do not replace it with backend code during this audit.

## Acceptance Criteria

The Study node is considered complete for the current prototype when:

- Every door has a working path.
- Shape opens the real Study Session.
- Every path saves learner-specific evidence.
- Locked states behave correctly.
- Practice receives the Study recommendation.
- Journey reflects the Study result.
- Two learners remain isolated.
- Refreshing the page does not lose saved progress.
- No image generation or visual redesign is required for this audit.
- Existing unrelated Play-node warnings are reported but not changed.

## Existing Test Note

The targeted Study and prototype checks pass.

A broader renderer ownership check still reports an older Play-node conflict involving:

- `adapters/play-atlas-viewer.js`
- `adapters/play-atlas-controller.js`

That issue is outside this Study audit and should not be modified here.

## Working Rule

Audit first. Make small changes only after identifying a concrete failure. Preserve the Key Chamber metaphor, existing Study content, learner profiles, and modular adapter structure.

