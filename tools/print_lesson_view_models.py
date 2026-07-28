#!/usr/bin/env python3
"""Print lightweight lesson view-model summaries from clean core seeds."""

from __future__ import annotations

from collections import Counter

from core_seed_loader import foundation_topic_index, load_foundation_route_seeds


def main() -> int:
    topic_index = foundation_topic_index()
    seeds = load_foundation_route_seeds(include_unmapped=True)

    print("Foundation lesson view-model summary")
    print("====================================")

    for topic_id, lesson_id in topic_index.items():
        lesson = seeds[lesson_id]["lesson"]
        steps = lesson["steps"]
        type_counts = Counter(step["type"] for step in steps)
        first_step = steps[0]
        last_step = steps[-1]
        print(
            f"{topic_id}: {lesson['title']} | "
            f"{len(steps)} steps | "
            f"first={first_step['type']} | last={last_step['type']} | "
            f"types={dict(sorted(type_counts.items()))}"
        )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
