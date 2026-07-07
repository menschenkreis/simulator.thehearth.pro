// Journey roadmap data.
// Keep the lesson spine content separate from Journey rendering and storage.
var JOURNEY_LEVELS = [
  { id: "L1", num: 1, name: "Origin", tag: "THE FIRST VOICE", color: "#ff4444", totalLessons: 8, unlockAfter: 8, focus: "Bridge from Foundation to Doing: picking, rhythm, fretting, first scale, first chords, connecting ideas, first song moment." },
  { id: "L2", num: 2, name: "Duality", tag: "THE SECOND VOICE", color: "#ff8800", totalLessons: 10, unlockAfter: 10, focus: "Two hands, chord gaps, pentatonic vocabulary, embellishments." },
  { id: "L3", num: 3, name: "Creation", tag: "FIRST EXPRESSIONS", color: "#ffcc00", totalLessons: 12, unlockAfter: 12, focus: "First complete songs, riffs, phrasing, song seeds." },
  { id: "L4", num: 4, name: "Structure", tag: "FRAMEWORKS", color: "#44cc44", totalLessons: 14, unlockAfter: 14, focus: "Keys, chord families, fretboard maps, timing systems." },
  { id: "L5", num: 5, name: "Change", tag: "TRANSFORMATION", color: "#00cccc", totalLessons: 16, unlockAfter: 16, focus: "New positions, expressive techniques, transposition, variation." },
  { id: "L6", num: 6, name: "Harmony", tag: "INTEGRATION", color: "#3366ff", totalLessons: 18, unlockAfter: 18, focus: "Harmony, arrangements, ear-to-hand connection, deeper repertoire." },
  { id: "L7", num: 7, name: "Wisdom", tag: "THE WHY", color: "#6633cc", totalLessons: 20, unlockAfter: 20, focus: "Theory becomes intuition; analysis, choice, musical judgement." },
  { id: "L8", num: 8, name: "Power", tag: "COLLECTIVE FORCE", color: "#cc33ff", totalLessons: 24, unlockAfter: 24, focus: "Collaboration, performance, creation, personal sound." }
];

var JOURNEY_CONCEPT_BANK = {
  L1: ["Alternate picking", "Rhythm pulse", "Chromatic exercise", "Pentatonic shape 1", "Open chords (E, A, D)", "Scale-to-chord connection", "First song moment", "Practice ritual"],
  L2: ["Finger gymnastics", "Metronome control", "Pentatonic pattern 1", "Chord embellishments", "C chord gap check", "Scale-to-piano relationship", "Songwriting seed", "Open chord fluency", "Musical colour", "Call and response"],
  L3: ["Riff building", "Chord progressions", "Simple melodies", "Pentatonic phrasing", "Dynamics", "Verse/chorus shape", "Song map", "Ear copying"],
  L4: ["Major scale map", "Key centres", "I IV V", "Chord families", "Fretboard landmarks", "Intervals", "Rhythm grids", "Transposition"],
  L5: ["Bends", "Slides", "Legato", "Position shifts", "Minor/major colour", "Improvisation constraints", "Tone shaping", "Variation"],
  L6: ["Triads", "Arpeggios", "Harmony lines", "Arrangement layers", "Voice leading", "Ear-to-hand", "Modal colour", "Repertoire integration"],
  L7: ["Functional harmony", "Analysis", "Improvisation choices", "Composition craft", "Practice diagnosis", "Teaching back", "Style comparison", "Intentional tone"],
  L8: ["Collaboration", "Performance prep", "Recording review", "Original piece", "Set building", "Feedback cycles", "Personal sound", "Mastery reflection"]
};

var JOURNEY_TASK_BANK = {
  warmup: [
    "Body scan + 2 min clean open strings",
    "Finger gymnastics: 1-2-3-4 chromatic across 6 strings",
    "Right-hand pulse on muted strings, D DU UDU",
    "Slow chord-change breathing drill - two chords only"
  ],
  concept: [
    "Say the idea in plain words before touching the guitar",
    "Draw the pattern on paper or fretboard diagram",
    "Find it on the guitar - say what you see",
    "Connect it to something you already know"
  ],
  drill: [
    "Metronome at 60 BPM - one clean rep is worth ten sloppy",
    "Slow repetitions with pause to check each note",
    "Loop the hard transition only - 4 bars max",
    "Speed ladder: increase 5 BPM only if last rep was clean"
  ],
  music: [
    "Apply the concept inside a real song moment",
    "Create a 2-bar phrase using today's idea",
    "Improvise with only the notes you learned today",
    "Play something that makes you want to come back tomorrow"
  ],
  review: [
    "Read your last lesson notes honestly",
    "Name one thing that stuck and one thing that slipped",
    "Rate your confidence: 1-5 on today's concept",
    "Choose the next small gradient - what should the next lesson do?"
  ]
};

if (typeof window !== "undefined") {
  window.JOURNEY_LEVELS = JOURNEY_LEVELS;
  window.JOURNEY_CONCEPT_BANK = JOURNEY_CONCEPT_BANK;
  window.JOURNEY_TASK_BANK = JOURNEY_TASK_BANK;
}
