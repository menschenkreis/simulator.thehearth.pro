/* Builds learner-aware Play atlas snapshots without rendering or writing state. */
(function initPlayAtlasModel(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthPlayAtlasModel = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPlayAtlasModel() {
  "use strict";

  function readJson(storage, key, fallback) {
    try {
      var raw = storage && storage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function activeLearner(journeyState) {
    var state = journeyState || {};
    var students = Array.isArray(state.students) ? state.students : [];
    return students.find(function findActive(student) {
      return student.id === state.activeStudentId;
    }) || students[0] || { id: null, name: "My Journey" };
  }

  function eventsForLearner(events, learnerId) {
    return (Array.isArray(events) ? events : []).filter(function matchesLearner(event) {
      return event && event.node_id === "play" && event.learner_id === learnerId;
    });
  }

  function progressByDestination(events) {
    return events.reduce(function collectProgress(progress, event) {
      var destinationId = event.data && event.data.destination_id;
      if (!destinationId) return progress;
      var current = progress[destinationId] || { visits: 0, percent: 0 };
      current.visits += 1;
      current.percent = Math.min(100, current.percent + 25);
      progress[destinationId] = current;
      return progress;
    }, {});
  }

  function markerState(region, selectedId, progress) {
    var destinationProgress = progress[region.id] || {};
    var state = region.id === "mississippi" ? "current" : "open";
    if (destinationProgress.visits) state = "visited";
    return {
      destination_id: region.id,
      state: state,
      selected: region.id === selectedId,
      percent: region.id === "mississippi" ? Math.max(28, destinationProgress.percent || 0) : (destinationProgress.percent || 0)
    };
  }

  function buildSnapshot(options) {
    options = options || {};
    var learner = activeLearner(options.journeyState);
    var regions = Array.isArray(options.regions) ? options.regions : [];
    var traditions = options.traditions || {};
    var learnerEvents = eventsForLearner(options.events, learner.id);
    var destinationProgress = progressByDestination(learnerEvents);
    var selectedId = options.selectedId || "mississippi";
    var selectedRegion = regions.find(function findSelected(region) {
      return region.id === selectedId;
    }) || regions[0] || null;

    return {
      learner: learner,
      regions: regions,
      traditions: traditions,
      selectedRegion: selectedRegion,
      selectedTradition: selectedRegion ? traditions[selectedRegion.id] || null : null,
      markers: regions.map(function buildMarker(region) {
        return markerState(region, selectedRegion && selectedRegion.id, destinationProgress);
      }),
      route: {
        id: "level-one-a-minor-conversation",
        title: "A Minor Musical Conversation",
        summary: "Turn familiar pentatonic notes into call and response.",
        totalMoments: 8,
        defaultMoment: 2,
        currentDestinationId: "mississippi"
      }
    };
  }

  function readRuntimeSnapshot(storage, options) {
    options = options || {};
    return buildSnapshot({
      journeyState: readJson(storage, "hearth-journey-v2", { students: [], activeStudentId: null }),
      events: options.events || [],
      regions: options.regions,
      traditions: options.traditions,
      selectedId: options.selectedId
    });
  }

  return {
    version: "0.1.0",
    activeLearner: activeLearner,
    buildSnapshot: buildSnapshot,
    readRuntimeSnapshot: readRuntimeSnapshot
  };
});
