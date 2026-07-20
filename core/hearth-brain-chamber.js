/*
 * Pure model for the Hearth Brain pilot.
 *
 * The model owns learning copy and canonical evidence. It never reads the DOM
 * or browser storage, so a future backend can reuse the same contract.
 */
(function initHearthBrainChamber(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthBrainChamber = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createHearthBrainChamber() {
  "use strict";

  var STAGES = [
    {
      id: "understand",
      label: "Understand",
      title: "The brain builds useful maps",
      body: "Every repeated link between sound, sight, touch, and movement helps the brain predict what should happen next. A scale shape becomes useful when it connects to a sound and a safe place to return.",
      prompt: "For this experiment, A is the safe return point inside the A minor pentatonic map."
    },
    {
      id: "experience",
      label: "Experience",
      title: "Hear home before adding movement",
      body: "Play the open A string and let it ring. Then play one nearby pentatonic note and return to A. Pause long enough to hear whether A feels settled.",
      prompt: "Do this three times slowly. Listening is the task; speed is not."
    },
    {
      id: "apply",
      label: "Apply",
      title: "Let prediction meet the pulse",
      body: "At 60 BPM, play an A root on beat 1 and leave space for the rest of the bar. Add one nearby pentatonic note only when the return to A feels easy.",
      prompt: "If the map becomes foggy, use only the open A string. That is a valid smaller experiment."
    },
    {
      id: "own",
      label: "Own",
      title: "Name what the map felt like",
      body: "Your observation helps Journey choose the next safe step. This is not a brain score and it does not diagnose anything.",
      prompt: "Choose the closest description, then add one useful detail if you can."
    }
  ];

  var OBSERVATIONS = [
    { id: "clearer", label: "Clearer", rating: 4 },
    { id: "rushed", label: "Rushed", rating: 2 },
    { id: "foggy", label: "Still foggy", rating: 1 }
  ];

  function observationById(id) {
    return OBSERVATIONS.find(function findObservation(item) {
      return item.id === id;
    }) || null;
  }

  function validateReflection(value) {
    value = value || {};
    var observation = observationById(value.observationId);
    var note = String(value.note || "").trim();
    return {
      valid: Boolean(observation),
      observation: observation,
      note: note,
      error: observation ? "" : "Choose how the pattern felt before saving."
    };
  }

  function baseEvent(options, suffix, timestamp) {
    var returnRoute = options.returnRoute || {
      node_id: "hearth",
      view_id: "brain",
      params: { system_id: "brain" }
    };
    return {
      id: "hearth-brain-" + options.learnerId + "-" + suffix,
      version: 1,
      simulator_id: "hearth-guitar",
      event_type: "hearth_experiment_completed",
      learner_id: options.learnerId,
      actor_role: "learner",
      node_id: "hearth",
      destination_node_id: null,
      journey_level_id: options.journeyLevelId || "L1",
      category_id: "inner-instrument",
      lesson_id: options.lessonId || null,
      activity_id: options.activityId || "hearth-brain-pattern-map",
      drill_id: null,
      capability_ids: ["L1-EAR-01"],
      attempt_id: options.attemptId,
      session_id: options.sessionId,
      evidence_stage: "attempt",
      evidence_source: "direct_interaction",
      source_id: null,
      project_id: null,
      recording_id: null,
      handoff_id: options.handoffId || null,
      duration_minutes: 2,
      rating: null,
      note: "Completed the A-as-home pattern-recognition experiment.",
      occurred_at: timestamp,
      recorded_at: timestamp,
      created_at: timestamp,
      return_route: returnRoute,
      fallback_instruction: "Return to Hearth and reopen the Brain chamber.",
      data: {
        system_id: "brain",
        development_tags: ["pattern_recognition", "motor_mapping", "listening", "prediction", "memory"],
        experiment: "a-root-safe-return"
      }
    };
  }

  function buildEvents(options) {
    options = options || {};
    var reflection = validateReflection(options.reflection);
    if (!options.learnerId || !reflection.valid) return [];
    var timestamp = options.timestamp || new Date().toISOString();
    var suffix = options.suffix || String(Date.now());
    var experiment = baseEvent(options, suffix + "-experiment", timestamp);
    var reflectionEvent = baseEvent(options, suffix + "-reflection", timestamp);
    reflectionEvent.event_type = "hearth_reflection_saved";
    reflectionEvent.capability_ids = ["L1-REFLECT-01"];
    reflectionEvent.evidence_stage = "demonstration";
    reflectionEvent.evidence_source = "self_report";
    reflectionEvent.duration_minutes = 1;
    reflectionEvent.rating = reflection.observation.rating;
    reflectionEvent.note = reflection.note || reflection.observation.label;
    reflectionEvent.data = {
      system_id: "brain",
      development_tags: ["pattern_recognition", "feedback_tolerance", "reflection"],
      observation_id: reflection.observation.id,
      observation_label: reflection.observation.label,
      next_step_signal: reflection.observation.id === "clearer" ? "repeat-with-one-variation" : "repeat-smaller"
    };
    return [experiment, reflectionEvent];
  }

  return {
    version: "1.0.0",
    stages: STAGES.slice(),
    observations: OBSERVATIONS.slice(),
    validateReflection: validateReflection,
    buildEvents: buildEvents
  };
});
