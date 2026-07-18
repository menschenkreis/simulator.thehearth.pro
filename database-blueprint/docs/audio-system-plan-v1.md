# Hearth Audio System v1

## Purpose

Sound should make the simulator feel touched, played, and alive without becoming noisy or distracting. Every sound has one clear job.

## Three Sound Families

| Family | Purpose | Examples |
| --- | --- | --- |
| Interface | Confirm a meaningful action | map-node arrival, back, opening a book |
| Musical acknowledgement | Mark evidence of learning or a small achievement | clean take, finished session, lesson completion |
| Musical environment | Give the learner something to play with | practice pulse, backing groove, call-and-response bed |

Ordinary controls should remain quiet. Guitar sounds are reserved for node arrival, a deliberate drill action, a clean take, or a meaningful completion.

## Map Sound Rule

Each main map node gets one short guitar identity sound. It plays when the learner opens that node, never on hover and never more than once for the same opening action.

Initial candidate palette, awaiting audition approval:

| Node | Candidate source | Intended feeling |
| --- | --- | --- |
| Foundation | `Single 6_C.wav` | first clear note / invitation |
| Do | `Single 2_E.wav` | physical contact / forward motion |
| Practise | `Single 9_A.wav` | a settled home note |
| Play | `Strum 22_Amin.wav` | immediate musical movement |
| The Hearth | `gtrchord_Emin7.wav` | inward, warm reflection |
| Know | `Single 4_G.wav` | a small insight |
| Study | `Chord 2_D.wav` | focus and resolution |
| Create | `Chord 24_EMaj7.wav` | colour and possibility |
| Mastery | `COY_Guitar_Chord_Gmaj7.wav` | open arrival, never triumphalism |
| Clean take | `Dobro - High Vibrato_1_D.wav` | a small expressive reward |

These filenames are source candidates only. The approved app files will receive stable, readable names such as `node-practise-a.m4a`.

## Practice And Play-Along Rule

Practice loops are a separate library from interface sounds. Every loop must declare:

```text
id
title
instrumentation
key
bpm
time_signature
length_bars
loopable
energy
use_case
rights_status
source_master
```

The first Level 1 target set is:

1. A minor root-note pulse at 60, 76, and 100 BPM.
2. A minor rhythm-guitar bed with empty space for lead guitar.
3. A simple call-and-response bed for two players.
4. A rhythm and lead version of one song-friendly A-minor arrangement.

## Storage Rule

- Keep original WAV masters in Ayla's organised source library and a cloud backup.
- Add only approved, compressed app copies to `assets/audio/`.
- Keep short interface sounds under roughly 150 KB where practical.
- Keep loops compressed and load them only when a learner opens that practice or Play activity.
- Do not bundle commercial recordings or samples without confirmed app-use rights.

## Implementation Rule

The eventual shared audio manager will read a manifest rather than scattering file paths through node code. It will:

1. Respect the learner's sound setting.
2. Play one environment or backing loop at a time.
3. Allow short interface sounds to overlap lightly.
4. Fall back to the current synthesized sound while an asset is unavailable.
5. Keep map sound assignments separate from practice-loop assignments.

## Approval Workflow

1. Audition a small candidate palette.
2. Approve, replace, or silence individual map-node candidates.
3. Import only the approved files and give them stable app names.
4. Add the map sounds through the central audio manager.
5. Catalogue drum material separately as Level 1 grooves and play-alongs.
