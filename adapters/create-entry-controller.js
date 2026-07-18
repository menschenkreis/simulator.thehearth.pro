/* global document, localStorage */
(function initCreateEntryController(root) {
  "use strict";

  var selectedMode = "ingredient";
  var lastSnapshot = null;

  function read(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch (_error) {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
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
    if (intent) localStorage.setItem("hearth-create-entry-intent", intent);
    if (root.CreateCauldronScene && typeof root.CreateCauldronScene.render === "function") {
      root.CreateCauldronScene.render();
      return;
    }
    if (typeof root.showCreate === "function" && root.showCreate !== showCreate) root.showCreate();
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
    var projects = read("hearth-create-projects", []);
    if (!projects[index]) return;
    write("hearth-create-current", Object.assign({}, projects[index]));
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
      write("hearth-create-current", blankSeed());
      openCauldron("ingredient");
      return;
    }
    if (action === "ask-fire") {
      write("hearth-create-current", blankSeed());
      openCauldron("prompt");
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
    openCauldron: openCauldron
  };
  root.showCreate = showCreate;

  root.addEventListener("hearth:journey-state", function refreshCreateForLearner() {
    if (document.querySelector(".create-entry-shell")) showCreate();
  });
})(window);
