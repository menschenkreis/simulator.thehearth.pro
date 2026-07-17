// Main map node meanings and routing metadata.
// Keep this file plain: it is shared by the legacy map and future handoff work.
var NODE_DATA = {
  hearth: { emoji:'', tag:'INNER MAP', title:'The Hearth', role:'Understand the body and brain behind guitar learning.', desc:'Open the inner map: brain, hands, ears, breath, feeling, and habit.', cta:'Open the inner map \u2192', enter:true, action:'hearth', icon:'images/map-nodes-generated-v2-normalized/hearth.png' },
  foundation: { emoji:'', tag:'THRESHOLD', title:'Foundation', role:'Learn how to enter the guitar world.', desc:'Start with the basic language, body position, first sounds, and first map.', cta:'Enter Foundation \u2192', enter:true, action:'foundation', icon:'images/map-nodes-generated-v2-normalized/foundation.png' },
  mastery: { emoji:'', tag:'PHOENIX CHAMBER', title:'Mastery', role:'Bring skill into expression.', desc:'Explore voice, confidence, artistry, and the kind of player you are becoming.', cta:'Enter Mastery \u2192', enter:true, action:'mastery', icon:'images/map-nodes-generated-v2-normalized/mastery.png' },
  doing: { emoji:'', tag:'PHYSICAL TRAINING', title:'Do', role:'Train one physical guitar skill at a time.', desc:'Choose left hand, right hand, both hands, or the full drill library.', cta:'Enter Do \u2192', enter:true, action:'doing', icon:'images/map-nodes-generated-v2-normalized/doing.png' },
  practise: { emoji:'', tag:'PRACTICE TEMPLE', title:'Practise', role:'Run a focused practice session.', desc:'Set a focus, light the candle, practise for a chosen time, and leave a reflection.', cta:'Begin practice \u2192', enter:true, action:'practice', icon:'images/map-nodes-generated-v2-normalized/practise.png' },
  play: { emoji:'', tag:'PLAY ATLAS', title:'Play', role:'Explore music by playing it.', desc:'Choose a musical region or style, then connect rhythm, touch, sound, and story.', cta:'Open the atlas \u2192', enter:true, action:'play', icon:'images/map-nodes-generated-v2-normalized/play.png' },
  knowing: { emoji:'', tag:'KNOWING LIBRARY', title:'Know', role:'Look up the language of music.', desc:'Open books on notes, rhythm, chords, harmony, fretboard logic, and musical terms.', cta:'Open the library \u2192', enter:true, action:'knowing', icon:'images/map-nodes-generated-v2-normalized/knowing.png' },
  study: { emoji:'', tag:'KEY CHAMBER', title:'Study', role:'Make one idea clear.', desc:'Choose a door for words, sound, shape, pattern, test, or review.', cta:'Enter the chamber \u2192', enter:true, action:'study', icon:'images/map-nodes-generated-v2-normalized/study.png' },
  create: { emoji:'', tag:'CREATION CAULDRON', title:'Create', role:'Turn learning into something of your own.', desc:'Choose ingredients, set the heat, stir, and shape a musical seed.', cta:'Open the cauldron \u2192', enter:true, action:'create', icon:'images/map-nodes-generated-v2-normalized/create.png' }
};

if (typeof window !== 'undefined') {
  window.NODE_DATA = NODE_DATA;
}
