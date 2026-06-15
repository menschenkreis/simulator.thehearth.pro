// Play Node — Songs & Genres
// Sources: 14 books across 9 genres

const PLAY = {
  id: 'play',
  title: 'Play',
  tag: 'DOING PATH',
  description: 'Songs, genres, backing tracks, playing along with other instruments. Discover YOUR sound. Collab lives here.',
  sources: [
    'John Ganapes — Blues You Can Use (Hal Leonard, 1995)',
    'Jim Ferguson — All Blues Soloing for Jazz Guitar (Mel Bay, 1999)',
    'Jamey Aebersold — How to Play Jazz and Improvise Vol 1',
    'Jody Fisher — Beginning Jazz Guitar / Intermediate / Chord Melody / Improvisation',
    'Martin Taylor — Jazz Guitar Artistry Vol 1',
    'Christopher Parkening — Guitar Method Vol 1 & 2',
    'Frederick Noad — The Classical Guitar (Guitar Anthology)',
    'Brian Hodel — The Brazilian Masters (Jobim, Bonfa, Baden Powell)',
    'Paul Donat — Bossa Nova for Guitar',
    'Glenn Weiser — Celtic Guitar Encyclopedia (Mel Bay)',
    'Ross Bolton — Funk Guitar: The Essential Guide (Hal Leonard)',
    'David Hamburger — Acoustic Guitar Slide Basics',
    'Fred Sokolow — The Roots of Slide Guitar',
    'John Jorgenson — Gypsy Jazz Guitar',
    'Troy Stetina — Speed Mechanics for Lead Guitar'
  ],

  genres: [
    {
      id: 'blues',
      title: 'Blues',
      icon: '🎷',
      color: '#5a9fd4',
      description: 'Where it all starts. 12-bar blues, shuffle rhythms, turnarounds. The foundation of rock, jazz, and soul.',
      difficulty: 'Beginner → Intermediate',
      books: ['Ganapes — Blues You Can Use', 'Ferguson — All Blues Soloing'],
      songs: [
        { title: '12-Bar Blues in A', difficulty: 1, source: 'Ganapes' },
        { title: 'Shuffle Rhythm Pattern', difficulty: 1, source: 'Ganapes' },
        { title: 'Blues Turnarounds (5 variations)', difficulty: 2, source: 'Ganapes' },
        { title: 'Chicago Blues Style', difficulty: 2, source: 'Ganapes' },
        { title: 'Jazz-Blues Soloing', difficulty: 3, source: 'Ferguson' }
      ]
    },
    {
      id: 'jazz',
      title: 'Jazz',
      icon: '🎺',
      color: '#d4af69',
      description: 'The art of improvisation. Chord melody, comping, soloing over changes. The deep end of guitar.',
      difficulty: 'Intermediate → Advanced',
      books: ['Aebersold — How to Play Jazz', 'Fisher — Complete Jazz Guitar Method (Vols 1-4)', 'Martin Taylor — Jazz Guitar Artistry'],
      songs: [
        { title: 'Autumn Leaves (chord melody)', difficulty: 2, source: 'Fisher' },
        { title: 'Blue Bossa (comping)', difficulty: 2, source: 'Aebersold' },
        { title: 'All The Things You Are', difficulty: 3, source: 'Martin Taylor' },
        { title: 'Solo Guitar: Don\'t Get Around Much Anymore', difficulty: 3, source: 'Martin Taylor' },
        { title: 'ii-V-I Progression (all keys)', difficulty: 2, source: 'Aebersold' }
      ]
    },
    {
      id: 'classical',
      title: 'Classical',
      icon: '🎻',
      color: '#9b59b6',
      description: 'The ancient tradition. Fingerstyle, reading standard notation, tone production. Renaissance to modern.',
      difficulty: 'Beginner → Advanced',
      books: ['Parkening Vol 1 & 2', 'Noad — Classical Guitar Anthology'],
      songs: [
        { title: 'Ode to Joy (single voice)', difficulty: 1, source: 'Parkening Vol 1' },
        { title: 'Romanza (two voices)', difficulty: 2, source: 'Noad' },
        { title: 'Lagrima (Tárrega)', difficulty: 2, source: 'Noad' },
        { title: 'Adelita (Tárrega)', difficulty: 3, source: 'Noad' },
        { title: 'Recuerdos de la Alhambra (tremolo)', difficulty: 3, source: 'Parkening Vol 2' }
      ]
    },
    {
      id: 'brazilian',
      title: 'Brazilian',
      icon: '🌴',
      color: '#00B894',
      description: 'Bossa nova and samba. The subtle syncopation of Jobim, the rhythmic pulse of Bonfa. Musical sunshine.',
      difficulty: 'Intermediate',
      books: ['Hodel — Brazilian Masters', 'Donat — Bossa Nova for Guitar'],
      songs: [
        { title: 'The Girl from Ipanema (bossa comping)', difficulty: 2, source: 'Donat' },
        { title: 'Desafinado (Jobim)', difficulty: 2, source: 'Hodel' },
        { title: 'Samba do Avião (Jobim)', difficulty: 2, source: 'Hodel' },
        { title: 'Manhã de Carnaval (Bonfa)', difficulty: 2, source: 'Hodel' },
        { title: 'Black Orpheus (solo arrangement)', difficulty: 3, source: 'Hodel' }
      ]
    },
    {
      id: 'celtic',
      title: 'Celtic / Irish',
      icon: '🍀',
      color: '#2ECC71',
      description: 'Jigs, reels, hornpipes, airs. The ancient harp tradition adapted for guitar. Fingerstyle arrangements.',
      difficulty: 'Beginner → Intermediate',
      books: ['Weiser — Celtic Guitar Encyclopedia'],
      songs: [
        { title: 'All Through the Night (air)', difficulty: 1, source: 'Weiser' },
        { title: 'Swallowtail Jig', difficulty: 2, source: 'Weiser' },
        { title: 'Cooley\'s Reel', difficulty: 2, source: 'Weiser' },
        { title: 'Londonderry Air (Danny Boy)', difficulty: 2, source: 'Weiser' },
        { title: 'The Parting Glass', difficulty: 1, source: 'Weiser' }
      ]
    },
    {
      id: 'funk',
      title: 'Funk',
      icon: '🕺',
      color: '#E17055',
      description: 'Groove is everything. 16th-note mastery, scratch muting, percussive guitar. Playing in the pocket.',
      difficulty: 'Beginner → Intermediate',
      books: ['Bolton — Funk Guitar: The Essential Guide'],
      songs: [
        { title: 'Basic Funk Rhythm (E7 vamp)', difficulty: 1, source: 'Bolton' },
        { title: 'Scratch Muting Pattern', difficulty: 1, source: 'Bolton' },
        { title: 'Funky Shuffle', difficulty: 2, source: 'Bolton' },
        { title: 'Minor Funk Groove', difficulty: 2, source: 'Bolton' },
        { title: 'Funk Jam (putting it all together)', difficulty: 3, source: 'Bolton' }
      ]
    },
    {
      id: 'slide',
      title: 'Slide Guitar',
      icon: '🎸',
      color: '#FDCB6E',
      description: 'Open tunings, bottleneck technique, the voice of the Delta. Raw, expressive, human.',
      difficulty: 'Intermediate',
      books: ['Hamburger — Acoustic Slide Basics', 'Sokolow — Roots of Slide Guitar'],
      songs: [
        { title: 'Open D Tuning Basics', difficulty: 1, source: 'Hamburger' },
        { title: 'Slide in Standard Tuning', difficulty: 2, source: 'Hamburger' },
        { title: 'Delta Blues Slide', difficulty: 2, source: 'Sokolow' },
        { title: 'Duane Allman Style', difficulty: 3, source: 'Sokolow' },
        { title: 'Ry Cooder Open Tunings', difficulty: 3, source: 'Sokolow' }
      ]
    },
    {
      id: 'gypsy-jazz',
      title: 'Gypsy Jazz',
      icon: '🎻',
      color: '#E17055',
      description: 'The Django tradition. La Pompe rhythm, rest-stroke picking, arpeggio-based soloing. Swing hard.',
      difficulty: 'Intermediate → Advanced',
      books: ['Jorgenson — Gypsy Jazz Guitar'],
      songs: [
        { title: 'La Pompe Rhythm', difficulty: 2, source: 'Jorgenson' },
        { title: 'Minor Swing (chord melody)', difficulty: 3, source: 'Jorgenson' },
        { title: 'Rest-Stroke Picking Exercises', difficulty: 2, source: 'Jorgenson' },
        { title: 'Gypsy Major Scale', difficulty: 2, source: 'Jorgenson' },
        { title: 'Djangology', difficulty: 3, source: 'Jorgenson' }
      ]
    },
    {
      id: 'rock-metal',
      title: 'Rock & Metal',
      icon: '🤘',
      color: '#D63031',
      description: 'Power chords, palm muting, lead guitar. From AC/DC to Metallica. Speed, precision, attitude.',
      difficulty: 'Beginner → Advanced',
      books: ['Stetina — Speed Mechanics for Lead Guitar'],
      songs: [
        { title: 'Power Chord Basics (E5, A5, D5)', difficulty: 1, source: 'Stetina' },
        { title: 'Palm Muting Technique', difficulty: 1, source: 'Stetina' },
        { title: 'Pentatonic Soloing (rock licks)', difficulty: 2, source: 'Stetina' },
        { title: 'Alternate Picking Speed Drills', difficulty: 3, source: 'Stetina' },
        { title: 'Sweep Picking Arpeggios', difficulty: 3, source: 'Stetina' }
      ]
    }
  ]
};

window.PLAY = PLAY;
