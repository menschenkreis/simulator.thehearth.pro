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

  function isVisible(options, cat, drill) {
    var activeStyle = options.activeStyle || "all";
    var activeLevel = options.activeLevel || "all";
    var activeSearch = options.activeSearch || "";
    var config = options.config;

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

  function summarizeProgress(doing, progress, stateOrder) {
    var total = 0;
    var mastered = 0;
    var touched = 0;
    doing.categories.forEach(function eachCategory(cat) {
      cat.drills.forEach(function eachDrill(drill) {
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
      var all = cat.drills.length;
      cat.drills.forEach(function eachDrill(drill) {
        if (getState(progress, stateOrder, drill.id) === "mastered") {
          done++;
        }
      });
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
    matchesGenre: matchesGenre,
    rowDrills: rowDrills,
    summarizeProgress: summarizeProgress,
    weakestCategory: weakestCategory
  };
});
