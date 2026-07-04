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
    zones.forEach(function renderZone(zone) {
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
      seals += '<div class="doing-seal" data-seal="' + esc(zone.id) + '" style="left:' + esc(zone.seal.x) + ";top:" + esc(zone.seal.y) + '">' +
        '<span class="seal-icon">' + zone.seal.icon + "</span></div>";
    });

    return '<div class="doing-map-wrap" id="doing-map-container">' +
      '<img src="images/doing-guitar-map.png" alt="Guitar training map" draggable="false">' +
      '<svg class="doing-map-svg" viewBox="0 0 1280 960" preserveAspectRatio="xMidYMid meet">' +
      svgZones +
      "</svg>" +
      seals +
      '<div class="doing-map-title-overlay">' +
      "<h2>Doing</h2>" +
      "<p>The guitar body is the training map.</p>" +
      "</div>" +
      '<div class="doing-map-info" id="doing-map-info">' +
      '<div class="gc-title">Choose a training chamber</div>' +
      '<div class="gc-body">Touch part of the guitar: left hand, right hand, rhythm, chords, scales, or map.</div>' +
      "</div>" +
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
      card.querySelector(".gc-body").textContent = "Touch part of the guitar: left hand, right hand, rhythm, chords, scales, or map.";
    }
  }

  return {
    version: "0.1.0",
    hideDoingBubble: hideDoingBubble,
    showDoingBubble: showDoingBubble,
    renderDoingMap: renderDoingMap
  };
});
