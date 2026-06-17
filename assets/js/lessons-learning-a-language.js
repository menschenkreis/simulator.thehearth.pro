// ═══════════════════════════════════════════════════════
// LESSON: Learning a Language (Block 02 — Foundation)
// Interactive, character-driven, with gradient failsafe
// ═══════════════════════════════════════════════════════

window.LESSON_LEARNING_A_LANGUAGE = {
  id: 'f-learning-a-language',
  title: 'Learning a Language',
  completeText: '<p style="text-align:center"><strong>You understand that music has vocabulary, grammar, and conversation.</strong></p><p style="text-align:center">You know that listening comes before playing. You know to use the Dictionary when a word is unclear.</p><p style="text-align:center;margin-top:16px;color:var(--gold)">Block 02 complete. You\'re ready for Block 03: The Language of Music.</p>',

  steps: [
    // ── OPENING ──
    {
      type: 'speak',
      char: TeachingCHAR.neutral,
      text: '<p>You\'ve learned how to learn. Now let\'s talk about <em>what</em> you\'re learning.</p><p>Music is a language. That\'s not a metaphor — it\'s a fact. And once you see it that way, everything changes.</p>',
    },

    // ── QUESTION 1: Music as language ──
    {
      type: 'ask',
      concept: 'music-is-language',
      char: TeachingCHAR.question,
      charSize: 'big',
      text: '<p>When I say "music is a language," what do you think I mean?</p>',
      choices: [
        {
          label: 'It has words, rules, and you can have conversations with it',
          correct: true,
          response: {
            char: TeachingCHAR.lightbulb,
            text: '<p>Exactly. Music has <strong>vocabulary</strong> (notes), <strong>grammar</strong> (intervals, scales, chords), and <strong>conversation</strong> (playing). Just like any language. Let\'s break each one down.</p>'
          }
        },
        {
          label: 'It\'s just sounds that express feelings',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>That\'s part of it — but there\'s more structure than you might think.</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>Feelings are the <em>result</em> of music. But the building blocks are exactly like a language: notes are words, scales are grammar, and playing is conversation. Let me show you.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>So when I say "music is a language," what do I mean?</p>' }
          ]
        }
      ]
    },

    // ── CARDS: Vocabulary, Grammar, Conversation ──
    {
      type: 'cards',
      char: TeachingCHAR.lightbulb,
      charLabel: 'Music = Language',
      text: '<p>Every language has three parts. Music has the same three.</p>',
      cards: [
        {
          icon: '📝',
          title: 'Vocabulary',
          desc: 'In language: words. In music: notes. Each note is a sound with a name.',
          color: '#e74c3c'
        },
        {
          icon: '📐',
          title: 'Grammar',
          desc: 'In language: rules that connect words. In music: intervals, scales, chords.',
          color: '#e67e22'
        },
        {
          icon: '💬',
          title: 'Conversation',
          desc: 'In language: speaking. In music: playing. Using vocabulary and grammar to communicate.',
          color: '#2ecc71'
        }
      ],
      continueLabel: 'Tell me more →'
    },

    // ── VOCABULARY DEEP DIVE ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p><strong>Vocabulary = Notes</strong></p><p>Each note is a sound with a name. A, B, C, D, E, F, G — just like the letters of the alphabet, but you hear them instead of read them.</p><p>In language, you learn "cat" and "dog" before you learn "photosynthesis." In music, you learn A and B before you learn "diminished seventh."</p>',
    },

    // ── QUESTION 2: Learning order ──
    {
      type: 'ask',
      concept: 'learning-order',
      char: TeachingCHAR.question,
      text: '<p>Which comes first in language learning?</p>',
      choices: [
        {
          label: 'Speaking before writing',
          correct: true,
          response: {
            char: TeachingCHAR.sparks,
            charSize: 'big',
            text: '<p>Yes! Babies listen for months before they speak. They speak before they write. Music follows the same path.</p><p>That\'s why this simulator starts with <em>listening</em> and <em>playing</em> — not reading sheet music. You learn to speak the language before you learn to write it.</p>'
          }
        },
        {
          label: 'Writing before speaking',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>That\'s how school teaches it — but it\'s backwards.</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>Think about how you learned your first language. Did your parents hand you a grammar book? No. They talked to you. You listened. Then you spoke. Writing came years later.</p><p>Music works the same way. Listen first. Play next. Read music later.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>So which comes first in language learning?</p>' }
          ]
        }
      ]
    },

    // ── THE MISUNDERSTOOD WORD ──
    {
      type: 'speak',
      char: TeachingCHAR.exclamation,
      charSize: 'big',
      text: '<p>Remember Block 01? <strong>The Misunderstood Word</strong> — the #1 barrier to learning?</p><p>In language learning, this is the #1 killer. If you\'re learning French and you don\'t know what a "verb" is, every grammar lesson after that is gibberish.</p>',
    },

    // ── QUESTION 3: Misunderstood word in music ──
    {
      type: 'ask',
      concept: 'misunderstood-word-music',
      char: TeachingCHAR.question,
      text: '<p>If someone says "play a major third" and you don\'t know what those words mean, what should you do?</p>',
      choices: [
        {
          label: 'Stop and look it up in the Dictionary',
          correct: true,
          response: {
            char: TeachingCHAR.sparks,
            charSize: 'big',
            text: '<p>That\'s the move. This simulator has a <strong>Dictionary</strong> in the toolbar. Every term, one click away.</p><p>If you hit a word you don\'t know — stop. Look it up. Clear it. Then continue. This isn\'t slow. This is the <em>fastest</em> way to learn.</p>'
          }
        },
        {
          label: 'Keep going and hope it makes sense later',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>That\'s what most people do. And it\'s exactly why they stall.</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>If your guess is wrong — even slightly — every concept built on that word is now crooked. It\'s like building a house on a cracked foundation.</p><p>The safe move: if there\'s ANY doubt, look it up. One click. The Dictionary is right there.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>So if someone says "play a major third" and you don\'t know what those words mean, what should you do?</p>' }
          ]
        }
      ]
    },

    // ── LISTENING EXERCISE ──
    {
      type: 'speak',
      char: TeachingCHAR.lightbulb,
      text: '<p>Before you play a single note, just listen.</p><p>Put on any piece of music — anything you like. Close your eyes. Don\'t try to analyse it. Just notice:</p><p>• Does it feel happy or sad?<br>• Fast or slow?<br>Smooth or bumpy?<br>Settled or restless?</p><p>You\'re not looking for right answers. You\'re training your ears to notice. Your ears are learning the language right now.</p>',
    },

    // ── QUESTION 4: What are you training? ──
    {
      type: 'ask',
      concept: 'training-ears',
      char: TeachingCHAR.question,
      text: '<p>When you listen to music without trying to analyse it, what are you actually training?</p>',
      choices: [
        {
          label: 'My ears — to notice patterns and feeling',
          correct: true,
          response: {
            char: TeachingCHAR.lightbulb,
            text: '<p>Yes. Your ears are your most important musical tool. Before your fingers learn to play, your ears learn to hear. This is the foundation of everything.</p><p>A musician who can\'t hear can\'t play. A musician who <em>can</em> hear will always find a way to play.</p>'
          }
        },
        {
          label: 'Nothing — it\'s just passive listening',
          correct: false,
          reexplain: [
            { char: TeachingCHAR.encouraging, text: '<p>It looks passive, but it\'s the opposite.</p>' },
            { char: TeachingCHAR.lightbulb, text: '<p>When you listen with intention — even without analysing — your brain is mapping sounds to feelings. Happy. Sad. Tense. Resolved. This mapping is the foundation of musical understanding. You\'re training your ears right now.</p>' },
            { char: TeachingCHAR.neutral, text: '<p>So when you listen to music without trying to analyse it, what are you actually training?</p>' }
          ]
        }
      ]
    },

    // ── END ──
    {
      type: 'end',
      char: TeachingCHAR.sparks,
      charSize: 'big',
      buttonLabel: 'Complete Block 02 →',
      text: '<p style="text-align:center"><strong>You understand the shape of what you\'re learning.</strong></p><p style="text-align:center">Music has vocabulary (notes), grammar (intervals, scales, chords), and conversation (playing).</p><p style="text-align:center">You know that listening comes before playing — just like speaking comes before writing.</p><p style="text-align:center;margin-top:12px;color:var(--gold);font-family:Cinzel,serif">You know the shape. Now let\'s fill in the details.</p>'
    }
  ]
};
