// Practice Room override — calmer Practise space loaded after the main simulator script.
(function(){
  const CANDLE = '#e8a020';

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function state(){ try{return JSON.parse(localStorage.getItem('hearth-practice-state')||'{}')}catch(e){return{}} }
  function saveState(s){ localStorage.setItem('hearth-practice-state', JSON.stringify(s)); }
  function log(){ try{return JSON.parse(localStorage.getItem('hearth-practice-log')||'[]')}catch(e){return[]} }
  function saveLog(l){ localStorage.setItem('hearth-practice-log', JSON.stringify(l)); }
  function notes(){ try{return JSON.parse(localStorage.getItem('hearth-practice-notes')||'[]')}catch(e){return[]} }
  function saveNote(n){ const all=notes(); all.push(n); localStorage.setItem('hearth-practice-notes', JSON.stringify(all)); }
  function prefs(){ const s=state(); return { time:s.altarTime||20, focus:s.altarFocus||'All', intention:s.altarIntention||'Clean, focused practice' }; }
  function categories(){ const P=window.PRACTICE; return P&&P.drills ? ['All', ...new Set(P.drills.map(d=>d.category))] : ['All']; }
  function filtered(focus){ const P=window.PRACTICE; if(!P||!P.drills)return []; return focus&&focus!=='All' ? P.drills.filter(d=>d.category===focus) : P.drills; }
  function nextDrill(focus){
    const P=window.PRACTICE; if(!P||!P.drills)return null;
    const s=state(); const ds=filtered(focus); if(!ds.length)return P.drills[0]||null;
    if(s.currentDrill){ const cur=ds.find(d=>d.id===s.currentDrill); if(cur)return cur; }
    const done=s.completed||{}; return ds.find(d=>!done[d.id]) || ds[0];
  }
  function streak(l){
    if(!l.length)return 0;
    const days=[...new Set(l.map(x=>new Date(x.ts).toDateString()))].sort((a,b)=>new Date(b)-new Date(a));
    if(days[0]!==new Date().toDateString())return 0;
    let s=1; for(let i=1;i<days.length;i++){ const diff=(new Date(days[i-1])-new Date(days[i]))/(86400000); if(Math.round(diff)===1)s++; else break; }
    return s;
  }
  function guideText(p,l,next){
    const last=l[l.length-1];
    if(last && last.feeling==='stuck') return 'Last time the gradient was too steep. Good catch. Today should be smaller: slower BPM, fewer notes, cleaner body. Practise is where we diagnose, not where we pretend.';
    if(last && last.feeling==='nailed') return 'You ended strong. Don’t rush past it. Prove the same movement again with calmer hands, then apply it musically for one minute.';
    if(p.focus!=='All') return 'Focused practice wins. You opened '+p.focus+', so let everything else wait outside the room. One category, one drill, one honest reflection.';
    if(next) return 'Start with '+next.title+'. The goal is not to finish the list. The goal is to leave with one clearer movement than you arrived with.';
    return 'Choose time, focus, and intention. Then light the candle. The room is here to make practice simple enough to actually do.';
  }
  function plan(p,next){
    const t=Number(p.time)||20;
    const warm=Math.max(3,Math.min(10,Math.round(t*.22)));
    const work=Math.max(6,Math.round(t*.48));
    const apply=Math.max(3,Math.round(t*.18));
    const reflect=Math.max(2,t-warm-work-apply);
    return [
      {phase:'Arrive',min:warm,title:'Warm hands + body',body:'Posture, breath, slow clean movement.'},
      {phase:'Work',min:work,title:next?next.title:'Chosen drill',body:'Metronome only as fast as clean allows.'},
      {phase:'Apply',min:apply,title:'Make it musical',body:'Put it in a song, riff, chord, or tiny phrase.'},
      {phase:'Reflect',min:reflect,title:'Write the truth',body:'What changed? What gap appeared?'}
    ];
  }

  window.setPracticeTime = function(minutes){ const s=state(); s.altarTime=minutes; saveState(s); window.showPractice(); };
  window.setPracticeFocus = function(focus){ const s=state(); s.altarFocus=focus; saveState(s); window.showPractice(); };
  window.savePracticeIntention = function(text){ const s=state(); s.altarIntention=(text||'').trim()||'Clean, focused practice'; saveState(s); window.showPractice(); };
  window.startTemplePractice = function(){ const p=prefs(); const d=nextDrill(p.focus); if(d) window.startDrillPractice(d.id,p.time); };

  window.showPractice = function(){
    document.querySelectorAll('.pnl').forEach(p=>p.classList.remove('on'));
    const panel=document.getElementById('p-foundation'); if(!panel)return;
    panel.classList.add('on');
    const P=window.PRACTICE; if(!P||!P.drills){ panel.innerHTML='<div style="padding:24px;color:var(--dim)">Practice data is loading. Refresh once if this stays here.</div>'; return; }
    const p=prefs(); const l=log(); const d=nextDrill(p.focus); const cats=categories(); const ds=filtered(p.focus).slice(0,5); const pl=plan(p,d); const ns=notes(); const lastNote=ns[ns.length-1]; const done=Object.keys(state().completed||{}).length;
    const totalMinutes=l.reduce((a,x)=>a+(x.minutes||0),0);
    let html='<div class="practice-temple"><div class="practice-title"><h2>Practise Room</h2><p>Choose time, choose focus, practise one clear thing, then write what actually happened.</p></div><div class="practice-chamber"><div style="position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1.35fr) minmax(240px,.65fr);gap:16px;padding:18px">';
    html+='<div><div class="practice-panel" style="border-color:'+CANDLE+'66;background:linear-gradient(135deg,rgba(232,160,32,.12),rgba(13,11,8,.72))"><div class="practice-panel-title">Today’s Practice Path</div><div style="display:flex;gap:14px;align-items:center;margin-bottom:12px"><div class="temple-candle" style="flex:0 0 auto"><div class="temple-flame"></div></div><div style="flex:1"><div style="font-family:Cinzel,serif;color:var(--gold);font-size:1.05rem;font-weight:800">'+esc(p.time)+' minute candle · '+esc(p.focus)+'</div><div style="font-size:.75rem;color:var(--dim);line-height:1.45;margin-top:4px">Intention: <span style="color:var(--text)">'+esc(p.intention)+'</span></div></div></div>';
    html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">'+pl.map(b=>'<div style="background:rgba(13,11,8,.55);border:1px solid var(--border);border-radius:10px;padding:10px;min-height:92px"><div style="font-family:JetBrains Mono;font-size:.54rem;color:'+CANDLE+';letter-spacing:.11em;text-transform:uppercase">'+esc(b.phase)+' · '+b.min+'m</div><div style="font-family:Cinzel,serif;font-size:.82rem;color:var(--text);font-weight:700;margin:5px 0">'+esc(b.title)+'</div><div style="font-size:.66rem;color:var(--dim);line-height:1.35">'+esc(b.body)+'</div></div>').join('')+'</div></div>';
    html+='<div class="practice-panel" style="margin-top:14px"><div class="practice-panel-title">Choose Focus</div><div class="practice-choice-row">'+cats.map(c=>'<button class="practice-choice'+(p.focus===c?' active':'')+'" onclick="playSfx(\'click\');setPracticeFocus(\''+esc(c)+'\')">'+esc(c)+'</button>').join('')+'</div></div>';
    html+='<div class="practice-panel" style="margin-top:14px"><div class="practice-panel-title">Choose Time</div><div class="practice-choice-row">'+[10,20,30,45,60].map(t=>'<button class="practice-choice'+(p.time===t?' active':'')+'" onclick="playSfx(\'click\');setPracticeTime('+t+')">'+t+' min</button>').join('')+'</div></div>';
    html+='<div class="practice-panel" style="margin-top:14px"><div class="practice-panel-title">Session Intention</div><textarea onblur="savePracticeIntention(this.value)" style="width:100%;box-sizing:border-box;background:#0d0b08;border:1px solid var(--border);border-radius:10px;color:var(--text);padding:10px;font-family:DM Sans,sans-serif;font-size:.78rem;min-height:58px" placeholder="Example: clean C chord changes, slow pentatonic, no shoulder tension...">'+esc(p.intention)+'</textarea></div>';
    html+='<div class="practice-panel" style="margin-top:14px"><div class="practice-panel-title">Practice Book · Pick A Drill</div><div class="practice-drill-list">'+ds.map(x=>'<button class="practice-drill-pick" onclick="playSfx(\'book-open\');showPracticeDrill(\''+esc(x.id)+'\')"><span><b>'+esc(x.title)+'</b><br><span>'+esc(x.category)+' · '+esc(x.duration)+' · BPM '+esc(x.defaultBpm||60)+'</span></span><span>Open</span></button>').join('')+'</div></div></div>';
    html+='<div class="practice-side"><div class="practice-panel" style="text-align:center;padding:16px 12px"><img src="images/character-full/Encouraging.png" style="width:96px;height:96px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,.4));animation:char-float 3s ease-in-out infinite"><div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 12px;margin-top:8px;position:relative"><div style="position:absolute;left:50%;top:-6px;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid var(--border)"></div><div class="practice-guide-note" style="font-size:.72rem;color:var(--text);line-height:1.4">'+esc(guideText(p,l,d))+'</div></div></div>';
    html+='<div class="practice-panel"><div class="practice-panel-title">Stats</div><div class="practice-scroll-grid"><div class="practice-stat"><strong>'+streak(l)+'</strong><span>streak</span></div><div class="practice-stat"><strong>'+totalMinutes+'</strong><span>minutes</span></div><div class="practice-stat"><strong>'+done+'</strong><span>mastered</span></div><div class="practice-stat"><strong>'+l.length+'</strong><span>sessions</span></div></div></div>';
    html+='<div class="practice-panel"><div class="practice-panel-title">Next Best Drill</div><div style="font-size:.88rem;color:var(--text);font-weight:800">'+esc(d?d.title:'Choose a drill')+'</div><div style="font-size:.68rem;color:var(--dim);margin-top:5px;line-height:1.4">'+esc(d?(d.category+' · '+d.duration+' · start around '+(d.defaultBpm||60)+' BPM'):'Open the book first')+'</div></div>';
    if(l.length){ const last=l[l.length-1]; html+='<div class="practice-panel"><div class="practice-panel-title">Last Session</div><div style="font-size:.72rem;color:var(--dim);line-height:1.45">'+esc(last.drillTitle||'Practice')+' · '+esc(last.minutes||1)+' min · '+esc(last.feeling||'logged')+'</div></div>'; }
    if(lastNote){ html+='<div class="practice-panel"><div class="practice-panel-title">Last Note</div><div style="font-size:.72rem;color:var(--dim);line-height:1.45">'+esc(lastNote.note||'')+'</div></div>'; }
    html+='<button class="practice-start" onclick="playSfx(\'book-open\');startTemplePractice()">Start Today’s Practice</button></div></div></div></div>';
    panel.innerHTML=html;
  };

  const oldFinish = window._finishDrill;
  window._finishDrill = function(drillId, feeling){
    const P=window.PRACTICE; if(!P||!P.drills)return;
    const drill=P.drills.find(d=>d.id===drillId); if(!drill)return;
    const m=window._metro;
    const minutes=typeof window._stopTimer==='function' ? window._stopTimer() : 1;
    const bpm=m?m.bpm:(drill.defaultBpm||60);
    const l=log(); l.push({drillId,drillTitle:drill.title,minutes,bpm,feeling,ts:new Date().toISOString()}); saveLog(l);
    const s=state(); if(!s.completed)s.completed={};
    let next=null; let nextAction=''; const idx=P.drills.findIndex(d=>d.id===drillId);
    if(feeling==='nailed'){ s.completed[drillId]=true; next=P.drills[idx+1]||drill; nextAction='Good. Save what made it clean, then either repeat calmly or move to the next small thing.'; }
    else if(feeling==='getting'){ next=drill; nextAction='Stay here. You are close enough that repetition will teach the hands.'; }
    else { next=P.drills[Math.max(0,idx-1)]||drill; nextAction='Gradient too steep. Step back, lower BPM, or reduce the movement.'; }
    if(window.HearthProgressEvents){
      window.HearthProgressEvents.append({
        event_type:'practice_session_completed',
        node_id:'practise',
        drill_id:drillId,
        duration_minutes:minutes,
        rating:feeling==='nailed'?5:feeling==='getting'?3:1,
        data:{ drill_title:drill.title, bpm:bpm, feeling:feeling, marked_complete:feeling==='nailed' }
      });
    }
    s.currentDrill=next.id; saveState(s);
    const emoji=feeling==='nailed'?'🔥':feeling==='getting'?'💪':'🤔';
    const msg=feeling==='nailed'?'Nailed it':feeling==='getting'?'Getting there':'Need more work';
    const panel=document.getElementById('p-foundation');
    panel.innerHTML='<div style="padding:20px;max-width:680px;margin:0 auto;text-align:center"><div style="font-size:3rem;margin-bottom:12px">'+emoji+'</div><div style="font-family:Cinzel,serif;color:var(--text);font-size:1.2rem;font-weight:700;margin-bottom:8px">'+msg+'</div><div style="font-size:.8rem;color:var(--dim);margin-bottom:8px">'+esc(drill.title)+' · '+minutes+' min · '+bpm+' BPM</div><div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px;margin:16px 0;font-size:.85rem;color:var(--text);line-height:1.5">'+esc(nextAction)+'</div><div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:16px;margin:16px 0;text-align:left"><div style="font-family:JetBrains Mono;font-size:.58rem;color:'+CANDLE+';letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px">Reflection Note</div><textarea id="practice-reflection-note" style="width:100%;box-sizing:border-box;background:#0d0b08;border:1px solid var(--border);border-radius:10px;color:var(--text);padding:10px;font-family:DM Sans,sans-serif;font-size:.78rem;min-height:92px" placeholder="What happened? What gap showed up? What should the next practice do?"></textarea><button onclick="savePracticeReflection(\''+esc(drillId)+'\',\''+esc(feeling)+'\','+minutes+','+bpm+')" style="margin-top:10px;background:'+CANDLE+';color:#0d0b08;border:none;padding:10px 16px;border-radius:8px;font-weight:800;cursor:pointer">Save Reflection</button></div><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><button onclick="startDrillPractice(\''+esc(next.id)+'\')" style="background:'+CANDLE+';color:#0d0b08;border:none;padding:12px 24px;border-radius:8px;font-family:DM Sans,sans-serif;font-size:.85rem;font-weight:600;cursor:pointer">Keep Practising</button><button class="back-btn" onclick="showPractice()">← Practise Room</button></div></div>';
  };

  window.savePracticeReflection = function(drillId, feeling, minutes, bpm){
    const box=document.getElementById('practice-reflection-note');
    const note=box?box.value.trim():'';
    if(note){ const P=window.PRACTICE; const d=P&&P.drills?P.drills.find(x=>x.id===drillId):null; saveNote({ts:new Date().toISOString(), drillId, drillTitle:d?d.title:drillId, feeling, minutes, bpm, note}); }
    window.showPractice();
  };
})();
