# Prototype Golden Path Checkpoint

Date: 2026-07-20

## Purpose

This checkpoint makes the local prototype honest and clickable without treating its current hosting, API, or MySQL arrangement as production architecture. No production API, database, hosting, or learner records were migrated by this batch.

## Verified Journey Rules

- Level 1 has one uncounted Entry Check followed by eight guided lessons.
- Journey level progress is calculated from learner-scoped capability evidence, not old lesson counts.
- Opening a node or drill records contact only. It does not prove capability or unlock the next level.
- Level 2 stays locked until the required Level 1 capabilities are demonstrated.
- Existing learner evidence is preserved. Jen currently remains in Level 1 consolidation.

## Verified Click Path

The following local browser path was tested end to end:

1. Open Journey for Jen.
2. Open Teacher Prep.
3. Select the Make Music lesson step.
4. Choose Open A roots drill.
5. Journey sends an explicit learner-scoped handoff to Do.
6. Do opens Both Hands and the exact `A Root Notes in Time` drill.
7. Do displays the lesson instruction and a Return to Journey action.
8. Returning restores the Journey lesson companion.
9. Viewing the drill leaves its evidence at `Seen`; Jen's Journey capability count does not falsely increase.

## Architecture Boundary

The cross-node handoff is a temporary session instruction, not permanent learner evidence. Permanent progress continues to use the shared progress event contracts. This keeps navigation context separate from proof of learning and gives a future backend a cleaner contract to rebuild.

## Next Prototype Batch

Reuse the same explicit handoff pattern for Journey to Practice, Play, Create, Study, Hearth, and Mastery. Then complete the protected content-gap pass: song pathway, listening activity, TAB/diagram contact, stronger right-hand work, practice-history evidence, saved creation, and a real Mastery encounter.

Do not expand Levels 2-8 or rebuild the production backend inside this prototype before these Level 1 paths are trustworthy.
