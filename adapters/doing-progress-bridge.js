/*
 * Doing progress bridge v0.
 *
 * Translates deliberate drill feedback into shared progress evidence for
 * Practice and Journey without treating a drill rating as lesson completion.
 */
(function initDoingProgressBridge(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthDoingProgressBridge = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingProgressBridge() {
  "use strict";

  var stateOrder = ["seen", "practiced", "clean", "comfortable", "mastered"];
  var stateLabels = {
    seen: "Seen",
    practiced: "Practised",
    clean: "Clean once",
    comfortable: "Comfortable",
    mastered: "Mastered"
  };
  var categoryMap = {
    fretting: ["Technique"],
    scales: ["Scales"],
    rhythm: ["Rhythm"],
    picking: ["Picking", "Technique"],
    chords: ["Chords & Harmony"],
    coordination: ["Integration", "Technique"],
    arpeggios: ["Chords & Harmony"],
    styles: ["Integration"],
    speed: ["Technique"],
    fundamentals: ["Technique"]
  };
  var legacyProgressKey = "hearth-doing-progress";
  var migrationKey = "hearth-doing-progress-migration-v1";

  function readJson(storage, key, fallback) {
    if (!storage || typeof storage.getItem !== "function") return fallback;
    try {
      var value = storage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function activeLearnerId(storage) {
    var journeyState = readJson(storage, "hearth-journey-v2", null);
    if (journeyState && journeyState.activeStudentId) {
      return String(journeyState.activeStudentId);
    }
    if (storage && typeof storage.getItem === "function") {
      var storedId = storage.getItem("hearth-journey-active-student");
      if (storedId) return String(storedId);
    }
    return null;
  }

  function unique(items) {
    return items.filter(function keepUnique(item, index, list) {
      return item && list.indexOf(item) === index;
    });
  }

  function normalizeLevel(value) {
    var match = String(value || "").match(/(\d+)/);
    return match ? "L" + Number(match[1]) : null;
  }

  function parseDuration(value) {
    var match = String(value || "").match(/(\d+)/);
    return match ? Number(match[1]) : null;
  }

  function categoriesFor(categoryId, drill) {
    var categories = (categoryMap[categoryId] || []).slice();
    var text = [drill && drill.id, drill && drill.title, drill && drill.style]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    if (/pima|fingerstyle|rest stroke|free stroke/.test(text)) categories.push("Fingerstyle");
    if (/pentatonic|scale|root note/.test(text)) categories.push("Scales");
    if (/chord|harmony|arpeggio/.test(text)) categories.push("Chords & Harmony");
    if (/strum|rhythm|shuffle|groove|pulse/.test(text)) categories.push("Rhythm");
    if (/pick|plectrum/.test(text)) categories.push("Picking");
    return unique(categories);
  }

  function ratingForState(state) {
    var index = stateOrder.indexOf(state);
    return index < 0 ? null : index + 1;
  }

  function feedbackEvent(options) {
    options = options || {};
    var category = options.category || {};
    var drill = options.drill || {};
    var rating = ratingForState(options.state);
    if (!category.id || !drill.id || rating === null) return null;

    var label = (options.stateLabels || stateLabels)[options.state] || options.state;
    return {
      learner_id: options.learnerId || null,
      event_type: "drill_feedback_recorded",
      node_id: "doing",
      journey_level_id: normalizeLevel(options.level),
      category_id: category.id,
      drill_id: drill.id,
      duration_minutes: parseDuration(drill.duration),
      rating: rating,
      note: (drill.title || drill.id) + ": " + label,
      data: {
        state: options.state,
        state_label: label,
        room: options.room || "library",
        drill_title: drill.title || drill.id,
        category_title: category.title || category.id,
        hand: drill.hand || "",
        journey_categories: categoriesFor(category.id, drill)
      }
    };
  }

  function drillOpenedEvent(options) {
    options = options || {};
    var category = options.category || {};
    var drill = options.drill || {};
    if (!category.id || !drill.id) return null;
    return {
      learner_id: options.learnerId || null,
      event_type: "drill_opened",
      node_id: "doing",
      journey_level_id: normalizeLevel(options.level),
      category_id: category.id,
      drill_id: drill.id,
      duration_minutes: null,
      rating: 1,
      note: (drill.title || drill.id) + ": Seen",
      data: {
        state: "seen",
        state_label: stateLabels.seen,
        room: options.room || "library",
        drill_title: drill.title || drill.id,
        category_title: category.title || category.id,
        hand: drill.hand || "",
        journey_categories: categoriesFor(category.id, drill)
      }
    };
  }

  function recordFeedback(options) {
    options = options || {};
    if (options.previousState === options.state) return null;
    var event = feedbackEvent(options);
    var eventStore = options.eventStore;
    if (!event || !eventStore || typeof eventStore.append !== "function") return null;
    return eventStore.append(event, options.storage);
  }

  function recordOpen(options) {
    options = options || {};
    var event = drillOpenedEvent(options);
    var eventStore = options.eventStore;
    if (!event || !eventStore || typeof eventStore.append !== "function") return null;
    return eventStore.append(event, options.storage);
  }

  function stateForEvent(event) {
    var state = event && event.data && event.data.state;
    if (stateOrder.indexOf(state) >= 0) return state;
    var rating = Number(event && event.rating);
    return Number.isFinite(rating) && rating >= 1 && rating <= stateOrder.length
      ? stateOrder[rating - 1]
      : "";
  }

  function progressForLearner(events, learnerId) {
    if (!learnerId) return {};
    var learnerKey = String(learnerId);
    var latestByDrill = {};
    (Array.isArray(events) ? events : []).forEach(function projectEvent(event, index) {
      if (!event || String(event.learner_id || "") !== learnerKey) return;
      if (event.event_type !== "drill_opened" && event.event_type !== "drill_feedback_recorded") return;
      if (!event.drill_id) return;
      var state = stateForEvent(event);
      if (!state) return;
      var timestamp = Date.parse(event.created_at || "") || 0;
      var current = latestByDrill[event.drill_id];
      if (!current || timestamp > current.timestamp || (timestamp === current.timestamp && index > current.index)) {
        latestByDrill[event.drill_id] = {
          index: index,
          state: state,
          timestamp: timestamp
        };
      }
    });
    return Object.keys(latestByDrill).reduce(function toProgress(progress, drillId) {
      progress[drillId] = latestByDrill[drillId].state;
      return progress;
    }, {});
  }

  function findDrillEntry(doing, drillId) {
    var found = null;
    ((doing && doing.categories) || []).some(function findCategory(category) {
      var drill = (category.drills || []).find(function findDrill(item) {
        return item.id === drillId;
      });
      if (!drill) return false;
      found = { category: category, drill: drill };
      return true;
    });
    return found;
  }

  function migrateLegacyProgress(options) {
    options = options || {};
    var storage = options.storage;
    var eventStore = options.eventStore;
    var learnerId = options.learnerId || activeLearnerId(storage);
    if (!storage || !learnerId || !eventStore || typeof eventStore.append !== "function" ||
        typeof eventStore.list !== "function") {
      return { migrated: false, count: 0, reason: "unavailable" };
    }

    var migration = readJson(storage, migrationKey, null);
    if (migration && migration.assigned_learner_id) {
      return {
        migrated: false,
        count: 0,
        assignedLearnerId: migration.assigned_learner_id,
        reason: migration.assigned_learner_id === learnerId ? "already_migrated" : "assigned_elsewhere"
      };
    }

    var legacy = readJson(storage, legacyProgressKey, {});
    legacy = legacy && typeof legacy === "object" && !Array.isArray(legacy) ? legacy : {};
    var existing = progressForLearner(eventStore.list(storage), learnerId);
    var migratedIds = [];
    var skippedIds = [];
    var failedIds = [];
    var levelForDrill = typeof options.levelForDrill === "function"
      ? options.levelForDrill
      : function fallbackLevel(drill) { return drill && drill.level; };

    Object.keys(legacy).forEach(function migrateDrill(drillId) {
      if (existing[drillId]) return;
      var legacyState = legacy[drillId] === true ? "mastered" : legacy[drillId];
      var entry = findDrillEntry(options.doing, drillId);
      if (!entry || stateOrder.indexOf(legacyState) < 0) {
        skippedIds.push(drillId);
        return;
      }
      var event = feedbackEvent({
        category: entry.category,
        drill: entry.drill,
        learnerId: learnerId,
        level: levelForDrill(entry.drill),
        room: "legacy-migration",
        state: legacyState,
        stateLabels: options.stateLabels || stateLabels
      });
      event.data.migrated_from = legacyProgressKey;
      event.data.migration_version = 1;
      if (eventStore.append(event, storage)) migratedIds.push(drillId);
      else failedIds.push(drillId);
    });

    if (failedIds.length) {
      return {
        migrated: false,
        count: migratedIds.length,
        failedDrillIds: failedIds,
        reason: "append_failed"
      };
    }

    var completedAt = new Date().toISOString();
    storage.setItem(migrationKey, JSON.stringify({
      version: 1,
      assigned_learner_id: learnerId,
      completed_at: completedAt,
      source_key: legacyProgressKey,
      migrated_drill_ids: migratedIds,
      skipped_drill_ids: skippedIds
    }));
    return {
      migrated: true,
      count: migratedIds.length,
      assignedLearnerId: learnerId,
      skippedDrillIds: skippedIds
    };
  }

  function latestFeedback(events, learnerId, level) {
    var normalizedLevel = normalizeLevel(level);
    var seenDrills = {};
    return (Array.isArray(events) ? events : [])
      .filter(function isRelevant(event) {
        if (!event || event.event_type !== "drill_feedback_recorded") return false;
        if (learnerId && event.learner_id !== learnerId) return false;
        if (normalizedLevel && normalizeLevel(event.journey_level_id) !== normalizedLevel) return false;
        return true;
      })
      .sort(function newestFirst(a, b) {
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      })
      .filter(function latestPerDrill(event) {
        var key = event.drill_id || event.id;
        if (seenDrills[key]) return false;
        seenDrills[key] = true;
        return true;
      });
  }

  function eventCategories(event) {
    var data = event && event.data || {};
    if (Array.isArray(data.journey_categories) && data.journey_categories.length) {
      return data.journey_categories;
    }
    return categoryMap[event && event.category_id] || [];
  }

  function summaryForJourneyCategory(events, learnerId, categoryLabel, level) {
    var evidence = latestFeedback(events, learnerId, level).filter(function matchesCategory(event) {
      return eventCategories(event).indexOf(categoryLabel) !== -1;
    });
    if (!evidence.length) return null;
    var strongest = evidence.reduce(function strongestRating(best, event) {
      return (Number(event.rating) || 0) > (Number(best.rating) || 0) ? event : best;
    }, evidence[0]);
    var strongestState = strongest.data && strongest.data.state || stateOrder[(Number(strongest.rating) || 1) - 1] || "seen";
    var strongestLabel = strongest.data && strongest.data.state_label || stateLabels[strongestState] || strongestState;
    return {
      count: evidence.length,
      strongestState: strongestState,
      strongestLabel: strongestLabel,
      label: "Do practice: " + evidence.length + " " + (evidence.length === 1 ? "drill" : "drills") + " · " + strongestLabel,
      events: evidence
    };
  }

  function practiceRecommendations(events, learnerId, limit) {
    var recommendations = latestFeedback(events, learnerId)
      .filter(function unfinished(event) {
        return (event.data && event.data.state) !== "mastered" && Number(event.rating) < 5;
      })
      .sort(function weakestFirst(a, b) {
        var ratingDifference = (Number(a.rating) || 0) - (Number(b.rating) || 0);
        if (ratingDifference) return ratingDifference;
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      })
      .map(function toRecommendation(event) {
        var data = event.data || {};
        var title = data.drill_title || event.note || "this Do drill";
        if (data.state === "comfortable") return "Use " + title + " in a groove or song";
        if (data.state === "clean") return "Repeat " + title + " until the clean pass is reliable";
        if (data.state === "practiced") return "Repeat " + title + " for one cleaner pass";
        return "Make " + title + " easier, then try one calm pass";
      });
    return unique(recommendations).slice(0, Number(limit) || 2);
  }

  return {
    version: "0.2.0",
    activeLearnerId: activeLearnerId,
    categoriesFor: categoriesFor,
    drillOpenedEvent: drillOpenedEvent,
    feedbackEvent: feedbackEvent,
    latestFeedback: latestFeedback,
    legacyProgressKey: legacyProgressKey,
    migrateLegacyProgress: migrateLegacyProgress,
    migrationKey: migrationKey,
    normalizeLevel: normalizeLevel,
    practiceRecommendations: practiceRecommendations,
    recordFeedback: recordFeedback,
    recordOpen: recordOpen,
    progressForLearner: progressForLearner,
    stateForEvent: stateForEvent,
    summaryForJourneyCategory: summaryForJourneyCategory
  };
});
