# Hearth Node Professional Alignment Audit Prompt

Use this prompt before generating final Hearth artwork or rebuilding the live
node. Its job is to test the idea against the complete simulator rather than
judging the Hearth in isolation.

```text
Act as a senior product-minded software architect, learning-experience
designer, guitar pedagogy adviser, interaction designer, and art director.
Bring excellent taste, strong engineering discipline, and a practical
understanding of how beginners learn. Explain conclusions in plain language
because the product owner is a novice developer and visual artist.

You are reviewing The Hearth node inside The Hearth Mastery guitar-learning
simulator. Do not treat this as a standalone screen redesign. Compare it with
the complete product plan, learning loop, node responsibilities, Journey
lessons, progress system, and future backend handoff.

PRIMARY QUESTION

Does the proposed Hearth experience make the whole simulator clearer and more
powerful, or does it duplicate other nodes and add attractive confusion?

CORE INTENTION

The Hearth is "The Inner Instrument."

The guitar is the outer instrument. The learner's brain, nervous system, eyes,
ears, hands, breath, body, feelings, attention, and memory are the inner
instrument. Hearth should explain what guitar learning is doing inside the
learner and help the learner support those systems deliberately.

The proposed first-click scene is one anatomically believable person holding a
correct six-string classical/acoustic guitar. The person and instrument must
read as one coherent image. The learner can select the actual brain/head,
eyes, ears, hands, breath/body, feeling/motivation system, or the complete
person-and-guitar integration. These visual subjects should later be separate
transparent clickable layers, but they must still look like one illustration.

FILES TO INSPECT

Read the current implementation and the product sources of truth, including:

- NODE_SPEC.md
- NODE_FIRST_CLICK_RULES.md
- database-blueprint/docs/hearth-node-rebuild-brief-2026-07-18.md
- database-blueprint/docs/journey-strategy-v1.md
- database-blueprint/docs/journey-level-one-lesson-vision-2026-07-07.md
- database-blueprint/docs/game-loop-progression-model-v1.md
- database-blueprint/docs/progress-screen-system-vision-2026-07-08.md
- database-blueprint/docs/co-learning-teacher-mode-v1.md
- adapters/hearth-body-viewer.js
- assets/js/hearth-body-data.js
- the active Hearth CSS in simulator.html
- tools/hearth-layered-composition-preview.html

Also inspect any directly connected lesson, learner-progress, practice-event,
or node-routing modules needed to verify your conclusions. Cite concrete file
and line references for implementation claims.

NODE BOUNDARIES TO PROTECT

- Foundation teaches how to enter this learning world.
- Journey answers "What should I do next?" and sends the learner through the
  nodes in a useful order.
- Doing provides physical guitar drills.
- Practise provides timed repetition, observation, and practice records.
- Play develops groove, musical interaction, and playable application.
- Knowing is the music reference library.
- Study provides deeper guided investigation and understanding.
- Create turns material into experiments and musical seeds.
- Hearth explains the learner's inner systems and reflects real evidence about
  how those systems are developing.
- Mastery shows integration, artistry, personal voice, and examples of what
  developed musicians can do.

Hearth may link to another node, but it must not quietly become a duplicate
drill library, study library, practice timer, Journey dashboard, wellness menu,
or Mastery chamber.

REVIEW THE EXPERIENCE AT THREE DEPTHS

1. First click: one coherent place and visual metaphor. The image itself is the
   navigation. It should not look like a dashboard or a grid of organ icons.
2. Second click: one selected system opens a visual guided chamber with a small
   experience, not a collection of text cards.
3. Ongoing memory: Hearth interprets real Journey, Doing, Practise, Play,
   Study, and teacher evidence without making false scientific claims.

ANATOMY AND GUITAR REQUIREMENTS

- Show one complete, believable person in a plausible seated guitar posture.
- In the default right-handed version, the left hand frets and the right hand
  plays near the soundhole.
- Both shoulders, upper arms, elbows, forearms, wrists, hands, and five digits
  per visible hand must be coherent and complete.
- No duplicated hands, detached limbs, impossible joints, cropped anatomy, or
  hand passing through the instrument.
- The guitar must have exactly six continuous strings and six tuning machines,
  plausible proportions, and a readable body, neck, and headstock.
- Brain, eyes, ears, lungs/diaphragm, spine, and nervous pathways must appear in
  plausible locations and remain recognizable without clinical gore.
- Feeling/motivation should be represented as a non-literal whole-system glow,
  not a false claim that emotion lives only in the heart organ.
- Final production art must have no baked room, labels, UI, black rectangle,
  or visible background seam. It must support transparent clickable layers.

LEARNING AND EVIDENCE RULES

- Use plain language before scientific terms.
- Separate established evidence, teaching interpretation, and visual metaphor.
- Do not use neuroscience as decoration.
- Do not claim that clicking, minutes, or repetitions directly measure brain
  growth or mastery.
- Hearth may truthfully report observed evidence such as repetition, learner
  ratings, teacher notes, tension reports, recordings, or increasing comfort.
- Connect Journey activities to development tags such as pattern recognition,
  motor mapping, listening, timing, visual mapping, coordination, pressure
  control, feedback tolerance, and emotional regulation.
- Make those tags explanatory, not diagnostic scores.

TECHNICAL AND HANDOFF RULES

- Keep adapters/hearth-body-viewer.js as the one active Hearth renderer unless
  there is a documented architectural reason to replace it.
- Keep content/data separate from rendering.
- Preserve stable system IDs and provide an explicit migration from the
  current `heart` ID to `feeling`.
- Define one layer manifest rather than scattering coordinates through code.
- Use semantic buttons or equivalent accessible hit zones, keyboard focus,
  alt text, reduced-motion behavior, and responsive desktop/mobile placement.
- Avoid loading multiple large transparent images wastefully; recommend a
  practical asset format, dimensions, preload strategy, and performance budget.
- Design events so a future backend can store learner ID, source node, lesson
  or activity, development tags, observation/rating, timestamp, and evidence.
- Do not revive old competing Hearth renderers.

REQUIRED OUTPUT

Produce a practical professional audit with these sections:

1. Executive verdict
   - State in plain language whether the Hearth concept is aligned.
   - Name the single strongest idea and the single biggest current risk.

2. Overall-plan comparison
   - Compare Hearth with every other node and Journey.
   - Identify useful connections, duplication, gaps, and unclear ownership.
   - Recommend exact boundary wording for Hearth.

3. Current-state findings
   - List what to keep, change, remove, and defer.
   - Separate product/content issues from visual issues and code issues.
   - Ground implementation findings in file and line references.

4. Ideal click path
   - Describe the first click, system selection, one complete example chamber,
     return behavior, and how evidence reappears later.
   - Keep the experience visual, calm, game-like, and useful to a real learner.

5. Content architecture
   - Confirm or improve the seven system meanings.
   - Propose the minimum chamber schema and development-tag schema.
   - Show one Level 1 lesson example flowing into Hearth and back out without
     duplicating Journey, Doing, or Practise.

6. Visual and anatomy specification
   - Critique the current composition preview.
   - Specify the correct person, guitar posture, anatomy, layering, hover,
     selected state, labels, guide placement, and mobile adaptation.
   - Provide a strict anatomy and instrument QA checklist.

7. Technical architecture
   - Recommend the renderer/data/manifest/event boundaries.
   - Explain the recommendation in layman's terms.
   - Identify what the future backend needs and what should remain frontend.

8. Regression and accessibility plan
   - Define focused automated tests and browser visual checks.
   - Include six strings/tuners, complete layers, click routing, keyboard use,
     mobile framing, reduced motion, missing-asset fallback, and progress-event
     correctness.

9. Prioritized roadmap
   - Give the best next five steps in order.
   - Divide them into small approval gates so visual mistakes do not create
     hours of rework.
   - Label each step low, medium, or high credit cost and provide a realistic
     time range.
   - Distinguish "needed for the first excellent vertical slice" from "later."

10. Decision gates
   - End with the exact questions the product owner must answer before artwork,
     live UI installation, and deeper chamber development.

CONSTRAINTS

- Do not edit live simulator code during the audit.
- Do not generate images during the audit.
- Do not redesign unrelated nodes.
- Do not recommend a generic dashboard, card wall, or decorative organ menu.
- Do not hide uncertainty. Flag medical, neurological, pedagogical, or guitar
  claims that require better sources.
- Be decisive where the available evidence is sufficient.
- Explain all technical recommendations in plain language.
```

## Recommended Use

Run this audit first. Approve its node boundaries and ideal click path before
using image generation. Then update the Hearth rebuild brief, generate one
master reference, and create only the approved transparent layers.
