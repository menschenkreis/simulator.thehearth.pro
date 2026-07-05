/*
 * Practice state adapter v0.
 *
 * Wraps legacy Practice localStorage state, log, preferences, and drill selection.
 */
(function initPracticeState(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthPracticeState = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPracticeState(root) {
  "use strict";

  var stateKey = "hearth-practice-state";
  var logKey = "hearth-practice-log";

  function readJson(storage, key, fallback) {
    storage = storage || root.localStorage;
    if (!storage) return fallback;
    return JSON.parse(storage.getItem(key) || JSON.stringify(fallback));
  }

  function writeJson(storage, key, value) {
    storage = storage || root.localStorage;
    if (!storage) return;
    storage.setItem(key, JSON.stringify(value));
  }

  function readState(storage) {
    return readJson(storage, stateKey, {});
  }

  function writeState(state, storage) {
    writeJson(storage, stateKey, state || {});
  }

  function readLog(storage) {
    return readJson(storage, logKey, []);
  }

  function writeLog(log, storage) {
    writeJson(storage, logKey, log || []);
  }

  function preferences(state) {
    state = state || {};
    return {
      time: state.altarTime || 20,
      focus: state.altarFocus || "All",
      intention: state.altarIntention || "Clean, focused practice"
    };
  }

  function categories(practice) {
    practice = practice || root.PRACTICE;
    if (!practice) return ["All"];
    return ["All"].concat(Array.from(new Set((practice.drills || []).map(function drillCategory(drill) {
      return drill.category;
    }))));
  }

  function filteredDrills(practice, focus) {
    practice = practice || root.PRACTICE;
    if (!practice) return [];
    var drills = practice.drills || [];
    return focus && focus !== "All" ? drills.filter(function matchesFocus(drill) {
      return drill.category === focus;
    }) : drills;
  }

  function nextDrill(practice, focus, state) {
    practice = practice || root.PRACTICE;
    if (!practice) return null;
    state = state || readState();
    var drills = filteredDrills(practice, focus);
    if (!drills.length) return (practice.drills || [])[0] || null;
    if (state.currentDrill) {
      var current = drills.find(function isCurrent(drill) {
        return drill.id === state.currentDrill;
      });
      if (current) return current;
    }
    var completed = state.completed || {};
    return drills.find(function isIncomplete(drill) {
      return !completed[drill.id];
    }) || drills[0];
  }

  return {
    version: "0.1.0",
    categories: categories,
    filteredDrills: filteredDrills,
    nextDrill: nextDrill,
    preferences: preferences,
    readLog: readLog,
    readState: readState,
    writeLog: writeLog,
    writeState: writeState
  };
});
