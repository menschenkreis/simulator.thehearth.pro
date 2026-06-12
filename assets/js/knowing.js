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
          video: 'https://www.youtube.com/embed/u-3EI9YeePM',
          body: `<p>A <strong>time signature</strong> is the pair of numbers at the start of a piece that tells you two things: <strong>how many beats</strong> are in each measure (the top number), and <strong>what kind of note</strong> gets one beat (the bottom number). It's the map that keeps every musician in the same lane.</p>

<p><strong>Simple time</strong> — each beat divides cleanly in two:</p>
<p><strong>4/4</strong> — four quarter-note beats per measure. Called "common time" because it's the default for rock, pop, blues, country, and jazz. When you tap your foot to a song, you're almost certainly in 4/4. Count it: "1 - 2 - 3 - 4."</p>
<p><strong>3/4</strong> — three quarter-note beats per measure. The waltz feel. Think of "Hallelujah" by Leonard Cohen or a classical minuet. Count it: "1 - 2 - 3."</p>
<p><strong>2/4</strong> — two quarter-note beats. Marches, polkas, and some country tunes. Quick and snappy: "1 - 2, 1 - 2."</p>

<p><strong>Compound time</strong> — each beat divides into three sub-beats:</p>
<p><strong>6/8</strong> — two big beats, each split into three eighth notes. You count it "ONE-two-three-FOUR-five-six." Irish jigs, power ballads ("We Are the Champions"), and many folk songs use 6/8. The feel is a rolling, loping pulse — not a march.</p>
<p><strong>12/8</strong> — four big beats, each split into three. This is the <strong>slow blues shuffle</strong>. Think of B.B. King or Eric Clapton's "Wonderful Tonight." It feels like 4/4 but with a triplet undercurrent — every beat has a built-in swing.</p>

<p><strong>Odd meters</strong> break the expected pattern:</p>
<p><strong>5/4</strong> — five beats per measure. Dave Brubeck's "Take Five" and the Mission Impossible theme. It feels like a 3 + 2 or 2 + 3 grouping. On guitar, strum: down-down-down | down-down — that's 5/4.</p>
<p><strong>7/8</strong> — seven eighth notes per measure. Common in Balkan folk and progressive rock (Pink Floyd's "Money"). It's usually felt as 2+2+3 or 3+2+2. Once your ear locks in, it's oddly natural.</p>

<p><strong>On the guitar:</strong> The time signature changes how you strum. In 4/4, your strumming hand moves in a steady down-up pattern (down on the beat, up on the "and"). In 3/4, it's down-up-down | down-up-down. In 6/8, your hand still moves down-up, but you accent every third stroke. The key is that your strumming hand becomes the timekeeper — it should feel like a pendulum, always moving.</p>

<div class="lp-callout"><div class="lp-co-title">TRY THIS</div><p>Set a metronome to 80 BPM. Count out loud in 4/4: "1-2-3-4." Now switch to 3/4: "1-2-3." Then try 6/8: "1-2-3-4-5-6." Play a single open G chord and strum quarter notes in each time signature. Feel how the same chord takes on a completely different character just from the rhythmic frame. That's the power of time signatures — they're not just rules, they're creative tools.</p></div>`
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
          body: `<p>Every rhythm you'll ever hear — from a simple punk strum to a complex jazz solo — is built from just <strong>seven building blocks</strong>. Master these and you can read, write, and play any rhythm. Think of them as your rhythmic alphabet: just as 26 letters form every word in English, these 7 elements form every rhythm in music.</p>

<p><strong>1. Whole note</strong> — 4 beats. The longest common note. You strike once and hold through beats 1-2-3-4. On guitar, let an open chord ring for a full measure. In 4/4 time, one whole note fills the entire bar.</p>

<p><strong>2. Half note</strong> — 2 beats. Two per measure in 4/4. Strike and hold for two counts. Play an open G chord on beat 1, hold through beat 2, strike again on beat 3, hold through beat 4. You've just played four half notes across two measures.</p>

<p><strong>3. Quarter note</strong> — 1 beat. The fundamental pulse. Four per measure in 4/4. This is your foot-tap. When someone says "play on the beat," they mean quarter notes. On guitar, steady downstrokes on an open chord at a comfortable tempo — that's the quarter-note foundation.</p>

<p><strong>4. Eighth notes</strong> — half a beat each. Two eighth notes fill one beat. Count "1-and-2-and-3-and-4-and." Your strumming hand goes down on the number, up on the "and." This is the most common subdivision in popular music — virtually every strumming pattern is built from eighth notes.</p>

<p><strong>5. Sixteenth notes</strong> — quarter of a beat each. Four sixteenth notes fill one beat. Count "1-e-and-a-2-e-and-a." On guitar, this is funk territory — the rapid, percussive muting that drives R&B and funk. Your picking hand moves twice as fast as with eighth notes. Start slow: at 60 BPM, play sixteenths on a single string (any note). Down-up-down-up, strict alternation.</p>

<p><strong>6. Rests</strong> — silence for the same duration as any note value. A quarter rest = one beat of silence. An eighth rest = half a beat of silence. Rests are NOT empty space — they're <strong>intentional silence</strong>. In funk and reggae, the rests are as important as the notes. The spaces between strums create the groove.</p>

<p><strong>7. Dotted notes</strong> — a dot after a note adds half its value. A dotted half note = 3 beats (2 + 1). A dotted quarter note = 1.5 beats (1 + 0.5). Dotted notes create rhythms that stretch across the beat — they're the source of syncopation and swing. The famous "We Will Rock You" stomping pattern uses dotted notes to create its lopsided, heavy feel.</p>

<p><strong>How they combine:</strong> A measure of 4/4 might contain: one quarter note (1 beat) + two eighth notes (1 beat) + one half note (2 beats) = 4 beats. Every measure is a puzzle that always adds up. Once you see rhythm as a counting puzzle, reading music becomes second nature.</p>

<div class="lp-callout"><div class="lp-co-title">TRY THIS</div><p>Set your metronome to 70 BPM. Play an open E minor chord. Spend one measure on each building block: whole note (one strum, hold 4 beats) → half notes (two strums per measure) → quarter notes (four strums) → eighth notes (eight strums, down-up) → back to whole notes. Feel the gears shift as you double the density. This exercise connects your ear to each rhythmic value and builds the internal clock that every guitarist needs.</p></div>`
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
          body: `<p>A <strong>triad</strong> is the smallest complete chord — just three notes stacked in thirds. Every chord you'll ever play is either a triad or a triad with extra notes added on top. Understanding triads is like learning to see the DNA inside every chord shape on the fretboard.</p>

<p>The three notes of any triad are the <strong>Root</strong> (the name of the chord), the <strong>3rd</strong> (determines major or minor), and the <strong>5th</strong> (stabilizes the chord). Change the 3rd and you change the entire emotional quality.</p>

<p><strong>Major triad</strong> — Root + Major 3rd + Perfect 5th.<br>
Example: C-E-G. Bright, happy, resolved. Play the open C chord — that's C-E-G-E-C-E. All notes from the C major triad. Now play a G barre chord at fret 3 — that's G-B-D, the G major triad. Same structure, different root, different position.</p>

<p><strong>Minor triad</strong> — Root + Minor 3rd + Perfect 5th.<br>
Example: C-E♭-G. Dark, sad, introspective. The only difference from major? The 3rd is lowered by one fret. Play an open A minor chord (A-C-E) — that's the A minor triad. Now compare it to A major (A-C♯-E). One note changed, completely different feeling.</p>

<p><strong>Diminished triad</strong> — Root + Minor 3rd + Diminished 5th.<br>
Example: C-E♭-G♭. Tense, unstable, wanting to resolve. Both the 3rd and 5th are lowered. On the guitar, play a B diminished shape at fret 2 (x-2-3-4-2-x). It sounds like a question — it wants an answer (usually a C chord).</p>

<p><strong>Augmented triad</strong> — Root + Major 3rd + Augmented 5th.<br>
Example: C-E-G♯. Dreamy, floating, suspenseful. The 5th is raised. Think of horror movie endings or the dream-sequence sound in old films. It's symmetrical — every interval is a major 3rd (4 frets).</p>

<p><strong>Triads on the fretboard:</strong> Every chord shape you know contains a triad. An open G chord? G-B-D-G-B-G — the G major triad, doubled across six strings. A power chord (root-5th-root)? That's a triad with the 3rd removed — neither major nor minor, which is why it sounds neutral and works over both. The CAGED system is essentially five ways to play the same triad across the neck.</p>

<p><strong>Triad inversions:</strong> The root doesn't have to be the lowest note. If E is on the bottom (E-G-C), that's first inversion. If G is on the bottom (G-C-E), that's second inversion. Same three notes, different bass note, different flavor. Inversions are how guitarists create smooth voice-leading — moving from chord to chord with minimal finger movement.</p>

<div class="lp-callout"><div class="lp-co-title">TRY THIS</div><p>Play just the top 3 strings (G-B-E) at these positions: (0-1-0) = C major triad, (0-0-0) = E minor triad, (2-3-2) = D major triad. These tiny shapes are the essence of rhythm guitar in funk, R&B, and jazz — whole chords reduced to their bare DNA. Move the C major shape (0-1-0) up two frets to (2-3-2) and you have D major. Up two more frets to (4-5-4) = E major. One shape, every key. That's the power of triads.</p></div>`
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
          body: `<p>The <strong>pentatonic scale</strong> is a five-note scale that sounds good over almost anything. It's created by removing the two "trouble" notes from the major scale — the 4th and the 7th — the notes that clash most easily with chords. What's left is pure musical gold: five notes that are almost impossible to play wrong.</p>

<p><strong>Minor pentatonic</strong> — A-C-D-E-G (in A minor).<br>
This is the backbone of rock, blues, and pop lead guitar. The formula: Root, minor 3rd, perfect 4th, perfect 5th, minor 7th. It sounds gritty, soulful, and expressive. virtually every classic rock guitar solo — from "Stairway to Heaven" to "Sweet Child O' Mine" — is built primarily from this scale.</p>

<p><strong>Major pentatonic</strong> — C-D-E-G-A (in C major).<br>
The formula: Root, major 2nd, major 3rd, perfect 5th, major 6th. It sounds sweet, open, and bright. Country lead guitar lives here. Think of any country chicken-pickin' solo or the melody of "My Girl" by The Temptations — that's major pentatonic.</p>

<p><strong>The two-way street:</strong> Here's the secret that unlocks the fretboard: A minor pentatonic and C major pentatonic use the <strong>exact same five notes</strong> (A-C-D-E-G). The only difference is which note you treat as "home." If A is the root, it's minor. If C is the root, it's major. This means you can learn five shapes and have access to both scales in all 12 keys.</p>

<p><strong>The five shapes (positions):</strong> On the guitar, the pentatonic scale is organized into five interconnected shapes that tile the entire fretboard. Most guitarists start with <strong>Shape 1</strong> (the "box") at fret 5 for A minor pentatonic — it falls neatly under the fingers with no stretches. Each shape connects to the next via shared notes on adjacent frets. Learn all five and you can solo anywhere on the neck without getting lost.</p>

<p><strong>On the fretboard — A minor pentatonic, Shape 1:</strong> Start at fret 5 on the low E string (A). The full shape spans frets 5–8 across all six strings. Every note in this shape sounds good over an A minor chord, an A blues progression, or a C major backing track. Add the "blue note" (E♭ between D and E) and you get the <strong>blues scale</strong> — six notes with extra soul.</p>

<p><strong>Why it's the perfect starting scale:</strong> With only five notes instead of seven, there are fewer choices to make. Every combination sounds musical. It frees you to focus on phrasing — <strong>how</strong> you play (bends, slides, vibrato, rhythm) matters more than <strong>what</strong> you play. B.B. King built an entire career on mostly using just Shape 1 with masterful phrasing.</p>

<div class="lp-callout"><div class="lp-co-title">TRY THIS</div><p>Put on an A minor backing track (or just record yourself strumming Am-Dm-Em). Play only the notes in A minor pentatonic Shape 1 (frets 5–8). Don't try to play fast — play three or four notes, then pause. Let each note breathe. Bend the D (7th fret, G string) up toward the E. Slide from the 5th fret to the 8th on the B string. These simple techniques turn five notes into an expressive solo. The scale is your vocabulary; phrasing is your voice.</p></div>`
        },
        {
          id: 'major-scale',
          title: 'The Major Scale',
          difficulty: 1,
          source: 'Wolfsohn Ch.3 / QJam L1',
          body: `<p>The <strong>major scale</strong> is the foundation of Western music theory — the reference point against which every other scale, chord, and mode is measured. It's the "zero" on the musical thermometer. Learn this deeply and everything else becomes easier.</p>

<p><strong>The formula:</strong> Whole-Whole-Half-Whole-Whole-Whole-Half (W-W-H-W-W-W-H). A <strong>whole step</strong> = 2 frets. A <strong>half step</strong> = 1 fret.</p>

<p><strong>In C major:</strong> C-D-E-F-G-A-B-C. No sharps, no flats — the white keys on a piano. Let's verify the formula: C→D (W), D→E (W), E→F (H), F→G (W), G→A (W), A→B (W), B→C (H). The half steps fall between E-F (3rd-4th degrees) and B-C (7th-Root).</p>

<p><strong>Why it matters:</strong> Every chord in a key comes from the major scale. In C major: C (I), Dm (ii), Em (iii), F (IV), G (V), Am (vi), Bdim (vii°). This is called <strong>diatonic harmony</strong> — building chords from the notes of the scale. Understanding this one fact unlocks thousands of songs, because most popular music stays within a single major key.</p>

<p><strong>The 5 CAGED shapes:</strong> On the guitar, the major scale is organized into five movable patterns — one derived from each open chord shape (C, A, G, E, D). Together they cover the entire fretboard. Each shape overlaps the next by a few frets, creating a continuous chain of notes. Start by learning the C shape (starts at the root on the A string) and the E shape (starts at the root on the low E string) — these are the most useful.</p>

<p><strong>Scale degrees and their functions:</strong><br>
<strong>1st (Root)</strong> — home base, resolves everything.<br>
<strong>2nd</strong> — adds movement, a passing tone.<br>
<strong>3rd</strong> — defines major or minor. The soul of the chord.<br>
<strong>4th</strong> — tension note, wants to resolve to the 3rd. The "Amen" of music.<br>
<strong>5th</strong> — stability. Power chords are just root + 5th.<br>
<strong>6th</strong> — warmth. Adds a sweet, yearning quality.<br>
<strong>7th</strong> — the leading tone. Wants desperately to resolve up to the root. The engine of tension.</p>

<p><strong>On the fretboard — C major, open position:</strong> Starting on the low E string, 8th fret (C), the scale ascends: C(8) → D(10) → E(open or 12th on E) → F(1st fret on E) → G(3rd) → A(open or 5th on A) → B(2nd on A) → C(3rd on A). But most beginners learn it in <strong>open position</strong> using open strings: C on 3rd fret A string, D open D string, E 2nd fret D string, F 1st fret E string, and so on across all six strings.</p>

<div class="lp-callout"><div class="lp-co-title">TRY THIS</div><p>Play the C major scale in open position, ascending and descending, using one finger per fret (index = frets 1-2, middle = 3, ring = 4). Say each note name out loud as you play it: "C-D-E-F-G-A-B-C." Now play it again, but this time sing along. Your voice doesn't need to be good — the goal is to connect your ear to each scale degree. When you can hear the scale in your head before you play it, you've truly internalized it. Then try the same scale starting from A on the 5th fret low E string — you're now playing the A natural minor scale (Aeolian mode). Same notes, different home.</p></div>`
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
          video: 'https://www.youtube.com/embed/9lQ-haBfswA',
          body: `<p><strong>Alternate picking</strong> is the gold standard of right-hand guitar technique. The concept is beautifully simple: downstroke, upstroke, downstroke, upstroke — strictly alternating, no matter which string you're on or what direction you're moving. This single habit is the foundation of speed, clarity, and rhythmic precision.</p>

<p><strong>Why alternate picking works:</strong> Your hand moves like a pendulum — the most natural, efficient motion possible. Every note receives the same attack because the pick angle is consistent. There's no wasted motion: when your hand moves down to pick a note, it's already in position for the upstroke on the next note. This economy of motion is what allows players like John McLaughlin and Al Di Meola to play blindingly fast while staying perfectly clean.</p>

<p><strong>Hold the pick correctly:</strong> Grip it between your thumb and the side of your index finger, with about 1/4 inch (5-6mm) of the tip exposed. The pick should rest at a slight angle to the strings — not perpendicular (too much resistance) and not parallel (catches on strings). Your wrist should be relaxed, not locked. The motion comes from the wrist (and a bit from the elbow for string crossing), not from the shoulder.</p>

<p><strong>Downstrokes vs Upstrokes:</strong> A downstroke tends to have more attack and bass emphasis — it feels "heavy." An upstroke is lighter, slightly thinner. When you alternate, these differences even out, giving every note a consistent, balanced tone. This is why alternate picking sounds more even than all-downstroke playing.</p>

<p><strong>String crossing — the real challenge:</strong> Moving from one string to the next while maintaining strict alternation is where most players struggle. There are two types:<br>
<strong>Outside picking:</strong> The pick moves away from the next string before crossing (e.g., downstroke on string 2, upstroke on string 1). This feels natural — most players default to it.<br>
<strong>Inside picking:</strong> The pick moves toward the next string (e.g., upstroke on string 3, downstroke on string 2). This feels awkward at first but is essential for fluency. Practice both equally.</p>

<p><strong>The metronome method:</strong> Start at 60 BPM. Play quarter notes on a single string — strict down-up-down-up. When that's clean, move to eighth notes (twice as fast). Then string crossing: play the 5th fret on each string, ascending from low E to high E, then descending. Only increase the BPM when every note is clean, even, and relaxed.</p>

<p><strong>Common mistakes:</strong> (1) Picking too hard — a light, controlled stroke is faster and cleaner. (2) Burying the pick too deep — only the tip should touch the string. (3) Tensing up — if your shoulder or forearm is tight, slow down. Speed comes from relaxation, not force. (4) Skipping alternation on string crosses — maintain the pattern no matter what.</p>

<div class="lp-callout"><div class="lp-co-title">TRY THIS</div><p>The "1-2-3-4" chromatic exercise: Start on fret 1 of the low E string. Play 1-2-3-4 with fingers 1-2-3-4, strict alternate picking. Move to the A string (same frets), then D, G, B, high E. Now come back down: 4-3-2-1 from high E to low E. Start at 60 BPM, one note per click. When clean, move to two notes per click (eighth notes). This one exercise builds alternate picking, finger independence, and string-crossing fluency — all at once. It's the single most productive warm-up you can do.</p></div>`
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
          body: `<p>An <strong>arpeggio</strong> is simply the notes of a chord played one at a time, in sequence, instead of all at once. If a C major chord is C-E-G ringing together, then a C major arpeggio is C... E... G... played as individual notes. The word comes from the Italian "arpeggiare" — to play on a harp. Picture a harpist sweeping across the strings: that's an arpeggio.</p>

<p><strong>Chord vs Arpeggio — the relationship:</strong><br>
A chord is <strong>vertical</strong> — all notes stacked up and played simultaneously.<br>
An arpeggio is <strong>horizontal</strong> — the same notes spread out in time, played melodically.<br>
A scale is also horizontal, but it uses <strong>every note</strong> in the key. An arpeggio uses only the <strong>chord tones</strong> — the most important notes. Think of the arpeggio as the skeleton and the scale as the flesh around it.</p>

<p><strong>Why arpeggios are essential:</strong><br>
1. <strong>They outline the harmony.</strong> When you play a C arpeggio over a C chord, you're highlighting the exact notes that define that chord. It always sounds "right" because you're playing the chord itself — just melodically.<br>
2. <strong>They bridge chords and scales.</strong> Chords are vertical (harmony), scales are horizontal (melody). Arpeggios live in both worlds — they're harmonic notes played melodically.<br>
3. <strong>They're the "safe notes" for improvisation.</strong> When in doubt about what to play over a chord, play its arpeggio. These are the notes that the chord is made of — they will never clash.<br>
4. <strong>They build technique.</strong> Playing arpeggios cleanly requires precise left-hand fingering and controlled right-hand picking. They're both a musical tool and a technical exercise.</p>

<p><strong>On the guitar — C major arpeggio in open position:</strong> Play C on the 3rd fret of the A string, then E on the 2nd fret of the D string, then G on the open G string. That's a C major arpeggio — Root, 3rd, 5th. Now add the octave: C on the 1st fret of the B string. Continue: E open high E, G 3rd fret high E. You've just mapped a C major arpeggio across five strings.</p>

<p><strong>Movable shapes:</strong> Just like barre chords, arpeggio shapes can move anywhere on the neck. Learn the C major arpeggio shape at the 8th fret (root on low E), and you can move it to the 1st fret for F major, the 3rd for G major, etc. Each arpeggio type — major, minor, diminished, dominant 7th — has its own distinct shape that corresponds to the chord type.</p>

<p><strong>The arpeggio in music:</strong> The opening of "Stairway to Heaven" is an arpeggio pattern. "House of the Rising Sun" uses arpeggiated chords. Virtually every classical guitar piece is built on arpeggios. When a pianist's left hand plays "boom-chick" patterns, those are arpeggios. They're everywhere once you start recognizing them.</p>

<div class="lp-callout"><div class="lp-co-title">TRY THIS</div><p>Play an open Am chord. Now instead of strumming, pick each string one at a time from low to high: A (5th string open) → C (4th string, 2nd fret) → E (3rd string open) → A (2nd string open) → C (2nd string, 1st fret) → E (1st string open). That's an A minor arpeggio — and you've just turned a chord you already know into an arpeggio exercise. Now switch to C major and do the same. Alternate between Am and C arpeggios. Notice how only one or two notes change? That's voice-leading — the secret to smooth arpeggio playing.</p></div>`
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
          video: 'https://www.youtube.com/embed/hY1MQafPBGo',
          body: `<p><strong>PIMA</strong> is the international fingering system for classical and fingerstyle guitar. It assigns a letter to each right-hand finger so that sheet music, exercises, and patterns can tell you exactly which finger to use. It comes from the Spanish names for the fingers — a legacy of the classical guitar tradition that stretches back through Spain to the Renaissance.</p>

<p>The assignments:<br>
<strong>P</strong> = Pulgar (thumb) — responsible for the bass strings (6th, 5th, 4th). The thumb is your rhythmic anchor and bass player.<br>
<strong>I</strong> = Índice (index) — typically plays the 3rd string (G), but is flexible.<br>
<strong>M</strong> = Medio (middle) — typically plays the 2nd string (B).<br>
<strong>A</strong> = Anular (ring) — typically plays the 1st string (high E). The weakest finger, but crucial for the top melody line.</p>

<p>(The pinky is rarely used in classical technique and has no letter designation. In flamenco, it's sometimes labeled "E" or "X" for rasgueado strumming.)</p>

<p><strong>Right-hand position:</strong> Sit with the guitar on your left leg (classical position) or right leg (casual). Your right forearm rests on the top edge of the guitar body. Your hand hovers above the soundhole (acoustic) or around the middle pickup (electric). The fingers curve naturally — imagine holding a small orange. The thumb extends slightly forward of the fingers. The wrist is relaxed, not bent.</p>

<p><strong>Two fundamental strokes:</strong><br>
<strong>Rest stroke (Apoyando):</strong> The finger plucks a string and comes to rest on the adjacent string. It produces a full, warm, loud tone. Use it for melody notes that need to stand out. Try it: pluck the 2nd string with your middle finger and let it come to rest against the 3rd string. Hear how round and full that sounds?<br>
<strong>Free stroke (Tirando):</strong> The finger plucks and clears the string without touching the next one. It produces a lighter, brighter tone. Use it for arpeggios and accompaniment where notes need to ring together. Try it: pluck the same string but this time curve your finger inward toward your palm, clearing the string entirely.</p>

<p><strong>The basic P-I-M-A arpeggio:</strong> This is the foundation pattern. Thumb plays a bass note (say, 5th string open A), then index plays 3rd string (G), middle plays 2nd string (B), ring plays 1st string (E). P-I-M-A. Play it as quarter notes at 60 BPM. When that feels smooth, play it as eighth notes: P-I-M-A-P-I-M-A (the second group starts on the off-beat).</p>

<p><strong>Nail vs flesh:</strong> Classical guitarists grow their right-hand nails slightly longer so the string is plucked by both flesh and nail — the flesh gives warmth, the nail gives brightness and projection. Fingerstyle steel-string players may use nails, fingertips, or fingerpicks. Electric players often use the fleshy pads of the fingers for a soft, warm jazz tone.</p>

<div class="lp-callout"><div class="lp-co-title">TRY THIS</div><p>Hold an open C chord with your left hand. With your right hand, play this pattern slowly and evenly: P (5th string) → I (3rd string) → M (2nd string) → A (1st string). That's P-I-M-A. Repeat four times. Now try P-I-M-A-M-I — the "forward and back" pattern. Your thumb stays steady on the bass while the fingers alternate. This single exercise, practiced daily for five minutes, builds the finger independence that unlocks every fingerstyle song ever written. Start at 50 BPM and only speed up when every note is even.</p></div>`
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
          body: `<p>On the guitar, every fret is a precise, measurable distance from every other fret. These distances — called <strong>intervals</strong> — are the atoms of music theory. The two smallest and most important are the <strong>half step</strong> and the <strong>whole step</strong>. Everything in Western music — every scale, every chord, every melody — is built from these two building blocks.</p>

<p><strong>Half step (semitone)</strong> = one fret on the guitar.<br>
This is the smallest interval in Western music. Play any string open, then play the 1st fret — that's a half step. There is no note in between. Examples: E→F (open and 1st fret on any string), B→C (7th and 8th fret on any string). The natural half steps in music always occur between E-F and B-C.</p>

<p><strong>Whole step (whole tone)</strong> = two frets on the guitar.<br>
A whole step skips one fret. Play an open string, then play the 2nd fret — that's a whole step. There IS a note in between (the 1st fret). Examples: F→G (1st and 3rd fret), C→D (1st and 3rd fret on the B string). Most adjacent notes in the musical alphabet are a whole step apart — the exceptions are E-F and B-C.</p>

<p><strong>The chromatic scale — all half steps:</strong> If you play every fret from open to the 12th fret on any string, you're playing the chromatic scale: E-F-F♯-G-G♯-A-A♯-B-C-C♯-D-D♯-E. That's 12 half steps (13 notes) to reach the octave. Every scale is a selection from these 12 notes.</p>

<p><strong>The 12 natural pairs:</strong> The musical alphabet is A-B-C-D-E-F-G. Between most letters is a whole step. But there are two places where letters are only a half step apart: <strong>B→C</strong> and <strong>E→F</strong>. These two "short gaps" are the reason scales have different patterns. The major scale formula (W-W-H-W-W-W-H) places its half steps exactly where these natural gaps fall in C major.</p>

<p><strong>On the fretboard:</strong> Play the low E string open, then: F (1st fret, half step), G (3rd fret, whole step from F), G♯ (4th fret, half step), A (5th fret, half step), B (7th fret, whole step), C (8th fret, half step), D (10th fret, whole step), E (12th fret, whole step). You've just walked through a mix of half and whole steps — and that's how every scale is built.</p>

<p><strong>Why this matters:</strong> Every scale is a specific pattern of whole and half steps. The major scale is W-W-H-W-W-W-H. The natural minor is W-H-W-W-H-W-W. The blues scale, the pentatonic, the modes — they're all formulas of Ws and Hs. If you understand whole and half steps, you can build any scale from scratch on any string, in any key, without memorizing a single diagram.</p>

<div class="lp-callout"><div class="lp-co-title">TRY THIS</div><p>Play only the low E string. Start open (E). Now say the major scale formula out loud: "Whole-Whole-Half-Whole-Whole-Whole-Half." Move your finger accordingly: E→F♯ (W, 2nd fret) → G♯ (W, 4th fret) → A (H, 5th fret) → B (W, 7th fret) → C♯ (W, 9th fret) → D♯ (W, 11th fret) → E (H, 12th fret). You just built the E major scale from a formula on a single string. Now try the same formula starting from A on the 5th fret — you'll get the A major scale. The formula never changes; only the starting point does.</p></div>`
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
          body: `<p>A <strong>key signature</strong> is the collection of sharps or flats placed at the beginning of every line of written music. It tells the musician, "These notes are always sharp (or flat) throughout the entire piece — you don't need to mark each one individually." It's the composer's way of establishing the harmonic home base before a single note is played.</p>

<p><strong>How to read a key signature:</strong> Look at the sharps or flats between the clef and the time signature. The number of symbols tells you the key. There are two paths on the Circle of Fifths:</p>

<p><strong>The sharp keys (clockwise from C):</strong><br>
0 sharps → C major / A minor<br>
1 sharp (F♯) → G major / E minor<br>
2 sharps (F♯, C♯) → D major / B minor<br>
3 sharps (F♯, C♯, G♯) → A major / F♯ minor<br>
4 sharps (F♯, C♯, G♯, D♯) → E major / C♯ minor<br>
5 sharps (F♯, C♯, G♯, D♯, A♯) → B major / G♯ minor</p>

<p><strong>The flat keys (counter-clockwise from C):</strong><br>
0 flats → C major / A minor<br>
1 flat (B♭) → F major / D minor<br>
2 flats (B♭, E♭) → B♭ major / G minor<br>
3 flats (B♭, E♭, A♭) → E♭ major / C minor<br>
4 flats (B♭, E♭, A♭, D♭) → A♭ major / F minor<br>
5 flats (B♭, E♭, A♭, D♭, G♭) → D♭ major / B♭ minor</p>

<p><strong>The shortcut — identifying keys at a glance:</strong><br>
For sharp keys: the last sharp in the signature is the 7th degree of the key. Go up one half step and you have the key name. Example: last sharp is C♯ → go up one half step → D major.<br>
For flat keys: the second-to-last flat IS the key name. Example: flats are B♭-E♭-A♭ → second-to-last is E♭ → E♭ major. (For F major with one flat, just memorize it.)</p>

<p><strong>Relative minor vs parallel minor:</strong><br>
<Strong>Relative minor</strong> shares the same key signature. C major and A minor both have zero sharps/flats. They use the same seven notes — the difference is which note feels like "home." The relative minor always starts on the 6th degree of the major scale.<br>
<Strong>Parallel minor</strong> shares the same root note but has a different key signature. C major has zero sharps. C minor has three flats (B♭, E♭, A♭). They start from the same note but diverge immediately — C major uses E natural, C minor uses E♭.</p>

<p><strong>On the guitar:</strong> Key signatures determine which frets are "in" and which are "out." In G major (1 sharp: F♯), the note F natural (1st fret on the E string) is outside the key — it's the one you avoid unless you want tension. In F major (1 flat: B♭), the B natural is the outside note. Internalizing key signatures means knowing which 7 frets out of 12 belong to your current musical home.</p>

<div class="lp-callout"><div class="lp-co-title">TRY THIS</div><p>Play the G major scale in open position: G(open low E... no, let's use the right position). Start on G, 3rd fret low E string. Play: G(3)-A(5)-B(open or 7)-C(8)-D(5th fret A string or open D)-E(2nd fret D string or open)-F♯(4th fret D string)-G(5th fret D string or open G). Notice that F♯ — it's the one note that's different from C major. That single sharp defines the entire key of G. Now play the same scale but use F natural (3rd fret D string) instead of F♯. Hear how it suddenly feels "wrong" at the F? That's the key signature at work — your ear knows which note belongs.</p></div>`
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
          body: `<p><strong>Standard notation</strong> (also called staff notation) is the universal written language of music. It's been the primary way musicians have communicated musical ideas for over 400 years. Unlike TAB, which is specific to guitar, standard notation works for every instrument — violin, piano, trumpet, voice, marimba. Learning it opens the entire world of written music to you.</p>

<p><strong>The staff:</strong> Five horizontal lines and four spaces between them. Each line and each space represents a specific pitch. Lower notes appear lower on the staff; higher notes appear higher. It's a visual map of pitch — you can literally see a melody rise and fall by watching the dots go up and down.</p>

<p><strong>The treble clef (G clef):</strong> Guitar music is written in treble clef. The spiral of the clef symbol wraps around the second line from the bottom — that line is G (the open G string on guitar). Everything else is measured from there.</p>

<p><strong>Reading the lines (bottom to top):</strong> E-G-B-D-F.<br>
The classic mnemonic: "Every Good Boy Does Fine" — or "Every Good Boy Deserves Fudge" if you prefer. These are the notes that sit on the lines.</p>

<p><strong>Reading the spaces (bottom to top):</strong> F-A-C-E.<br>
They literally spell "FACE." These are the notes that sit in the spaces between the lines.</p>

<p><strong>Ledger lines:</strong> When notes go above or below the staff, extra short lines are added. Middle C (the C on the 1st fret of the B string) sits on the first ledger line below the staff. Low E (the open low E string) is far below — it requires multiple ledger lines. This is why guitar music often uses the <strong>8vb</strong> marking — it tells you the notes sound one octave lower than written, keeping everything on the staff.</p>

<p><strong>Guitar transposition:</strong> Guitar music is written one octave higher than it sounds. When you play the note written as middle C on the staff, it actually sounds as the C below middle C. This is a convention to keep guitar music on the treble clef instead of requiring bass clef ledger lines.</p>

<p><strong>TAB vs Standard notation:</strong><br>
<strong>TAB</strong> tells you WHERE to put your fingers (fret numbers on string lines). It's immediate and intuitive — you can start playing within minutes of seeing it.<br>
<strong>Standard notation</strong> tells you WHAT note to play (pitch) and for HOW LONG (rhythm). It's harder to learn but vastly more powerful — you can read music for any instrument, communicate with non-guitarists, and understand the theory behind what you're playing.<br>
The best approach: learn both. Use TAB as a shortcut for fingerings, and standard notation for understanding the music.</p>

<p><strong>The note head:</strong> An open (hollow) note head = half note or whole note (longer values). A filled-in (solid) note head = quarter note or shorter. A stem going up on the right = notes below the middle line. A stem going down on the left = notes on or above the middle line.</p>

<div class="lp-callout"><div class="lp-co-title">TRY THIS</div><p>Draw five horizontal lines on paper. Label the lines E-G-B-D-F (bottom to top). Label the spaces F-A-C-E (bottom to top). Now mark a dot on the second line (G), then the second space (A), then the third line (B), then the third space (C). You've just written G-A-B-C — the start of the G major scale. Play those notes on your guitar: G (open 3rd string), A (2nd fret 3rd string), B (open 2nd string), C (1st fret 2nd string). You just read your first standard notation. Now do the same with the first four lines: E-G-B-D. Play: E (open 1st string... no, that's high E). Let's use open low E (6th string), G (3rd fret 6th string), B (7th fret 6th string... or open 5th string), D (open 4th string). You're reading music.</p></div>`
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
