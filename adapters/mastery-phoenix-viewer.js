// Active Mastery Phoenix scene.
(function initMasteryPhoenixViewer(root) {
  "use strict";

  var GOLD = "#d4af69";

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
      ".sf-wrap{padding:18px;max-width:1180px;margin:0 auto;display:flex;flex-direction:column}",
      ".sf-scene{position:relative;border:1px solid rgba(212,175,105,.28);border-radius:18px;overflow:hidden;background:#080704;box-shadow:0 20px 60px rgba(0,0,0,.35)}",
      ".sf-scene:before{content:\"\";position:absolute;inset:0;background:radial-gradient(circle at 50% 44%,rgba(255,185,70,.08),transparent 34%),linear-gradient(180deg,rgba(8,7,4,.14),rgba(8,7,4,.5));pointer-events:none;z-index:1}",
      ".sf-top{position:relative;z-index:2;display:flex;justify-content:space-between;gap:14px;align-items:flex-start;padding:18px}",
      ".sf-node-ident{display:flex;align-items:center;gap:11px;margin-bottom:8px}",
      ".sf-node-ident>img{width:58px;height:58px;border-radius:50%;object-fit:contain;border:1px solid rgba(212,175,105,.44);box-shadow:0 0 18px rgba(212,175,105,.2);background:#0d0b08}",
      ".sf-kicker{font-family:JetBrains Mono;font-size:.58rem;color:var(--sf,var(--gold));letter-spacing:.16em;text-transform:uppercase}",
      ".sf-title{font-family:Cinzel;color:var(--sf,var(--gold));font-size:1.55rem;font-weight:800;margin:2px 0}",
      ".sf-sub{font-size:.78rem;color:var(--dim);line-height:1.55;max-width:560px}",
      ".sf-guide{display:flex;gap:9px;align-items:center;max-width:310px;background:rgba(13,11,8,.78);border:1px solid rgba(212,175,105,.28);border-radius:13px;padding:10px;font-size:.72rem;color:var(--text);line-height:1.42}",
      ".sf-guide img{width:68px;height:68px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,.42));animation:char-float 3s ease-in-out infinite}",
      ".sf-stage{position:relative;z-index:2;aspect-ratio:16/9;margin:0 18px 14px;border:1px solid rgba(212,175,105,.18);border-radius:14px;overflow:hidden;background:#050403}",
      ".sf-mastery-tableau{display:block;width:100%;height:100%;object-fit:contain;pointer-events:none}",
      ".sf-hotspot{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:5px;border:0;background:transparent;color:var(--text);font:700 .67rem DM Sans,sans-serif;cursor:pointer;white-space:nowrap;filter:drop-shadow(0 2px 7px rgba(0,0,0,.8));transition:transform .2s ease,filter .2s ease}",
      ".sf-hotspot:before{content:\"\";width:28px;height:28px;border:1px solid rgba(255,224,142,.82);border-radius:50%;background:radial-gradient(circle,rgba(255,211,104,.7),rgba(90,38,10,.74) 52%,rgba(8,7,4,.86) 74%);box-shadow:0 0 0 5px rgba(255,176,60,.1),0 0 16px rgba(255,166,49,.62);animation:mastery-hotspot-pulse 3.8s ease-in-out infinite}",
      ".sf-hotspot:hover,.sf-hotspot:focus-visible{transform:translate(-50%,-50%) scale(1.06);filter:drop-shadow(0 0 12px rgba(255,193,84,.95));outline:none}",
      ".sf-hotspot span{padding:4px 8px;border:1px solid rgba(212,175,105,.34);border-radius:999px;background:rgba(10,8,5,.86);letter-spacing:.02em}",
      ".sf-hotspot-continue{left:13.5%;top:76.5%}.sf-hotspot-watch{left:20%;top:89%}.sf-hotspot-thread{left:85%;top:76.5%}.sf-hotspot-review{left:81.5%;top:89%}",
      ".sf-scene-prompt{position:relative;z-index:2;text-align:center;color:var(--dim);font-size:.7rem;letter-spacing:.03em;padding:0 18px 15px}",
      ".sf-drawer{position:relative;z-index:2;margin:0 18px 18px;background:rgba(13,11,8,.84);border:1px solid rgba(212,175,105,.3);border-radius:14px;padding:14px;color:var(--text);font-size:.78rem;line-height:1.55}",
      ".sf-primary-row{position:relative;z-index:2;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;padding:0 18px 16px}",
      ".sf-primary{background:var(--sf,var(--gold));color:#0d0b08;border:none;border-radius:999px;padding:10px 18px;font-family:DM Sans,sans-serif;font-weight:900;cursor:pointer;box-shadow:0 8px 24px rgba(212,175,105,.2)}",
      ".sf-secondary{background:rgba(13,11,8,.62);color:var(--sf,var(--gold));border:1px solid rgba(212,175,105,.44);border-radius:999px;padding:9px 13px;font-weight:800;cursor:pointer}",
      ".sf-master-list{display:grid;grid-template-columns:1fr 1fr;gap:10px}",
      ".sf-master-card{background:#0d0b08;border:1px solid var(--border);border-radius:12px;padding:12px}",
      ".sf-master-card b{font-family:Cinzel;color:var(--sf)}",
      ".sf-master-card p{font-size:.72rem;color:var(--dim);line-height:1.45}",
      ".sf-proof-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}",
      ".sf-proof-grid textarea{width:100%;box-sizing:border-box;background:#0d0b08;border:1px solid var(--border);border-radius:10px;color:var(--text);padding:9px;font-family:DM Sans;font-size:.76rem;min-height:70px}",
      "@keyframes mastery-hotspot-pulse{0%,100%{transform:scale(.92);opacity:.74}50%{transform:scale(1.08);opacity:1}}",
      "@media(max-width:780px){.sf-top{flex-direction:column}.sf-guide{max-width:none}.sf-stage{margin-inline:10px}.sf-hotspot{font-size:.55rem}.sf-hotspot:before{width:23px;height:23px}.sf-hotspot span{padding:3px 5px}.sf-hotspot-continue{left:14%;top:76%}.sf-hotspot-watch{left:20%;top:89%}.sf-hotspot-thread{left:84%;top:76%}.sf-hotspot-review{left:81%;top:89%}.sf-drawer{margin-inline:10px}.sf-proof-grid,.sf-master-list{grid-template-columns:1fr}}",
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
      '<div class="sf-sub">See what a skill can become. Notice one choice, try it in your own hands, and carry it back into the music.</div>' +
      "</div>" +
      '<div class="sf-guide">' +
      '<img src="images/character-symbols/Celebrator with sparks.png" alt="">' +
      "<div>Do not copy the whole performance. Notice one choice, then let it change something in your own playing.</div>" +
      "</div>" +
      "</div>"
    );
  }

  function renderMasteryTableau() {
    return (
      '<img class="sf-mastery-tableau" src="images/mastery/mastery-phoenix-tableau-v1.png" alt="Phoenix rising beside a six-string guitar" />' +
      '<button class="sf-hotspot sf-hotspot-continue" aria-label="Continue today\'s encounter" onclick="MasteryPhoenix.openPath(\'continue\')"><span>Continue today</span></button>' +
      '<button class="sf-hotspot sf-hotspot-watch" aria-label="Watch a master" onclick="MasteryPhoenix.openPath(\'watch\')"><span>Watch a master</span></button>' +
      '<button class="sf-hotspot sf-hotspot-thread" aria-label="Follow an artistic thread" onclick="MasteryPhoenix.openPath(\'thread\')"><span>Follow a thread</span></button>' +
      '<button class="sf-hotspot sf-hotspot-review" aria-label="Review what changed" onclick="MasteryPhoenix.openPath(\'review\')"><span>Review what changed</span></button>'
    );
  }

  function showMastery() {
    ensureStyle();
    var el = panel();
    if (!el) return;
    el.innerHTML =
      sceneStart() +
      '<div class="sf-stage">' + renderMasteryTableau() + "</div>" +
      '<div class="sf-scene-prompt">Choose one ember. Begin with a short encounter, not a performance to prove.</div>' +
      '<div id="sf-drawer" class="sf-drawer"><strong>Witness → Notice → Try → Carry</strong><br>Choose one ember to begin. Mastery is where a skill becomes a musical possibility.</div>' +
      "</div></div>";
  }

  function openPath(id) {
    var content = {
      continue: {
        kicker: "Continue today",
        title: "Return to your current encounter",
        body: "Open the short Mastery encounter recommended by your Journey focus. Start with one thing to notice, then carry one small experiment back into practice.",
        action: "Open encounter",
        seal: "voice",
      },
      watch: {
        kicker: "Witness",
        title: "Watch a master",
        body: "Choose a precise excerpt and listen for the choice underneath it: time, touch, tone, space, phrasing, or form.",
        action: "Start with voice",
        seal: "voice",
      },
      thread: {
        kicker: "Explore",
        title: "Follow an artistic thread",
        body: "Follow one question through different artists: how can a familiar guitar idea become more spacious, rhythmic, expressive, strange, or personal?",
        action: "Hear between notes",
        seal: "microtones",
      },
      review: {
        kicker: "Return",
        title: "Review what changed",
        body: "Revisit the choices you noticed, the experiments you tried, and the directions you want to bring back into your music.",
        action: "Open a reflection",
        seal: null,
      },
    }[id];
    var el = root.document.getElementById("sf-drawer");
    if (!content || !el) return;
    el.innerHTML =
      '<div class="sf-kicker">' + esc(content.kicker) + "</div>" +
      '<h3 style="font-family:Cinzel;color:' + GOLD + ';margin:5px 0">' + esc(content.title) + "</h3>" +
      '<p style="margin:0 0 10px;color:var(--dim)">' + esc(content.body) + "</p>" +
      (content.seal ? '<button class="sf-primary" onclick="MasteryPhoenix.openSeal(\'' + content.seal + '\')">' + esc(content.action) + "</button>" : "");
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
    openPath: openPath,
    openSeal: openSeal,
  };
  root.showMastery = showMastery;
})(typeof window !== "undefined" ? window : globalThis);
