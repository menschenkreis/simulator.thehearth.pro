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

  // ═══ HEARTH BODY CHAMBER ═══
  const HEARTH_BODY_ZONES=[
    {id:'brain',label:'Brain',seal:'B',x:'50%',y:'10%',r:28,guide:'Attention, memory, habit, emotion, and learning loops.',notice:'The brain learns what you repeat, not what you meant to repeat.',tryThis:'Choose one tiny movement and repeat it slowly ten times.',apply:'Play open \u2192 fret 2 \u2192 open on one string. Keep the timing even.',sourceNote:'Future source notes: neuroscience of practice, myelin, deliberate practice.'},
    {id:'hands',label:'Hands',seal:'H',x:'37%',y:'40%',r:30,guide:'Fingers, tendons, nerves, dexterity, and safe movement.',notice:'Tension in one finger often spreads into the whole hand.',tryThis:'Lift one finger slowly while the others stay relaxed. Make the movement smaller if the hand locks.',apply:'Play a 1-2-3-4 chromatic pattern slowly. Aim for quiet fingers, not speed.',sourceNote:'Future source notes: hand anatomy, tendon care, classical technique.'},
    {id:'ears',label:'Ears',seal:'E',x:'50%',y:'14%',r:22,guide:'Listening, pitch, rhythm perception, and audiation.',notice:'Your ear starts learning before your fingers know what to do.',tryThis:'Sing one note, then find it on the guitar.',apply:'Play two notes and decide which one feels like home.',sourceNote:'Future source notes: ear training, audiation, music cognition.'},
    {id:'eyes',label:'Eyes',seal:'I',x:'50%',y:'12%',r:20,guide:'Pattern recognition, notation, tab, and fretboard maps.',notice:'The eye turns repeated shapes into maps.',tryThis:'Look at a simple tab pattern and trace where it lives on the guitar before playing.',apply:'Read 0-2-0 on one string, then play it while watching the fretboard.',sourceNote:'Future source notes: visual learning, notation, fretboard mapping.'},
    {id:'breath',label:'Breath / Body',seal:'Br',x:'52%',y:'32%',r:32,guide:'Posture, relaxation, body scan, and nervous system regulation.',notice:'If the breath locks, the hands usually tighten too.',tryThis:'Exhale before changing chords. Notice whether the hand softens.',apply:'Play Am slowly while breathing out before each change.',sourceNote:'Future source notes: posture, relaxation, somatic learning.'},
    {id:'heart',label:'Heart / Feeling',seal:'Hrt',x:'48%',y:'28%',r:26,guide:'Motivation, confidence, shame, joy, identity, and expression.',notice:'Feeling is not separate from learning. It changes what the body allows.',tryThis:'Record one imperfect take and listen for one thing that worked.',apply:'End practice with one musical conversation, even if it is messy.',sourceNote:'Future source notes: performance psychology, motivation, reflective practice.'}
  ];
  window.HEARTH_BODY_ZONES=HEARTH_BODY_ZONES;

  let _hbDebug=false;
  let _hbActiveZone=null;

  function renderHearthBody(){
    inject(); const el=panel(); if(!el)return;
    const imgSrc='images/hearth-body-guitar.png';
    // SVG hotspots
    let svgZones='';
    let seals='';
    HEARTH_BODY_ZONES.forEach(function(z){
      svgZones+='<circle class="hb-zone'+(_hbDebug?' debug':'')+'" data-zone="'+z.id+'" '+
        'onclick="HearthBody.openZone(\''+esc(z.id)+'\')" '+
        'onmouseenter="HearthBody.hoverZone(\''+esc(z.id)+'\')" '+
        'onmouseleave="HearthBody.unhoverZone()" '+
        'cx="'+z.x+'" cy="'+z.y+'" r="'+z.r+'" />';
      // Seal (positioned over hotspot)
      seals+='<div class="hb-seal" id="seal-'+z.id+'" style="left:calc('+z.x+' - 19px);top:calc('+z.y+' - 19px)">'+
        '<span class="seal-icon">'+esc(z.seal)+'</span></div>';
    });

    el.innerHTML=
      '<div class="hb-wrap">'+
        '<button class="back-btn" onclick="backToMap()">\u2190 Map</button>'+
        '<div class="hb-scene">'+
          '<div class="hb-top">'+
            '<div><div class="hb-kicker">The Hearth</div>'+
            '<div class="hb-title">The Body Behind the Instrument</div>'+
            '<div class="hb-sub">Choose a system to see how you learn. Each zone is a doorway into the body\u2019s role in music.</div></div>'+
            '<div class="hb-guide">'+
              '<img src="images/character-full/Encouraging.png">'+
              '<div>This is the body behind the instrument. Choose a system to see how you learn.</div>'+
            '</div>'+
          '</div>'+
          '<div class="hb-body-wrap">'+
            '<img src="'+imgSrc+'" alt="Body behind the instrument" onerror="this.style.display=\'none\'">'+
            '<svg viewBox="0 0 100 100" preserveAspectRatio="none" class="hb-body-svg">'+
              svgZones+
            '</svg>'+
            seals+
            '<div class="hb-guide-bar" id="hb-guide-bar">'+
              '<div class="hb-guide-text">This is the body behind the instrument. Choose a system to see how you learn.</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>';
  }

  function renderHearthChamber(zoneId){
    inject(); const el=panel(); if(!el)return;
    const z=HEARTH_BODY_ZONES.find(function(x){return x.id===zoneId;});
    if(!z){renderHearthBody();return;}
    el.innerHTML=
      '<div class="hb-chamber">'+
        '<button class="back-btn" onclick="HearthBody.back()">\u2190 Back to Body</button>'+
        '<div class="hb-chamber-card">'+
          '<div class="hb-kicker">'+esc(z.seal)+' \u00B7 '+esc(z.label)+'</div>'+
          '<h3>'+esc(z.label)+'</h3>'+
          '<p style="font-size:.82rem;color:var(--text);line-height:1.6;margin:0">'+esc(z.guide)+'</p>'+
          '<div class="hb-chamber-cards">'+
            '<div class="hb-chamber-item"><h4>Notice</h4><p>'+esc(z.notice)+'</p></div>'+
            '<div class="hb-chamber-item"><h4>Try</h4><p>'+esc(z.tryThis)+'</p></div>'+
            '<div class="hb-chamber-item"><h4>Apply on Guitar</h4><p>'+esc(z.apply)+'</p></div>'+
          '</div>'+
          '<div class="hb-source-toggle" onclick="var n=this.nextElementSibling;n.classList.toggle(\'open\')">Source Notes</div>'+
          '<div class="hb-source-notes">'+esc(z.sourceNote)+'</div>'+
        '</div>'+
      '</div>';
  }

  window.HearthBody={
    hoverZone: function(id){
      var z=HEARTH_BODY_ZONES.find(function(x){return x.id===id;});
      if(!z)return;
      var bar=document.getElementById('hb-guide-bar');
      if(bar)bar.innerHTML='<div class="hb-guide-zone">'+esc(z.label)+'</div><div class="hb-guide-text">'+esc(z.guide)+'</div>';
      var seal=document.getElementById('seal-'+id);
      if(seal)seal.classList.add('bright');
    },
    unhoverZone: function(){
      var bar=document.getElementById('hb-guide-bar');
      if(bar)bar.innerHTML='<div class="hb-guide-text">This is the body behind the instrument. Choose a system to see how you learn.</div>';
      HEARTH_BODY_ZONES.forEach(function(z){var s=document.getElementById('seal-'+z.id);if(s)s.classList.remove('bright');});
    },
    openZone: function(id){
      _hbActiveZone=id;
      renderHearthChamber(id);
    },
    back: function(){
      _hbActiveZone=null;
      renderHearthBody();
    },
    toggleDebug: function(){
      _hbDebug=!_hbDebug;
      renderHearthBody();
    }
  };

  window.showHearth=function(){
    // Body chamber is the active Hearth renderer
    renderHearthBody();
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
        '<img class="sf-map-img" src="images/play-world-atlas.webp" alt="World Map of Guitar">'+
        '<svg viewBox="0 0 900 600" class="sf-map-svg">'+
          '<defs><filter id="sf-glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>'+
          svgHotspots+
        '</svg>'+
        '<div class="sf-map-count">'+rs.length+' traditions</div>'+
        '<div class="sf-map-guide" id="sf-map-guide"><div class="sf-map-guide-text" id="sf-map-guide-text">Choose a region. Listen for its rhythm, touch, scale colour, and story.</div></div>'+
      '</div></div>'+
      '<div id="sf-drawer" class="sf-drawer"></div></div></div>';
  };

  // STUDY: Rotating Key Chamber — 6 doors of clarity
  const STUDY_DOORS = [
    {id:'word',label:'Word',symbol:'\u25c7',state:'open',color:'#ff4444',guide:'A misunderstood word can blank everything after it.',action:'Choose one unclear term and clear it before continuing.',mode:'Dictionary / terms'},
    {id:'sound',label:'Sound',symbol:'\u266a',state:'recommended',color:'#ff8800',guide:'Your ear learns before your fingers obey.',action:'Listen to two notes and decide which feels like home.',mode:'Listening / ear training'},
    {id:'shape',label:'Shape',symbol:'\u2301',state:'open',color:'#ffcc00',guide:'A concept becomes easier when you can see where it lives.',action:'Compare one tab pattern to the fretboard.',mode:'Tab / notation / fretboard'},
    {id:'pattern',label:'Pattern',symbol:'\u2736',state:'open',color:'#44cc44',guide:'Study connects separate facts into a map.',action:'Link notes to intervals, scales, and chords.',mode:'Concept relationships'},
    {id:'test',label:'Test',symbol:'?',state:'open',color:'#3366ff',guide:'If you can explain it simply, it is becoming yours.',action:'Answer one tiny recall question.',mode:'Quiz / recall'},
    {id:'review',label:'Review',symbol:'\u21ba',state:'locked',color:'#6633cc',guide:'Forgetting is not failure. It is a signal to revisit.',action:'Return to one weak concept.',mode:'Spaced review'}
  ];
  window.STUDY_DOORS = STUDY_DOORS;

  let _skIdx = 0;
  let _skPanel = false;

  function skGuideText(){
    var d = STUDY_DOORS[_skIdx];
    if(_skPanel) return '';
    if(d.state==='locked') return 'This door is locked. Open more doors first, or start with the Word door.';
    if(d.state==='recommended') return d.guide + ' This door is recommended next.';
    return d.guide;
  }

  function renderStudyChamber(){
    inject(); var el=panel(); if(!el)return;
    var d = STUDY_DOORS[_skIdx];
    var total = STUDY_DOORS.length;

    // Build 3 visible doors: prev, current, next
    var prevIdx = (_skIdx - 1 + total) % total;
    var nextIdx = (_skIdx + 1) % total;
    var prev = STUDY_DOORS[prevIdx];
    var curr = STUDY_DOORS[_skIdx];
    var next = STUDY_DOORS[nextIdx];

    function doorStateColor(s){
      if(s==='locked') return '#666';
      if(s==='recommended') return AMBER;
      if(s==='open') return GOLD;
      return '#888';
    }

    // SVG door chamber
    var svg = '<svg viewBox="0 0 560 360" class="sk-door-svg">';

    // Floor / stage
    svg += '<ellipse cx="280" cy="320" rx="200" ry="20" fill="'+GOLD+'" opacity=".06"/>';

    // Side doors (dimmed, smaller)
    function sideDoor(x, door, opacity){
      var col = doorStateColor(door.state);
      return '<g class="door-group" style="opacity:'+opacity+'" onclick="SceneFirst.studyRotate('+(door===prev?'-1':'1')+')">'+
        '<rect x="'+(x-28)+'" y="100" width="56" height="180" rx="14" fill="'+col+'" opacity=".12" stroke="'+col+'" stroke-opacity=".3" class="door-shape"/>'+
        '<text x="'+x+'" y="185" text-anchor="middle" fill="'+col+'" font-family="Cinzel,serif" font-size="18" opacity=".6">'+door.symbol+'</text>'+
        '<text x="'+x+'" y="208" text-anchor="middle" fill="'+col+'" font-family="JetBrains Mono" font-size="8" opacity=".5">'+esc(door.label)+'</text>'+
        '</g>';
    }
    svg += sideDoor(110, prev, '.35');
    svg += sideDoor(450, next, '.35');

    // Central door (large, bright)
    var cCol = doorStateColor(curr.state);
    var cOp = curr.state==='locked' ? '.25' : '.6';
    var glowId = 'sk-glow-'+curr.id;
    svg += '<defs><radialGradient id="'+glowId+'"><stop offset="0%" stop-color="'+cCol+'" stop-opacity=".25"/><stop offset="100%" stop-color="'+cCol+'" stop-opacity="0"/></radialGradient></defs>';
    svg += '<circle cx="280" cy="190" r="110" fill="url(#'+glowId+')"/>';
    svg += '<g class="door-group" onclick="SceneFirst.studyEnter()">';
    svg += '<rect x="218" y="55" width="124" height="260" rx="24" fill="'+cCol+'" opacity="'+cOp+'" stroke="'+cCol+'" stroke-width="2" stroke-opacity=".5" class="door-shape"/>';
    // Keyhole
    svg += '<circle cx="280" cy="175" r="12" fill="none" stroke="'+GOLD+'" stroke-width="1.5" opacity=".7"/>';
    svg += '<rect x="278" y="175" width="4" height="14" rx="2" fill="'+GOLD+'" opacity=".7"/>';
    // Symbol
    svg += '<text x="280" y="145" text-anchor="middle" fill="'+cCol+'" font-family="Cinzel,serif" font-size="32">'+curr.symbol+'</text>';
    // Label
    svg += '<text x="280" y="220" text-anchor="middle" fill="'+cCol+'" font-family="Cinzel,serif" font-size="16" font-weight="600">'+esc(curr.label)+'</text>';
    // State badge
    var stateLabel = curr.state==='locked'?'LOCKED':curr.state==='recommended'?'RECOMMENDED':'OPEN';
    svg += '<text x="280" y="245" text-anchor="middle" fill="'+cCol+'" font-family="JetBrains Mono" font-size="8" opacity=".7">'+stateLabel+'</text>';
    svg += '</g>';

    // Rotate arrows
    svg += '<g style="cursor:pointer" onclick="SceneFirst.studyRotate(-1)">';
    svg += '<text x="30" y="200" fill="'+GOLD+'" font-size="24" opacity=".4" font-family="DM Sans">\u2039</text>';
    svg += '</g>';
    svg += '<g style="cursor:pointer" onclick="SceneFirst.studyRotate(1)">';
    svg += '<text x="530" y="200" fill="'+GOLD+'" font-size="24" opacity=".4" font-family="DM Sans">\u203a</text>';
    svg += '</g>';

    // Door index dots
    STUDY_DOORS.forEach(function(dd,i){
      var dotX = 220 + i*24;
      var dotOp = i===_skIdx ? '1' : '.25';
      var dotR = i===_skIdx ? '3.5' : '2.5';
      svg += '<circle cx="'+dotX+'" cy="340" r="'+dotR+'" fill="'+GOLD+'" opacity="'+dotOp+'"/>';
    });

    svg += '</svg>';

    el.innerHTML =
      '<div class="sk-wrap">'+
        '<button class="back-btn" onclick="backToMap()">\u2190 Map</button>'+
        '<div class="sk-scene">'+
          '<div class="sk-top">'+
            '<div><div class="sk-kicker">Study</div>'+
            '<div class="sk-title">The Key Chamber</div>'+
            '<div class="sk-sub">Study is where the books unlock doors. Choose the kind of clarity you need.</div></div>'+
            '<div class="sk-guide">'+
              '<img src="images/character-symbols/Thinking Question Mark.png">'+
              '<div>'+esc(skGuideText())+'</div>'+
            '</div>'+
          '</div>'+
          '<div class="sk-stage">'+svg+'</div>'+
        '</div>'+
        '<div class="sk-drawer" id="sk-drawer">'+
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">'+
            '<div><div class="sk-kicker" style="color:'+cCol+'">'+esc(curr.mode)+'</div>'+
            '<div style="font-family:Cinzel;color:var(--gold);font-size:.9rem">'+esc(curr.label)+' Door</div></div>'+
            (curr.state!=='locked'?
              '<button class="sf-primary" style="--sf:'+cCol+'" onclick="SceneFirst.studyEnter()">Enter Door</button>':
              '<button class="sf-secondary" disabled style="opacity:.4">Locked</button>')+
          '</div>'+
          '<div style="font-size:.75rem;color:var(--dim);line-height:1.5">'+esc(curr.guide)+'</div>'+
          '<div style="font-size:.72rem;color:var(--amber);margin-top:6px">'+esc(curr.action)+'</div>'+
        '</div>'+
      '</div>';
  }

  function renderStudyDoorPanel(doorId){
    inject(); var el=panel(); if(!el)return;
    var d = STUDY_DOORS.find(function(x){return x.id===doorId;});
    if(!d){renderStudyChamber();return;}
    el.innerHTML =
      '<div class="sk-panel">'+
        '<button class="back-btn" onclick="SceneFirst.studyBack()">\u2190 Back to Chamber</button>'+
        '<div class="sk-panel-card">'+
          '<div class="sk-mode">'+esc(d.mode)+'</div>'+
          '<h3>'+d.symbol+' '+esc(d.label)+'</h3>'+
          '<div class="sk-guide-text">'+esc(d.guide)+'</div>'+
          '<div class="sk-action">'+esc(d.action)+'</div>'+
          '<div class="sk-panel-btns">'+
            '<button class="secondary" onclick="SceneFirst.studyBack()">Back to Chamber</button>'+
            '<button onclick="SceneFirst.studyTry(\''+esc(d.id)+'\')">Try This</button>'+
          '</div>'+
        '</div>'+
      '</div>';
  }

  window.showStudy = function(){
    _skPanel = false;
    _skIdx = 0;
    renderStudyChamber();
  };

  // SceneFirst methods for study
  // (added to SceneFirst object below)

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

  // PRACTISE: Candle Timer — the candle becomes the practice timer.
  const PRACTICE_CANDLE = {
    durationMinutes: 20,
    focus: "Clean",
    timerId: null,
    startedAt: null,
    totalMs: 20 * 60 * 1000,
    running: false,
    complete: false
  };

  function setPracticeDuration(minutes) {
    PRACTICE_CANDLE.durationMinutes = minutes;
    PRACTICE_CANDLE.totalMs = minutes * 60 * 1000;
    updatePracticeTimeReadout(PRACTICE_CANDLE.totalMs);
    renderPracticeCandle();
  }

  function setPracticeFocus(focus) {
    PRACTICE_CANDLE.focus = focus;
    renderPracticeCandle();
  }

  function lightPracticeCandle() {
    if (PRACTICE_CANDLE.running) return;
    PRACTICE_CANDLE.startedAt = Date.now();
    PRACTICE_CANDLE.running = true;
    PRACTICE_CANDLE.complete = false;
    clearInterval(PRACTICE_CANDLE.timerId);
    PRACTICE_CANDLE.timerId = setInterval(updatePracticeCandle, 250);
    updatePracticeCandle();
  }

  function endPracticeCandle() {
    clearInterval(PRACTICE_CANDLE.timerId);
    PRACTICE_CANDLE.running = false;
    PRACTICE_CANDLE.complete = true;
    setPracticeCandleVisual(1, true);
    showPracticeReflection();
  }

  function updatePracticeCandle() {
    const elapsed = Date.now() - PRACTICE_CANDLE.startedAt;
    const progress = Math.min(1, elapsed / PRACTICE_CANDLE.totalMs);
    const remaining = Math.max(0, PRACTICE_CANDLE.totalMs - elapsed);
    setPracticeCandleVisual(progress, false);
    updatePracticeTimeReadout(remaining);
    if (progress >= 1) endPracticeCandle();
  }

  function setPracticeCandleVisual(progress, complete) {
    const flame = document.getElementById("practiceFlameGroup");
    const glow = document.getElementById("practiceCandleGlow");
    const clip = document.getElementById("practiceWaxClipRect");
    const ember = document.getElementById("practiceEmber");
    const wick = document.getElementById("practiceWickPath");
    if (!flame || !glow || !clip || !ember) return;

    if (complete) {
      flame.style.opacity = "0";
      flame.style.transition = "opacity 1.2s";
      glow.style.opacity = "0";
      glow.style.transition = "opacity 1.2s";
      ember.style.opacity = "1";
      ember.style.transition = "opacity 0.8s";
      if (wick) wick.style.opacity = "0.3";
      return;
    }

    const waxVisible = Math.max(0.18, 1 - progress * 0.82);
    const flameScale = Math.max(0.32, 1 - progress * 0.62);
    const glowOpacity = Math.max(0.12, 1 - progress * 0.75);
    const fullHeight = 220;
    const newHeight = fullHeight * waxVisible;
    const newY = 126 + (fullHeight - newHeight);

    flame.style.opacity = "1";
    flame.style.transform = "translate(130px, 76px) scale(" + flameScale + ")";
    glow.style.opacity = String(glowOpacity);
    ember.style.opacity = "0";
    clip.setAttribute("y", String(newY));
    clip.setAttribute("height", String(newHeight));
  }

  function updatePracticeTimeReadout(ms) {
    const el = document.getElementById("practiceTimeReadout");
    if (!el) return;
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    el.textContent = minutes + ":" + seconds;
  }

  function showPracticeReflection() {
    const panel = document.getElementById("practiceReflectionPanel");
    if (panel) panel.hidden = false;
  }

  function savePracticeEmber() {
    const feeling = (document.getElementById("practiceFeeling") || {}).value || "";
    const blockers = (document.getElementById("practiceBlockers") || {}).value || "";
    const nextStep = (document.getElementById("practiceNextStep") || {}).value || "";
    const key = "hearth-practice-log";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push({
      id: "practice-" + Date.now(),
      date: new Date().toISOString(),
      minutes: PRACTICE_CANDLE.durationMinutes,
      focus: PRACTICE_CANDLE.focus,
      feeling: feeling,
      blockers: blockers.split(",").map(function(x){ return x.trim(); }).filter(Boolean),
      nextStep: nextStep
    });
    localStorage.setItem(key, JSON.stringify(existing));
    renderPracticeCandle();
  }

  function renderPracticeCandle(){
    inject(); var el=panel(); if(!el)return;
    var durations = [5, 10, 20, 30];
    var focuses = ["Warm", "Clean", "Groove", "Carry"];
    var running = PRACTICE_CANDLE.running;
    var complete = PRACTICE_CANDLE.complete;

    // Duration pills
    var durPills = durations.map(function(m){
      var active = PRACTICE_CANDLE.durationMinutes === m;
      return '<button class="practice-pill'+(active?' active':'')+'" onclick="SceneFirst.practiceDuration('+m+')">'+m+'m</button>';
    }).join('');

    // Focus pills
    var focPills = focuses.map(function(f){
      var active = PRACTICE_CANDLE.focus === f;
      return '<button class="practice-pill'+(active?' active':'')+'" onclick="SceneFirst.practiceFocusNew(\''+f+'\')">'+f+'</button>';
    }).join('');

    // Controls (hidden when running)
    var controls = '<div class="practice-session-controls" id="practiceControls"'+(running||complete?' hidden':'')+'>'+
      '<div class="practice-choice-label">Candle Length</div>'+
      '<div class="practice-choice-row">'+durPills+'</div>'+
      '<div class="practice-choice-label">Focus</div>'+
      '<div class="practice-choice-row">'+focPills+'</div>'+
      '<button class="practice-light-btn" onclick="SceneFirst.lightCandle()">Light Candle</button>'+
    '</div>';

    // Reflection panel (hidden until complete)
    var reflection = '<div class="practice-reflection-panel" id="practiceReflectionPanel"'+(complete?'':' hidden')+'>'+
      '<h3>Leave an Ember</h3>'+
      '<label>What happened?</label>'+
      '<textarea id="practiceFeeling" rows="3"></textarea>'+
      '<label>What blocked you?</label>'+
      '<input id="practiceBlockers" placeholder="buzzing, rushing, tension">'+
      '<label>What should return next time?</label>'+
      '<input id="practiceNextStep" placeholder="repeat slower tomorrow">'+
      '<button class="practice-light-btn" onclick="SceneFirst.saveEmber()">Save Ember</button>'+
    '</div>';

    // SVG candle
    var svg = '<svg class="practice-candle-svg" viewBox="0 0 260 420" role="img" aria-label="Practice candle timer">'+
      '<defs>'+
        '<radialGradient id="practiceFlameGlow" cx="50%" cy="50%" r="55%">'+
          '<stop offset="0%" stop-color="#ffd36a" stop-opacity="0.85"/>'+
          '<stop offset="45%" stop-color="#e8a020" stop-opacity="0.28"/>'+
          '<stop offset="100%" stop-color="#e8a020" stop-opacity="0"/>'+
        '</radialGradient>'+
        '<linearGradient id="practiceWax" x1="0" x2="0" y1="0" y2="1">'+
          '<stop offset="0%" stop-color="#f4d89a"/>'+
          '<stop offset="45%" stop-color="#d7a94f"/>'+
          '<stop offset="100%" stop-color="#8a5a22"/>'+
        '</linearGradient>'+
        '<linearGradient id="practiceWick" x1="0" x2="0" y1="0" y2="1">'+
          '<stop offset="0%" stop-color="#3c2a18"/>'+
          '<stop offset="100%" stop-color="#100b06"/>'+
        '</linearGradient>'+
        '<filter id="practiceSoftGlow">'+
          '<feGaussianBlur stdDeviation="8" result="blur"/>'+
          '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>'+
        '</filter>'+
      '</defs>'+
      '<ellipse cx="130" cy="372" rx="92" ry="22" fill="rgba(0,0,0,0.35)"/>'+
      '<g id="practiceCandleGlow" style="opacity:0">'+
        '<circle cx="130" cy="86" r="96" fill="url(#practiceFlameGlow)"/>'+
      '</g>'+
      '<g id="practiceFlameGroup" transform="translate(130 76) scale(1)" style="opacity:0;transform-origin:130px 76px">'+
        '<path d="M0,-58 C28,-24 30,10 0,42 C-30,10 -24,-22 0,-58Z" fill="#e8a020" filter="url(#practiceSoftGlow)">'+
          (running?'<animate attributeName="d" dur="1.4s" repeatCount="indefinite" values="M0,-58 C28,-24 30,10 0,42 C-30,10 -24,-22 0,-58Z;M0,-52 C25,-20 28,12 0,44 C-28,12 -22,-18 0,-52Z;M0,-58 C28,-24 30,10 0,42 C-30,10 -24,-22 0,-58Z"/>':'')+
        '</path>'+
        '<path d="M0,-28 C14,-8 13,15 0,31 C-14,15 -12,-8 0,-28Z" fill="#ffe6a3"/>'+
      '</g>'+
      '<path id="practiceWickPath" d="M130,132 C128,116 132,101 130,88" stroke="url(#practiceWick)" stroke-width="5" stroke-linecap="round" fill="none"/>'+
      '<clipPath id="practiceWaxClip">'+
        '<rect id="practiceWaxClipRect" x="74" y="126" width="112" height="220" rx="28"/>'+
      '</clipPath>'+
      '<rect x="74" y="126" width="112" height="220" rx="28" fill="rgba(80,48,18,0.45)"/>'+
      '<g clip-path="url(#practiceWaxClip)">'+
        '<rect id="practiceWaxBody" x="74" y="126" width="112" height="220" rx="28" fill="url(#practiceWax)"/>'+
        '<path d="M77,152 C95,142 109,160 130,150 C151,140 165,154 183,146 L183,126 L77,126Z" fill="#ffe2a6" opacity="0.82"/>'+
      '</g>'+
      '<rect x="74" y="126" width="112" height="220" rx="28" fill="none" stroke="rgba(255,220,150,0.45)" stroke-width="2"/>'+
      '<g id="practiceEmber" style="opacity:0">'+
        '<circle cx="130" cy="114" r="8" fill="#e8731a" filter="url(#practiceSoftGlow)"/>'+
        '<circle cx="130" cy="114" r="3" fill="#ffd36a"/>'+
      '</g>'+
    '</svg>';

    el.innerHTML =
      '<div class="sk-wrap">'+
        '<button class="back-btn" onclick="backToMap()">\u2190 Map</button>'+
        '<div class="sk-scene">'+
          '<div class="sk-top">'+
            '<div><div class="sk-kicker">Practise Room</div>'+
            '<div class="sk-title">Candle Timer</div>'+
            '<div class="sk-sub">One candle. One intention. Light the candle to begin your practice session.</div></div>'+
            '<div class="sk-guide">'+
              '<img src="images/character-full/Encouraging.png">'+
              '<div>'+(running?'The candle is burning. Focus on your practice.':'The candle is ready. Choose your duration and focus, then light it.')+'</div>'+
            '</div>'+
          '</div>'+
          '<div class="practice-candle-stage">'+
            svg+
            '<div class="practice-time-readout" id="practiceTimeReadout">'+(complete?'Session complete':PRACTICE_CANDLE.durationMinutes+':00')+'</div>'+
          '</div>'+
        '</div>'+
        controls+
        reflection+
      '</div>';

    // Set initial candle state
    if (running) {
      updatePracticeCandle();
    } else if (!complete) {
      // Unlit state - show candle but no flame
      var flame = document.getElementById("practiceFlameGroup");
      var glow = document.getElementById("practiceCandleGlow");
      if (flame) flame.style.opacity = "0";
      if (glow) glow.style.opacity = "0";
    }
  }

  window.showPractice = function(){
    PRACTICE_CANDLE.running = false;
    PRACTICE_CANDLE.complete = false;
    clearInterval(PRACTICE_CANDLE.timerId);
    renderPracticeCandle();
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
    practiceDuration(m){setPracticeDuration(m);},
    practiceFocusNew(f){setPracticeFocus(f);},
    lightCandle(){lightPracticeCandle();},
    saveEmber(){savePracticeEmber();},
    savePracticeIntention(){const el=document.getElementById('sf-practice-intention');if(el)practiceSavePrefs({...practicePrefs(),intention:el.value});},
    openHearth(node){const el=document.getElementById('sf-drawer');const title=window.NODE_DATA&&NODE_DATA[node]?NODE_DATA[node].title:node;if(el)el.innerHTML='<b>'+esc(title)+'</b><br><span style="color:var(--dim)">This region opens the '+esc(title)+' learning system.</span><div class="sf-chiprow"><button onclick="enterNodeAction(NODE_DATA[\''+node+'\'])">Enter '+esc(title)+'</button></div>';},
    openPlay(id){if(window.PlayWorld&&PlayWorld.detail)return PlayWorld.detail(id);},
    mapHover(id){var rs=window.WORLD_MAP_REGIONS||[];var r=rs.find(function(x){return x.id===id;});if(!r)return;var g=document.getElementById('sf-map-guide-text');if(!g)return;g.innerHTML='<div class="sf-map-guide-region">'+esc(r.name)+'</div><div class="sf-map-guide-tradition">'+esc(r.tradition)+'</div>';},
    mapUnhover(){var g=document.getElementById('sf-map-guide-text');if(!g)return;g.innerHTML='Choose a region. Listen for its rhythm, touch, scale colour, and story.';},
    studyRotate(dir){_skIdx=(_skIdx+dir+STUDY_DOORS.length)%STUDY_DOORS.length;renderStudyChamber();},
    studyEnter(){var d=STUDY_DOORS[_skIdx];if(d.state==='locked')return;_skPanel=true;renderStudyDoorPanel(d.id);},
    studyBack(){_skPanel=false;renderStudyChamber();},
    studyTry(id){var d=STUDY_DOORS.find(function(x){return x.id===id;});if(!d)return;var el=document.getElementById('sk-drawer');if(!el)return;el.innerHTML='<div style="padding:8px"><div class="sk-kicker" style="color:'+d.color+'">Try This</div><div style="font-size:.82rem;color:var(--text);line-height:1.6;margin:8px 0">'+esc(d.action)+'</div><div class="sk-panel-btns"><button class="secondary" onclick="SceneFirst.studyBack()">Back to Chamber</button></div></div>';},
    toggleCreate(id){const c=read('hearth-create-current',{title:'Untitled Song Seed',ingredients:[],notes:'',selected:[]});const sel=new Set(c.selected||[]);if(sel.has(id))sel.delete(id);else sel.add(id);c.selected=Array.from(sel);write('hearth-create-current',c);showCreate();},
    stirCauldron(){const c=read('hearth-create-current',{});const sel=c.selected||[];if(!sel.length)return;const CI=window.CAULDRON_INGREDIENTS||[];const CC=window.CREATE_COMBOS||[];let result=null;if(sel.length===1){const ing=CI.find(x=>x.id===sel[0]);if(ing){const prompt=ing.prompts[Math.floor(Math.random()*ing.prompts.length)];result={constraint:'Single ingredient: '+ing.name,prompt:ing.symbol+' '+ing.name+': '+prompt,level:1,labels:[ing.symbol+' '+ing.name]};}}else{const sorted=sel.slice().sort();const match=CC.find(x=>x.ingredients.slice().sort().join(',')===sorted.join(','));if(match){const labels=sel.map(id=>{const ing=CI.find(x=>x.id===id);return ing?ing.symbol+' '+ing.name:id;});result={constraint:match.constraint,prompt:match.prompt,level:match.level,labels:labels};}else{const prompts=sel.map(id=>{const ing=CI.find(x=>x.id===id);return ing?ing.prompts[Math.floor(Math.random()*ing.prompts.length)]:'';});const labels=sel.map(id=>{const ing=CI.find(x=>x.id===id);return ing?ing.symbol+' '+ing.name:id;});result={constraint:'Combine: '+labels.join(' + '),prompt:prompts.join('\n\n'),level:sel.length,labels:labels};}}
    if(!result)return;const levelBadge=result.level<=2?'⚗️':result.level<=3?'🔥':'💀';const levelNames=['','Ingredient','Filter','Forge','Collision','Alchemy'];c.prompt=levelBadge+' L'+result.level+' '+levelNames[result.level]+': '+result.labels.join(' + ')+'\n'+result.constraint+'\n'+result.prompt;c.ingredients=sel.map(id=>{const ing=CI.find(x=>x.id===id);return ing?ing.name:id;});write('hearth-create-current',c);showCreate();},
    saveCreate(){const c=read('hearth-create-current',{});const t=document.getElementById('sf-create-title'),n=document.getElementById('sf-create-notes');if(t)c.title=t.value;if(n)c.notes=n.value;write('hearth-create-current',c);const ps=read('hearth-create-projects',[]);ps.push({...c,savedAt:new Date().toISOString()});write('hearth-create-projects',ps);showCreate();},
    newCreate(){write('hearth-create-current',{title:'Untitled Song Seed',ingredients:[],prompt:'Add one ingredient.',notes:''});showCreate();},
    openMastery(id){const b=beyond.find(x=>x.id===id);const el=document.getElementById('sf-drawer');if(!b||!el)return;el.innerHTML='<div class="sf-kicker" style="color:'+b.color+'">Phoenix Seal</div><h3 style="font-family:Cinzel;color:'+b.color+';margin:5px 0">'+esc(b.name)+'</h3><div class="sf-master-list"><div class="sf-master-card"><b>Beyond Artist</b><p>'+esc(b.artist)+'</p></div><div class="sf-master-card"><b>Why this matters</b><p>'+esc(b.why)+'</p></div><div class="sf-master-card"><b>Go beyond practice</b><p>'+esc(b.practice)+'</p></div><div class="sf-master-card"><b>Phoenix question</b><p>What changes in you after studying this boundary-crosser?</p></div></div><div class="sf-proof-grid" style="margin-top:10px"><textarea placeholder="What did you observe in the master artist?"></textarea><textarea placeholder="What will you try that goes beyond your current map?"></textarea><textarea placeholder="What evidence/recording/note will prove the transformation?"></textarea></div>';}
  };
})();
