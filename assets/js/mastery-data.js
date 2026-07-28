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
      id: "level-1-bb-king-space-and-answer",
      level: 1,
      category: "blues phrasing",
      title: "Space, Answer, Home",
      artist: "B.B. King",
      sourceType: "live performance",
      sourceLabel: "Stages · live at Montreux 1993",
      sourceTitle: "B.B. King - The Thrill Is Gone (Live at Montreux 1993)",
      sourceUrl: "https://www.youtube.com/watch?v=4fk2prKnYnI",
      sourceCheckedAt: "2026-07-20",
      rightsNote: "External performance reference only; no recording, lyrics, or notation are copied into the simulator.",
      reason: "B.B. King shows how a small pentatonic vocabulary can speak through timing, touch, silence, and clear musical answers.",
      noticePrompt: "Listen for one short guitar statement, the silence after it, and the note that makes the phrase feel settled.",
      noticeOptions: [
        { id: "space-breathes", label: "He leaves space after the phrase" },
        { id: "root-home", label: "The landing note feels settled" },
        { id: "rhythm-section-holds", label: "The band holds the ground" },
        { id: "touch-colours", label: "Touch makes one note expressive" }
      ],
      tryPrompt: "Bring the principle into A Minor Homecoming: play a tiny answer, leave a full space, then return to A.",
      tryOptions: [
        { id: "leave-a-space", label: "Leave four quiet beats" },
        { id: "return-to-root", label: "End the answer on A" },
        { id: "change-the-rhythm", label: "Repeat with a new rhythm" },
        { id: "change-the-touch", label: "Change the touch on one note" }
      ],
      mediaFallback: "If the performance cannot open, use the A Minor Homecoming guide tones: play one two-note answer, count four quiet beats, then land on A.",
      practiceInstruction: "At 60 BPM, play a two-note answer, leave one full bar of space, then return to A inside A Minor Homecoming.",
      createStarter: "A two-bar A minor pentatonic answer with a full space before the final A.",
      carryPrompt: "Keep one choice about space, landing, rhythm, or touch and let it change your own A Minor Homecoming phrase.",
      reflectionPrompt: "What did the master do with fewer notes that you want to remember?",
      capabilityIds: ["L1-STYLE-01"]
    }
  ];
})(typeof window !== "undefined" ? window : globalThis);
