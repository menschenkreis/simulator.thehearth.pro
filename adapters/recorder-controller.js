/*
 * Recorder controller adapter v0.
 *
 * Keeps the legacy recorder button state update outside the large page.
 */
(function initRecorderController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthRecorderController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createRecorderController(root) {
  "use strict";

  var capture = {
    recorder: null,
    stream: null,
    chunks: [],
    objectUrl: "",
    recording: false,
    hasRecording: false
  };

  function byId(doc, id) {
    return doc && doc.getElementById ? doc.getElementById(id) : null;
  }

  function recorderButton(doc) {
    return byId(doc, "practice-rec-btn") || byId(doc, "rb") || byId(doc, "rec-btn");
  }

  function recorderStatus(doc) {
    return byId(doc, "practice-rs") || byId(doc, "rs");
  }

  function setStatus(doc, text) {
    var status = recorderStatus(doc);
    if (status) status.textContent = text;
  }

  function applyRecordingState(recording, doc) {
    doc = doc || root.document;
    var button = recorderButton(doc);
    var status = recorderStatus(doc);
    if (button && button.classList) {
      if (recording) button.classList.add("on");
      else button.classList.remove("on");
      if (button.setAttribute) button.setAttribute("aria-pressed", recording ? "true" : "false");
      var label = button.querySelector ? button.querySelector("[data-recorder-label]") : null;
      if (label) label.textContent = recording ? "Stop and keep take" : (capture.hasRecording ? "Record another take" : "Capture one take");
      else button.textContent = recording ? "⏹" : "⏺";
    }
    if (status) status.textContent = recording ? "Recording..." : "Saved";
  }

  function toggleRecording(recording, doc) {
    var next = !recording;
    applyRecordingState(next, doc);
    return next;
  }

  function captureSupported() {
    return Boolean(root && root.navigator && root.navigator.mediaDevices && root.navigator.mediaDevices.getUserMedia && root.MediaRecorder);
  }

  function stopTracks() {
    if (capture.stream && capture.stream.getTracks) {
      capture.stream.getTracks().forEach(function stopTrack(track) {
        if (track && track.stop) track.stop();
      });
    }
    capture.stream = null;
  }

  function playbackElement(doc) {
    return byId(doc, "practice-playback");
  }

  function resetButton(doc) {
    return doc && doc.querySelector ? doc.querySelector('[data-practice-flow-action="clear-recording"]') : null;
  }

  function syncPlayback(doc) {
    var playback = playbackElement(doc);
    var reset = resetButton(doc);
    if (playback) {
      if (capture.objectUrl) playback.src = capture.objectUrl;
      playback.hidden = !capture.objectUrl;
    }
    if (reset) reset.hidden = !capture.objectUrl;
    applyRecordingState(capture.recording, doc);
    if (!capture.recording) {
      setStatus(doc, capture.hasRecording ? "Take ready for one honest listen" : "Microphone starts only when you choose");
    }
  }

  function clearCapture(doc) {
    if (capture.recording && capture.recorder && capture.recorder.state !== "inactive") {
      capture.recorder.stop();
    }
    stopTracks();
    if (capture.objectUrl && root.URL && root.URL.revokeObjectURL) root.URL.revokeObjectURL(capture.objectUrl);
    capture.recorder = null;
    capture.chunks = [];
    capture.objectUrl = "";
    capture.recording = false;
    capture.hasRecording = false;
    syncPlayback(doc || root.document);
    return state();
  }

  function state(error) {
    return {
      recording: capture.recording,
      hasRecording: capture.hasRecording,
      error: error || ""
    };
  }

  function startCapture(doc) {
    doc = doc || root.document;
    if (!captureSupported()) {
      setStatus(doc, "Microphone recording needs the local site link");
      return Promise.resolve(state("unsupported"));
    }
    if (capture.objectUrl && root.URL && root.URL.revokeObjectURL) root.URL.revokeObjectURL(capture.objectUrl);
    capture.objectUrl = "";
    capture.hasRecording = false;
    syncPlayback(doc);
    setStatus(doc, "Waiting for microphone permission...");
    return root.navigator.mediaDevices.getUserMedia({ audio: true }).then(function begin(stream) {
      capture.stream = stream;
      capture.chunks = [];
      capture.recorder = new root.MediaRecorder(stream);
      capture.recorder.addEventListener("dataavailable", function collect(event) {
        if (event.data && event.data.size) capture.chunks.push(event.data);
      });
      capture.recorder.start();
      capture.recording = true;
      applyRecordingState(true, doc);
      return state();
    }).catch(function denied() {
      stopTracks();
      capture.recording = false;
      setStatus(doc, "Microphone was not available. You can still leave a listening note.");
      return state("permission");
    });
  }

  function stopCapture(doc) {
    doc = doc || root.document;
    if (!capture.recorder || capture.recorder.state === "inactive") {
      capture.recording = false;
      syncPlayback(doc);
      return Promise.resolve(state());
    }
    setStatus(doc, "Preparing your take...");
    return new Promise(function finish(resolve) {
      capture.recorder.addEventListener("stop", function onStopped() {
        var type = capture.recorder && capture.recorder.mimeType || "audio/webm";
        var blob = new root.Blob(capture.chunks, { type: type });
        capture.objectUrl = root.URL && root.URL.createObjectURL ? root.URL.createObjectURL(blob) : "";
        capture.recording = false;
        capture.hasRecording = Boolean(capture.objectUrl);
        stopTracks();
        syncPlayback(doc);
        resolve(state());
      }, { once: true });
      capture.recorder.stop();
    });
  }

  function toggleCapture(doc) {
    return capture.recording ? stopCapture(doc) : startCapture(doc);
  }

  return {
    version: "0.2.0",
    applyRecordingState: applyRecordingState,
    captureSupported: captureSupported,
    clearCapture: clearCapture,
    state: state,
    sync: syncPlayback,
    toggleCapture: toggleCapture,
    toggleRecording: toggleRecording
  };
});
