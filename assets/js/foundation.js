// Foundation Node — The 5 Building Blocks
// Broadest to most specific: Learn → Language → Music → Guitar → Tool

const FOUNDATION = {
  id: 'foundation',
  title: 'Foundation',
  tag: 'LEVEL 1',
  description: 'Five layers. Each one builds on the last. Start with how to learn, end with your hands on the wood.',

  topics: [
    {
      id: 'f-how-to-learn',
      num: '01',
      title: 'How to Learn',
      subtitle: 'The meta-skill that comes before everything',
      status: 'open',
      sources: ['Jamie Andreas — Principles of Correct Practice for Guitar', 'L. Ron Hubbard — Learning How to Learn', 'Beryl Lytton & Marcelle Pincus — English Handbook and Study Guide'],
      steps: [
        {
          label: 'Read',
          title: 'Your brain is the boss',
          body: `<p>Before you learn guitar, you need to learn HOW to learn. This sounds obvious, but most people skip it — and then wonder why they get stuck.</p>
<p>Three things block learning:</p>
<p><strong>1. Absence of Mass</strong> — trying to understand something without the physical thing in front of you. You can't learn guitar from a book alone. You need the instrument in your hands.</p>
<p><strong>2. Too Steep a Gradient</strong> — jumping ahead too fast. If you try to learn chords before you can fret a single note cleanly, your brain shuts down. One thing at a time.</p>
<p><strong>3. The Misunderstood Word</strong> — the most critical. One word you don't fully understand blanks everything that comes after it. If someone says "fret" and you nod but don't really know what it means, everything from that point forward is fog.</p>
<p>These three barriers explain 90% of why people quit. Not because guitar is hard — because they hit a barrier they didn't know was there.</p>`
        },
        {
          label: 'Feel',
          title: 'The body knows first',
          body: `<p>Your body learns before your mind does. When you practise guitar, your fingers are building muscle memory — patterns they'll repeat without thinking.</p>
<p>But here's the catch: your fingers learn whatever you teach them. If you practise fast and sloppy, your fingers learn fast and sloppy. If you practise slow and clean, your fingers learn slow and clean.</p>
<p>This is why the superpower isn't talent. It's <strong>imagination</strong>.</p>
<p>Before you play a single note, imagine exactly what you want your fingers to do. See it. Feel it. Then let your fingers follow. The clearer the picture in your mind, the cleaner the movement in your hands.</p>
<p>Your brain is the boss. Your fingers are the workers. Give them a clear instruction.</p>`
        },
        {
          label: 'Do',
          title: 'The tension hunt',
          body: `<p>Pick up your guitar. Sit with it. Now scan your body:</p>
<p>• Is your shoulder up by your ear? Let it drop.<br>
• Is your jaw clenched? Open your mouth wide, then relax.<br>
• Is your thumb pressing hard on the back of the neck? Ease up.<br>
• Are you holding your breath? Breathe.</p>
<p>Tension is the enemy of learning. When one part of your body works too hard, other parts tighten without you knowing. This is the first thing to practise — before any notes, before any chords.</p>
<p>Do this every time you pick up the guitar. It takes 30 seconds. It changes everything.</p>`
        },
        {
          label: 'Check',
          title: 'Three questions',
          body: `<p>Before you move on, can you answer YES to all three?</p>
<p>☐ I know the three barriers to learning (mass, gradient, misunderstood word)<br>
☐ I know that imagination comes before movement<br>
☐ I know how to do a body scan to find tension</p>
<p>If yes — you have the foundation for everything that comes next.</p>`
        }
      ]
    },

    {
      id: 'f-learning-a-language',
      num: '02',
      title: 'Learning a Language',
      subtitle: 'Music is a language. Here\'s what that means.',
      status: 'open',
      sources: ['Kofi Agawu — Music as Discourse', 'Raen\'s concept — Music as Language'],
      steps: [
        {
          label: 'Read',
          title: 'The language analogy',
          body: `<p>Music is often called a language. But what does that actually mean?</p>
<p>A language has:</p>
<p><strong>Vocabulary</strong> — the words. In music, the words are <em>notes</em>. Each note is a sound with a name.</p>
<p><strong>Grammar</strong> — the rules that connect words into meaning. In music, grammar is <em>intervals</em> (distances between notes), <em>scales</em> (sequences of notes), and <em>chords</em> (notes played together).</p>
<p><strong>Conversation</strong> — using vocabulary and grammar to communicate. In music, conversation is <em>playing</em> — alone or with others.</p>
<p><strong>Poetry</strong> — using the language to express something deeper. In music, poetry is <em>creating</em> — writing, improvising, finding your own voice.</p>
<p>You learn to speak before you write. You learn words before you learn grammar. You have conversations before you write poetry. Music follows the same path.</p>`
        },
        {
          label: 'See',
          title: 'The misunderstood word',
          body: `<p>Remember the third barrier from Block 01? The misunderstood word?</p>
<p>In language learning, this is the #1 killer. If you're learning French and you don't understand what a "verb" is, every grammar lesson after that is gibberish. You don't fail because French is hard — you fail because one word was unclear.</p>
<p>Music works the same way. If someone says "play a major third" and you don't know what "major" or "third" means, you're lost. Not because you're bad at music — because one term was undefined.</p>
<p>That's why this simulator has a <strong>Glossary</strong> in the toolbar. Every term, one click away. If you hit a word you don't know — stop. Look it up. Clear it. Then continue.</p>
<p>This isn't slow. This is the fastest way to learn.</p>`
        },
        {
          label: 'Do',
          title: 'Listen first',
          body: `<p>Before you play a single note, just listen.</p>
<p>Put on any piece of music — anything you like. Close your eyes. Don't try to analyse it. Just notice:</p>
<p>• Does it feel happy or sad?<br>
• Does it feel fast or slow?<br>
• Does it feel smooth or bumpy?<br>
• Where does it feel like it's going — does it feel settled or restless?</p>
<p>You're not looking for "right answers." You're training your ears to notice. This is how babies learn language — they listen for months before they speak. Your ears are learning the language of music right now.</p>`
        },
        {
          label: 'Check',
          title: 'Language check',
          body: `<p>☐ I understand that music has vocabulary (notes), grammar (intervals, scales, chords), and conversation (playing)<br>
☐ I know the misunderstood word rule — one unclear term blocks everything after it<br>
☐ I know to use the Glossary whenever I hit an unfamiliar term<br>
☐ I know that listening comes before playing</p>
<p>You now understand the shape of what you're learning. Next: the specific language of music.</p>`
        }
      ]
    },

    {
      id: 'f-language-of-music',
      num: '03',
      title: 'The Language of Music',
      subtitle: '12 notes. That\'s the whole alphabet.',
      status: 'open',
      sources: ['Michael P. Wolfsohn — Music Theory for Guitar', 'Patrick Stefurak — Guitar Building Blocks'],
      steps: [
        {
          label: 'Read',
          title: 'The music alphabet',
          body: `<p>Music uses <strong>12 notes</strong>. That's it. Every song ever written, every chord, every melody — built from 12 sounds.</p>
<p>Their names are:</p>
<p><strong>A  A#  B  C  C#  D  D#  E  F  F#  G  G#</strong></p>
<p>Then it loops back to A. The "#" symbol means "sharp" — one half step higher.</p>
<p>The regular notes (no sharps) are: <strong>A B C D E F G</strong></p>
<p>These 7 letters are your alphabet. Everything else is built from them.</p>
<p>Notice something: between B and C, there's no sharp. Between E and F, there's no sharp. These are the "short jumps" in music — only one fret apart instead of two.</p>`
        },
        {
          label: 'See',
          title: 'Intervals — the distances',
          body: `<p>An interval is the distance between two notes. This is the grammar of music — how notes relate to each other.</p>
<p><strong>Half step</strong> — the smallest distance. One fret on the guitar. B to C is a half step. E to F is a half step.</p>
<p><strong>Whole step</strong> — two half steps. Two frets. A to B is a whole step. C to D is a whole step.</p>
<p>These two intervals — half step and whole step — are the building blocks of everything. Scales are just patterns of whole and half steps. Chords are just specific intervals stacked together.</p>
<p>You don't need to memorise all the interval names yet. Just understand: music is built from distances between sounds, and those distances are measured in steps.</p>`
        },
        {
          label: 'Do',
          title: 'Hear the steps',
          body: `<p>On any instrument (or even by humming):</p>
<p>1. Play any note. Any one.<br>
2. Now play the very next sound up — one half step higher. Hear how close they are?<br>
3. Now skip a note — play one whole step up. Hear how it's a slightly bigger gap?<br>
4. Now play the same note you started on. Hear how it feels like "home"?</p>
<p>That "home" feeling is the <strong>root</strong>. It's the note everything else is measured from. This is the beginning of musical understanding — not theory on a page, but sounds in your ear.</p>`
        },
        {
          label: 'Check',
          title: 'Music language check',
          body: `<p>☐ I know there are 12 notes in music (A through G#, then it repeats)<br>
☐ I know the "short jumps" are B→C and E→F (no sharp between them)<br>
☐ I understand that intervals are distances between notes, measured in half steps and whole steps<br>
☐ I know that the "root" is the home note — where everything starts and returns</p>
<p>You now know the alphabet and basic grammar of music. Next: where this language lives on the guitar.</p>`
        }
      ]
    },

    {
      id: 'f-language-of-guitar',
      num: '04',
      title: 'The Language of Guitar',
      subtitle: 'Where music lives on the fretboard',
      status: 'open',
      sources: ['Fred Sokolow — Fretboard Roadmaps', 'Patrick Stefurak — Guitar Building Blocks', 'Charles Kim — Teach Yourself VISUALLY Guitar'],
      steps: [
        {
          label: 'Read',
          title: 'The fretboard map',
          body: `<p>The guitar has <strong>6 strings</strong> and usually <strong>19-24 frets</strong>. Each fret is one half step (remember Block 03?).</p>
<p>The strings, from thickest (closest to you) to thinnest (closest to the floor), are:</p>
<p><strong>E — A — D — G — B — E</strong></p>
<p>A trick to remember them: <em>"Eddie Ate Dynamite, Good Bye Eddie"</em></p>
<p>Each string is tuned to a specific note. When you play it "open" (without pressing any fret), that's its name. When you press a fret, you move up the musical alphabet — one fret = one half step.</p>
<p>So: the thickest string is E. First fret = F. Second fret = F#. Third fret = G. And so on.</p>
<p>The fretboard is a map. Every note has a location. Learning the map is learning the language.</p>`
        },
        {
          label: 'See',
          title: 'Fret 12 — the octave',
          body: `<p>Look at your guitar neck. Around the 12th fret, you'll see two dots (or some other marker). This is a special spot.</p>
<p>Fret 12 is the <strong>octave</strong> — the same note as the open string, but one octave higher. Higher in pitch, same name.</p>
<p>This means the fretboard repeats. Notes 1-11 are the "lower" version. Notes 12+ are the "higher" version. The pattern is the same — just shifted up.</p>
<p>This is why guitar is powerful: once you learn a pattern in one position, you can move it anywhere. The pattern stays the same — the starting note changes.</p>`
        },
        {
          label: 'Do',
          title: 'Find one note on every string',
          body: `<p>Your first fretboard treasure hunt. Find every E on the guitar:</p>
<p>• 6th string (thickest): open = E, fret 12 = E<br>
• 5th string (A): fret 7 = E<br>
• 4th string (D): fret 2 = E<br>
• 3rd string (G): fret 9 = E<br>
• 2nd string (B): fret 5 = E<br>
• 1st string (thinnest): open = E, fret 12 = E</p>
<p>Play each one. Listen. They're all E — but different octaves. Higher and lower versions of the same note.</p>
<p>You just found every E on the guitar. Tomorrow, find every A. Then D. Then G. One note per day — like a treasure hunt.</p>`
        },
        {
          label: 'Check',
          title: 'Guitar language check',
          body: `<p>☐ I know the 6 string names (E A D G B E) and the memory trick<br>
☐ I know that each fret is one half step<br>
☐ I know that fret 12 is the octave — same note, higher pitch<br>
☐ I can find one note on every string</p>
<p>You now speak the language of guitar — at least the first few words. Next: the physical tool itself.</p>`
        }
      ]
    },

    {
      id: 'f-the-tool',
      num: '05',
      title: 'The Tool',
      subtitle: 'Your hands on the wood',
      status: 'open',
      sources: ['Jamie Andreas — Principles of Correct Practice for Guitar', 'Christopher Parkening — Guitar Method Vol 1', 'Charles Kim — Teach Yourself VISUALLY Guitar'],
      steps: [
        {
          label: 'Read',
          title: 'Know your instrument',
          body: `<p>The guitar has three main sections:</p>
<p><strong>Headstock</strong> — the top part with the tuning pegs (knobs). Each peg controls one string.</p>
<p><strong>Neck</strong> — the long part. The front is the <em>fretboard</em>. The metal strips across it are <em>frets</em>.</p>
<p><strong>Body</strong> — the big part that makes the sound louder. On acoustic guitars, there's a round <em>sound hole</em>. On electric guitars, there are <em>pickups</em> (magnets that catch string vibrations).</p>
<p>Other parts: the <em>bridge</em> (where strings attach to the body), the <em>nut</em> (where strings rest at the top of the neck), and the <em>tuning pegs</em> (turn them to raise or lower pitch).</p>
<p>Every part has a purpose. Knowing the names helps you follow lessons and talk about guitar with other people.</p>`
        },
        {
          label: 'Feel',
          title: 'How to hold it',
          body: `<p><strong>Sitting down:</strong></p>
<p>• Sit on the front edge of your chair<br>
• Feet flat on the floor<br>
• Guitar rests on your right leg (if right-handed)<br>
• The neck points slightly up — not flat, not at the ceiling<br>
• Your right arm rests gently over the body — its weight holds the guitar in place<br>
• Your left hand holds the neck — thumb behind it, fingers curved, wrist mostly straight</p>
<p>The guitar should feel supported, not clamped. If you're squeezing, you're doing it wrong.</p>
<p>A trick: sit without the guitar. Put a pillow on your right leg. Rest your arm over it. Notice how your arm falls naturally? That's how it should feel on the guitar.</p>`
        },
        {
          label: 'Do',
          title: 'One beautiful note',
          body: `<p>The <strong>rest stroke</strong>. This is how guitar players make a full, clear sound:</p>
<p>1. Put your right thumb on the thickest string (low E)<br>
2. Push the string down toward the guitar body<br>
3. Keep going until your thumb rests on the next string<br>
4. Listen to the note ring out</p>
<p>That's it. One note. One clean, beautiful, ringing note.</p>
<p>Play it 10 times. Each time, listen to the whole note — the start, the middle, and the end as it fades. Try to make every note sound exactly the same. Same volume, same sound, same length.</p>
<p>This is your first sound. This is the beginning.</p>`
        },
        {
          label: 'Check',
          title: 'Tool check',
          body: `<p>☐ I can name the main parts of the guitar (headstock, neck, body, fretboard, frets, bridge, nut, sound hole/pickups)<br>
☐ I know how to sit with the guitar — supported, not clamped<br>
☐ My left thumb is behind the neck, fingers curved, wrist mostly straight<br>
☐ I can play one clean note with the rest stroke<br>
☐ I can play 10 notes that all sound the same</p>
<p>You now know the tool. You know how to hold it. You know how to make it speak.</p>
<div class="lp-callout">
  <div class="lp-co-title">YOU'VE BUILT THE FOUNDATION</div>
  <p>Five layers. Each one builds on the last:<br>
  How to Learn → Language → Music → Guitar → The Tool</p>
  <p>You now have the foundation for everything that comes next. The Doing node is where you start playing. The Knowing node is where you learn theory. The Practice node is where you build habits. But everything starts here — with these five building blocks.</p>
</div>`
        }
      ]
    }
  ]
};

// Export for use in simulator
if (typeof window !== 'undefined') window.FOUNDATION = FOUNDATION;
