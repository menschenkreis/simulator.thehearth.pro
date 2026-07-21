// Knowing Concept Map
// Source-backed keywords from the local knowledge-base summaries.
(function(){
  window.KNOWING_CONCEPTS = {
    'time-signatures': {
      focus: 'Understand meter as the frame for counting, strumming, reading, and ensemble time.',
      plain: 'A time signature tells you how to count the bar before you play it.',
      guitarProof: 'Choose one open chord. Count 4/4, then 3/4, then 6/8 out loud while your strumming hand keeps moving.',
      nextNode: 'Practice',
      check: {
        prompt: 'What does the top number of a time signature tell you?',
        answers: [
          { id: 'beats-per-measure', label: 'How many beats are in each measure', correct: true },
          { id: 'chord-name', label: 'Which chord to play', correct: false }
        ],
        correctFeedback: 'Yes. The top number tells you how many beats are in each measure.',
        incorrectFeedback: 'Not quite. The top number counts the beats in each measure. Read that line once more, then try again.'
      },
      keywords: ['meter', 'bar line', 'measure', 'simple time', 'compound time', 'odd meter', 'counting patterns', 'conducting patterns', 'strong beats', 'weak beats'],
      sources: ['Wolfsohn: rhythm and time signatures', 'Leavitt Modern Method: reading time signatures', 'US Navy Ear Training: simple and compound time']
    },
    'subdivision': {
      focus: 'Turn the beat into a grid so rhythm can be felt, counted, and played precisely.',
      plain: 'Subdivision is the smaller grid inside the beat.',
      guitarProof: 'Set 60 BPM. Play one muted string as quarters, eighths, then sixteenths without changing the pulse.',
      nextNode: 'Do',
      check: {
        prompt: 'What changes when you subdivide a beat?',
        answers: [
          { id: 'smaller-grid', label: 'The beat is divided into smaller equal parts', correct: true },
          { id: 'faster-tempo', label: 'The metronome tempo automatically becomes faster', correct: false }
        ],
        correctFeedback: 'Yes. The pulse stays steady while the inner grid becomes smaller.',
        incorrectFeedback: 'Not quite. Subdivision changes the inner grid, not the metronome tempo.'
      },
      keywords: ['quarter notes', 'eighth notes', 'sixteenth notes', 'triplets', '1 e and a', 'metronome', 'beat grid', 'time feel', 'alternate picking', 'rhythmic density'],
      sources: ['US Navy Ear Training: divided and subdivided beats', 'Ross Bolton Funk Guitar: isolating sixteenths', 'Leavitt Modern Method: eighth-note reading']
    },
    'syncopation': {
      focus: 'Learn how off-beat accents create groove, funk, reggae, bossa, and rhythmic tension.',
      plain: 'Syncopation puts attention on the spaces between the main beats.',
      guitarProof: 'Mute the strings and strum steady eighth notes. Accent only the “and” counts for one minute.',
      nextNode: 'Play',
      check: {
        prompt: 'Where does syncopation often place the accent?',
        answers: [
          { id: 'between-beats', label: 'Between or away from the expected main beats', correct: true },
          { id: 'first-beat-only', label: 'Only on the first beat of every bar', correct: false }
        ],
        correctFeedback: 'Yes. Syncopation gives weight to an unexpected part of the rhythmic grid.',
        incorrectFeedback: 'Not quite. Listen for emphasis between or away from the expected strong beats.'
      },
      keywords: ['off-beat', 'anticipation', 'accent', 'muting', 'scratch rhythm', 'sixteenth-note funk', 'ties', 'rests', 'clave', 'groove pocket'],
      sources: ['Ross Bolton Funk Guitar: scratch or float, forging the funk', 'Paul Donat Bossa Nova: syncopated chord rhythms', 'US Navy Ear Training: syncopation']
    },
    'rhythm-building-blocks': {
      focus: 'Build all rhythms from note values, rests, dots, ties, and repeatable counting habits.',
      plain: 'Rhythm notation is a set of duration symbols: sound lengths and silence lengths.',
      guitarProof: 'On one open chord, play whole notes, half notes, quarter notes, and eighth notes at 70 BPM.',
      nextNode: 'Practice',
      check: {
        prompt: 'What do note values and rests mainly describe?',
        answers: [
          { id: 'duration', label: 'How long sound and silence last', correct: true },
          { id: 'pitch-location', label: 'Which fret contains the note', correct: false }
        ],
        correctFeedback: 'Yes. Rhythm symbols organize duration: when sound happens and when silence happens.',
        incorrectFeedback: 'Not quite. Fret position concerns pitch; note values and rests concern duration.'
      },
      keywords: ['whole note', 'half note', 'quarter note', 'eighth note', 'sixteenth note', 'rests', 'dotted notes', 'ties', 'duration', 'rhythm notation'],
      sources: ['Leavitt Modern Method: reading rhythm', 'US Navy Ear Training: counting systems', 'Teach Yourself Visually Guitar: reading rhythm']
    },

    'triads': {
      focus: 'See every basic chord as root, third, and fifth, then move those shapes across the neck.',
      plain: 'A triad is a three-note chord: root, third, and fifth.',
      guitarProof: 'Play C, then name or find C, E, and G inside the chord shape.',
      nextNode: 'Study',
      check: {
        prompt: 'Which three roles form a basic triad?',
        answers: [
          { id: 'root-third-fifth', label: 'Root, third, and fifth', correct: true },
          { id: 'root-second-seventh', label: 'Root, second, and seventh', correct: false }
        ],
        correctFeedback: 'Yes. Root, third, and fifth are the basic triad structure.',
        incorrectFeedback: 'Not quite. Return to the plain meaning: root, third, and fifth.'
      },
      keywords: ['root', 'third', 'fifth', 'major triad', 'minor triad', 'diminished triad', 'augmented triad', 'inversions', 'diatonic triads', 'CAGED fragments'],
      sources: ['Wolfsohn: triads and diatonic triads', 'Fretboard Roadmaps: chord fragments', 'Peckham: triads over bass notes']
    },
    'seventh-chords': {
      focus: 'Add the seventh to triads and hear how chord quality begins to pull toward resolution.',
      keywords: ['major 7', 'dominant 7', 'minor 7', 'minor 7 flat 5', 'diminished 7', 'guide tones', 'dominant harmony', 'ii V I', 'voice leading'],
      sources: ['Wolfsohn: seventh chords and dominant harmony', 'Peckham Jazz Chord Dictionary: movable 7th shapes', 'Fowler: 19 seventh-chord types']
    },
    'extensions': {
      focus: 'Use 9ths, 11ths, and 13ths as color tones after the 7th-chord foundation is clear.',
      keywords: ['ninths', 'elevenths', 'thirteenths', 'altered dominants', 'shell voicings', 'jazz color', 'chord tensions', 'upper extensions', 'omitted roots'],
      sources: ['Peckham Jazz Chord Dictionary: dom9, min9, min11, dom13', 'Rooksby: advanced harmony', 'Fisher Chord Melody: chord enhancement']
    },
    'chord-voicings': {
      focus: 'Choose chord shapes by sound, string set, register, and voice-leading purpose.',
      keywords: ['movable shapes', 'inversions', 'slash chords', 'drop voicings', 'shell voicings', 'string sets', 'barre chords', 'chord fragments', 'triads over bass notes'],
      sources: ['Peckham Jazz Chord Dictionary: movable forms', 'Facoline Ultimate Chord Chart: alternate voicings', 'Picture Chord Encyclopedia: visual chord forms']
    },
    'chord-progressions': {
      focus: 'Hear progressions as functional movement rather than isolated chord names.',
      keywords: ['I IV V', 'ii V I', '12-bar blues', 'cadence', 'circle progression', 'secondary dominant', 'pivot chord', 'roman numerals', 'backcycling'],
      sources: ['Rooksby: chord sequences and development', 'Wolfsohn: dominant harmony and secondary dominants', 'Fretboard Roadmaps: chord families']
    },

    'pentatonic': {
      focus: 'Use five-note scales as the first practical vocabulary for melody, phrasing, and improvisation.',
      plain: 'The pentatonic scale is a five-note vocabulary that is easy to turn into riffs and phrases.',
      guitarProof: 'Find the A root notes in box 1. Make only the root notes musical before adding nearby scale notes.',
      nextNode: 'Play',
      check: {
        prompt: 'How many different notes make up a pentatonic scale?',
        answers: [
          { id: 'five-notes', label: 'Five', correct: true },
          { id: 'seven-notes', label: 'Seven', correct: false }
        ],
        correctFeedback: 'Yes. Penta means five: five notes form this compact musical vocabulary.',
        incorrectFeedback: 'Not quite. “Penta” points to five notes.'
      },
      keywords: ['minor pentatonic', 'major pentatonic', 'five positions', 'blue note', 'box pattern', 'phrasing', 'bends', 'slides', 'call and response'],
      sources: ['Belkadi: pentatonic scale family', 'Fretboard Roadmaps: movable blues and sliding pentatonics', 'Guitar Building Blocks: pentatonic patterns']
    },
    'major-scale': {
      focus: 'Make the major scale the reference point for keys, chords, intervals, and modes.',
      keywords: ['whole whole half', 'scale degrees', 'diatonic harmony', 'key center', 'major scale pattern', 'CAGED scale forms', 'one-string scale', 'interval formula'],
      sources: ['Wolfsohn: major scale pattern', 'Fretboard Roadmaps: major scale on one string', 'Guitar Building Blocks: major scale patterns']
    },
    'minor-scales': {
      focus: 'Separate natural, harmonic, and melodic minor by sound, function, and chord context.',
      keywords: ['natural minor', 'harmonic minor', 'melodic minor', 'relative minor', 'minor key', 'raised seventh', 'minor ii V I', 'minor modes'],
      sources: ['Wolfsohn: relative minor', 'Belkadi: harmonic and melodic minor modes', 'Fisher Improvisation: minor scales and modes']
    },
    'modes': {
      focus: 'Treat modes as sounds with chord relationships, not just major scale positions.',
      keywords: ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian', 'modal chord mapping', 'modal interchange'],
      sources: ['Nelson Modal Scales: mode-to-chord mapping', 'Belkadi: modes and modal licks', 'Kadmon Guitar Grimoire: modal generation charts']
    },
    'exotic-scales': {
      focus: 'Use uncommon scales when their interval pattern and musical context are understood.',
      keywords: ['whole tone', 'diminished', 'Persian', 'Hungarian minor', 'Hirojoshi', 'Kumoi', 'Pelog', 'Phrygian dominant', 'altered scale', 'symmetrical scales'],
      sources: ['Kadmon Guitar Grimoire: exotic scale families', 'Belkadi: whole tone and diminished concepts', 'Fisher Improvisation: altered and eight-tone scales']
    },

    'scale-chord-mapping': {
      focus: 'Match scale tones to chord tones so improvisation follows the harmony.',
      keywords: ['chord tones', 'available tensions', 'avoid notes', 'scale-to-chord mapping', 'seventh chord qualities', 'tetrachords', 'target notes', 'resolution'],
      sources: ['Fowler: relating scale tones to chords', 'Nelson Modal Scales: mode-to-chord table', 'Aebersold: chord-scale improvisation']
    },
    'tension-release': {
      focus: 'Create interest by moving away from stability and resolving with intention.',
      keywords: ['resolution', 'target tones', 'chromatic approach', 'enclosure', 'altered dominant', 'outside playing', 'motivic development', 'call and response'],
      sources: ['Aebersold: jazz improvisation framework', 'Fisher Improvisation: connecting ideas', 'Satriani Guitar Secrets: chromatic and atonal ideas']
    },
    'tetrachords': {
      focus: 'Build scales from four-note cells so patterns become modular and movable.',
      keywords: ['major tetrachord', 'minor tetrachord', 'Phrygian tetrachord', 'diminished tetrachord', 'scale construction', 'pattern transfer', 'fingerboard patterns'],
      sources: ['Fowler: tetrachord system', 'Guitar Building Blocks: scale patterns', 'Kadmon Guitar Grimoire: scale formulas']
    },
    'ear-training': {
      focus: 'Train the ear to recognize intervals, rhythm, harmony, and melodic motion before naming them.',
      keywords: ['interval recognition', 'triad recognition', 'melodic dictation', 'rhythmic dictation', 'singing', 'hearing changes', 'call and response', 'chromatic melodies'],
      sources: ['US Navy Ear Training Manual: progressive ear training', 'Satriani Guitar Secrets: practical ear training', 'Aebersold: listen first approach']
    },

    'alternate-picking': {
      focus: 'Make down-up motion consistent, small, relaxed, and synchronized with the fretting hand.',
      keywords: ['downstroke', 'upstroke', 'inside picking', 'outside picking', 'metronome', 'pick angle', 'economy of motion', 'string crossing'],
      sources: ['Hoover Right Hand Development: pick movement axioms', 'Stetina Speed Mechanics: alternate picking', 'Guitar Aerobics: Monday alternate picking']
    },
    'economy-picking': {
      focus: 'Use directional picking to cross strings efficiently without losing rhythmic clarity.',
      keywords: ['directional picking', 'sweep through strings', 'string crossing', 'pick economy', 'down-up economy', 'arpeggio connection', 'efficiency'],
      sources: ['Stetina Speed Mechanics: economy and sweep mechanics', 'Hoover Right Hand Development: shorter stroke distance', 'Guitar Aerobics: technique rotation']
    },
    'sweep-picking': {
      focus: 'Coordinate one smooth pick motion with clean fretting-hand separation.',
      keywords: ['sweep stroke', 'arpeggio shapes', 'muting', 'string separation', 'slow practice', 'rake control', 'synchronization'],
      sources: ['Stetina Speed Mechanics: sweep picking', 'Guitar Aerobics: Friday sweep picking', 'Fisher Improvisation: arpeggio patterns']
    },

    'what-is-arpeggio': {
      focus: 'Understand arpeggios as chords played one note at a time.',
      keywords: ['broken chord', 'chord tones', 'root third fifth', 'triad arpeggio', 'melody from harmony', 'outlining changes'],
      sources: ['Phillips and Chappell: arpeggio patterns', 'Fowler: chord-tone improvisation', 'Jorgenson Gypsy Jazz: arpeggio-based soloing']
    },
    'major-arpeggios': {
      focus: 'Connect major and minor chord shapes to movable arpeggio patterns.',
      keywords: ['major arpeggio', 'minor arpeggio', 'inversions', 'sequences', 'CAGED shapes', 'pattern transfer', 'position shifts'],
      sources: ['Phillips and Chappell: major/minor arpeggios', 'Fretboard Roadmaps: chord fragments and arpeggios', 'Fowler: fingerboard patterns']
    },
    'seventh-arpeggios': {
      focus: 'Outline jazz and blues harmony by targeting seventh-chord tones.',
      keywords: ['maj7 arpeggio', 'dominant 7 arpeggio', 'minor 7 arpeggio', 'minor 7 flat 5', 'guide tones', 'superimposition', 'ii V I'],
      sources: ['Fowler: seventh chord patterns', 'Fisher Improvisation: using arpeggios', 'Aebersold: chord tones over changes']
    },

    'pima': {
      focus: 'Name and coordinate the thumb and fingers so fingerstyle can be practiced deliberately.',
      keywords: ['PIMA', 'thumb', 'index', 'middle', 'ring', 'apoyando', 'tirando', 'rest stroke', 'free stroke', 'right-hand position'],
      sources: ['Cary White: fingerings and PIMA', 'Parkening Method: classical right hand', 'Andreas: right-hand attention and sensation']
    },
    'fingerpicking-patterns': {
      focus: 'Turn thumb and fingers into independent layers: bass, harmony, and melody.',
      keywords: ['alternating bass', 'thumb independence', 'Travis picking', 'arpeggio pattern', 'bass and chord split', 'fingerstyle arrangement'],
      sources: ['Cary White: finger picking and strum patterns', 'Paul Donat: thumb bass vs syncopated chords', 'Celtic Guitar Encyclopedia: fingerstyle arrangements']
    },

    'whole-half-steps': {
      focus: 'Use frets as physical evidence for musical distance.',
      plain: 'One fret is a half step. Two frets are a whole step.',
      guitarProof: 'Pick one string and move 0-1-2 frets while saying half step, then whole step.',
      nextNode: 'Foundation',
      check: {
        prompt: 'On one guitar string, how far is a whole step?',
        answers: [
          { id: 'two-frets', label: 'Two frets', correct: true },
          { id: 'one-fret', label: 'One fret', correct: false }
        ],
        correctFeedback: 'Yes. One fret is a half step; two frets make a whole step.',
        incorrectFeedback: 'Not quite. One fret is only a half step, so a whole step needs two frets.'
      },
      keywords: ['half step', 'whole step', 'semitone', 'two-fret distance', 'interval formula', 'chromatic scale', 'fretboard distance'],
      sources: ['Wolfsohn: whole steps and half steps', 'Fretboard Roadmaps: major scale on one string', 'Guitar Building Blocks: notes on the neck']
    },
    'intervals': {
      focus: 'Hear and see the distance between notes as the basis of scales, chords, and melody.',
      keywords: ['minor second', 'major second', 'minor third', 'major third', 'perfect fourth', 'tritone', 'perfect fifth', 'octave', 'interval shapes'],
      sources: ['Wolfsohn: intervals', 'Fowler: interval-based scale tones', 'Fretboard Roadmaps: interval patterns']
    },
    'circle-of-fifths': {
      focus: 'Use the circle to understand keys, chord families, progressions, and modulation.',
      keywords: ['fifths', 'fourths', 'key signatures', 'relative minor', 'circle progression', 'dominant motion', 'diatonic chords'],
      sources: ['Wolfsohn: circle of fifths', 'Fretboard Roadmaps: circle progressions', 'Rooksby: chord sequence development']
    },
    'key-signatures': {
      focus: 'Connect key signatures to the fretboard notes and chords that belong to a key.',
      keywords: ['sharps', 'flats', 'major key', 'minor key', 'diatonic notes', 'accidentals', 'key center', 'chord family'],
      sources: ['Wolfsohn: major scale and key relationships', 'Leavitt Modern Method: standard notation', 'Facoline: diatonic chords in all keys']
    },
    'modulation': {
      focus: 'Change keys smoothly by understanding pivot chords, secondary dominants, and common tones.',
      keywords: ['key change', 'pivot chord', 'common tone', 'secondary dominant', 'chromatic mediant', 'circle motion', 'cadence'],
      sources: ['Wolfsohn: transposition and secondary dominants', 'Rooksby: keys and key changing', 'Fisher Chord Melody: passing chord approaches']
    },

    'notation-basics': {
      focus: 'Read pitch on the staff and connect it to the guitar without relying only on TAB.',
      plain: 'Notation tells you pitch and rhythm; TAB tells you where to put your fingers.',
      guitarProof: 'Read one note name, find it on the guitar, then compare it with the matching TAB position.',
      nextNode: 'Study',
      check: {
        prompt: 'What does TAB show most directly?',
        answers: [
          { id: 'finger-location', label: 'Where to place a finger on the strings and frets', correct: true },
          { id: 'complete-rhythm', label: 'The complete rhythm without any other symbols', correct: false }
        ],
        correctFeedback: 'Yes. TAB is strongest at showing physical string and fret locations.',
        incorrectFeedback: 'Not quite. TAB mainly shows location; rhythm often needs notation or added rhythmic marks.'
      },
      keywords: ['staff', 'treble clef', 'ledger lines', 'note names', 'standard notation', 'first position', 'reading-first', 'duets'],
      sources: ['Leavitt Modern Method: notation-first approach', 'Berklee Phase 1: reading path', 'Teach Yourself Visually: standard notation']
    },
    'rhythm-notation': {
      focus: 'Read duration and counting signs with the same confidence as pitch.',
      keywords: ['note values', 'rests', 'ties', 'dotted rhythms', 'slash notation', 'eighth notes', 'sixteenth notes', 'counting syllables'],
      sources: ['Leavitt Modern Method: rhythmic reading', 'US Navy Ear Training: counting methods', 'Berklee Phase 2: sixteenth-note rhythms']
    },
    'reading-on-guitar': {
      focus: 'Translate written notes to string choices, positions, and musical phrasing.',
      keywords: ['position playing', 'string choice', 'TAB vs notation', 'ledger lines', 'finger numbers', 'position markings', 'sight-reading'],
      sources: ['Leavitt Modern Method: position reading', 'Berklee Phase 2: no-TAB reading', 'Noad Classical Guitar: graded notation repertoire']
    },

    'note-locations': {
      focus: 'Make the fretboard a map instead of a mystery.',
      keywords: ['natural notes', 'octave shapes', 'dot markers', 'string names', 'chromatic notes', 'fretboard geography', 'note memorization'],
      sources: ['Guitar Building Blocks: notes on the neck', 'Fretboard Roadmaps: notes on the fretboard', 'Leavitt Modern Method: note identification']
    },
    'caged-system': {
      focus: 'Use chord forms as landmarks for scales, arpeggios, and chord fragments.',
      keywords: ['CAGED', 'open chord forms', 'barre shapes', 'chord fragments', 'major scales', 'position shifts', 'movable chords'],
      sources: ['Fretboard Roadmaps: chord fragment roadmaps', 'Teach Yourself Visually: barre and chord shapes', 'Guitar Building Blocks: major chords and scale patterns']
    },
    'fretboard-intervals': {
      focus: 'See intervals as reusable shapes that change at the G-to-B string crossing.',
      keywords: ['interval shape', 'string crossing', 'G-B shift', 'octave pattern', 'thirds', 'fourths', 'fifths', 'tritone'],
      sources: ['Fretboard Roadmaps: interval thinking', 'Fowler: pattern transferral', 'Kadmon Guitar Grimoire: instrument intervals']
    },

    'loudness-velocity': {
      focus: 'Control volume and attack from the hand before relying on gear.',
      keywords: ['dynamics', 'attack', 'velocity', 'touch', 'soft playing', 'loud playing', 'tone production', 'right-hand control'],
      sources: ['Jamie Andreas: control of sensation', 'Parkening Method: tone production', 'Satriani Guitar Secrets: expressive articulation']
    },
    'articulation': {
      focus: 'Shape notes with slurs, bends, slides, and separation so lines speak like phrases.',
      keywords: ['hammer-on', 'pull-off', 'slide', 'bend', 'staccato', 'legato', 'grace note', 'fall', 'phrasing'],
      sources: ['Satriani Guitar Secrets: grouped articulations', 'Teach Yourself Visually: advanced techniques', 'Jorgenson Gypsy Jazz: slides and embellishment']
    },
    'vibrato': {
      focus: 'Make sustained notes personal by controlling pitch movement and timing.',
      keywords: ['wide vibrato', 'narrow vibrato', 'bend vibrato', 'classical vibrato', 'sustain', 'intonation', 'expressive pitch'],
      sources: ['Satriani Guitar Secrets: expressive lead techniques', 'Teach Yourself Visually: vibrato and bends', 'Ferguson All Blues Soloing: blues expression']
    },
    'tone-timbre': {
      focus: 'Understand tone as the result of touch, pick position, strings, instrument, and recording choices.',
      keywords: ['timbre', 'pick position', 'flesh and nail', 'pickup selection', 'amp controls', 'nylon string', 'steel string', 'recording tone'],
      sources: ['Paul Donat: nylon-string bossa tone', 'Teach Yourself Visually: electric guitar sounds', 'Buono Recording Guitarist: recorded guitar tone']
    },

    'parts-of-a-song': {
      focus: 'Recognize song sections as functions in a listener journey.',
      keywords: ['verse', 'chorus', 'bridge', 'intro', 'outro', 'pre-chorus', 'hook', 'riff', 'song map'],
      sources: ['Rooksby: song structures', 'Berklee Practice Method: genre forms', 'Guitar Licktionary: style vocabulary']
    },
    'common-forms': {
      focus: 'Use common forms as containers for chord progressions, lyrics, and arrangement choices.',
      keywords: ['AABA', 'verse chorus', '12-bar blues', '32-bar form', 'strophic form', 'repetition', 'contrast', 'development'],
      sources: ['Rooksby: song structures and gallery', 'Ganapes Blues You Can Use: 12-bar blues', 'Aebersold: jazz forms']
    },
    'arrangement': {
      focus: 'Decide what the guitar carries: bass, harmony, melody, rhythm, or texture.',
      keywords: ['solo guitar', 'chord melody', 'bass line', 'countermelody', 'voice leading', 'register', 'texture', 'demo recording'],
      sources: ['Fisher Chord Melody: melody plus harmony', 'Rooksby: arranging and demos', 'Hodel Brazilian Masters: solo guitar arrangements']
    },

    'what-is-voice-leading': {
      focus: 'Move individual notes inside chords smoothly rather than jumping from grip to grip.',
      keywords: ['common tones', 'stepwise motion', 'inner voices', 'guide tones', 'inversions', 'passing chords', 'diads', 'contrary motion'],
      sources: ['Fisher Chord Melody: diads and voice leading', 'Peckham Jazz Chord Dictionary: guide-tone chords', 'Weiser Celtic Guitar: four-part voice leading']
    },
    'guide-tones': {
      focus: 'Use thirds and sevenths as the essential notes that define jazz chord movement.',
      keywords: ['thirds', 'sevenths', 'shell chords', 'ii V I', 'dominant resolution', 'comping', 'minimal voicing', 'voice-leading line'],
      sources: ['Peckham Jazz Chord Dictionary: guide-tone chords', 'Aebersold: chord tones over changes', 'Fowler: seventh chord qualities']
    },

    'flamenco-basics': {
      focus: 'Connect flamenco sound to Phrygian color, right-hand attack, and compas.',
      keywords: ['Phrygian', 'Phrygian dominant', 'rasgueado', 'picado', 'alzapua', 'compas', 'Spanish guitar', 'apoyando'],
      sources: ['Nelson Modal Scales: Phrygian for flamenco', 'Parkening Method: classical right hand', 'Source collection: flamenco basics']
    },
    'bossa-nova': {
      focus: 'Separate thumb bass from syncopated upper-string chords to create the bossa feel.',
      keywords: ['violao', 'thumb bass', 'syncopated chords', 'nylon string', 'Jobim', 'Joao Gilberto', 'samba', 'right-hand independence'],
      sources: ['Paul Donat Bossa Nova: rhythm progression', 'Hodel Brazilian Masters: Jobim and Bonfa arrangements', 'Rooksby: rhythmic song feel']
    },
    'celtic-guitar': {
      focus: 'Adapt Celtic tune types to fingerstyle guitar with drone, melody, and diatonic harmony.',
      keywords: ['jigs', 'reels', 'hornpipes', 'airs', 'DADGAD', 'drone strings', 'ornamentation', 'fingerstyle arrangement'],
      sources: ['Weiser Celtic Guitar Encyclopedia: tune categories', 'Noad Classical Guitar: graded repertoire approach', 'Fretboard Roadmaps: diatonic harmony']
    },

    'how-practice-works': {
      focus: 'Practice is attention plus repetition; what you repeat becomes automatic.',
      keywords: ['muscle memory', 'myelin', 'attention', 'slow practice', 'correct sensation', 'no-tempo practice', 'body awareness'],
      sources: ['Jamie Andreas: correct practice principles', 'Guitar Aerobics: daily repetition', 'Levitin and Patel: music learning neuroscience']
    },
    'spaced-repetition': {
      focus: 'Review ideas before they disappear so memory strengthens over time.',
      keywords: ['forgetting curve', 'review interval', 'retrieval', 'sleep consolidation', 'daily practice', 'long-term memory', 'streaks'],
      sources: ['Learning science summaries', 'Guitar Aerobics: one-lick-per-day system', 'Berklee Practice Method: daily routines']
    },
    'deliberate-practice': {
      focus: 'Work at the edge of ability with a clear target, full attention, and immediate feedback.',
      keywords: ['specific goal', 'metronome', 'feedback', 'comfort-zone edge', 'recording yourself', 'accuracy before speed', 'practice routine'],
      sources: ['Jamie Andreas: tools for correct practice', 'Howard Roberts Super Chops: structured 20-week program', 'Berklee Practice Method: daily practice routines']
    }
  };
})();
