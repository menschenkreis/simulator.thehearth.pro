// ═══ CREATE NODE — MULTI-INGREDIENT COMBOS ═══
// When you mix multiple ingredients, the constraints combine.
// More ingredients = wilder, more exposing prompts.
// Combos are sorted by number of ingredients (2 → 5)

const CREATE_COMBOS = [

  // ───── 2 INGREDIENTS ─────

  {
    ingredients: ['lyrics', 'melody'],
    level: 2,
    constraint: 'Write the lyric first. Then find a melody that contradicts the mood.',
    prompt: 'Write an angry lyric. Now hum a lullaby over it. The tension between them is the song.',
    payoff: 'When words and melody fight, the listener has to choose which to believe. That\'s engagement.'
  },
  {
    ingredients: ['lyrics', 'riff'],
    level: 2,
    constraint: 'Write a riff. Then write words for it — but the riff came first.',
    prompt: 'Build a riff. Let it dictate the rhythm of the words. The riff is the boss. Your lyrics follow its rules.',
    payoff: 'Most songs start with words. You just started with instinct. The riff already knew what it wanted to say.'
  },
  {
    ingredients: ['lyrics', 'rhythm'],
    level: 2,
    constraint: 'Speak a paragraph out loud. That\'s your lyric. Now find its groove.',
    prompt: 'Talk for 30 seconds about anything. Record it. Listen back. The natural rhythm of your speech IS the song. Match it.',
    payoff: 'You\'ve been making music since you learned to speak. You just connected the two.'
  },
  {
    ingredients: ['lyrics', 'story'],
    level: 2,
    constraint: 'Write a true story. Then cut every line that isn\'t necessary.',
    prompt: 'Tell a story in 20 lines. Now cut it to 4. The 4 lines that survive are your song.',
    payoff: 'Compression reveals what matters. The lines you deleted were hiding the ones that needed to breathe.'
  },
  {
    ingredients: ['melody', 'riff'],
    level: 2,
    constraint: 'Play a riff. Sing a melody that ignores it entirely.',
    prompt: 'Play a riff in E. Sing a melody in A. Don\'t resolve the key clash. Let them coexist.',
    payoff: 'Two keys at once create a third harmonic world. You just built a chord out of conflict.'
  },
  {
    ingredients: ['melody', 'rhythm'],
    level: 2,
    constraint: 'Sing a melody. Clap a rhythm that doesn\'t match. Combine.',
    prompt: 'Hum a melody in 4/4. Clap a rhythm in 3/4. Now play both at once on guitar. The polyrhythm IS the song.',
    payoff: 'When two time signatures collide, something neither could alone emerges. That\'s groove.'
  },
  {
    ingredients: ['melody', 'story'],
    level: 2,
    constraint: 'Tell a story by singing — no words, just vowels.',
    prompt: 'Sing a story using only "ah," "oh," and "ee." The melody carries the narrative. No lyrics needed.',
    payoff: 'When language vanishes, melody becomes the storyteller. You just proved music predates words.'
  },
  {
    ingredients: ['riff', 'rhythm'],
    level: 2,
    constraint: 'Write a riff that IS a drum beat.',
    prompt: 'Muted strings = kick. Open strings = snare. Palm mute = hi-hat. Build a riff that\'s also a full drum pattern.',
    payoff: 'The guitar is a drum kit with pitch. You just unlocked both instruments at once.'
  },
  {
    ingredients: ['riff', 'story'],
    level: 2,
    constraint: 'Play a riff that sounds like a character. No melody. No words.',
    prompt: 'Think of someone you know. Play a riff that sounds like their personality. Not their music — them.',
    payoff: 'Riffs can carry character. You just turned a person into a motif. That\'s what theme songs actually are.'
  },
  {
    ingredients: ['rhythm', 'story'],
    level: 2,
    constraint: 'Tell a story through rhythm alone. No pitch. No words.',
    prompt: 'Mute all strings. Tell a story with strum patterns — quiet parts, loud parts, pauses, rushes. The rhythm carries the narrative.',
    payoff: 'Percussion is the oldest storytelling medium. You just went back to the beginning.'
  },

  // ───── 3 INGREDIENTS ─────

  {
    ingredients: ['lyrics', 'melody', 'riff'],
    level: 3,
    constraint: 'Write a riff. Sing a melody that fights it. Write lyrics that agree with neither.',
    prompt: 'The riff says one thing. The melody says another. The lyrics say something else entirely. Three voices, one song. Don\'t reconcile them.',
    payoff: 'When all three layers disagree, the listener has to assemble the meaning. That\'s how the best songs work — they make you work for it.'
  },
  {
    ingredients: ['lyrics', 'melody', 'rhythm'],
    level: 3,
    constraint: 'Record your heartbeat. Build everything on top.',
    prompt: 'Put your phone on your chest. Record the pulse. Loop it. Sing over it. Write words for it. The heartbeat is the foundation. Everything else is decoration.',
    payoff: 'You just built a song from your own body. That\'s as personal as music gets.'
  },
  {
    ingredients: ['lyrics', 'riff', 'story'],
    level: 3,
    constraint: 'Write a story in 3 parts. Each part gets a different riff.',
    prompt: 'Beginning riff. Middle riff. End riff. The riffs change the story. Write lyrics that connect them.',
    payoff: 'Riffs aren\'t loops — they\'re chapters. You just scored a narrative with guitar.'
  },
  {
    ingredients: ['melody', 'rhythm', 'story'],
    level: 3,
    constraint: 'Tell a story using only your voice and rhythm. No guitar.',
    prompt: 'Put the guitar down. Clap, stomp, hum, sing. Tell a story with your body. No instrument. Just you.',
    payoff: 'You are the instrument. The guitar was always optional. You just proved it.'
  },
  {
    ingredients: ['lyrics', 'melody', 'riff', 'rhythm'],
    level: 4,
    constraint: 'Record a loop with each layer one at a time. Never go back and change.',
    prompt: 'Layer 1: rhythm. Layer 2: riff. Layer 3: melody. Layer 4: words. Each layer is permanent. No editing. Build forward only.',
    payoff: 'Constraints breed creativity. You can\'t fix it — so you make it work. That\'s real production thinking.'
  },
  {
    ingredients: ['lyrics', 'melody', 'riff', 'story'],
    level: 4,
    constraint: 'Write a complete song in 10 minutes. All four layers. Finished is the goal.',
    prompt: 'Timer starts now. Riff first, then melody, then words, then story arc. Don\'t stop to think. Don\'t go back. Write forward.',
    payoff: 'Your first instinct was better than your perfectionism. You just wrote a song instead of thinking about writing one.'
  },
  {
    ingredients: ['melody', 'riff', 'rhythm', 'story'],
    level: 4,
    constraint: 'Build a song with no words. The melody IS the vocal.',
    prompt: 'No lyrics. No singing words. Hum, whistle, scat. Let the melody carry the emotion. Let the riff carry the attitude. Let rhythm carry the narrative.',
    payoff: 'When words vanish, every other element has to work harder. You just made the guitar speak without language.'
  },
  {
    ingredients: ['lyrics', 'rhythm', 'riff', 'story'],
    level: 4,
    constraint: 'Write a song where the rhythm changes the story.',
    prompt: 'Verse: slow, gentle rhythm. Chorus: aggressive, fast. The tempo shift IS the plot twist. The story changes because the rhythm changes.',
    payoff: 'Tempo is narrative. You just used speed as a storytelling device. That\'s film scoring thinking.'
  },
  {
    ingredients: ['lyrics', 'melody', 'rhythm', 'story'],
    level: 4,
    constraint: 'Write a song in a language you don\'t speak. Make up the words.',
    prompt: 'No real words. Gibberish. But the melody, rhythm, and story arc must still make sense. The emotion must land. No hiding behind "I don\'t know what I\'m saying."',
    payoff: 'If the feeling lands without language, you understand music at its deepest level. The words were never the point.'
  },
  {
    ingredients: ['lyrics', 'melody', 'riff', 'rhythm', 'story'],
    level: 5,
    constraint: 'ALL FIVE LAYERS. 5 minutes. No preparation. Go.',
    prompt: 'All five ingredients at once. 5 minutes. Hit record. Don\'t plan. Don\'t think. Just build. Whatever comes out IS the song.',
    payoff: 'You just bypassed every defense mechanism. This is what you sound like when you stop trying to be good. That\'s the most honest thing you\'ve ever made.'
  },
  {
    ingredients: ['lyrics', 'melody', 'riff', 'rhythm', 'story'],
    level: 5,
    constraint: 'ALL FIVE. Record it. Listen back. Find the one moment that\'s real. Build the whole song from that 3 seconds.',
    prompt: 'Record everything. Listen. Find the 3 seconds that made you feel something — even a flicker. Delete everything else. Build around those 3 seconds.',
    payoff: 'The song was always 3 seconds long. Everything else was scaffolding. You just found the real one.'
  },
  {
    ingredients: ['lyrics', 'melody', 'riff', 'rhythm', 'story'],
    level: 5,
    constraint: 'ALL FIVE. Play it for someone. Watch their face. The song is whatever made them react.',
    prompt: 'Play your song for someone — friend, stranger, anyone. Don\'t explain it. Watch their face. The moment they react? That\'s the real song.',
    payoff: 'Music isn\'t what you play — it\'s what lands. You just learned to listen with your eyes.'
  }

];

window.CREATE_COMBOS = CREATE_COMBOS;
