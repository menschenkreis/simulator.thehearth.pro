/*
 * Foundation lesson shell adapter v0.
 *
 * Renders the small page shell that hosts TeachingEngine for Foundation
 * lessons. This keeps layout glue out of the large simulator page.
 */
(function initFoundationLessonShell(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthFoundationLessonShell = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createFoundationLessonShell() {
  "use strict";

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function replaceChar(ch) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[ch];
    });
  }

  function renderFoundationLessonShell(targetEl, lessonInfo) {
    if (!targetEl || !lessonInfo) {
      return null;
    }

    targetEl.innerHTML =
      '<div style="padding:16px;max-width:800px;margin:0 auto;height:100%;display:flex;flex-direction:column;box-sizing:border-box">' +
        '<button class="back-btn" onclick="showFoundation()" style="flex-shrink:0">← Foundation</button>' +
        '<div style="text-align:center;margin:12px 0 4px;flex-shrink:0">' +
          '<span style="font-family:Cinzel,serif;color:var(--gold);font-size:0.85rem;letter-spacing:2px">' +
            escapeHtml(lessonInfo.label) +
          '</span>' +
        '</div>' +
        '<div id="teach-container" style="flex:1;display:flex;align-items:center;justify-content:center;min-height:0"></div>' +
      '</div>';

    return targetEl.querySelector("#teach-container");
  }

  return {
    version: "0.1.0",
    renderFoundationLessonShell: renderFoundationLessonShell
  };
});
