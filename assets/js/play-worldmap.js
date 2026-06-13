// ═══ PLAY NODE — WORLD MAP OF GUITAR ═══
// Interactive world map: click a region to explore its guitar tradition

const WORLD_MAP_REGIONS = [
  {
    id: 'ethiopia',
    name: 'Ethiopia',
    tradition: 'Ethiopian Jazz',
    coords: [618, 340], // x,y on the SVG map (approx)
    color: '#e8a020',
    description: 'A unique fusion of Ethiopian pentatonic scales (tizita, bati, ambassel) with jazz harmony and Latin rhythms. Pioneered by Mulatu Astatke in the 1960s — the father of Ethio-jazz.',
    keyArtists: ['Mulatu Astatke', 'Mahmoud Ahmed', 'Hailu Mergia', 'Getatchew Mekurya'],
    scales: ['Tizita (major pentatonic variant)', 'Bati (minor)', 'Ambassel', 'Anchihoye'],
    techniques: ['Phrasing with microtonal bends', 'Syncopated horn-like lines on guitar', 'Latin-influenced groove (cumbia/boogaloo roots)'],
    listenTo: ['Mulatu Astatke — Tezeta', 'Mulatu Astatke — Yègellé Tezeta', 'Hailu Mergia — Tizita'],
    learnFirst: 'Start with the Tizita scale — it\'s like major pentatonic but with a distinctive Ethiopian phrasing. Play it slowly, let the notes breathe.'
  },
  {
    id: 'brazil',
    name: 'Brazil',
    tradition: 'Bossa Nova & Samba',
    coords: [285, 470],
    color: '#00B894',
    description: 'The cool, understated genius of Jobim and Bonfa. Fingerstyle guitar with a subtle syncopated thumb pattern. Where jazz harmony meets Brazilian rhythm.',
    keyArtists: ['Antônio Carlos Jobim', 'João Gilberto', 'Luiz Bonfá', 'Baden Powell', 'Sérgio Mendes'],
    scales: ['Diatonic with extended chords (9ths, 11ths, 13ths)', 'Lydian dominant for jazzy colour'],
    techniques: ['Thumb plays bass + chords simultaneously', 'Subtle syncopation (not rushed)', 'Fingerstyle chord melody'],
    listenTo: ['Jobim — The Girl from Ipanema', 'Bonfá — Manhã de Carnaval', 'Baden Powell — Berimbau'],
    learnFirst: 'Learn the basic bossa nova pattern: thumb plays bass on beat 1, chords syncopate on the "and" of 2 and beat 3.'
  },
  {
    id: 'andalusia',
    name: 'Andalusia',
    tradition: 'Flamenco',
    coords: [478, 270],
    color: '#D63031',
    description: 'The fire of southern Spain. Rasgueado strumming, picado runs, the deep emotional weight of cante jondo. Guitar as percussion, melody, and soul simultaneously.',
    keyArtists: ['Paco de Lucía', 'Vicente Amigo', 'Tomatito', 'Sabicas', 'Paco Peña'],
    scales: ['Phrygian dominant (Spanish Gypsy scale)', 'E → F → G (classic Andalusian cadence)'],
    techniques: ['Rasgueado (multi-finger strum)', 'Picado (rest-stroke runs)', 'Tremolo (different from classical — i-a-m-i pattern)', 'Golpe (tapping the soundboard)', 'Alzapúa (thumb-only technique)'],
    listenTo: ['Paco de Lucía — Entre Dos Aguas', 'Paco de Lucía — Concierto de Aranjuez (Adagio)', 'Vicente Amigo — Tres Notas Para Decir Te Quiero'],
    learnFirst: 'Master the Andalusian cadence (Am–G–F–E) with a basic rasgueado. Feel the gravity pulling toward E.'
  },
  {
    id: 'mississippi',
    name: 'Mississippi Delta',
    tradition: 'Delta Blues',
    coords: [205, 290],
    color: '#5a9fd4',
    description: 'Where it all began. Acoustic guitar, slide, field hollers, and the deep truth of the human condition. One guitar, one voice, one story.',
    keyArtists: ['Robert Johnson', 'Son House', 'Charley Patton', 'Mississippi John Hurt', 'Muddy Waters'],
    scales: ['Minor pentatonic', 'Blues scale (pentatonic + ♭5)', 'Mixolydian for turnaround licks'],
    techniques: ['Slide technique (bottleneck)', 'Open tunings (Open G, Open D)', 'Fingerpicking with alternating bass', 'Bending with vocal-like expression'],
    listenTo: ['Robert Johnson — Cross Road Blues', 'Son House — Death Letter Blues', 'Muddy Waters — Rollin\' Stone'],
    learnFirst: 'Tune to Open G (DGDGBD). Put the slide on your pinky. Play one string slowly. Listen to Son House first.'
  },
  {
    id: 'west-africa',
    name: 'West Africa',
    tradition: 'Kora & Griot Tradition',
    coords: [495, 360],
    color: '#f1c40f',
    description: 'The ancestral source. The kora (21-string harp-lute) and ngoni are the ancestors of the banjo and, by extension, modern guitar. Cyclic patterns, call-and-response, storytelling through music.',
    keyArtists: ['Toumani Diabaté', 'Ali Farka Touré', 'Salif Keita', 'Taj Mahal & Toumani Diabaté'],
    scales: ['Pentatonic (the shared ancestor)', 'Heptatonic modes specific to each griot lineage'],
    techniques: ['Cyclic fingerpicking patterns', 'Thumb plays steady bass', 'Index and middle play melodic cycles', 'Call-and-response phrasing'],
    listenTo: ['Ali Farka Touré — Diaraby', 'Toumani Diabaté — Tula Tera', 'Ali Farka Touré & Ry Cooder — Talking Timbuktu'],
    learnFirst: 'Learn a simple cyclic pattern in open G tuning. Thumb holds the pulse, fingers weave around it. This IS the root of blues fingerpicking.'
  },
  {
    id: 'france',
    name: 'France',
    tradition: 'Gypsy Jazz',
    coords: [495, 215],
    color: '#E17055',
    description: 'The Django Reinhardt legacy. La pompe rhythm, rest-stroke picking, arpeggio-based soloing on Selmer-Maccaferri guitars. Swing that hits different.',
    keyArtists: ['Django Reinhardt', 'Stéphane Grappelli', 'Bireli Lagrene', 'Stochelo Rosenberg', 'Angelo Debarre'],
    scales: ['Gypsy minor (harmonic minor scale, mode 4)', 'Diminished scale over dominant chords', 'Arpeggio-based lines over ii-V-I'],
    techniques: ['La pompe (4-beat rhythm, percussive chord stabs)', 'Rest-stroke picking (downward, powerful)', 'Chromatic approach notes', 'Glissando and vibrato'],
    listenTo: ['Django Reinhardt — Minor Swing', 'Django Reinhardt — Nuages', 'Django Reinhardt — Djangology'],
    learnFirst: 'Learn la pompe first — the right hand rhythm IS the genre. Then start with arpeggios over a ii-V-I in D.'
  },
  {
    id: 'ireland',
    name: 'Ireland',
    tradition: 'Celtic Guitar',
    coords: [443, 180],
    color: '#2ECC71',
    description: 'The ancient harp tradition translated to steel strings. DADGAD tuning opened up the drone-based sound of jigs, reels, and airs. The guitar became a melodic and accompanying instrument simultaneously.',
    keyArtists: ['Pierre Bensusan', 'Duck Baker', 'John Renbourn', 'Tony McManus', 'Arty McGlynn'],
    scales: ['Dorian and Mixolydian modes', 'Pentatonic for tunes', 'Major and natural minor for airs'],
    techniques: ['DADGAD tuning (the Celtic guitar standard)', 'Drone bass with melodic fingers', 'Ornamentation: rolls, cuts, grace notes', 'Alternate picking for reel tempos'],
    listenTo: ['Pierre Bensusan — The Last Pint', 'Tony McManus — The Mason\'s Apron', 'John Renbourn — The Hermit'],
    learnFirst: 'Tune to DADGAD. Learn "Star of the County Down" — it teaches you how drones work under a melody.'
  },
  {
    id: 'argentina',
    name: 'Argentina',
    tradition: 'Tango & Folklore',
    coords: [290, 540],
    color: '#9b59b6',
    description: 'From the bandoneón-driven streets of Buenos Aires to the bombos of the interior. Guitar shares the spotlight — rhythmic milonga chords, lyrical folklore, and the drama of tango.',
    keyArtists: ['Astor Piazzolla', 'Atahualpa Yupanqui', 'Mercedes Sosa', 'Aníbal Arias'],
    scales: ['Minor modes with chromatic passing tones', 'Lydian for folklore brightness'],
    techniques: ['Tango strum (sharp, accented)', 'Fingerstyle folklore accompaniment', 'Counter-melody to the vocal line'],
    listenTo: ['Piazzolla — Libertango (guitar version)', 'Atahualpa Yupanqui — Los Ejes de Mi Carreta', 'Mercedes Sosa — Gracias a la Vida'],
    learnFirst: 'Learn the milonga rhythm — it\'s the heartbeat of Argentine guitar. A 3+3+2 pattern that feels like walking on cobblestones.'
  },
  {
    id: 'india',
    name: 'India',
    tradition: 'Raga-Influenced Guitar',
    coords: [685, 290],
    color: '#FF6B6B',
    description: 'Where the guitar meets the ancient system of ragas. Slides, microtones, and sustained drone notes. The guitar becomes a veena — a vehicle for meditative melodic exploration.',
    keyArtists: ['Debashish Bhattacharya', 'Vishwa Mohan Bhatt', 'Ravi Shankar (influence)', 'Brij Bhushan Kabra'],
    scales: ['Raga-based (not Western scales)', 'Individual ragas explored across the fretboard', 'Drone strings + melodic strings'],
    techniques: ['Meend (slides between notes)', 'Hammer-ons and pull-offs as ornamentation', 'Open tunings to create drone', 'Chikari (drone) strings'],
    listenTo: ['Debashish Bhattacharya — Mahima', 'Vishwa Mohan Bhatt — Meeting by the River (with Ry Cooder)'],
    learnFirst: 'Pick a simple raga like Bhupali (major pentatonic). Play it slowly with slides — don\'t pick every note, glide to it.'
  },
  {
    id: 'japan',
    name: 'Japan',
    tradition: 'Koto & Shamisen Influence',
    coords: [810, 230],
    color: '#fd79a8',
    description: 'The austerity of Japanese aesthetics meets the guitar. Pentatonic scales shared with the koto and shamisen. Space and silence as musical elements.',
    keyArtists: ['Hiroshima (band)', 'Miyavi', 'Kakiage (acoustic traditions)'],
    scales: ['Hirajōshi (Japanese pentatonic)', 'In scale', 'Kumoijoshi'],
    techniques: ['Pentatonic phrasing with space', 'Right-hand tapping (Miyavi style)', 'Minimalist approach — fewer notes, more weight'],
    listenTo: ['Traditional — Sakura Sakura', 'Miyavi — various'],
    learnFirst: 'Learn the Hirajōshi scale (1-2-♭3-5-♭6). Play 5 notes, then pause. Let the silence speak.'
  },
  {
    id: 'cuba',
    name: 'Cuba',
    tradition: 'Son & Afro-Cuban',
    coords: [235, 380],
    color: '#00cec9',
    description: 'The clave is king. Guitar (tres) plays syncopated montunos — repeating patterns that lock into the percussion. Where African rhythm and European harmony created something entirely new.',
    keyArtists: ['Compay Segundo', 'Eliades Ochoa', 'Buena Vista Social Club', 'Arsenio Rodríguez'],
    scales: ['Major and minor diatonic', 'Mixolydian over dominant montunos'],
    techniques: ['Tres-style strumming (3 double courses)', 'Montuno patterns (syncopated repeating figure)', 'Contrapuntal bass + chord movement'],
    listenTo: ['Compay Segundo — Chan Chan', 'Buena Vista Social Club — El Cuarto de Tula'],
    learnFirst: 'Learn a basic montuno pattern in C major. The clave rhythm (3-2 or 2-3) IS the foundation — internalise it before you play a note.'
  },
  {
    id: 'usa',
    name: 'USA',
    tradition: 'Rock, Funk & Soul',
    coords: [195, 250],
    color: '#6c5ce7',
    description: 'The melting pot. From the Delta bluesmen who went electric in Chicago, to funk in Dayton, to the rock revolution. Power, groove, and attitude.',
    keyArtists: ['Jimi Hendrix', 'Eddie Hazel (Funkadelic)', 'Steve Cropper (Stax)', 'Jimmy Nolen (James Brown)', 'Pete Townshend'],
    scales: ['Minor pentatonic and blues (rock foundation)', 'Mixolydian (dominant rock/funk)', 'Dorian for funk vamps'],
    techniques: ['Power chords (root + fifth)', 'Palm muting', '16th-note scratch funk', 'Bends and vibrato', 'Chord arpeggiation (Hendrix style)'],
    listenTo: ['Jimi Hendrix — Purple Haze', 'Eddie Hazel — Maggot Brain', 'James Brown — Get Up (I Feel Like Being a) Sex Machine'],
    learnFirst: 'Learn the E minor pentatonic box. Then learn a 16th-note scratch pattern (mute and strum). You now have rock AND funk.'
  }
];

