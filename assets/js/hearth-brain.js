// Hearth Brain override — turns Hearth into a learning-brain command centre.
(function(){
  const GOLD='#d4af69', AMBER='#e8a020';
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function read(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}}
  function countDone(obj){return Object.keys(obj||{}).filter(k=>obj[k]).length;}
  function pct(a,b){return b?Math.round(a/b*100):0;}
  function practiceLog(){return read('hearth-practice-log',[])}
  function practiceNotes(){return read('hearth-practice-notes',[])}
  function knowingTotal(){const K=window.KNOWING;return K&&K.categories?K.categories.reduce((s,c)=>s+c.topics.length,0):52}
  function doingTotal(){const D=window.DOING;return D&&D.categories?D.categories.reduce((s,c)=>s+c.drills.length,0):67}
  function calcStreak(log){
    if(!log.length)return 0; const days=[...new Set(log.map(x=>new Date(x.ts||x.date).toDateString()))].sort((a,b)=>new Date(b)-new Date(a));
    if(days[0]!==new Date().toDateString())return 0; let s=1; for(let i=1;i<days.length;i++){const diff=(new Date(days[i-1])-new Date(days[i]))/86400000;if(Math.round(diff)===1)s++;else break;} return s;
  }
  function brainRegions(){
    const f=countDone(read('hearth-foundation-progress',{}));
    const k=countDone(read('hearth-knowing-progress',{}));
    const d=countDone(read('hearth-doing-progress',{}));
    const p=practiceLog(); const nailed=p.filter(x=>x.feeling==='nailed').length;
    const notes=practiceNotes().length;
    return [
      {id:'brainstem',label:'Brainstem',x:330,y:408,r:17,color:'#8b6b3d',node:'foundation',signal:pct(f,7),data:f+'/7 foundations',role:'Posture, breath, tuning and the basic safety of learning.',guide:'Foundation lives here. If the body is confused, everything higher up becomes noisy.'},
      {id:'motor',label:'Motor Cortex',x:225,y:135,r:21,color:'#e8a020',node:'doing',signal:pct(d,doingTotal()),data:d+'/'+doingTotal()+' drills touched',role:'Finger movement, picking, chord changes and physical control.',guide:'Do builds the movement circuits. Clean repetition is myelin food.'},
      {id:'visual',label:'Visual Cortex',x:405,y:185,r:18,color:'#6fa35f',node:'knowing',signal:pct(k,knowingTotal()),data:k+'/'+knowingTotal()+' concepts read',role:'Chord diagrams, fretboard maps, notation and shape recognition.',guide:'Know turns theory into visible patterns. If you can see it, you can find it.'},
      {id:'auditory',label:'Auditory Cortex',x:345,y:302,r:18,color:'#5a9fd4',node:'play',signal:15,data:'world traditions available',role:'Tone, pitch, groove, style and listening memory.',guide:'Play teaches the ear what guitar sounds like across the world.'},
      {id:'prefrontal',label:'Prefrontal Cortex',x:135,y:158,r:18,color:'#9b59b6',node:'study',signal:Math.min(100,notes*12),data:notes+' reflection notes',role:'Metacognition: noticing gaps, choosing gradients, judging readiness.',guide:'This is where “need more work” becomes useful navigation, not failure.'},
      {id:'hippocampus',label:'Hippocampus',x:270,y:290,r:16,color:'#caa13a',node:'practice',signal:Math.min(100,p.length*8),data:p.length+' practice sessions',role:'Memory consolidation. What happened in real sessions gets stored here.',guide:'Practise and reflection turn a contact into a memory trace.'},
      {id:'broca',label:'Broca Area',x:175,y:235,r:16,color:'#c45a20',node:'create',signal:8,data:'creation pathway',role:'Musical language output: phrases, songwriting, arranging and expression.',guide:'Create is where vocabulary becomes speech.'},
      {id:'limbic',label:'Limbic System',x:235,y:268,r:16,color:'#b64a4a',node:'mastery',signal:Math.min(100,nailed*10),data:nailed+' strong finishes',role:'Reward, emotion, motivation and the feeling of music.',guide:'Emotion is not decoration. It is part of why the brain keeps learning.'}
    ];
  }
  function recommendation(regions){
    const weakest=[...regions].sort((a,b)=>a.signal-b.signal)[0];
    if(!weakest)return 'Open a node and make one small contact.';
    return 'Lowest signal: '+weakest.label+'. Good next move: open '+(window.NODE_DATA&&NODE_DATA[weakest.node]?NODE_DATA[weakest.node].title:weakest.node)+' and do one small piece.';
  }
  function renderRegionCard(r){
    return '<div class="hearth-region-card" onclick="HearthBrain.openRegion(\''+r.id+'\')" style="--r:'+r.color+'"><div><div class="hb-mini-label">'+esc(r.label)+'</div><div class="hb-role">'+esc(r.role)+'</div></div><div class="hb-signal"><span>'+r.signal+'%</span><i style="width:'+r.signal+'%"></i></div></div>';
  }
  function render(){
    document.querySelectorAll('.pnl').forEach(p=>p.classList.remove('on'));
    const el=document.getElementById('p-hearth'); if(!el)return; el.classList.add('on');
    injectStyle(); const regs=brainRegions(); const p=practiceLog(); const totalMin=p.reduce((a,x)=>a+(x.minutes||0),0); const rec=recommendation(regs);
    let lines='', nodes='', pulses='';
    const paths=[['brainstem','motor'],['hippocampus','motor'],['visual','prefrontal'],['prefrontal','motor'],['auditory','broca'],['motor','broca'],['limbic','hippocampus'],['auditory','limbic']];
    paths.forEach(([a,b])=>{const A=regs.find(x=>x.id===a),B=regs.find(x=>x.id===b); if(!A||!B)return; const op=.08+Math.min(A.signal,B.signal)/220; const cx=(A.x+B.x)/2+(B.y-A.y)*.12, cy=(A.y+B.y)/2-(B.x-A.x)*.12; lines+='<path d="M'+A.x+','+A.y+' Q'+cx+','+cy+' '+B.x+','+B.y+'" fill="none" stroke="'+AMBER+'" stroke-opacity="'+op+'" stroke-width="1.2"/>';});
    regs.forEach(r=>{const g=Math.max(.12,r.signal/100); nodes+='<g onclick="HearthBrain.openRegion(\''+r.id+'\')" style="cursor:pointer"><circle cx="'+r.x+'" cy="'+r.y+'" r="'+(r.r*2.5)+'" fill="'+r.color+'" opacity="'+(g*.08)+'"/><circle cx="'+r.x+'" cy="'+r.y+'" r="'+r.r+'" fill="'+r.color+'" opacity="'+(.18+g*.45)+'" stroke="'+r.color+'" stroke-width="'+(1+g*1.4)+'"/><circle cx="'+r.x+'" cy="'+r.y+'" r="'+(r.r*.32)+'" fill="#fff" opacity="'+(.08+g*.38)+'"/><text x="'+r.x+'" y="'+(r.y+r.r+14)+'" text-anchor="middle" fill="'+r.color+'" font-family="JetBrains Mono" font-size="8" opacity="'+(.45+g*.45)+'">'+esc(r.label)+'</text></g>'; if(r.signal>15)pulses+='<circle cx="'+r.x+'" cy="'+r.y+'" r="'+r.r+'" fill="none" stroke="'+r.color+'" stroke-opacity=".18"><animate attributeName="r" from="'+r.r+'" to="'+(r.r*2.5)+'" dur="4s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" from=".18" to="0" dur="4s" repeatCount="indefinite"/></circle>';});
    el.innerHTML='<div class="hearth-brain"><button class="back-btn" onclick="backToMap()">← Map</button><div class="hb-hero"><div><div class="hb-kicker">The Hearth · Learning Brain</div><h2>Neural Command Centre</h2><p>This is the brain view of the simulator: every node trains a different learning system. Tap a brain region to see what it means and where to go next.</p></div><div class="hb-guide"><img src="images/character-full/Thinking.png"><div>'+esc(rec)+'</div></div></div><div class="hb-grid"><div class="hb-map"><svg viewBox="0 0 500 480" xmlns="http://www.w3.org/2000/svg"><path d="M100,240 C95,200 100,160 115,130 C130,100 155,80 190,68 C220,58 255,52 285,55 C315,58 345,70 370,90 C395,110 415,140 425,175 C435,205 438,235 430,260 C425,280 415,300 400,315 C385,330 360,340 335,345 C310,350 280,355 255,355 C230,355 205,348 185,338 C165,328 148,312 135,295 C120,275 108,260 100,240" fill="#0d0b08" stroke="'+GOLD+'" stroke-opacity=".22"/><path d="M245,62 C250,100 248,140 240,180 C235,210 230,240 228,270" fill="none" stroke="'+GOLD+'" stroke-opacity=".15" stroke-dasharray="3 4"/><path d="M105,230 C140,225 180,222 220,225 C260,228 300,235 340,250" fill="none" stroke="'+GOLD+'" stroke-opacity=".15" stroke-dasharray="3 4"/><path d="M355,330 C370,320 390,318 405,325 C420,332 430,345 432,360 C434,375 428,390 415,398 C400,406 380,408 365,402 C350,396 340,385 338,370 C336,355 342,340 355,330" fill="#0d0b08" stroke="'+GOLD+'" stroke-opacity=".15"/>'+lines+pulses+nodes+'</svg><div id="hearth-region-detail" class="hb-detail">Tap a glowing brain region.</div></div><div><div class="hb-stats"><div><b>'+calcStreak(p)+'</b><span>practice streak</span></div><div><b>'+totalMin+'</b><span>minutes logged</span></div><div><b>'+practiceNotes().length+'</b><span>reflection notes</span></div></div><div class="hb-region-list">'+regs.map(renderRegionCard).join('')+'</div></div></div></div>';
  }
  function openRegion(id){
    const r=brainRegions().find(x=>x.id===id); if(!r)return; const box=document.getElementById('hearth-region-detail'); if(!box)return;
    const title=window.NODE_DATA&&NODE_DATA[r.node]?NODE_DATA[r.node].title:r.node;
    box.innerHTML='<div class="hb-kicker" style="color:'+r.color+'">'+esc(r.label)+'</div><h3 style="color:'+r.color+'">'+esc(title)+' signal · '+r.signal+'%</h3><p>'+esc(r.role)+'</p><p><strong>Guide:</strong> '+esc(r.guide)+'</p><div class="hb-data">'+esc(r.data)+'</div><button onclick="enterNodeAction(NODE_DATA[\''+r.node+'\'])" style="background:'+r.color+';color:#0d0b08;border:none;border-radius:8px;padding:10px 14px;font-weight:800;cursor:pointer;margin-top:10px">Open '+esc(title)+'</button>';
  }
  function injectStyle(){
    if(document.getElementById('hearth-brain-style'))return; const s=document.createElement('style'); s.id='hearth-brain-style'; s.textContent=`
    .hearth-brain{padding:18px;max-width:980px;margin:0 auto}.hb-hero{display:grid;grid-template-columns:minmax(0,1fr) 250px;gap:14px;background:linear-gradient(135deg,rgba(212,175,105,.12),rgba(13,11,8,.86));border:1px solid var(--border);border-radius:18px;padding:18px;margin:10px 0 14px}.hb-kicker{font-family:JetBrains Mono;font-size:.58rem;color:var(--gold);letter-spacing:.16em;text-transform:uppercase}.hb-hero h2{font-family:Cinzel;color:var(--gold);font-size:1.55rem;margin:5px 0}.hb-hero p{font-size:.78rem;color:var(--dim);line-height:1.55}.hb-guide{display:flex;gap:10px;align-items:center;background:rgba(13,11,8,.55);border:1px solid var(--border);border-radius:12px;padding:10px;font-size:.72rem;color:var(--text);line-height:1.4}.hb-guide img{width:72px;height:72px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,.4));animation:char-float 3s ease-in-out infinite}.hb-grid{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(250px,.75fr);gap:14px}.hb-map,.hb-region-card,.hb-stats,.hb-detail{background:var(--card);border:1px solid var(--border);border-radius:14px}.hb-map{padding:10px}.hb-map svg{width:100%;display:block;background:#080704;border-radius:12px}.hb-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px;margin-bottom:12px;text-align:center}.hb-stats b{display:block;font-family:Cinzel;color:var(--gold);font-size:1.05rem}.hb-stats span{font-size:.58rem;color:var(--dim)}.hb-region-list{display:flex;flex-direction:column;gap:8px}.hearth-region-card{padding:10px;cursor:pointer;transition:.2s}.hearth-region-card:hover{border-color:var(--r);transform:translateY(-1px)}.hb-mini-label{font-family:Cinzel;color:var(--r);font-weight:800;font-size:.8rem}.hb-role{font-size:.66rem;color:var(--dim);line-height:1.35}.hb-signal{position:relative;height:4px;background:rgba(255,255,255,.08);border-radius:99px;margin-top:8px;overflow:hidden}.hb-signal i{display:block;height:100%;background:var(--r)}.hb-signal span{position:absolute;right:0;top:-17px;font-family:JetBrains Mono;font-size:.55rem;color:var(--dim)}.hb-detail{margin-top:10px;padding:14px;font-size:.76rem;color:var(--text);line-height:1.55}.hb-detail h3{font-family:Cinzel;margin:5px 0}.hb-data{font-family:JetBrains Mono;font-size:.65rem;color:var(--dim);background:#0d0b08;border:1px solid var(--border);border-radius:8px;padding:8px}@media(max-width:760px){.hb-hero,.hb-grid{grid-template-columns:1fr}.hb-guide{align-items:flex-start}.hb-stats{grid-template-columns:1fr 1fr 1fr}}`;
    document.head.appendChild(s);
  }
  window.HearthBrain={render,openRegion};
  window.showHearth=render;
})();
