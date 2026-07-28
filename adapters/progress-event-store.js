/*
 * Progress event store adapter v0.
 *
 * Writes a simple local event timeline that can later map to backend progress events.
 */
(function initProgressEventStore(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthProgressEvents = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createProgressEventStore(root) {
  "use strict";

  var key = "hearth-progress-events";
  var maxEvents = 1000;

  function readJson(storage, fallback) {
    try {
      var raw = storage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function activeLearnerId(storage) {
    try {
      var state = JSON.parse(storage.getItem("hearth-journey-v2") || "null");
      return state && state.activeStudentId ? state.activeStudentId : null;
    } catch (error) {
      return null;
    }
  }

  function append(event, storage) {
    storage = storage || root.localStorage;
    if (!storage || !event || !event.event_type) return null;
    var events = readJson(storage, []);
    if (!Array.isArray(events)) events = [];
    var timestamp = event.created_at || new Date().toISOString();
    var next = {
      id: event.id || "event-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      version: 1,
      simulator_id: event.simulator_id || "hearth-guitar",
      learner_id: event.learner_id || activeLearnerId(storage),
      event_type: event.event_type,
      node_id: event.node_id || null,
      journey_level_id: event.journey_level_id || null,
      category_id: event.category_id || null,
      lesson_id: event.lesson_id || null,
      drill_id: event.drill_id || null,
      source_id: event.source_id || null,
      duration_minutes: Number.isFinite(event.duration_minutes) ? event.duration_minutes : null,
      rating: Number.isFinite(event.rating) ? event.rating : null,
      note: event.note || "",
      data: event.data || {},
      created_at: timestamp
    };
    events.push(next);
    if (events.length > maxEvents) events = events.slice(events.length - maxEvents);
    storage.setItem(key, JSON.stringify(events));
    return next;
  }

  function list(storage) {
    storage = storage || root.localStorage;
    return readJson(storage, []);
  }

  return {
    version: "0.1.0",
    append: append,
    list: list,
    storageKey: key
  };
});
