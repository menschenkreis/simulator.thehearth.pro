#!/usr/bin/env python3
"""Smoke checks for the clean simulator core."""

from __future__ import annotations

import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

CORE_MARKERS = {
    "core/lesson-core.js": [
        "HearthLessonCore",
        "validateLessonSeed",
        "lessonSummary",
        "buildRouteSummary",
        "ACTION_RENDERER_KEYS",
    ],
    "core/README.md": [
        "Hearth Simulator Core",
        "What Belongs Here",
        "What Does Not Belong Here",
    ],
}

ACTIVE_ROUTE_COUNT = 10
UNMAPPED_ROUTE_COUNT = 2


def read_json(relative_path: str) -> dict:
    return json.loads((ROOT / relative_path).read_text(encoding="utf-8"))


def main() -> int:
    failures: list[str] = []

    for relative_path, markers in CORE_MARKERS.items():
        path = ROOT / relative_path
        if not path.exists():
            failures.append(f"Missing core file: {relative_path}")
            continue

        text = path.read_text(encoding="utf-8")
        for marker in markers:
            if marker not in text:
                failures.append(f"{relative_path} is missing marker: {marker}")

    manifest_path = ROOT / "core/foundation-route-manifest.json"
    if not manifest_path.exists():
        failures.append("Missing core/foundation-route-manifest.json")
    else:
        try:
            manifest = read_json("core/foundation-route-manifest.json")
        except json.JSONDecodeError as error:
            failures.append(f"core/foundation-route-manifest.json is not valid JSON: {error}")
            manifest = {}

        routes = manifest.get("routes")
        if not isinstance(routes, list):
            failures.append("foundation-route-manifest.json must contain a routes list")
            routes = []

        active_routes = [r for r in routes if r.get("route_status") == "active"]
        unmapped_routes = [
            r for r in routes if r.get("route_status") == "loaded_but_not_currently_mapped"
        ]

        if len(active_routes) != ACTIVE_ROUTE_COUNT:
            failures.append(
                f"foundation route manifest has {len(active_routes)} active routes; "
                f"expected {ACTIVE_ROUTE_COUNT}"
            )

        if len(unmapped_routes) != UNMAPPED_ROUTE_COUNT:
            failures.append(
                f"foundation route manifest has {len(unmapped_routes)} unmapped routes; "
                f"expected {UNMAPPED_ROUTE_COUNT}"
            )

        seen_topics = set()
        seen_lessons = set()
        for index, route in enumerate(routes):
            if not isinstance(route, dict):
                failures.append(f"route {index} is not an object")
                continue

            lesson_id = route.get("lesson_id")
            seed_file = route.get("seed_file")
            route_status = route.get("route_status")

            if not lesson_id:
                failures.append(f"route {index} is missing lesson_id")
            if not seed_file:
                failures.append(f"route {index} is missing seed_file")
                continue
            if route_status not in {"active", "loaded_but_not_currently_mapped"}:
                failures.append(f"route {index} has invalid route_status: {route_status!r}")

            if route.get("topic_id"):
                if route["topic_id"] in seen_topics:
                    failures.append(f"duplicate topic_id in route manifest: {route['topic_id']}")
                seen_topics.add(route["topic_id"])

            if lesson_id in seen_lessons:
                failures.append(f"duplicate lesson_id in route manifest: {lesson_id}")
            seen_lessons.add(lesson_id)

            seed_path = ROOT / seed_file
            if not seed_path.exists():
                failures.append(f"route seed file does not exist: {seed_file}")
                continue

            try:
                seed = json.loads(seed_path.read_text(encoding="utf-8"))
            except json.JSONDecodeError as error:
                failures.append(f"{seed_file} is not valid JSON: {error}")
                continue

            lesson = seed.get("lesson")
            if not isinstance(lesson, dict):
                failures.append(f"{seed_file} must contain a lesson object")
                continue

            if lesson.get("id") != lesson_id:
                failures.append(
                    f"{seed_file} lesson id is {lesson.get('id')!r}; expected {lesson_id!r}"
                )

            if route_status == "active" and not route.get("topic_id"):
                failures.append(f"active route for {lesson_id} must have a topic_id")

            if route_status == "loaded_but_not_currently_mapped" and route.get("topic_id") is not None:
                failures.append(f"unmapped route for {lesson_id} must have topic_id null")

    if failures:
        print("Core smoke check failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Core smoke check passed.")
    print(
        f"Checked {len(CORE_MARKERS)} core files, "
        f"{ACTIVE_ROUTE_COUNT} active routes, and {UNMAPPED_ROUTE_COUNT} unmapped routes."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
