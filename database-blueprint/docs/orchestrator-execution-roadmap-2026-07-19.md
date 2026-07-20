# The Hearth Mastery Orchestrator Execution Roadmap

Date: 2026-07-19
Branch: `audit/orchestrator`
Starting checkpoint: `cb03c86`
Source: whole-simulator audit plus specialist status reports

## Executive Decision

The simulator's rooms are ahead of its shared learning system. Most nodes now
have a clear purpose, an approved visual metaphor, and at least one useful
route. The next milestone is not another broad visual redesign or a large
content expansion. It is making the simulator tell the truth about:

1. which learner is active;
2. what that learner actually did;
3. how strong that evidence is;
4. where the evidence should go next;
5. how the learner returns to the original lesson or node.

Worktrees allow isolated development, but shared contracts still need one
owner. No specialist may invent a private replacement for learner identity,
events, evidence stages, migration, or cross-node handoffs.

## Product Standard

Every meaningful route should satisfy:

`Orient -> Act -> Receive feedback -> Save evidence -> Know the next step`

The following meanings must remain separate:

- opening is not reading;
- reading or watching is not understanding;
- self-confidence is not demonstrated competence;
- one clean attempt is not mastery;
- time spent is not completion;
- a completed lesson is not a completed capability;
- a saved creative artifact is evidence, but not automatic technical mastery.

Journey asks what comes next. The nodes own the actual learning actions and
return evidence through stable contracts.

## Specialist Report Synthesis

| Area | Strongest current asset | Highest-priority risk | First responsible batch |
| --- | --- | --- | --- |
| Foundation | Strong threshold and Fret 0 route | Global progress and no shared evidence | Learner-scoped orientation evidence after the shared contract |
| Do | Best physical drill interaction | One click can overclaim mastery | Finish repeated-evidence and handoff batch already in progress |
| Know | Approved library and book metaphor | Reader paths and global shelf progress disagree | One reader path plus learner-scoped evidence |
| Practice | Strong six-stage session | Unfinished plans can leak between learners | Learner-scoped active sessions and safe legacy read |
| Study | Clear six-door chamber | Wrong subject can receive A-minor instructions | Subject-family templates and honest fallback |
| Hearth | Clear inner-instrument purpose | Static text and no saved action | Brain pilot after shared evidence contract |
| Play | Developed Mississippi route | Uneven source trust and incomplete handoffs | Harden Mississippi before adding regions |
| Create | Working learner-scoped Cauldron | Prompts can exceed Level 1; evidence return is thin | Level/capability prompt calibration |
| Mastery | Working Witness-Notice-Try-Carry loop | Tutorial source is not a true exemplar | Make one encounter trustworthy end to end |
| Journey | Strong map, roadmap, and lesson rhythm | False level completion and Jen shown too far ahead | Evidence preview, correct preflight, one real node round trip |

All node specialist status reports have now been received. The Study report was
submitted twice with the same result. Do is represented by its live
continuation branch and current in-progress batch.

## Shared Contract Gate

Before profile-sensitive node migrations are merged, the shared-progress lane
must establish these contracts:

### Active Learner

One shell-level service supplies the explicit learner ID. Node code must not
guess the learner from unrelated page text, old global counters, or another
node's private state.

### Event Envelope

New evidence events require stable values for:

- event ID and schema version;
- event type;
- learner ID and optional teacher role;
- source node and destination node IDs;
- activity, lesson, level, and capability IDs;
- attempt or session ID;
- evidence stage and evidence source;
- occurred and recorded timestamps;
- return route and fallback instruction;
- optional source, project, or recording references.

Validation and duplicate protection belong in shared infrastructure. Raw media
and sensitive notes do not belong inside the general event payload.

### Handoff Envelope

A cross-node handoff must preserve the learner, originating lesson/activity,
capabilities, exact task parameters, pass condition, safe easier step, return
route, and destination. A title alone is not a handoff.

### Migration Safety

Legacy state is inventoried and previewed before it is moved. The preview must
show the source key, proposed learner destination, conflicts, and rollback
information without changing stored data. No legacy key is bulk-deleted.

## Controlled Build Lanes

Only three implementation lanes should begin immediately.

### Lane A: Shared Learner And Progress

Worktree: `worktrees/shared-progress`

First batch:

1. inventory all active learner/progress keys;
2. build a read-only per-profile migration preview;
3. document conflicts and uncertain ownership;
4. propose the validated event and handoff schemas;
5. add tests proving that the preview does not alter learner data.

Time: 3-5 hours for the preview, followed by 4-7 hours for the active learner
service and validated envelope.

Credit: medium. Images and external research: none.

### Lane B: Do Evidence And Handoffs

Worktree: `worktrees/do`

An implementation batch is already present but uncommitted. It adds repeated
evidence thresholds, easier-step recommendations, capability-aware handoffs,
and focused smoke coverage. The focused core JavaScript smoke test passes.

Next action:

1. inspect the existing changes rather than rebuilding them;
2. reconcile their event/handoff fields with Lane A's proposed contract;
3. run the complete Do and repository smoke checks;
4. update the Do continuation brief;
5. commit one coherent batch and report the commit hash to the orchestrator.

Time: approximately 1-3 hours remaining if the existing implementation is
sound. Credit: low to medium. Images: none.

