// Active Play atlas entrance.
// The deeper Play shrine stays in assets/js/play-world.js as PlayWorld.detail/lens/lensPanel.
(function initPlayAtlasViewer(root) {
  "use strict";

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[ch];
    });
  }

  function panel() {
    root.document.querySelectorAll(".pnl").forEach(function (pnl) {
      pnl.classList.remove("on");
    });
    var el = root.document.getElementById("p-foundation");
    if (el) el.classList.add("on");
    return el;
  }

  function regions() {
    return root.WORLD_MAP_REGIONS || [];
  }

  function ensureStyle() {
    if (root.document.getElementById("play-atlas-style")) return;
    var style = root.document.createElement("style");
    style.id = "play-atlas-style";
    style.textContent = [
      ".sf-wrap{padding:18px;max-width:980px;margin:0 auto;display:flex;flex-direction:column}",
      ".sf-scene{position:relative;border:1px solid var(--border);border-radius:22px;overflow:visible;background:radial-gradient(circle at 50% 35%,rgba(212,175,105,.13),rgba(13,11,8,.96) 55%,#080704);box-shadow:0 20px 60px rgba(0,0,0,.35)}",
      ".sf-scene:before{content:\"\";position:absolute;inset:0;background:radial-gradient(circle at 20% 20%,rgba(232,160,32,.08),transparent 24%),radial-gradient(circle at 80% 70%,rgba(138,106,170,.09),transparent 28%);pointer-events:none}",
      ".sf-top{position:relative;z-index:2;display:flex;justify-content:space-between;gap:14px;align-items:flex-start;padding:18px}",
      ".sf-node-ident{display:flex;align-items:center;gap:11px;margin-bottom:8px}",
      ".sf-node-ident>img{width:58px;height:58px;border-radius:50%;object-fit:cover;border:2px solid var(--sf,var(--gold));box-shadow:0 0 18px color-mix(in srgb,var(--sf,var(--gold)),transparent 72%);background:#0d0b08}",
      ".sf-kicker{font-family:JetBrains Mono;font-size:.58rem;color:var(--sf,var(--gold));letter-spacing:.16em;text-transform:uppercase}",
      ".sf-title{font-family:Cinzel;color:var(--sf,var(--gold));font-size:1.55rem;font-weight:800;margin:2px 0}",
      ".sf-sub{font-size:.78rem;color:var(--dim);line-height:1.55;max-width:560px}",
      ".sf-guide{display:flex;gap:9px;align-items:center;max-width:290px;background:rgba(13,11,8,.58);border:1px solid var(--border);border-radius:13px;padding:10px;font-size:.72rem;color:var(--text);line-height:1.42}",
      ".sf-guide img{width:68px;height:68px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,.42));animation:char-float 3s ease-in-out infinite}",
      ".sf-stage{position:relative;z-index:2;display:flex;justify-content:center;align-items:center;min-height:280px;padding:8px 18px 18px}",
      ".sf-drawer{position:relative;z-index:2;margin:0 18px 18px;background:rgba(13,11,8,.74);border:1px solid var(--border);border-radius:16px;padding:14px;color:var(--text);font-size:.78rem;line-height:1.55}",
      ".sf-map-wrap{position:relative;width:min(100%,980px);aspect-ratio:1672/941;min-height:0;margin:0 auto;border-radius:14px;overflow:hidden;background:#0d0b08}",
      ".sf-map-img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block}",
      ".sf-map-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:auto}",
      ".sf-map-guide{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);background:rgba(13,11,8,.88);border:1px solid var(--border);border-radius:8px;padding:10px 20px;z-index:10;pointer-events:none;backdrop-filter:blur(6px);text-align:center;min-width:260px;max-width:400px;transition:all .25s}",
      ".sf-map-guide-region{font-family:Cinzel,serif;font-size:.85rem;color:var(--gold);font-weight:600;margin-bottom:2px}",
      ".sf-map-guide-tradition{font-family:JetBrains Mono,monospace;font-size:.6rem;color:var(--amber);letter-spacing:.08em;text-transform:uppercase}",
      ".sf-map-count{position:absolute;top:12px;right:16px;z-index:10;pointer-events:none;font-family:JetBrains Mono,monospace;font-size:.55rem;color:var(--dim);opacity:.5;letter-spacing:.08em;text-transform:uppercase}",
      "@media(max-width:780px){.sf-top{flex-direction:column}.sf-guide{max-width:none}.sf-stage{min-height:280px}}",
    ].join("");
    root.document.head.appendChild(style);
  }

  function sceneStart() {
    var icon = "images/play-icon.png";
    var title = root.NODE_DATA && root.NODE_DATA.play ? root.NODE_DATA.play.title : "Play";
    return (
      '<div class="sf-wrap">' +
      '<button class="back-btn" onclick="backToMap()">\u2190 Map</button>' +
      '<div class="sf-scene sf-map">' +
      '<div class="sf-top">' +
      "<div>" +
      '<div class="sf-node-ident">' +
      '<img src="' + icon + '" alt="">' +
      "<div>" +
      '<div class="sf-kicker">Play</div>' +
      '<div class="sf-title">' + esc(title) + "</div>" +
      "</div>" +
      "</div>" +
      '<div class="sf-sub">Touch a region. Learn how guitar speaks there.</div>' +
      "</div>" +
      '<div class="sf-guide">' +
      '<img src="images/character-symbols/Encouraging Face Lightbulb.png" alt="">' +
      "<div>Play is a map, not a menu. Click one place and listen for its hand, pulse, scale colour, and story.</div>" +
      "</div>" +
      "</div>"
    );
  }

  function renderPlayAtlas() {
    ensureStyle();
    var el = panel();
    if (!el) return;
    var rs = regions();
    var svgHotspots = "";

    rs.forEach(function (region) {
      svgHotspots +=
        '<g class="sf-hotspot" data-region="' + esc(region.id) + '" ' +
        'onclick="PlayAtlas.openPlay(\'' + esc(region.id) + '\')" ' +
        'onmouseenter="PlayAtlas.mapHover(\'' + esc(region.id) + '\')" ' +
        'onmouseleave="PlayAtlas.mapUnhover()" style="cursor:pointer">' +
        '<circle cx="' + region.coords[0] + '" cy="' + region.coords[1] + '" r="14" fill="none" stroke="' + region.color + '" stroke-width="0.8" opacity="0.15">' +
        '<animate attributeName="r" values="8;20;8" dur="3s" repeatCount="indefinite"/>' +
        '<animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite"/>' +
        "</circle>" +
        '<circle cx="' + region.coords[0] + '" cy="' + region.coords[1] + '" r="7" fill="' + region.color + '" opacity="0.12"/>' +
        '<circle cx="' + region.coords[0] + '" cy="' + region.coords[1] + '" r="3.5" fill="' + region.color + '" opacity="0.7"/>' +
        '<circle cx="' + region.coords[0] + '" cy="' + region.coords[1] + '" r="1.5" fill="white" opacity="0.5"/>' +
        "</g>";
    });

    el.innerHTML =
      sceneStart() +
      '<div class="sf-stage" style="padding:0;min-height:0;flex:1">' +
      '<div class="sf-map-wrap">' +
      '<img class="sf-map-img" src="images/play-world-atlas.webp" alt="World Map of Guitar">' +
      '<svg viewBox="0 0 900 600" class="sf-map-svg">' +
      '<defs><filter id="sf-glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>' +
      svgHotspots +
      "</svg>" +
      '<div class="sf-map-count">' + rs.length + " traditions</div>" +
      '<div class="sf-map-guide" id="sf-map-guide">' +
      '<div class="sf-map-guide-text" id="sf-map-guide-text">Choose a region. Listen for its rhythm, touch, scale colour, and story.</div>' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div id="sf-drawer" class="sf-drawer"></div>' +
      "</div></div>";
  }

  function openPlay(id) {
    if (root.PlayWorld && root.PlayWorld.detail) return root.PlayWorld.detail(id);
    return undefined;
  }

  function mapHover(id) {
    var region = regions().find(function (item) {
      return item.id === id;
    });
    if (!region) return;
    var guide = root.document.getElementById("sf-map-guide-text");
    if (!guide) return;
    guide.innerHTML =
      '<div class="sf-map-guide-region">' + esc(region.name) + "</div>" +
      '<div class="sf-map-guide-tradition">' + esc(region.tradition) + "</div>";
  }

  function mapUnhover() {
    var guide = root.document.getElementById("sf-map-guide-text");
    if (!guide) return;
    guide.innerHTML = "Choose a region. Listen for its rhythm, touch, scale colour, and story.";
  }

  root.PlayAtlas = {
    render: renderPlayAtlas,
    openPlay: openPlay,
    mapHover: mapHover,
    mapUnhover: mapUnhover,
  };
  root.showPlay = renderPlayAtlas;
})(typeof window !== "undefined" ? window : globalThis);
