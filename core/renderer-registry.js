/*
 * Renderer registry v0.
 *
 * Small frontend-facing contract for action-step renderers. This registry only
 * stores functions by key; actual UI renderers can be added later.
 */
(function initRendererRegistry(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthRendererRegistry = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createRendererRegistry() {
  "use strict";

  function createRegistry(initialRenderers) {
    var renderers = {};

    function register(rendererKey, renderer) {
      if (typeof rendererKey !== "string" || rendererKey.trim() === "") {
        throw new Error("rendererKey is required");
      }
      if (typeof renderer !== "function") {
        throw new Error("renderer must be a function");
      }
      renderers[rendererKey] = renderer;
      return api;
    }

    function has(rendererKey) {
      return Object.prototype.hasOwnProperty.call(renderers, rendererKey);
    }

    function get(rendererKey) {
      return has(rendererKey) ? renderers[rendererKey] : null;
    }

    function requireRenderer(rendererKey) {
      var renderer = get(rendererKey);
      if (!renderer) {
        throw new Error("Missing renderer: " + rendererKey);
      }
      return renderer;
    }

    function keys() {
      return Object.keys(renderers).sort();
    }

    function render(rendererKey, context) {
      return requireRenderer(rendererKey)(context || {});
    }

    var api = {
      register: register,
      has: has,
      get: get,
      requireRenderer: requireRenderer,
      keys: keys,
      render: render
    };

    if (initialRenderers && typeof initialRenderers === "object") {
      Object.keys(initialRenderers).forEach(function registerInitial(rendererKey) {
        register(rendererKey, initialRenderers[rendererKey]);
      });
    }

    return api;
  }

  return {
    version: "0.1.0",
    createRegistry: createRegistry
  };
});
