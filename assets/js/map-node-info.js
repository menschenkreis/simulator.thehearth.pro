// Main map node card behavior.
// This keeps node-card wiring out of the legacy page while the SVG map still lives there.
(function initMapNodeInfo(root) {
  var activeNode = null;
  var nodeEntryToken = 0;
  var MAX_NODE_ENTRY_DELAY_MS = 2200;

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
    if (enter) enter.focus();
  }

  function wireMapNodeAccess() {
    root.document.querySelectorAll('.mn-g[data-node]').forEach(function wireNode(node) {
      if (node.dataset.mapAccessBound === 'true') return;
      var id = node.getAttribute('data-node');
      var data = nodeData()[id] || {};
      node.dataset.mapAccessBound = 'true';
      node.setAttribute('role', 'button');
      node.setAttribute('tabindex', data.locked ? '-1' : '0');
      node.setAttribute('aria-label', data.locked ? (data.title || id) + ' locked' : 'Open ' + (data.title || id));
      if (data.locked) node.setAttribute('aria-disabled', 'true');
      node.addEventListener('keydown', function activateNode(event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        showNodeInfo(id);
      });
    });
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
    var delay = wasSame ? 0 : Math.min(travelMs + 160, MAX_NODE_ENTRY_DELAY_MS);
    var entryToken = ++nodeEntryToken;
    root.setTimeout(function presentAfterTravel() {
      if (entryToken === nodeEntryToken) presentNodeInfo(data);
    }, delay);
  }

  function hideNodeInfo(restoreFocus) {
    var panel = root.document.getElementById('ni');
    var overlay = root.document.getElementById('niOverlay');
    var nodeId = activeNode;
    if (panel) panel.classList.remove('vis');
    if (overlay) overlay.classList.remove('vis');
    activeNode = null;
    if (restoreFocus !== false && nodeId) {
      var node = root.document.querySelector('.mn-g[data-node="' + nodeId + '"]');
      if (node) node.focus();
    }
  }

  function enterNode() {
    var data = nodeData()[activeNode];
    if (!data || data.locked) return;
    hideNodeInfo(false);
    enterNodeAction(data);
  }

  root.document.addEventListener('keydown', function closeNodeInfo(event) {
    var panel = root.document.getElementById('ni');
    if (event.key === 'Escape' && panel && panel.classList.contains('vis')) hideNodeInfo();
  });

  wireMapNodeAccess();

  root.updateCurrentNodeMarker = updateCurrentNodeMarker;
  root.showNodeInfo = showNodeInfo;
  root.presentNodeInfo = presentNodeInfo;
  root.enterNodeAction = enterNodeAction;
  root.hideNodeInfo = hideNodeInfo;
  root.enterNode = enterNode;
  root.wireMapNodeAccess = wireMapNodeAccess;
})(window);
