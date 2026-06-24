# THE HEARTH MASTERY — SVG MAP REFERENCE
Extracted: 23 June 2026 from simulator.html lines 1481-1745

---

## SVG CONTAINER
- `viewBox="0 0 700 1000"`
- class: `map-svg`
- xmlns: `http://www.w3.org/2000/svg`

---

## NODE POSITIONS (cx, cy) — all use `mn-ring` radius 48, `touch-area` radius 65

| # | Node | data-node | cx | cy | Icon File |
|---|------|-----------|----|----|-----------|
| 1 | Foundation | `foundation` | 350 | 73 | `images/foundation-icon.png` |
| 2 | Doing | `doing` | 146 | 283 | `images/doing-icon.png` |
| 3 | Knowing | `knowing` | 554 | 283 | `images/knowing-icon.png` |
| 4 | Practise | `practise` | 248 | 388 | `images/practise-icon.png` |
| 5 | Study | `study` | 452 | 388 | `images/study-icon.png` |
| 6 | Hearth | `hearth` | 350 | 494 | `images/hearth-icon.png` |
| 7 | Play | `play` | 88 | 682 | `images/play-icon.png` |
| 8 | Create | `create` | 612 | 682 | `images/create-icon.png` |
| 9 | Mastery | `mastery` | 350 | 813 | `images/mastery-icon.png` |

**Special:** Mastery has 8 concentric `mastery-ring` circles (r=140 down to r=48) plus a dotted outer ring (r=155).
**Special:** Foundation has an extra `foundation-glow` dashed circle at r=60.
**Special:** Travelling flame 🔥 is a `<text>` element at (350, 73) that moves via CSS `transform`.

---

## CLICK HANDLERS — Every Node `<g>` Element

Each node group has these attributes:
```
onmouseenter="showNodePreview('<node>',event)"
onmouseleave="hideNodePreview()"
onclick="showNodeInfo('<node>')"
data-node="<node>"
```

### What showNodeInfo() does (line ~1890):
1. Looks up `NODE_DATA[id]` for title, desc, action
2. Calls `playSfx('node-enter')`
3. Stores `_activeNode = id`
4. Calls `moveFlame(id)` — animates 🔥 to the node's position
5. Calculates delay based on flame route hops
6. After delay, calls `enterNodeAction(data)` which dispatches:

| data-node | NODE_DATA.action | Function Called |
|-----------|-----------------|----------------|
| `foundation` | `'foundation'` | `showFoundation()` |
| `hearth` | `'hearth'` | `showHearth()` |
| `doing` | `'doing'` | `showDoing()` |
| `knowing` | `'knowing'` | `showKnowing()` |
| `practise` | `'practice'` | `showPractice()` |
| `study` | `'study'` | `showStudy()` |
| `play` | `'play'` | `showPlay()` |
| `create` | `'create'` | `showCreate()` |
| `mastery` | `'mastery'` | `showMastery()` |

**Note:** `practise` (SVG data-node) maps to `practice` (NODE_DATA.action key).

### What showNodePreview() does:
Shows the node info overlay panel (`#ni`) with emoji, tag, title, description, and "Enter Node →" button. The `enterNode()` function calls the same dispatch as above.

### What hideNodePreview() does:
Hides `#ni` and `#niOverlay`.

---

## CONNECTION LINES — IDs and Attributes

### Central Spine (vertical, Foundation → Hearth → Mastery)
| ID | x1,y1 | x2,y2 | class | data-path |
|----|--------|--------|-------|-----------|
| `spine-l1` | 350,99 | 350,189 | conn-spine | journey |
| `spine-l2` | 350,200 | 350,290 | conn-spine | journey |
| `spine-l3` | 350,302 | 350,369 | conn-spine | journey |
| `spine-l4` | 350,380 | 350,447 | conn-spine | journey |
| `spine-l5` | 350,540 | 350,595 | conn-spine | journey |
| `spine-l6` | 350,607 | 350,662 | conn-spine | journey |
| `spine-l7` | 350,674 | 350,729 | conn-spine | journey |
| `spine-l8` | 350,740 | 350,784 | conn-spine | journey |

### Level Tick Marks (horizontal, on spine)
| y | class |
|---|-------|
| 144 | conn-tick |
| 245 | conn-tick dim |
| 335 | conn-tick dim |
| 414 | conn-tick dim |
| 568 | conn-tick dim |
| 634 | conn-tick dim |
| 701 | conn-tick dim |
| 762 | conn-tick dim |

### Level Labels (text, right of spine)
| y | Text |
|---|------|
| 148 | L1 |
| 250 | L2 |
| 340 | L3 |
| 418 | L4 |
| 572 | L5 |
| 639 | L6 |
| 705 | L7 |
| 766 | L8 |

