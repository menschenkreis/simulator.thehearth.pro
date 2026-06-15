// Create Node — Write, Arrange, Record
// Sources: Rooksby (How to Write Songs), Fisher (Chord Melody & Improvisation)

const CREATE = {
  id: 'create',
  title: 'Create',
  tag: 'KNOWING PATH',
  description: 'Write your own music. Arrange songs for solo guitar. Record yourself. The student becomes the creator.',
  sources: [
    'Rikky Rooksby — How to Write Songs on Guitar (Miller Freeman Books, 2000)',
    'Jody Fisher — Mastering Jazz Guitar: Chord Melody (Alfred Publishing)',
    'Jody Fisher — Mastering Jazz Guitar: Improvisation (Alfred Publishing)'
  ],

  categories: [
    {
      id: 'songwriting',
      title: 'Songwriting',
      icon: '',
      description: 'From first chord progression to finished song. The craft of writing music on guitar.',
      topics: [
        {
          id: 'first-song',
          title: 'Your First Song — Start With 3 Chords',
          difficulty: 1,
          source: 'Rooksby Ch.1-3',
          body: `<p>You don't need music theory to write a song. You need 3 chords and something to say.</p>
<p><strong>Step 1:</strong> Pick a key. G major is friendly — G, C, D, Em are all easy chords.</p>
<p><strong>Step 2:</strong> Choose a progression. The most used progressions in pop music:<br>
• G → C → D → G (I-IV-V-I) — classic rock<br>
• G → Em → C → D (I-vi-IV-V) — pop ballad<br>
• Em → C → G → D (vi-IV-I-V) — emotional pop</p>
<p><strong>Step 3:</strong> Strum a rhythm. Doesn't need to be fancy. Down-down-up-up-down-up works for almost everything.</p>
<p><strong>Step 4:</strong> Hum a melody over the chords. Don't think about it. Let your voice find something. Record it on your phone.</p>
<p><strong>Step 5:</strong> Add words. The melody suggests words. What does the melody feel like? Happy? Sad? Write words that match.</p>
<div class="lp-callout">
  <div class="lp-co-title">THE SECRET</div>
  <p>Every songwriter starts with bad songs. Write 10 bad songs to get to 1 good one. The craft is in the doing, not the knowing. Start now, refine later.</p>
</div>`
        },
        {
          id: 'chord-progressions',
          title: 'Chord Progressions That Work',
          difficulty: 2,
          source: 'Rooksby Ch.3-4',
          body: `<p>Chord progressions are the skeleton of a song. Here are the progressions that power thousands of hits:</p>
<p><strong>The "Axis of Awesome" (I-V-vi-IV):</strong><br>
G → D → Em → C — works in every key. Used by: Let It Be, No Woman No Cry, Someone Like You, With or Without You.</p>
<p><strong>The "50s Progression" (I-vi-IV-V):</strong><br>
C → Am → F → G — doo-wop, rock and roll, Bruno Mars.</p>
<p><strong>The "Andalusian Cadence" (i-VII-VI-V):</strong><br>
Am → G → F → E — flamenco, metal, Hotel California.</p>
<p><strong>The "ii-V-I" (jazz engine):</strong><br>
Dm7 → G7 → Cmaj7 — the foundation of jazz. Every jazz standard uses this at least once.</p>
<p><strong>Making it your own:</strong> These are starting points. Substitute chords, change the rhythm, add a passing chord, put it in a minor key. The progression is the clay — you shape it.</p>`
        },
        {
          id: 'song-structure-writing',
          title: 'Song Structure — Building the Journey',
          difficulty: 2,
          source: 'Rooksby Ch.5',
          body: `<p>A song is a journey. Structure is the map:</p>
<p><strong>Verse:</strong> Tells the story. Same chords each time, different words. Builds anticipation.</p>
<p><strong>Chorus:</strong> The hook. The part everyone sings along to. Usually higher energy, simpler words, repeated.</p>
<p><strong>Bridge:</strong> The surprise. Different chords, different melody. Breaks the pattern, creates contrast. Usually appears once, after the second chorus.</p>
<p><strong>Intro/Outro:</strong> The door in and out. Can be instrumental, can be a chorus, can be something unique.</p>
<p><strong>Common structures:</strong><br>
• Verse-Chorus-Verse-Chorus (simple, effective)<br>
• Verse-Chorus-Verse-Chorus-Bridge-Chorus (most pop/rock)<br>
• Verse-Verse-Bridge-Verse (folk, Bob Dylan style)</p>
<div class="lp-callout">
  <div class="lp-co-title">THE BRIDGE RULE</div>
  <p>If your song feels like it's going nowhere after the second chorus, it needs a bridge. The bridge should feel like a departure — different chords, different energy — then the chorus returns and feels like coming home.</p>
</div>`
        }
      ]
    },
    {
      id: 'arranging',
      title: 'Arranging for Solo Guitar',
      icon: '',
      description: 'Play melody, harmony, and bass simultaneously. The art of chord melody.',
      topics: [
        {
          id: 'chord-melody-intro',
          title: 'Chord Melody — Melody + Chords Together',
          difficulty: 3,
          source: 'Fisher — Chord Melody',
          body: `<p>Chord melody is playing the melody and the chords at the same time on one guitar. It's how jazz guitarists play solo — and it sounds like a whole band.</p>
<p><strong>The concept:</strong> Take a melody note. Find a chord that contains that note. Play the chord with the melody note on top. Move to the next melody note. Repeat.</p>
<p><strong>Example — first phrase of "Autumn Leaves":</strong><br>
• Melody: C → Play Cmaj9 voicing (melody C on top)<br>
• Melody: B → Play G7 voicing (melody B on top)<br>
• Melody: A → Play Am7 voicing (melody A on top)<br>
• Melody: G → Play Dm7 voicing (melody G on top)</p>
<p>Each chord is chosen because it contains the melody note AND provides the correct harmony. This is arranging — choosing which voicings support the melody.</p>
<p><strong>Start simple:</strong> Take a melody you know (Twinkle Twinkle, Happy Birthday). Find the melody on the high strings. Add bass notes on the low strings. Fill in the middle with chord tones. That's chord melody.</p>`
        }
      ]
    },
    {
      id: 'recording',
      title: 'Recording Yourself',
      icon: '',
      description: 'Capture your playing. Listen back. Improve. Share.',
      topics: [
        {
          id: 'home-recording-basics',
          title: 'Home Recording — Getting Started',
          difficulty: 1,
          source: 'General knowledge',
          body: `<p>You don't need expensive gear to record yourself. Here's the minimum viable setup:</p>
<p><strong>Option 1: Phone recording</strong><br>
• Use your phone's voice memo app<br>
• Place the phone 1-2 feet from the guitar soundhole<br>
• Good enough for practice tracking and sharing ideas</p>
<p><strong>Option 2: USB interface</strong><br>
• A Focusrite Scarlett Solo (~$100) plugs into your computer<br>
• Connect guitar directly or use a microphone<br>
• Free software: GarageBand (Mac), Audacity (all platforms)<br>
• This is what most home studios use</p>
<p><strong>Why record yourself:</strong><br>
• You hear mistakes you don't notice while playing<br>
• You can track progress over weeks/months<br>
• You can layer parts (rhythm + lead + bass)<br>
• You can share your music with others</p>
<div class="lp-callout">
  <div class="lp-co-title">THE HONEST MIRROR</div>
  <p>Recording is the most honest feedback tool. When you play, your brain fills in what you THINK you sound like. The recording shows what you ACTUALLY sound like. This gap is where growth lives.</p>
</div>`
        }
      ]
    }
  ]
};

window.CREATE = CREATE;
