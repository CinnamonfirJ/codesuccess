// src/sanity/lib/courses/getCoursesBySlug.ts

import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getCoursesBySlug(slug: string) {
  const getCourseByExactSlugQuery = defineQuery(
    `*[_type == "course" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      description,
      modules[]-> {
        ..., // Keep other fields from the module document
        _id,
        _key,
        title,
        description,
     studySessions[]{
  _id,
  _key,
  title,
  content,
  activity { _id, title, instructions, reflectionPrompt },
  rolePlay { _id, title, scenario, instructions },
  summaryBox { _id, content },
  takeawayJournalingPrompts[] { _id, prompt },
  quotes[] { _id, text, author }
  }
  }
    }`
  );

  const course = await sanityFetch({
    query: getCourseByExactSlugQuery,
    params: { slug },
  });

  return course.data;
}
