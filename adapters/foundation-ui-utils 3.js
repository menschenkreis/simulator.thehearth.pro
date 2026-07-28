/*
 * Foundation UI utility adapter v0.
 *
 * Small display helpers shared by legacy Foundation views while larger
 * rendering pieces are moved out of simulator.html.
 */
(function initFoundationUiUtils(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthFoundationUiUtils = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createFoundationUiUtils() {
  "use strict";

  var COLORS = [
    "#e74c3c",
    "#e67e22",
    "#f1c40f",
    "#2ecc71",
    "#3498db",
    "#42d6c5",
    "#9b59b6",
    "#d76aa8",
    "#d4af69",
    "#ffb347"
  ];

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

  function colorForIndex(index) {
    return COLORS[index % COLORS.length];
  }

  return {
    version: "0.1.0",
    COLORS: COLORS.slice(),
    escapeHtml: escapeHtml,
    colorForIndex: colorForIndex
  };
});
