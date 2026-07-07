// Journey roadmap data.
// Keep the lesson spine content separate from Journey rendering and storage.
var JOURNEY_LEVELS = [
  { id: "L1", num: 1, name: "Level 1", tag: "FIRST GUIDED STEPS", color: "#ff4444", totalLessons: 8, unlockAfter: 8, focus: "Bridge from Foundation to Doing: clean sound, pulse, fretting, first chords, first scale map, first song seed." },
  { id: "L2", num: 2, name: "Level 2", tag: "TWO-HAND COORDINATION", color: "#ff8800", totalLessons: 10, unlockAfter: 10, focus: "Coordinate both hands, close chord gaps, strengthen pentatonic vocabulary, and start simple embellishments." },
  { id: "L3", num: 3, name: "Level 3", tag: "FIRST EXPRESSIONS", color: "#ffcc00", totalLessons: 12, unlockAfter: 12, focus: "Turn basics into songs, riffs, phrases, and first saved musical ideas." },
  { id: "L4", num: 4, name: "Level 4", tag: "STRUCTURE", color: "#44cc44", totalLessons: 14, unlockAfter: 14, focus: "Understand keys, chord families, fretboard landmarks, intervals, and rhythm systems." },
  { id: "L5", num: 5, name: "Level 5", tag: "MOVEMENT AND COLOR", color: "#00cccc", totalLessons: 16, unlockAfter: 16, focus: "Move into new positions, expressive techniques, transposition, and controlled variation." },
  { id: "L6", num: 6, name: "Level 6", tag: "INTEGRATION", color: "#3366ff", totalLessons: 18, unlockAfter: 18, focus: "Connect harmony, arrangements, ear-to-hand movement, and deeper repertoire." },
  { id: "L7", num: 7, name: "Level 7", tag: "INTUITION", color: "#6633cc", totalLessons: 20, unlockAfter: 20, focus: "Let theory become instinct through analysis, choice, musical judgement, and teaching back." },
  { id: "L8", num: 8, name: "Level 8", tag: "PERSONAL SOUND", color: "#cc33ff", totalLessons: 24, unlockAfter: 24, focus: "Collaborate, perform, record, create, reflect, and shape a personal musical voice." }
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

var JOURNEY_AUTHORED_LESSONS = {
  L1: [
    {
      title: "Lesson 1: First Clean Sound",
      minutes: 45,
      summary: "Make first contact after Foundation: calm body, open strings, clean sound, and one honest reflection.",
      conceptNames: ["Clean sound", "Body attention"],
      taskNames: ["Body check", "Open string touch", "Clean sound test", "Two-note music moment", "First reflection"],
      blocks: [
        { id:"review", min:5, phase:"REVIEW", source:"Foundation/Hearth", title:"Arrive and check readiness", body:"Name what you already understand from Foundation. Check posture, breathing, shoulders, jaw, and whether the guitar feels reachable.", prompt:"What feels clear? What feels awkward before playing?" },
        { id:"warmup", min:7, phase:"WARM-UP", source:"Practice", title:"Touch every open string", body:"Pluck each open string slowly from low E to high E. Let every note ring before moving on. The goal is not speed. The goal is hearing a clean note.", prompt:"Which string felt easiest? Which felt noisy or tense?" },
        { id:"concept", min:8, phase:"CONCEPT", source:"Knowing", title:"What clean sound means", body:"A clean sound is a note that rings without buzzing, choking, or rushing. The hand, ear, and attention all learn together.", prompt:"Explain clean sound in your own words." },
        { id:"drill", min:12, phase:"DRILL", source:"Doing/Practice", title:"Open string clean-sound test", body:"Play each open string four times. Keep the pick movement small. Listen for even volume. Reset the body if tension appears.", prompt:"How many strings rang clean four times in a row?" },
        { id:"music", min:8, phase:"MUSIC APPLICATION", source:"Play/Create", title:"Two-string sound moment", body:"Choose two open strings and make a tiny repeating pattern. Let it feel like music, even if it is very simple.", prompt:"Which two strings did you use? What did it feel like?" },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"First contact note", body:"Write one thing the body learned and one thing the ear noticed. This becomes the next lesson's starting point.", prompt:"What should we remember next time?" }
      ]
    },
    {
      title: "Lesson 2: Pick The Pulse",
      minutes: 50,
      summary: "Train the picking hand to move evenly with a simple pulse.",
      conceptNames: ["Alternate picking", "Steady pulse"],
      taskNames: ["Open string review", "Down-up picking", "60 BPM pulse", "Muted-string rhythm", "Pulse reflection"],
      blocks: [
        { id:"review", min:5, phase:"REVIEW", source:"Journey Notes", title:"Remember the clean sound", body:"Start with the cleanest open string from last time. Notice if the body can find that sound again.", prompt:"Did the clean sound return quickly or did it need resetting?" },
        { id:"warmup", min:8, phase:"WARM-UP", source:"Practice", title:"Open strings with breath", body:"Play each open string once, breathe, then play it again. Keep the pick movement small and calm.", prompt:"What changed when you slowed down?" },
        { id:"concept", min:9, phase:"CONCEPT", source:"Knowing", title:"Down-up picking", body:"Alternate picking means the pick moves down, then up, then down, then up. It teaches the picking hand to move like a pendulum.", prompt:"Say what down-up means without using fancy words." },
        { id:"drill", min:15, phase:"DRILL", source:"Doing/Practice", title:"Down-up on one string", body:"Choose one open string. Play down-up at 60 BPM for four slow bars. Stop if the motion gets wide or tense.", prompt:"BPM used, string used, and what mistake appeared?" },
        { id:"music", min:8, phase:"MUSIC APPLICATION", source:"Play", title:"Muted pulse groove", body:"Lightly mute the strings and play down-up as a quiet rhythm. Keep it steady enough that someone could tap along.", prompt:"Could the rhythm stay steady for four bars?" },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"Picking-hand note", body:"Notice where the picking hand wanted to rush, freeze, or overwork. That is useful information.", prompt:"What should the picking hand practise next?" }
      ]
    },
    {
      title: "Lesson 3: Fret One Clear Note",
      minutes: 50,
      summary: "Introduce the fretting hand gently: one finger, one fret, one clean note.",
      conceptNames: ["Fretting hand", "Finger placement"],
      taskNames: ["Open-string review", "One-fret touch", "Buzz check", "Two-note phrase", "Hand reflection"],
      blocks: [
        { id:"review", min:5, phase:"REVIEW", source:"Journey Notes", title:"Check clean sound and pulse", body:"Play one open string four times with down-up picking. Keep it slow enough to sound even.", prompt:"What is already easier than Lesson 1?" },
        { id:"warmup", min:8, phase:"WARM-UP", source:"Practice", title:"Hand shape without squeezing", body:"Place the fretting hand on the neck without pressing. Thumb relaxed, wrist comfortable, fingers curved.", prompt:"Where did tension show up first?" },
        { id:"concept", min:10, phase:"CONCEPT", source:"Knowing/Doing", title:"Press just behind the fret", body:"To make one clear fretted note, place the fingertip just behind the metal fret wire. Too far back may buzz. Too much pressure creates tension.", prompt:"What does just behind the fret mean on the actual guitar?" },
        { id:"drill", min:15, phase:"DRILL", source:"Doing/Practice", title:"One clean fretted note", body:"Use finger 1 on fret 1 of the high E string. Play the note, release, then play the open string. Repeat slowly and listen for buzz.", prompt:"How many clean fretted notes happened in a row?" },
        { id:"music", min:7, phase:"MUSIC APPLICATION", source:"Play/Create", title:"Open-fretted tiny melody", body:"Alternate between the open high E and fret 1. Make it sound like a tiny question and answer.", prompt:"Did it sound like a musical idea or only an exercise?" },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"Fretting-hand note", body:"Write what the fretting hand needed: less pressure, better placement, slower speed, or more patience.", prompt:"What should we protect in the next lesson?" }
      ]
    },
    {
      title: "Lesson 4: The 1-2-3-4 Walk",
      minutes: 55,
      summary: "Build basic finger independence with a small chromatic walk.",
      conceptNames: ["One finger per fret", "Chromatic walk"],
      taskNames: ["Finger warm-up", "1-2-3-4 pattern", "Slow metronome", "Mini-riff", "Independence reflection"],
      blocks: [
        { id:"review", min:5, phase:"REVIEW", source:"Journey Notes", title:"Recover the clear fretted note", body:"Play the cleanest fretted note from Lesson 3. Notice whether the hand remembers the position.", prompt:"What did the hand remember?" },
        { id:"warmup", min:8, phase:"WARM-UP", source:"Practice", title:"Finger taps on the string", body:"On one string, place fingers 1, 2, 3, and 4 slowly without worrying about speed. Keep the wrist soft.", prompt:"Which finger felt least independent?" },
        { id:"concept", min:10, phase:"CONCEPT", source:"Knowing", title:"One finger per fret", body:"Each finger gets its own fret. Finger 1 takes fret 1, finger 2 takes fret 2, finger 3 takes fret 3, and finger 4 takes fret 4.", prompt:"Can you point to each finger's fret before playing?" },
        { id:"drill", min:18, phase:"DRILL", source:"Doing/Practice", title:"1-2-3-4 on one string", body:"Play frets 1, 2, 3, 4 on one string at 50 BPM or slower. Use alternate picking if possible. Clean notes matter more than tempo.", prompt:"BPM, string used, and which finger needed help." },
        { id:"music", min:9, phase:"MUSIC APPLICATION", source:"Play/Create", title:"Turn the walk into a riff", body:"Use three or four notes from the walk and repeat them as a little riff. Add rhythm so it stops feeling mechanical.", prompt:"What tiny riff did you make?" },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"Finger independence note", body:"Write which finger needs the next small step. This is not failure. This is the map.", prompt:"Which finger is the next training focus?" }
      ]
    },
    {
      title: "Lesson 5: First Chord Pair",
      minutes: 55,
      summary: "Meet two open chords and learn how to change between them without panic.",
      conceptNames: ["Open chords", "Chord change"],
      taskNames: ["Finger reset", "E chord", "A chord", "E to A change", "Chord song moment"],
      blocks: [
        { id:"review", min:5, phase:"REVIEW", source:"Journey Notes", title:"Check fingers and pulse", body:"Play a short 1-2-3-4 walk, then one muted down-up rhythm. This prepares both hands.", prompt:"Which hand felt more awake today?" },
        { id:"warmup", min:8, phase:"WARM-UP", source:"Practice", title:"Chord-hand reset", body:"Before forming a chord, relax the hand. Place each finger deliberately. Do not grip the neck harder than needed.", prompt:"Where did the hand try to squeeze?" },
        { id:"concept", min:10, phase:"CONCEPT", source:"Knowing/Doing", title:"E and A are chord shapes", body:"A chord is several notes played together. Today we use E major and A major as first chord shapes. The goal is clean placement, not speed.", prompt:"What is a chord in plain words?" },
        { id:"drill", min:18, phase:"DRILL", source:"Doing/Practice", title:"E to A slow change", body:"Hold E, strum once, breathe, move to A, strum once, breathe. Repeat slowly. Check for muted strings and buzzing.", prompt:"How many clean E-to-A changes happened?" },
        { id:"music", min:9, phase:"MUSIC APPLICATION", source:"Play", title:"Two-chord song moment", body:"Strum E for four counts and A for four counts. Keep a steady pulse. This is already the beginning of a song shape.", prompt:"Could the chord change stay in time?" },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"Chord gap note", body:"Write which part of the change was hardest: finding fingers, clean sound, pulse, or memory.", prompt:"What should the next chord lesson support?" }
      ]
    },
    {
      title: "Lesson 6: Add D And Name The Gap",
      minutes: 55,
      summary: "Add one more open chord and learn to notice gaps without shame.",
      conceptNames: ["D chord", "Learning gap"],
      taskNames: ["E-A review", "D chord shape", "A to D change", "Three-chord loop", "Gap note"],
      blocks: [
        { id:"review", min:5, phase:"REVIEW", source:"Journey Notes", title:"Recover E to A", body:"Play the E to A change from Lesson 5. If it is messy, slow down instead of pushing through.", prompt:"What improved? What still catches?" },
        { id:"warmup", min:8, phase:"WARM-UP", source:"Practice", title:"Quiet chord placement", body:"Form E, A, and then D without strumming at first. Place the fingers, release, and place again.", prompt:"Which shape was hardest to remember?" },
        { id:"concept", min:10, phase:"CONCEPT", source:"Hearth/Knowing", title:"A gap is useful information", body:"A gap means the lesson has found the next right step. If C chord, D chord, rhythm, or naming feels unclear, we write it down and make a smaller bridge.", prompt:"What gap should be tracked today?" },
        { id:"drill", min:18, phase:"DRILL", source:"Doing/Practice", title:"A to D slow change", body:"Hold A, strum once, breathe, move to D, strum once, breathe. Keep fingers close to the strings and listen for clean ringing.", prompt:"How many clean A-to-D changes happened?" },
        { id:"music", min:9, phase:"MUSIC APPLICATION", source:"Play/Create", title:"E-A-D loop", body:"Try E for four counts, A for four counts, D for four counts. If three chords is too much, return to two chords and keep it musical.", prompt:"Did three chords feel possible or too much today?" },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"Next gradient note", body:"Choose the next smallest step: repeat A to D, add C later, slow the pulse, or make a tiny song seed.", prompt:"What is the next smallest useful step?" }
      ]
    },
    {
      title: "Lesson 7: First Pentatonic Map",
      minutes: 60,
      summary: "Learn the first pentatonic shape as a simple map for melody and improvising.",
      conceptNames: ["Minor pentatonic shape 1", "Fretboard map"],
      taskNames: ["Finger warm-up", "A minor pentatonic", "Slow scale reps", "Two-note phrase", "Map reflection"],
      blocks: [
        { id:"review", min:6, phase:"REVIEW", source:"Journey Notes", title:"Check chords and fingers", body:"Play one chord change and one 1-2-3-4 walk. This shows whether the hands are ready for a scale map.", prompt:"What felt ready? What needs review?" },
        { id:"warmup", min:8, phase:"WARM-UP", source:"Practice", title:"Fifth-fret arrival", body:"Find fret 5. Place finger 1 there on the low E string. Breathe and notice the guitar neck as a map, not a mystery.", prompt:"Could you find fret 5 easily?" },
        { id:"concept", min:12, phase:"CONCEPT", source:"Knowing/Study", title:"A scale is a chosen set of notes", body:"The minor pentatonic is a small set of notes that works for many riffs and melodies. Shape 1 gives the hand a first map.", prompt:"What is a scale in plain words?" },
        { id:"drill", min:20, phase:"DRILL", source:"Doing/Practice", title:"A minor pentatonic, shape 1", body:"Play 5-8 on E, 5-7 on A, 5-7 on D, 5-7 on G, 5-7 on B, 5-8 on high E. Go slowly. Ascend and descend only if the notes stay clean.", prompt:"Which string pair felt hardest?" },
        { id:"music", min:9, phase:"MUSIC APPLICATION", source:"Play/Create", title:"Two-note melody", body:"Choose only two notes from the scale and make a call-and-response phrase. Rhythm matters more than using many notes.", prompt:"Which two notes did you use?" },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"Map note", body:"Write whether the scale felt like a map, a finger exercise, or a confusing shape. That tells us how to teach it next.", prompt:"How did the scale feel?" }
      ]
    },
    {
      title: "Lesson 8: First Song Seed",
      minutes: 60,
      summary: "Bring Level 1 together: clean sound, pulse, chord, scale, and a tiny original idea.",
      conceptNames: ["Song seed", "Level 1 integration"],
      taskNames: ["Review strongest skill", "Choose a chord", "Choose two scale notes", "Create a song seed", "Level 1 reflection"],
      blocks: [
        { id:"review", min:8, phase:"REVIEW", source:"Journey Notes", title:"Choose the strongest Level 1 skill", body:"Look back at Level 1: clean sound, pulse, fretting, 1-2-3-4, chords, and pentatonic. Choose the part that feels most alive.", prompt:"Which Level 1 skill feels strongest?" },
        { id:"warmup", min:8, phase:"WARM-UP", source:"Practice", title:"Best-of-Level-1 warm-up", body:"Do one clean open-string pass, one short 1-2-3-4 walk, and one slow chord change.", prompt:"Which warm-up part needs more time?" },
        { id:"concept", min:10, phase:"CONCEPT", source:"Create/Knowing", title:"A song seed is enough", body:"A song seed is not a finished song. It is a tiny musical idea worth saving: a rhythm, two chords, a riff, or a melody fragment.", prompt:"What makes a small idea worth saving?" },
        { id:"drill", min:15, phase:"DRILL", source:"Doing/Practice", title:"Choose the ingredients", body:"Choose one chord or chord pair. Choose one or two pentatonic notes. Practise switching between them slowly.", prompt:"Which chord and notes did you choose?" },
        { id:"music", min:14, phase:"MUSIC APPLICATION", source:"Play/Create", title:"Make the first song seed", body:"Play your chord or chord pair, then answer it with your tiny melody. Repeat until it has a shape you can remember.", prompt:"Describe the seed. If possible, name it." },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"Level 1 completion note", body:"Write what changed in your hands, ears, attention, and confidence. This is the evidence that Level 1 did something real.", prompt:"What changed during Level 1?" }
      ]
    }
  ]
};

if (typeof window !== "undefined") {
  window.JOURNEY_LEVELS = JOURNEY_LEVELS;
  window.JOURNEY_CONCEPT_BANK = JOURNEY_CONCEPT_BANK;
  window.JOURNEY_TASK_BANK = JOURNEY_TASK_BANK;
  window.JOURNEY_AUTHORED_LESSONS = JOURNEY_AUTHORED_LESSONS;
}
