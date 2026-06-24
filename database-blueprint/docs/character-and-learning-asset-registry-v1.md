# Character And Learning Asset Registry V1

## Purpose

This file maps the floating guitar guide character and the "learning how to learn" images into the rebuild blueprint.

The character should be treated as part of the teaching system, not as loose decoration.

The learning-how-to-learn images should be treated as Foundation teaching visuals, especially for the three barriers to learning.

## Character System

Working name:

`Hearth Guide`

Role:

- companion
- teacher
- feedback giver
- question asker
- celebration signal
- gentle recovery guide when the learner is stuck

Recommended use:

- Full-body images for node rooms, Foundation, Practice, and open-book guide panels.
- Face images for TeachingEngine speech/ask/card/end steps.
- Symbol variants for special feedback moments such as insight, question, correction, and celebration.

Do not hardcode one image everywhere.

The database should allow a lesson step, guide message, node room, or feedback event to request a character mood.

Recommended moods:

- `neutral`
- `encouraging`
- `thinking`
- `celebratory`
- `insight`
- `question`
- `warning`

## Character Assets

| Asset Key | Variant | Mood | Dimensions | Source Path |
| --- | --- | --- | --- | --- |
| `guide.full.celebratory` | full-body | celebratory | 3000 x 5000 | `/Users/alessandralove/Documents/TREE OF LIFE/PRODUCTION/SIMULATION/ASSETS/CHARACTER/FULL/Celebratory.png` |
| `guide.full.encouraging` | full-body | encouraging | 3000 x 5000 | `/Users/alessandralove/Documents/TREE OF LIFE/PRODUCTION/SIMULATION/ASSETS/CHARACTER/FULL/Encouraging.png` |
| `guide.full.neutral` | full-body | neutral | 3000 x 5000 | `/Users/alessandralove/Documents/TREE OF LIFE/PRODUCTION/SIMULATION/ASSETS/CHARACTER/FULL/Neutral.png` |
| `guide.full.thinking` | full-body | thinking | 3000 x 5000 | `/Users/alessandralove/Documents/TREE OF LIFE/PRODUCTION/SIMULATION/ASSETS/CHARACTER/FULL/Thinking.png` |
| `guide.face.celebratory` | face | celebratory | 1319 x 1858 | `/Users/alessandralove/Documents/TREE OF LIFE/PRODUCTION/SIMULATION/ASSETS/CHARACTER/FACE/Celebratory.png` |
| `guide.face.encouraging` | face | encouraging | 1297 x 1820 | `/Users/alessandralove/Documents/TREE OF LIFE/PRODUCTION/SIMULATION/ASSETS/CHARACTER/FACE/Encouraging.png` |
| `guide.face.neutral` | face | neutral | 1402 x 1909 | `/Users/alessandralove/Documents/TREE OF LIFE/PRODUCTION/SIMULATION/ASSETS/CHARACTER/FACE/Neutral.png` |
| `guide.face.thinking` | face | thinking | 1308 x 1841 | `/Users/alessandralove/Documents/TREE OF LIFE/PRODUCTION/SIMULATION/ASSETS/CHARACTER/FACE/Thinking.png` |
| `guide.symbol.lightbulb` | symbol-face | insight | 1540 x 1978 | `/Users/alessandralove/Documents/TREE OF LIFE/PRODUCTION/SIMULATION/ASSETS/CHARACTER/SYMBOLS/Encouraging Face Lightbulb.png` |
| `guide.symbol.sparks` | symbol-face | celebration | 1298 x 1716 | `/Users/alessandralove/Documents/TREE OF LIFE/PRODUCTION/SIMULATION/ASSETS/CHARACTER/SYMBOLS/Celebrator with sparks.png` |
| `guide.symbol.exclamation` | symbol-face | warning | 1488 x 1742 | `/Users/alessandralove/Documents/TREE OF LIFE/PRODUCTION/SIMULATION/ASSETS/CHARACTER/SYMBOLS/Think Exclamation Mark.png` |
| `guide.symbol.question` | symbol-face | question | 1408 x 1889 | `/Users/alessandralove/Documents/TREE OF LIFE/PRODUCTION/SIMULATION/ASSETS/CHARACTER/SYMBOLS/Thinking Question Mark.png` |

## Learning How To Learn Assets

These images support the Foundation "How To Learn" material.

They map directly to the three learning barriers already captured in the durable design realizations.

| Asset Key | Concept | Dimensions | Recommended Use | Source Path |
| --- | --- | --- | --- | --- |
| `foundation.learning_barrier.lack_of_mass` | absence of mass | 4371 x 3087 | Explain why ideas need physical examples, objects, diagrams, and doing steps. | `/Users/alessandralove/Documents/TREE OF LIFE/PRODUCTION/SIMULATION/ASSETS/Learning how to Learn/Lack of Mass.png` |
| `foundation.learning_barrier.misunderstood_word` | misunderstood word | 4371 x 3087 after correction | Explain why unclear words can make later material disappear. Use the corrected rotated app copy. | `/Users/alessandralove/Documents/TREE OF LIFE/PRODUCTION/SIMULATION/ASSETS/Learning how to Learn/Misunderstood word.png` |
| `foundation.learning_barrier.skipped_gradient` | skipped gradient | 4371 x 3087 | Explain why steps must be small enough to climb. | `/Users/alessandralove/Documents/TREE OF LIFE/PRODUCTION/SIMULATION/ASSETS/Learning how to Learn/Skipped Gradient.png` |

## Rebuild Recommendation

Add these to the `media_assets` table as content assets.

Then allow TeachingEngine steps and node rooms to reference assets by key instead of raw file path.

Example:

- `character_mood: "thinking"`
- `character_variant: "face"`
- `asset_key: "guide.face.thinking"`

For Foundation barrier lessons, use the learning assets as action/card visuals:

- lack of mass = show the learner that an abstract idea needs a physical counterpart
- misunderstood word = ask the learner to identify and define the word that caused fog
- skipped gradient = let the learner choose a smaller next step

## Orientation Correction

The source `Misunderstood word.png` file is rotated in the original asset folder.

A corrected app copy has been created here:

`database-blueprint/assets/images/foundation/learning-how-to-learn/misunderstood-word.png`

Use this corrected app copy for the rebuild.
