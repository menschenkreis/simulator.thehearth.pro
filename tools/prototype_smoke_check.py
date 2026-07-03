#!/usr/bin/env python3
"""Lightweight smoke checks for the Hearth simulator prototype."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

REQUIRED_MARKERS = {
    "simulator.html": [
        "assets/js/scene-first.js",
        "assets/js/teaching-engine.js",
        "assets/js/journey.js",
    ],
    "assets/js/scene-first.js": [
        "showCreate",
        "showPractice",
        "showHearth",
    ],
    "assets/js/teaching-engine.js": [
        "window.TeachingEngine",
        "function createTeachingEngine",
        "function showGradientFailsafe",
    ],
    "assets/js/journey.js": [
        "window.Journey",
        "hearth-journey-v2",
        "function buildLesson",
        "function loadState",
    ],
    "assets/js/lesson-1-foundation.js": [
        "LESSON_1_FOUNDATION",
        "steps:",
        "window.LESSON_1_FOUNDATION",
    ],
    "assets/js/create-obstructions.js": [
        "const CREATE_OBSTRUCTIONS",
        "window.CREATE_OBSTRUCTIONS",
    ],
    "assets/js/create-combos.js": [
        "const CREATE_COMBOS",
        "window.CREATE_COMBOS",
    ],
    "assets/js/lessons-threshold.js": ["window.LESSON_THRESHOLD", "steps:"],
    "assets/js/lessons-how-to-learn.js": ["window.LESSON_HOW_TO_LEARN", "steps:"],
    "assets/js/lessons-learning-a-language.js": ["window.LESSON_LEARNING_A_LANGUAGE", "steps:"],
    "assets/js/lessons-language-of-music.js": ["window.LESSON_LANGUAGE_OF_MUSIC", "steps:"],
    "assets/js/lessons-language-of-guitar.js": ["window.LESSON_LANGUAGE_OF_GUITAR", "steps:"],
    "assets/js/lessons-the-tool.js": ["window.LESSON_THE_TOOL", "steps:"],
    "assets/js/lessons-the-guitar.js": ["window.LESSON_THE_GUITAR", "steps:"],
    "assets/js/lessons-speaking.js": ["window.LESSON_SPEAKING", "steps:"],
    "assets/js/lessons-rhythm-pulse.js": ["window.LESSON_RHYTHM_PULSE", "steps:"],
    "assets/js/lessons-first-shapes.js": ["window.LESSON_FIRST_SHAPES", "steps:"],
    "assets/js/lessons-first-conversation.js": ["window.LESSON_FIRST_CONVERSATION", "steps:"],
    "assets/js/lessons-conversations.js": ["window.LESSON_CONVERSATIONS", "steps:"],
}

CONTENT_BANKS = {
    "assets/js/create-obstructions.js": {
        "array_name": "CREATE_OBSTRUCTIONS",
        "min_items": 45,
        "fields": ["level", "category", "constraint", "prompt", "payoff"],
    },
    "assets/js/create-combos.js": {
        "array_name": "CREATE_COMBOS",
        "min_items": 25,
        "fields": ["ingredients", "level", "constraint", "prompt", "payoff"],
    },
}

SEED_FILES = {
    "database-blueprint/seeds/create_obstructions_v2.json": {
        "count": 50,
        "fields": ["level", "category", "constraint", "prompt", "payoff"],
    },
    "database-blueprint/seeds/create_combos_v2.json": {
        "count": 32,
        "fields": ["ingredients", "level", "constraint", "prompt", "payoff"],
    },
    "database-blueprint/seeds/create_cauldron_ingredients_v2.json": {
        "count": 8,
        "fields": ["id", "name", "symbol", "color", "prompts"],
    },
    "database-blueprint/seeds/hearth_body_zones_v2.json": {
        "count": 6,
        "fields": [
            "id",
            "label",
            "seal",
            "x",
            "y",
            "r",
            "guide",
            "notice",
            "tryThis",
            "apply",
            "sourceNote",
        ],
    },
    "database-blueprint/seeds/study_key_doors_v2.json": {
        "count": 6,
        "fields": ["id", "label", "symbol", "state", "color", "guide", "action", "mode"],
    },
    "database-blueprint/seeds/mastery_phoenix_seals_v2.json": {
        "count": 4,
        "fields": ["id", "name", "artist", "color", "why", "practice"],
    },
}

LESSON_SEEDS = {
    "database-blueprint/seeds/foundation_threshold_lesson_v2.json": {
        "lesson_id": "f-threshold",
        "step_count": 7,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_language_of_music_lesson_v2.json": {
        "lesson_id": "f-language-of-music",
        "step_count": 10,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_learning_a_language_lesson_v2.json": {
        "lesson_id": "f-learning-a-language",
        "step_count": 10,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_language_of_guitar_lesson_v2.json": {
        "lesson_id": "f-language-of-guitar",
        "step_count": 10,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_the_guitar_lesson_v2.json": {
        "lesson_id": "f-the-guitar",
        "step_count": 8,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_speaking_lesson_v2.json": {
        "lesson_id": "f-speaking",
        "step_count": 10,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_conversations_lesson_v2.json": {
        "lesson_id": "f-conversations",
        "step_count": 10,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_how_to_learn_lesson_v2.json": {
        "lesson_id": "f-how-to-learn",
        "step_count": 16,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_rhythm_pulse_lesson_v2.json": {
        "lesson_id": "f-rhythm-pulse",
        "step_count": 15,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
    "database-blueprint/seeds/foundation_first_shapes_lesson_v2.json": {
        "lesson_id": "f-first-shapes",
        "step_count": 9,
        "allowed_types": ["speak", "ask", "cards", "video", "action", "end"],
    },
}


def read_text(relative_path: str) -> str:
    return (ROOT / relative_path).read_text(encoding="utf-8")


def extract_array(text: str, array_name: str) -> str | None:
    match = re.search(rf"const\s+{re.escape(array_name)}\s*=\s*\[", text)
    if not match:
        return None

    start = match.end() - 1
    depth = 0
    in_string = False
    escape = False

    for index in range(start, len(text)):
        char = text[index]

        if in_string:
            if escape:
                escape = False
            elif char == "\\":
                escape = True
            elif char == '"':
                in_string = False
            continue

        if char == '"':
            in_string = True
        elif char == "[":
            depth += 1
        elif char == "]":
            depth -= 1
            if depth == 0:
                return text[start : index + 1]

    return None


def count_top_level_objects(source: str) -> int:
    count = 0
    depth = 0
    in_string = False
    escape = False

    for char in source:
        if in_string:
            if escape:
                escape = False
            elif char == "\\":
                escape = True
            elif char == '"':
                in_string = False
            continue

        if char == '"':
            in_string = True
        elif char == "{":
            if depth == 0:
                count += 1
            depth += 1
        elif char == "}":
            depth = max(0, depth - 1)

    return count


def main() -> int:
    failures = []

    for relative_path, markers in REQUIRED_MARKERS.items():
        path = ROOT / relative_path
        if not path.exists():
            failures.append(f"Missing required file: {relative_path}")
            continue

        text = read_text(relative_path)
        for marker in markers:
            if marker not in text:
                failures.append(f"{relative_path} is missing marker: {marker}")

    for relative_path, spec in CONTENT_BANKS.items():
        text = read_text(relative_path)
        array_source = extract_array(text, spec["array_name"])
        if array_source is None:
            failures.append(f"{relative_path} is missing array: {spec['array_name']}")
            continue

        item_count = count_top_level_objects(array_source)
        if item_count < spec["min_items"]:
            failures.append(
                f"{relative_path} has {item_count} items; expected at least {spec['min_items']}"
            )

        for field in spec["fields"]:
            if not re.search(rf"\b{re.escape(field)}\s*:", array_source):
                failures.append(f"{relative_path} is missing content field: {field}")

    for relative_path, spec in SEED_FILES.items():
        path = ROOT / relative_path
        if not path.exists():
            failures.append(f"Missing seed file: {relative_path}")
            continue

        try:
            seed = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as error:
            failures.append(f"{relative_path} is not valid JSON: {error}")
            continue

        records = seed.get("records")
        if not isinstance(records, list):
            failures.append(f"{relative_path} must contain a records list")
            continue

        if len(records) != spec["count"]:
            failures.append(
                f"{relative_path} has {len(records)} records; expected {spec['count']}"
            )

        for index, record in enumerate(records):
            if not isinstance(record, dict):
                failures.append(f"{relative_path} record {index} is not an object")
                continue
            for field in spec["fields"]:
                if field not in record:
                    failures.append(f"{relative_path} record {index} is missing field: {field}")
                    break

    for relative_path, spec in LESSON_SEEDS.items():
        path = ROOT / relative_path
        if not path.exists():
            failures.append(f"Missing lesson seed file: {relative_path}")
            continue

        try:
            seed = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as error:
            failures.append(f"{relative_path} is not valid JSON: {error}")
            continue

        lesson = seed.get("lesson")
        if not isinstance(lesson, dict):
            failures.append(f"{relative_path} must contain a lesson object")
            continue

        if lesson.get("id") != spec["lesson_id"]:
            failures.append(
                f"{relative_path} lesson id is {lesson.get('id')!r}; "
                f"expected {spec['lesson_id']!r}"
            )

        steps = lesson.get("steps")
        if not isinstance(steps, list):
            failures.append(f"{relative_path} lesson must contain a steps list")
            continue

        if len(steps) != spec["step_count"]:
            failures.append(
                f"{relative_path} has {len(steps)} steps; expected {spec['step_count']}"
            )

        for index, step in enumerate(steps):
            if not isinstance(step, dict):
                failures.append(f"{relative_path} step {index} is not an object")
                continue
            if step.get("type") not in spec["allowed_types"]:
                failures.append(
                    f"{relative_path} step {index} has invalid type: {step.get('type')!r}"
                )
            if "order" not in step:
                failures.append(f"{relative_path} step {index} is missing order")
            if "text" not in step:
                failures.append(f"{relative_path} step {index} is missing text")

    if failures:
        print("Prototype smoke check failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Prototype smoke check passed.")
    print(
        f"Checked {len(REQUIRED_MARKERS)} key files, "
        f"{len(CONTENT_BANKS)} content banks, "
        f"{len(SEED_FILES)} seed files, and {len(LESSON_SEEDS)} lesson seeds."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
