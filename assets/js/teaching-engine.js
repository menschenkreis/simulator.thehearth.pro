// ═══════════════════════════════════════════════════════
// TEACHING ENGINE — Interactive Character-Driven Lessons
// ═══════════════════════════════════════════════════════
// The little guitar man talks to you through speech bubbles.
// He asks questions, you answer, he adapts.
// Wrong answers trigger a "skipped gradient" re-explanation.

(function(){
'use strict';

// ── Character Assets ──
const CHAR = {
  neutral:    'images/character-neutral.png',
  encouraging:'images/character-full/Encouraging.png',
  thinking:   'images/character-full/Thinking.png',
  celebratory:'images/character-full/Celebratory.png',
  // Symbol variants
  question:   'images/character-symbols/Thinking Question Mark.png',
  lightbulb:  'images/character-symbols/Encouraging Face Lightbulb.png',
  exclamation:'images/character-symbols/Think Exclamation Mark.png',
  sparks:     'images/character-symbols/Celebrator with sparks.png'
};

// ── Conversation Step Types ──
// speak    = character says something, auto-advance
// ask      = character asks a question, player picks an answer
// cards    = show side-by-side info cards
// video    = embedded video placeholder
// action   = custom render function
// end      = lesson complete

// ── Gradient Failsafe ──
// If a student picks a wrong answer, we don't just say "wrong."
// We re-explain the concept in a different way, then loop back.
// This prevents "skipping the gradient" — the #2 barrier to learning.

function createTeachingEngine(containerEl, opts){
  const container = containerEl;
  var _teachContinueShown = false;
  var currentLesson = null;
  const state = {
    stepIdx: 0,
    history: [],      // stack of step indices for back navigation
    wrongCount: 0,    // consecutive wrong answers on current concept
    scores: {},       // per-concept right/wrong tracking
    completed: false
  };

  // ── Render a single step ──
  function renderStep(step, lesson){
    if(!step) return;

    switch(step.type){
      case 'speak':   renderSpeak(step, lesson); break;
      case 'ask':     renderAsk(step, lesson); break;
      case 'cards':   renderCards(step, lesson); break;
      case 'video':   renderVideo(step, lesson); break;
      case 'action':  step.render(container, advance); break;
      case 'end':     renderEnd(step, lesson); break;
      default:        renderSpeak(step, lesson);
    }
  }

  // ── SPEAK: Character says something ──
  function renderSpeak(step, lesson){
    const charImg = step.char || CHAR.neutral;
    const charLabel = step.charLabel || '';
    const isTyping = step.typing !== false;

    let html = buildCharArea(charImg, charLabel, step.text, isTyping, step.charSize);

    // Buttons if defined
    if(step.buttons){
      html += '<div class="teach-buttons">';
      step.buttons.forEach(b => {
        html += '<button class="teach-btn" data-action="'+(b.action||'advance')+'">'+b.label+'</button>';
      });
      html += '</div>';
    }

    // Tap-to-continue prompt (shows after typewriter finishes)
    if(!_teachContinueShown) html += '<div class="teach-continue" style="text-align:center;margin-top:12px;opacity:0;transition:opacity 0.4s">'+
      '<span style="font-size:0.7rem;color:var(--dim);letter-spacing:0.05em">tap anywhere to continue ▸</span></div>';

    container.innerHTML = html;
    bindButtons(step, lesson);
    _teachContinueShown = true;

    // Show continue prompt after typewriter finishes, then click to advance
    var continueEl = container.querySelector('.teach-continue');
    var typingDone = false;

    function showContinue(){
      typingDone = true;
      if(continueEl) continueEl.style.opacity = '1';
    }

    if(isTyping){
      typewriterEffect(showContinue);
    } else {
      showContinue();
    }

    // Click anywhere to advance (but not on buttons)
    function clickAdvance(e){
      if(!typingDone) return;
      if(e.target.closest('.teach-btn') || e.target.closest('.teach-choice')) return;
      container.removeEventListener('click', clickAdvance);
      advance(lesson);
    }
    // Delay binding to avoid accidental advance from the click that opened this step
    setTimeout(function(){
      container.addEventListener('click', clickAdvance);
    }, 300);
  }

  // ── ASK: Character asks, player answers ──
  function renderAsk(step, lesson){
    const charImg = step.char || CHAR.question;
    const charLabel = step.charLabel || '';

    let html = buildCharArea(charImg, charLabel, step.text, true, step.charSize);

    html += '<div class="teach-choices">';
    step.choices.forEach((c, i) => {
      const cls = c.correct ? 'teach-choice correct' : 'teach-choice wrong';
      html += '<button class="'+cls+'" data-idx="'+i+'">'+c.label+'</button>';
    });
    html += '</div>';

    container.innerHTML = html;
    typewriterEffect();

    // Bind choice buttons
    container.querySelectorAll('.teach-choice').forEach(btn => {
      btn.addEventListener('click', function(){
        const idx = parseInt(this.dataset.idx);
        const choice = step.choices[idx];

        // Track scoring
        const concept = step.concept || 'general';
        if(!state.scores[concept]) state.scores[concept] = {right:0, wrong:0};

        if(choice.correct){
          state.scores[concept].right++;
          state.wrongCount = 0;

          // Flash green
          this.style.background = '#2ecc71';
          this.style.borderColor = '#2ecc71';
          this.style.color = '#fff';

          // Disable all choices
          container.querySelectorAll('.teach-choice').forEach(b => b.style.pointerEvents='none');

          setTimeout(function(){
            if(choice.response){
              // Show response then advance
              showFollowUp(choice.response, step, lesson);
            } else {
              advance(lesson);
            }
          }, 600);
        } else {
          state.scores[concept].wrong++;
          state.wrongCount++;

          // Flash red
          this.style.background = '#e74c3c';
          this.style.borderColor = '#e74c3c';
          this.style.color = '#fff';
          this.style.opacity = '0.6';

          // ── GRADIENT FAILSAFE ──
          // After wrong answer: re-explain, then loop back
          setTimeout(function(){
            showGradientFailsafe(step, lesson);
          }, 800);
        }
      });
    });
  }

  // ── FOLLOW-UP: Show response text after correct answer, then advance ──
  function showFollowUp(response, step, lesson){
    var html = buildCharArea(response.char || CHAR.lightbulb, response.charLabel || '', response.text, true, response.charSize);
    html += '<div style="text-align:center;margin-top:12px"><span style="font-size:0.7rem;color:var(--dim);letter-spacing:0.05em">tap to continue ▸</span></div>';
    container.innerHTML = html;
    var typingDone = false;
    typewriterEffect(function(){ typingDone = true; });
    setTimeout(function(){
      container.addEventListener('click', function handler(e){
        if(!typingDone) return;
        if(e.target.closest('.teach-btn')) return;
        container.removeEventListener('click', handler);
        advance(lesson);
      });
    }, 300);
  }

  // ── GRADIENT FAILSAFE ──
  // Re-explain the concept in a different way, then re-ask
  function showGradientFailsafe(originalStep, lesson){
    const reexplain = originalStep.reexplain || [
      {
        char: CHAR.encouraging,
        text: "No worries! Let me explain that differently."
      },
      {
        char: CHAR.lightbulb,
        text: originalStep.failHint || "Think about it this way: " + originalStep.text.replace(/<[^>]+>/g, '').substring(0, 120) + "..."
      }
    ];

    // Build a mini conversation that loops back
    let reIdx = 0;
    function showNextReexplain(){
      if(reIdx >= reexplain.length){
        // Done re-explaining, go back to the question
        renderAsk(originalStep, lesson);
        return;
      }
      const r = reexplain[reIdx];
      reIdx++;
      const html = buildCharArea(r.char || CHAR.encouraging, r.charLabel || '', r.text, true, r.charSize);
      container.innerHTML = html;
      typewriterEffect();

      // Auto-advance after 3 seconds, or click
      const timer = setTimeout(function(){
        showNextReexplain();
      }, 3500);

      container.addEventListener('click', function handler(){
        clearTimeout(timer);
        container.removeEventListener('click', handler);
        showNextReexplain();
      });
    }
    showNextReexplain();
  }

  // ── CARDS: Side-by-side info cards ──
  function renderCards(step, lesson){
    const charImg = step.char || CHAR.neutral;
    const charLabel = step.charLabel || '';

    let html = buildCharArea(charImg, charLabel, step.text, true, step.charSize);

    html += '<div class="teach-cards" style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin:16px 0">';
    step.cards.forEach(card => {
      const icon = card.icon || '📖';
      html += '<div class="teach-card" style="flex:1 1 '+(100/step.cards.length - 2)+'%;min-width:140px;max-width:220px;background:var(--card);border:2px solid '+(card.color||'var(--gold)')+'40;border-radius:10px;padding:16px 12px;text-align:center;cursor:pointer;transition:all 0.2s" onclick="this.style.borderColor=\''+(card.color||'var(--gold)')+'\';this.style.transform=\'scale(1.03)\'">' +
        '<div style="font-size:2rem;margin-bottom:8px">'+icon+'</div>' +
        '<div style="font-family:Cinzel,serif;font-size:0.75rem;font-weight:700;color:'+(card.color||'var(--gold)')+';margin-bottom:6px">'+card.title+'</div>' +
        '<div style="font-size:0.7rem;color:var(--dim);line-height:1.4">'+card.desc+'</div>' +
      '</div>';
    });
    html += '</div>';

    // Continue button
    if(step.continueLabel){
      html += '<div style="text-align:center;margin-top:12px"><button class="teach-btn primary" data-action="advance">'+step.continueLabel+'</button></div>';
    }

    container.innerHTML = html;
    bindButtons(step, lesson);
    typewriterEffect();
  }

  // ── VIDEO: Embedded video placeholder ──
  function renderVideo(step, lesson){
    const charImg = step.char || CHAR.lightbulb;
    const charLabel = step.charLabel || '';

    let html = buildCharArea(charImg, charLabel, step.text, true, step.charSize);

    if(step.videoUrl){
      // Real embed
      html += '<div style="margin:16px 0;border-radius:10px;overflow:hidden;border:2px solid var(--gold)30">' +
        '<iframe width="100%" height="240" src="'+step.videoUrl+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="display:block"></iframe>' +
      '</div>';
    } else {
      // Placeholder
      html += '<div style="margin:16px 0;border-radius:10px;border:2px dashed var(--gold)40;background:var(--card);padding:32px 16px;text-align:center">' +
        '<div style="font-size:2.5rem;margin-bottom:8px">🎬</div>' +
        '<div style="font-family:Cinzel,serif;font-size:0.8rem;color:var(--gold);margin-bottom:4px">Video Coming Soon</div>' +
        '<div style="font-size:0.7rem;color:var(--dim)">'+(step.videoDesc || 'A visual demonstration will go here.')+'</div>' +
      '</div>';
    }

    html += '<div style="text-align:center"><button class="teach-btn primary" data-action="advance">Continue</button></div>';
    container.innerHTML = html;
    bindButtons(step, lesson);
    typewriterEffect();
  }

  // ── END: Lesson complete ──
  function renderEnd(step, lesson){
    const charImg = step.char || CHAR.sparks;
    const html = buildCharArea(charImg, '', step.text, true) +
      '<div style="text-align:center;margin-top:16px">' +
        '<button class="teach-btn primary" data-action="finish">'+(step.buttonLabel || 'Continue →')+'</button>' +
      '</div>';

    container.innerHTML = html;
    typewriterEffect();

    container.querySelectorAll('.teach-btn').forEach(btn => {
      btn.addEventListener('click', function(){
        state.completed = true;
        if(opts.onComplete) opts.onComplete(state.scores);
      });
    });
  }

  // ── Helpers ──
  function buildCharArea(charImg, charLabel, text, typing, size){
    var sz = size || 'normal';
    var imgClass = sz === 'big' ? 'teach-char-img teach-char-big' : 'teach-char-img';
    return '<div class="teach-scene-wrap">' +
      '<div class="teach-scene">' +
        '<div class="teach-char-wrap">' +
          '<img src="'+charImg+'" class="'+imgClass+'" />'+
          (charLabel ? '<div class="teach-char-label">'+charLabel+'</div>' : '') +
        '</div>' +
        '<div class="teach-bubble">' +
          '<div class="teach-tail"></div>' +
          '<div class="teach-text'+(typing ? ' typewrite' : '')+'">'+text+'</div>' +
        '</div>' +
      '</div>' +
      '<div class="teach-prev-wrap"><button class="teach-prev-btn" onclick="window._teachEngine&&window._teachEngine.back()">\u2190 Previous</button></div>' +
    '</div>';
  }

  function typewriterEffect(onDone){
    const el = container.querySelector('.teach-text.typewrite');
    if(!el){ if(onDone) onDone(); return; }
    const full = el.innerHTML;
    el.innerHTML = '';
    el.style.opacity = '1';
    let i = 0;
    let inTag = false;
    let buffer = '';
    function tick(){
      if(i < full.length){
        const ch = full[i];
        if(ch === '<') inTag = true;
        if(inTag){
          buffer += ch;
          if(ch === '>'){
            inTag = false;
            el.innerHTML += buffer;
            buffer = '';
          }
        } else {
          el.innerHTML += ch;
        }
        i++;
        setTimeout(tick, inTag ? 0 : 18);
      } else {
        if(onDone) onDone();
      }
    }
    tick();
  }

  function bindButtons(step, lesson){
    container.querySelectorAll('.teach-btn').forEach(btn => {
      btn.addEventListener('click', function(){
        const action = this.dataset.action;
        if(action === 'advance') advance(lesson);
        else if(action === 'back') back(lesson);
      });
    });
  }

  function advance(lesson){
    state.history.push(state.stepIdx);
    state.stepIdx++;
    if(state.stepIdx < lesson.steps.length){
      renderStep(lesson.steps[state.stepIdx], lesson);
    } else {
      renderEnd({text: lesson.completeText || '<p>Lesson complete!</p>', buttonLabel: 'Continue →'}, lesson);
    }
  }

  function back(lesson){
    if(state.history.length > 0){
      state.stepIdx = state.history.pop();
      renderStep(lesson.steps[state.stepIdx], lesson);
    }
  }

  // ── Back button ──
  function goBack(lesson){
    if(state.history.length === 0) return;
    state.stepIdx = state.history.pop();
    renderStep(lesson.steps[state.stepIdx], lesson);
  }

  // ── Public API ──
  return {
    start: function(lesson){
      currentLesson = lesson;
      state.stepIdx = 0;
      state.history = [];
      state.wrongCount = 0;
      state.scores = {};
      state.completed = false;
      renderStep(lesson.steps[0], lesson);
    },
    back: function(){ goBack(currentLesson); },
    getState: function(){ return Object.assign({}, state); },
    CHAR: CHAR
  };
}

// Export
window.TeachingEngine = createTeachingEngine;
window.TeachingCHAR = CHAR;

})();
