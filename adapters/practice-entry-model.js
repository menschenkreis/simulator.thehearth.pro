/*
 * Practice entry model v1.
 *
 * Builds a learner-aware first-click summary without owning drills or lessons.
 */
(function initPracticeEntryModel(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthPracticeEntryModel = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPracticeEntryModel() {
  "use strict";

  function normalizeKey(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function activeLearner(journeyState) {
    var state = journeyState || {};
    var students = Array.isArray(state.students) ? state.students : [];
    return students.find(function findStudent(student) {
      return student.id === state.activeStudentId;
    }) || students[0] || { id: null, name: "My Journey", levels: {} };
  }

  function companionFor(learner, companions) {
    return (companions || {})[normalizeKey(learner && learner.name)] || null;
  }

  function localDay(value) {
    var date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
  }

  function learnerPracticeEvents(events, learnerId) {
    return (Array.isArray(events) ? events : []).filter(function isPracticeEvent(event) {
      return event && event.event_type === "practice_session_completed" && event.learner_id === learnerId;
    }).sort(function newestFirst(a, b) {
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });
  }

  function targetMinutesFor(companion) {
    var candidates = [
      companion && companion.commitment && companion.commitment.title,
      companion && companion.commitment && companion.commitment.today,
      companion && companion.latestReview && companion.latestReview.commitment
    ];
    for (var index = 0; index < candidates.length; index++) {
      var match = String(candidates[index] || "").match(/(\d+)\s*(?:-|\s)?minute/i);
      if (match) return Number(match[1]);
    }
    return 20;
  }

  function latestLessonSignals(learner) {
    var records = [];
    Object.keys((learner && learner.levels) || {}).forEach(function collectLevel(levelId) {
      var level = learner.levels[levelId] || {};
      (level.lessonRecords || []).forEach(function collectRecord(record) {
        records.push(record);
      });
    });
    records.sort(function newestFirst(a, b) {
      return new Date(b.completedAt || b.date || 0) - new Date(a.completedAt || a.date || 0);
    });
    var latest = records[0] || {};
    return [latest.feedback, latest.teacherNotes].filter(Boolean);
  }

  function recommendationsFor(learner, companion) {
    if (companion && Array.isArray(companion.practice) && companion.practice.length) {
      return companion.practice.slice();
    }
    var lessonSignals = latestLessonSignals(learner);
    if (lessonSignals.length) return lessonSignals;
    return [
      "Choose one unfinished drill from Do",
      "Set a small clean target",
      "Finish by making the movement musical"
    ];
  }

  function historyRows(events) {
    return events.slice(0, 4).map(function toHistoryRow(event) {
      var data = event.data || {};
      return {
        createdAt: event.created_at || "",
        minutes: Number(event.duration_minutes) || 0,
        focus: data.focus || event.note || "Practice session"
      };
    });
  }

  function buildSnapshot(options) {
    options = options || {};
    var now = options.now instanceof Date ? options.now : new Date();
    var learner = activeLearner(options.journeyState);
    var companion = companionFor(learner, options.companions);
    var events = learnerPracticeEvents(options.events, learner.id);
    var targetMinutes = targetMinutesFor(companion);
    var todayMinutes = events.reduce(function totalToday(total, event) {
      return localDay(event.created_at) === localDay(now)
        ? total + (Number(event.duration_minutes) || 0)
        : total;
    }, 0);
    var commitment = (companion && companion.commitment) || {};
    var recommendations = recommendationsFor(learner, companion);
    var focus = commitment.today || recommendations[0] || "One small clean practice step.";
    var candleState = options.candleState || {};

    return {
      learner: {
        id: learner.id,
        name: learner.name || "My Journey"
      },
      commitment: {
        title: commitment.title || "Today's planned practice",
        targetMinutes: targetMinutes,
        todayMinutes: todayMinutes,
        currentDay: Number(commitment.currentDay) || null,
        totalDays: Number(commitment.totalDays) || null,
        progressPercent: targetMinutes ? Math.min(100, Math.round(todayMinutes / targetMinutes * 100)) : 0,
        today: focus,
        tomorrow: commitment.tomorrow || "Let today's reflection choose the next small step."
      },
      recommendations: recommendations,
      history: historyRows(events),
      totals: {
        sessions: events.length,
        minutes: events.reduce(function sumMinutes(total, event) {
          return total + (Number(event.duration_minutes) || 0);
        }, 0)
      },
      activeSession: {
        running: Boolean(candleState.running),
        minutes: Number(candleState.durationMinutes) || targetMinutes,
        focus: candleState.focus || focus
      },
      guideText: candleState.running
        ? "Your candle is still burning. Return when you are ready."
        : (learner.name || "This learner") + " has " + targetMinutes + " minutes planned. Begin small, then make it musical."
    };
  }

  return {
    version: "1.0.0",
    activeLearner: activeLearner,
    buildSnapshot: buildSnapshot,
    companionFor: companionFor,
    learnerPracticeEvents: learnerPracticeEvents,
    normalizeKey: normalizeKey
  };
});
