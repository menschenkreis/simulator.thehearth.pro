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

  const TOPIC_VIDEO_REFS = {
    'time-signatures': [{ cat: 'rhythm', level: 'level5', num: 12 }],
    'subdivision': [{ cat: 'rhythm', level: 'level1', num: 1 }, { cat: 'rhythm', level: 'level2', num: 2 }],
    'triads': [{ cat: 'chords-harmony', level: 'level3', num: 4 }],
    'seventh-chords': [{ cat: 'chords-harmony', level: 'level5', num: 11 }],
    'extensions': [{ cat: 'chords-harmony', level: 'level5', num: 11 }],
    'chord-voicings': [{ cat: 'chords-harmony', level: 'level4', num: 8 }],
    'chord-progressions': [{ cat: 'chords-harmony', level: 'level6', num: 16 }],
    'pentatonic': [{ cat: 'scales', level: 'level1', num: 2 }],
    'minor-scales': [{ cat: 'scales', level: 'level5', num: 13 }],
    'modes': [{ cat: 'scales', level: 'level6', num: 17 }],
    'exotic-scales': [{ cat: 'scales', level: 'level8', num: 42 }],
    'what-is-arpeggio': [{ cat: 'arpeggios', level: 'level4', num: 9 }],
    'major-arpeggios': [{ cat: 'arpeggios', level: 'level3', num: 6 }],
    'seventh-arpeggios': [{ cat: 'arpeggios', level: 'level6', num: 21 }],
    'intervals': [{ cat: 'theory', level: 'level3', num: 7 }],
    'circle-of-fifths': [{ cat: 'theory', level: 'level4', num: 10 }],
    'key-signatures': [{ cat: 'theory', level: 'level4', num: 47 }],
    'modulation': [{ cat: 'chords-harmony', level: 'level6', num: 51 }]
  };

  function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function ytEmbed(url) {
    if (!url) return '';
    // Extract video ID from various YouTube URL formats
    var m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
    if (!m) return '';
    return 'https://www.youtube.com/embed/' + m[1] + '?rel=0&modestbranding=1';
  }

  function getRoadmapVideo(ref) {
    var road = window.VIDEO_ROADMAP;
    var levelVideos = road && road[ref.cat] && road[ref.cat][ref.level];
    if (!levelVideos) return null;
    return levelVideos.find(function (v) { return v.num === ref.num; }) || null;
  }

  function getDirectVideos(topic) {
    var direct = [];
    if (topic.video) direct.push({ title: topic.title, url: topic.video, source: 'Direct lesson' });
    (TOPIC_VIDEO_REFS[topic.id] || []).forEach(function (ref) {
      var v = getRoadmapVideo(ref);
      if (v) direct.push({ title: v.title, url: v.url, source: 'QJamTracks Roadmap' });
    });
    var seen = {};
    return direct.filter(function (v) {
      var embed = ytEmbed(v.url);
      if (!embed || seen[embed]) return false;
      seen[embed] = true;
      v.embed = embed;
      return true;
    });
  }

  function getGuideText(cat) {
    var titles = cat.topics.slice(0, 3).map(function (t) { return t.title; });
    var list = titles.join(', ');
    if (cat.topics.length > 3) list += ', and more';
    return 'This book opens the ' + cat.title + ' path. First we will move through ' + list + '. Take it slowly: read, listen, then try the idea on the guitar.';
  }

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
          '<div class="cover-kicker">The Hearth Mastery</div>' +
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

      // Video pages are only attached when a topic has an explicit direct match.
      var directVideos = getDirectVideos(topic);
      if (directVideos.length) {
        directVideos.forEach(function (video) {
          result.push(
            '<div class="page">' +
              '<div class="page-content page-video">' +
                '<div class="video-label">' + esc(video.source) + '</div>' +
                '<iframe src="' + video.embed + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
                '<div class="video-title">' + esc(video.title) + '</div>' +
                '<div class="video-topic">For: ' + esc(topic.title) + '</div>' +
              '</div>' +
            '</div>'
          );
        });
      }

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
          '<div class="back-title">' + (done === cat.topics.length ? 'Complete' : 'End of Book') + '</div>' +
          '<div class="back-progress">' + done + ' / ' + cat.topics.length + ' topics understood</div>' +
        '</div>' +
      '</div>'
    );

    return result;
  }

  window.openBook = function (categoryId, levelFilter) {
    var cat = window.KNOWING.categories.find(function (c) { return c.id === categoryId; });
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
      '<div class="book-guide">' +
        '<img class="book-guide-img" src="images/character-full/Encouraging.png" alt="">' +
        '<div class="book-guide-bubble">' +
          '<div class="book-guide-kicker">Guide</div>' +
          '<p>' + esc(getGuideText(filteredCat)) + '</p>' +
        '</div>' +
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

    var PageFlipLib = (typeof St !== 'undefined' && St.PageFlip) ? St.PageFlip : (typeof PageFlip !== 'undefined' ? PageFlip : null);
    if (!PageFlipLib) {
      console.error('Page-flip library not loaded. Attempting to continue without flipbook.');
      // Fallback: show content without flipbook
      overlay.innerHTML = '<div style="padding:40px;color:#e8c9a0;font-family:IBM Plex Sans,sans-serif;text-align:center">' +
        '<div style="font-family:Josefin Sans,sans-serif;font-size:0.65rem;letter-spacing:3px;text-transform:uppercase;color:rgba(232,201,160,0.45);margin-bottom:1rem">Book reader</div>' +
        '<div style="font-family:Josefin Sans,sans-serif;font-size:1.2rem;margin-bottom:1rem">' + esc(filteredCat.title) + '</div>' +
        '<div style="font-size:0.8rem;color:rgba(232,201,160,0.5);margin-bottom:2rem">Flipbook library loading... Try refreshing the page.</div>' +
        '<button onclick="closeBook()" style="background:var(--card);border:1px solid var(--border);color:var(--text);padding:10px 20px;border-radius:6px;cursor:pointer;font-family:DM Sans,sans-serif">Close</button>' +
      '</div>';
      overlay.style.opacity = '1';
      return;
    }

    pageFlip = new PageFlipLib(flipEl, {
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

  window.closeBook = closeBook;

})();
