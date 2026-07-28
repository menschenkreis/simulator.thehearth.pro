# Node Definition of Done V1

Date: 2026-07-18

## Purpose

This is the shared finish line for Foundation, Do, Know, Practice, Study,
Hearth, Play, Create, and Mastery.

A node is not done because its first screen looks attractive. It is done when
its purpose is clear, its complete path is useful, its learner evidence is
connected, and its behaviour is safe to extend.

## Readiness States

Use one of these states in planning and audits:

1. **Concept Draft**: the metaphor and purpose are still being decided.
2. **Coherent Entrance**: first click and major choices are clear.
3. **Working Vertical Slice**: one complete path reaches a useful final action.
4. **Wired Node**: progress, learner identity, Journey, and relevant nodes share
   structured information.
5. **Audit Ready**: all required paths, content, layouts, and regressions have
   been checked.

Do not label an entire node Audit Ready because only one vertical slice works.

## Gate 1: Product Contract

- [ ] The node has a one-sentence purpose a novice can understand.
- [ ] Its purpose is distinct from every neighbouring node.
- [ ] The node brief names what the node owns.
- [ ] The brief names what the node must not duplicate.
- [ ] Its first-click metaphor supports its purpose.
- [ ] Current decisions match `product-decision-register-v1.md`.
- [ ] Unresolved product questions are recorded instead of invented in code.

Gate result: the node can be designed without arguing about what it is for.

## Gate 2: Entrance And Navigation

- [ ] The first click opens one coherent place rather than a generic dashboard.
- [ ] The primary choice is visually obvious.
- [ ] Labels use plain, stable language.
- [ ] The guide gives one contextual orientation, not generic filler.
- [ ] The guide does not cover important controls or artwork.
- [ ] Clicking away or opening another surface closes the previous temporary
      panel where appropriate.
- [ ] Back returns to the expected parent state.
- [ ] Returning preserves useful context, selection, and scroll position where
      appropriate.
- [ ] The learner always knows which profile is active.
- [ ] Keyboard, touch, and pointer users can reach the primary choices.

Gate result: a learner can enter, choose, return, and understand where they are.

## Gate 3: Complete Learning Path

At least one real vertical slice must demonstrate the complete node contract.

- [ ] First click presents the place.
- [ ] Second click presents a meaningful choice.
- [ ] The final destination performs a useful action.
- [ ] The final destination is not merely a small static text box.
- [ ] The learner can see or hear what to do.
- [ ] Instructions are small enough to attempt.
- [ ] The learner knows what to notice, hear, feel, or produce.
- [ ] There is an observable success condition.
- [ ] There is a gentler or smaller version when appropriate.
- [ ] Safety, tension, or cognitive-overload guidance appears where relevant.
- [ ] The activity returns to musical use, understanding, creativity, or
      reflection instead of ending in isolation.

Gate result: the node genuinely helps someone learn or make music.

## Gate 4: Content Quality

- [ ] Content has a clear learner and level.
- [ ] Required prior knowledge is known.
- [ ] Musical and technical claims are accurate.
- [ ] Health, anatomy, neuroscience, history, and cultural claims have an
      appropriate source and review status.
- [ ] External links serve a precise learning moment.
- [ ] Videos have been checked for availability and direct relevance.
- [ ] Learner-facing citations are present where appropriate.
- [ ] Hearth synthesis is labelled as synthesis rather than an external fact.
- [ ] Placeholder content is clearly marked and cannot masquerade as complete.
- [ ] Copyrighted repertoire is linked, licensed, cited, or described within
      an approved policy rather than copied casually.

Gate result: the content is trustworthy enough to teach from.

## Gate 5: Learner Memory And Progress

- [ ] Shared content and learner-owned memory are separate.
- [ ] Stable IDs identify the node, activity, resource, drill, or lesson.
- [ ] Progress is scoped to the active learner.
- [ ] Switching between Ayla and Jen does not leak state.
- [ ] The activity records meaningful evidence rather than only `complete`.
- [ ] Evidence may include attempt, repetition, duration, rating, clean result,
      musical use, reflection, recording reference, or teacher note.
- [ ] Reopening the node restores the expected state.
- [ ] Progress display can explain what its percentage or ring means.
- [ ] The node can identify a sensible next action or recovery action.
- [ ] Legacy storage migration, if present, runs safely and only as intended.

