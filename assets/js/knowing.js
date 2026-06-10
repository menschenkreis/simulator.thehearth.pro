// Knowing Node — Theory Library (Bookshelf UI)
// Sources: Wolfsohn, Arnold, Fowler, Belkadi, Kadmon, Peckham, Facoline, Rooksby, Leavitt, Grimoire

const KNOWING = {
  id: 'knowing',
  title: 'Knowing',
  tag: 'KNOWING PATH',
  description: 'All music theory, categorised beautifully. Always accessible like an encyclopedia. Understand the why behind everything you play.',
  sources: [
    'Michael P. Wolfsohn — Music Theory for Guitar',
    'Bruce Arnold — Music Theory Workbook for Guitar Volume One',
    'William L. Fowler — Guitar Patterns for Improvisation',
    'Jean Marc Belkadi — Advanced Scale Concepts and Licks for Guitar',
    'Adam Kadmon — The Guitar Grimoire',
    'Rick Peckham — Berklee Jazz Chord Dictionary',
    'Phillip Facoline — Ultimate Chord Chart',
    'Rik Rooksby — How to Write Songs on Guitar',
    'William Leavitt — Modern Method for Guitar Vol 1',
    'Aaron Stang — Picture Chord Encyclopedia'
  ],

  categories: [
    {
      id: 'intervals',
      title: 'Intervals & The Major Scale',
      icon: '📐',
      description: 'The building blocks. Whole steps, half steps, and the major scale — the foundation of everything.',
      topics: [
        {
          id: 'whole-half-steps',
          title: 'Whole Steps & Half Steps',
          difficulty: 1,
          source: 'Wolfsohn Ch.3',
          body: `<p>Every note on the guitar is a fixed distance from every other note. These distances are measured in <strong>half steps</strong> (one fret) and <strong>whole steps</strong> (two frets).</p>
<p>• E to F = half step (1 fret) — no note in between<br>
• F to G = whole step (2 frets) — F# sits between them<br>
• B to C = half step (1 fret) — no note in between</p>
<p>The pattern of whole and half steps creates the major scale: <strong>W-W-H-W-W-W-H</strong></p>
<p>In C: C→D (W) →E (W) →F (H) →G (W) →A (W) →B (W) →C (H)</p>
<div class="lp-callout">
  <div class="lp-co-title">WHY THIS MATTERS</div>
  <p>Every chord, every scale, every key is built from this one pattern. If you understand W-W-H-W-W-W-H, you understand the entire system. Everything else is a variation.</p>
</div>`
        },
        {
          id: 'intervals',
          title: 'Intervals — The Distance Between Notes',
          difficulty: 2,
          source: 'Wolfsohn Ch.6',
          body: `<p>An interval is the distance between two notes, measured in scale degrees:</p>
<p>• <strong>Unison</strong> — same note<br>
• <strong>Minor 2nd</strong> — 1 half step (E to F)<br>
• <strong>Major 2nd</strong> — 2 half steps (C to D)<br>
• <strong>Minor 3rd</strong> — 3 half steps (A to C)<br>
• <strong>Major 3rd</strong> — 4 half steps (C to E)<br>
• <strong>Perfect 4th</strong> — 5 half steps (C to F)<br>
• <strong>Tritone</strong> — 6 half steps (C to F#) — the "devil's interval"<br>
• <strong>Perfect 5th</strong> — 7 half steps (C to G)<br>
• <strong>Octave</strong> — 12 half steps (C to C)</p>
<p><strong>On the guitar:</strong> Play the open low E string. Now play fret 7 on the A string. Same note, one octave apart. The guitar is built on intervals — every chord shape is a collection of intervals.</p>`
        },
        {
          id: 'circle-of-fifths',
          title: 'The Circle of Fifths',
          difficulty: 2,
          source: 'Wolfsohn Ch.5',
          body: `<p>The Circle of Fifths is the master map of Western music. It shows how all 12 keys relate to each other.</p>
<p>Starting from C (no sharps or flats), each step clockwise adds one sharp:<br>
C → G (1#) → D (2#) → A (3#) → E (4#) → B (5#) → F# (6#)</p>
<p>Each step counter-clockwise adds one flat:<br>
C → F (1♭) → B♭ (2♭) → E♭ (3♭) → A♭ (4♭) → D♭ (5♭) → G♭ (6♭)</p>
<p><strong>Why it matters:</strong><br>
• Adjacent keys share 6 of 7 notes — easy to modulate between<br>
• The V chord of any key is always one step clockwise (G is V of C)<br>
• The relative minor is always the inner ring (Am is relative minor of C)</p>
<div class="lp-callout">
  <div class="lp-co-title">THE CHEAT CODE</div>
  <p>Memorise the Circle of Fifths and you'll never be lost in any key. It's the GPS of music theory. Every songwriter, arranger, and improviser uses it constantly.</p>
</div>`
        }
      ]
    },

    {
      id: 'chords',
      title: 'Chords & Voicings',
      icon: '🎸',
      description: 'How chords are built. Triads, 7th chords, extensions. The harmony engine.',
      topics: [
        {
          id: 'triads',
          title: 'Triads — The 3-Note Building Blocks',
          difficulty: 1,
          source: 'Wolfsohn Ch.7',
          body: `<p>Every chord starts with 3 notes: Root, 3rd, 5th. The type of 3rd determines the chord quality:</p>
<p>• <strong>Major triad</strong> — Root + Major 3rd + Perfect 5th (C-E-G) — sounds happy<br>
• <strong>Minor triad</strong> — Root + Minor 3rd + Perfect 5th (C-E♭-G) — sounds sad<br>
• <strong>Diminished triad</strong> — Root + Minor 3rd + Diminished 5th (C-E♭-G♭) — sounds tense<br>
• <strong>Augmented triad</strong> — Root + Major 3rd + Augmented 5th (C-E-G#) — sounds dreamy</p>
<p><strong>On the guitar:</strong> Play a C chord. You're playing C-E-G-E-C-E. All notes come from the C major triad. A barre chord at fret 3 is a G major triad. Same structure, different position.</p>`
        },
        {
          id: 'seventh-chords',
          title: '7th Chords — Adding the Fourth Note',
          difficulty: 2,
          source: 'Wolfsohn Ch.10',
          body: `<p>Add a 7th to a triad and you get richness, tension, and movement. The 7th chord family:</p>
<p>• <strong>Major 7th</strong> (Cmaj7) — dreamy, jazzy. The "elevator music" chord.<br>
• <strong>Dominant 7th</strong> (C7) — bluesy, wants to move. The engine of the V-I cadence.<br>
• <strong>Minor 7th</strong> (Cm7) — smooth, mellow. The backbone of R&B and jazz.<br>
• <strong>Half-diminished</strong> (Cm7♭5) — dark, mysterious. The ii chord in minor keys.<br>
• <strong>Diminished 7th</strong> (Cdim7) — extreme tension. Can resolve to 4 different keys.</p>
<div class="lp-callout">
  <div class="lp-co-title">THE DOMINANT 7TH IS KING</div>
  <p>C7 wants to resolve to F. G7 wants to resolve to C. This V7→I resolution is the engine of almost all Western music. Blues, jazz, classical, pop — it's all built on this one movement.</p>
</div>`
        },
        {
          id: 'extensions',
          title: 'Extensions — 9ths, 11ths, 13ths',
          difficulty: 3,
          source: 'Berklee Jazz Chord Dictionary (Peckham)',
          body: `<p>Beyond the 7th, you can add 9ths, 11ths, and 13ths. These are the "spices" of jazz and neo-soul.</p>
<p>• <strong>9th</strong> = 2nd, one octave up (C-D → C9 adds the D above the octave)<br>
• <strong>11th</strong> = 4th, one octave up (Cmaj11 adds the F above)<br>
• <strong>13th</strong> = 6th, one octave up (Cmaj13 adds the A above)</p>
<p><strong>The rule:</strong> Extensions are stacked on top of 7th chords. You can't have a 9th without a 7th — it's just an "add2" chord. The 7th is the gateway to extensions.</p>
<p><strong>On the guitar:</strong> Jazz voicings often omit the root (the bass player covers it) and focus on 3rd, 7th, and extensions. This is why jazz chords look "weird" — they're fragments, but they sound complete in context.</p>`
        },
        {
          id: 'chord-voicings',
          title: 'Movable Voicings & Inversions',
          difficulty: 2,
          source: 'Facoline — Ultimate Chord Chart',
          body: `<p>A chord voicing is HOW you arrange the notes on the fretboard. Same chord, different voicing = different sound.</p>
<p><strong>Open voicings:</strong> Notes spread across multiple strings with gaps. Sound open and ringy.<br>
<strong>Closed voicings:</strong> Notes packed close together. Sound dense and focused.</p>
<p><strong>Inversions:</strong> When a note other than the root is the lowest:<br>
• C major: C-E-G (root position), E-G-C (1st inversion), G-C-E (2nd inversion)</p>
<p><strong>Why voicings matter:</strong> The same C chord can sound bright, dark, thin, or full depending on the voicing. Jazz players spend years learning voicings because the RIGHT voicing makes the harmony sing.</p>
<p><strong>The moveable barre chord:</strong> Play an F barre chord at fret 1. Move it to fret 3 = G. Fret 5 = A. Same shape, different root. This is the power of moveable voicings — one shape, 12 keys.</p>`
        }
      ]
    },

    {
      id: 'scales',
      title: 'Scales & Modes',
      icon: '🎵',
      description: 'The complete scale family. Pentatonic, major, minor, modes, exotic scales.',
      topics: [
        {
          id: 'pentatonic',
          title: 'The Pentatonic Scale — 5 Notes That Work Everywhere',
          difficulty: 1,
          source: 'Guitar Exercises For Dummies',
          body: `<p>The pentatonic scale removes the 2 notes from the major scale that create tension (the 4th and 7th). What's left is 5 notes that sound good over almost anything.</p>
<p><strong>Minor pentatonic</strong> (A-C-D-E-G): The rock/blues staple. Works over minor keys, dominant 7th chords, and blues progressions.</p>
<p><strong>Major pentatonic</strong> (C-D-E-G-A): The country/pop sound. Works over major keys and major chords.</p>
<p><strong>The magic:</strong> These two scales use the SAME 5 shapes on the fretboard. The only difference is which note you treat as the root. Minor pentatonic box 1 at fret 5 = A minor. Same shape at fret 8 = C major pentatonic.</p>`
        },
        {
          id: 'modes',
          title: 'Modes — 7 Flavours of the Major Scale',
          difficulty: 3,
          source: 'Belkadi — Advanced Scale Concepts',
          body: `<p>Modes are the major scale starting from each degree. Same 7 notes, different starting point = different mood:</p>
<p>• <strong>Ionian</strong> (1st) — the major scale itself. Happy, resolved.<br>
• <strong>Dorian</strong> (2nd) — minor with a bright 6th. Jazz, funk, Santana.<br>
• <strong>Phrygian</strong> (3rd) — dark, Spanish. Flamenco, metal.<br>
• <strong>Lydian</strong> (4th) — dreamy, floating. Film scores, Satriani.<br>
• <strong>Mixolydian</strong> (5th) — bluesy major. Rock, blues, Beatles.<br>
• <strong>Aeolian</strong> (6th) — natural minor. Sad, dramatic.<br>
• <strong>Locrian</strong> (7th) — unstable, diminished. Rarely used as a key center.</p>
<div class="lp-callout">
  <div class="lp-co-title">THE SIMPLEST WAY TO THINK ABOUT MODES</div>
  <p>Play C major scale. Now play the same notes but make D your home note. You're playing D Dorian — a minor scale with a bright 6th. The notes are the same, the FEELING is completely different. That's modes.</p>
</div>`
        },
        {
          id: 'minor-scales',
          title: 'The 3 Minor Scales',
          difficulty: 2,
          source: 'Wolfsohn Ch.8',
          body: `<p>Minor keys have THREE versions. This confuses people, but it's actually logical:</p>
<p><strong>Natural minor</strong> (Aeolian mode): A-B-C-D-E-F-G. The "default" minor scale.<br>
<strong>Harmonic minor</strong>: Natural minor with raised 7th (G→G#). Creates a dominant chord (E7) that resolves to Am. The "exotic" sound.<br>
<strong>Melodic minor</strong>: Raised 6th AND 7th ascending, natural minor descending. Smooths the melody line.</p>
<p><strong>Why three versions?</strong> The natural minor has a weak V chord (minor). Raising the 7th creates a strong V7→i resolution. The melodic minor fixes the awkward augmented 2nd interval. Each version solves a different problem.</p>
<p><strong>On the guitar:</strong> Most rock and pop uses natural minor. Jazz uses melodic minor (especially its modes). Classical and metal use harmonic minor. Know all three.</p>`
        },
        {
          id: 'exotic-scales',
          title: 'Exotic & World Scales',
          difficulty: 3,
          source: 'Kadmon — Guitar Grimoire',
          body: `<p>Beyond the standard major/minor system lies a world of exotic scales:</p>
<p><strong>Harmonic Major:</strong> Major scale with a flat 6th. Indian classical music influence.<br>
<strong>Hungarian Minor:</strong> Harmonic minor with a raised 4th. Gypsy and Middle Eastern.<br>
<strong>Neapolitan Minor/Major:</strong> Flat 2nd, flat 3rd (minor) or flat 2nd (major). Baroque and Middle Eastern.<br>
<strong>Persian:</strong> Flat 2nd, major 3rd, flat 4th, flat 6th, flat 7th. Sounds like a snake charmer.<br>
<strong>Enigmatic:</strong> Ascending chromatic-like gaps. Italian opera mystery.</p>
<p><strong>5-tone scales:</strong><br>
• Kumoi — Japanese traditional<br>
• Hirojoshi — Japanese pentatonic variant<br>
• Pelog — Indonesian gamelan</p>
<p><strong>6-tone scales:</strong><br>
• Whole Tone — dreamy, no root resolution (Debussy)<br>
• Augmented — alternating half step/minor 3rd<br>
• Dominant Sus — 7th chord with suspended 4th</p>
<p><strong>8-tone scales:</strong><br>
• Diminished — symmetrical, alternating whole/half steps<br>
• 8-Tone Spanish — the flamenco scale<br>
• Bebop scales — major/minor/dominant with passing chromatic notes for jazz</p>`
        }
      ]
    },

    {
      id: 'reading',
      title: 'Reading Music',
      icon: '📖',
      description: 'Standard notation, TAB, rhythm notation. Reading-first approach from Berklee.',
      topics: [
        {
          id: 'notation-basics',
          title: 'Standard Notation — The Staff',
          difficulty: 1,
          source: 'Leavitt — Modern Method Vol 1',
          body: `<p>The staff is 5 lines and 4 spaces. Each line and space represents a note:</p>
<p><strong>Treble clef (used for guitar):</strong><br>
• Lines (bottom to top): E-G-B-D-F ("Every Good Boy Does Fine")<br>
• Spaces (bottom to top): F-A-C-E (spell "FACE")</p>
<p>Guitar music uses <strong>treble clef</strong> — but it sounds one octave lower than written. When you see middle C on the staff, you play fret 3 on the A string, not the actual middle C.</p>
<p><strong>TAB vs Standard:</strong> TAB tells you WHERE to put your fingers. Standard notation tells you WHAT note to play. TAB is easier to read. Standard notation works on every instrument. Learn both.</p>`
        },
        {
          id: 'rhythm-notation',
          title: 'Rhythm Notation — Reading Time',
          difficulty: 2,
          source: 'Leavitt — Modern Method Vol 1',
          body: `<p>Notes have durations. The basic values:</p>
<p>• <strong>Whole note</strong> (○) — 4 beats<br>
• <strong>Half note</strong> (𝅗𝅥) — 2 beats<br>
• <strong>Quarter note</strong> (♩) — 1 beat<br>
• <strong>Eighth note</strong> (♪) — half a beat<br>
• <strong>Sixteenth note</strong> (𝅘𝅥𝅯) — quarter of a beat</p>
<p><strong>Time signatures:</strong> The top number = how many beats per measure. The bottom number = what note gets one beat.</p>
<p>• 4/4 = four quarter notes per measure (most common)<br>
• 3/4 = three quarter notes per measure (waltz)<br>
• 6/8 = six eighth notes per compound feel</p>
<p><strong>The guitar-specific challenge:</strong> You read TWO staves — standard notation on top, TAB below. The notation tells you the rhythm and melody. The TAB tells you the fingering. Together, they tell you everything.</p>`
        }
      ]
    },

    {
      id: 'rhythm-theory',
      title: 'Rhythm & Time',
      icon: '🥁',
      description: 'Time signatures, subdivisions, syncopation, polyrhythms. The heartbeat of music.',
      topics: [
        {
          id: 'time-signatures',
          title: 'Time Signatures — The Pulse',
          difficulty: 1,
          source: 'Wolfsohn Ch.4',
          body: `<p>Time signatures tell you how music is grouped into measures:</p>
<p><strong>Simple time:</strong> Each beat divides into 2.<br>
• 4/4 — four quarter-note beats. The "common time" (rock, pop, blues, jazz)<br>
• 3/4 — three quarter-note beats. Waltz, ballads<br>
• 2/4 — two quarter-note beats. Marches, polkas</p>
<p><strong>Compound time:</strong> Each beat divides into 3.<br>
• 6/8 — two groups of three eighth notes. Irish jigs, power ballads<br>
• 12/8 — four groups of three. Slow blues (the "shuffle" feel)</p>
<p><strong>Odd meters:</strong><br>
• 5/4 — five beats (Take Five, Mission Impossible)<br>
• 7/8 — seven eighth notes (Balkan folk, progressive rock)</p>`
        },
        {
          id: 'subdivision',
          title: 'Subdivision — The Grid',
          difficulty: 2,
          source: 'Phillips & Chappell — Guitar Exercises For Dummies',
          body: `<p>The beat is the big pulse. Subdivision is how you divide it:</p>
<p><strong>8th notes:</strong> Each beat splits in 2. Count: "1-and-2-and-3-and-4-and"<br>
<strong>16th notes:</strong> Each beat splits in 4. Count: "1-e-and-a-2-e-and-a"<br>
<strong>Triplets:</strong> Each beat splits in 3. Count: "1-trip-let-2-trip-let"</p>
<p><strong>Why subdivision matters:</strong> Tight rhythm comes from playing ON the subdivision grid, not just on the beat. A funk guitarist playing 16th notes is playing twice as many rhythmic positions as someone playing 8ths. More grid = more groove options.</p>
<p><strong>The metronome test:</strong> Set a metronome to 60 BPM. Play quarter notes. Now 8ths. Now 16ths. Now triplets. If any of these feel unsteady, your internal clock needs work. This is fixable — and it's the most important skill in music.</p>`
        },
        {
          id: 'syncopation',
          title: 'Syncopation — The Off-Beat',
          difficulty: 2,
          source: 'Ross Bolton — Funk Guitar',
          body: `<p>Syncopation is accenting the "and" beats — the spaces between the main beats. This creates groove, tension, and movement.</p>
<p><strong>On-beat:</strong> Playing on beats 1, 2, 3, 4. Sounds square, march-like.<br>
<strong>Off-beat:</strong> Playing on the "and" between beats. Sounds bouncy, reggae-like.<br>
<strong>Syncopated:</strong> Mixing on-beat and off-beat accents. Sounds groovy, funky.</p>
<p><strong>The funk formula:</strong><br>
• Mute the strings with your left hand<br>
• Strum 16th-note patterns with your right hand<br>
• Accent specific 16ths to create a rhythmic pattern<br>
• The muted "chick" sounds become a percussion instrument</p>
<p><strong>Famous syncopation:</strong><br>
• Reggae: guitar on beats 2 and 4 (off-beats)<br>
• Bossa nova: syncopated bass pattern against steady guitar<br>
• Funk: James Brown's "The One" — beat 1 is king, everything else syncopates around it</p>`
        }
      ]
    },

    {
      id: 'song-structure',
      title: 'Song Structure & Progressions',
      icon: '🏗️',
      description: 'How songs are built. Verse, chorus, bridge, and the theory behind why they work.',
      topics: [
        {
          id: 'basic-structure',
          title: 'Verse, Chorus, Bridge',
          difficulty: 1,
          source: 'Rooksby — How to Write Songs on Guitar',
          body: `<p>Most popular songs follow one of these structures:</p>
<p>• <strong>Verse-Chorus</strong> (ABAB): The simplest. Verse tells the story, chorus delivers the hook.<br>
• <strong>Verse-Chorus-Bridge</strong> (ABABCB): The most common in pop/rock. Bridge adds contrast.<br>
• <strong>12-Bar Blues</strong> (AAB): Verse-Verse-Chorus, all over a blues progression.</p>
<p><strong>Why structure matters:</strong> It creates expectation. The listener knows a chorus is coming. When it arrives, there's satisfaction. When a bridge disrupts the pattern, there's surprise. Structure is the architecture of emotion.</p>
<p><strong>The chord progression engine:</strong><br>
• I-IV-V (C-F-G) — the foundation of rock and blues<br>
• I-V-vi-IV (G-D-Em-C) — used in hundreds of pop songs<br>
• ii-V-I (Dm7-G7-Cmaj7) — the jazz engine</p>`
        },
        {
          id: 'chord-progressions',
          title: 'Common Chord Progressions',
          difficulty: 2,
          source: 'Rooksby — How to Write Songs on Guitar',
          body: `<p>Chord progressions are sequences of chords that create emotional movement. Some progressions appear in thousands of songs:</p>
<p><strong>The "Axis of Awesome" (I-V-vi-IV):</strong><br>
G-D-Em-C. Used in: Let It Be, No Woman No Cry, With or Without You, Someone Like You, and hundreds more. The most versatile progression in pop music.</p>
<p><strong>The 12-Bar Blues (I-I-I-I / IV-IV-I-I / V-IV-I-V):</strong><br>
The foundation of blues, rock and roll, and early R&B. Simple, powerful, endlessly adaptable.</p>
<p><strong>The Jazz Turnaround (ii-V-I):</strong><br>
Dm7-G7-Cmaj7. The engine of jazz harmony. Every jazz standard uses dozens of these.</p>
<p><strong>The Andalusian Cadence (i-VII-VI-V):</strong><br>
Am-G-F-E. The sound of flamenco and Spanish guitar. Dark, dramatic, passionate.</p>
<p><strong>The Canon Progression (I-V-vi-iii-IV-I-IV-V):</strong><br>
Pachelbel's Canon. Used in: Basket Case (Green Day), Don't Stop Believin' (Journey), and countless others.</p>`
        }
      ]
    },

    {
      id: 'keys',
      title: 'Keys & Harmony',
      icon: '🔑',
      description: 'Major and minor keys, key signatures, relative and parallel relationships.',
      topics: [
        {
          id: 'key-signatures',
          title: 'Key Signatures',
          difficulty: 1,
          source: 'Wolfsohn Ch.4',
          body: `<p>A key signature tells you which notes are sharp or flat throughout a piece. It appears at the beginning of each staff.</p>
<p><strong>Sharp keys (clockwise on the circle of fifths):</strong><br>
G major (1#), D major (2#), A major (3#), E major (4#), B major (5#), F# major (6#)</p>
<p><strong>Flat keys (counter-clockwise):</strong><br>
F major (1♭), B♭ major (2♭), E♭ major (3♭), A♭ major (4♭), D♭ major (5♭), G♭ major (6♭)</p>
<p><strong>Relative minors:</strong> Every major key has a relative minor that shares the same key signature. C major = A minor. G major = E minor. They use the same notes but start on different roots.</p>
<p><strong>Parallel minors:</strong> Same root, different mode. C major and C minor share the root C but have different notes (C minor has A♭, E♭, B♭).</p>`
        },
        {
          id: 'modulation',
          title: 'Modulation — Changing Keys',
          difficulty: 3,
          source: 'Wolfsohn Ch.12',
          body: `<p>Modulation is changing the key center within a song. It creates contrast and emotional lift.</p>
<p><strong>Common modulations:</strong><br>
• <strong>Pivot chord:</strong> Use a chord that exists in both keys as a bridge. Am exists in C major and G major — use it to shift from C to G.<br>
• <strong>Direct:</strong> Abrupt key change. The "truck driver's modulation" — go up a half step for the final chorus (Michael Jackson, Whitney Houston).<br>
• <strong>Relative:</strong> Major to relative minor or vice versa. C major → A minor. Smooth because they share the same notes.<br>
• <strong>Parallel:</strong> C major → C minor. Dramatic shift in mood.</p>
<p><strong>Famous modulations:</strong><br>
• "Livin' on a Prayer" — modulation up a minor 3rd for the final chorus<br>
• "I Will Always Love You" — modulation up a whole step for the last verse<br>
• Most jazz standards modulate several times through the form</p>`
        }
      ]
    },

    {
      id: 'patterns',
      title: 'Fretboard Patterns',
      icon: '🗺️',
      description: 'How scales and chords map across the fretboard. CAGED system, 5 patterns, navigation.',
      topics: [
        {
          id: 'caged-system',
          title: 'The CAGED System',
          difficulty: 2,
          source: 'Fred Sokolow — Fretboard Roadmaps',
          body: `<p>The CAGED system uses 5 open chord shapes (C, A, G, E, D) to map the entire fretboard. Every chord, scale, and arpeggio can be played in 5 positions.</p>
<p><strong>How it works:</strong><br>
• Play a C chord in open position. That's the "C" shape.<br>
• Play an A chord at fret 3 (barre chord). That's the "A" shape.<br>
• Move up: G shape, E shape, D shape — each one connects to the next.</p>
<p><strong>Why it matters:</strong> If you know where the CAGED shapes are for any chord, you know where to find the chord tones for improvisation. You also know the scale patterns that surround each shape. One system unlocks the entire fretboard.</p>
<p><strong>The connection:</strong> Each shape connects to the next like puzzle pieces. C connects to A, A connects to G, G connects to E, E connects to D, D connects back to C. The fretboard is a repeating loop of these 5 shapes.</p>`
        },
        {
          id: 'pentatonic-boxes',
          title: 'The 5 Pentatonic Boxes',
          difficulty: 2,
          source: 'Fowler — Guitar Patterns for Improvisation',
          body: `<p>The minor pentatonic scale has 5 movable shapes (boxes) that cover the entire fretboard:</p>
<p><strong>Box 1:</strong> The most common. Root on 6th string. This is the "rock box" — the first shape most guitarists learn.</p>
<p><strong>Box 2:</strong> Starts on the 2nd fret above Box 1. Connects to Box 1 on the high strings.</p>
<p><strong>Box 3:</strong> The "middle" box. Root on the 4th string. Good for blues bending.</p>
<p><strong>Box 4:</strong> Higher up. Root on the 4th string, one octave above Box 3.</p>
<p><strong>Box 5:</strong> The "top" box. Connects back to Box 1 an octave up.</p>
<p><strong>The breakthrough:</strong> These 5 boxes connect end-to-end. Once you can play all 5, you can solo anywhere on the fretboard. The boxes are training wheels — eventually you stop seeing boxes and start seeing the whole neck as one continuous pattern.</p>`
        }
      ]
    },

    {
      id: 'tetrachords',
      title: 'Tetrachords & Scale Construction',
      icon: '🧬',
      description: 'Building scales from 4-note fragments. The key to understanding ALL scales.',
      topics: [
        {
          id: 'tetrachord-basics',
          title: 'Tetrachords — The DNA of Scales',
          difficulty: 2,
          source: 'Fowler — Guitar Patterns for Improvisation',
          body: `<p>A tetrachord is a 4-note group. Every scale can be broken into two tetrachords.</p>
<p><strong>Major tetrachord:</strong> W-W-H (C-D-E-F). This is the first half of the major scale.<br>
<strong>Minor tetrachord:</strong> W-H-W (A-B-C-D). First half of the natural minor.<br>
<strong>Phrygian tetrachord:</strong> H-W-W (E-F-G-A). The dark, Spanish sound.</p>
<p><strong>How to build ANY scale:</strong><br>
1. Choose two tetrachords<br>
2. Connect them with either a whole step or half step<br>
3. You've built a scale</p>
<p><strong>Examples:</strong><br>
• Major: Major tetrachord + W + Major tetrachord = W-W-H-W-W-W-H<br>
• Dorian: Minor tetrachord + W + Major tetrachord = W-H-W-W-W-H-W<br>
• Phrygian: Phrygian tetrachord + H + Minor tetrachord = H-W-W-W-H-W-W</p>
<p><strong>This is the Grimoire's approach:</strong> Instead of memorising 100+ scales separately, learn the tetrachord building blocks and construct any scale on demand.</p>`
        }
      ]
    }
  ]
};

if (typeof window !== 'undefined') window.KNOWING = KNOWING;
