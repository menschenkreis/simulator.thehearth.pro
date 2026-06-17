// ═══════════════════════════════════════════════════════
// INTERACTIVE SVG GUITAR FRETBOARD
// 3 modes: All Notes, Individual (by letter), Quiz
// ═══════════════════════════════════════════════════════

(function(){
'use strict';

const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const NATURAL = ['C','D','E','F','G','A','B'];
const OPEN_STRINGS = ['E','A','D','G','B','E']; // low to high
const STRING_NAMES = ['6th (Low E)','5th (A)','4th (D)','3rd (G)','2nd (B)','1st (High E)'];
const FRET_COUNT = 15;
const DOT_FRETS = [3,5,7,9,12];
const DOUBLE_DOT = [12];

const NOTE_COLORS = {
  'C':'#e74c3c','C#':'#c0392b','D':'#e67e22','D#':'#d35400',
  'E':'#f1c40f','F':'#2ecc71','F#':'#27ae60','G':'#3498db',
  'G#':'#2980b9','A':'#9b59b6','A#':'#8e44ad','B':'#e84393'
};

function getNote(stringIdx, fret){
  const open = OPEN_STRINGS[stringIdx];
  const openIdx = NOTES.indexOf(open);
  return NOTES[(openIdx + fret) % 12];
}

function createFretboard(container, opts){
  opts = opts || {};
  var mode = opts.mode || 'all'; // 'all' | 'individual' | 'quiz'
  var selectedNote = null;
  var revealed = {};

  // SVG dimensions
  var fretW = 52;
  var stringSpacing = 44;
  var leftPad = 60;
  var rightPad = 20;
  var topPad = 30;
  var bottomPad = 50;
  var svgW = leftPad + (FRET_COUNT + 1) * fretW + rightPad;
  var svgH = topPad + (OPEN_STRINGS.length - 1) * stringSpacing + bottomPad;

  function buildSVG(){
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+svgW+' '+svgH+'" style="width:100%;max-width:'+svgW+'px;height:auto;display:block;margin:0 auto">';
    svg += '<defs>';
    svg += '<filter id="fret-glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
    svg += '</defs>';

    // Background
    svg += '<rect width="'+svgW+'" height="'+svgH+'" fill="#0d0b08" rx="12"/>';

    // Fret markers (dots) — behind everything
    for(var f=1; f<=FRET_COUNT; f++){
      var cx = leftPad + (f-0.5) * fretW;
      if(DOT_FRETS.indexOf(f) !== -1){
        if(DOUBLE_DOT.indexOf(f) !== -1){
          svg += '<circle cx="'+(cx)+'" cy="'+(topPad - 14)+'" r="4" fill="#333"/>';
          svg += '<circle cx="'+(cx)+'" cy="'+(topPad + (OPEN_STRINGS.length-1)*stringSpacing + 14)+'" r="4" fill="#333"/>';
        } else {
          var dotY = topPad + (OPEN_STRINGS.length-1)*stringSpacing/2;
          svg += '<circle cx="'+cx+'" cy="'+dotY+'" r="4" fill="#333"/>';
        }
      }
    }

    // Nut
    svg += '<rect x="'+(leftPad-4)+'" y="'+(topPad-8)+'" width="6" height="'+((OPEN_STRINGS.length-1)*stringSpacing+16)+'" fill="#d4af69" rx="2"/>';

    // Frets
    for(var f=1; f<=FRET_COUNT; f++){
      var x = leftPad + f * fretW;
      svg += '<line x1="'+x+'" y1="'+topPad+'" x2="'+x+'" y2="'+(topPad+(OPEN_STRINGS.length-1)*stringSpacing)+'" stroke="#555" stroke-width="1.5"/>';
    }

    // Strings
    for(var s=0; s<OPEN_STRINGS.length; s++){
      var y = topPad + s * stringSpacing;
      var thickness = 3 - s * 0.4;
      svg += '<line x1="'+leftPad+'" y1="'+y+'" x2="'+(leftPad + FRET_COUNT * fretW)+'" y2="'+y+'" stroke="#999" stroke-width="'+thickness+'"/>';
    }

    // Fret numbers
    for(var f=1; f<=FRET_COUNT; f++){
      var x = leftPad + (f-0.5) * fretW;
      svg += '<text x="'+x+'" y="'+(svgH - 10)+'" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#555">'+f+'</text>';
    }

    // String labels (left side)
    for(var s=0; s<OPEN_STRINGS.length; s++){
      var y = topPad + s * stringSpacing;
      svg += '<text x="'+(leftPad-18)+'" y="'+(y+4)+'" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="11" font-weight="600" fill="#888">'+OPEN_STRINGS[s]+'</text>';
    }

    // Notes on frets
    for(var s=0; s<OPEN_STRINGS.length; s++){
      for(var f=0; f<=FRET_COUNT; f++){
        var note = getNote(s, f);
        var isSharp = note.indexOf('#') !== -1;
        var x = leftPad + (f === 0 ? -0.5 : f - 0.5) * fretW;
        var y = topPad + s * stringSpacing;
        var color = NOTE_COLORS[note];
        var naturalOnly = NATURAL.indexOf(note) !== -1;

        // Determine visibility based on mode
        var visible = false;
        var highlight = false;
        var revealNote = false;

        if(mode === 'all'){
          visible = true;
          highlight = false;
        } else if(mode === 'individual'){
          visible = true;
          highlight = (selectedNote && note === selectedNote);
        } else if(mode === 'quiz'){
          var key = s+'-'+f;
          if(revealed[key]){
            visible = true;
            revealNote = true;
          } else {
            visible = false;
          }
        }

        if(visible){
          var opacity = '1';
          var fontSize = '11';
          var fontWeight = '600';
          var textColor = '#fff';

          if(mode === 'all'){
            opacity = naturalOnly ? '1' : '0.7';
            fontSize = naturalOnly ? '11' : '9';
          } else if(mode === 'individual'){
            if(highlight){
              // Highlighted — bright and large
              fontSize = '13';
              fontWeight = '700';
              opacity = '1';
            } else {
              opacity = '0.2';
              fontSize = '9';
              textColor = '#666';
            }
          } else if(mode === 'quiz' && revealNote){
            textColor = color;
            fontWeight = '700';
          }

          // Background pill for highlighted notes
          if(mode === 'individual' && highlight){
            svg += '<rect x="'+(x-14)+'" y="'+(y-10)+'" width="28" height="20" rx="4" fill="'+color+'" opacity="0.9"/>';
            textColor = '#fff';
          }

          svg += '<text class="fb-note" data-string="'+s+'" data-fret="'+f+'" x="'+x+'" y="'+(y+4)+'" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="'+fontSize+'" font-weight="'+fontWeight+'" fill="'+textColor+'" opacity="'+opacity+'" style="cursor:pointer;transition:all 0.2s">'+note+'</text>';
        } else if(mode === 'quiz'){
          // Clickable dot for quiz mode
          svg += '<circle class="fb-quiz-dot" data-string="'+s+'" data-fret="'+f+'" cx="'+x+'" cy="'+y+'" r="6" fill="transparent" stroke="#444" stroke-width="1" style="cursor:pointer;transition:all 0.2s"/>';
        }
      }
    }

    // Open strings display
    if(mode === 'all' || mode === 'individual'){
      for(var s=0; s<OPEN_STRINGS.length; s++){
        var note = getNote(s, 0);
        var y = topPad + s * stringSpacing;
        var color = NOTE_COLORS[note];
        var opacity = '1';
        if(mode === 'individual' && selectedNote){
          opacity = (note === selectedNote) ? '1' : '0.2';
        }
        svg += '<text x="'+(leftPad-36)+'" y="'+(y+4)+'" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" font-weight="700" fill="'+color+'" opacity="'+opacity+'">'+note+'</text>';
      }
    }

    svg += '</svg>';
    return svg;
  }

  function render(){
    var html = '<div class="fretboard-wrap">';
    html += buildSVG();
    html += '</div>';
    container.innerHTML = html;
    bindEvents();
  }

  function bindEvents(){
    if(mode === 'quiz'){
      container.querySelectorAll('.fb-quiz-dot').forEach(function(dot){
        dot.addEventListener('click', function(e){
          e.stopPropagation();
          var s = parseInt(this.dataset.string);
          var f = parseInt(this.dataset.fret);
          revealed[s+'-'+f] = true;
          render();
        });
        dot.addEventListener('mouseenter', function(){
          this.setAttribute('stroke','#d4af69');
          this.setAttribute('r','8');
        });
        dot.addEventListener('mouseleave', function(){
          this.setAttribute('stroke','#444');
          this.setAttribute('r','6');
        });
      });
    }
    if(mode === 'individual'){
      container.querySelectorAll('.fb-note').forEach(function(txt){
        txt.addEventListener('click', function(e){
          e.stopPropagation();
        });
      });
    }
  }

  // Public API
  return {
    setMode: function(m){ mode = m; selectedNote = null; revealed = {}; render(); },
    setSelectedNote: function(n){ selectedNote = n; render(); },
    getMode: function(){ return mode; },
    render: render,
    reset: function(){ selectedNote = null; revealed = {}; render(); }
  };
}

// ── UI: Fretboard Panel ──
window.openFretboard = function(){
  // Check if already open
  var existing = document.getElementById('fretboard-overlay');
  if(existing){ existing.remove(); return; }

  var overlay = document.createElement('div');
  overlay.id = 'fretboard-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:900;display:flex;align-items:center;justify-content:center;animation:fade-in 0.3s ease';

  // Backdrop
  var backdrop = document.createElement('div');
  backdrop.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.7)';
  backdrop.addEventListener('click', function(){ overlay.remove(); });
  overlay.appendChild(backdrop);

  // Panel
  var panel = document.createElement('div');
  panel.style.cssText = 'position:relative;z-index:1;background:var(--bg,#0d0b08);border:1px solid var(--border,#222);border-radius:16px;padding:24px;max-width:95vw;max-height:90vh;overflow:auto;box-shadow:0 8px 40px rgba(0,0,0,0.5)';

  // Header
  var header = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">';
  header += '<h2 style="font-family:Cinzel,serif;color:var(--gold,#d4af69);font-size:1.1rem;margin:0;font-weight:700">Interactive Fretboard</h2>';
  header += '<button onclick="document.getElementById(\'fretboard-overlay\').remove()" style="background:none;border:1px solid var(--border,#333);color:var(--dim,#888);width:32px;height:32px;border-radius:6px;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center">&times;</button>';
  header += '</div>';

  // Mode tabs
  var tabs = '<div style="display:flex;gap:6px;margin-bottom:16px;flex-wrap:wrap">';
  tabs += '<button class="fb-tab active" data-mode="all" style="background:var(--gold,#d4af69);color:#0d0b08;border:none;padding:8px 16px;border-radius:6px;font-family:DM Sans,sans-serif;font-size:0.78rem;font-weight:600;cursor:pointer">All Notes</button>';
  tabs += '<button class="fb-tab" data-mode="individual" style="background:var(--card,#1a1714);color:var(--dim,#888);border:1px solid var(--border,#333);padding:8px 16px;border-radius:6px;font-family:DM Sans,sans-serif;font-size:0.78rem;font-weight:600;cursor:pointer">By Note</button>';
  tabs += '<button class="fb-tab" data-mode="quiz" style="background:var(--card,#1a1714);color:var(--dim,#888);border:1px solid var(--border,#333);padding:8px 16px;border-radius:6px;font-family:DM Sans,sans-serif;font-size:0.78rem;font-weight:600;cursor:pointer">Quiz</button>';
  tabs += '</div>';

  // Note selector (for individual mode)
  var noteSelector = '<div id="fb-note-selector" style="display:none;margin-bottom:16px">';
  noteSelector += '<div style="display:flex;gap:4px;flex-wrap:wrap">';
  var allNotes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  allNotes.forEach(function(n){
    var col = NOTE_COLORS[n];
    var isSharp = n.indexOf('#') !== -1;
    noteSelector += '<button class="fb-note-btn" data-note="'+n+'" style="width:'+(isSharp?'36px':'40px')+';height:36px;border-radius:6px;border:2px solid '+col+'40;background:'+col+'18;color:'+col+';font-family:JetBrains Mono,monospace;font-size:0.75rem;font-weight:700;cursor:pointer;transition:all 0.15s">'+n+'</button>';
  });
  noteSelector += '</div></div>';

  // Fretboard container
  var fbContainer = '<div id="fb-container" style="overflow-x:auto;padding:8px 0"></div>';

  panel.innerHTML = header + tabs + noteSelector + fbContainer;
  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  // Init fretboard
  var fb = createFretboard(document.getElementById('fb-container'), {mode:'all'});
  fb.render();

  // Tab clicks
  panel.querySelectorAll('.fb-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      panel.querySelectorAll('.fb-tab').forEach(function(t){
        t.style.background = 'var(--card,#1a1714)';
        t.style.color = 'var(--dim,#888)';
        t.style.border = '1px solid var(--border,#333)';
        t.classList.remove('active');
      });
      this.style.background = 'var(--gold,#d4af69)';
      this.style.color = '#0d0b08';
      this.style.border = 'none';
      this.classList.add('active');

      var m = this.dataset.mode;
      fb.setMode(m);

      var noteSel = document.getElementById('fb-note-selector');
      noteSel.style.display = m === 'individual' ? 'block' : 'none';

      // Reset note buttons
      if(m === 'individual'){
        panel.querySelectorAll('.fb-note-btn').forEach(function(b){
          b.style.background = NOTE_COLORS[b.dataset.note] + '18';
          b.style.transform = 'none';
          b.style.boxShadow = 'none';
        });
      }
    });
  });

  // Note button clicks (individual mode)
  panel.querySelectorAll('.fb-note-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var note = this.dataset.note;
      var isActive = this.style.transform === 'scale(1.1)';

      // Reset all buttons
      panel.querySelectorAll('.fb-note-btn').forEach(function(b){
        b.style.background = NOTE_COLORS[b.dataset.note] + '18';
        b.style.transform = 'none';
        b.style.boxShadow = 'none';
      });

      if(isActive){
        fb.setSelectedNote(null);
      } else {
        this.style.background = NOTE_COLORS[note];
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 0 12px ' + NOTE_COLORS[note] + '60';
        fb.setSelectedNote(note);
      }
    });
  });

  // Keyboard: Escape to close
  function onKey(e){
    if(e.key === 'Escape'){
      overlay.remove();
      document.removeEventListener('keydown', onKey);
    }
  }
  document.addEventListener('keydown', onKey);
};

window.FretboardEngine = createFretboard;

})();
