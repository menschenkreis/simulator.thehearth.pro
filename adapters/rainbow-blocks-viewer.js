/*
 * Rainbow blocks viewer adapter v0.
 *
 * Keeps the old reusable pyramid/block renderer available while moving it out
 * of the large simulator page.
 */
(function initRainbowBlocksViewer(root, factory) {
  var viewer = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = viewer;
  } else {
    root.HearthRainbowBlocksViewer = viewer;
    root.rainbowBlocks = viewer.renderRainbowBlocks;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createRainbowBlocksViewer() {
  "use strict";

  var RAINBOW = [
    "#e74c3c",
    "#e67e22",
    "#f1c40f",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#e84393",
    "#1abc9c",
    "#e84393"
  ];

  function renderRainbowBlocks(items, opts) {
    items = items || [];
    opts = opts || {};

    var maxWidth = 560;
    var minWidth = 220;
    var n = items.length;
    var step = n > 1 ? (maxWidth - minWidth) / (n - 1) : 0;
    var doneCount = items.filter(function isDone(item) {
      return item.done;
    }).length;
    var sources = opts.sources || [];

    var html = '<div style="padding:24px;max-width:800px;margin:0 auto">' +
      '<button class="back-btn" onclick="backToMap()">&#8592; Map</button>' +
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">' +
      (opts.icon ? '<img src="' + opts.icon + '" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:3px solid var(--gold);box-shadow:0 0 16px rgba(212,175,105,0.12)"/>' : '<div style="width:64px;height:64px;border-radius:50%;border:3px solid var(--gold);box-shadow:0 0 16px rgba(212,175,105,0.12);display:flex;align-items:center;justify-content:center;font-family:Cinzel,serif;color:var(--gold);font-size:1.5rem;font-weight:700">' + String(opts.title || "").charAt(0) + "</div>") +
      '<div><h2 style="font-family:\'DM Sans\',sans-serif;color:var(--gold);font-size:1.3rem;margin:0;font-weight:700">' + (opts.title || "") + "</h2>" +
      '<div style="font-family:JetBrains Mono;font-size:0.65rem;color:var(--amber);margin-top:4px">' + doneCount + "/" + n + " blocks</div>" +
      "</div></div>" +
      '<div style="display:flex;flex-direction:column;align-items:center;gap:0;margin-top:20px">';

    for (var i = n - 1; i >= 0; i--) {
      var item = items[i];
      var width = maxWidth - step * i;
      var isLocked = item.locked;
      var isDone = item.done;
      var num = i + 1;
      var color = RAINBOW[i % RAINBOW.length];

      if (isLocked) {
        html += '<div style="' +
          "width:" + width + "px;padding:8px 12px;" +
          "background:transparent;" +
          "border:1px dashed " + color + "40;" +
          "border-radius:6px;" +
          "text-align:center;" +
          "position:relative;" +
          "z-index:" + (n - i) +
          '">' +
          '<div style="display:flex;align-items:center;justify-content:center;gap:8px">' +
          '<span style="font-family:\'DM Sans\',sans-serif;font-size:1.2rem;color:' + color + '40">' + num + "</span>" +
          '<span style="font-family:\'DM Sans\',sans-serif;font-size:1rem;color:' + color + '30;font-weight:600">' + item.title + "</span>" +
          (item.count ? '<span style="font-family:JetBrains Mono;font-size:0.55rem;color:' + color + '30">' + item.count + " " + item.countLabel + "</span>" : "") +
          "</div>" +
          "</div>";
      } else {
        var bg = isDone ? color : color + "18";
        var border = isDone ? color : color + "60";
        var textColor = isDone ? "#fff" : color;
        var numColor = isDone ? "rgba(255,255,255,0.7)" : color;
        var clickAttr = opts.clickFn ? 'onclick="' + opts.clickFn + "('" + item.id + '\')"' : "";
        html += "<div " + clickAttr + ' style="' +
          "width:" + width + "px;padding:12px 16px;" +
          "background:" + bg + ";" +
          "border:2px solid " + border + ";" +
          "border-radius:6px;" +
          "cursor:pointer;transition:all 0.15s;" +
          "text-align:center;" +
          "position:relative;" +
          "z-index:" + (n - i) +
          '">' +
          '<div style="display:flex;align-items:center;justify-content:center;gap:8px">' +
          '<span style="font-family:\'DM Sans\',sans-serif;font-size:2rem;color:' + numColor + ";opacity:" + (isDone ? "1" : "0.6") + ';font-weight:700">' + num + "</span>" +
          '<span style="font-family:\'DM Sans\',sans-serif;font-size:1.15rem;color:' + textColor + ';font-weight:700">' + item.title + "</span>" +
          (item.count ? '<span style="font-family:JetBrains Mono;font-size:0.55rem;color:' + (isDone ? "rgba(255,255,255,0.6)" : color) + '">' + item.count + " " + item.countLabel + "</span>" : "") +
          (isDone ? '<span style="font-size:0.8rem;color:rgba(255,255,255,0.8)">&#10003;</span>' : "") +
          "</div>" +
          "</div>";
      }
    }

    html += "</div>" +
      '<div style="margin-top:24px;padding-top:12px;border-top:1px solid var(--border);text-align:center">' +
      '<p style="font-size:0.6rem;color:var(--dim)">Sources: ' + sources.join(" · ") + "</p>" +
      "</div>" +
      "</div>";

    return html;
  }

  return {
    version: "0.1.0",
    renderRainbowBlocks: renderRainbowBlocks
  };
});
