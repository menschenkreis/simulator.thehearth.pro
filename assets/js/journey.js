// Journey Node — Central Spine Guided Lesson Path
// Multi-student 8-level lesson programme with review, feedback, tracking, and scalable lesson data.

(function(){
  const STORE = 'hearth-journey-v2';
  const ACTIVE = 'hearth-journey-active-student';

  const LEVELS = [
    { id:'L1', num:1, name:'Origin', tag:'THE SEED', color:'#ff4444', totalLessons:8, unlockAfter:8, focus:'First contact: body, instrument, clean sound, simple rhythm.' },
    { id:'L2', num:2, name:'Duality', tag:'THE SECOND VOICE', color:'#ff8800', totalLessons:10, unlockAfter:10, focus:'Two hands, chord gaps, pentatonic vocabulary, embellishments.' },
    { id:'L3', num:3, name:'Creation', tag:'FIRST EXPRESSIONS', color:'#ffcc00', totalLessons:12, unlockAfter:12, focus:'First complete songs, riffs, phrasing, song seeds.' },
    { id:'L4', num:4, name:'Structure', tag:'FRAMEWORKS', color:'#44cc44', totalLessons:14, unlockAfter:14, focus:'Keys, chord families, fretboard maps, timing systems.' },
    { id:'L5', num:5, name:'Change', tag:'TRANSFORMATION', color:'#00cccc', totalLessons:16, unlockAfter:16, focus:'New positions, expressive techniques, transposition, variation.' },
    { id:'L6', num:6, name:'Harmony', tag:'INTEGRATION', color:'#3366ff', totalLessons:18, unlockAfter:18, focus:'Harmony, arrangements, ear-to-hand connection, deeper repertoire.' },
    { id:'L7', num:7, name:'Wisdom', tag:'THE WHY', color:'#6633cc', totalLessons:20, unlockAfter:20, focus:'Theory becomes intuition; analysis, choice, musical judgement.' },
    { id:'L8', num:8, name:'Power', tag:'COLLECTIVE FORCE', color:'#cc33ff', totalLessons:24, unlockAfter:24, focus:'Collaboration, performance, creation, personal sound.' }
  ];

  const CONCEPT_BANK = {
    L1: ['Clean sound','Posture and relaxation','String names','Finger numbering','Pick direction','Open chords','Counting pulse','Practice ritual'],
    L2: ['Finger gymnastics','Metronome control','Pentatonic pattern 1','Chord embellishments','C chord gap check','Scale-to-piano relationship','Songwriting seed','Open chord fluency','Musical colour','Call and response'],
    L3: ['Riff building','Chord progressions','Simple melodies','Pentatonic phrasing','Dynamics','Verse/chorus shape','Song map','Ear copying'],
    L4: ['Major scale map','Key centres','I IV V','Chord families','Fretboard landmarks','Intervals','Rhythm grids','Transposition'],
    L5: ['Bends','Slides','Legato','Position shifts','Minor/major colour','Improvisation constraints','Tone shaping','Variation'],
    L6: ['Triads','Arpeggios','Harmony lines','Arrangement layers','Voice leading','Ear-to-hand','Modal colour','Repertoire integration'],
    L7: ['Functional harmony','Analysis','Improvisation choices','Composition craft','Practice diagnosis','Teaching back','Style comparison','Intentional tone'],
    L8: ['Collaboration','Performance prep','Recording review','Original piece','Set building','Feedback cycles','Personal sound','Mastery reflection']
  };

  const TASK_BANK = {
    warmup: ['Finger gymnastics with metronome','Chromatic warm-up across 6 strings','Slow chord-change breathing drill','Right-hand pulse on muted strings'],
    concept: ['Read / discuss concept','Draw the concept','Compare it on guitar and piano','Say the vocabulary out loud'],
    drill: ['Metronome drill','Slow clean repetitions','Loop the hard 4 bars','Speed ladder only if clean'],
    music: ['Apply inside a song','Create a 2-bar phrase','Embellish a chord progression','Improvise with only today’s notes'],
    review: ['Review last lesson notes','Find gaps without shame','Rate confidence','Choose next gradient']
  };

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function uid(){ return 's-' + Math.random().toString(36).slice(2,9) + '-' + Date.now().toString(36); }
  function today(){ return new Date().toISOString().slice(0,10); }
  function getLevel(num){ return LEVELS[Math.max(0, Math.min(LEVELS.length-1, (Number(num)||1)-1))]; }
  function rotate(list, n, count){
    const out=[]; if(!list || !list.length) return out;
    for(let i=0;i<count;i++) out.push(list[(n+i)%list.length]);
    return out;
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
      jen.levels.L2.notes.push({ date:'2026-06-14', text:'L2 with Jen: reviewed last week, practised finger gymnastics with metronome, learned pentatonic scale pattern with metronome, learned chord embellishments and how they colour songs. Jen is close to my ability; I need to level up fast to stay ahead. Need to understand how scales relate to piano and what they mean for playing the instrument. Jen wants to learn to write a song. She didn’t know C chord, so we are seeing the gaps.' });
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
  }

  function buildLesson(student, levelNum, lessonNum){
    const level = getLevel(levelNum);
    const concepts = CONCEPT_BANK[level.id] || CONCEPT_BANK.L1;
    const primaryConcept = concepts[(lessonNum-1) % concepts.length];
    const secondaryConcept = concepts[lessonNum % concepts.length];
    const practiceDrills = (window.PRACTICE && window.PRACTICE.drills) ? window.PRACTICE.drills : [];
    const filtered = practiceDrills.filter(d => levelNum <= 2 ? d.difficulty <= 2 : d.difficulty <= Math.min(4, levelNum));
    const drill = (filtered.length ? filtered : practiceDrills)[(lessonNum-1) % Math.max(1, (filtered.length || practiceDrills.length))] || { title:'Clean repetition drill', category:'Technique', duration:'10 min', defaultBpm:60, instructions:'Choose one small movement and repeat it cleanly with a metronome.' };
    const warm = TASK_BANK.warmup[(lessonNum-1) % TASK_BANK.warmup.length];
    const music = TASK_BANK.music[(lessonNum-1) % TASK_BANK.music.length];
    const conceptTask = TASK_BANK.concept[(lessonNum-1) % TASK_BANK.concept.length];
    const review = TASK_BANK.review[(lessonNum-1) % TASK_BANK.review.length];

    return {
      id: level.id + '-' + lessonNum,
      levelId: level.id,
      levelNum,
      lessonNum,
      title: level.name + ' Lesson ' + lessonNum + ': ' + primaryConcept,
      minutes: 60,
      conceptNames: [primaryConcept, secondaryConcept],
      taskNames: [warm, conceptTask, drill.title, music, review],
      blocks: [
        { id:'review', min:8, phase:'REVIEW', source:'Journey Notes', title:'Review last contact', body:'Look at the previous lesson. What did we learn? What gap appeared? What should not be skipped today?', prompt:'Write the real notes here — e.g. “didn’t know C chord”, “wants to write a song”, “scale/piano connection unclear”.' },
        { id:'warmup', min:10, phase:'WARM-UP', source:'Practice', title:warm, body:'Wake the hands with a clean, small movement before adding new material.', prompt:'Tempo, cleanliness, body tension, and one correction.' },
        { id:'concept', min:12, phase:'CONCEPT', source:'Knowing/Foundation', title:primaryConcept, body:'Teach the idea plainly. Connect significance to mass: say it, draw it, find it on the guitar.', prompt:'What words were misunderstood? What physical thing did this map to?' },
        { id:'drill', min:15, phase:'DRILL', source:'Do/Practice', title:drill.title, body:(drill.instructions || drill.description || 'Practise slowly with a metronome.'), prompt:'BPM, pass condition, mistake pattern, next gradient.' },
        { id:'music', min:10, phase:'MUSIC APPLICATION', source:'Play/Create', title:music, body:'Turn the drill into music so it does not stay academic.', prompt:'Song, riff, chord progression, or writing idea used today.' },
        { id:'reflect', min:5, phase:'REFLECT', source:'Hearth', title:'Feedback + next lesson target', body:'Rate confidence, capture notes, choose the next small step.', prompt:'What should the next lesson do?' }
      ]
    };
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
    const root = document.getElementById('journey-content');
    if(!root) return;
    const state = loadState();
    const student = activeStudent(state);
    const level = getLevel(student.currentLevel || 1);
    const lvlState = student.levels[level.id];
    const nextLesson = (lvlState.lessonsDone || 0) + 1;
    const lesson = buildLesson(student, level.num, nextLesson);
    const pct = Math.min(100, Math.round((lvlState.lessonsDone || 0) / level.totalLessons * 100));
    const recentNotes = LEVELS.flatMap(l => (student.levels[l.id].notes || []).map(n => ({...n, level:l.id}))).slice(-3).reverse();

    let html = '<div class="journey-shell">';
    html += '<div class="journey-hero"><div class="journey-kicker">Central Spine Journey</div><div class="journey-title">'+esc(student.name)+' · '+level.id+' '+esc(level.name)+'</div>';
    html += '<div class="journey-sub">Guided 1-hour lessons through the 8-level spine. Each lesson pulls from Foundation, Knowing, Do, Practice, Play and Create — with review, notes, ratings, feedback, and unlockable progression.</div>';
    html += '<div class="journey-students">';
    state.students.forEach(s => html += '<button class="journey-chip '+(s.id===student.id?'on':'')+'" onclick="Journey.switchStudent(\''+s.id+'\')">'+esc(s.name)+'</button>');
    html += '<button class="journey-chip" onclick="Journey.addStudent()">+ Add student</button>';
    html += '<button class="journey-chip" onclick="Journey.renameStudent()">Rename</button>';
    html += '</div></div>';

    html += '<div class="journey-grid"><div>';
    html += '<div class="journey-card journey-guide"><img src="images/character-full/Encouraging.png" alt="Guide"><div class="journey-bubble">'+guideText(student, level, lvlState, recentNotes)+'</div></div>';
    html += '<div class="journey-card" style="margin-top:14px"><div class="journey-kicker">8 Level Spine</div><div class="journey-spine" style="margin-top:10px">';
    LEVELS.forEach(l => {
      const ls = student.levels[l.id];
      const unlocked = !!ls.unlocked || l.num === 1 || student.levels['L'+(l.num-1)]?.complete;
      const complete = !!ls.complete;
      const lpct = Math.min(100, Math.round((ls.lessonsDone || 0) / l.totalLessons * 100));
      html += '<div class="journey-level '+(unlocked?'unlocked':'locked')+' '+(l.num===level.num?'active':'')+'" style="--lvl:'+l.color+'" '+(unlocked?'onclick="Journey.openLevel('+l.num+')"':'')+'>';
      html += '<div style="display:flex;justify-content:space-between;gap:8px"><div><div style="font-family:Cinzel;color:'+(l.num===level.num?l.color:'var(--text)')+';font-size:.82rem;font-weight:800">'+l.id+' · '+esc(l.name)+'</div><div style="font-size:.6rem;color:var(--dim)">'+(unlocked?esc(l.tag):'Locked')+'</div></div><div style="font-family:JetBrains Mono;font-size:.62rem;color:var(--dim)">'+(ls.lessonsDone||0)+'/'+l.totalLessons+'</div></div>';
      html += '<div class="journey-progressbar"><div style="width:'+lpct+'%"></div></div>';
      if(complete) html += '<div style="font-size:.62rem;color:'+l.color+';margin-top:5px">Level achieved ✓ Next unlocked</div>';
      html += '</div>';
    });
    html += '</div></div></div>';

    html += '<div>';
    html += '<div class="journey-card"><div style="display:flex;justify-content:space-between;gap:12px;align-items:start"><div><div class="journey-kicker">Current Lesson</div><h3 style="font-family:Cinzel;color:'+level.color+';margin:6px 0 4px">'+esc(lesson.title)+'</h3><div style="font-size:.75rem;color:var(--dim);line-height:1.5">60 minutes · '+esc(level.focus)+'</div></div><div style="text-align:right;font-family:JetBrains Mono;font-size:.65rem;color:var(--dim)">'+pct+'% level</div></div><div class="journey-progressbar"><div style="width:'+pct+'%;background:'+level.color+'"></div></div>';
    html += '<div class="journey-actions"><button class="journey-btn" onclick="Journey.startLesson()">Begin / Continue 1h Lesson</button><button class="journey-btn secondary" onclick="Journey.openJournal()">Student Notes</button><button class="journey-btn secondary" onclick="Journey.quickJenNote()">Add Jen-style lesson note</button></div></div>';

    html += '<div class="journey-lesson-card"><div class="journey-kicker">Lesson Plan</div>';
    lesson.blocks.forEach(b => {
      html += '<div class="journey-block"><div class="journey-block-head"><div><div class="journey-phase">'+esc(b.phase)+' · '+esc(b.source)+'</div><strong style="font-family:Cinzel;color:var(--text);font-size:.88rem">'+esc(b.title)+'</strong></div><div class="journey-min">'+b.min+' min</div></div><div style="font-size:.74rem;color:var(--dim);line-height:1.5">'+esc(b.body)+'</div></div>';
    });
    html += '</div>';

    html += '<div class="journey-card"><div class="journey-kicker">Recent Notes</div>';
    if(recentNotes.length) recentNotes.forEach(n => html += '<div class="journey-note"><strong>'+esc(n.level)+' · '+esc(n.date || '')+'</strong><br>'+esc(n.text)+'</div>');
    else html += '<div style="font-size:.72rem;color:var(--dim);margin-top:8px">No notes yet. Journey notes become the teaching memory for each student.</div>';
    html += '</div></div></div></div>';
    root.innerHTML = html;
    lightMapSpine(student);
  }

  function guideText(student, level, lvlState, notes){
    if(notes.length && /C chord|gap/i.test(notes[0].text)) return 'This is exactly why Journey exists: the lesson revealed a gap. Don’t skip it. Put C chord into the next warm-up, connect the pentatonic to piano visually, and give the songwriting goal a tiny song seed.';
    if(student.name.toLowerCase().includes('jen')) return 'Jen’s path should track what happened in the real lesson, not an abstract syllabus. Use notes to capture gaps, interests, and next gradients — then the next lesson adapts.';
    if((lvlState.lessonsDone||0)===0) return 'Start with one full contact. Review, warm hands, teach one concept, drill it, apply musically, then reflect. The lesson is one hour because it has a beginning, middle, and closure.';
    return 'The spine remembers progress per student. Complete enough lessons in '+level.id+' and the next level unlocks. Rate concepts honestly — “need work” is navigation, not failure.';
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
    const root = document.getElementById('journey-content');
    const state = loadState();
    const student = activeStudent(state);
    const level = getLevel(student.currentLevel || 1);
    const lvlState = student.levels[level.id];
    const lessonNum = (lvlState.lessonsDone || 0) + 1;
    const lesson = buildLesson(student, level.num, lessonNum);
    student.activeLesson = student.activeLesson || { levelId:level.id, lessonNum, date:today(), blockNotes:{}, conceptRatings:{}, taskRatings:{}, feedback:'', teacherNotes:'', status:'in-progress' };
    saveStudent(student);
    let html = '<div class="journey-shell"><div class="journey-hero"><div class="journey-kicker">'+esc(student.name)+' · '+level.id+' Lesson '+lessonNum+'</div><div class="journey-title">'+esc(lesson.title)+'</div><div class="journey-sub">Use this as the live lesson room. Notes autosave when you save/complete. Each block has a reason and a tracking space.</div><div class="journey-actions"><button class="journey-btn secondary" onclick="Journey.render()">← Dashboard</button></div></div>';
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

  const Journey = {
    render,
    startLesson: renderLesson,
    openLevel(num){
      const state = loadState(); const s = activeStudent(state); const l = getLevel(num);
      const unlocked = num === 1 || s.levels[l.id].unlocked || s.levels['L'+(num-1)]?.complete;
      if(!unlocked) return;
      s.currentLevel = num; s.activeLesson = null; saveStudent(s); render();
    },
    switchStudent(id){ const state=loadState(); state.activeStudentId=id; saveState(state); render(); },
    addStudent(){ const name = prompt('Student name?'); if(!name) return; const state=loadState(); const s=blankStudent(name.trim()); state.students.push(s); state.activeStudentId=s.id; saveState(state); render(); },
    renameStudent(){ const state=loadState(); const s=activeStudent(state); const name=prompt('Rename journey/student:', s.name); if(!name) return; s.name=name.trim(); saveStudent(s); render(); },
    setDraftRating(kind, encoded, value){
      const s = collectDraft(); if(!s.activeLesson) return;
      const name = decodeURIComponent(encoded); const key = kind==='concept' ? 'conceptRatings' : 'taskRatings';
      s.activeLesson[key][name] = value; saveStudent(s); renderLesson();
    },
    saveLessonDraft(){ const s=collectDraft(); saveStudent(s); renderLesson(); },
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
      s.levels.L2.notes.push({ date:today(), text:'L2 with Jen: reviewed what we learned last week; practised finger gymnastics with a metronome; learned pentatonic scale pattern with metronome; learned chord embellishments and how they colour songs. Relevance: Jen is close to my ability — I need to level up fast. Need to understand how scales relate to piano and what they mean on guitar. Jen wants to write a song. She didn’t know C chord, so C chord is a gap to track.' });
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
