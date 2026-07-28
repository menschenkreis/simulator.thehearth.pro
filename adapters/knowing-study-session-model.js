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

  function assessmentOutcome(session, feeling) {
    if (!session || !session.cat || !session.topic) return null;
    var cat = session.cat;
    var topic = session.topic;
    var prevTopic = session.prevTopic;
    var nextTopic = session.nextTopic;

    if (feeling === "nailed") {
      if (nextTopic) {
        return {
          actionText: "You understand <strong>" + topic.title + "</strong>. Ready for <strong>" + nextTopic.title + "</strong>?",
          button: { label: "Study Next Concept", targetTopicId: nextTopic.id, tone: "next" },
          emoji: "\uD83D\uDCD6",
          markComplete: true,
          message: "Understood!"
        };
      }
      return {
        actionText: "You've completed all topics in <strong>" + cat.title + "</strong>! Pick another discipline.",
        button: { label: "\u2190 Study Lab", target: "study" },
        emoji: "\uD83D\uDCD6",
        markComplete: true,
        message: "Understood!"
      };
    }

    if (feeling === "review") {
      return {
        actionText: "Good call. Re-read <strong>" + topic.title + "</strong> - focus on the terms that felt unclear.",
        button: { label: "Study Again", targetTopicId: topic.id, tone: "review" },
        emoji: "\uD83D\uDD04",
        markComplete: false,
        message: "Let's review"
      };
    }

    if (feeling === "stuck" && prevTopic) {
      return {
        actionText: "Something didn't click. Was there a word in <strong>" + topic.title + "</strong> you didn't fully get? Go back to <strong>" + prevTopic.title + "</strong> - gaps are always built on earlier gaps.",
        button: { label: "Go Back: " + prevTopic.title, targetTopicId: prevTopic.id, tone: "stuck" },
        emoji: "\u2753",
        markComplete: false,
        message: "Missing something - going back"
      };
    }

    return {
      actionText: "Something's not clicking. Re-read slowly - if a word doesn't make sense, look it up. That's usually the barrier.",
      button: { label: "Try Again", targetTopicId: topic.id, tone: "review" },
      emoji: "\u2753",
      markComplete: false,
      message: "Missing something - going back"
    };
  }

  return {
    version: "0.1.0",
    assessmentOutcome: assessmentOutcome,
    categoryColor: categoryColor,
    difficultyLabel: difficultyLabel,
    topicContext: topicContext
  };
});
