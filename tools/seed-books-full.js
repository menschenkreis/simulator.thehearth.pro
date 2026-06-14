#!/usr/bin/env node
// Seed ALL knowledge base books into the Hearth API
const API = 'https://thehearth.pro/api/';

async function post(action, data) {
  const r = await fetch(API + '?a=' + action, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const j = await r.json();
  if (!r.ok && !j.error?.includes('Duplicate')) console.warn('  skip:', data.key_name, j.error);
  return j;
}

async function seed() {
  console.log('Seeding ALL knowledge base books...\n');

  const books = [
    // FOUNDATION
    { key_name:'complete-guitar-vol1', title:'Complete Guitar Series Vol 1', author:'Cary White', category:'foundation', difficulty:1, description:'Anatomy, posture, tuning, first chords' },
    { key_name:'leavitt-modern-method-1', title:'Modern Method for Guitar Vol 1', author:'William Leavitt', category:'foundation', difficulty:1, description:'Reading basics, note identification' },
    { key_name:'leavitt-berklee-phase1', title:'Berklee Phase 1', author:'William Leavitt', category:'foundation', difficulty:1, description:'Reading-first approach to guitar' },
    { key_name:'teach-visually-guitar', title:'Teach Yourself VISUALLY Guitar', author:'Marc Schonbrun', category:'foundation', difficulty:1, description:'Visual technique guides' },
    { key_name:'correct-practice', title:'Principles of Correct Practice for Guitar', author:'Jamie Andreas', category:'foundation', difficulty:1, description:'How to practise — the meta-skill' },
    { key_name:'guitar-building-blocks', title:'Guitar Building Blocks', author:'Patrick Stefurak', category:'foundation', difficulty:1, description:'Foundation concepts' },

    // DOING
    { key_name:'guitar-exercises-dummies', title:'Guitar Exercises For Dummies', author:'Phillips & Chappell', category:'doing', difficulty:2, description:'Scale patterns, arpeggio drills, finger independence' },
    { key_name:'guitar-aerobics', title:'Guitar Aerobics', author:'Troy Nelson', category:'doing', difficulty:2, description:'365 daily exercises across 7 technique categories' },
    { key_name:'berklee-phase2', title:'Berklee Phase 2', author:'Larry Baione', category:'doing', difficulty:2, description:'Reading drills, alternate picking, position shifting' },
    { key_name:'funk-guitar', title:'Funk Guitar', author:'Ross Bolton', category:'doing', difficulty:2, description:'Rhythm drills, 16th-note subdivision, muting' },
    { key_name:'satriani-guitar-secrets', title:'Guitar Secrets', author:'Joe Satriani', category:'doing', difficulty:3, description:'Warm-ups, one-string scales, grouped articulations' },
    { key_name:'right-hand-development', title:'Right Hand Development', author:'Renard Hoover', category:'doing', difficulty:2, description:'Right hand technique development' },
    { key_name:'fretboard-roadmaps', title:'Fretboard Roadmaps', author:'Fred Sokolow & Tim Emmons', category:'doing', difficulty:2, description:'Fretboard navigation drills' },

    // KNOWING
    { key_name:'music-theory-guitar', title:'Music Theory for Guitar', author:'Michael P. Wolfsohn', category:'knowing', difficulty:2, description:'Core spine: intervals → secondary dominants' },
    { key_name:'music-theory-workbook', title:'Music Theory Workbook', author:'Bruce Arnold', category:'knowing', difficulty:2, description:'Exercises, not just reading' },
    { key_name:'modal-scales-spanish', title:'Modal Scales Spanish Guitar', author:'', category:'knowing', difficulty:3, description:'Modes and modal theory' },
    { key_name:'guitar-patterns-improv', title:'Guitar Patterns for Improvisation', author:'Fowler', category:'knowing', difficulty:3, description:'Tetrachord system, scale-to-chord mapping' },
    { key_name:'advanced-scale-concepts', title:'Advanced Scale Concepts and Licks', author:'Jean Marc Belkadi', category:'knowing', difficulty:4, description:'Complete scale taxonomy: pentatonic → diminished' },
    { key_name:'guitar-grimoire', title:'The Guitar Grimoire', author:'Adam Kadmon', category:'knowing', difficulty:4, description:'THE scale/chord encyclopedia' },
    { key_name:'jazz-chord-dictionary', title:'Berklee Jazz Chord Dictionary', author:'Rick Peckham', category:'knowing', difficulty:3, description:'100+ movable jazz voicings' },
    { key_name:'ultimate-chord-chart', title:'Ultimate Chord Chart', author:'Phillip Facoline', category:'knowing', difficulty:1, description:'Quick chord lookup' },
    { key_name:'picture-chord-encyclopedia', title:'Picture Chord Encyclopedia', author:'Hal Leonard', category:'knowing', difficulty:2, description:'2,600+ chord voicings with photos' },

    // PRACTISE
    { key_name:'super-chops', title:'Super Chops: Jazz Guitar Technique in 20 Weeks', author:'Howard Roberts', category:'practice', difficulty:3, description:'Structured jazz practice programme' },
    { key_name:'berklee-practice-method', title:'Berklee Practice Method: Guitar', author:'Larry Baione', category:'practice', difficulty:2, description:'Genre-based daily routines: rock, blues, jazz, funk, country' },
    { key_name:'blues-you-can-use', title:'Blues You Can Use', author:'John Ganapes', category:'practice', difficulty:2, description:'Blues practice routines' },

    // PLAY — Blues
    { key_name:'all-blues-soloing', title:'All Blues Soloing', author:'Jim Ferguson', category:'play', difficulty:3, description:'Jazz-blues soloing vocabulary' },
    // PLAY — Jazz
    { key_name:'how-to-play-jazz', title:'How to Play Jazz and Improvise', author:'Jamey Aebersold', category:'play', difficulty:3, description:'Play-along, improvisation framework' },
    { key_name:'jazz-guitar-artistry', title:'Jazz Guitar Artistry', author:'Martin Taylor', category:'play', difficulty:4, description:'7 jazz standard transcriptions' },
    { key_name:'beginning-jazz-guitar', title:'Beginning Jazz Guitar', author:'Jody Fisher', category:'play', difficulty:2, description:'Complete jazz guitar method — beginning' },
    { key_name:'intermediate-jazz-guitar', title:'Intermediate Jazz Guitar', author:'Jody Fisher', category:'play', difficulty:3, description:'Complete jazz guitar method — intermediate' },
    // PLAY — Classical
    { key_name:'parkening-vol1', title:'The Christopher Parkening Guitar Method Vol 1', author:'Christopher Parkening', category:'play', difficulty:2, description:'Classical technique primer' },
    { key_name:'parkening-vol2', title:'The Christopher Parkening Guitar Method Vol 2', author:'Christopher Parkening', category:'play', difficulty:3, description:'Advanced classical repertoire' },
    { key_name:'noad-classical-anthology', title:'Classical Guitar Anthology', author:'Frederick Noad', category:'play', difficulty:3, description:'Graded Renaissance → modern' },
    // PLAY — Brazilian
    { key_name:'brazilian-masters', title:'Brazilian Masters', author:'Brian Hodel', category:'play', difficulty:3, description:'Jobim, Bonfa, Baden Powell' },
    { key_name:'bossa-nova-guitar', title:'Bossa Nova for Guitar', author:'Paul Donat', category:'play', difficulty:2, description:'Bossa nova guitar style' },
    // PLAY — Celtic
    { key_name:'celtic-guitar-encyclopedia', title:'Celtic Guitar Encyclopedia', author:'Glenn Weiser', category:'play', difficulty:3, description:'90+ Celtic tunes' },
    // PLAY — Slide
    { key_name:'acoustic-slide-basics', title:'Acoustic Slide Basics', author:'David Hamburger', category:'play', difficulty:2, description:'Open tunings, bottleneck technique' },
    { key_name:'roots-of-slide', title:'Roots of Slide Guitar', author:'Fred Sokolow', category:'play', difficulty:3, description:'Delta blues, slide history' },
    // PLAY — Gypsy Jazz
    { key_name:'gypsy-jazz', title:'Gypsy Jazz', author:'John Jorgenson', category:'play', difficulty:3, description:'La Pompe, rest-stroke picking' },
    // PLAY — Rock/Metal
    { key_name:'speed-mechanics', title:'Speed Mechanics for Lead Guitar', author:'Troy Stetina', category:'play', difficulty:4, description:'Alternate picking, sweep, legato, tapping' },

    // CREATE
    { key_name:'how-to-write-songs', title:'How to Write Songs on Guitar', author:'Rikky Rooksby', category:'create', difficulty:1, description:'1,500 song examples, chord sequences, melody, lyrics' },
    { key_name:'chord-melody-fisher', title:'Jazz Guitar Chord Melody', author:'Jody Fisher', category:'create', difficulty:3, description:'Arranging for solo guitar' },
    { key_name:'improvisation-fisher', title:'Jazz Guitar Improvisation', author:'Jody Fisher', category:'create', difficulty:3, description:'Advanced arranging, melodic development' },

    // MASTERY (also uses Knowing + Create sources)
    { key_name:'levitin-brain-music', title:'This Is Your Brain on Music', author:'Daniel J. Levitin', category:'mastery', difficulty:3, description:'The science of a human obsession' },
    { key_name:'patel-music-language-brain', title:'Music, Language, and the Brain', author:'Aniruddh D. Patel', category:'mastery', difficulty:4, description:'Neuroscience of music cognition' },
    { key_name:'music-instinct', title:'The Music Instinct', author:'Philip Ball', category:'mastery', difficulty:3, description:'How music works and why we can\'t do without it' },
    { key_name:'mixing-secrets', title:'Mixing Secrets', author:'Mike Senior', category:'create', difficulty:3, description:'Recording and mixing techniques' },
    { key_name:'recording-engineers-handbook', title:'The Recording Engineer\'s Handbook', author:'Bobby Owsinski', category:'create', difficulty:3, description:'Recording techniques' },
    { key_name:'recording-guitarist', title:'Recording Guitarist', author:'Buono', category:'create', difficulty:2, description:'Home recording for guitarists' },
    { key_name:'making-music-enriching', title:'Making Music, Enriching Lives', author:'Blanchard', category:'mastery', difficulty:2, description:'Music as enrichment and teaching' },
    { key_name:'music-as-discourse', title:'Music as Discourse', author:'Agawu', category:'mastery', difficulty:4, description:'Semiotics and analysis of music' },
  ];

  let count = 0;
  for (const b of books) {
    try { await post('content-books', b); count++; } catch(e) {}
  }
  console.log(`Books: ${count} seeded out of ${books.length} total`);
  console.log('\nDone!');
}

seed().catch(e => console.error('Failed:', e.message));
