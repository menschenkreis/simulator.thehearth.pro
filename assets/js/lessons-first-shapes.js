// ═══════════════════════════════════════════════════════
// LESSON: First Shapes (Block 08 — Foundation)
// Interactive, character-driven, with gradient failsafe
// ═══════════════════════════════════════════════════════

window.LESSON_FIRST_SHAPES = {
  id: 'f-first-shapes',
  title: 'First Shapes',
  completeText: '<p style="text-align:center"><strong>You can walk up and down a string.</strong></p><p style="text-align:center">You just played your first chord. Both hands working together — right hand creating sound, left hand changing pitch.</p><p style="text-align:center;margin-top:16px;font-family:Cinzel,serif;color:var(--gold);font-size:1rem">FOUNDATION COMPLETE — BLOCK 08</p><p style="text-align:center;font-size:0.85rem;color:var(--dim);margin-top:4px">From single notes to chords. The doorway opens.</p>',

  steps: [
    // ── UNDERSTAND ──
    {
      type: 'speak',
      char: TeachingCHAR.neutral,
      text: '<p>You can make a clean note. Good. But music isn\'t one note — it\'s notes <em>moving</em>.</p><p>The moment you play one note, then another, you\'ve created an <strong>interval</strong>. This is the DNA of melody.</p>'
    },
    {
      type: 'speak',
      char: TeachingCHAR.neutral,
      text: '<p>The real skill isn\'t playing one note cleanly. It\'s moving from one note to the next <em>cleanly</em>.</p>'
    },

    // ── EXPERIENCE ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>Same string, one fret at a time:</p><p>Open → Fret 1 → Fret 2 → Fret 3 → Fret 4</p><p>Right hand picks each note. Left hand frets each one. One at a time. Slow and clean.</p>'
    },
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>Now walk back down: Fret 4 → Fret 3 → Fret 2 → Fret 1 → Open</p><p>This is the fundamental movement of guitar — <strong>fingers moving along a string</strong>. Every scale, every riff, every melody is built from this.</p>'
    },
    {
      type: 'ask',
      concept: 'string-walking',
      char: TeachingCHAR.thinking,
      text: '<p>Did the notes stay clean as you moved between frets?</p>',
      options: [
        { label: 'Yes, clean and connected', correct: true, response: { char: TeachingCHAR.celebratory, text: '<p>Good. That clean movement is the foundation of everything — scales, riffs, melodies. You\'re building the right habit now.</p>' }},
        { label: 'Some buzzed or were muted', correct: false, response: { char: TeachingCHAR.encouraging, text: '<p>Check your fretting finger — it should be right behind the fret wire, not on top of it. And press just enough to make the note ring. Try again slowly.</p>' }}
      ]
    },

    // ── APPLY ──
    {
      type: 'speak',
      char: TeachingCHAR.thinking,
      text: '<p>An <strong>E major chord</strong> uses all six strings. It\'s the first chord most guitarists learn.</p><p style="font-family:var(--mono);color:var(--gold);font-size:0.8rem;line-height:1.8;text-align:center">e|---0---<br>B|---0---<br>G|---1---  (index, fret 1)<br>D|---2---  (middle, fret 2)<br>A|---2---  (ring, fret 2)<br>E|---0---</p>'
    },
    {
      type: 'speak',
      char: TeachingCHAR.thinking,
      text: '<p><strong>Step by step:</strong></p><p>1. Index finger on fret 1 of the G string (3rd string).<br>2. Middle finger on fret 2 of the D string (4th string).<br>3. Ring finger on fret 2 of the A string (5th string).<br>4. Strum all six strings with your thumb.</p>'
    },
    {
      type: 'ask',
      concept: 'e-major-chord',
      char: TeachingCHAR.thinking,
      text: '<p>Does it ring? All six strings?</p>',
      options: [
        { label: 'Yes, all six ring clean', correct: true, response: { char: TeachingCHAR.celebratory, text: '<p>That sound — that\'s a chord. That\'s music. You just went from single notes to harmony. This is a huge step.</p>' }},
        { label: 'Some strings are muted or buzzing', correct: false, response: { char: TeachingCHAR.encouraging, text: '<p>Make sure your fingers are arched — fingertips pressing down, not the flat of your finger touching strings below. Adjust one finger at a time. Try again.</p>' }}
      ]
    },

    // ── OWN ──
    {
      type: 'speak',
      char: TeachingCHAR.celebratory,
      text: '<p>You can walk up and down a string. You just played your first chord. Both hands working together — right hand creating sound, left hand changing pitch.</p><p>You went from single notes to harmony. The doorway is open.</p>'
    }
  ]
};
