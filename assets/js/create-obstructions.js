// Create Node - Obstructions
// 50 provocations inspired by the spirit of "The Five Obstructions."

const CREATE_OBSTRUCTIONS = [
 {
 level: 1,
 category: "lyrics",
 constraint: "Use one concrete memory you usually edit out. No metaphors until the final line.",
 prompt: "Write about the last time you cried and make it obvious what you were trying not to need.",
 payoff: "You find the lyric hiding under the version of yourself you perform for other people."
 },
 {
 level: 2,
 category: "lyrics",
 constraint: "Every line must sound tender, but the subject must be someone you resent.",
 prompt: "Write a love song to someone you cannot stand. Do not let yourself become cruel. That would be too easy.",
 payoff: "You discover whether your bitterness has a pulse, or only a costume."
 },
 {
 level: 3,
 category: "lyrics",
 constraint: "Set a timer for 3 minutes. Do not stop writing. Keep every line.",
 prompt: "Write the thing you are most afraid to say out loud, then rhyme it with something embarrassingly plain.",
 payoff: "The first honest line arrives before your taste has time to strangle it."
 },
 {
 level: 4,
 category: "lyrics",
 constraint: "Write a chorus that sounds celebratory while confessing something ugly.",
 prompt: "Make the hook feel like a victory chant for a mistake you still have not forgiven yourself for.",
 payoff: "You learn that a chorus can smile with blood in its teeth."
 },
 {
 level: 5,
 category: "lyrics",
 constraint: "One sentence only. Repeat it for the whole section, changing one word each time.",
 prompt: "Write the sentence you wish someone had said to you, then slowly corrupt it until it becomes what they actually said.",
 payoff: "You hear how repetition turns comfort into evidence."
 },
 {
 level: 1,
 category: "lyrics",
 constraint: "Name the room, the object, and the exact sentence you swallowed.",
 prompt: "Write about the moment you pretended you were fine and make the lie the title.",
 payoff: "The song starts where your pride wanted the scene to end."
 },
 {
 level: 2,
 category: "lyrics",
 constraint: "Alternate apology and accusation, line by line.",
 prompt: "Write to the person you hurt as if they are finally allowed to interrupt you.",
 payoff: "You find the melody of accountability before it turns into self-pity."
 },
 {
 level: 3,
 category: "lyrics",
 constraint: "90 seconds. No adjectives. No deleting.",
 prompt: "List what you miss, what you broke, and what you still want. Make the list sing.",
 payoff: "You learn that blunt nouns can cut deeper than beautiful language."
 },
 {
 level: 4,
 category: "lyrics",
 constraint: "Write in second person, but the 'you' is secretly yourself.",
 prompt: "Scold someone for the habit you hate most in your own reflection.",
 payoff: "The lyric becomes a mirror before you can pretend it is a portrait."
 },
 {
 level: 5,
 category: "lyrics",
 constraint: "Use the same four words for every line. Change only punctuation and delivery.",
 prompt: "Pick four words you are scared to mean. Sing them until they stop obeying you.",
 payoff: "You discover how little language needs before it starts telling on you."
 },

 {
 level: 1,
 category: "melody",
 constraint: "Use only three notes. One of them must feel like it does not belong.",
 prompt: "Write the melody of the apology you never gave, and let the wrong note be the truth leaking through.",
 payoff: "You hear the exact place where politeness fails."
 },
 {
 level: 2,
 category: "melody",
 constraint: "Make the contour rise while the emotional temperature falls.",
 prompt: "Write a melody that climbs like hope but lands like disappointment.",
 payoff: "You learn that direction and meaning can betray each other beautifully."
 },
 {
 level: 3,
 category: "melody",
 constraint: "2 minutes. Sing or play before you think. Record the first take.",
 prompt: "Make the sound your throat would make if you stopped trying to seem reasonable.",
 payoff: "The melody catches your instinct before your ego can comb its hair."
 },
 {
 level: 4,
 category: "melody",
 constraint: "Major key only. No minor chords. Keep the tempo gentle.",
 prompt: "Write a melody in a major key that feels like grief sitting upright at dinner.",
 payoff: "You find sadness that does not announce itself with dark clothes."
 },
 {
 level: 5,
 category: "melody",
 constraint: "One note for 60 seconds. Rhythm, silence, and dynamics only.",
 prompt: "Tell the whole story on one pitch. Make us know when you lied, begged, and gave up.",
 payoff: "You discover that melody is not escape from limitation. It is pressure made audible."
 },
 {
 level: 1,
 category: "melody",
 constraint: "Start on the note you usually avoid because it feels exposed.",
 prompt: "Write a melody that begins with the note you do not trust yourself to hold.",
 payoff: "The weak spot turns out to be a doorway, not a flaw."
 },
 {
 level: 2,
 category: "melody",
 constraint: "Use sweet intervals over a tense drone.",
 prompt: "Play something innocent over a note that refuses to forgive you.",
 payoff: "You hear how beauty changes when it has to share a room with dread."
 },
 {
 level: 3,
 category: "melody",
 constraint: "Four breaths only. Each breath gets one phrase.",
 prompt: "Pretend you have four chances to tell someone the truth before they leave.",
 payoff: "Your phrasing learns urgency without begging for decoration."
 },
 {
 level: 4,
 category: "melody",
 constraint: "Write a lullaby using sharp, angular leaps.",
 prompt: "Comfort someone with a melody that cannot stop flinching.",
 payoff: "You uncover tenderness that still remembers impact."
 },
 {
 level: 5,
 category: "melody",
 constraint: "Play only notes that feel ugly under your fingers. No resolving until the final second.",
 prompt: "Stay with the notes you are afraid of and make them confess why you avoid them.",
 payoff: "You stop treating discomfort as a wrong turn and start hearing it as weather."
 },

 {
 level: 1,
 category: "riff",
 constraint: "Use a shape that feels too simple for your pride.",
 prompt: "Write a riff about the part of you that wants applause for doing the minimum.",
 payoff: "You catch your ego trying to hide behind complexity."
 },
 {
 level: 2,
 category: "riff",
 constraint: "Palm-muted aggression, but the rhythm must feel hesitant.",
 prompt: "Write a riff that wants to start a fight but keeps checking if anyone is watching.",
 payoff: "You hear the difference between power and posturing."
 },
 {
 level: 3,
 category: "riff",
 constraint: "3 minutes. Two strings. No more than five frets.",
 prompt: "Write the riff you would play if you had to impress nobody and reveal everything.",
 payoff: "Your hands choose a truth before your taste committee arrives."
 },
 {
 level: 4,
 category: "riff",
 constraint: "Use a cheerful rhythm with a hostile interval.",
 prompt: "Make a riff that grins while it says something unforgivable.",
 payoff: "You learn how contradiction can make a groove feel dangerous."
 },
 {
 level: 5,
 category: "riff",
 constraint: "One fret position. No shifting. Bend, mute, scrape, choke, repeat.",
 prompt: "Stay trapped in one position until the riff starts sounding like a person cornered by their own choices.",
 payoff: "The limitation stops being a cage and becomes a confession booth."
 },
 {
 level: 1,
 category: "riff",
 constraint: "Use the string you neglect most.",
 prompt: "Write a riff on the string you treat like furniture and make it accuse you of ignoring it.",
 payoff: "The forgotten part of the instrument answers with more personality than expected."
 },
 {
 level: 2,
 category: "riff",
 constraint: "Make the riff heavy, but never let it land on beat one.",
 prompt: "Write the sound of wanting certainty and being denied it every bar.",
 payoff: "You feel how instability can hit harder than impact."
 },
 {
 level: 3,
 category: "riff",
 constraint: "60 seconds. Record three takes. Use the messiest one.",
 prompt: "Play like you are angry at the polished version of yourself.",
 payoff: "You discover which mistakes are actually fingerprints."
 },
 {
 level: 4,
 category: "riff",
 constraint: "Combine a nursery-rhyme rhythm with a dissonant rock shape.",
 prompt: "Write something childish that has clearly seen too much.",
 payoff: "The riff becomes uncanny because innocence and damage refuse to separate."
 },
 {
 level: 5,
 category: "riff",
 constraint: "No notes longer than a heartbeat. No silence shorter than a flinch.",
 prompt: "Make a riff out of panic, restraint, and the moment before a door slams.",
 payoff: "You learn that absence can be the loudest part of a riff."
 },

 {
 level: 1,
 category: "rhythm",
 constraint: "Clap or mute-strum the rhythm of a sentence you regret saying.",
 prompt: "Take the sentence back with rhythm only. No melody. No hiding in harmony.",
 payoff: "You hear the emotional accent you missed when you were defending yourself."
 },
 {
 level: 2,
 category: "rhythm",
 constraint: "Steady tempo, unstable accents.",
 prompt: "Build a groove that keeps its promises while quietly sabotaging them.",
 payoff: "You learn how betrayal can happen without speeding up."
 },
 {
 level: 3,
 category: "rhythm",
 constraint: "2 minutes. Tap first, analyze later.",
 prompt: "Make the rhythm of your nervous system when you are waiting for a reply that matters too much.",
 payoff: "The body writes the groove before the brain can make it flattering."
 },
 {
 level: 4,
 category: "rhythm",
 constraint: "Dance rhythm, funeral pacing. Keep both alive.",
 prompt: "Write a groove for people who are trying to celebrate while pretending nothing ended.",
 payoff: "You find the ache inside movement."
 },
 {
 level: 5,
 category: "rhythm",
 constraint: "One muted string. 60 seconds. Tell a full story using attack, silence, and velocity.",
 prompt: "No pitch. No chord. Make us hear the argument anyway.",
 payoff: "You discover that rhythm can expose character without a single note."
 },
 {
 level: 1,
 category: "rhythm",
 constraint: "Use the pulse of your own name spoken with disappointment.",
 prompt: "Turn the way someone once said your name into a groove.",
 payoff: "The rhythm reveals what memory kept in its mouth."
 },
 {
 level: 2,
 category: "rhythm",
 constraint: "Make the right hand confident and the left hand doubtful.",
 prompt: "Play a rhythm where one hand believes the story and the other hand knows better.",
 payoff: "You feel split intention become music instead of confusion."
 },
 {
 level: 3,
 category: "rhythm",
 constraint: "45 seconds. Start too sparse. Add only when embarrassment forces you.",
 prompt: "Let silence make you uncomfortable, then refuse to rescue it too soon.",
 payoff: "You learn how much fear you have been filling with noise."
 },
 {
 level: 4,
 category: "rhythm",
 constraint: "Use a lullaby tempo with interruption accents.",
 prompt: "Write the rhythm of trying to sleep while one thought keeps kicking the door.",
 payoff: "The groove teaches you that peace can have bruises."
 },
 {
 level: 5,
 category: "rhythm",
 constraint: "No repeating pattern until the final bar.",
 prompt: "Avoid comfort for as long as you can. When the pattern finally arrives, make it feel earned and suspicious.",
 payoff: "You discover whether resolution comforts you or exposes how desperate you were for it."
 },

 {
 level: 1,
 category: "story",
 constraint: "Three scenes only: before, during, after. No explanation.",
 prompt: "Tell the story of the day you realized someone did not see you the way you hoped.",
 payoff: "You find the wound by refusing to narrate around it."
 },
 {
 level: 2,
 category: "story",
 constraint: "The narrator must defend themselves and incriminate themselves at the same time.",
 prompt: "Tell the story of a choice you still justify, but let the music disagree with you.",
 payoff: "The song becomes the witness your memory tried to discredit."
 },
 {
 level: 3,
 category: "story",
 constraint: "5 minutes. Write the outline, then immediately play the first motif.",
 prompt: "Tell the story you keep making funny because straight honesty would cost too much.",
 payoff: "The joke falls away and leaves the pulse underneath."
 },
 {
 level: 4,
 category: "story",
 constraint: "Happy ending music, unresolved story.",
 prompt: "Score a scene where everyone says it is fine and absolutely nobody believes it.",
 payoff: "You learn that closure is sometimes just a chord wearing a mask."
 },
 {
 level: 5,
 category: "story",
 constraint: "One note, one object, one confession. 60 seconds.",
 prompt: "Choose an object in the room and make it tell the truth you have been dodging.",
 payoff: "The smallest detail becomes unbearable because it stops letting you generalize."
 },
 {
 level: 1,
 category: "story",
 constraint: "Use a memory you would rather make vague. Keep the names out, keep the details in.",
 prompt: "Write the scene where you knew you should leave, apologize, or speak, and did not.",
 payoff: "The music starts exactly where avoidance became a decision."
 },
 {
 level: 2,
 category: "story",
 constraint: "The guitar must sound loyal while the narrator admits betrayal.",
 prompt: "Tell a betrayal story without making yourself the villain or the victim. Stay in the more frightening middle.",
 payoff: "You find a human being where a cleaner story wanted a monster."
 },
 {
 level: 3,
 category: "story",
 constraint: "3 minutes. First person. Present tense. No backstory.",
 prompt: "Put yourself back in the moment you wish you could redo and play what the room sounded like.",
 payoff: "Instinct brings back details shame tried to blur."
 },
 {
 level: 4,
 category: "story",
 constraint: "Use a comic groove for a humiliating confession.",
 prompt: "Tell the story of your smallest, pettiest jealousy and make it catchy enough to indict you.",
 payoff: "The laugh opens the trapdoor under your self-image."
 },
 {
 level: 5,
 category: "story",
 constraint: "No plot. Only sensation, rhythm, and one repeated image.",
 prompt: "Make a piece about the feeling you keep intellectualizing because feeling it directly would be too honest.",
 payoff: "You stop explaining the wound and let it make sound."
 }
];

if(typeof window !== "undefined") window.CREATE_OBSTRUCTIONS = CREATE_OBSTRUCTIONS;
if(typeof module !== "undefined") module.exports = CREATE_OBSTRUCTIONS;
