// Hearth Brain — Neural Command Centre
// Ayla's improved brain SVG with anatomical detail
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
    if(!log.length)return 0;
    const days=[...new Set(log.map(x=>new Date(x.ts||x.date).toDateString()))].sort((a,b)=>new Date(b)-new Date(a));
    if(days[0]!==new Date().toDateString())return 0;
    let s=1;
    for(let i=1;i<days.length;i++){const diff=(new Date(days[i-1])-new Date(days[i]))/86400000;if(Math.round(diff)===1)s++;else break;}
    return s;
  }

  // Brain regions with anatomically correct positions on a 500x480 lateral brain SVG
  const regions=[
    {id:'motor',label:'Motor Cortex',x:230,y:130,r:18,color:'#e8a020',
     tag:'VOLUNTARY MOVEMENT',nodes:['doing','practice'],
     getStats:function(){var n=practiceLog().length;var m=practiceLog().filter(function(s){return s.feeling==='nailed'}).length;return {done:n,mastered:m,label:n+' drills · '+m+' mastered'};},
     desc:[
       "The <strong>Motor Cortex</strong> (precentral gyrus, BA4) sends voluntary movement commands via corticospinal tracts. Every chord shape and pick stroke begins here.",
       "<strong>Oligodendrocytes</strong> are wrapping guitar circuits in myelin. Each correct repetition thickens the sheath, increasing signal speed up to 100x.",
       "Movements consolidated into <strong>basal ganglia</strong> and <strong>cerebellum</strong>. Motor programs fire as single units — fingers move before conscious intent."
     ]},
    {id:'broca',label:"Broca's Area",x:175,y:235,r:14,color:'#c45a20',
     tag:'EXPRESSIVE OUTPUT',nodes:['play','create'],
     getStats:function(){return {label:'Awaiting first jam'};},
     desc:[
       "<strong>Broca's Area</strong> (BA44/45, left inferior frontal gyrus) orchestrates language production. In musicians it activates when translating musical thought into sound.",
       "Developing <strong>musical syntax</strong> — phrase structures, not individual notes. Your brain learns which combinations 'make sense' in a harmonic context.",
       "Expression integrated across Broca's, premotor cortex, and auditory feedback loops. Improvisation flows without conscious translation."
     ]},
    {id:'visual',label:'Visual Cortex',x:410,y:190,r:16,color:'#4A6741',
     tag:'PATTERN RECOGNITION',nodes:['knowing'],
     getStats:function(){var K=window.KNOWING;if(!K)return {done:0,total:0,label:'No data'};var t=0,d=0;var kp=read('hearth-knowing-progress',{});K.categories.forEach(function(c){c.topics.forEach(function(x){t++;if(kp[x.id])d++;});});return {done:d,total:t,label:d+'/'+t+' concepts read'};},
     desc:[
       "The <strong>Visual Cortex</strong> (occipital lobe, V1-V5) processes chord diagrams and notation. V1 extracts edges, V4 recognises shapes. The <strong>ventral stream</strong> identifies dot clusters as 'G major.'",
       "<strong>Neural chunking</strong> — multi-element patterns encoded as single perceptual units. A chord diagram is one shape, not 6 dots.",
       "A specialised region now recognises chord shapes and interval geometries in under 200ms. Pattern recognition is automatic."
     ]},
    {id:'auditory',label:'Auditory Cortex',x:340,y:305,r:15,color:'#2C5F7C',
     tag:'SOUND PROCESSING',nodes:['knowing','play'],
     getStats:function(){return {label:'Ear training coming soon'};},
     desc:[
       "The <strong>Auditory Cortex</strong> (superior temporal gyrus, A1) decomposes sound into frequency, timing, and spatial location. Signals flow to Wernicke's area for meaning.",
       "<strong>Relative pitch</strong> circuits forming. Interval ratios categorised as emotional qualities — 'bright,' 'dark,' 'tense,' 'resolved.'",
       "<strong>Predictive coding</strong> — your auditory cortex anticipates what comes next. Wrong notes feel wrong because they violate predictions, not rules."
     ]},
    {id:'prefrontal',label:'Prefrontal Cortex',x:130,y:155,r:16,color:'#5B3A6B',
     tag:'EXECUTIVE FUNCTION',nodes:['study'],
     getStats:function(){var q=read('hearth-knowing-quiz',{});var p=Object.values(q).filter(function(x){return x.passed}).length;return {passed:p,label:p+' quizzes passed'};},
     desc:[
       "The <strong>Prefrontal Cortex</strong> (dorsolateral PFC, BA9/46) handles metacognition. When you quiz yourself and assess genuine comprehension, your PFC monitors its own neural activity.",
       "Developing <strong>metacognitive accuracy</strong> — reliably distinguishing 'I know this' from 'I recognise this.'",
       "Metacognitive control consolidated. Self-regulated learning — your PFC allocates attention and identifies gaps autonomously."
     ]},
    {id:'hippocampus',label:'Hippocampus',x:275,y:290,r:13,color:'#8B6914',
     tag:'MEMORY CONSOLIDATION',nodes:['foundation','study','practice'],
     getStats:function(){var f=countDone(read('hearth-foundation-progress',{}));return {done:f,total:10,label:f+'/10 foundations'};},
     desc:[
       "The <strong>Hippocampus</strong> (medial temporal lobe) encodes experiences as temporary traces. During <strong>slow-wave sleep</strong>, sharp-wave ripples replay and transfer them to neocortical storage.",
       "Active consolidation via <strong>long-term potentiation</strong>. The spacing effect works because each replay strengthens synaptic connections.",
       "Procedural memories transferred to <strong>neocortical storage</strong>. Patterns are permanent — your motor cortex remembers even after months without playing."
     ]},
    {id:'limbic',label:'Limbic System',x:235,y:270,r:13,color:'#6B3A3A',
     tag:'EMOTION & REWARD',nodes:['collab'],
     getStats:function(){return {label:'Social learning coming soon'};},
     desc:[
       "The <strong>Limbic System</strong> (amygdala, nucleus accumbens, VTA) processes reward. When you nail a chord change — that rush is <strong>dopamine</strong> from VTA to nucleus accumbens.",
       "The <strong>dopamine prediction error</strong> — the gap between expected and actual reward — drives learning. Better than expected = dopamine spike = reinforcement.",
       "Music consistently activates deep limbic structures. The <strong>amygdala</strong> processes musical emotion. Playing regulates your autonomic nervous system."
     ]},
    {id:'brainstem',label:'Brainstem',x:340,y:410,r:14,color:'#5B4A3A',
     tag:'AUTONOMIC FOUNDATION',nodes:['foundation'],
     getStats:function(){var f=countDone(read('hearth-foundation-progress',{}));return {done:f,total:10,label:Math.round(f/10*100)+'% foundations'};},
     desc:[
       "The <strong>Brainstem</strong> (medulla, pons) handles posture, breathing, baseline muscle tone. Before any skilled movement, the brainstem sets the foundation.",
       "Automations stabilising. Postural control shifted from cortical to <strong>brainstem-cerebellar</strong> loops. You sit correctly without thinking.",
       "Fully automated. Posture, breathing, baseline tone run subcortically. Your entire cortex is free for musical processing."
     ]}
  ];

  const pathways=[
    {from:'brainstem',to:'motor',label:'Corticospinal tract'},
    {from:'hippocampus',to:'motor',label:'Memory-motor loop'},
    {from:'visual',to:'prefrontal',label:'Dorsal visual stream'},
    {from:'prefrontal',to:'motor',label:'Premotor planning'},
    {from:'auditory',to:'broca',label:'Arcuate fasciculus'},
    {from:'motor',to:'broca',label:'Expressive motor pathway'},
    {from:'limbic',to:'hippocampus',label:'Papez circuit'},
    {from:'hippocampus',to:'prefrontal',label:'Thalamic relay'}
  ];

  function getPhase(s){
    if(!s)return 1;
    if(s.total){var p=s.done?Math.round(s.done/s.total*100):0;if(p<34)return 1;if(p<67)return 2;return 3;}
    if(s.mastered)return s.mastered>5?3:s.mastered>2?2:1;
    return 1;
  }
  function glw(s){
    if(!s)return 0.12;
    if(s.total)return Math.max(0.12,Math.min(1,(s.done||0)/(s.total||1)));
    if(s.done)return Math.min(1,s.done/10);
    return 0.12;
  }

  function render(){
    document.querySelectorAll('.pnl').forEach(p=>p.classList.remove('on'));
    var el=document.getElementById('p-hearth');if(!el)return;el.classList.add('on');

    var pLog=practiceLog();
    var sessions=read('hearth-sessions',[]);
    var streak=calcStreak(pLog);
    var totalTime=sessions.reduce(function(a,s){return a+(s.minutes||0)},0);

    var nodeSvg='',lineSvg='',pulseSvg='';

    // Neural pathway lines
    pathways.forEach(function(pw){
      var a=regions.find(function(r){return r.id===pw.from});
      var b=regions.find(function(r){return r.id===pw.to});
      if(!a||!b)return;
      var ga=glw(a.getStats());var gb=glw(b.getStats());
      var active=ga>0.2&&gb>0.2;
      var op=active?(0.15+Math.min(ga,gb)*0.4):0.06;
      var mx=(a.x+b.x)/2;var my=(a.y+b.y)/2;
      var dx=b.x-a.x;var dy=b.y-a.y;
      var cx=mx+dy*0.12;var cy=my-dx*0.12;
      lineSvg+='<path d="M'+a.x+','+a.y+' Q'+cx+','+cy+' '+b.x+','+b.y+'" fill="none" stroke="'+(active?'#e8a020':'#2a2218')+'" stroke-width="'+(active?1.2:0.5)+'" stroke-opacity="'+op+'" stroke-dasharray="'+(active?'none':'3,5')+'" style="transition:all 0.8s"/>';
      if(active){
        lineSvg+='<path d="M'+a.x+','+a.y+' Q'+cx+','+cy+' '+b.x+','+b.y+'" fill="none" stroke="#e8a020" stroke-width="3" stroke-opacity="0.06"/>';
      }
    });

    // Nodes
    regions.forEach(function(rg){
      var s=rg.getStats();var g=glw(s);
      nodeSvg+='<circle cx="'+rg.x+'" cy="'+rg.y+'" r="'+(rg.r*2.5)+'" fill="'+rg.color+'" fill-opacity="'+(g*0.06)+'" style="transition:all 0.8s"/>';
      nodeSvg+='<circle cx="'+rg.x+'" cy="'+rg.y+'" r="'+(rg.r*1.6)+'" fill="'+rg.color+'" fill-opacity="'+(g*0.12)+'" style="transition:all 0.8s"/>';
      nodeSvg+='<circle cx="'+rg.x+'" cy="'+rg.y+'" r="'+rg.r+'" fill="'+rg.color+'" fill-opacity="'+(0.1+g*0.5)+'" stroke="'+rg.color+'" stroke-width="'+(0.5+g*1.5)+'" stroke-opacity="'+(0.25+g*0.5)+'" style="cursor:pointer;transition:all 0.5s" onclick="HearthBrain.openRegion(\''+rg.id+'\')"/>';
      nodeSvg+='<circle cx="'+rg.x+'" cy="'+rg.y+'" r="'+(rg.r*0.3)+'" fill="#fff" fill-opacity="'+(0.06+g*0.4)+'" style="pointer-events:none;transition:all 0.5s"/>';
      nodeSvg+='<text x="'+rg.x+'" y="'+(rg.y+rg.r+14)+'" text-anchor="middle" fill="'+rg.color+'" fill-opacity="'+(0.4+g*0.5)+'" font-family="JetBrains Mono,monospace" font-size="8" font-weight="500" letter-spacing="0.5" style="pointer-events:none;transition:all 0.5s">'+esc(rg.label)+'</text>';
      if(g>0.25){
        pulseSvg+='<circle cx="'+rg.x+'" cy="'+rg.y+'" r="'+rg.r+'" fill="none" stroke="'+rg.color+'" stroke-width="0.8" stroke-opacity="0.2"><animate attributeName="r" from="'+rg.r+'" to="'+(rg.r*2.5)+'" dur="4s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" from="0.2" to="0" dur="4s" repeatCount="indefinite"/></circle>';
      }
    });

    el.innerHTML='<div style="padding:16px;max-width:680px;margin:0 auto">'+
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">'+
        '<div style="display:flex;align-items:center;gap:8px">'+
          '<div><div style="font-family:Cinzel,serif;color:var(--gold);font-size:0.9rem;letter-spacing:2px">NEURAL MAP</div>'+
          '<div style="font-size:0.55rem;color:var(--dim)">Your brain on guitar. Tap a region.</div></div>'+
        '</div>'+
        '<div style="display:flex;gap:10px;align-items:center">'+
          '<div style="text-align:center"><div style="font-family:JetBrains Mono;font-size:0.8rem;color:var(--gold);font-weight:700">'+streak+'</div><div style="font-size:0.4rem;color:var(--dim);letter-spacing:1px">STREAK</div></div>'+
          '<div style="text-align:center"><div style="font-family:JetBrains Mono;font-size:0.8rem;color:var(--amber);font-weight:700">'+totalTime+'m</div><div style="font-size:0.4rem;color:var(--dim);letter-spacing:1px">TOTAL</div></div>'+
          '<button onclick="backToMap()" style="background:none;border:1px solid var(--border);color:var(--dim);padding:4px 10px;border-radius:4px;cursor:pointer;font-family:inherit;font-size:0.6rem">← Map</button>'+
        '</div>'+
      '</div>'+
      '<div style="position:relative;background:#080704;border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:10px">'+
        '<svg viewBox="0 0 500 480" preserveAspectRatio="xMidYMid meet" style="width:100%;display:block" xmlns="http://www.w3.org/2000/svg">'+
          // Cerebrum outer contour
          '<path d="M100,240 C95,200 100,160 115,130 C130,100 155,80 190,68 C220,58 255,52 285,55 C315,58 345,70 370,90 C395,110 415,140 425,175 C435,205 438,235 430,260 C425,280 415,300 400,315 C385,330 360,340 335,345 C310,350 280,355 255,355 C230,355 205,348 185,338 C165,328 148,312 135,295 C120,275 108,260 100,240" fill="#0d0b08" fill-opacity="0.6" stroke="#e8a020" stroke-width="1" stroke-opacity="0.2"/>'+
          // Central sulcus
          '<path d="M245,62 C250,100 248,140 240,180 C235,210 230,240 228,270" fill="none" stroke="#e8a020" stroke-width="0.5" stroke-opacity="0.15" stroke-dasharray="3,4"/>'+
          // Lateral fissure
          '<path d="M105,230 C140,225 180,222 220,225 C260,228 300,235 340,250" fill="none" stroke="#e8a020" stroke-width="0.5" stroke-opacity="0.15" stroke-dasharray="3,4"/>'+
          // Cerebellum
          '<path d="M355,330 C370,320 390,318 405,325 C420,332 430,345 432,360 C434,375 428,390 415,398 C400,406 380,408 365,402 C350,396 340,385 338,370 C336,355 342,340 355,330" fill="#0d0b08" fill-opacity="0.4" stroke="#e8a020" stroke-width="0.8" stroke-opacity="0.15"/>'+
          // Brainstem
          '<path d="M320,370 C325,385 330,400 335,420 C340,435 345,450 350,460 C345,465 335,465 330,460 C325,450 320,435 318,420 C315,405 315,385 320,370" fill="#0d0b08" fill-opacity="0.3" stroke="#e8a020" stroke-width="0.6" stroke-opacity="0.12"/>'+
          // Lobe labels
          '<text x="170" y="150" fill="#e8a020" fill-opacity="0.08" font-family="Cinzel,serif" font-size="14" letter-spacing="3" style="pointer-events:none">FRONTAL</text>'+
          '<text x="310" y="120" fill="#e8a020" fill-opacity="0.08" font-family="Cinzel,serif" font-size="12" letter-spacing="3" style="pointer-events:none">PARIETAL</text>'+
          '<text x="400" y="220" fill="#e8a020" fill-opacity="0.08" font-family="Cinzel,serif" font-size="10" letter-spacing="2" style="pointer-events:none" transform="rotate(70,400,220)">OCCIPITAL</text>'+
          '<text x="200" y="310" fill="#e8a020" fill-opacity="0.08" font-family="Cinzel,serif" font-size="10" letter-spacing="2" style="pointer-events:none">TEMPORAL</text>'+
          '<text x="365" y="380" fill="#e8a020" fill-opacity="0.06" font-family="Cinzel,serif" font-size="7" letter-spacing="1" style="pointer-events:none">CEREBELLUM</text>'+
          lineSvg+pulseSvg+nodeSvg+
        '</svg>'+
        '<div style="font-family:JetBrains Mono;font-size:0.4rem;color:var(--dim);text-align:center;padding:3px;letter-spacing:1.5px;opacity:0.35">LATERAL VIEW · TAP A REGION</div>'+
      '</div>'+
      '<div id="brain-overlay" style="display:none"></div>'+
    '</div>';

    window._brainRegions=regions;
    window._brainPathways=pathways;
    window._getPhase=getPhase;
    window._glw=glw;
  }

  function openRegion(id){
    var rg=regions.find(function(r){return r.id===id});if(!rg)return;
    var s=rg.getStats();var g=glw(s);var ph=getPhase(s);
    var desc=rg.desc[Math.min(ph-1,rg.desc.length-1)];
    var ov=document.getElementById('brain-overlay');if(!ov)return;
    var paths=pathways.filter(function(p){return p.from===id||p.to===id});

    ov.style.display='block';
    ov.innerHTML='<div style="background:var(--card);border:1px solid '+rg.color+'30;border-radius:10px;padding:18px;margin-bottom:10px;animation:fadeIn 0.3s ease">'+
      '<button onclick="document.getElementById(\'brain-overlay\').style.display=\'none\'" style="float:right;background:none;border:none;color:var(--dim);font-size:1rem;cursor:pointer">✕</button>'+
      '<div style="font-family:JetBrains Mono;font-size:0.45rem;color:'+rg.color+';letter-spacing:0.15em;margin-bottom:3px">'+esc(rg.tag)+'</div>'+
      '<div style="font-family:Cinzel,serif;font-size:0.95rem;color:'+rg.color+';font-weight:600;margin-bottom:10px;letter-spacing:1px">'+esc(rg.label)+'</div>'+
      '<div style="display:flex;align-items:center;gap:6px;margin-bottom:12px">'+
        '<span style="font-family:JetBrains Mono;font-size:0.45rem;color:var(--dim);letter-spacing:1px">SIGNAL</span>'+
        '<div style="flex:1;height:3px;background:var(--border);border-radius:2px;overflow:hidden">'+
          '<div style="height:100%;width:'+Math.round(g*100)+'%;background:'+rg.color+';border-radius:2px;transition:width 0.5s"></div>'+
        '</div>'+
        '<span style="font-family:JetBrains Mono;font-size:0.5rem;color:var(--dim)">'+Math.round(g*100)+'%</span>'+
      '</div>'+
      '<div style="font-family:DM Sans,sans-serif;font-size:0.75rem;color:var(--text);line-height:1.75;margin-bottom:12px">'+desc+'</div>'+
      '<div style="display:flex;gap:4px;margin-bottom:12px">'+
        '<div style="padding:2px 6px;border-radius:3px;font-family:JetBrains Mono;font-size:0.45rem;letter-spacing:1px;'+(ph>=1?'background:'+rg.color+'15;color:'+rg.color+';border:1px solid '+rg.color+'20':'border:1px solid var(--border);color:var(--dim)')+'">DEVELOPING</div>'+
        '<div style="padding:2px 6px;border-radius:3px;font-family:JetBrains Mono;font-size:0.45rem;letter-spacing:1px;'+(ph>=2?'background:'+rg.color+'15;color:'+rg.color+';border:1px solid '+rg.color+'20':'border:1px solid var(--border);color:var(--dim)')+'">MYELINATING</div>'+
        '<div style="padding:2px 6px;border-radius:3px;font-family:JetBrains Mono;font-size:0.45rem;letter-spacing:1px;'+(ph>=3?'background:'+rg.color+'15;color:'+rg.color+';border:1px solid '+rg.color+'20':'border:1px solid var(--border);color:var(--dim)')+'">CONSOLIDATED</div>'+
      '</div>'+
      '<div style="background:var(--bg);border:1px solid var(--border);border-radius:5px;padding:8px 10px;margin-bottom:8px">'+
        '<div style="font-family:JetBrains Mono;font-size:0.45rem;color:'+rg.color+';letter-spacing:0.1em;margin-bottom:4px">DATA</div>'+
        '<div style="font-family:DM Sans,sans-serif;font-size:0.7rem;color:var(--text)">'+esc(s.label)+'</div>'+
      '</div>'+
      (paths.length?'<div style="font-family:JetBrains Mono;font-size:0.45rem;color:var(--dim);letter-spacing:0.1em;margin-bottom:5px">NEURAL TRACTS</div>'+
      '<div style="display:flex;flex-wrap:wrap;gap:3px">'+paths.map(function(c){
        return '<span style="font-family:DM Sans,sans-serif;font-size:0.55rem;color:var(--dim);background:var(--bg);border:1px solid var(--border);padding:2px 6px;border-radius:3px">'+esc(c.label)+'</span>';
      }).join('')+'</div>':'')+
      '<div style="display:flex;gap:5px;margin-top:10px">'+
        rg.nodes.map(function(n){var nd=window.NODE_DATA&&NODE_DATA[n];return nd?'<button onclick="document.getElementById(\'brain-overlay\').style.display=\'none\';enterNodeAction(NODE_DATA[\''+n+'\'])" style="background:'+rg.color+'10;border:1px solid '+rg.color+'20;color:'+rg.color+';padding:6px 10px;border-radius:5px;cursor:pointer;font-family:DM Sans,sans-serif;font-size:0.65rem;font-weight:500">'+esc(nd.title)+'</button>':'';}).join('')+
      '</div>'+
    '</div>';
  }

  window.HearthBrain={render:render,openRegion:openRegion};
  window.showHearth=render;
})();
