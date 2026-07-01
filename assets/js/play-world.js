// Play World override — educational guitar traditions map.
// Play is currently rendered here. play-worldmap.js contains legacy region data.
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function regions(){return window.WORLD_MAP_REGIONS||[];}
  function list(items){return (items||[]).map(x=>'<li>'+esc(x)+'</li>').join('') || '<li>Explore by listening first.</li>';}
  function tags(items,color){return (items||[]).map(x=>'<span style="border:1px solid '+color+'55;color:'+color+';background:'+color+'10;border-radius:999px;padding:5px 8px;font-size:.65rem">'+esc(x)+'</span>').join('');}
  function trunc(s,n){if(!s||s.length<=n)return s||'';var t=s.slice(0,n);var last=t.lastIndexOf(' ');if(last>n*0.6)t=t.slice(0,last);return t.trim()+(t.length<s.length?'…':'');}
  function guide(r){
    if(r.id==='ethiopia')return 'Ethio-jazz is about colour and phrasing.';
    if(r.id==='mississippi')return 'Delta blues is one guitar telling the truth.';
    if(r.id==='brazil')return 'Bossa is quiet precision.';
    if(r.id==='andalusia')return 'Flamenco is rhythm, fire, and gravity.';
    return 'Listen, learn one sound, copy one gesture.';
  }
  function render(){
    document.querySelectorAll('.pnl').forEach(p=>p.classList.remove('on'));
    const el=document.getElementById('p-foundation'); if(!el)return; el.classList.add('on'); injectStyle(); const rs=regions();
    let hotspots=rs.map(r=>'<g class="pw-hot" onclick="wmClick(\''+esc(r.id)+'\')" style="cursor:pointer"><circle cx="'+r.coords[0]+'" cy="'+r.coords[1]+'" r="18" fill="'+r.color+'" opacity=".08"><animate attributeName="r" values="12;22;12" dur="3s" repeatCount="indefinite"/></circle><circle cx="'+r.coords[0]+'" cy="'+r.coords[1]+'" r="6" fill="'+r.color+'" opacity=".45"/><circle cx="'+r.coords[0]+'" cy="'+r.coords[1]+'" r="2.5" fill="#fff"/></g>').join('');
    el.innerHTML='<div class="play-world"><button class="back-btn" onclick="backToMap()">← Map</button><div class="pw-hero"><div><div class="pw-kicker">Play · World Map of Guitar</div><h2>Guitar Is A World Language</h2><p>Click a region to learn how guitar behaves there.</p></div><div class="pw-guide"><img src="images/character-symbols/Encouraging Face Lightbulb.png"><div>'+esc(guide({}))+'</div></div></div><div class="pw-grid"><div class="pw-map"><svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="600" fill="#080704"/>'+hotspots+'</svg></div><div class="pw-index"><div class="pw-kicker">Traditions</div>'+rs.map(r=>'<button onclick="wmClick(\''+esc(r.id)+'\')" style="--c:'+r.color+'"><b>'+esc(r.name)+'</b><span>'+esc(r.tradition)+'</span></button>').join('')+'</div></div></div>';
  }
  function detail(id){
    const r=regions().find(x=>x.id===id); if(!r)return; injectStyle(); const el=document.getElementById('p-foundation'); if(!el)return;
    var pulse=(r.techniques&&r.techniques[0])||'Listen for the rhythmic feel';
    var hand=(r.techniques||[]).slice(0,2).join(', ')||'One gesture, one phrase';
    var colour=(r.scales||[]).slice(0,2).join(', ')||'The local scale colour';
    var featured=(r.listenTo&&r.listenTo[0])||'';
    var heroLine=trunc(r.description,140);
    var learnText=r.learnFirst||'Listen first, then copy one small gesture.';
    el.innerHTML=
      '<div class="pw-card" style="--c:'+r.color+'">'+
        '<button class="back-btn" onclick="showPlay()">← World Map</button>'+
        '<div class="pw-card-head">'+
          '<div class="pw-kicker" style="color:'+r.color+'">'+esc(r.name)+'</div>'+
          '<h2>'+esc(r.tradition)+'</h2>'+
        '</div>'+
        '<p class="pw-hero-line">'+esc(heroLine)+'</p>'+
        '<div class="pw-chips">'+
          '<div class="pw-chip"><span class="pw-chip-label">Pulse</span><span class="pw-chip-val">'+esc(pulse)+'</span></div>'+
          '<div class="pw-chip"><span class="pw-chip-label">Hand</span><span class="pw-chip-val">'+esc(hand)+'</span></div>'+
          '<div class="pw-chip"><span class="pw-chip-label">Scale Colour</span><span class="pw-chip-val">'+esc(colour)+'</span></div>'+
        '</div>'+
        (featured?'<div class="pw-featured"><div class="pw-featured-label">Featured Listening</div><div class="pw-featured-track">'+esc(featured)+'</div></div>':'')+
        '<div class="pw-learn"><div class="pw-learn-label">Try This Now</div><p>'+esc(learnText)+'</p></div>'+
        '<div class="pw-actions">'+
          '<button onclick="showDoing()">Try in Doing</button>'+
          '<button onclick="showPractice()">Open Practice</button>'+
          '<button onclick="showPlay()">Back to Map</button>'+
        '</div>'+
        '<button class="pw-more-btn" onclick="this.nextElementSibling.classList.toggle(\'open\');this.textContent=this.textContent===\'Show More\'?\'Show Less\':\'Show More\'">Show More</button>'+
        '<div class="pw-extra">'+
          (r.description?'<div class="pw-extra-section"><div class="pw-extra-label">About</div><p>'+esc(r.description)+'</p></div>':'')+
          (r.keyArtists&&r.keyArtists.length?'<div class="pw-extra-section"><div class="pw-extra-label">Key Artists</div><div class="pw-tags">'+tags(r.keyArtists,r.color)+'</div></div>':'')+
          (r.scales&&r.scales.length>2?'<div class="pw-extra-section"><div class="pw-extra-label">All Scales</div><ul class="pw-list">'+list(r.scales)+'</ul></div>':'')+
          (r.techniques&&r.techniques.length>2?'<div class="pw-extra-section"><div class="pw-extra-label">All Techniques</div><ul class="pw-list">'+list(r.techniques)+'</ul></div>':'')+
          (r.listenTo&&r.listenTo.length>1?'<div class="pw-extra-section"><div class="pw-extra-label">More Listening</div><ul class="pw-list">'+list(r.listenTo.slice(1))+'</ul></div>':'')+
        '</div>'+
      '</div>';
  }
  function injectStyle(){
    if(document.getElementById('play-world-style-v2'))return; const s=document.createElement('style'); s.id='play-world-style-v2'; s.textContent=`
    .play-world{padding:18px;max-width:1020px;margin:0 auto}.pw-hero{display:grid;grid-template-columns:minmax(0,1fr) 290px;gap:14px;background:linear-gradient(135deg,rgba(212,175,105,.12),rgba(13,11,8,.88));border:1px solid var(--border);border-radius:18px;padding:18px;margin:10px 0 14px}.pw-kicker{font-family:JetBrains Mono;font-size:.58rem;color:var(--gold);letter-spacing:.16em;text-transform:uppercase}.pw-hero h2{font-family:Cinzel;color:var(--gold);font-size:1.55rem;margin:5px 0}.pw-hero p{font-size:.78rem;color:var(--dim);line-height:1.55}.pw-guide{display:flex;gap:10px;align-items:center;background:rgba(13,11,8,.55);border:1px solid var(--border);border-radius:12px;padding:10px;font-size:.72rem;color:var(--text);line-height:1.4}.pw-guide img{width:74px;height:74px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,.4));animation:char-float 3s ease-in-out infinite}.pw-grid{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:14px}.pw-map,.pw-index{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:12px}.pw-map svg{width:100%;display:block;background:#080704;border-radius:12px}.pw-index{display:flex;flex-direction:column;gap:7px;max-height:590px;overflow:auto}.pw-index button{background:rgba(13,11,8,.55);border:1px solid var(--border);border-radius:10px;color:var(--text);padding:9px;text-align:left;cursor:pointer}.pw-index button:hover{border-color:var(--c)}.pw-index b{display:block;color:var(--c);font-family:Cinzel;font-size:.78rem}.pw-index span{font-size:.65rem;color:var(--dim)}.pw-tags{display:flex;flex-wrap:wrap;gap:6px}.pw-list{list-style:none;padding:0;margin:0}.pw-list li{font-size:.72rem;color:var(--dim);line-height:1.45;margin-bottom:5px;padding-left:12px;position:relative}.pw-list li::before{content:'▸';position:absolute;left:0;color:var(--c)}@media(max-width:780px){.pw-hero,.pw-grid{grid-template-columns:1fr}}
    .pw-card{padding:18px;max-width:640px;margin:0 auto}.pw-card-head{margin-bottom:10px}.pw-card-head h2{font-family:Cinzel;color:var(--c);font-size:1.4rem;margin:4px 0 0}.pw-hero-line{font-size:.88rem;color:var(--text);line-height:1.55;margin:0 0 16px;font-style:italic}.pw-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}.pw-chip{background:#0d0b08;border:1px solid var(--border);border-radius:10px;padding:10px 14px;flex:1;min-width:160px}.pw-chip-label{display:block;font-family:JetBrains Mono;font-size:.55rem;color:var(--c);letter-spacing:.12em;text-transform:uppercase;margin-bottom:3px}.pw-chip-val{font-size:.78rem;color:var(--text);line-height:1.4}.pw-featured{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:14px}.pw-featured-label{font-family:JetBrains Mono;font-size:.55rem;color:var(--c);letter-spacing:.12em;text-transform:uppercase;margin-bottom:4px}.pw-featured-track{font-family:Cinzel;color:var(--text);font-size:.85rem}.pw-learn{background:var(--card);border:2px solid color-mix(in srgb,var(--c),transparent 50%);border-radius:12px;padding:16px;margin-bottom:16px}.pw-learn-label{font-family:JetBrains Mono;font-size:.55rem;color:var(--c);letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px}.pw-learn p{font-size:.82rem;color:var(--text);line-height:1.6;margin:0}.pw-actions{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}.pw-actions button{background:var(--c);color:#0d0b08;border:none;border-radius:8px;padding:10px 16px;font-weight:800;cursor:pointer;font-size:.78rem}.pw-actions button:last-child{background:rgba(13,11,8,.6);color:var(--c);border:1px solid var(--border)}.pw-more-btn{display:block;width:100%;background:rgba(13,11,8,.5);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--dim);font-size:.72rem;cursor:pointer;margin-bottom:8px;letter-spacing:.06em;text-transform:uppercase;font-family:JetBrains Mono,monospace}.pw-more-btn:hover{color:var(--text);border-color:var(--c)}.pw-extra{display:none;margin-top:8px}.pw-extra.open{display:block}.pw-extra-section{margin-bottom:14px}.pw-extra-label{font-family:JetBrains Mono;font-size:.55rem;color:var(--c);letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px}.pw-extra p{font-size:.78rem;color:var(--dim);line-height:1.55;margin:0}`;
    document.head.appendChild(s);
  }
  window.PlayWorld={render,detail};
  window.showPlay=render;
  window.wmClick=detail;
})();
