/*
 * Learner progress core v0.
 *
 * Pure progress record helpers for lessons. This module does not read or write
 * browser storage, call an API, render HTML, or know about one specific screen.
 */
(function initLearnerProgress(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthLearnerProgress = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createLearnerProgressCore() {
  "use strict";

  var DEFAULT_SIMULATOR_ID = "hearth-guitar";

  function isObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function nowIso(options) {
    if (options && options.now) {
      return options.now;
    }
    return new Date().toISOString();
  }

  function cloneRecord(record) {
    return JSON.parse(JSON.stringify(record || {}));
  }

  function createProgressRecord(options) {
    options = options || {};

    return {
      version: 1,
      simulator_id: options.simulator_id || DEFAULT_SIMULATOR_ID,
      learner_id: options.learner_id || null,
      lessons: {},
      updated_at: nowIso(options)
    };
  }

  function normalizeProgressRecord(record, options) {
    options = options || {};
    var source = isObject(record) ? record : {};
    var normalized = {
      version: source.version || 1,
      simulator_id: source.simulator_id || options.simulator_id || DEFAULT_SIMULATOR_ID,
      learner_id: source.learner_id || options.learner_id || null,
      lessons: {},
      updated_at: source.updated_at || nowIso(options)
    };

    var lessons = isObject(source.lessons) ? source.lessons : {};
    Object.keys(lessons).forEach(function normalizeLesson(lessonId) {
      normalized.lessons[lessonId] = normalizeLessonProgress(lessons[lessonId]);
    });

    return normalized;
  }

  function normalizeLessonProgress(progress) {
    progress = isObject(progress) ? progress : {};

    return {
      status: progress.status || "not_started",
      last_step_index: Number.isFinite(progress.last_step_index) ? progress.last_step_index : 0,
      started_at: progress.started_at || null,
      completed_at: progress.completed_at || null,
      updated_at: progress.updated_at || null,
      attempts: Number.isFinite(progress.attempts) ? progress.attempts : 0,
      correct_answers: Number.isFinite(progress.correct_answers) ? progress.correct_answers : 0,
      wrong_answers: Number.isFinite(progress.wrong_answers) ? progress.wrong_answers : 0,
      concepts: isObject(progress.concepts) ? cloneRecord(progress.concepts) : {}
    };
  }

  function getLessonProgress(record, lessonId) {
    var normalized = normalizeProgressRecord(record);
    return normalizeLessonProgress(normalized.lessons[lessonId]);
  }

  function setLessonProgress(record, lessonId, lessonProgress, options) {
    options = options || {};
    var next = normalizeProgressRecord(record, options);
    next.lessons[lessonId] = normalizeLessonProgress(lessonProgress);
    next.lessons[lessonId].updated_at = nowIso(options);
    next.updated_at = next.lessons[lessonId].updated_at;
    return next;
  }

  function markLessonStarted(record, lessonId, options) {
    options = options || {};
    var progress = getLessonProgress(record, lessonId);
    var timestamp = nowIso(options);

    progress.status = progress.status === "completed" ? "completed" : "in_progress";
    progress.started_at = progress.started_at || timestamp;
    progress.updated_at = timestamp;

    return setLessonProgress(record, lessonId, progress, { now: timestamp });
  }

  function updateLessonStep(record, lessonId, stepIndex, options) {
    options = options || {};
    var progress = getLessonProgress(record, lessonId);
    var timestamp = nowIso(options);

    progress.status = progress.status === "completed" ? "completed" : "in_progress";
    progress.started_at = progress.started_at || timestamp;
    progress.last_step_index = Number.isFinite(stepIndex) ? Math.max(0, Math.floor(stepIndex)) : 0;
    progress.updated_at = timestamp;

    return setLessonProgress(record, lessonId, progress, { now: timestamp });
  }

  function markLessonCompleted(record, lessonId, options) {
    options = options || {};
    var progress = getLessonProgress(record, lessonId);
    var timestamp = nowIso(options);

    progress.status = "completed";
    progress.started_at = progress.started_at || timestamp;
    progress.completed_at = progress.completed_at || timestamp;
    progress.updated_at = timestamp;

    return setLessonProgress(record, lessonId, progress, { now: timestamp });
  }

  function recordLessonAnswer(record, lessonId, concept, correct, options) {
    options = options || {};
    var progress = getLessonProgress(record, lessonId);
    var timestamp = nowIso(options);
    var conceptKey = concept || "general";

    progress.status = progress.status === "completed" ? "completed" : "in_progress";
    progress.started_at = progress.started_at || timestamp;
    progress.updated_at = timestamp;
    progress.attempts += 1;

    if (!progress.concepts[conceptKey]) {
      progress.concepts[conceptKey] = { right: 0, wrong: 0 };
    }

    if (correct) {
      progress.correct_answers += 1;
      progress.concepts[conceptKey].right += 1;
    } else {
      progress.wrong_answers += 1;
      progress.concepts[conceptKey].wrong += 1;
    }

    return setLessonProgress(record, lessonId, progress, { now: timestamp });
  }

  function summarizeProgress(record) {
    var normalized = normalizeProgressRecord(record);
    var lessonIds = Object.keys(normalized.lessons);
    var summary = {
      simulator_id: normalized.simulator_id,
      learner_id: normalized.learner_id,
      lesson_count: lessonIds.length,
      completed_count: 0,
      in_progress_count: 0,
      not_started_count: 0
    };

    lessonIds.forEach(function countLesson(lessonId) {
      var progress = normalizeLessonProgress(normalized.lessons[lessonId]);
      if (progress.status === "completed") {
        summary.completed_count += 1;
      } else if (progress.status === "in_progress") {
        summary.in_progress_count += 1;
      } else {
        summary.not_started_count += 1;
      }
    });

    return summary;
  }

  return {
    version: "0.1.0",
    createProgressRecord: createProgressRecord,
    normalizeProgressRecord: normalizeProgressRecord,
    normalizeLessonProgress: normalizeLessonProgress,
    getLessonProgress: getLessonProgress,
    markLessonStarted: markLessonStarted,
    updateLessonStep: updateLessonStep,
    markLessonCompleted: markLessonCompleted,
    recordLessonAnswer: recordLessonAnswer,
    summarizeProgress: summarizeProgress
  };
});
