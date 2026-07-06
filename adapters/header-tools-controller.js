/*
 * Header tools controller adapter v0.
 *
 * Coordinates the legacy search, progress, and settings panels.
 */
(function initHeaderToolsController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthHeaderToolsController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createHeaderToolsController(root) {
  "use strict";

  function byId(doc, id) {
    return doc && doc.getElementById ? doc.getElementById(id) : null;
  }

  function headerPanels(doc) {
    return {
      beatbot: byId(doc, "beatbot-panel"),
      insight: byId(doc, "insightPanel"),
      linkDeposit: byId(doc, "linkDepositPanel"),
      references: byId(doc, "refsPanel"),
      search: byId(doc, "searchPanel"),
      toolkit: byId(doc, "toolkitPanel"),
      progress: byId(doc, "progressPanel"),
      settings: byId(doc, "settingsPanel")
    };
  }

  function closePanels(doc, keepIds) {
    var panels = headerPanels(doc || root.document);
    keepIds = keepIds || [];
    Object.keys(panels).forEach(function closePanel(key) {
      if (
        panels[key] &&
        panels[key].classList &&
        keepIds.indexOf(panels[key].id) === -1
      ) {
        panels[key].classList.remove("show");
      }
    });
  }

  function toggleSearch(doc, delay) {
    doc = doc || root.document;
    var panels = headerPanels(doc);
    if (!panels.search) return;
    var wasOpen = panels.search.classList.contains("show");
    closePanels(doc, ["searchPanel"]);
    panels.search.classList.toggle("show", !wasOpen);
    if (!wasOpen) {
      (delay || root.setTimeout || setTimeout)(function focusSearchInput() {
        var input = byId(doc, "searchInput");
        if (input && input.focus) input.focus();
      }, 100);
    }
  }

  function toggleProgress(doc, renderProgressFn) {
    doc = doc || root.document;
    var panels = headerPanels(doc);
    if (!panels.progress) return;
    var wasOpen = panels.progress.classList.contains("show");
    closePanels(doc, ["progressPanel"]);
    panels.progress.classList.toggle("show", !wasOpen);
    if (!wasOpen) {
      if (typeof renderProgressFn === "function") renderProgressFn();
      else renderProgress(doc);
    }
  }

  function toggleSettings(doc) {
    doc = doc || root.document;
    var panels = headerPanels(doc);
    if (!panels.settings) return;
    var wasOpen = panels.settings.classList.contains("show");
    closePanels(doc, ["settingsPanel"]);
    panels.settings.classList.toggle("show", !wasOpen);
  }

  function bindOutsideClick(doc) {
    doc = doc || root.document;
    if (!doc || !doc.addEventListener || doc.__hearthHeaderToolsBound) return;
    doc.__hearthHeaderToolsBound = true;
    doc.addEventListener("click", function closeHeaderPanelsOnOutsideClick(event) {
      var target = event.target;
      if (!target || !target.closest) return;
      if (
        !target.closest(".top") &&
        !target.closest(".search-panel") &&
        !target.closest(".progress-panel") &&
        !target.closest(".settings-panel") &&
        !target.closest(".toolkit-panel") &&
        !target.closest(".insight-panel")
      ) {
        closePanels(doc);
      }
    });
  }

  function collectSearchResults(query, data, navigate) {
    var q = String(query || "").toLowerCase();
    if (q.length < 2) return [];
    data = data || {};
    navigate = navigate || function noop() {};
    var found = [];

    function textMatches() {
      return Array.prototype.some.call(arguments, function matchesText(value) {
        return value && String(value).toLowerCase().indexOf(q) !== -1;
      });
    }

    function addResult(result) {
      found.push(result);
    }

    (data.foundationTopics || []).forEach(function addFoundationTopic(topic) {
      if (textMatches(topic.title, topic.description, (topic.tags || []).join(" "))) {
        addResult({
          title: topic.title,
          tag: "Foundation",
          kind: "Map Node",
          detail: topic.description || "Core learning block",
          actionText: "Open Foundation",
          action: function openFoundation() { navigate("foundation"); }
        });
      }
    });

    ((data.knowing && data.knowing.categories) || []).forEach(function addKnowingCategory(category) {
      if (textMatches(category.title, category.description, category.summary)) {
        addResult({
          title: category.title,
          tag: "Know",
          kind: "Concept Shelf",
          detail: category.description || category.summary || "Theory and meaning",
          actionText: "Open Dictionary",
          action: function openKnowing() { navigate("theory"); }
        });
      }
      (category.topics || []).forEach(function addKnowingTopic(topic) {
        if (textMatches(topic.title, topic.description, topic.body, (topic.keywords || []).join(" "))) {
          addResult({
            title: topic.title,
            tag: "Know",
            kind: category.title || "Concept",
            detail: topic.description || "Clear this idea in the Dictionary",
            actionText: "Open Dictionary",
            action: function openKnowingTopic() { navigate("theory"); }
          });
        }
      });
    });

    ((data.doing && data.doing.drills) || []).forEach(function addDoingDrill(drill) {
      if (textMatches(drill.title, drill.description, drill.category, drill.style, drill.source)) {
        addResult({
          title: drill.title,
          tag: "Do",
          kind: drill.category || "Physical Drill",
          detail: drill.description || drill.source || "Practice this with the hands",
          actionText: "Open Do",
          action: function openDoing() { navigate("drill"); }
        });
      }
    });

    (data.playRegions || []).forEach(function addPlayRegion(region) {
      if (textMatches(region.name, region.title, region.description, (region.tags || []).join(" "))) {
        addResult({
          title: region.name || region.title,
          tag: "Play",
          kind: "Journey Region",
          detail: region.description || "Apply skills musically",
          actionText: "Open Journey",
          action: function openPlay() { navigate("lesson"); }
        });
      }
    });

    return found.slice(0, 12);
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderSearch(query, options) {
    options = options || {};
    var doc = options.document || root.document;
    var results = byId(doc, "searchResults");
    if (!results) return [];
    var found = collectSearchResults(query, options.data, options.navigate);
    if (!query || String(query).length < 2) {
      results.innerHTML = '<div class="search-empty">Type at least two letters to search across Foundation, Do, Know, and Play.</div>';
      return found;
    }
    if (found.length === 0) {
      results.innerHTML = '<div class="search-empty"><strong>No matches yet.</strong><span>Try a broader word like rhythm, scale, chord, fretboard, practice, or melody.</span></div>';
      return found;
    }
    results.innerHTML = found.map(function resultItem(result, index) {
      return '<div class="search-result-item" data-idx="' + index + '">'
        + '<div class="sr-top"><div class="sr-title">' + escapeHtml(result.title) + '</div><div class="sr-tag">' + escapeHtml(result.tag) + '</div></div>'
        + '<div class="sr-kind">' + escapeHtml(result.kind || "Result") + '</div>'
        + '<div class="sr-detail">' + escapeHtml(result.detail || "") + '</div>'
        + '<div class="sr-action">' + escapeHtml(result.actionText || "Open") + '</div></div>';
    }).join("");
    root._searchActions = found.map(function searchAction(result) { return result.action; });
    Array.prototype.forEach.call(results.querySelectorAll(".search-result-item"), function bindResultClick(element) {
      element.onclick = function clickSearchResult() {
        var panel = byId(doc, "searchPanel");
        if (panel) panel.classList.remove("show");
        var index = parseInt(element.getAttribute("data-idx"), 10);
        if (root._searchActions[index]) root._searchActions[index]();
      };
    });
    return found;
  }

  function readJsonCount(storage, key) {
    try {
      return Object.keys(JSON.parse(storage.getItem(key) || "{}")).length;
    } catch (error) {
      return 0;
    }
  }

  function readBestJsonCount(storage, keys) {
    var best = 0;
    keys.forEach(function readKey(key) {
      best = Math.max(best, readJsonCount(storage, key));
    });
    return best;
  }

  function progressCounts(storage) {
    storage = storage || root.localStorage;
    return {
      foundation: { done: readBestJsonCount(storage, ["fProgress", "hearth-foundation-progress"]), total: 10 },
      doing: { done: readJsonCount(storage, "dProgress"), total: 48 },
      knowing: { done: readBestJsonCount(storage, ["kProgress", "hearth-knowing-progress"]), total: 9 },
      streak: parseInt(storage.getItem("streak") || "0", 10) || 0
    };
  }

  function percentFor(item) {
    if (!item || !item.total) return 0;
    return Math.max(0, Math.min(100, Math.round(item.done / item.total * 100)));
  }

  function progressRow(label, item) {
    var percent = percentFor(item);
    return '<div class="progress-row"><span class="progress-label">' + label + '</span>'
      + '<div class="progress-bar"><div class="progress-fill" style="width:' + percent + '%"></div></div>'
      + '<span style="font-family:JetBrains Mono;font-size:0.65rem;color:var(--dim)">' + item.done + '/' + item.total + '</span></div>';
  }

  function progressSummary(counts) {
    var areas = [
      { id: "foundation", label: "Foundation", action: "revisit one basic block", item: counts.foundation },
      { id: "doing", label: "Do", action: "touch one physical drill", item: counts.doing },
      { id: "knowing", label: "Know", action: "clear one concept or word", item: counts.knowing }
    ];
    var done = areas.reduce(function sumDone(total, area) { return total + area.item.done; }, 0);
    var total = areas.reduce(function sumTotal(total, area) { return total + area.item.total; }, 0);
    var weakest = areas.slice().sort(function sortAreas(a, b) {
      return percentFor(a.item) - percentFor(b.item);
    })[0];
    var overall = total ? Math.round(done / total * 100) : 0;
    var next = overall >= 100
      ? { label: "Review", action: "choose a favorite path and keep it alive" }
      : weakest;
    return {
      done: done,
      next: next,
      overall: overall,
      total: total,
      weakest: weakest
    };
  }

  function renderProgressHtml(counts) {
    var summary = progressSummary(counts);
    return '<div class="progress-snapshot">'
      + '<div><span>Overall</span><strong>' + summary.overall + '%</strong></div>'
      + '<div><span>Opened</span><strong>' + summary.done + '/' + summary.total + '</strong></div>'
      + '<div><span>Streak</span><strong>' + counts.streak + 'd</strong></div>'
      + '</div>'
      + '<div class="progress-next"><span>Next best move</span><strong>' + summary.next.label + '</strong><p>' + summary.next.action + '.</p></div>'
      + progressRow("Foundation", counts.foundation)
      + progressRow("Do", counts.doing)
      + progressRow("Know", counts.knowing)
      + '<div class="progress-row"><span class="progress-label">Practice Streak</span><span style="font-family:JetBrains Mono;font-size:0.65rem;color:var(--amber)">'
      + counts.streak + ' days</span></div>';
  }

  function renderProgress(doc, storage) {
    doc = doc || root.document;
    var content = byId(doc, "progressContent");
    if (!content) return;
    content.innerHTML = renderProgressHtml(progressCounts(storage || root.localStorage));
  }

  function toggleSound(doc, storage) {
    doc = doc || root.document;
    storage = storage || root.localStorage;
    var newMuted = storage.getItem("hearthSoundMuted") !== "true";
    storage.setItem("hearthSoundMuted", newMuted ? "true" : "false");
    var btn = byId(doc, "soundToggle");
    if (btn) btn.textContent = newMuted ? "Off" : "On";
    var audio = byId(doc, "hearthAudio");
    if (!audio) return;
    if (newMuted) audio.pause();
    else {
      var playResult = audio.play();
      if (playResult && playResult.catch) playResult.catch(function ignoreAudioStart() {});
    }
  }

  function toggleParticles(doc, storage) {
    doc = doc || root.document;
    storage = storage || root.localStorage;
    var newState = storage.getItem("hearthParticles") === "off" ? "on" : "off";
    storage.setItem("hearthParticles", newState);
    var btn = byId(doc, "particleToggle");
    if (btn) btn.textContent = newState === "on" ? "On" : "Off";
    var canvas = byId(doc, "emberCanvas");
    if (newState === "off") {
      if (canvas && canvas.style) canvas.style.display = "none";
    } else if (canvas && canvas.style) {
      canvas.style.display = "";
      (root.setTimeout || setTimeout)(function resizeCanvas() {
        if (root.dispatchEvent && root.Event) root.dispatchEvent(new root.Event("resize"));
      }, 100);
    }
  }

  function restoreSettings(doc, storage) {
    doc = doc || root.document;
    storage = storage || root.localStorage;
    if (storage.getItem("hearthSoundMuted") === "true") {
      var btn = byId(doc, "soundToggle");
      if (btn) btn.textContent = "Off";
      var audio = byId(doc, "hearthAudio");
      if (audio) audio.pause();
    }
    storage.setItem("hearthParticles", "on");
  }

  return {
    version: "0.1.0",
    bindOutsideClick: bindOutsideClick,
    closePanels: closePanels,
    collectSearchResults: collectSearchResults,
    progressCounts: progressCounts,
    progressSummary: progressSummary,
    renderProgress: renderProgress,
    renderProgressHtml: renderProgressHtml,
    renderSearch: renderSearch,
    restoreSettings: restoreSettings,
    toggleParticles: toggleParticles,
    toggleProgress: toggleProgress,
    toggleSearch: toggleSearch,
    toggleSettings: toggleSettings,
    toggleSound: toggleSound
  };
});
