# Shared Event And Handoff Contracts — Proposal V1

Date: 2026-07-19

Branch: `build/shared-learner-progress`

Status: Approved integration boundary; event runtime wired, handoff receivers pending

Formal contracts:

- `core/contracts/progress-event-envelope-v1.schema.json`
- `core/contracts/handoff-envelope-v1.schema.json`
- `core/contracts/evidence-stage-compatibility-v1.json`

These contract files define the integration boundary. `core/progress-event.js`
now implements the event normalization and validation rules, and
`adapters/progress-event-store.js` applies them to canonical appends. This batch
does not validate handoff receivers, create an active-learner service, migrate
node progress, or rewrite existing event records.

## Shared Event Envelope

The event is an immutable receipt for something that happened. It is not a
command and it does not directly unlock a level.

V1 preserves the current names `id`, `version`, `simulator_id`, `event_type`,
`learner_id`, and `node_id`. `node_id` remains the node that owned the action,
avoiding a breaking rename to `source_node_id`. The contract adds explicit:

- destination node when the result is meant for a handoff;
- activity, lesson, Journey level, capability, attempt, and session context;
- evidence stage and evidence source;
- occurred and recorded timestamps;
- return route and fallback instruction;
- optional source, project, recording, and handoff references.

New producers must supply the required keys even when a context value is null.
This distinguishes “not applicable” from “the producer forgot the field.” A
learner-owned event may never have a null learner ID.

Evidence stages remain separate:

`contact -> attempt -> demonstration -> application -> consolidation`

Evidence source states how the claim was obtained, such as self-report, direct
interaction, teacher observation, system measurement, artifact, recording
review, or migrated legacy data. A self-rating does not become demonstrated
competence merely because it has a high numeric rating.

### Journey Evidence-Stage Compatibility

Shared events use compact noun stages while the live Journey capability model
uses learner-state labels. Journey must normalize when reading an event:

| Shared event | Journey capability state |
| --- | --- |
| `contact` | `contact` |
| `attempt` | `attempted` |
| `demonstration` | `demonstrated` |
| `application` | `applied_musically` |
| `consolidation` | `consolidated` |

`not_encountered` is an absence state and never comes from an event.
`externally_assessed` requires a later assessed-evidence contract and must not
be inferred from a generic stage. Compatibility is a read-time mapping; stored
events are never rewritten merely to use Journey's labels.

### Capability Authority

Top-level `capability_ids` are credit-bearing candidates, not a bag of related
ideas. For an evidence event, every capability must list the producer's
`node_id` in the capability's Journey `nodeIds`. For a handoff, every capability
must authorize the `destination_node_id` expected to perform the task; the
source node does not need authority merely to route it.

Related but non-credit context belongs in `data.related_capability_ids`. Journey
must never use that field in capability evidence totals. For example, Do may
produce attempts later aggregated by Practice, but it may not directly claim
`L1-PREP-01`, `L1-PRACTICE-01`, or `L1-PLAY-01`, whose current `nodeIds` exclude
`doing`.

Example:

```json
{
  "id": "evt-jen-pent-20260719-01",
  "version": 1,
  "simulator_id": "hearth-guitar",
  "event_type": "drill_feedback_recorded",
  "learner_id": "jen-1",
  "actor_role": "learner",
  "node_id": "doing",
  "destination_node_id": "journey",
  "journey_level_id": "L1",
  "category_id": "scales",
  "lesson_id": "level-1-lesson-1",
  "activity_id": "a-minor-root-notes",
  "drill_id": "pent-roots-time",
  "capability_ids": ["L1-MAP-01", "L1-TIME-01"],
  "attempt_id": "attempt-jen-pent-01",
  "session_id": "session-jen-20260719",
  "evidence_stage": "demonstration",
  "evidence_source": "self_report",
  "source_id": null,
  "project_id": null,
  "recording_id": null,
  "handoff_id": "handoff-jen-pent-01",
  "duration_minutes": 5,
  "rating": 3,
  "note": "",
  "occurred_at": "2026-07-19T10:15:00Z",
  "recorded_at": "2026-07-19T10:15:02Z",
  "created_at": "2026-07-19T10:15:00Z",
  "return_route": {
    "node_id": "journey",
    "view_id": "lesson",
    "params": { "lesson_id": "level-1-lesson-1", "block_id": "do" }
  },
  "fallback_instruction": "Return to Journey and reopen Level 1 Lesson 1.",
  "data": {
    "state": "clean",
    "tempo_bpm": 60,
    "repetitions": 3,
    "destination_node_id": "journey",
    "activity_id": "a-minor-root-notes",
    "capability_ids": ["L1-MAP-01", "L1-TIME-01"],
    "attempt_id": "attempt-jen-pent-01",
    "session_id": "session-jen-20260719",
    "evidence_stage": "demonstration",
    "evidence_source": "self_report",
    "occurred_at": "2026-07-19T10:15:00Z",
    "recorded_at": "2026-07-19T10:15:02Z",
    "return_route": {
      "node_id": "journey",
      "view_id": "lesson",
      "params": { "lesson_id": "level-1-lesson-1", "block_id": "do" }
    },
    "fallback_instruction": "Return to Journey and reopen Level 1 Lesson 1."
  }
}
```

### Append And Duplicate Rules

