/*
 * Knowing level model adapter v0.
 *
 * Groups Knowing topics into the 8-level bookshelf roadmap.
 */
(function initKnowingLevelModel(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthKnowingLevelModel = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createKnowingLevelModel(root) {
  "use strict";

  var levelDefinitions = [
    { level: 1, label: "Level I", sub: "Foundations", color: "#c47a3a" },
    { level: 2, label: "Level II", sub: "Development", color: "#4A6741" },
    { level: 3, label: "Level III", sub: "Systems", color: "#5B3A6B" },
    { level: 4, label: "Level IV", sub: "Navigation", color: "#2C5F7C" },
    { level: 5, label: "Level V", sub: "Expansion", color: "#8B6914" },
    { level: 6, label: "Level VI", sub: "Advanced Harmony", color: "#6B3A3A" },
    { level: 7, label: "Level VII", sub: "Modal Fluency", color: "#3A5B6B" },
    { level: 8, label: "Level VIII", sub: "Mastery", color: "#6B5B3A" }
  ];

  function defaultTopicLevel(topic) {
    var match = String((topic && topic.source) || "").match(/\bQJam\s*L([1-8])\b/i);
    if (match) return parseInt(match[1], 10);
    return Math.max(1, Math.min(8, (topic && topic.difficulty) || 1));
  }

  function topicLevel(topic) {
    var levelFn = root.getKnowingTopicLevel || defaultTopicLevel;
    return levelFn(topic);
  }

  function buildLevels(knowing, completed) {
    completed = completed || {};
    var categories = (knowing && knowing.categories) || [];
    var levels = levelDefinitions.map(function cloneLevel(level) {
      return {
        level: level.level,
        label: level.label,
        sub: level.sub,
        color: level.color,
        categories: []
      };
    });

    levels.forEach(function fillLevel(level) {
      categories.forEach(function mapCategory(cat) {
        var topics = (cat.topics || []).filter(function atLevel(topic) {
          return topicLevel(topic) === level.level;
        });
        var done = topics.filter(function isDone(topic) {
          return completed[topic.id];
        }).length;
        var category = {};
        Object.keys(cat).forEach(function copyKey(key) {
          category[key] = cat[key];
        });
        category.topics = topics;
        category.done = done;
        category.total = topics.length;
        category.hasTopics = topics.length > 0;
        level.categories.push(category);
      });
      level.totalTopics = level.categories.reduce(function sumTopics(total, cat) {
        return total + cat.total;
      }, 0);
      level.totalDone = level.categories.reduce(function sumDone(total, cat) {
        return total + cat.done;
      }, 0);
    });

    return levels;
  }

  function recommendedLevel(levels) {
    var recommended = 1;
    for (var index = 0; index < levels.length - 1; index++) {
      var level = levels[index];
      if (recommended >= level.level && (level.totalTopics === 0 || level.totalDone / level.totalTopics >= 0.5)) {
        recommended = levels[index + 1].level;
      }
    }
    return recommended;
  }

  return {
    version: "0.1.0",
    buildLevels: buildLevels,
    defaultTopicLevel: defaultTopicLevel,
    levelDefinitions: levelDefinitions,
    recommendedLevel: recommendedLevel,
    topicLevel: topicLevel
  };
});
