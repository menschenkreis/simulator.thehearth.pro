/*
 * Learner migration preview v1.
 *
 * Inventories learner/progress browser storage and proposes per-profile
 * destinations. This module deliberately exposes no migration or write API.
 */
(function initLearnerMigrationPreview(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthLearnerMigrationPreview = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createLearnerMigrationPreview() {
  "use strict";

  var VERSION = "1.0.0";

  var CATALOG = [
    entry("entry-profile-directory", exact("hearth_users"), "json", "array", "shell", "record_array", "learner_profiles", "reconcile_profiles", ["index.html"]),
    entry("entry-current-profile", exact("hearth_current"), "json", "object", "shell", "single_record", "active_learner_preference", "reconcile_profile", ["index.html"]),
    entry("journey-state", exact("hearth-journey-v2"), "json", "object", "journey", "embedded_profiles", "learner_profiles + journey_progress", "split_embedded_profiles", ["assets/js/journey.js", "assets/js/hearth-api.js"]),
    entry("active-learner", exact("hearth-journey-active-student"), "text", "string", "shell", "active_profile", "active_learner_preference", "retain", ["assets/js/journey.js", "adapters/doing-progress-bridge.js"]),
    entry("progress-events", exact("hearth-progress-events"), "json", "array", "shared", "record_array", "progress_events", "retain_append_only", ["adapters/progress-event-store.js"]),
    entry("clean-lesson-progress", exact("hearth.cleanProgress.v1"), "json", "object", "foundation", "learner_record", "lesson_progress", "attach_explicit_learner", ["adapters/browser-progress-store.js", "adapters/foundation-progress-bridge.js"]),

    entry("foundation-progress", exact("hearth-foundation-progress"), "json", "object", "foundation", "global_legacy", "progress_events", "convert_to_events", ["simulator.html", "adapters/foundation-progress-bridge.js"]),
    entry("foundation-progress-alias", exact("fProgress"), "json", "object", "foundation", "global_legacy", "progress_events", "review_legacy_alias", ["adapters/header-tools-controller.js"]),
    entry("doing-progress", exact("hearth-doing-progress"), "json", "object", "doing", "global_legacy", "progress_events", "convert_to_events", ["adapters/doing-panel-controller.js", "adapters/doing-progress-bridge.js"]),
    entry("doing-progress-alias", exact("dProgress"), "json", "object", "doing", "global_legacy", "progress_events", "review_legacy_alias", ["adapters/header-tools-controller.js"]),
    entry("doing-migration-marker", exact("hearth-doing-progress-migration-v1"), "json", "object", "doing", "migration_metadata", "migration_manifests", "retain", ["adapters/doing-progress-bridge.js"]),
    entry("knowing-progress", exact("hearth-knowing-progress"), "json", "object", "knowing", "global_legacy", "progress_events", "convert_to_events", ["simulator.html", "adapters/knowing-progress-controller.js"]),
    entry("knowing-progress-alias", exact("kProgress"), "json", "object", "knowing", "global_legacy", "progress_events", "review_legacy_alias", ["adapters/header-tools-controller.js"]),
    entry("knowing-state", exact("hearth-knowing-state"), "json", "object", "knowing", "global_legacy", "learner_reading_state", "copy_to_profile", ["simulator.html", "adapters/study-key-chamber-model.js"]),
    entry("knowing-quiz", exact("hearth-knowing-quiz"), "json", "object", "knowing", "global_legacy", "quiz_attempts", "convert_to_attempts", ["simulator.html"]),

    entry("practice-state", exact("hearth-practice-state"), "json", "object", "practice", "global_legacy", "practice_profile_state", "copy_to_profile", ["assets/js/practice-room.js", "adapters/practice-state.js"]),
    entry("practice-log", exact("hearth-practice-log"), "json", "array", "practice", "record_array", "practice_sessions", "split_records_by_learner", ["assets/js/practice-room.js", "adapters/practice-candle-viewer.js"]),
    entry("practice-notes", exact("hearth-practice-notes"), "json", "array", "practice", "record_array", "practice_reflections", "split_records_by_learner", ["assets/js/practice-room.js"]),
    entry("planned-practice", exact("hearth-planned-practice-v1"), "json", "object", "practice", "single_record", "practice_profile_state", "attach_explicit_learner", ["adapters/practice-planned-session-controller.js"]),
    entry("practice-candle", exact("hearth-practice-candle-v1"), "json", "object", "practice", "single_record", "practice_profile_state", "attach_explicit_learner", ["adapters/practice-candle-viewer.js"]),

    entry("study-chamber", exact("hearth-study-chamber-v1"), "json", "object", "study", "learner_map", "study_profiles", "split_learner_map", ["adapters/study-key-chamber-model.js"]),
    entry("study-locks", exact("hearth-study-locks"), "json", "object", "study", "global_legacy", "study_profiles", "copy_to_profile", ["assets/js/study-key.js", "adapters/study-key-chamber-model.js"]),
    entry("study-notes", exact("hearth-study-notes"), "json", "array", "study", "record_array", "study_evidence", "split_records_by_learner", ["assets/js/study-key.js"]),

    entry("create-profile-state", exact("hearth-create-v1"), "json", "object", "create", "learner_map", "create_profiles", "split_learner_map", ["adapters/create-state.js"]),
    entry("create-current", exact("hearth-create-current"), "json", "object", "create", "global_legacy", "create_profiles", "copy_to_profile", ["assets/js/create-workshop.js", "adapters/create-state.js"]),
    entry("create-projects", exact("hearth-create-projects"), "json", "array", "create", "global_legacy", "create_profiles", "copy_to_profile", ["assets/js/create-workshop.js", "adapters/create-state.js"]),
    entry("create-entry-intent", exact("hearth-create-entry-intent"), "json", "string", "create", "global_legacy", "create_profiles", "copy_to_profile", ["adapters/create-entry-controller.js", "adapters/create-cauldron-scene-viewer.js"]),
    entry("cauldron-notes", exact("cauldron-notes"), "text", "string", "create", "global_legacy", "create_project_notes", "copy_to_profile", ["simulator.html"]),

    entry("play-session", prefix("hearth-play-session-v1:"), "json", "object", "play", "profile_key", "play_sessions", "retain_profile_key", ["adapters/play-atlas-controller.js"]),
    entry("mastery-encounter", prefix("hearth-mastery-encounter-v1:"), "json", "object", "mastery", "profile_key", "mastery_encounters", "retain_profile_key", ["adapters/mastery-phoenix-viewer.js"]),
    entry("learner-insights", exact("hearth-insights"), "json", "array", "shared", "record_array", "learner_reflections", "split_records_by_learner", ["simulator.html"]),
    entry("learner-notebook", prefix("hearth-notebook-"), "text", "string", "shared", "global_legacy", "learner_notes", "copy_to_profile", ["simulator.html", "adapters/notebook-controller.js"]),
    entry("hearth-sessions", exact("hearth-sessions"), "json", "array", "hearth", "record_array", "app_sessions", "split_records_by_learner", ["assets/js/hearth-brain.js"]),
    entry("streak-summary", exact("streak"), "text", "number", "shared", "derived_summary", "derived_progress_summaries", "recalculate", ["adapters/header-tools-controller.js"]),

    entry("flame-position", exact("flameNode"), "text", "string", "shell", "ui_only", "browser_ui_preferences", "keep_browser_local", ["simulator.html"]),
    entry("travelled-paths", exact("travelledPaths"), "json", "array", "shell", "ui_only", "browser_ui_preferences", "do_not_migrate", ["simulator.html"])
  ];

  CATALOG.forEach(function markDormantLegacy(item) {
    if (item.id === "practice-notes" || item.id === "hearth-sessions") {
      item.runtime_status = "dormant_legacy";
    }
  });

  function exact(value) {
    return { kind: "exact", value: value };
  }

  function prefix(value) {
    return { kind: "prefix", value: value };
  }

  function entry(id, match, format, valueType, nodeId, scope, destination, migrationMode, sources) {
    return {
      id: id,
      match: match,
      format: format,
      value_type: valueType,
      node_id: nodeId,
      scope: scope,
      proposed_destination: destination,
      migration_mode: migrationMode,
      runtime_status: "active",
      sources: sources
    };
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function unique(values) {
    return values.filter(function keep(value, index, list) {
      return value && list.indexOf(value) === index;
    });
  }

  function conflict(code, severity, message, details) {
    return {
      code: code,
      severity: severity,
      message: message,
      details: details || {}
    };
  }

  function safeStorageKeys(storage, reportConflicts) {
    var keys = [];
    if (!storage) return keys;
    try {
      if (typeof storage.key === "function" && Number.isFinite(Number(storage.length))) {
        for (var index = 0; index < Number(storage.length); index += 1) {
          var key = storage.key(index);
          if (typeof key === "string") keys.push(key);
        }
      }
    } catch (error) {
      reportConflicts.push(conflict(
        "storage_enumeration_failed",
        "blocking",
        "Storage keys could not be enumerated; dynamic learner keys may be missing from this preview."
      ));
    }
    return unique(keys);
  }

  function safeRead(storage, key) {
    try {
      return { ok: true, raw: storage && typeof storage.getItem === "function" ? storage.getItem(key) : null };
    } catch (error) {
      return { ok: false, raw: null };
    }
  }

  function catalogMatch(key) {
    var matches = CATALOG.filter(function matches(item) {
      if (item.match.kind === "exact") return item.match.value === key;
      return key.indexOf(item.match.value) === 0;
    });
    matches.sort(function longestFirst(left, right) {
      return right.match.value.length - left.match.value.length;
    });
    return matches[0] || null;
  }

  function looksLikeLearnerStorage(key) {
    return /^(hearth-(journey|progress|foundation|doing|knowing|practice|study|create|play|mastery|sessions|insights|notebook)|[fdk]Progress$|streak$)/.test(key);
  }

  function discover(storage, reportConflicts) {
    var discovered = {};
    var enumerated = safeStorageKeys(storage, reportConflicts);

    CATALOG.forEach(function probeExact(item) {
      if (item.match.kind !== "exact") return;
      var result = safeRead(storage, item.match.value);
      if (!result.ok) {
        reportConflicts.push(conflict(
          "storage_read_failed",
          "blocking",
          "A catalogued storage key could not be read.",
          { source_key: item.match.value }
        ));
      } else if (result.raw != null) {
        discovered[item.match.value] = { catalog: item, raw: String(result.raw) };
      }
    });

    enumerated.forEach(function inspectEnumerated(key) {
      if (discovered[key]) return;
      var matched = catalogMatch(key);
      if (!matched && !looksLikeLearnerStorage(key)) return;
      var result = safeRead(storage, key);
      if (!result.ok) {
        reportConflicts.push(conflict(
          "storage_read_failed",
          "blocking",
          "An enumerated learner/progress key could not be read.",
          { source_key: key }
        ));
        return;
      }
      if (result.raw == null) return;
      discovered[key] = {
        catalog: matched || entry(
          "unclassified-storage-key",
          exact(key),
          "unknown",
          "unknown",
          "unknown",
          "unknown",
          "manual_review",
          "manual_review",
          []
        ),
        raw: String(result.raw)
      };
    });

    return discovered;
  }

  function parseSource(raw, catalog) {
    var parsed = raw;
    var parseError = null;
    if (catalog.format === "json") {
      try {
        parsed = JSON.parse(raw);
      } catch (error) {
        parsed = null;
        parseError = "invalid_json";
      }
    }

    var actualType = parsed === null ? "null" : Array.isArray(parsed) ? "array" : typeof parsed;
    var recordCount = 0;
    if (Array.isArray(parsed)) recordCount = parsed.length;
    else if (parsed && typeof parsed === "object") recordCount = Object.keys(parsed).length;
    else if (parsed !== null && parsed !== "") recordCount = 1;

    return {
      parsed: parsed,
      metadata: {
        format: catalog.format,
        expected_type: catalog.value_type,
        actual_type: actualType,
        byte_count: utf8Length(raw),
        record_count: recordCount,
        fingerprint: fingerprint(raw),
        parse_error: parseError
      }
    };
  }

  function utf8Length(value) {
    try {
      return unescape(encodeURIComponent(value)).length;
    } catch (error) {
      return String(value).length;
    }
  }

  function fingerprint(value) {
    var hash = 2166136261;
    var text = String(value);
    for (var index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    var hex = (hash >>> 0).toString(16);
    return "fnv1a32:" + ("00000000" + hex).slice(-8);
  }

  function expectedTypeMatches(expected, actual) {
    if (expected === "number") return actual === "number" || actual === "string";
    return expected === "unknown" || expected === actual;
  }

  function learnerIdFromRecord(record) {
    if (!record || typeof record !== "object") return null;
    return record.learner_id || record.learnerId ||
      (record.learner && (record.learner.id || record.learner.learner_id)) ||
      record.student_id || null;
  }

  function ownershipFor(catalog, key, parsed) {
    var learnerIds = [];
    var missingLearnerRecords = 0;
    var records = [];

    if (catalog.scope === "embedded_profiles") {
      records = parsed && Array.isArray(parsed.students) ? parsed.students : [];
      records.forEach(function profileIds(record) {
        var id = learnerIdFromRecord(record) || (record && record.id);
        if (id) learnerIds.push(String(id));
        else missingLearnerRecords += 1;
      });
    } else if (catalog.scope === "learner_map") {
      var map = parsed && (parsed.learners || parsed.profiles);
      learnerIds = map && typeof map === "object" ? Object.keys(map) : [];
    } else if (catalog.scope === "record_array") {
      records = Array.isArray(parsed) ? parsed : [];
      records.forEach(function recordIds(record) {
        var id = learnerIdFromRecord(record);
        if (id) learnerIds.push(String(id));
        else missingLearnerRecords += 1;
      });
    } else if (catalog.scope === "single_record" || catalog.scope === "learner_record") {
      if (parsed && typeof parsed === "object") {
        var singleId = learnerIdFromRecord(parsed);
        if (singleId) learnerIds.push(String(singleId));
        else if (Object.keys(parsed).length) missingLearnerRecords = 1;
      }
    } else if (catalog.scope === "profile_key") {
      learnerIds.push(String(key.slice(catalog.match.value.length)));
    } else if (catalog.scope === "active_profile" && parsed) {
      learnerIds.push(String(parsed));
    }

    return {
      source_scope: catalog.scope,
      learner_ids: unique(learnerIds),
      records_missing_learner_id: missingLearnerRecords
    };
  }

  function profileContext(discovered) {
    var journeySource = discovered["hearth-journey-v2"];
    var activeSource = discovered["hearth-journey-active-student"];
    var journey = journeySource ? parseSource(journeySource.raw, journeySource.catalog).parsed : null;
    var profiles = journey && Array.isArray(journey.students) ? journey.students.map(function profile(student) {
      return {
        learner_id: student && student.id ? String(student.id) : null
      };
    }).filter(function hasId(profile) { return Boolean(profile.learner_id); }) : [];
    var journeyActive = journey && journey.activeStudentId ? String(journey.activeStudentId) : null;
    var preferenceActive = activeSource ? String(activeSource.raw) : null;
    var active = journeyActive || preferenceActive || (profiles.length === 1 ? profiles[0].learner_id : null);

    profiles.forEach(function markActive(profile) {
      profile.active = profile.learner_id === active;
    });

    return {
      profiles: profiles,
      profile_ids: profiles.map(function id(profile) { return profile.learner_id; }),
      active_learner_id: active,
      journey_active_learner_id: journeyActive,
      preference_active_learner_id: preferenceActive
    };
  }

  function proposalFor(catalog, ownership, context) {
    var learnerIds = ownership.learner_ids.slice();
    var candidate = null;
    var decision = "review";
    var requiresConfirmation = true;

    if (catalog.scope === "ui_only" || catalog.scope === "derived_summary" ||
        catalog.scope === "migration_metadata" || catalog.scope === "active_profile") {
      decision = "retain";
      requiresConfirmation = false;
    } else if (catalog.migration_mode.indexOf("retain") === 0) {
      decision = "retain";
      requiresConfirmation = false;
    } else if (catalog.scope === "global_legacy") {
      candidate = context.active_learner_id;
      if (candidate) learnerIds.push(candidate);
      decision = context.profiles.length === 1 && candidate ? "ready_for_review" : "blocked";
    } else if (ownership.records_missing_learner_id > 0) {
      candidate = context.active_learner_id;
      if (context.profiles.length === 1 && candidate) {
        learnerIds.push(candidate);
        decision = "ready_for_review";
      } else {
        decision = "blocked";
      }
    }

    learnerIds = unique(learnerIds);
    return {
      store: catalog.proposed_destination,
      migration_mode: catalog.migration_mode,
      decision: decision,
      candidate_learner_id: candidate,
      learner_ids: learnerIds,
      requires_confirmation: requiresConfirmation,
      destinations: learnerIds.map(function destination(learnerId) {
        return { learner_id: learnerId, store: catalog.proposed_destination };
      })
    };
  }

  function itemConflicts(catalog, key, source, ownership, proposal, context) {
    var conflicts = [];
    if (catalog.id === "unclassified-storage-key") {
      conflicts.push(conflict(
        "unclassified_learner_storage",
        "blocking",
        "This learner/progress-looking key is not in the reviewed inventory.",
        { source_key: key }
      ));
    }
    if (source.metadata.parse_error) {
      conflicts.push(conflict(
        "invalid_source_json",
        "blocking",
        "The source value is not valid JSON and must be preserved for manual review."
      ));
    } else if (!expectedTypeMatches(catalog.value_type, source.metadata.actual_type)) {
      conflicts.push(conflict(
        "unexpected_source_type",
        "blocking",
        "The source value type does not match the inventory contract.",
        { expected: catalog.value_type, actual: source.metadata.actual_type }
      ));
    }

    if (catalog.scope === "global_legacy") {
      if (!context.profile_ids.length) {
        conflicts.push(conflict(
          "destination_profiles_missing",
          "blocking",
          "No verified Journey learner profile is available as a destination."
        ));
      } else if (!context.active_learner_id) {
        conflicts.push(conflict(
          "destination_learner_missing",
          "blocking",
          "No active learner is available as even a candidate destination."
        ));
      } else if (context.profiles.length > 1) {
        conflicts.push(conflict(
          "ambiguous_global_owner",
          "blocking",
          "Global learner data cannot be attributed safely when more than one profile exists.",
          { candidate_learner_id: context.active_learner_id, profile_ids: context.profile_ids }
        ));
      }
    }

    if (ownership.records_missing_learner_id > 0 && catalog.scope !== "global_legacy") {
      conflicts.push(conflict(
        "records_missing_learner_id",
        context.profiles.length === 1 ? "review" : "blocking",
        "One or more records have no explicit learner identity.",
        { record_count: ownership.records_missing_learner_id, candidate_learner_id: proposal.candidate_learner_id }
      ));
    }

    var unknownIds = ownership.learner_ids.filter(function unknown(id) {
      return context.profile_ids.length > 0 && context.profile_ids.indexOf(id) === -1;
    });
    if (unknownIds.length) {
      conflicts.push(conflict(
        "unknown_learner_id",
        "blocking",
        "Stored learner identity is not present in the Journey profile list.",
        { learner_ids: unknownIds }
      ));
    }

    return conflicts;
  }

  function rollbackFor(key, source) {
    return {
      source_key: key,
      source_fingerprint: source.metadata.fingerprint,
      preserve_source: true,
      delete_source: false,
      backup_required_before_any_future_write: true,
      restore_strategy: "Restore the exact backed-up source value, then remove only destination records named by a reviewed migration manifest."
    };
  }

  function addOverlapConflicts(items) {
    var groups = {};
    items.forEach(function group(item) {
      if (item.proposed_destination.decision === "retain" &&
          item.inventory.scope !== "learner_record" &&
          item.inventory.scope !== "learner_map" &&
          item.inventory.scope !== "record_array") return;
      var groupKey = item.inventory.node_id + "|" + item.proposed_destination.store;
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(item);
    });

    Object.keys(groups).forEach(function reportGroup(groupKey) {
      var group = groups[groupKey];
      if (group.length < 2) return;
      var inventoryIds = unique(group.map(function inventoryId(item) { return item.inventory.id; }));
      if (inventoryIds.length < 2) return;
      var keys = group.map(function sourceKey(item) { return item.source_key; });
      group.forEach(function reportOverlap(item) {
        item.conflicts.push(conflict(
          "overlapping_destination_sources",
          "review",
          "Multiple source keys may describe the same destination data; deduplication rules are required.",
          { source_keys: keys }
        ));
      });
    });
  }

  function inventorySummary(discovered) {
    return CATALOG.map(function summarizeCatalog(item) {
      var matchedKeys = Object.keys(discovered).filter(function matched(key) {
        var match = catalogMatch(key);
        return match && match.id === item.id;
      });
      var summary = clone(item);
      summary.present = matchedKeys.length > 0;
      summary.matched_keys = matchedKeys;
      return summary;
    });
  }

  function preview(storage, options) {
    options = options || {};
    var reportConflicts = [];
    var discovered = discover(storage, reportConflicts);
    var context = profileContext(discovered);

    if (context.journey_active_learner_id && context.preference_active_learner_id &&
        context.journey_active_learner_id !== context.preference_active_learner_id) {
      reportConflicts.push(conflict(
        "active_learner_sources_disagree",
        "blocking",
        "Journey state and the active-learner preference name different learners.",
        {
          journey_active_learner_id: context.journey_active_learner_id,
          preference_active_learner_id: context.preference_active_learner_id
        }
      ));
    }
    if (context.active_learner_id && context.profile_ids.length &&
        context.profile_ids.indexOf(context.active_learner_id) === -1) {
      reportConflicts.push(conflict(
        "active_learner_profile_missing",
        "blocking",
        "The active learner ID does not match a stored Journey profile.",
        { active_learner_id: context.active_learner_id }
      ));
    }

    var items = Object.keys(discovered).sort().map(function buildItem(key) {
      var discoveredItem = discovered[key];
      var source = parseSource(discoveredItem.raw, discoveredItem.catalog);
      var ownership = ownershipFor(discoveredItem.catalog, key, source.parsed);
      var proposal = proposalFor(discoveredItem.catalog, ownership, context);
      var conflicts = itemConflicts(
        discoveredItem.catalog,
        key,
        source,
        ownership,
        proposal,
        context
      );
      if (conflicts.some(function blocks(item) { return item.severity === "blocking"; })) {
        proposal.decision = "blocked";
      }
      return {
        source_key: key,
        inventory: clone(discoveredItem.catalog),
        source: source.metadata,
        ownership: ownership,
        proposed_destination: proposal,
        conflicts: conflicts,
        rollback: rollbackFor(key, source)
      };
    });

    addOverlapConflicts(items);

    var allConflicts = reportConflicts.concat(items.reduce(function collect(result, item) {
      return result.concat(item.conflicts.map(function withSource(itemConflict) {
        var copy = clone(itemConflict);
        copy.source_key = item.source_key;
        return copy;
      }));
    }, []));
    var blockingCount = allConflicts.filter(function blocking(item) {
      return item.severity === "blocking";
    }).length;

    return {
      version: VERSION,
      generated_at: options.now || new Date().toISOString(),
      safety: {
        mode: "read_only",
        can_apply: false,
        write_operations: 0,
        delete_operations: 0,
        source_values_included: false
      },
      profiles: context.profiles,
      active_learner_id: context.active_learner_id,
      inventory: inventorySummary(discovered),
      items: items,
      conflicts: allConflicts,
      summary: {
        catalogued_patterns: CATALOG.length,
        present_source_keys: items.length,
        learner_profiles: context.profiles.length,
        conflicts: allConflicts.length,
        blocking_conflicts: blockingCount,
        ready_for_review: blockingCount === 0
      }
    };
  }

  return {
    version: VERSION,
    inventory: function inventory() { return clone(CATALOG); },
    preview: preview
  };
});
