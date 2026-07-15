/*
 * Foundation seed loader adapter v0.
 *
 * Tries to load clean Foundation lesson seed JSON in the browser, then
 * translates it into the current TeachingEngine runtime lesson shape. If JSON
 * loading is unavailable, callers can fall back to the legacy lesson globals.
 */
(function initFoundationSeedLoader(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthFoundationSeedLoader = factory(root.HearthLessonCore);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createFoundationSeedLoader(lessonCore) {
  "use strict";

  var CHAR_BY_KEY = {
    neutral: "images/character-face/Neutral.png",
    encouraging: "images/character-face/Encouraging.png",
    thinking: "images/character-face/Thinking.png",
    celebratory: "images/character-face/Celebratory.png",
    lightbulb: "images/character-generated/guide-head-lightbulb-v1-ui.webp",
    headNeutral: "images/character-generated/guide-head-neutral-v1-ui.webp",
    headQuestion: "images/character-generated/guide-head-question-v1-ui.webp"
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeCharacterFields(source) {
    var target = clone(source || {});

    if (target.char_key && !target.char) {
      target.char = CHAR_BY_KEY[target.char_key] || CHAR_BY_KEY.neutral;
    }
    if (target.char_size && !target.charSize) {
      target.charSize = target.char_size;
    }
    if (target.button_label && !target.buttonLabel) {
      target.buttonLabel = target.button_label;
    }
    if (target.video_url !== undefined && target.videoUrl === undefined) {
      target.videoUrl = target.video_url;
    }
    if (target.video_desc !== undefined && target.videoDesc === undefined) {
      target.videoDesc = target.video_desc;
    }
    if (target.renderer_key !== undefined && target.rendererKey === undefined) {
      target.rendererKey = target.renderer_key;
    }
    if (target.renderer_config !== undefined && target.rendererConfig === undefined) {
      target.rendererConfig = target.renderer_config;
    }

    return target;
  }

  function normalizeChoice(choice) {
    var normalized = normalizeCharacterFields(choice);

    if (choice && choice.response) {
      normalized.response = normalizeCharacterFields(choice.response);
    }
    if (choice && Array.isArray(choice.reexplain)) {
      normalized.reexplain = choice.reexplain.map(normalizeCharacterFields);
    }

    return normalized;
  }

  function normalizeStep(step) {
    var normalized = normalizeCharacterFields(step);

    if (Array.isArray(step.choices)) {
      normalized.choices = step.choices.map(normalizeChoice);
    }
    if (Array.isArray(step.reexplain)) {
      normalized.reexplain = step.reexplain.map(normalizeCharacterFields);
    }
    if (Array.isArray(step.cards)) {
      normalized.cards = step.cards.map(clone);
    }

    return normalized;
  }

  function normalizeSeedForTeachingEngine(seed) {
    var lesson = seed && seed.lesson ? seed.lesson : {};
    var normalized = normalizeCharacterFields(lesson);

    normalized.completeText = lesson.complete_text || lesson.completeText || "";
    normalized.steps = Array.isArray(lesson.steps) ? lesson.steps.map(normalizeStep) : [];
    normalized.sourceSeedFile = seed ? seed.generated_from : null;

    return normalized;
  }

  function validateSeed(seed) {
    if (!lessonCore || typeof lessonCore.validateLessonSeed !== "function") {
      return [];
    }
    return lessonCore.validateLessonSeed(seed);
  }

  function fetchJson(path, fetchImpl) {
    fetchImpl = fetchImpl || (typeof fetch !== "undefined" ? fetch : null);

    if (!fetchImpl) {
      return Promise.reject(new Error("fetch is not available"));
    }

    return fetchImpl(path).then(function parseResponse(response) {
      if (!response || !response.ok) {
        throw new Error("Unable to load seed file: " + path);
      }
      return response.json();
    });
  }

  function loadSeedForRoute(route, options) {
    options = options || {};

    if (!route || !route.seed_file) {
      return Promise.reject(new Error("route.seed_file is required"));
    }

    return fetchJson(route.seed_file, options.fetch).then(function normalizeLoadedSeed(seed) {
      var errors = validateSeed(seed);
      if (errors.length) {
        throw new Error("Invalid seed file " + route.seed_file + ": " + errors.join("; "));
      }
      return {
        seed: seed,
        lesson: normalizeSeedForTeachingEngine(seed)
      };
    });
  }

  return {
    version: "0.1.0",
    CHAR_BY_KEY: clone(CHAR_BY_KEY),
    normalizeSeedForTeachingEngine: normalizeSeedForTeachingEngine,
    loadSeedForRoute: loadSeedForRoute
  };
});
