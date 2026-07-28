/*
 * Learner-scoped storage for unfinished guided Practice sessions.
 *
 * The old global value remains readable for its original learner, but is never
 * deleted or silently assigned to a different learner.
 */
(function initPracticePlannedSessionStore(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthPracticePlannedSessionStore = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPracticePlannedSessionStore() {
  "use strict";

  var STORAGE_KEY = "hearth-planned-practice-v2";
  var LEGACY_KEY = "hearth-planned-practice-v1";

  function readJson(storage, key, fallback) {
    try {
      var value = storage && storage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (_error) {
      return fallback;
    }
  }

  function writeJson(storage, key, value) {
    if (!storage || typeof storage.setItem !== "function") return false;
    try {
      storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_error) {
      return false;
    }
  }

  function normalize(value) {
    var state = value && typeof value === "object" ? value : {};
    if (!state.profiles || typeof state.profiles !== "object") state.profiles = {};
    state.version = 2;
    return state;
  }

  function learnerIdFor(session) {
    return String(session && session.learner && session.learner.id || "");
  }

  function createStore(options) {
    options = options || {};
    var storage = options.storage;

    function state() {
      return normalize(readJson(storage, STORAGE_KEY, { version: 2, profiles: {} }));
    }

    function get(learnerId) {
      var id = String(learnerId || "");
      if (!id) return null;
      var saved = state().profiles[id];
      if (saved && learnerIdFor(saved) === id) return JSON.parse(JSON.stringify(saved));

      var legacy = readJson(storage, LEGACY_KEY, null);
      return legacy && learnerIdFor(legacy) === id
        ? JSON.parse(JSON.stringify(legacy))
        : null;
    }

    function save(session) {
      var id = learnerIdFor(session);
      if (!id) return false;
      var next = state();
      next.profiles[id] = JSON.parse(JSON.stringify(session));
      return writeJson(storage, STORAGE_KEY, next);
    }

    function clear(learnerId) {
      var id = String(learnerId || "");
      if (!id) return false;
      var next = state();
      delete next.profiles[id];
      return writeJson(storage, STORAGE_KEY, next);
    }

    return {
      storageKey: STORAGE_KEY,
      legacyKey: LEGACY_KEY,
      get: get,
      save: save,
      clear: clear
    };
  }

  return {
    version: "1.0.0",
    createStore: createStore
  };
});
