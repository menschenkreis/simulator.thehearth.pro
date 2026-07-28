#!/usr/bin/env python3
"""Check static local references used by the simulator entry page."""

from __future__ import annotations

import re
import sys
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
ENTRY = ROOT / "simulator.html"
ASSET_SUFFIXES = "png|jpe?g|webp|gif|svg|mp3|wav|ogg|m4a|mp4|webm|pdf"
CSS_URL_RE = re.compile(r"url\(\s*(['\"]?)(.*?)\1\s*\)", re.IGNORECASE)
JS_ASSET_RE = re.compile(
    rf"(?P<quote>['\"`])(?P<path>[^'\"`\n]+?\.(?:{ASSET_SUFFIXES})(?:[?#][^'\"`\n]*)?)(?P=quote)",
    re.IGNORECASE,
)


@dataclass(frozen=True)
class Reference:
    value: str
    source: Path
    base: Path
    kind: str


class EntryCollector(HTMLParser):
    REFERENCE_ATTRIBUTES = {
        "script": ("src",),
        "link": ("href",),
        "img": ("src", "data-src", "srcset"),
        "source": ("src", "srcset"),
        "audio": ("src",),
        "video": ("src", "poster"),
        "object": ("data",),
        "a": ("href",),
    }

    def __init__(self, source: Path) -> None:
        super().__init__()
        self.source = source
        self.references: list[Reference] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        wanted = self.REFERENCE_ATTRIBUTES.get(tag, ())
        values = dict(attrs)
        for name in wanted:
            value = values.get(name)
            if not value:
                continue
            if name == "srcset":
                for candidate in value.split(","):
                    path = candidate.strip().split()[0] if candidate.strip() else ""
                    if path:
                        self.references.append(
                            Reference(path, self.source, self.source.parent, "html-srcset")
                        )
            else:
                self.references.append(
                    Reference(value, self.source, self.source.parent, f"html-{tag}-{name}")
                )


def ignored(value: str) -> bool:
    clean = value.strip()
    if not clean or clean.startswith(("#", "//")):
        return True
    if clean.lower().startswith(
        ("data:", "blob:", "javascript:", "mailto:", "tel:", "http:", "https:")
    ):
        return True
    return any(marker in clean for marker in ("${", "{{", "}}"))


def resolve(reference: Reference) -> tuple[Path | None, str | None]:
    value = reference.value.strip()
    if ignored(value):
        return None, None
    parsed = urlsplit(value)
    if parsed.scheme or parsed.netloc:
        return None, None
    clean = unquote(parsed.path).strip()
    if not clean:
        return None, None
    if clean.startswith("/"):
        candidate = (ROOT / clean.lstrip("/")).resolve()
    else:
        candidate = (reference.base / clean).resolve()
    try:
        candidate.relative_to(ROOT)
    except ValueError:
        return None, "escapes the repository"
    return candidate, None


def css_references(path: Path) -> list[Reference]:
    text = path.read_text(encoding="utf-8", errors="replace")
    return [
        Reference(match.group(2).strip(), path, path.parent, "css-url")
        for match in CSS_URL_RE.finditer(text)
    ]


def javascript_asset_references(path: Path) -> list[Reference]:
    text = path.read_text(encoding="utf-8", errors="replace")
    references: list[Reference] = []
    for match in JS_ASSET_RE.finditer(text):
        value = match.group("path").strip()
        if any(operator in value for operator in (" + ", "${")):
            continue
        # Browser-created asset URLs in these classic scripts resolve from the
        # simulator document, not from the JavaScript file's folder.
        references.append(Reference(value, path, ROOT, "javascript-asset"))
    return references


def main() -> int:
    if not ENTRY.exists():
        print("Local reference check failed: simulator.html is missing.")
        return 1

    collector = EntryCollector(ENTRY)
    collector.feed(ENTRY.read_text(encoding="utf-8"))
    references = list(collector.references)

    loaded_scripts: list[Path] = []
    stylesheets: list[Path] = []
    for reference in list(references):
        path, error = resolve(reference)
        if error or path is None or not path.exists():
            continue
        if path.suffix.lower() == ".js" and path not in loaded_scripts:
            loaded_scripts.append(path)
        if path.suffix.lower() == ".css" and path not in stylesheets:
            stylesheets.append(path)

    for stylesheet in stylesheets:
        references.extend(css_references(stylesheet))
    for script in loaded_scripts:
        references.extend(javascript_asset_references(script))

    failures: list[tuple[Reference, str]] = []
    checked: set[tuple[str, str, str]] = set()
    for reference in references:
        key = (str(reference.source), reference.kind, reference.value)
        if key in checked:
            continue
        checked.add(key)
        path, error = resolve(reference)
        if error:
            failures.append((reference, error))
        elif path is not None and not path.exists():
            failures.append((reference, "is missing"))

    if failures:
        print("Local reference check failed.")
        for reference, reason in failures:
            source = reference.source.relative_to(ROOT)
            print(f"- {source}: {reference.value!r} {reason}")
        return 1

    print(
        "Local reference check passed for "
        f"{len(checked)} references across simulator.html, "
        f"{len(stylesheets)} stylesheets, and {len(loaded_scripts)} scripts."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
