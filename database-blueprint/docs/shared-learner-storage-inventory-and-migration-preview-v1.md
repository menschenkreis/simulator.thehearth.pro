# Shared Learner Storage Inventory And Migration Preview V1

Date: 2026-07-19

Branch: `build/shared-learner-progress`

Status: Lane A preview implemented; no learner migration performed

## Safety Boundary

The preview is deliberately read-only. It reads a Storage-compatible object,
returns a report, and exposes no apply or migration function. The report contains
key names, types, counts, fingerprints, proposed destinations, conflicts, and
rollback instructions. It does not contain raw stored values.

No existing learner key is changed or deleted. A future migration must be a
separate reviewed batch with an export/backup and a migration manifest.

Implementation:

- `core/learner-migration-preview.js`
- browser global: `HearthLearnerMigrationPreview`
- CommonJS export for isolated tooling

## Inventory Findings

The live code uses a mixture of four ownership shapes:

1. **Already scoped:** Journey embeds profiles; Create and Study use learner
   maps; Play and Mastery put the learner ID in the key.
2. **Record-scoped when complete:** shared events and some session/log records
   carry `learner_id`, but older records may not.
3. **Single learner record:** clean lesson progress, planned Practice, and the
   Practice candle have room for learner identity but can contain no learner.
4. **Global legacy state:** Foundation, Do, Know, legacy Practice, notes,
   insights, and several Create/Study values can be shared accidentally by all
   profiles.

The highest-risk conflicts are:

- A global key cannot be assigned safely merely because one profile happens to
  be active when the preview runs. With Ayla and Jen present, the preview marks
  that ownership as blocking and only shows the active learner as a candidate.
- The entry page maintains a separate `hearth_users` / `hearth_current`
  profile model identified by name, while Journey uses stable learner IDs.
  Those records cannot be joined safely by name or assumed to be the same
  people.
- `hearth-journey-v2` and `hearth-journey-active-student` are separate identity
  sources and can disagree.
- Create and Study have both new scoped stores and active legacy stores. A
  future copy could collide with or duplicate already-scoped data.
- Foundation writes both `hearth-foundation-progress` and
  `hearth.cleanProgress.v1`; the clean record can still have a null learner ID.
- Practice history, Study notes, Hearth sessions, and insights may mix records
  with and without learner IDs.
- `fProgress`, `dProgress`, and `kProgress` remain active legacy read aliases in
  the header even though their ownership and writers are uncertain.
- `hearth-progress-events` is append-only evidence in principle, but the current
  store has no validation or duplicate guard and can infer learner identity.

## Reviewed Key Catalogue

| Key or pattern | Current scope | Proposed destination | Preview action |
| --- | --- | --- | --- |
| `hearth_users` | Entry profile array without stable learner IDs | learner profiles | Reconcile explicitly; never join by name alone |
| `hearth_current` | Entry current profile without stable learner ID | active learner preference | Reconcile explicitly with Journey identity |
| `hearth-journey-v2` | Embedded profiles | learner profiles + Journey progress | Split by embedded profile; preserve source |
| `hearth-journey-active-student` | Active-profile preference | active learner preference | Retain and compare with Journey state |
| `hearth-progress-events` | Per record, sometimes missing | append-only progress events | Retain; report missing/unknown learner IDs |
| `hearth.cleanProgress.v1` | Single learner record, ID may be null | lesson progress | Require explicit learner |
| `hearth-foundation-progress`, `fProgress` | Global legacy | progress events | Candidate conversion; block ambiguous owner |
| `hearth-doing-progress`, `dProgress` | Global legacy | progress events | Candidate conversion; block ambiguous owner |
| `hearth-doing-progress-migration-v1` | Migration metadata | migration manifests | Retain |
| `hearth-knowing-progress`, `kProgress` | Global legacy | progress events | Candidate conversion; block ambiguous owner |
| `hearth-knowing-state` | Global legacy | learner reading state | Candidate copy; block ambiguous owner |
| `hearth-knowing-quiz` | Global legacy | quiz attempts | Candidate conversion; block ambiguous owner |
| `hearth-practice-state` | Global legacy | Practice profile state | Candidate copy; block ambiguous owner |
| `hearth-practice-log` | Record array, mixed | Practice sessions | Split only records with explicit learner |
| `hearth-practice-notes` | Record array, mixed | Practice reflections | Split only records with explicit learner |
| `hearth-planned-practice-v1` | Single record | Practice profile state | Require explicit learner |
| `hearth-practice-candle-v1` | Single record | Practice profile state | Require explicit learner |
| `hearth-study-chamber-v1` | Learner map | Study profiles | Split by learner map |
| `hearth-study-locks` | Global legacy | Study profiles | Candidate copy; block ambiguous owner |
| `hearth-study-notes` | Record array, often global | Study evidence | Split only records with explicit learner |
| `hearth-create-v1` | Learner map | Create profiles | Split by learner map |
| `hearth-create-current` | Global legacy | Create profiles | Candidate copy; detect overlap |
| `hearth-create-projects` | Global legacy | Create profiles | Candidate copy; detect overlap |
| `hearth-create-entry-intent` | Global legacy | Create profiles | Candidate copy; detect overlap |
| `cauldron-notes` | Global text | Create project notes | Candidate copy; block ambiguous owner |
| `hearth-play-session-v1:*` | Learner ID in key | Play sessions | Retain; validate learner suffix |
| `hearth-mastery-encounter-v1:*` | Learner ID in key | Mastery encounters | Retain; validate learner suffix |
| `hearth-insights` | Record array, often global | learner reflections | Split only records with explicit learner |
| `hearth-notebook-*` | Global context text | learner notes | Candidate copy; block ambiguous owner |
| `hearth-sessions` | Record array, mixed | app sessions | Split only records with explicit learner |
| `streak` | Global derived summary | derived progress summary | Recalculate; do not treat as evidence |
| `flameNode`, `travelledPaths` | Browser UI state | browser UI preferences | Keep local or do not migrate |

