#!/usr/bin/env python3
"""Smoke checks for the clean simulator core."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from core_seed_loader import foundation_topic_index, load_foundation_route_seeds


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
    "core/foundation-adapter.js": [
        "HearthFoundationAdapter",
        "getLessonForTopic",
        "findRouteByTopic",
        "listTopicLessons",
    ],
    "core/renderer-registry.js": [
        "HearthRendererRegistry",
        "createRegistry",
        "requireRenderer",
        "register",
    ],
    "core/lesson-view-model.js": [
        "HearthLessonViewModel",
        "buildLessonViewModel",
        "buildTopicLessonViewModel",
        "summarizeStep",
    ],
    "core/lesson-session.js": [
        "HearthLessonSession",
        "createLessonSession",
        "advanceLesson",
        "evaluateChoice",
        "completeLesson",
    ],
    "core/learner-progress.js": [
        "HearthLearnerProgress",
        "createProgressRecord",
        "markLessonCompleted",
        "recordLessonAnswer",
        "summarizeProgress",
    ],
    "core/progress-event.js": [
        "HearthProgressEventContract",
        "validateAndNormalize",
        "normalizeForRead",
        "sameNormalizedPayload",
        "toJourneyEvidenceStage",
    ],
    "core/journey-progress.js": [
        "HearthJourneyProgress",
        "normalizeLevelId",
        "summarize",
        "capabilityEvidence",
    ],
    "core/level-one-song-thread.js": [
        "HearthLevelOneSongThread",
        "level-1-a-minor-homecoming",
        "A Minor Homecoming",
        "no commercial song",
    ],
    "core/play-domain.js": [
        "HearthPlayDomain",
        "normalizeDestination",
        "validateCultureContext",
        "buildMarkerStates",
        "toProgressEvent",
        "createPracticeRecommendation",
    ],
}

ACTIVE_ROUTE_COUNT = 10
UNMAPPED_ROUTE_COUNT = 2
ACTION_RENDERER_COUNT = 4
EXPECTED_ACTIVE_TOPICS = {
    "f-threshold",
    "f-how-to-learn",
    "f-music-language",
    "f-musical-alphabet",
    "f-rhythm-pulse",
    "f-guitar-map",
    "f-instrument-body",
    "f-hands-sound",
    "f-first-shapes",
    "f-first-conversation",
}


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

        active_topics = {route.get("topic_id") for route in active_routes}
        if active_topics != EXPECTED_ACTIVE_TOPICS:
            failures.append(
                "foundation active topics differ from expected set: "
                f"{sorted(active_topics)}"
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

        try:
            topic_index = foundation_topic_index()
            if set(topic_index) != EXPECTED_ACTIVE_TOPICS:
                failures.append(
                    "core_seed_loader foundation topic index differs from expected set: "
                    f"{sorted(topic_index)}"
                )
        except (ValueError, json.JSONDecodeError) as error:
            failures.append(f"core_seed_loader failed to build topic index: {error}")

        try:
            route_seeds = load_foundation_route_seeds(include_unmapped=True)
            if len(route_seeds) != ACTIVE_ROUTE_COUNT + UNMAPPED_ROUTE_COUNT:
                failures.append(
                    f"core_seed_loader loaded {len(route_seeds)} route seeds; "
                    f"expected {ACTIVE_ROUTE_COUNT + UNMAPPED_ROUTE_COUNT}"
                )
            for lesson_id, seed in route_seeds.items():
                steps = seed.get("lesson", {}).get("steps", [])
                if not steps:
                    failures.append(f"{lesson_id} has no steps for view model")
                    continue
                if steps[0].get("order") != 1:
                    failures.append(f"{lesson_id} first view-model step must have order 1")
                if steps[-1].get("type") not in {"speak", "end"}:
                    failures.append(
                        f"{lesson_id} last view-model step has unexpected type: "
                        f"{steps[-1].get('type')!r}"
                    )
        except (ValueError, json.JSONDecodeError) as error:
            failures.append(f"core_seed_loader failed to load route seeds: {error}")

    renderer_manifest_path = ROOT / "core/action-renderer-manifest.json"
    if not renderer_manifest_path.exists():
        failures.append("Missing core/action-renderer-manifest.json")
    else:
        try:
            renderer_manifest = read_json("core/action-renderer-manifest.json")
        except json.JSONDecodeError as error:
            failures.append(f"core/action-renderer-manifest.json is not valid JSON: {error}")
            renderer_manifest = {}

        renderers = renderer_manifest.get("renderers")
        if not isinstance(renderers, list):
            failures.append("action-renderer-manifest.json must contain a renderers list")
            renderers = []

        if len(renderers) != ACTION_RENDERER_COUNT:
            failures.append(
                f"action-renderer-manifest.json has {len(renderers)} renderers; "
                f"expected {ACTION_RENDERER_COUNT}"
            )

        core_source = (ROOT / "core/lesson-core.js").read_text(encoding="utf-8")
        renderer_keys = set()
        for index, renderer in enumerate(renderers):
            if not isinstance(renderer, dict):
                failures.append(f"renderer {index} is not an object")
                continue

            renderer_key = renderer.get("renderer_key")
            if not renderer_key:
                failures.append(f"renderer {index} is missing renderer_key")
                continue

            if renderer_key in renderer_keys:
                failures.append(f"duplicate renderer_key: {renderer_key}")
            renderer_keys.add(renderer_key)

            for field in [
                "source_file",
                "source_step_order",
                "node_id",
                "interaction_type",
                "frontend_owned_behaviors",
                "config_shape",
            ]:
                if field not in renderer:
                    failures.append(f"{renderer_key} is missing field: {field}")

            if renderer_key not in core_source:
                failures.append(f"{renderer_key} is missing from lesson-core.js ACTION_RENDERER_KEYS")

    if failures:
        print("Core smoke check failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Core smoke check passed.")
    print(
        f"Checked {len(CORE_MARKERS)} core files, "
        f"{ACTIVE_ROUTE_COUNT} active routes, {UNMAPPED_ROUTE_COUNT} unmapped routes, "
        f"and {ACTION_RENDERER_COUNT} action renderers."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
