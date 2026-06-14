// ═══════════════════════════════════════════════════════
// LESSON: How to Learn (Block 01 — Foundation)
// Interactive, character-driven, with gradient failsafe
// ═══════════════════════════════════════════════════════

window.LESSON_HOW_TO_LEARN = {
  id: 'f-how-to-learn',
  title: 'How to Learn',
  completeText: '<p style="text-align:center"><strong>You now know the three barriers to learning.</strong></p><p>These aren\'t nice ideas — they\'re tools you\'ll use every time you practise. When you hit a wall later, come back here. The barrier will be one of these three.</p><p style="text-align:center;margin-top:16px;color:var(--gold)">Block 01 complete. You\'re ready for Block 02: Learning a Language.</p>',

  steps: [
    // ── OPENING ──
    {
      type: 'speak',
      char: TeachingCHAR.neutral,
      text: '<p>Welcome. I\'m going to teach you something most people never learn.</p><p>Not a chord. Not a scale. Something more important than both.</p>',
    },
    {
      type: 'speak',
      char: TeachingCHAR.neutral,
      text: '<p>But first — a question.</p>',
    },

    // ── QUESTION 1: Is learning a skill? ──
    {
      type: 'ask',
      concept: 'learning-is-skill',
      char: TeachingCHAR.question,
      charSize: 'big',
      text: '<p>Did you know that <strong>learning itself is a skill</strong>?</p><p>Not talent. Not genetics. A skill — like riding a bike or cooking a meal.</p>',
      choices: [
        {
          label: 'Yes, I knew that',
          correct: true,
          response: {
            char: TeachingCHAR.lightbulb,
            text: '<p>Good. Then you already know the most important thing. Most people think some are "naturals" and others aren\'t. That\'s a myth. Let me show you what blocks people — and how to get past it.</p>'
          }
        },
        {
          label: 'No, really?',
          correct: true,  // Both are "correct" — this is a knowledge question, not a test
          response: {
            char: TeachingCHAR.lightbulb,
            text: '<p>Most people don\'t. They think musical talent is something you\'re born with. But learning follows rules — and once you know the rules, you can learn anything. Let me show you the three things that block learning.</p>'
          }
        }
      ],
      // If somehow they pick something else (future-proofing)
      reexplain: [
        { char: TeachingCHAR.encouraging, text: '<p>That\'s an interesting thought, but let me clarify.</p>' },
        { char: TeachingCHAR.lightbulb, text: '<p>Learning isn\'t magic. It\'s a process — and like any process, it has rules. Follow the rules, you learn. Break them, you stall. Simple as that.</p>' }
      ]
    },

    // ── THE THREE BARRIERS ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      charSize: 'big',
      text: '<p>There are <strong>three things</strong> that block learning. Not 10. Not 50. Three.</p><p>Understand these, and you\'ll know why 90% of people quit guitar — and why you won\'t.</p>',
    },

    // ── CARDS: Three barriers ──
    {
      type: 'cards',
      char: TeachingCHAR.lightbulb,
      charLabel: 'The Three Barriers',
      text: '<p>These are the three things that block learning. Click each one to understand it.</p>',
      cards: [
        {
          icon: '📭',
          title: 'Absence of Mass',
          desc: 'Trying to learn without the physical thing. You can\'t learn guitar from a book alone.',
          color: '#e74c3c'
        },
        {
          icon: '⏭️',
          title: 'Too Steep a Gradient',
          desc: 'Jumping ahead too fast. Trying chords before you can fret a single note cleanly.',
          color: '#e67e22'
        },
        {
          icon: '❓',
          title: 'The Misunderstood Word',
          desc: 'One word you don\'t understand blanks everything after it. The #1 killer.',
          color: '#9b59b6'
        }
      ],
      continueLabel: 'Tell me more about each one →'
    },

    // ── DEEP DIVE: Absence of Mass ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p><strong>Barrier 1: Absence of Mass</strong></p><p>This means trying to understand something without the real, physical thing in front of you.</p><p>Imagine trying to learn swimming from a textbook. You can read every chapter, memorise every technique — but until you\'re in the water, your body doesn\'t know what to do.</p>',
    },
    {
      type: 'ask',
      concept: 'absence-of-mass',
      char: TeachingCHAR.question,
      text: '<p>So what does this mean for learning guitar?</p>',
      choices: [
        {
          label: 'I need to actually hold and play the guitar',
          correct: true,
          response: {
            char: TeachingCHAR.sparks,
            charSize: 'big',
            text: '<p>Exactly! You can watch videos, read chord charts, study theory — but at some point, your hands need to touch the strings. The simulator will always push you toward the physical act.</p>'
          }
        },
        {
          label: 'I should study more theory first',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>I understand the instinct — but that\'s actually the trap.</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>More theory without practice is like reading about swimming without getting in the pool. The "mass" — the physical thing — is the guitar itself. You learn by doing, not by studying more.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>So what does this mean for learning guitar? Try again.</p>' }
          ]
        }
      ]
    },

    // ── DEEP DIVE: Too Steep a Gradient ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p><strong>Barrier 2: Too Steep a Gradient</strong></p><p>This means jumping ahead too fast. Trying to run before you can walk.</p><p>Picture this: you\'ve never held a guitar. Someone says "play a B minor barre chord." Your hand hurts, nothing rings out, and you think <em>"I\'m not talented enough."</em></p><p>Wrong. You just skipped steps.</p>',
    },
    {
      type: 'ask',
      concept: 'steep-gradient',
      char: TeachingCHAR.question,
      text: '<p>What\'s the fix for a gradient that\'s too steep?</p>',
      choices: [
        {
          label: 'Go slower — break it into smaller steps',
          correct: true,
          response: {
            char: TeachingCHAR.sparks,
            charSize: 'big',
            text: '<p>Yes! This is why the simulator breaks everything into small, manageable pieces. One note before one chord. One chord before one song. The gradient stays gentle — and you actually learn.</p>'
          }
        },
        {
          label: 'Try harder and push through',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>That\'s the本能 (instinct) — but it\'s the wrong one here.</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>Pushing through a steep gradient is how people hurt their hands and quit. The fix isn\'t more effort — it\'s smaller steps. Break it down. One finger, one string, one note at a time.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>So what\'s the fix for a gradient that\'s too steep?</p>' }
          ]
        }
      ]
    },

    // ── DEEP DIVE: The Misunderstood Word ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p><strong>Barrier 3: The Misunderstood Word</strong></p><p>This is the most dangerous one. And almost nobody knows about it.</p><p>Here\'s how it works: someone uses a word you don\'t fully understand. Maybe it\'s "fret." Maybe it\'s "interval." Maybe it\'s "major."</p><p>You nod. You keep going. But from that moment on, everything is fog.</p>',
    },
    {
      type: 'ask',
      concept: 'misunderstood-word',
      char: TeachingCHAR.question,
      text: '<p>What happens after you hit a word you don\'t understand?</p>',
      choices: [
        {
          label: 'Everything after it becomes unclear',
          correct: true,
          response: {
            char: TeachingCHAR.exclamation,
            text: '<p><strong>This is the #1 reason people quit.</strong></p><p>Not because guitar is hard. Because one word was undefined, and everything after it was fog. They feel stupid. They lose interest. They quit. And they never knew why.</p><p>That\'s why this simulator has a <strong>Dictionary</strong> in the toolbar. Every term, one click away. If you hit a word you don\'t know — stop. Look it up. Clear it. Then continue.</p>'
          }
        },
        {
          label: 'I can probably figure it out from context',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>That\'s what most people think. And sometimes you\'re right. But here\'s the danger:</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>If your guess is wrong — even slightly — every concept built on that word is now crooked. It\'s like building a house on a cracked foundation. Looks fine at first. Falls apart later.</p>' },
            { char: TeachingCHAR.exclamation, text: '<p>The safe move: if there\'s ANY doubt, look it up. One click. The Dictionary is right there. It\'s not slow — it\'s the fastest way to learn.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>So what happens after you hit a word you don\'t understand?</p>' }
          ]
        }
      ]
    },

    // ── VIDEO MOMENT: Putting it together ──
    {
      type: 'video',
      char: TeachingCHAR.lightbulb,
      charLabel: 'Watch this',
      text: '<p>Here\'s a quick summary of the three barriers in action.</p>',
      videoUrl: '',  // To be filled
      videoDesc: 'A short visual showing the three barriers: absence of mass (reading about guitar vs playing), steep gradient (barre chords on day 1), misunderstood word (confusion cascading)'
    },

    // ── APPLICATION: Tension ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>Now — one more thing before we wrap up.</p><p>Your body learns before your mind does. When you practise, your fingers build muscle memory. But they learn whatever you teach them. Fast and sloppy, or slow and clean.</p>',
    },
    {
      type: 'speak',
      char: TeachingCHAR.lightbulb,
      text: '<p>Here\'s a trick. Pick up your guitar. Now scan your body:</p><p>• Is your shoulder up by your ear? Let it drop.<br>• Is your jaw clenched? Open your mouth, then relax.<br>• Is your thumb pressing hard? Ease up.<br>• Are you holding your breath? Breathe.</p><p><strong>Tension is the enemy of learning.</strong> Do this every time you pick up the guitar. It takes 30 seconds. It changes everything.</p>',
    },

    // ── QUESTION: Imagination ──
    {
      type: 'ask',
      concept: 'imagination',
      char: TeachingCHAR.question,
      charSize: 'big',
      text: '<p>Before you play — what should you do first?</p>',
      choices: [
        {
          label: 'Imagine the sound clearly in my mind',
          correct: true,
          response: {
            char: TeachingCHAR.sparks,
            charSize: 'big',
            text: '<p>The superpower isn\'t talent. It\'s <strong>imagination</strong>.</p><p>See the fingers pressing the string. Feel it. Hear the note ring out. The clearer the picture in your mind, the cleaner the movement in your hands.</p><p>Your brain is the boss. Your fingers are the workers.</p>'
          }
        },
        {
          label: 'Just start playing as fast as possible',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>Speed without clarity is the steep gradient in disguise.</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>The real superpower is imagination. Before your hands move — SEE the note. FEEL the string. HEAR the sound. The clearer the picture in your mind, the cleaner your fingers will play.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>Before you play — what should you do first?</p>' }
          ]
        }
      ]
    },

    // ── END ──
    {
      type: 'end',
      char: TeachingCHAR.sparks,
      charSize: 'big',
      buttonLabel: 'Complete Block 01 →',
      text: '<p style="text-align:center"><strong>You now know the three barriers to learning.</strong></p><p style="text-align:center">Absence of Mass. Too Steep a Gradient. The Misunderstood Word.</p><p style="text-align:center">You know imagination comes before movement. You know how to find and release tension.</p><p style="text-align:center;margin-top:12px;color:var(--gold);font-family:Cinzel,serif">These are tools you\'ll use every time you practise.</p><p style="text-align:center;font-size:0.85rem;color:var(--dim);margin-top:8px">When you hit a wall later, come back here. The barrier will be one of these three.</p>'
    }
  ]
};
