/* global document, localStorage */
(function initPracticePlannedSessionController(root) {
  "use strict";

  var session = null;
  var recording = false;

  function panel() {
    document.querySelectorAll(".pnl").forEach(function hidePanel(item) {
      item.classList.remove("on");
    });
    var target = document.getElementById("p-foundation");
    if (target) target.classList.add("on");
    return target;
  }

  function playClick() {
    if (typeof root.playSfx === "function") root.playSfx("click");
  }

  function clampNumber(value, fallback, min, max) {
    var number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(min, Math.min(max, number));
  }

  function writeField(name, value) {
    if (!session || !name) return;
    if (["minutes", "bpm", "repetitions", "cleanTakeGoal"].indexOf(name) >= 0) {
      var limits = {
        minutes: [1, 90],
        bpm: [30, 220],
        repetitions: [1, 50],
        cleanTakeGoal: [1, 10]
      }[name];
      session[name] = clampNumber(value, session[name], limits[0], limits[1]);
      return;
    }
    session[name] = value;
  }

  function snapshotSession() {
    return session ? JSON.parse(JSON.stringify(session)) : null;
  }

  function bind(target) {
    target.querySelectorAll("[data-practice-flow-action]").forEach(function bindAction(button) {
      button.addEventListener("click", function onActionClick() {
        handleAction(button.getAttribute("data-practice-flow-action"));
      });
    });
    target.querySelectorAll("[data-practice-flow-step]").forEach(function bindStep(button) {
      button.addEventListener("click", function onStepClick() {
        if (!session) return;
        session.stepIndex = clampNumber(button.getAttribute("data-practice-flow-step"), session.stepIndex, 0, root.HearthPracticePlannedSessionViewer.steps.length - 1);
        render();
      });
    });
    target.querySelectorAll("[data-practice-flow-focus]").forEach(function bindFocus(button) {
      button.addEventListener("click", function onFocusClick() {
        if (!session) return;
        session.focus = button.getAttribute("data-practice-flow-focus") || session.focus;
        render();
      });
    });
    target.querySelectorAll("[data-practice-body-state]").forEach(function bindBodyState(button) {
      button.addEventListener("click", function onBodyStateClick() {
        if (!session) return;
        session.bodyState = button.getAttribute("data-practice-body-state") || session.bodyState;
        render();
      });
    });
    target.querySelectorAll("[data-practice-flow-field]").forEach(function bindField(field) {
      field.addEventListener("input", function onFieldInput() {
        writeField(field.getAttribute("data-practice-flow-field"), field.value);
      });
      field.addEventListener("change", function onFieldChange() {
        writeField(field.getAttribute("data-practice-flow-field"), field.value);
      });
    });
  }

  function render() {
    var target = panel();
    if (!target || !root.HearthPracticePlannedSessionViewer || !session) return;
    target.innerHTML = root.HearthPracticePlannedSessionViewer.render(session);
    bind(target);
  }

  function saveReflection() {
    if (!session) return;
    session.saved = true;
    if (root.HearthProgressEvents && typeof root.HearthProgressEvents.append === "function") {
      root.HearthProgressEvents.append({
        event_type: "practice_session_completed",
        node_id: "practise",
        duration_minutes: session.minutes,
        note: session.reflectionReturn || session.reflectionHard || session.focus,
        data: {
          source: "planned-practice-flow",
          focus: session.focus,
          bpm: session.bpm,
          repetitions: session.repetitions,
          clean_take_goal: session.cleanTakeGoal,
          body_state: session.bodyState,
          body_check: session.bodyCheck,
          drill_note: session.drillNote,
          recording_note: session.recordingNote,
          improved: session.reflectionImproved,
          hard: session.reflectionHard,
          repeat_next: session.reflectionReturn
        }
      }, localStorage);
    }
  }

  function handleAction(action) {
    playClick();
    if (!session) return;
    if (action === "entry") {
      if (root.HearthPracticeEntryController && typeof root.HearthPracticeEntryController.showPractice === "function") {
        root.HearthPracticeEntryController.showPractice();
      }
      return;
    }
    if (action === "prev") {
      session.stepIndex = Math.max(0, session.stepIndex - 1);
      render();
      return;
    }
    if (action === "next") {
      session.stepIndex = Math.min(root.HearthPracticePlannedSessionViewer.steps.length - 1, session.stepIndex + 1);
      render();
      return;
    }
    if (action === "open-do") {
      if (typeof root.showDoing === "function") root.showDoing();
      return;
    }
    if (action === "open-candle" && root.PracticeCandle && typeof root.PracticeCandle.open === "function") {
      root.PracticeCandle.open({
        durationMinutes: session.minutes,
        focus: session.focus,
        returnAction: "PracticePlannedSession.resume",
        returnLabel: "Guided session"
      });
      return;
    }
    if (action === "toggle-record" && root.HearthRecorderController) {
      recording = root.HearthRecorderController.toggleRecording(recording, document);
      return;
    }
    if (action === "save") {
      saveReflection();
      render();
    }
  }

  function open(snapshot, options) {
    if (!root.HearthPracticePlannedSessionViewer) return;
    session = root.HearthPracticePlannedSessionViewer.createSession(snapshot, options);
    render();
  }

  root.PracticePlannedSession = {
    version: "0.1.0",
    current: snapshotSession,
    open: open,
    resume: render,
    saveReflection: saveReflection
  };
})(window);
