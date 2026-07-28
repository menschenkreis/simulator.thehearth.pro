# The Hearth Mastery: Create Continuation Brief

Date: 2026-07-18
Branch: `cleanup/handoff-architecture`
Verified commit: `93bcc64`
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Working Vertical Slice
Browser verification: desktop complete; profile summary and responsive partial

## 1. Plain-Language Purpose

Create helps a learner make and keep a small musical artifact: riff, lyric,
rhythm, melody, arrangement, or song seed. It owns playful transformation and
saving. Play supplies musical contact; Journey supplies context; Practice
strengthens the result; Mastery may supply inspiration.

## 2. Verified Current Experience

- First click opens the image-led entrance and Cauldron.
- Choosing Riff and Stir creates an editable musical seed.
- Seeds can be saved in learner-scoped project storage.
- A generated Level 1 prompt requested harmonics, which is poorly calibrated.
- The global whole-progress header still reads older Create keys.
- Cross-node handoffs open the Cauldron and now explicitly log the active
  learner.

## 3. Active Ownership Map

- Entry owner: `adapters/create-entry-controller.js`
- Entry model/view: Create entry files
- Cauldron: model, viewer, controller, and scene viewer
- State: `adapters/create-state.js`, learner-scoped `hearth-create-v1`
- Handoff: `adapters/create-handoff-controller.js`
- Events: Create handoff/seed events in shared event store
- Legacy: older current/project keys and whole-progress readers
- Tests: Create state, Cauldron, handoff, and learner-event assertions in core
  JS smoke check

## 4. What The Audit Changed

Create handoff events now write the active learner explicitly and the behaviour
is covered by an automated assertion. No prompts, images, or saved projects were
rewritten.

## 5. Protected Decisions

- Keep the Cauldron as a playful transformation metaphor.
- The result must be editable and saved, not a disposable random prompt.
- Create may begin from a Journey, Play, or Practice seed.
- Level and learner interest constrain prompts.
- Creation is evidence of making, not proof of technical mastery.
- Preserve existing learner projects through migrations.

## 6. Cross-Node Contracts

Create receives learner, source node/activity, lesson, level, capability IDs,
starter material, suggested ingredient, and return route. It owns the saved
artifact and revision history. It emits `created`, `saved`, and optionally
`shared/applied` evidence. If the source is unavailable, keep a readable source
snapshot inside the seed.

## 7. Learner Memory And Progress

Current working seed and projects are profile-scoped with a legacy migration.
Keep stable project IDs and source context. Add schema versioning before richer
artifacts. Whole-progress must read the scoped store/events rather than legacy
keys. Future audio requires explicit storage and privacy rules.

## 8. Content And Source State

Create has only one mapped resource note and depends heavily on generated
prompts. Prompts need reviewed level/capability tags, safe difficulty, musical
payoff, and a fallback. Do not treat random output as curriculum. Song-writing
and arrangement references need later source work.

## 9. Checks And Evidence

- Desktop entrance -> Riff -> Stir -> edit/save: verified.
- Learner-scoped project separation: automated pass.
- Explicit learner on handoff event: automated pass at `93bcc64`.
- General smoke and ownership checks: pass.

Refresh/resume, profile switch while editing, import/export, audio failure,
mobile, and cross-node return tests remain.

## 10. Known Gaps And Risks

- Prompt difficulty can contradict the selected level.
- Whole-progress reads the wrong authority.
- Artifact schema is too small for richer songs/audio.
- Return context and capability evidence are incomplete.
- Resource/source coverage is thin.

## 11. Prioritized Next Build

1. **Now:** validate and filter prompt ingredients by level/capability; fix
   whole-progress to use scoped evidence. Acceptance: Level 1 never receives
   harmonics unless explicitly chosen; Ayla/Jen counts differ correctly.
   Time: 4-6 hours. Credit: medium. Images/research: no.
2. **Next:** complete source/return envelopes and save one Level 1 song artifact
   from Journey. Time: 4-7 hours. Credit: medium. Images: no.
3. **Later:** versioned richer artifacts, audio, revision comparison, and export.
   Time: 10-20 hours staged. Credit: medium-high. Research: yes for rights.

## 12. Do-Not-Disturb List

Do not replace the Cauldron with a form, delete saved projects, let random
prompts set curriculum, count generated text as mastery, or add audio storage
without privacy and retention decisions.

## 13. Recommended Opening Instruction

Read this brief and the audit, inspect a saved Riff seed, then calibrate prompts
and progress authority before expanding Create. Preserve projects, learner
scope, and handoff contracts, update this brief, explain decisions plainly, and
warn before high-credit media work.
