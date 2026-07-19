# The Hearth Mastery: Mastery Continuation Brief

Date: 2026-07-18
Branch: `cleanup/handoff-architecture`
Verified commit: `93bcc64`
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Working Vertical Slice for one encounter
Browser verification: desktop complete for one encounter

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
- The current witness source is a QJam tutorial, not an unmistakable example of
  a master in performance.
- Deeper legacy seal text areas do not save.

## 3. Active Ownership Map

- Entrance/global owner: `adapters/mastery-phoenix-viewer.js`
- Encounter model/controller/view: Mastery encounter files
- State: learner-specific encounter key
- Events: Mastery encounter events in shared store
- Legacy: older seals and unsaved text areas
- Sources: four mapped notes plus external media candidates
- Tests: ownership/general smoke coverage and encounter model assertions

## 4. What The Audit Changed

No Mastery code or asset changed. The audit verified one complete encounter,
learner-scoped state, useful Carry handoffs, weak exemplar fit, and unsaved
legacy reflections.

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

Only one encounter is developed and its exemplar is closer to instruction than
mastery. Four mapped notes are insufficient for breadth. Build a reviewed
encounter record with artist/work, tradition/context, exact observation,
learner-safe fragment, source, rights, and fallback.

## 9. Checks And Evidence

- Desktop entrance -> encounter -> Witness: verified.
- Learner-scoped state/events and Carry handoff: code verified.
- Unsaved legacy reflection: verified by inspection.
- Smoke and ownership checks: pass at `93bcc64`.

Media failure, complete Try/Carry, profile switch, refresh, mobile, keyboard,
and rights metadata need focused tests.

## 10. Known Gaps And Risks

- Current exemplar does not fully match the node promise.
- Breadth and source coverage are sparse.
- Media rights/availability are unresolved.
- Legacy reflection fields imply saving but do not save.
- Journey may count contact rather than an encounter.

## 11. Prioritized Next Build

1. **Now:** replace or reclassify the current exemplar and complete one genuine
   Level 1 encounter with fallback. Acceptance: source clearly demonstrates the
   target quality and all four stages save separately. Time: 4-7 hours. Credit:
   medium. Research: yes. Images: no.
2. **Next:** harden Practice/Create Carry contracts and remove or save misleading
   legacy text fields. Time: 3-5 hours. Credit: medium.
3. **Later:** build a small diverse, rights-reviewed encounter catalog.
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
