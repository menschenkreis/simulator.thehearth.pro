# The Hearth Mastery: App Readiness Audit Brief

## Context

The Hearth Mastery is currently a browser-based guitar-learning simulator prototype. It contains an interactive map, learning nodes, structured Journeys, lessons, drills, practice tools, learner profiles, progress tracking, audio features, guide characters, and visual teaching environments.

The long-term intention is to turn this prototype into a genuine installable application without unnecessarily rebuilding the entire experience.

The preferred route is:

**Current prototype → responsive web application → installable Progressive Web App → Apple App Store and Google Play package**

## Audit Objective

Assess what work is required to transform the existing prototype into a reliable, maintainable, secure, mobile-ready application.

This is an audit and planning task. Do not fundamentally redesign or rewrite the simulator yet.

## Questions To Answer

### 1. Current Architecture

- What technologies and structural patterns does the prototype currently use?
- Which parts are reasonably reusable?
- Which parts are fragile, overly coupled, duplicated, or hardcoded?
- Are the interface, learning content, simulator logic, and saved data properly separated?
- What would make future developer handover difficult?

### 2. Essential Product Scope

Identify the minimum feature set required for a credible first app release.

Consider:

- User accounts
- Multiple learner profiles
- Teacher access to student progress
- Journey levels and lessons
- Do drills and drill feedback
- Practice sessions and timers
- Progress history
- Reflections and lesson reviews
- Audio, metronome, tuner, and recording
- Learning resources
- Offline or unreliable-connection behaviour
- Notifications or practice reminders

Separate these into:

- Required for first release
- Useful soon after release
- Future expansion

### 3. Backend Requirements

Determine what must move from browser storage into a secure backend.

Assess requirements for:

- Authentication and account recovery
- Learner and teacher relationships
- Cloud progress saving
- Lesson records and reflections
- Drill feedback
- Practice history
- Uploaded recordings
- Content and media storage
- Data backups
- Data export and deletion
- Synchronisation between devices
- Administrative tools
- Analytics and error reporting

Propose a minimum backend data model and API boundary without overengineering it.

### 4. Mobile And PWA Readiness

Assess whether the current simulator can become a responsive Progressive Web App.

Review:

- Phone and tablet layouts
- Touch targets and gestures
- Screen orientation
- Loading performance
- Image and audio sizes
- Offline caching
- Installation behaviour
- App icons and launch screens
- Safe areas on modern phones
- Microphone and audio permissions
- Accessibility
- Keyboard and screen-reader support

Pay particular attention to iPad because it may be the most natural device for practising guitar.

### 5. App Store Packaging

Assess whether the finished web application could be packaged using Capacitor or a similar wrapper.

Identify:

- Native features that require plugins
- Microphone and recording requirements
- Audio playback limitations
- Notifications
- File storage
- Subscription or payment considerations
- Apple and Google privacy requirements
- Store review risks
- App icons, screenshots, descriptions, and release materials

Compare this route with building fully native iOS and Android applications. Recommend the least expensive approach that preserves quality.

### 6. Security And Privacy

Identify risks relating to:

- User credentials
- Student information
- Teacher notes
- Audio recordings
- Personal reflections
- Exposed server credentials or secrets
- Unsafe browser storage
- Third-party media and tracking
- Children or younger learners
- Privacy policies and consent

Flag any issue that should be corrected before public testing.

### 7. Performance And Reliability

Assess:

- Initial loading time
- Large images and generated assets
- Audio loading
- Browser memory use
- Repeated scripts or styles
- Error handling
- Data-loss risks
- Slow or unstable connections
- Automated tests
- Regression protection
- Monitoring after release

Recommend practical improvements rather than premature large-scale rewriting.

### 8. Shared Simulator Engine

The architecture may eventually support other simulators, including a medical learning simulator.

Identify what should belong to a reusable simulator core:

- Accounts and profiles
- Maps and nodes
- Journeys and levels
- Lessons and teaching steps
- Practice or testing activities
- Progress events
- Reflections
- Guide characters
- Resources
- Unlock conditions

Clearly separate this reusable core from guitar-specific systems such as fretboards, chords, rhythm tools, guitar drills, tuners, and musical audio.

## Required Deliverables

Produce:

1. A plain-language executive summary.
2. A current-state architecture map.
3. An app-readiness score for each major area.
4. A list of serious risks and blockers.
5. A recommended target architecture.
6. A phased development roadmap.
7. A minimum viable first-release definition.
8. A backend requirements and data-model outline.
9. A PWA and mobile-readiness checklist.
10. An App Store packaging and release checklist.
11. Rough effort ranges for each phase.
12. Recommendations on what Ayla can continue building now and what should wait for a professional developer.

## Roadmap Format

Organise the recommended work into these phases:

- **Phase 0:** Protect and document the existing prototype
- **Phase 1:** Stabilise the core learning experience
- **Phase 2:** Responsive web application and PWA
- **Phase 3:** Secure backend and user accounts
- **Phase 4:** Closed testing with real learners
- **Phase 5:** App Store packaging and release
- **Phase 6:** Shared simulator engine extraction

For every phase, specify:

- Objective
- Required work
- Dependencies
- Main risks
- Completion criteria
- Rough effort
- Whether Ayla, Codex, or a professional developer should own it

## Audit Principles

- Explain findings in plain language suitable for a novice.
- Be honest about fragile architecture and unrealistic expectations.
- Preserve working creative ideas wherever possible.
- Avoid recommending a complete rewrite unless evidence proves it necessary.
- Prefer incremental migration over rebuilding everything at once.
- Protect the simulator’s visual and emotional identity.
- Do not confuse prototype completion with production readiness.
- Do not change files unless explicitly authorised.
- Flag any recommendation likely to consume substantial time or money.
- Optimise for a small, credible first release rather than every imagined feature.

## Central Question

**What is the safest, most practical, and most affordable path from the existing Hearth Mastery prototype to a polished installable application, while preserving the work already completed and keeping the architecture suitable for future simulator products?**

