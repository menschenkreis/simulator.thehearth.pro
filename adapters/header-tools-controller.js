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

  function readJsonValue(storage, key, fallback) {
    try {
      var raw = storage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function countKnownTopics() {
    var knowing = root.KNOWING;
    if (!knowing || !Array.isArray(knowing.categories)) return 9;
    return knowing.categories.reduce(function countTopics(total, category) {
      return total + ((category.topics && category.topics.length) || 0);
    }, 0) || 9;
  }

  function countDoingDrills() {
    var doing = root.DOING;
    if (!doing) return 48;
    if (Array.isArray(doing.drills)) return doing.drills.length || 48;
    if (Array.isArray(doing.categories)) {
      return doing.categories.reduce(function countDrills(total, category) {
        return total + ((category.drills && category.drills.length) || 0);
      }, 0) || 48;
    }
    return 48;
  }

  function countPracticeDrills() {
    var practice = root.PRACTICE;
    if (practice && Array.isArray(practice.drills)) return practice.drills.length;
    return 0;
  }

  function activeJourneyCounts(storage) {
    var state = readJsonValue(storage, "hearth-journey-v2", null);
    if (!state || !Array.isArray(state.students) || !state.students.length) {
      return {
        done: 0,
        total: 0,
        label: "Journey",
        current: "No profile yet",
        capabilityMet: 0,
        capabilityTotal: 0,
        capabilityPercent: 0,
        capabilityComplete: false
      };
    }
    var active = state.students.find(function findActive(student) {
      return student.id === state.activeStudentId;
    }) || state.students[0];
    var levels = active.levels || {};
    var storedLevelNum = Math.max(1, parseInt(active.currentLevel || "1", 10) || 1);
    var levelId = "L" + storedLevelNum;
    var progress = null;

    function summarizeLevel(candidateLevelId) {
      var capabilities = root.JOURNEY_LEVEL_CAPABILITIES && root.JOURNEY_LEVEL_CAPABILITIES[candidateLevelId];
      if (!capabilities || !root.HearthJourneyProgress || typeof root.HearthJourneyProgress.summarize !== "function") return null;
      var events = [];
      try {
        if (root.HearthProgressEvents && typeof root.HearthProgressEvents.listNormalized === "function") {
          events = root.HearthProgressEvents.listNormalized(storage) || [];
        } else {
          events = readJsonValue(storage, "hearth-progress-events", []);
        }
      } catch (error) {}
      return root.HearthJourneyProgress.summarize({
        events: events,
        learnerId: active.id,
        levelId: candidateLevelId,
        capabilities: capabilities,
        evidenceStages: root.JOURNEY_EVIDENCE_STAGES || [],
        eventContract: root.HearthProgressEventContract
      });
    }

    var levelOneProgress = summarizeLevel("L1");
    if (storedLevelNum > 1 && levelOneProgress && !levelOneProgress.complete) {
      levelId = "L1";
      progress = levelOneProgress;
    } else {
      progress = summarizeLevel(levelId);
    }

    var level = levels[levelId] || {};
    var levelNum = parseInt(levelId.replace(/[^0-9]/g, ""), 10) || 1;
    var authored = root.JOURNEY_LEVELS && root.JOURNEY_LEVELS[levelNum - 1];
    var total = (authored && authored.totalLessons) || (Number.isFinite(level.lessonsTotal) ? level.lessonsTotal : 0);
    var records = Array.isArray(level.lessonRecords) ? level.lessonRecords : [];
    var completedRecords = records.filter(function completedRecord(record) {
      return record && record.status === "complete";
    }).length;
    var done = Math.max(completedRecords, Number(level.lessonsDone) || 0);
    var currentLabel = "Level " + levelNum;
    if (progress && !progress.complete && (done >= total || storedLevelNum > levelNum || level.complete)) {
      currentLabel += " consolidation";
    } else if (progress && progress.complete) {
      currentLabel += " complete";
    }
    return {
      done: done,
      total: total,
      label: active.name || "Journey",
      learnerId: active.id || null,
      levelId: levelId,
      current: currentLabel,
      capabilityMet: progress ? progress.metRequired : 0,
      capabilityTotal: progress ? progress.totalRequired : 0,
      capabilityPercent: progress ? progress.percent : 0,
      capabilityComplete: Boolean(progress && progress.complete),
      encountered: progress ? progress.encountered : 0,
      historicalLevelClaim: storedLevelNum > levelNum
    };
  }

  function practiceCounts(storage) {
    var state = readJsonValue(storage, "hearth-practice-state", {});
    var log = readJsonValue(storage, "hearth-practice-log", []);
    var completed = state && state.completed ? Object.keys(state.completed).length : 0;
    var minutes = Array.isArray(log) ? log.reduce(function sumMinutes(total, entry) {
      return total + (Number(entry.minutes) || Number(entry.duration) || 0);
    }, 0) : 0;
    return {
      done: completed,
      total: countPracticeDrills(),
      sessions: Array.isArray(log) ? log.length : 0,
      minutes: minutes
    };
  }

  function createCounts(storage) {
    var projects = readJsonValue(storage, "hearth-create-projects", []);
    var current = readJsonValue(storage, "hearth-create-current", {});
    var hasDraft = Boolean(current && (current.notes || (current.ingredients && current.ingredients.length)));
    return {
      projects: Array.isArray(projects) ? projects.length : 0,
      hasDraft: hasDraft
    };
  }

  function progressCounts(storage) {
    storage = storage || root.localStorage;
    return {
      foundation: { done: readBestJsonCount(storage, ["fProgress", "hearth-foundation-progress"]), total: 10 },
      journey: activeJourneyCounts(storage),
      doing: { done: readJsonCount(storage, "dProgress"), total: countDoingDrills() },
      knowing: { done: readBestJsonCount(storage, ["kProgress", "hearth-knowing-progress"]), total: countKnownTopics() },
      practice: practiceCounts(storage),
      create: createCounts(storage),
      streak: parseInt(storage.getItem("streak") || "0", 10) || 0
    };
  }

  function percentFor(item) {
    if (!item || !item.total) return 0;
    return Math.max(0, Math.min(100, Math.round(item.done / item.total * 100)));
  }

  function progressRow(label, item) {
    var percent = percentFor(item);
    return '<div class="progress-row"><span class="progress-label">' + escapeHtml(label) + '</span>'
      + '<div class="progress-bar"><div class="progress-fill" style="width:' + percent + '%"></div></div>'
      + '<span class="progress-ratio">' + item.done + '/' + item.total + '</span></div>';
  }

  function progressSummary(counts) {
    var areas = [
      { id: "foundation", label: "Foundation", action: "revisit one basic block", item: counts.foundation },
      { id: "journey", label: "Journey", action: "continue the next lesson step", item: counts.journey },
      { id: "doing", label: "Do", action: "touch one physical drill", item: counts.doing },
      { id: "knowing", label: "Know", action: "clear one concept or word", item: counts.knowing },
      { id: "practice", label: "Practice", action: "complete one focused candle session", item: counts.practice }
    ].filter(function hasTrackableTotal(area) { return area.item && area.item.total > 0; });
    var done = areas.reduce(function sumDone(total, area) { return total + area.item.done; }, 0);
    var total = areas.reduce(function sumTotal(total, area) { return total + area.item.total; }, 0);
    var readiness = counts.journey ? counts.journey.capabilityPercent || 0 : 0;
    var journeyComplete = Boolean(counts.journey && counts.journey.capabilityComplete);
    var next = journeyComplete
      ? { label: "Review", action: "review the roadmap before deciding what should deepen next" }
      : { label: "Journey", action: "open the current roadmap and work the next capability that still needs evidence" };
    return {
      done: done,
      next: next,
      overall: readiness,
      readiness: readiness,
      total: total,
      weakest: null
    };
  }

  function renderProgressHtml(counts) {
    var summary = progressSummary(counts);
    var next = summary.next || { label: "Review", action: "choose one small step and keep the path alive" };
    var learner = counts.journey && counts.journey.label ? counts.journey.label : "Active learner";
    var current = counts.journey && counts.journey.current ? counts.journey.current : "Journey";
    return '<div class="progress-shell">'
      + '<section class="progress-hero" aria-label="Whole simulator progress summary">'
      + '<div class="progress-hero-top"><div class="progress-learner"><span>Active learner</span><strong>' + escapeHtml(learner) + '</strong></div><div class="progress-level-pill">' + escapeHtml(current) + '</div></div>'
      + '<div class="progress-main-number">' + summary.readiness + '<small>%</small></div>'
      + '<p class="progress-main-caption"><strong>Level readiness.</strong> This comes from demonstrated capabilities, not merely opening pages or finishing lesson screens.</p>'
      + '<div class="progress-snapshot">'
      + '<div><span>Capabilities</span><strong>' + (counts.journey.capabilityMet || 0) + '/' + (counts.journey.capabilityTotal || 0) + '</strong></div>'
      + '<div><span>Practice</span><strong>' + (counts.practice.minutes || 0) + ' min</strong></div>'
      + '<div><span>Seeds</span><strong>' + counts.create.projects + '</strong></div>'
      + '</div>'
      + '</section>'
      + '<section class="progress-board" aria-label="Progress tracks">'
      + '<div class="progress-next"><span>Next best move</span><strong>' + escapeHtml(next.label) + '</strong><p>' + escapeHtml(next.action) + '.</p></div>'
      + '<div class="progress-track-heading"><strong>Activity history</strong><span>Useful contact records, not proof of mastery</span></div>'
      + '<div class="progress-track-list">'
      + progressRow("Foundation contacts", counts.foundation)
      + (counts.journey.total ? progressRow("Journey lessons logged", counts.journey) : "")
      + progressRow("Do drill records", counts.doing)
      + progressRow("Know topic contacts", counts.knowing)
      + (counts.practice.total ? progressRow("Practice drill records", counts.practice) : "")
      + '</div>'
      + '<div class="progress-evidence-grid">'
      + '<div class="progress-evidence-card"><span>Practice</span><strong>' + (counts.practice.sessions || 0) + '</strong><small>sessions · ' + (counts.practice.minutes || 0) + ' min · ' + counts.streak + ' days</small></div>'
      + '<div class="progress-evidence-card"><span>Create</span><strong>' + counts.create.projects + '</strong><small>saved seeds' + (counts.create.hasDraft ? ' · draft open' : '') + '</small></div>'
      + '<div class="progress-evidence-card"><span>Journey</span><strong>' + (counts.journey.encountered || 0) + '</strong><small>capabilities encountered - ' + (counts.journey.done || 0) + ' lessons logged</small></div>'
      + '</div>'
      + '</section>'
      + '</div>';
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
    var particleState = storage.getItem("hearthParticles") === "off" ? "off" : "on";
    storage.setItem("hearthParticles", particleState);
    var particleBtn = byId(doc, "particleToggle");
    if (particleBtn) particleBtn.textContent = particleState === "on" ? "On" : "Off";
    var canvas = byId(doc, "emberCanvas");
    if (canvas && canvas.style) canvas.style.display = particleState === "on" ? "" : "none";
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
