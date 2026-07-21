/*
 * Knowing shelf viewer adapter v0.
 *
 * Renders the legacy Knowing bookshelf screen.
 */
(function initKnowingShelfViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthKnowingShelfViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createKnowingShelfViewer() {
  "use strict";

  var bookColors = ["#8B4513", "#4A6741", "#5B3A6B", "#2C5F7C", "#8B6914", "#6B3A3A", "#3A5B6B", "#5B4A3A", "#6B5B3A", "#3A4A6B"];
  var bookSizeMap = {
    rhythm: [162, 50],
    "chords-harmony": [174, 52],
    scales: [158, 48],
    "technique-improv": [170, 50],
    picking: [148, 46],
    arpeggios: [166, 48],
    fingerstyle: [154, 46],
    theory: [178, 54],
    "reading-music": [144, 44],
    fretboard: [168, 50],
    "dynamics-expression": [156, 48],
    "song-structure": [172, 52],
    "voice-leading": [152, 46],
    "world-music": [164, 50],
    "practice-theory": [160, 48]
  };

  function categoryColor(knowing, cat) {
    var categories = (knowing && knowing.categories) || [];
    var index = categories.findIndex(function findCategory(item) {
      return item.id === cat.id;
    });
    return bookColors[Math.max(0, index) % bookColors.length];
  }

  function bookSize(cat, index) {
    return bookSizeMap[cat.id] || [155 + index * 3, 48 + index % 3 * 3];
  }

  function progressPercent(level) {
    return level.totalTopics ? Math.round(level.totalDone / level.totalTopics * 100) : 0;
  }

  function renderShelfBook(knowing, level, cat, index) {
    var color = categoryColor(knowing, cat);
    var allDone = cat.done === cat.total && cat.total > 0;
    var size = bookSize(cat, index);
    var h = size[0];
    var w = size[1];

    if (!cat.hasTopics) {
      return '<div style="width:' + w + 'px;height:' + h + 'px;background:#2a2622;border:2px solid #333;border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:8px 4px 10px;flex-shrink:0;opacity:0.35;cursor:not-allowed" title="' + cat.title + ' — No Level ' + level.level + ' topics yet">' +
        '<div style="writing-mode:vertical-rl;text-orientation:mixed;font-family:Josefin Sans,sans-serif;font-size:0.6rem;color:#666;text-align:center;line-height:1.1;max-height:' + (h - 20) + 'px;overflow:hidden;letter-spacing:0.08em;text-transform:uppercase">' + cat.title + '</div>' +
      '</div>';
    }

    return '<div onclick="playSfx(\'book-open\');showKnowingBook(\'' + cat.id + '\',' + level.level + ')" style="' +
      'width:' + w + 'px;height:' + h + 'px;' +
      'background:linear-gradient(90deg,' + color + 'dd 0%,' + color + ' 8%,' + color + 'ee 10%,' + color + 'bb 100%);' +
      'border:2px solid ' + (allDone ? 'var(--gold)' : 'rgba(255,255,255,0.08)') + ';' +
      'border-radius:4px;' +
      'cursor:pointer;transition:all 0.25s;' +
      'display:flex;flex-direction:column;align-items:center;justify-content:flex-end;' +
      'padding:8px 4px 10px;' +
      'position:relative;' +
      'box-shadow:inset 3px 0 6px rgba(0,0,0,0.2),inset -2px 0 3px rgba(255,255,255,0.05),0 2px 6px rgba(0,0,0,0.4),0 4px 12px rgba(0,0,0,0.2);' +
      'flex-shrink:0' +
    '" onmouseover="this.style.transform=\'translateY(-6px) scale(1.02)\';this.style.boxShadow=\'inset 3px 0 6px rgba(0,0,0,0.2),inset -2px 0 3px rgba(255,255,255,0.05),0 4px 16px rgba(212,175,105,0.2)\'" onmouseout="this.style.transform=\'translateY(0) scale(1)\';this.style.boxShadow=\'inset 3px 0 6px rgba(0,0,0,0.2),inset -2px 0 3px rgba(255,255,255,0.05),0 2px 6px rgba(0,0,0,0.4),0 4px 12px rgba(0,0,0,0.2)\'">' +
      '<div style="position:absolute;left:5px;top:8px;bottom:8px;width:1px;background:rgba(255,255,255,0.1)"></div>' +
      '<div style="writing-mode:vertical-rl;text-orientation:mixed;font-family:Josefin Sans,sans-serif;font-size:0.6rem;color:rgba(255,255,255,0.85);text-align:center;line-height:1.1;max-height:' + (h - 20) + 'px;overflow:hidden;letter-spacing:0.08em;text-transform:uppercase">' + cat.title + '</div>' +
      (allDone ? '<div style="position:absolute;top:4px;right:4px;font-size:0.55rem;color:var(--gold)">✓</div>' : '') +
    '</div>';
  }

  function renderLevelShelf(knowing, level, recommendedLevel) {
    var isRecommended = level.level > recommendedLevel;
    var pct = progressPercent(level);
    var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;padding:0 4px">' +
      '<div>' +
        '<span style="font-family:Josefin Sans,sans-serif;font-size:0.85rem;color:' + level.color + ';letter-spacing:2px;font-weight:500">' + level.label + '</span>' +
        '<span style="font-family:IBM Plex Sans,sans-serif;font-size:0.7rem;color:var(--dim);margin-left:8px">' + level.sub + '</span>' +
      '</div>' +
      (isRecommended && level.level > 1
        ? '<span style="font-family:Josefin Sans,sans-serif;font-size:0.6rem;color:var(--dim);letter-spacing:1px">Recommended after Level ' + (level.level - 1) + '</span>'
        : '<span style="font-family:JetBrains Mono,monospace;font-size:0.6rem;color:var(--dim)">' + level.totalDone + '/' + level.totalTopics + ' opened \u00B7 ' + pct + '%</span>'
      ) +
    '</div>' +
    '<div style="height:2px;background:var(--border);border-radius:1px;margin-bottom:12px;overflow:hidden">' +
      '<div style="height:100%;width:' + pct + '%;background:' + level.color + ';border-radius:1px;transition:width 0.4s"></div>' +
    '</div>' +
    '<div class="knowing-shelf-scene">' +
      '<div style="position:relative">';

    if (level.categories.length > 3) {
      html += '<button onclick="_scrollShelf(\'shelf-l' + level.level + '\',-1)" style="position:absolute;left:-8px;top:50%;transform:translateY(-50%);z-index:2;background:var(--card);border:1px solid var(--border);color:var(--dim);width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;justify-content:center">\u2039</button>';
    }

    html += '<div id="shelf-l' + level.level + '" class="book-carousel" style="display:flex;align-items:flex-end;gap:10px;overflow-x:auto;scroll-behavior:smooth;padding:4px 16px 8px;scrollbar-width:none;-ms-overflow-style:none;position:relative;">' +
      '<style>#shelf-l' + level.level + '::-webkit-scrollbar{display:none}</style>';

    level.categories.forEach(function renderCategory(cat, index) {
      html += renderShelfBook(knowing, level, cat, index);
    });
    html += '</div>';

    if (level.categories.length > 3) {
      html += '<button onclick="_scrollShelf(\'shelf-l' + level.level + '\',1)" style="position:absolute;right:-8px;top:50%;transform:translateY(-50%);z-index:2;background:var(--card);border:1px solid var(--border);color:var(--dim);width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;justify-content:center">\u203A</button>';
    }

    return html + '</div></div>';
  }

  function levelByNumber(levels, levelNumber) {
    return levels.find(function findLevel(level) {
      return level.level === levelNumber;
    }) || levels[0] || null;
  }

  function nextReadableCategory(level) {
    if (!level || !level.categories) return null;
    return level.categories.find(function findInProgress(cat) {
      return cat.hasTopics && cat.done < cat.total;
    }) || level.categories.find(function findAny(cat) {
      return cat.hasTopics;
    }) || null;
  }

  function renderKnowingDoorway(knowing, levels, recommendedLevel) {
    var level = levelByNumber(levels, recommendedLevel);
    if (!level) return "";
    var nextCat = nextReadableCategory(level);
    var pct = progressPercent(level);
    var primaryAction = nextCat
      ? '<button class="knowing-entry-primary" onclick="playSfx(\'book-open\');showKnowingBook(\'' + nextCat.id + '\',' + level.level + ')">Open ' + nextCat.title + '</button>'
      : '<button class="knowing-entry-primary" onclick="showKnowingAll()">Browse shelves</button>';

    return '<div class="knowing-entry">' +
      '<button class="back-btn" onclick="backToMap()">\u2190 Map</button>' +
      '<section class="knowing-entry-stage">' +
        '<div class="knowing-entry-head">' +
          '<div class="knowing-entry-title-row">' +
            '<img src="images/knowing-icon.png" alt="">' +
            '<div>' +
              '<div class="knowing-entry-kicker">Knowing Library</div>' +
              '<h2>' + knowing.title + '</h2>' +
              '<p>Use this room when a word, sound, shape, or idea needs to become clear before you take it back to the guitar.</p>' +
            '</div>' +
          '</div>' +
          '<div class="knowing-entry-guide">' +
            '<img src="images/character-symbols/Thinking Question Mark.png" alt="">' +
            '<div>KNOW clears the map. Study checks it. The guitar proves it.</div>' +
          '</div>' +
        '</div>' +
        '<div class="knowing-entry-principles">' +
          '<div class="knowing-entry-principle"><span>01 Contact</span><strong>Open the right idea</strong><p>Opening a topic only means you touched it. It is not mastery.</p></div>' +
          '<div class="knowing-entry-principle"><span>02 Clarity</span><strong>Read one plain thing</strong><p>Save read contact when a word or shape is clearer than before.</p></div>' +
          '<div class="knowing-entry-principle"><span>03 Proof</span><strong>Send it onward</strong><p>Use Study, Do, or Practice when the idea needs evidence.</p></div>' +
        '</div>' +
        '<div class="knowing-entry-kicker" style="position:relative;z-index:2;color:' + level.color + ';margin:2px 0 8px">Recommended shelf</div>' +
        renderLevelShelf(knowing, level, recommendedLevel) +
        '<div class="knowing-entry-actions">' +
          primaryAction +
          '<button class="knowing-entry-secondary" onclick="showKnowingAll()">Browse all shelves</button>' +
        '</div>' +
      '</section>' +
      '<div class="knowing-entry-source">Sources: ' + ((knowing.sources || []).join(' \u00B7 ')) + '</div>' +
    '</div>';
  }

  function renderKnowingShelf(options) {
    options = options || {};
    var knowing = options.knowing || {};
    var levels = options.levels || [];
    var recommendedLevel = options.recommendedLevel || 1;
    var viewMode = options.viewMode || "doorway";
    if (viewMode !== "all") {
      return renderKnowingDoorway(knowing, levels, recommendedLevel);
    }
    var html = '<div style="padding:20px;max-width:900px;margin:0 auto">' +
      '<button class="back-btn" onclick="backToMap()">← Map</button>' +
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">' +
        '<img src="images/knowing-icon.png" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid var(--gold);box-shadow:0 0 12px rgba(212,175,105,0.1)"/>' +
        '<div><div style="font-family:Josefin Sans,sans-serif;color:var(--gold);font-size:1.1rem;letter-spacing:2px">' + knowing.title + '</div>' +
        '<div style="color:var(--dim);font-size:0.7rem;margin-top:2px">All shelves. Browse any book, any time.</div></div>' +
      '</div>';

    levels.forEach(function renderLevel(level) {
      html += renderLevelShelf(knowing, level, recommendedLevel);
    });

    html += '<div style="margin-top:16px;padding-top:10px;border-top:1px solid var(--border);text-align:center">' +
      '<p style="font-size:0.55rem;color:var(--dim)">Sources: ' + ((knowing.sources || []).join(' \u00B7 ')) + '</p>' +
    '</div></div>';
    return html;
  }

  return {
    version: "0.1.0",
    bookSize: bookSize,
    categoryColor: categoryColor,
    progressPercent: progressPercent,
    renderKnowingShelf: renderKnowingShelf,
    renderLevelShelf: renderLevelShelf,
    renderShelfBook: renderShelfBook
  };
});
