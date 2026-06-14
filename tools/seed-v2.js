#!/usr/bin/env node
const API = 'https://thehearth.pro/api/';
async function post(a,d){const r=await fetch(API+'?a='+a,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});return r.json();}
async function seed(){
  console.log('Seeding v2 content...\n');

  // SONGS
  const songs = [
    {key_name:'wonderwall',title:'Wonderwall',artist:'Oasis',genre:'rock',difficulty:1,key_sig:'Em',chord_progression:'Em7-G-Dsus4-A7sus4-Cadd9-Dsus4',tempo_bpm:87,time_sig:'4/4'},
    {key_name:'wish-you-were-here',title:'Wish You Were Here',artist:'Pink Floyd',genre:'rock',difficulty:1,key_sig:'Em',chord_progression:'Em-G-A-G-Em-G',tempo_bpm:63},
    {key_name:'house-of-rising-sun',title:'House of the Rising Sun',artist:'The Animals',genre:'folk',difficulty:1,key_sig:'Am',chord_progression:'Am-C-D-F-Am-E-Am',tempo_bpm:76},
    {key_name:'knockin-heavens-door',title:"Knockin' on Heaven's Door",artist:'Bob Dylan',genre:'folk',difficulty:1,key_sig:'G',chord_progression:'G-D-Am-G-D-C',tempo_bpm:68},
    {key_name:'no-woman-no-cry',title:'No Woman No Cry',artist:'Bob Marley',genre:'reggae',difficulty:1,key_sig:'C',chord_progression:'C-G-Am-F',tempo_bpm:78},
    {key_name:'let-it-be',title:'Let It Be',artist:'The Beatles',genre:'rock',difficulty:1,key_sig:'C',chord_progression:'C-G-Am-F-C-G-F-C',tempo_bpm:72},
    {key_name:'autumn-leaves',title:'Autumn Leaves',artist:'Jazz Standard',genre:'jazz',difficulty:3,key_sig:'Gm',chord_progression:'Cm7-F7-Bbmaj7-Ebmaj7-Am7b5-D7-Gm',tempo_bpm:120},
    {key_name:'blue-monk',title:'Blue Monk',artist:'Thelonious Monk',genre:'jazz',difficulty:2,key_sig:'Bb',chord_progression:'Bb7-Eb7-Bb7-Bb7-Eb7-Eb7-Bb7-Bb7-F7-Eb7-Bb7-F7',tempo_bpm:130},
    {key_name:'take-five',title:'Take Five',artist:'Dave Brubeck',genre:'jazz',difficulty:3,key_sig:'Ebm',chord_progression:'Ebm7-Bbm7-Ebm7-Bbm7-Ebm7',tempo_bpm:174,time_sig:'5/4'},
    {key_name:'black-bird',title:'Blackbird',artist:'The Beatles',genre:'folk',difficulty:2,key_sig:'G',chord_progression:'G-Am7-G/B-C-Cm6-G/B-Am7-D7',tempo_bpm:96},
    {key_name:'dust-in-wind',title:'Dust in the Wind',artist:'Kansas',genre:'rock',difficulty:2,key_sig:'C',chord_progression:'C-Cmaj7-Am-Am7-G-Fmaj7-C',tempo_bpm:66},
    {key_name:'hotel-california',title:'Hotel California',artist:'Eagles',genre:'rock',difficulty:2,key_sig:'Bm',chord_progression:'Bm-F#-A-E-G-D-Em-F#',tempo_bpm:74},
    {key_name:'stairway',title:'Stairway to Heaven',artist:'Led Zeppelin',genre:'rock',difficulty:3,key_sig:'Am',chord_progression:'Am-C-D-Fmaj7-Am-G-Fmaj7',tempo_bpm:82},
    {key_name:'blues-in-a',title:'12-Bar Blues in A',artist:'Traditional',genre:'blues',difficulty:1,key_sig:'A',chord_progression:'A-A-A-A-D-D-A-A-E-D-A-E',tempo_bpm:100},
    {key_name:'stormy-monday',title:'Stormy Monday',artist:'T-Bone Walker',genre:'blues',difficulty:2,key_sig:'G',chord_progression:'G9-Dm7-Am7-G9-C9-Cm6-G9-Bm7-Em7-Am7-D7-G9',tempo_bpm:76},
    {key_name:'bossa-nova-medley',title:'Girl from Ipanema',artist:'Jobim',genre:'bossa',difficulty:2,key_sig:'F',chord_progression:'Fmaj7-G7-Gm7-Fmaj7-Db7-C7-Fmaj7',tempo_bpm:140},
    {key_name:'black-orpheus',title:'Black Orpheus',artist:'Luiz Bonfa',genre:'bossa',difficulty:2,key_sig:'Am',chord_progression:'Am-Bdim7-Cm6-Dm6-Am-Bdim7-E7',tempo_bpm:130},
    {key_name:'recuerdos',title:'Recuerdos de la Alhambra',artist:'Tarrega',genre:'classical',difficulty:4,key_sig:'Am',chord_progression:'Arpeggio study',tempo_bpm:60},
    {key_name:'lagrima',title:'Lagrima',artist:'Tarrega',genre:'classical',difficulty:2,key_sig:'E',chord_progression:'Melody study',tempo_bpm:70},
    {key_name:'gypsy-jazz-blues',title:'Minor Swing',artist:'Django Reinhardt',genre:'gypsy',difficulty:3,key_sig:'Am',chord_progression:'Am-Dm-E7-Am',tempo_bpm:200},
    {key_name:'fast-car',title:'Fast Car',artist:'Tracy Chapman',genre:'folk',difficulty:2,key_sig:'C',chord_progression:'C-G-D-Em',tempo_bpm:105},
    {key_name:'hey-joe',title:'Hey Joe',artist:'Jimi Hendrix',genre:'rock',difficulty:2,key_sig:'E',chord_progression:'C-G-D-A-E',tempo_bpm:85},
  ];
  let c=0;for(const s of songs){try{await post('content-songs',s);c++;}catch(e){}}console.log('Songs:',c);

  // VIDEOS
  const videos = [
    {key_name:'qjam-odd-time',title:'Odd Time Signatures on Guitar',youtube_url:'https://www.youtube.com/watch?v=example1',category:'rhythm',level_num:3,description:'How to play in 5/4, 7/8, and other odd meters'},
    {key_name:'qjam-pentatonic',title:'Pentatonic Scale Masterclass',youtube_url:'https://www.youtube.com/watch?v=example2',category:'scales',level_num:1,description:'All 5 pentatonic patterns explained'},
    {key_name:'qjam-modes',title:'Modes Explained Simply',youtube_url:'https://www.youtube.com/watch?v=example3',category:'scales',level_num:4,description:'Ionian through Locrian on guitar'},
    {key_name:'qjam-triads',title:'Triads on Guitar',youtube_url:'https://www.youtube.com/watch?v=example4',category:'chords',level_num:3,description:'Major and minor triads across the neck'},
    {key_name:'qjam-7th-chords',title:'7th Chords Demystified',youtube_url:'https://www.youtube.com/watch?v=example5',category:'chords',level_num:4,description:'Maj7, min7, dom7, dim7 shapes'},
    {key_name:'qjam-extensions',title:'Extensions: 9, 11, 13',youtube_url:'https://www.youtube.com/watch?v=example6',category:'chords',level_num:5,description:'Adding color to your chords'},
    {key_name:'qjam-circle-of-fifths',title:'Circle of Fifths for Guitar',youtube_url:'https://www.youtube.com/watch?v=example7',category:'theory',level_num:3,description:'Understanding key relationships'},
    {key_name:'qjam-intervals',title:'Intervals on the Fretboard',youtube_url:'https://www.youtube.com/watch?v=example8',category:'theory',level_num:2,description:'Finding intervals across strings'},
    {key_name:'qjam-arpeggios',title:'Arpeggio Patterns',youtube_url:'https://www.youtube.com/watch?v=example9',category:'technique',level_num:3,description:'Major, minor, and 7th arpeggios'},
    {key_name:'qjam-bending',title:'Bending Technique',youtube_url:'https://www.youtube.com/watch?v=example10',category:'technique',level_num:2,description:'Half, whole, and micro bends'},
  ];
  c=0;for(const v of videos){try{await post('content-videos',v);c++;}catch(e){}}console.log('Videos:',c);

  // CHORDS
  const chords = [
    {key_name:'c-major',name:'C',chord_type:'major',fingering:'x32010',frets:'x32010'},
    {key_name:'d-major',name:'D',chord_type:'major',fingering:'xx0232',frets:'xx0232'},
    {key_name:'e-major',name:'E',chord_type:'major',fingering:'022100',frets:'022100'},
    {key_name:'f-major',name:'F',chord_type:'major',fingering:'133211',frets:'133211'},
    {key_name:'g-major',name:'G',chord_type:'major',fingering:'320003',frets:'320003'},
    {key_name:'a-major',name:'A',chord_type:'major',fingering:'x02220',frets:'x02220'},
    {key_name:'b-major',name:'B',chord_type:'major',fingering:'x24442',frets:'x24442'},
    {key_name:'am',name:'Am',chord_type:'minor',fingering:'x02210',frets:'x02210'},
    {key_name:'dm',name:'Dm',chord_type:'minor',fingering:'xx0231',frets:'xx0231'},
    {key_name:'em',name:'Em',chord_type:'minor',fingering:'022000',frets:'022000'},
    {key_name:'cmaj7',name:'Cmaj7',chord_type:'maj7',fingering:'x32000',frets:'x32000'},
    {key_name:'am7',name:'Am7',chord_type:'min7',fingering:'x02010',frets:'x02010'},
    {key_name:'dm7',name:'Dm7',chord_type:'min7',fingering:'xx0211',frets:'xx0211'},
    {key_name:'em7',name:'Em7',chord_type:'min7',fingering:'022030',frets:'022030'},
    {key_name:'g7',name:'G7',chord_type:'dom7',fingering:'320001',frets:'320001'},
    {key_name:'d7',name:'D7',chord_type:'dom7',fingering:'xx0212',frets:'xx0212'},
    {key_name:'a7',name:'A7',chord_type:'dom7',fingering:'x02020',frets:'x02020'},
    {key_name:'e7',name:'E7',chord_type:'dom7',fingering:'020100',frets:'020100'},
    {key_name:'f7',name:'F7',chord_type:'dom7',fingering:'131211',frets:'131211'},
    {key_name:'b7',name:'B7',chord_type:'dom7',fingering:'x21202',frets:'x21202'},
  ];
  c=0;for(const ch of chords){try{await post('content-chords',ch);c++;}catch(e){}}console.log('Chords:',c);

  // SCALES
  const scales = [
    {key_name:'c-major-scale',name:'C Major',scale_type:'major',root:'C',intervals:'W-W-H-W-W-W-H',pattern_frets:'x35553-x57565-x78887',description:'The foundation scale'},
    {key_name:'a-minor-pent',name:'A Minor Pentatonic',scale_type:'pentatonic',root:'A',intervals:'W-H-W-W-H',pattern_frets:'5-8-x-5-7-x-5-7-x-5-7-x-5-8',description:'The most used guitar scale'},
    {key_name:'c-major-pent',name:'C Major Pentatonic',scale_type:'pentatonic',root:'C',intervals:'W-W-H-W-H',pattern_frets:'x35-x35-x25-x25-x3',description:'Bright pentatonic sound'},
    {key_name:'a-natural-minor',name:'A Natural Minor',scale_type:'minor',root:'A',intervals:'W-H-W-W-H-W-W',pattern_frets:'57-57-56-56-57-57',description:'Relative minor of C major'},
    {key_name:'a-harmonic-minor',name:'A Harmonic Minor',scale_type:'minor',root:'A',intervals:'W-H-W-W-H-WH-H',pattern_frets:'57-57-56-6-57-57',description:'Raised 7th for stronger resolution'},
    {key_name:'a-melodic-minor',name:'A Melodic Minor',scale_type:'minor',root:'A',intervals:'W-H-W-W-W-W-H',description:'Jazz minor — ascending raises 6 and 7'},
    {key_name:'c-major-mode-ionian',name:'C Ionian (Major)',scale_type:'mode',root:'C',intervals:'W-W-H-W-W-W-H',description:'The major scale itself — mode 1'},
    {key_name:'d-dorian',name:'D Dorian',scale_type:'mode',root:'D',intervals:'W-H-W-W-W-H-W',description:'Minor with raised 6th — Santana sound'},
    {key_name:'e-phrygian',name:'E Phrygian',scale_type:'mode',root:'E',intervals:'H-W-W-W-H-W-W',description:'Spanish/flamenco sound'},
    {key_name:'f-lydian',name:'F Lydian',scale_type:'mode',root:'F',intervals:'W-W-W-H-W-W-H',description:'Dreamy — raised 4th'},
    {key_name:'g-mixolydian',name:'G Mixolydian',scale_type:'mode',root:'G',intervals:'W-W-H-W-W-H-W',description:'Dominant scale — blues/rock'},
    {key_name:'a-aeolian',name:'A Aeolian (Natural Minor)',scale_type:'mode',root:'A',intervals:'W-H-W-W-H-W-W',description:'The natural minor scale — mode 6'},
    {key_name:'b-locrian',name:'B Locrian',scale_type:'mode',root:'B',intervals:'H-W-W-H-W-W-W',description:'Diminished feel — rarely used as tonic'},
    {key_name:'diminished',name:'Diminished (Whole-Half)',scale_type:'exotic',root:'C',intervals:'W-H-W-H-W-H-W-H',description:'Symmetrical — every 3rd fret'},
    {key_name:'whole-tone',name:'Whole Tone',scale_type:'exotic',root:'C',intervals:'W-W-W-W-W-W',description:'Dreamy, unresolved — all whole steps'},
    {key_name:'blues-scale',name:'Blues Scale',scale_type:'pentatonic',root:'A',intervals:'W-H-H-H-W-W',description:'Minor pentatonic + blue note (b5)'},
  ];
  c=0;for(const sc of scales){try{await post('content-scales',sc);c++;}catch(e){}}console.log('Scales:',c);

  // GLOSSARY
  const glossary = [
    {term:'Interval',definition:'The distance between two notes, measured in semitones or scale degrees.',category:'theory'},
    {term:'Chord',definition:'Three or more notes played together. Built by stacking intervals from a root note.',category:'theory'},
    {term:'Scale',definition:'A set of notes arranged in ascending/descending order by pitch. The vocabulary of music.',category:'theory'},
    {term:'Key',definition:'The tonal centre of a piece — the note and scale that feel like home.',category:'theory'},
    {term:'Tempo',definition:'The speed of the music, measured in beats per minute (BPM).',category:'rhythm'},
    {term:'Time Signature',definition:'How many beats per measure and which note gets one beat. 4/4 is most common.',category:'rhythm'},
    {term:'BPM',definition:'Beats Per Minute — the tempo measurement. 60 BPM = one beat per second.',category:'rhythm'},
    {term:'Fret',definition:'A metal strip on the guitar neck. Pressing a string against a fret shortens it, raising the pitch.',category:'instrument'},
    {term:'Barre Chord',definition:'A chord where one finger presses multiple strings across a fret. Movable to any key.',category:'technique'},
    {term:'Open Chord',definition:'A chord using open (unfretted) strings. Usually played in first position.',category:'technique'},
    {term:'Pentatonic',definition:'A five-note scale. Minor pentatonic: A-C-D-E-G. The most versatile guitar scale.',category:'scales'},
    {term:'Mode',definition:'A scale built from a different starting note of a parent scale. 7 modes of the major scale.',category:'scales'},
    {term:'Arpeggio',definition:'Playing the notes of a chord one at a time instead of strumming them together.',category:'technique'},
    {term:'Vibrato',definition:'A slight, rapid variation in pitch that adds warmth and expression to a sustained note.',category:'technique'},
    {term:'Bend',definition:'Pushing or pulling a string to raise its pitch. Half bend = 1 semitone, whole bend = 2.',category:'technique'},
    {term:'Hammer-on',definition:'Striking a higher fret with a left-hand finger without picking again. Creates a smooth legato sound.',category:'technique'},
    {term:'Pull-off',definition:'Removing a left-hand finger to sound a lower note without picking again.',category:'technique'},
    {term:'Slide',definition:'Moving a fretting finger along the string while maintaining pressure, connecting two notes smoothly.',category:'technique'},
    {term:'Capo',definition:'A clamp that presses all strings at a given fret, raising the pitch of open chords.',category:'equipment'},
    {term:'Tablature',definition:'A visual notation system showing which fret to play on which string. Guitar-specific.',category:'reading'},
    {term:'Triad',definition:'A three-note chord: root, third, fifth. The building block of all harmony.',category:'theory'},
    {term:'Seventh Chord',definition:'A four-note chord: root, third, fifth, seventh. Adds richness and direction.',category:'theory'},
    {term:'Circle of Fifths',definition:'A diagram showing the relationship between all 12 keys and their signatures.',category:'theory'},
    {term:'Cadence',definition:'A chord progression that creates a sense of resolution or tension. Musical punctuation.',category:'theory'},
    {term:'Tonic',definition:'The home note/chord — the tonal centre that creates resolution. First degree of the scale.',category:'theory'},
    {term:'Dominant',definition:'The fifth degree — creates tension that wants to resolve to the tonic. V chord.',category:'theory'},
    {term:'Subdominant',definition:'The fourth degree — the IV chord. Creates gentle motion away from tonic.',category:'theory'},
    {term:'Fingerpicking',definition:'Using individual fingers of the picking hand to pluck strings independently. Classical and folk style.',category:'technique'},
    {term:'Alternate Picking',definition:'Strictly alternating down-up strokes with the pick. The foundation of speed.',category:'technique'},
    {term:'Palm Muting',definition:'Resting the picking hand lightly on strings near the bridge to dampen sustain. Creates a chunky sound.',category:'technique'},
    {term:'Improvisation',definition:'Creating music spontaneously — playing what you hear in the moment over a chord progression.',category:'creative'},
    {term:'Arrangement',definition:'Adapting a piece of music for a specific instrument or ensemble.',category:'creative'},
  ];
  c=0;for(const g of glossary){try{await post('content-glossary',g);c++;}catch(e){}}console.log('Glossary:',c);

  // WORLD REGIONS
  const regions = [
    {key_name:'ethiopia',name:'Ethiopia',tradition:'Ethio-Jazz & Pentatonic Traditions',description:'Ethiopian music uses a unique pentatonic system with distinctive intervals and phrasing.',scales:'Ethiopian pentatonic, Tizita minor',techniques:'Single-line melody, call-and-response',key_artists:'Mulatu Astatke, Hailu Mergia, Getatchew Mekurya',learn_first:'Listen to Tizita — the Ethiopian pentatonic is not the same as blues pentatonic.',color:'#ff6b35',coord_x:570,coord_y:290},
    {key_name:'mississippi',name:'Mississippi Delta',tradition:'Delta Blues',description:'One guitar, one voice, raw emotion. The birthplace of modern guitar music.',scales:'Minor pentatonic, blues scale, open tunings',techniques:'Slide guitar, fingerpicking, open tunings, thumb bass',key_artists:'Robert Johnson, Son House, Charley Patton, Muddy Waters',learn_first:'Open tuning + slide. The human voice is the model — guitar imitates it.',color:'#8B4513',coord_x:200,coord_y:200},
    {key_name:'brazil',name:'Brazil',tradition:'Bossa Nova & Samba',description:'Quiet precision. The right hand is the whole lesson — bass pulse underneath, syncopated chords floating above.',scales:'Major, Lydian, melodic minor',techniques:'Fingerpicking, syncopated rhythm, thumb bass + chord',key_artists:'João Gilberto, Tom Jobim, Baden Powell, Luiz Bonfa',learn_first:'Girl from Ipanema chord pattern. The right hand rhythm IS the style.',color:'#2ecc71',coord_x:280,coord_y:380},
    {key_name:'andalusia',name:'Andalusia',tradition:'Flamenco',description:'Rhythm, fire, and gravity. The cadence pulls toward home. The hand is percussion as much as harmony.',scales:'Phrygian dominant, harmonic minor, Andalusian cadence',techniques:'Rasgueado, picado, golpe, alzapúa, tremolo',key_artists:'Paco de Lucía, Vicente Amigo, Sabicas',learn_first:'The Andalusian cadence: Am-G-F-E. Feel how E pulls home.',color:'#c45a20',coord_x:440,coord_y:200},
    {key_name:'nashville',name:'Nashville',tradition:'Country & Bluegrass',description:'Chicken pickin, banjo rolls on guitar, and the Nashville number system.',scales:'Major, Mixolydian, major pentatonic',techniques:'Hybrid picking, banjo rolls, double stops, pedal steel bends',key_artists:'Chet Atkins, Merle Travis, Tony Rice, Brad Paisley',learn_first:'Travis picking — thumb alternates bass, fingers pick melody.',color:'#f1c40f',coord_x:230,coord_y:190},
    {key_name:'west-africa',name:'West Africa',tradition:'Kora & Griot Traditions',description:'Interlocking patterns, cyclical rhythms, and the guitar as a one-man orchestra.',scales:'Pentatonic, hexatonic, unique tunings',techniques:'Fingerpicking patterns, interlocking rhythms, open tunings',key_artists:'Ali Farka Touré, Toumani Diabaté, Boubacar Traoré',learn_first:'One repeating pattern on one string. Lock into the groove.',color:'#e67e22',coord_x:420,coord_y:310},
    {key_name:'india',name:'India',tradition:'Raga & Carnatic Guitar',description:'Microtonal movement, drone-based, and the concept of a raga as a mood journey.',scales:'Raga scales, microtonal intervals, drone-based',techniques:'Slides, micro-bends, sitar-like technique, drone strings',key_artists:'Prasanna, Debashish Bhatta, Ravi Shankar (influence)',learn_first:'One raga, one drone, one mood. Let each note breathe.',color:'#9b59b6',coord_x:640,coord_y:240},
    {key_name:'cuba',name:'Cuba',tradition:'Son, Salsa & Afro-Cuban Guitar',description:'Clave-based rhythm guitar. The guitar is part of a rhythmic conversation.',scales:'Major, Mixolydian, chromatic passing tones',techniques:'Montuno patterns, clave awareness, syncopated strumming',key_artists:'Eliades Ochoa, Compay Segundo, Ry Cooder',learn_first:'The clave pattern — everything locks to this rhythmic key.',color:'#e74c3c',coord_x:240,coord_y:260},
  ];
  c=0;for(const r of regions){try{await post('content-regions',r);c++;}catch(e){}}console.log('Regions:',c);

  // PRACTICE LOGS (seed some sample data)
  const logs = [
    {drill_name:'Chromatic Warm-Up',duration_min:5,bpm:60,feeling:'clean',notes:'Good start, slow and steady'},
    {drill_name:'Pentatonic Pattern 1',duration_min:8,bpm:72,feeling:'getting',notes:'Shape coming together, need more speed'},
    {drill_name:'Chord Transitions',duration_min:10,bpm:66,feeling:'stuck',notes:'G to C change is still slow'},
  ];
  c=0;for(const l of logs){try{await post('practice-logs',l);c++;}catch(e){}}console.log('Practice logs:',c);

  console.log('\nAll v2 seed complete!');
}
seed().catch(e=>console.error('Failed:',e.message));
