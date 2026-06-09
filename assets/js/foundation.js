// Foundation Node — Little Sparks Version (5-8)
// Same structure, simplified wording for young learners

const FOUNDATION = {
  id: 'foundation',
  title: 'Foundation',
  tag: 'LEVEL 1',
  description: 'Before we play any notes, let\'s learn about the guitar and how to use it! 🎸',
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
      subtitle: 'Your superpower is imagination',
      status: 'open',
      sources: ['Jamie Andreas'],
      tags: ['Mindset', 'Practice', 'Core'],
      video: 'https://www.youtube.com/results?search_query=how+to+practise+guitar+correctly+andreas',
      steps: [
        {
          label: 'Imagine',
          title: 'Your superpower is imagination',
          body: `<p>Your brain is the boss of your fingers. If you imagine exactly what you want them to do, they'll learn it.</p>
<p>If you rush and don't think, your fingers learn the wrong thing — and that's hard to undo.</p>`
        },
        {
          label: 'Feel',
          title: 'The tightness hunt',
          body: `<p>Pick up the guitar. Now check: is your shoulder up? Is your jaw tight? Is your thumb squeezing?</p>
<p>When one part works hard, other parts get tight without you knowing.</p>`
        },
        {
          label: 'Do',
          title: 'Super slow',
          body: `<p>Press a string down — but super slowly. Like a sloth.</p>
<p>Feel the exact moment the note sounds clean. That's all the pressure you need. No more.</p>`
        },
        {
          label: 'Check',
          title: 'Ready?',
          body: `<p>Can you say yes to these?</p>
<p>☐ I know my brain is the boss of my fingers<br>
☐ I found at least 3 tight spots in my body<br>
☐ I tried the slow press trick</p>`
        }
      ]
    },

    {
      id: 'f-anatomy',
      num: '02',
      title: 'Parts of the Guitar',
      subtitle: 'Get to know your instrument🎸',
      status: 'open',
      sources: ['Charles Kim', 'Patrick Stefurak'],
      tags: ['Instrument', 'Visual', 'Basics'],
      steps: [
        {
          label: 'Read',
          title: 'Your Guitar Has Body Parts! ',
          body: `<p>Every part of the guitar has a name. Knowing the names helps you follow lessons and talk about guitar with other people!</p>
<p>The guitar has three main sections — like a head, neck, and body:</p>
<p><strong> Head (Headstock)</strong> — the top part with the twisty knobs (tuning pegs). Each knob controls one string. Turn it one way to make the string higher, the other way to make it lower.</p>
<p><strong> Neck</strong> — the long part connecting the head to the body. The front is called the <em>fretboard</em>. The metal strips across it are called <em>frets</em>. You press strings between the frets to make different notes.</p>
<p><strong> Body</strong> — the big part that makes the sound louder. On some guitars it's hollow inside (like a box). On electric guitars, special magnets called <em>pickups</em> catch the string vibrations and turn them into sound through a speaker.</p>
<p>Other important parts: the <em>bridge</em> (where strings attach to the body), the <em>nut</em> (where strings rest at the top), and the <em>sound hole</em> (the round hole in the middle of acoustic guitars).</p>`
        },
        {
          label: 'See',
          title: 'Touch and Name ',
          body: `<p>Look at your guitar. Touch each part and say its name out loud:</p>
<p>Headstock → Tuning pegs → Nut → Fretboard → Frets → Neck (back) → Body → Sound hole (or Pickups) → Bridge → End pin</p>
<p>Now follow a string from top to bottom: tuning peg → nut → fretboard → bridge → end pin. That's the whole length of the string!</p>
<div class="lp-callout">
  <div class="lp-co-title">THE TOUCH RULE </div>
  <p>If you can't point to it and name it, you don't really know it yet! Touch every part. Say every name. Your brain remembers better when your body is involved too.</p>
</div>`
        },
        {
          label: 'Draw',
          title: 'Draw Your Guitar! ',
          body: `<p>On paper, draw your guitar from memory. Label every part you can remember.</p>
<p>Don't worry about making it look perfect — this isn't art class! It's about remembering. When you can't remember a part, go look at your guitar, then come back and add it.</p>
<p>This shows you what you ACTUALLY know vs what you THINK you know. </p>`
        },
        {
          label: 'Do',
          title: 'String Names & Numbers ',
          body: `<p>The guitar has <strong>6 strings</strong>, numbered 1 (thinnest, closest to the floor) to 6 (thickest, closest to your chin).</p>
<p>From thick to thin, the string names are:</p>
<p><strong>E — A — D — G — B — E</strong></p>
<p>Here's a silly sentence to remember them:</p>
<p><em>"Eddie Ate Dynamite, Good Bye Eddie!"</em> </p>
<p>Pluck each string. Listen to how it sounds. Say its name out loud. Do this until you can name them all without looking!</p>
<div class="lp-callout">
  <div class="lp-co-title">FUN FACT </div>
  <p>The 2nd string (B) is the weird one! Every other pair of strings follows the same pattern, but B breaks the rule. This is why guitar is tricky sometimes — but also what makes it special!</p>
</div>`
        },
        {
          label: 'Check',
          title: 'Know Your Guitar! ✅',
          body: `<p>☐ I can name the main parts of the guitar<br>
☐ I know which way to turn the knobs to make strings higher or lower<br>
☐ I can name all 6 strings in order (thick to thin)<br>
☐ I know which string is the "weird" one (hint: B!)<br>
☐ I can draw a guitar and label the parts</p>`
        },
        {
          label: 'Deeper',
          title: 'Types of Guitar 🎸',
          body: `<p>There are three main kinds of guitar:</p>
<p><strong>🇪🇸 Classical (Nylon strings)</strong> — soft, warm sound. Used for classical music, flamenco, and bossa nova. You play it with your fingers (no pick). Has a wider neck.</p>
<p><strong>🤠 Acoustic (Steel strings)</strong> — bright, loud sound. Used for folk, country, and singing along. Can use a pick or your fingers.</p>
<p><strong> Electric</strong> — lots of different sounds! Used for rock, jazz, blues. Thinner neck, lighter strings. Needs an amplifier (speaker) to make sound.</p>
<p>Which one should you learn on? <strong>Any of them!</strong> The basics are the same for all three. Pick the one that sounds the most exciting to you!</p>`
        }
      ]
    },

    {
      id: 'f-posture',
      num: '03',
      title: 'How to Hold the Guitar',
      subtitle: 'Your body is part of the instrument',
      status: 'open',
      sources: ['Jamie Andreas', 'Charles Kim'],
      tags: ['Posture', 'Body', 'Essential'],
      steps: [
        {
          label: 'Read',
          title: 'Sit Like a Guitar Player ',
          body: `<p>Before you play a single note, you need to hold the guitar the right way. Bad posture = your body gets tight = playing feels hard = no fun! 😫</p>
<p>Good news: holding the guitar correctly actually feels really natural once you find it!</p>
<p><strong>Sitting down:</strong></p>
<p>• Sit on the front edge of your chair<br>
• Feet flat on the floor<br>
• Guitar rests on your right leg (if you're right-handed)<br>
• The neck points slightly UP — not flat, not pointing at the ceiling<br>
• The curve of the guitar body rests against your chest</p>
<p><strong>Your right arm</strong> rests gently over the top of the guitar. It doesn't grab or squeeze — it just hangs there. The weight of your arm holds the guitar in place.</p>
<p><strong>Your left hand</strong> holds the neck like a baseball bat... but gently! Thumb behind the neck (not over the top). Fingers curved and ready. Wrist mostly straight — not bent like a pretzel.</p>`
        },
        {
          label: 'See',
          title: 'The Pillow Trick ',
          body: `<p>Here's a cool trick from guitar teacher Jamie Andreas:</p>
<p><strong>Step 1:</strong> Sit in a chair WITHOUT the guitar. Put a pillow on your right leg. Rest your right arm over the pillow like it's the guitar. Notice how your arm falls naturally.</p>
<p><strong>Step 2:</strong> Now pick up the real guitar. Try to make your arm feel the same way as it did on the pillow. The guitar should feel supported — not clamped!</p>
<p><strong>Step 3:</strong> Check your left hand. Make a "C" shape with your thumb behind the neck. Your fingers should curve over the strings like little arches. No flat fingers!</p>
<div class="lp-callout">
  <div class="lp-co-title">THE CUP </div>
  <p>Imagine you're holding a small ball in your palm. Fingers curved, thumb relaxed. This shape gives you the most control with the least effort!</p>
</div>`
        },
        {
          label: 'Do',
          title: 'Find Your Position ',
          body: `<p>Let's do it step by step:</p>
<p>1. Sit on the front edge of a chair. Feet flat.<br>
2. Put the guitar on your right leg.<br>
3. Let it lean back against your chest a little.<br>
4. Drape your right arm over the guitar body. Let gravity do the work.<br>
5. Bring your left hand to the neck. Thumb behind it.<br>
6. Make the "C" shape with your left hand.<br>
7. Close your eyes. Check for tight spots (like you learned in lesson 01!).<br>
8. Wiggle around until everything feels comfy — like you could sit like this for a long time.</p>
<p>Now do the 2-minute body scan in playing position. Find any tight spots and let them go!</p>`
        },
        {
          label: 'Check',
          title: 'Position Check ✅',
          body: `<p>☐ My right arm rests on the guitar without squeezing<br>
☐ My left thumb is behind the neck (not over the top)<br>
☐ My left wrist is mostly straight (not bent like a pretzel)<br>
☐ My left fingers are curved (not flat)<br>
☐ My shoulders are relaxed and down<br>
☐ I can breathe easily<br>
☐ I could sit like this for 30 minutes and feel fine</p>`
        },
        {
          label: 'Deeper',
          title: 'Standing Up! ',
          body: `<p>When you see guitar players on stage, they're usually standing up! Standing changes things — the guitar hangs from a strap at a different height, and your arms are at different angles.</p>
<p><strong>For now, practise sitting down.</strong> Standing comes later — after your hands learn where everything is. When you DO stand up, set the strap so the guitar is at about the same height as when you sit. That way you don't have to re-learn everything!</p>`
        }
      ]
    },

    {
      id: 'f-tuning',
      num: '04',
      title: 'Tuning',
      subtitle: 'If your guitar sounds weird, it needs tuning',
      status: 'open',
      sources: ['Charles Kim'],
      tags: ['Tuning', 'Ear', 'Essential'],
      steps: [
        {
          label: 'Read',
          title: 'What Is Tuning? ',
          body: `<p>Before you play, your guitar needs to be <strong>in tune</strong>. That means each string plays the right note!</p>
<p>When a guitar is out of tune, even the best player in the world would sound bad. It's like trying to sing a song when everyone around you is singing a different song — chaos! </p>
<p>Standard tuning from thick to thin: <strong>E A D G B E</strong></p>
<p>The thickest string (low E) is your starting point. All the other strings are tuned from there.</p>
<p><strong>The easiest way:</strong> Use a tuner! Clip-on tuners are cheap and work great. Phone apps work too (like GuitarTuna). The tuner tells you if the string is too high, too low, or just right. </p>`
        },
        {
          label: 'Do',
          title: 'Tune Your Guitar! 🎸',
          body: `<p>1. Get your tuner (clip-on or phone app)<br>
2. Pluck the thickest string (low E) without touching any frets<br>
3. Turn the knob until the tuner shows E and lights up green<br>
4. Now do A, then D, then G, then B, then the thin E<br>
5. Go back and check the first string again — it might have moved!<br>
6. Check ALL strings one more time</p>
<p>New strings go out of tune a lot. Old strings stay in tune better but don't sound as bright.</p>
<div class="lp-callout">
  <div class="lp-co-title">DAILY HABIT </div>
  <p>Tune your guitar at the START of every practice session. It takes about 1 minute. It makes sure your ears hear the RIGHT sounds — and it tells your brain "practice time has begun!"</p>
</div>`
        },
        {
          label: 'Check',
          title: 'Tuning Check ✅',
          body: `<p>☐ I can tune all 6 strings using a tuner<br>
☐ I know the string names in order<br>
☐ I know to tune every time before I play<br>
☐ I know that strings can go out of tune, so I check them again</p>`
        }
      ]
    },

    {
      id: 'f-first-sound',
      num: '05',
      title: 'Your First Sound',
      subtitle: 'One beautiful note. That\'s the goal! ',
      status: 'open',
      sources: ['Jamie Andreas', 'Patrick Stefurak'],
      tags: ['Technique', 'First', 'Essential'],
      steps: [
        {
          label: 'Read',
          title: 'The Rest Stroke 👍',
          body: `<p>You're going to play ONE note. Just one. But you're going to make it sound BEAUTIFUL. </p>
<p>The <strong>rest stroke</strong> is how guitar players make a nice, full sound:</p>
<p>1. Put your right thumb on the thickest string (low E)<br>
2. Push the string down toward the guitar body<br>
3. Keep going until your thumb stops on the next string<br>
4. Listen to the note ring out!</p>
<p>That's it! One note. One clean, beautiful, ringing note. 🎶</p>
<div class="lp-callout">
  <div class="lp-co-title">THE THREE PARTS OF A NOTE </div>
  <p>Every note has three parts: <em>the start</em> (when you pluck), <em>the middle</em> (the note ringing), and <em>the end</em> (when it fades away). Most beginners only listen to the start. Try listening to the MIDDLE — that's where the magic is! 🪄</p>
</div>`
        },
        {
          label: 'Do',
          title: 'Play One Note 10 Times ',
          body: `<p>Using your thumb, play the thickest string 10 times. Each time:</p>
<p>1. Put your thumb on the string<br>
2. Push gently (remember the Slow Push Trick!)<br>
3. Follow through until your thumb stops on the next string<br>
4. Listen to the note until it completely fades away<br>
5. Bring your thumb back to where you started<br>
6. Take a breath. Do it again.</p>
<p>Speed: one note every 3 seconds. No rushing! This is Super Slow Mode.</p>
<p>Try to make every note sound EXACTLY the same. Same volume, same sound, same length. If one sounds different, try to figure out why! 🕵️</p>`
        },
        {
          label: 'Check',
          title: 'First Sound Check ✅',
          body: `<p>☐ I can play one clean note with the rest stroke<br>
☐ I know the three parts of a note (start, middle, end)<br>
☐ I can play 10 notes that all sound the same<br>
☐ I'm using gentle pressure, not forcing<br>
☐ I'm listening to the whole note until it fades</p>`
        }
      ]
    },

    {
      id: 'f-notes-neck',
      num: '06',
      title: 'Notes on the Neck',
      subtitle: 'Learn where all the notes hide',
      status: 'open',
      sources: ['Patrick Stefurak', 'Fred Sokolow'],
      tags: ['Fretboard', 'Notes', 'Foundation'],
      steps: [
        {
          label: 'Read',
          title: 'The Music Alphabet ',
          body: `<p>Music uses <strong>12 notes</strong>. Their names are: A A# B C C# D D# E F F# G G# — then back to A again!</p>
<p>On guitar, each fret is one step in this list. Play the thickest string open = E. First fret = F. Second fret = F#. Third fret = G. See how it works?</p>
<p>The regular notes (no sharps) are: <strong>A B C D E F G</strong></p>
<p>Notice something special: between B and C, there's NO sharp! Between E and F, there's NO sharp either! These are the "short jumps" in music.</p>
<div class="lp-callout">
  <div class="lp-co-title">SMART TEACHER SAYS </div>
  <p>"Start by learning the notes on the guitar neck! Learn where A, B, C, D, E, F, and G are EVERYWHERE. If you know how to practice and where the notes are, you have the two most important tools EVER!"</p>
</div>`
        },
        {
          label: 'Do',
          title: 'Find Every E! ',
          body: `<p>Your first fretboard treasure hunt: find EVERY E on the guitar!</p>
<p>Start with the thickest string open (that's E!). Now go up one fret at a time: F, F#, G, G#, A... until you find the next E. It's at fret 12 — that's where the double dots are!</p>
<p>Now do the same on each string:</p>
<p>• 5th string (A) → E is at fret 7<br>
• 4th string (D) → E is at fret 2<br>
• 3rd string (G) → E is at fret 9 (and 12!)<br>
• 2nd string (B) → E is at fret 5<br>
• 1st string → E is the open string! (same as string 6, but higher!)</p>
<p>You just found every E on the whole guitar!  Tomorrow, find every A. Then D. Then G. Then C. One note per day — like a treasure hunt!</p>`
        },
        {
          label: 'Draw',
          title: 'Draw the Fretboard ',
          body: `<p>Draw 6 horizontal lines (one for each string). Add vertical lines for the frets. Now write the note names in every spot!</p>
<p>Use the open string names as your starting points: E A D G B E.</p>
<p>Remember: B→C and E→F have NO sharp between them. Every other pair does!</p>
<p>This is YOUR fretboard map. Keep it safe — you'll add more to it as you learn! </p>
<div class="lp-callout">
  <div class="lp-co-title">THE SECRET </div>
  <p>Once you know where all the notes are, EVERYTHING gets easier. Chords, songs, solos — they're all just knowing where the right notes are!</p>
</div>`
        },
        {
          label: 'Check',
          title: 'Notes Check ✅',
          body: `<p>☐ I can name the 12 notes in order<br>
☐ I know where the "short jumps" are (B→C and E→F)<br>
☐ I can find any note on any string<br>
☐ I know that fret 12 is the same note as the open string (but higher!)<br>
☐ I can name all 6 open strings in order</p>`
        }
      ]
    },

    {
      id: 'f-practice-schedule',
      num: '07',
      title: 'Your Practice Plan',
      subtitle: 'Practice makes progress📅',
      status: 'open',
      sources: ['Patrick Stefurak', 'Howard Roberts', 'Larry Baione'],
      tags: ['Practice', 'Schedule', 'Core'],
      steps: [
        {
          label: 'Read',
          title: 'The Secret of Great Players ',
          body: `<p>Here's what great guitar teachers all agree on:</p>
<div class="lp-quote">
  "Pick a time every day to practice. When that time comes, go to your practice spot and start. Don't do other things instead!"
  <span class="lp-q-src">— Patrick Stefurak</span>
</div>
<p>The secret isn't talent. It's not magic. It's just <strong>practising at the same time every day</strong>. That's it!</p>
<p>Even 20 minutes a day is way better than 3 hours once a week. Your brain needs to come back to it again and again to remember.</p>`
        },
        {
          label: 'Do',
          title: 'Your Daily Practice Recipe ',
          body: `<p>Here's your practice recipe — follow it every time:</p>
<p><strong>1. Body Scan (2 min)</strong>  — Check for tight spots. You learned this in lesson 01.<br>
<strong>2. Tune (1 min)</strong>  — Every time. No exceptions!<br>
<strong>3. Warm-Up (5 min)</strong> 🔥 — Super slow playing. Rest strokes. Feel your fingers.<br>
<strong>4. Today's Lesson (15 min)</strong>  — New stuff from whatever you're working on.<br>
<strong>5. Drill (10 min)</strong>  — Practice things you've already learned. Make them stronger.<br>
<strong>6. Play! (5-10 min)</strong> 🎸 — Something fun! A song, a riff, whatever makes you smile.</p>
<p>Total: about 40 minutes. Same time every day if you can!</p>
<div class="lp-callout">
  <div class="lp-co-title">THE RULES </div>
  <p>Steps 1 and 2 happen EVERY time. Always! Steps 3-6 can change — spend more time on whatever needs it. But body scan + tuning are your anchors. They tell your brain: "It's guitar time!" </p>
</div>`
        },
        {
          label: 'Check',
          title: 'Are You Ready? ✅',
          body: `<p>☐ I've picked a time every day to practise<br>
☐ I know the 6 steps of my practice recipe<br>
☐ I know that body scan + tuning happen every time<br>
☐ I have a spot where I can practise at the same time each day</p>
<div class="lp-callout">
  <div class="lp-co-title"> YOU DID IT! </div>
  <p>If you can say YES to all of these, you've finished the Foundation! You know how to learn, how to hold the guitar, how to tune it, how to make a beautiful note, where all the notes live, and how to practise every day. Everything from here builds on what you just learned. You're ready! </p>
</div>`
        }
      ]
    }
  ]
};

// Export for use in simulator
if (typeof window !== 'undefined') window.FOUNDATION = FOUNDATION;
