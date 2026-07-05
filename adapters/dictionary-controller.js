/*
 * Dictionary controller adapter v0.
 *
 * Renders and filters the legacy glossary/dictionary panel.
 */
(function initDictionaryController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDictionaryController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDictionaryController(root) {
  "use strict";

  var CHAPTER_ORDER = ["Foundational Terms", "Music Theory", "Guitar Anatomy", "Technique"];
  var COLORS = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#3498db", "#9b59b6"];
  var COLOR_MAP = {
    "Foundational Terms": "#e74c3c",
    "Music Theory": "#e67e22",
    "Guitar Anatomy": "#f1c40f",
    Technique: "#2ecc71"
  };

  function byId(doc, id) {
    return doc && doc.getElementById ? doc.getElementById(id) : null;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function chapterCounts(terms) {
    var counts = {};
    (terms || []).forEach(function countTerm(term) {
      if (!counts[term.ch]) counts[term.ch] = 0;
      counts[term.ch] += 1;
    });
    return counts;
  }

  function renderChapterListHtml(terms) {
    var counts = chapterCounts(terms);
    var html = "";
    CHAPTER_ORDER.forEach(function renderChapter(chapter, index) {
      if (!counts[chapter]) return;
      var color = COLORS[index % COLORS.length];
      html += '<div onclick="showDictChapter(\'' + escapeHtml(chapter) + '\')" style="'
        + "padding:10px 14px;"
        + "background:" + color + "12;"
        + "border:2px solid " + color + "40;"
        + "border-radius:8px;"
        + "cursor:pointer;transition:all 0.15s;"
        + "display:flex;justify-content:space-between;align-items:center;"
        + "margin-bottom:8px"
        + '" onmouseover="this.style.borderColor=\'' + color + '\'" onmouseout="this.style.borderColor=\'' + color + '40\'">'
        + '<span style="font-family:Cinzel,serif;font-size:0.85rem;color:' + color + ';font-weight:600">' + escapeHtml(chapter) + "</span>"
        + '<span style="font-family:JetBrains Mono;font-size:0.6rem;color:var(--dim)">' + counts[chapter] + " terms</span>"
        + "</div>";
    });
    return html;
  }

  function renderChapterHtml(terms, chapter) {
    var chapterTerms = (terms || [])
      .filter(function inChapter(term) { return term.ch === chapter; })
      .slice()
      .sort(function byTerm(a, b) { return a.term.localeCompare(b.term); });
    var color = COLOR_MAP[chapter] || "var(--gold)";
    var html = '<div style="margin-bottom:12px">'
      + '<button onclick="populateDictionary()" style="background:none;border:1px solid var(--border);color:var(--dim);padding:6px 12px;border-radius:4px;cursor:pointer;font-family:inherit;font-size:0.7rem">← All Chapters</button>'
      + "</div>"
      + '<div style="font-family:Cinzel,serif;font-size:0.7rem;color:' + color + ';letter-spacing:0.15em;text-transform:uppercase;padding:10px 12px 4px 12px;border-bottom:1px solid var(--border)">'
      + escapeHtml(chapter)
      + "</div>";
    chapterTerms.forEach(function renderTerm(term) {
      html += '<div class="glossary-item" data-term="' + escapeHtml(String(term.term || "").toLowerCase()) + '" style="padding:10px 12px;border-bottom:1px solid var(--border);cursor:default">'
        + '<div style="display:flex;align-items:baseline;gap:8px">'
        + '<span style="font-family:\'DM Sans\',sans-serif;font-size:0.85rem;color:var(--gold);font-weight:600">' + escapeHtml(term.term) + "</span>"
        + "</div>"
        + '<div style="font-size:0.75rem;color:var(--dim);line-height:1.5;margin-top:2px">' + escapeHtml(term.def) + "</div>"
        + "</div>";
    });
    return {
      count: chapterTerms.length,
      html: html
    };
  }

  function countText(count, query, fallbackTotal) {
    if (query) return count + " result" + (count !== 1 ? "s" : "") + " for '" + query + "'";
    return fallbackTotal + " terms";
  }

  function filterVisibleItems(query, rootEl) {
    var q = String(query || "").toLowerCase().trim();
    var visible = 0;
    if (!rootEl || !rootEl.querySelectorAll) return visible;
    Array.prototype.forEach.call(rootEl.querySelectorAll(".glossary-item"), function updateItem(item) {
      var term = item.getAttribute("data-term") || "";
      var text = item.textContent.toLowerCase();
      var show = !q || term.indexOf(q) !== -1 || text.indexOf(q) !== -1;
      item.style.display = show ? "block" : "none";
      if (show) visible += 1;
    });
    return visible;
  }

  function populateDictionary(doc, terms) {
    doc = doc || root.document;
    terms = terms || root.DICTIONARY || [];
    var list = byId(doc, "glossary-list");
    if (!list) return;
    var countEl = byId(doc, "glossary-count");
    var searchEl = byId(doc, "glossary-search");
    if (countEl) countEl.textContent = terms.length + " terms";
    if (searchEl) {
      searchEl.value = "";
      searchEl.oninput = function searchDictionary() {
        filterGlossary(this.value, doc, terms);
      };
    }
    list.innerHTML = renderChapterListHtml(terms);
  }

  function showChapter(chapter, doc, terms) {
    doc = doc || root.document;
    terms = terms || root.DICTIONARY || [];
    var list = byId(doc, "glossary-list");
    if (!list) return;
    var countEl = byId(doc, "glossary-count");
    var searchEl = byId(doc, "glossary-search");
    var rendered = renderChapterHtml(terms, chapter);
    if (countEl) countEl.textContent = rendered.count + " terms";
    list.innerHTML = rendered.html;
    if (searchEl) {
      searchEl.oninput = function searchChapter() {
        var visible = filterVisibleItems(this.value, list);
        if (countEl) countEl.textContent = countText(visible, this.value.toLowerCase().trim(), rendered.count);
      };
    }
  }

  function filterGlossary(query, doc, terms) {
    doc = doc || root.document;
    terms = terms || root.DICTIONARY || [];
    var list = byId(doc, "glossary-list") || doc;
    var visible = filterVisibleItems(query, list);
    var countEl = byId(doc, "glossary-count");
    var q = String(query || "").toLowerCase().trim();
    if (countEl) countEl.textContent = countText(visible, q, terms.length);
  }

  return {
    version: "0.1.0",
    chapterCounts: chapterCounts,
    escapeHtml: escapeHtml,
    filterGlossary: filterGlossary,
    populateDictionary: populateDictionary,
    renderChapterHtml: renderChapterHtml,
    renderChapterListHtml: renderChapterListHtml,
    showChapter: showChapter
  };
});
