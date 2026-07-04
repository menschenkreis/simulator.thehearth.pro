/*
 * TeachingEngine core adapter v0.
 *
 * A DOM-free controller that connects lesson seeds, session rules, view models,
 * and optional progress storage. The old TeachingEngine can be migrated toward
 * this controller without pulling rendering details into core/.
 */
(function initTeachingEngineCoreAdapter(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthTeachingEngineCoreAdapter = factory(
      root.HearthLessonSession,
      root.HearthLessonViewModel,
      root.HearthLearnerProgress
    );
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createTeachingEngineCoreAdapterModule(
  sessionCore,
  viewModelCore,
  progressCore
) {
  "use strict";

  function requireCore(name, core, methodName) {
    if (!core || typeof core[methodName] !== "function") {
      throw new Error(name + " is required before teaching-engine-core-adapter.js");
    }
    return core;
  }

  function getLessonId(seed) {
    return seed && seed.lesson && seed.lesson.id ? seed.lesson.id : null;
  }

  function createTeachingLessonController(options) {
    options = options || {};

    var seed = options.seed;
    var sessions = requireCore("HearthLessonSession", options.sessionCore || sessionCore, "createLessonSession");
    var views = requireCore("HearthLessonViewModel", options.viewModelCore || viewModelCore, "buildLessonViewModel");
    var progress = options.progressCore || progressCore || null;
    var progressStore = options.progressStore || null;
    var lessonId = getLessonId(seed);
    var session = sessions.createLessonSession(seed, options.initialSession);

    function syncProgress(action, actionOptions) {
      if (!progressStore || !lessonId) {
        return null;
      }

      if (action === "started" && typeof progressStore.markLessonStarted === "function") {
        return progressStore.markLessonStarted(lessonId, actionOptions);
      }
      if (action === "step" && typeof progressStore.updateLessonStep === "function") {
        return progressStore.updateLessonStep(lessonId, session.step_index, actionOptions);
      }
      if (action === "completed" && typeof progressStore.markLessonCompleted === "function") {
        return progressStore.markLessonCompleted(lessonId, actionOptions);
      }

      return null;
    }

    function syncAnswer(result, actionOptions) {
      if (!progressStore || !lessonId || !result || !result.valid) {
        return null;
      }

      if (typeof progressStore.recordLessonAnswer === "function") {
        return progressStore.recordLessonAnswer(
          lessonId,
          result.concept,
          result.correct,
          actionOptions
        );
      }

      if (progress && typeof progress.recordLessonAnswer === "function") {
        return null;
      }

      return null;
    }

    function getState() {
      return {
        lesson_id: lessonId,
        session: sessions.createLessonSession(seed, session),
        view_model: views.buildLessonViewModel(seed, {
          current_step_index: session.step_index
        })
      };
    }

    function start(actionOptions) {
      syncProgress("started", actionOptions);
      return getState();
    }

    function goToStep(stepIndex, actionOptions) {
      session = sessions.moveToStep(seed, session, stepIndex);
      syncProgress("step", actionOptions);
      return getState();
    }

    function advance(actionOptions) {
      session = sessions.advanceLesson(seed, session);
      syncProgress(session.completed ? "completed" : "step", actionOptions);
      return getState();
    }

    function back(actionOptions) {
      session = sessions.goBack(seed, session);
      syncProgress("step", actionOptions);
      return getState();
    }

    function answerChoice(choiceIndex, actionOptions) {
      var evaluated = sessions.evaluateChoice(seed, session, choiceIndex);
      session = evaluated.state;
      syncAnswer(evaluated.result, actionOptions);

      return {
        state: getState(),
        result: evaluated.result
      };
    }

    function complete(actionOptions) {
      session = sessions.completeLesson(seed, session);
      syncProgress("completed", actionOptions);
      return getState();
    }

    return {
      lesson_id: lessonId,
      getState: getState,
      start: start,
      goToStep: goToStep,
      advance: advance,
      back: back,
      answerChoice: answerChoice,
      complete: complete
    };
  }

  return {
    version: "0.1.0",
    createTeachingLessonController: createTeachingLessonController
  };
});
