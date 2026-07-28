/*
 * Knowing study quiz controller adapter v0.
 *
 * Handles Study Session quiz answer interactions.
 */
(function initKnowingStudyQuizController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthKnowingStudyQuizController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createKnowingStudyQuizController(root) {
  "use strict";

  function scoreResult(score, questionCount) {
    score = score || { correct: 0, total: 0 };
    var pct = questionCount ? Math.round(score.correct / questionCount * 100) : 0;
    return {
      passed: pct >= 75,
      pct: pct,
      text: "Score: " + score.correct + "/" + questionCount + " (" + pct + "%)"
    };
  }

  function renderResult(result, score, questionCount) {
    var summary = scoreResult(score, questionCount);
    result.style.display = "block";
    result.style.background = summary.passed ? "#2ecc7110" : "#e74c3c10";
    result.style.border = "1px solid " + (summary.passed ? "#2ecc7140" : "#e74c3c40");
    result.style.color = summary.passed ? "#2ecc71" : "#e74c3c";
    result.innerHTML = (summary.passed ? "\u2713 " : "\u2717 ") + summary.text +
      (summary.passed ? " - Well understood!" : " - Review the sections above and try again");
  }

  function answerQuiz(qIdx, optIdx, options) {
    options = options || {};
    var doc = options.document || root.document;
    var questions = options.questions || root._currentQuiz;
    if (!doc || !questions || !questions[qIdx]) return;

    var question = questions[qIdx];
    var isCorrect = optIdx === question.correct;
    var feedback = doc.getElementById("q" + qIdx + "-fb");
    if (!feedback) return;

    var questionEl = doc.getElementById("q" + qIdx);
    if (questionEl) {
      Array.prototype.forEach.call(questionEl.querySelectorAll("button"), function updateButton(btn, index) {
        btn.disabled = true;
        btn.style.cursor = "default";
        btn.onmouseover = null;
        btn.onmouseout = null;
        if (index === question.correct) btn.style.borderColor = "#2ecc71";
        else if (index === optIdx && !isCorrect) btn.style.borderColor = "#e74c3c";
      });
    }

    feedback.style.display = "block";
    feedback.style.color = isCorrect ? "#2ecc71" : "#e74c3c";
    feedback.innerHTML = (isCorrect ? "\u2713 Correct!" : "\u2717 Not quite - ") + question.explanation;

    if (!root._quizScore) root._quizScore = { correct: 0, total: 0 };
    root._quizScore.total++;
    if (isCorrect) root._quizScore.correct++;

    if (root._quizScore.total === questions.length) {
      var result = doc.getElementById("quiz-result");
      if (result) renderResult(result, root._quizScore, questions.length);
    }
  }

  function bindStudyQuizGlobals() {
    root._answerQuiz = answerQuiz;
  }

  bindStudyQuizGlobals();

  return {
    version: "0.1.0",
    answerQuiz: answerQuiz,
    bindStudyQuizGlobals: bindStudyQuizGlobals,
    renderResult: renderResult,
    scoreResult: scoreResult
  };
});
