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
      activeLevel: "all",
      activeSearch: "",
      activeBoard: "both-hands",
      doingView: "map",
      activeExpTab: "notes",
      doingDebug: false
    };

    function boardOptions() {
      return {
        doing: doing,
        config: doingConfig,
        activeStyle: state.activeStyle,
        activeLevel: state.activeLevel,
        activeSearch: state.activeSearch,
        activeBoard: state.activeBoard
      };
    }

    function getDoingLevel(drill) {
      return doingConfig.levelForDrill(drill);
    }

    function getState(drillId) {
      return doingBoard.getState(progress, stateOrder, drillId);
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
        activeBoard: state.activeBoard
      });
    }

    root.showDoingDrill = function showDoingDrill(catId, drillId) {
      if (root.playSfx) root.playSfx("drill-click");
      var cat = doing.categories.find(function findCategory(category) { return category.id === catId; });
      if (!cat) return;
      var drill = cat.drills.find(function findDrill(item) { return item.id === drillId; });
      if (!drill) return;
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
        ui: doingUi
      });
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
      } else {
        contentHtml = renderEntry();
      }

      if (!root.HearthDoingShellViewer) return;
      panel.innerHTML = root.HearthDoingShellViewer.renderDoingShell({
        doing: doing,
        ui: doingUi,
        progressSummary: progressSummary,
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
