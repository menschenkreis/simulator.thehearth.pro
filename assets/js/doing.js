// Doing Node — Open-World Drill Library (Expanded)
// Sources: Full knowledge base — 42+ books

const DOING = {
  id: 'doing',
  title: 'Doing',
  tag: 'DOING PATH',
  description: 'Open-world drill library. Every technique, every style. Click a dot to dive in.',
  sources: [
    'Troy Nelson — Guitar Aerobics (2007)',
    'Phillips & Chappell — Guitar Exercises For Dummies',
    'William Leavitt — Berklee Phase 2',
    'Ross Bolton — Funk Guitar',
    'Joe Satriani — Guitar Secrets',
    'Troy Stetina — Speed Mechanics',
    'Jamie Andreas — Correct Practice',
    'John Ganapes — Blues You Can Use',
    'John Jorgenson — Gypsy Jazz Guitar',
    'David Hamburger — Slide Basics',
    'Christopher Parkening — Classical Guitar',
    'Glenn Weiser — Celtic Guitar'
  ],

  categories: [
    {
      id: 'picking',
      title: 'Picking',
      icon: '',
      styles: ['rock','blues','jazz','metal','country'],
      drills: [
        { id:'alt-1', title:'Alternate Picking — Single String', difficulty:1, bpm:'60-100', duration:'5 min', source:'Guitar Aerobics (Mon)', style:'rock', body:'<p>Start on low E. Down-up-down-up. Focus on even volume. Small motion — pick moves 2-3mm.</p><p><strong>Exercise:</strong> Open E, 4 cycles per fret. Frets 0-1-2-3-4-5. Reverse. Metronome on.</p>', video:'https://youtu.be/9lQ-haBfswA' },
        { id:'alt-2', title:'Alternate Picking — String Crossing', difficulty:2, bpm:'50-80', duration:'8 min', source:'Guitar Aerobics (Mon)', style:'rock', body:'<p>Cross strings cleanly. Down on E, up on A, down on D. The pick glides, not hops.</p><p><strong>Exercise:</strong> E-A-D-G-B-E, one note per string. Then 3 notes per string ascending.</p>', video:'https://www.youtube.com/watch?v=xeLgtGRfeCU' },
        { id:'alt-3', title:'Alternate Picking — 3 Notes Per String', difficulty:2, bpm:'60-90', duration:'8 min', source:'Guitar Aerobics (Mon)', style:'metal', body:'<p>The metal/rock standard. 3 notes per string creates odd picking patterns at string crossings.</p><p><strong>Exercise:</strong> Major scale, 3NPS pattern. Start at 60 BPM, increase by 5 when clean.</p>', video:'https://www.youtube.com/watch?v=yfNAzvsSZDE' },
        { id:'econ-1', title:'Economy Picking — Introduction', difficulty:2, bpm:'50-80', duration:'8 min', source:'Stetina — Speed Mechanics', style:'jazz', body:'<p>Economy picking = sweep in the direction you\'re going. If ascending, sweep down across strings. Faster than alternate picking for scale runs.</p>', video:'https://www.youtube.com/watch?v=W6qLueNgJMY' },
        { id:'sweep-1', title:'Sweep Picking — 3-String Minor', difficulty:3, bpm:'40-70', duration:'10 min', source:'Guitar Aerobics (Fri)', style:'metal', body:'<p>Not strumming — each note rings individually. 3-string minor arpeggio: pick drags across, each finger lifts before next note.</p>', video:'https://www.youtube.com/watch?v=QE-RGWQ6-C4' },
        { id:'sweep-2', title:'Sweep Picking — 5-String Major', difficulty:3, bpm:'40-60', duration:'12 min', source:'Guitar Aerobics (Fri)', style:'metal', body:'<p>Full 5-string major arpeggio sweep. The advanced version. Requires precise left-hand muting.</p>', video:'https://www.youtube.com/watch?v=xvUCji0fK5I' },
        { id:'flatpick-1', title:'Flatpick Basics — Carter Style', difficulty:1, bpm:'60-80', duration:'5 min', source:'General knowledge', style:'country', body:'<p>The boom-chick pattern. Thumb alternates bass notes, index/middle pick melody on treble strings. The foundation of country and folk flatpicking.</p>', video:'https://youtu.be/tfc-WHDRqAY' },
        { id:'gypsy-1', title:'Rest-Stroke Picking — Gypsy Style', difficulty:2, bpm:'60-90', duration:'10 min', source:'Jorgenson — Gypsy Jazz', style:'flamenco', body:'<p>Pick follows through to rest on adjacent string. Produces a powerful, punchy tone. Non-negotiable for Gypsy Jazz.</p>', video:'https://www.youtube.com/watch?v=YFCRFuRSwcg' },
        { id:'hybrid-1', title:'Hybrid Picking — Intro', difficulty:2, bpm:'60-90', duration:'8 min', source:'General knowledge', style:'country', body:'<p>Hold the pick with thumb+index, use middle and ring fingers to pluck higher strings simultaneously. Country and rockabilly staple.</p><p><strong>Exercise:</strong> Pick low E, simultaneously pluck G and B strings with fingers. Repeat across chord changes.</p>', video:'https://www.youtube.com/watch?v=PhlF6bb1ebI' },
        { id:'crosspick-1', title:'Crosspicking — Bluegrass', difficulty:2, bpm:'60-80', duration:'8 min', source:'General knowledge', style:'country', body:'<p>Roll pattern across 3 strings: D-U-U-D-U-U. Creates a banjo-like roll on guitar. The bluegrass secret weapon.</p>', video:'https://www.youtube.com/watch?v=RXRnsLXovXA' }
      ]
    },
    {
      id: 'fretting',
      title: 'Fretting',
      icon: '',
      styles: ['rock','classical','jazz','blues'],
      drills: [
        { id:'chrom-1', title:'1-2-3-4 Chromatic Exercise', difficulty:1, bpm:'60-120', duration:'5 min', source:'Cary White', style:'rock', body:'<p>Index=1, Middle=2, Ring=3, Pinky=4. All 6 strings, shift up the neck. Fingers stay close to fretboard.</p>', video:'https://youtu.be/XoHuwBqO8OM' },
        { id:'spider-1', title:'Spider Exercise — Cross String', difficulty:2, bpm:'40-80', duration:'8 min', source:'Exercises For Dummies', style:'rock', body:'<p>Isolates each finger. 1-3 on one string, 2-4 on next. Fingers move independently.</p>', video:'https://youtu.be/79BaPH8TVZU' },
        { id:'barre-1', title:'Barre Chord Strength Builder', difficulty:2, bpm:'—', duration:'10 min', source:'Exercises For Dummies', style:'rock', body:'<p>Barre at fret 5. Squeeze 5 sec, release 5 sec × 10. Build endurance without strain. Thumb behind neck, arm pulling back.</p>', video:'https://youtu.be/FrVr6X4krto' },
        { id:'barre-2', title:'Barre Chord Changes — F to Bb', difficulty:2, bpm:'40-60', duration:'8 min', source:'Exercises For Dummies', style:'rock', body:'<p>The hardest barre chord change. F major (1st fret) to Bb major (6th fret). Slow, deliberate. Clean transition before speed.</p>', video:'https://www.youtube.com/watch?v=Fo8sT_lMsA4' },
        { id:'trill-1', title:'Trill Exercise — Hammer/Pull Endurance', difficulty:2, bpm:'—', duration:'5 min', source:'Stetina — Speed Mechanics', style:'metal', body:'<p>Hammer-on/pull-off between two fingers. 60 seconds each pair: 1-2, 1-3, 1-4, 2-3, 2-4, 3-4. Count the reps. Build stamina.</p>', video:'https://www.youtube.com/watch?v=Sg33aPafUwE' },
        { id:'legato-1', title:'Legato — Hammer-ons & Pull-offs', difficulty:2, bpm:'60-100', duration:'8 min', source:'Stetina — Speed Mechanics', style:'rock', body:'<p>Pick fret 5, hammer to 7, pull off. Same volume as picked note. Legato = smooth and connected.</p>', video:'https://www.youtube.com/watch?v=Sg33aPafUwE' },
        { id:'legato-2', title:'Legato — 3-Note-Per-String Runs', difficulty:3, bpm:'50-90', duration:'10 min', source:'Stetina — Speed Mechanics', style:'metal', body:'<p>3NPS legato runs. Pick first note of each string, hammer the other two. The shredder\'s secret.</p>', video:'https://www.youtube.com/watch?v=ZORL0JBBscY' },
        { id:'classical-1', title:'Classical Left Hand — PIMA Position', difficulty:1, bpm:'—', duration:'8 min', source:'Parkening Vol 1', style:'classical', body:'<p>Thumb behind neck (not over), fingers curved, fingertips only. Classical position is the foundation of clean fretting.</p>', video:'https://youtu.be/hY1MQafPBGo' },
        { id:'stretch-1', title:'Finger Stretch — 1-2-4 Spread', difficulty:1, bpm:'60-80', duration:'5 min', source:'Exercises For Dummies', style:'rock', body:'<p>Index on fret 1, middle on fret 2, pinky on fret 4. Skip fret 3 intentionally. Builds pinky reach. Do all strings.</p>', video:'https://youtu.be/BHY7BnrA0U8' },
        { id:'vibrato-1', title:'Vibrato — Bending in Place', difficulty:2, bpm:'—', duration:'5 min', source:'Ganapes — Blues You Can Use', style:'blues', body:'<p>Bend the string slightly and oscillate. The secret is control — slow and wide for blues, fast and narrow for classical. Practice on one note for 2 minutes.</p>', video:'https://www.youtube.com/watch?v=Ou2vtire_Js' }
      ]
    },
    {
      id: 'rhythm',
      title: 'Rhythm',
      icon: '',
      styles: ['funk','rock','blues','latin','reggae'],
      drills: [
        { id:'16th-1', title:'16th Note Subdivision', difficulty:1, bpm:'60-100', duration:'5 min', source:'Berklee Phase 2', style:'rock', body:'<p>Count: 1-e-&-a. Play one note per subdivision. Accent beat 1, then "&"s, then "a"s.</p>', video:'https://www.youtube.com/watch?v=vOsCpE8GRSc' },
        { id:'funk-1', title:'Scratch Muting — Funk Grid', difficulty:1, bpm:'70-110', duration:'8 min', source:'Bolton — Funk Guitar', style:'funk', body:'<p>Left hand lightly across strings. Pick = percussive "chk". 16th-note scratch pattern, accent 1 and & of 2.</p>', video:'https://www.youtube.com/watch?v=D6gFACp61d0' },
        { id:'funk-2', title:'Funk Chord Stabs', difficulty:2, bpm:'80-110', duration:'8 min', source:'Bolton — Funk Guitar', style:'funk', body:'<p>Play E7 on beat 1, scratch the rest. Then add stabs on the "e" and "a". The groove lives in the muting.</p>', video:'https://www.youtube.com/watch?v=o9GYaExDSmo' },
        { id:'shuffle-1', title:'Shuffle Rhythm — Blues Feel', difficulty:1, bpm:'60-90', duration:'5 min', source:'Ganapes — Blues You Can Use', style:'blues', body:'<p>Swung 8th notes. Long-short-long-short. The shuffle is the heartbeat of blues. Play on open A string first, then apply to chords.</p>', video:'https://www.youtube.com/watch?v=ihbRxTDMHpw' },
        { id:'strum-1', title:'Basic Strumming — D DU UDU', difficulty:1, bpm:'60-100', duration:'5 min', source:'General knowledge', style:'rock', body:'<p>The universal strum pattern. Down, Down-Up, Up-Down-Up. Works for thousands of songs. G-C-D-Em loop.</p>', video:'https://www.youtube.com/watch?v=bYCjmRl8IH8' },
        { id:'bossa-1', title:'Bossa Nova Rhythm Pattern', difficulty:2, bpm:'60-90', duration:'8 min', source:'Donat — Bossa Nova', style:'latin', body:'<p>The subtle syncopation. Thumb plays bass on beats 1 and 3, fingers comp the off-beats. Gentle, not aggressive.</p>', video:'https://www.youtube.com/watch?v=YaaVjCL9NHc' },
        { id:'reggae-1', title:'Reggae Skank — Offbeat Muting', difficulty:2, bpm:'70-100', duration:'5 min', source:'General knowledge', style:'reggae', body:'<p>Play chords ONLY on beats 2 and 4. Mute on 1 and 3. The guitar becomes a percussion instrument.</p>', video:'https://www.youtube.com/watch?v=N471Hh1ueGU' },
        { id:'metronome-1', title:'Metronome Displacement', difficulty:2, bpm:'60-80', duration:'8 min', source:'Jamie Andreas', style:'rock', body:'<p>Set metronome to click on beats 2 and 4 only (not 1 and 3). Forces you to internalize the pulse. Advanced: metronome clicks on the "and" of each beat.</p>', video:'https://www.youtube.com/watch?v=cUTxyrGAseE' },
        { id:'triplet-1', title:'Triplet Feel — Blues Shuffle', difficulty:1, bpm:'60-90', duration:'5 min', source:'Ganapes — Blues You Can Use', style:'blues', body:'<p>Play 3 notes in the space of 2. The triplet feel is what makes blues swing. Count: 1-trip-let, 2-trip-let. Accent beat 1.</p>', video:'https://www.youtube.com/watch?v=3gE-f1kEx9c' },
        { id:'poly-1', title:'Polyrhythm Intro — 3 Over 2', difficulty:3, bpm:'50-70', duration:'10 min', source:'General knowledge', style:'jazz', body:'<p>Play 3 evenly spaced notes against 2 beats. Say "not difficult" while playing — the syllables map to the rhythm. Advanced rhythm training.</p>', video:'https://www.youtube.com/watch?v=r_-vVFXpnko' }
      ]
    },
    {
      id: 'scales',
      title: 'Scales',
      icon: '',
      styles: ['rock','blues','jazz','metal','classical','flamenco'],
      drills: [
        { id:'pent-1', title:'Minor Pentatonic — Box 1', difficulty:1, bpm:'60-100', duration:'5 min', source:'Exercises For Dummies', style:'blues', body:'<p>A minor pentatonic at fret 5. The rock/blues staple. Up and down, one note per beat.</p>', video:'https://www.youtube.com/watch?v=sTzFM3AwBDw' },
        { id:'pent-2', title:'Minor Pentatonic — All 5 Boxes', difficulty:2, bpm:'60-80', duration:'12 min', source:'Exercises For Dummies', style:'blues', body:'<p>5 moveable shapes covering the entire neck. Learn all 5 = fretboard freedom in any minor key.</p>', video:'https://www.youtube.com/watch?v=qoMuejKLnVU' },
        { id:'major-1', title:'Major Scale — Position 1', difficulty:1, bpm:'50-80', duration:'5 min', source:'Guitar Aerobics (Tue)', style:'classical', body:'<p>C major at fret 8. The foundation of Western music. Slow, listen to the sound.</p>', video:'https://www.youtube.com/watch?v=MHN2DLbRCHk' },
        { id:'major-2', title:'Major Scale — 3 Notes Per String', difficulty:2, bpm:'50-80', duration:'10 min', source:'Stetina — Speed Mechanics', style:'metal', body:'<p>7 positions, 3 notes each string. The metal/rock scale pattern. Enables fast runs.</p>', video:'https://www.youtube.com/watch?v=spqJT-UoRrk' },
        { id:'modes-1', title:'Modes — Dorian (C to C on white keys)', difficulty:2, bpm:'50-70', duration:'8 min', source:'Belkadi — Advanced Scales', style:'jazz', body:'<p>Play D Dorian = C major starting on D. Hear the minor-with-bright-6th sound. Santana\'s signature.</p>', video:'https://www.youtube.com/watch?v=cFX0H0XujNY' },
        { id:'modes-2', title:'Modes — Mixolydian (G to G on white keys)', difficulty:2, bpm:'50-70', duration:'8 min', source:'Belkadi — Advanced Scales', style:'blues', body:'<p>G Mixolydian = C major starting on G. Bluesy major sound. Beatles, classic rock.</p>', video:'https://www.youtube.com/watch?v=vPIebPDBizs' },
        { id:'harm-min-1', title:'Harmonic Minor Scale', difficulty:2, bpm:'50-70', duration:'8 min', source:'Belkadi — Advanced Scales', style:'flamenco', body:'<p>Minor scale with raised 7th. The exotic, Middle Eastern, flamenco sound. Essential for classical and metal.</p>', video:'https://www.youtube.com/watch?v=jugdDL0Gcns' },
        { id:'phrygian-1', title:'Phrygian Mode — Spanish Sound', difficulty:2, bpm:'50-70', duration:'8 min', source:'Belkadi — Advanced Scales', style:'flamenco', body:'<p>E Phrygian = C major starting on E. The flat 2nd = Spanish/flamenco. Metal uses it heavily too.</p>', video:'https://www.youtube.com/watch?v=Ghb3HttAovE' },
        { id:'blues-scale-1', title:'Blues Scale — Adding the b5', difficulty:1, bpm:'60-90', duration:'5 min', source:'Ganapes — Blues You Can Use', style:'blues', body:'<p>Minor pentatonic + b5 (the "blue note"). Adds the tension that makes blues sound like blues.</p>', video:'https://www.youtube.com/watch?v=dlxmpapllFw' },
        { id:'minor-nat-1', title:'Natural Minor Scale — Full Neck', difficulty:2, bpm:'50-80', duration:'10 min', source:'Exercises For Dummies', style:'rock', body:'<p>The full Aeolian mode across all positions. Darker than pentatonic — every note matters. Connect all 7 positions up the neck.</p>', video:'https://www.youtube.com/watch?v=OZC5zz8E1ME' },
        { id:'pent-3', title:'Major Pentatonic — Country & Pop', difficulty:1, bpm:'60-100', duration:'5 min', source:'Exercises For Dummies', style:'country', body:'<p>The happy cousin of minor pentatonic. Same 2-notes-per-string shapes, different root. Country, pop, and Southern rock staple.</p>', video:'https://www.youtube.com/watch?v=J91x62kNrG4' },
        { id:'whole-tone-1', title:'Whole Tone Scale', difficulty:2, bpm:'50-70', duration:'5 min', source:'Belkadi — Advanced Scales', style:'jazz', body:'<p>All whole steps, no half steps. Dreamy, floating sound. Only 2 unique patterns — symmetric. Debussy in guitar form.</p>', video:'https://www.youtube.com/watch?v=FHa38_bT2Ns' },
        { id:'dim-scale-1', title:'Diminished Scale — Whole-Half', difficulty:3, bpm:'40-60', duration:'10 min', source:'Belkadi — Advanced Scales', style:'jazz', body:'<p>Alternating whole and half steps. The jazz improvisation secret weapon over dominant 7th chords.</p>', video:'https://www.youtube.com/watch?v=pgs8ySdPWi8' }
      ]
    },
    {
      id: 'arpeggios',
      title: 'Arpeggios',
      icon: '',
      styles: ['rock','jazz','classical','metal'],
      drills: [
        { id:'maj-arp', title:'Major Arpeggio — 3 Notes', difficulty:1, bpm:'60-90', duration:'5 min', source:'Guitar Aerobics (Thu)', style:'rock', body:'<p>Root-3rd-5th. C-E-G. Play each note individually, let ring. 2 octaves.</p>', video:'https://www.youtube.com/watch?v=CvyCizUyTmA' },
        { id:'min-arp', title:'Minor Arpeggio — 3 Notes', difficulty:1, bpm:'60-90', duration:'5 min', source:'Guitar Aerobics (Thu)', style:'rock', body:'<p>Root-b3-5th. A-C-E. The sad version. Same shape, different interval.</p>', video:'https://www.youtube.com/watch?v=CvyCizUyTmA' },
        { id:'dom7-arp', title:'Dominant 7th Arpeggio', difficulty:2, bpm:'50-80', duration:'8 min', source:'Exercises For Dummies', style:'blues', body:'<p>Root-3rd-5th-b7th. A-C#-E-G. The blues/funk sound. Tension wants to resolve.</p>', video:'https://www.youtube.com/watch?v=nVWHB-AnboU' },
        { id:'maj7-arp', title:'Major 7th Arpeggio', difficulty:2, bpm:'50-80', duration:'8 min', source:'Exercises For Dummies', style:'jazz', body:'<p>Root-3rd-5th-7th. C-E-G-B. Dreamy, jazzy. The "elevator music" arpeggio.</p>', video:'https://www.youtube.com/watch?v=tI4qMOp9qGw' },
        { id:'dim-arp', title:'Diminished 7th Arpeggio', difficulty:3, bpm:'40-60', duration:'8 min', source:'Fowler — Patterns', style:'jazz', body:'<p>Root-b3-b5-bb7. Symmetrical — same shape every 3 frets. Can resolve to 4 different keys.</p>', video:'https://www.youtube.com/watch?v=eVAzNDl8Ezo' },
        { id:'sweep-arp', title:'Sweep Arpeggio — Major (5 strings)', difficulty:3, bpm:'40-60', duration:'10 min', source:'Stetina — Speed Mechanics', style:'metal', body:'<p>Full sweep across 5 strings. Pick drags down then up. Each note rings individually.</p>', video:'https://www.youtube.com/watch?v=CvyCizUyTmA' },
        { id:'classical-arp', title:'Classical Arpeggio Patterns — PIMA', difficulty:2, bpm:'60-80', duration:'8 min', source:'Parkening Vol 1', style:'classical', body:'<p>Right hand arpeggio patterns: P-I-M-A, P-I-M-A-M-I. The classical guitar tone engine.</p>', video:'https://www.youtube.com/watch?v=ARlXZUtjASk' }
      ]
    },
    {
      id: 'speed',
      title: 'Speed Mechanics',
      icon: '',
      styles: ['metal','rock','jazz'],
      drills: [
        { id:'trem-1', title:'Tremolo Picking — Single Note', difficulty:2, bpm:'100-200', duration:'5 min', source:'Stetina — Speed Mechanics', style:'metal', body:'<p>Pick one note as fast as you can, evenly. Start slow, increase. The foundation of speed.</p>', video:'https://www.youtube.com/watch?v=tstKnV42GJk' },
        { id:'seq-1', title:'Scale Sequences — Groups of 4', difficulty:2, bpm:'50-80', duration:'8 min', source:'Exercises For Dummies', style:'rock', body:'<p>1-2-3-4, 2-3-4-5, 3-4-5-6. Running effect used in rock and metal solos.</p>', video:'https://www.youtube.com/watch?v=zx1HltZP-GA' },
        { id:'skip-1', title:'String Skipping — Pentatonic', difficulty:3, bpm:'40-70', duration:'10 min', source:'Guitar Aerobics (Tue)', style:'rock', body:'<p>Play pentatonic notes but skip strings. Creates wide interval leaps. Sounds more interesting than linear runs.</p>', video:'https://www.youtube.com/watch?v=xkgHI4cvoOs' },
        { id:'tap-1', title:'Tapping — Introduction', difficulty:3, bpm:'50-80', duration:'10 min', source:'Satriani — Guitar Secrets', style:'rock', body:'<p>Right hand taps high notes, pull-off chain. Pick→tap→pull-off→pull-off. Three notes, one pick stroke.</p>', video:'https://www.youtube.com/watch?v=jky6QP_48R0' },
        { id:'tap-2', title:'Tapping — Arpeggio Patterns', difficulty:3, bpm:'40-70', duration:'12 min', source:'Satriani — Guitar Secrets', style:'metal', body:'<p>Tapped arpeggios across strings. Eddie Van Halen\'s signature. Tap the 5th, pull to root, pull to 3rd.</p>', video:'https://www.youtube.com/watch?v=oO4rMkM5DD0' },
        { id:'speed-ramp', title:'Speed Ramp — Progressive BPM', difficulty:2, bpm:'60-140', duration:'10 min', source:'Guitar Aerobics', style:'metal', body:'<p>Start a pattern at 60 BPM. Play it clean 3 times. Bump to 65. Repeat. Find your ceiling. That\'s your current max. Practice 10 BPM below it.</p>', video:'https://www.youtube.com/watch?v=w27TRX00woo' },
        { id:'burst-1', title:'Speed Bursts — 4-Note Groupings', difficulty:2, bpm:'80-120', duration:'8 min', source:'Stetina — Speed Mechanics', style:'rock', body:'<p>Play 4 notes fast, then pause. Then 4 more fast, pause. Build speed in bursts rather than sustained runs. The key to breaking speed plateaus.</p>', video:'https://www.youtube.com/watch?v=b0wrCt94SIc' },
        { id:'pos-shift-1', title:'Position Shifting — Smooth Transitions', difficulty:2, bpm:'60-80', duration:'8 min', source:'Leavitt — Berklee Phase 2', style:'jazz', body:'<p>Slide from position 1 to position 5 in one smooth motion. No gaps, no hesitation. The fretboard is one connected instrument, not 7 boxes.</p>', video:'https://www.youtube.com/watch?v=u0hR8tI7YiE' }
      ]
    },
    {
      id: 'styles',
      title: 'Style Techniques',
      icon: '',
      styles: ['flamenco','classical','slide','brazilian','gypsy','celtic'],
      drills: [
        { id:'rasg-1', title:'Rasgueado — Flamenco Strum', difficulty:2, bpm:'60-90', duration:'8 min', source:'General knowledge', style:'flamenco', body:'<p>Fingers fire outward in rapid succession: pinky-ring-middle-index. Creates a explosive, percussive strum. The flamenco signature.</p>', video:'https://www.youtube.com/watch?v=xUhvqV1qY5g' },
        { id:'golpe-1', title:'Golpe — Percussive Tap', difficulty:2, bpm:'60-80', duration:'5 min', source:'General knowledge', style:'flamenco', body:'<p>Strike the guitar top with ring finger while playing. Adds percussion to the guitar. Essential flamenco technique.</p>', video:'https://www.youtube.com/watch?v=enfHpKtJolI' },
        { id:'alzap-1', title:'Alzapua — Thumb Technique', difficulty:3, bpm:'50-80', duration:'8 min', source:'General knowledge', style:'flamenco', body:'<p>Thumb plays rapid single-note runs using the flesh and nail. Powerful, driving sound. Advanced flamenco.</p>', video:'https://www.youtube.com/watch?v=JGWKmjDGwfk' },
        { id:'slide-1', title:'Slide Guitar — Open D Basics', difficulty:2, bpm:'—', duration:'8 min', source:'Hamburger — Slide Basics', style:'slide', body:'<p>Tune to Open D (D-A-D-F#-A-D). Place slide on ring finger. Light touch, right over the fret. Let it sing.</p>', video:'https://www.youtube.com/watch?v=JlBAMB2gEQ0' },
        { id:'slide-2', title:'Slide Guitar — Standard Tuning', difficulty:2, bpm:'—', duration:'8 min', source:'Hamburger — Slide Basics', style:'slide', body:'<p>Slide in standard tuning. Target chord tones. Mute behind the slide with index finger.</p>', video:'https://www.youtube.com/watch?v=hfGT4BCPPFM' },
        { id:'pima-1', title:'Classical Right Hand — PIMA Patterns', difficulty:1, bpm:'60-80', duration:'5 min', source:'Parkening Vol 1', style:'classical', body:'<p>P=thumb, I=index, M=middle, A=ring. Basic arpeggio: P-I-M-A-M-I. Classical guitar tone starts here.</p>', video:'https://www.youtube.com/watch?v=tExiOjqg0ec' },
        { id:'pima-2', title:'Classical — Rest Stroke vs Free Stroke', difficulty:1, bpm:'—', duration:'5 min', source:'Parkening Vol 1', style:'classical', body:'<p>Rest stroke: finger follows through to rest on next string. Loud, full tone. Free stroke: finger clears the string. Lighter, for arpeggios.</p>', video:'https://www.youtube.com/watch?v=IUajqAFldqE' },
        { id:'gypsy-pick', title:'Gypsy Jazz — La Pompe Rhythm', difficulty:2, bpm:'80-140', duration:'8 min', source:'Jorgenson — Gypsy Jazz', style:'gypsy', body:'<p>Percussive swing rhythm. Down-up with a flick. Accents on 2 and 4. The heartbeat of Gypsy Jazz.</p>', video:'https://www.youtube.com/watch?v=SIivOdEojv0' },
        { id:'celtic-1', title:'Celtic Fingerstyle — DADGAD Tuning', difficulty:2, bpm:'60-80', duration:'8 min', source:'Weiser — Celtic Guitar', style:'celtic', body:'<p>DADGAD tuning creates open, droning sound. Celtic music lives in the drone. Play melody over open strings.</p>', video:'https://www.youtube.com/watch?v=fQ0VeScpWhc' }
      ]
    }
  ]
};

window.DOING = DOING;
