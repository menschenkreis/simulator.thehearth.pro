/*
 * Knowing study session viewer adapter v0.
 *
 * Renders the legacy guided Study Session screen.
 */
(function initKnowingStudySessionViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthKnowingStudySessionViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createKnowingStudySessionViewer(root) {
  "use strict";

  function extractTerms(topic) {
    if (root.HearthKnowingStudyQuestionModel) {
      return root.HearthKnowingStudyQuestionModel.extractTerms(topic).filter(function isShort(term) {
        return term.length < 40;
      });
    }
    return [];
  }

  function renderContext(session) {
    var prevTopic = session.prevTopic;
    var nextTopic = session.nextTopic;
    if (!prevTopic && !nextTopic) return "";
    return '<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px;margin-bottom:16px">' +
      '<div style="font-family:JetBrains Mono;font-size:0.6rem;color:' + session.color + ';letter-spacing:0.12em;margin-bottom:8px">WHERE THIS FITS</div>' +
      '<div style="display:flex;gap:12px;align-items:center;font-size:0.75rem">' +
        (prevTopic ? '<div style="flex:1;opacity:0.5"><div style="font-size:0.6rem;color:var(--dim)">Before</div><div style="color:var(--text)">' + prevTopic.title + '</div></div>' : '') +
        '<div style="flex:1;padding:8px;border:2px solid ' + session.color + ';border-radius:6px;text-align:center"><div style="font-size:0.6rem;color:' + session.color + '">Now</div><div style="color:var(--text);font-weight:600">' + session.topic.title + '</div></div>' +
        (nextTopic ? '<div style="flex:1;opacity:0.5"><div style="font-size:0.6rem;color:var(--dim)">Next</div><div style="color:var(--text)">' + nextTopic.title + '</div></div>' : '') +
      '</div>' +
      '<div style="font-size:0.7rem;color:var(--dim);margin-top:8px;font-style:italic">' + session.cat.description + '</div>' +
    '</div>';
  }

  function renderTerms(topic, color) {
    var terms = extractTerms(topic);
    if (!terms.length) return "";
    return '<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px;margin-bottom:16px">' +
      '<div style="font-family:JetBrains Mono;font-size:0.6rem;color:' + color + ';letter-spacing:0.12em;margin-bottom:8px">KEY TERMS</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:6px">' +
      terms.map(function renderTerm(term) {
        return '<span style="background:' + color + '18;border:1px solid ' + color + '30;color:' + color + ';padding:4px 10px;border-radius:4px;font-size:0.72rem;font-weight:600">' + term + '</span>';
      }).join('') +
      '</div></div>';
  }

  function renderVideo(topic) {
    return '<div style="background:var(--card);border:1px dashed var(--border);border-radius:8px;padding:20px;margin-bottom:16px;text-align:center">' +
      '<div style="font-size:1.5rem;margin-bottom:6px">\uD83C\uDFAC</div>' +
      '<div style="font-size:0.75rem;color:var(--dim)">Video lesson coming soon</div>' +
      '<div style="font-size:0.65rem;color:var(--dim);margin-top:4px">Source: ' + topic.source + '</div>' +
    '</div>';
  }

  function renderQuiz(questions, color) {
    questions = questions || [];
    if (!questions.length) return "";
    return '<div style="background:var(--card);border:1px solid ' + color + '40;border-radius:8px;padding:16px;margin-bottom:16px">' +
      '<div style="font-family:JetBrains Mono;font-size:0.6rem;color:' + color + ';letter-spacing:0.12em;margin-bottom:12px">DEEPEN YOUR UNDERSTANDING</div>' +
      '<div id="quiz-area">' +
      questions.map(function renderQuestion(question, index) {
        return '<div id="q' + index + '" style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--border)">' +
          '<div style="font-size:0.8rem;color:var(--text);font-weight:600;margin-bottom:8px">' + (index + 1) + '. ' + question.question + '</div>' +
          '<div style="display:flex;flex-direction:column;gap:6px">' +
          question.options.map(function renderOption(option, optionIndex) {
            return '<button onclick="_answerQuiz(' + index + ',' + optionIndex + ')" style="text-align:left;padding:8px 12px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;cursor:pointer;font-family:DM Sans,sans-serif;font-size:0.75rem;transition:all 0.15s" onmouseover="this.style.borderColor=\'' + color + '\'" onmouseout="this.style.borderColor=\'var(--border)\'">' + option + '</button>';
          }).join('') +
          '</div>' +
          '<div id="q' + index + '-fb" style="margin-top:6px;font-size:0.72rem;display:none"></div>' +
        '</div>';
      }).join('') +
      '</div>' +
      '<div id="quiz-result" style="display:none;margin-top:12px;padding:12px;border-radius:6px;text-align:center"></div>' +
    '</div>';
  }

  function renderAssessment(catId, topicId, color) {
    return '<div style="font-family:JetBrains Mono;font-size:0.6rem;color:' + color + ';letter-spacing:0.12em;text-align:center;margin-bottom:10px">HOW WELL DO YOU UNDERSTAND THIS?</div>' +
      '<div style="display:flex;gap:8px;margin-bottom:20px">' +
        '<button onclick="_studyAssess(\'' + catId + '\',\'' + topicId + '\',\'nailed\')" style="flex:1;background:#2ecc7118;border:2px solid #2ecc7140;color:#2ecc71;padding:14px 8px;border-radius:8px;cursor:pointer;font-family:DM Sans,sans-serif;text-align:center">' +
          '<div style="font-size:1.3rem">\uD83D\uDCD6</div>' +
          '<div style="font-size:0.75rem;font-weight:700">Got It</div>' +
          '<div style="font-size:0.6rem;color:var(--dim)">Move to next concept</div>' +
        '</button>' +
        '<button onclick="_studyAssess(\'' + catId + '\',\'' + topicId + '\',\'review\')" style="flex:1;background:' + color + '12;border:2px solid ' + color + '30;color:' + color + ';padding:14px 8px;border-radius:8px;cursor:pointer;font-family:DM Sans,sans-serif;text-align:center">' +
          '<div style="font-size:1.3rem">\uD83D\uDD04</div>' +
          '<div style="font-size:0.75rem;font-weight:700">Need Review</div>' +
          '<div style="font-size:0.6rem;color:var(--dim)">Go back and re-read</div>' +
        '</button>' +
        '<button onclick="_studyAssess(\'' + catId + '\',\'' + topicId + '\',\'stuck\')" style="flex:1;background:#e74c3c10;border:2px solid #e74c3c30;color:#e74c3c;padding:14px 8px;border-radius:8px;cursor:pointer;font-family:DM Sans,sans-serif;text-align:center">' +
          '<div style="font-size:1.3rem">\u2753</div>' +
          '<div style="font-size:0.75rem;font-weight:700">Missing Something</div>' +
          '<div style="font-size:0.6rem;color:var(--dim)">Check for misunderstood words</div>' +
        '</button>' +
      '</div>';
  }

  function renderStudySession(options) {
    options = options || {};
    var session = options.session;
    var questions = options.questions || [];
    if (!session || !session.cat || !session.topic) return "";
    var cat = session.cat;
    var topic = session.topic;
    var color = session.color;

    return '<div style="padding:20px;max-width:700px;margin:0 auto">' +
      '<button class="back-btn" onclick="showStudy()">← Back to Study Lab</button>' +
      '<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:20px;margin-bottom:16px">' +
        '<div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap">' +
          '<span style="border:1px solid ' + color + '30;color:' + color + ';padding:3px 8px;border-radius:4px;font-size:0.65rem;font-family:JetBrains Mono">' + cat.title.toUpperCase() + '</span>' +
          '<span style="border:1px solid ' + color + '30;color:' + color + ';padding:3px 8px;border-radius:4px;font-size:0.65rem;font-family:JetBrains Mono">' + session.difficultyLabel + '</span>' +
          (session.isDone ? '<span style="border:1px solid #2ecc7130;color:#2ecc71;padding:3px 8px;border-radius:4px;font-size:0.65rem;font-family:JetBrains Mono">\u2713 UNDERSTOOD</span>' : '') +
        '</div>' +
        '<h2 style="font-family:Cinzel,serif;color:var(--text);font-size:1.2rem;margin:0 0 6px 0;font-weight:700">' + topic.title + '</h2>' +
        '<div style="font-size:0.7rem;color:var(--dim)">' + topic.source + '</div>' +
      '</div>' +
      renderContext(session) +
      renderTerms(topic, color) +
      '<div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:20px;line-height:1.7;font-size:0.85rem;color:var(--text);margin-bottom:16px">' + topic.body + '</div>' +
      renderVideo(topic) +
      renderQuiz(questions, color) +
      renderAssessment(cat.id, topic.id, color) +
    '</div>';
  }

  function renderResultButton(session, button) {
    button = button || {};
    if (button.target === "study") {
      return '<button class="back-btn" onclick="showStudy()">' + button.label + '</button>';
    }
    var color = button.tone === "stuck" ? "#e74c3c" : session.color;
    return '<button onclick="showStudySession(\'' + session.cat.id + '\',\'' + button.targetTopicId + '\')" style="background:' + color + ';color:white;border:none;padding:12px 24px;border-radius:8px;font-family:DM Sans,sans-serif;font-size:0.85rem;font-weight:600;cursor:pointer">' + button.label + '</button>';
  }

  function renderAssessmentResult(options) {
    options = options || {};
    var session = options.session;
    var outcome = options.outcome;
    if (!session || !outcome) return "";
    return '<div style="padding:20px;max-width:500px;margin:0 auto;text-align:center">' +
      '<div style="font-size:3rem;margin-bottom:12px">' + outcome.emoji + '</div>' +
      '<div style="font-family:Cinzel,serif;color:var(--text);font-size:1.2rem;font-weight:700;margin-bottom:8px">' + outcome.message + '</div>' +
      '<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px;margin:16px 0;font-size:0.85rem;color:var(--text)">' + outcome.actionText + '</div>' +
      '<div style="display:flex;gap:8px;justify-content:center">' +
        renderResultButton(session, outcome.button) +
        '<button class="back-btn" onclick="showStudy()">← Study Lab</button>' +
      '</div>' +
    '</div>';
  }

  return {
    version: "0.1.0",
    renderAssessment: renderAssessment,
    renderAssessmentResult: renderAssessmentResult,
    renderContext: renderContext,
    renderQuiz: renderQuiz,
    renderResultButton: renderResultButton,
    renderStudySession: renderStudySession,
    renderTerms: renderTerms,
    renderVideo: renderVideo
  };
});
