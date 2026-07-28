/*
 * Foundation action renderer adapters v0.
 *
 * Registers existing LESSON_1_FOUNDATION action render functions behind stable
 * renderer keys. This keeps old visuals working while new lesson seeds can use
 * renderer_key / renderer_config contracts.
 */
(function initFoundationActionRenderers(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthFoundationActionRenderers = factory();
    if (root.HearthActionRendererRegistry && root.LESSON_1_FOUNDATION) {
      root.HearthFoundationActionRenderers.registerLegacyFoundationActionRenderers(
        root.LESSON_1_FOUNDATION,
        root.HearthActionRendererRegistry
      );
    }
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createFoundationActionRenderers() {
  "use strict";

  var LEGACY_RENDERER_MAPPINGS = [
    { renderer_key: "foundation.body_scan", source_step_order: 4 },
    { renderer_key: "foundation.first_sounds", source_step_order: 12 },
    { renderer_key: "foundation.note_movement", source_step_order: 15 },
    { renderer_key: "foundation.e_major_chord", source_step_order: 18 }
  ];

  function registerLegacyFoundationActionRenderers(lesson, registry) {
    if (!lesson || !Array.isArray(lesson.steps) || !registry || typeof registry.register !== "function") {
      return registry;
    }

    LEGACY_RENDERER_MAPPINGS.forEach(function registerMapping(mapping) {
      var sourceStep = lesson.steps[mapping.source_step_order - 1];
      if (!sourceStep || typeof sourceStep.render !== "function") {
        return;
      }

      registry.register(mapping.renderer_key, function renderLegacyFoundationAction(context) {
        context = context || {};
        return sourceStep.render(
          context.container,
          context.advance,
          context.lesson || lesson,
          context.state || {},
          context.config || {}
        );
      });
    });

    return registry;
  }

  return {
    version: "0.1.0",
    LEGACY_RENDERER_MAPPINGS: LEGACY_RENDERER_MAPPINGS.slice(),
    registerLegacyFoundationActionRenderers: registerLegacyFoundationActionRenderers
  };
});
