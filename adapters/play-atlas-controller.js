/* Owns live Play atlas navigation, learner session state, and progress events. */
(function initPlayAtlasController(root) {
  "use strict";

  var sessionPrefix = "hearth-play-session-v1:";
  var state = null;
  var snapshot = null;

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
      selectedId: selectedId
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
      finished: false
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
    state = readSession(initial.learner.id);
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
    var result = {
      learner_id: snapshot.learner.id,
      route_id: snapshot.route.id,
      destination_id: snapshot.selectedRegion.id,
      activity_id: "a-minor-musical-conversation",
      journey_level_id: "level-1",
      duration_minutes: 10,
      role: state.role,
      tempo: 60,
      stayed_with_pulse: true,
      found_home: Boolean(state.home),
      reflection: reflectionText(state.reflection),
      repeat_focus: "Return to A after each short phrase, then leave space for an answer.",
      revisit: true
    };
    var event = root.HearthPlayDomain ? root.HearthPlayDomain.toProgressEvent(result) : {
      event_type: "play_activity_completed",
      node_id: "play",
      learner_id: result.learner_id,
      duration_minutes: result.duration_minutes,
      note: result.reflection,
      data: result
    };
    if (root.HearthProgressEvents && typeof root.HearthProgressEvents.append === "function") {
      root.HearthProgressEvents.append(event, root.localStorage);
    }
    state.finished = true;
    state.moment = 8;
    saveSession();
    render();
  }

  function handleClick(event) {
    var target = event.target.closest("[data-play-action]");
    if (!target) return;
    var action = target.dataset.playAction;

    if (action === "back") return root.backToMap();
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
    if (action === "remember") return setView("remember", 8);
    if (action === "choose-reflection") return choose(target, "reflection");
    if (action === "finish") return saveResult();
  }

  root.HearthPlayAtlasController = {
    version: "0.1.0",
    open: open,
    render: render
  };
  root.PlayAtlas = root.HearthPlayAtlasController;
  root.showPlay = open;

  root.addEventListener("hearth:journey-state", function refreshActiveLearner() {
    var visible = root.document.querySelector("#p-foundation.on .play-atlas-shell");
    if (visible) open();
  });
})(typeof window !== "undefined" ? window : globalThis);
