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
  const LEVEL_CAPABILITIES = window.JOURNEY_LEVEL_CAPABILITIES || {};
  const EVIDENCE_STAGES = window.JOURNEY_EVIDENCE_STAGES || [];
  const ACTIVITY_CAPABILITY_MAP = window.JOURNEY_LEVEL_ACTIVITY_CAPABILITY_MAP || {};
  const ROADMAP_CAPABILITY_MAP = window.JOURNEY_ROADMAP_CAPABILITY_MAP || {};
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
    if(panelId === 'p-lesson'){
      document.querySelectorAll('.top-tool').forEach(button => {
        button.classList.toggle('on', button.textContent.trim() === 'Journey');
      });
    }
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
      'images/character-generated/talking-guide-v1-ui.webp';
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
      jen.currentLevel = 1;
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
  function saveState(state){
    localStorage.setItem(STORE, JSON.stringify(state));
    if(state && state.activeStudentId) localStorage.setItem(ACTIVE, state.activeStudentId);
    if(typeof window !== 'undefined' && window.dispatchEvent){
      window.dispatchEvent(new CustomEvent('hearth:journey-state', { detail:{ activeStudentId:state && state.activeStudentId } }));
    }
  }
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
    syncStudentToAPI(student);
  }

  function journeyApiSyncEnabled(){
    return window.HEARTH_ENABLE_JOURNEY_API_SYNC === true ||
      localStorage.getItem('hearthJourneyApiSync') === 'on';
  }

  function syncStudentToAPI(student){
    if(!window.HearthAPI || !journeyApiSyncEnabled()) return;
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
    const activityMeta = Object.entries(ACTIVITY_CAPABILITY_MAP[level.id] || {}).find(([, value]) => value.sourceLessonNumber === lessonNum);
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
        categoryTags: authored.categoryTags || [],
        activityId: activityMeta ? activityMeta[0] : null,
        capabilityIds: activityMeta ? (activityMeta[1].capabilityIds || []).slice() : [],
        countsTowardLevel: authored.countsTowardLevel !== false && (!activityMeta || activityMeta[1].countsTowardLevel !== false),
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
    return '<details class="journey-companion-card" open>' +
      '<summary class="journey-companion-summary">' +
        '<span><span class="journey-kicker">'+esc(companion.label || 'Lesson Companion')+'</span>' +
        '<strong>'+esc(companion.title || 'Next lesson focus')+'</strong></span>' +
        '<span>Open Live Lesson</span>' +
      '</summary>' +
      '<div class="journey-companion-head">' +
        '<div>' +
          '<div class="journey-kicker">'+esc(companion.label || 'Lesson Companion')+'</div>' +
          '<div class="journey-companion-title">'+esc(companion.title || 'Next lesson focus')+'</div>' +
        '</div>' +
        '<div class="journey-actions compact">' +
        '<button type="button" class="journey-btn" onclick="Journey.openCompanionLesson(\''+student.id+'\')">Open Live Lesson</button>' +
          '<button class="journey-btn secondary" onclick="Journey.openLevel('+effectiveCurrentLevel(student).num+')">Open Path</button>' +
        '</div>' +
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
      '<div class="journey-actions compact">' +
        '<button type="button" class="journey-btn" onclick="Journey.openCompanionLesson(\''+companionStudent.id+'\')">Open Live Lesson</button>' +
        '<button class="journey-btn secondary" onclick="Journey.switchStudent(\''+companionStudent.id+'\')">Show Jen</button>' +
      '</div>' +
    '</div>';
  }

  function renderJourneyHomeActions(state, student){
    const companion = getCompanion(student);
    const companionStudent = companion ? student : findCompanionStudent(state);
    const currentLevel = effectiveCurrentLevel(student);
    let html = '<div class="journey-home-actions" aria-label="Journey actions">';
    html += '<button type="button" class="journey-btn journey-home-primary" onclick="Journey.openLevel('+(currentLevel.num || 1)+')">Open '+esc(currentLevel.name || 'Level')+'</button>';
    if(companion){
      html += '<button type="button" class="journey-btn secondary journey-home-secondary" onclick="Journey.openCompanionLesson(\''+student.id+'\')">Teacher Prep</button>';
    } else if(companionStudent){
      html += '<button type="button" class="journey-btn secondary journey-home-secondary" onclick="Journey.openCompanionLesson(\''+companionStudent.id+'\')">Jen Prep</button>';
    }
    html += '</div>';
    return html;
  }

  function renderStudentPicker(state, student){
    let html = '<div class="journey-top-row">' +
      '<div class="journey-student-picker">' +
        '<button type="button" class="journey-student-trigger" onclick="Journey.toggleStudentMenu(event)" aria-haspopup="menu">' +
          '<span>Active learner</span>' +
          '<strong>'+esc(student.name)+'</strong>' +
          '<b>v</b>' +
        '</button>' +
        '<div class="journey-student-menu" role="menu">';

    state.students.forEach(s => {
      const active = s.id === student.id;
      html += '<div class="journey-student-option '+(active ? 'active' : '')+'">' +
        '<button type="button" onclick="Journey.switchStudent(\''+s.id+'\')">' +
          '<span>'+esc(s.name)+'</span>' +
          '<small>'+(active ? 'Simulator profile' : 'Switch learner')+'</small>' +
        '</button>';
      if(state.students.length > 1){
        html += '<button type="button" class="journey-student-remove" onclick="Journey.removeStudent(\''+s.id+'\')" title="Remove '+esc(s.name)+'">x</button>';
      }
      html += '</div>';
    });

    html += '<button type="button" class="journey-student-add" onclick="Journey.addStudent()">+ Add profile</button>' +
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
      const active = lp.num === level.num;
      const complete = !!lp.complete;
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
        ? '<span class="journey-mastery-icon"><img src="images/journey-backgrounds/journey-mastery-phoenix-crop-v1.png" alt="" /></span>'
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

  function journeyRoadmapCategories(){
    return [
      { label:'Rhythm', icon:'R', iconImage:'images/journey-category-icons/rhythm.png', note:'Time feel, groove, pulse, strumming, subdivision, and rhythmic confidence.', levelLessons:{1:[1]} },
      { label:'Chords & Harmony', icon:'C', iconImage:'images/journey-category-icons/chords-harmony.png', note:'Open chords, chord changes, harmony, progressions, keys, and chord colour.', levelLessons:{1:[2,3]} },
      { label:'Scales', icon:'S', iconImage:'images/journey-category-icons/scales.png', note:'Pentatonic and scale maps, root notes, boxes, positions, and fretboard orientation.', levelLessons:{1:[4]} },
      { label:'Technique', icon:'T', iconImage:'images/journey-category-icons/technique.png', note:'Hands, clean tone, picking, fretting, strength, relaxation, and control.', levelLessons:{1:[5]} },
      { label:'Improvisation', icon:'I', iconImage:'images/journey-category-icons/improvisation.png', note:'Phrases, call and response, solo vocabulary, musical choices, and listening.', levelLessons:{1:[6]} },
      { label:'Picking', icon:'P', iconImage:'images/journey-category-icons/picking.png', note:'Right-hand patterns, pick direction, articulation, accents, and pulse control.', levelLessons:{1:[1]} },
      { label:'Fingerstyle', icon:'F', iconImage:'images/journey-category-icons/fingerstyle.png', note:'Finger independence, rest/free stroke, plucking patterns, and hand balance.', levelLessons:{} },
      { label:'Theory', icon:'Y', iconImage:'images/journey-category-icons/theory.png', note:'Names, intervals, chord-scale relationships, keys, forms, and useful music language.', levelLessons:{1:[1,2,4]} },
      { label:'Reading', icon:'N', iconImage:'images/journey-category-icons/reading.png', note:'Tab, notation, fretboard symbols, rhythm reading, and written music literacy.', levelLessons:{} },
      { label:'Integration', icon:'G', iconImage:'images/journey-category-icons/integration.png', note:'Songs, practice sets, performance, creation, reflection, and making the skills work together.', levelLessons:{1:[7,8]} }
    ];
  }

  function roadmapLevelText(category, level){
    const key = String(category.label || '').toLowerCase();
    const n = level.num || 1;
    const levelNames = {
      1: 'Level 1 builds the first usable version of this skill.',
      2: 'Level 2 strengthens coordination and closes early gaps.',
      3: 'Level 3 turns the skill into expression and simple music.',
      4: 'Level 4 adds structure, names, and clearer musical maps.',
      5: 'Level 5 expands movement, colour, and variation.',
      6: 'Level 6 integrates the skill into arrangements and repertoire.',
      7: 'Level 7 turns the skill into judgement and instinct.',
      8: 'Level 8 folds the skill into personal sound and mastery.'
    };
    const l1 = {
      rhythm: 'Steady pulse, quarter/eighth-note feel, and one-chord rhythm grids.',
      'chords & harmony': 'The open-chord set, clean sound, and common-finger changes.',
      scales: 'A minor pentatonic shape 1, root safety notes, and a clear first box.',
      technique: 'Relaxed hands, clean tone, slow repetitions, and small successful drills.',
      improvisation: 'Two-note phrases, call and response, and first blues solo vocabulary.',
      picking: 'Simple strumming and right-hand pulse without rushing.',
      fingerstyle: 'Basic touch awareness; deeper fingerstyle waits until later levels.',
      theory: 'Plain words for time feel, chords, pentatonic, roots, and musical context.',
      reading: 'Simple tab/fret references and rhythm symbols only when they help.',
      integration: 'A one-minute Level 1 demonstration: rhythm, chords, pentatonic phrase, reflect.'
    };
    if(n === 1 && l1[key]) return l1[key];
    return levelNames[n] || 'This level has not been fully authored yet, but this category will keep tracking progress.';
  }

  function categoryKey(label){
    return String(label || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();
  }

  function completedSourceLessons(student, level){
    const records = (student.levels[level.id] && student.levels[level.id].lessonRecords) || [];
    return new Set(records.filter(record => record && record.status === 'complete').map(record => Number(record.lessonNum)).filter(Boolean));
  }

  function countedLessonProgress(student, level){
    const authored = AUTHORED_LESSONS[level.id] || [];
    const completed = completedSourceLessons(student, level);
    let done = 0;
    let total = 0;
    authored.forEach((_, index) => {
      const lesson = buildLesson(student, level.num, index + 1);
      if(!lesson.countsTowardLevel) return;
      total += 1;
      if(completed.has(index + 1)) done += 1;
    });
    return { done, total, completed };
  }

  function nextSourceLessonNumber(student, level){
    const authored = AUTHORED_LESSONS[level.id] || [];
    const completed = completedSourceLessons(student, level);
    for(let sourceNumber = 1; sourceNumber <= authored.length; sourceNumber += 1){
      if(!completed.has(sourceNumber)) return sourceNumber;
    }
    return Math.max(1, authored.length);
  }

  function countedLessonNumber(level, sourceLessonNumber){
    const authored = AUTHORED_LESSONS[level.id] || [];
    let count = 0;
    for(let sourceNumber = 1; sourceNumber <= authored.length; sourceNumber += 1){
      const lesson = buildLesson(null, level.num, sourceNumber);
      if(lesson.countsTowardLevel) count += 1;
      if(sourceNumber === sourceLessonNumber) return lesson.countsTowardLevel ? count : 0;
    }
    return 0;
  }

  function journeyEvidenceEvents(){
    if(!window.HearthProgressEvents) return [];
    try {
      if(typeof window.HearthProgressEvents.listNormalized === 'function') return window.HearthProgressEvents.listNormalized(localStorage) || [];
      if(typeof window.HearthProgressEvents.list === 'function') return window.HearthProgressEvents.list(localStorage) || [];
    } catch(e){}
    return [];
  }

  function journeyLevelProgress(student, level){
    const capabilities = LEVEL_CAPABILITIES[level.id] || [];
    if(window.HearthJourneyProgress && typeof window.HearthJourneyProgress.summarize === 'function'){
      return window.HearthJourneyProgress.summarize({
        events: journeyEvidenceEvents(),
        learnerId: student.id,
        levelId: level.id,
        capabilities,
        evidenceStages: EVIDENCE_STAGES,
        eventContract: window.HearthProgressEventContract
      });
    }
    return {
      levelId: level.id,
      learnerId: student.id,
      capabilityEvidence: {},
      metRequired: 0,
      totalRequired: capabilities.filter(capability => capability.required !== false).length,
      encountered: 0,
      totalCapabilities: capabilities.length,
      percent: 0,
      complete: false
    };
  }

  function effectiveCurrentLevel(student){
    const levelOne = getLevel(1);
    if((student.currentLevel || 1) > 1 && !journeyLevelProgress(student, levelOne).complete) return levelOne;
    return getLevel(student.currentLevel || 1);
  }

  function isLevelUnlocked(student, levelNum){
    if(levelNum <= 1) return true;
    if(levelNum === 2) return journeyLevelProgress(student, getLevel(1)).complete;
    const previous = student.levels['L'+(levelNum-1)] || {};
    return !!previous.complete;
  }

  function roadmapCapabilitySummary(level, category, progress){
    const ids = ((ROADMAP_CAPABILITY_MAP[level.id] || {})[categoryKey(category.label)] || []).slice();
    const evidence = progress.capabilityEvidence || {};
    const items = ids.map(id => evidence[id]).filter(Boolean);
    const met = items.filter(item => item.met).length;
    const encountered = items.filter(item => item.stage && item.stage !== 'not_encountered').length;
    return {
      ids,
      met,
      encountered,
      total: ids.length,
      complete: ids.length > 0 && met === ids.length,
      percent: ids.length ? Math.round((met / ids.length) * 100) : 0
    };
  }

  function categorySignals(label){
    const signals = {
      rhythm:['rhythm','time feel','pulse','metronome','bpm','strum','strumming','quarter','eighth','count','groove','grid'],
      'chords and harmony':['chord','chords','harmony','progression','open chord','common finger','transition','changes','major','minor'],
      scales:['scale','scales','pentatonic','root','box','shape','fretboard map','position'],
      technique:['technique','clean','tone','buzz','buzzing','tension','fretting','finger','fingers','hand','chromatic','relax','strength'],
      improvisation:['improvise','improvisation','solo','blues','phrase','phrasing','call and response','call','answer','lick'],
      picking:['picking','pick','right hand','right-hand','down-up','alternate picking','down stroke','up stroke','articulation','accents'],
      fingerstyle:['fingerstyle','finger style','rest stroke','free stroke','plucking','pluck','thumb','independence'],
      theory:['theory','concept','explain','plain words','relationship','key','interval','names','means','context','why','chord-scale'],
      reading:['reading','tab','notation','symbol','written','chart','diagram'],
      integration:['song','application','apply','create','creation','routine','practice set','performance','demonstration','combine','together','reflect']
    };
    return signals[categoryKey(label)] || [];
  }

  function lessonSearchText(lesson){
    const parts = [lesson.title, lesson.summary].concat(lesson.conceptNames || [], lesson.taskNames || []);
    (lesson.blocks || []).forEach(block => {
      parts.push(block.phase, block.source, block.title, block.body, block.prompt);
    });
    return parts.filter(Boolean).join(' ').toLowerCase();
  }

  function lessonTouchesCategory(lesson, category){
    const explicit = (lesson.categoryTags || lesson.categories || []).map(categoryKey);
    if(explicit.includes(categoryKey(category.label))) return true;
    const text = lessonSearchText(lesson);
    return categorySignals(category.label).some(signal => text.indexOf(signal) >= 0);
  }

  function fallbackCategoryLessonNumbers(level, category){
    const raw = (category.levelLessons && category.levelLessons[level.num]) || [];
    return raw.slice();
  }

  function journeyCategoryLessonNumbers(level, category){
    const found = [];
    const authoredCount = (AUTHORED_LESSONS[level.id] || []).length || level.totalLessons;
    for(let i = 1; i <= authoredCount; i++){
      const lesson = buildLesson(null, level.num, i);
      if(!lesson.countsTowardLevel) continue;
      if(lessonTouchesCategory(lesson, category)) found.push(i);
    }
    const fallback = fallbackCategoryLessonNumbers(level, category);
    const combined = found.length ? found.concat(fallback) : fallback;
    return [...new Set(combined)].filter(n => n >= 1 && n <= authoredCount).sort((a,b) => a-b);
  }

  function journeyNextActionText(student, level, lessons, lessonsDone, nextLesson, activeCategory, levelComplete){
    if(levelComplete){
      return {
        kicker:'Next action',
        title:'Review and strengthen before the next level',
        body:'This level is complete. Use the map to choose the category that needs the most gentle repetition before moving on.'
      };
    }
    const lesson = lessons[nextLesson - 1] || buildLesson(student, level.num, nextLesson);
    const cleanTitle = (lesson.title || ('Lesson '+nextLesson)).replace(/^Lesson\s+\d+:\s*/i, '');
    return {
      kicker:'Next action',
      title:lesson.countsTowardLevel === false ? cleanTitle : (lesson.title || cleanTitle),
      body:lesson.summary || 'Open the next lesson and keep the step small enough to succeed.'
    };
  }

  function journeyStudySignal(){
    if(!window.StudyKeyChamberModel || typeof window.StudyKeyChamberModel.snapshot !== 'function') return null;
    let snapshot;
    try { snapshot = window.StudyKeyChamberModel.snapshot({ storage: localStorage }); } catch(e){ return null; }
    const evidence = snapshot && snapshot.record && snapshot.record.lastEvidence;
    if(!evidence || !snapshot.subject) return null;
    const door = (snapshot.doors || []).find(item => item.id === evidence.doorId);
    if(evidence.needsReview){
      return {
        kicker:'Study signal',
        title:'Return to '+(door ? door.label : 'Study')+': '+snapshot.subject.title,
        body:'Study found an edge worth repeating. Keep this idea small before adding the next lesson layer.'
      };
    }
    return {
      kicker:'Study signal',
      title:'Apply '+snapshot.subject.title+' in Practice',
      body:'This idea is clear enough for now. Bring it into the next musical or physical task and let the result teach you more.'
    };
  }

  function journeyDoingEvents(){
    if(!window.HearthProgressEvents || typeof window.HearthProgressEvents.list !== 'function') return [];
    try { return window.HearthProgressEvents.list(localStorage) || []; } catch(e){ return []; }
  }

  function journeyDoingEvidence(events, student, level, category){
    const bridge = window.HearthDoingProgressBridge;
    if(!bridge || typeof bridge.summaryForJourneyCategory !== 'function') return null;
    return bridge.summaryForJourneyCategory(events, student.id, category.label, level.num);
  }

  function renderLevelEntry(num){
    injectStyles();
    showPanel('p-lesson');
    const root = getJourneyRoot();
    if(!root) return;
    const state = loadState();
    const student = activeStudent(state);
    const level = getLevel(num);
    const lvlState = student.levels[level.id] || {};
    const companion = getCompanion(student);
    const lessons = AUTHORED_LESSONS[level.id] || [];
    const lessonProgress = countedLessonProgress(student, level);
    const lessonsDone = lessonProgress.done;
    const nextLesson = nextSourceLessonNumber(student, level);
    const progress = journeyLevelProgress(student, level);
    const pct = progress.percent;
    const legacyCompletionClaim = !progress.complete && (!!lvlState.complete || (lvlState.lessonsDone || 0) >= level.totalLessons);
    const guideLine = progress.complete
      ? level.name+' is complete. Review the category map, then decide what needs strengthening before the next level.'
      : legacyCompletionClaim
        ? level.name+' is in consolidation. Earlier lesson records are kept, but the level stays open until the skills are demonstrated.'
      : 'Stay with '+level.name+'. Each dot shows what this level asks from that category.';
    const actionLabel = companion ? 'Open Live Lesson' : progress.complete ? 'Review '+level.name : lessonsDone > 0 ? 'Continue '+level.name : 'Start Entry Check';
    const categories = journeyRoadmapCategories();
    const doingEvents = journeyDoingEvents();
    const categoryLessons = {};
    const categoryProgress = {};
    categories.forEach(section => {
      categoryLessons[section.label] = journeyCategoryLessonNumbers(level, section);
      categoryProgress[section.label] = roadmapCapabilitySummary(level, section, progress);
    });
    const activeCategory = categories.find(section => categoryProgress[section.label].encountered > 0 && !categoryProgress[section.label].complete) ||
      categories.find(section => categoryProgress[section.label].total > 0 && !categoryProgress[section.label].complete);
    const nextAction = companion ? {
      kicker:'Live lesson',
      title: companion.title || 'Lesson companion',
      body: companion.nextAction || companion.focus || 'Open the live lesson companion for today.'
    } : journeyNextActionText(student, level, lessons, lessonsDone, nextLesson, activeCategory, progress.complete);
    const studySignal = journeyStudySignal();
    if(studySignal && !companion) Object.assign(nextAction, studySignal);

    let html = '<div class="journey-shell journey-level-entry" style="--journey-level-color:'+attr(level.color)+';--journey-level-rgb:'+hexToRgb(level.color)+';--journey-level-progress:'+pct+'%">';
    html += '<div class="journey-level-command-row"><button class="back-btn" onclick="Journey.render()">← Back</button>'+renderStudentPicker(state, student)+'</div>';

    html += '<section class="journey-level-entry-stage" aria-label="'+attr(level.name)+' curriculum path">';
    html += '<aside class="journey-entry-guide">';
    html += '<img src="'+attr(guideAsset(journeyGuideMood(student, Object.assign({}, lvlState, { complete:progress.complete }))))+'" alt="" />';
    html += '<div class="journey-entry-bubble"><div class="journey-kicker">Guide</div><p>'+esc(guideLine)+'</p></div>';
    html += '</aside>';

    html += '<div class="journey-level-map">';
    html += '<div class="journey-level-map-head">';
    html += '<div><div class="journey-kicker">'+esc(student.name)+' · '+esc(level.tag || level.name)+'</div><h2>'+esc(level.name)+' Roadmap</h2><p>'+esc(level.focus || 'A clear overview of what this level teaches before the lesson begins.')+'</p></div>';
    html += '<div class="journey-level-progress"><strong>'+progress.metRequired+'/'+progress.totalRequired+'</strong><span>capabilities</span><i><b style="width:'+pct+'%"></b></i><small>'+lessonProgress.done+'/'+lessonProgress.total+' guided lessons recorded</small></div>';
    html += '</div>';

    html += '<div class="journey-roadmap-board" aria-label="Journey category roadmap">';
    categories.forEach((section, sectionIndex) => {
      const doingEvidence = journeyDoingEvidence(doingEvents, student, level, section);
      const capabilitySummary = categoryProgress[section.label];
      const sectionPct = capabilitySummary.percent;
      const isActiveCategory = activeCategory === section;
      const completeCategory = capabilitySummary.complete;
      const sectionStatus = completeCategory ? 'Done' : capabilitySummary.encountered ? 'In progress' : capabilitySummary.total ? 'Not yet' : 'Later';
      const sectionClasses = ['journey-roadmap-section'];
      if(isActiveCategory) sectionClasses.push('active-category');
      if(completeCategory) sectionClasses.push('complete-category');
      if(doingEvidence) sectionClasses.push('has-doing-evidence');
      html += '<section class="'+sectionClasses.join(' ')+'" style="--row-index:'+sectionIndex+';--section-progress:'+sectionPct+'%">';
      html += '<div class="journey-roadmap-section-head">';
      html += '<span class="journey-category-icon">'+(section.iconImage ? '<img src="'+attr(section.iconImage)+'" alt="" />' : esc(section.icon || (sectionIndex + 1)))+'</span>';
      html += '<div><h3>'+esc(section.label)+'</h3><p>'+esc(section.note)+'</p>'+(doingEvidence ? '<em class="journey-roadmap-practice">'+esc(doingEvidence.label)+'</em>' : '')+'</div>';
      html += '<small class="'+(isActiveCategory ? 'is-next' : completeCategory ? 'is-done' : capabilitySummary.total ? '' : 'is-later')+'">'+sectionStatus+'</small>';
      html += '</div>';
      html += '<div class="journey-roadmap-levels">';
      LEVELS.forEach(lp => {
        const lpState = student.levels[lp.id] || {};
        const isSelected = lp.num === level.num;
        const done = lp.num === 1 ? journeyLevelProgress(student, lp).complete : !!lpState.complete;
        const current = isSelected && !done;
        const unlocked = isLevelUnlocked(student, lp.num);
        const classes = ['journey-roadmap-level-dot'];
        if(done) classes.push('done');
        if(current) classes.push('current');
        if(isSelected) classes.push('selected');
        if(!unlocked) classes.push('locked');
        if(!unlocked && lp.num > level.num) classes.push('future');
        if(!unlocked && lp.num === Math.min(LEVELS.length, level.num + 1)) classes.push('preparing');
        const dotPct = isSelected ? sectionPct : done ? 100 : 0;
        const title = lp.name+' · '+section.label+': '+roadmapLevelText(section, lp)+(isSelected && doingEvidence ? ' · '+doingEvidence.label : '');
        const click = unlocked ? ' onclick="Journey.openLevel('+lp.num+')"': ' disabled';
        html += '<button type="button" class="'+classes.join(' ')+'" style="--dot-color:'+attr(lp.color)+';--dot-rgb:'+hexToRgb(lp.color)+';--dot-progress:'+dotPct+'%"'+click+' title="'+attr(title)+'" aria-label="'+attr(title)+'">';
        html += '<b>L'+lp.num+'</b>';
        html += '<span>'+esc(roadmapLevelText(section, lp))+'</span>';
        html += '</button>';
      });
      html += '</div>';
      html += '</section>';
    });
    html += '</div>';

    html += '<div class="journey-level-entry-foot">';
    html += '<div class="journey-next-step-card"><div class="journey-kicker">'+esc(nextAction.kicker)+'</div><strong>'+esc(nextAction.title)+'</strong><p>'+esc(nextAction.body)+'</p></div>';
    html += '<div class="journey-entry-actions">';
    html += '<button class="journey-btn journey-begin-btn" onclick="Journey.beginLevel('+level.num+')">'+esc(actionLabel)+'</button>';
    if(companion){
      html += '<button class="journey-btn secondary" onclick="Journey.openLesson('+(level.num)+','+nextLesson+')">Open Level Lesson</button>';
    }
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</section>';
    html += '</div>';

    root.innerHTML = html;
    bindStudentPickerClose();
  }

  function companionStepMinutes(index){
    return [5, 7, 7, 9, 9, 8, 8, 4, 3][index] || 5;
  }

  function companionLessonSteps(companion){
    const flow = companion.lessonFlow || [];
    const buttons = companion.lessonButtons || [];
    return flow.map((step, index) => {
      const colon = step.indexOf(':');
      const fallbackLabel = colon >= 0 ? step.slice(0, colon).trim() : 'Step '+(index + 1);
      const fallbackAction = colon >= 0 ? step.slice(colon + 1).trim() : step;
      return Object.assign({
        label: fallbackLabel,
        source: 'Journey',
        aim: fallbackAction,
        action: fallbackAction,
        prompt: 'What should we notice before moving on?',
        min: companionStepMinutes(index)
      }, buttons[index] || {});
    });
  }

  function renderCompanionLesson(studentId, saved){
    injectStyles();
    showPanel('p-lesson');
    const root = getJourneyRoot();
    if(!root) return;
    const state = loadState();
    let student = state.students.find(s => s.id === studentId) || activeStudent(state);
    if(!getCompanion(student)){
      student = findCompanionStudent(state) || student;
    }
    const companion = getCompanion(student);
    if(!companion){
      render();
      return;
    }
    state.activeStudentId = student.id;
    saveState(state);
    const level = effectiveCurrentLevel(student);
    const guideImage = guideAsset('encouraging');
    const lessonSteps = companionLessonSteps(companion);
    const totalMinutes = lessonSteps.reduce((sum, step) => sum + (step.min || 0), 0);
    const commitment = companion.commitment || {};
    const commitmentPct = Math.max(0, Math.min(100, Number(commitment.progressPercent || 0)));

    let html = '<div class="journey-shell journey-live-companion">';
    html += '<div class="journey-level-command-row"><button class="back-btn" onclick="Journey.render()">← Back</button>'+renderStudentPicker(state, student)+'</div>';
    html += '<section class="journey-live-stage">';
    html += '<aside class="journey-live-guide"><img src="'+attr(guideImage)+'" alt="" /><div class="journey-entry-bubble"><div class="journey-kicker">Guide</div><p>Keep this lesson calm and useful. Consolidate first, then make it musical.</p></div></aside>';
    html += '<div class="journey-live-panel">';
    html += '<div class="journey-live-head"><div><div class="journey-kicker">'+esc(student.name)+' · '+esc(level.id || 'Journey')+'</div><h2>'+esc(companion.title || 'Live lesson companion')+'</h2><p>'+esc(companion.focus || '')+'</p></div><div class="journey-level-progress"><strong>'+totalMinutes+'</strong><span>minutes</span><i><b style="width:100%"></b></i></div></div>';
    html += '<div class="journey-live-rule"><strong>Main rule:</strong> '+esc(companion.mainRule || 'No new challenge unless Jen is relaxed, clear, and asking for it. The win is pattern recognition and musical confidence.')+'</div>';
    if(companion.mapClue){
      html += '<div class="journey-map-clue-card">' +
        '<div class="journey-kicker">Map clue</div>' +
        '<strong>'+esc(companion.mapClue.title || 'Useful map clue')+'</strong>' +
        '<p class="journey-map-clue-phrase">'+esc(companion.mapClue.phrase || '')+'</p>' +
        '<div class="journey-map-clue-grid">' +
          '<span><b>Use:</b> '+esc(companion.mapClue.use || '')+'</span>' +
          '<span><b>Avoid:</b> '+esc(companion.mapClue.avoid || '')+'</span>' +
        '</div>' +
      '</div>';
    }
    if(saved) html += '<div class="journey-save-confirm">Saved. This lesson note is now part of Jen\'s Journey memory.</div>';
    html += '<div class="journey-commit-strip">' +
      '<div class="journey-commit-main">' +
        '<div class="journey-kicker">Practice Thread</div>' +
        '<strong>'+esc(commitment.title || 'Gentle practice commitment')+'</strong>' +
        '<span>Day '+esc(commitment.currentDay || 1)+' / '+esc(commitment.totalDays || 7)+' · '+esc(commitment.today || 'today is a small repeatable contact')+'</span>' +
      '</div>' +
      '<div class="journey-commit-meter" aria-label="Practice commitment progress">' +
        '<i><b style="width:'+commitmentPct+'%"></b></i>' +
        '<small>'+commitmentPct+'%</small>' +
      '</div>' +
      '<div class="journey-tomorrow-card"><span>Tomorrow</span><strong>'+esc(commitment.tomorrow || 'Repeat the useful step before adding more.')+'</strong></div>' +
    '</div>';
    if(companion.latestReview){
      const review = companion.latestReview;
      html += '<div class="journey-latest-review">' +
        '<div class="journey-kicker">Latest Lesson Result</div>' +
        '<div class="journey-latest-review-grid">' +
          '<span><b>Home:</b> '+esc(review.feltHome || '')+'</span>' +
          '<span><b>Musical:</b> '+esc(review.mostMusical || '')+'</span>' +
          '<span><b>Enjoyed:</b> '+esc(review.enjoyed || '')+'</span>' +
          '<span><b>Helped:</b> '+esc(review.helped || '')+'</span>' +
          '<span><b>Repeat:</b> '+esc(review.needs || '')+'</span>' +
          '<span><b>Commit:</b> '+esc(review.commitment || '')+'</span>' +
        '</div>' +
        '<strong class="journey-latest-next">Next: '+esc(review.nextLesson || '')+'</strong>' +
      '</div>';
    }
    html += '<div class="journey-live-flow">';
    html += '<div class="journey-live-step-buttons journey-widget-path" role="list" aria-label="Lesson widgets">';
    lessonSteps.forEach((step, index) => {
      const stepIcon = step.iconImage
        ? '<img src="'+attr(step.iconImage)+'" alt="" />'
        : '<i>'+esc(step.icon || String(index + 1).padStart(2, '0'))+'</i>';
      html += '<button type="button" class="journey-live-step-btn '+(index === 0 ? 'active' : '')+'" data-step="'+index+'" onclick="Journey.focusCompanionStep('+index+')">' +
        '<span class="journey-widget-orb">'+stepIcon+'</span>' +
        '<strong>'+esc(step.label)+'</strong>' +
        '<small>'+esc(String(step.min || companionStepMinutes(index)))+' min · '+esc(step.source)+'</small>' +
        '<em>Open step</em>' +
      '</button>';
    });
    html += '</div>';
    html += '<div class="journey-live-focus-stack">';
    lessonSteps.forEach((step, index) => {
      html += '<section class="journey-live-focus '+(index === 0 ? 'active' : '')+'" data-step-panel="'+index+'">' +
        '<div class="journey-live-focus-top"><span>'+String(index + 1).padStart(2, '0')+'</span><div><div class="journey-kicker">'+esc(step.source)+'</div><h3>'+esc(step.label)+'</h3></div><small>'+esc(String(step.min || companionStepMinutes(index)))+' min</small></div>' +
        '<p class="journey-live-aim">'+esc(step.aim || '')+'</p>' +
        '<div class="journey-live-action"><strong>Do this:</strong> '+esc(step.action || '')+'</div>' +
        '<div class="journey-live-prompt"><strong>Notice:</strong> '+esc(step.prompt || '')+'</div>' +
        (step.studyHandoff ? '<div class="journey-actions" style="margin-top:12px"><button type="button" class="journey-btn" onclick="Journey.openCompanionStudy(\''+attr(student.id)+'\','+index+')">'+esc(step.studyHandoff.label || 'Open Study')+'</button></div>' : '') +
        (step.doingHandoff ? '<div class="journey-actions" style="margin-top:12px"><button type="button" class="journey-btn" onclick="Journey.openCompanionDoing(\''+attr(student.id)+'\','+index+')">'+esc(step.doingHandoff.label || 'Open drill')+'</button></div>' : '') +
        (step.playHandoff ? '<div class="journey-actions" style="margin-top:8px"><button type="button" class="journey-btn" onclick="Journey.openCompanionPlay(\''+attr(student.id)+'\','+index+')">'+esc(step.playHandoff.label || 'Open Play')+'</button></div>' : '') +
        (step.createHandoff ? '<div class="journey-actions" style="margin-top:12px"><button type="button" class="journey-btn secondary" onclick="Journey.openCompanionCreate(\''+attr(student.id)+'\','+index+')">'+esc(step.createHandoff.label || 'Make it yours')+'</button></div>' : '') +
      '</section>';
    });
    html += '</div>';
    html += '</div>';
    html += '<div class="journey-companion-grid live">' +
      '<div><div class="journey-mini-label">Doorways</div><div class="journey-pill-row">'+renderPillList(companion.doorway)+'</div></div>' +
      '<div><div class="journey-mini-label">Anchors To Repeat</div>'+renderSmallList(companion.anchors)+'</div>' +
      '<div><div class="journey-mini-label">Gaps To Watch</div>'+renderSmallList(companion.gaps)+'</div>' +
      '<div><div class="journey-mini-label">Practice Thread</div>'+renderSmallList(companion.practice)+'</div>' +
    '</div>';
    html += '<div class="journey-card journey-live-notes"><div class="journey-kicker">After The Lesson</div>';
    if(companion.reviewPrompts && companion.reviewPrompts.length){
      html += '<div class="journey-review-prompts">';
      companion.reviewPrompts.forEach(prompt => {
        html += '<label><input type="checkbox"> '+esc(prompt)+'</label>';
      });
      html += '</div>';
    }
    html +=
      '<textarea class="journey-input" id="journey-companion-note" placeholder="What happened? What worked? What felt messy?"></textarea>' +
      '<textarea class="journey-input" id="journey-companion-next" placeholder="Next safe step for Jen..." style="margin-top:8px"></textarea>' +
      '<div class="journey-actions"><button class="journey-btn secondary" onclick="Journey.openLevel('+level.num+')">Open '+esc(level.id || 'Level')+' Roadmap</button><button class="journey-btn" onclick="Journey.saveCompanionLessonNote(\''+student.id+'\')">Save Jen Note</button></div>' +
    '</div>';
    html += '</div></section></div>';
    root.innerHTML = html;
    bindStudentPickerClose();
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
      .journey-level-command-row{width:min(1384px,100%);display:flex;align-items:center;justify-content:space-between;gap:16px;position:relative;z-index:30}
      .journey-level-command-row .journey-top-row{width:auto;justify-content:flex-end}
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
      .journey-home-actions{position:relative;z-index:12;display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap;margin:-12px auto 0;padding:8px 10px;width:fit-content;max-width:min(520px,92vw);border:1px solid rgba(212,175,105,.16);border-radius:999px;background:rgba(13,11,8,.58);box-shadow:0 14px 34px rgba(0,0,0,.22);backdrop-filter:blur(14px)}
      .journey-home-actions .journey-btn{min-width:132px;border-radius:999px;padding:10px 16px}
      .journey-home-primary{box-shadow:0 0 22px rgba(212,175,105,.16)}
      .journey-home-secondary{background:rgba(13,11,8,.46)}
      .journey-entry-stage{position:relative;display:flex;justify-content:center;align-items:flex-start;width:100%;min-height:min(860px,calc(100vh - 130px));padding-top:4px}
      .journey-map-guide{position:absolute;right:calc(50% + 220px);top:118px;z-index:8;display:flex;flex-direction:column;align-items:center;gap:0;width:230px}
      .journey-map-guide img{width:132px;height:158px;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 8px 14px rgba(0,0,0,.38));animation:char-float 5.5s ease-in-out infinite}
      .journey-map-bubble{position:relative;width:220px;background:rgba(13,11,8,.62);border:1px solid rgba(212,175,105,.28);border-radius:16px;padding:12px 13px;box-shadow:0 14px 32px rgba(0,0,0,.2);backdrop-filter:blur(14px)}
      .journey-map-bubble:before{content:"";position:absolute;left:50%;top:-7px;transform:translateX(-50%) rotate(45deg);width:12px;height:12px;background:rgba(13,11,8,.82);border-left:1px solid rgba(212,175,105,.28);border-top:1px solid rgba(212,175,105,.28)}
      .journey-map-bubble p{font-size:.72rem;color:var(--text);line-height:1.45;margin:7px 0 0}
      .journey-neck-stage{position:relative;width:min(400px,72vw);aspect-ratio:864/1821;margin:0 auto;overflow:visible;background:transparent url("images/journey-backgrounds/journey-guitar-map-transparent-v2.png") center/contain no-repeat;filter:drop-shadow(0 14px 22px rgba(0,0,0,.24))}
      .journey-neck-stage:before,.journey-neck-stage:after{display:none}
      .journey-guide-scene{position:absolute;left:34px;bottom:88px;z-index:8;display:flex;flex-direction:column;align-items:center;width:226px}
      .journey-guide-character{width:172px;height:236px;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 8px 15px rgba(0,0,0,.44));animation:char-float 5.5s ease-in-out infinite}
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
      .journey-neck-level:after{content:"";position:absolute;inset:-12px;border-radius:inherit;background:radial-gradient(circle,rgba(var(--lvl-rgb),.62) 0 22%,rgba(var(--lvl-rgb),.22) 44%,transparent 74%);opacity:.18;z-index:-1;pointer-events:none;transform:scale(.98)}
      .journey-neck-level span{position:relative;z-index:2;display:grid;place-items:center;width:25px;height:25px;border-radius:999px;border:1px solid rgba(255,245,204,.28);background:rgba(8,7,6,.68);font-family:Cinzel,serif;color:#fff9dc;font-size:.7rem;font-weight:800;line-height:1;text-shadow:0 1px 4px rgba(0,0,0,.9)}
      .journey-neck-level small{position:absolute;z-index:1;bottom:-15px;font-family:JetBrains Mono,monospace;font-size:.48rem;color:rgba(255,226,166,.62);letter-spacing:.06em}
      .journey-neck-level:hover:not(:disabled){transform:translate(-50%,-50%) scale(1.08);box-shadow:inset 0 0 14px rgba(255,235,180,.16),0 10px 26px rgba(0,0,0,.34),0 0 34px rgba(var(--lvl-rgb),.56)}
      .journey-neck-level.active{width:60px;height:60px;border-color:#fff3c4;background:radial-gradient(circle at 50% 45%,rgba(255,255,245,1) 0 8%,rgba(var(--lvl-rgb),.95) 12% 44%,rgba(var(--lvl-rgb),.52) 56%,rgba(13,11,8,.86) 84%);box-shadow:0 0 0 4px rgba(255,245,204,.16),0 0 0 10px rgba(var(--lvl-rgb),.12),0 0 44px rgba(var(--lvl-rgb),.72),0 0 28px rgba(255,226,166,.4),0 12px 30px rgba(0,0,0,.3)}
      .journey-neck-level.active:after{opacity:.72;animation:journey-level-pulse 3.4s ease-in-out infinite}
      .journey-neck-level.active span{border-color:rgba(255,245,204,.48);background:rgba(8,7,6,.78);box-shadow:0 0 14px rgba(var(--lvl-rgb),.42)}
      .journey-neck-level.mastery{width:82px;height:82px;border-color:rgba(255,245,204,.95);background:radial-gradient(circle at 50% 50%,rgba(255,244,188,.38) 0 14%,rgba(77,42,22,.78) 38%,rgba(10,8,7,.95) 72%),conic-gradient(from 0deg,rgba(255,83,83,.42),rgba(255,190,72,.42),rgba(255,236,96,.42),rgba(76,218,122,.42),rgba(69,177,255,.42),rgba(160,111,255,.42),rgba(255,83,83,.42));box-shadow:0 0 0 7px rgba(255,255,255,.04),0 0 32px rgba(255,210,106,.46),0 0 52px rgba(204,51,255,.56),0 0 64px rgba(83,177,255,.24),0 14px 28px rgba(0,0,0,.36)}
      .journey-neck-level.mastery:before{inset:-12px;border:2px solid transparent;background:conic-gradient(from 18deg,rgba(255,96,96,.92),rgba(255,193,84,.9),rgba(244,230,111,.9),rgba(103,214,131,.9),rgba(83,177,255,.9),rgba(170,128,255,.9),rgba(255,96,96,.92));mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;-webkit-mask-composite:xor;padding:2px;opacity:.9;animation:journey-mastery-ring 18s linear infinite}
      .journey-neck-level.mastery:after{inset:-22px;background:radial-gradient(circle,rgba(255,231,134,.4) 0 18%,rgba(255,106,83,.22) 30%,rgba(90,190,255,.18) 46%,rgba(170,112,255,.16) 60%,transparent 76%);filter:blur(4px);opacity:.36;animation:journey-mastery-pulse 7s ease-in-out infinite}
      .journey-neck-level.mastery span{width:48px;height:48px;border-radius:999px;background:radial-gradient(circle,rgba(255,226,166,.3),rgba(8,7,6,.5) 62%,rgba(8,7,6,.72));font-size:.52rem;letter-spacing:.02em;text-transform:uppercase}
      .journey-neck-level.mastery .journey-mastery-icon{z-index:5;border-color:rgba(255,245,204,.24);box-shadow:0 0 18px rgba(255,210,106,.28)}
      .journey-neck-level.mastery .journey-mastery-icon img{position:relative;left:-14px;top:-3px;z-index:6;width:74px;height:74px;object-fit:contain;filter:brightness(1.55) contrast(1.2) drop-shadow(0 0 5px rgba(255,255,232,.95)) drop-shadow(0 0 16px rgba(255,170,64,.78));pointer-events:none}
      .journey-neck-level.mastery .journey-mastery-orbit{position:absolute;left:50%;top:50%;border-radius:999px;border:2px dotted rgba(255,255,255,.55);pointer-events:none;z-index:1;transform:translate(-50%,-50%);mix-blend-mode:screen}
      .journey-neck-level.mastery .orbit-one{width:104px;height:104px;border-color:rgba(255,96,96,.78);animation:journey-mastery-orbit 18s linear infinite}
      .journey-neck-level.mastery .orbit-two{width:122px;height:122px;border-color:rgba(255,226,96,.68);animation:journey-mastery-orbit-reverse 24s linear infinite}
      .journey-neck-level.mastery .orbit-three{width:140px;height:140px;border-color:rgba(92,190,255,.64);animation:journey-mastery-orbit 30s linear infinite}
      .journey-neck-level.mastery .journey-mastery-particle{position:absolute;left:50%;top:50%;z-index:3;width:6px;height:6px;border-radius:999px;background:#fff0a8;box-shadow:0 0 7px currentColor,0 0 12px currentColor;pointer-events:none;transform-origin:0 0}
      .journey-neck-level.mastery .particle-one{color:#ff665f;animation:journey-mastery-particle 11s linear infinite}
      .journey-neck-level.mastery .particle-two{color:#ffe260;animation:journey-mastery-particle 14s linear infinite reverse;animation-delay:-1.4s}
      .journey-neck-level.mastery .particle-three{color:#5bd67d;animation:journey-mastery-particle-wide 17s linear infinite;animation-delay:-2.1s}
      .journey-neck-level.mastery .particle-four{color:#67b8ff;animation:journey-mastery-particle-wide 20s linear infinite reverse;animation-delay:-3.2s}
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
      .journey-guide img{width:82px;height:82px;object-fit:contain;filter:drop-shadow(0 5px 10px rgba(0,0,0,.38));animation:char-float 5.5s ease-in-out infinite}
      .journey-bubble{position:relative;background:rgba(13,11,8,.7);border:1px solid var(--border);border-radius:12px;padding:10px 12px;font-size:.72rem;line-height:1.45;color:var(--text)}
      .journey-level-entry.journey-shell{max-width:min(1680px,calc(100vw - 42px));min-height:calc(100vh - 72px);display:flex;flex-direction:column;align-items:center;gap:14px;overflow-x:clip}
      .journey-level-entry-stage{position:relative;width:100%;min-height:680px;display:block}
      .journey-entry-guide{position:absolute;left:calc(50% + 548px);top:34px;z-index:6;width:300px;min-height:610px;display:grid;grid-template-rows:auto 1fr;align-items:end;justify-items:center;gap:14px;padding-top:18px}
      .journey-entry-guide img{width:min(280px,78%);height:auto;max-height:430px;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 12px 24px rgba(0,0,0,.48));animation:char-float 5.5s ease-in-out infinite;align-self:end}
      .journey-entry-bubble{position:relative;order:-1;width:min(300px,86%);min-height:88px;background:rgba(13,11,8,.56);border:1px solid rgba(var(--journey-level-rgb),.5);border-radius:26px;padding:18px 20px;box-shadow:0 18px 38px rgba(0,0,0,.26),inset 0 1px 0 rgba(255,255,255,.08);backdrop-filter:blur(16px)}
      .journey-entry-bubble:before{content:"";position:absolute;left:62%;bottom:-13px;top:auto;transform:rotate(45deg);width:24px;height:24px;background:rgba(13,11,8,.78);border-right:1px solid rgba(var(--journey-level-rgb),.45);border-bottom:1px solid rgba(var(--journey-level-rgb),.45)}
      .journey-entry-bubble p{font-size:.78rem;color:var(--text);line-height:1.48;margin:8px 0 0}
      .journey-level-map{position:relative;overflow:hidden;width:min(1120px,100%);min-height:640px;margin:0 auto;border:1px solid rgba(var(--journey-level-rgb),.46);border-radius:28px;background:radial-gradient(circle at 28% 18%,rgba(var(--journey-level-rgb),.12),transparent 26%),linear-gradient(180deg,rgba(35,29,23,.76),rgba(12,10,8,.86));box-shadow:0 24px 56px rgba(0,0,0,.32),inset 0 1px 0 rgba(255,255,255,.07),0 0 42px rgba(var(--journey-level-rgb),.09);padding:24px 28px}
      .journey-level-map:before{content:"";position:absolute;right:-8%;top:-12%;bottom:-18%;width:48%;background:transparent url("images/journey-backgrounds/journey-guitar-map-transparent-v2.png") center/contain no-repeat;opacity:.18;filter:drop-shadow(0 18px 30px rgba(0,0,0,.34));pointer-events:none}
      .journey-level-map:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(180deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:88px 88px;opacity:.13;pointer-events:none}
      .journey-level-map-head{position:relative;z-index:2;display:flex;justify-content:space-between;gap:18px;align-items:flex-start;max-width:none;margin:0 0 18px}
      .journey-level-map-head h2{font-family:Cinzel,serif;color:var(--journey-level-color);font-size:1.78rem;line-height:1.02;margin:4px 0 6px;text-shadow:0 0 18px rgba(var(--journey-level-rgb),.18)}
      .journey-level-map-head p{max-width:460px;color:var(--dim);font-size:.72rem;line-height:1.5;margin:0}
      .journey-level-progress{min-width:106px;border:1px solid rgba(var(--journey-level-rgb),.3);background:rgba(13,11,8,.5);border-radius:18px;padding:12px 13px;text-align:center;box-shadow:0 12px 28px rgba(0,0,0,.22),inset 0 1px 0 rgba(255,255,255,.05)}
      .journey-level-progress strong{display:block;font-family:Cinzel,serif;color:var(--gold);font-size:1.2rem;line-height:1}
      .journey-level-progress span{display:block;color:var(--dim);font-size:.56rem;letter-spacing:.08em;text-transform:uppercase;margin:4px 0 8px}
      .journey-level-progress i{display:block;height:4px;background:rgba(255,255,255,.08);border-radius:99px;overflow:hidden}
      .journey-level-progress b{display:block;height:100%;background:linear-gradient(90deg,var(--journey-level-color),#f3d08a)}
      .journey-level-progress small{display:block;color:var(--dim);font-size:.52rem;line-height:1.35;margin-top:7px}
      .journey-skill-ribbon{position:relative;z-index:2;display:flex;gap:7px;flex-wrap:wrap;justify-content:center;margin:0 auto 10px;max-width:720px}
      .journey-skill-ribbon span{border:1px solid rgba(212,175,105,.16);background:rgba(212,175,105,.07);color:#f3d79a;border-radius:999px;padding:5px 9px;font-size:.6rem;font-weight:800;letter-spacing:.04em}
      .journey-roadmap-board{position:relative;z-index:2;display:grid;gap:7px;max-width:none;margin:0;padding:8px 0 0;background:transparent}
      .journey-roadmap-section{position:relative;display:grid;grid-template-columns:minmax(300px,.44fr) minmax(360px,.56fr);gap:14px;align-items:center;min-height:50px;border:1px solid rgba(255,245,204,.08);border-radius:16px;background:linear-gradient(90deg,rgba(255,255,255,.045),rgba(255,255,255,.012));box-shadow:inset 0 1px 0 rgba(255,255,255,.04);padding:6px 14px 6px 10px;overflow:visible}
      .journey-roadmap-section:before{content:"";position:absolute;left:78px;right:22px;top:50%;height:1px;background:linear-gradient(90deg,rgba(var(--journey-level-rgb),.2),rgba(255,226,179,.18));opacity:.7;pointer-events:none}
      .journey-roadmap-section.current{border-color:rgba(255,226,179,.22);box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 0 26px rgba(var(--journey-level-rgb),.22)}
      .journey-roadmap-section.done{border-color:rgba(255,226,179,.14)}
      .journey-roadmap-section.active-category{border-color:rgba(var(--journey-level-rgb),.44);background:linear-gradient(90deg,rgba(var(--journey-level-rgb),.13),rgba(255,255,255,.018));box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 0 34px rgba(var(--journey-level-rgb),.24)}
      .journey-roadmap-section.complete-category{border-color:rgba(255,226,179,.18)}
      .journey-roadmap-section.has-doing-evidence{box-shadow:inset 3px 0 0 rgba(var(--journey-level-rgb),.34),inset 0 1px 0 rgba(255,255,255,.04)}
      .journey-roadmap-section-head{position:relative;z-index:2;display:grid;grid-template-columns:46px minmax(0,1fr) auto;gap:10px;align-items:center}
      .journey-roadmap-section-head > span{width:46px;height:36px;border-radius:11px;display:grid;place-items:center;background:linear-gradient(145deg,rgba(255,244,214,.12),rgba(8,7,6,.86));border:1px solid rgba(255,236,198,.24);font-family:Cinzel,serif;color:#fff8dc;font-weight:900;font-size:.82rem;text-shadow:0 1px 4px rgba(0,0,0,.86);box-shadow:0 0 18px rgba(var(--journey-level-rgb),.2),inset 0 1px 0 rgba(255,255,255,.08);overflow:hidden}
      .journey-roadmap-section-head > span.journey-category-icon{background:linear-gradient(145deg,rgba(var(--journey-level-rgb),.16),rgba(8,7,6,.84));border-color:rgba(255,226,179,.24);letter-spacing:.02em}
      .journey-category-icon img{width:34px;height:34px;display:block;object-fit:contain;border-radius:0;filter:saturate(.88) contrast(1.02) brightness(.94) drop-shadow(0 2px 4px rgba(0,0,0,.58))}
      .journey-roadmap-section-head h3{margin:0;font-family:Cinzel,serif;color:var(--text);font-size:.78rem;line-height:1.08}
      .journey-roadmap-section-head p{margin:2px 0 0;color:var(--dim);font-size:.53rem;line-height:1.14}
      .journey-roadmap-practice{display:block;margin-top:3px;color:rgba(255,226,179,.76);font-family:JetBrains Mono,monospace;font-size:.49rem;font-style:normal;line-height:1.2}
      .journey-roadmap-section-head small{justify-self:end;align-self:center;min-width:46px;border:1px solid rgba(255,226,179,.16);border-radius:999px;background:rgba(13,11,8,.5);padding:4px 7px;text-align:center;font-family:JetBrains Mono,monospace;color:rgba(255,226,179,.66);font-size:.56rem;line-height:1}
      .journey-roadmap-section-head small.is-next{border-color:rgba(var(--journey-level-rgb),.5);background:rgba(var(--journey-level-rgb),.16);color:#fff5d4;box-shadow:0 0 18px rgba(var(--journey-level-rgb),.24)}
      .journey-roadmap-section-head small.is-done{color:#f7df9e;border-color:rgba(247,223,158,.28)}
      .journey-roadmap-section-head small.is-later{color:rgba(255,245,220,.42);border-color:rgba(255,245,220,.08)}
      .journey-roadmap-levels{position:relative;z-index:2;display:grid;grid-template-columns:repeat(8,minmax(30px,1fr));align-items:center;gap:7px;min-width:0;padding:0 2px}
      .journey-roadmap-levels:before{content:"";position:absolute;left:18px;right:18px;top:50%;height:2px;background:linear-gradient(90deg,rgba(255,226,179,.16),rgba(var(--journey-level-rgb),.28),rgba(255,226,179,.1));pointer-events:none;transform:translateY(-50%)}
      .journey-roadmap-level-dot{position:relative;z-index:2;justify-self:center;width:34px;height:34px;min-width:34px;border:1px solid rgba(255,245,204,.16);border-radius:999px;background:radial-gradient(circle at 35% 30%,rgba(255,245,204,.22),rgba(8,7,6,.9) 68%);color:var(--text);display:grid;place-items:center;padding:0;text-align:center;cursor:pointer;box-shadow:0 0 14px rgba(var(--dot-rgb),.16);transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease,background .16s ease;isolation:isolate}
      .journey-roadmap-level-dot:before{content:"";position:absolute;inset:-5px;border-radius:inherit;background:conic-gradient(var(--dot-color) 0 var(--dot-progress),rgba(255,245,204,.12) var(--dot-progress) 100%);opacity:.64;z-index:-2;box-shadow:0 0 16px rgba(var(--dot-rgb),.16)}
      .journey-roadmap-level-dot:after{content:"";position:absolute;inset:-1px;border-radius:inherit;background:rgba(8,7,6,.72);z-index:-1}
      .journey-roadmap-level-dot b{width:22px;height:22px;border-radius:999px;display:grid;place-items:center;background:rgba(8,7,6,.72);border:1px solid rgba(255,226,179,.2);font-family:Cinzel,serif;color:#fff5d4;font-size:.56rem;line-height:1}
      .journey-roadmap-level-dot span{position:absolute;left:50%;bottom:calc(100% + 9px);transform:translateX(-50%);width:220px;max-width:42vw;background:rgba(13,11,8,.94);border:1px solid rgba(var(--dot-rgb),.42);border-radius:12px;padding:9px 10px;font-family:DM Sans,sans-serif;font-size:.68rem;font-weight:700;line-height:1.32;color:var(--text);box-shadow:0 12px 24px rgba(0,0,0,.34);opacity:0;pointer-events:none;transition:opacity .14s ease,transform .14s ease;z-index:10}
      .journey-roadmap-level-dot:hover:not(:disabled),.journey-roadmap-level-dot:focus-visible{transform:translateY(-1px);border-color:rgba(255,245,204,.42);box-shadow:0 10px 22px rgba(0,0,0,.22),0 0 24px rgba(var(--dot-rgb),.38);outline:none}
      .journey-roadmap-level-dot:hover span,.journey-roadmap-level-dot:focus-visible span{opacity:1;transform:translateX(-50%) translateY(-2px)}
      .journey-roadmap-level-dot.selected{width:42px;height:42px;min-width:42px;background:radial-gradient(circle at 35% 30%,#fff8dc,var(--dot-color) 48%,#20100c 82%);border-color:rgba(255,244,214,.72);box-shadow:0 0 0 4px rgba(var(--dot-rgb),.13),0 0 28px rgba(var(--dot-rgb),.52)}
      .journey-roadmap-level-dot.selected:before{inset:-8px;opacity:.95;box-shadow:0 0 28px rgba(var(--dot-rgb),.35)}
      .journey-roadmap-level-dot.selected b{background:rgba(8,7,6,.78);border-color:rgba(255,245,204,.46);font-size:.7rem}
      .journey-roadmap-level-dot.done{background:radial-gradient(circle at 35% 30%,#fff1bd,var(--dot-color) 42%,rgba(8,7,6,.9) 76%);border-color:rgba(255,226,179,.36)}
      .journey-roadmap-level-dot.current{box-shadow:0 0 0 4px rgba(var(--dot-rgb),.13),0 0 32px rgba(var(--dot-rgb),.62),0 0 54px rgba(var(--dot-rgb),.24)}
      .journey-roadmap-level-dot.locked{opacity:.72;cursor:not-allowed;filter:saturate(.92) brightness(.8)}
      .journey-roadmap-level-dot.locked:before{background:conic-gradient(rgba(var(--dot-rgb),.5) 0 100%);opacity:.42;box-shadow:0 0 18px rgba(var(--dot-rgb),.2)}
      .journey-roadmap-level-dot.locked b{color:rgba(255,245,220,.56);border-color:rgba(var(--dot-rgb),.3);box-shadow:inset 0 0 10px rgba(var(--dot-rgb),.1)}
      .journey-roadmap-level-dot.locked.future{opacity:.82;filter:saturate(1.08) brightness(.88)}
      .journey-roadmap-level-dot.locked.future:before{background:conic-gradient(rgba(var(--dot-rgb),.56) 0 100%);opacity:.52}
      .journey-roadmap-level-dot.locked.future:after{background:radial-gradient(circle at 35% 30%,rgba(var(--dot-rgb),.28),rgba(8,7,6,.74) 70%)}
      .journey-roadmap-level-dot.locked.future b{background:radial-gradient(circle at 35% 30%,rgba(var(--dot-rgb),.28),rgba(8,7,6,.72) 72%);color:rgba(255,245,220,.66)}
      .journey-roadmap-level-dot.locked.preparing{opacity:.96;filter:saturate(1.16) brightness(.98)}
      .journey-roadmap-level-dot.locked.preparing:before{opacity:.78;box-shadow:0 0 28px rgba(var(--dot-rgb),.38)}
      .journey-roadmap-level-dot.locked.preparing b{color:rgba(255,245,220,.8);border-color:rgba(var(--dot-rgb),.5)}
      .journey-level-entry-foot{position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:16px;max-width:none;margin:18px 0 0;border-top:1px solid rgba(212,175,105,.1);padding-top:12px}
      .journey-level-entry-foot p{color:var(--dim);font-size:.7rem;line-height:1.45;margin:0;max-width:560px}
      .journey-next-step-card{max-width:680px;border:1px solid rgba(var(--journey-level-rgb),.24);background:linear-gradient(90deg,rgba(var(--journey-level-rgb),.12),rgba(255,255,255,.025));border-radius:16px;padding:12px 14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}
      .journey-next-step-card strong{display:block;font-family:Cinzel,serif;color:var(--text);font-size:.9rem;line-height:1.18;margin-top:4px}
      .journey-next-step-card p{max-width:none;margin:5px 0 0;color:var(--dim);font-size:.68rem;line-height:1.42}
      .journey-entry-actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}
      .journey-begin-btn{min-width:138px;box-shadow:0 10px 26px rgba(212,175,105,.18)}
      .journey-spine{display:flex;flex-direction:column;gap:7px}
      .journey-level{border:1px solid var(--border);background:rgba(13,11,8,.45);border-radius:12px;padding:10px;cursor:pointer;opacity:.45;transition:.2s}
      .journey-level.unlocked{opacity:1}.journey-level.active{box-shadow:0 0 0 1px var(--lvl),0 0 20px color-mix(in srgb,var(--lvl),transparent 82%)}
      .journey-level.locked{cursor:not-allowed}.journey-level:hover.unlocked{transform:translateY(-1px)}
      .journey-progressbar{height:4px;background:rgba(255,255,255,.08);border-radius:99px;overflow:hidden;margin-top:8px}.journey-progressbar div{height:100%;background:var(--lvl)}
      .journey-lesson-card{border:1px solid var(--border);border-radius:14px;padding:14px;background:linear-gradient(180deg,rgba(255,255,255,.025),rgba(0,0,0,.08));margin-bottom:10px}
      .journey-block{border:1px solid var(--border);background:rgba(13,11,8,.5);border-radius:12px;padding:12px;margin-bottom:10px}
      .journey-block-head{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:7px}.journey-phase{font-family:JetBrains Mono,monospace;font-size:.55rem;color:var(--gold);letter-spacing:.12em}.journey-min{font-family:JetBrains Mono,monospace;font-size:.58rem;color:var(--dim)}
      .journey-lesson-route{width:min(780px,100%);display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin:4px 0 16px}
      .journey-lesson-route-step{position:relative;min-height:76px;text-align:left;border:1px solid rgba(255,245,204,.1);border-radius:14px;background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.012));color:var(--text);padding:9px 9px 10px;cursor:pointer;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.04);transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease,background .16s ease}
      .journey-lesson-route-step:after{content:"";position:absolute;left:9px;right:9px;bottom:6px;height:3px;border-radius:99px;background:rgba(212,175,105,.16)}
      .journey-lesson-route-step span{width:26px;height:26px;border-radius:999px;display:grid;place-items:center;background:rgba(5,4,3,.78);border:1px solid rgba(212,175,105,.24);font-family:JetBrains Mono,monospace;color:var(--gold);font-size:.53rem;margin-bottom:7px}
      .journey-lesson-route-step strong{display:block;font-family:Cinzel,serif;font-size:.72rem;line-height:1.05;color:var(--text)}
      .journey-lesson-route-step small{display:block;margin-top:4px;color:var(--dim);font-size:.52rem;line-height:1.2}
      .journey-lesson-route-step:hover,.journey-lesson-route-step.active{transform:translateY(-1px);border-color:rgba(212,175,105,.42);box-shadow:0 12px 26px rgba(0,0,0,.22),0 0 20px rgba(212,175,105,.1)}
      .journey-lesson-route-step.active{background:linear-gradient(180deg,rgba(212,175,105,.2),rgba(255,255,255,.03))}
      .journey-lesson-route-step.active:after{background:var(--gold);box-shadow:0 0 12px rgba(212,175,105,.36)}
      .journey-lesson-route-step.active span{background:radial-gradient(circle at 35% 30%,rgba(255,244,214,.95),var(--gold) 44%,rgba(13,11,8,.9) 80%);color:#fff8dc;text-shadow:0 1px 4px rgba(0,0,0,.75)}
      .journey-lesson-route-step.done{border-color:rgba(104,214,131,.22);opacity:.82}
      .journey-lesson-route-step.done:after{background:rgba(104,214,131,.58)}
      .journey-input{width:100%;background:#0d0b08;border:1px solid var(--border);border-radius:10px;color:var(--text);padding:10px;font-family:DM Sans,sans-serif;font-size:.78rem;min-height:72px;box-sizing:border-box}
      .journey-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.journey-btn{background:var(--gold);color:#0d0b08;border:none;border-radius:10px;padding:10px 14px;font-weight:800;cursor:pointer}.journey-btn.secondary{background:transparent;color:var(--gold);border:1px solid var(--border)}.journey-btn.danger{background:#cc3344;color:white}
      .journey-actions.compact{margin-top:0;justify-content:flex-end}
      .journey-live-companion{max-width:1260px;width:100%}
      .journey-live-stage{display:grid;grid-template-columns:220px minmax(0,1fr);gap:24px;align-items:start;margin-top:18px}
      .journey-live-guide{position:sticky;top:20px;display:flex;flex-direction:column;align-items:center}
      .journey-live-guide img{width:156px;height:190px;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 10px 18px rgba(0,0,0,.42));animation:char-float 5.5s ease-in-out infinite}
      .journey-live-guide .journey-entry-bubble{width:184px;min-height:auto;border-radius:18px;padding:13px 14px;box-sizing:border-box}
      .journey-live-guide .journey-entry-bubble:before{left:44px}
      .journey-live-guide .journey-entry-bubble p{font-size:.7rem}
      .journey-live-panel{position:relative;border:1px solid rgba(212,175,105,.2);border-radius:24px;background:radial-gradient(circle at 20% 8%,rgba(212,175,105,.11),transparent 28%),linear-gradient(180deg,rgba(35,29,23,.78),rgba(12,10,8,.88));box-shadow:0 24px 56px rgba(0,0,0,.32),inset 0 1px 0 rgba(255,255,255,.06);padding:24px}
      .journey-live-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:16px}
      .journey-live-head h2{font-family:Cinzel,serif;color:var(--gold);font-size:1.5rem;line-height:1.05;margin:5px 0 6px}
      .journey-live-head p{max-width:640px;color:var(--dim);font-size:.76rem;line-height:1.5;margin:0}
      .journey-live-rule,.journey-save-confirm{border:1px solid rgba(212,175,105,.2);background:rgba(212,175,105,.07);border-radius:14px;padding:10px 12px;color:var(--text);font-size:.74rem;line-height:1.45;margin-bottom:12px}
      .journey-map-clue-card{border:1px solid rgba(255,120,92,.26);border-radius:18px;background:radial-gradient(circle at 12% 12%,rgba(255,92,72,.16),transparent 36%),linear-gradient(180deg,rgba(255,255,255,.045),rgba(0,0,0,.12));padding:14px;margin:0 0 14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 12px 26px rgba(0,0,0,.18)}
      .journey-map-clue-card strong{display:block;font-family:Cinzel,serif;color:#f5d18f;font-size:1rem;margin:4px 0 6px}
      .journey-map-clue-phrase{margin:0 0 10px;color:var(--text);font-size:.86rem;line-height:1.42}
      .journey-map-clue-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
      .journey-map-clue-grid span{border:1px solid rgba(255,245,204,.08);border-radius:12px;background:rgba(8,7,6,.36);padding:9px 10px;color:var(--dim);font-size:.7rem;line-height:1.42}
      .journey-map-clue-grid b{color:var(--text)}
      .journey-save-confirm{border-color:rgba(104,214,131,.32);background:rgba(104,214,131,.08);color:#eaffdd}
      .journey-commit-strip{display:grid;grid-template-columns:minmax(0,1.1fr) 170px minmax(210px,.9fr);gap:10px;align-items:stretch;margin:0 0 14px}
      .journey-commit-main,.journey-commit-meter,.journey-tomorrow-card{border:1px solid rgba(212,175,105,.16);border-radius:16px;background:rgba(8,7,6,.34);padding:11px 12px;box-shadow:inset 0 1px 0 rgba(255,255,255,.04)}
      .journey-commit-main strong,.journey-tomorrow-card strong{display:block;color:var(--text);font-size:.76rem;line-height:1.35;margin-top:3px}
      .journey-commit-main span,.journey-tomorrow-card span{display:block;color:var(--dim);font-size:.62rem;line-height:1.35;margin-top:4px}
      .journey-commit-meter{display:grid;align-content:center;gap:7px;text-align:center}
      .journey-commit-meter i{display:block;height:8px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden}
      .journey-commit-meter b{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#ff6b5b,var(--gold));box-shadow:0 0 16px rgba(212,175,105,.34)}
      .journey-commit-meter small{font-family:JetBrains Mono,monospace;color:var(--gold);font-size:.62rem}
      .journey-latest-review{border:1px solid rgba(255,120,92,.22);border-radius:18px;background:radial-gradient(circle at 9% 18%,rgba(255,92,72,.13),transparent 36%),rgba(8,7,6,.3);padding:12px;margin:0 0 14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.04)}
      .journey-latest-review-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;margin-top:8px}
      .journey-latest-review-grid span{border:1px solid rgba(255,245,204,.08);border-radius:10px;background:rgba(8,7,6,.36);padding:8px 9px;color:var(--dim);font-size:.66rem;line-height:1.35}
      .journey-latest-review-grid b{color:var(--text)}
      .journey-latest-next{display:block;margin-top:9px;color:#f5d18f;font-size:.76rem;line-height:1.35}
      .journey-live-flow{display:grid;gap:9px;margin:14px 0}
      .journey-live-step-buttons{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
      .journey-widget-path{position:relative;padding:4px 0 8px}
      .journey-widget-path:before{content:"";position:absolute;left:4%;right:4%;top:47px;height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,105,.36),transparent);pointer-events:none}
      .journey-live-step-btn{position:relative;min-height:122px;text-align:center;border:1px solid rgba(255,245,204,.1);border-radius:18px;background:radial-gradient(circle at 50% 20%,rgba(212,175,105,.1),transparent 44%),linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.012));color:var(--text);padding:12px 9px 10px;cursor:pointer;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.04),0 12px 24px rgba(0,0,0,.14);transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease,background .16s ease}
      .journey-live-step-btn:before{content:"";position:absolute;inset:auto 12px 7px;height:3px;border-radius:99px;background:rgba(212,175,105,.24)}
      .journey-live-step-btn .journey-widget-orb{position:relative;width:58px;height:58px;border-radius:999px;display:block;margin:0 auto 10px;background:radial-gradient(circle at 50% 50%,rgba(255,244,214,.68),rgba(212,175,105,.3) 34%,rgba(8,7,6,.9) 74%);border:1px solid rgba(255,245,204,.22);box-shadow:0 0 0 6px rgba(212,175,105,.05),0 10px 18px rgba(0,0,0,.24);font-family:Cinzel,serif;color:#fff7d8;font-size:.88rem;overflow:hidden}
      .journey-live-step-btn .journey-widget-orb img{position:absolute;left:50%;top:50%;width:48px;height:48px;object-fit:contain;transform:translate(-50%,-50%);filter:drop-shadow(0 5px 8px rgba(0,0,0,.45))}
      .journey-live-step-btn .journey-widget-orb i{font-style:normal;text-shadow:0 1px 5px rgba(0,0,0,.8)}
      .journey-live-step-btn strong{display:block;font-family:Cinzel,serif;font-size:.86rem;line-height:1.05;color:var(--text)}
      .journey-live-step-btn small{display:block;margin-top:5px;color:var(--dim);font-size:.58rem;line-height:1.25}
      .journey-live-step-btn em{display:block;margin-top:7px;font-family:JetBrains Mono,monospace;font-style:normal;font-size:.5rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(212,175,105,.66)}
      .journey-live-step-btn:hover,.journey-live-step-btn.active{transform:translateY(-1px);border-color:rgba(212,175,105,.46);box-shadow:0 12px 28px rgba(0,0,0,.22),0 0 24px rgba(212,175,105,.1)}
      .journey-live-step-btn.active{background:linear-gradient(180deg,rgba(212,175,105,.2),rgba(255,255,255,.03))}
      .journey-live-step-btn.active:before{background:var(--gold);box-shadow:0 0 14px rgba(212,175,105,.38)}
      .journey-live-step-btn.active .journey-widget-orb{background:radial-gradient(circle at 50% 50%,rgba(255,244,214,.86),var(--gold) 42%,rgba(13,11,8,.9) 82%);color:#fff8dc;text-shadow:0 1px 4px rgba(0,0,0,.75);box-shadow:0 0 0 7px rgba(212,175,105,.12),0 0 24px rgba(212,175,105,.34),0 10px 18px rgba(0,0,0,.24)}
      .journey-live-step-btn.active .journey-widget-orb img{transform:translate(-50%,-50%) scale(1.06);filter:drop-shadow(0 0 10px rgba(255,223,151,.44)) drop-shadow(0 6px 8px rgba(0,0,0,.46))}
      .journey-live-focus-stack{margin-top:10px}
      .journey-live-focus{display:none;border:1px solid rgba(212,175,105,.22);border-radius:18px;background:radial-gradient(circle at 12% 8%,rgba(212,175,105,.13),transparent 32%),linear-gradient(180deg,rgba(255,255,255,.04),rgba(0,0,0,.12));padding:16px;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}
      .journey-live-focus.active{display:block}
      .journey-live-focus-top{display:grid;grid-template-columns:42px 1fr auto;gap:12px;align-items:center;margin-bottom:10px}
      .journey-live-focus-top > span{width:38px;height:38px;border-radius:999px;display:grid;place-items:center;background:#090806;border:1px solid rgba(212,175,105,.34);font-family:JetBrains Mono,monospace;color:var(--gold);font-size:.64rem}
      .journey-live-focus h3{font-family:Cinzel,serif;color:var(--gold);font-size:1.2rem;line-height:1.05;margin:3px 0 0}
      .journey-live-focus-top small{font-family:JetBrains Mono,monospace;color:var(--gold);font-size:.62rem}
      .journey-live-aim{margin:0 0 10px;color:var(--text);font-size:.78rem;line-height:1.45}
      .journey-live-action,.journey-live-prompt{border:1px solid rgba(255,245,204,.08);border-radius:12px;background:rgba(8,7,6,.38);padding:10px 12px;color:var(--dim);font-size:.72rem;line-height:1.45;margin-top:8px}
      .journey-live-action strong,.journey-live-prompt strong{color:var(--text)}
      .journey-live-step{display:grid;grid-template-columns:38px 1fr 48px;align-items:center;gap:12px;border:1px solid rgba(255,245,204,.08);border-radius:16px;background:linear-gradient(90deg,rgba(255,255,255,.045),rgba(255,255,255,.012));padding:10px 12px}
      .journey-live-step > span{width:34px;height:34px;border-radius:999px;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,rgba(255,244,214,.95),var(--gold) 44%,rgba(13,11,8,.9) 80%);font-family:Cinzel,serif;color:#fff8dc;font-size:.62rem;font-weight:900;text-shadow:0 1px 4px rgba(0,0,0,.8)}
      .journey-live-step h3{margin:0;font-family:Cinzel,serif;color:var(--text);font-size:.84rem;line-height:1.1}
      .journey-live-step p{margin:3px 0 0;color:var(--dim);font-size:.68rem;line-height:1.35}
      .journey-live-step small{justify-self:end;font-family:JetBrains Mono,monospace;color:var(--gold);font-size:.58rem}
      .journey-companion-grid.live{margin-top:16px}
      .journey-live-notes{margin-top:16px}
      .journey-rating-list{display:flex;flex-direction:column;gap:8px}.journey-rating-row{display:flex;justify-content:space-between;gap:8px;align-items:center;font-size:.72rem;color:var(--text);border-bottom:1px solid rgba(255,255,255,.06);padding-bottom:7px}.journey-rating{background:transparent;border:1px solid var(--border);color:var(--dim);border-radius:999px;width:26px;height:26px;cursor:pointer;font-size:.65rem}.journey-rating.on{background:var(--gold);color:#0d0b08;border-color:var(--gold)}
      .journey-review-prompts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin:10px 0 12px}
      .journey-review-prompts label{display:flex;gap:7px;align-items:flex-start;border:1px solid rgba(212,175,105,.12);background:rgba(212,175,105,.055);border-radius:10px;padding:8px 10px;color:var(--text);font-size:.68rem;line-height:1.35}
      .journey-review-prompts input{margin-top:2px;accent-color:var(--gold)}
      .journey-review-tips{margin-top:10px;border:1px solid rgba(212,175,105,.12);border-radius:10px;background:rgba(255,255,255,.025);padding:10px}
      .journey-note{border-left:2px solid var(--gold);padding:8px 10px;background:rgba(212,175,105,.06);font-size:.72rem;color:var(--dim);line-height:1.45;margin-top:8px;border-radius:0 8px 8px 0}
      @keyframes journey-level-pulse{0%,100%{opacity:.2;transform:scale(.92)}50%{opacity:.52;transform:scale(1.18)}}
      @keyframes journey-mastery-pulse{0%,100%{opacity:.34;transform:scale(.94)}50%{opacity:.68;transform:scale(1.12)}}
      @keyframes journey-mastery-ring{to{transform:rotate(360deg)}}
      @keyframes journey-mastery-orbit{to{transform:translate(-50%,-50%) rotate(360deg)}}
      @keyframes journey-mastery-orbit-reverse{to{transform:translate(-50%,-50%) rotate(-360deg)}}
      @keyframes journey-mastery-particle{from{transform:rotate(0deg) translateX(58px) translate(-50%,-50%)}to{transform:rotate(360deg) translateX(58px) translate(-50%,-50%)}}
      @keyframes journey-mastery-particle-wide{from{transform:rotate(0deg) translateX(70px) translate(-50%,-50%)}to{transform:rotate(360deg) translateX(70px) translate(-50%,-50%)}}
      @media(max-width:720px){.journey-map-clue-grid,.journey-review-prompts,.journey-latest-review-grid{grid-template-columns:1fr}}
      @media(prefers-reduced-motion:reduce){
        .journey-map-guide img,.journey-guide-character,.journey-guide img,.journey-entry-guide img,.journey-neck-level:after,.journey-neck-level.mastery:before,.journey-neck-level.mastery:after,.journey-neck-level.mastery .journey-mastery-orbit,.journey-neck-level.mastery .journey-mastery-particle{animation:none!important}
        .journey-neck-level.mastery .journey-mastery-particle{display:none}
      }
      @media(max-width:860px){.journey-entry-stage{min-height:auto;display:flex;flex-direction:column;align-items:center;gap:12px}.journey-map-guide{position:static;order:2;width:min(280px,88vw)}.journey-neck-stage{order:1;width:min(340px,88vw)}.journey-map-bubble{width:min(250px,78vw)}}
      @media(max-width:1700px){.journey-entry-guide{left:calc(50% + 500px);width:220px}.journey-entry-guide img{width:min(200px,78%)}.journey-entry-bubble{width:min(230px,90%)}}
      @media(max-width:1440px){.journey-level-entry-stage{display:flex;flex-direction:column;align-items:center;gap:18px;min-height:auto}.journey-entry-guide{position:relative;left:auto;right:auto;top:auto;order:2;width:min(620px,100%);min-height:auto;display:flex;flex-direction:row;justify-content:center;align-items:flex-end;padding-top:0}.journey-entry-guide img{width:104px;height:126px}.journey-entry-bubble{width:min(390px,70vw);order:0}.journey-entry-bubble:before{left:30px}.journey-level-map{order:1;min-height:auto}.journey-level-map:before{right:-2%;width:52%;opacity:.1}}
      @media(max-width:980px){.journey-level-command-row{width:100%}.journey-roadmap-section{grid-template-columns:1fr;border-radius:22px}.journey-roadmap-section:before{left:22px}.journey-roadmap-levels{grid-template-columns:repeat(8,minmax(28px,1fr));gap:6px}.journey-roadmap-level-dot span{bottom:auto;top:calc(100% + 8px)}.journey-level-entry-foot{flex-direction:column;align-items:stretch;text-align:center}.journey-next-step-card{max-width:none}.journey-entry-actions{justify-content:center}.journey-entry-actions .journey-btn{width:100%}.journey-begin-btn{width:100%}.journey-live-step-buttons{grid-template-columns:repeat(2,minmax(0,1fr))}.journey-lesson-route{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:720px){.journey-shell{padding:14px}.journey-level-command-row{flex-direction:column;align-items:stretch}.journey-level-command-row .journey-top-row{justify-content:center}.journey-grid,.journey-companion-grid{grid-template-columns:1fr}.journey-neck-stage{width:min(330px,92vw);background-size:contain}.journey-neck-wrap{padding-top:14px}.journey-headstock{width:140px;height:64px}.journey-neck{width:min(250px,74vw);height:520px;min-height:460px}.journey-body-arc{width:min(360px,92vw);height:95px}.journey-guide-scene{left:50%;bottom:38px;transform:translateX(-50%);width:min(300px,78vw)}.journey-guide-character{width:126px;height:174px}.journey-guide-bubble.game{max-width:250px}.journey-title{font-size:1.25rem}.journey-guide img{width:64px;height:64px}.journey-companion-head,.journey-companion-preview,.journey-companion-summary{align-items:flex-start;flex-direction:column}.journey-student-bar{border-radius:16px;width:100%;box-sizing:border-box}.journey-student-menu{width:min(280px,88vw)}.journey-level-map{padding:18px}.journey-level-map-head,.journey-live-head{flex-direction:column;align-items:stretch}.journey-level-progress{width:100%}.journey-roadmap-board{padding:8px}.journey-roadmap-section{padding:10px}.journey-roadmap-level-dot{width:38px;height:38px;min-width:38px}.journey-roadmap-level-dot.selected{width:46px;height:46px;min-width:46px}.journey-entry-guide{flex-direction:column;align-items:center}.journey-entry-bubble{width:min(270px,82vw)}.journey-entry-bubble:before{left:50%}.journey-live-stage{grid-template-columns:1fr}.journey-live-guide{position:static}.journey-live-panel{padding:16px}.journey-commit-strip{grid-template-columns:1fr}.journey-live-step-buttons{grid-template-columns:1fr}.journey-live-focus-top{grid-template-columns:38px 1fr}.journey-live-focus-top small{grid-column:2}.journey-live-step{grid-template-columns:34px 1fr}.journey-live-step small{justify-self:start;grid-column:2}.journey-lesson-route{grid-template-columns:1fr}.journey-lesson-route-step{min-height:64px}}
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
    const level = effectiveCurrentLevel(student);
    const progress = journeyLevelProgress(student, level);
    const lvlState = Object.assign({}, student.levels[level.id] || {}, { complete:progress.complete });

    // Build level positions
    const levelPositions = LEVELS.map((l, i) => ({
      ...l,
      ls: student.levels[l.id] || {},
      complete: l.num === 1 ? journeyLevelProgress(student, l).complete : !!student.levels[l.id]?.complete,
      unlocked: isLevelUnlocked(student, l.num)
    }));

    let html = '<div class="journey-shell journey-home journey-map-home">';

    html += renderStudentPicker(state, student);
    html += '<div class="journey-entry-stage">';
    html += renderJourneyMapGuide(student);
    html += renderJourneyNeckStage(state, student, level, lvlState, levelPositions);
    html += '</div>';
    html += renderJourneyHomeActions(state, student);

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
    html += '<img src="'+attr(guideAsset('encouraging'))+'" style="width:80px;height:80px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));animation:char-float 3s ease-in-out infinite"/>';
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

  function lessonReviewTips(lesson, student){
    const tags = (lesson.categoryTags || []).map(categoryKey);
    const tips = [];
    if(tags.includes('rhythm')) tips.push('If the pulse drifted, make the next practice slower and shorter before adding more notes.');
    if(tags.includes('chords and harmony')) tips.push('If chords buzzed or felt slow, choose one chord pair and make the hand calm before adding rhythm.');
    if(tags.includes('scales')) tips.push('If the scale felt blurry, reduce it to two strings or one root-note safety area.');
    if(tags.includes('technique')) tips.push('If tension appeared, treat relaxation as the assignment, not a side detail.');
    if(tags.includes('improvisation')) tips.push('If musical play worked, end next time with call and response again.');
    if(student && /jen/i.test(student.name)) tips.push('For Jen: consolidate before adding challenge. Use call and response as the doorway if she feels stuck.');
    if(!tips.length) tips.push('Keep the next step small enough that the learner can feel success and still notice the gap.');
    return tips.slice(0, 4);
  }

  function lessonRouteStages(lesson){
    const blockIndex = id => Math.max(0, (lesson.blocks || []).findIndex(block => block.id === id));
    return [
      { label:'Review', source:'Journey memory', block:'review', brief:'Bring back what happened last time.' },
      { label:'Tune in', source:'Hearth', block:'warmup', brief:'Tune guitar, body check, open strings.' },
      { label:'Warm up', source:'Practice', block:'warmup', brief:'Wake the hands with a small, clean movement.' },
      { label:'Learn', source:'Study + Knowing', block:'concept', brief:'One clear idea in plain words.' },
      { label:'Try it', source:'Doing', block:'drill', brief:'Test the movement slowly enough to succeed.' },
      { label:'Practice', source:'Practice', block:'drill', brief:'Repeat with a clear pass condition.' },
      { label:'Play', source:'Play', block:'music', brief:'Put it into a groove or musical moment.' },
      { label:'Create', source:'Create', block:'music', brief:'Make a tiny phrase, variation, or exchange.' },
      { label:'Mastery', source:'Mastery', block:'music', brief:'Notice what this skill can become.' },
      { label:'Review notes', source:'Hearth + Journey', block:'reflect', review:true, brief:'Capture what worked and what comes next.' }
    ].map((stage, index) => {
      const idx = stage.review ? (lesson.blocks || []).length : blockIndex(stage.block);
      return Object.assign({ index, blockIdx:idx }, stage);
    });
  }

  function renderLessonRoute(levelNum, lessonNum, lesson, activeBlockIdx, isReview){
    const stages = lessonRouteStages(lesson);
    let html = '<nav class="journey-lesson-route" aria-label="Lesson path">';
    stages.forEach(stage => {
      const active = stage.review ? isReview : (!isReview && stage.blockIdx === activeBlockIdx);
      const done = isReview ? !stage.review : stage.blockIdx < activeBlockIdx;
      const classes = ['journey-lesson-route-step'];
      if(active) classes.push('active');
      if(done) classes.push('done');
      html += '<button type="button" class="'+classes.join(' ')+'" onclick="Journey.jumpLessonStage('+levelNum+','+lessonNum+','+stage.blockIdx+')" title="'+attr(stage.brief)+'">' +
        '<span>'+String(stage.index + 1).padStart(2, '0')+'</span>' +
        '<strong>'+esc(stage.label)+'</strong>' +
        '<small>'+esc(stage.source)+'</small>' +
      '</button>';
    });
    html += '</nav>';
    return html;
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
    const countedPosition = countedLessonNumber(level, lessonNum);
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
    html += '<div style="font-size:0.62rem;color:var(--dim);margin-top:3px">'+(lesson.countsTowardLevel ? 'Lesson '+countedPosition+' of '+level.totalLessons : 'Entry Check · Before Level 1')+'</div>';
    html += '</div>';
    html += renderLessonRoute(levelNum, lessonNum, lesson, bi, isReview);

    if(!isReview && b){
      // Guitar guide for this block
      const guideMsg = blockGuides[b.id] || b.body;
      html += '<div style="display:flex;flex-direction:column;align-items:center;margin-bottom:14px">';
      html += '<img src="'+attr(guideAsset('encouraging'))+'" style="width:72px;height:72px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));animation:char-float 3s ease-in-out infinite"/>';
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
      html += '<img src="'+attr(guideAsset('encouraging'))+'" style="width:72px;height:72px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));animation:char-float 3s ease-in-out infinite"/>';
      html += '<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 14px;margin-top:8px;max-width:280px;text-align:center;position:relative">';
      html += '<div style="position:absolute;left:50%;top:-6px;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid var(--border)"></div>';
      html += '<div style="font-size:0.68rem;color:var(--text);line-height:1.5">Do the review before moving on. The useful lesson is the one that tells us what should happen next.</div>';
      html += '</div></div>';

      html += '<div class="journey-card journey-review-guide" style="max-width:360px;width:100%;margin-bottom:10px">';
      html += '<div class="journey-kicker">End-of-lesson review</div>';
      html += '<div class="journey-review-prompts">';
      [
        'What worked well enough to repeat?',
        'What felt confusing, tense, rushed, or messy?',
        'What did the learner enjoy or lean toward?',
        'What is the next smallest useful step?'
      ].forEach(prompt => {
        html += '<div><span>'+esc(prompt)+'</span></div>';
      });
      html += '</div></div>';

      // Concept status
      html += '<div class="journey-card" style="max-width:360px;width:100%;margin-bottom:10px"><div class="journey-kicker">Concept status</div>'+ratingButtons('concept', lesson.conceptNames, student.activeLesson.conceptRatings)+'</div>';

      // Task status
      html += '<div class="journey-card" style="max-width:360px;width:100%;margin-bottom:10px"><div class="journey-kicker">Task status</div>'+ratingButtons('task', lesson.taskNames, student.activeLesson.taskRatings)+'</div>';

      // Feedback
      html += '<div class="journey-card" style="max-width:360px;width:100%;margin-bottom:10px">';
      html += '<div class="journey-kicker">Feedback / Next Gradient</div>';
      html += '<textarea class="journey-input" id="journey-feedback" placeholder="Student review: what worked, what was hard, what felt musical, what should repeat?">'+esc(student.activeLesson.feedback || '')+'</textarea>';
      html += '<textarea class="journey-input" id="journey-teacher-notes" style="margin-top:8px" placeholder="Teacher notes: exact gap, useful reminder, next safe step, and anything to prepare before teaching again...">'+esc(student.activeLesson.teacherNotes || '')+'</textarea>';
      html += '<div class="journey-review-tips"><div class="journey-mini-label">Tips and reminders</div>'+renderSmallList(lessonReviewTips(lesson, student))+'</div>';
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
    const level = effectiveCurrentLevel(student);
    const lvlState = student.levels[level.id];
    const lessonNum = nextSourceLessonNumber(student, level);
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
    html += '<div class="journey-card" style="margin-top:12px"><div class="journey-kicker">Feedback / Next Gradient</div><textarea class="journey-input" id="journey-feedback" placeholder="How did this contact go? What should happen next?">'+esc(student.activeLesson.feedback || '')+'</textarea><textarea class="journey-input" id="journey-teacher-notes" style="margin-top:8px" placeholder="Teacher notes: gaps, interests, attitude, breakthroughs, exact relevance...">'+esc(student.activeLesson.teacherNotes || '')+'</textarea><div class="journey-actions"><button class="journey-btn secondary" onclick="Journey.saveLessonDraft()">Save Draft</button><button class="journey-btn" onclick="Journey.completeLesson()">Save Lesson Review</button></div></div></div>';
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
    const level = effectiveCurrentLevel(student);
    const lessonNum = student.activeLesson.lessonNum || 1;
    const blockIdx = student.activeLesson.blockIdx || 0;
    renderLevelLesson(level.num, lessonNum, blockIdx);
  }

  const Journey = {
    render,
    startLesson(){ const state=loadState(); const s=activeStudent(state); const l=effectiveCurrentLevel(s); renderLevelLesson(l.num, nextSourceLessonNumber(s, l)); },
    beginLevel(levelNum){
      const state = loadState();
      const s = activeStudent(state);
      const l = getLevel(levelNum || s.currentLevel || 1);
      const next = nextSourceLessonNumber(s, l);
      s.currentLevel = l.num;
      s.activeLesson = null;
      saveStudent(s);
      if(getCompanion(s)){
        renderCompanionLesson(s.id);
        return;
      }
      renderLevelLesson(l.num, next);
    },
    saveAndNext(levelNum, lessonNum, nextIdx){ const s=collectDraft(); saveStudent(s); renderLevelLesson(levelNum, lessonNum, nextIdx); },
    jumpLessonStage(levelNum, lessonNum, blockIdx){ const s=collectDraft(); saveStudent(s); renderLevelLesson(levelNum, lessonNum, blockIdx); },
    openLevel(num){
      const state = loadState(); const s = activeStudent(state); const l = getLevel(num);
      const unlocked = isLevelUnlocked(s, num);
      if(!unlocked) return;
      s.currentLevel = num; s.activeLesson = null; saveStudent(s);
      renderLevelEntry(num);
    },
    openLesson(levelNum, lessonNum){
      const state = loadState(); const s = activeStudent(state); const l = getLevel(levelNum);
      s.currentLevel = levelNum; s.activeLesson = null; saveStudent(s); renderLevelLesson(levelNum, lessonNum);
    },
    openCompanionLesson(studentId){
      renderCompanionLesson(studentId);
    },
    focusCompanionStep(index){
      document.querySelectorAll('.journey-live-step-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-step') === String(index));
      });
      document.querySelectorAll('.journey-live-focus').forEach(panel => {
        panel.classList.toggle('active', panel.getAttribute('data-step-panel') === String(index));
      });
    },
    openCompanionCreate(studentId, stepIndex){
      const state = loadState();
      const student = state.students.find(item => item.id === studentId) || activeStudent(state);
      const companion = getCompanion(student);
      const step = companionLessonSteps(companion)[stepIndex];
      const handoff = step && step.createHandoff;
      if(!handoff || !window.HearthCreateHandoff || typeof window.HearthCreateHandoff.open !== 'function') return;
      window.HearthCreateHandoff.open({
        source_node_id:'journey',
        source_id:handoff.source_id || 'jen-a-minor-conversation',
        lesson_id:'jen-a-minor-pentatonic-consolidation',
        journey_level_id:handoff.journey_level_id || 'L1',
        capability_ids:(handoff.capability_ids || []).slice(),
        source_title:step.label,
        suggested_ingredient:handoff.suggested_ingredient,
        seed_title:handoff.seed_title,
        starter:handoff.starter,
        instruction:handoff.instruction
      });
    },
    openCompanionDoing(studentId, stepIndex){
      const state = loadState();
      const student = state.students.find(item => item.id === studentId) || activeStudent(state);
      const companion = getCompanion(student);
      const step = companionLessonSteps(companion)[stepIndex];
      const spec = step && step.doingHandoff;
      if(!spec || !window.HearthCrossNodeHandoffStore || typeof window.HearthCrossNodeHandoffStore.createStore !== 'function') return;
      const store = window.HearthCrossNodeHandoffStore.createStore({ storage:window.sessionStorage });
      const suffix = Date.now().toString(36);
      const handoff = {
        id:'handoff-journey-doing-'+student.id+'-'+suffix,
        version:1,
        learner_id:student.id,
        actor_role:'learner',
        source_node_id:'journey',
        destination_node_id:'doing',
        activity_id:spec.drill_id,
        lesson_id:'jen-a-minor-pentatonic-consolidation',
        journey_level_id:'L1',
        capability_ids:(spec.capability_ids || []).slice(),
        attempt_id:null,
        session_id:'journey-session-'+student.id+'-'+suffix,
        task:{
          id:spec.drill_id,
          instruction:spec.instruction,
          parameters:{ room_id:spec.room_id, category_id:spec.category_id, drill_id:spec.drill_id, bpm:[60,76,100] }
        },
        pass_condition:{
          description:spec.pass_condition,
          minimum_evidence_stage:'demonstration',
          criteria:{ drill_id:spec.drill_id, clean_passes:1 }
        },
        easier_step:{ instruction:spec.easier_step, parameters:{ drill_id:spec.drill_id, bpm:60, root_notes_only:true } },
        return_route:{ node_id:'journey', view_id:'companion', params:{ learner_id:student.id, step_index:stepIndex } },
        fallback_instruction:'Return to Journey and reopen Jen\'s Make Music step.',
        created_at:new Date().toISOString()
      };
      if(!store.set(handoff)) return;
      if(typeof window.showDoing === 'function') window.showDoing();
      if(typeof window._setDoingRoomConcept === 'function') window._setDoingRoomConcept(spec.room_id);
      if(typeof window._openDoingRoomDrill === 'function') window._openDoingRoomDrill(spec.category_id, spec.drill_id);
    },
    openCompanionStudy(studentId, stepIndex){
      const state = loadState();
      const student = state.students.find(item => item.id === studentId) || activeStudent(state);
      const companion = getCompanion(student);
      const step = companionLessonSteps(companion)[stepIndex];
      const spec = step && step.studyHandoff;
      if(!spec || !window.HearthCrossNodeHandoffStore || typeof window.HearthCrossNodeHandoffStore.createStore !== 'function') return;
      const store = window.HearthCrossNodeHandoffStore.createStore({ storage:window.sessionStorage });
      const suffix = Date.now().toString(36);
      const handoff = {
        id:'handoff-journey-study-'+student.id+'-'+suffix,
        version:1,
        learner_id:student.id,
        actor_role:'learner',
        source_node_id:'journey',
        destination_node_id:'study',
        activity_id:spec.activity_id,
        lesson_id:'jen-a-minor-pentatonic-consolidation',
        journey_level_id:spec.journey_level_id || 'L1',
        capability_ids:(spec.capability_ids || []).slice(),
        attempt_id:null,
        session_id:'journey-study-session-'+student.id+'-'+suffix,
        task:{
          id:spec.activity_id,
          instruction:spec.instruction,
          parameters:{ subject_id:spec.subject_id, subject_title:spec.subject_title, recommended_door:spec.recommended_door }
        },
        pass_condition:{
          description:'Find A as home in the current pentatonic area and explain the landmark clue plainly.',
          minimum_evidence_stage:'understanding',
          criteria:{ subject_id:spec.subject_id, recommended_door:spec.recommended_door }
        },
        easier_step:{ instruction:spec.easier_step, parameters:{ root_note:'A', caged_language:false } },
        return_route:{ node_id:'journey', view_id:'companion', params:{ learner_id:student.id, step_index:stepIndex } },
        fallback_instruction:'Return to Journey and reopen Jen\'s Map Clue step.',
        created_at:new Date().toISOString()
      };
      if(!store.set(handoff)) return;
      if(window.StudyKeyChamber && typeof window.StudyKeyChamber.openWithHandoff === 'function') {
        window.StudyKeyChamber.openWithHandoff(handoff);
      } else if(typeof window.showStudy === 'function') {
        window.showStudy();
      }
    },
    openCompanionPlay(studentId, stepIndex){
      const state = loadState();
      const student = state.students.find(item => item.id === studentId) || activeStudent(state);
      const companion = getCompanion(student);
      const step = companionLessonSteps(companion)[stepIndex];
      const spec = step && step.playHandoff;
      if(!spec || !window.HearthCrossNodeHandoffStore || typeof window.HearthCrossNodeHandoffStore.createStore !== 'function') return;
      const store = window.HearthCrossNodeHandoffStore.createStore({ storage:window.sessionStorage });
      const suffix = Date.now().toString(36);
      const handoff = {
        id:'handoff-journey-play-'+student.id+'-'+suffix,
        version:1,
        learner_id:student.id,
        actor_role:'learner',
        source_node_id:'journey',
        destination_node_id:'play',
        activity_id:spec.activity_id,
        lesson_id:'jen-a-minor-pentatonic-consolidation',
        journey_level_id:spec.journey_level_id || 'L1',
        capability_ids:(spec.capability_ids || []).slice(),
        attempt_id:null,
        session_id:'journey-play-session-'+student.id+'-'+suffix,
        task:{
          id:spec.activity_id,
          instruction:spec.instruction,
          parameters:{ source_id:spec.source_id, tempo_choices:[60,76,100], roles:['rhythm','lead'] }
        },
        pass_condition:{
          description:'Complete all eight bars, try both roles, stay with the pulse, and reflect on the exchange.',
          minimum_evidence_stage:'application',
          criteria:{ source_id:spec.source_id, roles_tried:2, complete_form:true }
        },
        easier_step:{ instruction:spec.easier_step, parameters:{ tempo:60, root_notes_only:true } },
        return_route:{ node_id:'journey', view_id:'companion', params:{ learner_id:student.id, step_index:stepIndex } },
        fallback_instruction:'Return to Journey and reopen Jen\'s Conversation step.',
        created_at:new Date().toISOString()
      };
      if(!store.set(handoff)) return;
      if(window.HearthPlayAtlasController && typeof window.HearthPlayAtlasController.openWithHandoff === 'function') {
        window.HearthPlayAtlasController.openWithHandoff(handoff);
      } else if(typeof window.showPlay === 'function') {
        window.showPlay();
      }
    },
    saveCompanionLessonNote(studentId){
      const state = loadState();
      const s = state.students.find(student => student.id === studentId) || activeStudent(state);
      const level = effectiveCurrentLevel(s);
      const ls = s.levels[level.id] || s.levels.L1;
      const noteEl = document.getElementById('journey-companion-note');
      const nextEl = document.getElementById('journey-companion-next');
      const happened = noteEl && noteEl.value.trim() ? noteEl.value.trim() : 'Used the live Jen consolidation companion.';
      const next = nextEl && nextEl.value.trim() ? nextEl.value.trim() : 'Repeat A roots, three small pentatonic boxes, and musical conversation.';
      ls.notes.push({
        date: today(),
        text: 'Live lesson companion: '+happened+' NEXT: '+next
      });
      if(window.HearthProgressEvents){
        window.HearthProgressEvents.append({
          event_type:'teacher_lesson_note',
          node_id:'journey',
          learner_id:s.id,
          journey_level_id:level.id,
          note:next,
          data:{
            companion:'jen',
            lesson_focus:'A minor pentatonic consolidation',
            happened:happened
          }
        });
      }
      saveStudent(s);
      renderCompanionLesson(s.id, true);
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
    openStudentMenu(){
      const picker = document.querySelector('.journey-student-picker');
      if(!picker) return;
      document.querySelectorAll('.journey-student-picker.open').forEach(openPicker => {
        if(openPicker !== picker) openPicker.classList.remove('open');
      });
      picker.classList.add('open');
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
      ls.lessonRecords.push(lesson);
      Object.assign(ls.conceptRatings, lesson.conceptRatings || {}); Object.assign(ls.taskRatings, lesson.taskRatings || {});
      const noteBits = [];
      Object.entries(lesson.blockNotes || {}).forEach(([k,v]) => { if(v && v.trim()) noteBits.push(k.toUpperCase()+': '+v.trim()); });
      if(lesson.teacherNotes) noteBits.push('TEACHER: '+lesson.teacherNotes.trim());
      if(lesson.feedback) noteBits.push('NEXT: '+lesson.feedback.trim());
      if(noteBits.length) ls.notes.push({ date:today(), text:noteBits.join(' | ') });
      if(window.HearthProgressEvents){
        const authoredLesson = buildLesson(s, level.num, lesson.lessonNum);
        const reflectionCaptured = Boolean((lesson.feedback || '').trim() || (lesson.teacherNotes || '').trim() || (lesson.blockNotes && String(lesson.blockNotes.reflect || '').trim()));
        const eventTime = lesson.completedAt;
        const eventSuffix = Date.now().toString(36);
        window.HearthProgressEvents.append({
          id:'journey-'+s.id+'-'+level.id+'-'+lesson.lessonNum+'-'+eventSuffix,
          version:1,
          simulator_id:'hearth-guitar',
          event_type:'lesson_completed',
          learner_id:s.id,
          actor_role:'learner',
          node_id:'journey',
          destination_node_id:null,
          journey_level_id:level.id,
          category_id:null,
          lesson_id:authoredLesson.countsTowardLevel ? level.id+'-lesson-'+countedLessonNumber(level, lesson.lessonNum) : level.id+'-entry-check',
          activity_id:authoredLesson.activityId,
          drill_id:null,
          capability_ids:reflectionCaptured && level.id === 'L1' ? ['L1-REFLECT-01'] : [],
          attempt_id:'journey-attempt-'+s.id+'-'+eventSuffix,
          session_id:'journey-session-'+s.id+'-'+eventSuffix,
          evidence_stage:reflectionCaptured ? 'demonstration' : 'contact',
          evidence_source:reflectionCaptured ? 'self_report' : 'direct_interaction',
          source_id:null,
          project_id:null,
          recording_id:null,
          handoff_id:null,
          duration_minutes:authoredLesson.minutes || null,
          rating:null,
          note:lesson.feedback || lesson.teacherNotes || '',
          occurred_at:eventTime,
          recorded_at:eventTime,
          created_at:eventTime,
          return_route:{ node_id:'journey', view_id:'level', params:{ level_id:level.id } },
          fallback_instruction:'Return to Journey and reopen '+level.name+'.',
          data:{
            lesson_title:authoredLesson.title,
            counts_toward_level:authoredLesson.countsTowardLevel,
            category_tags:authoredLesson.categoryTags || [],
            concept_ratings:lesson.conceptRatings || {},
            task_ratings:lesson.taskRatings || {},
            source_lesson_number:lesson.lessonNum
          }
        });
      }
      ls.lessonsDone = countedLessonProgress(s, level).done;
      ls.complete = journeyLevelProgress(s, level).complete;
      if(ls.complete){ const next = s.levels['L'+(level.num+1)]; if(next){ next.unlocked = true; s.currentLevel = level.num+1; } }
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
      s.currentLevel = 1;
      s.levels.L1.notes.push({ date:today(), text:"Level 1 consolidation with Jen: reviewed what we learned last week; practised finger gymnastics with a metronome; learned pentatonic scale pattern with metronome; learned chord embellishments and how they colour songs. Relevance: Jen is close to my ability - I need to level up fast. Need to understand how scales relate to piano and what they mean on guitar. Jen wants to write a song. She didn\'t know C chord, so C chord is a gap to track." });
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
