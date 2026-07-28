# Create Node Audit - 2026-07-18

## Purpose

Create is the simulator's personal-material room. It turns something the learner has met elsewhere - a rhythm, chord, scale phrase, lyric, sound, or question - into a small musical experiment worth keeping.

It is not a lesson dashboard, a drill library, or a generic prompt machine.

## What Is Working

- The Cauldron is a strong, distinct visual metaphor for transformation.
- The image-led entrance gives four clear routes: return to a seed, add an ingredient, receive a prompt, or open saved fragments.
- Eight creative starting points already exist: lyrics, melody, riff, chords, rhythm, structure, mood, and wildcard.
- A seed can hold a title, prompt, notes, lyric, riff idea, rhythm idea, mutation, and saved date.
- The active renderer is isolated in `adapters/create-entry-controller.js`, then hands over to `adapters/create-cauldron-scene-viewer.js`.

## Gaps Found

1. Create previously looked learner-aware but used shared browser keys. Ayla and Jen could have seen the same working seed and archive.
2. Saving the same seed twice created duplicates instead of updating that saved fragment.
3. Create activity did not feed the shared progress timeline.
4. Heat looked expressive but did not affect the creative instruction.
5. Journey, Do, and Practice do not yet pass a specific musical fragment into Create. The learner must currently remember it themselves.
6. The archive stores written material only. It does not yet link recordings, source drills, lesson context, or a next practice action.

## Improvements Applied

- `adapters/create-state.js` now keeps `current`, `projects`, and entry intent inside the active learner's Create profile. It performs a one-time migration of the old local browser values.
- Saving now updates an existing seed by ID instead of producing duplicate archive entries.
- Starting, mutating, and saving a seed now add structured events to `HearthProgressEvents`.
- Each heat level now adds a real, proportional creative constraint to the resulting seed.

## Cross-Node Contract

The next clean increment is a small reusable handoff object, not direct calls between screens:

```js
{
  source_node_id: "journey" | "doing" | "practice" | "play",
  source_id: "lesson-or-drill-id",
  learner_id: "...",
  suggested_ingredient: "riff" | "rhythm" | "melody" | "chords",
  starter: "A minor pentatonic, box 1",
  instruction: "Make a four-note answer over an A minor groove."
}
```

Create should use this to preselect one ingredient and show one short, playable starting instruction. It must remain optional: a learner can always enter Create freely.

## First Implemented Handoffs

Jen's Journey companion now provides one direct handoff from its `Conversation` step:

- source: `Journey / A minor pentatonic consolidation`
- suggested ingredient: `riff`
- starter: `A minor pentatonic root notes as safety points`
- instruction: `Make a two-bar answer from one A root note and two nearby pentatonic notes over an A minor groove.`

The Cauldron receives this as source context, selects `Riff`, and keeps the original lesson visible while the learner creates.

The reviewed Do drill `A Root Notes in Time` now offers the same optional handoff after its feedback controls:

- source: `Do / A Root Notes in Time`
- suggested ingredient: `riff`
- starter: `A root notes in time`
- instruction: `Turn the four-bar root-note phrase into a two-bar riff, keeping an A root as home.`

This deliberately does not mark the drill complete. The learner can use the invitation when the phrase begins to feel musical, while the drill's own feedback still records how the physical practice went.

## Next Build Order

1. Let a saved seed attach a recording and its source lesson or drill.
2. Add a gentle archive filter: current, saved, and needs another session.
3. Surface one Create accomplishment in Journey and the whole-simulator progress view.

## Jen Test

From Jen's A minor pentatonic consolidation lesson, the handoff should arrive as:

- ingredient: `riff`
- starter: `A minor pentatonic root notes`
- instruction: `Make a two-bar answer from one root note and two nearby notes over an A minor groove.`

That keeps the lesson principle intact: technique returns to music, then the music becomes personal material.
