# Node First Click Rules

The first click of a node is the doorway. It should not feel like a dashboard.

Every node doorway should answer four things immediately:

1. Where am I?
2. What is this place for?
3. What is the one obvious thing I can do first?
4. How do I return to the main map?

## Current Doorway Pattern

When a learner clicks a node on the main map, the small node card should use:

- A short place label.
- A plain purpose sentence.
- A concrete action sentence.
- One primary button with an action-specific label.

Examples:

- Practise: Begin practice.
- Play: Open the atlas.
- Do: Choose a drill.
- Know: Open the library.
- Study: Enter the chamber.

## Node Doorway Audit

| Node | First click metaphor | Current state | Next refinement |
| --- | --- | --- | --- |
| Foundation | Guitar neck threshold | Strong | Keep lesson path calm and sequential. |
| Journey | Guitar level path | In progress | Keep it as the learner path, not a dashboard. |
| Do | Guitar body training map into physical boards | In progress | Left hand, right hand, and both hands should open distinct drill boards before drill detail. |
| Practise | Candle timer | Strong | Add better practice feedback later. |
| Play | World atlas | Strong | Add sound/groove pathways later. |
| Know | Reference library | Improved doorway | Keep the first click to one recommended shelf; full shelves stay behind Browse all shelves. |
| Study | Key chamber | Strong | Connect doors to real study actions over time. |
| Create | Cauldron | Strong | Keep creative prompts simple and playable. |
| Hearth | Layered Inner Instrument | Clearer doorway | Replace the rectangular body artwork and dashboard-like summaries with coordinated clickable transparent layers for brain, hands, eyes, ears, breath/body, feeling, and guitar integration. |
| Mastery | Phoenix transformation chamber | Clearer doorway | Build artist examples and transformation prompts. |

## Design Guardrails

- First click is a place, not a menu.
- One obvious next action is better than many equal options.
- The guide character should reduce anxiety, not add instructions.
- Node text should say what it is in plain language.
- Deeper controls can appear after the learner enters the room.
- Generated node/room artwork should not have a baked rectangular background. Prefer transparent-background assets, or generate on a removable chroma-key background and remove it before installing.

## Foundation Visual Rebuild Note

Foundation should eventually use the same clean image logic as Journey:

- A transparent or clean-background guitar neck path.
- A simple gateway/threshold at the end of the neck.
- No busy scenic background.
- Existing lesson/fret logic should stay; only the visual scene and overlay alignment need to be rebuilt.

This is a medium visual pass, not a backend rebuild.

## Hearth Visual Rebuild Note

Hearth should use one layered Inner Instrument composition rather than a
rectangular room image plus duplicate system menus.

- The guitar is the central integration spine.
- Brain, eyes, ears, hands, breath/body, and feeling are separate transparent
  visual layers.
- The layers form one composition but can glow and open independently.
- Labels appear on hover/focus rather than being baked into the art.
- The guide sits beside the scene and uses one plain sentence at a time.
- The first click stays visual; detailed anatomy and exercises begin after a
  system is selected.
- The active renderer remains `adapters/hearth-body-viewer.js`; do not revive a
  competing Hearth renderer.

The full art, interaction, content, and implementation brief lives in
`database-blueprint/docs/hearth-node-rebuild-brief-2026-07-18.md`.

## Do Visual Rebuild Note

Do is the physical training node. Its first click should show the guitar and hands, then route the learner into one of three boards:

- Left Hand: a guitar neck drill board for fretting, reach, pressure, shifts, scale boxes, and clean contact.
- Right Hand: a soundhole/string board for picking, strumming, rest/free stroke, PIMA, tone, accents, pulse, and groove.
- Both Hands: a whole-guitar board for coordination, clean sound, timing, chord changes, scale rhythm, riffs, and application.

These boards should use the existing drill data, level filters, genre filters, and progress states. The visual layer should orient the learner; it should not duplicate or hardcode the drill content.
