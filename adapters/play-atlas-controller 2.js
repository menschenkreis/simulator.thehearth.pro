/* Owns live Play atlas navigation, learner session state, and progress events. */
(function initPlayAtlasController(root) {
  "use strict";

  var sessionPrefix = "hearth-play-session-v1:";
  var state = null;
  var snapshot = null;
  var activeHandoff = null;

  function handoffStore() {
    return root.HearthCrossNodeHandoffStore && typeof root.HearthCrossNodeHandoffStore.createStore === "function"
      ? root.HearthCrossNodeHandoffStore.createStore({ storage: root.sessionStorage })
      : null;
  }

  function panel() {
    root.document.querySelectorAll(".pnl").forEach(function hidePanel(item) {
      item.classList.remove("on");
    });
    var element = root.document.getElementById("p-foundation");
    if (element) element.classList.add("on");
    return element;
  }

  function listEvents() {
    if (root.HearthProgressEvents && typeof root.HearthProgressEvents.list === "function") {
      return root.HearthProgressEvents.list(root.localStorage);
    }
    return [];
  }

  function buildSnapshot(selectedId) {
    return root.HearthPlayAtlasModel.readRuntimeSnapshot(root.localStorage, {
      events: listEvents(),
      regions: root.WORLD_MAP_REGIONS || [],
      traditions: root.PLAY_TRADITIONS || {},
      selectedId: selectedId,
      songThread: root.HearthLevelOneSongThread || null,
      handoff: activeHandoff
    });
  }

  function defaultState() {
    return {
      selectedId: "mississippi",
      view: "destination",
      moment: 2,
      pulseRunning: false,
      home: "",
      role: "",
      reflection: "",
      finished: false,
      mode: "atlas",
      rolesTried: [],
      completedFullForm: false,
      lastResult: null
    };
  }

  function readSession(learnerId) {
    try {
      var saved = JSON.parse(root.localStorage.getItem(sessionPrefix + (learnerId || "default")) || "null");
      return saved && saved.selectedId ? Object.assign(defaultState(), saved) : defaultState();
    } catch (error) {
      return defaultState();
    }
  }

  function saveSession() {
    if (!snapshot || !snapshot.learner) return;
    root.localStorage.setItem(sessionPrefix + (snapshot.learner.id || "default"), JSON.stringify(state));
  }

  function render() {
    var element = panel();
    if (!element || !root.HearthPlayAtlasViewer || !root.HearthPlayAtlasModel) return;
    snapshot = buildSnapshot(state && state.selectedId);
    if (!state) state = readSession(snapshot.learner.id);
    snapshot = buildSnapshot(state.selectedId);
    element.innerHTML = root.HearthPlayAtlasViewer.render(snapshot, state);
    element.onclick = handleClick;
  }

  function open() {
    var initial = buildSnapshot("mississippi");
    var store = handoffStore();
    activeHandoff = store ? store.current({ learnerId: initial.learner.id, destinationNodeId: "play" }) : null;
    state = readSession(initial.learner.id);
    if (activeHandoff) {
      state = defaultState();
      state.mode = "song";
      state.view = "song";
      state.moment = 1;
    } else if (state.mode === "song") {
      state = defaultState();
    }
    render();
  }

  function openWithHandoff(handoff) {
    activeHandoff = handoff || null;
    state = defaultState();
    state.mode = activeHandoff ? "song" : "atlas";
    state.view = activeHandoff ? "song" : "destination";
    state.moment = activeHandoff ? 1 : 2;
    render();
  }

  function setView(view, moment) {
    state.view = view;
    state.moment = moment;
    state.pulseRunning = view === "pulse" ? state.pulseRunning : false;
    saveSession();
    render();
  }

  function choose(target, key) {
    state[key] = target.dataset.value || "";
    state.finished = false;
    saveSession();
    render();
  }

  function reflectionText(value) {
    return {
      voice: "The guitar felt like a voice instead of only a scale.",
      space: "The space became part of the musical phrase.",
      ground: "The pulse held the story without crowding it."
    }[value] || "The musical conversation became clearer.";
  }

  function saveResult() {
    if (state.finished || !state.reflection || !snapshot) return;
    var isSong = snapshot.route.type === "song";
    var timestamp = new Date().toISOString();
    var result = {
      id: "play-event-" + snapshot.learner.id + "-" + Date.now(),
      learner_id: snapshot.learner.id,
      route_id: snapshot.route.id,
      destination_id: isSong ? null : snapshot.selectedRegion.id,
      activity_id: isSong && activeHandoff ? activeHandoff.activity_id : "a-minor-musical-conversation",
      journey_level_id: isSong && activeHandoff ? activeHandoff.journey_level_id : "L1",
      lesson_id: isSong && activeHandoff ? activeHandoff.lesson_id : null,
      duration_minutes: isSong ? 12 : 10,
      role: state.role,
      tempo: 60,
      stayed_with_pulse: true,
      found_home: isSong ? true : Boolean(state.home),
      reflection: reflectionText(state.reflection),
      repeat_focus: isSong ? "Repeat the weaker role in A Minor Homecoming, then complete the eight bars again." : "Return to A after each short phrase, then leave space for an answer.",
      revisit: true,
      capability_ids: isSong && activeHandoff
        ? (activeHandoff.capability_ids || []).slice()
        : ["L1-EAR-01", "L1-PLAY-01", "L1-ROLE-01", "L1-STYLE-01"],
      evidence_stage: isSong ? "application" : "attempt",
      evidence_source: "self_report",
      attempt_id: "play-attempt-" + snapshot.learner.id + "-" + Date.now(),
      session_id: isSong && activeHandoff ? activeHandoff.session_id : "play-session-" + snapshot.learner.id,
      handoff_id: isSong && activeHandoff ? activeHandoff.id : null,
      return_route: isSong && activeHandoff ? activeHandoff.return_route : {
        node_id: "play",
        view_id: "remember",
        params: { destination_id: snapshot.selectedRegion.id }
      },
      fallback_instruction: isSong && activeHandoff
        ? activeHandoff.fallback_instruction
        : "No recording is required. Use the visual pulse at 60 BPM, leave space, and return to A.",
      roles_tried: state.rolesTried.slice(),
      song_id: isSong && snapshot.songThread ? snapshot.songThread.id : null,
      completed_full_form: isSong ? state.completedFullForm : false,
      completed_at: timestamp
    };
    var event = root.HearthPlayDomain ? root.HearthPlayDomain.toProgressEvent(result) : {
      event_type: "play_activity_completed",
      node_id: "play",
      learner_id: result.learner_id,
      duration_minutes: result.duration_minutes,
      note: result.reflection,
      data: result
    };
    if (root.HearthProgressEvents) {
      if (event.version === 1 && typeof root.HearthProgressEvents.appendCanonical === "function") {
        var canonicalWrite = root.HearthProgressEvents.appendCanonical(event, root.localStorage);
        if (!canonicalWrite || !canonicalWrite.ok) return;
      } else if (typeof root.HearthProgressEvents.append === "function" && !root.HearthProgressEvents.append(event, root.localStorage)) {
        return;
      }
    }
    state.lastResult = result;
    state.finished = true;
    state.moment = 8;
    saveSession();
    render();
  }

  function rememberRole(role) {
    if (!role) return;
    if (state.rolesTried.indexOf(role) === -1) state.rolesTried.push(role);
  }

  function returnToHandoff() {
    var route = activeHandoff && activeHandoff.return_route;
    var params = route && route.params || {};
    var store = handoffStore();
    if (store && activeHandoff) store.clear(activeHandoff.id);
    activeHandoff = null;
    if (route && route.node_id === "journey" && root.Journey && typeof root.Journey.openCompanionLesson === "function") {
      root.Journey.openCompanionLesson(params.learner_id);
      if (typeof root.Journey.focusCompanionStep === "function" && Number.isFinite(Number(params.step_index))) {
        root.Journey.focusCompanionStep(Number(params.step_index));
      }
      return;
    }
    if (typeof root.showJourney === "function") root.showJourney();
  }

  function sendToCreate() {
    var song = snapshot && snapshot.songThread;
    if (!song || !root.HearthCreateHandoff || typeof root.HearthCreateHandoff.open !== "function") return;
    var result = state && state.lastResult;
    root.HearthCreateHandoff.open({
      source_node_id: "play",
      source_id: result && result.id || song.createTask.sourceId,
      lesson_id: activeHandoff && activeHandoff.lesson_id,
      journey_level_id: activeHandoff && activeHandoff.journey_level_id,
      capability_ids: song.createTask.capabilityIds.slice(),
      source_title: song.playActivity.title,
      suggested_ingredient: "riff",
      seed_title: song.createTask.seedTitle,
      starter: song.createTask.starter,
      instruction: song.createTask.instruction,
      attempt_id: result && result.attempt_id,
      session_id: result && result.session_id,
      handoff_id: result && result.handoff_id
    });
  }

  function sendToPractice() {
    if (!state || !state.lastResult || !root.HearthPlayDomain || typeof root.HearthPlayDomain.createPracticeHandoff !== "function") return;
    var handoff = root.HearthPlayDomain.createPracticeHandoff(state.lastResult, {
      suffix: Date.now().toString(36)
    });
    var store = handoffStore();
    if (!handoff || !store || !store.set(handoff)) return;
    if (root.HearthPracticeEntryController && typeof root.HearthPracticeEntryController.openWithHandoff === "function") {
      return root.HearthPracticeEntryController.openWithHandoff(handoff);
    }
    if (typeof root.showPractice === "function") root.showPractice();
  }

  function handleClick(event) {
    var target = event.target.closest("[data-play-action]");
    if (!target) return;
    var action = target.dataset.playAction;

    if (action === "back") return root.backToMap();
    if (action === "return-handoff") return returnToHandoff();
    if (action === "song-intro") return setView("song", 1);
    if (action === "choose-song-role") {
      state.role = target.dataset.value || "";
      state.rolesTried = [];
      state.completedFullForm = false;
      saveSession();
      return render();
    }
    if (action === "song-begin") {
      rememberRole(state.role);
      return setView("song-converse", 2);
    }
    if (action === "song-converse") return setView("song-converse", 2);
    if (action === "song-swap") {
      rememberRole(state.role);
      state.role = state.role === "rhythm" ? "lead" : "rhythm";
      rememberRole(state.role);
      saveSession();
      return render();
    }
    if (action === "song-complete") {
      if (state.rolesTried.indexOf("rhythm") === -1 || state.rolesTried.indexOf("lead") === -1) return;
      state.completedFullForm = true;
      return setView("song-remember", 3);
    }
    if (action === "send-practice") return sendToPractice();
    if (action === "send-create") return sendToCreate();
    if (action === "select-destination") {
      state = defaultState();
      state.selectedId = target.dataset.destinationId;
      saveSession();
      return render();
    }
    if (action === "destination") return setView("destination", 2);
    if (action === "enter-tradition" || action === "tradition") return setView("tradition", 2);
    if (action === "pulse") return setView("pulse", 3);
    if (action === "toggle-pulse") {
      state.pulseRunning = !state.pulseRunning;
      saveSession();
      return render();
    }
    if (action === "home") return setView("home", 4);
    if (action === "choose-home") return choose(target, "home");
    if (action === "join") return setView("join", 5);
    if (action === "choose-role") return choose(target, "role");
    if (action === "converse") return setView("converse", 6);
    if (action === "swap-role") {
      state.role = state.role === "rhythm" ? "lead" : "rhythm";
      saveSession();
      return render();
    }
    if (action === "remember") {
      rememberRole(state.role);
      rememberRole(state.role === "rhythm" ? "lead" : "rhythm");
      return setView("remember", 8);
    }
    if (action === "choose-reflection") return choose(target, "reflection");
    if (action === "finish") return saveResult();
  }

  root.HearthPlayAtlasController = {
    version: "0.1.0",
    open: open,
    openWithHandoff: openWithHandoff,
    render: render
  };
  root.PlayAtlas = root.HearthPlayAtlasController;
  root.showPlay = open;

  root.addEventListener("hearth:journey-state", function refreshActiveLearner() {
    var visible = root.document.querySelector("#p-foundation.on .play-atlas-shell");
    if (visible) open();
  });
})(typeof window !== "undefined" ? window : globalThis);