// ═══ SVG WORLD MAP PATHS ═══
// Stylised continents as clickable regions — simplified shapes for the tome aesthetic

const WORLD_MAP_SVG = `
<svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" class="world-map-svg" id="worldMapSvg">
  <defs>
    <filter id="wm-glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <radialGradient id="oceanGrad"><stop offset="0%" stop-color="#1a1510" stop-opacity="0.3"/><stop offset="100%" stop-color="#0d0b08" stop-opacity="0"/></radialGradient>
  </defs>

  <!-- Ocean background -->
  <rect width="900" height="600" fill="var(--bg)"/>
  <rect width="900" height="600" fill="url(#oceanGrad)"/>

  <!-- Lat/Lon grid (subtle) -->
  <g class="wm-grid" opacity="0.04" stroke="#d4af69" stroke-width="0.3" fill="none">
    <line x1="0" y1="150" x2="900" y2="150"/>
    <line x1="0" y1="300" x2="900" y2="300"/>
    <line x1="0" y1="450" x2="900" y2="450"/>
    <line x1="150" y1="0" x2="150" y2="600"/>
    <line x1="300" y1="0" x2="300" y2="600"/>
    <line x1="450" y1="0" x2="450" y2="600"/>
    <line x1="600" y1="0" x2="600" y2="600"/>
    <line x1="750" y1="0" x2="750" y2="600"/>
  </g>

  <!-- ═══ CONTINENTS (simplified, stylised) ═══ -->

  <!-- North America -->
  <g class="wm-region-group" onclick="wmClick('usa')" style="cursor:pointer">
    <path d="M 80,130 Q 60,200 100,260 L 130,270 L 160,260 Q 200,240 220,210 L 240,200 Q 230,160 200,140 L 180,120 Q 140,100 110,110 Z"
      fill="#d4af6908" stroke="#d4af6930" stroke-width="0.8" class="wm-continent"/>
  </g>

  <!-- South America -->
  <g class="wm-region-group" onclick="wmClick('argentina')" style="cursor:pointer">
    <path d="M 250,320 Q 240,380 260,450 Q 290,510 290,540 Q 320,530 310,480 Q 300,400 285,350 Q 275,330 260,320 Z"
      fill="#d4af6908" stroke="#d4af6930" stroke-width="0.8" class="wm-continent"/>
  </g>
  <!-- Brazil region of South America -->
  <g class="wm-region-group" onclick="wmClick('brazil')" style="cursor:pointer">
    <path d="M 270,350 Q 260,370 275,410 Q 295,450 290,480 L 305,470 Q 300,420 290,380 Q 285,360 280,350 Z"
      fill="#d4af6908" stroke="#d4af6930" stroke-width="0.8" class="wm-continent"/>
  </g>

  <!-- Europe -->
  <g class="wm-region-group" onclick="wmClick('france')" style="cursor:pointer">
    <path d="M 440,150 Q 430,180 445,210 L 470,215 Q 490,200 500,180 L 510,165 Q 495,150 475,145 Q 455,142 440,150 Z"
      fill="#d4af6908" stroke="#d4af6930" stroke-width="0.8" class="wm-continent"/>
  </g>

  <!-- Ireland / UK -->
  <g class="wm-region-group" onclick="wmClick('ireland')" style="cursor:pointer">
    <path d="M 420,160 Q 415,170 420,182 Q 430,185 435,175 Q 435,165 425,158 Z"
      fill="#d4af6908" stroke="#d4af6930" stroke-width="0.8" class="wm-continent"/>
  </g>

  <!-- Andalusia / Iberian Peninsula -->
  <g class="wm-region-group" onclick="wmClick('andalusia')" style="cursor:pointer">
    <path d="M 445,210 Q 440,225 450,245 Q 470,250 490,240 Q 495,220 485,210 Q 465,205 445,210 Z"
      fill="#d4af6908" stroke="#d4af6930" stroke-width="0.8" class="wm-continent"/>
  </g>

  <!-- Africa -->
  <g class="wm-region-group" onclick="wmClick('west-africa')" style="cursor:pointer">
    <path d="M 460,260 Q 445,310 460,360 Q 475,410 480,440 Q 510,440 520,410 Q 530,360 525,310 Q 515,270 490,255 Q 470,250 460,260 Z"
      fill="#d4af6908" stroke="#d4af6930" stroke-width="0.8" class="wm-continent"/>
  </g>

  <!-- Ethiopia (East Africa) -->
  <g class="wm-region-group" onclick="wmClick('ethiopia')" style="cursor:pointer">
    <path d="M 580,310 Q 570,330 585,355 Q 615,360 625,345 Q 630,325 615,310 Q 595,300 580,310 Z"
      fill="#d4af6908" stroke="#d4af6930" stroke-width="0.8" class="wm-continent"/>
  </g>

  <!-- Middle East / Persia (connects to India) -->
  <g class="wm-region-group" onclick="wmClick('india')" style="cursor:pointer">
    <path d="M 620,200 Q 640,230 670,250 Q 690,270 710,280 Q 700,240 680,220 Q 660,200 640,195 Q 625,195 620,200 Z"
      fill="#d4af6908" stroke="#d4af6930" stroke-width="0.8" class="wm-continent"/>
  </g>

  <!-- Japan -->
  <g class="wm-region-group" onclick="wmClick('japan')" style="cursor:pointer">
    <path d="M 790,210 Q 785,225 795,240 Q 815,235 820,220 Q 815,205 800,205 Z"
      fill="#d4af6908" stroke="#d4af6930" stroke-width="0.8" class="wm-continent"/>
  </g>

  <!-- Cuba / Caribbean -->
  <g class="wm-region-group" onclick="wmClick('cuba')" style="cursor:pointer">
    <ellipse cx="225" cy="370" rx="20" ry="6" fill="#d4af6908" stroke="#d4af6930" stroke-width="0.8" class="wm-continent" style="cursor:pointer"/>
  </g>

  <!-- ═══ HOTSPOT MARKERS ═══ -->
  <g id="wm-hotspots">
    <!-- Each region gets a glowing dot -->
  </g>
</svg>
`;

