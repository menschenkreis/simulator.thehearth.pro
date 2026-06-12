/* ═══════════════════════════════════════════════════════════════
   Book Reader — Portrait Flipbook (StPageFlip)
   Inspired by thehearth.pro/the-two-trees
   Dark background, warm paper pages, arrow navigation
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const STORAGE_KEY = 'hearth-knowing-progress';

  let pageFlip = null;
  let pages = [];
  let currentCat = null;

  /* ── Quotes ── */
  const QUOTES = [
    { text: 'Music is the space between the notes.', author: 'Claude Debussy' },
    { text: 'The guitar is a small orchestra. Each string is a different color.', author: 'Andrés Segovia' },
    { text: 'I don\'t believe in talent. I believe in curiosity, work, and stubbornness.', author: 'Miles Davis' },
    { text: 'Learning to play the guitar is learning to listen.', author: 'Andrés Segovia' },
    { text: 'The only way to learn a new language is by speaking it.', author: 'Miles Davis' },
    { text: 'One must learn by doing. Though you think you know it, you have no certainty until you try.', author: 'Aristotle' },
    { text: 'Technique is the ability to translate what you hear in your head to your fingers.', author: 'Joe Pass' },
    { text: 'Practice slowly. Play fast. Never practice fast.', author: 'John Petrucci' },
    { text: 'If it sounds good, it is good.', author: 'Duke Ellington' },
    { text: 'The most important thing I\'ve learned is to keep it simple.', author: 'B.B. King' },
  ];

  /* ── Build HTML pages for a category ── */
  function buildPages(cat) {
    const result = [];
    let qi = 0;

    // Cover page
    result.push(coverPage(cat));

    // Topics
    cat.topics.forEach((topic, i) => {
      // Topic page
      result.push(topicPage(topic, cat, i));

      // Interleaved quote
      const q = QUOTES[qi % QUOTES.length]; qi++;
      result.push(quotePage(q));
    });

    // Back cover
    result.push(backCoverPage(cat));

    return result;
  }

  function coverPage(cat) {
    const colors = {
      'rhythm': '#c45a20', 'chords-harmony': '#8B4513', 'scales': '#4A6741',
      'technique-improv': '#5B3A6B', 'picking': '#2C5F7C', 'arpeggios': '#8B6914',
      'fingerstyle': '#6B3A3A', 'theory': '#3A5B6B', 'reading-music': '#5B4A3A'
    };
    const color = colors[cat.id] || '#d4af69';
    return `<div class="page" data-density="hard" style="background:linear-gradient(160deg,#1a1710 0%,#0f0d0b 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 2rem;text-align:center">
      <div style="font-size:2.5rem;margin-bottom:1.5rem;opacity:0.8">📚</div>
      <div style="font-family:Cinzel,serif;font-size:1.4rem;letter-spacing:4px;color:${color};margin-bottom:0.5rem">${cat.title}</div>
      <div style="width:40px;height:2px;background:${color};margin:1rem auto;opacity:0.5"></div>
      <div style="font-family:DM Sans,sans-serif;font-size:0.8rem;color:rgba(232,201,160,0.5);letter-spacing:1px;line-height:1.6;max-width:280px">${cat.description}</div>
      <div style="font-family:JetBrains Mono,monospace;font-size:0.6rem;color:rgba(232,201,160,0.25);margin-top:2rem;letter-spacing:2px">${cat.topics.length} TOPICS</div>
    </div>`;
  }

  function topicPage(topic, cat, idx) {
    const diffLabel = ['','Beginner','Intermediate','Advanced'][topic.difficulty];
    const diffDots = '●'.repeat(topic.difficulty) + '○'.repeat(3 - topic.difficulty);
    return `<div class="page" style="background:#fdfaf7;padding:2.5rem 2rem;display:flex;flex-direction:column;overflow:hidden">
      <div style="font-family:JetBrains Mono,monospace;font-size:0.55rem;letter-spacing:3px;text-transform:uppercase;color:#c45a20;opacity:0.6;margin-bottom:0.5rem">${cat.title.toUpperCase()}</div>
      <div style="font-family:Cinzel,serif;font-size:1.15rem;color:#2a2218;margin-bottom:0.5rem;line-height:1.3">${topic.title}</div>
      <div style="display:flex;gap:8px;margin-bottom:1.2rem;align-items:center">
        <span style="font-family:JetBrains Mono,monospace;font-size:0.6rem;color:#999;letter-spacing:1px">${diffLabel}</span>
        <span style="color:#c45a20;font-size:0.5rem;letter-spacing:2px">${diffDots}</span>
      </div>
      <div style="flex:1;overflow-y:auto;font-family:DM Sans,sans-serif;font-size:0.82rem;color:#444;line-height:1.75;padding-right:4px">
        ${topic.body}
      </div>
      <div style="margin-top:auto;padding-top:0.8rem;border-top:1px solid rgba(0,0,0,0.06);display:flex;justify-content:space-between;align-items:center">
        <span style="font-family:JetBrains Mono,monospace;font-size:0.55rem;color:rgba(0,0,0,0.2);letter-spacing:1px">${topic.source}</span>
        <span style="font-family:JetBrains Mono,monospace;font-size:0.6rem;color:rgba(0,0,0,0.15)">${idx + 1}</span>
      </div>
    </div>`;
  }

  function quotePage(q) {
    return `<div class="page" style="background:#1a1710;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2.5rem;text-align:center">
      <div style="font-size:2rem;margin-bottom:1.5rem;opacity:0.3">✦</div>
      <div style="font-family:Cinzel,serif;font-style:italic;font-size:0.95rem;line-height:1.8;color:rgba(212,175,105,0.6);max-width:300px">"${q.text}"</div>
      <div style="font-family:JetBrains Mono,monospace;font-size:0.6rem;letter-spacing:2px;color:rgba(212,175,105,0.3);margin-top:1rem">— ${q.author}</div>
    </div>`;
  }

  function backCoverPage(cat) {
    const completed = getProgress();
    const done = cat.topics.filter(t => completed[t.id]).length;
    return `<div class="page" data-density="hard" style="background:linear-gradient(160deg,#1a1710 0%,#0f0d0b 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 2rem;text-align:center">
      <div style="font-size:1.5rem;margin-bottom:1rem;opacity:0.6">${done === cat.topics.length ? '✨' : '📖'}</div>
      <div style="font-family:Cinzel,serif;font-size:1rem;letter-spacing:3px;color:rgba(212,175,105,0.5)">${done === cat.topics.length ? 'Complete' : 'End of Book'}</div>
      <div style="font-family:JetBrains Mono,monospace;font-size:0.6rem;color:rgba(212,175,105,0.25);margin-top:1rem;letter-spacing:1px">${done}/${cat.topics.length} topics understood</div>
    </div>`;
  }

  function getProgress() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  }

  /* ── Open the book ── */
  window.openBook = function (categoryId) {
    const K = window.KNOWING;
    if (!K) return;
    const cat = K.categories.find(c => c.id === categoryId);
    if (!cat) return;

    currentCat = cat;
    pages = buildPages(cat);

    // Create overlay if needed
    let overlay = document.getElementById('book-overlay');
    if (overlay) {
      overlay.remove();
      if (pageFlip) { pageFlip.destroy(); pageFlip = null; }
    }

    overlay = document.createElement('div');
    overlay.id = 'book-overlay';
    overlay.className = 'flipbook-container';
    overlay.innerHTML = `
      <div class="back-nav">
        <button class="back-link" id="book-back">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to shelf
        </button>
      </div>
      <div class="flipbook-wrapper">
        <button class="nav-btn prev" id="btn-prev">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div id="flipbook"></div>
        <button class="nav-btn next" id="btn-next">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    `;
    document.body.appendChild(overlay);

    // Populate pages
    const flipEl = document.getElementById('flipbook');
    pages.forEach(html => {
      const div = document.createElement('div');
      div.innerHTML = html;
      // The inner div is the actual page
      const pageDiv = div.firstElementChild;
      flipEl.appendChild(pageDiv);
    });

    // Calculate dimensions
    const isMobile = window.innerWidth <= 768;
    const pageWidth = isMobile ? Math.min(340, window.innerWidth - 40) : 420;
    const pageHeight = isMobile ? Math.min(480, window.innerHeight - 160) : 590;

    // Init StPageFlip
    pageFlip = new St.PageFlip(flipEl, {
      width: pageWidth,
      height: pageHeight,
      size: 'stretch',
      minWidth: 280,
      maxWidth: 500,
      minHeight: 380,
      maxHeight: 700,
      showCover: true,
      maxShadowOpacity: 0.4,
      mobileScrollSupport: true,
      clickEventForward: false,
      useMouseEvents: true,
      swipeDistance: 30,
      showPageCorners: true,
      disableFlipByClick: false,
      flippingTime: 600,
      usePortrait: true,
      startZIndex: 0,
      autoSize: true,
      drawShadow: true,
    });

    pageFlip.loadFromHTML(document.querySelectorAll('#flipbook .page'));

    // Nav buttons
    document.getElementById('btn-prev').addEventListener('click', () => pageFlip.flipPrev());
    document.getElementById('btn-next').addEventListener('click', () => pageFlip.flipNext());
    document.getElementById('book-back').addEventListener('click', closeBook);

    // Keyboard
    const keyHandler = (e) => {
      if (!document.getElementById('book-overlay')) return;
      if (e.key === 'ArrowRight') pageFlip.flipNext();
      if (e.key === 'ArrowLeft') pageFlip.flipPrev();
      if (e.key === 'Escape') closeBook();
    };
    document.addEventListener('keydown', keyHandler);
    overlay._keyHandler = keyHandler;

    // Show
    requestAnimationFrame(() => overlay.style.opacity = '1');
  };

  function closeBook() {
    const overlay = document.getElementById('book-overlay');
    if (!overlay) return;
    if (overlay._keyHandler) {
      document.removeEventListener('keydown', overlay._keyHandler);
    }
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.remove();
      if (pageFlip) { pageFlip.destroy(); pageFlip = null; }
    }, 400);
  }

})();
