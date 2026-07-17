/*
 * Doing panel controller adapter v0.
 *
 * Opens and coordinates the legacy Doing panel using the smaller Doing adapters.
 */
(function initDoingPanelController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDoingPanelController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingPanelController(root) {
  "use strict";

  function applyState(target, nextState) {
    if (Object.prototype.hasOwnProperty.call(nextState, "doingView")) target.doingView = nextState.doingView;
    if (Object.prototype.hasOwnProperty.call(nextState, "activeExpTab")) target.activeExpTab = nextState.activeExpTab;
    if (Object.prototype.hasOwnProperty.call(nextState, "activeStyle")) target.activeStyle = nextState.activeStyle;
    if (Object.prototype.hasOwnProperty.call(nextState, "activeLevel")) target.activeLevel = nextState.activeLevel;
    if (Object.prototype.hasOwnProperty.call(nextState, "activeSearch")) target.activeSearch = nextState.activeSearch;
    if (Object.prototype.hasOwnProperty.call(nextState, "activeBoard")) target.activeBoard = nextState.activeBoard;
    if (Object.prototype.hasOwnProperty.call(nextState, "activeCategory")) target.activeCategory = nextState.activeCategory;
    if (Object.prototype.hasOwnProperty.call(nextState, "activeStatus")) target.activeStatus = nextState.activeStatus;
    if (Object.prototype.hasOwnProperty.call(nextState, "activeRoomConcept")) target.activeRoomConcept = nextState.activeRoomConcept;
    if (Object.prototype.hasOwnProperty.call(nextState, "activeRoomDrill")) target.activeRoomDrill = nextState.activeRoomDrill;
  }

  function showDoing() {
    var documentRef = root.document;
    if (!documentRef) return;

    documentRef.querySelectorAll(".pnl").forEach(function hidePanel(panel) {
      panel.classList.remove("on");
    });
    var panel = documentRef.getElementById("p-foundation");
    if (!panel) return;
    panel.classList.add("on");

    var doing = root.DOING;
    if (!doing) return;
    var storage = root.localStorage;
    var progress = JSON.parse((storage && storage.getItem("hearth-doing-progress")) || "{}");
    var doingConfig = root.HearthDoingConfig;
    var doingUi = root.HearthDoingUiUtils;
    var doingBoard = root.HearthDoingDrillBoardModel;
    if (!doingConfig || !doingUi || !doingBoard) return;

    var levels = doingConfig.levels;
    var stateOrder = doingConfig.stateOrder;
    var stateLabels = doingConfig.stateLabels;
    var guitarZones = doingConfig.guitarZones;
    var focusCats = doingConfig.focusCats;
    var progressSummary = doingBoard.summarizeProgress(doing, progress, stateOrder);
    var nextDrill = doingBoard.findNextDrill(doing, progress, stateOrder);
    var state = {
      activeStyle: "all",
      activeLevel: "1",
      activeSearch: "",
      activeBoard: "all",
      activeCategory: "all",
      activeStatus: "all",
      doingView: "map",
      activeExpTab: "notes",
      doingDebug: false,
      activeRoomConcept: "left-hand",
      activeRoomDrill: null
    };

    function boardOptions() {
      return {
        doing: doing,
        config: doingConfig,
        activeStyle: state.activeStyle,
        activeLevel: state.activeLevel,
        activeSearch: state.activeSearch,
        activeBoard: state.activeBoard,
        activeCategory: state.activeCategory,
        activeStatus: state.activeStatus,
        progress: progress,
        stateOrder: stateOrder
      };
    }

    function getDoingLevel(drill) {
      return doingConfig.levelForDrill(drill);
    }

    function getState(drillId) {
      return doingBoard.getState(progress, stateOrder, drillId);
    }

    function progressDegrees(drillId) {
      var currentState = getState(drillId);
      var index = stateOrder.indexOf(currentState);
      return index < 0 ? 0 : Math.round(((index + 1) / stateOrder.length) * 360);
    }

    function countForGenre(genreId) {
      return doingBoard.countForGenre(boardOptions(), genreId);
    }

    function normalizeActiveStyle() {
      if (state.activeStyle !== "all" && countForGenre(state.activeStyle) === 0) {
        state.activeStyle = "all";
      }
    }

    function renderBoard() {
      normalizeActiveStyle();
      if (!root.HearthDoingDrillBoardViewer) return "";
      return root.HearthDoingDrillBoardViewer.renderDoingDrillBoard({
        doing: doing,
        config: doingConfig,
        ui: doingUi,
        boardModel: doingBoard,
        progress: progress,
        activeStyle: state.activeStyle,
        activeLevel: state.activeLevel,
        activeSearch: state.activeSearch,
        activeBoard: state.activeBoard,
        activeCategory: state.activeCategory,
        activeStatus: state.activeStatus
      });
    }

    root.showDoingDrill = function showDoingDrill(catId, drillId) {
      if (root.playSfx) root.playSfx("drill-click");
      var cat = doing.categories.find(function findCategory(category) { return category.id === catId; });
      if (!cat) return;
      var drill = cat.drills.find(function findDrill(item) { return item.id === drillId; });
      if (!drill) return;
      if (!getState(drillId)) {
        progress[drillId] = "seen";
        if (storage) storage.setItem("hearth-doing-progress", JSON.stringify(progress));
        progressSummary = doingBoard.summarizeProgress(doing, progress, stateOrder);
      }
      var level = levels.find(function findLevel(item) {
        return item.level === getDoingLevel(drill);
      }) || levels[0];
      if (!root.HearthDoingDrillDetailViewer) return;
      panel.innerHTML = root.HearthDoingDrillDetailViewer.renderDoingDrillDetail({
        cat: cat,
        drill: drill,
        level: level,
        state: getState(drillId),
        config: doingConfig,
        ui: doingUi,
        backAction: "window._doingBackToLibrary"
      });
    };

    root.setDoingDrillState = function setDoingDrillState(catId, drillId, nextState) {
      if (stateOrder.indexOf(nextState) < 0) return;
      progress[drillId] = nextState;
      if (storage) storage.setItem("hearth-doing-progress", JSON.stringify(progress));
      progressSummary = doingBoard.summarizeProgress(doing, progress, stateOrder);
      root.showDoingDrill(catId, drillId);
    };

    function renderEntry() {
      if (!root.HearthDoingEntryViewer) return "";
      return root.HearthDoingEntryViewer.renderDoingEntry({
        focusCats: focusCats,
        nextDrill: nextDrill,
        levels: levels,
        config: doingConfig,
        ui: doingUi
      });
    }

    function renderMap() {
      if (!root.HearthDoingMapViewer) return "";
      return root.HearthDoingMapViewer.renderDoingMap({
        zones: guitarZones,
        doingDebug: state.doingDebug
      });
    }

    function renderExplorerView() {
      if (!root.HearthDoingExplorerViewer) return "";
      return root.HearthDoingExplorerViewer.renderDoingExplorer({
        activeTab: state.activeExpTab
      });
    }

    function findDrillEntry(drillId) {
      var found = null;
      doing.categories.some(function findCategory(cat) {
        var drill = cat.drills.find(function findDrill(item) {
          return item.id === drillId;
        });
        if (!drill) return false;
        found = { cat: cat, drill: drill };
        return true;
      });
      return found;
    }

    function collectRoomDrills(board) {
      var plan = (doingConfig.roomDrillPlans && doingConfig.roomDrillPlans[board.id] && doingConfig.roomDrillPlans[board.id][1]) || [];
      var planned = plan.map(findDrillEntry).filter(Boolean);
      if (planned.length) return planned;

      var candidates = [];
      doing.categories.forEach(function eachCategory(cat) {
        if (board.categories.indexOf(cat.id) < 0) return;
        cat.drills.forEach(function eachDrill(drill) {
          if (getDoingLevel(drill) !== 1) return;
          candidates.push({ cat: cat, drill: drill });
        });
      });
      return candidates.slice(0, 5);
    }

    function findRoomDrill(roomDrills, selected) {
      if (!selected) return null;
      return roomDrills.find(function findMatch(item) {
        return item.cat.id === selected.catId && item.drill.id === selected.drillId;
      }) || null;
    }

    function renderRoomConcept() {
      if (!root.HearthDoingRoomViewer) return "";
      var board = doingConfig.boardForId(state.activeRoomConcept || "left-hand");
      var roomDrills = collectRoomDrills(board);
      var selectedItem = findRoomDrill(roomDrills, state.activeRoomDrill);
      return root.HearthDoingRoomViewer.renderRoomConcept({
        board: board,
        config: doingConfig,
        ui: doingUi,
        roomDrills: roomDrills,
        selectedItem: selectedItem,
        getState: getState,
        progressDegrees: progressDegrees,
        stateLabels: stateLabels
      });
    }

    root._setDoingRoomConcept = function setDoingRoomConcept(roomId) {
      state.activeRoomConcept = roomId || "left-hand";
      state.activeRoomDrill = null;
      state.doingView = "room-concept";
      shell();
    };

    root._openDoingRoomDrill = function openDoingRoomDrill(catId, drillId) {
      if (root.playSfx) root.playSfx("drill-click");
      var cat = doing.categories.find(function findCategory(category) { return category.id === catId; });
      if (!cat) return;
      var drill = cat.drills.find(function findDrill(item) { return item.id === drillId; });
      if (!drill) return;
      if (!getState(drillId)) {
        progress[drillId] = "seen";
        if (storage) storage.setItem("hearth-doing-progress", JSON.stringify(progress));
        progressSummary = doingBoard.summarizeProgress(doing, progress, stateOrder);
      }
      state.activeRoomDrill = { catId: catId, drillId: drillId };
      state.doingView = "room-concept";
      shell();
    };

    root._setDoingRoomDrillState = function setDoingRoomDrillState(catId, drillId, nextState) {
      if (stateOrder.indexOf(nextState) < 0) return;
      progress[drillId] = nextState;
      if (storage) storage.setItem("hearth-doing-progress", JSON.stringify(progress));
      progressSummary = doingBoard.summarizeProgress(doing, progress, stateOrder);
      state.activeRoomDrill = { catId: catId, drillId: drillId };
      state.doingView = "room-concept";
      shell();
    };

    root._doingBackToLibrary = function doingBackToLibrary() {
      state.doingView = "training";
      shell();
    };

    root._doingRoomToLibrary = function doingRoomToLibrary(boardId) {
      state.activeBoard = boardId || state.activeRoomConcept || "all";
      state.activeLevel = "1";
      state.activeCategory = "all";
      state.activeStatus = "all";
      state.activeStyle = "all";
      state.activeRoomDrill = null;
      state.doingView = "training";
      shell();
    };

    function bindDrillPreviews() {
      if (!root.HearthDoingDrillPreviewController) return;
      root.HearthDoingDrillPreviewController.bindDrillPreviews({
        rootEl: panel,
        documentRef: documentRef,
        doing: doing,
        ui: doingUi,
        stateLabels: stateLabels,
        getState: getState,
        getLevel: getDoingLevel,
        onOpenDrill: root.showDoingDrill
      });
    }

    function rerenderBoard(refocusSearch) {
      var fretboard = documentRef.getElementById("doing-fretboard");
      if (fretboard) {
        fretboard.innerHTML = renderBoard();
        bindControls();
        bindDrillPreviews();
      }
      if (refocusSearch) {
        var search = documentRef.getElementById("doing-search");
        if (search) {
          search.focus();
          search.setSelectionRange(state.activeSearch.length, state.activeSearch.length);
        }
      }
    }

    function bindExplorer() {
      if (!root.HearthDoingExplorerController) return;
      root.HearthDoingExplorerController.bindExplorerNoteLocator({
        rootEl: panel,
        documentRef: documentRef
      });
    }

    function bindControls() {
      if (!root.HearthDoingControlsController) return;
      root.HearthDoingControlsController.bindDoingControls({
        rootEl: panel,
        documentRef: documentRef,
        doingView: state.doingView,
        focusCats: focusCats,
        activeBoard: state.activeBoard,
        setState: function setDoingState(nextState) {
          applyState(state, nextState);
        },
        shell: shell,
        showDoingDrill: root.showDoingDrill,
        rerenderBoard: rerenderBoard,
        normalizeActiveStyle: normalizeActiveStyle,
        alertFn: root.alert
      });
    }

    function shell() {
      if (state.doingView === "map") {
        panel.innerHTML = renderMap();
        bindControls();
        return;
      }

      var contentHtml = "";
      if (state.doingView === "training") {
        contentHtml = '<div id="doing-fretboard">' + renderBoard() + "</div>";
      } else if (state.doingView === "explorer") {
        contentHtml = renderExplorerView();
      } else if (state.doingView === "room-concept") {
        contentHtml = renderRoomConcept();
      } else {
        contentHtml = renderEntry();
      }

      if (!root.HearthDoingShellViewer) return;
      panel.innerHTML = root.HearthDoingShellViewer.renderDoingShell({
        doing: doing,
        ui: doingUi,
        progressSummary: progressSummary,
        doingView: state.doingView,
        contentHtml: contentHtml
      });
      bindControls();
      if (state.doingView === "explorer" && state.activeExpTab === "notes") bindExplorer();
      bindDrillPreviews();
    }

    if (root.HearthDoingMapController) {
      root.HearthDoingMapController.bindDoingMapGlobals({
        zones: guitarZones,
        documentRef: documentRef,
        setState: function setDoingMapState(nextState) {
          applyState(state, nextState);
        },
        getDebug: function getDebug() { return state.doingDebug; },
        setDebug: function setDebug(nextDebug) { state.doingDebug = nextDebug; },
        shell: shell
      });
    }

    shell();
  }

  return {
    version: "0.1.0",
    applyState: applyState,
    showDoing: showDoing
  };
});