`hearth-practice-notes` and `hearth-sessions` are dormant legacy patterns: their
remaining source scripts are not loaded by the current simulator, but existing
stored learner data must still be detected and preserved. The machine-readable
inventory marks these entries `dormant_legacy`; other entries are active in the
current entry or simulator composition.

Adjacent settings deliberately excluded from learner migration include
`hearth-admin-token`, theme keys, sound/particle preferences, and
`hearthJourneyApiSync`. In particular, an auth token must never enter a learner
export or migration payload.

## Preview Report

The preview returns:

- all catalogue patterns and which keys are present;
- learner profiles and the active identity sources;
- source format, value type, byte count, record count, and a deterministic
  fingerprint;
- embedded or per-record learner IDs without exposing record contents;
- a destination store and learner candidates;
- blocking and review conflicts;
- rollback information that always preserves the source key;
- an explicit safety declaration with zero writes, zero deletes, and no apply
  capability.

Read-only browser usage:

```js
const report = HearthLearnerMigrationPreview.preview(localStorage);
console.table(report.items.map(item => ({
  source: item.source_key,
  destination: item.proposed_destination.store,
  decision: item.proposed_destination.decision,
  conflicts: item.conflicts.map(conflict => conflict.code).join(", ")
})));
```

This call must not be converted into an automatic startup action. Previewing is
an explicit diagnostic step.

## Conflict Decisions

- **Blocking:** invalid JSON, wrong value type, unknown learner ID, conflicting
  active identity, multiple possible owners for global data, or records with no
  learner when more than one profile exists.
- **Review:** a single-profile candidate, overlapping legacy/scoped sources, or
  a record with missing identity when only one profile exists.
- **Retain:** already-scoped or UI/metadata state that should not be copied by
  this first migration.

The preview never resolves a blocking conflict. A human must identify the
owner, decide deduplication rules, and approve the future migration manifest.

## Rollback Contract For A Future Migration

Before any future write:

1. export the exact source value and fingerprint;
2. record every destination record ID in a migration manifest;
3. leave the source key intact;
4. make the write idempotent by migration and source fingerprint;
5. on rollback, restore the exact source and remove only destination records
   named by that manifest;
6. never bulk-delete legacy localStorage.

## Tests

`tools/core_js_smoke_check.py` exercises the preview with a Storage spy whose
write and delete methods throw. It proves that:

- the input snapshot is byte-for-byte unchanged;
- no write/delete method is called;
- two-profile global state is blocked as ambiguous;
- missing and unknown learner IDs are reported;
- dynamic profile keys are inventoried;
- invalid JSON is preserved and blocked;
- private note contents do not appear in the report.
