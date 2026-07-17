/* global document, localStorage */
(function initPracticeEntryController(root) {
  "use strict";

  var selectedMode = "planned";
  var lastSnapshot = null;

  function panel() {
    document.querySelectorAll(".pnl").forEach(function hidePanel(item) {
      item.classList.remove("on");
    });
    var target = document.getElementById("p-foundation");
    if (target) target.classList.add("on");
    return target;
  }

  function journeyState() {
    if (typeof root.getJourneyState === "function") return root.getJourneyState();
    try {
      return JSON.parse(localStorage.getItem("hearth-journey-v2") || "null");
    } catch (error) {
      return null;
    }
  }

  function progressEvents() {
    if (root.HearthProgressEvents && typeof root.HearthProgressEvents.list === "function") {
      return root.HearthProgressEvents.list(localStorage);
    }
    return [];
  }

  function candleState() {
    return root.PracticeCandle && typeof root.PracticeCandle.state === "function"
      ? root.PracticeCandle.state()
      : {};
  }

  function snapshot() {
    return root.HearthPracticeEntryModel.buildSnapshot({
      journeyState: journeyState(),
      companions: root.JOURNEY_STUDENT_COMPANIONS,
      events: progressEvents(),
      candleState: candleState()
    });
  }

  function playClick() {
    if (typeof root.playSfx === "function") root.playSfx("click");
  }

  function setSelectedMode(mode) {
    if (["continue", "planned", "free", "review"].indexOf(mode) < 0) return;
    selectedMode = mode;
    document.querySelectorAll(".practice-entry-hotspot").forEach(function updateHotspot(button) {
      var selected = button.getAttribute("data-practice-mode") === mode;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });
    var context = document.getElementById("practice-entry-context");
    if (context && lastSnapshot) {
      context.innerHTML = root.HearthPracticeEntryViewer.renderContext(lastSnapshot, mode);
      bindContextActions(context);
    }
  }

  function openCandle(options) {
    if (!root.PracticeCandle) return;
    if (typeof root.PracticeCandle.open === "function") {
      root.PracticeCandle.open(options || {});
      return;
    }
    if (typeof root.PracticeCandle.render === "function") root.PracticeCandle.render();
  }

  function handleAction(action) {
    playClick();
    if (action === "select-planned") {
      setSelectedMode("planned");
      return;
    }
    if (action === "continue-session") {
      openCandle({ preserve: true });
      return;
    }
    if (action === "start-free") {
      openCandle({ durationMinutes: 20, focus: "Free practice" });
      return;
    }
    if (action === "start-planned" && lastSnapshot) {
      openCandle({
        durationMinutes: lastSnapshot.commitment.targetMinutes,
        focus: lastSnapshot.commitment.today
      });
    }
  }

  function bindContextActions(rootEl) {
    (rootEl || document).querySelectorAll("[data-practice-action]").forEach(function bindAction(button) {
      button.addEventListener("click", function onActionClick() {
        handleAction(button.getAttribute("data-practice-action"));
      });
    });
  }

  function bindEntry(target) {
    target.querySelectorAll("[data-practice-mode]").forEach(function bindMode(button) {
      button.addEventListener("click", function onModeClick() {
        playClick();
        setSelectedMode(button.getAttribute("data-practice-mode"));
      });
    });
    var back = target.querySelector("[data-practice-back]");
    if (back) back.addEventListener("click", function onBackClick() {
      if (typeof root.backToMap === "function") root.backToMap();
    });
    bindContextActions(target);
  }

  function showPractice() {
    var target = panel();
    if (!target || !root.HearthPracticeEntryModel || !root.HearthPracticeEntryViewer) return;
    lastSnapshot = snapshot();
    selectedMode = lastSnapshot.activeSession.running ? "continue" : "planned";
    target.innerHTML = root.HearthPracticeEntryViewer.render(lastSnapshot, selectedMode);
    bindEntry(target);
  }

  root.HearthPracticeEntryController = {
    version: "1.0.0",
    showPractice: showPractice,
    selectMode: setSelectedMode
  };
  root.showPractice = showPractice;

  root.addEventListener("hearth:journey-state", function refreshPracticeForLearner() {
    if (document.querySelector(".practice-entry-shell")) showPractice();
  });
})(window);
