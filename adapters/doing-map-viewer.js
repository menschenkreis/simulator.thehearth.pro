/*
 * Doing map viewer adapter v0.
 *
 * Renders the guitar-body training map for the Doing node. Interaction still
 * delegates to the legacy global handlers while the surrounding view is moved.
 */
(function initDoingMapViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDoingMapViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingMapViewer(root) {
  "use strict";

  function ui() {
    return root.HearthDoingUiUtils || {
      escapeHtml: function fallbackEscape(value) {
        return String(value || "").replace(/[&<>"']/g, function replaceChar(ch) {
          return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          }[ch];
        });
      }
    };
  }

  function renderDoingMap(options) {
    options = options || {};
    var zones = options.zones || [];
    var doingDebug = Boolean(options.doingDebug);
    var esc = ui().escapeHtml;

    var svgZones = "";
    zones.slice().sort(function sortZones(a, b) {
      if (a.id === "both-hands") return -1;
      if (b.id === "both-hands") return 1;
      return 0;
    }).forEach(function renderZone(zone) {
      svgZones += '<polygon class="doing-map-zone' + (doingDebug ? " debug" : "") + '" ' +
        'data-zone="' + esc(zone.id) + '" ' +
        'points="' + esc(zone.points) + '" ' +
        'onmouseenter="showDoingBubble(this)" ' +
        'onmouseleave="hideDoingBubble()" ' +
        'onclick="enterDoingZone(\'' + esc(zone.id) + '\')"/>';
    });

    var seals = "";
    zones.forEach(function renderSeal(zone) {
      if (!zone.seal) {
        return;
      }
      seals += '<button class="doing-seal" type="button" data-seal="' + esc(zone.id) + '" style="left:' + esc(zone.seal.x) + ";top:" + esc(zone.seal.y) + '" ' +
        'onmouseenter="showDoingBubble(this)" ' +
        'onmouseleave="hideDoingBubble()" ' +
        'onclick="enterDoingZone(\'' + esc(zone.id) + '\')">' +
        (zone.seal.icon ? '<span class="seal-icon">' + zone.seal.icon + '</span>' : "") +
        '<span class="seal-label">' + esc(zone.label) + "</span></button>";
    });

    return '<div class="doing-map-wrap" id="doing-map-container">' +
      '<button class="back-btn doing-map-back" onclick="backToMap()">\u2190 Map</button>' +
      '<img src="images/doing/doing-arms-guitar-v2.png?v=20260717b" alt="Complete classical guitar with left- and right-hand training areas" draggable="false">' +
      '<svg class="doing-map-svg" viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid meet">' +
      svgZones +
      "</svg>" +
      seals +
      '<div class="doing-map-title-overlay">' +
      "<h2>Doing</h2>" +
      "<p>Choose one physical skill to train.</p>" +
      "</div>" +
      '<div class="doing-map-info" id="doing-map-info">' +
      '<div class="gc-title">Choose a training chamber</div>' +
      '<div class="gc-body">Touch one part of the guitar map. Each chamber gives your hands one clear job.</div>' +
      "</div>" +
      '<button class="doing-map-concept-btn" type="button" onclick="openDoingDrillLibrary()">Drill Library</button>' +
      '<button class="doing-map-debug-btn' + (doingDebug ? " active" : "") + '" onclick="toggleDoingDebug()" title="Debug: show hotspots">&#9881;</button>' +
      "</div>";
  }

  function showDoingBubble(zoneEl) {
    var zoneId = zoneEl.getAttribute("data-zone");
    var zones = root._doingZones || [];
    var zone = zones.find(function findZone(z) {
      return z.id === zoneId;
    });
    if (!zone) {
      return null;
    }

    Array.prototype.forEach.call(root.document.querySelectorAll(".doing-seal"), function dimSeal(seal) {
      seal.classList.remove("bright");
    });
    var activeSeal = root.document.querySelector('[data-seal="' + zoneId + '"]');
    if (activeSeal) {
      activeSeal.classList.add("bright");
    }

    var card = root.document.getElementById("doing-map-info");
    if (card) {
      card.classList.add("active");
      card.querySelector(".gc-title").textContent = zone.label;
      card.querySelector(".gc-body").textContent = zone.hint;
    }
    return zone;
  }

  function hideDoingBubble() {
    Array.prototype.forEach.call(root.document.querySelectorAll(".doing-seal"), function dimSeal(seal) {
      seal.classList.remove("bright");
    });

    var card = root.document.getElementById("doing-map-info");
    if (card) {
      card.classList.remove("active");
      card.querySelector(".gc-title").textContent = "Choose a training chamber";
      card.querySelector(".gc-body").textContent = "Touch one part of the guitar map. Each chamber gives your hands one clear job.";
    }
  }

  return {
    version: "0.1.0",
    hideDoingBubble: hideDoingBubble,
    showDoingBubble: showDoingBubble,
    renderDoingMap: renderDoingMap
  };
});
