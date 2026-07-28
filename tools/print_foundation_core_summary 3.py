#!/usr/bin/env python3
"""Print the clean Foundation core route summary."""

from __future__ import annotations

from core_seed_loader import foundation_topic_index, load_foundation_route_seeds


def main() -> int:
    topic_index = foundation_topic_index()
    seeds = load_foundation_route_seeds(include_unmapped=True)

    print("Foundation core route summary")
    print("=============================")
    for topic_id, lesson_id in topic_index.items():
        lesson = seeds[lesson_id]["lesson"]
        print(f"{topic_id} -> {lesson_id} ({lesson['title']}, {len(lesson['steps'])} steps)")

    unmapped = [
        seed["lesson"]
        for seed in seeds.values()
        if seed["lesson"].get("topic_id") is None
    ]
    if unmapped:
        print()
        print("Loaded but not currently mapped")
        print("==============================")
        for lesson in unmapped:
            print(f"{lesson['id']} ({lesson['title']}, {len(lesson['steps'])} steps)")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
