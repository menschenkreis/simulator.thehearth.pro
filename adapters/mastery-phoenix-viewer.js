// Active Mastery Phoenix scene.
(function initMasteryPhoenixViewer(root) {
  "use strict";

  var GOLD = "#d4af69";
  var FIRE = "#c45a20";
  var PHOENIX = "#ff6b35";

  var MASTERY_SEALS = [
    {
      id: "microtones",
      name: "Hear Between Notes",
      artist: "Maddie Ashman",
      color: "#9b59b6",
      why: "Beyond the 12-fret map: microtonal colour, bends, maqam/raga/blues territory.",
      practice: "Bend slowly between two frets and hold the in-between pitch until it stops sounding wrong.",
    },
    {
      id: "voice",
      name: "Find Your Voice",
      artist: "Jimi Hendrix / Sister Rosetta Tharpe",
      color: "#ff6b35",
      why: "Beyond copying technique: touch, tone, timing and identity become unmistakable.",
      practice: "Play one simple phrase three ways until one version sounds like you.",
    },
    {
      id: "composition",
      name: "Transform Skill Into Art",
      artist: "Joni Mitchell / Joao Gilberto",
      color: "#5a9fd4",
      why: "Beyond exercises: harmony, rhythm and tuning become a personal world.",
      practice: "Take one known chord shape and alter tuning/voicing until it suggests a new song.",
    },
    {
      id: "teaching",
      name: "Transmit The Fire",
      artist: "The lineage of teachers",
      color: "#2ecc71",
      why: "Beyond personal ability: you can guide another person through the path.",
      practice: "Teach a beginner one concept without jargon, then watch where they get stuck.",
    },
  ];

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

  function ensureStyle() {
    if (root.document.getElementById("mastery-phoenix-style")) return;
    var style = root.document.createElement("style");
    style.id = "mastery-phoenix-style";
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
      ".sf-door-summary{position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;padding:0 18px 12px}",
      ".sf-door-summary div{border:1px solid rgba(212,175,105,.1);border-radius:12px;background:rgba(13,11,8,.38);padding:10px 12px;min-width:0}",
      ".sf-door-summary strong{display:block;font-family:Cinzel,serif;color:var(--sf,var(--gold));font-size:.72rem;margin-bottom:4px}",
      ".sf-door-summary span{display:block;color:var(--dim);font-size:.68rem;line-height:1.38}",
      ".sf-stage{position:relative;z-index:2;display:flex;justify-content:center;align-items:center;min-height:280px;padding:8px 18px 18px}",
      ".sf-phoenix svg{width:min(680px,100%);display:block}",
      ".sf-phoenix .seal{cursor:pointer;transition:.2s}",
      ".sf-phoenix .seal:hover{filter:drop-shadow(0 0 14px var(--sf,var(--gold)));transform-origin:center}",
      ".sf-drawer{position:relative;z-index:2;margin:0 18px 18px;background:rgba(13,11,8,.74);border:1px solid var(--border);border-radius:16px;padding:14px;color:var(--text);font-size:.78rem;line-height:1.55}",
      ".sf-primary-row{position:relative;z-index:2;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;padding:0 18px 16px}",
      ".sf-primary{background:var(--sf,var(--gold));color:#0d0b08;border:none;border-radius:999px;padding:10px 18px;font-family:DM Sans,sans-serif;font-weight:900;cursor:pointer;box-shadow:0 8px 24px color-mix(in srgb,var(--sf,var(--gold)),transparent 75%)}",
      ".sf-secondary{background:rgba(13,11,8,.62);color:var(--sf,var(--gold));border:1px solid color-mix(in srgb,var(--sf,var(--gold)),transparent 55%);border-radius:999px;padding:9px 13px;font-weight:800;cursor:pointer}",
      ".sf-master-list{display:grid;grid-template-columns:1fr 1fr;gap:10px}",
      ".sf-master-card{background:#0d0b08;border:1px solid var(--border);border-radius:12px;padding:12px}",
      ".sf-master-card b{font-family:Cinzel;color:var(--sf)}",
      ".sf-master-card p{font-size:.72rem;color:var(--dim);line-height:1.45}",
      ".sf-proof-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}",
      ".sf-proof-grid textarea{width:100%;box-sizing:border-box;background:#0d0b08;border:1px solid var(--border);border-radius:10px;color:var(--text);padding:9px;font-family:DM Sans;font-size:.76rem;min-height:70px}",
      "@media(max-width:780px){.sf-top{flex-direction:column}.sf-guide{max-width:none}.sf-door-summary,.sf-proof-grid,.sf-master-list{grid-template-columns:1fr}.sf-stage{min-height:280px}}",
    ].join("");
    root.document.head.appendChild(style);
  }

  function sceneStart() {
    var title = root.NODE_DATA && root.NODE_DATA.mastery ? root.NODE_DATA.mastery.title : "Mastery";
    return (
      '<div class="sf-wrap">' +
      '<button class="back-btn" onclick="backToMap()">\u2190 Map</button>' +
      '<div class="sf-scene sf-phoenix">' +
      '<div class="sf-top">' +
      "<div>" +
      '<div class="sf-node-ident">' +
      '<img src="images/mastery-icon.png" alt="">' +
      "<div>" +
      '<div class="sf-kicker">Mastery</div>' +
      '<div class="sf-title">' + esc(title) + "</div>" +
      "</div>" +
      "</div>" +
      '<div class="sf-sub">Mastery is not just proof. Proof is the floor. Mastery is going beyond: studying those who crossed the boundary, transforming skill into voice, and rising into a new form.</div>' +
      "</div>" +
      '<div class="sf-guide">' +
      '<img src="images/character-symbols/Celebrator with sparks.png" alt="">' +
      "<div>You do not master by finishing. You master by returning, transforming, and going beyond what the map first showed you.</div>" +
      "</div>" +
      "</div>" +
      '<div class="sf-door-summary">' +
      '<div><strong>What it is</strong><span>A place to study master artists and notice what skill can become.</span></div>' +
      '<div><strong>Why it matters</strong><span>Technique is not the end. Voice, taste, courage, and transformation are the deeper goal.</span></div>' +
      '<div><strong>First move</strong><span>Start with voice: play one phrase until it sounds less copied and more like you.</span></div>' +
      "</div>"
    );
  }

  function renderPhoenixSvg() {
    var seals = MASTERY_SEALS.map(function (seal, index) {
      var angle = (index / MASTERY_SEALS.length) * Math.PI * 2 - Math.PI / 2;
      var cx = 280 + 155 * Math.cos(angle);
      var cy = 190 + 120 * Math.sin(angle);
      return (
        '<g class="seal" onclick="MasteryPhoenix.openSeal(\'' + seal.id + '\')">' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="34" fill="' + seal.color + '" opacity=".12"><animate attributeName="r" values="25;38;25" dur="4s" repeatCount="indefinite"/></circle>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="17" fill="' + seal.color + '" opacity=".55"/>' +
        '<text x="' + cx + '" y="' + (cy + 49) + '" text-anchor="middle" fill="' + seal.color + '" font-family="JetBrains Mono" font-size="8">' + esc(seal.name) + "</text>" +
        "</g>"
      );
    }).join("");

    return (
      '<svg viewBox="0 0 560 390">' +
      '<circle cx="280" cy="190" r="150" fill="none" stroke="' + PHOENIX + '" stroke-opacity=".16"/>' +
      '<path d="M280,235 C235,210 205,170 185,105 C230,135 260,150 280,175 C300,150 330,135 375,105 C355,170 325,210 280,235Z" fill="' + PHOENIX + '" opacity=".22"/>' +
      '<path d="M280,90 C305,135 302,180 280,230 C258,180 255,135 280,90Z" fill="' + GOLD + '" opacity=".35"/>' +
      '<path d="M252,235 C235,265 235,300 250,330 C260,295 275,270 280,238 C285,270 300,295 310,330 C325,300 325,265 308,235Z" fill="' + FIRE + '" opacity=".45"/>' +
      seals +
      '<circle cx="280" cy="190" r="26" fill="' + GOLD + '" opacity=".18"/>' +
      '<circle cx="280" cy="190" r="10" fill="' + GOLD + '" opacity=".72"/>' +
      "</svg>"
    );
  }

  function showMastery() {
    ensureStyle();
    var el = panel();
    if (!el) return;
    el.innerHTML =
      sceneStart() +
      '<div class="sf-stage">' + renderPhoenixSvg() + "</div>" +
      '<div class="sf-primary-row">' +
        '<button class="sf-primary" onclick="MasteryPhoenix.openSeal(\'voice\')">Start With Voice</button>' +
        '<button class="sf-secondary" onclick="MasteryPhoenix.openSeal(\'microtones\')">Hear Between Notes</button>' +
      '</div>' +
      '<div id="sf-drawer" class="sf-drawer"><strong>Mastery is the transformation room.</strong><br>Choose a phoenix seal when you want a lens: hear beyond, find your voice, transform skill into art, or learn to transmit the fire.</div>' +
      "</div></div>";
  }

  function openSeal(id) {
    var seal = MASTERY_SEALS.find(function (item) {
      return item.id === id;
    });
    var el = root.document.getElementById("sf-drawer");
    if (!seal || !el) return;
    el.innerHTML =
      '<div class="sf-kicker" style="color:' + seal.color + '">Phoenix Seal</div>' +
      '<h3 style="font-family:Cinzel;color:' + seal.color + ';margin:5px 0">' + esc(seal.name) + "</h3>" +
      '<div class="sf-master-list">' +
      '<div class="sf-master-card"><b>Beyond Artist</b><p>' + esc(seal.artist) + "</p></div>" +
      '<div class="sf-master-card"><b>Why this matters</b><p>' + esc(seal.why) + "</p></div>" +
      '<div class="sf-master-card"><b>Go beyond practice</b><p>' + esc(seal.practice) + "</p></div>" +
      '<div class="sf-master-card"><b>Phoenix question</b><p>What changes in you after studying this boundary-crosser?</p></div>' +
      "</div>" +
      '<div class="sf-proof-grid" style="margin-top:10px">' +
      '<textarea placeholder="What did you observe in the master artist?"></textarea>' +
      '<textarea placeholder="What will you try that goes beyond your current map?"></textarea>' +
      '<textarea placeholder="What evidence/recording/note will prove the transformation?"></textarea>' +
      "</div>";
  }

  root.MASTERY_SEALS = MASTERY_SEALS;
  root.MasteryPhoenix = {
    render: showMastery,
    openSeal: openSeal,
  };
  root.showMastery = showMastery;
})(typeof window !== "undefined" ? window : globalThis);
