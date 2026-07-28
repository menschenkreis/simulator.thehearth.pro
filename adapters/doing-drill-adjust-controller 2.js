/*
 * Doing drill adjustment controller adapter v0.
 *
 * Binds the legacy easier/harder drill adjustment buttons.
 */
(function initDoingDrillAdjustController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDoingDrillAdjustController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingDrillAdjustController(root) {
  "use strict";

  var messages = {
    easier: "Make this easier: slow the BPM, use fewer notes, and aim for one clean repeat.",
    harder: "Make this harder: add accents, raise the BPM slightly, or keep the phrase going for one extra cycle."
  };

  function messageForAdjustment(adjustment) {
    return messages[adjustment] || "";
  }

  function bindDrillAdjustButtons(options) {
    options = options || {};
    var rootEl = options.rootEl;
    var alertFn = options.alertFn || root.alert;
    if (!rootEl || !alertFn) return;

    rootEl.querySelectorAll(".doing-adj-btn").forEach(function bindButton(btn) {
      btn.onclick = function onAdjustClick() {
        var message = messageForAdjustment(btn.getAttribute("data-adj"));
        if (message) alertFn(message);
      };
    });
  }

  return {
    version: "0.1.0",
    bindDrillAdjustButtons: bindDrillAdjustButtons,
    messageForAdjustment: messageForAdjustment
  };
});
