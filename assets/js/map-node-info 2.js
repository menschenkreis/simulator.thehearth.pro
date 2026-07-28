// Main map node card behavior.
// This keeps node-card wiring out of the legacy page while the SVG map still lives there.
(function initMapNodeInfo(root) {
  var activeNode = null;
  var nodeEntryToken = 0;
  var MAX_NODE_ENTRY_DELAY_MS = 2200;

  function nodeData() {
    return root.NODE_DATA || {};
  }

  function attr(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function escapeAttr(character) {
      return ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[character];
    });
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
    renderMapNodeHitLayer();
  }

  function renderMapNodeHitLayer() {
    var wrap = root.document.querySelector('.map-wrap');
    if (!wrap) return;
    var layer = wrap.querySelector('.map-node-hit-layer');
    if (!layer) {
      layer = root.document.createElement('div');
      layer.className = 'map-node-hit-layer';
      wrap.appendChild(layer);
    }
    var wrapRect = wrap.getBoundingClientRect();
    var html = '';
    root.document.querySelectorAll('.mn-g[data-node]').forEach(function addHit(node) {
      var id = node.getAttribute('data-node');
      var data = nodeData()[id] || {};
      var rect = node.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var size = Math.max(72, Math.min(150, Math.max(rect.width, rect.height) + 34));
      if (id === 'mastery') size = Math.max(size, Math.min(190, Math.max(rect.width, rect.height)));
      var left = rect.left - wrapRect.left + rect.width / 2;
      var top = rect.top - wrapRect.top + rect.height / 2;
      html += '<button type="button" class="map-node-hit" data-node-hit="' + attr(id) + '" ' +
        'style="left:' + left.toFixed(2) + 'px;top:' + top.toFixed(2) + 'px;width:' + size.toFixed(2) + 'px;height:' + size.toFixed(2) + 'px" ' +
        'aria-label="' + attr(data.locked ? (data.title || id) + ' locked' : 'Open ' + (data.title || id)) + '"' +
        (data.locked ? ' aria-disabled="true" tabindex="-1"' : '') + '></button>';
    });
    layer.innerHTML = html;
    layer.querySelectorAll('.map-node-hit').forEach(function bindHit(button) {
      var id = button.getAttribute('data-node-hit');
      var data = nodeData()[id] || {};
      button.addEventListener('click', function openNodeHit(event) {
        event.preventDefault();
        if (!data.locked) showNodeInfo(id);
      });
      button.addEventListener('mouseenter', function previewNodeHit(event) {
        var node = root.document.querySelector('.mn-g[data-node="' + id + '"]');
        if (node) node.classList.add('current');
        if (typeof root.showNodePreview === 'function') root.showNodePreview(id, event);
      });
      button.addEventListener('mouseleave', function clearPreviewNodeHit() {
        if (typeof root.hideNodePreview === 'function') root.hideNodePreview();
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
  root.addEventListener('resize', function refreshMapNodeHitLayer() {
    root.clearTimeout(root.__hearthMapHitLayerTimer);
    root.__hearthMapHitLayerTimer = root.setTimeout(renderMapNodeHitLayer, 120);
  });

  root.updateCurrentNodeMarker = updateCurrentNodeMarker;
  root.showNodeInfo = showNodeInfo;
  root.presentNodeInfo = presentNodeInfo;
  root.enterNodeAction = enterNodeAction;
  root.hideNodeInfo = hideNodeInfo;
  root.enterNode = enterNode;
  root.wireMapNodeAccess = wireMapNodeAccess;
  root.renderMapNodeHitLayer = renderMapNodeHitLayer;
})(window);
