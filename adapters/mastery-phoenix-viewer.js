// Active Mastery Phoenix scene.
(function initMasteryPhoenixViewer(root) {
  "use strict";

  var GOLD = "#d4af69";

  var MASTERY_SEALS = [
    {
      id: "microtones",
      name: "Hear Between Notes",
      artist: "Maddie Ashman",
      color: "#9b59b6",
      why: "Beyond the 12-fret map: microtonal colour, bends, maqam/raga/blues territory.",
      practice: "Bend slowly between two frets and hold the in-between pitch until it stops sounding wrong.",
    },
    {
      id: "voice",
      name: "Find Your Voice",
      artist: "Jimi Hendrix / Sister Rosetta Tharpe",
      color: "#ff6b35",
      why: "Beyond copying technique: touch, tone, timing and identity become unmistakable.",
      practice: "Play one simple phrase three ways until one version sounds like you.",
    },
    {
      id: "composition",
      name: "Transform Skill Into Art",
      artist: "Joni Mitchell / Joao Gilberto",
      color: "#5a9fd4",
      why: "Beyond exercises: harmony, rhythm and tuning become a personal world.",
      practice: "Take one known chord shape and alter tuning/voicing until it suggests a new song.",
    },
    {
      id: "teaching",
      name: "Transmit The Fire",
      artist: "The lineage of teachers",
      color: "#2ecc71",
      why: "Beyond personal ability: you can guide another person through the path.",
      practice: "Teach a beginner one concept without jargon, then watch where they get stuck.",
    },
  ];

  var MASTERY_ENCOUNTER_STORAGE = "hearth-mastery-encounter-v1";
  var activeHandoff = null;

  function handoffStore() {
    if (!root.HearthCrossNodeHandoffStore || typeof root.HearthCrossNodeHandoffStore.createStore !== "function") return null;
    return root.HearthCrossNodeHandoffStore.createStore({ storage: root.sessionStorage });
  }

  function readMasteryHandoff() {
    var store = handoffStore();
    if (!store) return null;
    var learner = currentLearner();
    var learnerId = activeHandoff && activeHandoff.learner_id ||
      learner && learner.id;
    return store.current({ learnerId: learnerId || undefined, destinationNodeId: "mastery" });
  }

  function returnToSource() {
    var handoff = activeHandoff || readMasteryHandoff();
    var route = handoff && handoff.return_route;
    var store = handoffStore();
    if (store && handoff) store.clear(handoff.id);
    activeHandoff = null;
    if (route && route.node_id === "journey" && root.Journey) {
      var params = route.params || {};
      if (typeof root.Journey.openCompanionLesson === "function") root.Journey.openCompanionLesson(params.learner_id);
      if (typeof root.Journey.focusCompanionStep === "function" && Number.isFinite(Number(params.step_index))) {
        root.Journey.focusCompanionStep(Number(params.step_index));
      }
      return;
    }
    if (typeof root.backToMap === "function") root.backToMap();
  }

  function currentLearner() {
    var state = null;
    try {
      state = typeof root.getJourneyState === "function"
        ? root.getJourneyState()
        : JSON.parse(root.localStorage.getItem("hearth-journey-v2") || "null");
    } catch (error) {
      state = null;
    }
    var students = state && Array.isArray(state.students) ? state.students : [];
    var learner = students.filter(function (student) {
      return student && student.id === state.activeStudentId;
    })[0] || students[0] || null;
    return {
      id: learner && learner.id || state && state.activeStudentId || "default",
      name: learner && learner.name || "My Journey"
    };
  }

  function exemplar() {
    var records = Array.isArray(root.MASTERY_EXEMPLARS) ? root.MASTERY_EXEMPLARS : [];
    return records[0] || {
      id: "level-1-bb-king-space-and-answer",
      level: 1,
      title: "Space, Answer, Home",
      sourceLabel: "Live performance",
      sourceTitle: "B.B. King - The Thrill Is Gone",
      sourceUrl: "https://www.youtube.com/watch?v=4fk2prKnYnI",
      reason: "A small pentatonic vocabulary can speak through timing, touch, silence, and clear musical answers.",
      noticePrompt: "Listen for one short guitar statement and the silence after it.",
      noticeOptions: [{ id: "space-breathes", label: "He leaves space after the phrase" }],
      tryPrompt: "Play a tiny answer, leave a full space, then return to A.",
      tryOptions: [{ id: "leave-a-space", label: "Leave four quiet beats" }],
      mediaFallback: "Use the A Minor Homecoming guide tones: play two notes, count four quiet beats, then land on A.",
      practiceInstruction: "Play the idea at 60 BPM inside A Minor Homecoming.",
      createStarter: "A two-bar answer with a full space before the final A.",
      carryPrompt: "Keep one choice from the encounter in your own playing.",
      reflectionPrompt: "What did the master do with fewer notes that you want to remember?",
      capabilityIds: ["L1-STYLE-01"]
    };
  }

  function encounterStorageKey(learnerId) {
    return MASTERY_ENCOUNTER_STORAGE + ":" + (learnerId || "default");
  }

  function readEncounter(learnerId) {
    try {
      var saved = JSON.parse(root.localStorage.getItem(encounterStorageKey(learnerId)) || "null");
      return saved && saved.exemplarId ? saved : null;
    } catch (error) {
      return null;
    }
  }

  function writeEncounter(state) {
    try {
      root.localStorage.setItem(encounterStorageKey(state.learnerId), JSON.stringify(state));
    } catch (error) {
      // The encounter remains usable in memory when storage is unavailable.
    }
  }

  function appendEncounterEvent(kind, state) {
    if (!root.HearthProgressEvents || !root.HearthMasteryProgress) return null;
    var record = exemplar();
    var event = root.HearthMasteryProgress.buildEvent({
      kind: kind,
      learnerId: state.learnerId,
      state: state,
      record: record,
      handoff: activeHandoff,
      suffix: Date.now() + "-" + Math.random().toString(36).slice(2, 7)
    });
    if (!event) return null;
    return typeof root.HearthProgressEvents.appendCanonical === "function"
      ? root.HearthProgressEvents.appendCanonical(event, root.localStorage)
      : root.HearthProgressEvents.append(event, root.localStorage);
  }

  function newEncounter(learner, record) {
    return {
      id: "mastery-encounter-" + Date.now(),
      exemplarId: record.id,
      learnerId: learner.id,
      learnerName: learner.name,
      step: 0,
      notice: "",
      tryIdea: "",
      carriedTo: "",
      reflection: "",
      completed: false,
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[ch];
    });
  }

  function panel() {
    root.document.querySelectorAll(".pnl").forEach(function (pnl) {
      pnl.classList.remove("on");
    });
    var el = root.document.getElementById("p-foundation");
    if (el) el.classList.add("on");
    return el;
  }

  function ensureStyle() {
    if (root.document.getElementById("mastery-phoenix-style")) return;
    var style = root.document.createElement("style");
    style.id = "mastery-phoenix-style";
    style.textContent = [
      ".sf-wrap{padding:18px;max-width:1180px;margin:0 auto;display:flex;flex-direction:column}",
      ".sf-scene{position:relative;border:1px solid rgba(212,175,105,.28);border-radius:18px;overflow:hidden;background:#080704;box-shadow:0 20px 60px rgba(0,0,0,.35)}",
      ".sf-scene:before{content:\"\";position:absolute;inset:0;background:radial-gradient(circle at 50% 44%,rgba(255,185,70,.08),transparent 34%),linear-gradient(180deg,rgba(8,7,4,.14),rgba(8,7,4,.5));pointer-events:none;z-index:1}",
      ".sf-top{position:relative;z-index:2;display:flex;justify-content:space-between;gap:14px;align-items:flex-start;padding:18px}",
      ".sf-node-ident{display:flex;align-items:center;gap:11px;margin-bottom:8px}",
      ".sf-node-ident>img{width:58px;height:58px;border-radius:50%;object-fit:contain;border:1px solid rgba(212,175,105,.44);box-shadow:0 0 18px rgba(212,175,105,.2);background:#0d0b08}",
      ".sf-kicker{font-family:JetBrains Mono;font-size:.58rem;color:var(--sf,var(--gold));letter-spacing:.16em;text-transform:uppercase}",
      ".sf-title{font-family:Cinzel;color:var(--sf,var(--gold));font-size:1.55rem;font-weight:800;margin:2px 0}",
      ".sf-sub{font-size:.78rem;color:var(--dim);line-height:1.55;max-width:560px}",
      ".sf-guide{display:flex;gap:9px;align-items:center;max-width:310px;background:rgba(13,11,8,.78);border:1px solid rgba(212,175,105,.28);border-radius:13px;padding:10px;font-size:.72rem;color:var(--text);line-height:1.42}",
      ".sf-guide img{width:68px;height:68px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,.42));animation:char-float 3s ease-in-out infinite}",
      ".sf-stage{position:relative;z-index:2;aspect-ratio:16/9;margin:0 18px 14px;border:1px solid rgba(212,175,105,.18);border-radius:14px;overflow:hidden;background:#050403}",
      ".sf-mastery-tableau{display:block;width:100%;height:100%;object-fit:contain;pointer-events:none}",
      ".sf-hotspot{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:5px;border:0;background:transparent;color:var(--text);font:700 .67rem DM Sans,sans-serif;cursor:pointer;white-space:nowrap;filter:drop-shadow(0 2px 7px rgba(0,0,0,.8));transition:transform .2s ease,filter .2s ease}",
      ".sf-hotspot:before{content:\"\";width:28px;height:28px;border:1px solid rgba(255,224,142,.82);border-radius:50%;background:radial-gradient(circle,rgba(255,211,104,.7),rgba(90,38,10,.74) 52%,rgba(8,7,4,.86) 74%);box-shadow:0 0 0 5px rgba(255,176,60,.1),0 0 16px rgba(255,166,49,.62);animation:mastery-hotspot-pulse 3.8s ease-in-out infinite}",
      ".sf-hotspot:hover,.sf-hotspot:focus-visible{transform:translate(-50%,-50%) scale(1.06);filter:drop-shadow(0 0 12px rgba(255,193,84,.95));outline:none}",
      ".sf-hotspot span{padding:4px 8px;border:1px solid rgba(212,175,105,.34);border-radius:999px;background:rgba(10,8,5,.86);letter-spacing:.02em}",
      ".sf-hotspot-continue{left:13.5%;top:76.5%}.sf-hotspot-watch{left:20%;top:89%}.sf-hotspot-thread{left:85%;top:76.5%}.sf-hotspot-review{left:81.5%;top:89%}",
      ".sf-scene-prompt{position:relative;z-index:2;text-align:center;color:var(--dim);font-size:.7rem;letter-spacing:.03em;padding:0 18px 15px}",
      ".sf-drawer{position:relative;z-index:2;margin:0 18px 18px;background:rgba(13,11,8,.84);border:1px solid rgba(212,175,105,.3);border-radius:14px;padding:14px;color:var(--text);font-size:.78rem;line-height:1.55}",
      ".sf-primary-row{position:relative;z-index:2;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;padding:0 18px 16px}",
      ".sf-primary{background:var(--sf,var(--gold));color:#0d0b08;border:none;border-radius:999px;padding:10px 18px;font-family:DM Sans,sans-serif;font-weight:900;cursor:pointer;box-shadow:0 8px 24px rgba(212,175,105,.2)}",
      ".sf-secondary{background:rgba(13,11,8,.62);color:var(--sf,var(--gold));border:1px solid rgba(212,175,105,.44);border-radius:999px;padding:9px 13px;font-weight:800;cursor:pointer}",
      ".sf-encounter-steps{display:flex;gap:5px;align-items:center;margin-bottom:10px;flex-wrap:wrap}",
      ".sf-encounter-step{font-family:JetBrains Mono;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:var(--dim);padding:4px 7px;border:1px solid rgba(212,175,105,.18);border-radius:999px}",
      ".sf-encounter-step.is-current{color:#0d0b08;background:var(--sf,var(--gold));border-color:var(--sf,var(--gold))}",
      ".sf-encounter-source{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 0;border-top:1px solid rgba(212,175,105,.15);border-bottom:1px solid rgba(212,175,105,.15);margin:12px 0;color:var(--text)}",
      ".sf-encounter-source a{color:var(--sf,var(--gold));font-weight:800;text-decoration:none}",
      ".sf-encounter-source a:hover{text-decoration:underline}",
      ".sf-encounter-choices{display:flex;gap:7px;flex-wrap:wrap;margin:12px 0}",
      ".sf-encounter-choice{background:rgba(23,17,9,.8);color:var(--text);border:1px solid rgba(212,175,105,.32);border-radius:10px;padding:9px 11px;font-weight:750;cursor:pointer;text-align:left}",
      ".sf-encounter-choice:hover,.sf-encounter-choice:focus-visible{border-color:var(--sf,var(--gold));box-shadow:0 0 0 2px rgba(212,175,105,.12);outline:none}",
      ".sf-encounter-note{color:var(--dim);font-size:.72rem;margin:6px 0}",
      ".sf-encounter-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}",
      ".sf-master-list{display:grid;grid-template-columns:1fr 1fr;gap:10px}",
      ".sf-master-card{background:#0d0b08;border:1px solid var(--border);border-radius:12px;padding:12px}",
      ".sf-master-card b{font-family:Cinzel;color:var(--sf)}",
      ".sf-master-card p{font-size:.72rem;color:var(--dim);line-height:1.45}",
      ".sf-proof-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}",
      ".sf-proof-grid textarea{width:100%;box-sizing:border-box;background:#0d0b08;border:1px solid var(--border);border-radius:10px;color:var(--text);padding:9px;font-family:DM Sans;font-size:.76rem;min-height:70px}",
      "@keyframes mastery-hotspot-pulse{0%,100%{transform:scale(.92);opacity:.74}50%{transform:scale(1.08);opacity:1}}",
      "@media(max-width:780px){.sf-top{flex-direction:column}.sf-guide{max-width:none}.sf-stage{margin-inline:10px}.sf-hotspot{font-size:.55rem}.sf-hotspot:before{width:23px;height:23px}.sf-hotspot span{padding:3px 5px}.sf-hotspot-continue{left:14%;top:76%}.sf-hotspot-watch{left:20%;top:89%}.sf-hotspot-thread{left:84%;top:76%}.sf-hotspot-review{left:81%;top:89%}.sf-drawer{margin-inline:10px}.sf-proof-grid,.sf-master-list{grid-template-columns:1fr}}",
    ].join("");
    root.document.head.appendChild(style);
  }

  function sceneStart() {
    var title = root.NODE_DATA && root.NODE_DATA.mastery ? root.NODE_DATA.mastery.title : "Mastery";
    var backAction = activeHandoff ? "MasteryPhoenix.returnToSource()" : "backToMap()";
    var backLabel = activeHandoff ? "Return to Journey" : "Map";
    return (
      '<div class="sf-wrap">' +
      '<button class="back-btn" onclick="' + backAction + '">\u2190 ' + backLabel + '</button>' +
      '<div class="sf-scene sf-phoenix">' +
      '<div class="sf-top">' +
      "<div>" +
      '<div class="sf-node-ident">' +
      '<img src="images/mastery-icon.png" alt="">' +
      "<div>" +
      '<div class="sf-kicker">Mastery</div>' +
      '<div class="sf-title">' + esc(title) + "</div>" +
      "</div>" +
      "</div>" +
      '<div class="sf-sub">See what a skill can become. Notice one choice, try it in your own hands, and carry it back into the music.</div>' +
      "</div>" +
      '<div class="sf-guide">' +
      '<img src="images/character-symbols/Celebrator with sparks.png" alt="">' +
      "<div>Do not copy the whole performance. Notice one choice, then let it change something in your own playing.</div>" +
      "</div>" +
      "</div>"
    );
  }

  function renderMasteryTableau() {
    return (
      '<img class="sf-mastery-tableau" src="images/mastery/mastery-phoenix-tableau-v1.png" alt="Phoenix rising beside a six-string guitar" />' +
      '<button class="sf-hotspot sf-hotspot-continue" aria-label="Continue today\'s encounter" onclick="MasteryPhoenix.openPath(\'continue\')"><span>Continue today</span></button>' +
      '<button class="sf-hotspot sf-hotspot-watch" aria-label="Watch a master" onclick="MasteryPhoenix.openPath(\'watch\')"><span>Watch a master</span></button>' +
      '<button class="sf-hotspot sf-hotspot-thread" aria-label="Follow an artistic thread" onclick="MasteryPhoenix.openPath(\'thread\')"><span>Follow a thread</span></button>' +
      '<button class="sf-hotspot sf-hotspot-review" aria-label="Review what changed" onclick="MasteryPhoenix.openPath(\'review\')"><span>Review what changed</span></button>'
    );
  }

  function showMastery() {
    activeHandoff = readMasteryHandoff();
    ensureStyle();
    var el = panel();
    if (!el) return;
    el.innerHTML =
      sceneStart() +
      '<div class="sf-stage">' + renderMasteryTableau() + "</div>" +
      '<div class="sf-scene-prompt">Choose one ember. Begin with a short encounter, not a performance to prove.</div>' +
      '<div id="sf-drawer" class="sf-drawer"><strong>Witness → Notice → Try → Carry</strong><br>Choose one ember to begin. Mastery is where a skill becomes a musical possibility.</div>' +
      "</div></div>";
  }

  function renderHandoffPreview() {
    var el = root.document.getElementById("sf-drawer");
    var record = exemplar();
    var handoff = activeHandoff || readMasteryHandoff();
    if (!el || !handoff) return;
    var task = handoff.task || {};
    var easier = handoff.easier_step || {};
    el.innerHTML =
      '<div class="sf-kicker">Journey encounter</div>' +
      '<h3 style="font-family:Cinzel;color:' + GOLD + ';margin:5px 0">' + esc(record.title) + '</h3>' +
      '<p class="sf-encounter-note"><strong>' + esc(record.sourceTitle) + '</strong></p>' +
      '<p class="sf-encounter-note">' + esc(task.instruction || record.reason) + '</p>' +
      '<p class="sf-encounter-note"><strong>Smaller step:</strong> ' + esc(easier.instruction || record.mediaFallback) + '</p>' +
      '<div class="sf-encounter-actions"><button class="sf-primary" onclick="MasteryPhoenix.startEncounter(false)">Begin Witness</button></div>';
  }

  function openWithHandoff(handoff) {
    activeHandoff = handoff || readMasteryHandoff();
    showMastery();
    renderHandoffPreview();
  }

  function choiceLabel(options, id) {
    var choice = (options || []).filter(function (item) {
      return item && item.id === id;
    })[0];
    return choice ? choice.label : "Not chosen yet";
  }

  function renderEncounterSteps(state) {
    return ["Witness", "Notice", "Try", "Carry"].map(function (label, index) {
      return '<span class="sf-encounter-step' + (state.step === index ? " is-current" : "") + '">' + label + "</span>";
    }).join("");
  }

  function renderEncounter() {
    var learner = currentLearner();
    var record = exemplar();
    var state = readEncounter(learner.id);
    var el = root.document.getElementById("sf-drawer");
    if (!el) return;
    if (!state || state.exemplarId !== record.id) {
      startEncounter(false);
      return;
    }

    var title = [
      "Watch the idea become music",
      "Choose one thing to notice",
      "Try one choice in your own hands",
      "Carry it back into the music"
    ][state.step] || "Watch the idea become music";
    var body = "";
    var actions = "";

    if (state.step === 0) {
      body = '<p class="sf-encounter-note">' + esc(record.reason) + " Listen for one small decision, not the whole performance.</p>" +
        '<div class="sf-encounter-source"><div><div class="sf-kicker">' + esc(record.sourceLabel) + "</div><strong>" + esc(record.sourceTitle) + '</strong></div><a href="' + esc(record.sourceUrl) + '" target="_blank" rel="noopener">Open source</a></div>' +
        '<p class="sf-encounter-note">' + esc(record.noticePrompt) + "</p>" +
        '<p class="sf-encounter-note"><strong>If the source is unavailable:</strong> ' + esc(record.mediaFallback || "Use the internal practice prompt instead.") + "</p>";
      actions = '<button class="sf-primary" onclick="MasteryPhoenix.advanceEncounter()">I\'ve listened</button>';
    } else if (state.step === 1) {
      body = '<p class="sf-encounter-note">' + esc(record.noticePrompt) + " There is no wrong observation. Choose the detail your ear actually caught.</p>" +
        '<div class="sf-encounter-choices">' + (record.noticeOptions || []).map(function (item) {
          return '<button class="sf-encounter-choice" onclick="MasteryPhoenix.chooseNotice(\'' + esc(item.id) + '\')">' + esc(item.label) + "</button>";
        }).join("") + "</div>";
    } else if (state.step === 2) {
      body = '<p class="sf-encounter-note">You noticed: <strong>' + esc(choiceLabel(record.noticeOptions, state.notice)) + "</strong></p>" +
        '<p class="sf-encounter-note">' + esc(record.tryPrompt) + " Choose one small way to test it.</p>" +
        '<div class="sf-encounter-choices">' + (record.tryOptions || []).map(function (item) {
          return '<button class="sf-encounter-choice" aria-pressed="' + (state.tryIdea === item.id ? "true" : "false") + '" onclick="MasteryPhoenix.chooseTry(\'' + esc(item.id) + '\')">' + esc(item.label) + "</button>";
        }).join("") + "</div>" +
        (state.tryIdea ? '<p class="sf-encounter-note">Play it once now. Smaller and honest is better than impressive.</p>' : "");
      actions = state.tryIdea ? '<button class="sf-primary" onclick="MasteryPhoenix.completeTry()">I tried it</button>' : "";
    } else {
      body = '<p class="sf-encounter-note">You noticed: <strong>' + esc(choiceLabel(record.noticeOptions, state.notice)) + "</strong>.</p>" +
        '<p class="sf-encounter-note">You will try: <strong>' + esc(choiceLabel(record.tryOptions, state.tryIdea)) + "</strong>.</p>" +
        '<p class="sf-encounter-note">' + esc(record.carryPrompt) + "</p>";
      actions = '<div class="sf-encounter-actions"><button class="sf-primary" onclick="MasteryPhoenix.carryTo(\'practice\')">Send to Practice</button><button class="sf-secondary" onclick="MasteryPhoenix.carryTo(\'create\')">Send to Create</button></div>';
    }

    el.innerHTML =
      '<div class="sf-encounter-steps">' + renderEncounterSteps(state) + "</div>" +
      '<div class="sf-kicker">' + esc(record.sourceLabel) + " · " + esc(learner.name) + "</div>" +
      '<h3 style="font-family:Cinzel;color:' + GOLD + ';margin:5px 0">' + esc(title) + "</h3>" +
      body + actions;
  }

  function startEncounter(restart) {
    var learner = currentLearner();
    var record = exemplar();
    var saved = readEncounter(learner.id);
    var state = saved && saved.exemplarId === record.id ? saved : null;
    if (!state || state.completed || restart) {
      state = newEncounter(learner, record);
      writeEncounter(state);
      appendEncounterEvent("started", state);
    }
    renderEncounter();
  }

  function updateEncounterStep(step, eventKind) {
    var learner = currentLearner();
    var state = readEncounter(learner.id);
    if (!state || state.completed) return;
    state.step = step;
    state.updatedAt = new Date().toISOString();
    writeEncounter(state);
    appendEncounterEvent(eventKind, state);
    renderEncounter();
  }

  function advanceEncounter() {
    updateEncounterStep(1, "witnessed");
  }

  function chooseNotice(id) {
    var learner = currentLearner();
    var state = readEncounter(learner.id);
    var record = exemplar();
    var valid = (record.noticeOptions || []).some(function (item) { return item.id === id; });
    if (!state || state.step !== 1 || !valid) return;
    state.notice = id;
    state.step = 2;
    state.updatedAt = new Date().toISOString();
    writeEncounter(state);
    appendEncounterEvent("noticed", state);
    renderEncounter();
  }

  function chooseTry(id) {
    var learner = currentLearner();
    var state = readEncounter(learner.id);
    var record = exemplar();
    var valid = (record.tryOptions || []).some(function (item) { return item.id === id; });
    if (!state || state.step !== 2 || !valid) return;
    state.tryIdea = id;
    state.updatedAt = new Date().toISOString();
    writeEncounter(state);
    renderEncounter();
  }

  function completeTry() {
    var learner = currentLearner();
    var state = readEncounter(learner.id);
    if (!state || state.step !== 2 || !state.tryIdea) return;
    state.step = 3;
    state.updatedAt = new Date().toISOString();
    writeEncounter(state);
    appendEncounterEvent("tried", state);
    renderEncounter();
  }

  function carryTo(destination) {
    var learner = currentLearner();
    var record = exemplar();
    var state = readEncounter(learner.id);
    if (!state || state.step !== 3 || state.completed) return;
    state.carriedTo = destination;
    state.completed = true;
    state.completedAt = new Date().toISOString();
    state.updatedAt = state.completedAt;
    writeEncounter(state);
    appendEncounterEvent("carried", state);

    if (destination === "practice") {
      if (root.PracticeCandle && typeof root.PracticeCandle.open === "function") {
        root.PracticeCandle.open({
          durationMinutes: 10,
          focus: "Pentatonic phrase · " + choiceLabel(record.tryOptions, state.tryIdea),
          learnerId: learner.id,
          returnAction: "showMastery",
          returnLabel: "Mastery",
          sourceContext: {
            mastery_encounter_id: state.id,
            mastery_exemplar_id: record.id,
            notice: state.notice,
            try_idea: state.tryIdea
          }
        });
      } else if (typeof root.showPractice === "function") {
        root.showPractice();
      }
      return;
    }

    if (destination === "create" && root.HearthCreateHandoff && typeof root.HearthCreateHandoff.open === "function") {
      root.HearthCreateHandoff.open({
        suggested_ingredient: "riff",
        source_node_id: "mastery",
        source_id: record.id,
        journey_level_id: record.level ? "L" + record.level : "",
        capability_ids: ["L1-CREATE-01"],
        source_title: record.title,
        seed_title: "A phrase with a voice",
        starter: record.createStarter,
        instruction: record.carryPrompt + " Try: " + choiceLabel(record.tryOptions, state.tryIdea) + ".",
        attempt_id: state.id + "-try",
        session_id: state.id
      });
    } else if (typeof root.showCreate === "function") {
      root.showCreate();
    }
  }

  function renderReview() {
    var learner = currentLearner();
    var record = exemplar();
    var state = readEncounter(learner.id);
    var el = root.document.getElementById("sf-drawer");
    if (!el) return;
    if (!state) {
      el.innerHTML = '<div class="sf-kicker">Return</div><h3 style="font-family:Cinzel;color:' + GOLD + ';margin:5px 0">Nothing to review yet</h3><p class="sf-encounter-note">Complete one short Mastery encounter and this place will remember what you noticed and tried.</p><button class="sf-primary" onclick="MasteryPhoenix.startEncounter()">Begin encounter</button>';
      return;
    }
    el.innerHTML =
      '<div class="sf-kicker">Return · ' + esc(learner.name) + "</div>" +
      '<h3 style="font-family:Cinzel;color:' + GOLD + ';margin:5px 0">What changed?</h3>' +
      '<p class="sf-encounter-note">' + (state.completed ? "This encounter was carried into " + esc(state.carriedTo) + "." : "This encounter is still open.") + "</p>" +
      '<p class="sf-encounter-note">Noticed: <strong>' + esc(choiceLabel(record.noticeOptions, state.notice)) + "</strong></p>" +
      '<p class="sf-encounter-note">Tried: <strong>' + esc(choiceLabel(record.tryOptions, state.tryIdea)) + "</strong></p>" +
      '<label class="sf-encounter-note" for="mastery-review-reflection"><strong>' + esc(record.reflectionPrompt || "What will you remember?") + '</strong></label>' +
      '<textarea id="mastery-review-reflection" style="width:100%;box-sizing:border-box;min-height:72px;background:#0d0b08;border:1px solid var(--border);border-radius:9px;color:var(--text);padding:9px;font:inherit" placeholder="One honest sentence is enough.">' + esc(state.reflection || "") + '</textarea>' +
      '<div class="sf-encounter-actions"><button class="sf-primary" onclick="MasteryPhoenix.saveReviewReflection()">Save reflection</button><button class="sf-secondary" onclick="MasteryPhoenix.startEncounter(true)">Start again</button></div>';
  }

  function saveReviewReflection() {
    var learner = currentLearner();
    var state = readEncounter(learner.id);
    var input = root.document.getElementById("mastery-review-reflection");
    if (!state || !input || !String(input.value || "").trim()) return;
    state.reflection = String(input.value).trim();
    state.updatedAt = new Date().toISOString();
    writeEncounter(state);
    appendEncounterEvent("reflected", state);
    renderReview();
  }

  function continueEncounter() {
    var learner = currentLearner();
    var state = readEncounter(learner.id);
    if (!state) {
      startEncounter(false);
    } else if (state.completed) {
      renderReview();
    } else {
      renderEncounter();
    }
  }

  function renderArtisticThread() {
    var el = root.document.getElementById("sf-drawer");
    var record = exemplar();
    if (!el) return;
    el.innerHTML =
      '<div class="sf-kicker">Artistic thread · ' + esc(record.artist || "B.B. King") + "</div>" +
      '<h3 style="font-family:Cinzel;color:' + GOLD + ';margin:5px 0">Space → Answer → Home</h3>' +
      '<ol class="sf-encounter-note" style="padding-left:20px;line-height:1.8">' +
      "<li><strong>Space:</strong> silence lets a short phrase breathe.</li>" +
      "<li><strong>Answer:</strong> the next phrase responds instead of filling every gap.</li>" +
      "<li><strong>Home:</strong> one settled note gives the listener somewhere to land.</li>" +
      "</ol>" +
      '<p class="sf-encounter-note">Follow this thread through the performance, then test only one link in A Minor Homecoming.</p>' +
      '<div class="sf-encounter-actions"><button class="sf-primary" onclick="MasteryPhoenix.startEncounter(false)">Begin this thread</button></div>';
  }

  function openPath(id) {
    if (id === "review") {
      renderReview();
      return;
    }
    if (id === "continue") {
      continueEncounter();
      return;
    }
    if (id === "thread") {
      renderArtisticThread();
      return;
    }
    startEncounter(true);
  }

  function openSeal(id) {
    var seal = MASTERY_SEALS.find(function (item) {
      return item.id === id;
    });
    var el = root.document.getElementById("sf-drawer");
    if (!seal || !el) return;
    el.innerHTML =
      '<div class="sf-kicker" style="color:' + seal.color + '">Phoenix Seal</div>' +
      '<h3 style="font-family:Cinzel;color:' + seal.color + ';margin:5px 0">' + esc(seal.name) + "</h3>" +
      '<div class="sf-master-list">' +
      '<div class="sf-master-card"><b>Beyond Artist</b><p>' + esc(seal.artist) + "</p></div>" +
      '<div class="sf-master-card"><b>Why this matters</b><p>' + esc(seal.why) + "</p></div>" +
      '<div class="sf-master-card"><b>Go beyond practice</b><p>' + esc(seal.practice) + "</p></div>" +
      '<div class="sf-master-card"><b>Phoenix question</b><p>What changes in you after studying this boundary-crosser?</p></div>' +
      "</div>" +
      '<div class="sf-proof-grid" style="margin-top:10px">' +
      '<textarea placeholder="What did you observe in the master artist?"></textarea>' +
      '<textarea placeholder="What will you try that goes beyond your current map?"></textarea>' +
      '<textarea placeholder="What evidence/recording/note will prove the transformation?"></textarea>' +
      "</div>";
  }

  root.MASTERY_SEALS = MASTERY_SEALS;
  root.MasteryPhoenix = {
    render: showMastery,
    openPath: openPath,
    openSeal: openSeal,
    startEncounter: startEncounter,
    advanceEncounter: advanceEncounter,
    chooseNotice: chooseNotice,
    chooseTry: chooseTry,
    completeTry: completeTry,
    carryTo: carryTo,
    saveReviewReflection: saveReviewReflection,
    openWithHandoff: openWithHandoff,
    returnToSource: returnToSource,
  };
  root.showMastery = showMastery;
})(typeof window !== "undefined" ? window : globalThis);
