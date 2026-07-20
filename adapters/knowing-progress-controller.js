/*
 * KNOW progress controller.
 *
 * The old global topic ticks remain untouched for historical safety. New
 * progress is projected from learner-scoped canonical events.
 */
(function initKnowingProgressController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root, require("../core/knowing-progress.js"));
  } else {
    root.HearthKnowingProgressController = factory(root, root.HearthKnowingProgress);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createKnowingProgressController(root, progressModel) {
  "use strict";

  var LEGACY_PROGRESS_KEY = "hearth-knowing-progress";
  var LEGACY_STATE_KEY = "hearth-knowing-state";

  function readJson(storage, key, fallback) {
    try {
      var value = storage && storage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (_error) {
      return fallback;
    }
  }

  function writeJson(storage, key, value) {
    if (!storage || typeof storage.setItem !== "function") return false;
    try {
      storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_error) {
      return false;
    }
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

  function readLegacyProgress(storage) {
    return readJson(storage || root.localStorage, LEGACY_PROGRESS_KEY, {});
  }

  function topicProjection(storage, learnerId) {
    storage = storage || root.localStorage;
    var learner = learnerId ? { id: learnerId } : activeLearner(storage);
    var events = root.HearthProgressEvents && typeof root.HearthProgressEvents.list === "function"
      ? root.HearthProgressEvents.list(storage)
      : [];
    return progressModel && learner ? progressModel.project(events, learner.id) : {};
  }

  function readProgress(storage) {
    var projection = topicProjection(storage);
    var visited = {};
    Object.keys(projection).forEach(function markVisited(topicId) {
      visited[topicId] = Boolean(projection[topicId] && projection[topicId].opened);
    });
    return visited;
  }

  function rememberTopic(topicId, storage) {
    storage = storage || root.localStorage;
    var state = readJson(storage, LEGACY_STATE_KEY, {});
    state.lastTopic = topicId;
    writeJson(storage, LEGACY_STATE_KEY, state);
  }

  function recordStage(options) {
    options = options || {};
    var storage = options.storage || root.localStorage;
    var learner = activeLearner(storage);
    if (!learner || !progressModel || !root.HearthProgressEvents) return null;
    var event = progressModel.buildEvent({
      learnerId: learner.id,
      stage: options.stage,
      categoryId: options.catId,
      topicId: options.topicId,
      topicTitle: options.topicTitle,
      correct: options.correct,
      answerId: options.answerId,
      destinationNodeId: options.destinationNodeId || null,
      suffix: options.suffix || String(Date.now()) + "-" + Math.random().toString(36).slice(2, 6),
      timestamp: options.timestamp,
      note: options.note || ""
    });
    if (!event) return null;
    rememberTopic(options.topicId, storage);
    return typeof root.HearthProgressEvents.appendCanonical === "function"
      ? root.HearthProgressEvents.appendCanonical(event, storage)
      : root.HearthProgressEvents.append(event, storage);
  }

  function findTopic(catId, topicId) {
    var knowing = root.KNOWING || { categories: [] };
    var cat = (knowing.categories || []).find(function findCategory(item) { return item.id === catId; });
    var topic = cat && (cat.topics || []).find(function findTopicItem(item) { return item.id === topicId; });
    return cat && topic ? { cat: cat, topic: topic } : null;
  }

  function sendToStudy(catId, topicId, storage) {
    storage = storage || root.localStorage;
    var found = findTopic(catId, topicId);
    var learner = activeLearner(storage);
    if (!found || !learner) return false;
    recordStage({
      stage: "read",
      catId: catId,
      topicId: topicId,
      topicTitle: found.topic.title,
      destinationNodeId: "study",
      storage: storage
    });
    rememberTopic(topicId, storage);

    if (root.StudyKeyChamberModel && typeof root.StudyKeyChamberModel.setSubject === "function") {
      root.StudyKeyChamberModel.setSubject({
        id: topicId,
        title: found.topic.title,
        summary: found.cat.description || "Make this idea clear enough to use.",
        source: found.topic.source || "KNOW",
        categoryId: catId,
        topicId: topicId,
        recommendedDoor: catId === "scales" ? "shape" : "word"
      }, { storage: storage });
    }
    if (typeof root.closeBook === "function") root.closeBook(true);
    if (typeof root.showStudy === "function") root.showStudy();
    return true;
  }

  function bindProgressGlobals(options) {
    options = options || {};
    var storage = options.storage || root.localStorage;
    var playSfx = options.playSfx || root.playSfx;
    var showTopic = options.showTopic || root.showKnowingTopic;
    root.markKnowingTopic = function markKnowingTopic(catId, topicId) {
      var found = findTopic(catId, topicId);
      recordStage({ stage: "read", catId: catId, topicId: topicId, topicTitle: found && found.topic.title, storage: storage });
      if (typeof playSfx === "function") playSfx("success");
      if (typeof showTopic === "function") showTopic(catId, topicId);
    };
    root.answerKnowingTopic = function answerKnowingTopic(catId, topicId, answerId, correct) {
      var found = findTopic(catId, topicId);
      return recordStage({
        stage: "answered",
        catId: catId,
        topicId: topicId,
        topicTitle: found && found.topic.title,
        answerId: answerId,
        correct: correct === true,
        storage: storage
      });
    };
    root.openKnowingTopicInStudy = function openKnowingTopicInStudy(catId, topicId) {
      return sendToStudy(catId, topicId, storage);
    };
  }

  return {
    version: "1.0.0",
    legacyProgressKey: LEGACY_PROGRESS_KEY,
    activeLearner: activeLearner,
    bindProgressGlobals: bindProgressGlobals,
    readLegacyProgress: readLegacyProgress,
    readProgress: readProgress,
    recordStage: recordStage,
    sendToStudy: sendToStudy,
    topicProjection: topicProjection
  };
});
