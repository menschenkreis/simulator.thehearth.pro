// Guide character asset catalogue.
// This keeps generated character variations in one place so nodes can choose by mood.

window.GUIDE_CHARACTER_ASSETS = {
  version: 1,
  family: 'generated-talking-guide',
  contactSheet: 'images/character-generated/guide-variations-v1-contact-sheet.png',
  moods: {
    neutral: {
      label: 'Neutral',
      src: 'images/character-generated/guide-neutral-v1.png',
      source: 'images/character-generated/guide-neutral-v1-source.png',
      use: 'Listening, waiting, calm explanation'
    },
    encouraging: {
      label: 'Encouraging',
      src: 'images/character-generated/guide-encouraging-v1.png',
      source: 'images/character-generated/guide-encouraging-v1-source.png',
      use: 'Supportive next step, gentle correction, student confidence'
    },
    thinking: {
      label: 'Thinking',
      src: 'images/character-generated/guide-thinking-v1.png',
      source: 'images/character-generated/guide-thinking-v1-source.png',
      use: 'Questions, reflection, choosing between options'
    },
    celebratory: {
      label: 'Celebratory',
      src: 'images/character-generated/guide-celebratory-v1.png',
      source: 'images/character-generated/guide-celebratory-v1-source.png',
      use: 'Completion, success, progress acknowledgement'
    },
    talking: {
      label: 'Talking',
      src: 'images/character-generated/talking-guide-v1.png',
      source: 'images/character-generated/talking-guide-v1-source.png',
      use: 'Default speaking pose'
    }
  }
};
