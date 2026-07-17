/* global window, document, localStorage */
(function(root) {
  "use strict";

  var PRACTICE_CANDLE = {
    durationMinutes: 20,
    focus: "Clean",
    timerId: null,
    startedAt: null,
    totalMs: 20 * 60 * 1000,
    running: false,
    complete: false
  };

  function panel() {
    document.querySelectorAll(".pnl").forEach(function(item) {
      item.classList.remove("on");
    });
    var el = document.getElementById("p-foundation");
    if (el) el.classList.add("on");
    return el;
  }

  function setPracticeDuration(minutes) {
    PRACTICE_CANDLE.durationMinutes = minutes;
    PRACTICE_CANDLE.totalMs = minutes * 60 * 1000;
    updatePracticeTimeReadout(PRACTICE_CANDLE.totalMs);
    renderPracticeCandle();
  }

  function setPracticeFocus(focus) {
    PRACTICE_CANDLE.focus = focus;
    renderPracticeCandle();
  }

  function lightPracticeCandle() {
    if (PRACTICE_CANDLE.running) return;
    PRACTICE_CANDLE.startedAt = Date.now();
    PRACTICE_CANDLE.running = true;
    PRACTICE_CANDLE.complete = false;
    clearInterval(PRACTICE_CANDLE.timerId);
    PRACTICE_CANDLE.timerId = setInterval(updatePracticeCandle, 250);
    updatePracticeCandle();
  }

  function endPracticeCandle() {
    clearInterval(PRACTICE_CANDLE.timerId);
    PRACTICE_CANDLE.running = false;
    PRACTICE_CANDLE.complete = true;
    setPracticeCandleVisual(1, true);
    showPracticeReflection();
  }

  function updatePracticeCandle() {
    var elapsed = Date.now() - PRACTICE_CANDLE.startedAt;
    var progress = Math.min(1, elapsed / PRACTICE_CANDLE.totalMs);
    var remaining = Math.max(0, PRACTICE_CANDLE.totalMs - elapsed);
    setPracticeCandleVisual(progress, false);
    updatePracticeTimeReadout(remaining);
    if (progress >= 1) endPracticeCandle();
  }

  function setPracticeCandleVisual(progress, complete) {
    var flame = document.getElementById("practiceFlameGroup");
    var glow = document.getElementById("practiceCandleGlow");
    var clip = document.getElementById("practiceWaxClipRect");
    var ember = document.getElementById("practiceEmber");
    var wick = document.getElementById("practiceWickPath");
    if (!flame || !glow || !clip || !ember) return;

    if (complete) {
      flame.style.opacity = "0";
      flame.style.transition = "opacity 1.2s";
      glow.style.opacity = "0";
      glow.style.transition = "opacity 1.2s";
      ember.style.opacity = "1";
      ember.style.transition = "opacity 0.8s";
      if (wick) wick.style.opacity = "0.3";
      return;
    }

    var waxVisible = Math.max(0.18, 1 - progress * 0.82);
    var flameScale = Math.max(0.32, 1 - progress * 0.62);
    var glowOpacity = Math.max(0.12, 1 - progress * 0.75);
    var fullHeight = 220;
    var newHeight = fullHeight * waxVisible;
    var newY = 126 + (fullHeight - newHeight);

    flame.style.opacity = "1";
    flame.style.transform = "translate(130px, 76px) scale(" + flameScale + ")";
    glow.style.opacity = String(glowOpacity);
    ember.style.opacity = "0";
    clip.setAttribute("y", String(newY));
    clip.setAttribute("height", String(newHeight));
  }

  function updatePracticeTimeReadout(ms) {
    var el = document.getElementById("practiceTimeReadout");
    if (!el) return;
    var totalSeconds = Math.ceil(ms / 1000);
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = String(totalSeconds % 60).padStart(2, "0");
    el.textContent = minutes + ":" + seconds;
  }

  function showPracticeReflection() {
    var reflectionPanel = document.getElementById("practiceReflectionPanel");
    if (reflectionPanel) reflectionPanel.hidden = false;
  }

  function savePracticeEmber() {
    var feeling = (document.getElementById("practiceFeeling") || {}).value || "";
    var blockers = (document.getElementById("practiceBlockers") || {}).value || "";
    var nextStep = (document.getElementById("practiceNextStep") || {}).value || "";
    var key = "hearth-practice-log";
    var existing = JSON.parse(localStorage.getItem(key) || "[]");

    existing.push({
      id: "practice-" + Date.now(),
      date: new Date().toISOString(),
      minutes: PRACTICE_CANDLE.durationMinutes,
      focus: PRACTICE_CANDLE.focus,
      feeling: feeling,
      blockers: blockers.split(",").map(function(item) { return item.trim(); }).filter(Boolean),
      nextStep: nextStep
    });
    localStorage.setItem(key, JSON.stringify(existing));

    if (root.HearthProgressEvents) {
      root.HearthProgressEvents.append({
        event_type: "practice_session_completed",
        node_id: "practise",
        duration_minutes: PRACTICE_CANDLE.durationMinutes,
        note: nextStep,
        data: {
          focus: PRACTICE_CANDLE.focus,
          feeling: feeling,
          blockers: blockers.split(",").map(function(item) { return item.trim(); }).filter(Boolean)
        }
      });
    }
    renderPracticeCandle();
  }

  function renderPracticeCandle() {
    var el = panel();
    if (!el) return;
    var durations = [5, 10, 20, 30];
    var focuses = ["Warm", "Clean", "Groove", "Carry"];
    var running = PRACTICE_CANDLE.running;
    var complete = PRACTICE_CANDLE.complete;

    var durationPills = durations.map(function(minutes) {
      var active = PRACTICE_CANDLE.durationMinutes === minutes;
      return '<button class="practice-pill' + (active ? " active" : "") + '" onclick="PracticeCandle.practiceDuration(' + minutes + ')">' + minutes + "m</button>";
    }).join("");

    var focusPills = focuses.map(function(focus) {
      var active = PRACTICE_CANDLE.focus === focus;
      return '<button class="practice-pill' + (active ? " active" : "") + '" onclick="PracticeCandle.practiceFocus(\'' + focus + '\')">' + focus + "</button>";
    }).join("");

    var controls = '<div class="practice-session-controls" id="practiceControls"' + (running || complete ? " hidden" : "") + ">"
      + '<div class="practice-choice-label">Candle Length</div>'
      + '<div class="practice-choice-row">' + durationPills + '</div>'
      + '<div class="practice-choice-label">Focus</div>'
      + '<div class="practice-choice-row">' + focusPills + '</div>'
      + '<button class="practice-light-btn" onclick="PracticeCandle.lightCandle()">Light Candle</button>'
      + '</div>';

    var reflection = '<div class="practice-reflection-panel" id="practiceReflectionPanel"' + (complete ? "" : " hidden") + ">"
      + "<h3>Leave an Ember</h3>"
      + "<label>What happened?</label>"
      + '<textarea id="practiceFeeling" rows="3"></textarea>'
      + "<label>What blocked you?</label>"
      + '<input id="practiceBlockers" placeholder="buzzing, rushing, tension">'
      + "<label>What should return next time?</label>"
      + '<input id="practiceNextStep" placeholder="repeat slower tomorrow">'
      + '<button class="practice-light-btn" onclick="PracticeCandle.saveEmber()">Save Ember</button>'
      + '</div>';

    var animation = running
      ? '<animate attributeName="d" dur="1.4s" repeatCount="indefinite" values="M0,-58 C28,-24 30,10 0,42 C-30,10 -24,-22 0,-58Z;M0,-52 C25,-20 28,12 0,44 C-28,12 -22,-18 0,-52Z;M0,-58 C28,-24 30,10 0,42 C-30,10 -24,-22 0,-58Z"/>'
      : "";

    var svg = '<svg class="practice-candle-svg" viewBox="0 0 260 420" role="img" aria-label="Practice candle timer">'
      + '<defs>'
        + '<radialGradient id="practiceFlameGlow" cx="50%" cy="50%" r="55%">'
          + '<stop offset="0%" stop-color="#ffd36a" stop-opacity="0.85"/>'
          + '<stop offset="45%" stop-color="#e8a020" stop-opacity="0.28"/>'
          + '<stop offset="100%" stop-color="#e8a020" stop-opacity="0"/>'
        + '</radialGradient>'
        + '<linearGradient id="practiceWax" x1="0" x2="0" y1="0" y2="1">'
          + '<stop offset="0%" stop-color="#f4d89a"/>'
          + '<stop offset="45%" stop-color="#d7a94f"/>'
          + '<stop offset="100%" stop-color="#8a5a22"/>'
        + '</linearGradient>'
        + '<linearGradient id="practiceWick" x1="0" x2="0" y1="0" y2="1">'
          + '<stop offset="0%" stop-color="#3c2a18"/>'
          + '<stop offset="100%" stop-color="#100b06"/>'
        + '</linearGradient>'
        + '<filter id="practiceSoftGlow">'
          + '<feGaussianBlur stdDeviation="8" result="blur"/>'
          + '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>'
        + '</filter>'
      + '</defs>'
      + '<ellipse cx="130" cy="372" rx="92" ry="22" fill="rgba(0,0,0,0.35)"/>'
      + '<g id="practiceCandleGlow" style="opacity:0">'
        + '<circle cx="130" cy="86" r="96" fill="url(#practiceFlameGlow)"/>'
      + '</g>'
      + '<g id="practiceFlameGroup" transform="translate(130 76) scale(1)" style="opacity:0;transform-origin:130px 76px">'
        + '<path d="M0,-58 C28,-24 30,10 0,42 C-30,10 -24,-22 0,-58Z" fill="#e8a020" filter="url(#practiceSoftGlow)">'
          + animation
        + '</path>'
        + '<path d="M0,-28 C14,-8 13,15 0,31 C-14,15 -12,-8 0,-28Z" fill="#ffe6a3"/>'
      + '</g>'
      + '<path id="practiceWickPath" d="M130,132 C128,116 132,101 130,88" stroke="url(#practiceWick)" stroke-width="5" stroke-linecap="round" fill="none"/>'
      + '<clipPath id="practiceWaxClip">'
        + '<rect id="practiceWaxClipRect" x="74" y="126" width="112" height="220" rx="28"/>'
      + '</clipPath>'
      + '<rect x="74" y="126" width="112" height="220" rx="28" fill="rgba(80,48,18,0.45)"/>'
      + '<g clip-path="url(#practiceWaxClip)">'
        + '<rect id="practiceWaxBody" x="74" y="126" width="112" height="220" rx="28" fill="url(#practiceWax)"/>'
        + '<path d="M77,152 C95,142 109,160 130,150 C151,140 165,154 183,146 L183,126 L77,126Z" fill="#ffe2a6" opacity="0.82"/>'
      + '</g>'
      + '<rect x="74" y="126" width="112" height="220" rx="28" fill="none" stroke="rgba(255,220,150,0.45)" stroke-width="2"/>'
      + '<g id="practiceEmber" style="opacity:0">'
        + '<circle cx="130" cy="114" r="8" fill="#e8731a" filter="url(#practiceSoftGlow)"/>'
        + '<circle cx="130" cy="114" r="3" fill="#ffd36a"/>'
      + '</g>'
      + '</svg>';

    el.innerHTML =
      '<div class="sk-wrap">'
        + '<button class="back-btn" onclick="backToMap()">&larr; Map</button>'
        + '<div class="sk-scene">'
          + '<div class="sk-top">'
            + '<div><div class="sk-kicker">Practise Room</div>'
            + '<div class="sk-title">Candle Timer</div>'
            + '<div class="sk-sub">One candle. One intention. Light the candle to begin your practice session.</div></div>'
            + '<div class="sk-guide">'
              + '<img src="images/character-full/Encouraging.png" alt="">'
              + '<div>' + (running ? "The candle is burning. Focus on your practice." : "The candle is ready. Choose your duration and focus, then light it.") + '</div>'
            + '</div>'
          + '</div>'
          + '<div class="practice-candle-stage">'
            + svg
            + '<div class="practice-time-readout" id="practiceTimeReadout">' + (complete ? "Session complete" : PRACTICE_CANDLE.durationMinutes + ":00") + '</div>'
          + '</div>'
        + '</div>'
        + controls
        + reflection
      + '</div>';

    if (running) {
      updatePracticeCandle();
    } else if (!complete) {
      var flame = document.getElementById("practiceFlameGroup");
      var glow = document.getElementById("practiceCandleGlow");
      if (flame) flame.style.opacity = "0";
      if (glow) glow.style.opacity = "0";
    }
  }

  function showPractice() {
    PRACTICE_CANDLE.running = false;
    PRACTICE_CANDLE.complete = false;
    clearInterval(PRACTICE_CANDLE.timerId);
    renderPracticeCandle();
  }

  function openPracticeCandle(options) {
    options = options || {};
    if (!options.preserve) {
      clearInterval(PRACTICE_CANDLE.timerId);
      PRACTICE_CANDLE.durationMinutes = Number(options.durationMinutes) || PRACTICE_CANDLE.durationMinutes || 20;
      PRACTICE_CANDLE.totalMs = PRACTICE_CANDLE.durationMinutes * 60 * 1000;
      PRACTICE_CANDLE.focus = options.focus || PRACTICE_CANDLE.focus || "Clean";
      PRACTICE_CANDLE.startedAt = null;
      PRACTICE_CANDLE.running = false;
      PRACTICE_CANDLE.complete = false;
    }
    renderPracticeCandle();
  }

  root.PracticeCandle = {
    practiceDuration: setPracticeDuration,
    practiceFocus: setPracticeFocus,
    lightCandle: lightPracticeCandle,
    open: openPracticeCandle,
    saveEmber: savePracticeEmber,
    render: renderPracticeCandle,
    state: function() { return PRACTICE_CANDLE; }
  };
  root.showPractice = showPractice;

  root.SceneFirst = Object.assign(root.SceneFirst || {}, {
    practiceDuration: setPracticeDuration,
    practiceFocusNew: setPracticeFocus,
    lightCandle: lightPracticeCandle,
    saveEmber: savePracticeEmber
  });
})(window);
