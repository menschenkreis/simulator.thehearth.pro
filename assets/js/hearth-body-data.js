// Hearth body chamber copy and zone meanings.
// Keep this data separate from rendering so the future backend can own it cleanly.
var HEARTH_BODY_COPY = {
  kicker: "The Hearth",
  title: "The Body Behind the Instrument",
  subtitle: "See what your brain, hands, ears, breath, and feeling are doing while you learn guitar.",
  guide: "Good practice is not only fingers. It is attention, breath, listening, and care.",
  defaultPrompt: "Choose one system of the body."
};

var HEARTH_BODY_ZONES = [
  {
    id: "brain",
    label: "Brain",
    seal: "B",
    x: "50%",
    y: "10%",
    r: 4.0,
    guide: "Attention, memory, habit, emotion, and learning loops.",
    notice: "The brain learns what you repeat.",
    tryThis: "Choose one tiny movement and repeat it slowly ten times.",
    apply: "Play open, fret 2, open on one string. Keep the timing even.",
    sourceNote: "Future source notes: neuroscience of practice, myelin, deliberate practice."
  },
  {
    id: "hands",
    label: "Hands",
    seal: "H",
    x: "37%",
    y: "40%",
    r: 4.3,
    guide: "Fingers, tendons, nerves, dexterity, and safe movement.",
    notice: "Tension in one finger often spreads into the whole hand.",
    tryThis: "Lift one finger slowly while the others stay relaxed.",
    apply: "Play a 1-2-3-4 pattern slowly. Aim for quiet fingers, not speed.",
    sourceNote: "Future source notes: hand anatomy, tendon care, classical technique."
  },
  {
    id: "ears",
    label: "Ears",
    seal: "E",
    x: "50%",
    y: "14%",
    r: 3.1,
    guide: "Listening, pitch, rhythm perception, and inner hearing.",
    notice: "Your ear starts learning before your fingers know what to do.",
    tryThis: "Sing one note, then find it on the guitar.",
    apply: "Play two notes and decide which one feels like home.",
    sourceNote: "Future source notes: ear training, audiation, music cognition."
  },
  {
    id: "eyes",
    label: "Eyes",
    seal: "I",
    x: "50%",
    y: "12%",
    r: 2.9,
    guide: "Pattern recognition, notation, tab, and fretboard maps.",
    notice: "The eye turns repeated shapes into maps.",
    tryThis: "Trace a simple tab pattern before playing it.",
    apply: "Read 0-2-0 on one string, then play it while watching the fretboard.",
    sourceNote: "Future source notes: visual learning, notation, fretboard mapping."
  },
  {
    id: "breath",
    label: "Breath / Body",
    seal: "Br",
    x: "52%",
    y: "32%",
    r: 4.6,
    guide: "Posture, relaxation, body scan, and nervous system regulation.",
    notice: "If the breath locks, the hands usually tighten too.",
    tryThis: "Exhale before changing chords.",
    apply: "Play Am slowly while breathing out before each change.",
    sourceNote: "Future source notes: posture, relaxation, somatic learning."
  },
  {
    id: "heart",
    label: "Heart / Feeling",
    seal: "Hrt",
    x: "48%",
    y: "28%",
    r: 3.7,
    guide: "Motivation, confidence, joy, shame, identity, and expression.",
    notice: "Feeling changes what the body allows.",
    tryThis: "Record one imperfect take and listen for one thing that worked.",
    apply: "End practice with one musical conversation, even if it is messy.",
    sourceNote: "Future source notes: performance psychology, motivation, reflective practice."
  }
];

if (typeof window !== "undefined") {
  window.HEARTH_BODY_COPY = HEARTH_BODY_COPY;
  window.HEARTH_BODY_ZONES = HEARTH_BODY_ZONES;
}
