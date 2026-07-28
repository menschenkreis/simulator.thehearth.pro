# UI Navigation Taxonomy

Date: 2026-07-05

This note defines the difference between places, tools, utilities, and capture features in the simulator prototype. The goal is to keep the UI easy to transfer into a future backend/core build without duplicating buttons or hiding important actions in random places.

## Places

Places are where the learner goes in the simulator.

- Map
- Journey
- Foundation
- Do
- Practise
- Play
- Know
- Study
- Create
- Mastery
- The Hearth dashboard

Rule: places should live on the map, in Journey, or in direct navigation. They should not be mixed into support menus unless they are shortcuts.

## Tools

Tools are things the learner uses while practicing, studying, or creating.

- Metronome
- Fretboard
- Dictionary
- Notebook
- Beat Bot
- Insights
- References
- Save Link

Rule: tools belong in one Toolkit drawer. If a new helper is added later, it should go into Toolkit first instead of becoming another floating side button.

## Utilities

Utilities are app-level controls and housekeeping.

- Search
- Progress
- Settings
- Credits
- Admin/support links

Rule: utilities belong in the top-right app controls or inside Settings. They should not be presented as learning destinations.

## Capture

Capture features record what the learner is discovering or saving.

- Notes
- Insights
- Saved YouTube/resource links
- Recordings

Rule: capture features may appear in Toolkit, but they should eventually share one learner notebook/history surface so the user can find everything they saved.

## Current UI Direction

- Top center: main places only, starting with Map and Journey.
- Top right: app controls such as Search, Tools, Progress, Settings, and Credits.
- Toolkit: practical learning helpers plus capture/support helpers.
- Floating side buttons: avoid adding new ones; fold them into Toolkit or a clear panel.

## Later Cleanup Ideas

- Merge Insights into Notebook as an "Insights" tab.
- Move Save Link into a richer Resources/Captures area.
- Replace text-heavy top actions with consistent icons once the app has a stable icon pattern.
- Keep map node art inside `images/map-nodes/` so the simulator clone is self-contained.
