/*
 * Doing shell viewer adapter v0.
 *
 * Renders the outer shell and header for the legacy Doing view.
 */
(function initDoingShellViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDoingShellViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingShellViewer(root) {
  "use strict";

  function renderDoingShell(options) {
    options = options || {};
    var doing = options.doing || {};
    var ui = options.ui || root.HearthDoingUiUtils;
    var progressSummary = options.progressSummary || {};
    var contentHtml = options.contentHtml || "";
    var doingView = options.doingView || "entry";

    if (!ui) {
      return "";
    }

    var esc = ui.escapeHtml;
    return '<div class="doing-shell doing-shell--' + esc(doingView) + '">' +
      '<button class="back-btn" onclick="window._doingBackToMap()">&larr; Map</button>' +
      '<div class="doing-hero">' +
        '<img class="doing-hero-icon" src="images/doing-icon.png" alt="">' +
        '<div><div class="doing-kicker">Do Node &middot; Training Chamber</div>' +
        '<h2>' + esc(doing.title) + '</h2>' +
        '<p style="font-size:0.82rem;color:var(--dim)">' + esc(doing.subtitle || "Train one physical skill at a time.") + '</p></div>' +
        '<div class="doing-stat-strip">' +
          '<div class="doing-stat"><strong>' + esc(progressSummary.mastered || 0) + '</strong><span>mastered</span></div>' +
          '<div class="doing-stat"><strong>' + esc(progressSummary.touched || 0) + '</strong><span>touched</span></div>' +
        '</div>' +
      '</div>' +
      contentHtml +
    '</div>';
  }

  return {
    version: "0.1.0",
    renderDoingShell: renderDoingShell
  };
});
