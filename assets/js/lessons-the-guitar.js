// ═══════════════════════════════════════════════════════
// LESSON: The Guitar (Block 05 — Foundation)
// ═══════════════════════════════════════════════════════

window.LESSON_THE_GUITAR = {
  id: 'f-the-guitar',
  title: 'The Guitar',
  completeText: '<p style="text-align:center"><strong>You can name the main parts of the guitar.</strong></p><p style="text-align:center">You know what the headstock, neck, and body do. You know how to sit with it — supported, not clamped.</p><p style="text-align:center;margin-top:16px;color:var(--gold)">Block 05 complete. You\'re ready for Block 06: Speaking with the Guitar.</p>',

  steps: [
    {
      type: 'speak',
      char: TeachingCHAR.neutral,
      text: '<p>You know the fretboard map. You know the 12 notes and the string names. Now let\'s meet the instrument itself.</p>'
    },
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>The guitar has three main sections:</p><p><strong>Headstock</strong> — the top part with the tuning pegs. Each peg controls one string. Turn it to tighten (higher pitch) or loosen (lower pitch).</p><p><strong>Neck</strong> — the long part. The front is the <em>fretboard</em>. The metal strips are <em>frets</em>. The dots are <em>position markers</em>.</p><p><strong>Body</strong> — the big part that makes the sound louder. Sound hole on acoustics, pickups on electrics.</p>'
    },
    {
      type: 'ask',
      concept: 'guitar-sections',
      char: TeachingCHAR.thinking,
      text: '<p>What are the three main sections of the guitar?</p>',
      choices: [
        {
          label: 'Headstock, Neck, and Body',
          correct: true,
          response: {
            char: TeachingCHAR.celebratory,
            text: '<p>Right. Every part has a purpose. The bridge anchors the strings. The nut guides them. The truss rod keeps the neck straight. Knowing the names means you can follow any lesson and talk to other players.</p>'
          }
        },
        {
          label: 'Strings, Frets, and Sound hole',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>Those are all parts — but they\'re details within the three main sections.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>The three main sections are <strong>Headstock</strong> (top, tuning pegs), <strong>Neck</strong> (long part, fretboard), and <strong>Body</strong> (the big resonant part). Strings, frets, and sound hole live inside those sections.</p>' },
            { char: TeachingCHAR.thinking, text: '<p>So what are the three main sections?</p>' }
          ]
        }
      ]
    },
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>Before you play it, just listen.</p><p>Tap the body gently. Hear the resonance? That\'s the wood vibrating. The body takes a tiny string vibration and fills a room with sound.</p><p>Now strum across all the strings with your thumb. Hear that? That\'s the guitar speaking. Every guitar sounds different — wood, shape, strings all shape the tone.</p>'
    },
    {
      type: 'speak',
      char: TeachingCHAR.neutral,
      text: '<p>Now — how to sit with it. This matters more than you think.</p><p>• Sit on the front edge of your chair<br>• Feet flat on the floor<br>• Guitar rests on your right leg<br>• Neck points slightly up<br>• Right arm rests gently over the body<br>• Left hand holds the neck — thumb behind, fingers curved</p><p>The guitar should feel <strong>supported, not clamped</strong>.</p>'
    },
    {
      type: 'ask',
      concept: 'posture',
      char: TeachingCHAR.thinking,
      text: '<p>How should the guitar feel when you hold it?</p>',
      choices: [
        {
          label: 'Supported, not clamped — resting naturally',
          correct: true,
          response: {
            char: TeachingCHAR.celebratory,
            text: '<p>Exactly. A trick: sit without the guitar. Put a pillow on your leg. Rest your arm over it. See how your arm falls naturally? That\'s the feeling. Tension is the enemy — remember Block 01.</p>'
          }
        },
        {
          label: 'Tightly — I need to grip it so it doesn\'t fall',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>That instinct leads to tension and pain.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>The guitar rests on your leg, held by your right arm\'s weight. Left hand holds the neck gently. If you\'re gripping hard, your hand tires in minutes. Supported, not clamped.</p>' },
            { char: TeachingCHAR.thinking, text: '<p>How should the guitar feel?</p>' }
          ]
        }
      ]
    },
    {
      type: 'end',
      char: TeachingCHAR.celebratory,
      charSize: 'big',
      buttonLabel: 'Complete Block 05 →',
      text: '<p style="text-align:center"><strong>You know the instrument.</strong></p><p style="text-align:center">Headstock, neck, body. How to sit with it. How it sounds and feels.</p><p style="text-align:center;margin-top:12px;color:var(--gold);font-family:Cinzel,serif">Now it\'s time to learn how to make it speak.</p>'
    }
  ]
};
