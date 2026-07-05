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

  return {
    version: "0.1.0",
    guideText: guideText
  };
});
