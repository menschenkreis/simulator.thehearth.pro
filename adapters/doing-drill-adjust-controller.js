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
    easier: "Easier mode coming soon. Try slowing the BPM.",
    harder: "Harder mode coming soon. Try adding accents or increasing BPM."
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
