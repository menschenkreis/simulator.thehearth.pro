// Journey roadmap data.
// Keep the lesson spine content separate from Journey rendering and storage.
var JOURNEY_LEVELS = [
  { id: "L1", num: 1, name: "Level 1", tag: "QJAM LEVEL 1", color: "#ff4444", totalLessons: 8, unlockAfter: 8, focus: "Begin the QJam-style technical path after Foundation: time feel, open chords, pentatonics, and first blues solo vocabulary." },
  { id: "L2", num: 2, name: "Level 2", tag: "TWO-HAND COORDINATION", color: "#ff8800", totalLessons: 10, unlockAfter: 10, focus: "Coordinate both hands, close chord gaps, strengthen pentatonic vocabulary, and start simple embellishments." },
  { id: "L3", num: 3, name: "Level 3", tag: "FIRST EXPRESSIONS", color: "#ffcc00", totalLessons: 12, unlockAfter: 12, focus: "Turn basics into songs, riffs, phrases, and first saved musical ideas." },
  { id: "L4", num: 4, name: "Level 4", tag: "STRUCTURE", color: "#44cc44", totalLessons: 14, unlockAfter: 14, focus: "Understand keys, chord families, fretboard landmarks, intervals, and rhythm systems." },
  { id: "L5", num: 5, name: "Level 5", tag: "MOVEMENT AND COLOR", color: "#00cccc", totalLessons: 16, unlockAfter: 16, focus: "Move into new positions, expressive techniques, transposition, and controlled variation." },
  { id: "L6", num: 6, name: "Level 6", tag: "INTEGRATION", color: "#3366ff", totalLessons: 18, unlockAfter: 18, focus: "Connect harmony, arrangements, ear-to-hand movement, and deeper repertoire." },
  { id: "L7", num: 7, name: "Level 7", tag: "INTUITION", color: "#6633cc", totalLessons: 20, unlockAfter: 20, focus: "Let theory become instinct through analysis, choice, musical judgement, and teaching back." },
  { id: "L8", num: 8, name: "Level 8", tag: "PERSONAL SOUND", color: "#cc33ff", totalLessons: 24, unlockAfter: 24, focus: "Collaborate, perform, record, create, reflect, and shape a personal musical voice." }
];

