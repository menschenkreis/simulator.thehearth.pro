/*
 * Create cauldron controller adapter v0.
 *
 * Updates legacy Create Cauldron selection and reset UI.
 */
(function initCreateCauldronController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthCreateCauldronController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createCreateCauldronController(root) {
  "use strict";

  function syncSelectionUi(selected, doc) {
    doc = doc || root.document;
    if (!doc) return;
    selected = selected || new Set();
    Array.prototype.forEach.call(doc.querySelectorAll(".cauldron-ingredient"), function updateButton(btn) {
      if (selected.has(btn.dataset.id)) btn.classList.add("selected");
      else btn.classList.remove("selected");
    });
    var stirBtn = doc.getElementById("cauldronStirBtn");
    var count = selected.size;
    if (stirBtn) stirBtn.style.display = count > 0 ? "inline-block" : "none";
    var hint = doc.getElementById("cauldronHint");
    if (hint) hint.style.display = count > 0 ? "none" : "block";
  }

  function resetCauldronUi(doc) {
    doc = doc || root.document;
    if (!doc) return;
    var textEl = doc.getElementById("cauldronPrompt");
    if (textEl) {
      textEl.innerHTML = "Select ingredients and stir the cauldron.";
      textEl.style.color = "";
    }
    syncSelectionUi(new Set(), doc);
  }

  return {
    version: "0.1.0",
    resetCauldronUi: resetCauldronUi,
    syncSelectionUi: syncSelectionUi
  };
});
