/*
 * Pure Create prompt policy.
 *
 * The Cauldron may be playful, but random output is not curriculum. This model
 * keeps early prompts within the learner's current Journey level and leaves the
 * DOM, storage, and rendering decisions to adapters.
 */
(function initCreatePromptPolicy(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthCreatePromptPolicy = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createCreatePromptPolicy() {
  "use strict";

  var LEVEL_ONE_PROMPTS = {
    lyrics: [
      "Write one short line about something you can see or hear right now.",
      "Choose one word and speak it in a steady four-beat rhythm."
    ],
    melody: [
      "Use three notes from A minor pentatonic. Repeat your favourite order.",
      "Play A, then one nearby scale note, then return to A."
    ],
    riff: [
      "Use three notes from A minor pentatonic. Repeat them until they groove.",
      "Play one A root note in three different rhythms."
    ],
    chords: [
      "Hold A minor and change only the rhythm for four bars.",
      "Move slowly between A minor and one chord you already know."
    ],
    rhythm: [
      "Mute the strings and make a four-beat rhythm. Add A minor when it feels steady.",
      "Play one note on beat 1, then leave space."
    ],
    structure: [
      "Make two tiny parts: a musical question and a musical answer.",
      "Repeat one idea twice, then change only its ending."
    ],
    mood: [
      "Play the same three notes softly, then strongly. Keep the version that fits your feeling.",
      "Choose one feeling and show it by changing only touch and volume."
    ],
    wildcard: [
      "Set a two-minute timer. Make one tiny musical idea and keep the part you like.",
      "Choose one note, one rhythm, and one small change."
    ]
  };

  var EARLY_LEVEL_BLOCKLIST = /\b(harmonics?|power chord|no root|polyton|different key|never played|never listened|entire song|complete song|bridge|crescendo|genre you(?:'ve| have) never|maximum exposure)\b/i;

  function clampLevel(value) {
    var parsed = parseInt(value, 10);
    if (!Number.isFinite(parsed)) return 1;
    return Math.max(1, Math.min(8, parsed));
  }

  function maxIngredients(level) {
    level = clampLevel(level);
    if (level === 1) return 1;
    if (level <= 3) return 2;
    return 3;
  }

  function allowedHeatIds(level, heatLevels) {
    level = clampLevel(level);
    return (Array.isArray(heatLevels) ? heatLevels : []).filter(function allowedHeat(heat) {
      return heat && Array.isArray(heat.levels) && heat.levels.indexOf(level) !== -1;
    }).map(function heatId(heat) { return heat.id; });
  }

  function defaultHeatId(level, heatLevels) {
    var allowed = allowedHeatIds(level, heatLevels);
    return allowed[0] || "low";
  }

  function safePrompts(ingredient, level) {
    if (!ingredient || !ingredient.id) return [];
    level = clampLevel(level);
    if (level === 1 && LEVEL_ONE_PROMPTS[ingredient.id]) {
      return LEVEL_ONE_PROMPTS[ingredient.id].slice();
    }
    return (Array.isArray(ingredient.prompts) ? ingredient.prompts : []).filter(function safePrompt(prompt) {
      return level >= 3 || !EARLY_LEVEL_BLOCKLIST.test(String(prompt || ""));
    });
  }

  function choose(items, random) {
    if (!items.length) return "";
    var value = typeof random === "function" ? random() : Math.random();
    var index = Math.max(0, Math.min(items.length - 1, Math.floor(value * items.length)));
    return items[index];
  }

  function ingredientLabel(ingredient) {
    return ingredient ? ingredient.symbol + " " + ingredient.name : "Ingredient";
  }

  function resolve(options) {
    options = options || {};
    var level = clampLevel(options.level);
    var selected = Array.isArray(options.selected) ? options.selected.slice(0, maxIngredients(level)) : [];
    var ingredients = Array.isArray(options.ingredients) ? options.ingredients : [];
    var combos = Array.isArray(options.combos) ? options.combos : [];
    if (!selected.length) return null;

    var selectedIngredients = selected.map(function findIngredient(id) {
      return ingredients.find(function matchingIngredient(item) { return item && item.id === id; });
    }).filter(Boolean);
    if (!selectedIngredients.length) return null;

    if (selectedIngredients.length === 1) {
      var ingredient = selectedIngredients[0];
      var prompts = safePrompts(ingredient, level);
      var prompt = choose(prompts, options.random);
      if (!prompt) return null;
      return {
        constraint: "Single ingredient: " + ingredient.name,
        prompt: ingredient.symbol + " " + ingredient.name + ": " + prompt,
        level: level,
        labels: [ingredientLabel(ingredient)],
        payoff: "",
        selected: [ingredient.id]
      };
    }

    var sorted = selectedIngredients.map(function ingredientId(item) { return item.id; }).sort();
    var match = combos.find(function matchingCombo(combo) {
      if (!combo || clampLevel(combo.level) > level || !Array.isArray(combo.ingredients)) return false;
      return combo.ingredients.slice().sort().join(",") === sorted.join(",");
    });
    if (match) {
      return {
        constraint: match.constraint,
        prompt: match.prompt,
        level: clampLevel(match.level),
        labels: selectedIngredients.map(ingredientLabel),
        payoff: match.payoff || "",
        selected: sorted
      };
    }

    var fallbackPrompts = selectedIngredients.map(function promptForIngredient(ingredient) {
      return choose(safePrompts(ingredient, level), options.random);
    }).filter(Boolean);
    if (!fallbackPrompts.length) return null;
    return {
      constraint: "Combine: " + selectedIngredients.map(ingredientLabel).join(" + "),
      prompt: fallbackPrompts.join("\n\n"),
      level: level,
      labels: selectedIngredients.map(ingredientLabel),
      payoff: "",
      selected: sorted
    };
  }

  return {
    version: "1.0.0",
    clampLevel: clampLevel,
    maxIngredients: maxIngredients,
    allowedHeatIds: allowedHeatIds,
    defaultHeatId: defaultHeatId,
    safePrompts: safePrompts,
    resolve: resolve
  };
});
