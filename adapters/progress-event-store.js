/*
 * Shared progress event store adapter v1.
 *
 * Canonical writes are validated, learner-explicit, append-only, and duplicate
 * safe. Existing incomplete producers remain available through the deliberately
 * named legacy compatibility path until they adopt the full event envelope.
 */
(function initProgressEventStore(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root, require("../core/progress-event.js"));
  } else {
    root.HearthProgressEvents = factory(root, root.HearthProgressEventContract);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createProgressEventStore(root, eventContract) {
  "use strict";

  var key = "hearth-progress-events";
  var maxEvents = 1000;
  var canonicalIntentFields = ["capability_ids", "evidence_stage", "evidence_source", "recorded_at"];

  function owns(object, field) {
    return Object.prototype.hasOwnProperty.call(object || {}, field);
  }

  function isObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function cloneJson(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function error(code, field, message) {
    return { code: code, field: field || "", message: message };
  }

  function rejected(status, errors, format) {
    return {
      ok: false,
      status: status,
      source_format: format || null,
      event: null,
      errors: errors || []
    };
  }

  function accepted(status, event, format) {
    return {
      ok: true,
      status: status,
      source_format: format,
      event: event,
      errors: []
    };
  }

  function readState(storage) {
    if (!storage || typeof storage.getItem !== "function") {
      return {
        ok: false,
        events: [],
        raw: null,
        errors: [error("storage_unavailable", "", "A Storage-compatible event store is required")]
      };
    }

    var raw;
    try {
      raw = storage.getItem(key);
    } catch (readError) {
      return {
        ok: false,
        events: [],
        raw: null,
        errors: [error("storage_read_failed", "", "The event history could not be read")]
      };
    }

    if (!raw) return { ok: true, events: [], raw: raw, errors: [] };

    try {
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return {
          ok: false,
          events: [],
          raw: raw,
          errors: [error("invalid_event_history", "", "The stored event history is not an array")]
        };
      }
      return { ok: true, events: parsed, raw: raw, errors: [] };
    } catch (parseError) {
      return {
        ok: false,
        events: [],
        raw: raw,
        errors: [error("invalid_event_history", "", "The stored event history is not valid JSON")]
      };
    }
  }

  function activeLearnerIdForLegacyCompatibility(storage) {
    try {
      var state = JSON.parse(storage.getItem("hearth-journey-v2") || "null");
      return state && state.activeStudentId ? state.activeStudentId : null;
    } catch (readError) {
      return null;
    }
  }

  function hasCanonicalIntent(event) {
    if (eventContract && typeof eventContract.isCanonicalCandidate === "function") {
      return eventContract.isCanonicalCandidate(event);
    }
    if (!isObject(event)) return false;
    return canonicalIntentFields.some(function includesCanonicalField(field) {
      return owns(event, field);
    });
  }

  function legacyCompatibilityRecord(event, storage) {
    var timestamp = event.created_at || new Date().toISOString();
    var next = {
      id: event.id || "event-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      version: 1,
      simulator_id: event.simulator_id || "hearth-guitar",
      learner_id: event.learner_id || activeLearnerIdForLegacyCompatibility(storage),
      event_type: event.event_type,
      node_id: event.node_id || null,
      journey_level_id: event.journey_level_id || null,
      category_id: event.category_id || null,
      lesson_id: event.lesson_id || null,
      drill_id: event.drill_id || null,
      source_id: event.source_id || null,
      duration_minutes: Number.isFinite(event.duration_minutes) ? event.duration_minutes : null,
      rating: Number.isFinite(event.rating) ? event.rating : null,
      note: event.note || "",
      data: isObject(event.data) ? cloneJson(event.data) : {},
      created_at: timestamp
    };

    /* Preserve approved fields supplied by transitional producers even when the
     * producer is still too incomplete for canonical validation. */
    [
      "actor_role",
      "destination_node_id",
      "activity_id",
      "attempt_id",
      "session_id",
      "evidence_stage",
      "evidence_source",
      "project_id",
      "recording_id",
      "handoff_id",
      "occurred_at",
      "recorded_at",
      "return_route",
      "fallback_instruction"
    ].forEach(function preserveApprovedLegacyField(field) {
      if (owns(event, field)) next[field] = cloneJson(event[field]);
    });

    return next;
  }

  function stableStringify(value) {
    if (eventContract && typeof eventContract.stableStringify === "function") {
      return eventContract.stableStringify(value);
    }
    if (value === null || typeof value !== "object") return JSON.stringify(value);
    if (Array.isArray(value)) {
      return "[" + value.map(stableStringify).join(",") + "]";
    }
    return "{" + Object.keys(value).sort().map(function serializeField(field) {
      return JSON.stringify(field) + ":" + stableStringify(value[field]);
    }).join(",") + "}";
  }

  function sameNormalizedPayload(left, right) {
    if (eventContract && typeof eventContract.sameNormalizedPayload === "function") {
      return eventContract.sameNormalizedPayload(left, right);
    }
    return stableStringify(left) === stableStringify(right);
  }

  function duplicateResult(events, next, format) {
    var matchingId = events.filter(function eventHasSameId(existing) {
      return existing && existing.id === next.id;
    });
    if (!matchingId.length) return null;

    var allIdentical = matchingId.every(function existingPayloadMatches(existing) {
      try {
        return sameNormalizedPayload(existing, next);
      } catch (comparisonError) {
        return false;
      }
    });

    if (allIdentical) return accepted("duplicate", matchingId[0], format);
    return rejected("conflict", [
      error(
        "duplicate_id_conflict",
        "id",
        "Event ID " + next.id + " already belongs to a different normalized payload"
      )
    ], format);
  }

  function appendPrepared(next, storage, format) {
    var state = readState(storage);
    if (!state.ok) return rejected("rejected", state.errors, format);

    var duplicate = duplicateResult(state.events, next, format);
    if (duplicate) return duplicate;

    var events = state.events.slice();
    events.push(next);
    if (events.length > maxEvents) events = events.slice(events.length - maxEvents);

    try {
      storage.setItem(key, JSON.stringify(events));
    } catch (writeError) {
      return rejected("rejected", [
        error("storage_write_failed", "", "The event could not be appended")
      ], format);
    }

    return accepted("appended", next, format);
  }

  function appendCanonical(event, storage) {
    storage = storage || root.localStorage;
    if (!eventContract || typeof eventContract.validateAndNormalize !== "function") {
      return rejected("rejected", [
        error("canonical_contract_unavailable", "", "Canonical progress event validation is unavailable")
      ], "canonical_v1");
    }

    var normalized = eventContract.validateAndNormalize(event);
    if (!normalized.valid) return rejected("rejected", normalized.errors, "canonical_v1");
    return appendPrepared(normalized.event, storage, "canonical_v1");
  }

  /*
   * Compatibility only: this path retains the old active-Journey learner
   * fallback for producers that have not adopted the canonical envelope. New
   * code must use appendCanonical and supply learner_id explicitly.
   */
  function appendLegacy(event, storage) {
    storage = storage || root.localStorage;
    if (!storage || !isObject(event) || !event.event_type) {
      return rejected("rejected", [
        error("invalid_legacy_event", "event_type", "A legacy event still needs an event_type")
      ], "legacy_v0");
    }

    var next;
    try {
      next = legacyCompatibilityRecord(event, storage);
    } catch (normalizationError) {
      return rejected("rejected", [
        error("not_json_serializable", "", "The legacy event must be JSON serializable")
      ], "legacy_v0");
    }
    return appendPrepared(next, storage, "legacy_v0");
  }

  function appendResult(event, storage) {
    return hasCanonicalIntent(event)
      ? appendCanonical(event, storage)
      : appendLegacy(event, storage);
  }

  /* Existing callers receive the stored event or null, as before. Callers that
   * need validation/conflict details use appendResult or appendCanonical. */
  function append(event, storage) {
    var result = appendResult(event, storage);
    return result.ok ? result.event : null;
  }

  function listRaw(storage) {
    storage = storage || root.localStorage;
    var state = readState(storage);
    return state.ok ? state.events : [];
  }

  function listNormalized(storage) {
    return listRaw(storage).map(function normalizeStoredRecord(record) {
      if (eventContract && typeof eventContract.normalizeForRead === "function") {
        return eventContract.normalizeForRead(record);
      }
      return {
        source_format: "legacy_v0",
        compatibility_mode: "canonical_contract_unavailable",
        valid: false,
        event: cloneJson(record),
        errors: [error("canonical_contract_unavailable", "", "Read-time canonical projection is unavailable")]
      };
    });
  }

  return {
    version: "1.0.0",
    append: append,
    appendResult: appendResult,
    appendCanonical: appendCanonical,
    appendLegacy: appendLegacy,
    list: listRaw,
    listRaw: listRaw,
    listNormalized: listNormalized,
    storageKey: key,
    maxEvents: maxEvents
  };
});
