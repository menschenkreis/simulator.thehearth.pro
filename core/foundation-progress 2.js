/*
 * Pure Foundation evidence model.
 *
 * Foundation is orientation before Journey Level 1. Contact, experience,
 * answers, and completion remain separate so opening a fret cannot become
 * false readiness. This module owns no browser storage or DOM.
 */
(function initFoundationProgress(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthFoundationProgress = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createFoundationProgress() {
  "use strict";

  var STAGES = ["opened", "experienced", "answered", "orientation_completed"];
  var EVENT_TYPES = {
    opened: "foundation_topic_opened",
    experienced: "foundation_topic_experienced",
    answered: "foundation_topic_answered",
    orientation_completed: "foundation_orientation_completed"
  };
  var PATH_EVENT_TYPE = "foundation_path_completed";

  function cleanId(value, fallback) {
    var id = String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9._:-]+/g, "-")
      .replace(/^-|-$/g, "");
    return id || fallback;
  }

  function stageRank(stage) {
    var index = STAGES.indexOf(stage);
    return index < 0 ? -1 : index;
  }

  function eventStage(event) {
    var data = event && event.data || {};
    if (STAGES.indexOf(data.foundation_stage) !== -1) return data.foundation_stage;
    return Object.keys(EVENT_TYPES).find(function findStage(stage) {
      return EVENT_TYPES[stage] === (event && event.event_type);
    }) || null;
  }

  function eventTopicId(event) {
    var data = event && event.data || {};
    return data.topic_id || event && (event.activity_id || event.source_id) || null;
  }

  function project(events, learnerId) {
    var topics = {};
    (Array.isArray(events) ? events : []).forEach(function readEvent(event) {
      if (!event || event.node_id !== "foundation" || String(event.learner_id || "") !== String(learnerId || "")) return;
      var stage = eventStage(event);
      var topicId = eventTopicId(event);
      if (!stage || !topicId) return;
      var previous = topics[topicId] || {
        topicId: topicId,
        stage: null,
        opened: false,
        experienced: false,
        answered: false,
        answeredCorrect: false,
        orientationCompleted: false,
        latestAt: null
      };
      previous.opened = true;
      previous.experienced = previous.experienced || stageRank(stage) >= stageRank("experienced");
      previous.answered = previous.answered || stageRank(stage) >= stageRank("answered");
      previous.orientationCompleted = previous.orientationCompleted || stage === "orientation_completed";
      previous.answeredCorrect = previous.answeredCorrect || Boolean(event.data && event.data.correct === true);
      if (stageRank(stage) > stageRank(previous.stage)) previous.stage = stage;
      previous.latestAt = event.occurred_at || event.created_at || previous.latestAt;
      topics[topicId] = previous;
    });
    return topics;
  }

  function pathCompleted(events, learnerId) {
    return (Array.isArray(events) ? events : []).some(function isPathCompletion(event) {
      return event && event.node_id === "foundation" && event.event_type === PATH_EVENT_TYPE &&
        String(event.learner_id || "") === String(learnerId || "");
    });
  }

  function summarize(events, learnerId, topicIds) {
    var topics = project(events, learnerId);
    var orderedIds = Array.isArray(topicIds) ? topicIds.slice() : [];
    var completedIds = orderedIds.filter(function completed(topicId) {
      return Boolean(topics[topicId] && topics[topicId].orientationCompleted);
    });
    var nextTopicId = orderedIds.find(function incomplete(topicId) {
      return !topics[topicId] || !topics[topicId].orientationCompleted;
    }) || null;
    return {
      topics: topics,
      completedTopicIds: completedIds,
      completedCount: completedIds.length,
      totalCount: orderedIds.length,
      nextTopicId: nextTopicId,
      pathCompleted: pathCompleted(events, learnerId)
    };
  }

  function buildEvent(options) {
    options = options || {};
    var stage = STAGES.indexOf(options.stage) === -1 ? null : options.stage;
    if (!stage || !options.learnerId || !options.topicId) return null;
    var timestamp = options.timestamp || new Date().toISOString();
    var suffix = cleanId(options.suffix || String(Date.now()), "event");
    var topicId = cleanId(options.topicId, "topic");
    var answered = stage === "answered";

    return {
      id: "foundation-" + cleanId(options.learnerId, "learner") + "-" + topicId + "-" + stage + "-" + suffix,
      version: 1,
      simulator_id: "hearth-guitar",
      event_type: EVENT_TYPES[stage],
      learner_id: options.learnerId,
      actor_role: "learner",
      node_id: "foundation",
      destination_node_id: null,
      journey_level_id: null,
      category_id: "orientation",
      lesson_id: options.lessonId || null,
      activity_id: topicId,
      drill_id: null,
      capability_ids: [],
      attempt_id: answered ? "foundation-answer-" + topicId + "-" + suffix : null,
      session_id: options.sessionId || null,
      evidence_stage: stage === "orientation_completed" ? "demonstration" : stage === "opened" ? "contact" : "attempt",
      evidence_source: stage === "experienced" ? "self_report" : "direct_interaction",
      source_id: topicId,
      project_id: null,
      recording_id: null,
      handoff_id: null,
      duration_minutes: null,
      rating: answered ? (options.correct === true ? 5 : 2) : null,
      note: options.note || "",
      occurred_at: timestamp,
      recorded_at: timestamp,
      created_at: timestamp,
      return_route: {
        node_id: "foundation",
        view_id: "topic",
        params: { topic_id: topicId }
      },
      fallback_instruction: "Return to Foundation and reopen " + (options.topicTitle || topicId) + ".",
      data: {
        topic_id: topicId,
        topic_title: options.topicTitle || topicId,
        foundation_stage: stage,
        correct: answered ? options.correct === true : null
      }
    };
  }

  function buildPathEvent(options) {
    options = options || {};
    if (!options.learnerId) return null;
    var timestamp = options.timestamp || new Date().toISOString();
    var suffix = cleanId(options.suffix || String(Date.now()), "event");
    return {
      id: "foundation-" + cleanId(options.learnerId, "learner") + "-path-completed-" + suffix,
      version: 1,
      simulator_id: "hearth-guitar",
      event_type: PATH_EVENT_TYPE,
      learner_id: options.learnerId,
      actor_role: "learner",
      node_id: "foundation",
      destination_node_id: "journey",
      journey_level_id: "L1",
      category_id: "orientation",
      lesson_id: null,
      activity_id: "foundation-threshold",
      drill_id: null,
      capability_ids: ["L1-PREP-01"],
      attempt_id: null,
      session_id: options.sessionId || null,
      evidence_stage: "demonstration",
      evidence_source: "direct_interaction",
      source_id: "foundation-threshold",
      project_id: null,
      recording_id: null,
      handoff_id: null,
      duration_minutes: null,
      rating: null,
      note: "Completed the ten-part Foundation orientation path.",
      occurred_at: timestamp,
      recorded_at: timestamp,
      created_at: timestamp,
      return_route: {
        node_id: "foundation",
        view_id: "map",
        params: {}
      },
      fallback_instruction: "Return to the Foundation neck, then open Journey Level 1.",
      data: {
        foundation_stage: "path_completed",
        completed_topic_ids: Array.isArray(options.topicIds) ? options.topicIds.slice() : []
      }
    };
  }

  return {
    version: "1.0.0",
    stages: STAGES.slice(),
    eventTypes: Object.assign({}, EVENT_TYPES),
    pathEventType: PATH_EVENT_TYPE,
    stageRank: stageRank,
    project: project,
    pathCompleted: pathCompleted,
    summarize: summarize,
    buildEvent: buildEvent,
    buildPathEvent: buildPathEvent
  };
});
