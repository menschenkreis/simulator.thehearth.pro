// Reference Library — Full Citations
// Used across all content nodes for proper attribution

const REFERENCES = {
  'guitar-aerobics': {
    short: 'Guitar Aerobics',
    full: 'Troy Nelson, "Guitar Aerobics: A 52-Week, One-lick-per-day Workout Program" (Hal Leonard, 2007)',
    author: 'Troy Nelson',
    publisher: 'Hal Leonard',
    year: 2007,
    pages: { mon: 'pp.8-14', tue: 'pp.15-22', wed: 'pp.23-30', thu: 'pp.31-38', fri: 'pp.39-46', sat: 'pp.47-54', sun: 'pp.55-62' }
  },
  'exercises-dummies': {
    short: 'Guitar Exercises For Dummies',
    full: 'Mark Phillips & Jon Chappell, "Guitar Exercises For Dummies" (Wiley, 2009)',
    author: 'Mark Phillips & Jon Chappell',
    publisher: 'Wiley',
    year: 2009
  },
  'stetina-speed': {
    short: 'Speed Mechanics',
    full: 'Troy Stetina, "Speed Mechanics for Lead Guitar" (Hal Leonard, 1992)',
    author: 'Troy Stetina',
    publisher: 'Hal Leonard',
    year: 1992
  },
  'bolton-funk': {
    short: 'Funk Guitar',
    full: 'Ross Bolton, "Funk Guitar: The Essential Guide" (Musicians Institute Press / Hal Leonard)',
    author: 'Ross Bolton',
    publisher: 'Musicians Institute Press / Hal Leonard'
  },
  'ganapes-blues': {
    short: 'Blues You Can Use',
    full: 'John Ganapes, "Blues You Can Use" (Hal Leonard, 1995)',
    author: 'John Ganapes',
    publisher: 'Hal Leonard',
    year: 1995
  },
  'jorgenson-gypsy': {
    short: 'Gypsy Jazz Guitar',
    full: 'John Jorgenson & Andy MacKenzie, "Swing Dreams Are Made of These: A Lesson in Gypsy Jazz" (Guitar Player, Dec 1996)',
    author: 'John Jorgenson',
    publisher: 'Guitar Player Magazine',
    year: 1996
  },
  'parkening-1': {
    short: 'Parkening Vol 1',
    full: 'Christopher Parkening, Jack Marshall, David Brandon, "The Christopher Parkening Guitar Method — Volume 1" (Hal Leonard, 1997)',
    author: 'Christopher Parkening',
    publisher: 'Hal Leonard',
    year: 1997
  },
  'parkening-2': {
    short: 'Parkening Vol 2',
    full: 'Christopher Parkening, Jack Marshall, David Brandon, "The Christopher Parkening Guitar Method — Volume 2" (Hal Leonard, 1998)',
    author: 'Christopher Parkening',
    publisher: 'Hal Leonard',
    year: 1998
  },
  'berklee-phase2': {
    short: 'Berklee Phase 2',
    full: 'William Leavitt, "A Modern Method for Guitar — Phase 2" (Berklee Press)',
    author: 'William Leavitt',
    publisher: 'Berklee Press'
  },
  'cary-white': {
    short: 'Complete Guitar Series',
    full: 'Cary White, "The Complete Guitar Series, Volume 1" (Wildwood Publishing)',
    author: 'Cary White',
    publisher: 'Wildwood Publishing'
  },
  'wolfsohn': {
    short: 'Music Theory for Guitar',
    full: 'Michael P. Wolfsohn, "Music Theory for Guitar: An Introduction to the Essentials"',
    author: 'Michael P. Wolfsohn'
  },
  'hamburger-slide': {
    short: 'Slide Basics',
    full: 'David Hamburger, "Acoustic Guitar Slide Basics" (String Letter Publishing, 2001)',
    author: 'David Hamburger',
    publisher: 'String Letter Publishing',
    year: 2001
  },
  'sokolow-slide': {
    short: 'Roots of Slide Guitar',
    full: 'Fred Sokolow, "The Roots of Slide Guitar" (Hal Leonard, 1999)',
    author: 'Fred Sokolow',
    publisher: 'Hal Leonard',
    year: 1999
  },
  'satriani': {
    short: 'Guitar Secrets',
    full: 'Joe Satriani, "Guitar Secrets" (Guitar Educational)',
    author: 'Joe Satriani'
  },
  'belkadi': {
    short: 'Advanced Scale Concepts',
    full: 'Jean Marc Belkadi, "Advanced Scale Concepts and Licks for Guitar" (Musicians Institute Press / Hal Leonard)',
    author: 'Jean Marc Belkadi',
    publisher: 'Musicians Institute Press / Hal Leonard'
  },
  'fowler': {
    short: 'Guitar Patterns',
    full: 'William L. Fowler, "Guitar Patterns for Improvisation" ( Maher Publications, 1971)',
    author: 'William L. Fowler',
    publisher: ' Maher Publications',
    year: 1971
  },
  'jamie-andreas': {
    short: 'Correct Practice',
    full: 'Jamie Andreas, "Principles of Correct Practice for Guitar" (1999)',
    author: 'Jamie Andreas',
    year: 1999
  },
  'stefurak': {
    short: 'Guitar Building Blocks',
    full: 'Patrick Stefurak, "Guitar Building Blocks" (1996)',
    author: 'Patrick Stefurak',
    year: 1996
  },
  'sokolow-fretboard': {
    short: 'Fretboard Roadmaps',
    full: 'Fred Sokolow, "Fretboard Roadmaps" (Hal Leonard)',
    author: 'Fred Sokolow',
    publisher: 'Hal Leonard'
  },
  'rooksby': {
    short: 'How to Write Songs',
    full: 'Rikky Rooksby, "How to Write Songs on Guitar: A Guitar-Playing and Songwriting Course" (Miller Freeman Books, 2000)',
    author: 'Rikky Rooksby',
    publisher: 'Miller Freeman Books',
    year: 2000
  },
  'donat-bossa': {
    short: 'Bossa Nova for Guitar',
    full: 'Paul Donat, "Bossa Nova for Guitar"',
    author: 'Paul Donat'
  },
  'weiser-celtic': {
    short: 'Celtic Guitar Encyclopedia',
    full: 'Glenn Weiser, "Mel Bay\'s Celtic Guitar Encyclopedia" (Mel Bay Publications)',
    author: 'Glenn Weiser',
    publisher: 'Mel Bay Publications'
  },
  'hodel-brazilian': {
    short: 'Brazilian Masters',
    full: 'Brian Hodel, "The Brazilian Masters: Guitar Arrangements" (music of Jobim, Bonfa, Baden Powell)',
    author: 'Brian Hodel'
  },
  'roberts-superchops': {
    short: 'Super Chops',
    full: 'Howard Roberts, "Super Chops: Jazz Guitar in 20 Weeks"',
    author: 'Howard Roberts'
  },
  'baione-practice': {
    short: 'Berklee Practice Method',
    full: 'Larry Baione, "Berklee Practice Method: Guitar" (Berklee Press, 2001)',
    author: 'Larry Baione',
    publisher: 'Berklee Press',
    year: 2001
  },
  'charles-kim': {
    short: 'Teach Yourself VISUALLY',
    full: 'Charles Kim, "Teach Yourself VISUALLY Guitar" (Visual / Wiley, 2006)',
    author: 'Charles Kim',
    publisher: 'Wiley',
    year: 2006
  },
  'grimoire': {
    short: 'Guitar Grimoire',
    full: 'Adam Kadmon, "The Guitar Grimoire: A Compendium of Formulas for Guitar Scales and Modes"',
    author: 'Adam Kadmon'
  },
  'peckham-chords': {
    short: 'Berklee Jazz Chord Dictionary',
    full: 'Rick Peckham, "Berklee Jazz Guitar Chord Dictionary" (Berklee Press / Hal Leonard, 2007)',
    author: 'Rick Peckham',
    publisher: 'Berklee Press / Hal Leonard',
    year: 2007
  },
  'leavitt-vol1': {
    short: 'Modern Method Vol 1',
    full: 'William Leavitt, "A Modern Method for Guitar — Volume 1" (Berklee Press)',
    author: 'William Leavitt',
    publisher: 'Berklee Press'
  },
  'picture-chord': {
    short: 'Picture Chord Encyclopedia',
    full: 'Hal Leonard, "Picture Chord Encyclopedia: Photos & Diagrams for Over 2,600 Guitar Chords" (Hal Leonard, 2000)',
    author: 'Hal Leonard',
    publisher: 'Hal Leonard',
    year: 2000
  },
  'fretboard-roadmaps': {
    short: 'Fretboard Roadmaps',
    full: 'Fred Sokolow, "Fretboard Roadmaps" (Hal Leonard)',
    author: 'Fred Sokolow',
    publisher: 'Hal Leonard'
  }
};

// Helper function to get a formatted reference
function getRef(key) {
  return REFERENCES[key] || { short: key, full: key };
}

window.REFERENCES = REFERENCES;
window.getRef = getRef;
