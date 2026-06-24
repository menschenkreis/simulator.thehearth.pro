# SVG Map Technical Notes V1

## Source

Captured from Ayla's prototype map export on 23 June 2026.

Preserved files:

- `database-blueprint/source/map-raw.svg`
- `database-blueprint/docs/map-reference-prototype-2026-06-23.md`
- `database-blueprint/source/map_svg_nodes_v1.csv`
- `database-blueprint/source/map_svg_connections_v1.csv`

The export confirms the raw SVG markup, node positions, handlers, icon files, connection lines, animation paths, CSS classes, `NODE_DATA` dispatch map, and travelling-flame system.

## Coordinate System

The map uses:

`viewBox="0 0 700 1000"`

## Node Coordinates

| Node | X | Y | Prototype Role |
|---|---:|---:|---|
| Foundation | 350 | 73 | Top center |
| Doing | 146 | 283 | Left branch |
| Knowing | 554 | 283 | Right branch |
| Practice / Practise | 248 | 388 | Left, below Doing |
| Study | 452 | 388 | Right, below Knowing |
| The Hearth | 350 | 494 | Dead center |
| Play | 88 | 682 | Far left |
| Create | 612 | 682 | Far right |
| Mastery | 350 | 813 | Bottom center |

Technical node records are available in:

`database-blueprint/source/map_svg_nodes_v1.csv`

## Visual Structure

The map has:

- a dark background rectangle
- central mandala guides
- gold connection lines using `class="gold-conn"`
- central spine segments using `class="conn-spine"`
- level tick marks using `class="conn-tick"`
- level labels `L1` through `L8`
- travelling dots using `animateMotion`
- orbiting dots around each node
- a travelling flame positioned at the current node by CSS transform

Known central spine segment IDs:

- `spine-l1`
- `spine-l2`
- `spine-l3`
- `spine-l4`
- `spine-l5`
- `spine-l6`
- `spine-l7`
- `spine-l8`

Important implementation note:

The central spine segments have IDs. Most `gold-conn` branch lines do not have unique IDs in the raw SVG. They are distinguishable by `class`, `data-path`, and coordinates. In the rebuild, add stable IDs to every meaningful connection.

## Interaction Pattern

Each node is an SVG `<g>` group with inline handlers.

Current prototype behavior:

- hover calls `showNodePreview`
- click calls `showNodeInfo`
- tooltip overlay ID is `#ni`
- tooltip shows emoji, tag, title, description, and an `Enter Node` button

Prototype dispatch detail:

- SVG `data-node="practise"` maps to `NODE_DATA.action = "practice"`
- recommended canonical database slug is `practice`
- raw Hearth group uses `showNodePreview('hearth')` / `showNodeInfo('hearth')`, but does not include a `data-node="hearth"` attribute in the exported SVG

Rebuild recommendation:

Do not preserve this as global inline handlers.

Instead:

- map node data should define `node_slug`, route, icon, coordinates, and unlock rule
- frontend map component should attach hover/click behavior
- tooltip content should come from `app_nodes` and the node registry
- progress/lock state should come from student progress data

## Connection Shape

Prototype branch logic:

1. Foundation branches left to Doing.
2. Doing descends to Practice.
3. Practice descends to The Hearth.
4. Foundation branches right to Knowing.
5. Knowing descends to Study.
6. Study descends to The Hearth.
7. The Hearth fans outward to Play and Create.
8. Play and Create converge into Mastery.
9. A central spine runs from Foundation down toward Mastery with `L1` through `L8` ticks.

Technical connection records are available in:

`database-blueprint/source/map_svg_connections_v1.csv`

## Product Recommendation

The visual map currently includes Play.

For the rebuilt product, keep Play's visual and content value, but do not automatically make it one of the core 8 app nodes.

Recommended interpretation:

- Core node: Hearth
- Optional pathway: Play / World Traditions

This preserves the prototype's world-map idea without sacrificing the more important Hearth learning-science layer.

## Still Recommended For The Rebuild

The current SVG is usable as a visual reference, but Martin should not preserve its fragility.

Recommended improvements:

- add stable IDs to every node group
- add stable IDs to every meaningful branch connection
- remove inline `onmouseenter`, `onmouseleave`, and `onclick` handlers
- use component-level event binding instead
- store node identity, route, icon, coordinates, and lock state in data
- keep `data-node` or an equivalent data attribute for inspection/debugging
- make `practice` the canonical database slug, even if the visual label says Practise
- keep Play as a prototype map anchor / optional pathway unless Ayla intentionally promotes it
