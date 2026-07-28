/*
 * Doing UI utility adapter v0.
 *
 * Small display helpers used by the legacy Doing view while that view is moved
 * out of simulator.html in safer pieces.
 */
(function initDoingUiUtils(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthDoingUiUtils = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingUiUtils() {
  "use strict";

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function replaceChar(ch) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[ch];
    });
  }

  function textOnly(html) {
    return String(html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }

  function firstSentence(html) {
    var txt = textOnly(html);
    var match = txt.match(/^(.{20,160}?[.!?])\s/);
    return match ? match[1] : txt.slice(0, 150);
  }

  function drillShort(drill) {
    var words = String(drill.title || "").replace(/[^\w\s]/g, " ").split(/\s+/).filter(Boolean);
    return words.slice(0, 2).map(function firstLetter(word) {
      return word[0];
    }).join("").toUpperCase().slice(0, 2) || "D";
  }

  return {
    version: "0.1.0",
    drillShort: drillShort,
    escapeHtml: escapeHtml,
    firstSentence: firstSentence,
    textOnly: textOnly
  };
});
