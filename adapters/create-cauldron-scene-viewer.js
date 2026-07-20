// Active Create Cauldron scene.
(function initCreateCauldronSceneViewer(root) {
  "use strict";

  var FIRE = "#c45a20";

  var CREATE_HEAT_LEVELS = [
    { id: "low", label: "Low Heat", levels: [1, 2], guide: "Playful pressure. Enough spark to begin.", constraint: "Keep it tiny: make one idea for two minutes.", color: "#44cc44" },
    { id: "medium", label: "Medium Heat", levels: [2, 3], guide: "Focused pressure. Make one clear choice.", constraint: "Repeat it three times before you add anything new.", color: "#ffcc00" },
    { id: "high", label: "High Heat", levels: [3, 4], guide: "Emotional pressure. Let the idea show its teeth.", constraint: "Use the version that feels a little risky, then keep the strongest part.", color: "#ff8800" },
    { id: "alchemy", label: "Alchemy", levels: [4, 5], guide: "Maximum exposure. No hiding behind cleverness.", constraint: "Remove the obvious choice and replace it with one unexpected move.", color: "#ff4444" },
  ];

  var CREATE_MUTATIONS = {
    simpler: "Strip it down. Use fewer notes, fewer words, and one clearer emotional target.",
    darker: "Let the hidden ache speak. Keep the surface controlled, but make the meaning sharper.",
    stranger: "Break one expected choice. Let the idea wobble without becoming nonsense.",
    rhythmic: "Make rhythm lead. The words or notes must obey the pulse.",
    oneNote: "Use one note only. Change rhythm, silence, and touch until it says something.",
  };

  var createHeat = "medium";
  var activeHandoff = null;

  function handoffStore() {
    if (!root.HearthCrossNodeHandoffStore || typeof root.HearthCrossNodeHandoffStore.createStore !== "function") return null;
    return root.HearthCrossNodeHandoffStore.createStore({ storage: root.sessionStorage });
  }

  function readCreateHandoff() {
    var store = handoffStore();
    if (!store) return null;
    var learnerId = activeHandoff && activeHandoff.learner_id;
    return store.current({ learnerId: learnerId || undefined, destinationNodeId: "create" });
  }

  function returnToSource() {
    var handoff = activeHandoff || readCreateHandoff();
    var route = handoff && handoff.return_route;
    var store = handoffStore();
    if (store && handoff) store.clear(handoff.id);
    activeHandoff = null;
    if (route && route.node_id === "journey" && root.Journey) {
      var params = route.params || {};
      if (typeof root.Journey.openCompanionLesson === "function") root.Journey.openCompanionLesson(params.learner_id);
      if (typeof root.Journey.focusCompanionStep === "function" && Number.isFinite(Number(params.step_index))) {
        root.Journey.focusCompanionStep(Number(params.step_index));
      }
      return;
    }
    if (typeof root.backToMap === "function") root.backToMap();
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[ch];
    });
  }

  function read(key, fallback) {
    try {
      return JSON.parse(root.localStorage.getItem(key) || JSON.stringify(fallback));
    } catch (_err) {
      return fallback;
    }
  }

  function write(key, value) {
    root.localStorage.setItem(key, JSON.stringify(value));
  }

  function createState() {
    return root.HearthCreateState && typeof root.HearthCreateState.createStore === "function"
      ? root.HearthCreateState.createStore({ storage: root.localStorage })
      : null;
  }

  function panel() {
    root.document.querySelectorAll(".pnl").forEach(function (pnl) {
      pnl.classList.remove("on");
    });
    var el = root.document.getElementById("p-foundation");
    if (el) el.classList.add("on");
    return el;
  }

  function getCreateSeed() {
    var state = createState();
    if (state) return state.getCurrent();
    return read("hearth-create-current", {});
  }

  function saveCreateSeed(seed) {
    var state = createState();
    if (state) return state.setCurrent(seed);
    write("hearth-create-current", seed);
    return seed;
  }

  function createIntent() {
    var state = createState();
    if (state) return state.getIntent();
    return read("hearth-create-entry-intent", "");
  }

  function setCreateIntent(intent) {
    var state = createState();
    if (state) return state.setIntent(intent);
    write("hearth-create-entry-intent", intent || "");
    return intent;
  }

  function saveCreateProject(seed) {
    var state = createState();
    if (state) return state.saveProject(seed);
    var projects = read("hearth-create-projects", []);
    projects.push(Object.assign({}, seed, { savedAt: new Date().toISOString() }));
    write("hearth-create-projects", projects);
    return seed;
  }

  function recordCreateEvent(eventType, data) {
    if (!root.HearthProgressEvents || typeof root.HearthProgressEvents.append !== "function") return;
    data = data || {};
    root.HearthProgressEvents.append({
      event_type: eventType,
      node_id: "create",
      journey_level_id: data.journey_level_id || null,
      source_id: data.source_id || null,
      project_id: data.seed_id || null,
      data: data
    });
  }

  function renderSourceContext(seed) {
    var source = seed && seed.sourceContext;
    if (!source || !source.instruction) return "";
    return '<div style="width:min(100%,520px);box-sizing:border-box;margin:0 auto 12px;padding:10px 12px;border-left:2px solid rgba(212,175,105,.7);background:linear-gradient(90deg,rgba(212,175,105,.11),rgba(212,175,105,0));font-size:.72rem;line-height:1.45;color:var(--text)">' +
      '<div style="font-family:JetBrains Mono,monospace;font-size:.54rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:4px">From ' + esc(source.source_node_id || "Journey") + '</div>' +
      '<strong style="display:block;font-family:Cinzel,serif;color:#f4dca5;font-size:.78rem;margin-bottom:3px">' + esc(source.starter || source.title || "A small musical idea") + '</strong>' +
      esc(source.instruction) +
    '</div>';
  }

  function createHeatGlow() {
    var heat = CREATE_HEAT_LEVELS.find(function (item) {
      return item.id === createHeat;
    });
    return heat ? heat.color : "#ffcc00";
  }

  function renderCauldronSvg(selectedCount, glowColor) {
    return (
      '<svg viewBox="0 0 260 320" style="width:100%;max-width:220px;height:auto;display:block;margin:0 auto">' +
      "<defs>" +
      '<radialGradient id="cauldronGlow"><stop offset="0%" stop-color="' + glowColor + '" stop-opacity="0.35"/><stop offset="100%" stop-color="' + glowColor + '" stop-opacity="0"/></radialGradient>' +
      "</defs>" +
      '<circle cx="130" cy="160" r="120" fill="url(#cauldronGlow)"/>' +
      '<ellipse cx="130" cy="260" rx="80" ry="18" fill="rgba(0,0,0,0.25)"/>' +
      '<path d="M60,140 Q60,240 130,250 Q200,240 200,140 L200,120 Q130,100 60,120Z" fill="#1a1510" stroke="' + glowColor + '" stroke-opacity="0.4" stroke-width="2"/>' +
      '<path d="M55,120 Q130,95 205,120 L200,125 Q130,100 60,125Z" fill="#2a1f14" stroke="' + glowColor + '" stroke-opacity="0.3"/>' +
      '<path d="M100,110 L100,80 Q130,70 160,80 L160,110" fill="none" stroke="#3a2a18" stroke-width="4" stroke-linecap="round"/>' +
      (selectedCount > 0
        ? '<path d="M130,100 C120,85 125,70 130,60 C135,70 140,85 130,100Z" fill="' + glowColor + '" opacity="0.8"><animate attributeName="d" dur="1.2s" repeatCount="indefinite" values="M130,100 C120,85 125,70 130,60 C135,70 140,85 130,100Z;M130,95 C118,80 122,65 130,52 C138,65 142,80 130,95Z;M130,100 C120,85 125,70 130,60 C135,70 140,85 130,100Z"/></path>' +
          '<path d="M130,85 C125,75 127,65 130,58 C133,65 135,75 130,85Z" fill="#fff2b8" opacity="0.6"></path>'
        : "") +
      "</svg>"
    );
  }

  function renderCreate() {
    activeHandoff = readCreateHandoff();
    var el = panel();
    if (!el) return;

    var ingredients = root.CAULDRON_INGREDIENTS || [];
    var seed = getCreateSeed();
    var selected = new Set(seed.selected || []);
    var hasSeed = seed.prompt && seed.prompt.length > 0;
    var glowColor = createHeatGlow();
    var entryIntent = createIntent();
    var guideText = hasSeed
      ? "Shape the seed. Mutate it. Save it when it sings."
      : entryIntent === "prompt"
        ? "Ask one clear question. Choose an ingredient, then let the constraint give you somewhere to begin."
        : entryIntent === "handoff"
          ? "The lesson has brought you a small musical thread. Keep it playable, then make one part of it your own."
        : entryIntent === "ingredient"
          ? "Begin with one ingredient. A chord, rhythm, riff, lyric, or question is enough."
          : "Do not judge the spark too early. Add one ingredient, catch what bubbles up, then shape it.";

    var ingredientButtons = ingredients.map(function (ingredient) {
      var active = selected.has(ingredient.id);
      return (
        '<button class="sf-ing' + (active ? " active" : "") + '" style="--c:' + ingredient.color + '" onclick="CreateCauldronScene.toggleIngredient(\'' + esc(ingredient.id) + "')\">" +
        "<span>" + esc(ingredient.symbol) + "</span> " + esc(ingredient.name) +
        "</button>"
      );
    }).join("");

    var heatPills = CREATE_HEAT_LEVELS.map(function (heat) {
      var active = createHeat === heat.id;
      return (
        '<button class="practice-pill' + (active ? " active" : "") + '" style="' + (active ? "border-color:" + heat.color + ";color:" + heat.color : "") + '" onclick="CreateCauldronScene.setHeat(\'' + heat.id + "')\">" +
        esc(heat.label) +
        "</button>"
      );
    }).join("");

    var stirButton = selected.size > 0 ? '<button class="sf-stir-btn" onclick="CreateCauldronScene.stirCauldron()">Stir the Cauldron</button>' : "";
    var hint = selected.size > 0 ? "" : '<div style="font-size:.62rem;color:var(--dim);margin-top:6px;text-align:center">Select ingredients, then choose heat</div>';
    var workstation = hasSeed ? renderWorkstation(seed) : "";

    el.innerHTML =
      '<div class="sk-wrap">' +
      '<button class="back-btn" onclick="' + (activeHandoff ? "CreateCauldronScene.returnToSource()" : "backToMap()") + '">\u2190 ' + (activeHandoff ? "Return to Journey" : "Map") + '</button>' +
      '<div class="sk-scene">' +
      '<div class="sk-top">' +
      "<div>" +
      '<div class="sk-kicker">Create</div>' +
      '<div class="sk-title">The Cauldron</div>' +
      '<div class="sk-sub">Create begins with one object: the cauldron. Ingredients are constraints. The song seed appears after you throw something in.</div>' +
      "</div>" +
      '<div class="sk-guide">' +
      '<img src="images/character-symbols/Celebrator with sparks.png" alt="">' +
      "<div>" + guideText + "</div>" +
      "</div>" +
      "</div>" +
      '<div class="sf-stage" style="flex-direction:column;min-height:auto;padding:8px 18px">' +
      renderCauldronSvg(selected.size, glowColor) +
      renderSourceContext(seed) +
      '<div style="text-align:center;color:var(--gold);font-family:Cinzel;font-size:.82rem;margin:8px auto 0;max-width:420px;line-height:1.5;white-space:pre-line">' +
      esc(seed.prompt || "Select ingredients and stir the cauldron.") +
      "</div>" +
      "</div>" +
      (hasSeed ? "" :
        '<div class="sf-stage" style="min-height:auto;padding:8px 18px;flex-direction:column">' +
        '<div style="font-family:Cinzel;font-size:.72rem;color:var(--gold);margin-bottom:6px">Heat</div>' +
        '<div class="practice-choice-row" style="justify-content:center">' + heatPills + "</div>" +
        '<div style="font-family:Cinzel;font-size:.72rem;color:var(--gold);margin:12px 0 6px">Ingredients</div>' +
        '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:520px;width:100%">' + ingredientButtons + "</div>" +
        stirButton + hint +
        "</div>"
      ) +
      '<div id="sf-create-work">' + workstation + "</div>" +
      "</div>" +
      "</div>";
  }

  function renderWorkstation(seed) {
    var heatLabel = CREATE_HEAT_LEVELS.find(function (item) {
      return item.id === createHeat;
    });
    var ingredientChips = (seed.ingredients || []).map(function (ingredient) {
      return '<span style="background:rgba(212,175,105,0.12);border:1px solid rgba(212,175,105,0.25);border-radius:999px;padding:3px 8px;font-size:.62rem;color:var(--gold)">' + esc(ingredient) + "</span>";
    }).join(" ");
    var mutationButtons = Object.keys(CREATE_MUTATIONS).map(function (key) {
      return '<button class="practice-pill" onclick="CreateCauldronScene.mutateSeed(\'' + key + "')\">" + esc(key.charAt(0).toUpperCase() + key.slice(1)) + "</button>";
    }).join("");

    return (
      '<div class="practice-session-controls" style="margin-top:16px">' +
      '<input id="create-title" value="' + esc(seed.title || "Untitled Song Seed") + '" style="width:100%;box-sizing:border-box;background:rgba(0,0,0,0.25);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:10px;font-family:Cinzel;font-size:.85rem;margin-bottom:10px" placeholder="Song seed title">' +
      '<div style="font-family:JetBrains Mono;font-size:.58rem;color:' + (heatLabel ? heatLabel.color : "var(--gold)") + ';letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">' + (heatLabel ? esc(heatLabel.label) : "") + "</div>" +
      '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px">' + ingredientChips + "</div>" +
      (seed.prompt ? '<div style="font-size:.78rem;color:var(--text);line-height:1.6;margin-bottom:6px;white-space:pre-line">' + esc(seed.prompt) + "</div>" : "") +
      (seed.constraint ? '<div style="font-size:.68rem;color:var(--dim);margin-bottom:4px"><b>Constraint:</b> ' + esc(seed.constraint) + "</div>" : "") +
      (seed.payoff ? '<div style="font-size:.68rem;color:var(--amber);margin-bottom:10px"><b>Payoff:</b> ' + esc(seed.payoff) + "</div>" : "") +
      '<div style="font-family:Cinzel;font-size:.72rem;color:var(--gold);margin:10px 0 4px">Shape the Seed</div>' +
      '<textarea id="create-notes" style="width:100%;box-sizing:border-box;background:rgba(0,0,0,0.25);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:10px;min-height:60px;font:inherit" placeholder="Notes, chords, structure...">' + esc(seed.notes || "") + "</textarea>" +
      '<textarea id="create-first-lyric" style="width:100%;box-sizing:border-box;background:rgba(0,0,0,0.25);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:10px;min-height:50px;font:inherit;margin-top:6px" placeholder="First lyric line...">' + esc(seed.firstLyric || "") + "</textarea>" +
      '<input id="create-riff" value="' + esc(seed.riffIdea || "") + '" style="width:100%;box-sizing:border-box;background:rgba(0,0,0,0.25);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:10px;font:inherit;margin-top:6px" placeholder="Riff idea...">' +
      '<input id="create-rhythm" value="' + esc(seed.rhythmIdea || "") + '" style="width:100%;box-sizing:border-box;background:rgba(0,0,0,0.25);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:10px;font:inherit;margin-top:6px" placeholder="Rhythm idea...">' +
      (seed.mutation ? '<div style="font-size:.68rem;color:var(--amber);margin-top:8px;font-style:italic">Mutation: ' + esc(seed.mutation) + "</div>" : "") +
      '<div style="font-family:Cinzel;font-size:.72rem;color:var(--gold);margin:12px 0 4px">Mutate</div>' +
      '<div class="practice-choice-row">' + mutationButtons + "</div>" +
      '<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">' +
      '<button class="practice-light-btn" style="width:auto;margin-top:0" onclick="CreateCauldronScene.saveSeed()">Save Seed</button>' +
      '<button class="practice-pill" onclick="CreateCauldronScene.newSeed()">New Seed</button>' +
      "</div>" +
      "</div>"
    );
  }

  function showCreate() {
    createHeat = "medium";
    renderCreate();
  }

  function toggleIngredient(id) {
    var seed = getCreateSeed();
    var selected = new Set(seed.selected || []);
    if (selected.has(id)) selected.delete(id);
    else selected.add(id);
    seed.selected = Array.from(selected);
    saveCreateSeed(seed);
    renderCreate();
  }

  function stirCauldron() {
    var seedState = getCreateSeed();
    var selected = seedState.selected || [];
    if (!selected.length) return;

    var ingredients = root.CAULDRON_INGREDIENTS || [];
    var combos = root.CREATE_COMBOS || [];
    var result = null;

    if (selected.length === 1) {
      var ingredient = ingredients.find(function (item) {
        return item.id === selected[0];
      });
      if (ingredient) {
        var prompt = ingredient.prompts[Math.floor(Math.random() * ingredient.prompts.length)];
        result = {
          constraint: "Single ingredient: " + ingredient.name,
          prompt: ingredient.symbol + " " + ingredient.name + ": " + prompt,
          level: 1,
          labels: [ingredient.symbol + " " + ingredient.name],
          payoff: "",
        };
      }
    } else {
      var sorted = selected.slice().sort();
      var match = combos.find(function (combo) {
        return combo.ingredients.slice().sort().join(",") === sorted.join(",");
      });
      if (match) {
        result = {
          constraint: match.constraint,
          prompt: match.prompt,
          level: match.level,
          labels: selected.map(ingredientLabel),
          payoff: match.payoff || "",
        };
      } else {
        result = {
          constraint: "Combine: " + selected.map(ingredientLabel).join(" + "),
          prompt: selected.map(randomIngredientPrompt).join("\n\n"),
          level: selected.length,
          labels: selected.map(ingredientLabel),
          payoff: "",
        };
      }
    }

    if (!result) return;
    var heat = CREATE_HEAT_LEVELS.find(function (item) {
      return item.id === createHeat;
    });
    if (heat && heat.constraint) {
      result.constraint += " " + heat.constraint;
    }
    setCreateIntent("");
    var levelBadge = result.level <= 2 ? "Ingredient" : result.level <= 3 ? "Forge" : "Alchemy";
    var seed = {
      id: "seed-" + Date.now(),
      createdAt: new Date().toISOString(),
      title: "Untitled Song Seed",
      heat: createHeat,
      heatLabel: heat ? heat.label : "",
      sourceContext: seedState.sourceContext || null,
      ingredients: selected.map(function (id) {
        var ingredient = ingredients.find(function (item) {
          return item.id === id;
        });
        return ingredient ? ingredient.name : id;
      }),
      prompt: "L" + result.level + " " + levelBadge + ": " + result.labels.join(" + ") + "\n" + result.constraint + "\n" + result.prompt,
      constraint: result.constraint,
      payoff: result.payoff || "",
      mutation: "",
      notes: "",
      firstLyric: "",
      riffIdea: "",
      rhythmIdea: "",
    };
    saveCreateSeed(seed);
    recordCreateEvent("create_seed_started", {
      seed_id: seed.id,
      heat: createHeat,
      ingredients: seed.ingredients,
      prompt_level: result.level
    });
    renderCreate();
  }

  function ingredientLabel(id) {
    var ingredient = (root.CAULDRON_INGREDIENTS || []).find(function (item) {
      return item.id === id;
    });
    return ingredient ? ingredient.symbol + " " + ingredient.name : id;
  }

  function randomIngredientPrompt(id) {
    var ingredient = (root.CAULDRON_INGREDIENTS || []).find(function (item) {
      return item.id === id;
    });
    if (!ingredient) return "";
    return ingredient.prompts[Math.floor(Math.random() * ingredient.prompts.length)];
  }

  function saveSeed() {
    var seed = getCreateSeed();
    var title = root.document.getElementById("create-title");
    var notes = root.document.getElementById("create-notes");
    var firstLyric = root.document.getElementById("create-first-lyric");
    var riffIdea = root.document.getElementById("create-riff");
    var rhythmIdea = root.document.getElementById("create-rhythm");
    if (title) seed.title = title.value;
    if (notes) seed.notes = notes.value;
    if (firstLyric) seed.firstLyric = firstLyric.value;
    if (riffIdea) seed.riffIdea = riffIdea.value;
    if (rhythmIdea) seed.rhythmIdea = rhythmIdea.value;
    saveCreateSeed(seed);
    var saved = saveCreateProject(seed);
    var source = saved.sourceContext || {};
    recordCreateEvent("create_seed_saved", {
      seed_id: saved.id,
      source_node_id: source.source_node_id || null,
      source_id: source.source_id || null,
      journey_level_id: source.journey_level_id || null,
      capability_ids: Array.isArray(source.capability_ids) ? source.capability_ids.slice() : [],
      evidence_stage: "attempt",
      ingredients: saved.ingredients || [],
      has_lyric: Boolean(saved.firstLyric),
      has_riff: Boolean(saved.riffIdea),
      has_rhythm: Boolean(saved.rhythmIdea)
    });
    renderCreate();
  }

  function newSeed() {
    setCreateIntent("");
    saveCreateSeed({
      title: "Untitled Song Seed",
      ingredients: [],
      selected: [],
      prompt: "",
      constraint: "",
      payoff: "",
      mutation: "",
      notes: "",
      firstLyric: "",
      riffIdea: "",
      rhythmIdea: "",
    });
    renderCreate();
  }

  function setHeat(id) {
    createHeat = id;
    renderCreate();
  }

  function mutateSeed(type) {
    var seed = getCreateSeed();
    seed.mutation = CREATE_MUTATIONS[type] || "";
    saveCreateSeed(seed);
    recordCreateEvent("create_seed_mutated", { seed_id: seed.id || null, mutation: type });
    renderCreate();
  }

  root.CREATE_HEAT_LEVELS = CREATE_HEAT_LEVELS;
  root.CreateCauldronScene = {
    render: showCreate,
    toggleIngredient: toggleIngredient,
    stirCauldron: stirCauldron,
    saveSeed: saveSeed,
    newSeed: newSeed,
    setHeat: setHeat,
    mutateSeed: mutateSeed,
    returnToSource: returnToSource,
  };
  root.showCreate = showCreate;
})(typeof window !== "undefined" ? window : globalThis);
