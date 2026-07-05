/*
 * Knowing study question model adapter v0.
 *
 * Builds study-session questions from Knowing topic content.
 */
(function initKnowingStudyQuestionModel(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthKnowingStudyQuestionModel = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createKnowingStudyQuestionModel() {
  "use strict";

  function extractTerms(topic) {
    var body = (topic && topic.body) || "";
    var matches = body.match(/<strong>([^<]+)<\/strong>/g) || [];
    return matches.map(function stripStrong(match) {
      return match.replace(/<\/?strong>/g, "");
    });
  }

  function shuffleOptions(options) {
    for (var index = options.length - 1; index > 0; index--) {
      var swapIndex = Math.floor(Math.random() * (index + 1));
      var temp = options[index];
      options[index] = options[swapIndex];
      options[swapIndex] = temp;
    }
    return options;
  }

  function generateQuestions(topic) {
    topic = topic || {};
    var questions = [];
    var termNames = extractTerms(topic);

    if (termNames.length >= 2) {
      var term = termNames[0];
      var others = termNames.slice(1, 4);
      var wrongs = ["A different concept entirely", "Only used in classical music", "An advanced technique not covered yet"];
      var options = shuffleOptions([term].concat(others.slice(0, 2), wrongs[0]).slice(0, 4));
      questions.push({
        question: 'Which of these best relates to: "' + term + '"?',
        options: options,
        correct: options.indexOf(term),
        explanation: "The answer is " + term + " - check the section above for details."
      });
    }

    questions.push({
      question: "Why does " + topic.title.toLowerCase() + " matter for playing guitar?",
      options: ["It builds understanding that lets you make musical choices consciously", "It's only required for exams", "It doesn't really matter - just play by ear", "It only matters for reading sheet music"],
      correct: 0,
      explanation: "Understanding theory gives you the freedom to choose instead of guess."
    });

    questions.push({
      question: "How would you explain " + topic.title.toLowerCase() + " to someone who's never played?",
      options: ["Using an everyday analogy - like relating rhythm to a heartbeat", "Show them a technical diagram first", "Tell them to just feel it", "Start with the most advanced definition"],
      correct: 0,
      explanation: "If you can explain it simply with an analogy, you truly understand it - the Feynman technique."
    });

    questions.push({
      question: "What happens if you skip understanding " + topic.title.toLowerCase() + "?",
      options: ["Later concepts won't make full sense - gaps create a chain of confusion", "Nothing - you can always come back later", "You'll play better because you're not overthinking", "It only matters for professional players"],
      correct: 0,
      explanation: 'This is the "misunderstood word" barrier. One gap creates a chain reaction. Better to get it now.'
    });

    return questions;
  }

  return {
    version: "0.1.0",
    extractTerms: extractTerms,
    generateQuestions: generateQuestions,
    shuffleOptions: shuffleOptions
  };
});