### Branch Connections (gold lines)
| Path | x1,y1 | x2,y2 | class | data-path | Notes |
|------|--------|--------|-------|-----------|-------|
| Foundation→Doing | 324,88 | 160,265 | gold-conn | doing | Left fork |
| Foundation→Knowing | 376,88 | 540,265 | gold-conn | knowing | Right fork |
| Doing→Hearth | 160,305 | 310,475 | gold-conn | doing | Left path down |
| Practise→Play | 248,398 | 105,666 | gold-conn | doing | Left to Play |
| Knowing→Hearth | 540,305 | 390,475 | gold-conn | knowing | Right path down |
| Study→Create | 452,398 | 595,666 | gold-conn | knowing | Right to Create |
| Hearth→Play | 305,512 | 110,668 | gold-conn dim | journey | Cross-connection |
| Hearth→Create | 395,512 | 590,668 | gold-conn dim | journey | Cross-connection |
| Hearth→Mastery | 350,535 | 350,786 | gold-conn dim | journey | Center down |
| Play→Mastery | 105,706 | 325,800 | gold-conn dim | doing | Left converge |
| Create→Mastery | 595,706 | 375,800 | gold-conn dim | knowing | Right converge |

### Thin Cross-Connections
| From→To | x1,y1 | x2,y2 | data-path |
|---------|--------|--------|-----------|
| Foundation→Practise | 337,115 | 248,345 | doing |
| Foundation→Study | 363,115 | 452,345 | knowing |
| Doing↔Knowing | 194,283 | 506,283 | journey |
| Practise↔Study | 296,388 | 404,388 | journey |
| Play↔Create | 136,682 | 564,682 | journey |

### Perimeter Curves (paths, not lines)
| d | data-path |
|---|-----------|
| `M 88,662 Q 60,450 146,305` | doing |
| `M 612,662 Q 640,450 554,305` | knowing |

---

## ANIMATION DOTS — animateMotion Paths

### Spine ember river (4 dots, staggered 1s apart)
All follow: `M 350,99 L 350,189 ... L 350,784`
- r=2.5, fill=#e8a020, dur=6s
- r=1.5, fill=#ff8c42, dur=6s, begin=1s
- r=1, fill=#d4af69, dur=6s, begin=2s
- r=1, fill=#ff4500, dur=6s, begin=3s

### Branch dots
- Left branch: r=2, fill=#e8a020, dur=5s, path=`M 324,88 L 160,265 L 160,305 L 310,475`
- Right branch: r=2, fill=#e8a020, dur=5s, path=`M 376,88 L 540,265 L 540,305 L 390,475`
- Play line: r=1.5, fill=#d4af69, dur=7s, path=`M 248,398 L 105,666`
- Create line: r=1.5, fill=#d4af69, dur=7s, path=`M 452,398 L 595,666`

### Orbiting dots (one per node)
| Node | Orbit Path | dur | fill |
|------|-----------|-----|------|
| Foundation | `M 350,18 A 55,55 0 1,1 350,128 A 55,55 0 1,1 350,18` | 8s | #d4af69 |
| Doing | `M 146,228 A 55,55 0 1,1 146,338 A 55,55 0 1,1 146,228` | 9s | #e8a020 |
| Knowing | `M 554,228 A 55,55 0 1,1 554,338 A 55,55 0 1,1 554,228` | 9s | #e8a020 |
| Hearth | `M 350,439 A 55,55 0 1,1 350,549 A 55,55 0 1,1 350,439` | 10s | #d4af69 |
| Mastery | `M 350,758 A 55,55 0 1,1 350,868 A 55,55 0 1,1 350,758` | 12s | #cc33ff |
| Play | `M 88,627 A 55,55 0 1,1 88,737 A 55,55 0 1,1 88,627` | 10s | #d4af69 |
| Create | `M 612,627 A 55,55 0 1,1 612,737 A 55,55 0 1,1 612,627` | 10s | #d4af69 |

---

## CSS CLASSES USED
- `map-svg` — main SVG container
- `mandala` — subtle guide circles (center)
- `conn-spine` — central spine lines
- `conn-tick` — level tick marks
- `conn-label` — level text labels (L1-L8)
- `gold-conn` — gold branch/connection lines
- `mn-g` — node group (clickable)
- `mn-ring` — node circle ring
- `touch-area` — invisible larger hit area
- `mastery-ring` — mastery level rings
- `foundation-glow` — foundation dashed glow ring
- `flow-anim` — animation group
- `travel-flame` — moving fire emoji

---

## NODE_DATA (JS object, line ~1850)

```javascript
const NODE_DATA = {
  hearth:    { tag:'ORIGIN',        title:'The Hearth',  action:'hearth'    },
  foundation:{ tag:'HOME NODE',     title:'Foundation',  action:'foundation'},
  mastery:   { tag:'FINAL',         title:'Mastery',     action:'mastery'   },
  doing:     { tag:'DOING PATH',    title:'Do',          action:'doing'     },
  practise:  { tag:'DOING PATH',    title:'Practise',    action:'practice'  },
  play:      { tag:'DOING PATH',    title:'Play',        action:'play'      },
  knowing:   { tag:'KNOWING PATH',  title:'Know',        action:'knowing'   },
  study:     { tag:'KNOWING PATH',  title:'Study',       action:'study'     },
  create:    { tag:'KNOWING PATH',  title:'Create',      action:'create'    }
};
```

---

## FLAME ROUTE SYSTEM
- `FLAME_ROUTES` maps `from->to` keys to arrays of node IDs (hops)
- `moveFlame(id)` translates the `#travel-flame` `<g>` element
- `markPathTravelled(from,to)` marks connection lines as `travelled` class
- `restoreTravelledPaths()` reloads travelled state from `localStorage['travelledPaths']`
- Default flame position: `localStorage['flameNode']` or `'foundation'`
