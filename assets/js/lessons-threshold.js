// ═══════════════════════════════════════════════════════
// LESSON: The Threshold (Block 00 — Foundation)
// Interactive, character-driven, with gradient failsafe
// ═══════════════════════════════════════════════════════

window.LESSON_THRESHOLD = {
  id: 'f-threshold',
  title: 'The Threshold',
  completeText: '<p style="text-align:center"><strong>You know the map, the guide, and the path.</strong></p><p style="text-align:center">The ten frets stretch ahead. The Journey gate waits at the end.</p><p style="text-align:center;margin-top:16px;font-family:Cinzel,serif;color:var(--gold);font-size:1rem">THRESHOLD CLEARED</p><p style="text-align:center;font-size:0.85rem;color:var(--dim);margin-top:4px">Step onto the neck. Block 01 awaits.</p>',

  steps: [
    // ── OPENING: Welcome ──
    {
      type: 'speak',
      char: TeachingCHAR.neutral,
      text: '<p>Welcome. Before you learn guitar, you need to know where you are.</p><p>This is <strong>The Hearth Mastery</strong> — a quest-based learning path. You\'re not just following lessons. You\'re walking a map.</p>',
    },
    {
      type: 'speak',
      char: TeachingCHAR.neutral,
      text: '<p>There are <strong>eight nodes</strong> on the map. You\'re standing at the first one: <strong>Foundation</strong>. This is the threshold — the doorway before everything else.</p><p>Foundation has <strong>ten frets</strong> (steps 0 through 9). Each one builds on the last. When you cross all ten, the Journey gate opens and Level 1 begins.</p>',
    },

    // ── QUESTION 1: What do you see? ──
    {
      type: 'ask',
      concept: 'map-awareness',
      char: TeachingCHAR.thinking,
      charSize: 'big',
      text: '<p>Look around. You\'ll see a map with nodes connected by golden paths. What do you notice first?</p>',
      choices: [
        {
          label: 'The nodes and paths',
          correct: true,
          response: {
            char: TeachingCHAR.encouraging,
            text: '<p>Good eye. The map is your overview of all eight nodes. Click any node to enter it. The golden lines show the connections between them.</p>'
          }
        },
        {
          label: 'The guide character',
          correct: true,
          response: {
            char: TeachingCHAR.encouraging,
            text: '<p>That\'s me. I\'ll give you context, recommendations, and feedback as you move through the path. I\'m here whenever you need me.</p>'
          }
        },
        {
          label: 'The progress markers',
          correct: true,
          response: {
            char: TeachingCHAR.encouraging,
            text: '<p>The golden dots and completed steps you see across the map. Everything you do is saved automatically. Your progress lives in this browser. When you come back, you pick up where you left off.</p>'
          }
        }
      ],
      reexplain: [
        { char: TeachingCHAR.encouraging, text: '<p>Take another look. The map has nodes, paths, a guide, and progress markers. Each one has a purpose.</p>' },
        { char: TeachingCHAR.neutral, text: '<p>Nodes are the eight areas of study. Paths connect them. I\'m the guide. And the golden dots track where you\'ve been.</p>' }
      ]
    },

    // ── EXPLAIN: How the map works ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      text: '<p>Here\'s how it works:</p><p>• <strong>The Map</strong> — your overview of all eight nodes. Click any node to enter it.<br>• <strong>The Guide</strong> — that\'s me. I\'ll give you context, recommendations, and feedback.<br>• <strong>Progress markers</strong> — the golden dots and completed steps you see across the map.</p><p>Everything you do is saved automatically. Your progress lives in this browser. When you come back, you pick up where you left off.</p>',
    },

    // ── QUESTION 2: How do you move forward? ──
    {
      type: 'ask',
      concept: 'forward-motion',
      char: TeachingCHAR.thinking,
      text: '<p>How do you move forward on this path?</p>',
      choices: [
        {
          label: 'Click frets on the neck path',
          correct: true,
          response: {
            char: TeachingCHAR.celebratory,
            text: '<p>Exactly. Each fret is a step. Click one to begin. The active step glows brightest. Completed steps glow gold.</p>'
          }
        },
        {
          label: 'Follow the lesson order',
          correct: true,
          response: {
            char: TeachingCHAR.encouraging,
            text: '<p>Correct. Each step has Understanding, Experience, and Application. Steps build on each other, so go in order. But within a step, explore freely.</p>'
          }
        }
      ],
      reexplain: [
        { char: TeachingCHAR.encouraging, text: '<p>Almost. The neck path in Foundation is your guide. Each fret is a step — click one to begin.</p>' },
        { char: TeachingCHAR.neutral, text: '<p>The path is a guitar neck with ten fret spaces. Each fret is a lesson step. Start at fret 0 and work your way to fret 9.</p>' }
      ]
    },

    // ── OWN: Threshold set ──
    {
      type: 'speak',
      char: TeachingCHAR.encouraging,
      charSize: 'big',
      text: '<p>You know the map, the guide, and the path. The ten frets stretch ahead of you. The Journey gate waits at the end.</p><p><strong>This fret is set. Step onto the neck.</strong></p>',
    },

    // ── END ──
    {
      type: 'end',
      char: TeachingCHAR.celebratory,
      text: '<p>Threshold cleared. You\'re ready for Block 01: How to Learn.</p>',
    }
  ]
};
