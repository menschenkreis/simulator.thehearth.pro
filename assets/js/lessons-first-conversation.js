// ═══════════════════════════════════════════════════════
// LESSON: First Conversation (Block 09 — Foundation)
// Interactive, character-driven, with gradient failsafe
// ═══════════════════════════════════════════════════════

window.LESSON_FIRST_CONVERSATION = {
  id: 'f-first-conversation',
  title: 'First Conversation',
  completeText: '<p style="text-align:center"><strong>You can make a clean note. You can move between notes.</strong></p><p style="text-align:center">You played your first musical sentence — call and response. Question → answer. Tension → resolution.</p><p style="text-align:center;margin-top:16px;font-family:Cinzel,serif;color:var(--gold);font-size:1rem">FOUNDATION COMPLETE</p><p style="text-align:center;font-size:0.85rem;color:var(--dim);margin-top:4px">Ten frets walked. The first neck path is behind you.<br>The Journey gate is open. Level 1 begins.</p>',

  steps: [
    // ── UNDERSTAND ──
    {
      type: 'speak',
      char: TeachingCHAR.neutral,
      text: '<p>A conversation has two parts: saying something, and hearing a response. Music works the same way.</p><p>You play a phrase — a short musical sentence. Then you hear how it sounds in the room. Then you respond to it.</p>'
    },
    {
      type: 'speak',
      char: TeachingCHAR.neutral,
      text: '<p>This is called <strong>call and response</strong>. It\'s the oldest form of music. It\'s how humans have been making music for thousands of years.</p>'
    },

    // ── EXPERIENCE ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>Play this simple call:</p><p>Open G string → Fret 2 on G string → Open G string</p><p>That\'s three notes: home, up a step, back home. A tiny question.</p>'
    },
    {
      type: 'ask',
      concept: 'call-feeling',
      char: TeachingCHAR.thinking,
      text: '<p>Now listen to how it hangs in the air. How does it feel?</p>',
      options: [
        { label: 'Unfinished, like waiting for something', correct: true, response: { char: TeachingCHAR.celebratory, text: '<p>Exactly. That\'s the "call." It feels like a question waiting for an answer. That tension is the beginning of musical conversation.</p>' }},
        { label: 'Complete, like it resolved', correct: false, response: { char: TeachingCHAR.encouraging, text: '<p>Listen again. The phrase returns to the same note it started on — but it feels like it\'s asking something. Like a question hanging in the air.</p>' }}
      ]
    },

    // ── APPLY ──
    {
      type: 'speak',
      char: TeachingCHAR.thinking,
      text: '<p>Now answer it. Play:</p><p>Open G string → Fret 4 on G string → Fret 2 on G string → Open G string</p><p>Four notes. A longer, more complete answer. It resolves. It feels finished.</p>'
    },
    {
      type: 'speak',
      char: TeachingCHAR.thinking,
      text: '<p>You just played your first musical sentence: <strong>call → response</strong>. Question → answer. Tension → resolution.</p><p>This is the pattern behind every song. Every riff. Every solo. It all starts here.</p>'
    },
    {
      type: 'ask',
      concept: 'call-response',
      char: TeachingCHAR.thinking,
      text: '<p>Play the call and response together. Does the response feel like an answer?</p>',
      options: [
        { label: 'Yes, it resolves the tension', correct: true, response: { char: TeachingCHAR.celebratory, text: '<p>You feel it. That\'s musical conversation. You just spoke your first sentence in the language of music.</p>' }},
        { label: 'I need to try again', correct: false, response: { char: TeachingCHAR.encouraging, text: '<p>Play the call first (3 notes). Pause. Then play the response (4 notes). Hear how the second phrase answers the first. Take your time.</p>' }}
      ]
    },

    // ── OWN ──
    {
      type: 'speak',
      char: TeachingCHAR.celebratory,
      text: '<p>You can make a clean note. You can move between notes. You can walk up and down a string. You played your first chord. You played your first musical sentence — call and response.</p>'
    },
    {
      type: 'speak',
      char: TeachingCHAR.celebratory,
      text: '<p>Ten frets. The full threshold. You\'ve walked the first neck path.</p><p style="margin-top:12px;padding:16px;background:rgba(212,175,105,0.08);border:2px solid var(--gold);border-radius:8px;text-align:center"><strong style="font-family:Cinzel,serif;color:var(--gold);font-size:1rem">FOUNDATION COMPLETE</strong><br><span style="font-size:0.8rem;color:var(--dim)">Ten frets walked. The Journey gate is open. Level 1 begins.</span></p>'
    }
  ]
};
