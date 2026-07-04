/*
 * Lesson session core v0.
 *
 * Pure lesson navigation and answer evaluation. This module does not render
 * HTML, play audio, write localStorage, or mutate lesson seed data.
 */
(function initLessonSession(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthLessonSession = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createLessonSessionCore() {
  "use strict";

  function getLesson(seed) {
    return seed && seed.lesson ? seed.lesson : {};
  }

  function getSteps(seed) {
    var lesson = getLesson(seed);
    return Array.isArray(lesson.steps) ? lesson.steps : [];
  }

  function isObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function cloneScores(scores) {
    var cloned = {};
    scores = isObject(scores) ? scores : {};

    Object.keys(scores).forEach(function cloneConcept(concept) {
      var current = scores[concept] || {};
      cloned[concept] = {
        right: Number.isFinite(current.right) ? current.right : 0,
        wrong: Number.isFinite(current.wrong) ? current.wrong : 0
      };
    });

    return cloned;
  }

  function clampStepIndex(stepIndex, stepCount) {
    var index = Number.isFinite(stepIndex) ? Math.floor(stepIndex) : 0;
    if (index < 0) return 0;
    if (index >= stepCount) return Math.max(0, stepCount - 1);
    return index;
  }

  function createLessonSession(seed, options) {
    options = options || {};
    var lesson = getLesson(seed);
    var steps = getSteps(seed);
    var stepIndex = clampStepIndex(options.step_index || 0, steps.length);

    return {
      lesson_id: lesson.id || null,
      step_index: stepIndex,
      completed: Boolean(options.completed),
      history: Array.isArray(options.history) ? options.history.slice() : [],
      wrong_count: Number.isFinite(options.wrong_count) ? options.wrong_count : 0,
      scores: cloneScores(options.scores)
    };
  }

  function getCurrentStep(seed, session) {
    var steps = getSteps(seed);
    var stepIndex = clampStepIndex(session && session.step_index, steps.length);
    return steps[stepIndex] || null;
  }

  function withScore(session, concept, field) {
    var next = cloneSession(session);
    var key = concept || "general";

    if (!next.scores[key]) {
      next.scores[key] = { right: 0, wrong: 0 };
    }

    next.scores[key][field] += 1;
    return next;
  }

  function cloneSession(session) {
    return {
      lesson_id: session && session.lesson_id ? session.lesson_id : null,
      step_index: Number.isFinite(session && session.step_index) ? session.step_index : 0,
      completed: Boolean(session && session.completed),
      history: Array.isArray(session && session.history) ? session.history.slice() : [],
      wrong_count: Number.isFinite(session && session.wrong_count) ? session.wrong_count : 0,
      scores: cloneScores(session && session.scores)
    };
  }

  function moveToStep(seed, session, stepIndex) {
    var steps = getSteps(seed);
    var current = createLessonSession(seed, session);
    var nextIndex = clampStepIndex(stepIndex, steps.length);
    var next = cloneSession(current);

    if (nextIndex !== current.step_index) {
      next.history.push(current.step_index);
    }

    next.step_index = nextIndex;
    next.completed = false;
    return next;
  }

  function advanceLesson(seed, session) {
    var steps = getSteps(seed);
    var current = createLessonSession(seed, session);

    if (!steps.length || current.step_index >= steps.length - 1) {
      var completed = cloneSession(current);
      completed.completed = true;
      return completed;
    }

    return moveToStep(seed, current, current.step_index + 1);
  }

  function goBack(seed, session) {
    var current = createLessonSession(seed, session);

    if (!current.history.length) {
      return current;
    }

    var next = cloneSession(current);
    next.step_index = clampStepIndex(next.history.pop(), getSteps(seed).length);
    next.completed = false;
    return next;
  }

  function completeLesson(seed, session) {
    var next = createLessonSession(seed, session);
    next.step_index = clampStepIndex(next.step_index, getSteps(seed).length);
    next.completed = true;
    return next;
  }

  function normalizeResponse(response) {
    if (typeof response === "string") {
      return { text: response };
    }
    return isObject(response) ? response : null;
  }

  function evaluateChoice(seed, session, choiceIndex) {
    var current = createLessonSession(seed, session);
    var step = getCurrentStep(seed, current);

    if (!step || step.type !== "ask" || !Array.isArray(step.choices)) {
      return {
        state: current,
        result: {
          valid: false,
          reason: "current_step_is_not_a_question"
        }
      };
    }

    var index = Number.isFinite(choiceIndex) ? Math.floor(choiceIndex) : -1;
    var choice = step.choices[index];

    if (!choice) {
      return {
        state: current,
        result: {
          valid: false,
          reason: "choice_not_found",
          choice_index: index
        }
      };
    }

    var concept = step.concept || "general";
    var correct = Boolean(choice.correct);
    var nextState = withScore(current, concept, correct ? "right" : "wrong");
    nextState.wrong_count = correct ? 0 : current.wrong_count + 1;

    return {
      state: nextState,
      result: {
        valid: true,
        correct: correct,
        choice_index: index,
        concept: concept,
        response: normalizeResponse(choice.response),
        reexplain: choice.reexplain || step.reexplain || [],
        next_action: correct && choice.response ? "show_response" : correct ? "advance" : "reexplain"
      }
    };
  }

  return {
    version: "0.1.0",
    createLessonSession: createLessonSession,
    getCurrentStep: getCurrentStep,
    moveToStep: moveToStep,
    advanceLesson: advanceLesson,
    goBack: goBack,
    completeLesson: completeLesson,
    evaluateChoice: evaluateChoice,
    normalizeResponse: normalizeResponse
  };
});
