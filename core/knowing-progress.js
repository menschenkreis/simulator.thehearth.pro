/*
 * Pure KNOW evidence model.
 *
 * Opening, reading, answering, and applying are deliberately separate. The
 * model owns no DOM or storage, so a later backend can reuse the same rules.
 */
(function initKnowingProgress(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthKnowingProgress = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createKnowingProgress() {
  "use strict";

  var STAGES = ["opened", "read", "answered", "applied"];
  var EVENT_TYPES = {
    opened: "knowing_topic_opened",
    read: "knowing_topic_read",
    answered: "knowing_topic_answered",
    applied: "knowing_topic_applied"
  };

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
    if (STAGES.indexOf(data.knowledge_stage) !== -1) return data.knowledge_stage;
    return Object.keys(EVENT_TYPES).find(function findStage(stage) {
      return EVENT_TYPES[stage] === (event && event.event_type);
    }) || null;
  }

  function eventTopicId(event) {
    var data = event && event.data || {};
    return data.topic_id || event && (event.source_id || event.activity_id) || null;
  }

  function project(events, learnerId) {
    var topics = {};
    (Array.isArray(events) ? events : []).forEach(function readEvent(event) {
      if (!event || event.node_id !== "knowing" || String(event.learner_id || "") !== String(learnerId || "")) return;
      var stage = eventStage(event);
      var topicId = eventTopicId(event);
      if (!stage || !topicId) return;
      var previous = topics[topicId] || {
        topicId: topicId,
        stage: null,
        opened: false,
        read: false,
        answered: false,
        answeredCorrect: false,
        applied: false,
        latestAt: null
      };
      previous.opened = true;
      previous.read = previous.read || stageRank(stage) >= stageRank("read");
      previous.answered = previous.answered || stageRank(stage) >= stageRank("answered");
      previous.applied = previous.applied || stageRank(stage) >= stageRank("applied");
      previous.answeredCorrect = previous.answeredCorrect || Boolean(event.data && event.data.correct === true);
      if (stageRank(stage) > stageRank(previous.stage)) previous.stage = stage;
      previous.latestAt = event.occurred_at || event.created_at || previous.latestAt;
      topics[topicId] = previous;
    });
    return topics;
  }

  function buildEvent(options) {
    options = options || {};
    var stage = STAGES.indexOf(options.stage) === -1 ? null : options.stage;
    if (!stage || !options.learnerId || !options.topicId) return null;
    var timestamp = options.timestamp || new Date().toISOString();
    var suffix = cleanId(options.suffix || String(Date.now()), "event");
    var topicId = cleanId(options.topicId, "topic");
    var categoryId = cleanId(options.categoryId, "library");
    var isCorrectAnswer = stage === "answered" && options.correct === true;
    var evidenceSource = stage === "opened" ? "direct_interaction" : stage === "read" ? "self_report" : options.evidenceSource || "direct_interaction";
    var evidenceStage = stage === "applied" ? "application" : stage === "answered" ? "attempt" : "contact";

    return {
      id: "knowing-" + cleanId(options.learnerId, "learner") + "-" + topicId + "-" + stage + "-" + suffix,
      version: 1,
      simulator_id: "hearth-guitar",
      event_type: EVENT_TYPES[stage],
      learner_id: options.learnerId,
      actor_role: "learner",
      node_id: "knowing",
      destination_node_id: options.destinationNodeId || null,
      journey_level_id: options.journeyLevelId || "L1",
      category_id: categoryId,
      lesson_id: options.lessonId || null,
      activity_id: topicId,
      drill_id: null,
      capability_ids: isCorrectAnswer ? ["L1-KNOW-01"] : [],
      attempt_id: stage === "answered" ? "knowing-check-" + topicId + "-" + suffix : null,
      session_id: options.sessionId || null,
      evidence_stage: evidenceStage,
      evidence_source: evidenceSource,
      source_id: topicId,
      project_id: null,
      recording_id: null,
      handoff_id: options.handoffId || null,
      duration_minutes: null,
      rating: stage === "answered" ? (isCorrectAnswer ? 5 : 2) : null,
      note: options.note || "",
      occurred_at: timestamp,
      recorded_at: timestamp,
      created_at: timestamp,
      return_route: {
        node_id: "knowing",
        view_id: "topic",
        params: { category_id: categoryId, topic_id: topicId }
      },
      fallback_instruction: "Return to KNOW and reopen " + (options.topicTitle || topicId) + ".",
      data: {
        topic_id: topicId,
        topic_title: options.topicTitle || topicId,
        category_id: categoryId,
        knowledge_stage: stage,
        correct: stage === "answered" ? options.correct === true : null,
        answer_id: options.answerId || null
      }
    };
  }

  return {
    version: "1.0.0",
    stages: STAGES.slice(),
    eventTypes: Object.assign({}, EVENT_TYPES),
    stageRank: stageRank,
    project: project,
    buildEvent: buildEvent
  };
});
