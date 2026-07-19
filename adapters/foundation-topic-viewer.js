/*
 * Foundation topic viewer adapter v0.
 *
 * Renders the legacy Foundation topic tab view used when no TeachingEngine
 * lesson is available. This keeps fallback rendering outside simulator.html.
 */
(function initFoundationTopicViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthFoundationTopicViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createFoundationTopicViewer(root) {
  "use strict";

  function utils() {
    return root.HearthFoundationUiUtils || {
      escapeHtml: function fallbackEscape(value) {
        return String(value || "").replace(/[&<>"']/g, function replaceChar(ch) {
          return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          }[ch];
        });
      },
      colorForIndex: function fallbackColor(index) {
        return [
          "#e74c3c",
          "#e67e22",
          "#f1c40f",
          "#2ecc71",
          "#3498db",
          "#42d6c5",
          "#9b59b6",
          "#d76aa8",
          "#d4af69",
          "#ffb347"
        ][index % 10];
      }
    };
  }

  var FALLBACK_GUIDE_ASSETS = {
    neutral: "images/character-generated/guide-neutral-v1-ui.webp",
    encouraging: "images/character-generated/guide-encouraging-v1-ui.webp",
    thinking: "images/character-generated/guide-thinking-v1-ui.webp",
    celebratory: "images/character-generated/guide-celebratory-v1-ui.webp"
  };

  function guideAssetFor(mood) {
    var catalogue = root.GUIDE_CHARACTER_ASSETS;
    var asset = catalogue && catalogue.moods && catalogue.moods[mood];
    return asset && asset.src ? asset.src : FALLBACK_GUIDE_ASSETS[mood];
  }

  function renderFoundationTopicStep(options) {
    options = options || {};
    var foundation = options.foundation || root.FOUNDATION;
    var targetEl = options.targetEl;
    var topicId = options.topicId;
    var stepIndex = options.stepIndex || 0;

    if (!foundation || !targetEl) {
      return null;
    }

    var topic = foundation.topics.find(function findTopic(t) {
      return t.id === topicId;
    });
    if (!topic) {
      return null;
    }

    var ui = utils();
    var topicIdx = foundation.topics.indexOf(topic);
    var color = ui.colorForIndex(topicIdx);
    var completed = options.completed || {};
    var isCompleted = Boolean(completed[topicId]);
    var steps = topic.steps || [];
    var step = steps[stepIndex] || steps[0];
    var isLast = stepIndex === steps.length - 1;

    root._fTopic = topicId;
    root._fTopicStep = stepIndex;

    var tabs = steps.map(function renderTab(s, idx) {
      return '<button class="foundation-step-tab ' + (idx === stepIndex ? "is-on" : "") + '" onclick="renderFoundationTopicStep(\'' + topicId + '\',' + idx + ')" type="button">' +
        ui.escapeHtml(s.label || "Step " + (idx + 1)) +
        "</button>";
    }).join("");

    var nextTopic = foundation.topics.slice(topicIdx + 1).find(function findNext(t) {
      return t.status !== "coming-soon";
    });
    var action;
    if (isLast) {
      action = '<button type="button" style="background:' + color + ';color:#0d0b08;border:0" onclick="completeFoundationTopic(\'' + topicId + '\')">' +
        (isCompleted ? "Return to Path" : "Set This Fret") +
        "</button>";
      if (nextTopic) {
        action += '<button type="button" style="background:' + color + '18;color:' + color + ';border:1px solid ' + color + '55" onclick="completeFoundationTopic(\'' + topicId + '\',\'' + nextTopic.id + '\')">' +
          "Set & Continue" +
          "</button>";
      }
    } else {
      action = '<button type="button" style="background:' + color + '18;color:' + color + ';border:1px solid ' + color + '55" onclick="renderFoundationTopicStep(\'' + topicId + '\',' + (stepIndex + 1) + ')">' +
        "Next: " + ui.escapeHtml(steps[stepIndex + 1].label || "Continue") +
        "</button>";
    }

    var readButton = typeof root.ttsToggle === "function"
      ? '<button class="foundation-topic-read" id="ttsBtn" onclick="ttsToggle()" type="button">Read aloud</button>'
      : "";

    var stepLabel = (step.label || "").toLowerCase();
    var guideMood = "encouraging";
    var guideSpeech = "";
    if (stepLabel === "understand") {
      guideMood = "neutral";
      guideSpeech = "Let me explain this clearly.";
    } else if (stepLabel === "experience") {
      guideMood = "encouraging";
      guideSpeech = "Feel this in your hands. I'll guide you.";
    } else if (stepLabel === "apply") {
      guideMood = "thinking";
      guideSpeech = "Now try it yourself. Think through each step.";
    } else if (stepLabel === "own") {
      guideMood = "celebratory";
      guideSpeech = "You've got this. This fret is yours.";
    }
    var guideImg = guideAssetFor(guideMood);

    targetEl.innerHTML = '<div class="foundation-topic-page" style="--accent:' + color + '">' +
      '<div class="foundation-topic-wrap">' +
      '<div class="foundation-topic-top">' +
      '<div class="foundation-topic-back" onclick="showFoundation()">&#8592; Foundation Path</div>' +
      readButton +
      "</div>" +
      '<div class="foundation-topic-grid">' +
      '<aside class="foundation-topic-side">' +
      '<div class="foundation-topic-guide">' +
      '<img src="' + ui.escapeHtml(guideImg) + '" alt="Guide character"/>' +
      (guideSpeech ? '<div class="foundation-guide-bubble"><p>' + guideSpeech + "</p></div>" : "") +
      "</div>" +
      '<div class="foundation-topic-meta">' +
      "<span>" + ui.escapeHtml(topic.num) + " / " + ui.escapeHtml(foundation.tag) + (isCompleted ? " / COMPLETE" : "") + "</span>" +
      "<h2>" + ui.escapeHtml(topic.title) + "</h2>" +
      "<p>" + ui.escapeHtml(topic.subtitle || topic.micro || "") + "</p>" +
      "</div>" +
      "</aside>" +
      "<main>" +
      '<div class="foundation-step-tabs">' + tabs + "</div>" +
      '<article class="foundation-topic-card">' +
      "<h3>" + ui.escapeHtml(step.title || step.label) + "</h3>" +
      (step.body || "") +
      '<div class="foundation-topic-actions">' + action + "</div>" +
      "</article>" +
      "</main>" +
      "</div>" +
      "</div>" +
      "</div>";

    return {
      topic_id: topicId,
      step_index: stepIndex,
      is_completed: isCompleted
    };
  }

  return {
    version: "0.1.0",
    renderFoundationTopicStep: renderFoundationTopicStep
  };
});
