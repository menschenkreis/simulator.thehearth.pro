/*
 * Knowing topic viewer adapter v0.
 *
 * Renders the legacy encyclopedia-style Knowing topic screen.
 */
(function initKnowingTopicViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthKnowingTopicViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createKnowingTopicViewer(root) {
  "use strict";

  function categoryColor(knowing, cat) {
    if (root.HearthKnowingBookViewer) {
      return root.HearthKnowingBookViewer.categoryColor(knowing, cat);
    }
    return "#8B4513";
  }

  function difficultyLabel(difficulty) {
    if (root.HearthKnowingBookViewer) {
      return root.HearthKnowingBookViewer.difficultyLabel(difficulty);
    }
    return ["", "Beginner", "Intermediate", "Advanced"][difficulty] || "";
  }

  function nextTopicFor(cat, topic) {
    var topics = (cat && cat.topics) || [];
    var index = topics.indexOf(topic);
    return index >= 0 && index < topics.length - 1 ? topics[index + 1] : null;
  }

  function renderKnowingTopic(options) {
    options = options || {};
    var knowing = options.knowing;
    var cat = options.cat;
    var topic = options.topic;
    var completed = options.completed || {};
    if (!knowing || !cat || !topic) return "";

    var isDone = completed[topic.id];
    var color = categoryColor(knowing, cat);
    var diffLabel = difficultyLabel(topic.difficulty);
    var nextTopic = nextTopicFor(cat, topic);

    return '<div style="padding:20px;max-width:900px;margin:0 auto">' +
      '<button class="back-btn" onclick="showKnowingBook(\'' + cat.id + '\')">← Back to ' + cat.title + '</button>' +
      '<div style="display:flex;gap:20px;align-items:flex-start">' +
      '<div style="flex:0 0 120px;display:flex;flex-direction:column;align-items:center;position:sticky;top:20px">' +
        '<img src="images/character-full/Neutral.png" style="width:110px;height:110px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4));animation:char-float 3s ease-in-out infinite"/>' +
        '<div style="background:#fdfaf7;border:1px solid #e0d8cc;border-radius:10px;padding:10px 12px;margin-top:8px;max-width:140px;text-align:center;position:relative">' +
          '<div style="position:absolute;left:-6px;top:50%;transform:translateY(-50%);width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-right:6px solid #e0d8cc"></div>' +
          '<div style="font-size:0.65rem;color:#555;line-height:1.4">Reading: <strong style="color:' + color + '">' + topic.title + '</strong></div>' +
        '</div>' +
      '</div>' +
      '<div style="flex:1;background:#fdfaf7;border:1px solid #e0d8cc;border-radius:8px;padding:24px;color:#333">' +
        '<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">' +
          '<span style="border:1px solid ' + color + '40;color:' + color + ';padding:3px 10px;border-radius:12px;font-size:0.6rem">' + cat.title + '</span>' +
          '<span style="border:1px solid #ccc;color:#888;padding:3px 10px;border-radius:12px;font-size:0.6rem">' + diffLabel + '</span>' +
          '<span style="border:1px solid #ccc;color:#888;padding:3px 10px;border-radius:12px;font-size:0.6rem">' + topic.source + '</span>' +
          (isDone ? '<span style="border:1px solid #2ecc7140;color:#2ecc71;padding:3px 10px;border-radius:12px;font-size:0.6rem">✓ Understood</span>' : '') +
        '</div>' +
        '<h2 style="font-family:Cinzel;color:' + color + ';font-size:1.1rem;margin:0 0 16px 0">' + topic.title + '</h2>' +
        '<div style="background:#fff;border:1px solid #e8e0d4;border-radius:8px;padding:20px;line-height:1.7;font-size:0.85rem;color:#444">' + topic.body + '</div>' +
        '<div style="margin-top:12px;padding:10px 14px;background:#f8f4ee;border:1px solid #e8e0d4;border-radius:6px;font-size:0.65rem;color:#888;line-height:1.5">' +
          '<strong style="color:' + color + '">Source:</strong> ' + topic.source +
        '</div>' +
        '<div style="display:flex;gap:8px;margin-top:16px">' +
          '<button onclick="markKnowingTopic(\'' + cat.id + '\',\'' + topic.id + '\')" style="flex:1;background:' + (isDone ? '#2ecc71' : color) + ';color:' + (isDone ? 'white' : '#0d0b08') + ';border:none;padding:12px;border-radius:8px;font-family:DM Sans,sans-serif;font-size:0.9rem;font-weight:600;cursor:pointer">' + (isDone ? '✓ Understood' : 'Mark as understood') + '</button>' +
          (nextTopic ? '<button onclick="showKnowingTopic(\'' + cat.id + '\',\'' + nextTopic.id + '\')" style="flex:1;background:' + color + '18;color:' + color + ';border:2px solid ' + color + '60;padding:12px;border-radius:8px;font-family:DM Sans,sans-serif;font-size:0.9rem;font-weight:600;cursor:pointer">Next: ' + nextTopic.title + '</button>' : '') +
        '</div>' +
      '</div>' +
    '</div>';
  }

  return {
    version: "0.1.0",
    categoryColor: categoryColor,
    difficultyLabel: difficultyLabel,
    nextTopicFor: nextTopicFor,
    renderKnowingTopic: renderKnowingTopic
  };
});
