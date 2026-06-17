// ═══════════════════════════════════════════════════════
// LESSON: The Language of Music (Block 03 — Foundation)
// Interactive, character-driven, with gradient failsafe
// ═══════════════════════════════════════════════════════

window.LESSON_LANGUAGE_OF_MUSIC = {
  id: 'f-language-of-music',
  title: 'The Language of Music',
  completeText: '<p style="text-align:center"><strong>You know the 12 notes. You know the "short jumps."</strong></p><p style="text-align:center">You understand intervals — half steps and whole steps. You can feel the root — the home note.</p><p style="text-align:center;margin-top:16px;color:var(--gold)">Block 03 complete. You\'re ready for Block 04: The Language of Guitar.</p>',

  steps: [
    // ── OPENING ──
    {
      type: 'speak',
      char: TeachingCHAR.neutral,
      text: '<p>You know music is a language. Now let\'s learn the alphabet.</p><p>Here\'s something that might surprise you: <strong>every song ever written</strong> — every chord, every melody, every riff — is built from just 12 notes.</p>',
    },

    // ── QUESTION 1: How many notes? ──
    {
      type: 'ask',
      concept: 'twelve-notes',
      char: TeachingCHAR.thinking,
      charSize: 'big',
      text: '<p>How many notes are there in music?</p>',
      choices: [
        {
          label: '12',
          correct: true,
          response: {
            char: TeachingCHAR.encouraging,
            text: '<p>Yes! Just 12. That\'s the whole alphabet. Their names are:</p><p><strong>A  A#  B  C  C#  D  D#  E  F  F#  G  G#</strong></p><p>Then it loops back to A. The "#" means "sharp" — one half step higher.</p>'
          }
        },
        {
          label: '7 (A through G)',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>Close — those are the "natural" notes. But there\'s more.</p>' },
            { char: TeachingCHAR.encouraging, text: '<p>Between most of those natural notes, there\'s a sharp. A, A#, B, C, C#, D, D#, E, F, F#, G, G# — that\'s 12 total. The 7 natural notes plus 5 sharps give you the full alphabet.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>So how many notes are there in music?</p>' }
          ]
        }
      ]
    },

    // ── THE SHORT JUMPS ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>Now here\'s something important. Look at the notes:</p><p>A  A#  B  C  C#  D  D#  E  F  F#  G  G#</p><p>Notice: between <strong>B and C</strong>, there\'s no sharp. Between <strong>E and F</strong>, there\'s no sharp.</p><p>These are the "short jumps" — only one fret apart instead of two. Remember these. They show up everywhere.</p>',
    },

    // ── QUESTION 2: Short jumps ──
    {
      type: 'ask',
      concept: 'short-jumps',
      char: TeachingCHAR.thinking,
      text: '<p>Which pairs of notes are only one half step apart (no sharp between them)?</p>',
      choices: [
        {
          label: 'B to C, and E to F',
          correct: true,
          response: {
            char: TeachingCHAR.celebratory,
            charSize: 'big',
            text: '<p>Perfect. These two "short jumps" are the secret handshake of music. They show up in scales, in chord shapes, everywhere. Once you internalise them, the fretboard starts to make sense.</p>'
          }
        },
        {
          label: 'A to B, and D to E',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>Those are whole steps — there\'s a sharp between them.</p>' },
            { char: TeachingCHAR.encouraging, text: '<p>The short jumps — only one half step — are <strong>B to C</strong> and <strong>E to F</strong>. No sharp between them. One fret on the guitar, not two. These two pairs are special. Memorise them.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>Which pairs of notes are only one half step apart?</p>' }
          ]
        }
      ]
    },

    // ── INTERVALS ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>Now let\'s talk about <strong>intervals</strong> — the distances between notes. This is the grammar of music.</p><p><strong>Half step</strong> — the smallest distance. One fret. B to C is a half step.</p><p><strong>Whole step</strong> — two half steps. Two frets. A to B is a whole step.</p><p>These two intervals are the building blocks of everything. Scales are patterns of whole and half steps. Chords are specific intervals stacked together.</p>',
    },

    // ── QUESTION 3: Whole step ──
    {
      type: 'ask',
      concept: 'whole-step',
      char: TeachingCHAR.thinking,
      text: '<p>How many half steps make a whole step?</p>',
      choices: [
        {
          label: '2',
          correct: true,
          response: {
            char: TeachingCHAR.encouraging,
            text: '<p>Right. One whole step = two half steps = two frets on the guitar. Simple maths. But this simple thing is the foundation of every scale and chord you\'ll ever play.</p>'
          }
        },
        {
          label: '1',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>One half step is the smallest distance — one fret. A whole step is bigger.</p>' },
            { char: TeachingCHAR.encouraging, text: '<p>A whole step = <strong>two</strong> half steps = two frets. Think of it like this: a half step is one stair. A whole step is two stairs.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>How many half steps make a whole step?</p>' }
          ]
        }
      ]
    },

    // ── EXPERIENCE: Feel the intervals ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>Let\'s feel this. Pick up your guitar.</p><p>Play any note — any one. Now play the very next sound up — one half step higher. Hear how close they are?</p><p>Now skip a note — one whole step up. Hear the slightly bigger gap?</p><p>Half step: tight, tense, almost the same.<br>Whole step: more room, more relaxed.</p><p>This is how music breathes. Tension and release. Close and far. Half steps and whole steps.</p>',
    },

    // ── THE ROOT ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>One more concept before we wrap up: <strong>the root</strong>.</p><p>Play any note. Any one. Now play the same note again. Hear how it feels like "home"?</p><p>That "home" feeling is the root. It\'s the note everything else is measured from. This is the beginning of musical understanding — not theory on a page, but sounds in your ear.</p>',
    },

    // ── QUESTION 4: The root ──
    {
      type: 'ask',
      concept: 'root-note',
      char: TeachingCHAR.thinking,
      text: '<p>What is the "root" in music?</p>',
      choices: [
        {
          label: 'The home note — everything else is measured from it',
          correct: true,
          response: {
            char: TeachingCHAR.celebratory,
            charSize: 'big',
            text: '<p>Exactly. The root is home. When you play a chord and it feels "resolved" — that\'s because you\'ve arrived at the root. When a song feels "finished" — the root.</p><p>You don\'t need to memorise all the interval names yet. Just understand: music is built from distances between sounds, and those distances are measured in steps.</p>'
          }
        },
        {
          label: 'The first note of a scale',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>That\'s related — but the root is bigger than just scales.</p>' },
            { char: TeachingCHAR.encouraging, text: '<p>The root is the <em>home note</em> — the note everything else is measured from. It\'s the first note of a scale, yes, but it\'s also the foundation of a chord, the key of a song, the centre of gravity for all the other notes.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>So what is the "root" in music?</p>' }
          ]
        }
      ]
    },

    // ── END ──
    {
      type: 'end',
      char: TeachingCHAR.celebratory,
      charSize: 'big',
      buttonLabel: 'Complete Block 03 →',
      text: '<p style="text-align:center"><strong>You know the 12 notes.</strong></p><p style="text-align:center">You know the "short jumps" (B→C and E→F).</p><p style="text-align:center">You understand intervals — half steps and whole steps. You can feel the root — the home note.</p><p style="text-align:center;margin-top:12px;color:var(--gold);font-family:Cinzel,serif">This is the alphabet and basic grammar of music. Every scale, every chord, every melody is built from these pieces.</p>'
    }
  ]
};
