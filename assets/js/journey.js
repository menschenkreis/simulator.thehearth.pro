// Journey Node - Central Spine Guided Lesson Path
// Multi-student 8-level lesson programme with review, feedback, tracking, and scalable lesson data.

(function(){
  const STORE = 'hearth-journey-v2';
  const ACTIVE = 'hearth-journey-active-student';

  const LEVELS = window.JOURNEY_LEVELS || [];
  const CONCEPT_BANK = window.JOURNEY_CONCEPT_BANK || {};
  const TASK_BANK = window.JOURNEY_TASK_BANK || {};
  const AUTHORED_LESSONS = window.JOURNEY_AUTHORED_LESSONS || {};
  const STUDENT_COMPANIONS = window.JOURNEY_STUDENT_COMPANIONS || {};
  const GUIDE_ASSETS = window.GUIDE_CHARACTER_ASSETS || {};
  let studentPickerBound = false;

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function attr(v){ return esc(v); }
  function hexToRgb(v){
    const hex = String(v || '').replace('#','').trim();
    if(!/^[0-9a-f]{6}$/i.test(hex)) return '212,175,105';
    return [
      parseInt(hex.slice(0,2), 16),
      parseInt(hex.slice(2,4), 16),
      parseInt(hex.slice(4,6), 16)
    ].join(',');
  }
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

  function guideAsset(mood){
    const moods = GUIDE_ASSETS.moods || {};
    return (moods[mood] && moods[mood].src) ||
      (moods.talking && moods.talking.src) ||
      'images/character-generated/talking-guide-v1.png';
  }

  function journeyGuideMood(student, lvlState){
    if(lvlState && lvlState.complete) return 'celebratory';
    if(getCompanion(student)) return 'encouraging';
    if(lvlState && (lvlState.lessonsDone || 0) > 0) return 'thinking';
    return 'neutral';
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
  function companionKey(student){
    return String(student && student.name ? student.name : '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  function getCompanion(student){
    return STUDENT_COMPANIONS[companionKey(student)] || null;
  }
  function findCompanionStudent(state){
    return (state.students || []).find(student => getCompanion(student));
  }
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

  function renderPillList(items){
    return (items || []).map(item => '<span class="journey-pill">'+esc(item)+'</span>').join('');
  }

  function renderSmallList(items){
    let html = '<ul class="journey-tight-list">';
    (items || []).forEach(item => html += '<li>'+esc(item)+'</li>');
    html += '</ul>';
    return html;
  }

  function renderCompanionCard(state, student){
    const companion = getCompanion(student);
    if(!companion) return '';
    return '<details class="journey-companion-card">' +
      '<summary class="journey-companion-summary">' +
        '<span><span class="journey-kicker">'+esc(companion.label || 'Lesson Companion')+'</span>' +
        '<strong>'+esc(companion.title || 'Next lesson focus')+'</strong></span>' +
        '<span>Open prep</span>' +
      '</summary>' +
      '<div class="journey-companion-head">' +
        '<div>' +
          '<div class="journey-kicker">'+esc(companion.label || 'Lesson Companion')+'</div>' +
          '<div class="journey-companion-title">'+esc(companion.title || 'Next lesson focus')+'</div>' +
        '</div>' +
        '<button class="journey-btn secondary" onclick="Journey.openLevel('+(student.currentLevel || 1)+')">Open Path</button>' +
      '</div>' +
      '<p class="journey-companion-focus">'+esc(companion.focus || '')+'</p>' +
      '<div class="journey-guide-note">'+esc(companion.guideNote || '')+'</div>' +
      '<div class="journey-companion-grid">' +
        '<div><div class="journey-mini-label">Doorway</div><div class="journey-pill-row">'+renderPillList(companion.doorway)+'</div></div>' +
        '<div><div class="journey-mini-label">Current Anchors</div>'+renderSmallList(companion.anchors)+'</div>' +
        '<div><div class="journey-mini-label">Known Gaps</div>'+renderSmallList(companion.gaps)+'</div>' +
        '<div><div class="journey-mini-label">Practice Thread</div>'+renderSmallList(companion.practice)+'</div>' +
      '</div>' +
      '<div class="journey-next-action"><strong>Next action:</strong> '+esc(companion.nextAction || '')+'</div>' +
      '<details class="journey-flow-detail"><summary>Lesson flow</summary>'+renderSmallList(companion.lessonFlow)+'</details>' +
    '</details>';
  }

  function renderCompanionPreview(state, active){
    const companionStudent = findCompanionStudent(state);
    if(!companionStudent || companionStudent.id === active.id) return '';
    const companion = getCompanion(companionStudent);
    return '<div class="journey-companion-preview">' +
      '<div><div class="journey-kicker">Teacher Prep</div>' +
      '<div class="journey-preview-title">'+esc(companion.label || companionStudent.name)+'</div>' +
      '<div class="journey-preview-copy">'+esc(companion.nextAction || '')+'</div></div>' +
      '<button class="journey-btn secondary" onclick="Journey.switchStudent(\''+companionStudent.id+'\')">Show Jen</button>' +
    '</div>';
  }

  function renderStudentPicker(state, student){
    let html = '<div class="journey-top-row">' +
      '<div class="journey-student-picker">' +
        '<button type="button" class="journey-student-trigger" onclick="Journey.toggleStudentMenu(event)" aria-haspopup="menu">' +
          '<span>Whose journey</span>' +
          '<strong>'+esc(student.name)+'</strong>' +
          '<b>v</b>' +
        '</button>' +
        '<div class="journey-student-menu" role="menu">';

    state.students.forEach(s => {
      const active = s.id === student.id;
      html += '<div class="journey-student-option '+(active ? 'active' : '')+'">' +
        '<button type="button" onclick="Journey.switchStudent(\''+s.id+'\')">' +
          '<span>'+esc(s.name)+'</span>' +
          '<small>'+(active ? 'Current path' : 'Open path')+'</small>' +
        '</button>';
      if(state.students.length > 1){
        html += '<button type="button" class="journey-student-remove" onclick="Journey.removeStudent(\''+s.id+'\')" title="Remove '+esc(s.name)+'">x</button>';
      }
      html += '</div>';
    });

    html += '<button type="button" class="journey-student-add" onclick="Journey.addStudent()">+ Add journey</button>' +
        '</div>' +
      '</div>' +
    '</div>';
    return html;
  }

  function renderJourneyMapGuide(student){
    const guideImage = guideAsset('seatedTeaching');
    const name = student && student.name ? student.name : 'this student';
    return '<aside class="journey-map-guide" aria-label="Journey guide">' +
      '<img src="'+guideImage+'" alt="Journey guide"/>' +
      '<div class="journey-map-bubble">' +
        '<div class="journey-kicker">Journey</div>' +
        '<p>This is '+esc(name)+'\'s path.</p>' +
        '<p>Follow the levels toward mastery.</p>' +
      '</div>' +
    '</aside>';
  }

  function bindStudentPickerClose(){
    if(studentPickerBound) return;
    studentPickerBound = true;
    document.addEventListener('click', function(event){
      document.querySelectorAll('.journey-student-picker.open').forEach(picker => {
        if(!picker.contains(event.target)) picker.classList.remove('open');
      });
    });
  }

  function renderJourneyNeckStage(state, student, level, lvlState, levelPositions){
    const markerTops = [16.7, 23.5, 30.3, 37.1, 43.9, 50.7, 57.5, 69.7];
    let html = '<section class="journey-neck-stage" aria-label="Journey level map">' +
      '<div class="journey-hotspot-layer" aria-label="Journey level guitar neck">';

    levelPositions.forEach((lp, i) => {
      const active = lp.num === (student.currentLevel || 1);
      const complete = !!lp.ls.complete;
      const lit = lp.unlocked;
      const top = markerTops[i] || (18 + i * 8.5);
      const classes = ['journey-neck-level'];
      if(i === LEVELS.length - 1) classes.push('mastery');
      if(active) classes.push('active');
      if(complete) classes.push('complete');
      if(!lit) classes.push('locked');
      const action = lit ? ' onclick="Journey.openLevel('+lp.num+')"' : ' disabled';
      const markerLabel = i === LEVELS.length - 1 ? 'Mastery' : 'L'+lp.num;
      const markerContent = i === LEVELS.length - 1
        ? '<span class="journey-mastery-icon"><img src="images/map-nodes-generated-v2-normalized/mastery.png" alt="" /></span>'
        : '<span>'+markerLabel+'</span>';
      const masteryMotion = i === LEVELS.length - 1
        ? '<i class="journey-mastery-orbit orbit-one"></i><i class="journey-mastery-orbit orbit-two"></i><i class="journey-mastery-orbit orbit-three"></i><b class="journey-mastery-particle particle-one"></b><b class="journey-mastery-particle particle-two"></b><b class="journey-mastery-particle particle-three"></b><b class="journey-mastery-particle particle-four"></b>'
        : '';
      html += '<button type="button" class="'+classes.join(' ')+'" aria-label="Level '+lp.num+'" title="Level '+lp.num+'" style="--lvl:'+esc(lp.color)+';--lvl-rgb:'+hexToRgb(lp.color)+';--pulse-delay:'+(i * .28).toFixed(2)+'s;top:'+top+'%"'+action+'>' +
        masteryMotion + markerContent +
      '</button>';
    });

    html += '</div>' +
    '</section>';
    return html;
  }

  function injectStyles(){
    if(document.getElementById('journey-style-v2')) return;
    const style = document.createElement('style');
    style.id = 'journey-style-v2';
    style.textContent = `
      .journey-shell{padding:20px;max-width:980px;margin:0 auto;color:var(--text)}
      .journey-home{display:flex;flex-direction:column;align-items:center}
      .journey-map-home{gap:14px}
      .journey-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,rgba(212,175,105,.14),rgba(13,11,8,.95));border:1px solid var(--border);border-radius:18px;padding:18px;margin-bottom:14px;box-shadow:0 14px 40px rgba(0,0,0,.25)}
      .journey-hero:after{content:"";position:absolute;inset:-30%;background:radial-gradient(circle at 70% 20%,rgba(232,160,32,.16),transparent 35%);pointer-events:none}
      .journey-kicker{font-family:JetBrains Mono,monospace;font-size:.58rem;color:var(--gold);letter-spacing:.16em;text-transform:uppercase}
      .journey-title{font-family:Cinzel,serif;font-size:1.5rem;color:var(--gold);margin:5px 0 4px;font-weight:800}
      .journey-sub{font-size:.78rem;color:var(--dim);line-height:1.55;max-width:720px}
      .journey-students{display:flex;gap:7px;flex-wrap:wrap;margin-top:13px;position:relative;z-index:1}
      .journey-chip{border:1px solid var(--border);background:rgba(26,23,20,.72);color:var(--dim);border-radius:999px;padding:8px 11px;font-size:.72rem;cursor:pointer}
      .journey-chip.on{border-color:var(--gold);color:var(--gold);box-shadow:0 0 16px rgba(212,175,105,.12)}
      .journey-student-bar{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;align-items:center;margin-bottom:8px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.07);border-radius:999px;padding:5px;max-width:720px;width:fit-content}
      .journey-home-title{font-family:Cinzel,serif;font-size:1.36rem;color:var(--gold);font-weight:800;letter-spacing:.03em;text-align:center;margin:0 0 10px}
      .journey-top-row{position:relative;z-index:20;display:flex;justify-content:center;width:100%}
      .journey-student-picker{position:relative}
      .journey-student-trigger{display:grid;grid-template-columns:1fr auto;grid-template-areas:"label icon" "name icon";align-items:center;column-gap:12px;min-width:210px;text-align:center;border:1px solid rgba(255,255,255,.12);background:rgba(24,22,19,.72);color:var(--text);border-radius:14px;padding:9px 12px;box-shadow:0 10px 24px rgba(0,0,0,.16);cursor:pointer;backdrop-filter:blur(14px)}
      .journey-student-trigger span{grid-area:label;font-family:JetBrains Mono,monospace;font-size:.53rem;letter-spacing:.13em;text-transform:uppercase;color:var(--dim)}
      .journey-student-trigger strong{grid-area:name;font-family:Cinzel,serif;font-size:.92rem;color:var(--gold);line-height:1.2;margin-top:2px}
      .journey-student-trigger b{grid-area:icon;color:var(--gold);font-size:.72rem;font-weight:800}
      .journey-student-menu{position:absolute;left:50%;top:calc(100% + 8px);transform:translateX(-50%) translateY(-4px);width:260px;display:none;padding:7px;background:rgba(18,16,14,.94);border:1px solid rgba(212,175,105,.18);border-radius:14px;box-shadow:0 18px 38px rgba(0,0,0,.34);backdrop-filter:blur(18px)}
      .journey-student-picker.open .journey-student-menu{display:block;transform:translateX(-50%) translateY(0)}
      .journey-student-option{display:grid;grid-template-columns:1fr auto;align-items:center;gap:6px;border-radius:10px}
      .journey-student-option.active{background:rgba(212,175,105,.08)}
      .journey-student-option > button:first-child{display:flex;flex-direction:column;align-items:flex-start;gap:2px;width:100%;border:0;background:transparent;color:var(--text);text-align:left;border-radius:10px;padding:9px 10px;cursor:pointer}
      .journey-student-option > button:first-child span{font-weight:800;font-size:.76rem}
      .journey-student-option > button:first-child small{font-size:.58rem;color:var(--dim)}
      .journey-student-remove{border:0;background:transparent;color:rgba(212,175,105,.44);font-size:.68rem;padding:8px 9px;cursor:pointer}
      .journey-student-add{width:100%;margin-top:6px;border:1px solid rgba(212,175,105,.18);background:rgba(212,175,105,.07);color:var(--gold);border-radius:10px;padding:9px 10px;font-weight:800;cursor:pointer}
      .journey-entry-stage{position:relative;display:flex;justify-content:center;align-items:flex-start;width:100%;min-height:min(860px,calc(100vh - 130px));padding-top:4px}
      .journey-map-guide{position:absolute;right:calc(50% + 220px);top:118px;z-index:8;display:flex;flex-direction:column;align-items:center;gap:0;width:230px}
      .journey-map-guide img{width:132px;height:158px;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 12px 22px rgba(0,0,0,.4));animation:char-float 3.4s ease-in-out infinite}
      .journey-map-bubble{position:relative;width:220px;background:rgba(13,11,8,.62);border:1px solid rgba(212,175,105,.28);border-radius:16px;padding:12px 13px;box-shadow:0 14px 32px rgba(0,0,0,.2);backdrop-filter:blur(14px)}
      .journey-map-bubble:before{content:"";position:absolute;left:50%;top:-7px;transform:translateX(-50%) rotate(45deg);width:12px;height:12px;background:rgba(13,11,8,.82);border-left:1px solid rgba(212,175,105,.28);border-top:1px solid rgba(212,175,105,.28)}
      .journey-map-bubble p{font-size:.72rem;color:var(--text);line-height:1.45;margin:7px 0 0}
      .journey-neck-stage{position:relative;width:min(400px,72vw);aspect-ratio:864/1821;margin:0 auto;overflow:visible;background:transparent url("images/journey-backgrounds/journey-guitar-map-transparent-v2.png") center/contain no-repeat;filter:drop-shadow(0 22px 34px rgba(0,0,0,.28))}
      .journey-neck-stage:before,.journey-neck-stage:after{display:none}
      .journey-guide-scene{position:absolute;left:34px;bottom:88px;z-index:8;display:flex;flex-direction:column;align-items:center;width:226px}
      .journey-guide-character{width:172px;height:236px;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 12px 22px rgba(0,0,0,.46));animation:char-float 3.4s ease-in-out infinite}
      .journey-guide-bubble.game{position:relative;width:100%;max-width:226px;background:rgba(13,11,8,.58);border:1px solid rgba(212,175,105,.3);border-radius:18px;padding:12px 13px;box-shadow:0 14px 34px rgba(0,0,0,.24);backdrop-filter:blur(14px)}
      .journey-guide-bubble.game:before{content:"";position:absolute;left:50%;top:-7px;transform:translateX(-50%) rotate(45deg);width:12px;height:12px;background:rgba(13,11,8,.78);border-left:1px solid rgba(212,175,105,.3);border-top:1px solid rgba(212,175,105,.3)}
      .journey-guide-bubble.game p{font-size:.74rem;color:var(--text);line-height:1.48;margin:7px 0 0}
      .journey-neck-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
      .journey-neck-progress{font-family:JetBrains Mono,monospace;font-size:.58rem;color:var(--dim);letter-spacing:.08em;text-transform:uppercase;margin-top:9px}
      .journey-hotspot-layer{position:absolute;inset:0;z-index:7;pointer-events:none}
      .journey-hotspot-layer .journey-neck-level{pointer-events:auto}
      .journey-neck-wrap{position:relative;z-index:4;display:flex;flex-direction:column;align-items:center;gap:0;min-width:0;padding-top:18px}
      .journey-neck-label{font-family:JetBrains Mono,monospace;font-size:.54rem;color:rgba(212,175,105,.72);letter-spacing:.14em;text-transform:uppercase;text-align:center;margin:0 0 4px}
      .journey-neck-label.bottom{color:var(--dim)}
      .journey-headstock{position:relative;width:168px;height:80px;margin-bottom:-4px;border-radius:24px 24px 14px 14px;background:linear-gradient(90deg,#20110b,#6c4329 48%,#20110b);border:1px solid rgba(212,175,105,.24);box-shadow:inset 0 0 20px rgba(0,0,0,.38),0 10px 28px rgba(0,0,0,.26)}
      .journey-headstock span{position:absolute;width:18px;height:18px;border-radius:999px;background:linear-gradient(180deg,#f4d49a,#7e552e);box-shadow:0 0 12px rgba(212,175,105,.22)}
      .journey-headstock span:nth-child(1){left:18px;top:18px}.journey-headstock span:nth-child(2){left:34px;bottom:15px}.journey-headstock span:nth-child(3){right:18px;top:18px}.journey-headstock span:nth-child(4){right:34px;bottom:15px}
      .journey-neck{position:relative;width:min(308px,76vw);height:590px;max-height:68vh;min-height:520px;border-radius:16px 16px 30px 30px;background:linear-gradient(90deg,#1e100a 0%,#4d2c1c 12%,#8a5632 48%,#4d2c1c 88%,#1e100a 100%);border:1px solid rgba(212,175,105,.34);box-shadow:inset 0 0 30px rgba(0,0,0,.56),0 18px 44px rgba(0,0,0,.32),0 0 34px rgba(212,175,105,.09);overflow:hidden}
      .journey-neck:before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.09),transparent 12%,transparent 86%,rgba(0,0,0,.22)),repeating-linear-gradient(90deg,rgba(255,255,255,.018) 0 1px,transparent 1px 19px);pointer-events:none}
      .journey-string{position:absolute;top:-98px;bottom:-20px;width:1px;background:linear-gradient(180deg,rgba(255,243,205,.56),rgba(255,243,205,.78),rgba(255,243,205,.4));box-shadow:0 0 8px rgba(255,228,174,.2);z-index:2}
      .journey-string.string-0{left:18%}.journey-string.string-1{left:31%}.journey-string.string-2{left:44%}.journey-string.string-3{left:56%}.journey-string.string-4{left:69%}.journey-string.string-5{left:82%}
      .journey-fret{position:absolute;left:7%;right:7%;height:2px;background:linear-gradient(90deg,rgba(255,243,205,.22),rgba(255,243,205,.66),rgba(255,243,205,.22));border-radius:99px;box-shadow:0 1px 0 rgba(0,0,0,.36);z-index:3}
      .journey-inlay{position:absolute;left:50%;transform:translate(-50%,-50%);width:10px;height:10px;border-radius:999px;background:radial-gradient(circle,rgba(255,235,180,.56),rgba(212,175,105,.08) 68%,transparent 70%);box-shadow:0 0 12px rgba(212,175,105,.14);z-index:1}
      .journey-neck-level{position:absolute;left:50%;transform:translate(-50%,-50%);z-index:6;width:48px;height:48px;border-radius:999px;border:1px solid rgba(255,245,204,.72);background:radial-gradient(circle at 50% 45%,rgba(255,255,245,.74) 0 5%,rgba(var(--lvl-rgb),.82) 11% 40%,rgba(var(--lvl-rgb),.34) 52%,rgba(13,11,8,.88) 82%);color:var(--text);cursor:pointer;display:grid;place-items:center;padding:0;box-shadow:inset 0 0 14px rgba(255,235,180,.18),0 8px 20px rgba(0,0,0,.28),0 0 28px rgba(var(--lvl-rgb),.42),0 0 18px rgba(212,175,105,.18);transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease;isolation:isolate}
      .journey-neck-level:before{content:"";position:absolute;inset:5px;border-radius:inherit;border:1px solid rgba(255,235,180,.14);pointer-events:none}
      .journey-neck-level:after{content:"";position:absolute;inset:-12px;border-radius:inherit;background:radial-gradient(circle,rgba(var(--lvl-rgb),.62) 0 22%,rgba(var(--lvl-rgb),.26) 44%,transparent 74%);opacity:.24;z-index:-1;pointer-events:none;animation:journey-level-pulse 4.2s ease-in-out infinite;animation-delay:var(--pulse-delay)}
      .journey-neck-level span{position:relative;z-index:2;display:grid;place-items:center;width:25px;height:25px;border-radius:999px;border:1px solid rgba(255,245,204,.28);background:rgba(8,7,6,.68);font-family:Cinzel,serif;color:#fff9dc;font-size:.7rem;font-weight:800;line-height:1;text-shadow:0 1px 4px rgba(0,0,0,.9)}
      .journey-neck-level small{position:absolute;z-index:1;bottom:-15px;font-family:JetBrains Mono,monospace;font-size:.48rem;color:rgba(255,226,166,.62);letter-spacing:.06em}
      .journey-neck-level:hover:not(:disabled){transform:translate(-50%,-50%) scale(1.08);box-shadow:inset 0 0 14px rgba(255,235,180,.16),0 10px 26px rgba(0,0,0,.34),0 0 34px rgba(var(--lvl-rgb),.56)}
      .journey-neck-level.active{width:60px;height:60px;border-color:#fff3c4;background:radial-gradient(circle at 50% 45%,rgba(255,255,245,1) 0 8%,rgba(var(--lvl-rgb),.95) 12% 44%,rgba(var(--lvl-rgb),.52) 56%,rgba(13,11,8,.86) 84%);box-shadow:0 0 0 4px rgba(255,245,204,.16),0 0 0 10px rgba(var(--lvl-rgb),.12),0 0 44px rgba(var(--lvl-rgb),.72),0 0 28px rgba(255,226,166,.4),0 12px 30px rgba(0,0,0,.3)}
      .journey-neck-level.active:after{opacity:.72;animation-duration:2.6s}
      .journey-neck-level.active span{border-color:rgba(255,245,204,.48);background:rgba(8,7,6,.78);box-shadow:0 0 14px rgba(var(--lvl-rgb),.42)}
      .journey-neck-level.mastery{width:82px;height:82px;border-color:rgba(255,245,204,.95);background:radial-gradient(circle at 50% 50%,rgba(255,244,188,.38) 0 14%,rgba(77,42,22,.78) 38%,rgba(10,8,7,.95) 72%),conic-gradient(from 0deg,rgba(255,83,83,.42),rgba(255,190,72,.42),rgba(255,236,96,.42),rgba(76,218,122,.42),rgba(69,177,255,.42),rgba(160,111,255,.42),rgba(255,83,83,.42));box-shadow:0 0 0 7px rgba(255,255,255,.04),0 0 32px rgba(255,210,106,.46),0 0 52px rgba(204,51,255,.56),0 0 64px rgba(83,177,255,.24),0 14px 28px rgba(0,0,0,.36)}
      .journey-neck-level.mastery:before{inset:-12px;border:2px solid transparent;background:conic-gradient(from 18deg,rgba(255,96,96,.92),rgba(255,193,84,.9),rgba(244,230,111,.9),rgba(103,214,131,.9),rgba(83,177,255,.9),rgba(170,128,255,.9),rgba(255,96,96,.92));mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;-webkit-mask-composite:xor;padding:2px;opacity:.9;animation:journey-mastery-ring 7.5s linear infinite}
      .journey-neck-level.mastery:after{inset:-24px;background:radial-gradient(circle,rgba(255,231,134,.45) 0 18%,rgba(255,106,83,.26) 30%,rgba(90,190,255,.22) 46%,rgba(170,112,255,.2) 60%,transparent 76%);filter:blur(8px);opacity:.42;animation:journey-mastery-pulse 4.8s ease-in-out infinite}
      .journey-neck-level.mastery span{width:46px;height:46px;border-radius:999px;background:radial-gradient(circle,rgba(8,7,6,.42),rgba(8,7,6,.68));font-size:.52rem;letter-spacing:.02em;text-transform:uppercase}
      .journey-neck-level.mastery .journey-mastery-icon{z-index:5;background:radial-gradient(circle,rgba(8,7,6,.25),rgba(8,7,6,.58));border-color:rgba(255,245,204,.18)}
      .journey-neck-level.mastery .journey-mastery-icon img{position:relative;z-index:6;width:52px;height:52px;object-fit:contain;filter:drop-shadow(0 0 6px rgba(255,226,166,.72)) drop-shadow(0 0 14px rgba(255,130,64,.4));pointer-events:none}
      .journey-neck-level.mastery .journey-mastery-orbit{position:absolute;left:50%;top:50%;border-radius:999px;border:2px dotted rgba(255,255,255,.55);pointer-events:none;z-index:1;transform:translate(-50%,-50%);mix-blend-mode:screen}
      .journey-neck-level.mastery .orbit-one{width:104px;height:104px;border-color:rgba(255,96,96,.78);animation:journey-mastery-orbit 8.5s linear infinite}
      .journey-neck-level.mastery .orbit-two{width:122px;height:122px;border-color:rgba(255,226,96,.68);animation:journey-mastery-orbit-reverse 11s linear infinite}
      .journey-neck-level.mastery .orbit-three{width:140px;height:140px;border-color:rgba(92,190,255,.64);animation:journey-mastery-orbit 14s linear infinite}
      .journey-neck-level.mastery .journey-mastery-particle{position:absolute;left:50%;top:50%;z-index:3;width:7px;height:7px;border-radius:999px;background:#fff0a8;box-shadow:0 0 10px currentColor,0 0 18px currentColor;pointer-events:none;transform-origin:0 0}
      .journey-neck-level.mastery .particle-one{color:#ff665f;animation:journey-mastery-particle 4.8s linear infinite}
      .journey-neck-level.mastery .particle-two{color:#ffe260;animation:journey-mastery-particle 6.2s linear infinite reverse;animation-delay:-1.4s}
      .journey-neck-level.mastery .particle-three{color:#5bd67d;animation:journey-mastery-particle-wide 7.4s linear infinite;animation-delay:-2.1s}
      .journey-neck-level.mastery .particle-four{color:#67b8ff;animation:journey-mastery-particle-wide 8.8s linear infinite reverse;animation-delay:-3.2s}
      .journey-neck-level.mastery small{display:none}
      .journey-neck-level.complete{background:radial-gradient(circle at 42% 35%,rgba(235,255,227,.42),rgba(63,170,94,.18) 42%,rgba(13,32,22,.86) 74%)}
      .journey-neck-level.locked{opacity:.74;cursor:not-allowed;filter:saturate(.95) brightness(.9)}
      .journey-body-arc{width:min(480px,92vw);height:120px;margin-top:-42px;border-radius:50% 50% 0 0;background:linear-gradient(180deg,rgba(92,50,27,.92),rgba(37,19,10,.92));border:1px solid rgba(212,175,105,.28);border-bottom:0;box-shadow:inset 0 18px 34px rgba(0,0,0,.34),0 -8px 28px rgba(212,175,105,.08)}
      .journey-grid{display:grid;grid-template-columns:minmax(220px,.75fr) 1.5fr;gap:14px}
      .journey-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px;box-shadow:0 8px 26px rgba(0,0,0,.16)}
      .journey-companion-card{width:100%;max-width:720px;background:rgba(20,18,15,.72);border:1px solid rgba(212,175,105,.18);border-radius:16px;padding:0;margin:0 0 16px;box-shadow:0 12px 26px rgba(0,0,0,.18);overflow:hidden}
      .journey-companion-card[open]{padding-bottom:14px}
      .journey-companion-summary{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:12px 14px;cursor:pointer;list-style:none}
      .journey-companion-summary::-webkit-details-marker{display:none}
      .journey-companion-summary strong{display:block;font-family:Cinzel,serif;color:var(--gold);font-size:.9rem;margin-top:2px}
      .journey-companion-summary > span:last-child{font-family:JetBrains Mono,monospace;color:var(--dim);font-size:.56rem;letter-spacing:.1em;text-transform:uppercase}
      .journey-companion-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px}
      .journey-companion-card .journey-companion-head,.journey-companion-card .journey-companion-focus,.journey-companion-card .journey-guide-note,.journey-companion-card .journey-companion-grid,.journey-companion-card .journey-next-action,.journey-companion-card .journey-flow-detail{margin-left:14px;margin-right:14px}
      .journey-companion-title{font-family:Cinzel,serif;color:var(--gold);font-weight:800;font-size:1.08rem;margin-top:3px}
      .journey-companion-focus{font-size:.76rem;color:var(--text);line-height:1.5;margin:0 0 10px}
      .journey-guide-note{font-size:.7rem;line-height:1.48;color:var(--dim);background:rgba(212,175,105,.07);border-left:2px solid var(--gold);border-radius:0 10px 10px 0;padding:9px 10px;margin-bottom:12px}
      .journey-companion-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
      .journey-mini-label{font-family:JetBrains Mono,monospace;color:var(--gold);font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px}
      .journey-pill-row{display:flex;flex-wrap:wrap;gap:6px}
      .journey-pill{border:1px solid rgba(212,175,105,.22);background:rgba(212,175,105,.07);border-radius:999px;padding:5px 8px;color:var(--text);font-size:.65rem;line-height:1.2}
      .journey-tight-list{margin:0;padding-left:16px;color:var(--dim);font-size:.67rem;line-height:1.45}
      .journey-tight-list li{margin:0 0 4px}
      .journey-next-action{margin-top:12px;font-size:.72rem;line-height:1.45;color:var(--text);background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:10px}
      .journey-flow-detail{margin-top:10px;color:var(--dim);font-size:.68rem}.journey-flow-detail summary{cursor:pointer;color:var(--gold);font-weight:700}
      .journey-companion-preview{width:100%;max-width:560px;display:flex;justify-content:space-between;align-items:center;gap:12px;background:rgba(20,18,15,.72);border:1px solid rgba(212,175,105,.18);border-radius:14px;padding:12px;margin:0 0 16px}
      .journey-preview-title{font-family:Cinzel,serif;color:var(--gold);font-size:.9rem;font-weight:800;margin-top:2px}.journey-preview-copy{font-size:.68rem;line-height:1.4;color:var(--dim);margin-top:4px}
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
      @keyframes journey-level-pulse{0%,100%{opacity:.2;transform:scale(.92)}50%{opacity:.52;transform:scale(1.18)}}
      @keyframes journey-mastery-pulse{0%,100%{opacity:.34;transform:scale(.94)}50%{opacity:.68;transform:scale(1.12)}}
      @keyframes journey-mastery-ring{to{transform:rotate(360deg)}}
      @keyframes journey-mastery-orbit{to{transform:translate(-50%,-50%) rotate(360deg)}}
      @keyframes journey-mastery-orbit-reverse{to{transform:translate(-50%,-50%) rotate(-360deg)}}
      @keyframes journey-mastery-particle{from{transform:rotate(0deg) translateX(58px) translate(-50%,-50%)}to{transform:rotate(360deg) translateX(58px) translate(-50%,-50%)}}
      @keyframes journey-mastery-particle-wide{from{transform:rotate(0deg) translateX(70px) translate(-50%,-50%)}to{transform:rotate(360deg) translateX(70px) translate(-50%,-50%)}}
      @media(max-width:860px){.journey-entry-stage{min-height:auto;display:flex;flex-direction:column;align-items:center;gap:12px}.journey-map-guide{position:static;order:2;width:min(280px,88vw)}.journey-neck-stage{order:1;width:min(340px,88vw)}.journey-map-bubble{width:min(250px,78vw)}}
      @media(max-width:720px){.journey-shell{padding:14px}.journey-grid,.journey-companion-grid{grid-template-columns:1fr}.journey-neck-stage{width:min(330px,92vw);background-size:contain}.journey-neck-wrap{padding-top:14px}.journey-headstock{width:140px;height:64px}.journey-neck{width:min(250px,74vw);height:520px;min-height:460px}.journey-body-arc{width:min(360px,92vw);height:95px}.journey-guide-scene{left:50%;bottom:38px;transform:translateX(-50%);width:min(300px,78vw)}.journey-guide-character{width:126px;height:174px}.journey-guide-bubble.game{max-width:250px}.journey-title{font-size:1.25rem}.journey-guide img{width:64px;height:64px}.journey-companion-head,.journey-companion-preview,.journey-companion-summary{align-items:flex-start;flex-direction:column}.journey-student-bar{border-radius:16px;width:100%;box-sizing:border-box}.journey-student-menu{width:min(280px,88vw)}}
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

    // Build level positions
    const levelPositions = LEVELS.map((l, i) => ({
      ...l,
      ls: student.levels[l.id] || {},
      unlocked: i === 0 || !!(student.levels[l.id]?.unlocked) || !!student.levels[LEVELS[i-1]?.id]?.complete
    }));

    let html = '<div class="journey-shell journey-home journey-map-home">';

    html += renderStudentPicker(state, student);
    html += '<div class="journey-entry-stage">';
    html += renderJourneyMapGuide(student);
    html += renderJourneyNeckStage(state, student, level, lvlState, levelPositions);
    html += '</div>';

    html += '</div>';
    root.innerHTML = html;
    bindStudentPickerClose();
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
    toggleStudentMenu(event){
      if(event) event.stopPropagation();
      const picker = event && event.currentTarget ? event.currentTarget.closest('.journey-student-picker') : null;
      if(!picker) return;
      const willOpen = !picker.classList.contains('open');
      document.querySelectorAll('.journey-student-picker.open').forEach(openPicker => {
        if(openPicker !== picker) openPicker.classList.remove('open');
      });
      picker.classList.toggle('open', willOpen);
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
