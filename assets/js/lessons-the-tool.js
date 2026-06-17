// ═══════════════════════════════════════════════════════
// LESSON: The Tool (Block 05 — Foundation)
// Interactive, character-driven, with gradient failsafe
// ═══════════════════════════════════════════════════════

window.LESSON_THE_TOOL = {
  id: 'f-the-tool',
  title: 'The Tool',
  completeText: '<p style="text-align:center"><strong>You can name the main parts of the guitar.</strong></p><p style="text-align:center">You know how to sit with it — supported, not clamped. Your thumb is behind the neck, fingers curved, wrist mostly straight. You can play one clean note with the rest stroke.</p><p style="text-align:center;margin-top:16px;color:var(--gold);font-family:Cinzel,serif">FOUNDATION COMPLETE</p><p style="text-align:center;font-size:0.85rem;color:var(--dim);margin-top:4px">Five layers. Each one builds on the last.<br>How to Learn → Language → Music → Guitar → The Tool</p><p style="text-align:center;font-size:0.85rem;color:var(--dim);margin-top:8px">You now have the foundation for everything that comes next.</p>',

  steps: [
    // ── OPENING ──
    {
      type: 'speak',
      char: TeachingCHAR.neutral,
      text: '<p>This is it — the last block of Foundation. You\'ve learned how to learn, what music is, the 12 notes, and the fretboard map.</p><p>Now it\'s time to touch the instrument.</p>',
    },

    // ── GUITAR PARTS ──
    {
      type: 'speak',
      char: TeachingCHAR.lightbulb,
      text: '<p>The guitar has three main sections:</p><p><strong>Headstock</strong> — the top part with the tuning pegs (knobs). Each peg controls one string.</p><p><strong>Neck</strong> — the long part. The front is the <em>fretboard</em>. The metal strips across it are <em>frets</em>.</p><p><strong>Body</strong> — the big part that makes the sound louder. On acoustic guitars, there\'s a round <em>sound hole</em>. On electric guitars, there are <em>pickups</em>.</p><p>Other parts: the <em>bridge</em> (where strings attach to the body), the <em>nut</em> (where strings rest at the top of the neck), and the <em>tuning pegs</em>.</p>',
    },

    // ── QUESTION 1: Guitar parts ──
    {
      type: 'ask',
      concept: 'guitar-parts',
      char: TeachingCHAR.question,
      charSize: 'big',
      text: '<p>What are the three main sections of the guitar?</p>',
      choices: [
        {
          label: 'Headstock, Neck, and Body',
          correct: true,
          response: {
            char: TeachingCHAR.sparks,
            charSize: 'big',
            text: '<p>Right. Every part has a purpose. Knowing the names helps you follow lessons and talk about guitar with other people. When someone says "check your tuning at the headstock" — you\'ll know exactly what they mean.</p>'
          }
        },
        {
          label: 'Strings, Frets, and Sound hole',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>Those are all parts — but they\'re details, not the main sections.</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>The three main sections are <strong>Headstock</strong> (top, with tuning pegs), <strong>Neck</strong> (long part, with fretboard and frets), and <strong>Body</strong> (the big part that amplifies the sound). Strings, frets, and sound hole are details within those sections.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>So what are the three main sections of the guitar?</p>' }
          ]
        }
      ]
    },

    // ── POSTURE ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>Now — how to sit with it. This matters more than you think.</p><p><strong>Sitting down:</strong></p><p>• Sit on the front edge of your chair<br>• Feet flat on the floor<br>• Guitar rests on your right leg (if right-handed)<br>• The neck points slightly up — not flat, not at the ceiling<br>• Your right arm rests gently over the body — its weight holds the guitar in place<br>• Your left hand holds the neck — thumb behind it, fingers curved, wrist mostly straight</p><p>The guitar should feel <strong>supported, not clamped</strong>. If you\'re squeezing, you\'re doing it wrong.</p>',
    },

    // ── QUESTION 2: Posture ──
    {
      type: 'ask',
      concept: 'posture',
      char: TeachingCHAR.question,
      text: '<p>How should the guitar feel when you hold it?</p>',
      choices: [
        {
          label: 'Supported, not clamped — like it\'s resting naturally',
          correct: true,
          response: {
            char: TeachingCHAR.lightbulb,
            text: '<p>Exactly. A trick: sit without the guitar. Put a pillow on your right leg. Rest your arm over it. Notice how your arm falls naturally? That\'s how it should feel on the guitar.</p><p>Tension is the enemy — remember Block 01? The same principle applies here. If your shoulders are up, your jaw is clenched, or you\'re holding your breath — stop. Reset. Start again.</p>'
          }
        },
        {
          label: 'Tightly — I need to grip it to keep it from falling',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>That\'s the instinct — but it leads to tension and pain.</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>The guitar should rest on your leg, supported by your right arm\'s weight. Your left hand holds the neck gently — thumb behind, fingers curved. If you\'re gripping hard, your hand will tire in minutes and your playing will suffer.</p><p>Supported, not clamped. That\'s the rule.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>How should the guitar feel when you hold it?</p>' }
          ]
        }
      ]
    },

    // ── THE REST STROKE ──
    {
      type: 'speak',
      char: TeachingCHAR.lightbulb,
      charSize: 'big',
      text: '<p>Now — your first sound. The <strong>rest stroke</strong>.</p><p>1. Put your right thumb on the thickest string (low E)<br>2. Push the string down toward the guitar body<br>3. Keep going until your thumb rests on the next string<br>4. Listen to the note ring out</p><p>That\'s it. One note. One clean, beautiful, ringing note.</p>',
    },

    // ── QUESTION 3: Rest stroke ──
    {
      type: 'ask',
      concept: 'rest-stroke',
      char: TeachingCHAR.question,
      text: '<p>What is a rest stroke?</p>',
      choices: [
        {
          label: 'Push the string down until your thumb rests on the next string',
          correct: true,
          response: {
            char: TeachingCHAR.sparks,
            charSize: 'big',
            text: '<p>Yes. The name tells you exactly what happens — your thumb <em>rests</em> on the next string after playing. This gives you a full, clear, powerful sound. It\'s the foundation of good right-hand technique.</p>'
          }
        },
        {
          label: 'Let the string ring without touching it',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>That\'s an open string — close, but the rest stroke is different.</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>In a rest stroke, you push the string down and <em>keep going</em> until your thumb lands on the next string. Your thumb "rests" there. This gives a full, round, powerful sound. It\'s the most important right-hand technique to learn first.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>So what is a rest stroke?</p>' }
          ]
        }
      ]
    },

    // ── PRACTISE ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>Play it 10 times. Each time, listen to the whole note — the start, the middle, and the end as it fades.</p><p>Try to make every note sound exactly the same. Same volume, same sound, same length.</p><p>This is your first sound. This is the beginning.</p>',
    },

    // ── QUESTION 4: What matters most ──
    {
      type: 'ask',
      concept: 'first-sound',
      char: TeachingCHAR.question,
      text: '<p>When playing one note 10 times, what matters most?</p>',
      choices: [
        {
          label: 'Making each note sound exactly the same — consistency',
          correct: true,
          response: {
            char: TeachingCHAR.sparks,
            charSize: 'big',
            text: '<p>That\'s the real skill. Not speed. Not complexity. <strong>Consistency.</strong> Can you make 10 notes that all sound identical? Same volume, same tone, same duration?</p><p>This is the beginning of everything. One clean note, repeated perfectly. From here, everything else is built.</p>'
          }
        },
        {
          label: 'Playing as fast as possible',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>Speed without consistency is the steep gradient in disguise.</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>The real skill is consistency. Can you make 10 notes that all sound identical? Same volume, same tone, same duration? Speed comes later — much later. Right now, one clean note is enough.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>When playing one note 10 times, what matters most?</p>' }
          ]
        }
      ]
    },

    // ── END ──
    {
      type: 'end',
      char: TeachingCHAR.sparks,
      charSize: 'big',
      buttonLabel: 'Foundation Complete →',
      text: '<p style="text-align:center"><strong>You can name the main parts of the guitar.</strong></p><p style="text-align:center">You know how to sit with it — supported, not clamped. Your thumb is behind the neck, fingers curved, wrist mostly straight.</p><p style="text-align:center">You can play one clean note with the rest stroke.</p><p style="text-align:center;margin-top:16px;font-family:Cinzel,serif;color:var(--gold);font-size:1rem">FOUNDATION COMPLETE</p><p style="text-align:center;font-size:0.85rem;color:var(--dim);margin-top:4px">Five layers. Each one builds on the last.<br>How to Learn → Language → Music → Guitar → The Tool</p><p style="text-align:center;font-size:0.85rem;color:var(--dim);margin-top:8px">You now have the foundation for everything that comes next.</p>'
    }
  ]
};
