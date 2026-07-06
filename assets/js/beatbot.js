// ═══════════════════════════════════════════════════════
// BEAT BOT — Interactive Music Companion
// ═══════════════════════════════════════════════════════
// A robot friend that generates music for you.
// Ambient backgrounds, practice loops, and lesson accompaniment.

(function(){
'use strict';

var ctx = null;
var isPlaying = false;
var currentLoop = null;
var volume = 0.3;
var panelOpen = false;

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
function createAmbientLoop(){
  var audio = getCtx();
  var now = audio.currentTime;
  var scale = SCALES['A-minor-pent'];
  var gain = audio.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume * 0.4, now + 2);
  gain.connect(audio.destination);

  var interval = null;
  var noteIdx = 0;

  function playNote(){
    if(!isPlaying) return;
    var freq = scale[noteIdx % scale.length];
    var osc = audio.createOscillator();
    var noteGain = audio.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audio.currentTime);
    noteGain.gain.setValueAtTime(0.0001, audio.currentTime);
    noteGain.gain.exponentialRampToValueAtTime(volume * 0.15, audio.currentTime + 0.1);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 2.5);
    osc.connect(noteGain);
    noteGain.connect(gain);
    osc.start(audio.currentTime);
    osc.stop(audio.currentTime + 2.8);
    noteIdx++;
    // Random walk through scale
    noteIdx += Math.random() > 0.5 ? 1 : -1;
    if(noteIdx < 0) noteIdx = scale.length - 1;
    if(noteIdx >= scale.length) noteIdx = 0;
  }

  // Play first note immediately
  playNote();
  // Then every 1.8-3 seconds (human timing)
  function scheduleNext(){
    if(!isPlaying) return;
    var delay = 1800 + Math.random() * 1200;
    currentLoop = setTimeout(function(){
      playNote();
      scheduleNext();
    }, delay);
  }
  scheduleNext();

  return {
    stop: function(){
      isPlaying = false;
      clearTimeout(currentLoop);
      gain.gain.linearRampToValueAtTime(0, audio.currentTime + 1);
      setTimeout(function(){ gain.disconnect(); }, 1200);
    },
    setVolume: function(v){
      volume = v;
      gain.gain.linearRampToValueAtTime(v * 0.4, audio.currentTime + 0.1);
    }
  };
}

function createDrillLoop(bpm){
  var audio = getCtx();
  var beatInterval = 60000 / bpm;
  var gain = audio.createGain();
  gain.gain.setValueAtTime(volume * 0.5, audio.currentTime);
  gain.connect(audio.destination);

  var count = 0;
  function tick(){
    if(!isPlaying) return;
    var osc = audio.createOscillator();
    var g = audio.createGain();
    var isAccent = count % 4 === 0;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isAccent ? 1000 : 800, audio.currentTime);
    g.gain.setValueAtTime(isAccent ? 0.12 : 0.06, audio.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.06);
    osc.connect(g);
    g.connect(gain);
    osc.start(audio.currentTime);
    osc.stop(audio.currentTime + 0.07);
    count++;
    currentLoop = setTimeout(tick, beatInterval);
  }
  tick();

  return {
    stop: function(){
      isPlaying = false;
      clearTimeout(currentLoop);
      gain.gain.linearRampToValueAtTime(0, audio.currentTime + 0.1);
      setTimeout(function(){ gain.disconnect(); }, 200);
    },
    setVolume: function(v){
      volume = v;
      gain.gain.linearRampToValueAtTime(v * 0.5, audio.currentTime + 0.1);
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

  function playChord(){
    if(!isPlaying) return;
    var chord = chords[chordIdx % chords.length];
    chord.forEach(function(f, i){
      var osc = audio.createOscillator();
      var g = audio.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, audio.currentTime);
      g.gain.setValueAtTime(0.0001, audio.currentTime);
      g.gain.exponentialRampToValueAtTime(volume * 0.1, audio.currentTime + 0.1);
      g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 3);
      osc.connect(g);
      g.connect(gain);
      osc.start(audio.currentTime + i * 0.05);
      osc.stop(audio.currentTime + 3.2);
    });
    chordIdx++;
    currentLoop = setTimeout(playChord, 3000);
  }
  playChord();

  return {
    stop: function(){
      isPlaying = false;
      clearTimeout(currentLoop);
      gain.gain.linearRampToValueAtTime(0, audio.currentTime + 0.5);
      setTimeout(function(){ gain.disconnect(); }, 700);
    },
    setVolume: function(v){
      volume = v;
      gain.gain.linearRampToValueAtTime(v * 0.3, audio.currentTime + 0.1);
    }
  };
}

