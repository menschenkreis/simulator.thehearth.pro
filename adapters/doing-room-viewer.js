/*
 * Doing room viewer adapter v0.
 *
 * Renders the focused Left Hand / Right Hand / Both Hands room. The controller
 * owns state changes; this viewer owns the room markup.
 */
(function initDoingRoomViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDoingRoomViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingRoomViewer(root) {
  "use strict";

  function renderTeachingVisual(drill, ui) {
    var asset = drill.asset || "";
    var title = drill.shortTitle || drill.title;
    var visualType = drill.visualType || "movement";
    var assetHtml = asset
      ? '<img class="doing-teaching-asset" src="' + ui.escapeHtml(asset) + '?v=20260717" alt="' + ui.escapeHtml(title + " demonstration") + '" draggable="false">'
      : '<div class="doing-teaching-diagram doing-teaching-diagram--' + ui.escapeHtml(visualType) + '" aria-hidden="true">' +
        '<div class="doing-teaching-diagram-neck"><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
        '<div class="doing-teaching-diagram-motion"><b>1</b><b>2</b><b>3</b><b>4</b></div>' +
        '</div>';

    return '<div class="doing-teaching-visual">' +
      assetHtml +
      '<div class="doing-teaching-visual-label"><span>Movement</span><b>' + ui.escapeHtml(title) + '</b></div>' +
      '</div>';
  }

  function renderTeachingSteps(drill, coach, ui) {
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

  function renderRoomStage(options) {
    var selectedItem = options.selectedItem;
    var config = options.config;
    var ui = options.ui;
    var getState = options.getState;
    var stateLabels = options.stateLabels || {};

    if (!selectedItem) {
      return '<div class="doing-room-empty-prompt">' +
        '<span>Choose one drill below</span>' +
        '<b>The teaching scene will open here.</b>' +
        "</div>";
    }

    var cat = selectedItem.cat;
    var drill = selectedItem.drill;
    var coach = config.coachForCategory ? config.coachForCategory(cat.id) : null;
    var currentState = getState(drill.id);
    var label = stateLabels[currentState] || "Not started";
    var feedbackButtons = [
      { id: "seen", label: "Too hard today" },
      { id: "practiced", label: "Practised" },
      { id: "clean", label: "Clean once" },
      { id: "comfortable", label: "Comfortable" },
      { id: "mastered", label: "Mastered" }
    ].map(function renderFeedbackButton(option) {
      var active = option.id === currentState;
      return '<button class="doing-room-feedback-btn' + (active ? " active" : "") + '" type="button" ' +
        'onclick="window._setDoingRoomDrillState(\'' + ui.escapeHtml(cat.id) + "', '" + ui.escapeHtml(drill.id) + "', '" + option.id + '\')">' +
        ui.escapeHtml(option.label) +
        "</button>";
    }).join("");

    var passCondition = drill.passCondition || (coach && coach.pass) || "Repeat the movement cleanly three times.";
    var easier = drill.easier || (coach && coach.easier) || "Slow down and use fewer notes.";
    var goal = drill.goal || "Train this movement slowly enough to hear what your hands are doing.";
    var safety = drill.safety || "Stop and reset if the movement becomes tense.";

    return '<div class="doing-teaching-scene">' +
      renderTeachingVisual(drill, ui) +
      '<div class="doing-teaching-content">' +
        '<div class="doing-room-stage-kicker">' + ui.escapeHtml(cat.title) + ' · ' + ui.escapeHtml(drill.duration || "5 min") + '</div>' +
        '<h4>' + ui.escapeHtml(drill.title) + '</h4>' +
        '<p class="doing-teaching-goal">' + ui.escapeHtml(goal) + '</p>' +
        '<div class="doing-room-stage-meta"><span>BPM ' + ui.escapeHtml(drill.bpm || "gentle") + '</span><span>' + ui.escapeHtml(label) + '</span></div>' +
        '<ol class="doing-teaching-steps">' + renderTeachingSteps(drill, coach, ui) + '</ol>' +
        '<div class="doing-teaching-listen"><b>Listen for</b><div>' + renderListenChips(drill, coach, ui) + '</div></div>' +
        '<div class="doing-teaching-checks">' +
          '<div><span>Success</span><b>' + ui.escapeHtml(passCondition) + '</b></div>' +
          '<div><span>Make it easier</span><b>' + ui.escapeHtml(easier) + '</b></div>' +
        '</div>' +
        '<p class="doing-teaching-safety">' + ui.escapeHtml(safety) + '</p>' +
        '<div class="doing-room-feedback"><span>How did it go?</span>' + feedbackButtons + '</div>' +
      '</div>' +
      '</div>';
  }

  function renderRoomGraphic(options) {
    var board = options.board;
    var roomId = board.id || "left-hand";
    var ui = options.ui;
    var selectedItem = options.selectedItem;
    return '<div class="doing-room-graphic doing-room-graphic--zoom doing-room-graphic--' + ui.escapeHtml(roomId) + (selectedItem ? " is-drill-open" : "") + '">' +
      '<img class="doing-room-base-image" src="images/doing/doing-arms-guitar-v2.png?v=20260717b" alt="' + ui.escapeHtml(board.label) + ' guitar training zoom" draggable="false">' +
      '<div class="doing-room-vignette" aria-hidden="true"></div>' +
      renderRoomStage(options) +
      "</div>";
  }

  function renderRoomDrillNodes(options) {
    var roomDrills = options.roomDrills || [];
    var selectedItem = options.selectedItem;
    var ui = options.ui;
    var getState = options.getState;
    var progressDegrees = options.progressDegrees;
    var stateLabels = options.stateLabels || {};

    if (!roomDrills.length) {
      return '<div class="doing-room-empty">No Level 1 drills are mapped here yet.</div>';
    }

    return roomDrills.map(function renderRoomDrillNode(item) {
      var currentState = getState(item.drill.id);
      var active = selectedItem && selectedItem.drill.id === item.drill.id;
      var label = stateLabels[currentState] || "Not started";
      var degrees = progressDegrees(item.drill.id);
      return '<button class="doing-room-drill-node' + (active ? " active" : "") + '" type="button" ' +
        'style="--room-progress:' + degrees + 'deg" ' +
        'onclick="window._openDoingRoomDrill(\'' + ui.escapeHtml(item.cat.id) + "', '" + ui.escapeHtml(item.drill.id) + '\')" ' +
        'aria-label="' + ui.escapeHtml(item.drill.title + " - " + label) + '">' +
        '<span class="doing-room-drill-node-inner">' +
        '<small>' + ui.escapeHtml(item.cat.title) + "</small>" +
        '<b>' + ui.escapeHtml(item.drill.title) + "</b>" +
        '<em>' + ui.escapeHtml(label) + "</em>" +
        "</span>" +
        "</button>";
    }).join("");
  }

  function renderRoomConcept(options) {
    var board = options.board;
    var config = options.config;
    var ui = options.ui;
    var roomDrills = options.roomDrills || [];
    var selectedItem = options.selectedItem;
    var roomIds = ["left-hand", "right-hand", "both-hands"];
    var roomButtons = roomIds.map(function renderRoomButton(roomId) {
      var room = config.boardForId(roomId);
      var active = room.id === board.id;
      return '<button class="doing-room-tab' + (active ? " active" : "") + '" type="button" onclick="window._setDoingRoomConcept(\'' + room.id + '\')">' +
        '<span>' + ui.escapeHtml(room.shortLabel) + "</span>" +
        '<b>' + ui.escapeHtml(room.label) + "</b>" +
        "</button>";
    }).join("");

    return '<section class="doing-room-preview" aria-label="Level 1 room preview">' +
      '<div class="doing-room-preview-head">' +
      '<div>' +
      '<div class="doing-board-kicker">Do node · Level 1 room</div>' +
      '<h3>' + ui.escapeHtml(board.title) + "</h3>" +
      '<p>' + ui.escapeHtml(board.description) + "</p>" +
      "</div>" +
      '<div class="doing-room-actions">' +
      '<button class="doing-board-tab active" type="button" onclick="window._doingBackToMap()">Back to Do map</button>' +
      '<button class="doing-board-tab" type="button" onclick="window._doingRoomToLibrary(\'' + ui.escapeHtml(board.id) + '\')">Full library</button>' +
      "</div>" +
      "</div>" +
      '<div class="doing-room-tabs" aria-label="Choose a training room">' + roomButtons + "</div>" +
      '<div class="doing-room-focus">' +
      renderRoomGraphic(options) +
      '<div class="doing-room-drill-strip" aria-label="' + ui.escapeHtml(board.label) + ' drills">' + renderRoomDrillNodes(options) + "</div>" +
      "</div>" +
      '<div class="doing-room-preview-note">The image is the room. The circles are the drills. Use Full Library when you want the exact catalogue view.</div>' +
      "</section>";
  }

  return {
    version: "0.1.0",
    renderRoomConcept: renderRoomConcept,
    renderRoomDrillNodes: renderRoomDrillNodes,
    renderRoomGraphic: renderRoomGraphic,
    renderRoomStage: renderRoomStage
  };
});
