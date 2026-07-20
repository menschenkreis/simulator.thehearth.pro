/* global document, localStorage */
(function initPracticeEntryController(root) {
  "use strict";

  var selectedMode = "planned";
  var lastSnapshot = null;
  var selectedReviewId = "";
  var freeDraft = { minutes: 20, focus: "Clean" };
  var activeHandoff = null;

  function handoffStore() {
    if (!root.HearthCrossNodeHandoffStore || typeof root.HearthCrossNodeHandoffStore.createStore !== "function") return null;
    return root.HearthCrossNodeHandoffStore.createStore({ storage: root.sessionStorage });
  }

  function readPracticeHandoff() {
    var store = handoffStore();
    if (!store) return null;
    var learnerId = activeHandoff && activeHandoff.learner_id;
    return store.current({ learnerId: learnerId || undefined, destinationNodeId: "practice" });
  }

  function returnToSource() {
    var handoff = activeHandoff || readPracticeHandoff();
    var route = handoff && handoff.return_route;
    var store = handoffStore();
    if (store && handoff) store.clear(handoff.id);
    activeHandoff = null;
    if (route && route.node_id === "journey" && root.Journey) {
      var practicePanel = document.getElementById("p-foundation");
      if (practicePanel) practicePanel.innerHTML = "";
      var params = route.params || {};
      if (typeof root.Journey.openCompanionLesson === "function") root.Journey.openCompanionLesson(params.learner_id);
      if (typeof root.Journey.focusCompanionStep === "function" && Number.isFinite(Number(params.step_index))) {
        root.Journey.focusCompanionStep(Number(params.step_index));
      }
      return;
    }
    if (typeof root.backToMap === "function") root.backToMap();
  }

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
    var result = root.HearthPracticeEntryModel.buildSnapshot({
      journeyState: journeyState(),
      companions: root.JOURNEY_STUDENT_COMPANIONS,
      events: progressEvents(),
      candleState: candleState(),
      plannedSession: plannedSession,
      studySnapshot: studySnapshot,
      songThread: root.HearthLevelOneSongThread || null,
      doingProgressBridge: root.HearthDoingProgressBridge,
      plannedStepTitle: plannedStep && plannedStep.title
    });
    var handoffActivityId = activeHandoff && activeHandoff.activity_id;
    var songPlan = result.songThread;
    if (songPlan && handoffActivityId === songPlan.practicePlanId) {
      result.commitment.title = songPlan.planTitle;
      result.commitment.targetMinutes = songPlan.minutes;
      result.commitment.currentDay = Math.min(songPlan.completedDays + 1, songPlan.targetDays);
      result.commitment.totalDays = songPlan.targetDays;
      result.commitment.today = songPlan.nextSession && songPlan.nextSession.focus || result.commitment.today;
      result.commitment.tomorrow = songPlan.nextSession && songPlan.nextSession.finish || result.commitment.tomorrow;
      result.guideText = "Use one calm return to " + songPlan.title + ". The plan remembers separate practice days, not repeated clicks.";
    }
    var handoffParameters = activeHandoff && activeHandoff.task && activeHandoff.task.parameters || {};
    var reviewPracticeItems = Array.isArray(handoffParameters.practice_items)
      ? handoffParameters.practice_items.filter(Boolean)
      : [];
    if (reviewPracticeItems.length) {
      result.lessonReviewPlan = true;
      result.commitment.title = "Practice from the latest lesson review";
      result.commitment.targetMinutes = Number(handoffParameters.duration_minutes) || result.commitment.targetMinutes;
      result.commitment.today = activeHandoff.task.instruction || reviewPracticeItems[0];
      result.recommendations = reviewPracticeItems.slice();
      result.guideText = handoffParameters.review_id
        ? "This plan comes from the latest saved lesson review. Repeat what the lesson actually asked for."
        : "This is the current Journey practice sheet. Keep the contact calm and specific.";
    }
    return result;
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
      if (activeHandoff || readPracticeHandoff()) returnToSource();
      else if (typeof root.backToMap === "function") root.backToMap();
    });
    bindContextActions(target);
  }

  function showPractice() {
    activeHandoff = readPracticeHandoff();
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
    var back = target.querySelector("[data-practice-back]");
    if (back && activeHandoff) back.textContent = "\u2190 Return to Journey";
    bindEntry(target);
  }

  function openWithHandoff(handoff) {
    activeHandoff = handoff || readPracticeHandoff();
    selectedMode = "planned";
    showPractice();
  }

  root.HearthPracticeEntryController = {
    version: "1.1.0",
    showPractice: showPractice,
    selectMode: setSelectedMode,
    openWithHandoff: openWithHandoff,
    returnToSource: returnToSource
  };
  root.showPractice = showPractice;

  root.addEventListener("hearth:journey-state", function refreshPracticeForLearner() {
    if (document.querySelector(".practice-entry-shell")) showPractice();
  });
})(window);
