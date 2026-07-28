/* global document, localStorage */
(function initPracticePlannedSessionController(root) {
  "use strict";

  var session = null;
  var recording = false;

  function activeLearnerId() {
    try {
      var state = typeof root.getJourneyState === "function"
        ? root.getJourneyState()
        : JSON.parse(localStorage.getItem("hearth-journey-v2") || "null");
      return state && state.activeStudentId || null;
    } catch (_error) {
      return null;
    }
  }

  function plannedStore() {
    return root.HearthPracticePlannedSessionStore && typeof root.HearthPracticePlannedSessionStore.createStore === "function"
      ? root.HearthPracticePlannedSessionStore.createStore({ storage: localStorage })
      : null;
  }

  function restoreSession() {
    var store = plannedStore();
    var saved = store && store.get(activeLearnerId());
    return saved && saved.id ? saved : null;
  }

  function persistSession() {
    var store = plannedStore();
    if (!store) return;
    if (session) store.save(session);
    else store.clear(activeLearnerId());
  }

  session = restoreSession();

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
      persistSession();
      return;
    }
    session[name] = value;
    persistSession();
  }

  function snapshotSession() {
    var learnerId = activeLearnerId();
    if (session && session.learner && String(session.learner.id || "") !== String(learnerId || "")) {
      session = restoreSession();
    }
    return session ? JSON.parse(JSON.stringify(session)) : null;
  }

  function localDay(value) {
    var date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
  }

  function songPracticeDayCount(sourceId, learnerId, now) {
    var events = root.HearthProgressEvents && typeof root.HearthProgressEvents.list === "function"
      ? root.HearthProgressEvents.list(localStorage)
      : [];
    var days = [];
    events.forEach(function collectSongPracticeDay(event) {
      var data = event && event.data || {};
      if (!event || event.event_type !== "practice_session_completed" || String(event.learner_id || "") !== String(learnerId || "")) return;
      if (event.source_id !== sourceId && data.thread_id !== sourceId) return;
      var day = localDay(event.created_at);
      if (day && days.indexOf(day) === -1) days.push(day);
    });
    var today = localDay(now);
    if (today && days.indexOf(today) === -1) days.push(today);
    return days.length;
  }

  function openDoingDrill() {
    var thread = session && session.songThread;
    var spec = thread && thread.drillHandoff;
    if (!spec || !root.HearthCrossNodeHandoffStore || typeof root.HearthCrossNodeHandoffStore.createStore !== "function") {
      if (typeof root.showDoing === "function") root.showDoing();
      return;
    }
    var learnerId = session.learner && session.learner.id || null;
    var suffix = Date.now().toString(36);
    var store = root.HearthCrossNodeHandoffStore.createStore({ storage: root.sessionStorage });
    var handoff = {
      id: "handoff-practice-doing-" + learnerId + "-" + suffix,
      version: 1,
      learner_id: learnerId,
      actor_role: "learner",
      source_node_id: "practice",
      destination_node_id: "doing",
      activity_id: spec.drillId,
      lesson_id: null,
      journey_level_id: "L1",
      capability_ids: ["L1-TIME-01", "L1-TIME-02", "L1-HARM-02", "L1-MAP-02", "L1-READ-01"],
      attempt_id: null,
      session_id: session.id,
      task: {
        id: spec.drillId,
        instruction: session.focus,
        parameters: { room_id: spec.roomId, category_id: spec.categoryId, drill_id: spec.drillId, bpm: [60, 76, 100] }
      },
      pass_condition: {
        description: "Complete all eight bars, try both roles, and name one thing to repeat.",
        minimum_evidence_stage: "demonstration",
        criteria: { drill_id: spec.drillId, clean_passes: 1 }
      },
      easier_step: {
        instruction: "Hold muted quarter notes while the lead plays one A root on beat 1.",
        parameters: { drill_id: spec.drillId, bpm: 60 }
      },
      return_route: { node_id: "practice", view_id: "planned-session", params: { session_id: session.id } },
      fallback_instruction: "Return to the guided Practice session and reopen the Song Lab.",
      created_at: new Date().toISOString()
    };
    if (!store.set(handoff)) return;
    if (typeof root.showDoing === "function") root.showDoing();
    if (typeof root._setDoingRoomConcept === "function") root._setDoingRoomConcept(spec.roomId);
    if (typeof root._openDoingRoomDrill === "function") root._openDoingRoomDrill(spec.categoryId, spec.drillId);
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
        persistSession();
        render();
      });
    });
    target.querySelectorAll("[data-practice-flow-focus]").forEach(function bindFocus(button) {
      button.addEventListener("click", function onFocusClick() {
        if (!session) return;
        session.focus = button.getAttribute("data-practice-flow-focus") || session.focus;
        persistSession();
        render();
      });
    });
    target.querySelectorAll("[data-practice-body-state]").forEach(function bindBodyState(button) {
      button.addEventListener("click", function onBodyStateClick() {
        if (!session) return;
        session.bodyState = button.getAttribute("data-practice-body-state") || session.bodyState;
        persistSession();
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
    if (root.HearthRecorderController && typeof root.HearthRecorderController.sync === "function") {
      root.HearthRecorderController.sync(target);
    }
  }

  function saveReflection() {
    if (!session || session.saved) return;
    session.saved = true;
    persistSession();
    if (root.HearthProgressEvents && typeof root.HearthProgressEvents.append === "function") {
      var sourceContext = session.sourceContext || {};
      var now = new Date().toISOString();
      var practiceDays = sourceContext.sourceId
        ? songPracticeDayCount(sourceContext.sourceId, session.learner && session.learner.id, now)
        : 0;
      var evidenceStage = practiceDays >= 3 ? "demonstration" : "attempt";
      root.HearthProgressEvents.append({
        learner_id: session.learner && session.learner.id || null,
        event_type: "practice_session_completed",
        node_id: "practice",
        journey_level_id: sourceContext.journeyLevelId || null,
        source_id: sourceContext.sourceId || null,
        activity_id: sourceContext.practicePlanId || null,
        duration_minutes: session.minutes,
        note: session.reflectionReturn || session.reflectionHard || session.focus,
        created_at: now,
        data: {
          source: "planned-practice-flow",
          thread_id: sourceContext.sourceId || null,
          practice_plan_id: sourceContext.practicePlanId || null,
          practice_days: practiceDays,
          capability_ids: sourceContext.sourceId ? ["L1-PREP-01", "L1-PRACTICE-01"] : [],
          evidence_stage: evidenceStage,
          focus: session.focus,
          bpm: session.bpm,
          repetitions: session.repetitions,
          clean_take_goal: session.cleanTakeGoal,
          body_state: session.bodyState,
          body_check: session.bodyCheck,
          drill_note: session.drillNote,
          recording_captured: Boolean(session.recordingCaptured),
          recording_note: session.recordingNote,
          improved: session.reflectionImproved,
          hard: session.reflectionHard,
          repeat_next: session.reflectionReturn
        }
      }, localStorage);
    }
    if (root.dispatchEvent && root.CustomEvent) {
      root.dispatchEvent(new root.CustomEvent("hearth:practice-completed", {
        detail: snapshotSession()
      }));
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
      persistSession();
      render();
      return;
    }
    if (action === "next") {
      session.stepIndex = Math.min(root.HearthPracticePlannedSessionViewer.steps.length - 1, session.stepIndex + 1);
      persistSession();
      render();
      return;
    }
    if (action === "open-do") {
      openDoingDrill();
      return;
    }
    if (action === "open-candle" && root.PracticeCandle && typeof root.PracticeCandle.open === "function") {
      root.PracticeCandle.open({
        durationMinutes: session.minutes,
        focus: session.focus,
        learnerId: session.learner && session.learner.id || null,
        returnAction: "PracticePlannedSession.resume",
        returnLabel: "Guided session"
      });
      return;
    }
    if (action === "toggle-record" && root.HearthRecorderController) {
      if (typeof root.HearthRecorderController.toggleCapture === "function") {
        root.HearthRecorderController.toggleCapture(document).then(function updateRecordingState(state) {
          recording = Boolean(state && state.recording);
          session.recordingCaptured = Boolean(state && state.hasRecording);
          persistSession();
        });
      } else {
        recording = root.HearthRecorderController.toggleRecording(recording, document);
      }
      return;
    }
    if (action === "clear-recording" && root.HearthRecorderController) {
      if (typeof root.HearthRecorderController.clearCapture === "function") {
        root.HearthRecorderController.clearCapture(document);
      }
      recording = false;
      session.recordingCaptured = false;
      persistSession();
      return;
    }
    if (action === "save") {
      saveReflection();
      render();
    }
  }

  function open(snapshot, options) {
    if (!root.HearthPracticePlannedSessionViewer) return;
    if (root.HearthRecorderController && typeof root.HearthRecorderController.clearCapture === "function") {
      root.HearthRecorderController.clearCapture(document);
    }
    recording = false;
    session = root.HearthPracticePlannedSessionViewer.createSession(snapshot, options);
    persistSession();
    render();
  }

  root.PracticePlannedSession = {
    version: "0.3.0",
    current: snapshotSession,
    open: open,
    resume: render,
    saveReflection: saveReflection
  };

  root.addEventListener("hearth:journey-state", function switchPracticeLearner() {
    session = restoreSession();
  });
})(window);
