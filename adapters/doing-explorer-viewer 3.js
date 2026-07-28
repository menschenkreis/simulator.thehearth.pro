/*
 * Doing explorer viewer adapter v0.
 *
 * Renders the legacy Doing fretboard explorer tabs and panels.
 */
(function initDoingExplorerViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDoingExplorerViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingExplorerViewer() {
  "use strict";

  var tabs = [
    { id: "notes", label: "Notes" },
    { id: "scales", label: "Scales" },
    { id: "chords", label: "Chords" },
    { id: "identify", label: "Identify" },
    { id: "tab", label: "Tab / Notation" }
  ];

  function renderNotesPanel() {
    return '<h3>Note Locator</h3>' +
      '<p>Click a note to highlight every place it lives across the fretboard.</p>' +
      '<div class="doing-exp-note-btns" id="exp-note-btns">' +
        ["E", "A", "C", "D", "G"].map(function renderNoteButton(note) {
          return '<button class="doing-exp-note-btn" data-enote="' + note + '">' + note + '</button>';
        }).join("") +
      '</div>' +
      '<div id="exp-note-result" style="color:var(--dim);font-size:0.76rem;min-height:1.4em"></div>' +
      '<div class="doing-exp-fretwrap"><svg id="exp-fretboard-svg" viewBox="0 0 960 280" style="min-width:800px;width:100%;display:block"></svg></div>' +
      '<h3>E/A Highways</h3>' +
      '<p>The low E and A strings are your root-note landmarks.</p>' +
      '<div class="doing-exp-highway">' +
        '<div class="doing-exp-highway-card"><h4>Low E</h4><div class="note-row">' +
          [
            { f: 0, n: "E", root: true },
            { f: 1, n: "F" },
            { f: 3, n: "G" },
            { f: 5, n: "A", root: true },
            { f: 7, n: "B" },
            { f: 8, n: "C" },
            { f: 10, n: "D" },
            { f: 12, n: "E", root: true }
          ].map(renderNoteChip).join("") +
        '</div></div>' +
        '<div class="doing-exp-highway-card"><h4>A</h4><div class="note-row">' +
          [
            { f: 0, n: "A", root: true },
            { f: 2, n: "B" },
            { f: 3, n: "C" },
            { f: 5, n: "D" },
            { f: 7, n: "E" },
            { f: 8, n: "F" },
            { f: 10, n: "G" },
            { f: 12, n: "A", root: true }
          ].map(renderNoteChip).join("") +
        '</div></div>' +
      '</div>' +
      '<div class="doing-exp-relations">' +
        '<span>E &#8594; A = <b>up 5 frets</b></span>' +
        '<span>A &#8594; E = <b>up 7 frets</b></span>' +
        '<span>Same note = <b>up 12 frets</b></span>' +
      '</div>';
  }

  function renderNoteChip(note) {
    return '<span class="note-chip' + (note.root ? ' on-string' : '') + '"><b>' + note.f + '</b> ' + note.n + '</span>';
  }

  function renderScalesPanel() {
    return '<h3>A Minor Pentatonic</h3>' +
      '<div class="doing-exp-tabblock">' +
        '<span class="string-line">e</span>|----------------<span class="fret-num">5</span>-<span class="fret-num">8</span>-|\n' +
        '<span class="string-line">B</span>|------------<span class="fret-num">5</span>-<span class="fret-num">8</span>-----|\n' +
        '<span class="string-line">G</span>|--------<span class="fret-num">5</span>-<span class="fret-num">7</span>---------|\n' +
        '<span class="string-line">D</span>|----<span class="fret-num">5</span>-<span class="fret-num">7</span>-------------|\n' +
        '<span class="string-line">A</span>|-<span class="fret-num">5</span>-<span class="fret-num">7</span>----------------|\n' +
        '<span class="string-line">E</span>|-<span class="fret-num">5</span>-<span class="fret-num">8</span>----------------|' +
      '</div>' +
      '<p class="doing-exp-pent-desc">Five notes: <b style="color:var(--gold)">A, C, D, E, G</b>. First shape every guitarist learns.</p>';
  }

  function renderChordsPanel() {
    return '<h3>E Major</h3>' +
      '<div style="text-align:center;margin:10px 0">' +
        '<svg viewBox="0 0 120 180" width="120" style="display:inline-block">' +
          '<rect x="10" y="10" width="100" height="160" rx="4" fill="rgba(13,11,8,0.6)" stroke="rgba(212,175,105,0.25)"/>' +
          '<line x1="28" y1="45" x2="92" y2="45" stroke="rgba(245,237,216,0.5)" stroke-width="3.5"/>' +
          '<line x1="28" y1="70" x2="92" y2="70" stroke="rgba(245,237,216,0.5)" stroke-width="3"/>' +
          '<line x1="28" y1="95" x2="92" y2="95" stroke="rgba(245,237,216,0.5)" stroke-width="2.5"/>' +
          '<line x1="28" y1="120" x2="92" y2="120" stroke="rgba(245,237,216,0.5)" stroke-width="2"/>' +
          '<line x1="28" y1="145" x2="92" y2="145" stroke="rgba(245,237,216,0.5)" stroke-width="1.5"/>' +
          '<line x1="28" y1="170" x2="92" y2="170" stroke="rgba(245,237,216,0.5)" stroke-width="1.2"/>' +
          '<text x="8" y="49" fill="var(--gold)" font-family="JetBrains Mono" font-size="10" text-anchor="middle">E</text>' +
          '<text x="8" y="74" fill="var(--gold)" font-family="JetBrains Mono" font-size="10" text-anchor="middle">A</text>' +
          '<text x="8" y="99" fill="var(--gold)" font-family="JetBrains Mono" font-size="10" text-anchor="middle">D</text>' +
          '<text x="8" y="124" fill="var(--gold)" font-family="JetBrains Mono" font-size="10" text-anchor="middle">G</text>' +
          '<text x="8" y="149" fill="var(--gold)" font-family="JetBrains Mono" font-size="10" text-anchor="middle">B</text>' +
          '<text x="8" y="174" fill="var(--gold)" font-family="JetBrains Mono" font-size="10" text-anchor="middle">e</text>' +
          '<circle cx="52" cy="70" r="7" fill="var(--gold)"/><text x="52" y="74" fill="var(--bg)" font-family="JetBrains Mono" font-size="9" text-anchor="middle" font-weight="700">2</text>' +
          '<circle cx="60" cy="95" r="7" fill="var(--gold)"/><text x="60" y="99" fill="var(--bg)" font-family="JetBrains Mono" font-size="9" text-anchor="middle" font-weight="700">2</text>' +
          '<circle cx="44" cy="120" r="7" fill="var(--gold)"/><text x="44" y="124" fill="var(--bg)" font-family="JetBrains Mono" font-size="9" text-anchor="middle" font-weight="700">1</text>' +
        '</svg>' +
      '</div>' +
      '<div style="text-align:center;font-family:JetBrains Mono,monospace;color:var(--gold);font-size:0.75rem;margin:8px 0">0 &middot; 2 &middot; 2 &middot; 1 &middot; 0 &middot; 0</div>' +
      '<div class="doing-exp-placeholder">Chord identification is parked for the next build pass. For now, use this as the E major reference card.</div>';
  }

  function renderTabPanel() {
    return '<h3>Tab + Notation</h3>' +
      '<p>Tab tells you <b style="color:var(--gold)">where</b>. Notation tells you <b style="color:var(--gold)">what and when</b>.</p>' +
      '<div class="doing-exp-tabblock">' +
        '<span class="string-line">e</span>|---<span class="fret-num">0</span>-----<span class="fret-num">2</span>-----<span class="fret-num">0</span>---|\n' +
        '<span class="string-line">B</span>|---------------------------------|\n' +
        '<span class="string-line">G</span>|---------------------------------|\n' +
        '<span class="string-line">D</span>|---------------------------------|\n' +
        '<span class="string-line">A</span>|---------------------------------|\n' +
        '<span class="string-line">E</span>|---------------------------------|' +
      '</div>' +
      '<p style="color:var(--dim);font-size:0.76rem">Open &#8594; fret 2 &#8594; open.</p>';
  }

  function renderPanel(activeTab) {
    if (activeTab === "notes") return renderNotesPanel();
    if (activeTab === "scales") return renderScalesPanel();
    if (activeTab === "chords") return renderChordsPanel();
    if (activeTab === "tab") return renderTabPanel();
    return '<h3>Chord Identifier</h3>' +
      '<div class="doing-exp-placeholder">This tool is intentionally parked until the drill rooms and progress evidence are stable.</div>';
  }

  function renderDoingExplorer(options) {
    options = options || {};
    var activeTab = options.activeTab || "notes";
    var tabBtns = tabs.map(function renderTab(tab) {
      return '<button class="doing-exp-tab' + (activeTab === tab.id ? " active" : "") + '" data-etab="' + tab.id + '">' + tab.label + '</button>';
    }).join("");

    return '<div class="doing-explore">' +
      '<div class="doing-exp-tabs">' + tabBtns + '</div>' +
      '<div class="doing-exp-panel">' + renderPanel(activeTab) + '</div>' +
    '</div>';
  }

  return {
    version: "0.1.0",
    renderDoingExplorer: renderDoingExplorer
  };
});
