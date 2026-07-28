/*
 * Practice planned session viewer v0.
 *
 * Renders the guided Practice loop that sits between Journey recommendations
 * and the Do/candle tools.
 */
(function initPracticePlannedSessionViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthPracticePlannedSessionViewer = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPracticePlannedSessionViewer() {
  "use strict";

  var steps = [
    { id: "arrive", title: "Arrive", short: "Arrive", cue: "Body check", node: "Practice" },
    { id: "focus", title: "Choose the focus", short: "Focus", cue: "What needs repetition?", node: "Journey" },
    { id: "conditions", title: "Set conditions", short: "Set", cue: "Time, BPM, clean target", node: "Practice" },
    { id: "practise", title: "Practise", short: "Practise", cue: "Use the drill without rushing", node: "Do" },
    { id: "listen", title: "Listen", short: "Listen", cue: "Record or replay honestly", node: "Tool" },
    { id: "reflect", title: "Reflect", short: "Reflect", cue: "What returns tomorrow?", node: "Hearth" }
  ];

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function createSession(snapshot, options) {
    options = options || {};
    var recommendations = (snapshot && snapshot.recommendations || []).slice(0, 5);
    var focus = options.focus || snapshot && snapshot.commitment && snapshot.commitment.today || recommendations[0] || "One small clean practice step.";
    return {
      id: "practice-session-" + Date.now(),
      stepIndex: 0,
      saved: false,
      learner: snapshot && snapshot.learner || { id: null, name: "My Journey" },
      recommendations: recommendations,
      focus: focus,
      minutes: snapshot && snapshot.commitment && snapshot.commitment.targetMinutes || 20,
      bpm: 60,
      repetitions: 3,
      cleanTakeGoal: 1,
      bodyState: "ready",
      bodyCheck: "",
      drillNote: "",
      recordingCaptured: false,
      recordingNote: "",
      reflectionImproved: "",
      reflectionHard: "",
      reflectionReturn: snapshot && snapshot.commitment && snapshot.commitment.tomorrow || ""
    };
  }

  function progressText(session) {
    return (session.stepIndex + 1) + " of " + steps.length;
  }

  function stepRail(session) {
    return '<div class="practice-flow-rail" role="tablist" aria-label="Practice steps">' + steps.map(function renderStep(step, index) {
      var state = index === session.stepIndex ? " is-current" : index < session.stepIndex ? " is-done" : "";
      return '<button type="button" class="practice-flow-step' + state + '" data-practice-flow-step="' + index + '" role="tab" aria-selected="' + (index === session.stepIndex ? "true" : "false") + '">' +
        '<span>' + escapeHtml(index + 1) + '</span><b>' + escapeHtml(step.short) + '</b>' +
      '</button>';
    }).join("") + "</div>";
  }

  function fieldInput(name, value, type, attrs) {
    return '<input type="' + escapeHtml(type || "text") + '" value="' + escapeHtml(value) + '" data-practice-flow-field="' + escapeHtml(name) + '"' + (attrs || "") + ">";
  }

  function fieldTextarea(name, value, placeholder) {
    return '<textarea data-practice-flow-field="' + escapeHtml(name) + '" placeholder="' + escapeHtml(placeholder || "") + '">' + escapeHtml(value) + "</textarea>";
  }

  function conditionField(name, label, value, min, max, cue) {
    return '<label class="practice-flow-condition">' +
      '<span class="practice-flow-condition-orb"><em>' + escapeHtml(label) + '</em>' + fieldInput(name, value, "number", ' min="' + min + '" max="' + max + '"') + '</span>' +
      '<small>' + escapeHtml(cue) + '</small>' +
    '</label>';
  }

  function focusOptions(session) {
    var items = session.recommendations.length ? session.recommendations.slice(0, 3) : [session.focus];
    return '<div class="practice-flow-focus-list" aria-label="Recommended practice focuses">' + items.map(function renderChoice(item, index) {
      var selected = item === session.focus;
      return '<button type="button" class="practice-flow-focus-choice' + (selected ? " is-selected" : "") + '" data-practice-flow-focus="' + escapeHtml(item) + '">' +
        '<span class="practice-flow-focus-orb" aria-hidden="true"><i>' + escapeHtml(index + 1) + '</i></span>' +
        '<b>' + escapeHtml(item) + '</b>' +
      '</button>';
    }).join("") + "</div>";
  }

  function bodyOptions(session) {
    var options = [
      { id: "ready", label: "Ready", cue: "Warm and easy" },
      { id: "stretch", label: "Stretch first", cue: "Take one minute" },
      { id: "tension", label: "Holding tension", cue: "Begin more slowly" }
    ];
    return '<div class="practice-flow-body-signals" aria-label="How does your body feel?">' + options.map(function renderBodyOption(option) {
      var selected = session.bodyState === option.id;
      return '<button type="button" class="practice-flow-body-signal' + (selected ? " is-selected" : "") + '" data-practice-body-state="' + option.id + '" aria-pressed="' + (selected ? "true" : "false") + '">' +
        '<span aria-hidden="true"></span><b>' + escapeHtml(option.label) + '</b><small>' + escapeHtml(option.cue) + '</small>' +
      '</button>';
    }).join("") + "</div>";
  }

  function renderStepBody(session) {
    var step = steps[session.stepIndex] || steps[0];
    if (step.id === "arrive") {
      return '<div class="practice-flow-body practice-flow-body--arrive">' +
        '<p class="practice-flow-question">How are you arriving at the guitar?</p>' +
        '<p class="practice-flow-guidance">Notice the jaw, shoulders, hands, and breath. Nothing needs fixing before it can be noticed.</p>' +
        bodyOptions(session) +
        '<label class="practice-flow-quiet-note"><span>Optional body note</span>' + fieldInput("bodyCheck", session.bodyCheck, "text", ' placeholder="Shoulders tight; hands feel warm"') + '</label>' +
      "</div>";
    }
    if (step.id === "focus") {
      return '<div class="practice-flow-body practice-flow-body--focus">' +
        '<p class="practice-flow-question">What deserves your attention today?</p>' +
        '<p class="practice-flow-guidance">Journey and your recent notes offer three starting points. Choose one; the rest can wait.</p>' +
        focusOptions(session) +
        '<label class="practice-flow-quiet-note"><span>Write a different focus</span>' + fieldInput("focus", session.focus) + '</label>' +
      "</div>";
    }
    if (step.id === "conditions") {
      return '<div class="practice-flow-body practice-flow-body--conditions">' +
        '<p class="practice-flow-question">Set a kind, measurable container.</p>' +
        '<p class="practice-flow-guidance">These are boundaries for attention, not a test you can fail.</p>' +
        '<div class="practice-flow-condition-grid">' +
          conditionField("minutes", "Minutes", session.minutes, 1, 90, "Session") +
          conditionField("bpm", "BPM", session.bpm, 30, 220, "Starting tempo") +
          conditionField("repetitions", "Reps", session.repetitions, 1, 50, "Patient repeats") +
          conditionField("cleanTakeGoal", "Clean", session.cleanTakeGoal, 1, 10, "Clear takes") +
        "</div>" +
      "</div>";
    }
    if (step.id === "practise") {
      return '<div class="practice-flow-body practice-flow-body--practise">' +
        '<p class="practice-flow-question">Find the movement. Then stay with it.</p>' +
        '<p class="practice-flow-guidance">Today&apos;s focus: <strong>' + escapeHtml(session.focus) + '</strong></p>' +
        '<div class="practice-flow-practise-path" aria-label="Practice handoff">' +
          '<button type="button" class="practice-flow-path-stop" data-practice-flow-action="open-do">' +
            '<span aria-hidden="true">1</span><b>Open the drill</b><small>Do</small>' +
          '</button>' +
          '<i aria-hidden="true"></i>' +
          '<button type="button" class="practice-flow-path-stop is-primary" data-practice-flow-action="open-candle">' +
            '<span aria-hidden="true">2</span><b>Begin repetition</b><small>Candle timer</small>' +
          '</button>' +
        '</div>' +
        '<label class="practice-flow-quiet-note"><span>Small drill note</span>' + fieldInput("drillNote", session.drillNote, "text", ' placeholder="Drill, BPM, or one thing to notice"') + '</label>' +
      "</div>";
    }
    if (step.id === "listen") {
      return '<div class="practice-flow-body practice-flow-body--listen">' +
        '<p class="practice-flow-question">Listen like a teacher, not a judge.</p>' +
        '<p class="practice-flow-guidance">Capture one short take. Play it back once, then name only what you can actually hear.</p>' +
        '<div class="practice-flow-listen-path" aria-label="Listening check">' +
          '<div class="practice-flow-listen-stop">' +
            '<button type="button" class="practice-flow-record-orb" id="practice-rec-btn" data-practice-flow-action="toggle-record" aria-pressed="false">' +
              '<span class="practice-flow-record-mark" aria-hidden="true"></span>' +
              '<b data-recorder-label>Capture one take</b>' +
            '</button>' +
            '<small id="practice-rs">Microphone starts only when you choose</small>' +
          '</div>' +
          '<i aria-hidden="true"></i>' +
          '<div class="practice-flow-listen-stop practice-flow-playback-stop">' +
            '<span class="practice-flow-listen-orb" aria-hidden="true">2</span>' +
            '<b>Play it back once</b>' +
            '<audio id="practice-playback" class="practice-flow-playback" controls hidden></audio>' +
            '<button type="button" class="practice-flow-reset-recording" data-practice-flow-action="clear-recording" hidden>Try another take</button>' +
          '</div>' +
        '</div>' +
        '<label class="practice-flow-quiet-note practice-flow-listening-note"><span>What did you notice?</span>' + fieldInput("recordingNote", session.recordingNote, "text", ' placeholder="Even pulse, string noise, a cleaner change..."') + '</label>' +
      "</div>";
    }
    if (session.saved) {
      return '<div class="practice-flow-body practice-flow-body--reflect practice-flow-body--complete">' +
        '<p class="practice-flow-question">The session is set.</p>' +
        '<p class="practice-flow-guidance">Tomorrow begins with what you noticed today.</p>' +
        '<div class="practice-flow-review" aria-label="Practice review">' +
          '<div><span>Focus</span><b>' + escapeHtml(session.focus) + '</b></div>' +
          '<div><span>Improved</span><b>' + escapeHtml(session.reflectionImproved || "Notice it again next time") + '</b></div>' +
          '<div><span>Bring back</span><b>' + escapeHtml(session.reflectionReturn || session.reflectionHard || session.focus) + '</b></div>' +
        '</div>' +
        '<p class="practice-flow-tomorrow"><span>Tomorrow</span>' + escapeHtml(session.reflectionReturn || session.reflectionHard || session.focus) + '</p>' +
      '</div>';
    }
    return '<div class="practice-flow-body practice-flow-body--reflect">' +
      '<p class="practice-flow-question">What should tomorrow remember?</p>' +
      '<p class="practice-flow-guidance">Three short truths are enough. They shape the next Practice recommendation.</p>' +
      '<div class="practice-flow-reflection-path">' +
        '<label><span class="practice-flow-reflection-orb">1</span><b>What improved?</b>' + fieldTextarea("reflectionImproved", session.reflectionImproved, "A roots felt more secure") + '</label>' +
        '<i aria-hidden="true"></i>' +
        '<label><span class="practice-flow-reflection-orb">2</span><b>What stayed difficult?</b>' + fieldTextarea("reflectionHard", session.reflectionHard, "I rushed when changing strings") + '</label>' +
        '<i aria-hidden="true"></i>' +
        '<label><span class="practice-flow-reflection-orb">3</span><b>Bring back next time</b>' + fieldTextarea("reflectionReturn", session.reflectionReturn, "60 BPM, box 1 roots, one jam") + '</label>' +
      '</div>' +
    "</div>";
  }

  function render(session) {
    var step = steps[session.stepIndex] || steps[0];
    var canGoBack = session.stepIndex > 0;
    var isLast = session.stepIndex >= steps.length - 1;
    var primaryAction = isLast ? (session.saved ? "entry" : "save") : "next";
    var primaryLabel = isLast ? (session.saved ? "Return to Practice room" : "Save reflection") : "Next";
    return '<div class="practice-flow-shell">' +
      '<button type="button" class="back-btn practice-flow-map" data-practice-flow-action="entry">&larr; Practice room</button>' +
      '<section class="practice-flow-stage practice-flow-stage--' + escapeHtml(step.id) + '" aria-label="Guided practice: ' + escapeHtml(step.title) + '">' +
        '<img class="practice-flow-art" src="images/practice/practice-chamber-v1.jpg" alt="">' +
        '<div class="practice-flow-shade" aria-hidden="true"></div>' +
        '<div class="practice-flow-head">' +
          '<div><div class="practice-flow-kicker">' + escapeHtml(session.learner.name || "My Journey") + " · Planned practice</div>" +
          '<h1>' + escapeHtml(step.title) + '</h1>' +
          '<p>' + escapeHtml(step.cue) + '</p></div>' +
          '<div class="practice-flow-count">' + escapeHtml(progressText(session)) + '</div>' +
        '</div>' +
        stepRail(session) +
        '<div class="practice-flow-current">' +
          '<div class="practice-flow-node">' + escapeHtml(step.node) + '</div>' +
          renderStepBody(session) +
        '</div>' +
        '<footer class="practice-flow-actions">' +
          '<button type="button" class="practice-flow-secondary" data-practice-flow-action="prev"' + (canGoBack ? "" : " disabled") + '>Previous</button>' +
          '<button type="button" class="practice-flow-primary" data-practice-flow-action="' + primaryAction + '">' + primaryLabel + '</button>' +
        '</footer>' +
      '</section>' +
    '</div>';
  }

  return {
    version: "0.1.0",
    createSession: createSession,
    escapeHtml: escapeHtml,
    render: render,
    steps: steps
  };
});
