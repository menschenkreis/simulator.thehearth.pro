/*
 * Pure model for a Journey companion lesson review.
 *
 * This module shapes teacher observations into learner-scoped Journey memory.
 * It does not read storage, render UI, or award capability evidence.
 */
(function initJourneyLessonReview(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthJourneyLessonReview = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createJourneyLessonReview() {
  "use strict";

  var ANSWER_FIELDS = [
    "feltHome",
    "mostMusical",
    "enjoyed",
    "helped",
    "needs",
    "teacherPrep",
    "nextLesson"
  ];

  function clean(value) {
    return String(value == null ? "" : value).trim().replace(/\s+/g, " ");
  }

  function safeIdPart(value) {
    return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "learner";
  }

  function normalizeItems(items) {
    var seen = {};
    return (Array.isArray(items) ? items : []).map(clean).filter(function keep(item) {
      if (!item || seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }

  function answersFrom(input) {
    var source = input && input.answers ? input.answers : input || {};
    var answers = {};
    ANSWER_FIELDS.forEach(function copyAnswer(field) {
      answers[field] = clean(source[field]);
    });
    return answers;
  }

  function summarize(answers) {
    var parts = [];
    if (answers.feltHome) parts.push("HOME: " + answers.feltHome);
    if (answers.mostMusical) parts.push("MUSICAL: " + answers.mostMusical);
    if (answers.enjoyed) parts.push("ENJOYED: " + answers.enjoyed);
    if (answers.helped) parts.push("HELPED: " + answers.helped);
    if (answers.needs) parts.push("REPEAT: " + answers.needs);
    if (answers.teacherPrep) parts.push("TEACHER PREP: " + answers.teacherPrep);
    if (answers.nextLesson) parts.push("NEXT: " + answers.nextLesson);
    return parts.join(" | ");
  }

  function build(input) {
    input = input || {};
    var answers = answersFrom(input);
    var practiceItems = normalizeItems(input.practiceItems);
    var createdAt = clean(input.createdAt) || new Date().toISOString();
    var learnerId = clean(input.learnerId);
    var journeyLevelId = clean(input.journeyLevelId) || "L1";
    var observations = [answers.feltHome, answers.mostMusical, answers.enjoyed, answers.helped, answers.needs].filter(Boolean);
    var errors = [];

    if (!learnerId) errors.push("Choose the learner before saving the review.");
    if (!observations.length) errors.push("Add at least one honest observation from the lesson.");
    if (!answers.nextLesson) errors.push("Add the next safe lesson step.");
    if (!practiceItems.length) errors.push("Keep at least one item on the practice sheet.");

    var record = {
      kind: "companion_lesson_review",
      version: 1,
      id: clean(input.id) || "journey-review-" + safeIdPart(learnerId) + "-" + createdAt.replace(/[^0-9]/g, "").slice(0, 17),
      date: clean(input.date) || createdAt.slice(0, 10),
      createdAt: createdAt,
      learnerId: learnerId,
      journeyLevelId: journeyLevelId,
      lessonId: clean(input.lessonId) || journeyLevelId + "-companion",
      lessonFocus: clean(input.lessonFocus),
      answers: answers,
      practiceSheet: {
        title: clean(input.practiceTitle) || "Next practice",
        commitment: clean(input.commitment),
        durationMinutes: Number(input.durationMinutes) > 0 ? Number(input.durationMinutes) : null,
        items: practiceItems,
        nextAction: answers.nextLesson
      },
      text: summarize(answers)
    };

    return { valid: errors.length === 0, errors: errors, record: record };
  }

  function latest(notes) {
    var list = Array.isArray(notes) ? notes : [];
    for (var index = list.length - 1; index >= 0; index -= 1) {
      if (list[index] && list[index].kind === "companion_lesson_review" && list[index].answers) {
        return list[index];
      }
    }
    return null;
  }

  function answer(review, field) {
    if (!review) return "";
    if (review.answers) return clean(review.answers[field]);
    return clean(review[field]);
  }

  return {
    version: "1.0.0",
    answerFields: ANSWER_FIELDS.slice(),
    build: build,
    latest: latest,
    answer: answer
  };
});
