# Play World Atlas Redesign V1

Status: audited design direction, ready for a small first-click implementation pass.

## Purpose

Play is where learned material becomes music. Its main interface is the musical
world atlas. Journey may recommend a route, but the learner can also explore the
atlas freely.

Play should help a learner listen, find the pulse, find home, join in, converse,
explore, make a musical choice, and remember what happened. It should not become
another lesson dashboard, drill library, or practice timer.

## What Exists Now

- `adapters/play-atlas-viewer.js` is the active owner of the atlas entrance and
  replaces `showPlay` when it loads.
- `assets/js/play-worldmap.js` contains 12 destinations and their listening-lens
  copy. It also contains an older SVG map implementation that the active atlas
  does not use.
- `assets/js/play-world.js` owns the destination, listening-lens, and lens-detail
  screens.
- `adapters/play-world-viewer.js` and the `showPlay` implementation inside
  `simulator.html` are older renderers that are still loaded but lose ownership
  to the active atlas viewer.
- `assets/js/play.js` is an older genre-and-song catalogue. It is loaded, but it
  is not the active Play experience.
- `images/play-world-atlas.webp` is the current visual base. It is strong enough
  to keep for the next iteration; a new generated image is not required yet.

## What Works And Should Remain

- The world map is the first-click metaphor.
- The atlas image, glowing destinations, and click-to-enter behaviour.
- One destination at a time rather than a visible genre menu.
- The four useful listening questions: pulse, hand, colour, and story.
- A clear route back to the world map.
- Named artists and suggested listening as the beginnings of source-aware
  content.
- The existing node doorway language: `Open the atlas`.

## Main Problems

### 1. Play stops before the learner plays

The current route is:

`Atlas -> destination explanation -> four listening cards -> text instruction`

The final actions send the learner to Do or Practice. There is no Play-owned
groove, call and response, role exchange, recording, or musical reflection.

### 2. Several implementations overlap

Play has an active atlas renderer, a legacy world viewer, an older inline
`showPlay`, an unused SVG map, and a separate genre catalogue. Script order
decides which renderer wins. This is a regression risk and makes handoff harder.

### 3. The map has no learner route or progress

The active learner does not yet affect the map. There is no current destination,
Journey recommendation, visited state, saved place, activity progress, recording,
or return invitation.

### 4. Hotspot coordinates are approximate

The image uses a 1672:941 aspect ratio while the hotspot SVG uses a 900:600
viewBox. The overlay stretches to fit, so future responsive changes can cause
destination drift. Coordinates should be stored as normalized percentages.

### 5. Cultural content needs a sourced review

The current destination objects contain artist names and listening suggestions,
but no structured citations, URLs, source status, review status, or licensing
information. Some copy uses broad geographic categories or absolute origin
claims. Treat all current cultural descriptions as draft material until each
destination has been reviewed and sourced.

Examples that require careful review include broad labels such as `West Africa`,
phrases such as `where it all began`, and simplified claims about one tradition
being the direct ancestor of another.

## What Should Change

- Keep the atlas visible and make it the primary surface, not a picture inside a
  decorative card.
- Remove the duplicate Play title and reduce the large permanent guide panel.
- Move the guide beside the atlas with one short, contextual line.
- Highlight one Journey-recommended destination and one clear action.
- Add quiet route lines, progress rings, visited markers, and saved places.
- Reveal destination names and context on focus or selection instead of filling
  the map with labels.
- Replace the four emoji cards with a destination experience that preserves the
  sense of place and leads into actual music.
- Replace the blank video placeholder with a real sourced listening item or a
  deliberate `audio coming later` state that does not look playable.
- Add one complete Play-owned activity before adding more destinations.
- Move new Play data out of rendering code and into reusable data modules.
- Retire duplicate renderers only after ownership tests cover the new path.

## First-Click Layout

The next atlas entrance should use the existing atlas image.

1. The atlas sits centred and as large as the viewport allows.
2. The guide sits to the left or lower-left, outside the map artwork.
3. The active learner appears in the existing global learner control, not in a
   second selector.
4. A small route compass shows one sentence, for example:
   `Today's route: make A minor pentatonic musical.`
5. The recommended destination has the brightest progress ring.
6. Visited destinations have a quiet completed ring, not a completion stamp.
7. Future destinations keep a faint hint of their colour.
8. Selecting a destination reveals its name, tradition, reason for recommendation,
   and one action: `Enter the music`.
9. Free exploration remains available by selecting any open destination.

No new atlas image is required for this pass. The cheaper and more reliable path
is to improve the HTML/CSS overlay, route data, and hotspot alignment first.

## Reusable Data Model

### Destination

```text
id
name
place_label
tradition_label
coordinates { x_percent, y_percent }
marker_colour
summary
level_range
listening_focus { pulse, hand, colour, story }
artist_refs[]
recording_refs[]
source_refs[]
content_status
review_status
```

### Route

```text
id
learner_id
title
reason
journey_level_id
lesson_id
destination_ids[]
activity_ids[]
current_destination_id
status
```

### Activity

```text
id
destination_id
title
summary
roles[]
required_skills[]
key_or_centre
tempo
tools[]
steps[]
source_refs[]
progress_tags[]
```

Activity steps use the shared Play sequence:

`listen -> pulse -> home -> join -> converse -> explore -> own -> remember`

### Play Progress Event

Use `HearthProgressEvents` rather than creating another storage system.

```text
event_type: play_activity_completed
node_id: play
learner_id
journey_level_id
lesson_id
duration_minutes
rating
note
data {
  route_id
  destination_id
  activity_id
  role
  tempo
  key_or_centre
  enjoyment
  confidence
  stayed_with_pulse
  found_home
  recording_id
  revisit
}
```

## First Vertical Slice

Build one reusable activity: `A Minor Musical Conversation`.

1. Listen to a sourced, simple A minor groove.
2. Find the pulse with muted strings or one A note.
3. Find A root notes as safe landing points.
4. Join with two or three notes from one pentatonic box.
5. Play a short call and leave space for an answer.
6. Switch rhythm and lead roles.
7. Make one small variation.
8. Record what sounded musical and what should return in Practice.

The activity should write one Play progress event and create a useful Practice
recommendation. Jen's information belongs in learner/route data, not in the
renderer.

## Safe Build Order

1. Add pure Play destination, route, and activity models.
2. Add tests for normalized hotspot coordinates and learner route selection.
3. Improve only the atlas first-click overlay using the existing image.
4. Verify desktop and mobile alignment.
5. Build one destination experience.
6. Build `A Minor Musical Conversation`.
7. Connect its reflection to Practice and Journey.
8. Review and source one destination before expanding cultural content.
9. Remove duplicate legacy renderers only after ownership checks pass.