Gate result: the node remembers what happened for the correct person.

## Gate 6: Cross-Node Wiring

- [ ] Journey can recommend or launch the node's activity without duplicating
      its content.
- [ ] The node can receive a small structured handoff where relevant.
- [ ] Completion or feedback creates a shared progress event or equivalent
      canonical evidence.
- [ ] Practice can reuse drills or actions that require repetition.
- [ ] Play or Create can receive material when the skill should become musical
      or personal.
- [ ] Hearth can interpret relevant body, attention, confidence, or reflection
      evidence without inventing neuroscience claims.
- [ ] Mastery can receive or recommend an exemplary encounter when useful.
- [ ] Returning from a handoff does not lose learner identity or progress.
- [ ] No node reaches into another node's private UI state directly.

Gate result: the node participates in the simulator rather than functioning as
an isolated mini-app.

## Gate 7: Visual And Interaction Quality

- [ ] The visual treatment belongs to the same Hearth world.
- [ ] The node remains distinct without introducing an unrelated design system.
- [ ] Controls use consistent patterns for tabs, menus, toggles, feedback, and
      progress.
- [ ] Level colour follows the shared Journey colour rule where levels appear.
- [ ] Animation communicates selection, progress, life, or movement.
- [ ] Decorative animation does not obscure or distract from the task.
- [ ] Text remains readable and does not overlap controls or artwork.
- [ ] Fixed-format elements have stable dimensions.
- [ ] Desktop and mobile layouts show the full primary experience.
- [ ] There is no incoherent clipping, overflow, horizontal scrolling, or
      off-screen primary control.
- [ ] Images have no accidental black square, green fringe, or visible seam.
- [ ] Guitar, body, hand, anatomy, and cultural imagery pass accuracy review.
- [ ] Loading remains reasonable and unused heavy assets are not loaded eagerly.

Gate result: the experience is visually coherent, legible, and comfortable.

## Gate 8: Architecture And Handover

- [ ] One documented owner controls the node entrance.
- [ ] Duplicate legacy renderers cannot unexpectedly override the owner.
- [ ] Content, state, view, and controller responsibilities are identifiable.
- [ ] Large content banks are not buried in render functions.
- [ ] Stable schemas exist for shared content and learner results.
- [ ] Cross-node communication uses contracts or progress events.
- [ ] New code follows existing adapter or core patterns unless a documented
      migration deliberately replaces them.
- [ ] Temporary compatibility code is labelled.
- [ ] Another developer can locate the node owner, content, state, assets, and
      tests from its documentation.
- [ ] The implementation can move to a backend without redefining its IDs and
      learner evidence from scratch.

Gate result: the work can be maintained and handed over safely.

## Gate 9: Regression And Release Check

- [ ] Main Map and Journey still open.
- [ ] Every supported node entrance opens exactly one intended implementation.
- [ ] Primary click paths work from a clean browser state.
- [ ] Primary click paths work with existing learner data.
- [ ] Back, close, outside-click, and mode-switch behaviour work as intended.
- [ ] Learner switching is tested.
- [ ] Persistence is tested after reopening.
- [ ] Desktop and mobile screenshots are reviewed.
- [ ] Browser console shows no new error on the tested path.
- [ ] Shared smoke checks pass.
- [ ] Relevant node-specific tests pass.
- [ ] Slow or missing external media has a usable fallback.
- [ ] Unfinished routes are labelled honestly.

Gate result: the node is stable enough for the whole-simulator audit.

## Node Audit Evidence Card

Use this small record for each node when active work finishes:

```text
Node:
Current owner:
Source-of-truth brief:
Readiness state:
Purpose:
First click:
Second click:
Complete vertical slice:
Final useful action:
Learner evidence written:
Cross-node handoffs:
Desktop checked:
Mobile checked:
Automated checks:
Known placeholders:
Open decisions:
Safe next step:
```

## Whole-Simulator Audit Entry Rule

A node may enter the final comprehensive audit when:

- Gates 1 through 6 pass for every required route;
- Gates 7 through 9 pass for the node as a whole;
- remaining placeholders are explicitly listed;
- no open decision changes the node's core purpose or ownership.

The audit should judge the product against this evidence, not against how
finished the first screenshot appears.

