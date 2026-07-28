# PLAY NODE: REMAINING WORK AUDIT BRIEF

## Purpose

Audit the **Play node** in The Hearth guitar simulator and define the remaining work required to make it reliable, coherent, culturally responsible, and ready for continued development.

Do not begin with a broad redesign. Inspect the live implementation first, identify gaps, and recommend small ordered improvements.

## Core Meaning

Play is where technical knowledge becomes musical conversation.

It should help the learner:

- encounter living musical traditions
- listen before imitating
- find the pulse and tonal home
- apply familiar guitar material musically
- play with another person or a backing part
- experiment with rhythm and lead roles
- reflect on what changed
- carry useful feedback into Journey and Practice

It must not become a generic genre browser, dashboard, drill library, or cultural tourism map.

## Current Implementation

The live Play experience is a world atlas using the existing illustrated map.

The completed Mississippi route currently follows:

1. Select Mississippi Delta
2. Enter the living tradition
3. Find the pulse at 60 BPM
4. Choose an A root note as “home”
5. Choose rhythm or lead
6. Play call and response
7. Swap musical roles
8. Reflect and save the route

The implementation already includes:

- active learner awareness
- per-learner Play session state
- learner-specific progress markers
- structured tradition data
- sourced cultural information
- a working visual pulse
- musical role and root-note choices
- reflection choices
- `play_activity_completed` progress events
- a repeat-focus handoff into Practice
- warnings when a destination lacks reviewed tradition content

## Important Files

- `core/play-domain.js`
- `assets/js/play-traditions.js`
- `assets/css/play-atlas.css`
- `adapters/play-atlas-model.js`
- `adapters/play-atlas-viewer.js`
- `adapters/play-atlas-controller.js`
- `adapters/practice-entry-model.js`
- `simulator.html`
- `tools/core_js_smoke_check.py`
- `tools/core_smoke_check.py`
- `tools/prototype_smoke_check.py`

Current local checkpoint: `29ce392` on `cleanup/handoff-architecture`.

## Highest-Priority Audit

1. Confirm the live simulator uses the new Play files, not only the concept page.
2. Test the complete route for both My Journey and Jen.
3. Switch learners and confirm their choices, progress, and reflections remain separate.
4. Reload midway through a route and confirm progress resumes correctly.
5. Complete a route twice and check that progress events are not accidentally duplicated.
6. Confirm the saved reflection visibly reaches Practice as a recommended repeat focus.
7. Confirm Journey receives the intended Play completion signal.
8. Recheck desktop and mobile layouts after the latest responsive fix.
9. Check that the cultural drawer scrolls cleanly and important actions remain easy to find.
10. Check keyboard navigation, focus visibility, button labels, contrast, and reduced-motion behaviour.
11. Check browser warnings, missing assets, load time, and layout overflow.

## Visual Questions

Review these without replacing the approved atlas direction:

- The global header and Play page both show the active learner on desktop. Decide whether the local label is redundant.
- The cultural information drawer may be too dense. Consider staged disclosure without weakening the cultural context.
- Confirm markers remain readable without making the atlas feel like a dashboard.
- Confirm the route progress bar communicates current progress, completed progress, and replay status accurately.
- Ensure mobile presents the map, guide, route, and drawer in a clear reading order.

Do not generate replacement artwork during the audit.

## Cultural Content Work

Mississippi is the only complete tradition record. Other destinations are currently map possibilities, not finished teaching material.

For every future tradition, require:

- named communities and carriers
- social and musical purpose
- real practice settings
- methods of transmission
- relevant historical forces
- contemporary living practice
- directly relevant listening material
- reliable sources
- clear distinction between documented fact, interpretation, oral account, and disputed claim
- respectful learner guidance
- community review status

Do not present an unverified story as fact. The Peru anecdote discussed previously is a guiding example of the desired cultural depth, but it must be verified before use.

## Architecture Rules

- Keep cultural data separate from rendering code.
- Keep learner identity out of hardcoded UI.
- Continue using normal progress events.
- Preserve the boundary between Play, Do, Practice, Journey, and Study.
- Keep localStorage behind the existing adapters so a future backend can replace it.
- Do not rebuild the shared header, map, learner system, or progress system inside Play.
- Do not revert or overwrite unrelated work in the dirty working tree.

## Expected Audit Output

Produce:

1. Findings ordered by severity.
2. What is already strong and should remain.
3. Bugs or confusing behaviour.
4. Missing tests.
5. Cultural-content risks.
6. Architecture risks.
7. A small phased roadmap.
8. The single best next implementation step.
9. A time and credit estimate for that step.

Do not modify code until the audit findings and next step are clear, unless a tiny change is required to perform the audit safely.

## Acceptance Standard

The Play node is ready for its next phase when:

- the live atlas works on desktop and mobile
- learner progress remains separate
- routes resume and replay predictably
- completion is recorded once
- Practice receives the correct repeat focus
- Journey receives meaningful progress
- unfinished traditions never pretend to be complete
- sources and cultural framing are visible
- no browser errors or layout overflow remain
- all three smoke checks pass

