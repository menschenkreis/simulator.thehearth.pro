/*
 * Create handoff adapter v1.
 *
 * Carries one small, playable idea from another node into the Cauldron without
 * coupling Journey, Do, Practice, or Play to the Create screen implementation.
 */
(function initCreateHandoff(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthCreateHandoff = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createCreateHandoff(root) {
  "use strict";

  function clean(value) {
    return String(value == null ? "" : value).trim();
  }

  function buildSeed(input) {
    input = input || {};
    var ingredient = clean(input.suggested_ingredient || input.ingredient || "riff");
    var source = {
      source_node_id: clean(input.source_node_id || "journey"),
      source_id: clean(input.source_id),
      lesson_id: clean(input.lesson_id),
      journey_level_id: clean(input.journey_level_id),
      title: clean(input.source_title || input.title || "A small musical idea"),
      starter: clean(input.starter),
      instruction: clean(input.instruction),
      capability_ids: Array.isArray(input.capability_ids) ? input.capability_ids.slice() : [],
      attempt_id: clean(input.attempt_id),
      session_id: clean(input.session_id),
      handoff_id: clean(input.handoff_id)
    };

    return {
      id: "seed-" + Date.now(),
      createdAt: new Date().toISOString(),
      title: clean(input.seed_title || "Untitled Song Seed"),
      ingredients: [],
      selected: ingredient ? [ingredient] : [],
      prompt: source.instruction,
      constraint: "Change one thing and keep the rest recognizable.",
      payoff: "",
      mutation: "",
      notes: "",
      firstLyric: "",
      riffIdea: source.starter,
      rhythmIdea: "",
      sourceContext: source
    };
  }

  function createHandoff(options) {
    options = options || {};
    var host = options.root || root;

    function state() {
      if (!host || !host.HearthCreateState || typeof host.HearthCreateState.createStore !== "function") return null;
      return host.HearthCreateState.createStore({ storage: host.localStorage });
    }

    function open(input) {
      var seed = buildSeed(input);
      var createState = state();
      if (!createState) return null;

      createState.setCurrent(seed);
      createState.setIntent("handoff");

      if (host.HearthProgressEvents && host.HearthCreateProgress) {
        var event = host.HearthCreateProgress.buildEvent({
          kind: "handoff_opened",
          learnerId: createState.activeLearnerId(),
          seed: seed,
          sourceContext: seed.sourceContext,
          projectId: seed.id,
          suffix: Date.now() + "-" + Math.random().toString(36).slice(2, 7)
        });
        if (event && typeof host.HearthProgressEvents.appendCanonical === "function") {
          host.HearthProgressEvents.appendCanonical(event, host.localStorage);
        } else if (event && typeof host.HearthProgressEvents.append === "function") {
          host.HearthProgressEvents.append(event, host.localStorage);
        }
      }

      if (host.CreateCauldronScene && typeof host.CreateCauldronScene.render === "function") {
        host.CreateCauldronScene.render();
      } else if (typeof host.showCreate === "function") {
        host.showCreate();
      }
      return seed;
    }

    return { open: open };
  }

  var defaultHandoff = createHandoff({ root: root });
  return {
    version: "1.0.0",
    buildSeed: buildSeed,
    createHandoff: createHandoff,
    open: defaultHandoff.open
  };
});
