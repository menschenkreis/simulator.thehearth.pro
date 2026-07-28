/*
 * Create cauldron viewer adapter v0.
 *
 * Renders the legacy Create Cauldron dashboard.
 */
(function initCreateCauldronViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthCreateCauldronViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createCreateCauldronViewer() {
  "use strict";

  function renderIngredient(ingredient) {
    return '<button class="cauldron-ingredient" data-id="' + ingredient.id + '" onclick="cauldronToggle(\'' + ingredient.id + '\')" style="--ic:' + ingredient.color + '">' +
      '<span class="ci-symbol">' + ingredient.symbol + '</span>' +
      '<span class="ci-name">' + ingredient.name + '</span>' +
    '</button>';
  }

  function renderCauldron(options) {
    options = options || {};
    var ingredients = options.ingredients || [];
    var savedNotes = options.savedNotes || "";
    var ingredientsHtml = ingredients.map(renderIngredient).join('');

    return '<div class="cauldron-wrap">' +
      '<div class="cauldron-header">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">' +
          '<div style="width:10px;height:10px;border-radius:50%;background:#c45a20;box-shadow:0 0 12px #c45a20"></div>' +
          '<span style="font-family:JetBrains Mono;font-size:0.6rem;color:#c45a20;letter-spacing:0.12em;text-transform:uppercase">Create · The Cauldron</span>' +
        '</div>' +
        '<p style="font-size:0.8rem;color:var(--dim);margin:4px 0 0 0;line-height:1.6;max-width:480px">' +
          "Toss ingredients into the cauldron. Pick one element of songwriting, or mix several. The cauldron brews a creative obstruction - a constraint that pushes you somewhere you wouldn't go alone." +
        '</p>' +
      '</div>' +
      '<div class="cauldron-vessel" id="cauldronVessel">' +
        '<img src="assets/svg/cauldron.svg" style="width:100%;max-width:320px;height:auto;display:block;margin:0 auto" />' +
        '<div class="cauldron-prompt-text" id="cauldronPrompt" style="position:relative;margin-top:-120px;z-index:2">The cauldron is still. Add an ingredient.</div>' +
      '</div>' +
      '<div class="cauldron-ingredients">' +
        '<div class="cauldron-ingredients-label">Choose Your Ingredients</div>' +
        '<div class="cauldron-ingredients-grid">' + ingredientsHtml + '</div>' +
        '<button class="cauldron-stir-btn" id="cauldronStirBtn" onclick="cauldronMix()" style="display:none">🔥 Stir the Cauldron</button>' +
        '<div id="cauldronHint" style="font-size:0.65rem;color:var(--dim);margin-top:8px;text-align:center">Select 1+ ingredients, then stir</div>' +
      '</div>' +
      '<div class="cauldron-workstation">' +
        '<div class="cauldron-ingredients-label">Workstation</div>' +
        '<textarea class="cauldron-notes" id="cauldronNotes" placeholder="Write your ideas here..." oninput="saveCauldronNotes()">' + savedNotes + '</textarea>' +
        '<div class="cauldron-workstation-tools">' +
          '<button class="cauldron-tool-btn" onclick="cauldronClear()">Clear</button>' +
          '<button class="cauldron-tool-btn" onclick="cauldronMix()">Stir Again</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function renderMixResult(result) {
    if (!result) return "";
    var levelBadge = result.level <= 2 ? "⚗️" : result.level <= 3 ? "🔥" : "💀";
    var levelNames = ["", "Ingredient", "Filter", "Forge", "Collision", "Alchemy"];
    var levelName = levelNames[result.level] || "";
    var labelHtml = result.labels.map(function renderLabel(label, index) {
      return '<span class="cauldron-mix-label" style="color:' + result.colors[index] + '">' + label + '</span>';
    }).join(' ');
    return levelBadge + ' <span style="font-size:0.65rem;color:var(--dim);text-transform:uppercase;letter-spacing:0.08em">Level ' + result.level + ': ' + levelName + '</span><br>' +
      '<span class="cauldron-mix-row">' + labelHtml + '</span><br>' +
      '<span class="cauldron-constraint">' + result.constraint + '</span><br>' +
      '<span class="cauldron-prompt-body">' + result.prompt + '</span>';
  }

  return {
    version: "0.1.0",
    renderCauldron: renderCauldron,
    renderIngredient: renderIngredient,
    renderMixResult: renderMixResult
  };
});
