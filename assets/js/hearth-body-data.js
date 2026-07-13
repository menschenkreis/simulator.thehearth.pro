// Hearth body chamber copy and zone meanings.
// Keep this data separate from rendering so the future backend can own it cleanly.
var HEARTH_BODY_COPY = {
  kicker: "The Hearth",
  title: "The Inner Instrument",
  subtitle: "Learn how your hands, brain, eyes, ears, body, and feelings develop while you learn guitar.",
  guide: "The guitar is the outer instrument. The learner is the inner instrument.",
  defaultPrompt: "Choose a system to see what it does and how to train it."
};

var HEARTH_BODY_ZONES = [
  {
    id: "brain",
    label: "Brain",
    seal: "B",
    x: "50%",
    y: "7.5%",
    r: 4.0,
    guide: "The brain builds the maps that let sound, movement, attention, and memory work together.",
    system: "The brain is not one single learning machine. Different areas help you listen, move, remember, predict, focus, and feel safe enough to try.",
    parts: [
      "Motor areas plan and refine movement.",
      "Auditory areas make sense of pitch, rhythm, and tone.",
      "Memory systems help patterns become familiar.",
      "Attention systems decide what gets practiced deeply."
    ],
    development: "It develops through clear repetition, sleep, attention, emotional safety, and feedback. Slow correct practice gives the brain a clean pattern to strengthen.",
    guitar: "Every chord change, rhythm, scale shape, and song memory is a brain-body map. You are not just memorizing facts; you are building pathways.",
    practices: [
      "Repeat one small movement slowly and cleanly.",
      "Name what you are focusing on before you play.",
      "Sleep on difficult material instead of forcing it endlessly."
    ],
    care: "Rushing, shame, panic, and noisy multitasking make learning harder. The brain needs a clear target and enough calm to update."
  },
  {
    id: "hands",
    label: "Hands",
    seal: "H",
    x: "42%",
    y: "43%",
    r: 4.3,
    guide: "The hands are living tissues: bones, joints, tendons, nerves, skin, and attention working together.",
    system: "Hands do not learn by force. They learn by small, accurate movements repeated with relaxed attention.",
    parts: [
      "Fingers move through tendons and muscles, not willpower alone.",
      "Nerves carry feeling and movement signals.",
      "Skin learns pressure, string distance, and touch.",
      "Wrists and arms support the fingers."
    ],
    development: "Hand skill develops through coordination, independence, timing, pressure control, and relaxed repetition.",
    guitar: "Clean fretting, chord changes, picking, muting, vibrato, and tone all come from how the hands organize pressure and release.",
    practices: [
      "Use the least pressure that makes a clean note.",
      "Move one finger while the others stay soft.",
      "Practice slowly enough that the hand never has to panic."
    ],
    care: "Pain, numbness, sharp tension, or burning are stop signs. Rest, soften, and rebuild smaller."
  },
  {
    id: "ears",
    label: "Ears",
    seal: "E",
    x: "47.5%",
    y: "12.5%",
    r: 3.1,
    guide: "The ears collect vibration, but listening is trained by the ear and brain together.",
    system: "The ear receives sound through vibration. The brain learns to recognize pitch, rhythm, tone color, distance, and musical meaning.",
    parts: [
      "Outer and middle ear gather and transmit vibration.",
      "Inner ear turns vibration into nerve signals.",
      "Auditory brain areas compare sounds and find patterns.",
      "Memory helps a sound become familiar."
    ],
    development: "Listening develops by comparing sounds, singing, matching pitch, noticing rhythm, and hearing the same idea in many contexts.",
    guitar: "Ear development helps you tune, hear mistakes, find notes, copy music, improvise, and know when something feels resolved.",
    practices: [
      "Sing a note, then find it on the guitar.",
      "Play two notes and name which feels higher.",
      "Listen for the root note in a chord or riff."
    ],
    care: "The ear needs patience. If everything sounds the same, make the contrast bigger and simpler."
  },
  {
    id: "eyes",
    label: "Eyes",
    seal: "I",
    x: "53.5%",
    y: "10.8%",
    r: 2.9,
    guide: "The eyes help turn the guitar into a map of shapes, distances, symbols, and movement.",
    system: "Eyes take in light and movement, but visual learning also depends on attention, pattern recognition, and spatial memory.",
    parts: [
      "The eyes track position, distance, and movement.",
      "Visual brain areas recognize shapes and patterns.",
      "Spatial memory helps you know where notes live.",
      "Reading systems connect symbols to action."
    ],
    development: "Vision for guitar develops by looking slowly, tracing shapes, reading simple patterns, and linking what you see to what you hear and feel.",
    guitar: "Tab, notation, chord diagrams, fretboard shapes, picking targets, and hand position all depend on trained visual maps.",
    practices: [
      "Trace a chord diagram before placing your fingers.",
      "Read 0-2-0 on one string, then play it.",
      "Look away after learning a shape and try to find it again."
    ],
    care: "The eyes can trick you into copying shapes without understanding them. Always connect what you see to sound and touch."
  },
  {
    id: "breath",
    label: "Breath / Body",
    seal: "Br",
    x: "45.5%",
    y: "31%",
    r: 4.6,
    guide: "The body sets the conditions for learning: posture, breath, tension, energy, and recovery.",
    system: "Breath and posture affect the nervous system. When the body feels rushed or braced, the hands often tighten and timing suffers.",
    parts: [
      "Breath helps regulate tension and attention.",
      "Posture gives the arms and hands support.",
      "Shoulders, jaw, and belly often reveal hidden tension.",
      "The nervous system decides whether practice feels safe or threatening."
    ],
    development: "Body awareness develops through scanning, relaxing, balancing effort, and noticing what changes while you play.",
    guitar: "Tone, timing, hand freedom, endurance, and confidence all improve when the body is supported and breathing.",
    practices: [
      "Exhale before a chord change.",
      "Drop the shoulders before repeating a hard passage.",
      "Pause every few minutes and scan jaw, hands, breath, and back."
    ],
    care: "If your whole body braces to play something, the step is too large. Make it smaller."
  },
  {
    id: "heart",
    label: "Heart / Feeling",
    seal: "Hrt",
    x: "50.5%",
    y: "24.5%",
    r: 3.7,
    guide: "Feeling is part of learning. Confidence, shame, joy, and identity change what the body will risk.",
    system: "The emotional system affects attention, memory, motivation, and whether the learner keeps returning.",
    parts: [
      "Confidence helps the body try again.",
      "Shame can make the hands freeze or rush.",
      "Joy makes repetition easier to return to.",
      "Expression connects technique to meaning."
    ],
    development: "Feeling develops through safe attempts, honest reflection, small wins, and music that actually matters to the learner.",
    guitar: "A player does not only need technique. They need permission to sound imperfect while becoming musical.",
    practices: [
      "Record one imperfect take and name one thing that worked.",
      "End practice with a tiny musical conversation.",
      "Choose one song, tone, or rhythm that makes you want to return."
    ],
    care: "If practice becomes proof that you are bad, stop. The task needs gentler framing, not harsher judgment."
  }
];

if (typeof window !== "undefined") {
  window.HEARTH_BODY_COPY = HEARTH_BODY_COPY;
  window.HEARTH_BODY_ZONES = HEARTH_BODY_ZONES;
}
