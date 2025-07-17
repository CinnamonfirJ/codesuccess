import { createClient, groq } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export async function searchCourses(searchTerm: string) {
  if (!searchTerm) {
    return [];
  }

  const query = groq`*[_type == "course" && (title match $searchTerm || description match $searchTerm)]{
    _id,
    title,
    description,
    "slug": slug.current
  }`;

  const courses = await client.fetch(query, { searchTerm: `*${searchTerm}*` });
  return courses;
}
