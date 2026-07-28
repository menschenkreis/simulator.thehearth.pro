// Active Study Key Chamber entrance.
(function initStudyKeyChamberViewer(root) {
  "use strict";

  var GOLD = "#d4af69";
  var AMBER = "#e8a020";
  var fallbackStudySession = root.showStudySession;
  var fallbackStudyAssess = root._studyAssess;

  var currentDoorIndex = 0;
  var panelOpen = false;
  var activeHandoff = null;

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[ch];
    });
  }

  function panel() {
    root.document.querySelectorAll(".pnl").forEach(function (pnl) {
      pnl.classList.remove("on");
    });
    var el = root.document.getElementById("p-foundation");
    if (el) el.classList.add("on");
    return el;
  }

  function modelSnapshot() {
    if (root.StudyKeyChamberModel) {
      return root.StudyKeyChamberModel.snapshot({ storage: root.localStorage });
    }
    return { doors: [], subject: { title: "One clear musical idea", summary: "" }, learner: { name: "My Journey" }, summary: {} };
  }

  function handoffStore() {
    if (!root.HearthCrossNodeHandoffStore || typeof root.HearthCrossNodeHandoffStore.createStore !== "function") return null;
    return root.HearthCrossNodeHandoffStore.createStore({ storage: root.sessionStorage });
  }

  function readStudyHandoff() {
    var store = handoffStore();
    var snapshot = modelSnapshot();
    return store ? store.current({ learnerId: snapshot.learner.id, destinationNodeId: "study" }) : null;
  }

  function returnButton() {
    return activeHandoff
      ? '<button class="back-btn" onclick="StudyKeyChamber.returnToSource()">\u2190 Return to Journey</button>'
      : '<button class="back-btn" onclick="backToMap()">\u2190 Map</button>';
  }

  function recommendedDoorIndex(handoff) {
    var snapshot = modelSnapshot();
    var parameters = handoff && handoff.task && handoff.task.parameters || {};
    var requestedId = parameters.recommended_door || (snapshot.subject && snapshot.subject.recommendedDoor) || "word";
    var index = snapshot.doors.findIndex(function findDoor(door) { return door.id === requestedId; });
    return index >= 0 ? index : 0;
  }

  function doorStateColor(state) {
    if (state === "locked") return "#666";
    if (state === "recommended") return AMBER;
    if (state === "understood") return "#2ecc71";
    if (state === "visited") return GOLD;
    if (state === "open") return GOLD;
    return "#888";
  }

  function doorStateLabel(state) {
    if (state === "locked") return "LOCKED";
    if (state === "recommended") return "RECOMMENDED";
    if (state === "understood") return "UNDERSTOOD";
    if (state === "visited") return "VISITED";
    return "OPEN";
  }

  function guideText(snapshot) {
    var door = snapshot.doors[currentDoorIndex];
    if (!door) return "Choose one door and make one idea clearer.";
    if (panelOpen) return "";
    if (door.state === "locked") return "This door is not needed yet. Start with an available door, then return here when there is evidence to review.";
    if (door.state === "recommended") return door.guide + " This is the safest next route for this subject.";
    return door.guide;
  }

  function doorHotspot(slot, door, offset) {
    var selected = slot === 0;
    var locked = selected && door.state === "locked";
    var state = doorStateLabel(door.state).toLowerCase();
    var action = selected ? (locked ? "Locked" : "Open") : "Select";
    var handler = selected ? "StudyKeyChamber.enter()" : "StudyKeyChamber.rotate(" + offset + ")";
    return (
      '<button type="button" class="sk-door-hotspot' + (selected ? " is-selected" : "") + '" data-slot="' + slot + '" style="--sk-door-color:' + doorStateColor(door.state) + '"' + (locked ? " disabled" : ' onclick="' + handler + '"') + ' aria-label="' + action + " " + esc(door.label) + " door, " + esc(state) + '">' +
      '<span class="sk-door-slot-label">' + esc(door.label) + "</span>" +
      "</button>"
    );
  }

  function renderChamberStage(snapshot, current) {
    var total = snapshot.doors.length;
    function doorAt(offset) {
      return snapshot.doors[(currentDoorIndex + offset + total) % total];
    }
    return (
      '<div class="sk-stage sk-stage--image">' +
      '<img class="sk-chamber-image" src="images/study/study-key-chamber-concept-v1.png" alt="A circular study chamber with six doors">' +
      '<div class="sk-chamber-shade" aria-hidden="true"></div>' +
      doorHotspot(-2, doorAt(-2), -2) +
      doorHotspot(-1, doorAt(-1), -1) +
      doorHotspot(0, current, 0) +
      doorHotspot(1, doorAt(1), 1) +
      doorHotspot(2, doorAt(2), 2) +
      '<div class="sk-selected-door" style="--sk-door-color:' + doorStateColor(current.state) + '" aria-hidden="true">' +
      '<span>' + esc(doorStateLabel(current.state)) + "</span>" +
      '<strong>' + esc(current.label) + "</strong>" +
      '<small>' + esc(current.mode) + "</small>" +
      "</div>" +
      '<button type="button" class="sk-turn sk-turn--previous" onclick="StudyKeyChamber.rotate(-1)" aria-label="Previous Study door">\u2039</button>' +
      '<button type="button" class="sk-turn sk-turn--next" onclick="StudyKeyChamber.rotate(1)" aria-label="Next Study door">\u203a</button>' +
      "</div>"
    );
  }

  function renderStudyChamber() {
    var el = panel();
    if (!el) return;
    var snapshot = modelSnapshot();
    var doors = snapshot.doors;
    if (!doors.length) return;
    var total = doors.length;
    currentDoorIndex = Math.max(0, Math.min(currentDoorIndex, total - 1));
    var current = doors[currentDoorIndex];
    var color = doorStateColor(current.state);

    el.innerHTML =
      '<div class="sk-wrap">' +
      returnButton() +
      '<div class="sk-scene">' +
      '<div class="sk-top">' +
      "<div>" +
      '<div class="sk-kicker">Study</div>' +
      '<div class="sk-title">The Key Chamber</div>' +
      '<div class="sk-sub">Study is where the books unlock doors. Choose the kind of clarity you need.</div>' +
      '<div style="margin-top:12px;padding:9px 11px;border:1px solid ' + color + '55;border-radius:10px;background:' + color + '10;max-width:520px">' +
      '<div class="sk-kicker" style="color:' + color + '">Current study · ' + esc(snapshot.learner.name) + '</div>' +
      '<div style="font-family:Cinzel;color:var(--text);font-size:.86rem;margin-top:3px">' + esc(snapshot.subject.title) + '</div>' +
      '<div style="font-size:.68rem;color:var(--dim);margin-top:3px">' + esc(snapshot.subject.summary || "Make one idea clear enough to use.") + '</div>' +
      '</div>' +
      "</div>" +
      '<div class="sk-guide">' +
      '<img src="images/character-symbols/Thinking Question Mark.png" alt="">' +
      "<div>" + esc(guideText(snapshot)) + "</div>" +
      "</div>" +
      "</div>" +
      renderChamberStage(snapshot, current) +
      "</div>" +
      '<div class="sk-drawer" id="sk-drawer">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">' +
      "<div>" +
      '<div class="sk-kicker" style="color:' + color + '">' + esc(current.mode) + "</div>" +
      '<div style="font-family:Cinzel;color:var(--gold);font-size:.9rem">' + esc(current.label) + " Door</div>" +
      "</div>" +
      (current.state !== "locked"
        ? '<button class="sf-primary" style="--sf:' + color + '" onclick="StudyKeyChamber.enter()">Enter Door</button>'
        : '<button class="sf-secondary" disabled style="opacity:.4">Locked</button>') +
      "</div>" +
      '<div style="font-size:.75rem;color:var(--dim);line-height:1.5">' + esc(current.guide) + "</div>" +
      '<div style="font-size:.72rem;color:var(--amber);margin-top:6px">' + esc(current.action) + "</div>" +
      '<div style="font-size:.64rem;color:var(--dim);margin-top:8px">' + current.progress + '% explored · ' + doorStateLabel(current.state).toLowerCase() + ' · ' + esc(snapshot.summary.visited) + '/6 doors visited</div>' +
      "</div>" +
      "</div>";
  }

  function renderDoorPanel(doorId) {
    var el = panel();
    if (!el) return;
    var snapshot = modelSnapshot();
    var door = snapshot.doors.find(function (item) {
      return item.id === doorId;
    });
    if (!door) {
      renderStudyChamber();
      return;
    }
    renderDoorActivity(door, snapshot);
  }

  function renderDoorActivity(door, snapshot) {
    var el = panel();
    if (!el) return;
    el.innerHTML =
      '<div class="sk-panel">' +
      '<button class="back-btn" onclick="StudyKeyChamber.back()">\u2190 Back to Chamber</button>' +
      '<div class="sk-panel-card">' +
      '<div class="sk-mode">' + esc(door.mode) + "</div>" +
      "<h3>" + door.symbol + " " + esc(door.label) + "</h3>" +
      '<div style="font-size:.68rem;color:var(--dim);margin-bottom:12px">Current study: ' + esc(snapshot.subject.title) + '</div>' +
      '<div class="sk-guide-text">' + esc(door.guide) + "</div>" +
      '<div class="sk-activity-block"><div class="sk-kicker">Do this</div><p>' + esc(door.activity) + '</p></div>' +
      '<div class="sk-activity-block"><div class="sk-kicker">This is enough when</div><p>' + esc(door.proof) + '</p></div>' +
      '<label class="sk-evidence-note"><span>Optional note</span><textarea id="sk-evidence-note" maxlength="500" placeholder="What did you notice?"></textarea></label>' +
      '<div class="sk-assessment-label">What is true right now?</div>' +
      '<div class="sk-panel-btns sk-panel-btns--assessment">' +
      '<button class="sf-primary" style="--sf:#2ecc71" onclick="StudyKeyChamber.complete(\'' + esc(door.id) + '\',\'nailed\')">I can use this</button>' +
      '<button class="secondary" onclick="StudyKeyChamber.complete(\'' + esc(door.id) + '\',\'review\')">Needs another pass</button>' +
      '<button class="secondary" onclick="StudyKeyChamber.complete(\'' + esc(door.id) + '\',\'stuck\')">Still unclear</button>' +
      "</div>" +
      "</div>" +
      "</div>";
  }

  function openKnownStudySession(categoryId, topicId, subjectTitle) {
    var K = root.KNOWING;
    var sessionModel = root.HearthKnowingStudySessionModel;
    var sessionViewer = root.HearthKnowingStudySessionViewer;
    if (!K || !sessionModel || !sessionViewer || !categoryId || !topicId) return false;

    var completed = {};
    try {
      completed = JSON.parse(root.localStorage.getItem("hearth-knowing-progress") || "{}");
    } catch (error) {
      completed = {};
    }
    var session = sessionModel.topicContext(K, categoryId, topicId, completed);
    if (!session) return false;

    var questions = root.HearthKnowingStudyQuestionModel
      ? root.HearthKnowingStudyQuestionModel.generateQuestions(session.topic)
      : [];
    var el = panel();
    if (!el) return false;
    el.innerHTML =
      '<div class="sk-panel">' +
      '<button class="back-btn" onclick="showStudy()">\u2190 Back to Key Chamber</button>' +
      '<div style="margin:10px 0 14px;padding:10px 12px;border:1px solid ' + session.color + '55;border-radius:10px;background:' + session.color + '10">' +
      '<div class="sk-mode" style="color:' + session.color + '">Shape door · current study</div>' +
      '<div style="font-family:Cinzel;color:var(--text);font-size:.9rem">' + esc(subjectTitle || session.topic.title) + '</div>' +
      '<div style="font-size:.68rem;color:var(--dim);margin-top:3px">The chamber has opened the existing Study Session for this idea.</div>' +
      '</div>' +
      sessionViewer.renderStudySession({ session: session, questions: questions }) +
      '</div>';
    root._currentQuiz = questions;
    root._quizScore = { correct: 0, total: 0 };
    return true;
  }

  function showStudySession(categoryId, topicId) {
    if (openKnownStudySession(categoryId, topicId)) return;
    if (typeof fallbackStudySession === "function") return fallbackStudySession(categoryId, topicId);
  }

  function studyAssess(categoryId, topicId, feeling) {
    var quizScore = root._quizScore && typeof root._quizScore === "object"
      ? { correct: root._quizScore.correct, total: root._quizScore.total }
      : { correct: null, total: null };
    var result;
    if (typeof fallbackStudyAssess === "function") {
      result = fallbackStudyAssess(categoryId, topicId, feeling);
    }
    if (root.StudyKeyChamberModel) {
      var snapshot = modelSnapshot();
      var matchesSubject = snapshot.subject.categoryId === categoryId && snapshot.subject.topicId === topicId;
      root.StudyKeyChamberModel.recordEvidence(matchesSubject ? "shape" : "word", {
        feeling: feeling,
        categoryId: categoryId,
        topicId: topicId,
        subjectId: snapshot.subject.id,
        subjectTitle: snapshot.subject.title,
        quizCorrect: quizScore.correct,
        quizTotal: quizScore.total
      }, { storage: root.localStorage });
    }
    return result;
  }

  function showStudy() {
    activeHandoff = readStudyHandoff();
    panelOpen = false;
    currentDoorIndex = activeHandoff ? recommendedDoorIndex(activeHandoff) : 0;
    renderStudyChamber();
  }

  function openWithHandoff(handoff) {
    activeHandoff = handoff || readStudyHandoff();
    panelOpen = false;
    currentDoorIndex = recommendedDoorIndex(activeHandoff);
    renderStudyChamber();
  }

  function returnToSource() {
    var handoff = activeHandoff || readStudyHandoff();
    var route = handoff && handoff.return_route;
    var store = handoffStore();
    if (store && handoff) store.clear(handoff.id);
    activeHandoff = null;
    if (route && route.node_id === "journey" && root.Journey) {
      var params = route.params || {};
      if (typeof root.Journey.openCompanionLesson === "function") root.Journey.openCompanionLesson(params.learner_id);
      if (typeof root.Journey.focusCompanionStep === "function" && Number.isFinite(Number(params.step_index))) {
        root.Journey.focusCompanionStep(Number(params.step_index));
      }
      return;
    }
    if (typeof root.backToMap === "function") root.backToMap();
  }

  function rotate(direction) {
    var total = modelSnapshot().doors.length;
    if (!total) return;
    currentDoorIndex = (currentDoorIndex + direction + total) % total;
    renderStudyChamber();
  }

  function enter() {
    var snapshot = modelSnapshot();
    var door = snapshot.doors[currentDoorIndex];
    if (!door) return;
    if (door.state === "locked") return;
    if (root.StudyKeyChamberModel) {
      root.StudyKeyChamberModel.markVisited(door.id, { storage: root.localStorage });
    }
    if (door.id === "shape" && openKnownStudySession(snapshot.subject.categoryId, snapshot.subject.topicId, snapshot.subject.title)) {
      panelOpen = true;
      return;
    }
    panelOpen = true;
    renderDoorPanel(door.id);
  }

  function back() {
    panelOpen = false;
    renderStudyChamber();
  }

  function tryDoor(id) {
    var snapshot = modelSnapshot();
    var door = snapshot.doors.find(function (item) {
      return item.id === id;
    });
    if (!door) return;
    renderDoorActivity(door, snapshot);
  }

  function complete(doorId, feeling) {
    var snapshot = modelSnapshot();
    var door = snapshot.doors.find(function (item) { return item.id === doorId; });
    if (!door || !root.StudyKeyChamberModel || door.state === "locked") return;
    var noteField = root.document.getElementById("sk-evidence-note");
    var updated = root.StudyKeyChamberModel.recordEvidence(doorId, {
      feeling: feeling,
      note: noteField && noteField.value,
      subjectId: snapshot.subject.id,
      subjectTitle: snapshot.subject.title
    }, { storage: root.localStorage });
    var savedDoor = updated.doors.find(function (item) { return item.id === doorId; }) || door;
    var understood = feeling === "nailed";
    var title = understood ? "This idea is ready to use." : feeling === "review" ? "This idea needs another pass." : "Good. The gap is visible.";
    var action = understood
      ? "Take it into Practice or return to the chamber when you want to deepen it."
      : feeling === "review"
        ? "Return to this door later. A shorter repeat is the right next step."
        : "Stay with this door and look for the word, sound, or connection that is still missing.";
    var next = understood ? "" : '<div class="sk-action">' + esc(action) + '</div>';
    var el = panel();
    if (!el) return;
    el.innerHTML =
      '<div class="sk-panel"><div class="sk-panel-card sk-panel-card--result">' +
      '<div class="sk-mode" style="color:' + esc(savedDoor.color) + '">Study evidence saved</div>' +
      '<h3>' + esc(title) + '</h3>' +
      '<p class="sk-guide-text">' + esc(snapshot.subject.title) + ' · ' + esc(savedDoor.label) + ' · ' + esc(savedDoor.progress) + '% explored</p>' +
      next +
      '<div class="sk-panel-btns"><button class="secondary" onclick="StudyKeyChamber.back()">Back to Chamber</button>' +
      '<button onclick="showPractice()">Open Practice</button></div>' +
      '</div></div>';
  }

  root.STUDY_DOORS = root.StudyKeyChamberModel ? root.StudyKeyChamberModel.definitions() : [];
  root.StudyKeyChamber = {
    render: showStudy,
    openWithHandoff: openWithHandoff,
    returnToSource: returnToSource,
    rotate: rotate,
    enter: enter,
    back: back,
    tryDoor: tryDoor,
    complete: complete,
  };
  root.showStudy = showStudy;
  root.showStudySession = showStudySession;
  root._studyAssess = studyAssess;
})(typeof window !== "undefined" ? window : globalThis);
