/*
 * Recorder controller adapter v0.
 *
 * Keeps the legacy recorder button state update outside the large page.
 */
(function initRecorderController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthRecorderController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createRecorderController(root) {
  "use strict";

  function byId(doc, id) {
    return doc && doc.getElementById ? doc.getElementById(id) : null;
  }

  function recorderButton(doc) {
    return byId(doc, "rb") || byId(doc, "rec-btn");
  }

  function applyRecordingState(recording, doc) {
    doc = doc || root.document;
    var button = recorderButton(doc);
    var status = byId(doc, "rs");
    if (button && button.classList) {
      if (recording) button.classList.add("on");
      else button.classList.remove("on");
      button.textContent = recording ? "⏹" : "⏺";
    }
    if (status) status.textContent = recording ? "Recording..." : "Saved";
  }

  function toggleRecording(recording, doc) {
    var next = !recording;
    applyRecordingState(next, doc);
    return next;
  }

  return {
    version: "0.1.0",
    applyRecordingState: applyRecordingState,
    toggleRecording: toggleRecording
  };
});
