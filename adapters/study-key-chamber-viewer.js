// Active Study Key Chamber entrance.
(function initStudyKeyChamberViewer(root) {
  "use strict";

  var GOLD = "#d4af69";
  var AMBER = "#e8a020";
  var fallbackStudySession = root.showStudySession;
  var fallbackStudyAssess = root._studyAssess;

  var currentDoorIndex = 0;
  var panelOpen = false;

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

  function sideDoor(x, door, direction) {
    var color = doorStateColor(door.state);
    return (
      '<g class="door-group" style="opacity:.35" onclick="StudyKeyChamber.rotate(' + direction + ')">' +
      '<rect x="' + (x - 28) + '" y="100" width="56" height="180" rx="14" fill="' + color + '" opacity=".12" stroke="' + color + '" stroke-opacity=".3" class="door-shape"/>' +
      '<text x="' + x + '" y="185" text-anchor="middle" fill="' + color + '" font-family="Cinzel,serif" font-size="18" opacity=".6">' + door.symbol + "</text>" +
      '<text x="' + x + '" y="208" text-anchor="middle" fill="' + color + '" font-family="JetBrains Mono" font-size="8" opacity=".5">' + esc(door.label) + "</text>" +
      "</g>"
    );
  }

  function renderDoorSvg(snapshot, current, previous, next) {
    var color = doorStateColor(current.state);
    var opacity = current.state === "locked" ? ".25" : ".6";
    var glowId = "sk-glow-" + current.id;
    var svg = '<svg viewBox="0 0 560 360" class="sk-door-svg">';

    svg += '<ellipse cx="280" cy="320" rx="200" ry="20" fill="' + GOLD + '" opacity=".06"/>';
    svg += sideDoor(110, previous, -1);
    svg += sideDoor(450, next, 1);
    svg += '<defs><radialGradient id="' + glowId + '"><stop offset="0%" stop-color="' + color + '" stop-opacity=".25"/><stop offset="100%" stop-color="' + color + '" stop-opacity="0"/></radialGradient></defs>';
    svg += '<circle cx="280" cy="190" r="110" fill="url(#' + glowId + ')"/>';
    svg += '<g class="door-group" onclick="StudyKeyChamber.enter()">';
    svg += '<rect x="218" y="55" width="124" height="260" rx="24" fill="' + color + '" opacity="' + opacity + '" stroke="' + color + '" stroke-width="2" stroke-opacity=".5" class="door-shape"/>';
    svg += '<circle cx="280" cy="175" r="12" fill="none" stroke="' + GOLD + '" stroke-width="1.5" opacity=".7"/>';
    svg += '<rect x="278" y="175" width="4" height="14" rx="2" fill="' + GOLD + '" opacity=".7"/>';
    svg += '<text x="280" y="145" text-anchor="middle" fill="' + color + '" font-family="Cinzel,serif" font-size="32">' + current.symbol + "</text>";
    svg += '<text x="280" y="220" text-anchor="middle" fill="' + color + '" font-family="Cinzel,serif" font-size="16" font-weight="600">' + esc(current.label) + "</text>";
    svg += '<text x="280" y="245" text-anchor="middle" fill="' + color + '" font-family="JetBrains Mono" font-size="8" opacity=".7">' + doorStateLabel(current.state) + "</text>";
    svg += "</g>";
    svg += '<g style="cursor:pointer" onclick="StudyKeyChamber.rotate(-1)"><text x="30" y="200" fill="' + GOLD + '" font-size="24" opacity=".4" font-family="DM Sans">\u2039</text></g>';
    svg += '<g style="cursor:pointer" onclick="StudyKeyChamber.rotate(1)"><text x="530" y="200" fill="' + GOLD + '" font-size="24" opacity=".4" font-family="DM Sans">\u203a</text></g>';
    snapshot.doors.forEach(function (_door, index) {
      var dotX = 220 + index * 24;
      svg += '<circle cx="' + dotX + '" cy="340" r="' + (index === currentDoorIndex ? "3.5" : "2.5") + '" fill="' + GOLD + '" opacity="' + (index === currentDoorIndex ? "1" : ".25") + '"/>';
    });
    svg += "</svg>";
    return svg;
  }

  function renderStudyChamber() {
    var el = panel();
    if (!el) return;
    var snapshot = modelSnapshot();
    var doors = snapshot.doors;
    if (!doors.length) return;
    var total = doors.length;
    currentDoorIndex = Math.max(0, Math.min(currentDoorIndex, total - 1));
    var previous = doors[(currentDoorIndex - 1 + total) % total];
    var current = doors[currentDoorIndex];
    var next = doors[(currentDoorIndex + 1) % total];
    var color = doorStateColor(current.state);

    el.innerHTML =
      '<div class="sk-wrap">' +
      '<button class="back-btn" onclick="backToMap()">\u2190 Map</button>' +
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
      '<div class="sk-stage">' + renderDoorSvg(snapshot, current, previous, next) + "</div>" +
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
    panelOpen = false;
    currentDoorIndex = 0;
    renderStudyChamber();
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
