/*
 * Notebook controller adapter v0.
 *
 * Handles legacy notebook notes, context, and progress summaries.
 */
(function initNotebookController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthNotebookController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createNotebookController(root) {
  "use strict";

  var NODES = ["foundation", "doing", "knowing", "practice", "play", "create"];
  var NODE_NAMES = ["Foundation", "Do", "Know", "Practice", "Play", "Create"];
  var MINI_NAMES = ["Fnd", "Do", "Know", "Prac", "Play", "Create"];
  var COLORS = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#3498db", "#9b59b6"];

  function byId(doc, id) {
    return doc && doc.getElementById ? doc.getElementById(id) : null;
  }

  function readJson(storage, key) {
    try {
      return JSON.parse(storage.getItem(key) || "{}");
    } catch (error) {
      return {};
    }
  }

  function totalForNode(nodeId, data) {
    data = data || root;
    if (nodeId === "foundation" && data.FOUNDATION) return data.FOUNDATION.topics.length;
    if (nodeId === "doing" && data.DOING) return data.DOING.categories.reduce(function sumDrills(sum, category) { return sum + category.drills.length; }, 0);
    if (nodeId === "knowing" && data.KNOWING) return data.KNOWING.categories.reduce(function sumTopics(sum, category) { return sum + category.topics.length; }, 0);
    if (nodeId === "practice" && data.PRACTICE && data.PRACTICE.topics) return data.PRACTICE.topics.length;
    if (nodeId === "play" && data.WORLD_MAP_REGIONS) return data.WORLD_MAP_REGIONS.length;
    if (nodeId === "create" && data.CREATE) return data.CREATE.categories.reduce(function sumCreate(sum, category) { return sum + category.topics.length; }, 0);
    return 0;
  }

  function progressSummary(storage, data) {
    storage = storage || root.localStorage;
    var totalDone = 0;
    var totalItems = 0;
    var nodes = NODES.map(function mapNode(nodeId, index) {
      var progress = readJson(storage, "hearth-" + nodeId + "-progress");
      var done = Object.keys(progress).filter(function isDone(key) { return progress[key]; }).length;
      var total = totalForNode(nodeId, data || root);
      var pct = total > 0 ? Math.round(done / total * 100) : 0;
      totalDone += done;
      totalItems += total;
      return {
        color: COLORS[index],
        done: done,
        id: nodeId,
        label: NODE_NAMES[index],
        miniLabel: MINI_NAMES[index],
        pct: pct,
        total: total
      };
    });
    return {
      nodes: nodes,
      overallDone: totalDone,
      overallPct: totalItems > 0 ? Math.round(totalDone / totalItems * 100) : 0,
      overallTotal: totalItems
    };
  }

  function renderInlineNotebookHtml(summary) {
    var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">';
    summary.nodes.forEach(function renderNode(node) {
      html += '<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center">'
        + '<div style="font-family:\'DM Sans\',sans-serif;font-size:0.75rem;color:' + node.color + ';font-weight:700">' + node.label + '</div>'
        + '<div style="font-family:Cinzel,serif;font-size:1.4rem;color:' + node.color + ';margin:4px 0">' + node.pct + '%</div>'
        + '<div style="font-size:0.6rem;color:var(--dim)">' + node.done + '/' + node.total + '</div>'
        + '</div>';
    });
    html += '</div>';
    html += '<div style="background:var(--card);border:2px solid var(--gold);border-radius:8px;padding:16px;text-align:center;margin-bottom:16px">'
      + '<div style="font-family:JetBrains Mono;font-size:0.55rem;color:var(--gold);letter-spacing:0.15em;margin-bottom:2px">OVERALL PROGRESS</div>'
      + '<div style="font-family:Cinzel,serif;font-size:2rem;color:var(--gold)">' + summary.overallPct + '%</div>'
      + '<div style="font-size:0.7rem;color:var(--dim)">' + summary.overallDone + ' of ' + summary.overallTotal + ' completed</div>'
      + '</div>';
    return html;
  }

  function renderMiniProgressHtml(summary) {
    var html = '<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px">';
    summary.nodes.forEach(function renderMiniNode(node) {
      html += '<div style="text-align:center;padding:6px 2px;background:var(--card);border-radius:6px;border:1px solid var(--border)">'
        + '<div style="font-size:0.55rem;color:' + node.color + ';font-weight:600">' + node.miniLabel + '</div>'
        + '<div style="font-family:Cinzel;font-size:0.9rem;color:' + node.color + '">' + node.pct + '%</div>'
        + '</div>';
    });
    html += '</div>';
    return html;
  }

  function populateNotebook(doc, storage, data) {
    doc = doc || root.document;
    var el = byId(doc, "notebook-content");
    if (el) el.innerHTML = renderInlineNotebookHtml(progressSummary(storage || root.localStorage, data || root));
  }

  function populateNotebookProgress(doc, storage, data) {
    doc = doc || root.document;
    var el = byId(doc, "nb-progress");
    if (el) el.innerHTML = renderMiniProgressHtml(progressSummary(storage || root.localStorage, data || root));
  }

  function setContext(state, context, label, doc, storage) {
    state = state || {};
    doc = doc || root.document;
    storage = storage || root.localStorage;
    state.context = context || "general";
    state.key = "hearth-notebook-" + state.context;
    var ctxEl = byId(doc, "nb-context");
    if (ctxEl) ctxEl.textContent = label || state.context;
    var notes = storage.getItem(state.key) || "";
    var textarea = byId(doc, "nb-notes");
    if (textarea) textarea.value = notes;
    return state;
  }

  function toggleNotebook(state, doc, storage, data) {
    state = state || { context: "general", key: "hearth-notebook-general" };
    doc = doc || root.document;
    storage = storage || root.localStorage;
    var overlay = byId(doc, "notebook-overlay");
    if (!overlay) return state;
    var isOpen = overlay.style.display === "flex";
    if (isOpen) {
      overlay.style.display = "none";
    } else {
      overlay.style.display = "flex";
      var notes = storage.getItem(state.key) || "";
      var textarea = byId(doc, "nb-notes");
      if (textarea) {
        textarea.value = notes;
        if (textarea.focus) textarea.focus();
      }
      populateNotebookProgress(doc, storage, data || root);
    }
    return state;
  }

  function saveNotes(state, doc, storage, delay) {
    state = state || { key: "hearth-notebook-general" };
    doc = doc || root.document;
    storage = storage || root.localStorage;
    var textarea = byId(doc, "nb-notes");
    if (!textarea) return;
    storage.setItem(state.key, textarea.value);
    var saved = byId(doc, "nb-saved");
    if (saved) {
      saved.textContent = "Saved " + new Date().toLocaleTimeString();
      saved.style.color = "var(--gold)";
      (delay || root.setTimeout || setTimeout)(function dimSavedText() {
        saved.style.color = "var(--dim)";
      }, 1500);
    }
  }

  function clearNotes(state, doc, storage, confirmFn) {
    state = state || { key: "hearth-notebook-general" };
    doc = doc || root.document;
    storage = storage || root.localStorage;
    if (confirmFn && !confirmFn("Clear notes for this section?")) return;
    storage.removeItem(state.key);
    var textarea = byId(doc, "nb-notes");
    if (textarea) textarea.value = "";
  }

  return {
    version: "0.1.0",
    clearNotes: clearNotes,
    populateNotebook: populateNotebook,
    populateNotebookProgress: populateNotebookProgress,
    progressSummary: progressSummary,
    renderInlineNotebookHtml: renderInlineNotebookHtml,
    renderMiniProgressHtml: renderMiniProgressHtml,
    saveNotes: saveNotes,
    setContext: setContext,
    toggleNotebook: toggleNotebook
  };
});
