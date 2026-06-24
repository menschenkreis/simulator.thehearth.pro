# Prototype Artifact Policy

## Purpose

The current simulator contains valuable artifacts: SVGs, icons, node scenes, prompt systems, localStorage state, lesson data, and interaction experiments.

These artifacts are not final specifications.

They are concept evidence.

## Rule

Preserve the meaning. Improve the implementation.

## What To Preserve

- the learning metaphor
- the emotional direction
- the learner-facing purpose
- the source/content insight
- the data relationship discovered
- the fact that an interaction mattered
- the known bug or architectural lesson

## What May Change

- visual design
- layout
- animation
- copy
- icons
- exact SVG shape
- interaction pattern
- frontend framework/component structure
- backend schema details
- route structure
- database table names

## How To Use Prototype Files

Use prototype files to answer:

- What was this trying to do?
- What data did it need?
- What did the learner experience?
- What broke?
- What should the rebuild support cleanly?

Do not use prototype files to insist:

- it must look exactly like this
- it must use the same global functions
- it must render into the same DOM panel
- it must use the same localStorage key forever
- it must keep the same hardcoded arrays

## Examples

### SVG Map

Keep:

- map as symbolic world
- node positions as useful starting points
- connection/progression idea
- travelling flame concept if it still works

Improve:

- stable SVG IDs
- responsive layout
- accessible node controls
- route-based navigation
- data-backed lock/progress state

### Create Cauldron

Keep:

- cauldron scene
- ingredient selection
- prompt brewing
- wild obstruction energy

Improve:

- ingredient taxonomy
- prompt history
- project saving
- export/share later
- cleaner prompt engine

### Hearth Brain

Keep:

- brain as learning/body/mind metaphor
- skill-region idea
- live progress reflection

Improve:

- usefulness of stats
- clarity of skill regions
- mobile layout
- real database-backed progress

### Doing Fretboard

Keep:

- fretboard as physical drill map
- six string rows
- eight levels
- pass-condition coaching

Improve:

- hardcoded drill placement
- integration with Practice
- filters/search
- mobile behavior

## Message For Martin

The prototype should be read like a sketchbook and field report.

It contains strong ideas and fragile code.

The rebuild should honor the ideas, not the fragility.

For the full current inventory snapshot, see:

- `database-blueprint/docs/prototype-inventory-snapshot-v1.md`
- `database-blueprint/docs/asset-inventory-prototype-2026-06-23.md`
