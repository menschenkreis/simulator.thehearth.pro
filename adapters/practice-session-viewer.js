/*
 * Practice session viewer adapter v0.
 *
 * Renders the legacy timed Practice candle session screen.
 */
(function initPracticeSessionViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthPracticeSessionViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPracticeSessionViewer(root) {
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

  function renderMetronome(startBpm, candleColor) {
    return '<div id="metro-panel" style="background:var(--card);border:1px solid ' + candleColor + '40;border-radius:8px;padding:20px;margin-bottom:20px;text-align:center">' +
      '<div style="font-family:JetBrains Mono;font-size:0.6rem;color:' + candleColor + ';letter-spacing:0.15em;margin-bottom:12px">METRONOME</div>' +
      '<div style="margin-bottom:16px">' +
        '<div id="bpm-display" style="font-family:Cinzel,serif;font-size:3.5rem;color:' + candleColor + ';line-height:1">' + escapeHtml(startBpm) + '</div>' +
        '<div style="font-size:0.7rem;color:var(--dim)">BPM</div>' +
      '</div>' +
      '<div style="display:flex;justify-content:center;gap:8px;margin-bottom:16px">' +
        '<button onclick="_metroBpm(-10)" style="width:44px;height:44px;border-radius:50%;background:var(--card);border:1px solid var(--border);color:var(--text);font-size:1rem;cursor:pointer">-10</button>' +
        '<button onclick="_metroBpm(-5)" style="width:44px;height:44px;border-radius:50%;background:var(--card);border:1px solid var(--border);color:var(--text);font-size:0.85rem;cursor:pointer">-5</button>' +
        '<button id="metro-toggle" onclick="_metroToggle()" style="width:64px;height:64px;border-radius:50%;background:' + candleColor + ';border:none;color:#0d0b08;font-size:1.4rem;cursor:pointer">▶</button>' +
        '<button onclick="_metroBpm(5)" style="width:44px;height:44px;border-radius:50%;background:var(--card);border:1px solid var(--border);color:var(--text);font-size:0.85rem;cursor:pointer">+5</button>' +
        '<button onclick="_metroBpm(10)" style="width:44px;height:44px;border-radius:50%;background:var(--card);border:1px solid var(--border);color:var(--text);font-size:1rem;cursor:pointer">+10</button>' +
      '</div>' +
      '<div style="display:flex;justify-content:center;gap:8px">' +
        '<button id="ts-4" onclick="_metroTs(4)" style="padding:6px 14px;border-radius:4px;border:1px solid ' + candleColor + ';background:' + candleColor + '20;color:' + candleColor + ';font-size:0.7rem;font-family:JetBrains Mono;cursor:pointer">4/4</button>' +
        '<button id="ts-3" onclick="_metroTs(3)" style="padding:6px 14px;border-radius:4px;border:1px solid var(--border);background:var(--card);color:var(--dim);font-size:0.7rem;font-family:JetBrains Mono;cursor:pointer">3/4</button>' +
        '<button id="ts-6" onclick="_metroTs(6)" style="padding:6px 14px;border-radius:4px;border:1px solid var(--border);background:var(--card);color:var(--dim);font-size:0.7rem;font-family:JetBrains Mono;cursor:pointer">6/8</button>' +
      '</div>' +
    '</div>';
  }

  function renderAssessmentButtons(drillId, candleColor) {
    return '<div style="font-family:JetBrains Mono;font-size:0.6rem;color:' + candleColor + ';letter-spacing:0.12em;text-align:center;margin-bottom:10px">HOW DID THAT FEEL?</div>' +
      '<div style="display:flex;gap:8px;margin-bottom:20px">' +
        '<button onclick="_finishDrill(\'' + escapeHtml(drillId) + '\',\'nailed\')" style="flex:1;background:#2ecc7118;border:2px solid #2ecc7140;color:#2ecc71;padding:14px 8px;border-radius:8px;cursor:pointer;font-family:DM Sans,sans-serif;text-align:center;transition:all 0.2s" onmouseover="this.style.borderColor=\'#2ecc71\'" onmouseout="this.style.borderColor=\'#2ecc7140\'">' +
          '<div style="font-size:1.3rem">🔥</div><div style="font-size:0.75rem;font-weight:700">Nailed It</div><div style="font-size:0.6rem;color:var(--dim)">Easy, move on</div>' +
        '</button>' +
        '<button onclick="_finishDrill(\'' + escapeHtml(drillId) + '\',\'getting\')" style="flex:1;background:' + candleColor + '12;border:2px solid ' + candleColor + '30;color:' + candleColor + ';padding:14px 8px;border-radius:8px;cursor:pointer;font-family:DM Sans,sans-serif;text-align:center;transition:all 0.2s" onmouseover="this.style.borderColor=\'' + candleColor + '\'" onmouseout="this.style.borderColor=\'' + candleColor + '30\'">' +
          '<div style="font-size:1.3rem">💪</div><div style="font-size:0.75rem;font-weight:700">Getting It</div><div style="font-size:0.6rem;color:var(--dim)">Need more practice</div>' +
        '</button>' +
        '<button onclick="_finishDrill(\'' + escapeHtml(drillId) + '\',\'stuck\')" style="flex:1;background:#e74c3c10;border:2px solid #e74c3c30;color:#e74c3c;padding:14px 8px;border-radius:8px;cursor:pointer;font-family:DM Sans,sans-serif;text-align:center;transition:all 0.2s" onmouseover="this.style.borderColor=\'#e74c3c\'" onmouseout="this.style.borderColor=\'#e74c3c30\'">' +
          '<div style="font-size:1.3rem">🤔</div><div style="font-size:0.75rem;font-weight:700">Not Getting It</div><div style="font-size:0.6rem;color:var(--dim)">Stepped too far, go back</div>' +
        '</button>' +
      '</div>';
  }

  function renderPracticeSession(options) {
    options = options || {};
    var drill = options.drill;
    if (!drill) return "";
    var candleColor = options.candleColor || "#e8a020";
    var sessionMinutes = options.sessionMinutes || 10;
    var startBpm = options.startBpm || 60;

    return '<div class="practice-temple">' +
      '<div class="practice-title">' +
        '<h2>Candle Practice</h2>' +
        '<p>' + escapeHtml(drill.category) + ' · ' + escapeHtml(sessionMinutes) + ' minute candle</p>' +
      '</div>' +
      '<div class="practice-chamber">' +
      '<div style="position:relative;z-index:1;padding:22px;max-width:620px;margin:0 auto">' +
      '<div class="practice-timer-ring">' +
        '<div class="temple-candle" id="session-candle" style="margin:0 auto 14px"><div id="candle-flame" class="temple-flame"></div></div>' +
        '<div id="timer-display" class="practice-countdown">' + String(sessionMinutes).padStart(2, "0") + ':00</div>' +
        '<div style="font-size:0.66rem;color:var(--dim);margin-top:5px">candle remaining</div>' +
      '</div>' +
      '<div class="practice-panel" style="margin-bottom:14px;text-align:center">' +
        '<div class="practice-panel-title">Current Offering</div>' +
        '<div style="font-family:Cinzel,serif;color:var(--text);font-size:1.15rem;font-weight:700">' + escapeHtml(drill.title) + '</div>' +
        '<div style="font-size:0.72rem;color:var(--dim);margin-top:5px">' + escapeHtml(drill.description) + '</div>' +
      '</div>' +
      '<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:14px;margin-bottom:20px;font-size:0.78rem;color:var(--text);line-height:1.5">' +
        escapeHtml(drill.instructions) +
      '</div>' +
      renderMetronome(startBpm, candleColor) +
      renderAssessmentButtons(drill.id, candleColor) +
      '<button onclick="showPractice()" style="display:block;margin:0 auto;background:none;border:1px solid var(--border);color:var(--dim);padding:6px 12px;border-radius:4px;cursor:pointer;font-family:inherit;font-size:0.7rem">Cancel</button>' +
      '</div></div></div>';
  }

  function renderFinishResult(options) {
    options = options || {};
    var drill = options.drill;
    var outcome = options.outcome;
    if (!drill || !outcome) return "";
    var bpm = options.bpm || 60;
    var candleColor = options.candleColor || "#e8a020";
    var minutes = options.minutes || 1;
    var nextDrill = outcome.nextDrill;

    return '<div style="padding:20px;max-width:500px;margin:0 auto;text-align:center">' +
      '<div style="font-size:3rem;margin-bottom:12px">' + escapeHtml(outcome.emoji) + '</div>' +
      '<div style="font-family:Cinzel,serif;color:var(--text);font-size:1.2rem;font-weight:700;margin-bottom:8px">' + escapeHtml(outcome.message) + '</div>' +
      '<div style="font-size:0.8rem;color:var(--dim);margin-bottom:8px">' + escapeHtml(drill.title) + ' · ' + escapeHtml(minutes) + ' min · ' + escapeHtml(bpm) + ' BPM</div>' +
      '<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px;margin:16px 0;font-size:0.85rem;color:var(--text)">' + outcome.nextAction + '</div>' +
      '<div style="display:flex;gap:8px;justify-content:center">' +
        (nextDrill ? '<button onclick="startDrillPractice(\'' + escapeHtml(nextDrill.id) + '\')" style="background:' + candleColor + ';color:#0d0b08;border:none;padding:12px 24px;border-radius:8px;font-family:DM Sans,sans-serif;font-size:0.85rem;font-weight:600;cursor:pointer">Keep Practising</button>' : '') +
        '<button class="back-btn" onclick="showPractice()">← Dashboard</button>' +
      '</div>' +
    '</div>';
  }

  return {
    version: "0.1.0",
    renderFinishResult: renderFinishResult,
    renderAssessmentButtons: renderAssessmentButtons,
    renderMetronome: renderMetronome,
    renderPracticeSession: renderPracticeSession
  };
});
