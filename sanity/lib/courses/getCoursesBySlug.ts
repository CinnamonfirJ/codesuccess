// import { sanityFetch } from "../live";
// import { defineQuery } from "groq";

// export async function getCoursesBySlug(slug: string) {
//   const getCoursesBySlugQuery = defineQuery(`*[_type == "course"] {
//   ...,
//   "slug": slug.current,
//   "description": description,
//   modules[]-> {
//     ...,
//     studySession[]-> {
//       ...,
//       activity-> { ... },
//       rolePlay-> { ... },
//       summaryBox-> { ... },
//       takeawayJournalingPrompts[]-> { ... },
//       quotes[]-> { ... }
//     }
//   }
// }
// `);

//   const courses = await sanityFetch({
//     query: getCoursesBySlugQuery,
//     params: { slug },
//   });
//   return courses.data;
// }

import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getCoursesBySlug(slug: string) {
  // Define the GROQ query to fetch a single course by its slug
  const getCourseByExactSlugQuery = defineQuery(
    `*[_type == "course" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      description,
      modules[]-> {
        _id,
        _key,
        title,
        description,
        studySessions[]-> { // Assuming 'studySessions' is the correct field name here
          _key,
          title,
          content,
          activity-> { _id, title, instructions, reflectionPrompt }, // Fetch specific fields
          rolePlay-> { _id, title, scenario, instructions }, // Fetch specific fields
          summaryBox-> { _id, content }, // Fetch specific fields
          takeawayJournalingPrompts[]-> { _id, prompt }, // Fetch specific fields
          quotes[]-> { _id, text, author } // Fetch specific fields
        }
      }
    }`
  );

  const course = await sanityFetch({
    query: getCourseByExactSlugQuery,
    params: { slug }, // Pass the slug as a parameter to the query
  });

  // The 'course.data' will now be a single course object or null/undefined
  return course.data;
}
