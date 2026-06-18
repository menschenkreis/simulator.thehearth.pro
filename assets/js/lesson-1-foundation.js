// Lesson 1: Foundation - The Hearth Mastery
const LESSON_1_FOUNDATION = {
  title: 'Foundation',
  subtitle: 'The beginning of everything',
  steps: [
    {
      type: 'speak',
      char: 'images/character-face/Neutral.png',
      charLabel: 'Guide',
      text: '<p>Welcome to Foundation. This is the place where we slow down just enough for everything after this to make sense.</p><p>Guitar can look like a tangle at first: strings, frets, fingers, names, little diagrams, people saying words like "interval" as if you were born knowing them. You were not. That is completely fine.</p><p>Today you are going to build the first map. You will learn how to learn, how music behaves like a language, where the notes live on the guitar, and how to make your first real sounds without fighting your own body.</p><p>Keep your guitar nearby if you have one. If you do not, stay with the lesson anyway. When a physical step appears, imagine it clearly. Imagination before movement is part of the practice.</p>'
    },

    {
      type: 'action',
      render: function(container, advance){
        container.innerHTML = `
          <div class="teach-scene-wrap">
            <div class="teach-scene">
              <div class="teach-char-wrap">
                <img src="images/character-face/Encouraging.png" class="teach-char-img" />
                <div class="teach-char-label">Guide</div>
              </div>
              <div class="teach-bubble">
                <div class="teach-tail"></div>
                <div class="teach-text">
                  <p>Before notes, we check the instrument you live inside: your body. Guitar gets much easier when you learn to notice tension before it turns into a wall.</p>
                </div>
              </div>
            </div>
            <div style="max-width:700px;margin:16px auto 0;padding:16px;background:var(--card);border:1px solid #3a2a1a;border-radius:8px">
              <div style="font-family:Cinzel,serif;color:var(--gold);font-size:0.95rem;font-weight:700;margin-bottom:12px">Body Scan Warm-up</div>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-scan /> Drop your shoulders. Let them hang instead of guarding your ears.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-scan /> Unclench your jaw. Open your mouth once, then let it soften.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-scan /> Loosen your fretting thumb. The neck is supported, not squeezed.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-scan /> Breathe out slowly. If you were holding your breath, welcome back.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-scan /> Picture one clean note before moving a finger.</label>
              <p style="font-size:0.75rem;color:var(--dim);line-height:1.5;margin:14px 0 0">This tiny ritual is not decoration. It prevents the most common beginner mistake: teaching your hands to play with unnecessary effort.</p>
              <div style="text-align:center;margin-top:16px">
                <button data-continue disabled style="background:#3a2a1a;color:#706050;border:1px solid #4a3824;padding:10px 24px;border-radius:6px;font-family:DM Sans,sans-serif;font-weight:700;cursor:not-allowed">Complete the scan</button>
              </div>
            </div>
          </div>`;

        var checks = container.querySelectorAll('[data-scan]');
        var button = container.querySelector('[data-continue]');
        function update(){
          var done = Array.prototype.every.call(checks, function(check){ return check.checked; });
          button.disabled = !done;
          button.textContent = done ? 'Ready for the first idea' : 'Complete the scan';
          button.style.background = done ? 'var(--gold)' : '#3a2a1a';
          button.style.color = done ? 'var(--bg)' : '#706050';
          button.style.cursor = done ? 'pointer' : 'not-allowed';
        }
        checks.forEach(function(check){ check.addEventListener('change', update); });
        button.addEventListener('click', function(){
          if(!button.disabled) advance();
        });
      }
    },

    {
      type: 'ask',
      concept: 'music-as-language',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>Here is the first big idea: music is a language.</p><p>That means it has <strong>vocabulary</strong>, which is notes. It has <strong>grammar</strong>, which is intervals, scales, and chords. And it has <strong>conversation</strong>, which is playing and listening with intention.</p><p>Babies listen for months before they speak. Guitar works the same way. Your ears are not extra. They are the front door.</p><p>So, in this language, what are the "words"?</p>',
      choices: [
        {
          label: 'Notes',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Exactly. Notes are the vocabulary. Chords, scales, riffs, and songs are built by arranging those notes into meaning.</p><p>And when a word is unclear, use the Dictionary. Clearing one confusing word often clears the whole lesson.</p>'
          }
        },
        { label: 'Guitar brands', correct: false },
        { label: 'Practice schedules', correct: false },
        { label: 'Stage lights', correct: false }
      ],
      reexplain: [
        {
          char: 'images/character-face/Encouraging.png',
          charLabel: 'Guide',
          text: '<p>No worries. Let us look at it from ordinary speech.</p>'
        },
        {
          char: 'images/character-face/Neutral.png',
          charLabel: 'Guide',
          text: '<p>In English, words are the small named pieces you combine into sentences. In music, the small named pieces are notes: A, B, C, and so on. Intervals and chords are more like grammar because they describe how those notes relate.</p>'
        }
      ]
    },

    {
      type: 'ask',
      concept: 'twelve-notes',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>Western music uses 12 notes before the pattern repeats: A, A#, B, C, C#, D, D#, E, F, F#, G, G#.</p><p>On guitar, the fretboard makes this beautifully physical. Move one fret higher and you move one <strong>half step</strong>. Move two frets higher and you move one <strong>whole step</strong>.</p><p>An <strong>interval</strong> is just the distance between two notes. The <strong>root</strong> is the home note, the sound everything else feels measured from.</p><p>If you move from fret 3 to fret 4 on the same string, how far did you move?</p>',
      choices: [
        {
          label: 'One half step',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Yes. One fret equals one half step. That is one of the friendliest things about guitar: the distance is right there under your finger.</p>'
          }
        },
        { label: 'One whole step', correct: false },
        { label: 'One octave', correct: false },
        { label: 'One chord', correct: false }
      ],
      reexplain: [
        {
          char: 'images/character-face/Encouraging.png',
          charLabel: 'Guide',
          text: '<p>Close enough to learn from. Think of frets as little steps on a staircase.</p>'
        },
        {
          char: 'images/character-face/Neutral.png',
          charLabel: 'Guide',
          text: '<p>Moving to the very next fret is the smallest normal move on guitar. That smallest move is called a half step. A whole step needs two of those moves, so it covers two frets.</p>'
        }
      ]
    },

    {
      type: 'cards',
      char: 'images/character-face/Neutral.png',
      charLabel: 'Guide',
      text: '<p>Now let us put those notes onto the guitar. The fretboard is not a mystery board. It is a repeating map.</p><p>Tap through these four pieces. You do not need to memorize the whole neck today. Just learn what kind of map you are looking at.</p>',
      cards: [
        {
          title: '6 Strings',
          icon: 'E A D G B E',
          desc: 'From thickest to thinnest: E, A, D, G, B, E. Try the memory line: Eddie Ate Dynamite, Good Bye Eddie.',
          body: 'From thickest to thinnest: E, A, D, G, B, E. Try the memory line: Eddie Ate Dynamite, Good Bye Eddie.'
        },
        {
          title: 'Frets',
          icon: '1 2 3',
          desc: 'Each fret raises the note by one half step. Two frets make a whole step.',
          body: 'Each fret raises the note by one half step. Two frets make a whole step.'
        },
        {
          title: 'Fret 12',
          icon: '12',
          desc: 'The 12th fret is the octave: the same note name as the open string, higher in pitch.',
          body: 'The 12th fret is the octave: the same note name as the open string, higher in pitch.'
        },
        {
          title: 'Tab',
          icon: '0 1 2',
          desc: 'Tab has six lines for six strings. Numbers tell you which fret to play. 0 means open.',
          body: 'Tab has six lines for six strings. Numbers tell you which fret to play. 0 means open.'
        }
      ]
    },

    {
      type: 'cards',
      char: 'images/character-face/Neutral.png',
      charLabel: 'Guide',
      text: '<p>Before you ask your hands to do hard things, know the instrument they are holding. Names matter because they remove fog.</p><p>If a future lesson says "place your thumb behind the neck" or "strum near the bridge," you want those words to land clearly.</p>',
      cards: [
        {
          title: 'Parts',
          icon: 'GTR',
          desc: 'Headstock holds tuning pegs. Neck holds frets. Body projects the sound. Bridge and nut hold the string path.',
          body: 'Headstock holds tuning pegs. Neck holds frets. Body projects the sound. Bridge and nut hold the string path.'
        },
        {
          title: 'Posture',
          icon: 'SIT',
          desc: 'The guitar should feel supported, not clamped. Your arm steadies it; your hand should not squeeze it into place.',
          body: 'The guitar should feel supported, not clamped. Your arm steadies it; your hand should not squeeze it into place.'
        },
        {
          title: 'Thumb',
          icon: 'PAD',
          desc: 'Use the pad of your thumb behind the neck, roughly opposite the middle finger. Keep the hand relaxed and curved.',
          body: 'Use the pad of your thumb behind the neck, roughly opposite the middle finger. Keep the hand relaxed and curved.'
        },
        {
          title: 'Capo',
          icon: 'CAPO',
          desc: 'A capo clamps across the strings and raises the pitch. Same chord shapes, different key.',
          body: 'A capo clamps across the strings and raises the pitch. Same chord shapes, different key.'
        }
      ]
    },

    {
      type: 'action',
      render: function(container, advance){
        container.innerHTML = `
          <div class="teach-scene-wrap">
            <div class="teach-scene">
              <div class="teach-char-wrap">
                <img src="images/character-face/Encouraging.png" class="teach-char-img" />
                <div class="teach-char-label">Guide</div>
              </div>
              <div class="teach-bubble">
                <div class="teach-tail"></div>
                <div class="teach-text">
                  <p>Time for your first sounds. We are not chasing speed. We are chasing clean, ringing notes and a body that stays calm while you make them.</p>
                </div>
              </div>
            </div>
            <div style="max-width:700px;margin:16px auto 0;padding:16px;background:var(--card);border:1px solid #3a2a1a;border-radius:8px">
              <div style="font-family:Cinzel,serif;color:var(--gold);font-size:0.95rem;font-weight:700;margin-bottom:12px">First Sounds</div>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin:0 0 14px">
                <button data-stroke="rest" style="background:var(--gold);color:var(--bg);border:none;padding:11px 14px;border-radius:6px;font-family:DM Sans,sans-serif;font-weight:700;cursor:pointer">Try Rest Stroke</button>
                <button data-stroke="free" style="background:none;color:var(--gold);border:1px solid var(--gold);padding:11px 14px;border-radius:6px;font-family:DM Sans,sans-serif;font-weight:700;cursor:pointer">Try Free Stroke</button>
              </div>
              <div data-stroke-meter style="height:42px;border:1px solid #3a2a1a;border-radius:6px;background:rgba(0,0,0,0.14);display:flex;align-items:center;justify-content:center;color:var(--dim);font-size:0.75rem;margin-bottom:14px;transition:all 0.18s">Click a stroke button and listen for the feel.</div>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-step /> Play one open string. Let it ring until it fades.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-step /> Try a rest stroke: push through the string and rest on the next string.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-step /> Try a free stroke: pluck the string and let the finger or pick move away freely.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-step /> Press just behind fret 1 on any string, then play it. Listen for buzz or muting.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-step /> Release any extra pressure and play the same note again.</label>
              <p style="font-size:0.75rem;color:var(--dim);line-height:1.5;margin:14px 0 0">The sweet spot is usually gentler than beginners expect: just enough pressure for a clean note.</p>
              <div style="text-align:center;margin-top:16px">
                <button data-continue disabled style="background:#3a2a1a;color:#706050;border:1px solid #4a3824;padding:10px 24px;border-radius:6px;font-family:DM Sans,sans-serif;font-weight:700;cursor:not-allowed">Make each sound</button>
              </div>
            </div>
          </div>`;

        var checks = container.querySelectorAll('[data-step]');
        var button = container.querySelector('[data-continue]');
        var meter = container.querySelector('[data-stroke-meter]');
        var audioCtx = null;
        function playStroke(kind){
          if(meter){
            meter.textContent = kind === 'rest' ? 'Rest stroke: fuller, rounder, more grounded.' : 'Free stroke: lighter, quicker, more open.';
            meter.style.borderColor = kind === 'rest' ? 'var(--gold)' : '#8ab4f8';
            meter.style.color = kind === 'rest' ? 'var(--gold)' : '#8ab4f8';
            meter.style.transform = 'scale(1.02)';
            setTimeout(function(){ meter.style.transform = 'scale(1)'; }, 160);
          }
          var AudioContext = window.AudioContext || window.webkitAudioContext;
          if(!AudioContext) return;
          audioCtx = audioCtx || new AudioContext();
          var now = audioCtx.currentTime;
          var osc = audioCtx.createOscillator();
          var gain = audioCtx.createGain();
          osc.type = kind === 'rest' ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(kind === 'rest' ? 196 : 247, now);
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(kind === 'rest' ? 0.26 : 0.13, now + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + (kind === 'rest' ? 0.65 : 0.32));
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.7);
        }
        container.querySelectorAll('[data-stroke]').forEach(function(strokeButton){
          strokeButton.addEventListener('click', function(){
            playStroke(this.dataset.stroke);
          });
        });
        function update(){
          var done = Array.prototype.every.call(checks, function(check){ return check.checked; });
          button.disabled = !done;
          button.textContent = done ? 'Clean notes are happening' : 'Make each sound';
          button.style.background = done ? 'var(--gold)' : '#3a2a1a';
          button.style.color = done ? 'var(--bg)' : '#706050';
          button.style.cursor = done ? 'pointer' : 'not-allowed';
        }
        checks.forEach(function(check){ check.addEventListener('change', update); });
        button.addEventListener('click', function(){
          if(!button.disabled) advance();
        });
      }
    },

    {
      type: 'action',
      render: function(container, advance){
        container.innerHTML = `
          <div class="teach-scene-wrap">
            <div class="teach-scene">
              <div class="teach-char-wrap">
                <img src="images/character-face/Thinking.png" class="teach-char-img" />
                <div class="teach-char-label">Guide</div>
              </div>
              <div class="teach-bubble">
                <div class="teach-tail"></div>
                <div class="teach-text">
                  <p>One note is a sound. Two notes are the beginning of music, because now there is movement. Let us make that movement small and clean.</p>
                </div>
              </div>
            </div>
            <div style="max-width:700px;margin:16px auto 0;padding:16px;background:var(--card);border:1px solid #3a2a1a;border-radius:8px">
              <div style="font-family:Cinzel,serif;color:var(--gold);font-size:0.95rem;font-weight:700;margin-bottom:12px">Moving Between Notes</div>
              <div style="display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;margin:10px 0 14px">
                <div style="font-family:var(--mono);color:var(--gold);font-size:0.85rem;line-height:1.7;text-align:center;border:1px solid #3a2a1a;border-radius:6px;padding:10px;background:rgba(0,0,0,0.14)">
                  e|-------------<br />
                  B|-------------<br />
                  G|--<span data-tab-note="0">0</span>--<span data-tab-note="2">2</span>--<span data-tab-note="0b">0</span>--<br />
                  D|-------------<br />
                  A|-------------<br />
                  E|-------------
                </div>
                <button data-play-tab style="background:var(--gold);color:var(--bg);border:none;padding:11px 18px;border-radius:6px;font-family:DM Sans,sans-serif;font-weight:700;cursor:pointer">Play</button>
              </div>
              <div data-tab-status style="height:28px;color:var(--dim);font-size:0.75rem;text-align:center">Open -> fret 2 -> open on the G string.</div>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-move /> Play the G string open. Let the note speak clearly.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-move /> Press fret 2 just behind the fret wire and play again.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-move /> Lift the finger and play open again. Notice the return home.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-move /> Walk up one string: open, 1, 2, 3, 4. Slow enough that every note is honest.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-move /> Walk back down: 4, 3, 2, 1, open.</label>
              <p style="font-size:0.75rem;color:var(--dim);line-height:1.5;margin:14px 0 0">If a note buzzes, do not judge it. Adjust. Closer to the fret wire, arched finger, less shoulder tension.</p>
              <div style="text-align:center;margin-top:16px">
                <button data-continue disabled style="background:#3a2a1a;color:#706050;border:1px solid #4a3824;padding:10px 24px;border-radius:6px;font-family:DM Sans,sans-serif;font-weight:700;cursor:not-allowed">Complete the movement</button>
              </div>
            </div>
          </div>`;

        var checks = container.querySelectorAll('[data-move]');
        var button = container.querySelector('[data-continue]');
        var playTab = container.querySelector('[data-play-tab]');
        var tabStatus = container.querySelector('[data-tab-status]');
        var tabNotes = ['0', '2', '0b'].map(function(id){ return container.querySelector('[data-tab-note="'+id+'"]'); });
        playTab.addEventListener('click', function(){
          tabNotes.forEach(function(note){
            if(note){
              note.style.background = 'transparent';
              note.style.color = 'var(--gold)';
              note.style.borderRadius = '4px';
              note.style.padding = '1px 3px';
            }
          });
          ['open', 'fret 2', 'open'].forEach(function(label, idx){
            setTimeout(function(){
              tabNotes.forEach(function(note){
                if(note){
                  note.style.background = 'transparent';
                  note.style.color = 'var(--gold)';
                }
              });
              if(tabNotes[idx]){
                tabNotes[idx].style.background = 'var(--gold)';
                tabNotes[idx].style.color = 'var(--bg)';
              }
              if(tabStatus) tabStatus.textContent = 'Playing: ' + label;
            }, idx * 420);
          });
          setTimeout(function(){
            tabNotes.forEach(function(note){
              if(note){
                note.style.background = 'transparent';
                note.style.color = 'var(--gold)';
              }
            });
            if(tabStatus) tabStatus.textContent = 'Now try it on your guitar: open -> fret 2 -> open.';
          }, 1300);
        });
        function update(){
          var done = Array.prototype.every.call(checks, function(check){ return check.checked; });
          button.disabled = !done;
          button.textContent = done ? 'Movement complete' : 'Complete the movement';
          button.style.background = done ? 'var(--gold)' : '#3a2a1a';
          button.style.color = done ? 'var(--bg)' : '#706050';
          button.style.cursor = done ? 'pointer' : 'not-allowed';
        }
        checks.forEach(function(check){ check.addEventListener('change', update); });
        button.addEventListener('click', function(){
          if(!button.disabled) advance();
        });
      }
    },

    {
      type: 'action',
      render: function(container, advance){
        container.innerHTML = `
          <div class="teach-scene-wrap">
            <div class="teach-scene">
              <div class="teach-char-wrap">
                <img src="images/character-face/Encouraging.png" class="teach-char-img" />
                <div class="teach-char-label">Guide</div>
              </div>
              <div class="teach-bubble">
                <div class="teach-tail"></div>
                <div class="teach-text">
                  <p>You have played single notes. Now we stack notes together. This is your first chord: E major. It is big, open, friendly, and used everywhere.</p>
                </div>
              </div>
            </div>
            <div style="max-width:760px;margin:16px auto 0;padding:16px;background:var(--card);border:1px solid #3a2a1a;border-radius:8px">
              <div style="font-family:Cinzel,serif;color:var(--gold);font-size:0.95rem;font-weight:700;margin-bottom:12px">First Chord: E Major</div>
              <div style="display:grid;grid-template-columns:minmax(220px,1fr) auto;gap:14px;align-items:center;margin:10px 0 14px">
                <div data-chord-diagram style="font-family:var(--mono);color:var(--gold);font-size:0.82rem;line-height:1.75;text-align:center;border:1px solid #3a2a1a;border-radius:6px;padding:12px;background:rgba(0,0,0,0.14);transition:all 0.18s">
                  e|---0---<br />
                  B|---0---<br />
                  G|---<strong style="color:#fff">1</strong>--- finger 1<br />
                  D|---<strong style="color:#fff">2</strong>--- finger 2<br />
                  A|---<strong style="color:#fff">3</strong>--- finger 3<br />
                  E|---0---
                </div>
                <button data-strum style="background:var(--gold);color:var(--bg);border:none;padding:11px 18px;border-radius:6px;font-family:DM Sans,sans-serif;font-weight:700;cursor:pointer">Strum All 6</button>
              </div>
              <div data-strum-status style="height:28px;color:var(--dim);font-size:0.75rem;text-align:center">Finger numbers: 1 index, 2 middle, 3 ring.</div>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-chord /> Put your index finger on fret 1 of the G string.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-chord /> Put your middle finger on fret 2 of the D string.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-chord /> Put your ring finger on fret 2 of the A string.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-chord /> Strum all six strings slowly from thick to thin.</label>
              <label style="display:block;margin:10px 0;color:var(--dim);line-height:1.4"><input type="checkbox" data-chord /> Check each string. If one is muted, arch the fingers and try again.</label>
              <p style="font-size:0.75rem;color:var(--dim);line-height:1.5;margin:14px 0 0">That sound is harmony: several notes working together. Your hands just made a little room for music to stand in.</p>
              <div style="text-align:center;margin-top:16px">
                <button data-continue disabled style="background:#3a2a1a;color:#706050;border:1px solid #4a3824;padding:10px 24px;border-radius:6px;font-family:DM Sans,sans-serif;font-weight:700;cursor:not-allowed">Ring the chord</button>
              </div>
            </div>
          </div>`;

        var checks = container.querySelectorAll('[data-chord]');
        var button = container.querySelector('[data-continue]');
        var strum = container.querySelector('[data-strum]');
        var diagram = container.querySelector('[data-chord-diagram]');
        var strumStatus = container.querySelector('[data-strum-status]');
        strum.addEventListener('click', function(){
          if(diagram){
            diagram.style.borderColor = 'var(--gold)';
            diagram.style.boxShadow = '0 0 0 3px rgba(214, 169, 84, 0.18)';
            diagram.style.transform = 'translateY(-2px)';
          }
          if(strumStatus) strumStatus.textContent = 'Strumming: E, A, D, G, B, e';
          setTimeout(function(){
            if(diagram){
              diagram.style.boxShadow = 'none';
              diagram.style.transform = 'translateY(0)';
            }
            if(strumStatus) strumStatus.textContent = 'Let the chord ring, then check each string.';
          }, 650);
        });
        function update(){
          var done = Array.prototype.every.call(checks, function(check){ return check.checked; });
          button.disabled = !done;
          button.textContent = done ? 'E major is ringing' : 'Ring the chord';
          button.style.background = done ? 'var(--gold)' : '#3a2a1a';
          button.style.color = done ? 'var(--bg)' : '#706050';
          button.style.cursor = done ? 'pointer' : 'not-allowed';
        }
        checks.forEach(function(check){ check.addEventListener('change', update); });
        button.addEventListener('click', function(){
          if(!button.disabled) advance();
        });
      }
    },

    {
      type: 'ask',
      concept: 'foundation-recap',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>Quick recap. You have met the learning barriers, the language idea, the 12-note map, the guitar layout, clean single notes, movement, and E major.</p><p>One idea protects everything else: if a lesson suddenly goes foggy, what should you check first?</p>',
      choices: [
        {
          label: 'A skipped barrier: no physical example, too big a jump, or an unclear word',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Yes. That is the Foundation mindset. When learning breaks down, you do not blame yourself. You look for the barrier and make the next step smaller and clearer.</p>'
          }
        },
        { label: 'Whether you are naturally talented enough', correct: false },
        { label: 'Whether you can play fast yet', correct: false },
        { label: 'Whether your guitar looks impressive', correct: false }
      ],
      reexplain: [
        {
          char: 'images/character-face/Encouraging.png',
          charLabel: 'Guide',
          text: '<p>Let us take the pressure off for a second. Fog in learning usually has a cause.</p>'
        },
        {
          char: 'images/character-face/Neutral.png',
          charLabel: 'Guide',
          text: '<p>The three common barriers are: no physical thing to look at or touch, a step that is too large, or one word that was not fully understood. Find the barrier, clear it, and the path usually opens again.</p>'
        }
      ]
    },

    {
      type: 'speak',
      char: 'images/character-face/Encouraging.png',
      charLabel: 'Guide',
      text: '<p>What comes next is Doing. Foundation gave you the map; Doing starts training the movement.</p><p>Your best practice shape is simple: 20 minutes a day beats two hours once a week. Start with two minutes of body scan, a few minutes of clean open strings or slow finger movement, one focused drill, and a little time playing anything that makes you want to come back tomorrow.</p><p>Keep listening. Keep clearing words. Keep making the step small enough that your hands can succeed. Guitar rewards patience in a very literal way: what you repeat becomes easier to repeat.</p>'
    },

    {
      type: 'end',
      char: 'images/character-face/Celebratory.png',
      buttonLabel: 'Continue',
      text: '<p><strong>Foundation complete.</strong></p><p>You now know how to approach learning, how music works like a language, how the 12 notes move across the fretboard, how to hold the instrument without clamping it, how to make clean first sounds, how to move between notes, and how to form E major.</p><p>This is the beginning of everything. Not because you know everything now, but because you know how to keep going.</p>'
    }
  ]
};

if(typeof window !== 'undefined') window.LESSON_1_FOUNDATION = LESSON_1_FOUNDATION;
if(typeof module !== 'undefined') module.exports = LESSON_1_FOUNDATION;
