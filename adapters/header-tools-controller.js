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

    (data.foundationTopics || []).forEach(function addFoundationTopic(topic) {
      if (topic.title && topic.title.toLowerCase().indexOf(q) !== -1) {
        found.push({ title: topic.title, tag: "Foundation", action: function openFoundation() { navigate("foundation"); } });
      }
    });

    ((data.knowing && data.knowing.categories) || []).forEach(function addKnowingCategory(category) {
      if (category.title && category.title.toLowerCase().indexOf(q) !== -1) {
        found.push({ title: category.title, tag: "Know", action: function openKnowing() { navigate("theory"); } });
      }
      (category.topics || []).forEach(function addKnowingTopic(topic) {
        if (topic.title && topic.title.toLowerCase().indexOf(q) !== -1) {
          found.push({ title: topic.title, tag: "Know", action: function openKnowingTopic() { navigate("theory"); } });
        }
      });
    });

    ((data.doing && data.doing.drills) || []).forEach(function addDoingDrill(drill) {
      if (drill.title && drill.title.toLowerCase().indexOf(q) !== -1) {
        found.push({ title: drill.title, tag: "Do", action: function openDoing() { navigate("drill"); } });
      }
    });

    (data.playRegions || []).forEach(function addPlayRegion(region) {
      if (region.name && region.name.toLowerCase().indexOf(q) !== -1) {
        found.push({ title: region.name, tag: "Play", action: function openPlay() { navigate("lesson"); } });
      }
    });

    return found.slice(0, 12);
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
      results.innerHTML = '<div class="search-empty">No matches yet. Try a node name, technique, concept, or region.</div>';
      return found;
    }
    results.innerHTML = found.map(function resultItem(result, index) {
      return '<div class="search-result-item" data-idx="' + index + '">'
        + '<div class="sr-title">' + result.title + '</div>'
        + '<div class="sr-tag">' + result.tag + '</div></div>';
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

  function progressCounts(storage) {
    storage = storage || root.localStorage;
    return {
      foundation: { done: readJsonCount(storage, "fProgress"), total: 10 },
      doing: { done: readJsonCount(storage, "dProgress"), total: 48 },
      knowing: { done: readJsonCount(storage, "kProgress"), total: 9 },
      streak: parseInt(storage.getItem("streak") || "0", 10) || 0
    };
  }

  function progressRow(label, item) {
    var percent = Math.round(item.done / item.total * 100);
    return '<div class="progress-row"><span class="progress-label">' + label + '</span>'
      + '<div class="progress-bar"><div class="progress-fill" style="width:' + percent + '%"></div></div>'
      + '<span style="font-family:JetBrains Mono;font-size:0.65rem;color:var(--dim)">' + item.done + '/' + item.total + '</span></div>';
  }

  function renderProgressHtml(counts) {
    return progressRow("Foundation", counts.foundation)
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
