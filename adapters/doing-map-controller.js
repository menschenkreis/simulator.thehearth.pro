/*
 * Doing map controller adapter v0.
 *
 * Binds global map-zone handlers for the legacy Doing view.
 */
(function initDoingMapController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDoingMapController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingMapController(root) {
  "use strict";

  function stateForZone(zone) {
    if (!zone) return {};
    if (zone.view === "explorer") {
      return { doingView: "explorer", activeExpTab: "notes" };
    }
    return { doingView: "training", activeStyle: "all", activeLevel: "all", activeBoard: zone.board || zone.id || "both-hands" };
  }

  function updateDebugUi(documentRef, doingDebug) {
    if (!documentRef) return;
    documentRef.querySelectorAll(".doing-map-zone").forEach(function updateZone(zoneEl) {
      zoneEl.classList.toggle("debug", doingDebug);
    });
    var btn = documentRef.querySelector(".doing-map-debug-btn");
    if (btn) {
      btn.classList.toggle("active", doingDebug);
      btn.textContent = doingDebug ? "DEBUG ON" : "debug";
    }
  }

  function bindDoingMapGlobals(options) {
    options = options || {};
    var zones = options.zones || [];
    var setState = options.setState;
    var getDebug = options.getDebug;
    var setDebug = options.setDebug;
    var shell = options.shell;
    var documentRef = options.documentRef || root.document;

    if (!setState || !shell) return;

    root._enterDoingZone = function enterDoingZone(zoneId) {
      var zone = zones.find(function findZone(item) {
        return item.id === zoneId;
      });
      if (!zone) return;
      setState(stateForZone(zone));
      shell();
    };

    root._toggleDoingDebug = function toggleDoingDebug() {
      var nextDebug = !(getDebug && getDebug());
      if (setDebug) setDebug(nextDebug);
      updateDebugUi(documentRef, nextDebug);
    };

    root._doingZones = zones;
    root._doingBackToMap = function doingBackToMap() {
      setState({ doingView: "map" });
      shell();
    };
  }

  return {
    version: "0.1.0",
    bindDoingMapGlobals: bindDoingMapGlobals,
    stateForZone: stateForZone,
    updateDebugUi: updateDebugUi
  };
});
