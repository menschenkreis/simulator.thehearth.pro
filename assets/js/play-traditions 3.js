// Reviewed Play tradition records. Rendering and learner progress live elsewhere.
(function exposePlayTraditions(root) {
  "use strict";

  root.PLAY_TRADITIONS = {
    mississippi: {
      id: "mississippi-delta-country-blues",
      destination_id: "mississippi",
      tradition_label: "Country blues traditions of the Mississippi Delta",
      tradition_profile: {
        community_names: ["Black communities of the Mississippi Delta"],
        place_and_period: "The Mississippi Delta, especially the late nineteenth and early twentieth centuries",
        social_functions: [
          "personal testimony and storytelling",
          "dance and social gathering",
          "voice-and-instrument musical conversation"
        ],
        practice_settings: [
          "homes and porches",
          "juke joints",
          "travelling performance",
          "community gatherings"
        ],
        instruments_and_voices: ["voice", "acoustic guitar", "slide guitar"],
        embodied_practices: ["call and response", "foot pulse", "voice-and-guitar dialogue"],
        transmission: "Carried through listening, watching, playing beside others, travel, live performance, and recordings.",
        historical_forces: ["racial violence", "Jim Crow", "sharecropping", "migration", "recording technology"],
        living_now: "A living and changing family of practices carried by musicians, families, teachers, recordings, festivals, and connected blues communities today.",
        learner_relationship_note: "Visit one practice, credit its carriers, and return with deeper questions. Do not treat an activity as completion of a culture."
      },
      culture: {
        people_and_place: "Black communities of the Mississippi Delta",
        cultural_doorway: "Delta blues took shape in Black communities in Mississippi amid the racial violence, Jim Crow laws, and exploitative sharecropping system that followed Reconstruction. Musicians turned work, love, travel, hardship, humour, and daily life into an intensely personal voice-and-guitar language.",
        sound_connection: "Listen for the guitar behaving like a second voice. A phrase may stretch around the story instead of obeying a rigid grid.",
        living_tradition: "The Mississippi Delta is one important home within the wider, connected histories of country blues and blues music.",
        respectful_listening_prompt: "Whose voice or story is being carried, and how does the guitar answer it?",
        terms: ["country blues", "call and response", "slide guitar", "juke joint"],
        claims: [
          {
            id: "delta-black-community-history",
            text: "Country blues traditions in the Mississippi Delta grew within Black community life under racial violence, Jim Crow, and exploitative agricultural labour systems.",
            status: "documented",
            source_ref_ids: ["nps-lower-delta", "smithsonian-blues-country"]
          },
          {
            id: "delta-guitar-as-voice",
            text: "Voice-and-guitar dialogue and call-and-response are useful listening relationships in country blues performance.",
            status: "supported_interpretation",
            source_ref_ids: ["smithsonian-country-blues", "loc-delta-blues"]
          }
        ],
        source_refs: [
          {
            id: "nps-lower-delta",
            title: "History and Culture of the Mississippi Delta Region",
            publisher: "National Park Service",
            url: "https://www.nps.gov/locations/lowermsdeltaregion/history-and-culture-of-the-mississippi-delta-region.htm",
            source_type: "public_history",
            review_status: "reviewed"
          },
          {
            id: "smithsonian-blues-country",
            title: "Blues in the Country",
            publisher: "Smithsonian Folkways",
            url: "https://folkways.si.edu/lesson/blues-in-the-country",
            source_type: "educational_resource",
            review_status: "reviewed"
          },
          {
            id: "smithsonian-country-blues",
            title: "Country Blues: Rural Soul from the Southern USA",
            publisher: "Smithsonian Folkways",
            url: "https://folkways.si.edu/country-blues-rural-soul-southern-usa/music/article/smithsonian",
            source_type: "educational_resource",
            review_status: "reviewed"
          },
          {
            id: "loc-delta-blues",
            title: "American Music from A to Z: Delta Blues",
            publisher: "Library of Congress",
            url: "https://blogs.loc.gov/nls-music-notes/2021/09/american-music-from-a-to-z-in-the-nls-music-collection-d-delta-blues/",
            source_type: "public_archive",
            review_status: "reviewed"
          }
        ],
        community_review_status: "pending",
        community_reviewer: ""
      },
      activity_seed: {
        id: "a-minor-musical-conversation",
        key_or_centre: "A minor",
        tempo: { bpm: 60 },
        roles: ["rhythm", "lead"],
        home_notes: ["open A string", "low E string fret 5"]
      },
      content_status: "draft",
      review_status: "research_reviewed"
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
