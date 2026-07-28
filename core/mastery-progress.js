/*
 * Pure Mastery encounter evidence model.
 *
 * Witnessing, noticing, trying, choosing a direction, and reflecting are kept
 * separate so inspiration never masquerades as technical mastery.
 */
(function initMasteryProgress(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthMasteryProgress = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createMasteryProgress() {
  "use strict";

  var EVENT_TYPES = {
    started: "mastery_encounter_started",
    witnessed: "mastery_excerpt_witnessed",
    noticed: "mastery_choice_noticed",
    tried: "mastery_experiment_completed",
    carried: "mastery_direction_saved",
    reflected: "mastery_reflection_saved"
  };

  function clean(value) {
    return String(value == null ? "" : value).trim();
  }

  function cleanId(value, fallback) {
    var id = clean(value)
      .toLowerCase()
      .replace(/[^a-z0-9._:-]+/g, "-")
      .replace(/^-|-$/g, "");
    return id || fallback;
  }

  function buildEvent(options) {
    options = options || {};
    var kind = EVENT_TYPES[options.kind] ? options.kind : null;
    var state = options.state || {};
    var record = options.record || {};
    var learnerId = clean(options.learnerId || state.learnerId);
    if (!kind || !learnerId || !state.id || !record.id) return null;
    var timestamp = options.timestamp || new Date().toISOString();
    var suffix = cleanId(options.suffix || String(Date.now()), "event");
    var handoff = options.handoff || {};
    var isWitnessEvidence = ["witnessed", "noticed", "tried", "carried"].indexOf(kind) !== -1;
    var evidenceStage = kind === "tried" || kind === "carried" ? "attempt" : kind === "reflected" ? "demonstration" : "contact";
    var evidenceSource = kind === "reflected" ? "self_report" : kind === "tried" ? "self_report" : "direct_interaction";
    var destination = kind === "carried" && state.carriedTo ? cleanId(state.carriedTo, null) : null;
    var route = handoff.return_route && handoff.return_route.node_id && handoff.return_route.view_id
      ? {
        node_id: cleanId(handoff.return_route.node_id, "mastery"),
        view_id: cleanId(handoff.return_route.view_id, "review"),
        params: Object.assign({}, handoff.return_route.params || {})
      }
      : { node_id: "mastery", view_id: "review", params: { exemplar_id: record.id } };

    return {
      id: "mastery-" + cleanId(learnerId, "learner") + "-" + kind + "-" + suffix,
      version: 1,
      simulator_id: "hearth-guitar",
      event_type: EVENT_TYPES[kind],
      learner_id: learnerId,
      actor_role: "learner",
      node_id: "mastery",
      destination_node_id: destination,
      journey_level_id: "L" + Math.max(1, parseInt(record.level || "1", 10) || 1),
      category_id: cleanId(record.category, "artistic-example"),
      lesson_id: clean(handoff.lesson_id) ? cleanId(handoff.lesson_id, null) : null,
      activity_id: cleanId(handoff.activity_id || record.id, "mastery-encounter"),
      drill_id: null,
      capability_ids: isWitnessEvidence ? (Array.isArray(record.capabilityIds) ? record.capabilityIds.slice() : []) : [],
      attempt_id: kind === "tried" ? cleanId(state.id + "-try", null) : null,
      session_id: cleanId(state.id, null),
      evidence_stage: evidenceStage,
      evidence_source: evidenceSource,
      source_id: cleanId(record.id, null),
      project_id: null,
      recording_id: null,
      handoff_id: clean(handoff.id) ? cleanId(handoff.id, null) : null,
      duration_minutes: null,
      rating: null,
      note: kind === "reflected" ? clean(state.reflection) : "",
      occurred_at: timestamp,
      recorded_at: timestamp,
      created_at: timestamp,
      return_route: route,
      fallback_instruction: handoff.fallback_instruction || "Return to Mastery and reopen the current encounter.",
      data: {
        mastery_stage: kind,
        mastery_encounter_id: state.id,
        mastery_exemplar_id: record.id,
        notice: state.notice || null,
        try_idea: state.tryIdea || null,
        carried_to: state.carriedTo || null,
        reflection: kind === "reflected" ? state.reflection || "" : ""
      }
    };
  }

  return {
    version: "1.0.0",
    eventTypes: Object.assign({}, EVENT_TYPES),
    buildEvent: buildEvent
  };
});
