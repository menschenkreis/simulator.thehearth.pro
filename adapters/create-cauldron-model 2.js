/*
 * Create cauldron model adapter v0.
 *
 * Resolves selected Create ingredients into a cauldron prompt result.
 */
(function initCreateCauldronModel(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthCreateCauldronModel = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createCreateCauldronModel() {
  "use strict";

  function ingredientById(ingredients, id) {
    return (ingredients || []).find(function isIngredient(item) {
      return item.id === id;
    });
  }

  function pickPrompt(ingredient) {
    var prompts = (ingredient && ingredient.prompts) || [];
    return prompts.length ? prompts[Math.floor(Math.random() * prompts.length)] : "";
  }

  function labelsFor(ingredients, selected) {
    return selected.map(function labelFor(id) {
      var ingredient = ingredientById(ingredients, id);
      return ingredient ? ingredient.symbol + " " + ingredient.name : id;
    });
  }

  function colorsFor(ingredients, selected) {
    return selected.map(function colorFor(id) {
      var ingredient = ingredientById(ingredients, id);
      return ingredient ? ingredient.color : "#d4af69";
    });
  }

  function matchingCombo(combos, selected) {
    var sorted = selected.slice().sort().join(",");
    return (combos || []).find(function isMatch(combo) {
      return combo.ingredients.slice().sort().join(",") === sorted;
    });
  }

  function mixResult(ingredients, combos, selected) {
    selected = selected || [];
    if (!selected.length) return null;

    if (selected.length === 1) {
      var ingredient = ingredientById(ingredients, selected[0]);
      if (!ingredient) return null;
      return {
        colors: [ingredient.color],
        constraint: "Single ingredient: " + ingredient.name,
        labels: [ingredient.symbol + " " + ingredient.name],
        level: 1,
        prompt: pickPrompt(ingredient)
      };
    }

    var labels = labelsFor(ingredients, selected);
    var colors = colorsFor(ingredients, selected);
    var combo = matchingCombo(combos, selected);
    if (combo) {
      return {
        colors: colors,
        constraint: combo.constraint,
        labels: labels,
        level: combo.level,
        prompt: combo.prompt
      };
    }

    var prompts = selected.map(function promptFor(id) {
      return pickPrompt(ingredientById(ingredients, id));
    });
    return {
      colors: colors,
      constraint: "Combine: " + labels.join(" + "),
      labels: labels,
      level: selected.length,
      prompt: prompts.join("<br><br>")
    };
  }

  return {
    version: "0.1.0",
    colorsFor: colorsFor,
    labelsFor: labelsFor,
    matchingCombo: matchingCombo,
    mixResult: mixResult
  };
});
