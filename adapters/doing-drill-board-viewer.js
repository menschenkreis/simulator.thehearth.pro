/*
 * Doing drill board viewer adapter v0.
 *
 * Renders the level/string drill grid for the legacy Doing view.
 */
(function initDoingDrillBoardViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDoingDrillBoardViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingDrillBoardViewer(root) {
  "use strict";

  function renderDoingDrillBoard(options) {
    options = options || {};
    var doing = options.doing;
    var config = options.config || root.HearthDoingConfig;
    var ui = options.ui || root.HearthDoingUiUtils;
    var boardModel = options.boardModel || root.HearthDoingDrillBoardModel;
    var progress = options.progress || {};
    var activeStyle = options.activeStyle || "all";
    var activeLevel = options.activeLevel || "all";
    var activeSearch = options.activeSearch || "";
    var activeBoard = options.activeBoard || "both-hands";

    if (!doing || !config || !ui || !boardModel) {
      return "";
    }

    var levels = config.levels;
    var boards = config.trainingBoards || [];
    var board = config.boardForId ? config.boardForId(activeBoard) : boards[0];
    var stringRows = (board && board.rows) || config.stringRows;
    var stateOrder = config.stateOrder;
    var stateLabels = config.stateLabels;
    var genreFilters = config.genreFilters;
    var esc = ui.escapeHtml;
    var boardOptions = {
      doing: doing,
      config: config,
      activeStyle: activeStyle,
      activeLevel: activeLevel,
      activeSearch: activeSearch,
      activeBoard: activeBoard
    };

    var totalDrills = 0;
    var doneDrills = 0;
    var nextVisible = null;
    doing.categories.forEach(function eachCategory(cat) {
      cat.drills.forEach(function eachDrill(drill) {
        if (boardModel.isVisible(boardOptions, cat, drill)) {
          totalDrills++;
          var drillState = boardModel.getState(progress, stateOrder, drill.id);
          if (!nextVisible && (!drillState || drillState === "seen")) {
            nextVisible = { cat: cat, drill: drill };
          }
          if (drillState === "mastered") {
            doneDrills++;
          }
        }
      });
    });

    var html = '<div class="doing-board-intro">' +
      '<div><div class="doing-board-kicker">Physical board</div>' +
      '<h3>' + esc(board ? board.title : "Training Board") + "</h3>" +
      '<p>' + esc(board ? board.description : "Choose one drill dot and train it cleanly.") + "</p></div>" +
      '<div class="doing-board-tabs" id="doing-board-tabs">';
    boards.forEach(function renderBoardTab(item) {
      html += '<button class="doing-board-tab' + (item.id === activeBoard ? " active" : "") + '" data-board="' + esc(item.id) + '">' +
        '<span>' + esc(item.shortLabel || item.label) + "</span>" +
        '<small>' + esc(item.layout === "neck" ? "Neck" : item.layout === "soundhole" ? "Soundhole" : "Whole guitar") + "</small>" +
        "</button>";
    });
    html += "</div></div>";

    if (activeBoard === "left-hand") {
      html += '<div class="doing-jen-focus">' +
        '<div><span>Jen focus</span><strong>A minor pentatonic + clean left-hand contact</strong></div>' +
        '<ul>' +
          '<li>A roots</li>' +
          '<li>A minor pentatonic box</li>' +
          '<li>E / A landmarks</li>' +
          '<li>tiny finger-independence</li>' +
        '</ul>' +
      '</div>';
    }

    html += '<div class="doing-controls">' +
      '<div id="doing-level-filters" class="doing-level-rail">' +
      '<span class="doing-level-filter' + (activeLevel === "all" ? " active" : "") + '" data-level="all">All levels<span class="filter-count">' + boardModel.countForAllGenresAllLevels(boardOptions) + "</span></span>";
    levels.forEach(function renderLevel(lv) {
      var lvCount = boardModel.countForLevelAnyGenre(boardOptions, lv.level);
      html += '<span class="doing-level-filter' + (String(activeLevel) === String(lv.level) ? " active" : "") + (lvCount === 0 ? " disabled" : "") + '" data-level="' + lv.level + '">' + lv.label + '<span class="filter-count">' + lvCount + "</span></span>";
    });
    html += "</div>" +
      '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
      '<input id="doing-search" class="doing-search" type="text" placeholder="Search drills..." value="' + esc(activeSearch) + '">' +
      '<div id="style-filters" style="display:flex;gap:6px;flex-wrap:wrap">' +
      '<span class="style-filter' + (activeStyle === "all" ? " active" : "") + '" data-style="all">All genres<span class="filter-count">' + boardModel.countForGenre(boardOptions, "all") + "</span></span>";
    genreFilters.forEach(function renderGenre(genre) {
      var genreCount = boardModel.countForGenre(boardOptions, genre.id);
      html += '<span class="style-filter' + (activeStyle === genre.id ? " active" : "") + (genreCount === 0 ? " disabled" : "") + '" data-style="' + esc(genre.id) + '">' + esc(genre.label) + '<span class="filter-count">' + genreCount + "</span></span>";
    });
    html += "</div></div></div>";

    if (nextVisible) {
      html += '<button class="doing-board-next" data-cat="' + esc(nextVisible.cat.id) + '" data-drill="' + esc(nextVisible.drill.id) + '">' +
        '<span>Start here</span>' +
        '<strong>' + esc(nextVisible.drill.title) + '</strong>' +
        '<small>' + esc(nextVisible.cat.title + " · Level " + config.levelForDrill(nextVisible.drill) + " · " + nextVisible.drill.duration) + "</small>" +
        "</button>";
    }

    html += '<div class="doing-fretboard-stage doing-board-stage doing-board-' + esc(board ? board.layout : "neck") + '">' +
      '<div class="doing-string-labels" aria-label="Standard guitar tuning">';
    stringRows.forEach(function renderStringLabel(row) {
      html += '<div class="doing-string-note" title="' + esc(row.hint) + '">' + esc(row.label) + "</div>";
    });
    html += "</div>" +
      '<div class="doing-fretboard-wrap"><div class="doing-board-art" aria-hidden="true"></div><div class="doing-fretboard">' +
      '<div class="doing-fret-header">';
    levels.forEach(function renderLevelHeader(lv) {
      html += '<div class="doing-level-head" title="' + esc(lv.tag) + '">' +
        '<div class="doing-level-roman">' + esc(lv.label.replace("Level ", "")) + "</div>" +
        '<div class="doing-level-name">' + esc(lv.name) + "</div>" +
        "</div>";
    });
    html += "</div>";

    stringRows.forEach(function renderStringRow(row) {
      var filtered = boardModel.rowDrills(boardOptions, row);
      html += '<div class="doing-string-row" data-string="' + esc(row.id) + '" style="--string-weight:' + esc(row.weight) + '">';
      levels.forEach(function renderFretCell(lv) {
        var drills = filtered.filter(function atLevel(item) {
          return config.levelForDrill(item.drill) === lv.level;
        });
        html += '<div class="doing-fret-cell" data-level="' + esc(lv.level) + '">';
        if (drills.length) {
          drills.forEach(function renderDrillDot(item) {
            var drill = item.drill;
            var cat = item.cat;
            var level = config.levelForDrill(drill);
            var state = boardModel.getState(progress, stateOrder, drill.id);
            var isNext = nextVisible && nextVisible.drill.id === drill.id;
            html += '<button class="drill-dot level-' + esc(level) + (isNext ? " is-next" : "") + '" data-cat="' + esc(cat.id) + '" data-drill="' + esc(drill.id) + '" data-state="' + esc(state) + '" data-level="' + esc(level) + '" data-short="' + esc(ui.drillShort(drill)) + '" title="' + esc(cat.title + ": " + drill.title) + '"></button>';
          });
        } else {
          html += '<span class="doing-empty-fret">-</span>';
        }
        html += "</div>";
      });
      html += "</div>";
    });

    html += "</div></div></div>" +
      '<div class="doing-legend">' +
      "<span><i></i> Untouched</span>" +
      '<span><i style="border-color:#e8a020"></i> In training</span>' +
      '<span class="done"><i></i> Mastered</span>' +
      '<span style="margin-left:auto">' + doneDrills + "/" + totalDrills + " mastered in view</span>" +
      "</div>" +
      (totalDrills === 0 ? '<div style="margin-top:10px;color:var(--dim);font-size:0.75rem">No drills match this search and filter combination.</div>' : "");

    return html;
  }

  return {
    version: "0.1.0",
    renderDoingDrillBoard: renderDoingDrillBoard
  };
});
