/*
 * Knowing panel controller adapter v0.
 *
 * Opens and coordinates the legacy Knowing shelf, book, and topic screens.
 */
(function initKnowingPanelController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthKnowingPanelController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createKnowingPanelController(root) {
  "use strict";

  function panelEl(documentRef) {
    return documentRef && documentRef.getElementById("p-foundation");
  }

  function showPanel(documentRef) {
    if (!documentRef) return null;
    documentRef.querySelectorAll(".pnl").forEach(function hidePanel(panel) {
      panel.classList.remove("on");
    });
    var panel = panelEl(documentRef);
    if (panel) panel.classList.add("on");
    return panel;
  }

  function readProgress(storage) {
    if (root.HearthKnowingProgressController) {
      return root.HearthKnowingProgressController.readProgress(storage);
    }
    return JSON.parse((storage && storage.getItem("hearth-knowing-progress")) || "{}");
  }

  function readTopicStates(storage) {
    return root.HearthKnowingProgressController && typeof root.HearthKnowingProgressController.topicProjection === "function"
      ? root.HearthKnowingProgressController.topicProjection(storage)
      : {};
  }

  function renderKnowingShelf(viewMode) {
    var documentRef = root.document;
    var panel = showPanel(documentRef);
    var knowing = root.KNOWING;
    if (!panel || !knowing || !root.HearthKnowingLevelModel || !root.HearthKnowingShelfViewer) return;
    var completed = readProgress(root.localStorage);
    var levels = root.HearthKnowingLevelModel.buildLevels(knowing, completed);
    var recommendedLevel = root.HearthKnowingLevelModel.recommendedLevel(levels);
    panel.innerHTML = root.HearthKnowingShelfViewer.renderKnowingShelf({
      knowing: knowing,
      levels: levels,
      recommendedLevel: recommendedLevel,
      viewMode: viewMode || "doorway"
    });
  }

  function showKnowing() {
    renderKnowingShelf("doorway");
  }

  function showKnowingAll() {
    renderKnowingShelf("all");
  }

  function showKnowingBook(catId, levelFilter) {
    if (typeof root.openBook === "function") {
      var apiKnowing = root.KNOWING;
      var apiCat = apiKnowing && apiKnowing.categories.find(function findApiCategory(cat) {
        return cat.id === catId;
      });
      if (apiCat && typeof root.setNotebookContext === "function") root.setNotebookContext(catId, apiCat.title);
      root.openBook(catId, levelFilter);
      return;
    }

    var knowing = root.KNOWING;
    var documentRef = root.document;
    var panel = panelEl(documentRef);
    if (!knowing || !panel || !root.HearthKnowingBookViewer) return;
    var cat = knowing.categories.find(function findCategory(item) {
      return item.id === catId;
    });
    if (!cat) return;
    if (typeof root.setNotebookContext === "function") root.setNotebookContext(catId, cat.title);
    panel.innerHTML = root.HearthKnowingBookViewer.renderKnowingBook({
      knowing: knowing,
      cat: cat,
      completed: readProgress(root.localStorage)
    });
  }

  function showKnowingTopic(catId, topicId) {
    if (root.playSfx) root.playSfx("drill-click");
    var knowing = root.KNOWING;
    var documentRef = root.document;
    var panel = panelEl(documentRef);
    if (!knowing || !panel || !root.HearthKnowingTopicViewer) return;
    var cat = knowing.categories.find(function findCategory(item) {
      return item.id === catId;
    });
    if (!cat) return;
    var topic = cat.topics.find(function findTopic(item) {
      return item.id === topicId;
    });
    if (!topic) return;
    if (root.HearthKnowingProgressController && typeof root.HearthKnowingProgressController.recordStage === "function") {
      root.HearthKnowingProgressController.recordStage({
        stage: "opened",
        catId: catId,
        topicId: topicId,
        topicTitle: topic.title,
        storage: root.localStorage
      });
    }
    var topicStates = readTopicStates(root.localStorage);
    if (typeof root.setNotebookContext === "function") root.setNotebookContext(catId + "-" + topicId, topic.title);
    panel.innerHTML = root.HearthKnowingTopicViewer.renderKnowingTopic({
      knowing: knowing,
      cat: cat,
      topic: topic,
      completed: readProgress(root.localStorage),
      topicState: topicStates[topicId] || null
    });
  }

  function bindKnowingGlobals(options) {
    options = options || {};
    var documentRef = options.documentRef || root.document;
    root.showKnowingAll = showKnowingAll;
    root.showKnowingBook = showKnowingBook;
    root.showKnowingTopic = showKnowingTopic;
    if (root.HearthKnowingShelfController) {
      root.HearthKnowingShelfController.bindShelfGlobals({
        documentRef: documentRef
      });
    }
    if (root.HearthKnowingProgressController) {
      root.HearthKnowingProgressController.bindProgressGlobals({
        storage: options.storage || root.localStorage,
        playSfx: options.playSfx || root.playSfx,
        showTopic: showKnowingTopic
      });
    }
  }

  return {
    version: "0.1.0",
    bindKnowingGlobals: bindKnowingGlobals,
    readProgress: readProgress,
    showKnowing: showKnowing,
    showKnowingAll: showKnowingAll,
    showKnowingBook: showKnowingBook,
    showKnowingTopic: showKnowingTopic
  };
});
