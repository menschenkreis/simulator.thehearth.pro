/*
 * Knowing progress controller adapter v0.
 *
 * Updates legacy Knowing topic progress.
 */
(function initKnowingProgressController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthKnowingProgressController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createKnowingProgressController(root) {
  "use strict";

  var progressKey = "hearth-knowing-progress";

  function readProgress(storage) {
    storage = storage || root.localStorage;
    if (!storage) return {};
    return JSON.parse(storage.getItem(progressKey) || "{}");
  }

  function writeProgress(storage, progress) {
    storage = storage || root.localStorage;
    if (!storage) return;
    storage.setItem(progressKey, JSON.stringify(progress || {}));
  }

  function markTopic(options) {
    options = options || {};
    var topicId = options.topicId;
    if (!topicId) return {};
    var storage = options.storage || root.localStorage;
    var progress = readProgress(storage);
    progress[topicId] = true;
    writeProgress(storage, progress);
    return progress;
  }

  function bindProgressGlobals(options) {
    options = options || {};
    var storage = options.storage || root.localStorage;
    var playSfx = options.playSfx || root.playSfx;
    var showTopic = options.showTopic || root.showKnowingTopic;
    root.markKnowingTopic = function markKnowingTopic(catId, topicId) {
      markTopic({ topicId: topicId, storage: storage });
      if (typeof playSfx === "function") playSfx("success");
      if (typeof showTopic === "function") showTopic(catId, topicId);
    };
  }

  return {
    version: "0.1.0",
    bindProgressGlobals: bindProgressGlobals,
    markTopic: markTopic,
    readProgress: readProgress,
    writeProgress: writeProgress
  };
});
