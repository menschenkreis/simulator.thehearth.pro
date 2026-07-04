/*
 * Knowing shelf controller adapter v0.
 *
 * Binds small browser behaviors for the legacy Knowing shelf.
 */
(function initKnowingShelfController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthKnowingShelfController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createKnowingShelfController(root) {
  "use strict";

  function scrollShelf(id, direction, documentRef) {
    documentRef = documentRef || root.document;
    if (!documentRef) return false;
    var el = documentRef.getElementById(id);
    if (!el) return false;
    el.scrollBy({ left: direction * 200, behavior: "smooth" });
    return true;
  }

  function bindShelfGlobals(options) {
    options = options || {};
    var documentRef = options.documentRef || root.document;
    root._scrollShelf = function scrollShelfGlobal(id, direction) {
      return scrollShelf(id, direction, documentRef);
    };
  }

  return {
    version: "0.1.0",
    bindShelfGlobals: bindShelfGlobals,
    scrollShelf: scrollShelf
  };
});
