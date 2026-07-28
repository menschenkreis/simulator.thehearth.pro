/* global window */
(function(root) {
  "use strict";

  function withJourney(action) {
    if (root.Journey && typeof action === "function") {
      return action(root.Journey);
    }
    return undefined;
  }

  root.populateJourney = function populateJourney() {
    return withJourney(function(Journey) {
      return Journey.render();
    });
  };

  root.startJourneyLesson = function startJourneyLesson() {
    return withJourney(function(Journey) {
      return Journey.startLesson();
    });
  };

  root.openJourneyLevel = function openJourneyLevel(levelNum) {
    return withJourney(function(Journey) {
      return Journey.openLevel(levelNum);
    });
  };

  root.completeJourneyLesson = function completeJourneyLesson() {
    return withJourney(function(Journey) {
      return Journey.completeLesson();
    });
  };

  root.openLessonStep = function openLessonStep() {
    return withJourney(function(Journey) {
      return Journey.startLesson();
    });
  };

  root.assessLesson = function assessLesson() {
    return withJourney(function(Journey) {
      return Journey.saveLessonDraft();
    });
  };
})(window);
