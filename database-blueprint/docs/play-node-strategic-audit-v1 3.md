# Play Node Strategic Audit V1

Status: product and architecture audit complete; active simulator unchanged.

## Plain-Language Verdict

The new atlas concept is a strong doorway, but Play is not yet a complete room.

The doorway now says the right thing:

> Choose a musical place, understand why it matters now, and enter the music.

The active system behind it still behaves like this:

> Choose a place, read about it, inspect four listening categories, then leave
> Play and open Doing or Practice.

That is the main mismatch. Play should not merely explain music or hand the
learner to another node. It should own the moment when learned material becomes
musical interaction and show how people, place, history, and living culture
shaped what the learner is hearing.

The right next move is not another atlas image. Keep the current image and make
one destination lead to one complete Play-owned activity.

## Product Decision That Must Stay Visible

The prototype map presents Play as a visible node. Some architecture documents
recommend modelling it as an optional World Traditions pathway rather than one
of the reusable core eight nodes.

Do not remove or demote Play silently. For now:

- Keep Play visible on The Hearth map because it has a clear guitar-learning
  purpose and Ayla is actively designing it.
- Model it internally as a pathway-capable experience so the shared simulator
  engine does not assume every future simulator needs a Play node.
- Revisit its permanent map status only after the first complete Play activity
  proves its value.

## Tradition-Led Product Rule

Play is a world-traditions atlas, not a world-styles catalogue.

A genre or technique label may orient the learner, but it cannot be the whole
destination. A publishable destination must name the communities carrying the
tradition, what the music does in their lives, where it is practised, how it is
transmitted, the historical forces around it, and how it continues to live and
change. The learner is a respectful visitor trying one musical relationship,
not completing or mastering a culture.

## Alignment Scorecard

Scores describe the current standalone concept plus the active code behind it.

| Area | Score | Verdict |
| --- | ---: | --- |
| Distinct purpose | 3/5 | The intended purpose is clear, but the active flow still overlaps Knowing and Practice. |
| Visual metaphor | 4.5/5 | The atlas feels like a place and matches the image-led simulator language. |
| Guided route plus free exploration | 4/5 | The recommended red route and open destinations coexist well. |
| Real musical participation | 1/5 | Play currently ends before a groove, role exchange, recording, or musical reflection. |
| Learner progress and memory | 1/5 | Preview progress is hardcoded and the active Play flow writes no Play result. |
| Cross-node communication | 2/5 | Play can open Doing or Practice, but it does not return useful evidence to them. |
| Backend and handoff readiness | 2/5 | Destination content, renderers, and storage responsibilities still overlap. |
| Cultural accuracy and sourcing | 1.5/5 | Useful draft material exists, but claims and listening references need structured review. |
| Responsive and accessible entry | 4/5 | The concept works on laptop and mobile and uses real buttons and accessible labels. |

Overall: the first-click visual direction is approved in principle; the product
loop and data ownership need the real work.

## Keep

- The world atlas as Play's first-click metaphor.
- The existing `play-world-atlas.webp` artwork.
- One Journey-recommended destination plus free exploration.
- The active learner in the global profile control.
- Quiet progress rings, visited states, and faint future colours.
- One selected destination panel with one primary action.
- Pulse, hand, colour, and story as listening dimensions inside an activity.
- A brief sourced cultural doorway that changes how the learner listens or
  plays.
- A short contextual guide line beside the scene.
- The mobile stacking behaviour in the standalone concept.

## Change

- Make `Enter the music` open an actual Play activity, not another information
  page.
- Turn pulse, hand, colour, and story into moments in a musical sequence rather
  than four dashboard cards.
- Replace hardcoded preview progress with route and learner-progress selectors.
- Store destination coordinates as normalized percentages.
- Add a clear distinction between `Journey route` and `Explore freely` without
  adding a menu or permanent legend.
- Let an activity create a Practice recommendation and a Journey result.
- Add a return state such as `Continue the conversation` when the learner comes
  back.
- Separate destination data, activity data, route data, progress selection, and
  rendering.
- Give cultural claims explicit evidence states: documented, supported
  interpretation, oral tradition, contested, or needs review.

## Remove Or Retire Later

- The blank video element that looks playable but has no media.
- The emoji listening dashboard.
- The final Play screen that only redirects to Doing or Practice.
- Duplicate `showPlay` renderers after ownership tests cover the replacement.
- Absolute cultural-origin claims until reviewed and sourced.
- New decorative atlas imagery for this phase.

## Improved First-Click Hierarchy

The learner should read the screen in this order:

1. The atlas: this is a world of musical places.
2. The brightest marker: this is the place Journey recommends today.
3. The route sentence: this is why the place matters to the current lesson.
4. The destination panel: this is the living musical tradition and next action.
5. The guide: follow the route or explore freely.
6. Quiet progress: this is where the learner has been and what may return.

