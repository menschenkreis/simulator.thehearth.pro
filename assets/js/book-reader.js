// ═══════════════════════════════════════════════════
// THE HEARTH — Digital Book Reader v2
// Parchment pages, interleaved visuals, ADD-friendly
// ═══════════════════════════════════════════════════

(function() {
  'use strict';

  const BOOK_COLORS = [
    '#8B4513','#4A6741','#5B3A6B','#2C5F7C',
    '#8B6914','#6B3A3A','#3A5B6B','#5B4A3A','#6B5B3A'
  ];

  const LEVEL_NAMES = [
    '', 'I — Origin', 'II — Duality', 'III — Creation',
    'IV — Structure', 'V — Change', 'VI — Harmony',
    'VII — Wisdom', 'VIII — Power'
  ];

  // Inspirational quotes for breathing pages
  const QUOTES = [
    { text: 'Music is the space between the notes.', src: 'Claude Debussy' },
    { text: 'The guitar is a small orchestra.', src: 'Andrés Segovia' },
    { text: 'Practice slowly, learn quickly.', src: 'Classical proverb' },
    { text: 'One hour of focused practice beats ten of noodling.', src: 'The Hearth' },
    { text: 'Rhythm is the soul of music.', src: 'Traditional' },
    { text: 'The more you sweat in practice, the less you bleed in performance.', src: 'Traditional' },
    { text: 'Play the music, not the instrument.', src: 'Keith Richards' },
    { text: 'Every master was once a disaster.', src: 'The Hearth' },
    { text: 'Your ears are your best teacher.', src: 'Traditional' },
    { text: 'The silence between the notes is where the magic lives.', src: 'The Hearth' }
  ];

  let currentBook = null;
  let currentSpread = 0;
  let totalSpreads = 0;
  let pages = [];
  let isAnimating = false;
  let tocOpen = false;
  let isMobile = false;
  let quoteIdx = 0;

  function checkMobile() {
    isMobile = window.innerWidth <= 700;
  }
  checkMobile();
  window.addEventListener('resize', checkMobile);

  // --- Progress ---
  function getProgress() {
    return JSON.parse(localStorage.getItem('hearth-knowing-progress') || '{}');
  }
  function markTopicDone(id) {
    const p = getProgress();
    p[id] = true;
    localStorage.setItem('hearth-knowing-progress', JSON.stringify(p));
  }
  function isDone(id) { return !!getProgress()[id]; }

  // --- Level mapping ---
  function diffToLevel(d) {
    if (d === 1) return 1;
    if (d === 2) return 3;
    if (d === 3) return 5;
    return 1;
  }

  // --- Roman numerals ---
  function toRoman(n) {
    const v = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    const s = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
    let r = '';
    for (let i = 0; i < v.length; i++) { while (n >= v[i]) { r += s[i]; n -= v[i]; } }
    return r;
  }

  // --- Group topics by level ---
  function groupTopics(topics) {
    const levels = {};
    topics.forEach(t => {
      const lvl = diffToLevel(t.difficulty);
      if (!levels[lvl]) levels[lvl] = [];
      levels[lvl].push(t);
    });
    return Object.keys(levels).map(Number).sort((a,b) => a - b).map(l => ({ level: l, topics: levels[l] }));
  }

  // --- Get next quote ---
  function nextQuote() {
    const q = QUOTES[quoteIdx % QUOTES.length];
    quoteIdx++;
    return q;
  }

  // ═══════════════════════════════════════
  // PAGE BUILDER — The magic happens here
  // ═══════════════════════════════════════

  function buildPages(category) {
    const groups = groupTopics(category.topics);
    const allPages = [];

    // Cover
    allPages.push({ type: 'cover', title: category.title, desc: category.description, total: category.topics.length });

    // After cover, a breathing quote page
    allPages.push({ type: 'quote', quote: nextQuote() });

    groups.forEach((group, gi) => {
      // Chapter title
      allPages.push({
        type: 'chapter',
        level: group.level,
        name: LEVEL_NAMES[group.level],
        count: group.topics.length
      });

      group.topics.forEach((topic, ti) => {
        // Break topic into sub-pages for ADD-friendly consumption
        const subPages = breakTopicIntoPages(topic, group.level);
        subPages.forEach(sp => allPages.push(sp));

        // Between topics: insert a visual/breathing page
        if (ti < group.topics.length - 1) {
          allPages.push({ type: 'quote', quote: nextQuote() });
        }
      });

      // Between chapters: a quote page
      if (gi < groups.length - 1) {
        allPages.push({ type: 'quote', quote: nextQuote() });
      }
    });

    // End page
    allPages.push({ type: 'end' });

    // Pad to even
    if (allPages.length % 2 !== 0) {
      allPages.push({ type: 'end' });
    }

    return allPages;
  }

  // --- Break a topic into digestible pages ---
  function breakTopicIntoPages(topic, level) {
    const result = [];

    // Parse the topic body into paragraphs
    const bodyHtml = topic.body || '';
    const paragraphs = parseParagraphs(bodyHtml);

    // Page 1: Concept intro — title + first short explanation
    const intro = paragraphs.length > 0 ? paragraphs[0] : '';
    result.push({
      type: 'concept',
      topic: topic,
      level: level,
      title: topic.title,
      source: topic.source,
      body: intro
    });

    // Page 2: Diagram or video placeholder for this concept
    result.push({
      type: 'visual',
      topic: topic,
      level: level,
      title: topic.title,
      visualType: getVisualType(topic)
    });

    // Page 3+: Remaining content split into digestible chunks (2-3 paragraphs per page)
    if (paragraphs.length > 1) {
      const remaining = paragraphs.slice(1);
      const chunks = chunkArray(remaining, 2);
      chunks.forEach((chunk, i) => {
        result.push({
          type: 'content',
          topic: topic,
          level: level,
          title: i === 0 ? topic.title : null, // only show title on first continuation
          source: i === 0 ? topic.source : null,
          body: chunk.join('')
        });
      });
    }

    // Final page: "Try it" action + complete button
    result.push({
      type: 'action',
      topic: topic,
      level: level,
      title: topic.title,
      done: isDone(topic.id)
    });

    return result;
  }

  // --- Parse HTML body into individual paragraphs ---
  function parseParagraphs(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    const paras = [];
    div.querySelectorAll('p').forEach(p => {
      const text = p.innerHTML.trim();
      if (text) paras.push('<p>' + text + '</p>');
    });
    // If no <p> tags found, treat the whole thing as one paragraph
    if (paras.length === 0 && html.trim()) {
      paras.push(html.trim());
    }
    return paras;
  }

  // --- Chunk array into groups ---
  function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }

  // --- Determine visual type for a topic ---
  function getVisualType(topic) {
    const id = topic.id || '';
    if (id.includes('chord') || id.includes('triad')) return 'chord-diagram';
    if (id.includes('scale') || id.includes('fretboard')) return 'fretboard';
    if (id.includes('rhythm') || id.includes('time') || id.includes('subdiv')) return 'rhythm-visual';
    if (id.includes('arpeggio')) return 'arpeggio-diagram';
    if (id.includes('pick')) return 'technique-visual';
    if (id.includes('fingerstyle') || id.includes('finger')) return 'technique-visual';
    return 'video'; // default: show video placeholder
  }

  // ═══════════════════════════════════════
  // PAGE RENDERER
  // ═══════════════════════════════════════

  function renderPage(page, pageNum) {
    const inner = document.createElement('div');
    inner.className = 'book-page-inner';

    if (!page) return inner;

    switch(page.type) {
      case 'cover':
        inner.innerHTML = `
          <div class="book-cover">
            <div class="book-cover-ornament">✦</div>
            <h2>${page.title}</h2>
            <div class="book-cover-divider"></div>
            <p class="book-cover-desc">${page.desc}</p>
            <p class="book-cover-source">${page.total} topics · 8 levels</p>
          </div>`;
        break;

      case 'chapter':
        inner.innerHTML = `
          <div class="book-chapter-title-page">
            <div class="book-chapter-numeral">${toRoman(page.level)}</div>
            <div class="book-chapter-name">${(page.name || '').split(' — ')[1] || page.name}</div>
            <div class="book-cover-divider"></div>
            <p class="book-chapter-subtitle">${page.count} topic${page.count !== 1 ? 's' : ''} in this chapter</p>
          </div>`;
        break;

      case 'concept':
        inner.innerHTML = `
          <div class="book-concept">
            <div class="book-concept-label">Concept</div>
            <div class="book-chapter-badge">Level ${page.level}</div>
            ${page.source ? '<span class="book-source-badge">' + page.source + '</span>' : ''}
            <h3>${page.title}</h3>
            ${page.body}
          </div>`;
        break;

      case 'visual':
        inner.innerHTML = renderVisualPage(page);
        break;

      case 'content':
        inner.innerHTML = `
          <div class="book-concept">
            ${page.title ? '<h3 style="font-size:1rem;color:#5a4a3a">' + page.title + ' (continued)</h3>' : ''}
            ${page.body}
          </div>`;
        break;

      case 'action':
        inner.innerHTML = renderActionPage(page);
        break;

      case 'quote':
        inner.innerHTML = `
          <div class="book-quote-page">
            <div class="book-cover-divider" style="margin-bottom:20px"></div>
            <p class="book-quote-text">"${page.quote.text}"</p>
            <p class="book-quote-source">— ${page.quote.src}</p>
            <div class="book-cover-divider" style="margin-top:20px"></div>
          </div>`;
        break;

      case 'end':
        inner.innerHTML = `
          <div class="book-end-page">
            <div class="book-cover-ornament">✦</div>
            <h2 style="font-family:Cinzel;font-size:0.95rem;color:#8a7a6a">End of Book</h2>
            <p style="font-size:0.75rem;color:#9a8a7a;margin-top:8px">Return to the shelf</p>
          </div>`;
        break;
    }

    // Page number
    if (['concept','visual','content','action','chapter'].includes(page.type)) {
      const num = document.createElement('div');
      num.className = 'book-page-num';
      num.textContent = pageNum;
      inner.appendChild(num);
    }

    return inner;
  }

  // --- Render visual page ---
  function renderVisualPage(page) {
    const vt = page.visualType;

    if (vt === 'video') {
      return `
        <div class="book-video-page">
          <div class="book-video-page-label">Watch & Listen</div>
          <div class="book-video-wrap">
            <div class="book-video-placeholder" onclick="this.style.display='none';this.nextElementSibling.style.display='block'">
              <div class="book-video-play">▶</div>
            </div>
            <div style="display:none;position:absolute;top:0;left:0;width:100%;height:100%">
              <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#1a1714;color:#8a7a6a;font-family:DM Sans;font-size:0.8rem">
                Video content coming soon
              </div>
            </div>
          </div>
          <p class="book-video-caption">Watch this concept in action. Seeing it makes it click.</p>
        </div>`;
    }

    // SVG diagram types
    const diagrams = {
      'chord-diagram': renderChordDiagram(),
      'fretboard': renderFretboardDiagram(),
      'rhythm-visual': renderRhythmDiagram(),
      'arpeggio-diagram': renderArpeggioDiagram(),
      'technique-visual': renderTechniqueDiagram()
    };

    return `
      <div class="book-diagram-page">
        <div class="book-diagram-label">Visual Reference</div>
        <div class="book-diagram-box">
          ${diagrams[vt] || diagrams['chord-diagram']}
        </div>
        <p class="book-diagram-caption">Study this diagram, then try it on your guitar.</p>
      </div>`;
  }

  // --- SVG Diagrams ---
  function renderChordDiagram() {
    return `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="100" height="120" fill="none" stroke="#b8963a" stroke-width="1" rx="2"/>
      <!-- Frets -->
      <line x1="10" y1="35" x2="110" y2="35" stroke="#b8963a" stroke-width="0.8"/>
      <line x1="10" y1="60" x2="110" y2="60" stroke="#b8963a" stroke-width="0.5"/>
      <line x1="10" y1="85" x2="110" y2="85" stroke="#b8963a" stroke-width="0.5"/>
      <line x1="10" y1="110" x2="110" y2="110" stroke="#b8963a" stroke-width="0.5"/>
      <!-- Strings -->
      <line x1="25" y1="10" x2="25" y2="130" stroke="#8a7a6a" stroke-width="0.8"/>
      <line x1="42" y1="10" x2="42" y2="130" stroke="#8a7a6a" stroke-width="0.7"/>
      <line x1="59" y1="10" x2="59" y2="130" stroke="#8a7a6a" stroke-width="0.6"/>
      <line x1="76" y1="10" x2="76" y2="130" stroke="#8a7a6a" stroke-width="0.5"/>
      <line x1="93" y1="10" x2="93" y2="130" stroke="#8a7a6a" stroke-width="0.4"/>
      <!-- Example dots -->
      <circle cx="42" cy="48" r="6" fill="#b8963a" opacity="0.7"/>
      <circle cx="59" cy="48" r="6" fill="#b8963a" opacity="0.7"/>
      <circle cx="76" cy="73" r="6" fill="#b8963a" opacity="0.7"/>
      <!-- Open strings -->
      <text x="25" y="8" text-anchor="middle" font-size="8" fill="#8a7a6a" font-family="JetBrains Mono">○</text>
      <text x="93" y="8" text-anchor="middle" font-size="8" fill="#8a7a6a" font-family="JetBrains Mono">○</text>
      <!-- Label -->
      <text x="60" y="145" text-anchor="middle" font-size="7" fill="#8a7a6a" font-family="JetBrains Mono">CHORD SHAPE</text>
    </svg>`;
  }

  function renderFretboardDiagram() {
    return `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
      <!-- Frets -->
      <line x1="20" y1="10" x2="20" y2="50" stroke="#8a7a6a" stroke-width="1.5"/>
      <line x1="55" y1="10" x2="55" y2="50" stroke="#b8963a" stroke-width="0.5"/>
      <line x1="90" y1="10" x2="90" y2="50" stroke="#b8963a" stroke-width="0.5"/>
      <line x1="125" y1="10" x2="125" y2="50" stroke="#b8963a" stroke-width="0.5"/>
      <line x1="160" y1="10" x2="160" y2="50" stroke="#b8963a" stroke-width="0.5"/>
      <line x1="195" y1="10" x2="195" y2="50" stroke="#b8963a" stroke-width="0.5"/>
      <!-- Strings -->
      <line x1="20" y1="14" x2="195" y2="14" stroke="#8a7a6a" stroke-width="0.8"/>
      <line x1="20" y1="22" x2="195" y2="22" stroke="#8a7a6a" stroke-width="0.7"/>
      <line x1="20" y1="30" x2="195" y2="30" stroke="#8a7a6a" stroke-width="0.6"/>
      <line x1="20" y1="38" x2="195" y2="38" stroke="#8a7a6a" stroke-width="0.5"/>
      <line x1="20" y1="46" x2="195" y2="46" stroke="#8a7a6a" stroke-width="0.4"/>
      <!-- Scale dots -->
      <circle cx="37" cy="14" r="4" fill="#b8963a" opacity="0.6"/>
      <circle cx="72" cy="22" r="4" fill="#b8963a" opacity="0.6"/>
      <circle cx="107" cy="30" r="4" fill="#b8963a" opacity="0.6"/>
      <circle cx="142" cy="38" r="4" fill="#b8963a" opacity="0.6"/>
      <circle cx="72" cy="46" r="4" fill="#b8963a" opacity="0.6"/>
      <!-- Root note -->
      <circle cx="37" cy="30" r="5" fill="#b8963a"/>
      <text x="37" y="33" text-anchor="middle" font-size="5" fill="white" font-family="JetBrains Mono" font-weight="bold">R</text>
      <!-- Label -->
      <text x="107" y="58" text-anchor="middle" font-size="6" fill="#8a7a6a" font-family="JetBrains Mono">FRETBOARD MAP</text>
    </svg>`;
  }

  function renderRhythmDiagram() {
    return `<svg viewBox="0 0 180 80" xmlns="http://www.w3.org/2000/svg">
      <!-- Beat markers -->
      <text x="20" y="20" font-size="8" fill="#8a7a6a" font-family="JetBrains Mono">1</text>
      <text x="60" y="20" font-size="8" fill="#8a7a6a" font-family="JetBrains Mono">2</text>
      <text x="100" y="20" font-size="8" fill="#8a7a6a" font-family="JetBrains Mono">3</text>
      <text x="140" y="20" font-size="8" fill="#8a7a6a" font-family="JetBrains Mono">4</text>
      <!-- Grid lines -->
      <line x1="20" y1="25" x2="160" y2="25" stroke="#b8963a" stroke-width="0.3"/>
      <line x1="20" y1="45" x2="160" y2="45" stroke="#b8963a" stroke-width="0.3"/>
      <!-- Quarter notes -->
      <rect x="17" y="26" width="6" height="16" rx="1" fill="#b8963a" opacity="0.7"/>
      <rect x="57" y="26" width="6" height="16" rx="1" fill="#b8963a" opacity="0.7"/>
      <rect x="97" y="26" width="6" height="16" rx="1" fill="#b8963a" opacity="0.7"/>
      <rect x="137" y="26" width="6" height="16" rx="1" fill="#b8963a" opacity="0.7"/>
      <!-- 8th notes below -->
      <rect x="17" y="48" width="4" height="12" rx="1" fill="#8a7a6a" opacity="0.5"/>
      <rect x="37" y="48" width="4" height="12" rx="1" fill="#8a7a6a" opacity="0.5"/>
      <rect x="57" y="48" width="4" height="12" rx="1" fill="#8a7a6a" opacity="0.5"/>
      <rect x="77" y="48" width="4" height="12" rx="1" fill="#8a7a6a" opacity="0.5"/>
      <rect x="97" y="48" width="4" height="12" rx="1" fill="#8a7a6a" opacity="0.5"/>
      <rect x="117" y="48" width="4" height="12" rx="1" fill="#8a7a6a" opacity="0.5"/>
      <rect x="137" y="48" width="4" height="12" rx="1" fill="#8a7a6a" opacity="0.5"/>
      <rect x="157" y="48" width="4" height="12" rx="1" fill="#8a7a6a" opacity="0.5"/>
      <!-- Labels -->
      <text x="80" y="38" text-anchor="middle" font-size="5" fill="#b8963a" font-family="JetBrains Mono">Quarter Notes</text>
      <text x="90" y="70" text-anchor="middle" font-size="5" fill="#8a7a6a" font-family="JetBrains Mono">8th Notes</text>
    </svg>`;
  }

  function renderArpeggioDiagram() {
    return `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Upward arc representing arpeggio shape -->
      <path d="M 20 100 Q 80 20 140 100" fill="none" stroke="#b8963a" stroke-width="1.5" opacity="0.5"/>
      <!-- Notes along the arc -->
      <circle cx="20" cy="100" r="8" fill="#b8963a" opacity="0.7"/>
      <text x="20" y="103" text-anchor="middle" font-size="6" fill="white" font-family="JetBrains Mono">1</text>
      <circle cx="50" cy="68" r="8" fill="#b8963a" opacity="0.6"/>
      <text x="50" y="71" text-anchor="middle" font-size="6" fill="white" font-family="JetBrains Mono">3</text>
      <circle cx="80" cy="48" r="8" fill="#b8963a" opacity="0.7"/>
      <text x="80" y="51" text-anchor="middle" font-size="6" fill="white" font-family="JetBrains Mono">5</text>
      <circle cx="110" cy="68" r="8" fill="#b8963a" opacity="0.6"/>
      <text x="110" y="71" text-anchor="middle" font-size="6" fill="white" font-family="JetBrains Mono">1</text>
      <circle cx="140" cy="100" r="8" fill="#b8963a" opacity="0.5"/>
      <text x="140" y="103" text-anchor="middle" font-size="6" fill="white" font-family="JetBrains Mono">3</text>
      <!-- Arrows -->
      <path d="M 30 95 L 45 73" stroke="#8a7a6a" stroke-width="0.5" marker-end="url(#arrow)"/>
      <path d="M 58 63 L 73 52" stroke="#8a7a6a" stroke-width="0.5"/>
      <!-- Label -->
      <text x="80" y="116" text-anchor="middle" font-size="6" fill="#8a7a6a" font-family="JetBrains Mono">1-3-5 ARPEGGIO</text>
    </svg>`;
  }

  function renderTechniqueDiagram() {
    return `<svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Hand silhouette placeholder -->
      <ellipse cx="80" cy="50" rx="50" ry="35" fill="none" stroke="#b8963a" stroke-width="1" opacity="0.3"/>
      <!-- Finger positions -->
      <circle cx="50" cy="38" r="5" fill="#b8963a" opacity="0.5"/>
      <circle cx="62" cy="32" r="5" fill="#b8963a" opacity="0.6"/>
      <circle cx="74" cy="30" r="5" fill="#b8963a" opacity="0.7"/>
      <circle cx="86" cy="32" r="5" fill="#b8963a" opacity="0.6"/>
      <circle cx="98" cy="38" r="5" fill="#b8963a" opacity="0.5"/>
      <!-- Thumb -->
      <ellipse cx="80" cy="62" rx="12" ry="6" fill="#b8963a" opacity="0.3"/>
      <!-- Labels -->
      <text x="50" y="26" text-anchor="middle" font-size="5" fill="#8a7a6a" font-family="JetBrains Mono">i</text>
      <text x="62" y="24" text-anchor="middle" font-size="5" fill="#8a7a6a" font-family="JetBrains Mono">m</text>
      <text x="74" y="22" text-anchor="middle" font-size="5" fill="#8a7a6a" font-family="JetBrains Mono">a</text>
      <text x="80" y="82" text-anchor="middle" font-size="6" fill="#8a7a6a" font-family="JetBrains Mono">TECHNIQUE MAP</text>
    </svg>`;
  }

  // --- Render action/try-it page ---
  function renderActionPage(page) {
    const done = isDone(page.topic.id);
    const steps = getActionSteps(page.topic);
    let stepsHtml = steps.map((s, i) =>
      `<div class="book-action-step">
        <div class="book-action-num">${i+1}</div>
        <div class="book-action-step-text">${s}</div>
      </div>`
    ).join('');

    return `
      <div class="book-action-page">
        <div class="book-action-icon">🎸</div>
        <div class="book-action-title">Try It Now</div>
        <div class="book-action-desc">Pick up your guitar and work through these steps:</div>
        <div class="book-action-steps">${stepsHtml}</div>
        <button class="book-complete-btn ${done ? 'done' : ''}"
          onclick="window._bookMarkComplete('${page.topic.id}')">
          ${done ? '✓ Understood' : 'Mark as Understood'}
        </button>
      </div>`;
  }

  // --- Generate action steps from topic ---
  function getActionSteps(topic) {
    const id = topic.id || '';
    if (id.includes('time-signature')) return [
      'Tap your foot in 4/4 time for 30 seconds',
      'Switch to 3/4 (waltz feel) — count 1-2-3',
      'Try 6/8 — count in two groups of three'
    ];
    if (id.includes('subdiv')) return [
      'Set metronome to 60 BPM',
      'Play quarter notes for 1 minute',
      'Switch to 8th notes, then 16ths',
      'Notice which subdivision feels wobbly'
    ];
    if (id.includes('syncop')) return [
      'Mute all strings with your fretting hand',
      'Strum steady 16th notes',
      'Accent only the "and" beats (off-beats)',
      'Feel the groove shift'
    ];
    if (id.includes('chord') || id.includes('triad')) return [
      'Play the chord shape slowly',
      'Hold each note, check it rings clear',
      'Switch between two chord shapes 10x',
      'Play along with a slow backing track'
    ];
    if (id.includes('scale')) return [
      'Play the scale ascending, one note at a time',
      'Use alternate picking (down-up)',
      'Play it descending',
      'Try it with a metronome at 60 BPM'
    ];
    // Default
    return [
      'Read through the concept one more time',
      'Try it on your guitar right now',
      'Repeat 3 times slowly',
      'Come back tomorrow and try again from memory'
    ];
  }

  // ═══════════════════════════════════════
  // BOOK OVERLAY
  // ═══════════════════════════════════════

  function createBookOverlay(category, colorIdx) {
    const K = window.KNOWING;
    if (!K) return;

    currentBook = category;
    quoteIdx = 0;
    pages = buildPages(category);
    currentSpread = 0;
    totalSpreads = Math.ceil(pages.length / (isMobile ? 1 : 2));

    const existing = document.getElementById('book-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'book-overlay';
    overlay.className = 'book-overlay';

    // Topbar
    overlay.innerHTML = `
      <div class="book-topbar">
        <button class="book-back-btn" onclick="window._bookClose()">← Shelf</button>
        <span class="book-topbar-title">${category.title}</span>
        <div class="book-progress-bar">
          <div class="book-progress-fill" id="book-progress-fill" style="width:0%"></div>
        </div>
        <button class="book-toc-btn" onclick="window._bookToggleToc()">☰</button>
      </div>
      <div class="book-toc" id="book-toc">${buildTocHtml(category)}</div>
      <div class="book-container" id="book-container"></div>
      <div class="book-bottom-nav">
        <span class="book-page-indicator" id="book-page-indicator"></span>
      </div>`;

    document.body.appendChild(overlay);
    renderSpread();
    document.addEventListener('keydown', handleKeyNav);
    setupSwipe(document.getElementById('book-container'));
    updateProgress();
  }

  // --- TOC HTML ---
  function buildTocHtml(category) {
    const groups = groupTopics(category.topics);
    const progress = getProgress();
    let html = `
      <button class="book-toc-close" onclick="window._bookToggleToc()">✕</button>
      <h3>Contents</h3>
      <div class="book-toc-chapter">
        <div class="book-toc-chapter-title">Cover</div>
        <button class="book-toc-topic" onclick="window._bookGoToPage(0)">Title Page</button>
      </div>`;

    let pIdx = 2; // cover=0, quote=1
    groups.forEach(group => {
      pIdx++; // chapter title
      const chapterDone = group.topics.every(t => progress[t.id]);
      html += `<div class="book-toc-chapter">
        <div class="book-toc-chapter-title ${chapterDone ? 'completed' : ''}">${LEVEL_NAMES[group.level]}</div>`;
      group.topics.forEach(topic => {
        const done = !!progress[topic.id];
        const thisIdx = pIdx;
        html += `<button class="book-toc-topic ${done ? 'completed' : ''}" onclick="window._bookGoToPage(${thisIdx})">${topic.title}</button>`;
        // concept + visual + content pages + action page
        const subCount = countTopicPages(topic);
        pIdx += subCount;
        // quote between topics
        pIdx++;
      });
      pIdx++; // quote between chapters
      html += '</div>';
    });

    return html;
  }

  function countTopicPages(topic) {
    const paras = parseParagraphs(topic.body || '');
    const contentPages = Math.max(0, Math.ceil((paras.length - 1) / 2));
    return 1 + 1 + contentPages + 1; // concept + visual + content pages + action
  }

  // ═══════════════════════════════════════
  // SPREAD RENDERING
  // ═══════════════════════════════════════

  function renderSpread() {
    const container = document.getElementById('book-container');
    if (!container) return;
    container.innerHTML = '';

    if (isMobile) {
      const page = pages[currentSpread];
      if (!page) return;
      const el = document.createElement('div');
      el.className = 'book-page left';
      el.appendChild(renderPage(page, currentSpread));
      container.appendChild(el);
    } else {
      const li = currentSpread * 2;
      const ri = currentSpread * 2 + 1;

      const leftEl = document.createElement('div');
      leftEl.className = 'book-page left';
      leftEl.id = 'book-left-page';
      leftEl.appendChild(renderPage(pages[li], li));
      container.appendChild(leftEl);

      const rightEl = document.createElement('div');
      rightEl.className = 'book-page right';
      rightEl.id = 'book-right-page';
      rightEl.appendChild(renderPage(pages[ri], ri));
      container.appendChild(rightEl);

      const spine = document.createElement('div');
      spine.className = 'book-spine-shadow';
      container.appendChild(spine);
    }

    // Nav buttons
    const prev = document.createElement('button');
    prev.className = 'book-nav prev' + (currentSpread === 0 ? ' disabled' : '');
    prev.innerHTML = '‹';
    prev.onclick = () => { if (currentSpread > 0) turnPage('prev'); };
    container.appendChild(prev);

    const next = document.createElement('button');
    next.className = 'book-nav next' + (currentSpread >= totalSpreads - 1 ? ' disabled' : '');
    next.innerHTML = '›';
    next.onclick = () => { if (currentSpread < totalSpreads - 1) turnPage('next'); };
    container.appendChild(next);

    updateIndicator();
    updateProgress();
    highlightToc();
  }

  function turnPage(dir) {
    if (isAnimating) return;
    isAnimating = true;

    if (isMobile) {
      const c = document.getElementById('book-container');
      c.style.opacity = '0';
      c.style.transition = 'opacity 0.2s';
      setTimeout(() => {
        currentSpread += dir === 'next' ? 1 : -1;
        renderSpread();
        c.style.opacity = '1';
        setTimeout(() => isAnimating = false, 200);
      }, 200);
    } else {
      if (dir === 'next') {
        const rp = document.getElementById('book-right-page');
        if (rp) {
          rp.classList.add('turning-forward');
          setTimeout(() => { currentSpread++; renderSpread(); isAnimating = false; }, 450);
        } else { currentSpread++; renderSpread(); isAnimating = false; }
      } else {
        const lp = document.getElementById('book-left-page');
        if (lp) {
          lp.style.transformOrigin = 'right center';
          lp.classList.add('turning-back');
          setTimeout(() => { currentSpread--; renderSpread(); isAnimating = false; }, 450);
        } else { currentSpread--; renderSpread(); isAnimating = false; }
      }
    }
  }

  function goToPage(idx) {
    if (isMobile) currentSpread = Math.min(idx, pages.length - 1);
    else currentSpread = Math.min(Math.floor(idx / 2), totalSpreads - 1);
    currentSpread = Math.max(0, currentSpread);
    closeToc();
    renderSpread();
  }

  function handleKeyNav(e) {
    if (!document.getElementById('book-overlay')) return;
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      if (currentSpread < totalSpreads - 1) turnPage('next');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (currentSpread > 0) turnPage('prev');
    } else if (e.key === 'Escape') closeBook();
  }

  function setupSwipe(el) {
    if (!el) return;
    let sx = 0, sy = 0;
    el.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0 && currentSpread < totalSpreads - 1) turnPage('next');
        else if (dx > 0 && currentSpread > 0) turnPage('prev');
      }
    }, { passive: true });
  }

  function updateIndicator() {
    const el = document.getElementById('book-page-indicator');
    if (!el) return;
    if (isMobile) el.textContent = `${currentSpread + 1} / ${pages.length}`;
    else {
      const l = currentSpread * 2;
      const r = Math.min(currentSpread * 2 + 1, pages.length - 1);
      el.textContent = `${l + 1}–${r + 1} / ${pages.length}`;
    }
  }

  function updateProgress() {
    const fill = document.getElementById('book-progress-fill');
    if (!fill || !currentBook) return;
    const p = getProgress();
    const done = currentBook.topics.filter(t => p[t.id]).length;
    fill.style.width = (currentBook.topics.length > 0 ? (done / currentBook.topics.length * 100) : 0) + '%';
  }

  function highlightToc() {
    const toc = document.getElementById('book-toc');
    if (!toc) return;
    toc.querySelectorAll('.book-toc-topic').forEach(b => b.classList.remove('active'));
    const indices = isMobile ? [currentSpread] : [currentSpread * 2, currentSpread * 2 + 1];
    indices.forEach(i => {
      const pg = pages[i];
      if (pg && pg.topic) {
        toc.querySelectorAll('.book-toc-topic').forEach(b => {
          if (b.textContent.trim().replace(' ✓', '') === pg.topic.title) b.classList.add('active');
        });
      }
    });
  }

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

  function closeBook() {
    const o = document.getElementById('book-overlay');
    if (o) { o.style.opacity = '0'; o.style.transition = 'opacity 0.3s'; setTimeout(() => o.remove(), 300); }
    document.removeEventListener('keydown', handleKeyNav);
    currentBook = null;
    pages = [];
    if (typeof window.showKnowing === 'function') window.showKnowing();
  }

  function bookMarkComplete(topicId) {
    markTopicDone(topicId);
    renderSpread();
    updateProgress();
    // Rebuild TOC
    if (currentBook) {
      const ci = window.KNOWING.categories.indexOf(currentBook);
      const toc = document.getElementById('book-toc');
      if (toc) toc.innerHTML = buildTocHtml(currentBook);
    }
  }

  // --- Public API ---
  window._bookClose = closeBook;
  window._bookToggleToc = toggleToc;
  window._bookGoToPage = goToPage;
  window._bookMarkComplete = bookMarkComplete;

  window.openBook = function(catId) {
    const K = window.KNOWING;
    if (!K) return;
    const cat = K.categories.find(c => c.id === catId);
    if (!cat) return;
    checkMobile();
    createBookOverlay(cat, K.categories.indexOf(cat));
  };

})();
