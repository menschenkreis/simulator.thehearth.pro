// The Hearth Mastery - Fretboard Explorer V2
// Drop-in prototype replacement for the older fretboard.js.
// Exposes window.openFretboard().

(function(){
  "use strict";

  var NOTE_NAMES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  var STANDARD_TUNING = [
    { label: "E", midi: 40, name: "Low E" },
    { label: "A", midi: 45, name: "A" },
    { label: "D", midi: 50, name: "D" },
    { label: "G", midi: 55, name: "G" },
    { label: "B", midi: 59, name: "B" },
    { label: "e", midi: 64, name: "High e" }
  ];
  var FRET_COUNT = 12;

  var SCALES = {
    pentatonic: [
      { id: "minor-pentatonic", name: "Minor Pentatonic", intervals: [0,3,5,7,10], degrees: ["1","b3","4","5","b7"], note: "Five-note vocabulary for blues, rock, folk, and first improvising." },
      { id: "major-pentatonic", name: "Major Pentatonic", intervals: [0,2,4,7,9], degrees: ["1","2","3","5","6"], note: "Bright five-note vocabulary. Same shape family, different home feeling." },
      { id: "blues", name: "Blues Scale", intervals: [0,3,5,6,7,10], degrees: ["1","b3","4","b5","5","b7"], note: "Minor pentatonic with the blue note added for grit and pull." }
    ],
    major_minor: [
      { id: "major", name: "Major Scale", intervals: [0,2,4,5,7,9,11], degrees: ["1","2","3","4","5","6","7"], note: "The main bright seven-note map. Keys and chords grow from here." },
      { id: "natural-minor", name: "Natural Minor", intervals: [0,2,3,5,7,8,10], degrees: ["1","2","b3","4","5","b6","b7"], note: "Darker seven-note map. Also called Aeolian." },
      { id: "harmonic-minor", name: "Harmonic Minor", intervals: [0,2,3,5,7,8,11], degrees: ["1","2","b3","4","5","b6","7"], note: "Minor with a raised 7th. Strong pull back home." },
      { id: "melodic-minor", name: "Melodic Minor", intervals: [0,2,3,5,7,9,11], degrees: ["1","2","b3","4","5","6","7"], note: "Minor colour with a smoother upper half." }
    ],
    modes: [
      { id: "ionian", name: "Ionian", intervals: [0,2,4,5,7,9,11], degrees: ["1","2","3","4","5","6","7"], note: "Major mode." },
      { id: "dorian", name: "Dorian", intervals: [0,2,3,5,7,9,10], degrees: ["1","2","b3","4","5","6","b7"], note: "Minor with a hopeful 6th." },
      { id: "mixolydian", name: "Mixolydian", intervals: [0,2,4,5,7,9,10], degrees: ["1","2","3","4","5","6","b7"], note: "Major with a bluesy b7." }
    ]
  };

  var CHORDS = {
    triads: [
      { id: "major", name: "Major", suffix: "", intervals: [0,4,7], degrees: ["1","3","5"], note: "Stable and bright." },
      { id: "minor", name: "Minor", suffix: "m", intervals: [0,3,7], degrees: ["1","b3","5"], note: "Stable and darker." },
      { id: "diminished", name: "Diminished", suffix: "dim", intervals: [0,3,6], degrees: ["1","b3","b5"], note: "Tense, narrow, wants to move." },
      { id: "augmented", name: "Augmented", suffix: "aug", intervals: [0,4,8], degrees: ["1","3","#5"], note: "Bright but unstable." },
      { id: "sus2", name: "Sus2", suffix: "sus2", intervals: [0,2,7], degrees: ["1","2","5"], note: "Open and unresolved." },
      { id: "sus4", name: "Sus4", suffix: "sus4", intervals: [0,5,7], degrees: ["1","4","5"], note: "Suspended; wants to settle." }
    ],
    sevenths: [
      { id: "maj7", name: "Major 7", suffix: "maj7", intervals: [0,4,7,11], degrees: ["1","3","5","7"], note: "Major triad plus a dreamy 7th." },
      { id: "dom7", name: "Dominant 7", suffix: "7", intervals: [0,4,7,10], degrees: ["1","3","5","b7"], note: "Major triad with a bluesy pull." },
      { id: "min7", name: "Minor 7", suffix: "m7", intervals: [0,3,7,10], degrees: ["1","b3","5","b7"], note: "Minor with a relaxed 7th." },
      { id: "minmaj7", name: "Minor Major 7", suffix: "mMaj7", intervals: [0,3,7,11], degrees: ["1","b3","5","7"], note: "Minor plus a tense leading tone." },
      { id: "m7b5", name: "Half-Diminished", suffix: "m7b5", intervals: [0,3,6,10], degrees: ["1","b3","b5","b7"], note: "Diminished triad plus b7." },
      { id: "dim7", name: "Diminished 7", suffix: "dim7", intervals: [0,3,6,9], degrees: ["1","b3","b5","bb7"], note: "Stacked minor thirds. Symmetrical tension." }
    ]
  };

  var NOTE_PRESETS = {
    "single": { name: "Single Note", notes: ["A"], note: "Choose one note and see every place it lives." },
    "ae": { name: "A + E", notes: ["A","E"], note: "The current root-note highway lesson." },
    "lesson": { name: "A E C D G", notes: ["A","E","C","D","G"], note: "Jen lesson notes: A minor pentatonic plus E/A landmarks." },
    "open": { name: "Open Strings", notes: ["E","A","D","G","B"], note: "The standard tuning vocabulary." },
    "all": { name: "All Notes", notes: NOTE_NAMES.slice(), note: "Show the whole fretboard." }
  };

  var CATEGORY_LABELS = {
    notes: "Notes",
    scales: "Scales",
    chords: "Chords",
    identify: "Identify"
  };

  var SCALE_FAMILY_LABELS = {
    pentatonic: "Pentatonics",
    major_minor: "Major / Minor",
    modes: "Modes"
  };

  var CHORD_FAMILY_LABELS = {
    triads: "Triads",
    sevenths: "Sevenths"
  };

  var state = {
    category: "scales",
    root: "A",
    notePreset: "lesson",
    scaleFamily: "pentatonic",
    scaleId: "minor-pentatonic",
    chordFamily: "triads",
    chordId: "major",
    labels: "notes",
    selected: {}
  };

  function pcFromNote(note){ return NOTE_NAMES.indexOf(note); }
  function noteFromMidi(midi){ return NOTE_NAMES[((midi % 12) + 12) % 12]; }
  function unique(arr){
    var seen = {};
    return arr.filter(function(x){ if(seen[x]) return false; seen[x] = true; return true; });
  }
  function escapeHtml(value){
    return String(value == null ? "" : value).replace(/[&<>"']/g, function(ch){
      return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch];
    });
  }
  function getScale(){
    var list = SCALES[state.scaleFamily] || [];
    return list.find(function(item){ return item.id === state.scaleId; }) || list[0];
  }
  function getChord(){
    var list = CHORDS[state.chordFamily] || [];
    return list.find(function(item){ return item.id === state.chordId; }) || list[0];
  }
  function transpose(root, intervals){
    var rootPc = pcFromNote(root);
    return intervals.map(function(interval){ return NOTE_NAMES[(rootPc + interval) % 12]; });
  }
  function activeNotes(){
    if(state.category === "notes"){
      var preset = NOTE_PRESETS[state.notePreset] || NOTE_PRESETS.single;
      if(state.notePreset === "single") return [state.root];
      return preset.notes;
    }
    if(state.category === "scales"){
      return transpose(state.root, getScale().intervals);
    }
    if(state.category === "chords"){
      return transpose(state.root, getChord().intervals);
    }
    if(state.category === "identify"){
      return selectedNotes();
    }
    return [];
  }
  function noteDegree(note){
    var rootPc = pcFromNote(state.root);
    var interval = (pcFromNote(note) - rootPc + 12) % 12;
    var item = state.category === "chords" ? getChord() : getScale();
    if(!item || !item.intervals) return "";
    var index = item.intervals.indexOf(interval);
    return index >= 0 ? item.degrees[index] : "";
  }
  function selectedPositions(){
    return Object.keys(state.selected).map(function(key){ return state.selected[key]; });
  }
  function selectedNotes(){
    return unique(selectedPositions().map(function(pos){ return pos.note; }));
  }
  function selectedPitchClasses(){
    return selectedNotes().map(pcFromNote).sort(function(a,b){ return a-b; });
  }
  function sameSet(a,b){
    if(a.length !== b.length) return false;
    for(var i = 0; i < a.length; i++) if(a[i] !== b[i]) return false;
    return true;
  }
  function subsetOf(need, got){
    return need.every(function(pc){ return got.indexOf(pc) >= 0; });
  }
  function chordName(root, chord){
    return root + chord.suffix;
  }
  function identifyChords(){
    var pcs = selectedPitchClasses();
    if(!pcs.length) return [];
    var results = [];
    Object.keys(CHORDS).forEach(function(family){
      CHORDS[family].forEach(function(chord){
        NOTE_NAMES.forEach(function(root){
          var rootPc = pcFromNote(root);
          var chordPcs = chord.intervals.map(function(i){ return (rootPc + i) % 12; }).sort(function(a,b){ return a-b; });
          if(sameSet(chordPcs, pcs)){
            results.push({ score: 1, kind: "exact", root: root, chord: chord, family: family });
          } else if(subsetOf(chordPcs, pcs)){
            results.push({ score: 0.7, kind: "contains", root: root, chord: chord, family: family });
          }
        });
      });
    });
    return results.sort(function(a,b){ return b.score - a.score; }).slice(0, 6);
  }
  function positionKey(stringIndex, fret){ return stringIndex + ":" + fret; }
  function positionFor(stringIndex, fret){
    var string = STANDARD_TUNING[stringIndex];
    return {
      key: positionKey(stringIndex, fret),
      stringIndex: stringIndex,
      string: string.label,
      fret: fret,
      note: noteFromMidi(string.midi + fret)
    };
  }

  function ensureStyles(){
    if(document.getElementById("hearth-fretboard-v2-styles")) return;
    var style = document.createElement("style");
    style.id = "hearth-fretboard-v2-styles";
    style.textContent = [
      ".hfb2-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(0,0,0,.78)}",
      ".hfb2-panel{width:min(1180px,96vw);max-height:92vh;overflow:auto;background:#0d0b08;border:1px solid rgba(212,175,105,.28);border-radius:8px;box-shadow:0 22px 70px rgba(0,0,0,.72);color:#f5edd8;font-family:DM Sans,Arial,sans-serif}",
      ".hfb2-head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 18px;border-bottom:1px solid rgba(212,175,105,.16);background:linear-gradient(90deg,rgba(212,175,105,.08),rgba(0,0,0,0))}",
      ".hfb2-title{margin:0;font-family:Cinzel,serif;color:#d4af69;font-size:1.02rem;letter-spacing:.06em}",
      ".hfb2-sub{margin:3px 0 0;color:#a89880;font-size:.76rem}",
      ".hfb2-close{width:34px;height:34px;border-radius:6px;border:1px solid rgba(212,175,105,.22);background:#17120e;color:#d4af69;font-size:20px;cursor:pointer}",
      ".hfb2-body{display:grid;grid-template-columns:270px minmax(0,1fr);gap:16px;padding:16px}",
      ".hfb2-controls{display:flex;flex-direction:column;gap:12px}",
      ".hfb2-card{background:rgba(26,23,20,.78);border:1px solid rgba(212,175,105,.14);border-radius:8px;padding:12px}",
      ".hfb2-label{display:block;color:#d4af69;font-family:JetBrains Mono,monospace;font-size:.58rem;text-transform:uppercase;letter-spacing:.12em;margin-bottom:6px}",
      ".hfb2-select,.hfb2-btn{width:100%;border:1px solid rgba(212,175,105,.24);background:#15110d;color:#f5edd8;border-radius:6px;padding:9px 10px;font-size:.78rem}",
      ".hfb2-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}",
      ".hfb2-tabs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}",
      ".hfb2-tab{border:1px solid rgba(212,175,105,.2);background:#17120e;color:#a89880;border-radius:6px;padding:9px 7px;font-size:.72rem;cursor:pointer}",
      ".hfb2-tab.active{background:#d4af69;color:#0d0b08;border-color:#f5d58f;font-weight:700}",
      ".hfb2-btn{cursor:pointer;color:#d4af69}",
      ".hfb2-btn:hover{border-color:#d4af69;background:rgba(212,175,105,.08)}",
      ".hfb2-stage{min-width:0}",
      ".hfb2-fretwrap{overflow-x:auto;border:1px solid rgba(212,175,105,.16);border-radius:8px;background:linear-gradient(90deg,#120d09,#2b1b10 18%,#3a2413 52%,#1c110b)}",
      ".hfb2-svg{min-width:960px;width:100%;height:auto;display:block}",
      ".hfb2-note{cursor:pointer;transition:opacity .12s,transform .12s}",
      ".hfb2-note circle{fill:#19130f;stroke:rgba(212,175,105,.22);stroke-width:2}",
      ".hfb2-note text{font-family:JetBrains Mono,monospace;font-size:10px;font-weight:700;fill:#6f6250;text-anchor:middle;dominant-baseline:central;pointer-events:none}",
      ".hfb2-note.active circle{fill:#d4af69;stroke:#f5edd8;filter:drop-shadow(0 0 8px rgba(212,175,105,.48))}",
      ".hfb2-note.active text{fill:#0d0b08}",
      ".hfb2-note.root circle{fill:#f5d58f;stroke:#fff5c7}",
      ".hfb2-note.dim{opacity:.22}",
      ".hfb2-note.selected circle{fill:#5a9fd4;stroke:#d7efff;filter:drop-shadow(0 0 8px rgba(90,159,212,.5))}",
      ".hfb2-note.selected text{fill:#071019}",
      ".hfb2-info{margin-top:12px;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(260px,.8fr);gap:12px}",
      ".hfb2-info h3{margin:0 0 7px;font-family:Cinzel,serif;color:#d4af69;font-size:.95rem}",
      ".hfb2-info p{margin:0;color:#d8cfbd;font-size:.82rem;line-height:1.55}",
      ".hfb2-pills{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}",
      ".hfb2-pill{border:1px solid rgba(212,175,105,.22);border-radius:999px;padding:5px 8px;color:#d4af69;background:rgba(212,175,105,.06);font-size:.72rem}",
      ".hfb2-muted{color:#a89880;font-size:.76rem;line-height:1.5}",
      ".hfb2-results{display:flex;flex-direction:column;gap:7px}",
      ".hfb2-result{border:1px solid rgba(212,175,105,.16);border-radius:6px;padding:8px;background:rgba(13,11,8,.52)}",
      ".hfb2-result b{color:#f5d58f}",
      ".hfb2-result span{display:block;color:#a89880;font-size:.72rem;margin-top:2px}",
      "@media(max-width:820px){.hfb2-body{grid-template-columns:1fr}.hfb2-info{grid-template-columns:1fr}.hfb2-panel{max-height:96vh}.hfb2-tabs{grid-template-columns:repeat(4,minmax(0,1fr))}}"
    ].join("\n");
    document.head.appendChild(style);
  }

  function svgEl(tag, attrs){
    var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs || {}).forEach(function(key){ el.setAttribute(key, attrs[key]); });
    return el;
  }

  function renderFretboard(svg){
    var left = 82, right = 1030, top = 55, bottom = 320;
    var fretW = (right - left) / FRET_COUNT;
    function xForFret(fret){ return left + fret * fretW; }
    function noteX(fret){ return fret === 0 ? left - 35 : left + (fret - 0.5) * fretW; }
    function yForString(index){ return top + index * ((bottom - top) / (STANDARD_TUNING.length - 1)); }

    svg.innerHTML = "";
    svg.setAttribute("viewBox", "0 0 1080 380");
    svg.setAttribute("class", "hfb2-svg");
    svg.appendChild(svgEl("rect", { x: left - 58, y: 24, width: right - left + 94, height: 326, rx: "18", fill: "rgba(18,13,9,.68)" }));

    [3,5,7,9].forEach(function(fret){
      svg.appendChild(svgEl("circle", { cx: noteX(fret), cy: (top + bottom) / 2, r: "11", fill: "rgba(212,175,105,.13)" }));
    });
    svg.appendChild(svgEl("circle", { cx: noteX(12), cy: (top + bottom) / 2 - 30, r: "9", fill: "rgba(212,175,105,.15)" }));
    svg.appendChild(svgEl("circle", { cx: noteX(12), cy: (top + bottom) / 2 + 30, r: "9", fill: "rgba(212,175,105,.15)" }));

    for(var fret = 0; fret <= FRET_COUNT; fret++){
      svg.appendChild(svgEl("line", {
        x1: xForFret(fret), y1: top - 22,
        x2: xForFret(fret), y2: bottom + 22,
        stroke: fret === 0 ? "#d4af69" : "rgba(245,237,216,.32)",
        "stroke-width": fret === 0 ? "8" : "2"
      }));
      var label = svgEl("text", { x: fret === 0 ? left - 35 : noteX(fret), y: 362, "text-anchor": "middle", fill: "rgba(212,175,105,.62)", "font-size": "12", "font-family": "JetBrains Mono,monospace" });
      label.textContent = fret;
      svg.appendChild(label);
    }

    STANDARD_TUNING.forEach(function(string, stringIndex){
      var y = yForString(stringIndex);
      svg.appendChild(svgEl("line", {
        x1: left - 45, y1: y, x2: right, y2: y,
        stroke: "rgba(245,237,216,.6)",
        "stroke-width": 3.8 - (stringIndex * 0.34),
        "stroke-linecap": "round"
      }));
      var stringLabel = svgEl("text", { x: "26", y: y, "text-anchor": "middle", "dominant-baseline": "central", fill: "#d4af69", "font-size": "14", "font-family": "Cinzel,serif", "font-weight": "700" });
      stringLabel.textContent = string.label;
      svg.appendChild(stringLabel);

      for(var f = 0; f <= FRET_COUNT; f++){
        var pos = positionFor(stringIndex, f);
        var g = svgEl("g", {
          class: "hfb2-note",
          transform: "translate(" + noteX(f) + "," + y + ")",
          "data-key": pos.key,
          "data-note": pos.note,
          "data-string": String(stringIndex),
          "data-fret": String(f)
        });
        g.appendChild(svgEl("circle", { r: f === 0 ? "13" : "15" }));
        var text = svgEl("text", {});
        text.textContent = pos.note;
        g.appendChild(text);
        g.addEventListener("click", function(){
          if(state.category !== "identify") return;
          var clicked = positionFor(Number(this.dataset.string), Number(this.dataset.fret));
          if(state.selected[clicked.key]) delete state.selected[clicked.key];
          else state.selected[clicked.key] = clicked;
          updateAll();
        });
        svg.appendChild(g);
      }
    });
  }

  function controlHTML(){
    return [
      '<div class="hfb2-card">',
      '<span class="hfb2-label">Mode</span>',
      '<div class="hfb2-tabs" data-tabs="category">',
      tab("notes"), tab("scales"), tab("chords"), tab("identify"),
      '</div>',
      '</div>',
      '<div class="hfb2-card">',
      '<span class="hfb2-label">Root / Home Note</span>',
      '<select class="hfb2-select" data-control="root">',
      NOTE_NAMES.map(function(n){ return '<option value="'+n+'">'+n+'</option>'; }).join(''),
      '</select>',
      '</div>',
      '<div class="hfb2-card hfb2-section hfb2-section-notes">',
      '<span class="hfb2-label">Note Map</span>',
      '<select class="hfb2-select" data-control="notePreset">',
      Object.keys(NOTE_PRESETS).map(function(id){ return '<option value="'+id+'">'+escapeHtml(NOTE_PRESETS[id].name)+'</option>'; }).join(''),
      '</select>',
      '</div>',
      '<div class="hfb2-card hfb2-section hfb2-section-scales">',
      '<span class="hfb2-label">Scale Category</span>',
      '<select class="hfb2-select" data-control="scaleFamily"></select>',
      '<div style="height:8px"></div>',
      '<span class="hfb2-label">Scale</span>',
      '<select class="hfb2-select" data-control="scaleId"></select>',
      '</div>',
      '<div class="hfb2-card hfb2-section hfb2-section-chords">',
      '<span class="hfb2-label">Chord Category</span>',
      '<select class="hfb2-select" data-control="chordFamily"></select>',
      '<div style="height:8px"></div>',
      '<span class="hfb2-label">Chord</span>',
      '<select class="hfb2-select" data-control="chordId"></select>',
      '</div>',
      '<div class="hfb2-card hfb2-section hfb2-section-identify">',
      '<span class="hfb2-label">Chord Identifier</span>',
      '<button class="hfb2-btn" data-action="clear">Clear selected notes</button>',
      '<p class="hfb2-muted" style="margin:8px 0 0">Click notes on the fretboard. The tool will name likely chords from the notes you selected.</p>',
      '</div>',
      '<div class="hfb2-card">',
      '<span class="hfb2-label">Labels</span>',
      '<select class="hfb2-select" data-control="labels">',
      '<option value="notes">Note names</option>',
      '<option value="degrees">Scale/chord degrees</option>',
      '</select>',
      '</div>',
      '<div class="hfb2-card">',
      '<span class="hfb2-label">Quick Views</span>',
      '<div class="hfb2-row">',
      '<button class="hfb2-btn" data-preset="ae">E/A Map</button>',
      '<button class="hfb2-btn" data-preset="aminpent">A Minor Pent</button>',
      '<button class="hfb2-btn" data-preset="emajor">E Major</button>',
      '<button class="hfb2-btn" data-preset="cmaj7">Cmaj7</button>',
      '</div>',
      '</div>'
    ].join("");
  }

  function tab(id){
    return '<button class="hfb2-tab" data-tab="' + id + '">' + CATEGORY_LABELS[id] + '</button>';
  }

  function fillSelect(select, options, value){
    select.innerHTML = options.map(function(opt){
      return '<option value="' + escapeHtml(opt.value) + '">' + escapeHtml(opt.label) + '</option>';
    }).join("");
    select.value = value;
  }

  function wireControls(panel){
    panel.addEventListener("click", function(event){
      var tabBtn = event.target.closest("[data-tab]");
      if(tabBtn){
        state.category = tabBtn.dataset.tab;
        updateAll();
        return;
      }
      var presetBtn = event.target.closest("[data-preset]");
      if(presetBtn){
        applyPreset(presetBtn.dataset.preset);
        updateAll();
        return;
      }
      var actionBtn = event.target.closest("[data-action]");
      if(actionBtn && actionBtn.dataset.action === "clear"){
        state.selected = {};
        updateAll();
      }
    });
    panel.addEventListener("change", function(event){
      var control = event.target.dataset.control;
      if(!control) return;
      state[control] = event.target.value;
      if(control === "scaleFamily"){
        state.scaleId = (SCALES[state.scaleFamily] || [])[0].id;
      }
      if(control === "chordFamily"){
        state.chordId = (CHORDS[state.chordFamily] || [])[0].id;
      }
      updateAll();
    });
  }

  function applyPreset(id){
    if(id === "ae"){
      state.category = "notes";
      state.notePreset = "ae";
      state.root = "A";
    }
    if(id === "aminpent"){
      state.category = "scales";
      state.root = "A";
      state.scaleFamily = "pentatonic";
      state.scaleId = "minor-pentatonic";
    }
    if(id === "emajor"){
      state.category = "chords";
      state.root = "E";
      state.chordFamily = "triads";
      state.chordId = "major";
    }
    if(id === "cmaj7"){
      state.category = "chords";
      state.root = "C";
      state.chordFamily = "sevenths";
      state.chordId = "maj7";
    }
  }

  function updateControls(panel){
    panel.querySelectorAll("[data-tab]").forEach(function(btn){
      btn.classList.toggle("active", btn.dataset.tab === state.category);
    });
    panel.querySelectorAll(".hfb2-section").forEach(function(section){ section.style.display = "none"; });
    var activeSection = panel.querySelector(".hfb2-section-" + state.category);
    if(activeSection) activeSection.style.display = "block";

    var root = panel.querySelector('[data-control="root"]');
    if(root) root.value = state.root;

    var notePreset = panel.querySelector('[data-control="notePreset"]');
    if(notePreset) notePreset.value = state.notePreset;

    var labels = panel.querySelector('[data-control="labels"]');
    if(labels) labels.value = state.labels;

    fillSelect(panel.querySelector('[data-control="scaleFamily"]'), Object.keys(SCALES).map(function(id){
      return { value: id, label: SCALE_FAMILY_LABELS[id] };
    }), state.scaleFamily);
    fillSelect(panel.querySelector('[data-control="scaleId"]'), (SCALES[state.scaleFamily] || []).map(function(item){
      return { value: item.id, label: item.name };
    }), state.scaleId);
    fillSelect(panel.querySelector('[data-control="chordFamily"]'), Object.keys(CHORDS).map(function(id){
      return { value: id, label: CHORD_FAMILY_LABELS[id] };
    }), state.chordFamily);
    fillSelect(panel.querySelector('[data-control="chordId"]'), (CHORDS[state.chordFamily] || []).map(function(item){
      return { value: item.id, label: item.name };
    }), state.chordId);
  }

  function updateFretboard(panel){
    var notes = activeNotes();
    var root = state.root;
    var svg = panel.querySelector("svg");
    svg.querySelectorAll(".hfb2-note").forEach(function(noteEl){
      var note = noteEl.dataset.note;
      var key = noteEl.dataset.key;
      var active = notes.indexOf(note) >= 0;
      var selected = !!state.selected[key];
      noteEl.classList.toggle("active", active && state.category !== "identify");
      noteEl.classList.toggle("root", active && note === root && state.category !== "identify");
      noteEl.classList.toggle("dim", !active && state.category !== "identify");
      noteEl.classList.toggle("selected", selected);
      var text = noteEl.querySelector("text");
      if(state.category !== "identify" && state.labels === "degrees" && active){
        text.textContent = note === root ? "R" : noteDegree(note);
      } else {
        text.textContent = note;
      }
    });
  }

  function updateInfo(panel){
    var title = "";
    var body = "";
    var pills = [];
    var side = "";

    if(state.category === "notes"){
      var preset = NOTE_PRESETS[state.notePreset] || NOTE_PRESETS.single;
      title = preset.name;
      body = preset.note;
      pills = activeNotes();
      if(state.notePreset === "ae"){
        side = [
          '<div class="hfb2-result"><b>E -> A</b><span>Move up 5 frets on the same string.</span></div>',
          '<div class="hfb2-result"><b>A -> E</b><span>Move up 7 frets on the same string.</span></div>',
          '<div class="hfb2-result"><b>Octave</b><span>The same note appears 12 frets higher.</span></div>'
        ].join("");
      }
    }

    if(state.category === "scales"){
      var scale = getScale();
      title = state.root + " " + scale.name;
      body = scale.note;
      pills = transpose(state.root, scale.intervals).map(function(note, index){ return note + " (" + scale.degrees[index] + ")"; });
    }

    if(state.category === "chords"){
      var chord = getChord();
      title = chordName(state.root, chord) + " - " + chord.name;
      body = chord.note;
      pills = transpose(state.root, chord.intervals).map(function(note, index){ return note + " (" + chord.degrees[index] + ")"; });
    }

    if(state.category === "identify"){
      var selected = selectedPositions();
      title = "Chord Identifier";
      body = selected.length ? "Selected notes: " + selectedNotes().join(", ") : "Click notes on the fretboard to ask: what chord could this be?";
      pills = selected.map(function(pos){ return pos.string + " string / fret " + pos.fret + " = " + pos.note; });
      var results = identifyChords();
      side = results.length ? results.map(function(result){
        return '<div class="hfb2-result"><b>' + escapeHtml(chordName(result.root, result.chord)) + '</b><span>' + escapeHtml(result.chord.name + " - " + result.kind + " match - " + result.chord.degrees.join(", ")) + '</span></div>';
      }).join("") : '<p class="hfb2-muted">No chord yet. Select at least three different notes for a useful answer.</p>';
    }

    panel.querySelector(".hfb2-maininfo").innerHTML = [
      '<h3>' + escapeHtml(title) + '</h3>',
      '<p>' + escapeHtml(body) + '</p>',
      '<div class="hfb2-pills">' + pills.map(function(pill){ return '<span class="hfb2-pill">' + escapeHtml(pill) + '</span>'; }).join("") + '</div>'
    ].join("");
    panel.querySelector(".hfb2-sideinfo").innerHTML = side || '<p class="hfb2-muted">Tip: switch label mode to degrees to see roots, thirds, fifths, sevenths, and scale tones.</p>';
  }

  var activePanel = null;
  function updateAll(){
    if(!activePanel) return;
    updateControls(activePanel);
    updateFretboard(activePanel);
    updateInfo(activePanel);
  }

  window.openFretboard = function(){
    ensureStyles();
    var existing = document.querySelector(".hfb2-overlay");
    if(existing){ existing.remove(); return; }

    var overlay = document.createElement("div");
    overlay.className = "hfb2-overlay";
    overlay.innerHTML = [
      '<div class="hfb2-panel" role="dialog" aria-label="Fretboard Explorer">',
      '<div class="hfb2-head">',
      '<div><h2 class="hfb2-title">Fretboard Explorer</h2><p class="hfb2-sub">Notes, scales, chords, relationships, and chord identification.</p></div>',
      '<button class="hfb2-close" aria-label="Close">&times;</button>',
      '</div>',
      '<div class="hfb2-body">',
      '<aside class="hfb2-controls">' + controlHTML() + '</aside>',
      '<main class="hfb2-stage">',
      '<div class="hfb2-fretwrap"><svg></svg></div>',
      '<div class="hfb2-info"><div class="hfb2-card hfb2-maininfo"></div><div class="hfb2-card hfb2-sideinfo"></div></div>',
      '</main>',
      '</div>',
      '</div>'
    ].join("");

    document.body.appendChild(overlay);
    activePanel = overlay.querySelector(".hfb2-panel");
    renderFretboard(activePanel.querySelector("svg"));
    wireControls(activePanel);
    overlay.querySelector(".hfb2-close").addEventListener("click", function(){ overlay.remove(); activePanel = null; });
    overlay.addEventListener("click", function(event){ if(event.target === overlay){ overlay.remove(); activePanel = null; } });
    document.addEventListener("keydown", function onKey(event){
      if(event.key === "Escape" && document.body.contains(overlay)){
        overlay.remove();
        activePanel = null;
        document.removeEventListener("keydown", onKey);
      }
    });
    updateAll();
  };

  window.FretboardExplorerV2 = {
    scales: SCALES,
    chords: CHORDS,
    open: window.openFretboard
  };
})();

