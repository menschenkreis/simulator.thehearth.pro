/*
 * Browser progress store adapter v0.
 *
 * Connects the pure learner-progress core to browser localStorage. This is a
 * replaceable edge adapter; backend storage can later implement the same shape.
 */
(function initBrowserProgressStore(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthBrowserProgressStore = factory(root.HearthLearnerProgress);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createBrowserProgressStoreModule(progressCore) {
  "use strict";

  var DEFAULT_STORAGE_KEY = "hearth.cleanProgress.v1";

  function requireProgressCore(core) {
    if (!core || typeof core.createProgressRecord !== "function") {
      throw new Error("HearthLearnerProgress is required before browser-progress-store.js");
    }
    return core;
  }

  function createBrowserProgressStore(options) {
    options = options || {};

    var core = requireProgressCore(options.progressCore || progressCore);
    var storage = options.storage || (typeof localStorage !== "undefined" ? localStorage : null);
    var storageKey = options.storage_key || DEFAULT_STORAGE_KEY;
    var defaultRecordOptions = {
      simulator_id: options.simulator_id,
      learner_id: options.learner_id
    };

    function emptyRecord(extraOptions) {
      extraOptions = extraOptions || {};
      return core.createProgressRecord({
        simulator_id: extraOptions.simulator_id || defaultRecordOptions.simulator_id,
        learner_id: extraOptions.learner_id || defaultRecordOptions.learner_id,
        now: extraOptions.now
      });
    }

    function load() {
      if (!storage) {
        return emptyRecord();
      }

      var raw = storage.getItem(storageKey);
      if (!raw) {
        return emptyRecord();
      }

      try {
        return core.normalizeProgressRecord(JSON.parse(raw), defaultRecordOptions);
      } catch (error) {
        return emptyRecord();
      }
    }

    function save(record) {
      var normalized = core.normalizeProgressRecord(record, defaultRecordOptions);
      if (storage) {
        storage.setItem(storageKey, JSON.stringify(normalized));
      }
      return normalized;
    }

    function update(updater) {
      var current = load();
      var next = updater(current);
      return save(next);
    }

    function reset(optionsForReset) {
      var next = emptyRecord(optionsForReset);
      if (storage) {
        storage.setItem(storageKey, JSON.stringify(next));
      }
      return next;
    }

    function clear() {
      if (storage) {
        storage.removeItem(storageKey);
      }
      return emptyRecord();
    }

    return {
      storage_key: storageKey,
      load: load,
      save: save,
      update: update,
      reset: reset,
      clear: clear,
      markLessonStarted: function markLessonStarted(lessonId, actionOptions) {
        return update(function mark(record) {
          return core.markLessonStarted(record, lessonId, actionOptions);
        });
      },
      updateLessonStep: function updateLessonStep(lessonId, stepIndex, actionOptions) {
        return update(function mark(record) {
          return core.updateLessonStep(record, lessonId, stepIndex, actionOptions);
        });
      },
      recordLessonAnswer: function recordLessonAnswer(lessonId, concept, correct, actionOptions) {
        return update(function record(record) {
          return core.recordLessonAnswer(record, lessonId, concept, correct, actionOptions);
        });
      },
      markLessonCompleted: function markLessonCompleted(lessonId, actionOptions) {
        return update(function complete(record) {
          return core.markLessonCompleted(record, lessonId, actionOptions);
        });
      }
    };
  }

  return {
    version: "0.1.0",
    DEFAULT_STORAGE_KEY: DEFAULT_STORAGE_KEY,
    createBrowserProgressStore: createBrowserProgressStore
  };
});
