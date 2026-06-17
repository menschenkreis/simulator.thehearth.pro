// ═══════════════════════════════════════════════════════
// LESSON: The Language of Guitar (Block 04 — Foundation)
// Interactive, character-driven, with gradient failsafe
// ═══════════════════════════════════════════════════════

window.LESSON_LANGUAGE_OF_GUITAR = {
  id: 'f-language-of-guitar',
  title: 'The Language of Guitar',
  completeText: '<p style="text-align:center"><strong>You know the 6 string names and the memory trick.</strong></p><p style="text-align:center">You know each fret is one half step. You know fret 12 is the octave — where the map repeats. You can find one note on every string.</p><p style="text-align:center;margin-top:16px;color:var(--gold)">Block 04 complete. You\'re ready for Block 05: The Tool.</p>',

  steps: [
    // ── OPENING ──
    {
      type: 'speak',
      char: TeachingCHAR.neutral,
      text: '<p>You know the 12 notes. You know intervals. Now let\'s see where they live on the guitar.</p><p>The guitar has <strong>6 strings</strong> and usually 19-24 frets. Each fret is one half step — just like you learned in Block 03.</p>',
    },

    // ── THE STRING NAMES ──
    {
      type: 'speak',
      char: TeachingCHAR.lightbulb,
      charSize: 'big',
      text: '<p>The strings, from thickest (closest to you) to thinnest (closest to the floor):</p><p><strong>E — A — D — G — B — E</strong></p><p>A trick to remember them: <em>"Eddie Ate Dynamite, Good Bye Eddie"</em></p><p>Each string is tuned to a specific note. When you play it "open" (without pressing any fret), that\'s its name.</p>',
    },

    // ── QUESTION 1: String names ──
    {
      type: 'ask',
      concept: 'string-names',
      char: TeachingCHAR.question,
      charSize: 'big',
      text: '<p>What are the 6 string names, from thickest to thinnest?</p>',
      choices: [
        {
          label: 'E A D G B E',
          correct: true,
          response: {
            char: TeachingCHAR.sparks,
            charSize: 'big',
            text: '<p>Nailed it. "Eddie Ate Dynamite, Good Bye Eddie."</p><p>Notice: the thinnest and thickest strings are both E — but different octaves. The high E is higher in pitch. The low E is lower. Same note, different versions.</p>'
          }
        },
        {
          label: 'E B G D A E',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>Close — you\'ve got the right notes, just reversed.</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>From thickest to thinnest: <strong>E A D G B E</strong>. Remember "Eddie Ate Dynamite, Good Bye Eddie." The thickest string (closest to you) is low E. The thinnest (closest to the floor) is high E.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>So what are the 6 string names, from thickest to thinnest?</p>' }
          ]
        }
      ]
    },

    // ── HOW FRETS WORK ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>Now let\'s see how the fretboard works.</p><p>Each string is tuned to a note. When you press a fret, you move up the musical alphabet — one fret = one half step.</p><p>The thickest string is E. First fret = F. Second fret = F#. Third fret = G. And so on.</p><p>The fretboard is a map. Every note has a location.</p>',
    },

    // ── QUESTION 2: Fret 1 on low E ──
    {
      type: 'ask',
      concept: 'fret-movement',
      char: TeachingCHAR.question,
      text: '<p>If the thickest string is E, what note is at fret 1?</p>',
      choices: [
        {
          label: 'F (one half step up from E)',
          correct: true,
          response: {
            char: TeachingCHAR.lightbulb,
            text: '<p>Yes! E → F is one half step — one fret. Remember from Block 03: E to F is one of the "short jumps" (no sharp between them). That\'s why fret 1 on the low E string is F, not E#.</p>'
          }
        },
        {
          label: 'E# (E sharp)',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>Almost — but remember the "short jumps" from Block 03?</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>E to F is one of the special pairs with no sharp between them. So fret 1 on the low E string is <strong>F</strong>, not E#. One half step up = one fret = F.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>So if the thickest string is E, what note is at fret 1?</p>' }
          ]
        }
      ]
    },

    // ── THE OCTAVE ──
    {
      type: 'speak',
      char: TeachingCHAR.lightbulb,
      text: '<p>Look at your guitar neck. Around the 12th fret, you\'ll see two dots. This is a special spot.</p><p>Fret 12 is the <strong>octave</strong> — the same note as the open string, but one octave higher. Higher in pitch, same name.</p><p>This means the fretboard repeats. Notes 1-11 are the "lower" version. Notes 12+ are the "higher" version. The pattern is the same — just shifted up.</p>',
    },

    // ── QUESTION 3: Octave ──
    {
      type: 'ask',
      concept: 'octave',
      char: TeachingCHAR.question,
      text: '<p>What happens at fret 12?</p>',
      choices: [
        {
          label: 'The same note as the open string, but one octave higher',
          correct: true,
          response: {
            char: TeachingCHAR.sparks,
            charSize: 'big',
            text: '<p>Exactly. The fretboard repeats at fret 12. This is why guitar is powerful: once you learn a pattern in one position, you can move it anywhere. The pattern stays the same — the starting note changes.</p>'
          }
        },
        {
          label: 'The note gets quieter',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>Not quite — the octave is about pitch, not volume.</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>Fret 12 is the <strong>octave</strong> — the same note as the open string, but one octave higher. "Octave" means "eight" (there are 8 notes in a scale from root to root). The fretboard pattern repeats at fret 12. Same shape, higher pitch.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>So what happens at fret 12?</p>' }
          ]
        }
      ]
    },

    // ── TREASURE HUNT ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>Your first fretboard treasure hunt. Find every E on the guitar:</p><p>• 6th string (thickest): open = E, fret 12 = E<br>• 5th string (A): fret 7 = E<br>• 4th string (D): fret 2 = E<br>• 3rd string (G): fret 9 = E<br>• 2nd string (B): fret 5 = E<br>• 1st string (thinnest): open = E, fret 12 = E</p><p>Play each one. Listen. They\'re all E — but different octaves.</p><p>You just found every E on the guitar. Tomorrow, find every A. Then D. Then G. One note per day.</p>',
    },

    // ── QUESTION 4: Finding notes ──
    {
      type: 'ask',
      concept: 'note-finding',
      char: TeachingCHAR.question,
      text: '<p>What\'s the best way to learn the fretboard?</p>',
      choices: [
        {
          label: 'One note per day — find it on every string',
          correct: true,
          response: {
            char: TeachingCHAR.sparks,
            charSize: 'big',
            text: '<p>That\'s the way. Don\'t try to memorise the whole fretboard at once — that\'s the steep gradient from Block 01. One note per day. Find every E. Then every A. Then every D. Within a week, you\'ll know the whole fretboard.</p>'
          }
        },
        {
          label: 'Memorise the entire fretboard chart at once',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>That\'s the steep gradient — trying to learn everything at once.</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>Remember Block 01: too steep a gradient blocks learning. Instead, break it down. One note per day. Find every E on every string. Then A. Then D. Within a week, you\'ll know the whole fretboard — and you\'ll actually remember it.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>So what\'s the best way to learn the fretboard?</p>' }
          ]
        }
      ]
    },

    // ── END ──
    {
      type: 'end',
      char: TeachingCHAR.sparks,
      charSize: 'big',
      buttonLabel: 'Complete Block 04 →',
      text: '<p style="text-align:center"><strong>You know the 6 string names and the memory trick.</strong></p><p style="text-align:center">You know each fret is one half step. You know fret 12 is the octave — where the map repeats. You can find one note on every string.</p><p style="text-align:center;margin-top:12px;color:var(--gold);font-family:Cinzel,serif">You speak the language of guitar — at least the first few words.</p>'
    }
  ]
};
