// Lesson 1: Foundation - The Hearth Mastery
const LESSON_1_FOUNDATION = {
  title: 'Foundation',
  subtitle: 'The beginning of everything',
  steps: [
    {
      type: 'speak',
      char: 'images/character-face/Neutral.png',
      charLabel: 'Guide',
      text: '<p>Welcome to Foundation. This is the place where we slow down just enough for everything after this to make sense.</p><p>Guitar can look like a tangle at first: strings, frets, fingers, names, little diagrams, people saying words like "interval" as if you were born knowing them. You were not. That is completely fine.</p><p>Today you are going to build the first map. You will learn how to learn, how music behaves like a language, where the notes live on the guitar, and how to make your first real sounds without fighting your own body.</p><p>Keep your guitar nearby if you have one. If you do not, stay with the lesson anyway. When a physical step appears, imagine it clearly. Imagination before movement is part of the practice.</p>'
    },

    {
      type: 'speak',
      char: 'images/character-face/Encouraging.png',
      charLabel: 'Guide',
      text: '<p>Before we touch a string, we check the instrument you live inside: your body.</p><p>Here is something most beginners do not know: <strong>tension is the enemy of clean playing</strong>. When you hold your breath, clench your jaw, or squeeze the neck, your fingers lose their independence. They become clumsy.</p><p>The fix is simple. Before you play, do a quick body scan: drop your shoulders, unclench your jaw, loosen your fretting thumb, and breathe. This is not warm-up fluff. It is the foundation of technique.</p>'
    },
    {
      type: 'ask',
      concept: 'body-tension',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>Why does tension in your shoulders or jaw affect your playing?</p>',
      choices: [
        {
          label: 'Tension travels down the arm and makes fingers stiff and clumsy',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Exactly. Your fingers share tendons with your forearm, which connects to your shoulder. If your shoulder is locked up, your fingers cannot move freely. A relaxed body is the first step to clean playing.</p>'
          }
        },
        { label: 'It does not really affect anything', correct: false },
        { label: 'It makes you play too fast', correct: false },
        { label: 'It only matters for advanced players', correct: false }
      ],
      reexplain: [
        {
          char: 'images/character-face/Encouraging.png',
          charLabel: 'Guide',
          text: '<p>Think about it this way: try to wiggle your fingers right now while clenching your fist. Hard, right? Tension in one part of the body limits movement everywhere connected to it.</p>'
        }
      ]
    },
    {
      type: 'speak',
      char: 'images/character-face/Encouraging.png',
      charLabel: 'Guide',
      text: '<p>Good. Now try this: drop your shoulders, unclench your jaw, loosen your thumb on the neck, and take one slow breath. When you are ready, move on.</p>'
    },

    {
      type: 'ask',
      concept: 'music-as-language',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>Here is the first big idea: music is a language.</p><p>That means it has <strong>vocabulary</strong>, which is notes. It has <strong>grammar</strong>, which is intervals, scales, and chords. And it has <strong>conversation</strong>, which is playing and listening with intention.</p><p>Babies listen for months before they speak. Guitar works the same way. Your ears are not extra. They are the front door.</p><p>So, in this language, what are the "words"?</p>',
      choices: [
        {
          label: 'Notes',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Exactly. Notes are the vocabulary. Chords, scales, riffs, and songs are built by arranging those notes into meaning.</p><p>And when a word is unclear, use the Dictionary. Clearing one confusing word often clears the whole lesson.</p>'
          }
        },
        { label: 'Guitar brands', correct: false },
        { label: 'Practice schedules', correct: false },
        { label: 'Stage lights', correct: false }
      ],
      reexplain: [
        {
          char: 'images/character-face/Encouraging.png',
          charLabel: 'Guide',
          text: '<p>No worries. Let us look at it from ordinary speech.</p>'
        },
        {
          char: 'images/character-face/Neutral.png',
          charLabel: 'Guide',
          text: '<p>In English, words are the small named pieces you combine into sentences. In music, the small named pieces are notes: A, B, C, and so on. Intervals and chords are more like grammar because they describe how those notes relate.</p>'
        }
      ]
    },

    {
      type: 'ask',
      concept: 'twelve-notes',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>Western music uses 12 notes before the pattern repeats: A, A#, B, C, C#, D, D#, E, F, F#, G, G#.</p><p>On guitar, the fretboard makes this beautifully physical. Move one fret higher and you move one <strong>half step</strong>. Move two frets higher and you move one <strong>whole step</strong>.</p><p>An <strong>interval</strong> is just the distance between two notes. The <strong>root</strong> is the home note, the sound everything else feels measured from.</p><p>If you move from fret 3 to fret 4 on the same string, how far did you move?</p>',
      choices: [
        {
          label: 'One half step',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Yes. One fret equals one half step. That is one of the friendliest things about guitar: the distance is right there under your finger.</p>'
          }
        },
        { label: 'One whole step', correct: false },
        { label: 'One octave', correct: false },
        { label: 'One chord', correct: false }
      ],
      reexplain: [
        {
          char: 'images/character-face/Encouraging.png',
          charLabel: 'Guide',
          text: '<p>Close enough to learn from. Think of frets as little steps on a staircase.</p>'
        },
        {
          char: 'images/character-face/Neutral.png',
          charLabel: 'Guide',
          text: '<p>Moving to the very next fret is the smallest normal move on guitar. That smallest move is called a half step. A whole step needs two of those moves, so it covers two frets.</p>'
        }
      ]
    },

    {
      type: 'cards',
      char: 'images/character-face/Neutral.png',
      charLabel: 'Guide',
      text: '<p>Now let us put those notes onto the guitar. The fretboard is not a mystery board. It is a repeating map.</p><p>Tap through these four pieces. You do not need to memorize the whole neck today. Just learn what kind of map you are looking at.</p>',
      cards: [
        {
          title: '6 Strings',
          icon: 'E A D G B E',
          desc: 'From thickest to thinnest: E, A, D, G, B, E. Try the memory line: Eddie Ate Dynamite, Good Bye Eddie.',
          body: 'From thickest to thinnest: E, A, D, G, B, E. Try the memory line: Eddie Ate Dynamite, Good Bye Eddie.'
        },
        {
          title: 'Frets',
          icon: '1 2 3',
          desc: 'Each fret raises the note by one half step. Two frets make a whole step.',
          body: 'Each fret raises the note by one half step. Two frets make a whole step.'
        },
        {
          title: 'Fret 12',
          icon: '12',
          desc: 'The 12th fret is the octave: the same note name as the open string, higher in pitch.',
          body: 'The 12th fret is the octave: the same note name as the open string, higher in pitch.'
        },
        {
          title: 'Tab',
          icon: '0 1 2',
          desc: 'Tab has six lines for six strings. Numbers tell you which fret to play. 0 means open.',
          body: 'Tab has six lines for six strings. Numbers tell you which fret to play. 0 means open.'
        }
      ]
    },

    {
      type: 'cards',
      char: 'images/character-face/Neutral.png',
      charLabel: 'Guide',
      text: '<p>Before you ask your hands to do hard things, know the instrument they are holding. Names matter because they remove fog.</p><p>If a future lesson says "place your thumb behind the neck" or "strum near the bridge," you want those words to land clearly.</p>',
      cards: [
        {
          title: 'Parts',
          icon: 'GTR',
          desc: 'Headstock holds tuning pegs. Neck holds frets. Body projects the sound. Bridge and nut hold the string path.',
          body: 'Headstock holds tuning pegs. Neck holds frets. Body projects the sound. Bridge and nut hold the string path.'
        },
        {
          title: 'Posture',
          icon: 'SIT',
          desc: 'The guitar should feel supported, not clamped. Your arm steadies it; your hand should not squeeze it into place.',
          body: 'The guitar should feel supported, not clamped. Your arm steadies it; your hand should not squeeze it into place.'
        },
        {
          title: 'Thumb',
          icon: 'PAD',
          desc: 'Use the pad of your thumb behind the neck, roughly opposite the middle finger. Keep the hand relaxed and curved.',
          body: 'Use the pad of your thumb behind the neck, roughly opposite the middle finger. Keep the hand relaxed and curved.'
        },
        {
          title: 'Capo',
          icon: 'CAPO',
          desc: 'A capo clamps across the strings and raises the pitch. Same chord shapes, different key.',
          body: 'A capo clamps across the strings and raises the pitch. Same chord shapes, different key.'
        }
      ]
    },

    {
      type: 'speak',
      char: 'images/character-face/Encouraging.png',
      charLabel: 'Guide',
      text: '<p>Time for your first sounds. There are two ways to pluck a string, and they feel very different.</p><p>A <strong>rest stroke</strong> pushes through the string and lands on the next one. It sounds full and round, like a bass note. A <strong>free stroke</strong> plucks the string and moves away into the air. It sounds lighter and more open.</p><p>Neither is better. They are different tools. But you need to know both.</p>'
    },
    {
      type: 'ask',
      concept: 'stroke-types',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>Which stroke type produces a fuller, more grounded sound?</p>',
      choices: [
        {
          label: 'Rest stroke — it pushes through and lands on the next string',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Yes. The rest stroke transfers more energy into the string, so it sounds bigger and rounder. The free stroke is quicker and lighter — great for fast passages and fingerpicking.</p>'
          }
        },
        { label: 'Free stroke — it moves faster', correct: false },
        { label: 'They sound exactly the same', correct: false },
        { label: 'It depends on the guitar brand', correct: false }
      ],
      reexplain: [
        {
          char: 'images/character-face/Encouraging.png',
          charLabel: 'Guide',
          text: '<p>Think about it: a rest stroke pushes through the string and stops on the next one. That extra contact time transfers more energy. The free stroke plucks and lifts away — less contact, lighter sound.</p>'
        }
      ]
    },
    {
      type: 'speak',
      char: 'images/character-face/Encouraging.png',
      charLabel: 'Guide',
      text: '<p>Now try it. Play an open string with a rest stroke — push through and land on the next string. Then try a free stroke — pluck and let your finger move freely into the air.</p><p>Listen to the difference. The rest stroke should feel heavier. The free stroke should feel lighter.</p><p>Now press just behind fret 1 on any string and play it. If you hear buzzing or muting, adjust your finger closer to the fret wire and arch it more. Release any extra pressure and play again — you need less force than you think.</p>'
    },

    {
      type: 'speak',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>One note is a sound. Two notes are the beginning of music, because now there is movement.</p><p>Here is the core skill: <strong>fretting</strong>. Press a string down just behind the fret wire with the tip of your finger. Not on top of the fret. Not far behind it. Just behind it. That is where the note rings cleanest.</p><p>The fret wire is your target. Your finger is the tool. The sweet spot is within 2mm of the fret wire.</p>'
    },
    {
      type: 'ask',
      concept: 'fretting-position',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>Where should your finger press the string for the cleanest note?</p>',
      choices: [
        {
          label: 'Just behind the fret wire, using the fingertip',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Right. Behind the fret wire, with the fingertip arched. Too far back and the note buzzes. On top of the fret and it mutes. Just behind is the sweet spot.</p>'
          }
        },
        { label: 'Right on top of the fret wire', correct: false },
        { label: 'In the middle of the fret space', correct: false },
        { label: 'As far from the fret wire as possible', correct: false }
      ],
      reexplain: [
        {
          char: 'images/character-face/Encouraging.png',
          charLabel: 'Guide',
          text: '<p>Picture the fret wire as a tiny wall. Your finger needs to press the string right next to that wall, not on top of it. The closer to the wire, the cleaner the note.</p>'
        }
      ]
    },
    {
      type: 'speak',
      char: 'images/character-face/Encouraging.png',
      charLabel: 'Guide',
      text: '<p>Now try this: play the G string open (no fret). Let it ring clearly. Then press fret 2 just behind the fret wire and play again. Listen to the difference in pitch.</p><p>Lift your finger and play open again. Notice the return home.</p><p>Now walk up one string slowly: open, 1, 2, 3, 4. Slow enough that every note is honest. Then walk back down: 4, 3, 2, 1, open.</p><p>If a note buzzes, do not judge it. Adjust: closer to the fret wire, arch your finger more, drop your shoulder. The fix is always physical, never emotional.</p>'
    },

    {
      type: 'speak',
      char: 'images/character-face/Encouraging.png',
      charLabel: 'Guide',
      text: '<p>You have played single notes. Now we stack notes together. This is your first chord: <strong>E major</strong>.</p><p>A chord is just several notes played at the same time. E major uses three fingers on three strings, with three strings left open. It sounds big, full, and is used in thousands of songs.</p><p>Here is the shape:</p><p style="font-family:var(--mono);color:var(--gold);font-size:0.82rem;line-height:1.8;text-align:center;margin:12px 0;padding:10px;background:rgba(0,0,0,0.14);border-radius:6px">e|---0--- (open)<br />B|---0--- (open)<br />G|---1--- finger 1<br />D|---2--- finger 2<br />A|---2--- finger 3<br />E|---0--- (open)</p><p>Finger 1 goes on fret 1 of the G string. Fingers 2 and 3 go on fret 2 of the D and A strings. Strum all six strings.</p>'
    },
    {
      type: 'ask',
      concept: 'e-major-shape',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>In the E major chord, how many strings are played open (no finger)?</p>',
      choices: [
        {
          label: 'Three — the low E, B, and high e strings',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Yes. Three open strings and three fretted ones. That is what makes E major sound so full — it rings across the whole guitar.</p>'
          }
        },
        { label: 'One — just the low E', correct: false },
        { label: 'None — all strings are fretted', correct: false },
        { label: 'Six — all strings are open', correct: false }
      ],
      reexplain: [
        {
          char: 'images/character-face/Encouraging.png',
          charLabel: 'Guide',
          text: '<p>Look at the shape again. The 0s in tab mean open — no finger needed. Count them: low E is 0, B is 0, high e is 0. That is three open strings.</p>'
        }
      ]
    },
    {
      type: 'speak',
      char: 'images/character-face/Encouraging.png',
      charLabel: 'Guide',
      text: '<p>Now form the chord. Place finger 1 on fret 1 of the G string. Fingers 2 and 3 on fret 2 of the D and A strings. Arch your fingers so they do not touch the open strings.</p><p>Strum all six strings. If some notes are muted or buzz, adjust: press closer to the fret wire, arch your fingers more, and check that your thumb is relaxed behind the neck.</p><p>When all six strings ring clearly, you have played your first chord.</p>'
    },

    {
      type: 'ask',
      concept: 'foundation-recap',
      char: 'images/character-face/Thinking.png',
      charLabel: 'Guide',
      text: '<p>Quick recap. You have met the learning barriers, the language idea, the 12-note map, the guitar layout, clean single notes, movement, and E major.</p><p>One idea protects everything else: if a lesson suddenly goes foggy, what should you check first?</p>',
      choices: [
        {
          label: 'A skipped barrier: no physical example, too big a jump, or an unclear word',
          correct: true,
          response: {
            char: 'images/character-face/Celebratory.png',
            charLabel: 'Guide',
            text: '<p>Yes. That is the Foundation mindset. When learning breaks down, you do not blame yourself. You look for the barrier and make the next step smaller and clearer.</p>'
          }
        },
        { label: 'Whether you are naturally talented enough', correct: false },
        { label: 'Whether you can play fast yet', correct: false },
        { label: 'Whether your guitar looks impressive', correct: false }
      ],
      reexplain: [
        {
          char: 'images/character-face/Encouraging.png',
          charLabel: 'Guide',
          text: '<p>Let us take the pressure off for a second. Fog in learning usually has a cause.</p>'
        },
        {
          char: 'images/character-face/Neutral.png',
          charLabel: 'Guide',
          text: '<p>The three common barriers are: no physical thing to look at or touch, a step that is too large, or one word that was not fully understood. Find the barrier, clear it, and the path usually opens again.</p>'
        }
      ]
    },

    {
      type: 'speak',
      char: 'images/character-face/Encouraging.png',
      charLabel: 'Guide',
      text: '<p>What comes next is Doing. Foundation gave you the map; Doing starts training the movement.</p><p>Your best practice shape is simple: 20 minutes a day beats two hours once a week. Start with two minutes of body scan, a few minutes of clean open strings or slow finger movement, one focused drill, and a little time playing anything that makes you want to come back tomorrow.</p><p>Keep listening. Keep clearing words. Keep making the step small enough that your hands can succeed. Guitar rewards patience in a very literal way: what you repeat becomes easier to repeat.</p>'
    },

    {
      type: 'end',
      char: 'images/character-face/Celebratory.png',
      buttonLabel: 'Continue',
      text: '<p><strong>Foundation complete.</strong></p><p>You now know how to approach learning, how music works like a language, how the 12 notes move across the fretboard, how to hold the instrument without clamping it, how to make clean first sounds, how to move between notes, and how to form E major.</p><p>This is the beginning of everything. Not because you know everything now, but because you know how to keep going.</p>'
    }
  ]
};

if(typeof window !== 'undefined') window.LESSON_1_FOUNDATION = LESSON_1_FOUNDATION;
if(typeof module !== 'undefined') module.exports = LESSON_1_FOUNDATION;
