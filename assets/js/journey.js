// Journey Node - Central Spine Guided Lesson Path
// Multi-student 8-level lesson programme with review, feedback, tracking, and scalable lesson data.

(function(){
  const STORE = 'hearth-journey-v2';
  const ACTIVE = 'hearth-journey-active-student';

  const LEVELS = window.JOURNEY_LEVELS || [];
  const CONCEPT_BANK = window.JOURNEY_CONCEPT_BANK || {};
  const TASK_BANK = window.JOURNEY_TASK_BANK || {};
  const AUTHORED_LESSONS = window.JOURNEY_AUTHORED_LESSONS || {};

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function attr(v){ return esc(v); }
  function uid(){ return 's-' + Math.random().toString(36).slice(2,9) + '-' + Date.now().toString(36); }
  function today(){ return new Date().toISOString().slice(0,10); }
  function getLevel(num){ return LEVELS[Math.max(0, Math.min(LEVELS.length-1, (Number(num)||1)-1))]; }
  function rotate(list, n, count){
    const out=[]; if(!list || !list.length) return out;
    for(let i=0;i<count;i++) out.push(list[(n+i)%list.length]);
    return out;
  }

  function showPanel(panelId){
    const target = document.getElementById(panelId);
    if(!target) return null;
    document.querySelectorAll('.pnl').forEach(panel => panel.classList.remove('on'));
    target.classList.add('on');
    return target;
  }

  function getJourneyRoot(){
    return document.getElementById('journey-content') || document.getElementById('p-lesson');
  }

  function safePlaySfx(name){
    if(typeof window.playSfx === 'function') window.playSfx(name);
  }

  function blankStudent(name){
    const id = uid();
    const levels = {};
    LEVELS.forEach(l => levels[l.id] = { lessonsDone:0, unlocked:l.num===1, complete:false, lessonRecords:[], conceptRatings:{}, taskRatings:{}, notes:[] });
    return { id, name:name || 'My Journey', createdAt:new Date().toISOString(), currentLevel:1, activeLesson:null, levels };
  }

  function loadState(){
    let state;
    try { state = JSON.parse(localStorage.getItem(STORE) || 'null'); } catch(e){ state = null; }
    if(!state || !state.students || !state.students.length){
      const mine = blankStudent('My Journey');
      const jen = blankStudent('Jen');
      jen.currentLevel = 2;
      jen.levels.L1.lessonsDone = 8; jen.levels.L1.complete = true;
      jen.levels.L2.unlocked = true;
      jen.levels.L2.notes.push({ date:'2026-06-14', text:"L2 with Jen: reviewed last week, practised finger gymnastics with metronome, learned pentatonic scale pattern with metronome, learned chord embellishments and how they colour songs. Jen is close to my ability; I need to level up fast to stay ahead. Need to understand how scales relate to piano and what they mean for playing the instrument. Jen wants to learn to write a song. She didn\'t know C chord, so we are seeing the gaps." });
      state = { version:2, students:[mine, jen], activeStudentId:mine.id };
      saveState(state);
    }
    state.students.forEach(s => {
      if(!s.levels) s.levels = {};
      LEVELS.forEach(l => {
        if(!s.levels[l.id]) s.levels[l.id] = { lessonsDone:0, unlocked:l.num===1, complete:false, lessonRecords:[], conceptRatings:{}, taskRatings:{}, notes:[] };
        if(l.num === 1) s.levels[l.id].unlocked = true;
      });
    });
    if(!state.activeStudentId || !state.students.find(s=>s.id===state.activeStudentId)) state.activeStudentId = state.students[0].id;
    localStorage.setItem(ACTIVE, state.activeStudentId);
    return state;
  }
  function saveState(state){ localStorage.setItem(STORE, JSON.stringify(state)); }
  function activeStudent(state){ return state.students.find(s=>s.id===state.activeStudentId) || state.students[0]; }
  function saveStudent(student){
    const state = loadState();
    const idx = state.students.findIndex(s=>s.id===student.id);
    if(idx >= 0) state.students[idx] = student;
    saveState(state);
    // Sync to API
    syncStudentToAPI(student);
  }

  function syncStudentToAPI(student){
    if(!window.HearthAPI) return;
    // Upsert student
    fetch('https://thehearth.pro/api/?a=journey-students', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ name:student.name, current_level:student.currentLevel||1, notes:'' })
    }).then(r=>r.json()).then(res=>{
      if(!res.id) return;
      const sid = res.id;
      // Sync each level's progress
      LEVELS.forEach(l => {
        const ls = student.levels[l.id] || {};
        fetch('https://thehearth.pro/api/?a=journey-progress', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            student_id:sid, level_num:l.num,
            lessons_done:ls.lessonsDone||0,
            is_complete:ls.complete?1:0,
            is_unlocked:ls.unlocked?1:0,
            concept_ratings:JSON.stringify(ls.conceptRatings||{}),
            task_ratings:JSON.stringify(ls.taskRatings||{}),
            notes:JSON.stringify(ls.notes||[])
          })
        });
      });
      // Sync active lesson if exists
      if(student.activeLesson){
        fetch('https://thehearth.pro/api/?a=journey-records', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            student_id:sid, level_num:getLevel(student.currentLevel||1).num,
            lesson_num:student.activeLesson.lessonNum||1,
            status:student.activeLesson.status||'in-progress',
            block_notes:JSON.stringify(student.activeLesson.blockNotes||{}),
            feedback:student.activeLesson.feedback||'',
            teacher_notes:student.activeLesson.teacherNotes||''
          })
        });
      }
    }).catch(()=>{});
  }

  function buildLesson(student, levelNum, lessonNum){
    const level = getLevel(levelNum);
    const authored = AUTHORED_LESSONS[level.id] && AUTHORED_LESSONS[level.id][lessonNum - 1];
    if(authored){
      return {
        id: level.id + '-' + lessonNum,
        levelId: level.id,
        levelNum,
        lessonNum,
        title: authored.title || ('Lesson ' + lessonNum),
        minutes: authored.minutes || 60,
        summary: authored.summary || '',
        conceptNames: authored.conceptNames || [],
        taskNames: authored.taskNames || [],
        blocks: authored.blocks || []
      };
    }

    const concepts = CONCEPT_BANK[level.id] || CONCEPT_BANK.L1;
    const primaryConcept = concepts[(lessonNum-1) % concepts.length];
    const secondaryConcept = concepts[lessonNum % concepts.length];
    
    // Level-specific drill bank
    const LEVEL_DRILLS = {
      L1: [
        { title:'Alternate picking — open strings', category:'Picking', duration:'15 min', defaultBpm:60, instructions:'Down-up-down-up on each open string. Start on low E, move to A, then D, G, B, high E. One string at a time. Focus on even volume between down and up strokes.' },
        { title:'Rhythm pulse — D DU UDU', category:'Rhythm', duration:'15 min', defaultBpm:72, instructions:'Mute all strings with your fretting hand. Strum the D DU UDU pattern with a metronome. Count 1-and-2-and-3-and-4-and. Down on numbers, up on ands. Keep it steady.' },
        { title:'Chromatic walk — 1-2-3-4', category:'Fretting', duration:'15 min', defaultBpm:50, instructions:'Fret 1-2-3-4 on low E string. Then A. Then D, G, B, high E. One finger per fret. Press just behind the fret wire. If it buzzes, adjust finger position.' },
        { title:'Pentatonic shape 1 — slow clean reps', category:'Scales', duration:'15 min', defaultBpm:55, instructions:'Play the A minor pentatonic at fret 5: 5-8 on E, 5-7 on A, 5-7 on D, 5-7 on G, 5-7 on B, 5-8 on e. Ascending then descending. Pause between each note to check it rings clean.' },
        { title:'Open chord transitions — E to A', category:'Chords', duration:'15 min', defaultBpm:60, instructions:'Hold E major. Strum and let it ring. Then move to A major. Strum and let it ring. Back to E. Four strums per chord. Focus on clean transitions — no buzzing, no muted strings.' },
        { title:'Scale-chord mapping', category:'Theory', duration:'15 min', defaultBpm:60, instructions:'Play the A minor pentatonic. Then play an A minor chord. Notice which notes overlap. Now play the pentatonic over the chord — hear how they fit together.' },
        { title:'Song moment — pick + rhythm + chord', category:'Application', duration:'15 min', defaultBpm:72, instructions:'Choose one chord you know. Strum it with D DU UDU pattern. Add one melody note from the pentatonic. This is a song moment — a real piece of music.' },
        { title:'Practice ritual build', category:'Routine', duration:'15 min', defaultBpm:60, instructions:'Build a 20-minute routine: 2 min body scan, 3 min chromatic warm-up, 5 min today concept, 5 min drill, 5 min free play. Write it down.' }
      ]
    };
    
    const levelDrills = LEVEL_DRILLS[level.id];
    const drill = levelDrills ? levelDrills[(lessonNum-1) % levelDrills.length] : { title:'Clean repetition drill', category:'Technique', duration:'10 min', defaultBpm:60, instructions:'Choose one small movement and repeat it cleanly with a metronome.' };
    const warm = TASK_BANK.warmup[(lessonNum-1) % TASK_BANK.warmup.length];
    const music = TASK_BANK.music[(lessonNum-1) % TASK_BANK.music.length];
    const conceptTask = TASK_BANK.concept[(lessonNum-1) % TASK_BANK.concept.length];
    const review = TASK_BANK.review[(lessonNum-1) % TASK_BANK.review.length];

    return {
      id: level.id + '-' + lessonNum,
      levelId: level.id,
      levelNum,
      lessonNum,
      title: 'Lesson ' + lessonNum + ': ' + primaryConcept,
      minutes: 60,
      conceptNames: [primaryConcept, secondaryConcept],
      taskNames: [warm, conceptTask, drill.title, music, review],
      blocks: [
        { id:'review', min:8, phase:'REVIEW', source:'Journey Notes', title:'Review last contact', body:'Look at the previous lesson. What did we learn? What gap appeared? What should not be skipped today?', prompt:"Write the real notes here - e.g. \"didn\'t know C chord\", \"wants to write a song\", \"scale/piano connection unclear\"." },
        { id:'warmup', min:10, phase:'WARM-UP', source:'Practice', title:warm, body:'Wake the hands with a clean, small movement before adding new material.', prompt:'Tempo, cleanliness, body tension, and one correction.' },
        { id:'concept', min:12, phase:'CONCEPT', source:'Knowing/Foundation', title:primaryConcept, body:'Teach the idea plainly. Connect significance to mass: say it, draw it, find it on the guitar.', prompt:'What words were misunderstood? What physical thing did this map to?' },
        { id:'drill', min:15, phase:'DRILL', source:'Do/Practice', title:drill.title, body:(drill.instructions || drill.description || 'Practise slowly with a metronome.'), prompt:'BPM, pass condition, mistake pattern, next gradient.' },
        { id:'music', min:10, phase:'MUSIC APPLICATION', source:'Play/Create', title:music, body:'Turn the drill into music so it does not stay academic.', prompt:'Song, riff, chord progression, or writing idea used today.' },
        { id:'reflect', min:5, phase:'REFLECT', source:'Hearth', title:'Feedback + next lesson target', body:'Rate confidence, capture notes, choose the next small step.', prompt:'What should the next lesson do?' }
      ]
    };
  }

  function speakStep(char, text){
    return { type:'speak', char:char, charLabel:'Guide', text:text };
  }

  function askStep(char, concept, text, choices){
    return { type:'ask', char:char, charLabel:'Guide', concept:concept, text:text, choices:choices };
  }

  function actionStep(char, text, config){
    config = config || {};
    return {
      type:'action',
      char:char,
      charLabel:'Guide',
      text:text,
      actionType:config.actionType || 'checklist',
      actionId:config.actionId || 'journey-action',
      prompt:config.prompt || '',
      checks:config.checks || [],
      render:function(container, advance){
        renderJourneyAction(container, advance, this);
      }
    };
  }

  function renderJourneyAction(container, advance, step){
    const isNotes = step.actionType === 'notes';
    let html = '<div class="teach-scene-wrap">' +
      '<div class="teach-scene">' +
        '<div class="teach-char-wrap">' +
          '<img src="'+attr(step.char || 'images/character-face/Encouraging.png')+'" class="teach-char-img" />' +
          '<div class="teach-char-label">'+esc(step.charLabel || 'Guide')+'</div>' +
        '</div>' +
        '<div class="teach-bubble">' +
          '<div class="teach-tail"></div>' +
          '<div class="teach-text">'+(step.text || '')+'</div>' +
        '</div>' +
      '</div>' +
      '<div style="max-width:700px;margin:16px auto 0;padding:16px;background:var(--card);border:1px solid #3a2a1a;border-radius:8px">';

    if(isNotes){
      html += '<textarea data-journey-action="'+attr(step.actionId)+'" placeholder="'+attr(step.prompt || 'Write your notes here...')+'" style="width:100%;min-height:120px;box-sizing:border-box;background:#0d0b08;border:1px solid #3a2a1a;border-radius:8px;color:var(--text);padding:10px;font-family:DM Sans,sans-serif;font-size:0.78rem;line-height:1.45"></textarea>';
    } else {
      (step.checks || []).forEach((label, i) => {
        html += '<label style="display:block;margin:10px 0;color:var(--dim);line-height:1.45;font-size:0.78rem"><input type="checkbox" data-journey-check="'+i+'" /> '+esc(label)+'</label>';
      });
      if(!step.checks || !step.checks.length){
        html += '<p style="color:var(--dim);font-size:0.78rem;line-height:1.5;margin:0">Do the exercise slowly and honestly. Continue when the step feels complete.</p>';
      }
    }

    html += '<div style="text-align:center;margin-top:16px">' +
      '<button data-journey-continue style="background:var(--gold);color:var(--bg);border:none;padding:10px 24px;border-radius:6px;font-family:DM Sans,sans-serif;font-weight:700;cursor:pointer">Continue</button>' +
      '</div></div></div>';

    container.innerHTML = html;

    const button = container.querySelector('[data-journey-continue]');
    const checks = container.querySelectorAll('[data-journey-check]');
    function update(){
      if(!checks.length) return;
      const done = Array.prototype.every.call(checks, check => check.checked);
      button.disabled = !done;
      button.textContent = done ? 'Continue' : 'Complete the checks';
      button.style.background = done ? 'var(--gold)' : '#3a2a1a';
      button.style.color = done ? 'var(--bg)' : '#706050';
      button.style.cursor = done ? 'pointer' : 'not-allowed';
    }
    checks.forEach(check => check.addEventListener('change', update));
    update();
    button.addEventListener('click', function(){
      if(!button.disabled) advance();
    });
  }

  // Generate TeachingEngine steps for a journey block
  function buildBlockSteps(block, lesson, levelNum, lessonNum, blockIdx){
    const concept = lesson.conceptNames[0] || 'the concept';
    const concept2 = lesson.conceptNames[1] || 'the next idea';
    const steps = [];
    
    // Character images by block type
    const chars = {
      review: { speak:'images/character-face/Neutral.png', ask:'images/character-face/Thinking.png', action:'images/character-face/Encouraging.png' },
      warmup: { speak:'images/character-face/Encouraging.png', ask:'images/character-face/Thinking.png', action:'images/character-face/Encouraging.png' },
      concept: { speak:'images/character-face/Neutral.png', ask:'images/character-face/Thinking.png', action:'images/character-face/Encouraging.png' },
      drill: { speak:'images/character-face/Encouraging.png', ask:'images/character-face/Thinking.png', action:'images/character-face/Encouraging.png' },
      music: { speak:'images/character-face/Encouraging.png', ask:'images/character-face/Celebratory.png', action:'images/character-face/Encouraging.png' },
      reflect: { speak:'images/character-face/Neutral.png', ask:'images/character-face/Thinking.png', action:'images/character-face/Celebratory.png' }
    };
    const c = chars[block.id] || chars.concept;
    
    if(block.id === 'review'){
      steps.push({ type:'speak', char:c.speak, charLabel:'Guide',
        text:'<p>Before we build something new, let us check what is already here.</p><p>Read your last lesson notes honestly. What did the hands learn? What slipped? No judgement — just honest looking.</p>' });
      steps.push({ type:'ask', char:c.ask, charLabel:'Guide', concept:'review-check',
        text:'<p>From your last lesson, what feels solid and what feels shaky?</p>',
        choices:[
          { label:'I remember most of it', correct:true, response:{ char:'images/character-face/Celebratory.png', charLabel:'Guide', text:'<p>Good. Let us build on that foundation today.</p>' }},
          { label:'Some things slipped', correct:true, response:{ char:'images/character-face/Encouraging.png', charLabel:'Guide', text:'<p>That is normal. Repetition is how the hands remember. We will touch on the shaky parts today.</p>' }},
          { label:'I feel lost', correct:true, response:{ char:'images/character-face/Encouraging.png', charLabel:'Guide', text:'<p>No worries. We will start from where you are, not where you think you should be.</p>' }}
        ]});
      steps.push(actionStep(c.action, '<p>Write one thing that stuck and one thing that slipped from your last lesson. Be specific - the more honest the note, the better the next lesson adapts.</p>', {
        actionType:'notes', actionId:'review-notes', prompt:'What stuck? What slipped?'
      }));
    }
    else if(block.id === 'warmup'){
      steps.push({ type:'speak', char:c.speak, charLabel:'Guide',
        text:'<p>Time to wake the hands. Two minutes of clean, small movements.</p><p>Drop your shoulders. Breathe. The body needs to be calm before it can learn.</p>' });
      steps.push(actionStep(c.action, '<p>Do the warm-up now. Focus on one correction from last time.</p>', {
        actionType:'checklist', actionId:'warmup-checks',
        checks:['Body scan complete - shoulders dropped, jaw loose','Clean notes on open strings - all 6 ring clear','Metronome tempo noted - BPM: ___','One correction from last time applied']
      }));
      steps.push({ type:'ask', char:c.ask, charLabel:'Guide', concept:'warmup-check',
        text:'<p>How did the warm-up feel?</p>',
        choices:[
          { label:'Hands are awake and calm', correct:true, response:{ char:'images/character-face/Celebratory.png', charLabel:'Guide', text:'<p>Perfect. You are ready for today\'s idea.</p>' }},
          { label:'Some tension remains', correct:true, response:{ char:'images/character-face/Encouraging.png', charLabel:'Guide', text:'<p>Notice where it lives. We will work through it during the drill.</p>' }},
          { label:'Fingers are stiff', correct:true, response:{ char:'images/character-face/Encouraging.png', charLabel:'Guide', text:'<p>Stiffness is the body saying it needs more time. Slow down the reps and breathe into it.</p>' }}
        ]});
    }
    else if(block.id === 'concept'){
      steps.push({ type:'speak', char:c.speak, charLabel:'Guide',
        text:'<p>Here is today\'s idea: <strong>'+esc(concept)+'</strong>.</p><p>Say it in plain words first. Then find it on the guitar. If a word is unclear, stop and clear it — that is the Foundation mindset, and it never stops being useful.</p>' });
      steps.push(actionStep(c.action, '<p>Find this concept on the guitar. Draw it, say it, touch it. The clearer the mental picture, the cleaner the physical execution.</p>', {
        actionType:'checklist', actionId:'concept-checks',
        checks:['I can explain this concept in plain words','I can find it on the guitar','I can connect it to something I already know']
      }));
      steps.push({ type:'ask', char:c.ask, charLabel:'Guide', concept:'concept-check',
        text:'<p>Can you explain <strong>'+esc(concept)+'</strong> in your own words?</p>',
        choices:[
          { label:'Yes, I get it', correct:true, response:{ char:'images/character-face/Celebratory.png', charLabel:'Guide', text:'<p>Excellent. Now let us train the movement so it becomes natural.</p>' }},
          { label:'I understand but need practice', correct:true, response:{ char:'images/character-face/Encouraging.png', charLabel:'Guide', text:'<p>Understanding before movement is exactly right. The drill will help it stick.</p>' }},
          { label:'I am confused', correct:true, response:{ char:'images/character-face/Encouraging.png', charLabel:'Guide', text:'<p>Good — you noticed. Let us break it down smaller. What part is unclear?</p>' }}
        ]});
    }
    else if(block.id === 'drill'){
      steps.push({ type:'speak', char:c.speak, charLabel:'Guide',
        text:'<p>Now we train the movement. Slow, with a metronome.</p><p>One clean repetition is worth more than ten sloppy ones. If it buzzes, adjust — closer to the fret wire, arched finger, less shoulder tension.</p>' });
      steps.push(actionStep(c.action, '<p>'+esc(block.body)+'</p>', {
        actionType:'checklist', actionId:'drill-checks',
        checks:['Started at slow tempo - BPM: ___','Clean reps achieved before speeding up','Focused on one specific correction','Timed myself - minutes practised: ___']
      }));
      steps.push({ type:'ask', char:c.ask, charLabel:'Guide', concept:'drill-check',
        text:'<p>How did the drill go?</p>',
        choices:[
          { label:'Clean reps happening', correct:true, response:{ char:'images/character-face/Celebratory.png', charLabel:'Guide', text:'<p>That is the sound of progress. Now let us make it musical.</p>' }},
          { label:'Still buzzing or messy', correct:true, response:{ char:'images/character-face/Encouraging.png', charLabel:'Guide', text:'<p>Slow down more. The metronome is your honest friend — it tells you the truth about your tempo.</p>' }},
          { label:'Got bored and rushed', correct:true, response:{ char:'images/character-face/Thinking.png', charLabel:'Guide', text:'<p>Rushing is a gradient gap — the step is too easy. Let us add a small challenge: try it at +5 BPM, or add a rhythm variation.</p>' }}
        ]});
    }
    else if(block.id === 'music'){
      steps.push({ type:'speak', char:c.speak, charLabel:'Guide',
        text:'<p>This is where the drill becomes music. Play something real — a riff, a chord progression, a song moment.</p><p>If you can not represent it, you do not understand it yet. Make it small enough that your hands can succeed.</p>' });
      steps.push(actionStep(c.action, '<p>Play something that uses today&#39;s concept. It can be simple - two chords, a short riff, a melody. The point is to feel music, not just exercise.</p>', {
        actionType:'notes', actionId:'music-notes', prompt:'What did you play? How did it feel?'
      }));
      steps.push({ type:'ask', char:c.ask, charLabel:'Guide', concept:'music-check',
        text:'<p>Did today\'s concept connect to real music?</p>',
        choices:[
          { label:'Yes, I heard it in a song moment', correct:true, response:{ char:'images/character-face/Celebratory.png', charLabel:'Guide', text:'<p>That is the goal. When an idea becomes music, it becomes yours.</p>' }},
          { label:'Not yet, still feels like an exercise', correct:true, response:{ char:'images/character-face/Encouraging.png', charLabel:'Guide', text:'<p>Keep the exercise small and add rhythm. Music is pattern + feeling. The feeling comes when the pattern is easy enough to forget.</p>' }},
          { label:'I want to try something different', correct:true, response:{ char:'images/character-face/Encouraging.png', charLabel:'Guide', text:'<p>Go for it. Curiosity is the best teacher after the basics are in place.</p>' }}
        ]});
    }
    else if(block.id === 'reflect'){
      steps.push({ type:'speak', char:c.speak, charLabel:'Guide',
        text:'<p>Last step. Rate what you learned, write one honest note, and name the next small thing to work on.</p><p>The next lesson adapts to what you tell it.</p>' });
      steps.push({ type:'ask', char:c.ask, charLabel:'Guide', concept:'reflect-rate',
        text:'<p>Rate your confidence with today\'s concept:</p>',
        choices:[
          { label:'Confident — I can do this', correct:true, response:{ char:'images/character-face/Celebratory.png', charLabel:'Guide', text:'<p>Lock it in. Next time we build on this.</p>' }},
          { label:'Getting there — needs more reps', correct:true, response:{ char:'images/character-face/Encouraging.png', charLabel:'Guide', text:'<p>Honest. Repetition is the bridge between knowing and doing.</p>' }},
          { label:'Still confused — need to revisit', correct:true, response:{ char:'images/character-face/Encouraging.png', charLabel:'Guide', text:'<p>We will put this into the next warm-up. No concept gets left behind.</p>' }}
        ]});
      steps.push(actionStep(c.action, '<p>Write your notes for next time. What should the next lesson focus on? What gap showed up? What gradient is next?</p>', {
        actionType:'notes', actionId:'reflect-notes', prompt:'Next lesson should focus on...'
      }));
    }
    
    return steps;
  }

  function ratingButtons(kind, names, current){
    let html = '<div class="journey-rating-list">';
    names.forEach(name => {
      const safe = esc(name);
      const val = current && current[name] ? current[name] : 0;
      html += '<div class="journey-rating-row"><span>'+safe+'</span><div>';
      [1,2,3,4,5].forEach(n => {
        html += '<button type="button" class="journey-rating '+(n<=val?'on':'')+'" onclick="Journey.setDraftRating(\''+kind+'\',\''+encodeURIComponent(name)+'\','+n+')">'+n+'</button>';
      });
      html += '</div></div>';
    });
    html += '</div>';
    return html;
  }

  function injectStyles(){
    if(document.getElementById('journey-style-v2')) return;
    const style = document.createElement('style');
    style.id = 'journey-style-v2';
    style.textContent = `
      .journey-shell{padding:20px;max-width:980px;margin:0 auto;color:var(--text)}
      .journey-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,rgba(212,175,105,.14),rgba(13,11,8,.95));border:1px solid var(--border);border-radius:18px;padding:18px;margin-bottom:14px;box-shadow:0 14px 40px rgba(0,0,0,.25)}
      .journey-hero:after{content:"";position:absolute;inset:-30%;background:radial-gradient(circle at 70% 20%,rgba(232,160,32,.16),transparent 35%);pointer-events:none}
      .journey-kicker{font-family:JetBrains Mono,monospace;font-size:.58rem;color:var(--gold);letter-spacing:.16em;text-transform:uppercase}
      .journey-title{font-family:Cinzel,serif;font-size:1.5rem;color:var(--gold);margin:5px 0 4px;font-weight:800}
      .journey-sub{font-size:.78rem;color:var(--dim);line-height:1.55;max-width:720px}
      .journey-students{display:flex;gap:7px;flex-wrap:wrap;margin-top:13px;position:relative;z-index:1}
      .journey-chip{border:1px solid var(--border);background:rgba(26,23,20,.72);color:var(--dim);border-radius:999px;padding:8px 11px;font-size:.72rem;cursor:pointer}
      .journey-chip.on{border-color:var(--gold);color:var(--gold);box-shadow:0 0 16px rgba(212,175,105,.12)}
      .journey-grid{display:grid;grid-template-columns:minmax(220px,.75fr) 1.5fr;gap:14px}
      .journey-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px;box-shadow:0 8px 26px rgba(0,0,0,.16)}
      .journey-guide{display:flex;gap:12px;align-items:flex-start}
      .journey-guide img{width:82px;height:82px;object-fit:contain;filter:drop-shadow(0 5px 12px rgba(0,0,0,.4));animation:char-float 3s ease-in-out infinite}
      .journey-bubble{position:relative;background:rgba(13,11,8,.7);border:1px solid var(--border);border-radius:12px;padding:10px 12px;font-size:.72rem;line-height:1.45;color:var(--text)}
      .journey-spine{display:flex;flex-direction:column;gap:7px}
      .journey-level{border:1px solid var(--border);background:rgba(13,11,8,.45);border-radius:12px;padding:10px;cursor:pointer;opacity:.45;transition:.2s}
      .journey-level.unlocked{opacity:1}.journey-level.active{box-shadow:0 0 0 1px var(--lvl),0 0 20px color-mix(in srgb,var(--lvl),transparent 82%)}
      .journey-level.locked{cursor:not-allowed}.journey-level:hover.unlocked{transform:translateY(-1px)}
      .journey-progressbar{height:4px;background:rgba(255,255,255,.08);border-radius:99px;overflow:hidden;margin-top:8px}.journey-progressbar div{height:100%;background:var(--lvl)}
      .journey-lesson-card{border:1px solid var(--border);border-radius:14px;padding:14px;background:linear-gradient(180deg,rgba(255,255,255,.025),rgba(0,0,0,.08));margin-bottom:10px}
      .journey-block{border:1px solid var(--border);background:rgba(13,11,8,.5);border-radius:12px;padding:12px;margin-bottom:10px}
      .journey-block-head{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:7px}.journey-phase{font-family:JetBrains Mono,monospace;font-size:.55rem;color:var(--gold);letter-spacing:.12em}.journey-min{font-family:JetBrains Mono,monospace;font-size:.58rem;color:var(--dim)}
      .journey-input{width:100%;background:#0d0b08;border:1px solid var(--border);border-radius:10px;color:var(--text);padding:10px;font-family:DM Sans,sans-serif;font-size:.78rem;min-height:72px;box-sizing:border-box}
      .journey-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.journey-btn{background:var(--gold);color:#0d0b08;border:none;border-radius:10px;padding:10px 14px;font-weight:800;cursor:pointer}.journey-btn.secondary{background:transparent;color:var(--gold);border:1px solid var(--border)}.journey-btn.danger{background:#cc3344;color:white}
      .journey-rating-list{display:flex;flex-direction:column;gap:8px}.journey-rating-row{display:flex;justify-content:space-between;gap:8px;align-items:center;font-size:.72rem;color:var(--text);border-bottom:1px solid rgba(255,255,255,.06);padding-bottom:7px}.journey-rating{background:transparent;border:1px solid var(--border);color:var(--dim);border-radius:999px;width:26px;height:26px;cursor:pointer;font-size:.65rem}.journey-rating.on{background:var(--gold);color:#0d0b08;border-color:var(--gold)}
      .journey-note{border-left:2px solid var(--gold);padding:8px 10px;background:rgba(212,175,105,.06);font-size:.72rem;color:var(--dim);line-height:1.45;margin-top:8px;border-radius:0 8px 8px 0}
      @media(max-width:720px){.journey-shell{padding:14px}.journey-grid{grid-template-columns:1fr}.journey-title{font-size:1.25rem}.journey-guide img{width:64px;height:64px}}
    `;
    document.head.appendChild(style);
  }

  function render(){
    injectStyles();
    showPanel('p-lesson');
    const root = getJourneyRoot();
    if(!root) return;
    const state = loadState();
    const student = activeStudent(state);
    const level = getLevel(student.currentLevel || 1);
    const lvlState = student.levels[level.id];
    const nextLesson = (lvlState.lessonsDone || 0) + 1;

    // Spine SVG dimensions
    const svgW = 320, svgH = 700;
    const cx = 160;
    const topY = 55;       // Foundation circle center
    const botY = 645;      // Mastery circle center
    const firstLevelY = 130;
    const lastLevelY = 575;
    const levelSpacing = (lastLevelY - firstLevelY) / 7;

    // Build level positions
    const levelPositions = LEVELS.map((l, i) => ({
      ...l,
      y: firstLevelY + i * levelSpacing,
      ls: student.levels[l.id] || {},
      unlocked: i === 0 || !!(student.levels[l.id]?.unlocked) || !!student.levels[LEVELS[i-1]?.id]?.complete
    }));

    let html = '<div class="journey-shell" style="display:flex;flex-direction:column;align-items:center;padding:20px">';

    // Student chips
    html += '<div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:center;align-items:center;margin-bottom:16px">';
    state.students.forEach(s => {
      html += '<div style="display:flex;align-items:center;gap:2px">';
      html += '<button class="journey-chip '+(s.id===student.id?'on':'')+'" onclick="Journey.switchStudent(\''+s.id+'\')">'+esc(s.name)+'</button>';
      if(state.students.length > 1) html += '<button onclick="Journey.removeStudent(\''+s.id+'\')" style="background:none;border:none;color:rgba(212,175,105,0.3);cursor:pointer;font-size:0.65rem;padding:2px 4px" title="Remove">✕</button>';
      html += '</div>';
    });
    html += '<button class="journey-chip" onclick="Journey.addStudent()" style="font-size:0.6rem;padding:6px 9px">+ Add</button>';
    html += '</div>';

    // Title
    html += '<div style="text-align:center;margin-bottom:16px">';
    html += '<div style="font-family:Cinzel,serif;font-size:1.6rem;color:var(--gold);font-weight:800;letter-spacing:0.04em">Your Journey</div>';
    html += '</div>';

    // Guitar guide
    html += '<div style="display:flex;flex-direction:column;align-items:center;margin-bottom:16px">';
    html += '<img src="images/character-full/Encouraging.png" style="width:90px;height:90px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));animation:char-float 3s ease-in-out infinite"/>';
    html += '<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 14px;margin-top:8px;max-width:260px;text-align:center;position:relative">';
    html += '<div style="position:absolute;left:50%;top:-6px;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid var(--border)"></div>';
    html += '<div style="font-size:0.68rem;color:var(--text);line-height:1.5">This is your learning spine - from <strong style="color:#d4af69">Foundation</strong> to <strong style="color:#d4af69">Mastery</strong>. Click a level to see your lessons.</div>';
    html += '</div>';
    html += '</div>';

    // The spine SVG
    html += '<svg viewBox="0 0 '+svgW+' '+svgH+'" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg">';

    // Defs
    html += '<defs>';
    html += '<filter id="glow-gold"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
    html += '<filter id="glow-soft"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
    html += '</defs>';

    // Foundation circle (top)
    html += '<circle cx="'+cx+'" cy="'+topY+'" r="42" fill="none" stroke="#d4af69" stroke-width="2" filter="url(#glow-gold)" style="cursor:pointer" onclick="showFoundation()"/>';
    html += '<circle cx="'+cx+'" cy="'+topY+'" r="36" fill="rgba(13,11,8,0.85)" stroke="#d4af69" stroke-width="1.5" style="cursor:pointer" onclick="showFoundation()"/>';
    html += '<image href="images/foundation-icon.png" x="'+(cx-26)+'" y="'+(topY-26)+'" width="52" height="52" style="cursor:pointer" onclick="showFoundation()"/>';

    // Dashed spine segments between levels
    for(let i = 0; i < levelPositions.length; i++){
      const lp = levelPositions[i];
      const prevY = i === 0 ? topY + 42 : levelPositions[i-1].y;
      const curY = lp.y;
      const lit = i === 0; // Only first segment (to L1) is lit
      if(lit){
        // Lit segment: solid gold glow
        html += '<line x1="'+cx+'" y1="'+prevY+'" x2="'+cx+'" y2="'+curY+'" stroke="#d4af69" stroke-width="2.5" filter="url(#glow-gold)"/>';
      } else {
        // Dim dashed
        html += '<line x1="'+cx+'" y1="'+prevY+'" x2="'+cx+'" y2="'+curY+'" stroke="rgba(212,175,105,0.15)" stroke-width="1.5" stroke-dasharray="4 6"/>';
      }
    }
    // Spine from L8 to mastery
    const lastLP = levelPositions[levelPositions.length - 1];
    html += '<line x1="'+cx+'" y1="'+lastLP.y+'" x2="'+cx+'" y2="'+(botY-50)+'" stroke="rgba(212,175,105,0.15)" stroke-width="1.5" stroke-dasharray="4 6"/>';

    // Level nodes along the spine
    levelPositions.forEach((lp, i) => {
      const active = lp.num === (student.currentLevel || 1);
      const complete = !!lp.ls.complete;
      const lit = lp.unlocked;
      const r = active ? 22 : 16;
      const color = complete ? lp.color : (lit ? lp.color : 'rgba(212,175,105,0.15)');
      const fillC = active ? 'rgba(212,175,105,0.1)' : 'rgba(13,11,8,0.85)';
      const roman = ['I','II','III','IV','V','VI','VII','VIII'][i];

      // Outer glow ring for active
      if(active) html += '<circle cx="'+cx+'" cy="'+lp.y+'" r="'+(r+4)+'" fill="none" stroke="#d4af69" stroke-width="1" opacity="0.3" filter="url(#glow-gold)"/>';

      // Level circle
      html += '<circle cx="'+cx+'" cy="'+lp.y+'" r="'+r+'" fill="'+fillC+'" stroke="'+color+'" stroke-width="'+(active?2.5:(lit?1.5:1))+'" style="cursor:'+(lit?'pointer':'default')+'" '+(active?'filter="url(#glow-gold)"':'')+' '+(lit?'onclick="Journey.openLevel('+lp.num+')"':'')+'/>';

      // Roman numeral
      html += '<text x="'+cx+'" y="'+(lp.y+4)+'" text-anchor="middle" fill="'+(active?'#d4af69':(lit?color:'rgba(212,175,105,0.2)'))+'" font-family="Cinzel,serif" font-size="'+(active?13:10)+'" font-weight="'+(active?'800':'400')+'">'+roman+'</text>';


    });

    // Mastery circle (bottom) with rainbow rings
    const mRings = [
      { r:48, color:'#ff0000' },
      { r:41, color:'#ff8800' },
      { r:34, color:'#ffdd00' },
      { r:28, color:'#00cc44' },
      { r:22, color:'#00cccc' },
      { r:17, color:'#3366ff' },
      { r:13, color:'#6633cc' },
      { r:10, color:'#cc33ff' }
    ];
    html += '<circle cx="'+cx+'" cy="'+botY+'" r="55" fill="none" stroke="rgba(212,175,105,0.12)" stroke-width="1" stroke-dasharray="3 4"/>';
    mRings.forEach(mr => {
      html += '<circle cx="'+cx+'" cy="'+botY+'" r="'+mr.r+'" fill="none" stroke="'+mr.color+'" stroke-width="1" opacity="0.18"/>';
    });
    html += '<circle cx="'+cx+'" cy="'+botY+'" r="36" fill="rgba(13,11,8,0.85)" stroke="rgba(212,175,105,0.2)" stroke-width="1.5"/>';
    html += '<image href="images/mastery-icon.png" x="'+(cx-26)+'" y="'+(botY-26)+'" width="52" height="52"/>';

    html += '</svg>';

    // Guide text below spine
    const notes = lvlState.notes || [];
    html += '<div style="margin-top:16px;text-align:center;max-width:340px;width:100%;font-size:0.68rem;color:var(--dim);line-height:1.55;font-style:italic">'+esc(guideText(student, level, lvlState, notes))+'</div>';

    html += '</div>';
    root.innerHTML = html;
    lightMapSpine(student);
  }
  function renderLevel(num){
    injectStyles();
    showPanel('p-lesson');
    const root = getJourneyRoot();
    if(!root) return;
    const state = loadState();
    const student = activeStudent(state);
    const level = getLevel(num);
    const lvlState = student.levels[level.id];
    const lessonsDone = lvlState.lessonsDone || 0;
    const pct = Math.min(100, Math.round(lessonsDone / level.totalLessons * 100));

    let html = '<div class="journey-shell" style="display:flex;flex-direction:column;align-items:center;padding:20px">';

    // Back button
    html += '<button class="back-btn" onclick="Journey.render()">← Back</button>';

    // Level header
    html += '<div style="text-align:center;max-width:360px;width:100%">';
    html += '<div style="font-family:JetBrains Mono,monospace;font-size:0.6rem;color:var(--gold);letter-spacing:0.16em;text-transform:uppercase;margin-bottom:4px">'+esc(student.name)+'</div>';
    html += '<div style="font-family:Cinzel,serif;font-size:1.2rem;color:'+level.color+';font-weight:800;margin-bottom:4px">'+('LEVEL '+level.num)+'</div>';
    html += '<div style="font-size:0.75rem;color:var(--dim);line-height:1.5;margin-bottom:16px">'+esc(level.focus)+'</div>';

    // Progress bar
    html += '<div style="background:rgba(255,255,255,0.06);border-radius:99px;height:6px;overflow:hidden;margin-bottom:8px"><div style="height:100%;width:'+pct+'%;background:'+level.color+';border-radius:99px;transition:width 0.4s"></div></div>';
    html += '<div style="font-family:JetBrains Mono,monospace;font-size:0.58rem;color:var(--dim);margin-bottom:18px">'+lessonsDone+' / '+level.totalLessons+' lessons · '+pct+'%</div>';
    html += '</div>';

    // Guitar guide
    const nextLessonNum = lessonsDone + 1;
    const nextLesson = buildLesson(student, level.num, nextLessonNum);
    const guideMsg = levelGuideText(level, lessonsDone, nextLesson);
    html += '<div style="display:flex;flex-direction:column;align-items:center;margin-bottom:18px">';
    html += '<img src="images/character-full/Encouraging.png" style="width:80px;height:80px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));animation:char-float 3s ease-in-out infinite"/>';
    html += '<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 14px;margin-top:8px;max-width:280px;text-align:center;position:relative">';
    html += '<div style="position:absolute;left:50%;top:-6px;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid var(--border)"></div>';
    html += '<div style="font-size:0.68rem;color:var(--text);line-height:1.5">'+esc(guideMsg)+'</div>';
    html += '</div>';
    html += '</div>';

    // List all lessons
    for(let i = 1; i <= level.totalLessons; i++){
      const lessonPreview = buildLesson(student, level.num, i);
      const done = i <= lessonsDone;
      const current = i === lessonsDone + 1;
      const locked = i > lessonsDone + 1;
      const cardBg = done ? 'rgba(0,200,100,0.06)' : current ? 'rgba(212,175,105,0.08)' : 'rgba(255,255,255,0.02)';
      const cardBorder = done ? 'rgba(0,200,100,0.2)' : current ? 'rgba(212,175,105,0.2)' : 'rgba(255,255,255,0.06)';
      const statusIcon = done ? '✓' : current ? '→' : '🔒';
      const statusColor = done ? '#00c864' : current ? level.color : 'rgba(212,175,105,0.2)';
      const clickable = !locked;
      const onclick = clickable ? 'onclick="Journey.openLesson('+level.num+','+i+')"' : '';
      const cursor = clickable ? 'cursor:pointer' : 'cursor:default';

      html += '<div class="journey-card" style="max-width:360px;width:100%;margin-bottom:8px;background:'+cardBg+';border:1px solid '+cardBorder+';'+cursor+'" '+onclick+'>';
      html += '<div style="display:flex;align-items:center;gap:10px">';
      html += '<div style="font-family:Cinzel,serif;font-size:0.95rem;font-weight:800;color:'+statusColor+';min-width:28px">'+i+'</div>';
      html += '<div style="flex:1">';
      html += '<div style="font-family:Cinzel,serif;font-size:0.82rem;color:'+(locked?'rgba(212,175,105,0.25)':'var(--text)')+';font-weight:700">'+esc(lessonPreview.title)+'</div>';
      if(!locked && lessonPreview.summary) html += '<div style="font-size:0.64rem;color:var(--dim);line-height:1.35;margin-top:3px">'+esc(lessonPreview.summary)+'</div>';
      if(locked) html += '<div style="font-size:0.62rem;color:rgba(212,175,105,0.2);margin-top:2px">Complete lesson '+(i-1)+' to unlock</div>';
      html += '</div>';
      html += '<div style="font-size:0.85rem;color:'+statusColor+'">'+statusIcon+'</div>';
      html += '</div>';
      html += '</div>';
    }

    html += '</div>';
    root.innerHTML = html;
  }
  function renderLevelLesson(levelNum, lessonNum, blockIdx){
    injectStyles();
    showPanel('p-lesson');
    const root = getJourneyRoot();
    if(!root) return;
    const state = loadState();
    const student = activeStudent(state);
    const level = getLevel(levelNum);
    const lvlState = student.levels[level.id];
    const lesson = buildLesson(student, levelNum, lessonNum);
    student.activeLesson = student.activeLesson || { levelId:level.id, lessonNum, date:today(), blockNotes:{}, conceptRatings:{}, taskRatings:{}, feedback:'', teacherNotes:'', status:'in-progress', blockIdx:0 };
    student.activeLesson.lessonNum = lessonNum;
    student.activeLesson.levelId = level.id;
    const bi = blockIdx !== undefined ? blockIdx : (student.activeLesson.blockIdx || 0);
    student.activeLesson.blockIdx = bi;
    saveStudent(student);

    const blocks = lesson.blocks;
    const isReview = bi === blocks.length; // review/ratings step
    const isComplete = bi > blocks.length;
    const b = !isReview ? blocks[bi] : null;

    // Guide messages per block type
    const blockGuides = {
      review: 'Before we build something new, let us check what is already here. Read your last lesson notes. What did the hands learn? What slipped? No judgement - just honest looking.',
      warmup: 'Time to wake the hands. Two minutes of clean, small movements. Drop your shoulders. Breathe. The body needs to be calm before it can learn.',
      concept: "Here is today\'s idea. Say it in plain words first. Then find it on the guitar. If a word is unclear, stop and clear it - that is the Foundation mindset, and it never stops being useful.",
      drill: 'Now we train the movement. Slow, with a metronome. One clean repetition is worth more than ten sloppy ones. If it buzzes, adjust. Closer to the fret wire, arched finger, less shoulder tension.',
      music: 'This is where the drill becomes music. Play something real - a riff, a chord progression, a song moment. If you can not represent it, you do not understand it yet. Make it small enough that your hands can succeed.',
      reflect: 'Last step. Rate what you learned, write one honest note, and name the next small thing to work on. The next lesson adapts to what you tell it.'
    };

    let html = '<div class="journey-shell" style="display:flex;flex-direction:column;align-items:center;padding:20px">';
    html += '<button class="back-btn" onclick="Journey.openLevel('+levelNum+')">← Back</button>';

    // Progress dots
    html += '<div style="display:flex;gap:6px;margin-bottom:14px">';
    blocks.forEach((_, i) => {
      const dotColor = i < bi ? '#00c864' : i === bi ? level.color : 'rgba(212,175,105,0.15)';
      html += '<div style="width:8px;height:8px;border-radius:50%;background:'+dotColor+'"></div>';
    });
    const revDot = isReview ? level.color : (bi > blocks.length ? '#00c864' : 'rgba(212,175,105,0.15)');
    html += '<div style="width:8px;height:8px;border-radius:50%;background:'+revDot+'"></div>';
    html += '</div>';

    // Lesson title
    html += '<div style="text-align:center;max-width:360px;width:100%;margin-bottom:10px">';
    html += '<div style="font-family:JetBrains Mono,monospace;font-size:0.55rem;color:var(--gold);letter-spacing:0.14em;text-transform:uppercase">'+esc(student.name)+' · '+('LEVEL '+level.num)+'</div>';
    html += '<div style="font-family:Cinzel,serif;font-size:1rem;color:'+level.color+';font-weight:800;margin-top:3px">'+esc(lesson.title)+'</div>';
    html += '<div style="font-size:0.62rem;color:var(--dim);margin-top:3px">Lesson '+lessonNum+' of '+level.totalLessons+'</div>';
    html += '</div>';

    if(!isReview && b){
      // Guitar guide for this block
      const guideMsg = blockGuides[b.id] || b.body;
      html += '<div style="display:flex;flex-direction:column;align-items:center;margin-bottom:14px">';
      html += '<img src="images/character-full/Encouraging.png" style="width:72px;height:72px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));animation:char-float 3s ease-in-out infinite"/>';
      html += '<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 14px;margin-top:8px;max-width:280px;text-align:center;position:relative">';
      html += '<div style="position:absolute;left:50%;top:-6px;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid var(--border)"></div>';
      html += '<div style="font-size:0.68rem;color:var(--text);line-height:1.5">'+esc(guideMsg)+'</div>';
      html += '</div></div>';

      // Block card - clickable to launch TeachingEngine
      html += '<div class="journey-card" style="max-width:360px;width:100%;cursor:pointer" onclick="Journey.openBlock('+levelNum+','+lessonNum+','+bi+')">';
      html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
      html += '<div style="font-family:JetBrains Mono,monospace;font-size:0.55rem;color:var(--gold);text-transform:uppercase;letter-spacing:0.1em">'+esc(b.phase)+'</div>';
      html += '<div style="font-family:JetBrains Mono,monospace;font-size:0.55rem;color:var(--dim)">'+b.min+' min</div>';
      html += '</div>';
      html += '<div style="font-family:Cinzel,serif;color:var(--gold);font-size:0.95rem;font-weight:700;margin-bottom:8px">'+esc(b.title)+'</div>';
      html += '<div style="font-size:0.72rem;color:var(--dim);line-height:1.5;margin-bottom:6px">'+esc(b.body)+'</div>';
      html += '<div style="font-size:0.62rem;color:var(--gold);text-align:center;padding:6px;background:rgba(212,175,105,0.08);border-radius:6px">Tap to begin</div>';
      html += '</div>';;

    } else if(isReview) {
      // Review/complete step
      html += '<div style="display:flex;flex-direction:column;align-items:center;margin-bottom:14px">';
      html += '<img src="images/character-full/Encouraging.png" style="width:72px;height:72px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));animation:char-float 3s ease-in-out infinite"/>';
      html += '<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 14px;margin-top:8px;max-width:280px;text-align:center;position:relative">';
      html += '<div style="position:absolute;left:50%;top:-6px;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid var(--border)"></div>';
      html += '<div style="font-size:0.68rem;color:var(--text);line-height:1.5">Good work. Now take a moment to rate what you learned and leave a note for next time. Honest reflection is part of the practice.</div>';
      html += '</div></div>';

      // Concept status
      html += '<div class="journey-card" style="max-width:360px;width:100%;margin-bottom:10px"><div class="journey-kicker">Concept status</div>'+ratingButtons('concept', lesson.conceptNames, student.activeLesson.conceptRatings)+'</div>';

      // Task status
      html += '<div class="journey-card" style="max-width:360px;width:100%;margin-bottom:10px"><div class="journey-kicker">Task status</div>'+ratingButtons('task', lesson.taskNames, student.activeLesson.taskRatings)+'</div>';

      // Feedback
      html += '<div class="journey-card" style="max-width:360px;width:100%;margin-bottom:10px">';
      html += '<div class="journey-kicker">Feedback / Next Gradient</div>';
      html += '<textarea class="journey-input" id="journey-feedback" placeholder="How did this contact go?">'+esc(student.activeLesson.feedback || '')+'</textarea>';
      html += '<textarea class="journey-input" id="journey-teacher-notes" style="margin-top:8px" placeholder="Teacher notes: gaps, interests, attitude, breakthroughs...">'+esc(student.activeLesson.teacherNotes || '')+'</textarea>';
      html += '</div>';

      html += '<div style="max-width:360px;width:100%;display:flex;gap:8px;margin-top:4px">';
      html += '<button class="journey-btn secondary" onclick="Journey.saveLessonDraft()" style="flex:1">Save Draft</button>';
      html += '<button class="journey-btn" onclick="Journey.completeLesson()" style="flex:1">Complete Lesson</button>';
      html += '</div>';
    }

    html += '</div>';
    root.innerHTML = html;
  }

  function levelGuideText(level, lessonsDone, lesson){
    const total = level.totalLessons;
    const n = lessonsDone + 1;
    const primary = lesson.conceptNames[0] || 'the core concept';
    const blocks = lesson.blocks.map(b => b.title);
    if(lessonsDone === 0) return 'Welcome to ' + level.id + '. Lesson ' + n + ' focuses on ' + primary + '. You will review, warm up, learn the concept, drill it, apply it to music, and reflect. This lesson is planned for about ' + (lesson.minutes || 60) + ' minutes.';
    if(n > total) return 'You have completed all ' + total + ' lessons in ' + level.id + '. The next level is unlocked - keep the momentum going.';
    if(n === total) return 'This is your final lesson in ' + level.id + '. Lesson ' + n + ' brings together everything you have learned. Focus on ' + primary + ' and lock it in before moving forward.';
    const prev = lesson.conceptNames[1] || 'last time';
    return 'Lesson ' + n + ' of ' + total + '. Today you are working on ' + primary + '. You will drill it slowly, apply it to a real musical moment, and leave with clear notes for next time. One honest contact.';
  }

  function guideText(student, level, lvlState, notes){
    if(notes.length && /C chord|gap/i.test(notes[0].text)) return 'This is exactly why Journey exists: the lesson revealed a gap. Don\'t skip it. Put C chord into the next warm-up, connect the pentatonic to piano visually, and give the songwriting goal a tiny song seed.';
    if(student.name.toLowerCase().includes('jen')) return 'Jen\'s path should track what happened in the real lesson, not an abstract syllabus. Use notes to capture gaps, interests, and next gradients — then the next lesson adapts.';
    if((lvlState.lessonsDone||0)===0) return 'Foundation gave you the map. Now we train the hands. Start with one full contact: review what you know, wake the hands, learn one new concept, drill it slowly, apply it to music, then reflect. The lesson is one hour because it has a beginning, middle, and closure.';
    if(level.num===1) return 'Level 1 is the bridge from understanding to doing. Each lesson adds one new movement or idea. If a concept feels foggy, stop and clear it — the Foundation mindset never stops being useful. Rate concepts honestly; \"need work\" is navigation, not failure.';
    return 'The spine remembers progress per student. Complete enough lessons in '+level.id+' and the next level unlocks. Rate concepts honestly — \"need work\" is navigation, not failure.';
  }

  function lightMapSpine(student){
    if(!student) return;
    LEVELS.forEach(l => {
      const line = document.getElementById('spine-l'+l.num);
      const tick = document.querySelectorAll('.conn-tick')[l.num-1];
      const label = Array.from(document.querySelectorAll('.conn-label')).find(x => x.textContent === l.id);
      const ls = student.levels[l.id] || {};
      const active = l.num === student.currentLevel;
      const done = !!ls.complete;
      [line,tick,label].forEach(el => {
        if(!el) return;
        if(done || active){ el.classList.remove('dim'); el.style.opacity = done ? '0.75' : '0.55'; el.style.stroke = l.color; el.style.fill = l.color; }
      });
    });
  }

  function renderLesson(){
    injectStyles();
    showPanel('p-lesson');
    const root = getJourneyRoot();
    if(!root) return;
    const state = loadState();
    const student = activeStudent(state);
    const level = getLevel(student.currentLevel || 1);
    const lvlState = student.levels[level.id];
    const lessonNum = (lvlState.lessonsDone || 0) + 1;
    const lesson = buildLesson(student, level.num, lessonNum);
    student.activeLesson = student.activeLesson || { levelId:level.id, lessonNum, date:today(), blockNotes:{}, conceptRatings:{}, taskRatings:{}, feedback:'', teacherNotes:'', status:'in-progress' };
    saveStudent(student);
    let html = '<div class="journey-shell"><div class="journey-hero"><div class="journey-kicker">'+esc(student.name)+' · '+level.id+' Lesson '+lessonNum+'</div><div class="journey-title">'+esc(lesson.title)+'</div><div class="journey-sub">Use this as the live lesson room. Notes autosave when you save/complete. Each block has a reason and a tracking space.</div><div class="journey-actions"><button class="journey-btn secondary" onclick="Journey.render()">← Spine</button></div></div>';
    lesson.blocks.forEach(b => {
      const val = student.activeLesson.blockNotes[b.id] || '';
      html += '<div class="journey-block"><div class="journey-block-head"><div><div class="journey-phase">'+esc(b.phase)+' · '+esc(b.source)+'</div><h3 style="font-family:Cinzel;color:var(--gold);margin:4px 0;font-size:1rem">'+esc(b.title)+'</h3></div><div class="journey-min">'+b.min+' min</div></div><div style="font-size:.76rem;color:var(--dim);line-height:1.55;margin-bottom:9px">'+esc(b.body)+'</div><textarea class="journey-input" id="journey-note-'+b.id+'" placeholder="'+esc(b.prompt)+'">'+esc(val)+'</textarea></div>';
    });
    html += '<div class="journey-card"><div class="journey-kicker">Concept status</div>'+ratingButtons('concept', lesson.conceptNames, student.activeLesson.conceptRatings)+'</div>';
    html += '<div class="journey-card" style="margin-top:12px"><div class="journey-kicker">Task status</div>'+ratingButtons('task', lesson.taskNames, student.activeLesson.taskRatings)+'</div>';
    html += '<div class="journey-card" style="margin-top:12px"><div class="journey-kicker">Feedback / Next Gradient</div><textarea class="journey-input" id="journey-feedback" placeholder="How did this contact go? What should happen next?">'+esc(student.activeLesson.feedback || '')+'</textarea><textarea class="journey-input" id="journey-teacher-notes" style="margin-top:8px" placeholder="Teacher notes: gaps, interests, attitude, breakthroughs, exact relevance...">'+esc(student.activeLesson.teacherNotes || '')+'</textarea><div class="journey-actions"><button class="journey-btn secondary" onclick="Journey.saveLessonDraft()">Save Draft</button><button class="journey-btn" onclick="Journey.completeLesson()">Complete Lesson + Unlock Progress</button></div></div></div>';
    root.innerHTML = html;
  }

  function collectDraft(){
    const state = loadState();
    const student = activeStudent(state);
    if(!student.activeLesson) return student;
    ['review','warmup','concept','drill','music','reflect'].forEach(id => {
      const el = document.getElementById('journey-note-'+id);
      if(el) student.activeLesson.blockNotes[id] = el.value;
    });
    const fb = document.getElementById('journey-feedback');
    const tn = document.getElementById('journey-teacher-notes');
    if(fb) student.activeLesson.feedback = fb.value;
    if(tn) student.activeLesson.teacherNotes = tn.value;
    return student;
  }

  function rerenderActiveLesson(student){
    if(!student || !student.activeLesson){
      render();
      return;
    }
    const level = getLevel(student.currentLevel || 1);
    const lessonNum = student.activeLesson.lessonNum || 1;
    const blockIdx = student.activeLesson.blockIdx || 0;
    renderLevelLesson(level.num, lessonNum, blockIdx);
  }

  const Journey = {
    render,
    startLesson(){ const state=loadState(); const s=activeStudent(state); const l=getLevel(s.currentLevel||1); const ls=s.levels[l.id]; const num=(ls.lessonsDone||0)+1; renderLevelLesson(l.num, num); },
    saveAndNext(levelNum, lessonNum, nextIdx){ const s=collectDraft(); saveStudent(s); renderLevelLesson(levelNum, lessonNum, nextIdx); },
    openLevel(num){
      const state = loadState(); const s = activeStudent(state); const l = getLevel(num);
      const unlocked = num === 1 || s.levels[l.id].unlocked || s.levels['L'+(num-1)]?.complete;
      if(!unlocked) return;
      s.currentLevel = num; s.activeLesson = null; saveStudent(s); renderLevel(num);
    },
    openLesson(levelNum, lessonNum){
      const state = loadState(); const s = activeStudent(state); const l = getLevel(levelNum);
      s.currentLevel = levelNum; s.activeLesson = null; saveStudent(s); renderLevelLesson(levelNum, lessonNum);
    },
    openBlock(levelNum, lessonNum, blockIdx){
      const state = loadState(); const s = activeStudent(state);
      const lesson = buildLesson(s, levelNum, lessonNum);
      const block = lesson.blocks[blockIdx];
      if(!block) return;
      const steps = buildBlockSteps(block, lesson, levelNum, lessonNum, blockIdx);
      if(!steps.length) return;
      if(typeof window.TeachingEngine !== 'function'){
        alert('Teaching engine is not loaded yet.');
        return;
      }

      // Launch TeachingEngine in p-teach panel. If the host page does not have
      // panels, fall back to the journey root so the lesson still works.
      var el = showPanel('p-teach') || getJourneyRoot();
      if(!el) return;
      el.innerHTML='<div style="padding:16px;max-width:700px;margin:0 auto">'+
        '<button class="back-btn" onclick="Journey.saveAndBack('+levelNum+','+lessonNum+','+blockIdx+')">← Back to Lesson</button>'+
        '<div style="text-align:center;margin:8px 0 4px"><span style="font-family:Cinzel,serif;color:var(--gold);font-size:0.85rem;letter-spacing:2px">'+esc(block.phase)+': '+esc(block.title)+'</span></div>'+
        '<div id="teach-container"></div>'+
      '</div>';
      var engine=window._teachEngine=window.TeachingEngine(document.getElementById('teach-container'),{
        onComplete:function(scores){
          // Mark block as done and go back to lesson
          var state2=loadState(); var s2=activeStudent(state2);
          if(s2.activeLesson){
            s2.activeLesson.blockNotes[block.id]='completed';
            s2.activeLesson.blockIdx=blockIdx+1;
            saveStudent(s2);
          }
          safePlaySfx('success');
          setTimeout(function(){ renderLevelLesson(levelNum, lessonNum, blockIdx+1); },1200);
        }
      });
      engine.start({
        id: lesson.id + '-' + block.id,
        title: block.title,
        completeText: '<p>'+esc(block.title)+' complete.</p>',
        steps: steps
      });
    },
    saveAndBack(levelNum, lessonNum, blockIdx){
      // Save notes from teach-container if any
      renderLevelLesson(levelNum, lessonNum, blockIdx);
    },
    switchStudent(id){ const state=loadState(); state.activeStudentId=id; saveState(state); render(); },
    addStudent(){ const name = prompt('Student name?'); if(!name) return; const state=loadState(); const s=blankStudent(name.trim()); state.students.push(s); state.activeStudentId=s.id; saveState(state); render(); },
    renameStudent(){ const state=loadState(); const s=activeStudent(state); const name=prompt('Rename journey/student:', s.name); if(!name) return; s.name=name.trim(); saveStudent(s); render(); },
    removeStudent(id){ const state=loadState(); if(state.students.length<=1) return; const s=state.students.find(x=>x.id===id); if(!s) return; if(!confirm('Remove '+s.name+'? This deletes all their journey data.')) return; state.students=state.students.filter(x=>x.id!==id); if(state.activeStudentId===id) state.activeStudentId=state.students[0].id; saveState(state); render(); },
    setDraftRating(kind, encoded, value){
      const s = collectDraft(); if(!s.activeLesson) return;
      const name = decodeURIComponent(encoded); const key = kind==='concept' ? 'conceptRatings' : 'taskRatings';
      s.activeLesson[key][name] = value; saveStudent(s); rerenderActiveLesson(s);
    },
    saveLessonDraft(){ const s=collectDraft(); saveStudent(s); rerenderActiveLesson(s); },
    completeLesson(){
      const s = collectDraft(); const level = getLevel(s.currentLevel); const ls = s.levels[level.id]; const lesson = s.activeLesson;
      lesson.status = 'complete'; lesson.completedAt = new Date().toISOString();
      ls.lessonRecords.push(lesson); ls.lessonsDone = Math.max(ls.lessonsDone || 0, lesson.lessonNum);
      Object.assign(ls.conceptRatings, lesson.conceptRatings || {}); Object.assign(ls.taskRatings, lesson.taskRatings || {});
      const noteBits = [];
      Object.entries(lesson.blockNotes || {}).forEach(([k,v]) => { if(v && v.trim()) noteBits.push(k.toUpperCase()+': '+v.trim()); });
      if(lesson.teacherNotes) noteBits.push('TEACHER: '+lesson.teacherNotes.trim());
      if(lesson.feedback) noteBits.push('NEXT: '+lesson.feedback.trim());
      if(noteBits.length) ls.notes.push({ date:today(), text:noteBits.join(' | ') });
      if(ls.lessonsDone >= level.totalLessons){ ls.complete = true; const next = s.levels['L'+(level.num+1)]; if(next){ next.unlocked = true; s.currentLevel = level.num+1; } }
      s.activeLesson = null; saveStudent(s); render();
    },
    openJournal(){
      const state=loadState(); const s=activeStudent(state); const level=getLevel(s.currentLevel); const ls=s.levels[level.id];
      const text = prompt('Add a journey note for '+s.name+' / '+level.id+':', ''); if(!text) return;
      ls.notes.push({ date:today(), text:text.trim() }); saveStudent(s); render();
    },
    quickJenNote(){
      const state=loadState(); let s=activeStudent(state);
      if(!/jen/i.test(s.name)){ const jen=state.students.find(x=>/jen/i.test(x.name)); if(jen){ state.activeStudentId=jen.id; saveState(state); s=jen; } }
      s.currentLevel = 2; s.levels.L2.unlocked = true;
      s.levels.L2.notes.push({ date:today(), text:"L2 with Jen: reviewed what we learned last week; practised finger gymnastics with a metronome; learned pentatonic scale pattern with metronome; learned chord embellishments and how they colour songs. Relevance: Jen is close to my ability - I need to level up fast. Need to understand how scales relate to piano and what they mean on guitar. Jen wants to write a song. She didn\'t know C chord, so C chord is a gap to track." });
      saveStudent(s); render();
    },
    reset(){ if(confirm('Reset Journey data on this device?')){ localStorage.removeItem(STORE); render(); } },
    state: loadState,
    levels: LEVELS,
    buildLesson
  };

  window.Journey = Journey;
  window.populateJourney = render;
  window.getJourneyState = loadState;
  window.saveJourneyState = saveState;
})();
