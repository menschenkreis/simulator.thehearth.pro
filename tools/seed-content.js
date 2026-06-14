#!/usr/bin/env node
// Seed existing hardcoded content to the Hearth API
// Usage: node tools/seed-content.js

const API = 'https://thehearth.pro/api/';

async function post(action, data) {
  const r = await fetch(API + '?a=' + action, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const j = await r.json();
  if (!r.ok && !j.error?.includes('Duplicate')) throw new Error(j.error || 'Failed');
  return j;
}

async function seed() {
  console.log('Seeding content to Hearth API...\n');

  // Seed books from knowledge base
  const books = [
    { key_name:'rhythm-guitar', title:'Rhythm Guitar', author:'Ayla', category:'rhythm', difficulty:1 },
    { key_name:'the-guitar-handbook', title:'The Guitar Handbook', author:'Ralph Denyer', category:'guitar', difficulty:1, pdf_url:'' },
    { key_name:'fretboard-logic', title:'Fretboard Logic', author:'Bill Edwards', category:'fretboard', difficulty:2 },
    { key_name:'modern-method-guitar', title:'Modern Method for Guitar', author:'William Leavitt', category:'guitar', difficulty:2 },
    { key_name:'pumping-nylon', title:'Pumping Nylon', author:'Scott Tennant', category:'classical', difficulty:2 },
    { key_name:'advancing-guitarist', title:'The Advancing Guitarist', author:'Mick Goodrick', category:'guitar', difficulty:3 },
    { key_name:'songwriting-guitar', title:'How to Write Songs on Guitar', author:'Rikky Rooksby', category:'songwriting', difficulty:1 },
    { key_name:'chord-melody-fisher', title:'Chord Melody', author:'Jody Fisher', category:'jazz', difficulty:3 },
    { key_name:'improvisation-fisher', title:'Improvisation', author:'Jody Fisher', category:'jazz', difficulty:3 },
    { key_name:'english-handbook', title:'English Handbook and Study Guide', author:'Beryl Lytton & Marcelle Pincus', category:'learning', difficulty:1 },
    { key_name:'learning-how-to-learn', title:'Learning How to Learn', author:'L. Ron Hubbard', category:'learning', difficulty:1 },
  ];
  let bookCount = 0;
  for (const b of books) {
    try { await post('content-books', b); bookCount++; } catch(e) {}
  }
  console.log(`Books: ${bookCount} seeded`);

  // Seed topics from Knowing categories
  const knowingTopics = [];
  if (typeof global.KNOWING !== 'undefined' && global.KNOWING.categories) {
    global.KNOWING.categories.forEach(cat => {
      cat.topics.forEach(t => {
        knowingTopics.push({
          key_name: t.id, title: t.title, category: cat.id,
          body: t.body || '', difficulty: t.difficulty || 1,
          source: t.source || ''
        });
      });
    });
  }
  // Fallback: known topics from the codebase
  const fallbackTopics = [
    { key_name:'time-signatures', title:'Time Signatures', category:'rhythm', level_num:1, source:'Rhythm Guitar' },
    { key_name:'note-values', title:'Note Values', category:'rhythm', level_num:1, source:'Rhythm Guitar' },
    { key_name:'rhythm-subdivision', title:'Rhythm Subdivision', category:'rhythm', level_num:2, source:'Rhythm Guitar' },
    { key_name:'syncopation', title:'Syncopation', category:'rhythm', level_num:3, source:'Rhythm Guitar' },
    { key_name:'pentatonic-scale', title:'Pentatonic Scale', category:'scales', level_num:1, source:'The Guitar Handbook' },
    { key_name:'major-scale', title:'Major Scale', category:'scales', level_num:2, source:'The Guitar Handbook' },
    { key_name:'minor-scale', title:'Minor Scale', category:'scales', level_num:2, source:'The Guitar Handbook' },
    { key_name:'modes', title:'Modes', category:'scales', level_num:4, source:'The Guitar Handbook' },
    { key_name:'open-chords', title:'Open Chords', category:'chords', level_num:1, source:'The Guitar Handbook' },
    { key_name:'barre-chords', title:'Barre Chords', category:'chords', level_num:2, source:'The Guitar Handbook' },
    { key_name:'triads', title:'Triads', category:'chords', level_num:3, source:'The Guitar Handbook' },
    { key_name:'7th-chords', title:'7th Chords', category:'chords', level_num:4, source:'The Guitar Handbook' },
    { key_name:'extensions', title:'Extensions', category:'chords', level_num:5, source:'The Guitar Handbook' },
    { key_name:'intervals', title:'Intervals', category:'theory', level_num:2, source:'The Guitar Handbook' },
    { key_name:'circle-of-fifths', title:'Circle of Fifths', category:'theory', level_num:3, source:'The Guitar Handbook' },
    { key_name:'key-signatures', title:'Key Signatures', category:'theory', level_num:3, source:'The Guitar Handbook' },
    { key_name:'chord-progressions', title:'Chord Progressions', category:'theory', level_num:3, source:'How to Write Songs on Guitar' },
    { key_name:'arpeggios', title:'Arpeggios', category:'technique', level_num:3, source:'The Guitar Handbook' },
    { key_name:'alternate-picking', title:'Alternate Picking', category:'technique', level_num:1, source:'Fretboard Logic' },
    { key_name:'fingerpicking', title:'Fingerpicking', category:'technique', level_num:2, source:'Pumping Nylon' },
    { key_name:'sweep-picking', title:'Sweep Picking', category:'technique', level_num:4, source:'Fretboard Logic' },
    { key_name:'bending', title:'Bending', category:'technique', level_num:2, source:'The Guitar Handbook' },
    { key_name:'vibrato', title:'Vibrato', category:'technique', level_num:3, source:'The Guitar Handbook' },
    { key_name:'slide-technique', title:'Slides', category:'technique', level_num:2, source:'The Guitar Handbook' },
    { key_name:'hammer-ons-pull-offs', title:'Hammer-ons & Pull-offs', category:'technique', level_num:2, source:'The Guitar Handbook' },
    { key_name:'guide-tones', title:'Guide Tones', category:'jazz', level_num:7, source:'Chord Melody' },
    { key_name:'shell-voicings', title:'Shell Voicings', category:'jazz', level_num:5, source:'Chord Melody' },
    { key_name:'ii-v-i', title:'ii-V-I', category:'jazz', level_num:4, source:'Chord Melody' },
    { key_name:'chord-melody-intro', title:'Chord Melody Intro', category:'jazz', level_num:6, source:'Chord Melody' },
    { key_name:'exotic-scales', title:'Exotic & World Scales', category:'scales', level_num:8, source:'The Guitar Handbook' },
    { key_name:'first-song', title:'Your First Song', category:'songwriting', level_num:3, source:'How to Write Songs on Guitar' },
    { key_name:'song-structure', title:'Song Structure', category:'songwriting', level_num:4, source:'How to Write Songs on Guitar' },
    { key_name:'chord-voicings', title:'Chord Voicings', category:'chords', level_num:5, source:'Chord Melody' },
    { key_name:'modulation', title:'Modulation', category:'theory', level_num:6, source:'The Guitar Handbook' },
  ];
  let topicCount = 0;
  const topicsToSeed = knowingTopics.length ? knowingTopics : fallbackTopics;
  for (const t of topicsToSeed) {
    try { await post('content-topics', t); topicCount++; } catch(e) {}
  }
  console.log(`Topics: ${topicCount} seeded`);

  // Seed drills
  const drills = [
    { key_name:'chromatic-warmup', title:'Chromatic Warm-Up', category:'Warm-Up', difficulty:1, level_num:1, bpm_default:60, duration:'3 min', instructions:'Play frets 1-2-3-4 on each string. Focus on clean tone.' },
    { key_name:'pentatonic-pattern-1', title:'Pentatonic Pattern 1', category:'Scales', difficulty:1, level_num:1, bpm_default:60, duration:'5 min', instructions:'Learn the first pentatonic box shape. Start at fret 5 on low E.' },
    { key_name:'pentatonic-pattern-2', title:'Pentatonic Pattern 2', category:'Scales', difficulty:2, level_num:2, bpm_default:60, duration:'5 min', instructions:'Second pentatonic box. Connect to Pattern 1.' },
    { key_name:'chord-transitions', title:'Chord Transitions', category:'Chords', difficulty:1, level_num:1, bpm_default:60, duration:'5 min', instructions:'Practice switching between open chords. G-C-D-Em.' },
    { key_name:'strum-patterns', title:'Strum Patterns', category:'Rhythm', difficulty:1, level_num:1, bpm_default:80, duration:'5 min', instructions:'Basic down-up strum patterns. D-DU-UDU.' },
    { key_name:'alternate-picking-drill', title:'Alternate Picking', category:'Technique', difficulty:1, level_num:1, bpm_default:60, duration:'5 min', instructions:'Strict alternate picking on single string. Start slow.' },
    { key_name:'barre-chord-drill', title:'Barre Chord Practice', category:'Chords', difficulty:2, level_num:2, bpm_default:60, duration:'5 min', instructions:'F and Bb barre chords. Focus on clean barre.' },
    { key_name:'major-scale-drill', title:'Major Scale', category:'Scales', difficulty:2, level_num:2, bpm_default:60, duration:'5 min', instructions:'C major scale in open position. Ascending and descending.' },
    { key_name:'bending-drill', title:'Bending Practice', category:'Technique', difficulty:2, level_num:2, bpm_default:60, duration:'3 min', instructions:'Half and whole bends on string 3. Target pitch accuracy.' },
    { key_name:'fingerpicking-drill', title:'Fingerpicking Pattern', category:'Technique', difficulty:2, level_num:2, bpm_default:60, duration:'5 min', instructions:'Travis picking pattern. Thumb alternates bass, fingers pick melody.' },
    { key_name:'speed-ladder', title:'Speed Ladder', category:'Speed', difficulty:2, level_num:2, bpm_default:60, duration:'5 min', instructions:'Start at 60 BPM. If clean for 4 reps, increase by 4 BPM. If mistake, drop 8 BPM.' },
    { key_name:'string-crossing', title:'String Crossing', category:'Technique', difficulty:2, level_num:2, bpm_default:60, duration:'5 min', instructions:'Smooth transitions between strings. 4 notes per string then cross.' },
    { key_name:'arpeggio-drill', title:'Arpeggio Patterns', category:'Scales', difficulty:2, level_num:3, bpm_default:60, duration:'5 min', instructions:'Break chords into individual notes. Am, C, G shapes.' },
    { key_name:'palm-muting', title:'Palm Muting', category:'Rhythm', difficulty:1, level_num:1, bpm_default:80, duration:'3 min', instructions:'Rest picking hand on strings near bridge. Muted strumming.' },
    { key_name:'travis-picking', title:'Travis Picking', category:'Technique', difficulty:3, level_num:3, bpm_default:50, duration:'5 min', instructions:'Thumb plays bass pattern, fingers play melody. Independence takes weeks.' },
    { key_name:'interval-recognition', title:'Interval Recognition', category:'Ear Training', difficulty:1, level_num:1, bpm_default:0, duration:'3 min', instructions:'Play two notes. Name the interval. Start with octave, fifth, third.' },
    { key_name:'song-application', title:'Song Application', category:'Music', difficulty:2, level_num:2, bpm_default:0, duration:'5 min', instructions:'Play a song through once. Isolate hardest 4 bars. Drill those. Play full song again.' },
    { key_name:'slides-legato', title:'Slides & Legato', category:'Technique', difficulty:2, level_num:2, bpm_default:70, duration:'5 min', instructions:'Hammer-ons, pull-offs, slides. Each should equal picked volume.' },
  ];
  let drillCount = 0;
  for (const d of drills) {
    try { await post('content-drills', d); drillCount++; } catch(e) {}
  }
  console.log(`Drills: ${drillCount} seeded`);

  // Seed references
  const refs = [
    { source_title:'The Guitar Handbook', author:'Ralph Denyer', page_start:42, page_end:50, chapter:'Rhythm', section:'Time Signatures', linked_topic_id:1 },
    { source_title:'The Guitar Handbook', author:'Ralph Denyer', page_start:52, page_end:58, chapter:'Scales', section:'Pentatonic Scale' },
    { source_title:'The Guitar Handbook', author:'Ralph Denyer', page_start:60, page_end:68, chapter:'Scales', section:'Major Scale' },
    { source_title:'The Guitar Handbook', author:'Ralph Denyer', page_start:70, page_end:76, chapter:'Chords', section:'Open Chords' },
    { source_title:'The Guitar Handbook', author:'Ralph Denyer', page_start:78, page_end:84, chapter:'Chords', section:'Barre Chords' },
    { source_title:'The Guitar Handbook', author:'Ralph Denyer', page_start:90, page_end:96, chapter:'Theory', section:'Intervals' },
    { source_title:'The Guitar Handbook', author:'Ralph Denyer', page_start:100, page_end:106, chapter:'Theory', section:'Circle of Fifths' },
    { source_title:'Fretboard Logic', author:'Bill Edwards', page_start:15, page_end:25, chapter:'CAGED', section:'Pattern System' },
    { source_title:'Pumping Nylon', author:'Scott Tennant', page_start:30, page_end:40, chapter:'Technique', section:'Right Hand' },
    { source_title:'How to Write Songs on Guitar', author:'Rikky Rooksby', page_start:1, page_end:15, chapter:'Getting Started', section:'First Song' },
    { source_title:'How to Write Songs on Guitar', author:'Rikky Rooksby', page_start:40, page_end:55, chapter:'Progressions', section:'Common Progressions' },
    { source_title:'Chord Melody', author:'Jody Fisher', page_start:1, page_end:20, chapter:'Introduction', section:'Chord Melody Concept' },
    { source_title:'Learning How to Learn', author:'L. Ron Hubbard', page_start:1, page_end:10, chapter:'Barriers', section:'Three Barriers to Study' },
    { source_title:'English Handbook and Study Guide', author:'Beryl Lytton & Marcelle Pincus', page_start:1, page_end:15, chapter:'Study Methods', section:'Effective Study' },
  ];
  let refCount = 0;
  for (const r of refs) {
    try { await post('content-refs', r); refCount++; } catch(e) {}
  }
  console.log(`References: ${refCount} seeded`);

  console.log('\nSeed complete!');
}

seed().catch(e => console.error('Seed failed:', e.message));
