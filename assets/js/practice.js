// Practice Node — Session-Based Practice Flow
// The Temple: Dashboard → Review → Deepen → Learn → Drill with Metronome → Self-Assess

const PRACTICE = {
  id: 'practice',
  title: 'Practice',
  tag: 'PRACTISE',
  description: 'Session-based practice. Pick a time slot, get a structured routine. Timer-driven, feedback-ready.',
  color: '#e8a020', // warm amber — the temple candle
  sources: [
    'Troy Nelson — Guitar Aerobics: A 52-Week Workout (2007)',
    'Jamie Andreas — Principles of Correct Practice for Guitar (1999)',
    'Larry Baione — Berklee Practice Method: Guitar (2001)'
  ],
  // Drills that can be pulled into practice sessions
  drills: [
    {
      id: 'pd-chromatic',
      title: 'Chromatic Warm-Up',
      category: 'Warm-Up',
      difficulty: 1,
      defaultBpm: 60,
      duration: '2-3 min',
      description: '1-2-3-4 pattern across all strings. Gets blood flowing.',
      instructions: 'Start on low E, frets 1-2-3-4, one finger each. Move to next string. Then shift up a fret and reverse. Keep it slow and clean.'
    },
    {
      id: 'pd-pent1',
      title: 'Pentatonic Box 1',
      category: 'Scales',
      difficulty: 1,
      defaultBpm: 70,
      duration: '5 min',
      description: 'A minor pentatonic at fret 5. The most important shape you\'ll ever learn.',
      instructions: 'Play ascending and descending. Use alternate picking. Start at 70 BPM, 1 note per click. When clean, try 2 notes per click.'
    },
    {
      id: 'pd-chord-trans',
      title: 'Chord Transitions',
      category: 'Chords',
      difficulty: 1,
      defaultBpm: 60,
      duration: '5 min',
      description: 'G → C → D → Em. The folk/rock foundation progression.',
      instructions: 'Strum each chord 4 times. Focus on the transition — minimise the gap. The goal is muscle memory, not speed.'
    },
    {
      id: 'pd-alt-pick',
      title: 'Alternate Picking',
      category: 'Technique',
      difficulty: 2,
      defaultBpm: 80,
      duration: '5-8 min',
      description: 'Down-up-down-up on a single string. The picking foundation.',
      instructions: 'Open E string, alternate pick 16th notes. Small pick motion — 2-3mm. Focus on even volume and timing.'
    },
    {
      id: 'pd-strum',
      title: 'Strumming Patterns',
      category: 'Rhythm',
      difficulty: 1,
      defaultBpm: 80,
      duration: '5 min',
      description: 'Basic down-up strumming with rhythm patterns.',
      instructions: 'Start with all down strums, 4 per bar. Add up strums between. Then try: D-D-u-D-u (the island strum).'
    },
    {
      id: 'pd-bends',
      title: 'String Bending',
      category: 'Technique',
      difficulty: 2,
      defaultBpm: 60,
      duration: '5 min',
      description: 'Bend to pitch. The soul of electric guitar.',
      instructions: 'Bend the G string at fret 7 up a whole step (to sound like fret 9). Use your ear — match the target note first, then bend to it.'
    },
    {
      id: 'pd-barre',
      title: 'Barre Chord Hold',
      category: 'Chords',
      difficulty: 2,
      defaultBpm: 60,
      duration: '3-5 min',
      description: 'F major shape barre chord. Build the squeeze.',
      instructions: 'Press all 6 strings at fret 1. Hold for 10 seconds. Release. Repeat 5 times. Then try at fret 3, 5. Strength builds over days.'
    },
    {
      id: 'pd-pent2',
      title: 'Pentatonic Box 2',
      category: 'Scales',
      difficulty: 2,
      defaultBpm: 65,
      duration: '5 min',
      description: 'Second pentatonic position. Extends your range up the neck.',
      instructions: 'Starts at fret 8. Connect it to Box 1 — the last note of Box 1 is the first note of Box 2. Practice the transition between boxes.'
    },
    {
      id: 'pd-fingerpick',
      title: 'Fingerpicking Pattern',
      category: 'Technique',
      difficulty: 2,
      defaultBpm: 70,
      duration: '5 min',
      description: 'Travis picking basics. Thumb alternates bass, fingers pick melody.',
      instructions: 'Thumb plays E and A strings alternating. Index picks G, middle picks B, ring picks E. Pattern: T-I-T-M-T-I-T-M.'
    },
    {
      id: 'pd-major-scale',
      title: 'Major Scale',
      category: 'Scales',
      difficulty: 2,
      defaultBpm: 60,
      duration: '5-8 min',
      description: 'The foundation of Western music. C major, open position.',
      instructions: 'C-D-E-F-G-A-B-C. Play ascending and descending. Say each note name as you play it. This builds the ear-theory connection.'
    },
    {
      id: 'pd-string-cross',
      title: 'String Crossing',
      category: 'Technique',
      difficulty: 2,
      defaultBpm: 60,
      duration: '5 min',
      description: 'Smooth transitions between strings without catching.',
      instructions: 'Play 4 notes on one string, then move to the next. Focus on the moment of crossing — the pick should glide across, not catch. Start at 60 BPM, one note per click. The goal is zero accent on the crossing note.'
    },
    {
      id: 'pd-arpeggio',
      title: 'Arpeggio Patterns',
      category: 'Scales',
      difficulty: 2,
      defaultBpm: 60,
      duration: '5 min',
      description: 'Break chords into individual notes. The bridge between rhythm and lead.',
      instructions: 'Take a chord shape (Am, C, G). Instead of strumming, pick each string individually, low to high then high to low. Listen: each note should ring clearly. This teaches both chord knowledge and fingerpicking.'
    },
    {
      id: 'pd-palm-mute',
      title: 'Palm Muting',
      category: 'Rhythm',
      difficulty: 1,
      defaultBpm: 80,
      duration: '3-5 min',
      description: 'Rest the picking hand lightly on the strings near the bridge. The rock guitar foundation.',
      instructions: 'Play open low E with palm mute. Find the sweet spot where the note is dampened but still audible. Then try muted strumming on power chords. The pressure is subtle — too much kills the note, too little does nothing.'
    },
    {
      id: 'pd-travis',
      title: 'Travis Picking',
      category: 'Technique',
      difficulty: 3,
      defaultBpm: 50,
      duration: '5-8 min',
      description: 'Thumb plays bass pattern, fingers play melody. The fingerstyle foundation.',
      instructions: 'Thumb alternates between bass strings (E, A, D). Index and middle play melody on treble strings. Start with thumb only, then add one finger. The independence takes weeks — do not rush.'
    },
    {
      id: 'pd-ear-interval',
      title: 'Interval Recognition',
      category: 'Ear Training',
      difficulty: 1,
      defaultBpm: 0,
      duration: '3 min',
      description: 'Train the ear to recognise distances between notes.',
      instructions: 'Play two notes. Name the interval. Start with octave (same note, different register), then perfect fifth, then major third. Sing the first note, then the second. The ear learns by comparison, not isolation.'
    },
    {
      id: 'pd-song-apply',
      title: 'Song Application',
      category: 'Music',
      difficulty: 2,
      defaultBpm: 0,
      duration: '5-10 min',
      description: 'Take what you drilled and play actual music with it.',
      instructions: 'Choose a song you know. Play it through once, no stopping, even if you make mistakes. Then isolate the hardest 4 bars. Drill those bars slowly. Then play the full song again. This is how drills become music.'
    },
    {
      id: 'pd-speed-ladder',
      title: 'Speed Ladder',
      category: 'Speed',
      difficulty: 2,
      defaultBpm: 60,
      duration: '5 min',
      description: 'Incremental tempo increases. The safe way to build speed.',
      instructions: 'Play a pattern at 60 BPM. If perfectly clean for 4 repetitions, increase by 4 BPM. If you make a mistake, drop back 8 BPM. This is the only safe way to build speed: never practice faster than you can play clean.'
    },
    {
      id: 'pd-slide-legato',
      title: 'Slides & Legato',
      category: 'Technique',
      difficulty: 2,
      defaultBpm: 70,
      duration: '5 min',
      description: 'Hammer-ons, pull-offs, and slides. Smooth, connected playing.',
      instructions: 'Play fret 5 to fret 7 with a hammer-on (pick once, tap second note). Then pull-off (reverse). Then slide (pick once, slide finger). Each should produce equal volume to the picked note. The left hand must learn to generate sound without the pick.'
    }
  ],
  // Pre-built sessions for quick-start
  sessions: [
    {
      id: 'ps-quick',
      title: 'Quick Burn',
      duration: 10,
      subtitle: 'When you only have 10 minutes',
      drills: ['pd-chromatic', 'pd-pent1', 'pd-chord-trans', 'pd-song-apply']
    },
    {
      id: 'ps-standard',
      title: 'Daily Practice',
      duration: 30,
      subtitle: 'The balanced daily session',
      drills: ['pd-chromatic', 'pd-alt-pick', 'pd-pent1', 'pd-chord-trans', 'pd-strum', 'pd-song-apply']
    },
    {
      id: 'ps-deep',
      title: 'Deep Work',
      duration: 60,
      subtitle: 'For serious practice days',
      drills: ['pd-chromatic', 'pd-alt-pick', 'pd-string-cross', 'pd-pent1', 'pd-pent2', 'pd-chord-trans', 'pd-bends', 'pd-barre', 'pd-arpeggio', 'pd-major-scale', 'pd-song-apply']
    }
  ]
};

// Flatten drills for api-loader comparison
// drills array already exists at top level — no flattening needed

window.PRACTICE = PRACTICE;
