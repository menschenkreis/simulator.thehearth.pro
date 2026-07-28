/*
 * Practice dashboard viewer adapter v0.
 *
 * Renders the legacy Practice Temple dashboard.
 */
(function initPracticeDashboardViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthPracticeDashboardViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPracticeDashboardViewer() {
  "use strict";

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderLastLine(lastSession) {
    if (!lastSession) {
      return '<div style="color:var(--dim);font-size:0.68rem;margin-top:6px">No session logged yet. Light a short candle first.</div>';
    }
    return '<div style="color:var(--dim);font-size:0.68rem;margin-top:6px">Last: ' +
      escapeHtml(lastSession.drillTitle || "Practice") + ' · ' +
      escapeHtml(String(lastSession.minutes || 1)) + ' min · ' +
      escapeHtml(lastSession.feeling || "logged") +
    '</div>';
  }

  function renderPlan(plan) {
    return '<div class="practice-plan">' + plan.map(function renderStep(step) {
      return '<div class="practice-bead"><b>' + escapeHtml(step[0]) + '</b><span>' + escapeHtml(step[1]) + '</span></div>';
    }).join('') + '</div>';
  }

  function renderCategoryChoices(categories, prefs) {
    return '<div class="practice-choice-row">' + categories.map(function renderCategory(cat) {
      return '<button class="practice-choice' + (prefs.focus === cat ? ' active' : '') + '" onclick="setPracticeFocus(\'' + escapeHtml(cat) + '\')">' + escapeHtml(cat) + '</button>';
    }).join('') + '</div>';
  }

  function renderDrillList(drills) {
    return '<div class="practice-drill-list">' + drills.map(function renderDrill(drill) {
      return '<button class="practice-drill-pick" onclick="showPracticeDrill(\'' + escapeHtml(drill.id) + '\')">' +
        '<span><b>' + escapeHtml(drill.title) + '</b><br><span>' + escapeHtml(drill.category) + ' · ' + escapeHtml(drill.duration) + '</span></span>' +
        '<span>Start</span>' +
      '</button>';
    }).join('') + '</div>';
  }

  function renderTimeChoices(timeChoices, prefs) {
    return '<div class="practice-choice-row">' + timeChoices.map(function renderTime(time) {
      return '<button class="practice-choice' + (prefs.time === time ? ' active' : '') + '" onclick="playSfx(\'click\');setPracticeTime(' + time + ')">' + time + ' min</button>';
    }).join('') + '</div>';
  }

  function renderPracticeDashboard(options) {
    options = options || {};
    var categories = options.categories || [];
    var completedCount = options.completedCount || 0;
    var guide = options.guide || "";
    var lastSession = options.lastSession;
    var nextDrill = options.nextDrill;
    var prefs = options.prefs || {};
    var stats = options.stats || {};
    var timeChoices = options.timeChoices || [];
    var visibleDrills = options.visibleDrills || [];
    var plan = [
      ["Arrive", "Body, guitar, breath"],
      ["Warm", "Hands wake up"],
      ["Work", nextDrill ? nextDrill.title : "Chosen drill"],
      ["Reflect", "Mark what changed"]
    ];

    return '<div class="practice-temple">' +
      '<div class="practice-title">' +
        '<h2>Practice Temple</h2>' +
        '<p>Choose a candle, open the book, then sit with one clear movement.</p>' +
      '</div>' +
      '<div class="practice-chamber">' +
        '<div class="practice-chamber-inner">' +
          '<div>' +
            '<div class="practice-altar">' +
              '<div class="practice-altar-table"></div>' +
              '<div class="practice-altar-items">' +
                '<div class="altar-item"><div class="temple-book"></div><div class="altar-label">Practice Book</div></div>' +
                '<div class="altar-item"><div class="temple-candle"><div class="temple-flame"></div></div><div class="altar-label">' + escapeHtml(prefs.time) + ' minute candle</div></div>' +
                '<div class="altar-item"><div class="temple-metronome"></div><div class="altar-label">Pulse Stone</div></div>' +
              '</div>' +
            '</div>' +
            '<div class="practice-panel" style="margin-top:14px"><div class="practice-panel-title">Ritual Steps</div>' + renderPlan(plan) + '</div>' +
            '<div class="practice-panel" style="margin-top:14px"><div class="practice-panel-title">Open Book</div>' + renderCategoryChoices(categories, prefs) + '</div>' +
            '<div class="practice-panel" style="margin-top:14px"><div class="practice-panel-title">Choose A Drill</div>' + renderDrillList(visibleDrills) + '</div>' +
          '</div>' +
          '<div class="practice-side">' +
            '<div class="practice-panel" style="text-align:center;padding:16px 12px">' +
              '<img src="images/character-full/Encouraging.png" style="width:100px;height:100px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));animation:char-float 3s ease-in-out infinite"/>' +
              '<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 12px;margin-top:8px;position:relative">' +
                '<div style="position:absolute;left:50%;top:-6px;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid var(--border)"></div>' +
                '<div class="practice-guide-note" style="font-size:0.72rem;color:var(--text);line-height:1.4">' + escapeHtml(guide) + '</div>' +
              '</div>' +
              renderLastLine(lastSession) +
            '</div>' +
            '<div class="practice-panel"><div class="practice-panel-title">Candle Length</div>' + renderTimeChoices(timeChoices, prefs) + '</div>' +
            '<div class="practice-panel"><div class="practice-panel-title">Scroll</div>' +
              '<div class="practice-scroll-grid">' +
                '<div class="practice-stat"><strong>' + escapeHtml(stats.streak || 0) + '</strong><span>streak</span></div>' +
                '<div class="practice-stat"><strong>' + escapeHtml(stats.totalMinutes || 0) + '</strong><span>minutes</span></div>' +
                '<div class="practice-stat"><strong>' + escapeHtml(completedCount) + '</strong><span>mastered</span></div>' +
                '<div class="practice-stat"><strong>' + escapeHtml(stats.totalSessions || 0) + '</strong><span>sessions</span></div>' +
              '</div>' +
            '</div>' +
            '<div class="practice-panel">' +
              '<div class="practice-panel-title">Next Offering</div>' +
              '<div style="font-size:0.82rem;color:var(--text);font-weight:700">' + escapeHtml(nextDrill ? nextDrill.title : "Choose a drill") + '</div>' +
              '<div style="font-size:0.66rem;color:var(--dim);margin-top:5px">' + escapeHtml(nextDrill ? nextDrill.category + " · " + nextDrill.duration : "Open the book first") + '</div>' +
            '</div>' +
            '<button class="practice-start" onclick="playSfx(\'book-open\');startTemplePractice()">Light Candle</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  return {
    version: "0.1.0",
    escapeHtml: escapeHtml,
    renderPracticeDashboard: renderPracticeDashboard
  };
});