The current concept is close. The next visual pass should refine wording and
state meaning, not add more UI.

## Complete Play Route

```text
Atlas
-> select destination
-> short sourced listening arrival
-> meet the people and place
-> connect cultural context to something audible
-> find the pulse
-> find home/root
-> join with limited material
-> call and response
-> exchange or choose a musical role
-> make one variation
-> record or describe what sounded musical
-> save Play result
-> suggest what returns in Practice
-> update Journey evidence
-> return to atlas with progress shown
```

Pulse, hand, colour, and story remain useful, but they become contextual lenses
within this route. They should not interrupt the route with four equal cards.

## First Vertical Slice

Build only `A Minor Musical Conversation` in the Mississippi Delta destination.

1. Listen to one licensed, embedded, or clearly unavailable sourced groove.
2. Meet the people, place, and historical setting through one reviewed cultural
   doorway.
3. Hear how that context relates to the pulse, phrasing, instrument, or role.
4. Tap or mute the steady pulse.
5. Find A root notes as safe landing points.
6. Join with two or three notes from one A minor pentatonic box.
7. Play a short call and leave space for an answer.
8. Switch rhythm and lead roles, or choose one role when practising alone.
9. Change one rhythm, ending note, or phrase length.
10. Save what sounded musical, what should repeat, and how context changed the
    learner's listening.

This supports Jen's current consolidation without hardcoding Jen into the
renderer.

## Data Flow

```text
Journey route
  -> recommends Play destination and activity

Shared Play content
  -> destination
  -> cultural context and claim statuses
  -> sourced recording/resource
  -> activity and steps

Learner session
  -> role, duration, tempo, enjoyment, confidence
  -> pulse/root/phrase evidence
  -> reflection and optional recording reference

HearthProgressEvents
  -> play_activity_started
  -> play_step_completed
  -> play_activity_completed

Selectors
  -> update Journey evidence
  -> create Practice recommendation
  -> calculate atlas marker state
  -> provide Hearth reflection evidence
```

Shared content answers `what exists`. Learner memory answers `what happened for
this person`.

## Five Highest-Priority Improvements

1. Build one real Play-owned musical activity behind `Enter the music`.
2. Add pure destination, route, activity, and result contracts before expanding
   the UI.
3. Connect Play completion to shared progress events, Journey evidence, and a
   Practice recommendation.
4. Normalize hotspot coordinates and add alignment/regression checks.
5. Source and review the Mississippi content and listening item before treating
   it as finished educational material.

## Safe Implementation Roadmap

### Stage 1: Contracts And Tests

- Add pure data modules for destination, route, activity, and learner result.
- Add tests for normalized coordinates, recommended-route selection, and result
  conversion.
- Do not change the active UI yet.

### Stage 2: Approved Atlas Entrance

- Move the standalone first-click treatment into the active owner.
- Read marker states from selectors instead of hardcoded values.
- Verify desktop, mobile, keyboard focus, and one-destination selection.

### Stage 3: One Destination Arrival

- Replace the blank video shrine with a sourced listening arrival.
- Keep the atlas-to-destination transition visually continuous.
- Preserve one back route to the atlas.

### Stage 4: Musical Conversation

- Implement the eight-step activity.
- Keep tools available without turning the screen into a toolbar dashboard.
- Write shared progress events and the final reflection.

### Stage 5: Cross-Node Feedback

- Create the next Practice focus from the Play result.
- Update Journey evidence and atlas progress.
- Test return and resume behaviour for more than one learner.

### Stage 6: Cleanup

- Add renderer-ownership coverage.
- Retire duplicate Play renderers only after the new route is stable.
- Expand to another destination only after the first is educationally and
  technically complete.

## Regression Checks

- Map and Journey still open normally.
- The active learner controls route and progress.
- Switching learners does not leak progress.
- Every hotspot stays aligned at supported aspect ratios.
- Keyboard and touch users can select and enter a destination.
- Back returns to the same atlas state.
- Play completion writes one result, not duplicate events.
- Practice receives a useful recommendation.
- Journey receives evidence without marking unrelated categories complete.
- Missing audio produces an honest unavailable state, not a fake play button.

## Time And Credit Estimate

Audit and contracts are low-credit work.

- Stage 1: 60-90 minutes, low credit.
- Stage 2: 60-90 minutes, low-to-medium credit because of visual testing.
- Stage 3: 45-75 minutes once a valid listening resource is chosen.
- Stage 4: 2-4 hours in small tested slices.
- Stage 5: 60-120 minutes depending on existing selectors.
- No image generation is recommended for these stages.

## Next Approval Point

Approve the product decision and Stage 1 only:

> Keep the atlas concept, keep Play visible for now, and build the reusable data
> contracts plus regression tests before installing or deepening the UI.
