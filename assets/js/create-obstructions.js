// ═══ CREATE NODE — THE 5 OBSTRUCTIONS ═══
// Creative constraint challenges inspired by Lars von Trier's "The Five Obstructions"
// Each prompt forces creativity through restriction. The fewer tools you have, the more each one matters.

const CREATE_OBSTRUCTIONS = [

  // ───── LYRICS ─────

  {
    level: 1,
    category: 'lyrics',
    constraint: 'Every line starts with the same word.',
    prompt: 'Write a verse where every line begins with "and." Let the repetition build momentum.',
    payoff: 'Repetition isn\'t boring — it\'s a engine. The word disappears and the lines take over.'
  },
  {
    level: 1,
    category: 'lyrics',
    constraint: 'No adjectives allowed. Nouns and verbs only.',
    prompt: 'Write a verse describing where you are right now. No adjectives. No "beautiful," no "dark," no "sad."',
    payoff: 'Strong verbs do the work of ten adjectives. You\'ll never go back.'
  },
  {
    level: 2,
    category: 'lyrics',
    constraint: 'Write something joyful. Then play it in a minor key.',
    prompt: 'Write the happiest lyric you can — then play it in a minor key. Let the contradiction happen.',
    payoff: 'Happy words over sad music create something neither can alone. That tension is yours.'
  },
  {
    level: 2,
    category: 'lyrics',
    constraint: 'Borrow every line from a different source.',
    prompt: 'Open three books to random pages. Take one line from each. Stitch them into a verse that makes sense.',
    payoff: 'Found poetry. The meaning lives in the gaps between stolen lines.'
  },
  {
    level: 3,
    category: 'lyrics',
    constraint: '3 minutes. One topic. No rhyming.',
    prompt: 'Set a timer for 3 minutes. Write about the last thing you ate. No rhymes allowed — find the rhythm elsewhere.',
    payoff: 'Rhyme is a crutch. Without it, you discover rhythm and imagery you didn\'t know you had.'
  },
  {
    level: 3,
    category: 'lyrics',
    constraint: 'Write a chorus in exactly 20 words.',
    prompt: 'You have 20 words. Not 19, not 21. Make a chorus that sticks. Count carefully.',
    payoff: 'Constraints breed precision. Every word earns its place or gets cut.'
  },
  {
    level: 4,
    category: 'lyrics',
    constraint: 'Take a conversation you overheard. Make it a love song.',
    prompt: 'Think of a conversation you weren\'t part of. Use the exact words. Turn it into a love song.',
    payoff: 'Real speech has a rhythm songwriters never invent. You just learned to hear it.'
  },
  {
    level: 4,
    category: 'lyrics',
    constraint: 'Write a verse that works forwards and backwards.',
    prompt: 'Write a verse where the last line also works as a first line. Read it backwards — it should still mean something.',
    payoff: 'Circular writing creates lyrics people return to. That\'s what a hook actually is.'
  },
  {
    level: 5,
    category: 'lyrics',
    constraint: 'One word. That\'s your entire lyric.',
    prompt: 'Pick one word. Sing it differently five times — five different meanings from the same word.',
    payoff: 'When you strip everything away, delivery becomes everything. You are the instrument.'
  },
  {
    level: 5,
    category: 'lyrics',
    constraint: 'Write a song with no "I" in it.',
    prompt: 'No first person. No "I," "me," "my," "mine." Write about someone else entirely.',
    payoff: 'Most songs are mirrors. This one\'s a window. Different muscle, same heart.'
  },

  // ───── MELODY ─────

  {
    level: 1,
    category: 'melody',
    constraint: 'Sing before you play.',
    prompt: 'Put the guitar down. Hum a melody — any melody. Pick up the guitar and find what you hummed.',
    payoff: 'Your voice writes melodies your fingers never would. They come from a different place.'
  },
  {
    level: 1,
    category: 'melody',
    constraint: 'Build a melody from a scale you never use.',
    prompt: 'Pick a scale you\'ve avoided. Find a melody hiding inside it. Play it slowly until it sounds like yours.',
    payoff: 'Unfamiliar notes force unfamiliar melodies. Your comfort zone just got bigger.'
  },
  {
    level: 2,
    category: 'melody',
    constraint: 'Start on a note that clashes with the chord.',
    prompt: 'Play any chord. Hum a note that ISN\'T in it. Start your melody from that tension.',
    payoff: 'Wrong notes are just right notes with better timing. Tension is where melodies live.'
  },
  {
    level: 2,
    category: 'melody',
    constraint: 'Melody moves only by steps — then one leap.',
    prompt: 'Write a melody that only moves one note at a time. At the very end, jump somewhere unexpected.',
    payoff: 'Steps create calm. One leap creates drama. You now control both.'
  },
  {
    level: 3,
    category: 'melody',
    constraint: '2 minutes. Three notes only.',
    prompt: 'Set a timer. Pick any three notes. In 2 minutes, find a melody that makes someone lean in.',
    payoff: 'Three notes gave you more melody than twelve would have. Less choosing, more listening.'
  },
  {
    level: 3,
    category: 'melody',
    constraint: 'Steal a melody from a song you dislike.',
    prompt: 'Think of a melody you can\'t stand. Play it on your guitar. Now change it until you love it.',
    payoff: 'You just learned what makes a melody work — by fixing one that doesn\'t.'
  },
  {
    level: 4,
    category: 'melody',
    constraint: 'Nursery rhyme melody. Blues phrasing.',
    prompt: 'Take a nursery rhyme melody. Play it with blues timing — bend the notes, drag the rhythm.',
    payoff: 'Two worlds collided. What came out doesn\'t belong to either one. That\'s called original.'
  },
  {
    level: 4,
    category: 'melody',
    constraint: 'Reverse a melody you already wrote.',
    prompt: 'Take the last melody you wrote. Play it backwards — last note first. Build a new melody around the reversal.',
    payoff: 'Your own music, heard fresh. The ending was the beginning all along.'
  },
  {
    level: 5,
    category: 'melody',
    constraint: 'One note. Every variation is rhythmic.',
    prompt: 'Pick one note. Play it for 60 seconds. Change only the rhythm. Make it tell a story.',
    payoff: 'When pitch disappears, rhythm takes over completely. You\'ll never underestimate timing again.'
  },
  {
    level: 5,
    category: 'melody',
    constraint: 'Melody with no rests. Then the same melody with only rests.',
    prompt: 'Play a continuous melody — no breaks. Then play the same notes but only the silences between them. Two versions.',
    payoff: 'The spaces between notes aren\'t empty. They\'re the melody you didn\'t know you were writing.'
  },

  // ───── RIFF ─────

  {
    level: 1,
    category: 'riff',
    constraint: 'One string. One position.',
    prompt: 'Use only the high E string. Stay in one fret position. Find a riff that makes your head nod.',
    payoff: 'Limitation is a filter. What\'s left after you strip everything away is the thing that matters.'
  },
  {
    level: 1,
    category: 'riff',
    constraint: 'Riff from a rhythm, not notes.',
    prompt: 'Don\'t touch the guitar. Tap a rhythm on the body. Now translate that pattern to any notes you like.',
    payoff: 'Riffs aren\'t notes — they\'re rhythm wearing a note costume. You just pulled the mask off.'
  },
  {
    level: 2,
    category: 'riff',
    constraint: 'Happy notes, aggressive playing.',
    prompt: 'Play a major scale. But hit the strings like you\'re angry. Bright notes, brutal attack.',
    payoff: 'Tone and notes pull in opposite directions sometimes. That tension is a sound nobody else has.'
  },
  {
    level: 2,
    category: 'riff',
    constraint: 'Use only harmonics.',
    prompt: 'Write a riff entirely in natural harmonics. No fretted notes. Let the guitar ring.',
    payoff: 'Harolics force you to listen differently. The guitar becomes a different instrument.'
  },
  {
    level: 3,
    category: 'riff',
    constraint: '60 seconds. Thinnest string only.',
    prompt: 'You have 60 seconds. Make a riff using only the high E string. Record it. Go.',
    payoff: 'Speed kills overthinking. Your best ideas live below the noise of doubt.'
  },
  {
    level: 3,
    category: 'riff',
    constraint: 'Three notes. Two strings. One octave.',
    prompt: 'Pick three notes across two strings. Find every possible riff hiding in those constraints.',
    payoff: 'A great riff isn\'t about how many notes — it\'s about how many ways they connect.'
  },
  {
    level: 4,
    category: 'riff',
    constraint: 'Take a vocal melody. Make it a riff.',
    prompt: 'Hum a melody you know — any song. Play it on one string as a riff. Now speed it up 2x.',
    payoff: 'Vocal melodies become completely different creatures when you hand them to a guitar.'
  },
  {
    level: 4,
    category: 'riff',
    constraint: 'Two genres. One riff.',
    prompt: 'Combine a punk rhythm with a jazz note choice. Or country notes with metal picking. Pick two worlds.',
    payoff: 'Genres are just suggestions. When you smash them together, you find the cracks where new sounds live.'
  },
  {
    level: 5,
    category: 'riff',
    constraint: 'One note. One rhythm pattern. Make it a riff.',
    prompt: 'Pick one note. Play it with one repeating rhythm pattern. Add dynamics — loud, soft, ghost notes.',
    payoff: 'A riff with one note and total dynamic control hits harder than a fifty-note shred fest.'
  },
  {
    level: 5,
    category: 'riff',
    constraint: 'Riff that\'s also the drum part.',
    prompt: 'Write a riff where the bass notes are the kick drum and the high notes are the snare. The riff IS the groove.',
    payoff: 'When the riff carries its own rhythm section, you don\'t need a band. You are the band.'
  },

  // ───── RHYTHM ─────

  {
    level: 1,
    category: 'rhythm',
    constraint: 'Tap first. Play second.',
    prompt: 'Tap a rhythm on your knee for 30 seconds. Don\'t think. Find the best 4 beats. Play them on one chord.',
    payoff: 'Your body knows rhythms your hands haven\'t learned yet. Tap in, play out.'
  },
  {
    level: 1,
    category: 'rhythm',
    constraint: 'One note. All rhythm.',
    prompt: 'Play one note — any note. Make four different rhythms from it. Which one makes you move?',
    payoff: 'Rhythm isn\'t what you play. It\'s when you don\'t play. The rests are the riff.'
  },
  {
    level: 2,
    category: 'rhythm',
    constraint: 'Play a 3/4 pattern in 4/4 time.',
    prompt: 'Tap a pattern in 3. Now fit it over a 4/4 strum. Let the mismatch create the groove.',
    payoff: 'When two rhythms fight, a third one appears. That\'s polyrhythm, and it\'s how grooves are born.'
  },
  {
    level: 2,
    category: 'rhythm',
    constraint: 'Muted strings only. Then add one note.',
    prompt: 'Mute all strings. Strum a rhythm with zero pitch. When it grooves, let one string ring.',
    payoff: 'One note over a tight rhythm hits harder than a full chord over a sloppy one. Feel first.'
  },
  {
    level: 3,
    category: 'rhythm',
    constraint: '3 minutes. Build a groove from a heartbeat.',
    prompt: 'Tap your own heartbeat rhythm. Speed it up, slow it down. Find where it becomes music. Build a strum pattern around it.',
    payoff: 'Every rhythm is a heartbeat at a different speed. You just found yours.'
  },
  {
    level: 3,
    category: 'rhythm',
    constraint: 'Write a rhythm. Now play it twice as slow.',
    prompt: 'Create a strum pattern you like. Now play it at half speed without changing the notes. Feel the space.',
    payoff: 'Speed hides mistakes. Slowness reveals taste. The slow version is usually better.'
  },
  {
    level: 4,
    category: 'rhythm',
    constraint: 'Transfer a drum beat to guitar.',
    prompt: 'Imagine a drum pattern — kick, snare, hi-hat. Map it to guitar: bass strings for kick, high strings for snare, muted strums for hats.',
    payoff: 'Guitar is a drum kit in disguise. You just learned to play both at once.'
  },
  {
    level: 4,
    category: 'rhythm',
    constraint: 'Rhythm from words.',
    prompt: 'Say a sentence out loud. The natural rhythm of the words IS your strum pattern. Play it.',
    payoff: 'Language has groove built in. You\'ve been a rhythm player since you learned to talk.'
  },
  {
    level: 5,
    category: 'rhythm',
    constraint: 'Play nothing for 8 bars. Then one hit.',
    prompt: 'Strum nothing for 8 full bars. Count them. Then play one chord on the first beat of bar 9.',
    payoff: 'Silence is the most powerful rhythm tool you have. That one hit will sound enormous.'
  },
  {
    level: 5,
    category: 'rhythm',
    constraint: 'Same groove at three different speeds.',
    prompt: 'Create one strum pattern. Play it slow, medium, and fast. Same pattern — three completely different feelings.',
    payoff: 'Tempo isn\'t a setting. It\'s a creative choice that changes everything about a song.'
  },

  // ───── STORY ─────

  {
    level: 1,
    category: 'story',
    constraint: 'Tell a true story in one verse.',
    prompt: 'Something that happened to you today — one verse, no chorus. Real details. No "feelings," just what happened.',
    payoff: 'Specific stories hit harder than general ones. "I ate toast alone" beats "I\'m lonely" every time.'
  },
  {
    level: 1,
    category: 'story',
    constraint: 'Write from someone else\'s perspective.',
    prompt: 'Pick a person — real or fictional. Write a verse from their point of view. What do they see that you don\'t?',
    payoff: 'Stepping outside yourself unlocks characters you didn\'t know you had. Songwriting becomes acting.'
  },
  {
    level: 2,
    category: 'story',
    constraint: 'Start at the end. Tell the story backwards.',
    prompt: 'Write a verse that starts with how things ended up. Each line takes you one step further back.',
    payoff: 'Backwards stories create suspense. The audience knows the destination but not the path.'
  },
  {
    level: 2,
    category: 'story',
    constraint: 'Tell two stories at once.',
    prompt: 'Write a verse where odd lines tell one story and even lines tell another. They should collide by the end.',
    payoff: 'Two parallel stories create a third meaning in the space between them. That\'s subtext.'
  },
  {
    level: 3,
    category: 'story',
    constraint: '5 minutes. A full story arc in one song.',
    prompt: 'Set a timer for 5 minutes. Write a song with a beginning, middle, and end. A character changes. Something happens.',
    payoff: 'Story structure isn\'t for novelists. Songs can hold entire arcs in 90 seconds.'
  },
  {
    level: 3,
    category: 'story',
    constraint: 'Write a scene, not a summary.',
    prompt: 'Don\'t tell us what happened — put us in the room. Where are we? What\'s on the table? What\'s the light like?',
    payoff: 'Scenes pull listeners inside the song. Summaries keep them outside. You just learned the difference.'
  },
  {
    level: 4,
    category: 'story',
    constraint: 'Same event. Two different narrators.',
    prompt: 'Pick one event. Write two verses — one from each person involved. They remember it completely differently.',
    payoff: 'Every story has sides. When you write both, you find the truth hiding between them.'
  },
  {
    level: 4,
    category: 'story',
    constraint: 'Take a myth or fairy tale. Make it personal.',
    prompt: 'Pick a story everyone knows. Tell it as if it happened to you. What does it feel like from the inside?',
    payoff: 'Old stories are templates. When you inhabit them, they become new again.'
  },
  {
    level: 5,
    category: 'story',
    constraint: 'An entire life in four lines.',
    prompt: 'Four lines. Birth to death. Every line is a different age. Make each one feel like a whole chapter.',
    payoff: 'Compression reveals what matters. When you can\'t waste a word, none of them are wasted.'
  },
  {
    level: 5,
    category: 'story',
    constraint: 'Write a song with no people in it.',
    prompt: 'No characters. No "he," "she," "they." Only place, weather, objects, time. Tell the story through the room.',
    payoff: 'A song without people isn\'t empty — it\'s haunted. The absence becomes the main character.'
  }
];

window.CREATE_OBSTRUCTIONS = CREATE_OBSTRUCTIONS;
