// Foundation Node — The First Neck Path (0-9 Threshold)
// Before Level 1, the learner walks the first guitar neck.
// The frets are the Foundation steps. The strings guide the path.
// 0 = Threshold, 1-9 = the ten frets, then Level 1 / Journey begins.

const FOUNDATION = {
  id: 'foundation',
  title: 'Foundation',
  tag: 'THRESHOLD',
  subtitle: 'Cross the first neck-path.',
  guideLine: 'Before Level 1, we walk the first neck. Each fret sets part of you: body, ear, hands, words, map, sound, and first conversation.',
  questLine: 'Complete the ten frets. Open the Journey gate.',
  completionLine: 'The gate is open. Journey Level 1 begins.',
  earned: 'Map sense · clear sound · first root notes · first musical sentence',
  sources: [
    'Jamie Andreas — Principles of Correct Practice for Guitar',
    'Kofi Agawu — Music as Discourse',
    'L. Ron Hubbard — Learning How to Learn',
    'Fred Sokolow — Fretboard Roadmaps',
    'Christopher Parkening — Guitar Method Vol 1',
    'Charles Kim — Teach Yourself VISUALLY Guitar',
    'Michael P. Wolfsohn — Music Theory for Guitar'
  ],

  // 10 threshold steps (0-9) mapped to the neck path fret spaces
  topics: [
    // ═══ STEP 0 — THE THRESHOLD ═══
    {
      id: 'f-threshold',
      num: '0',
      title: 'The Threshold',
      subtitle: 'Meet the world, the guide, the map, and your progress.',
      micro: 'How this simulator works.',
      status: 'open',
      tags: ['Meta', 'Introduction'],
      sources: [],
      steps: [
        {
          label: 'Understand',
          title: 'Welcome to the Threshold',
          body: `<p>Before you learn guitar, you need to know where you are.</p>
<p>This is <strong>The Hearth Mastery</strong> — a quest-based learning path. You're not just following lessons. You're walking a map.</p>
<p>There are <strong>eight nodes</strong> on the map. You're standing at the first one: <strong>Foundation</strong>. This is the threshold — the doorway before everything else.</p>
<p>Foundation has <strong>ten frets</strong> (steps 0 through 9). Each one builds on the last. When you cross all ten, the Journey gate opens and Level 1 begins.</p>`
        },
        {
          label: 'Experience',
          title: 'The guide, the map, and you',
          body: `<p>Look around. You'll see:</p>
<p>• <strong>The Map</strong> — your overview of all eight nodes. Click any node to enter it.<br>
• <strong>The Guide</strong> — that's me. I'll give you context, recommendations, and feedback.<br>
• <strong>Progress markers</strong> — the golden dots and completed steps you see across the map.</p>
<p>Everything you do is saved automatically. Your progress lives in this browser. When you come back, you pick up where you left off.</p>`
        },
        {
          label: 'Apply',
          title: 'Your first move',
          body: `<p>Click <strong>Start Lesson 1</strong> below, or click any fret on the neck path to begin exploring.</p>
<p>There's no wrong order within a step — each one has Understanding, Experience, and Application. But steps build on each other, so go in order.</p>
<p>When you finish a step, it glows gold on the path. The active step always glows brightest.</p>`
        },
        {
          label: 'Own',
          title: 'The threshold is set',
          body: `<p>You know the map, the guide, and the path. The ten frets stretch ahead of you. The Journey gate waits at the end.</p>
<p><strong>This fret is set. Step onto the neck.</strong></p>`
        }
      ]
    },

    // ═══ STEP 1 — HOW TO LEARN ═══
    {
      id: 'f-how-to-learn',
      num: '1',
      title: 'How to Learn',
      subtitle: 'The meta-skill that comes before everything.',
      micro: 'Missing mass, skipped gradients, misunderstood words.',
      status: 'open',
      tags: ['Meta-Skill', 'Hubbard', 'Learning'],
      sources: ['Jamie Andreas', 'L. Ron Hubbard'],
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
          title: 'This fret is set',
          body: `<p>You now know the three barriers to learning. You know imagination comes before movement. You know how to find and release tension.</p>
<p>These aren't nice ideas — they're tools you'll use every time you practise. When you hit a wall later, come back here. The barrier will be one of these three.</p>
<p><strong>How to practise:</strong> 20 minutes a day beats 2 hours once a week. Here's what a session looks like:</p>
<p>• <strong>2 minutes</strong> — Scan your body. Release tension. Breathe.<br>
• <strong>5 minutes</strong> — Warm up. Chromatic exercise or finger stretches.<br>
• <strong>10 minutes</strong> — Work on one thing. A chord, a scale, a drill. One thing.<br>
• <strong>3 minutes</strong> — Play something you enjoy. Anything. Even open strings.</p>
<p>The key is <strong>consistency</strong>, not duration. Short daily sessions build myelin. Long weekly sessions build frustration.</p>
<p><strong>This fret is set. Step to fret 2: Music as Language.</strong></p>`
        }
      ]
    },

    // ═══ STEP 2 — MUSIC AS LANGUAGE ═══
    {
      id: 'f-music-language',
      num: '2',
      title: 'Music as Language',
      subtitle: 'Vocabulary, grammar, conversation, poetry.',
      micro: 'Music has words, rules, and dialogue — just like speech.',
      status: 'open',
      tags: ['Language', 'Concept'],
      sources: ['Kofi Agawu'],
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
          body: `<p>Remember the third barrier from Step 1? The misunderstood word?</p>
<p>In language learning, this is the #1 killer. If you're learning French and you don't understand what a "verb" is, every grammar lesson after that is gibberish.</p>
<p>Music works the same way. If someone says "play a major third" and you don't know what "major" or "third" means, you're lost. Not because you're bad at music — because one term was undefined.</p>
<p>That's why this simulator has a <strong>Dictionary</strong> in the toolbar. Every term, one click away. If you hit a word you don't know — stop. Look it up. Clear it. Then continue.</p>
<p>This isn't slow. This is the fastest way to learn.</p>`
        },
        {
          label: 'Own',
          title: 'This fret is set',
          body: `<p>You understand that music has vocabulary (notes), grammar (intervals, scales, chords), and conversation (playing). You know that listening comes before playing. You know to use the Dictionary when a word is unclear.</p>
<p>You now understand the shape of what you're learning. Not the details yet — the shape.</p>
<p><strong>This fret is set. Step to fret 3: The Musical Alphabet.</strong></p>`
        }
      ]
    },

    // ═══ STEP 3 — THE MUSICAL ALPHABET ═══
    {
      id: 'f-musical-alphabet',
      num: '3',
      title: 'The Musical Alphabet',
      subtitle: '12 notes. Half steps. Whole steps.',
      micro: 'The 12-note system and the intervals between them.',
      status: 'open',
      tags: ['Notes', 'Intervals', 'Theory'],
      sources: ['Michael P. Wolfsohn'],
      steps: [
        {
          label: 'Understand',
          title: 'The music alphabet',
          body: `<p>Music uses <strong>12 notes</strong>. That's it. Every song ever written, every chord, every melody — built from 12 sounds.</p>
<p>Their names are: <strong>A  A#  B  C  C#  D  D#  E  F  F#  G  G#</strong></p>
<p>Then it loops back to A. The "#" means "sharp" — one half step higher.</p>
<p>The regular notes (no sharps) are: <strong>A B C D E F G</strong></p>
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
          title: 'This fret is set',
          body: `<p>You know the 12 notes. You know the "short jumps" (B→C and E→F). You understand intervals — half steps and whole steps. You can feel the root — the home note.</p>
<p>This is the alphabet and basic grammar of music. Every scale, every chord, every melody is built from these pieces.</p>
<p><strong>This fret is set. Step to fret 4: Rhythm & Pulse.</strong></p>`
        }
      ]
    },

    // ═══ STEP 4 — RHYTHM & PULSE ═══
    {
      id: 'f-rhythm-pulse',
      num: '4',
      title: 'Rhythm & Pulse',
      subtitle: 'Beat, time, body, counting, movement.',
      micro: 'Feel the pulse. Count the space between notes.',
      status: 'open',
      tags: ['Rhythm', 'Time', 'Body'],
      sources: [],
      steps: [
        {
          label: 'Understand',
          title: 'The heartbeat of music',
          body: `<p>Imagine someone singing a beautiful melody. Now imagine the same melody with no timing — every note randomly spaced, some too long, some too short. It falls apart.</p>
<p><strong>Rhythm is what turns notes into music.</strong></p>
<p>Every piece of music has a pulse — a steady beat underneath, like a heartbeat. You can feel it in your chest when you listen to a song you like. Your foot starts tapping. That tapping? That's rhythm. Your body already knows how to do this.</p>
<p>The pulse is measured in <strong>beats</strong>. A beat is one steady tap — one unit of time. When you count "1, 2, 3, 4" along with a song, each number is a beat. The speed of those beats is called <strong>tempo</strong> — fast tempo means the beats come quickly, slow tempo means they're spaced out.</p>
<p>Music organises beats into <strong>bars</strong> (also called measures). The most common grouping is <strong>4/4 time</strong> — four steady beats in a bar. You've heard this a thousand times: "1, 2, 3, 4 — 1, 2, 3, 4 —" That repeating cycle of four is the foundation of most pop, rock, folk, and blues music.</p>
<p>Rhythm isn't just about the beats you play. It's also about the <strong>space between notes</strong>. A rest (silence) is just as important as a sound. The gap between notes is where groove lives — where music breathes.</p>`
        },
        {
          label: 'Experience',
          title: 'Feel it in your body',
          body: `<p>Rhythm isn't a concept. It's a physical thing. You have to feel it in your body before you can play it with your hands.</p>
<p><strong>Do this now — no guitar needed:</strong></p>
<p>1. Stand up or sit straight. Feet flat on the floor.</p>
<p>2. Start tapping your right foot. Steady. Not too fast. Just a comfortable pace.</p>
<p>3. While tapping, count out loud: <strong>"1... 2... 3... 4..."</strong></p>
<p>4. Keep going. Feel the pulse in your foot, hear it in your voice. Let them line up.</p>
<p>Now add your hands. <strong>Clap on each count.</strong> Foot taps, voice counts, hands clap — all on the same beat. This is your body being a rhythm section.</p>
<p>Try this: stop counting out loud, but keep tapping and clapping. Can you feel the "1" without saying it? The first beat of each group of four has a natural weight — it's the beat that feels like "home."</p>
<p>That heaviness on beat 1 is called the <strong>downbeat</strong>. It's what gives 4/4 its shape: <strong>ONE</strong>-two-three-four, <strong>ONE</strong>-two-three-four. The cycle restarts, and the body knows.</p>`
        },
        {
          label: 'Apply',
          title: 'One beat, one note',
          body: `<p>Pick up your guitar. We're going to combine rhythm with sound — one note per beat, counting out loud.</p>
<p><strong>Do this:</strong></p>
<p>1. Set a steady foot tap. Count "1, 2, 3, 4" out loud at a comfortable pace.</p>
<p>2. Play the <strong>open 6th string</strong> (the thickest one) once per beat. Pluck it on each count: 1 — pluck. 2 — pluck. 3 — pluck. 4 — pluck.</p>
<p>3. Keep the foot tapping. Keep counting. Keep the notes even — same length, same space between them.</p>
<p>Notice: you're not playing fast. You're playing <strong>steady</strong>. Steady is the goal. Speed is irrelevant right now. Evenness is everything.</p>
<p>If the notes start bunching up or spreading out, stop. Reset. Find the foot tap again. Start over. This is the work — not playing more notes, but playing notes that land exactly on the beat.</p>
<p>This is what professional musicians spend their whole lives refining. You're starting at the right place.</p>`
        },
        {
          label: 'Own',
          title: 'This fret is set',
          body: `<p>You now understand rhythm as the heartbeat of music — the steady pulse that holds everything together. You've felt it in your foot, your hands, your voice. You know that 4/4 means four steady beats in a bar, with the first beat carrying the weight.</p>
<p>You've played an open string on each beat, keeping time with your body. You know that the space between notes matters — rhythm is as much about silence as sound.</p>
<p>Rhythm is what turns notes into music. Without it, you have sounds. With it, you have a song.</p>
<p><strong>This fret is set. Step to fret 5: The Guitar Map.</strong></p>`
        }
      ]
    },

    // ═══ STEP 5 — THE GUITAR MAP ═══
    {
      id: 'f-guitar-map',
      num: '5',
      title: 'The Guitar Map',
      subtitle: 'Strings, frets, tab, octave, E/A highways.',
      micro: 'Navigate the fretboard like a map.',
      status: 'open',
      tags: ['Fretboard', 'Strings', 'Tuning'],
      sources: ['Fred Sokolow', 'Charles Kim'],
      steps: [
        {
          label: 'Understand',
          title: 'The fretboard map',
          body: `<p>The guitar has <strong>6 strings</strong> and usually <strong>19-24 frets</strong>. Each fret is one half step (remember Step 3?).</p>
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
<p>This is why guitar is powerful: once you learn a pattern in one position, you can move it anywhere.</p>`
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
<p>Play each one. Listen. They're all E — but different octaves.</p>
<p><strong>Reading tab:</strong> Guitar has its own notation called <em>tablature</em> (tab). Six lines represent the six strings. Numbers tell you which fret to press.</p>
<p style="font-family:var(--mono);color:var(--gold);font-size:0.8rem;line-height:1.8;text-align:center">e|---0---<br>B|---0---<br>G|---1---<br>D|---2---<br>A|---2---<br>E|---0---</p>
<p>Bottom line = thickest string (E). Top line = thinnest string (e). 0 = open. That's an E major chord. You just read your first tab.</p>`
        },
        {
          label: 'Own',
          title: 'This fret is set',
          body: `<p>You know the 6 string names and the memory trick. You know each fret is one half step. You know fret 12 is the octave. You can find one note on every string. You can read tab.</p>
<p>You speak the language of the fretboard.</p>
<p><strong>This fret is set. Step to fret 6: The Instrument Body.</strong></p>`
        }
      ]
    },

    // ═══ STEP 6 — THE INSTRUMENT BODY ═══
    {
      id: 'f-instrument-body',
      num: '6',
      title: 'The Instrument Body',
      subtitle: 'Parts, posture, tuning, care.',
      micro: 'Know the instrument before you play it.',
      status: 'open',
      tags: ['Guitar Parts', 'Anatomy', 'Tuning'],
      sources: ['Jamie Andreas', 'Christopher Parkening', 'Charles Kim'],
      steps: [
        {
          label: 'Understand',
          title: 'Know your instrument',
          body: `<p>The guitar has three main sections:</p>
<p><strong>Headstock</strong> — the top part with the tuning pegs (knobs). Each peg controls one string. Turn it to tighten (higher pitch) or loosen (lower pitch).</p>
<p><strong>Neck</strong> — the long part. The front is the <em>fretboard</em>. The metal strips across it are <em>frets</em>. The raised dots on the side are <em>position markers</em>.</p>
<p><strong>Body</strong> — the big part that makes the sound louder. On acoustic guitars, there's a round <em>sound hole</em>. On electric guitars, there are <em>pickups</em>.</p>
<p>Other parts: the <em>bridge</em> (where strings attach to the body), the <em>nut</em> (where strings rest at the top of the neck), and the <em>truss rod</em> (inside the neck, keeps it straight).</p>`
        },
        {
          label: 'Experience',
          title: 'The sound of the instrument',
          body: `<p>Before you play it, just listen to it.</p>
<p>Tap the body gently. Hear the resonance? That's the wood vibrating. The body is a resonance chamber — it takes the tiny vibration of a string and makes it loud enough to fill a room.</p>
<p>Now strum across all the strings with your thumb. Hear the sound? That's the guitar speaking.</p>
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
• Your right arm rests gently over the body<br>
• Your left hand holds the neck — thumb behind it, fingers curved</p>
<p>The guitar should feel <strong>supported, not clamped</strong>. If you're squeezing, you're doing it wrong.</p>
<p><strong>Thumb placement:</strong> your left thumb goes behind the neck, roughly opposite your middle finger. Use the pad (flat part), not the tip. Your hand forms a gentle C-shape.</p>
<p><strong>The capo:</strong> a clamp that goes across the neck at any fret. It raises the pitch of all strings by the same amount. You don't need one right now, but you'll know what it does when you see one.</p>`
        },
        {
          label: 'Own',
          title: 'This fret is set',
          body: `<p>You can name the main parts of the guitar. You know how to sit with it — supported, not clamped. You know the instrument. Now it's time to learn how to make it speak.</p>
<p><strong>This fret is set. Step to fret 7: Hands & Sound.</strong></p>`
        }
      ]
    },

    // ═══ STEP 7 — HANDS & SOUND ═══
    {
      id: 'f-hands-sound',
      num: '7',
      title: 'Hands & Sound',
      subtitle: 'Right hand, left hand, rest/free stroke, clean tone.',
      micro: 'Two hands, different jobs, one sound.',
      status: 'open',
      tags: ['Right Hand', 'Left Hand', 'Picking', 'Fretting'],
      sources: ['Jamie Andreas', 'Christopher Parkening'],
      steps: [
        {
          label: 'Understand',
          title: 'The two hands have different jobs',
          body: `<p>Guitar is the only instrument where your two hands do completely different things at the same time.</p>
<p><strong>Right hand</strong> (picking hand): creates the sound. It plucks, picks, or strums the strings.</p>
<p><strong>Left hand</strong> (fretting hand): changes the pitch. It presses strings against frets.</p>
<p>Neither hand alone makes music. They have to work <em>together</em>.</p>`
        },
        {
          label: 'Experience',
          title: 'Rest stroke vs free stroke',
          body: `<p>Your right hand has two basic strokes:</p>
<p><strong>Rest stroke</strong> — Push the string down toward the guitar body. Keep going until your finger rests on the next string. <em>Full, round, powerful</em> sound. Best for single notes.</p>
<p><strong>Free stroke</strong> — Pluck the string and let your finger come back up into the air. <em>Lighter, more open</em> sound. Best for faster passages.</p>
<p>Try both on the same string. Hear the difference? Rest stroke = bold. Free stroke = light.</p>`
        },
        {
          label: 'Apply',
          title: 'Fretting a note',
          body: `<p>Pick a string — any string, open. Now press down on fret 1 with your index finger. Where? <strong>Right behind the fret wire</strong> — not on top of it, not in the middle.</p>
<p>How hard? Just enough to make the note ring clean. If it buzzes, press harder. If your finger hurts, you're pressing too hard.</p>
<p>Now pick the string again. Hear the new note? You just changed the pitch by shortening the vibrating length of the string. That's what fretting is.</p>
<p>Play fret 1, then lift your finger and play open. Fret 1, open. Hear the difference? That's the half step from Step 3 — now in your hands.</p>`
        },
        {
          label: 'Own',
          title: 'This fret is set',
          body: `<p>You know the two strokes — rest stroke for power, free stroke for lightness. You know where to place your fretting finger and how hard to press.</p>
<p>You can make the guitar speak. One note at a time, clean and ringing.</p>
<p><strong>This fret is set. Step to fret 8: First Shapes.</strong></p>`
        }
      ]
    },

    // ═══ STEP 8 — FIRST SHAPES ═══
    {
      id: 'f-first-shapes',
      num: '8',
      title: 'First Shapes',
      subtitle: 'E major, simple chord grip, open/fret movement.',
      micro: 'From single notes to chords.',
      status: 'open',
      tags: ['Chords', 'E Major', 'Coordination'],
      sources: ['Jamie Andreas', 'Fred Sokolow'],
      steps: [
        {
          label: 'Understand',
          title: 'One note is not music. Two notes are.',
          body: `<p>You can make a clean note. Good. But music isn't one note — it's notes <em>moving</em>.</p>
<p>The moment you play one note, then another, you've created an <strong>interval</strong>. This is the DNA of melody.</p>
<p>The real skill isn't playing one note cleanly. It's moving from one note to the next <em>cleanly</em>.</p>`
        },
        {
          label: 'Experience',
          title: 'Walking up one string',
          body: `<p>Same string, one fret at a time:</p>
<p>Open → Fret 1 → Fret 2 → Fret 3 → Fret 4</p>
<p>Right hand picks each note. Left hand frets each one. One at a time. Slow and clean.</p>
<p>Now walk back down: Fret 4 → Fret 3 → Fret 2 → Fret 1 → Open</p>
<p>This is the fundamental movement of guitar — <strong>fingers moving along a string</strong>. Every scale, every riff, every melody is built from this.</p>`
        },
        {
          label: 'Apply',
          title: 'Your first chord: E major',
          body: `<p>An <strong>E major chord</strong> uses all six strings. It's the first chord most guitarists learn.</p>
<p style="font-family:var(--mono);color:var(--gold);font-size:0.8rem;line-height:1.8;text-align:center">e|---0---<br>B|---0---<br>G|---1---  (index, fret 1)<br>D|---2---  (middle, fret 2)<br>A|---2---  (ring, fret 2)<br>E|---0---</p>
<p><strong>Step by step:</strong></p>
<p>1. Index finger on fret 1 of the G string (3rd string).<br>
2. Middle finger on fret 2 of the D string (4th string).<br>
3. Ring finger on fret 2 of the A string (5th string).<br>
4. Strum all six strings with your thumb.</p>
<p>Does it ring? All six? If some buzz, adjust — make sure your fingers are arched and not touching the strings below them.</p>
<p>That sound — that's a chord. That's music. You just went from single notes to harmony.</p>`
        },
        {
          label: 'Own',
          title: 'This fret is set',
          body: `<p>You can walk up and down a string. You just played your first chord. Both hands working together — right hand creating sound, left hand changing pitch.</p>
<p><strong>This fret is set. Step to fret 9: First Conversation.</strong></p>`
        }
      ]
    },

    // ═══ STEP 9 — FIRST CONVERSATION ═══
    {
      id: 'f-first-conversation',
      num: '9',
      title: 'First Conversation',
      subtitle: 'Call and response, tiny riff, first musical sentence.',
      micro: 'Your first musical sentence.',
      status: 'open',
      tags: ['Coordination', 'Exercises', 'First Movements'],
      sources: ['Jamie Andreas', 'Christopher Parkening', 'Fred Sokolow'],
      steps: [
        {
          label: 'Understand',
          title: 'Music is dialogue',
          body: `<p>A conversation has two parts: saying something, and hearing a response. Music works the same way.</p>
<p>You play a phrase — a short musical sentence. Then you hear how it sounds in the room. Then you respond to it — with another phrase, a variation, or an answer.</p>
<p>This is called <strong>call and response</strong>. It's the oldest form of music. It's how humans have been making music for thousands of years.</p>`
        },
        {
          label: 'Experience',
          title: 'The call',
          body: `<p>Play this simple call:</p>
<p>Open G string → Fret 2 on G string → Open G string</p>
<p>That's three notes: home, up a step, back home. A tiny question.</p>
<p>Now listen to how it hangs in the air. It feels unfinished, doesn't it? Like a question waiting for an answer. That's the "call."</p>`
        },
        {
          label: 'Apply',
          title: 'The response',
          body: `<p>Now answer it. Play:</p>
<p>Open G string → Fret 4 on G string → Fret 2 on G string → Open G string</p>
<p>Four notes. A longer, more complete answer. It resolves. It feels finished.</p>
<p>You just played your first musical sentence: <strong>call → response</strong>. Question → answer. Tension → resolution.</p>
<p>This is the pattern behind every song. Every riff. Every solo. It all starts here.</p>`
        },
        {
          label: 'Own',
          title: 'Foundation complete',
          body: `<p>You can make a clean note. You can move between notes. You can walk up and down a string. You played your first chord. You played your first musical sentence — call and response.</p>
<p>Ten frets. The full threshold. You've walked the first neck path.</p>
<div style="background:var(--card);border:2px solid var(--gold);border-radius:8px;padding:16px;margin-top:16px;text-align:center">
  <div style="font-family:Cinzel,serif;color:var(--gold);font-size:0.9rem;font-weight:700;margin-bottom:4px">FOUNDATION COMPLETE</div>
  <p style="font-size:0.75rem;color:var(--dim);margin:0">Ten frets walked. The first neck path is behind you.<br>The Journey gate is open. Level 1 begins.</p>
</div>`
        }
      ]
    }
  ]
};

if (typeof window !== 'undefined') window.FOUNDATION = FOUNDATION;
