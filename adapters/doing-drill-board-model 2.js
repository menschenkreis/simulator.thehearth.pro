/*
 * Doing drill board model adapter v0.
 *
 * Pure-ish filtering and summary helpers for the legacy Doing drill board.
 * Rendering still lives in simulator.html for now.
 */
(function initDoingDrillBoardModel(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthDoingDrillBoardModel = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingDrillBoardModel() {
  "use strict";

  function getState(progress, stateOrder, drillId) {
    var value = progress[drillId];
    if (value === true) {
      return "mastered";
    }
    if (stateOrder.indexOf(value) >= 0) {
      return value;
    }
    return "";
  }

  function isLearnerReady(drill) {
    return Boolean(drill && drill.reviewStatus !== "draft");
  }

  function matchesGenre(config, drill, genreId) {
    if (genreId === "all") {
      return true;
    }
    var genre = config.genreFilters.find(function findGenre(g) {
      return g.id === genreId;
    });
    return genre ? genre.styles.indexOf(drill.style) >= 0 : drill.style === genreId;
  }

  function drillMatchesSearch(cat, drill, query) {
    if (!query) {
      return true;
    }
    var normalized = query.toLowerCase();
    return (drill.title + " " + drill.style + " " + cat.title + " " + drill.source).toLowerCase().indexOf(normalized) >= 0;
  }

  function matchesBoard(config, cat, drill, boardId) {
    if (!boardId || boardId === "all") {
      return true;
    }
    var board = config.boardForId ? config.boardForId(boardId) : null;
    if (!board || !board.categories || !board.categories.length) {
      return true;
    }
    return board.categories.indexOf(cat.id) >= 0 || board.categories.indexOf(drill.style) >= 0;
  }

  function matchesCategory(cat, categoryId) {
    return !categoryId || categoryId === "all" || cat.id === categoryId;
  }

  function matchesStatus(progress, stateOrder, drillId, statusId) {
    if (!statusId || statusId === "all") {
      return true;
    }
    var state = getState(progress || {}, stateOrder || [], drillId);
    if (statusId === "new") {
      return !state || state === "seen";
    }
    if (statusId === "in-progress") {
      return Boolean(state) && state !== "mastered";
    }
    return statusId === "mastered" ? state === "mastered" : true;
  }

  function isVisible(options, cat, drill) {
    var activeStyle = options.activeStyle || "all";
    var activeLevel = options.activeLevel || "all";
    var activeSearch = options.activeSearch || "";
    var activeBoard = options.activeBoard || "both-hands";
    var activeCategory = options.activeCategory || "all";
    var activeStatus = options.activeStatus || "all";
    var config = options.config;

    if (!isLearnerReady(drill)) {
      return false;
    }

    if (!matchesBoard(config, cat, drill, activeBoard)) {
      return false;
    }
    if (!matchesCategory(cat, activeCategory)) {
      return false;
    }
    if (!matchesStatus(options.progress, options.stateOrder, drill.id, activeStatus)) {
      return false;
    }
    if (!matchesGenre(config, drill, activeStyle)) {
      return false;
    }
    if (activeLevel !== "all" && String(config.levelForDrill(drill)) !== String(activeLevel)) {
      return false;
    }
    return drillMatchesSearch(cat, drill, activeSearch);
  }

  function countForGenre(options, genreId) {
    var count = 0;
    options.doing.categories.forEach(function eachCategory(cat) {
      cat.drills.forEach(function eachDrill(drill) {
        if (!isLearnerReady(drill)) {
          return;
        }
        if (!matchesBoard(options.config, cat, drill, options.activeBoard || "both-hands")) {
          return;
        }
        if (!matchesCategory(cat, options.activeCategory || "all")) {
          return;
        }
        if (!matchesStatus(options.progress, options.stateOrder, drill.id, options.activeStatus || "all")) {
          return;
        }
        if (!matchesGenre(options.config, drill, genreId)) {
          return;
        }
        if (options.activeLevel !== "all" && String(options.config.levelForDrill(drill)) !== String(options.activeLevel)) {
          return;
        }
        if (!drillMatchesSearch(cat, drill, options.activeSearch || "")) {
          return;
        }
        count++;
      });
    });
    return count;
  }

  function countForLevelAnyGenre(options, level) {
    var count = 0;
    options.doing.categories.forEach(function eachCategory(cat) {
      cat.drills.forEach(function eachDrill(drill) {
        if (!isLearnerReady(drill)) {
          return;
        }
        if (!matchesBoard(options.config, cat, drill, options.activeBoard || "both-hands")) {
          return;
        }
        if (!matchesCategory(cat, options.activeCategory || "all")) {
          return;
        }
        if (!matchesStatus(options.progress, options.stateOrder, drill.id, options.activeStatus || "all")) {
          return;
        }
        if (String(options.config.levelForDrill(drill)) !== String(level)) {
          return;
        }
        if (!drillMatchesSearch(cat, drill, options.activeSearch || "")) {
          return;
        }
        count++;
      });
    });
    return count;
  }

  function countForAllGenresAllLevels(options) {
    var count = 0;
    options.doing.categories.forEach(function eachCategory(cat) {
      cat.drills.forEach(function eachDrill(drill) {
        if (!isLearnerReady(drill)) {
          return;
        }
        if (!matchesBoard(options.config, cat, drill, options.activeBoard || "both-hands")) {
          return;
        }
        if (!matchesCategory(cat, options.activeCategory || "all")) {
          return;
        }
        if (!matchesStatus(options.progress, options.stateOrder, drill.id, options.activeStatus || "all")) {
          return;
        }
        if (!drillMatchesSearch(cat, drill, options.activeSearch || "")) {
          return;
        }
        count++;
      });
    });
    return count;
  }

  function rowDrills(options, row) {
    var items = [];
    options.doing.categories.forEach(function eachCategory(cat) {
      if (row.categories.indexOf(cat.id) < 0) {
        return;
      }
      cat.drills.forEach(function eachDrill(drill) {
        if (isVisible(options, cat, drill)) {
          items.push({ cat: cat, drill: drill });
        }
      });
    });
    return items;
  }

  function visibleDrills(options) {
    var items = [];
    options.doing.categories.forEach(function eachCategory(cat) {
      cat.drills.forEach(function eachDrill(drill) {
        if (isVisible(options, cat, drill)) {
          items.push({ cat: cat, drill: drill });
        }
      });
    });
    return items;
  }

  function summarizeProgress(doing, progress, stateOrder) {
    var total = 0;
    var mastered = 0;
    var touched = 0;
    doing.categories.forEach(function eachCategory(cat) {
      cat.drills.forEach(function eachDrill(drill) {
        if (!isLearnerReady(drill)) {
          return;
        }
        total++;
        var state = getState(progress, stateOrder, drill.id);
        if (state) {
          touched++;
        }
        if (state === "mastered") {
          mastered++;
        }
      });
    });
    return {
      total: total,
      mastered: mastered,
      touched: touched
    };
  }

  function weakestCategory(doing, progress, stateOrder) {
    var weakest = "";
    var lowPct = 101;
    doing.categories.forEach(function eachCategory(cat) {
      var done = 0;
      var all = 0;
      cat.drills.forEach(function eachDrill(drill) {
        if (!isLearnerReady(drill)) {
          return;
        }
        all++;
        if (getState(progress, stateOrder, drill.id) === "mastered") {
          done++;
        }
      });
      if (!all) {
        return;
      }
      var pct = all ? Math.round(done / all * 100) : 0;
      if (pct < lowPct) {
        lowPct = pct;
        weakest = cat.title;
      }
    });
    return {
      title: weakest,
      pct: lowPct
    };
  }

  function findNextDrill(doing, progress, stateOrder) {
    for (var ci = 0; ci < doing.categories.length; ci++) {
      var cat = doing.categories[ci];
      for (var di = 0; di < cat.drills.length; di++) {
        if (!isLearnerReady(cat.drills[di])) {
          continue;
        }
        var state = getState(progress, stateOrder, cat.drills[di].id);
        if (!state || state === "seen") {
          return { cat: cat, drill: cat.drills[di] };
        }
      }
    }
    return null;
  }

  return {
    version: "0.1.0",
    countForAllGenresAllLevels: countForAllGenresAllLevels,
    countForGenre: countForGenre,
    countForLevelAnyGenre: countForLevelAnyGenre,
    drillMatchesSearch: drillMatchesSearch,
    findNextDrill: findNextDrill,
    getState: getState,
    isVisible: isVisible,
    isLearnerReady: isLearnerReady,
    matchesBoard: matchesBoard,
    matchesCategory: matchesCategory,
    matchesGenre: matchesGenre,
    matchesStatus: matchesStatus,
    rowDrills: rowDrills,
    summarizeProgress: summarizeProgress,
    visibleDrills: visibleDrills,
    weakestCategory: weakestCategory
  };
});
