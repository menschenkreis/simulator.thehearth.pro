// ═══ CREATE NODE — MULTI-INGREDIENT COMBOS ═══
// When ingredients collide, the truth lives in the impact.
// More ingredients = more exposure. More tension. Less room to hide.

const CREATE_COMBOS = [

  // ───── 2 INGREDIENTS (10) ─────

  {
    ingredients: ['lyrics', 'melody'],
    level: 2,
    constraint: 'The melody must mean the opposite of the words. No winking. No irony. Both faces must be sincere.',
    prompt: 'Write an apology you do not mean, then sing it like the threat the lyric is too polite to make out loud.',
    payoff: 'You learn that a melody can confess what the lyrics are still dressing up for company.'
  },
  {
    ingredients: ['lyrics', 'riff'],
    level: 2,
    constraint: 'Every time the lyric reaches toward something honest, the riff must interrupt. The riff is the part of you that refuses to talk about it.',
    prompt: 'Start a confession and let the riff cut you off before the sentence lands. Try again. Get cut off again. The interruption is the song.',
    payoff: 'You discover that the thing you cannot say is louder than anything you managed to.'
  },
  {
    ingredients: ['lyrics', 'rhythm'],
    level: 2,
    constraint: 'Build the rhythm of the worst conversation you have ever had, then trap the lyric inside it.',
    prompt: 'Make the groove sound like the silence after someone says "fine" and means the opposite. Write the words that live in that silence.',
    payoff: 'You feel the shape of an argument survive long after the voices stopped, still occupying the room.'
  },
  {
    ingredients: ['lyrics', 'story'],
    level: 2,
    constraint: 'Tell the story you have been editing for sympathy. Then write the lyric that undoes every revision.',
    prompt: 'Play the version of the story you stopped telling because it made you look worse than the other person.',
    payoff: 'The song becomes the version of you that did not get to choose the lighting.'
  },
  {
    ingredients: ['melody', 'riff'],
    level: 2,
    constraint: 'Write a riff that sounds like it is holding a grudge. Sing a melody above it that acts like nothing happened. Neither acknowledges the other.',
    prompt: 'Make the riff and the melody sit at the same dinner table after the fight, both pretending the other is not there.',
    payoff: 'You hear two musical voices maintain a lie more convincingly than one could alone.'
  },
  {
    ingredients: ['melody', 'rhythm'],
    level: 2,
    constraint: 'The melody must rush as if panicking. The rhythm must drag as if exhausted. They collide once per bar and that collision is the point.',
    prompt: 'Write the sound of wanting to run and being unable to leave, happening inside the same measure.',
    payoff: 'You feel two opposing pulses make a groove out of being stuck, and realize so can you.'
  },
  {
    ingredients: ['melody', 'story'],
    level: 2,
    constraint: 'No words. The melody alone must narrate a confession. Every phrase change is a new chapter.',
    prompt: 'Hum the story of the thing you did that you keep calling "no big deal." Make "no big deal" sound like exactly what it is.',
    payoff: 'Without language to hide behind, the melody tells on you before the first phrase is over.'
  },
  {
    ingredients: ['riff', 'rhythm'],
    level: 2,
    constraint: 'One muted string and one open string. That is the whole vocabulary. The pattern of attacks is the pattern of the story.',
    prompt: 'Build something that sounds like a door being knocked on by someone you are hoping will leave.',
    payoff: 'You discover that hesitation has a groove and it is the most honest rhythm you know.'
  },
  {
    ingredients: ['riff', 'story'],
    level: 2,
    constraint: 'Play the same riff three times. Each repetition must shift the story from innocent, to suspicious, to damning. Same notes. Different truth.',
    prompt: 'Write a riff that starts as an alibi and ends as a confession without changing a single note.',
    payoff: 'You learn that repetition is not comfort — it is cross-examination, and the riff eventually cooperates with the prosecution.'
  },
  {
    ingredients: ['rhythm', 'story'],
    level: 2,
    constraint: 'No pitch. No words. Only attack, velocity, and silence. The listener must be able to tell when the story turns.',
    prompt: 'Make us hear the exact moment the room went quiet after someone said too much. Then make us hear who left first.',
    payoff: 'You discover that silence has a tempo and it is the most damning witness in the room.'
  },

  // ───── 3 INGREDIENTS (8) ─────

  {
    ingredients: ['lyrics', 'melody', 'riff'],
    level: 3,
    constraint: 'The riff says one thing. The melody says another. The lyrics agree with neither. Three voices, one song. Do not reconcile them.',
    prompt: 'Write a song where the riff is jealous, the melody is relieved, and the lyric is still in love. Let the listener figure out which one is lying.',
    payoff: 'When three layers disagree, the truth stops being a single note and becomes the friction between them.'
  },
  {
    ingredients: ['lyrics', 'melody', 'rhythm'],
    level: 3,
    constraint: 'The rhythm must sound like your body when you are pretending to be calm. The melody must sound like what is underneath. The lyric connects both without admitting which is real.',
    prompt: 'Build a groove that performs composure while the melody panics beneath it. Write the lyric that knows which version is true and will not say.',
    payoff: 'You learn that the body keeps its own time signature and it does not match the face you brought to the room.'
  },
  {
    ingredients: ['lyrics', 'riff', 'story'],
    level: 3,
    constraint: 'Write one lyric. Play it over three different riffs: one that pities you, one that mocks you, one that forgives you. Same words each time. Different person each time.',
    prompt: 'The riff is the narrator now. Your lyrics are just the evidence it keeps rearranging.',
    payoff: 'You discover that the accompaniment was always the storyteller, and the words were just the excuse it needed to speak.'
  },
  {
    ingredients: ['melody', 'riff', 'rhythm'],
    level: 3,
    constraint: 'No lyrics. The riff must carry the argument, the rhythm must carry the stakes, and the melody must carry the thing no one is saying out loud.',
    prompt: 'Build an instrumental that sounds like two people who love each other arguing about something neither will name.',
    payoff: 'Without a single word, you made the listener pick a side. That is what arrangement does when it stops being decoration.'
  },
  {
    ingredients: ['lyrics', 'melody', 'story'],
    level: 3,
    constraint: 'Tell a story you have been making funny because the straight version would cost too much. The melody must refuse the joke. The lyric must try to keep telling it.',
    prompt: 'Write the comedic version of your most painful story while the melody plays it dead straight. By the final line the humor must collapse and the melody must be the one still standing.',
    payoff: 'The laugh dies in your throat and what is left is the pulse of something you have been deflecting for years.'
  },
  {
    ingredients: ['lyrics', 'rhythm', 'story'],
    level: 3,
    constraint: 'The rhythm must accelerate through the entire piece. The story must escalate with it. The lyric must keep up or get swallowed.',
    prompt: 'Start at a heartbeat. End at a sprint. The story goes from "it was nothing" to the thing you have been running from, with no permission to slow down.',
    payoff: 'You learn what happens when the groove stops letting you set the pace of your own confession.'
  },
  {
    ingredients: ['melody', 'rhythm', 'story'],
    level: 3,
    constraint: 'No lyrics. The melody must move through three emotional states without pausing. The rhythm must mark each transition like a door slamming.',
    prompt: 'Play the arc of the last time you forgave someone you should not have. The melody is the forgiveness. The rhythm is the part of you that knew better. Neither wins.',
    payoff: 'You told a complete story with pitch and pulse alone. Language was never the thing carrying the meaning.'
  },
  {
    ingredients: ['riff', 'rhythm', 'story'],
    level: 3,
    constraint: 'Write a riff that mutates every four bars. The rhythm must track the mutation. The story is why the riff cannot stay the same.',
    prompt: 'Write a riff that starts confident and ends unrecognizable. The rhythm changes because the riff changes because the story changes because you changed.',
    payoff: 'You watch a musical idea lose its composure in real time and realize it is mirroring you.'
  },

  // ───── 4 INGREDIENTS (6) ─────

  {
    ingredients: ['lyrics', 'melody', 'riff', 'rhythm'],
    level: 4,
    constraint: 'Layer each element one at a time. Rhythm first, riff second, melody third, lyrics last. Each layer is permanent. No editing. No going back.',
    prompt: 'Build forward only. The first layer is your instinct. The last layer is your courage. Whatever you lay down is what you keep.',
    payoff: 'You learn the distance between the version you plan and the version that is true. The true one arrived first and waited for you to catch up.'
  },
  {
    ingredients: ['lyrics', 'melody', 'riff', 'story'],
    level: 4,
    constraint: 'Write a complete song in 8 minutes. The story must be true. The riff must sound like it disagrees. The melody must not commit. The lyrics must try anyway.',
    prompt: 'Set a timer. Build a riff that contradicts the story. Sing a melody that sounds unsure it has the right. Write the lyric before the timer makes the decision for you.',
    payoff: 'The deadline strips out every defense mechanism and what is left is the version of the song that did not need your permission to exist.'
  },
  {
    ingredients: ['lyrics', 'melody', 'rhythm', 'story'],
    level: 4,
    constraint: 'No riff. No instrumental hook. The rhythm and melody must carry everything. The story must be about a time you confused attention for love.',
    prompt: 'Write the groove of performing for someone whose approval you mistook for care. Let the melody sag under the weight. Let the lyric name what was actually happening underneath the show.',
    payoff: 'You hear the exact moment the song stops performing and starts breathing. That moment is why the song exists.'
  },
  {
    ingredients: ['lyrics', 'riff', 'rhythm', 'story'],
    level: 4,
    constraint: 'No melody. The riff must do the melodic work. The rhythm must do the emotional work. The lyric must do the confessional work. The story must survive all three.',
    prompt: 'Write the story of the last time you confused being needed with being wanted. No melody to soften the room — the riff is a raw nerve and the rhythm is a heartbeat counting down.',
    payoff: 'You discover that removing the most beautiful element does not make the song ugly. It makes it honest.'
  },
  {
    ingredients: ['melody', 'riff', 'rhythm', 'story'],
    level: 4,
    constraint: 'No lyrics. The melody must function as the vocal. The riff must function as the conscience. The rhythm must function as the body. The story must be about something you would never put in words.',
    prompt: 'Build an instrumental about the thing you would never write in a lyric. The melody carries the confession, the riff carries the guilt, the rhythm carries the attempt to look fine.',
    payoff: 'You made an audience feel a secret without a single word. The absence of language became the most honest instrument in the room.'
  },
  {
    ingredients: ['lyrics', 'melody', 'riff', 'story'],
    level: 4,
    constraint: 'Write the same story twice. First pass: you are the victim. Second pass: you are the villain. Same riff, same melody. Only the lyrics change. Play them back to back.',
    prompt: 'Tell on yourself. The first pass will feel like justice. The second pass will feel like honesty. The riff sounds different the second time even though it is identical.',
    payoff: 'The same music under different words becomes a different room. You learn that perspective does not just change the story — it changes the furniture.'
  },

  // ───── 5 INGREDIENTS (8) ─────

  {
    ingredients: ['lyrics', 'melody', 'riff', 'rhythm', 'story'],
    level: 5,
    constraint: 'ALL FIVE. Five minutes. No preparation. Hit record before you are ready.',
    prompt: 'All five ingredients at once. Do not plan. Do not think. Build whatever comes. The version that exists before your taste committee arrives is the only version that matters.',
    payoff: 'You just bypassed every filter you own. This is what you sound like when you stop curating yourself, and it is either the best or the most honest thing you have ever made.'
  },
  {
    ingredients: ['lyrics', 'melody', 'riff', 'rhythm', 'story'],
    level: 5,
    constraint: 'ALL FIVE. Write a song about someone in the room. Do not name them. Make it impossible to tell if it is a love song or an accusation.',
    prompt: 'The riff must hover between tender and threatening. The melody must sound like longing and surveillance at once. The lyric must read as devotion or indictment depending on the listener\'s guilt.',
    payoff: 'You wrote a song that changes meaning based on who hears it. That is not ambiguity. That is a mirror disguised as music.'
  },
  {
    ingredients: ['lyrics', 'melody', 'riff', 'rhythm', 'story'],
    level: 5,
    constraint: 'ALL FIVE. Every 30 seconds, strip one element. End with only the lyric and silence.',
    prompt: 'Start with everything. Remove layers until only the words remain, naked, over nothing. The order you choose to remove things reveals what you think is carrying the song — and you will be wrong.',
    payoff: 'The song teaches you what it was actually about by taking away everything it was hiding behind.'
  },
  {
    ingredients: ['lyrics', 'melody', 'riff', 'rhythm', 'story'],
    level: 5,
    constraint: 'ALL FIVE. The song must sound like a celebration. The story must be a eulogy. The disconnect must feel unbearable, not clever.',
    prompt: 'Make a party out of a funeral. The riff dances. The rhythm bounces. The melody soars. The lyric buries someone. Nobody at the party knows there is a body under the floor.',
    payoff: 'You learn that joy and grief share a skeleton and the groove is the only thing keeping both of them upright.'
  },
  {
    ingredients: ['lyrics', 'melody', 'riff', 'rhythm', 'story'],
    level: 5,
    constraint: 'ALL FIVE. Record the full song. Listen back. Find the one moment — three seconds or less — that is completely unguarded. Delete everything else.',
    prompt: 'The rest of the song was a disguise. The three seconds where your guard dropped are the only part that was actually you. Rebuild the entire song around that moment until it becomes the foundation.',
    payoff: 'You learn the song was always three seconds long. Everything else was scaffolding you built to avoid the real part.'
  },
  {
    ingredients: ['lyrics', 'melody', 'riff', 'rhythm', 'story'],
    level: 5,
    constraint: 'ALL FIVE. Play it for someone. Watch their face. The moment they react is the hook. Rebuild the song around that reaction.',
    prompt: 'Do not explain the song. Do not preface it. Play it and watch. The listener\'s body will tell you what the song is about before your intellect can intervene.',
    payoff: 'Music is not what you play — it is what lands. You just learned to edit with someone else\'s nervous system instead of your own ego.'
  },
  {
    ingredients: ['lyrics', 'melody', 'riff', 'rhythm', 'story'],
    level: 5,
    constraint: 'ALL FIVE. Each element must take a turn being completely silent. When the riff drops, the lyric must say what the riff was hiding. When the lyric drops, the melody must carry the confession alone. Rotate through all five.',
    prompt: 'Every element gets a solo moment and an absence. The silences are not breaks — they are the element speaking through what the others do in the space it left behind.',
    payoff: 'You learn that what you remove teaches the listener more than what you add, and the gaps became the most articulate part of the arrangement.'
  },
  {
    ingredients: ['lyrics', 'melody', 'riff', 'rhythm', 'story'],
    level: 5,
    constraint: 'ALL FIVE. Write the song you are most afraid someone you love will hear. No softening. No coding. No hiding behind metaphor.',
    prompt: 'Specific names, specific rooms, specific silences. The riff must sound like a door you are closing for the last time. The melody must sound like the last time you said their name out loud. The lyric must be too clear to deny.',
    payoff: 'The most dangerous song is the one that cannot be mistaken for metaphor. You just wrote one, and it knows where you live.'
  }

];

if(typeof window !== "undefined") window.CREATE_COMBOS = CREATE_COMBOS;
if(typeof module !== "undefined") module.exports = CREATE_COMBOS;
