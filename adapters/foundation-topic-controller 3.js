/*
 * Foundation topic controller adapter v0.
 *
 * Coordinates Foundation topic opening, lesson-engine launch, fallback topic
 * rendering, and completion progress without keeping that flow in simulator.html.
 */
(function initFoundationTopicController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthFoundationTopicController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createFoundationTopicController(root) {
  "use strict";

  function readProgress() {
    if (root.HearthFoundationProgressBridge) {
      return root.HearthFoundationProgressBridge.readProgress();
    }
    return {};
  }

  function renderFoundationTopicStep(topicId, stepIndex) {
    if (!root.HearthFoundationTopicViewer) {
      return null;
    }
    var foundation = root.FOUNDATION;
    var topic = foundation && foundation.topics.find(function findTopic(item) {
      return item.id === topicId;
    });
    var step = topic && topic.steps && topic.steps[stepIndex || 0];
    if (root.HearthFoundationProgressBridge) {
      root.HearthFoundationProgressBridge.recordTopicStep(topicId, step && step.label);
    }
    return root.HearthFoundationTopicViewer.renderFoundationTopicStep({
      foundation: foundation,
      targetEl: root.document.getElementById("p-foundation"),
      topicId: topicId,
      stepIndex: stepIndex || 0,
      completed: readProgress()
    });
  }

  async function showFoundationTopic(topicId) {
    if (typeof root.playSfx === "function") {
      root.playSfx("drill-click");
    }

    var foundation = root.FOUNDATION;
    if (!foundation) {
      return null;
    }

    var topic = foundation.topics.find(function findTopic(t) {
      return t.id === topicId;
    });
    if (!topic) {
      return null;
    }

    if (root.HearthFoundationProgressBridge) {
      root.HearthFoundationProgressBridge.recordTopicOpened(topicId);
    }

    if (typeof root.setNotebookContext === "function") {
      root.setNotebookContext("f-" + topicId, topic.title);
    }

    var targetEl = root.document.getElementById("p-foundation");
    var lessonInfo = root.HearthFoundationLessonLauncher
      ? await root.HearthFoundationLessonLauncher.resolveFoundationLesson(topicId)
      : null;

    if (lessonInfo && lessonInfo.lesson && root.TeachingEngine) {
      Array.prototype.forEach.call(root.document.querySelectorAll(".pnl"), function hidePanel(panel) {
        panel.classList.remove("on");
      });
      targetEl.classList.add("on");

      var teachContainer = root.HearthFoundationLessonShell
        ? root.HearthFoundationLessonShell.renderFoundationLessonShell(targetEl, lessonInfo)
        : null;
      if (!teachContainer) {
        return null;
      }

      var engine = root._teachEngine = root.TeachingEngine(teachContainer, {
        onComplete: function onComplete(scores) {
          if (root.HearthFoundationProgressBridge) {
            root.HearthFoundationProgressBridge.markFoundationLessonCompleted(topicId, lessonInfo, {
              scores: scores || {}
            });
          }
          if (typeof root.showFoundation === "function") {
            root.showFoundation();
          }
        }
      });
      engine.start(lessonInfo.lesson);
      return {
        mode: "lesson",
        topic_id: topicId,
        lesson_id: lessonInfo.lesson_id
      };
    }

    renderFoundationTopicStep(topicId, 0);
    root._fTopic = topicId;
    return {
      mode: "fallback_topic",
      topic_id: topicId
    };
  }

  function completeFoundationTopic(topicId) {
    if (root.HearthFoundationProgressBridge) {
      root.HearthFoundationProgressBridge.markFoundationTopicCompleted(topicId);
    }

    var foundation = root.FOUNDATION;
    if (!foundation) {
      return null;
    }

    var idx = foundation.topics.findIndex(function findTopic(t) {
      return t.id === topicId;
    });
    var next = foundation.topics[idx + 1];
    if (next) {
      return showFoundationTopic(next.id);
    }
    if (typeof root.showFoundation === "function") {
      root.showFoundation();
    }
    return {
      mode: "foundation_map",
      topic_id: topicId
    };
  }

  return {
    version: "0.1.0",
    completeFoundationTopic: completeFoundationTopic,
    readProgress: readProgress,
    renderFoundationTopicStep: renderFoundationTopicStep,
    showFoundationTopic: showFoundationTopic
  };
});
