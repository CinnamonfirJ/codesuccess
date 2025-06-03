import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getCoursesBySlug(slug: string) {
  const getCoursesBySlugQuery = defineQuery(`*[_type == "course"] {
  ...,
  "slug": slug.current,
  "description": description,
  modules[]-> {
    ...,
    studySession[]-> {
      ...,
      activity-> { ... },
      rolePlay-> { ... },
      summaryBox-> { ... },
      takeawayJournalingPrompts[]-> { ... },
      quotes[]-> { ... }
    }
  }
}
`);

  const courses = await sanityFetch({
    query: getCoursesBySlugQuery,
    params: { slug },
  });
  return courses.data;
}
