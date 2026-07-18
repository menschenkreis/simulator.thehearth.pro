/*
 * Create state adapter v1.
 *
 * Keeps each learner's working song seed and saved fragments separate while
 * preserving the former localStorage values on the first visit.
 */
(function initCreateState(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthCreateState = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createCreateState() {
  "use strict";

  var STORAGE_KEY = "hearth-create-v1";
  var JOURNEY_KEY = "hearth-journey-v2";
  var LEGACY_CURRENT_KEY = "hearth-create-current";
  var LEGACY_PROJECTS_KEY = "hearth-create-projects";

  function readJson(storage, key, fallback) {
    try {
      var value = storage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (_error) {
      return fallback;
    }
  }

  function writeJson(storage, key, value) {
    if (storage && typeof storage.setItem === "function") {
      storage.setItem(key, JSON.stringify(value));
    }
  }

  function emptyStore() {
    return { version: 1, legacy_migrated: false, profiles: {} };
  }

  function activeLearnerId(storage, journeyState) {
    var state = journeyState || readJson(storage, JOURNEY_KEY, {});
    var students = Array.isArray(state.students) ? state.students : [];
    var active = students.find(function findActive(student) {
      return student.id === state.activeStudentId;
    }) || students[0];
    return (active && active.id) || state.activeStudentId || "default";
  }

  function normalizeStore(value) {
    var store = value && typeof value === "object" ? value : emptyStore();
    if (!store.profiles || typeof store.profiles !== "object") store.profiles = {};
    store.version = 1;
    store.legacy_migrated = Boolean(store.legacy_migrated);
    return store;
  }

  function profileFor(store, learnerId) {
    if (!store.profiles[learnerId]) {
      store.profiles[learnerId] = { current: {}, projects: [] };
    }
    var profile = store.profiles[learnerId];
    if (!profile.current || typeof profile.current !== "object") profile.current = {};
    if (!Array.isArray(profile.projects)) profile.projects = [];
    return profile;
  }

  function createStore(options) {
    options = options || {};
    var storage = options.storage || (typeof localStorage !== "undefined" ? localStorage : null);

    function load(journeyState) {
      if (!storage) return emptyStore();
      var store = normalizeStore(readJson(storage, STORAGE_KEY, emptyStore()));
      var learnerId = activeLearnerId(storage, journeyState);
      var profile = profileFor(store, learnerId);

      if (!store.legacy_migrated) {
        var legacyCurrent = readJson(storage, LEGACY_CURRENT_KEY, {});
        var legacyProjects = readJson(storage, LEGACY_PROJECTS_KEY, []);
        if (legacyCurrent && typeof legacyCurrent === "object" && Object.keys(legacyCurrent).length) {
          profile.current = legacyCurrent;
        }
        if (Array.isArray(legacyProjects) && legacyProjects.length) {
          profile.projects = legacyProjects;
        }
        store.legacy_migrated = true;
      }

      writeJson(storage, STORAGE_KEY, store);
      return store;
    }

    function activeProfile(journeyState) {
      var store = load(journeyState);
      return profileFor(store, activeLearnerId(storage, journeyState));
    }

    function saveProfile(profile, journeyState) {
      var store = load(journeyState);
      store.profiles[activeLearnerId(storage, journeyState)] = profile;
      writeJson(storage, STORAGE_KEY, store);
      return profile;
    }

    function current(journeyState) {
      return Object.assign({}, activeProfile(journeyState).current);
    }

    function setCurrent(seed, journeyState) {
      var profile = activeProfile(journeyState);
      profile.current = Object.assign({}, seed || {});
      saveProfile(profile, journeyState);
      return Object.assign({}, profile.current);
    }

    function projects(journeyState) {
      return activeProfile(journeyState).projects.slice();
    }

    function saveProject(seed, journeyState) {
      var profile = activeProfile(journeyState);
      var now = new Date().toISOString();
      var project = Object.assign({}, seed || {});
      project.id = project.id || "seed-" + Date.now();
      project.savedAt = now;
      var index = profile.projects.findIndex(function findProject(item) {
        return item && item.id === project.id;
      });
      if (index >= 0) profile.projects[index] = project;
      else profile.projects.push(project);
      profile.current = Object.assign({}, project);
      saveProfile(profile, journeyState);
      return Object.assign({}, project);
    }

    function intent(journeyState) {
      return String(activeProfile(journeyState).intent || "");
    }

    function setIntent(value, journeyState) {
      var profile = activeProfile(journeyState);
      profile.intent = String(value || "");
      saveProfile(profile, journeyState);
      return profile.intent;
    }

    return {
      version: "1.0.0",
      storageKey: STORAGE_KEY,
      activeLearnerId: function getActiveLearnerId(journeyState) {
        return activeLearnerId(storage, journeyState);
      },
      getCurrent: current,
      setCurrent: setCurrent,
      listProjects: projects,
      saveProject: saveProject,
      getIntent: intent,
      setIntent: setIntent
    };
  }

  return {
    version: "1.0.0",
    createStore: createStore,
    activeLearnerId: activeLearnerId
  };
});
