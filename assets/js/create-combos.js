// Create Node - Combo Obstructions
// 32 multi-ingredient provocations where creative elements collide.

const CREATE_COMBOS = [
 {
 ingredients: ["lyrics", "melody"],
 level: 2,
 constraint: "The lyric must apologize while the melody refuses to sound sorry.",
 prompt: "Write an apology that keeps trying to become a victory lap. Do not let either side win cleanly.",
 payoff: "You hear remorse and pride wrestling in the same mouth."
 },
 {
 ingredients: ["riff", "rhythm"],
 level: 2,
 constraint: "The riff must sound heavy, but the rhythm must keep dodging the downbeat.",
 prompt: "Make the sound of someone acting fearless while refusing to stand still long enough to be seen.",
 payoff: "You learn that swagger can limp if you listen below the distortion."
 },
 {
 ingredients: ["story", "lyrics"],
 level: 2,
 constraint: "Tell a humiliating story, but every lyric line must pretend it is no big deal.",
 prompt: "Write the scene you still joke about because naming the hurt would make the room too quiet.",
 payoff: "The punchline cracks and the real confession breathes through it."
 },
 {
 ingredients: ["melody", "rhythm"],
 level: 2,
 constraint: "The melody must beg for calm while the rhythm keeps interrupting it.",
 prompt: "Write the sound of trying to self-soothe while your pulse is calling you a liar.",
 payoff: "You discover that panic can wear a beautiful tune and still shake."
 },
 {
 ingredients: ["lyrics", "riff"],
 level: 2,
 constraint: "The lyric must be tender; the riff must sound like it wants to smash the furniture.",
 prompt: "Say something kind over a guitar part that clearly does not trust kindness.",
 payoff: "You find the bruise under the compliment."
 },
 {
 ingredients: ["story", "rhythm"],
 level: 2,
 constraint: "The story moves forward, but the groove keeps dragging one foot in the past.",
 prompt: "Tell the story of leaving while the rhythm keeps returning to the moment you should have left sooner.",
 payoff: "You hear how memory turns progress into a loop."
 },
 {
 ingredients: ["melody", "riff"],
 level: 2,
 constraint: "The melody must forgive; the riff must keep receipts.",
 prompt: "Write a part where one voice lets go and the other voice refuses to stop reading the evidence.",
 payoff: "You learn that resolution can be interrupted by a grudge with good timing."
 },
 {
 ingredients: ["lyrics", "rhythm"],
 level: 2,
 constraint: "The words must confess; the rhythm must keep making excuses.",
 prompt: "Write the sentence you owe someone, then set it to a groove that keeps trying to charm its way out.",
 payoff: "You hear accountability arrive with its collar crooked."
 },
 {
 ingredients: ["story", "melody"],
 level: 2,
 constraint: "The story must get uglier as the melody gets sweeter.",
 prompt: "Score the moment you realized you were not innocent, and make it sound almost pretty.",
 payoff: "You learn that sweetness can indict you better than darkness."
 },
 {
 ingredients: ["riff", "story"],
 level: 2,
 constraint: "The riff repeats like denial while the story reveals one new shame each pass.",
 prompt: "Build a loop for the lie you told yourself, then let the verses slowly prove it false.",
 payoff: "The riff becomes a locked door that keeps failing to stay shut."
 },

 {
 ingredients: ["lyrics", "melody", "rhythm"],
 level: 3,
 constraint: "Three minutes. The lyric admits fear, the melody reaches upward, and the rhythm keeps stumbling.",
 prompt: "Write the sound of saying 'I am fine' while every musical part files a complaint.",
 payoff: "You catch the body testifying against the sentence."
 },
 {
 ingredients: ["lyrics", "riff", "story"],
 level: 3,
 constraint: "The story must be specific, the lyric must avoid names, and the riff must point at the guilty person anyway.",
 prompt: "Tell the scene without naming them. Make the guitar less polite than you are.",
 payoff: "You discover that an instrument can gossip more honestly than language."
 },
 {
 ingredients: ["melody", "riff", "rhythm"],
 level: 3,
 constraint: "The melody wants to float, the riff wants to drag, and the rhythm gets 90 seconds to choose neither.",
 prompt: "Make a piece that sounds like being pulled between leaving and staying until the floor gets tired.",
 payoff: "You learn that indecision has its own gravity."
 },
 {
 ingredients: ["story", "lyrics", "rhythm"],
 level: 3,
 constraint: "Every new story detail must force the rhythm to drop or add an accent.",
 prompt: "Tell the story of a secret getting heavier in real time.",
 payoff: "The groove becomes a nervous witness that cannot sit still."
 },
 {
 ingredients: ["riff", "melody", "lyrics"],
 level: 3,
 constraint: "The riff mocks the lyric, while the melody secretly believes it.",
 prompt: "Write a line you are embarrassed to mean, then surround it with guitar parts that argue about whether you deserve it.",
 payoff: "You hear self-contempt fail to kill longing."
 },
 {
 ingredients: ["rhythm", "story", "riff"],
 level: 3,
 constraint: "Two minutes. The rhythm must rush, the riff must stay stubborn, and the story must happen in one room.",
 prompt: "Write the soundtrack to waiting for someone to say the thing that would ruin the evening.",
 payoff: "You learn how suspense sounds when nothing moves except the pulse."
 },
 {
 ingredients: ["lyrics", "melody", "story"],
 level: 3,
 constraint: "The lyric lies, the story exposes the lie, and the melody must stay loyal to both.",
 prompt: "Sing about being over it while the scene proves you are absolutely not over it.",
 payoff: "You discover that contradiction can be more truthful than confession."
 },
 {
 ingredients: ["rhythm", "melody", "lyrics"],
 level: 3,
 constraint: "The rhythm is a dare, the melody is a flinch, and the lyric must not explain either.",
 prompt: "Write the moment before you admit you want something too much.",
 payoff: "The song stands at the edge and lets desire make the noise."
 },

 {
 ingredients: ["lyrics", "melody", "riff", "rhythm"],
 level: 4,
 constraint: "Major key only. The lyric grieves, the melody smiles, the riff threatens, and the rhythm keeps dancing.",
 prompt: "Write a funeral that everyone is pretending is a party.",
 payoff: "You learn that a chorus can smile with blood in its teeth."
 },
 {
 ingredients: ["lyrics", "story", "riff", "rhythm"],
 level: 4,
 constraint: "The story confesses betrayal, the lyric asks for sympathy, the riff refuses mercy, and the rhythm will not slow down.",
 prompt: "Make a piece where your excuse keeps getting chased by the thing you actually did.",
 payoff: "The groove turns self-defense into a crime scene."
 },
 {
 ingredients: ["melody", "story", "riff", "rhythm"],
 level: 4,
 constraint: "The melody must comfort, the story must humiliate, the riff must itch, and the rhythm must stay almost too neat.",
 prompt: "Score the memory that still makes you physically cringe, but dress it like it came prepared.",
 payoff: "You find elegance sweating through its shirt."
 },
 {
 ingredients: ["lyrics", "melody", "story", "rhythm"],
 level: 4,
 constraint: "The lyric is one sentence, the story is three scenes, the melody cannot resolve, and the rhythm repeats like a bad habit.",
 prompt: "Write about the pattern you keep calling a phase.",
 payoff: "The piece stops being about what happened and starts pointing at what keeps happening."
 },
 {
 ingredients: ["lyrics", "melody", "riff", "story"],
 level: 4,
 constraint: "The lyric forgives, the story does not, the melody reaches for grace, and the riff keeps dragging the body back.",
 prompt: "Write the sound of deciding to move on before the wound has agreed.",
 payoff: "You hear forgiveness as weather, not a verdict."
 },
 {
 ingredients: ["melody", "riff", "rhythm", "story"],
 level: 4,
 constraint: "The rhythm must feel childish, the riff must feel dangerous, the melody must feel lonely, and the story must refuse nostalgia.",
 prompt: "Write a childhood memory that turns the lights on halfway through and ruins the cute version.",
 payoff: "Innocence stops being decoration and becomes evidence."
 },

 {
 ingredients: ["lyrics", "melody", "riff", "rhythm", "story"],
 level: 5,
 constraint: "One room, one secret, one note you avoid, one rhythm you cannot relax into, one lyric you wish was not yours.",
 prompt: "Build the piece around the exact thing you usually edit out so people will still like you.",
 payoff: "The song becomes a room where your mask has nowhere to sit."
 },
 {
 ingredients: ["lyrics", "melody", "riff", "rhythm", "story"],
 level: 5,
 constraint: "The lyric must expose need, the melody must deny it, the riff must punish it, the rhythm must betray it, and the story must make it undeniable.",
 prompt: "Write about wanting to be chosen, but make every part of the music ashamed of wanting.",
 payoff: "You hear desire survive the courtroom you built around it."
 },
 {
 ingredients: ["lyrics", "melody", "riff", "rhythm", "story"],
 level: 5,
 constraint: "No part may agree with another part for more than one bar.",
 prompt: "Score the inside of your head during the conversation where you said too little and meant too much.",
 payoff: "The arrangement reveals the civil war your face concealed."
 },
 {
 ingredients: ["lyrics", "melody", "riff", "rhythm", "story"],
 level: 5,
 constraint: "The story is shame, the lyric is charm, the melody is pleading, the riff is contempt, and the rhythm is a locked jaw.",
 prompt: "Make the most attractive version of your worst coping mechanism, then let it rot in public.",
 payoff: "You learn the difference between charisma and escape."
 },
 {
 ingredients: ["lyrics", "melody", "riff", "rhythm", "story"],
 level: 5,
 constraint: "Use only one chord shape, one repeated image, one recurring rhythmic wound, and one melodic note that refuses to resolve.",
 prompt: "Tell the story you keep overexplaining by giving it fewer places to hide.",
 payoff: "The smaller the cage gets, the louder the truth paces."
 },
 {
 ingredients: ["lyrics", "melody", "riff", "rhythm", "story"],
 level: 5,
 constraint: "Every element must contradict the title.",
 prompt: "Title it 'I Am Fine' and then make the entire piece testify against you.",
 payoff: "You discover how obvious a lie becomes when the band stops covering for it."
 },
 {
 ingredients: ["lyrics", "melody", "riff", "rhythm", "story"],
 level: 5,
 constraint: "The lyric can use only questions, the melody can use only falling motion, the riff can use only restraint, and the rhythm must keep almost breaking.",
 prompt: "Write the interrogation you wish someone had cared enough to give you.",
 payoff: "The piece becomes tenderness with a bare bulb overhead."
 },
 {
 ingredients: ["lyrics", "melody", "riff", "rhythm", "story"],
 level: 5,
 constraint: "End every element before it feels finished. Leave the final bar exposed.",
 prompt: "Make a song about abandonment that abandons itself first.",
 payoff: "You feel the missing ending become the most honest instrument in the room."
 }
];

if(typeof window !== "undefined") window.CREATE_COMBOS = CREATE_COMBOS;
if(typeof module !== "undefined") module.exports = CREATE_COMBOS;
