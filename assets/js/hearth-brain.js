// Hearth Brain — Neural Command Centre
// Loads brain-map.svg and adds interactivity + dynamic progress
(function(){
  const GOLD='#d4af69', AMBER='#e8a020';
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function read(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}}
  function countDone(obj){return Object.keys(obj||{}).filter(k=>obj[k]).length;}
  function practiceLog(){return read('hearth-practice-log',[])}
  function practiceNotes(){return read('hearth-practice-notes',[])}
  function calcStreak(log){
    if(!log.length)return 0;
    const days=[...new Set(log.map(x=>new Date(x.ts||x.date).toDateString()))].sort((a,b)=>new Date(b)-new Date(a));
    if(days[0]!==new Date().toDateString())return 0;
    let s=1;
    for(let i=1;i<days.length;i++){const diff=(new Date(days[i-1])-new Date(days[i]))/86400000;if(Math.round(diff)===1)s++;else break;}
    return s;
  }

  // Skill categories mapped to simulator nodes + progress data
  const skills=[
    {id:'ear-training',label:'Ear Training',color:'#8d5cff',nodes:['knowing','play'],
     getStats:function(){var K=window.KNOWING;if(!K)return{done:0,total:0,label:'No data'};var t=0,d=0;var kp=read('hearth-knowing-progress',{});K.categories.forEach(function(c){c.topics.forEach(function(x){t++;if(kp[x.id])d++;});});return{done:d,total:t,label:d+'/'+t+' concepts read'};},
     desc:'Sharpen your listening and note recognition.',
     guide:'Train your ear through the Knowing path. Start with intervals, then scales, then chord qualities.'},
    {id:'rhythm',label:'Rhythm',color:'#4da3ff',nodes:['doing'],
     getStats:function(){var D=window.DOING;if(!D)return{done:0,total:0,label:'No data'};var cat=D.categories.find(function(c){return c.id==='rhythm'});if(!cat)return{done:0,total:0,label:'No rhythm drills'};var dp=read('hearth-doing-progress',{});var d=cat.drills.filter(function(x){return dp[x.id]}).length;return{done:d,total:cat.drills.length,label:d+'/'+cat.drills.length+' rhythm drills'};},
     desc:'Build timing, groove and rhythmic control.',
     guide:'Open Doing → Rhythm. Start with 16th note subdivisions and the basic strum pattern.'},
    {id:'technique',label:'Technique',color:'#4da3ff',nodes:['doing'],
     getStats:function(){var D=window.DOING;if(!D)return{done:0,total:0,label:'No data'};var cats=['picking','fretting','speed'];var d=0,t=0;var dp=read('hearth-doing-progress',{});D.categories.forEach(function(c){if(cats.indexOf(c.id)!==-1){c.drills.forEach(function(x){t++;if(dp[x.id])d++;});}});return{done:d,total:t,label:d+'/'+t+' technique drills'};},
     desc:'Develop strength, coordination and fretboard mastery.',
     guide:'Open Doing → Picking or Fretting. Start with alternate picking and the chromatic exercise.'},
    {id:'theory',label:'Theory',color:'#8d5cff',nodes:['knowing'],
     getStats:function(){var K=window.KNOWING;if(!K)return{done:0,total:0,label:'No data'};var t=0,d=0;var kp=read('hearth-knowing-progress',{});K.categories.forEach(function(c){c.topics.forEach(function(x){t++;if(kp[x.id])d++;});});return{done:d,total:t,label:d+'/'+t+' theory topics'};},
     desc:'Understand the language that powers the music.',
     guide:'Open Knowing. Start with Rhythm (time signatures) and Notes & Intervals.'},
    {id:'improvisation',label:'Improvisation',color:'#2fffe6',nodes:['play','create'],
     getStats:function(){return{label:'Start playing to unlock'};},
     desc:'Explore, create and express your musical ideas.',
     guide:'Open Play to explore world guitar traditions. Open Create when you\'re ready to write.'},
    {id:'chords',label:'Chords',color:'#d9f45a',nodes:['knowing','doing'],
     getStats:function(){var K=window.KNOWING;if(!K)return{done:0,total:0,label:'No data'};var cat=K.categories.find(function(c){return c.id==='chords'});if(!cat)return{done:0,total:0,label:'No chord data'};var kp=read('hearth-knowing-progress',{});var d=cat.topics.filter(function(x){return kp[x.id]}).length;return{done:d,total:cat.topics.length,label:d+'/'+cat.topics.length+' chord topics'};},
     desc:'Learn shapes, voicings and progressions.',
     guide:'Open Knowing → Chords. Start with basic open chords, then move to barre chords.'},
    {id:'song-learning',label:'Song Learning',color:'#ff9d2e',nodes:['play'],
     getStats:function(){return{label:'Explore the world map'};},
     desc:'Apply your skills to real songs you love.',
     guide:'Open Play and click a region on the world map. Each tradition has songs to learn.'},
    {id:'performance',label:'Performance',color:'#ff654d',nodes:['mastery'],
     getStats:function(){var p=practiceLog();var nailed=p.filter(function(x){return x.feeling==='nailed'}).length;return{done:nailed,label:nailed+' strong finishes'};},
     desc:'Build confidence and own the stage.',
     guide:'Complete practice sessions and log your feelings. "Nailed it" moments build performance confidence.'},
    {id:'mastery',label:'Mastery',color:'#e8a020',nodes:['mastery'],
     getStats:function(){return{label:'The journey continues'};},
     desc:'The student becomes the artist.',
     guide:'Mastery isn\'t a destination — it\'s the habit of returning. Keep practising, keep creating.'}
  ];

  function getProgress(skill){
    var s=skill.getStats();
    if(s.total) return Math.round((s.done||0)/s.total*100);
    if(s.done) return Math.min(100, s.done*10);
    return 15; // default glow
  }

  async function render(){
    document.querySelectorAll('.pnl').forEach(p=>p.classList.remove('on'));
    var el=document.getElementById('p-hearth');if(!el)return;el.classList.add('on');

    var pLog=practiceLog();
    var sessions=read('hearth-sessions',[]);
    var streak=calcStreak(pLog);
    var totalTime=sessions.reduce(function(a,s){return a+(s.minutes||0)},0);

    // Load SVG file
    try{
      var resp=await fetch('assets/svg/brain-map.svg');
      var svgText=await resp.text();

      el.innerHTML='<div style="padding:16px;max-width:1200px;margin:0 auto">'+
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">'+
          '<div>'+
            '<div style="font-family:Cinzel,serif;color:var(--gold);font-size:0.9rem;letter-spacing:2px">NEURAL MAP</div>'+
            '<div style="font-size:0.55rem;color:var(--dim)">Your brain on guitar. Tap a skill region.</div>'+
          '</div>'+
          '<div style="display:flex;gap:12px;align-items:center">'+
            '<div style="text-align:center"><div style="font-family:JetBrains Mono;font-size:0.85rem;color:var(--gold);font-weight:700">'+streak+'</div><div style="font-size:0.4rem;color:var(--dim);letter-spacing:1px">STREAK</div></div>'+
            '<div style="text-align:center"><div style="font-family:JetBrains Mono;font-size:0.85rem;color:var(--amber);font-weight:700">'+totalTime+'m</div><div style="font-size:0.4rem;color:var(--dim);letter-spacing:1px">TOTAL</div></div>'+
            '<div style="text-align:center"><div style="font-family:JetBrains Mono;font-size:0.85rem;color:var(--text);font-weight:700">'+practiceNotes().length+'</div><div style="font-size:0.4rem;color:var(--dim);letter-spacing:1px">NOTES</div></div>'+
            '<button onclick="backToMap()" style="background:none;border:1px solid var(--border);color:var(--dim);padding:4px 12px;border-radius:4px;cursor:pointer;font-family:inherit;font-size:0.6rem">← Map</button>'+
          '</div>'+
        '</div>'+
        '<div style="position:relative;background:#080704;border:1px solid var(--border);border-radius:12px;overflow:hidden">'+
          '<div id="brain-svg-container">'+svgText+'</div>'+
          '<div id="brain-overlay" style="display:none;position:absolute;top:0;right:0;width:340px;max-height:100%;overflow-y:auto;padding:16px;box-sizing:border-box"></div>'+
          '<div style="font-family:JetBrains Mono;font-size:0.4rem;color:var(--dim);text-align:center;padding:4px;letter-spacing:1.5px;opacity:0.35">TAP A SKILL REGION TO EXPLORE</div>'+
        '</div>'+
      '</div>';

      // Make skill nodes interactive
      attachSkillHandlers();
    }catch(e){
      el.innerHTML='<div style="padding:40px;text-align:center;color:var(--dim)">Brain map loading... <br><small>'+esc(e.message)+'</small></div>';
    }
  }

  function attachSkillHandlers(){
    var svg=document.querySelector('#brain-svg-container svg');
    if(!svg)return;

    // Find all g elements with skill node groups (they have circle.icon-circle)
    var nodeGroups=svg.querySelectorAll('g > g');
    nodeGroups.forEach(function(g){
      var circle=g.querySelector('.icon-circle');
      if(!circle)return;
      // Make it clickable
      g.style.cursor='pointer';
      g.addEventListener('click',function(e){
        e.stopPropagation();
        // Find which skill this is by position
        var transform=g.getAttribute('transform');
        if(!transform)return;
        var match=transform.match(/translate\((\d+)\s+(\d+)\)/);
        if(!match)return;
        var x=parseInt(match[1]), y=parseInt(match[2]);
        var skill=skills.find(function(s){
          // Match by approximate position
          var pos=getSkillPos(s.id);
          return Math.abs(pos.x-x)<50 && Math.abs(pos.y-y)<50;
        });
        if(skill) showSkillDetail(skill);
      });
      // Hover effect
      g.addEventListener('mouseenter',function(){g.style.opacity='0.85';});
      g.addEventListener('mouseleave',function(){g.style.opacity='';});
    });
  }

  function getSkillPos(id){
    var positions={
      'ear-training':{x:250,y:170},
      'technique':{x:515,y:200},
      'rhythm':{x:602,y:235},
      'theory':{x:400,y:380},
      'improvisation':{x:465,y:545},
      'chords':{x:1190,y:420},
      'song-learning':{x:895,y:560},
      'performance':{x:605,y:670},
      'mastery':{x:800,y:795}
    };
    return positions[id]||{x:800,y:475};
  }

  function showSkillDetail(skill){
    var ov=document.getElementById('brain-overlay');if(!ov)return;
    var stats=skill.getStats();
    var progress=getProgress(skill);

    ov.style.display='block';
    ov.innerHTML='<div style="background:var(--card);border:1px solid '+skill.color+'40;border-radius:12px;padding:18px;animation:fadeIn 0.3s ease">'+
      '<button onclick="document.getElementById(\'brain-overlay\').style.display=\'none\'" style="float:right;background:none;border:none;color:var(--dim);font-size:1.1rem;cursor:pointer">✕</button>'+
      '<div style="font-family:Cinzel,serif;font-size:1rem;color:'+skill.color+';font-weight:600;margin-bottom:8px;letter-spacing:1px">'+esc(skill.label)+'</div>'+
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">'+
        '<div style="flex:1;height:4px;background:var(--border);border-radius:2px;overflow:hidden">'+
          '<div style="height:100%;width:'+progress+'%;background:'+skill.color+';border-radius:2px;transition:width 0.5s"></div>'+
        '</div>'+
        '<span style="font-family:JetBrains Mono;font-size:0.6rem;color:var(--dim)">'+progress+'%</span>'+
      '</div>'+
      '<div style="font-family:DM Sans,sans-serif;font-size:0.8rem;color:var(--text);line-height:1.6;margin-bottom:14px">'+esc(skill.desc)+'</div>'+
      '<div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-bottom:14px">'+
        '<div style="font-family:JetBrains Mono;font-size:0.5rem;color:'+skill.color+';letter-spacing:0.1em;margin-bottom:4px">DATA</div>'+
        '<div style="font-family:DM Sans,sans-serif;font-size:0.72rem;color:var(--text)">'+esc(stats.label)+'</div>'+
      '</div>'+
      '<div style="background:rgba(212,175,105,0.06);border:1px solid rgba(212,175,105,0.15);border-radius:8px;padding:10px 12px;margin-bottom:14px">'+
        '<div style="font-family:JetBrains Mono;font-size:0.5rem;color:var(--gold);letter-spacing:0.1em;margin-bottom:4px">GUIDE</div>'+
        '<div style="font-family:DM Sans,sans-serif;font-size:0.72rem;color:var(--text);line-height:1.5">'+esc(skill.guide)+'</div>'+
      '</div>'+
      '<div style="display:flex;gap:6px;flex-wrap:wrap">'+
        skill.nodes.map(function(n){
          var nd=window.NODE_DATA&&NODE_DATA[n];
          return nd?'<button onclick="document.getElementById(\'brain-overlay\').style.display=\'none\';enterNodeAction(NODE_DATA[\''+n+'\'])" style="background:'+skill.color+'15;border:1px solid '+skill.color+'30;color:'+skill.color+';padding:7px 14px;border-radius:6px;cursor:pointer;font-family:DM Sans,sans-serif;font-size:0.7rem;font-weight:600;transition:all 0.15s">'+esc(nd.title)+'</button>':'';
        }).join('')+
      '</div>'+
    '</div>';
  }

  window.HearthBrain={render:render,openRegion:showSkillDetail};
  window.showHearth=render;
})();
