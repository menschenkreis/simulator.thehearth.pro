/*
 * Lesson view model v0.
 *
 * Converts lesson seed data into frontend-friendly plain objects. This module
 * does not render HTML, handle clicks, store progress, or mutate lesson data.
 */
(function initLessonViewModel(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthLessonViewModel = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createLessonViewModel() {
  "use strict";

  function isObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function clampStepIndex(stepIndex, stepCount) {
    var index = Number.isFinite(stepIndex) ? Math.floor(stepIndex) : 0;
    if (index < 0) return 0;
    if (index >= stepCount) return Math.max(0, stepCount - 1);
    return index;
  }

  function summarizeChoice(choice, index) {
    return {
      index: index,
      label: choice.label || "",
      correct: Boolean(choice.correct),
      has_response: isObject(choice.response),
      reexplain_count: Array.isArray(choice.reexplain) ? choice.reexplain.length : 0
    };
  }

  function summarizeStep(step, index) {
    var summary = {
      index: index,
      order: step.order,
      type: step.type,
      concept: step.concept || null,
      char_key: step.char_key || null,
      char_size: step.char_size || null,
      text: step.text || "",
      has_text: typeof step.text === "string" && step.text.trim().length > 0
    };

    if (step.type === "ask") {
      summary.choices = Array.isArray(step.choices)
        ? step.choices.map(summarizeChoice)
        : [];
    }

    if (step.type === "cards") {
      summary.card_count = Array.isArray(step.cards) ? step.cards.length : 0;
      summary.cards = Array.isArray(step.cards)
        ? step.cards.map(function summarizeCard(card, cardIndex) {
            return {
              index: cardIndex,
              title: card.title || null,
              has_icon: Boolean(card.icon),
              has_image: Boolean(card.image),
              has_description: Boolean(card.desc || card.description || card.body)
            };
          })
        : [];
    }

    if (step.type === "video") {
      summary.video_url = step.video_url || null;
      summary.video_desc = step.video_desc || null;
    }

    if (step.type === "action") {
      summary.renderer_key = step.renderer_key || null;
      summary.has_renderer_config = isObject(step.renderer_config);
    }

    if (step.type === "end") {
      summary.button_label = step.button_label || null;
    }

    return summary;
  }

  function buildLessonViewModel(seed, options) {
    options = options || {};
    var lesson = seed && seed.lesson ? seed.lesson : {};
    var steps = Array.isArray(lesson.steps) ? lesson.steps : [];
    var currentIndex = clampStepIndex(options.current_step_index || 0, steps.length);
    var currentStep = steps[currentIndex] || null;

    return {
      id: lesson.id || null,
      title: lesson.title || null,
      node_id: lesson.node_id || null,
      topic_id: lesson.topic_id === undefined ? null : lesson.topic_id,
      engine: lesson.engine || null,
      source_file: lesson.source_file || null,
      route_status: seed.route_status || null,
      generated_from: seed.generated_from || null,
      step_count: steps.length,
      current_step_index: currentIndex,
      current_step_number: steps.length ? currentIndex + 1 : 0,
      progress_label: steps.length ? currentIndex + 1 + " / " + steps.length : "0 / 0",
      previous_step_index: currentIndex > 0 ? currentIndex - 1 : null,
      next_step_index: currentIndex < steps.length - 1 ? currentIndex + 1 : null,
      is_first_step: currentIndex === 0,
      is_last_step: steps.length === 0 || currentIndex === steps.length - 1,
      current_step: currentStep ? summarizeStep(currentStep, currentIndex) : null,
      steps: steps.map(summarizeStep)
    };
  }

  function buildTopicLessonViewModel(routeResult, options) {
    if (!routeResult || !routeResult.found || !routeResult.lesson) {
      return {
        found: false,
        reason: routeResult ? routeResult.reason : "missing_route_result",
        topic_id: routeResult ? routeResult.topic_id : null,
        route: routeResult ? routeResult.route : null,
        lesson: null
      };
    }

    var seed = {
      generated_from: routeResult.route ? routeResult.route.seed_file : null,
      route_status: routeResult.route ? routeResult.route.route_status : null,
      lesson: routeResult.lesson
    };

    return {
      found: true,
      reason: null,
      topic_id: routeResult.topic_id,
      route: routeResult.route,
      lesson: buildLessonViewModel(seed, options)
    };
  }

  return {
    version: "0.1.0",
    buildLessonViewModel: buildLessonViewModel,
    buildTopicLessonViewModel: buildTopicLessonViewModel,
    summarizeStep: summarizeStep
  };
});
