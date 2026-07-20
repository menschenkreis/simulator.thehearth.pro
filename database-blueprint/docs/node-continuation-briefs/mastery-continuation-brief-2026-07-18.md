# The Hearth Mastery: Mastery Continuation Brief

Date: 2026-07-20
Branch: `audit/orchestrator`
Verified checkpoint: evidence-based encounter hardening
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Trustworthy Vertical Slice for one encounter
Browser verification: desktop entrance, artistic thread, Witness, Notice, and
Try confirmation complete

## 1. Plain-Language Purpose

Mastery lets a learner witness accomplished musicianship, notice one precise
quality, try a small fragment, and carry the insight back into their own work.
It is inspiration joined to observation and action. It is not the final level,
a celebrity gallery, or a generic tutorial library.

## 2. Verified Current Experience

- The phoenix entrance opens an encounter.
- The route follows Witness -> Notice -> Try -> Carry.
- Encounter state and events are learner-scoped.
- Carry can hand work to Practice or Create.
- The current witness source is B.B. King's `The Thrill Is Gone`, live at
  Montreux in 1993, with a no-media guitar alternative.
- Continue, Watch, Follow a Thread, and Review now lead to distinct actions.
- Selecting a Try idea does not count as playing it. The learner must explicitly
  confirm `I tried it` before attempt evidence is recorded.
- Practice and Create receive the originating encounter, exemplar, notice, and
  try references.
- The short review reflection saves as its own canonical event.
- Deeper legacy seal text areas do not save.

## 3. Active Ownership Map

- Entrance/global owner: `adapters/mastery-phoenix-viewer.js`
- Pure evidence owner: `core/mastery-progress.js`
- Encounter content: `assets/js/mastery-data.js`
- State: learner-specific encounter key
- Events: Mastery encounter events in shared store
- Legacy: older seals and unsaved text areas
- Sources: four mapped notes plus external media candidates
- Tests: ownership/general smoke coverage and encounter model assertions

## 4. What The Audit Changed

The orchestrator hardened one real encounter without expanding the catalogue.
It installed canonical event envelopes, separated choosing a Try from doing it,
made the entrance routes distinct, preserved exact Carry context, and added
regression tests. No Mastery image was regenerated.

## 5. Protected Decisions

- Keep the phoenix as the Mastery destination and living aspiration.
- Encounters follow Witness, Notice, Try, Carry.
- A master may reveal tradition, personal sound, discipline, or invention.
- Learners should see that they can learn conventions and still make their own
  thing.
- Media must be specific, source-recorded, and available through a fallback.

## 6. Cross-Node Contracts

Mastery receives learner, encounter, lesson, level, capability IDs, observation
focus, and return route. It owns witnessed source, learner noticing, attempted
fragment, and carry choice. It sends a concrete Practice or Create seed and an
encounter event to Journey. Missing media must provide a sourced still/text or
listening alternative, not a dead screen.

## 7. Learner Memory And Progress

Encounter state is learner-scoped. Keep witness, notice, try, and carry as
separate evidence stages. Opening media is not completing an encounter. Decide
whether legacy seal reflections should migrate or be retired after export.

## 8. Content And Source State

Only one encounter is developed, but it now uses a genuine performance example
with artist/work, exact observation, learner-safe fragment, source note, rights
note, and fallback. One trustworthy encounter is intentional; breadth waits
until the vertical slice has been used by a real learner.

## 9. Checks And Evidence

- Desktop entrance -> artistic thread -> Witness -> Notice -> Try selection:
  browser verified on 2026-07-20.
- Opening produces Contact only; confirmed Try produces Attempt evidence:
  regression tested.
- Learner-scoped state/events and exact Carry references: code verified.
- Unsaved legacy reflection: verified by inspection.
- Core JavaScript and prototype smoke checks pass at this checkpoint.

Media failure, profile switch, refresh, mobile, full keyboard flow, and source
availability need focused tests.

## 10. Known Gaps And Risks

- Breadth and source coverage are sparse.
- External media availability can change; the internal fallback must remain.
- Legacy reflection fields imply saving but do not save.
- Real multi-day learner use has not yet validated how Journey should weight
  Mastery Contact versus Attempt evidence.

## 11. Prioritized Next Build

1. **Now:** live-test profile switch, refresh/resume, media fallback, mobile,
   keyboard, Carry, and return routes. Time: 2-4 hours. Credit: medium-low.
2. **Next:** remove, hide, or genuinely save the misleading legacy seal text
   fields. Time: 1-2 hours. Credit: low.
3. **Later:** after real learner use, build a small diverse, rights-reviewed
   encounter catalogue.
   Time: multi-day. Credit: high. Research/media: yes.

## 12. Do-Not-Disturb List

Do not remove the phoenix, turn Mastery into the eighth Journey level, use
generic tutorials as master encounters without review, imply reflections save
when they do not, or bulk-add artists without context and rights records.

## 13. Recommended Opening Instruction

Read this brief and the audit, complete the current encounter live, then make
one genuine Level 1 Witness-Notice-Try-Carry route trustworthy before expanding
the catalog. Preserve learner scope and Carry contracts, update this brief,
explain plainly, and warn before research or high-credit media work.
