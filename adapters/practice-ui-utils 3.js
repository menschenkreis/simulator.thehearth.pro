/*
 * Practice UI utilities adapter v0.
 *
 * Shared Practice display helpers for streaks, relative time, and feeling labels.
 */
(function initPracticeUiUtils(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthPracticeUiUtils = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPracticeUiUtils() {
  "use strict";

  function statBox(icon, value, label, extra) {
    return '<div style="flex:1;background:var(--card);border:1px solid var(--border);border-radius:8px;padding:12px 8px;text-align:center">' +
      '<div style="font-size:1.2rem;margin-bottom:2px">' + icon + '</div>' +
      '<div style="font-family:Cinzel,serif;color:var(--text);font-size:1.1rem;font-weight:700">' + value + (extra || "") + '</div>' +
      '<div style="font-size:0.6rem;color:var(--dim)">' + label + '</div>' +
    '</div>';
  }

  function calcStreak(log, now) {
    log = log || [];
    now = now || new Date();
    if (!log.length) return 0;
    var days = log.map(function sessionDay(session) {
      return new Date(session.ts).toDateString();
    });
    var unique = Array.from(new Set(days)).sort(function newestFirst(a, b) {
      return new Date(b) - new Date(a);
    });
    var streak = 1;
    for (var index = 1; index < unique.length; index++) {
      var diff = (new Date(unique[index - 1]) - new Date(unique[index])) / (1000 * 60 * 60 * 24);
      if (Math.round(diff) === 1) streak++;
      else break;
    }
    if (unique[0] !== now.toDateString()) return 0;
    return streak;
  }

  function timeAgo(date, now) {
    now = now || new Date();
    var seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return Math.floor(seconds / 60) + "m ago";
    if (seconds < 86400) return Math.floor(seconds / 3600) + "h ago";
    return Math.floor(seconds / 86400) + "d ago";
  }

  function feelingEmoji(feeling) {
    return feeling === "nailed" ? "\uD83D\uDD25" : feeling === "getting" ? "\uD83D\uDCAA" : "\uD83E\uDD14";
  }

  function feelingColor(feeling, candleColor) {
    candleColor = candleColor || "#e8a020";
    return feeling === "nailed" ? "#2ecc71" : feeling === "getting" ? candleColor : "#e74c3c";
  }

  return {
    version: "0.1.0",
    calcStreak: calcStreak,
    feelingColor: feelingColor,
    feelingEmoji: feelingEmoji,
    statBox: statBox,
    timeAgo: timeAgo
  };
});
