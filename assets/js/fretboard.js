// ═══════════════════════════════════════════════════════
// INTERACTIVE SVG GUITAR FRETBOARD
// Based on GPT-5.5 code, adapted for The Hearth theme
// 3 modes: All Notes, Individual (by letter), Quiz
// ═══════════════════════════════════════════════════════

(function(){
'use strict';

const FB_NOTES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const FB_STRINGS = [
  { name: "E", midi: 40 },
  { name: "A", midi: 45 },
  { name: "D", midi: 50 },
  { name: "G", midi: 55 },
  { name: "B", midi: 59 },
  { name: "E", midi: 64 }
];
const FB_FRET_COUNT = 12;
const FB_LEFT = 72;
const FB_RIGHT = 1000;
const FB_TOP = 48;
const FB_BOTTOM = 270;

function noteNameFromMidi(midi){ return FB_NOTES[((midi % 12) + 12) % 12]; }
function xForFret(fret){ return FB_LEFT + fret * ((FB_RIGHT - FB_LEFT) / FB_FRET_COUNT); }
function noteX(fret){ return fret === 0 ? FB_LEFT - 34 : FB_LEFT + (fret - 0.5) * ((FB_RIGHT - FB_LEFT) / FB_FRET_COUNT); }
function yForString(i){ return FB_TOP + i * ((FB_BOTTOM - FB_TOP) / (FB_STRINGS.length - 1)); }

function svgEl(tag, attrs){
  var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  if(attrs) Object.entries(attrs).forEach(function(pair){ el.setAttribute(pair[0], pair[1]); });
  return el;
}

// ── Build the fretboard SVG ──
function buildFretboardSVG(container, onNoteClick){
  var svg = svgEl("svg", { viewBox: "0 0 1040 330", role: "img", "aria-label": "Interactive guitar fretboard" });
  svg.style.cssText = "width:100%;height:auto;display:block";

  // Wood gradient
  var defs = svgEl("defs");
  var grad = svgEl("linearGradient", { id: "fb-wood", x1: "0", x2: "1", y1: "0", y2: "0" });
  grad.append(svgEl("stop", { offset: "0%", "stop-color": "#2a1d13" }));
  grad.append(svgEl("stop", { offset: "55%", "stop-color": "#3a2818" }));
  grad.append(svgEl("stop", { offset: "100%", "stop-color": "#1f140d" }));
  defs.append(grad);
  svg.append(defs);

  // Board background
  svg.append(svgEl("rect", {
    x: FB_LEFT - 52, y: 22, width: FB_RIGHT - FB_LEFT + 78, height: 270,
    rx: 20, fill: "url(#fb-wood)"
  }));

  // Fret markers
  [3,5,7,9].forEach(function(f){
    svg.append(svgEl("circle", { cx: noteX(f), cy: (FB_TOP+FB_BOTTOM)/2, r: 13, fill: "rgba(212,175,105,0.12)" }));
  });
  svg.append(svgEl("circle", { cx: noteX(12), cy: (FB_TOP+FB_BOTTOM)/2 - 26, r: 10, fill: "rgba(212,175,105,0.12)" }));
  svg.append(svgEl("circle", { cx: noteX(12), cy: (FB_TOP+FB_BOTTOM)/2 + 26, r: 10, fill: "rgba(212,175,105,0.12)" }));

  // Frets
  for(var fret = 0; fret <= FB_FRET_COUNT; fret++){
    svg.append(svgEl("line", {
      x1: xForFret(fret), y1: FB_TOP - 16,
      x2: xForFret(fret), y2: FB_BOTTOM + 16,
      stroke: fret === 0 ? "#d4af69" : "#8a7a62",
      "stroke-width": fret === 0 ? 9 : 3
    }));
    if(fret > 0){
      var t = svgEl("text", { x: noteX(fret), y: 310, "text-anchor": "middle", fill: "rgba(212,175,105,0.5)", "font-size": "12", "font-family": "JetBrains Mono,monospace" });
      t.textContent = fret;
      svg.append(t);
    }
  }

  // Strings
  FB_STRINGS.forEach(function(string, i){
    var y = yForString(i);
    svg.append(svgEl("line", {
      x1: FB_LEFT - 42, y1: y, x2: FB_RIGHT, y2: y,
      stroke: "rgba(255,255,255,0.5)", "stroke-linecap": "round",
      "stroke-width": 2 + i * 0.55
    }));
    var label = svgEl("text", { x: 16, y: y, "text-anchor": "middle", "dominant-baseline": "central", fill: "#d4af69", "font-size": "13", "font-weight": "700", "font-family": "DM Sans,sans-serif" });
    label.textContent = string.name;
    svg.append(label);
  });

  // Notes
  FB_STRINGS.forEach(function(string, stringIndex){
    for(var fret = 1; fret <= FB_FRET_COUNT; fret++){
      var note = noteNameFromMidi(string.midi + fret);
      var key = stringIndex + "-" + fret;
      var group = svgEl("g", {
        class: "fb-note",
        transform: "translate(" + noteX(fret) + "," + yForString(stringIndex) + ")",
        "data-note": note,
        "data-key": key
      });
      group.append(svgEl("circle", { r: 16 }));
      var text = svgEl("text");
      text.textContent = note;
      group.append(text);
      group.addEventListener("click", function(){ if(onNoteClick) onNoteClick(this); });
      svg.append(group);
    }
  });

  container.appendChild(svg);
  return svg;
}

// ── Fretboard Panel UI ──
window.openFretboard = function(){
  var existing = document.getElementById('fretboard-overlay');
  if(existing){ existing.remove(); return; }

  var mode = "all";
  var selectedNote = "A";
  var revealed = {};

  var overlay = document.createElement('div');
  overlay.id = 'fretboard-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:900;display:flex;align-items:center;justify-content:center;animation:fade-in 0.3s ease';

  // Backdrop
  var backdrop = document.createElement('div');
  backdrop.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.75)';
  backdrop.addEventListener('click', function(){ overlay.remove(); });
  overlay.appendChild(backdrop);

  // Panel
  var panel = document.createElement('div');
  panel.style.cssText = 'position:relative;z-index:1;background:#0d0b08;border:1px solid #2a2218;border-radius:16px;padding:20px 24px 24px;max-width:95vw;width:1100px;box-shadow:0 8px 40px rgba(0,0,0,0.6)';

  // Header
  var header = document.createElement('div');
  header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:14px';
  header.innerHTML = '<h2 style="font-family:Cinzel,serif;color:#d4af69;font-size:1.05rem;margin:0;font-weight:700;letter-spacing:0.04em">Interactive Fretboard</h2>';

  var closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = 'background:none;border:1px solid #333;color:#888;width:30px;height:30px;border-radius:6px;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;transition:all 0.15s';
  closeBtn.addEventListener('mouseenter', function(){ this.style.borderColor='#d4af69'; this.style.color='#d4af69'; });
  closeBtn.addEventListener('mouseleave', function(){ this.style.borderColor='#333'; this.style.color='#888'; });
  closeBtn.addEventListener('click', function(){ overlay.remove(); });
  header.appendChild(closeBtn);
  panel.appendChild(header);

  // Controls
  var controls = document.createElement('div');
  controls.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:14px';

  // Mode buttons
  var modes = [
    { id: 'all', label: 'All Notes' },
    { id: 'single', label: 'By Note' },
    { id: 'quiz', label: 'Quiz' }
  ];
  var modeBtns = [];
  modes.forEach(function(m){
    var btn = document.createElement('button');
    btn.textContent = m.label;
    btn.dataset.mode = m.id;
    btn.style.cssText = 'border:1px solid #3a2a1a;background:#1a1410;color:#a89880;border-radius:999px;padding:8px 16px;cursor:pointer;font-family:DM Sans,sans-serif;font-size:0.78rem;font-weight:600;transition:all 0.15s';
    btn.addEventListener('click', function(){
      mode = m.id;
      if(mode !== 'quiz') revealed = {};
      updateMode();
    });
    controls.appendChild(btn);
    modeBtns.push(btn);
  });

  // Note selector
  var noteSelect = document.createElement('select');
  noteSelect.id = 'fb-note-select';
  noteSelect.style.cssText = 'border:1px solid #3a2a1a;background:#1a1410;color:#a89880;border-radius:999px;padding:8px 12px;cursor:pointer;font-family:DM Sans,sans-serif;font-size:0.78rem;display:none';
  noteSelect.setAttribute('aria-label', 'Choose note');
  FB_NOTES.forEach(function(n){
    var opt = document.createElement('option');
    opt.value = n;
    opt.textContent = n;
    if(n === 'A') opt.selected = true;
    noteSelect.appendChild(opt);
  });
  noteSelect.addEventListener('change', function(){
    selectedNote = this.value;
    updateMode();
  });
  controls.appendChild(noteSelect);
  panel.appendChild(controls);

  // Fretboard container
  var fbWrap = document.createElement('div');
  fbWrap.style.cssText = 'overflow-x:auto;border-radius:12px';
  panel.appendChild(fbWrap);

  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  // Build SVG
  buildFretboardSVG(fbWrap, function(noteEl){
    if(mode !== 'quiz') return;
    var key = noteEl.dataset.key;
    revealed[key] = true;
    updateMode();
  });

  function updateMode(){
    // Update buttons
    modeBtns.forEach(function(btn){
      var isActive = btn.dataset.mode === mode;
      if(isActive){
        btn.style.background = '#d4af69';
        btn.style.color = '#0d0b08';
        btn.style.borderColor = '#e8c06a';
      } else {
        btn.style.background = '#1a1410';
        btn.style.color = '#a89880';
        btn.style.borderColor = '#3a2a1a';
      }
    });

    // Show/hide note selector
    noteSelect.style.display = mode === 'single' ? 'inline-block' : 'none';

    // Update note elements
    var noteEls = fbWrap.querySelectorAll('.fb-note');
    noteEls.forEach(function(noteEl){
      var note = noteEl.dataset.note;
      var key = noteEl.dataset.key;
      noteEl.classList.remove('fb-hidden', 'fb-ghost', 'fb-dimmed', 'fb-clickable');

      if(mode === 'all'){
        // show everything
      }
      if(mode === 'single'){
        if(note !== selectedNote) noteEl.classList.add('fb-dimmed');
      }
      if(mode === 'quiz'){
        noteEl.classList.add('fb-clickable');
        if(!revealed[key]) noteEl.classList.add('fb-ghost');
      }
    });
  }

  updateMode();

  // Keyboard: Escape to close
  function onKey(e){
    if(e.key === 'Escape'){
      overlay.remove();
      document.removeEventListener('keydown', onKey);
    }
  }
  document.addEventListener('keydown', onKey);
};

})();
