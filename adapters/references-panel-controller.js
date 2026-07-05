/*
 * References panel controller adapter v0.
 *
 * Renders and opens the legacy References header popup.
 */
(function initReferencesPanelController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthReferencesPanelController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createReferencesPanelController(root) {
  "use strict";

  var REFERENCE_NODES = ["FOUNDATION", "DOING", "KNOWING", "PLAY", "PRACTICE"];
  var LABELS = {
    FOUNDATION: "Foundation",
    DOING: "Do",
    KNOWING: "Know",
    PLAY: "Play",
    PRACTICE: "Practice"
  };

  function byId(doc, id) {
    return doc && doc.getElementById ? doc.getElementById(id) : null;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function sourceGroups(data) {
    data = data || root;
    return REFERENCE_NODES.map(function mapNode(key) {
      var node = data[key] || {};
      return {
        key: key,
        label: LABELS[key],
        sources: node.sources || []
      };
    }).filter(function hasSources(group) {
      return group.sources.length > 0;
    });
  }

  function renderReferencesHtml(data) {
    var groups = sourceGroups(data);
    if (!groups.length) {
      return '<div style="color:var(--dim);font-size:0.7rem">No references loaded.</div>';
    }
    var html = '<h3 style="font-family:Cinzel;font-size:0.85rem;color:var(--gold);margin:0 0 12px 0">References</h3>';
    groups.forEach(function renderGroup(group) {
      html += '<div style="margin-bottom:10px">'
        + '<div style="font-family:JetBrains Mono;font-size:0.55rem;color:var(--amber);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:2px">'
        + escapeHtml(group.label)
        + '</div>'
        + '<div style="font-size:0.65rem;color:var(--dim);line-height:1.5">'
        + group.sources.map(escapeHtml).join("<br>")
        + '</div></div>';
    });
    return html;
  }

  function renderReferences(doc, data) {
    doc = doc || root.document;
    var el = byId(doc, "refsContent");
    if (!el) return;
    el.innerHTML = renderReferencesHtml(data || root);
  }

  function closeHeaderPanels(doc) {
    ["searchPanel", "progressPanel", "settingsPanel"].forEach(function close(id) {
      var panel = byId(doc, id);
      if (panel && panel.classList) panel.classList.remove("show");
    });
  }

  function toggleReferences(options) {
    options = options || {};
    var doc = options.document || root.document;
    var panel = byId(doc, "refsPanel");
    if (!panel || !panel.classList) return;
    panel.classList.toggle("show");
    if (panel.classList.contains("show")) {
      renderReferences(doc, options.data || root);
      if (typeof options.closePanels === "function") options.closePanels();
      else closeHeaderPanels(doc);
    }
  }

  return {
    version: "0.1.0",
    escapeHtml: escapeHtml,
    renderReferences: renderReferences,
    renderReferencesHtml: renderReferencesHtml,
    sourceGroups: sourceGroups,
    toggleReferences: toggleReferences
  };
});
