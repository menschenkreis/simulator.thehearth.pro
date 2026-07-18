/*
 * Shared Doing teaching scene v1.
 *
 * Both the focused hand rooms and the full drill library use this renderer, so
 * a drill always opens into the same visual lesson structure.
 */
(function initDoingTeachingViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDoingTeachingViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingTeachingViewer(root) {
  "use strict";

  function markersForVisual(visualType) {
    var markerSets = {
      "pick-motion": ["DOWN", "UP", "DOWN", "UP"],
      "strum-path": ["DOWN", "UP", "DOWN", "UP"],
      "rhythm-grid": ["LONG", "SHORT", "LONG", "SHORT"],
      "finger-assignment": ["P", "I", "M", "A"],
      "stroke-comparison": ["REST", "FREE"],
      "two-hand-sync": ["LEFT", "+", "RIGHT"],
      "chord-diagram": ["Am"],
      "chord-change": ["Am", "TO", "C"],
      "fretboard-roots": ["A", "REST", "A", "HOME"],
      "fretboard-map": ["A", "2", "3", "A"]
    };
    return markerSets[visualType] || ["1", "2", "3", "4"];
  }

  function renderVisualMarkers(visualType, ui) {
    return markersForVisual(visualType).map(function renderMarker(marker) {
      var wordClass = String(marker).length > 2 ? " is-word" : "";
      return '<b class="' + wordClass.trim() + '">' + ui.escapeHtml(marker) + '</b>';
    }).join("");
  }

  function normalizedTab(drill) {
    var tab = drill.tab || {};
    var frets = Array.isArray(tab.frets) && tab.frets.length ? tab.frets : [5, 6, 7, 8];
    var fingers = Array.isArray(tab.fingers) && tab.fingers.length === frets.length
      ? tab.fingers
      : frets.map(function fallbackFinger(_, index) { return index + 1; });
    var strings = Array.isArray(tab.strings) && tab.strings.length
      ? tab.strings
      : ["e", "B", "G", "D", "A", "E"];
    return { frets: frets, fingers: fingers, strings: strings };
  }

  function renderInteractiveTab(drill, ui) {
    var tab = normalizedTab(drill);
    var fingerHeader = tab.fingers.map(function renderFinger(finger, index) {
      return '<span class="doing-tab-finger' + (index === 0 ? " is-active" : "") + '" data-tab-index="' + index + '">' +
        '<small>Finger</small><b>' + ui.escapeHtml(finger) + '</b></span>';
    }).join("");
    var rows = tab.strings.map(function renderString(stringName, stringIndex) {
      var spokenString = stringName === "e" ? "high e" : (stringName === "E" ? "low E" : stringName);
      var notes = tab.frets.map(function renderFret(fret, index) {
        var sequenceIndex = (tab.strings.length - 1 - stringIndex) * tab.frets.length + index;
        return '<span class="doing-tab-note' + (sequenceIndex === 0 ? " is-active" : "") + '" ' +
          'data-tab-sequence="' + sequenceIndex + '" data-tab-fret-index="' + index + '" data-tab-string="' + ui.escapeHtml(spokenString) + '" ' +
          'aria-label="String ' + ui.escapeHtml(spokenString) + ', fret ' + ui.escapeHtml(fret) + ', finger ' + ui.escapeHtml(tab.fingers[index]) + '">' +
          '<b>' + ui.escapeHtml(fret) + '</b></span>';
      }).join("");
      return '<div class="doing-tab-row"><b class="doing-tab-string">' + ui.escapeHtml(stringName) + '</b>' +
        '<div class="doing-tab-line">' + notes + '</div></div>';
    }).join("");

    var totalSteps = tab.frets.length * tab.strings.length;
    return '<div class="doing-interactive-tab" style="--doing-tab-columns:' + tab.frets.length + '" ' +
      'data-tab-direction="forward" data-tab-step="0" data-tab-total="' + totalSteps + '">' +
      '<div class="doing-tab-toolbar">' +
        '<div class="doing-tab-direction" aria-label="Choose tab direction">' +
          '<button class="is-active" type="button" data-tab-direction="forward" onclick="window.HearthDoingTeachingViewer.setTabDirection(this, \'forward\')">Forward</button>' +
          '<button type="button" data-tab-direction="reverse" onclick="window.HearthDoingTeachingViewer.setTabDirection(this, \'reverse\')">Reverse</button>' +
        '</div>' +
        '<div class="doing-tab-current"><span>Low E · finger ' + ui.escapeHtml(tab.fingers[0]) + ' · fret ' + ui.escapeHtml(tab.frets[0]) + '</span><b>1 of ' + totalSteps + '</b></div>' +
      '</div>' +
      '<div class="doing-tab-fingers"><i aria-hidden="true"></i>' + fingerHeader + '</div>' +
      '<div class="doing-tab-staff" aria-label="Interactive guitar tablature">' + rows + '</div>' +
      '<div class="doing-tab-controls">' +
        '<button type="button" title="Previous tab step" aria-label="Previous tab step" onclick="window.HearthDoingTeachingViewer.stepTab(this, -1)">←</button>' +
        '<span>Use one string at a time</span>' +
        '<button type="button" title="Next tab step" aria-label="Next tab step" onclick="window.HearthDoingTeachingViewer.stepTab(this, 1)">→</button>' +
      '</div>' +
      '</div>';
  }

  function updateInteractiveTab(tabEl) {
    if (!tabEl) return;
    var total = parseInt(tabEl.getAttribute("data-tab-total"), 10) || 1;
    var step = parseInt(tabEl.getAttribute("data-tab-step"), 10) || 0;
    var direction = tabEl.getAttribute("data-tab-direction") || "forward";
    var activeSequence = direction === "reverse" ? total - 1 - step : step;
    var activeNote = tabEl.querySelector('.doing-tab-note[data-tab-sequence="' + activeSequence + '"]');
    var activeFretIndex = activeNote ? parseInt(activeNote.getAttribute("data-tab-fret-index"), 10) : 0;
    var notes = tabEl.querySelectorAll(".doing-tab-note");
    Array.prototype.forEach.call(notes, function toggleNote(note) {
      note.classList.toggle("is-active", parseInt(note.getAttribute("data-tab-sequence"), 10) === activeSequence);
    });
    var fingers = tabEl.querySelectorAll(".doing-tab-finger");
    Array.prototype.forEach.call(fingers, function toggleFinger(finger) {
      finger.classList.toggle("is-active", parseInt(finger.getAttribute("data-tab-index"), 10) === activeFretIndex);
    });
    var directionButtons = tabEl.querySelectorAll("[data-tab-direction]");
    Array.prototype.forEach.call(directionButtons, function toggleDirection(button) {
      button.classList.toggle("is-active", button.getAttribute("data-tab-direction") === direction);
    });
    var current = tabEl.querySelector(".doing-tab-current");
    var activeFinger = tabEl.querySelector('.doing-tab-finger[data-tab-index="' + activeFretIndex + '"] b');
    var activeFret = activeNote ? activeNote.querySelector("b") : null;
    if (current && activeFinger && activeFret) {
      var stringName = activeNote.getAttribute("data-tab-string") || "string";
      current.querySelector("span").textContent = stringName + " · finger " + activeFinger.textContent + " · fret " + activeFret.textContent;
      current.querySelector("b").textContent = (step + 1) + " of " + total;
    }
  }

  function setTabDirection(control, direction) {
    var tabEl = control && control.closest ? control.closest(".doing-interactive-tab") : null;
    if (!tabEl || ["forward", "reverse"].indexOf(direction) === -1) return;
    tabEl.setAttribute("data-tab-direction", direction);
    tabEl.setAttribute("data-tab-step", "0");
    updateInteractiveTab(tabEl);
  }

  function stepTab(control, delta) {
    var tabEl = control && control.closest ? control.closest(".doing-interactive-tab") : null;
    if (!tabEl) return;
    var total = parseInt(tabEl.getAttribute("data-tab-total"), 10) || 1;
    var current = parseInt(tabEl.getAttribute("data-tab-step"), 10) || 0;
    var next = (current + delta + total) % total;
    tabEl.setAttribute("data-tab-step", String(next));
    updateInteractiveTab(tabEl);
  }

  function normalizedStrumGrid(drill) {
    var grid = Array.isArray(drill.strumGrid) ? drill.strumGrid : [];
    return grid.length ? grid : [
      { count: "1", stroke: "D", play: true }, { count: "&", stroke: "U", play: false },
      { count: "2", stroke: "D", play: true }, { count: "&", stroke: "U", play: false },
      { count: "3", stroke: "D", play: true }, { count: "&", stroke: "U", play: false },
      { count: "4", stroke: "D", play: true }, { count: "&", stroke: "U", play: false }
    ];
  }

  function renderInteractiveStrumGrid(drill, ui) {
    var grid = normalizedStrumGrid(drill);
    var cells = grid.map(function renderStrumCell(item, index) {
      var soundedClass = item.play ? " is-sounded" : " is-return";
      return '<div class="doing-strum-cell' + soundedClass + (index === 0 ? " is-active" : "") + '" data-strum-step="' + index + '">' +
        '<small>' + ui.escapeHtml(item.count) + '</small>' +
        '<b aria-label="' + (item.stroke === "D" ? "Downstroke" : "Upstroke") + '">' + (item.stroke === "D" ? "↓" : "↑") + '</b>' +
        '<span>' + (item.play ? "Play" : "Move") + '</span></div>';
    }).join("");
    return '<div class="doing-interactive-strum" data-strum-current="0" data-strum-total="' + grid.length + '">' +
      '<div class="doing-strum-head"><div><span>Strumming path</span><b>Keep the hand moving</b></div>' +
        '<div class="doing-strum-current"><span>Count 1</span><b>Play · down</b></div></div>' +
      '<div class="doing-strum-grid" aria-label="Interactive eight-count strumming pattern">' + cells + '</div>' +
      '<div class="doing-strum-legend"><span><i class="is-sounded"></i>Touch the strings</span><span><i class="is-return"></i>Silent return</span></div>' +
      '<div class="doing-tab-controls"><button type="button" title="Previous stroke" aria-label="Previous stroke" onclick="window.HearthDoingTeachingViewer.stepStrum(this, -1)">←</button>' +
        '<span>Move through one full bar</span>' +
        '<button type="button" title="Next stroke" aria-label="Next stroke" onclick="window.HearthDoingTeachingViewer.stepStrum(this, 1)">→</button></div></div>';
  }

  function updateInteractiveStrum(gridEl) {
    if (!gridEl) return;
    var current = parseInt(gridEl.getAttribute("data-strum-current"), 10) || 0;
    var cells = gridEl.querySelectorAll(".doing-strum-cell");
    Array.prototype.forEach.call(cells, function toggleCell(cell) {
      cell.classList.toggle("is-active", parseInt(cell.getAttribute("data-strum-step"), 10) === current);
    });
    var active = cells[current];
    var status = gridEl.querySelector(".doing-strum-current");
    if (!active || !status) return;
    status.querySelector("span").textContent = "Count " + active.querySelector("small").textContent;
    status.querySelector("b").textContent = (active.classList.contains("is-sounded") ? "Play" : "Move") +
      " · " + (active.querySelector("b").textContent === "↓" ? "down" : "up");
  }

  function stepStrum(control, delta) {
    var gridEl = control && control.closest ? control.closest(".doing-interactive-strum") : null;
    if (!gridEl) return;
    var total = parseInt(gridEl.getAttribute("data-strum-total"), 10) || 1;
    var current = parseInt(gridEl.getAttribute("data-strum-current"), 10) || 0;
    gridEl.setAttribute("data-strum-current", String((current + delta + total) % total));
    updateInteractiveStrum(gridEl);
  }

  function normalizedChord(drill) {
    var chord = drill.chord || {};
    var strings = Array.isArray(chord.strings) && chord.strings.length === 6 ? chord.strings : [
      { name: "6", state: "mute", fret: null }, { name: "5", state: "open", fret: 0 },
      { name: "4", state: "fretted", fret: 2, finger: 2 }, { name: "3", state: "fretted", fret: 2, finger: 3 },
      { name: "2", state: "fretted", fret: 1, finger: 1 }, { name: "1", state: "open", fret: 0 }
    ];
    return {
      name: chord.name || drill.title || "Chord",
      symbol: chord.symbol || "Am",
      strings: strings,
      checkOrder: Array.isArray(chord.checkOrder) && chord.checkOrder.length ? chord.checkOrder : [1, 2, 3, 4, 5]
    };
  }

  function renderInteractiveChordCheck(drill, ui) {
    var chord = normalizedChord(drill);
    var columns = chord.strings.map(function renderChordString(string, stringIndex) {
      var isFirstCheck = stringIndex === chord.checkOrder[0];
      var stateSymbol = string.state === "mute" ? "×" : "○";
      var frets = [1, 2, 3, 4].map(function renderChordFret(fret) {
        var hasFinger = string.state === "fretted" && string.fret === fret;
        return '<span class="doing-chord-fret">' + (hasFinger
          ? '<b aria-label="Finger ' + ui.escapeHtml(string.finger) + '">' + ui.escapeHtml(string.finger) + '</b>'
          : '') + '</span>';
      }).join("");
      return '<div class="doing-chord-string' + (isFirstCheck ? " is-active" : "") + '" data-chord-string-index="' + stringIndex + '">' +
        '<small aria-label="' + (string.state === "mute" ? "Do not play" : "Open or played string") + '">' + stateSymbol + '</small>' +
        '<div class="doing-chord-frets">' + frets + '</div><em>String ' + ui.escapeHtml(string.name) + '</em></div>';
    }).join("");
    return '<div class="doing-interactive-chord" data-chord-current="0" data-chord-total="' + chord.checkOrder.length + '" ' +
      'data-chord-order="' + chord.checkOrder.join(",") + '">' +
      '<div class="doing-chord-head"><div><span>Clean chord check</span><b>' + ui.escapeHtml(chord.name) + '</b></div>' +
        '<strong>' + ui.escapeHtml(chord.symbol) + '</strong><div class="doing-chord-current"><span>String 5</span><b>Open · let it ring</b></div></div>' +
      '<div class="doing-chord-board" aria-label="' + ui.escapeHtml(chord.name) + ' chord diagram">' + columns + '</div>' +
      '<div class="doing-chord-legend"><span>× do not play</span><span>○ open string</span><span>Numbers are fingers</span></div>' +
      '<div class="doing-tab-controls"><button type="button" title="Previous string" aria-label="Previous string" onclick="window.HearthDoingTeachingViewer.stepChordCheck(this, -1)">←</button>' +
        '<span>Pick each string and listen</span>' +
        '<button type="button" title="Next string" aria-label="Next string" onclick="window.HearthDoingTeachingViewer.stepChordCheck(this, 1)">→</button></div></div>';
  }

  function updateInteractiveChordCheck(chordEl) {
    if (!chordEl) return;
    var current = parseInt(chordEl.getAttribute("data-chord-current"), 10) || 0;
    var order = (chordEl.getAttribute("data-chord-order") || "1,2,3,4,5").split(",").map(Number);
    var activeIndex = order[current];
    var columns = chordEl.querySelectorAll(".doing-chord-string");
    Array.prototype.forEach.call(columns, function toggleString(column) {
      column.classList.toggle("is-active", parseInt(column.getAttribute("data-chord-string-index"), 10) === activeIndex);
    });
    var active = columns[activeIndex];
    var status = chordEl.querySelector(".doing-chord-current");
    if (!active || !status) return;
    var finger = active.querySelector(".doing-chord-fret b");
    var stringName = active.querySelector("em").textContent;
    status.querySelector("span").textContent = stringName;
    status.querySelector("b").textContent = finger ? "Finger " + finger.textContent + " · listen for clarity" : "Open · let it ring";
  }

  function stepChordCheck(control, delta) {
    var chordEl = control && control.closest ? control.closest(".doing-interactive-chord") : null;
    if (!chordEl) return;
    var total = parseInt(chordEl.getAttribute("data-chord-total"), 10) || 1;
    var current = parseInt(chordEl.getAttribute("data-chord-current"), 10) || 0;
    chordEl.setAttribute("data-chord-current", String((current + delta + total) % total));
    updateInteractiveChordCheck(chordEl);
  }

  function renderVisual(drill, ui) {
    var asset = drill.asset || "";
    var title = drill.shortTitle || drill.title;
    var visualType = drill.visualType || "movement";
    var isInteractive = visualType === "interactive-tab" || visualType === "interactive-strum-grid" || visualType === "interactive-chord-check";
    var assetHtml = visualType === "interactive-tab"
      ? renderInteractiveTab(drill, ui)
      : visualType === "interactive-strum-grid"
      ? renderInteractiveStrumGrid(drill, ui)
      : visualType === "interactive-chord-check"
      ? renderInteractiveChordCheck(drill, ui)
      : asset
      ? '<img class="doing-teaching-asset" src="' + ui.escapeHtml(asset) + '" alt="' + ui.escapeHtml(title + " demonstration") + '" draggable="false">'
      : '<div class="doing-teaching-diagram doing-teaching-diagram--' + ui.escapeHtml(visualType) + '" aria-hidden="true">' +
        '<img class="doing-teaching-diagram-source" src="images/doing/doing-arms-guitar-v2.png?v=20260717b" alt="">' +
        '<div class="doing-teaching-diagram-neck"><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
        '<div class="doing-teaching-diagram-motion">' + renderVisualMarkers(visualType, ui) + '</div>' +
        '</div>';

    return '<div class="doing-teaching-visual' + (isInteractive ? " doing-teaching-visual--interactive" : "") +
      (visualType === "interactive-tab" ? " doing-teaching-visual--interactive-tab" : "") + '">' +
      assetHtml +
      '<div class="doing-teaching-visual-label"><span>' + (isInteractive ? "Interactive guide" : "Movement") + '</span><b>' + ui.escapeHtml(title) + '</b></div>' +
      '</div>';
  }

  function renderSteps(drill, coach, ui) {
    var steps = Array.isArray(drill.steps) && drill.steps.length
      ? drill.steps
      : [coach && coach.whatDo, coach && coach.howDo, coach && coach.howLong].filter(Boolean);
    return steps.map(function renderStep(step, index) {
      return '<li><b>' + (index + 1) + '</b><span>' + ui.escapeHtml(step) + '</span></li>';
    }).join("");
  }

  function renderListenChips(drill, coach, ui) {
    var listenFor = Array.isArray(drill.listenFor) && drill.listenFor.length
      ? drill.listenFor
      : [coach && coach.listen].filter(Boolean);
    return listenFor.map(function renderListenItem(item) {
      return '<span>' + ui.escapeHtml(item) + '</span>';
    }).join("");
  }

  function renderFeedback(options) {
    var ui = options.ui;
    var cat = options.cat;
    var drill = options.drill;
    var currentState = options.currentState || "";
    var stateAction = options.stateAction || "_setDoingRoomDrillState";
    return [
      { id: "seen", label: "Too hard today" },
      { id: "practiced", label: "Practised" },
      { id: "clean", label: "Clean once" },
      { id: "comfortable", label: "Comfortable" },
      { id: "mastered", label: "Mastered" }
    ].map(function renderFeedbackButton(option) {
      var active = option.id === currentState;
      return '<button class="doing-room-feedback-btn' + (active ? " active" : "") + '" type="button" ' +
        'onclick="window.' + ui.escapeHtml(stateAction) + '(\'' + ui.escapeHtml(cat.id) + "', '" + ui.escapeHtml(drill.id) + "', '" + option.id + '\')">' +
        ui.escapeHtml(option.label) +
        "</button>";
    }).join("");
  }

  function renderCreateHandoff(options) {
    var ui = options.ui;
    var cat = options.cat;
    var drill = options.drill;
    var handoff = drill.createHandoff;
    var action = options.createAction || "_openDoingCreate";
    if (!handoff) return "";

    return '<div class="doing-teaching-create">' +
      '<div><span>When it starts to sound like music</span><b>' + ui.escapeHtml(handoff.instruction) + '</b></div>' +
      '<button type="button" onclick="window.' + ui.escapeHtml(action) + '(\'' + ui.escapeHtml(cat.id) + '\', \'' + ui.escapeHtml(drill.id) + '\')">' +
        ui.escapeHtml(handoff.label || "Make it musical") +
      '</button>' +
    '</div>';
  }

  function renderScene(options) {
    options = options || {};
    var cat = options.cat;
    var drill = options.drill;
    var config = options.config || root.HearthDoingConfig;
    var ui = options.ui || root.HearthDoingUiUtils;
    var stateLabels = options.stateLabels || (config && config.stateLabels) || {};
    if (!cat || !drill || !config || !ui) return "";

    var coach = config.coachForCategory ? config.coachForCategory(cat.id) : null;
    var currentState = options.currentState || "";
    var label = stateLabels[currentState] || "Not started";
    var passCondition = drill.passCondition || (coach && coach.pass) || "Repeat the movement cleanly three times.";
    var easier = drill.easier || (coach && coach.easier) || "Slow down and use fewer notes.";
    var goal = drill.goal || "Train this movement slowly enough to hear what your hands are doing.";
    var safety = drill.safety || "Stop and reset if the movement becomes tense.";
    var modeClass = options.pageMode ? " doing-teaching-scene--page" : "";

    return '<div class="doing-teaching-scene' + modeClass + '">' +
      renderVisual(drill, ui) +
      '<div class="doing-teaching-content">' +
        '<div class="doing-room-stage-kicker">' + ui.escapeHtml(cat.title) + ' · ' + ui.escapeHtml(drill.duration || "5 min") + '</div>' +
        '<h4>' + ui.escapeHtml(drill.title) + '</h4>' +
        '<p class="doing-teaching-goal">' + ui.escapeHtml(goal) + '</p>' +
        (drill.setup ? '<p class="doing-teaching-setup"><span>Set up</span>' + ui.escapeHtml(drill.setup) + '</p>' : "") +
        '<div class="doing-room-stage-meta"><span>BPM ' + ui.escapeHtml(drill.bpm || "gentle") + '</span><span>' + ui.escapeHtml(label) + '</span></div>' +
        '<ol class="doing-teaching-steps">' + renderSteps(drill, coach, ui) + '</ol>' +
        '<div class="doing-teaching-listen"><b>Listen for</b><div>' + renderListenChips(drill, coach, ui) + '</div></div>' +
        '<div class="doing-teaching-checks">' +
          '<div><span>Success</span><b>' + ui.escapeHtml(passCondition) + '</b></div>' +
          '<div><span>Make it easier</span><b>' + ui.escapeHtml(easier) + '</b></div>' +
        '</div>' +
        '<p class="doing-teaching-safety">' + ui.escapeHtml(safety) + '</p>' +
        '<div class="doing-room-feedback"><span>How did it go?</span>' + renderFeedback({
          ui: ui,
          cat: cat,
          drill: drill,
          currentState: currentState,
          stateAction: options.stateAction
        }) + '</div>' +
        renderCreateHandoff({
          ui: ui,
          cat: cat,
          drill: drill,
          createAction: options.createAction
        }) +
      '</div>' +
      '</div>';
  }

  return {
    version: "1.0.0",
    renderFeedback: renderFeedback,
    renderListenChips: renderListenChips,
    markersForVisual: markersForVisual,
    normalizedTab: normalizedTab,
    normalizedStrumGrid: normalizedStrumGrid,
    normalizedChord: normalizedChord,
    renderCreateHandoff: renderCreateHandoff,
    renderScene: renderScene,
    renderSteps: renderSteps,
    renderVisual: renderVisual,
    setTabDirection: setTabDirection,
    stepTab: stepTab,
    stepStrum: stepStrum,
    stepChordCheck: stepChordCheck,
    updateInteractiveTab: updateInteractiveTab,
    updateInteractiveStrum: updateInteractiveStrum,
    updateInteractiveChordCheck: updateInteractiveChordCheck
  };
});
