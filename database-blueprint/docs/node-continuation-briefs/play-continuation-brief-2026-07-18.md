# The Hearth Mastery: Play Continuation Brief

Date: 2026-07-20
Branch: `audit/orchestrator`
Verified checkpoint: Mississippi route and handoff hardening
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Trustworthy Vertical Slice for Mississippi
Browser verification: desktop atlas, tradition, and no-audio pulse complete;
responsive partial

## 1. Plain-Language Purpose

Play turns technique and knowledge into groove, listening, call-and-response,
jamming, songs, and musical culture. It owns musical application and context.
Do owns isolated physical drills; Practice owns repetition; Create owns making a
new artifact; Mastery owns encounters with accomplished musicians.

## 2. Verified Current Experience

- First click opens the world atlas.
- Mississippi opens a developed route with cultural context, sources, progress,
  and musical steps.
- Mississippi cultural claims have four nearby reviewed institutional source
  records. Community review remains explicitly pending.
- Completion is learner-scoped and emits canonical `play_activity_completed`
  evidence. A standalone route records an honest Attempt; the complete Journey
  song exchange can record Application.
- The visual 60 BPM pulse is the built-in no-audio fallback.
- A saved Play result can create an exact learner-specific Practice task or a
  Create seed carrying source attempt and session references.
- Other regions are intentionally more open/incomplete.
- The duplicate local learner label was removed; the global profile control is
  authoritative.

## 3. Active Ownership Map

- Controller/global owner: `adapters/play-atlas-controller.js`
- Atlas model/view: `play-atlas-model.js`, `play-atlas-viewer.js`
- Region route: Play world/domain data and `play-world-viewer.js`
- State: learner-specific `hearth-play-session-v1:<learner>`
- Event: canonical `play_activity_completed`
- Sources: four reviewed source records inside `assets/js/play-traditions.js`
- Tests: Play domain/atlas assertions and renderer ownership safeguard

## 4. What The Audit Changed

The orchestrator kept the atlas and route design, removed duplicate learner UI,
made Mississippi completion canonical, added a no-audio fallback, and built a
real Play -> Practice -> Play handoff. Create receives the exact saved result
references. No region or image was added.

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

The active route uses learner-scoped state and events. Stable region and
activity IDs are preserved. Opened, attempted, and applied musically remain
separate. The saved result is retained in the learner session so follow-on
Practice/Create actions retain their origin.

## 8. Content And Source State

Mississippi is the strongest prototype route. Material cultural claims now map
to National Park Service, Smithsonian Folkways, and Library of Congress source
records, but community review is still pending and should remain visible.
Future regions require careful cultural research, musical examples, and media
rights. Build one reviewed route at a time.

## 9. Checks And Evidence

- Desktop atlas -> Mississippi -> tradition -> no-audio pulse: browser verified
  on 2026-07-20.
- Learner-scoped canonical attempt and Play -> Practice handoff: regression
  tested.
- Play owner and general smoke checks pass at this checkpoint.

Keyboard atlas use, profile switch/resume, mobile, and full Practice/Create
return routes still need dedicated browser tests.

## 10. Known Gaps And Risks

- Route breadth is visually implied but not yet delivered.
- Media availability and rights are fragile.
- Community review is not complete.
- Cross-node handoffs are structurally complete for the current result, but
  still need full browser return testing.

## 11. Prioritized Next Build

1. **Now:** browser-test profile switch/resume, keyboard, mobile, and the full
   Practice/Create return paths. Time: 2-4 hours. Credit: medium-low.
2. **Next:** obtain careful community/cultural review for Mississippi before
   describing it as publication-ready. Time: external dependency. Credit:
   medium. Research/review: yes.
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
