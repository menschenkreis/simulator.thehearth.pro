// Doing Node — Open-World Drill Library
// Sources: Phillips & Chappell (Guitar Exercises For Dummies), Troy Nelson (Guitar Aerobics),
//          Berklee Phase 2 (Leavitt), Funk Guitar (Bolton), Satriani Guitar Secrets

const DOING = {
  id: 'doing',
  title: 'Doing',
  tag: 'DOING PATH',
  description: 'Open-world drill library. All exercises, always accessible. Categorised by skill. Revisit anything, anytime.',
  sources: [
    'Mark Phillips & Jon Chappell — Guitar Exercises For Dummies (Wiley)',
    'Troy Nelson — Guitar Aerobics: 52-Week Workout (Hal Leonard, 2007)',
    'William Leavitt — Berklee Basic Guitar Phase 2 (Berklee Press)',
    'Ross Bolton — Funk Guitar: The Essential Guide (Hal Leonard)',
    'Joe Satriani — Guitar Secrets (Guitar Educational)'
  ],

  categories: [
    {
      id: 'picking',
      title: 'Picking',
      icon: '🎸',
      description: 'Alternate picking, economy picking, sweep picking. The foundation of right-hand technique.',
      drills: [
        {
          id: 'alt-picking-basic',
          title: 'Alternate Picking — Single String',
          difficulty: 1,
          bpm: '60-100',
          duration: '5 min',
          source: 'Guitar Aerobics (Mon)',
          body: `<p>Start on the low E string. Pick down-up-down-up continuously. Focus on:</p>
<p>• <strong>Even volume</strong> — downstrokes and upstrokes should sound identical<br>
• <strong>Small motion</strong> — the pick moves only 2-3mm past the string<br>
• <strong>Relaxed grip</strong> — hold the pick between thumb and index finger, no death grip</p>
<div class="lp-callout">
  <div class="lp-co-title">THE RULE</div>
  <p>If you can't play it clean at 60 BPM, you can't play it. Speed is earned through accuracy, not forced through repetition of sloppiness.</p>
</div>
<p><strong>Exercise:</strong> Play open E string, 4 down-up cycles per fret. Move frets 0-1-2-3-4-5. Then reverse. Use a metronome.</p>`
        },
        {
          id: 'alt-picking-cross',
          title: 'Alternate Picking — String Crossing',
          difficulty: 2,
          bpm: '50-80',
          duration: '8 min',
          source: 'Guitar Aerobics (Mon)',
          body: `<p>The real challenge of alternate picking isn't speed — it's crossing strings cleanly.</p>
<p>When you cross from a downstroke on one string to the next string, the pick needs to <em>land</em> on the new string without catching. This is where most picking problems live.</p>
<p><strong>Exercise:</strong> Play E-A-D-G-B-E, one note per string. Down-up on each. Focus on the moment of string crossing — the pick should glide, not hop.</p>
<p><strong>Advanced:</strong> Play 3 notes per string ascending, then reverse. This creates different picking patterns at each crossing (down-down-up, down-up-down, etc.)</p>`
        },
        {
          id: 'sweep-intro',
          title: 'Sweep Picking — Introduction',
          difficulty: 3,
          bpm: '40-70',
          duration: '10 min',
          source: 'Guitar Aerobics (Fri)',
          body: `<p>Sweep picking is <em>not</em> strumming. Each note rings individually, like a harp. The pick drags across strings in one fluid motion, but each finger lifts off before the next note sounds.</p>
<p>Start with a 3-string minor arpeggio:</p>
<p>• String 3, fret 7 — pick down<br>
• String 2, fret 6 — pick down (sweep through)<br>
• String 1, fret 5 — pick down (sweep through)<br>
• Reverse: pick up through strings 1-2-3</p>
<div class="lp-callout">
  <div class="lp-co-title">THE TRAP</div>
  <p>Most beginners let all notes ring together like a chord. The skill is in the left hand — lifting each finger just before the next note. Practice the left-hand pattern WITHOUT picking first.</p>
</div>`
        }
      ]
    },

    {
      id: 'fretting',
      title: 'Fretting',
      icon: '✋',
      description: 'Finger independence, chromatic exercises, barre chords, left-hand strength.',
      drills: [
        {
          id: 'chromatic-1234',
          title: 'The 1-2-3-4 Chromatic Exercise',
          difficulty: 1,
          bpm: '60-120',
          duration: '5 min',
          source: 'Cary White — Complete Guitar Series',
          body: `<p>The most fundamental fretting exercise. Play frets 1-2-3-4 on each string, one finger per fret:</p>
<p>• Index on fret 1<br>
• Middle on fret 2<br>
• Ring on fret 3<br>
• Pinky on fret 4</p>
<p>Move across all 6 strings (E-A-D-G-B-E), then shift up to frets 2-3-4-5 and continue up the neck.</p>
<p><strong>Focus on:</strong><br>
• Each finger stays close to the fretboard (no flying fingers)<br>
• Minimum pressure — just enough for a clean note<br>
• No tension in the thumb or wrist<br>
• Even timing — every note exactly on the beat</p>`
        },
        {
          id: 'finger-independence',
          title: 'Finger Independence — Spider Exercise',
          difficulty: 2,
          bpm: '40-80',
          duration: '8 min',
          source: 'Guitar Exercises For Dummies',
          body: `<p>This exercise isolates each finger by forcing it to move while others stay planted.</p>
<p>Play this pattern on strings 1-2:</p>
<p>• Fret 1 (index on string 2) + Fret 3 (ring on string 1)<br>
• Fret 2 (middle on string 2) + Fret 4 (pinky on string 1)<br>
• Fret 3 (ring on string 2) + Fret 1 (index on string 1)<br>
• Fret 4 (pinky on string 2) + Fret 2 (middle on string 1)</p>
<p>The key: each finger moves <strong>independently</strong>. If your ring finger moves when your pinky moves, you've found a weakness. That's exactly what you're training.</p>`
        },
        {
          id: 'barre-chord-strength',
          title: 'Barre Chord Strength Builder',
          difficulty: 3,
          bpm: '—',
          duration: '10 min',
          source: 'Guitar Exercises For Dummies',
          body: `<p>Barre chords are the gateway to playing anywhere on the neck. But they're physically demanding until your hand builds the right muscles.</p>
<p><strong>Step 1:</strong> Barre all 6 strings at fret 5 with your index finger. Strum. Do all strings ring? If not, adjust your finger angle (slight roll toward the thumb side helps).</p>
<p><strong>Step 2:</strong> Add middle finger on fret 6, string 3. Strum. This is an A minor shape — moveable.</p>
<p><strong>Step 3:</strong> Practice the "squeeze and release" — barre for 5 seconds, release for 5 seconds. Repeat 10 times. This builds endurance without overstraining.</p>
<div class="lp-callout">
  <div class="lp-co-title">THE MYTH</div>
  <p>You do NOT need to press hard. The barre works because of the <em>structure</em> of your hand, not brute force. Thumb behind the neck (not over it), index finger slightly rolled, arm pulling back (not just squeezing). If it hurts, you're doing it wrong.</p>
</div>`
        }
      ]
    },

    {
      id: 'rhythm',
      title: 'Rhythm',
      icon: '🥁',
      description: '16th notes, syncopation, groove, muting, time feel.',
      drills: [
        {
          id: 'sixteenth-notes',
          title: '16th Note Subdivision',
          difficulty: 1,
          bpm: '60-100',
          duration: '5 min',
          source: 'Berklee Phase 2 (Leavitt)',
          body: `<p>16th notes divide each beat into 4 equal parts. Count: <strong>1-e-&-a  2-e-&-a  3-e-&-a  4-e-&-a</strong></p>
<p>Play one note per subdivision on an open string. Start at 60 BPM. Feel how the 4 notes fit inside each beat.</p>
<p><strong>Test:</strong> Accent only beat 1. Then only the "e"s. Then only the "&"s. Then only the "a"s. If you can do this cleanly, you own the subdivision.</p>
<p><strong>Next level:</strong> Play 8th notes (2 per beat) with your fretting hand while your picking hand plays 16th notes. This is the beginning of rhythmic independence.</p>`
        },
        {
          id: 'funk-muting',
          title: 'Scratch Muting — The Funk Foundation',
          difficulty: 2,
          bpm: '70-110',
          duration: '8 min',
          source: 'Ross Bolton — Funk Guitar',
          body: `<p>Funk guitar is 80% muting. The notes you DON'T hear are as important as the ones you do.</p>
<p><strong>The technique:</strong> Lay your left hand fingers lightly across the strings (don't press to the fret). Pick. You get a percussive "chk" — no pitch, just rhythm.</p>
<p><strong>Exercise:</strong> Play a 16th-note scratch pattern. Accent beat 1 and the "&" of 2. This is the basic funk grid.</p>
<p>Now add ONE real chord (E7) on beat 1 only. Scratch everything else. The contrast between the chord and the scratches creates the groove.</p>
<div class="lp-callout">
  <div class="lp-co-title">THE SECRET</div>
  <p>Listen to James Brown's guitar players. They play the <em>space</em> between notes. The groove lives in the muting. A guitarist who can make people dance with one chord is worth more than someone who can play 100 chords without rhythm.</p>
</div>`
        }
      ]
    },

    {
      id: 'scales',
      title: 'Scales',
      icon: '🎵',
      description: 'Major, minor, pentatonic patterns. 5-pattern system. Sequences and melodic patterns.',
      drills: [
        {
          id: 'pentatonic-box1',
          title: 'Minor Pentatonic — Box 1',
          difficulty: 1,
          bpm: '60-100',
          duration: '5 min',
          source: 'Guitar Exercises For Dummies',
          body: `<p>The minor pentatonic is the most used scale in rock, blues, and pop. Box 1 (also called "Position 1") is where everyone starts.</p>
<p>In A minor, Box 1 sits at fret 5:</p>
<p>• String 6: frets 5-8<br>
• String 5: frets 5-7<br>
• String 4: frets 5-7<br>
• String 3: frets 5-7<br>
• String 2: frets 5-8<br>
• String 1: frets 5-8</p>
<p>Play it ascending, then descending. Then play it with a metronome, one note per beat. Then two notes per beat.</p>
<p><strong>The key:</strong> This one shape works over ANY minor key. Move it to fret 3 for G minor, fret 7 for B minor. The shape is the same — only the position changes.</p>`
        },
        {
          id: 'major-scale-pos1',
          title: 'Major Scale — Position 1',
          difficulty: 2,
          bpm: '50-80',
          duration: '8 min',
          source: 'Guitar Aerobics (Tue)',
          body: `<p>The major scale is the foundation of Western music. Every chord, every key, every progression comes from this pattern.</p>
<p>In C major, Position 1 starts at fret 8:</p>
<p>• String 6: frets 8-10<br>
• String 5: frets 7-8-10<br>
• String 4: frets 7-8-10<br>
• String 3: frets 7-9-10<br>
• String 2: frets 8-10<br>
• String 1: frets 7-8-10</p>
<p>Play it slowly. Listen to the <em>sound</em> — this is what "happy" and "resolved" sounds like. Compare it to the minor pentatonic. Feel the difference in mood.</p>
<p><strong>Next:</strong> Play the same pattern starting on different frets. Fret 3 = G major. Fret 5 = A major. You're learning keys, not just patterns.</p>`
        },
        {
          id: 'scale-sequences',
          title: 'Scale Sequences — Patterns Within Patterns',
          difficulty: 3,
          bpm: '50-80',
          duration: '10 min',
          source: 'Guitar Exercises For Dummies',
          body: `<p>Playing a scale up and down is like reciting the alphabet. Sequences are like forming words — they're what make scales musical.</p>
<p><strong>3rds:</strong> Play scale notes in intervals of 3rds: 1-3, 2-4, 3-5, 4-6, 5-7, 6-8, 7-9, then descend. This creates a harmonised melody.</p>
<p><strong>4ths:</strong> Same idea, in 4ths: 1-4, 2-5, 3-6, etc.</p>
<p><strong>Groups of 4:</strong> Play notes 1-2-3-4, then 2-3-4-5, then 3-4-5-6. This creates a "running" effect used in rock and metal solos.</p>
<div class="lp-callout">
  <div class="lp-co-title">WHY SEQUENCES MATTER</div>
  <p>Scales are vocabulary. Sequences are sentences. You don't speak by listing words — you combine them into phrases. Same with music. Learn the scale, then learn to <em>say something</em> with it.</p>
</div>`
        }
      ]
    },

    {
      id: 'arpeggios',
      title: 'Arpeggios',
      icon: '🔺',
      description: 'Major, minor, dominant 7th arpeggios. Breaking chords into melody.',
      drills: [
        {
          id: 'major-arpeggio',
          title: 'Major Arpeggio — 3 Notes',
          difficulty: 1,
          bpm: '60-90',
          duration: '5 min',
          source: 'Guitar Aerobics (Thu)',
          body: `<p>An arpeggio is a chord played one note at a time. A major arpeggio uses 3 notes: Root, 3rd, 5th.</p>
<p>In C major: C (fret 8, string 6) → E (fret 7, string 5) → G (fret 5, string 4)</p>
<p>Play each note individually, letting each ring. Then move to the next octave position. This is what creates the "flowing" sound in fingerpicking and lead guitar.</p>
<p><strong>Exercise:</strong> Play C major arpeggio ascending through 2 octaves, then descend. Each note should ring clearly into the next.</p>`
        },
        {
          id: 'dom7-arpeggio',
          title: 'Dominant 7th Arpeggio',
          difficulty: 2,
          bpm: '50-80',
          duration: '8 min',
          source: 'Guitar Exercises For Dummies',
          body: `<p>The dominant 7th arpeggio adds the flatted 7th to the major triad: Root-3rd-5th-b7th. This is the sound of blues, funk, and jazz.</p>
<p>In A7: A → C# → E → G</p>
<p>Play it across 4 strings. Notice the <em>tension</em> — the b7th wants to resolve down. This tension is the engine of blues and jazz. The chord wants to move somewhere.</p>
<p><strong>Next:</strong> Play the arpeggio over a static A7 vamp. Improvise by mixing the arpeggio notes in different orders. This is the beginning of chord-based soloing.</p>`
        }
      ]
    },

    {
      id: 'speed',
      title: 'Speed Mechanics',
      icon: '⚡',
      description: 'Building speed through technique, not force. Legato, tapping, string skipping.',
      drills: [
        {
          id: 'legato-basic',
          title: 'Legato — Hammer-ons and Pull-offs',
          difficulty: 2,
          bpm: '60-100',
          duration: '8 min',
          source: 'Troy Stetina — Speed Mechanics',
          body: `<p>Legato means "smooth and connected." Instead of picking every note, you use your fretting hand to sound notes via hammer-ons and pull-offs.</p>
<p><strong>Exercise:</strong> On string 1:<br>
• Pick fret 5 (index)<br>
• Hammer-on to fret 7 (ring) — don't pick, let the hammer sound the note<br>
• Pull-off from fret 7 back to fret 5 — snap the string slightly as you lift</p>
<p>Repeat. The goal: the hammer-on and pull-off should be the SAME volume as the picked note. If they're quieter, you're not hitting/pulling hard enough.</p>
<div class="lp-callout">
  <div class="lp-co-title">THE SPEED SECRET</div>
  <p>Legato is faster than alternate picking because the picking hand rests. Most shredders use a mix: pick the first note of each string, legato the rest. This is how Satriani and Joe Pass play fast lines with minimal picking effort.</p>
</div>`
        },
        {
          id: 'tapping-intro',
          title: 'Tapping — Introduction',
          difficulty: 3,
          bpm: '50-80',
          duration: '10 min',
          source: 'Satriani — Guitar Secrets',
          body: `<p>Tapping extends your fretting hand's range by using your picking hand to hammer-on notes higher on the neck.</p>
<p><strong>Basic pattern:</strong> On string 1:<br>
• Fret 5 (left index) — pick<br>
• Fret 12 (right middle finger) — tap and pull-off<br>
• Fret 8 (left ring) — sounds from the pull-off</p>
<p>The sequence is: pick → tap → pull-off → pull-off. Three notes with one pick stroke.</p>
<p><strong>Key technique:</strong> The tapping finger should snap off the string (not lift gently) to create enough volume for the pull-off chain to work.</p>
<p><strong>Next:</strong> Move the pattern across strings. Then try tapping arpeggio patterns — this is how Eddie Van Halen revolutionised guitar.</p>`
        }
      ]
    }
  ]
};

// Register globally
window.DOING = DOING;
