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
  var evidenceRules = {
    minimumAttemptGapMs: 30000,
    comfortableCleanPasses: 2,
    masteredCleanPasses: 3,
    masteredDistinctDays: 2
  };
  var idSequence = 0;
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

  function evidenceStageForState(state) {
    if (state === "seen" || state === "practiced") return "attempt";
    return "demonstration";
  }

  function uniqueId(prefix) {
    idSequence += 1;
    return prefix + "-" + Date.now().toString(36) + "-" + idSequence.toString(36) + "-" +
      Math.random().toString(36).slice(2, 7);
  }

  function eventTimestampValue(options) {
    return options.occurredAt || new Date().toISOString();
  }

  function defaultReturnRoute(category, drill, room) {
    return {
      node_id: "doing",
      view_id: "room-concept",
      params: {
        room_id: room || "library",
        category_id: category.id,
        drill_id: drill.id
      }
    };
  }

  function normalizeReturnRoute(route, category, drill, room) {
    if (!route || !route.node_id) return defaultReturnRoute(category, drill, room);
    if (route.view_id && route.params && typeof route.params === "object") {
      return {
        node_id: route.node_id,
        view_id: route.view_id,
        params: route.params
      };
    }
    var params = {};
    Object.keys(route).forEach(function copyLegacyRouteField(key) {
      if (["node_id", "view", "view_id", "params", "fallback_instruction"].indexOf(key) < 0) {
        params[key] = route[key];
      }
    });
    return {
      node_id: route.node_id,
      view_id: route.view_id || route.view || "entry",
      params: params
    };
  }

  function passConditionFor(drill) {
    return {
      description: drill.passCondition || "Complete one calm pass using the drill's success check.",
      minimum_evidence_stage: "demonstration",
      criteria: { drill_id: drill.id }
    };
  }

  function easierStepFor(drill) {
    return {
      instruction: drill.easier || "Slow down, reduce the movement, and try one calm pass.",
      parameters: { drill_id: drill.id, recommended_difficulty: "easier" }
    };
  }

  function sharedContext(options, category, drill) {
    var state = options.state || "seen";
    var occurredAt = eventTimestampValue(options);
    var easierStep = easierStepFor(drill);
    return {
      destination_node_id: options.destinationNodeId || null,
      activity_id: drill.id,
      capability_ids: Array.isArray(drill.capabilityIds) ? drill.capabilityIds.slice() : [],
      related_capability_ids: Array.isArray(drill.relatedCapabilityIds) ? drill.relatedCapabilityIds.slice() : [],
      task: {
        id: drill.id,
        instruction: drill.goal || drill.title || "Complete the selected Do drill.",
        parameters: {
          drill_id: drill.id,
          room_id: options.room || "library",
          hand: drill.hand || null,
          tempo: drill.bpm || null,
          duration_minutes: parseDuration(drill.duration)
        }
      },
      evidence_stage: options.evidenceStage || evidenceStageForState(state),
      evidence_source: options.evidenceSource || "self_report",
      pass_condition: passConditionFor(drill),
      easier_step: easierStep,
      recommended_difficulty: state === "seen" ? "easier" : state === "mastered" ? "apply_musically" : "same",
      session_id: options.sessionId || options.practiceSessionId || null,
      handoff_id: options.handoffId || null,
      return_route: normalizeReturnRoute(options.returnRoute, category, drill, options.room),
      fallback_instruction: easierStep.instruction,
      occurred_at: occurredAt,
      recorded_at: options.recordedAt || occurredAt
    };
  }

  function feedbackEvent(options) {
    options = options || {};
    var category = options.category || {};
    var drill = options.drill || {};
    var rating = ratingForState(options.state);
    if (!options.learnerId || !category.id || !drill.id || rating === null) return null;

    var label = (options.stateLabels || stateLabels)[options.state] || options.state;
    var context = sharedContext(options, category, drill);
    var attemptId = options.attemptId || uniqueId("doing-attempt");
    return {
      id: options.eventId || uniqueId("doing-event"),
      version: 1,
      simulator_id: "hearth-guitar",
      learner_id: options.learnerId,
      actor_role: options.actorRole || "learner",
      event_type: "drill_feedback_recorded",
      node_id: "doing",
      destination_node_id: context.destination_node_id,
      journey_level_id: normalizeLevel(options.level),
      category_id: category.id,
      lesson_id: options.lessonId || null,
      activity_id: context.activity_id,
      drill_id: drill.id,
      capability_ids: context.capability_ids,
      attempt_id: attemptId,
      session_id: context.session_id,
      handoff_id: context.handoff_id,
      evidence_stage: context.evidence_stage,
      evidence_source: context.evidence_source,
      duration_minutes: parseDuration(drill.duration),
      rating: rating,
      note: (drill.title || drill.id) + ": " + label,
      occurred_at: context.occurred_at,
      recorded_at: context.recorded_at,
      created_at: context.occurred_at,
      return_route: context.return_route,
      fallback_instruction: context.fallback_instruction,
      data: {
        state: options.state,
        state_label: label,
        room: options.room || "library",
        drill_title: drill.title || drill.id,
        category_title: category.title || category.id,
        hand: drill.hand || "",
        journey_categories: categoriesFor(category.id, drill),
        destination_node_id: context.destination_node_id,
        activity_id: context.activity_id,
        capability_ids: context.capability_ids,
        related_capability_ids: context.related_capability_ids,
        attempt_id: attemptId,
        session_id: context.session_id,
        handoff_id: context.handoff_id,
        evidence_stage: context.evidence_stage,
        evidence_source: context.evidence_source,
        occurred_at: context.occurred_at,
        recorded_at: context.recorded_at,
        task: context.task,
        pass_condition: context.pass_condition,
        easier_step: context.easier_step,
        recommended_difficulty: context.recommended_difficulty,
        return_route: context.return_route,
        fallback_instruction: context.fallback_instruction
      }
    };
  }

  function drillOpenedEvent(options) {
    options = options || {};
    var category = options.category || {};
    var drill = options.drill || {};
    if (!options.learnerId || !category.id || !drill.id) return null;
    options.state = "seen";
    options.evidenceStage = "contact";
    options.evidenceSource = "direct_interaction";
    var context = sharedContext(options, category, drill);
    return {
      id: options.eventId || uniqueId("doing-event"),
      version: 1,
      simulator_id: "hearth-guitar",
      learner_id: options.learnerId,
      actor_role: options.actorRole || "learner",
      event_type: "drill_opened",
      node_id: "doing",
      destination_node_id: context.destination_node_id,
      journey_level_id: normalizeLevel(options.level),
      category_id: category.id,
      lesson_id: options.lessonId || null,
      activity_id: context.activity_id,
      drill_id: drill.id,
      capability_ids: context.capability_ids,
      attempt_id: null,
      session_id: context.session_id,
      handoff_id: context.handoff_id,
      evidence_stage: context.evidence_stage,
      evidence_source: context.evidence_source,
      duration_minutes: null,
      rating: 1,
      note: (drill.title || drill.id) + ": Seen",
      occurred_at: context.occurred_at,
      recorded_at: context.recorded_at,
      created_at: context.occurred_at,
      return_route: context.return_route,
      fallback_instruction: context.fallback_instruction,
      data: {
        state: "seen",
        state_label: stateLabels.seen,
        room: options.room || "library",
        drill_title: drill.title || drill.id,
        category_title: category.title || category.id,
        hand: drill.hand || "",
        journey_categories: categoriesFor(category.id, drill),
        destination_node_id: context.destination_node_id,
        activity_id: context.activity_id,
        capability_ids: context.capability_ids,
        related_capability_ids: context.related_capability_ids,
        attempt_id: null,
        session_id: context.session_id,
        handoff_id: context.handoff_id,
        evidence_stage: context.evidence_stage,
        evidence_source: context.evidence_source,
        occurred_at: context.occurred_at,
        recorded_at: context.recorded_at,
        task: context.task,
        pass_condition: context.pass_condition,
        easier_step: context.easier_step,
        recommended_difficulty: context.recommended_difficulty,
        return_route: context.return_route,
        fallback_instruction: context.fallback_instruction
      }
    };
  }

  function recordFeedback(options) {
    options = options || {};
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

  function stateRank(state) {
    return stateOrder.indexOf(state);
  }

  function eventTimestamp(event) {
    var timestamp = Date.parse(event && (event.created_at || event.occurred_at) || "");
    return Number.isFinite(timestamp) ? timestamp : 0;
  }

  function eventDay(event) {
    var timestamp = eventTimestamp(event);
    return timestamp ? new Date(timestamp).toISOString().slice(0, 10) : "";
  }

  function independentCleanAttempts(feedbackEvents) {
    var lastAcceptedTimestamp = null;
    var lastAcceptedDay = "";
    var acceptedWithoutTimestamp = false;
    var seenAttemptIds = {};
    return feedbackEvents.filter(function isIndependentCleanAttempt(event) {
      if (stateRank(stateForEvent(event)) < stateRank("clean")) return false;
      var attemptId = event && (event.attempt_id || event.data && event.data.attempt_id);
      if (attemptId && seenAttemptIds[attemptId]) return false;
      var timestamp = eventTimestamp(event);
      var day = eventDay(event);
      if (!timestamp && acceptedWithoutTimestamp) return false;
      if (!timestamp || lastAcceptedTimestamp === null || day !== lastAcceptedDay ||
          timestamp - lastAcceptedTimestamp >= evidenceRules.minimumAttemptGapMs) {
        if (attemptId) seenAttemptIds[attemptId] = true;
        if (!timestamp) acceptedWithoutTimestamp = true;
        lastAcceptedTimestamp = timestamp || lastAcceptedTimestamp;
        lastAcceptedDay = day || lastAcceptedDay;
        return true;
      }
      return false;
    });
  }

  function evidenceMessage(evidence) {
    if (evidence.needsEasierStep) {
      return "Today's attempt was too hard. Use the easier step, then record a fresh attempt.";
    }
    if (evidence.projectedState === "mastered") {
      return evidence.cleanPasses + " clean attempts across " + evidence.distinctDays + " days support mastery.";
    }
    if (evidence.projectedState === "comfortable") {
      if (evidence.distinctDays < evidenceRules.masteredDistinctDays) {
        return evidence.cleanPasses + " separate clean attempts recorded. Return on another day before mastery.";
      }
      return evidence.cleanPasses + " clean attempts recorded. One confident clean attempt still stands between this and mastery.";
    }
    if (evidence.projectedState === "clean") {
      return "One clean attempt recorded. A fresh second clean attempt builds comfort; mastery needs evidence on another day.";
    }
    if (evidence.projectedState === "practiced") {
      return "A practice attempt is recorded. Use the success check to find the first clean pass.";
    }
    return evidence.projectedState === "seen"
      ? "The drill has been opened. Try the smallest version that feels calm and clear."
      : "No drill evidence has been recorded yet.";
  }

  function evidenceForDrill(events, learnerId, drillId) {
    if (!learnerId || !drillId) {
      return {
        projectedState: "",
        latestSelfState: "",
        feedbackCount: 0,
        cleanPasses: 0,
        distinctDays: 0,
        needsEasierStep: false,
        message: "No drill evidence has been recorded yet."
      };
    }
    var learnerKey = String(learnerId);
    var relevant = (Array.isArray(events) ? events : []).map(function withIndex(event, index) {
      return { event: event, index: index };
    }).filter(function isRelevant(item) {
      var event = item.event;
      return event && String(event.learner_id || "") === learnerKey && event.drill_id === drillId &&
        (event.event_type === "drill_opened" || event.event_type === "drill_feedback_recorded");
    }).sort(function chronological(a, b) {
      var difference = eventTimestamp(a.event) - eventTimestamp(b.event);
      return difference || a.index - b.index;
    }).map(function unwrap(item) { return item.event; });

    var feedback = relevant.filter(function isFeedback(event) {
      return event.event_type === "drill_feedback_recorded";
    });
    var cleanAttempts = independentCleanAttempts(feedback);
    var days = unique(cleanAttempts.map(eventDay));
    var latestFeedback = feedback.length ? feedback[feedback.length - 1] : null;
    var latestSelfState = stateForEvent(latestFeedback);
    var confidentAttempt = cleanAttempts.some(function isConfident(event) {
      return stateRank(stateForEvent(event)) >= stateRank("comfortable");
    });
    var projectedState = "";

    if (cleanAttempts.length >= evidenceRules.masteredCleanPasses &&
        days.length >= evidenceRules.masteredDistinctDays && confidentAttempt) {
      projectedState = "mastered";
    } else if (cleanAttempts.length >= evidenceRules.comfortableCleanPasses) {
      projectedState = "comfortable";
    } else if (cleanAttempts.length) {
      projectedState = "clean";
    } else if (feedback.some(function hasPractice(event) { return stateForEvent(event) === "practiced"; })) {
      projectedState = "practiced";
    } else if (relevant.length) {
      projectedState = "seen";
    }

    feedback.forEach(function preserveMigratedBaseline(event) {
      var data = event.data || {};
      var migratedState = data.migrated_from ? stateForEvent(event) : "";
      if (stateRank(migratedState) > stateRank(projectedState)) projectedState = migratedState;
    });

    var evidence = {
      projectedState: projectedState,
      latestSelfState: latestSelfState,
      feedbackCount: feedback.length,
      cleanPasses: cleanAttempts.length,
      distinctDays: days.length,
      needsEasierStep: latestSelfState === "seen",
      latestFeedback: latestFeedback,
      rules: evidenceRules
    };
    evidence.message = evidenceMessage(evidence);
    return evidence;
  }

  function progressForLearner(events, learnerId) {
    if (!learnerId) return {};
    var learnerKey = String(learnerId);
    var drillIds = [];
    (Array.isArray(events) ? events : []).forEach(function projectEvent(event) {
      if (!event || String(event.learner_id || "") !== learnerKey) return;
      if (event.event_type !== "drill_opened" && event.event_type !== "drill_feedback_recorded") return;
      if (!event.drill_id) return;
      if (drillIds.indexOf(event.drill_id) < 0) drillIds.push(event.drill_id);
    });
    return drillIds.reduce(function toProgress(progress, drillId) {
      var evidence = evidenceForDrill(events, learnerId, drillId);
      if (evidence.projectedState) progress[drillId] = evidence.projectedState;
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
        evidenceStage: legacyState === "seen" ? "contact" : evidenceStageForState(legacyState),
        evidenceSource: "migrated_legacy",
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
        return eventTimestamp(b) - eventTimestamp(a);
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
    var projected = evidence.map(function projectDrill(event) {
      return evidenceForDrill(events, learnerId, event.drill_id);
    });
    var strongest = projected.reduce(function strongestEvidence(best, item) {
      return stateRank(item.projectedState) > stateRank(best.projectedState) ? item : best;
    }, projected[0]);
    var strongestState = strongest.projectedState || "seen";
    var strongestLabel = stateLabels[strongestState] || strongestState;
    return {
      count: evidence.length,
      strongestState: strongestState,
      strongestLabel: strongestLabel,
      label: "Do practice: " + evidence.length + " " + (evidence.length === 1 ? "drill" : "drills") + " · " + strongestLabel,
      events: evidence,
      evidence: projected
    };
  }

  function practiceRecommendations(events, learnerId, limit) {
    var recommendations = latestFeedback(events, learnerId)
      .filter(function unfinished(event) {
        var evidence = evidenceForDrill(events, learnerId, event.drill_id);
        return evidence.projectedState !== "mastered" || evidence.needsEasierStep;
      })
      .sort(function weakestFirst(a, b) {
        var aState = evidenceForDrill(events, learnerId, a.drill_id).projectedState;
        var bState = evidenceForDrill(events, learnerId, b.drill_id).projectedState;
        var ratingDifference = stateRank(aState) - stateRank(bState);
        if (ratingDifference) return ratingDifference;
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      })
      .map(function toRecommendation(event) {
        var data = event.data || {};
        var title = data.drill_title || event.note || "this Do drill";
        var evidence = evidenceForDrill(events, learnerId, event.drill_id);
        if (evidence.needsEasierStep) {
          var easierInstruction = data.easier_step && typeof data.easier_step === "object"
            ? data.easier_step.instruction
            : data.easier_step;
          return "Easier step for " + title + ": " + (easierInstruction || data.fallback_instruction || "Slow down and reduce the movement.");
        }
        if (evidence.projectedState === "comfortable") return "Use " + title + " in a groove or song";
        if (evidence.projectedState === "clean") return "Repeat " + title + " until the clean pass is reliable";
        if (evidence.projectedState === "practiced") return "Repeat " + title + " for one cleaner pass";
        return "Make " + title + " easier, then try one calm pass";
      });
    return unique(recommendations).slice(0, Number(limit) || 2);
  }

  return {
    version: "0.3.0",
    activeLearnerId: activeLearnerId,
    categoriesFor: categoriesFor,
    drillOpenedEvent: drillOpenedEvent,
    evidenceForDrill: evidenceForDrill,
    evidenceRules: evidenceRules,
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
