# Create Cauldron System V1

## Purpose

The Create node is a cauldron scene plus a creative prompt engine.

The cauldron SVG is visual theatre. The interaction lives in HTML, CSS, JavaScript, and data.

## Prototype Wiring

Prototype embedding:

`<img src="assets/svg/cauldron.svg">`

Location:

Inside `.cauldron-vessel`, around line 4412 of the prototype `simulator.html`.

Styling:

- max width around `320px`
- centered
- prompt overlay positioned above the image

Prompt overlay:

- element ID: `#cauldronPrompt`
- positioned with `position: relative`
- uses `margin-top: -120px`
- uses `z-index: 2`
- visually floats over the cauldron illustration

## Interactivity

The SVG itself is decorative.

Interactive parts are outside the SVG:

- `.cauldron-ingredient`
- `.cauldron-ingredient.selected`
- `.cauldron-stir-btn`
- `.cauldron-bubbling`
- `cauldronMix()`
- `#cauldronPrompt`

Prototype behavior:

- selecting ingredients highlights them with gold border and glow
- pressing the stir button calls `cauldronMix()`
- stirring triggers `.cauldron-bubbling`
- `.cauldron-bubbling` triggers `cauldron-bubble-anim`
- `cauldronMix()` chooses a creative prompt
- notes are saved to `localStorage['cauldron-notes']`
- projects are tracked in `localStorage['hearth-create-projects']`

## Prototype Ingredient Set

The older `create.js` system uses 8 cauldron ingredients:

- emotion
- time
- constraint
- collaboration
- cover
- genre
- acoustic
- lyrical

## Newer Obstruction/Combo Set

The newer obstruction/combo files use 5 creative elements:

- lyrics
- melody
- riff
- rhythm
- story

Files:

- `assets/js/create-obstructions.js`
- `assets/js/create-combos.js`

## Recommendation

Do not treat this as a conflict.

The better model is two layers:

### Creative Elements

What the learner is making with:

- lyrics
- melody
- riff
- rhythm
- story

### Obstruction Modifiers

How the cauldron bends the task:

- emotion
- time
- constraint
- collaboration
- cover
- genre
- acoustic
- lyrical

This gives the Create node more depth than either system alone.

Example:

The learner chooses `lyrics + rhythm` as creative elements, then the cauldron applies `time + emotion` as obstruction modifiers.

## Database Implication

Recommended tables or data groups:

- `create_ingredients`
- `create_ingredient_groups`
- `create_obstructions`
- `create_combos`
- `creative_projects`
- `creative_project_notes`

Recommended ingredient fields:

- `slug`
- `label`
- `group`
- `description`
- `ui_role`
- `color`
- `sort_order`

Recommended prompt fields:

- `level`
- `category`
- `ingredients`
- `modifier_ingredients`
- `constraint`
- `prompt`
- `payoff`

## Rebuild Guidance

Keep:

- cauldron SVG
- ingredient selection
- stir button
- bubbling animation
- prompt overlay
- notes/project saving
- wild obstruction energy

Improve:

- store ingredients and prompts as data
- reconcile the 5-element and 8-modifier vocabularies
- save projects through student/profile data
- allow prompt history
- allow export/share later

Avoid:

- making the SVG itself responsible for interaction
- storing prompt logic only in hardcoded JavaScript
- losing the stronger 50 obstruction and 32 combo prompt set
