/*
 * Doing explorer controller adapter v0.
 *
 * Owns the note-locator behavior for the legacy Doing fretboard explorer.
 */
(function initDoingExplorerController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDoingExplorerController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingExplorerController(root) {
  "use strict";

  var NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  var TUNING = [40, 45, 50, 55, 59, 64];
  var STRING_NAMES = ["E", "A", "D", "G", "B", "e"];

  function noteFromMidi(midi) {
    return NOTES[((midi % 12) + 12) % 12];
  }

  function positionsForNote(highlightNote) {
    var positions = [];
    if (!highlightNote) return positions;
    STRING_NAMES.forEach(function eachString(name, stringIndex) {
      for (var fret = 0; fret <= 12; fret++) {
        if (noteFromMidi(TUNING[stringIndex] + fret) === highlightNote) {
          positions.push(name + " fret " + fret);
        }
      }
    });
    return positions;
  }

  function renderFretboardSvg(highlightNote) {
    var left = 60;
    var right = 900;
    var topY = 25;
    var bottomY = 230;
    var fretW = (right - left) / 12;
    var noteX = function noteX(fret) { return fret === 0 ? left - 30 : left + (fret - 0.5) * fretW; };
    var xForF = function xForF(fret) { return left + fret * fretW; };
    var yForS = function yForS(index) { return topY + index * ((bottomY - topY) / 5); };
    var svg = "";

    svg += '<rect x="' + (left - 42) + '" y="10" width="' + (right - left + 84) + '" height="240" rx="12" fill="rgba(18,13,9,.5)"/>';
    [3, 5, 7, 9].forEach(function renderMarker(fret) {
      svg += '<circle cx="' + noteX(fret) + '" cy="' + ((topY + bottomY) / 2) + '" r="9" fill="rgba(212,175,105,.1)"/>';
    });
    svg += '<circle cx="' + noteX(12) + '" cy="' + ((topY + bottomY) / 2 - 22) + '" r="7" fill="rgba(212,175,105,.12)"/>';
    svg += '<circle cx="' + noteX(12) + '" cy="' + ((topY + bottomY) / 2 + 22) + '" r="7" fill="rgba(212,175,105,.12)"/>';
    for (var fret = 0; fret <= 12; fret++) {
      svg += '<line x1="' + xForF(fret) + '" y1="' + (topY - 14) + '" x2="' + xForF(fret) + '" y2="' + (bottomY + 14) + '" stroke="' + (fret === 0 ? "#d4af69" : "rgba(245,237,216,.25)") + '" stroke-width="' + (fret === 0 ? 6 : 1.5) + '"/>';
    }
    STRING_NAMES.forEach(function renderString(name, stringIndex) {
      var y = yForS(stringIndex);
      svg += '<line x1="' + (left - 30) + '" y1="' + y + '" x2="' + right + '" y2="' + y + '" stroke="rgba(245,237,216,.5)" stroke-width="' + (3.6 - stringIndex * 0.32) + '" stroke-linecap="round"/>';
      svg += '<text x="28" y="' + y + '" text-anchor="middle" dominant-baseline="central" fill="#d4af69" font-family="Cinzel,serif" font-size="13" font-weight="700">' + name + '</text>';
      for (var stringFret = 0; stringFret <= 12; stringFret++) {
        var note = noteFromMidi(TUNING[stringIndex] + stringFret);
        var isActive = highlightNote && note === highlightNote;
        var opacity = highlightNote ? (isActive ? 1 : 0.18) : 0.5;
        svg += '<g transform="translate(' + noteX(stringFret) + ',' + y + ')">';
        svg += '<circle r="' + (stringFret === 0 ? 11 : 13) + '" fill="' + (isActive ? "#d4af69" : "#19130f") + '" stroke="' + (isActive ? "#f5edd8" : "rgba(212,175,105,.18)") + '" stroke-width="1.5" opacity="' + opacity + '"/>';
        svg += '<text font-family="JetBrains Mono,monospace" font-size="9" font-weight="700" fill="' + (isActive ? "#0d0b08" : "#6f6250") + '" text-anchor="middle" dominant-baseline="central" opacity="' + opacity + '">' + note + '</text>';
        svg += '</g>';
      }
    });
    return svg;
  }

  function renderNoteResult(highlightNote) {
    if (!highlightNote) return "";
    return '<b style="color:var(--gold)">' + highlightNote + '</b>: ' + positionsForNote(highlightNote).join(", ");
  }

  function bindExplorerNoteLocator(options) {
    options = options || {};
    var rootEl = options.rootEl;
    var documentRef = options.documentRef || root.document;
    if (!rootEl || !documentRef) return;

    var activeNote = null;
    function renderFretboard(highlightNote) {
      var svg = documentRef.getElementById("exp-fretboard-svg");
      if (!svg) return;
      svg.innerHTML = renderFretboardSvg(highlightNote);
      var result = documentRef.getElementById("exp-note-result");
      if (result) {
        result.innerHTML = renderNoteResult(highlightNote);
      }
    }

    rootEl.querySelectorAll(".doing-exp-note-btn").forEach(function bindNoteButton(btn) {
      btn.onclick = function onNoteClick() {
        var note = btn.dataset.enote;
        activeNote = activeNote === note ? null : note;
        rootEl.querySelectorAll(".doing-exp-note-btn").forEach(function updateButton(otherButton) {
          otherButton.classList.toggle("active", otherButton.dataset.enote === activeNote);
        });
        renderFretboard(activeNote);
      };
    });
    renderFretboard(null);
  }

  return {
    version: "0.1.0",
    bindExplorerNoteLocator: bindExplorerNoteLocator,
    noteFromMidi: noteFromMidi,
    positionsForNote: positionsForNote,
    renderFretboardSvg: renderFretboardSvg,
    renderNoteResult: renderNoteResult
  };
});
