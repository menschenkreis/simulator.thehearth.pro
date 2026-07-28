/*
 * Text-to-speech controller adapter v0.
 *
 * Keeps legacy lesson read-aloud behavior outside the large simulator page.
 */
(function initTextToSpeechController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthTextToSpeechController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createTextToSpeechController(root) {
  "use strict";

  var PREFERRED_VOICES = [
    "Google US English",
    "Microsoft Zira",
    "Samantha",
    "Karen",
    "Victoria",
    "Alex",
    "Google UK English Female"
  ];

  function readableText(body) {
    if (!body || typeof body.querySelectorAll !== "function") return "";
    var paragraphs = body.querySelectorAll("p");
    return Array.prototype.map.call(paragraphs, function paragraphText(paragraph) {
      return paragraph.textContent || "";
    }).join(" ").replace(/☐/g, "");
  }

  function preferredVoice(voices) {
    voices = voices || [];
    var voice = voices.find(function findPreferred(candidate) {
      return PREFERRED_VOICES.some(function hasPreferredName(name) {
        return candidate.name && candidate.name.indexOf(name) !== -1;
      });
    });
    if (voice) return voice;
    voice = voices.find(function findFemaleEnglish(candidate) {
      return candidate.lang && candidate.lang.indexOf("en") === 0 && candidate.name && candidate.name.indexOf("Female") !== -1;
    });
    if (voice) return voice;
    return voices.find(function findEnglish(candidate) {
      return candidate.lang && candidate.lang.indexOf("en") === 0;
    }) || null;
  }

  function updateButton(playing, doc) {
    doc = doc || root.document;
    if (!doc) return;
    var btn = doc.getElementById("ttsBtn");
    if (!btn) return;
    btn.textContent = playing ? "Stop" : "Read aloud";
    btn.style.background = playing ? "var(--ember)" : "var(--card)";
    btn.style.color = playing ? "white" : "var(--gold)";
  }

  function toggle(state, options) {
    options = options || {};
    state = state || { utterance: null, playing: false };
    var doc = options.document || root.document;
    var synth = options.speechSynthesis || root.speechSynthesis;
    var Utterance = options.Utterance || root.SpeechSynthesisUtterance;
    if (!doc || !synth || !Utterance) return state;

    if (state.playing && synth.speaking) {
      synth.cancel();
      state.playing = false;
      updateButton(false, doc);
      return state;
    }

    var body = doc.getElementById("fStepBody");
    var text = readableText(body);
    if (!text.trim()) return state;

    var utterance = new Utterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.lang = "en-US";
    var voice = preferredVoice(typeof synth.getVoices === "function" ? synth.getVoices() : []);
    if (voice) utterance.voice = voice;

    utterance.onend = function onReadAloudEnd() {
      state.playing = false;
      updateButton(false, doc);
      if (typeof options.onStateChange === "function") options.onStateChange(state);
    };

    synth.cancel();
    synth.speak(utterance);
    state.utterance = utterance;
    state.playing = true;
    updateButton(true, doc);
    return state;
  }

  return {
    version: "0.1.0",
    preferredVoice: preferredVoice,
    readableText: readableText,
    toggle: toggle,
    updateButton: updateButton
  };
});