// Regions will be injected as hotspots after render
function wmBuildHotspots(){
  return WORLD_MAP_REGIONS.map(function(r){
    return '<g class="wm-hotspot" data-region="'+r.id+'" onclick="wmClick(\''+r.id+'\')" style="cursor:pointer">'+
      '<circle cx="'+r.coords[0]+'" cy="'+r.coords[1]+'" r="14" fill="'+r.color+'" opacity="0.08">'+
        '<animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite"/>'+
        '<animate attributeName="opacity" values="0.08;0.02;0.08" dur="2.5s" repeatCount="indefinite"/>'+
      '</circle>'+
      '<circle cx="'+r.coords[0]+'" cy="'+r.coords[1]+'" r="6" fill="'+r.color+'" opacity="0.25"/>'+
      '<circle cx="'+r.coords[0]+'" cy="'+r.coords[1]+'" r="3" fill="'+r.color+'" filter="url(#wm-glow)"/>'+
      '<text x="'+r.coords[0]+'" y="'+(r.coords[1]-12)+'" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="6" fill="'+r.color+'" opacity="0.7" letter-spacing="0.05em">'+r.name.toUpperCase()+'</text>'+
    '</g>';
  }).join('');
}

window.WORLD_MAP_REGIONS = WORLD_MAP_REGIONS;
window.wmBuildHotspots = wmBuildHotspots;
