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
    learnFirst: 'Start with the Tizita scale — it\'s like major pentatonic but with a distinctive Ethiopian phrasing. Play it slowly, let the notes breathe.',
    listeningLens: {
        "pulse": {
            "notice": "The rhythm breathes slowly. It does not rush. The groove leans back, not forward.",
            "demo": "Listen for the way the drums and bass lock into a gentle, swaying pulse. It feels like a conversation, not a march.",
            "try": "Tap a slow, steady beat with your foot. Play only two notes and keep them in the pocket. Feel the space between."
        },
        "hand": {
            "notice": "The right hand plays horn-like lines \u2014 long, vocal phrases on the guitar.",
            "demo": "Watch for the smooth, connected phrasing. Notes slide and bend into each other like a saxophone.",
            "try": "Play one pentatonic phrase and hold each note longer than you think. Let it breathe."
        },
        "colour": {
            "notice": "Tizita is the colour of longing. It sounds like major but carries something bittersweet.",
            "demo": "Listen for the way Tizita feels both happy and sad at the same time. That tension is the Ethiopian sound.",
            "try": "Play a simple Tizita scale (C-D-Eb-G-A) slowly. Notice how it feels different from regular pentatonic."
        },
        "story": {
            "notice": "Ethio-jazz was born when Mulatu Astatke wrapped ancient scales in Latin jazz harmony.",
            "demo": "Listen for how Western chords cradle Ethiopian modes. The scales are old; the harmony is new.",
            "try": "Listen to Tezeta by Mulatu Astatke. Hum the melody. Now play it back."
        }
    }
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
    learnFirst: 'Learn the basic bossa nova pattern: thumb plays bass on beat 1, chords syncopate on the "and" of 2 and beat 3.',
    listeningLens: {
        "pulse": {
            "notice": "Bossa nova is a whisper, not a shout. The rhythm is subtle \u2014 it sways, not stomps.",
            "demo": "Listen for the thumb playing a steady bass while the fingers dance on top. The groove is in the space.",
            "try": "Mute the strings. Tap the bossa pattern with your thumb and fingers. Feel the sway before you play a chord."
        },
        "hand": {
            "notice": "The right hand does two things at once \u2014 bass and chord, conversation between thumb and fingers.",
            "demo": "Watch the hand stay relaxed. The movement is small and controlled, not big or dramatic.",
            "try": "Play one chord. Thumb hits bass on beat 1. Fingers pluck on the 'and' of 2. Repeat slowly."
        },
        "colour": {
            "notice": "The harmony is lush \u2014 9ths, 11ths, 13ths. Every chord has a warm, full colour.",
            "demo": "Listen for the richness of the chords. They sound like sunlight on water.",
            "try": "Play a Cmaj7 chord. Then add the 9th. Hear how it opens up. That is the bossa colour."
        },
        "story": {
            "notice": "Bossa nova was born in the beachside neighbourhoods of Rio. It is intimate music.",
            "demo": "Listen for the intimacy \u2014 it sounds like someone playing in the room with you.",
            "try": "Play one bossa pattern quietly. Imagine a small room. Let the music be personal."
        }
    }
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
    learnFirst: 'Master the Andalusian cadence (Am–G–F–E) with a basic rasgueado. Feel the gravity pulling toward E.',
    listeningLens: {
        "pulse": {
            "notice": "The rhythm is not decoration. It is the floor everyone stands on.",
            "demo": "Listen for accents and silence. The hand does not just strum; it speaks in bursts.",
            "try": "Mute the strings and make a slow rasgueado rhythm for 30 seconds. No chords yet."
        },
        "hand": {
            "notice": "The right hand is the engine. Fingers open outward like a fan.",
            "demo": "Watch for the flicking motion of rasgueado, not a normal down-strum.",
            "try": "Plant the thumb lightly. Flick one finger outward across muted strings."
        },
        "colour": {
            "notice": "The harmony has gravity. It often pulls toward E like a doorway closing.",
            "demo": "Listen for the Andalusian cadence: Am-G-F-E.",
            "try": "Play Am-G-F-E once each. Let the E chord feel like the floor."
        },
        "story": {
            "notice": "Flamenco is body music: voice, dance, hands, floor, and guitar answering each other.",
            "demo": "Watch how the guitar supports the dancer or singer instead of showing off alone.",
            "try": "Tap your foot while holding one chord. Make the guitar part of the body."
        }
    }
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
    learnFirst: 'Tune to Open G (DGDGBD). Put the slide on your pinky. Play one string slowly. Listen to Son House first.',
    listeningLens: {
        "pulse": {
            "notice": "The pulse is a heartbeat. It does not swing politely \u2014 it thumps.",
            "demo": "Listen for the alternating bass thumb pattern. It is the engine.",
            "try": "Mute strings. Alternate your thumb on two bass strings. Feel the heartbeat."
        },
        "hand": {
            "notice": "The slide is a second voice. It sings while the fingers whisper.",
            "demo": "Watch the slide glide \u2014 never lifted, always touching. It is continuous, like singing.",
            "try": "Put a slide on one finger. Play one note. Slide up two frets and back. Keep it vocal."
        },
        "colour": {
            "notice": "Blues is five notes. That limitation is the freedom. Less is everything.",
            "demo": "Listen for how few notes Robert Johnson uses. Each one carries weight.",
            "try": "Play the minor pentatonic scale. Stop on each note. Let each one land."
        },
        "story": {
            "notice": "This music was born from pain, work, and the land. It is one person, one guitar, one truth.",
            "demo": "Listen for the rawness \u2014 no polish, no performance. Just honesty.",
            "try": "Play one chord. Hum over it. Tell a story with two notes and a bent string."
        }
    }
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
    learnFirst: 'Learn a simple cyclic pattern in open G tuning. Thumb holds the pulse, fingers weave around it. This IS the root of blues fingerpicking.',
    listeningLens: {
        "pulse": {
            "notice": "The rhythm is a cycle that never stops. It turns like a wheel.",
            "demo": "Listen for the interlocking patterns \u2014 thumb and fingers weave a continuous loop.",
            "try": "Play a simple 3-note cycle. Repeat it for one minute without stopping. Feel the wheel turn."
        },
        "hand": {
            "notice": "The thumb holds the ground while fingers dance on top. Two voices, one hand.",
            "demo": "Watch the thumb stay steady. The fingers move independently, weaving melody.",
            "try": "Hold one bass note with your thumb. Play a simple melody with two fingers. Keep them separate."
        },
        "colour": {
            "notice": "Pentatonic is the shared root of African and blues music. This is where it all connects.",
            "demo": "Listen for the open, warm sound \u2014 no tension, just flow.",
            "try": "Play a pentatonic scale in open G. Notice how it sounds familiar \u2014 like blues, like something old."
        },
        "story": {
            "notice": "Griots are storytellers and historians. The music carries the memory of a people.",
            "demo": "Listen for the conversation between instruments \u2014 call and response, story and echo.",
            "try": "Play a short phrase. Leave a gap. Play an answer. You are having a conversation."
        }
    }
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
    learnFirst: 'Learn la pompe first — the right hand rhythm IS the genre. Then start with arpeggios over a ii-V-I in D.',
    listeningLens: {
        "pulse": {
            "notice": "La pompe is the engine \u2014 a percussive, swinging four-beat that drives everything.",
            "demo": "Listen for the 'chunk-chunk-chunk-chunk' of the rhythm guitar. It is relentless and joyful.",
            "try": "Mute strings. Strum a steady four-beat with a heavy accent. Feel the swing. This is la pompe."
        },
        "hand": {
            "notice": "Django played with two fingers on his left hand. Limitation became his style.",
            "demo": "Watch the rest-stroke picking \u2014 powerful downward strokes, not light or fancy.",
            "try": "Play arpeggios with only downstrokes. Feel the power in the attack."
        },
        "colour": {
            "notice": "Gypsy minor is harmonic minor with a raised fourth \u2014 it sounds exotic and restless.",
            "demo": "Listen for the tension in the scale. It always wants to resolve somewhere.",
            "try": "Play harmonic minor from E. Feel the pull. That tension IS gypsy jazz colour."
        },
        "story": {
            "notice": "Django Reinhardt invented a genre with two working fingers. The music is pure will.",
            "demo": "Listen for the joy in the music \u2014 despite everything, it swings with life.",
            "try": "Play Minor Swing. Feel the energy. Let it be imperfect and alive."
        }
    }
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
    learnFirst: 'Tune to DADGAD. Learn "Star of the County Down" — it teaches you how drones work under a melody.',
    listeningLens: {
        "pulse": {
            "notice": "The pulse is the dance. Jigs bounce in 6/8, reels drive in 4/4. Feel the feet.",
            "demo": "Listen for the lift \u2014 the way the rhythm pulls you forward into the next bar.",
            "try": "Tap a jig rhythm (ONE-two-three, FOUR-five-six). Feel the bounce. Now play a melody over it."
        },
        "hand": {
            "notice": "The drone string rings while the melody dances. Two worlds in one hand.",
            "demo": "Listen for the open D string humming underneath the tune. It is always there.",
            "try": "Play one melody note. Let the open D ring. Hear the drone. That is Celtic guitar."
        },
        "colour": {
            "notice": "DADGAD tuning gives you a open, modal sound \u2014 like a harp, not a guitar.",
            "demo": "Listen for the open, ringing quality. It sounds ancient.",
            "try": "Tune to DADGAD. Strum open strings. Hear the modal colour. This is the Celtic sound."
        },
        "story": {
            "notice": "This music is old \u2014 passed down through dance halls, pubs, and families.",
            "demo": "Listen for the community in the music. It is made for gathering.",
            "try": "Play a simple reel. Imagine a room full of dancers. Make the guitar part of the gathering."
        }
    }
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
    learnFirst: 'Learn the milonga rhythm — it\'s the heartbeat of Argentine guitar. A 3+3+2 pattern that feels like walking on cobblestones.',
    listeningLens: {
        "pulse": {
            "notice": "The milonga rhythm is 3+3+2 \u2014 it stumbles forward like walking on cobblestones.",
            "demo": "Listen for the sharp, syncopated accent pattern. It is dramatic and precise.",
            "try": "Clap the 3+3+2 pattern. Feel the uneven heartbeat. Now play it on muted strings."
        },
        "hand": {
            "notice": "Tango guitar is sharp and percussive \u2014 every chord is a statement.",
            "demo": "Listen for the aggressive attack on the chords. It is not gentle.",
            "try": "Play a chord with a sharp downstroke. Feel the drama. Tango is not background music."
        },
        "colour": {
            "notice": "The harmony is dark and chromatic \u2014 minor keys with passing tones that sting.",
            "demo": "Listen for the chromatic movement. Notes slip by half-steps, creating tension.",
            "try": "Play a minor chord. Move one note down a half-step. Hear the tension. That is tango colour."
        },
        "story": {
            "notice": "Tango was born in the working-class bars of Buenos Aires. It is music of longing and pride.",
            "demo": "Listen for the drama \u2014 the pauses, the crescendos, the silence.",
            "try": "Play one phrase. Stop. Play another. Let the silence do half the work."
        }
    }
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
    learnFirst: 'Pick a simple raga like Bhupali (major pentatonic). Play it slowly with slides — don\'t pick every note, glide to it.',
    listeningLens: {
        "pulse": {
            "notice": "There is no fixed beat. The pulse breathes with the raga. It expands and contracts.",
            "demo": "Listen for the drone \u2014 it is the ground. Everything floats above it.",
            "try": "Play one note and let it ring. Listen to it fade. That patience is the pulse."
        },
        "hand": {
            "notice": "Meend \u2014 the slide \u2014 is everything. Notes are not separate; they glide into each other.",
            "demo": "Watch the finger slide from one note to the next without lifting. It is continuous.",
            "try": "Play one note. Slide to the next without re-picking. Feel the connection."
        },
        "colour": {
            "notice": "Ragas are not scales \u2014 they are moods, times of day, seasons. The colour is emotional.",
            "demo": "Listen for the way the raga unfolds slowly. It is not rushed.",
            "try": "Pick five notes. Play them slowly with slides. Let them breathe. Feel the mood."
        },
        "story": {
            "notice": "Indian classical music is thousands of years old. The guitar is a recent guest.",
            "demo": "Listen for how the guitar imitates the veena \u2014 it tries to be ancient.",
            "try": "Play a drone and a slow melody over it. Feel the meditation. The guitar is learning to be old."
        }
    }
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
    learnFirst: 'Learn the Hirajōshi scale (1-2-♭3-5-♭6). Play 5 notes, then pause. Let the silence speak.',
    listeningLens: {
        "pulse": {
            "notice": "The pulse is sparse. Silence is as important as sound.",
            "demo": "Listen for the space between notes. The music breathes.",
            "try": "Play one note. Wait three seconds. Play another. Feel the silence."
        },
        "hand": {
            "notice": "Each note is placed with care. Nothing is wasted. Precision is beauty.",
            "demo": "Watch for the deliberate, controlled movement. Every note has weight.",
            "try": "Play five notes of Hira joshi. Make each one intentional. No wasted movement."
        },
        "colour": {
            "notice": "Hira joshi is pentatonic but with a distinctly Japanese interval \u2014 it sounds like still water.",
            "demo": "Listen for the open, clean quality. It is minimal and clear.",
            "try": "Play the Hira joshi scale slowly. Notice how each note has space. This is the Japanese colour."
        },
        "story": {
            "notice": "Japanese music values ma \u2014 the space between. The guitar learns restraint.",
            "demo": "Listen for the austerity. Fewer notes, more meaning.",
            "try": "Play a phrase. Stop. Let the silence be part of the music. Less is everything."
        }
    }
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
    learnFirst: 'Learn a basic montuno pattern in C major. The clave rhythm (3-2 or 2-3) IS the foundation — internalise it before you play a note.',
    listeningLens: {
        "pulse": {
            "notice": "The clave is the skeleton. Everything else is built on it. Listen for it first.",
            "demo": "Listen for the 'click-click-click' of the clave. It never changes. Everything else dances around it.",
            "try": "Clap a 3-2 clave pattern. Keep it steady. Feel it lock into your body."
        },
        "hand": {
            "notice": "The tres plays montuno patterns \u2014 short, repeating figures that lock into the clave.",
            "demo": "Listen for the syncopated, repetitive guitar figure. It is hypnotic.",
            "try": "Play a simple montuno in C. Repeat it. Let it become a loop. Feel the groove lock in."
        },
        "colour": {
            "notice": "The harmony is bright and open \u2014 major keys with Mixolydian colour.",
            "demo": "Listen for the warmth and joy in the chords. It is celebratory music.",
            "try": "Play a C major chord. Then a G7. Hear the brightness. That is the Cuban colour."
        },
        "story": {
            "notice": "This is the meeting of Africa and Europe \u2014 rhythm and harmony fused into something new.",
            "demo": "Listen for the African rhythm patterns wrapped in European chords.",
            "try": "Play a montuno over a clave. Feel the cultural fusion. You are holding history."
        }
    }
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
    learnFirst: 'Learn the E minor pentatonic box. Then learn a 16th-note scratch pattern (mute and strum). You now have rock AND funk.',
    listeningLens: {
        "pulse": {
            "notice": "Rock is a backbeat. Funk is a 16th-note grid. Both drive hard.",
            "demo": "Listen for the snare on 2 and 4. That is the rock pulse. Funk fills the space between.",
            "try": "Mute strings. Strum a 16th-note scratch pattern. Feel the grid. Now accent beats 2 and 4."
        },
        "hand": {
            "notice": "Rock is power chords and attitude. Funk is scratch and precision.",
            "demo": "Listen for the difference \u2014 rock hits hard, funk hits sharp.",
            "try": "Play one power chord. Hit it hard. Now play a funk scratch. Feel the difference in your hand."
        },
        "colour": {
            "notice": "Minor pentatonic is the rock colour \u2014 dark, powerful, immediate.",
            "demo": "Listen for the directness. No fancy chords. Just power.",
            "try": "Play the E minor pentatonic box. Bend one note. Feel the attitude. That is rock colour."
        },
        "story": {
            "notice": "This music is rebellion \u2014 loud, electric, and unapologetic.",
            "demo": "Listen for the energy. It is not polite. It demands attention.",
            "try": "Turn it up. Play one riff. Feel the power. Rock is not background music."
        }
    }
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
