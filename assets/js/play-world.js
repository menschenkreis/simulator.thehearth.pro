// Play World — Listening Shrine interaction.
// Play is currently rendered here. play-worldmap.js contains legacy region data.
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function regions(){return window.WORLD_MAP_REGIONS||[];}
  function trunc(s,n){if(!s||s.length<=n)return s||'';var t=s.slice(0,n);var last=t.lastIndexOf(' ');if(last>n*0.6)t=t.slice(0,last);return t.trim()+(t.length<s.length?'…':'');}

  // Compass point data generators
  function pulseData(r){
    var techs=(r.techniques||[]).slice(0,2);
    return {
      label:'Pulse',
      icon:'⏱',
      line:techs.length?techs[0]:'Listen for the rhythmic feel.',
      detail:techs.length?techs.join('. ')+'.':r.tradition+' has its own pulse — listen before you play.',
      ref:(r.listenTo&&r.listenTo[0])||'Play a recording and focus only on the rhythm.',
      action:'Focus on rhythm. Tap your foot. Find the one.'
    };
  }
  function handData(r){
    var techs=(r.techniques||[]).slice(0,2);
    return {
      label:'Hand',
      icon:'✋',
      line:techs.length?techs[1]||techs[0]:'The hand tells the story.',
      detail:techs.length?techs.join(', ')+'.':'One region, one gesture.',
      ref:'Watch a master\'s right hand. That IS the tradition.',
      action:'Copy one hand position. One bar. One rhythm.'
    };
  }
  function colourData(r){
    var scales=(r.scales||[]).slice(0,2);
    return {
      label:'Colour',
      icon:'🎨',
      line:scales.length? scales[0]:'The scale colour of this place.',
      detail:scales.length?scales.join(', ')+'.':'Every region has a tonal colour.',
      ref:'Play the scale slowly. Feel what makes it different.',
      action:'Find the root note. Play the scale. Say what you feel.'
    };
  }
  function storyData(r){
    var artists=(r.keyArtists||[]).slice(0,2);
    return {
      label:'Story',
      icon:'📖',
      line:artists.length?artists.join(', '):r.tradition+' carries a story.',
      detail:(r.description?trunc(r.description,200):r.tradition+' — a tradition with deep roots.')+(artists.length?' Key voices: '+artists.join(', ')+'.':''),
      ref:r.tradition+' is not just notes. It\'s a place, a people, a history.',
      action:'Read one artist\'s story. Listen to one track. Feel the context.'
    };
  }

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
        // Featured video/reference area
        '<div class="shrine-video">'+
          '<div class="shrine-video-placeholder">'+
            '<div class="shrine-video-icon">▶</div>'+
            (featured?'<div class="shrine-video-label">'+esc(featured)+'</div>':'<div class="shrine-video-label">Play a recording from '+esc(r.name)+'</div>')+
          '</div>'+
        '</div>'+
        // Title
        '<div class="shrine-title">'+
          '<div class="pw-kicker" style="color:'+r.color+'">'+esc(r.name)+'</div>'+
          '<h2>'+esc(r.tradition)+'</h2>'+
        '</div>'+
        // Emotional line
        '<p class="shrine-line">'+esc(heroLine)+'</p>'+
        // Guide
        '<div class="shrine-guide">'+
          '<img src="images/character-symbols/Encouraging Face Lightbulb.png" alt="">'+
          '<div>Don\'t study yet. Watch the hands. Feel the pulse.</div>'+
        '</div>'+
        // Primary button
        '<button class="shrine-cta" onclick="PlayWorld.compass(\''+esc(r.id)+'\')">What am I hearing?</button>'+
        // Source Notes drawer
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

  // ── Compass ──
  function compass(id){
    const r=regions().find(x=>x.id===id); if(!r)return; injectStyle(); const el=document.getElementById('p-foundation'); if(!el)return;
    var points=[
      {key:'pulse',data:pulseData(r)},
      {key:'hand',data:handData(r)},
      {key:'colour',data:colourData(r)},
      {key:'story',data:storyData(r)}
    ];
    // positions: top, right, bottom, left
    var pos=[{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}];
    var dots=points.map(function(p,i){
      var cx=140+pos[i].x*90, cy=120+pos[i].y*80;
      return '<g class="compass-point" onclick="PlayWorld.compassPanel(\''+esc(id)+'\',\''+esc(p.key)+'\')" style="cursor:pointer">'+
        '<circle cx="'+cx+'" cy="'+cy+'" r="30" fill="'+r.color+'" opacity=".12"/>'+
        '<circle cx="'+cx+'" cy="'+cy+'" r="14" fill="'+r.color+'" opacity=".35"/>'+
        '<text x="'+cx+'" y="'+(cy-2)+'" text-anchor="middle" font-size="16">'+p.data.icon+'</text>'+
        '<text x="'+cx+'" y="'+(cy+14)+'" text-anchor="middle" fill="'+r.color+'" font-family="JetBrains Mono" font-size="7" letter-spacing=".06em">'+p.data.label.toUpperCase()+'</text>'+
      '</g>';
    }).join('');
    el.innerHTML=
      '<div class="pw-shrine" style="--c:'+r.color+'">'+
        '<button class="back-btn" onclick="wmClick(\''+esc(id)+'\')">← '+esc(r.name)+'</button>'+
        '<div class="shrine-title">'+
          '<div class="pw-kicker" style="color:'+r.color+'">'+esc(r.name)+'</div>'+
          '<h2>'+esc(r.tradition)+'</h2>'+
        '</div>'+
        '<div class="compass-wrap">'+
          '<svg viewBox="0 0 280 240" class="compass-svg">'+
            '<circle cx="140" cy="120" r="60" fill="none" stroke="'+r.color+'" stroke-width=".6" opacity=".2"/>'+
            '<circle cx="140" cy="120" r="3" fill="'+r.color+'" opacity=".5"/>'+
            dots+
          '</svg>'+
          '<div class="compass-label">What am I hearing?</div>'+
        '</div>'+
        '<div class="shrine-guide">'+
          '<img src="images/character-symbols/Thinking Question Mark.png" alt="">'+
          '<div>Four dimensions of sound. Pick one. Listen deeper.</div>'+
        '</div>'+
      '</div>';
  }

  // ── Compass Panel ──
  function compassPanel(id,point){
    const r=regions().find(x=>x.id===id); if(!r)return; injectStyle(); const el=document.getElementById('p-foundation'); if(!el)return;
    var generators={pulse:pulseData,hand:handData,colour:colourData,story:storyData};
    var d=generators[point]?generators[point](r):null;
    if(!d)return;
    el.innerHTML=
      '<div class="pw-shrine" style="--c:'+r.color+'">'+
        '<button class="back-btn" onclick="PlayWorld.compass(\''+esc(id)+'\')">← Compass</button>'+
        '<div class="shrine-title">'+
          '<div class="pw-kicker" style="color:'+r.color+'">'+esc(r.name)+' · '+d.label+'</div>'+
          '<h2>'+d.icon+' '+esc(d.label)+'</h2>'+
        '</div>'+
        '<p class="shrine-line">'+esc(d.line)+'</p>'+
        '<div class="panel-card">'+
          '<div class="panel-card-body">'+esc(d.detail)+'</div>'+
          '<div class="panel-card-ref">'+esc(d.ref)+'</div>'+
        '</div>'+
        '<div class="panel-action">'+
          '<div class="panel-action-label">Try this now</div>'+
          '<p>'+esc(d.action)+'</p>'+
        '</div>'+
        '<div class="shrine-nav">'+
          '<button onclick="showDoing()">Try in Doing</button>'+
          '<button onclick="showPractice()">Open Practice</button>'+
          '<button onclick="wmClick(\''+esc(id)+'\')">Back to Listening</button>'+
        '</div>'+
      '</div>';
  }

  // ── CSS ──
  function injectStyle(){
    if(document.getElementById('play-world-style-v2'))return; const s=document.createElement('style'); s.id='play-world-style-v2'; s.textContent=`
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

    .compass-wrap{display:flex;flex-direction:column;align-items:center;margin-bottom:16px}
    .compass-svg{width:min(280px,80%);display:block}
    .compass-label{font-family:JetBrains Mono;font-size:.58rem;color:var(--dim);letter-spacing:.1em;text-transform:uppercase;margin-top:8px}
    .compass-point circle{transition:all .2s}
    .compass-point:hover circle{opacity:.5!important}

    .panel-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:14px}
    .panel-card-body{font-size:.82rem;color:var(--text);line-height:1.55;margin-bottom:8px}
    .panel-card-ref{font-size:.72rem;color:var(--dim);line-height:1.4;font-style:italic;border-top:1px solid var(--border);padding-top:8px}
    .panel-action{background:var(--card);border:2px solid color-mix(in srgb,var(--c),transparent 50%);border-radius:12px;padding:14px;margin-bottom:16px}
    .panel-action-label{font-family:JetBrains Mono;font-size:.52rem;color:var(--c);letter-spacing:.12em;text-transform:uppercase;margin-bottom:4px}
    .panel-action p{font-size:.8rem;color:var(--text);line-height:1.5;margin:0}
    .shrine-nav{display:flex;flex-wrap:wrap;gap:8px}
    .shrine-nav button{background:var(--c);color:#0d0b08;border:none;border-radius:8px;padding:10px 14px;font-weight:800;cursor:pointer;font-size:.75rem}
    .shrine-nav button:last-child{background:rgba(13,11,8,.6);color:var(--c);border:1px solid var(--border)}
    `;
    document.head.appendChild(s);
  }

  window.PlayWorld={render,detail,compass,compassPanel};
  window.showPlay=render;
  window.wmClick=detail;
})();