Do not discard the current uncommitted changes in this worktree.

### Lane C: Study Subject Correctness

Worktree: `worktrees/study`

First batch:

1. derive door activities from the selected subject family;
2. add a general inquiry fallback for unknown families;
3. test A-minor pentatonic and Time Signatures as contrasting subjects;
4. prove that Study sends the correct subject result to Practice and Journey;
5. avoid changing shared learner or event contracts in this branch.

Time: 4-6 hours. Credit: medium. Images: none.

This lane may proceed beside Lane A because its first task is primarily
node-owned content correctness. Any shared contract requirement returns to the
orchestrator rather than being implemented privately.

## Queued Waves

### Wave 2: Learner Isolation

Begin after Lane A's migration preview and active-learner contract are reviewed.

Recommended order:

1. Practice: learner-scoped unfinished sessions and legacy safety.
2. Know: one reader path and learner-scoped opened/read/answered/applied events.
3. Foundation: learner-scoped `opened`, `experienced`, `answered`, and
   `orientation_completed` evidence; resume the latest unfinished block and
   preserve the approved gateway and ten-fret structure.
4. Whole-progress display: remove misleading aggregate percentage and separate
   activity, time, capability evidence, and artifacts.

Practice comes first because an overwritten unfinished student session is the
most immediate data-integrity risk. Know follows because its visible shelf can
currently claim the wrong learner progress.

### Wave 3: Trustworthy Journey

Journey may design its evidence calculation while Wave 2 is underway, but it
must not perform a destructive migration or unlock levels until the shared
contract is stable.

Required sequence:

1. calculate Level 1 readiness in read-only preview mode;
2. keep the entry check outside the counted lesson total;
3. show Jen as Level 1 consolidation;
4. preserve all old notes and counts as historical activity;
5. prove one Journey -> Do -> Journey round trip;
6. add the guided end review, reminders, practice sheet, and next action.

Checkpoint 2026-07-20: all six items now have non-destructive prototype
coverage. Journey routes to the exact Do, Study, Hearth, Practice, Play,
Create, and Mastery activities and returns to the originating step. The
structured lesson review creates a learner-scoped practice sheet that Practice
can read. Journey and the global Progress panel calculate Level 1 readiness
from learner-scoped capability evidence, show Jen as Level 1 consolidation,
and retain older lesson counts only as labelled activity history. The shared
migration preview remains read-only; no legacy learner data was rewritten.

### Wave 4: Remaining Node Hardening

These batches follow the same shared contract:

1. Create: calibrate prompts by level/capability and return saved-seed evidence.
2. Play: harden Mississippi sources, media fallback, and Practice/Create return.
3. Mastery: strengthen one exemplar, Practice/Create handoffs, and reflection.
4. Hearth: simplify first click, build the Brain pilot, and save one real event.

Checkpoint 2026-07-20: the Hearth first click and Brain pilot are implemented.
The renderer uses the approved anatomical V2 image, seven semantic hit zones,
the four-stage Brain sequence, and canonical learner-scoped experiment and
reflection events. Other body-system chambers remain deliberately shallower
until this pilot is reviewed in real use.

Do not expand Play regions, Mastery catalogues, Hearth body systems, or Create
prompt breadth before each node's first route is trustworthy end to end.

### Wave 5: Protected Level 1 Content Gap

Do not lose this named batch:

1. a real song pathway;
2. a systematic listening activity;
3. TAB or diagram contact;
4. stronger right-hand work;
5. multi-day practice-history evidence;
6. a saved creation;
7. a genuine Mastery encounter.

This begins only after learner identity and Journey evidence are stable.
Prototype content plus review is estimated at 2-4 hours; careful source
research and full integration may increase that estimate.

### Wave 6: Quality And Depth

After the learning spine works:

- mobile and tablet repair;
- keyboard and screen-reader accessibility;
- source and rights review;
- Level 1 content depth;
- official examination crosswalk as an external benchmark;
- Level 2 planning only after Level 1 evidence is trustworthy.

## Merge Rules

1. Specialist branches do not merge each other.
2. Shared-progress changes merge before dependent profile migrations.
3. Each node batch updates its continuation brief and reports a commit hash.
4. The orchestrator reviews shared-file conflicts and decides merge order.
5. A batch is not complete because its UI opens; it must pass its evidence,
   learner separation, refresh, return-route, and regression checks.
6. No branch deletes legacy learner data.

## Acceptance Gate For The First Integration Milestone

The first milestone is complete when:

1. one active learner survives node changes and refreshes;
2. Ayla and Jen cannot inherit each other's new evidence;
3. migration previews are non-destructive and conflict-aware;
4. Do requires repeated evidence rather than one mastery click;
5. Study never invents A-minor instructions for Time Signatures;
6. Practice can preserve separate unfinished sessions;
7. Know distinguishes contact from understanding;
8. Journey shows Jen in Level 1 consolidation and does not count preflight;
9. one real node round trip returns evidence and the next action;
10. the protected Level 1 content-gap batch remains queued and documented.

## Current Orchestrator Assignments

Start Lane A, Lane B, and Lane C only. Keep all other specialist chats in
planning mode until their dependency gate opens. Foundation reporting is
complete, but its learner migration must not begin before the shared contract.
