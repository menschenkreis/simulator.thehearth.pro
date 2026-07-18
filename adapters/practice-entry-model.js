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

  function latestRepeatFocus(events) {
    for (var index = 0; index < (events || []).length; index++) {
      var data = events[index] && events[index].data || {};
      var repeat = data.repeat_next || data.repeat_focus;
      if (repeat) return repeat;
    }
    return "";
  }

  function studySignalFor(studySnapshot) {
    if (!studySnapshot || !studySnapshot.subject) return null;
    var subject = studySnapshot.subject;
    var record = studySnapshot.record || {};
    var evidence = record.lastEvidence || null;
    var door = evidence && studySnapshot.doors
      ? studySnapshot.doors.find(function findDoor(item) { return item.id === evidence.doorId; })
      : null;
    if (evidence && evidence.needsReview) {
      return {
        subject: subject.title,
        door: door ? door.label : "Study",
        progress: door ? door.progress : 0,
        nextFocus: "Return to Study: " + subject.title,
        message: "Study found a useful edge to revisit. Keep this idea small before adding more.",
        needsReview: true
      };
    }
    if (evidence && evidence.feeling === "nailed") {
      return {
        subject: subject.title,
        door: door ? door.label : "Study",
        progress: door ? door.progress : 100,
        nextFocus: "Apply " + subject.title + " in Practice",
        message: "This idea is clear enough to take out of Study and make musical.",
        needsReview: false
      };
    }
    var recommended = (studySnapshot.doors || []).find(function findRecommended(item) {
      return item.state === "recommended";
    });
    if (!recommended) return null;
    return {
      subject: subject.title,
      door: recommended.label,
      progress: recommended.progress,
      nextFocus: "Study " + subject.title,
      message: "Study recommends one clear pass through the " + recommended.label.toLowerCase() + " door before practice.",
      needsReview: false
    };
  }

  function recommendationsFor(learner, companion, events, studySignal) {
    var recommendations = [];
    var repeatFocus = latestRepeatFocus(events);
    if (repeatFocus) recommendations.push(repeatFocus);
    if (studySignal) recommendations.push(studySignal.nextFocus);
    if (companion && Array.isArray(companion.practice) && companion.practice.length) {
      recommendations = recommendations.concat(companion.practice);
    }
    var lessonSignals = latestLessonSignals(learner);
    if (lessonSignals.length) recommendations = recommendations.concat(lessonSignals);
    if (!recommendations.length) {
      recommendations = [
        "Choose one unfinished drill from Do",
        "Set a small clean target",
        "Finish by making the movement musical"
      ];
    }
    return recommendations.filter(function uniqueRecommendation(item, index, list) {
      return item && list.indexOf(item) === index;
    });
  }

  function historyRows(events) {
    return events.slice(0, 4).map(function toHistoryRow(event) {
      var data = event.data || {};
      return {
        id: event.id || event.created_at || "practice-history",
        createdAt: event.created_at || "",
        minutes: Number(event.duration_minutes) || 0,
        focus: data.focus || event.note || "Practice session",
        improved: data.improved || data.feeling || "",
        hard: data.hard || (Array.isArray(data.blockers) ? data.blockers.join(", ") : ""),
        repeatNext: data.repeat_next || event.note || "",
        listeningNote: data.recording_note || ""
      };
    });
  }

  function buildSnapshot(options) {
    options = options || {};
    var now = options.now instanceof Date ? options.now : new Date();
    var learner = activeLearner(options.journeyState);
    var companion = companionFor(learner, options.companions);
    var learnerEvents = (Array.isArray(options.events) ? options.events : []).filter(function belongsToLearner(event) {
      return event && event.learner_id === learner.id;
    }).sort(function newestFirst(a, b) {
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });
    var events = learnerPracticeEvents(learnerEvents, learner.id);
    var studySignal = studySignalFor(options.studySnapshot);
    var targetMinutes = targetMinutesFor(companion);
    var todayMinutes = events.reduce(function totalToday(total, event) {
      return localDay(event.created_at) === localDay(now)
        ? total + (Number(event.duration_minutes) || 0)
        : total;
    }, 0);
    var commitment = (companion && companion.commitment) || {};
    var repeatFocus = latestRepeatFocus(learnerEvents);
    var recommendations = recommendationsFor(learner, companion, learnerEvents, studySignal);
    var focus = repeatFocus || commitment.today || recommendations[0] || "One small clean practice step.";
    var candleState = options.candleState || {};
    var plannedSession = options.plannedSession || null;
    var plannedLearnerId = plannedSession && plannedSession.learner && plannedSession.learner.id;
    var plannedMatchesLearner = !plannedLearnerId || plannedLearnerId === learner.id;
    var candleMatchesLearner = !candleState.learnerId || candleState.learnerId === learner.id;
    var guidedActive = Boolean(plannedSession && !plannedSession.saved && plannedMatchesLearner);
    var candleActive = Boolean(candleState.running && candleMatchesLearner);
    var activeKind = candleActive ? "candle" : guidedActive ? "guided" : "";
    var guidedStepIndex = Number(plannedSession && plannedSession.stepIndex) || 0;

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
      study: studySignal,
      history: historyRows(events),
      totals: {
        sessions: events.length,
        minutes: events.reduce(function sumMinutes(total, event) {
          return total + (Number(event.duration_minutes) || 0);
        }, 0)
      },
      activeSession: {
        running: Boolean(activeKind),
        kind: activeKind,
        minutes: candleActive ? Number(candleState.durationMinutes) || targetMinutes : Number(plannedSession && plannedSession.minutes) || targetMinutes,
        focus: candleActive ? candleState.focus || focus : plannedSession && plannedSession.focus || focus,
        stepIndex: guidedStepIndex,
        stepTitle: options.plannedStepTitle || "Guided practice",
        progressPercent: candleActive
          ? Math.min(100, Math.max(0, Number(candleState.progressPercent) || 0))
          : guidedActive ? Math.round((guidedStepIndex + 1) / 6 * 100) : 0
      },
      guideText: candleActive
        ? "Your candle is still burning. Return when you are ready."
        : guidedActive
          ? "Your guided practice is waiting at " + (options.plannedStepTitle || "the next step") + "."
          : (learner.name || "This learner") + " has " + targetMinutes + " minutes planned. Begin small, then make it musical."
    };
  }

  return {
    version: "1.2.0",
    activeLearner: activeLearner,
    buildSnapshot: buildSnapshot,
    companionFor: companionFor,
    learnerPracticeEvents: learnerPracticeEvents,
    normalizeKey: normalizeKey
  };
});
