// ═══ PROTOTYPE NOTE ═══
// This file currently owns the active renderers for Play, Practice, Study,
// Create, Mastery, and Hearth. The duplicate versions in simulator.html
// may not run while this file is loaded.
//
// Scene-first node entrances + Mastery Phoenix.
// Final override layer: first impression is a place, not a dashboard.
(function(){
  const GOLD='#d4af69', AMBER='#e8a020', PURPLE='#8a6aaa', FIRE='#c45a20', PHOENIX='#ff6b35';
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function panel(){document.querySelectorAll('.pnl').forEach(p=>p.classList.remove('on'));const el=document.getElementById('p-foundation');if(el)el.classList.add('on');return el;}
  function read(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}}
  function write(k,v){localStorage.setItem(k,JSON.stringify(v));}
  function inject(){
    if(document.getElementById('scene-first-style'))return;
    const s=document.createElement('style');s.id='scene-first-style';s.textContent=`
      .sf-wrap{padding:18px;max-width:980px;margin:0 auto;display:flex;flex-direction:column}.sf-scene{position:relative;border:1px solid var(--border);border-radius:22px;overflow:visible;background:radial-gradient(circle at 50% 35%,rgba(212,175,105,.13),rgba(13,11,8,.96) 55%,#080704);box-shadow:0 20px 60px rgba(0,0,0,.35)}.sf-scene:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 20% 20%,rgba(232,160,32,.08),transparent 24%),radial-gradient(circle at 80% 70%,rgba(138,106,170,.09),transparent 28%);pointer-events:none}.sf-top{position:relative;z-index:2;display:flex;justify-content:space-between;gap:14px;align-items:flex-start;padding:18px}.sf-kicker{font-family:JetBrains Mono;font-size:.58rem;color:var(--sf,var(--gold));letter-spacing:.16em;text-transform:uppercase}.sf-title{font-family:Cinzel;color:var(--sf,var(--gold));font-size:1.55rem;font-weight:800;margin:2px 0}.sf-node-ident{display:flex;align-items:center;gap:11px;margin-bottom:8px}.sf-node-ident>img{width:58px;height:58px;border-radius:50%;object-fit:cover;border:2px solid var(--sf,var(--gold));box-shadow:0 0 18px color-mix(in srgb,var(--sf,var(--gold)),transparent 72%);background:#0d0b08}.sf-sub{font-size:.78rem;color:var(--dim);line-height:1.55;max-width:560px}.sf-guide{display:flex;gap:9px;align-items:center;max-width:290px;background:rgba(13,11,8,.58);border:1px solid var(--border);border-radius:13px;padding:10px;font-size:.72rem;color:var(--text);line-height:1.42}.sf-guide img{width:68px;height:68px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,.42));animation:char-float 3s ease-in-out infinite}.sf-stage{position:relative;z-index:2;display:flex;justify-content:center;align-items:center;min-height:280px;padding:8px 18px 18px}.sf-primary{background:var(--sf,var(--gold));color:#0d0b08;border:none;border-radius:999px;padding:12px 18px;font-family:DM Sans;font-weight:900;cursor:pointer;box-shadow:0 8px 24px color-mix(in srgb,var(--sf,var(--gold)),transparent 75%)}.sf-secondary{background:rgba(13,11,8,.62);color:var(--sf,var(--gold));border:1px solid color-mix(in srgb,var(--sf,var(--gold)),transparent 55%);border-radius:999px;padding:10px 13px;font-weight:800;cursor:pointer}.sf-drawer{position:relative;z-index:2;margin:0 18px 18px;background:rgba(13,11,8,.74);border:1px solid var(--border);border-radius:16px;padding:14px;color:var(--text);font-size:.78rem;line-height:1.55}.sf-brain svg,.sf-map svg,.sf-key svg,.sf-phoenix svg{width:min(680px,100%);display:block}.sf-brain circle,.sf-map g,.sf-key .door,.sf-create .ingredient,.sf-phoenix .seal{cursor:pointer;transition:.2s}.sf-brain circle:hover,.sf-map g:hover,.sf-key .door:hover,.sf-create .ingredient:hover,.sf-phoenix .seal:hover{filter:drop-shadow(0 0 14px var(--sf,var(--gold)));transform-origin:center}.sf-create-stage{display:grid;grid-template-columns:1fr minmax(260px,360px) 1fr;gap:18px;align-items:center;width:100%;max-width:860px}.sf-ingredients{display:flex;flex-direction:column;gap:8px}.sf-ingredients button{background:rgba(13,11,8,.66);border:1px solid color-mix(in srgb,var(--c),transparent 55%);border-radius:12px;color:var(--c);padding:10px;cursor:pointer;font-weight:800;text-align:center}.sf-ingredients button.active{border-color:var(--gold)!important;background:rgba(212,175,105,.12)!important;box-shadow:0 0 12px rgba(212,175,105,.2);transform:scale(1.04)}.sf-stir-btn{display:block;margin:12px auto 0;padding:10px 28px;background:var(--gold);color:#0d0b08;border:none;border-radius:6px;font-family:Cinzel,serif;font-weight:700;font-size:.8rem;cursor:pointer;transition:all .2s}.sf-stir-btn:hover{transform:scale(1.04);box-shadow:0 0 16px rgba(212,175,105,.3)}.sf-cauldron{text-align:center;position:relative}.sf-pot{font-size:8rem;color:var(--sf);line-height:.75;filter:drop-shadow(0 0 22px color-mix(in srgb,var(--sf),transparent 65%))}.sf-flame{font-size:1.4rem;color:${FIRE};letter-spacing:.35em;animation:sf-flicker 1s infinite alternate}.sf-bubble{background:#0d0b08;border:1px solid color-mix(in srgb,var(--sf),transparent 50%);border-radius:18px;padding:14px;margin:0 auto 12px;max-width:330px;min-height:66px}.sf-bottles{display:flex;gap:8px;justify-content:center;align-items:flex-end;min-height:130px}.sf-bottle{width:28px;height:58px;background:linear-gradient(180deg,rgba(212,175,105,.24),rgba(196,90,32,.18));border:1px solid var(--border);border-radius:9px 9px 5px 5px}.sf-proof-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.sf-proof-grid textarea,.sf-proof-grid input{width:100%;box-sizing:border-box;background:#0d0b08;border:1px solid var(--border);border-radius:10px;color:var(--text);padding:9px;font-family:DM Sans;font-size:.76rem;min-height:70px}.sf-chiprow{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.sf-chiprow button{background:#0d0b08;border:1px solid color-mix(in srgb,var(--sf),transparent 55%);color:var(--sf);border-radius:999px;padding:7px 10px;cursor:pointer}.sf-master-list{display:grid;grid-template-columns:1fr 1fr;gap:10px}.sf-master-card{background:#0d0b08;border:1px solid var(--border);border-radius:12px;padding:12px}.sf-master-card b{font-family:Cinzel;color:var(--sf)}.sf-master-card p{font-size:.72rem;color:var(--dim);line-height:1.45}.sf-map-wrap{position:relative;width:min(100%,980px);aspect-ratio:1672/941;min-height:0;margin:0 auto;border-radius:14px;overflow:hidden;background:#0d0b08}.sf-map-img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block}.sf-map-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:auto}.sf-map-guide{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);background:rgba(13,11,8,.88);border:1px solid var(--border);border-radius:8px;padding:10px 20px;z-index:10;pointer-events:none;backdrop-filter:blur(6px);text-align:center;min-width:260px;max-width:400px;transition:all .25s}.sf-map-guide-region{font-family:Cinzel,serif;font-size:.85rem;color:var(--gold);font-weight:600;margin-bottom:2px}.sf-map-guide-tradition{font-family:JetBrains Mono,monospace;font-size:.6rem;color:var(--amber);letter-spacing:.08em;text-transform:uppercase}.sf-map-count{position:absolute;top:12px;right:16px;z-index:10;pointer-events:none;font-family:JetBrains Mono,monospace;font-size:.55rem;color:var(--dim);opacity:.5;letter-spacing:.08em;text-transform:uppercase}@keyframes sf-flicker{from{opacity:.6;transform:translateY(1px)}to{opacity:1;transform:translateY(-2px)}}@media(max-width:780px){.sf-top{flex-direction:column}.sf-guide{max-width:none}.sf-create-stage{grid-template-columns:1fr}.sf-proof-grid,.sf-master-list{grid-template-columns:1fr}.sf-stage{min-height:280px}.sf-pot{font-size:6rem}}
    `;document.head.appendChild(s);
  }
  function sceneStart(kind,title,sub,guide,img,nodeId){
    const icon='images/'+(nodeId||kind.replace('sf-',''))+'-icon.png';
    const nodeTitle=window.NODE_DATA&&NODE_DATA[nodeId]?NODE_DATA[nodeId].title:title;
    return '<div class="sf-wrap"><button class="back-btn" onclick="backToMap()">← Map</button><div class="sf-scene '+kind+'"><div class="sf-top"><div><div class="sf-node-ident"><img src="'+icon+'" alt=""><div><div class="sf-kicker">'+esc(kind.replace('sf-','').replace('-',' '))+'</div><div class="sf-title">'+esc(nodeTitle)+'</div></div></div><div class="sf-sub">'+esc(sub)+'</div></div><div class="sf-guide"><img src="'+img+'"><div>'+esc(guide)+'</div></div></div>';
  }

  window.showHearth=function(){
    // Delegate to hearth-brain.js SVG loader
    if(window.HearthBrain && window.HearthBrain.render){
      window.HearthBrain.render();
      return;
    }
    // Fallback: empty panel
    inject(); const el=panel(); if(!el)return;
    el.innerHTML='<div style="padding:40px;text-align:center;color:var(--dim)">Brain map loading...</div>';
  };

  // ═══ PLAY: world atlas image with glowing markers ═══
  window.showPlay=function(){
    inject(); const el=panel(); if(!el)return; const rs=window.WORLD_MAP_REGIONS||[];
    var svgHotspots='';
    rs.forEach(function(r){
      svgHotspots+='<g class="sf-hotspot" data-region="'+esc(r.id)+'" '+
        'onclick="SceneFirst.openPlay(\''+esc(r.id)+'\')" '+
        'onmouseenter="SceneFirst.mapHover(\''+esc(r.id)+'\')" '+
        'onmouseleave="SceneFirst.mapUnhover()" style="cursor:pointer">'+
        '<circle cx="'+r.coords[0]+'" cy="'+r.coords[1]+'" r="14" fill="none" stroke="'+r.color+'" stroke-width="0.8" opacity="0.15">'+
          '<animate attributeName="r" values="8;20;8" dur="3s" repeatCount="indefinite"/>'+
          '<animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite"/>'+
        '</circle>'+
        '<circle cx="'+r.coords[0]+'" cy="'+r.coords[1]+'" r="7" fill="'+r.color+'" opacity="0.12"/>'+
        '<circle cx="'+r.coords[0]+'" cy="'+r.coords[1]+'" r="3.5" fill="'+r.color+'" opacity="0.7"/>'+
        '<circle cx="'+r.coords[0]+'" cy="'+r.coords[1]+'" r="1.5" fill="white" opacity="0.5"/>'+
      '</g>';
    });
    el.innerHTML=sceneStart('sf-map','World Map of Guitar','Touch a region. Learn how guitar speaks there.','Play is a map, not a menu. Click one place and listen for its hand, pulse, scale colour, and story.','images/character-symbols/Encouraging Face Lightbulb.png','play')+
      '<div class="sf-stage" style="padding:0;min-height:0;flex:1"><div class="sf-map-wrap">'+
        '<img class="sf-map-img" src="images/play-world-atlas.png" alt="World Map of Guitar">'+
        '<svg viewBox="0 0 900 600" class="sf-map-svg">'+
          '<defs><filter id="sf-glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>'+
          svgHotspots+
        '</svg>'+
        '<div class="sf-map-count">'+rs.length+' traditions</div>'+
        '<div class="sf-map-guide" id="sf-map-guide"><div class="sf-map-guide-text" id="sf-map-guide-text">Choose a region. Listen for its rhythm, touch, scale colour, and story.</div></div>'+
      '</div></div>'+
      '<div id="sf-drawer" class="sf-drawer"></div></div></div>';
  };

  // STUDY: 8-level key chamber. Rings = levels, doors = current level locks.
  const STUDY_LEVELS=[
    {id:'L1',name:'Origin',color:'#ff4444'},{id:'L2',name:'Duality',color:'#ff8800'},
    {id:'L3',name:'Creation',color:'#ffdd00'},{id:'L4',name:'Structure',color:'#00cc44'},
    {id:'L5',name:'Change',color:'#00cccc'},{id:'L6',name:'Harmony',color:'#3366ff'},
    {id:'L7',name:'Wisdom',color:'#6633cc'},{id:'L8',name:'Power',color:'#cc33ff'}
  ];
  const STUDY_JOURNEY_LEVELS = STUDY_LEVELS;
  function studyTopicLevel(item,idx){
    const src=(item.t.source||'')+' '+(item.t.qjam||'')+' '+(item.t.level||'');
    const m=src.match(/(?:QJam\s*)?L(?:evel)?\s*(\d)/i); if(m)return Math.max(1,Math.min(8,Number(m[1])));
    return Math.max(1,Math.min(8,Math.floor(idx/7)+1));
  }
  function levelTopics(){
    const K=window.KNOWING; if(!K||!K.categories)return [];
    const all=K.categories.flatMap(c=>c.topics.map(t=>({c,t})));
    return all.map((x,i)=>({...x,level:studyTopicLevel(x,i)}));
  }
  function activeStudyLevel(){return Number(localStorage.getItem('hearth-study-active-level')||'1')||1;}
  function setActiveStudyLevel(n){localStorage.setItem('hearth-study-active-level',String(Math.max(1,Math.min(8,n))));showStudy();}
  window.showStudy=function(){
    inject(); const el=panel(); if(!el)return; const K=window.KNOWING; if(!K){el.innerHTML='Study data loading';return;}
    const topics=levelTopics(); const st=read('hearth-study-locks',{}); const active=activeStudyLevel();
    const activeTopics=topics.filter(x=>x.level===active); const current=activeTopics.find(x=>st[x.t.id]!=='open'&&st[x.t.id]!=='mastered')||activeTopics[0]||topics[0];
    const cx0=280, cy0=190; let rings='', doors='';
    STUDY_LEVELS.forEach((lvl,i)=>{
      const n=i+1, r=48+i*18, levelItems=topics.filter(x=>x.level===n), open=levelItems.filter(x=>st[x.t.id]==='open'||st[x.t.id]==='mastered').length, pct=levelItems.length?open/levelItems.length:0;
      const op=n===active?.62:.16+pct*.25;
      rings+='<circle onclick="SceneFirst.studyLevel('+n+')" cx="'+cx0+'" cy="'+cy0+'" r="'+r+'" fill="none" stroke="'+lvl.color+'" stroke-opacity="'+op+'" stroke-width="'+(n===active?3:1.4)+'" stroke-dasharray="'+(n===active?'':'5 7')+'" style="cursor:pointer"/>';
      const lx=cx0+r+18, ly=cy0-4;
      rings+='<text onclick="SceneFirst.studyLevel('+n+')" x="'+lx+'" y="'+ly+'" fill="'+lvl.color+'" font-family="JetBrains Mono" font-size="8" style="cursor:pointer">'+lvl.id+'</text>';
    });
    activeTopics.slice(0,10).forEach((x,i)=>{
      const a=(i/Math.max(10,activeTopics.slice(0,10).length))*Math.PI*2-Math.PI/2;
      const r=142, cx=cx0+r*Math.cos(a), cy=cy0+r*Math.sin(a);
      const s=st[x.t.id]||'locked', col=s==='mastered'?'#2ecc71':s==='open'?STUDY_LEVELS[active-1].color:s==='cracked'?AMBER:'#666';
      doors+='<g class="door" onclick="StudyKey.openSession(\''+esc(x.c.id)+'\',\''+esc(x.t.id)+'\')"><rect x="'+(cx-17)+'" y="'+(cy-28)+'" width="34" height="56" rx="13" fill="'+col+'" opacity=".30" stroke="'+col+'"/><circle cx="'+(cx+8)+'" cy="'+cy+'" r="3" fill="'+GOLD+'"/><text x="'+cx+'" y="'+(cy+41)+'" text-anchor="middle" fill="'+col+'" font-family="JetBrains Mono" font-size="7">'+esc(x.t.title.slice(0,12))+'</text></g>';
    });
    const lvl=STUDY_LEVELS[active-1];
    const svg='<svg viewBox="0 0 560 400">'+rings+'<circle cx="'+cx0+'" cy="'+cy0+'" r="34" fill="'+lvl.color+'" opacity=".10"/><text x="'+cx0+'" y="'+(cy0+13)+'" text-anchor="middle" font-size="78" fill="'+GOLD+'" opacity=".9">⚿</text>'+doors+'</svg>';
    const opened=activeTopics.filter(x=>st[x.t.id]==='open'||st[x.t.id]==='mastered').length;
    el.innerHTML=sceneStart('sf-key','The Key Chamber','Eight concentric rings. Each ring is a level. Move through the doors systematically: define, draw, do, then unlock.','Now the chamber has order: choose a level ring, then open the next lock on that ring. No random study wandering.','images/character-symbols/Thinking Question Mark.png','study')+'<div class="sf-stage">'+svg+'</div><div class="sf-drawer"><div class="sf-kicker" style="color:'+lvl.color+'">'+lvl.id+' · '+lvl.name+' · '+opened+'/'+activeTopics.length+' opened</div><button class="sf-primary" style="--sf:'+lvl.color+'" onclick="StudyKey.openSession(\''+esc(current?current.c.id:'')+'\',\''+esc(current?current.t.id:'')+'\')">Turn Today\'s '+lvl.id+' Key</button> <span style="color:var(--dim);margin-left:8px">'+esc(current?current.t.title:'No lock in this level')+'</span><div class="sf-chiprow">'+STUDY_JOURNEY_LEVELS.map((l,i)=>'<button onclick="SceneFirst.studyLevel('+(i+1)+')" style="color:'+l.color+';border-color:'+l.color+'55">'+l.id+'</button>').join('')+'</div></div></div></div>';
  };


  // CREATE: central cauldron first; workstation appears after ingredient.
  window.showCreate=function(){
    inject(); const el=panel(); if(!el)return; const ing=window.CAULDRON_INGREDIENTS||[]; const c=read('hearth-create-current',{prompt:'Select ingredients and stir the cauldron.',ingredients:[],notes:'',title:'Untitled Song Seed',selected:[]});
    const sel=new Set(c.selected||[]);
    const allBtns=ing.map(x=>{const active=sel.has(x.id);return '<button class="sf-ing'+(active?' active':'')+'" style="--c:'+x.color+'" onclick="SceneFirst.toggleCreate(\''+esc(x.id)+'\')"><span>'+esc(x.symbol)+'</span> '+esc(x.name)+'</button>';}).join('');
    const stirBtn=sel.size>0?'<button class="sf-stir-btn" onclick="SceneFirst.stirCauldron()">🔥 Stir the Cauldron</button>':'';
    const hint=sel.size>0?'':'<div class="sf-dim" style="font-size:.65rem;margin-top:6px;text-align:center">Select ingredients, then stir</div>';
    el.innerHTML=sceneStart('sf-create','The Cauldron','Create begins with one object: the cauldron. Ingredients are constraints. The song seed appears after you throw something in.','Do not judge the spark too early. Add one ingredient, catch what bubbles up, then shape it.','images/character-symbols/Celebrator with sparks.png','create')+'<div class="sf-stage" style="flex-direction:column;min-height:auto;padding-bottom:0"><img src="assets/svg/cauldron.svg" style="width:100%;max-width:200px;height:auto;display:block;margin:0 auto" /><div style="text-align:center;color:var(--gold);font-family:Cinzel;font-size:.85rem;margin:8px auto 0;max-width:420px;line-height:1.5;white-space:pre-line">'+esc(c.prompt||'Select ingredients and stir the cauldron.')+'</div></div><div class="sf-stage" style="min-height:auto;padding-top:8px;flex-direction:column"><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:520px;width:100%">'+allBtns+'</div>'+stirBtn+hint+'</div><div id="sf-create-work" class="sf-drawer">'+createDrawer(c)+'</div></div></div>';
  };
  function createDrawer(c){
    if(!c.ingredients||!c.ingredients.length)return '<div style="text-align:center;color:var(--dim);font-size:.75rem;padding:12px">Add ingredients and stir. The workstation opens after the cauldron speaks.</div>';
    return '<input id="sf-create-title" value="'+esc(c.title||'Untitled Song Seed')+'" style="width:100%;box-sizing:border-box;background:#0d0b08;border:1px solid var(--border);border-radius:9px;color:var(--text);padding:9px;margin-bottom:8px"><textarea id="sf-create-notes" style="width:100%;box-sizing:border-box;background:#0d0b08;border:1px solid var(--border);border-radius:9px;color:var(--text);padding:9px;min-height:90px" placeholder="Capture the seed: chords, lyric, riff, structure...">'+esc(c.notes||'')+'</textarea><div class="sf-chiprow"><button onclick="SceneFirst.saveCreate()">Save Seed</button><button onclick="SceneFirst.newCreate()">New Seed</button></div>';
  }

  // PRACTISE: calm altar room first; controls live in the drawer.
  function practicePrefs(){try{const s=JSON.parse(localStorage.getItem('hearth-practice-state')||'{}');return {time:s.altarTime||20,focus:s.altarFocus||'All',intention:s.altarIntention||'Clean, focused practice'}}catch(e){return {time:20,focus:'All',intention:'Clean, focused practice'}}}
  function practiceSavePrefs(p){const s=read('hearth-practice-state',{});s.altarTime=p.time;s.altarFocus=p.focus;s.altarIntention=p.intention;write('hearth-practice-state',s)}
  function practiceCategories(){const P=window.PRACTICE;return P&&P.drills?['All',...new Set(P.drills.map(d=>d.category))]:['All']}
  function practiceNext(focus){const P=window.PRACTICE;if(!P||!P.drills)return null;const ds=focus&&focus!=='All'?P.drills.filter(d=>d.category===focus):P.drills;return ds[0]||P.drills[0]}
  function practiceDrawer(p,d){
    const cats=practiceCategories();
    return '<div class="sf-kicker" style="color:'+AMBER+'">Today\'s practice candle</div><div style="font-family:Cinzel;color:var(--gold);font-size:1rem;margin:5px 0">'+p.time+' min · '+esc(p.focus)+'</div><div style="color:var(--dim);font-size:.74rem;margin-bottom:10px">Intention: '+esc(p.intention)+'</div><div class="sf-chiprow">'+[10,20,30,45,60].map(t=>'<button onclick="SceneFirst.practiceTime('+t+')">'+t+'m</button>').join('')+'</div><div class="sf-chiprow">'+cats.map(c=>'<button onclick="SceneFirst.practiceFocus(\''+esc(c)+'\')">'+esc(c)+'</button>').join('')+'</div><textarea id="sf-practice-intention" style="width:100%;box-sizing:border-box;background:#0d0b08;border:1px solid var(--border);border-radius:10px;color:var(--text);padding:9px;margin-top:10px;min-height:62px" placeholder="What is the one clean thing today?">'+esc(p.intention)+'</textarea><div class="sf-chiprow"><button onclick="SceneFirst.savePracticeIntention()">Save Intention</button><button onclick="startTemplePractice()">Light Candle</button>'+(d?'<button onclick="showPracticeDrill(\''+esc(d.id)+'\')">Open '+esc(d.title)+'</button>':'')+'</div>';
  }

  window.showPractice=function(){
    inject(); const el=panel(); if(!el)return; const p=practicePrefs(); const d=practiceNext(p.focus);
    const flame='<svg viewBox="0 0 560 390"><defs><radialGradient id="altarGlow"><stop offset="0%" stop-color="'+AMBER+'" stop-opacity=".34"/><stop offset="100%" stop-color="'+AMBER+'" stop-opacity="0"/></radialGradient></defs><ellipse cx="280" cy="300" rx="190" ry="32" fill="'+GOLD+'" opacity=".12"/><circle cx="280" cy="205" r="150" fill="url(#altarGlow)"/><path d="M210,285 Q280,245 350,285 L330,315 Q280,335 230,315Z" fill="#1a1510" stroke="'+GOLD+'" stroke-opacity=".35"/><rect x="250" y="215" width="60" height="88" rx="18" fill="#3a2a18" stroke="'+GOLD+'" stroke-opacity=".45"/><path d="M280,145 C250,185 258,220 280,238 C305,215 308,185 280,145Z" fill="'+AMBER+'" opacity=".86"><animate attributeName="d" dur="1.4s" repeatCount="indefinite" values="M280,145 C250,185 258,220 280,238 C305,215 308,185 280,145Z;M280,135 C260,180 252,215 280,242 C315,210 300,180 280,135Z;M280,145 C250,185 258,220 280,238 C305,215 308,185 280,145Z"/></path><path d="M280,172 C267,198 270,216 282,228 C294,213 294,194 280,172Z" fill="#fff2b8" opacity=".72"/><text x="280" y="355" text-anchor="middle" fill="'+AMBER+'" font-family="JetBrains Mono" font-size="10">'+esc(p.focus)+' \u00b7 '+p.time+' MINUTES</text></svg>';
    el.innerHTML=sceneStart('sf-practise','Practise Room','One candle. One intention. One focused contact with the instrument. The details stay below until you need them.','This room should calm the brain: choose one thing, light the candle, practise, then write what happened.','images/character-full/Encouraging.png','practise')+'<div class="sf-stage">'+flame+'</div><div class="sf-drawer">'+practiceDrawer(p,d)+'</div></div></div>';
  };


  // MASTERY: Phoenix Rising.
  const beyond=[
    {id:'microtones',name:'Hear Between Notes',artist:'Maddie Ashman',color:'#9b59b6',why:'Beyond the 12-fret map: microtonal colour, bends, maqam/raga/blues territory.',practice:'Bend slowly between two frets and hold the in-between pitch until it stops sounding wrong.'},
    {id:'voice',name:'Find Your Voice',artist:'Jimi Hendrix / Sister Rosetta Tharpe',color:'#ff6b35',why:'Beyond copying technique: touch, tone, timing and identity become unmistakable.',practice:'Play one simple phrase three ways until one version sounds like you.'},
    {id:'composition',name:'Transform Skill Into Art',artist:'Joni Mitchell / João Gilberto',color:'#5a9fd4',why:'Beyond exercises: harmony, rhythm and tuning become a personal world.',practice:'Take one known chord shape and alter tuning/voicing until it suggests a new song.'},
    {id:'teaching',name:'Transmit The Fire',artist:'The lineage of teachers',color:'#2ecc71',why:'Beyond personal ability: you can guide another person through the path.',practice:'Teach a beginner one concept without jargon, then watch where they get stuck.'}
  ];
  window.showMastery=function(){
    inject(); const el=panel(); if(!el)return; const seals=beyond.map((b,i)=>{const a=(i/beyond.length)*Math.PI*2-Math.PI/2,cx=280+155*Math.cos(a),cy=190+120*Math.sin(a);return '<g class="seal" onclick="SceneFirst.openMastery(\''+b.id+'\')"><circle cx="'+cx+'" cy="'+cy+'" r="34" fill="'+b.color+'" opacity=".12"><animate attributeName="r" values="25;38;25" dur="4s" repeatCount="indefinite"/></circle><circle cx="'+cx+'" cy="'+cy+'" r="17" fill="'+b.color+'" opacity=".55"/><text x="'+cx+'" y="'+(cy+49)+'" text-anchor="middle" fill="'+b.color+'" font-family="JetBrains Mono" font-size="8">'+esc(b.name)+'</text></g>';}).join('');
    const phoenix='<svg viewBox="0 0 560 390"><circle cx="280" cy="190" r="150" fill="none" stroke="'+PHOENIX+'" stroke-opacity=".16"/><path d="M280,235 C235,210 205,170 185,105 C230,135 260,150 280,175 C300,150 330,135 375,105 C355,170 325,210 280,235Z" fill="'+PHOENIX+'" opacity=".22"/><path d="M280,90 C305,135 302,180 280,230 C258,180 255,135 280,90Z" fill="'+GOLD+'" opacity=".35"/><path d="M252,235 C235,265 235,300 250,330 C260,295 275,270 280,238 C285,270 300,295 310,330 C325,300 325,265 308,235Z" fill="'+FIRE+'" opacity=".45"/>'+seals+'<text x="280" y="210" text-anchor="middle" font-size="74" fill="'+GOLD+'">🔥</text></svg>';
    el.innerHTML=sceneStart('sf-phoenix','Mastery · Phoenix Rising','Mastery is not just proof. Proof is the floor. Mastery is going beyond: studying those who crossed the boundary, transforming skill into voice, and rising into a new form.','You do not master by finishing. You master by returning, transforming, and going beyond what the map first showed you.','images/character-symbols/Celebrator with sparks.png','mastery')+'<div class="sf-stage">'+phoenix+'</div><div id="sf-drawer" class="sf-drawer">Choose a phoenix seal: hear beyond, find your voice, transform skill, or transmit the fire.</div></div></div>';
  };

  // LEVELS data (must be accessible here since journey.js scopes it internally)
  const JOURNEY_LEVELS=[
    {id:'L1',num:1,name:'Origin',tag:'THE SEED',color:'#ff4444',totalLessons:8,unlockAfter:8,focus:'First contact: body, instrument, clean sound, simple rhythm.'},
    {id:'L2',num:2,name:'Duality',tag:'THE SECOND VOICE',color:'#ff8800',totalLessons:10,unlockAfter:10,focus:'Two hands, chord gaps, pentatonic vocabulary, embellishments.'},
    {id:'L3',num:3,name:'Creation',tag:'FIRST EXPRESSIONS',color:'#ffcc00',totalLessons:12,unlockAfter:12,focus:'First complete songs, riffs, phrasing, song seeds.'},
    {id:'L4',num:4,name:'Structure',tag:'FRAMEWORKS',color:'#44cc44',totalLessons:14,unlockAfter:14,focus:'Keys, chord families, fretboard maps, timing systems.'},
    {id:'L5',num:5,name:'Change',tag:'TRANSFORMATION',color:'#00cccc',totalLessons:16,unlockAfter:16,focus:'New positions, expressive techniques, transposition, variation.'},
    {id:'L6',num:6,name:'Harmony',tag:'INTEGRATION',color:'#3366ff',totalLessons:18,unlockAfter:18,focus:'Harmony, arrangements, ear-to-hand connection, deeper repertoire.'},
    {id:'L7',num:7,name:'Wisdom',tag:'THE WHY',color:'#6633cc',totalLessons:20,unlockAfter:20,focus:'Theory becomes intuition; analysis, choice, musical judgement.'},
    {id:'L8',num:8,name:'Power',tag:'COLLECTIVE FORCE',color:'#cc33ff',totalLessons:24,unlockAfter:24,focus:'Collaboration, performance, creation, personal sound.'}
  ];

  // JOURNEY: ascending path through 8 levels. One student, one current step, one action.
  function journeyState(){try{return JSON.parse(localStorage.getItem('hearth-journey-v2')||'{}')}catch(e){return{}}}
  function journeyStudent(state){return (state.students||[]).find(s=>s.id===state.activeStudentId)||state.students?.[0]||null;}
  function journeyGuide(student,level){
    if(!student)return 'Choose a student. Every journey begins with a name.';
    if(student.name.toLowerCase().includes('jen'))return 'Jen\'s path is real — gaps in C chord, pentatonic coming alive, chord embellishments as colour. Track what actually happens, not what should happen.';
    if((level?.num||1)===1)return 'The first contact. Body, instrument, clean sound. Nothing beyond this matters until the foundation is solid.';
    if((level?.num||1)>=7)return 'Deep water. Theory becomes intuition here. You are not learning rules — you are hearing why they existed.';
    return student.name+' is in '+level.id+' '+level.name+'. One lesson at a time. One honest note after each.';
  }

  window.SceneFirst={
    practiceTime(t){practiceSavePrefs({...practicePrefs(),time:t});showPractice();},
    practiceFocus(f){practiceSavePrefs({...practicePrefs(),focus:f});showPractice();},
    savePracticeIntention(){const el=document.getElementById('sf-practice-intention');if(el)practiceSavePrefs({...practicePrefs(),intention:el.value});},
    openHearth(node){const el=document.getElementById('sf-drawer');const title=window.NODE_DATA&&NODE_DATA[node]?NODE_DATA[node].title:node;if(el)el.innerHTML='<b>'+esc(title)+'</b><br><span style="color:var(--dim)">This region opens the '+esc(title)+' learning system.</span><div class="sf-chiprow"><button onclick="enterNodeAction(NODE_DATA[\''+node+'\'])">Enter '+esc(title)+'</button></div>';},
    openPlay(id){if(window.PlayWorld&&PlayWorld.detail)return PlayWorld.detail(id);},
    mapHover(id){var rs=window.WORLD_MAP_REGIONS||[];var r=rs.find(function(x){return x.id===id;});if(!r)return;var g=document.getElementById('sf-map-guide-text');if(!g)return;g.innerHTML='<div class="sf-map-guide-region">'+esc(r.name)+'</div><div class="sf-map-guide-tradition">'+esc(r.tradition)+'</div>';},
    mapUnhover(){var g=document.getElementById('sf-map-guide-text');if(!g)return;g.innerHTML='Choose a region. Listen for its rhythm, touch, scale colour, and story.';},
    studyLevel(n){setActiveStudyLevel(n);},
    toggleCreate(id){const c=read('hearth-create-current',{title:'Untitled Song Seed',ingredients:[],notes:'',selected:[]});const sel=new Set(c.selected||[]);if(sel.has(id))sel.delete(id);else sel.add(id);c.selected=Array.from(sel);write('hearth-create-current',c);showCreate();},
    stirCauldron(){const c=read('hearth-create-current',{});const sel=c.selected||[];if(!sel.length)return;const CI=window.CAULDRON_INGREDIENTS||[];const CC=window.CREATE_COMBOS||[];let result=null;if(sel.length===1){const ing=CI.find(x=>x.id===sel[0]);if(ing){const prompt=ing.prompts[Math.floor(Math.random()*ing.prompts.length)];result={constraint:'Single ingredient: '+ing.name,prompt:ing.symbol+' '+ing.name+': '+prompt,level:1,labels:[ing.symbol+' '+ing.name]};}}else{const sorted=sel.slice().sort();const match=CC.find(x=>x.ingredients.slice().sort().join(',')===sorted.join(','));if(match){const labels=sel.map(id=>{const ing=CI.find(x=>x.id===id);return ing?ing.symbol+' '+ing.name:id;});result={constraint:match.constraint,prompt:match.prompt,level:match.level,labels:labels};}else{const prompts=sel.map(id=>{const ing=CI.find(x=>x.id===id);return ing?ing.prompts[Math.floor(Math.random()*ing.prompts.length)]:'';});const labels=sel.map(id=>{const ing=CI.find(x=>x.id===id);return ing?ing.symbol+' '+ing.name:id;});result={constraint:'Combine: '+labels.join(' + '),prompt:prompts.join('\n\n'),level:sel.length,labels:labels};}}
    if(!result)return;const levelBadge=result.level<=2?'⚗️':result.level<=3?'🔥':'💀';const levelNames=['','Ingredient','Filter','Forge','Collision','Alchemy'];c.prompt=levelBadge+' L'+result.level+' '+levelNames[result.level]+': '+result.labels.join(' + ')+'\n'+result.constraint+'\n'+result.prompt;c.ingredients=sel.map(id=>{const ing=CI.find(x=>x.id===id);return ing?ing.name:id;});write('hearth-create-current',c);showCreate();},
    saveCreate(){const c=read('hearth-create-current',{});const t=document.getElementById('sf-create-title'),n=document.getElementById('sf-create-notes');if(t)c.title=t.value;if(n)c.notes=n.value;write('hearth-create-current',c);const ps=read('hearth-create-projects',[]);ps.push({...c,savedAt:new Date().toISOString()});write('hearth-create-projects',ps);showCreate();},
    newCreate(){write('hearth-create-current',{title:'Untitled Song Seed',ingredients:[],prompt:'Add one ingredient.',notes:''});showCreate();},
    openMastery(id){const b=beyond.find(x=>x.id===id);const el=document.getElementById('sf-drawer');if(!b||!el)return;el.innerHTML='<div class="sf-kicker" style="color:'+b.color+'">Phoenix Seal</div><h3 style="font-family:Cinzel;color:'+b.color+';margin:5px 0">'+esc(b.name)+'</h3><div class="sf-master-list"><div class="sf-master-card"><b>Beyond Artist</b><p>'+esc(b.artist)+'</p></div><div class="sf-master-card"><b>Why this matters</b><p>'+esc(b.why)+'</p></div><div class="sf-master-card"><b>Go beyond practice</b><p>'+esc(b.practice)+'</p></div><div class="sf-master-card"><b>Phoenix question</b><p>What changes in you after studying this boundary-crosser?</p></div></div><div class="sf-proof-grid" style="margin-top:10px"><textarea placeholder="What did you observe in the master artist?"></textarea><textarea placeholder="What will you try that goes beyond your current map?"></textarea><textarea placeholder="What evidence/recording/note will prove the transformation?"></textarea></div>';}
  };
})();
