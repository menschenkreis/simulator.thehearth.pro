# Hearth Audio and Create Node: Integration & Audit Brief

## Purpose

Audit and complete two connected parts of The Hearth Mastery simulator:

1. The shared sound system: map sounds, rewards, ambience, and future practice/play-along audio.
2. The Create node: the Cauldron, musical seeds, and how creative work connects to Journey, Do, Practice, and Play.

Keep the work modular, quiet, learner-specific, and compatible with a future backend.

## Audio: Current State

Already done:

- Guitar audition board:
  `tools/guitar-map-sound-audition.html`
- Sound strategy:
  `database-blueprint/docs/audio-system-plan-v1.md`
- Around 80 short guitar WAV samples found in:
  `/Users/alessandralove/Desktop/guitar sounds`
- Existing app sound is mostly browser-generated through `playSfx(type, detail)` inside `simulator.html`.
- A campfire ambience file already exists.
- Main map nodes already call `playSfx("node-enter", nodeId)`.

Ayla has chosen preferred sounds in the audition board, but the final choices are only stored locally in the preview. Before integrating, obtain a written list or screenshot of the approved source filename for:

- Foundation
- Do
- Practise
- Play
- The Hearth
- Know
- Study
- Create
- Mastery
- Clean-take reward

Do not inspect browser local storage.

## Audio: Required Work

1. Audit every current sound trigger, generated sound, ambience source, mute setting, and overlap risk.
2. Replace hardcoded sound behaviour with a small shared audio manager and manifest.
3. Import only approved compressed app copies. Keep original WAV masters outside the repository.
4. Make map sounds data-driven: one short guitar identity sound per node, only on node arrival, never on hover.
5. Add device-level mute and volume controls for:
   - interface sounds
   - ambience
   - practice/play-along audio
6. Keep one ambience or backing loop active at a time, while allowing light overlap for short effects.
7. Preserve synthetic fallback sounds until each replacement asset is verified.
8. Do not use punitive sounds for mistakes, missed practice, or unfinished work.
9. Do not bundle commercial recordings or samples without confirmed app-use rights.

Suggested architecture:

- `assets/js/audio-library.js`
- `adapters/audio-manager.js`
- `assets/audio/ui/`
- `assets/audio/rewards/`
- `assets/audio/ambience/`
- `assets/audio/grooves/`

## Practice and Play-Along Audio

Treat grooves as a separate library from interface sounds.

Each groove should declare:

```text
id
title
key
BPM
time signature
bar length
loopable
energy
instrumentation
intended use
rights status
source master
```

First Level 1 target set:

1. A-minor root-note pulse at 60, 76, and 100 BPM.
2. Rhythm-guitar backing with space for lead guitar.
3. Call-and-response backing for two players.
4. One simple rhythm-and-lead song arrangement using A minor pentatonic material.

The folder named `drum sounds` has not yet been located. Do not substitute random downloaded or commercial music.

## Create Node: Current State

Already done:

- The original Cauldron/fire metaphor is preserved.
- Create has an image-led entrance with clear routes: return to the fire, add an ingredient, ask the fire, and open the archive.
- Each learner has separate Create state: current seed, saved projects, and entry intent.
- The Cauldron records creative actions such as starting, mutating, and saving a seed.
- Journey can send Jen’s A-minor musical conversation into Create as a prefilled riff prompt.
- Do can send the `A Root Notes in Time` drill into Create as a prefilled riff prompt.
- Create receives and displays source context rather than losing where the idea came from.

## Create Node: Required Work

1. **Make a saved seed genuinely usable**
   - Attach a recording.
   - Keep the original Journey lesson, drill, Practice session, or Play activity visible as source context.
   - Allow a learner to reopen and continue a seed without starting over.

2. **Build a restrained archive**
   - Filters: current, saved, needs another session.
   - Show title, source, last touch, and one short next action.
   - Avoid a dense project dashboard.

3. **Improve the creative output**
   - Support a small set of structured fields:
     - riff idea
     - rhythm idea
     - lyric or title fragment
     - chord/mood idea
     - reflection
   - Make it possible to make several versions without overwriting an earlier idea.
   - Keep the Cauldron playful, but never pretend it has “made a song” when it has only given a prompt.

4. **Complete the learning loop**
   - Practice recording or reflection can become a Create seed.
   - A Play activity can send a musical moment into Create.
   - A saved seed can appear as evidence in Journey progress and the whole-simulator progress view.
   - Create should recommend returning to Practice or Play when an idea needs repetition or a groove.

5. **Guide behaviour**
   - The guide should refer to the source honestly:
     - “This came from your A-root drill.”
     - “You found this phrase while jamming.”
   - Guide text must be brief, contextual, and never generic filler.

6. **Per-learner safety**
   - No Jen-specific information may be hardcoded into the Create UI.
   - Every seed, recording, archive item, and completion event must belong to the active learner profile.

7. **Audio integration**
   - Create should use the shared audio manager, not its own separate sound code.
   - Possible sounds:
     - a quiet cauldron ignition
     - one restrained sound when ingredients combine
     - a warm save/seed sound
   - No constant looping sound by default.

## Audit Questions

Review and answer plainly:

1. What Create behaviour is currently real and what is only presentation?
2. Which data is currently stored safely per learner, and what still needs a backend?
3. Are Journey and Do handoffs reusable enough for Practice and Play to use next?
4. Which Create actions should count toward progress, and which should remain private experimentation?
5. What is the smallest useful next version that makes Create practical for Ayla and Jen?

## Quality Requirements

- Do not redesign unrelated nodes.
- Do not generate images.
- Do not replace the Cauldron concept.
- Do not create a conventional dashboard.
- Prefer compact, image-led interfaces with a few clear actions.
- Use reusable data and renderer modules.
- Test Safari on macOS, rapid clicks, muted audio, missing audio files, and returning to an unfinished seed.
- Keep original WAV masters out of GitHub; add only approved compressed app copies.

## Expected Deliverables

1. Plain-language audit findings.
2. A proposed shared audio manifest and manager.
3. Final approved map-sound mapping.
4. A Create-node gap analysis and prioritised build order.
5. A small first implementation plan with time estimate.
6. A regression test checklist.

