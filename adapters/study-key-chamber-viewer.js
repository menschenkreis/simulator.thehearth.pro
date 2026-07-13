// Active Study Key Chamber entrance.
(function initStudyKeyChamberViewer(root) {
  "use strict";

  var GOLD = "#d4af69";
  var AMBER = "#e8a020";

  var STUDY_DOORS = [
    { id: "word", label: "Word", symbol: "\u25c7", state: "open", color: "#ff4444", guide: "A misunderstood word can blank everything after it.", action: "Choose one unclear term and clear it before continuing.", mode: "Dictionary / terms" },
    { id: "sound", label: "Sound", symbol: "\u266a", state: "recommended", color: "#ff8800", guide: "Your ear learns before your fingers obey.", action: "Listen to two notes and decide which feels like home.", mode: "Listening / ear training" },
    { id: "shape", label: "Shape", symbol: "\u2301", state: "open", color: "#ffcc00", guide: "A concept becomes easier when you can see where it lives.", action: "Compare one tab pattern to the fretboard.", mode: "Tab / notation / fretboard" },
    { id: "pattern", label: "Pattern", symbol: "\u2736", state: "open", color: "#44cc44", guide: "Study connects separate facts into a map.", action: "Link notes to intervals, scales, and chords.", mode: "Concept relationships" },
    { id: "test", label: "Test", symbol: "?", state: "open", color: "#3366ff", guide: "If you can explain it simply, it is becoming yours.", action: "Answer one tiny recall question.", mode: "Quiz / recall" },
    { id: "review", label: "Review", symbol: "\u21ba", state: "locked", color: "#6633cc", guide: "Forgetting is not failure. It is a signal to revisit.", action: "Return to one weak concept.", mode: "Spaced review" },
  ];

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

  function doorStateColor(state) {
    if (state === "locked") return "#666";
    if (state === "recommended") return AMBER;
    if (state === "open") return GOLD;
    return "#888";
  }

  function guideText() {
    var door = STUDY_DOORS[currentDoorIndex];
    if (panelOpen) return "";
    if (door.state === "locked") return "This door is locked. Open more doors first, or start with the Word door.";
    if (door.state === "recommended") return door.guide + " This door is recommended next.";
    return door.guide;
  }

  function sideDoor(x, door, prevDoor) {
    var color = doorStateColor(door.state);
    var direction = door === prevDoor ? -1 : 1;
    return (
      '<g class="door-group" style="opacity:.35" onclick="StudyKeyChamber.rotate(' + direction + ')">' +
      '<rect x="' + (x - 28) + '" y="100" width="56" height="180" rx="14" fill="' + color + '" opacity=".12" stroke="' + color + '" stroke-opacity=".3" class="door-shape"/>' +
      '<text x="' + x + '" y="185" text-anchor="middle" fill="' + color + '" font-family="Cinzel,serif" font-size="18" opacity=".6">' + door.symbol + "</text>" +
      '<text x="' + x + '" y="208" text-anchor="middle" fill="' + color + '" font-family="JetBrains Mono" font-size="8" opacity=".5">' + esc(door.label) + "</text>" +
      "</g>"
    );
  }

  function renderDoorSvg(current, previous, next) {
    var color = doorStateColor(current.state);
    var opacity = current.state === "locked" ? ".25" : ".6";
    var glowId = "sk-glow-" + current.id;
    var svg = '<svg viewBox="0 0 560 360" class="sk-door-svg">';

    svg += '<ellipse cx="280" cy="320" rx="200" ry="20" fill="' + GOLD + '" opacity=".06"/>';
    svg += sideDoor(110, previous, previous);
    svg += sideDoor(450, next, previous);
    svg += '<defs><radialGradient id="' + glowId + '"><stop offset="0%" stop-color="' + color + '" stop-opacity=".25"/><stop offset="100%" stop-color="' + color + '" stop-opacity="0"/></radialGradient></defs>';
    svg += '<circle cx="280" cy="190" r="110" fill="url(#' + glowId + ')"/>';
    svg += '<g class="door-group" onclick="StudyKeyChamber.enter()">';
    svg += '<rect x="218" y="55" width="124" height="260" rx="24" fill="' + color + '" opacity="' + opacity + '" stroke="' + color + '" stroke-width="2" stroke-opacity=".5" class="door-shape"/>';
    svg += '<circle cx="280" cy="175" r="12" fill="none" stroke="' + GOLD + '" stroke-width="1.5" opacity=".7"/>';
    svg += '<rect x="278" y="175" width="4" height="14" rx="2" fill="' + GOLD + '" opacity=".7"/>';
    svg += '<text x="280" y="145" text-anchor="middle" fill="' + color + '" font-family="Cinzel,serif" font-size="32">' + current.symbol + "</text>";
    svg += '<text x="280" y="220" text-anchor="middle" fill="' + color + '" font-family="Cinzel,serif" font-size="16" font-weight="600">' + esc(current.label) + "</text>";
    svg += '<text x="280" y="245" text-anchor="middle" fill="' + color + '" font-family="JetBrains Mono" font-size="8" opacity=".7">' + (current.state === "locked" ? "LOCKED" : current.state === "recommended" ? "RECOMMENDED" : "OPEN") + "</text>";
    svg += "</g>";
    svg += '<g style="cursor:pointer" onclick="StudyKeyChamber.rotate(-1)"><text x="30" y="200" fill="' + GOLD + '" font-size="24" opacity=".4" font-family="DM Sans">\u2039</text></g>';
    svg += '<g style="cursor:pointer" onclick="StudyKeyChamber.rotate(1)"><text x="530" y="200" fill="' + GOLD + '" font-size="24" opacity=".4" font-family="DM Sans">\u203a</text></g>';
    STUDY_DOORS.forEach(function (_door, index) {
      var dotX = 220 + index * 24;
      svg += '<circle cx="' + dotX + '" cy="340" r="' + (index === currentDoorIndex ? "3.5" : "2.5") + '" fill="' + GOLD + '" opacity="' + (index === currentDoorIndex ? "1" : ".25") + '"/>';
    });
    svg += "</svg>";
    return svg;
  }

  function renderStudyChamber() {
    var el = panel();
    if (!el) return;
    var total = STUDY_DOORS.length;
    var previous = STUDY_DOORS[(currentDoorIndex - 1 + total) % total];
    var current = STUDY_DOORS[currentDoorIndex];
    var next = STUDY_DOORS[(currentDoorIndex + 1) % total];
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
      "</div>" +
      '<div class="sk-guide">' +
      '<img src="images/character-symbols/Thinking Question Mark.png" alt="">' +
      "<div>" + esc(guideText()) + "</div>" +
      "</div>" +
      "</div>" +
      '<div class="sk-stage">' + renderDoorSvg(current, previous, next) + "</div>" +
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
      "</div>" +
      "</div>";
  }

  function renderDoorPanel(doorId) {
    var el = panel();
    if (!el) return;
    var door = STUDY_DOORS.find(function (item) {
      return item.id === doorId;
    });
    if (!door) {
      renderStudyChamber();
      return;
    }
    el.innerHTML =
      '<div class="sk-panel">' +
      '<button class="back-btn" onclick="StudyKeyChamber.back()">\u2190 Back to Chamber</button>' +
      '<div class="sk-panel-card">' +
      '<div class="sk-mode">' + esc(door.mode) + "</div>" +
      "<h3>" + door.symbol + " " + esc(door.label) + "</h3>" +
      '<div class="sk-guide-text">' + esc(door.guide) + "</div>" +
      '<div class="sk-action">' + esc(door.action) + "</div>" +
      '<div class="sk-panel-btns">' +
      '<button class="secondary" onclick="StudyKeyChamber.back()">Back to Chamber</button>' +
      '<button onclick="StudyKeyChamber.tryDoor(\'' + esc(door.id) + '\')">Try This</button>' +
      "</div>" +
      "</div>" +
      "</div>";
  }

  function showStudy() {
    panelOpen = false;
    currentDoorIndex = 0;
    renderStudyChamber();
  }

  function rotate(direction) {
    currentDoorIndex = (currentDoorIndex + direction + STUDY_DOORS.length) % STUDY_DOORS.length;
    renderStudyChamber();
  }

  function enter() {
    var door = STUDY_DOORS[currentDoorIndex];
    if (door.state === "locked") return;
    panelOpen = true;
    renderDoorPanel(door.id);
  }

  function back() {
    panelOpen = false;
    renderStudyChamber();
  }

  function tryDoor(id) {
    var door = STUDY_DOORS.find(function (item) {
      return item.id === id;
    });
    if (!door) return;
    var drawer = root.document.getElementById("sk-drawer");
    if (!drawer) return;
    drawer.innerHTML =
      '<div style="padding:8px">' +
      '<div class="sk-kicker" style="color:' + door.color + '">Try This</div>' +
      '<div style="font-size:.82rem;color:var(--text);line-height:1.6;margin:8px 0">' + esc(door.action) + "</div>" +
      '<div class="sk-panel-btns"><button class="secondary" onclick="StudyKeyChamber.back()">Back to Chamber</button></div>' +
      "</div>";
  }

  root.STUDY_DOORS = STUDY_DOORS;
  root.StudyKeyChamber = {
    render: showStudy,
    rotate: rotate,
    enter: enter,
    back: back,
    tryDoor: tryDoor,
  };
  root.showStudy = showStudy;
})(typeof window !== "undefined" ? window : globalThis);
