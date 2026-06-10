// Knowing Node — Theory Library (Bookshelf UI)
// Based on QJamTracks / Rob van Hal 9-discipline roadmap
// Sources: Wolfsohn, Arnold, Fowler, Belkadi, Kadmon, Peckham, Facoline, Rooksby, Leavitt

const KNOWING = {
  id: 'knowing',
  title: 'Knowing',
  tag: 'KNOWING PATH',
  description: 'All music theory, categorised by the 9 disciplines. Always accessible like an encyclopedia. Understand the why behind everything you play.',
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
    'QJamTracks / Rob van Hal — Guitar Roadmap'
  ],

  categories: [
    {
      id: 'rhythm',
      title: 'Rhythm',
      description: 'Time signatures, subdivisions, syncopation, groove. The heartbeat of music.',
      topics: [
        {
          id: 'time-signatures',
          title: 'Time Signatures',
          difficulty: 1,
          source: 'Wolfsohn Ch.4 / QJam L1',
          body: `<p>Time signatures tell you how music is grouped into measures:</p>
<p><strong>Simple time:</strong> Each beat divides into 2.<br>
4/4 — four quarter-note beats. The "common time" (rock, pop, blues, jazz).<br>
3/4 — three quarter-note beats. Waltz, ballads.<br>
2/4 — two quarter-note beats. Marches, polkas.</p>
<p><strong>Compound time:</strong> Each beat divides into 3.<br>
6/8 — two groups of three eighth notes. Irish jigs, power ballads.<br>
12/8 — four groups of three. Slow blues (the "shuffle" feel).</p>
<p><strong>Odd meters:</strong><br>
5/4 — five beats (Take Five, Mission Impossible).<br>
7/8 — seven eighth notes (Balkan folk, progressive rock).</p>`
        },
        {
          id: 'subdivision',
          title: 'Subdivision — The Grid',
          difficulty: 2,
          source: 'Phillips & Chappell / QJam L2',
          body: `<p>The beat is the big pulse. Subdivision is how you divide it:</p>
<p><strong>8th notes:</strong> Each beat splits in 2. Count: "1-and-2-and-3-and-4-and".<br>
<strong>16th notes:</strong> Each beat splits in 4. Count: "1-e-and-a-2-e-and-a".<br>
<strong>Triplets:</strong> Each beat splits in 3. Count: "1-trip-let-2-trip-let".</p>
<p><strong>Why subdivision matters:</strong> Tight rhythm comes from playing ON the subdivision grid, not just on the beat. A funk guitarist playing 16th notes is playing twice as many rhythmic positions as someone playing 8ths. More grid = more groove options.</p>
<p><strong>The metronome test:</strong> Set a metronome to 60 BPM. Play quarter notes. Now 8ths. Now 16ths. Now triplets. If any of these feel unsteady, your internal clock needs work. This is fixable — and it's the most important skill in music.</p>`
        },
        {
          id: 'syncopation',
          title: 'Syncopation — The Off-Beat',
          difficulty: 2,
          source: 'Ross Bolton / QJam L3',
          body: `<p>Syncopation is accenting the "and" beats — the spaces between the main beats. This creates groove, tension, and movement.</p>
<p><strong>On-beat:</strong> Playing on beats 1, 2, 3, 4. Sounds square, march-like.<br>
<strong>Off-beat:</strong> Playing on the "and" between beats. Sounds bouncy, reggae-like.<br>
<strong>Syncopated:</strong> Mixing on-beat and off-beat accents. Sounds groovy, funky.</p>
<p><strong>The funk formula:</strong><br>
Mute the strings with your left hand.<br>
Strum 16th-note patterns with your right hand.<br>
Accent specific 16ths to create a rhythmic pattern.<br>
The muted "chick" sounds become a percussion instrument.</p>
<p><strong>Famous syncopation:</strong><br>
Reggae: guitar on beats 2 and 4 (off-beats).<br>
Bossa nova: syncopated bass pattern against steady guitar.<br>
Funk: James Brown's "The One" — beat 1 is king, everything else syncopates around it.</p>`
        },
        {
          id: 'rhythm-building-blocks',
          title: 'The 7 Rhythm Building Blocks',
          difficulty: 1,
          source: 'QJam L1',
          body: `<p>Every rhythmic pattern in music is built from 7 basic building blocks. Once you know these 7, you can read and play any rhythm:</p>
<p>1. <strong>Whole note</strong> — 4 beats (hold and count 1-2-3-4)<br>
2. <strong>Half note</strong> — 2 beats (hold and count 1-2)<br>
3. <strong>Quarter note</strong> — 1 beat (one steady pulse)<br>
4. <strong>8th notes</strong> — half a beat each (two per beat, "1-and")<br>
5. <strong>16th notes</strong> — quarter of a beat each (four per beat, "1-e-and-a")<br>
6. <strong>Rests</strong> — silence for the same duration as any note value<br>
7. <strong>Dotted notes</strong> — note + half its value (dotted half = 3 beats)</p>
<p>Everything else — ties, triplets, syncopation — is a combination or variation of these 7 blocks.</p>`
        }
      ]
    },

    {
      id: 'chords-harmony',
      title: 'Chords & Harmony',
      description: 'How chords are built. Triads, 7th chords, extensions, voicings. The harmony engine.',
      topics: [
        {
          id: 'triads',
          title: 'Triads — The 3-Note Building Blocks',
          difficulty: 1,
          source: 'Wolfsohn Ch.7 / QJam L1',
          body: `<p>Every chord starts with 3 notes: Root, 3rd, 5th. The type of 3rd determines the chord quality:</p>
<p><strong>Major triad</strong> — Root + Major 3rd + Perfect 5th (C-E-G) — sounds happy.<br>
<strong>Minor triad</strong> — Root + Minor 3rd + Perfect 5th (C-Eb-G) — sounds sad.<br>
<strong>Diminished triad</strong> — Root + Minor 3rd + Diminished 5th (C-Eb-Gb) — sounds tense.<br>
<strong>Augmented triad</strong> — Root + Major 3rd + Augmented 5th (C-E-G#) — sounds dreamy.</p>
<p><strong>On the guitar:</strong> Play a C chord. You're playing C-E-G-E-C-E. All notes come from the C major triad. A barre chord at fret 3 is a G major triad. Same structure, different position.</p>`
        },
        {
          id: 'seventh-chords',
          title: '7th Chords — Adding the Fourth Note',
          difficulty: 2,
          source: 'Wolfsohn Ch.10 / QJam L3',
          body: `<p>Add a 7th to a triad and you get richness, tension, and movement:</p>
<p><strong>Major 7th</strong> (Cmaj7) — dreamy, jazzy.<br>
<strong>Dominant 7th</strong> (C7) — bluesy, wants to move. The engine of the V-I cadence.<br>
<strong>Minor 7th</strong> (Cm7) — smooth, mellow. The backbone of R&B and jazz.<br>
<strong>Half-diminished</strong> (Cm7b5) — dark, mysterious. The ii chord in minor keys.<br>
<strong>Diminished 7th</strong> (Cdim7) — extreme tension. Can resolve to 4 different keys.</p>
<div class="lp-callout"><div class="lp-co-title">THE DOMINANT 7TH IS KING</div><p>C7 wants to resolve to F. G7 wants to resolve to C. This V7-I resolution is the engine of almost all Western music. Blues, jazz, classical, pop — it's all built on this one movement.</p></div>`
        },
        {
          id: 'extensions',
          title: 'Extensions — 9ths, 11ths, 13ths',
          difficulty: 3,
          source: 'Peckham — Berklee Jazz Chord Dictionary',
          body: `<p>Beyond the 7th, you can add 9ths, 11ths, and 13ths. These are the "spices" of jazz and neo-soul.</p>
<p><strong>9th</strong> = 2nd, one octave up. C9 adds the D above the octave.<br>
<strong>11th</strong> = 4th, one octave up. Cmaj11 adds the F above.<br>
<strong>13th</strong> = 6th, one octave up. Cmaj13 adds the A above.</p>
<p><strong>The rule:</strong> Extensions are stacked on top of 7th chords. You can't have a 9th without a 7th — it's just an "add2" chord. The 7th is the gateway to extensions.</p>
<p><strong>On the guitar:</strong> Jazz voicings often omit the root (the bass player covers it) and focus on 3rd, 7th, and extensions. This is why jazz chords look "weird" — they're fragments, but they sound complete in context.</p>`
        },
        {
          id: 'chord-voicings',
          title: 'Movable Voicings & Inversions',
          difficulty: 2,
          source: 'Facoline / QJam L2',
          body: `<p>A chord voicing is HOW you arrange the notes on the fretboard. Same chord, different voicing = different sound.</p>
<p><strong>Open voicings:</strong> Notes spread across multiple strings with gaps. Sound open and ringy.<br>
<strong>Closed voicings:</strong> Notes packed close together. Sound dense and focused.</p>
<p><strong>Inversions:</strong> When a note other than the root is the lowest:<br>
C major: C-E-G (root position), E-G-C (1st inversion), G-C-E (2nd inversion).</p>
<p><strong>The moveable barre chord:</strong> Play an F barre chord at fret 1. Move it to fret 3 = G. Fret 5 = A. Same shape, different root. This is the power of moveable voicings — one shape, 12 keys.</p>`
        },
        {
          id: 'chord-progressions',
          title: 'Common Chord Progressions',
          difficulty: 2,
          source: 'Rooksby / QJam L2',
          body: `<p>Chord progressions are sequences of chords that create emotional movement:</p>
<p><strong>I-IV-V</strong> (C-F-G) — the foundation of rock and blues.<br>
<strong>I-V-vi-IV</strong> (G-D-Em-C) — used in hundreds of pop songs (the "Axis of Awesome").<br>
<strong>ii-V-I</strong> (Dm7-G7-Cmaj7) — the jazz engine.<br>
<strong>12-Bar Blues</strong> (I-I-I-I / IV-IV-I-I / V-IV-I-V) — the foundation of blues, rock and roll.<br>
<strong>Andalusian Cadence</strong> (i-VII-VI-V) — Am-G-F-E. The sound of flamenco.<br>
<strong>Canon Progression</strong> (I-V-vi-iii-IV-I-IV-V) — Pachelbel's Canon.</p>`
        }
      ]
    },

    {
      id: 'scales',
      title: 'Scales',
      description: 'The complete scale family. Pentatonic, major, minor, modes, exotic scales.',
      topics: [
        {
          id: 'pentatonic',
          title: 'The Pentatonic Scale',
          difficulty: 1,
          source: 'QJam L1 / Phillips & Chappell',
          body: `<p>The pentatonic scale removes the 2 notes from the major scale that create tension (the 4th and 7th). What's left is 5 notes that sound good over almost anything.</p>
<p><strong>Minor pentatonic</strong> (A-C-D-E-G): The rock/blues staple. Works over minor keys, dominant 7th chords, and blues progressions.</p>
<p><strong>Major pentatonic</strong> (C-D-E-G-A): The country/pop sound. Works over major keys and major chords.</p>
<p><strong>The magic:</strong> These two scales use the SAME 5 shapes on the fretboard. The only difference is which note you treat as the root. Minor pentatonic box 1 at fret 5 = A minor. Same shape at fret 8 = C major pentatonic.</p>`
        },
        {
          id: 'major-scale',
          title: 'The Major Scale',
          difficulty: 1,
          source: 'Wolfsohn Ch.3 / QJam L1',
          body: `<p>The major scale is the foundation of everything in Western music. The pattern of whole and half steps: <strong>W-W-H-W-W-W-H</strong>.</p>
<p>In C: C-D-E-F-G-A-B-C. No sharps, no flats. The "white keys" on a piano.</p>
<p>Every other scale, mode, and chord is measured against the major scale. It's the reference point — the "zero" on the musical thermometer.</p>
<p><strong>The 5 patterns:</strong> On the guitar, the major scale has 5 movable shapes that cover the entire fretboard (CAGED system). Learn all 5 and you can play in any key, anywhere on the neck.</p>`
        },
        {
          id: 'minor-scales',
          title: 'The 3 Minor Scales',
          difficulty: 2,
          source: 'Wolfsohn Ch.8 / QJam L3',
          body: `<p>Minor keys have THREE versions:</p>
<p><strong>Natural minor</strong> (Aeolian mode): A-B-C-D-E-F-G. The "default" minor scale.<br>
<strong>Harmonic minor:</strong> Natural minor with raised 7th (G to G#). Creates a dominant chord (E7) that resolves to Am. The "exotic" sound.<br>
<strong>Melodic minor:</strong> Raised 6th AND 7th ascending, natural minor descending. Smooths the melody line.</p>
<p><strong>Why three versions?</strong> The natural minor has a weak V chord (minor). Raising the 7th creates a strong V7-i resolution. The melodic minor fixes the awkward augmented 2nd interval. Each version solves a different problem.</p>`
        },
        {
          id: 'modes',
          title: 'Modes — 7 Flavours of the Major Scale',
          difficulty: 3,
          source: 'Belkadi / QJam L5',
          body: `<p>Modes are the major scale starting from each degree. Same 7 notes, different starting point = different mood:</p>
<p><strong>Ionian</strong> (1st) — the major scale itself. Happy, resolved.<br>
<strong>Dorian</strong> (2nd) — minor with a bright 6th. Jazz, funk, Santana.<br>
<strong>Phrygian</strong> (3rd) — dark, Spanish. Flamenco, metal.<br>
<strong>Lydian</strong> (4th) — dreamy, floating. Film scores, Satriani.<br>
<strong>Mixolydian</strong> (5th) — bluesy major. Rock, blues, Beatles.<br>
<strong>Aeolian</strong> (6th) — natural minor. Sad, dramatic.<br>
<strong>Locrian</strong> (7th) — unstable, diminished. Rarely used as a key center.</p>
<div class="lp-callout"><div class="lp-co-title">THE SIMPLEST WAY TO THINK ABOUT MODES</div><p>Play C major scale. Now play the same notes but make D your home note. You're playing D Dorian — a minor scale with a bright 6th. The notes are the same, the FEELING is completely different. That's modes.</p></div>`
        },
        {
          id: 'exotic-scales',
          title: 'Exotic & World Scales',
          difficulty: 3,
          source: 'Kadmon — Guitar Grimoire',
          body: `<p>Beyond the standard major/minor system lies a world of exotic scales:</p>
<p><strong>Harmonic Major:</strong> Major scale with a flat 6th. Indian classical music influence.<br>
<strong>Hungarian Minor:</strong> Harmonic minor with a raised 4th. Gypsy and Middle Eastern.<br>
<strong>Neapolitan Minor/Major:</strong> Flat 2nd. Baroque and Middle Eastern.<br>
<strong>Persian:</strong> Flat 2nd, major 3rd, flat 4th, flat 6th, flat 7th.<br>
<strong>Whole Tone:</strong> Dreamy, no root resolution (Debussy).<br>
<strong>Diminished:</strong> Symmetrical, alternating whole/half steps.<br>
<strong>Bebop scales:</strong> Major/minor/dominant with passing chromatic notes for jazz.</p>`
        }
      ]
    },

    {
      id: 'technique-improv',
      title: 'Technique & Improvisation',
      description: 'How to improvise. Scale-to-chord mapping, tension and release, finding your voice.',
      topics: [
        {
          id: 'scale-chord-mapping',
          title: 'Which Scale Over Which Chord',
          difficulty: 2,
          source: 'Fowler / QJam L3',
          body: `<p>The fundamental question of improvisation: what notes can I play over this chord?</p>
<p><strong>The basic mapping:</strong><br>
Major chord (C) — C major scale, C major pentatonic, C Lydian<br>
Minor chord (Am) — A natural minor, A minor pentatonic, A Dorian<br>
Dominant 7th (G7) — G Mixolydian, G major pentatonic, G blues scale<br>
Diminished (Bdim) — B diminished scale (whole-half)<br>
Minor 7b5 (Bm7b5) — B Locrian, B half-whole diminished</p>
<p><strong>The shortcut:</strong> Minor pentatonic works over almost everything in rock and blues. Major pentatonic works over everything in country and pop. Start there, expand later.</p>`
        },
        {
          id: 'tension-release',
          title: 'Tension & Release',
          difficulty: 2,
          source: 'Aebersold / QJam L4',
          body: `<p>Improvisation is the art of creating and resolving tension. Too much tension = anxiety. Too much resolution = boredom.</p>
<p><strong>Creating tension:</strong><br>
Play notes outside the scale (chromatic passing tones).<br>
Land on the "wrong" beat (syncopation).<br>
Use bends, slides, and vibrato to push pitch.<br>
Play dissonant intervals (minor 2nds, tritones).</p>
<p><strong>Releasing tension:</strong><br>
Resolve to a chord tone (root, 3rd, 5th).<br>
Land on the downbeat.<br>
Return to the home scale.<br>
Use space — silence is the ultimate resolution.</p>
<p><strong>The phrasing principle:</strong> Think in sentences, not words. A solo should breathe — play a phrase, pause, respond. Like a conversation.</p>`
        },
        {
          id: 'tetrachords',
          title: 'Tetrachords — Building Any Scale',
          difficulty: 2,
          source: 'Fowler — Guitar Patterns for Improvisation',
          body: `<p>A tetrachord is a 4-note group. Every scale can be broken into two tetrachords.</p>
<p><strong>Major tetrachord:</strong> W-W-H (C-D-E-F). First half of the major scale.<br>
<strong>Minor tetrachord:</strong> W-H-W (A-B-C-D). First half of the natural minor.<br>
<strong>Phrygian tetrachord:</strong> H-W-W (E-F-G-A). The dark, Spanish sound.</p>
<p><strong>How to build ANY scale:</strong><br>
1. Choose two tetrachords.<br>
2. Connect them with either a whole step or half step.<br>
3. You've built a scale.</p>
<p><strong>Examples:</strong><br>
Major: Major tetrachord + W + Major tetrachord = W-W-H-W-W-W-H.<br>
Dorian: Minor tetrachord + W + Major tetrachord = W-H-W-W-W-H-W.</p>`
        },
        {
          id: 'ear-training',
          title: 'Ear Training — Hearing Before Playing',
          difficulty: 2,
          source: 'US Navy Ear Training Manual / QJam L4',
          body: `<p>Your ears are your most important instrument. Ear training develops the ability to hear and identify musical elements before you play them.</p>
<p><strong>Interval recognition:</strong> Learn to hear the distance between two notes. Minor 3rd = "Greensleeves." Perfect 4th = "Here Comes the Bride." Tritone = "The Simpsons."</p>
<p><strong>Chord recognition:</strong> Major = happy. Minor = sad. Dominant 7 = wants to move. Diminished = tension.</p>
<p><strong>Rhythm recognition:</strong> Clap back rhythms. Start simple (quarter notes), progress to complex (syncopated 16ths).</p>
<p><strong>The sing-before-you-play method:</strong> Before you play a phrase, sing it. If you can sing it, you can hear it. If you can hear it, you can play it. This is how jazz musicians improvise — they hear the notes before they play them.</p>`
        }
      ]
    },

    {
      id: 'picking',
      title: 'Picking Technique',
      description: 'Alternate picking, economy picking, sweep picking. The right hand engine.',
      topics: [
        {
          id: 'alternate-picking',
          title: 'Alternate Picking',
          difficulty: 1,
          source: 'QJam L1 / Stetina',
          body: `<p>Alternate picking is the foundation of right-hand technique. Down-up-down-up, strictly alternating, regardless of which string you're on.</p>
<p><strong>Why alternate picking:</strong> It's the most efficient motion. Every note gets the same attack. Your pick is always moving in the same direction, so there's no wasted motion crossing strings.</p>
<p><strong>The common mistake:</strong> Many guitarists naturally do "outside picking" when crossing strings (always picking away from the next string). This works for some patterns but creates inefficiency for others. Inside picking (toward the next string) is harder but essential.</p>
<p><strong>The exercise:</strong> Play one note per beat at 60 BPM. Strict down-up-down-up. No speeding up until every note is clean and even. The metronome is your teacher.</p>`
        },
        {
          id: 'economy-picking',
          title: 'Economy Picking',
          difficulty: 2,
          source: 'Stetina — Speed Mechanics',
          body: `<p>Economy picking combines alternate picking with sweep picking. When crossing strings, you pick in the direction of the next string (sweep) instead of always alternating.</p>
<p><strong>The rule:</strong> If you're moving to a higher-pitched string, use a downstroke. If moving to a lower-pitched string, use an upstroke. Within a single string, alternate as normal.</p>
<p><strong>When to use each:</strong><br>
Alternate picking — better for single-string runs, rhythmic accuracy, and patterns that change direction frequently.<br>
Economy picking — better for scale runs that move consistently in one direction across strings.</p>
<p><strong>Most pros use both</strong> and switch between them depending on the passage. The key is knowing when each is more efficient.</p>`
        },
        {
          id: 'sweep-picking',
          title: 'Sweep Picking',
          difficulty: 3,
          source: 'Stetina — Speed Mechanics',
          body: `<p>Sweep picking is playing across multiple strings with a single, fluid pick stroke — like strumming, but with precise timing so each note rings separately.</p>
<p><strong>Used for:</strong> Arpeggios. A major arpeggio across 6 strings with one smooth downstroke sounds like a harp or piano.</p>
<p><strong>The key:</strong> Each finger lifts off as soon as the note sounds. If your left hand fingers stay down, the notes blur together. The left hand must "roll" — each finger releases just as the next note is picked.</p>
<p><strong>Start with 3-string sweeps:</strong> Play a minor arpeggio across the top 3 strings. Down-up-down. Make each note distinct. Only expand to 5-6 strings when 3-string sweeps are clean.</p>`
        }
      ]
    },

    {
      id: 'arpeggios',
      title: 'Arpeggios',
      description: 'Playing chord notes one at a time. The bridge between chords and scales.',
      topics: [
        {
          id: 'what-is-arpeggio',
          title: 'What Is an Arpeggio',
          difficulty: 1,
          source: 'Phillips & Chappell / QJam L2',
          body: `<p>An arpeggio is playing the notes of a chord one at a time, instead of all together. If a C chord is C-E-G played simultaneously, a C arpeggio is C-E-G played sequentially.</p>
<p><strong>Why arpeggios matter:</strong><br>
They outline the harmony — when you play an arpeggio over a chord, you're highlighting the chord tones.<br>
They're the bridge between chords (vertical) and scales (horizontal).<br>
They're essential for improvisation — knowing arpeggios means knowing which notes are "home" over any chord.</p>
<p><strong>On the guitar:</strong> Arpeggios have movable shapes, just like chords. Learn the shape, move it to any key. Major, minor, dominant 7, diminished — each has its own pattern.</p>`
        },
        {
          id: 'major-arpeggios',
          title: 'Major & Minor Arpeggios',
          difficulty: 2,
          source: 'Phillips & Chappell / QJam L3',
          body: `<p><strong>Major arpeggio:</strong> Root-3rd-5th. C-E-G. Three notes, same as the major triad, played one at a time.</p>
<p><strong>Minor arpeggio:</strong> Root-b3rd-5th. C-Eb-G. The flat 3rd gives it the minor quality.</p>
<p><strong>The 5-pattern system:</strong> Just like scales, arpeggios have 5 movable shapes across the fretboard (CAGED). Each shape connects to the next, covering the entire neck.</p>
<p><strong>Practice approach:</strong> Learn one shape at a time. Play it in all 12 keys. Then connect two shapes. Then three. Eventually you'll see the entire fretboard as one continuous arpeggio pattern.</p>
<p><strong>The musical use:</strong> Over a C major chord, play a C major arpeggio. Over Am, play an A minor arpeggio. The notes always fit because they ARE the chord.</p>`
        },
        {
          id: 'seventh-arpeggios',
          title: '7th Chord Arpeggios',
          difficulty: 3,
          source: 'Fowler / QJam L5',
          body: `<p>Extend the basic triad arpeggio to include the 7th:</p>
<p><strong>Major 7th arpeggio:</strong> Root-3rd-5th-7th (C-E-G-B).<br>
<strong>Dominant 7th arpeggio:</strong> Root-3rd-5th-b7th (C-E-G-Bb).<br>
<strong>Minor 7th arpeggio:</strong> Root-b3rd-5th-b7th (C-Eb-G-Bb).<br>
<strong>Diminished 7th arpeggio:</strong> Root-b3rd-b5th-bb7th (C-Eb-Gb-A).</p>
<p><strong>The jazz connection:</strong> Jazz improvisers think in arpeggios, not scales. When they see a Dm7 chord, they play a Dm7 arpeggio. When they see G7, they play a G7 arpeggio. The arpeggio IS the skeleton of the solo — scales add the connective tissue.</p>`
        }
      ]
    },

    {
      id: 'fingerstyle',
      title: 'Fingerstyle',
      description: 'Playing with fingers instead of a pick. Classical technique, fingerpicking patterns.',
      topics: [
        {
          id: 'pima',
          title: 'The PIMA System',
          difficulty: 1,
          source: 'Cary White / QJam L1',
          body: `<p>Fingerstyle guitar uses a letter system to label the right hand fingers:</p>
<p><strong>P</strong> = Pulgar (thumb) — plays bass strings (4, 5, 6)<br>
<strong>I</strong> = Indice (index) — plays string 3<br>
<strong>M</strong> = Medio (middle) — plays string 2<br>
<strong>A</strong> = Anular (ring) — plays string 1</p>
<p><strong>Rest stroke vs Free stroke:</strong><br>
Rest stroke (Apoyando): The finger plucks and rests on the next string. Fuller, louder sound. Used for melody.<br>
Free stroke (Tirando): The finger plucks and clears the string. Lighter, faster. Used for accompaniment.</p>
<p><strong>The basic pattern:</strong> P-I-M-A. Thumb plays bass, then index-middle-ring play treble strings in sequence. This is the foundation of all fingerpicking.</p>`
        },
        {
          id: 'fingerpicking-patterns',
          title: 'Common Fingerpicking Patterns',
          difficulty: 2,
          source: 'QJam L2 / Cary White',
          body: `<p>Once you know PIMA, you can build patterns:</p>
<p><strong>Travis picking:</strong> Thumb alternates between bass strings while index and middle finger pick a melody on top. The "boom-chicka" sound of folk and country.</p>
<p><strong>Arpeggio patterns:</strong><br>
P-I-M-A-M-I — the "forward and back" pattern.<br>
P-I-M-P-I-M — grouped in threes (3/4 time).<br>
P-I-M-A-I-M-A-M — continuous 8th-note flow.</p>
<p><strong>Pinch pattern:</strong> Thumb plays bass while ring finger plays treble simultaneously — a "pinch" that outlines the chord.</p>
<p><strong>The goal:</strong> Independence. Your thumb should be able to play any rhythm while your fingers play any pattern. This takes time — but every fingerstyle song you learn builds this independence.</p>`
        }
      ]
    },

    {
      id: 'theory',
      title: 'Theory',
      description: 'The underlying science. Intervals, circle of fifths, keys, modulation. The why.',
      topics: [
        {
          id: 'whole-half-steps',
          title: 'Whole Steps & Half Steps',
          difficulty: 1,
          source: 'Wolfsohn Ch.3 / QJam L1',
          body: `<p>Every note on the guitar is a fixed distance from every other note. These distances are measured in <strong>half steps</strong> (one fret) and <strong>whole steps</strong> (two frets).</p>
<p>E to F = half step (1 fret) — no note in between.<br>
F to G = whole step (2 frets) — F# sits between them.<br>
B to C = half step (1 fret) — no note in between.</p>
<p>The pattern of whole and half steps creates the major scale: W-W-H-W-W-W-H.</p>`
        },
        {
          id: 'intervals',
          title: 'Intervals — The Distance Between Notes',
          difficulty: 2,
          source: 'Wolfsohn Ch.6 / QJam L2',
          body: `<p>An interval is the distance between two notes, measured in scale degrees:</p>
<p><strong>Minor 2nd</strong> — 1 half step (E to F).<br>
<strong>Major 2nd</strong> — 2 half steps (C to D).<br>
<strong>Minor 3rd</strong> — 3 half steps (A to C).<br>
<strong>Major 3rd</strong> — 4 half steps (C to E).<br>
<strong>Perfect 4th</strong> — 5 half steps (C to F).<br>
<strong>Tritone</strong> — 6 half steps (C to F#).<br>
<strong>Perfect 5th</strong> — 7 half steps (C to G).<br>
<strong>Octave</strong> — 12 half steps (C to C).</p>
<p>Every chord shape is a collection of intervals. Understanding intervals means understanding why chords sound the way they do.</p>`
        },
        {
          id: 'circle-of-fifths',
          title: 'The Circle of Fifths',
          difficulty: 2,
          source: 'Wolfsohn Ch.5 / QJam L3',
          body: `<p>The Circle of Fifths is the master map of Western music. It shows how all 12 keys relate to each other.</p>
<p>Starting from C (no sharps or flats), each step clockwise adds one sharp:<br>
C - G (1#) - D (2#) - A (3#) - E (4#) - B (5#) - F# (6#).</p>
<p>Each step counter-clockwise adds one flat:<br>
C - F (1b) - Bb (2b) - Eb (3b) - Ab (4b) - Db (5b) - Gb (6b).</p>
<p><strong>Why it matters:</strong><br>
Adjacent keys share 6 of 7 notes — easy to modulate between.<br>
The V chord of any key is always one step clockwise (G is V of C).<br>
The relative minor is always the inner ring (Am is relative minor of C).</p>`
        },
        {
          id: 'key-signatures',
          title: 'Key Signatures',
          difficulty: 1,
          source: 'Wolfsohn Ch.4 / QJam L2',
          body: `<p>A key signature tells you which notes are sharp or flat throughout a piece. It appears at the beginning of each staff.</p>
<p><strong>Sharp keys:</strong> G (1#), D (2#), A (3#), E (4#), B (5#), F# (6#).<br>
<strong>Flat keys:</strong> F (1b), Bb (2b), Eb (3b), Ab (4b), Db (5b), Gb (6b).</p>
<p><strong>Relative minors:</strong> Every major key has a relative minor that shares the same key signature. C major = A minor. G major = E minor.</p>
<p><strong>Parallel minors:</strong> Same root, different mode. C major and C minor share the root C but have different notes.</p>`
        },
        {
          id: 'modulation',
          title: 'Modulation — Changing Keys',
          difficulty: 3,
          source: 'Wolfsohn Ch.12 / QJam L6',
          body: `<p>Modulation is changing the key center within a song. It creates contrast and emotional lift.</p>
<p><strong>Common modulations:</strong><br>
<strong>Pivot chord:</strong> Use a chord that exists in both keys as a bridge.<br>
<strong>Direct:</strong> Abrupt key change. The "truck driver's modulation" — up a half step for the final chorus.<br>
<strong>Relative:</strong> Major to relative minor. C major to A minor. Smooth because they share the same notes.<br>
<strong>Parallel:</strong> C major to C minor. Dramatic shift in mood.</p>`
        }
      ]
    },

    {
      id: 'reading-music',
      title: 'Reading Music',
      description: 'Standard notation, TAB, rhythm notation. Reading-first approach from Berklee.',
      topics: [
        {
          id: 'notation-basics',
          title: 'Standard Notation — The Staff',
          difficulty: 1,
          source: 'Leavitt — Modern Method Vol 1 / QJam L1',
          body: `<p>The staff is 5 lines and 4 spaces. Each line and space represents a note:</p>
<p><strong>Treble clef (used for guitar):</strong><br>
Lines (bottom to top): E-G-B-D-F ("Every Good Boy Does Fine").<br>
Spaces (bottom to top): F-A-C-E (spell "FACE").</p>
<p>Guitar music uses <strong>treble clef</strong> — but it sounds one octave lower than written.</p>
<p><strong>TAB vs Standard:</strong> TAB tells you WHERE to put your fingers. Standard notation tells you WHAT note to play. TAB is easier to read. Standard notation works on every instrument. Learn both.</p>`
        },
        {
          id: 'rhythm-notation',
          title: 'Rhythm Notation — Reading Time',
          difficulty: 2,
          source: 'Leavitt — Modern Method Vol 1 / QJam L2',
          body: `<p>Notes have durations. The basic values:</p>
<p><strong>Whole note</strong> — 4 beats.<br>
<strong>Half note</strong> — 2 beats.<br>
<strong>Quarter note</strong> — 1 beat.<br>
<strong>Eighth note</strong> — half a beat.<br>
<strong>Sixteenth note</strong> — quarter of a beat.</p>
<p><strong>Time signatures:</strong> The top number = how many beats per measure. The bottom number = what note gets one beat.</p>
<p>4/4 = four quarter notes per measure (most common).<br>
3/4 = three quarter notes per measure (waltz).<br>
6/8 = six eighth notes per compound feel.</p>`
        },
        {
          id: 'reading-on-guitar',
          title: 'Reading on the Guitar',
          difficulty: 2,
          source: 'Leavitt / QJam L3',
          body: `<p>The guitar has a unique challenge: you read TWO staves — standard notation on top, TAB below. The notation tells you the rhythm and melody. The TAB tells you the fingering.</p>
<p><strong>Position playing:</strong> Your hand stays in one "position" (fret area) for a passage. Position 1 = frets 1-4. Position 2 = frets 2-5. And so on.</p>
<p><strong>The problem with TAB:</strong> It tells you where to put your fingers but not what note you're playing. You can play an entire song without knowing a single note name. Standard notation forces you to know the notes — which means you understand what you're playing, not just where to put your fingers.</p>
<p><strong>The Berklee approach:</strong> Learn to read standard notation first. TAB is a supplement, not a replacement. The guitar is a musical instrument, not a finger-positioning machine.</p>`
        }
      ]
    }
  ]
};

if (typeof window !== 'undefined') window.KNOWING = KNOWING;
