/*
 * Foundation lesson launcher adapter v0.
 *
 * Resolves a Foundation topic into the lesson object TeachingEngine should
 * start. It prefers clean route + seed data, and falls back to legacy lesson
 * globals when direct seed loading is unavailable.
 */
(function initFoundationLessonLauncher(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthFoundationLessonLauncher = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createFoundationLessonLauncher(root) {
  "use strict";

  var LABEL_BY_TOPIC_ID = {
    "f-threshold": "THE THRESHOLD",
    "f-how-to-learn": "BLOCK 01 - HOW TO LEARN",
    "f-music-language": "BLOCK 02 - MUSIC AS LANGUAGE",
    "f-musical-alphabet": "BLOCK 03 - THE MUSICAL ALPHABET",
    "f-rhythm-pulse": "BLOCK 04 - RHYTHM & PULSE",
    "f-guitar-map": "BLOCK 05 - THE GUITAR MAP",
    "f-instrument-body": "BLOCK 06 - THE INSTRUMENT BODY",
    "f-hands-sound": "BLOCK 07 - HANDS & SOUND",
    "f-first-shapes": "BLOCK 08 - FIRST SHAPES",
    "f-first-conversation": "BLOCK 09 - FIRST CONVERSATION"
  };

  var FALLBACK_LESSON_ID_BY_TOPIC_ID = {
    "f-threshold": "f-threshold",
    "f-how-to-learn": "f-how-to-learn",
    "f-music-language": "f-learning-a-language",
    "f-musical-alphabet": "f-language-of-music",
    "f-rhythm-pulse": "f-rhythm-pulse",
    "f-guitar-map": "f-language-of-guitar",
    "f-instrument-body": "f-the-guitar",
    "f-hands-sound": "f-speaking",
    "f-first-shapes": "f-first-shapes",
    "f-first-conversation": "f-conversations"
  };

  function legacyLessonById(runtimeRoot) {
    runtimeRoot = runtimeRoot || root;
    return {
      "f-threshold": runtimeRoot.LESSON_THRESHOLD,
      "f-how-to-learn": runtimeRoot.LESSON_HOW_TO_LEARN,
      "f-learning-a-language": runtimeRoot.LESSON_LEARNING_A_LANGUAGE,
      "f-language-of-music": runtimeRoot.LESSON_LANGUAGE_OF_MUSIC,
      "f-rhythm-pulse": runtimeRoot.LESSON_RHYTHM_PULSE,
      "f-language-of-guitar": runtimeRoot.LESSON_LANGUAGE_OF_GUITAR,
      "f-the-guitar": runtimeRoot.LESSON_THE_GUITAR,
      "f-speaking": runtimeRoot.LESSON_SPEAKING,
      "f-first-shapes": runtimeRoot.LESSON_FIRST_SHAPES,
      "f-conversations": runtimeRoot.LESSON_CONVERSATIONS
    };
  }

  function findRoute(topicId, options) {
    var adapter = options.foundationAdapter || root.HearthFoundationAdapter;
    var manifest = options.routeManifest || root.HearthFoundationRouteManifest;

    if (!adapter || !manifest || typeof adapter.findRouteByTopic !== "function") {
      return null;
    }

    return adapter.findRouteByTopic(manifest, topicId);
  }

  function resolveFoundationLesson(topicId, options) {
    options = options || {};

    var route = findRoute(topicId, options);
    var lessonId = route ? route.lesson_id : FALLBACK_LESSON_ID_BY_TOPIC_ID[topicId];
    var legacyLessons = options.legacyLessonById || legacyLessonById(root);
    var fallbackLesson = lessonId ? legacyLessons[lessonId] : null;
    var baseInfo = lessonId
      ? {
          lesson: fallbackLesson,
          label: LABEL_BY_TOPIC_ID[topicId],
          lesson_id: lessonId,
          route: route,
          source: "legacy_global"
        }
      : null;

    var seedLoader = options.seedLoader || root.HearthFoundationSeedLoader;
    if (!route || !seedLoader || typeof seedLoader.loadSeedForRoute !== "function") {
      return Promise.resolve(baseInfo);
    }

    return seedLoader.loadSeedForRoute(route, options).then(
      function useLoadedSeed(loadedSeed) {
        if (!loadedSeed || !loadedSeed.lesson) {
          return baseInfo;
        }
        return {
          lesson: loadedSeed.lesson,
          label: LABEL_BY_TOPIC_ID[topicId],
          lesson_id: lessonId,
          route: route,
          seed: loadedSeed.seed,
          source: "seed_json"
        };
      },
      function useFallback(error) {
        var logger = options.logger || (root.console && root.console.warn ? root.console : null);
        if (logger && typeof logger.warn === "function") {
          logger.warn("Foundation seed load fell back to legacy lesson:", error.message);
        }
        return baseInfo;
      }
    );
  }

  return {
    version: "0.1.0",
    LABEL_BY_TOPIC_ID: Object.assign({}, LABEL_BY_TOPIC_ID),
    FALLBACK_LESSON_ID_BY_TOPIC_ID: Object.assign({}, FALLBACK_LESSON_ID_BY_TOPIC_ID),
    legacyLessonById: legacyLessonById,
    resolveFoundationLesson: resolveFoundationLesson
  };
});
