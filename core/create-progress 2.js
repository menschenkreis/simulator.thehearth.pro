/*
 * Pure Create artifact evidence model.
 *
 * A generated prompt is contact, not creative achievement. Capability evidence
 * appears only after the learner changes or adds a playable fragment and saves
 * the artifact.
 */
(function initCreateProgress(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthCreateProgress = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createCreateProgress() {
  "use strict";

  var EVENT_TYPES = {
    handoff_opened: "create_handoff_opened",
    started: "create_seed_started",
    mutated: "create_seed_mutated",
    saved: "create_seed_saved"
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

  function hasLearnerContribution(seed) {
    seed = seed || {};
    if (clean(seed.notes) || clean(seed.firstLyric) || clean(seed.rhythmIdea)) return true;
    var riff = clean(seed.riffIdea);
    var starter = clean(seed.sourceContext && seed.sourceContext.starter);
    return Boolean(riff && (!starter || riff !== starter));
  }

  function savedMetadata(seed) {
    var contributed = hasLearnerContribution(seed);
    return {
      status: contributed ? "saved" : "needs-another-session",
      needsAnotherSession: !contributed,
      nextAction: contributed
        ? "Play the fragment once and decide what you want to keep."
        : "Add one note, rhythm, riff, or lyric fragment of your own."
    };
  }

  function sourceValue(options, field) {
    var source = options.sourceContext || {};
    var handoff = options.handoff || {};
    if (options[field] != null && options[field] !== "") return options[field];
    if (source[field] != null && source[field] !== "") return source[field];
    return handoff[field] != null && handoff[field] !== "" ? handoff[field] : null;
  }

  function returnRoute(options) {
    var route = options.returnRoute || options.handoff && options.handoff.return_route;
    if (route && route.node_id && route.view_id && route.params && typeof route.params === "object") {
      return {
        node_id: cleanId(route.node_id, "create"),
        view_id: cleanId(route.view_id, "cauldron"),
        params: Object.assign({}, route.params)
      };
    }
    return {
      node_id: "create",
      view_id: "cauldron",
      params: options.projectId ? { project_id: options.projectId } : {}
    };
  }

  function buildEvent(options) {
    options = options || {};
    var kind = EVENT_TYPES[options.kind] ? options.kind : null;
    var learnerId = clean(options.learnerId);
    if (!kind || !learnerId) return null;
    var seed = options.seed || {};
    var timestamp = options.timestamp || new Date().toISOString();
    var suffix = cleanId(options.suffix || String(Date.now()), "event");
    var projectId = clean(options.projectId || seed.id) || null;
    var contributed = hasLearnerContribution(seed);
    var isSaved = kind === "saved";
    var sourceNodeId = clean(sourceValue(options, "source_node_id"));
    var sourceId = clean(sourceValue(options, "source_id"));
    var lessonId = clean(sourceValue(options, "lesson_id"));
    var journeyLevelId = clean(sourceValue(options, "journey_level_id")) || "L1";
    var handoffId = clean(options.handoffId || options.handoff && options.handoff.id) || null;
    var eventType = EVENT_TYPES[kind];

    return {
      id: "create-" + cleanId(learnerId, "learner") + "-" + kind + "-" + suffix,
      version: 1,
      simulator_id: "hearth-guitar",
      event_type: eventType,
      learner_id: learnerId,
      actor_role: "learner",
      node_id: "create",
      destination_node_id: isSaved ? "journey" : null,
      journey_level_id: cleanId(journeyLevelId, "L1").toUpperCase(),
      category_id: "creative-artifact",
      lesson_id: lessonId ? cleanId(lessonId, null) : null,
      activity_id: "create-song-seed",
      drill_id: null,
      capability_ids: isSaved && contributed ? ["L1-CREATE-01"] : [],
      attempt_id: isSaved && projectId ? "create-attempt-" + cleanId(projectId, suffix) : null,
      session_id: clean(sourceValue(options, "session_id")) || null,
      evidence_stage: isSaved && contributed ? "attempt" : "contact",
      evidence_source: isSaved ? "artifact" : "direct_interaction",
      source_id: sourceId ? cleanId(sourceId, null) : null,
      project_id: projectId ? cleanId(projectId, null) : null,
      recording_id: null,
      handoff_id: handoffId ? cleanId(handoffId, null) : null,
      duration_minutes: null,
      rating: null,
      note: isSaved
        ? (contributed ? "Saved a learner-shaped musical fragment." : "Saved a prompt without a learner-shaped fragment yet.")
        : "",
      occurred_at: timestamp,
      recorded_at: timestamp,
      created_at: timestamp,
      return_route: returnRoute(Object.assign({}, options, { projectId: projectId })),
      fallback_instruction: "Return to Create and reopen the saved song seed.",
      data: {
        create_stage: kind,
        has_learner_contribution: contributed,
        source_node_id: sourceNodeId || null,
        ingredients: Array.isArray(seed.ingredients) ? seed.ingredients.slice() : [],
        heat: seed.heat || null,
        mutation: options.mutation || seed.mutation || null,
        next_action: savedMetadata(seed).nextAction,
        needs_another_session: savedMetadata(seed).needsAnotherSession
      }
    };
  }

  function project(events, learnerId) {
    var saved = {};
    (Array.isArray(events) ? events : []).forEach(function readEvent(record) {
      var event = record && record.event ? record.event : record;
      if (!event || event.node_id !== "create" || event.event_type !== EVENT_TYPES.saved) return;
      if (String(event.learner_id || "") !== String(learnerId || "")) return;
      if (event.project_id) saved[event.project_id] = event;
    });
    return {
      learnerId: learnerId,
      savedProjects: Object.keys(saved).length,
      projects: saved
    };
  }

  return {
    version: "1.0.0",
    eventTypes: Object.assign({}, EVENT_TYPES),
    hasLearnerContribution: hasLearnerContribution,
    savedMetadata: savedMetadata,
    buildEvent: buildEvent,
    project: project
  };
});
