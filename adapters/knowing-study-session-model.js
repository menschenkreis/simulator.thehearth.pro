/*
 * Knowing study session model adapter v0.
 *
 * Resolves topic context for the legacy Study Session view.
 */
(function initKnowingStudySessionModel(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthKnowingStudySessionModel = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createKnowingStudySessionModel(root) {
  "use strict";

  function categoryColor(knowing, cat) {
    if (root.HearthKnowingBookViewer) {
      return root.HearthKnowingBookViewer.categoryColor(knowing, cat);
    }
    var colors = ["#8B4513", "#4A6741", "#5B3A6B", "#2C5F7C", "#8B6914", "#6B3A3A", "#3A5B6B", "#5B4A3A", "#6B5B3A", "#3A4A6B"];
    var index = ((knowing && knowing.categories) || []).indexOf(cat);
    return colors[Math.max(0, index) % colors.length];
  }

  function difficultyLabel(difficulty) {
    return ["", "BEGINNER", "INTERMEDIATE", "ADVANCED"][difficulty] || "";
  }

  function topicContext(knowing, catId, topicId, completed) {
    completed = completed || {};
    var categories = (knowing && knowing.categories) || [];
    var cat = categories.find(function isCategory(item) {
      return item.id === catId;
    });
    if (!cat) return null;

    var topics = cat.topics || [];
    var topic = topics.find(function isTopic(item) {
      return item.id === topicId;
    });
    if (!topic) return null;

    var topicIndex = topics.indexOf(topic);
    return {
      cat: cat,
      color: categoryColor(knowing, cat),
      difficultyLabel: difficultyLabel(topic.difficulty),
      isDone: completed[topicId],
      nextTopic: topicIndex >= 0 && topicIndex < topics.length - 1 ? topics[topicIndex + 1] : null,
      prevTopic: topicIndex > 0 ? topics[topicIndex - 1] : null,
      topic: topic,
      topicIndex: topicIndex
    };
  }

  return {
    version: "0.1.0",
    categoryColor: categoryColor,
    difficultyLabel: difficultyLabel,
    topicContext: topicContext
  };
});
