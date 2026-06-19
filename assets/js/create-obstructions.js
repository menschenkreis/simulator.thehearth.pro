// ═══ CREATE NODE — THE 5 OBSTRUCTIONS ═══
// Creative constraint challenges inspired by Lars von Trier's "The Five Obstructions"
// 50 provocations. Each one dares you to confront something you've been avoiding.

const CREATE_OBSTRUCTIONS = [

  // ───── LYRICS (10) ─────

  {
    level: 1,
    category: 'lyrics',
    constraint: 'Write about the last time you cried.',
    prompt: 'Write a verse about the last time you cried. You don\'t have to share it. But don\'t you dare pretty it up.',
    payoff: 'You just wrote something real. That feeling of vulnerability? That\'s the sound people want to hear.'
  },
  {
    level: 1,
    category: 'lyrics',
    constraint: 'No adjectives. No feelings words. Only what you can see.',
    prompt: 'Describe the room you\'re sitting in right now. No "beautiful," no "lonely." Just objects, light, and space. Let the feeling sneak in on its own.',
    payoff: 'When you stop telling people what to feel, they feel more. Images are Trojan horses for emotion.'
  },
  {
    level: 2,
    category: 'lyrics',
    constraint: 'Write a love song to someone you can\'t stand.',
    prompt: 'Pick someone who drives you crazy. Write them a love song. Not ironic — find the thing you actually admire. It\'s in there somewhere.',
    payoff: 'You just found empathy in a place you didn\'t expect. That\'s not just songwriting — that\'s growing up.'
  },
  {
    level: 2,
    category: 'lyrics',
    constraint: 'Every line has to contradict the one before it.',
    prompt: 'Write a verse where each line argues with the previous one. "I love you / I never think about you / I think about you constantly." Keep going.',
    payoff: 'Contradiction is where honesty lives. You contain multitudes. Now your songs do too.'
  },
  {
    level: 3,
    category: 'lyrics',
    constraint: '3 minutes. Write the thing you\'re most afraid to say out loud.',
    prompt: 'Set a timer. Write the sentence you\'ve been avoiding — the one that\'s too honest, too raw, too much. Start there. Build outward.',
    payoff: 'The thing you were most afraid to write is the thing most worth hearing. That\'s always how it works.'
  },
  {
    level: 3,
    category: 'lyrics',
    constraint: 'Write a chorus using only words a 6-year-old knows.',
    prompt: 'No complex vocabulary. If a first grader wouldn\'t say it, you can\'t use it. Make it hit like a freight train anyway.',
    payoff: 'Simple words carry the heaviest meanings. "I miss you" destroys a thousand clever metaphors.'
  },
  {
    level: 4,
    category: 'lyrics',
    constraint: 'Write a verse that makes you sound like the villain.',
    prompt: 'No redemption arc. No "but actually." Write the verse where you\'re the one who did the damage. Own it.',
    payoff: 'Every story has two sides. You just wrote yours. The truth is uglier — and more powerful — than the version you\'ve been telling.'
  },
  {
    level: 4,
    category: 'lyrics',
    constraint: 'Take the most embarrassing thing you\'ve ever written. Rewrite it seriously.',
    prompt: 'Find that old lyric — the one that makes you cringe. Take its core idea and write it again with everything you\'ve learned. No irony.',
    payoff: 'Your old self wasn\'t wrong — just unrefined. You just brought them back to life.'
  },
  {
    level: 5,
    category: 'lyrics',
    constraint: 'Write a song to the person you\'ll become in 10 years.',
    prompt: 'Address yourself a decade from now. What do you want to say? What do you hope they\'ve forgotten? What do you hope they remember?',
    payoff: 'You just had a conversation with your own future. That perspective changes what you write today.'
  },
  {
    level: 5,
    category: 'lyrics',
    constraint: 'One word. The whole lyric. Five different deliveries.',
    prompt: 'Pick one word — the word that matters most right now. Sing it five times. Each time, change everything except the word.',
    payoff: 'When nothing is left but delivery, you discover that YOU are the instrument. The word was never the point.'
  },

  // ───── MELODY (10) ─────

  {
    level: 1,
    category: 'melody',
    constraint: 'Sing before you play. Don\'t cheat.',
    prompt: 'Put the guitar down. Close your eyes. Hum something — anything. Don\'t judge it. Now pick up the guitar and find it.',
    payoff: 'Your voice writes melodies your fingers can\'t imagine. You just proved it.'
  },
  {
    level: 1,
    category: 'melody',
    constraint: 'Play the ugliest note on the guitar. Build around it.',
    prompt: 'Find the note that makes you wince. The one that sounds wrong, ugly, off. Now write a melody that makes it the most important note.',
    payoff: 'There are no wrong notes — only notes waiting for the right context. You just gave one a home.'
  },
  {
    level: 2,
    category: 'melody',
    constraint: 'Write a melody that sounds like someone leaving.',
    prompt: 'Don\'t think in notes. Think in the feeling of a door closing, a car pulling away. What does that sound like? Find it on the fretboard.',
    payoff: 'You translated an emotion directly into sound. That\'s not a technique — that\'s a superpower.'
  },
  {
    level: 2,
    category: 'melody',
    constraint: 'Start on a note that fights the chord.',
    prompt: 'Play any chord. Now sing a note that ISN\'T in it. Start your melody from that tension. Don\'t resolve it. Sit in the discomfort.',
    payoff: 'Tension is where the best melodies live. You just stopped avoiding it and started using it.'
  },
  {
    level: 3,
    category: 'melody',
    constraint: '90 seconds. No preparation. Record it.',
    prompt: 'Hit record. You have 90 seconds. No thinking, no planning. Play until the timer runs out. Whatever comes out stays.',
    payoff: 'Your best melody was hiding under your thinking mind. You just bypassed the censor.'
  },
  {
    level: 3,
    category: 'melody',
    constraint: 'Take your favorite melody. Play it as slowly as possible.',
    prompt: 'Slowed way, way down. Glacial. Where did the emotion go? Did it move? Did it change? Follow it.',
    payoff: 'Speed hides things. Slowness reveals them. You just heard your favorite song for the first time again.'
  },
  {
    level: 4,
    category: 'melody',
    constraint: 'Write a melody in a major key that feels like grief.',
    prompt: 'No minor chords. No cheating. Major key only. Make it ache. Make it sound like loss.',
    payoff: 'You just proved emotion isn\'t in the notes — it\'s in how you play them. Major can break your heart too.'
  },
  {
    level: 4,
    category: 'melody',
    constraint: 'Write two melodies that fight each other.',
    prompt: 'Compose two melody lines — one that comforts, one that provokes. Play them back to back. Don\'t let them agree.',
    payoff: 'Conflict is dramatic. You just built an argument out of notes. That tension is what makes people lean in.'
  },
  {
    level: 5,
    category: 'melody',
    constraint: 'One note. 60 seconds. Rhythm only. Tell a story.',
    prompt: 'Pick one note. Play it for a full minute. Everything else — dynamics, rhythm, attack, silence. Make it a narrative.',
    payoff: 'When pitch vanishes, everything else becomes visible. You just learned that rhythm IS melody.'
  },
  {
    level: 5,
    category: 'melody',
    constraint: 'Play only the notes you\'re afraid of.',
    prompt: 'Think about the notes you avoid — the ones that feel wrong, exposed, too much. Use only those. Make a piece from your fear.',
    payoff: 'Your comfort zone is a cage. You just made music out of what\'s outside it. That\'s where you actually live.'
  },

  // ───── RIFF (10) ─────

  {
    level: 1,
    category: 'riff',
    constraint: 'One string. One position. Make it nasty.',
    prompt: 'High E string, one fret position. No safe blues licks. Find something that sounds wrong — the kind of wrong that makes you want to hear it again.',
    payoff: 'Limitation didn\'t make you smaller. It made you sharper. The nastiest riff is the one that knows what it wants.'
  },
  {
    level: 1,
    category: 'riff',
    constraint: 'Steal a riff from a rhythm. Not from notes.',
    prompt: 'Don\'t touch the guitar. Tap a pattern on the body — knuckles, palm, fingertips. Now translate THAT to the strings.',
    payoff: 'Riffs aren\'t melodies — they\'re percussion in disguise. You just wrote one from the bones outward.'
  },
  {
    level: 2,
    category: 'riff',
    constraint: 'Happy notes. Hit them like you\'re furious.',
    prompt: 'Major scale only. But attack the strings like you\'re punishing them. Sweet notes, brutal hands. Let the contradiction scream.',
    payoff: 'The gap between what you play and how you play it is where your voice lives. You just found it.'
  },
  {
    level: 2,
    category: 'riff',
    constraint: 'Write a riff that sounds like a place you\'re scared of.',
    prompt: 'Think of somewhere that unsettles you — a memory, a building, a feeling. Don\'t describe it. Be it. In a riff.',
    payoff: 'You translated dread into six strings. That\'s what riffs are actually for — carrying what words can\'t.'
  },
  {
    level: 3,
    category: 'riff',
    constraint: '60 seconds. Three notes. Record. No second takes.',
    prompt: 'Three notes. One minute. Hit record and go. What you play is what stays. No fixing, no punching in.',
    payoff: 'Your first instinct was better than your second guess. You just learned to trust the take.'
  },
  {
    level: 3,
    category: 'riff',
    constraint: 'Write a riff you\'d be embarrassed to show your heroes.',
    prompt: 'The riff that feels too simple, too obvious, too dumb. Write it anyway. Play it with conviction. Own it completely.',
    payoff: 'The riff you were embarrassed by is the one that sounds most like YOU. Everyone else\'s riffs sound like everyone else.'
  },
  {
    level: 4,
    category: 'riff',
    constraint: 'Take a lullaby. Make it dangerous.',
    prompt: 'Hum a lullaby — any one. Now turn it into something that sounds like a threat. Same notes. Different everything else.',
    payoff: 'Context transforms everything. You just turned comfort into menace without changing a single note.'
  },
  {
    level: 4,
    category: 'riff',
    constraint: 'Two genres. One riff. No compromise.',
    prompt: 'Pick two genres that hate each other — punk and jazz, country and doom metal. Write one riff that belongs to both. Don\'t water down either.',
    payoff: 'Genres are cages. You just built a door between two of them. What came through doesn\'t sound like anything else.'
  },
  {
    level: 5,
    category: 'riff',
    constraint: 'Write a riff, then remove every note you\'re proud of.',
    prompt: 'Write your best riff. Now delete the clever part. Delete the flashy bit. Delete the part that proves you\'re good. What\'s left?',
    payoff: 'The parts you\'re proud of are usually the vanity. What\'s left after you strip the ego — that\'s the riff.'
  },
  {
    level: 5,
    category: 'riff',
    constraint: 'One note. One rhythm. You ARE the band.',
    prompt: 'Pick one note. Make the bass strings the kick drum, the high strings the snare. The riff carries its own rhythm section. No accompaniment needed.',
    payoff: 'When one note does everything, you understand everything about that note. You just became a full band with one string.'
  },

  // ───── RHYTHM (10) ─────

  {
    level: 1,
    category: 'rhythm',
    constraint: 'Tap your pulse. Build a groove from it.',
    prompt: 'Find your heartbeat. Tap it. Speed it up. Slow it down. Where does it become music? Play that rhythm on one chord.',
    payoff: 'Every rhythm is a heartbeat at a different speed. You just played yours.'
  },
  {
    level: 1,
    category: 'rhythm',
    constraint: 'Mute everything. Rhythm only. Then add one note.',
    prompt: 'Mute all six strings. Strum until it grooves — zero pitch, pure rhythm. When it feels good, let ONE string ring.',
    payoff: 'One note over a rhythm that breathes destroys a thousand notes over a dead beat. Feel comes first.'
  },
  {
    level: 2,
    category: 'rhythm',
    constraint: 'Play a groove that sounds like you\'re trying not to wake someone.',
    prompt: 'Imagine someone\'s sleeping in the next room. Play so quietly and so precisely that the groove breathes. Restraint is the point.',
    payoff: 'Dynamics aren\'t volume — they\'re intention. You just learned to play loud by playing soft.'
  },
  {
    level: 2,
    category: 'rhythm',
    constraint: 'Play a 3/4 pattern over a 4/4 strum.',
    prompt: 'Tap three. Strum four. Let them collide. Don\'t fix the mismatch — find where it clicks on its own.',
    payoff: 'When two rhythms fight, a third one emerges from the wreckage. That\'s polyrhythm. That\'s groove.'
  },
  {
    level: 3,
    category: 'rhythm',
    constraint: 'Say a sentence. That\'s your strum pattern.',
    prompt: 'Speak one sentence out loud — the first thing that comes to mind. The natural rhythm of those words IS your strum. Play it.',
    payoff: 'You\'ve been a rhythm player since you learned to talk. Speech IS groove. You just connected them.'
  },
  {
    level: 3,
    category: 'rhythm',
    constraint: 'Write a strum. Play it half speed. Don\'t change anything else.',
    prompt: 'Create a pattern you like. Now cut the tempo in half. Same pattern, same strings. Let the space terrify you.',
    payoff: 'Speed hides mistakes. Slowness reveals taste. The slow version was better. It usually is.'
  },
  {
    level: 4,
    category: 'rhythm',
    constraint: 'Map a drum kit onto your guitar.',
    prompt: 'Kick = bass strings. Snare = high strings. Hi-hat = muted strums. Build a full drum beat on guitar. Play it until it grooves.',
    payoff: 'The guitar is a drum kit that happens to have pitch. You just unlocked both instruments at once.'
  },
  {
    level: 4,
    category: 'rhythm',
    constraint: 'Play a groove that falls apart — then comes back together.',
    prompt: 'Start a strum pattern. Let it unravel — get messy, lose the beat. Then deliberately pull it back together. The breakdown IS the music.',
    payoff: 'Controlled chaos is a skill. You just learned that falling apart and coming back is more dramatic than never falling at all.'
  },
  {
    level: 5,
    category: 'rhythm',
    constraint: 'Play nothing for 8 bars. Then one hit.',
    prompt: 'Count eight bars of silence. Don\'t flinch. On beat one of bar nine, play one chord. One.',
    payoff: 'Silence isn\'t empty — it\'s pressure. That single chord after eight bars of nothing will hit harder than anything you\'ve ever played.'
  },
  {
    level: 5,
    category: 'rhythm',
    constraint: 'Same groove. Three speeds. Three completely different songs.',
    prompt: 'One strum pattern. Play it grieving, play it celebration, play it like you\'re running for your life. Same notes. Same pattern. Different everything.',
    payoff: 'Tempo isn\'t a setting — it\'s an emotion. You just played three songs from one idea.'
  },

  // ───── STORY (10) ─────

  {
    level: 1,
    category: 'story',
    constraint: 'Tell a true story. One verse. Real details only.',
    prompt: 'Something that happened today. Don\'t tell us how you felt — tell us what was on the table, what the light looked like, what was said.',
    payoff: '"I ate toast alone at 3am" hits harder than "I\'m lonely." Specificity is emotion\'s secret weapon.'
  },
  {
    level: 1,
    category: 'story',
    constraint: 'Write from the perspective of someone who hurt you.',
    prompt: 'Pick someone who caused you pain. Write a verse from inside their head. Not to forgive — to understand. What were they afraid of?',
    payoff: 'You just stepped inside someone else\'s skin. Songwriting became empathy. That\'s a door that doesn\'t close.'
  },
  {
    level: 2,
    category: 'story',
    constraint: 'Start at the end. Every line steps backwards.',
    prompt: 'Write the final moment first. Each line takes you one step back. By the end, we understand how it started.',
    payoff: 'Backwards stories make the audience lean in. They know where it\'s going — they just don\'t know how it got there.'
  },
  {
    level: 2,
    category: 'story',
    constraint: 'Tell two stories at once. Let them collide.',
    prompt: 'Odd lines: one story. Even lines: another. By the last line, they\'re the same story. Don\'t explain how — let the listener feel it.',
    payoff: 'Two stories create a third meaning in the space between them. That invisible third story? That\'s subtext.'
  },
  {
    level: 3,
    category: 'story',
    constraint: '5 minutes. A full life arc. Start to finish.',
    prompt: 'Set a timer. Write a song where a character changes — who they were, who they became, what broke in between. Finished is the goal.',
    payoff: 'You told a whole life in five minutes. Songs can hold entire novels. You just proved it.'
  },
  {
    level: 3,
    category: 'story',
    constraint: 'Write a scene, not a summary. Put us in the room.',
    prompt: 'Don\'t tell us what happened. Where are we? What\'s on the wall? What\'s the weather doing? What\'s not being said?',
    payoff: 'Scenes pull the listener inside the song. Summaries keep them outside looking in. You just opened the door.'
  },
  {
    level: 4,
    category: 'story',
    constraint: 'Same event. Two narrators. Two different truths.',
    prompt: 'Pick one moment — real or invented. Write two verses: one from each person. They remember it completely differently. Both think they\'re right.',
    payoff: 'Every story has sides. When you write both, you find the truth hiding in the gap between them.'
  },
  {
    level: 4,
    category: 'story',
    constraint: 'Take a myth everyone knows. Tell it from the loser\'s side.',
    prompt: 'Pick a fairy tale or legend. Write from the perspective of the villain, the monster, the one who lost. Give them a reason.',
    payoff: 'The best stories aren\'t about good and evil — they\'re about perspective. You just rewrote history.'
  },
  {
    level: 5,
    category: 'story',
    constraint: 'An entire life in four lines.',
    prompt: 'Four lines. Birth to death. Each line is a different age. Make each one feel like a whole chapter you had to skip.',
    payoff: 'Compression reveals what matters. When you can\'t waste a word, not a single one is wasted.'
  },
  {
    level: 5,
    category: 'story',
    constraint: 'No people. No characters. The room tells the story.',
    prompt: 'No "he," "she," "they." Only objects, weather, time of day, what\'s on the table, what\'s missing. Tell the whole story through absence.',
    payoff: 'A song without people isn\'t empty — it\'s haunted. The absence becomes the loudest character in the room.'
  }

];

window.CREATE_OBSTRUCTIONS = CREATE_OBSTRUCTIONS;
