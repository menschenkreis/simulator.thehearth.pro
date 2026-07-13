// Play World — Listening Shrine interaction.
// The active atlas entrance lives in adapters/play-atlas-viewer.js.
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'" :'&#39;'}[ch]));}
  function regions(){return window.WORLD_MAP_REGIONS||[];}
  function trunc(s,n){if(!s||s.length<=n)return s||'';var t=s.slice(0,n);var last=t.lastIndexOf(' ');if(last>n*0.6)t=t.slice(0,last);return t.trim()+(t.length<s.length?'…':'');}

  // ── Listening Lens data generators (fallback when no listeningLens in region) ──
  function lensData(r, key){
    // Use structured listeningLens if available
    if(r.listeningLens && r.listeningLens[key]) return r.listeningLens[key];
    // Fallback generators
    var techs=(r.techniques||[]).slice(0,2);
    var scales=(r.scales||[]).slice(0,2);
    var artists=(r.keyArtists||[]).slice(0,2);
    if(key==='pulse'){
      return {notice:'Listen for the rhythmic feel.',demo:techs.length?techs[0]+'.':r.tradition+' has its own pulse.',try:'Focus on rhythm. Tap your foot. Find the one.'};
    }
    if(key==='hand'){
      return {notice:'The hand tells the story.',demo:techs.length?techs.join(', ')+'.':'One region, one gesture.',try:'Copy one hand position. One bar. One rhythm.'};
    }
    if(key==='colour'){
      return {notice:'Every region has a tonal colour.',demo:scales.length?'Listen for: '+scales.join(', ')+'.':'Play the scale slowly.',try:'Find the root note. Play the scale. Say what you feel.'};
    }
    if(key==='story'){
      return {notice:r.tradition+' carries a story.',demo:artists.length?'Key voices: '+artists.join(', ')+'.':r.tradition+' — a tradition with deep roots.',try:'Read one artist\'s story. Listen to one track. Feel the context.'};
    }
    return {notice:'',demo:'',try:''};
  }

  var LENS_META = {
    pulse:   {icon:'⏱', label:'Pulse',   sub:'rhythm · groove · time feel'},
    hand:    {icon:'✋', label:'Hand',    sub:'technique · touch · gesture'},
    colour:  {icon:'🎨', label:'Colour',  sub:'scales · harmony · tuning'},
    story:   {icon:'📖', label:'Story',   sub:'artists · place · context'}
  };

  // ── Map render ──
  function render(){
    document.querySelectorAll('.pnl').forEach(p=>p.classList.remove('on'));
    const el=document.getElementById('p-foundation'); if(!el)return; el.classList.add('on'); injectStyle(); const rs=regions();
    let hotspots=rs.map(r=>'<g class="pw-hot" onclick="wmClick(\''+esc(r.id)+'\')" style="cursor:pointer"><circle cx="'+r.coords[0]+'" cy="'+r.coords[1]+'" r="18" fill="'+r.color+'" opacity=".08"><animate attributeName="r" values="12;22;12" dur="3s" repeatCount="indefinite"/></circle><circle cx="'+r.coords[0]+'" cy="'+r.coords[1]+'" r="6" fill="'+r.color+'" opacity=".45"/><circle cx="'+r.coords[0]+'" cy="'+r.coords[1]+'" r="2.5" fill="#fff"/></g>').join('');
    el.innerHTML='<div class="play-world"><button class="back-btn" onclick="backToMap()">← Map</button><div class="pw-hero"><div><div class="pw-kicker">Play · World Map of Guitar</div><h2>Guitar Is A World Language</h2><p>Click a region to learn how guitar behaves there.</p></div><div class="pw-guide"><img src="images/character-symbols/Encouraging Face Lightbulb.png"><div>Don\'t just collect styles. Listen for what makes each place physically different.</div></div></div><div class="pw-grid"><div class="pw-map"><svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="600" fill="#080704"/>'+hotspots+'</svg></div><div class="pw-index"><div class="pw-kicker">Traditions</div>'+rs.map(r=>'<button onclick="wmClick(\''+esc(r.id)+'\')" style="--c:'+r.color+'"><b>'+esc(r.name)+'</b><span>'+esc(r.tradition)+'</span></button>').join('')+'</div></div></div>';
  }

  // ── Shrine (region click) ──
  function detail(id){
    const r=regions().find(x=>x.id===id); if(!r)return; injectStyle(); const el=document.getElementById('p-foundation'); if(!el)return;
    var heroLine=trunc(r.description,120);
    var featured=(r.listenTo&&r.listenTo[0])||'';
    el.innerHTML=
      '<div class="pw-shrine" style="--c:'+r.color+'">'+
        '<button class="back-btn" onclick="showPlay()">← World Map</button>'+
        '<div class="shrine-video">'+
          '<div class="shrine-video-placeholder">'+
            '<div class="shrine-video-icon">▶</div>'+
            (featured?'<div class="shrine-video-label">'+esc(featured)+'</div>':'<div class="shrine-video-label">Play a recording from '+esc(r.name)+'</div>')+
          '</div>'+
        '</div>'+
        '<div class="shrine-title">'+
          '<div class="pw-kicker" style="color:'+r.color+'">'+esc(r.name)+'</div>'+
          '<h2>'+esc(r.tradition)+'</h2>'+
        '</div>'+
        '<p class="shrine-line">'+esc(heroLine)+'</p>'+
        '<div class="shrine-guide">'+
          '<img src="images/character-symbols/Encouraging Face Lightbulb.png" alt="">'+
          '<div>Don\'t study yet. Watch the hands. Feel the pulse.</div>'+
        '</div>'+
        '<button class="shrine-cta" onclick="PlayWorld.lens(\''+esc(r.id)+'\')">What am I hearing?</button>'+
        '<button class="shrine-notes-btn" onclick="this.nextElementSibling.classList.toggle(\'open\');this.textContent=this.textContent===\'Source Notes\'?\'Close Notes\':\'Source Notes\'">Source Notes</button>'+
        '<div class="shrine-notes">'+
          (r.description?'<p>'+esc(r.description)+'</p>':'')+
          (r.keyArtists&&r.keyArtists.length?'<div class="shrine-notes-section"><div class="shrine-notes-label">Artists</div><div class="shrine-tags">'+r.keyArtists.map(function(a){return '<span style="border:1px solid '+r.color+'55;color:'+r.color+';background:'+r.color+'10;border-radius:999px;padding:4px 8px;font-size:.65rem">'+esc(a)+'</span>';}).join('')+'</div></div>':'')+
          (r.scales&&r.scales.length?'<div class="shrine-notes-section"><div class="shrine-notes-label">Scales</div><p>'+esc(r.scales.join(', '))+'</p></div>':'')+
          (r.techniques&&r.techniques.length?'<div class="shrine-notes-section"><div class="shrine-notes-label">Techniques</div><p>'+esc(r.techniques.join(', '))+'</p></div>':'')+
          (r.learnFirst?'<div class="shrine-notes-section"><div class="shrine-notes-label">Start here</div><p>'+esc(r.learnFirst)+'</p></div>':'')+
        '</div>'+
      '</div>';
  }

  // ── Listening Lens (4 seals) ──
  function lens(id){
    const r=regions().find(x=>x.id===id); if(!r)return; injectStyle(); const el=document.getElementById('p-foundation'); if(!el)return;
    var keys=['pulse','hand','colour','story'];
    var seals=keys.map(function(k){
      var m=LENS_META[k];
      return '<button class="lens-seal" onclick="PlayWorld.lensPanel(\''+esc(id)+'\',\''+esc(k)+'\')">'+
        '<div class="lens-seal-icon">'+m.icon+'</div>'+
        '<div class="lens-seal-label">'+m.label+'</div>'+
        '<div class="lens-seal-sub">'+m.sub+'</div>'+
      '</button>';
    }).join('');
    el.innerHTML=
      '<div class="pw-shrine" style="--c:'+r.color+'">'+
        '<button class="back-btn" onclick="wmClick(\''+esc(id)+'\')">← '+esc(r.name)+'</button>'+
        '<div class="shrine-title">'+
          '<div class="pw-kicker" style="color:'+r.color+'">'+esc(r.name)+'</div>'+
          '<h2>'+esc(r.tradition)+'</h2>'+
        '</div>'+
        '<div class="lens-wrap">'+
          '<div class="lens-prompt">What am I hearing?</div>'+
          '<div class="lens-seals">'+seals+'</div>'+
          '<div class="lens-hint">Pick one. Listen deeper.</div>'+
        '</div>'+
        '<div class="shrine-guide">'+
          '<img src="images/character-symbols/Thinking Question Mark.png" alt="">'+
          '<div>Four dimensions of sound. Choose one and follow it.</div>'+
        '</div>'+
      '</div>';
  }

  // ── Lens Panel (single seal detail) ──
  function lensPanel(id, key){
    const r=regions().find(x=>x.id===id); if(!r)return; injectStyle(); const el=document.getElementById('p-foundation'); if(!el)return;
    var d=lensData(r, key);
    var meta=LENS_META[key];
    el.innerHTML=
      '<div class="pw-shrine" style="--c:'+r.color+'">'+
        '<button class="back-btn" onclick="PlayWorld.lens(\''+esc(id)+'\')">← Listening Lens</button>'+
        '<div class="shrine-title">'+
          '<div class="pw-kicker" style="color:'+r.color+'">'+esc(r.name)+'</div>'+
          '<h2>'+meta.icon+' '+meta.label+'</h2>'+
        '</div>'+
        // Notice
        '<div class="lens-panel-block lens-panel-notice">'+
          '<div class="lens-panel-label">Notice</div>'+
          '<p>'+esc(d.notice)+'</p>'+
        '</div>'+
        // Demo
        '<div class="lens-panel-block lens-panel-demo">'+
          '<div class="lens-panel-label">Watch For</div>'+
          '<p>'+esc(d.demo)+'</p>'+
        '</div>'+
        // Try
        '<div class="lens-panel-block lens-panel-try">'+
          '<div class="lens-panel-label">Try This Now</div>'+
          '<p>'+esc(d.try)+'</p>'+
        '</div>'+
        // Actions
        '<div class="lens-panel-actions">'+
          '<button onclick="showDoing()">Try in Doing</button>'+
          '<button onclick="showPractice()">Open Practice</button>'+
          '<button onclick="wmClick(\''+esc(id)+'\')">Back to Listening</button>'+
        '</div>'+
      '</div>';
  }

  // ── CSS ──
  function injectStyle(){
    if(document.getElementById('play-world-style-v3'))return; const s=document.createElement('style'); s.id='play-world-style-v3'; s.textContent=`
    .play-world{padding:18px;max-width:1020px;margin:0 auto}
    .pw-hero{display:grid;grid-template-columns:minmax(0,1fr) 290px;gap:14px;background:linear-gradient(135deg,rgba(212,175,105,.12),rgba(13,11,8,.88));border:1px solid var(--border);border-radius:18px;padding:18px;margin:10px 0 14px}
    .pw-kicker{font-family:JetBrains Mono;font-size:.58rem;color:var(--gold);letter-spacing:.16em;text-transform:uppercase}
    .pw-hero h2{font-family:Cinzel;color:var(--gold);font-size:1.55rem;margin:5px 0}
    .pw-hero p{font-size:.78rem;color:var(--dim);line-height:1.55}
    .pw-guide{display:flex;gap:10px;align-items:center;background:rgba(13,11,8,.55);border:1px solid var(--border);border-radius:12px;padding:10px;font-size:.72rem;color:var(--text);line-height:1.4}
    .pw-guide img{width:74px;height:74px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,.4));animation:char-float 3s ease-in-out infinite}
    .pw-grid{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:14px}
    .pw-map,.pw-index{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:12px}
    .pw-map svg{width:100%;display:block;background:#080704;border-radius:12px}
    .pw-index{display:flex;flex-direction:column;gap:7px;max-height:590px;overflow:auto}
    .pw-index button{background:rgba(13,11,8,.55);border:1px solid var(--border);border-radius:10px;color:var(--text);padding:9px;text-align:left;cursor:pointer}
    .pw-index button:hover{border-color:var(--c)}
    .pw-index b{display:block;color:var(--c);font-family:Cinzel;font-size:.78rem}
    .pw-index span{font-size:.65rem;color:var(--dim)}
    .pw-tags{display:flex;flex-wrap:wrap;gap:6px}
    @media(max-width:780px){.pw-hero,.pw-grid{grid-template-columns:1fr}}

    .pw-shrine{padding:18px;max-width:580px;margin:0 auto}
    .shrine-video{margin:0 0 16px;border-radius:14px;overflow:hidden;background:#080704;border:1px solid var(--border)}
    .shrine-video-placeholder{aspect-ratio:16/9;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--dim)}
    .shrine-video-icon{width:56px;height:56px;border-radius:50%;border:2px solid var(--c);display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--c);opacity:.6}
    .shrine-video-label{font-size:.75rem;max-width:80%;text-align:center;line-height:1.4}
    .shrine-title{margin-bottom:8px}
    .shrine-title h2{font-family:Cinzel;color:var(--c);font-size:1.3rem;margin:4px 0 0}
    .shrine-line{font-size:.85rem;color:var(--text);line-height:1.5;margin:0 0 16px;font-style:italic}
    .shrine-guide{display:flex;gap:10px;align-items:center;background:rgba(13,11,8,.55);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:16px;font-size:.75rem;color:var(--text);line-height:1.4}
    .shrine-guide img{width:56px;height:56px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,.4));animation:char-float 3s ease-in-out infinite}
    .shrine-cta{display:block;width:100%;padding:14px;background:var(--c);color:#0d0b08;border:none;border-radius:10px;font-family:Cinzel;font-size:.9rem;font-weight:700;cursor:pointer;margin-bottom:12px;transition:all .2s}
    .shrine-cta:hover{transform:scale(1.01);box-shadow:0 8px 24px rgba(0,0,0,.3)}
    .shrine-notes-btn{display:block;width:100%;background:rgba(13,11,8,.5);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--dim);font-size:.68rem;cursor:pointer;margin-bottom:4px;letter-spacing:.06em;text-transform:uppercase;font-family:JetBrains Mono,monospace}
    .shrine-notes-btn:hover{color:var(--text);border-color:var(--c)}
    .shrine-notes{display:none;margin-top:4px}
    .shrine-notes.open{display:block}
    .shrine-notes p{font-size:.75rem;color:var(--dim);line-height:1.5;margin:0 0 10px}
    .shrine-notes-section{margin-bottom:10px}
    .shrine-notes-label{font-family:JetBrains Mono;font-size:.52rem;color:var(--c);letter-spacing:.12em;text-transform:uppercase;margin-bottom:4px}
    .shrine-tags{display:flex;flex-wrap:wrap;gap:5px}

    /* ── Listening Lens ── */
    .lens-wrap{margin-bottom:18px}
    .lens-prompt{font-family:Cinzel;font-size:1.1rem;color:var(--c);text-align:center;margin-bottom:16px;letter-spacing:.04em}
    .lens-seals{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:10px}
    .lens-seal{background:rgba(13,11,8,.6);border:1.5px solid var(--border);border-radius:14px;padding:16px 8px;text-align:center;cursor:pointer;transition:all .25s;display:flex;flex-direction:column;align-items:center;gap:6px}
    .lens-seal:hover{border-color:var(--c);background:rgba(212,175,105,.08);transform:translateY(-2px)}
    .lens-seal:active{transform:scale(.97)}
    .lens-seal-icon{font-size:1.6rem;line-height:1}
    .lens-seal-label{font-family:Cinzel;font-size:.78rem;color:var(--text);font-weight:700}
    .lens-seal-sub{font-family:JetBrains Mono;font-size:.48rem;color:var(--dim);letter-spacing:.06em;text-transform:uppercase;line-height:1.3}
    .lens-hint{font-size:.68rem;color:var(--dim);text-align:center;font-style:italic}
    @media(max-width:520px){.lens-seals{grid-template-columns:repeat(2,1fr)}}

    /* ── Lens Panel ── */
    .lens-panel-block{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px 16px;margin-bottom:12px}
    .lens-panel-label{font-family:JetBrains Mono;font-size:.52rem;color:var(--c);letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px}
    .lens-panel-block p{font-size:.82rem;color:var(--text);line-height:1.55;margin:0}
    .lens-panel-notice{border-left:3px solid var(--c)}
    .lens-panel-demo{border-left:3px solid rgba(212,175,105,.35)}
    .lens-panel-try{border:2px solid color-mix(in srgb,var(--c),transparent 50%);background:rgba(212,175,105,.04)}
    .lens-panel-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
    .lens-panel-actions button{background:var(--c);color:#0d0b08;border:none;border-radius:8px;padding:10px 14px;font-weight:800;cursor:pointer;font-size:.75rem}
    .lens-panel-actions button:last-child{background:rgba(13,11,8,.6);color:var(--c);border:1px solid var(--border)}
    `;
    document.head.appendChild(s);
  }

  window.PlayWorld={render,detail,lens,lensPanel};
  window.wmClick=detail;
})();
