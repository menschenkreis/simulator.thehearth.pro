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

  function renderRoomStage(options) {
    var selectedItem = options.selectedItem;
    var config = options.config;
    var ui = options.ui;
    var getState = options.getState;
    var stateLabels = options.stateLabels || {};

    if (!selectedItem) {
      return '<div class="doing-room-stage-panel doing-room-stage-panel--empty">' +
        '<div class="doing-room-stage-kicker">Choose a drill</div>' +
        '<h4>Pick one circle below.</h4>' +
        '<p>The photo stays clean. The drill opens here when you choose what you want to practise.</p>' +
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

    return '<div class="doing-room-stage-panel">' +
      '<div class="doing-room-stage-kicker">' + ui.escapeHtml(cat.title) + ' · ' + ui.escapeHtml(drill.duration || "5 min") + "</div>" +
      '<h4>' + ui.escapeHtml(drill.title) + "</h4>" +
      '<div class="doing-room-stage-meta">' +
      '<span>BPM ' + ui.escapeHtml(drill.bpm || "gentle") + "</span>" +
      '<span>' + ui.escapeHtml(label) + "</span>" +
      "</div>" +
      '<div class="doing-room-stage-body">' + (drill.body || "<p>Practise this slowly enough that the sound stays clean.</p>") + "</div>" +
      (coach ? '<div class="doing-room-coach-grid">' +
        '<div><b>Do</b><span>' + ui.escapeHtml(coach.whatDo) + "</span></div>" +
        '<div><b>Listen</b><span>' + ui.escapeHtml(coach.listen) + "</span></div>" +
        '<div><b>Clean means</b><span>' + ui.escapeHtml(coach.pass) + "</span></div>" +
        "</div>" : "") +
      '<div class="doing-room-feedback">' +
      '<span>How did it go?</span>' +
      feedbackButtons +
      "</div>" +
      "</div>";
  }

  function renderRoomGraphic(options) {
    var board = options.board;
    var roomId = board.id || "left-hand";
    var ui = options.ui;
    var selectedItem = options.selectedItem;
    return '<div class="doing-room-graphic doing-room-graphic--zoom doing-room-graphic--' + ui.escapeHtml(roomId) + (selectedItem ? " is-drill-open" : "") + '">' +
      '<img src="images/doing/doing-arms-guitar-v2.png?v=20260717b" alt="' + ui.escapeHtml(board.label) + ' guitar training zoom" draggable="false">' +
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
