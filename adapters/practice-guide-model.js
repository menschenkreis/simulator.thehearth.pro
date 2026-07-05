/*
 * Practice guide model adapter v0.
 *
 * Chooses contextual Practice Temple guidance from preferences, log, and next drill.
 */
(function initPracticeGuideModel(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthPracticeGuideModel = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPracticeGuideModel() {
  "use strict";

  function guideText(prefs, log, nextDrill) {
    prefs = prefs || {};
    log = log || [];
    if (log.length) {
      var last = log[log.length - 1];
      if (last.feeling === "stuck") {
        return "Last time was a wall. That is not failure - it is information. The gradient was too steep. Today: slower tempo, shorter candle, one movement only. Let the body remember clean before fast.";
      }
      if (last.feeling === "nailed") {
        return "You left last session with clean hands. Good. Today the temptation is to skip ahead. Resist. Prove it again at the same tempo. Mastery is repetition, not novelty.";
      }
      if (last.feeling === "ok") {
        return "Last session was somewhere in the middle - not stuck, not clean. That is normal. Today pick one thing from that session and isolate it. Narrow the focus, deepen the work.";
      }
    }
    if (prefs.time <= 5) {
      return "Five minutes. That is enough to wake the hands and remind the fingers where they live. Choose one drill. Play it clean three times. Done. Consistency beats duration.";
    }
    if (prefs.time <= 10) {
      return "Short candle. Choose one small movement - a warm-up, a scale shape, a chord change. Leave while the hands still feel clean. The temple rewards discipline, not marathon sessions.";
    }
    if (prefs.time >= 30) {
      return "Long candle today. Structure matters: warm-up first, then one focused drill, then musical application (play a song or improvise). End with reflection. Without structure, long sessions become mindless repetition.";
    }
    if (prefs.focus !== "All" && prefs.focus !== "") {
      return "The book is open to " + prefs.focus + ". Good - the temple is here to narrow attention, not to do everything. One category, one drill, one clear intention. That is how progress happens.";
    }
    if (nextDrill) {
      return "Begin with " + nextDrill.title + ". Set the metronome slow enough that every note is clean. If you hear buzzing, uneven tone, or tension in the shoulders - stop, breathe, go slower. Speed is a byproduct of clean repetition.";
    }
    return "Choose a candle, open the book, and make one clear promise to the hands. The temple does not ask for perfection. It asks for presence.";
  }

  function drillGuideText(drill) {
    var category = drill && drill.category;
    if (category === "Warm-Up") return "Warm-up is not optional. It is the bridge between rest and play. Start slow, feel the blood flow, then begin.";
    if (category === "Technique") return "Technique is not about speed. It is about control. If you cannot play it slow and clean, you cannot play it fast and clean.";
    if (category === "Scales") return "Scales are not exercises. They are vocabulary. Learn the shape, then learn to speak with it.";
    if (category === "Chords") return "Chords are shapes, but they are also sounds. Listen to each string - is every note ringing?";
    if (category === "Rhythm") return "Rhythm is the foundation. Without it, notes are just noise. Feel the pulse in your body before you play it with your hands.";
    if (category === "Speed") return "Speed is a byproduct of clean repetition. Never practice faster than you can play clean. The speed will come.";
    if (category === "Ear Training") return "The ear is the most important tool. Train it like you train your fingers - daily, patiently, with intention.";
    if (category === "Music") return "This is why we practice. Not to play exercises, but to play music. Apply what you know.";
    return "Sit with this drill. Listen for what changes between the first repetition and the last.";
  }

  return {
    version: "0.1.0",
    drillGuideText: drillGuideText,
    guideText: guideText
  };
});
