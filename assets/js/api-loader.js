// API Data Loader — pulls content from Hearth API with fallback to hardcoded JS
(async function(){
  const FALLBACK_TIMEOUT = 5000;

  async function withTimeout(promise, ms){
    return Promise.race([promise, new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),ms))]);
  }

  // ─── KNOWING: topics from API ───
  async function loadKnowingFromAPI(){
    try{
      const topics = await withTimeout(HearthAPI.getTopics(), FALLBACK_TIMEOUT);
      if(!topics || !topics.length) return null;
      // Group by category
      const cats = {};
      topics.forEach(t => {
        if(!cats[t.category]) cats[t.category] = { id:t.category, title:t.category.charAt(0).toUpperCase()+t.category.slice(1), topics:[] };
        cats[t.category].topics.push({
          id: t.key_name,
          title: t.title,
          body: t.body || '',
          difficulty: t.difficulty || 1,
          source: t.source || '',
          video: t.video_url || '',
          level: t.level_num || 1
        });
      });
      return { categories: Object.values(cats) };
    }catch(e){ return null; }
  }

  // ─── DOING: drills from API ───
  async function loadDoingFromAPI(){
    try{
      const drills = await withTimeout(HearthAPI.getDrills(), FALLBACK_TIMEOUT);
      if(!drills || !drills.length) return null;
      const cats = {};
      drills.forEach(d => {
        const cat = d.category || 'Technique';
        if(!cats[cat]) cats[cat] = { id:cat, title:cat, drills:[] };
        cats[cat].drills.push({
          id: d.key_name,
          title: d.title,
          category: d.category,
          style: d.style || '',
          difficulty: d.difficulty || 1,
          level: d.level_num || 1,
          string: d.string_num || 0,
          fret: d.fret_num || 0,
          defaultBpm: d.bpm_default || 60,
          duration: d.duration || '5 min',
          description: d.description || '',
          instructions: d.instructions || '',
          source: d.source || ''
        });
      });
      return { categories: Object.values(cats), drills: drills.map(d=>({
        id:d.key_name, title:d.title, category:d.category, style:d.style||'', difficulty:d.difficulty||1,
        level:d.level_num||1, string:d.string_num||0, fret:d.fret_num||0, defaultBpm:d.bpm_default||60,
        duration:d.duration||'5 min', description:d.description||'', instructions:d.instructions||'', source:d.source||''
      }))};
    }catch(e){ return null; }
  }

  // ─── PRACTICE: drills from API (filtered) ───
  async function loadPracticeFromAPI(){
    try{
      const drills = await withTimeout(HearthAPI.getDrills(), FALLBACK_TIMEOUT);
      if(!drills || !drills.length) return null;
      return { drills: drills.map(d=>({
        id:d.key_name, title:d.title, category:d.category, difficulty:d.difficulty||1,
        defaultBpm:d.bpm_default||60, duration:d.duration||'5 min',
        description:d.description||'', instructions:d.instructions||''
      }))};
    }catch(e){ return null; }
  }

  // ─── BOOKS: from API ───
  async function loadBooksFromAPI(){
    try{
      const books = await withTimeout(HearthAPI.getBooks(), FALLBACK_TIMEOUT);
      return books && books.length ? books : null;
    }catch(e){ return null; }
  }

  // ─── REFERENCES: for a topic ───
  async function loadRefsForTopic(topicId){
    try{
      const refs = await withTimeout(HearthAPI.getRefs(topicId), FALLBACK_TIMEOUT);
      return refs && refs.length ? refs : [];
    }catch(e){ return []; }
  }

  // ─── Apply API data to window globals ───
  async function init(){
    // Try loading from API, keep hardcoded as fallback
    const [apiKnowing, apiDoing, apiPractice, apiBooks] = await Promise.all([
      loadKnowingFromAPI(),
      loadDoingFromAPI(),
      loadPracticeFromAPI(),
      loadBooksFromAPI()
    ]);

    // Knowing: API overrides if available
    if(apiKnowing && window.KNOWING){
      const apiCount = apiKnowing.categories.reduce((s,c)=>s+c.topics.length,0);
      const localCount = window.KNOWING.categories.reduce((s,c)=>s+c.topics.length,0);
      if(apiCount >= localCount){
        window.KNOWING = apiKnowing;
        console.log('Knowing: loaded',apiCount,'topics from API');
      }
    }

    // Doing: API overrides if available
    if(apiDoing && window.DOING){
      const apiCount = apiDoing.drills.length;
      const localCount = window.DOING.drills ? window.DOING.drills.length : 0;
      if(apiCount >= localCount){
        window.DOING = apiDoing;
        console.log('Doing: loaded',apiCount,'drills from API');
      }
    }

    // Practice: API overrides if available
    if(apiPractice && window.PRACTICE){
      const apiCount = apiPractice.drills.length;
      const localCount = window.PRACTICE.drills ? window.PRACTICE.drills.length : 0;
      if(apiCount >= localCount){
        window.PRACTICE = apiPractice;
        console.log('Practice: loaded',apiCount,'drills from API');
      }
    }

    // Books: store separately for reference viewer
    if(apiBooks){
      window.HEARTH_BOOKS = apiBooks;
      console.log('Books: loaded',apiBooks.length,'from API');
    }

    // Mark API as ready
    window.HearthAPIReady = true;
    document.dispatchEvent(new CustomEvent('hearth-api-ready'));
  }

  // Start loading
  if(window.HearthAPI){
    init().catch(e=>console.warn('API load failed, using local data'));
  }
})();
