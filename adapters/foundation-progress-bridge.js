/*
 * Foundation progress bridge v0.
 *
 * Keeps the current Foundation path UI working while also writing the clean
 * learner-progress record used by the rebuild.
 */
(function initFoundationProgressBridge(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthFoundationProgressBridge = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createFoundationProgressBridge(root) {
  "use strict";

  var LEGACY_STORAGE_KEY = "hearth-foundation-progress";

  function readLegacyProgress(storage) {
    storage = storage || root.localStorage;
    if (!storage) {
      return {};
    }

    try {
      return JSON.parse(storage.getItem(LEGACY_STORAGE_KEY) || "{}");
    } catch (error) {
      return {};
    }
  }

  function writeLegacyProgress(topicId, storage) {
    storage = storage || root.localStorage;
    var progress = readLegacyProgress(storage);

    progress[topicId] = true;

    if (storage) {
      storage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(progress));
    }

    return progress;
  }

  function markFoundationLessonCompleted(topicId, lessonInfo, options) {
    options = options || {};
    var storage = options.storage || root.localStorage;
    var legacyProgress = writeLegacyProgress(topicId, storage);
    var lessonId = lessonInfo && lessonInfo.lesson_id
      ? lessonInfo.lesson_id
      : lessonInfo && lessonInfo.lesson && lessonInfo.lesson.id;

    if (lessonId && root.HearthBrowserProgressStore && root.HearthLearnerProgress) {
      var store = options.progressStore || root.HearthBrowserProgressStore.createBrowserProgressStore({
        progressCore: root.HearthLearnerProgress,
        storage: storage
      });
      store.markLessonCompleted(lessonId, options);
    }

    return {
      topic_id: topicId,
      lesson_id: lessonId || null,
      legacy_progress: legacyProgress
    };
  }

  function markFoundationTopicCompleted(topicId, options) {
    options = options || {};
    return {
      topic_id: topicId,
      lesson_id: null,
      legacy_progress: writeLegacyProgress(topicId, options.storage || root.localStorage)
    };
  }

  return {
    version: "0.1.0",
    LEGACY_STORAGE_KEY: LEGACY_STORAGE_KEY,
    readLegacyProgress: readLegacyProgress,
    writeLegacyProgress: writeLegacyProgress,
    markFoundationTopicCompleted: markFoundationTopicCompleted,
    markFoundationLessonCompleted: markFoundationLessonCompleted
  };
});
