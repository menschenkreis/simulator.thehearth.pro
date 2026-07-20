/*
 * Shared Level 1 song thread.
 *
 * This is deliberately authored for the prototype so every node can refer to
 * one rights-safe musical object without copying a commercial song or TAB.
 */
(function initLevelOneSongThread(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthLevelOneSongThread = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createLevelOneSongThread() {
  "use strict";

  return {
    version: "1.0.0",
    id: "level-1-a-minor-homecoming",
    sourceId: "hearth-original-level-1-a-minor-homecoming",
    title: "A Minor Homecoming",
    authorship: "Original Hearth Mastery learning mini-piece",
    rights: "Original prototype content; no commercial song, lyrics, recording, or notation copied.",
    purpose: "Hold a simple rhythm part, answer with a small A minor pentatonic phrase, then swap roles.",
    tempo: { default: 60, choices: [60, 76, 100] },
    meter: "4/4",
    progression: [
      { bar: 1, chord: "Am" },
      { bar: 2, chord: "Am" },
      { bar: 3, chord: "C" },
      { bar: 4, chord: "C" },
      { bar: 5, chord: "G" },
      { bar: 6, chord: "G" },
      { bar: 7, chord: "Am" },
      { bar: 8, chord: "Am" }
    ],
    rhythm: {
      label: "Steady ground",
      count: ["1", "&", "2", "&", "3", "&", "4", "&"],
      strokes: ["D", "-", "D", "-", "D", "-", "D", "-"],
      easier: "Mute the strings and play quarter-note downstrokes without changing chords.",
      next: "Keep the hand moving down-up and add a light upstroke on the final &."
    },
    lead: {
      label: "Small answer",
      strings: ["e", "B", "G", "D", "A", "E"],
      steps: [
        { count: "1", string: "G", fret: 5, note: "C", frequency: 261.63 },
        { count: "2", string: "G", fret: 7, note: "D", frequency: 293.66 },
        { count: "3", string: "B", fret: 5, note: "E", frequency: 329.63 },
        { count: "4", string: "G", fret: 7, note: "D", frequency: 293.66 },
        { count: "1", string: "D", fret: 7, note: "A", frequency: 220.0, root: true }
      ],
      easier: "Play only the final A root on beat 1 and listen to it settle.",
      next: "Change one rhythm or one ending note, but keep A as the landing point."
    },
    listening: {
      prompt: "Which part holds the ground, which part speaks, and where does the music feel settled?",
      roles: [
        { id: "rhythm", label: "Rhythm only", notice: "The steady notes hold the ground." },
        { id: "lead", label: "Lead only", notice: "The phrase moves, leaves space, then lands." },
        { id: "together", label: "Together", notice: "The roles are different, but they share the same pulse." }
      ]
    },
    completion: {
      easier: "One learner holds muted quarter notes while the other plays only one A root.",
      passCondition: "Complete all eight bars, try both roles, stay with the pulse, and name one thing to repeat.",
      evidence: "A teacher observation, recording reference, or complete guided take."
    },
    capabilityIds: [
      "L1-TIME-01",
      "L1-TIME-02",
      "L1-HARM-02",
      "L1-MAP-02",
      "L1-EAR-01",
      "L1-READ-01",
      "L1-PLAY-01",
      "L1-SONG-01",
      "L1-ROLE-01"
    ]
  };
});
