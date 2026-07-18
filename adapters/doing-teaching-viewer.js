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

  function renderVisual(drill, ui) {
    var asset = drill.asset || "";
    var title = drill.shortTitle || drill.title;
    var visualType = drill.visualType || "movement";
    var assetHtml = asset
      ? '<img class="doing-teaching-asset" src="' + ui.escapeHtml(asset) + '" alt="' + ui.escapeHtml(title + " demonstration") + '" draggable="false">'
      : '<div class="doing-teaching-diagram doing-teaching-diagram--' + ui.escapeHtml(visualType) + '" aria-hidden="true">' +
        '<img class="doing-teaching-diagram-source" src="images/doing/doing-arms-guitar-v2.png?v=20260717b" alt="">' +
        '<div class="doing-teaching-diagram-neck"><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
        '<div class="doing-teaching-diagram-motion">' + renderVisualMarkers(visualType, ui) + '</div>' +
        '</div>';

    return '<div class="doing-teaching-visual">' +
      assetHtml +
      '<div class="doing-teaching-visual-label"><span>Movement</span><b>' + ui.escapeHtml(title) + '</b></div>' +
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
      '</div>' +
      '</div>';
  }

  return {
    version: "1.0.0",
    renderFeedback: renderFeedback,
    renderListenChips: renderListenChips,
    markersForVisual: markersForVisual,
    renderScene: renderScene,
    renderSteps: renderSteps,
    renderVisual: renderVisual
  };
});
