// Foundation Node — The 7 Building Blocks
// Learn → Language → Music → Guitar → The Instrument → Speaking → Conversations
// Each block flows: Understand → Experience → Apply → Own

const FOUNDATION = {
  id: 'foundation',
  title: 'Foundation',
  tag: 'LEVEL 1',
  description: 'Seven layers. Each one builds on the last. Start with how to learn, end with your hands making music.',
  sources: [
    'Jamie Andreas — Principles of Correct Practice for Guitar',
    'Kofi Agawu — Music as Discourse',
    'L. Ron Hubbard — Learning How to Learn',
    'Beryl Lytton & Marcelle Pincus — English Handbook and Study Guide',
    'Fred Sokolow — Fretboard Roadmaps',
    'Christopher Parkening — Guitar Method Vol 1',
    'Charles Kim — Teach Yourself VISUALLY Guitar',
    'Michael P. Wolfsohn — Music Theory for Guitar'
  ],

  topics: [
    // ═══ BLOCK 01 ═══
    {
      id: 'f-how-to-learn',
      num: '01',
      title: 'How to Learn',
      subtitle: 'The meta-skill that comes before everything',
      status: 'open',
      tags: ['Meta-Skill', 'Hubbard', 'Learning'],
      sources: ['Jamie Andreas', 'L. Ron Hubbard', 'Beryl Lytton & Marcelle Pincus'],
      steps: [
        {
          label: 'Understand',
          title: 'Learning is a skill, not a talent',
          body: `<p>Most people think some people are "naturals" and others aren't. That's wrong. Learning itself is a skill — and like any skill, it can be taught, practised, and improved.</p>
<p>Three things block learning:</p>
<p><strong>Absence of Mass</strong> — trying to understand something without the physical thing in front of you. You can't learn guitar from a book alone.</p>
<p><strong>Too Steep a Gradient</strong> — jumping ahead too fast. Try to learn chords before you can fret a single note cleanly, and your brain shuts down.</p>
<p><strong>The Misunderstood Word</strong> — the most critical. One word you don't fully understand blanks everything that comes after it. If "fret" is unclear, everything from that point forward is fog.</p>
<p>These three barriers explain 90% of why people quit. Not because guitar is hard — because they hit a barrier they didn't know was there.</p>`
        },
        {
          label: 'Experience',
          title: 'Your body already knows',
          body: `<p>Your body learns before your mind does. When you practise guitar, your fingers build muscle memory — patterns they'll repeat without thinking.</p>
<p>But here's the catch: your fingers learn whatever you teach them. Practise fast and sloppy, they learn fast and sloppy. Practise slow and clean, they learn slow and clean.</p>
<p>This is why the superpower isn't talent. It's <strong>imagination</strong>.</p>
<p>Right now, before you touch the guitar — imagine your fingers pressing a string. See it clearly. Feel the string under your fingertip. Hear the note ring out.</p>
<p>The clearer the picture in your mind, the cleaner the movement in your hands. Your brain is the boss. Your fingers are the workers.</p>`
        },
        {
          label: 'Apply',
          title: 'The tension hunt',
          body: `<p>Pick up your guitar. Sit with it. Now scan your body:</p>
<p>• Is your shoulder up by your ear? Let it drop.<br>
• Is your jaw clenched? Open your mouth wide, then relax.<br>
• Is your thumb pressing hard on the back of the neck? Ease up.<br>
• Are you holding your breath? Breathe.</p>
<p>Tension is the enemy of learning. When one part of your body works too hard, other parts tighten without you knowing.</p>
<p>Do this every time you pick up the guitar. It takes 30 seconds. It changes everything.</p>`
        },
        {
          label: 'Own',
          title: 'This block is set',
          body: `<p>You now know the three barriers to learning. You know imagination comes before movement. You know how to find and release tension.</p>
<p>These aren't nice ideas — they're tools you'll use every time you practise. When you hit a wall later, come back here. The barrier will be one of these three.</p>
<p><strong>This block is set. You're ready for Block 02: Learning a Language.</strong></p>`
        }
      ]
    },

    // ═══ BLOCK 02 ═══
    {
      id: 'f-learning-a-language',
      num: '02',
      title: 'Learning a Language',
      subtitle: 'Music is a language. Here\'s what that means.',
      status: 'open',
      tags: ['Language', 'Agawu', 'Concept'],
      sources: ['Kofi Agawu — Music as Discourse', "Raen's concept — Music as Language"],
      steps: [
        {
          label: 'Understand',
          title: 'The language analogy',
          body: `<p>Music is often called a language. But what does that actually mean?</p>
<p>A language has <strong>vocabulary</strong> — the words. In music, the words are <em>notes</em>. Each note is a sound with a name.</p>
<p>A language has <strong>grammar</strong> — the rules that connect words into meaning. In music, grammar is <em>intervals</em> (distances between notes), <em>scales</em> (sequences of notes), and <em>chords</em> (notes played together).</p>
<p>A language has <strong>conversation</strong> — using vocabulary and grammar to communicate. In music, conversation is <em>playing</em>.</p>
<p>You learn to speak before you write. You learn words before grammar. You have conversations before you write poetry. Music follows the same path.</p>`
        },
        {
          label: 'Experience',
          title: 'Just listen',
          body: `<p>Before you play a single note, just listen.</p>
<p>Put on any piece of music — anything you like. Close your eyes. Don't try to analyse it. Just notice:</p>
<p>• Does it feel happy or sad?<br>
• Does it feel fast or slow?<br>
• Does it feel smooth or bumpy?<br>
• Does it feel settled or restless?</p>
<p>You're not looking for right answers. You're training your ears to notice. Babies listen for months before they speak. Your ears are learning the language right now.</p>`
        },
        {
          label: 'Apply',
          title: 'One misunderstood word',
          body: `<p>Remember the third barrier from Block 01? The misunderstood word?</p>
<p>In language learning, this is the #1 killer. If you're learning French and you don't understand what a "verb" is, every grammar lesson after that is gibberish.</p>
<p>Music works the same way. If someone says "play a major third" and you don't know what "major" or "third" means, you're lost. Not because you're bad at music — because one term was undefined.</p>
<p>That's why this simulator has a <strong>Dictionary</strong> in the toolbar. Every term, one click away. If you hit a word you don't know — stop. Look it up. Clear it. Then continue.</p>
<p>This isn't slow. This is the fastest way to learn.</p>`
        },
        {
          label: 'Own',
          title: 'This block is set',
          body: `<p>You understand that music has vocabulary (notes), grammar (intervals, scales, chords), and conversation (playing). You know that listening comes before playing. You know to use the Dictionary when a word is unclear.</p>
<p>You now understand the shape of what you're learning. Not the details yet — the shape.</p>
<p><strong>This block is set. You're ready for Block 03: The Language of Music.</strong></p>`
        }
      ]
    },

    // ═══ BLOCK 03 ═══
    {
      id: 'f-language-of-music',
      num: '03',
      title: 'The Language of Music',
      subtitle: '12 notes. That\'s the whole alphabet.',
      status: 'open',
      tags: ['Notes', 'Intervals', 'Theory'],
      sources: ['Michael P. Wolfsohn', 'Patrick Stefurak'],
      steps: [
        {
          label: 'Understand',
          title: 'The music alphabet',
          body: `<p>Music uses <strong>12 notes</strong>. That's it. Every song ever written, every chord, every melody — built from 12 sounds.</p>
<p>Their names are: <strong>A  A#  B  C  C#  D  D#  E  F  F#  G  G#</strong></p>
<p>Then it loops back to A. The "#" means "sharp" — one half step higher.</p>
<p>The regular notes (no sharps) are: <strong>A B C D E F G</strong></p>
<p>These 7 letters are your alphabet. Everything else is built from them.</p>
<p>Notice: between B and C, there's no sharp. Between E and F, there's no sharp. These are the "short jumps" — only one fret apart instead of two.</p>`
        },
        {
          label: 'Experience',
          title: 'The distances between sounds',
          body: `<p>An interval is the distance between two notes. This is the grammar of music — how notes relate to each other.</p>
<p><strong>Half step</strong> — the smallest distance. One fret on the guitar. B to C is a half step.</p>
<p><strong>Whole step</strong> — two half steps. Two frets. A to B is a whole step.</p>
<p>These two intervals — half step and whole step — are the building blocks of everything. Scales are just patterns of whole and half steps. Chords are just specific intervals stacked together.</p>
<p>Play any note. Now play the very next sound up — one half step higher. Hear how close they are? Now skip a note — one whole step up. Hear the slightly bigger gap?</p>`
        },
        {
          label: 'Apply',
          title: 'Find the home note',
          body: `<p>Play any note. Any one. Now play the same note again. Hear how it feels like "home"?</p>
<p>That "home" feeling is the <strong>root</strong>. It's the note everything else is measured from. This is the beginning of musical understanding — not theory on a page, but sounds in your ear.</p>
<p>Try this: play a note, then play a note one whole step up. Then play the first note again. Notice how the first note feels like it "owns" the space? That's the root.</p>
<p>You don't need to memorise all the interval names yet. Just understand: music is built from distances between sounds, and those distances are measured in steps.</p>`
        },
        {
          label: 'Own',
          title: 'This block is set',
          body: `<p>You know the 12 notes. You know the "short jumps" (B→C and E→F). You understand intervals — half steps and whole steps. You can feel the root — the home note.</p>
<p>This is the alphabet and basic grammar of music. Every scale, every chord, every melody is built from these pieces.</p>
<p><strong>This block is set. You're ready for Block 04: The Language of Guitar.</strong></p>`
        }
      ]
    },

    // ═══ BLOCK 04 ═══
    {
      id: 'f-language-of-guitar',
      num: '04',
      title: 'The Language of Guitar',
      subtitle: 'Where music lives on the fretboard',
      status: 'open',
      tags: ['Fretboard', 'Strings', 'Tuning'],
      sources: ['Fred Sokolow', 'Patrick Stefurak', 'Charles Kim'],
      steps: [
        {
          label: 'Understand',
          title: 'The fretboard map',
          body: `<p>The guitar has <strong>6 strings</strong> and usually <strong>19-24 frets</strong>. Each fret is one half step (remember Block 03?).</p>
<p>The strings, from thickest (closest to you) to thinnest (closest to the floor), are:</p>
<p><strong>E — A — D — G — B — E</strong></p>
<p>A trick to remember them: <em>"Eddie Ate Dynamite, Good Bye Eddie"</em></p>
<p>Each string is tuned to a specific note. When you play it "open" (without pressing any fret), that's its name. When you press a fret, you move up the musical alphabet — one fret = one half step.</p>
<p>The thickest string is E. First fret = F. Second fret = F#. Third fret = G. And so on.</p>
<p>The fretboard is a map. Every note has a location.</p>`
        },
        {
          label: 'Experience',
          title: 'The octave — where the map repeats',
          body: `<p>Look at your guitar neck. Around the 12th fret, you'll see two dots. This is a special spot.</p>
<p>Fret 12 is the <strong>octave</strong> — the same note as the open string, but one octave higher. Higher in pitch, same name.</p>
<p>This means the fretboard repeats. Notes 1-11 are the "lower" version. Notes 12+ are the "higher" version. The pattern is the same — just shifted up.</p>
<p>This is why guitar is powerful: once you learn a pattern in one position, you can move it anywhere. The pattern stays the same — the starting note changes.</p>`
        },
        {
          label: 'Apply',
          title: 'Find one note on every string',
          body: `<p>Your first fretboard treasure hunt. Find every E on the guitar:</p>
<p>• 6th string (thickest): open = E, fret 12 = E<br>
• 5th string (A): fret 7 = E<br>
• 4th string (D): fret 2 = E<br>
• 3rd string (G): fret 9 = E<br>
• 2nd string (B): fret 5 = E<br>
• 1st string (thinnest): open = E, fret 12 = E</p>
<p>Play each one. Listen. They're all E — but different octaves. Higher and lower versions of the same note.</p>
<p>You just found every E on the guitar. Tomorrow, find every A. Then D. Then G. One note per day.</p>`
        },
        {
          label: 'Own',
          title: 'This block is set',
          body: `<p>You know the 6 string names and the memory trick. You know each fret is one half step. You know fret 12 is the octave — where the map repeats. You can find one note on every string.</p>
<p>You speak the language of guitar — at least the first few words.</p>
<p><strong>This block is set. You're ready for Block 05: The Guitar.</strong></p>`
        }
      ]
    },

    // ═══ BLOCK 05 — THE GUITAR ═══
    {
      id: 'f-the-guitar',
      num: '05',
      title: 'The Guitar',
      subtitle: 'Know the instrument before you play it',
      status: 'open',
      tags: ['Guitar Parts', 'Anatomy', 'Tuning'],
      sources: ['Jamie Andreas', 'Christopher Parkening', 'Charles Kim'],
      steps: [
        {
          label: 'Understand',
          title: 'Know your instrument',
          body: `<p>The guitar has three main sections:</p>
<p><strong>Headstock</strong> — the top part with the tuning pegs (knobs). Each peg controls one string. Turn it to tighten (higher pitch) or loosen (lower pitch).</p>
<p><strong>Neck</strong> — the long part. The front is the <em>fretboard</em>. The metal strips across it are <em>frets</em>. The raised dots on the side are <em>position markers</em> — they help you find your way.</p>
<p><strong>Body</strong> — the big part that makes the sound louder. On acoustic guitars, there's a round <em>sound hole</em>. On electric guitars, there are <em>pickups</em> (magnets that catch string vibrations).</p>
<p>Other parts: the <em>bridge</em> (where strings attach to the body), the <em>nut</em> (where strings rest at the top of the neck), and the <em>truss rod</em> (inside the neck, keeps it straight).</p>
<p>Every part has a purpose. Knowing the names helps you follow lessons and talk about guitar with other people.</p>`
        },
        {
          label: 'Experience',
          title: 'The sound of the instrument',
          body: `<p>Before you play it, just listen to it.</p>
<p>Tap the body gently. Hear the resonance? That's the wood vibrating. The body is a resonance chamber — it takes the tiny vibration of a string and makes it loud enough to fill a room.</p>
<p>Now strum across all the strings with your thumb (don't worry about how — just drag your thumb across them). Hear the sound? That's the guitar speaking.</p>
<p>Every guitar sounds different. The wood, the shape, the strings — they all shape the tone. Your guitar has a voice. You're about to learn how to use it.</p>`
        },
        {
          label: 'Apply',
          title: 'How it feels in your hands',
          body: `<p><strong>Sitting down:</strong></p>
<p>• Sit on the front edge of your chair<br>
• Feet flat on the floor<br>
• Guitar rests on your right leg (if right-handed)<br>
• The neck points slightly up — not flat, not at the ceiling<br>
• Your right arm rests gently over the body — its weight holds the guitar in place<br>
• Your left hand holds the neck — thumb behind it, fingers curved, wrist mostly straight</p>
<p>The guitar should feel <strong>supported, not clamped</strong>. If you're squeezing, you're doing it wrong.</p>
<p>A trick: sit without the guitar. Put a pillow on your right leg. Rest your arm over it. Notice how your arm falls naturally? That's how it should feel on the guitar.</p>`
        },
        {
          label: 'Own',
          title: 'This block is set',
          body: `<p>You can name the main parts of the guitar. You know what the headstock, neck, and body do. You know how to sit with it — supported, not clamped.</p>
<p>You know the instrument. Now it's time to learn how to make it speak.</p>
<p><strong>This block is set. You're ready for Block 06: Speaking with the Guitar.</strong></p>`
        }
      ]
    },

    // ═══ BLOCK 06 — SPEAKING WITH THE GUITAR ═══
    {
      id: 'f-speaking',
      num: '06',
      title: 'Speaking with the Guitar',
      subtitle: 'Right hand, left hand, both hands together',
      status: 'open',
      tags: ['Right Hand', 'Left Hand', 'Picking', 'Fretting'],
      sources: ['Jamie Andreas', 'Christopher Parkening'],
      steps: [
        {
          label: 'Understand',
          title: 'The two hands have different jobs',
          body: `<p>Guitar is the only instrument where your two hands do completely different things at the same time.</p>
<p><strong>Right hand</strong> (picking hand): creates the sound. It plucks, picks, or strums the strings. Without it, no sound.</p>
<p><strong>Left hand</strong> (fretting hand): changes the pitch. It presses strings against frets to change which note sounds. Without it, you only get open strings.</p>
<p>Neither hand alone makes music. They have to work <em>together</em>. This is the fundamental coordination of guitar — and it takes practice.</p>`
        },
        {
          label: 'Experience',
          title: 'The right hand: rest stroke vs free stroke',
          body: `<p>Your right hand has two basic strokes:</p>
<p><strong>Rest stroke</strong> — Push the string down toward the guitar body. Keep going until your finger rests on the next string. This gives a <em>full, round, powerful</em> sound. Best for single notes you want to stand out.</p>
<p><strong>Free stroke</strong> — Pluck the string and let your finger come back up into the air, not touching the next string. This gives a <em>lighter, more open</em> sound. Best for playing multiple strings or faster passages.</p>
<p>Try both on the same string. Hear the difference? Rest stroke = bold. Free stroke = light. You'll use both, depending on what the music needs.</p>`
        },
        {
          label: 'Apply',
          title: 'The left hand: fretting a note',
          body: `<p>Now your left hand joins in. This is where it gets real.</p>
<p>Pick a string — any string, open. Now press down on fret 1 with your index finger. Where? <strong>Right behind the fret wire</strong> — not on top of it, not in the middle of the fret. Just behind it.</p>
<p>How hard? Just enough to make the note ring clean. If it buzzes, press harder. If your finger hurts, you're pressing too hard. The sweet spot is surprisingly gentle.</p>
<p>Now pick the string again. Hear the new note? You just changed the pitch by shortening the vibrating length of the string. That's what fretting is.</p>
<p>Play fret 1, then lift your finger and play open. Fret 1, open. Hear the difference? That's the half step from Block 03 — now in your hands.</p>`
        },
        {
          label: 'Own',
          title: 'This block is set',
          body: `<p>You know the two strokes — rest stroke for power, free stroke for lightness. You know where to place your fretting finger (just behind the fret wire) and how hard to press (just enough to ring clean).</p>
<p>You can make the guitar speak. One note at a time, clean and ringing.</p>
<p><strong>This block is set. You're ready for Block 07: Guitar Conversations.</strong></p>`
        }
      ]
    },

    // ═══ BLOCK 07 — GUITAR CONVERSATIONS ═══
    {
      id: 'f-conversations',
      num: '07',
      title: 'Guitar Conversations',
      subtitle: 'Moving between notes, the start of playing',
      status: 'open',
      tags: ['Coordination', 'Exercises', 'First Movements'],
      sources: ['Jamie Andreas', 'Christopher Parkening', 'Fred Sokolow'],
      steps: [
        {
          label: 'Understand',
          title: 'One note is not music. Two notes are.',
          body: `<p>You can make a clean note. Good. But music isn't one note — it's notes <em>moving</em>.</p>
<p>The moment you play one note, then another, you've created an <strong>interval</strong> — the distance between two sounds. This is the DNA of melody. Every song you've ever heard is just intervals — sequences of distances between notes.</p>
<p>So the real skill isn't playing one note cleanly. It's moving from one note to the next <em>cleanly</em>. That's what we're about to learn.</p>`
        },
        {
          label: 'Experience',
          title: 'The first exercise: one string, two frets',
          body: `<p>Put it all together. Here's your first real exercise:</p>
<p>1. Pick any string (start with the 3rd string — G)<br>
2. Play it open (right hand picks, left hand does nothing)<br>
3. Now press fret 2 with your index finger (just behind the fret wire)<br>
4. Pick it again<br>
5. Lift your finger. Play open again.</p>
<p>Open → Fret 2 → Open. That's a whole step up, then back down. You just played your first two-note sequence.</p>
<p>Do it 10 times. Each time, listen: does each note ring clean? Is the transition smooth? No buzzing? No muting?</p>`
        },
        {
          label: 'Apply',
          title: 'Walking up one string',
          body: `<p>Now let's walk. Same string, one fret at a time:</p>
<p>Open → Fret 1 → Fret 2 → Fret 3 → Fret 4</p>
<p>Right hand picks each note. Left hand frets each one. One at a time. Slow and clean.</p>
<p>Now walk back down: Fret 4 → Fret 3 → Fret 2 → Fret 1 → Open</p>
<p>This is the fundamental movement of guitar — <strong>fingers moving along a string</strong>. Every scale, every riff, every melody is built from this. You're doing it right now.</p>
<p>Try it on a different string tomorrow. Then another. One string per day. Within a week, your hands will start to <em>know</em> the fretboard.</p>`
        },
        {
          label: 'Own',
          title: 'Foundation complete',
          body: `<p>You can make a clean note. You can move between notes. You can walk up and down a string. Both hands working together — right hand creating sound, left hand changing pitch.</p>
<p>This is the beginning of everything.</p>
<div style="background:var(--card);border:2px solid var(--gold);border-radius:8px;padding:16px;margin-top:16px;text-align:center">
  <div style="font-family:Cinzel,serif;color:var(--gold);font-size:0.9rem;font-weight:700;margin-bottom:4px">FOUNDATION COMPLETE</div>
  <p style="font-size:0.75rem;color:var(--dim);margin:0">Seven layers. Each one builds on the last.<br>How to Learn → Language → Music → Guitar → The Instrument → Speaking → Conversations</p>
  <p style="font-size:0.75rem;color:var(--dim);margin:8px 0 0 0">You now have the foundation for everything that comes next.</p>
</div>`
        }
      ]
    }
  ]
};

if (typeof window !== 'undefined') window.FOUNDATION = FOUNDATION;
