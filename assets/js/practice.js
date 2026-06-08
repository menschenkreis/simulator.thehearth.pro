// Practice Node Content
const PRACTICE = {
  id: 'practice',
  title: 'Practice',
  tag: 'PRACTISE',
  description: 'Session-based practice. Pick a time slot, get a structured routine. Timer-driven, feedback-ready.',
  sources: [
    'Troy Nelson — Guitar Aerobics: A 52-Week Workout (2007)',
    'Jamie Andreas — Principles of Correct Practice for Guitar (1999)',
    'Larry Baione — Berklee Practice Method: Guitar (2001)'
  ],
  topics: [
    {
      id: 'p-10min',
      num: '01',
      title: '10-Minute Quick Session',
      subtitle: 'For when you only have 10 minutes',
      tags: ['Quick', 'Daily', 'Any Level'],
      steps: [
        { label: 'Warm-Up', title: 'Finger Stretches & Chromatic Runs', body: '<p>2 minutes. Open hand stretches, then chromatic 1-2-3-4 on each string at 60 BPM. Focus on clean fretting.</p>' },
        { label: 'Drill', title: 'Pentatonic Box 1 — Ascending/Descending', body: '<p>3 minutes. A minor pentatonic at fret 5. Up and down, 80 BPM. Focus on even timing between picking hands.</p>' },
        { label: 'Apply', title: 'Chord Transitions', body: '<p>3 minutes. G → C → D → Em loop. Strum each chord 4 times. Focus on clean transitions — no gaps, no buzzes.</p>' },
        { label: 'Cool Down', title: 'Free Play', body: '<p>2 minutes. Play anything. Feel what you just practised. This is where it becomes music.</p>' }
      ]
    },
    {
      id: 'p-30min',
      num: '02',
      title: '30-Minute Standard Session',
      subtitle: 'The daily bread — balanced routine',
      tags: ['Standard', 'Daily', 'Intermediate'],
      steps: [
        { label: 'Warm-Up', title: 'Full Warm-Up Routine', body: '<p>5 minutes. Stretches, chromatic runs, open string picking exercises. Get blood flowing to both hands.</p>' },
        { label: 'Technique', title: 'Focused Technique Block', body: '<p>10 minutes. Pick ONE: alternate picking, string bending, legato, or barre chords. Use drills from the Doing node. Slow, deliberate, accurate.</p>' },
        { label: 'Repertoire', title: 'Song Practice', body: '<p>10 minutes. Work on 1-2 songs. Don\'t play through — isolate the hard parts. Loop the tricky transition 20 times.</p>' },
        { label: 'Theory', title: 'Applied Theory', body: '<p>3 minutes. Pick one: name the notes on a string, spell a chord, identify an interval by ear. Short, focused.</p>' },
        { label: 'Cool Down', title: 'Play Something You Love', body: '<p>2 minutes. End on a high. Play your favourite riff or song. Associate practice with joy.</p>' }
      ]
    },
    {
      id: 'p-60min',
      num: '03',
      title: '60-Minute Deep Session',
      subtitle: 'For serious practice days',
      tags: ['Deep', 'Weekly', 'Intermediate+'],
      steps: [
        { label: 'Warm-Up', title: 'Extended Warm-Up', body: '<p>8 minutes. Stretches, chromatic patterns across all positions, string skipping warm-ups.</p>' },
        { label: 'Technique A', title: 'Picking & Fretting', body: '<p>12 minutes. Alternate picking across strings (Guitar Aerobics Monday drills). Spider exercises for finger independence.</p>' },
        { label: 'Technique B', title: 'Scales & Arpeggios', body: '<p>10 minutes. Major scale in 3rds, pentatonic sequences, major and minor arpeggios across the neck.</p>' },
        { label: 'Repertoire', title: 'Song Work', body: '<p>15 minutes. 2-3 songs, play-through style. Record yourself and listen back.</p>' },
        { label: 'Create', title: 'Improvisation / Writing', body: '<p>10 minutes. Backing track + pentatonic improvisation. Or work on a chord progression. Free exploration.</p>' },
        { label: 'Cool Down', title: 'Ear Training + Play', body: '<p>5 minutes. Interval recognition (sing intervals). Then play your favourite thing. End inspired.</p>' }
      ]
    }
  ]
};
window.PRACTICE = PRACTICE;
