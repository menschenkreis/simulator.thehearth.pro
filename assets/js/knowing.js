// Knowing Node — Theory Library
// Sources: Wolfsohn (Music Theory for Guitar), Bruce Arnold (Music Theory Workbook),
//          Fowler (Guitar Patterns), Belkadi (Advanced Scale Concepts), Kadmon (Guitar Grimoire)

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
    'Adam Kadmon — The Guitar Grimoire'
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
      id: 'song-structure',
      title: 'Song Structure',
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
        }
      ]
    }
  ]
};

// Register globally
window.KNOWING = KNOWING;