var JOURNEY_CONCEPT_BANK = {
  L1: ["Time feel", "8 open chords", "Common-finger chord changes", "Pentatonic shape 1", "Pentatonic phrasing", "First blues solo", "Chord-scale connection", "Level 1 practice set"],
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
      title: "Lesson 1: Time Feel, Part 1",
      minutes: 55,
      summary: "Start QJam Level 1 with rhythm: steady pulse, quarter notes, eighth notes, and a simple strum grid.",
      conceptNames: ["Time feel", "Quarter and eighth notes"],
      taskNames: ["Foundation readiness check", "Pulse tap", "Muted strum grid", "Chord rhythm loop", "Rhythm reflection"],
      blocks: [
        { id:"review", min:6, phase:"REVIEW", source:"Foundation/Journey", title:"Confirm the threshold", body:"Foundation is assumed complete enough to begin: the learner can hold the guitar, make a sound, follow simple instructions, and notice confusion. Do not reteach first contact here unless it blocks the lesson.", prompt:"Is the learner ready for QJam Level 1, or does something belong back in Foundation?" },
        { id:"warmup", min:8, phase:"WARM-UP", source:"Practice", title:"Tap and count the pulse", body:"Without guitar first: tap a steady pulse and count 1 2 3 4. Then add eighth-note counting: 1-and-2-and-3-and-4-and.", prompt:"Was the pulse steady without rushing?" },
        { id:"concept", min:10, phase:"CONCEPT", source:"Study/Knowing", title:"Time feel is the grid", body:"Time feel means knowing where the beat lives and placing sound inside it. This is QJam Level 1 rhythm work: before fancy strumming, the learner must feel the grid.", prompt:"Explain time feel in plain words." },
        { id:"drill", min:16, phase:"DRILL", source:"Doing/Practice", title:"Muted quarter/eighth strum grid", body:"Mute the strings with the fretting hand. Strum quarter notes for four bars, then eighth notes for four bars. Use a metronome around 60-72 BPM.", prompt:"BPM, pattern, and where the rhythm drifted." },
        { id:"music", min:10, phase:"MUSIC APPLICATION", source:"Play", title:"Put the grid under one chord", body:"Choose one known open chord and place it inside the same rhythm grid. The goal is steady time, not many chords.", prompt:"Which chord did you use, and could it stay in time?" },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"Rhythm honesty note", body:"Write whether the learner loses the beat, rushes, freezes, or stays steady. That note shapes the next practice step.", prompt:"What does the rhythm need next?" }
      ]
    },
    {
      title: "Lesson 2: The 8 Open Chords",
      minutes: 60,
      summary: "Audit the QJam Level 1 open-chord set and identify which shapes are usable, shaky, or missing.",
      conceptNames: ["8 open chords", "Chord audit"],
      taskNames: ["Rhythm review", "Open chord set", "Clean chord test", "Chord gap list", "Next gradient"],
      blocks: [
        { id:"review", min:6, phase:"REVIEW", source:"Journey Notes", title:"Bring back the rhythm grid", body:"Tap and count four bars before playing. Then strum one known chord in quarter notes.", prompt:"Did rhythm hold once the guitar entered?" },
        { id:"warmup", min:8, phase:"WARM-UP", source:"Practice", title:"Quiet chord placement", body:"Form each known open chord without strumming first. Release and reform. Keep the hand calm.", prompt:"Which shapes did the hand remember quickly?" },
        { id:"concept", min:12, phase:"CONCEPT", source:"Study/Knowing", title:"QJam Level 1 chord set", body:"Use the open-chord family as a Level 1 vocabulary set. Track the usual beginner shapes: A, Am, C, D, Dm, E, Em, and G. The exact set can be adjusted, but the point is a usable open-chord vocabulary.", prompt:"Which of the 8 chords are known, unknown, or half-known?" },
        { id:"drill", min:20, phase:"DRILL", source:"Doing/Practice", title:"Clean chord audit", body:"Strum each chord once slowly. Check for muted strings, buzzing, memory gaps, and tension. Mark every chord as usable, shaky, or missing.", prompt:"List usable / shaky / missing chords." },
        { id:"music", min:9, phase:"MUSIC APPLICATION", source:"Play", title:"Two usable chords in time", body:"Pick two usable chords and play four counts each. If only one chord is truly usable, stay with one and keep the rhythm clean.", prompt:"Which chord pair worked best?" },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"Chord gap note", body:"Do not pretend every chord is learned. The value of this lesson is finding the exact chord gaps for the next plan.", prompt:"Which chord should become the next small focus?" }
      ]
    },
    {
      title: "Lesson 3: Common-Finger Chord Changes",
      minutes: 60,
      summary: "Use the open-chord set musically by finding easier changes and keeping time through the movement.",
      conceptNames: ["Common-finger changes", "Chord transition"],
      taskNames: ["Open chord audit review", "Anchor finger search", "Slow chord loop", "Rhythm chord change", "Gap note"],
      blocks: [
        { id:"review", min:6, phase:"REVIEW", source:"Journey Notes", title:"Return to the chord audit", body:"Choose the two strongest chords from Lesson 2 and one shaky chord. This gives today a real target.", prompt:"Which chords are in today's set?" },
        { id:"warmup", min:8, phase:"WARM-UP", source:"Practice", title:"Silent chord changes", body:"Move between two chords without strumming. Watch which fingers can stay close or remain anchored.", prompt:"Which finger can stay planted or move least?" },
        { id:"concept", min:10, phase:"CONCEPT", source:"Knowing/Doing", title:"Common fingers reduce panic", body:"A common-finger change uses a finger that stays in place, or a shape that moves with less scrambling. This makes chord changes more reliable.", prompt:"What makes one chord change easier than another?" },
        { id:"drill", min:20, phase:"DRILL", source:"Doing/Practice", title:"One chord change in slow time", body:"Pick one pair, such as E to A, G to Em, C to Am, or D to A. Change every four beats at a slow metronome tempo. Prioritize landing on beat 1.", prompt:"Chord pair, BPM, and what caused delay." },
        { id:"music", min:11, phase:"MUSIC APPLICATION", source:"Play", title:"Two-chord progression", body:"Turn the change into a tiny progression. Four counts on chord one, four counts on chord two. Keep going for eight cycles.", prompt:"Could the progression continue without stopping?" },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"Transition note", body:"Write the exact transition problem: finger order, chord memory, rhythm drop, tension, or unclear shape.", prompt:"What should be isolated next time?" }
      ]
    },
    {
      title: "Lesson 4: Pentatonic Shape 1",
      minutes: 60,
      summary: "Begin the QJam Level 1 pentatonic work by learning shape 1 as a usable fretboard map.",
      conceptNames: ["Minor pentatonic shape 1", "Fretboard map"],
      taskNames: ["Chord review", "Fifth fret map", "Shape 1 slow reps", "Two-note phrase", "Scale map note"],
      blocks: [
        { id:"review", min:6, phase:"REVIEW", source:"Journey Notes", title:"Keep the chord world alive", body:"Play the strongest two-chord progression once before moving into scale work. Journey should connect skills, not isolate them forever.", prompt:"Which chord pair did you review?" },
        { id:"warmup", min:8, phase:"WARM-UP", source:"Practice", title:"Find fret 5 and the box", body:"Find fret 5 on low E and high E. Place finger 1 at fret 5 and finger 4 at fret 8. This is the edge of the first pentatonic box.", prompt:"Could the learner find the box without confusion?" },
        { id:"concept", min:12, phase:"CONCEPT", source:"Study/Knowing", title:"Pentatonic means five-note vocabulary", body:"The minor pentatonic is a small note set used in riffs, solos, blues, rock, and improvisation. Shape 1 is the first map, not the whole language.", prompt:"What is the pentatonic scale for?" },
        { id:"drill", min:20, phase:"DRILL", source:"Doing/Practice", title:"A minor pentatonic shape 1", body:"Play 5-8 on E, 5-7 on A, 5-7 on D, 5-7 on G, 5-8 on B if using the classic box fingering, and 5-8 on high E. Go slowly and correct the pattern if your preferred source fingering differs.", prompt:"Which string pair broke the map?" },
        { id:"music", min:9, phase:"MUSIC APPLICATION", source:"Play", title:"Two-note call and response", body:"Choose two notes from the box. Play a short call, then answer it. This starts improvisation before the whole scale feels fluent.", prompt:"Which two notes became musical?" },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"Scale map note", body:"Write whether the pentatonic felt like a map, a pattern, or a blur. That decides the next lesson size.", prompt:"What does the scale need next?" }
      ]
    },
    {
      title: "Lesson 5: Pentatonic Phrasing",
      minutes: 60,
      summary: "Turn the pentatonic box from a finger pattern into small musical phrases.",
      conceptNames: ["Pentatonic phrasing", "Call and response"],
      taskNames: ["Shape 1 review", "Two-note phrase", "Three-note phrase", "Rhythm variation", "Phrase reflection"],
      blocks: [
        { id:"review", min:6, phase:"REVIEW", source:"Journey Notes", title:"Recover the pentatonic box", body:"Play the shape slowly enough to avoid guessing. If the map is still blurry, reduce to two strings.", prompt:"Which part of the shape is stable?" },
        { id:"warmup", min:8, phase:"WARM-UP", source:"Practice", title:"Two-string pentatonic loop", body:"Use only the top two strings or middle two strings. Loop those notes until the hand can find them without panic.", prompt:"Which two strings did you use?" },
        { id:"concept", min:10, phase:"CONCEPT", source:"Knowing/Play", title:"Phrasing is musical speech", body:"A phrase is a small musical sentence. In QJam Level 1, the pentatonic should become usable vocabulary, not only an up-and-down scale.", prompt:"What makes notes sound like a phrase?" },
        { id:"drill", min:18, phase:"DRILL", source:"Doing/Practice", title:"Two-note and three-note phrases", body:"Create a two-note phrase, then a three-note phrase. Repeat each with different rhythms. Leave space between phrases.", prompt:"Which phrase sounded best?" },
        { id:"music", min:13, phase:"MUSIC APPLICATION", source:"Play/Create", title:"Call and response over a pulse", body:"Tap or play a simple backing pulse. Play one pentatonic call and one answer. Keep it small enough to remember.", prompt:"What was the call? What was the answer?" },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"Phrase note", body:"Write whether the learner needs more map work, rhythm work, or confidence using fewer notes.", prompt:"What would make the phrase more musical?" }
      ]
    },
    {
      title: "Lesson 6: First Blues Solo Entry",
      minutes: 60,
      summary: "Use QJam Level 1 improvisation as a doorway into simple blues solo vocabulary.",
      conceptNames: ["Blues solo entry", "Improvisation constraint"],
      taskNames: ["Pentatonic review", "Blues feel", "Two-note solo", "Question-answer lick", "Improvisation note"],
      blocks: [
        { id:"review", min:6, phase:"REVIEW", source:"Journey Notes", title:"Bring back the best phrase", body:"Start with the best phrase from Lesson 5. Keep it short and repeatable.", prompt:"Which phrase is today's starting phrase?" },
        { id:"warmup", min:8, phase:"WARM-UP", source:"Practice", title:"Pentatonic box with space", body:"Play a few notes from shape 1, but leave silence after each small idea. Improvisation needs space.", prompt:"Did the learner leave space or fill every beat?" },
        { id:"concept", min:10, phase:"CONCEPT", source:"Study/Knowing", title:"A blues solo starts with limited choices", body:"Getting started with blues soloing does not mean playing many notes. It means using a small set of notes with timing, repetition, and feeling.", prompt:"What does a small solo need besides notes?" },
        { id:"drill", min:18, phase:"DRILL", source:"Doing/Practice", title:"Two-note blues solo constraint", body:"Use only two notes from the minor pentatonic. Play a question phrase for two bars and an answer phrase for two bars. Repeat with a backing pulse or metronome.", prompt:"Which two notes worked?" },
        { id:"music", min:13, phase:"MUSIC APPLICATION", source:"Play/Create", title:"First blues solo moment", body:"Over a simple blues-style pulse or backing track, play only the small phrases that felt best. Record or describe the moment if possible.", prompt:"What made it sound bluesy?" },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"Improvisation note", body:"Write whether the block was technical, rhythmic, emotional, or conceptual. This keeps improvisation from becoming vague.", prompt:"What is the next solo constraint?" }
      ]
    },
    {
      title: "Lesson 7: Chords Meet Pentatonics",
      minutes: 60,
      summary: "Connect the Level 1 chord world to the Level 1 pentatonic/improvisation world.",
      conceptNames: ["Chord-scale connection", "Musical context"],
      taskNames: ["Chord review", "Pentatonic review", "Chord-plus-phrase", "Mini arrangement", "Connection note"],
      blocks: [
        { id:"review", min:6, phase:"REVIEW", source:"Journey Notes", title:"Choose one chord pair and one phrase", body:"Pick the chord pair that worked best and the pentatonic phrase that sounded best. Today connects them.", prompt:"Which chord pair and phrase are you using?" },
        { id:"warmup", min:8, phase:"WARM-UP", source:"Practice", title:"Switch worlds calmly", body:"Play the chord pair once, then touch the pentatonic box once. Move between rhythm guitar and lead guitar without rushing.", prompt:"Which switch felt awkward?" },
        { id:"concept", min:10, phase:"CONCEPT", source:"Knowing", title:"Chords are the ground, phrases are the voice", body:"The chord progression gives the musical ground. The pentatonic phrase speaks over or around it. Level 1 should start connecting these worlds.", prompt:"How do chords and scale phrases relate?" },
        { id:"drill", min:18, phase:"DRILL", source:"Doing/Practice", title:"Chord then phrase loop", body:"Play two bars of chords, then two bars of a pentatonic phrase. Repeat at least four times. Keep rhythm steady across the switch.", prompt:"Where did the timing break?" },
        { id:"music", min:13, phase:"MUSIC APPLICATION", source:"Play/Create", title:"Mini arrangement", body:"Make a tiny arrangement: chord intro, short phrase, chord answer. It can be simple, but it should have a beginning and an answer.", prompt:"Describe the mini arrangement." },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"Connection note", body:"Write whether the learner understands why scales and chords belong in the same musical world.", prompt:"What connection needs clearer teaching?" }
      ]
    },
    {
      title: "Lesson 8: QJam Level 1 Integration",
      minutes: 60,
      summary: "Review the QJam Level 1 pillars and decide what is ready, what needs review, and what can move toward Level 2.",
      conceptNames: ["Level 1 integration", "Next gradient"],
      taskNames: ["Rhythm check", "Chord check", "Pentatonic check", "Blues solo check", "Level 2 readiness note"],
      blocks: [
        { id:"review", min:8, phase:"REVIEW", source:"Journey Notes", title:"Review the Level 1 pillars", body:"Look across rhythm, open chords, pentatonic shape 1, and first blues solo vocabulary. Mark each as ready, shaky, or missing.", prompt:"Ready / shaky / missing for each pillar." },
        { id:"warmup", min:8, phase:"WARM-UP", source:"Practice", title:"Best Level 1 warm-up", body:"Do one rhythm grid, one open-chord change, and one small pentatonic phrase.", prompt:"Which part warmed up fastest?" },
        { id:"concept", min:10, phase:"CONCEPT", source:"Study/Knowing", title:"Completion means usable, not perfect", body:"Level 1 is complete when the learner can use the pillars musically at a basic level and knows the exact gaps to keep training.", prompt:"What does usable mean for this learner?" },
        { id:"drill", min:16, phase:"DRILL", source:"Doing/Practice", title:"Level 1 pass-condition check", body:"Check four things: steady pulse, at least several usable open chords, pentatonic shape 1 orientation, and one small blues phrase.", prompt:"Which pass condition is weakest?" },
        { id:"music", min:13, phase:"MUSIC APPLICATION", source:"Play/Create", title:"One-minute Level 1 performance", body:"Play a short musical demonstration: chord rhythm, then pentatonic/blues phrase, then return to chord rhythm. Keep it simple and complete.", prompt:"What did the one-minute performance show?" },
        { id:"reflect", min:5, phase:"REFLECT", source:"Hearth", title:"Level 2 readiness note", body:"Decide whether the learner should move forward, repeat a Level 1 recovery quest, or strengthen one pillar before Level 2.", prompt:"Move forward, repeat, or recover which pillar?" }
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
