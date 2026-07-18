/*
 * Create entry viewer v1.
 *
 * Renders the image-led Cauldron entrance. The existing cauldron scene owns
 * ingredient selection, prompt mixing, mutation, and song-seed editing.
 */
(function initCreateEntryViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthCreateEntryViewer = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createCreateEntryViewer() {
  "use strict";

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function dateLabel(value) {
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Saved idea";
    return "Saved " + date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function actionButton(action, label, extra) {
    return '<button type="button" class="create-entry-action" data-create-action="' + escapeHtml(action) + '"' + (extra || "") + ">" + escapeHtml(label) + "</button>";
  }

  function chips(items) {
    if (!items || !items.length) return "";
    return '<div class="create-entry-chips">' + items.map(function renderChip(item) {
      return "<span>" + escapeHtml(item) + "</span>";
    }).join("") + "</div>";
  }

  function renderContext(snapshot, mode) {
    var current = snapshot.current;
    var html = '<div class="create-entry-context-kicker">' + escapeHtml(snapshot.learner.name) + " · Create</div>";

    if (mode === "continue") {
      if (!current.hasMaterial) {
        html += "<h2>No ember is waiting yet</h2>";
        html += "<p>Bring one small musical fragment to the fire. It does not need to be a full idea.</p>";
        html += actionButton("select-ingredient", "Add an ingredient");
        return html;
      }
      html += "<h2>Return to the fire</h2>";
      html += "<p><strong>" + escapeHtml(current.title) + "</strong> is still warm. Shape it a little before you judge it.</p>";
      html += chips(current.ingredients);
      html += actionButton("continue-seed", "Open current seed");
      return html;
    }

    if (mode === "prompt") {
      html += "<h2>Ask the fire</h2>";
      html += "<p>The fire will choose one starting ingredient and give you a small playable constraint. The point is movement, not a perfect answer.</p>";
      html += '<div class="create-entry-meta">One clear prompt · One short experiment</div>';
      html += actionButton("ask-fire", "Receive a prompt");
      return html;
    }

    if (mode === "archive") {
      html += "<h2>Open the archive</h2>";
      if (!snapshot.saved.length) {
        html += "<p>Your saved riffs, lyrics, recordings, and fragments will collect here. An unfinished idea still counts.</p>";
      } else {
        html += '<div class="create-entry-meta">' + escapeHtml(snapshot.saved.length) + " saved fragments</div>";
        html += '<div class="create-entry-archive">' + snapshot.saved.slice(0, 3).map(function renderSaved(saved) {
          return '<button type="button" data-create-load="' + escapeHtml(saved.index) + '"><strong>' + escapeHtml(saved.title) + "</strong><span>" + escapeHtml(dateLabel(saved.savedAt)) + "</span>" + chips(saved.ingredients) + "</button>";
        }).join("") + "</div>";
      }
      return html;
    }

    html += "<h2>Add an ingredient</h2>";
    html += "<p>Begin with one thing you can actually hear or play: a rhythm, chord, scale phrase, riff, lyric, or question.</p>";
    html += chips(snapshot.ingredientNames);
    html += actionButton("new-seed", "Open the cauldron");
    return html;
  }

  function hotspot(mode, label, selected) {
    return '<button type="button" class="create-entry-hotspot create-entry-hotspot-' + escapeHtml(mode) + (selected === mode ? " is-selected" : "") + '" data-create-mode="' + escapeHtml(mode) + '" aria-pressed="' + (selected === mode ? "true" : "false") + '"><span class="create-entry-marker" aria-hidden="true"></span><span>' + escapeHtml(label) + "</span></button>";
  }

  function render(snapshot, selectedMode) {
    var selected = selectedMode || (snapshot.current.hasMaterial ? "continue" : "ingredient");
    return '<div class="create-entry-shell">' +
      '<button type="button" class="back-btn create-entry-back" data-create-back>&larr; Map</button>' +
      '<section class="create-entry-scene" aria-label="The Cauldron creative chamber">' +
        '<img class="create-entry-art" src="images/create/create-cauldron-tableau-v2.png" alt="A glowing cauldron with a notebook and saved sparks">' +
        '<div class="create-entry-shade" aria-hidden="true"></div>' +
        '<header class="create-entry-intro"><div class="create-entry-kicker">Create</div><h1>The Cauldron</h1><p>Bring fragments to the fire. Keep what begins to glow.</p></header>' +
        '<div class="create-entry-guide"><img src="images/character-generated/guide-thinking-v1-ui.webp" alt="Guide beside the creative chamber"><p>' + escapeHtml(snapshot.guideText) + "</p></div>" +
        hotspot("continue", "Return to the fire", selected) +
        hotspot("ingredient", "Add an ingredient", selected) +
        hotspot("prompt", "Ask the fire", selected) +
        hotspot("archive", "Open the archive", selected) +
        '<aside class="create-entry-context" id="create-entry-context" aria-live="polite">' + renderContext(snapshot, selected) + "</aside>" +
      "</section>" +
    "</div>";
  }

  return {
    version: "1.0.0",
    escapeHtml: escapeHtml,
    render: render,
    renderContext: renderContext
  };
});
