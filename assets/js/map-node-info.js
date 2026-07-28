// Main map node card behavior.
// This keeps node-card wiring out of the legacy page while the SVG map still lives there.
(function initMapNodeInfo(root) {
  var activeNode = null;
  var nodeEntryToken = 0;

  function nodeData() {
    return root.NODE_DATA || {};
  }

  function updateCurrentNodeMarker(nodeId) {
    root.document.querySelectorAll('.mn-g.current').forEach(function clearCurrent(node) {
      node.classList.remove('current');
    });
    var current = root.document.querySelector('.mn-g[data-node="' + nodeId + '"]');
    if (current) current.classList.add('current');
  }

  function presentNodeInfo(data) {
    var panel = root.document.getElementById('ni');
    var overlay = root.document.getElementById('niOverlay');
    var thumb = root.document.getElementById('niThumb');
    var thumbImg = root.document.getElementById('niThumbImg');
    var emoji = root.document.getElementById('niEmoji');
    var tag = root.document.getElementById('niTag');
    var title = root.document.getElementById('niTitle');
    var role = root.document.getElementById('niRole');
    var desc = root.document.getElementById('niDesc');
    var enter = root.document.getElementById('niEnter');
    if (!panel || !overlay) return;
    if (thumb && thumbImg) {
      if (data.icon) {
        thumb.hidden = false;
        thumbImg.src = data.icon;
        thumbImg.alt = data.title + ' node icon';
      } else {
        thumb.hidden = true;
        thumbImg.removeAttribute('src');
        thumbImg.alt = '';
      }
    }
    if (emoji) emoji.textContent = data.emoji || '';
    if (tag) tag.textContent = data.tag || '';
    if (title) title.textContent = data.title || '';
    if (role) role.textContent = data.role || '';
    if (desc) desc.textContent = data.desc || '';
    if (enter) enter.textContent = data.cta || ('Enter ' + (data.title || 'Node') + ' \u2192');
    overlay.classList.add('vis');
    panel.classList.add('vis');
  }

  function enterNodeAction(data) {
    if (!data) return;
    if (data.action === 'foundation') root.showFoundation();
    else if (data.action === 'hearth') root.showHearth();
    else if (data.action === 'doing') root.showDoing();
    else if (data.action === 'knowing') root.showKnowing();
    else if (data.action === 'practice') root.showPractice();
    else if (data.action === 'study') root.showStudy();
    else if (data.action === 'play') root.showPlay();
    else if (data.action === 'create') root.showCreate();
    else if (data.action === 'mastery') root.showMastery();
  }

  function showNodeInfo(id) {
    var data = nodeData()[id];
    if (!data || data.locked) return;
    if (typeof root.playSfx === 'function') root.playSfx('node-enter', id);
    activeNode = id;
    updateCurrentNodeMarker(id);
    var wasSame = (root._flameNode === id);
    var travelMs = typeof root.moveFlame === 'function' ? root.moveFlame(id, { manual: true }) : 0;
    var delay = wasSame ? 0 : travelMs + 160;
    var entryToken = ++nodeEntryToken;
    root.setTimeout(function presentAfterTravel() {
      if (entryToken === nodeEntryToken) presentNodeInfo(data);
    }, delay);
  }

  function hideNodeInfo() {
    var panel = root.document.getElementById('ni');
    var overlay = root.document.getElementById('niOverlay');
    if (panel) panel.classList.remove('vis');
    if (overlay) overlay.classList.remove('vis');
    activeNode = null;
  }

  function enterNode() {
    var data = nodeData()[activeNode];
    if (!data || data.locked) return;
    hideNodeInfo();
    enterNodeAction(data);
  }

  root.updateCurrentNodeMarker = updateCurrentNodeMarker;
  root.showNodeInfo = showNodeInfo;
  root.presentNodeInfo = presentNodeInfo;
  root.enterNodeAction = enterNodeAction;
  root.hideNodeInfo = hideNodeInfo;
  root.enterNode = enterNode;
})(window);