1. Events are append-only; summaries are derived and replaceable.
2. A new store must require an explicit learner ID and stable event ID.
3. Re-appending the same ID and same normalized payload is idempotent.
4. Reusing an ID with a different payload is a blocking conflict, not an
   overwrite.
5. Existing `created_at` may be read by a compatibility adapter as both
   timestamps when no better information exists; raw history is not rewritten.
6. Raw recordings, credentials, arbitrary copyrighted media, and unrestricted
   sensitive notes do not belong in `data`.

### Runtime Storage And Legacy Compatibility

The local event store now preserves every approved canonical top-level field.
New producers should call the strict canonical path and keep all contract fields
top-level. A temporary `data` mirror remains readable for deployments or node
branches that still pass through the older store, but it is compatibility data,
not a second source of truth.

Runtime APIs are deliberately separated:

- `appendCanonical` validates and normalizes the full V1 envelope. It requires
  explicit `learner_id` and never infers identity.
- `appendResult` automatically sends events containing the new capability,
  evidence, or recorded-time fields to the canonical path. This leaves current
  incomplete Play and older node events on compatibility behavior until their
  producers are upgraded.
- `appendLegacy` is the clearly labelled compatibility path. It retains the old
  active-Journey learner fallback only for existing incomplete producers.
- `listRaw` (and the existing `list` alias) returns stored records unchanged.
  `listNormalized` returns wrappers labelled `canonical_v1` or `legacy_v0`;
  legacy values are projected in memory only.

Validation, duplicate, conflict, startup, and read operations never rewrite
existing history. A successful new append retains the predictable newest 1,000
records. Invalid or non-array event-store JSON blocks an append instead of being
silently replaced.

Do not introduce `source_node_id` on an event: `node_id` is the source/owner.
Use `attempt_id` for one activity attempt and `session_id` for its enclosing
lesson or Practice session. `practice_session_id` is not a new canonical name.

## Cross-Node Handoff Envelope

A handoff is a precise task invitation. It is not evidence that the learner did
the task. The receiving node creates evidence only after the learner acts.

The handoff requires:

- learner, source node, and destination node;
- originating activity, lesson, level, attempt/session, and capabilities;
- exact task instruction and structured parameters;
- an observable pass condition and minimum evidence stage;
- a safe easier step;
- an exact return route plus a plain-language fallback;
- creation time and optional source-event/media-reference IDs.

One handoff has one `destination_node_id`. If a workflow can go to more than one
node, create a separate envelope after the learner chooses; do not use a
`destination_node_ids` array.

Example:

```json
{
  "id": "handoff-jen-pent-01",
  "version": 1,
  "learner_id": "jen-1",
  "actor_role": "learner",
  "source_node_id": "journey",
  "destination_node_id": "doing",
  "activity_id": "a-minor-root-notes",
  "lesson_id": "level-1-lesson-1",
  "journey_level_id": "L1",
  "capability_ids": ["L1-MAP-01", "L1-TIME-01"],
  "attempt_id": "attempt-jen-pent-01",
  "session_id": "session-jen-20260719",
  "source_event_id": null,
  "source_id": null,
  "project_id": null,
  "recording_id": null,
  "task": {
    "id": "play-a-roots-in-time",
    "instruction": "Play three A root notes in time at 60 BPM.",
    "parameters": { "drill_id": "pent-roots-time", "tempo_bpm": 60, "repetitions": 3 }
  },
  "pass_condition": {
    "description": "Three repetitions stay with the pulse and land cleanly on A.",
    "minimum_evidence_stage": "demonstration",
    "criteria": { "minimum_clean_repetitions": 3, "pulse_required": true }
  },
  "easier_step": {
    "instruction": "Play one A root at a time without the metronome, then retry at 50 BPM.",
    "parameters": { "tempo_bpm": 50, "minimum_clean_repetitions": 1 }
  },
  "return_route": {
    "node_id": "journey",
    "view_id": "lesson",
    "params": { "lesson_id": "level-1-lesson-1", "block_id": "do" }
  },
  "fallback_instruction": "Return to Journey and reopen Level 1 Lesson 1.",
  "created_at": "2026-07-19T10:10:00Z",
  "expires_at": null
}
```

### Receiver Rules

1. Reject or quarantine a handoff whose learner differs from the shell's active
   learner; never silently reassign it.
2. Preserve source context and handoff ID in the resulting event.
3. Use the exact parameters supplied; a node may offer the named easier step
   but may not invent a different success claim.
4. Return to the structured route. If that route cannot be restored, show the
   fallback instruction instead of dropping the learner on an unrelated page.
5. Completing navigation alone emits no demonstration or application evidence.
6. Reuse an attempt ID for duplicate feedback within the same attempt. Create a
   new attempt ID only when the learner deliberately starts or retries the task;
   an unchanged feedback state can still belong to a genuinely new attempt.

## Compatibility And Next Gate

Raw legacy records remain readable and are not rewritten by the normalization
view. Duplicate protection compares normalized payloads: the same ID and same
payload is idempotent without a storage write; the same ID with different data
is a blocking conflict and cannot overwrite the earlier receipt.

The next shared-progress batch is the separate active-learner service. After
that lands, integrate the Do producer commit and validate Journey -> Do ->
Journey and Practice -> Do -> Practice round trips, including refresh and
idempotent retry behavior. Node progress migration remains a later, separately
approved operation.
