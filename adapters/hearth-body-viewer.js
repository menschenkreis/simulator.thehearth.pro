/* global window, document */
(function(root) {
  "use strict";

  var HEARTH_BODY_COPY = root.HEARTH_BODY_COPY || {
    kicker: "The Hearth",
    title: "The Body Behind the Instrument",
    subtitle: "See what your body and mind are doing while you learn guitar.",
    guide: "Good practice is attention, breath, listening, and care.",
    defaultPrompt: "Choose one system of the body."
  };
  var HEARTH_BODY_ZONES = root.HEARTH_BODY_ZONES || [];
  var debugHotspots = false;
  var activeZone = null;

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function(ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function panel() {
    document.querySelectorAll(".pnl").forEach(function(item) {
      item.classList.remove("on");
    });
    var el = document.getElementById("p-foundation");
    if (el) el.classList.add("on");
    return el;
  }

  function renderHearthBody() {
    var el = panel();
    if (!el) return;
    var svgZones = "";
    var seals = "";
    var systemRail = "";

    HEARTH_BODY_ZONES.forEach(function(zone) {
      svgZones += '<circle class="hb-zone' + (debugHotspots ? " debug" : "") + '" data-zone="' + esc(zone.id) + '" '
        + 'onclick="HearthBody.openZone(\'' + esc(zone.id) + '\')" '
        + 'onmouseenter="HearthBody.hoverZone(\'' + esc(zone.id) + '\')" '
        + 'onmouseleave="HearthBody.unhoverZone()" '
        + 'cx="' + esc(zone.x) + '" cy="' + esc(zone.y) + '" r="' + esc(zone.r) + '" />';
      seals += '<div class="hb-seal" id="seal-' + esc(zone.id) + '" style="left:calc(' + esc(zone.x) + ' - 19px);top:calc(' + esc(zone.y) + ' - 19px)">'
        + '<span class="seal-icon">' + esc(zone.seal) + '</span></div>';
      systemRail += '<button class="hb-system-pill" onclick="HearthBody.openZone(\'' + esc(zone.id) + '\')" '
        + 'onmouseenter="HearthBody.hoverZone(\'' + esc(zone.id) + '\')" '
        + 'onmouseleave="HearthBody.unhoverZone()">'
        + '<span>' + esc(zone.seal) + '</span>' + esc(zone.label) + '</button>';
    });

    el.innerHTML =
      '<div class="hb-wrap">'
        + '<button class="back-btn" onclick="backToMap()">&larr; Map</button>'
        + '<div class="hb-scene">'
          + '<div class="hb-top">'
            + '<div><div class="hb-kicker">' + esc(HEARTH_BODY_COPY.kicker) + '</div>'
            + '<div class="hb-title">' + esc(HEARTH_BODY_COPY.title) + '</div>'
            + '<div class="hb-sub">' + esc(HEARTH_BODY_COPY.subtitle) + '</div></div>'
            + '<div class="hb-guide">'
              + '<img src="images/character-generated/guide-head-lightbulb-v1-ui.webp" alt="">'
              + '<div>' + esc(HEARTH_BODY_COPY.guide) + '</div>'
            + '</div>'
          + '</div>'
          + '<div class="hb-door-summary">'
            + '<div><strong>What it is</strong><span>The learner behind the guitar: brain, hands, ears, eyes, breath, and feeling.</span></div>'
            + '<div><strong>Why it matters</strong><span>Technique improves faster when you understand what your body is developing.</span></div>'
            + '<div><strong>First move</strong><span>Start with the brain, then follow the systems that affect today\'s practice.</span></div>'
          + '</div>'
          + '<div class="hb-body-wrap">'
            + '<img src="images/hearth-body-guitar.png" alt="Body behind the instrument" onerror="this.style.display=\'none\'">'
            + '<svg viewBox="0 0 100 100" preserveAspectRatio="none" class="hb-body-svg">' + svgZones + '</svg>'
            + seals
            + '<div class="hb-guide-bar" id="hb-guide-bar">'
              + '<div class="hb-guide-text">' + esc(HEARTH_BODY_COPY.defaultPrompt) + '</div>'
            + '</div>'
          + '</div>'
          + '<div class="hb-system-rail">' + systemRail + '</div>'
          + '<div class="hb-primary-row">'
            + '<button class="hb-primary-action" onclick="HearthBody.openZone(\'brain\')">Start with Brain</button>'
          + '</div>'
        + '</div>'
      + '</div>';
  }

  function renderHearthChamber(zoneId) {
    var el = panel();
    if (!el) return;
    var zone = HEARTH_BODY_ZONES.find(function(item) {
      return item.id === zoneId;
    });
    if (!zone) {
      renderHearthBody();
      return;
    }

    var parts = (zone.parts || []).length
      ? '<div class="hb-chamber-item"><h4>Important Parts</h4><ul class="hb-zone-list">'
        + zone.parts.map(function(part) { return "<li>" + esc(part) + "</li>"; }).join("")
        + "</ul></div>"
      : "";
    var practices = (zone.practices || []).length
      ? '<ul class="hb-zone-list">'
        + zone.practices.map(function(practice) { return "<li>" + esc(practice) + "</li>"; }).join("")
        + "</ul>"
      : "<p>" + esc(zone.tryThis || "") + "</p>";

    el.innerHTML =
      '<div class="hb-chamber">'
        + '<button class="back-btn" onclick="HearthBody.back()">&larr; Back to Body</button>'
        + '<div class="hb-chamber-card">'
          + '<div class="hb-kicker">' + esc(zone.seal) + ' &middot; ' + esc(zone.label) + '</div>'
          + '<h3>' + esc(zone.label) + '</h3>'
          + '<p class="hb-zone-intro">' + esc(zone.guide) + '</p>'
          + '<div class="hb-chamber-cards">'
            + '<div class="hb-chamber-item"><h4>What It Is</h4><p>' + esc(zone.system || zone.notice || "") + '</p></div>'
            + parts
            + '<div class="hb-chamber-item"><h4>How It Develops</h4><p>' + esc(zone.development || "") + '</p></div>'
            + '<div class="hb-chamber-item"><h4>Guitar Connection</h4><p>' + esc(zone.guitar || zone.apply || "") + '</p></div>'
            + '<div class="hb-chamber-item"><h4>Develop It</h4>' + practices + '</div>'
            + '<div class="hb-chamber-item"><h4>Care</h4><p>' + esc(zone.care || "") + '</p></div>'
          + '</div>'
        + '</div>'
      + '</div>';
  }

  root.HearthBody = {
    hoverZone: function(id) {
      var zone = HEARTH_BODY_ZONES.find(function(item) {
        return item.id === id;
      });
      if (!zone) return;
      var bar = document.getElementById("hb-guide-bar");
      if (bar) {
        bar.innerHTML = '<div class="hb-guide-zone">' + esc(zone.label) + '</div><div class="hb-guide-text">' + esc(zone.guide) + '</div>';
      }
      var seal = document.getElementById("seal-" + id);
      if (seal) seal.classList.add("bright");
    },
    unhoverZone: function() {
      var bar = document.getElementById("hb-guide-bar");
      if (bar) {
        bar.innerHTML = '<div class="hb-guide-text">' + esc(HEARTH_BODY_COPY.defaultPrompt) + '</div>';
      }
      HEARTH_BODY_ZONES.forEach(function(zone) {
        var seal = document.getElementById("seal-" + zone.id);
        if (seal) seal.classList.remove("bright");
      });
    },
    openZone: function(id) {
      activeZone = id;
      renderHearthChamber(id);
    },
    back: function() {
      activeZone = null;
      renderHearthBody();
    },
    toggleDebug: function() {
      debugHotspots = !debugHotspots;
      renderHearthBody();
    },
    activeZone: function() {
      return activeZone;
    }
  };

  root.showHearth = function showHearth() {
    renderHearthBody();
  };

  root.HearthBodyViewer = {
    renderHearthBody: renderHearthBody,
    renderHearthChamber: renderHearthChamber
  };
})(window);
