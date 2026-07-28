/*
 * Mastery exemplars v1.
 *
 * These records describe what the learner is studying, while the Phoenix
 * viewer owns only the encounter flow and rendering.
 */
(function initMasteryData(root) {
  "use strict";

  root.MASTERY_EXEMPLARS = [
    {
      id: "level-1-pentatonic-voice",
      level: 1,
      category: "scales",
      title: "Pentatonic in Motion",
      sourceLabel: "QJamTracks · Level 1 pentatonic source",
      sourceTitle: "THIS is how you learn the PENTATONICS",
      sourceUrl: "https://www.youtube.com/watch?v=X9rYOhX77mA",
      reason: "A small note map can become a musical voice.",
      noticePrompt: "Listen for what makes a small group of notes sound intentional.",
      noticeOptions: [
        { id: "root-home", label: "Root notes feel like home" },
        { id: "rhythm-speaks", label: "Rhythm gives the notes a voice" },
        { id: "space-breathes", label: "Space makes the phrase breathe" },
        { id: "touch-colours", label: "Touch changes the colour" }
      ],
      tryPrompt: "Use one A root as home, then let two nearby pentatonic notes answer it.",
      tryOptions: [
        { id: "return-to-root", label: "Return to A" },
        { id: "change-the-rhythm", label: "Change the rhythm" },
        { id: "leave-a-space", label: "Leave a space" },
        { id: "change-the-touch", label: "Change the touch" }
      ],
      practiceInstruction: "Play the idea at 60 BPM, then carry it into a two-bar phrase over an A minor groove.",
      createStarter: "Make a two-bar answer from one A root note and two nearby pentatonic notes over an A minor groove.",
      carryPrompt: "Keep one choice from the encounter and let it become part of your own playing."
    }
  ];
})(typeof window !== "undefined" ? window : globalThis);
