# TeachingEngine Lesson Seed Schema V1

## Purpose

This schema describes how current TeachingEngine lesson files can become backend-ready seed data.

The goal is not to store JavaScript in the database. The goal is to store lesson structure and content, while the frontend keeps rendering behavior.

## Lesson Record Shape

Each lesson seed should include:

| Field | Meaning |
|---|---|
| `version` | Seed format version. |
| `generated_from` | Prototype file this seed came from. |
| `lesson` | One lesson object. |

## Lesson Object

| Field | Meaning |
|---|---|
| `id` | Stable lesson ID. Example: `f-threshold`. |
| `title` | Learner-facing lesson title. |
| `node_id` | App node this belongs to. Example: `foundation`. |
| `topic_id` | Foundation topic/path ID if applicable. |
| `engine` | Runtime expected to render this. Example: `teaching-engine`. |
| `source_file` | Current prototype source file. |
| `complete_text` | Optional completion HTML/text shown if the lesson ends without an explicit end step. |
| `steps` | Ordered list of lesson steps. |

## Step Object

All steps should include:

| Field | Meaning |
|---|---|
| `order` | 1-based step order. |
| `type` | Step type. Current values: `speak`, `ask`, `cards`, `video`, `action`, `end`. |
| `text` | Main learner-facing HTML/text. |
| `char_key` | Character expression key, not a JavaScript object. Example: `neutral`, `thinking`, `encouraging`, `celebratory`. |
| `char_size` | Optional size hint. Example: `big`. |

## Ask Step Fields

Ask steps may include:

| Field | Meaning |
|---|---|
| `concept` | Concept being checked. |
| `choices` | Answer choices. |
| `reexplain` | Re-explanation sequence for wrong or uncertain answers. |

Each choice should include:

| Field | Meaning |
|---|---|
| `label` | Button label. |
| `correct` | Boolean. Current prototype allows more than one correct answer. |
| `response` | Optional follow-up message. |

## Cards Step Fields

Cards steps may include:

| Field | Meaning |
|---|---|
| `cards` | List of cards with title, icon/image, description, and body. |

## Video Step Fields

Video steps may include:

| Field | Meaning |
|---|---|
| `video_url` | Optional video URL. |
| `video_desc` | Optional placeholder or description. |

## Action Step Fields

Action steps should not store JavaScript render functions.

Instead use:

| Field | Meaning |
|---|---|
| `renderer_key` | Stable frontend renderer key. Example: `foundation.body_scan`. |
| `renderer_config` | Optional data used by that renderer. |

## Character Key Mapping

The current JavaScript uses values like `TeachingCHAR.neutral`. Seed files should store plain keys:

- `neutral`
- `encouraging`
- `thinking`
- `celebratory`
- `lightbulb`

The frontend can map these keys back to image paths or character assets.

## Migration Rule

Start with small lessons that have no custom action renderers.

Good first extraction:

- `assets/js/lessons-threshold.js`

Do not start with:

- `assets/js/lesson-1-foundation.js`

Reason:

`lesson-1-foundation.js` contains custom interactive action renderers that need frontend renderer keys before clean extraction.
