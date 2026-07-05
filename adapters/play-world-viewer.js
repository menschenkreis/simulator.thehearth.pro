/*
 * Play world viewer adapter v0.
 *
 * Renders the legacy Play world-map overview screen.
 */
(function initPlayWorldViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthPlayWorldViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPlayWorldViewer() {
  "use strict";

  function renderHotspot(region) {
    var coords = region.coords || [0, 0];
    return '<g class="wm-hotspot" data-region="' + region.id + '" ' +
      'onclick="wmClick(\'' + region.id + '\')" ' +
      'onmouseenter="wmHover(\'' + region.id + '\')" ' +
      'onmouseleave="wmUnhover()" ' +
      'style="cursor:pointer">' +
      '<circle class="wm-dot-pulse" cx="' + coords[0] + '" cy="' + coords[1] + '" r="14" fill="none" stroke="' + region.color + '" stroke-width="0.8" opacity="0.15">' +
        '<animate attributeName="r" values="8;20;8" dur="3s" repeatCount="indefinite"/>' +
        '<animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite"/>' +
      '</circle>' +
      '<circle class="wm-dot-ring" cx="' + coords[0] + '" cy="' + coords[1] + '" r="7" fill="' + region.color + '" opacity="0.12" filter="url(#wm-glow)"/>' +
      '<circle class="wm-dot-core" cx="' + coords[0] + '" cy="' + coords[1] + '" r="3.5" fill="' + region.color + '" opacity="0.7" filter="url(#wm-glow-strong)"/>' +
      '<circle cx="' + coords[0] + '" cy="' + coords[1] + '" r="1.5" fill="white" opacity="0.5"/>' +
    '</g>';
  }

  function renderPlayWorld(regions) {
    regions = regions || [];
    return '<div class="play-world-wrap">' +
      '<button class="back-btn" onclick="backToMap()">← Map</button>' +
      '<div class="play-world-header">' +
        '<div class="play-world-title">' +
          '<span style="font-family:\'Cinzel\',serif;color:var(--gold);font-size:1.4rem;font-weight:700;letter-spacing:0.08em">PLAY</span>' +
          '<span style="font-family:JetBrains Mono;font-size:0.6rem;color:var(--amber);letter-spacing:0.12em;margin-left:8px;text-transform:uppercase">World Map of Guitar</span>' +
        '</div>' +
      '</div>' +
      '<div class="play-world-map-container" id="playWorldMap">' +
        '<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" class="world-map-svg" id="worldMapSvg">' +
          '<defs>' +
            '<filter id="wm-glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
            '<filter id="wm-glow-strong"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
          '</defs>' +
          '<g id="wm-hotspots">' + regions.map(renderHotspot).join('') + '</g>' +
        '</svg>' +
        '<div class="play-world-guide" id="playGuide">' +
          '<div class="play-world-guide-text" id="playGuideText">Choose a region. Listen for its rhythm, touch, scale colour, and story.</div>' +
        '</div>' +
      '</div>' +
      '<div class="play-world-count">' + regions.length + ' traditions</div>' +
    '</div>';
  }

  return {
    version: "0.1.0",
    renderHotspot: renderHotspot,
    renderPlayWorld: renderPlayWorld
  };
});
