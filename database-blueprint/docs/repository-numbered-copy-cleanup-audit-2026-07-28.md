# Repository Numbered-Copy Cleanup Audit

Date: 2026-07-28

Repository: `simulator.thehearth.pro`

Status: Read-only audit complete. No duplicate files deleted or moved.

## Summary

The worktree contains 720 untracked files whose names add ` 2`, ` 3`, or ` 4`
immediately before the extension.

Examples:

- `adapters/create-state 2.js`
- `database-blueprint/docs/journey-strategy-v1 2.md`
- `images/foundation/foundation-unlocks-neck-v1-alpha 3.png`

Together these numbered files use 244,704,545 bytes (approximately 233.4 MiB).
Every numbered file has a corresponding tracked original path.

## Verification Method

The audit:

1. obtained the untracked paths from Git;
2. removed the numbered suffix to identify each intended original;
3. calculated each copy's Git blob hash;
4. compared that hash with the original blob recorded in Git's index.

This compares the actual file contents rather than relying on names, sizes, or
timestamps.

## Results

| Result | Count |
| --- | ---: |
| Byte-identical to tracked original | 717 |
| Different from tracked original | 3 |
| Missing an original | 0 |
| Total | 720 |

The 717 exact copies contain no unique work and are safe cleanup candidates.

## Three Different Files

### `assets/js/journey-data 2.js`

This is an older copy of `assets/js/journey-data.js`.

The only content difference is that the copy lacks:

```js
consolidationFocus: "A minor pentatonic consolidation",
```

The tracked original is newer, is loaded by `simulator.html`, and contains the
current Jen consolidation information. The numbered copy is not referenced.

Conclusion: stale copy; safe cleanup candidate.

### `assets/js/scene-first 3.js`

This contains an older 15,520-byte renderer implementation. The active tracked
`assets/js/scene-first.js` is now a 485-byte compatibility placeholder because the
node renderers have named owners in `adapters/`.

The numbered copy is not referenced by `simulator.html` or another source file.

Conclusion: retired implementation copy; preserve through Git history, not in the
working directory.

### `assets/js/scene-first 4.js`

This is byte-identical to `assets/js/scene-first 3.js`, even though both differ from
the current tracked placeholder.

The numbered copy is not referenced.

Conclusion: duplicate of the same retired implementation; safe cleanup candidate.

## Cleanup Recommendation

All 720 numbered files are safe candidates for removal from the worktree:

- 717 are exact copies of the tracked originals;
- 1 is an older Journey data copy;
- 2 are identical copies of a retired renderer;
- none is referenced by the active simulator;
- all intended originals exist in Git.

Before deletion:

1. keep a normal filesystem backup or Time Machine checkpoint;
2. close any cloud-sync conflict dialog that may be recreating the files;
3. confirm no other task is actively writing to this repository;
4. delete only paths still reported by Git as untracked and still matching the
   numbered-copy rule;
5. do not delete the unnumbered originals;
6. run all smoke, ownership, reference, and diff checks afterward.

Deletion was intentionally not performed in this audit because it is destructive and
requires explicit approval.

## Prevention

The pattern is consistent with conflict-style copies created outside Git. The exact
creating process is not proven.

Recommended prevention:

- keep active Git repositories in a location that is not being duplicated by a
  cloud conflict process;
- use Git commits and branches for versions instead of Finder copies;
- avoid working on the same repository through multiple synchronizing tools;
- add a pre-commit check that rejects source files ending in ` 2`, ` 3`, or ` 4`;
- keep generated previews and source images in clearly separated asset directories.

