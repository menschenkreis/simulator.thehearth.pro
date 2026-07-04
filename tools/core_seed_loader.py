"""Helpers for loading clean core manifests and lesson seeds."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]


def read_json(relative_path: str) -> dict[str, Any]:
    return json.loads((ROOT / relative_path).read_text(encoding="utf-8"))


def load_foundation_manifest() -> dict[str, Any]:
    return read_json("core/foundation-route-manifest.json")


def load_seed_for_route(route: dict[str, Any]) -> dict[str, Any]:
    seed_file = route.get("seed_file")
    if not isinstance(seed_file, str) or not seed_file:
        raise ValueError(f"Route is missing seed_file: {route!r}")
    return read_json(seed_file)


def load_foundation_route_seeds(
    include_unmapped: bool = True,
) -> dict[str, dict[str, Any]]:
    manifest = load_foundation_manifest()
    seeds: dict[str, dict[str, Any]] = {}

    for route in manifest.get("routes", []):
        if not include_unmapped and route.get("route_status") != "active":
            continue
        seed = load_seed_for_route(route)
        lesson = seed.get("lesson", {})
        lesson_id = lesson.get("id")
        if not isinstance(lesson_id, str) or not lesson_id:
            raise ValueError(f"Seed for route {route!r} is missing lesson.id")
        seeds[lesson_id] = seed

    return seeds


def foundation_topic_index() -> dict[str, str]:
    manifest = load_foundation_manifest()
    index: dict[str, str] = {}

    for route in manifest.get("routes", []):
        if route.get("route_status") != "active":
            continue
        topic_id = route.get("topic_id")
        lesson_id = route.get("lesson_id")
        if not isinstance(topic_id, str) or not isinstance(lesson_id, str):
            raise ValueError(f"Active route is missing topic_id or lesson_id: {route!r}")
        index[topic_id] = lesson_id

    return index
