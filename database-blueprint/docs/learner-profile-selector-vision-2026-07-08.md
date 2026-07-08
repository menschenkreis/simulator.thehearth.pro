# Learner Profile Selector Vision - 2026-07-08

Plain English: the "Whose Journey?" selector should evolve into a whole-simulator learner profile selector.

## Decision

Do not treat profiles as Journey-only.

The active profile should eventually apply across the whole simulator:

- Journey
- Practice
- Doing drills
- Study/books
- Play/groove work
- Create/song ideas
- Hearth reflections
- whole-simulator progress

## Why

Ayla uses the simulator in two ways:

1. as her own learner profile
2. as Jen's teacher, preparing and tracking Jen's progress

Jen should also eventually be able to use the simulator for herself under her own profile.

That means the app needs:

- active learner profile
- teacher access to student profiles
- student-owned progress
- teacher notes attached to the student, not mixed into Ayla's own progress

## UI Direction

Short-term prototype:

- rename the Journey selector from "Whose journey" to "Learner profile"
- keep it inside Journey for now
- place it in a clear screen-control row, not floating randomly in the page
- do not overbuild account permissions yet

Long-term app:

- place the active learner profile in a global app-level area
- make it feel like the current Mac user/profile context for the whole simulator
- Journey reads the active profile
- Practice reads the active profile
- Study reads the active profile
- whole-simulator progress reads the active profile
- teacher mode can switch into a student profile with clear context

## Teacher Access

Teacher access should not erase the student's perspective.

Useful modes:

- "Jen learning" = what Jen sees and does
- "Ayla teaching Jen" = teacher prep, lesson notes, next gradient, and what Ayla needs to prepare

The same student profile can support both views.

## Backend Note

Martin should model this as profiles/student records, not as one hardcoded Journey state.

Likely future shape:

- user/account
- learner profile
- teacher-student relationship
- progress events
- practice logs
- lesson attempts
- source/book activity
- teacher notes
- learner preferences

## Current Prototype Step

The current Journey selector can keep working locally, but its language should point toward the real concept:

`Learner profile`

not:

`Whose journey`
