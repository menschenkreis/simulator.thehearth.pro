// ═══════════════════════════════════════════════════════
// GROOVE — Interactive Music Companion
// ═══════════════════════════════════════════════════════
// Musical sound beds for practice: drones, chord beds, and motifs.

(function(){
'use strict';

var ctx = null;
var isPlaying = false;
var currentLoop = null;
var volume = 0.3;
var panelOpen = false;
var currentMode = "";

function getCtx(){
  if(!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if(ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// ── Scale definitions ──
var SCALES = {
  'A-minor-pent': [220, 262, 294, 330, 392, 440, 523, 587, 660, 784],
  'C-major': [262, 294, 330, 349, 392, 440, 494, 523, 587, 660],
  'E-phrygian': [165, 175, 196, 220, 247, 262, 294, 330, 349, 392],
  'g-minor-pent': [196, 233, 262, 294, 349, 392, 466, 523, 587, 698]
};

// ── Loop generators ──
function playTone(audio, destination, freq, start, duration, level, type){
  var osc = audio.createOscillator();
  var noteGain = audio.createGain();
  osc.type = type || 'sine';
  osc.frequency.setValueAtTime(freq, start);
  noteGain.gain.setValueAtTime(0.0001, start);
  noteGain.gain.exponentialRampToValueAtTime(Math.max(0.0002, level), start + 0.08);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(noteGain);
  noteGain.connect(destination);
  osc.start(start);
  osc.stop(start + duration + 0.08);
}

function createAmbientLoop(){
  var audio = getCtx();
  var now = audio.currentTime;
  var scale = SCALES['A-minor-pent'];
  var gain = audio.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume * 0.4, now + 2);
  gain.connect(audio.destination);

  var timer = null;
  var noteIdx = 0;

  function playNote(){
    if(!isPlaying) return;
    var freq = scale[noteIdx % scale.length];
    playTone(audio, gain, freq, audio.currentTime, 2.5, volume * 0.15, 'sine');
    noteIdx++;
    noteIdx += Math.random() > 0.5 ? 1 : -1;
    if(noteIdx < 0) noteIdx = scale.length - 1;
    if(noteIdx >= scale.length) noteIdx = 0;
  }

  playNote();
  function scheduleNext(){
    if(!isPlaying) return;
    var delay = 1800 + Math.random() * 1200;
    timer = setTimeout(function(){
      playNote();
      scheduleNext();
    }, delay);
  }
  scheduleNext();

  return {
    stop: function(){
      isPlaying = false;
      clearTimeout(timer);
      gain.gain.linearRampToValueAtTime(0, audio.currentTime + 1);
      setTimeout(function(){ gain.disconnect(); }, 1200);
    },
    setVolume: function(v){
      volume = v;
      gain.gain.linearRampToValueAtTime(v * 0.4, audio.currentTime + 0.1);
    }
  };
}

function createDroneLoop(){
  var audio = getCtx();
  var now = audio.currentTime;
  var gain = audio.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume * 0.28, now + 1.5);
  gain.connect(audio.destination);

  var oscillators = [110, 165, 220].map(function(freq, index){
    var osc = audio.createOscillator();
    var g = audio.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(index === 0 ? 0.34 : 0.16, now);
    osc.connect(g);
    g.connect(gain);
    osc.start(now);
    return osc;
  });

  return {
    stop: function(){
      isPlaying = false;
      gain.gain.linearRampToValueAtTime(0, audio.currentTime + 1);
      setTimeout(function(){
        oscillators.forEach(function(osc){ try { osc.stop(); } catch(e) {} });
        gain.disconnect();
      }, 1200);
    },
    setVolume: function(v){
      volume = v;
      gain.gain.linearRampToValueAtTime(v * 0.28, audio.currentTime + 0.1);
    }
  };
}

function createChordLoop(){
  var audio = getCtx();
  var gain = audio.createGain();
  gain.gain.setValueAtTime(0, audio.currentTime);
  gain.gain.linearRampToValueAtTime(volume * 0.3, audio.currentTime + 1);
  gain.connect(audio.destination);

  var chords = [
    [196, 247, 294],  // G B D (G major)
    [220, 262, 330],  // A C E (A minor)
    [175, 220, 262],  // F A C (F major)
    [196, 247, 294]   // G B D (G major)
  ];
  var chordIdx = 0;
  var timer = null;

  function playChord(){
    if(!isPlaying) return;
    var chord = chords[chordIdx % chords.length];
    chord.forEach(function(f, i){
      playTone(audio, gain, f, audio.currentTime + i * 0.05, 3, volume * 0.1, 'sine');
    });
    chordIdx++;
    timer = setTimeout(playChord, 3000);
  }
  playChord();

  return {
    stop: function(){
      isPlaying = false;
      clearTimeout(timer);
      gain.gain.linearRampToValueAtTime(0, audio.currentTime + 0.5);
      setTimeout(function(){ gain.disconnect(); }, 700);
    },
    setVolume: function(v){
      volume = v;
      gain.gain.linearRampToValueAtTime(v * 0.3, audio.currentTime + 0.1);
    }
  };
}

function createPulseLoop(){
  var audio = getCtx();
  var gain = audio.createGain();
  gain.gain.setValueAtTime(volume * 0.34, audio.currentTime);
  gain.connect(audio.destination);
  var scale = SCALES['E-phrygian'];
  var step = 0;
  var timer = null;

  function pulse(){
    if(!isPlaying) return;
    var root = scale[0];
    var accent = step % 4 === 0;
    playTone(audio, gain, root, audio.currentTime, 0.22, volume * (accent ? 0.18 : 0.09), 'triangle');
    if(step % 8 === 4) playTone(audio, gain, scale[3], audio.currentTime + 0.04, 0.28, volume * 0.08, 'sine');
    step++;
    timer = setTimeout(pulse, 520);
  }
  pulse();

  return {
    stop: function(){
      isPlaying = false;
      clearTimeout(timer);
      gain.gain.linearRampToValueAtTime(0, audio.currentTime + 0.25);
      setTimeout(function(){ gain.disconnect(); }, 400);
    },
    setVolume: function(v){
      volume = v;
      gain.gain.linearRampToValueAtTime(v * 0.34, audio.currentTime + 0.1);
    }
  };
}

function createMotifLoop(){
  var audio = getCtx();
  var gain = audio.createGain();
  gain.gain.setValueAtTime(volume * 0.35, audio.currentTime);
  gain.connect(audio.destination);
  var scale = SCALES['g-minor-pent'];
  var motifs = [
    [0, 2, 3, 2],
    [4, 3, 2, 0],
    [2, 4, 5, 4],
    [3, 2, 0, 2]
  ];
  var motifIdx = 0;
  var timer = null;

  function playMotif(){
    if(!isPlaying) return;
    var motif = motifs[motifIdx % motifs.length];
    var start = audio.currentTime;
    motif.forEach(function(noteIndex, i){
      playTone(audio, gain, scale[noteIndex], start + i * 0.34, 0.32, volume * 0.12, 'triangle');
    });
    motifIdx++;
    timer = setTimeout(playMotif, 2600);
  }
  playMotif();

  return {
    stop: function(){
      isPlaying = false;
      clearTimeout(timer);
      gain.gain.linearRampToValueAtTime(0, audio.currentTime + 0.4);
      setTimeout(function(){ gain.disconnect(); }, 550);
    },
    setVolume: function(v){
      volume = v;
      gain.gain.linearRampToValueAtTime(v * 0.35, audio.currentTime + 0.1);
    }
  };
}

// ── Public API ──
window.BeatBot = {
  play: function(type, opts){
    this.stop();
    isPlaying = true;
    currentMode = type;
    switch(type){
      case 'ambient':
        currentLoop = createAmbientLoop();
        break;
      case 'chords':
        currentLoop = createChordLoop();
        break;
      case 'drone':
        currentLoop = createDroneLoop();
        break;
      case 'pulse':
        currentLoop = createPulseLoop();
        break;
      case 'motif':
        currentLoop = createMotifLoop();
        break;
    }
  },
  stop: function(){
    isPlaying = false;
    currentMode = "";
    if(currentLoop && currentLoop.stop) currentLoop.stop();
    currentLoop = null;
  },
  setVolume: function(v){
    volume = v;
    if(currentLoop && currentLoop.setVolume) currentLoop.setVolume(v);
  },
  isPlaying: function(){ return isPlaying; },
  currentMode: function(){ return currentMode; }
};
window.Groove = window.BeatBot;

// ── Toggle Groove Panel ──
window.toggleBeatBot = function(){
  var panel = document.getElementById('beatbot-panel');
  if(!panel) return;
  var wasOpen = panel.classList.contains('show');
  if(window.HearthHeaderToolsController)window.HearthHeaderToolsController.closePanels(document,['beatbot-panel']);
  panelOpen = !wasOpen;
  panel.classList.toggle('show', panelOpen);
  if(panelOpen) renderBeatBotPanel();
};
window.toggleGroove = window.toggleBeatBot;

function grooveButton(mode, title, detail){
  var active = BeatBot.currentMode() === mode;
  return '<button class="toolkit-quick-btn groove-btn '+(active?'active':'')+'" onclick="BeatBot.play(\''+mode+'\');renderBeatBotPanel()">'+
    '<span class="groove-btn-title">'+title+'</span>'+
    '<span class="groove-btn-detail">'+detail+'</span>'+
  '</button>';
}

function renderBeatBotPanel(){
  var panel = document.getElementById('beatbot-panel');
  if(!panel) return;
  var playing = BeatBot.isPlaying();
  panel.innerHTML =
    '<div class="toolkit-header">'+
      '<h3>Groove</h3>'+
      '<button class="toolkit-close" onclick="toggleBeatBot()">×</button>'+
    '</div>'+
    '<div class="toolkit-body">'+
      '<div class="groove-status">'+
        '<div class="groove-orb '+(playing?'active':'')+'">'+
          '<svg viewBox="0 0 24 24"><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></svg>'+
        '</div>'+
        '<div class="groove-state">'+(playing?'Sound Bed Active':'Quiet')+'</div>'+
        '<div class="groove-help">Musical backing and atmosphere for practice. Use the metronome when you need strict time.</div>'+
      '</div>'+
      '<div class="toolkit-section">'+
        '<div class="toolkit-section-title">Sound Beds</div>'+
        '<div class="toolkit-quick-btns">'+
          grooveButton('ambient','Ember Notes','Soft wandering notes for map atmosphere.')+
          grooveButton('drone','Root Drone','A steady tonal center to tune your ear.')+
          grooveButton('chords','Chord Bed','Gentle harmony for slow practice.')+
          grooveButton('pulse','Body Pulse','A musical pulse, looser than the metronome.')+
          grooveButton('motif','Call Motif','Short guitar-like phrases for call and response.')+
        '</div>'+
      '</div>'+
      '<div class="toolkit-section">'+
        '<div class="toolkit-section-title">Volume</div>'+
        '<input type="range" class="metro-slider" min="0" max="100" value="'+Math.round(volume*100)+'" oninput="BeatBot.setVolume(this.value/100)">'+
      '</div>'+
      (playing?'<div class="groove-stop-wrap"><button class="toolkit-quick-btn groove-stop-btn" onclick="BeatBot.stop();renderBeatBotPanel()">Stop Sound</button></div>':'')+
    '</div>';
}

})();
