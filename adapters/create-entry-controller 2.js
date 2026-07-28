/* global document, localStorage */
(function initCreateEntryController(root) {
  "use strict";

  var selectedMode = "ingredient";
  var lastSnapshot = null;

  function createState() {
    return root.HearthCreateState && typeof root.HearthCreateState.createStore === "function"
      ? root.HearthCreateState.createStore({ storage: localStorage })
      : null;
  }

  function saveCurrent(seed) {
    var state = createState();
    if (state) return state.setCurrent(seed, journeyState());
    localStorage.setItem("hearth-create-current", JSON.stringify(seed));
    return seed;
  }

  function setIntent(intent) {
    var state = createState();
    if (state) return state.setIntent(intent, journeyState());
    localStorage.setItem("hearth-create-entry-intent", JSON.stringify(intent || ""));
    return intent;
  }

  function projects() {
    var state = createState();
    if (state) return state.listProjects(journeyState());
    try {
      return JSON.parse(localStorage.getItem("hearth-create-projects") || "[]");
    } catch (_error) {
      return [];
    }
  }

  function panel() {
    document.querySelectorAll(".pnl").forEach(function hidePanel(item) {
      item.classList.remove("on");
    });
    var target = document.getElementById("p-foundation");
    if (target) target.classList.add("on");
    return target;
  }

  function journeyState() {
    if (typeof root.getJourneyState === "function") return root.getJourneyState();
    return read("hearth-journey-v2", null);
  }

  function snapshot() {
    return root.HearthCreateEntryModel.buildSnapshot({
      storage: localStorage,
      journeyState: journeyState(),
      createState: createState(),
      ingredients: root.CAULDRON_INGREDIENTS || []
    });
  }

  function playClick() {
    if (typeof root.playSfx === "function") root.playSfx("click");
  }

  function blankSeed() {
    return {
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
      rhythmIdea: ""
    };
  }

  function openCauldron(intent) {
    if (intent) setIntent(intent);
    if (root.CreateCauldronScene && typeof root.CreateCauldronScene.render === "function") {
      root.CreateCauldronScene.render();
      return;
    }
    if (typeof root.showCreate === "function" && root.showCreate !== showCreate) root.showCreate();
  }

  function receiveFirePrompt() {
    var ingredients = (root.CAULDRON_INGREDIENTS || []).filter(function withPrompt(ingredient) {
      return ingredient && ingredient.id && Array.isArray(ingredient.prompts) && ingredient.prompts.length;
    });
    if (!ingredients.length) {
      openCauldron("prompt");
      return;
    }
    var ingredient = ingredients[Math.floor(Math.random() * ingredients.length)];
    var seed = blankSeed();
    seed.selected = [ingredient.id];
    saveCurrent(seed);
    openCauldron("prompt");
    if (root.CreateCauldronScene && typeof root.CreateCauldronScene.stirCauldron === "function") {
      root.CreateCauldronScene.stirCauldron();
    }
  }

  function setSelectedMode(mode) {
    if (["continue", "ingredient", "prompt", "archive"].indexOf(mode) < 0) return;
    selectedMode = mode;
    document.querySelectorAll("[data-create-mode]").forEach(function updateHotspot(button) {
      var selected = button.getAttribute("data-create-mode") === mode;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });
    var context = document.getElementById("create-entry-context");
    if (context && lastSnapshot) {
      context.innerHTML = root.HearthCreateEntryViewer.renderContext(lastSnapshot, mode);
      bindContext(context);
    }
  }

  function loadSaved(index) {
    var saved = projects();
    if (!saved[index]) return;
    saveCurrent(Object.assign({}, saved[index]));
    openCauldron("archive");
  }

  function handleAction(action) {
    playClick();
    if (action === "select-ingredient") {
      setSelectedMode("ingredient");
      return;
    }
    if (action === "continue-seed") {
      openCauldron("continue");
      return;
    }
    if (action === "new-seed") {
      saveCurrent(blankSeed());
      openCauldron("ingredient");
      return;
    }
    if (action === "ask-fire") {
      receiveFirePrompt();
    }
  }

  function bindContext(rootEl) {
    (rootEl || document).querySelectorAll("[data-create-action]").forEach(function bindAction(button) {
      button.addEventListener("click", function onActionClick() {
        handleAction(button.getAttribute("data-create-action"));
      });
    });
    (rootEl || document).querySelectorAll("[data-create-load]").forEach(function bindLoad(button) {
      button.addEventListener("click", function onLoadClick() {
        loadSaved(Number(button.getAttribute("data-create-load")));
      });
    });
  }

  function bindEntry(target) {
    target.querySelectorAll("[data-create-mode]").forEach(function bindMode(button) {
      button.addEventListener("click", function onModeClick() {
        playClick();
        setSelectedMode(button.getAttribute("data-create-mode"));
      });
    });
    var back = target.querySelector("[data-create-back]");
    if (back) back.addEventListener("click", function onBackClick() {
      if (typeof root.backToMap === "function") root.backToMap();
    });
    bindContext(target);
  }

  function showCreate() {
    var target = panel();
    if (!target || !root.HearthCreateEntryModel || !root.HearthCreateEntryViewer) return;
    lastSnapshot = snapshot();
    selectedMode = lastSnapshot.current.hasMaterial ? "continue" : "ingredient";
    target.innerHTML = root.HearthCreateEntryViewer.render(lastSnapshot, selectedMode);
    bindEntry(target);
  }

  root.HearthCreateEntryController = {
    version: "1.0.0",
    showCreate: showCreate,
    selectMode: setSelectedMode,
    openCauldron: openCauldron,
    receiveFirePrompt: receiveFirePrompt
  };
  root.showCreate = showCreate;

  root.addEventListener("hearth:journey-state", function refreshCreateForLearner() {
    if (document.querySelector(".create-entry-shell")) showCreate();
  });
})(window);
