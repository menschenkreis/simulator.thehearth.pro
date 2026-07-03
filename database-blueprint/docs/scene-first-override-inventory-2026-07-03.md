# Scene-First Override Inventory - 2026-07-03

## Plain-English Purpose

`assets/js/scene-first.js` is one of the most important architecture risks in the prototype.

It is not bad because the scene-first idea is bad. The idea is strong: when a learner enters a node, they should feel like they are entering a place, not opening a plain dashboard.

The risk is that this file loads late and replaces functions that were already defined elsewhere.

In simple terms:

Another file says, "show Practice this way."

Then `scene-first.js` loads afterward and says, "actually, show Practice my way."

That makes changes in earlier files look like they disappeared.

## File Summary

| File | Lines | Role |
|---|---:|---|
| `assets/js/scene-first.js` | 830 | Late-loaded scene renderer and override layer for multiple nodes. |

Current note at top of file:

> This file currently owns the active renderers for Play, Practice, Study, Create, Mastery, and Hearth.

That note is accurate.

## Load Order Problem

In `simulator.html`, these files load before `scene-first.js`:

- `assets/js/practice-room.js`
- `assets/js/hearth-brain.js`
- `assets/js/play-world.js`
- `assets/js/study-key.js`
- `assets/js/create-workshop.js`

Then this loads last:

- `assets/js/scene-first.js`

Because it loads last, its `window.show...` assignments usually win.

## Functions Overridden or Owned

| Global function | Earlier definition exists in | Later active definition in `scene-first.js` | Meaning |
|---|---|---|---|
| `showHearth` | `assets/js/hearth-brain.js` | Yes | Hearth brain/dashboard can be replaced by Hearth body chamber. |
| `showPlay` | `simulator.html`, `assets/js/play-world.js` | Yes | Play world map rendering can be replaced by scene-first atlas entry. |
| `showStudy` | `simulator.html`, `assets/js/study-key.js` | Yes | Study brain/lab/key screens can be replaced by scene-first key chamber. |
| `showCreate` | `simulator.html`, `assets/js/create-workshop.js` | Yes | Create workshop can be replaced by scene-first cauldron. |
| `showPractice` | `simulator.html`, `assets/js/practice-room.js` | Yes | Practice room can be replaced by scene-first candle timer. |
| `showMastery` | `simulator.html` | Yes | Mastery screen can be replaced by scene-first phoenix screen. |

## What `scene-first.js` Contains

### Shared helpers

- HTML escaping helper.
- A `panel()` helper that always renders into `#p-foundation`.
- `read()` and `write()` helpers for localStorage.
- A large injected style block with scene-first CSS.
- `sceneStart()` for reusable scene header layout.

### Hearth

Owns:

- `HEARTH_BODY_ZONES`
- `window.HEARTH_BODY_ZONES`
- `window.HearthBody`
- `window.showHearth`

Role:

Renders the Hearth body chamber and body-system hotspot interactions.

Storage:

No major persistent state found except internal active/debug variables.

### Play

Owns:

- `window.showPlay`
- `SceneFirst.openPlay`
- `SceneFirst.mapHover`
- `SceneFirst.mapUnhover`

Uses:

- `window.WORLD_MAP_REGIONS`
- `window.PlayWorld.detail`

Role:

Renders the Play world atlas scene and delegates detail view to `PlayWorld.detail` if available.

### Study

Owns:

- `STUDY_DOORS`
- `window.STUDY_DOORS`
- `window.showStudy`
- `SceneFirst.studyRotate`
- `SceneFirst.studyEnter`
- `SceneFirst.studyBack`
- `SceneFirst.studyTry`

Role:

Renders the rotating Study key chamber with six doors.

Conflict:

`assets/js/study-key.js` also defines `window.showStudy`.

### Create

Owns:

- `CREATE_HEAT_LEVELS`
- `CREATE_MUTATIONS`
- `window.showCreate`
- `SceneFirst.toggleCreate`
- `SceneFirst.stirCauldron`
- `SceneFirst.saveSeed`
- `SceneFirst.newCreate`
- `SceneFirst.setHeat`
- `SceneFirst.mutateSeed`

