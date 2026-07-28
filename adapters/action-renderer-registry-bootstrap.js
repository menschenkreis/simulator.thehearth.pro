/*
 * Action renderer registry bootstrap v0.
 *
 * Creates the shared browser registry instance used by TeachingEngine action
 * steps. Actual renderer implementations register themselves elsewhere.
 */
(function initActionRendererRegistry(root) {
  "use strict";

  if (root.HearthActionRendererRegistry) {
    return;
  }

  if (!root.HearthRendererRegistry || typeof root.HearthRendererRegistry.createRegistry !== "function") {
    throw new Error("HearthRendererRegistry is required before action-renderer-registry-bootstrap.js");
  }

  root.HearthActionRendererRegistry = root.HearthRendererRegistry.createRegistry();
})(typeof globalThis !== "undefined" ? globalThis : this);