// ── Public API ──
window.BeatBot = {
  play: function(type, opts){
    this.stop();
    isPlaying = true;
    switch(type){
      case 'ambient':
        currentLoop = createAmbientLoop();
        break;
      case 'drill':
        currentLoop = createDrillLoop((opts && opts.bpm) || 80);
        break;
      case 'chords':
        currentLoop = createChordLoop();
        break;
    }
  },
  stop: function(){
    isPlaying = false;
    if(currentLoop && currentLoop.stop) currentLoop.stop();
    currentLoop = null;
  },
  setVolume: function(v){
    volume = v;
    if(currentLoop && currentLoop.setVolume) currentLoop.setVolume(v);
  },
  isPlaying: function(){ return isPlaying; }
};

// ── Toggle Beat Bot Panel ──
window.toggleBeatBot = function(){
  var panel = document.getElementById('beatbot-panel');
  if(!panel) return;
  var wasOpen = panel.classList.contains('show');
  if(window.HearthHeaderToolsController)window.HearthHeaderToolsController.closePanels(document,['beatbot-panel']);
  panelOpen = !wasOpen;
  panel.classList.toggle('show', panelOpen);
  if(panelOpen) renderBeatBotPanel();
};

function renderBeatBotPanel(){
  var panel = document.getElementById('beatbot-panel');
  if(!panel) return;
  var playing = BeatBot.isPlaying();
  panel.innerHTML =
    '<div class="toolkit-header">'+
      '<h3>Beat Bot</h3>'+
      '<button class="toolkit-close" onclick="toggleBeatBot()">×</button>'+
    '</div>'+
    '<div class="toolkit-body">'+
      '<div style="text-align:center;margin-bottom:16px">'+
        '<div style="font-size:2rem;margin-bottom:4px">'+(playing?'<span class="candle-flame">🔊</span>':'🤖')+'</div>'+
        '<div style="font-family:Cinzel,serif;color:var(--gold);font-size:0.8rem;letter-spacing:1px">'+(playing?'PLAYING':'IDLE')+'</div>'+
      '</div>'+
      '<div class="toolkit-section">'+
        '<div class="toolkit-section-title">Modes</div>'+
        '<div class="toolkit-quick-btns" style="flex-direction:column">'+
          '<button class="toolkit-quick-btn" onclick="BeatBot.play(\'ambient\');renderBeatBotPanel()" style="justify-content:flex-start">'+
            '🎵 Ambient — Soft background atmosphere'+
          '</button>'+
          '<button class="toolkit-quick-btn" onclick="BeatBot.play(\'chords\');renderBeatBotPanel()" style="justify-content:flex-start">'+
            '🎸 Chords — Gentle chord progression'+
          '</button>'+
          '<button class="toolkit-quick-btn" onclick="BeatBot.play(\'drill\',{bpm:80});renderBeatBotPanel()" style="justify-content:flex-start">'+
            '⏱ Drill — Metronome at 80 BPM'+
          '</button>'+
          '<button class="toolkit-quick-btn" onclick="BeatBot.play(\'drill\',{bpm:120});renderBeatBotPanel()" style="justify-content:flex-start">'+
            '⏱ Drill — Metronome at 120 BPM'+
          '</button>'+
        '</div>'+
      '</div>'+
      '<div class="toolkit-section">'+
        '<div class="toolkit-section-title">Volume</div>'+
        '<input type="range" class="metro-slider" min="0" max="100" value="'+Math.round(volume*100)+'" oninput="BeatBot.setVolume(this.value/100)">'+
      '</div>'+
      (playing?'<div style="text-align:center;margin-top:8px"><button class="toolkit-quick-btn" onclick="BeatBot.stop();renderBeatBotPanel()" style="border-color:#ff654d;color:#ff654d">⏹ Stop</button></div>':'')+
    '</div>';
}

})();
