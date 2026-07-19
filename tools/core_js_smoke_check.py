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
eval(readText(root + "/adapters/progress-event-store.js"));
eval(readText(root + "/core/play-domain.js"));
eval(readText(root + "/assets/js/journey-data.js"));
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
assert(Object.keys(currentLevelOneActivities).length === 8, "Current Level 1 activities should all have capability mappings");
assert(currentLevelOneActivities["l1-entry-preflight"].countsTowardLevel === false, "Level 1 entry check should be classified as preflight");
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
  drill: {{ id: "pent-1", title: "A Minor Pentatonic Box 1", duration: "5 min" }},
  learnerId: "jen-1",
  state: "clean",
  level: 1,
  room: "left-hand"
}});
assert(doingFeedbackEvent.event_type === "drill_feedback_recorded", "Doing feedback should use the shared event vocabulary");
assert(doingFeedbackEvent.rating === 3 && doingFeedbackEvent.journey_level_id === "L1", "Doing feedback should preserve skill strength and level");
assert(doingFeedbackEvent.learner_id === "jen-1", "Doing feedback should explicitly preserve the active learner");
assert(doingFeedbackEvent.data.journey_categories.indexOf("Scales") !== -1, "Doing feedback should map into Journey categories");
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
assert(curatedDoing.catalog.approvedCount === 13, "Doing catalogue should expose the reviewed drill count");
assert(HearthDoingDrillCatalog.findDrill(curatedDoing, "alt-1").title.indexOf("One String") !== -1, "Doing catalogue should apply reviewed teaching data");
assert(HearthDoingDrillCatalog.findDrill(curatedDoing, "alt-2").reviewStatus === "draft", "Doing catalogue should preserve unreviewed drills as drafts");
assert(HearthDoingDrillCatalog.findDrill(curatedDoing, "chord-change-am-c").reviewStatus === "approved", "Doing catalogue should add reviewed chord drills");
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
var playPracticeRecommendation = HearthPlayDomain.createPracticeRecommendation(playResult);
assert(playPracticeRecommendation.learner_id === "jen", "Play Practice recommendations should stay learner-specific");
assert(playPracticeRecommendation.focus.indexOf("Land on A") !== -1, "Play should pass the repeat focus into Practice");

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
