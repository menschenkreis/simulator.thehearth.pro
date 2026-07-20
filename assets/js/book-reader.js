/* ═══════════════════════════════════════════════════════════════
   Book Reader — Portrait Flipbook (StPageFlip)
   Styled after thehearth.pro/the-two-trees
   Josefin Sans headings, IBM Plex Sans body, warm paper pages
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  let pageFlip = null;
  let pages = [];
  let pageNotes = [];
  let pageTopics = [];
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

  // Keep this list strict: a video should match the exact lesson topic, not just
  // the broader book category or a nearby idea.
  const TOPIC_VIDEO_REFS = {
    'time-signatures': [{ cat: 'rhythm', level: 'level5', num: 12 }],
    'triads': [{ cat: 'chords-harmony', level: 'level3', num: 4 }],
    'seventh-chords': [{ cat: 'chords-harmony', level: 'level5', num: 11 }],
    'extensions': [{ cat: 'chords-harmony', level: 'level5', num: 11 }],
    'pentatonic': [{ cat: 'scales', level: 'level1', num: 2 }],
    'modes': [{ cat: 'scales', level: 'level6', num: 17 }],
    'what-is-arpeggio': [{ cat: 'arpeggios', level: 'level4', num: 9 }],
    'intervals': [{ cat: 'theory', level: 'level3', num: 7 }],
    'circle-of-fifths': [{ cat: 'theory', level: 'level4', num: 10 }],
    'modulation': [{ cat: 'chords-harmony', level: 'level6', num: 51 }]
  };

  function esc(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

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

  function getTopicGuideText(cat, topic) {
    var concepts = window.KNOWING_CONCEPTS && window.KNOWING_CONCEPTS[topic.id];
    var level = window.getKnowingTopicLevel ? window.getKnowingTopicLevel(topic) : topic.difficulty;
    if (concepts && concepts.focus) {
      var keywords = (concepts.keywords || []).slice(0, 3).join(', ');
      return 'Level ' + level + ' note: ' + concepts.focus + (keywords ? ' Listen for these anchors: ' + keywords + '.' : '');
    }
    return 'Level ' + level + ' note: ' + topic.title + ' belongs to ' + cat.title + '. Try to connect the idea to one real sound on the guitar before turning the page.';
  }

  function getVideoGuideText(topic, video) {
    return 'This video is here only for ' + topic.title + '. Watch for the part that demonstrates the exact idea on the page, then come back and name what changed in the sound.';
  }

  function getQuoteGuideText(quote) {
    return 'Pause page: "' + quote.text + '" ' + quote.author + ' is pointing at a way to listen. Carry that idea into the next lesson page.';
  }

  function getBackGuideText(cat) {
    return 'You reached the end of this book. Choose one idea from these pages and prove it on the guitar before closing the cover.';
  }

  function renderConcepts(topic) {
    var concepts = window.KNOWING_CONCEPTS && window.KNOWING_CONCEPTS[topic.id];
    if (!concepts) return '';
    var keywords = (concepts.keywords || []).map(function (word) {
      return '<span class="concept-chip">' + esc(word) + '</span>';
    }).join('');
    var sources = (concepts.sources || []).map(function (source) {
      return '<li>' + esc(source) + '</li>';
    }).join('');
    return '<div class="topic-concepts">' +
      '<div class="concept-heading">Key concepts from the library</div>' +
      '<p class="concept-focus">' + esc(concepts.focus || '') + '</p>' +
      '<div class="concept-chip-row">' + keywords + '</div>' +
      (sources ? '<ul class="concept-sources">' + sources + '</ul>' : '') +
    '</div>';
  }

  function renderLearningActions(cat, topic) {
    var check = topic.id === 'time-signatures'
      ? '<div class="topic-check" data-knowing-check="time-signatures">' +
          '<div class="concept-heading">Quick check</div>' +
          '<p>What does the top number of a time signature tell you?</p>' +
          '<div class="topic-check-actions">' +
            '<button type="button" data-knowing-action="answer" data-answer-id="beats-per-measure" data-correct="true">How many beats are in each measure</button>' +
            '<button type="button" data-knowing-action="answer" data-answer-id="chord-name" data-correct="false">Which chord to play</button>' +
          '</div>' +
        '</div>'
      : '';
    return '<div class="topic-learning-actions" data-category-id="' + esc(cat.id) + '" data-topic-id="' + esc(topic.id) + '" data-topic-title="' + esc(topic.title) + '">' +
      check +
      '<div class="topic-learning-buttons">' +
        '<button type="button" data-knowing-action="read">I have read this</button>' +
        '<button type="button" data-knowing-action="study">Open exact topic in Study</button>' +
      '</div>' +
      '<div class="topic-learning-status" role="status" aria-live="polite"></div>' +
    '</div>';
  }

  function buildPages(cat) {
    const result = [];
    const notes = [];
    const topics = [];
    let qi = 0;

    function addPage(html, note, topicId) {
      result.push(html);
      notes.push(note);
      topics.push(topicId || null);
    }

    // Cover
    addPage(
      '<div class="page" data-density="hard">' +
        '<div class="page-content page-cover">' +
          '<div class="cover-kicker">The Hearth Mastery</div>' +
          '<div class="cover-title">' + esc(cat.title) + '</div>' +
          '<div class="cover-rule"></div>' +
          '<div class="cover-desc">' + esc(cat.description) + '</div>' +
          '<div class="cover-meta">' + cat.topics.length + ' topics</div>' +
        '</div>' +
      '</div>',
      getGuideText(cat)
    );

    // Topics
    cat.topics.forEach(function (topic, idx) {
      var diffLabel = ['','Beginner','Intermediate','Advanced'][topic.difficulty] || 'Beginner';
      var topicLevel = window.getKnowingTopicLevel ? window.getKnowingTopicLevel(topic) : topic.difficulty;
      var diffDots = '\u25CF'.repeat(topic.difficulty) + '\u25CB'.repeat(3 - topic.difficulty);

      addPage(
        '<div class="page" data-knowing-topic-id="' + esc(topic.id) + '">' +
          '<div class="page-content page-topic">' +
            '<div class="topic-label">' + esc(cat.title) + '</div>' +
            '<div class="topic-title">' + esc(topic.title) + '</div>' +
            '<div class="topic-diff">Level ' + topicLevel + '  ' + diffLabel + '  ' + diffDots + '</div>' +
            '<div class="topic-body">' + renderConcepts(topic) + topic.body + renderLearningActions(cat, topic) + '</div>' +
            '<div class="topic-footer">' +
              '<span class="topic-source">' + esc(topic.source) + '</span>' +
              '<span class="topic-num">' + (idx + 1) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>',
        getTopicGuideText(cat, topic),
        topic.id
      );

      // Interleaved quote
      var q = QUOTES[qi % QUOTES.length]; qi++;

      // Video pages are only attached when a topic has an explicit direct match.
      var directVideos = getDirectVideos(topic);
      if (directVideos.length) {
        directVideos.forEach(function (video) {
          addPage(
            '<div class="page">' +
              '<div class="page-content page-video">' +
                '<div class="video-label">' + esc(video.source) + '</div>' +
                '<iframe src="' + video.embed + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
                '<div class="video-title">' + esc(video.title) + '</div>' +
                '<div class="video-topic">For: ' + esc(topic.title) + '</div>' +
              '</div>' +
            '</div>',
            getVideoGuideText(topic, video)
          );
        });
      }

      addPage(
        '<div class="page">' +
          '<div class="page-content page-quote">' +
            '<div class="quote-mark">\u2726</div>' +
            '<div class="quote-text">\u201C' + esc(q.text) + '\u201D</div>' +
            '<div class="quote-author">\u2014 ' + esc(q.author) + '</div>' +
          '</div>' +
        '</div>',
        getQuoteGuideText(q)
      );
    });

    // Back cover
    var topicWord = cat.topics.length === 1 ? 'topic' : 'topics';
    addPage(
      '<div class="page" data-density="hard">' +
        '<div class="page-content page-back">' +
          '<div class="back-title">End of Book</div>' +
          '<div class="back-progress">' + cat.topics.length + ' ' + topicWord + ' covered</div>' +
        '</div>' +
      '</div>',
      getBackGuideText(cat)
    );

    pageNotes = notes;
    pageTopics = topics;
    return result;
  }

  function setBackgroundAccessibility(hidden, overlay) {
    Array.prototype.forEach.call(document.body.children, function updateBodyChild(child) {
      if (child === overlay || child.tagName === 'SCRIPT') return;
      if (hidden) {
        child.setAttribute('data-book-previous-aria-hidden', child.getAttribute('aria-hidden') || '');
        child.setAttribute('data-book-previous-inert', child.inert ? 'true' : 'false');
        child.setAttribute('aria-hidden', 'true');
        child.inert = true;
        return;
      }
      if (!child.hasAttribute('data-book-previous-aria-hidden')) return;
      var previousAria = child.getAttribute('data-book-previous-aria-hidden');
      if (previousAria) child.setAttribute('aria-hidden', previousAria);
      else child.removeAttribute('aria-hidden');
      child.inert = child.getAttribute('data-book-previous-inert') === 'true';
      child.removeAttribute('data-book-previous-aria-hidden');
      child.removeAttribute('data-book-previous-inert');
    });
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
        topics: cat.topics.filter(function (t) {
          var topicLevel = window.getKnowingTopicLevel ? window.getKnowingTopicLevel(t) : t.difficulty;
          return topicLevel === levelFilter;
        })
      };
    }

    currentCat = filteredCat;
    pages = buildPages(filteredCat);

    // Remove existing overlay
    var existing = document.getElementById('book-overlay');
    if (existing) {
      setBackgroundAccessibility(false, existing);
      existing.remove();
      if (pageFlip) { pageFlip.destroy(); pageFlip = null; }
    }

    var overlay = document.createElement('div');
    overlay.id = 'book-overlay';
    overlay.className = 'flipbook-container';
    overlay.innerHTML =
      '<div class="back-nav">' +
        '<button class="back-link" id="book-back" aria-label="Close book and return to the KNOW shelves">' +
          '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>' +
          ' Back to shelf' +
        '</button>' +
      '</div>' +
      '<div class="book-guide">' +
        '<img class="book-guide-img" src="images/character-full/Encouraging.png" alt="">' +
        '<div class="book-guide-bubble">' +
          '<div class="book-guide-kicker">Guide</div>' +
          '<p id="book-guide-text">' + esc(getGuideText(filteredCat)) + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="flipbook-wrapper">' +
        '<button class="nav-btn prev" id="btn-prev" aria-label="Previous book page">' +
          '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 18l-6-6 6-6"/></svg>' +
        '</button>' +
        '<div id="flipbook"></div>' +
        '<button class="nav-btn next" id="btn-next" aria-label="Next book page">' +
          '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6"/></svg>' +
        '</button>' +
      '</div>';
    document.body.appendChild(overlay);
    setBackgroundAccessibility(true, overlay);

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

    function updateCoverMode(pageIndex) {
      var isLandscape = pageFlip.getOrientation && pageFlip.getOrientation() === 'landscape';
      overlay.classList.toggle('book-cover-only', pageIndex === 0 && isLandscape);
    }

    function updateGuideText(pageIndex) {
      var guide = document.getElementById('book-guide-text');
      if (!guide) return;
      var note = pageNotes[pageIndex] || pageNotes[pageIndex + 1] || getGuideText(filteredCat);
      guide.style.opacity = '0';
      setTimeout(function () {
        if (!document.getElementById('book-overlay')) return;
        guide.textContent = note;
        guide.style.opacity = '1';
      }, 120);
    }

    var openedTopics = {};

    function recordVisibleTopics(pageIndex) {
      [pageIndex, pageIndex + 1].forEach(function recordPageTopic(index) {
        var topicId = pageTopics[index];
        if (!topicId || openedTopics[topicId]) return;
        var topic = filteredCat.topics.find(function findTopic(item) { return item.id === topicId; });
        if (!topic || !window.HearthKnowingProgressController) return;
        openedTopics[topicId] = true;
        window.HearthKnowingProgressController.recordStage({
          stage: 'opened',
          catId: filteredCat.id,
          topicId: topicId,
          topicTitle: topic.title,
          storage: window.localStorage
        });
      });
    }

    function updateBookState(pageIndex) {
      updateCoverMode(pageIndex);
      updateGuideText(pageIndex);
      recordVisibleTopics(pageIndex);
    }

    pageFlip.on('init', function (e) { updateBookState(e.data.page); });
    pageFlip.on('flip', function (e) { updateBookState(e.data); });
    pageFlip.on('changeOrientation', function () {
      updateBookState(pageFlip.getCurrentPageIndex());
    });
    updateBookState(0);

    document.getElementById('btn-prev').addEventListener('click', function () { pageFlip.flipPrev(); });
    document.getElementById('btn-next').addEventListener('click', function () { pageFlip.flipNext(); });
    document.getElementById('book-back').addEventListener('click', closeBook);

    overlay.addEventListener('click', function handleLearningAction(event) {
      var button = event.target.closest && event.target.closest('[data-knowing-action]');
      if (!button) return;
      var actions = button.closest('.topic-learning-actions');
      if (!actions) return;
      event.preventDefault();
      event.stopPropagation();
      var catId = actions.getAttribute('data-category-id');
      var topicId = actions.getAttribute('data-topic-id');
      var topicTitle = actions.getAttribute('data-topic-title');
      var action = button.getAttribute('data-knowing-action');
      var status = actions.querySelector('.topic-learning-status');
      if (action === 'study') {
        if (typeof window.openKnowingTopicInStudy === 'function') window.openKnowingTopicInStudy(catId, topicId);
        return;
      }
      if (!window.HearthKnowingProgressController) return;
      if (action === 'read') {
        window.HearthKnowingProgressController.recordStage({ stage: 'read', catId: catId, topicId: topicId, topicTitle: topicTitle, storage: window.localStorage });
        button.textContent = 'Read';
        if (status) status.textContent = 'Reading contact saved for the active learner.';
        return;
      }
      if (action === 'answer') {
        var correct = button.getAttribute('data-correct') === 'true';
        window.HearthKnowingProgressController.recordStage({
          stage: 'answered',
          catId: catId,
          topicId: topicId,
          topicTitle: topicTitle,
          answerId: button.getAttribute('data-answer-id'),
          correct: correct,
          storage: window.localStorage
        });
        if (status) status.textContent = correct
          ? 'Yes. The top number tells you how many beats are in each measure.'
          : 'Not quite. The top number counts the beats in each measure. Read that line once more, then try again.';
      }
    });

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

  function closeBook(immediate) {
    var overlay = document.getElementById('book-overlay');
    if (!overlay) return;
    if (overlay._keyHandler) document.removeEventListener('keydown', overlay._keyHandler);
    function finishClose() {
      overlay.remove();
      setBackgroundAccessibility(false, null);
      if (pageFlip) { pageFlip.destroy(); pageFlip = null; }
    }
    if (immediate === true) {
      finishClose();
      return;
    }
    overlay.style.opacity = '0';
    setTimeout(finishClose, 500);
  }

  window.closeBook = closeBook;

})();
