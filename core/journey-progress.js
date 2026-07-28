/*
 * Pure Journey capability evidence summary.
 *
 * This module reads progress-event values but never reads or writes storage.
 * Journey uses it to decide what evidence exists without treating lesson count
 * as proof that a capability is usable.
 */
(function initJourneyProgress(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthJourneyProgress = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createJourneyProgress() {
  "use strict";

  var DEFAULT_STAGES = [
    "not_encountered",
    "contact",
    "attempted",
    "demonstrated",
    "applied_musically",
    "consolidated",
    "externally_assessed"
  ];

  function normalizeLevelId(value, eventContract) {
    if (eventContract && typeof eventContract.normalizeJourneyLevelId === "function") {
      return eventContract.normalizeJourneyLevelId(value);
    }
    var raw = String(value || "").trim();
    var match = raw.match(/^level[-_ ]?(\d+)$/i);
    return match ? "L" + match[1] : raw.toUpperCase();
  }

  function journeyStage(value, eventContract) {
    if (eventContract && typeof eventContract.toJourneyEvidenceStage === "function") {
      var mapped = eventContract.toJourneyEvidenceStage(value);
      if (mapped) return mapped;
    }
    var compatibility = {
      attempt: "attempted",
      demonstration: "demonstrated",
      application: "applied_musically",
      consolidation: "consolidated"
    };
    return compatibility[value] || value || "not_encountered";
  }

  function eventValue(record) {
    if (!record || typeof record !== "object") return null;
    if (record.source_format && record.event) {
      if (record.valid === false) return null;
      return record.event;
    }
    return record;
  }

  function eventCapabilityIds(event) {
    if (Array.isArray(event.capability_ids)) return event.capability_ids;
    if (event.data && Array.isArray(event.data.capability_ids)) return event.data.capability_ids;
    return [];
  }

  function stageIndex(stage, stages) {
    var index = stages.indexOf(stage);
    return index >= 0 ? index : 0;
  }

  function summarize(options) {
    options = options || {};
    var stages = Array.isArray(options.evidenceStages) && options.evidenceStages.length
      ? options.evidenceStages.slice()
      : DEFAULT_STAGES.slice();
    var capabilities = Array.isArray(options.capabilities) ? options.capabilities : [];
    var capabilityById = {};
    var evidence = {};
    var learnerId = String(options.learnerId || "");
    var levelId = normalizeLevelId(options.levelId, options.eventContract);

    capabilities.forEach(function rememberCapability(capability) {
      capabilityById[capability.id] = capability;
      evidence[capability.id] = {
        capabilityId: capability.id,
        stage: "not_encountered",
        sourceNodeId: null,
        eventId: null,
        met: false
      };
    });

    (Array.isArray(options.events) ? options.events : []).forEach(function collectEvidence(record) {
      var event = eventValue(record);
      if (!event || String(event.learner_id || "") !== learnerId) return;
      if (normalizeLevelId(event.journey_level_id, options.eventContract) !== levelId) return;
      var stage = journeyStage(event.evidence_stage || (event.data && event.data.evidence_stage), options.eventContract);
      var currentStageIndex = stageIndex(stage, stages);

      eventCapabilityIds(event).forEach(function creditCapability(capabilityId) {
        var capability = capabilityById[capabilityId];
        if (!capability) return;
        if (Array.isArray(capability.nodeIds) && capability.nodeIds.indexOf(event.node_id) === -1) return;
        var previous = evidence[capabilityId];
        if (currentStageIndex <= stageIndex(previous.stage, stages)) return;
        evidence[capabilityId] = {
          capabilityId: capabilityId,
          stage: stage,
          sourceNodeId: event.node_id || null,
          eventId: event.id || null,
          met: false
        };
      });
    });

    var required = capabilities.filter(function requiredCapability(capability) {
      return capability.required !== false;
    });
    var metRequired = 0;
    var encountered = 0;
    var familyIds = {};
    var encounteredFamilies = {};

    capabilities.forEach(function finalizeCapability(capability) {
      var item = evidence[capability.id];
      var minimum = capability.minimumEvidence || "attempted";
      item.met = stageIndex(item.stage, stages) >= stageIndex(minimum, stages);
      item.minimumEvidence = minimum;
      if (item.stage !== "not_encountered") {
        encountered += 1;
        if (capability.familyId) encounteredFamilies[capability.familyId] = true;
      }
      if (capability.familyId) familyIds[capability.familyId] = true;
      if (capability.required !== false && item.met) metRequired += 1;
    });

    return {
      levelId: levelId,
      learnerId: learnerId,
      capabilityEvidence: evidence,
      metRequired: metRequired,
      totalRequired: required.length,
      encountered: encountered,
      totalCapabilities: capabilities.length,
      encounteredFamilies: Object.keys(encounteredFamilies).length,
      totalFamilies: Object.keys(familyIds).length,
      percent: required.length ? Math.round((metRequired / required.length) * 100) : 0,
      complete: required.length > 0 && metRequired === required.length
    };
  }

  return {
    version: "1.0.0",
    stages: DEFAULT_STAGES.slice(),
    normalizeLevelId: normalizeLevelId,
    summarize: summarize
  };
});
