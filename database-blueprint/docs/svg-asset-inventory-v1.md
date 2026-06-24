# SVG Asset Inventory V1

## Purpose

This inventory separates the large scene SVGs from the small toolkit icons.

The scene SVGs matter for node identity and interaction design. The toolkit icons are simple reusable UI assets.

## Big Scene SVGs

### brain-map.svg

- viewBox: `0 0 1600 950`
- used by: Hearth node
- embedding: fetched by `hearth-brain.js` and injected into `#p-hearth`
- status: blocked in prototype by `scene-first.js`
- preserved in blueprint: yes
- blueprint path: `database-blueprint/assets/svg/brain-map.svg`

Recommendation:

Keep the brain map as a concept, but improve it freely. The important idea is Hearth as a brain/body/progress reflection scene, not the exact SVG implementation.

### cauldron.svg

- viewBox: `0 0 1024 1024`
- used by: Create node
- embedding: `<img>` in `showCreate()` HTML
- status: live in prototype
- preserved in blueprint: yes
- blueprint path: `database-blueprint/assets/svg/cauldron.svg`

Recommendation:

Keep the cauldron as a scene asset. The SVG itself is decorative; ingredient selection, stirring, prompt generation, notes, and projects are HTML/CSS/JS/data.

## Toolkit / Small UI Icons

All known toolkit icons:

- use 24 by 24 viewBox
- use gold stroke `#d4af69`
- use no fill
- are embedded as inline `<img>` tags or small UI icon assets
- have no internal interactivity

Known icons:

- `icon-fretboard.svg`
- `icon-book.svg`
- `icon-beatbot.svg`
- `icon-metronome.svg`
- `icon-notepad.svg`
- `icon-star.svg`

Currently preserved in blueprint:

- `database-blueprint/assets/svg/icon-fretboard.svg`
- `database-blueprint/assets/svg/icon-book.svg`

Known but not yet physically copied into blueprint:

- `icon-beatbot.svg`
- `icon-metronome.svg`
- `icon-notepad.svg`
- `icon-star.svg`

## Rebuild Guidance

Do not over-engineer the small icons.

They can be normal assets or icon components.

For the big scene SVGs:

- store asset metadata in `media_assets`
- keep usage purpose clear
- do not hide critical data inside SVG markup
- do not bind core app behavior to inline SVG handlers
- preserve accessibility labels or rebuild them properly

## Related Files

- `database-blueprint/source/svg_asset_inventory_v1.csv`
- `database-blueprint/seeds/svg_asset_inventory_v1.json`
- `database-blueprint/docs/node-interior-architecture-v1.md`
- `database-blueprint/docs/create-cauldron-system-v1.md`
- `database-blueprint/docs/svg-map-technical-notes-v1.md`
