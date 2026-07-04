/*
 * Hearth lesson core v0.
 *
 * Pure lesson-data helpers for the simulator rebuild. This file intentionally
 * does not touch the DOM, browser storage, audio, or app navigation.
 */
(function initLessonCore(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthLessonCore = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createLessonCore() {
  "use strict";

  var STEP_TYPES = ["speak", "ask", "cards", "video", "action", "end"];
  var ACTION_RENDERER_KEYS = [
    "foundation.body_scan",
    "foundation.first_sounds",
    "foundation.note_movement",
    "foundation.e_major_chord"
  ];

  function isObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function hasText(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function validateChoice(choice, path) {
    var errors = [];

    if (!isObject(choice)) {
      return [path + " must be an object"];
    }
    if (!hasText(choice.label)) {
      errors.push(path + ".label is required");
    }
    if (typeof choice.correct !== "boolean") {
      errors.push(path + ".correct must be a boolean");
    }
    if (choice.response !== undefined && !isObject(choice.response)) {
      errors.push(path + ".response must be an object when present");
    }
    if (choice.reexplain !== undefined && !Array.isArray(choice.reexplain)) {
      errors.push(path + ".reexplain must be a list when present");
    }

    return errors;
  }

  function validateStep(step, index) {
    var errors = [];
    var path = "lesson.steps[" + index + "]";

    if (!isObject(step)) {
      return [path + " must be an object"];
    }
    if (step.order !== index + 1) {
      errors.push(path + ".order must be " + (index + 1));
    }
    if (STEP_TYPES.indexOf(step.type) === -1) {
      errors.push(path + ".type is invalid: " + step.type);
    }
    if (!hasText(step.text)) {
      errors.push(path + ".text is required");
    }

    if (step.type === "ask") {
      if (!Array.isArray(step.choices) || step.choices.length === 0) {
        errors.push(path + ".choices must be a non-empty list");
      } else {
        for (var c = 0; c < step.choices.length; c++) {
          errors = errors.concat(validateChoice(step.choices[c], path + ".choices[" + c + "]"));
        }
      }
    }

    if (step.type === "cards") {
      if (!Array.isArray(step.cards) || step.cards.length === 0) {
        errors.push(path + ".cards must be a non-empty list");
      }
    }

    if (step.type === "video") {
      if (step.video_url !== undefined && typeof step.video_url !== "string") {
        errors.push(path + ".video_url must be a string when present");
      }
    }

    if (step.type === "action") {
      if (!hasText(step.renderer_key)) {
        errors.push(path + ".renderer_key is required for action steps");
      }
    }

    return errors;
  }

  function validateLessonSeed(seed) {
    var errors = [];

    if (!isObject(seed)) {
      return ["seed must be an object"];
    }
    if (typeof seed.version !== "number") {
      errors.push("version must be a number");
    }
    if (!hasText(seed.generated_from)) {
      errors.push("generated_from is required");
    }
    if (!isObject(seed.lesson)) {
      errors.push("lesson must be an object");
      return errors;
    }

    var lesson = seed.lesson;
    ["id", "title", "node_id", "engine", "source_file"].forEach(function requireField(field) {
      if (!hasText(lesson[field])) {
        errors.push("lesson." + field + " is required");
      }
    });

    if (lesson.topic_id !== null && lesson.topic_id !== undefined && !hasText(lesson.topic_id)) {
      errors.push("lesson.topic_id must be a string, null, or omitted");
    }

    if (!Array.isArray(lesson.steps) || lesson.steps.length === 0) {
      errors.push("lesson.steps must be a non-empty list");
      return errors;
    }

    for (var i = 0; i < lesson.steps.length; i++) {
      errors = errors.concat(validateStep(lesson.steps[i], i));
    }

    return errors;
  }

  function lessonSummary(seed) {
    var lesson = seed && seed.lesson ? seed.lesson : {};
    var steps = Array.isArray(lesson.steps) ? lesson.steps : [];
    var typeCounts = {};

    steps.forEach(function countStep(step) {
      var type = step && step.type ? step.type : "unknown";
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    return {
      id: lesson.id || null,
      title: lesson.title || null,
      node_id: lesson.node_id || null,
      topic_id: lesson.topic_id === undefined ? null : lesson.topic_id,
      engine: lesson.engine || null,
      source_file: lesson.source_file || null,
      step_count: steps.length,
      step_types: typeCounts
    };
  }

  function buildRouteSummary(routeManifest, lessonSeedsById) {
    if (!Array.isArray(routeManifest)) {
      return [];
    }

    return routeManifest.map(function summarizeRoute(route) {
      var seed = lessonSeedsById ? lessonSeedsById[route.lesson_id] : null;
      var summary = seed ? lessonSummary(seed) : null;

      return {
        topic_id: route.topic_id,
        lesson_id: route.lesson_id,
        lesson_title: summary ? summary.title : null,
        route_status: route.route_status || "active",
        seed_file: route.seed_file || null,
        step_count: summary ? summary.step_count : null
      };
    });
  }

  return {
    version: "0.1.0",
    STEP_TYPES: STEP_TYPES.slice(),
    ACTION_RENDERER_KEYS: ACTION_RENDERER_KEYS.slice(),
    validateLessonSeed: validateLessonSeed,
    lessonSummary: lessonSummary,
    buildRouteSummary: buildRouteSummary
  };
});
