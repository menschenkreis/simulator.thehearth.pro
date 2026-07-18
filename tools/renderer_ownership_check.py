#!/usr/bin/env python3
"""Check which files own the active node renderer globals.

This catches the old prototype problem where two files define the same
``window.showX`` function and the last loaded file silently wins.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "simulator.html"

EXPECTED_ACTIVE_OWNERS = {
    "showHearth": "adapters/hearth-body-viewer.js",
    "showPlay": "adapters/play-atlas-viewer.js",
    "showStudy": "adapters/study-key-chamber-viewer.js",
    "showCreate": "adapters/create-entry-controller.js",
    "showPractice": "adapters/practice-entry-controller.js",
    "showMastery": "adapters/mastery-phoenix-viewer.js",
}


def script_sources() -> list[str]:
    html = HTML.read_text(encoding="utf-8")
    return re.findall(r'<script\s+src="([^"]+)"', html)


def normalized_source(src: str) -> str:
    return src.split("?", 1)[0]


def renderer_assignments(source: str) -> set[str]:
    path = ROOT / normalized_source(source)
    if not path.exists():
        return set()
    text = path.read_text(encoding="utf-8")
    found = set()
    for renderer in EXPECTED_ACTIVE_OWNERS:
        renderer_name = re.escape(renderer)
        if re.search(r"\b(?:window|root)\." + renderer_name + r"\s*=", text):
            found.add(renderer)
    return found


def main() -> int:
    active: dict[str, str] = {}
    history: dict[str, list[str]] = {key: [] for key in EXPECTED_ACTIVE_OWNERS}

    for source in script_sources():
        clean_source = normalized_source(source)
        for renderer in renderer_assignments(source):
            active[renderer] = clean_source
            history[renderer].append(clean_source)

    problems: list[str] = []
    for renderer, expected_owner in EXPECTED_ACTIVE_OWNERS.items():
        actual_owner = active.get(renderer)
        if actual_owner != expected_owner:
            prior = ", ".join(history[renderer]) or "none found"
            problems.append(
                f"{renderer} should be owned by {expected_owner}, "
                f"but active owner is {actual_owner or 'missing'}; seen in: {prior}"
            )

    if problems:
        print("Renderer ownership check failed:")
        for problem in problems:
            print(f"- {problem}")
        return 1

    print("Renderer ownership check passed.")
    for renderer, owner in EXPECTED_ACTIVE_OWNERS.items():
        duplicate_count = max(0, len(history[renderer]) - 1)
        duplicate_note = f" ({duplicate_count} earlier duplicate)" if duplicate_count else ""
        print(f"- {renderer}: {owner}{duplicate_note}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
