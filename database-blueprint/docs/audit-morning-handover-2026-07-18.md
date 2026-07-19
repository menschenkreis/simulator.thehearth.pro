# Whole-Simulator Audit Morning Handover

Audit started: 2026-07-18
Finalized: 2026-07-19
Branch: `cleanup/handoff-architecture`
Verified code checkpoint: `bb7adaf`

## Completed

- Audited the live first-to-final paths for all nine nodes and Journey.
- Compared desktop, phone, and iPad layouts.
- Compared My Journey and Jen to test profile separation and progression truth.
- Wrote the master whole-simulator integration audit.
- Wrote fresh continuation briefs for all nine nodes, Journey, and the shared
  learner/progress system.
- Identified the simulator-wide priority: one active learner identity, one
  evidence envelope, and Journey progress based on evidence rather than counts.
- Preserved the protected Level 1 content-gap pass: song pathway, listening
  activity, TAB/diagram contact, stronger right-hand work, multi-day practice
  evidence, saved creation, and a genuine Mastery encounter.
- Added repeatable checks for loaded JavaScript syntax and broken local asset
  references.
- Left a clean, demonstrable Foundation route and stopped the temporary server.

## Changed

The audit made only contained, reversible corrections:

- `assets/js/journey.js` now preserves authored `categoryTags` and
  `countsTowardLevel` metadata when a Journey lesson becomes live data.
- `adapters/create-handoff-controller.js` explicitly records the active learner
  in Create handoff events.
- The renderer ownership check and its documentation now identify the true Play
  owner.
- `adapters/foundation-topic-viewer.js` uses the canonical guide-character
  catalogue instead of obsolete image paths.
- `simulator.html` links the existing Hearth browser and Apple touch icon.
- `tools/local_reference_check.py` checks loaded HTML, CSS, and JavaScript asset
  references without modifying the app.
- `tools/loaded_javascript_syntax_check.py` syntax-checks every loaded local
  JavaScript file.
- Existing smoke checks were strengthened to cover the guide catalogue and
  browser icon wiring.

No approved node meaning, image, learner history, level count, or stored
progress was silently rewritten.

## Verified

Automated checks:

- prototype smoke check: pass across 117 key files, two content banks, six
  seeds, twelve lesson seeds, and ten Foundation routes;
- core smoke check: pass across eight core files, ten active routes, two
  deliberately unmapped routes, and four action renderers;
- core JavaScript smoke check: pass;
- renderer ownership check: pass;
- node action smoke check: pass for all nine node actions;
- loaded JavaScript syntax check: pass for 142 files;
- local reference check: pass for 268 references across `simulator.html`, five
  loaded stylesheets, and 142 loaded scripts;
- whitespace and patch integrity check: pass.

Browser walkthrough:

- Map -> Foundation -> Enter Foundation -> Start Fret 0 -> Threshold lesson:
  pass on desktop;
- My Journey and Jen can be selected separately;
- Journey correctly changes visible learner context when profiles switch;
- browser warning/error console: empty during the verified walkthrough;
- active learner restored to My Journey after testing;
- temporary localhost server stopped successfully.

Important truth found by testing:

- profile separation is incomplete inside several legacy node stores;
- Jen currently exposes Level 2 even though the agreed learning state is Level
  1 consolidation;
- a Foundation progress count remains global across learner switches;
- the 390 x 844 Foundation lesson view clips its bottom action and needs a
  responsive fix.

These findings are documented risks, not hidden as passes.

## Remaining Risks

1. Mixed global and learner-scoped storage can make Ayla and Jen appear to
   share progress in Foundation, Do, Know, and parts of Practice.
2. Journey still treats lesson counts as stronger evidence than it should. A
   lesson marked `countsTowardLevel: false` can still appear inside misleading
   level totals or labels.
3. Jen's visible Level 2 access conflicts with the agreed consolidation plan.
4. Map, Journey, Do, and some lesson views clip or overflow on phone and iPad.
5. Keyboard focus, screen-reader names, and hidden-panel behaviour remain
   incomplete.
6. The app eagerly loads 142 scripts and several large visual assets, which can
   contribute to slow startup and laptop heat.
7. Node handoffs do not yet share one validated learner/activity/evidence
   envelope.
8. The protected Level 1 content gaps are still content work, not completed
   functionality.
9. Local storage is suitable for this prototype but is not a production
   backend or reliable multi-device sync system.

