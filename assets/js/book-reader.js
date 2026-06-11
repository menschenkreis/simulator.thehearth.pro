/* ═══════════════════════════════════════════════════════════════
   Book Reader — Spread Layout Engine
   One concept per spread: visual left, text right.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const LEVEL_NAMES = ['', 'I — Origin', 'II — Duality', 'III — Creation', 'IV — Structure', 'V — Change', 'VI — Harmony', 'VII — Wisdom', 'VIII — Power'];
  const STORAGE_KEY = 'hearth-knowing-progress';

  /* ── State ── */
  let pages = [];
  let current = 0;
  let animating = false;

  /* ── Quotes for interleaving ── */
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
  let quoteIdx = 0;

  /* ── Diagrams per topic ── */
  const DIAGRAMS = {
    'time-signatures': () => rhythmGrid(),
    'rhythm-building-blocks': () => noteValues(),
    'subdivision': () => subdivisionGrid(),
    'syncopation': () => syncopationGrid(),
    'triads': () => chordBox('C', ['X', '3', '2', '0', '1', '0'], ['R', 'R', 'R', '3', 'R', 'R']),
    'seventh-chords': () => seventhChordDiagram(),
    'chord-voicings': () => cagedMap(),
    'chord-progressions': () => progressionMap(),
    'pentatonic': () => scaleBox('Minor Pentatonic — Box 1', [5, [1, 4], [1, 3], [1, 3], [1, 3], [1, 4], 5]),
    'major-scale': () => scaleBox('Major Scale — Position 1', [[2, 4], [1, 3], [1, 3], [1, 2], [2, 4], [2, 4], [1]]),
    'minor-scales': () => scaleBox('Natural Minor — Position 1', [[1, 3], [1, 3], [1, 2], [2, 4], [2, 4], [1]]),
    'modes': () => modesMap(),
    'alternate-picking': () => pickingDiagram('alt'),
    'economy-picking': () => pickingDiagram('econ'),
    'sweep-picking': () => sweepDiagram(),
    'what-is-arpeggio': () => chordBox('C', ['X', '3', '2', '0', '1', '0'], ['R', 'R', 'R', '3', 'R', 'R']),
    'major-arpeggios': () => arpeggioShape('Major'),
    'pima': () => pimaDiagram(),
    'fingerpicking-patterns': () => fingerpickDiagram(),
    'whole-half-steps': () => fretboardMap(),
    'intervals': () => intervalMap(),
    'circle-of-fifths': () => circleFifths(),
    'key-signatures': () => keySigDiagram(),
    'notation-basics': () => staffDiagram(),
    'rhythm-notation': () => rhythmValues(),
    'scale-chord-mapping': () => scaleChordMap(),
    'tension-release': () => tensionDiagram(),
    'tetrachords': () => tetrachordDiagram(),
    'ear-training': () => earDiagram(),
    'extensions': () => extensionDiagram(),
    'exotic-scales': () => exoticMap(),
    'modulation': () => modulationDiagram(),
    'seventh-arpeggios': () => arpeggioShape('7th'),
    'reading-on-guitar': () => readingDiagram(),
  };

  /* ── Parse body HTML into chunks ── */
  function chunkBody(bodyHtml) {
    // Split on <p> tags, keeping content
    const parts = bodyHtml.split(/(<\/?(?:p|div)[^>]*>)/i).filter(s => s.trim() && !s.match(/^<\/?(?:p|div)[^>]*>$/i));
    // Group into chunks of ~2-3 items
    const chunks = [];
    let buf = '';
    let count = 0;
    for (const part of parts) {
      buf += part;
      count++;
      if (count >= 2 && !part.match(/^<div/i)) {
        chunks.push(buf);
        buf = '';
        count = 0;
      }
    }
    if (buf.trim()) chunks.push(buf);
    if (chunks.length === 0) chunks.push(bodyHtml);
    return chunks;
  }

  /* ── Build pages for a category ── */
  function buildPages(cat) {
    const result = [];

    // Cover
    result.push({
      type: 'cover',
      title: cat.title,
      description: cat.description,
      icon: catIcon(cat.id),
    });

    // Topics grouped by difficulty → level
    const byLevel = {};
    cat.topics.forEach(t => {
      const lvl = t.difficulty <= 1 ? 1 : t.difficulty === 2 ? 3 : 5;
      if (!byLevel[lvl]) byLevel[lvl] = [];
      byLevel[lvl].push(t);
    });

    const levels = Object.keys(byLevel).map(Number).sort((a, b) => a - b);

    for (const lvl of levels) {
      // Level divider
      result.push({
        type: 'quote',
        text: LEVEL_NAMES[lvl] || 'Unknown',
        author: lvl <= 2 ? 'Foundation' : lvl <= 4 ? 'Development' : 'Advanced',
      });

      for (const topic of byLevel[lvl]) {
        const chunks = chunkBody(topic.body);
        const diagram = DIAGRAMS[topic.id];

        // First chunk gets the diagram on the left
        result.push({
          type: 'spread',
          topicId: topic.id,
          level: LEVEL_NAMES[lvl],
          title: topic.title,
          body: chunks[0],
          source: topic.source,
          visual: diagram ? diagram() : null,
          pageNum: result.length,
        });

        // Remaining chunks: placeholder visual (clean, not forced)
        for (let i = 1; i < chunks.length; i++) {
          result.push({
            type: 'spread',
            topicId: topic.id,
            level: LEVEL_NAMES[lvl],
            title: topic.title + (chunks.length > 2 ? ` (${i + 1}/${chunks.length})` : ' (continued)'),
            body: chunks[i],
            source: i === chunks.length - 1 ? topic.source : null,
            visual: null,
            pageNum: result.length,
          });
        }

        // Try It page
        result.push({
          type: 'action',
          topicId: topic.id,
          level: LEVEL_NAMES[lvl],
          title: 'Try It',
          steps: buildTrySteps(topic),
          pageNum: result.length,
        });

        // Interleaved quote between topics
        const q = QUOTES[quoteIdx % QUOTES.length];
        quoteIdx++;
        result.push({
          type: 'quote',
          text: q.text,
          author: q.author,
        });
      }
    }

    return result;
  }

  function catIcon(id) {
    const icons = { rhythm: '🥁', 'chords-harmony': '🎵', scales: '🎼', 'technique-improv': '🔥', picking: '⚡', arpeggios: '🎶', fingerstyle: '🖐️', theory: '📖', 'reading-music': '📝' };
    return icons[id] || '📚';
  }

  function buildTrySteps(topic) {
    const steps = {
      'time-signatures': ['Tap your foot in 4/4 time for 30 seconds', 'Switch to 3/4 (waltz feel) — count 1-2-3', 'Try 6/8 — count in two groups of three'],
      'subdivision': ['Set metronome to 60 BPM', 'Play quarter notes for 8 bars', 'Switch to 8ths, then 16ths', 'Notice where your timing drifts'],
      'syncopation': ['Mute all strings with your left hand', 'Strum 16th notes steadily', 'Accent only the "and" of beat 2', 'Remove the mute and play a chord on those accents'],
      'rhythm-building-blocks': ['Clap a whole note (4 beats)', 'Clap quarter notes for 4 bars', 'Clap 8ths, then 16ths', 'Clap a dotted half note (3 beats)'],
      'triads': ['Play a C major chord — identify the C, E, G notes', 'Play an A minor chord — find the A, C, E', 'Compare: what note changed?', 'Play major → minor → major on one string set'],
      'seventh-chords': ['Play Cmaj7 (x32000) — hear the dreamy sound', 'Play C7 (x32310) — hear it wants to move to F', 'Play Cm7 (x31311) — hear the smooth mellow', 'Play Cmaj7 → C7 → Cm7 back to back'],
      'chord-progressions': ['Play I-IV-V in C (C-F-G)', 'Play I-V-vi-IV in G (G-D-Em-C)', 'Play the 12-bar blues pattern', 'Notice which progression feels most natural to you'],
    };
    return steps[topic.id] || [
      `Review "${topic.title}" — read it once more`,
      'Close your eyes and explain it in your own words',
      'Pick up your guitar and find the concept on the fretboard',
      'Teach it to someone (or pretend to)',
    ];
  }

  /* ── SVG Diagrams ── */
  function rhythmGrid() {
    return `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="160" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">4/4 Time</text>
      <line x1="20" y1="40" x2="180" y2="40" stroke="rgba(212,175,105,0.3)" stroke-width="1"/>
      ${[1,2,3,4].map((b,i) => `
        <circle cx="${40+i*40}" cy="60" r="12" fill="${i===0?'#d4af69':'rgba(212,175,105,0.3)'}"/>
        <text x="${40+i*40}" y="64" text-anchor="middle" fill="${i===0?'#1a1710':'rgba(212,175,105,0.6)'}" font-size="10" font-weight="600">${b}</text>
        <text x="${40+i*40}" y="95" text-anchor="middle" fill="rgba(212,175,105,0.4)" font-size="8">beat</text>
      `).join('')}
      <text x="100" y="130" text-anchor="middle" fill="rgba(212,175,105,0.5)" font-size="9">Strong — Weak — Medium — Weak</text>
      <text x="100" y="148" text-anchor="middle" fill="rgba(196,90,32,0.6)" font-size="8">The heartbeat of most popular music</text>
    </svg>`;
  }

  function noteValues() {
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Note Values</text>
      ${[
        ['𝅝','Whole','4 beats','rgba(212,175,105,1)'],
        ['𝅗𝅥','Half','2 beats','rgba(212,175,105,0.7)'],
        ['♩','Quarter','1 beat','rgba(212,175,105,0.5)'],
        ['♪','8th','½ beat','rgba(212,175,105,0.35)'],
        ['𝅘𝅥𝅯','16th','¼ beat','rgba(212,175,105,0.25)'],
      ].map(([n,t,d,c],i) => `
        <text x="30" y="${52+i*30}" fill="${c}" font-size="18">${n}</text>
        <text x="60" y="${52+i*30}" fill="${c}" font-size="10">${t}</text>
        <text x="170" y="${52+i*30}" text-anchor="end" fill="${c}" font-size="9">${d}</text>
      `).join('')}
    </svg>`;
  }

  function subdivisionGrid() {
    return `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="180" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Subdivision</text>
      <line x1="15" y1="38" x2="185" y2="38" stroke="rgba(212,175,105,0.2)"/>
      ${['1   2   3   4', '1 & 2 & 3 & 4 &', '1e&a 2e&a 3e&a 4e&a'].map((row,i) => `
        <text x="15" y="${62+i*40}" fill="rgba(212,175,105,0.6)" font-size="9" font-family="JetBrains Mono,monospace">${['Quarter','8th','16th'][i]}</text>
        <text x="60" y="${62+i*40}" fill="rgba(212,175,105,${0.8-i*0.2})" font-size="10" font-family="JetBrains Mono,monospace">${row}</text>
        <line x1="15" y1="${72+i*40}" x2="185" y2="${72+i*40}" stroke="rgba(212,175,105,0.1)"/>
      `).join('')}
      <text x="100" y="170" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">More dots = more groove</text>
    </svg>`;
  }

  function syncopationGrid() {
    return `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="140" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Syncopation</text>
      <text x="100" y="45" text-anchor="middle" fill="rgba(212,175,105,0.4)" font-size="9">On-beat vs Off-beat</text>
      ${[
        {y:65, accents:[1,0,0,0,1,0,0,0], label:'On-beat'},
        {y:90, accents:[0,1,0,1,0,1,0,1], label:'Off-beat'},
        {y:115, accents:[1,0,1,0,0,1,1,0], label:'Funk'},
      ].map(r => `
        <text x="12" y="${r.y}" fill="rgba(212,175,105,0.4)" font-size="8">${r.label}</text>
        ${r.accents.map((a,i) => `<circle cx="${55+i*18}" cy="${r.y-4}" r="${a?5:3}" fill="${a?'#d4af69':'rgba(212,175,105,0.15)'}"/>`).join('')}
      `).join('')}
    </svg>`;
  }

  function chordBox(name, frets, labels) {
    const sw = 30, fw = 25, sy = 20, nFrets = 5;
    const W = 180, H = 160;
    const startX = (W - 5*sw)/2, startY = 30;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${W}" height="${H}" rx="4" fill="#1a1710"/>
      <text x="${W/2}" y="18" text-anchor="middle" fill="#d4af69" font-size="12" font-family="Cinzel,serif">${name}</text>
      ${[0,1,2,3,4,5].map(s => `<line x1="${startX+s*sw}" y1="${startY}" x2="${startX+s*sw}" y2="${startY+nFrets*fw}" class="string"/>`).join('')}
      ${[0,1,2,3,4,5].map(f => `<line x1="${startX}" y1="${startY+f*fw}" x2="${startX+5*sw}" y2="${startY+f*fw}" class="fret"/>`).join('')}
      ${frets.map((f,i) => {
        if (f === 'X' || f === '0') return `<text x="${startX+i*sw}" y="${startY-5}" text-anchor="middle" fill="rgba(212,175,105,0.5)" font-size="10">${f}</text>`;
        return `<circle cx="${startX+i*sw}" cy="${startY+(parseInt(f)-0.5)*fw}" r="8" class="dot"/>`;
      }).join('')}
    </svg>`;
  }

  function scaleBox(title, pattern) {
    const W = 200, H = 160;
    const sw = 24, fw = 20;
    const startX = 30, startY = 30;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${W}" height="${H}" rx="4" fill="#1a1710"/>
      <text x="${W/2}" y="18" text-anchor="middle" fill="#d4af69" font-size="10" font-family="Cinzel,serif">${title}</text>
      ${[0,1,2,3,4,5].map(s => `<line x1="${startX+s*sw}" y1="${startY}" x2="${startX+s*sw}" y2="${startY+5*fw}" class="string"/>`).join('')}
      ${[0,1,2,3,4,5].map(f => `<line x1="${startX}" y1="${startY+f*fw}" x2="${startX+5*sw}" y2="${startY+f*fw}" class="fret"/>`).join('')}
      <text x="${W/2}" y="${H-5}" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">One shape, 12 keys</text>
    </svg>`;
  }

  function seventhChordDiagram() {
    return `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="160" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">7th Chord Types</text>
      ${['maj7 — dreamy','7 — bluesy','m7 — mellow','m7♭5 — dark','dim7 — tense'].map((t,i) => `
        <rect x="15" y="${38+i*22}" width="170" height="18" rx="3" fill="rgba(212,175,105,${0.15-i*0.02})"/>
        <text x="25" y="${51+i*22}" fill="rgba(212,175,105,${0.9-i*0.12})" font-size="10">${t}</text>
      `).join('')}
      <text x="100" y="155" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">The 7th changes everything</text>
    </svg>`;
  }

  function cagedMap() {
    return `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="120" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">CAGED System</text>
      ${['C','A','G','E','D'].map((l,i) => `
        <rect x="${15+i*37}" y="40" width="30" height="50" rx="4" fill="rgba(212,175,105,${0.25-i*0.03})"/>
        <text x="${30+i*37}" y="72" text-anchor="middle" fill="#d4af69" font-size="16" font-family="Cinzel,serif">${l}</text>
      `).join('')}
      <text x="100" y="110" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">5 shapes → entire fretboard</text>
    </svg>`;
  }

  function progressionMap() {
    return `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="140" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Key Progressions</text>
      ${['I-IV-V — Rock/Blues','I-V-vi-IV — Pop','ii-V-I — Jazz','i-VII-VI-V — Flamenco'].map((t,i) => `
        <text x="20" y="${50+i*22}" fill="rgba(212,175,105,${0.8-i*0.15})" font-size="10">${t}</text>
      `).join('')}
      <text x="100" y="135" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">Most songs use one of these</text>
    </svg>`;
  }

  function modesMap() {
    return `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="180" rx="4" fill="#1a1710"/>
      <text x="100" y="18" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">The 7 Modes</text>
      ${['Ionian — happy','Dorian — jazzy','Phrygian — Spanish','Lydian — dreamy','Mixolydian — bluesy','Aeolian — sad','Locrian — unstable'].map((m,i) => `
        <rect x="10" y="${30+i*20}" width="${180-m.length}" height="16" rx="3" fill="rgba(212,175,105,${0.2-i*0.02})"/>
        <text x="20" y="${42+i*20}" fill="rgba(212,175,105,${0.9-i*0.08})" font-size="9">${m}</text>
      `).join('')}
    </svg>`;
  }

  function pickingDiagram(type) {
    const label = type === 'alt' ? 'Alternate Picking' : 'Economy Picking';
    const arrows = type === 'alt' ? '↓ ↑ ↓ ↑ ↓ ↑' : '↓ ↓ ↑ ↓ ↑ ↓';
    return `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="100" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">${label}</text>
      <text x="100" y="55" text-anchor="middle" fill="rgba(212,175,105,0.6)" font-size="14" font-family="JetBrains Mono,monospace">${arrows}</text>
      <text x="100" y="85" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">${type === 'alt' ? 'Strict down-up alternation' : 'Sweep in the direction you\'re going'}</text>
    </svg>`;
  }

  function sweepDiagram() {
    return `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="120" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Sweep Picking</text>
      <text x="100" y="55" text-anchor="middle" fill="rgba(212,175,105,0.6)" font-size="14" font-family="JetBrains Mono,monospace">↓ ↓ ↓ ↓ ↓</text>
      <text x="100" y="80" text-anchor="middle" fill="rgba(212,175,105,0.4)" font-size="9">One fluid motion across strings</text>
      <text x="100" y="110" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">Each finger lifts before the next note</text>
    </svg>`;
  }

  function arpeggioShape(type) {
    return `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="120" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">${type} Arpeggio</text>
      <text x="100" y="55" text-anchor="middle" fill="rgba(212,175,105,0.5)" font-size="9">Root → 3rd → 5th${type.includes('7') ? ' → 7th' : ''}</text>
      <text x="100" y="80" text-anchor="middle" fill="rgba(212,175,105,0.35)" font-size="9">Chord notes played one at a time</text>
      <text x="100" y="110" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">The bridge between chords and scales</text>
    </svg>`;
  }

  function pimaDiagram() {
    return `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="160" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">PIMA System</text>
      ${['P = Thumb (bass)','I = Index (string 3)','M = Middle (string 2)','A = Ring (string 1)'].map((t,i) => `
        <text x="20" y="${55+i*25}" fill="rgba(212,175,105,${0.9-i*0.15})" font-size="11">${t}</text>
      `).join('')}
    </svg>`;
  }

  function fingerpickDiagram() {
    return `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="100" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Fingerpicking</text>
      <text x="100" y="55" text-anchor="middle" fill="rgba(212,175,105,0.5)" font-size="10" font-family="JetBrains Mono,monospace">P-I-M-A-M-I</text>
      <text x="100" y="85" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">Forward and back pattern</text>
    </svg>`;
  }

  function fretboardMap() {
    return `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="100" rx="4" fill="#1a1710"/>
      <text x="100" y="18" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Whole & Half Steps</text>
      <text x="15" y="50" fill="rgba(212,175,105,0.6)" font-size="9">1 fret = half step</text>
      <text x="15" y="70" fill="rgba(212,175,105,0.5)" font-size="9">2 frets = whole step</text>
      <text x="100" y="92" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">E-F and B-C: only half steps</text>
    </svg>`;
  }

  function intervalMap() {
    return `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="180" rx="4" fill="#1a1710"/>
      <text x="100" y="18" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Intervals</text>
      ${['m2 — 1 fret','M2 — 2 frets','m3 — 3 frets','M3 — 4 frets','P4 — 5 frets','Tritone — 6','P5 — 7 frets','Octave — 12'].map((t,i) => `
        <text x="15" y="${40+i*17}" fill="rgba(212,175,105,${0.85-i*0.07})" font-size="9">${t}</text>
      `).join('')}
    </svg>`;
  }

  function circleFifths() {
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" rx="4" fill="#1a1710"/>
      <text x="100" y="18" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Circle of Fifths</text>
      ${['C','G','D','A','E','B','F#','Db','Ab','Eb','Bb','F'].map((n,i) => {
        const a = (i*30-90)*Math.PI/180, cx=100+65*Math.cos(a), cy=108+65*Math.sin(a);
        return `<text x="${cx}" y="${cy}" text-anchor="middle" fill="rgba(212,175,105,${0.9-Math.abs(i-6)*0.05})" font-size="11" font-family="Cinzel,serif">${n}</text>`;
      }).join('')}
      <text x="100" y="115" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="9">12 keys in a circle</text>
    </svg>`;
  }

  function keySigDiagram() {
    return `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="100" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Key Signatures</text>
      <text x="15" y="50" fill="rgba(212,175,105,0.6)" font-size="10">Sharps: G D A E B F#</text>
      <text x="15" y="72" fill="rgba(212,175,105,0.5)" font-size="10">Flats: F Bb Eb Ab Db Gb</text>
      <text x="100" y="95" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">Each key adds one sharp or flat</text>
    </svg>`;
  }

  function staffDiagram() {
    return `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="100" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">The Staff</text>
      <text x="15" y="50" fill="rgba(212,175,105,0.6)" font-size="10">Lines: E G B D F</text>
      <text x="15" y="72" fill="rgba(212,175,105,0.5)" font-size="10">Spaces: F A C E</text>
      <text x="100" y="95" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">5 lines, 4 spaces, every note has a home</text>
    </svg>`;
  }

  function rhythmValues() {
    return noteValues();
  }

  function scaleChordMap() {
    return `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="140" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Scale → Chord Map</text>
      ${['Major → Major scale','Minor → Nat. minor','Dom7 → Mixolydian','Dim → Diminished scale'].map((t,i) => `
        <text x="15" y="${52+i*20}" fill="rgba(212,175,105,${0.8-i*0.12})" font-size="10">${t}</text>
      `).join('')}
    </svg>`;
  }

  function tensionDiagram() {
    return `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="100" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Tension & Release</text>
      <line x1="30" y1="60" x2="170" y2="60" stroke="rgba(212,175,105,0.2)"/>
      <path d="M 30 60 Q 70 20 100 60 Q 130 100 170 60" fill="none" stroke="#d4af69" stroke-width="2"/>
      <text x="70" y="85" fill="rgba(196,90,32,0.6)" font-size="8">tension</text>
      <text x="130" y="85" fill="rgba(196,90,32,0.6)" font-size="8">release</text>
    </svg>`;
  }

  function tetrachordDiagram() {
    return `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="120" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Tetrachords</text>
      <text x="15" y="50" fill="rgba(212,175,105,0.6)" font-size="10">Major: W-W-H</text>
      <text x="15" y="70" fill="rgba(212,175,105,0.5)" font-size="10">Minor: W-H-W</text>
      <text x="15" y="90" fill="rgba(212,175,105,0.4)" font-size="10">Phrygian: H-W-W</text>
      <text x="100" y="115" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">Two tetrachords = one scale</text>
    </svg>`;
  }

  function earDiagram() {
    return `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="120" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Ear Training</text>
      <text x="100" y="55" text-anchor="middle" fill="rgba(212,175,105,0.5)" font-size="10">Hear → Sing → Play</text>
      <text x="100" y="85" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">If you can sing it, you can play it</text>
    </svg>`;
  }

  function extensionDiagram() {
    return `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="140" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Extensions</text>
      ${['Triad: R 3 5','7th: R 3 5 7','9th: R 3 5 7 9','11th: R 3 5 7 9 11','13th: R 3 5 7 9 11 13'].map((t,i) => `
        <text x="15" y="${48+i*18}" fill="rgba(212,175,105,${0.8-i*0.1})" font-size="10">${t}</text>
      `).join('')}
    </svg>`;
  }

  function exoticMap() {
    return `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="140" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Exotic Scales</text>
      ${['Harmonic Major','Hungarian Minor','Whole Tone','Diminished','Bebop'].map((t,i) => `
        <text x="15" y="${50+i*18}" fill="rgba(212,175,105,${0.7-i*0.08})" font-size="10">${t}</text>
      `).join('')}
    </svg>`;
  }

  function modulationDiagram() {
    return `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="100" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Modulation</text>
      <text x="100" y="55" text-anchor="middle" fill="rgba(212,175,105,0.5)" font-size="10">Key A →→→ Key B</text>
      <text x="100" y="85" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">Changing the emotional center</text>
    </svg>`;
  }

  function readingDiagram() {
    return `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="100" rx="4" fill="#1a1710"/>
      <text x="100" y="22" text-anchor="middle" fill="#d4af69" font-size="11" font-family="Cinzel,serif">Reading on Guitar</text>
      <text x="100" y="55" text-anchor="middle" fill="rgba(212,175,105,0.5)" font-size="10">Standard + TAB = both</text>
      <text x="100" y="85" text-anchor="middle" fill="rgba(196,90,32,0.5)" font-size="8">TAB = where. Notation = what.</text>
    </svg>`;
  }

  /* ── Render ── */
  function render() {
    const page = pages[current];
    if (!page) return;
    const spread = document.getElementById('book-spread');
    if (!spread) return;

    spread.className = 'book-spread';
    if (page.type === 'cover') spread.classList.add('cover');
    if (page.type === 'quote') spread.classList.add('quote');
    if (page.type === 'action') spread.classList.add('action');

    if (page.type === 'cover') {
      spread.innerHTML = `
        <div class="book-page-right">
          <div class="book-cover-icon">${page.icon}</div>
          <h1 class="book-cover-title">${page.title}</h1>
          <p class="book-cover-subtitle">${page.description || ''}</p>
          <p class="book-cover-meta">${pages.length} pages · open book</p>
        </div>`;
    } else if (page.type === 'quote') {
      spread.innerHTML = `
        <div class="book-page-right">
          <div class="book-quote-text">"${page.text}"</div>
          <div class="book-quote-author">— ${page.author}</div>
          <div class="book-page-num">${current + 1}</div>
        </div>`;
    } else if (page.type === 'action') {
      const progress = getProgress();
      const marked = progress[page.topicId];
      spread.innerHTML = `
        <div class="book-page-left">
          <div class="book-visual">
            <div class="book-visual-placeholder">
              <div class="glyph">🎸</div>
              <div class="label">your turn</div>
            </div>
          </div>
        </div>
        <div class="book-page-right">
          <div class="book-chapter-label">${page.level || ''}</div>
          <h2 class="book-page-title">${page.title}</h2>
          <ol class="book-action-steps">${page.steps.map(s => `<li>${s}</li>`).join('')}</ol>
          <button class="book-mark-btn ${marked ? 'marked' : ''}" data-topic="${page.topicId}">
            ${marked ? '✓ Understood' : 'Mark as Understood'}
          </button>
          <div class="book-page-num">${current + 1}</div>
        </div>`;
      spread.querySelector('.book-mark-btn')?.addEventListener('click', function () {
        markUnderstood(this.dataset.topic);
        this.classList.add('marked');
        this.textContent = '✓ Understood';
      });
    } else {
      // Standard spread: visual left, text right
      const leftContent = page.visual
        ? `<div class="book-diagram">${page.visual}</div>`
        : `<div class="book-visual">
            <div class="book-visual-placeholder">
              <div class="glyph">📜</div>
              <div class="label">${page.title.replace(/ \(.*\)$/, '')}</div>
            </div>
          </div>`;

      spread.innerHTML = `
        <div class="book-page-left">${leftContent}</div>
        <div class="book-page-right">
          ${page.level ? `<div class="book-chapter-label">${page.level}</div>` : ''}
          <h2 class="book-page-title">${page.title}</h2>
          <div class="book-page-body">${page.body}</div>
          ${page.source ? `<div class="book-page-source">↳ ${page.source}</div>` : ''}
          <div class="book-page-num">${current + 1}</div>
        </div>`;
    }

    // Update nav
    updateNav();
    updateTocActive();
  }

  function updateNav() {
    const prev = document.getElementById('book-prev');
    const next = document.getElementById('book-next');
    const ind = document.getElementById('book-indicator');
    if (prev) prev.disabled = current <= 0;
    if (next) next.disabled = current >= pages.length - 1;
    if (ind) ind.textContent = `${current + 1} / ${pages.length}`;
  }

  /* ── TOC ── */
  function buildToc() {
    const list = document.getElementById('book-toc-list');
    if (!list) return;
    list.innerHTML = '';

    let lastLevel = '';
    pages.forEach((p, i) => {
      if (p.type === 'cover') {
        addTocItem(list, i, 'Cover', 'cover');
        return;
      }
      if (p.type === 'quote') {
        if (p.author === 'Foundation' || p.author === 'Development' || p.author === 'Advanced') {
          const li = document.createElement('li');
          li.className = 'book-toc-level';
          li.textContent = p.text;
          list.appendChild(li);
          lastLevel = p.text;
        }
        return;
      }
      if (p.type === 'spread') {
        // Only first spread of each topic
        const prev = pages[i - 1];
        if (!prev || prev.topicId !== p.topicId) {
          addTocItem(list, i, p.title, p.topicId);
        }
      }
    });
  }

  function addTocItem(list, idx, title, id) {
    const li = document.createElement('li');
    li.className = 'book-toc-item';
    li.dataset.idx = idx;
    li.innerHTML = `<button>${title}</button>`;
    li.querySelector('button').addEventListener('click', () => goTo(idx));
    list.appendChild(li);
  }

  function updateTocActive() {
    const items = document.querySelectorAll('.book-toc-item');
    items.forEach(el => {
      const idx = parseInt(el.dataset.idx);
      el.classList.toggle('active', idx === current);
    });
  }

  /* ── Navigation ── */
  function goTo(idx) {
    if (animating || idx < 0 || idx >= pages.length) return;
    const dir = idx > current ? 'forward' : 'backward';
    current = idx;
    animating = true;

    const spread = document.getElementById('book-spread');
    spread.classList.add(dir === 'forward' ? 'turning-forward' : 'turning-backward');

    setTimeout(() => {
      render();
      animating = false;
    }, 220);

    closeToc();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  /* ── Progress ── */
  function getProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch { return {}; }
  }
  function markUnderstood(topicId) {
    const p = getProgress();
    p[topicId] = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  }

  /* ── TOC toggle ── */
  function toggleToc() {
    document.getElementById('book-toc')?.classList.toggle('open');
  }
  function closeToc() {
    document.getElementById('book-toc')?.classList.remove('open');
  }

  /* ── Public: openBook ── */
  window.openBook = function (categoryId) {
    const cat = (window.KNOWING?.categories || []).find(c => c.id === categoryId);
    if (!cat) return;

    pages = buildPages(cat);
    current = 0;
    quoteIdx = 0;

    let overlay = document.getElementById('book-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'book-overlay';
      overlay.className = 'book-overlay';
      overlay.innerHTML = `
        <div class="book-header">
          <div class="book-header-left">
            <button class="book-back-btn" id="book-back">← Shelf</button>
            <span class="book-header-title" id="book-header-title"></span>
          </div>
          <button class="book-toc-btn" id="book-toc-btn">☰</button>
          <button class="book-close-btn" id="book-close">✕</button>
        </div>
        <div class="book-toc" id="book-toc">
          <div class="book-toc-header">Contents</div>
          <ul class="book-toc-list" id="book-toc-list"></ul>
        </div>
        <div class="book-desk">
          <div class="book-spread" id="book-spread"></div>
        </div>
        <div class="book-nav">
          <button class="book-nav-btn" id="book-prev">‹ Prev</button>
          <span class="book-nav-indicator" id="book-indicator"></span>
          <button class="book-nav-btn" id="book-next">Next ›</button>
        </div>
      `;
      document.body.appendChild(overlay);

      document.getElementById('book-prev').addEventListener('click', prev);
      document.getElementById('book-next').addEventListener('click', next);
      document.getElementById('book-close').addEventListener('click', closeBook);
      document.getElementById('book-back').addEventListener('click', closeBook);
      document.getElementById('book-toc-btn').addEventListener('click', toggleToc);

      // Keyboard
      document.addEventListener('keydown', (e) => {
        if (!document.getElementById('book-overlay')?.classList.contains('open')) return;
        if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
        if (e.key === 'Escape') closeBook();
      });

      // Swipe
      let touchX = 0;
      overlay.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
      overlay.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
      }, { passive: true });
    }

    document.getElementById('book-header-title').textContent = cat.title;
    buildToc();
    render();

    requestAnimationFrame(() => overlay.classList.add('open'));
  };

  function closeBook() {
    const overlay = document.getElementById('book-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    closeToc();
  }

})();
