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
    var getEvidence = options.getEvidence;
    var stateLabels = options.stateLabels || {};

    if (!selectedItem) {
      return '<div class="doing-room-empty-prompt">' +
        '<span>Choose one drill below</span>' +
        '<b>The teaching scene will open here.</b>' +
        "</div>";
    }

    var teachingViewer = root.HearthDoingTeachingViewer;
    if (!teachingViewer) return "";
    return teachingViewer.renderScene({
      cat: selectedItem.cat,
      drill: selectedItem.drill,
      config: config,
      ui: ui,
      currentState: getState(selectedItem.drill.id),
      evidence: typeof getEvidence === "function" ? getEvidence(selectedItem.drill.id) : null,
      stateLabels: stateLabels,
      stateAction: "_setDoingRoomDrillState"
    });
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
      return '<div class="doing-room-empty">This room has no Level 1 drills yet. Use another room or the practice catalogue.</div>';
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
      return '<button class="doing-room-tab' + (active ? " active" : "") + '" type="button" aria-label="' + ui.escapeHtml(room.label) + '" onclick="window._setDoingRoomConcept(\'' + room.id + '\')">' +
        '<span aria-hidden="true">' + ui.escapeHtml(room.shortLabel) + "</span>" +
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
      '<button class="doing-board-tab" type="button" onclick="window._doingRoomToLibrary(\'' + ui.escapeHtml(board.id) + '\')">Practice catalogue</button>' +
      "</div>" +
      "</div>" +
      '<div class="doing-room-tabs" aria-label="Choose a training room">' + roomButtons + "</div>" +
      '<div class="doing-room-focus">' +
      renderRoomGraphic(options) +
      '<div class="doing-room-drill-strip" aria-label="' + ui.escapeHtml(board.label) + ' drills">' + renderRoomDrillNodes(options) + "</div>" +
      "</div>" +
      '<div class="doing-room-preview-note">The image anchors the skill area. The circles are the actual drills; opening one replaces the image with instructions, feedback, and later a demonstration video.</div>' +
      "</section>";
  }

  return {
    version: "0.2.0",
    renderRoomConcept: renderRoomConcept,
    renderRoomDrillNodes: renderRoomDrillNodes,
    renderRoomGraphic: renderRoomGraphic,
    renderRoomStage: renderRoomStage
  };
});
