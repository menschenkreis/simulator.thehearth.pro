/* ═══════════════════════════════════════════════════════════════
   Book Reader — Portrait Flipbook (StPageFlip)
   Styled after thehearth.pro/the-two-trees
   Josefin Sans headings, IBM Plex Sans body, warm paper pages
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const STORAGE_KEY = 'hearth…ress';

  let pageFlip = null;
  let pages = [];
  let currentCat = null;

  const QUOTES = [
    { text: 'Music is the space between the notes.', author: 'Claude Debussy' },
    { text: 'The guitar is a small orchestra. Each string is a different color.', author: 'Andrés Segovia' },
    { text: 'I don\'t believe in talent. I believe in curiosity, work, and stubbornness.', author: 'Miles Davis' },
    { text: 'Learning to play the guitar is learning to listen.', author: 'Andrés Segovia' },
    { text: 'One must learn by doing. Though you think you know it, you have no certainty until you try.', author: 'Aristotle' },
    { text: 'Technique is the ability to translate what you hear in your head to your fingers.', author: 'Joe Pass' },
    { text: 'Practice slowly. Play fast. Never practice fast.', author: 'John Petrucci' },
    { text: 'If it sounds good, it is good.', author: 'Duke Ellington' },
    { text: 'The most important thing I\'ve learned is to keep it simple.', author: 'B.B. King' },
    { text: 'Music expresses that which cannot be put into words.', author: 'Victor Hugo' },
  ];

  function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function getProgress() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  }

  function buildPages(cat) {
    const result = [];
    let qi = 0;

    // Cover
    result.push(
      '<div class="page" data-density="hard">' +
        '<div class="page-content page-cover">' +
          '<div class="cover-glyph">📚</div>' +
          '<div class="cover-title">' + esc(cat.title) + '</div>' +
          '<div class="cover-rule"></div>' +
          '<div class="cover-desc">' + esc(cat.description) + '</div>' +
          '<div class="cover-meta">' + cat.topics.length + ' topics</div>' +
        '</div>' +
      '</div>'
    );

    // Topics
    cat.topics.forEach(function (topic, idx) {
      var diffLabel = ['','Beginner','Intermediate','Advanced'][topic.difficulty] || 'Beginner';
      var diffDots = '\u25CF'.repeat(topic.difficulty) + '\u25CB'.repeat(3 - topic.difficulty);

      result.push(
        '<div class="page">' +
          '<div class="page-content page-topic">' +
            '<div class="topic-label">' + esc(cat.title) + '</div>' +
            '<div class="topic-title">' + esc(topic.title) + '</div>' +
            '<div class="topic-diff">' + diffLabel + '  ' + diffDots + '</div>' +
            '<div class="topic-body">' + topic.body + '</div>' +
            '<div class="topic-footer">' +
              '<span class="topic-source">' + esc(topic.source) + '</span>' +
              '<span class="topic-num">' + (idx + 1) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>'
      );

      // Interleaved quote
      var q = QUOTES[qi % QUOTES.length]; qi++;
      result.push(
        '<div class="page">' +
          '<div class="page-content page-quote">' +
            '<div class="quote-mark">\u2726</div>' +
            '<div class="quote-text">\u201C' + esc(q.text) + '\u201D</div>' +
            '<div class="quote-author">\u2014 ' + esc(q.author) + '</div>' +
          '</div>' +
        '</div>'
      );
    });

    // Back cover
    var completed = getProgress();
    var done = cat.topics.filter(function (t) { return completed[t.id]; }).length;
    result.push(
      '<div class="page" data-density="hard">' +
        '<div class="page-content page-back">' +
          '<div class="back-icon">' + (done === cat.topics.length ? '\u2728' : '\uD83D\uDCD6') + '</div>' +
          '<div class="back-title">' + (done === cat.topics.length ? 'Complete' : 'End of Book') + '</div>' +
          '<div class="back-progress">' + done + ' / ' + cat.topics.length + ' topics understood</div>' +
        '</div>' +
      '</div>'
    );

    return result;
  }

  window.openBook = function (categoryId, levelFilter) {
    var cat = K.categories.find(function (c) { return c.id === categoryId; });
    if (!cat) return;

    // Filter topics by level if specified
    var filteredCat = cat;
    if (levelFilter) {
      filteredCat = {
        id: cat.id,
        title: cat.title,
        description: cat.description,
        topics: cat.topics.filter(function (t) { return t.difficulty === levelFilter; })
      };
    }

    currentCat = filteredCat;
    pages = buildPages(filteredCat);

    // Remove existing overlay
    var existing = document.getElementById('book-overlay');
    if (existing) {
      existing.remove();
      if (pageFlip) { pageFlip.destroy(); pageFlip = null; }
    }

    var overlay = document.createElement('div');
    overlay.id = 'book-overlay';
    overlay.className = 'flipbook-container';
    overlay.innerHTML =
      '<div class="back-nav">' +
        '<button class="back-link" id="book-back">' +
          '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>' +
          ' Back to shelf' +
        '</button>' +
      '</div>' +
      '<div class="flipbook-wrapper">' +
        '<button class="nav-btn prev" id="btn-prev">' +
          '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 18l-6-6 6-6"/></svg>' +
        '</button>' +
        '<div id="flipbook"></div>' +
        '<button class="nav-btn next" id="btn-next">' +
          '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6"/></svg>' +
        '</button>' +
      '</div>';
    document.body.appendChild(overlay);

    // Populate pages
    var flipEl = document.getElementById('flipbook');
    pages.forEach(function (html) {
      var temp = document.createElement('div');
      temp.innerHTML = html;
      flipEl.appendChild(temp.firstElementChild);
    });

    // Dimensions
    var isMobile = window.innerWidth <= 768;
    var pageW = isMobile ? Math.min(340, window.innerWidth - 40) : 450;
    var pageH = isMobile ? Math.min(480, window.innerHeight - 160) : 630;

    pageFlip = new St.PageFlip(flipEl, {
      width: pageW,
      height: pageH,
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

    document.getElementById('btn-prev').addEventListener('click', function () { pageFlip.flipPrev(); });
    document.getElementById('btn-next').addEventListener('click', function () { pageFlip.flipNext(); });
    document.getElementById('book-back').addEventListener('click', closeBook);

    var keyHandler = function (e) {
      if (!document.getElementById('book-overlay')) return;
      if (e.key === 'ArrowRight') pageFlip.flipNext();
      if (e.key === 'ArrowLeft') pageFlip.flipPrev();
      if (e.key === 'Escape') closeBook();
    };
    document.addEventListener('keydown', keyHandler);
    overlay._keyHandler = keyHandler;

    requestAnimationFrame(function () { overlay.style.opacity = '1'; });
  };

  function closeBook() {
    var overlay = document.getElementById('book-overlay');
    if (!overlay) return;
    if (overlay._keyHandler) document.removeEventListener('keydown', overlay._keyHandler);
    overlay.style.opacity = '0';
    setTimeout(function () {
      overlay.remove();
      if (pageFlip) { pageFlip.destroy(); pageFlip = null; }
    }, 500);
  }

})();
