/*
 * Session-scoped cross-node handoff store.
 *
 * Keeps one active task envelope while a learner moves between nodes. The
 * handoff survives a refresh, but does not become permanent learner evidence.
 */
(function initCrossNodeHandoffStore(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthCrossNodeHandoffStore = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createCrossNodeHandoffStoreModule() {
  "use strict";

  var DEFAULT_KEY = "hearth-active-handoff-v1";

  function requiredText(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function isUsable(handoff) {
    return Boolean(
      handoff && handoff.version === 1 && requiredText(handoff.id) &&
      requiredText(handoff.learner_id) && requiredText(handoff.source_node_id) &&
      requiredText(handoff.destination_node_id) && handoff.return_route &&
      requiredText(handoff.return_route.node_id)
    );
  }

  function createStore(options) {
    options = options || {};
    var storage = options.storage;
    var key = options.key || DEFAULT_KEY;

    function read() {
      if (!storage || typeof storage.getItem !== "function") return null;
      try {
        var handoff = JSON.parse(storage.getItem(key) || "null");
        if (!isUsable(handoff)) return null;
        if (handoff.expires_at && new Date(handoff.expires_at).getTime() <= Date.now()) {
          clear(handoff.id);
          return null;
        }
        return handoff;
      } catch (error) {
        return null;
      }
    }

    function set(handoff) {
      if (!isUsable(handoff) || !storage || typeof storage.setItem !== "function") return null;
      storage.setItem(key, JSON.stringify(handoff));
      return handoff;
    }

    function current(filters) {
      filters = filters || {};
      var handoff = read();
      if (!handoff) return null;
      if (filters.learnerId && String(handoff.learner_id) !== String(filters.learnerId)) return null;
      if (filters.destinationNodeId && handoff.destination_node_id !== filters.destinationNodeId) return null;
      return handoff;
    }

    function clear(id) {
      if (!storage || typeof storage.removeItem !== "function") return false;
      var handoff = readWithoutExpiry();
      if (id && handoff && handoff.id !== id) return false;
      storage.removeItem(key);
      return true;
    }

    function readWithoutExpiry() {
      if (!storage || typeof storage.getItem !== "function") return null;
      try { return JSON.parse(storage.getItem(key) || "null"); } catch (error) { return null; }
    }

    return { clear: clear, current: current, read: read, set: set };
  }

  return {
    version: "1.0.0",
    key: DEFAULT_KEY,
    createStore: createStore,
    isUsable: isUsable
  };
});
