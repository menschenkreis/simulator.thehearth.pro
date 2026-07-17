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
    var stateLabels = config.stateLabels || {};
    var coach = config.coachForCategory(cat.id);
    var videoHtml = drill.video
      ? '<a href="' + esc(drill.video) + '" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:7px;color:var(--gold);text-decoration:none;font-size:0.75rem">Watch external demo</a>'
      : "";
    var stateButtons = ["practiced", "clean", "mastered"].map(function renderStateButton(nextState) {
      return '<button class="doing-state-btn ' + (nextState === "mastered" ? "mastered " : "") + (state === nextState ? "active" : "") + '" onclick="' + esc(stateAction) + '(\'' + esc(cat.id) + '\',\'' + esc(drill.id) + '\',\'' + nextState + '\')">' + esc(stateLabels[nextState] || nextState) + '</button>';
    }).join("");

    return '<div class="doing-drill-page">' +
      '<button class="back-btn" onclick="' + esc(backAction) + '()">&larr; Drill Library</button>' +
      '<div class="doing-drill-card doing-drill-card--clean">' +
        '<div class="doing-kicker">' + esc(cat.title) + ' &middot; ' + esc(level.name || "Current level") + '</div>' +
        '<h2>' + esc(drill.title) + '</h2>' +
        '<div style="display:flex;gap:6px;margin:8px 0 16px;flex-wrap:wrap">' +
          '<span class="tag">BPM ' + esc(drill.bpm) + '</span>' +
          '<span class="tag">' + esc(drill.duration) + '</span>' +
          videoHtml +
        '</div>' +
        '<div class="doing-drill-sections">' +
          '<div class="doing-drill-section"><div class="ds-label">What to do</div><div class="ds-text">' + esc(coach.whatDo) + '</div></div>' +
          '<div class="doing-drill-section"><div class="ds-label">How to do it</div><div class="ds-text">' + esc(coach.howDo) + '</div></div>' +
          '<div class="doing-drill-section"><div class="ds-label">How long</div><div class="ds-text">' + esc(coach.howLong) + '</div></div>' +
          '<div class="doing-drill-section"><div class="ds-label">Listen / feel</div><div class="ds-text">' + esc(coach.listen) + '</div></div>' +
          '<div class="doing-drill-section"><div class="ds-label">Common mistake</div><div class="ds-text">' + esc(coach.mistake) + '</div></div>' +
          '<div class="doing-drill-section"><div class="ds-label">Pass condition</div><div class="ds-text">' + esc(coach.pass) + '</div></div>' +
        '</div>' +
        '<div class="doing-drill-adjust">' +
          '<button class="doing-adj-btn" data-adj="easier">&#8592; Easier</button>' +
          '<button class="doing-adj-btn" data-adj="harder">Harder &#8594;</button>' +
        '</div>' +
        '<div class="doing-state-buttons">' + stateButtons + '</div>' +
      '</div>' +
    '</div>';
  }

  return {
    version: "0.1.0",
    renderDoingDrillDetail: renderDoingDrillDetail
  };
});
