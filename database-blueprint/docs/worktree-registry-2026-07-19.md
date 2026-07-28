# Simulator Worktree Registry

Date: 2026-07-19
Shared starting point: `8130786`

Each specialist chat owns one worktree and one Git branch. A chat must work only
inside its assigned folder and must not switch branches inside that worktree.

| Responsibility | Worktree folder | Git branch | Continuation brief |
| --- | --- | --- | --- |
| Whole-app audit and orchestration | `simulator.thehearth.pro` | `audit/orchestrator` | `whole-simulator-integration-audit-2026-07-18.md` |
| Foundation | `worktrees/foundation` | `build/foundation-node-continuation` | `foundation-continuation-brief-2026-07-18.md` |
| Do | `worktrees/do` | `build/do-node-continuation` | `do-continuation-brief-2026-07-18.md` |
| Know | `worktrees/know` | `build/know-node-continuation` | `know-continuation-brief-2026-07-18.md` |
| Practice | `worktrees/practice` | `build/practice-node-continuation` | `practice-continuation-brief-2026-07-18.md` |
| Study | `worktrees/study` | `build/study-node-continuation` | `study-continuation-brief-2026-07-18.md` |
| Hearth | `worktrees/hearth` | `build/hearth-node-continuation` | `hearth-continuation-brief-2026-07-18.md` |
| Play | `worktrees/play` | `build/play-node-continuation` | `play-continuation-brief-2026-07-18.md` |
| Create | `worktrees/create` | `build/create-node-continuation` | `create-continuation-brief-2026-07-18.md` |
| Mastery | `worktrees/mastery` | `build/mastery-node-continuation` | `mastery-continuation-brief-2026-07-18.md` |
| Journey | `worktrees/journey` | `build/journey-continuation` | `journey-continuation-brief-2026-07-18.md` |
| Shared learner progress | `worktrees/shared-progress` | `build/shared-learner-progress` | `shared-learner-progress-continuation-brief-2026-07-18.md` |

All worktree folders are inside:

`/Users/alessandralove/Documents/The Hearth Simulator/`

## Working Rules

1. Read the master audit and the assigned continuation brief before editing.
2. Reconcile the brief with the live code; do not assume the brief is newer.
3. Keep node-specific work in the node branch. Put cross-node contracts in the
   shared-progress branch or return them to the orchestrator for assignment.
4. Run the relevant smoke checks before committing.
5. Commit coherent, reviewable batches and report the commit hash to the
   orchestrator chat.
6. Do not merge another node branch. The orchestrator decides merge order and
   resolves shared-file conflicts.
7. Do not generate images or make broad visual changes without Ayla's approval.

## Orchestrator Merge Order

The default order is:

1. shared learner/progress contracts;
2. node batches that depend on those contracts;
3. Journey evidence and handoffs;
4. whole-app integration checks;
5. visual and content refinement after behavior is stable.

The order may change after the specialist status reports are reviewed.
