// PDF Viewer — opens book references in a modal overlay
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}

  function inject(){
    if(document.getElementById('pdf-viewer-style'))return;
    const s=document.createElement('style');s.id='pdf-viewer-style';s.textContent=`
      .pdf-overlay{position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:9999;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:.25s}
      .pdf-overlay.open{opacity:1;pointer-events:auto}
      .pdf-modal{background:#111;border:1px solid var(--border);border-radius:16px;width:min(92vw,1100px);height:min(88vh,800px);display:flex;flex-direction:column;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.5)}
      .pdf-bar{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:var(--card);border-bottom:1px solid var(--border)}
      .pdf-bar h3{font-family:Cinzel;color:var(--gold);font-size:.9rem;margin:0}
      .pdf-bar small{font-size:.65rem;color:var(--dim)}
      .pdf-bar button{background:transparent;color:var(--dim);border:1px solid var(--border);border-radius:8px;padding:6px 12px;cursor:pointer;font-size:.75rem}
      .pdf-bar button:hover{color:var(--text);border-color:var(--gold)}
      .pdf-body{flex:1;position:relative;background:#0d0b08}
      .pdf-body iframe{width:100%;height:100%;border:none}
      .pdf-body .pdf-placeholder{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--dim);font-size:.85rem;gap:10px}
      .pdf-body .pdf-placeholder a{color:var(--gold);text-decoration:none;border:1px solid var(--gold);border-radius:8px;padding:8px 14px;font-size:.75rem}
      .pdf-ref-link{color:var(--gold);cursor:pointer;text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px}
      .pdf-ref-link:hover{color:var(--amber)}
    `;
    document.head.appendChild(s);
    if(!document.getElementById('pdf-overlay')){
      const o=document.createElement('div');o.id='pdf-overlay';o.className='pdf-overlay';
      o.innerHTML='<div class="pdf-modal"><div class="pdf-bar"><div><h3 id="pdf-title">Reference</h3><small id="pdf-meta"></small></div><div style="display:flex;gap:8px"><button id="pdf-open-tab" onclick="PDFViewer.openExternal()">Open in Tab</button><button onclick="PDFViewer.close()">Close</button></div></div><div class="pdf-body" id="pdf-body"></div></div>';
      o.addEventListener('click',e=>{if(e.target===o)PDFViewer.close()});
      document.body.appendChild(o);
    }
  }

  function renderPage(pdfUrl, pageStart, pageEnd, title, author){
    inject();
    const overlay=document.getElementById('pdf-overlay');
    const body=document.getElementById('pdf-body');
    document.getElementById('pdf-title').textContent=title||'Reference';
    document.getElementById('pdf-meta').textContent=(author||'') + (pageStart ? (pageStart===pageEnd ? ' · p.'+pageStart : ' · pp.'+pageStart+'-'+pageEnd) : '');

    if(pdfUrl){
      // Embed PDF with page parameter
      const pageParam = pageStart ? '#page='+pageStart : '';
      body.innerHTML='<iframe src="'+esc(pdfUrl+pageParam)+'" allowfullscreen></iframe>';
    } else {
      body.innerHTML='<div class="pdf-placeholder"><div style="font-size:3rem;opacity:.4">📖</div><div>No PDF linked yet</div><div style="font-size:.7rem;max-width:300px;text-align:center">Add a PDF URL in the admin panel to open the actual book page here.</div><button onclick="PDFViewer.close()" style="background:var(--gold);color:#0d0b08;border:none;border-radius:8px;padding:8px 14px;cursor:pointer;margin-top:8px">Close</button></div>';
    }

    overlay.classList.add('open');
    document.addEventListener('keydown',escListener);
  }

  function escListener(e){if(e.key==='Escape')PDFViewer.close();}

  function close(){
    const overlay=document.getElementById('pdf-overlay');
    if(overlay) overlay.classList.remove('open');
    document.removeEventListener('keydown',escListener);
  }

  function openExternal(){
    const iframe=document.querySelector('#pdf-body iframe');
    if(iframe) window.open(iframe.src.replace(/#page=\d+/,''),'hearth-pdf');
  }

  // Create a clickable ref link element
  function refLink(ref){
    const span=document.createElement('span');
    span.className='pdf-ref-link';
    span.textContent = ref.source_title + (ref.page_start ? ' p.'+ref.page_start : '');
    span.title = (ref.author||'') + (ref.chapter ? ' · '+ref.chapter : '') + (ref.section ? ' · '+ref.section : '');
    span.onclick=function(){ renderPage(ref.pdf_url, ref.page_start, ref.page_end, ref.source_title, ref.author); };
    return span;
  }

  // Render refs for a topic/drill as a small citation block
  function refsBlock(refs, title){
    if(!refs||!refs.length) return '';
    return '<div style="margin-top:12px;padding:10px;background:rgba(212,175,105,.06);border:1px solid var(--border);border-radius:10px">' +
      '<div style="font-family:JetBrains Mono;font-size:.55rem;color:var(--gold);letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px">References</div>' +
      '<div style="display:flex;flex-direction:column;gap:6px">' +
      refs.map(r => {
        const pages = r.page_start ? (r.page_start===r.page_end ? 'p.'+r.page_start : 'pp.'+r.page_start+'-'+r.page_end) : '';
        const chapter = r.chapter ? ' · '+r.chapter : '';
        const section = r.section ? ': '+r.section : '';
        return '<div class="pdf-ref-link" onclick="PDFViewer.openRef('+r.id+')" style="cursor:pointer;font-size:.72rem">' +
          esc(r.source_title) + (r.author ? ' — '+esc(r.author) : '') + ' ' + pages + chapter + section +
          '</div>';
      }).join('') +
      '</div></div>';
  }

  // Fetch refs from API and open
  async function openRef(id){
    try{
      const refs = await HearthAPI.getRefs();
      const ref = (refs||[]).find(r=>r.id===id);
      if(ref) renderPage(ref.pdf_url, ref.page_start, ref.page_end, ref.source_title, ref.author);
    }catch(e){}
  }

  // Fetch refs for a topic and render inline
  async function renderTopicRefs(topicId, containerId){
    try{
      const refs = await HearthAPI.getRefs(topicId);
      const el = document.getElementById(containerId);
      if(el && refs && refs.length) el.innerHTML = refsBlock(refs);
    }catch(e){}
  }

  window.PDFViewer = {
    renderPage,
    close,
    openExternal,
    refLink,
    refsBlock,
    openRef,
    renderTopicRefs
  };

  // Keyboard shortcut: Escape to close
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape' && document.getElementById('pdf-overlay')?.classList.contains('open')) PDFViewer.close();
  });
})();
