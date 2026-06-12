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
    }
  ],
  // Pre-built sessions for quick-start
  sessions: [
    {
      id: 'ps-quick',
      title: 'Quick Burn',
      duration: 10,
      subtitle: 'When you only have 10 minutes',
      drills: ['pd-chromatic', 'pd-pent1', 'pd-chord-trans']
    },
    {
      id: 'ps-standard',
      title: 'Daily Practice',
      duration: 30,
      subtitle: 'The balanced daily session',
      drills: ['pd-chromatic', 'pd-alt-pick', 'pd-pent1', 'pd-chord-trans', 'pd-strum']
    },
    {
      id: 'ps-deep',
      title: 'Deep Work',
      duration: 60,
      subtitle: 'For serious practice days',
      drills: ['pd-chromatic', 'pd-alt-pick', 'pd-pent1', 'pd-pent2', 'pd-chord-trans', 'pd-bends', 'pd-barre', 'pd-major-scale']
    }
  ]
};
window.PRACTICE = PRACTICE;
