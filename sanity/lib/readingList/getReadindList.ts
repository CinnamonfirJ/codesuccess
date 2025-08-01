import { client } from "../client";

export async function getReadingList() {
  try {
    const query = `*[_type == "readingList"] | order(_createdAt desc) {
      _id,
      bookTitle,
      name { // Access the 'name' object for book information
        author,
        cover { // Access the 'cover' field within 'name'
          asset -> {
            url
          }
        },
      },
      executiveSummary,
      coreConceptsSection { // Access the 'coreConceptsSection' object
        coreConcepts,
        mainPoints[]{
          ...,
          _type == "image" => {
            asset -> {
              url
            }
          }
        }
      },
      whyReadSection { // Access the 'whyReadSection' object
        whyReadThis[]{
          ...,
          _type == "image" => {
            asset -> {
              url
            }
          }
        },
        whyMustRead[]{
          ...,
          _type == "image" => {
            asset -> {
              url
            }
          }
        },
        finalWord[]{
          ...,
          _type == "image" => {
            asset -> {
              url
            }
          }
        }
      },
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
