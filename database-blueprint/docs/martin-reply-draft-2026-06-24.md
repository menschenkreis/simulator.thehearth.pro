# Martin Reply Draft

Hey M :)

Thank you. That sounds perfect, and no pressure on timing.

Yes, the working artifacts are intended to live in GitHub. I need to make sure the latest `database-blueprint/` folder is actually copied/committed there, because the working copy I am developing with AI may currently be local.

Right now the important folder is:

`database-blueprint/`

The main files to start with are:

- `database-blueprint/docs/martin-database-handoff.md`
- `database-blueprint/schema/the_hearth_mastery_schema_v1.sql`
- `database-blueprint/docs/content-model-v1.md`
- `database-blueprint/docs/backend-rebuild-priorities-v1.md`
- `database-blueprint/docs/do-not-migrate-yet-v1.md`
- `database-blueprint/docs/platform-vision-for-martin.md`

We are still treating these as blueprint artifacts, not final backend instructions. The main thing we are doing now is separating:

- shared content: lessons, nodes, books, resources, source notes, prompts
- student memory: profiles, progress, practice logs, reflections, learning preferences

The newest useful addition is that the simulator should eventually store a light learner profile/preferences layer, so the guide can adapt when someone needs a smaller step, a diagram, a word definition, a clearer next action, or a recording prompt.

We are not trying to preserve the old API. Recreating the backend cleanly is the right move.

Love,
A
