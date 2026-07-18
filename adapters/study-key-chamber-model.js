/*
 * Study Key Chamber model v1.
 *
 * Keeps Study's learner, subject, door state, and progress decisions in one
 * small adapter. The chamber viewer should render this snapshot, not invent
 * its own Study state.
 */
(function initStudyKeyChamberModel(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.StudyKeyChamberModel = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createStudyKeyChamberModel(root) {
  "use strict";

  var STORAGE_KEY = "hearth-study-chamber-v1";
  var LEGACY_LOCKS_KEY = "hearth-study-locks";
  var LEGACY_PROGRESS_KEY = "hearth-knowing-progress";
  var LEGACY_STATE_KEY = "hearth-knowing-state";

  var DOOR_DEFINITIONS = [
    { id: "word", label: "Word", symbol: "\u25c7", color: "#ff4444", guide: "A misunderstood word can blank everything after it.", action: "Choose one unclear term and clear it before continuing.", mode: "Dictionary / terms", purpose: "Say the idea plainly.", activity: "Clear the words root note, tonal centre, and pentatonic without adding more theory.", proof: "Explain in one sentence why A can feel like home." },
    { id: "sound", label: "Sound", symbol: "\u266a", color: "#ff8800", guide: "Your ear learns before your fingers obey.", action: "Listen to two sounds and decide which feels like home.", mode: "Listening / ear training", purpose: "Hear home before finding it.", activity: "Hear a short A minor phrase twice. Notice which note sounds settled when the phrase ends.", proof: "Choose the home note by ear, then confirm it on the guitar." },
    { id: "shape", label: "Shape", symbol: "\u2301", color: "#ffcc00", guide: "A concept becomes easier when you can see where it lives.", action: "Compare one pattern or note map to the fretboard.", mode: "Fretboard / visual map", purpose: "See where the idea lives.", activity: "Find the A root notes inside the familiar A minor pentatonic shape, then notice one nearby A-shape landmark.", proof: "Play away from an A root and return to it so the phrase feels complete." },
    { id: "pattern", label: "Pattern", symbol: "\u2736", color: "#44cc44", guide: "Study connects separate facts into a map.", action: "Link one idea to the pattern it belongs to.", mode: "Relationships / connections", purpose: "Notice what repeats and connects.", activity: "Compare the three small pentatonic boxes and mark the A root that anchors each one.", proof: "Move between two boxes without losing the nearest A safety point." },
    { id: "test", label: "Test", symbol: "?", color: "#3366ff", guide: "If you can explain it simply, it is becoming yours.", action: "Answer one small recall question without looking first.", mode: "Recall / proof", purpose: "Retrieve it without a hint.", activity: "Without the diagram, locate two A roots and explain how they support the pentatonic shape.", proof: "Locate, explain, and play the idea once without being shown first." },
    { id: "review", label: "Review", symbol: "\u21ba", color: "#6633cc", guide: "Forgetting is not failure. It is a signal to revisit.", action: "Return to one place where the idea still feels uncertain.", mode: "Spaced review", purpose: "Return to what still needs time.", activity: "Compare today with the last attempt and choose one root, box, or right-hand pattern to repeat tomorrow.", proof: "Name what improved and save one precise next focus." }
  ];

  function readJson(storage, key, fallback) {
    try {
      var raw = storage && storage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(storage, key, value) {
    if (storage) storage.setItem(key, JSON.stringify(value));
  }

  function normalizeKey(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function storageFor(options) {
    return (options && options.storage) || root.localStorage || null;
  }

  function journeyState(storage) {
    return readJson(storage, "hearth-journey-v2", { students: [], activeStudentId: null });
  }

  function activeLearner(storage) {
    var state = journeyState(storage);
    var students = Array.isArray(state.students) ? state.students : [];
    var learner = students.find(function findStudent(item) {
      return item.id === state.activeStudentId;
    }) || students[0];
    return learner || { id: "default", name: "My Journey", levels: {} };
  }

  function companionFor(learner) {
    var companions = root.JOURNEY_STUDENT_COMPANIONS || {};
    return companions[normalizeKey(learner && learner.name)] || null;
  }

  function knowing() {
    return root.KNOWING || { categories: [] };
  }

  function findTopic(categoryId, topicId) {
    var categories = knowing().categories || [];
    var category = categories.find(function findCategory(item) {
      return item.id === categoryId;
    });
    if (!category) return null;
    var topic = (category.topics || []).find(function findTopicItem(item) {
      return item.id === topicId;
    });
    return topic ? { category: category, topic: topic } : null;
  }

  function firstTopic() {
    var categories = knowing().categories || [];
    for (var index = 0; index < categories.length; index++) {
      if (categories[index].topics && categories[index].topics.length) {
        return { category: categories[index], topic: categories[index].topics[0] };
      }
    }
    return null;
  }

  function subjectFor(storage, learner, record) {
    var companion = companionFor(learner);
    var saved = record && record.currentSubject;
    if (saved && saved.title) return saved;

    if (companion && companion.studySubject) {
      return Object.assign({ source: "Journey" }, companion.studySubject);
    }

    var knowingState = readJson(storage, LEGACY_STATE_KEY, {});
    var remembered = knowingState.lastTopic ? findTopic(null, knowingState.lastTopic) : null;
    if (!remembered) {
      var categories = knowing().categories || [];
      for (var categoryIndex = 0; categoryIndex < categories.length && !remembered; categoryIndex++) {
        remembered = (categories[categoryIndex].topics || []).find(function matchLastTopic(topic) {
          return topic.id === knowingState.lastTopic;
        });
        if (remembered) remembered = { category: categories[categoryIndex], topic: remembered };
      }
    }

    var fallback = remembered || firstTopic();
    if (!fallback) {
      return {
        id: "open-study",
        title: "One clear musical idea",
        summary: "Choose a topic from the Study shelves when you are ready.",
        source: "Study",
        categoryId: null,
        topicId: null,
        recommendedDoor: "word"
      };
    }

    var topic = fallback.topic;
    return {
      id: topic.id,
      title: topic.title,
      summary: fallback.category.description || "Make this idea clear enough to use.",
      source: topic.source || "Knowing",
      categoryId: fallback.category.id,
      topicId: topic.id,
      recommendedDoor: fallback.category.id === "scales" ? "shape" : "word"
    };
  }

  function emptyRecord() {
    return {
      currentSubject: null,
      doors: {},
      attempts: [],
      notes: [],
      lastVisitedDoor: null,
      lastVisitedAt: null
    };
  }

  function studyState(storage) {
    var state = readJson(storage, STORAGE_KEY, null);
    if (!state || typeof state !== "object" || !state.learners) {
      state = { version: 1, learners: {} };
    }
    return state;
  }

  function learnerRecord(storage, learnerId) {
    var state = studyState(storage);
    if (!state.learners[learnerId]) state.learners[learnerId] = emptyRecord();
    return { state: state, record: state.learners[learnerId] };
  }

  function legacyTopicStatus(storage, subject) {
    if (!subject || !subject.topicId) return null;
    var locks = readJson(storage, LEGACY_LOCKS_KEY, {});
    var knowingProgress = readJson(storage, LEGACY_PROGRESS_KEY, {});
    return locks[subject.topicId] || (knowingProgress[subject.topicId] ? "open" : null);
  }

  function hasVisited(record) {
    return Object.keys((record && record.doors) || {}).some(function hasEvidence(id) {
      return record.doors[id] && record.doors[id].progress > 0;
    });
  }

  function baseState(door, record, subject, topicStatus) {
    var saved = record.doors && record.doors[door.id];
    if (saved && typeof saved === "object" && saved.state) return saved.state;
    if (door.id === "review" && !hasVisited(record)) return "locked";
    if (door.id === "test" && !hasVisited(record) && !topicStatus) return "locked";
    if (door.id === (subject.recommendedDoor || "word")) return "recommended";
    return "available";
  }

  function progressFor(door, record, state) {
    var saved = record.doors && record.doors[door.id];
    if (saved && Number.isFinite(Number(saved.progress))) return Math.max(0, Math.min(100, Number(saved.progress)));
    if (state === "understood") return 100;
    if (state === "visited") return 36;
    if (state === "recommended") return 12;
    return 0;
  }

  function snapshot(options) {
    var storage = storageFor(options);
    var learner = activeLearner(storage);
    var companion = companionFor(learner);
    var pair = learnerRecord(storage, learner.id || "default");
    var record = pair.record;
    var subject = subjectFor(storage, learner, record);
    var topicStatus = legacyTopicStatus(storage, subject);
    var doors = DOOR_DEFINITIONS.map(function buildDoor(door) {
      var state = baseState(door, record, subject, topicStatus);
      var saved = record.doors && record.doors[door.id];
      return Object.assign({}, door, {
        state: state,
        progress: progressFor(door, record, state),
        visitedAt: saved && saved.visitedAt ? saved.visitedAt : null,
        evidence: saved && saved.evidence ? saved.evidence : null
      });
    });
    var progressTotal = doors.reduce(function total(value, door) {
      return value + door.progress;
    }, 0);
    var understood = doors.filter(function isUnderstood(door) { return door.state === "understood"; }).length;
    var visited = doors.filter(function isVisited(door) { return door.progress > 0; }).length;

    return {
      version: 1,
      learner: { id: learner.id || "default", name: learner.name || "My Journey" },
      companion: companion,
      subject: subject,
      doors: doors,
      record: record,
      summary: {
        visited: visited,
        understood: understood,
        progressPercent: Math.round(progressTotal / (doors.length * 100) * 100)
      }
    };
  }

  function markVisited(doorId, options) {
    var storage = storageFor(options);
    var current = snapshot({ storage: storage });
    var door = current.doors.find(function findDoor(item) { return item.id === doorId; });
    if (!door || door.state === "locked") return current;

    var pair = learnerRecord(storage, current.learner.id);
    var saved = pair.record.doors[doorId] || {};
    if (saved.state !== "understood") saved.state = "visited";
    saved.progress = Math.max(Number(saved.progress) || 0, 36);
    saved.visitedAt = new Date().toISOString();
    pair.record.doors[doorId] = saved;
    pair.record.lastVisitedDoor = doorId;
    pair.record.lastVisitedAt = saved.visitedAt;
    if (!pair.record.currentSubject) pair.record.currentSubject = current.subject;
    pair.state.learners[current.learner.id] = pair.record;
    pair.state.version = 1;
    writeJson(storage, STORAGE_KEY, pair.state);

    if (root.HearthProgressEvents && typeof root.HearthProgressEvents.append === "function") {
      root.HearthProgressEvents.append({
        event_type: "study_door_visited",
        node_id: "study",
        learner_id: current.learner.id,
        data: { door_id: doorId, subject_id: current.subject.id, subject_title: current.subject.title }
      }, storage);
    }
    return snapshot({ storage: storage });
  }

  return {
    version: "1.0.0",
    storageKey: STORAGE_KEY,
    definitions: function definitions() { return DOOR_DEFINITIONS.slice(); },
    snapshot: snapshot,
    markVisited: markVisited
  };
});