## Security Notes

- No hardcoded password, API key, client secret, or private key was found by the
  targeted tracked-file scan.
- Credentials previously shared in chat should be treated as exposed and
  rotated. Their values were not copied into the repository or this report.
- The admin prototype stores an authentication token in browser local storage.
  That is a future production-security issue, not something to extend as the
  backend model.
- Student notes, teacher notes, recordings, and identity data need an explicit
  privacy and retention decision before production storage is built.
- No keychain, account settings, browser credentials, or system configuration
  was accessed or changed during this audit.

## Decisions Needed

1. What exact evidence graduates a learner from Level 1?
2. Can a teacher record observed competence, and how is it distinguished from
   learner self-rating?
3. How should legacy global progress be assigned during migration: My Journey,
   Jen, unknown learner, or manual review?
4. Which devices must be fully supported at the next prototype milestone?
5. Which official music examination framework should be crosswalked first?
6. What counts as a genuine Mastery encounter: performance, interview,
   transcription, imitation, or a combination?
7. Which videos, books, diagrams, and recordings may be embedded, linked, or
   stored under current rights?

## Best Next Steps

1. **Shared learner and evidence foundation.** Build a read-only migration
   preview, then one active-learner service and validated event envelope.
   Estimated time: 7-12 hours in small batches. Credit: medium. Images: none.
2. **Journey truth repair.** Correct Jen's level state, make preflight contact
   visibly non-counting, and project progression from evidence rather than raw
   lesson totals. Estimated time: 5-8 hours. Credit: medium. Images: none.
3. **Protected Level 1 content-gap pass.** Add the song, listening, TAB/diagram,
   right-hand, practice-history, saved-creation, and Mastery encounters already
   agreed. Estimated time: 2-4 hours for a prototype content pass, followed by
   targeted integration. Credit: medium. Images: none required.

Do not begin by redesigning another room. The rooms are stronger than the
plumbing between them.

## Martin Brief

The current prototype is a legacy browser app whose composition root is
`simulator.html`. It combines node controllers/adapters, data modules,
local-storage progress, and compatibility handlers. It has useful, working
vertical slices and should be treated as a behavioural reference, not copied
wholesale into a new backend.

The emerging shared curriculum model has seven learning families and seventeen
Level 1 capabilities. The next backend should provide stable boundaries for:

- learner identity, teacher access, and roles;
- append-only learning evidence and reflections;
- curriculum, lessons, steps, resources, and source records;
- Journey projections and unlock decisions;
- node-to-node handoffs and return routes;
- saved learner artifacts, notes, and future recordings;
- versioned migration of legacy local data.

Do not reproduce every current local-storage key as a database table. First
define the canonical learner, activity, capability, evidence, resource, and
artifact contracts. Keep node-specific tools such as fretboards, tuners,
rhythm engines, and media views behind those shared contracts.

The main architectural weaknesses are mixed learner state, count-based Journey
progress, incomplete cross-node handoffs, 142 eager scripts, and limited
responsive/accessibility coverage. The strongest material to preserve is the
Map/Journey distinction, node meanings, approved visual metaphors, guided
lesson rhythm, learner reflections, and evidence-based teaching intention.

## Git Checkpoint

- Branch: `cleanup/handoff-architecture`
- `93bcc64`: audit ownership and learner-evidence wiring corrections
- `d2170f3`: master audit and continuation briefs
- `9e72414`: guide-asset correction and repeatable regression tools
- `bb7adaf`: existing Hearth browser icons linked
- Final documentation checkpoint: the commit containing this handover (use
  `git log -1` for its current hash).
- Final status: clean working tree; the local branch is two commits ahead of
  the tracked GitHub branch. No remote settings or credentials were changed.

Read first:

1. `whole-simulator-integration-audit-2026-07-18.md`
2. `node-continuation-briefs/README.md`
3. `node-continuation-briefs/shared-learner-progress-continuation-brief-2026-07-18.md`
4. `node-continuation-briefs/journey-continuation-brief-2026-07-18.md`

## Computer Safety Confirmation

- Work stayed inside the permitted simulator repository.
- No files outside the repository were edited.
- No dependencies or applications were installed.
- No system, startup, account, keychain, browser, or network settings changed.
- No destructive Git command was used.
- No credentials were displayed, copied, or stored.
- No external service or production backend was changed.
- No server, watcher, or long-running process was left running.
- The repository was clean before this final documentation update.
