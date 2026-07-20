/*
 * Foundation progress bridge.
 *
 * The old global checklist remains readable and untouched as historical data.
 * New Foundation progress is learner-scoped canonical evidence.
 */
(function initFoundationProgressBridge(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root, require("../core/foundation-progress.js"));
  } else {
    root.HearthFoundationProgressBridge = factory(root, root.HearthFoundationProgress);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createFoundationProgressBridge(root, progressModel) {
  "use strict";

  var LEGACY_STORAGE_KEY = "hearth-foundation-progress";

  function readJson(storage, key, fallback) {
    try {
      var value = storage && storage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (_error) {
      return fallback;
    }
  }

  function readLegacyProgress(storage) {
    return readJson(storage || root.localStorage, LEGACY_STORAGE_KEY, {});
  }

  /* Compatibility only. New Foundation code must not assign this ambiguous
   * global history to the currently selected learner. */
  function writeLegacyProgress(topicId, storage) {
    storage = storage || root.localStorage;
    var progress = readLegacyProgress(storage);
    progress[topicId] = true;
    if (storage) storage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(progress));
    return progress;
  }

  function activeLearner(storage) {
    var state = typeof root.getJourneyState === "function"
      ? root.getJourneyState()
      : readJson(storage || root.localStorage, "hearth-journey-v2", {});
    var students = state && Array.isArray(state.students) ? state.students : [];
    var learner = students.find(function findLearner(item) {
      return item.id === state.activeStudentId;
    }) || students[0] || null;
    return learner ? { id: learner.id, name: learner.name || "My Journey" } : null;
  }

  function eventList(storage) {
    return root.HearthProgressEvents && typeof root.HearthProgressEvents.list === "function"
      ? root.HearthProgressEvents.list(storage || root.localStorage)
      : [];
  }

  function topicIds(options) {
    if (options && Array.isArray(options.topicIds)) return options.topicIds.slice();
    return root.FOUNDATION && Array.isArray(root.FOUNDATION.topics)
      ? root.FOUNDATION.topics.map(function topicId(topic) { return topic.id; })
      : [];
  }

  function topicTitle(topicId) {
    var topics = root.FOUNDATION && Array.isArray(root.FOUNDATION.topics) ? root.FOUNDATION.topics : [];
    var topic = topics.find(function findTopic(item) { return item.id === topicId; });
    return topic && topic.title || topicId;
  }

  function projection(storage, learnerId) {
    storage = storage || root.localStorage;
    var learner = learnerId ? { id: learnerId } : activeLearner(storage);
    return progressModel && learner ? progressModel.project(eventList(storage), learner.id) : {};
  }

  function summary(storage, learnerId, options) {
    storage = storage || root.localStorage;
    var learner = learnerId ? { id: learnerId } : activeLearner(storage);
    return progressModel && learner
      ? progressModel.summarize(eventList(storage), learner.id, topicIds(options))
      : { topics: {}, completedTopicIds: [], completedCount: 0, totalCount: topicIds(options).length, nextTopicId: null, pathCompleted: false };
  }

  function readProgress(storage) {
    var topics = projection(storage);
    var completed = {};
    Object.keys(topics).forEach(function markCompleted(topicId) {
      completed[topicId] = Boolean(topics[topicId] && topics[topicId].orientationCompleted);
    });
    return completed;
  }

  function shouldRecord(existing, stage, correct) {
    if (!existing) return true;
    if (stage === "answered" && correct === true && !existing.answeredCorrect) return true;
    return progressModel.stageRank(existing.stage) < progressModel.stageRank(stage);
  }

  function recordStage(options) {
    options = options || {};
    var storage = options.storage || root.localStorage;
    var learner = activeLearner(storage);
    if (!learner || !progressModel || !root.HearthProgressEvents) return null;
    var existing = projection(storage, learner.id)[options.topicId];
    if (!shouldRecord(existing, options.stage, options.correct)) {
      return { ok: true, status: "already_recorded", event: null, errors: [] };
    }
    var event = progressModel.buildEvent({
      learnerId: learner.id,
      stage: options.stage,
      topicId: options.topicId,
      topicTitle: options.topicTitle || topicTitle(options.topicId),
      lessonId: options.lessonId || null,
      sessionId: options.sessionId || null,
      correct: options.correct,
      suffix: options.suffix || String(Date.now()) + "-" + Math.random().toString(36).slice(2, 6),
      timestamp: options.timestamp,
      note: options.note || ""
    });
    if (!event) return null;
    return typeof root.HearthProgressEvents.appendCanonical === "function"
      ? root.HearthProgressEvents.appendCanonical(event, storage)
      : root.HearthProgressEvents.append(event, storage);
  }

  function appendPathCompletionIfReady(options) {
    options = options || {};
    var storage = options.storage || root.localStorage;
    var learner = activeLearner(storage);
    var ids = topicIds(options);
    if (!learner || !ids.length || !progressModel || !root.HearthProgressEvents) return null;
    var current = progressModel.summarize(eventList(storage), learner.id, ids);
    if (current.completedCount !== ids.length || current.pathCompleted) return null;
    var event = progressModel.buildPathEvent({
      learnerId: learner.id,
      topicIds: ids,
      sessionId: options.sessionId || null,
      suffix: options.suffix || String(Date.now()) + "-" + Math.random().toString(36).slice(2, 6),
      timestamp: options.timestamp
    });
    return typeof root.HearthProgressEvents.appendCanonical === "function"
      ? root.HearthProgressEvents.appendCanonical(event, storage)
      : root.HearthProgressEvents.append(event, storage);
  }

  function scoresContainCorrectAnswer(scores) {
    return Object.keys(scores || {}).some(function hasCorrect(concept) {
      return Number(scores[concept] && scores[concept].right || 0) > 0;
    });
  }

  function markFoundationLessonCompleted(topicId, lessonInfo, options) {
    options = options || {};
    var lessonId = lessonInfo && lessonInfo.lesson_id
      ? lessonInfo.lesson_id
      : lessonInfo && lessonInfo.lesson && lessonInfo.lesson.id || null;
    var writes = [];
    writes.push(recordStage(Object.assign({}, options, {
      stage: "experienced",
      topicId: topicId,
      lessonId: lessonId
    })));
    if (scoresContainCorrectAnswer(options.scores)) {
      writes.push(recordStage(Object.assign({}, options, {
        stage: "answered",
        topicId: topicId,
        lessonId: lessonId,
        correct: true
      })));
    }
    writes.push(recordStage(Object.assign({}, options, {
      stage: "orientation_completed",
      topicId: topicId,
      lessonId: lessonId
    })));
    var pathEvent = appendPathCompletionIfReady(options);
    return {
      topic_id: topicId,
      lesson_id: lessonId,
      evidence_results: writes,
      path_event: pathEvent,
      legacy_progress: readLegacyProgress(options.storage || root.localStorage)
    };
  }

  function markFoundationTopicCompleted(topicId, options) {
    options = options || {};
    var result = recordStage(Object.assign({}, options, {
      stage: "orientation_completed",
      topicId: topicId
    }));
    return {
      topic_id: topicId,
      lesson_id: null,
      evidence_results: [result],
      path_event: appendPathCompletionIfReady(options),
      legacy_progress: readLegacyProgress(options.storage || root.localStorage)
    };
  }

  function recordTopicOpened(topicId, options) {
    return recordStage(Object.assign({}, options || {}, { stage: "opened", topicId: topicId }));
  }

  function recordTopicStep(topicId, stepLabel, options) {
    var label = String(stepLabel || "").toLowerCase();
    if (label === "experience" || label === "apply" || label === "own") {
      return recordStage(Object.assign({}, options || {}, { stage: "experienced", topicId: topicId }));
    }
    return recordTopicOpened(topicId, options);
  }

  return {
    version: "1.0.0",
    LEGACY_STORAGE_KEY: LEGACY_STORAGE_KEY,
    activeLearner: activeLearner,
    readLegacyProgress: readLegacyProgress,
    writeLegacyProgress: writeLegacyProgress,
    projection: projection,
    summary: summary,
    readProgress: readProgress,
    recordStage: recordStage,
    recordTopicOpened: recordTopicOpened,
    recordTopicStep: recordTopicStep,
    markFoundationTopicCompleted: markFoundationTopicCompleted,
    markFoundationLessonCompleted: markFoundationLessonCompleted
  };
});
