/*
 * Doing config adapter v0.
 *
 * Stable labels, filters, level mapping, and plain-language coaching for the
 * Doing drill library. Keeping this here makes the large Doing view easier to
 * move in smaller steps.
 */
(function initDoingConfig(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthDoingConfig = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingConfig() {
  "use strict";

  var genreFilters = [
    { id: "rock", label: "Rock", styles: ["rock"] },
    { id: "blues", label: "Blues / Slide", styles: ["blues", "slide"] },
    { id: "jazz", label: "Jazz / Gypsy", styles: ["jazz", "gypsy"] },
    { id: "metal", label: "Metal", styles: ["metal"] },
    { id: "classical", label: "Classical", styles: ["classical"] },
    { id: "country", label: "Country / Folk", styles: ["country", "celtic"] },
    { id: "funk", label: "Funk / Reggae", styles: ["funk", "reggae"] },
    { id: "latin", label: "Latin / Flamenco", styles: ["latin", "flamenco"] }
  ];

  var levels = [
    { level: 1, label: "Level I", name: "Touch", tag: "Clean first contact" },
    { level: 2, label: "Level II", name: "Control", tag: "Two hands agree" },
    { level: 3, label: "Level III", name: "Movement", tag: "Crossings and changes" },
    { level: 4, label: "Level IV", name: "Groove", tag: "Pulse becomes body" },
    { level: 5, label: "Level V", name: "Reach", tag: "Neck opens wider" },
    { level: 6, label: "Level VI", name: "Flow", tag: "Patterns connect" },
    { level: 7, label: "Level VII", name: "Fire", tag: "Advanced mechanics" },
    { level: 8, label: "Level VIII", name: "Voice", tag: "Technique becomes sound" }
  ];

  var stringRows = [
    { id: "high-e", label: "e", hint: "Speed / style", weight: "1.4px", categories: ["speed", "styles"] },
    { id: "b", label: "B", hint: "Arpeggios / harmony", weight: "1.8px", categories: ["arpeggios"] },
    { id: "g", label: "G", hint: "Scales / maps", weight: "2.2px", categories: ["scales"] },
    { id: "d", label: "D", hint: "Picking / attack", weight: "2.6px", categories: ["picking"] },
    { id: "a", label: "A", hint: "Fretting / grip", weight: "3px", categories: ["fretting"] },
    { id: "low-e", label: "E", hint: "Rhythm / pulse", weight: "3.4px", categories: ["rhythm"] }
  ];

  var trainingBoards = [
    {
      id: "left-hand",
      label: "Left Hand",
      shortLabel: "Left",
      title: "Left Hand Neck Drills",
      description: "Fretting, finger independence, pressure, reach, shifts, scale boxes, and clean note contact.",
      layout: "neck",
      categories: ["fretting", "scales", "arpeggios", "speed"],
      rows: [
        { id: "contact", label: "Contact", hint: "Clean fingertips and pressure", weight: "1.4px", categories: ["fretting"] },
        { id: "independence", label: "Independence", hint: "Finger control and spider work", weight: "1.8px", categories: ["fretting", "speed"] },
        { id: "reach", label: "Reach", hint: "Stretches, shifts, and position changes", weight: "2.2px", categories: ["fretting", "speed"] },
        { id: "legato", label: "Legato", hint: "Hammer-ons, pull-offs, trills, slides", weight: "2.6px", categories: ["fretting", "styles"] },
        { id: "scale-shapes", label: "Shapes", hint: "Scale boxes and position maps", weight: "3px", categories: ["scales"] },
        { id: "chord-shapes", label: "Chord Shapes", hint: "Arpeggios, barre shapes, clean harmony", weight: "3.4px", categories: ["arpeggios", "fretting"] }
      ]
    },
    {
      id: "right-hand",
      label: "Right Hand",
      shortLabel: "Right",
      title: "Right Hand Soundhole Drills",
      description: "Picking, strumming, rest/free stroke, PIMA, tone, accents, pulse, and groove control.",
      layout: "soundhole",
      categories: ["picking", "rhythm", "styles", "speed", "arpeggios"],
      rows: [
        { id: "attack", label: "Attack", hint: "Pick direction and tone", weight: "1.4px", categories: ["picking"] },
        { id: "crossing", label: "Crossing", hint: "String changes and accuracy", weight: "1.8px", categories: ["picking", "speed"] },
        { id: "strum", label: "Strum", hint: "Strumming and muted rhythm", weight: "2.2px", categories: ["rhythm"] },
        { id: "groove", label: "Groove", hint: "Accents, offbeats, swing, feel", weight: "2.6px", categories: ["rhythm", "styles"] },
        { id: "fingerstyle", label: "Fingerstyle", hint: "PIMA, rest stroke, free stroke", weight: "3px", categories: ["styles", "arpeggios"] },
        { id: "speed", label: "Speed", hint: "Bursts, tremolo, fast clean movement", weight: "3.4px", categories: ["speed", "picking"] }
      ]
    },
    {
      id: "both-hands",
      label: "Both Hands",
      shortLabel: "Both",
      title: "Both Hands Coordination",
      description: "The full guitar: clean sound, timing, chord changes, scale rhythm, riffs, and applied coordination.",
      layout: "whole-guitar",
      categories: ["picking", "fretting", "rhythm", "scales", "arpeggios", "speed", "styles", "fundamentals"],
      rows: [
        { id: "clean-sound", label: "Clean Sound", hint: "Both hands produce one clear note", weight: "1.4px", categories: ["fretting", "picking", "fundamentals"] },
        { id: "time", label: "In Time", hint: "Fretting and attack land together", weight: "1.8px", categories: ["rhythm", "picking"] },
        { id: "changes", label: "Changes", hint: "Chord and shape changes", weight: "2.2px", categories: ["arpeggios", "fretting"] },
        { id: "scale-time", label: "Scale Time", hint: "Scale patterns with pulse", weight: "2.6px", categories: ["scales", "rhythm"] },
        { id: "style", label: "Style", hint: "Physical accents inside musical style", weight: "3px", categories: ["styles", "rhythm"] },
        { id: "voice", label: "Voice", hint: "Technique becomes music", weight: "3.4px", categories: ["scales", "arpeggios", "speed", "styles"] }
      ]
    }
  ];

  var drillLevels = {
    "alt-1": 1, "flatpick-1": 1, "chrom-1": 1, "classical-1": 1, "stretch-1": 1, "16th-1": 1, "funk-1": 1, "shuffle-1": 1, "strum-1": 1, "triplet-1": 1, "pent-1": 1, "major-1": 1, "blues-scale-1": 1, "pent-3": 1, "maj-arp": 1, "min-arp": 1, "pima-1": 1, "pima-2": 1,
    "alt-2": 2, "hybrid-1": 2, "spider-1": 2, "barre-1": 2, "legato-1": 2, "vibrato-1": 2, "funk-2": 2, "reggae-1": 2, "metronome-1": 2, "pent-2": 2, "modes-1": 2, "modes-2": 2, "dom7-arp": 2, "maj7-arp": 2, "classical-arp": 2, "trem-1": 2, "seq-1": 2, "speed-ramp": 2, "burst-1": 2, "slide-1": 2,
    "alt-3": 3, "gypsy-1": 3, "crosspick-1": 3, "barre-2": 3, "trill-1": 3, "bossa-1": 3, "major-2": 3, "harm-min-1": 3, "phrygian-1": 3, "pos-shift-1": 3, "slide-2": 3,
    "econ-1": 4, "poly-1": 4, "minor-nat-1": 4, "sweep-arp": 4, "tap-1": 4, "rasg-1": 4, "golpe-1": 4,
    "sweep-1": 5, "legato-2": 5, "skip-1": 5, "dim-arp": 5,
    "tap-2": 6, "whole-tone-1": 6, "dim-scale-1": 6,
    "sweep-2": 7, "alzap-1": 7,
    "gypsy-pick": 8, "celtic-1": 8
  };

  var stateOrder = ["seen", "practiced", "clean", "comfortable", "mastered"];
  var stateLabels = {
    seen: "Seen",
    practiced: "Practised",
    clean: "Clean once",
    comfortable: "Comfortable",
    mastered: "Mastered"
  };

  var guitarZones = [
    {
      id: "left-hand",
      label: "Left Hand",
      hint: "Fretboard drills - fretting, legato, stretches, shifts, scale boxes",
      points: "680,208 930,178 1050,318 950,528 705,538 610,360",
      board: "left-hand",
      categories: ["fretting", "scales", "arpeggios", "speed"],
      view: "training",
      seal: { icon: "L", x: "66%", y: "35%" }
    },
    {
      id: "right-hand",
      label: "Right Hand",
      hint: "Picking, strumming, rest stroke, free stroke, tone",
      points: "112,330 390,300 468,505 342,646 122,604 48,446",
      board: "right-hand",
      categories: ["picking", "rhythm", "styles", "speed"],
      view: "training",
      seal: { icon: "R", x: "22%", y: "50%" }
    },
    {
      id: "both-hands",
      label: "Both Hands",
      hint: "Coordination drills - timing, clean sound, chord changes, scale rhythm",
      points: "320,210 815,205 970,496 770,755 296,674 162,428",
      board: "both-hands",
      categories: ["picking", "fretting", "rhythm", "scales", "arpeggios", "speed", "styles"],
      view: "training",
      seal: { icon: "\u21c4", x: "48%", y: "52%" }
    },
    {
      id: "tuning",
      label: "Map / Tuning",
      hint: "Fretboard explorer, note finder, tuning, E/A highways",
      points: "925,32 1260,42 1272,240 1010,264 884,150",
      categories: [],
      view: "explorer",
      seal: { icon: "\u2699", x: "86%", y: "14%" }
    }
  ];

  var focusCats = [
    { id: "left-hand", label: "Left Hand", icon: "L", board: "left-hand", categories: ["fretting", "scales", "arpeggios", "speed"] },
    { id: "right-hand", label: "Right Hand", icon: "R", board: "right-hand", categories: ["picking", "rhythm", "styles", "speed", "arpeggios"] },
    { id: "both-hands", label: "Both Hands", icon: "\u21c4", board: "both-hands", categories: ["picking", "fretting", "rhythm", "scales", "arpeggios", "speed", "styles"] },
    { id: "fretboard", label: "Fretboard Map", icon: "&#x1F5FA;", categories: [] }
  ];

  var coachingByCategory = {
    picking: {
      whatDo: "Strum or pick the pattern slowly. One motion at a time.",
      howDo: "Keep the wrist loose. Small movements from the forearm.",
      howLong: "2 minutes slow, then 30 seconds at tempo.",
      listen: "Each note should sound the same volume. No accents on accidentals.",
      mistake: "Moving the whole arm instead of the wrist.",
      pass: "Play it clean three times in a row at a steady BPM.",
      easier: "Reduce the tempo by 10 BPM. Remove the last note of each group.",
      harder: "Double the tempo. Add accents on beats 2 and 4."
    },
    fretting: {
      whatDo: "Place each finger close to the fret. Press down and hold.",
      howDo: "Use fingertips, not pads. Curve the fingers like a claw.",
      howLong: "1 minute per position. Then connect two positions slowly.",
      listen: "Each note should ring clear. No buzzing or muting.",
      mistake: "Pressing too hard or flattening the fingers.",
      pass: "Move through the pattern twice without dead notes.",
      easier: "Play one string at a time. Use a metronome at half speed.",
      harder: "Add hammer-ons between positions. Increase speed by 5 BPM."
    },
    rhythm: {
      whatDo: "Mute the strings with your left hand. Strum the pattern.",
      howDo: "Keep the hand swinging like a pendulum. Down-up-down-up, never stop.",
      howLong: "2 minutes slow, then 30 seconds without stopping.",
      listen: "The pulse should feel even. The hand should swing, not jab.",
      mistake: "Stopping the hand between strums.",
      pass: "Keep the pattern going for 30 seconds without freezing.",
      easier: "Slow the tempo. Focus on the downstrokes only.",
      harder: "Add syncopation. Try it at double speed."
    },
    scales: {
      whatDo: "Play the scale shape one note at a time. Up and down.",
      howDo: "Use one finger per fret. Shift positions only when the shape runs out.",
      howLong: "2 minutes up and down. Then improvise for 1 minute.",
      listen: "Hear the root when you start and end. The scale has a home note.",
      mistake: "Running the pattern without knowing where the strong notes are.",
      pass: "Play the scale clean up, down, then stop on three roots.",
      easier: "Play one octave only. Use a metronome at 60 BPM.",
      harder: "Add bends and slides. Play it in three different positions."
    },
    arpeggios: {
      whatDo: "Play one note of the chord at a time. Let each ring.",
      howDo: "Fret the full chord shape, then pluck individual strings.",
      howLong: "1 minute per shape. Then connect two shapes slowly.",
      listen: "The chord should be obvious even though the notes are broken apart.",
      mistake: "Letting notes smear together or cutting them short.",
      pass: "Play the arpeggio in time and call out root, third, fifth.",
      easier: "Play the chord as a strum first. Then break it apart.",
      harder: "Add passing tones. Play it at double speed."
    },
    speed: {
      whatDo: "Play a short burst at your fastest clean tempo. Then rest.",
      howDo: "Start slow. Add one note per burst. Stop before it gets messy.",
      howLong: "5 rounds of 10-second bursts with 20-second rest.",
      listen: "Fast notes still need a front edge. Each note should speak.",
      mistake: "Practising mistakes at high tempo.",
      pass: "Find the fastest clean tempo, then practise 10 BPM below it.",
      easier: "Reduce the burst to 4 notes. Focus on the attack.",
      harder: "Add 2 notes per burst. Increase tempo by 5 BPM."
    },
    styles: {
      whatDo: "Copy the physical accent of the style. Feel the accent before playing it.",
      howDo: "Listen to one bar of the style. Match the physical motion first.",
      howLong: "1 minute listening, 2 minutes copying, 1 minute improvising.",
      listen: "The technique should sound like a dialect. It has a personality.",
      mistake: "Learning the shape without the accent.",
      pass: "Record one loop and check whether the style is recognisable.",
      easier: "Slow the tempo. Focus on one accent per bar.",
      harder: "Combine two style techniques. Play it at original tempo."
    }
  };

  function coachForCategory(categoryId) {
    return coachingByCategory[categoryId] || coachingByCategory.fretting;
  }

  function boardForId(boardId) {
    return trainingBoards.find(function findBoard(board) {
      return board.id === boardId;
    }) || trainingBoards[0];
  }

  function levelForDrill(drill) {
    return drill.level || drillLevels[drill.id] || Math.min(8, Math.max(1, drill.difficulty || 1));
  }

  return {
    version: "0.1.0",
    genreFilters: genreFilters,
    levels: levels,
    stringRows: stringRows,
    trainingBoards: trainingBoards,
    drillLevels: drillLevels,
    stateOrder: stateOrder,
    stateLabels: stateLabels,
    guitarZones: guitarZones,
    focusCats: focusCats,
    boardForId: boardForId,
    coachingByCategory: coachingByCategory,
    coachForCategory: coachForCategory,
    levelForDrill: levelForDrill
  };
});
