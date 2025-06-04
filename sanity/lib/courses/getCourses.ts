import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getCourses() {
  const getCoursesQuery = defineQuery(`*[_type == "course"] {
        ...,
        "slug": slug.current,
        "description": description.current,
        "modules": modules[]->{...},
        "studySession": studySession[]->{...},
        }`);

  const courses = await sanityFetch({ query: getCoursesQuery });
  return courses.data;
}
