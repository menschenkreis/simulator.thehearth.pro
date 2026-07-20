/* Renders the active Play atlas from model data and controller state. */
(function initPlayAtlasViewer(root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.HearthPlayAtlasViewer = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createPlayAtlasViewer() {
  "use strict";

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function escapeCharacter(character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  function markerFor(snapshot, region) {
    return snapshot.markers.find(function findMarker(marker) {
      return marker.destination_id === region.id;
    }) || { state: "open", percent: 0, selected: false };
  }

  function renderHotspots(snapshot) {
    return snapshot.regions.map(function renderRegion(region) {
      var marker = markerFor(snapshot, region);
      var x = Number(region.coords && region.coords[0]) / 900 * 100;
      var y = Number(region.coords && region.coords[1]) / 600 * 100;
      return '<button class="play-atlas-hotspot ' + esc(marker.state) + (marker.selected ? " selected" : "") + '" type="button" ' +
        'data-play-action="select-destination" data-destination-id="' + esc(region.id) + '" ' +
        'aria-label="' + esc(region.name + ": " + region.tradition + ". " + marker.percent + " percent of this learner route explored.") + '" ' +
        'style="--x:' + x + '%;--y:' + y + '%;--marker:' + esc(region.color || "#d4af69") + ';--progress:' + (marker.percent * 3.6) + 'deg">' +
        '<span class="play-atlas-hotspot-label">' + esc(region.name) + '</span></button>';
    }).join("");
  }

  function sourceLinks(culture) {
    return (culture && culture.source_refs || []).slice(0, 2).map(function renderSource(source) {
      return '<a href="' + esc(source.url) + '" target="_blank" rel="noreferrer">' + esc(source.publisher || source.title) + '</a>';
    }).join("");
  }

  function drawerDestination(snapshot) {
    var region = snapshot.selectedRegion;
    if (!region) return "";
    var current = region.id === snapshot.route.currentDestinationId;
    return '<span class="play-atlas-eyebrow">' + (current ? "Your current destination" : "Selected destination") + '</span>' +
      '<h3>' + esc(region.name) + '</h3>' +
      '<div class="play-atlas-tradition">' + esc(region.tradition) + '</div>' +
      '<p class="play-atlas-copy">' + (current ? "Your A minor pentatonic already belongs in musical conversation here." : "Explore freely. This tradition needs reviewed material before it becomes a full learning route.") + '</p>' +
      '<button class="play-atlas-primary" type="button" data-play-action="enter-tradition">Enter the tradition</button>';
  }

  function drawerTradition(snapshot) {
    var region = snapshot.selectedRegion;
    var tradition = snapshot.selectedTradition;
    if (!tradition || !tradition.tradition_profile || !tradition.culture) {
      return '<span class="play-atlas-eyebrow">Tradition review required</span>' +
        '<h3>' + esc(region && region.name) + '</h3>' +
        '<p class="play-atlas-copy">This point currently has a style label, but it does not yet name the communities, purpose, setting, transmission, and living practice responsibly enough to teach.</p>' +
        '<button class="play-atlas-secondary" type="button" data-play-action="destination">Back to destination</button>';
    }
    var profile = tradition.tradition_profile;
    var culture = tradition.culture;
    return '<span class="play-atlas-eyebrow">Living tradition</span>' +
      '<h3>' + esc(region.name) + '</h3>' +
      '<div class="play-atlas-tradition">' + esc(tradition.tradition_label) + '</div>' +
      '<p class="play-atlas-copy">' + esc(culture.cultural_doorway) + '</p>' +
      '<div class="play-atlas-facts">' +
        '<div class="play-atlas-fact"><b>Carried by</b><span>' + esc(profile.community_names.join(", ")) + '</span></div>' +
        '<div class="play-atlas-fact"><b>What the music does</b><span>' + esc(profile.social_functions.join(", ")) + '</span></div>' +
        '<div class="play-atlas-fact"><b>Where it lives</b><span>' + esc(profile.practice_settings.join(", ")) + '</span></div>' +
        '<div class="play-atlas-fact"><b>How it travels</b><span>' + esc(profile.transmission) + '</span></div>' +
      '</div>' +
      '<div class="play-atlas-connection">' + esc(culture.sound_connection) + '</div>' +
      '<p class="play-atlas-note">' + esc(profile.living_now) + '</p>' +
      '<div class="play-atlas-sources">' + sourceLinks(culture) + '</div>' +
      '<button class="play-atlas-primary" type="button" data-play-action="pulse">Find the pulse</button>' +
      '<p class="play-atlas-note">' + esc(profile.learner_relationship_note) + '</p>' +
      '<button class="play-atlas-secondary" type="button" data-play-action="destination">Back to destination</button>';
  }

  function drawerPulse(state) {
    return '<span class="play-atlas-eyebrow">Feel before copying</span><h3>Find the pulse</h3>' +
      '<span class="play-atlas-eyebrow">Moment 3 of 8 - 60 BPM</span>' +
      '<p class="play-atlas-copy">Mute the strings and make four small downstrokes. Keep the ground steady, but leave your hand relaxed enough for a voice to move around it.</p>' +
      '<div class="play-atlas-pulse' + (state.pulseRunning ? " running" : "") + '" aria-label="Four-beat visual pulse"><span class="play-atlas-beat"></span><span class="play-atlas-beat"></span><span class="play-atlas-beat"></span><span class="play-atlas-beat"></span></div>' +
      '<button class="play-atlas-primary" type="button" data-play-action="toggle-pulse">' + (state.pulseRunning ? "Pause visual pulse" : "Start visual pulse") + '</button>' +
      '<button class="play-atlas-secondary" type="button" data-play-action="home">I can hold the ground</button>' +
      '<button class="play-atlas-secondary" type="button" data-play-action="tradition">Back to tradition</button>';
  }

  function drawerHome(state) {
    return '<span class="play-atlas-eyebrow">A safe place to return</span><h3>Find home</h3>' +
      '<span class="play-atlas-eyebrow">Moment 4 of 8 - A minor</span>' +
      '<p class="play-atlas-copy">Choose one A as your safety point. Play a tiny phrase, leave space, then return to that A without rushing.</p>' +
      '<div class="play-atlas-choices">' +
        choice("home", "open-a", "Open A", "5th string - open", state.home === "open-a") +
        choice("home", "low-a", "Low A", "6th string - fret 5", state.home === "low-a") +
      '</div>' +
      '<button class="play-atlas-primary" type="button" data-play-action="join"' + (state.home ? "" : " disabled") + '>Choose how to join</button>' +
      '<button class="play-atlas-secondary" type="button" data-play-action="pulse">Back to pulse</button>';
  }

  function choice(kind, value, title, detail, selected) {
    return '<button class="play-atlas-choice' + (selected ? " selected" : "") + '" type="button" data-play-action="choose-' + esc(kind) + '" data-value="' + esc(value) + '">' +
      '<strong>' + esc(title) + '</strong><span>' + esc(detail) + '</span></button>';
  }

  function songBarRoad(song) {
    return '<div class="play-atlas-song-road" aria-label="Eight-bar chord road">' +
      (song.progression || []).map(function renderBar(bar) {
        return '<div><span>' + esc(bar.bar) + '</span><strong>' + esc(bar.chord) + '</strong></div>';
      }).join("") + '</div>';
  }

  function songRole(song, roleId) {
    var roles = song && song.playActivity && song.playActivity.roles || [];
    return roles.find(function findRole(role) { return role.id === roleId; }) || roles[0] || {};
  }

  function drawerSongIntro(snapshot, state) {
    var song = snapshot.songThread;
    var activity = song.playActivity;
    return '<span class="play-atlas-eyebrow">Journey handoff - ' + esc(activity.roomLabel) + '</span>' +
      '<h3>' + esc(song.title) + '</h3>' +
      '<p class="play-atlas-copy">' + esc(activity.summary) + '</p>' +
      '<p class="play-atlas-note">' + esc(activity.culturalNote) + '</p>' +
      songBarRoad(song) +
      '<div class="play-atlas-choices">' +
        choice("song-role", "rhythm", "Rhythm first", song.rhythm.label + " - hold the ground", state.role === "rhythm") +
        choice("song-role", "lead", "Lead first", song.lead.label + " - make the answer", state.role === "lead") +
      '</div>' +
      '<button class="play-atlas-primary" type="button" data-play-action="song-begin"' + (state.role ? "" : " disabled") + '>Begin my first role</button>' +
      '<p class="play-atlas-note">Easier: ' + esc(song.completion.easier) + '</p>';
  }

  function drawerSongConversation(snapshot, state) {
    var song = snapshot.songThread;
    var role = songRole(song, state.role);
    var tried = Array.isArray(state.rolesTried) ? state.rolesTried : [];
    var bothTried = tried.indexOf("rhythm") !== -1 && tried.indexOf("lead") !== -1;
    var nextRole = state.role === "rhythm" ? "lead" : "rhythm";
    return '<span class="play-atlas-eyebrow">Play the whole form - 60 BPM</span>' +
      '<h3>' + esc(role.label || "Your role") + '</h3>' +
      '<p class="play-atlas-copy">' + esc(role.instruction) + '</p>' +
      songBarRoad(song) +
      '<div class="play-atlas-turn"><b>Listen</b><br>The other role has a different job, but both roles share the same pulse.</div>' +
      '<div class="play-atlas-turn"><b>Complete</b><br>Stay with all eight bars. A small complete form matters more than a clever unfinished fragment.</div>' +
      (!bothTried ? '<button class="play-atlas-primary" type="button" data-play-action="song-swap">I played this role - swap to ' + esc(nextRole) + '</button>' : '') +
      '<button class="play-atlas-primary" type="button" data-play-action="song-complete"' + (bothTried ? "" : " disabled") + '>We completed all 8 bars in both roles</button>' +
      '<button class="play-atlas-secondary" type="button" data-play-action="song-intro">Back to the song road</button>';
  }

  function drawerSongRemember(snapshot, state) {
    var song = snapshot.songThread;
    var activity = song.playActivity;
    return '<span class="play-atlas-eyebrow">Remember the exchange</span><h3>What changed?</h3>' +
      '<p class="play-atlas-copy">' + esc(activity.reflectionPrompt) + '</p>' +
      '<div class="play-atlas-choices single">' +
        choice("reflection", "voice", "The lead became a voice", "The phrase answered instead of running through the scale.", state.reflection === "voice") +
        choice("reflection", "space", "The space mattered", "Listening became part of the exchange.", state.reflection === "space") +
        choice("reflection", "ground", "The rhythm held the song", "The pulse supported the lead without crowding it.", state.reflection === "ground") +
      '</div>' +
      '<button class="play-atlas-primary" type="button" data-play-action="finish"' + (state.reflection || state.finished ? "" : " disabled") + '>' + (state.finished ? "Song exchange saved" : "Save this musical evidence") + '</button>' +
      (state.finished ? '<p class="play-atlas-confirmation">Journey can now see the complete song and role exchange. Choose where the idea goes next.</p>' +
        '<div class="play-atlas-finish-actions"><button class="play-atlas-secondary" type="button" data-play-action="send-practice">Repeat in Practice</button><button class="play-atlas-secondary" type="button" data-play-action="send-create">Keep a variation</button><button class="play-atlas-primary" type="button" data-play-action="return-handoff">Return to Journey</button></div>' : '') +
      '<button class="play-atlas-secondary" type="button" data-play-action="song-converse">Back to the roles</button>';
  }

  function drawerJoin(state) {
    return '<span class="play-atlas-eyebrow">Music needs more than one job</span><h3>Join the music</h3>' +
      '<span class="play-atlas-eyebrow">Moment 5 of 8 - Choose a role</span>' +
      '<p class="play-atlas-copy">Begin with one clear responsibility. You will swap after four calls.</p>' +
      '<div class="play-atlas-choices">' +
        choice("role", "rhythm", "Rhythm", "Hold A minor and protect the pulse", state.role === "rhythm") +
        choice("role", "lead", "Lead", "Use a few pentatonic notes and return home", state.role === "lead") +
      '</div>' +
      '<button class="play-atlas-primary" type="button" data-play-action="converse"' + (state.role ? "" : " disabled") + '>Begin the conversation</button>' +
      '<button class="play-atlas-secondary" type="button" data-play-action="home">Back to home note</button>';
  }

  function drawerConversation(state) {
    var home = state.home === "open-a" ? "open A" : "low A";
    var role = state.role === "rhythm" ? "Rhythm first" : "Lead first";
    return '<span class="play-atlas-eyebrow">Voice and guitar answer</span><h3>Converse</h3>' +
      '<span class="play-atlas-eyebrow">Moments 6-7 of 8 - ' + esc(role) + '</span>' +
      '<div class="play-atlas-turn"><b>Call</b><br>Play for two beats. Use only what you can hear clearly.</div>' +
      '<div class="play-atlas-turn"><b>Space</b><br>Leave two beats open. Listen instead of filling them.</div>' +
      '<div class="play-atlas-turn"><b>Answer</b><br>Reply with a different phrase and settle on ' + esc(home) + '.</div>' +
      '<p class="play-atlas-copy">After four calls, swap rhythm and lead, then play four more. Keep the pulse underneath, but let the phrase behave like a voice.</p>' +
      '<button class="play-atlas-primary" type="button" data-play-action="remember">We played and swapped roles</button>' +
      '<button class="play-atlas-secondary" type="button" data-play-action="swap-role">Swap my starting role</button>' +
      '<button class="play-atlas-secondary" type="button" data-play-action="join">Back to roles</button>';
  }

  function drawerRemember(state) {
    return '<span class="play-atlas-eyebrow">Remember the relationship</span><h3>What changed?</h3>' +
      '<span class="play-atlas-eyebrow">Moment 8 of 8 - Reflection</span>' +
      '<p class="play-atlas-copy">Choose what became most audible after meeting the tradition and playing together.</p>' +
      '<div class="play-atlas-choices single">' +
        choice("reflection", "voice", "The guitar felt like a voice", "The phrase answered instead of only running through a scale.", state.reflection === "voice") +
        choice("reflection", "space", "The space mattered", "Listening became part of the phrase.", state.reflection === "space") +
        choice("reflection", "ground", "The pulse held the story", "Rhythm supported the conversation without crowding it.", state.reflection === "ground") +
      '</div>' +
      '<p class="play-atlas-note">Credit the musicians and communities you learned from. This route is one visit, not completion of a culture.</p>' +
      '<button class="play-atlas-primary" type="button" data-play-action="finish"' + (state.reflection || state.finished ? "" : " disabled") + '>' + (state.finished ? "Route saved" : "Finish and remember") + '</button>' +
      (state.finished ? '<p class="play-atlas-confirmation">This reflection now feeds Journey and your future Practice plan.</p>' : "") +
      '<button class="play-atlas-secondary" type="button" data-play-action="converse">Back to conversation</button>';
  }

  function renderDrawer(snapshot, state) {
    if (snapshot.route.type === "song") {
      if (state.view === "song-converse") return drawerSongConversation(snapshot, state);
      if (state.view === "song-remember") return drawerSongRemember(snapshot, state);
      return drawerSongIntro(snapshot, state);
    }
    if (state.view === "tradition") return drawerTradition(snapshot);
    if (state.view === "pulse") return drawerPulse(state);
    if (state.view === "home") return drawerHome(state);
    if (state.view === "join") return drawerJoin(state);
    if (state.view === "converse") return drawerConversation(state);
    if (state.view === "remember") return drawerRemember(state);
    return drawerDestination(snapshot);
  }

  function render(snapshot, state) {
    var moment = Number(state.moment) || snapshot.route.defaultMoment;
    var selected = snapshot.selectedRegion || {};
    var songRoute = snapshot.route.type === "song";
    return '<div class="play-atlas-shell' + (songRoute ? " song-route" : "") + '" style="--destination:' + esc(selected.color || "#d4af69") + '">' +
      '<button class="play-atlas-back" type="button" data-play-action="' + (songRoute ? "return-handoff" : "back") + '" title="' + (songRoute ? "Return to Journey" : "Back to map") + '" aria-label="' + (songRoute ? "Return to Journey" : "Back to map") + '">&larr;</button>' +
      '<div class="play-atlas-heading"><span class="play-atlas-eyebrow">' + (songRoute ? "Play - Hearth Studio" : "Play - Musical world atlas") + '</span><h2>' + (songRoute ? esc(snapshot.songThread.title) : "Where shall the guitar take us?") + '</h2></div>' +
      '<div class="play-atlas-learner"><span class="play-atlas-eyebrow">Active learner</span><strong>' + esc(snapshot.learner.name) + '</strong></div>' +
      '<section class="play-atlas-stage" aria-label="Musical world atlas">' +
        '<img class="play-atlas-art" src="images/play-world-atlas.webp" alt="Illustrated world atlas of guitar traditions">' +
        '<div class="play-atlas-shade" aria-hidden="true"></div>' +
        '<div class="play-atlas-hotspots">' + (songRoute ? "" : renderHotspots(snapshot)) + '</div>' +
      '</section>' +
      '<aside class="play-atlas-guide" aria-label="Guide"><img src="images/character-generated/guide-seated-listening-v1-ui.webp" alt="Guide listening with a guitar"><div class="play-atlas-guide-bubble"><span class="play-atlas-eyebrow">Guide</span><p>' + (songRoute ? "One complete, calm exchange. Hold the ground, answer, then swap." : "Your Journey is pointing to one tradition. Follow the bright glow, or wander and listen.") + '</p></div></aside>' +
      '<aside class="play-atlas-drawer" aria-live="polite">' + renderDrawer(snapshot, state) + '</aside>' +
      '<div class="play-atlas-route" aria-label="Current Play route"><div class="play-atlas-progress" style="--value:' + (moment / snapshot.route.totalMoments * 360) + 'deg"></div>' +
        '<div class="play-atlas-route-copy"><span class="play-atlas-eyebrow">' + (songRoute ? "Journey song thread" : "Today\'s Level 1 route") + '</span><strong>' + esc(snapshot.route.title) + '</strong><span>' + esc(snapshot.route.summary) + '</span></div>' +
        '<div class="play-atlas-route-status">' + moment + ' of ' + snapshot.route.totalMoments + '<br>moments explored</div></div>' +
      '</div>';
  }

  return { version: "0.1.0", render: render, renderDrawer: renderDrawer };
});
