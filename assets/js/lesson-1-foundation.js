// ═══════════════════════════════════════════════════════
// LESSON 1: FOUNDATION — The Hearth Mastery
// Comprehensive interactive lesson for absolute beginners
// ═══════════════════════════════════════════════════════

var LESSON_1_FOUNDATION = {
  title: 'Foundation',
  subtitle: 'The beginning of everything',
  steps: [

    // ─── 1. WELCOME ───
    {
      type: 'speak',
      char: 'images/character-face/Neutral.png',
      charLabel: 'Guide',
      text: '<p>Welcome to Foundation. This is where everything begins.</p><p>Slow down for a moment. If your guitar is nearby, great. If not, stay — imagination before movement is part of the practice.</p><p>You are about to build your first map. Not of the whole guitar — just of the ground beneath your feet right now. By the end, you will know how music works as a language, where notes live on the fretboard, and how to make clean first sounds without fighting your body.</p>'
    },

    // ─── 2. TENSION EXPLANATION ───
    {
      type: 'speak',
      char: 'images/character-face/Encouraging.png',
      charLabel: 'Guide',
      text: '<p>Before we touch a string, we check the instrument you live inside: your body.</p><p>Here is something most beginners never learn: <strong>tension is the enemy of clean playing.</strong></p><p>When your shoulders climb toward your ears, when your jaw clenches, when your fretting thumb squeezes the neck — your fingers lose their independence. They become stiff and clumsy.</p><p>The fix is not complicated. Awareness first. Then release.</p>'
    },

    // ─── 3. ASK: WHY TENSION MATTERS ───
    {
      type: 'ask',
      concept: 'body-tension',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>Why does tension in your shoulders or jaw affect your guitar playing?</p>',
      choices: [
        {
          label: 'Tension travels through the arm and makes fingers stiff and clumsy',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Exactly. Your fingers share tendons and nerves with your forearm, which connects to your shoulder. Lock any link in that chain and the whole system gets clumsy. A relaxed body is step one of good technique.</p>'
          }
        },
        { label: 'It does not really affect anything', correct: false },
        { label: 'It makes you play too fast', correct: false },
        { label: 'It only matters for advanced players', correct: false }
      ],
      reexplain: [
        {
          char: 'images/character-face/Encouraging.png',
          charLabel: 'Guide',
          text: '<p>Try this right now: clench your fist hard and try to wiggle your fingers. Difficult, right? Now release and try again — easy. That difference is why tension matters.</p>'
        }
      ]
    },

    // ─── 4. INTERACTIVE: BODY SCAN ───
    {
      type: 'action',
      render: function(container, advance) {
        var parts = [
          { name: 'Shoulders', desc: 'Let them drop. Not forced — just released.', freq: 220, icon: '🪂' },
          { name: 'Jaw', desc: 'Unclench your teeth. Let lips part slightly.', freq: 261, icon: '😌' },
          { name: 'Hands', desc: 'Shake them out. Let them go floppy.', freq: 294, icon: '✋' },
          { name: 'Breath', desc: 'One slow breath in. One slow breath out.', freq: 330, icon: '🌬️' }
        ];
        var tried = [false, false, false, false];

        var html = '<div class="teach-scene-wrap">' +
          '<div class="teach-scene">' +
            '<div class="teach-char-wrap">' +
              '<img src="images/character-face/Encouraging.png" class="teach-char-img" />' +
              '<div class="teach-char-label">Guide</div>' +
            '</div>' +
            '<div class="teach-bubble">' +
              '<div class="teach-tail"></div>' +
              '<div class="teach-text"><p>Let us do a body scan together. Tap <strong>Try It</strong> on each area. You will hear a soft tone as a cue — follow the instruction at your own pace.</p></div>' +
            '</div>' +
          '</div>';

        html += '<div style="max-width:560px;margin:14px auto;display:grid;grid-template-columns:1fr 1fr;gap:12px">';
        for (var i = 0; i < parts.length; i++) {
          html += '<div class="bs-card" data-idx="' + i + '" style="background:var(--card);border:2px solid #3a2a1a;border-radius:10px;padding:16px;text-align:center;transition:all 0.3s">' +
            '<div style="font-size:1.6rem;margin-bottom:6px">' + parts[i].icon + '</div>' +
            '<div style="font-family:Cinzel,serif;font-size:0.82rem;color:var(--gold);margin-bottom:4px">' + parts[i].name + '</div>' +
            '<div style="font-size:0.7rem;color:var(--dim);line-height:1.4;margin-bottom:12px">' + parts[i].desc + '</div>' +
            '<div class="bs-visual" style="height:24px;display:flex;align-items:center;justify-content:center;margin-bottom:8px">' +
              '<div class="bs-dot" style="width:8px;height:8px;border-radius:50%;background:#3a2a1a;transition:all 0.3s"></div>' +
            '</div>' +
            '<button class="bs-btn" data-idx="' + i + '" style="background:rgba(212,175,105,0.12);border:1px solid var(--gold);color:var(--gold);padding:7px 16px;border-radius:6px;cursor:pointer;font-family:DM Sans,sans-serif;font-size:0.74rem;font-weight:600;transition:all 0.2s">Try It</button>' +
          '</div>';
        }
        html += '</div>';

        html += '<div style="display:flex;justify-content:center;padding:10px 16px;max-width:700px;margin:0 auto">' +
          '<button class="bs-continue" disabled style="background:var(--gold);border:none;color:var(--bg);padding:9px 28px;border-radius:6px;cursor:not-allowed;font-family:DM Sans,sans-serif;font-size:0.8rem;font-weight:700;opacity:0.35;transition:all 0.3s">Continue ▸</button>' +
        '</div></div>';

        container.innerHTML = html;

        function updateContinue() {
          var allDone = tried[0] && tried[1] && tried[2] && tried[3];
          var btn = container.querySelector('.bs-continue');
          if (allDone) {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
          }
        }

        var buttons = container.querySelectorAll('.bs-btn');
        for (var b = 0; b < buttons.length; b++) {
          buttons[b].addEventListener('click', function() {
            var idx = parseInt(this.dataset.idx);
            _l1_playTone(parts[idx].freq, 'sine', 1.5, 0.08);

            var card = container.querySelector('.bs-card[data-idx="' + idx + '"]');
            var dot = card.querySelector('.bs-dot');
            dot.style.background = '#d4af69';
            dot.style.width = '18px';
            dot.style.height = '18px';
            dot.style.boxShadow = '0 0 14px rgba(212,175,105,0.7)';

            setTimeout(function() {
              dot.style.width = '8px';
              dot.style.height = '8px';
              dot.style.boxShadow = 'none';
            }, 1000);

            if (!tried[idx]) {
              tried[idx] = true;
              this.textContent = 'Done ✓';
              this.style.opacity = '0.55';
              card.style.borderColor = 'rgba(212,175,105,0.5)';
              updateContinue();
            }
          });
        }

        container.querySelector('.bs-continue').addEventListener('click', function() {
          if (!this.disabled) advance();
        });
      }
    },

    // ─── 5. MUSIC AS LANGUAGE ───
    {
      type: 'ask',
      concept: 'music-as-language',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>Here is the first big idea: <strong>music is a language.</strong></p><p>It has <strong>vocabulary</strong> — notes. It has <strong>grammar</strong> — intervals, scales, and chords. And it has <strong>conversation</strong> — playing and listening with intention.</p><p>Babies listen for months before they speak. Guitar works the same way. Your ears are not extra — they are the front door.</p><p>So, in this language, what are the "words"?</p>',
      choices: [
        {
          label: 'Notes',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Exactly. Notes are the vocabulary. Chords, scales, riffs, and songs are built by arranging those notes into meaning.</p><p>And when a word is unclear, look it up. Clearing one confusing word often clears the whole lesson.</p>'
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
          text: '<p>Let us look at it from ordinary speech. In English, words are the small named pieces you combine into sentences. In music, those small named pieces are notes: A, B, C, and so on. Intervals and chords are more like grammar — they describe how notes relate.</p>'
        }
      ]
    },

    // ─── 6. TWELVE NOTES EXPLANATION ───
    {
      type: 'speak',
      char: 'images/character-face/Neutral.png',
      charLabel: 'Guide',
      text: '<p>Western music uses <strong>12 notes</strong> before the pattern repeats: A, A♯, B, C, C♯, D, D♯, E, F, F♯, G, G♯.</p><p>On guitar, the fretboard makes this beautifully physical. Move one fret higher and you move one <strong>half step</strong>. Move two frets and you move one <strong>whole step</strong>.</p><p>An <strong>interval</strong> is the distance between two notes. The <strong>root</strong> is the home note — the sound everything else feels measured from.</p>'
    },

    // ─── 7. ASK: HALF STEP QUESTION ───
    {
      type: 'ask',
      concept: 'twelve-notes',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>If you move from fret 3 to fret 4 on the same string, how far did you move?</p>',
      choices: [
        {
          label: 'One half step',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Yes. One fret equals one half step. That is one of the friendliest things about guitar — the distance is right there under your finger.</p>'
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
          text: '<p>Think of frets as steps on a staircase. The very next step — one fret — is the smallest normal move on guitar. That smallest move is a <em>half step</em>. A whole step covers two frets.</p>'
        }
      ]
    },

    // ─── 8. FRETBOARD MAP CARDS ───
    {
      type: 'cards',
      char: 'images/character-face/Neutral.png',
      charLabel: 'Guide',
      text: '<p>Now let us put those notes onto the guitar. The fretboard is not a mystery — it is a repeating map. Tap through these four pieces.</p>',
      cards: [
        {
          title: '6 Strings',
          icon: 'E A D G B E',
          desc: 'Thickest to thinnest: E, A, D, G, B, E. Memory line: Eddie Ate Dynamite, Good Bye Eddie.'
        },
        {
          title: 'Frets',
          icon: '1 2 3',
          desc: 'Each fret raises the note by one half step. Two frets make a whole step.'
        },
        {
          title: 'Fret 12',
          icon: '12',
          desc: 'The 12th fret is the octave — same note name as the open string, higher in pitch.'
        },
        {
          title: 'Tab',
          icon: '♪',
          desc: 'Tab uses six lines for six strings. Numbers tell you which fret. 0 means open string.'
        }
      ]
    },

    // ─── 9. GUITAR PARTS & POSTURE CARDS ───
    {
      type: 'cards',
      char: 'images/character-face/Neutral.png',
      charLabel: 'Guide',
      text: '<p>Before you ask your hands to do hard things, know the instrument they are holding. Names remove fog. If a future lesson says "place your thumb behind the neck" or "strum near the bridge," you want those words to land clearly.</p>',
      cards: [
        {
          title: 'Parts',
          icon: '🎸',
          desc: 'Headstock holds tuning pegs. Neck holds frets. Body projects the sound. Bridge and nut anchor the strings.'
        },
        {
          title: 'Posture',
          icon: '🪑',
          desc: 'The guitar should feel supported, not clamped. Your arm steadies it — your hand should not squeeze it into place.'
        },
        {
          title: 'Thumb',
          icon: '👍',
          desc: 'Use the pad of your thumb behind the neck, roughly opposite your middle finger. Keep the hand relaxed and curved.'
        },
        {
          title: 'Capo',
          icon: '🔖',
          desc: 'A capo clamps across the strings and raises the pitch. Same chord shapes, different key.'
        }
      ]
    },

    // ─── 10. REST STROKE VS FREE STROKE ───
    {
      type: 'speak',
      char: 'images/character-face/Encouraging.png',
      charLabel: 'Guide',
      text: '<p>Time for your first sounds. There are two ways to pluck a string, and they feel very different.</p><p>A <strong>rest stroke</strong> pushes through the string and lands on the next one. It sounds full and round, like a bass note.</p><p>A <strong>free stroke</strong> plucks the string and moves away into the air. It sounds lighter and more open.</p><p>Neither is better — they are different tools. But you need to know both.</p>'
    },

    // ─── 11. ASK: WHICH SOUNDS FULLER ───
    {
      type: 'ask',
      concept: 'stroke-types',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>Which stroke type produces a fuller, more grounded sound?</p>',
      choices: [
        {
          label: 'Rest stroke — it pushes through and lands on the next string',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Yes. The rest stroke transfers more energy into the string, so it sounds bigger and rounder. The free stroke is quicker and lighter — great for fast passages and fingerpicking.</p>'
          }
        },
        { label: 'Free stroke — it moves faster', correct: false },
        { label: 'They sound exactly the same', correct: false },
        { label: 'It depends on the guitar brand', correct: false }
      ],
      reexplain: [
        {
          char: 'images/character-face/Encouraging.png',
          charLabel: 'Guide',
          text: '<p>A rest stroke pushes through the string and stops on the next one. That extra contact transfers more energy — more body, more weight. The free stroke plucks and lifts away — less contact, lighter sound.</p>'
        }
      ]
    },

    // ─── 12. INTERACTIVE: FIRST SOUNDS ───
    {
      type: 'action',
      render: function(container, advance) {
        var html = '<div class="teach-scene-wrap">' +
          '<div class="teach-scene">' +
            '<div class="teach-char-wrap">' +
              '<img src="images/character-face/Encouraging.png" class="teach-char-img" />' +
              '<div class="teach-char-label">Guide</div>' +
            '</div>' +
            '<div class="teach-bubble">' +
              '<div class="teach-tail"></div>' +
              '<div class="teach-text"><p>Listen to both stroke types. Notice how the rest stroke sounds <strong>warm and full</strong>, while the free stroke sounds <strong>light and open</strong>.</p></div>' +
            '</div>' +
          '</div>';

        // Stroke demo buttons
        html += '<div style="max-width:520px;margin:14px auto;display:flex;gap:14px;justify-content:center">' +
          '<button class="stroke-btn" data-stroke="rest" style="flex:1;background:rgba(212,175,105,0.12);border:2px solid var(--gold);border-radius:10px;padding:18px 12px;cursor:pointer;text-align:center;transition:all 0.2s">' +
            '<div style="font-size:1.4rem;margin-bottom:4px">🎻</div>' +
            '<div style="font-family:Cinzel,serif;font-size:0.78rem;color:var(--gold);font-weight:700">Rest Stroke</div>' +
            '<div style="font-size:0.68rem;color:var(--dim);margin-top:4px">Push through, land on next string</div>' +
          '</button>' +
          '<button class="stroke-btn" data-stroke="free" style="flex:1;background:rgba(232,160,32,0.1);border:2px solid #e8a020;border-radius:10px;padding:18px 12px;cursor:pointer;text-align:center;transition:all 0.2s">' +
            '<div style="font-size:1.4rem;margin-bottom:4px">🪶</div>' +
            '<div style="font-family:Cinzel,serif;font-size:0.78rem;color:#e8a020;font-weight:700">Free Stroke</div>' +
            '<div style="font-size:0.68rem;color:var(--dim);margin-top:4px">Pluck and lift into the air</div>' +
          '</button>' +
        '</div>';

        // Visual meter
        html += '<div class="stroke-meter" style="max-width:520px;margin:0 auto 16px;background:var(--card);border:1px solid #3a2a1a;border-radius:8px;padding:14px;text-align:center;min-height:64px;display:flex;flex-direction:column;align-items:center;justify-content:center">' +
          '<div class="meter-label" style="font-size:0.72rem;color:var(--dim);margin-bottom:6px">Tap a button above to hear the difference</div>' +
          '<div class="meter-bars" style="display:flex;gap:3px;height:20px;align-items:flex-end"></div>' +
        '</div>';

        // Fretting guidance
        html += '<div style="max-width:520px;margin:0 auto 14px;background:rgba(212,175,105,0.06);border-left:3px solid var(--gold);border-radius:0 8px 8px 0;padding:12px 16px">' +
          '<div style="font-family:Cinzel,serif;font-size:0.76rem;color:var(--gold);margin-bottom:6px">Now Try It on Your Guitar</div>' +
          '<div style="font-size:0.74rem;color:var(--text);line-height:1.6">' +
            '<p style="margin:0 0 6px"><strong>1.</strong> Play an open string with a rest stroke — push through, land softly on the next string.</p>' +
            '<p style="margin:0 0 6px"><strong>2.</strong> Try a free stroke — pluck and let your finger float away.</p>' +
            '<p style="margin:0"><strong>3.</strong> Now press just behind fret 1 on any string. Listen for a clean note. If it buzzes, move closer to the fret wire and arch your finger. You need less pressure than you think.</p>' +
          '</div>' +
        '</div>';

        html += '<div style="display:flex;justify-content:center;padding:10px 16px;max-width:700px;margin:0 auto">' +
          '<button class="fs-continue" style="background:var(--gold);border:none;color:var(--bg);padding:9px 28px;border-radius:6px;cursor:pointer;font-family:DM Sans,sans-serif;font-size:0.8rem;font-weight:700;transition:all 0.2s">Continue ▸</button>' +
        '</div></div>';

        container.innerHTML = html;

        function animateMeter(stroke) {
          var bars = container.querySelector('.meter-bars');
          var label = container.querySelector('.meter-label');
          bars.innerHTML = '';

          if (stroke === 'rest') {
            label.innerHTML = '<span style="color:var(--gold);font-weight:600">Warm · Full · Grounded</span>';
          } else {
            label.innerHTML = '<span style="color:#e8a020;font-weight:600">Light · Open · Airy</span>';
          }

          var count = 16;
          for (var i = 0; i < count; i++) {
            var bar = document.createElement('div');
            bar.style.width = '6px';
            bar.style.borderRadius = '2px';
            bar.style.transition = 'all 0.1s';
            bar.style.opacity = '0';
            bars.appendChild(bar);
          }

          var barEls = bars.querySelectorAll('div');
          for (var j = 0; j < barEls.length; j++) {
            (function(idx, el) {
              setTimeout(function() {
                var h, color;
                if (stroke === 'rest') {
                  h = 8 + Math.sin(idx * 0.4) * 6 + Math.random() * 6;
                  color = '#d4af69';
                } else {
                  h = 4 + Math.sin(idx * 0.6) * 3 + Math.random() * 4;
                  color = '#e8a020';
                }
                el.style.height = Math.max(2, h) + 'px';
                el.style.background = color;
                el.style.opacity = '0.9';
                setTimeout(function() { el.style.opacity = '0.3'; }, 600);
              }, idx * 40);
            })(j, barEls[j]);
          }
        }

        var sButtons = container.querySelectorAll('.stroke-btn');
        for (var s = 0; s < sButtons.length; s++) {
          sButtons[s].addEventListener('click', function() {
            var stroke = this.dataset.stroke;
            if (stroke === 'rest') {
              _l1_playTone(196, 'triangle', 1.5, 0.14);
            } else {
              _l1_playTone(247, 'sine', 1.2, 0.12);
            }
            animateMeter(stroke);
          });
        }

        container.querySelector('.fs-continue').addEventListener('click', function() {
          advance();
        });
      }
    },

    // ─── 13. FRETTING POSITION EXPLANATION ───
    {
      type: 'speak',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>One note is a sound. Two notes are the beginning of music — because now there is movement.</p><p>Here is the core skill: <strong>fretting</strong>. Press a string down just behind the fret wire with the tip of your finger. Not on top of the fret. Not far behind it. <em>Just behind it.</em></p><p>The fret wire is your target. Your fingertip is the tool. The sweet spot is within 2mm of the wire.</p>'
    },

    // ─── 14. ASK: WHERE TO PRESS ───
    {
      type: 'ask',
      concept: 'fretting-position',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>Where should your finger press the string for the cleanest note?</p>',
      choices: [
        {
          label: 'Just behind the fret wire, using the fingertip',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Right. Behind the fret wire with the fingertip arched. Too far back and it buzzes. On top and it mutes. Just behind is the sweet spot.</p>'
          }
        },
        { label: 'Right on top of the fret wire', correct: false },
        { label: 'In the middle of the fret space', correct: false },
        { label: 'As far from the fret wire as possible', correct: false }
      ],
      reexplain: [
        {
          char: 'images/character-face/Encouraging.png',
          charLabel: 'Guide',
          text: '<p>Picture the fret wire as a tiny wall. Your finger presses the string right next to that wall — not on top. The closer to the wire, the cleaner the note rings.</p>'
        }
      ]
    },

    // ─── 15. INTERACTIVE: MOVING BETWEEN NOTES ───
    {
      type: 'action',
      render: function(container, advance) {
        // G string fret data
        var frets = [
          { fret: 0, note: 'G',  freq: 196.00, finger: 0 },
          { fret: 1, note: 'G♯', freq: 207.65, finger: 1 },
          { fret: 2, note: 'A',  freq: 220.00, finger: 2 },
          { fret: 3, note: 'A♯', freq: 233.08, finger: 3 },
          { fret: 4, note: 'B',  freq: 246.94, finger: 4 }
        ];

        var seq1 = [0, 2, 0];
        var seq2 = [0, 1, 2, 3, 4, 3, 2, 1, 0];

        var html = '<div class="teach-scene-wrap">' +
          '<div class="teach-scene">' +
            '<div class="teach-char-wrap">' +
              '<img src="images/character-face/Encouraging.png" class="teach-char-img" />' +
              '<div class="teach-char-label">Guide</div>' +
            '</div>' +
            '<div class="teach-bubble">' +
              '<div class="teach-tail"></div>' +
              '<div class="teach-text"><p>Let us move between notes on the <strong>G string</strong>. Press play and watch the indicator move across the fretboard. Then try it on your own guitar.</p></div>' +
            '</div>' +
          '</div>';

        // Tab notation
        html += '<div style="max-width:520px;margin:14px auto">' +
          '<div style="font-family:Cinzel,serif;font-size:0.78rem;color:var(--gold);margin-bottom:8px;text-align:center">Exercise 1: Open → Fret 2 → Open</div>' +
          '<div style="font-family:JetBrains Mono,monospace;font-size:0.85rem;color:var(--text);background:rgba(0,0,0,0.2);border:1px solid #3a2a1a;border-radius:8px;padding:12px;text-align:center;line-height:1.8">' +
            'G ||--- 0 --- 2 --- 0 ---||' +
          '</div>' +
        '</div>';

        // Fretboard visualization
        html += '<div class="fret-viz" style="max-width:520px;margin:0 auto 14px">' +
          '<div style="display:flex;align-items:flex-end;justify-content:center;gap:0;position:relative;padding:10px 0">';

        // Open string position
        html += '<div class="fret-cell" data-fret="0" style="flex:1;text-align:center;transition:all 0.3s;padding:10px 4px;border-radius:6px;cursor:pointer">' +
          '<div class="fret-num" style="font-size:0.62rem;color:var(--dim);margin-bottom:4px">Open</div>' +
          '<div class="fret-circle" style="width:32px;height:32px;border-radius:50%;border:2px solid #3a2a1a;display:flex;align-items:center;justify-content:center;margin:0 auto;font-family:JetBrains Mono,monospace;font-size:0.72rem;color:var(--dim);transition:all 0.3s">G</div>' +
        '</div>';

        // Nut separator
        html += '<div style="width:3px;height:40px;background:var(--gold);opacity:0.3;margin:0 2px"></div>';

        for (var i = 1; i <= 4; i++) {
          html += '<div class="fret-cell" data-fret="' + i + '" style="flex:1;text-align:center;transition:all 0.3s;padding:10px 4px;border-radius:6px;cursor:pointer">' +
            '<div class="fret-num" style="font-size:0.62rem;color:var(--dim);margin-bottom:4px">Fret ' + i + '</div>' +
            '<div class="fret-circle" style="width:32px;height:32px;border-radius:50%;border:2px solid #3a2a1a;display:flex;align-items:center;justify-content:center;margin:0 auto;font-family:JetBrains Mono,monospace;font-size:0.72rem;color:var(--dim);transition:all 0.3s">' + frets[i].note + '</div>' +
          '</div>';
        }

        html += '</div></div>';

        // Play buttons
        html += '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:14px">' +
          '<button class="play-seq" data-seq="1" style="background:var(--gold);border:none;color:var(--bg);padding:8px 20px;border-radius:6px;cursor:pointer;font-family:DM Sans,sans-serif;font-size:0.76rem;font-weight:700;transition:all 0.2s">▶ Play Exercise 1</button>' +
          '<button class="play-seq" data-seq="2" style="background:rgba(212,175,105,0.15);border:1px solid var(--gold);color:var(--gold);padding:8px 20px;border-radius:6px;cursor:pointer;font-family:DM Sans,sans-serif;font-size:0.76rem;font-weight:600;transition:all 0.2s">▶ Walk Up &amp; Down (0-1-2-3-4-3-2-1-0)</button>' +
        '</div>';

        // Guidance
        html += '<div style="max-width:520px;margin:0 auto 14px;background:rgba(212,175,105,0.06);border-left:3px solid var(--gold);border-radius:0 8px 8px 0;padding:12px 16px">' +
          '<div style="font-size:0.74rem;color:var(--text);line-height:1.6">' +
            '<p style="margin:0 0 6px"><strong>On your guitar:</strong> Play the G string open. Hear it ring clear.</p>' +
            '<p style="margin:0 0 6px">Press fret 2 with your <strong>middle finger</strong> — just behind the wire. Play. Listen to the pitch rise.</p>' +
            '<p style="margin:0">Lift off and play open again. Feel the return home. Now walk: 0, 1, 2, 3, 4 using fingers 1-2-3-4. Then walk back down.</p>' +
          '</div>' +
        '</div>';

        html += '<div style="display:flex;justify-content:center;padding:10px 16px;max-width:700px;margin:0 auto">' +
          '<button class="mn-continue" style="background:var(--gold);border:none;color:var(--bg);padding:9px 28px;border-radius:6px;cursor:pointer;font-family:DM Sans,sans-serif;font-size:0.8rem;font-weight:700;transition:all 0.2s">Continue ▸</button>' +
        '</div></div>';

        container.innerHTML = html;

        var playing = false;

        function highlightFret(fretNum) {
          var cells = container.querySelectorAll('.fret-cell');
          for (var c = 0; c < cells.length; c++) {
            var circle = cells[c].querySelector('.fret-circle');
            cells[c].style.background = 'transparent';
            circle.style.borderColor = '#3a2a1a';
            circle.style.color = 'var(--dim)';
            circle.style.transform = 'scale(1)';
            circle.style.boxShadow = 'none';
          }
          var active = container.querySelector('.fret-cell[data-fret="' + fretNum + '"]');
          if (active) {
            var ac = active.querySelector('.fret-circle');
            active.style.background = 'rgba(212,175,105,0.15)';
            ac.style.borderColor = 'var(--gold)';
            ac.style.color = 'var(--gold)';
            ac.style.transform = 'scale(1.2)';
            ac.style.boxShadow = '0 0 12px rgba(212,175,105,0.5)';
          }
        }

        function clearHighlight() {
          var cells = container.querySelectorAll('.fret-cell');
          for (var c = 0; c < cells.length; c++) {
            var circle = cells[c].querySelector('.fret-circle');
            cells[c].style.background = 'transparent';
            circle.style.borderColor = '#3a2a1a';
            circle.style.color = 'var(--dim)';
            circle.style.transform = 'scale(1)';
            circle.style.boxShadow = 'none';
          }
        }

        function playSequence(seq, interval) {
          if (playing) return;
          playing = true;
          for (var i = 0; i < seq.length; i++) {
            (function(idx, fretIdx) {
              setTimeout(function() {
                _l1_playTone(frets[fretIdx].freq, 'triangle', interval / 1000 * 0.8, 0.1);
                highlightFret(fretIdx);
                if (idx === seq.length - 1) {
                  setTimeout(function() {
                    playing = false;
                    setTimeout(clearHighlight, 500);
                  }, interval);
                }
              }, idx * interval);
            })(i, seq[i]);
          }
        }

        var pButtons = container.querySelectorAll('.play-seq');
        for (var p = 0; p < pButtons.length; p++) {
          pButtons[p].addEventListener('click', function() {
            var seq = this.dataset.seq === '1' ? seq1 : seq2;
            var interval = this.dataset.seq === '1' ? 500 : 380;
            playSequence(seq, interval);
          });
        }

        // Click fret cells to play individual notes
        var fCells = container.querySelectorAll('.fret-cell');
        for (var fc = 0; fc < fCells.length; fc++) {
          fCells[fc].addEventListener('click', function() {
            var fretNum = parseInt(this.dataset.fret);
            _l1_playTone(frets[fretNum].freq, 'triangle', 0.8, 0.1);
            highlightFret(fretNum);
            setTimeout(clearHighlight, 1200);
          });
        }

        container.querySelector('.mn-continue').addEventListener('click', function() {
          advance();
        });
      }
    },

    // ─── 16. E MAJOR CHORD INTRO ───
    {
      type: 'speak',
      char: 'images/character-face/Encouraging.png',
      charLabel: 'Guide',
      text: '<p>You have played single notes. Now we stack notes together. This is your first chord: <strong>E major.</strong></p><p>A chord is several notes played at the same time. E major uses three fingers on three strings, with three strings left open. It sounds big, full, and is used in thousands of songs.</p><p style="font-family:var(--mono);color:var(--gold);font-size:0.82rem;line-height:1.8;text-align:center;margin:12px 0;padding:10px;background:rgba(0,0,0,0.14);border-radius:6px">e|---0--- (open)<br />B|---0--- (open)<br />G|---1--- finger 1<br />D|---2--- finger 2<br />A|---2--- finger 3<br />E|---0--- (open)</p><p>Finger 1 goes on fret 1 of the G string. Fingers 2 and 3 go on fret 2 of the D and A strings. Strum all six strings.</p>'
    },

    // ─── 17. ASK: OPEN STRINGS IN E MAJOR ───
    {
      type: 'ask',
      concept: 'e-major-shape',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>In the E major chord, how many strings are played open (no finger)?</p>',
      choices: [
        {
          label: 'Three — the low E, B, and high e strings',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Yes. Three open strings and three fretted ones. That is what makes E major sound so full — it rings across the whole guitar.</p>'
          }
        },
        { label: 'One — just the low E', correct: false },
        { label: 'None — all strings are fretted', correct: false },
        { label: 'Six — all strings are open', correct: false }
      ],
      reexplain: [
        {
          char: 'images/character-face/Encouraging.png',
          charLabel: 'Guide',
          text: '<p>Look at the diagram again. The 0s in the tab mean open — no finger. Count them: low E is 0, B is 0, high e is 0. That is three open strings ringing free.</p>'
        }
      ]
    },

    // ─── 18. INTERACTIVE: E MAJOR CHORD ───
    {
      type: 'action',
      render: function(container, advance) {
        // String data: high e to low E (display order)
        var strings = [
          { name: 'e', label: 'High E', fret: 0, finger: 0, freq: 329.63, open: true },
          { name: 'B', label: 'B',      fret: 0, finger: 0, freq: 246.94, open: true },
          { name: 'G', label: 'G',      fret: 1, finger: 1, freq: 207.65, open: false },
          { name: 'D', label: 'D',      fret: 2, finger: 2, freq: 164.81, open: false },
          { name: 'A', label: 'A',      fret: 2, finger: 3, freq: 123.47, open: false },
          { name: 'E', label: 'Low E',  fret: 0, finger: 0, freq: 82.41,  open: true }
        ];

        var html = '<div class="teach-scene-wrap">' +
          '<div class="teach-scene">' +
            '<div class="teach-char-wrap">' +
              '<img src="images/character-face/Encouraging.png" class="teach-char-img" />' +
              '<div class="teach-char-label">Guide</div>' +
            '</div>' +
            '<div class="teach-bubble">' +
              '<div class="teach-tail"></div>' +
              '<div class="teach-text"><p>This is the E major chord diagram. <strong>Tap any string</strong> to hear its note. When you are ready, press <strong>Strum All</strong> to hear the complete chord.</p></div>' +
            '</div>' +
          '</div>';

        // Chord diagram card
        html += '<div style="max-width:420px;margin:14px auto;background:var(--card);border:1px solid #3a2a1a;border-radius:12px;padding:20px">';
        html += '<div style="font-family:Cinzel,serif;font-size:0.78rem;color:var(--gold);text-align:center;margin-bottom:12px">E Major Chord</div>';

        // Fret number header
        html += '<div style="display:flex;align-items:center;margin-bottom:4px">' +
          '<div style="width:40px"></div>' +
          '<div style="flex:1;text-align:center;font-size:0.6rem;color:var(--dim)">open</div>' +
          '<div style="flex:1;text-align:center;font-size:0.6rem;color:var(--gold)">fret 1</div>' +
          '<div style="flex:1;text-align:center;font-size:0.6rem;color:var(--gold)">fret 2</div>' +
        '</div>';

        // String rows
        html += '<div style="display:flex;flex-direction:column;gap:0">';

        for (var i = 0; i < strings.length; i++) {
          var s = strings[i];

          html += '<div style="display:flex;align-items:center;height:36px">';

          // String label
          html += '<div style="width:40px;font-family:JetBrains Mono,monospace;font-size:0.72rem;color:var(--text);font-weight:700;text-align:right;padding-right:8px">' + s.name + '|</div>';

          // Open position
          if (s.open) {
            html += '<div class="chord-string" data-idx="' + i + '" style="flex:1;display:flex;align-items:center;justify-content:center;cursor:pointer;height:100%;transition:all 0.2s">' +
              '<div class="chord-dot" style="width:24px;height:24px;border-radius:50%;border:2px solid var(--gold);display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:var(--gold);background:transparent;transition:all 0.2s">○</div>' +
            '</div>';
          } else {
            html += '<div style="flex:1;display:flex;align-items:center;justify-content:center;height:100%">' +
              '<div style="width:80%;height:1px;background:rgba(58,42,26,0.5)"></div>' +
            '</div>';
          }

          // Fret 1 position
          if (s.fret === 1) {
            html += '<div class="chord-string" data-idx="' + i + '" style="flex:1;display:flex;align-items:center;justify-content:center;cursor:pointer;height:100%;transition:all 0.2s">' +
              '<div class="chord-dot" style="width:26px;height:26px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;font-size:0.62rem;color:var(--bg);font-weight:700;transition:all 0.2s">' + s.finger + '</div>' +
            '</div>';
          } else {
            html += '<div style="flex:1;display:flex;align-items:center;justify-content:center;height:100%">' +
              '<div style="width:80%;height:1px;background:rgba(58,42,26,0.5)"></div>' +
            '</div>';
          }

          // Fret 2 position
          if (s.fret === 2) {
            html += '<div class="chord-string" data-idx="' + i + '" style="flex:1;display:flex;align-items:center;justify-content:center;cursor:pointer;height:100%;transition:all 0.2s">' +
              '<div class="chord-dot" style="width:26px;height:26px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;font-size:0.62rem;color:var(--bg);font-weight:700;transition:all 0.2s">' + s.finger + '</div>' +
            '</div>';
          } else {
            html += '<div style="flex:1;display:flex;align-items:center;justify-content:center;height:100%">' +
              '<div style="width:80%;height:1px;background:rgba(58,42,26,0.5)"></div>' +
            '</div>';
          }

          html += '</div>'; // end string row
        }

        html += '</div>'; // end string rows

        // Note label
        html += '<div class="chord-note-label" style="text-align:center;margin-top:12px;font-size:0.72rem;color:var(--dim);min-height:18px">Tap a string to hear its note</div>';

        html += '</div>'; // end chord card

        // Strum button
        html += '<div style="text-align:center;margin:14px 0">' +
          '<button class="strum-btn" style="background:linear-gradient(135deg,#d4af69,#e8a020);border:none;color:#0d0b08;padding:12px 32px;border-radius:8px;cursor:pointer;font-family:Cinzel,serif;font-size:0.85rem;font-weight:700;letter-spacing:0.03em;box-shadow:0 4px 14px rgba(212,175,105,0.3);transition:all 0.2s">🎸 Strum All</button>' +
        '</div>';

        // Guide text
        html += '<div style="max-width:420px;margin:0 auto 14px;background:rgba(212,175,105,0.06);border-left:3px solid var(--gold);border-radius:0 8px 8px 0;padding:12px 16px">' +
          '<div style="font-family:Cinzel,serif;font-size:0.76rem;color:var(--gold);margin-bottom:6px">Place the Chord on Your Guitar</div>' +
          '<div style="font-size:0.74rem;color:var(--text);line-height:1.6">' +
            '<p style="margin:0 0 6px"><strong>Finger 1</strong> — press fret 1 on the G string, just behind the wire.</p>' +
            '<p style="margin:0 0 6px"><strong>Finger 2</strong> — press fret 2 on the D string.</p>' +
            '<p style="margin:0 0 6px"><strong>Finger 3</strong> — press fret 2 on the A string.</p>' +
            '<p style="margin:0">Arch your fingers so the open strings ring free. Strum all six strings. If any note buzzes, move closer to the fret wire.</p>' +
          '</div>' +
        '</div>';

        html += '<div style="display:flex;justify-content:center;padding:10px 16px;max-width:700px;margin:0 auto">' +
          '<button class="em-continue" style="background:var(--gold);border:none;color:var(--bg);padding:9px 28px;border-radius:6px;cursor:pointer;font-family:DM Sans,sans-serif;font-size:0.8rem;font-weight:700;transition:all 0.2s">Continue ▸</button>' +
        '</div></div>';

        container.innerHTML = html;

        // Click string handlers
        var chordStrings = container.querySelectorAll('.chord-string');
        for (var cs = 0; cs < chordStrings.length; cs++) {
          chordStrings[cs].addEventListener('click', function() {
            var idx = parseInt(this.dataset.idx);
            var s = strings[idx];
            _l1_playTone(s.freq, 'triangle', 1.0, 0.1);

            var dot = this.querySelector('.chord-dot');
            dot.style.transform = 'scale(1.35)';
            dot.style.boxShadow = '0 0 14px rgba(212,175,105,0.6)';
            setTimeout(function(d) { return function() {
              d.style.transform = 'scale(1)';
              d.style.boxShadow = 'none';
            }; }(dot), 600);

            var label = container.querySelector('.chord-note-label');
            label.innerHTML = '<span style="color:var(--gold)">' + s.label + ' — ' + (s.open ? 'Open string' : 'Fret ' + s.fret + ', finger ' + s.finger) + '</span>';
          });
        }

        // Strum handler
        container.querySelector('.strum-btn').addEventListener('click', function() {
          var self = this;
          self.disabled = true;
          self.style.opacity = '0.6';

          var strumOrder = [5, 4, 3, 2, 1, 0]; // low E → high e
          var label = container.querySelector('.chord-note-label');
          label.innerHTML = '<span style="color:var(--gold);font-weight:600">Strumming...</span>';

          for (var i = 0; i < strumOrder.length; i++) {
            (function(stringIdx, idx) {
              setTimeout(function() {
                _l1_playTone(strings[stringIdx].freq, 'triangle', 1.2, 0.08);

                var dotEl = container.querySelector('.chord-string[data-idx="' + stringIdx + '"] .chord-dot');
                if (dotEl) {
                  dotEl.style.transform = 'scale(1.3)';
                  dotEl.style.boxShadow = '0 0 10px rgba(212,175,105,0.5)';
                  setTimeout(function() {
                    dotEl.style.transform = 'scale(1)';
                    dotEl.style.boxShadow = 'none';
                  }, 400);
                }
              }, idx * 60);
            })(strumOrder[i], i);
          }

          setTimeout(function() {
            label.innerHTML = '<span style="color:var(--gold)">E Major — all six strings ringing</span>';
            self.disabled = false;
            self.style.opacity = '1';
          }, strumOrder.length * 60 + 500);
        });

        container.querySelector('.em-continue').addEventListener('click', function() {
          advance();
        });
      }
    },

    // ─── 19. FOUNDATION RECAP ───
    {
      type: 'ask',
      concept: 'foundation-recap',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>Quick recap. You have met the learning barriers, the language idea, the 12-note map, the guitar layout, clean single notes, movement, and E major.</p><p>One idea protects everything else: if a lesson suddenly goes foggy, what should you check <em>first</em>?</p>',
      choices: [
        {
          label: 'A skipped barrier — no physical example, too big a jump, or an unclear word',
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
          text: '<p>Let us take the pressure off. Fog in learning always has a cause. The three common barriers are: no physical thing to look at, a step that is too large, or one unclear word. Find the barrier, clear it, and the path opens again.</p>'
        }
      ]
    },

    // ─── 20. CLOSING ───
    {
      type: 'speak',
      char: 'images/character-face/Encouraging.png',
      charLabel: 'Guide',
      text: '<p>What comes next is <strong>Doing</strong>. Foundation gave you the map — Doing starts training the movement.</p><p>Your best practice shape is simple: 20 minutes a day beats two hours once a week. Start with two minutes of body scan, a few minutes of clean open strings, one focused drill, and a little time playing anything that makes you want to come back tomorrow.</p><p>Keep listening. Keep clearing words. Keep making the step small enough that your hands can succeed. Guitar rewards patience in a very literal way — what you repeat becomes easier to repeat.</p>'
    },

    // ─── 21. END ───
    {
      type: 'end',
      char: 'images/character-face/Celebratory.png',
      buttonLabel: 'Continue',
      text: '<p><strong>Foundation complete.</strong></p><p>You now know how to approach learning, how music works as a language, how the 12 notes move across the fretboard, how to hold the instrument without clamping, how to make clean first sounds, how to move between notes, and how to form E major.</p><p>This is the beginning of everything. Not because you know everything now — but because you know how to keep going.</p>'
    }
  ]
};

if(typeof window !== 'undefined') window.LESSON_1_FOUNDATION = LESSON_1_FOUNDATION;
if(typeof module !== 'undefined') module.exports = LESSON_1_FOUNDATION;
