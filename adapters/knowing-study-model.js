/*
 * Knowing study model adapter v0.
 *
 * Calculates dashboard progress and next-study topic for the legacy Study view.
 */
(function initKnowingStudyModel(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthKnowingStudyModel = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createKnowingStudyModel() {
  "use strict";

  function summarizeProgress(knowing, completed, quizScores) {
    completed = completed || {};
    quizScores = quizScores || {};
    var totalTopics = 0;
    var doneTopics = 0;
    var quizPassed = 0;
    var categories = (knowing && knowing.categories) || [];

    categories.forEach(function countCategory(cat) {
      totalTopics += (cat.topics || []).length;
      (cat.topics || []).forEach(function countTopic(topic) {
        if (completed[topic.id]) doneTopics++;
        if (quizScores[topic.id] && quizScores[topic.id].passed) quizPassed++;
      });
    });

    return {
      disciplineCount: categories.length,
      doneTopics: doneTopics,
      percent: totalTopics ? Math.round(doneTopics / totalTopics * 100) : 0,
      quizPassed: quizPassed,
      totalTopics: totalTopics
    };
  }

  function findTopicById(knowing, topicId) {
    var categories = (knowing && knowing.categories) || [];
    for (var catIndex = 0; catIndex < categories.length; catIndex++) {
      var cat = categories[catIndex];
      var topic = (cat.topics || []).find(function isTopic(item) {
        return item.id === topicId;
      });
      if (topic) return { cat: cat, topic: topic };
    }
    return null;
  }

  function firstIncompleteTopic(knowing, completed) {
    completed = completed || {};
    var categories = (knowing && knowing.categories) || [];
    for (var catIndex = 0; catIndex < categories.length; catIndex++) {
      var cat = categories[catIndex];
      var topic = (cat.topics || []).find(function isIncomplete(item) {
        return !completed[item.id];
      });
      if (topic) return { cat: cat, topic: topic };
    }
    return null;
  }

  function previousTopic(cat, topic) {
    var topics = (cat && cat.topics) || [];
    var index = topics.indexOf(topic);
    return index > 0 ? topics[index - 1] : null;
  }

  function dashboardState(knowing, completed, kState, quizScores) {
    kState = kState || {};
    var current = kState.lastTopic ? findTopicById(knowing, kState.lastTopic) : null;
    if (!current) current = firstIncompleteTopic(knowing, completed);
    var summary = summarizeProgress(knowing, completed, quizScores);
    return {
      currentCat: current ? current.cat : null,
      currentTopic: current ? current.topic : null,
      previousTopic: current ? previousTopic(current.cat, current.topic) : null,
      summary: summary
    };
  }

  return {
    version: "0.1.0",
    dashboardState: dashboardState,
    findTopicById: findTopicById,
    firstIncompleteTopic: firstIncompleteTopic,
    previousTopic: previousTopic,
    summarizeProgress: summarizeProgress
  };
});
