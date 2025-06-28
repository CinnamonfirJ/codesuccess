import { client } from "../client";

export async function getReadingList() {
  try {
    const query = `*[_type == "readingList"] | order(_createdAt desc) {
      _id,
      bookTitle,
      description,
      executiveSummary,
      coreConcepts,
      whyReadThis,
      image {
        asset -> {
          url
        }
      },
      alt,
      linkUrl,
      categories,
      _createdAt
    }`;

    const readingList = await client.fetch(query);
    return readingList;
  } catch (error) {
    console.error("Error fetching reading list:", error);
    throw error;
  }
}
