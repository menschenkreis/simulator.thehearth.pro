# The Hearth Mastery: Play Continuation Brief

Date: 2026-07-18
Branch: `cleanup/handoff-architecture`
Verified commit: `93bcc64`
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Working Vertical Slice for Mississippi
Browser verification: desktop complete for one route; responsive partial

## 1. Plain-Language Purpose

Play turns technique and knowledge into groove, listening, call-and-response,
jamming, songs, and musical culture. It owns musical application and context.
Do owns isolated physical drills; Practice owns repetition; Create owns making a
new artifact; Mastery owns encounters with accomplished musicians.

## 2. Verified Current Experience

- First click opens the world atlas.
- Mississippi opens a developed route with cultural context, sources, progress,
  and musical steps.
- Completion is learner-scoped and emits `play_activity_completed`.
- Other regions are intentionally more open/incomplete.
- A second learner selector label duplicates the global header.

## 3. Active Ownership Map

- Controller/global owner: `adapters/play-atlas-controller.js`
- Atlas model/view: `play-atlas-model.js`, `play-atlas-viewer.js`
- Region route: Play world/domain data and `play-world-viewer.js`
- State: learner-specific `hearth-play-session-v1:<learner>`
- Event: `play_activity_completed`
- Sources: live external links; no mapped internal Play source notes
- Tests: Play domain/atlas assertions and renderer ownership safeguard

## 4. What The Audit Changed

The renderer ownership check and documentation now correctly identify the atlas
controller as the active `showPlay` owner. No route content or visual design was
changed.

## 5. Protected Decisions

- Keep the atlas and place-based musical journey.
- Culture is context, not decoration or stereotype.
- Groove, listening, and musical conversation are central.
- Sources must sit close to cultural claims.
- Play should make a learner feel musical before everything is perfect.
- Do not turn all traditions into one generic genre picker.

## 6. Cross-Node Contracts

Play receives learner, activity/style, level, capability IDs, musical material,
tempo, lesson, and return route. It owns musical attempt, groove/listening
feedback, and completion evidence. It may send a phrase to Create or a repetition
target to Practice. Missing backing media must fall back to metronome, counted
groove, or call-and-response instructions.

## 7. Learner Memory And Progress

The active route uses learner-scoped state and events. Preserve stable region
and activity IDs. Distinguish opened, listened, attempted, applied musically,
and repeated. Remove the duplicate local learner selector only after the global
selector preserves current context.

## 8. Content And Source State

Mississippi is the strongest prototype route but still needs internal source
notes and a rights review. Play currently has zero mapped notes in the resource
inventory. Future regions require careful cultural research, musical examples,
and media rights. Build one reviewed route at a time.

## 9. Checks And Evidence

- Desktop atlas -> Mississippi route: verified.
- Learner-scoped session/event code: verified.
- Play owner safeguard: pass at `93bcc64`.
- General smoke checks: pass.

Backing-media failure, keyboard atlas use, profile switch/resume, mobile, and
other regions need dedicated tests.

## 10. Known Gaps And Risks

- Cultural claims lack mapped internal notes.
- Route breadth is visually implied but not yet delivered.
- Media availability and rights are fragile.
- Cross-node handoffs are incomplete.
- Duplicate learner controls create confusion.

## 11. Prioritized Next Build

1. **Now:** attach reviewed source records and a no-media fallback to
   Mississippi. Acceptance: each material cultural claim is traceable and the
   route works with media blocked. Time: 4-7 hours. Credit: medium. Research:
   yes. Images: no.
2. **Next:** complete Practice/Create handoff envelopes and connect one Level 1
   song application. Time: 4-7 hours. Credit: medium. Research: likely.
3. **Later:** develop the next region only after the route template passes
   cultural and learning review. Time: 8-16 hours per route. Credit: high.

## 12. Do-Not-Disturb List

Do not remove the atlas, copy cultural claims without sources, generate broad
region content in bulk, count opening as playing, replace musical contact with
long reading, or restore the viewer as the global owner.

## 13. Recommended Opening Instruction

Read this brief, the audit, and the Play cultural guidelines. Inspect
Mississippi live, then source and harden that one route before adding regions.
Preserve learner-scoped evidence and cross-node contracts, update this brief,
explain plainly, and warn before research or high-credit media work.
