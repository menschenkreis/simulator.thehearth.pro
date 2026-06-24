# Video Resource Access Plan

## Principle

Videos should be catalogued as external learning resources unless The Hearth owns the video or has explicit permission to host it.

The app should not copy private course content into the database.

## JustinGuitar

The onboarding URL:

`https://www.justinguitar.com/onboarding`

redirects to:

`https://www.justinguitar.com/users/sign_in`

This means the onboarding flow is account-gated.

Recommended treatment:

- catalogue public JustinGuitar lesson pages as external resources
- catalogue public YouTube videos where available
- mark account-gated paths as `External Account Required`
- do not scrape logged-in pages
- do not copy lesson text, exercises, or private course flow into The Hearth
- use JustinGuitar as a progression benchmark and external support layer

Current access note:

Ayla has created a JustinGuitar login. This means she can manually review account-gated onboarding/course material for her own learning and planning.

Do not store JustinGuitar credentials in the project, database, docs, or source files.

For the simulator, keep JustinGuitar resources as external links with access notes such as:

- `Public`
- `Free Account Required`
- `External Account Required`
- `Paid / App Required`

## Student Experience

The Hearth can show:

- resource title
- creator
- why this helps
- related node/level
- external link
- status such as `Public`, `External Account Required`, `To Review`

For account-gated resources, the button should open the external site and let the learner log in there.

## Database Fields To Support

Video/resource records should support:

- title
- creator
- platform
- resource type
- URL
- access type: `Public`, `Free Account Required`, `Paid`, `Unknown`
- related node
- related level
- related discipline
- source status
- why useful
- review notes

## Immediate Recommendation

Do not build a video scraper.

Start by cataloguing:

1. QJam roadmap videos already extracted
2. JustinGuitar public beginner lesson URLs and visible site-map structure
3. Marty Music links when Ayla has chosen specific songs/lessons
4. The Hearth's own future videos

This keeps video support useful without making the simulator dependent on another site's private course system.

Current JustinGuitar screenshot-derived journey notes:

- `database-blueprint/source/justinguitar_screenshot_journey_seed.csv`
- `database-blueprint/docs/justinguitar-journey-gap-analysis.md`
