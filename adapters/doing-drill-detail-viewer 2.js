/*
 * Doing drill detail viewer adapter v0.
 *
 * Renders the clean detail card for a single legacy Doing drill.
 */
(function initDoingDrillDetailViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDoingDrillDetailViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingDrillDetailViewer(root) {
  "use strict";

  function renderDoingDrillDetail(options) {
    options = options || {};
    var cat = options.cat;
    var drill = options.drill;
    var level = options.level || {};
    var state = options.state || "";
    var config = options.config || root.HearthDoingConfig;
    var ui = options.ui || root.HearthDoingUiUtils;
    var stateAction = options.stateAction || "setDoingDrillState";
    var backAction = options.backAction || "showDoing";

    if (!cat || !drill || !config || !ui) {
      return "";
    }

    var esc = ui.escapeHtml;
    var teachingViewer = root.HearthDoingTeachingViewer;
    if (!teachingViewer) return "";
    var videoHtml = drill.video
      ? '<a class="doing-demo-link" href="' + esc(drill.video) + '" target="_blank" rel="noopener">Watch source demonstration</a>'
      : "";

    return '<div class="doing-drill-page">' +
      '<button class="back-btn" onclick="' + esc(backAction) + '()">&larr; Drill Library</button>' +
      '<div class="doing-drill-page-head"><div><span>Level ' + esc(level.level || 1) + ' · ' + esc(level.name || "Touch") + '</span><b>' + esc(drill.title) + '</b></div>' + videoHtml + '</div>' +
      teachingViewer.renderScene({
        cat: cat,
        drill: drill,
        config: config,
        ui: ui,
        currentState: state,
        evidence: options.evidence || null,
        stateLabels: config.stateLabels || {},
        stateAction: stateAction,
        pageMode: true
      }) +
    '</div>';
  }

  return {
    version: "0.2.0",
    renderDoingDrillDetail: renderDoingDrillDetail
  };
});
