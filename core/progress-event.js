/*
 * Canonical progress event contract v1.
 *
 * Pure normalization, validation, comparison, and read-time legacy projection.
 * This module never reads or writes browser storage.
 */
(function initProgressEventContract(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthProgressEventContract = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createProgressEventContract() {
  "use strict";

  var REQUIRED_FIELDS = [
    "id",
    "version",
    "simulator_id",
    "event_type",
    "learner_id",
    "node_id",
    "destination_node_id",
    "journey_level_id",
    "lesson_id",
    "activity_id",
    "capability_ids",
    "attempt_id",
    "session_id",
    "evidence_stage",
    "evidence_source",
    "occurred_at",
    "recorded_at",
    "return_route",
    "fallback_instruction",
    "data"
  ];

  var TOP_LEVEL_FIELDS = [
    "id",
    "version",
    "simulator_id",
    "event_type",
    "learner_id",
    "actor_role",
    "node_id",
    "destination_node_id",
    "journey_level_id",
    "category_id",
    "lesson_id",
    "activity_id",
    "drill_id",
    "capability_ids",
    "attempt_id",
    "session_id",
    "evidence_stage",
    "evidence_source",
    "source_id",
    "project_id",
    "recording_id",
    "handoff_id",
    "duration_minutes",
    "rating",
    "note",
    "occurred_at",
    "recorded_at",
    "created_at",
    "return_route",
    "fallback_instruction",
    "data"
  ];

  /*
   * These fields do not appear on the current legacy producers. Play already
   * supplies occurred_at, so that field alone cannot safely signal canonical
   * intent during the compatibility period.
   */
  var CANONICAL_INTENT_FIELDS = [
    "capability_ids",
    "evidence_stage",
    "evidence_source",
    "recorded_at"
  ];

  var ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]*$/;
  var EVENT_TYPE_PATTERN = /^[a-z][a-z0-9]*(?:_[a-z0-9]+)+$/;
  var DATE_TIME_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
  var EVIDENCE_STAGES = ["contact", "attempt", "demonstration", "application", "consolidation"];
  var EVIDENCE_SOURCES = [
    "self_report",
    "direct_interaction",
    "teacher_observation",
    "system_measurement",
    "artifact",
    "recording_review",
    "migrated_legacy"
  ];
  var ACTOR_ROLES = ["learner", "teacher", "system"];
  var JOURNEY_TO_CANONICAL_STAGE = {
    contact: "contact",
    attempted: "attempt",
    demonstrated: "demonstration",
    applied_musically: "application",
    consolidated: "consolidation"
  };
  var CANONICAL_TO_JOURNEY_STAGE = {
    contact: "contact",
    attempt: "attempted",
    demonstration: "demonstrated",
    application: "applied_musically",
    consolidation: "consolidated"
  };

  function owns(object, field) {
    return Object.prototype.hasOwnProperty.call(object || {}, field);
  }

  function isObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function cloneJson(value) {
    if (value === undefined) return undefined;
    return JSON.parse(JSON.stringify(value));
  }

  function addError(errors, code, field, message) {
    errors.push({ code: code, field: field, message: message });
  }

  function isKnownField(field) {
    return TOP_LEVEL_FIELDS.indexOf(field) !== -1;
  }

  function isCanonicalCandidate(event) {
    if (!isObject(event)) return false;
    return CANONICAL_INTENT_FIELDS.some(function hasCanonicalIntent(field) {
      return owns(event, field);
    });
  }

  function normalizeJourneyLevelId(value) {
    if (typeof value !== "string") return value;
    var match = value.trim().match(/^(?:l|level[-_ ]?)(\d+)$/i);
    return match ? "L" + String(Number(match[1])) : value;
  }

  function normalizeEvidenceStage(value) {
    return owns(JOURNEY_TO_CANONICAL_STAGE, value) ? JOURNEY_TO_CANONICAL_STAGE[value] : value;
  }

  function toJourneyEvidenceStage(value) {
    return owns(CANONICAL_TO_JOURNEY_STAGE, value)
      ? CANONICAL_TO_JOURNEY_STAGE[value]
      : null;
  }

  function isDateTime(value) {
    if (typeof value !== "string" || !DATE_TIME_PATTERN.test(value)) return false;
    return !isNaN(Date.parse(value));
  }

  function normalizeTimestamp(value) {
    if (!isDateTime(value)) return value;
    return new Date(Date.parse(value)).toISOString();
  }

  function normalizeCanonicalEvent(event) {
    var source = isObject(event) ? event : {};
    var normalized = {};

    TOP_LEVEL_FIELDS.forEach(function copyApprovedField(field) {
      if (!owns(source, field)) return;
      var value = source[field];

      if (field === "journey_level_id") {
        normalized[field] = normalizeJourneyLevelId(value);
      } else if (field === "occurred_at" || field === "recorded_at" || field === "created_at") {
        normalized[field] = normalizeTimestamp(value);
      } else if (field === "capability_ids") {
        normalized[field] = Array.isArray(value) ? value.slice() : value;
      } else if (field === "data" || field === "return_route") {
        normalized[field] = cloneJson(value);
      } else {
        normalized[field] = value;
      }
    });

    return normalized;
  }

  function validateId(value, field, errors, nullable) {
    if (nullable && value === null) return;
    if (typeof value !== "string" || value.length < 1 || value.length > 160 || !ID_PATTERN.test(value)) {
      addError(errors, "invalid_id", field, field + " must be a non-empty contract ID" + (nullable ? " or null" : ""));
    }
  }

  function validateNumber(value, field, errors, minimum, maximum) {
    if (value === null) return;
    if (typeof value !== "number" || !Number.isFinite(value)) {
      addError(errors, "invalid_number", field, field + " must be a finite number or null");
      return;
    }
    if (value < minimum || (maximum != null && value > maximum)) {
      addError(errors, "number_out_of_range", field, field + " is outside the approved range");
    }
  }

  function validateTimestamp(value, field, errors) {
    if (!isDateTime(value)) {
      addError(errors, "invalid_timestamp", field, field + " must be an ISO 8601 date-time with a timezone");
    }
  }

  function validateRoute(route, field, errors, nullable) {
    if (nullable && route === null) return;
    if (!isObject(route)) {
      addError(errors, "invalid_route", field, field + " must be a route object" + (nullable ? " or null" : ""));
      return;
    }

    ["node_id", "view_id", "params"].forEach(function requireRouteField(routeField) {
      if (!owns(route, routeField)) {
        addError(errors, "missing_required_field", field + "." + routeField, field + " must supply " + routeField);
      }
    });
    Object.keys(route).forEach(function rejectUnknownRouteField(routeField) {
      if (["node_id", "view_id", "params"].indexOf(routeField) === -1) {
        addError(errors, "unknown_field", field + "." + routeField, field + " contains an unapproved field");
      }
    });
    if (owns(route, "node_id")) validateId(route.node_id, field + ".node_id", errors, false);
    if (owns(route, "view_id")) validateId(route.view_id, field + ".view_id", errors, false);
    if (owns(route, "params") && !isObject(route.params)) {
      addError(errors, "invalid_object", field + ".params", field + ".params must be an object");
    }
  }

  function validateCanonicalEvent(event) {
    var errors = [];
    if (!isObject(event)) {
      addError(errors, "invalid_event", "", "A canonical progress event must be an object");
      return { valid: false, errors: errors };
    }

    try {
      JSON.stringify(event);
    } catch (error) {
      addError(errors, "not_json_serializable", "", "A canonical event must be JSON serializable");
    }

    REQUIRED_FIELDS.forEach(function requireField(field) {
      if (!owns(event, field)) {
        addError(errors, "missing_required_field", field, "Canonical events must explicitly supply " + field);
      }
    });

    Object.keys(event).forEach(function rejectUnknownField(field) {
      if (!isKnownField(field)) {
        addError(errors, "unknown_field", field, "Canonical events may not add unapproved top-level fields");
      }
    });

    if (owns(event, "id")) validateId(event.id, "id", errors, false);
    if (owns(event, "version") && event.version !== 1) {
      addError(errors, "unsupported_version", "version", "Canonical progress events must use version 1");
    }
    if (owns(event, "simulator_id")) validateId(event.simulator_id, "simulator_id", errors, false);
    if (owns(event, "event_type") && (typeof event.event_type !== "string" || !EVENT_TYPE_PATTERN.test(event.event_type))) {
      addError(errors, "invalid_event_type", "event_type", "event_type must be a stable snake_case event name");
    }
    if (owns(event, "learner_id")) validateId(event.learner_id, "learner_id", errors, false);
    if (owns(event, "actor_role") && ACTOR_ROLES.indexOf(event.actor_role) === -1) {
      addError(errors, "invalid_actor_role", "actor_role", "actor_role is not approved");
    }
    if (owns(event, "node_id")) validateId(event.node_id, "node_id", errors, false);

    [
      "destination_node_id",
      "journey_level_id",
      "category_id",
      "lesson_id",
      "activity_id",
      "drill_id",
      "attempt_id",
      "session_id",
      "source_id",
      "project_id",
      "recording_id",
      "handoff_id"
    ].forEach(function validateNullableIdField(field) {
      if (owns(event, field)) validateId(event[field], field, errors, true);
    });

    if (owns(event, "capability_ids")) {
      if (!Array.isArray(event.capability_ids)) {
        addError(errors, "invalid_array", "capability_ids", "capability_ids must be an array");
      } else {
        var seenCapabilities = {};
        event.capability_ids.forEach(function validateCapability(capabilityId, index) {
          validateId(capabilityId, "capability_ids[" + index + "]", errors, false);
          if (owns(seenCapabilities, capabilityId)) {
            addError(errors, "duplicate_capability_id", "capability_ids", "capability_ids must be unique");
          }
          seenCapabilities[capabilityId] = true;
        });
      }
    }

    if (owns(event, "evidence_stage") && EVIDENCE_STAGES.indexOf(event.evidence_stage) === -1) {
      addError(errors, "invalid_evidence_stage", "evidence_stage", "evidence_stage is not canonical");
    }
    if (owns(event, "evidence_source") && EVIDENCE_SOURCES.indexOf(event.evidence_source) === -1) {
      addError(errors, "invalid_evidence_source", "evidence_source", "evidence_source is not approved");
    }
    if (owns(event, "duration_minutes")) validateNumber(event.duration_minutes, "duration_minutes", errors, 0, null);
    if (owns(event, "rating")) validateNumber(event.rating, "rating", errors, 0, 5);
    if (owns(event, "note") && (typeof event.note !== "string" || event.note.length > 2000)) {
      addError(errors, "invalid_note", "note", "note must be a string no longer than 2,000 characters");
    }
    if (owns(event, "occurred_at")) validateTimestamp(event.occurred_at, "occurred_at", errors);
    if (owns(event, "recorded_at")) validateTimestamp(event.recorded_at, "recorded_at", errors);
    if (owns(event, "created_at")) validateTimestamp(event.created_at, "created_at", errors);
    if (owns(event, "return_route")) validateRoute(event.return_route, "return_route", errors, true);
    if (owns(event, "fallback_instruction") && event.fallback_instruction !== null &&
        (typeof event.fallback_instruction !== "string" || event.fallback_instruction.length > 500)) {
      addError(errors, "invalid_fallback_instruction", "fallback_instruction", "fallback_instruction must be a string no longer than 500 characters or null");
    }
    if (owns(event, "data") && !isObject(event.data)) {
      addError(errors, "invalid_object", "data", "data must be an event-specific object");
    }

    return { valid: errors.length === 0, errors: errors };
  }

  function validateAndNormalize(event) {
    var normalized;
    try {
      normalized = normalizeCanonicalEvent(event);
    } catch (error) {
      return {
        valid: false,
        event: null,
        errors: [{
          code: "not_json_serializable",
          field: "",
          message: "A canonical event must be JSON serializable"
        }]
      };
    }
    var validation = validateCanonicalEvent(normalized);

    /* Unknown fields were deliberately removed by normalization, so reject them
     * against the source shape as well. */
    if (isObject(event)) {
      Object.keys(event).forEach(function rejectSourceUnknownField(field) {
        if (!isKnownField(field)) {
          addError(validation.errors, "unknown_field", field, "Canonical events may not add unapproved top-level fields");
        }
      });
      validation.valid = validation.errors.length === 0;
    }

    return { valid: validation.valid, event: normalized, errors: validation.errors };
  }

  function firstDefined(values, fallback) {
    for (var index = 0; index < values.length; index += 1) {
      if (values[index] !== undefined) return values[index];
    }
    return fallback;
  }

  function projectLegacyRecord(record) {
    var source = isObject(record) ? record : {};
    var data = isObject(source.data) ? source.data : {};
    var occurredAt = firstDefined([source.occurred_at, data.occurred_at, source.created_at], null);
    var recordedAt = firstDefined([source.recorded_at, data.recorded_at, source.created_at, occurredAt], null);
    var projected = {
      id: firstDefined([source.id], null),
      version: 1,
      simulator_id: firstDefined([source.simulator_id], "hearth-guitar"),
      event_type: firstDefined([source.event_type], null),
      learner_id: firstDefined([source.learner_id], null),
      node_id: firstDefined([source.node_id], null),
      destination_node_id: firstDefined([source.destination_node_id, data.destination_node_id], null),
      journey_level_id: normalizeJourneyLevelId(firstDefined([source.journey_level_id, data.journey_level_id], null)),
      lesson_id: firstDefined([source.lesson_id, data.lesson_id], null),
      activity_id: firstDefined([source.activity_id, data.activity_id], null),
      capability_ids: firstDefined([source.capability_ids, data.capability_ids], []),
      attempt_id: firstDefined([source.attempt_id, data.attempt_id], null),
      session_id: firstDefined([source.session_id, data.session_id], null),
      evidence_stage: normalizeEvidenceStage(firstDefined([source.evidence_stage, data.evidence_stage], null)),
      evidence_source: firstDefined([source.evidence_source, data.evidence_source], "migrated_legacy"),
      occurred_at: normalizeTimestamp(occurredAt),
      recorded_at: normalizeTimestamp(recordedAt),
      return_route: firstDefined([source.return_route, data.return_route], null),
      fallback_instruction: firstDefined([source.fallback_instruction, data.fallback_instruction], null),
      data: cloneJson(data)
    };

    [
      "actor_role",
      "category_id",
      "drill_id",
      "source_id",
      "project_id",
      "recording_id",
      "handoff_id",
      "duration_minutes",
      "rating",
      "note",
      "created_at"
    ].forEach(function copyLegacyOptionalField(field) {
      if (owns(source, field)) projected[field] = source[field];
    });

    return normalizeCanonicalEvent(projected);
  }

  function normalizeForRead(record) {
    var canonical = isCanonicalCandidate(record);
    var normalized = canonical ? validateAndNormalize(record) : validateAndNormalize(projectLegacyRecord(record));
    return {
      source_format: canonical ? "canonical_v1" : "legacy_v0",
      compatibility_mode: canonical ? null : "read_time_projection_only",
      valid: normalized.valid,
      event: normalized.event,
      errors: normalized.errors
    };
  }

  function stableStringify(value) {
    if (value === null || typeof value !== "object") return JSON.stringify(value);
    if (Array.isArray(value)) {
      return "[" + value.map(function serializeArrayItem(item) {
        return stableStringify(item);
      }).join(",") + "]";
    }
    return "{" + Object.keys(value).sort().map(function serializeObjectField(field) {
      return JSON.stringify(field) + ":" + stableStringify(value[field]);
    }).join(",") + "}";
  }

  function normalizedPayload(record) {
    var normalized = isCanonicalCandidate(record)
      ? validateAndNormalize(record).event
      : projectLegacyRecord(record);
    return normalized;
  }

  function sameNormalizedPayload(left, right) {
    return stableStringify(normalizedPayload(left)) === stableStringify(normalizedPayload(right));
  }

  return {
    version: "1.0.0",
    requiredFields: REQUIRED_FIELDS.slice(),
    topLevelFields: TOP_LEVEL_FIELDS.slice(),
    canonicalIntentFields: CANONICAL_INTENT_FIELDS.slice(),
    evidenceStages: EVIDENCE_STAGES.slice(),
    evidenceSources: EVIDENCE_SOURCES.slice(),
    isCanonicalCandidate: isCanonicalCandidate,
    normalizeJourneyLevelId: normalizeJourneyLevelId,
    normalizeEvidenceStage: normalizeEvidenceStage,
    toJourneyEvidenceStage: toJourneyEvidenceStage,
    normalizeCanonicalEvent: normalizeCanonicalEvent,
    validateCanonicalEvent: validateCanonicalEvent,
    validateAndNormalize: validateAndNormalize,
    projectLegacyRecord: projectLegacyRecord,
    normalizeForRead: normalizeForRead,
    stableStringify: stableStringify,
    normalizedPayload: normalizedPayload,
    sameNormalizedPayload: sameNormalizedPayload
  };
});
