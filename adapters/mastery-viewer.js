/*
 * Mastery viewer adapter v0.
 *
 * Renders the legacy Mastery and Masters at Play screens.
 */
(function initMasteryViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.HearthMasteryViewer = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createMasteryViewer() {
  "use strict";

  function renderList(items) {
    return (items || []).map(function renderItem(item) {
      return '<li>' + item + '</li>';
    }).join('');
  }

  function renderBeyondCard(item) {
    var listenHtml = renderList(item.listen);
    return '<div class="mastery-card" style="--mc:' + item.color + '">' +
      '<div class="mastery-card-tag">' + item.tag + '</div>' +
      '<h2 class="mastery-card-title" style="color:' + item.color + '">' + item.title + '</h2>' +
      '<div class="mastery-card-artist">' + item.artist + '</div>' +
      '<p class="mastery-card-desc">' + item.description + '</p>' +
      '<div class="mastery-section">' +
        '<div class="mastery-section-label">Why This Is Here</div>' +
        '<p class="mastery-card-text">' + item.why + '</p>' +
      '</div>' +
      (listenHtml ? '<div class="mastery-section"><div class="mastery-section-label">Listen & Explore</div><ul class="mastery-list">' + listenHtml + '</ul></div>' : '') +
      (item.reflect ? '<div class="mastery-reflect" style="border-color:' + item.color + '"><div class="mastery-reflect-label" style="color:' + item.color + '">Reflect</div><p class="mastery-card-text">' + item.reflect + '</p></div>' : '') +
      (item.videoUrl ? '<a href="' + item.videoUrl + '" target="_blank" class="mastery-video-link" style="background:' + item.color + '20;border-color:' + item.color + '50;color:' + item.color + '">▶ Watch on Instagram</a>' : '') +
    '</div>';
  }

  function renderMastersButton() {
    return '<div style="margin-top:20px;text-align:center">' +
      '<button onclick="showMastersLibrary()" style="background:linear-gradient(135deg,#9b59b6,#d4af69);border:none;color:#fff;padding:14px 28px;border-radius:10px;font-family:\'Cinzel\',serif;font-size:0.95rem;font-weight:700;cursor:pointer;letter-spacing:0.08em;box-shadow:0 4px 16px rgba(212,175,105,0.2);transition:all 0.2s" onmouseover="this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.transform=\'\'">' +
        '▶ Masters at Play' +
      '</button>' +
      '<div style="font-size:0.65rem;color:var(--dim);margin-top:8px">Watch masters at work. Learn by seeing, not reading.</div>' +
    '</div>';
  }

  function renderMastery(options) {
    options = options || {};
    var beyond = options.beyond || [];
    var cardsHtml = beyond.map(renderBeyondCard).join('');
    return '<div class="mastery-wrap">' +
      '<div class="mastery-header">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">' +
          '<div style="width:10px;height:10px;border-radius:50%;background:#9b59b6;box-shadow:0 0 12px #9b59b6"></div>' +
          '<span style="font-family:JetBrains Mono;font-size:0.6rem;color:#9b59b6;letter-spacing:0.12em;text-transform:uppercase">Mastery · Beyond</span>' +
        '</div>' +
        '<h2 style="font-family:\'Cinzel\',serif;color:#d4af69;font-size:1.4rem;margin:0;font-weight:700;letter-spacing:0.03em">What Lies Beyond</h2>' +
        '<p style="font-size:0.8rem;color:var(--dim);margin:8px 0 0 0;line-height:1.6;max-width:500px">' +
          'These are musicians who have gone beyond technique, beyond theory, beyond what can be written on a page. ' +
          'They hear what most of us are still learning to listen for. This is not a lesson - it is a glimpse.' +
        '</p>' +
      '</div>' +
      '<div class="mastery-cards">' + cardsHtml + '</div>' +
      renderMastersButton() +
      '<div class="mastery-footer"><span style="font-family:JetBrains Mono;font-size:0.55rem;color:var(--dim);letter-spacing:0.1em;text-transform:uppercase">More artists coming soon</span></div>' +
    '</div>';
  }

  function renderMasterCard(master) {
    var listenHtml = renderList(master.listen);
    return '<div class="mastery-card" style="--mc:' + master.color + '">' +
      '<h2 class="mastery-card-title" style="color:' + master.color + '">' + master.name + '</h2>' +
      '<div class="mastery-card-artist">' + master.instrument + '</div>' +
      '<p class="mastery-card-desc">' + master.description + '</p>' +
      (master.why ? '<div class="mastery-section"><div class="mastery-section-label">Why This Is Here</div><p class="mastery-card-text">' + master.why + '</p></div>' : '') +
      (listenHtml ? '<div class="mastery-section"><div class="mastery-section-label">Listen & Explore</div><ul class="mastery-list">' + listenHtml + '</ul></div>' : '') +
      (master.channel ? '<a href="' + master.channel + '" target="_blank" class="mastery-video-link" style="background:' + master.color + '20;border-color:' + master.color + '50;color:' + master.color + '">▶ Visit YouTube Channel</a>' : '') +
    '</div>';
  }

  function renderMastersLibrary(masters) {
    masters = masters || [];
    return '<div class="mastery-wrap">' +
      '<div class="mastery-header">' +
        '<button class="back-btn" onclick="showMastery()">← Mastery</button>' +
        '<div style="display:flex;align-items:center;gap:10px;margin:12px 0 6px">' +
          '<div style="width:10px;height:10px;border-radius:50%;background:#d4af69;box-shadow:0 0 12px #d4af69"></div>' +
          '<span style="font-family:JetBrains Mono;font-size:0.6rem;color:#d4af69;letter-spacing:0.12em;text-transform:uppercase">Masters at Play</span>' +
        '</div>' +
        '<h2 style="font-family:\'Cinzel\',serif;color:#d4af69;font-size:1.4rem;margin:0;font-weight:700;letter-spacing:0.03em">Watch Masters at Work</h2>' +
        '<p style="font-size:0.8rem;color:var(--dim);margin:8px 0 0 0;line-height:1.6;max-width:500px">' +
          'Learning is not always reading and doing. Sometimes it is watching someone who has already arrived. ' +
          'These are the masters. Watch them. Listen to what they are not playing.' +
        '</p>' +
      '</div>' +
      '<div class="mastery-cards">' + masters.map(renderMasterCard).join('') + '</div>' +
    '</div>';
  }

  return {
    version: "0.1.0",
    renderBeyondCard: renderBeyondCard,
    renderMasterCard: renderMasterCard,
    renderMastery: renderMastery,
    renderMastersLibrary: renderMastersLibrary
  };
});
