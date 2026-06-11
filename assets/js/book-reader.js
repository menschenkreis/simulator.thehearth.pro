// ═══════════════════════════════════════════════════
// THE HEARTH — Digital Book Reader
// Interactive page-turning book with chapters, 
// embedded videos, diagrams, and progress tracking
// ═══════════════════════════════════════════════════

(function() {
  'use strict';

  // Book colors per discipline
  const BOOK_COLORS = [
    '#8B4513','#4A6741','#5B3A6B','#2C5F7C',
    '#8B6914','#6B3A3A','#3A5B6B','#5B4A3A','#6B5B3A'
  ];

  // Level names with numerology
  const LEVEL_NAMES = [
    '', 'I — Origin', 'II — Duality', 'III — Creation',
    'IV — Structure', 'V — Change', 'VI — Harmony',
    'VII — Wisdom', 'VIII — Power'
  ];

  // State
  let currentBook = null;
  let currentSpread = 0;
  let totalSpreads = 0;
  let pages = [];
  let isAnimating = false;
  let tocOpen = false;
  let isMobile = false;

  // --- Detect mobile ---
  function checkMobile() {
    isMobile = window.innerWidth <= 700;
  }
  checkMobile();
  window.addEventListener('resize', checkMobile);

  // --- Progress helpers ---
  function getProgress() {
    return JSON.parse(localStorage.getItem('hearth-knowing-progress') || '{}');
  }
  function saveProgress(progress) {
    localStorage.setItem('hearth-knowing-progress', JSON.stringify(progress));
  }
  function markTopicDone(topicId) {
    const p = getProgress();
    p[topicId] = true;
    saveProgress(p);
  }
  function isTopicDone(topicId) {
    return !!getProgress()[topicId];
  }

  // --- Difficulty to level mapping ---
  function diffToLevel(diff) {
    if (diff === 1) return [1, 2];
    if (diff === 2) return [3, 4];
    if (diff === 3) return [5, 6, 7, 8];
    return [1];
  }
  function diffLabel(d) {
    return ['', 'Beginner', 'Intermediate', 'Advanced'][d] || '';
  }

  // --- Group topics by level ---
  function groupTopicsByLevel(topics) {
    const levels = {};
    topics.forEach(t => {
      const lvls = diffToLevel(t.difficulty);
      const primaryLevel = lvls[0];
      if (!levels[primaryLevel]) levels[primaryLevel] = [];
      levels[primaryLevel].push(t);
    });
    // Sort by level number
    const sorted = Object.keys(levels).map(Number).sort((a,b) => a - b);
    return sorted.map(lvl => ({ level: lvl, topics: levels[lvl] }));
  }

  // --- Build pages array for a book ---
  function buildPages(category, colorIdx) {
    const color = BOOK_COLORS[colorIdx % BOOK_COLORS.length];
    const groups = groupTopicsByLevel(category.topics);
    const allPages = [];

    // Page 0: Cover (left page)
    allPages.push({
      type: 'cover',
      side: 'left',
      title: category.title,
      description: category.description,
      color: color,
      totalTopics: category.topics.length
    });

    // For each level group, add chapter title + content pages
    groups.forEach(group => {
      // Chapter title page
      allPages.push({
        type: 'chapter',
        side: allPages.length % 2 === 0 ? 'left' : 'right',
        level: group.level,
        levelName: LEVEL_NAMES[group.level] || 'Level ' + group.level,
        topicCount: group.topics.length,
        color: color
      });

      // Topic pages
      group.topics.forEach(topic => {
        allPages.push({
          type: 'topic',
          side: allPages.length % 2 === 0 ? 'left' : 'right',
          topic: topic,
          category: category,
          level: group.level,
          levelName: LEVEL_NAMES[group.level] || 'Level ' + group.level,
          color: color,
          done: isTopicDone(topic.id)
        });
      });
    });

    // Pad to even number
    if (allPages.length % 2 !== 0) {
      allPages.push({
        type: 'end',
        side: 'right',
        color: color
      });
    }

    return allPages;
  }

  // --- Render a single page's HTML ---
  function renderPage(page, pageNum) {
    const inner = document.createElement('div');
    inner.className = 'book-page-inner';

    if (!page) {
      return inner;
    }

    switch(page.type) {
      case 'cover':
        inner.innerHTML = `
          <div class="book-cover">
            <div class="book-cover-ornament">✦</div>
            <h2>${page.title}</h2>
            <div class="book-cover-divider"></div>
            <p class="book-cover-desc">${page.description}</p>
            <p class="book-cover-source">${page.totalTopics} topics across 8 levels</p>
          </div>`;
        break;

      case 'chapter':
        inner.innerHTML = `
          <div class="book-chapter-title-page">
            <div class="book-chapter-numeral">${toRoman(page.level)}</div>
            <div class="book-chapter-name">${page.levelName}</div>
            <div class="book-cover-divider"></div>
            <p class="book-chapter-subtitle">${page.topicCount} topic${page.topicCount !== 1 ? 's' : ''} in this chapter</p>
          </div>`;
        break;

      case 'topic':
        const t = page.topic;
        const done = isTopicDone(t.id);
        let body = t.body || '';
        // Wrap body content
        let topicHtml = `
          <div class="book-page-content">
            <div class="book-chapter-badge">Level ${page.level}</div>
            <span class="book-source-badge">${t.source}</span>
            <h3>${t.title}</h3>
            ${body}
            <button class="book-complete-btn ${done ? 'done' : ''}" 
              onclick="window._bookMarkComplete('${t.id}')">
              ${done ? '✓ Understood' : 'Mark as Understood'}
            </button>
          </div>`;
        inner.innerHTML = topicHtml;
        break;

      case 'end':
        inner.innerHTML = `
          <div class="book-cover" style="opacity:0.3">
            <div class="book-cover-ornament">✦</div>
            <h2 style="font-size:1rem">End of Book</h2>
            <div class="book-cover-divider"></div>
            <p class="book-cover-desc">Return to the shelf to explore more disciplines</p>
          </div>`;
        break;

      default:
        break;
    }

    // Page number
    if (page.type === 'topic' || page.type === 'chapter') {
      const numEl = document.createElement('div');
      numEl.className = 'book-page-num';
      numEl.textContent = pageNum;
      inner.appendChild(numEl);
    }

    return inner;
  }

  // --- Roman numeral helper ---
  function toRoman(num) {
    const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
    let result = '';
    for (let i = 0; i < vals.length; i++) {
      while (num >= vals[i]) {
        result += syms[i];
        num -= vals[i];
      }
    }
    return result;
  }

  // --- Create the book overlay ---
  function createBookOverlay(category, colorIdx) {
    const K = window.KNOWING;
    if (!K) return;

    currentBook = category;
    pages = buildPages(category, colorIdx);
    currentSpread = 0;
    totalSpreads = Math.ceil(pages.length / (isMobile ? 1 : 2));

    // Remove existing overlay
    const existing = document.getElementById('book-overlay');
    if (existing) existing.remove();

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'book-overlay';
    overlay.className = 'book-overlay';

    // Top bar
    const topbar = document.createElement('div');
    topbar.className = 'book-topbar';
    topbar.innerHTML = `
      <button class="book-back-btn" onclick="window._bookClose()">← Shelf</button>
      <span class="book-topbar-title">${category.title}</span>
      <div class="book-progress-bar">
        <div class="book-progress-fill" id="book-progress-fill" style="width:0%"></div>
      </div>
      <button class="book-toc-btn" onclick="window._bookToggleToc()" title="Contents">☰</button>`;
    overlay.appendChild(topbar);

    // TOC sidebar
    const toc = buildTocSidebar(category, colorIdx);
    overlay.appendChild(toc);

    // Book container
    const container = document.createElement('div');
    container.className = 'book-container';
    container.id = 'book-container';
    overlay.appendChild(container);

    // Bottom nav
    const bottomNav = document.createElement('div');
    bottomNav.className = 'book-bottom-nav';
    bottomNav.innerHTML = `<span class="book-page-indicator" id="book-page-indicator"></span>`;
    overlay.appendChild(bottomNav);

    document.body.appendChild(overlay);

    // Render initial spread
    renderSpread();

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyNav);

    // Touch/swipe support
    setupSwipe(container);

    // Update progress
    updateProgressBar();
  }

  // --- Build TOC sidebar ---
  function buildTocSidebar(category, colorIdx) {
    const toc = document.createElement('div');
    toc.className = 'book-toc';
    toc.id = 'book-toc';
    const groups = groupTopicsByLevel(category.topics);
    const progress = getProgress();

    let html = `
      <button class="book-toc-close" onclick="window._bookToggleToc()">✕</button>
      <h3>Contents</h3>
      <div class="book-toc-chapter">
        <div class="book-toc-chapter-title">Cover</div>
        <button class="book-toc-topic" onclick="window._bookGoToPage(0)">Title Page</button>
      </div>`;

    let pageIdx = 1; // page 0 is cover
    groups.forEach(group => {
      // Chapter title page
      pageIdx++; // chapter title page
      const chapterDone = group.topics.every(t => progress[t.id]);
      html += `
        <div class="book-toc-chapter">
          <div class="book-toc-chapter-title ${chapterDone ? 'completed' : ''}">
            ${toRoman(group.level)} — ${LEVEL_NAMES[group.level]}
          </div>`;
      group.topics.forEach(topic => {
        const done = !!progress[topic.id];
        const thisPageIdx = pageIdx;
        html += `
          <button class="book-toc-topic ${done ? 'completed' : ''}" 
            onclick="window._bookGoToPage(${thisPageIdx})">${topic.title}</button>`;
        pageIdx++;
      });
      html += '</div>';
    });

    toc.innerHTML = html;
    return toc;
  }

  // --- Render current spread ---
  function renderSpread() {
    const container = document.getElementById('book-container');
    if (!container) return;
    container.innerHTML = '';

    if (isMobile) {
      // Single page mode
      const page = pages[currentSpread];
      if (!page) return;

      const pageEl = document.createElement('div');
      pageEl.className = 'book-page left';
      pageEl.appendChild(renderPage(page, currentSpread));
      container.appendChild(pageEl);
    } else {
      // Two-page spread
      const leftIdx = currentSpread * 2;
      const rightIdx = currentSpread * 2 + 1;

      // Left page
      const leftEl = document.createElement('div');
      leftEl.className = 'book-page left';
      leftEl.id = 'book-left-page';
      leftEl.appendChild(renderPage(pages[leftIdx], leftIdx));
      container.appendChild(leftEl);

      // Right page
      const rightEl = document.createElement('div');
      rightEl.className = 'book-page right';
      rightEl.id = 'book-right-page';
      rightEl.appendChild(renderPage(pages[rightIdx], rightIdx));
      container.appendChild(rightEl);

      // Spine shadow
      const spine = document.createElement('div');
      spine.className = 'book-spine-shadow';
      container.appendChild(spine);
    }

    // Navigation arrows
    const prevBtn = document.createElement('button');
    prevBtn.className = 'book-nav prev' + (currentSpread === 0 ? ' disabled' : '');
    prevBtn.innerHTML = '‹';
    prevBtn.onclick = () => { if (currentSpread > 0) turnPage('prev'); };
    container.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.className = 'book-nav next' + (currentSpread >= totalSpreads - 1 ? ' disabled' : '');
    nextBtn.innerHTML = '›';
    nextBtn.onclick = () => { if (currentSpread < totalSpreads - 1) turnPage('next'); };
    container.appendChild(nextBtn);

    // Update indicator
    updatePageIndicator();
    updateProgressBar();
    highlightTocItem();
  }

  // --- Page turn with animation ---
  function turnPage(direction) {
    if (isAnimating) return;
    isAnimating = true;

    if (isMobile) {
      // Simple fade on mobile
      const container = document.getElementById('book-container');
      container.style.opacity = '0';
      container.style.transition = 'opacity 0.2s';

      setTimeout(() => {
        if (direction === 'next') currentSpread++;
        else currentSpread--;
        renderSpread();
        container.style.opacity = '1';
        setTimeout(() => {
          isAnimating = false;
        }, 200);
      }, 200);
    } else {
      // Desktop: animated page turn
      const rightPage = document.getElementById('book-right-page');
      if (direction === 'next' && rightPage) {
        rightPage.classList.add('turning-forward');
        setTimeout(() => {
          currentSpread++;
          renderSpread();
          isAnimating = false;
        }, 550);
      } else if (direction === 'prev') {
        // Going back: animate from left
        const leftPage = document.getElementById('book-left-page');
        if (leftPage) {
          leftPage.style.transformOrigin = 'right center';
          leftPage.classList.add('turning-back');
          setTimeout(() => {
            currentSpread--;
            renderSpread();
            isAnimating = false;
          }, 550);
        } else {
          currentSpread--;
          renderSpread();
          isAnimating = false;
        }
      } else {
        currentSpread += (direction === 'next' ? 1 : -1);
        renderSpread();
        isAnimating = false;
      }
    }
  }

  // --- Go to specific page index ---
  function goToPage(pageIdx) {
    if (isMobile) {
      currentSpread = Math.min(pageIdx, pages.length - 1);
    } else {
      currentSpread = Math.min(Math.floor(pageIdx / 2), totalSpreads - 1);
    }
    currentSpread = Math.max(0, currentSpread);
    closeToc();
    renderSpread();
  }

  // --- Keyboard navigation ---
  function handleKeyNav(e) {
    if (!document.getElementById('book-overlay')) return;
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      if (currentSpread < totalSpreads - 1) turnPage('next');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (currentSpread > 0) turnPage('prev');
    } else if (e.key === 'Escape') {
      closeBook();
    }
  }

  // --- Swipe support ---
  function setupSwipe(el) {
    let startX = 0;
    let startY = 0;

    el.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    el.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0 && currentSpread < totalSpreads - 1) turnPage('next');
        else if (dx > 0 && currentSpread > 0) turnPage('prev');
      }
    }, { passive: true });
  }

  // --- Update bottom indicator ---
  function updatePageIndicator() {
    const el = document.getElementById('book-page-indicator');
    if (!el) return;
    if (isMobile) {
      el.textContent = `${currentSpread + 1} / ${pages.length}`;
    } else {
      const leftIdx = currentSpread * 2;
      const rightIdx = Math.min(currentSpread * 2 + 1, pages.length - 1);
      el.textContent = `${leftIdx + 1}–${rightIdx + 1} / ${pages.length}`;
    }
  }

  // --- Update progress bar ---
  function updateProgressBar() {
    const fill = document.getElementById('book-progress-fill');
    if (!fill || !currentBook) return;
    const progress = getProgress();
    const done = currentBook.topics.filter(t => progress[t.id]).length;
    const pct = currentBook.topics.length > 0 ? (done / currentBook.topics.length * 100) : 0;
    fill.style.width = pct + '%';
  }

  // --- Highlight current TOC item ---
  function highlightTocItem() {
    const toc = document.getElementById('book-toc');
    if (!toc) return;
    toc.querySelectorAll('.book-toc-topic').forEach(btn => {
      btn.classList.remove('active');
    });
    // Find current topic
    if (isMobile) {
      const page = pages[currentSpread];
      if (page && page.type === 'topic') {
        const topicId = page.topic.id;
        toc.querySelectorAll('.book-toc-topic').forEach(btn => {
          if (btn.textContent.trim() === page.topic.title) {
            btn.classList.add('active');
          }
        });
      }
    } else {
      const leftIdx = currentSpread * 2;
      const rightIdx = currentSpread * 2 + 1;
      [leftIdx, rightIdx].forEach(idx => {
        const page = pages[idx];
        if (page && page.type === 'topic') {
          toc.querySelectorAll('.book-toc-topic').forEach(btn => {
            if (btn.textContent.trim() === page.topic.title) {
              btn.classList.add('active');
            }
          });
        }
      });
    }
  }

  // --- Toggle TOC ---
  function toggleToc() {
    const toc = document.getElementById('book-toc');
    if (!toc) return;
    tocOpen = !tocOpen;
    toc.classList.toggle('open', tocOpen);
  }
  function closeToc() {
    const toc = document.getElementById('book-toc');
    if (toc) toc.classList.remove('open');
    tocOpen = false;
  }

  // --- Close book ---
  function closeBook() {
    const overlay = document.getElementById('book-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s';
      setTimeout(() => overlay.remove(), 300);
    }
    document.removeEventListener('keydown', handleKeyNav);
    currentBook = null;
    pages = [];
    // Refresh the bookshelf
    if (typeof window.showKnowing === 'function') {
      window.showKnowing();
    }
  }

  // --- Mark topic complete ---
  function bookMarkComplete(topicId) {
    markTopicDone(topicId);
    // Re-render current spread to update button state
    renderSpread();
    // Rebuild TOC to show completed items
    if (currentBook) {
      const colorIdx = window.KNOWING.categories.indexOf(currentBook);
      const toc = buildTocSidebar(currentBook, colorIdx);
      const existingToc = document.getElementById('book-toc');
      if (existingToc) {
        existingToc.replaceWith(toc);
      }
    }
    updateProgressBar();
  }

  // --- Public API ---
  window._bookClose = closeBook;
  window._bookToggleToc = toggleToc;
  window._bookGoToPage = goToPage;
  window._bookMarkComplete = bookMarkComplete;

  // Main entry point — called when clicking a book on the shelf
  window.openBook = function(categoryId) {
    const K = window.KNOWING;
    if (!K) return;
    const cat = K.categories.find(c => c.id === categoryId);
    if (!cat) return;
    const colorIdx = K.categories.indexOf(cat);
    checkMobile();
    createBookOverlay(cat, colorIdx);
  };

})();
