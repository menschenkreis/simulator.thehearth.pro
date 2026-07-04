/*
 * Foundation adapter v0.
 *
 * Pure routing adapter for clean Foundation lesson data. It does not fetch
 * files, render screens, touch storage, or call the old simulator globals.
 */
(function initFoundationAdapter(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthFoundationAdapter = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createFoundationAdapter() {
  "use strict";

  function isObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function copyRoute(route) {
    return {
      topic_id: route.topic_id === undefined ? null : route.topic_id,
      lesson_id: route.lesson_id,
      seed_file: route.seed_file,
      route_status: route.route_status || "active"
    };
  }

  function getRoutes(manifest, status) {
    var routes = manifest && Array.isArray(manifest.routes) ? manifest.routes : [];
    return routes
      .filter(function routeMatches(route) {
        return !status || route.route_status === status;
      })
      .map(copyRoute);
  }

  function getActiveRoutes(manifest) {
    return getRoutes(manifest, "active");
  }

  function getUnmappedRoutes(manifest) {
    return getRoutes(manifest, "loaded_but_not_currently_mapped");
  }

  function findRouteByTopic(manifest, topicId) {
    var routes = manifest && Array.isArray(manifest.routes) ? manifest.routes : [];

    for (var i = 0; i < routes.length; i++) {
      if (routes[i].topic_id === topicId && routes[i].route_status === "active") {
        return copyRoute(routes[i]);
      }
    }

    return null;
  }

  function buildLessonIndex(seedList) {
    var index = {};
    var seeds = Array.isArray(seedList) ? seedList : [];

    seeds.forEach(function indexSeed(seed) {
      if (isObject(seed) && isObject(seed.lesson) && seed.lesson.id) {
        index[seed.lesson.id] = seed;
      }
    });

    return index;
  }

  function getLessonForTopic(manifest, lessonIndex, topicId) {
    var route = findRouteByTopic(manifest, topicId);
    if (!route) {
      return {
        found: false,
        reason: "topic_not_mapped",
        topic_id: topicId,
        route: null,
        lesson: null
      };
    }

    var seed = lessonIndex ? lessonIndex[route.lesson_id] : null;
    if (!seed || !seed.lesson) {
      return {
        found: false,
        reason: "lesson_seed_missing",
        topic_id: topicId,
        route: route,
        lesson: null
      };
    }

    return {
      found: true,
      reason: null,
      topic_id: topicId,
      route: route,
      lesson: seed.lesson
    };
  }

  function listTopicLessons(manifest, lessonIndex) {
    return getActiveRoutes(manifest).map(function mapRoute(route) {
      var seed = lessonIndex ? lessonIndex[route.lesson_id] : null;
      var lesson = seed && seed.lesson ? seed.lesson : null;

      return {
        topic_id: route.topic_id,
        lesson_id: route.lesson_id,
        title: lesson ? lesson.title : null,
        step_count: lesson && Array.isArray(lesson.steps) ? lesson.steps.length : null,
        seed_file: route.seed_file
      };
    });
  }

  return {
    version: "0.1.0",
    getRoutes: getRoutes,
    getActiveRoutes: getActiveRoutes,
    getUnmappedRoutes: getUnmappedRoutes,
    findRouteByTopic: findRouteByTopic,
    buildLessonIndex: buildLessonIndex,
    getLessonForTopic: getLessonForTopic,
    listTopicLessons: listTopicLessons
  };
});
