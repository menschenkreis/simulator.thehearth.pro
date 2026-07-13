/* global window, document, localStorage */
(function(root) {
  "use strict";

  root.startFoundationLesson = function startFoundationLesson(topicId) {
    if (root.HearthFoundationPanelController) {
      return root.HearthFoundationPanelController.startFoundationLesson(topicId);
    }
    return undefined;
  };

  root.startLesson1 = function startLesson1() {
    if (root.HearthFoundationPanelController) {
      return root.HearthFoundationPanelController.startLesson1();
    }
    return undefined;
  };

  root.showFoundation = function showFoundation() {
    if (root.HearthFoundationPanelController) {
      return root.HearthFoundationPanelController.showFoundation();
    }
    return undefined;
  };

  root.showFoundationTopic = function showFoundationTopic(topicId) {
    if (root.HearthFoundationTopicController) {
      return root.HearthFoundationTopicController.showFoundationTopic(topicId);
    }
    return undefined;
  };

  root.renderFoundationTopicStep = function renderFoundationTopicStep(topicId, stepIndex) {
    if (root.HearthFoundationTopicController) {
      return root.HearthFoundationTopicController.renderFoundationTopicStep(topicId, stepIndex);
    }
    return undefined;
  };

  root.completeFoundationTopic = function completeFoundationTopic(topicId) {
    if (root.HearthFoundationTopicController) {
      return root.HearthFoundationTopicController.completeFoundationTopic(topicId);
    }
    return undefined;
  };

  root.showDoing = function showDoing() {
    if (root.HearthDoingPanelController) {
      return root.HearthDoingPanelController.showDoing();
    }
    return undefined;
  };

  root.showDoingBubble = function showDoingBubble(zoneEl) {
    if (root.HearthDoingMapViewer) {
      return root.HearthDoingMapViewer.showDoingBubble(zoneEl);
    }
    return undefined;
  };

  root.hideDoingBubble = function hideDoingBubble() {
    if (root.HearthDoingMapViewer) {
      return root.HearthDoingMapViewer.hideDoingBubble();
    }
    return undefined;
  };

  root.enterDoingZone = function enterDoingZone(zoneId) {
    if (root._enterDoingZone) {
      return root._enterDoingZone(zoneId);
    }
    return undefined;
  };

  root.toggleDoingDebug = function toggleDoingDebug() {
    if (root._toggleDoingDebug) {
      return root._toggleDoingDebug();
    }
    return undefined;
  };

  root.showKnowing = function showKnowing() {
    if (root.HearthKnowingPanelController) {
      return root.HearthKnowingPanelController.showKnowing();
    }
    return undefined;
  };

  if (root.HearthKnowingPanelController) {
    root.HearthKnowingPanelController.bindKnowingGlobals({
      documentRef: document,
      storage: localStorage,
      playSfx: typeof root.playSfx === "function" ? root.playSfx : function noop() {}
    });
  }
})(window);
