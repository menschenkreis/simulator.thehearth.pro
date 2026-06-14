// Hearth API Client — pulls content from thehearth.pro database
// Falls back to hardcoded JS data if API is unavailable
(function(){
  const API = 'https://thehearth.pro/api/';

  const cache = {};
  const pending = {};

  async function fetchJSON(action, params) {
    const qs = new URLSearchParams(params||{}).toString();
    const url = API + '?a=' + action + (qs ? '&' + qs : '');
    const key = url;
    if (cache[key]) return cache[key];
    if (pending[key]) return pending[key];
    pending[key] = fetch(url).then(r => {
      if (!r.ok) throw new Error('API ' + r.status);
      return r.json();
    }).then(data => {
      cache[key] = data;
      delete pending[key];
      return data;
    }).catch(err => {
      delete pending[key];
      return null;
    });
    return pending[key];
  }

  function clearCache() { Object.keys(cache).forEach(k => delete cache[k]); }

  // ─── Public API ───
  window.HearthAPI = {
    // Content
    getTopics: (category, level) => {
      const p = {};
      if (category) p.category = category;
      if (level) p.level = level;
      return fetchJSON('content-topics', p);
    },
    getDrills: (category, level, style, difficulty) => {
      const p = {};
      if (category) p.category = category;
      if (level) p.level = level;
      if (style) p.style = style;
      if (difficulty) p.difficulty = difficulty;
      return fetchJSON('content-drills', p);
    },
    getBooks: () => fetchJSON('content-books'),
    getRefs: (topicId, bookId) => {
      const p = {};
      if (topicId) p.topic_id = topicId;
      if (bookId) p.book_id = bookId;
      return fetchJSON('content-refs', p);
    },
    getLessons: (level) => fetchJSON('content-lessons', level ? {level} : null),

    // Journey
    getStudents: () => fetchJSON('journey-students'),
    getStudentProgress: (studentId) => fetchJSON('journey-progress', {student_id: studentId}),
    getStudentRecords: (studentId) => fetchJSON('journey-records', {student_id: studentId}),

    // Write operations
    saveTopic: (data) => fetch(API + '?a=content-topics', { method: data.id ? 'PUT' : 'POST', headers: Object.assign({'Content-Type':'application/json'}, localStorage.getItem('hearth-admin-token') ? {'Authorization':'Bearer '+localStorage.getItem('hearth-admin-token')} : {}), body: JSON.stringify(data) }).then(r=>r.json()),
    saveDrill: (data) => fetch(API + '?a=content-drills', { method: data.id ? 'PUT' : 'POST', headers: Object.assign({'Content-Type':'application/json'}, localStorage.getItem('hearth-admin-token') ? {'Authorization':'Bearer '+localStorage.getItem('hearth-admin-token')} : {}), body: JSON.stringify(data) }).then(r=>r.json()),
    saveBook: (data) => fetch(API + '?a=content-books', { method: data.id ? 'PUT' : 'POST', headers: Object.assign({'Content-Type':'application/json'}, localStorage.getItem('hearth-admin-token') ? {'Authorization':'Bearer '+localStorage.getItem('hearth-admin-token')} : {}), body: JSON.stringify(data) }).then(r=>r.json()),
    saveRef: (data) => fetch(API + '?a=content-refs', { method: data.id ? 'PUT' : 'POST', headers: Object.assign({'Content-Type':'application/json'}, localStorage.getItem('hearth-admin-token') ? {'Authorization':'Bearer '+localStorage.getItem('hearth-admin-token')} : {}), body: JSON.stringify(data) }).then(r=>r.json()),
    saveLesson: (data) => fetch(API + '?a=content-lessons', { method: data.id ? 'PUT' : 'POST', headers: Object.assign({'Content-Type':'application/json'}, localStorage.getItem('hearth-admin-token') ? {'Authorization':'Bearer '+localStorage.getItem('hearth-admin-token')} : {}), body: JSON.stringify(data) }).then(r=>r.json()),
    saveStudent: (data) => fetch(API + '?a=journey-students', { method: data.id ? 'PUT' : 'POST', headers: Object.assign({'Content-Type':'application/json'}, localStorage.getItem('hearth-admin-token') ? {'Authorization':'Bearer '+localStorage.getItem('hearth-admin-token')} : {}), body: JSON.stringify(data) }).then(r=>r.json()),
    saveProgress: (data) => fetch(API + '?a=journey-progress', { method: 'POST', headers: Object.assign({'Content-Type':'application/json'}, localStorage.getItem('hearth-admin-token') ? {'Authorization':'Bearer '+localStorage.getItem('hearth-admin-token')} : {}), body: JSON.stringify(data) }).then(r=>r.json()),
    saveRecord: (data) => fetch(API + '?a=journey-records', { method: 'POST', headers: Object.assign({'Content-Type':'application/json'}, localStorage.getItem('hearth-admin-token') ? {'Authorization':'Bearer '+localStorage.getItem('hearth-admin-token')} : {}), body: JSON.stringify(data) }).then(r=>r.json()),

    // Utility
    clearCache,
    isOnline: () => fetch(API + '?a=health').then(r=>r.ok).catch(()=>false),

    // Sync helpers — push localStorage data to API
    async syncJourneyToAPI() {
      const state = JSON.parse(localStorage.getItem('hearth-journey-v2') || '{}');
      if (!state.students) return;
      for (const s of state.students) {
        const res = await fetch(API + '?a=journey-students', {
          method: 'POST', headers: Object.assign({'Content-Type':'application/json'}, localStorage.getItem('hearth-admin-token') ? {'Authorization':'Bearer '+localStorage.getItem('hearth-admin-token')} : {}),
          body: JSON.stringify({ name: s.name, current_level: s.currentLevel || 1, notes: '' })
        });
        const {id: studentId} = await res.json();
        if (!studentId) continue;
        for (const [lvlId, ls] of Object.entries(s.levels || {})) {
          const lvlNum = parseInt(lvlId.replace('L','')) || 1;
          await fetch(API + '?a=journey-progress', {
            method: 'POST', headers: Object.assign({'Content-Type':'application/json'}, localStorage.getItem('hearth-admin-token') ? {'Authorization':'Bearer '+localStorage.getItem('hearth-admin-token')} : {}),
            body: JSON.stringify({
              student_id: studentId, level_num: lvlNum,
              lessons_done: ls.lessonsDone || 0,
              is_complete: ls.complete ? 1 : 0,
              is_unlocked: ls.unlocked ? 1 : 0,
              concept_ratings: JSON.stringify(ls.conceptRatings || {}),
              task_ratings: JSON.stringify(ls.taskRatings || {}),
              notes: JSON.stringify(ls.notes || [])
            })
          });
        }
      }
      return true;
    },

    // Seed: push existing hardcoded content to API
    async seedTopics(topics) {
      let count = 0;
      for (const t of topics) {
        try {
          await fetch(API + '?a=content-topics', {
            method: 'POST', headers: Object.assign({'Content-Type':'application/json'}, localStorage.getItem('hearth-admin-token') ? {'Authorization':'Bearer '+localStorage.getItem('hearth-admin-token')} : {}),
            body: JSON.stringify({
              key_name: t.id || t.key_name,
              title: t.title,
              category: t.category || 'general',
              description: t.description || '',
              body: t.body || '',
              difficulty: t.difficulty || 1,
              level_num: t.level_num || t.level || 1,
              source: t.source || '',
              video_url: t.video_url || t.videoUrl || ''
            })
          });
          count++;
        } catch(e) { /* skip duplicates */ }
      }
      return count;
    },

    async seedDrills(drills) {
      let count = 0;
      for (const d of drills) {
        try {
          await fetch(API + '?a=content-drills', {
            method: 'POST', headers: Object.assign({'Content-Type':'application/json'}, localStorage.getItem('hearth-admin-token') ? {'Authorization':'Bearer '+localStorage.getItem('hearth-admin-token')} : {}),
            body: JSON.stringify({
              key_name: d.id || d.key_name,
              title: d.title,
              category: d.category || 'Technique',
              style: d.style || '',
              difficulty: d.difficulty || 1,
              level_num: d.level_num || d.level || 1,
              string_num: d.string_num || d.string || 0,
              fret_num: d.fret_num || d.fret || 0,
              bpm_default: d.defaultBpm || d.bpm_default || 60,
              duration: d.duration || '5 min',
              description: d.description || '',
              instructions: d.instructions || '',
              source: d.source || ''
            })
          });
          count++;
        } catch(e) { /* skip */ }
      }
      return count;
    },

    async seedBooks(books) {
      let count = 0;
      for (const b of books) {
        try {
          await fetch(API + '?a=content-books', {
            method: 'POST', headers: Object.assign({'Content-Type':'application/json'}, localStorage.getItem('hearth-admin-token') ? {'Authorization':'Bearer '+localStorage.getItem('hearth-admin-token')} : {}),
            body: JSON.stringify({
              key_name: b.id || b.key_name,
              title: b.title,
              author: b.author || '',
              description: b.description || '',
              category: b.category || 'guitar',
              difficulty: b.difficulty || 1,
              pdf_url: b.pdf_url || b.pdfUrl || ''
            })
          });
          count++;
        } catch(e) { /* skip */ }
      }
      return count;
    }
  };
})();
