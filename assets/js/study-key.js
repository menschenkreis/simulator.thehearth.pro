// Study Key Chamber override — misunderstood words and concepts as locks to open.
(function(){
  const PURPLE='#8a6aaa', GOLD='#d4af69';
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function read(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}}
  function write(k,v){localStorage.setItem(k,JSON.stringify(v));}
  function K(){return window.KNOWING;}
  function allTopics(){const k=K(); if(!k||!k.categories)return []; return k.categories.flatMap(cat=>(cat.topics||[]).map(t=>({cat,topic:t})));}
  function status(){return read('hearth-study-locks',{});}
  function setStatus(id,val){const s=status(); s[id]=val; write('hearth-study-locks',s);}
  function extractTerms(topic){
    const html=topic.body||'';
    const strong=[...html.matchAll(/<strong>([^<]+)<\/strong>/g)].map(m=>m[1]).filter(x=>x.length<42);
    const title=(topic.title||'').split(/[—:,-]/).map(x=>x.trim()).filter(Boolean).slice(0,2);
    return [...new Set([...title,...strong])].slice(0,6);
  }
  function current(){
    const done=read('hearth-knowing-progress',{}); const state=read('hearth-knowing-state',{}); const topics=allTopics();
    let hit=topics.find(x=>x.topic.id===state.lastTopic) || topics.find(x=>!done[x.topic.id]) || topics[0];
    return hit;
  }
  function progress(){
    const topics=allTopics(); const st=status();
    const open=topics.filter(x=>st[x.topic.id]==='open'||st[x.topic.id]==='mastered').length;
    const cracked=topics.filter(x=>st[x.topic.id]==='cracked').length;
    const locked=Math.max(0,topics.length-open-cracked);
    return {total:topics.length,open,cracked,locked,pct:topics.length?Math.round(open/topics.length*100):0};
  }
  function keyHint(item){
    if(!item)return 'Pick one lock. A concept opens when you can define it, draw it, and do it on the guitar.';
    return 'Today’s key is '+item.topic.title+'. Don’t just read it. Unlock it: define it, draw it, then prove it on the instrument.';
  }
  function render(){
    document.querySelectorAll('.pnl').forEach(p=>p.classList.remove('on'));
    const el=document.getElementById('p-foundation'); if(!el)return; el.classList.add('on'); inject();
    if(!K()){el.innerHTML='<div style="padding:24px;color:var(--dim)">Study data is loading.</div>';return;}
    const item=current(); const pr=progress(); const topics=allTopics(); const st=status();
    const categories=K().categories||[];
    el.innerHTML='<div class="study-key"><button class="back-btn" onclick="backToMap()">← Map</button><div class="sk-hero"><div><div class="sk-kicker">Study · Key Chamber</div><h2>The Key Unlocks Understanding</h2><p>Study is not another library. It is the chamber where locked words and half-understood concepts become usable. A door opens only when you can define, draw, and do.</p></div><div class="sk-guide"><img src="images/character-symbols/Thinking Question Mark.png"><div>'+esc(keyHint(item))+'</div></div></div><div class="sk-grid"><div><div class="sk-lock"><div class="sk-key">⚿</div><div><div class="sk-kicker">Current Lock</div><h3>'+esc(item?item.topic.title:'No topic')+'</h3><p>'+(item?esc(item.cat.title+' · '+(item.topic.source||'Study source')):'')+'</p><button onclick="StudyKey.openSession(\''+esc(item?item.cat.id:'')+'\',\''+esc(item?item.topic.id:'')+'\')">Turn The Key</button></div></div><div class="sk-cats">'+categories.map(c=>{const done=(c.topics||[]).filter(t=>st[t.id]==='open'||st[t.id]==='mastered').length;return '<div class="sk-cat"><div><b>'+esc(c.title)+'</b><span>'+done+'/'+(c.topics||[]).length+' unlocked</span></div><div>'+((c.topics||[]).slice(0,5).map(t=>'<button onclick="StudyKey.openSession(\''+esc(c.id)+'\',\''+esc(t.id)+'\')" class="'+(st[t.id]||'locked')+'">'+esc(t.title)+'</button>').join(''))+'</div></div>'}).join('')+'</div></div><aside><div class="sk-stats"><div><b>'+pr.pct+'%</b><span>open</span></div><div><b>'+pr.open+'</b><span>opened</span></div><div><b>'+pr.cracked+'</b><span>cracked</span></div><div><b>'+pr.locked+'</b><span>locked</span></div></div><div class="sk-panel"><div class="sk-kicker">Unlock Formula</div><ol><li>Define the term in your own words.</li><li>Draw or map the concept.</li><li>Apply it physically on guitar.</li><li>Rate the door: locked, cracked, open, mastered.</li></ol></div></aside></div></div>';
  }
  function openSession(catId,topicId){
    const cat=(K().categories||[]).find(c=>c.id===catId); if(!cat)return; const topic=(cat.topics||[]).find(t=>t.id===topicId); if(!topic)return; inject();
    const el=document.getElementById('p-foundation'); const terms=extractTerms(topic); const st=status()[topic.id]||'locked';
    const body=(topic.body||'').replace(/<script[\s\S]*?<\/script>/gi,'');
    el.innerHTML='<div class="study-session"><button class="back-btn" onclick="showStudy()">← Key Chamber</button><div class="ss-hero"><div><div class="sk-kicker">'+esc(cat.title)+' · '+esc(st)+'</div><h2>'+esc(topic.title)+'</h2><p>Find the key. If a word is unclear, the rest of the page goes dim — so we treat words as locks first.</p></div><div class="sk-guide"><img src="images/character-symbols/Encouraging Face Lightbulb.png"><div>This door opens when the idea becomes physical. Read less if needed. Prove one small part on the guitar.</div></div></div><div class="ss-grid"><main><section><div class="sk-kicker">Locked Glyphs / Key Terms</div><div class="term-locks">'+terms.map(t=>'<button onclick="StudyKey.copyTerm(\''+encodeURIComponent(t)+'\')">🔒 '+esc(t)+'</button>').join('')+'</div></section><section><div class="sk-kicker">Source Page</div><div class="study-body">'+body+'</div></section></main><aside><section><div class="sk-kicker">Unlock Proof</div><label>1. Define it simply</label><textarea id="sk-define" placeholder="What does this mean in plain words?"></textarea><label>2. Draw / map it</label><textarea id="sk-draw" placeholder="What would you draw? Fretboard map? Chord shape? Diagram?"></textarea><label>3. Do it on guitar</label><textarea id="sk-do" placeholder="What physical action proves it?"></textarea><label>4. Missing word?</label><textarea id="sk-word" placeholder="Any word that still feels foggy?"></textarea><div class="sk-ratings"><button onclick="StudyKey.complete(\''+catId+'\',\''+topicId+'\',\'locked\')">Locked</button><button onclick="StudyKey.complete(\''+catId+'\',\''+topicId+'\',\'cracked\')">Cracked</button><button onclick="StudyKey.complete(\''+catId+'\',\''+topicId+'\',\'open\')">Open</button><button onclick="StudyKey.complete(\''+catId+'\',\''+topicId+'\',\'mastered\')">Mastered</button></div></section></aside></div></div>';
  }
  function complete(catId,topicId,val){
    setStatus(topicId,val); const notes=read('hearth-study-notes',[]); const get=id=>{const e=document.getElementById(id);return e?e.value.trim():''};
    notes.push({ts:new Date().toISOString(),topicId,status:val,define:get('sk-define'),draw:get('sk-draw'),doIt:get('sk-do'),word:get('sk-word')}); write('hearth-study-notes',notes);
    if(val==='open'||val==='mastered'){
      const done=read('hearth-knowing-progress',{}); done[topicId]=true; write('hearth-knowing-progress',done);
      if(window.HearthProgressEvents){
        window.HearthProgressEvents.append({
          event_type:'concept_read',
          node_id:'study',
          category_id:catId,
          source_id:topicId,
          rating:val==='mastered'?5:4,
          note:get('sk-word'),
          data:{ topic_id:topicId, status:val, define:get('sk-define'), draw:get('sk-draw'), do_it:get('sk-do') }
        });
      }
    }
    render();
  }
  function copyTerm(encoded){const term=decodeURIComponent(encoded); const box=document.getElementById('sk-word'); if(box&&!box.value)box.value=term;}
  function inject(){
    if(document.getElementById('study-key-style'))return; const s=document.createElement('style'); s.id='study-key-style'; s.textContent=`
    .study-key,.study-session{padding:18px;max-width:980px;margin:0 auto}.sk-hero,.ss-hero{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:14px;background:linear-gradient(135deg,rgba(138,106,170,.18),rgba(13,11,8,.9));border:1px solid var(--border);border-radius:18px;padding:18px;margin:10px 0 14px}.sk-kicker{font-family:JetBrains Mono;font-size:.58rem;color:${PURPLE};letter-spacing:.16em;text-transform:uppercase}.sk-hero h2,.ss-hero h2{font-family:Cinzel;color:${PURPLE};font-size:1.5rem;margin:5px 0}.sk-hero p,.ss-hero p{font-size:.78rem;color:var(--dim);line-height:1.55}.sk-guide{display:flex;gap:10px;align-items:center;background:rgba(13,11,8,.55);border:1px solid var(--border);border-radius:12px;padding:10px;font-size:.72rem;color:var(--text);line-height:1.4}.sk-guide img{width:72px;height:72px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,.4));animation:char-float 3s ease-in-out infinite}.sk-grid,.ss-grid{display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:14px}.sk-lock,.sk-cat,.sk-panel,.sk-stats, .study-session section{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px}.sk-lock{display:flex;gap:16px;align-items:center;border-color:${PURPLE}66}.sk-key{font-size:4rem;color:${GOLD};filter:drop-shadow(0 0 12px rgba(212,175,105,.28))}.sk-lock h3{font-family:Cinzel;color:var(--gold);margin:4px 0}.sk-lock p{font-size:.72rem;color:var(--dim)}.sk-lock button,.sk-ratings button{background:${PURPLE};color:white;border:none;border-radius:8px;padding:10px 12px;font-weight:800;cursor:pointer}.sk-cats{display:flex;flex-direction:column;gap:10px;margin-top:14px}.sk-cat b{font-family:Cinzel;color:var(--text)}.sk-cat span{font-size:.65rem;color:var(--dim);margin-left:8px}.sk-cat button{margin:6px 5px 0 0;background:#0d0b08;border:1px solid var(--border);border-radius:999px;color:var(--dim);padding:6px 8px;font-size:.65rem;cursor:pointer}.sk-cat button.open,.sk-cat button.mastered{border-color:${PURPLE};color:${PURPLE}}.sk-cat button.cracked{border-color:${GOLD};color:${GOLD}}.sk-stats{display:grid;grid-template-columns:1fr 1fr;gap:8px;text-align:center;margin-bottom:12px}.sk-stats b{display:block;font-family:Cinzel;color:${PURPLE};font-size:1.1rem}.sk-stats span{font-size:.58rem;color:var(--dim)}.sk-panel ol{color:var(--dim);font-size:.74rem;line-height:1.6;padding-left:18px}.term-locks{display:flex;flex-wrap:wrap;gap:7px}.term-locks button{background:#0d0b08;border:1px solid ${PURPLE}55;color:${PURPLE};border-radius:999px;padding:7px 10px;cursor:pointer}.study-body{background:#0d0b08;border:1px solid var(--border);border-radius:12px;padding:16px;color:var(--text);font-size:.8rem;line-height:1.65}.study-session label{display:block;font-family:JetBrains Mono;font-size:.58rem;color:${PURPLE};letter-spacing:.1em;text-transform:uppercase;margin:10px 0 5px}.study-session textarea{width:100%;box-sizing:border-box;background:#0d0b08;border:1px solid var(--border);border-radius:9px;color:var(--text);padding:9px;font-family:DM Sans;font-size:.76rem;min-height:58px}.sk-ratings{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:10px}.sk-ratings button:nth-child(1){background:#555}.sk-ratings button:nth-child(2){background:${GOLD};color:#0d0b08}.sk-ratings button:nth-child(4){background:#2ecc71;color:#0d0b08}@media(max-width:760px){.sk-hero,.ss-hero,.sk-grid,.ss-grid{grid-template-columns:1fr}.sk-lock{align-items:flex-start}.sk-key{font-size:3rem}}`;
    document.head.appendChild(s);
  }
  window.StudyKey={render,openSession,complete,copyTerm};
  window.showStudySession=openSession;
})();
