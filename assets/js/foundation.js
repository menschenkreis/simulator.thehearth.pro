// Foundation Node — Content Module
// Spine: Jamie Andreas (how to practise) + Patrick Stefurak (what to learn first) + Fred Sokolow (fretboard)

const FOUNDATION = {
  id: 'foundation',
  title: 'Foundation',
  tag: 'LEVEL 1',
  description: 'The beginning. Before you play a single note, you need to understand the instrument, your body, and how learning itself works.',
  sources: [
    'Jamie Andreas — Principles of Correct Practice for Guitar (©1999)',
    'Patrick Stefurak — Guitar Building Blocks (©1996)',
    'Fred Sokolow — Fretboard Roadmaps (Hal Leonard)',
    'Charles Kim — Teach Yourself VISUALLY Guitar (©2006)'
  ],

  topics: [
    {
      id: 'f-how-to-learn',
      num: '01',
      title: 'How to Learn',
      subtitle: 'Before you touch the guitar, learn how learning works',
      status: 'open',
      sources: ['Jamie Andreas'],
      tags: ['Mindset', 'Practice', 'Core'],
      steps: [
        {
          label: 'Read',
          title: 'Your Most Important Tool: Attention',
          body: `<p>Technique is not physical. It's <em>mental</em>.</p>
<p>Before your fingers can do anything, your mind must direct them with absolute clarity. Jamie Andreas calls this <strong>controlling attention to produce specific sensations</strong>.</p>
<p>Most guitarists fail not because they lack talent, but because they practise without attention. They play while watching TV, while thinking about something else, while rushing through exercises. Their fingers move, but nothing is being learned.</p>
<div class="lp-callout">
  <div class="lp-co-title">THE PRINCIPLE</div>
  <p>Muscle memory works both ways. Practise with full attention and your body learns correctly. Practise without attention and your body learns wrong — and wrong muscle memory is <em>harder to undo</em> than learning from scratch.</p>
</div>
<p>The three practice tools you'll use throughout The Hearth:</p>
<p><strong>No Tempo Practice</strong> — Remove the pressure of time. Play so slowly that you can feel every sensation in every finger. Speed comes later, as a byproduct of accuracy.</p>
<p><strong>Posing</strong> — Freeze at any point in a movement. Hold the position. Feel what your hand is doing. Is there tension? Release it. This is how you build awareness.</p>
<p><strong>Rotating Attention</strong> — Shift your focus between body parts. Thumb. Wrist. Shoulder. Fingers. Notice tension you didn't know you were holding.</p>`
        },
        {
          label: 'Feel',
          title: 'The Sensation Map',
          body: `<p>Close your eyes. Pick up the guitar (or hold your hands as if you were holding one).</p>
<p>Now notice:</p>
<p>• Your right shoulder — is it raised? Let it drop.<br>
• Your right wrist — is it locked or curved?<br>
• Your left thumb — is it squeezing the neck?<br>
• Your jaw — are you clenching?</p>
<p>This is <strong>sympathetic tension</strong>. When one part of your body works hard, nearby parts tense up without you realising. The hand squeezes harder. The shoulder climbs. The jaw locks.</p>
<div class="lp-callout">
  <div class="lp-co-title">THE GRADUAL PRESSURE TECHNIQUE</div>
  <p>Instead of pressing a string down hard, bring your finger to the string and apply pressure <em>slowly</em>. Notice the exact moment the note rings clean. That's all the pressure you need — no more. Any extra is wasted energy that creates tension.</p>
</div>
<div class="lp-quote">
  "There are no mistakes, only unwanted results. Every result is information."
  <span class="lp-q-src">— Jamie Andreas, Principles of Correct Practice</span>
</div>`
        },
        {
          label: 'Draw',
          title: 'Map Your Tension',
          body: `<p>On paper or in your head, draw a simple outline of a person holding a guitar.</p>
<p>Mark every place where you feel tension when you hold the instrument:</p>
<p>• Neck and shoulders<br>
• Upper arms<br>
• Forearms<br>
• Wrists<br>
• Fingers (each one)<br>
• Jaw<br>
• Lower back<br>
• Legs</p>
<p>Now pick up the guitar and check each spot. Were you right? Did you miss places?</p>
<div class="lp-callout">
  <div class="lp-co-title">WHY THIS MATTERS</div>
  <p>This is your tension map. You'll return to it throughout your journey. As your technique improves, this map will show fewer and fewer hot spots. The map is your proof of progress — more honest than how fast you can play.</p>
</div>`
        },
        {
          label: 'Do',
          title: 'The 2-Minute Body Scan',
          body: `<p>Set a timer for 2 minutes. Hold the guitar in playing position. Don't play anything.</p>
<p>Instead, scan your body from head to toe:</p>
<p>1. Jaw — release it. Let your mouth hang slightly open.<br>
2. Neck — roll it gently. Feel the release.<br>
3. Shoulders — drop them. Let gravity do the work.<br>
4. Upper arms — are they floating or clenched?<br>
5. Forearms — the muscles that move your fingers live here. Soft?<br>
6. Wrists — they should have a natural curve, not be flat or bent extreme.<br>
7. Hands — the "cup" shape. Fingers curved, not flat.<br>
8. Fingers — each one. Especially the pinky. What's it doing?<br>
9. Belly — breathing shallow? Breathe deep.<br>
10. Legs — uncrossed, feet flat.</p>
<p>Do this before every practice session. It takes 2 minutes. It saves months of undoing bad habits.</p>`
        },
        {
          label: 'Check',
          title: 'Can You Feel It?',
          body: `<p>Before moving on, you should be able to answer YES to these:</p>
<p>☐ I understand that muscle memory can work against me<br>
☐ I can identify at least 3 tension spots in my body when holding the guitar<br>
☐ I know what "No Tempo Practice" means and why it matters<br>
☐ I understand the Gradual Pressure Technique<br>
☐ I can do a 2-minute body scan without playing a single note</p>
<div class="lp-callout">
  <div class="lp-co-title">THE GRADIENT CHECK</div>
  <p>If any of these feel fuzzy, don't move on. Re-read, re-feel, re-scan. This is the foundation of the foundation. Everything else builds on this. There is no shame in going slow here — there IS shame in rushing past it.</p>
</div>`
        },
        {
          label: 'Deeper',
          title: 'Why This Works',
          body: `<p>This approach comes from three converging traditions:</p>
<p><strong>Jamie Andreas</strong> adapted classical guitar awareness principles for all guitarists. Her insight: the right hand is where sound is created, and the left hand is where notes are chosen. Both require independent, tension-free movement.</p>
<p><strong>Hubbard's Study Technology</strong> identifies three barriers to learning. The first — <em>absence of mass</em> — means you cannot learn a physical skill without physical awareness. If you can't FEEL it, you can't do it. The body scan IS the mass.</p>
<p><strong>The Lytton/Pincus principle</strong> of scaffolded comprehension: master each layer before building the next. Don't add notes until the body is ready. Don't add speed until accuracy is effortless.</p>
<div class="lp-quote">
  "If the guitarist wants to create his own style, this book is the answer."
  <span class="lp-q-src">— William L. Fowler, Guitar Patterns for Improvisation</span>
</div>
<p>Your style begins here — not in what you play, but in HOW you practise.</p>`
        }
      ]
    },

    {
      id: 'f-anatomy',
      num: '02',
      title: 'Anatomy of the Guitar',
      subtitle: 'Know your instrument before you play it',
      status: 'open',
      sources: ['Charles Kim', 'Patrick Stefurak'],
      tags: ['Instrument', 'Visual', 'Basics'],
      steps: [
        {
          label: 'Read',
          title: 'Your Instrument Has a Name',
          body: `<p>Every part of the guitar has a name, and every name has a reason. Knowing these isn't trivia — it's how you'll communicate with other musicians, follow lessons, and understand repairs.</p>
<p>The guitar has three main sections:</p>
<p><strong>Headstock</strong> — the top, where the tuning pegs live. This is where pitch is controlled. Each peg corresponds to one string. Turn clockwise to raise pitch, counter-clockwise to lower it.</p>
<p><strong>Neck</strong> — the long piece connecting headstock to body. The front is the <em>fretboard</em> (or fingerboard). The metal strips across it are <em>frets</em>. The spaces between frets are where you press to create different notes.</p>
<p><strong>Body</strong> — the large section that amplifies sound. On acoustic guitars, the hollow body resonates. On electric guitars, <em>pickups</em> convert string vibrations into electrical signals.</p>
<p>Other key parts: the <em>bridge</em> (where strings anchor to the body), the <em>nut</em> (where strings rest at the headstock end), and the <em>sound hole</em> (acoustic) or <em>pickups</em> (electric).</p>`
        },
        {
          label: 'See',
          title: 'Visual Anatomy Map',
          body: `<p>Look at your guitar. Touch each part as you name it:</p>
<p>Headstock → Tuning pegs → Nut → Fretboard → Frets → Neck (back) → Heel (where neck meets body) → Body top → Sound hole / Pickups → Bridge → Saddle → End pin</p>
<p>Now trace the path of a string from end to end: tuning peg → nut → fretboard → bridge → end pin. That's the full length of the vibrating string.</p>
<div class="lp-callout">
  <div class="lp-co-title">THE CLAY DEMO PRINCIPLE</div>
  <p>If you can't point to it and name it, you don't know it. Touch every part. Say every name. This is building the physical reality (mass) before you add the abstraction of playing.</p>
</div>`
        },
        {
          label: 'Draw',
          title: 'Draw Your Guitar',
          body: `<p>On paper, draw your guitar from memory. Label every part you can remember.</p>
<p>Don't worry about making it pretty. This is about recall, not art. When you can't remember a part, go look at the guitar, then come back and add it.</p>
<p>This exercise reveals what you actually know vs. what you think you know.</p>`
        },
        {
          label: 'Do',
          title: 'String Names & Numbers',
          body: `<p>The guitar has 6 strings, numbered 1 (thinnest, closest to the floor) to 6 (thickest, closest to your chin).</p>
<p>From 6th to 1st, the standard tuning notes are:</p>
<p><strong>E — A — D — G — B — E</strong></p>
<p>Mnemonic: <em>Eddie Ate Dynamite, Good Bye Eddie</em></p>
<p>Pluck each string. Listen to it. Say its name out loud. Do this until you can name them in order without thinking.</p>
<div class="lp-callout">
  <div class="lp-co-title">STRING FACT</div>
  <p>The 2nd string (B) is the odd one out. Every other pair of adjacent strings is tuned in perfect fourths. B to high E is a major third. This one exception is why the fretboard looks the way it does — and why Fred Sokolow's roadmaps work.</p>
</div>`
        },
        {
          label: 'Check',
          title: 'Know Your Instrument',
          body: `<p>☐ I can name all major parts of the guitar<br>
☐ I know which way to turn tuning pegs to raise/lower pitch<br>
☐ I can name all 6 strings in order (6th to 1st)<br>
☐ I can explain why the B string is special<br>
☐ I can draw and label a guitar from memory</p>`
        },
        {
          label: 'Deeper',
          title: 'Types of Guitar',
          body: `<p>Three main families you'll encounter:</p>
<p><strong>Classical / Nylon-string</strong> — warm, soft tone. The voice of bossa nova, flamenco, and classical. Fingers only (no pick). Wider neck. This is what Brazilian guitar sounds like.</p>
<p><strong>Acoustic / Steel-string</strong> — bright, loud tone. The voice of folk, country, singer-songwriter. Can be played with pick or fingers. Narrower neck than classical.</p>
<p><strong>Electric</strong> — versatile, sustained tone. The voice of rock, jazz, blues, funk. Thinner neck, lighter strings. Requires an amplifier. Can produce an enormous range of sounds through controls and effects.</p>
<p>Which one should you learn on? Any of them. The fundamentals are the same across all three.</p>`
        }
      ]
    },

    {
      id: 'f-posture',
      num: '03',
      title: 'How to Hold the Guitar',
      subtitle: 'Your body is the instrument. The guitar is the voice.',
      status: 'open',
      sources: ['Jamie Andreas', 'Charles Kim'],
      tags: ['Posture', 'Body', 'Essential'],
      steps: [
        {
          label: 'Read',
          title: 'Position Is Everything',
          body: `<p>Before you play a note, your body must be in the right relationship with the guitar. Bad posture = tension = bad technique = slow progress = frustration.</p>
<p>The good news: correct posture feels natural once you find it. The bad news: most self-taught guitarists never find it.</p>
<p><strong>Sitting</strong> — Sit on the front edge of your chair. Feet flat. Guitar rests on your right thigh (if right-handed). The neck angles slightly upward — not parallel to the floor, not pointing at the ceiling. The curve of the guitar body rests against your chest.</p>
<p><strong>The right arm</strong> rests lightly over the top of the guitar body. It provides stability, but does NOT grip or squeeze. The arm's weight holds the guitar in place.</p>
<p><strong>The left hand</strong> cradles the neck. Thumb behind the neck (not over the top). Fingers curved, ready to press. The wrist is relatively straight — not bent sharply.</p>
<div class="lp-quote">
  "The most common difficulties I have seen in beginning guitar students are not adhering to a disciplined practice schedule and failure to learn the notes on the neck."
  <span class="lp-q-src">— Patrick Stefurak, Guitar Building Blocks</span>
</div>`
        },
        {
          label: 'See',
          title: 'The Chair and Pillow Exercise',
          body: `<p>This exercise comes directly from Jamie Andreas:</p>
<p><strong>Step 1:</strong> Sit in a chair without the guitar. Place a pillow on your right thigh. Rest your right arm over the pillow as if it were the guitar body. Notice how your arm falls naturally.</p>
<p><strong>Step 2:</strong> Now pick up the guitar. Replicate that same arm position. The guitar should feel like the pillow — supported by your thigh and arm, not clamped or gripped.</p>
<p><strong>Step 3:</strong> Check your left hand. Make a "C" shape with your thumb behind the neck. Your fingers should curve naturally over the fretboard, tips pointing down. No flat fingers. No squeezing.</p>
<div class="lp-callout">
  <div class="lp-co-title">THE CUP</div>
  <p>The basic right-hand position is called "The Cup." Imagine holding a small ball in your palm. Fingers curved, thumb relaxed. This shape gives you maximum control with minimum tension.</p>
</div>`
        },
        {
          label: 'Do',
          title: 'Find Your Position',
          body: `<p>1. Sit on the front edge of a chair. Feet flat on the floor.<br>
2. Place the guitar on your right thigh.<br>
3. Let the guitar lean back slightly against your chest.<br>
4. Drape your right arm over the body. Let gravity hold it.<br>
5. Bring your left hand to the neck. Thumb behind it.<br>
6. Make the "C" shape with your left hand around the neck.<br>
7. Close your eyes. Scan for tension (you learned this in 01).<br>
8. Adjust until everything feels like it could stay here for an hour.</p>
<p>Now do the 2-minute body scan in playing position. Note any tension. Adjust. Scan again.</p>`
        },
        {
          label: 'Check',
          title: 'Position Check',
          body: `<p>☐ My right arm rests on the guitar without gripping<br>
☐ My left thumb is behind the neck, not over the top<br>
☐ My left wrist is relatively straight<br>
☐ My left fingers are curved, not flat<br>
☐ My shoulders are down, not raised<br>
☐ I can breathe easily in this position<br>
☐ I could hold this position for 30 minutes without discomfort</p>`
        },
        {
          label: 'Deeper',
          title: 'Standing vs. Sitting',
          body: `<p>Standing changes everything. The guitar hangs from a strap at a different height. The angle of your arms changes. Your weight distribution changes.</p>
<p><strong>For now, practise sitting.</strong> Standing comes later — after your hands know where they are. When you do stand, set the strap so the guitar is at roughly the same height as when you sit. This minimises re-learning.</p>
<p>Classical guitarists use a footstool under the left foot to raise the guitar to proper playing height. This is why classical posture looks so "formal" — it's ergonomics, not tradition.</p>`
        }
      ]
    },

    {
      id: 'f-tuning',
      num: '04',
      title: 'Tuning',
      subtitle: 'If it\'s not in tune, nothing else matters',
      status: 'open',
      sources: ['Charles Kim'],
      tags: ['Tuning', 'Ear', 'Essential'],
      steps: [
        {
          label: 'Read',
          title: 'Standard Tuning: EADGBE',
          body: `<p>Before you play, you must tune. Every time. An out-of-tune guitar teaches your ears the wrong sounds.</p>
<p>Standard tuning from low to high: <strong>E A D G B E</strong></p>
<p>The 6th string (low E) is your reference point. Everything builds from there.</p>
<p><strong>Electronic tuner</strong> — The easiest method for beginners. Clip-on tuners work by vibration, so they work in noisy rooms. Phone apps work too (GuitarTuna, etc.).</p>
<p><strong>Relative tuning</strong> — Once one string is in tune, you can tune the others to it using the 5th-fret method (except G→B, which uses the 4th fret). We'll learn this after your ears are ready.</p>`
        },
        {
          label: 'Do',
          title: 'Tune Your Guitar',
          body: `<p>1. Use an electronic tuner or phone app<br>
2. Pluck the 6th string (low E) open<br>
3. Adjust the tuning peg until the tuner shows E in tune<br>
4. Repeat for A, D, G, B, and high E<br>
5. Go back and check the 6th string again — it may have drifted<br>
6. Check all strings one more time</p>
<p>Tuning changes as strings settle. New strings go out of tune frequently. Older strings hold tune better but sound duller.</p>
<div class="lp-callout">
  <div class="lp-co-title">DAILY HABIT</div>
  <p>Tune your guitar at the start of every session. This 60-second ritual does two things: ensures correct pitch AND signals to your brain that practice is beginning.</p>
</div>`
        },
        {
          label: 'Check',
          title: 'Tuning Check',
          body: `<p>☐ I can tune all 6 strings using an electronic tuner<br>
☐ I know the string names in order<br>
☐ I understand why tuning before every session matters<br>
☐ I know that the 5th fret method uses 4th fret for G→B only</p>`
        }
      ]
    },

    {
      id: 'f-first-sound',
      num: '05',
      title: 'Your First Sound',
      subtitle: 'One clean note. That\'s the goal.',
      status: 'open',
      sources: ['Jamie Andreas', 'Patrick Stefurak'],
      tags: ['Technique', 'First', 'Essential'],
      steps: [
        {
          label: 'Read',
          title: 'The Rest Stroke',
          body: `<p>You're going to play one note. Just one. But you're going to play it perfectly.</p>
<p>The <strong>rest stroke</strong> (apoyando) is the foundation of all guitar tone:</p>
<p>1. Place your right-hand thumb on the 6th string (low E)<br>
2. Press the string down toward the guitar body<br>
3. Follow through until your thumb comes to rest on the 5th string<br>
4. The note should ring clear and full</p>
<p>That's it. One note. One clean, full, ringing note.</p>
<div class="lp-callout">
  <div class="lp-co-title">THE COMPLETE STROKE</div>
  <p>A note has three phases: <em>attack</em> (the moment of contact), <em>sustain</em> (the note ringing), and <em>release</em> (when it fades). Most beginners focus only on attack. Listen to the sustain. That's where the music lives.</p>
</div>`
        },
        {
          label: 'Do',
          title: 'Play One Note',
          body: `<p>Using the rest stroke with your thumb, play the open 6th string 10 times. Each time:</p>
<p>1. Prepare your thumb on the string<br>
2. Apply gradual pressure (remember the technique from 01?)<br>
3. Follow through to the 5th string<br>
4. Listen to the note ring until it fades<br>
5. Return to the starting position<br>
6. Pause. Breathe. Repeat.</p>
<p>Speed: one note every 3 seconds. This is No Tempo Practice. There is no rush.</p>
<p>Each note should sound identical. Same volume, same tone, same duration. If one sounds different, ask yourself why.</p>`
        },
        {
          label: 'Check',
          title: 'First Sound Check',
          body: `<p>☐ I can produce one clean, full note with the rest stroke<br>
☐ I understand attack, sustain, and release<br>
☐ I can play 10 notes that sound identical<br>
☐ I am applying gradual pressure, not forcing<br>
☐ I am listening to the full sustain of each note</p>`
        }
      ]
    },

    {
      id: 'f-notes-neck',
      num: '06',
      title: 'Notes on the Neck',
      subtitle: 'Learn the geography. Everything else is navigation.',
      status: 'open',
      sources: ['Patrick Stefurak', 'Fred Sokolow'],
      tags: ['Fretboard', 'Notes', 'Foundation'],
      steps: [
        {
          label: 'Read',
          title: 'The Musical Alphabet',
          body: `<p>Music uses 12 notes. Their names: A A# B C C# D D# E F F# G G# — then back to A.</p>
<p>On guitar, each fret is one step in this sequence. Play the 6th string open = E. First fret = F. Second fret = F#. Third fret = G. And so on.</p>
<p>The natural notes (no sharps or flats) are: <strong>A B C D E F G</strong></p>
<p>Notice: B to C and E to F have no sharp between them. These are the "half steps" in the natural scale.</p>
<div class="lp-callout">
  <div class="lp-co-title">STEFURAK'S ADVICE</div>
  <p>"Start with the notes on the neck! Learn the location of A, B, C, D, E, F, and G everywhere on the guitar fretboard. If you learn how to practice, and memorize the notes on the neck, you will have received the most valuable tools."</p>
</div>
<div class="lp-quote">
  "The most common difficulties I have seen in beginning guitar students are failure to learn the notes on the neck."
  <span class="lp-q-src">— Patrick Stefurak, Guitar Building Blocks</span>
</div>`
        },
        {
          label: 'Do',
          title: 'Find Every E',
          body: `<p>Your first fretboard exercise: find every E on the guitar.</p>
<p>Start with the 6th string open (that's E). Now move up fret by fret: F, F#, G, G#, A... until you find the next E. It's at the 12th fret — the double-dot marker.</p>
<p>Now do the same on the 5th string. Open = A. Find E. (It's at the 7th fret.)</p>
<p>Then 4th string. Open = D. Find E. (2nd fret.)</p>
<p>Then 3rd string. Open = G. Find E. (9th fret — no wait, actually there's one at the 12th fret too.)</p>
<p>Then 2nd string. Open = B. Find E. (5th fret.)</p>
<p>Then 1st string. Open = E. (That's the same note as the 6th string, but two octaves higher.)</p>
<p>You just mapped every E on the guitar. Tomorrow, map every A. Then D. Then G. Then C. One note per day.</p>`
        },
        {
          label: 'Draw',
          title: 'Draw the Fretboard',
          body: `<p>Draw a horizontal line for each string (6 lines). Mark the frets with vertical lines. Now fill in the natural note names at every position.</p>
<p>Use the open string names as your starting points: E A D G B E.</p>
<p>Remember: B→C and E→F have no note between them. Every other pair does.</p>
<p>This is your fretboard map. Keep it. You'll add to it as you learn more.</p>
<div class="lp-callout">
  <div class="lp-co-title">SOKOLOW'S ROADMAP #1</div>
  <p>This is Fred Sokolow's first roadmap: "Notes on the Fretboard." His insight is that once you know the note names, every chord, scale, and song becomes a navigation problem — not a memorisation problem.</p>
</div>`
        },
        {
          label: 'Check',
          title: 'Notes Check',
          body: `<p>☐ I can name the 12 notes in the chromatic scale<br>
☐ I know where the half steps are (B→C, E→F)<br>
☐ I can find any given natural note on any string<br>
☐ I understand that the 12th fret = the open string note (one octave up)<br>
☐ I can name the 6 open strings in order</p>`
        }
      ]
    },

    {
      id: 'f-practice-schedule',
      num: '07',
      title: 'Building a Practice Schedule',
      subtitle: 'Discipline is freedom. Structure is creativity.',
      status: 'open',
      sources: ['Patrick Stefurak', 'Howard Roberts', 'Larry Baione'],
      tags: ['Practice', 'Schedule', 'Core'],
      steps: [
        {
          label: 'Read',
          title: 'The Most Important Advice',
          body: `<p>From Patrick Stefurak:</p>
<div class="lp-quote">
  "Create a practice schedule and stick to it. Decide the hour of the day that you will practice. At that time, always go to your practice area and begin your first exercises. Do not get in the habit of using your practice time for other tasks."
  <span class="lp-q-src">— Patrick Stefurak, Guitar Building Blocks</span>
</div>
<p>From Howard Roberts (Super Chops):</p>
<p>"50 minutes per day, 6 days per week. Accuracy over speed. Speed is a byproduct of precision."</p>
<p>From Larry Baione (Berklee Practice Method):</p>
<p>Each session = technique → groove → improvisation → reading. Genre-based. Always musical, never dry.</p>
<p>The Hearth combines all three approaches into a single structure:</p>`
        },
        {
          label: 'Do',
          title: 'Your Daily Practice Template',
          body: `<p>Here's your practice structure going forward:</p>
<p><strong>1. Body Scan (2 min)</strong> — Tension check. You learned this in 01.<br>
<strong>2. Tune (1 min)</strong> — Every session, no exceptions.<br>
<strong>3. Warm-Up (5 min)</strong> — Slow, No Tempo exercises. Rest strokes. Finger awareness.<br>
<strong>4. Today's Lesson (15-20 min)</strong> — New material from whatever node you're working on.<br>
<strong>5. Drill (10 min)</strong> — Repeat exercises from previous lessons. Build muscle memory.<br>
<strong>6. Play (5-10 min)</strong> — Something fun. A song, a riff, a groove. This is the reward.</p>
<p>Total: 40-50 minutes. Same time every day if possible.</p>
<div class="lp-callout">
  <div class="lp-co-title">THE NON-NEGOTIABLE</div>
  <p>Steps 1 and 2 happen every session. No exceptions. Steps 3-6 can flex — spend more time on what needs it. But the body scan and tuning are your anchors. They signal to your brain: "We're practising now."</p>
</div>`
        },
        {
          label: 'Check',
          title: 'Schedule Check',
          body: `<p>☐ I have chosen a daily practice time<br>
☐ I understand the 6-step practice structure<br>
☐ I know that body scan + tuning are non-negotiable<br>
☐ I understand that 40-50 minutes is the target, not a minimum<br>
☐ I have a place to practise that I can go to at the same time each day</p>
<div class="lp-callout">
  <div class="lp-co-title">YOU ARE READY</div>
  <p>Once you can say yes to all of these, you've completed the Foundation. You know how to learn, how to hold the guitar, how to tune, how to produce a clean note, where the notes live, and how to structure your practice. Everything from here builds on these skills.</p>
</div>`
        }
      ]
    }
  ]
};

// Export for use in simulator
if (typeof window !== 'undefined') window.FOUNDATION = FOUNDATION;
