/* global document, localStorage */
(function initPracticeEntryController(root) {
  "use strict";

  var selectedMode = "planned";
  var lastSnapshot = null;
  var selectedReviewId = "";
  var freeDraft = { minutes: 20, focus: "Clean" };

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
    var plannedSession = root.PracticePlannedSession && typeof root.PracticePlannedSession.current === "function"
      ? root.PracticePlannedSession.current()
      : null;
    var plannedStep = plannedSession && root.HearthPracticePlannedSessionViewer
      ? root.HearthPracticePlannedSessionViewer.steps[plannedSession.stepIndex]
      : null;
    var studySnapshot = root.StudyKeyChamberModel && typeof root.StudyKeyChamberModel.snapshot === "function"
      ? root.StudyKeyChamberModel.snapshot({ storage: localStorage })
      : null;
    return root.HearthPracticeEntryModel.buildSnapshot({
      journeyState: journeyState(),
      companions: root.JOURNEY_STUDENT_COMPANIONS,
      events: progressEvents(),
      candleState: candleState(),
      plannedSession: plannedSession,
      studySnapshot: studySnapshot,
      doingProgressBridge: root.HearthDoingProgressBridge,
      plannedStepTitle: plannedStep && plannedStep.title
    });
  }

  function entryUiState() {
    return {
      freeDraft: freeDraft,
      selectedReviewId: selectedReviewId
    };
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
      context.setAttribute("data-practice-context-mode", mode);
      context.innerHTML = root.HearthPracticeEntryViewer.renderContext(lastSnapshot, mode, entryUiState());
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
      if (lastSnapshot && lastSnapshot.activeSession.kind === "guided" && root.PracticePlannedSession && typeof root.PracticePlannedSession.resume === "function") {
        root.PracticePlannedSession.resume();
      } else {
        openCandle({ preserve: true });
      }
      return;
    }
    if (action === "start-free") {
      openCandle({
        durationMinutes: freeDraft.minutes,
        focus: freeDraft.focus,
        learnerId: lastSnapshot && lastSnapshot.learner.id || null,
        returnAction: "showPractice",
        returnLabel: "Practice room"
      });
      return;
    }
    if (action === "start-planned" && lastSnapshot) {
      if (root.PracticePlannedSession && typeof root.PracticePlannedSession.open === "function") {
        root.PracticePlannedSession.open(lastSnapshot);
        return;
      }
      openCandle({
        durationMinutes: lastSnapshot.commitment.targetMinutes,
        focus: lastSnapshot.commitment.today
      });
    }
  }

  function bindContextActions(rootEl) {
    var scope = rootEl || document;
    scope.querySelectorAll("[data-practice-action]").forEach(function bindAction(button) {
      button.addEventListener("click", function onActionClick() {
        handleAction(button.getAttribute("data-practice-action"));
      });
    });
    scope.querySelectorAll("[data-practice-free-minutes]").forEach(function bindFreeMinutes(button) {
      button.addEventListener("click", function chooseFreeMinutes() {
        playClick();
        freeDraft.minutes = Number(button.getAttribute("data-practice-free-minutes")) || freeDraft.minutes;
        setSelectedMode("free");
      });
    });
    scope.querySelectorAll("[data-practice-free-focus]").forEach(function bindFreeFocus(button) {
      button.addEventListener("click", function chooseFreeFocus() {
        playClick();
        freeDraft.focus = button.getAttribute("data-practice-free-focus") || freeDraft.focus;
        setSelectedMode("free");
      });
    });
    scope.querySelectorAll("[data-practice-review-id]").forEach(function bindReview(button) {
      button.addEventListener("click", function chooseReview() {
        playClick();
        selectedReviewId = button.getAttribute("data-practice-review-id") || selectedReviewId;
        setSelectedMode("review");
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
    selectedReviewId = lastSnapshot.history[0] && lastSnapshot.history[0].id || "";
    if (root.HearthPracticeState && typeof root.HearthPracticeState.preferences === "function") {
      var preferences = root.HearthPracticeState.preferences(root.HearthPracticeState.readState(localStorage));
      freeDraft.minutes = Number(preferences.time) || freeDraft.minutes;
      freeDraft.focus = preferences.focus && preferences.focus !== "All" ? preferences.focus : freeDraft.focus;
    }
    target.innerHTML = root.HearthPracticeEntryViewer.render(lastSnapshot, selectedMode, entryUiState());
    bindEntry(target);
  }

  root.HearthPracticeEntryController = {
    version: "1.1.0",
    showPractice: showPractice,
    selectMode: setSelectedMode
  };
  root.showPractice = showPractice;

  root.addEventListener("hearth:journey-state", function refreshPracticeForLearner() {
    if (document.querySelector(".practice-entry-shell")) showPractice();
  });
})(window);