Uses:

- `window.CAULDRON_INGREDIENTS`
- `window.CREATE_COMBOS`

Storage:

- `hearth-create-current`
- `hearth-create-projects`

Conflict:

`assets/js/create-workshop.js` also defines `window.showCreate`.

### Practice

Owns:

- `PRACTICE_CANDLE`
- `window.showPractice`
- `SceneFirst.practiceDuration`
- `SceneFirst.practiceFocusNew`
- `SceneFirst.lightCandle`
- `SceneFirst.saveEmber`

Storage:

- writes practice session reflections to `hearth-practice-log`

Conflict:

`assets/js/practice-room.js` also defines `window.showPractice` and uses `hearth-practice-state`, `hearth-practice-log`, and `hearth-practice-notes`.

### Mastery

Owns:

- `window.showMastery`
- `SceneFirst.openMastery`
- local `beyond` artist/seal data

Role:

Renders the Mastery phoenix scene and phoenix seals.

### Journey support

Contains:

- `JOURNEY_LEVELS`
- `journeyState()`
- `journeyStudent()`
- `journeyGuide()`

Storage:

- reads `hearth-journey-v2`

Important note:

This is not the main Journey system. The main Journey system is `assets/js/journey.js`. This is a small scene-first support layer.

## Why This Causes Confusion

If a developer edits:

- `practice-room.js`
- `create-workshop.js`
- `study-key.js`
- `hearth-brain.js`
- `play-world.js`
- the older functions inside `simulator.html`

they may not see their changes, because `scene-first.js` overwrites the entry functions later.

This is why the current architecture feels haunted even when the code is technically running.

## What To Preserve

Preserve the scene-first principle:

- each node should feel like a place
- first view should be immersive
- the guide character should give context
- node entry should be emotional and visual, not just a menu

Preserve useful scene concepts:

- Hearth body chamber
- Play atlas
- Study key chamber
- Create cauldron heat system
- Practice candle timer
- Mastery phoenix seals

## What To Change Later

Do not keep the "last script wins" pattern.

Replace it with one explicit router/registry.

Suggested future shape:

```js
const NodeRenderers = {
  hearth: renderHearthBody,
  play: renderPlayAtlas,
  study: renderStudyKeyChamber,
  create: renderCreateCauldron,
  practice: renderPracticeCandle,
  mastery: renderMasteryPhoenix
};
```

Then use one route function:

```js
function openNode(nodeId) {
  const renderer = NodeRenderers[nodeId];
  if (!renderer) return showMissingNode(nodeId);
  renderer();
}
```

This means each node has one official entry point.

## Safer Refactor Sequence

### Step 1 - Freeze behavior

Do not delete `scene-first.js` yet.

Use this inventory to explain what it owns.

### Step 2 - Split data from renderers

Candidate data to extract later:

- `HEARTH_BODY_ZONES`
- `STUDY_DOORS`
- `CREATE_HEAT_LEVELS`
- `CREATE_MUTATIONS`
- `beyond` Mastery seal data

### Step 3 - Name renderer modules

Future renderer modules could be:

- `assets/js/nodes/hearth-body-scene.js`
- `assets/js/nodes/play-atlas-scene.js`
- `assets/js/nodes/study-key-scene.js`
- `assets/js/nodes/create-cauldron-scene.js`
- `assets/js/nodes/practice-candle-scene.js`
- `assets/js/nodes/mastery-phoenix-scene.js`

### Step 4 - Add a single node registry

Create one explicit place that maps node IDs to renderers.

### Step 5 - Remove duplicate globals

Only after the registry works, stop defining `showCreate`, `showPractice`, etc. in multiple files.

## Immediate Recommendation

Do not edit `scene-first.js` directly yet.

Next useful cleanup step:

Extract the scene-first data constants into backend-friendly seed/reference files, without changing runtime behavior.

Best first extraction candidates:

- `HEARTH_BODY_ZONES`
- `STUDY_DOORS`
- Mastery `beyond` seals

Avoid extracting first:

- Create rendering behavior
- Practice timer behavior

Reason:

Create and Practice include more local state and interaction behavior.
