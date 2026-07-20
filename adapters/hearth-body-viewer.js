/* global window, document */
(function initHearthBodyViewer(root) {
  "use strict";

  var COPY = root.HEARTH_BODY_COPY || {};
  var ZONES = root.HEARTH_BODY_ZONES || [];
  var BRAIN = root.HearthBrainChamber || null;
  var activeZone = null;
  var activeHandoff = null;
  var brainStep = 0;
  var brainObservation = "";
  var brainNote = "";
  var brainSaveStatus = "";

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function escapeCharacter(ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function attr(value) {
    return esc(value);
  }

  function panel() {
    document.querySelectorAll(".pnl").forEach(function hidePanel(item) {
      item.classList.remove("on");
    });
    var element = document.getElementById("p-foundation");
    if (element) element.classList.add("on");
    return element;
  }

  function handoffStore() {
    if (!root.HearthCrossNodeHandoffStore || typeof root.HearthCrossNodeHandoffStore.createStore !== "function") return null;
    return root.HearthCrossNodeHandoffStore.createStore({ storage: root.sessionStorage });
  }

  function readHearthHandoff() {
    var store = handoffStore();
    if (!store) return null;
    var learnerId = activeHandoff && activeHandoff.learner_id;
    return store.current({ learnerId: learnerId || undefined, destinationNodeId: "hearth" });
  }

  function journeyState() {
    try {
      return JSON.parse(root.localStorage.getItem("hearth-journey-v2") || "null");
    } catch (error) {
      return null;
    }
  }

  function activeLearner() {
    if (activeHandoff && activeHandoff.learner_id) {
      return { id: activeHandoff.learner_id, name: "Active learner" };
    }
    var state = journeyState();
    if (!state || !Array.isArray(state.students)) return null;
    return state.students.find(function findStudent(student) {
      return student.id === state.activeStudentId;
    }) || state.students[0] || null;
  }

  function normalizeZoneId(id) {
    return id === "heart" ? "feeling" : id;
  }

  function zoneById(id) {
    var canonical = normalizeZoneId(id);
    return ZONES.find(function findZone(zone) {
      return zone.id === canonical || (Array.isArray(zone.aliases) && zone.aliases.indexOf(id) !== -1);
    }) || null;
  }

  function topReturnButton() {
    return activeHandoff
      ? '<button class="back-btn" onclick="HearthBody.returnToSource()">&larr; Return to Journey</button>'
      : '<button class="back-btn" onclick="backToMap()">&larr; Map</button>';
  }

  function chamberBackButton() {
    return activeHandoff
      ? '<button class="back-btn" onclick="HearthBody.returnToSource()">&larr; Return to Journey</button>'
      : '<button class="back-btn" onclick="HearthBody.back()">&larr; Inner Instrument</button>';
  }

  function hotspotHtml(zone) {
    var style = "--hb-x:" + attr(zone.x) + ";--hb-y:" + attr(zone.y) + ";--hb-radius:" + attr(zone.r || 4) + ";";
    return '<button type="button" class="hb-hotspot" data-zone="' + attr(zone.id) + '" style="' + style + '" '
      + 'onclick="HearthBody.openZone(\'' + attr(zone.id) + '\')" '
      + 'onmouseenter="HearthBody.hoverZone(\'' + attr(zone.id) + '\')" '
      + 'onmouseleave="HearthBody.unhoverZone()" '
      + 'onfocus="HearthBody.hoverZone(\'' + attr(zone.id) + '\')" '
      + 'onblur="HearthBody.unhoverZone()" '
      + 'aria-label="Open ' + attr(zone.label) + '" title="' + attr(zone.guide) + '">'
      + '<span class="hb-hotspot-seal">' + esc(zone.seal) + '</span>'
      + '<span class="hb-hotspot-label">' + esc(zone.label) + '</span>'
      + '</button>';
  }

  function renderHearthBody() {
    var element = panel();
    if (!element) return;
    var hotspots = ZONES.map(hotspotHtml).join("");
    element.innerHTML = '<div class="hb-wrap hb-v2-wrap">'
      + topReturnButton()
      + '<section class="hb-inner-scene" aria-labelledby="hb-inner-title">'
      + '<aside class="hb-inner-copy">'
      + '<div class="hb-kicker">' + esc(COPY.kicker || "The Hearth") + '</div>'
      + '<h2 id="hb-inner-title" class="hb-title">' + esc(COPY.title || "The Inner Instrument") + '</h2>'
      + '<p class="hb-sub">' + esc(COPY.subtitle || "Learn what develops inside the learner.") + '</p>'
      + '<div class="hb-guide hb-inner-guide">'
      + '<img src="images/character-generated/guide-head-lightbulb-v1-ui.webp" alt="">'
      + '<div id="hb-guide-copy">' + esc(COPY.guide || "The guitar is the outer instrument. You are the inner instrument.") + '</div>'
      + '</div>'
      + '<p class="hb-inner-prompt">' + esc(COPY.defaultPrompt || "Choose one system.") + '</p>'
      + '</aside>'
      + '<div class="hb-anatomy-stage">'
      + '<img class="hb-anatomy-image" src="images/hearth/hearth-inner-instrument-master-v2.png" alt="An anatomical learner holding a six-string guitar, showing the inner systems used while learning">'
      + '<div class="hb-hotspot-layer" aria-label="Inner instrument systems">' + hotspots + '</div>'
      + '</div>'
      + '</section>'
      + '</div>';
  }

  function renderSystemChamber(zone) {
    var element = panel();
    if (!element) return;
    var practices = (zone.practices || []).map(function renderPractice(practice) {
      return "<li>" + esc(practice) + "</li>";
    }).join("");
    element.innerHTML = '<div class="hb-chamber hb-system-chamber">'
      + chamberBackButton()
      + '<header class="hb-system-head"><div><div class="hb-kicker">The Inner Instrument</div><h2>' + esc(zone.label) + '</h2><p>' + esc(zone.guide) + '</p></div>'
      + '<img src="images/character-generated/guide-thinking-v1-ui.webp" alt=""></header>'
      + '<div class="hb-system-path">'
      + '<section><span>01</span><div><strong>Understand</strong><p>' + esc(zone.system || "") + '</p></div></section>'
      + '<section><span>02</span><div><strong>Experience</strong><p>' + esc((zone.practices || [""])[0]) + '</p></div></section>'
      + '<section><span>03</span><div><strong>Apply</strong><p>' + esc(zone.guitar || "") + '</p></div></section>'
      + '<section><span>04</span><div><strong>Own</strong><p>' + esc(zone.care || "") + '</p>'
      + (practices ? '<ul class="hb-zone-list">' + practices + '</ul>' : "") + '</div></section>'
      + '</div></div>';
  }

  function brainStepHtml(stage, index) {
    var own = stage.id === "own";
    var controls = "";
    if (own && BRAIN) {
      controls = '<fieldset class="hb-brain-observations"><legend>How did the pattern feel?</legend>'
        + BRAIN.observations.map(function renderObservation(item) {
          var active = brainObservation === item.id ? " active" : "";
          return '<button type="button" class="hb-observation' + active + '" data-observation="' + attr(item.id) + '" onclick="HearthBody.chooseBrainObservation(\'' + attr(item.id) + '\')">' + esc(item.label) + '</button>';
        }).join("")
        + '</fieldset>'
        + '<label class="hb-brain-note">One useful detail <textarea id="hb-brain-note" placeholder="For example: returning to A helped, but I rushed the note before it.">' + esc(brainNote) + '</textarea></label>'
        + '<div id="hb-brain-status" class="hb-brain-status" role="status" aria-live="polite">' + esc(brainSaveStatus) + '</div>';
    }
    return '<section class="hb-brain-focus" aria-labelledby="hb-brain-stage-title">'
      + '<div class="hb-brain-count">0' + (index + 1) + '</div>'
      + '<div class="hb-kicker">' + esc(stage.label) + '</div>'
      + '<h3 id="hb-brain-stage-title">' + esc(stage.title) + '</h3>'
      + '<p>' + esc(stage.body) + '</p>'
      + '<div class="hb-brain-action">' + esc(stage.prompt) + '</div>'
      + controls
      + '</section>';
  }

  function renderBrainChamber() {
    var element = panel();
    if (!element || !BRAIN || !BRAIN.stages.length) return;
    var stage = BRAIN.stages[Math.max(0, Math.min(brainStep, BRAIN.stages.length - 1))];
    var nav = BRAIN.stages.map(function renderStageTab(item, index) {
      var state = index === brainStep ? " active" : index < brainStep ? " visited" : "";
      return '<button type="button" class="hb-brain-tab' + state + '" onclick="HearthBody.openBrainStep(' + index + ')" aria-current="' + (index === brainStep ? "step" : "false") + '"><span>0' + (index + 1) + '</span>' + esc(item.label) + '</button>';
    }).join("");
    var previous = brainStep > 0
      ? '<button type="button" class="hb-brain-button secondary" onclick="HearthBody.openBrainStep(' + (brainStep - 1) + ')">&larr; Previous</button>'
      : '<span></span>';
    var next = brainStep < BRAIN.stages.length - 1
      ? '<button type="button" class="hb-brain-button" onclick="HearthBody.openBrainStep(' + (brainStep + 1) + ')">Continue &rarr;</button>'
      : '<button type="button" class="hb-brain-button" onclick="HearthBody.saveBrainReflection()">Save observation</button>';

    element.innerHTML = '<div class="hb-chamber hb-brain-chamber">'
      + chamberBackButton()
      + '<section class="hb-brain-stage">'
      + '<div class="hb-brain-visual">'
      + '<img src="images/hearth/hearth-inner-instrument-master-v2.png" alt="Brain and nervous system inside the guitar learner">'
      + '<div class="hb-brain-glow" aria-hidden="true"></div>'
      + '<div class="hb-brain-guide"><img src="images/character-generated/guide-head-lightbulb-v1-ui.webp" alt=""><p>Your brain is learning relationships, not collecting isolated facts.</p></div>'
      + '</div>'
      + '<div class="hb-brain-work">'
      + '<header><div class="hb-kicker">Brain and nervous system</div><h2>Build a map to home</h2><p>Use one A root to feel how sound, movement, attention, and prediction become a musical map.</p></header>'
      + '<nav class="hb-brain-tabs" aria-label="Brain chamber stages">' + nav + '</nav>'
      + brainStepHtml(stage, brainStep)
      + '<div class="hb-brain-actions">' + previous + next + '</div>'
      + '</div></section></div>';
  }

  function renderHearthChamber(zoneId) {
    var zone = zoneById(zoneId);
    if (!zone) {
      renderHearthBody();
      return;
    }
    activeZone = zone.id;
    if (zone.id === "brain") renderBrainChamber();
    else renderSystemChamber(zone);
  }

  function brainEventOptions(reflection) {
    var learner = activeLearner();
    var handoff = activeHandoff || readHearthHandoff();
    var suffix = Date.now().toString(36);
    return {
      learnerId: learner && learner.id,
      journeyLevelId: handoff && handoff.journey_level_id || "L1",
      lessonId: handoff && handoff.lesson_id || null,
      activityId: handoff && handoff.activity_id || "hearth-brain-pattern-map",
      handoffId: handoff && handoff.id || null,
      attemptId: handoff && handoff.attempt_id || "hearth-brain-attempt-" + suffix,
      sessionId: handoff && handoff.session_id || "hearth-brain-session-" + suffix,
      returnRoute: handoff && handoff.return_route || null,
      suffix: suffix,
      reflection: reflection
    };
  }

  root.HearthBody = {
    hoverZone: function hoverZone(id) {
      var zone = zoneById(id);
      if (!zone) return;
      var guide = document.getElementById("hb-guide-copy");
      if (guide) guide.textContent = zone.guide;
      document.querySelectorAll(".hb-hotspot").forEach(function setHotspotState(button) {
        button.classList.toggle("active", button.getAttribute("data-zone") === zone.id);
      });
    },
    unhoverZone: function unhoverZone() {
      var guide = document.getElementById("hb-guide-copy");
      if (guide) guide.textContent = COPY.guide || "The guitar is the outer instrument. The learner is the inner instrument.";
      document.querySelectorAll(".hb-hotspot").forEach(function clearHotspotState(button) {
        button.classList.remove("active");
      });
    },
    openZone: function openZone(id) {
      brainStep = 0;
      brainObservation = "";
      brainNote = "";
      brainSaveStatus = "";
      renderHearthChamber(normalizeZoneId(id));
    },
    openBrainStep: function openBrainStep(index) {
      var noteField = document.getElementById("hb-brain-note");
      if (noteField) brainNote = noteField.value;
      brainStep = Math.max(0, Math.min(Number(index) || 0, BRAIN.stages.length - 1));
      brainSaveStatus = "";
      renderBrainChamber();
    },
    chooseBrainObservation: function chooseBrainObservation(id) {
      var noteField = document.getElementById("hb-brain-note");
      if (noteField) brainNote = noteField.value;
      brainObservation = id;
      brainSaveStatus = "";
      renderBrainChamber();
    },
    saveBrainReflection: function saveBrainReflection() {
      var noteField = document.getElementById("hb-brain-note");
      if (noteField) brainNote = noteField.value;
      var reflection = BRAIN.validateReflection({ observationId: brainObservation, note: brainNote });
      if (!reflection.valid) {
        brainSaveStatus = reflection.error;
        renderBrainChamber();
        return;
      }
      var events = BRAIN.buildEvents(brainEventOptions({ observationId: brainObservation, note: brainNote }));
      if (!events.length || !root.HearthProgressEvents || typeof root.HearthProgressEvents.appendResult !== "function") {
        brainSaveStatus = "Choose an active learner before saving this observation.";
        renderBrainChamber();
        return;
      }
      var results = events.map(function appendEvent(event) {
        return root.HearthProgressEvents.appendResult(event, root.localStorage);
      });
      var saved = results.every(function eventSaved(result) {
        return result && result.ok;
      });
      var learner = activeLearner();
      brainSaveStatus = saved
        ? "Saved for " + ((learner && learner.name) || "the active learner") + ". Journey can now use this observation."
        : "The observation could not be saved. Your existing progress was not changed.";
      renderBrainChamber();
    },
    openWithHandoff: function openWithHandoff(handoff) {
      activeHandoff = handoff || readHearthHandoff();
      var zoneId = activeHandoff && activeHandoff.task && activeHandoff.task.parameters && activeHandoff.task.parameters.zone_id;
      activeZone = normalizeZoneId(zoneId || "");
      if (activeZone) renderHearthChamber(activeZone);
      else renderHearthBody();
    },
    returnToSource: function returnToSource() {
      var handoff = activeHandoff || readHearthHandoff();
      var route = handoff && handoff.return_route;
      var store = handoffStore();
      if (store && handoff) store.clear(handoff.id);
      activeHandoff = null;
      activeZone = null;
      if (route && route.node_id === "journey" && root.Journey) {
        var params = route.params || {};
        if (typeof root.Journey.openCompanionLesson === "function") root.Journey.openCompanionLesson(params.learner_id);
        if (typeof root.Journey.focusCompanionStep === "function" && Number.isFinite(Number(params.step_index))) {
          root.Journey.focusCompanionStep(Number(params.step_index));
        }
        return;
      }
      if (typeof root.backToMap === "function") root.backToMap();
    },
    back: function back() {
      activeZone = null;
      renderHearthBody();
    },
    activeZone: function getActiveZone() {
      return activeZone;
    }
  };

  root.showHearth = function showHearth() {
    activeHandoff = readHearthHandoff();
    renderHearthBody();
  };

  root.HearthBodyViewer = {
    renderHearthBody: renderHearthBody,
    renderHearthChamber: renderHearthChamber,
    renderBrainChamber: renderBrainChamber
  };
})(window);
