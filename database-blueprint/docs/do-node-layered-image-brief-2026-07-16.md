# Do Node Layered Image Brief - 2026-07-16

## Purpose

This note banks the current direction for improving the Do node without losing the clean drill wiring.

The goal is to stop the Do drill rooms from feeling like SVG/table prototypes and move them toward beautiful simulator rooms that still behave accurately.

## Working Decision

Use layered visuals.

Plain version:

1. Generated image layer: beautiful artwork or texture.
2. Exact code layer: strings, frets, fret markers, nut, soundhole guides, and alignment-critical parts.
3. Interactive layer: drill dots, progress rings, hover states, click actions, and lesson routing.

This lets the app keep the beauty of generated images without asking AI to draw exact guitar anatomy or UI text.

## Important Constraint

Do not bake drill dots, labels, buttons, or exact text into generated images.

AI images are useful for atmosphere, wood, light, and room feeling. Code should handle anything that must be exact, clickable, readable, or changeable.

## Left Hand Layer Prompt

Use this prompt for the next stricter Left Hand board image:

```text
Create a transparent PNG asset for a guitar-learning simulator.

Subject: a clean horizontal guitar neck wood surface only, viewed straight-on from above, like a polished classical/acoustic guitar fretboard board.

Important: no strings, no frets, no fret markers, no headstock, no guitar body, no hands, no text, no labels, no drill dots, no UI elements.

Style: warm polished dark-brown wood, subtle grain, premium game-like simulator asset, elegant Hearth Mastery aesthetic, soft golden/rainbow glimmers in the varnish reflection, not photorealistic stock photography, not cartoon.

Composition: wide horizontal 16:9, centered, flat and straight, with generous padding. The surface should be suitable for placing exact strings, frets, and clickable drill buttons over it later.

Background: perfectly flat solid #00ff00 chroma-key background for removal. The background must be one uniform color with no shadows, gradients, texture, reflections, or lighting variation. Do not use #00ff00 anywhere in the subject.
```

## Generated Wood Base - 2026-07-16

This prompt was used to generate the first reusable left-hand drill-board wood layer.

Saved files:

- Source chroma-key image: `images/doing/doing-neck-wood-base-v1-source.png`
- Transparent PNG: `images/doing/doing-neck-wood-base-v1.png`
- Cropped transparent board layer used in the UI: `images/doing/doing-neck-wood-base-v1-cropped.png`

Validation:

- final file has alpha transparency
- corners are fully transparent
- wood subject is opaque
- no strings, frets, fret markers, headstock, guitar body, hands, text, labels, drill dots, or UI elements

Use this asset as the base layer for exact code-drawn strings, frets, markers, drill dots, progress rings, and clickable zones.

Implementation note:

- The original transparent PNG keeps generous top/bottom padding from the generation prompt.
- The cropped PNG removes that transparent padding so the wood fills the coded drill board cleanly.
- Current preview screenshot: `tools/doing-left-hand-second-click-preview-2026-07-16.png`

## Next Do Node Work Brief

### 1. Clean the Do first-click image layout

The new guitar/arms image is good, but the click zones and labels need to feel intentional:

- Left Hand
- Right Hand
- Both Hands
- Map / Tuning

Right now it works, but it does not yet feel polished.

### 2. Polish the three drill boards

The current boards are functional, but still too grid/table-like.

Desired feeling:

- Left Hand: real neck/fretboard drill sheet
- Right Hand: strings over soundhole
- Both Hands: whole guitar coordination board

### 3. Improve drill-dot meaning

Make it obvious what each dot means without hovering:

- level colour
- progress ring
- short drill initials
- possible tiny category grouping

### 4. Wire board categories more intelligently

Some drills belong in more than one board.

Example:

- rhythm can appear in Right Hand and Both Hands
- rhythm should not clutter Left Hand unless the drill truly depends on fretting-hand rhythm

Review categories so each board feels purposeful, not crowded.

### 5. Test with a real lesson use-case

Use Jen as the reality check:

`right-hand patterns + A minor pentatonic consolidation`

Question:

Can the Do node help Ayla find the right drill quickly during a real lesson?

## Suggested Next Bite

Polish the Do first-click screen first, because that is the doorway.

Then move one layer deeper into the three boards.
