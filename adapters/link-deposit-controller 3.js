/*
 * Link deposit controller adapter v0.
 *
 * Handles the legacy YouTube link deposit popup and API save flow.
 */
(function initLinkDepositController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthLinkDepositController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createLinkDepositController(root) {
  "use strict";

  var API_BASE = "https://thehearth.pro/api/";

  function byId(doc, id) {
    return doc && doc.getElementById ? doc.getElementById(id) : null;
  }

  function value(doc, id) {
    var el = byId(doc, id);
    return el && el.value ? el.value.trim() : "";
  }

  function setStatus(doc, text, color) {
    var status = byId(doc, "linkDepositStatus");
    if (!status) return;
    status.textContent = text;
    status.style.color = color;
  }

  function titleFromUrl(url) {
    var match = String(url || "").match(/[?&]v=([^&]+)/);
    return match ? "YouTube Video " + match[1] : "YouTube Link";
  }

  function readForm(doc, now) {
    var url = value(doc, "linkDepositUrl");
    var title = value(doc, "linkDepositTitle") || titleFromUrl(url);
    return {
      category: value(doc, "linkDepositCat"),
      key_name: "yt-" + (now || Date.now()),
      level_num: parseInt(value(doc, "linkDepositLevel"), 10) || 1,
      notes: value(doc, "linkDepositNotes"),
      title: title,
      url: url
    };
  }

  function videoPayload(form) {
    return {
      key_name: form.key_name,
      title: form.title,
      youtube_url: form.url,
      category: form.category,
      level_num: form.level_num,
      description: form.notes
    };
  }

  function authHeaders(storage) {
    storage = storage || root.localStorage;
    var token = storage ? storage.getItem("hearth-admin-token") || "" : "";
    var headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = "Bearer " + token;
    return headers;
  }

  function apiUrl(action, apiBase) {
    return (apiBase || API_BASE) + "?a=" + action;
  }

  function matchingTopicWords(topic, searchText) {
    var words = (topic.title + " " + (topic.description || "") + " " + (topic.category || ""))
      .toLowerCase()
      .split(/[\s,;:\-]+/);
    return words.filter(function usefulWord(word) {
      return word.length > 3 && searchText.indexOf(word) !== -1;
    });
  }

  function clearForm(doc) {
    ["linkDepositUrl", "linkDepositTitle", "linkDepositNotes"].forEach(function clear(id) {
      var el = byId(doc, id);
      if (el) el.value = "";
    });
  }

  function togglePanel(options) {
    options = options || {};
    var doc = options.document || root.document;
    var panel = byId(doc, "linkDepositPanel");
    if (!panel || !panel.classList) return;
    var wasOpen = panel.classList.contains("show");
    if (typeof options.closePanels === "function") options.closePanels(["linkDepositPanel"]);
    panel.classList.toggle("show", !wasOpen);
    if (!wasOpen) {
      (options.delay || root.setTimeout || setTimeout)(function focusUrl() {
        var input = byId(doc, "linkDepositUrl");
        if (input && input.focus) input.focus();
      }, 100);
    }
  }

  async function depositLink(options) {
    options = options || {};
    var doc = options.document || root.document;
    var fetchFn = options.fetch || root.fetch;
    var storage = options.storage || root.localStorage;
    if (!doc || !fetchFn) return;

    var form = readForm(doc, options.now);
    if (!form.url) {
      setStatus(doc, "Paste a URL first", "#e74c3c");
      return;
    }

    setStatus(doc, "Saving + auto-linking...", "var(--dim)");
    try {
      var response = await fetchFn(apiUrl("content-videos", options.apiBase), {
        method: "POST",
        headers: authHeaders(storage),
        body: JSON.stringify(videoPayload(form))
      });
      var data = await response.json();
      if (!data.ok) {
        setStatus(doc, "Error: " + (data.error || "unknown"), "#e74c3c");
        return;
      }

      var links = [];
      var searchText = (form.title + " " + form.notes + " " + form.category).toLowerCase();
      try {
        var topics = await fetchFn(apiUrl("content-topics", options.apiBase)).then(function parse(r) { return r.json(); });
        for (var i = 0; i < topics.length; i += 1) {
          if (matchingTopicWords(topics[i], searchText).length >= 1) {
            await fetchFn(apiUrl("content-videos", options.apiBase), {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: data.id, topic_id: topics[i].id })
            });
            links.push("topic: " + topics[i].title);
            break;
          }
        }
      } catch (topicError) {}

      try {
        var glossary = await fetchFn(apiUrl("content-glossary", options.apiBase)).then(function parse(r) { return r.json(); });
        for (var j = 0; j < glossary.length; j += 1) {
          if (searchText.indexOf(String(glossary[j].term || "").toLowerCase()) !== -1) {
            links.push("term: " + glossary[j].term);
          }
        }
      } catch (glossaryError) {}

      setStatus(doc, "Saved! ✓" + (links.length ? " Linked to: " + links.join(", ") : ""), "#2ecc71");
      clearForm(doc);
    } catch (error) {
      setStatus(doc, "Network error", "#e74c3c");
    }
  }

  function bindTitleAutofill(options) {
    options = options || {};
    var doc = options.document || root.document;
    if (!doc || !doc.addEventListener || doc.__hearthLinkDepositBound) return;
    doc.__hearthLinkDepositBound = true;
    function bindPasteHandler() {
      var urlEl = byId(doc, "linkDepositUrl");
      if (!urlEl || !urlEl.addEventListener) return;
      urlEl.addEventListener("paste", function autofillTitleFromPaste() {
        (options.delay || root.setTimeout || setTimeout)(function fetchTitle() {
          var url = urlEl.value.trim();
          var titleEl = byId(doc, "linkDepositTitle");
          if (!titleEl || titleEl.value || url.indexOf("youtube.com") === -1) return;
          (options.fetch || root.fetch)("https://www.youtube.com/oembed?url=" + encodeURIComponent(url) + "&format=json")
            .then(function parse(response) { return response.json(); })
            .then(function applyTitle(data) { if (data.title) titleEl.value = data.title; })
            .catch(function ignoreOembedError() {});
        }, 100);
      });
    }
    if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", bindPasteHandler);
    else bindPasteHandler();
  }

  return {
    version: "0.1.0",
    authHeaders: authHeaders,
    bindTitleAutofill: bindTitleAutofill,
    depositLink: depositLink,
    matchingTopicWords: matchingTopicWords,
    readForm: readForm,
    titleFromUrl: titleFromUrl,
    togglePanel: togglePanel,
    videoPayload: videoPayload
  };
});
