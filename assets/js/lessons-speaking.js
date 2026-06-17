// ═══════════════════════════════════════════════════════
// LESSON: Speaking with the Guitar (Block 06 — Foundation)
// ═══════════════════════════════════════════════════════

window.LESSON_SPEAKING = {
  id: 'f-speaking',
  title: 'Speaking with the Guitar',
  completeText: '<p style="text-align:center"><strong>You know the two strokes and how to fret a note.</strong></p><p style="text-align:center">You can make the guitar speak — one clean note at a time.</p><p style="text-align:center;margin-top:16px;color:var(--gold)">Block 06 complete. You\'re ready for Block 07: Guitar Conversations.</p>',

  steps: [
    {
      type: 'speak',
      char: TeachingCHAR.neutral,
      text: '<p>You know the instrument. Now let\'s learn how to make it speak.</p><p>Guitar is unique: your two hands do completely different things at the same time. That\'s what makes it hard — and what makes it powerful.</p>'
    },
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      charSize: 'big',
      text: '<p><strong>Right hand</strong> (picking hand): creates the sound. Plucks, picks, or strums. Without it — silence.</p><p><strong>Left hand</strong> (fretting hand): changes the pitch. Presses strings against frets. Without it — only open strings.</p><p>Neither hand alone makes music. They must work <em>together</em>.</p>'
    },
    {
      type: 'ask',
      concept: 'hand-jobs',
      char: TeachingCHAR.thinking,
      text: '<p>What does each hand do?</p>',
      choices: [
        {
          label: 'Right hand creates sound, left hand changes pitch',
          correct: true,
          response: {
            char: TeachingCHAR.celebratory,
            charSize: 'big',
            text: '<p>That\'s the fundamental division. Every technique on guitar is some variation of these two jobs. Let\'s start with the right hand.</p>'
          }
        },
        {
          label: 'Both hands create sound together',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>They work together — but they have different jobs.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>The <strong>right hand</strong> creates the sound by plucking strings. The <strong>left hand</strong> changes the pitch by fretting. Right = sound. Left = pitch. Two jobs, two hands.</p>' },
            { char: TeachingCHAR.thinking, text: '<p>So what does each hand do?</p>' }
          ]
        }
      ]
    },
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>Your right hand has two basic strokes:</p><p><strong>Rest stroke</strong> — push the string down until your finger rests on the next string. <em>Full, round, powerful.</em> Best for notes that need to stand out.</p><p><strong>Free stroke</strong> — pluck and let your finger come back up into the air. <em>Lighter, more open.</em> Best for faster passages and multiple strings.</p><p>Try both on the same string. Hear the difference?</p>'
    },
    {
      type: 'ask',
      concept: 'stroke-types',
      char: TeachingCHAR.thinking,
      text: '<p>When would you use a rest stroke?</p>',
      choices: [
        {
          label: 'When I want a note to stand out — bold and powerful',
          correct: true,
          response: {
            char: TeachingCHAR.celebratory,
            text: '<p>Yes. Rest stroke = emphasis. Free stroke = flow. You\'ll use both constantly. Now let\'s add the left hand.</p>'
          }
        },
        {
          label: 'When playing fast passages',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>Fast passages usually use free strokes — they\'re lighter and quicker.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>Rest stroke is for <strong>emphasis</strong> — when you want a note to ring out bold and full. Free stroke is for speed and flow. Rest = power. Free = lightness.</p>' },
            { char: TeachingCHAR.thinking, text: '<p>So when would you use a rest stroke?</p>' }
          ]
        }
      ]
    },
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>Now your left hand joins in. Pick a string — any string, open. Now press down on <strong>fret 1</strong> with your index finger.</p><p>Where? <strong>Right behind the fret wire</strong> — not on top, not in the middle. Just behind it.</p><p>How hard? Just enough to make the note ring clean. If it buzzes, press harder. If your finger hurts, press lighter. The sweet spot is surprisingly gentle.</p>'
    },
    {
      type: 'ask',
      concept: 'fretting',
      char: TeachingCHAR.thinking,
      text: '<p>Where should your finger press the string?</p>',
      choices: [
        {
          label: 'Right behind the fret wire',
          correct: true,
          response: {
            char: TeachingCHAR.celebratory,
            charSize: 'big',
            text: '<p>Exactly. Too far from the fret wire = buzzing. On top of it = muted. Just behind = clean and ringing. Now pick the string again. Hear the new note? You just changed the pitch. That\'s fretting.</p>'
          }
        },
        {
          label: 'In the middle of the fret',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>That\'s where most people press — but it\'s not ideal.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>The middle of the fret requires more pressure and is more likely to buzz. <strong>Right behind the fret wire</strong> needs less pressure and gives a cleaner sound. It\'s the sweet spot.</p>' },
            { char: TeachingCHAR.thinking, text: '<p>Where should your finger press the string?</p>' }
          ]
        }
      ]
    },
    {
      type: 'speak',
      char: TeachingCHAR.lightbulb,
      text: '<p>Play fret 1, then lift your finger and play open. Fret 1, open. Hear the difference?</p><p>That\'s the <strong>half step</strong> from Block 03 — now in your hands. Theory you can feel.</p>'
    },
    {
      type: 'end',
      char: TeachingCHAR.celebratory,
      charSize: 'big',
      buttonLabel: 'Complete Block 06 →',
      text: '<p style="text-align:center"><strong>You know the two strokes and how to fret a note.</strong></p><p style="text-align:center">Rest stroke for power. Free stroke for lightness. Fret behind the wire. Press just enough.</p><p style="text-align:center;margin-top:12px;color:var(--gold);font-family:Cinzel,serif">You can make the guitar speak. Now let\'s have a conversation.</p>'
    }
  ]
};
