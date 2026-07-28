/*
 * Practice drill viewer adapter v0.
 *
 * Renders the legacy Practice drill detail screen.
 */
(function initPracticeDrillViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthPracticeDrillViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPracticeDrillViewer(root) {
  "use strict";

  function escapeHtml(value) {
    if (root.HearthPracticeDashboardViewer) {
      return root.HearthPracticeDashboardViewer.escapeHtml(value);
    }
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function timeAgo(value) {
    if (typeof root._timeAgo === "function") return root._timeAgo(value);
    return "";
  }

  function feelingEmoji(feeling) {
    if (typeof root._feelingEmoji === "function") return root._feelingEmoji(feeling);
    return "";
  }

  function renderAttemptHistory(attempts, candleColor) {
    attempts = attempts || [];
    if (!attempts.length) return "";
    return '<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px;margin-bottom:20px">' +
      '<div style="font-family:JetBrains Mono;font-size:0.6rem;color:' + candleColor + ';letter-spacing:0.1em;margin-bottom:8px">HISTORY (' + attempts.length + ')</div>' +
      attempts.slice(-3).reverse().map(function renderAttempt(attempt) {
        return '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border)">' +
          '<div style="font-size:0.75rem;color:var(--dim)">' + escapeHtml(timeAgo(new Date(attempt.ts))) + '</div>' +
          '<div style="font-size:0.75rem;color:var(--dim)">' + escapeHtml(attempt.bpm) + ' BPM · ' + escapeHtml(attempt.minutes) + ' min</div>' +
          '<div style="font-size:0.75rem">' + escapeHtml(feelingEmoji(attempt.feeling)) + '</div>' +
        '</div>';
      }).join('') +
    '</div>';
  }

  function renderPracticeDrill(options) {
    options = options || {};
    var drill = options.drill;
    if (!drill) return "";
    var candleColor = options.candleColor || "#e8a020";
    var done = options.done;
    var drillGuide = options.drillGuide || "";
    var prevAttempts = options.prevAttempts || [];

    return '<div style="padding:20px;max-width:900px;margin:0 auto">' +
      '<button class="back-btn" onclick="playSfx(\'book-close\');showPractice()">← Back to Temple</button>' +
      '<div style="display:flex;gap:20px;align-items:flex-start;margin-top:12px">' +
      '<div style="flex:0 0 120px;display:flex;flex-direction:column;align-items:center;position:sticky;top:20px">' +
        '<img src="images/character-full/Thinking.png" style="width:100px;height:100px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));animation:char-float 3s ease-in-out infinite"/>' +
        '<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 12px;margin-top:8px;max-width:140px;text-align:center;position:relative">' +
          '<div style="position:absolute;left:-6px;top:50%;transform:translateY(-50%);width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-right:6px solid var(--border)"></div>' +
          '<div style="font-size:0.65rem;color:var(--text);line-height:1.4">' + escapeHtml(drillGuide) + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="flex:1">' +
      '<div style="border-top:4px solid ' + candleColor + ';padding-top:16px;margin-bottom:20px">' +
        '<div style="font-family:JetBrains Mono;font-size:0.55rem;color:' + candleColor + ';letter-spacing:0.15em;text-transform:uppercase">' + escapeHtml(String(drill.category || "").toUpperCase()) + (done ? ' · MASTERED' : '') + '</div>' +
        '<h2 style="font-family:Cinzel,serif;color:var(--text);font-size:1.2rem;margin:6px 0;font-weight:700">' + escapeHtml(drill.title) + '</h2>' +
        '<div style="font-size:0.75rem;color:var(--dim)">' + escapeHtml(drill.description) + '</div>' +
        '<div style="display:flex;gap:12px;margin-top:8px">' +
          '<div style="font-size:0.7rem;color:' + candleColor + '">⏱ ' + escapeHtml(drill.duration) + '</div>' +
          '<div style="font-size:0.7rem;color:var(--dim)">Difficulty ' + escapeHtml(drill.difficulty) + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px;margin-bottom:20px">' +
        '<div style="font-family:JetBrains Mono;font-size:0.6rem;color:' + candleColor + ';letter-spacing:0.1em;margin-bottom:8px">HOW TO PRACTICE</div>' +
        '<div style="font-size:0.82rem;color:var(--text);line-height:1.6">' + escapeHtml(drill.instructions) + '</div>' +
      '</div>' +
      renderAttemptHistory(prevAttempts, candleColor) +
      '<div style="text-align:center">' +
        '<button onclick="startDrillPractice(\'' + escapeHtml(drill.id) + '\')" style="background:' + candleColor + ';color:#0d0b08;border:none;padding:16px 40px;border-radius:8px;font-family:Cinzel,serif;font-size:1rem;font-weight:700;cursor:pointer;letter-spacing:0.05em">🕯 Start Practising</button>' +
      '</div>' +
    '</div>';
  }

  return {
    version: "0.1.0",
    renderAttemptHistory: renderAttemptHistory,
    renderPracticeDrill: renderPracticeDrill
  };
});
