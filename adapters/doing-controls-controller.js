/*
 * Doing controls controller adapter v0.
 *
 * Binds the general controls in the legacy Doing view.
 */
(function initDoingControlsController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDoingControlsController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingControlsController(root) {
  "use strict";

  function stateForFocus(focusId, focusCats) {
    if (focusId === "fretboard") {
      return { doingView: "explorer", activeExpTab: "notes" };
    }
    var focus = (focusCats || []).find(function findFocus(item) {
      return item.id === focusId;
    });
    if (focus && focus.categories && focus.categories.length) {
      return { doingView: "training", activeStyle: "all", activeLevel: "all" };
    }
    return { doingView: "training" };
  }

  function stateForQuickLink(action) {
    if (action === "open-map") return { doingView: "training" };
    if (action === "open-explorer") return { doingView: "explorer", activeExpTab: "notes" };
    return {};
  }

  function bindDoingControls(options) {
    options = options || {};
    var rootEl = options.rootEl;
    var documentRef = options.documentRef || root.document;
    var doingView = options.doingView;
    var focusCats = options.focusCats || [];
    var setState = options.setState;
    var shell = options.shell;
    var showDoingDrill = options.showDoingDrill;
    var rerenderBoard = options.rerenderBoard;
    var normalizeActiveStyle = options.normalizeActiveStyle;
    var alertFn = options.alertFn || root.alert;

    if (!rootEl || !documentRef || !setState || !shell) return;

    rootEl.querySelectorAll(".doing-focus-btn").forEach(function bindFocusButton(btn) {
      btn.onclick = function onFocusClick() {
        setState(stateForFocus(btn.getAttribute("data-focus"), focusCats));
        shell();
      };
    });

    rootEl.querySelectorAll(".doing-rec-drill").forEach(function bindRecommendedDrill(card) {
      card.onclick = function onRecommendedDrillClick() {
        if (showDoingDrill) {
          showDoingDrill(card.getAttribute("data-cat"), card.getAttribute("data-drill"));
        }
      };
    });

    rootEl.querySelectorAll(".doing-link-btn").forEach(function bindQuickLink(btn) {
      btn.onclick = function onQuickLinkClick() {
        setState(stateForQuickLink(btn.getAttribute("data-action")));
        shell();
      };
    });

    rootEl.querySelectorAll(".doing-exp-tab").forEach(function bindExplorerTab(btn) {
      btn.onclick = function onExplorerTabClick() {
        setState({ activeExpTab: btn.getAttribute("data-etab") });
        shell();
      };
    });

    if (root.HearthDoingDrillAdjustController) {
      root.HearthDoingDrillAdjustController.bindDrillAdjustButtons({
        rootEl: rootEl,
        alertFn: alertFn
      });
    }

    if (doingView !== "training") return;

    var styleFilters = documentRef.getElementById("style-filters");
    if (styleFilters && rerenderBoard) {
      styleFilters.addEventListener("click", function onStyleFilterClick(event) {
        var btn = event.target.closest(".style-filter");
        if (!btn || btn.classList.contains("disabled")) return;
        setState({ activeStyle: btn.getAttribute("data-style") || "all" });
        rerenderBoard();
      });
    }

    var levelFilters = documentRef.getElementById("doing-level-filters");
    if (levelFilters && rerenderBoard) {
      levelFilters.addEventListener("click", function onLevelFilterClick(event) {
        var btn = event.target.closest(".doing-level-filter");
        if (!btn || btn.classList.contains("disabled")) return;
        setState({ activeLevel: btn.getAttribute("data-level") || "all" });
        if (normalizeActiveStyle) normalizeActiveStyle();
        rerenderBoard();
      });
    }

    var searchInput = documentRef.getElementById("doing-search");
    if (searchInput && rerenderBoard) {
      searchInput.addEventListener("input", function onSearchInput() {
        setState({ activeSearch: this.value.trim() });
        rerenderBoard(true);
      });
    }
  }

  return {
    version: "0.1.0",
    bindDoingControls: bindDoingControls,
    stateForFocus: stateForFocus,
    stateForQuickLink: stateForQuickLink
  };
});
