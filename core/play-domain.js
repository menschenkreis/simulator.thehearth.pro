/*
 * Play domain core v0.
 *
 * Pure data helpers for Play destinations, routes, activities, cultural
 * context, learner results, and cross-node recommendations. This module does
 * not render HTML, access storage, play media, or depend on one learner.
 */
(function initPlayDomain(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthPlayDomain = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPlayDomainCore() {
  "use strict";

  var CULTURE_CLAIM_STATUSES = [
    "documented",
    "supported_interpretation",
    "oral_tradition",
    "contested",
    "needs_review"
  ];

  var CULTURE_REVIEW_STATUSES = [
    "not_requested",
    "pending",
    "reviewed"
  ];

  var DEFAULT_PLAY_SEQUENCE = [
    "arrive",
    "listen",
    "meet_tradition",
    "pulse",
    "home",
    "join",
    "converse",
    "explore",
    "own",
    "remember"
  ];

  function isObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value == null ? null : value));
  }

  function asArray(value) {
    return Array.isArray(value) ? value.slice() : [];
  }

  function asString(value, fallback) {
    return typeof value === "string" ? value : (fallback || "");
  }

  function clampPercent(value) {
    var number = Number(value);
    if (!Number.isFinite(number)) return 0;
    return Math.max(0, Math.min(100, number));
  }

  function normalizeCoordinates(coordinates) {
    coordinates = isObject(coordinates) ? coordinates : {};
    return {
      x_percent: clampPercent(coordinates.x_percent),
      y_percent: clampPercent(coordinates.y_percent)
    };
  }

  function normalizeLegacyCoordinates(coords, options) {
    options = options || {};
    var width = Number(options.width) || 900;
    var height = Number(options.height) || 600;
    var values = Array.isArray(coords) ? coords : [0, 0];

    return normalizeCoordinates({
      x_percent: Number(values[0]) / width * 100,
      y_percent: Number(values[1]) / height * 100
    });
  }

  function normalizeSourceRef(source) {
    source = isObject(source) ? source : {};
    return {
      id: asString(source.id),
      title: asString(source.title),
      creator: asString(source.creator),
      publisher: asString(source.publisher),
      url: asString(source.url),
      source_type: asString(source.source_type, "reference"),
      review_status: asString(source.review_status, "unreviewed"),
      accessed_at: source.accessed_at || null
    };
  }

  function normalizeCultureClaim(claim) {
    claim = isObject(claim) ? claim : {};
    var status = CULTURE_CLAIM_STATUSES.indexOf(claim.status) !== -1 ?
      claim.status : "needs_review";

    return {
      id: asString(claim.id),
      text: asString(claim.text),
      status: status,
      source_ref_ids: asArray(claim.source_ref_ids),
      learner_label: asString(claim.learner_label),
      editorial_note: asString(claim.editorial_note)
    };
  }

  function normalizeCultureContext(context) {
    context = isObject(context) ? context : {};
    var reviewStatus = CULTURE_REVIEW_STATUSES.indexOf(context.community_review_status) !== -1 ?
      context.community_review_status : "not_requested";

    return {
      people_and_place: asString(context.people_and_place),
      cultural_doorway: asString(context.cultural_doorway),
      sound_connection: asString(context.sound_connection),
      living_tradition: asString(context.living_tradition),
      respectful_listening_prompt: asString(context.respectful_listening_prompt),
      terms: asArray(context.terms),
      claims: asArray(context.claims).map(normalizeCultureClaim),
      source_refs: asArray(context.source_refs).map(normalizeSourceRef),
      community_review_status: reviewStatus,
      community_reviewer: asString(context.community_reviewer)
    };
  }

  function normalizeTraditionProfile(profile) {
    profile = isObject(profile) ? profile : {};
    return {
      community_names: asArray(profile.community_names),
      place_and_period: asString(profile.place_and_period),
      social_functions: asArray(profile.social_functions),
      practice_settings: asArray(profile.practice_settings),
      instruments_and_voices: asArray(profile.instruments_and_voices),
      embodied_practices: asArray(profile.embodied_practices),
      transmission: asString(profile.transmission),
      historical_forces: asArray(profile.historical_forces),
      living_now: asString(profile.living_now),
      learner_relationship_note: asString(profile.learner_relationship_note)
    };
  }

  function normalizeDestination(destination) {
    destination = isObject(destination) ? destination : {};
    return {
      id: asString(destination.id),
      name: asString(destination.name),
      place_label: asString(destination.place_label, destination.name),
      tradition_label: asString(destination.tradition_label, destination.tradition),
      coordinates: normalizeCoordinates(destination.coordinates),
      marker_colour: asString(destination.marker_colour, destination.color || "#d4af69"),
      summary: asString(destination.summary, destination.description),
      level_range: asArray(destination.level_range),
      listening_focus: clone(destination.listening_focus || destination.listeningLens || {}),
      artist_refs: asArray(destination.artist_refs),
      recording_refs: asArray(destination.recording_refs),
      source_refs: asArray(destination.source_refs).map(normalizeSourceRef),
      tradition_profile: normalizeTraditionProfile(destination.tradition_profile),
      culture: normalizeCultureContext(destination.culture),
      content_status: asString(destination.content_status, "draft"),
      review_status: asString(destination.review_status, "unreviewed")
    };
  }

  function normalizeRoute(route) {
    route = isObject(route) ? route : {};
    return {
      id: asString(route.id),
      learner_id: route.learner_id || null,
      title: asString(route.title),
      reason: asString(route.reason),
      journey_level_id: route.journey_level_id || null,
      lesson_id: route.lesson_id || null,
      destination_ids: asArray(route.destination_ids),
      activity_ids: asArray(route.activity_ids),
      current_destination_id: route.current_destination_id || null,
      status: asString(route.status, "not_started")
    };
  }

  function normalizeActivityStep(step, index) {
    step = isObject(step) ? step : {};
    return {
      id: asString(step.id, "step-" + (index + 1)),
      phase: asString(step.phase, DEFAULT_PLAY_SEQUENCE[index] || "explore"),
      title: asString(step.title),
      instruction: asString(step.instruction),
      culture_claim_ids: asArray(step.culture_claim_ids),
      resource_ref_ids: asArray(step.resource_ref_ids),
      action_renderer_key: step.action_renderer_key || null,
      completion_rule: clone(step.completion_rule || {})
    };
  }

  function normalizeActivity(activity) {
    activity = isObject(activity) ? activity : {};
    return {
      id: asString(activity.id),
      destination_id: activity.destination_id || null,
      title: asString(activity.title),
      summary: asString(activity.summary),
      roles: asArray(activity.roles),
      required_skills: asArray(activity.required_skills),
      key_or_centre: asString(activity.key_or_centre),
      tempo: clone(activity.tempo || {}),
      tools: asArray(activity.tools),
      steps: asArray(activity.steps).map(normalizeActivityStep),
      source_refs: asArray(activity.source_refs).map(normalizeSourceRef),
      progress_tags: asArray(activity.progress_tags),
      status: asString(activity.status, "draft")
    };
  }

  function normalizePlayResult(result, options) {
    result = isObject(result) ? result : {};
    options = options || {};
    return {
      id: result.id || null,
      learner_id: result.learner_id || null,
      route_id: result.route_id || null,
      destination_id: result.destination_id || null,
      activity_id: result.activity_id || null,
      journey_level_id: result.journey_level_id || null,
      lesson_id: result.lesson_id || null,
      status: asString(result.status, "completed"),
      duration_minutes: Number.isFinite(result.duration_minutes) ? result.duration_minutes : 0,
      role: asString(result.role),
      tempo: Number.isFinite(result.tempo) ? result.tempo : null,
      enjoyment: Number.isFinite(result.enjoyment) ? result.enjoyment : null,
      confidence: Number.isFinite(result.confidence) ? result.confidence : null,
      stayed_with_pulse: result.stayed_with_pulse == null ? null : Boolean(result.stayed_with_pulse),
      found_home: result.found_home == null ? null : Boolean(result.found_home),
      reflection: asString(result.reflection),
      repeat_focus: asString(result.repeat_focus),
      recording_id: result.recording_id || null,
      revisit: Boolean(result.revisit),
      capability_ids: asArray(result.capability_ids),
      evidence_stage: asString(result.evidence_stage),
      evidence_source: asString(result.evidence_source),
      attempt_id: result.attempt_id || null,
      session_id: result.session_id || null,
      handoff_id: result.handoff_id || null,
      return_route: clone(result.return_route || null),
      fallback_instruction: result.fallback_instruction || null,
      roles_tried: asArray(result.roles_tried),
      song_id: result.song_id || null,
      completed_full_form: Boolean(result.completed_full_form),
      completed_at: result.completed_at || options.now || new Date().toISOString()
    };
  }

  function validateCultureContext(context) {
    var culture = normalizeCultureContext(context);
    var errors = [];
    var warnings = [];
    var knownSources = {};

    culture.source_refs.forEach(function recordSource(source) {
      if (source.id) knownSources[source.id] = true;
    });

    culture.claims.forEach(function validateClaim(claim) {
      if (!claim.id) errors.push("culture_claim_id_required");
      if (!claim.text) errors.push("culture_claim_text_required:" + (claim.id || "unknown"));
      if (claim.status === "needs_review") {
        warnings.push("culture_claim_needs_review:" + (claim.id || "unknown"));
      } else if (!claim.source_ref_ids.length) {
        errors.push("culture_claim_source_required:" + (claim.id || "unknown"));
      }
      claim.source_ref_ids.forEach(function checkSource(sourceId) {
        if (!knownSources[sourceId]) {
          errors.push("culture_claim_source_missing:" + (claim.id || "unknown") + ":" + sourceId);
        }
      });
    });

    if (culture.community_review_status !== "reviewed") {
      warnings.push("culture_community_review_incomplete");
    }

    return { valid: errors.length === 0, errors: errors, warnings: warnings };
  }

  function validateTraditionProfile(profile, options) {
    var tradition = normalizeTraditionProfile(profile);
    var strict = Boolean(options && options.strict);
    var errors = [];
    var warnings = [];

    [
      ["community_names", tradition.community_names.length > 0],
      ["place_and_period", Boolean(tradition.place_and_period)],
      ["social_functions", tradition.social_functions.length > 0],
      ["practice_settings", tradition.practice_settings.length > 0],
      ["transmission", Boolean(tradition.transmission)],
      ["living_now", Boolean(tradition.living_now)],
      ["learner_relationship_note", Boolean(tradition.learner_relationship_note)]
    ].forEach(function checkRequiredField(entry) {
      if (entry[1]) return;
      var code = "tradition_" + entry[0] + "_required";
      (strict ? errors : warnings).push(code);
    });

    if (!tradition.instruments_and_voices.length) {
      warnings.push("tradition_instruments_and_voices_missing");
    }
    if (!tradition.embodied_practices.length) {
      warnings.push("tradition_embodied_practices_missing");
    }

    return {
      valid: errors.length === 0,
      tradition_profile: tradition,
      errors: errors,
      warnings: warnings
    };
  }

  function validateDestination(destination) {
    var normalized = normalizeDestination(destination);
    var cultureValidation = validateCultureContext(normalized.culture);
    var traditionValidation = validateTraditionProfile(normalized.tradition_profile, {
      strict: normalized.content_status === "published"
    });
    var errors = cultureValidation.errors.concat(traditionValidation.errors);
    var warnings = cultureValidation.warnings.concat(traditionValidation.warnings);

    if (!normalized.id) errors.push("destination_id_required");
    if (!normalized.name) errors.push("destination_name_required");
    if (!isObject(destination && destination.coordinates)) {
      errors.push("destination_normalized_coordinates_required");
    }
    if (normalized.review_status !== "reviewed") {
      warnings.push("destination_review_incomplete");
    }

    return {
      valid: errors.length === 0,
      destination: normalized,
      errors: errors,
      warnings: warnings
    };
  }

  function buildMarkerStates(destinations, route, progressByDestination) {
    var normalizedRoute = normalizeRoute(route);
    var progress = isObject(progressByDestination) ? progressByDestination : {};

    return asArray(destinations).map(function buildState(destination) {
      var normalized = normalizeDestination(destination);
      var destinationProgress = isObject(progress[normalized.id]) ? progress[normalized.id] : {};
      var onRoute = normalizedRoute.destination_ids.indexOf(normalized.id) !== -1;
      var state = "open";

      if (normalized.id === normalizedRoute.current_destination_id) {
        state = "current";
      } else if (destinationProgress.visited || clampPercent(destinationProgress.percent) > 0) {
        state = "visited";
      } else if (onRoute) {
        state = "next";
      }

      return {
        destination_id: normalized.id,
        state: state,
        percent: clampPercent(destinationProgress.percent),
        recommended: state === "current",
        on_route: onRoute
      };
    });
  }

  function toProgressEvent(result, options) {
    var normalized = normalizePlayResult(result, options);
    if (normalized.capability_ids.length) {
      var timestamp = normalized.completed_at;
      return {
        id: result.id || "play-event-" + normalized.learner_id + "-" + Date.parse(timestamp),
        version: 1,
        simulator_id: "hearth-guitar",
        event_type: "play_activity_completed",
        learner_id: normalized.learner_id,
        actor_role: "learner",
        node_id: "play",
        destination_node_id: null,
        journey_level_id: normalized.journey_level_id,
        lesson_id: normalized.lesson_id,
        activity_id: normalized.activity_id,
        capability_ids: normalized.capability_ids,
        attempt_id: normalized.attempt_id,
        session_id: normalized.session_id,
        evidence_stage: normalized.evidence_stage || "application",
        evidence_source: normalized.evidence_source || "self_report",
        handoff_id: normalized.handoff_id,
        duration_minutes: normalized.duration_minutes,
        note: normalized.reflection,
        occurred_at: timestamp,
        recorded_at: timestamp,
        return_route: normalized.return_route,
        fallback_instruction: normalized.fallback_instruction,
        data: {
          route_id: normalized.route_id,
          destination_id: normalized.destination_id,
          activity_id: normalized.activity_id,
          role: normalized.role,
          roles_tried: normalized.roles_tried,
          song_id: normalized.song_id,
          completed_full_form: normalized.completed_full_form,
          tempo: normalized.tempo,
          stayed_with_pulse: normalized.stayed_with_pulse,
          found_home: normalized.found_home,
          revisit: normalized.revisit,
          repeat_focus: normalized.repeat_focus
        }
      };
    }
    return {
      event_type: "play_activity_completed",
      node_id: "play",
      learner_id: normalized.learner_id,
      journey_level_id: normalized.journey_level_id,
      lesson_id: normalized.lesson_id,
      duration_minutes: normalized.duration_minutes,
      note: normalized.reflection,
      occurred_at: normalized.completed_at,
      data: {
        route_id: normalized.route_id,
        destination_id: normalized.destination_id,
        activity_id: normalized.activity_id,
        role: normalized.role,
        tempo: normalized.tempo,
        enjoyment: normalized.enjoyment,
        confidence: normalized.confidence,
        stayed_with_pulse: normalized.stayed_with_pulse,
        found_home: normalized.found_home,
        recording_id: normalized.recording_id,
        revisit: normalized.revisit,
        repeat_focus: normalized.repeat_focus
      }
    };
  }

  function createPracticeRecommendation(result) {
    var normalized = normalizePlayResult(result);
    if (!normalized.repeat_focus && !normalized.revisit) return null;

    return {
      source_node_id: "play",
      learner_id: normalized.learner_id,
      activity_id: normalized.activity_id,
      destination_id: normalized.destination_id,
      focus: normalized.repeat_focus || "Repeat the musical conversation",
      reason: normalized.reflection || "This musical idea should return in Practice.",
      suggested_minutes: 10,
      tempo: normalized.tempo,
      status: "suggested"
    };
  }

  function createPracticeHandoff(result, options) {
    options = options || {};
    var normalized = normalizePlayResult(result, options);
    var recommendation = createPracticeRecommendation(normalized);
    if (!recommendation || !normalized.learner_id || !normalized.activity_id) return null;
    var now = options.now || new Date().toISOString();
    var suffix = options.suffix || String(Date.parse(now) || Date.now());
    return {
      id: "handoff-play-practice-" + normalized.learner_id + "-" + suffix,
      version: 1,
      learner_id: normalized.learner_id,
      actor_role: "learner",
      source_node_id: "play",
      destination_node_id: "practice",
      activity_id: normalized.activity_id,
      lesson_id: normalized.lesson_id,
      journey_level_id: normalized.journey_level_id,
      capability_ids: [],
      attempt_id: normalized.attempt_id,
      session_id: normalized.session_id,
      task: {
        id: "repeat-" + normalized.activity_id,
        instruction: recommendation.focus,
        parameters: {
          focus: recommendation.focus,
          reason: recommendation.reason,
          duration_minutes: recommendation.suggested_minutes,
          tempo: recommendation.tempo,
          source_result_id: normalized.id,
          source_attempt_id: normalized.attempt_id,
          source_destination_id: normalized.destination_id
        }
      },
      pass_condition: {
        description: "Complete one honest repetition and save what changed.",
        minimum_evidence_stage: "attempt",
        criteria: { source_result_id: normalized.id }
      },
      easier_step: {
        instruction: "Use one role for five minutes, then write down what needs another return.",
        parameters: { duration_minutes: 5, tempo: recommendation.tempo || 60 }
      },
      return_route: {
        node_id: "play",
        view_id: "remember",
        params: { destination_id: normalized.destination_id, activity_id: normalized.activity_id }
      },
      fallback_instruction: "Return to Play and reopen the saved musical exchange.",
      created_at: now
    };
  }

  return {
    version: "0.2.0",
    cultureClaimStatuses: CULTURE_CLAIM_STATUSES.slice(),
    cultureReviewStatuses: CULTURE_REVIEW_STATUSES.slice(),
    defaultPlaySequence: DEFAULT_PLAY_SEQUENCE.slice(),
    normalizeCoordinates: normalizeCoordinates,
    normalizeLegacyCoordinates: normalizeLegacyCoordinates,
    normalizeSourceRef: normalizeSourceRef,
    normalizeCultureClaim: normalizeCultureClaim,
    normalizeCultureContext: normalizeCultureContext,
    normalizeTraditionProfile: normalizeTraditionProfile,
    normalizeDestination: normalizeDestination,
    normalizeRoute: normalizeRoute,
    normalizeActivity: normalizeActivity,
    normalizePlayResult: normalizePlayResult,
    validateCultureContext: validateCultureContext,
    validateTraditionProfile: validateTraditionProfile,
    validateDestination: validateDestination,
    buildMarkerStates: buildMarkerStates,
    toProgressEvent: toProgressEvent,
    createPracticeRecommendation: createPracticeRecommendation,
    createPracticeHandoff: createPracticeHandoff
  };
});
