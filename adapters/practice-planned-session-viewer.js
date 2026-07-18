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
      return '<div class="practice-flow-body">' +
        '<p>Make the practice measurable but gentle. Small clear targets beat vague hard work.</p>' +
        '<div class="practice-flow-condition-grid">' +
          '<label><span>Minutes</span>' + fieldInput("minutes", session.minutes, "number", ' min="1" max="90"') + '</label>' +
          '<label><span>BPM</span>' + fieldInput("bpm", session.bpm, "number", ' min="30" max="220"') + '</label>' +
          '<label><span>Repetitions</span>' + fieldInput("repetitions", session.repetitions, "number", ' min="1" max="50"') + '</label>' +
          '<label><span>Clean takes</span>' + fieldInput("cleanTakeGoal", session.cleanTakeGoal, "number", ' min="1" max="10"') + '</label>' +
        "</div>" +
      "</div>";
    }
    if (step.id === "practise") {
      return '<div class="practice-flow-body">' +
        '<p>Use Do for the movement, then keep the candle burning while you repeat it. Stay below the speed where the sound falls apart.</p>' +
        '<div class="practice-flow-tool-row">' +
          '<button type="button" class="practice-flow-tool" data-practice-flow-action="open-do">Open Do drills</button>' +
          '<button type="button" class="practice-flow-tool is-primary" data-practice-flow-action="open-candle">Open candle timer</button>' +
        '</div>' +
        '<label class="practice-flow-custom"><span>Drill note</span>' + fieldTextarea("drillNote", session.drillNote, "BPM, drill name, what happened") + '</label>' +
      "</div>";
    }
    if (step.id === "listen") {
      return '<div class="practice-flow-body">' +
        '<p>Record if useful. The point is not perfection. The point is honest feedback.</p>' +
        '<div class="practice-flow-tool-row">' +
          '<button type="button" class="practice-flow-tool" id="rec-btn" data-practice-flow-action="toggle-record">Record check</button>' +
          '<span class="practice-flow-status" id="rs">Ready</span>' +
        '</div>' +
        '<label class="practice-flow-custom"><span>Listening note</span>' + fieldTextarea("recordingNote", session.recordingNote, "What did the recording reveal?") + '</label>' +
      "</div>";
    }
    return '<div class="practice-flow-body">' +
      '<p>Close the loop. This is what lets tomorrow&apos;s Practice and Journey know what to bring back.</p>' +
      '<div class="practice-flow-mini-grid">' +
        '<label><span>What improved?</span>' + fieldTextarea("reflectionImproved", session.reflectionImproved, "Example: A roots felt more secure") + '</label>' +
        '<label><span>What stayed difficult?</span>' + fieldTextarea("reflectionHard", session.reflectionHard, "Example: rushing when changing strings") + '</label>' +
        '<label><span>Bring back next time</span>' + fieldTextarea("reflectionReturn", session.reflectionReturn, "Example: 60 BPM, box 1 roots, one jam") + '</label>' +
      "</div>" +
      (session.saved ? '<div class="practice-flow-saved">Saved. This practice note can feed the next Journey step.</div>' : "") +
    "</div>";
  }

  function render(session) {
    var step = steps[session.stepIndex] || steps[0];
    var canGoBack = session.stepIndex > 0;
    var isLast = session.stepIndex >= steps.length - 1;
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
          '<button type="button" class="practice-flow-primary" data-practice-flow-action="' + (isLast ? "save" : "next") + '">' + (isLast ? "Save reflection" : "Next") + '</button>' +
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
