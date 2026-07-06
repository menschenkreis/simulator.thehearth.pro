// Main map node meanings and routing metadata.
// Keep this file plain: it is shared by the legacy map and future handoff work.
var NODE_DATA = {
  hearth: { emoji:'', tag:'INNER SYSTEM', title:'The Hearth', role:'The body and mind behind guitar learning.', desc:'Explore the brain, hands, ears, breath, feelings, and habits involved in practice.', enter:true, action:'hearth', icon:'images/map-nodes-generated-v2-normalized/hearth.png' },
  foundation: { emoji:'', tag:'FIRST GROUND', title:'Foundation', role:'The starting point for learning guitar.', desc:'Learn how to hold the guitar, tune it, make clean sounds, and understand the basics.', enter:true, action:'foundation', icon:'images/map-nodes-generated-v2-normalized/foundation.png' },
  mastery: { emoji:'', tag:'INTEGRATION', title:'Mastery', role:'The place for bringing everything together.', desc:'Build confidence, expression, artistry, and your own sound.', enter:true, action:'mastery', icon:'images/map-nodes-generated-v2-normalized/mastery.png' },
  doing: { emoji:'', tag:'DOING PATH', title:'Do', role:'A library of guitar technique drills.', desc:'Work on rhythm, picking, fretting, coordination, strength, and control.', enter:true, action:'doing', icon:'images/map-nodes-generated-v2-normalized/doing.png' },
  practise: { emoji:'', tag:'DOING PATH', title:'Practise', role:'A place to run a focused practice session.', desc:'Choose what to practise, set a time, work through it, and leave feedback.', enter:true, action:'practice', icon:'images/map-nodes-generated-v2-normalized/practise.png' },
  play: { emoji:'', tag:'DOING PATH', title:'Play', role:'A place to explore music through playing.', desc:'Learn styles, songs, rhythms, sounds, and guitar traditions from around the world.', enter:true, action:'play', icon:'images/map-nodes-generated-v2-normalized/play.png' },
  knowing: { emoji:'', tag:'KNOWING PATH', title:'Know', role:'A music theory reference library.', desc:'Learn notes, rhythm, chords, harmony, fretboard logic, and the language of music.', enter:true, action:'knowing', icon:'images/map-nodes-generated-v2-normalized/knowing.png' },
  study: { emoji:'', tag:'KNOWING PATH', title:'Study', role:'A place for deeper guided learning.', desc:'Slow down, check your understanding, answer questions, and make ideas clear.', enter:true, action:'study', icon:'images/map-nodes-generated-v2-normalized/study.png' },
  create: { emoji:'', tag:'MAKING PATH', title:'Create', role:'A place to make your own music.', desc:'Write, arrange, combine ideas, record, and shape songs or musical sketches.', enter:true, action:'create', icon:'images/map-nodes-generated-v2-normalized/create.png' }
};

if (typeof window !== 'undefined') {
  window.NODE_DATA = NODE_DATA;
}
