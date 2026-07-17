/*
 * Doing drill preview controller adapter v0.
 *
 * Binds click and hover preview behavior for drill dots in the legacy Doing view.
 */
(function initDoingDrillPreviewController(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthDoingDrillPreviewController = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createDoingDrillPreviewController(root) {
  "use strict";

  var previewEl = null;

  function findDrill(doing, catId, drillId) {
    if (!doing || !doing.categories) return null;
    var cat = doing.categories.find(function findCategory(category) {
      return category.id === catId;
    });
    if (!cat) return null;
    var drill = cat.drills.find(function findCategoryDrill(item) {
      return item.id === drillId;
    });
    return drill ? { cat: cat, drill: drill } : null;
  }

  function renderPreviewHtml(options) {
    options = options || {};
    var cat = options.cat;
    var drill = options.drill;
    var stateLabel = options.stateLabel || "Untouched";
    var level = options.level || "";
    var ui = options.ui || root.HearthDoingUiUtils;
    if (!cat || !drill || !ui) return "";

    var esc = ui.escapeHtml;
    return '<div class="pdp-skill">' + esc(cat.title) + '</div>' +
      '<div class="pdp-title">' + esc(drill.title) + '</div>' +
      '<div class="pdp-meta">Level ' + esc(level) + ' &middot; ' + esc(drill.duration) + ' &middot; BPM ' + esc(drill.bpm) + '</div>' +
      '<div class="pdp-state">' + esc(stateLabel) + '</div>';
  }

  function ensurePreviewEl(documentRef) {
    if (!previewEl) {
      previewEl = documentRef.createElement("div");
      previewEl.className = "doing-drill-dot-preview";
      documentRef.body.appendChild(previewEl);
    }
    return previewEl;
  }

  function bindDrillPreviews(options) {
    options = options || {};
    var rootEl = options.rootEl;
    var documentRef = options.documentRef || root.document;
    var doing = options.doing;
    var ui = options.ui || root.HearthDoingUiUtils;
    var stateLabels = options.stateLabels || {};
    var getState = options.getState;
    var getLevel = options.getLevel;
    var onOpenDrill = options.onOpenDrill;

    if (!rootEl || !documentRef || !doing || !ui) return;

    rootEl.querySelectorAll(".doing-board-next").forEach(function bindNextButton(btn) {
      btn.onclick = function openNext() {
        if (onOpenDrill) {
          onOpenDrill(this.getAttribute("data-cat"), this.getAttribute("data-drill"));
        }
      };
    });

    rootEl.querySelectorAll(".drill-dot").forEach(function bindDot(dot) {
      dot.onclick = function openDot() {
        if (onOpenDrill) {
          onOpenDrill(this.getAttribute("data-cat"), this.getAttribute("data-drill"));
        }
      };
      function showPreview() {
        var catId = this.getAttribute("data-cat");
        var drillId = this.getAttribute("data-drill");
        var found = findDrill(doing, catId, drillId);
        if (!found) return;
        var state = getState ? getState(drillId) : "";
        var stateLabel = state ? stateLabels[state] : "Untouched";
        var level = getLevel ? getLevel(found.drill) : "";
        var preview = ensurePreviewEl(documentRef);
        preview.innerHTML = renderPreviewHtml({
          cat: found.cat,
          drill: found.drill,
          stateLabel: stateLabel,
          level: level,
          ui: ui
        });
        var bounds = this.getBoundingClientRect();
        var previewWidth = 260;
        var previewHeight = 112;
        var viewportWidth = documentRef.documentElement.clientWidth;
        var viewportHeight = documentRef.documentElement.clientHeight;
        preview.style.display = "block";
        preview.style.left = Math.max(8, Math.min(bounds.right + 8, viewportWidth - previewWidth - 8)) + "px";
        preview.style.top = Math.max(8, Math.min(bounds.top - 10, viewportHeight - previewHeight - 8)) + "px";
      }
      function hidePreview() {
        if (previewEl) previewEl.style.display = "none";
      }
      dot.onmouseenter = showPreview;
      dot.onfocus = showPreview;
      dot.onmouseleave = hidePreview;
      dot.onblur = hidePreview;
    });
  }

  return {
    version: "0.1.0",
    bindDrillPreviews: bindDrillPreviews,
    findDrill: findDrill,
    renderPreviewHtml: renderPreviewHtml
  };
});
