/*
 * Doing entry viewer adapter v0.
 *
 * Renders the calm entry panel for the legacy Doing view.
 */
(function initDoingEntryViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDoingEntryViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingEntryViewer(root) {
  "use strict";

  function renderDoingEntry(options) {
    options = options || {};
    var focusCats = options.focusCats || [];
    var nextDrill = options.nextDrill || null;
    var levels = options.levels || [];
    var config = options.config || root.HearthDoingConfig;
    var ui = options.ui || root.HearthDoingUiUtils;

    if (!config || !ui) {
      return "";
    }

    var esc = ui.escapeHtml;
    var recHtml = "";
    if (nextDrill) {
      var rd = nextDrill.drill;
      var rc = nextDrill.cat;
      var rl = config.levelForDrill(rd);
      var rlObj = levels.find(function findLevel(level) {
        return level.level === rl;
      }) || levels[0] || { name: "Current level" };
      recHtml = '<div class="doing-rec-drill" data-cat="' + esc(rc.id) + '" data-drill="' + esc(rd.id) + '">' +
        '<div class="rec-label">Recommended next</div>' +
        '<div class="rec-title">' + esc(rd.title) + '</div>' +
        '<div class="rec-meta">' + esc(rc.title) + ' &middot; ' + esc(rlObj.name) + ' &middot; ' + esc(rd.duration || "5 min") + '</div>' +
      '</div>';
    }

    var html = '<div class="doing-calm">' +
      '<h2 style="font-family:Cinzel,serif;color:var(--gold);font-size:1.1rem;margin:0 0 4px">Doing</h2>' +
      '<p style="color:var(--dim);font-size:0.8rem;margin:0 0 16px">Train one physical skill at a time.</p>' +
      '<div class="doing-focus-grid">';
    focusCats.forEach(function renderFocusButton(fc) {
      html += '<button class="doing-focus-btn" data-focus="' + esc(fc.id) + '">' + esc(fc.icon) + ' ' + esc(fc.label) + '</button>';
    });
    html += '</div>' +
      recHtml +
      '<div class="doing-quick-links">' +
        '<button class="doing-link-btn" data-action="open-map">&#9654; Open Training Map</button>' +
        '<button class="doing-link-btn" data-action="open-explorer">&#9654; Open Fretboard Explorer</button>' +
      '</div>' +
    '</div>';
    return html;
  }

  return {
    version: "0.1.0",
    renderDoingEntry: renderDoingEntry
  };
});
