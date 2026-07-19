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
    { id: "word", label: "Word", symbol: "\u25c7", color: "#ff4444", guide: "A misunderstood word can blank everything after it." },
    { id: "sound", label: "Sound", symbol: "\u266a", color: "#ff8800", guide: "Your ear learns before your fingers obey." },
    { id: "shape", label: "Shape", symbol: "\u2301", color: "#ffcc00", guide: "A concept becomes easier when you can see where it lives." },
    { id: "pattern", label: "Pattern", symbol: "\u2736", color: "#44cc44", guide: "Study connects separate facts into a map." },
    { id: "test", label: "Test", symbol: "?", color: "#3366ff", guide: "If you can explain it simply, it is becoming yours." },
    { id: "review", label: "Review", symbol: "\u21ba", color: "#6633cc", guide: "Forgetting is not failure. It is a signal to revisit." }
  ];

  var SUBJECT_FAMILY_BY_CATEGORY = {
    rhythm: "rhythm",
    "chords-harmony": "harmony",
    arpeggios: "harmony",
    "voice-leading": "harmony",
    scales: "scales",
    fretboard: "scales",
    "technique-improv": "technique",
    picking: "technique",
    fingerstyle: "technique",
    "practice-theory": "technique",
    "reading-music": "reading",
    "dynamics-expression": "listening",
    "world-music": "listening"
  };

  var SUBJECT_TEMPLATES = {
    "a-minor-pentatonic": {
      id: "study-a-minor-pentatonic-v1",
      label: "A-minor pentatonic inquiry",
      family: "scales",
      recommendedDoor: "shape",
      doors: {
        word: { action: "Clear the meaning of root note, tonal centre, and pentatonic.", mode: "Dictionary / scale terms", purpose: "Say why A is home plainly.", activity: "Clear the words root note, tonal centre, and pentatonic without adding more theory.", proof: "Explain in one sentence why A can feel like home." },
        sound: { action: "Listen for which note makes an A-minor phrase feel settled.", mode: "Listening / tonal centre", purpose: "Hear home before finding it.", activity: "Hear a short A minor phrase twice. Notice which note sounds settled when the phrase ends.", proof: "Choose the home note by ear, then confirm it on the guitar." },
        shape: { action: "Find A roots inside the familiar pentatonic map.", mode: "Fretboard / scale map", purpose: "See where A lives in the shape.", activity: "Find the A root notes inside the familiar A minor pentatonic shape, then notice one nearby A-shape landmark.", proof: "Play away from an A root and return to it so the phrase feels complete." },
        pattern: { action: "Connect small pentatonic areas through their A roots.", mode: "Scale relationships", purpose: "Keep a safety point while the map grows.", activity: "Compare the three small pentatonic boxes and mark the A root that anchors each one.", proof: "Move between two boxes without losing the nearest A safety point." },
        test: { action: "Recall the A roots before looking at the diagram.", mode: "Recall / fretboard proof", purpose: "Retrieve the map without a hint.", activity: "Without the diagram, locate two A roots and explain how they support the pentatonic shape.", proof: "Locate, explain, and play the idea once without being shown first." },
        review: { action: "Repeat the part of the A-minor map that remains uncertain.", mode: "Spaced scale review", purpose: "Return to what still needs time.", activity: "Compare today with the last attempt and choose one root, box, or right-hand pattern to repeat tomorrow.", proof: "Name what improved and save one precise next focus." }
      }
    },
    rhythm: {
      id: "study-rhythm-family-v1",
      label: "Rhythm inquiry",
      family: "rhythm",
      recommendedDoor: "word",
      doors: {
        word: { action: "Clear the counting words that organise {subject}.", mode: "Counting / rhythm terms", purpose: "Say the rhythmic frame plainly.", activity: "For {subject}, define beat, measure, and grouping in your own words. If numbers are shown, say what each number tells the player.", proof: "Explain the subject in one sentence and give one count that fits it." },
        sound: { action: "Listen for the pulse and where each group begins.", mode: "Listening / pulse", purpose: "Hear the rhythmic frame before playing it.", activity: "Tap a steady pulse, count two complete groups for {subject}, and make the first beat of each group easy to hear.", proof: "Keep the pulse steady and identify each new group without looking at a diagram." },
        shape: { action: "Turn the rhythm into a visible beat map.", mode: "Beat grid / visual map", purpose: "See how the beats are grouped.", activity: "Draw two measures for {subject}. Mark every beat, circle the first beat, and show any smaller grouping inside the measure.", proof: "Point to the map and count it from start to finish without adding or losing a beat." },
        pattern: { action: "Compare two rhythmic groupings.", mode: "Rhythm relationships", purpose: "Notice what repeats and what changes.", activity: "Make two short examples of {subject} with different beat groupings or accents. Clap both and describe the difference.", proof: "Move between the two examples while keeping the pulse steady." },
        test: { action: "Recall and demonstrate the rhythmic frame without notes.", mode: "Recall / counting proof", purpose: "Retrieve the rhythm without a hint.", activity: "Without looking, write one measure for {subject}, count it aloud, and clap it once.", proof: "Your written measure, spoken count, and clap all agree." },
        review: { action: "Return to the count or grouping that still slips.", mode: "Spaced rhythm review", purpose: "Strengthen the least secure part of the pulse.", activity: "Compare today with the last attempt at {subject}. Choose one count, accent, or grouping to repeat tomorrow.", proof: "Name what stayed steadier and save one precise next rhythm focus." }
      }
    },
    harmony: {
      id: "study-harmony-family-v1",
      label: "Harmony inquiry",
      family: "harmony",
      recommendedDoor: "sound",
      doors: {
        word: { action: "Clear the chord and relationship terms in {subject}.", mode: "Dictionary / harmony terms", purpose: "Say how the notes relate plainly.", activity: "Choose three important terms from {subject} and define each without relying on a chord shape.", proof: "Use the three terms to explain one chord or harmonic relationship in a sentence." },
        sound: { action: "Compare how two harmonic examples feel and resolve.", mode: "Listening / harmony", purpose: "Hear the relationship before naming it.", activity: "Play or listen to two examples from {subject}. Describe what changes and whether either example feels settled or wants to move.", proof: "Identify the examples by ear and give one audible reason for the choice." },
        shape: { action: "Map the notes that make the harmony work.", mode: "Chord tones / visual map", purpose: "See the relationship inside a playable shape.", activity: "Draw or fret one example from {subject}. Mark the root and the note that gives the example its main character.", proof: "Point to both notes, name their jobs, and play them inside the full example." },
        pattern: { action: "Compare two related harmony examples.", mode: "Harmony relationships", purpose: "Notice what stays and what changes.", activity: "Place two examples from {subject} side by side. Mark shared notes, changed notes, and the effect of the change.", proof: "Move between the examples and explain the smallest musical difference." },
        test: { action: "Build or identify one example without a prompt.", mode: "Recall / harmony proof", purpose: "Retrieve the relationship without a hint.", activity: "Without looking, build or name one example from {subject} and explain the role of each essential note.", proof: "Check against the source and correct any note or role you missed." },
        review: { action: "Return to the harmonic distinction that remains uncertain.", mode: "Spaced harmony review", purpose: "Strengthen one useful relationship.", activity: "Compare today with the last attempt at {subject}. Choose one sound, note role, or transition to repeat tomorrow.", proof: "Name what became clearer and save one precise next harmony focus." }
      }
    },
    scales: {
      id: "study-scales-family-v1",
      label: "Scale inquiry",
      family: "scales",
      recommendedDoor: "shape",
      doors: {
        word: { action: "Clear the scale, root, and interval language in {subject}.", mode: "Dictionary / scale terms", purpose: "Say what the note collection does plainly.", activity: "Define the root and two other important terms from {subject}. Explain how they help organise the notes.", proof: "Describe the subject in one sentence without pointing at a diagram." },
        sound: { action: "Listen for the root and the scale's character.", mode: "Listening / scale colour", purpose: "Hear the note collection before mapping it.", activity: "Play or listen to a short example of {subject}. Pause on different notes and notice which note feels most settled.", proof: "Choose the root by ear, then confirm it with the source or instrument." },
        shape: { action: "Map the root notes and one usable part of the scale.", mode: "Fretboard / scale map", purpose: "See where the note collection lives.", activity: "Draw or fret one small area of {subject}. Mark every root note before adding the other notes.", proof: "Play through the area and land deliberately on a marked root." },
        pattern: { action: "Connect two small areas of the scale map.", mode: "Scale relationships", purpose: "Notice how the map repeats and connects.", activity: "Compare two nearby fragments of {subject}. Mark any shared notes and the nearest root in each fragment.", proof: "Move between the fragments without losing the root as a reference point." },
        test: { action: "Recall one usable scale area without a diagram.", mode: "Recall / scale proof", purpose: "Retrieve the map without a hint.", activity: "Without looking, locate a root and play or name a short part of {subject} around it.", proof: "Check the notes, correct any miss, and repeat the clean version once." },
        review: { action: "Return to the part of the scale map that remains uncertain.", mode: "Spaced scale review", purpose: "Strengthen one small usable area.", activity: "Compare today with the last attempt at {subject}. Choose one root, interval, or map fragment to repeat tomorrow.", proof: "Name what improved and save one precise next scale focus." }
      }
    },
    technique: {
      id: "study-technique-family-v1",
      label: "Technique inquiry",
      family: "technique",
      recommendedDoor: "shape",
      doors: {
        word: { action: "Clear the movement and contact language in {subject}.", mode: "Dictionary / movement terms", purpose: "Describe the physical action plainly.", activity: "Choose three movement words from {subject}. Define what each part of the body or instrument should do.", proof: "Give one short instruction that another player could follow safely." },
        sound: { action: "Listen for clean, even, and strained versions of the motion.", mode: "Listening / control", purpose: "Hear whether the movement is working.", activity: "Make or compare two slow examples of {subject}: one controlled and one deliberately uneven. Name the audible difference.", proof: "Identify the controlled example by sound and say what produced it." },
        shape: { action: "Observe the movement at a slow, comfortable speed.", mode: "Movement / visual map", purpose: "See where effort and contact belong.", activity: "Perform {subject} slowly. Mark the starting position, contact point, direction of movement, and where unnecessary tension appears.", proof: "Repeat the motion with the same result and less visible effort." },
        pattern: { action: "Build the motion from one small repeatable unit.", mode: "Movement relationships", purpose: "Notice what stays consistent across repetitions.", activity: "Break {subject} into the smallest useful movement. Repeat it four times slowly, resting between repetitions.", proof: "Keep the movement, sound, and effort level consistent across all four repetitions." },
        test: { action: "Demonstrate the motion once without setup prompts.", mode: "Recall / movement proof", purpose: "Retrieve safe technique without a hint.", activity: "Set up and demonstrate a slow example of {subject} without looking at the instructions first.", proof: "Check position, sound, and tension; then repeat once with any correction." },
        review: { action: "Return to the part of the movement that loses control.", mode: "Spaced technique review", purpose: "Strengthen control without over-repeating.", activity: "Compare today with the last attempt at {subject}. Choose one contact, motion, or relaxation cue to revisit tomorrow.", proof: "Name what felt easier and save one precise next technique focus." }
      }
    },
    reading: {
      id: "study-reading-family-v1",
      label: "Reading inquiry",
      family: "reading",
      recommendedDoor: "shape",
      doors: {
        word: { action: "Clear what the symbols in {subject} instruct you to do.", mode: "Notation / terms", purpose: "Translate notation into plain language.", activity: "Choose three symbols or terms from {subject}. State what each one tells a player to do and when.", proof: "Explain one short written example without playing it." },
        sound: { action: "Connect the written example to what it should sound like.", mode: "Notation / listening", purpose: "Hear the marks as music.", activity: "Clap, sing, or play one short example from {subject}, then point to each mark as its sound happens.", proof: "The sounds occur in the same order and duration as the written example." },
        shape: { action: "Organise the symbols into a readable visual map.", mode: "Notation / visual map", purpose: "See where each instruction applies.", activity: "Copy one short example from {subject}. Label its starting point, direction, grouping, and any repeated sign.", proof: "Trace the example from left to right without losing your place." },
        pattern: { action: "Compare two written examples and their repeated signs.", mode: "Notation relationships", purpose: "Notice how small visual changes alter the result.", activity: "Place two examples from {subject} side by side. Mark what stays the same and what changes in the sound or action.", proof: "Perform or describe both examples and account for every marked difference." },
        test: { action: "Read one short example without advance rehearsal.", mode: "Recall / reading proof", purpose: "Turn notation into action without a hint.", activity: "Choose a short unseen or covered example from {subject}. Read it once slowly, then check each symbol against the source.", proof: "Correct any miss and read the complete example accurately once." },
        review: { action: "Return to the symbol or transition that interrupted the reading.", mode: "Spaced reading review", purpose: "Strengthen one precise decoding step.", activity: "Compare today with the last attempt at {subject}. Choose one symbol, interval, or rhythmic figure to revisit tomorrow.", proof: "Name what read more fluently and save one precise next reading focus." }
      }
    },
    listening: {
      id: "study-listening-family-v1",
      label: "Listening inquiry",
      family: "listening",
      recommendedDoor: "sound",
      doors: {
        word: { action: "Clear the listening words used to describe {subject}.", mode: "Listening vocabulary", purpose: "Describe what you hear precisely.", activity: "Choose three listening terms connected to {subject}. Define each with an audible example rather than a visual shape.", proof: "Use the terms to describe one short sound without naming its source." },
        sound: { action: "Listen closely to two contrasting examples.", mode: "Focused listening", purpose: "Notice the subject directly by ear.", activity: "Hear two short examples of {subject}. Name one shared quality and one audible difference.", proof: "Recognise which example is which on a second listen and give one reason." },
        shape: { action: "Map what changes across the listening timeline.", mode: "Listening map / timeline", purpose: "See the order of what you heard.", activity: "Draw a simple timeline for one example of {subject}. Mark where a sound enters, changes, repeats, and ends.", proof: "Follow the map during a second listen without losing your place." },
        pattern: { action: "Compare recurring sounds and relationships.", mode: "Listening relationships", purpose: "Notice what repeats and develops.", activity: "Find two recurring moments in {subject}. Describe what stays the same and what changes between them.", proof: "Point out both moments during a new listen and describe the change consistently." },
        test: { action: "Describe or identify the subject without a label first.", mode: "Recall / listening proof", purpose: "Retrieve the audible evidence without a hint.", activity: "Listen to one short example of {subject} without looking at its label. Identify it or describe the evidence that connects it to the subject.", proof: "Check the source and name which audible clue was reliable." },
        review: { action: "Return to the audible distinction that remains uncertain.", mode: "Spaced listening review", purpose: "Strengthen one reliable listening clue.", activity: "Compare today with the last attempt at {subject}. Choose one sound, transition, or quality to listen for tomorrow.", proof: "Name what became easier to hear and save one precise next listening focus." }
      }
    },
    general: {
      id: "study-general-inquiry-v1",
      label: "General inquiry",
      family: "general",
      recommendedDoor: "word",
      fallback: true,
      doors: {
        word: { action: "General inquiry: clear one term from the subject material.", mode: "General inquiry / words", purpose: "State one part of the subject plainly.", activity: "General inquiry for {subject}: choose one term used in the material, copy its source context, and rewrite it in your own words.", proof: "Your explanation stays within the supplied material and does not introduce an unrelated topic." },
        sound: { action: "General inquiry: inspect one supplied sound example if available.", mode: "General inquiry / sound", purpose: "Connect one sound to the subject without guessing.", activity: "General inquiry for {subject}: if the material includes a sound example, listen twice and record one observation. If it does not, note that a sound source is still needed.", proof: "Separate what you actually heard from any question that remains open." },
        shape: { action: "General inquiry: organise only the relationships the source provides.", mode: "General inquiry / map", purpose: "Make the supplied information easier to inspect.", activity: "General inquiry for {subject}: draw a small map using only terms and relationships stated in the material. Mark missing connections as questions.", proof: "Every connection points back to the material or is clearly labelled as unknown." },
        pattern: { action: "General inquiry: compare two supplied examples without adding assumptions.", mode: "General inquiry / comparison", purpose: "Notice one supported similarity or difference.", activity: "General inquiry for {subject}: choose two examples from the material and list one similarity, one difference, and one unanswered question.", proof: "Each comparison is supported by the supplied examples." },
        test: { action: "General inquiry: recall one supported idea from the source.", mode: "General inquiry / recall", purpose: "Check what the material actually established.", activity: "General inquiry for {subject}: close the material, write one claim you remember, then reopen it and check the wording and context.", proof: "Correct the claim if needed and keep the source context with it." },
        review: { action: "General inquiry: revisit one unresolved question.", mode: "General inquiry / review", purpose: "Keep uncertainty visible and specific.", activity: "General inquiry for {subject}: review the last note and choose one supported idea to retain or one question that still needs a suitable source.", proof: "Save a precise next question without substituting content from another subject." }
      }
    }
  };

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

  function subjectSearchText(subject) {
    return [subject && subject.id, subject && subject.title, subject && subject.categoryId, subject && subject.topicId]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function familyForSubject(subject) {
    var categoryId = normalizeKey(subject && subject.categoryId);
    if (SUBJECT_FAMILY_BY_CATEGORY[categoryId]) return SUBJECT_FAMILY_BY_CATEGORY[categoryId];

    var text = subjectSearchText(subject);
    if (/rhythm|meter|metre|time signature|subdivision|syncop|beat|tempo/.test(text)) return "rhythm";
    if (/chord|harmony|harmonic|triad|arpeggio|voice leading|cadence/.test(text)) return "harmony";
    if (/scale|pentatonic|mode|fretboard|interval/.test(text)) return "scales";
    if (/technique|picking|fingerstyle|strum|bend|slide|legato|movement/.test(text)) return "technique";
    if (/notation|reading|sight read|staff|clef|note value/.test(text)) return "reading";
    if (/listen|ear training|dynamics|expression|timbre|world music/.test(text)) return "listening";
    return "general";
  }

  function templateForSubject(subject) {
    var family = familyForSubject(subject);
    var text = subjectSearchText(subject);
    if (family === "scales" && /a[ -]minor/.test(text) && /pentatonic/.test(text)) {
      return SUBJECT_TEMPLATES["a-minor-pentatonic"];
    }
    return SUBJECT_TEMPLATES[family] || SUBJECT_TEMPLATES.general;
  }

  function interpolateSubject(value, subject) {
    var title = subject && subject.title ? subject.title : "this subject";
    return String(value || "").replace(/\{subject\}/g, title);
  }

  function activityDoor(door, subject, template) {
    var content = template.doors[door.id] || SUBJECT_TEMPLATES.general.doors[door.id];
    var resolved = {};
    Object.keys(content).forEach(function resolveContent(key) {
      resolved[key] = interpolateSubject(content[key], subject);
    });
    return Object.assign({}, door, resolved, {
      activityId: template.id + "-" + door.id,
      activityLabel: template.label,
      templateId: template.id,
      subjectFamily: template.family,
      usesGeneralFallback: template.fallback === true
    });
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
    var subjectTemplate = templateForSubject(subject);
    subject = Object.assign({}, subject, {
      recommendedDoor: subject.recommendedDoor || subjectTemplate.recommendedDoor,
      subjectFamily: subjectTemplate.family,
      activityTemplateId: subjectTemplate.id,
      usesGeneralFallback: subjectTemplate.fallback === true
    });
    var topicStatus = legacyTopicStatus(storage, subject);
    var doors = DOOR_DEFINITIONS.map(function buildDoor(door) {
      var resolvedDoor = activityDoor(door, subject, subjectTemplate);
      var state = baseState(door, record, subject, topicStatus);
      var saved = record.doors && record.doors[door.id];
      return Object.assign({}, resolvedDoor, {
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

  function evidenceValue(value, limit) {
    if (value == null) return "";
    return String(value).trim().slice(0, limit || 240);
  }

  function recordEvidence(doorId, evidence, options) {
    var storage = storageFor(options);
    var current = snapshot({ storage: storage });
    var door = current.doors.find(function findDoor(item) { return item.id === doorId; });
    if (!door || door.state === "locked") return current;

    var details = evidence && typeof evidence === "object" ? evidence : {};
    var feeling = evidenceValue(details.feeling, 32);
    var understood = feeling === "nailed" || details.understood === true || details.completed === true;
    var needsReview = feeling === "review" || feeling === "stuck" || details.needsReview === true;
    var progress = understood ? 100 : (feeling === "review" ? 60 : feeling === "stuck" ? 30 : 45);
    var pair = learnerRecord(storage, current.learner.id);
    var saved = pair.record.doors[doorId] || {};
    var now = new Date().toISOString();

    saved.state = understood ? "understood" : "visited";
    saved.progress = understood ? 100 : Math.max(Number(saved.progress) || 0, progress);
    saved.visitedAt = saved.visitedAt || now;
    saved.lastEvidenceAt = now;
    saved.needsReview = needsReview;
    saved.evidence = {
      feeling: feeling,
      note: evidenceValue(details.note, 500),
      proof: evidenceValue(details.proof, 500),
      categoryId: evidenceValue(details.categoryId, 80),
      topicId: evidenceValue(details.topicId, 120),
      subjectId: evidenceValue(details.subjectId || current.subject.id, 120),
      subjectTitle: evidenceValue(details.subjectTitle || current.subject.title, 180),
      quizCorrect: Number.isFinite(Number(details.quizCorrect)) ? Number(details.quizCorrect) : null,
      quizTotal: Number.isFinite(Number(details.quizTotal)) ? Number(details.quizTotal) : null
    };
    pair.record.doors[doorId] = saved;
    pair.record.lastVisitedDoor = doorId;
    pair.record.lastVisitedAt = now;
    pair.record.lastEvidence = Object.assign({ doorId: doorId, recordedAt: now }, saved.evidence);
    if (!pair.record.currentSubject) pair.record.currentSubject = current.subject;
    pair.record.attempts = Array.isArray(pair.record.attempts) ? pair.record.attempts : [];
    pair.record.attempts.push({
      doorId: doorId,
      feeling: feeling,
      understood: understood,
      needsReview: needsReview,
      recordedAt: now
    });
    pair.state.learners[current.learner.id] = pair.record;
    pair.state.version = 1;
    writeJson(storage, STORAGE_KEY, pair.state);

    if (root.HearthProgressEvents && typeof root.HearthProgressEvents.append === "function") {
      root.HearthProgressEvents.append({
        event_type: "study_door_evidence_recorded",
        node_id: "study",
        learner_id: current.learner.id,
        data: {
          door_id: doorId,
          subject_id: current.subject.id,
          subject_title: current.subject.title,
          feeling: feeling,
          understood: understood,
          needs_review: needsReview,
          quiz_correct: saved.evidence.quizCorrect,
          quiz_total: saved.evidence.quizTotal
        }
      }, storage);
    }
    return snapshot({ storage: storage });
  }

  return {
    version: "1.1.0",
    storageKey: STORAGE_KEY,
    definitions: function definitions() {
      var subject = { id: "open-study", title: "One clear musical idea" };
      return DOOR_DEFINITIONS.map(function buildGeneralDefinition(door) {
        return activityDoor(door, subject, SUBJECT_TEMPLATES.general);
      });
    },
    snapshot: snapshot,
    markVisited: markVisited,
    recordEvidence: recordEvidence
  };
});
