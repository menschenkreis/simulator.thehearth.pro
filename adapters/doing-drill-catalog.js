/*
 * Curated Doing drill catalogue v1.
 *
 * The legacy DOING bank is intentionally broad. This adapter marks only
 * reviewed drills as learner-ready, adds the missing chord/coordination drills,
 * and supplies structured teaching data without discarding the source archive.
 */
(function initDoingDrillCatalog(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthDoingDrillCatalog = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingDrillCatalog() {
  "use strict";

  var REVIEWED = {
    "chrom-1": {
      title: "1-2-3-4 Clean Contact",
      shortTitle: "1-2-3-4",
      level: 1,
      hand: "left-hand",
      goal: "Give every fretting finger one calm, clean contact with the string.",
      setup: "Start around fret 5 where the frets are comfortable. Use one finger per fret.",
      steps: [
        "Place fingers 1, 2, 3, then 4 on one string.",
        "Pick each note once and let it speak clearly.",
        "Move to the next string. Return in reverse: 4, 3, 2, 1."
      ],
      listenFor: ["No buzz", "Even volume", "Relaxed thumb and shoulder"],
      passCondition: "Play one string up and back three times with four clear notes and no rush.",
      easier: "Use only fingers 1 and 2 on one string, without a metronome.",
      harder: "Cross all six strings at 60 BPM, one note per click.",
      safety: "Stop and shake out the hand if the wrist pinches or the thumb grips hard.",
      bpmChoices: ["Free", "50", "60", "76"],
      visualType: "finger-sequence",
      asset: "images/doing/drills/chromatic-1234-v1.png"
    },
    "classical-1": {
      title: "Fretting Hand Position",
      shortTitle: "Hand Position",
      level: 1,
      hand: "left-hand",
      goal: "Find a repeatable hand shape that lets the fingertips land cleanly.",
      setup: "Rest the thumb lightly behind the neck and let the fingers curve over the strings.",
      steps: [
        "Place finger 1 close behind a fret and play the note.",
        "Check that the finger joint stays curved and the next string is free.",
        "Release pressure without lifting the fingertip far away."
      ],
      listenFor: ["Clear note", "No neighbouring string muted", "No squeezing"],
      passCondition: "Make five clean notes with the same relaxed hand shape.",
      easier: "Use the first string only and support the guitar before placing the hand.",
      harder: "Repeat with each finger on a different string.",
      safety: "Comfort matters more than copying one exact wrist angle.",
      bpmChoices: ["Free"],
      visualType: "hand-position"
    },
    "stretch-1": {
      title: "Comfortable 1-2-4 Reach",
      shortTitle: "1-2-4 Reach",
      level: 1,
      hand: "left-hand",
      goal: "Teach the pinky to reach without forcing the hand open.",
      setup: "Begin around fret 7. Use fingers 1, 2, and 4 across three neighbouring frets.",
      steps: [
        "Play finger 1, then 2, then 4 on one string.",
        "Keep unused fingers soft and close to the neck.",
        "Release, shake out, and repeat on the next string."
      ],
      listenFor: ["Three clean notes", "Quiet shoulder", "No wrist strain"],
      passCondition: "Complete three relaxed repetitions without twisting or gripping.",
      easier: "Move higher up the neck where frets are closer together.",
      harder: "Move the same shape down one fret while staying relaxed.",
      safety: "Never force a stretch. Move higher up the neck if the hand feels pulled.",
      bpmChoices: ["Free", "50", "60"],
      visualType: "finger-sequence"
    },
    "pent-1": {
      title: "A Minor Pentatonic Box 1",
      shortTitle: "Am Box 1",
      level: 1,
      hand: "left-hand",
      goal: "Learn one reliable A minor pentatonic shape and recognise its A root notes.",
      setup: "Use box 1 at the 5th fret. Begin and end on an A root.",
      steps: [
        "Play the shape slowly from the low strings to the high strings.",
        "Return down the same shape without guessing.",
        "Pause on each A root and hear it as home."
      ],
      listenFor: ["Clear notes", "Even pulse", "A roots feel settled"],
      passCondition: "Play up, down, and stop accurately on three A roots.",
      easier: "Use only the lowest two strings and mark the root note first.",
      harder: "Make a four-note phrase that ends on an A root.",
      safety: "Keep the thumb and shoulder loose while the hand changes strings.",
      bpmChoices: ["Free", "60", "76", "100"],
      visualType: "fretboard-map"
    },
    "alt-1": {
      title: "Alternate Picking on One String",
      shortTitle: "Down-Up",
      level: 1,
      hand: "right-hand",
      goal: "Make down and up strokes feel like one even movement.",
      setup: "Mute or fret one comfortable note. Rest the forearm and hold the pick lightly.",
      steps: [
        "Play down, up, down, up with a very small pick movement.",
        "Keep the pick close to the string after every stroke.",
        "Rest for a breath, then repeat without changing volume."
      ],
      listenFor: ["Even volume", "No scraping", "Loose wrist"],
      passCondition: "Play 16 even strokes at 60 BPM without tensing or losing the pulse.",
      easier: "Play eight slow strokes without a metronome.",
      harder: "Move the pattern across two neighbouring strings.",
      safety: "If the forearm hardens, stop and reset the pick grip.",
      bpmChoices: ["Free", "50", "60", "76"],
      visualType: "pick-motion"
    },
    "strum-1": {
      title: "Continuous Down-Up Strum",
      shortTitle: "Strum Engine",
      level: 1,
      hand: "right-hand",
      goal: "Keep the strumming hand moving steadily, even when a stroke does not touch the strings.",
      setup: "Lightly mute all six strings with the fretting hand.",
      steps: [
        "Swing down and up continuously with the beat.",
        "Touch the strings on every downstroke first.",
        "Add selected upstrokes without stopping the swinging motion."
      ],
      listenFor: ["Steady pulse", "Balanced down/up sound", "No frozen hand"],
      passCondition: "Keep the hand moving for 30 seconds at 60 BPM without losing the beat.",
      easier: "Play downstrokes only while the hand returns silently upward.",
      harder: "Apply the motion to Am and C without interrupting the pulse.",
      safety: "The wrist and elbow should feel loose, not locked.",
      bpmChoices: ["Free", "60", "76", "100"],
      visualType: "strum-path"
    },
    "shuffle-1": {
      title: "Blues Shuffle Pulse",
      shortTitle: "Shuffle",
      level: 1,
      hand: "right-hand",
      goal: "Feel the long-short swing that gives a blues shuffle its movement.",
      setup: "Use one muted string or a simple A5 shape before adding chord changes.",
      steps: [
        "Say long-short while tapping the pulse.",
        "Play the same long-short shape on one string.",
        "Keep the beat steady while the notes lean into the shuffle."
      ],
      listenFor: ["Long-short feel", "Steady main beat", "Relaxed attack"],
      passCondition: "Hold the shuffle for four bars without straightening the rhythm.",
      easier: "Clap and say the rhythm before touching the guitar.",
      harder: "Use an A blues accompaniment and accent beats 2 and 4.",
      safety: "Reduce the tempo if the hand begins to jab at the strings.",
      bpmChoices: ["50", "60", "76"],
      visualType: "rhythm-grid"
    },
    "pima-1": {
      title: "P-I-M-A Open-String Pattern",
      shortTitle: "PIMA",
      level: 1,
      hand: "right-hand",
      goal: "Give the thumb and three fingers clear, separate jobs.",
      setup: "Use open strings: thumb on a bass string, i on G, m on B, a on high e.",
      steps: [
        "Play p, i, m, a slowly and let each string ring.",
        "Return a, m, i while the thumb stays ready.",
        "Repeat without the hand collapsing toward the strings."
      ],
      listenFor: ["Even tone", "Each finger returns calmly", "No snatching"],
      passCondition: "Complete five even P-I-M-A cycles without losing finger assignment.",
      easier: "Use only p and i.",
      harder: "Play P-I-M-A-M-I over an A minor chord.",
      safety: "Keep the wrist neutral and stop if the hand cramps.",
      bpmChoices: ["Free", "50", "60"],
      visualType: "finger-assignment"
    },
    "pima-2": {
      title: "Rest Stroke and Free Stroke",
      shortTitle: "Rest / Free",
      level: 1,
      hand: "right-hand",
      goal: "Hear and feel the difference between the two basic finger strokes.",
      setup: "Use the index finger on the first or second string.",
      steps: [
        "Play a rest stroke and let the finger land on the next string.",
        "Play a free stroke and let the finger pass above the next string.",
        "Alternate the two and compare the tone."
      ],
      listenFor: ["Rest stroke sounds firm", "Free stroke stays clear", "Finger moves from the large joint"],
      passCondition: "Produce five recognisable rest strokes and five free strokes on purpose.",
      easier: "Practise the motion on one open string without tempo.",
      harder: "Use rest stroke for a melody while the thumb plays bass notes.",
      safety: "Movement should be deliberate, not forceful.",
      bpmChoices: ["Free", "50"],
      visualType: "stroke-comparison"
    },
    "clean-note-1": {
      categoryId: "coordination",
      title: "One Clean Synchronized Note",
      shortTitle: "Clean Note",
      difficulty: 1,
      level: 1,
      hand: "both-hands",
      bpm: "Free",
      duration: "3 min",
      source: "Hearth synthesis: clean-contact principles",
      style: "fundamentals",
      body: "<p>Land the fingertip just behind the fret, then let the picking hand sound the note once. Release and repeat without squeezing.</p>",
      goal: "Make the fretting and picking hands agree on one clear note.",
      setup: "Choose the second string around fret 5.",
      steps: ["Prepare the fretting finger.", "Pick once as the finger reaches clean pressure.", "Listen, release, and reset."],
      listenFor: ["Clear beginning", "No buzz", "No extra string noise"],
      passCondition: "Make five clean notes in a row with the same relaxed movement.",
      easier: "Fret first, pause, then pick.",
      harder: "Synchronize the contact and pick exactly with a 60 BPM click.",
      safety: "Use only enough pressure to make the note clear.",
      bpmChoices: ["Free", "50", "60"],
      visualType: "two-hand-sync"
    },
    "chord-clean-am": {
      categoryId: "chords",
      title: "A Minor Clean Chord Check",
      shortTitle: "Clean Am",
      difficulty: 1,
      level: 1,
      hand: "both-hands",
      bpm: "Free",
      duration: "4 min",
      source: "Hearth synthesis: beginner chord-check routine",
      style: "rock",
      body: "<p>Build A minor, then check the strings one at a time before strumming the full chord.</p>",
      goal: "Turn the A minor shape into five clear, usable strings.",
      setup: "Place the A minor shape and keep the low E string silent.",
      steps: ["Build the shape from the lowest finger upward.", "Pick strings 5 to 1 one at a time.", "Adjust one finger only, then strum the chord."],
      listenFor: ["Five clear strings", "No muted high e", "Low E stays quiet"],
      passCondition: "Build and check a clean A minor chord three times.",
      easier: "Place and check one finger at a time.",
      harder: "Build the full shape silently before the next click.",
      safety: "Do not squeeze harder when one string is muted; change the fingertip angle.",
      bpmChoices: ["Free", "50", "60"],
      visualType: "chord-diagram"
    },
    "chord-change-am-c": {
      categoryId: "chords",
      title: "A Minor to C Change",
      shortTitle: "Am to C",
      difficulty: 1,
      level: 1,
      hand: "both-hands",
      bpm: "Free-60",
      duration: "5 min",
      source: "Hearth synthesis: shared-finger chord transition",
      style: "rock",
      body: "<p>Move between A minor and C while noticing that two fingers can keep their relationship.</p>",
      goal: "Make one small, organised chord change instead of rebuilding from nothing.",
      setup: "Form A minor. Notice which fingers keep the same spacing when moving to C.",
      steps: ["Play A minor once.", "Move the ring finger to form C while the hand stays close.", "Play C once, then return slowly."],
      listenFor: ["No pause caused by lifting too far", "Clear bass note", "Relaxed thumb"],
      passCondition: "Complete eight clean changes at a steady 50 BPM.",
      easier: "Practise the silent movement without strumming.",
      harder: "Use four strums per chord at 60 BPM.",
      safety: "Pause if the thumb begins clamping the neck.",
      bpmChoices: ["Free", "50", "60"],
      visualType: "chord-change"
    },
    "pent-roots-time": {
      categoryId: "coordination",
      title: "A Root Notes in Time",
      shortTitle: "A Roots",
      difficulty: 1,
      level: 1,
      hand: "both-hands",
      bpm: "60-100",
      duration: "5 min",
      source: "Jen lesson: A minor pentatonic consolidation",
      style: "blues",
      body: "<p>Use the A root notes inside pentatonic box 1 as safe landing points. Make the roots musical before adding the rest of the scale.</p>",
      goal: "Feel where home is inside the A minor pentatonic shape.",
      setup: "Locate the A roots in box 1 before starting the metronome.",
      steps: ["Play only A roots at 60 BPM.", "Leave rests between notes and vary the rhythm.", "Add one nearby pentatonic note, then return home."],
      listenFor: ["Roots sound settled", "Silence stays in time", "No random rushing"],
      passCondition: "Create a four-bar root-note phrase that stays in time and ends on A.",
      easier: "Use one A root only at 60 BPM.",
      harder: "Repeat at 76, then 100 BPM, adding two scale notes.",
      safety: "Keep movements small as you cross strings.",
      bpmChoices: ["60", "76", "100"],
      visualType: "fretboard-roots"
    }
  };

  function ensureCategory(doing, category) {
    var found = doing.categories.find(function findCategory(item) {
      return item.id === category.id;
    });
    if (found) return found;
    doing.categories.push(category);
    return category;
  }

  function findDrill(doing, drillId) {
    var found = null;
    doing.categories.some(function findCategory(cat) {
      var drill = cat.drills.find(function findItem(item) { return item.id === drillId; });
      if (!drill) return false;
      found = drill;
      return true;
    });
    return found;
  }

  function apply(doing) {
    if (!doing || !Array.isArray(doing.categories)) return doing;

    doing.categories.forEach(function markDrafts(cat) {
      cat.drills.forEach(function markDraft(drill) {
        drill.reviewStatus = "draft";
      });
    });

    ensureCategory(doing, {
      id: "chords",
      title: "Chords",
      icon: "",
      styles: ["rock", "folk", "pop"],
      drills: []
    });
    ensureCategory(doing, {
      id: "coordination",
      title: "Coordination",
      icon: "",
      styles: ["fundamentals", "rock", "blues"],
      drills: []
    });

    Object.keys(REVIEWED).forEach(function applyReview(drillId) {
      var reviewed = REVIEWED[drillId];
      var drill = findDrill(doing, drillId);
      if (!drill && reviewed.categoryId) {
        var targetCategory = doing.categories.find(function findTarget(cat) {
          return cat.id === reviewed.categoryId;
        });
        drill = { id: drillId };
        targetCategory.drills.push(drill);
      }
      if (!drill) return;
      Object.keys(reviewed).forEach(function copyField(key) {
        if (key !== "categoryId") drill[key] = reviewed[key];
      });
      drill.reviewStatus = "approved";
    });

    doing.catalog = {
      version: "1.0.0",
      approvedCount: Object.keys(REVIEWED).length,
      archiveCount: doing.categories.reduce(function countDrills(total, cat) {
        return total + cat.drills.filter(function isDraft(drill) { return drill.reviewStatus !== "approved"; }).length;
      }, 0)
    };
    return doing;
  }

  function isApproved(drill) {
    return Boolean(drill && drill.reviewStatus === "approved");
  }

  return {
    version: "1.0.0",
    reviewed: REVIEWED,
    apply: apply,
    findDrill: findDrill,
    isApproved: isApproved
  };
});
