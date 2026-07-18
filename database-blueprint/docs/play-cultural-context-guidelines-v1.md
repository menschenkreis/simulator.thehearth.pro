# Play Cultural Context Guidelines V1

Status: approved design principle and first research example; not yet visible in
the active simulator.

## Purpose

Play should teach more than a musical surface.

Every destination should help the learner understand how people, place,
language, history, work, ritual, migration, oppression, celebration, technology,
and available instruments shaped the music.

Culture is not a trivia panel. It should change how the learner listens and
plays.

## Tradition First, Not Style First

The atlas is not a genre catalogue.

A style label can help somebody recognize a sound, but it is only the surface.
Each destination must be modelled as a living tradition:

- the named people and communities who carry it
- what the music does in people's lives
- the settings where it is practised
- the voices, instruments, movement, dance, language, or ritual involved
- how it is taught and passed on
- historical forces that shaped or pressured it
- how it lives and changes now
- the learner's respectful relationship to it

The Peru and charango example is the guiding principle: an instrument or musical
gesture becomes more meaningful when the learner can see the human conditions,
adaptation, memory, and continuity held inside it. This principle applies to
every destination, not only Peru.

## The Short Cultural Doorway

Each Play activity should contain a short cultural doorway after the first
listen and before the learner copies the sound.

It should answer:

1. Who made and carried this music?
2. Where and when did it grow?
3. What was the music doing in people's lives?
4. What instrument, movement, language, or historical condition shaped it?
5. What should the learner hear or play differently after knowing this?

Keep this doorway to roughly 20-60 seconds in the main Play route. Offer a
deeper sourced route into Knowing or Study without interrupting musical flow.

## Claim Statuses

Every cultural claim must use one of these statuses:

- `documented`: supported directly by reliable historical or institutional
  evidence.
- `supported_interpretation`: a responsible interpretation supported by named
  scholarship.
- `oral_tradition`: a community story, memory, or account whose value does not
  depend on proving it as literal history.
- `contested`: credible sources disagree or the origin remains debated.
- `needs_review`: interesting draft material that must not appear as fact yet.

The learner-facing language should match the status.

Examples:

- Documented: `Archival records show...`
- Supported interpretation: `Researchers connect this sound to...`
- Oral tradition: `One story carried by musicians says...`
- Contested: `There is no single agreed origin...`
- Needs review: do not show it as educational copy.

## Peru And Charango Example

### What We Can Say Carefully

- Colonial Peru did experience organized campaigns against Indigenous
  religious practices. The `Extirpation of Idolatry` was institutionalized in
  the archbishopric of Lima in 1610. This is related to colonial religious
  repression, but it should not be casually labelled as the Spanish Inquisition.
- The charango developed in the Andes through Indigenous adaptation of European
  string instruments. Sources debate whether the closest ancestor was the
  vihuela, mandolin, timple, or a combination of influences.
- The charango's small size, paired courses, high register, and living role in
  Andean communities are well established.
- A story says a small charango could be concealed beneath a poncho when
  Indigenous music or instruments were prohibited. Treat this as oral tradition
  or collective memory, not settled documentary fact.
- We currently do not have adequate evidence for the stronger claim that the
  instrument was played quickly because it had to be hidden. Keep that as a
  research question rather than teaching it.

### Example Learner Copy

> The charango grew from a meeting that was not equal: European string
> instruments arrived through colonization, and Andean makers and musicians
> transformed them into something with its own local voice. One story says its
> small body could be hidden beneath a poncho when Indigenous music was
> suppressed. Historians treat that detail as cultural memory rather than a
> fully proven origin story. Listen now for how its bright doubled strings carry
> rhythm and melody together.

This copy preserves the emotional meaning while stating what is and is not
certain.

## Sources For The Example

1. Julio Mendivil, `La construccion de la historia: el charango en la memoria
   colectiva mestiza ayacuchana`, Revista Musical Chilena:
   https://revistas.uchile.cl/index.php/RMCH/article/download/12491/12803
2. Iris Gareis, `Extirpacion de idolatrias e identidad cultural en las
   sociedades andinas del Peru virreinal (siglo XVII)`, Boletin de Antropologia:
   https://doi.org/10.17533/udea.boan.6974
3. Peru Info, `Por que el charango es tan especial en la musica andina?`:
   https://peru.info/es-pe/talento/blogperu/6/24/-por-que-el-charango-es-tan-especial-en-la-musica-andina--te-lo-contamos-a-traves-de-jaime-guardia
4. Smithsonian Folkways, `Peru: Andean Music of Life, Work, and Celebration`:
   https://folkways.si.edu/peru-andean-music-of-life-work-and-celebration/world/music/album/smithsonian

## Content Structure

Each destination should include a tradition profile and a sourced cultural
context.

The tradition profile answers what kind of human practice the learner is
entering:

```text
tradition_profile {
  community_names[]
  place_and_period
  social_functions[]
  practice_settings[]
  instruments_and_voices[]
  embodied_practices[]
  transmission
  historical_forces[]
  living_now
  learner_relationship_note
}
```

The cultural context carries learner-facing copy and its evidence:

```text
people_and_place
cultural_doorway
sound_connection
living_tradition
respectful_listening_prompt
terms[]
claims[] {
  id
  text
  status
  source_ref_ids[]
  learner_label
  editorial_note
}
source_refs[]
community_review_status
community_reviewer
```

## Ethical And Editorial Rules

- Name people and communities rather than treating a country as one culture.
- Present traditions as living and changing, not frozen museum objects.
- Prefer artists, researchers, archives, and institutions connected to the
  source communities.
- Credit performers and recording contexts.
- Distinguish nation, region, ethnicity, language, genre, and instrument.
- Avoid `where it all began`, `primitive`, `pure`, `exotic`, and similar total
  claims.
- Explain colonial violence plainly without turning it into decorative drama.
- Do not imply one person can complete or master a culture by finishing an app
  activity.
- Record corrections and community review rather than treating metadata as
  permanently finished.

## Revised Play Sequence

```text
arrive
-> listen
-> meet the people and place
-> connect culture to what is audible
-> find the pulse
-> find home
-> join
-> converse
-> explore
-> own one musical choice
-> remember and credit the source
```

The cultural doorway is brief in Play. Longer history, biographies, interviews,
and source reading belong in Knowing or Study and should link back to the same
destination.

## Progress Meaning

Do not mark a culture as `completed`.

Play may remember that a learner:

- listened to a sourced recording
- learned one cultural context
- tried one musical gesture
- saved an artist or tradition for deeper study
- reflected on how context changed their listening

Progress belongs to the learner's relationship with the material, not ownership
of the culture.

## First Implementation Rule

Before expanding the atlas, fully research and review the cultural doorway for
the first `A Minor Musical Conversation` activity. The current Mississippi Delta
copy is draft and must receive the same source and claim-status treatment as the
charango example.

The first implementation must also pass a `tradition_profile` check. A location,
genre label, technique list, and famous-artist list are not enough to publish a
destination.
