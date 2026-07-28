/*
 * Foundation map viewer adapter v0.
 *
 * Renders the Foundation neck-path map. The large simulator page should only
 * switch panels and delegate this rendering work here.
 */
(function initFoundationMapViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthFoundationMapViewer = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createFoundationMapViewer() {
  "use strict";

  var SPEECH_BY_BLOCK = {
    "f-threshold": "You stand at the threshold. Ten frets ahead. Touch the first to begin.",
    "f-how-to-learn": "Learning is a skill. Three barriers block it. Let's clear them.",
    "f-music-language": "Music speaks before words. Listen first, then play.",
    "f-learning-a-language": "Music speaks before words. Listen first, then play.",
    "f-musical-alphabet": "Twelve notes. Infinite conversation. Let's learn the alphabet.",
    "f-language-of-music": "Twelve notes. Infinite conversation. Let's learn the alphabet.",
    "f-guitar-map": "The fretboard is your map. Every note has a home on it.",
    "f-language-of-guitar": "The fretboard is your map. Every note has a home on it.",
    "f-instrument-body": "Know the instrument. It's an extension of your body.",
    "f-the-guitar": "Know the instrument. It's an extension of your body.",
    "f-hands-sound": "Right hand makes sound. Left hand changes pitch. Both together make music.",
    "f-speaking": "Right hand makes sound. Left hand changes pitch. Both together make music.",
    "f-first-conversation": "Your first chord. The doorway opens.",
    "f-conversations": "Your first chord. The doorway opens.",
    "f-rhythm-pulse": "Pulse is the heartbeat. Without it, notes are just noise.",
    "f-rhythm": "Pulse is the heartbeat. Without it, notes are just noise.",
    "f-first-shapes": "Three chords. Thousands of songs. Shapes are the shortcut."
  };

  var COMPLETED_SUMMARY = {
    "f-threshold": "You know the map, the guide, and the path. Step onto the neck.",
    "f-how-to-learn": "You learned the three barriers. Gradient, mass, misunderstood words. Ready for music.",
    "f-music-language": "Music is a language. You know how to listen. Now let's speak.",
    "f-learning-a-language": "Music is a language. You know how to listen. Now let's speak.",
    "f-musical-alphabet": "Twelve notes, intervals, and the building blocks of harmony. The alphabet is set.",
    "f-language-of-music": "Twelve notes, intervals, and the building blocks of harmony. The alphabet is set.",
    "f-guitar-map": "You can read the fretboard. Notes have homes. The map is yours.",
    "f-language-of-guitar": "You can read the fretboard. Notes have homes. The map is yours.",
    "f-instrument-body": "You know the instrument's body. Posture, parts, purpose.",
    "f-the-guitar": "You know the instrument's body. Posture, parts, purpose.",
    "f-hands-sound": "Both hands working together. The instrument responds.",
    "f-speaking": "Both hands working together. The instrument responds.",
    "f-first-conversation": "First chord played. The foundation is laid.",
    "f-conversations": "First chord played. The foundation is laid.",
    "f-rhythm-pulse": "You feel the pulse now. The heartbeat of music lives in you.",
    "f-rhythm": "You feel the pulse now. The heartbeat of music lives in you.",
    "f-first-shapes": "Three shapes. The gateway to every song."
  };

  function buildFretZones(topics, completed, activeIdx) {
    var fretZones = [];
    var fretCount = topics.length;
    var topY = 115;
    var botY = 645;
    var spacing = (botY - topY) / (fretCount - 1);

    for (var i = 0; i < fretCount; i++) {
      var topic = topics[i];
      var isDone = Boolean(completed[topic.id]);
      var isActive = i === activeIdx;
      var isLocked = i > activeIdx && !isDone;
      var progress = i / (fretCount - 1);
      var neckWidth = 280 - progress * 180;
      var cy = botY - i * spacing;
      var cx = 250;

      fretZones.push({
        topic: topic,
        idx: i,
        isDone: isDone,
        isActive: isActive,
        isLocked: isLocked,
        x: cx - neckWidth / 2,
        y: cy - 22,
        w: neckWidth,
        h: 44,
        cy: cy,
        cx: cx
      });
    }

    return fretZones;
  }

  function renderSvgZones(fretZones) {
    var svgZones = "";

    fretZones.forEach(function renderZone(fz) {
      var cls = fz.isDone ? "done" : fz.isActive ? "active" : fz.isLocked ? "locked" : "";
      var numCls = fz.isDone ? "done" : fz.isActive ? "active" : fz.isLocked ? "locked" : "";

      svgZones += '<rect class="found-neck-zone ' + cls + '" ' +
        'data-fret="' + fz.idx + '" ' +
        'x="' + fz.x + '" y="' + fz.y + '" width="' + fz.w + '" height="' + fz.h + '" rx="4" ' +
        'onclick="showFoundationTopic(\'' + fz.topic.id + '\')"/>';
      svgZones += '<text class="found-neck-num ' + numCls + '" x="' + fz.cx + '" y="' + (fz.cy + 5) + '" text-anchor="middle">' + fz.idx + "</text>";
    });

    return svgZones;
  }

  function guideSpeech(foundation, completed, doneCount, activeIdx) {
    if (doneCount === foundation.topics.length) {
      return "Threshold complete. You've crossed the first neck. Journey awaits.";
    }
    if (activeIdx > 0 && completed[foundation.topics[activeIdx - 1].id]) {
      return COMPLETED_SUMMARY[foundation.topics[activeIdx - 1].id] ||
        SPEECH_BY_BLOCK[foundation.topics[activeIdx].id];
    }
    return SPEECH_BY_BLOCK[foundation.topics[activeIdx].id] || foundation.guideLine;
  }

  function renderFoundationMap(options) {
    options = options || {};
    var foundation = options.foundation;
    var targetEl = options.targetEl;
    var completed = options.completed || {};

    if (!foundation || !targetEl) {
      return null;
    }

    var doneCount = Object.keys(completed).filter(function isDone(key) {
      return completed[key];
    }).length;
    var firstIncomplete = foundation.topics.findIndex(function isIncomplete(topic) {
      return !completed[topic.id];
    });
    var activeIdx = firstIncomplete === -1 ? foundation.topics.length - 1 : firstIncomplete;
    var fretZones = buildFretZones(foundation.topics, completed, activeIdx);
    var svgZones = renderSvgZones(fretZones);
    var speechText = guideSpeech(foundation, completed, doneCount, activeIdx);
    var startLabel = doneCount === foundation.topics.length ? "Journey Awaits" : "Start Fret " + activeIdx;
    var startAction = doneCount === foundation.topics.length
      ? "backToMap()"
      : "showFoundationTopic('" + foundation.topics[activeIdx].id + "')";

    targetEl.innerHTML = '<div class="foundation-entry">' +
      '<button class="back-btn" onclick="backToMap()">&larr; Map</button>' +
      '<section class="foundation-entry-stage">' +
      '<aside class="foundation-entry-guide">' +
      '<img src="images/character-full/Encouraging.png" alt="">' +
      '<div class="found-neck-bubble">' +
      "<p>" + speechText + "</p>" +
      "</div>" +
      "</aside>" +
      '<div class="found-neck-wrap" aria-label="Foundation threshold neck">' +
      '<img class="found-neck-image" src="images/foundation/foundation-unlocks-neck-v1-alpha.png" alt="Foundation unlocks the guitar neck" draggable="false">' +
      '<svg class="found-neck-svg" viewBox="0 0 500 700" preserveAspectRatio="none">' +
      svgZones +
      "</svg>" +
      '<div class="found-neck-title">' +
      "<h2>Foundation</h2>" +
      "<p>Threshold</p>" +
      "</div>" +
      '<div class="found-neck-progress">' +
      "<span>" + doneCount + "/" + foundation.topics.length + " frets crossed</span>" +
      "</div>" +
      '<div class="found-neck-start">' +
      '<button onclick="' + startAction + '">' + startLabel + "</button>" +
      "</div>" +
      "</div>" +
      "</section>" +
      "</div>";

    return {
      done_count: doneCount,
      active_index: activeIdx,
      fret_count: foundation.topics.length
    };
  }

  return {
    version: "0.1.0",
    buildFretZones: buildFretZones,
    renderFoundationMap: renderFoundationMap
  };
});
