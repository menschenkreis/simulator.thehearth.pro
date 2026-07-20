#!/usr/bin/env python3
"""Run a small behavior check against the browser-compatible core modules."""

from __future__ import annotations

import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def main() -> int:
    if not shutil.which("osascript"):
        print("Core JS smoke check skipped: osascript is not available.")
        return 0

    script = f"""
ObjC.import('Foundation');

function readText(path) {{
  var text = $.NSString.stringWithContentsOfFileEncodingError(
    path,
    $.NSUTF8StringEncoding,
    null
  );
  return ObjC.unwrap(text);
}}

function assert(condition, message) {{
  if (!condition) {{
    throw new Error(message);
  }}
}}

var root = {str(ROOT)!r};
eval(readText(root + "/core/lesson-core.js"));
eval(readText(root + "/core/renderer-registry.js"));
eval(readText(root + "/adapters/action-renderer-registry-bootstrap.js"));
eval(readText(root + "/core/foundation-adapter.js"));
eval(readText(root + "/adapters/foundation-route-manifest-runtime.js"));
eval(readText(root + "/adapters/foundation-action-renderers.js"));
eval(readText(root + "/adapters/foundation-seed-loader.js"));
eval(readText(root + "/adapters/foundation-lesson-launcher.js"));
eval(readText(root + "/adapters/foundation-lesson-shell.js"));
eval(readText(root + "/adapters/foundation-ui-utils.js"));
eval(readText(root + "/adapters/rainbow-blocks-viewer.js"));
eval(readText(root + "/adapters/foundation-map-viewer.js"));
eval(readText(root + "/adapters/foundation-panel-controller.js"));
eval(readText(root + "/adapters/foundation-topic-viewer.js"));
eval(readText(root + "/adapters/foundation-topic-controller.js"));
eval(readText(root + "/adapters/foundation-audio.js"));
eval(readText(root + "/core/lesson-view-model.js"));
eval(readText(root + "/core/lesson-session.js"));
eval(readText(root + "/core/learner-progress.js"));
var learnerMigrationPreviewSource = readText(root + "/core/learner-migration-preview.js");
assert(learnerMigrationPreviewSource.indexOf(".setItem(") === -1, "Learner migration preview must not contain a storage write call");
assert(learnerMigrationPreviewSource.indexOf(".removeItem(") === -1, "Learner migration preview must not contain a storage delete call");
eval(learnerMigrationPreviewSource);
eval(readText(root + "/core/progress-event.js"));
eval(readText(root + "/core/journey-progress.js"));
eval(readText(root + "/core/level-one-song-thread.js"));
eval(readText(root + "/adapters/progress-event-store.js"));
eval(readText(root + "/adapters/cross-node-handoff-store.js"));
eval(readText(root + "/core/play-domain.js"));
eval(readText(root + "/assets/js/journey-data.js"));
eval(readText(root + "/assets/js/mastery-data.js"));
eval(readText(root + "/adapters/study-key-chamber-model.js"));
eval(readText(root + "/assets/js/play-traditions.js"));
eval(readText(root + "/adapters/play-atlas-model.js"));
eval(readText(root + "/adapters/play-atlas-viewer.js"));
eval(readText(root + "/adapters/browser-progress-store.js"));
eval(readText(root + "/adapters/foundation-progress-bridge.js"));
eval(readText(root + "/adapters/doing-progress-bridge.js"));
eval(readText(root + "/adapters/teaching-engine-core-adapter.js"));
eval(readText(root + "/adapters/doing-ui-utils.js"));
eval(readText(root + "/adapters/doing-config.js"));
eval(readText(root + "/adapters/doing-drill-catalog.js"));
eval(readText(root + "/adapters/doing-drill-board-model.js"));
eval(readText(root + "/adapters/doing-controls-controller.js"));
eval(readText(root + "/adapters/doing-drill-adjust-controller.js"));
eval(readText(root + "/adapters/doing-drill-preview-controller.js"));
eval(readText(root + "/adapters/doing-teaching-viewer.js"));
eval(readText(root + "/adapters/doing-drill-detail-viewer.js"));
eval(readText(root + "/adapters/doing-drill-board-viewer.js"));
eval(readText(root + "/adapters/doing-shell-viewer.js"));
eval(readText(root + "/adapters/doing-entry-viewer.js"));
eval(readText(root + "/adapters/doing-explorer-viewer.js"));
eval(readText(root + "/adapters/doing-explorer-controller.js"));
eval(readText(root + "/adapters/doing-map-viewer.js"));
eval(readText(root + "/adapters/doing-map-controller.js"));
eval(readText(root + "/adapters/doing-room-viewer.js"));
eval(readText(root + "/adapters/doing-panel-controller.js"));
eval(readText(root + "/adapters/knowing-level-model.js"));
eval(readText(root + "/adapters/knowing-shelf-viewer.js"));
eval(readText(root + "/adapters/knowing-shelf-controller.js"));
eval(readText(root + "/adapters/knowing-book-viewer.js"));
eval(readText(root + "/adapters/knowing-topic-viewer.js"));
eval(readText(root + "/adapters/knowing-progress-controller.js"));
eval(readText(root + "/adapters/knowing-panel-controller.js"));
eval(readText(root + "/adapters/knowing-study-model.js"));
eval(readText(root + "/adapters/knowing-study-dashboard-viewer.js"));
eval(readText(root + "/adapters/knowing-study-question-model.js"));
eval(readText(root + "/adapters/knowing-study-session-model.js"));
eval(readText(root + "/adapters/knowing-study-session-viewer.js"));
eval(readText(root + "/adapters/knowing-study-quiz-controller.js"));
eval(readText(root + "/adapters/practice-state.js"));
eval(readText(root + "/adapters/practice-guide-model.js"));
eval(readText(root + "/adapters/practice-dashboard-viewer.js"));
eval(readText(root + "/adapters/practice-drill-viewer.js"));
eval(readText(root + "/adapters/practice-session-model.js"));
eval(readText(root + "/adapters/practice-session-viewer.js"));
eval(readText(root + "/adapters/practice-ui-utils.js"));
eval(readText(root + "/adapters/practice-metronome-controller.js"));
eval(readText(root + "/adapters/practice-entry-model.js"));
eval(readText(root + "/adapters/practice-entry-viewer.js"));
eval(readText(root + "/adapters/practice-planned-session-store.js"));
eval(readText(root + "/adapters/practice-planned-session-viewer.js"));
eval(readText(root + "/adapters/play-world-viewer.js"));
eval(readText(root + "/adapters/mastery-viewer.js"));
eval(readText(root + "/adapters/create-cauldron-model.js"));
eval(readText(root + "/adapters/create-cauldron-viewer.js"));
eval(readText(root + "/adapters/create-cauldron-controller.js"));
eval(readText(root + "/adapters/create-state.js"));
eval(readText(root + "/adapters/create-handoff-controller.js"));
eval(readText(root + "/adapters/create-entry-model.js"));
eval(readText(root + "/adapters/create-entry-viewer.js"));
eval(readText(root + "/adapters/text-to-speech-controller.js"));
eval(readText(root + "/adapters/header-tools-controller.js"));
eval(readText(root + "/adapters/references-panel-controller.js"));
eval(readText(root + "/adapters/link-deposit-controller.js"));
eval(readText(root + "/adapters/recorder-controller.js"));
eval(readText(root + "/adapters/notebook-controller.js"));
eval(readText(root + "/adapters/dictionary-controller.js"));

var seed = JSON.parse(readText(root + "/database-blueprint/seeds/foundation_conversations_lesson_v2.json"));
var foundationManifest = JSON.parse(readText(root + "/core/foundation-route-manifest.json"));
var proposedEventSchema = JSON.parse(readText(root + "/core/contracts/progress-event-envelope-v1.schema.json"));
var proposedHandoffSchema = JSON.parse(readText(root + "/core/contracts/handoff-envelope-v1.schema.json"));
var evidenceStageCompatibility = JSON.parse(readText(root + "/core/contracts/evidence-stage-compatibility-v1.json"));

assert(proposedEventSchema.required.indexOf("node_id") !== -1, "Event proposal should preserve node_id as the producing node");
assert(proposedEventSchema.properties.source_node_id === undefined, "Event proposal should not introduce a competing source_node_id");
assert(proposedEventSchema.properties.created_at.deprecated === true, "Event proposal should allow the temporary created_at compatibility alias");
assert(proposedHandoffSchema.required.indexOf("source_node_id") !== -1, "Handoff proposal should require its source node");
assert(proposedHandoffSchema.required.indexOf("destination_node_id") !== -1, "Handoff proposal should require one destination node");
assert(proposedHandoffSchema.required.indexOf("fallback_instruction") !== -1, "Handoff proposal should require a top-level fallback instruction");
assert(evidenceStageCompatibility.canonical_to_journey.attempt === "attempted", "Shared attempt evidence should map explicitly into Journey");
assert(evidenceStageCompatibility.canonical_to_journey.application === "applied_musically", "Shared application evidence should map explicitly into Journey");
assert(evidenceStageCompatibility.journey_to_canonical.externally_assessed === null, "External assessment should not be inferred from a generic event stage");
assert(proposedEventSchema.properties.capability_ids.description.indexOf("authorize node_id") !== -1, "Event capability IDs should obey producer-node authority");
assert(proposedHandoffSchema.properties.capability_ids.description.indexOf("authorize destination_node_id") !== -1, "Handoff capability IDs should obey destination-node authority");
assert(HearthProgressEventContract.normalizeJourneyLevelId("level-1") === "L1", "Journey level aliases should normalize to the live L1 identifier");
assert(HearthProgressEventContract.toJourneyEvidenceStage("demonstration") === "demonstrated", "Canonical evidence should map into the live Journey stage vocabulary at read time");
Object.keys(evidenceStageCompatibility.canonical_to_journey).forEach(function verifyRuntimeEvidenceStage(stage) {{
  assert(HearthProgressEventContract.toJourneyEvidenceStage(stage) === evidenceStageCompatibility.canonical_to_journey[stage], "Runtime Journey stage mapping should match the approved compatibility contract: " + stage);
}});

var progressStoreLegacyEvent = {{
  id: "legacy-event-1",
  version: 1,
  simulator_id: "hearth-guitar",
  learner_id: "jen-1",
  event_type: "concept_read",
  node_id: "knowing",
  journey_level_id: null,
  category_id: "theory",
  lesson_id: null,
  drill_id: null,
  source_id: "topic-intervals",
  duration_minutes: null,
  rating: null,
  note: "",
  data: {{ topic_id: "topic-intervals" }},
  created_at: "2026-07-18T09:00:00.000Z"
}};
var progressStoreValues = {{
  "hearth-progress-events": JSON.stringify([progressStoreLegacyEvent]),
  "hearth-journey-v2": JSON.stringify({{ activeStudentId: "ayla-1" }})
}};
var progressStoreWriteCount = 0;
var progressStoreStorage = {{
  getItem: function(key) {{
    return Object.prototype.hasOwnProperty.call(progressStoreValues, key) ? progressStoreValues[key] : null;
  }},
  setItem: function(key, value) {{
    progressStoreWriteCount += 1;
    progressStoreValues[key] = String(value);
  }}
}};
var progressStoreBeforeRead = progressStoreStorage.getItem("hearth-progress-events");
var progressStoreRawRead = HearthProgressEvents.listRaw(progressStoreStorage);
var progressStoreNormalizedRead = HearthProgressEvents.listNormalized(progressStoreStorage);
assert(progressStoreWriteCount === 0, "Raw and normalized event reads must not write storage");
assert(progressStoreStorage.getItem("hearth-progress-events") === progressStoreBeforeRead, "Reading existing history must not rewrite it");
assert(progressStoreRawRead[0].data.topic_id === "topic-intervals", "Legacy events should remain readable in their raw stored shape");
assert(progressStoreNormalizedRead[0].source_format === "legacy_v0", "Legacy normalized reads should be explicitly labelled as compatibility projections");
assert(progressStoreNormalizedRead[0].compatibility_mode === "read_time_projection_only", "Legacy normalization should say that it is read-time only");
assert(progressStoreNormalizedRead[0].event.occurred_at === progressStoreLegacyEvent.created_at, "Legacy created_at should project to occurred_at without rewriting raw history");

var completeDoEvent = {{
  id: "evt-do-jen-pent-01",
  version: 1,
  simulator_id: "hearth-guitar",
  event_type: "drill_feedback_recorded",
  learner_id: "jen-1",
  actor_role: "learner",
  node_id: "doing",
  destination_node_id: "journey",
  journey_level_id: "L1",
  category_id: "coordination",
  lesson_id: "level-1-lesson-1",
  activity_id: "pent-roots-time",
  drill_id: "pent-roots-time",
  capability_ids: ["L1-MAP-01", "L1-TIME-01"],
  attempt_id: "attempt-jen-pent-01",
  session_id: "session-jen-20260719",
  evidence_stage: "demonstration",
  evidence_source: "self_report",
  source_id: null,
  project_id: null,
  recording_id: null,
  handoff_id: "handoff-jen-pent-01",
  duration_minutes: 5,
  rating: 3,
  note: "",
  occurred_at: "2026-07-19T10:15:00.000Z",
  recorded_at: "2026-07-19T10:15:02.000Z",
  created_at: "2026-07-19T10:15:00.000Z",
  return_route: {{
    node_id: "journey",
    view_id: "lesson",
    params: {{ lesson_id: "level-1-lesson-1", block_id: "do" }}
  }},
  fallback_instruction: "Return to Journey and reopen Level 1 Lesson 1.",
  data: {{
    state: "clean",
    destination_node_id: "journey",
    activity_id: "pent-roots-time",
    capability_ids: ["L1-MAP-01", "L1-TIME-01"],
    related_capability_ids: ["L1-PRACTICE-01"],
    attempt_id: "attempt-jen-pent-01",
    session_id: "session-jen-20260719",
    evidence_stage: "demonstration",
    evidence_source: "self_report",
    occurred_at: "2026-07-19T10:15:00.000Z",
    recorded_at: "2026-07-19T10:15:02.000Z",
    task: {{ instruction: "Play three A roots in time." }},
    pass_condition: {{ description: "Three clean repetitions stay with the pulse." }},
    easier_step: {{ instruction: "Play one A root without the metronome." }},
    return_route: {{
      node_id: "journey",
      view_id: "lesson",
      params: {{ lesson_id: "level-1-lesson-1", block_id: "do" }}
    }},
    fallback_instruction: "Return to Journey and reopen Level 1 Lesson 1."
  }}
}};

var completeDoAppend = HearthProgressEvents.append(completeDoEvent, progressStoreStorage);
assert(completeDoAppend && completeDoAppend.id === completeDoEvent.id, "A complete Do event should append through the producer-facing canonical bridge");
var completeDoStored = HearthProgressEvents.listRaw(progressStoreStorage)[1];
[
  "destination_node_id",
  "activity_id",
  "capability_ids",
  "attempt_id",
  "session_id",
  "evidence_stage",
  "evidence_source",
  "occurred_at",
  "recorded_at",
  "return_route",
  "fallback_instruction"
].forEach(function verifyCanonicalFieldSurvives(field) {{
  assert(JSON.stringify(completeDoStored[field]) === JSON.stringify(completeDoEvent[field]), "Canonical append/read should preserve " + field);
}});
assert(completeDoStored.actor_role === "learner" && completeDoStored.handoff_id === "handoff-jen-pent-01", "Canonical append/read should preserve optional approved context");
assert(completeDoStored.data.related_capability_ids[0] === "L1-PRACTICE-01", "Non-credit related capability context should survive in data");
assert(completeDoStored.data.pass_condition.description.indexOf("pulse") !== -1, "Do pass conditions should survive in event data");
assert(completeDoStored.data.easier_step.instruction.indexOf("without") !== -1, "Do easier steps should survive in event data");
assert(HearthProgressEvents.listNormalized(progressStoreStorage)[1].source_format === "canonical_v1", "Canonical records should be recognized on normalized read");
assert(HearthProgressEvents.listNormalized(progressStoreStorage)[1].valid === true, "A stored Do event should remain valid after read normalization");
assert(JSON.stringify(HearthProgressEvents.listRaw(progressStoreStorage)[0]) === JSON.stringify(progressStoreLegacyEvent), "Appending a canonical event must preserve preceding legacy event records");

var progressStoreAfterFirstAppend = progressStoreStorage.getItem("hearth-progress-events");
var progressStoreWritesAfterFirstAppend = progressStoreWriteCount;
var equivalentDoEvent = JSON.parse(JSON.stringify(completeDoEvent));
equivalentDoEvent.journey_level_id = "level-1";
var duplicateDoAppend = HearthProgressEvents.appendCanonical(equivalentDoEvent, progressStoreStorage);
assert(duplicateDoAppend.ok && duplicateDoAppend.status === "duplicate", "The same ID and normalized payload should be idempotent");
assert(progressStoreWriteCount === progressStoreWritesAfterFirstAppend, "An idempotent duplicate should not rewrite storage");
assert(progressStoreStorage.getItem("hearth-progress-events") === progressStoreAfterFirstAppend, "An idempotent duplicate should leave history byte-for-byte unchanged");

var conflictingDoEvent = JSON.parse(JSON.stringify(completeDoEvent));
conflictingDoEvent.rating = 4;
var conflictingDoAppend = HearthProgressEvents.appendCanonical(conflictingDoEvent, progressStoreStorage);
assert(!conflictingDoAppend.ok && conflictingDoAppend.status === "conflict", "The same ID with different data should be a blocking conflict");
assert(conflictingDoAppend.errors[0].code === "duplicate_id_conflict", "Duplicate conflicts should be distinguishable from validation failures");
assert(progressStoreStorage.getItem("hearth-progress-events") === progressStoreAfterFirstAppend, "A conflicting duplicate must not overwrite or append anything");

var missingLearnerDoEvent = JSON.parse(JSON.stringify(completeDoEvent));
missingLearnerDoEvent.id = "evt-do-missing-learner";
delete missingLearnerDoEvent.learner_id;
var missingLearnerBefore = progressStoreStorage.getItem("hearth-progress-events");
var missingLearnerAppend = HearthProgressEvents.appendResult(missingLearnerDoEvent, progressStoreStorage);
assert(!missingLearnerAppend.ok && missingLearnerAppend.status === "rejected", "A canonical event without learner_id should be rejected");
assert(missingLearnerAppend.errors.some(function(item) {{ return item.field === "learner_id"; }}), "Missing learner validation should identify learner_id");
assert(progressStoreStorage.getItem("hearth-progress-events") === missingLearnerBefore, "Validation failure must not mutate storage");
assert(HearthProgressEvents.listRaw(progressStoreStorage).length === 2, "Rejected and duplicate canonical events should not be added");
var journeyStageEvent = JSON.parse(JSON.stringify(completeDoEvent));
journeyStageEvent.id = "evt-do-wrong-stage-vocabulary";
journeyStageEvent.evidence_stage = "attempted";
var journeyStageAppend = HearthProgressEvents.appendCanonical(journeyStageEvent, progressStoreStorage);
assert(!journeyStageAppend.ok && journeyStageAppend.errors.some(function(item) {{ return item.code === "invalid_evidence_stage"; }}), "Canonical writes should reject Journey display-stage labels rather than store them");
assert(progressStoreStorage.getItem("hearth-progress-events") === missingLearnerBefore, "Evidence-stage validation failure must not mutate storage");

var legacyCompatibilityValues = {{
  "hearth-progress-events": "[]",
  "hearth-journey-v2": JSON.stringify({{ activeStudentId: "jen-1" }})
}};
var legacyCompatibilityStorage = {{
  getItem: function(key) {{ return Object.prototype.hasOwnProperty.call(legacyCompatibilityValues, key) ? legacyCompatibilityValues[key] : null; }},
  setItem: function(key, value) {{ legacyCompatibilityValues[key] = String(value); }}
}};
var legacyCompatibilityAppend = HearthProgressEvents.appendResult({{
  id: "legacy-play-1",
  event_type: "play_activity_completed",
  node_id: "play",
  occurred_at: "2026-07-19T11:00:00.000Z",
  data: {{ activity_id: "play-call-response" }}
}}, legacyCompatibilityStorage);
assert(legacyCompatibilityAppend.ok && legacyCompatibilityAppend.source_format === "legacy_v0", "Incomplete existing producers should be routed to the labelled legacy path");
assert(legacyCompatibilityAppend.event.learner_id === "jen-1", "Only the labelled legacy path may retain active-Journey learner inference");
assert(legacyCompatibilityAppend.event.occurred_at === "2026-07-19T11:00:00.000Z", "Approved transitional fields should not be stripped from legacy producer events");

var cappedEvents = [];
for (var cappedIndex = 0; cappedIndex < 1000; cappedIndex += 1) {{
  cappedEvents.push({{
    id: "legacy-cap-" + cappedIndex,
    version: 1,
    simulator_id: "hearth-guitar",
    learner_id: "jen-1",
    event_type: "concept_read",
    node_id: "knowing",
    data: {{ index: cappedIndex }},
    created_at: "2026-07-18T09:00:00.000Z"
  }});
}}
var cappedStorageValue = JSON.stringify(cappedEvents);
var cappedStorage = {{
  getItem: function(key) {{ return key === "hearth-progress-events" ? cappedStorageValue : null; }},
  setItem: function(key, value) {{ if (key === "hearth-progress-events") cappedStorageValue = String(value); }}
}};
var cappedDoEvent = JSON.parse(JSON.stringify(completeDoEvent));
cappedDoEvent.id = "evt-do-cap-1000";
var cappedAppend = HearthProgressEvents.appendCanonical(cappedDoEvent, cappedStorage);
var cappedAfter = HearthProgressEvents.listRaw(cappedStorage);
assert(cappedAppend.ok && cappedAfter.length === 1000, "The shared event store should retain its predictable 1,000-event cap");
assert(cappedAfter[0].id === "legacy-cap-1", "Appending event 1,001 should remove exactly the oldest event");
assert(cappedAfter[999].id === "evt-do-cap-1000", "The newest canonical event should occupy the final capped position");

var migrationStorageValues = {{
  "hearth_users": JSON.stringify([
    {{ name: "private entry profile", level: 1 }}
  ]),
  "hearth_current": JSON.stringify({{ name: "private entry profile", level: 1 }}),
  "hearth-journey-v2": JSON.stringify({{
    activeStudentId: "ayla-1",
    students: [
      {{ id: "ayla-1", name: "Ayla" }},
      {{ id: "jen-1", name: "Jen" }}
    ]
  }}),
  "hearth-journey-active-student": "jen-1",
  "hearth-foundation-progress": JSON.stringify({{ "f-threshold": true }}),
  "hearth-progress-events": JSON.stringify([
    {{ id: "event-1", learner_id: "jen-1", event_type: "drill_feedback_recorded" }},
    {{ id: "event-2", event_type: "practice_session_completed", note: "private reflection text" }}
  ]),
  "hearth-practice-log": JSON.stringify([
    {{ learner_id: "jen-1", duration_minutes: 5 }},
    {{ duration_minutes: 3, reflection: "private practice note" }}
  ]),
  "hearth-create-v1": JSON.stringify({{
    version: 1,
    profiles: {{ "ayla-1": {{ current: {{ id: "scoped-seed" }}, projects: [] }} }}
  }}),
  "hearth-create-current": JSON.stringify({{ id: "legacy-seed" }}),
  "hearth-knowing-progress": "{{invalid-json",
  "hearth-play-session-v1:ghost-learner": JSON.stringify({{ view: "destination" }}),
  "hearth-notebook-general": "private notebook content"
}};
var migrationStorageKeys = Object.keys(migrationStorageValues);
var migrationWriteCalls = 0;
var migrationDeleteCalls = 0;
var migrationStorage = {{
  get length() {{ return migrationStorageKeys.length; }},
  key: function(index) {{ return migrationStorageKeys[index] || null; }},
  getItem: function(key) {{
    return Object.prototype.hasOwnProperty.call(migrationStorageValues, key)
      ? migrationStorageValues[key]
      : null;
  }},
  setItem: function() {{ migrationWriteCalls += 1; throw new Error("preview attempted a write"); }},
  removeItem: function() {{ migrationDeleteCalls += 1; throw new Error("preview attempted a delete"); }},
  clear: function() {{ migrationDeleteCalls += 1; throw new Error("preview attempted a clear"); }}
}};
var migrationStorageBefore = JSON.stringify(migrationStorageValues);
var migrationPreview = HearthLearnerMigrationPreview.preview(migrationStorage, {{
  now: "2026-07-19T12:00:00.000Z"
}});
var migrationStorageAfter = JSON.stringify(migrationStorageValues);
function migrationItem(sourceKey) {{
  return migrationPreview.items.find(function(item) {{ return item.source_key === sourceKey; }});
}}
function hasMigrationConflict(item, code) {{
  return item && item.conflicts.some(function(itemConflict) {{ return itemConflict.code === code; }});
}}

assert(migrationPreview.safety.mode === "read_only" && migrationPreview.safety.can_apply === false, "Migration preview should declare that it cannot apply changes");
assert(migrationPreview.safety.write_operations === 0 && migrationPreview.safety.delete_operations === 0, "Migration preview should report zero mutations");
assert(migrationWriteCalls === 0 && migrationDeleteCalls === 0, "Migration preview should never invoke write/delete storage methods");
assert(migrationStorageAfter === migrationStorageBefore, "Migration preview should leave source storage byte-for-byte unchanged");
assert(HearthLearnerMigrationPreview.inventory().length === 36, "Learner storage inventory should contain all 36 reviewed key patterns");
assert(hasMigrationConflict(migrationItem("hearth_users"), "records_missing_learner_id"), "Entry profiles without stable learner IDs should require reconciliation");
assert(hasMigrationConflict(migrationItem("hearth-foundation-progress"), "ambiguous_global_owner"), "Global Foundation progress should be blocked when two learners exist");
assert(hasMigrationConflict(migrationItem("hearth-progress-events"), "records_missing_learner_id"), "Shared events should report records with missing learner identity");
assert(hasMigrationConflict(migrationItem("hearth-knowing-progress"), "invalid_source_json"), "Invalid legacy JSON should be preserved and blocked");
assert(hasMigrationConflict(migrationItem("hearth-play-session-v1:ghost-learner"), "unknown_learner_id"), "Profile-key storage should report unknown learner IDs");
assert(hasMigrationConflict(migrationItem("hearth-create-current"), "overlapping_destination_sources"), "Legacy Create state should report overlap with the learner-scoped store");
assert(migrationPreview.conflicts.some(function(itemConflict) {{ return itemConflict.code === "active_learner_sources_disagree"; }}), "Preview should report conflicting active learner sources");
assert(migrationItem("hearth-foundation-progress").rollback.preserve_source === true, "Every migration proposal should preserve its source key");
var serializedMigrationPreview = JSON.stringify(migrationPreview);
assert(serializedMigrationPreview.indexOf("private reflection text") === -1, "Preview report should not expose event note contents");
assert(serializedMigrationPreview.indexOf("private practice note") === -1, "Preview report should not expose Practice note contents");
assert(serializedMigrationPreview.indexOf("private notebook content") === -1, "Preview report should not expose notebook contents");
assert(serializedMigrationPreview.indexOf("private entry profile") === -1, "Preview report should not expose entry profile names");

assert(JOURNEY_CAPABILITY_FAMILIES.length === 7, "Journey should expose seven learner-facing capability families");
assert(JOURNEY_LEVEL_CAPABILITIES.L1.length === 17, "Level 1 should expose the canonical capability set");
assert(JOURNEY_EVIDENCE_STAGES.indexOf("applied_musically") !== -1, "Journey should expose musical application evidence");
var journeyCapabilityIds = {{}};
JOURNEY_LEVEL_CAPABILITIES.L1.forEach(function rememberCapability(capability) {{
  assert(!journeyCapabilityIds[capability.id], "Journey capability ids should be unique: " + capability.id);
  assert(JOURNEY_EVIDENCE_STAGES.indexOf(capability.minimumEvidence) !== -1, "Journey capability should use a known evidence stage: " + capability.id);
  journeyCapabilityIds[capability.id] = true;
}});
var currentLevelOneActivities = JOURNEY_LEVEL_ACTIVITY_CAPABILITY_MAP.L1;
assert(Object.keys(currentLevelOneActivities).length === 9, "Entry Check and all eight Level 1 lessons should have capability mappings");
assert(currentLevelOneActivities["l1-entry-preflight"].countsTowardLevel === false, "Level 1 entry check should be classified as preflight");
assert(currentLevelOneActivities["l1-song-path"].countsTowardLevel === true, "Level 1 should include a counted song pathway");
assert(Object.keys(currentLevelOneActivities).filter(function(activityId) {{ return currentLevelOneActivities[activityId].countsTowardLevel; }}).length === 8, "Level 1 should contain exactly eight counted lessons");
Object.keys(currentLevelOneActivities).forEach(function checkJourneyActivity(activityId) {{
  var activity = currentLevelOneActivities[activityId];
  assert(Object.keys(activity.blocks).length === 6, "Each current Journey activity should map its six authored blocks: " + activityId);
  activity.capabilityIds.forEach(function checkActivityCapability(capabilityId) {{
    assert(journeyCapabilityIds[capabilityId], "Journey activity references an unknown capability: " + capabilityId);
  }});
  Object.keys(activity.blocks).forEach(function checkJourneyBlock(blockId) {{
    activity.blocks[blockId].forEach(function checkBlockCapability(capabilityId) {{
      assert(journeyCapabilityIds[capabilityId], "Journey block references an unknown capability: " + capabilityId);
    }});
  }});
}});

assert(JOURNEY_AUTHORED_LESSONS.L1.length === 9, "Level 1 should author one Entry Check plus eight lessons");
assert(JOURNEY_AUTHORED_LESSONS.L1[0].countsTowardLevel === false, "The Entry Check must not count as Lesson 1");
assert(JOURNEY_AUTHORED_LESSONS.L1.filter(function(lesson) {{ return lesson.countsTowardLevel !== false; }}).length === 8, "Only eight Level 1 lessons should count");
assert(JOURNEY_AUTHORED_LESSONS.L1[7].title.indexOf("Carry It Into a Song") !== -1, "Level 1 should contain the protected song pathway");
assert(JOURNEY_AUTHORED_LESSONS.L1[8].title.indexOf("Lesson 8") === 0, "The final integration should remain learner-facing Lesson 8");

var journeyProgressEvents = [
  {{ learner_id:"jen", journey_level_id:"L1", node_id:"doing", capability_ids:["L1-MAP-01"], evidence_stage:"demonstration", id:"jen-map" }},
  {{ learner_id:"ayla", journey_level_id:"L1", node_id:"doing", capability_ids:["L1-MAP-01"], evidence_stage:"demonstration", id:"ayla-map" }},
  {{ learner_id:"jen", journey_level_id:"L1", node_id:"journey", capability_ids:["L1-MAP-02"], evidence_stage:"consolidation", id:"wrong-authority" }}
];
var journeyProgressSummary = HearthJourneyProgress.summarize({{
  events: journeyProgressEvents,
  learnerId:"jen",
  levelId:"L1",
  capabilities:JOURNEY_LEVEL_CAPABILITIES.L1,
  evidenceStages:JOURNEY_EVIDENCE_STAGES,
  eventContract:HearthProgressEventContract
}});
assert(journeyProgressSummary.capabilityEvidence["L1-MAP-01"].met === true, "Authorized Do evidence should satisfy the mapped Level 1 capability");
assert(journeyProgressSummary.capabilityEvidence["L1-MAP-02"].stage === "not_encountered", "A node without authority must not credit a capability");
assert(journeyProgressSummary.complete === false, "One drill event must never complete Level 1");
assert(journeyProgressSummary.metRequired === 1, "Another learner's evidence must not leak into Jen's progress");
var connectedNodeProgress = HearthJourneyProgress.summarize({{
  events: [
    {{ learner_id:"jen", journey_level_id:"L1", node_id:"practice", data:{{ capability_ids:["L1-PREP-01","L1-PRACTICE-01"], evidence_stage:"demonstration" }}, id:"practice-day-3" }},
    {{ learner_id:"jen", journey_level_id:"L1", node_id:"create", data:{{ capability_ids:["L1-CREATE-01"], evidence_stage:"attempt" }}, id:"create-variation" }},
    {{ learner_id:"jen", journey_level_id:"L1", node_id:"mastery", data:{{ capability_ids:["L1-STYLE-01"], evidence_stage:"contact" }}, id:"mastery-performance" }}
  ],
  learnerId:"jen",
  levelId:"L1",
  capabilities:JOURNEY_LEVEL_CAPABILITIES.L1,
  evidenceStages:JOURNEY_EVIDENCE_STAGES,
  eventContract:HearthProgressEventContract
}});
assert(connectedNodeProgress.capabilityEvidence["L1-PRACTICE-01"].met === true, "Three-day Practice evidence should satisfy repeat-over-time");
assert(connectedNodeProgress.capabilityEvidence["L1-CREATE-01"].met === true, "A saved Create variation should satisfy the first creative choice");
assert(connectedNodeProgress.capabilityEvidence["L1-STYLE-01"].met === true, "A witnessed performance encounter should satisfy first style contact");

var handoffMemoryValues = {{}};
var handoffMemoryStorage = {{
  getItem: function(key) {{ return Object.prototype.hasOwnProperty.call(handoffMemoryValues, key) ? handoffMemoryValues[key] : null; }},
  setItem: function(key, value) {{ handoffMemoryValues[key] = String(value); }},
  removeItem: function(key) {{ delete handoffMemoryValues[key]; }}
}};
var handoffStore = HearthCrossNodeHandoffStore.createStore({{ storage:handoffMemoryStorage }});
var testHandoff = {{
  id:"handoff-test-1", version:1, learner_id:"jen", source_node_id:"journey", destination_node_id:"doing",
  return_route:{{ node_id:"journey", view_id:"companion", params:{{ learner_id:"jen" }} }}
}};
assert(handoffStore.set(testHandoff) === testHandoff, "A valid cross-node handoff should be stored");
assert(handoffStore.current({{ learnerId:"jen", destinationNodeId:"doing" }}).id === "handoff-test-1", "The intended learner and node should receive the handoff");
assert(handoffStore.current({{ learnerId:"ayla", destinationNodeId:"doing" }}) === null, "A handoff must not leak to another learner");
assert(handoffStore.current({{ learnerId:"jen", destinationNodeId:"practice" }}) === null, "A handoff must not leak to another destination node");
assert(handoffStore.clear("another-handoff") === false, "A mismatched clear request must preserve the active handoff");
assert(handoffStore.clear("handoff-test-1") === true && handoffStore.read() === null, "Returning should clear the matching handoff");

assert(
  JSON.stringify(HearthFoundationRouteManifest.routes) === JSON.stringify(foundationManifest.routes),
  "runtime Foundation manifest should match core JSON manifest"
);
var musicRoute = HearthFoundationAdapter.findRouteByTopic(HearthFoundationRouteManifest, "f-music-language");
assert(musicRoute.lesson_id === "f-learning-a-language", "Foundation adapter should map topic to clean lesson id");

var normalizedSeedLesson = HearthFoundationSeedLoader.normalizeSeedForTeachingEngine(seed);
assert(normalizedSeedLesson.id === "f-conversations", "seed loader should keep lesson id");
assert(normalizedSeedLesson.completeText.indexOf("clean notes") !== -1, "seed loader should map complete_text");
assert(normalizedSeedLesson.steps[1].charSize === "big", "seed loader should map char_size");
assert(normalizedSeedLesson.steps[2].char.indexOf("Thinking") !== -1, "seed loader should map char_key");
assert(normalizedSeedLesson.steps[2].choices[0].response.char.indexOf("Celebratory") !== -1, "seed loader should map response char_key");
assert(
  HearthFoundationLessonLauncher.FALLBACK_LESSON_ID_BY_TOPIC_ID["f-first-conversation"] === "f-conversations",
  "Foundation launcher should expose clean fallback lesson ids"
);
var fakeShellTarget = {{
  innerHTML: "",
  querySelector: function(selector) {{
    return selector === "#teach-container" && this.innerHTML.indexOf("teach-container") !== -1
      ? {{ id: "teach-container" }}
      : null;
  }}
}};
var fakeTeachContainer = HearthFoundationLessonShell.renderFoundationLessonShell(fakeShellTarget, {{
  label: "TEST LABEL"
}});
assert(fakeShellTarget.innerHTML.indexOf("TEST LABEL") !== -1, "Foundation shell should render label");
assert(fakeTeachContainer.id === "teach-container", "Foundation shell should return teach container");
assert(HearthFoundationUiUtils.escapeHtml("<x>") === "&lt;x&gt;", "Foundation UI utils should escape HTML");
assert(HearthFoundationUiUtils.colorForIndex(0) === "#e74c3c", "Foundation UI utils should return stable colors");
var rainbowHtml = HearthRainbowBlocksViewer.renderRainbowBlocks([
  {{ id: "one", title: "One", done: true }},
  {{ id: "two", title: "Two", locked: true }}
], {{
  title: "Rainbow Test",
  sources: ["Source A"],
  clickFn: "openRainbow"
}});
assert(rainbowHtml.indexOf("Rainbow Test") !== -1, "rainbow blocks viewer should render title");
assert(rainbowHtml.indexOf("1/2 blocks") !== -1, "rainbow blocks viewer should count completed blocks");
assert(typeof rainbowBlocks === "function", "rainbow blocks viewer should keep legacy global helper");
assert(HearthDoingConfig.levelForDrill({{ id: "alt-1", difficulty: 8 }}) === 1, "Doing config should map known drill levels");
assert(HearthDoingConfig.levelForDrill({{ id: "unknown", difficulty: 9 }}) === 8, "Doing config should clamp fallback drill levels");
assert(HearthDoingConfig.coachForCategory("picking").whatDo.indexOf("pick") !== -1, "Doing config should return category coaching");
assert(HearthDoingConfig.coachForCategory("missing").pass.indexOf("dead notes") !== -1, "Doing config should fall back to fretting coaching");
assert(HearthDoingConfig.guitarZones.length === 4, "Doing config should expose guitar map zones");
assert(HearthDoingConfig.focusCats.length === 4, "Doing config should expose focus categories");
assert(HearthDoingConfig.roomDrillPlans["left-hand"][1].indexOf("chrom-1") !== -1, "Doing config should expose curated room drills");
var doingFeedbackEvent = HearthDoingProgressBridge.feedbackEvent({{
  category: {{ id: "scales", title: "Scales" }},
  drill: {{
    id: "pent-1",
    title: "A Minor Pentatonic Box 1",
    duration: "5 min",
    easier: "Use only the lowest two strings.",
    passCondition: "Play the shape and land on three A roots.",
    capabilityIds: ["L1-MAP-01", "L1-READ-01"]
  }},
  learnerId: "jen-1",
  state: "clean",
  level: 1,
  room: "left-hand",
  sessionId: "practice-session-1",
  occurredAt: "2026-07-19T08:00:00.000Z",
  recordedAt: "2026-07-19T08:00:02.000Z"
}});
assert(doingFeedbackEvent.event_type === "drill_feedback_recorded", "Doing feedback should use the shared event vocabulary");
assert(doingFeedbackEvent.rating === 3 && doingFeedbackEvent.journey_level_id === "L1", "Doing feedback should preserve skill strength and level");
assert(doingFeedbackEvent.learner_id === "jen-1", "Doing feedback should explicitly preserve the active learner");
assert(doingFeedbackEvent.data.journey_categories.indexOf("Scales") !== -1, "Doing feedback should map into Journey categories");
assert(doingFeedbackEvent.activity_id === "pent-1" && doingFeedbackEvent.capability_ids.indexOf("L1-MAP-01") !== -1, "Doing feedback should carry canonical activity and capability IDs at the top level");
assert(doingFeedbackEvent.data.activity_id === doingFeedbackEvent.activity_id && doingFeedbackEvent.data.capability_ids[0] === doingFeedbackEvent.capability_ids[0], "Doing feedback should mirror new envelope fields for the legacy event store");
[
  "destination_node_id", "activity_id", "capability_ids", "attempt_id", "session_id",
  "evidence_stage", "evidence_source", "occurred_at", "recorded_at", "return_route",
  "fallback_instruction"
].forEach(function verifyDoingCompatibilityMirror(field) {{
  assert(JSON.stringify(doingFeedbackEvent.data[field]) === JSON.stringify(doingFeedbackEvent[field]), "Doing feedback should mirror canonical field under data: " + field);
}});
assert(!Object.prototype.hasOwnProperty.call(doingFeedbackEvent, "source_node_id") && !Object.prototype.hasOwnProperty.call(doingFeedbackEvent.data, "destination_node_ids") && !Object.prototype.hasOwnProperty.call(doingFeedbackEvent.data, "practice_session_id"), "Doing feedback should not emit retired private contract names");
assert(doingFeedbackEvent.destination_node_id === null && doingFeedbackEvent.data.destination_node_id === null, "Evidence events should remain broadcasts rather than multi-destination commands");
assert(doingFeedbackEvent.attempt_id && doingFeedbackEvent.session_id === "practice-session-1", "Doing feedback should distinguish one attempt from its enclosing Practice session");
assert(doingFeedbackEvent.evidence_stage === "demonstration" && doingFeedbackEvent.evidence_source === "self_report", "Doing feedback should use the shared evidence vocabulary");
assert(doingFeedbackEvent.occurred_at === "2026-07-19T08:00:00.000Z" && doingFeedbackEvent.recorded_at === "2026-07-19T08:00:02.000Z" && doingFeedbackEvent.created_at === doingFeedbackEvent.occurred_at, "Doing feedback should preserve canonical and legacy timestamps");
assert(doingFeedbackEvent.return_route.view_id === "room-concept" && doingFeedbackEvent.return_route.params.drill_id === "pent-1", "Doing feedback should keep a canonical local return route");
assert(doingFeedbackEvent.data.task.id === "pent-1" && doingFeedbackEvent.data.task.parameters.drill_id === "pent-1", "Legacy event data should mirror the exact structured task");
assert(doingFeedbackEvent.data.pass_condition.description.indexOf("three A roots") !== -1 && doingFeedbackEvent.data.easier_step.instruction.indexOf("lowest two strings") !== -1, "Legacy event data should mirror structured handoff recovery fields");
var doingEvidenceEvents = [Object.assign({{ created_at: new Date().toISOString() }}, doingFeedbackEvent)];
var doingScaleEvidence = HearthDoingProgressBridge.summaryForJourneyCategory(doingEvidenceEvents, "jen-1", "Scales", 1);
assert(doingScaleEvidence.count === 1 && doingScaleEvidence.strongestLabel === "Clean once", "Journey should summarize learner-specific Do evidence");
assert(HearthDoingProgressBridge.practiceRecommendations(doingEvidenceEvents, "jen-1", 2)[0].indexOf("reliable") !== -1, "Practice should receive an unfinished Do recommendation");
var doingOpenedEvent = HearthDoingProgressBridge.drillOpenedEvent({{
  category: {{ id: "scales", title: "Scales" }},
  drill: {{ id: "pent-1", title: "A Minor Pentatonic Box 1" }},
  learnerId: "jen-1",
  level: 1,
  room: "left-hand"
}});
assert(doingOpenedEvent.event_type === "drill_opened" && doingOpenedEvent.data.state === "seen", "Opening a Do drill should create learner evidence without claiming practice");
assert(doingOpenedEvent.attempt_id === null && doingOpenedEvent.evidence_stage === "contact" && doingOpenedEvent.evidence_source === "direct_interaction", "Opening a Do drill should use the shared contact evidence contract");
assert(HearthDoingProgressBridge.feedbackEvent({{ category: {{ id: "scales" }}, drill: {{ id: "pent-1" }}, state: "clean" }}) === null, "Do should not emit learner-owned evidence without an explicit learner ID");
var separatedDoingProgress = HearthDoingProgressBridge.progressForLearner([
  Object.assign({{ created_at: "2026-07-19T08:00:00.000Z" }}, doingOpenedEvent),
  Object.assign({{ created_at: "2026-07-19T08:01:00.000Z" }}, doingFeedbackEvent),
  {{
    event_type: "drill_feedback_recorded",
    learner_id: "ayla-1",
    drill_id: "pent-1",
    rating: 5,
    data: {{ state: "mastered" }},
    created_at: "2026-07-19T08:02:00.000Z"
  }}
], "jen-1");
assert(separatedDoingProgress["pent-1"] === "clean", "Do rings should use only the selected learner's latest evidence");

var singleMasteredEvent = HearthDoingProgressBridge.feedbackEvent({{
  category: {{ id: "scales", title: "Scales" }},
  drill: {{ id: "pent-1", title: "A Minor Pentatonic Box 1", easier: "Use two strings." }},
  learnerId: "jen-1",
  state: "mastered",
  level: 1,
  room: "left-hand"
}});
singleMasteredEvent.created_at = "2026-07-19T08:00:00.000Z";
var singleMasteryEvidence = HearthDoingProgressBridge.evidenceForDrill([singleMasteredEvent], "jen-1", "pent-1");
assert(singleMasteryEvidence.projectedState === "clean", "One self-rated Mastered click must produce only one clean evidence pass");
assert(HearthDoingProgressBridge.summaryForJourneyCategory([singleMasteredEvent], "jen-1", "Scales", 1).strongestState === "clean", "Journey must receive trusted Do evidence rather than the raw self-rating");

var secondCleanEvent = Object.assign({{}}, doingFeedbackEvent, {{ created_at: "2026-07-19T08:01:00.000Z" }});
var sameDayEvidence = HearthDoingProgressBridge.evidenceForDrill([singleMasteredEvent, secondCleanEvent], "jen-1", "pent-1");
assert(sameDayEvidence.projectedState === "comfortable" && sameDayEvidence.cleanPasses === 2, "Two separate clean attempts should build comfort");
var nextDayMasteredEvent = Object.assign({{}}, singleMasteredEvent, {{
  id: "doing-event-next-day",
  attempt_id: "doing-attempt-next-day",
  created_at: "2026-07-20T08:00:00.000Z",
  data: Object.assign({{}}, singleMasteredEvent.data, {{ attempt_id: "doing-attempt-next-day" }})
}});
var trustedMasteryEvidence = HearthDoingProgressBridge.evidenceForDrill([singleMasteredEvent, secondCleanEvent, nextDayMasteredEvent], "jen-1", "pent-1");
assert(trustedMasteryEvidence.projectedState === "mastered" && trustedMasteryEvidence.distinctDays === 2, "Mastery should require repeated clean evidence across two days");
var quickDuplicateEvidence = HearthDoingProgressBridge.evidenceForDrill([
  singleMasteredEvent,
  Object.assign({{}}, secondCleanEvent, {{ created_at: "2026-07-19T08:00:10.000Z" }})
], "jen-1", "pent-1");
assert(quickDuplicateEvidence.cleanPasses === 1, "Immediate duplicate clicks should not count as separate clean attempts");

var repeatedFeedbackEvents = [];
var repeatedFeedbackStore = {{ append: function(event) {{ repeatedFeedbackEvents.push(event); return event; }} }};
HearthDoingProgressBridge.recordFeedback({{
  category: {{ id: "scales", title: "Scales" }},
  drill: {{ id: "pent-1", title: "A Minor Pentatonic Box 1" }},
  learnerId: "jen-1",
  state: "clean",
  previousState: "clean",
  occurredAt: "2026-07-20T10:00:00.000Z",
  eventStore: repeatedFeedbackStore
}});
HearthDoingProgressBridge.recordFeedback({{
  category: {{ id: "scales", title: "Scales" }},
  drill: {{ id: "pent-1", title: "A Minor Pentatonic Box 1" }},
  learnerId: "jen-1",
  state: "clean",
  previousState: "clean",
  occurredAt: "2026-07-20T10:01:00.000Z",
  eventStore: repeatedFeedbackStore
}});
assert(repeatedFeedbackEvents.length === 2 && repeatedFeedbackEvents[0].attempt_id !== repeatedFeedbackEvents[1].attempt_id, "Repeating the same rating after a deliberate fresh attempt should add distinct evidence");

var tooHardEvent = HearthDoingProgressBridge.feedbackEvent({{
  category: {{ id: "fretting", title: "Fretting" }},
  drill: {{ id: "chrom-1", title: "1-2-3-4 Clean Contact", easier: "Use only fingers 1 and 2 on one string." }},
  learnerId: "jen-1",
  state: "seen",
  level: 1,
  room: "left-hand"
}});
tooHardEvent.created_at = "2026-07-20T09:00:00.000Z";
assert(tooHardEvent.data.recommended_difficulty === "easier", "Too hard feedback should request an easier gradient");
assert(tooHardEvent.evidence_stage === "attempt" && tooHardEvent.evidence_source === "self_report", "Too hard feedback should remain attempt evidence rather than being reduced to opening contact");
assert(HearthDoingProgressBridge.practiceRecommendations([tooHardEvent], "jen-1", 1)[0].indexOf("Use only fingers 1 and 2") !== -1, "Practice should receive the drill's exact easier next step");
var tooHardEvidence = HearthDoingProgressBridge.evidenceForDrill([tooHardEvent], "jen-1", "chrom-1");
var tooHardEvidenceHtml = HearthDoingTeachingViewer.renderEvidence({{
  evidence: tooHardEvidence,
  easier: tooHardEvent.data.easier_step,
  ui: HearthDoingUiUtils
}});
assert(tooHardEvidenceHtml.indexOf("Easier step saved for Practice") !== -1 && tooHardEvidenceHtml.indexOf("Use only fingers 1 and 2") !== -1, "The drill scene should explain the saved easier next step");

var doingStorageValues = {{
  "hearth-journey-v2": JSON.stringify({{ activeStudentId: "ayla-1" }}),
  "hearth-doing-progress": JSON.stringify({{ "pent-1": "comfortable" }})
}};
var doingMemoryStorage = {{
  getItem: function(key) {{ return Object.prototype.hasOwnProperty.call(doingStorageValues, key) ? doingStorageValues[key] : null; }},
  setItem: function(key, value) {{ doingStorageValues[key] = String(value); }}
}};
var migratedDoingEvents = [];
var doingMemoryEventStore = {{
  list: function() {{ return migratedDoingEvents.slice(); }},
  append: function(event) {{
    var saved = Object.assign({{ id: "doing-event-" + (migratedDoingEvents.length + 1), created_at: new Date().toISOString() }}, event);
    migratedDoingEvents.push(saved);
    return saved;
  }}
}};
var migrationDoing = {{
  categories: [{{
    id: "scales",
    title: "Scales",
    drills: [{{ id: "pent-1", title: "A Minor Pentatonic Box 1", duration: "5 min" }}]
  }}]
}};
var doingMigration = HearthDoingProgressBridge.migrateLegacyProgress({{
  doing: migrationDoing,
  eventStore: doingMemoryEventStore,
  learnerId: "ayla-1",
  levelForDrill: function() {{ return 1; }},
  storage: doingMemoryStorage
}});
assert(doingMigration.migrated && doingMigration.count === 1, "Legacy Do progress should migrate once without being deleted");
assert(migratedDoingEvents[0].evidence_source === "migrated_legacy", "Migrated Do progress should declare its weaker legacy evidence source");
assert(HearthDoingProgressBridge.progressForLearner(migratedDoingEvents, "ayla-1")["pent-1"] === "comfortable", "Migrated Do progress should appear for its assigned learner");
assert(!HearthDoingProgressBridge.progressForLearner(migratedDoingEvents, "jen-1")["pent-1"], "Migrated Do progress should not leak into another learner's rings");
var jenMigrationAttempt = HearthDoingProgressBridge.migrateLegacyProgress({{
  doing: migrationDoing,
  eventStore: doingMemoryEventStore,
  learnerId: "jen-1",
  levelForDrill: function() {{ return 1; }},
  storage: doingMemoryStorage
}});
assert(jenMigrationAttempt.reason === "assigned_elsewhere" && migratedDoingEvents.length === 1, "The same legacy Do progress should never be copied into a second profile");
assert(doingMemoryStorage.getItem("hearth-doing-progress") === JSON.stringify({{ "pent-1": "comfortable" }}), "Do migration should preserve the original legacy data for recovery");
var curatedDoing = {{ categories: [{{ id: "picking", title: "Picking", drills: [{{ id: "alt-1", title: "Old title", style: "rock", source: "Test", duration: "5 min", body: "<p>Test</p>" }}, {{ id: "alt-2", title: "Draft", style: "rock", source: "Test", duration: "5 min", body: "<p>Test</p>" }}] }}] }};
HearthDoingDrillCatalog.apply(curatedDoing);
assert(curatedDoing.catalog.approvedCount === 14, "Doing catalogue should expose the reviewed drill count");
assert(HearthDoingDrillCatalog.findDrill(curatedDoing, "alt-1").title.indexOf("One String") !== -1, "Doing catalogue should apply reviewed teaching data");
assert(HearthDoingDrillCatalog.findDrill(curatedDoing, "alt-2").reviewStatus === "draft", "Doing catalogue should preserve unreviewed drills as drafts");
assert(HearthDoingDrillCatalog.findDrill(curatedDoing, "chord-change-am-c").reviewStatus === "approved", "Doing catalogue should add reviewed chord drills");
assert(HearthDoingDrillCatalog.reviewed["pent-1"].capabilityIds.indexOf("L1-MAP-01") !== -1, "Reviewed drills should carry Journey capability mappings");
Object.keys(HearthDoingDrillCatalog.reviewed).forEach(function verifyDoingCapabilityAuthority(drillId) {{
  var drill = HearthDoingDrillCatalog.reviewed[drillId];
  (drill.capabilityIds || []).forEach(function verifyCreditBearingCapability(capabilityId) {{
    var capability = JOURNEY_LEVEL_CAPABILITIES.L1.find(function findCapability(item) {{ return item.id === capabilityId; }});
    assert(capability && capability.nodeIds.indexOf("doing") !== -1, "Do evidence may only claim a capability authorized for doing: " + drillId + " / " + capabilityId);
  }});
  (drill.relatedCapabilityIds || []).forEach(function verifyRelatedCapability(capabilityId) {{
    assert(journeyCapabilityIds[capabilityId], "Do related capability must still use a stable Journey ID: " + drillId + " / " + capabilityId);
  }});
}});
assert(HearthDoingDrillCatalog.reviewed["chrom-1"].capabilityIds.length === 0 && HearthDoingDrillCatalog.reviewed["chrom-1"].relatedCapabilityIds.indexOf("L1-PRACTICE-01") !== -1, "Do should keep non-credit Practice outcomes separate from evidence capability IDs");
assert(HearthDoingDrillCatalog.reviewed["pent-roots-time"].capabilityIds.indexOf("L1-PLAY-01") === -1 && HearthDoingDrillCatalog.reviewed["pent-roots-time"].relatedCapabilityIds.indexOf("L1-PLAY-01") !== -1, "Do should not claim Play-owned musical exchange evidence");
var tabPilot = HearthDoingDrillCatalog.reviewed["chrom-1"];
assert(tabPilot.visualType === "interactive-tab", "1-2-3-4 should use the interactive tab renderer");
var tabPilotHtml = HearthDoingTeachingViewer.renderVisual(tabPilot, HearthDoingUiUtils);
assert(tabPilotHtml.indexOf("doing-interactive-tab") !== -1, "Doing teaching viewer should render the interactive tab pilot");
assert(tabPilotHtml.indexOf("Finger") !== -1 && tabPilotHtml.indexOf("fret") !== -1, "Interactive tab should expose finger and fret guidance");
var strumPilot = HearthDoingDrillCatalog.reviewed["strum-1"];
assert(strumPilot.visualType === "interactive-strum-grid", "Strum Engine should use the interactive strum renderer");
var strumPilotHtml = HearthDoingTeachingViewer.renderVisual(strumPilot, HearthDoingUiUtils);
assert(strumPilotHtml.indexOf("doing-interactive-strum") !== -1, "Doing teaching viewer should render the interactive strum pilot");
assert(strumPilotHtml.indexOf("Silent return") !== -1, "Interactive strum guide should explain unplayed return strokes");
var chordPilot = HearthDoingDrillCatalog.reviewed["chord-clean-am"];
assert(chordPilot.visualType === "interactive-chord-check", "Clean Am should use the interactive chord checker");
var chordPilotHtml = HearthDoingTeachingViewer.renderVisual(chordPilot, HearthDoingUiUtils);
assert(chordPilotHtml.indexOf("doing-interactive-chord") !== -1, "Doing teaching viewer should render the interactive chord checker");
assert(chordPilotHtml.indexOf("Numbers are fingers") !== -1, "Chord checker should explain finger numbers");
var scalePilot = HearthDoingDrillCatalog.reviewed["pent-1"];
assert(scalePilot.visualType === "interactive-fretboard", "A minor Box 1 should use the interactive fretboard");
var scalePilotHtml = HearthDoingTeachingViewer.renderVisual(scalePilot, HearthDoingUiUtils);
assert(scalePilotHtml.indexOf("doing-interactive-fretboard") !== -1, "Doing teaching viewer should render the interactive fretboard");
assert(scalePilotHtml.indexOf("A roots") !== -1 && scalePilotHtml.indexOf("Full shape") !== -1, "Interactive fretboard should switch between shape and root views");
var rootsPilot = HearthDoingDrillCatalog.findDrill(curatedDoing, "pent-roots-time");
assert(rootsPilot.visualType === "interactive-fretboard" && rootsPilot.fretboardMode === "roots", "A roots drill should open in root-note mode");
var rootsPilotScene = HearthDoingTeachingViewer.renderScene({{
  cat: {{ id: "coordination", title: "Coordination" }},
  drill: rootsPilot,
  config: HearthDoingConfig,
  ui: HearthDoingUiUtils
}});
assert(rootsPilotScene.indexOf("Make it musical") !== -1, "A Root Notes in Time should offer an optional Create handoff");
assert(rootsPilotScene.indexOf("_openDoingCreate") !== -1 && rootsPilotScene.indexOf("pent-roots-time") !== -1, "Doing Create handoff should preserve its drill source");
assert(HearthLevelOneSongThread.id === "level-1-a-minor-homecoming", "Level 1 should expose one stable original song-thread ID");
assert(HearthLevelOneSongThread.progression.length === 8 && HearthLevelOneSongThread.rights.indexOf("no commercial song") !== -1, "Level 1 song thread should be an eight-bar rights-safe original");
assert(HearthLevelOneSongThread.practicePlan.sessions.length === 3, "Level 1 song thread should define three connected Practice returns");
assert(HearthLevelOneSongThread.playActivity.activityId === "play-a-minor-homecoming-role-exchange", "Level 1 song thread should define one stable Play activity");
assert(MASTERY_EXEMPLARS[0].sourceType === "live performance", "Level 1 Mastery should use a genuine performance exemplar");
assert(MASTERY_EXEMPLARS[0].artist === "B.B. King" && MASTERY_EXEMPLARS[0].mediaFallback.indexOf("A Minor Homecoming") !== -1, "Mastery should connect B.B. King's phrasing to the internal song fallback");
var songPilot = HearthDoingDrillCatalog.findDrill(curatedDoing, "song-thread-am");
assert(songPilot && songPilot.visualType === "interactive-song-thread", "Doing catalogue should include the Level 1 song lab");
assert(HearthDoingConfig.roomDrillPlans["both-hands"][1].indexOf("song-thread-am") !== -1, "Both Hands room should expose the Level 1 song lab");
var songPilotHtml = HearthDoingTeachingViewer.renderVisual(songPilot, HearthDoingUiUtils);
assert(songPilotHtml.indexOf("doing-song-thread") !== -1 && songPilotHtml.indexOf("Listen before playing") !== -1, "Song lab should begin with a listening comparison");
assert(songPilotHtml.indexOf("Eight-bar road") !== -1 && songPilotHtml.indexOf("short TAB answer") !== -1, "Song lab should show the song road and a TAB fragment");
assert(JOURNEY_STUDENT_COMPANIONS.jen.lessonButtons[2].doingHandoff.drill_id === "strum-1", "Jen's right-hand step should open the reviewed strum drill");
assert(JOURNEY_STUDENT_COMPANIONS.jen.lessonButtons[3].studyHandoff.activity_id === "study-a-minor-pentatonic-map-clue", "Jen's map clue should open the exact Study inquiry");
assert(JOURNEY_STUDENT_COMPANIONS.jen.lessonButtons[3].studyHandoff.capability_ids.indexOf("L1-KNOW-01") >= 0, "Jen's Study handoff should preserve the knowledge capability context");
assert(JOURNEY_STUDENT_COMPANIONS.jen.lessonButtons[5].doingHandoff.drill_id === "song-thread-am", "Jen's conversation step should open the song lab");
assert(JOURNEY_STUDENT_COMPANIONS.jen.lessonButtons[5].playHandoff.activity_id === "play-a-minor-homecoming-role-exchange", "Jen's conversation step should open the matching Play exchange");
var doingEvidenceHtml = HearthDoingTeachingViewer.renderEvidence({{
  evidence: {{ projectedState: "mastered", message: "Three clean attempts across two days support mastery." }},
  ui: HearthDoingUiUtils
}});
assert(doingEvidenceHtml.indexOf('data-evidence-state="mastered"') !== -1 && doingEvidenceHtml.indexOf("Mastery supported") !== -1, "Doing teaching viewer should explain projected mastery evidence");
var doingEasierEvidenceHtml = HearthDoingTeachingViewer.renderEvidence({{
  evidence: {{ projectedState: "seen", needsEasierStep: true, message: "Use the easier step." }},
  easier: "Use two strings.",
  ui: HearthDoingUiUtils
}});
assert(doingEasierEvidenceHtml.indexOf("needs-easier") !== -1 && doingEasierEvidenceHtml.indexOf("Use two strings") !== -1, "Doing teaching viewer should surface the reviewed easier step");
assert(HearthDoingUiUtils.escapeHtml("<pick>") === "&lt;pick&gt;", "Doing UI utils should escape HTML");
assert(HearthDoingUiUtils.drillShort({{ title: "Alternate Picking" }}) === "AP", "Doing UI utils should build drill initials");
var practiceEntrySnapshot = HearthPracticeEntryModel.buildSnapshot({{
  journeyState: {{ activeStudentId: "jen-1", students: [{{ id: "jen-1", name: "Jen", levels: {{}} }}] }},
  companions: {{ jen: {{ commitment: {{ title: "20-minute daily practice thread", today: "A roots and one musical jam." }}, practice: ["A minor pentatonic", "Right-hand pattern"] }} }},
  events: [{{ event_type: "practice_session_completed", learner_id: "jen-1", duration_minutes: 8, created_at: new Date().toISOString(), data: {{ focus: "A roots" }} }}],
  doingProgressBridge: HearthDoingProgressBridge,
  candleState: {{ running: false }}
}});
assert(practiceEntrySnapshot.learner.name === "Jen", "Practice entry should use the active learner");
assert(practiceEntrySnapshot.commitment.targetMinutes === 20, "Practice entry should derive the commitment length");
assert(practiceEntrySnapshot.commitment.todayMinutes === 8, "Practice entry should total today's learner-specific minutes");
var reflectedPracticeSnapshot = HearthPracticeEntryModel.buildSnapshot({{
  journeyState: {{ activeStudentId: "jen-1", students: [{{ id: "jen-1", name: "Jen", levels: {{}} }}] }},
  companions: {{ jen: {{ commitment: {{ today: "Original plan" }}, practice: ["A minor pentatonic"] }} }},
  events: [{{ event_type: "practice_session_completed", learner_id: "jen-1", created_at: new Date().toISOString(), data: {{ repeat_next: "Return to the clean chord change" }} }}]
}});
assert(reflectedPracticeSnapshot.commitment.today === "Return to the clean chord change", "Practice reflection should become the next recommended focus");
var playFedPracticeSnapshot = HearthPracticeEntryModel.buildSnapshot({{
  journeyState: {{ activeStudentId: "jen-1", students: [{{ id: "jen-1", name: "Jen", levels: {{}} }}] }},
  companions: {{ jen: {{ commitment: {{ today: "Original plan" }}, practice: ["A minor pentatonic"] }} }},
  events: [{{
    event_type: "play_activity_completed",
    node_id: "play",
    learner_id: "jen-1",
    created_at: new Date().toISOString(),
    data: {{ repeat_focus: "Return to A after each short phrase, then leave space." }}
  }}]
}});
assert(playFedPracticeSnapshot.commitment.today.indexOf("Return to A") !== -1, "A Play reflection should feed the learner's next Practice focus");
var practiceEntryHtml = HearthPracticeEntryViewer.render(practiceEntrySnapshot, "planned");
assert(practiceEntryHtml.indexOf('data-practice-mode="planned"') !== -1, "Practice entry should render the planned-session hotspot");
assert(practiceEntryHtml.indexOf("streak") === -1, "Practice entry should not use guilt-based streak language");
var freePracticeContextHtml = HearthPracticeEntryViewer.renderContext(practiceEntrySnapshot, "free", {{ freeDraft: {{ minutes: 10, focus: "Groove" }} }});
assert(freePracticeContextHtml.indexOf('data-practice-free-minutes="10"') !== -1, "Free Practice should expose compact duration choices");
assert(freePracticeContextHtml.indexOf('data-practice-free-focus="Groove"') !== -1, "Free Practice should expose intention choices");
var reviewPracticeContextHtml = HearthPracticeEntryViewer.renderContext(practiceEntrySnapshot, "review", {{}});
assert(reviewPracticeContextHtml.indexOf('data-practice-review-id=') !== -1, "Previous Practice should expose learner-specific review entries");
var plannedPracticeSession = HearthPracticePlannedSessionViewer.createSession(practiceEntrySnapshot);
assert(plannedPracticeSession.focus.indexOf("A roots") !== -1, "Planned Practice should inherit today's focus");
assert(plannedPracticeSession.minutes === 20, "Planned Practice should inherit the commitment length");
assert(plannedPracticeSession.bodyState === "ready", "Planned Practice should start with a gentle body-ready state");
var activeGuidedPracticeSnapshot = HearthPracticeEntryModel.buildSnapshot({{
  journeyState: {{ activeStudentId: "jen-1", students: [{{ id: "jen-1", name: "Jen", levels: {{}} }}] }},
  companions: {{ jen: {{ commitment: {{ today: "A roots" }} }} }},
  events: [],
  plannedSession: plannedPracticeSession,
  plannedStepTitle: "Arrive"
}});
assert(activeGuidedPracticeSnapshot.activeSession.kind === "guided", "Continue Today should recognize an unfinished guided Practice session");
assert(activeGuidedPracticeSnapshot.activeSession.stepTitle === "Arrive", "Continue Today should remember the exact guided step");
var isolatedPracticeSnapshot = HearthPracticeEntryModel.buildSnapshot({{
  journeyState: {{ activeStudentId: "ayla-1", students: [{{ id: "ayla-1", name: "Ayla", levels: {{}} }}] }},
  companions: {{}},
  events: [],
  plannedSession: plannedPracticeSession,
  candleState: {{ running: true, learnerId: "jen-1", focus: "Jen focus" }}
}});
assert(isolatedPracticeSnapshot.activeSession.running === false, "Continue Today should never leak another learner's guided or candle session");
var songPracticeSnapshot = HearthPracticeEntryModel.buildSnapshot({{
  journeyState: {{ activeStudentId: "jen-1", students: [{{ id: "jen-1", name: "Jen", levels: {{}} }}] }},
  companions: {{ jen: {{ commitment: {{ today: "Original plan" }} }} }},
  events: [],
  songThread: HearthLevelOneSongThread
}});
assert(songPracticeSnapshot.songThread.nextSession.title === "Separate the roles", "Practice should begin the song thread with separate rhythm and lead roles");
var songPracticeSession = HearthPracticePlannedSessionViewer.createSession(songPracticeSnapshot);
assert(songPracticeSession.songThread.drillHandoff.drillId === "song-thread-am", "Planned Practice should preserve the exact Song Lab handoff");
assert(songPracticeSession.focus.indexOf("A Minor Homecoming") !== -1, "Planned Practice should inherit the next song-thread focus");
var fakePlannedStorage = {{
  values: {{}},
  getItem: function(key) {{ return this.values[key] || null; }},
  setItem: function(key, value) {{ this.values[key] = value; }}
}};
var plannedStore = HearthPracticePlannedSessionStore.createStore({{ storage: fakePlannedStorage }});
plannedStore.save({{ id: "session-jen", learner: {{ id: "jen-1", name: "Jen" }}, focus: "Jen focus" }});
plannedStore.save({{ id: "session-ayla", learner: {{ id: "ayla-1", name: "Ayla" }}, focus: "Ayla focus" }});
assert(plannedStore.get("jen-1").focus === "Jen focus", "Planned Practice should restore Jen's unfinished session only");
assert(plannedStore.get("ayla-1").focus === "Ayla focus", "Planned Practice should restore Ayla's unfinished session only");
assert(plannedStore.get("missing") === null, "Planned Practice should not assign one learner's session to another learner");
var plannedPracticeHtml = HearthPracticePlannedSessionViewer.render(plannedPracticeSession);
assert(plannedPracticeHtml.indexOf("Choose the focus") !== -1 || plannedPracticeHtml.indexOf("Arrive") !== -1, "Planned Practice should render the guided steps");
assert(plannedPracticeHtml.indexOf('data-practice-flow-action="next"') !== -1, "Planned Practice should render next-step action");
assert(plannedPracticeHtml.indexOf('data-practice-body-state="ready"') !== -1, "Planned Practice should render the body arrival choices");
assert(plannedPracticeHtml.indexOf('practice-flow-art') !== -1, "Planned Practice should keep the chamber artwork visible");
plannedPracticeSession.stepIndex = 2;
var plannedConditionsHtml = HearthPracticePlannedSessionViewer.render(plannedPracticeSession);
assert(plannedConditionsHtml.indexOf('practice-flow-condition-orb') !== -1, "Planned Practice should render visual condition controls");
plannedPracticeSession.stepIndex = 3;
var plannedPractiseHtml = HearthPracticePlannedSessionViewer.render(plannedPracticeSession);
assert(plannedPractiseHtml.indexOf('data-practice-flow-action="open-do"') !== -1, "Planned Practice should hand off to Do");
assert(plannedPractiseHtml.indexOf('data-practice-flow-action="open-candle"') !== -1, "Planned Practice should hand off to the candle timer");
plannedPracticeSession.stepIndex = 4;
var plannedListenHtml = HearthPracticePlannedSessionViewer.render(plannedPracticeSession);
assert(plannedListenHtml.indexOf('id="practice-rec-btn"') !== -1, "Planned Practice should offer a deliberate recording check");
assert(plannedListenHtml.indexOf('id="practice-playback"') !== -1, "Planned Practice should provide recording playback");
plannedPracticeSession.stepIndex = 5;
var plannedReflectHtml = HearthPracticePlannedSessionViewer.render(plannedPracticeSession);
assert(plannedReflectHtml.indexOf("What should tomorrow remember?") !== -1, "Planned Practice should close with tomorrow-facing reflection");
plannedPracticeSession.saved = true;
var plannedReviewHtml = HearthPracticePlannedSessionViewer.render(plannedPracticeSession);
assert(plannedReviewHtml.indexOf("The session is set") !== -1, "Saved Practice should render an end-of-session review");
var fakeDoing = {{
  categories: [
    {{
      id: "picking",
      title: "Picking",
      drills: [
        {{ id: "alt-1", title: "Alternate Picking", style: "rock", source: "Test", difficulty: 8 }},
        {{ id: "funk-1", title: "Funk Grid", style: "funk", source: "Test", difficulty: 1 }}
      ]
    }}
  ]
}};
var fakeBoardOptions = {{
  doing: fakeDoing,
  config: HearthDoingConfig,
  activeStyle: "rock",
  activeLevel: "all",
  activeSearch: ""
}};
assert(HearthDoingDrillBoardModel.countForGenre(fakeBoardOptions, "rock") === 1, "Doing board model should count genre drills");
assert(HearthDoingDrillBoardModel.findNextDrill(fakeDoing, {{}}, HearthDoingConfig.stateOrder).drill.id === "alt-1", "Doing board model should find next drill");
assert(
  HearthDoingControlsController.stateForFocus("fretboard", HearthDoingConfig.focusCats).doingView === "explorer",
  "Doing controls controller should route fretboard focus to explorer"
);
assert(
  HearthDoingControlsController.stateForQuickLink("open-map").doingView === "map",
  "Doing controls controller should route map quick link to the room map"
);
assert(
  HearthDoingControlsController.stateForQuickLink("open-library").doingView === "training",
  "Doing controls controller should route library quick link to training"
);
assert(
  HearthDoingDrillAdjustController.messageForAdjustment("easier").indexOf("slowing the BPM") !== -1,
  "Doing drill adjust controller should return easier message"
);
assert(
  HearthDoingDrillPreviewController.findDrill(fakeDoing, "picking", "alt-1").drill.title === "Alternate Picking",
  "Doing drill preview controller should find drill records"
);
var doingPreviewHtml = HearthDoingDrillPreviewController.renderPreviewHtml({{
  cat: fakeDoing.categories[0],
  drill: fakeDoing.categories[0].drills[0],
  stateLabel: "Mastered",
  level: 1,
  ui: HearthDoingUiUtils
}});
assert(doingPreviewHtml.indexOf("Alternate Picking") !== -1, "Doing drill preview controller should render title");
assert(doingPreviewHtml.indexOf("Mastered") !== -1, "Doing drill preview controller should render state label");
var doingBoardHtml = HearthDoingDrillBoardViewer.renderDoingDrillBoard({{
  doing: fakeDoing,
  config: HearthDoingConfig,
  ui: HearthDoingUiUtils,
  boardModel: HearthDoingDrillBoardModel,
  progress: {{ "alt-1": "mastered" }},
  activeStyle: "all",
  activeLevel: "all",
  activeSearch: ""
}});
assert(doingBoardHtml.indexOf("doing-library-neck") !== -1, "Doing board viewer should render the physical fretboard");
assert(doingBoardHtml.indexOf("mastered in view") !== -1, "Doing board viewer should render mastered count");
var doingShellHtml = HearthDoingShellViewer.renderDoingShell({{
  doing: {{ title: "Doing Test", subtitle: "Practice test" }},
  ui: HearthDoingUiUtils,
  progressSummary: {{ mastered: 1, touched: 2 }},
  contentHtml: '<div id="doing-fretboard">Inner</div>'
}});
assert(doingShellHtml.indexOf("doing-shell") !== -1, "Doing shell viewer should render shell wrapper");
assert(doingShellHtml.indexOf("Doing Test") !== -1, "Doing shell viewer should render title");
assert(doingShellHtml.indexOf("doing-fretboard") !== -1, "Doing shell viewer should include inner content");
var doingDetailHtml = HearthDoingDrillDetailViewer.renderDoingDrillDetail({{
  cat: fakeDoing.categories[0],
  drill: fakeDoing.categories[0].drills[0],
  level: HearthDoingConfig.levels[0],
  state: "mastered",
  config: HearthDoingConfig,
  ui: HearthDoingUiUtils
}});
assert(doingDetailHtml.indexOf("doing-teaching-scene--page") !== -1, "Doing detail viewer should render the full teaching scene");
assert(doingDetailHtml.indexOf("Alternate Picking") !== -1, "Doing detail viewer should render drill title");
assert(doingDetailHtml.indexOf("Success") !== -1, "Doing detail viewer should render a success condition");
var doingEntryHtml = HearthDoingEntryViewer.renderDoingEntry({{
  focusCats: HearthDoingConfig.focusCats,
  nextDrill: {{ cat: fakeDoing.categories[0], drill: fakeDoing.categories[0].drills[0] }},
  levels: HearthDoingConfig.levels,
  config: HearthDoingConfig,
  ui: HearthDoingUiUtils
}});
assert(doingEntryHtml.indexOf("doing-calm") !== -1, "Doing entry viewer should render entry shell");
assert(doingEntryHtml.indexOf("Recommended next") !== -1, "Doing entry viewer should render recommendation");
assert(doingEntryHtml.indexOf("Guitar room map") !== -1, "Doing entry viewer should render map action");
var doingExplorerHtml = HearthDoingExplorerViewer.renderDoingExplorer({{
  activeTab: "notes"
}});
assert(doingExplorerHtml.indexOf("doing-explore") !== -1, "Doing explorer viewer should render explorer shell");
assert(doingExplorerHtml.indexOf("exp-fretboard-svg") !== -1, "Doing explorer viewer should render note locator");
assert(
  HearthDoingExplorerViewer.renderDoingExplorer({{ activeTab: "tab" }}).indexOf("Tab + Notation") !== -1,
  "Doing explorer viewer should render tab panel"
);
assert(HearthDoingExplorerController.noteFromMidi(40) === "E", "Doing explorer controller should map MIDI notes");
assert(
  HearthDoingExplorerController.positionsForNote("E").indexOf("E fret 0") !== -1,
  "Doing explorer controller should find note positions"
);
assert(
  HearthDoingExplorerController.renderFretboardSvg("E").indexOf("#d4af69") !== -1,
  "Doing explorer controller should render highlighted fretboard SVG"
);
var doingMapHtml = HearthDoingMapViewer.renderDoingMap({{
  zones: HearthDoingConfig.guitarZones,
  doingDebug: true
}});
assert(doingMapHtml.indexOf("doing-map-wrap") !== -1, "Doing map viewer should render map shell");
assert(doingMapHtml.indexOf("doing-map-zone debug") !== -1, "Doing map viewer should render debug zones");
assert(doingMapHtml.indexOf("button class=\\"doing-seal\\"") !== -1, "Doing map viewer should render clickable room labels");
assert(typeof HearthDoingMapViewer.showDoingBubble === "function", "Doing map viewer should expose bubble helper");
var doingRoomHtml = HearthDoingRoomViewer.renderRoomConcept({{
  board: HearthDoingConfig.boardForId("left-hand"),
  config: HearthDoingConfig,
  ui: HearthDoingUiUtils,
  roomDrills: [{{ cat: fakeDoing.categories[0], drill: fakeDoing.categories[0].drills[0] }}],
  selectedItem: null,
  getState: function() {{ return null; }},
  progressDegrees: function() {{ return 0; }},
  stateLabels: HearthDoingConfig.stateLabels
}});
assert(doingRoomHtml.indexOf("doing-room-preview") !== -1, "Doing room viewer should render room preview");
assert(doingRoomHtml.indexOf("doing-room-drill-node") !== -1, "Doing room viewer should render drill nodes");
assert(
  HearthDoingMapController.stateForZone({{ view: "explorer" }}).activeExpTab === "notes",
  "Doing map controller should route explorer zones to notes tab"
);
var doingPanelState = {{ doingView: "map", activeSearch: "" }};
HearthDoingPanelController.applyState(doingPanelState, {{ doingView: "training", activeSearch: "pick" }});
assert(doingPanelState.doingView === "training", "Doing panel controller should apply view state");
assert(doingPanelState.activeSearch === "pick", "Doing panel controller should apply search state");
var fakeKnowing = {{
  categories: [
    {{
      id: "rhythm",
      title: "Rhythm",
      topics: [
        {{ id: "pulse", title: "Pulse", source: "QJam L1", difficulty: 1, body: "<p><strong>Pulse</strong> anchors <strong>rhythm</strong>.</p>" }},
        {{ id: "sync", title: "Syncopation", source: "QJam L2", difficulty: 2 }}
      ]
    }}
  ]
}};
var knowingLevels = HearthKnowingLevelModel.buildLevels(fakeKnowing, {{ pulse: true }});
assert(knowingLevels.length === 8, "Knowing level model should create eight levels");
assert(knowingLevels[0].totalTopics === 1, "Knowing level model should count level topics");
assert(knowingLevels[0].totalDone === 1, "Knowing level model should count completed topics");
assert(HearthKnowingLevelModel.recommendedLevel(knowingLevels) === 2, "Knowing level model should recommend next shelf");
var knowingShelfHtml = HearthKnowingShelfViewer.renderKnowingShelf({{
  knowing: fakeKnowing,
  levels: knowingLevels,
  recommendedLevel: 2
}});
assert(knowingShelfHtml.indexOf("knowing-shelf-scene") !== -1, "Knowing shelf viewer should render shelf scene");
assert(knowingShelfHtml.indexOf("showKnowingBook") !== -1, "Knowing shelf viewer should render book action");
var knowingBookHtml = HearthKnowingBookViewer.renderKnowingBook({{
  knowing: fakeKnowing,
  cat: fakeKnowing.categories[0],
  completed: {{ pulse: true }}
}});
assert(knowingBookHtml.indexOf("Back to shelf") !== -1, "Knowing book viewer should render back action");
assert(knowingBookHtml.indexOf("showKnowingTopic") !== -1, "Knowing book viewer should render topic action");
var knowingTopicHtml = HearthKnowingTopicViewer.renderKnowingTopic({{
  knowing: fakeKnowing,
  cat: fakeKnowing.categories[0],
  topic: fakeKnowing.categories[0].topics[0],
  completed: {{ pulse: true }}
}});
assert(knowingTopicHtml.indexOf("Back to Rhythm") !== -1, "Knowing topic viewer should render book back action");
assert(knowingTopicHtml.indexOf("Mark as understood") === -1, "Knowing topic viewer should reflect completed topic");
assert(
  HearthKnowingTopicViewer.nextTopicFor(fakeKnowing.categories[0], fakeKnowing.categories[0].topics[0]).id === "sync",
  "Knowing topic viewer should find next topic"
);
var fakeKnowingStorage = {{
  value: "{{}}",
  getItem: function() {{ return this.value; }},
  setItem: function(key, value) {{ this.value = value; }}
}};
HearthKnowingProgressController.markTopic({{ topicId: "pulse", storage: fakeKnowingStorage }});
assert(
  HearthKnowingProgressController.readProgress(fakeKnowingStorage).pulse === true,
  "Knowing progress controller should mark topic complete"
);
assert(typeof HearthKnowingPanelController.showKnowing === "function", "Knowing panel controller should expose showKnowing");
assert(
  HearthKnowingPanelController.readProgress(fakeKnowingStorage).pulse === true,
  "Knowing panel controller should read progress through progress controller"
);
var studyState = HearthKnowingStudyModel.dashboardState(fakeKnowing, {{ pulse: true }}, {{}}, {{ pulse: {{ passed: true }} }});
assert(studyState.summary.doneTopics === 1, "Knowing study model should count completed topics");
assert(studyState.summary.quizPassed === 1, "Knowing study model should count passed quizzes");
assert(studyState.currentTopic.id === "sync", "Knowing study model should choose first incomplete topic");
var studyDashboardHtml = HearthKnowingStudyDashboardViewer.renderStudyDashboard({{ knowing: fakeKnowing, completed: {{ pulse: true }}, studyState: studyState }});
assert(studyDashboardHtml.indexOf("Study Lab") >= 0, "Knowing study dashboard viewer should render title");
assert(studyDashboardHtml.indexOf("sync") >= 0, "Knowing study dashboard viewer should render next topic action");
var studyQuestions = HearthKnowingStudyQuestionModel.generateQuestions(fakeKnowing.categories[0].topics[0]);
assert(studyQuestions.length === 4, "Knowing study question model should build term and reflection questions");
assert(studyQuestions[0].correct >= 0, "Knowing study question model should track correct term option");
var studySession = HearthKnowingStudySessionModel.topicContext(fakeKnowing, "rhythm", "pulse", {{ pulse: true }});
assert(studySession.nextTopic.id === "sync", "Knowing study session model should find next topic");
assert(studySession.isDone === true, "Knowing study session model should read completed topic");
var studySessionHtml = HearthKnowingStudySessionViewer.renderStudySession({{ session: studySession, questions: studyQuestions }});
assert(studySessionHtml.indexOf("DEEPEN YOUR UNDERSTANDING") >= 0, "Knowing study session viewer should render quiz section");
assert(studySessionHtml.indexOf("HOW WELL DO YOU UNDERSTAND THIS?") >= 0, "Knowing study session viewer should render self assessment");
var studyOutcome = HearthKnowingStudySessionModel.assessmentOutcome(studySession, "nailed");
assert(studyOutcome.markComplete === true, "Knowing study session model should mark nailed topics complete");
var studyOutcomeHtml = HearthKnowingStudySessionViewer.renderAssessmentResult({{ session: studySession, outcome: studyOutcome }});
assert(studyOutcomeHtml.indexOf("Understood!") >= 0, "Knowing study session viewer should render assessment result");
var studyQuizScore = HearthKnowingStudyQuizController.scoreResult({{ correct: 3, total: 3 }}, 4);
assert(studyQuizScore.passed === true, "Knowing study quiz controller should pass scores at 75 percent");
assert(typeof _answerQuiz === "function", "Knowing study quiz controller should bind answer global");
var fakePractice = {{ drills: [
  {{ id: "warm", title: "Warmup", category: "Hands" }},
  {{ id: "scale", title: "Scale", category: "Scales" }}
] }};
assert(HearthPracticeState.categories(fakePractice).length === 3, "Practice state should list all drill categories");
assert(HearthPracticeState.preferences({{ altarTime: 10 }}).time === 10, "Practice state should read saved time preference");
assert(HearthPracticeState.nextDrill(fakePractice, "Scales", {{ completed: {{}} }}).id === "scale", "Practice state should choose next focused drill");
assert(HearthPracticeGuideModel.guideText({{ time: 5, focus: "All" }}, [], null).indexOf("Five minutes") === 0, "Practice guide model should guide short sessions");
assert(HearthPracticeGuideModel.guideText({{ time: 20, focus: "All" }}, [{{ feeling: "stuck" }}], null).indexOf("Last time was a wall") === 0, "Practice guide model should respond to last session");
assert(HearthPracticeGuideModel.drillGuideText({{ category: "Scales" }}).indexOf("Scales are not exercises") === 0, "Practice guide model should guide drill categories");
var practiceDashboardHtml = HearthPracticeDashboardViewer.renderPracticeDashboard({{
  categories: ["All", "Scales"],
  completedCount: 1,
  guide: "Begin with Scale.",
  nextDrill: fakePractice.drills[1],
  prefs: {{ time: 10, focus: "Scales" }},
  stats: {{ streak: 2, totalMinutes: 30, totalSessions: 3 }},
  timeChoices: [5, 10],
  visibleDrills: fakePractice.drills
}});
assert(practiceDashboardHtml.indexOf("Practice Temple") >= 0, "Practice dashboard viewer should render title");
assert(practiceDashboardHtml.indexOf("Light Candle") >= 0, "Practice dashboard viewer should render start action");
var practiceDrillHtml = HearthPracticeDrillViewer.renderPracticeDrill({{
  candleColor: "#e8a020",
  done: true,
  drill: fakePractice.drills[1],
  drillGuide: "Scales guide",
  prevAttempts: []
}});
assert(practiceDrillHtml.indexOf("HOW TO PRACTICE") >= 0, "Practice drill viewer should render instructions section");
assert(practiceDrillHtml.indexOf("MASTERED") >= 0, "Practice drill viewer should render completed state");
var practiceSessionHtml = HearthPracticeSessionViewer.renderPracticeSession({{
  candleColor: "#e8a020",
  drill: fakePractice.drills[1],
  sessionMinutes: 10,
  startBpm: 80
}});
assert(practiceSessionHtml.indexOf("Candle Practice") >= 0, "Practice session viewer should render title");
assert(practiceSessionHtml.indexOf("METRONOME") >= 0, "Practice session viewer should render metronome");
var practiceFinishOutcome = HearthPracticeSessionModel.finishOutcome(fakePractice, fakePractice.drills[0], "nailed");
assert(practiceFinishOutcome.markComplete === true, "Practice session model should mark nailed drills complete");
assert(practiceFinishOutcome.nextDrill.id === "scale", "Practice session model should choose following drill");
var practiceFinishHtml = HearthPracticeSessionViewer.renderFinishResult({{
  bpm: 80,
  candleColor: "#e8a020",
  drill: fakePractice.drills[0],
  minutes: 10,
  outcome: practiceFinishOutcome
}});
assert(practiceFinishHtml.indexOf("Nailed it!") >= 0, "Practice session viewer should render finish message");
var todayIso = new Date().toISOString();
assert(HearthPracticeUiUtils.calcStreak([{{ ts: todayIso }}]) === 1, "Practice UI utils should count today's streak");
assert(HearthPracticeUiUtils.feelingEmoji("getting") === "💪", "Practice UI utils should map feeling emoji");
var metroState = HearthPracticeMetronomeController.createState(80, 10, 1000);
assert(metroState.targetSeconds === 600, "Practice metronome controller should create timer state");
assert(HearthPracticeMetronomeController.clampBpm(500) === 220, "Practice metronome controller should cap BPM");
assert(HearthPracticeMetronomeController.timerState({{ timerStart: 1000, targetSeconds: 600 }}, 61000).text === "09:00", "Practice metronome controller should format remaining time");
var playWorldHtml = HearthPlayWorldViewer.renderPlayWorld([{{ id: "and", coords: [10, 20], color: "#fff" }}]);
assert(playWorldHtml.indexOf("World Map of Guitar") >= 0, "Play world viewer should render title");
assert(playWorldHtml.indexOf("wmClick('and')") >= 0, "Play world viewer should render hotspot action");
var playRegionHtml = HearthPlayWorldViewer.renderRegionDetail({{ id: "and", name: "Andes", tradition: "Andean Guitar", color: "#fff", description: "Mountain songs", keyArtists: ["A"], scales: ["S"], techniques: ["T"], listenTo: ["L"], learnFirst: "Start" }});
assert(playRegionHtml.indexOf("Andean Guitar") >= 0, "Play world viewer should render region detail");
assert(playRegionHtml.indexOf("Essential Listening") >= 0, "Play world viewer should render listening section");
var masteryHtml = HearthMasteryViewer.renderMastery({{ beyond: [{{ title: "Microtonal", artist: "Artist", tag: "Beyond", color: "#9b59b6", description: "Desc", why: "Why", listen: ["Listen"], reflect: "Reflect" }}] }});
assert(masteryHtml.indexOf("What Lies Beyond") >= 0, "Mastery viewer should render mastery title");
var mastersHtml = HearthMasteryViewer.renderMastersLibrary([{{ name: "Shai", instrument: "Piano", color: "#d4af69", description: "Desc", why: "Why", listen: ["Listen"], channel: "https://example.com" }}]);
assert(mastersHtml.indexOf("Watch Masters at Work") >= 0, "Mastery viewer should render masters library");
var cauldronHtml = HearthCreateCauldronViewer.renderCauldron({{ ingredients: [{{ id: "melody", symbol: "M", name: "Melody", color: "#c45a20" }}], savedNotes: "idea" }});
assert(cauldronHtml.indexOf("The Cauldron") >= 0, "Create cauldron viewer should render title");
assert(cauldronHtml.indexOf("cauldronToggle('melody')") >= 0, "Create cauldron viewer should render ingredient action");
var cauldronResult = HearthCreateCauldronModel.mixResult(
  [{{ id: "melody", symbol: "M", name: "Melody", color: "#c45a20", prompts: ["write a hook"] }}],
  [],
  ["melody"]
);
assert(cauldronResult.constraint === "Single ingredient: Melody", "Create cauldron model should mix one ingredient");
assert(cauldronResult.prompt === "write a hook", "Create cauldron model should pick ingredient prompt");
var cauldronResultHtml = HearthCreateCauldronViewer.renderMixResult(cauldronResult);
assert(cauldronResultHtml.indexOf("Single ingredient: Melody") >= 0, "Create cauldron viewer should render mix result");
assert(typeof HearthCreateCauldronController.syncSelectionUi === "function", "Create cauldron controller should expose selection sync");
var fakeCreateStorage = {{
  values: {{
    "hearth-create-current": JSON.stringify({{ title: "A minor spark", ingredients: ["Rhythm"], prompt: "Keep the root note present." }}),
    "hearth-create-projects": JSON.stringify([{{ title: "Old fragment", ingredients: ["Riff"], savedAt: "2026-07-18T00:00:00.000Z" }}])
  }},
  getItem: function(key) {{ return this.values[key] || null; }},
  setItem: function(key, value) {{ this.values[key] = value; }}
}};
var createState = HearthCreateState.createStore({{ storage: fakeCreateStorage }});
var createEntrySnapshot = HearthCreateEntryModel.buildSnapshot({{
  storage: fakeCreateStorage,
  journeyState: {{ activeStudentId: "jen-1", students: [{{ id: "jen-1", name: "Jen" }}] }},
  createState: createState,
  ingredients: [{{ name: "Rhythm" }}, {{ name: "Riff" }}]
}});
assert(createEntrySnapshot.learner.name === "Jen", "Create entry should use the active learner");
assert(createEntrySnapshot.current.hasMaterial === true, "Create entry should recognise an active seed");
assert(createEntrySnapshot.saved.length === 1, "Create entry should surface saved fragments");
createState.saveProject(
  {{ id: "seed-jen", title: "Jen fragment", ingredients: ["Melody"] }},
  {{ activeStudentId: "jen-1", students: [{{ id: "jen-1", name: "Jen" }}] }}
);
var createStateStore = JSON.parse(fakeCreateStorage.getItem("hearth-create-v1"));
assert(createStateStore.profiles["jen-1"].projects.length === 2, "Create state should keep Jen's fragments in her profile");
var createHandoffSeed = HearthCreateHandoff.buildSeed({{
  source_node_id: "journey",
  lesson_id: "jen-a-minor-pentatonic-consolidation",
  suggested_ingredient: "riff",
  starter: "A minor root notes",
  instruction: "Make a two-bar answer."
}});
assert(createHandoffSeed.selected[0] === "riff", "Create handoff should preselect the suggested ingredient");
assert(createHandoffSeed.sourceContext.lesson_id === "jen-a-minor-pentatonic-consolidation", "Create handoff should preserve its lesson source");
assert(createHandoffSeed.prompt === "Make a two-bar answer." && createHandoffSeed.riffIdea === "A minor root notes", "Create handoff should open as a usable seed instead of an empty ingredient screen");
var handoffEvents = [];
var handoffState = {{
  current: null,
  intent: "",
  activeLearnerId: function() {{ return "jen-1"; }},
  setCurrent: function(seed) {{ this.current = seed; return seed; }},
  setIntent: function(intent) {{ this.intent = intent; return intent; }}
}};
var handoffRenderCount = 0;
var handoffOpener = HearthCreateHandoff.createHandoff({{
  root: {{
    HearthCreateState: {{ createStore: function() {{ return handoffState; }} }},
    HearthProgressEvents: {{ append: function(event) {{ handoffEvents.push(event); }} }},
    CreateCauldronScene: {{ render: function() {{ handoffRenderCount += 1; }} }}
  }}
}});
handoffOpener.open({{ suggested_ingredient: "riff", instruction: "Make it musical." }});
assert(handoffState.current.selected[0] === "riff" && handoffState.intent === "handoff", "Create handoff should prepare the learner's Cauldron state");
assert(handoffRenderCount === 1 && handoffEvents[0].event_type === "create_handoff_opened", "Create handoff should open the Cauldron and log progress");
assert(handoffEvents[0].learner_id === "jen-1", "Create handoff should log progress for the active learner");
var createEntryHtml = HearthCreateEntryViewer.render(createEntrySnapshot, "ingredient");
assert(createEntryHtml.indexOf('data-create-mode="ingredient"') !== -1, "Create entry should render the ingredient hotspot");
assert(createEntryHtml.indexOf("The Cauldron") !== -1, "Create entry should render the Cauldron title");
var ttsText = HearthTextToSpeechController.readableText({{
  querySelectorAll: function() {{
    return [{{ textContent: "Hello ☐" }}, {{ textContent: "world" }}];
  }}
}});
assert(ttsText.indexOf("☐") === -1, "Text-to-speech controller should remove checkbox symbols");
assert(ttsText.indexOf("Hello") >= 0 && ttsText.indexOf("world") >= 0, "Text-to-speech controller should collect paragraph text");
var ttsVoice = HearthTextToSpeechController.preferredVoice([
  {{ name: "Other", lang: "en-US" }},
  {{ name: "Samantha", lang: "en-US" }}
]);
assert(ttsVoice.name === "Samantha", "Text-to-speech controller should choose preferred voices");
var headerSearchResults = HearthHeaderToolsController.collectSearchResults("scale", {{
  foundationTopics: [{{ title: "Threshold" }}],
  knowing: {{ categories: [{{ title: "Harmony", topics: [{{ title: "Major Scale" }}] }}] }},
  doing: {{ drills: [{{ title: "Scale Shapes" }}] }},
  playRegions: [{{ name: "Andes" }}]
}}, function() {{}});
assert(headerSearchResults.length === 2, "Header tools controller should collect matching search results");
assert(headerSearchResults[0].kind === "Concept Shelf" || headerSearchResults[0].kind === "Harmony", "Header search results should include result context");
assert(headerSearchResults[0].actionText.indexOf("Open") === 0, "Header search results should include an action cue");
var headerStorage = {{
  values: {{
    fProgress: JSON.stringify({{ a: true, b: true }}),
    dProgress: JSON.stringify({{ c: true }}),
    kProgress: JSON.stringify({{}}),
    streak: "3"
  }},
  getItem: function(key) {{ return this.values[key] || null; }},
  setItem: function(key, value) {{ this.values[key] = String(value); }}
}};
var headerCounts = HearthHeaderToolsController.progressCounts(headerStorage);
assert(headerCounts.foundation.done === 2, "Header tools controller should count Foundation progress");
assert(HearthHeaderToolsController.renderProgressHtml(headerCounts).indexOf("3 days") >= 0, "Header tools controller should render streak progress");
assert(HearthHeaderToolsController.renderProgressHtml(headerCounts).indexOf("Next best move") >= 0, "Header tools controller should render progress guidance");
assert(HearthHeaderToolsController.progressSummary(headerCounts).next.label === "Know", "Header tools controller should suggest weakest progress area");
function makeHeaderPanel(id) {{
  return {{
    id: id,
    classList: {{
      classes: {{}},
      contains: function(name) {{ return !!this.classes[name]; }},
      add: function(name) {{ this.classes[name] = true; }},
      remove: function(name) {{ delete this.classes[name]; }},
      toggle: function(name, force) {{
        var shouldShow = force === undefined ? !this.contains(name) : !!force;
        if (shouldShow) this.add(name);
        else this.remove(name);
        return shouldShow;
      }}
    }}
  }};
}}
var headerPanelIds = [
  "beatbot-panel",
  "insightPanel",
  "linkDepositPanel",
  "refsPanel",
  "searchPanel",
  "toolkitPanel",
  "progressPanel",
  "settingsPanel"
];
var headerElements = {{
  searchInput: {{ id: "searchInput", focused: false, focus: function() {{ this.focused = true; }} }}
}};
headerPanelIds.forEach(function(id) {{ headerElements[id] = makeHeaderPanel(id); }});
var headerDoc = {{
  getElementById: function(id) {{ return headerElements[id] || null; }}
}};
HearthHeaderToolsController.toggleSearch(headerDoc, function(fn) {{ fn(); }});
assert(headerElements.searchPanel.classList.contains("show"), "Header search panel should open");
assert(headerElements.searchInput.focused, "Header search panel should focus input when opened");
HearthHeaderToolsController.toggleProgress(headerDoc, function() {{}});
assert(!headerElements.searchPanel.classList.contains("show"), "Opening progress should close search");
assert(headerElements.progressPanel.classList.contains("show"), "Header progress panel should open");
HearthHeaderToolsController.toggleProgress(headerDoc, function() {{}});
assert(!headerElements.progressPanel.classList.contains("show"), "Clicking an open progress panel should close it");
headerElements.toolkitPanel.classList.add("show");
HearthHeaderToolsController.toggleSettings(headerDoc);
assert(!headerElements.toolkitPanel.classList.contains("show"), "Opening settings should close toolkit");
assert(headerElements.settingsPanel.classList.contains("show"), "Header settings panel should open");
HearthHeaderToolsController.closePanels(headerDoc, ["settingsPanel"]);
assert(headerElements.settingsPanel.classList.contains("show"), "Header closePanels should preserve kept panel");
var linkPanel = makeHeaderPanel("linkDepositPanel");
var linkKeepIds = null;
var linkDoc = {{
  getElementById: function(id) {{
    if (id === "linkDepositPanel") return linkPanel;
    if (id === "linkDepositUrl") return {{ focus: function() {{}} }};
    return null;
  }}
}};
HearthLinkDepositController.togglePanel({{
  document: linkDoc,
  delay: function(fn) {{ fn(); }},
  closePanels: function(keepIds) {{ linkKeepIds = keepIds; }}
}});
assert(linkKeepIds[0] === "linkDepositPanel", "Link deposit should ask header tools to keep its own panel open");
assert(linkPanel.classList.contains("show"), "Link deposit panel should open after closing siblings");
HearthLinkDepositController.togglePanel({{
  document: linkDoc,
  delay: function(fn) {{ fn(); }},
  closePanels: function() {{}}
}});
assert(!linkPanel.classList.contains("show"), "Clicking an open link deposit panel should close it");
var referencesHtml = HearthReferencesPanelController.renderReferencesHtml({{
  FOUNDATION: {{ sources: ["Source <A>"] }},
  DOING: {{ sources: [] }}
}});
assert(referencesHtml.indexOf("Foundation") >= 0, "References panel controller should render source groups");
assert(referencesHtml.indexOf("&lt;A&gt;") >= 0, "References panel controller should escape source text");
assert(HearthLinkDepositController.titleFromUrl("https://www.youtube.com/watch?v=abc123") === "YouTube Video abc123", "Link deposit controller should infer YouTube titles");
var linkPayload = HearthLinkDepositController.videoPayload({{
  key_name: "yt-1",
  title: "Scale Video",
  url: "https://youtube.com/watch?v=abc",
  category: "scales",
  level_num: 2,
  notes: "major scale"
}});
assert(linkPayload.youtube_url.indexOf("youtube.com") >= 0, "Link deposit controller should build video payload");
assert(HearthLinkDepositController.matchingTopicWords({{ title: "Major Scale", description: "", category: "scales" }}, "major scale practice").length >= 1, "Link deposit controller should match topic words");
var recorderButtonClass = {{ added: "", removed: "", add: function(name) {{ this.added = name; }}, remove: function(name) {{ this.removed = name; }} }};
var recorderButton = {{ classList: recorderButtonClass, textContent: "" }};
var recorderStatus = {{ textContent: "" }};
var recorderDoc = {{
  getElementById: function(id) {{
    if (id === "rec-btn") return recorderButton;
    if (id === "rs") return recorderStatus;
    return null;
  }}
}};
assert(HearthRecorderController.toggleRecording(false, recorderDoc) === true, "Recorder controller should toggle recording on");
assert(recorderButtonClass.added === "on", "Recorder controller should mark button active");
assert(recorderStatus.textContent === "Recording...", "Recorder controller should update status text");
assert(HearthRecorderController.captureSupported() === false, "Recorder controller should report unavailable capture in the smoke environment");
var notebookStorage = {{
  values: {{ "hearth-foundation-progress": JSON.stringify({{ one: true }}) }},
  getItem: function(key) {{ return this.values[key] || null; }},
  setItem: function(key, value) {{ this.values[key] = String(value); }},
  removeItem: function(key) {{ delete this.values[key]; }}
}};
var notebookSummary = HearthNotebookController.progressSummary(notebookStorage, {{
  FOUNDATION: {{ topics: [{{}}, {{}}] }},
  DOING: {{ categories: [] }},
  KNOWING: {{ categories: [] }},
  PRACTICE: {{ topics: [] }},
  WORLD_MAP_REGIONS: [],
  CREATE: {{ categories: [] }}
}});
assert(notebookSummary.nodes[0].pct === 50, "Notebook controller should calculate node progress");
assert(HearthNotebookController.renderMiniProgressHtml(notebookSummary).indexOf("Fnd") >= 0, "Notebook controller should render mini progress");
var dictionaryTerms = [
  {{ ch: "Music Theory", term: "Scale <Test>", def: "A sequence" }},
  {{ ch: "Technique", term: "Strumming", def: "Sweeping" }}
];
assert(HearthDictionaryController.chapterCounts(dictionaryTerms)["Music Theory"] === 1, "Dictionary controller should count chapters");
var dictionaryChapter = HearthDictionaryController.renderChapterHtml(dictionaryTerms, "Music Theory");
assert(dictionaryChapter.html.indexOf("&lt;Test&gt;") >= 0, "Dictionary controller should escape term text");
var fakeShelfScrolled = {{ left: 0, behavior: "" }};
var fakeShelfDocument = {{
  getElementById: function(id) {{
    return id === "shelf-l1"
      ? {{ scrollBy: function(options) {{ fakeShelfScrolled.left = options.left; fakeShelfScrolled.behavior = options.behavior; }} }}
      : null;
  }}
}};
assert(HearthKnowingShelfController.scrollShelf("shelf-l1", -1, fakeShelfDocument) === true, "Knowing shelf controller should scroll known shelf");
assert(fakeShelfScrolled.left === -200, "Knowing shelf controller should scroll by fixed shelf distance");
var fakeMapTarget = {{ innerHTML: "" }};
var fakeMapFoundation = {{
  guideLine: "Guide line",
  topics: [
    {{ id: "f-threshold" }},
    {{ id: "f-how-to-learn" }},
    {{ id: "f-learning-a-language" }}
  ]
}};
var fakeMapResult = HearthFoundationMapViewer.renderFoundationMap({{
  foundation: fakeMapFoundation,
  targetEl: fakeMapTarget,
  completed: {{ "f-threshold": true }}
}});
assert(fakeMapResult.done_count === 1, "Foundation map viewer should count completed frets");
assert(fakeMapResult.active_index === 1, "Foundation map viewer should choose first incomplete fret");
assert(fakeMapTarget.innerHTML.indexOf("found-neck-wrap") !== -1, "Foundation map viewer should render map shell");
var fakePanelTarget = {{
  innerHTML: "",
  classList: {{
    added: "",
    add: function(name) {{ this.added = name; }}
  }}
}};
var fakeHiddenPanel = {{
  classList: {{
    removed: "",
    remove: function(name) {{ this.removed = name; }}
  }}
}};
globalThis.document = {{
  querySelectorAll: function(selector) {{
    return selector === ".pnl" ? [fakeHiddenPanel] : [];
  }},
  getElementById: function(id) {{
    return id === "p-foundation" ? fakePanelTarget : null;
  }}
}};
globalThis.localStorage = {{
  getItem: function() {{ return "{{}}"; }}
}};
globalThis.FOUNDATION = fakeMapFoundation;
var fakePanelResult = HearthFoundationPanelController.showFoundation();
assert(fakePanelResult.fret_count === 3, "Foundation panel controller should render map through map viewer");
assert(fakePanelTarget.classList.added === "on", "Foundation panel controller should show panel");
globalThis.GUIDE_CHARACTER_ASSETS = {{
  moods: {{
    neutral: {{ src: "images/character-generated/test-neutral.webp" }}
  }}
}};
var fakeTopicTarget = {{ innerHTML: "" }};
var fakeFoundation = {{
  tag: "TEST",
  topics: [
    {{
      id: "f-test",
      num: "0",
      title: "Test Topic",
      subtitle: "Testing",
      steps: [
        {{ label: "Understand", title: "Test Step", body: "<p>Body</p>" }},
        {{ label: "Own", title: "Done", body: "<p>Done</p>" }}
      ]
    }}
  ]
}};
var fakeTopicResult = HearthFoundationTopicViewer.renderFoundationTopicStep({{
  foundation: fakeFoundation,
  targetEl: fakeTopicTarget,
  topicId: "f-test",
  stepIndex: 0,
  completed: {{}}
}});
assert(fakeTopicResult.topic_id === "f-test", "Foundation topic viewer should return topic id");
assert(fakeTopicTarget.innerHTML.indexOf("foundation-topic-page") !== -1, "Foundation topic viewer should render page shell");
assert(fakeTopicTarget.innerHTML.indexOf("Test Topic") !== -1, "Foundation topic viewer should render topic title");
assert(fakeTopicTarget.innerHTML.indexOf("images/character-generated/test-neutral.webp") !== -1, "Foundation topic viewer should use the canonical guide asset catalogue");
var fakeControllerTarget = {{ innerHTML: "" }};
globalThis.document = {{
  getElementById: function(id) {{
    return id === "p-foundation" ? fakeControllerTarget : null;
  }}
}};
globalThis.localStorage = {{
  getItem: function() {{ return "{{}}"; }}
}};
globalThis.FOUNDATION = fakeFoundation;
var fakeControllerResult = HearthFoundationTopicController.renderFoundationTopicStep("f-test", 0);
assert(fakeControllerResult.topic_id === "f-test", "Foundation topic controller should delegate fallback rendering");
assert(fakeControllerTarget.innerHTML.indexOf("foundation-topic-page") !== -1, "Foundation topic controller should render fallback page");
assert(typeof HearthFoundationAudio.playTone === "function", "Foundation audio adapter should expose playTone");
assert(typeof _l1_playTone === "function", "Foundation audio adapter should keep legacy helper name");

var registry = HearthRendererRegistry.createRegistry();
registry.register("foundation.fake_renderer", function(context) {{
  return "rendered:" + context.step.type;
}});
assert(registry.has("foundation.fake_renderer"), "renderer registry should register keys");
assert(registry.render("foundation.fake_renderer", {{ step: {{ type: "action" }} }}) === "rendered:action", "renderer registry should call renderer");
assert(HearthActionRendererRegistry.keys().length === 0, "bootstrap should create an empty shared registry");

var fakeFoundationLesson = {{ steps: [] }};
[4, 12, 15, 18].forEach(function(order) {{
  fakeFoundationLesson.steps[order - 1] = {{
    type: "action",
    render: function(container, advance) {{
      container.called = order;
      if (advance) advance();
      return order;
    }}
  }};
}});
var foundationRendererRegistry = HearthRendererRegistry.createRegistry();
HearthFoundationActionRenderers.registerLegacyFoundationActionRenderers(
  fakeFoundationLesson,
  foundationRendererRegistry
);
assert(foundationRendererRegistry.keys().length === 4, "Foundation action adapter should register four renderers");
var fakeContainer = {{}};
var didAdvance = false;
foundationRendererRegistry.render("foundation.body_scan", {{
  container: fakeContainer,
  advance: function() {{ didAdvance = true; }}
}});
assert(fakeContainer.called === 4, "Foundation body scan renderer should call source action");
assert(didAdvance === true, "Foundation action wrapper should pass advance callback");

var viewModel = HearthLessonViewModel.buildLessonViewModel(seed, {{ current_step_index: 2 }});
assert(viewModel.id === "f-conversations", "view model lesson id mismatch");
assert(viewModel.current_step.type === "ask", "view model current step should be ask");
assert(viewModel.next_step_index === 3, "view model next step mismatch");

var session = HearthLessonSession.createLessonSession(seed, {{ step_index: 2 }});
var wrong = HearthLessonSession.evaluateChoice(seed, session, 1);
assert(wrong.result.valid === true, "wrong choice should be valid");
assert(wrong.result.correct === false, "wrong choice should be incorrect");
assert(wrong.result.next_action === "reexplain", "wrong choice should reexplain");
assert(wrong.state.scores["interval-melody"].wrong === 1, "wrong score not tracked");

var correct = HearthLessonSession.evaluateChoice(seed, wrong.state, 0);
assert(correct.result.correct === true, "correct choice should be correct");
assert(correct.result.next_action === "show_response", "correct choice should show response");
assert(correct.state.scores["interval-melody"].right === 1, "right score not tracked");

var advanced = HearthLessonSession.advanceLesson(seed, correct.state);
assert(advanced.step_index === 3, "advance should move one step forward");
assert(advanced.history.length === 1, "advance should remember previous step");

var progress = HearthLearnerProgress.createProgressRecord({{ now: "2026-07-04T00:00:00.000Z" }});
progress = HearthLearnerProgress.markLessonStarted(progress, "f-conversations", {{ now: "2026-07-04T00:01:00.000Z" }});
progress = HearthLearnerProgress.updateLessonStep(progress, "f-conversations", 3, {{ now: "2026-07-04T00:02:00.000Z" }});
progress = HearthLearnerProgress.recordLessonAnswer(progress, "f-conversations", "interval-melody", false, {{ now: "2026-07-04T00:03:00.000Z" }});
progress = HearthLearnerProgress.markLessonCompleted(progress, "f-conversations", {{ now: "2026-07-04T00:04:00.000Z" }});
var lessonProgress = HearthLearnerProgress.getLessonProgress(progress, "f-conversations");
assert(lessonProgress.status === "completed", "progress should mark lesson completed");
assert(lessonProgress.last_step_index === 3, "progress should keep last step");
assert(lessonProgress.wrong_answers === 1, "progress should track wrong answers");
assert(HearthLearnerProgress.summarizeProgress(progress).completed_count === 1, "progress summary mismatch");

var legacyPlayCoordinates = HearthPlayDomain.normalizeLegacyCoordinates([205, 290], {{ width: 900, height: 600 }});
assert(Math.abs(legacyPlayCoordinates.x_percent - 22.777777) < 0.001, "Play should normalize legacy hotspot x coordinates");
assert(Math.abs(legacyPlayCoordinates.y_percent - 48.333333) < 0.001, "Play should normalize legacy hotspot y coordinates");

var sourcedCulture = {{
  people_and_place: "Quechua and Aymara communities across the Andes",
  cultural_doorway: "The charango carries both cultural adaptation and living Andean identity.",
  claims: [{{
    id: "charango-oral-history",
    text: "One oral-history account says the instrument could be concealed beneath a poncho.",
    status: "oral_tradition",
    source_ref_ids: ["mendivil-charango-history"]
  }}],
  source_refs: [{{
    id: "mendivil-charango-history",
    title: "La construccion de la historia: el charango en la memoria colectiva mestiza ayacuchana",
    creator: "Julio Mendivil",
    publisher: "Revista Musical Chilena",
    url: "https://revistas.uchile.cl/index.php/RMCH/article/download/12491/12803",
    source_type: "research_paper",
    review_status: "reviewed"
  }}],
  community_review_status: "pending"
}};
var cultureValidation = HearthPlayDomain.validateCultureContext(sourcedCulture);
assert(cultureValidation.valid === true, "Play culture should accept a sourced oral-history claim");
assert(cultureValidation.warnings.indexOf("culture_community_review_incomplete") !== -1, "Play culture should keep community review visible");
var unsourcedCultureValidation = HearthPlayDomain.validateCultureContext({{
  claims: [{{ id: "unsupported", text: "Unsupported certainty", status: "documented" }}]
}});
assert(unsourcedCultureValidation.valid === false, "Play culture should reject unsourced documented claims");

var livingTradition = {{
  community_names: ["Black communities of the Mississippi Delta"],
  place_and_period: "The Mississippi Delta, especially the late nineteenth and early twentieth centuries",
  social_functions: ["personal testimony", "dance and social gathering", "shared storytelling"],
  practice_settings: ["homes and porches", "juke joints", "travelling performance"],
  instruments_and_voices: ["voice", "acoustic guitar", "slide guitar"],
  embodied_practices: ["call and response", "foot pulse", "voice-and-guitar dialogue"],
  transmission: "Carried through listening, watching, playing together, travel, performance, and recording.",
  historical_forces: ["racial violence", "Jim Crow", "sharecropping", "migration"],
  living_now: "The tradition continues through performers, families, teaching, recordings, gatherings, and connected blues practices.",
  learner_relationship_note: "The learner is visiting one practice inside a living tradition, not mastering the culture."
}};
var livingTraditionValidation = HearthPlayDomain.validateTraditionProfile(livingTradition, {{ strict: true }});
assert(livingTraditionValidation.valid === true, "Play should accept a complete living-tradition profile");
var genreOnlyValidation = HearthPlayDomain.validateTraditionProfile({{ instruments_and_voices: ["guitar"] }}, {{ strict: true }});
assert(genreOnlyValidation.valid === false, "Published Play destinations should not pass with genre-only metadata");
assert(genreOnlyValidation.errors.indexOf("tradition_community_names_required") !== -1, "Play should require the communities carrying a published tradition");
assert(HearthPlayDomain.defaultPlaySequence[2] === "meet_tradition", "Play should meet the tradition before copying its gestures");
var mississippiTradition = PLAY_TRADITIONS.mississippi;
var mississippiDestinationValidation = HearthPlayDomain.validateDestination({{
  id: mississippiTradition.destination_id,
  name: "Mississippi Delta",
  coordinates: {{ x_percent: 23, y_percent: 48 }},
  tradition_label: mississippiTradition.tradition_label,
  tradition_profile: mississippiTradition.tradition_profile,
  culture: mississippiTradition.culture,
  content_status: mississippiTradition.content_status,
  review_status: mississippiTradition.review_status
}});
assert(mississippiDestinationValidation.valid === true, "The first Play tradition record should pass structural validation");
assert(mississippiDestinationValidation.warnings.indexOf("culture_community_review_incomplete") !== -1, "The first Play tradition should remain visibly pending community review");
var livePlaySnapshot = HearthPlayAtlasModel.buildSnapshot({{
  journeyState: {{ activeStudentId: "jen", students: [{{ id: "ayla", name: "Ayla" }}, {{ id: "jen", name: "Jen" }}] }},
  regions: [
    {{ id: "mississippi", name: "Mississippi Delta", tradition: "Delta Blues", color: "#5a9fd4", coords: [205, 290] }},
    {{ id: "andalusia", name: "Andalusia", tradition: "Flamenco", color: "#d63031", coords: [478, 270] }}
  ],
  traditions: PLAY_TRADITIONS,
  events: [],
  selectedId: "mississippi"
}});
assert(livePlaySnapshot.learner.name === "Jen", "The live Play atlas should use the globally active learner");
assert(livePlaySnapshot.selectedTradition.id === "mississippi-delta-country-blues", "The live Play atlas should resolve reviewed tradition data");
var livePlayEntryHtml = HearthPlayAtlasViewer.render(livePlaySnapshot, {{
  selectedId: "mississippi", view: "destination", moment: 2, pulseRunning: false,
  home: "", role: "", reflection: "", finished: false
}});
assert(livePlayEntryHtml.indexOf("Where shall the guitar take us?") !== -1, "The live Play atlas should render the approved visual entrance");
assert(livePlayEntryHtml.indexOf("Enter the tradition") !== -1, "The live Play atlas should open a tradition-led route");
assert(livePlayEntryHtml.indexOf("Active learner") !== -1 && livePlayEntryHtml.indexOf("Jen") !== -1, "The live Play atlas should show the active learner");
var songPlayHandoff = {{
  id: "handoff-journey-play-jen-test",
  version: 1,
  learner_id: "jen",
  source_node_id: "journey",
  destination_node_id: "play",
  activity_id: "play-a-minor-homecoming-role-exchange",
  lesson_id: "jen-a-minor-pentatonic-consolidation",
  journey_level_id: "L1",
  capability_ids: ["L1-PLAY-01", "L1-SONG-01", "L1-ROLE-01"],
  session_id: "journey-play-session-jen-test",
  task: {{ id: "play-a-minor-homecoming-role-exchange" }},
  return_route: {{ node_id: "journey", view_id: "companion", params: {{ learner_id: "jen", step_index: 5 }} }},
  fallback_instruction: "Return to Journey."
}};
var livePlaySongSnapshot = HearthPlayAtlasModel.buildSnapshot({{
  journeyState: {{ activeStudentId: "jen", students: [{{ id: "jen", name: "Jen" }}] }},
  regions: [{{ id: "mississippi", name: "Mississippi Delta", tradition: "Delta Blues", color: "#5a9fd4", coords: [205, 290] }}],
  traditions: PLAY_TRADITIONS,
  events: [],
  selectedId: "mississippi",
  songThread: HearthLevelOneSongThread,
  handoff: songPlayHandoff
}});
assert(livePlaySongSnapshot.route.type === "song" && livePlaySongSnapshot.route.id === HearthLevelOneSongThread.playActivity.routeId, "Play should recognize the shared song handoff");
var livePlaySongIntroHtml = HearthPlayAtlasViewer.render(livePlaySongSnapshot, {{
  view: "song", moment: 1, role: "", rolesTried: [], reflection: "", finished: false
}});
assert(livePlaySongIntroHtml.indexOf("Hearth Studio") !== -1 && livePlaySongIntroHtml.indexOf("original Hearth practice piece") !== -1, "The Play song route should identify its neutral studio context");
assert(livePlaySongIntroHtml.indexOf('aria-label="Eight-bar chord road"') !== -1 && livePlaySongIntroHtml.indexOf("Rhythm first") !== -1, "The Play song route should show the complete form and role choice");
var livePlaySongExchangeHtml = HearthPlayAtlasViewer.render(livePlaySongSnapshot, {{
  view: "song-converse", moment: 2, role: "lead", rolesTried: ["rhythm", "lead"], reflection: "", finished: false
}});
assert(livePlaySongExchangeHtml.indexOf("We completed all 8 bars in both roles") !== -1, "Play should require the learner to carry the full form through both roles");
var livePlayTraditionHtml = HearthPlayAtlasViewer.render(livePlaySnapshot, {{
  selectedId: "mississippi", view: "tradition", moment: 2, pulseRunning: false,
  home: "", role: "", reflection: "", finished: false
}});
assert(livePlayTraditionHtml.indexOf("Carried by") !== -1, "The live Play route should identify who carries the tradition");
assert(livePlayTraditionHtml.indexOf('data-play-action="pulse"') !== -1, "The live Play tradition should lead into a playable pulse step");
var livePlayConversationHtml = HearthPlayAtlasViewer.render(livePlaySnapshot, {{
  selectedId: "mississippi", view: "converse", moment: 6, pulseRunning: false,
  home: "open-a", role: "lead", reflection: "", finished: false
}});
assert(livePlayConversationHtml.indexOf("Voice and guitar answer") !== -1, "The live Play route should own musical conversation");

var playDestinations = [
  {{ id: "mississippi", name: "Mississippi Delta", coordinates: {{ x_percent: 23, y_percent: 48 }} }},
  {{ id: "usa", name: "USA", coordinates: {{ x_percent: 21, y_percent: 42 }} }}
];
var jenPlayRoute = {{
  id: "jen-level-one-play",
  learner_id: "jen",
  destination_ids: ["mississippi", "usa"],
  current_destination_id: "mississippi"
}};
var aylaPlayRoute = {{
  id: "ayla-level-one-play",
  learner_id: "ayla",
  destination_ids: ["mississippi", "usa"],
  current_destination_id: "usa"
}};
var jenMarkerStates = HearthPlayDomain.buildMarkerStates(playDestinations, jenPlayRoute, {{ mississippi: {{ percent: 28 }} }});
var aylaMarkerStates = HearthPlayDomain.buildMarkerStates(playDestinations, aylaPlayRoute, {{}});
assert(jenMarkerStates[0].state === "current", "Jen's Play route should select Jen's current destination");
assert(aylaMarkerStates[1].state === "current", "Ayla's Play route should remain separate from Jen's route");
assert(jenPlayRoute.current_destination_id === "mississippi", "Play marker selection should not mutate route data");

var playResult = {{
  learner_id: "jen",
  route_id: "jen-level-one-play",
  destination_id: "mississippi",
  activity_id: "a-minor-musical-conversation",
  journey_level_id: "level-1",
  lesson_id: "level-1-lesson-1",
  duration_minutes: 12,
  role: "lead",
  tempo: 76,
  enjoyment: 5,
  confidence: 3,
  stayed_with_pulse: true,
  found_home: true,
  reflection: "The call and response sounded musical.",
  repeat_focus: "Land on A after each short phrase.",
  revisit: true,
  completed_at: "2026-07-18T12:00:00.000Z"
}};
var playProgressEvent = HearthPlayDomain.toProgressEvent(playResult);
assert(playProgressEvent.event_type === "play_activity_completed", "Play should create the shared completion event type");
assert(playProgressEvent.learner_id === "jen", "Play completion events should belong to one learner");
assert(playProgressEvent.data.found_home === true, "Play completion events should preserve musical evidence");
var songPlayResult = {{
  id: "play-event-jen-song-test",
  learner_id: "jen",
  route_id: HearthLevelOneSongThread.playActivity.routeId,
  destination_id: null,
  activity_id: HearthLevelOneSongThread.playActivity.activityId,
  journey_level_id: "L1",
  lesson_id: "jen-a-minor-pentatonic-consolidation",
  duration_minutes: 12,
  role: "lead",
  tempo: 60,
  stayed_with_pulse: true,
  found_home: true,
  reflection: "The rhythm held the exchange.",
  repeat_focus: "Repeat the weaker role.",
  revisit: true,
  capability_ids: ["L1-PLAY-01", "L1-SONG-01", "L1-ROLE-01"],
  evidence_stage: "application",
  evidence_source: "self_report",
  attempt_id: "play-attempt-jen-song-test",
  session_id: "journey-play-session-jen-test",
  handoff_id: "handoff-journey-play-jen-test",
  return_route: {{ node_id: "journey", view_id: "companion", params: {{ learner_id: "jen", step_index: 5 }} }},
  fallback_instruction: "Return to Journey.",
  roles_tried: ["rhythm", "lead"],
  song_id: HearthLevelOneSongThread.id,
  completed_full_form: true,
  completed_at: "2026-07-20T12:00:00.000Z"
}};
var songPlayProgressEvent = HearthPlayDomain.toProgressEvent(songPlayResult);
var songPlayValidation = HearthProgressEventContract.validateAndNormalize(songPlayProgressEvent);
assert(songPlayValidation.valid === true, "The Journey-to-Play song exchange should emit a valid canonical progress event");
assert(songPlayProgressEvent.capability_ids.length === 3 && songPlayProgressEvent.data.roles_tried.length === 2, "Play should return song and role evidence to Journey");
var playPracticeRecommendation = HearthPlayDomain.createPracticeRecommendation(playResult);
assert(playPracticeRecommendation.learner_id === "jen", "Play Practice recommendations should stay learner-specific");
assert(playPracticeRecommendation.focus.indexOf("Land on A") !== -1, "Play should pass the repeat focus into Practice");

function createStudyStorage(initialValues) {{
  var values = initialValues || {{}};
  return {{
    values: values,
    getItem: function(key) {{ return this.values[key] || null; }},
    setItem: function(key, value) {{ this.values[key] = String(value); }},
    removeItem: function(key) {{ delete this.values[key]; }}
  }};
}}

globalThis.JOURNEY_STUDENT_COMPANIONS = JOURNEY_STUDENT_COMPANIONS;
globalThis.KNOWING = {{
  categories: [
    {{
      id: "rhythm",
      title: "Rhythm",
      description: "Time, pulse, and grouping.",
      topics: [{{ id: "time-signatures", title: "Time Signatures", source: "Test rhythm source" }}]
    }},
    {{
      id: "scales",
      title: "Scales",
      description: "Roots and note maps.",
      topics: [{{ id: "pentatonic", title: "Pentatonic Scale", source: "Test scale source" }}]
    }}
  ]
}};

var aMinorStudyStorage = createStudyStorage({{
  "hearth-journey-v2": JSON.stringify({{
    students: [{{ id: "jen", name: "Jen", levels: {{}} }}],
    activeStudentId: "jen"
  }})
}});
var aMinorStudy = StudyKeyChamberModel.snapshot({{ storage: aMinorStudyStorage }});
var aMinorStudyText = aMinorStudy.doors.map(function(door) {{
  return [door.action, door.activity, door.proof].join(" ");
}}).join(" ").toLowerCase();
assert(aMinorStudy.subject.subjectFamily === "scales", "A-minor pentatonic should resolve to the scales family");
assert(aMinorStudy.subject.activityTemplateId === "study-a-minor-pentatonic-v1", "A-minor pentatonic should keep its dedicated Study template");
assert(aMinorStudy.subject.usesGeneralFallback === false, "A-minor pentatonic should not use the general fallback");
assert(aMinorStudy.subject.recommendedDoor === "shape", "A-minor pentatonic should still recommend the Shape door");
assert(aMinorStudyText.indexOf("pentatonic") !== -1 && aMinorStudyText.indexOf("a root") !== -1, "A-minor pentatonic doors should retain root-note and pentatonic work");

var timeSignatureStudyStorage = createStudyStorage({{
  "hearth-journey-v2": JSON.stringify({{
    students: [{{ id: "alex", name: "Alex", levels: {{}} }}],
    activeStudentId: "alex"
  }}),
  "hearth-knowing-state": JSON.stringify({{ lastTopic: "time-signatures" }})
}});
var timeSignatureStudy = StudyKeyChamberModel.snapshot({{ storage: timeSignatureStudyStorage }});
var timeSignatureStudyText = timeSignatureStudy.doors.map(function(door) {{
  return [door.action, door.activity, door.proof].join(" ");
}}).join(" ").toLowerCase();
assert(timeSignatureStudy.subject.title === "Time Signatures", "Study should retain the Time Signatures subject title");
assert(timeSignatureStudy.subject.subjectFamily === "rhythm", "Time Signatures should resolve to the rhythm family");
assert(timeSignatureStudy.subject.activityTemplateId === "study-rhythm-family-v1", "Time Signatures should use the rhythm Study template");
assert(timeSignatureStudy.subject.usesGeneralFallback === false, "Time Signatures should not use the general fallback");
assert(timeSignatureStudyText.indexOf("beat") !== -1 && timeSignatureStudyText.indexOf("measure") !== -1, "Time Signatures doors should ask rhythm-specific work");
assert(!/pentatonic|tonal centre|a root|a minor phrase|fretboard/.test(timeSignatureStudyText), "Time Signatures doors must not leak A-minor pentatonic activities");
assert(timeSignatureStudy.doors.every(function(door) {{ return door.templateId === "study-rhythm-family-v1"; }}), "Every Time Signatures door should come from the rhythm template");
assert(timeSignatureStudy.doors[0].activity !== aMinorStudy.doors[0].activity, "Time Signatures and A-minor pentatonic should receive contrasting Word activities");

var completedTimeSignatureStudy = StudyKeyChamberModel.recordEvidence("word", {{
  feeling: "nailed",
  note: "I can count the beat grouping steadily."
}}, {{ storage: timeSignatureStudyStorage }});
var timeSignaturePracticeSnapshot = HearthPracticeEntryModel.buildSnapshot({{
  journeyState: {{ activeStudentId: "alex", students: [{{ id: "alex", name: "Alex", levels: {{}} }}] }},
  companions: {{}},
  events: [],
  studySnapshot: completedTimeSignatureStudy
}});
var timeSignaturePracticeText = [
  timeSignaturePracticeSnapshot.study && timeSignaturePracticeSnapshot.study.nextFocus,
  timeSignaturePracticeSnapshot.study && timeSignaturePracticeSnapshot.study.message
].concat(timeSignaturePracticeSnapshot.recommendations || []).join(" ").toLowerCase();
assert(timeSignaturePracticeSnapshot.study.nextFocus === "Apply Time Signatures in Practice", "A clear Time Signatures result should give Practice the matching subject");
assert(timeSignaturePracticeSnapshot.recommendations.indexOf("Apply Time Signatures in Practice") !== -1, "Practice recommendations should include the completed Time Signatures Study result");
assert(!/pentatonic|tonal centre|a root|a minor phrase/.test(timeSignaturePracticeText), "Time Signatures Practice handoff must not leak A-minor language");

function extractFunctionSource(source, name) {{
  var marker = "function " + name + "(";
  var start = source.indexOf(marker);
  assert(start !== -1, "Could not find Journey helper: " + name);
  var braceStart = source.indexOf("{{", start);
  var depth = 0;
  for (var index = braceStart; index < source.length; index++) {{
    if (source.charAt(index) === "{{") depth += 1;
    if (source.charAt(index) === "}}") depth -= 1;
    if (depth === 0) return source.slice(start, index + 1);
  }}
  throw new Error("Could not extract Journey helper: " + name);
}}

var originalJourneyWindow = globalThis.window;
var originalJourneyStorage = globalThis.localStorage;
globalThis.window = {{
  StudyKeyChamberModel: {{
    snapshot: function() {{ return completedTimeSignatureStudy; }}
  }}
}};
globalThis.localStorage = timeSignatureStudyStorage;
eval(extractFunctionSource(readText(root + "/assets/js/journey.js"), "journeyStudySignal"));
var timeSignatureJourneySignal = journeyStudySignal();
assert(timeSignatureJourneySignal.title === "Apply Time Signatures in Practice", "Journey should surface the correct completed Study subject");
assert(!/pentatonic|tonal centre|a root|a minor phrase/.test(timeSignatureJourneySignal.title + " " + timeSignatureJourneySignal.body), "Journey Study signal must not leak A-minor language");
globalThis.window = originalJourneyWindow;
globalThis.localStorage = originalJourneyStorage;

globalThis.KNOWING = {{
  categories: [{{
    id: "uncatalogued",
    title: "Uncatalogued",
    description: "A subject without an approved Study family.",
    topics: [{{ id: "experimental-idea", title: "Experimental Idea", source: "Test unknown source" }}]
  }}]
}};
var generalStudyStorage = createStudyStorage({{
  "hearth-journey-v2": JSON.stringify({{
    students: [{{ id: "casey", name: "Casey", levels: {{}} }}],
    activeStudentId: "casey"
  }}),
  "hearth-knowing-state": JSON.stringify({{ lastTopic: "experimental-idea" }})
}});
var generalStudy = StudyKeyChamberModel.snapshot({{ storage: generalStudyStorage }});
var generalStudyText = generalStudy.doors.map(function(door) {{ return door.activity; }}).join(" ").toLowerCase();
assert(generalStudy.subject.subjectFamily === "general", "An unknown subject should resolve to the general inquiry family");
assert(generalStudy.subject.activityTemplateId === "study-general-inquiry-v1", "An unknown subject should use the stable general inquiry template");
assert(generalStudy.subject.usesGeneralFallback === true, "An unknown subject should expose that it uses the general fallback");
assert(generalStudy.doors.every(function(door) {{ return door.activityLabel === "General inquiry" && door.usesGeneralFallback === true; }}), "Every unknown-subject door should be clearly labelled as a general inquiry");
assert(generalStudyText.indexOf("general inquiry") !== -1, "Unknown-subject activities should label the general inquiry in their instructions");
assert(!/pentatonic|tonal centre|a root|a minor phrase/.test(generalStudyText), "The general fallback must not leak A-minor pentatonic activities");
var publicStudyDefinitions = StudyKeyChamberModel.definitions();
assert(publicStudyDefinitions.every(function(door) {{ return door.usesGeneralFallback === true && door.activity; }}), "Public Study door definitions should remain complete and use the safe fallback without a subject");

var fakeStorage = {{
  values: {{}},
  getItem: function(key) {{
    return this.values[key] || null;
  }},
  setItem: function(key, value) {{
    this.values[key] = String(value);
  }},
  removeItem: function(key) {{
    delete this.values[key];
  }}
}};
var store = HearthBrowserProgressStore.createBrowserProgressStore({{
  progressCore: HearthLearnerProgress,
  storage: fakeStorage,
  storage_key: "test.progress"
}});
store.markLessonStarted("f-conversations", {{ now: "2026-07-04T00:05:00.000Z" }});
store.updateLessonStep("f-conversations", 4, {{ now: "2026-07-04T00:06:00.000Z" }});
var storedProgress = store.load();
assert(storedProgress.lessons["f-conversations"].status === "in_progress", "adapter should save progress");
assert(storedProgress.lessons["f-conversations"].last_step_index === 4, "adapter should save last step");
store.clear();
assert(store.load().lessons["f-conversations"] === undefined, "adapter should clear progress");

var progressBridgeStorage = {{
  values: {{}},
  getItem: function(key) {{ return this.values[key] || null; }},
  setItem: function(key, value) {{ this.values[key] = String(value); }},
  removeItem: function(key) {{ delete this.values[key]; }}
}};
var progressBridgeResult = HearthFoundationProgressBridge.markFoundationLessonCompleted(
  "f-first-conversation",
  {{ lesson_id: "f-conversations" }},
  {{ storage: progressBridgeStorage, now: "2026-07-04T00:10:00.000Z" }}
);
var legacyProgress = JSON.parse(progressBridgeStorage.values["hearth-foundation-progress"]);
var cleanProgress = JSON.parse(progressBridgeStorage.values["hearth.cleanProgress.v1"]);
assert(progressBridgeResult.lesson_id === "f-conversations", "progress bridge should return lesson id");
assert(legacyProgress["f-first-conversation"] === true, "progress bridge should write legacy topic progress");
assert(cleanProgress.lessons["f-conversations"].status === "completed", "progress bridge should write clean progress");
HearthFoundationProgressBridge.markFoundationTopicCompleted("f-threshold", {{
  storage: progressBridgeStorage
}});
legacyProgress = JSON.parse(progressBridgeStorage.values["hearth-foundation-progress"]);
assert(legacyProgress["f-threshold"] === true, "progress bridge should write fallback topic progress");

var controllerStore = HearthBrowserProgressStore.createBrowserProgressStore({{
  progressCore: HearthLearnerProgress,
  storage: fakeStorage,
  storage_key: "controller.progress"
}});
var controller = HearthTeachingEngineCoreAdapter.createTeachingLessonController({{
  seed: seed,
  progressStore: controllerStore
}});
controller.start({{ now: "2026-07-04T00:07:00.000Z" }});
var controllerState = controller.goToStep(2, {{ now: "2026-07-04T00:08:00.000Z" }});
assert(controllerState.view_model.current_step.type === "ask", "controller should expose ask view model");
var controllerAnswer = controller.answerChoice(1, {{ now: "2026-07-04T00:09:00.000Z" }});
assert(controllerAnswer.result.next_action === "reexplain", "controller should evaluate wrong answer");
var controllerProgress = controllerStore.load();
assert(controllerProgress.lessons["f-conversations"].wrong_answers === 1, "controller should record answer progress");

var directLessonController = HearthTeachingEngineCoreAdapter.createTeachingLessonController({{
  seed: seed.lesson
}});
var directLessonState = directLessonController.goToStep(2);
assert(directLessonState.lesson_id === "f-conversations", "controller should accept direct lesson objects");
assert(directLessonState.view_model.current_step.type === "ask", "direct lesson controller should expose current step");

"Core JS smoke check passed.";
"""

    result = subprocess.run(
        ["osascript", "-l", "JavaScript", "-e", script],
        check=False,
        capture_output=True,
        text=True,
    )

    if result.returncode != 0:
        print(result.stderr.strip() or result.stdout.strip())
        return result.returncode

    print(result.stdout.strip())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
