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
        _id,
        _key,
        title,
        description,
        studySessions[]{
          _key,
          "session": @-> {
            _id,
            title,
            // New structured content fields
            conceptDefinition,
            whyItMatters,
            whatThisMeansForYou,
            commonMisconceptions,
            realLifeExample,
            whyTimeToActIsNow,
            openLetterToYou,
            // Keep the old content field for backward compatibility
            content,
            activity {
              _id,
              title,
              instructions,
              reflectionPrompt
            },
            rolePlay {
              _id,
              title,
              scenario,
              instructions,
              variation,
              reflectionPrompt
            },
            summaryBox {
              _id,
              content
            },
            takeawayJournalingPrompts[] {
              _id,
              prompt
            },
            quotes[] {
              _id,
              text,
              author
            }
          }
        }
      }
    }`
  );

  const course = await sanityFetch({
    query: getCourseByExactSlugQuery,
    params: { slug },
  });

  // Transform the data to flatten the session structure
  if (course.data?.modules) {
    course.data.modules = course.data.modules.map((module: any) => ({
      ...module,
      studySessions:
        module.studySessions?.map((sessionRef: any) => ({
          _key: sessionRef._key,
          ...sessionRef.session,
        })) || [],
    }));
  }

  console.log(
    "Full course data with preserved keys:",
    JSON.stringify(course.data, null, 2)
  );

  return course.data;
}
