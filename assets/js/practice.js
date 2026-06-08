// Practice Node — Timed Sessions
// Sources: Troy Nelson (Guitar Aerobics), Jamie Andreas (Correct Practice),
//          Howard Roberts (Super Chops), Larry Baione (Berklee Practice Method)

const PRACTICE = {
  id: 'practice',
  title: 'Practice',
  tag: 'DOING PATH',
  description: 'How much time have you got? Select drills, combine variations, timer starts, you practise, give feedback.',
  sources: [
    'Troy Nelson — Guitar Aerobics: 52-Week Workout (Hal Leonard, 2007)',
    'Jamie Andreas — Principles of Correct Practice for Guitar (1999)',
    'Howard Roberts — Super Chops: Jazz Guitar in 20 Weeks',
    'Larry Baione — Berklee Practice Method: Guitar (Berklee Press, 2001)'
  ],

  sessionTypes: [
    {
      id: 'quick',
      title: 'Quick Fire',
      icon: '⚡',
      duration: '10 min',
      description: 'Warm up + 1 focused technique. For days when time is short.',
      drills: [
        { name: 'Chromatic warm-up (1-2-3-4 all strings)', time: 3 },
        { name: 'Pentatonic box 1 — ascending/descending', time: 3 },
        { name: 'Chord transitions (G-C-D-Em)', time: 4 }
      ]
    },
    {
      id: 'standard',
      title: 'Standard Session',
      icon: '🎯',
      duration: '30 min',
      description: 'The daily bread. Warm-up + 2 techniques + 1 song application.',
      drills: [
        { name: 'Finger stretches + chromatic warm-up', time: 5 },
        { name: 'Alternate picking drills', time: 5 },
        { name: 'Scale sequences (major scale in 3rds)', time: 5 },
        { name: 'Chord voicing practice (new shapes)', time: 5 },
        { name: 'Song work (apply techniques to a real song)', time: 10 }
      ]
    },
    {
      id: 'deep',
      title: 'Deep Practice',
      icon: '🔥',
      duration: '60 min',
      description: 'Full routine across multiple categories. For serious sessions.',
      drills: [
        { name: 'Warm-up + stretching', time: 5 },
        { name: 'Picking technique (alternate + economy)', time: 8 },
        { name: 'Fretting drills (barre chords, spider)', time: 7 },
        { name: 'Scale work (modes, sequences, patterns)', time: 10 },
        { name: 'Rhythm exercises (16th notes, muting)', time: 5 },
        { name: 'Arpeggios (major, minor, dominant 7th)', time: 5 },
        { name: 'Song repertoire (3-4 songs, full play-through)', time: 15 },
        { name: 'Improvisation / free play', time: 5 }
      ]
    }
  ],

  weeklyProgramme: {
    title: '52-Week Workout (Guitar Aerobics)',
    description: 'One technique per day, building across the week. Each week increases in difficulty.',
    schedule: [
      { day: 'Monday', technique: 'Alternate Picking', icon: '🎸' },
      { day: 'Tuesday', technique: 'String Skipping', icon: '🔀' },
      { day: 'Wednesday', technique: 'String Bending', icon: '〰️' },
      { day: 'Thursday', technique: 'Arpeggios', icon: '🔺' },
      { day: 'Friday', technique: 'Sweep Picking', icon: '🧹' },
      { day: 'Saturday', technique: 'Legato', icon: '🔗' },
      { day: 'Sunday', technique: 'Rhythm', icon: '🥁' }
    ],
    bpmRange: '40-120+ (gradual increase over 52 weeks)',
    styles: 'Rock, Blues, Jazz, Metal, Country, Funk'
  }
};

window.PRACTICE = PRACTICE;
