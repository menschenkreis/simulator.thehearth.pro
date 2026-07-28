/*
 * Practice metronome controller adapter v0.
 *
 * Runs the legacy Practice candle timer and Web Audio metronome controls.
 */
(function initPracticeMetronomeController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthPracticeMetronomeController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPracticeMetronomeController(root) {
  "use strict";

  function createState(startBpm, sessionMinutes, now) {
    now = now || Date.now();
    return {
      beat: 0,
      bpm: startBpm,
      ctx: null,
      interval: null,
      playing: false,
      targetSeconds: sessionMinutes * 60,
      timerInterval: null,
      timerStart: now,
      timeUp: false,
      ts: 4
    };
  }

  function clampBpm(value) {
    return Math.max(30, Math.min(220, value));
  }

  function intervalMs(bpm) {
    return 60000 / bpm;
  }

  function toggle(metro, doc, tickFn) {
    if (!metro) return;
    doc = doc || root.document;
    tickFn = tickFn || tick;
    if (metro.playing) {
      metro.playing = false;
      clearInterval(metro.interval);
      var stopToggle = doc && doc.getElementById("metro-toggle");
      if (stopToggle) stopToggle.textContent = "▶";
      return;
    }
    metro.playing = true;
    if (!metro.ctx) metro.ctx = new (root.AudioContext || root.webkitAudioContext)();
    metro.beat = 0;
    metro.interval = setInterval(function onBeat() {
      tickFn(metro);
    }, intervalMs(metro.bpm));
    var startToggle = doc && doc.getElementById("metro-toggle");
    if (startToggle) startToggle.textContent = "⏸";
  }

  function tick(metro) {
    if (!metro || !metro.ctx) return;
    var osc = metro.ctx.createOscillator();
    var gain = metro.ctx.createGain();
    osc.connect(gain);
    gain.connect(metro.ctx.destination);
    osc.frequency.value = metro.beat === 0 ? 1000 : 800;
    gain.gain.value = 0.15;
    osc.start(metro.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, metro.ctx.currentTime + 0.08);
    osc.stop(metro.ctx.currentTime + 0.08);
    metro.beat = (metro.beat + 1) % metro.ts;
  }

  function adjustBpm(metro, delta, doc, tickFn) {
    if (!metro) return;
    doc = doc || root.document;
    metro.bpm = clampBpm(metro.bpm + delta);
    var display = doc && doc.getElementById("bpm-display");
    if (display) display.textContent = metro.bpm;
    if (metro.playing) {
      clearInterval(metro.interval);
      metro.interval = setInterval(function onBeat() {
        (tickFn || tick)(metro);
      }, intervalMs(metro.bpm));
    }
  }

  function setTimeSignature(metro, ts, candleColor, doc) {
    if (!metro) return;
    doc = doc || root.document;
    metro.ts = ts;
    metro.beat = 0;
    [4, 3, 6].forEach(function updateButton(value) {
      var btn = doc && doc.getElementById("ts-" + value);
      if (!btn) return;
      if (value === ts) {
        btn.style.borderColor = candleColor;
        btn.style.background = candleColor + "20";
        btn.style.color = candleColor;
      } else {
        btn.style.borderColor = "var(--border)";
        btn.style.background = "var(--card)";
        btn.style.color = "var(--dim)";
      }
    });
  }

  function timerState(metro, now) {
    now = now || Date.now();
    var elapsed = Math.floor((now - metro.timerStart) / 1000);
    var remaining = Math.max(0, (metro.targetSeconds || 0) - elapsed);
    var progress = metro.targetSeconds ? Math.min(1, elapsed / metro.targetSeconds) : 0;
    return {
      burn: Math.max(0.08, 1 - progress),
      brightness: Math.max(0.28, 1 - progress * 0.72),
      elapsed: elapsed,
      remaining: remaining,
      text: String(Math.floor(remaining / 60)).padStart(2, "0") + ":" + String(remaining % 60).padStart(2, "0")
    };
  }

  function updateTimer(metro, doc, now) {
    if (!metro) return;
    doc = doc || root.document;
    var state = timerState(metro, now);
    var display = doc && doc.getElementById("timer-display");
    if (display) display.textContent = state.text;
    var candle = doc && doc.getElementById("session-candle");
    if (candle) {
      candle.style.setProperty("--burn", (state.burn * 100).toFixed(1) + "%");
      candle.style.setProperty("--flame-bright", state.brightness.toFixed(3));
    }
    var flame = doc && doc.getElementById("candle-flame");
    if (flame) flame.style.opacity = String(Math.max(0.32, state.brightness));
    if (state.remaining <= 0 && !metro.timeUp) {
      metro.timeUp = true;
      if (metro.interval) clearInterval(metro.interval);
      metro.playing = false;
      var toggleBtn = doc && doc.getElementById("metro-toggle");
      if (toggleBtn) toggleBtn.textContent = "▶";
      var note = doc && doc.querySelector(".practice-panel-title");
      if (note) note.textContent = "Candle Complete";
    }
  }

  function startTimer(metro, doc) {
    if (!metro) return;
    doc = doc || root.document;
    metro.timerStart = Date.now();
    metro.timerInterval = setInterval(function onTimer() {
      updateTimer(metro, doc);
    }, 1000);
  }

  function stopTimer(metro, now) {
    if (!metro) return;
    if (metro.interval) clearInterval(metro.interval);
    if (metro.timerInterval) clearInterval(metro.timerInterval);
    metro.playing = false;
    now = now || Date.now();
    var elapsed = metro.timerStart ? Math.round((now - metro.timerStart) / 60000) : 0;
    return Math.max(elapsed, 1);
  }

  return {
    version: "0.1.0",
    adjustBpm: adjustBpm,
    clampBpm: clampBpm,
    createState: createState,
    intervalMs: intervalMs,
    setTimeSignature: setTimeSignature,
    startTimer: startTimer,
    stopTimer: stopTimer,
    tick: tick,
    timerState: timerState,
    toggle: toggle,
    updateTimer: updateTimer
  };
});
