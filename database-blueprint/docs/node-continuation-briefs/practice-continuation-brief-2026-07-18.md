# The Hearth Mastery: Practice Continuation Brief

Date: 2026-07-18
Branch: `cleanup/handoff-architecture`
Verified commit: `93bcc64`
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Working Vertical Slice, close to a wired learning place
Browser verification: desktop complete; responsive partial

## 1. Plain-Language Purpose

Practice holds focused repetition over time. It owns session setup, timing,
attention, listening back, reflection, and practice history. Do supplies drills;
Journey supplies priorities; Play supplies musical application; Hearth helps the
learner notice body and mind.

## 2. Verified Current Experience

- The image-led entrance opens a planned session.
- A session moves through Arrive, Focus, Set, Practise, Listen, and Reflect.
- The candle/timer and session flow create a useful practice ritual.
- Completing a session emits learner-scoped shared evidence.
- The unfinished planned-session key and some preferences/logs remain global.
- A Do handoff is generic and loses exact drill and return context.

## 3. Active Ownership Map

- Entry: `adapters/practice-entry-controller.js` and entry model/viewer
- Planned session: planned-session controller/viewer
- Session: session model/viewer and dashboard/drill viewers
- State: `adapters/practice-state.js`
- Timer: `practice-candle-viewer.js` and metronome controller
- Event: `practice_session_completed`
- Legacy: `hearth-practice-state`, `hearth-practice-log`
- Tests: Practice state/model/view assertions in core JS smoke check

## 4. What The Audit Changed

No Practice behaviour changed. The audit verified the full six-stage session,
shared completion event, mixed profile storage, and incomplete Do return
contract.

## 5. Protected Decisions

- Practice is a calm temple-like ritual, not a productivity dashboard.
- Keep the candle and planned-session flow.
- Sessions may be 5, 10, 20, or 45-60 minutes without changing the learning
  rhythm.
- Clean sound and patient repetition matter more than speed.
- Recordings are a tool; they must not be mandatory or silently stored.
- Struggling should produce a smaller gradient, not punishment.

## 6. Cross-Node Contracts

Practice should receive learner, drill/activity, duration, tempo, pass
condition, capability IDs, lesson, and return route. It owns timed attempts,
self-feedback, optional recording references, and reflection. It returns an
event to Journey and recommendations to Do/Hearth. If a drill is unavailable,
show the saved instruction and preserve return context.

## 7. Learner Memory And Progress

Shared events are learner-scoped. Planned sessions, preferences, and legacy
logs are not consistently scoped. Migrate them before deriving history. Keep
time, repetition, sound quality, confidence, and capability evidence separate.
Future recordings need consent, retention, and access rules.

## 8. Content And Source State

The session ritual is learner-ready. Drill instructions should come from the
reviewed Do catalog, not copied text. Practice-history prompts, listening-back
guidance, and multi-day commitment logic need deeper content. Existing notes
give Practice relatively strong source coverage.

## 9. Checks And Evidence

- Desktop entrance and six-stage planned session: verified.
- Shared completion event and Practice model tests: pass.
- Profile-key inspection: mixed scoping verified.
- Smoke and ownership checks: pass at `93bcc64`.

Profile switching mid-session, refresh/resume, recording permission, timer
backgrounding, mobile, and missing drill fallback still need tests.

## 10. Known Gaps And Risks

- An unfinished session can be overwritten by another profile.
- Legacy logs can make learner history inaccurate.
- Do handoff is too generic.
- Practice time may be mistaken for competence.
- Recording privacy is undefined.

## 11. Prioritized Next Build

1. **Now:** scope planned sessions/preferences to the active learner and migrate
   legacy values. Acceptance: Ayla and Jen resume different sessions after
   refresh. Time: 3-5 hours. Credit: medium. Images/research: no.
2. **Next:** implement the shared Do/Journey handoff envelope and multi-day
   practice evidence. Acceptance: exact drill returns to its source with
   preserved feedback. Time: 4-7 hours. Credit: medium. Images: no.
3. **Later:** optional recordings, listening comparison, and practice-history
   views with privacy controls. Time: 8-16 hours staged. Credit: medium-high.

## 12. Do-Not-Disturb List

Do not remove the candle ritual, make recording compulsory, duplicate Do's
drill catalog, turn elapsed time into mastery, or erase old logs before a tested
migration.

## 13. Recommended Opening Instruction

Read this brief and the audit, inspect a complete planned session, then isolate
unfinished sessions by learner before adding features. Preserve the ritual and
shared contracts, update this brief at the checkpoint, explain decisions
plainly, and warn before recording or high-credit work.
