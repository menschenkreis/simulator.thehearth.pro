/*
 * Practice entry viewer v1.
 *
 * Renders the image-led Practice chamber and its compact contextual dock.
 */
(function initPracticeEntryViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthPracticeEntryViewer = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPracticeEntryViewer() {
  "use strict";

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(value) {
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Earlier";
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function listHtml(items) {
    return '<ul class="practice-entry-list">' + (items || []).slice(0, 3).map(function renderItem(item) {
      return "<li>" + escapeHtml(item) + "</li>";
    }).join("") + "</ul>";
  }

  function actionButton(action, label) {
    return '<button type="button" class="practice-entry-action" data-practice-action="' + escapeHtml(action) + '">' + escapeHtml(label) + "</button>";
  }

  function renderContext(snapshot, mode) {
    var learnerName = escapeHtml(snapshot.learner.name);
    var commitment = snapshot.commitment;
    var html = '<div class="practice-entry-context-kicker">' + learnerName + " · Today</div>";

    if (mode === "continue") {
      if (snapshot.activeSession.running) {
        html += "<h2>Continue today's practice</h2>";
        html += "<p>Your candle is still burning. Return to " + escapeHtml(snapshot.activeSession.focus) + ".</p>";
        html += '<div class="practice-entry-meta">' + escapeHtml(snapshot.activeSession.minutes) + " minute session</div>";
        html += actionButton("continue-session", "Return to session");
      } else {
        html += "<h2>Nothing is paused</h2>";
        html += "<p>Your practice room is clear. Open today's plan when you are ready to begin.</p>";
        html += actionButton("select-planned", "Open today's plan");
      }
      return html;
    }

    if (mode === "free") {
      html += "<h2>Free practice</h2>";
      html += "<p>Choose your own focus and use a simple candle without changing the Journey plan.</p>";
      html += '<div class="practice-entry-meta">Self-directed · Gentle timer</div>';
      html += actionButton("start-free", "Begin free practice");
      return html;
    }

    if (mode === "review") {
      html += "<h2>Previous practice</h2>";
      if (!snapshot.history.length) {
        html += "<p>No learner-specific practice sessions have been saved yet. Your first reflection will appear here.</p>";
      } else {
        html += '<ul class="practice-entry-history">' + snapshot.history.slice(0, 3).map(function renderHistory(row) {
          return "<li><strong>" + escapeHtml(formatDate(row.createdAt)) + " · " + escapeHtml(row.minutes) + " min</strong> · " + escapeHtml(row.focus) + "</li>";
        }).join("") + "</ul>";
      }
      html += '<div class="practice-entry-meta">' + escapeHtml(snapshot.totals.sessions) + " sessions · " + escapeHtml(snapshot.totals.minutes) + " minutes</div>";
      return html;
    }

    html += "<h2>" + escapeHtml(commitment.title) + "</h2>";
    html += "<p>" + escapeHtml(commitment.today) + "</p>";
    html += '<div class="practice-entry-meta">' + escapeHtml(commitment.todayMinutes) + " of " + escapeHtml(commitment.targetMinutes) + " minutes today";
    if (commitment.currentDay && commitment.totalDays) {
      html += " · Day " + escapeHtml(commitment.currentDay) + " of " + escapeHtml(commitment.totalDays);
    }
    html += "</div>";
    html += listHtml(snapshot.recommendations);
    html += actionButton("start-planned", "Begin planned session");
    return html;
  }

  function hotspot(mode, label, selected, progress) {
    return '<button type="button" class="practice-entry-hotspot' + (selected === mode ? " is-selected" : "") + '" data-practice-mode="' + mode + '" aria-pressed="' + (selected === mode ? "true" : "false") + '" aria-label="' + escapeHtml(label) + '" style="--hotspot-progress:' + (Number(progress) * 3.6) + 'deg">' +
      '<span class="practice-entry-marker" aria-hidden="true"></span>' +
      '<span class="practice-entry-label">' + escapeHtml(label) + "</span>" +
    "</button>";
  }

  function render(snapshot, selectedMode) {
    var selected = selectedMode || (snapshot.activeSession.running ? "continue" : "planned");
    return '<div class="practice-entry-shell">' +
      '<button type="button" class="back-btn practice-entry-back" data-practice-back>&larr; Map</button>' +
      '<div class="practice-entry-stage">' +
        '<section class="practice-entry-scene" aria-label="Practice chamber">' +
          '<img class="practice-entry-art" src="images/practice/practice-chamber-v1.jpg" alt="A quiet practice chamber with a candle, practice book, guitar, and journal">' +
          '<header class="practice-entry-intro">' +
            '<div class="practice-entry-kicker">Practice</div>' +
            '<h1>Focused repetition</h1>' +
            '<p>One intention. One honest session.</p>' +
          "</header>" +
          '<div class="practice-entry-guide">' +
            '<img src="images/character-generated/guide-seated-listening-v1-ui.webp" alt="Guide listening beside the practice chamber">' +
            "<p>" + escapeHtml(snapshot.guideText) + "</p>" +
          "</div>" +
          hotspot("planned", "Planned session", selected, 0) +
          hotspot("continue", "Continue today", selected, snapshot.commitment.progressPercent) +
          hotspot("free", "Free practice", selected, 0) +
          hotspot("review", "Previous practice", selected, 0) +
        "</section>" +
        '<aside class="practice-entry-context" id="practice-entry-context" aria-live="polite">' + renderContext(snapshot, selected) + "</aside>" +
      "</div>" +
    "</div>";
  }

  return {
    version: "1.0.0",
    escapeHtml: escapeHtml,
    render: render,
    renderContext: renderContext
  };
});
