/*
 * Foundation audio adapter v0.
 *
 * Shared tone helper for legacy Foundation action renderers. Kept outside the
 * lesson file so renderer code can move without carrying audio globals along.
 */
(function initFoundationAudio(root) {
  "use strict";

  function playTone(freq, type, duration, volume) {
    type = type || "sine";
    duration = duration || 1.2;
    volume = volume || 0.12;

    try {
      var AudioClass = root.AudioContext || root.webkitAudioContext;
      var ctx = new AudioClass();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
      osc.onended = function closeAudioContext() {
        try {
          ctx.close();
        } catch (error) {}
      };
    } catch (error) {}
  }

  root.HearthFoundationAudio = {
    version: "0.1.0",
    playTone: playTone
  };
  root._l1_playTone = playTone;
})(typeof globalThis !== "undefined" ? globalThis : this);
