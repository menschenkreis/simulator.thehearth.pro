#!/usr/bin/env python3
"""Check the JavaScript files loaded by the simulator entry page."""

from __future__ import annotations

import os
import shutil
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
ENTRY = ROOT / "simulator.html"


class ScriptCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.sources: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() != "script":
            return
        source = dict(attrs).get("src")
        if source:
            self.sources.append(source)


def local_path(reference: str) -> Path | None:
    parsed = urlsplit(reference)
    if parsed.scheme or parsed.netloc:
        return None
    clean = unquote(parsed.path).strip()
    if not clean:
        return None
    candidate = (ROOT / clean.lstrip("/")).resolve()
    try:
        candidate.relative_to(ROOT)
    except ValueError:
        return None
    return candidate


def node_binary() -> str | None:
    configured = os.environ.get("NODE_BIN", "").strip()
    if configured:
        return configured
    return shutil.which("node")


def main() -> int:
    if not ENTRY.exists():
        print("Loaded JavaScript syntax check failed: simulator.html is missing.")
        return 1

    node = node_binary()
    if not node or not Path(node).exists():
        print("Loaded JavaScript syntax check skipped: set NODE_BIN or install Node.js.")
        return 0

    collector = ScriptCollector()
    collector.feed(ENTRY.read_text(encoding="utf-8"))
    scripts: list[Path] = []
    missing: list[str] = []
    for source in collector.sources:
        path = local_path(source)
        if path is None:
            continue
        if not path.exists():
            missing.append(source)
            continue
        if path.suffix.lower() == ".js" and path not in scripts:
            scripts.append(path)

    failures: list[tuple[Path, str]] = []
    for path in scripts:
        result = subprocess.run(
            [node, "--check", str(path)],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        if result.returncode:
            detail = (result.stderr or result.stdout).strip()
            failures.append((path, detail))

    if missing or failures:
        print("Loaded JavaScript syntax check failed.")
        for source in missing:
            print(f"- Missing script: {source}")
        for path, detail in failures:
            print(f"- Syntax error: {path.relative_to(ROOT)}")
            if detail:
                print(detail)
        return 1

    print(f"Loaded JavaScript syntax check passed for {len(scripts)} files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
