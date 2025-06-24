import { defineQuery } from "next-sanity";

export const getReadingListQuery = defineQuery(`
  *[_type == "readingList"] | order(_createdAt desc) {
    _id,
    bookTitle,
    description,
    image {
      asset -> {
        url
      }
    },
    alt,
    linkUrl,
    categories,
    _createdAt
  }
`);

export async function getReadingList() {
  try {
    // Check if environment variables are available
    if (
      !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
      !process.env.SANITY_STUDIO_API_TOKEN
    ) {
      throw new Error(
        "Sanity environment variables not configured. Please add NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_STUDIO_API_TOKEN to your .env.local file."
      );
    }

    // Dynamic import to avoid loading Sanity client when env vars are missing
    const { sanityFetch } = await import("../live");

    const result = await sanityFetch({
      query: getReadingListQuery,
    });

    // Extract the data array from the Sanity response
    return result.data || [];
  } catch (error) {
    console.error("Failed to fetch reading list from Sanity:", error);
    throw error; // Re-throw to let the calling component handle it
  }
}
