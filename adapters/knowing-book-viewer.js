/*
 * Knowing book viewer adapter v0.
 *
 * Renders the legacy open-book category screen.
 */
(function initKnowingBookViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthKnowingBookViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createKnowingBookViewer(root) {
  "use strict";

  function categoryColor(knowing, cat) {
    if (root.HearthKnowingShelfViewer) {
      return root.HearthKnowingShelfViewer.categoryColor(knowing, cat);
    }
    var colors = ["#8B4513", "#4A6741", "#5B3A6B", "#2C5F7C", "#8B6914", "#6B3A3A", "#3A5B6B", "#5B4A3A", "#6B5B3A", "#3A4A6B"];
    var index = ((knowing && knowing.categories) || []).indexOf(cat);
    return colors[Math.max(0, index) % colors.length];
  }

  function difficultyLabel(difficulty) {
    return ["", "Beginner", "Intermediate", "Advanced"][difficulty] || "";
  }

  function renderTopicRow(catId, topic, index, total, completed, color) {
    var isDone = completed[topic.id];
    return '<div onclick="playSfx(\'click\');showKnowingTopic(\'' + catId + '\',\'' + topic.id + '\')" style="' +
      'padding:12px 14px;' +
      'border-bottom:' + (index < total - 1 ? '1px solid var(--border)' : 'none') + ';' +
      'cursor:pointer;transition:background 0.15s;' +
      'display:flex;align-items:center;gap:10px' +
    '" onmouseover="this.style.background=\'var(--bg)\'" onmouseout="this.style.background=\'transparent\'">' +
      '<span style="font-family:JetBrains Mono;font-size:0.65rem;color:' + (isDone ? color : 'var(--gold)') + ';opacity:0.5;min-width:20px">' + String(index + 1).padStart(2, "0") + '</span>' +
      '<div style="flex:1">' +
        '<div style="font-family:Cinzel;font-size:0.85rem;color:' + (isDone ? color : 'var(--text)') + '">' + topic.title + '</div>' +
        '<div style="font-size:0.6rem;color:var(--dim);margin-top:2px">' + difficultyLabel(topic.difficulty) + ' · ' + topic.source + '</div>' +
      '</div>' +
      '<span style="font-size:0.7rem;color:' + (isDone ? color : 'var(--dim)') + '">' + (isDone ? '&#10003;' : '&#8594;') + '</span>' +
    '</div>';
  }

  function renderKnowingBook(options) {
    options = options || {};
    var knowing = options.knowing;
    var cat = options.cat;
    var completed = options.completed || {};
    if (!knowing || !cat) return "";

    var color = categoryColor(knowing, cat);
    var description = cat.description || "";
    var html = '<div style="padding:20px;max-width:900px;margin:0 auto">' +
      '<button class="back-btn" onclick="playSfx(\'book-close\');showKnowing()">← Back to shelf</button>' +
      '<div style="display:flex;gap:20px;align-items:flex-start">' +
      '<div style="flex:0 0 120px;display:flex;flex-direction:column;align-items:center;position:sticky;top:20px">' +
        '<img src="images/character-full/Encouraging.png" style="width:120px;height:120px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));animation:char-float 3s ease-in-out infinite"/>' +
        '<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 12px;margin-top:8px;max-width:140px;text-align:center;position:relative">' +
          '<div style="position:absolute;left:-6px;top:50%;transform:translateY(-50%);width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-right:6px solid var(--border)"></div>' +
          '<div style="font-size:0.65rem;color:var(--text);line-height:1.4">This is your <strong style="color:var(--gold)">' + cat.title + '</strong> reference. ' + description.substring(0, 80) + '...</div>' +
        '</div>' +
      '</div>' +
      '<div style="flex:1;background:#fdfaf7;border:1px solid #e0d8cc;border-radius:8px;overflow:hidden;color:#333">' +
      '<div style="background:linear-gradient(135deg,' + color + ',' + color + 'dd);padding:20px;text-align:center">' +
      '<h2 style="font-family:Cinzel;color:rgba(255,255,255,0.95);font-size:1.1rem;margin:0">' + cat.title + '</h2>' +
      '<p style="font-size:0.65rem;color:rgba(255,255,255,0.6);margin:6px 0 0 0">' + description + '</p>' +
    '</div>' +
    '<div style="padding:12px 16px">';

    (cat.topics || []).forEach(function renderTopic(topic, index) {
      html += renderTopicRow(cat.id, topic, index, cat.topics.length, completed, color);
    });
    html += '</div></div></div>';
    return html;
  }

  return {
    version: "0.1.0",
    categoryColor: categoryColor,
    difficultyLabel: difficultyLabel,
    renderKnowingBook: renderKnowingBook,
    renderTopicRow: renderTopicRow
  };
});
