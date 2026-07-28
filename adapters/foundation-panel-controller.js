/*
 * Foundation panel controller adapter v0.
 *
 * Handles opening the Foundation panel and choosing the next Foundation topic
 * while the map rendering itself stays in the map viewer adapter.
 */
(function initFoundationPanelController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthFoundationPanelController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createFoundationPanelController(root) {
  "use strict";

  function readLegacyProgress() {
    if (root.HearthFoundationProgressBridge) {
      return root.HearthFoundationProgressBridge.readLegacyProgress();
    }
    return JSON.parse(root.localStorage.getItem("hearth-foundation-progress") || "{}");
  }

  function showFoundation() {
    Array.prototype.forEach.call(root.document.querySelectorAll(".pnl"), function hidePanel(panel) {
      panel.classList.remove("on");
    });

    var targetEl = root.document.getElementById("p-foundation");
    targetEl.classList.add("on");

    var foundation = root.FOUNDATION;
    if (!foundation) {
      return null;
    }

    if (root.HearthFoundationMapViewer) {
      return root.HearthFoundationMapViewer.renderFoundationMap({
        foundation: foundation,
        targetEl: targetEl,
        completed: readLegacyProgress()
      });
    }
    return null;
  }

  function startFoundationLesson(topicId) {
    if (typeof root.showFoundationTopic === "function") {
      return root.showFoundationTopic(topicId);
    }
    return null;
  }

  function startLesson1() {
    var foundation = root.FOUNDATION;
    if (!foundation) {
      return null;
    }

    var completed = readLegacyProgress();
    var nextTopic = foundation.topics.find(function findNext(topic) {
      return !completed[topic.id];
    });
    var topicId = nextTopic ? nextTopic.id : "f-how-to-learn";
    return startFoundationLesson(topicId);
  }

  return {
    version: "0.1.0",
    readLegacyProgress: readLegacyProgress,
    showFoundation: showFoundation,
    startFoundationLesson: startFoundationLesson,
    startLesson1: startLesson1
  };
});
