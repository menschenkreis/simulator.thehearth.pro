/*
 * Knowing study dashboard viewer adapter v0.
 *
 * Renders the legacy Study Lab dashboard.
 */
(function initKnowingStudyDashboardViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthKnowingStudyDashboardViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createKnowingStudyDashboardViewer() {
  "use strict";

  function renderProgress(summary) {
    summary = summary || {};
    return '<div style="margin-bottom:20px">' +
      '<div style="display:flex;justify-content:space-between;font-size:0.65rem;color:var(--dim);margin-bottom:6px"><span>' + summary.doneTopics + '/' + summary.totalTopics + ' concepts understood</span><span>' + summary.percent + '%</span></div>' +
      '<div style="height:4px;background:var(--border);border-radius:2px;overflow:hidden"><div style="height:100%;width:' + summary.percent + '%;background:linear-gradient(to right,#5B3A6B,#8a6aaa);border-radius:2px;transition:width 0.4s"></div></div>' +
      '<div style="display:flex;justify-content:space-between;font-size:0.6rem;color:var(--dim);margin-top:6px"><span>\uD83D\uDCC4 ' + summary.quizPassed + ' quizzes passed</span><span>\uD83D\uDCCF ' + summary.disciplineCount + ' disciplines</span></div>' +
    '</div>';
  }

  function renderNextUp(studyState) {
    studyState = studyState || {};
    var currentCat = studyState.currentCat;
    var currentTopic = studyState.currentTopic;
    var prevTopic = studyState.previousTopic;
    if (!currentCat || !currentTopic) return "";

    return '<div style="background:var(--card);border:1px solid #5B3A6B40;border-radius:8px;padding:16px;margin-bottom:20px">' +
      '<div style="font-family:JetBrains Mono;font-size:0.6rem;color:#8a6aaa;letter-spacing:0.12em;margin-bottom:8px">WHAT\'S NEXT</div>' +
      (prevTopic ? '<div style="font-size:0.7rem;color:var(--dim);margin-bottom:6px">From last time: <span style="color:var(--text)">' + prevTopic.title + '</span></div>' : '') +
      '<div style="color:var(--text);font-size:0.95rem;font-weight:700;font-family:Cinzel,serif;margin-bottom:2px">' + currentTopic.title + '</div>' +
      '<div style="font-size:0.7rem;color:var(--dim)">' + currentCat.title + ' \u00B7 ' + currentTopic.source + '</div>' +
      '<button onclick="showStudySession(\'' + currentCat.id + '\',\'' + currentTopic.id + '\')" style="margin-top:10px;background:#5B3A6B;color:white;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-family:DM Sans,sans-serif;font-size:0.8rem;font-weight:600">Begin Study Session</button>' +
    '</div>';
  }

  function renderTopicChip(cat, topic, completed) {
    var done = completed[topic.id];
    return '<div onclick="showStudySession(\'' + cat.id + '\',\'' + topic.id + '\')" style="cursor:pointer;padding:6px 10px;border:1px solid ' + (done ? '#8a6aaa40' : 'var(--border)') + ';border-radius:4px;background:' + (done ? '#8a6aaa08' : 'var(--card)') + ';font-size:0.7rem;color:' + (done ? '#8a6aaa' : 'var(--text)') + ';transition:all 0.15s" onmouseover="this.style.borderColor=\'#8a6aaa\'" onmouseout="this.style.borderColor=\'' + (done ? '#8a6aaa40' : 'var(--border)') + '\'">' + topic.title + '</div>';
  }

  function renderDisciplineList(knowing, completed) {
    completed = completed || {};
    var html = '<div style="font-family:JetBrains Mono;font-size:0.6rem;color:#8a6aaa;letter-spacing:0.12em;margin-bottom:10px">ALL DISCIPLINES</div>';
    ((knowing && knowing.categories) || []).forEach(function renderCategory(cat) {
      var topics = cat.topics || [];
      var catDone = topics.filter(function isCompleted(topic) {
        return completed[topic.id];
      }).length;
      html += '<div style="margin-bottom:8px">' +
        '<div style="font-size:0.7rem;color:var(--dim);margin-bottom:2px;font-weight:600">' + cat.title + ' <span style="color:#8a6aaa">' + catDone + '/' + topics.length + '</span></div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:4px">' +
        topics.map(function renderTopic(topic) {
          return renderTopicChip(cat, topic, completed);
        }).join('') +
        '</div></div>';
    });
    return html;
  }

  function renderStudyDashboard(options) {
    options = options || {};
    var knowing = options.knowing;
    var completed = options.completed || {};
    var studyState = options.studyState || {};
    return '<div style="padding:20px;max-width:650px;margin:0 auto">' +
      '<button class="back-btn" onclick="backToMap()">← Map</button>' +
      '<div style="text-align:center;margin-bottom:24px">' +
        '<div style="font-size:2rem;margin-bottom:6px">\uD83D\uDCC4</div>' +
        '<div style="font-family:Cinzel,serif;color:#8a6aaa;font-size:1.3rem;font-weight:700">Study Lab</div>' +
        '<div style="font-size:0.7rem;color:var(--dim);margin-top:4px;font-style:italic">Guided study sessions. Context. Terms. Deep questions. Understanding.</div>' +
      '</div>' +
      renderProgress(studyState.summary) +
      renderNextUp(studyState) +
      renderDisciplineList(knowing, completed) +
    '</div>';
  }

  return {
    version: "0.1.0",
    renderDisciplineList: renderDisciplineList,
    renderNextUp: renderNextUp,
    renderProgress: renderProgress,
    renderStudyDashboard: renderStudyDashboard,
    renderTopicChip: renderTopicChip
  };
});
