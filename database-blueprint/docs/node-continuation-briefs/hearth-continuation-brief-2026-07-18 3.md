# The Hearth Mastery: Hearth Continuation Brief

Date: 2026-07-18
Branch: `cleanup/handoff-architecture`
Verified commit: `93bcc64`
Audit: `whole-simulator-integration-audit-2026-07-18.md`
Readiness: Coherent Entrance; rebuild still in progress
Browser verification: first click and Brain endpoint complete on desktop

## 1. Plain-Language Purpose

Hearth teaches the learner about the human instrument: hands, brain and nervous
system, eyes, ears, body, attention, and development as they relate to guitar
learning. It helps the learner notice and care for those systems. It is not a
generic reflection journal or a substitute for medical care.

## 2. Verified Current Experience

- First click opens a strong visual body-system scene.
- Brain opens headings for what it is, parts, development, guitar connection,
  development activities, and care.
- The endpoint is static text with no guided action, observation, reflection,
  saved evidence, or next step.
- No canonical Hearth event is emitted.

## 3. Active Ownership Map

- Screen/controller: `adapters/hearth-body-viewer.js`
- Content: `assets/js/hearth-body-data.js`
- Shared state/events: none currently authoritative
- Existing planning: Hearth rebuild, professional alignment audit, and
  remaining-work briefs in `database-blueprint/docs/`
- Tests: shell/ownership smoke coverage only; no Hearth learning-action tests
- Legacy overlap: old Hearth meanings and reflection concepts remain in
  historical files and must not redefine the approved human-instrument purpose.

## 4. What The Audit Changed

No Hearth code changed. The audit verified that the visual entrance is strong
but the endpoint fails the simulator product standard because it ends in text
and produces no evidence.

## 5. Protected Decisions

- Hearth is about hands, brain/neurology, eyes, ears, body systems, development,
  and care in relation to learning guitar.
- Explanations must be plain and avoid mystical filler.
- Show how a system works, how guitar uses it, how it develops, and one safe way
  to notice or develop it.
- Health and neuroscience claims require careful sourcing and limits.
- Hearth observations may inform learning; they must not diagnose the learner.

## 6. Cross-Node Contracts

Hearth receives learner, system/zone, lesson/capability, optional Practice or
Journey context, and return route. It owns safe observation, body/attention
check, reflection, and care reminder. It emits a low-stakes observation event
consumable by Journey and Practice. If an activity suggests pain, dizziness, or
hearing risk, stop and show a conservative safety message rather than coaching
through it.

## 7. Learner Memory And Progress

No canonical learner state exists. Introduce stable system/activity IDs and
learner-scoped observations such as `noticed`, `tried`, `helpful`, and
`needs_care`. Never convert a personal health note into a competence score.
Teacher visibility and retention must be explicit.

## 8. Content And Source State

Hearth has relatively strong source-note coverage, but the live material is
still synthesis requiring professional review. Separate anatomy fact,
learning-science interpretation, guitar application, safe exercise, and care
warning. Avoid overconfident neuroplasticity or developmental claims.

## 9. Checks And Evidence

- Desktop: Map -> Hearth -> Brain: verified.
- Final endpoint static/no event: verified.
- Ownership and general smoke checks: pass at `93bcc64`.

No action, memory, safety, mobile, keyboard, source, or cross-node end-to-end
test currently exists.

## 10. Known Gaps And Risks

- Main regression risk is redefining Hearth back into generic reflection.
- Static endpoints break the learning loop.
- Health/neuroscience claims create accuracy and safety risk.
- No learner memory or Journey/Practice contract exists.
- Other body systems remain unevenly developed.

## 11. Prioritized Next Build

1. **Now:** turn Brain into one complete Observe -> Try -> Reflect -> Save ->
   Next action route with conservative sourced copy. Acceptance: learner action
   emits a scoped observation and returns safely. Time: 5-8 hours. Credit:
   medium. Research: yes; images: no.
2. **Next:** define the Hearth event/state contract and connect it to Practice
   and Journey recommendations without scoring health. Time: 3-5 hours. Credit:
   medium. Images: no.
3. **Later:** develop Hands, Eyes, Ears, and Body using the same reviewed
   pattern. Time: multi-day. Credit: medium-high. Research: yes; image work only
   after approval.

## 12. Do-Not-Disturb List

Do not change the approved human-instrument meaning, diagnose users, present
speculation as neuroscience fact, score health, replace the entrance image, or
build every system before one complete action loop is proven.

## 13. Recommended Opening Instruction

Read this brief, the audit, and the Hearth professional-alignment documents.
Inspect Brain live, then build one safe evidence-producing Brain activity before
expanding systems. Preserve the human-instrument purpose and cross-node
contracts, update this brief, explain plainly, and warn before high-credit or
research-heavy work.
