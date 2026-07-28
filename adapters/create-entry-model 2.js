/*
 * Create entry model v1.
 *
 * Builds the learner-aware summary for the Cauldron entrance without owning
 * the underlying ingredient or song-seed mechanics.
 */
(function initCreateEntryModel(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthCreateEntryModel = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createCreateEntryModel() {
  "use strict";

  function read(storage, key, fallback) {
    try {
      return JSON.parse(storage.getItem(key) || JSON.stringify(fallback));
    } catch (_error) {
      return fallback;
    }
  }

  function activeLearner(journeyState) {
    var state = journeyState || {};
    var students = Array.isArray(state.students) ? state.students : [];
    return students.find(function findStudent(student) {
      return student.id === state.activeStudentId;
    }) || students[0] || { id: null, name: "My Journey" };
  }

  function hasMaterial(seed) {
    var current = seed || {};
    return Boolean(
      current.prompt ||
      current.notes ||
      current.firstLyric ||
      current.riffIdea ||
      current.rhythmIdea ||
      (current.ingredients || []).length
    );
  }

  function seedTitle(seed) {
    return String((seed || {}).title || "Untitled song seed").trim() || "Untitled song seed";
  }

  function buildSnapshot(options) {
    options = options || {};
    var storage = options.storage;
    var learner = activeLearner(options.journeyState);
    var createState = options.createState;
    var current = createState && typeof createState.getCurrent === "function"
      ? createState.getCurrent(options.journeyState)
      : read(storage, "hearth-create-current", {});
    var saved = createState && typeof createState.listProjects === "function"
      ? createState.listProjects(options.journeyState).slice().reverse()
      : read(storage, "hearth-create-projects", []).slice().reverse();
    var ingredients = Array.isArray(options.ingredients) ? options.ingredients : [];
    var hasCurrent = hasMaterial(current);

    return {
      learner: {
        id: learner.id,
        name: learner.name || "My Journey"
      },
      current: {
        hasMaterial: hasCurrent,
        title: seedTitle(current),
        ingredients: (current.ingredients || []).slice(0, 3),
        prompt: String(current.prompt || "")
      },
      saved: saved.map(function mapSavedSeed(seed, index) {
        return {
          index: saved.length - index - 1,
          title: seedTitle(seed),
          ingredients: (seed.ingredients || []).slice(0, 3),
          savedAt: seed.savedAt || seed.createdAt || ""
        };
      }),
      ingredientNames: ingredients.slice(0, 5).map(function ingredientName(ingredient) {
        return ingredient.name;
      }),
      guideText: hasCurrent
        ? "There is a small ember waiting. Return to it before asking the fire for something else."
        : "Bring one small fragment. A chord, rhythm, riff, lyric, or question is enough to begin."
    };
  }

  return {
    version: "1.0.0",
    activeLearner: activeLearner,
    hasMaterial: hasMaterial,
    buildSnapshot: buildSnapshot
  };
});
