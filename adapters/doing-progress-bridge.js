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

  function recordFeedback(options) {
    options = options || {};
    if (options.previousState === options.state) return null;
    var event = feedbackEvent(options);
    var eventStore = options.eventStore;
    if (!event || !eventStore || typeof eventStore.append !== "function") return null;
    return eventStore.append(event, options.storage);
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
    version: "0.1.0",
    categoriesFor: categoriesFor,
    feedbackEvent: feedbackEvent,
    latestFeedback: latestFeedback,
    normalizeLevel: normalizeLevel,
    practiceRecommendations: practiceRecommendations,
    recordFeedback: recordFeedback,
    summaryForJourneyCategory: summaryForJourneyCategory
  };
});
