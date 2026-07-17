/*
 * Doing drill board viewer adapter v1.
 *
 * Renders a real six-string, twelve-fret drill library over the shared wood
 * asset. Drill data and progress remain independent from the artwork.
 */
(function initDoingDrillBoardViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDoingDrillBoardViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingDrillBoardViewer(root) {
  "use strict";

  var STRING_LABELS = ["e", "B", "G", "D", "A", "E"];
  var FRET_COUNT = 12;
  var CATEGORY_ROWS = {
    speed: 1,
    styles: 1,
    arpeggios: 2,
    scales: 3,
    picking: 4,
    fretting: 5,
    fundamentals: 5,
    rhythm: 6
  };

  function hashString(value) {
    var hash = 0;
    String(value || "").split("").forEach(function hashChar(ch) {
      hash = ((hash * 31) + ch.charCodeAt(0)) >>> 0;
    });
    return hash;
  }

  function assignPositions(items) {
    var used = {};
    return items.map(function assignPosition(item, index) {
      var row = CATEGORY_ROWS[item.cat.id] || ((index % 6) + 1);
      if (!used[row]) used[row] = {};
      var fret = (hashString(item.drill.id) % FRET_COUNT) + 1;
      var attempts = 0;
      while (used[row][fret] && attempts < FRET_COUNT) {
        fret = (fret % FRET_COUNT) + 1;
        attempts++;
      }
      if (attempts >= FRET_COUNT) {
        row = (row % 6) + 1;
        if (!used[row]) used[row] = {};
        fret = (hashString(item.drill.id + index) % FRET_COUNT) + 1;
        while (used[row][fret]) fret = (fret % FRET_COUNT) + 1;
      }
      used[row][fret] = true;
      return { item: item, row: row, fret: fret };
    });
  }

  function progressDegrees(state, stateOrder) {
    if (!state) return 0;
    var index = stateOrder.indexOf(state);
    return index < 0 ? 0 : Math.round(((index + 1) / stateOrder.length) * 360);
  }

  function optionHtml(esc, value, label, selected) {
    return '<option value="' + esc(value) + '"' + (String(value) === String(selected) ? " selected" : "") + '>' + esc(label) + '</option>';
  }

  function renderDoingDrillBoard(options) {
    options = options || {};
    var doing = options.doing;
    var config = options.config || root.HearthDoingConfig;
    var ui = options.ui || root.HearthDoingUiUtils;
    var boardModel = options.boardModel || root.HearthDoingDrillBoardModel;
    var progress = options.progress || {};
    var activeStyle = options.activeStyle || "all";
    var activeLevel = String(options.activeLevel === "all" ? "1" : (options.activeLevel || "1"));
    var activeSearch = options.activeSearch || "";
    var activeBoard = options.activeBoard || "all";
    var activeCategory = options.activeCategory || "all";
    var activeStatus = options.activeStatus || "all";

    if (!doing || !config || !ui || !boardModel) return "";

    var esc = ui.escapeHtml;
    var stateOrder = config.stateOrder || [];
    var boardOptions = {
      doing: doing,
      config: config,
      progress: progress,
      stateOrder: stateOrder,
      activeStyle: activeStyle,
      activeLevel: activeLevel,
      activeSearch: activeSearch,
      activeBoard: activeBoard,
      activeCategory: activeCategory,
      activeStatus: activeStatus
    };
    var visible = boardModel.visibleDrills(boardOptions);
    var positioned = assignPositions(visible);
    var selectedBoard = activeBoard === "all" ? null : config.boardForId(activeBoard);
    var title = selectedBoard ? selectedBoard.title : "Drill Library";
    var description = selectedBoard
      ? selectedBoard.description
      : "Every physical drill lives here. Filter the library without losing your place on the instrument.";
    var mastered = visible.filter(function countMastered(entry) {
      return boardModel.getState(progress, stateOrder, entry.drill.id) === "mastered";
    }).length;
    var nextVisible = visible.find(function findNext(entry) {
      var state = boardModel.getState(progress, stateOrder, entry.drill.id);
      return !state || state === "seen";
    }) || visible[0] || null;

    var html = '<section class="doing-library" aria-label="Guitar drill library">' +
      '<header class="doing-library-head">' +
        '<div><div class="doing-board-kicker">Do node &middot; Level ' + esc(activeLevel) + '</div>' +
        '<h3>' + esc(title) + '</h3><p>' + esc(description) + '</p></div>' +
        '<div class="doing-library-progress" aria-label="' + mastered + ' of ' + visible.length + ' drills mastered">' +
          '<strong>' + mastered + '<span>/' + visible.length + '</span></strong><small>mastered in view</small>' +
        '</div>' +
      '</header>' +
      '<div class="doing-library-toolbar" aria-label="Drill filters">' +
        '<label><span>Level</span><select id="doing-level-select">';
    config.levels.forEach(function renderLevel(level) {
      html += optionHtml(esc, level.level, level.label, activeLevel);
    });
    html += '</select></label><label><span>Area</span><select id="doing-board-select">' +
      optionHtml(esc, "all", "All drills", activeBoard);
    (config.trainingBoards || []).forEach(function renderBoard(board) {
      html += optionHtml(esc, board.id, board.label, activeBoard);
    });
    html += '</select></label><label><span>Skill</span><select id="doing-category-select">' +
      optionHtml(esc, "all", "All skills", activeCategory);
    doing.categories.forEach(function renderCategory(cat) {
      html += optionHtml(esc, cat.id, cat.title, activeCategory);
    });
    html += '</select></label><label><span>Genre</span><select id="doing-style-select">' +
      optionHtml(esc, "all", "All genres", activeStyle);
    config.genreFilters.forEach(function renderGenre(genre) {
      html += optionHtml(esc, genre.id, genre.label, activeStyle);
    });
    html += '</select></label><label><span>Status</span><select id="doing-status-select">' +
      optionHtml(esc, "all", "Any status", activeStatus) +
      optionHtml(esc, "new", "New", activeStatus) +
      optionHtml(esc, "in-progress", "In progress", activeStatus) +
      optionHtml(esc, "mastered", "Mastered", activeStatus) +
      '</select></label><label class="doing-library-search"><span>Search</span>' +
      '<input id="doing-search" type="search" value="' + esc(activeSearch) + '" placeholder="Find a drill"></label>' +
      '</div>';

    if (nextVisible) {
      var nextState = boardModel.getState(progress, stateOrder, nextVisible.drill.id);
      html += '<button class="doing-board-next doing-library-next" data-cat="' + esc(nextVisible.cat.id) + '" data-drill="' + esc(nextVisible.drill.id) + '">' +
        '<span>Next drill</span><strong>' + esc(nextVisible.drill.title) + '</strong>' +
        '<small>' + esc(nextVisible.cat.title + " - " + nextVisible.drill.duration + (nextState ? " - Continue" : "")) + '</small></button>';
    }

    html += '<div class="doing-library-scroll" role="region" tabindex="0" aria-label="Twelve-fret drill board">' +
      '<div class="doing-library-instrument">' +
        '<div class="doing-library-fret-numbers" aria-hidden="true">';
    for (var fretNumber = 1; fretNumber <= FRET_COUNT; fretNumber++) {
      html += '<span>' + fretNumber + '</span>';
    }
    html += '</div><div class="doing-library-neck">' +
      '<div class="doing-library-frets" aria-hidden="true">';
    for (var fretWire = 1; fretWire <= FRET_COUNT; fretWire++) html += '<i></i>';
    html += '</div><div class="doing-library-strings" aria-hidden="true">';
    STRING_LABELS.forEach(function renderString(label, index) {
      html += '<i style="--string-row:' + (index + 1) + ';--string-weight:' + (1 + (index * 0.38)) + 'px"><span>' + esc(label) + '</span></i>';
    });
    html += '</div><div class="doing-library-inlays" aria-hidden="true">' +
      '<i style="grid-column:3"></i><i style="grid-column:5"></i><i style="grid-column:7"></i><i style="grid-column:9"></i>' +
      '<i class="double one" style="grid-column:12"></i><i class="double two" style="grid-column:12"></i>' +
      '</div><div class="doing-library-nodes">';

    positioned.forEach(function renderDrillNode(position) {
      var item = position.item;
      var state = boardModel.getState(progress, stateOrder, item.drill.id);
      var level = config.levelForDrill(item.drill);
      var isNext = nextVisible && nextVisible.drill.id === item.drill.id;
      var degrees = progressDegrees(state, stateOrder);
      html += '<button class="drill-dot doing-library-dot level-' + esc(level) + (isNext ? " is-next" : "") + '" ' +
        'style="grid-column:' + position.fret + ';grid-row:' + position.row + ';--node-progress:' + degrees + 'deg" ' +
        'data-cat="' + esc(item.cat.id) + '" data-drill="' + esc(item.drill.id) + '" data-state="' + esc(state) + '" ' +
        'data-level="' + esc(level) + '" data-short="' + esc(ui.drillShort(item.drill)) + '" ' +
        'aria-label="' + esc(item.cat.title + ": " + item.drill.title) + '" title="' + esc(item.cat.title + ": " + item.drill.title) + '">' +
        '<span>' + esc(ui.drillShort(item.drill)) + '</span></button>';
    });

    html += '</div>' +
      (visible.length ? "" : '<div class="doing-library-empty">No drills match these filters.</div>') +
      '</div></div></div>' +
      '<footer class="doing-library-legend">' +
        '<span><i class="new"></i>New</span><span><i class="progress"></i>In progress</span><span><i class="complete"></i>Mastered</span>' +
        '<b>' + visible.length + ' drill' + (visible.length === 1 ? "" : "s") + '</b>' +
      '</footer></section>';

    return html;
  }

  return {
    version: "1.0.0",
    assignPositions: assignPositions,
    progressDegrees: progressDegrees,
    renderDoingDrillBoard: renderDoingDrillBoard
  };
});
